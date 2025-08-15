import { i as A, a as P, x as c } from "./lit-element-CWLRvgWK.js";
import { r as a, n as g } from "./class-map-BaJ3HzzH.js";
import { b as E, N as h, i as K, E as W, R as S, A as U, c as M, M as F, g as Q, W as q, r as z, e as H } from "./index-C8kdZHDI.js";
import { c as D } from "./index-D5_HZ1pl.js";
import "./index-BMwx-uEc.js";
import { M as j } from "./index-DyPmFrZ8.js";
import "./index-Dmizlc_t.js";
import { S as n } from "./SwapController-CeOWmkdP.js";
import "./index-Dcf_tL1W.js";
import "./index-hO09_EY9.js";
import "./index-DamJDtO7.js";
import "./index-DVe7jYyH.js";
const G = {
  numericInputKeyDown(u, e, t) {
    const i = [
      "Backspace",
      "Meta",
      "Ctrl",
      "a",
      "A",
      "c",
      "C",
      "x",
      "X",
      "v",
      "V",
      "ArrowLeft",
      "ArrowRight",
      "Tab"
    ], s = u.metaKey || u.ctrlKey, o = u.key, r = o.toLocaleLowerCase(), l = r === "a", b = r === "c", I = r === "v", _ = r === "x", L = o === ",", O = o === ".", B = o >= "0" && o <= "9";
    !s && (l || b || I || _) && u.preventDefault(), e === "0" && !L && !O && o === "0" && u.preventDefault(), e === "0" && B && (t(o), u.preventDefault()), (L || O) && (e || (t("0."), u.preventDefault()), (e != null && e.includes(".") || e != null && e.includes(",")) && u.preventDefault()), !B && !i.includes(o) && !O && !L && u.preventDefault();
  }
}, X = A`
  :host {
    width: 100%;
  }

  .details-container > wui-flex {
    background: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xxs);
    width: 100%;
  }

  .details-container > wui-flex > button {
    border: none;
    background: none;
    padding: var(--wui-spacing-s);
    border-radius: var(--wui-border-radius-xxs);
    cursor: pointer;
  }

  .details-content-container {
    padding: var(--wui-spacing-1xs);
    padding-top: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .details-content-container > wui-flex {
    width: 100%;
  }

  .details-row {
    width: 100%;
    padding: var(--wui-spacing-s);
    padding-left: var(--wui-spacing-s);
    padding-right: var(--wui-spacing-1xs);
    border-radius: calc(var(--wui-border-radius-5xs) + var(--wui-border-radius-4xs));
    background: var(--wui-color-gray-glass-002);
  }

  .details-row-title {
    white-space: nowrap;
  }

  .details-row.provider-free-row {
    padding-right: var(--wui-spacing-xs);
  }
`;
var v = function(u, e, t, i) {
  var s = arguments.length, o = s < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, t) : i, r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") o = Reflect.decorate(u, e, t, i);
  else for (var l = u.length - 1; l >= 0; l--) (r = u[l]) && (o = (s < 3 ? r(o) : s > 3 ? r(e, t, o) : r(e, t)) || o);
  return s > 3 && o && Object.defineProperty(e, t, o), o;
};
const Y = K.CONVERT_SLIPPAGE_TOLERANCE;
let m = class extends P {
  constructor() {
    var e;
    super(), this.unsubscribe = [], this.networkName = (e = E.state.activeCaipNetwork) == null ? void 0 : e.name, this.detailsOpen = !1, this.sourceToken = n.state.sourceToken, this.toToken = n.state.toToken, this.toTokenAmount = n.state.toTokenAmount, this.sourceTokenPriceInUSD = n.state.sourceTokenPriceInUSD, this.toTokenPriceInUSD = n.state.toTokenPriceInUSD, this.priceImpact = n.state.priceImpact, this.maxSlippage = n.state.maxSlippage, this.networkTokenSymbol = n.state.networkTokenSymbol, this.inputError = n.state.inputError, this.unsubscribe.push(n.subscribe((t) => {
      this.sourceToken = t.sourceToken, this.toToken = t.toToken, this.toTokenAmount = t.toTokenAmount, this.priceImpact = t.priceImpact, this.maxSlippage = t.maxSlippage, this.sourceTokenPriceInUSD = t.sourceTokenPriceInUSD, this.toTokenPriceInUSD = t.toTokenPriceInUSD, this.inputError = t.inputError;
    }));
  }
  render() {
    const e = this.toTokenAmount && this.maxSlippage ? h.bigNumber(this.toTokenAmount).minus(this.maxSlippage).toString() : null;
    if (!this.sourceToken || !this.toToken || this.inputError)
      return null;
    const t = this.sourceTokenPriceInUSD && this.toTokenPriceInUSD ? 1 / this.toTokenPriceInUSD * this.sourceTokenPriceInUSD : 0;
    return c`
      <wui-flex flexDirection="column" alignItems="center" gap="1xs" class="details-container">
        <wui-flex flexDirection="column">
          <button @click=${this.toggleDetails.bind(this)}>
            <wui-flex justifyContent="space-between" .padding=${["0", "xs", "0", "xs"]}>
              <wui-flex justifyContent="flex-start" flexGrow="1" gap="xs">
                <wui-text variant="small-400" color="fg-100">
                  1 ${this.sourceToken.symbol} =
                  ${h.formatNumberToLocalString(t, 3)}
                  ${this.toToken.symbol}
                </wui-text>
                <wui-text variant="small-400" color="fg-200">
                  $${h.formatNumberToLocalString(this.sourceTokenPriceInUSD)}
                </wui-text>
              </wui-flex>
              <wui-icon name="chevronBottom"></wui-icon>
            </wui-flex>
          </button>
          ${this.detailsOpen ? c`
                <wui-flex flexDirection="column" gap="xs" class="details-content-container">
                  ${this.priceImpact ? c` <wui-flex flexDirection="column" gap="xs">
                        <wui-flex
                          justifyContent="space-between"
                          alignItems="center"
                          class="details-row"
                        >
                          <wui-flex alignItems="center" gap="xs">
                            <wui-text class="details-row-title" variant="small-400" color="fg-150">
                              Price impact
                            </wui-text>
                            <w3m-tooltip-trigger
                              text="Price impact reflects the change in market price due to your trade"
                            >
                              <wui-icon size="xs" color="fg-250" name="infoCircle"></wui-icon>
                            </w3m-tooltip-trigger>
                          </wui-flex>
                          <wui-flex>
                            <wui-text variant="small-400" color="fg-200">
                              ${h.formatNumberToLocalString(this.priceImpact, 3)}%
                            </wui-text>
                          </wui-flex>
                        </wui-flex>
                      </wui-flex>` : null}
                  ${this.maxSlippage && this.sourceToken.symbol ? c`<wui-flex flexDirection="column" gap="xs">
                        <wui-flex
                          justifyContent="space-between"
                          alignItems="center"
                          class="details-row"
                        >
                          <wui-flex alignItems="center" gap="xs">
                            <wui-text class="details-row-title" variant="small-400" color="fg-150">
                              Max. slippage
                            </wui-text>
                            <w3m-tooltip-trigger
                              text=${`Max slippage sets the minimum amount you must receive for the transaction to proceed. ${e ? `Transaction will be reversed if you receive less than ${h.formatNumberToLocalString(e, 6)} ${this.toToken.symbol} due to price changes.` : ""}`}
                            >
                              <wui-icon size="xs" color="fg-250" name="infoCircle"></wui-icon>
                            </w3m-tooltip-trigger>
                          </wui-flex>
                          <wui-flex>
                            <wui-text variant="small-400" color="fg-200">
                              ${h.formatNumberToLocalString(this.maxSlippage, 6)}
                              ${this.toToken.symbol} ${Y}%
                            </wui-text>
                          </wui-flex>
                        </wui-flex>
                      </wui-flex>` : null}
                  <wui-flex flexDirection="column" gap="xs">
                    <wui-flex
                      justifyContent="space-between"
                      alignItems="center"
                      class="details-row provider-free-row"
                    >
                      <wui-flex alignItems="center" gap="xs">
                        <wui-text class="details-row-title" variant="small-400" color="fg-150">
                          Provider fee
                        </wui-text>
                      </wui-flex>
                      <wui-flex>
                        <wui-text variant="small-400" color="fg-200">0.85%</wui-text>
                      </wui-flex>
                    </wui-flex>
                  </wui-flex>
                </wui-flex>
              ` : null}
        </wui-flex>
      </wui-flex>
    `;
  }
  toggleDetails() {
    this.detailsOpen = !this.detailsOpen;
  }
};
m.styles = [X];
v([
  a()
], m.prototype, "networkName", void 0);
v([
  g()
], m.prototype, "detailsOpen", void 0);
v([
  a()
], m.prototype, "sourceToken", void 0);
v([
  a()
], m.prototype, "toToken", void 0);
v([
  a()
], m.prototype, "toTokenAmount", void 0);
v([
  a()
], m.prototype, "sourceTokenPriceInUSD", void 0);
v([
  a()
], m.prototype, "toTokenPriceInUSD", void 0);
v([
  a()
], m.prototype, "priceImpact", void 0);
v([
  a()
], m.prototype, "maxSlippage", void 0);
v([
  a()
], m.prototype, "networkTokenSymbol", void 0);
v([
  a()
], m.prototype, "inputError", void 0);
m = v([
  D("w3m-swap-details")
], m);
const Z = A`
  :host {
    width: 100%;
  }

  :host > wui-flex {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: var(--wui-border-radius-s);
    padding: var(--wui-spacing-xl);
    padding-right: var(--wui-spacing-s);
    background-color: var(--wui-color-gray-glass-002);
    box-shadow: inset 0px 0px 0px 1px var(--wui-color-gray-glass-002);
    width: 100%;
    height: 100px;
    box-sizing: border-box;
    position: relative;
  }

  wui-shimmer.market-value {
    opacity: 0;
  }

  :host > wui-flex > svg.input_mask {
    position: absolute;
    inset: 0;
    z-index: 5;
  }

  :host wui-flex .input_mask__border,
  :host wui-flex .input_mask__background {
    transition: fill var(--wui-duration-md) var(--wui-ease-out-power-1);
    will-change: fill;
  }

  :host wui-flex .input_mask__border {
    fill: var(--wui-color-gray-glass-020);
  }

  :host wui-flex .input_mask__background {
    fill: var(--wui-color-gray-glass-002);
  }
`;
var V = function(u, e, t, i) {
  var s = arguments.length, o = s < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, t) : i, r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") o = Reflect.decorate(u, e, t, i);
  else for (var l = u.length - 1; l >= 0; l--) (r = u[l]) && (o = (s < 3 ? r(o) : s > 3 ? r(e, t, o) : r(e, t)) || o);
  return s > 3 && o && Object.defineProperty(e, t, o), o;
};
let R = class extends P {
  constructor() {
    super(...arguments), this.target = "sourceToken";
  }
  render() {
    return c`
      <wui-flex class justifyContent="space-between">
        <wui-flex
          flex="1"
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="center"
          class="swap-input"
          gap="xxs"
        >
          <wui-shimmer width="80px" height="40px" borderRadius="xxs" variant="light"></wui-shimmer>
        </wui-flex>
        ${this.templateTokenSelectButton()}
      </wui-flex>
    `;
  }
  templateTokenSelectButton() {
    return c`
      <wui-flex
        class="swap-token-button"
        flexDirection="column"
        alignItems="flex-end"
        justifyContent="center"
        gap="xxs"
      >
        <wui-shimmer width="80px" height="40px" borderRadius="3xl" variant="light"></wui-shimmer>
      </wui-flex>
    `;
  }
};
R.styles = [Z];
V([
  g()
], R.prototype, "target", void 0);
R = V([
  D("w3m-swap-input-skeleton")
], R);
const J = A`
  :host > wui-flex {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: var(--wui-border-radius-s);
    background-color: var(--wui-color-gray-glass-002);
    padding: var(--wui-spacing-xl);
    padding-right: var(--wui-spacing-s);
    width: 100%;
    height: 100px;
    box-sizing: border-box;
    box-shadow: inset 0px 0px 0px 1px var(--wui-color-gray-glass-002);
    position: relative;
    transition: box-shadow var(--wui-ease-out-power-1) var(--wui-duration-lg);
    will-change: background-color;
  }

  :host wui-flex.focus {
    box-shadow: inset 0px 0px 0px 1px var(--wui-color-gray-glass-005);
  }

  :host > wui-flex .swap-input,
  :host > wui-flex .swap-token-button {
    z-index: 10;
  }

  :host > wui-flex .swap-input {
    -webkit-mask-image: linear-gradient(
      270deg,
      transparent 0px,
      transparent 8px,
      black 24px,
      black 25px,
      black 32px,
      black 100%
    );
    mask-image: linear-gradient(
      270deg,
      transparent 0px,
      transparent 8px,
      black 24px,
      black 25px,
      black 32px,
      black 100%
    );
  }

  :host > wui-flex .swap-input input {
    background: none;
    border: none;
    height: 42px;
    width: 100%;
    font-size: 32px;
    font-style: normal;
    font-weight: 400;
    line-height: 130%;
    letter-spacing: -1.28px;
    outline: none;
    caret-color: var(--wui-color-accent-100);
    color: var(--wui-color-fg-100);
    padding: 0px;
  }

  :host > wui-flex .swap-input input:focus-visible {
    outline: none;
  }

  :host > wui-flex .swap-input input::-webkit-outer-spin-button,
  :host > wui-flex .swap-input input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .max-value-button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: var(--wui-color-gray-glass-020);
    padding-left: 0px;
  }

  .market-value {
    min-height: 18px;
  }
`;
var T = function(u, e, t, i) {
  var s = arguments.length, o = s < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, t) : i, r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") o = Reflect.decorate(u, e, t, i);
  else for (var l = u.length - 1; l >= 0; l--) (r = u[l]) && (o = (s < 3 ? r(o) : s > 3 ? r(e, t, o) : r(e, t)) || o);
  return s > 3 && o && Object.defineProperty(e, t, o), o;
};
const ee = 5e-5;
let x = class extends P {
  constructor() {
    super(...arguments), this.focused = !1, this.price = 0, this.target = "sourceToken", this.onSetAmount = null, this.onSetMaxValue = null;
  }
  render() {
    const e = this.marketValue || "0", t = h.bigNumber(e).gt("0");
    return c`
      <wui-flex class="${this.focused ? "focus" : ""}" justifyContent="space-between">
        <wui-flex
          flex="1"
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="center"
          class="swap-input"
        >
          <input
            data-testid="swap-input-${this.target}"
            @focusin=${() => this.onFocusChange(!0)}
            @focusout=${() => this.onFocusChange(!1)}
            ?disabled=${this.disabled}
            .value=${this.value}
            @input=${this.dispatchInputChangeEvent}
            @keydown=${this.handleKeydown}
            placeholder="0"
            type="text"
            inputmode="decimal"
          />
          <wui-text class="market-value" variant="small-400" color="fg-200">
            ${t ? `$${h.formatNumberToLocalString(this.marketValue, 2)}` : null}
          </wui-text>
        </wui-flex>
        ${this.templateTokenSelectButton()}
      </wui-flex>
    `;
  }
  handleKeydown(e) {
    return G.numericInputKeyDown(e, this.value, (t) => {
      var i;
      return (i = this.onSetAmount) == null ? void 0 : i.call(this, this.target, t);
    });
  }
  dispatchInputChangeEvent(e) {
    if (!this.onSetAmount)
      return;
    const t = e.target.value.replace(/[^0-9.]/gu, "");
    t === "," || t === "." ? this.onSetAmount(this.target, "0.") : t.endsWith(",") ? this.onSetAmount(this.target, t.replace(",", ".")) : this.onSetAmount(this.target, t);
  }
  setMaxValueToInput() {
    var e;
    (e = this.onSetMaxValue) == null || e.call(this, this.target, this.balance);
  }
  templateTokenSelectButton() {
    return this.token ? c`
      <wui-flex
        class="swap-token-button"
        flexDirection="column"
        alignItems="flex-end"
        justifyContent="center"
        gap="xxs"
      >
        <wui-token-button
          data-testid="swap-input-token-${this.target}"
          text=${this.token.symbol}
          imageSrc=${this.token.logoUri}
          @click=${this.onSelectToken.bind(this)}
        >
        </wui-token-button>
        <wui-flex alignItems="center" gap="xxs"> ${this.tokenBalanceTemplate()} </wui-flex>
      </wui-flex>
    ` : c` <wui-button
        data-testid="swap-select-token-button-${this.target}"
        class="swap-token-button"
        size="md"
        variant="accent"
        @click=${this.onSelectToken.bind(this)}
      >
        Select token
      </wui-button>`;
  }
  tokenBalanceTemplate() {
    const e = h.multiply(this.balance, this.price), t = e ? e == null ? void 0 : e.gt(ee) : !1;
    return c`
      ${t ? c`<wui-text variant="small-400" color="fg-200">
            ${h.formatNumberToLocalString(this.balance, 2)}
          </wui-text>` : null}
      ${this.target === "sourceToken" ? this.tokenActionButtonTemplate(t) : null}
    `;
  }
  tokenActionButtonTemplate(e) {
    return e ? c` <button class="max-value-button" @click=${this.setMaxValueToInput.bind(this)}>
        <wui-text color="accent-100" variant="small-600">Max</wui-text>
      </button>` : c` <button class="max-value-button" @click=${this.onBuyToken.bind(this)}>
      <wui-text color="accent-100" variant="small-600">Buy</wui-text>
    </button>`;
  }
  onFocusChange(e) {
    this.focused = e;
  }
  onSelectToken() {
    W.sendEvent({ type: "track", event: "CLICK_SELECT_TOKEN_TO_SWAP" }), S.push("SwapSelectToken", {
      target: this.target
    });
  }
  onBuyToken() {
    S.push("OnRampProviders");
  }
};
x.styles = [J];
T([
  g()
], x.prototype, "focused", void 0);
T([
  g()
], x.prototype, "balance", void 0);
T([
  g()
], x.prototype, "value", void 0);
T([
  g()
], x.prototype, "price", void 0);
T([
  g()
], x.prototype, "marketValue", void 0);
T([
  g()
], x.prototype, "disabled", void 0);
T([
  g()
], x.prototype, "target", void 0);
T([
  g()
], x.prototype, "token", void 0);
T([
  g()
], x.prototype, "onSetAmount", void 0);
T([
  g()
], x.prototype, "onSetMaxValue", void 0);
x = T([
  D("w3m-swap-input")
], x);
const te = A`
  :host > wui-flex:first-child {
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
  }

  :host > wui-flex:first-child::-webkit-scrollbar {
    display: none;
  }

  wui-loading-hexagon {
    position: absolute;
  }

  .action-button {
    width: 100%;
    border-radius: var(--wui-border-radius-xs);
  }

  .action-button:disabled {
    border-color: 1px solid var(--wui-color-gray-glass-005);
  }

  .swap-inputs-container {
    position: relative;
  }

  .replace-tokens-button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    gap: var(--wui-spacing-1xs);
    border-radius: var(--wui-border-radius-xs);
    background-color: var(--wui-color-modal-bg-base);
    padding: var(--wui-spacing-xxs);
  }

  .replace-tokens-button-container > button {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    width: 40px;
    padding: var(--wui-spacing-xs);
    border: none;
    border-radius: var(--wui-border-radius-xxs);
    background: var(--wui-color-gray-glass-002);
    transition: background-color var(--wui-duration-md) var(--wui-ease-out-power-1);
    will-change: background-color;
    z-index: 20;
  }

  .replace-tokens-button-container > button:hover {
    background: var(--wui-color-gray-glass-005);
  }

  .details-container > wui-flex {
    background: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xxs);
    width: 100%;
  }

  .details-container > wui-flex > button {
    border: none;
    background: none;
    padding: var(--wui-spacing-s);
    border-radius: var(--wui-border-radius-xxs);
    transition: background 0.2s linear;
  }

  .details-container > wui-flex > button:hover {
    background: var(--wui-color-gray-glass-002);
  }

  .details-content-container {
    padding: var(--wui-spacing-1xs);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .details-content-container > wui-flex {
    width: 100%;
  }

  .details-row {
    width: 100%;
    padding: var(--wui-spacing-s) var(--wui-spacing-xl);
    border-radius: var(--wui-border-radius-xxs);
    background: var(--wui-color-gray-glass-002);
  }
`;
var w = function(u, e, t, i) {
  var s = arguments.length, o = s < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, t) : i, r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") o = Reflect.decorate(u, e, t, i);
  else for (var l = u.length - 1; l >= 0; l--) (r = u[l]) && (o = (s < 3 ? r(o) : s > 3 ? r(e, t, o) : r(e, t)) || o);
  return s > 3 && o && Object.defineProperty(e, t, o), o;
};
let p = class extends P {
  constructor() {
    var e, t;
    super(), this.unsubscribe = [], this.initialParams = (e = S.state.data) == null ? void 0 : e.swap, this.detailsOpen = !1, this.caipAddress = U.state.caipAddress, this.caipNetworkId = (t = E.state.activeCaipNetwork) == null ? void 0 : t.caipNetworkId, this.initialized = n.state.initialized, this.loadingQuote = n.state.loadingQuote, this.loadingPrices = n.state.loadingPrices, this.loadingTransaction = n.state.loadingTransaction, this.sourceToken = n.state.sourceToken, this.sourceTokenAmount = n.state.sourceTokenAmount, this.sourceTokenPriceInUSD = n.state.sourceTokenPriceInUSD, this.toToken = n.state.toToken, this.toTokenAmount = n.state.toTokenAmount, this.toTokenPriceInUSD = n.state.toTokenPriceInUSD, this.inputError = n.state.inputError, this.fetchError = n.state.fetchError, this.lastTokenPriceUpdate = 0, this.minTokenPriceUpdateInterval = 1e4, this.visibilityChangeHandler = () => {
      document != null && document.hidden ? (clearInterval(this.interval), this.interval = void 0) : this.startTokenPriceInterval();
    }, this.startTokenPriceInterval = () => {
      this.interval && Date.now() - this.lastTokenPriceUpdate < this.minTokenPriceUpdateInterval || (this.lastTokenPriceUpdate && Date.now() - this.lastTokenPriceUpdate > this.minTokenPriceUpdateInterval && this.fetchTokensAndValues(), clearInterval(this.interval), this.interval = setInterval(() => {
        this.fetchTokensAndValues();
      }, this.minTokenPriceUpdateInterval));
    }, this.watchTokensAndValues = () => {
      !this.sourceToken || !this.toToken || (this.subscribeToVisibilityChange(), this.startTokenPriceInterval());
    }, this.onDebouncedGetSwapCalldata = M.debounce(async () => {
      await n.swapTokens();
    }, 200), E.subscribeKey("activeCaipNetwork", (i) => this.onCaipNetworkChange({
      newCaipNetwork: i,
      resetSwapState: !0,
      initializeSwapState: !1
    })), U.subscribeKey("caipAddress", (i) => this.onCaipAddressChange({
      newCaipAddress: i,
      resetSwapState: !0,
      initializeSwapState: !1
    })), this.unsubscribe.push(E.subscribeKey("activeCaipNetwork", (i) => this.onCaipNetworkChange({
      newCaipNetwork: i,
      resetSwapState: !1,
      initializeSwapState: !0
    })), U.subscribeKey("caipAddress", (i) => this.onCaipAddressChange({
      newCaipAddress: i,
      resetSwapState: !1,
      initializeSwapState: !0
    })), F.subscribeKey("open", (i) => {
      i || n.resetState();
    }), S.subscribeKey("view", (i) => {
      i.includes("Swap") || n.resetValues();
    }), n.subscribe((i) => {
      this.initialized = i.initialized, this.loadingQuote = i.loadingQuote, this.loadingPrices = i.loadingPrices, this.loadingTransaction = i.loadingTransaction, this.sourceToken = i.sourceToken, this.sourceTokenAmount = i.sourceTokenAmount, this.sourceTokenPriceInUSD = i.sourceTokenPriceInUSD, this.toToken = i.toToken, this.toTokenAmount = i.toTokenAmount, this.toTokenPriceInUSD = i.toTokenPriceInUSD, this.inputError = i.inputError, this.fetchError = i.fetchError, i.sourceToken && i.toToken && this.watchTokensAndValues();
    }));
  }
  async firstUpdated() {
    n.initializeState(), this.watchTokensAndValues(), await this.handleSwapParameters();
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((e) => e == null ? void 0 : e()), clearInterval(this.interval), document == null || document.removeEventListener("visibilitychange", this.visibilityChangeHandler);
  }
  render() {
    return c`
      <wui-flex flexDirection="column" .padding=${["0", "l", "l", "l"]} gap="s">
        ${this.initialized ? this.templateSwap() : this.templateLoading()}
      </wui-flex>
    `;
  }
  subscribeToVisibilityChange() {
    document == null || document.removeEventListener("visibilitychange", this.visibilityChangeHandler), document == null || document.addEventListener("visibilitychange", this.visibilityChangeHandler);
  }
  fetchTokensAndValues() {
    n.getNetworkTokenPrice(), n.getMyTokensWithBalance(), n.swapTokens(), this.lastTokenPriceUpdate = Date.now();
  }
  templateSwap() {
    return c`
      <wui-flex flexDirection="column" gap="s">
        <wui-flex flexDirection="column" alignItems="center" gap="xs" class="swap-inputs-container">
          ${this.templateTokenInput("sourceToken", this.sourceToken)}
          ${this.templateTokenInput("toToken", this.toToken)} ${this.templateReplaceTokensButton()}
        </wui-flex>
        ${this.templateDetails()} ${this.templateActionButton()}
      </wui-flex>
    `;
  }
  actionButtonLabel() {
    return this.fetchError ? "Swap" : !this.sourceToken || !this.toToken ? "Select token" : this.sourceTokenAmount ? this.inputError ? this.inputError : "Review swap" : "Enter amount";
  }
  templateReplaceTokensButton() {
    return c`
      <wui-flex class="replace-tokens-button-container">
        <button @click=${this.onSwitchTokens.bind(this)}>
          <wui-icon name="recycleHorizontal" color="fg-250" size="lg"></wui-icon>
        </button>
      </wui-flex>
    `;
  }
  templateLoading() {
    return c`
      <wui-flex flexDirection="column" gap="l">
        <wui-flex flexDirection="column" alignItems="center" gap="xs" class="swap-inputs-container">
          <w3m-swap-input-skeleton target="sourceToken"></w3m-swap-input-skeleton>
          <w3m-swap-input-skeleton target="toToken"></w3m-swap-input-skeleton>
          ${this.templateReplaceTokensButton()}
        </wui-flex>
        ${this.templateActionButton()}
      </wui-flex>
    `;
  }
  templateTokenInput(e, t) {
    var l, b;
    const i = (l = n.state.myTokensWithBalance) == null ? void 0 : l.find((I) => (I == null ? void 0 : I.address) === (t == null ? void 0 : t.address)), s = e === "toToken" ? this.toTokenAmount : this.sourceTokenAmount, o = e === "toToken" ? this.toTokenPriceInUSD : this.sourceTokenPriceInUSD, r = h.parseLocalStringToNumber(s) * o;
    return c`<w3m-swap-input
      .value=${e === "toToken" ? this.toTokenAmount : this.sourceTokenAmount}
      .disabled=${e === "toToken"}
      .onSetAmount=${this.handleChangeAmount.bind(this)}
      target=${e}
      .token=${t}
      .balance=${(b = i == null ? void 0 : i.quantity) == null ? void 0 : b.numeric}
      .price=${i == null ? void 0 : i.price}
      .marketValue=${r}
      .onSetMaxValue=${this.onSetMaxValue.bind(this)}
    ></w3m-swap-input>`;
  }
  onSetMaxValue(e, t) {
    const i = h.bigNumber(t || "0");
    this.handleChangeAmount(e, i.gt(0) ? i.toFixed(20) : "0");
  }
  templateDetails() {
    return !this.sourceToken || !this.toToken || this.inputError ? null : c`<w3m-swap-details .detailsOpen=${this.detailsOpen}></w3m-swap-details>`;
  }
  handleChangeAmount(e, t) {
    n.clearError(), e === "sourceToken" ? n.setSourceTokenAmount(t) : n.setToTokenAmount(t), this.onDebouncedGetSwapCalldata();
  }
  templateActionButton() {
    const e = !this.toToken || !this.sourceToken, t = !this.sourceTokenAmount, i = this.loadingQuote || this.loadingPrices || this.loadingTransaction, s = i || e || t || this.inputError;
    return c` <wui-flex gap="xs">
      <wui-button
        data-testid="swap-action-button"
        class="action-button"
        fullWidth
        size="lg"
        borderRadius="xs"
        variant=${e ? "neutral" : "main"}
        .loading=${i}
        .disabled=${s}
        @click=${this.onSwapPreview.bind(this)}
      >
        ${this.actionButtonLabel()}
      </wui-button>
    </wui-flex>`;
  }
  onSwitchTokens() {
    n.switchTokens();
  }
  async onSwapPreview() {
    var e, t;
    this.fetchError && await n.swapTokens(), W.sendEvent({
      type: "track",
      event: "INITIATE_SWAP",
      properties: {
        network: this.caipNetworkId || "",
        swapFromToken: ((e = this.sourceToken) == null ? void 0 : e.symbol) || "",
        swapToToken: ((t = this.toToken) == null ? void 0 : t.symbol) || "",
        swapFromAmount: this.sourceTokenAmount || "",
        swapToAmount: this.toTokenAmount || "",
        isSmartAccount: Q(E.state.activeChain) === q.ACCOUNT_TYPES.SMART_ACCOUNT
      }
    }), S.push("SwapPreview");
  }
  async handleSwapParameters() {
    this.initialParams && (n.state.initialized || await new Promise((t) => {
      const i = n.subscribeKey("initialized", (s) => {
        s && (i == null || i(), t());
      });
    }), await this.setSwapParameters(this.initialParams));
  }
  async setSwapParameters({ amount: e, fromToken: t, toToken: i }) {
    (!n.state.tokens || !n.state.myTokensWithBalance) && await new Promise((r) => {
      const l = n.subscribeKey("myTokensWithBalance", (b) => {
        b && b.length > 0 && (l == null || l(), r());
      });
      setTimeout(() => {
        l == null || l(), r();
      }, 5e3);
    });
    const s = [
      ...n.state.tokens || [],
      ...n.state.myTokensWithBalance || []
    ];
    if (t) {
      const o = s.find((r) => r.symbol.toLowerCase() === t.toLowerCase());
      o && n.setSourceToken(o);
    }
    if (i) {
      const o = s.find((r) => r.symbol.toLowerCase() === i.toLowerCase());
      o && n.setToToken(o);
    }
    e && !isNaN(Number(e)) && n.setSourceTokenAmount(e);
  }
  onCaipAddressChange({ newCaipAddress: e, resetSwapState: t, initializeSwapState: i }) {
    this.caipAddress !== e && (this.caipAddress = e, t && n.resetState(), i && n.initializeState());
  }
  onCaipNetworkChange({ newCaipNetwork: e, resetSwapState: t, initializeSwapState: i }) {
    this.caipNetworkId !== (e == null ? void 0 : e.caipNetworkId) && (this.caipNetworkId = e == null ? void 0 : e.caipNetworkId, t && n.resetState(), i && n.initializeState());
  }
};
p.styles = te;
w([
  g({ type: Object })
], p.prototype, "initialParams", void 0);
w([
  a()
], p.prototype, "interval", void 0);
w([
  a()
], p.prototype, "detailsOpen", void 0);
w([
  a()
], p.prototype, "caipAddress", void 0);
w([
  a()
], p.prototype, "caipNetworkId", void 0);
w([
  a()
], p.prototype, "initialized", void 0);
w([
  a()
], p.prototype, "loadingQuote", void 0);
w([
  a()
], p.prototype, "loadingPrices", void 0);
w([
  a()
], p.prototype, "loadingTransaction", void 0);
w([
  a()
], p.prototype, "sourceToken", void 0);
w([
  a()
], p.prototype, "sourceTokenAmount", void 0);
w([
  a()
], p.prototype, "sourceTokenPriceInUSD", void 0);
w([
  a()
], p.prototype, "toToken", void 0);
w([
  a()
], p.prototype, "toTokenAmount", void 0);
w([
  a()
], p.prototype, "toTokenPriceInUSD", void 0);
w([
  a()
], p.prototype, "inputError", void 0);
w([
  a()
], p.prototype, "fetchError", void 0);
w([
  a()
], p.prototype, "lastTokenPriceUpdate", void 0);
p = w([
  D("w3m-swap-view")
], p);
const ie = A`
  :host > wui-flex:first-child {
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
  }

  :host > wui-flex:first-child::-webkit-scrollbar {
    display: none;
  }

  .preview-container,
  .details-container {
    width: 100%;
  }

  .token-image {
    width: 24px;
    height: 24px;
    box-shadow: 0 0 0 2px var(--wui-color-gray-glass-005);
    border-radius: 12px;
  }

  wui-loading-hexagon {
    position: absolute;
  }

  .token-item {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--wui-spacing-xxs);
    padding: var(--wui-spacing-xs);
    height: 40px;
    border: none;
    border-radius: 80px;
    background: var(--wui-color-gray-glass-002);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    cursor: pointer;
    transition: background 0.2s linear;
  }

  .token-item:hover {
    background: var(--wui-color-gray-glass-005);
  }

  .preview-token-details-container {
    width: 100%;
  }

  .details-row {
    width: 100%;
    padding: var(--wui-spacing-s) var(--wui-spacing-xl);
    border-radius: var(--wui-border-radius-xxs);
    background: var(--wui-color-gray-glass-002);
  }

  .action-buttons-container {
    width: 100%;
    gap: var(--wui-spacing-xs);
  }

  .action-buttons-container > button {
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    height: 48px;
    border-radius: var(--wui-border-radius-xs);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  .action-buttons-container > button:disabled {
    opacity: 0.8;
    cursor: not-allowed;
  }

  .action-button > wui-loading-spinner {
    display: inline-block;
  }

  .cancel-button:hover,
  .action-button:hover {
    cursor: pointer;
  }

  .action-buttons-container > wui-button.cancel-button {
    flex: 2;
  }

  .action-buttons-container > wui-button.action-button {
    flex: 4;
  }

  .action-buttons-container > button.action-button > wui-text {
    color: white;
  }

  .details-container > wui-flex {
    background: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xxs);
    width: 100%;
  }

  .details-container > wui-flex > button {
    border: none;
    background: none;
    padding: var(--wui-spacing-s);
    border-radius: var(--wui-border-radius-xxs);
    transition: background 0.2s linear;
  }

  .details-container > wui-flex > button:hover {
    background: var(--wui-color-gray-glass-002);
  }

  .details-content-container {
    padding: var(--wui-spacing-1xs);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .details-content-container > wui-flex {
    width: 100%;
  }

  .details-row {
    width: 100%;
    padding: var(--wui-spacing-s) var(--wui-spacing-xl);
    border-radius: var(--wui-border-radius-xxs);
    background: var(--wui-color-gray-glass-002);
  }
`;
var f = function(u, e, t, i) {
  var s = arguments.length, o = s < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, t) : i, r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") o = Reflect.decorate(u, e, t, i);
  else for (var l = u.length - 1; l >= 0; l--) (r = u[l]) && (o = (s < 3 ? r(o) : s > 3 ? r(e, t, o) : r(e, t)) || o);
  return s > 3 && o && Object.defineProperty(e, t, o), o;
};
let d = class extends P {
  constructor() {
    super(), this.unsubscribe = [], this.detailsOpen = !0, this.approvalTransaction = n.state.approvalTransaction, this.swapTransaction = n.state.swapTransaction, this.sourceToken = n.state.sourceToken, this.sourceTokenAmount = n.state.sourceTokenAmount ?? "", this.sourceTokenPriceInUSD = n.state.sourceTokenPriceInUSD, this.toToken = n.state.toToken, this.toTokenAmount = n.state.toTokenAmount ?? "", this.toTokenPriceInUSD = n.state.toTokenPriceInUSD, this.caipNetwork = E.state.activeCaipNetwork, this.balanceSymbol = U.state.balanceSymbol, this.inputError = n.state.inputError, this.loadingQuote = n.state.loadingQuote, this.loadingApprovalTransaction = n.state.loadingApprovalTransaction, this.loadingBuildTransaction = n.state.loadingBuildTransaction, this.loadingTransaction = n.state.loadingTransaction, this.unsubscribe.push(U.subscribeKey("balanceSymbol", (e) => {
      this.balanceSymbol !== e && S.goBack();
    }), E.subscribeKey("activeCaipNetwork", (e) => {
      this.caipNetwork !== e && (this.caipNetwork = e);
    }), n.subscribe((e) => {
      this.approvalTransaction = e.approvalTransaction, this.swapTransaction = e.swapTransaction, this.sourceToken = e.sourceToken, this.toToken = e.toToken, this.toTokenPriceInUSD = e.toTokenPriceInUSD, this.sourceTokenAmount = e.sourceTokenAmount ?? "", this.toTokenAmount = e.toTokenAmount ?? "", this.inputError = e.inputError, e.inputError && S.goBack(), this.loadingQuote = e.loadingQuote, this.loadingApprovalTransaction = e.loadingApprovalTransaction, this.loadingBuildTransaction = e.loadingBuildTransaction, this.loadingTransaction = e.loadingTransaction;
    }));
  }
  firstUpdated() {
    n.getTransaction(), this.refreshTransaction();
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((e) => e == null ? void 0 : e()), clearInterval(this.interval);
  }
  render() {
    return c`
      <wui-flex flexDirection="column" .padding=${["0", "l", "l", "l"]} gap="s">
        ${this.templateSwap()}
      </wui-flex>
    `;
  }
  refreshTransaction() {
    this.interval = setInterval(() => {
      n.getApprovalLoadingState() || n.getTransaction();
    }, 1e4);
  }
  templateSwap() {
    var b, I, _, L;
    const e = `${h.formatNumberToLocalString(parseFloat(this.sourceTokenAmount))} ${(b = this.sourceToken) == null ? void 0 : b.symbol}`, t = `${h.formatNumberToLocalString(parseFloat(this.toTokenAmount))} ${(I = this.toToken) == null ? void 0 : I.symbol}`, i = parseFloat(this.sourceTokenAmount) * this.sourceTokenPriceInUSD, s = parseFloat(this.toTokenAmount) * this.toTokenPriceInUSD, o = h.formatNumberToLocalString(i), r = h.formatNumberToLocalString(s), l = this.loadingQuote || this.loadingBuildTransaction || this.loadingTransaction || this.loadingApprovalTransaction;
    return c`
      <wui-flex flexDirection="column" alignItems="center" gap="l">
        <wui-flex class="preview-container" flexDirection="column" alignItems="flex-start" gap="l">
          <wui-flex
            class="preview-token-details-container"
            alignItems="center"
            justifyContent="space-between"
            gap="l"
          >
            <wui-flex flexDirection="column" alignItems="flex-start" gap="4xs">
              <wui-text variant="small-400" color="fg-150">Send</wui-text>
              <wui-text variant="paragraph-400" color="fg-100">$${o}</wui-text>
            </wui-flex>
            <wui-token-button
              flexDirection="row-reverse"
              text=${e}
              imageSrc=${(_ = this.sourceToken) == null ? void 0 : _.logoUri}
            >
            </wui-token-button>
          </wui-flex>
          <wui-icon name="recycleHorizontal" color="fg-200" size="md"></wui-icon>
          <wui-flex
            class="preview-token-details-container"
            alignItems="center"
            justifyContent="space-between"
            gap="l"
          >
            <wui-flex flexDirection="column" alignItems="flex-start" gap="4xs">
              <wui-text variant="small-400" color="fg-150">Receive</wui-text>
              <wui-text variant="paragraph-400" color="fg-100">$${r}</wui-text>
            </wui-flex>
            <wui-token-button
              flexDirection="row-reverse"
              text=${t}
              imageSrc=${(L = this.toToken) == null ? void 0 : L.logoUri}
            >
            </wui-token-button>
          </wui-flex>
        </wui-flex>

        ${this.templateDetails()}

        <wui-flex flexDirection="row" alignItems="center" justifyContent="center" gap="xs">
          <wui-icon size="sm" color="fg-200" name="infoCircle"></wui-icon>
          <wui-text variant="small-400" color="fg-200">Review transaction carefully</wui-text>
        </wui-flex>

        <wui-flex
          class="action-buttons-container"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          gap="xs"
        >
          <wui-button
            class="cancel-button"
            fullWidth
            size="lg"
            borderRadius="xs"
            variant="neutral"
            @click=${this.onCancelTransaction.bind(this)}
          >
            <wui-text variant="paragraph-600" color="fg-200">Cancel</wui-text>
          </wui-button>
          <wui-button
            class="action-button"
            fullWidth
            size="lg"
            borderRadius="xs"
            variant="main"
            ?loading=${l}
            ?disabled=${l}
            @click=${this.onSendTransaction.bind(this)}
          >
            <wui-text variant="paragraph-600" color="inverse-100">
              ${this.actionButtonLabel()}
            </wui-text>
          </wui-button>
        </wui-flex>
      </wui-flex>
    `;
  }
  templateDetails() {
    return !this.sourceToken || !this.toToken || this.inputError ? null : c`<w3m-swap-details .detailsOpen=${this.detailsOpen}></w3m-swap-details>`;
  }
  actionButtonLabel() {
    return this.loadingApprovalTransaction ? "Approving..." : this.approvalTransaction ? "Approve" : "Swap";
  }
  onCancelTransaction() {
    S.goBack();
  }
  onSendTransaction() {
    this.approvalTransaction ? n.sendTransactionForApproval(this.approvalTransaction) : n.sendTransactionForSwap(this.swapTransaction);
  }
};
d.styles = ie;
f([
  a()
], d.prototype, "interval", void 0);
f([
  a()
], d.prototype, "detailsOpen", void 0);
f([
  a()
], d.prototype, "approvalTransaction", void 0);
f([
  a()
], d.prototype, "swapTransaction", void 0);
f([
  a()
], d.prototype, "sourceToken", void 0);
f([
  a()
], d.prototype, "sourceTokenAmount", void 0);
f([
  a()
], d.prototype, "sourceTokenPriceInUSD", void 0);
f([
  a()
], d.prototype, "toToken", void 0);
f([
  a()
], d.prototype, "toTokenAmount", void 0);
f([
  a()
], d.prototype, "toTokenPriceInUSD", void 0);
f([
  a()
], d.prototype, "caipNetwork", void 0);
f([
  a()
], d.prototype, "balanceSymbol", void 0);
f([
  a()
], d.prototype, "inputError", void 0);
f([
  a()
], d.prototype, "loadingQuote", void 0);
f([
  a()
], d.prototype, "loadingApprovalTransaction", void 0);
f([
  a()
], d.prototype, "loadingBuildTransaction", void 0);
f([
  a()
], d.prototype, "loadingTransaction", void 0);
d = f([
  D("w3m-swap-preview-view")
], d);
const oe = A`
  :host {
    height: 60px;
    min-height: 60px;
  }

  :host > wui-flex {
    cursor: pointer;
    height: 100%;
    display: flex;
    column-gap: var(--wui-spacing-s);
    padding: var(--wui-spacing-xs);
    padding-right: var(--wui-spacing-l);
    width: 100%;
    background-color: transparent;
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-250);
    transition:
      background-color var(--wui-ease-out-power-1) var(--wui-duration-lg),
      opacity var(--wui-ease-out-power-1) var(--wui-duration-lg);
    will-change: background-color, opacity;
  }

  @media (hover: hover) and (pointer: fine) {
    :host > wui-flex:hover {
      background-color: var(--wui-color-gray-glass-002);
    }

    :host > wui-flex:active {
      background-color: var(--wui-color-gray-glass-005);
    }
  }

  :host([disabled]) > wui-flex {
    opacity: 0.6;
  }

  :host([disabled]) > wui-flex:hover {
    background-color: transparent;
  }

  :host > wui-flex > wui-flex {
    flex: 1;
  }

  :host > wui-flex > wui-image,
  :host > wui-flex > .token-item-image-placeholder {
    width: 40px;
    max-width: 40px;
    height: 40px;
    border-radius: var(--wui-border-radius-3xl);
    position: relative;
  }

  :host > wui-flex > .token-item-image-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :host > wui-flex > wui-image::after,
  :host > wui-flex > .token-item-image-placeholder::after {
    position: absolute;
    content: '';
    inset: 0;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
    border-radius: var(--wui-border-radius-l);
  }

  button > wui-icon-box[data-variant='square-blue'] {
    border-radius: var(--wui-border-radius-3xs);
    position: relative;
    border: none;
    width: 36px;
    height: 36px;
  }
`;
var C = function(u, e, t, i) {
  var s = arguments.length, o = s < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, t) : i, r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") o = Reflect.decorate(u, e, t, i);
  else for (var l = u.length - 1; l >= 0; l--) (r = u[l]) && (o = (s < 3 ? r(o) : s > 3 ? r(e, t, o) : r(e, t)) || o);
  return s > 3 && o && Object.defineProperty(e, t, o), o;
};
let $ = class extends P {
  constructor() {
    super(), this.observer = new IntersectionObserver(() => {
    }), this.imageSrc = void 0, this.name = void 0, this.symbol = void 0, this.price = void 0, this.amount = void 0, this.visible = !1, this.imageError = !1, this.observer = new IntersectionObserver((e) => {
      e.forEach((t) => {
        t.isIntersecting ? this.visible = !0 : this.visible = !1;
      });
    }, { threshold: 0.1 });
  }
  firstUpdated() {
    this.observer.observe(this);
  }
  disconnectedCallback() {
    this.observer.disconnect();
  }
  render() {
    var t;
    if (!this.visible)
      return null;
    const e = this.amount && this.price ? (t = h.multiply(this.price, this.amount)) == null ? void 0 : t.toFixed(3) : null;
    return c`
      <wui-flex alignItems="center">
        ${this.visualTemplate()}
        <wui-flex flexDirection="column" gap="3xs">
          <wui-flex justifyContent="space-between">
            <wui-text variant="paragraph-500" color="fg-100" lineClamp="1">${this.name}</wui-text>
            ${e ? c`
                  <wui-text variant="paragraph-500" color="fg-100">
                    $${h.formatNumberToLocalString(e, 3)}
                  </wui-text>
                ` : null}
          </wui-flex>
          <wui-flex justifyContent="space-between">
            <wui-text variant="small-400" color="fg-200" lineClamp="1">${this.symbol}</wui-text>
            ${this.amount ? c`<wui-text variant="small-400" color="fg-200">
                  ${h.formatNumberToLocalString(this.amount, 5)}
                </wui-text>` : null}
          </wui-flex>
        </wui-flex>
      </wui-flex>
    `;
  }
  visualTemplate() {
    return this.imageError ? c`<wui-flex class="token-item-image-placeholder">
        <wui-icon name="image" color="inherit"></wui-icon>
      </wui-flex>` : this.imageSrc ? c`<wui-image
        width="40"
        height="40"
        src=${this.imageSrc}
        @onLoadError=${this.imageLoadError}
      ></wui-image>` : null;
  }
  imageLoadError() {
    this.imageError = !0;
  }
};
$.styles = [z, H, oe];
C([
  g()
], $.prototype, "imageSrc", void 0);
C([
  g()
], $.prototype, "name", void 0);
C([
  g()
], $.prototype, "symbol", void 0);
C([
  g()
], $.prototype, "price", void 0);
C([
  g()
], $.prototype, "amount", void 0);
C([
  a()
], $.prototype, "visible", void 0);
C([
  a()
], $.prototype, "imageError", void 0);
$ = C([
  D("wui-token-list-item")
], $);
const ne = A`
  :host > wui-flex:first-child {
    column-gap: var(--wui-spacing-s);
    padding: 7px var(--wui-spacing-l) 7px var(--wui-spacing-xs);
    width: 100%;
  }

  wui-flex {
    display: flex;
    flex: 1;
  }
`;
var se = function(u, e, t, i) {
  var s = arguments.length, o = s < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, t) : i, r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") o = Reflect.decorate(u, e, t, i);
  else for (var l = u.length - 1; l >= 0; l--) (r = u[l]) && (o = (s < 3 ? r(o) : s > 3 ? r(e, t, o) : r(e, t)) || o);
  return s > 3 && o && Object.defineProperty(e, t, o), o;
};
let N = class extends P {
  render() {
    return c`
      <wui-flex alignItems="center">
        <wui-shimmer width="40px" height="40px"></wui-shimmer>
        <wui-flex flexDirection="column" gap="2xs">
          <wui-shimmer width="72px" height="16px" borderRadius="4xs"></wui-shimmer>
          <wui-shimmer width="148px" height="14px" borderRadius="4xs"></wui-shimmer>
        </wui-flex>
        <wui-flex flexDirection="column" gap="2xs" alignItems="flex-end">
          <wui-shimmer width="24px" height="12px" borderRadius="4xs"></wui-shimmer>
          <wui-shimmer width="32px" height="12px" borderRadius="4xs"></wui-shimmer>
        </wui-flex>
      </wui-flex>
    `;
  }
};
N.styles = [z, ne];
N = se([
  D("wui-token-list-item-loader")
], N);
const re = A`
  :host {
    --tokens-scroll--top-opacity: 0;
    --tokens-scroll--bottom-opacity: 1;
    --suggested-tokens-scroll--left-opacity: 0;
    --suggested-tokens-scroll--right-opacity: 1;
  }

  :host > wui-flex:first-child {
    overflow-y: hidden;
    overflow-x: hidden;
    scrollbar-width: none;
    scrollbar-height: none;
  }

  :host > wui-flex:first-child::-webkit-scrollbar {
    display: none;
  }

  wui-loading-hexagon {
    position: absolute;
  }

  .suggested-tokens-container {
    overflow-x: auto;
    mask-image: linear-gradient(
      to right,
      rgba(0, 0, 0, calc(1 - var(--suggested-tokens-scroll--left-opacity))) 0px,
      rgba(200, 200, 200, calc(1 - var(--suggested-tokens-scroll--left-opacity))) 1px,
      black 50px,
      black 90px,
      black calc(100% - 90px),
      black calc(100% - 50px),
      rgba(155, 155, 155, calc(1 - var(--suggested-tokens-scroll--right-opacity))) calc(100% - 1px),
      rgba(0, 0, 0, calc(1 - var(--suggested-tokens-scroll--right-opacity))) 100%
    );
  }

  .suggested-tokens-container::-webkit-scrollbar {
    display: none;
  }

  .tokens-container {
    border-top: 1px solid var(--wui-color-gray-glass-005);
    height: 100%;
    max-height: 390px;
  }

  .tokens {
    width: 100%;
    overflow-y: auto;
    mask-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, calc(1 - var(--tokens-scroll--top-opacity))) 0px,
      rgba(200, 200, 200, calc(1 - var(--tokens-scroll--top-opacity))) 1px,
      black 50px,
      black 90px,
      black calc(100% - 90px),
      black calc(100% - 50px),
      rgba(155, 155, 155, calc(1 - var(--tokens-scroll--bottom-opacity))) calc(100% - 1px),
      rgba(0, 0, 0, calc(1 - var(--tokens-scroll--bottom-opacity))) 100%
    );
  }

  .network-search-input,
  .select-network-button {
    height: 40px;
  }

  .select-network-button {
    border: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: var(--wui-spacing-xs);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
    background-color: transparent;
    border-radius: var(--wui-border-radius-xxs);
    padding: var(--wui-spacing-xs);
    align-items: center;
    transition: background-color 0.2s linear;
  }

  .select-network-button:hover {
    background-color: var(--wui-color-gray-glass-002);
  }

  .select-network-button > wui-image {
    width: 26px;
    height: 26px;
    border-radius: var(--wui-border-radius-xs);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }
`;
var y = function(u, e, t, i) {
  var s = arguments.length, o = s < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, t) : i, r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") o = Reflect.decorate(u, e, t, i);
  else for (var l = u.length - 1; l >= 0; l--) (r = u[l]) && (o = (s < 3 ? r(o) : s > 3 ? r(e, t, o) : r(e, t)) || o);
  return s > 3 && o && Object.defineProperty(e, t, o), o;
};
let k = class extends P {
  constructor() {
    var e;
    super(), this.unsubscribe = [], this.targetToken = (e = S.state.data) == null ? void 0 : e.target, this.sourceToken = n.state.sourceToken, this.sourceTokenAmount = n.state.sourceTokenAmount, this.toToken = n.state.toToken, this.myTokensWithBalance = n.state.myTokensWithBalance, this.popularTokens = n.state.popularTokens, this.suggestedTokens = n.state.suggestedTokens, this.tokensLoading = n.state.tokensLoading, this.searchValue = "", this.unsubscribe.push(n.subscribe((t) => {
      this.sourceToken = t.sourceToken, this.toToken = t.toToken, this.myTokensWithBalance = t.myTokensWithBalance, this.popularTokens = t.popularTokens, this.suggestedTokens = t.suggestedTokens, this.tokensLoading = t.tokensLoading;
    }));
  }
  async firstUpdated() {
    await n.getTokenList();
  }
  updated() {
    var i, s;
    const e = (i = this.renderRoot) == null ? void 0 : i.querySelector(".suggested-tokens-container");
    e == null || e.addEventListener("scroll", this.handleSuggestedTokensScroll.bind(this));
    const t = (s = this.renderRoot) == null ? void 0 : s.querySelector(".tokens");
    t == null || t.addEventListener("scroll", this.handleTokenListScroll.bind(this));
  }
  disconnectedCallback() {
    var i, s;
    super.disconnectedCallback();
    const e = (i = this.renderRoot) == null ? void 0 : i.querySelector(".suggested-tokens-container"), t = (s = this.renderRoot) == null ? void 0 : s.querySelector(".tokens");
    e == null || e.removeEventListener("scroll", this.handleSuggestedTokensScroll.bind(this)), t == null || t.removeEventListener("scroll", this.handleTokenListScroll.bind(this)), clearInterval(this.interval);
  }
  render() {
    return c`
      <wui-flex flexDirection="column" gap="s">
        ${this.templateSearchInput()} ${this.templateSuggestedTokens()} ${this.templateTokens()}
      </wui-flex>
    `;
  }
  onSelectToken(e) {
    this.targetToken === "sourceToken" ? n.setSourceToken(e) : (n.setToToken(e), this.sourceToken && this.sourceTokenAmount && n.swapTokens()), S.goBack();
  }
  templateSearchInput() {
    return c`
      <wui-flex .padding=${["3xs", "s", "0", "s"]} gap="xs">
        <wui-input-text
          data-testid="swap-select-token-search-input"
          class="network-search-input"
          size="sm"
          placeholder="Search token"
          icon="search"
          .value=${this.searchValue}
          @inputChange=${this.onSearchInputChange.bind(this)}
        ></wui-input-text>
      </wui-flex>
    `;
  }
  templateMyTokens() {
    const e = this.myTokensWithBalance ? Object.values(this.myTokensWithBalance) : [], t = this.filterTokensWithText(e, this.searchValue);
    return (t == null ? void 0 : t.length) > 0 ? c`<wui-flex justifyContent="flex-start" padding="s">
          <wui-text variant="paragraph-500" color="fg-200">Your tokens</wui-text>
        </wui-flex>
        ${t.map((i) => {
      var o, r, l;
      const s = i.symbol === ((o = this.sourceToken) == null ? void 0 : o.symbol) || i.symbol === ((r = this.toToken) == null ? void 0 : r.symbol);
      return c`
            <wui-token-list-item
              data-testid="swap-select-token-item-${i.symbol}"
              name=${i.name}
              ?disabled=${s}
              symbol=${i.symbol}
              price=${i == null ? void 0 : i.price}
              amount=${(l = i == null ? void 0 : i.quantity) == null ? void 0 : l.numeric}
              imageSrc=${i.logoUri}
              @click=${() => {
        s || this.onSelectToken(i);
      }}
            >
            </wui-token-list-item>
          `;
    })}` : null;
  }
  templateAllTokens() {
    const e = this.popularTokens ? this.popularTokens : [], t = this.filterTokensWithText(e, this.searchValue);
    return this.tokensLoading ? c`
        <wui-token-list-item-loader></wui-token-list-item-loader>
        <wui-token-list-item-loader></wui-token-list-item-loader>
        <wui-token-list-item-loader></wui-token-list-item-loader>
        <wui-token-list-item-loader></wui-token-list-item-loader>
        <wui-token-list-item-loader></wui-token-list-item-loader>
      ` : (t == null ? void 0 : t.length) > 0 ? c`
        ${t.map((i) => c`
            <wui-token-list-item
              data-testid="swap-select-token-item-${i.symbol}"
              name=${i.name}
              symbol=${i.symbol}
              imageSrc=${i.logoUri}
              @click=${() => this.onSelectToken(i)}
            >
            </wui-token-list-item>
          `)}
      ` : null;
  }
  templateTokens() {
    return c`
      <wui-flex class="tokens-container">
        <wui-flex class="tokens" .padding=${["0", "s", "s", "s"]} flexDirection="column">
          ${this.templateMyTokens()}
          <wui-flex justifyContent="flex-start" padding="s">
            <wui-text variant="paragraph-500" color="fg-200">Tokens</wui-text>
          </wui-flex>
          ${this.templateAllTokens()}
        </wui-flex>
      </wui-flex>
    `;
  }
  templateSuggestedTokens() {
    const e = this.suggestedTokens ? this.suggestedTokens.slice(0, 8) : null;
    return this.tokensLoading ? c`
        <wui-flex class="suggested-tokens-container" .padding=${["0", "s", "0", "s"]} gap="xs">
          <wui-token-button loading></wui-token-button>
          <wui-token-button loading></wui-token-button>
          <wui-token-button loading></wui-token-button>
          <wui-token-button loading></wui-token-button>
          <wui-token-button loading></wui-token-button>
        </wui-flex>
      ` : e ? c`
      <wui-flex class="suggested-tokens-container" .padding=${["0", "s", "0", "s"]} gap="xs">
        ${e.map((t) => c`
            <wui-token-button
              text=${t.symbol}
              imageSrc=${t.logoUri}
              @click=${() => this.onSelectToken(t)}
            >
            </wui-token-button>
          `)}
      </wui-flex>
    ` : null;
  }
  onSearchInputChange(e) {
    this.searchValue = e.detail;
  }
  handleSuggestedTokensScroll() {
    var t;
    const e = (t = this.renderRoot) == null ? void 0 : t.querySelector(".suggested-tokens-container");
    e && (e.style.setProperty("--suggested-tokens-scroll--left-opacity", j.interpolate([0, 100], [0, 1], e.scrollLeft).toString()), e.style.setProperty("--suggested-tokens-scroll--right-opacity", j.interpolate([0, 100], [0, 1], e.scrollWidth - e.scrollLeft - e.offsetWidth).toString()));
  }
  handleTokenListScroll() {
    var t;
    const e = (t = this.renderRoot) == null ? void 0 : t.querySelector(".tokens");
    e && (e.style.setProperty("--tokens-scroll--top-opacity", j.interpolate([0, 100], [0, 1], e.scrollTop).toString()), e.style.setProperty("--tokens-scroll--bottom-opacity", j.interpolate([0, 100], [0, 1], e.scrollHeight - e.scrollTop - e.offsetHeight).toString()));
  }
  filterTokensWithText(e, t) {
    return e.filter((i) => `${i.symbol} ${i.name} ${i.address}`.toLowerCase().includes(t.toLowerCase())).sort((i, s) => {
      const o = `${i.symbol} ${i.name} ${i.address}`.toLowerCase(), r = `${s.symbol} ${s.name} ${s.address}`.toLowerCase(), l = o.indexOf(t.toLowerCase()), b = r.indexOf(t.toLowerCase());
      return l - b;
    });
  }
};
k.styles = re;
y([
  a()
], k.prototype, "interval", void 0);
y([
  a()
], k.prototype, "targetToken", void 0);
y([
  a()
], k.prototype, "sourceToken", void 0);
y([
  a()
], k.prototype, "sourceTokenAmount", void 0);
y([
  a()
], k.prototype, "toToken", void 0);
y([
  a()
], k.prototype, "myTokensWithBalance", void 0);
y([
  a()
], k.prototype, "popularTokens", void 0);
y([
  a()
], k.prototype, "suggestedTokens", void 0);
y([
  a()
], k.prototype, "tokensLoading", void 0);
y([
  a()
], k.prototype, "searchValue", void 0);
k = y([
  D("w3m-swap-select-token-view")
], k);
export {
  d as W3mSwapPreviewView,
  k as W3mSwapSelectTokenView,
  p as W3mSwapView
};
