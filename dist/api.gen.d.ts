export declare const WebrpcHeader = "Webrpc";
export declare const WebrpcHeaderValue = "webrpc@v0.25.3;gen-typescript@v0.17.0;sequence-api@v0.4.0";
export declare const WebRPCVersion = "v1";
export declare const WebRPCSchemaVersion = "v0.4.0";
export declare const WebRPCSchemaHash = "01e4e5d5ce5e7b85514f2db2fb5b346229db727c";
type WebrpcGenVersions = {
    webrpcGenVersion: string;
    codeGenName: string;
    codeGenVersion: string;
    schemaName: string;
    schemaVersion: string;
};
export declare function VersionFromHeader(headers: Headers): WebrpcGenVersions;
export declare enum SortOrder {
    DESC = "DESC",
    ASC = "ASC"
}
export declare enum SardinePaymentType {
    ach = "ach",
    debit = "debit",
    credit = "credit",
    us_debit = "us_debit",
    international_debit = "international_debit",
    international_credit = "international_credit"
}
export declare enum SardineQuoteType {
    buy = "buy",
    sell = "sell"
}
export declare enum GetLifiSwapRouteDirection {
    to = "to",
    from = "from"
}
export declare enum TokenType {
    ERC20 = "ERC20",
    ERC721 = "ERC721",
    ERC1155 = "ERC1155"
}
export declare enum TransakBuySell {
    UNKNOWN = "UNKNOWN",
    BUY = "BUY",
    SELL = "SELL"
}
export declare enum TradeType {
    EXACT_INPUT = "EXACT_INPUT",
    EXACT_OUTPUT = "EXACT_OUTPUT"
}
export declare enum CheckoutOptionCrypto {
    none = "none",
    partially = "partially",
    all = "all"
}
export declare enum CheckoutOptionNFTCheckoutProvider {
    unknown = "unknown",
    sardine = "sardine",
    transak = "transak"
}
export declare enum CheckoutOptionOnRampProvider {
    unknown = "unknown",
    sardine = "sardine",
    transak = "transak"
}
export declare enum CheckoutOptionSwapProvider {
    unknown = "unknown",
    lifi = "lifi"
}
export interface Version {
    webrpcVersion: string;
    schemaVersion: string;
    schemaHash: string;
    appVersion: string;
}
export interface RuntimeStatus {
    healthOK: boolean;
    startTime: string;
    uptime: number;
    ver: string;
    branch: string;
    commitHash: string;
    checks: RuntimeChecks;
    numTxnsRelayed: {
        [key: string]: NumTxnsRelayed;
    };
}
export interface NumTxnsRelayed {
    chainID: number;
    prev: number;
    current: number;
    period: number;
}
export interface RuntimeChecks {
}
export interface SequenceContext {
    factory: string;
    mainModule: string;
    mainModuleUpgradable: string;
    guestModule: string;
    utils: string;
}
export interface PublicKey {
    id: string;
    x: string;
    y: string;
}
export interface User {
    address: string;
    username: string;
    avatar: string;
    bio: string;
    location: string;
    locale: string;
    backup?: boolean;
    backupConfirmed?: boolean;
    maxInvites?: number;
    updatedAt?: string;
    createdAt?: string;
}
export interface WalletBackup {
    accountAddress: string;
    secretHash: string;
    encryptedWallet: string;
    userConfirmed: boolean;
    updatedAt?: string;
    createdAt?: string;
}
export interface Friend {
    id: number;
    userAddress: string;
    friendAddress: string;
    nickname: string;
    user?: User;
    createdAt?: string;
}
export interface MetaTxn {
    id: string;
    chainId: string;
    walletAddress: string;
    contract: string;
    input: string;
}
export interface Call {
    to: string;
    value?: string;
    data?: string;
    gasLimit?: string;
    delegateCall?: boolean;
    onlyFallback?: boolean;
    behaviorOnError?: number;
}
export interface IntentCallsPayload {
    chainId: string;
    space?: string;
    nonce?: string;
    calls: Array<Call>;
}
export interface IntentConfig {
    id: number;
    configHash: string;
    originIntentAddress: string;
    destinationIntentAddress: string;
    mainSigner: string;
    calls: Array<IntentCallsPayload>;
    preconditions: Array<IntentPrecondition>;
    updatedAt?: string;
    createdAt?: string;
}
export interface InviteCode {
    usesLeft: number;
    ownerAccount: string;
    email?: string;
    url: string;
    createdAt?: string;
    expiresAt?: string;
}
export interface InviteCodeAccount {
    claimedByUserAddress: string;
    claimedAt?: string;
}
export interface InviteInfo {
    expiryInHours: number;
    max: number;
    invites: Array<InviteCode>;
}
export interface ContractCall {
    signature: string;
    function: string;
    args: Array<TupleComponent>;
}
export interface TupleComponent {
    name?: string;
    type: string;
    value: any;
}
export interface AddressOverrides {
    trailsLiFiSapientSignerAddress?: string;
    trailsRelaySapientSignerAddress?: string;
    trailsCCTPV2SapientSignerAddress?: string;
}
export interface TakerFee {
    address: string;
    bps: number;
}
export interface OriginCall {
    chainId: number;
    to: string;
    transactionData: string;
    transactionValue: string;
}
export interface IntentPrecondition {
    type: string;
    chainId: string;
    data: any;
}
export interface UserStorage {
    userAddress: string;
    key: string;
    value: any;
}
export interface Token {
    chainId: number;
    contractAddress: string;
    tokenId?: string;
}
export interface Price {
    value: number;
    currency: string;
}
export interface TokenPrice {
    token: Token;
    price?: Price;
    price24hChange?: Price;
    floorPrice: Price;
    buyPrice: Price;
    sellPrice: Price;
    updatedAt: string;
}
export interface ExchangeRate {
    name: string;
    symbol: string;
    value: number;
    vsCurrency: string;
    currencyType: string;
}
export interface LinkedWallet {
    id: number;
    walletType?: string;
    walletAddress: string;
    linkedWalletAddress: string;
    createdAt?: string;
}
export interface Page {
    pageSize?: number;
    page?: number;
    totalRecords?: number;
    column?: string;
    before?: any;
    after?: any;
    sort?: Array<SortBy>;
    more?: boolean;
}
export interface SortBy {
    column: string;
    order: SortOrder;
}
export interface SardineNFTCheckoutParams {
    name: string;
    imageUrl: string;
    network: string;
    recipientAddress: string;
    blockchainNftId: string;
    contractAddress: string;
    quantity: number;
    decimals?: number;
    tokenAmount: string;
    tokenAddress: string;
    tokenSymbol: string;
    tokenDecimals?: number;
    calldata: string;
    platform: string;
    approvedSpenderAddress?: string;
}
export interface SardineNFTCheckout {
    token: string;
    expiresAt: string;
    orderId: string;
}
export interface SardineOrder {
    id: string;
    createdAt?: string;
    referenceId: string;
    status: string;
    fiatCurrency: string;
    fiatExchangeRateUSD: number;
    transactionId: string;
    expiresAt?: string;
    total: number;
    subTotal: number;
    transactionFee: number;
    networkFee: number;
    paymentCurrency?: string;
    paymentMethodType?: string;
    transactionType: string;
    name: string;
    price: number;
    imageUrl: string;
    contractAddress?: string;
    transactionHash?: string;
    recipientAddress: string;
}
export interface SardineRegion {
    countryCode: string;
    isAllowedOnRamp: boolean;
    isAllowedOnNFT: boolean;
    isBasicKycRequired: Array<string>;
    isSsnRequired: Array<string>;
    name: string;
    currencyCode: string;
    isPayrollSupported: boolean;
    supportedDocuments: Array<string>;
    paymentMethods: Array<SardineRegionPaymentMethod>;
    states: Array<SardineRegionState>;
}
export interface SardineRegionPaymentMethod {
    name: string;
    isAllowedOnRamp: boolean;
    isAllowedOnNFT: boolean;
    subTypes: Array<string>;
    type: string;
    subType: string;
}
export interface SardineRegionState {
    code: string;
    name: string;
    isAllowedOnRamp: boolean;
    isAllowedOnNFT: boolean;
}
export interface SardineSupportedToken {
    network: string;
    assetSymbol: string;
    assetName: string;
    chainId: string;
    tokenName: string;
    token: string;
    tokenAddress: string;
}
export interface SardineSupportedTokenForSwap {
    isSupported: boolean;
    isSupportedForAbstraction: boolean;
    currentBalance: string;
}
export interface SardineEnabledToken {
    network: string;
    assetSymbol: string;
    assetName: string;
    chainId: string;
    tokenName: string;
    token: string;
    tokenAddress: string;
}
export interface SardineGetQuoteParams {
    assetType: string;
    network: string;
    total: number;
    currency?: string;
    paymentType?: SardinePaymentType;
    quoteType?: SardineQuoteType;
    walletAddress?: string;
}
export interface SardineQuote {
    quantity: number;
    network: string;
    assetType: string;
    total: number;
    currency: string;
    expiresAt: string;
    paymentType: string;
    price: number;
    subtotal: number;
    transactionFee: number;
    networkFee: number;
    highNetworkFee: boolean;
    minTransactionValue: number;
    maxTransactionValue: number;
    liquidityProvider: string;
}
export interface SardineFiatCurrency {
    currencyCode: string;
    name: string;
    currencySymbol: string;
    paymentOptions: Array<SardinePaymentOption>;
    supportingCountries: Array<string>;
}
export interface SardinePaymentOption {
    name: string;
    dailyLimit: number;
    weeklyLimit: number;
    monthlyLimit: number;
    maxAmount: number;
    minAmount: number;
    subTypes: Array<string>;
    type: string;
    subType: string;
    processingTime: string;
}
export interface LifiToken {
    chainId: number;
    address: string;
    symbol: string;
    name: string;
    decimals: number;
    priceUsd: number;
    price?: string;
    coinKey: string;
    logoUri: string;
}
export interface GetLifiSwapRouteParams {
    direction: GetLifiSwapRouteDirection;
    chainId: number;
    walletAddress: string;
    tokenAddress: string;
    tokenAmount: string;
}
export interface LifiSwapRoute {
    fromChainId: number;
    toChainId: number;
    fromTokens: Array<LifiToken>;
    toTokens: Array<LifiToken>;
}
export interface GetLifiSwapQuoteParams {
    chainId: number;
    walletAddress: string;
    fromTokenAddress: string;
    toTokenAddress: string;
    fromTokenAmount?: string;
    toTokenAmount?: string;
    includeApprove: boolean;
    slippageBps: number;
}
export interface LifiSwapQuote {
    currencyAddress: string;
    currencyBalance: string;
    price: string;
    maxPrice: string;
    to: string;
    transactionData: string;
    transactionValue: string;
    approveData: string;
    amount: string;
    amountMin: string;
}
export interface CurrencyGroup {
    name: string;
    tokens: Array<CurrencyGroupToken>;
}
export interface CurrencyGroupToken {
    chainId: number;
    tokenAddress: string;
}
export interface OffchainInventory {
    id: number;
    projectId: number;
    chainId: number;
    externalProductId: string;
    paymentTokenAddress: string;
    paymentTokenType: TokenType;
    paymentTokenId: number;
    paymentAmount: number;
    paymentRecipient: string;
    chainedCallAddress?: string;
    chainedCallData?: string;
    allowCrossChainPayments?: boolean;
    callbackURL?: string;
    createdAt: string;
    deletedAt?: string;
}
export interface CCTPTransfer {
    id: string;
    sourceTxHash: string;
    sourceChainId: number;
    destinationChainId: number;
    message: string;
    attestation: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}
