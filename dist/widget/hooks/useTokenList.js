import { ResourceStatus } from "@0xsequence/indexer";
import { Address } from "ox";
import { useEffect, useMemo, useState } from "react";
import { isAddressEqual, zeroAddress } from "viem";
import { useAccount } from "wagmi";
import { getChainInfo, useSupportedChains } from "../../chains.js";
import { formatRawAmount, useAccountTotalBalanceUsd, useHasSufficientBalanceUsd, useTokenBalances, } from "../../tokenBalances.js";
import { getFormatttedTokenName, getSupportedTokens } from "../../tokens.js";
export function useTokenList({ onContinue, targetAmountUsd, indexerGatewayClient, onError, fundMethod, }) {
    const [selectedToken, setSelectedToken] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [allSupportedTokens, setAllSupportedTokens] = useState([]);
    const [isLoadingSupportedTokens, setIsLoadingSupportedTokens] = useState(false);
    const { address } = useAccount();
    const { sortedTokens: allSortedTokens, isLoadingSortedTokens, balanceError, } = useTokenBalances(address, indexerGatewayClient);
    // Determine loading state based on fund method
    const isLoadingTokens = fundMethod === "qr-code" || fundMethod === "exchange"
        ? isLoadingSupportedTokens
        : isLoadingSortedTokens;
    const { totalBalanceUsd, totalBalanceUsdFormatted, isLoadingTotalBalanceUsd, } = useAccountTotalBalanceUsd(address);
    const { hasSufficientBalanceUsd, isLoadingHasSufficientBalanceUsd, hasSufficientBalanceUsdError, } = useHasSufficientBalanceUsd(address, targetAmountUsd);
    const showContinueButton = false;
    const { supportedChains: supportedToChains } = useSupportedChains();
    // Fetch all supported tokens when fundMethod is "qr-code" or "exchange"
    useEffect(() => {
        if (fundMethod === "qr-code" || fundMethod === "exchange") {
            setIsLoadingSupportedTokens(true);
            getSupportedTokens()
                .then((tokens) => {
                setAllSupportedTokens(tokens);
            })
                .catch((error) => {
                console.error("[trails-sdk] Failed to fetch supported tokens:", error);
            })
                .finally(() => {
                setIsLoadingSupportedTokens(false);
            });
        }
    }, [fundMethod]);
    const supportedChainIds = useMemo(() => {
        return new Set(supportedToChains.map((c) => c.id));
    }, [supportedToChains]);
    const sortedTokens = useMemo(() => {
        // If fundMethod is "qr-code" or "exchange", use all supported tokens instead of account-specific tokens
        if (fundMethod === "qr-code" || fundMethod === "exchange") {
            // Filter to only show specific tokens for QR code and exchange modes
            const filteredTokens = allSupportedTokens.filter((token) => {
                const symbol = token.symbol.toUpperCase();
                return ["ETH", "POL", "USDC", "USDT", "DAI", "BAT", "WETH"].includes(symbol);
            });
            // Convert SupportedToken to TokenBalanceExtended format
            return filteredTokens.map((token) => {
                // Check if it's a native token (like ETH)
                if (token.contractAddress === "0x0000000000000000000000000000000000000000") {
                    // Native token format
                    return {
                        chainId: token.chainId,
                        balance: "0", // No balance info for QR code and exchange modes
                        balanceUsd: 0,
                        balanceUsdFormatted: "0",
                        price: { value: 0, currency: "USD" },
                        imageUrl: token.imageUrl,
                        symbol: token.symbol,
                        isSufficientBalance: true, // Always true for QR code and exchange modes
                        accountAddress: address,
                    };
                }
                else {
                    // ERC20 token format
                    return {
                        chainId: token.chainId,
                        contractAddress: token.contractAddress,
                        balance: "0", // No balance info for QR code and exchange modes
                        balanceUsd: 0,
                        balanceUsdFormatted: "0",
                        price: { value: 0, currency: "USD" },
                        imageUrl: token.imageUrl,
                        contractInfo: {
                            decimals: token.decimals,
                            symbol: token.symbol,
                            name: token.name,
                        },
                        isSufficientBalance: true, // Always true for QR code and exchange modes
                        // Add required properties for TokenBalanceWithPrice
                        contractType: "ERC20",
                        accountAddress: address,
                        blockHash: "",
                        blockNumber: 0,
                        logIndex: 0,
                        transactionHash: "",
                        transactionIndex: 0,
                        uniqueCollectibles: "0",
                        isSummary: false,
                    };
                }
            });
        }
        // Default behavior: use account-specific tokens
        return allSortedTokens.filter((token) => {
            if (!supportedChainIds.has(token.chainId)) {
                return false;
            }
            return true;
        });
    }, [
        allSortedTokens,
        supportedChainIds,
        fundMethod,
        allSupportedTokens,
        address,
    ]);
    useEffect(() => {
        if (onError) {
            onError(balanceError);
        }
    }, [balanceError, onError]);
    const handleTokenSelect = (token) => {
        const isNative = !("contractAddress" in token);
        const chainInfo = getChainInfo(token.chainId);
        const imageUrl = token.imageUrl;
        let formattedToken;
        if (isNative) {
            formattedToken = {
                id: token.chainId,
                name: chainInfo?.nativeCurrency.name || "Native Token",
                symbol: chainInfo?.nativeCurrency.symbol || "ETH",
                balance: token.balance,
                imageUrl,
                chainId: token.chainId,
                contractAddress: zeroAddress,
                balanceUsdFormatted: token.balanceUsdFormatted ?? "",
                tokenPriceUsd: token.price?.value ?? 0,
                contractInfo: {
                    decimals: 18,
                    symbol: chainInfo?.nativeCurrency.symbol || "ETH",
                    name: chainInfo?.nativeCurrency.name || "Native Token",
                },
            };
        }
        else {
            formattedToken = {
                id: token.chainId,
                name: token.contractInfo?.name || "Unknown Token",
                symbol: token.contractInfo?.symbol || "???",
                balance: token.balance,
                imageUrl,
                chainId: token.chainId,
                contractAddress: token.contractAddress,
                contractInfo: {
                    ...token.contractInfo,
                    name: token.contractInfo?.name ?? "Unknown Token",
                    symbol: token.contractInfo?.symbol ?? "???",
                    decimals: token.contractInfo?.decimals ?? 18,
                },
                balanceUsdFormatted: token.balanceUsdFormatted ?? "",
                tokenPriceUsd: token.price?.value ?? 0,
            };
        }
        setSelectedToken(formattedToken);
        const canContinue = (!targetAmountUsd || (targetAmountUsd && hasSufficientBalanceUsd)) &&
            token.isSufficientBalance;
        if (!canContinue) {
            console.warn("[trails-sdk] Cannot continue with token selection", {
                token: formattedToken,
                targetAmountUsd,
                hasSufficientBalanceUsd,
                isSufficientBalance: token.isSufficientBalance,
            });
        }
        onContinue(formattedToken);
    };
    const isTokenSelected = (token) => {
        if (!selectedToken)
            return false;
        const isNative = !("contractAddress" in token);
        return (selectedToken.chainId === token.chainId &&
            (isNative
                ? selectedToken.contractAddress === zeroAddress
                : isAddressEqual(Address.from(selectedToken.contractAddress), Address.from(token.contractAddress))));
    };
    const filteredTokens = useMemo(() => {
        if (!searchQuery.trim()) {
            return sortedTokens;
        }
        const query = searchQuery.toLowerCase().trim();
        const queryParts = query.split(/\s+/).filter((part) => part.length > 0);
        return sortedTokens.filter((token) => {
            const isNative = !("contractAddress" in token);
            const chainInfo = getChainInfo(token.chainId);
            const chainName = chainInfo?.name || "";
            const chainNameLower = chainName.toLowerCase();
            if (isNative) {
                const nativeSymbol = chainInfo?.nativeCurrency.symbol || "ETH";
                const nativeName = chainInfo?.nativeCurrency.name || "Native Token";
                const nativeSymbolLower = nativeSymbol.toLowerCase();
                const nativeNameLower = nativeName.toLowerCase();
                // If multiple query parts, check if they match chain + token combination
                if (queryParts.length > 1) {
                    const matchesChain = queryParts.some((part) => chainNameLower.includes(part));
                    const matchesToken = queryParts.some((part) => nativeSymbolLower.includes(part) ||
                        nativeNameLower.includes(part));
                    return matchesChain && matchesToken;
                }
                // Single query part - match against any field
                return queryParts.some((part) => nativeSymbolLower.includes(part) ||
                    nativeNameLower.includes(part) ||
                    chainNameLower.includes(part));
            }
            const tokenSymbol = token.contractInfo?.symbol || "???";
            const tokenName = token.contractInfo?.name || "Unknown Token";
            const tokenSymbolLower = tokenSymbol.toLowerCase();
            const tokenNameLower = tokenName.toLowerCase();
            // If multiple query parts, check if they match chain + token combination
            if (queryParts.length > 1) {
                const matchesChain = queryParts.some((part) => chainNameLower.includes(part));
                const matchesToken = queryParts.some((part) => tokenSymbolLower.includes(part) || tokenNameLower.includes(part));
                return matchesChain && matchesToken;
            }
            // Single query part - match against any field
            return queryParts.some((part) => tokenSymbolLower.includes(part) ||
                tokenNameLower.includes(part) ||
                chainNameLower.includes(part));
        });
    }, [sortedTokens, searchQuery]);
    const filteredTokensFormatted = useMemo(() => {
        return filteredTokens.map((token) => {
            const isNative = !("contractAddress" in token);
            const chainInfo = getChainInfo(token.chainId);
            const nativeSymbol = chainInfo?.nativeCurrency.symbol || "ETH";
            const tokenSymbol = isNative
                ? nativeSymbol
                : token.contractInfo?.symbol || "???";
            const contractAddress = isNative ? zeroAddress : token.contractAddress;
            let imageContractAddress = contractAddress;
            if (tokenSymbol === "WETH") {
                imageContractAddress = zeroAddress;
            }
            const imageUrl = `https://assets.sequence.info/images/tokens/small/${token.chainId}/${imageContractAddress}.webp`;
            const currentTokenName = token.contractInfo?.name || "";
            const tokenName = getFormatttedTokenName(currentTokenName, tokenSymbol, token.chainId);
            const formattedBalance = formatRawAmount(token.balance, isNative ? 18 : token.contractInfo?.decimals);
            const priceUsd = Number(token.price?.value) ?? 0;
            const balanceUsdFormatted = token.balanceUsdFormatted ?? "";
            const decimals = isNative ? 18 : (token.contractInfo?.decimals ?? 18);
            let isSufficientBalance = true;
            if (targetAmountUsd) {
                isSufficientBalance = (token.balanceUsd ?? 0) >= targetAmountUsd;
            }
            const chainName = chainInfo?.name || "";
            return {
                ...token,
                id: token.chainId,
                contractInfo: {
                    ...token.contractInfo,
                    chainId: Number(token.chainId),
                    source: token.contractInfo?.source || "",
                    type: token.contractInfo?.type || "",
                    logoURI: token.contractInfo?.logoURI || "",
                    deployed: token.contractInfo?.deployed || false,
                    bytecodeHash: token.contractInfo?.bytecodeHash || "",
                    updatedAt: token.contractInfo?.updatedAt || "",
                    queuedAt: token.contractInfo?.queuedAt || "",
                    extensions: token.contractInfo
                        ?.extensions || {
                        link: "",
                        description: "",
                        categories: [],
                        ogImage: "",
                        ogName: "",
                        originChainId: 0,
                        originAddress: "",
                        blacklist: false,
                        verified: false,
                        featureIndex: 0,
                        verifiedBy: "",
                        featured: false,
                    },
                    status: token.contractInfo?.status ||
                        ResourceStatus.NOT_AVAILABLE,
                    address: contractAddress,
                    name: tokenName,
                    symbol: tokenSymbol,
                    decimals: decimals,
                },
                name: tokenName,
                symbol: tokenSymbol,
                balanceFormatted: formattedBalance,
                imageUrl,
                chainId: token.chainId,
                contractAddress: contractAddress,
                balanceUsdFormatted,
                tokenPriceUsd: priceUsd,
                isNative: isNative,
                tokenName: tokenName,
                priceUsd: priceUsd,
                isSufficientBalance,
                chainName,
            };
        });
    }, [filteredTokens, targetAmountUsd]);
    const showInsufficientBalance = useMemo(() => {
        return ((totalBalanceUsd &&
            targetAmountUsd &&
            !hasSufficientBalanceUsd &&
            !isLoadingHasSufficientBalanceUsd &&
            !hasSufficientBalanceUsdError) ||
            (filteredTokensFormatted?.length > 0 &&
                !filteredTokensFormatted.some((token) => token.isSufficientBalance)));
    }, [
        targetAmountUsd,
        hasSufficientBalanceUsd,
        isLoadingHasSufficientBalanceUsd,
        hasSufficientBalanceUsdError,
        filteredTokensFormatted,
        totalBalanceUsd,
    ]);
    return {
        selectedToken,
        searchQuery,
        handleTokenSelect,
        filteredTokens,
        isLoadingSortedTokens,
        balanceError,
        showContinueButton,
        isTokenSelected,
        setSearchQuery,
        filteredTokensFormatted,
        totalBalanceUsd,
        totalBalanceUsdFormatted,
        isLoadingTotalBalanceUsd,
        showInsufficientBalance,
        isLoadingTokens,
    };
}
