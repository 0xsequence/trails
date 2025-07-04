import { a1 as H, a2 as I, i as _, r as z, X as L, a as A } from "./index-D7QEUbBB.js";
import { T as x, x as S, E as O } from "./lit-html-jz-94mx9.js";
const g = {
  getSpacingStyles(t, e) {
    if (Array.isArray(t))
      return t[e] ? `var(--wui-spacing-${t[e]})` : void 0;
    if (typeof t == "string")
      return `var(--wui-spacing-${t})`;
  },
  getFormattedDate(t) {
    return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(t);
  },
  getHostName(t) {
    try {
      return new URL(t).hostname;
    } catch {
      return "";
    }
  },
  getTruncateString({ string: t, charsStart: e, charsEnd: i, truncate: r }) {
    return t.length <= e + i ? t : r === "end" ? `${t.substring(0, e)}...` : r === "start" ? `...${t.substring(t.length - i)}` : `${t.substring(0, Math.floor(e))}...${t.substring(t.length - Math.floor(i))}`;
  },
  generateAvatarColors(t) {
    const i = t.toLowerCase().replace(/^0x/iu, "").replace(/[^a-f0-9]/gu, "").substring(0, 6).padEnd(6, "0"), r = this.hexToRgb(i), a = getComputedStyle(document.documentElement).getPropertyValue("--w3m-border-radius-master"), n = 100 - 3 * Number(a == null ? void 0 : a.replace("px", "")), s = `${n}% ${n}% at 65% 40%`, l = [];
    for (let m = 0; m < 5; m += 1) {
      const h = this.tintColor(r, 0.15 * m);
      l.push(`rgb(${h[0]}, ${h[1]}, ${h[2]})`);
    }
    return `
    --local-color-1: ${l[0]};
    --local-color-2: ${l[1]};
    --local-color-3: ${l[2]};
    --local-color-4: ${l[3]};
    --local-color-5: ${l[4]};
    --local-radial-circle: ${s}
   `;
  },
  hexToRgb(t) {
    const e = parseInt(t, 16), i = e >> 16 & 255, r = e >> 8 & 255, a = e & 255;
    return [i, r, a];
  },
  tintColor(t, e) {
    const [i, r, a] = t, o = Math.round(i + (255 - i) * e), n = Math.round(r + (255 - r) * e), s = Math.round(a + (255 - a) * e);
    return [o, n, s];
  },
  isNumber(t) {
    return {
      number: /^[0-9]+$/u
    }.number.test(t);
  },
  getColorTheme(t) {
    var e;
    return t || (typeof window < "u" && window.matchMedia && typeof window.matchMedia == "function" ? (e = window.matchMedia("(prefers-color-scheme: dark)")) != null && e.matches ? "dark" : "light" : "dark");
  },
  splitBalance(t) {
    const e = t.split(".");
    return e.length === 2 ? [e[0], e[1]] : ["0", "00"];
  },
  roundNumber(t, e, i) {
    return t.toString().length >= e ? Number(t).toFixed(i) : t;
  },
  formatNumberToLocalString(t, e = 2) {
    return t === void 0 ? "0.00" : typeof t == "number" ? t.toLocaleString("en-US", {
      maximumFractionDigits: e,
      minimumFractionDigits: e
    }) : parseFloat(t).toLocaleString("en-US", {
      maximumFractionDigits: e,
      minimumFractionDigits: e
    });
  }
};
function D(t, e) {
  const { kind: i, elements: r } = e;
  return {
    kind: i,
    elements: r,
    finisher(a) {
      customElements.get(t) || customElements.define(t, a);
    }
  };
}
function F(t, e) {
  return customElements.get(t) || customElements.define(t, e), e;
}
function T(t) {
  return function(i) {
    return typeof i == "function" ? F(t, i) : D(t, i);
  };
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const G = { attribute: !0, type: String, converter: I, reflect: !1, hasChanged: H }, N = (t = G, e, i) => {
  const { kind: r, metadata: a } = i;
  let o = globalThis.litPropertyMetadata.get(a);
  if (o === void 0 && globalThis.litPropertyMetadata.set(a, o = /* @__PURE__ */ new Map()), r === "setter" && ((t = Object.create(t)).wrapped = !0), o.set(i.name, t), r === "accessor") {
    const { name: n } = i;
    return { set(s) {
      const l = e.get.call(this);
      e.set.call(this, s), this.requestUpdate(n, l, t);
    }, init(s) {
      return s !== void 0 && this.C(n, void 0, t, s), s;
    } };
  }
  if (r === "setter") {
    const { name: n } = i;
    return function(s) {
      const l = this[n];
      e.call(this, s), this.requestUpdate(n, l, t);
    };
  }
  throw Error("Unsupported decorator location: " + r);
};
function c(t) {
  return (e, i) => typeof i == "object" ? N(t, e, i) : ((r, a, o) => {
    const n = a.hasOwnProperty(o);
    return a.constructor.createProperty(o, r), n ? Object.getOwnPropertyDescriptor(a, o) : void 0;
  })(t, e, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function ct(t) {
  return c({ ...t, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const E = (t) => t === null || typeof t != "object" && typeof t != "function", W = (t) => t.strings === void 0;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const M = { ATTRIBUTE: 1, CHILD: 2 }, j = (t) => (...e) => ({ _$litDirective$: t, values: e });
let B = class {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, i, r) {
    this._$Ct = e, this._$AM = i, this._$Ci = r;
  }
  _$AS(e, i) {
    return this.update(e, i);
  }
  update(e, i) {
    return this.render(...i);
  }
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const d = (t, e) => {
  var r;
  const i = t._$AN;
  if (i === void 0) return !1;
  for (const a of i) (r = a._$AO) == null || r.call(a, e, !1), d(a, e);
  return !0;
}, $ = (t) => {
  let e, i;
  do {
    if ((e = t._$AM) === void 0) break;
    i = e._$AN, i.delete(t), t = e;
  } while ((i == null ? void 0 : i.size) === 0);
}, U = (t) => {
  for (let e; e = t._$AM; t = e) {
    let i = e._$AN;
    if (i === void 0) e._$AN = i = /* @__PURE__ */ new Set();
    else if (i.has(t)) break;
    i.add(t), q(e);
  }
};
function V(t) {
  this._$AN !== void 0 ? ($(this), this._$AM = t, U(this)) : this._$AM = t;
}
function X(t, e = !1, i = 0) {
  const r = this._$AH, a = this._$AN;
  if (a !== void 0 && a.size !== 0) if (e) if (Array.isArray(r)) for (let o = i; o < r.length; o++) d(r[o], !1), $(r[o]);
  else r != null && (d(r, !1), $(r));
  else d(this, t);
}
const q = (t) => {
  t.type == M.CHILD && (t._$AP ?? (t._$AP = X), t._$AQ ?? (t._$AQ = V));
};
class K extends B {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }
  _$AT(e, i, r) {
    super._$AT(e, i, r), U(this), this.isConnected = e._$AU;
  }
  _$AO(e, i = !0) {
    var r, a;
    e !== this.isConnected && (this.isConnected = e, e ? (r = this.reconnected) == null || r.call(this) : (a = this.disconnected) == null || a.call(this)), i && (d(this, e), $(this));
  }
  setValue(e) {
    if (W(this._$Ct)) this._$Ct._$AI(e, this);
    else {
      const i = [...this._$Ct._$AH];
      i[this._$Ci] = e, this._$Ct._$AI(i, this, 0);
    }
  }
  disconnected() {
  }
  reconnected() {
  }
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class Y {
  constructor(e) {
    this.G = e;
  }
  disconnect() {
    this.G = void 0;
  }
  reconnect(e) {
    this.G = e;
  }
  deref() {
    return this.G;
  }
}
class Z {
  constructor() {
    this.Y = void 0, this.Z = void 0;
  }
  get() {
    return this.Y;
  }
  pause() {
    this.Y ?? (this.Y = new Promise((e) => this.Z = e));
  }
  resume() {
    var e;
    (e = this.Z) == null || e.call(this), this.Y = this.Z = void 0;
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const k = (t) => !E(t) && typeof t.then == "function", P = 1073741823;
class Q extends K {
  constructor() {
    super(...arguments), this._$Cwt = P, this._$Cbt = [], this._$CK = new Y(this), this._$CX = new Z();
  }
  render(...e) {
    return e.find((i) => !k(i)) ?? x;
  }
  update(e, i) {
    const r = this._$Cbt;
    let a = r.length;
    this._$Cbt = i;
    const o = this._$CK, n = this._$CX;
    this.isConnected || this.disconnected();
    for (let s = 0; s < i.length && !(s > this._$Cwt); s++) {
      const l = i[s];
      if (!k(l)) return this._$Cwt = s, l;
      s < a && l === r[s] || (this._$Cwt = P, a = 0, Promise.resolve(l).then(async (m) => {
        for (; n.get(); ) await n.get();
        const h = o.deref();
        if (h !== void 0) {
          const b = h._$Cbt.indexOf(l);
          b > -1 && b < h._$Cwt && (h._$Cwt = b, h.setValue(m));
        }
      }));
    }
    return x;
  }
  disconnected() {
    this._$CK.disconnect(), this._$CX.pause();
  }
  reconnected() {
    this._$CK.reconnect(this), this._$CX.resume();
  }
}
const J = j(Q);
class tt {
  constructor() {
    this.cache = /* @__PURE__ */ new Map();
  }
  set(e, i) {
    this.cache.set(e, i);
  }
  get(e) {
    return this.cache.get(e);
  }
  has(e) {
    return this.cache.has(e);
  }
  delete(e) {
    this.cache.delete(e);
  }
  clear() {
    this.cache.clear();
  }
}
const C = new tt(), et = _`
  :host {
    display: flex;
    aspect-ratio: var(--local-aspect-ratio);
    color: var(--local-color);
    width: var(--local-width);
  }

  svg {
    width: inherit;
    height: inherit;
    object-fit: contain;
    object-position: center;
  }

  .fallback {
    width: var(--local-width);
    height: var(--local-height);
  }
`;
var v = function(t, e, i, r) {
  var a = arguments.length, o = a < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, i) : r, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") o = Reflect.decorate(t, e, i, r);
  else for (var s = t.length - 1; s >= 0; s--) (n = t[s]) && (o = (a < 3 ? n(o) : a > 3 ? n(e, i, o) : n(e, i)) || o);
  return a > 3 && o && Object.defineProperty(e, i, o), o;
};
const R = {
  add: async () => (await import("./add-C2x8TPmn.js")).addSvg,
  allWallets: async () => (await import("./all-wallets-DViFFS37.js")).allWalletsSvg,
  arrowBottomCircle: async () => (await import("./arrow-bottom-circle-i4IhC6-O.js")).arrowBottomCircleSvg,
  appStore: async () => (await import("./app-store-BeXN6xNW.js")).appStoreSvg,
  apple: async () => (await import("./apple-QlYCaxNG.js")).appleSvg,
  arrowBottom: async () => (await import("./arrow-bottom-BT-F-8l2.js")).arrowBottomSvg,
  arrowLeft: async () => (await import("./arrow-left-BsuoxWLt.js")).arrowLeftSvg,
  arrowRight: async () => (await import("./arrow-right-BYZnY-tO.js")).arrowRightSvg,
  arrowTop: async () => (await import("./arrow-top-azUAj80I.js")).arrowTopSvg,
  bank: async () => (await import("./bank-DhdyEYFk.js")).bankSvg,
  browser: async () => (await import("./browser-BWdeT5W7.js")).browserSvg,
  bin: async () => (await import("./bin-BeRS1X4r.js")).binSvg,
  bitcoin: async () => (await import("./bitcoin-DIVOKl75.js")).bitcoinSvg,
  card: async () => (await import("./card-DEQkFLcB.js")).cardSvg,
  checkmark: async () => (await import("./checkmark-CaVixENJ.js")).checkmarkSvg,
  checkmarkBold: async () => (await import("./checkmark-bold-CsaSjyLT.js")).checkmarkBoldSvg,
  chevronBottom: async () => (await import("./chevron-bottom-bv4FJhAd.js")).chevronBottomSvg,
  chevronLeft: async () => (await import("./chevron-left-CJYVL5Iv.js")).chevronLeftSvg,
  chevronRight: async () => (await import("./chevron-right-CAs0Xe0Y.js")).chevronRightSvg,
  chevronTop: async () => (await import("./chevron-top-DY7coOpK.js")).chevronTopSvg,
  chromeStore: async () => (await import("./chrome-store-BkDeqWQi.js")).chromeStoreSvg,
  clock: async () => (await import("./clock-DoWB2JuX.js")).clockSvg,
  close: async () => (await import("./close-DOm8EgSg.js")).closeSvg,
  compass: async () => (await import("./compass-Bp8Vdxsl.js")).compassSvg,
  coinPlaceholder: async () => (await import("./coinPlaceholder-7jmFrVgN.js")).coinPlaceholderSvg,
  copy: async () => (await import("./copy-V-OR7maR.js")).copySvg,
  cursor: async () => (await import("./cursor-DwSKhn6G.js")).cursorSvg,
  cursorTransparent: async () => (await import("./cursor-transparent-D7sez4YO.js")).cursorTransparentSvg,
  circle: async () => (await import("./circle-C9q51Rcn.js")).circleSvg,
  desktop: async () => (await import("./desktop-dwf3boGQ.js")).desktopSvg,
  disconnect: async () => (await import("./disconnect-BUgCr84G.js")).disconnectSvg,
  discord: async () => (await import("./discord--F_IR1l5.js")).discordSvg,
  ethereum: async () => (await import("./ethereum-B0gtW8u9.js")).ethereumSvg,
  etherscan: async () => (await import("./etherscan-ClHbN39y.js")).etherscanSvg,
  extension: async () => (await import("./extension-CvAtKW68.js")).extensionSvg,
  externalLink: async () => (await import("./external-link-DaegCPq0.js")).externalLinkSvg,
  facebook: async () => (await import("./facebook-kDb7_xrc.js")).facebookSvg,
  farcaster: async () => (await import("./farcaster-BiX_MvEc.js")).farcasterSvg,
  filters: async () => (await import("./filters-DQf5rrtg.js")).filtersSvg,
  github: async () => (await import("./github-i6BN_OHR.js")).githubSvg,
  google: async () => (await import("./google-BM44mnKd.js")).googleSvg,
  helpCircle: async () => (await import("./help-circle-BKGoAoT-.js")).helpCircleSvg,
  image: async () => (await import("./image-BYutqp64.js")).imageSvg,
  id: async () => (await import("./id-C3k1wlUl.js")).idSvg,
  infoCircle: async () => (await import("./info-circle-BNzCMsBD.js")).infoCircleSvg,
  lightbulb: async () => (await import("./lightbulb-BqbMhb9c.js")).lightbulbSvg,
  mail: async () => (await import("./mail-D0vXwZ_m.js")).mailSvg,
  mobile: async () => (await import("./mobile-DFduelvN.js")).mobileSvg,
  more: async () => (await import("./more-ghIs9tFz.js")).moreSvg,
  networkPlaceholder: async () => (await import("./network-placeholder-BJlVxRCP.js")).networkPlaceholderSvg,
  nftPlaceholder: async () => (await import("./nftPlaceholder-Dhqu_8Yu.js")).nftPlaceholderSvg,
  off: async () => (await import("./off-DqV6PM-s.js")).offSvg,
  playStore: async () => (await import("./play-store-phjN050L.js")).playStoreSvg,
  plus: async () => (await import("./plus-Dd6X8aYz.js")).plusSvg,
  qrCode: async () => (await import("./qr-code-WSoD7w3H.js")).qrCodeIcon,
  recycleHorizontal: async () => (await import("./recycle-horizontal-CCCAvuma.js")).recycleHorizontalSvg,
  refresh: async () => (await import("./refresh-BZPhbldO.js")).refreshSvg,
  search: async () => (await import("./search-P9ncIJML.js")).searchSvg,
  send: async () => (await import("./send-F2VEqd7e.js")).sendSvg,
  swapHorizontal: async () => (await import("./swapHorizontal-C35Ng_x0.js")).swapHorizontalSvg,
  swapHorizontalMedium: async () => (await import("./swapHorizontalMedium-BrfwiIGh.js")).swapHorizontalMediumSvg,
  swapHorizontalBold: async () => (await import("./swapHorizontalBold-BF_5qn0m.js")).swapHorizontalBoldSvg,
  swapHorizontalRoundedBold: async () => (await import("./swapHorizontalRoundedBold-DgPtKzum.js")).swapHorizontalRoundedBoldSvg,
  swapVertical: async () => (await import("./swapVertical-CCU0uhQe.js")).swapVerticalSvg,
  solana: async () => (await import("./solana-BlRcCp5o.js")).solanaSvg,
  telegram: async () => (await import("./telegram-DhSgS_ZG.js")).telegramSvg,
  threeDots: async () => (await import("./three-dots-BXO_4kFw.js")).threeDotsSvg,
  twitch: async () => (await import("./twitch-BXhzcgTd.js")).twitchSvg,
  twitter: async () => (await import("./x-CAocJnnU.js")).xSvg,
  twitterIcon: async () => (await import("./twitterIcon-CGRJcVDT.js")).twitterIconSvg,
  verify: async () => (await import("./verify-BNDGXo10.js")).verifySvg,
  verifyFilled: async () => (await import("./verify-filled-D5tszKlp.js")).verifyFilledSvg,
  wallet: async () => (await import("./wallet-DZJ5Gkyn.js")).walletSvg,
  walletConnect: async () => (await import("./walletconnect-BKt5J3h1.js")).walletConnectSvg,
  walletConnectLightBrown: async () => (await import("./walletconnect-BKt5J3h1.js")).walletConnectLightBrownSvg,
  walletConnectBrown: async () => (await import("./walletconnect-BKt5J3h1.js")).walletConnectBrownSvg,
  walletPlaceholder: async () => (await import("./wallet-placeholder-DP2mpdfB.js")).walletPlaceholderSvg,
  warningCircle: async () => (await import("./warning-circle-BKBQNkxQ.js")).warningCircleSvg,
  x: async () => (await import("./x-CAocJnnU.js")).xSvg,
  info: async () => (await import("./info-DXwTD4pR.js")).infoSvg,
  exclamationTriangle: async () => (await import("./exclamation-triangle-DHDh9ktU.js")).exclamationTriangleSvg,
  reown: async () => (await import("./reown-logo-DCdonNIf.js")).reownSvg,
  "x-mark": async () => (await import("./x-mark-DT4NkxYa.js")).xMarkSvg
};
async function it(t) {
  if (C.has(t))
    return C.get(t);
  const i = (R[t] ?? R.copy)();
  return C.set(t, i), i;
}
let w = class extends A {
  constructor() {
    super(...arguments), this.size = "md", this.name = "copy", this.color = "fg-300", this.aspectRatio = "1 / 1";
  }
  render() {
    return this.style.cssText = `
      --local-color: ${`var(--wui-color-${this.color});`}
      --local-width: ${`var(--wui-icon-size-${this.size});`}
      --local-aspect-ratio: ${this.aspectRatio}
    `, S`${J(it(this.name), S`<div class="fallback"></div>`)}`;
  }
};
w.styles = [z, L, et];
v([
  c()
], w.prototype, "size", void 0);
v([
  c()
], w.prototype, "name", void 0);
v([
  c()
], w.prototype, "color", void 0);
v([
  c()
], w.prototype, "aspectRatio", void 0);
w = v([
  T("wui-icon")
], w);
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ot = j(class extends B {
  constructor(t) {
    var e;
    if (super(t), t.type !== M.ATTRIBUTE || t.name !== "class" || ((e = t.strings) == null ? void 0 : e.length) > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(t) {
    return " " + Object.keys(t).filter((e) => t[e]).join(" ") + " ";
  }
  update(t, [e]) {
    var r, a;
    if (this.st === void 0) {
      this.st = /* @__PURE__ */ new Set(), t.strings !== void 0 && (this.nt = new Set(t.strings.join(" ").split(/\s/).filter((o) => o !== "")));
      for (const o in e) e[o] && !((r = this.nt) != null && r.has(o)) && this.st.add(o);
      return this.render(e);
    }
    const i = t.element.classList;
    for (const o of this.st) o in e || (i.remove(o), this.st.delete(o));
    for (const o in e) {
      const n = !!e[o];
      n === this.st.has(o) || (a = this.nt) != null && a.has(o) || (n ? (i.add(o), this.st.add(o)) : (i.remove(o), this.st.delete(o)));
    }
    return x;
  }
}), rt = _`
  :host {
    display: inline-flex !important;
  }

  slot {
    width: 100%;
    display: inline-block;
    font-style: normal;
    font-family: var(--wui-font-family);
    font-feature-settings:
      'tnum' on,
      'lnum' on,
      'case' on;
    line-height: 130%;
    font-weight: var(--wui-font-weight-regular);
    overflow: inherit;
    text-overflow: inherit;
    text-align: var(--local-align);
    color: var(--local-color);
  }

  .wui-line-clamp-1 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }

  .wui-line-clamp-2 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .wui-font-medium-400 {
    font-size: var(--wui-font-size-medium);
    font-weight: var(--wui-font-weight-light);
    letter-spacing: var(--wui-letter-spacing-medium);
  }

  .wui-font-medium-600 {
    font-size: var(--wui-font-size-medium);
    letter-spacing: var(--wui-letter-spacing-medium);
  }

  .wui-font-title-600 {
    font-size: var(--wui-font-size-title);
    letter-spacing: var(--wui-letter-spacing-title);
  }

  .wui-font-title-6-600 {
    font-size: var(--wui-font-size-title-6);
    letter-spacing: var(--wui-letter-spacing-title-6);
  }

  .wui-font-mini-700 {
    font-size: var(--wui-font-size-mini);
    letter-spacing: var(--wui-letter-spacing-mini);
    text-transform: uppercase;
  }

  .wui-font-large-500,
  .wui-font-large-600,
  .wui-font-large-700 {
    font-size: var(--wui-font-size-large);
    letter-spacing: var(--wui-letter-spacing-large);
  }

  .wui-font-2xl-500,
  .wui-font-2xl-600,
  .wui-font-2xl-700 {
    font-size: var(--wui-font-size-2xl);
    letter-spacing: var(--wui-letter-spacing-2xl);
  }

  .wui-font-paragraph-400,
  .wui-font-paragraph-500,
  .wui-font-paragraph-600,
  .wui-font-paragraph-700 {
    font-size: var(--wui-font-size-paragraph);
    letter-spacing: var(--wui-letter-spacing-paragraph);
  }

  .wui-font-small-400,
  .wui-font-small-500,
  .wui-font-small-600 {
    font-size: var(--wui-font-size-small);
    letter-spacing: var(--wui-letter-spacing-small);
  }

  .wui-font-tiny-400,
  .wui-font-tiny-500,
  .wui-font-tiny-600 {
    font-size: var(--wui-font-size-tiny);
    letter-spacing: var(--wui-letter-spacing-tiny);
  }

  .wui-font-micro-700,
  .wui-font-micro-600,
  .wui-font-micro-500 {
    font-size: var(--wui-font-size-micro);
    letter-spacing: var(--wui-letter-spacing-micro);
    text-transform: uppercase;
  }

  .wui-font-tiny-400,
  .wui-font-small-400,
  .wui-font-medium-400,
  .wui-font-paragraph-400 {
    font-weight: var(--wui-font-weight-light);
  }

  .wui-font-large-700,
  .wui-font-paragraph-700,
  .wui-font-micro-700,
  .wui-font-mini-700 {
    font-weight: var(--wui-font-weight-bold);
  }

  .wui-font-medium-600,
  .wui-font-medium-title-600,
  .wui-font-title-6-600,
  .wui-font-large-600,
  .wui-font-paragraph-600,
  .wui-font-small-600,
  .wui-font-tiny-600,
  .wui-font-micro-600 {
    font-weight: var(--wui-font-weight-medium);
  }

  :host([disabled]) {
    opacity: 0.4;
  }
`;
var y = function(t, e, i, r) {
  var a = arguments.length, o = a < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, i) : r, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") o = Reflect.decorate(t, e, i, r);
  else for (var s = t.length - 1; s >= 0; s--) (n = t[s]) && (o = (a < 3 ? n(o) : a > 3 ? n(e, i, o) : n(e, i)) || o);
  return a > 3 && o && Object.defineProperty(e, i, o), o;
};
let f = class extends A {
  constructor() {
    super(...arguments), this.variant = "paragraph-500", this.color = "fg-300", this.align = "left", this.lineClamp = void 0;
  }
  render() {
    const e = {
      [`wui-font-${this.variant}`]: !0,
      [`wui-color-${this.color}`]: !0,
      [`wui-line-clamp-${this.lineClamp}`]: !!this.lineClamp
    };
    return this.style.cssText = `
      --local-align: ${this.align};
      --local-color: var(--wui-color-${this.color});
    `, S`<slot class=${ot(e)}></slot>`;
  }
};
f.styles = [z, rt];
y([
  c()
], f.prototype, "variant", void 0);
y([
  c()
], f.prototype, "color", void 0);
y([
  c()
], f.prototype, "align", void 0);
y([
  c()
], f.prototype, "lineClamp", void 0);
f = y([
  T("wui-text")
], f);
const at = _`
  :host {
    display: flex;
    width: inherit;
    height: inherit;
  }
`;
var u = function(t, e, i, r) {
  var a = arguments.length, o = a < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, i) : r, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") o = Reflect.decorate(t, e, i, r);
  else for (var s = t.length - 1; s >= 0; s--) (n = t[s]) && (o = (a < 3 ? n(o) : a > 3 ? n(e, i, o) : n(e, i)) || o);
  return a > 3 && o && Object.defineProperty(e, i, o), o;
};
let p = class extends A {
  render() {
    return this.style.cssText = `
      flex-direction: ${this.flexDirection};
      flex-wrap: ${this.flexWrap};
      flex-basis: ${this.flexBasis};
      flex-grow: ${this.flexGrow};
      flex-shrink: ${this.flexShrink};
      align-items: ${this.alignItems};
      justify-content: ${this.justifyContent};
      column-gap: ${this.columnGap && `var(--wui-spacing-${this.columnGap})`};
      row-gap: ${this.rowGap && `var(--wui-spacing-${this.rowGap})`};
      gap: ${this.gap && `var(--wui-spacing-${this.gap})`};
      padding-top: ${this.padding && g.getSpacingStyles(this.padding, 0)};
      padding-right: ${this.padding && g.getSpacingStyles(this.padding, 1)};
      padding-bottom: ${this.padding && g.getSpacingStyles(this.padding, 2)};
      padding-left: ${this.padding && g.getSpacingStyles(this.padding, 3)};
      margin-top: ${this.margin && g.getSpacingStyles(this.margin, 0)};
      margin-right: ${this.margin && g.getSpacingStyles(this.margin, 1)};
      margin-bottom: ${this.margin && g.getSpacingStyles(this.margin, 2)};
      margin-left: ${this.margin && g.getSpacingStyles(this.margin, 3)};
    `, S`<slot></slot>`;
  }
};
p.styles = [z, at];
u([
  c()
], p.prototype, "flexDirection", void 0);
u([
  c()
], p.prototype, "flexWrap", void 0);
u([
  c()
], p.prototype, "flexBasis", void 0);
u([
  c()
], p.prototype, "flexGrow", void 0);
u([
  c()
], p.prototype, "flexShrink", void 0);
u([
  c()
], p.prototype, "alignItems", void 0);
u([
  c()
], p.prototype, "justifyContent", void 0);
u([
  c()
], p.prototype, "columnGap", void 0);
u([
  c()
], p.prototype, "rowGap", void 0);
u([
  c()
], p.prototype, "gap", void 0);
u([
  c()
], p.prototype, "padding", void 0);
u([
  c()
], p.prototype, "margin", void 0);
p = u([
  T("wui-flex")
], p);
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const gt = (t) => t ?? O;
export {
  g as U,
  j as a,
  T as c,
  ot as e,
  K as f,
  c as n,
  gt as o,
  ct as r
};