export interface OffchainPayment {
    id: number;
    offchainInventoryId: number;
    productRecipient: string;
    paymentChainId: number;
    paymentTokenAddress: string;
    expiration: string;
    createdAt: string;
    completedAt?: string;
    processedAt?: string;
}
export interface PaymentResponse {
    paymentId: number;
    offchainInventoryId: number;
    chainId: number;
    externalProductId: string;
    paymentTokenAddress: string;
    paymentTokenType: TokenType;
    paymentTokenId: number;
    paymentTotal: number;
    expiration: string;
    signature: string;
    txTo: string;
    txData: string;
}
export interface AdoptedChildWallet {
    address: string;
}
export interface Pack {
    id: number;
    chainId: number;
    projectId: number;
    contractAddress: string;
    packId: string;
    content: Array<PackContent>;
    createdAt?: string;
}
export interface PackContent {
    tokenAddresses: Array<string>;
    isERC721: Array<boolean>;
    tokenIds: Array<Array<string>>;
    amounts: Array<Array<string>>;
}
export interface TransakCountry {
    alpha2: string;
    alpha3: string;
    isAllowed: boolean;
    isLightKycAllowed: boolean;
    name: string;
    currencyCode: string;
    supportedDocuments: Array<string>;
    partners: Array<TransakPartner>;
    states: Array<TransakState>;
}
export interface TransakPartner {
    name: string;
    isCardPayment: boolean;
    currencyCode: string;
}
export interface TransakState {
    code: string;
    name: string;
    isAllowed: boolean;
}
export interface TransakCryptoCurrency {
    id: string;
    coinID: string;
    address: string;
    addressAdditionalData: any;
    createdAt: string;
    decimals: number;
    image: TransakCryptoCurrencyImage;
    isAllowed: boolean;
    isPopular: boolean;
    isStable: boolean;
    name: string;
    roundOff: number;
    symbol: string;
    isIgnorePriceVerification: boolean;
    imageBk: TransakCryptoCurrencyImage;
    kycCountriesNotSupported: Array<string>;
    network: TransakCryptoCurrencyNetwork;
    uniqueID: string;
    tokenType: string;
    tokenIdentifier: string;
    isPayInAllowed: boolean;
    isSuspended: boolean;
}
export interface TransakCryptoCurrencyImage {
    large: string;
    small: string;
    thumb: string;
}
export interface TransakCryptoCurrencyNetwork {
    name: string;
    fiatCurrenciesNotSupported: Array<any>;
    chainID: string;
}
export interface TransakCryptoCurrencyNetworkFiatNotSupported {
    fiatCurrency: string;
    paymentMethod: string;
}
export interface TransakFiatCurrency {
    symbol: string;
    supportingCountries: Array<string>;
    logoSymbol: string;
    name: string;
    paymentOptions: Array<TransakFiatCurrencyPaymentOption>;
    isPopular: boolean;
    isAllowed: boolean;
    roundOff: number;
    isPayOutAllowed: boolean;
    defaultCountryForNFT: string;
    icon: string;
    displayMessage: string;
}
export interface TransakFiatCurrencyPaymentOption {
    name: string;
    id: string;
    isNftAllowed: boolean;
    isNonCustodial: boolean;
    processingTime: string;
    displayText: boolean;
    icon: string;
    limitCurrency: string;
    isActive: boolean;
    provider: string;
    maxAmount: number;
    minAmount: number;
    defaultAmount: number;
    isConverted: boolean;
    visaPayoutCountries: Array<string>;
    mastercardPayoutCountries: Array<string>;
    isPayOutAllowed: boolean;
    minAmountForPayOut: number;
    maxAmountForPayOut: number;
    defaultAmountForPayOut: number;
}
export interface TransakPrice {
    quoteID: string;
    conversionPrice: number;
    marketConversionPrice: number;
    slippage: number;
    fiatCurrency: string;
    cryptoCurrency: string;
    paymentMethod: string;
    fiatAmount: number;
    cryptoAmount: number;
    isBuyOrSell: string;
    network: string;
    feeDecimal: number;
    totalFee: number;
    feeBreakdown: Array<TransakPriceFeeBreakdown>;
    nonce: number;
    cryptoLiquidityProvider: string;
    notes: Array<any>;
}
export interface TransakPriceFeeBreakdown {
    Name: string;
    Value: number;
    ID: string;
    Ids: Array<string>;
}
export interface TransakGetPriceParams {
    fiatCurrency: string;
    cryptoCurrency: string;
    isBuyOrSell: TransakBuySell;
    network: string;
    paymentMethod: string;
    fiatAmount: number;
    cryptoAmount: number;
    quoteCountryCode: string;
}
export interface TransakChain {
    name: string;
    chainId: number;
}
export interface CheckoutOptionsPrimaryParams {
    quantity: string;
    tokenId: string;
}
export interface CheckoutOptionsSecondaryParams {
    collectionAddress: string;
    marketplaceAddress: string;
    currencyAddress: string;
    priceAmount: string;
    tokenId: string;
}
export interface CheckoutOptions {
    crypto: CheckoutOptionCrypto;
    swap: Array<CheckoutOptionSwapProvider>;
    nftCheckout: Array<CheckoutOptionNFTCheckoutProvider>;
    onRamp: Array<CheckoutOptionOnRampProvider>;
}
export interface FortePayCreateIntent {
    blockchain: string;
    buyer: FortePayBuyer;
    currency: string;
    idempotencyKey: string;
    items: Array<FortePayItem>;
    seller: FortePaySeller;
    transactionType: string;
}
export interface FortePayBuyer {
    wallet: FortePayWallet;
    email: string;
    id: string;
}
export interface FortePaySeller {
    wallet: FortePayWallet;
}
export interface FortePayWallet {
    address: string;
    blockchain: string;
}
export interface FortePayItem {
    amount: string;
    id: string;
    imageUrl: string;
    listingData: FortePayItemListingData;
    nftData: FortePayItemNFTData;
    mintData: FortePayItemMintData;
    title: string;
}
export interface FortePayItemListingData {
    orderHash: string;
    protocol: string;
    protocolAddress: string;
    auctionHouse: string;
    tokenAddress: string;
    calldata: string;
    payToAddress: string;
    structuredCalldata: any;
}
export interface FortePayItemNFTData {
    contractAddress: string;
    tokenId: string;
}
export interface FortePayItemMintData {
    nonce: string;
    protocol: string;
    protocolAddress: string;
    signature: string;
    tokenIds: Array<string>;
    calldata: string;
    payToAddress: string;
    tokenContractAddress: string;
    structuredCalldata: any;
}
export interface FortePayIntent {
    flow: string;
    widgetData: string;
    paymentIntentId: string;
    notes: Array<string>;
}
export interface FortePaymentStatus {
    paymentIntentId: string;
    status: string;
}
export interface CrossChainFee {
    providerFee: string;
    trailsSwapFee: string;
    providerFeeUSD: number;
    trailsSwapFeeUSD: number;
    totalFeeAmount: string;
    totalFeeUSD: number;
}
export interface MetaTxnFeeDetail {
    metaTxnID: string;
    estimatedGasLimit: string;
    feeNative: string;
}
export interface ChainExecuteQuote {
    chainId: string;
    totalGasLimit: string;
    gasPrice: string;
    totalFeeAmount: string;
    nativeTokenSymbol: string;
    nativeTokenPrice?: string;
    metaTxnFeeDetails: Array<MetaTxnFeeDetail>;
    totalFeeUSD?: string;
}
export interface ExecuteQuote {
    chainQuotes: Array<ChainExecuteQuote>;
}
export interface TrailsFee {
    executeQuote: ExecuteQuote;
    crossChainFee?: CrossChainFee;
    takerFeeAmount?: string;
    takerFeeUSD?: number;
    trailsFixedFeeUSD: number;
    feeToken?: string;
    originTokenTotalAmount?: string;
    totalFeeAmount?: string;
    totalFeeUSD?: string;
    quoteProvider?: string;
}
export interface IntentQuote {
    fromAmount: string;
    fromAmountMin: string;
    toAmount: string;
    toAmountMin: string;
    priceImpact: number;
    priceImpactUsd: string;
    maxSlippage: number;
    quoteProvider: string;
    quoteProviderRequestId: string;
    quoteProviderFeeUsd: string;
}
export interface API {
    /**
     *
     * Runtime
     *
     */
    ping(headers?: object, signal?: AbortSignal): Promise<PingReturn>;
    version(headers?: object, signal?: AbortSignal): Promise<VersionReturn>;
    runtimeStatus(headers?: object, signal?: AbortSignal): Promise<RuntimeStatusReturn>;
    clock(headers?: object, signal?: AbortSignal): Promise<ClockReturn>;
    getSequenceContext(headers?: object, signal?: AbortSignal): Promise<GetSequenceContextReturn>;
    /**
     *
     * Auth
     *
     * TODO: rename 'ewtString' arg to 'ethauthProof'
     */
    getAuthToken(args: GetAuthTokenArgs, headers?: object, signal?: AbortSignal): Promise<GetAuthTokenReturn>;
    getAuthToken2(args: GetAuthToken2Args, headers?: object, signal?: AbortSignal): Promise<GetAuthToken2Return>;
    sendPasswordlessLink(args: SendPasswordlessLinkArgs, headers?: object, signal?: AbortSignal): Promise<SendPasswordlessLinkReturn>;
    registerPublicKey(args: RegisterPublicKeyArgs, headers?: object, signal?: AbortSignal): Promise<RegisterPublicKeyReturn>;
    getPublicKey(args: GetPublicKeyArgs, headers?: object, signal?: AbortSignal): Promise<GetPublicKeyReturn>;
    /**
     *
     * Contacts / Friends
     *
     */
    friendList(args: FriendListArgs, headers?: object, signal?: AbortSignal): Promise<FriendListReturn>;
    getFriendByAddress(args: GetFriendByAddressArgs, headers?: object, signal?: AbortSignal): Promise<GetFriendByAddressReturn>;
    searchFriends(args: SearchFriendsArgs, headers?: object, signal?: AbortSignal): Promise<SearchFriendsReturn>;
    addFriend(args: AddFriendArgs, headers?: object, signal?: AbortSignal): Promise<AddFriendReturn>;
    updateFriendNickname(args: UpdateFriendNicknameArgs, headers?: object, signal?: AbortSignal): Promise<UpdateFriendNicknameReturn>;
    removeFriend(args: RemoveFriendArgs, headers?: object, signal?: AbortSignal): Promise<RemoveFriendReturn>;
    /**
     *
     * Chain-Utils
     *
     */
    contractCall(args: ContractCallArgs, headers?: object, signal?: AbortSignal): Promise<ContractCallReturn>;
    decodeContractCall(args: DecodeContractCallArgs, headers?: object, signal?: AbortSignal): Promise<DecodeContractCallReturn>;
    lookupContractCallSelectors(args: LookupContractCallSelectorsArgs, headers?: object, signal?: AbortSignal): Promise<LookupContractCallSelectorsReturn>;
    /**
     *
     * User Storage
     *
     */
    userStorageFetch(args: UserStorageFetchArgs, headers?: object, signal?: AbortSignal): Promise<UserStorageFetchReturn>;
    userStorageSave(args: UserStorageSaveArgs, headers?: object, signal?: AbortSignal): Promise<UserStorageSaveReturn>;
    userStorageDelete(args: UserStorageDeleteArgs, headers?: object, signal?: AbortSignal): Promise<UserStorageDeleteReturn>;
    userStorageFetchAll(args: UserStorageFetchAllArgs, headers?: object, signal?: AbortSignal): Promise<UserStorageFetchAllReturn>;
    /**
     *
     * Wallet utils
     *
     */
    getMoonpayLink(args: GetMoonpayLinkArgs, headers?: object, signal?: AbortSignal): Promise<GetMoonpayLinkReturn>;
    /**
     * - IsUsingGoogleMail(domain: string) => (yes: bool)
     */
    resolveENSAddress(args: ResolveENSAddressArgs, headers?: object, signal?: AbortSignal): Promise<ResolveENSAddressReturn>;
    /**
     * TODO: we can add walletContext optional in the future when we need it
     * NOTE: chainId can be either a number or canonical name
     */
    isValidSignature(args: IsValidSignatureArgs, headers?: object, signal?: AbortSignal): Promise<IsValidSignatureReturn>;
    isValidMessageSignature(args: IsValidMessageSignatureArgs, headers?: object, signal?: AbortSignal): Promise<IsValidMessageSignatureReturn>;
    isValidTypedDataSignature(args: IsValidTypedDataSignatureArgs, headers?: object, signal?: AbortSignal): Promise<IsValidTypedDataSignatureReturn>;
    isValidETHAuthProof(args: IsValidETHAuthProofArgs, headers?: object, signal?: AbortSignal): Promise<IsValidETHAuthProofReturn>;
    getOnRampURL(args: GetOnRampURLArgs, headers?: object, signal?: AbortSignal): Promise<GetOnRampURLReturn>;
    sardineGetClientToken(headers?: object, signal?: AbortSignal): Promise<SardineGetClientTokenReturn>;
    sardineGetNFTCheckoutToken(args: SardineGetNFTCheckoutTokenArgs, headers?: object, signal?: AbortSignal): Promise<SardineGetNFTCheckoutTokenReturn>;
    sardineGetNFTCheckoutOrderStatus(args: SardineGetNFTCheckoutOrderStatusArgs, headers?: object, signal?: AbortSignal): Promise<SardineGetNFTCheckoutOrderStatusReturn>;
    sardineGetSupportedRegions(headers?: object, signal?: AbortSignal): Promise<SardineGetSupportedRegionsReturn>;
    sardineGetSupportedFiatCurrencies(headers?: object, signal?: AbortSignal): Promise<SardineGetSupportedFiatCurrenciesReturn>;
    sardineGetSupportedTokens(headers?: object, signal?: AbortSignal): Promise<SardineGetSupportedTokensReturn>;
    sardineGetSupportedTokenForSwap(args: SardineGetSupportedTokenForSwapArgs, headers?: object, signal?: AbortSignal): Promise<SardineGetSupportedTokenForSwapReturn>;
    sardineGetEnabledTokens(headers?: object, signal?: AbortSignal): Promise<SardineGetEnabledTokensReturn>;
    sardineGetQuote(args: SardineGetQuoteArgs, headers?: object, signal?: AbortSignal): Promise<SardineGetQuoteReturn>;
    /**
     * Deprecated. Use SardineGetClientToken() instead.
     */
    getSardineClientToken(headers?: object, signal?: AbortSignal): Promise<GetSardineClientTokenReturn>;
    /**
     * Deprecated. Use SardineGetNFTCheckoutToken() instead.
     */
    getSardineNFTCheckoutToken(args: GetSardineNFTCheckoutTokenArgs, headers?: object, signal?: AbortSignal): Promise<GetSardineNFTCheckoutTokenReturn>;
    /**
     * Deprecated. Use SardineGetNFTCheckoutOrderStatus() instead.
     */
    getSardineNFTCheckoutOrderStatus(args: GetSardineNFTCheckoutOrderStatusArgs, headers?: object, signal?: AbortSignal): Promise<GetSardineNFTCheckoutOrderStatusReturn>;
    transakGetCountries(headers?: object, signal?: AbortSignal): Promise<TransakGetCountriesReturn>;
    transakGetCryptoCurrencies(headers?: object, signal?: AbortSignal): Promise<TransakGetCryptoCurrenciesReturn>;
    transakGetFiatCurrencies(headers?: object, signal?: AbortSignal): Promise<TransakGetFiatCurrenciesReturn>;
    transakGetPrice(args: TransakGetPriceArgs, headers?: object, signal?: AbortSignal): Promise<TransakGetPriceReturn>;
    transakGetSupportedNFTCheckoutChains(headers?: object, signal?: AbortSignal): Promise<TransakGetSupportedNFTCheckoutChainsReturn>;
    /**
     *
     * Price Feed
     *
     */
    getCoinPrices(args: GetCoinPricesArgs, headers?: object, signal?: AbortSignal): Promise<GetCoinPricesReturn>;
    getCollectiblePrices(args: GetCollectiblePricesArgs, headers?: object, signal?: AbortSignal): Promise<GetCollectiblePricesReturn>;
    /**
     *
     * Price Feed utils
     *
     */
    getExchangeRate(args: GetExchangeRateArgs, headers?: object, signal?: AbortSignal): Promise<GetExchangeRateReturn>;
    /**
     *
     * Util / misc
     *
     */
    memoryStore(args: MemoryStoreArgs, headers?: object, signal?: AbortSignal): Promise<MemoryStoreReturn>;
    memoryLoad(args: MemoryLoadArgs, headers?: object, signal?: AbortSignal): Promise<MemoryLoadReturn>;
    /**
     *
     * Legacy
     *
     */
    getInviteInfo(headers?: object, signal?: AbortSignal): Promise<GetInviteInfoReturn>;
    /**
     * NOTE: we're still using this from SW-API to Sequence-API to claim invite code
     */
    isValidAccessCode(args: IsValidAccessCodeArgs, headers?: object, signal?: AbortSignal): Promise<IsValidAccessCodeReturn>;
    internalClaimAccessCode(args: InternalClaimAccessCodeArgs, headers?: object, signal?: AbortSignal): Promise<InternalClaimAccessCodeReturn>;
    /**
     * Utils
     */
    blockNumberAtTime(args: BlockNumberAtTimeArgs, headers?: object, signal?: AbortSignal): Promise<BlockNumberAtTimeReturn>;
    /**
     *
     * Paper
     * TODO: deprecate in the future
     *
     */
    paperSessionSecret(args: PaperSessionSecretArgs, headers?: object, signal?: AbortSignal): Promise<PaperSessionSecretReturn>;
    paperSessionSecret2(args: PaperSessionSecret2Args, headers?: object, signal?: AbortSignal): Promise<PaperSessionSecret2Return>;
    /**
     *
     * Linked wallets (v0 -- simple support)
     *
     */
    linkWallet(args: LinkWalletArgs, headers?: object, signal?: AbortSignal): Promise<LinkWalletReturn>;
    getLinkedWallets(args: GetLinkedWalletsArgs, headers?: object, signal?: AbortSignal): Promise<GetLinkedWalletsReturn>;
    removeLinkedWallet(args: RemoveLinkedWalletArgs, headers?: object, signal?: AbortSignal): Promise<RemoveLinkedWalletReturn>;
    /**
     * NOTE: these methods are deprecated, please do not use them. We may resurface them in the future, but just wanted
     * to be clear, they are not necessary for our linked wallets.
     */
    generateWaaSVerificationURL(args: GenerateWaaSVerificationURLArgs, headers?: object, signal?: AbortSignal): Promise<GenerateWaaSVerificationURLReturn>;
    validateWaaSVerificationNonce(args: ValidateWaaSVerificationNonceArgs, headers?: object, signal?: AbortSignal): Promise<ValidateWaaSVerificationNonceReturn>;
    /**
     *
     *
     * WaaS child wallet adoption
     *
     */
    listAdoptedWallets(args: ListAdoptedWalletsArgs, headers?: object, signal?: AbortSignal): Promise<ListAdoptedWalletsReturn>;
    getLifiChains(headers?: object, signal?: AbortSignal): Promise<GetLifiChainsReturn>;
    getLifiTokens(args: GetLifiTokensArgs, headers?: object, signal?: AbortSignal): Promise<GetLifiTokensReturn>;
    /**
     * All parameters except `params` are deprecated.
     * Use only the `params` object to pass values.
     */
    getLifiSwapRoutes(args: GetLifiSwapRoutesArgs, headers?: object, signal?: AbortSignal): Promise<GetLifiSwapRoutesReturn>;
    getLifiSwapQuote(args: GetLifiSwapQuoteArgs, headers?: object, signal?: AbortSignal): Promise<GetLifiSwapQuoteReturn>;
    /**
     *
     * Chain abstraction
     *
     */
    getIntentCallsPayloads(args: GetIntentCallsPayloadsArgs, headers?: object, signal?: AbortSignal): Promise<GetIntentCallsPayloadsReturn>;
    commitIntentConfig(args: CommitIntentConfigArgs, headers?: object, signal?: AbortSignal): Promise<CommitIntentConfigReturn>;
    getIntentConfig(args: GetIntentConfigArgs, headers?: object, signal?: AbortSignal): Promise<GetIntentConfigReturn>;
    /**
     *
     * Inventory, payments and management
     *
     */
    listCurrencyGroups(headers?: object, signal?: AbortSignal): Promise<ListCurrencyGroupsReturn>;
    addOffchainInventory(args: AddOffchainInventoryArgs, headers?: object, signal?: AbortSignal): Promise<AddOffchainInventoryReturn>;
    getOffchainInventory(args: GetOffchainInventoryArgs, headers?: object, signal?: AbortSignal): Promise<GetOffchainInventoryReturn>;
    listOffchainInventories(args: ListOffchainInventoriesArgs, headers?: object, signal?: AbortSignal): Promise<ListOffchainInventoriesReturn>;
    updateOffchainInventory(args: UpdateOffchainInventoryArgs, headers?: object, signal?: AbortSignal): Promise<UpdateOffchainInventoryReturn>;
    deleteOffchainInventory(args: DeleteOffchainInventoryArgs, headers?: object, signal?: AbortSignal): Promise<DeleteOffchainInventoryReturn>;
    requestOffchainPayment(args: RequestOffchainPaymentArgs, headers?: object, signal?: AbortSignal): Promise<RequestOffchainPaymentReturn>;
    listOffchainPayments(args: ListOffchainPaymentsArgs, headers?: object, signal?: AbortSignal): Promise<ListOffchainPaymentsReturn>;
    /**
     *
     * Packs
     *
     */
    savePack(args: SavePackArgs, headers?: object, signal?: AbortSignal): Promise<SavePackReturn>;
    getPack(args: GetPackArgs, headers?: object, signal?: AbortSignal): Promise<GetPackReturn>;
    getPackIds(args: GetPackIdsArgs, headers?: object, signal?: AbortSignal): Promise<GetPackIdsReturn>;
    deletePack(args: DeletePackArgs, headers?: object, signal?: AbortSignal): Promise<DeletePackReturn>;
    updatePackContent(args: UpdatePackContentArgs, headers?: object, signal?: AbortSignal): Promise<UpdatePackContentReturn>;
    getRevealTxData(args: GetRevealTxDataArgs, headers?: object, signal?: AbortSignal): Promise<GetRevealTxDataReturn>;
    checkoutOptionsPrimary(args: CheckoutOptionsPrimaryArgs, headers?: object, signal?: AbortSignal): Promise<CheckoutOptionsPrimaryReturn>;
    checkoutOptionsSecondary(args: CheckoutOptionsSecondaryArgs, headers?: object, signal?: AbortSignal): Promise<CheckoutOptionsSecondaryReturn>;
    checkoutOptionsGetTransakContractID(args: CheckoutOptionsGetTransakContractIDArgs, headers?: object, signal?: AbortSignal): Promise<CheckoutOptionsGetTransakContractIDReturn>;
    fortePayCreateIntent(args: FortePayCreateIntentArgs, headers?: object, signal?: AbortSignal): Promise<FortePayCreateIntentReturn>;
    fortePayGetPaymentStatuses(args: FortePayGetPaymentStatusesArgs, headers?: object, signal?: AbortSignal): Promise<FortePayGetPaymentStatusesReturn>;
    /**
     *
     * CCTP
     *
     */
    getCCTPTransfer(args: GetCCTPTransferArgs, headers?: object, signal?: AbortSignal): Promise<GetCCTPTransferReturn>;
    queueCCTPTransfer(args: QueueCCTPTransferArgs, headers?: object, signal?: AbortSignal): Promise<QueueCCTPTransferReturn>;
}
export interface PingArgs {
}
export interface PingReturn {
    status: boolean;
}
export interface VersionArgs {
}
export interface VersionReturn {
    version: Version;
}
export interface RuntimeStatusArgs {
}
export interface RuntimeStatusReturn {
    status: RuntimeStatus;
}
export interface ClockArgs {
}
export interface ClockReturn {
    serverTime: string;
}
export interface GetSequenceContextArgs {
}
export interface GetSequenceContextReturn {
    data: SequenceContext;
}
export interface GetAuthTokenArgs {
    ewtString: string;
    testnetMode?: boolean;
}
export interface GetAuthTokenReturn {
    status: boolean;
    jwtToken: string;
    address: string;
    user?: User;
}
export interface GetAuthToken2Args {
    ewtString: string;
    chainID: string;
}
export interface GetAuthToken2Return {
    status: boolean;
    jwtToken: string;
    address: string;
    user?: User;
}
export interface SendPasswordlessLinkArgs {
    email: string;
    redirectUri: string;
    intent: string;
}
export interface SendPasswordlessLinkReturn {
    status: boolean;
}
export interface RegisterPublicKeyArgs {
    publicKey: PublicKey;
}
export interface RegisterPublicKeyReturn {
    status: boolean;
}
export interface GetPublicKeyArgs {
    id: string;
}
export interface GetPublicKeyReturn {
    publicKey: PublicKey;
}
export interface FriendListArgs {
    nickname?: string;
    page?: Page;
}
export interface FriendListReturn {
    page: Page;
    friends: Array<Friend>;
}
export interface GetFriendByAddressArgs {
    friendAddress: string;
}
export interface GetFriendByAddressReturn {
    status: boolean;
    friend: Friend;
}
export interface SearchFriendsArgs {
    filterUsername: string;
    page?: Page;
}
export interface SearchFriendsReturn {
    friends: Array<Friend>;
}
export interface AddFriendArgs {
    friendAddress: string;
    optionalNickname?: string;
}
export interface AddFriendReturn {
    status: boolean;
    friend?: Friend;
}
export interface UpdateFriendNicknameArgs {
    friendAddress: string;
    nickname: string;
}
export interface UpdateFriendNicknameReturn {
    status: boolean;
    friend?: Friend;
}
export interface RemoveFriendArgs {
    friendAddress: string;
}
export interface RemoveFriendReturn {
    status: boolean;
}
export interface ContractCallArgs {
    chainID: string;
    contract: string;
    inputExpr: string;
    outputExpr: string;
    args: Array<string>;
}
export interface ContractCallReturn {
    returns: Array<string>;
}
export interface DecodeContractCallArgs {
    callData: string;
}
export interface DecodeContractCallReturn {
    call: ContractCall;
}
export interface LookupContractCallSelectorsArgs {
    selectors: Array<string>;
}
export interface LookupContractCallSelectorsReturn {
    signatures: Array<Array<string>>;
}
export interface UserStorageFetchArgs {
    key: string;
}
export interface UserStorageFetchReturn {
    object: any;
}
export interface UserStorageSaveArgs {
    key: string;
    object: any;
}
export interface UserStorageSaveReturn {
    ok: boolean;
}
export interface UserStorageDeleteArgs {
    key: string;
}
export interface UserStorageDeleteReturn {
    ok: boolean;
}
export interface UserStorageFetchAllArgs {
    keys?: Array<string>;
}
export interface UserStorageFetchAllReturn {
    objects: {
        [key: string]: any;
    };
}
export interface GetMoonpayLinkArgs {
    url: string;
}
export interface GetMoonpayLinkReturn {
    signedUrl: string;
}
export interface ResolveENSAddressArgs {
    ens: string;
}
export interface ResolveENSAddressReturn {
    address: string;
    ok: boolean;
}
export interface IsValidSignatureArgs {
    chainId: string;
    walletAddress: string;
    digest: string;
    signature: string;
}
export interface IsValidSignatureReturn {
    isValid: boolean;
}
export interface IsValidMessageSignatureArgs {
    chainId: string;
    walletAddress: string;
    message: string;
    signature: string;
}
export interface IsValidMessageSignatureReturn {
    isValid: boolean;
}
export interface IsValidTypedDataSignatureArgs {
    chainId: string;
    walletAddress: string;
    typedData: any;
    signature: string;
}
export interface IsValidTypedDataSignatureReturn {
    isValid: boolean;
}
export interface IsValidETHAuthProofArgs {
    chainId: string;
    walletAddress: string;
    ethAuthProofString: string;
}
export interface IsValidETHAuthProofReturn {
    isValid: boolean;
}
export interface GetOnRampURLArgs {
    chainId: string;
}
export interface GetOnRampURLReturn {
    url: string;
}
export interface SardineGetClientTokenArgs {
}
export interface SardineGetClientTokenReturn {
    token: string;
}
export interface SardineGetNFTCheckoutTokenArgs {
    params: SardineNFTCheckoutParams;
}
export interface SardineGetNFTCheckoutTokenReturn {
    resp: SardineNFTCheckout;
}
export interface SardineGetNFTCheckoutOrderStatusArgs {
    orderId: string;
}
export interface SardineGetNFTCheckoutOrderStatusReturn {
    resp: SardineOrder;
}
export interface SardineGetSupportedRegionsArgs {
}
export interface SardineGetSupportedRegionsReturn {
    regions: Array<SardineRegion>;
}
export interface SardineGetSupportedFiatCurrenciesArgs {
}
export interface SardineGetSupportedFiatCurrenciesReturn {
    tokens: Array<SardineFiatCurrency>;
}
export interface SardineGetSupportedTokensArgs {
}
export interface SardineGetSupportedTokensReturn {
    tokens: Array<SardineSupportedToken>;
}
export interface SardineGetSupportedTokenForSwapArgs {
    network: string;
    tokenAddress: string;
}
export interface SardineGetSupportedTokenForSwapReturn {
    token: SardineSupportedTokenForSwap;
}
export interface SardineGetEnabledTokensArgs {
}
export interface SardineGetEnabledTokensReturn {
    tokens: Array<SardineEnabledToken>;
}
export interface SardineGetQuoteArgs {
    params: SardineGetQuoteParams;
}
export interface SardineGetQuoteReturn {
    quote: SardineQuote;
}
export interface GetSardineClientTokenArgs {
}
export interface GetSardineClientTokenReturn {
    token: string;
}
export interface GetSardineNFTCheckoutTokenArgs {
    params: SardineNFTCheckoutParams;
}
export interface GetSardineNFTCheckoutTokenReturn {
    resp: SardineNFTCheckout;
}
export interface GetSardineNFTCheckoutOrderStatusArgs {
    orderId: string;
}
export interface GetSardineNFTCheckoutOrderStatusReturn {
    resp: SardineOrder;
}
export interface TransakGetCountriesArgs {
}
export interface TransakGetCountriesReturn {
    regions: Array<TransakCountry>;
}
export interface TransakGetCryptoCurrenciesArgs {
}
export interface TransakGetCryptoCurrenciesReturn {
    currencies: Array<TransakCryptoCurrency>;
}
export interface TransakGetFiatCurrenciesArgs {
}
export interface TransakGetFiatCurrenciesReturn {
    currencies: Array<TransakFiatCurrency>;
}
export interface TransakGetPriceArgs {
    params: TransakGetPriceParams;
}
export interface TransakGetPriceReturn {
    price: TransakPrice;
}
export interface TransakGetSupportedNFTCheckoutChainsArgs {
}
export interface TransakGetSupportedNFTCheckoutChainsReturn {
    chains: Array<TransakChain>;
}
export interface GetCoinPricesArgs {
    tokens: Array<Token>;
}
export interface GetCoinPricesReturn {
    tokenPrices: Array<TokenPrice>;
}
export interface GetCollectiblePricesArgs {
    tokens: Array<Token>;
}
export interface GetCollectiblePricesReturn {
    tokenPrices: Array<TokenPrice>;
}
export interface GetExchangeRateArgs {
    toCurrency: string;
}
export interface GetExchangeRateReturn {
    exchangeRate: ExchangeRate;
}
export interface MemoryStoreArgs {
    key: string;
    value: string;
}
export interface MemoryStoreReturn {
    ok: boolean;
}
export interface MemoryLoadArgs {
    key: string;
}
export interface MemoryLoadReturn {
    value: string;
}
export interface GetInviteInfoArgs {
}
export interface GetInviteInfoReturn {
    inviteInfo: InviteInfo;
}
export interface IsValidAccessCodeArgs {
    accessCode: string;
}
export interface IsValidAccessCodeReturn {
    status: boolean;
}
export interface InternalClaimAccessCodeArgs {
    address: string;
    accessCode: string;
}
export interface InternalClaimAccessCodeReturn {
    status: boolean;
}
export interface BlockNumberAtTimeArgs {
    chainId: number;
    timestamps: Array<number>;
}
export interface BlockNumberAtTimeReturn {
    blocks: Array<number>;
}
export interface PaperSessionSecretArgs {
    chainName: string;
    contractAddress: string;
    paramsJson: string;
    contractType: string;
}
export interface PaperSessionSecretReturn {
    secret: string;
}
export interface PaperSessionSecret2Args {
    chainName: string;
    contractAddress: string;
    paramsJson: string;
    abi: string;
}
export interface PaperSessionSecret2Return {
    secret: string;
}
export interface LinkWalletArgs {
    parentWalletAddress: string;
    parentWalletMessage: string;
    parentWalletSignature: string;
    linkedWalletAddress: string;
    linkedWalletMessage: string;
    linkedWalletSignature: string;
    signatureChainId: string;
    linkedWalletType?: string;
}
export interface LinkWalletReturn {
    status: boolean;
}
export interface GetLinkedWalletsArgs {
    parentWalletAddress: string;
    parentWalletMessage: string;
    parentWalletSignature: string;
    signatureChainId: string;
}
export interface GetLinkedWalletsReturn {
    linkedWallets: Array<LinkedWallet>;
}
export interface RemoveLinkedWalletArgs {
    parentWalletAddress: string;
    parentWalletMessage: string;
    parentWalletSignature: string;
    linkedWalletAddress: string;
    signatureChainId: string;
}
export interface RemoveLinkedWalletReturn {
    status: boolean;
}
export interface GenerateWaaSVerificationURLArgs {
    walletAddress: string;
}
export interface GenerateWaaSVerificationURLReturn {
    nonce: string;
    verificationURL: string;
}
export interface ValidateWaaSVerificationNonceArgs {
    nonce: string;
    signature: string;
    sessionId: string;
    chainId: string;
}
export interface ValidateWaaSVerificationNonceReturn {
    walletAddress: string;
}
export interface ListAdoptedWalletsArgs {
    page?: Page;
}
export interface ListAdoptedWalletsReturn {
    page: Page;
    wallets: Array<AdoptedChildWallet>;
}
export interface GetLifiChainsArgs {
}
export interface GetLifiChainsReturn {
    chains: Array<number>;
}
export interface GetLifiTokensArgs {
    chainIds: Array<number>;
}
export interface GetLifiTokensReturn {
    tokens: Array<Token>;
}
export interface GetLifiSwapRoutesArgs {
    params: GetLifiSwapRouteParams;
    chainId: number;
    toTokenAddress: string;
    toTokenAmount: string;
    walletAddress: string;
}
export interface GetLifiSwapRoutesReturn {
    routes: Array<LifiSwapRoute>;
}
export interface GetLifiSwapQuoteArgs {
    params: GetLifiSwapQuoteParams;
}
export interface GetLifiSwapQuoteReturn {
    quote: LifiSwapQuote;
}
export interface GetIntentCallsPayloadsArgs {
    userAddress: string;
    destinationChainId: number;
    destinationTokenAddress: string;
    destinationTokenAmount: string;
    destinationToAddress: string;
    originChainId: number;
    originTokenAddress: string;
    originTokenAmount: string;
    destinationCallData?: string;
    destinationCallValue?: string;
    provider?: string;
    addressOverrides?: AddressOverrides;
    destinationSalt?: string;
    takerFee?: TakerFee;
    slippageTolerance?: number;
    tradeType?: TradeType;
}
export interface GetIntentCallsPayloadsReturn {
    calls: Array<IntentCallsPayload>;
    preconditions: Array<IntentPrecondition>;
    metaTxns: Array<MetaTxn>;
    trailsFee: TrailsFee;
    quote: IntentQuote;
    originIntentAddress: string;
    destinationIntentAddress: string;
}
export interface CommitIntentConfigArgs {
    originIntentAddress: string;
    destinationIntentAddress: string;
    mainSigner: string;
    calls: Array<IntentCallsPayload>;
    preconditions: Array<IntentPrecondition>;
    addressOverrides?: AddressOverrides;
}
export interface CommitIntentConfigReturn {
    config: IntentConfig;
}
export interface GetIntentConfigArgs {
    intentAddress: string;
}
export interface GetIntentConfigReturn {
    config: IntentConfig;
}
export interface ListCurrencyGroupsArgs {
}
export interface ListCurrencyGroupsReturn {
    currencyGroups: Array<CurrencyGroup>;
}
export interface AddOffchainInventoryArgs {
    inventory: OffchainInventory;
}
export interface AddOffchainInventoryReturn {
    inventoryId: number;
}
export interface GetOffchainInventoryArgs {
    inventoryId: number;
}
export interface GetOffchainInventoryReturn {
    inventory: OffchainInventory;
}
export interface ListOffchainInventoriesArgs {
    projectId: number;
}
export interface ListOffchainInventoriesReturn {
    inventory: Array<OffchainInventory>;
}
export interface UpdateOffchainInventoryArgs {
    inventory: OffchainInventory;
}
export interface UpdateOffchainInventoryReturn {
}
export interface DeleteOffchainInventoryArgs {
    inventoryId: number;
}
export interface DeleteOffchainInventoryReturn {
    ok: boolean;
}
export interface RequestOffchainPaymentArgs {
    inventoryId: number;
    recipient: string;
    chainId?: number;
    tokenAddress?: string;
}
export interface RequestOffchainPaymentReturn {
    payment: PaymentResponse;
}
export interface ListOffchainPaymentsArgs {
    inventoryId: number;
    page?: Page;
}
export interface ListOffchainPaymentsReturn {
    page: Page;
    payments: Array<OffchainPayment>;
}
export interface SavePackArgs {
    pack: Pack;
}
export interface SavePackReturn {
    merkleRoot: string;
}
export interface GetPackArgs {
    contractAddress: string;
    packId: string;
    chainId: number;
}
export interface GetPackReturn {
    pack: Pack;
}
export interface GetPackIdsArgs {
    contractAddress: string;
    chainId: number;
}
export interface GetPackIdsReturn {
    packIds: Array<string>;
}
export interface DeletePackArgs {
    contractAddress: string;
    packId: string;
    chainId: number;
}
export interface DeletePackReturn {
    status: boolean;
}
export interface UpdatePackContentArgs {
    pack: Pack;
}
export interface UpdatePackContentReturn {
    merkleRoot: string;
}
export interface GetRevealTxDataArgs {
    contractAddress: string;
    packId: string;
    chainId: number;
    userAddress: string;
}
export interface GetRevealTxDataReturn {
    txData: string;
}
export interface CheckoutOptionsPrimaryArgs {
    chainId: number;
    wallet: string;
    contractAddress: string;
    collectionAddress: string;
    params: Array<CheckoutOptionsPrimaryParams>;
}
export interface CheckoutOptionsPrimaryReturn {
    options: CheckoutOptions;
}
export interface CheckoutOptionsSecondaryArgs {
    chainId: number;
    wallet: string;
    params: Array<CheckoutOptionsSecondaryParams>;
}
export interface CheckoutOptionsSecondaryReturn {
    options: CheckoutOptions;
}
export interface CheckoutOptionsGetTransakContractIDArgs {
    chainId: number;
    contractAddress: string;
}
export interface CheckoutOptionsGetTransakContractIDReturn {
    contractId: string;
}
export interface FortePayCreateIntentArgs {
    intent: FortePayCreateIntent;
}
export interface FortePayCreateIntentReturn {
    resp: FortePayIntent;
}
export interface FortePayGetPaymentStatusesArgs {
    paymentIntentIds: Array<string>;
}
export interface FortePayGetPaymentStatusesReturn {
    statuses: Array<FortePaymentStatus>;
}
export interface GetCCTPTransferArgs {
    id: string;
}
export interface GetCCTPTransferReturn {
    transfer: CCTPTransfer;
}
export interface QueueCCTPTransferArgs {
    sourceTxHash?: string;
    metaTxHash?: string;
    sourceChainId: number;
    destinationChainId: number;
}
export interface QueueCCTPTransferReturn {
    transfer: CCTPTransfer;
}
export declare class API implements API {
    protected hostname: string;
    protected fetch: Fetch;
    protected path: string;
    constructor(hostname: string, fetch: Fetch);
    private url;
    ping: (headers?: object, signal?: AbortSignal) => Promise<PingReturn>;
    version: (headers?: object, signal?: AbortSignal) => Promise<VersionReturn>;
    runtimeStatus: (headers?: object, signal?: AbortSignal) => Promise<RuntimeStatusReturn>;
    clock: (headers?: object, signal?: AbortSignal) => Promise<ClockReturn>;
    getSequenceContext: (headers?: object, signal?: AbortSignal) => Promise<GetSequenceContextReturn>;
    getAuthToken: (args: GetAuthTokenArgs, headers?: object, signal?: AbortSignal) => Promise<GetAuthTokenReturn>;
    getAuthToken2: (args: GetAuthToken2Args, headers?: object, signal?: AbortSignal) => Promise<GetAuthToken2Return>;
    sendPasswordlessLink: (args: SendPasswordlessLinkArgs, headers?: object, signal?: AbortSignal) => Promise<SendPasswordlessLinkReturn>;
    registerPublicKey: (args: RegisterPublicKeyArgs, headers?: object, signal?: AbortSignal) => Promise<RegisterPublicKeyReturn>;
    getPublicKey: (args: GetPublicKeyArgs, headers?: object, signal?: AbortSignal) => Promise<GetPublicKeyReturn>;
    friendList: (args: FriendListArgs, headers?: object, signal?: AbortSignal) => Promise<FriendListReturn>;
    getFriendByAddress: (args: GetFriendByAddressArgs, headers?: object, signal?: AbortSignal) => Promise<GetFriendByAddressReturn>;
    searchFriends: (args: SearchFriendsArgs, headers?: object, signal?: AbortSignal) => Promise<SearchFriendsReturn>;
    addFriend: (args: AddFriendArgs, headers?: object, signal?: AbortSignal) => Promise<AddFriendReturn>;
    updateFriendNickname: (args: UpdateFriendNicknameArgs, headers?: object, signal?: AbortSignal) => Promise<UpdateFriendNicknameReturn>;
    removeFriend: (args: RemoveFriendArgs, headers?: object, signal?: AbortSignal) => Promise<RemoveFriendReturn>;
    contractCall: (args: ContractCallArgs, headers?: object, signal?: AbortSignal) => Promise<ContractCallReturn>;
    decodeContractCall: (args: DecodeContractCallArgs, headers?: object, signal?: AbortSignal) => Promise<DecodeContractCallReturn>;
    lookupContractCallSelectors: (args: LookupContractCallSelectorsArgs, headers?: object, signal?: AbortSignal) => Promise<LookupContractCallSelectorsReturn>;
    userStorageFetch: (args: UserStorageFetchArgs, headers?: object, signal?: AbortSignal) => Promise<UserStorageFetchReturn>;
    userStorageSave: (args: UserStorageSaveArgs, headers?: object, signal?: AbortSignal) => Promise<UserStorageSaveReturn>;
    userStorageDelete: (args: UserStorageDeleteArgs, headers?: object, signal?: AbortSignal) => Promise<UserStorageDeleteReturn>;
    userStorageFetchAll: (args: UserStorageFetchAllArgs, headers?: object, signal?: AbortSignal) => Promise<UserStorageFetchAllReturn>;
    getMoonpayLink: (args: GetMoonpayLinkArgs, headers?: object, signal?: AbortSignal) => Promise<GetMoonpayLinkReturn>;
    resolveENSAddress: (args: ResolveENSAddressArgs, headers?: object, signal?: AbortSignal) => Promise<ResolveENSAddressReturn>;
    isValidSignature: (args: IsValidSignatureArgs, headers?: object, signal?: AbortSignal) => Promise<IsValidSignatureReturn>;
    isValidMessageSignature: (args: IsValidMessageSignatureArgs, headers?: object, signal?: AbortSignal) => Promise<IsValidMessageSignatureReturn>;
    isValidTypedDataSignature: (args: IsValidTypedDataSignatureArgs, headers?: object, signal?: AbortSignal) => Promise<IsValidTypedDataSignatureReturn>;
    isValidETHAuthProof: (args: IsValidETHAuthProofArgs, headers?: object, signal?: AbortSignal) => Promise<IsValidETHAuthProofReturn>;
    getOnRampURL: (args: GetOnRampURLArgs, headers?: object, signal?: AbortSignal) => Promise<GetOnRampURLReturn>;
    sardineGetClientToken: (headers?: object, signal?: AbortSignal) => Promise<SardineGetClientTokenReturn>;
    sardineGetNFTCheckoutToken: (args: SardineGetNFTCheckoutTokenArgs, headers?: object, signal?: AbortSignal) => Promise<SardineGetNFTCheckoutTokenReturn>;
    sardineGetNFTCheckoutOrderStatus: (args: SardineGetNFTCheckoutOrderStatusArgs, headers?: object, signal?: AbortSignal) => Promise<SardineGetNFTCheckoutOrderStatusReturn>;
    sardineGetSupportedRegions: (headers?: object, signal?: AbortSignal) => Promise<SardineGetSupportedRegionsReturn>;
    sardineGetSupportedFiatCurrencies: (headers?: object, signal?: AbortSignal) => Promise<SardineGetSupportedFiatCurrenciesReturn>;
    sardineGetSupportedTokens: (headers?: object, signal?: AbortSignal) => Promise<SardineGetSupportedTokensReturn>;
    sardineGetSupportedTokenForSwap: (args: SardineGetSupportedTokenForSwapArgs, headers?: object, signal?: AbortSignal) => Promise<SardineGetSupportedTokenForSwapReturn>;
    sardineGetEnabledTokens: (headers?: object, signal?: AbortSignal) => Promise<SardineGetEnabledTokensReturn>;
    sardineGetQuote: (args: SardineGetQuoteArgs, headers?: object, signal?: AbortSignal) => Promise<SardineGetQuoteReturn>;
    getSardineClientToken: (headers?: object, signal?: AbortSignal) => Promise<GetSardineClientTokenReturn>;
    getSardineNFTCheckoutToken: (args: GetSardineNFTCheckoutTokenArgs, headers?: object, signal?: AbortSignal) => Promise<GetSardineNFTCheckoutTokenReturn>;
    getSardineNFTCheckoutOrderStatus: (args: GetSardineNFTCheckoutOrderStatusArgs, headers?: object, signal?: AbortSignal) => Promise<GetSardineNFTCheckoutOrderStatusReturn>;
    transakGetCountries: (headers?: object, signal?: AbortSignal) => Promise<TransakGetCountriesReturn>;
    transakGetCryptoCurrencies: (headers?: object, signal?: AbortSignal) => Promise<TransakGetCryptoCurrenciesReturn>;
    transakGetFiatCurrencies: (headers?: object, signal?: AbortSignal) => Promise<TransakGetFiatCurrenciesReturn>;
    transakGetPrice: (args: TransakGetPriceArgs, headers?: object, signal?: AbortSignal) => Promise<TransakGetPriceReturn>;
    transakGetSupportedNFTCheckoutChains: (headers?: object, signal?: AbortSignal) => Promise<TransakGetSupportedNFTCheckoutChainsReturn>;
    getCoinPrices: (args: GetCoinPricesArgs, headers?: object, signal?: AbortSignal) => Promise<GetCoinPricesReturn>;
    getCollectiblePrices: (args: GetCollectiblePricesArgs, headers?: object, signal?: AbortSignal) => Promise<GetCollectiblePricesReturn>;
    getExchangeRate: (args: GetExchangeRateArgs, headers?: object, signal?: AbortSignal) => Promise<GetExchangeRateReturn>;
    memoryStore: (args: MemoryStoreArgs, headers?: object, signal?: AbortSignal) => Promise<MemoryStoreReturn>;
    memoryLoad: (args: MemoryLoadArgs, headers?: object, signal?: AbortSignal) => Promise<MemoryLoadReturn>;
    getInviteInfo: (headers?: object, signal?: AbortSignal) => Promise<GetInviteInfoReturn>;
    isValidAccessCode: (args: IsValidAccessCodeArgs, headers?: object, signal?: AbortSignal) => Promise<IsValidAccessCodeReturn>;
    internalClaimAccessCode: (args: InternalClaimAccessCodeArgs, headers?: object, signal?: AbortSignal) => Promise<InternalClaimAccessCodeReturn>;
    blockNumberAtTime: (args: BlockNumberAtTimeArgs, headers?: object, signal?: AbortSignal) => Promise<BlockNumberAtTimeReturn>;
    paperSessionSecret: (args: PaperSessionSecretArgs, headers?: object, signal?: AbortSignal) => Promise<PaperSessionSecretReturn>;
    paperSessionSecret2: (args: PaperSessionSecret2Args, headers?: object, signal?: AbortSignal) => Promise<PaperSessionSecret2Return>;
    linkWallet: (args: LinkWalletArgs, headers?: object, signal?: AbortSignal) => Promise<LinkWalletReturn>;
    getLinkedWallets: (args: GetLinkedWalletsArgs, headers?: object, signal?: AbortSignal) => Promise<GetLinkedWalletsReturn>;
    removeLinkedWallet: (args: RemoveLinkedWalletArgs, headers?: object, signal?: AbortSignal) => Promise<RemoveLinkedWalletReturn>;
    generateWaaSVerificationURL: (args: GenerateWaaSVerificationURLArgs, headers?: object, signal?: AbortSignal) => Promise<GenerateWaaSVerificationURLReturn>;
    validateWaaSVerificationNonce: (args: ValidateWaaSVerificationNonceArgs, headers?: object, signal?: AbortSignal) => Promise<ValidateWaaSVerificationNonceReturn>;
    listAdoptedWallets: (args: ListAdoptedWalletsArgs, headers?: object, signal?: AbortSignal) => Promise<ListAdoptedWalletsReturn>;
    getLifiChains: (headers?: object, signal?: AbortSignal) => Promise<GetLifiChainsReturn>;
    getLifiTokens: (args: GetLifiTokensArgs, headers?: object, signal?: AbortSignal) => Promise<GetLifiTokensReturn>;
    getLifiSwapRoutes: (args: GetLifiSwapRoutesArgs, headers?: object, signal?: AbortSignal) => Promise<GetLifiSwapRoutesReturn>;
    getLifiSwapQuote: (args: GetLifiSwapQuoteArgs, headers?: object, signal?: AbortSignal) => Promise<GetLifiSwapQuoteReturn>;
    getIntentCallsPayloads: (args: GetIntentCallsPayloadsArgs, headers?: object, signal?: AbortSignal) => Promise<GetIntentCallsPayloadsReturn>;
    commitIntentConfig: (args: CommitIntentConfigArgs, headers?: object, signal?: AbortSignal) => Promise<CommitIntentConfigReturn>;
    getIntentConfig: (args: GetIntentConfigArgs, headers?: object, signal?: AbortSignal) => Promise<GetIntentConfigReturn>;
    listCurrencyGroups: (headers?: object, signal?: AbortSignal) => Promise<ListCurrencyGroupsReturn>;
    addOffchainInventory: (args: AddOffchainInventoryArgs, headers?: object, signal?: AbortSignal) => Promise<AddOffchainInventoryReturn>;
    getOffchainInventory: (args: GetOffchainInventoryArgs, headers?: object, signal?: AbortSignal) => Promise<GetOffchainInventoryReturn>;
    listOffchainInventories: (args: ListOffchainInventoriesArgs, headers?: object, signal?: AbortSignal) => Promise<ListOffchainInventoriesReturn>;
    updateOffchainInventory: (args: UpdateOffchainInventoryArgs, headers?: object, signal?: AbortSignal) => Promise<UpdateOffchainInventoryReturn>;
    deleteOffchainInventory: (args: DeleteOffchainInventoryArgs, headers?: object, signal?: AbortSignal) => Promise<DeleteOffchainInventoryReturn>;
    requestOffchainPayment: (args: RequestOffchainPaymentArgs, headers?: object, signal?: AbortSignal) => Promise<RequestOffchainPaymentReturn>;
    listOffchainPayments: (args: ListOffchainPaymentsArgs, headers?: object, signal?: AbortSignal) => Promise<ListOffchainPaymentsReturn>;
    savePack: (args: SavePackArgs, headers?: object, signal?: AbortSignal) => Promise<SavePackReturn>;
    getPack: (args: GetPackArgs, headers?: object, signal?: AbortSignal) => Promise<GetPackReturn>;
    getPackIds: (args: GetPackIdsArgs, headers?: object, signal?: AbortSignal) => Promise<GetPackIdsReturn>;
    deletePack: (args: DeletePackArgs, headers?: object, signal?: AbortSignal) => Promise<DeletePackReturn>;
    updatePackContent: (args: UpdatePackContentArgs, headers?: object, signal?: AbortSignal) => Promise<UpdatePackContentReturn>;
    getRevealTxData: (args: GetRevealTxDataArgs, headers?: object, signal?: AbortSignal) => Promise<GetRevealTxDataReturn>;
    checkoutOptionsPrimary: (args: CheckoutOptionsPrimaryArgs, headers?: object, signal?: AbortSignal) => Promise<CheckoutOptionsPrimaryReturn>;
    checkoutOptionsSecondary: (args: CheckoutOptionsSecondaryArgs, headers?: object, signal?: AbortSignal) => Promise<CheckoutOptionsSecondaryReturn>;
    checkoutOptionsGetTransakContractID: (args: CheckoutOptionsGetTransakContractIDArgs, headers?: object, signal?: AbortSignal) => Promise<CheckoutOptionsGetTransakContractIDReturn>;
    fortePayCreateIntent: (args: FortePayCreateIntentArgs, headers?: object, signal?: AbortSignal) => Promise<FortePayCreateIntentReturn>;
    fortePayGetPaymentStatuses: (args: FortePayGetPaymentStatusesArgs, headers?: object, signal?: AbortSignal) => Promise<FortePayGetPaymentStatusesReturn>;
    getCCTPTransfer: (args: GetCCTPTransferArgs, headers?: object, signal?: AbortSignal) => Promise<GetCCTPTransferReturn>;
    queueCCTPTransfer: (args: QueueCCTPTransferArgs, headers?: object, signal?: AbortSignal) => Promise<QueueCCTPTransferReturn>;
}
export declare class WebrpcError extends Error {
    name: string;
    code: number;
    message: string;
    status: number;
    cause?: string;
    /** @deprecated Use message instead of msg. Deprecated in webrpc v0.11.0. */
    msg: string;
    constructor(name: string, code: number, message: string, status: number, cause?: string);
    static new(payload: any): WebrpcError;
}
export declare class WebrpcEndpointError extends WebrpcError {
    constructor(name?: string, code?: number, message?: string, status?: number, cause?: string);
}
export declare class WebrpcRequestFailedError extends WebrpcError {
    constructor(name?: string, code?: number, message?: string, status?: number, cause?: string);
}
export declare class WebrpcBadRouteError extends WebrpcError {
    constructor(name?: string, code?: number, message?: string, status?: number, cause?: string);
}
export declare class WebrpcBadMethodError extends WebrpcError {
    constructor(name?: string, code?: number, message?: string, status?: number, cause?: string);
}
export declare class WebrpcBadRequestError extends WebrpcError {
    constructor(name?: string, code?: number, message?: string, status?: number, cause?: string);
}
export declare class WebrpcBadResponseError extends WebrpcError {
    constructor(name?: string, code?: number, message?: string, status?: number, cause?: string);
}
export declare class WebrpcServerPanicError extends WebrpcError {
    constructor(name?: string, code?: number, message?: string, status?: number, cause?: string);
}
export declare class WebrpcInternalErrorError extends WebrpcError {
    constructor(name?: string, code?: number, message?: string, status?: number, cause?: string);
}
export declare class WebrpcClientDisconnectedError extends WebrpcError {
    constructor(name?: string, code?: number, message?: string, status?: number, cause?: string);
}
export declare class WebrpcStreamLostError extends WebrpcError {
    constructor(name?: string, code?: number, message?: string, status?: number, cause?: string);
}
export declare class WebrpcStreamFinishedError extends WebrpcError {
    constructor(name?: string, code?: number, message?: string, status?: number, cause?: string);
}
export declare class UnauthorizedError extends WebrpcError {
    constructor(name?: string, code?: number, message?: string, status?: number, cause?: string);
}
export declare class PermissionDeniedError extends WebrpcError {
    constructor(name?: string, code?: number, message?: string, status?: number, cause?: string);
}
export declare class SessionExpiredError extends WebrpcError {
    constructor(name?: string, code?: number, message?: string, status?: number, cause?: string);
}
export declare class MethodNotFoundError extends WebrpcError {
    constructor(name?: string, code?: number, message?: string, status?: number, cause?: string);
}
export declare class RequestConflictError extends WebrpcError {
    constructor(name?: string, code?: number, message?: string, status?: number, cause?: string);
}
export declare class AbortedError extends WebrpcError {
    constructor(name?: string, code?: number, message?: string, status?: number, cause?: string);
}
export declare class GeoblockedError extends WebrpcError {
    constructor(name?: string, code?: number, message?: string, status?: number, cause?: string);
}
export declare class RateLimitedError extends WebrpcError {
    constructor(name?: string, code?: number, message?: string, status?: number, cause?: string);
}
export declare class ProjectNotFoundError extends WebrpcError {
    constructor(name?: string, code?: number, message?: string, status?: number, cause?: string);
}
export declare class AccessKeyNotFoundError extends WebrpcError {
    constructor(name?: string, code?: number, message?: string, status?: number, cause?: string);
}
export declare class AccessKeyMismatchError extends WebrpcError {
    constructor(name?: string, code?: number, message?: string, status?: number, cause?: string);
}
export declare class InvalidOriginError extends WebrpcError {
    constructor(name?: string, code?: number, message?: string, status?: number, cause?: string);
}
export declare class InvalidServiceError extends WebrpcError {
    constructor(name?: string, code?: number, message?: string, status?: number, cause?: string);
}
export declare class UnauthorizedUserError extends WebrpcError {
    constructor(name?: string, code?: number, message?: string, status?: number, cause?: string);
}
export declare class QuotaExceededError extends WebrpcError {
    constructor(name?: string, code?: number, message?: string, status?: number, cause?: string);
}
export declare class QuotaRateLimitError extends WebrpcError {
    constructor(name?: string, code?: number, message?: string, status?: number, cause?: string);
}
export declare class NoDefaultKeyError extends WebrpcError {
    constructor(name?: string, code?: number, message?: string, status?: number, cause?: string);
}
export declare class MaxAccessKeysError extends WebrpcError {
    constructor(name?: string, code?: number, message?: string, status?: number, cause?: string);
}
export declare class AtLeastOneKeyError extends WebrpcError {
    constructor(name?: string, code?: number, message?: string, status?: number, cause?: string);
}
export declare class TimeoutError extends WebrpcError {
    constructor(name?: string, code?: number, message?: string, status?: number, cause?: string);
}
export declare class InvalidArgumentError extends WebrpcError {
    constructor(name?: string, code?: number, message?: string, status?: number, cause?: string);
}
export declare class UnavailableError extends WebrpcError {
    constructor(name?: string, code?: number, message?: string, status?: number, cause?: string);
}
export declare class QueryFailedError extends WebrpcError {
    constructor(name?: string, code?: number, message?: string, status?: number, cause?: string);
}
export declare class NotFoundError extends WebrpcError {
    constructor(name?: string, code?: number, message?: string, status?: number, cause?: string);
}
export declare class UnsupportedNetworkError extends WebrpcError {
    constructor(name?: string, code?: number, message?: string, status?: number, cause?: string);
}
export declare enum errors {
    WebrpcEndpoint = "WebrpcEndpoint",
    WebrpcRequestFailed = "WebrpcRequestFailed",
    WebrpcBadRoute = "WebrpcBadRoute",
    WebrpcBadMethod = "WebrpcBadMethod",
    WebrpcBadRequest = "WebrpcBadRequest",
    WebrpcBadResponse = "WebrpcBadResponse",
    WebrpcServerPanic = "WebrpcServerPanic",
    WebrpcInternalError = "WebrpcInternalError",
    WebrpcClientDisconnected = "WebrpcClientDisconnected",
    WebrpcStreamLost = "WebrpcStreamLost",
    WebrpcStreamFinished = "WebrpcStreamFinished",
    Unauthorized = "Unauthorized",
    PermissionDenied = "PermissionDenied",
    SessionExpired = "SessionExpired",
    MethodNotFound = "MethodNotFound",
    RequestConflict = "RequestConflict",
    Aborted = "Aborted",
    Geoblocked = "Geoblocked",
    RateLimited = "RateLimited",
    ProjectNotFound = "ProjectNotFound",
    AccessKeyNotFound = "AccessKeyNotFound",
    AccessKeyMismatch = "AccessKeyMismatch",
    InvalidOrigin = "InvalidOrigin",
    InvalidService = "InvalidService",
    UnauthorizedUser = "UnauthorizedUser",
    QuotaExceeded = "QuotaExceeded",
    QuotaRateLimit = "QuotaRateLimit",
    NoDefaultKey = "NoDefaultKey",
    MaxAccessKeys = "MaxAccessKeys",
    AtLeastOneKey = "AtLeastOneKey",
    Timeout = "Timeout",
    InvalidArgument = "InvalidArgument",
    Unavailable = "Unavailable",
    QueryFailed = "QueryFailed",
    NotFound = "NotFound",
    UnsupportedNetwork = "UnsupportedNetwork"
}
export declare enum WebrpcErrorCodes {
    WebrpcEndpoint = 0,
    WebrpcRequestFailed = -1,
    WebrpcBadRoute = -2,
    WebrpcBadMethod = -3,
    WebrpcBadRequest = -4,
    WebrpcBadResponse = -5,
    WebrpcServerPanic = -6,
    WebrpcInternalError = -7,
    WebrpcClientDisconnected = -8,
    WebrpcStreamLost = -9,
    WebrpcStreamFinished = -10,
    Unauthorized = 1000,
    PermissionDenied = 1001,
    SessionExpired = 1002,
    MethodNotFound = 1003,
    RequestConflict = 1004,
    Aborted = 1005,
    Geoblocked = 1006,
    RateLimited = 1007,
    ProjectNotFound = 1008,
    AccessKeyNotFound = 1101,
    AccessKeyMismatch = 1102,
    InvalidOrigin = 1103,
    InvalidService = 1104,
    UnauthorizedUser = 1105,
    QuotaExceeded = 1200,
    QuotaRateLimit = 1201,
    NoDefaultKey = 1300,
    MaxAccessKeys = 1301,
    AtLeastOneKey = 1302,
    Timeout = 1900,
    InvalidArgument = 2000,
    Unavailable = 2002,
    QueryFailed = 2003,
    NotFound = 3000,
    UnsupportedNetwork = 3008
}
export declare const webrpcErrorByCode: {
    [code: number]: any;
};
export type Fetch = (input: RequestInfo, init?: RequestInit) => Promise<Response>;
export {};
//# sourceMappingURL=api.gen.d.ts.map