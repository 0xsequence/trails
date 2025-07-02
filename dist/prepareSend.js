import { createPublicClient, createWalletClient, decodeFunctionData, erc20Abi, formatUnits, http, parseUnits, zeroAddress, } from "viem";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import * as chains from "viem/chains";
import { attemptSwitchChain } from "./chainSwitch.js";
import { getChainInfo } from "./chains.js";
import { getERC20TransferData } from "./encoders.js";
import { getExplorerUrl } from "./explorer.js";
import { getPermitCalls, getPermitSignature } from "./gasless.js";
import { calculateIntentAddress, commitIntentConfig, getIntentCallsPayloads as getIntentCallsPayloadsFromIntents, sendOriginTransaction, } from "./intents.js";
import { getMetaTxStatus } from "./metaTxnMonitor.js";
import { relayerSendMetaTx } from "./metaTxns.js";
import { sendPaymasterGaslessTransaction } from "./paymasterSend.js";
import { findFirstPreconditionForChainId } from "./preconditions.js";
import { getQueryParam } from "./queryParams.js";
import { executeSimpleRelayTransaction, getRelaySDKQuote, getTxHashFromRelayResult, } from "./relaysdk.js";
import { getFeeOptions, sequenceSendTransaction, simpleCreateSequenceWallet, } from "./sequenceWallet.js";
import { requestWithTimeout } from "./utils.js";
export function getIsToSameChain(originChainId, destinationChainId) {
    return originChainId?.toString() === destinationChainId?.toString();
}
export function getIsToSameToken(originTokenAddress, destinationTokenAddress) {
    return (originTokenAddress?.toLowerCase() === destinationTokenAddress?.toLowerCase());
}
export function getIsToSameChainAndToken(originChainId, originTokenAddress, destinationChainId, destinationTokenAddress) {
    return (getIsToSameChain(originChainId, destinationChainId) &&
        getIsToSameToken(originTokenAddress, destinationTokenAddress));
}
function isTestnetDebugMode() {
    return getQueryParam("testnet") === "true";
}
function getTestnetOriginTokenAddress() {
    return "0x036CbD53842c5426634e7929541eC2318f3dCF7e";
}
function getIntentArgs(mainSignerAddress, originChainId, originTokenAddress, originTokenAmount, destinationChainId, destinationTokenAddress, destinationTokenAmount, destinationTokenSymbol, recipient, destinationCalldata) {
    const _destinationCalldata = destinationCalldata ||
        (destinationTokenAddress === zeroAddress
            ? "0x"
            : getERC20TransferData(recipient, BigInt(destinationTokenAmount)));
    const _destinationToAddress = destinationCalldata
        ? recipient
        : destinationTokenAddress === zeroAddress
            ? recipient
            : destinationTokenAddress;
    const _destinationCallValue = destinationTokenAddress === zeroAddress ? destinationTokenAmount : "0";
    const intentArgs = {
        userAddress: mainSignerAddress,
        originChainId,
        originTokenAddress,
        originTokenAmount: originTokenAddress === destinationTokenAddress
            ? destinationTokenAmount
            : originTokenAmount, // max amount
        destinationChainId,
        destinationToAddress: _destinationToAddress,
        destinationTokenAddress: destinationTokenAddress,
        destinationTokenAmount: destinationTokenAmount,
        destinationTokenSymbol: destinationTokenSymbol,
        destinationCallData: _destinationCalldata,
        destinationCallValue: _destinationCallValue,
    };
    return intentArgs;
}
export async function prepareSend(options) {
    const { account, originTokenAddress, originChainId, originTokenAmount, // account balance
    destinationChainId, recipient, destinationTokenAddress, destinationTokenAmount, destinationTokenSymbol, fee, client: walletClient, dryMode = false, apiClient, originRelayer, destinationRelayer, destinationCalldata, onTransactionStateChange, sourceTokenPriceUsd, destinationTokenPriceUsd, sourceTokenDecimals, destinationTokenDecimals, paymasterUrl, gasless = false, relayerConfig, sequenceProjectAccessKey, } = options;
    if (!walletClient) {
        throw new Error("Wallet client not provided");
    }
    const chain = getChainInfo(originChainId);
    if (!chain) {
        throw new Error(`Chain ${originChainId} not found`);
    }
    const isToSameChain = getIsToSameChain(originChainId, destinationChainId);
    const isToSameToken = getIsToSameToken(originTokenAddress, destinationTokenAddress);
    console.log("isToSameChain", isToSameChain);
    console.log("isToSameToken", isToSameToken);
    const publicClient = createPublicClient({
        chain,
        transport: http(),
    });
    const mainSignerAddress = account.address;
    const transactionStates = [];
    // origin tx
    transactionStates.push({
        transactionHash: "",
        explorerUrl: "",
        chainId: originChainId,
        state: "pending",
    });
    if (!isToSameChain) {
        // swap + bridge tx
        transactionStates.push({
            transactionHash: "",
            explorerUrl: "",
            chainId: originChainId,
            state: "pending",
        });
        // destination tx
        transactionStates.push({
            transactionHash: "",
            explorerUrl: "",
            chainId: destinationChainId,
            state: "pending",
        });
    }
    if (isToSameChain && !isToSameToken) {
        return await sendHandlerForSameChainDifferentToken({
            originTokenAddress,
            destinationTokenAmount,
            destinationTokenAddress,
            destinationCalldata,
            recipient,
            originChainId,
            walletClient,
            publicClient,
        });
    }
    if (isToSameToken && isToSameChain) {
        return await sendHandlerForSameChainSameToken({
            originTokenAddress,
            destinationTokenAmount,
            destinationCalldata,
            recipient,
            originChainId,
            walletClient,
            publicClient,
            onTransactionStateChange,
            dryMode,
            account,
            chain,
        });
    }
    return await sendHandlerForDifferentChainAndToken({
        mainSignerAddress,
        originChainId,
        originTokenAddress,
        originTokenAmount,
        destinationChainId,
        destinationTokenAddress,
        destinationTokenAmount,
        destinationTokenSymbol,
        recipient,
        destinationCalldata,
        apiClient,
        sourceTokenPriceUsd,
        destinationTokenPriceUsd,
        sourceTokenDecimals,
        destinationTokenDecimals,
        gasless,
        paymasterUrl,
        originRelayer,
        destinationRelayer,
        sequenceProjectAccessKey,
        relayerConfig,
        walletClient,
        publicClient,
        chain,
        account,
        fee,
        dryMode,
        onTransactionStateChange,
        transactionStates,
    });
}
async function sendHandlerForDifferentChainAndToken({ mainSignerAddress, originChainId, originTokenAddress, originTokenAmount, destinationChainId, destinationTokenAddress, destinationTokenAmount, destinationTokenSymbol, recipient, destinationCalldata, apiClient, sourceTokenPriceUsd, destinationTokenPriceUsd, sourceTokenDecimals, destinationTokenDecimals, gasless, paymasterUrl, originRelayer, destinationRelayer, sequenceProjectAccessKey, relayerConfig, walletClient, publicClient, chain, account, fee, dryMode, onTransactionStateChange, transactionStates, }) {
    const intentArgs = getIntentArgs(mainSignerAddress, originChainId, originTokenAddress, originTokenAmount, destinationChainId, destinationTokenAddress, destinationTokenAmount, destinationTokenSymbol, recipient, destinationCalldata);
    console.log("Creating intent with args:", intentArgs);
    const intent = await getIntentCallsPayloadsFromIntents(apiClient, intentArgs);
    console.log("Got intent:", intent);
    if (!intent) {
        throw new Error("Invalid intent");
    }
    if (!intent.preconditions?.length ||
        !intent.calls?.length ||
        !intent.anypayInfos?.length) {
        throw new Error("Invalid intent");
    }
    const intentAddress = calculateIntentAddress(mainSignerAddress, intent.calls, intent.anypayInfos, intent.anypayFee?.quoteProvider);
    console.log("Calculated intent address:", intentAddress.toString());
    await commitIntentConfig(apiClient, mainSignerAddress, intent.calls, intent.preconditions, intent.anypayInfos, intent.anypayFee?.quoteProvider);
    console.log("Committed intent config");
    const firstPrecondition = findFirstPreconditionForChainId(intent.preconditions, originChainId);
    if (!firstPrecondition) {
        throw new Error("No precondition found for origin chain");
    }
    const firstPreconditionMin = firstPrecondition?.data?.min?.toString();
    const depositAmount = firstPreconditionMin;
    return {
        intentAddress,
        originSendAmount: depositAmount,
        send: async (onOriginSend) => {
            console.log("sending origin transaction");
            const needsNativeFee = getNeedsLifiNativeFee({
                originTokenAddress,
                destinationTokenAmount,
                destinationTokenDecimals,
                sourceTokenDecimals,
                sourceTokenPriceUsd: sourceTokenPriceUsd ?? null,
                destinationTokenPriceUsd: destinationTokenPriceUsd ?? null,
                depositAmount,
            });
            console.log("needsNativeFee", needsNativeFee);
            console.log("sourceTokenPriceUsd", sourceTokenPriceUsd);
            console.log("destinationTokenPriceUsd", destinationTokenPriceUsd);
            console.log("sourceTokenDecimals", sourceTokenDecimals);
            console.log("destinationTokenDecimals", destinationTokenDecimals);
            // const originCallParams = {
            //   to:
            //     originTokenAddress === zeroAddress
            //       ? firstPreconditionAddress
            //       : originTokenAddress,
            //   data:
            //     originTokenAddress === zeroAddress
            //       ? "0x"
            //       : getERC20TransferData(
            //           firstPreconditionAddress,
            //           BigInt(firstPreconditionMin) + BigInt(fee),
            //         ),
            //   value:
            //     originTokenAddress === zeroAddress
            //       ? BigInt(firstPreconditionMin) + BigInt(fee)
            //       : "0",
            //   chainId: originChainId,
            //   chain,
            // }
            let originUserTxReceipt = null;
            let originMetaTxnReceipt = null;
            let destinationMetaTxnReceipt = null;
            const testnet = isTestnetDebugMode();
            const testnetOriginTokenAddress = getTestnetOriginTokenAddress();
            console.log("testnet", testnet);
            originUserTxReceipt = await attemptUserDepositTx({
                originTokenAddress: testnet
                    ? testnetOriginTokenAddress
                    : originTokenAddress,
                gasless,
                paymasterUrl,
                chain: testnet ? chains.baseSepolia : chain,
                account,
                relayerConfig,
                sequenceProjectAccessKey,
                originRelayer,
                firstPreconditionMin,
                intentAddress,
                onOriginSend,
                publicClient,
                walletClient,
                destinationTokenDecimals,
                sourceTokenDecimals,
                fee,
                dryMode,
                sourceTokenPriceUsd: sourceTokenPriceUsd ?? null,
                destinationTokenPriceUsd: destinationTokenPriceUsd ?? null,
                destinationTokenAmount,
            });
            if (!originUserTxReceipt) {
                throw new Error("Failed to send origin transaction");
            }
            transactionStates[0] = getTransactionStateFromReceipt(originUserTxReceipt, originChainId);
            onTransactionStateChange(transactionStates);
            if (intent.metaTxns[0] && intent.preconditions[0]) {
                originMetaTxnReceipt = await sendMetaTxAndWaitForReceipt({
                    metaTx: intent.metaTxns[0],
                    relayer: originRelayer,
                    precondition: intent.preconditions[0],
                });
                if (originMetaTxnReceipt) {
                    transactionStates[1] = getTransactionStateFromReceipt(originMetaTxnReceipt, originChainId);
                    onTransactionStateChange(transactionStates);
                }
            }
            if (intent.metaTxns[1] && intent.preconditions[1]) {
                destinationMetaTxnReceipt = await sendMetaTxAndWaitForReceipt({
                    metaTx: intent.metaTxns[1],
                    relayer: destinationRelayer,
                    precondition: intent.preconditions[1],
                });
                if (destinationMetaTxnReceipt) {
                    transactionStates[2] = getTransactionStateFromReceipt(destinationMetaTxnReceipt, destinationChainId);
                    onTransactionStateChange(transactionStates);
                }
            }
            return {
                originUserTxReceipt,
                originMetaTxnReceipt,
                destinationMetaTxnReceipt,
            };
        },
    };
}
async function sendHandlerForSameChainSameToken({ originTokenAddress, destinationTokenAmount, destinationCalldata, recipient, originChainId, walletClient, publicClient, onTransactionStateChange, dryMode, account, chain, }) {
    console.log("isToSameToken && isToSameChain");
    return {
        originSendAmount: destinationTokenAmount,
        send: async (onOriginSend) => {
            const originCallParams = {
                to: destinationCalldata
                    ? recipient
                    : originTokenAddress === zeroAddress
                        ? recipient
                        : originTokenAddress,
                data: destinationCalldata ||
                    (originTokenAddress === zeroAddress
                        ? "0x"
                        : getERC20TransferData(recipient, BigInt(destinationTokenAmount))),
                value: originTokenAddress === zeroAddress
                    ? BigInt(destinationTokenAmount)
                    : "0",
                chainId: originChainId,
                chain,
            };
            console.log("origin call params", originCallParams);
            let originUserTxReceipt = null;
            const originMetaTxnReceipt = null;
            const destinationMetaTxnReceipt = null;
            await attemptSwitchChain(walletClient, originChainId);
            if (!dryMode) {
                onTransactionStateChange([
                    {
                        transactionHash: "",
                        explorerUrl: "",
                        chainId: originChainId,
                        state: "pending",
                    },
                ]);
                console.log("origin call params", originCallParams);
                const txHash = await sendOriginTransaction(account, walletClient, originCallParams); // TODO: Add proper type
                console.log("origin tx", txHash);
                if (onOriginSend) {
                    onOriginSend();
                }
                // Wait for transaction receipt
                const receipt = await publicClient.waitForTransactionReceipt({
                    hash: txHash,
                });
                console.log("receipt", receipt);
                originUserTxReceipt = receipt;
                onTransactionStateChange([
                    getTransactionStateFromReceipt(originUserTxReceipt, originChainId),
                ]);
            }
            return {
                originUserTxReceipt,
                originMetaTxnReceipt,
                destinationMetaTxnReceipt,
            };
        },
    };
}
async function sendHandlerForSameChainDifferentToken({ originTokenAddress, destinationTokenAmount, destinationTokenAddress, destinationCalldata, recipient, originChainId, walletClient, publicClient, }) {
    const destinationTxs = [];
    if (destinationCalldata) {
        destinationTxs.push({
            to: recipient,
            value: destinationTokenAddress === zeroAddress ? destinationTokenAmount : "0",
            data: destinationCalldata,
        });
    }
    const quote = await getRelaySDKQuote({
        wallet: walletClient,
        chainId: originChainId,
        amount: destinationTokenAmount,
        currency: originTokenAddress,
        toCurrency: destinationTokenAddress,
        txs: destinationTxs,
    });
    console.log("relaysdk quote", quote);
    let depositAmount = "0";
    try {
        depositAmount = quote.steps?.[0]?.items?.[0]?.data?.value;
        if (originTokenAddress !== zeroAddress) {
            const decoded = decodeFunctionData({
                abi: erc20Abi,
                data: quote.steps?.[0]?.items?.[0]?.data?.data,
            });
            if (decoded.functionName === "approve") {
                depositAmount = decoded.args[1].toString();
            }
            if (decoded.functionName === "transfer") {
                depositAmount = decoded.args[1].toString();
            }
        }
    }
    catch (error) {
        console.error("Error decoding function data:", error);
    }
    return {
        originSendAmount: depositAmount,
        send: async (onOriginSend) => {
            await attemptSwitchChain(walletClient, originChainId);
            const result = await executeSimpleRelayTransaction(quote, walletClient);
            console.log("relaysdk result", result);
            const txHash = getTxHashFromRelayResult(result);
            if (onOriginSend) {
                onOriginSend();
            }
            const originUserTxReceipt = await publicClient.waitForTransactionReceipt({
                hash: txHash,
            });
            return {
                originUserTxReceipt: originUserTxReceipt,
                originMetaTxnReceipt: null,
                destinationMetaTxnReceipt: null,
            };
        },
    };
}
async function attemptGaslessDeposit({ paymasterUrl, depositTokenAddress, depositTokenAmount, depositRecipient, onOriginSend, publicClient, walletClient, chain, account, relayerConfig, sequenceProjectAccessKey, originRelayer, }) {
    let originUserTxReceipt = null;
    const originChainId = chain.id;
    if (paymasterUrl) {
        console.log("doing gasless with paymaster");
        const txHash = await sendPaymasterGaslessTransaction(walletClient, chain, depositTokenAddress, BigInt(depositTokenAmount), depositRecipient, paymasterUrl);
        if (onOriginSend) {
            onOriginSend();
        }
        const receipt = await publicClient.waitForTransactionReceipt({
            hash: txHash,
        });
        console.log("receipt", receipt);
        originUserTxReceipt = receipt;
    }
    else {
        console.log("doing gasless with sequence wallet");
        const delegatorPrivateKey = generatePrivateKey();
        const delegatorAccount = privateKeyToAccount(delegatorPrivateKey);
        const delegatorClient = createWalletClient({
            account: delegatorAccount,
            chain,
            transport: http(),
        });
        console.log("attempting to switch chain");
        await attemptSwitchChain(walletClient, originChainId);
        console.log("creating sequence wallet");
        const sequenceWalletAddress = await simpleCreateSequenceWallet(delegatorAccount, relayerConfig, sequenceProjectAccessKey);
        console.log("sequenceWalletAddress", sequenceWalletAddress);
        // Initialize clients
        const sequencePublicClient = createPublicClient({
            chain,
            transport: http(),
        });
        const { signature, deadline } = await getPermitSignature(sequencePublicClient, walletClient, account.address, sequenceWalletAddress, depositTokenAddress, BigInt(depositTokenAmount), chain);
        const calls = getPermitCalls(account.address, sequenceWalletAddress, BigInt(depositTokenAmount), deadline, signature, depositRecipient, depositTokenAddress);
        const feeOptions = await getFeeOptions(originRelayer, sequenceWalletAddress, originChainId, calls.map((call) => ({
            to: call.to,
            value: BigInt(call.value),
            data: call.data,
            gasLimit: BigInt(0),
            delegateCall: false,
            onlyFallback: false,
            behaviorOnError: "revert",
        })));
        console.log("feeOptions", feeOptions);
        const sequenceTxHash = await sequenceSendTransaction(sequenceWalletAddress, delegatorClient, sequencePublicClient, calls, chain, relayerConfig, sequenceProjectAccessKey);
        console.log("sequenceTxHash", sequenceTxHash);
        if (onOriginSend) {
            onOriginSend();
        }
        const receipt = await publicClient.waitForTransactionReceipt({
            hash: sequenceTxHash,
        });
        console.log("receipt", receipt);
        originUserTxReceipt = receipt;
    }
    return originUserTxReceipt;
}
export async function attemptNonGaslessUserDeposit({ originTokenAddress, firstPreconditionMin, onOriginSend, publicClient, walletClient, originChainId, chain, account, fee, dryMode, sourceTokenPriceUsd, destinationTokenPriceUsd, destinationTokenAmount, destinationTokenDecimals, sourceTokenDecimals, intentAddress, }) {
    let originUserTxReceipt = null;
    const needsNativeFee = await getNeedsLifiNativeFee({
        originTokenAddress,
        destinationTokenAmount,
        destinationTokenDecimals,
        sourceTokenDecimals,
        sourceTokenPriceUsd: sourceTokenPriceUsd ?? null,
        destinationTokenPriceUsd: destinationTokenPriceUsd ?? null,
        depositAmount: firstPreconditionMin,
    });
    let nativeFee = parseUnits("0.00005", 18).toString();
    if (originChainId === 137) {
        nativeFee = parseUnits("1.5", 18).toString();
    }
    console.log("needsNativeFee", needsNativeFee);
    const originCallParams = {
        to: originTokenAddress === zeroAddress ? intentAddress : originTokenAddress,
        data: originTokenAddress === zeroAddress
            ? "0x"
            : getERC20TransferData(intentAddress, BigInt(firstPreconditionMin) + BigInt(fee)),
        value: originTokenAddress === zeroAddress
            ? BigInt(firstPreconditionMin) + BigInt(fee)
            : "0",
        chainId: originChainId,
        chain,
    };
    await attemptSwitchChain(walletClient, originChainId);
    let useSendCalls = false;
    const moreThan1Tx = needsNativeFee;
    if (moreThan1Tx) {
        try {
            // the reason for the timeout is some users experience this call to hang indefinitely on metamask on all chains.
            // not sure why this is happening, but it happens.
            const capabilities = await requestWithTimeout(walletClient, [
                {
                    method: "wallet_getCapabilities",
                    params: [account.address],
                },
            ], 10000);
            console.log("capabilities", capabilities);
            // Check if the chain supports atomic transactions
            const chainHex = `0x${originChainId.toString(16)}`;
            const chainCapabilities = capabilities[chainHex];
            useSendCalls = chainCapabilities?.atomic?.status === "supported";
        }
        catch (error) {
            console.error("Error getting capabilities", error);
        }
    }
    if (dryMode) {
        console.log("dry mode, skipping send calls");
    }
    if (useSendCalls) {
        console.log("using sendCalls");
    }
    else {
        console.log("using sendTransaction");
    }
    if (useSendCalls) {
        if (!dryMode) {
            const calls = [];
            if (needsNativeFee) {
                calls.push({
                    to: intentAddress,
                    data: "0x00",
                    value: `0x${BigInt(nativeFee).toString(16)}`,
                });
            }
            // Add the origin call
            calls.push({
                to: originCallParams.to,
                data: originCallParams.data,
                value: originCallParams.value
                    ? `0x${BigInt(originCallParams.value).toString(16)}`
                    : "0x0",
            });
            // Send the batched call via EIP-7702
            const result = (await walletClient.request({
                method: "wallet_sendCalls",
                params: [
                    {
                        version: "2.0.0",
                        chainId: `0x${originChainId.toString(16)}`,
                        atomicRequired: true,
                        calls,
                    },
                ],
            }));
            console.log("sendCalls result", result);
            const requestId = result.requestId || result.id;
            // Poll to check if the tx has been submitted
            let txHash;
            while (!txHash) {
                const status = (await walletClient.request({
                    method: "wallet_getCallsStatus",
                    params: [requestId],
                }));
                console.log("getCallsStatus result", status);
                const receipt = status?.receipts?.[0];
                if (status.status === 200 && receipt?.transactionHash) {
                    txHash = receipt.transactionHash;
                    break;
                }
                else if (status.status === 500) {
                    throw new Error(`Transaction failed: ${status.error}`);
                }
                // wait a bit before polling again
                await new Promise((r) => setTimeout(r, 2000));
            }
            if (onOriginSend) {
                onOriginSend();
            }
            const receipt = await publicClient.waitForTransactionReceipt({
                hash: txHash,
            });
            console.log("receipt", receipt);
            originUserTxReceipt = receipt;
        }
    }
    else {
        if (!dryMode) {
            if (needsNativeFee) {
                const tx0 = await sendOriginTransaction(account, walletClient, {
                    to: intentAddress,
                    data: "0x00",
                    value: nativeFee,
                    chainId: originChainId,
                    chain,
                }); // TODO: Add proper type
                console.log("origin tx", tx0);
                // Wait for transaction receipt
                const feeReceipt = await publicClient.waitForTransactionReceipt({
                    hash: tx0,
                });
                console.log("nativeFeeReceipt", feeReceipt);
            }
            const tx = await sendOriginTransaction(account, walletClient, originCallParams); // TODO: Add proper type
            console.log("origin tx", tx);
            if (onOriginSend) {
                onOriginSend();
            }
            // Wait for transaction receipt
            const receipt = await publicClient.waitForTransactionReceipt({
                hash: tx,
            });
            console.log("receipt", receipt);
            originUserTxReceipt = receipt;
        }
    }
    return originUserTxReceipt;
}
async function attemptUserDepositTx({ originTokenAddress, gasless, paymasterUrl, chain, account, relayerConfig, sequenceProjectAccessKey, originRelayer, firstPreconditionMin, intentAddress, onOriginSend, publicClient, walletClient, destinationTokenDecimals, sourceTokenDecimals, fee, dryMode, sourceTokenPriceUsd, destinationTokenPriceUsd, destinationTokenAmount, }) {
    let originUserTxReceipt = null;
    const originChainId = chain.id;
    const doGasless = getDoGasless(originTokenAddress, gasless, paymasterUrl);
    console.log("doGasless", doGasless, paymasterUrl);
    if (doGasless) {
        try {
            originUserTxReceipt = await attemptGaslessDeposit({
                paymasterUrl,
                depositTokenAddress: originTokenAddress,
                depositTokenAmount: firstPreconditionMin,
                depositRecipient: intentAddress,
                onOriginSend,
                publicClient,
                walletClient,
                chain,
                account,
                relayerConfig,
                sequenceProjectAccessKey,
                originRelayer,
            });
        }
        catch (error) {
            console.log("gassless attempt failed", error);
        }
    }
    // If gasless attempt failed, try to send a regular transaction
    if (!originUserTxReceipt) {
        originUserTxReceipt = await attemptNonGaslessUserDeposit({
            originTokenAddress,
            firstPreconditionMin,
            intentAddress,
            onOriginSend,
            publicClient,
            walletClient,
            originChainId,
            chain,
            account,
            fee,
            dryMode,
            sourceTokenPriceUsd,
            destinationTokenPriceUsd,
            destinationTokenAmount,
            destinationTokenDecimals,
            sourceTokenDecimals,
        });
    }
    return originUserTxReceipt;
}
export function getDoGasless(originTokenAddress, gasless, paymasterUrl) {
    return originTokenAddress !== zeroAddress && (gasless || paymasterUrl);
}
function getTransactionStateFromReceipt(receipt, chainId) {
    let txHash = "";
    let state = "pending";
    if ("transactionHash" in receipt) {
        txHash = receipt.transactionHash;
        state = receipt.status === "success" ? "confirmed" : "failed";
    }
    else if ("txnHash" in receipt) {
        txHash = receipt.txnHash;
        state = receipt.status === "SUCCEEDED" ? "confirmed" : "failed";
    }
    return {
        transactionHash: txHash,
        explorerUrl: getExplorerUrl(txHash, chainId),
        chainId,
        state,
    };
}
async function sendMetaTxAndWaitForReceipt({ metaTx, relayer, precondition, }) {
    let originMetaTxnReceipt = null;
    console.log("metaTx", metaTx);
    const opHash = await relayerSendMetaTx(relayer, metaTx, [precondition]);
    console.log("opHash", opHash);
    // eslint-disable-next-line no-constant-condition
    while (true) {
        console.log("polling status", metaTx.id, BigInt(metaTx.chainId));
        const receipt = await getMetaTxStatus(relayer, metaTx.id, Number(metaTx.chainId));
        console.log("status", receipt);
        if (receipt?.transactionHash) {
            originMetaTxnReceipt = receipt.data?.receipt;
            break;
        }
        await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    return originMetaTxnReceipt;
}
// ETH fee required by some bridges for low token amounts
// TODO: update backend API to return the native fee requirement, if any
function getNeedsLifiNativeFee({ originTokenAddress, destinationTokenAmount, destinationTokenDecimals, sourceTokenDecimals, sourceTokenPriceUsd, destinationTokenPriceUsd, depositAmount, }) {
    let needsNativeFee = false;
    if (originTokenAddress !== zeroAddress &&
        sourceTokenPriceUsd &&
        destinationTokenPriceUsd &&
        depositAmount &&
        destinationTokenDecimals !== undefined &&
        sourceTokenDecimals !== undefined) {
        // Convert from wei to token units using formatUnits
        const destinationAmount = Number(formatUnits(BigInt(destinationTokenAmount), destinationTokenDecimals));
        const depositAmountFormatted = Number(formatUnits(BigInt(depositAmount), destinationTokenDecimals));
        console.log("destinationAmount", destinationAmount);
        console.log("depositAmountFormatted", depositAmountFormatted);
        const destinationAmountUsd = destinationAmount * destinationTokenPriceUsd;
        const depositAmountUsd = depositAmountFormatted * sourceTokenPriceUsd;
        const diff = depositAmountUsd - destinationAmountUsd;
        console.log("destinationAmountUsd", destinationAmountUsd, "depositAmountUsd", depositAmountUsd, "diff", diff);
        if (diff >= 0 && diff <= 0.02) {
            needsNativeFee = true;
        }
    }
    return needsNativeFee;
}
