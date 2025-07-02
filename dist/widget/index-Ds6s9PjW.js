import { N as l, w as z, v as $, R as w, S as g, l as D, f as B, h as x, W as F, e as b, B as v, d as M, x as C, A as j, o as Q, y as V, b as R, z as q, C as H, c as K, D as Y, F as J, i as X, r as Z, j as ee, a as oe } from "./index-CQJlV2Ao.js";
import { x as _ } from "./lit-html-jz-94mx9.js";
import { n as G, c as ne } from "./if-defined-BehxAGoH.js";
import "./index-jyaR1S1w.js";
import "./index-CATyM6Hm.js";
const A = {
  getGasPriceInEther(o, t) {
    const n = t * o;
    return Number(n) / 1e18;
  },
  getGasPriceInUSD(o, t, n) {
    const r = A.getGasPriceInEther(t, n);
    return l.bigNumber(o).times(r).toNumber();
  },
  getPriceImpact({ sourceTokenAmount: o, sourceTokenPriceInUSD: t, toTokenPriceInUSD: n, toTokenAmount: r }) {
    const s = l.bigNumber(o).times(t), i = l.bigNumber(r).times(n);
    return s.minus(i).div(s).times(100).toNumber();
  },
  getMaxSlippage(o, t) {
    const n = l.bigNumber(o).div(100);
    return l.multiply(t, n).toNumber();
  },
  getProviderFee(o, t = 85e-4) {
    return l.bigNumber(o).times(t).toString();
  },
  isInsufficientNetworkTokenForGas(o, t) {
    const n = t || "0";
    return l.bigNumber(o).eq(0) ? !0 : l.bigNumber(l.bigNumber(n)).gt(o);
  },
  isInsufficientSourceTokenForSwap(o, t, n) {
    var i, u;
    const r = (u = (i = n == null ? void 0 : n.find((c) => c.address === t)) == null ? void 0 : i.quantity) == null ? void 0 : u.numeric;
    return l.bigNumber(r || "0").lt(o);
  },
  getToTokenAmount({ sourceToken: o, toToken: t, sourceTokenPrice: n, toTokenPrice: r, sourceTokenAmount: s }) {
    if (s === "0" || !o || !t)
      return "0";
    const i = o.decimals, u = n, c = t.decimals, d = r;
    if (d <= 0)
      return "0";
    const T = l.bigNumber(s).times(85e-4), f = l.bigNumber(s).minus(T).times(l.bigNumber(10).pow(i)), S = l.bigNumber(u).div(d), P = i - c;
    return f.times(S).div(l.bigNumber(10).pow(P)).div(l.bigNumber(10).pow(c)).toFixed(c).toString();
  }
}, O = 15e4, te = 6, k = {
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
  slippage: R.CONVERT_SLIPPAGE_TOLERANCE,
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
}, e = $(k), N = {
  state: e,
  subscribe(o) {
    return J(e, () => o(e));
  },
  subscribeKey(o, t) {
    return Y(e, o, t);
  },
  getParams() {
    var d, T, m, f, S, P, h, I;
    const o = b.state.activeCaipAddress, t = b.state.activeChain, n = M.getPlainAddress(o), r = q(), s = H.getConnectorId(t);
    if (!n)
      throw new Error("No address found to swap the tokens from.");
    const i = !((d = e.toToken) != null && d.address) || !((T = e.toToken) != null && T.decimals), u = !((m = e.sourceToken) != null && m.address) || !((f = e.sourceToken) != null && f.decimals) || !l.bigNumber(e.sourceTokenAmount).gt(0), c = !e.sourceTokenAmount;
    return {
      networkAddress: r,
      fromAddress: n,
      fromCaipAddress: o,
      sourceTokenAddress: (S = e.sourceToken) == null ? void 0 : S.address,
      toTokenAddress: (P = e.toToken) == null ? void 0 : P.address,
      toTokenAmount: e.toTokenAmount,
      toTokenDecimals: (h = e.toToken) == null ? void 0 : h.decimals,
      sourceTokenAmount: e.sourceTokenAmount,
      sourceTokenDecimals: (I = e.sourceToken) == null ? void 0 : I.decimals,
      invalidToToken: i,
      invalidSourceToken: u,
      invalidSourceTokenAmount: c,
      availableToSwap: o && !i && !u && !c,
      isAuthConnector: s === K.CONNECTOR_ID.AUTH
    };
  },
  setSourceToken(o) {
    if (!o) {
      e.sourceToken = o, e.sourceTokenAmount = "", e.sourceTokenPriceInUSD = 0;
      return;
    }
    e.sourceToken = o, a.setTokenPrice(o.address, "sourceToken");
  },
  setSourceTokenAmount(o) {
    e.sourceTokenAmount = o;
  },
  setToToken(o) {
    if (!o) {
      e.toToken = o, e.toTokenAmount = "", e.toTokenPriceInUSD = 0;
      return;
    }
    e.toToken = o, a.setTokenPrice(o.address, "toToken");
  },
  setToTokenAmount(o) {
    e.toTokenAmount = o ? l.formatNumberToLocalString(o, te) : "";
  },
  async setTokenPrice(o, t) {
    let n = e.tokensPriceMap[o] || 0;
    n || (e.loadingPrices = !0, n = await a.getAddressPrice(o)), t === "sourceToken" ? e.sourceTokenPriceInUSD = n : t === "toToken" && (e.toTokenPriceInUSD = n), e.loadingPrices && (e.loadingPrices = !1), a.getParams().availableToSwap && a.swapTokens();
  },
  switchTokens() {
    if (e.initializing || !e.initialized)
      return;
    const o = e.toToken ? { ...e.toToken } : void 0, t = e.sourceToken ? { ...e.sourceToken } : void 0, n = o && e.toTokenAmount === "" ? "1" : e.toTokenAmount;
    a.setSourceToken(o), a.setToToken(t), a.setSourceTokenAmount(n), a.setToTokenAmount(""), a.swapTokens();
  },
  resetState() {
    e.myTokensWithBalance = k.myTokensWithBalance, e.tokensPriceMap = k.tokensPriceMap, e.initialized = k.initialized, e.sourceToken = k.sourceToken, e.sourceTokenAmount = k.sourceTokenAmount, e.sourceTokenPriceInUSD = k.sourceTokenPriceInUSD, e.toToken = k.toToken, e.toTokenAmount = k.toTokenAmount, e.toTokenPriceInUSD = k.toTokenPriceInUSD, e.networkPrice = k.networkPrice, e.networkTokenSymbol = k.networkTokenSymbol, e.networkBalanceInUSD = k.networkBalanceInUSD, e.inputError = k.inputError, e.myTokensWithBalance = k.myTokensWithBalance;
  },
  resetValues() {
    var n;
    const { networkAddress: o } = a.getParams(), t = (n = e.tokens) == null ? void 0 : n.find((r) => r.address === o);
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
          e.initialized = !1, g.showError("Failed to initialize swap"), w.goBack();
        }
      e.initializing = !1;
    }
  },
  async fetchTokens() {
    var n;
    const { networkAddress: o } = a.getParams();
    await a.getTokenList(), await a.getNetworkTokenPrice(), await a.getMyTokensWithBalance();
    const t = (n = e.tokens) == null ? void 0 : n.find((r) => r.address === o);
    t && (e.networkTokenSymbol = t.symbol, a.setSourceToken(t), a.setSourceTokenAmount("1"));
  },
  async getTokenList() {
    const o = await C.getTokenList();
    e.tokens = o, e.popularTokens = o.sort((t, n) => t.symbol < n.symbol ? -1 : t.symbol > n.symbol ? 1 : 0), e.suggestedTokens = o.filter((t) => !!R.SWAP_SUGGESTED_TOKENS.includes(t.symbol), {});
  },
  async getAddressPrice(o) {
    var d, T;
    const t = e.tokensPriceMap[o];
    if (t)
      return t;
    const n = await v.fetchTokenPrice({
      addresses: [o]
    }), r = (n == null ? void 0 : n.fungibles) || [], s = [...e.tokens || [], ...e.myTokensWithBalance || []], i = (d = s == null ? void 0 : s.find((m) => m.address === o)) == null ? void 0 : d.symbol, u = ((T = r.find((m) => m.symbol.toLowerCase() === (i == null ? void 0 : i.toLowerCase()))) == null ? void 0 : T.price) || 0, c = parseFloat(u.toString());
    return e.tokensPriceMap[o] = c, c;
  },
  async getNetworkTokenPrice() {
    var s;
    const { networkAddress: o } = a.getParams(), n = (s = (await v.fetchTokenPrice({
      addresses: [o]
    }).catch(() => (g.showError("Failed to fetch network token price"), { fungibles: [] }))).fungibles) == null ? void 0 : s[0], r = (n == null ? void 0 : n.price.toString()) || "0";
    e.tokensPriceMap[o] = parseFloat(r), e.networkTokenSymbol = (n == null ? void 0 : n.symbol) || "", e.networkPrice = r;
  },
  async getMyTokensWithBalance(o) {
    const t = await V.getMyTokensWithBalance(o), n = C.mapBalancesToSwapTokens(t);
    n && (await a.getInitialGasPrice(), a.setBalances(n));
  },
  setBalances(o) {
    const { networkAddress: t } = a.getParams(), n = b.state.activeCaipNetwork;
    if (!n)
      return;
    const r = o.find((s) => s.address === t);
    o.forEach((s) => {
      e.tokensPriceMap[s.address] = s.price || 0;
    }), e.myTokensWithBalance = o.filter((s) => s.address.startsWith(n.caipNetworkId)), e.networkBalanceInUSD = r ? l.multiply(r.quantity.numeric, r.price).toString() : "0";
  },
  async getInitialGasPrice() {
    var t, n;
    const o = await C.fetchGasPrice();
    if (!o)
      return { gasPrice: null, gasPriceInUSD: null };
    switch ((n = (t = b.state) == null ? void 0 : t.activeCaipNetwork) == null ? void 0 : n.chainNamespace) {
      case "solana":
        return e.gasFee = o.standard ?? "0", e.gasPriceInUSD = l.multiply(o.standard, e.networkPrice).div(1e9).toNumber(), {
          gasPrice: BigInt(e.gasFee),
          gasPriceInUSD: Number(e.gasPriceInUSD)
        };
      case "eip155":
      default:
        const r = o.standard ?? "0", s = BigInt(r), i = BigInt(O), u = A.getGasPriceInUSD(e.networkPrice, i, s);
        return e.gasFee = r, e.gasPriceInUSD = u, { gasPrice: s, gasPriceInUSD: u };
    }
  },
  // -- Swap -------------------------------------- //
  async swapTokens() {
    var i, u;
    const o = j.state.address, t = e.sourceToken, n = e.toToken, r = l.bigNumber(e.sourceTokenAmount).gt(0);
    if (r || a.setToTokenAmount(""), !n || !t || e.loadingPrices || !r)
      return;
    e.loadingQuote = !0;
    const s = l.bigNumber(e.sourceTokenAmount).times(10 ** t.decimals).round(0);
    try {
      const c = await v.fetchSwapQuote({
        userAddress: o,
        from: t.address,
        to: n.address,
        gasPrice: e.gasFee,
        amount: s.toString()
      });
      e.loadingQuote = !1;
      const d = (u = (i = c == null ? void 0 : c.quotes) == null ? void 0 : i[0]) == null ? void 0 : u.toAmount;
      if (!d) {
        Q.open({
          shortMessage: "Incorrect amount",
          longMessage: "Please enter a valid amount"
        }, "error");
        return;
      }
      const T = l.bigNumber(d).div(10 ** n.decimals).toString();
      a.setToTokenAmount(T), a.hasInsufficientToken(e.sourceTokenAmount, t.address) ? e.inputError = "Insufficient balance" : (e.inputError = void 0, a.setTransactionDetails());
    } catch {
      e.loadingQuote = !1, e.inputError = "Insufficient balance";
    }
  },
  // -- Create Transactions -------------------------------------- //
  async getTransaction() {
    const { fromCaipAddress: o, availableToSwap: t } = a.getParams(), n = e.sourceToken, r = e.toToken;
    if (!(!o || !t || !n || !r || e.loadingQuote))
      try {
        e.loadingBuildTransaction = !0;
        const s = await C.fetchSwapAllowance({
          userAddress: o,
          tokenAddress: n.address,
          sourceTokenAmount: e.sourceTokenAmount,
          sourceTokenDecimals: n.decimals
        });
        let i;
        return s ? i = await a.createSwapTransaction() : i = await a.createAllowanceTransaction(), e.loadingBuildTransaction = !1, e.fetchError = !1, i;
      } catch {
        w.goBack(), g.showError("Failed to check allowance"), e.loadingBuildTransaction = !1, e.approvalTransaction = void 0, e.swapTransaction = void 0, e.fetchError = !0;
        return;
      }
  },
  async createAllowanceTransaction() {
    const { fromCaipAddress: o, sourceTokenAddress: t, toTokenAddress: n } = a.getParams();
    if (!(!o || !n)) {
      if (!t)
        throw new Error("createAllowanceTransaction - No source token address found.");
      try {
        const r = await v.generateApproveCalldata({
          from: t,
          to: n,
          userAddress: o
        }), s = {
          data: r.tx.data,
          to: M.getPlainAddress(r.tx.from),
          gasPrice: BigInt(r.tx.eip155.gasPrice),
          value: BigInt(r.tx.value),
          toAmount: e.toTokenAmount
        };
        return e.swapTransaction = void 0, e.approvalTransaction = {
          data: s.data,
          to: s.to,
          gasPrice: s.gasPrice,
          value: s.value,
          toAmount: s.toAmount
        }, {
          data: s.data,
          to: s.to,
          gasPrice: s.gasPrice,
          value: s.value,
          toAmount: s.toAmount
        };
      } catch {
        w.goBack(), g.showError("Failed to create approval transaction"), e.approvalTransaction = void 0, e.swapTransaction = void 0, e.fetchError = !0;
        return;
      }
    }
  },
  async createSwapTransaction() {
    var u;
    const { networkAddress: o, fromCaipAddress: t, sourceTokenAmount: n } = a.getParams(), r = e.sourceToken, s = e.toToken;
    if (!t || !n || !r || !s)
      return;
    const i = (u = D.parseUnits(n, r.decimals)) == null ? void 0 : u.toString();
    try {
      const c = await v.generateSwapCalldata({
        userAddress: t,
        from: r.address,
        to: s.address,
        amount: i,
        disableEstimate: !0
      }), d = r.address === o, T = BigInt(c.tx.eip155.gas), m = BigInt(c.tx.eip155.gasPrice), f = {
        data: c.tx.data,
        to: M.getPlainAddress(c.tx.to),
        gas: T,
        gasPrice: m,
        value: BigInt(d ? i ?? "0" : "0"),
        toAmount: e.toTokenAmount
      };
      return e.gasPriceInUSD = A.getGasPriceInUSD(e.networkPrice, T, m), e.approvalTransaction = void 0, e.swapTransaction = f, f;
    } catch {
      w.goBack(), g.showError("Failed to create transaction"), e.approvalTransaction = void 0, e.swapTransaction = void 0, e.fetchError = !0;
      return;
    }
  },
  // -- Send Transactions --------------------------------- //
  async sendTransactionForApproval(o) {
    var s, i, u;
    const { fromAddress: t, isAuthConnector: n } = a.getParams();
    e.loadingApprovalTransaction = !0;
    const r = "Approve limit increase in your wallet";
    n ? w.pushTransactionStack({
      onSuccess() {
        g.showLoading(r);
      }
    }) : g.showLoading(r);
    try {
      await D.sendTransaction({
        address: t,
        to: o.to,
        data: o.data,
        value: o.value,
        chainNamespace: "eip155"
      }), await a.swapTokens(), await a.getTransaction(), e.approvalTransaction = void 0, e.loadingApprovalTransaction = !1;
    } catch (c) {
      const d = c;
      e.transactionError = d == null ? void 0 : d.shortMessage, e.loadingApprovalTransaction = !1, g.showError((d == null ? void 0 : d.shortMessage) || "Transaction error"), B.sendEvent({
        type: "track",
        event: "SWAP_APPROVAL_ERROR",
        properties: {
          message: (d == null ? void 0 : d.shortMessage) || (d == null ? void 0 : d.message) || "Unknown",
          network: ((s = b.state.activeCaipNetwork) == null ? void 0 : s.caipNetworkId) || "",
          swapFromToken: ((i = a.state.sourceToken) == null ? void 0 : i.symbol) || "",
          swapToToken: ((u = a.state.toToken) == null ? void 0 : u.symbol) || "",
          swapFromAmount: a.state.sourceTokenAmount || "",
          swapToAmount: a.state.toTokenAmount || "",
          isSmartAccount: x("eip155") === F.ACCOUNT_TYPES.SMART_ACCOUNT
        }
      });
    }
  },
  async sendTransactionForSwap(o) {
    var u, c, d, T, m, f, S, P, h, I, U, L;
    if (!o)
      return;
    const { fromAddress: t, toTokenAmount: n, isAuthConnector: r } = a.getParams();
    e.loadingTransaction = !0;
    const s = `Swapping ${(u = e.sourceToken) == null ? void 0 : u.symbol} to ${l.formatNumberToLocalString(n, 3)} ${(c = e.toToken) == null ? void 0 : c.symbol}`, i = `Swapped ${(d = e.sourceToken) == null ? void 0 : d.symbol} to ${l.formatNumberToLocalString(n, 3)} ${(T = e.toToken) == null ? void 0 : T.symbol}`;
    r ? w.pushTransactionStack({
      onSuccess() {
        w.replace("Account"), g.showLoading(s), N.resetState();
      }
    }) : g.showLoading("Confirm transaction in your wallet");
    try {
      const E = [(m = e.sourceToken) == null ? void 0 : m.address, (f = e.toToken) == null ? void 0 : f.address].join(","), p = await D.sendTransaction({
        address: t,
        to: o.to,
        data: o.data,
        value: o.value,
        chainNamespace: "eip155"
      });
      return e.loadingTransaction = !1, g.showSuccess(i), B.sendEvent({
        type: "track",
        event: "SWAP_SUCCESS",
        properties: {
          network: ((S = b.state.activeCaipNetwork) == null ? void 0 : S.caipNetworkId) || "",
          swapFromToken: ((P = a.state.sourceToken) == null ? void 0 : P.symbol) || "",
          swapToToken: ((h = a.state.toToken) == null ? void 0 : h.symbol) || "",
          swapFromAmount: a.state.sourceTokenAmount || "",
          swapToAmount: a.state.toTokenAmount || "",
          isSmartAccount: x("eip155") === F.ACCOUNT_TYPES.SMART_ACCOUNT
        }
      }), N.resetState(), r || w.replace("Account"), N.getMyTokensWithBalance(E), p;
    } catch (E) {
      const p = E;
      e.transactionError = p == null ? void 0 : p.shortMessage, e.loadingTransaction = !1, g.showError((p == null ? void 0 : p.shortMessage) || "Transaction error"), B.sendEvent({
        type: "track",
        event: "SWAP_ERROR",
        properties: {
          message: (p == null ? void 0 : p.shortMessage) || (p == null ? void 0 : p.message) || "Unknown",
          network: ((I = b.state.activeCaipNetwork) == null ? void 0 : I.caipNetworkId) || "",
          swapFromToken: ((U = a.state.sourceToken) == null ? void 0 : U.symbol) || "",
          swapToToken: ((L = a.state.toToken) == null ? void 0 : L.symbol) || "",
          swapFromAmount: a.state.sourceTokenAmount || "",
          swapToAmount: a.state.toTokenAmount || "",
          isSmartAccount: x("eip155") === F.ACCOUNT_TYPES.SMART_ACCOUNT
        }
      });
      return;
    }
  },
  // -- Checks -------------------------------------------- //
  hasInsufficientToken(o, t) {
    return A.isInsufficientSourceTokenForSwap(o, t, e.myTokensWithBalance);
  },
  // -- Calculations -------------------------------------- //
  setTransactionDetails() {
    const { toTokenAddress: o, toTokenDecimals: t } = a.getParams();
    !o || !t || (e.gasPriceInUSD = A.getGasPriceInUSD(e.networkPrice, BigInt(e.gasFee), BigInt(O)), e.priceImpact = A.getPriceImpact({
      sourceTokenAmount: e.sourceTokenAmount,
      sourceTokenPriceInUSD: e.sourceTokenPriceInUSD,
      toTokenPriceInUSD: e.toTokenPriceInUSD,
      toTokenAmount: e.toTokenAmount
    }), e.maxSlippage = A.getMaxSlippage(e.slippage, e.toTokenAmount), e.providerFee = A.getProviderFee(e.sourceTokenAmount));
  }
}, a = z(N), se = X`
  :host {
    display: block;
  }

  :host > button {
    gap: var(--wui-spacing-xxs);
    padding: var(--wui-spacing-xs);
    padding-right: var(--wui-spacing-1xs);
    height: 40px;
    border-radius: var(--wui-border-radius-l);
    background: var(--wui-color-gray-glass-002);
    border-width: 0px;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
  }

  :host > button wui-image {
    width: 24px;
    height: 24px;
    border-radius: var(--wui-border-radius-s);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }
`;
var W = function(o, t, n, r) {
  var s = arguments.length, i = s < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, u;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") i = Reflect.decorate(o, t, n, r);
  else for (var c = o.length - 1; c >= 0; c--) (u = o[c]) && (i = (s < 3 ? u(i) : s > 3 ? u(t, n, i) : u(t, n)) || i);
  return s > 3 && i && Object.defineProperty(t, n, i), i;
};
let y = class extends oe {
  constructor() {
    super(...arguments), this.text = "";
  }
  render() {
    return _`
      <button>
        ${this.tokenTemplate()}
        <wui-text variant="paragraph-600" color="fg-100">${this.text}</wui-text>
      </button>
    `;
  }
  tokenTemplate() {
    return this.imageSrc ? _`<wui-image src=${this.imageSrc}></wui-image>` : _`
      <wui-icon-box
        size="sm"
        iconColor="fg-200"
        backgroundColor="fg-300"
        icon="networkPlaceholder"
      ></wui-icon-box>
    `;
  }
};
y.styles = [Z, ee, se];
W([
  G()
], y.prototype, "imageSrc", void 0);
W([
  G()
], y.prototype, "text", void 0);
y = W([
  ne("wui-token-button")
], y);
export {
  a as S
};
