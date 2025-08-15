import { N as l, w as G, p as O, R as f, S as g, C as E, a as S, E as U, g as D, W as B, b as P, B as b, c as M, d as C, A as z, f as R, h as V, i as x, j as H, k as $, s as q, l as Q } from "./index-C8kdZHDI.js";
const I = {
  getGasPriceInEther(n, t) {
    const o = t * n;
    return Number(o) / 1e18;
  },
  getGasPriceInUSD(n, t, o) {
    const s = I.getGasPriceInEther(t, o);
    return l.bigNumber(n).times(s).toNumber();
  },
  getPriceImpact({ sourceTokenAmount: n, sourceTokenPriceInUSD: t, toTokenPriceInUSD: o, toTokenAmount: s }) {
    const r = l.bigNumber(n).times(t), i = l.bigNumber(s).times(o);
    return r.minus(i).div(r).times(100).toNumber();
  },
  getMaxSlippage(n, t) {
    const o = l.bigNumber(n).div(100);
    return l.multiply(t, o).toNumber();
  },
  getProviderFee(n, t = 85e-4) {
    return l.bigNumber(n).times(t).toString();
  },
  isInsufficientNetworkTokenForGas(n, t) {
    const o = t || "0";
    return l.bigNumber(n).eq(0) ? !0 : l.bigNumber(l.bigNumber(o)).gt(n);
  },
  isInsufficientSourceTokenForSwap(n, t, o) {
    var i, u;
    const s = (u = (i = o == null ? void 0 : o.find((d) => d.address === t)) == null ? void 0 : i.quantity) == null ? void 0 : u.numeric;
    return l.bigNumber(s || "0").lt(n);
  }
}, _ = 15e4, K = 6, T = {
  // Loading states
  initializing: !1,
  initialized: !1,
  loadingPrices: !1,
  loadingQuote: !1,
  loadingApprovalTransaction: !1,
  loadingBuildTransaction: !1,
  loadingTransaction: !1,
  // Error states
  fetchError: !1,
  // Approval & Swap transaction states
  approvalTransaction: void 0,
  swapTransaction: void 0,
  transactionError: void 0,
  // Input values
  sourceToken: void 0,
  sourceTokenAmount: "",
  sourceTokenPriceInUSD: 0,
  toToken: void 0,
  toTokenAmount: "",
  toTokenPriceInUSD: 0,
  networkPrice: "0",
  networkBalanceInUSD: "0",
  networkTokenSymbol: "",
  inputError: void 0,
  // Request values
  slippage: x.CONVERT_SLIPPAGE_TOLERANCE,
  // Tokens
  tokens: void 0,
  popularTokens: void 0,
  suggestedTokens: void 0,
  foundTokens: void 0,
  myTokensWithBalance: void 0,
  tokensPriceMap: {},
  // Calculations
  gasFee: "0",
  gasPriceInUSD: 0,
  priceImpact: void 0,
  maxSlippage: void 0,
  providerFee: void 0
}, e = O({ ...T }), v = {
  state: e,
  subscribe(n) {
    return Q(e, () => n(e));
  },
  subscribeKey(n, t) {
    return q(e, n, t);
  },
  getParams() {
    var d, c, p, m, A, w, y, h;
    const n = P.state.activeCaipAddress, t = M.getPlainAddress(n), o = H(), s = $.getConnectorId(P.state.activeChain);
    if (!t)
      throw new Error("No address found to swap the tokens from.");
    const r = !((d = e.toToken) != null && d.address) || !((c = e.toToken) != null && c.decimals), i = !((p = e.sourceToken) != null && p.address) || !((m = e.sourceToken) != null && m.decimals) || !l.bigNumber(e.sourceTokenAmount).gt(0), u = !e.sourceTokenAmount;
    return {
      networkAddress: o,
      fromAddress: t,
      fromCaipAddress: n,
      sourceTokenAddress: (A = e.sourceToken) == null ? void 0 : A.address,
      toTokenAddress: (w = e.toToken) == null ? void 0 : w.address,
      toTokenAmount: e.toTokenAmount,
      toTokenDecimals: (y = e.toToken) == null ? void 0 : y.decimals,
      sourceTokenAmount: e.sourceTokenAmount,
      sourceTokenDecimals: (h = e.sourceToken) == null ? void 0 : h.decimals,
      invalidToToken: r,
      invalidSourceToken: i,
      invalidSourceTokenAmount: u,
      availableToSwap: n && !r && !i && !u,
      isAuthConnector: s === S.CONNECTOR_ID.AUTH
    };
  },
  setSourceToken(n) {
    if (!n) {
      e.sourceToken = n, e.sourceTokenAmount = "", e.sourceTokenPriceInUSD = 0;
      return;
    }
    e.sourceToken = n, a.setTokenPrice(n.address, "sourceToken");
  },
  setSourceTokenAmount(n) {
    e.sourceTokenAmount = n;
  },
  setToToken(n) {
    if (!n) {
      e.toToken = n, e.toTokenAmount = "", e.toTokenPriceInUSD = 0;
      return;
    }
    e.toToken = n, a.setTokenPrice(n.address, "toToken");
  },
  setToTokenAmount(n) {
    e.toTokenAmount = n ? l.toFixed(n, K) : "";
  },
  async setTokenPrice(n, t) {
    let o = e.tokensPriceMap[n] || 0;
    o || (e.loadingPrices = !0, o = await a.getAddressPrice(n)), t === "sourceToken" ? e.sourceTokenPriceInUSD = o : t === "toToken" && (e.toTokenPriceInUSD = o), e.loadingPrices && (e.loadingPrices = !1), a.getParams().availableToSwap && a.swapTokens();
  },
  switchTokens() {
    if (e.initializing || !e.initialized)
      return;
    const n = e.toToken ? { ...e.toToken } : void 0, t = e.sourceToken ? { ...e.sourceToken } : void 0, o = n && e.toTokenAmount === "" ? "1" : e.toTokenAmount;
    a.setSourceToken(n), a.setToToken(t), a.setSourceTokenAmount(o), a.setToTokenAmount(""), a.swapTokens();
  },
  resetState() {
    e.myTokensWithBalance = T.myTokensWithBalance, e.tokensPriceMap = T.tokensPriceMap, e.initialized = T.initialized, e.initializing = T.initializing, e.sourceToken = T.sourceToken, e.sourceTokenAmount = T.sourceTokenAmount, e.sourceTokenPriceInUSD = T.sourceTokenPriceInUSD, e.toToken = T.toToken, e.toTokenAmount = T.toTokenAmount, e.toTokenPriceInUSD = T.toTokenPriceInUSD, e.networkPrice = T.networkPrice, e.networkTokenSymbol = T.networkTokenSymbol, e.networkBalanceInUSD = T.networkBalanceInUSD, e.inputError = T.inputError;
  },
  resetValues() {
    var o;
    const { networkAddress: n } = a.getParams(), t = (o = e.tokens) == null ? void 0 : o.find((s) => s.address === n);
    a.setSourceToken(t), a.setToToken(void 0);
  },
  getApprovalLoadingState() {
    return e.loadingApprovalTransaction;
  },
  clearError() {
    e.transactionError = void 0;
  },
  async initializeState() {
    if (!e.initializing) {
      if (e.initializing = !0, !e.initialized)
        try {
          await a.fetchTokens(), e.initialized = !0;
        } catch {
          e.initialized = !1, g.showError("Failed to initialize swap"), f.goBack();
        }
      e.initializing = !1;
    }
  },
  async fetchTokens() {
    var o;
    const { networkAddress: n } = a.getParams();
    await a.getNetworkTokenPrice(), await a.getMyTokensWithBalance();
    const t = (o = e.myTokensWithBalance) == null ? void 0 : o.find((s) => s.address === n);
    t && (e.networkTokenSymbol = t.symbol, a.setSourceToken(t), a.setSourceTokenAmount("0"));
  },
  async getTokenList() {
    var t;
    const n = (t = P.state.activeCaipNetwork) == null ? void 0 : t.caipNetworkId;
    if (!(e.caipNetworkId === n && e.tokens))
      try {
        e.tokensLoading = !0;
        const o = await C.getTokenList(n);
        e.tokens = o, e.caipNetworkId = n, e.popularTokens = o.sort((s, r) => s.symbol < r.symbol ? -1 : s.symbol > r.symbol ? 1 : 0), e.suggestedTokens = o.filter((s) => !!x.SWAP_SUGGESTED_TOKENS.includes(s.symbol));
      } catch {
        e.tokens = [], e.popularTokens = [], e.suggestedTokens = [];
      } finally {
        e.tokensLoading = !1;
      }
  },
  async getAddressPrice(n) {
    var c, p;
    const t = e.tokensPriceMap[n];
    if (t)
      return t;
    const o = await b.fetchTokenPrice({
      addresses: [n]
    }), s = (o == null ? void 0 : o.fungibles) || [], r = [...e.tokens || [], ...e.myTokensWithBalance || []], i = (c = r == null ? void 0 : r.find((m) => m.address === n)) == null ? void 0 : c.symbol, u = ((p = s.find((m) => m.symbol.toLowerCase() === (i == null ? void 0 : i.toLowerCase()))) == null ? void 0 : p.price) || 0, d = parseFloat(u.toString());
    return e.tokensPriceMap[n] = d, d;
  },
  async getNetworkTokenPrice() {
    var r;
    const { networkAddress: n } = a.getParams(), o = (r = (await b.fetchTokenPrice({
      addresses: [n]
    }).catch(() => (g.showError("Failed to fetch network token price"), { fungibles: [] }))).fungibles) == null ? void 0 : r[0], s = (o == null ? void 0 : o.price.toString()) || "0";
    e.tokensPriceMap[n] = parseFloat(s), e.networkTokenSymbol = (o == null ? void 0 : o.symbol) || "", e.networkPrice = s;
  },
  async getMyTokensWithBalance(n) {
    const t = await V.getMyTokensWithBalance(n), o = C.mapBalancesToSwapTokens(t);
    o && (await a.getInitialGasPrice(), a.setBalances(o));
  },
  setBalances(n) {
    const { networkAddress: t } = a.getParams(), o = P.state.activeCaipNetwork;
    if (!o)
      return;
    const s = n.find((r) => r.address === t);
    n.forEach((r) => {
      e.tokensPriceMap[r.address] = r.price || 0;
    }), e.myTokensWithBalance = n.filter((r) => r.address.startsWith(o.caipNetworkId)), e.networkBalanceInUSD = s ? l.multiply(s.quantity.numeric, s.price).toString() : "0";
  },
  async getInitialGasPrice() {
    var t, o;
    const n = await C.fetchGasPrice();
    if (!n)
      return { gasPrice: null, gasPriceInUSD: null };
    switch ((o = (t = P.state) == null ? void 0 : t.activeCaipNetwork) == null ? void 0 : o.chainNamespace) {
      case S.CHAIN.SOLANA:
        return e.gasFee = n.standard ?? "0", e.gasPriceInUSD = l.multiply(n.standard, e.networkPrice).div(1e9).toNumber(), {
          gasPrice: BigInt(e.gasFee),
          gasPriceInUSD: Number(e.gasPriceInUSD)
        };
      case S.CHAIN.EVM:
      default:
        const s = n.standard ?? "0", r = BigInt(s), i = BigInt(_), u = I.getGasPriceInUSD(e.networkPrice, i, r);
        return e.gasFee = s, e.gasPriceInUSD = u, { gasPrice: r, gasPriceInUSD: u };
    }
  },
  // -- Swap -------------------------------------- //
  async swapTokens() {
    var i, u;
    const n = z.state.address, t = e.sourceToken, o = e.toToken, s = l.bigNumber(e.sourceTokenAmount).gt(0);
    if (s || a.setToTokenAmount(""), !o || !t || e.loadingPrices || !s)
      return;
    e.loadingQuote = !0;
    const r = l.bigNumber(e.sourceTokenAmount).times(10 ** t.decimals).round(0);
    try {
      const d = await b.fetchSwapQuote({
        userAddress: n,
        from: t.address,
        to: o.address,
        gasPrice: e.gasFee,
        amount: r.toString()
      });
      e.loadingQuote = !1;
      const c = (u = (i = d == null ? void 0 : d.quotes) == null ? void 0 : i[0]) == null ? void 0 : u.toAmount;
      if (!c) {
        R.open({
          displayMessage: "Incorrect amount",
          debugMessage: "Please enter a valid amount"
        }, "error");
        return;
      }
      const p = l.bigNumber(c).div(10 ** o.decimals).toString();
      a.setToTokenAmount(p), a.hasInsufficientToken(e.sourceTokenAmount, t.address) ? e.inputError = "Insufficient balance" : (e.inputError = void 0, a.setTransactionDetails());
    } catch {
      e.loadingQuote = !1, e.inputError = "Insufficient balance";
    }
  },
  // -- Create Transactions -------------------------------------- //
  async getTransaction() {
    const { fromCaipAddress: n, availableToSwap: t } = a.getParams(), o = e.sourceToken, s = e.toToken;
    if (!(!n || !t || !o || !s || e.loadingQuote))
      try {
        e.loadingBuildTransaction = !0;
        const r = await C.fetchSwapAllowance({
          userAddress: n,
          tokenAddress: o.address,
          sourceTokenAmount: e.sourceTokenAmount,
          sourceTokenDecimals: o.decimals
        });
        let i;
        return r ? i = await a.createSwapTransaction() : i = await a.createAllowanceTransaction(), e.loadingBuildTransaction = !1, e.fetchError = !1, i;
      } catch {
        f.goBack(), g.showError("Failed to check allowance"), e.loadingBuildTransaction = !1, e.approvalTransaction = void 0, e.swapTransaction = void 0, e.fetchError = !0;
        return;
      }
  },
  async createAllowanceTransaction() {
    const { fromCaipAddress: n, sourceTokenAddress: t, toTokenAddress: o } = a.getParams();
    if (!(!n || !o)) {
      if (!t)
        throw new Error("createAllowanceTransaction - No source token address found.");
      try {
        const s = await b.generateApproveCalldata({
          from: t,
          to: o,
          userAddress: n
        }), r = M.getPlainAddress(s.tx.from);
        if (!r)
          throw new Error("SwapController:createAllowanceTransaction - address is required");
        const i = {
          data: s.tx.data,
          to: r,
          gasPrice: BigInt(s.tx.eip155.gasPrice),
          value: BigInt(s.tx.value),
          toAmount: e.toTokenAmount
        };
        return e.swapTransaction = void 0, e.approvalTransaction = {
          data: i.data,
          to: i.to,
          gasPrice: i.gasPrice,
          value: i.value,
          toAmount: i.toAmount
        }, {
          data: i.data,
          to: i.to,
          gasPrice: i.gasPrice,
          value: i.value,
          toAmount: i.toAmount
        };
      } catch {
        f.goBack(), g.showError("Failed to create approval transaction"), e.approvalTransaction = void 0, e.swapTransaction = void 0, e.fetchError = !0;
        return;
      }
    }
  },
  async createSwapTransaction() {
    var u;
    const { networkAddress: n, fromCaipAddress: t, sourceTokenAmount: o } = a.getParams(), s = e.sourceToken, r = e.toToken;
    if (!t || !o || !s || !r)
      return;
    const i = (u = E.parseUnits(o, s.decimals)) == null ? void 0 : u.toString();
    try {
      const d = await b.generateSwapCalldata({
        userAddress: t,
        from: s.address,
        to: r.address,
        amount: i,
        disableEstimate: !0
      }), c = s.address === n, p = BigInt(d.tx.eip155.gas), m = BigInt(d.tx.eip155.gasPrice), A = M.getPlainAddress(d.tx.to);
      if (!A)
        throw new Error("SwapController:createSwapTransaction - address is required");
      const w = {
        data: d.tx.data,
        to: A,
        gas: p,
        gasPrice: m,
        value: BigInt(c ? i ?? "0" : "0"),
        toAmount: e.toTokenAmount
      };
      return e.gasPriceInUSD = I.getGasPriceInUSD(e.networkPrice, p, m), e.approvalTransaction = void 0, e.swapTransaction = w, w;
    } catch {
      f.goBack(), g.showError("Failed to create transaction"), e.approvalTransaction = void 0, e.swapTransaction = void 0, e.fetchError = !0;
      return;
    }
  },
  onEmbeddedWalletApprovalSuccess() {
    g.showLoading("Approve limit increase in your wallet"), f.replace("SwapPreview");
  },
  // -- Send Transactions --------------------------------- //
  async sendTransactionForApproval(n) {
    var r, i, u;
    const { fromAddress: t, isAuthConnector: o } = a.getParams();
    e.loadingApprovalTransaction = !0, o ? f.pushTransactionStack({
      onSuccess: a.onEmbeddedWalletApprovalSuccess
    }) : g.showLoading("Approve limit increase in your wallet");
    try {
      await E.sendTransaction({
        address: t,
        to: n.to,
        data: n.data,
        value: n.value,
        chainNamespace: S.CHAIN.EVM
      }), await a.swapTokens(), await a.getTransaction(), e.approvalTransaction = void 0, e.loadingApprovalTransaction = !1;
    } catch (d) {
      const c = d;
      e.transactionError = c == null ? void 0 : c.displayMessage, e.loadingApprovalTransaction = !1, g.showError((c == null ? void 0 : c.displayMessage) || "Transaction error"), U.sendEvent({
        type: "track",
        event: "SWAP_APPROVAL_ERROR",
        properties: {
          message: (c == null ? void 0 : c.displayMessage) || (c == null ? void 0 : c.message) || "Unknown",
          network: ((r = P.state.activeCaipNetwork) == null ? void 0 : r.caipNetworkId) || "",
          swapFromToken: ((i = a.state.sourceToken) == null ? void 0 : i.symbol) || "",
          swapToToken: ((u = a.state.toToken) == null ? void 0 : u.symbol) || "",
          swapFromAmount: a.state.sourceTokenAmount || "",
          swapToAmount: a.state.toTokenAmount || "",
          isSmartAccount: D(S.CHAIN.EVM) === B.ACCOUNT_TYPES.SMART_ACCOUNT
        }
      });
    }
  },
  async sendTransactionForSwap(n) {
    var u, d, c, p, m, A, w, y, h, F, L, W;
    if (!n)
      return;
    const { fromAddress: t, toTokenAmount: o, isAuthConnector: s } = a.getParams();
    e.loadingTransaction = !0;
    const r = `Swapping ${(u = e.sourceToken) == null ? void 0 : u.symbol} to ${l.formatNumberToLocalString(o, 3)} ${(d = e.toToken) == null ? void 0 : d.symbol}`, i = `Swapped ${(c = e.sourceToken) == null ? void 0 : c.symbol} to ${l.formatNumberToLocalString(o, 3)} ${(p = e.toToken) == null ? void 0 : p.symbol}`;
    s ? f.pushTransactionStack({
      onSuccess() {
        f.replace("Account"), g.showLoading(r), v.resetState();
      }
    }) : g.showLoading("Confirm transaction in your wallet");
    try {
      const N = [(m = e.sourceToken) == null ? void 0 : m.address, (A = e.toToken) == null ? void 0 : A.address].join(","), k = await E.sendTransaction({
        address: t,
        to: n.to,
        data: n.data,
        value: n.value,
        chainNamespace: S.CHAIN.EVM
      });
      return e.loadingTransaction = !1, g.showSuccess(i), U.sendEvent({
        type: "track",
        event: "SWAP_SUCCESS",
        properties: {
          network: ((w = P.state.activeCaipNetwork) == null ? void 0 : w.caipNetworkId) || "",
          swapFromToken: ((y = a.state.sourceToken) == null ? void 0 : y.symbol) || "",
          swapToToken: ((h = a.state.toToken) == null ? void 0 : h.symbol) || "",
          swapFromAmount: a.state.sourceTokenAmount || "",
          swapToAmount: a.state.toTokenAmount || "",
          isSmartAccount: D(S.CHAIN.EVM) === B.ACCOUNT_TYPES.SMART_ACCOUNT
        }
      }), v.resetState(), s || f.replace("Account"), v.getMyTokensWithBalance(N), k;
    } catch (N) {
      const k = N;
      e.transactionError = k == null ? void 0 : k.displayMessage, e.loadingTransaction = !1, g.showError((k == null ? void 0 : k.displayMessage) || "Transaction error"), U.sendEvent({
        type: "track",
        event: "SWAP_ERROR",
        properties: {
          message: (k == null ? void 0 : k.displayMessage) || (k == null ? void 0 : k.message) || "Unknown",
          network: ((F = P.state.activeCaipNetwork) == null ? void 0 : F.caipNetworkId) || "",
          swapFromToken: ((L = a.state.sourceToken) == null ? void 0 : L.symbol) || "",
          swapToToken: ((W = a.state.toToken) == null ? void 0 : W.symbol) || "",
          swapFromAmount: a.state.sourceTokenAmount || "",
          swapToAmount: a.state.toTokenAmount || "",
          isSmartAccount: D(S.CHAIN.EVM) === B.ACCOUNT_TYPES.SMART_ACCOUNT
        }
      });
      return;
    }
  },
  // -- Checks -------------------------------------------- //
  hasInsufficientToken(n, t) {
    return I.isInsufficientSourceTokenForSwap(n, t, e.myTokensWithBalance);
  },
  // -- Calculations -------------------------------------- //
  setTransactionDetails() {
    const { toTokenAddress: n, toTokenDecimals: t } = a.getParams();
    !n || !t || (e.gasPriceInUSD = I.getGasPriceInUSD(e.networkPrice, BigInt(e.gasFee), BigInt(_)), e.priceImpact = I.getPriceImpact({
      sourceTokenAmount: e.sourceTokenAmount,
      sourceTokenPriceInUSD: e.sourceTokenPriceInUSD,
      toTokenPriceInUSD: e.toTokenPriceInUSD,
      toTokenAmount: e.toTokenAmount
    }), e.maxSlippage = I.getMaxSlippage(e.slippage, e.toTokenAmount), e.providerFee = I.getProviderFee(e.sourceTokenAmount));
  }
}, a = G(v);
export {
  a as S
};
