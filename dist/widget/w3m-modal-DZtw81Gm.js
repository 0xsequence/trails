import { M as p, $ as ee, R as l, i as v, r as D, a as y, o as P, j as le, X as ce, e as h, u as L, J as de, p as U, f as G, O as E, C as H, A as q, S as W, G as R, T as ue, a0 as pe, d as F, c as he } from "./index-CQJlV2Ao.js";
import { x as c } from "./lit-html-jz-94mx9.js";
import { c as f, n as u, r as d, o as z, U as we } from "./if-defined-BehxAGoH.js";
import "./index-BfJj-yYa.js";
import "./index-jyaR1S1w.js";
import "./index-CATyM6Hm.js";
import "./index-2pMfj8U1.js";
import "./index-D7rEWOlI.js";
import "./index-Bghas6Q9.js";
import "./index-DUSWTkRI.js";
const te = {
  isUnsupportedChainView() {
    return l.state.view === "UnsupportedChain" || l.state.view === "SwitchNetwork" && l.state.history.includes("UnsupportedChain");
  },
  async safeClose() {
    if (this.isUnsupportedChainView()) {
      p.shake();
      return;
    }
    if (await ee.isSIWXCloseDisabled()) {
      p.shake();
      return;
    }
    p.close();
  }
}, me = v`
  :host {
    display: block;
    border-radius: clamp(0px, var(--wui-border-radius-l), 44px);
    box-shadow: 0 0 0 1px var(--wui-color-gray-glass-005);
    background-color: var(--wui-color-modal-bg);
    overflow: hidden;
  }

  :host([data-embedded='true']) {
    box-shadow:
      0 0 0 1px var(--wui-color-gray-glass-005),
      0px 4px 12px 4px var(--w3m-card-embedded-shadow-color);
  }
`;
var fe = function(s, e, t, i) {
  var a = arguments.length, o = a < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, t) : i, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") o = Reflect.decorate(s, e, t, i);
  else for (var r = s.length - 1; r >= 0; r--) (n = s[r]) && (o = (a < 3 ? n(o) : a > 3 ? n(e, t, o) : n(e, t)) || o);
  return a > 3 && o && Object.defineProperty(e, t, o), o;
};
let M = class extends y {
  render() {
    return c`<slot></slot>`;
  }
};
M.styles = [D, me];
M = fe([
  f("wui-card")
], M);
const be = v`
  :host {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--wui-spacing-s);
    border-radius: var(--wui-border-radius-s);
    border: 1px solid var(--wui-color-dark-glass-100);
    box-sizing: border-box;
    background-color: var(--wui-color-bg-325);
    box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.25);
  }

  wui-flex {
    width: 100%;
  }

  wui-text {
    word-break: break-word;
    flex: 1;
  }

  .close {
    cursor: pointer;
  }

  .icon-box {
    height: 40px;
    width: 40px;
    border-radius: var(--wui-border-radius-3xs);
    background-color: var(--local-icon-bg-value);
  }
`;
var N = function(s, e, t, i) {
  var a = arguments.length, o = a < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, t) : i, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") o = Reflect.decorate(s, e, t, i);
  else for (var r = s.length - 1; r >= 0; r--) (n = s[r]) && (o = (a < 3 ? n(o) : a > 3 ? n(e, t, o) : n(e, t)) || o);
  return a > 3 && o && Object.defineProperty(e, t, o), o;
};
let k = class extends y {
  constructor() {
    super(...arguments), this.message = "", this.backgroundColor = "accent-100", this.iconColor = "accent-100", this.icon = "info";
  }
  render() {
    return this.style.cssText = `
      --local-icon-bg-value: var(--wui-color-${this.backgroundColor});
   `, c`
      <wui-flex flexDirection="row" justifyContent="space-between" alignItems="center">
        <wui-flex columnGap="xs" flexDirection="row" alignItems="center">
          <wui-flex
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            class="icon-box"
          >
            <wui-icon color=${this.iconColor} size="md" name=${this.icon}></wui-icon>
          </wui-flex>
          <wui-text variant="small-500" color="bg-350" data-testid="wui-alertbar-text"
            >${this.message}</wui-text
          >
        </wui-flex>
        <wui-icon
          class="close"
          color="bg-350"
          size="sm"
          name="close"
          @click=${this.onClose}
        ></wui-icon>
      </wui-flex>
    `;
  }
  onClose() {
    P.close();
  }
};
k.styles = [D, be];
N([
  u()
], k.prototype, "message", void 0);
N([
  u()
], k.prototype, "backgroundColor", void 0);
N([
  u()
], k.prototype, "iconColor", void 0);
N([
  u()
], k.prototype, "icon", void 0);
k = N([
  f("wui-alertbar")
], k);
const ge = v`
  :host {
    display: block;
    position: absolute;
    top: var(--wui-spacing-s);
    left: var(--wui-spacing-l);
    right: var(--wui-spacing-l);
    opacity: 0;
    pointer-events: none;
  }
`;
var oe = function(s, e, t, i) {
  var a = arguments.length, o = a < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, t) : i, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") o = Reflect.decorate(s, e, t, i);
  else for (var r = s.length - 1; r >= 0; r--) (n = s[r]) && (o = (a < 3 ? n(o) : a > 3 ? n(e, t, o) : n(e, t)) || o);
  return a > 3 && o && Object.defineProperty(e, t, o), o;
};
const ve = {
  info: {
    backgroundColor: "fg-350",
    iconColor: "fg-325",
    icon: "info"
  },
  success: {
    backgroundColor: "success-glass-reown-020",
    iconColor: "success-125",
    icon: "checkmark"
  },
  warning: {
    backgroundColor: "warning-glass-reown-020",
    iconColor: "warning-100",
    icon: "warningCircle"
  },
  error: {
    backgroundColor: "error-glass-reown-020",
    iconColor: "error-125",
    icon: "exclamationTriangle"
  }
};
let _ = class extends y {
  constructor() {
    super(), this.unsubscribe = [], this.open = P.state.open, this.onOpen(!0), this.unsubscribe.push(P.subscribeKey("open", (e) => {
      this.open = e, this.onOpen(!1);
    }));
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((e) => e());
  }
  render() {
    const { message: e, variant: t } = P.state, i = ve[t];
    return c`
      <wui-alertbar
        message=${e}
        backgroundColor=${i == null ? void 0 : i.backgroundColor}
        iconColor=${i == null ? void 0 : i.iconColor}
        icon=${i == null ? void 0 : i.icon}
      ></wui-alertbar>
    `;
  }
  onOpen(e) {
    this.open ? (this.animate([
      { opacity: 0, transform: "scale(0.85)" },
      { opacity: 1, transform: "scale(1)" }
    ], {
      duration: 150,
      fill: "forwards",
      easing: "ease"
    }), this.style.cssText = "pointer-events: auto") : e || (this.animate([
      { opacity: 1, transform: "scale(1)" },
      { opacity: 0, transform: "scale(0.85)" }
    ], {
      duration: 150,
      fill: "forwards",
      easing: "ease"
    }), this.style.cssText = "pointer-events: none");
  }
};
_.styles = ge;
oe([
  d()
], _.prototype, "open", void 0);
_ = oe([
  f("w3m-alertbar")
], _);
const ye = v`
  button {
    display: block;
    display: flex;
    align-items: center;
    padding: var(--wui-spacing-xxs);
    gap: var(--wui-spacing-xxs);
    transition: all var(--wui-ease-out-power-1) var(--wui-duration-md);
    border-radius: var(--wui-border-radius-xxs);
  }

  wui-image {
    border-radius: 100%;
    width: var(--wui-spacing-xl);
    height: var(--wui-spacing-xl);
  }

  wui-icon-box {
    width: var(--wui-spacing-xl);
    height: var(--wui-spacing-xl);
  }

  button:hover {
    background-color: var(--wui-color-gray-glass-002);
  }

  button:active {
    background-color: var(--wui-color-gray-glass-005);
  }
`;
var ie = function(s, e, t, i) {
  var a = arguments.length, o = a < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, t) : i, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") o = Reflect.decorate(s, e, t, i);
  else for (var r = s.length - 1; r >= 0; r--) (n = s[r]) && (o = (a < 3 ? n(o) : a > 3 ? n(e, t, o) : n(e, t)) || o);
  return a > 3 && o && Object.defineProperty(e, t, o), o;
};
let B = class extends y {
  constructor() {
    super(...arguments), this.imageSrc = "";
  }
  render() {
    return c`<button>
      ${this.imageTemplate()}
      <wui-icon size="xs" color="fg-200" name="chevronBottom"></wui-icon>
    </button>`;
  }
  imageTemplate() {
    return this.imageSrc ? c`<wui-image src=${this.imageSrc} alt="select visual"></wui-image>` : c`<wui-icon-box
      size="xxs"
      iconColor="fg-200"
      backgroundColor="fg-100"
      background="opaque"
      icon="networkPlaceholder"
    ></wui-icon-box>`;
  }
};
B.styles = [D, le, ce, ye];
ie([
  u()
], B.prototype, "imageSrc", void 0);
B = ie([
  f("wui-select")
], B);
const Ce = v`
  :host {
    height: 64px;
  }

  wui-text {
    text-transform: capitalize;
  }

  wui-flex.w3m-header-title {
    transform: translateY(0);
    opacity: 1;
  }

  wui-flex.w3m-header-title[view-direction='prev'] {
    animation:
      slide-down-out 120ms forwards var(--wui-ease-out-power-2),
      slide-down-in 120ms forwards var(--wui-ease-out-power-2);
    animation-delay: 0ms, 200ms;
  }

  wui-flex.w3m-header-title[view-direction='next'] {
    animation:
      slide-up-out 120ms forwards var(--wui-ease-out-power-2),
      slide-up-in 120ms forwards var(--wui-ease-out-power-2);
    animation-delay: 0ms, 200ms;
  }

  wui-icon-link[data-hidden='true'] {
    opacity: 0 !important;
    pointer-events: none;
  }

  @keyframes slide-up-out {
    from {
      transform: translateY(0px);
      opacity: 1;
    }
    to {
      transform: translateY(3px);
      opacity: 0;
    }
  }

  @keyframes slide-up-in {
    from {
      transform: translateY(-3px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slide-down-out {
    from {
      transform: translateY(0px);
      opacity: 1;
    }
    to {
      transform: translateY(-3px);
      opacity: 0;
    }
  }

  @keyframes slide-down-in {
    from {
      transform: translateY(3px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;
var b = function(s, e, t, i) {
  var a = arguments.length, o = a < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, t) : i, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") o = Reflect.decorate(s, e, t, i);
  else for (var r = s.length - 1; r >= 0; r--) (n = s[r]) && (o = (a < 3 ? n(o) : a > 3 ? n(e, t, o) : n(e, t)) || o);
  return a > 3 && o && Object.defineProperty(e, t, o), o;
};
const xe = ["SmartSessionList"];
function K() {
  var n, r, $, x, T, I, O;
  const s = (r = (n = l.state.data) == null ? void 0 : n.connector) == null ? void 0 : r.name, e = (x = ($ = l.state.data) == null ? void 0 : $.wallet) == null ? void 0 : x.name, t = (I = (T = l.state.data) == null ? void 0 : T.network) == null ? void 0 : I.name, i = e ?? s, a = H.getConnectors();
  return {
    Connect: `Connect ${a.length === 1 && ((O = a[0]) == null ? void 0 : O.id) === "w3m-email" ? "Email" : ""} Wallet`,
    Create: "Create Wallet",
    ChooseAccountName: void 0,
    Account: void 0,
    AccountSettings: void 0,
    AllWallets: "All Wallets",
    ApproveTransaction: "Approve Transaction",
    BuyInProgress: "Buy",
    ConnectingExternal: i ?? "Connect Wallet",
    ConnectingWalletConnect: i ?? "WalletConnect",
    ConnectingWalletConnectBasic: "WalletConnect",
    ConnectingSiwe: "Sign In",
    Convert: "Convert",
    ConvertSelectToken: "Select token",
    ConvertPreview: "Preview convert",
    Downloads: i ? `Get ${i}` : "Downloads",
    EmailLogin: "Email Login",
    EmailVerifyOtp: "Confirm Email",
    EmailVerifyDevice: "Register Device",
    GetWallet: "Get a wallet",
    Networks: "Choose Network",
    OnRampProviders: "Choose Provider",
    OnRampActivity: "Activity",
    OnRampTokenSelect: "Select Token",
    OnRampFiatSelect: "Select Currency",
    Pay: "How you pay",
    ProfileWallets: "Wallets",
    SwitchNetwork: t ?? "Switch Network",
    Transactions: "Activity",
    UnsupportedChain: "Switch Network",
    UpgradeEmailWallet: "Upgrade your Wallet",
    UpdateEmailWallet: "Edit Email",
    UpdateEmailPrimaryOtp: "Confirm Current Email",
    UpdateEmailSecondaryOtp: "Confirm New Email",
    WhatIsABuy: "What is Buy?",
    RegisterAccountName: "Choose name",
    RegisterAccountNameSuccess: "",
    WalletReceive: "Receive",
    WalletCompatibleNetworks: "Compatible Networks",
    Swap: "Swap",
    SwapSelectToken: "Select token",
    SwapPreview: "Preview swap",
    WalletSend: "Send",
    WalletSendPreview: "Review send",
    WalletSendSelectToken: "Select Token",
    WhatIsANetwork: "What is a network?",
    WhatIsAWallet: "What is a wallet?",
    ConnectWallets: "Connect wallet",
    ConnectSocials: "All socials",
    ConnectingSocial: q.state.socialProvider ? q.state.socialProvider : "Connect Social",
    ConnectingMultiChain: "Select chain",
    ConnectingFarcaster: "Farcaster",
    SwitchActiveChain: "Switch chain",
    SmartSessionCreated: void 0,
    SmartSessionList: "Smart Sessions",
    SIWXSignMessage: "Sign In",
    PayLoading: "Payment in progress"
  };
}
let w = class extends y {
  constructor() {
    super(), this.unsubscribe = [], this.heading = K()[l.state.view], this.network = h.state.activeCaipNetwork, this.networkImage = L.getNetworkImage(this.network), this.showBack = !1, this.prevHistoryLength = 1, this.view = l.state.view, this.viewDirection = "", this.headerText = K()[l.state.view], this.unsubscribe.push(de.subscribeNetworkImages(() => {
      this.networkImage = L.getNetworkImage(this.network);
    }), l.subscribeKey("view", (e) => {
      setTimeout(() => {
        this.view = e, this.headerText = K()[e];
      }, U.ANIMATION_DURATIONS.HeaderText), this.onViewChange(), this.onHistoryChange();
    }), h.subscribeKey("activeCaipNetwork", (e) => {
      this.network = e, this.networkImage = L.getNetworkImage(this.network);
    }));
  }
  disconnectCallback() {
    this.unsubscribe.forEach((e) => e());
  }
  render() {
    return c`
      <wui-flex .padding=${this.getPadding()} justifyContent="space-between" alignItems="center">
        ${this.leftHeaderTemplate()} ${this.titleTemplate()} ${this.rightHeaderTemplate()}
      </wui-flex>
    `;
  }
  onWalletHelp() {
    G.sendEvent({ type: "track", event: "CLICK_WALLET_HELP" }), l.push("WhatIsAWallet");
  }
  async onClose() {
    await te.safeClose();
  }
  rightHeaderTemplate() {
    var t, i, a;
    const e = (a = (i = (t = E) == null ? void 0 : t.state) == null ? void 0 : i.features) == null ? void 0 : a.smartSessions;
    return l.state.view !== "Account" || !e ? this.closeButtonTemplate() : c`<wui-flex>
      <wui-icon-link
        icon="clock"
        @click=${() => l.push("SmartSessionList")}
        data-testid="w3m-header-smart-sessions"
      ></wui-icon-link>
      ${this.closeButtonTemplate()}
    </wui-flex> `;
  }
  closeButtonTemplate() {
    return c`
      <wui-icon-link
        icon="close"
        @click=${this.onClose.bind(this)}
        data-testid="w3m-header-close"
      ></wui-icon-link>
    `;
  }
  titleTemplate() {
    const e = xe.includes(this.view);
    return c`
      <wui-flex
        view-direction="${this.viewDirection}"
        class="w3m-header-title"
        alignItems="center"
        gap="xs"
      >
        <wui-text variant="paragraph-700" color="fg-100" data-testid="w3m-header-text"
          >${this.headerText}</wui-text
        >
        ${e ? c`<wui-tag variant="main">Beta</wui-tag>` : null}
      </wui-flex>
    `;
  }
  leftHeaderTemplate() {
    var x;
    const { view: e } = l.state, t = e === "Connect", i = E.state.enableEmbedded, a = e === "ApproveTransaction", o = e === "ConnectingSiwe", n = e === "Account", r = E.state.enableNetworkSwitch, $ = a || o || t && i;
    return n && r ? c`<wui-select
        id="dynamic"
        data-testid="w3m-account-select-network"
        active-network=${z((x = this.network) == null ? void 0 : x.name)}
        @click=${this.onNetworks.bind(this)}
        imageSrc=${z(this.networkImage)}
      ></wui-select>` : this.showBack && !$ ? c`<wui-icon-link
        data-testid="header-back"
        id="dynamic"
        icon="chevronLeft"
        @click=${this.onGoBack.bind(this)}
      ></wui-icon-link>` : c`<wui-icon-link
      data-hidden=${!t}
      id="dynamic"
      icon="helpCircle"
      @click=${this.onWalletHelp.bind(this)}
    ></wui-icon-link>`;
  }
  onNetworks() {
    this.isAllowedNetworkSwitch() && (G.sendEvent({ type: "track", event: "CLICK_NETWORKS" }), l.push("Networks"));
  }
  isAllowedNetworkSwitch() {
    const e = h.getAllRequestedCaipNetworks(), t = e ? e.length > 1 : !1, i = e == null ? void 0 : e.find(({ id: a }) => {
      var o;
      return a === ((o = this.network) == null ? void 0 : o.id);
    });
    return t || !i;
  }
  getPadding() {
    return this.heading ? ["l", "2l", "l", "2l"] : ["0", "2l", "0", "2l"];
  }
  onViewChange() {
    const { history: e } = l.state;
    let t = U.VIEW_DIRECTION.Next;
    e.length < this.prevHistoryLength && (t = U.VIEW_DIRECTION.Prev), this.prevHistoryLength = e.length, this.viewDirection = t;
  }
  async onHistoryChange() {
    var i;
    const { history: e } = l.state, t = (i = this.shadowRoot) == null ? void 0 : i.querySelector("#dynamic");
    e.length > 1 && !this.showBack && t ? (await t.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: 200,
      fill: "forwards",
      easing: "ease"
    }).finished, this.showBack = !0, t.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: 200,
      fill: "forwards",
      easing: "ease"
    })) : e.length <= 1 && this.showBack && t && (await t.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: 200,
      fill: "forwards",
      easing: "ease"
    }).finished, this.showBack = !1, t.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: 200,
      fill: "forwards",
      easing: "ease"
    }));
  }
  onGoBack() {
    l.goBack();
  }
};
w.styles = Ce;
b([
  d()
], w.prototype, "heading", void 0);
b([
  d()
], w.prototype, "network", void 0);
b([
  d()
], w.prototype, "networkImage", void 0);
b([
  d()
], w.prototype, "showBack", void 0);
b([
  d()
], w.prototype, "prevHistoryLength", void 0);
b([
  d()
], w.prototype, "view", void 0);
b([
  d()
], w.prototype, "viewDirection", void 0);
b([
  d()
], w.prototype, "headerText", void 0);
w = b([
  f("w3m-header")
], w);
const ke = v`
  :host {
    display: flex;
    column-gap: var(--wui-spacing-s);
    align-items: center;
    padding: var(--wui-spacing-xs) var(--wui-spacing-m) var(--wui-spacing-xs) var(--wui-spacing-xs);
    border-radius: var(--wui-border-radius-s);
    border: 1px solid var(--wui-color-gray-glass-005);
    box-sizing: border-box;
    background-color: var(--wui-color-bg-175);
    box-shadow:
      0px 14px 64px -4px rgba(0, 0, 0, 0.15),
      0px 8px 22px -6px rgba(0, 0, 0, 0.15);

    max-width: 300px;
  }

  :host wui-loading-spinner {
    margin-left: var(--wui-spacing-3xs);
  }
