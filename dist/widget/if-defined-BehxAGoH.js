import { a1 as H, a2 as I, i as _, r as z, X as L, a as A } from "./index-CQJlV2Ao.js";
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
  add: async () => (await import("./add-CS46Zryx.js")).addSvg,
  allWallets: async () => (await import("./all-wallets-BSQdmwXx.js")).allWalletsSvg,
  arrowBottomCircle: async () => (await import("./arrow-bottom-circle-C-01eAzZ.js")).arrowBottomCircleSvg,
  appStore: async () => (await import("./app-store-B-h99okf.js")).appStoreSvg,
  apple: async () => (await import("./apple-D0NxLuQ9.js")).appleSvg,
  arrowBottom: async () => (await import("./arrow-bottom-DOvrXkoE.js")).arrowBottomSvg,
  arrowLeft: async () => (await import("./arrow-left-ZH0f6TGs.js")).arrowLeftSvg,
  arrowRight: async () => (await import("./arrow-right-C6c-7soA.js")).arrowRightSvg,
  arrowTop: async () => (await import("./arrow-top-BQkzJjIj.js")).arrowTopSvg,
  bank: async () => (await import("./bank-BHTlIFXB.js")).bankSvg,
  browser: async () => (await import("./browser-tO9EXQP-.js")).browserSvg,
  bin: async () => (await import("./bin-msopXTfB.js")).binSvg,
  bitcoin: async () => (await import("./bitcoin-D1VM1xnd.js")).bitcoinSvg,
  card: async () => (await import("./card-vVY0AoG5.js")).cardSvg,
  checkmark: async () => (await import("./checkmark-CsSZOnrF.js")).checkmarkSvg,
  checkmarkBold: async () => (await import("./checkmark-bold-CMuOX_oS.js")).checkmarkBoldSvg,
  chevronBottom: async () => (await import("./chevron-bottom-Bkc5fU2O.js")).chevronBottomSvg,
  chevronLeft: async () => (await import("./chevron-left-D2mnyaP8.js")).chevronLeftSvg,
  chevronRight: async () => (await import("./chevron-right-5mqqkoUs.js")).chevronRightSvg,
  chevronTop: async () => (await import("./chevron-top-ekYnvzFk.js")).chevronTopSvg,
  chromeStore: async () => (await import("./chrome-store-OXDK9Xyy.js")).chromeStoreSvg,
  clock: async () => (await import("./clock-DF7UQ7Vu.js")).clockSvg,
  close: async () => (await import("./close-BRabs9qX.js")).closeSvg,
  compass: async () => (await import("./compass-DY5ZcCIO.js")).compassSvg,
  coinPlaceholder: async () => (await import("./coinPlaceholder-DHHDbznv.js")).coinPlaceholderSvg,
  copy: async () => (await import("./copy-Cu8N7Gno.js")).copySvg,
  cursor: async () => (await import("./cursor-U6tqVVHC.js")).cursorSvg,
  cursorTransparent: async () => (await import("./cursor-transparent-CfnTalh7.js")).cursorTransparentSvg,
  circle: async () => (await import("./circle-B8FhVKx5.js")).circleSvg,
  desktop: async () => (await import("./desktop-yO8qTOeZ.js")).desktopSvg,
  disconnect: async () => (await import("./disconnect-Dgrc9bdW.js")).disconnectSvg,
  discord: async () => (await import("./discord-CenvjpZH.js")).discordSvg,
  ethereum: async () => (await import("./ethereum-CjdzVmCc.js")).ethereumSvg,
  etherscan: async () => (await import("./etherscan-e-F9Yv5w.js")).etherscanSvg,
  extension: async () => (await import("./extension-Dl9n8Y4K.js")).extensionSvg,
  externalLink: async () => (await import("./external-link-B3I_uK_e.js")).externalLinkSvg,
  facebook: async () => (await import("./facebook-BBmSRrYx.js")).facebookSvg,
  farcaster: async () => (await import("./farcaster-1aMX0Dwm.js")).farcasterSvg,
  filters: async () => (await import("./filters-DFl6KtqE.js")).filtersSvg,
  github: async () => (await import("./github-Dq0VXRl4.js")).githubSvg,
  google: async () => (await import("./google-DT7SYJqX.js")).googleSvg,
  helpCircle: async () => (await import("./help-circle-C3wc0xIt.js")).helpCircleSvg,
  image: async () => (await import("./image-CMn5m71P.js")).imageSvg,
  id: async () => (await import("./id-Cfi1tpMN.js")).idSvg,
  infoCircle: async () => (await import("./info-circle-Di_WFH4n.js")).infoCircleSvg,
  lightbulb: async () => (await import("./lightbulb-BNVsmfy6.js")).lightbulbSvg,
  mail: async () => (await import("./mail-y8j6dciB.js")).mailSvg,
  mobile: async () => (await import("./mobile-BWJp5vHq.js")).mobileSvg,
  more: async () => (await import("./more-CV125p_L.js")).moreSvg,
  networkPlaceholder: async () => (await import("./network-placeholder-D9PT-DZH.js")).networkPlaceholderSvg,
  nftPlaceholder: async () => (await import("./nftPlaceholder-D_IwIvED.js")).nftPlaceholderSvg,
  off: async () => (await import("./off-BkHKBVrS.js")).offSvg,
  playStore: async () => (await import("./play-store-Cxzfhixt.js")).playStoreSvg,
  plus: async () => (await import("./plus-B3k3X5h2.js")).plusSvg,
  qrCode: async () => (await import("./qr-code-FSJfAXjw.js")).qrCodeIcon,
  recycleHorizontal: async () => (await import("./recycle-horizontal-DavAD_Qn.js")).recycleHorizontalSvg,
  refresh: async () => (await import("./refresh-BAqPsZ9y.js")).refreshSvg,
  search: async () => (await import("./search-KZlDsUg3.js")).searchSvg,
  send: async () => (await import("./send-Bgm_rtrv.js")).sendSvg,
  swapHorizontal: async () => (await import("./swapHorizontal-bdqs7q_c.js")).swapHorizontalSvg,
  swapHorizontalMedium: async () => (await import("./swapHorizontalMedium-C-mUSgAr.js")).swapHorizontalMediumSvg,
  swapHorizontalBold: async () => (await import("./swapHorizontalBold-C0Jq0bFe.js")).swapHorizontalBoldSvg,
  swapHorizontalRoundedBold: async () => (await import("./swapHorizontalRoundedBold-DQ7Om7Sf.js")).swapHorizontalRoundedBoldSvg,
  swapVertical: async () => (await import("./swapVertical-BD8OUK1v.js")).swapVerticalSvg,
  solana: async () => (await import("./solana-1oSoB-z1.js")).solanaSvg,
  telegram: async () => (await import("./telegram-B3JVi5ul.js")).telegramSvg,
  threeDots: async () => (await import("./three-dots-6FoUKGzd.js")).threeDotsSvg,
  twitch: async () => (await import("./twitch-D4_wbKar.js")).twitchSvg,
  twitter: async () => (await import("./x-DfZzSHmT.js")).xSvg,
  twitterIcon: async () => (await import("./twitterIcon-oYqwBqqN.js")).twitterIconSvg,
  verify: async () => (await import("./verify-B4w74Bqw.js")).verifySvg,
  verifyFilled: async () => (await import("./verify-filled-BnRPJK4W.js")).verifyFilledSvg,
  wallet: async () => (await import("./wallet-CVujF1FJ.js")).walletSvg,
  walletConnect: async () => (await import("./walletconnect-C66PFfWp.js")).walletConnectSvg,
  walletConnectLightBrown: async () => (await import("./walletconnect-C66PFfWp.js")).walletConnectLightBrownSvg,
  walletConnectBrown: async () => (await import("./walletconnect-C66PFfWp.js")).walletConnectBrownSvg,
  walletPlaceholder: async () => (await import("./wallet-placeholder-O_znF9xU.js")).walletPlaceholderSvg,
  warningCircle: async () => (await import("./warning-circle-DfjjQnUP.js")).warningCircleSvg,
  x: async () => (await import("./x-DfZzSHmT.js")).xSvg,
  info: async () => (await import("./info-CMS70qXt.js")).infoSvg,
  exclamationTriangle: async () => (await import("./exclamation-triangle-DQeUf3bi.js")).exclamationTriangleSvg,
  reown: async () => (await import("./reown-logo-CbG4QbgJ.js")).reownSvg,
  "x-mark": async () => (await import("./x-mark-q4RtNBNR.js")).xMarkSvg
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