`;
var S = function(s, e, t, i) {
  var a = arguments.length, o = a < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, t) : i, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") o = Reflect.decorate(s, e, t, i);
  else for (var r = s.length - 1; r >= 0; r--) (n = s[r]) && (o = (a < 3 ? n(o) : a > 3 ? n(e, t, o) : n(e, t)) || o);
  return a > 3 && o && Object.defineProperty(e, t, o), o;
};
let m = class extends y {
  constructor() {
    super(...arguments), this.backgroundColor = "accent-100", this.iconColor = "accent-100", this.icon = "checkmark", this.message = "", this.loading = !1, this.iconType = "default";
  }
  render() {
    return c`
      ${this.templateIcon()}
      <wui-text variant="paragraph-500" color="fg-100" data-testid="wui-snackbar-message"
        >${this.message}</wui-text
      >
    `;
  }
  templateIcon() {
    return this.loading ? c`<wui-loading-spinner size="md" color="accent-100"></wui-loading-spinner>` : this.iconType === "default" ? c`<wui-icon size="xl" color=${this.iconColor} name=${this.icon}></wui-icon>` : c`<wui-icon-box
      size="sm"
      iconSize="xs"
      iconColor=${this.iconColor}
      backgroundColor=${this.backgroundColor}
      icon=${this.icon}
      background="opaque"
    ></wui-icon-box>`;
  }
};
m.styles = [D, ke];
S([
  u()
], m.prototype, "backgroundColor", void 0);
S([
  u()
], m.prototype, "iconColor", void 0);
S([
  u()
], m.prototype, "icon", void 0);
S([
  u()
], m.prototype, "message", void 0);
S([
  u()
], m.prototype, "loading", void 0);
S([
  u()
], m.prototype, "iconType", void 0);
m = S([
  f("wui-snackbar")
], m);
const Se = v`
  :host {
    display: block;
    position: absolute;
    opacity: 0;
    pointer-events: none;
    top: 11px;
    left: 50%;
    width: max-content;
  }
`;
var ae = function(s, e, t, i) {
  var a = arguments.length, o = a < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, t) : i, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") o = Reflect.decorate(s, e, t, i);
  else for (var r = s.length - 1; r >= 0; r--) (n = s[r]) && (o = (a < 3 ? n(o) : a > 3 ? n(e, t, o) : n(e, t)) || o);
  return a > 3 && o && Object.defineProperty(e, t, o), o;
};
const We = {
  loading: void 0,
  success: {
    backgroundColor: "success-100",
    iconColor: "success-100",
    icon: "checkmark"
  },
  error: {
    backgroundColor: "error-100",
    iconColor: "error-100",
    icon: "close"
  }
};
let j = class extends y {
  constructor() {
    super(), this.unsubscribe = [], this.timeout = void 0, this.open = W.state.open, this.unsubscribe.push(W.subscribeKey("open", (e) => {
      this.open = e, this.onOpen();
    }));
  }
  disconnectedCallback() {
    clearTimeout(this.timeout), this.unsubscribe.forEach((e) => e());
  }
  render() {
    const { message: e, variant: t, svg: i } = W.state, a = We[t], { icon: o, iconColor: n } = i ?? a ?? {};
    return c`
      <wui-snackbar
        message=${e}
        backgroundColor=${a == null ? void 0 : a.backgroundColor}
        iconColor=${n}
        icon=${o}
        .loading=${t === "loading"}
      ></wui-snackbar>
    `;
  }
  onOpen() {
    clearTimeout(this.timeout), this.open ? (this.animate([
      { opacity: 0, transform: "translateX(-50%) scale(0.85)" },
      { opacity: 1, transform: "translateX(-50%) scale(1)" }
    ], {
      duration: 150,
      fill: "forwards",
      easing: "ease"
    }), this.timeout && clearTimeout(this.timeout), W.state.autoClose && (this.timeout = setTimeout(() => W.hide(), 2500))) : this.animate([
      { opacity: 1, transform: "translateX(-50%) scale(1)" },
      { opacity: 0, transform: "translateX(-50%) scale(0.85)" }
    ], {
      duration: 150,
      fill: "forwards",
      easing: "ease"
    });
  }
};
j.styles = Se;
ae([
  d()
], j.prototype, "open", void 0);
j = ae([
  f("w3m-snackbar")
], j);
const $e = v`
  :host {
    z-index: var(--w3m-z-index);
    display: block;
    backface-visibility: hidden;
    will-change: opacity;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    opacity: 0;
    background-color: var(--wui-cover);
    transition: opacity 0.2s var(--wui-ease-out-power-2);
    will-change: opacity;
  }

  :host(.open) {
    opacity: 1;
  }

  :host(.appkit-modal) {
    position: relative;
    pointer-events: unset;
    background: none;
    width: 100%;
    opacity: 1;
  }

  wui-card {
    max-width: var(--w3m-modal-width);
    width: 100%;
    position: relative;
    animation: zoom-in 0.2s var(--wui-ease-out-power-2);
    animation-fill-mode: backwards;
    outline: none;
    transition:
      border-radius var(--wui-duration-lg) var(--wui-ease-out-power-1),
      background-color var(--wui-duration-lg) var(--wui-ease-out-power-1);
    will-change: border-radius, background-color;
  }

  :host(.appkit-modal) wui-card {
    max-width: 400px;
  }

  wui-card[shake='true'] {
    animation:
      zoom-in 0.2s var(--wui-ease-out-power-2),
      w3m-shake 0.5s var(--wui-ease-out-power-2);
  }

  wui-flex {
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  @media (max-height: 700px) and (min-width: 431px) {
    wui-flex {
      align-items: flex-start;
    }

    wui-card {
      margin: var(--wui-spacing-xxl) 0px;
    }
  }

  @media (max-width: 430px) {
    wui-flex {
      align-items: flex-end;
    }

    wui-card {
      max-width: 100%;
      border-bottom-left-radius: var(--local-border-bottom-mobile-radius);
      border-bottom-right-radius: var(--local-border-bottom-mobile-radius);
      border-bottom: none;
      animation: slide-in 0.2s var(--wui-ease-out-power-2);
    }

    wui-card[shake='true'] {
      animation:
        slide-in 0.2s var(--wui-ease-out-power-2),
        w3m-shake 0.5s var(--wui-ease-out-power-2);
    }
  }

  @keyframes zoom-in {
    0% {
      transform: scale(0.95) translateY(0);
    }
    100% {
      transform: scale(1) translateY(0);
    }
  }

  @keyframes slide-in {
    0% {
      transform: scale(1) translateY(50px);
    }
    100% {
      transform: scale(1) translateY(0);
    }
  }

  @keyframes w3m-shake {
    0% {
      transform: scale(1) rotate(0deg);
    }
    20% {
      transform: scale(1) rotate(-1deg);
    }
    40% {
      transform: scale(1) rotate(1.5deg);
    }
    60% {
      transform: scale(1) rotate(-1.5deg);
    }
    80% {
      transform: scale(1) rotate(1deg);
    }
    100% {
      transform: scale(1) rotate(0deg);
    }
  }

  @keyframes w3m-view-height {
    from {
      height: var(--prev-height);
    }
    to {
      height: var(--new-height);
    }
  }
`;
var C = function(s, e, t, i) {
  var a = arguments.length, o = a < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, t) : i, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") o = Reflect.decorate(s, e, t, i);
  else for (var r = s.length - 1; r >= 0; r--) (n = s[r]) && (o = (a < 3 ? n(o) : a > 3 ? n(e, t, o) : n(e, t)) || o);
  return a > 3 && o && Object.defineProperty(e, t, o), o;
};
const J = "scroll-lock";
class g extends y {
  constructor() {
    super(), this.unsubscribe = [], this.abortController = void 0, this.hasPrefetched = !1, this.enableEmbedded = E.state.enableEmbedded, this.open = p.state.open, this.caipAddress = h.state.activeCaipAddress, this.caipNetwork = h.state.activeCaipNetwork, this.shake = p.state.shake, this.filterByNamespace = H.state.filterByNamespace, this.initializeTheming(), R.prefetchAnalyticsConfig(), this.unsubscribe.push(p.subscribeKey("open", (e) => e ? this.onOpen() : this.onClose()), p.subscribeKey("shake", (e) => this.shake = e), h.subscribeKey("activeCaipNetwork", (e) => this.onNewNetwork(e)), h.subscribeKey("activeCaipAddress", (e) => this.onNewAddress(e)), E.subscribeKey("enableEmbedded", (e) => this.enableEmbedded = e), H.subscribeKey("filterByNamespace", (e) => {
      var t;
      this.filterByNamespace !== e && !((t = h.getAccountData(e)) != null && t.caipAddress) && (R.fetchRecommendedWallets(), this.filterByNamespace = e);
    }));
  }
  firstUpdated() {
    if (this.caipAddress) {
      if (this.enableEmbedded) {
        p.close(), this.prefetch();
        return;
      }
      this.onNewAddress(this.caipAddress);
    }
    this.open && this.onOpen(), this.enableEmbedded && this.prefetch();
  }
  disconnectedCallback() {
    this.unsubscribe.forEach((e) => e()), this.onRemoveKeyboardListener();
  }
  render() {
    return this.style.cssText = `
      --local-border-bottom-mobile-radius: ${this.enableEmbedded ? "clamp(0px, var(--wui-border-radius-l), 44px)" : "0px"};
    `, this.enableEmbedded ? c`${this.contentTemplate()}
        <w3m-tooltip></w3m-tooltip> ` : this.open ? c`
          <wui-flex @click=${this.onOverlayClick.bind(this)} data-testid="w3m-modal-overlay">
            ${this.contentTemplate()}
          </wui-flex>
          <w3m-tooltip></w3m-tooltip>
        ` : null;
  }
  contentTemplate() {
    return c` <wui-card
      shake="${this.shake}"
      data-embedded="${z(this.enableEmbedded)}"
      role="alertdialog"
      aria-modal="true"
      tabindex="0"
      data-testid="w3m-modal-card"
    >
      <w3m-header></w3m-header>
      <w3m-router></w3m-router>
      <w3m-snackbar></w3m-snackbar>
      <w3m-alertbar></w3m-alertbar>
    </wui-card>`;
  }
  async onOverlayClick(e) {
    e.target === e.currentTarget && await this.handleClose();
  }
  async handleClose() {
    await te.safeClose();
  }
  initializeTheming() {
    const { themeVariables: e, themeMode: t } = ue.state, i = we.getColorTheme(t);
    pe(e, i);
  }
  onClose() {
    this.open = !1, this.classList.remove("open"), this.onScrollUnlock(), W.hide(), this.onRemoveKeyboardListener();
  }
  onOpen() {
    this.open = !0, this.classList.add("open"), this.onScrollLock(), this.onAddKeyboardListener();
  }
  onScrollLock() {
    const e = document.createElement("style");
    e.dataset.w3m = J, e.textContent = `
      body {
        touch-action: none;
        overflow: hidden;
        overscroll-behavior: contain;
      }
      w3m-modal {
        pointer-events: auto;
      }
    `, document.head.appendChild(e);
  }
  onScrollUnlock() {
    const e = document.head.querySelector(`style[data-w3m="${J}"]`);
    e && e.remove();
  }
  onAddKeyboardListener() {
    var t;
    this.abortController = new AbortController();
    const e = (t = this.shadowRoot) == null ? void 0 : t.querySelector("wui-card");
    e == null || e.focus(), window.addEventListener("keydown", (i) => {
      if (i.key === "Escape")
        this.handleClose();
      else if (i.key === "Tab") {
        const { tagName: a } = i.target;
        a && !a.includes("W3M-") && !a.includes("WUI-") && (e == null || e.focus());
      }
    }, this.abortController);
  }
  onRemoveKeyboardListener() {
    var e;
    (e = this.abortController) == null || e.abort(), this.abortController = void 0;
  }
  async onNewAddress(e) {
    const t = h.state.isSwitchingNamespace, i = !F.getPlainAddress(this.caipAddress), a = F.getPlainAddress(e), o = !a && !t, n = t && a;
    l.state.view === "ProfileWallets" || (o && !this.enableEmbedded ? p.close() : n && !this.enableEmbedded ? l.goBack() : this.enableEmbedded && i && a && p.close()), await ee.initializeIfEnabled(), this.caipAddress = e, h.setIsSwitchingNamespace(!1);
  }
  onNewNetwork(e) {
    var V, Y, X;
    const t = this.caipNetwork, i = (V = t == null ? void 0 : t.caipNetworkId) == null ? void 0 : V.toString(), a = t == null ? void 0 : t.chainNamespace, o = (Y = e == null ? void 0 : e.caipNetworkId) == null ? void 0 : Y.toString(), n = e == null ? void 0 : e.chainNamespace, r = i !== o, x = r && !(a !== n), T = (t == null ? void 0 : t.name) === he.UNSUPPORTED_NETWORK_NAME, I = l.state.view === "ConnectingExternal", O = l.state.view === "ProfileWallets", ne = !((X = h.getAccountData(e == null ? void 0 : e.chainNamespace)) != null && X.caipAddress), se = l.state.view === "UnsupportedChain", re = p.state.open;
    let A = !1;
    this.enableEmbedded && l.state.view === "SwitchNetwork" && (A = !0), re && !I && !O && (ne ? r && (A = !0) : (se || x && !T) && (A = !0)), A && l.state.view !== "SIWXSignMessage" && l.goBack(), this.caipNetwork = e;
  }
  prefetch() {
    this.hasPrefetched || (R.prefetch(), R.fetchWalletsByPage({ page: 1 }), this.hasPrefetched = !0);
  }
}
g.styles = $e;
C([
  u({ type: Boolean })
], g.prototype, "enableEmbedded", void 0);
C([
  d()
], g.prototype, "open", void 0);
C([
  d()
], g.prototype, "caipAddress", void 0);
C([
  d()
], g.prototype, "caipNetwork", void 0);
C([
  d()
], g.prototype, "shake", void 0);
C([
  d()
], g.prototype, "filterByNamespace", void 0);
let Q = class extends g {
};
Q = C([
  f("w3m-modal")
], Q);
let Z = class extends g {
};
Z = C([
  f("appkit-modal")
], Z);
export {
  Z as AppKitModal,
  Q as W3mModal,
  g as W3mModalBase
};
