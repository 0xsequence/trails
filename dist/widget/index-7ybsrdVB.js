import { i as y, a as b, x as w } from "./lit-element-CWLRvgWK.js";
import { n as l, m as I, a as L } from "./class-map-BaJ3HzzH.js";
import { r as S, c as W, e as D } from "./core-CPzRvkzn.js";
const h = {
  getSpacingStyles(i, t) {
    if (Array.isArray(i))
      return i[t] ? `var(--wui-spacing-${i[t]})` : void 0;
    if (typeof i == "string")
      return `var(--wui-spacing-${i})`;
  },
  getFormattedDate(i) {
    return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(i);
  },
  getHostName(i) {
    try {
      return new URL(i).hostname;
    } catch {
      return "";
    }
  },
  getTruncateString({ string: i, charsStart: t, charsEnd: e, truncate: r }) {
    return i.length <= t + e ? i : r === "end" ? `${i.substring(0, t)}...` : r === "start" ? `...${i.substring(i.length - e)}` : `${i.substring(0, Math.floor(t))}...${i.substring(i.length - Math.floor(e))}`;
  },
  generateAvatarColors(i) {
    const e = i.toLowerCase().replace(/^0x/iu, "").replace(/[^a-f0-9]/gu, "").substring(0, 6).padEnd(6, "0"), r = this.hexToRgb(e), a = getComputedStyle(document.documentElement).getPropertyValue("--w3m-border-radius-master"), n = 100 - 3 * Number(a == null ? void 0 : a.replace("px", "")), s = `${n}% ${n}% at 65% 40%`, g = [];
    for (let f = 0; f < 5; f += 1) {
      const _ = this.tintColor(r, 0.15 * f);
      g.push(`rgb(${_[0]}, ${_[1]}, ${_[2]})`);
    }
    return `
    --local-color-1: ${g[0]};
    --local-color-2: ${g[1]};
    --local-color-3: ${g[2]};
    --local-color-4: ${g[3]};
    --local-color-5: ${g[4]};
    --local-radial-circle: ${s}
   `;
  },
  hexToRgb(i) {
    const t = parseInt(i, 16), e = t >> 16 & 255, r = t >> 8 & 255, a = t & 255;
    return [e, r, a];
  },
  tintColor(i, t) {
    const [e, r, a] = i, o = Math.round(e + (255 - e) * t), n = Math.round(r + (255 - r) * t), s = Math.round(a + (255 - a) * t);
    return [o, n, s];
  },
  isNumber(i) {
    return {
      number: /^[0-9]+$/u
    }.number.test(i);
  },
  getColorTheme(i) {
    var t;
    return i || (typeof window < "u" && window.matchMedia ? (t = window.matchMedia("(prefers-color-scheme: dark)")) != null && t.matches ? "dark" : "light" : "dark");
  },
  splitBalance(i) {
    const t = i.split(".");
    return t.length === 2 ? [t[0], t[1]] : ["0", "00"];
  },
  roundNumber(i, t, e) {
    return i.toString().length >= t ? Number(i).toFixed(e) : i;
  },
  formatNumberToLocalString(i, t = 2) {
    return i === void 0 ? "0.00" : typeof i == "number" ? i.toLocaleString("en-US", {
      maximumFractionDigits: t,
      minimumFractionDigits: t
    }) : parseFloat(i).toLocaleString("en-US", {
      maximumFractionDigits: t,
      minimumFractionDigits: t
    });
  }
};
function F(i, t) {
  const { kind: e, elements: r } = t;
  return {
    kind: e,
    elements: r,
    finisher(a) {
      customElements.get(i) || customElements.define(i, a);
    }
  };
}
function E(i, t) {
  return customElements.get(i) || customElements.define(i, t), t;
}
function x(i) {
  return function(e) {
    return typeof e == "function" ? E(i, e) : F(i, e);
  };
}
const H = y`
  :host {
    display: flex;
    width: inherit;
    height: inherit;
  }
`;
var p = function(i, t, e, r) {
  var a = arguments.length, o = a < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, e) : r, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") o = Reflect.decorate(i, t, e, r);
  else for (var s = i.length - 1; s >= 0; s--) (n = i[s]) && (o = (a < 3 ? n(o) : a > 3 ? n(t, e, o) : n(t, e)) || o);
  return a > 3 && o && Object.defineProperty(t, e, o), o;
};
let c = class extends b {
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
      padding-top: ${this.padding && h.getSpacingStyles(this.padding, 0)};
      padding-right: ${this.padding && h.getSpacingStyles(this.padding, 1)};
      padding-bottom: ${this.padding && h.getSpacingStyles(this.padding, 2)};
      padding-left: ${this.padding && h.getSpacingStyles(this.padding, 3)};
      margin-top: ${this.margin && h.getSpacingStyles(this.margin, 0)};
      margin-right: ${this.margin && h.getSpacingStyles(this.margin, 1)};
      margin-bottom: ${this.margin && h.getSpacingStyles(this.margin, 2)};
      margin-left: ${this.margin && h.getSpacingStyles(this.margin, 3)};
    `, w`<slot></slot>`;
  }
};
c.styles = [S, H];
p([
  l()
], c.prototype, "flexDirection", void 0);
p([
  l()
], c.prototype, "flexWrap", void 0);
p([
  l()
], c.prototype, "flexBasis", void 0);
p([
  l()
], c.prototype, "flexGrow", void 0);
p([
  l()
], c.prototype, "flexShrink", void 0);
p([
  l()
], c.prototype, "alignItems", void 0);
p([
  l()
], c.prototype, "justifyContent", void 0);
p([
  l()
], c.prototype, "columnGap", void 0);
p([
  l()
], c.prototype, "rowGap", void 0);
p([
  l()
], c.prototype, "gap", void 0);
p([
  l()
], c.prototype, "padding", void 0);
p([
  l()
], c.prototype, "margin", void 0);
c = p([
  x("wui-flex")
], c);
class M {
  constructor() {
    this.cache = /* @__PURE__ */ new Map();
  }
  set(t, e) {
    this.cache.set(t, e);
  }
  get(t) {
    return this.cache.get(t);
  }
  has(t) {
    return this.cache.has(t);
  }
  delete(t) {
    this.cache.delete(t);
  }
  clear() {
    this.cache.clear();
  }
}
const P = new M(), G = y`
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
var k = function(i, t, e, r) {
  var a = arguments.length, o = a < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, e) : r, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") o = Reflect.decorate(i, t, e, r);
  else for (var s = i.length - 1; s >= 0; s--) (n = i[s]) && (o = (a < 3 ? n(o) : a > 3 ? n(t, e, o) : n(t, e)) || o);
  return a > 3 && o && Object.defineProperty(t, e, o), o;
};
const O = {
  add: async () => (await import("./add-DFgM9NNW.js")).addSvg,
  allWallets: async () => (await import("./all-wallets-0NvkPX3O.js")).allWalletsSvg,
  arrowBottomCircle: async () => (await import("./arrow-bottom-circle-Cp4HWvjn.js")).arrowBottomCircleSvg,
  appStore: async () => (await import("./app-store-DOjC9E2N.js")).appStoreSvg,
  apple: async () => (await import("./apple-J0Tbe1ox.js")).appleSvg,
  arrowBottom: async () => (await import("./arrow-bottom-B2kMwh7q.js")).arrowBottomSvg,
  arrowLeft: async () => (await import("./arrow-left-DhWM1qfu.js")).arrowLeftSvg,
  arrowRight: async () => (await import("./arrow-right-CE7ZziYv.js")).arrowRightSvg,
  arrowTop: async () => (await import("./arrow-top-1M3MKw3S.js")).arrowTopSvg,
  bank: async () => (await import("./bank-CAFUDYnR.js")).bankSvg,
  browser: async () => (await import("./browser-Ca5jxGDi.js")).browserSvg,
  card: async () => (await import("./card-BU6kt-xN.js")).cardSvg,
  checkmark: async () => (await import("./checkmark-C9TQZBMh.js")).checkmarkSvg,
  checkmarkBold: async () => (await import("./checkmark-bold-DgFwmkXb.js")).checkmarkBoldSvg,
  chevronBottom: async () => (await import("./chevron-bottom-DLdBM0Sm.js")).chevronBottomSvg,
  chevronLeft: async () => (await import("./chevron-left-BxhQN5wx.js")).chevronLeftSvg,
  chevronRight: async () => (await import("./chevron-right-D03PM9Ir.js")).chevronRightSvg,
  chevronTop: async () => (await import("./chevron-top-ZZbrXR9k.js")).chevronTopSvg,
  chromeStore: async () => (await import("./chrome-store-NRXXGEcn.js")).chromeStoreSvg,
  clock: async () => (await import("./clock-DRFlfE9e.js")).clockSvg,
  close: async () => (await import("./close-eu1L-9O8.js")).closeSvg,
  compass: async () => (await import("./compass-sYfu7QmS.js")).compassSvg,
  coinPlaceholder: async () => (await import("./coinPlaceholder-Ct1VZGt3.js")).coinPlaceholderSvg,
  copy: async () => (await import("./copy-BLMBeiX9.js")).copySvg,
  cursor: async () => (await import("./cursor-CQ6Bg6oN.js")).cursorSvg,
  cursorTransparent: async () => (await import("./cursor-transparent-BNmttpI8.js")).cursorTransparentSvg,
  desktop: async () => (await import("./desktop-C6qdxrPd.js")).desktopSvg,
  disconnect: async () => (await import("./disconnect-Bk0n0F5v.js")).disconnectSvg,
  discord: async () => (await import("./discord-D8DoTai7.js")).discordSvg,
  etherscan: async () => (await import("./etherscan-DIyMu9gG.js")).etherscanSvg,
  extension: async () => (await import("./extension-CIHbGdgl.js")).extensionSvg,
  externalLink: async () => (await import("./external-link-B_oZYdcn.js")).externalLinkSvg,
  facebook: async () => (await import("./facebook-MfmtWJvC.js")).facebookSvg,
  farcaster: async () => (await import("./farcaster-DyOh4WKr.js")).farcasterSvg,
  filters: async () => (await import("./filters-Dl3w9zYd.js")).filtersSvg,
  github: async () => (await import("./github-Drh1Bm1l.js")).githubSvg,
  google: async () => (await import("./google-CE-QUoPN.js")).googleSvg,
  helpCircle: async () => (await import("./help-circle-CdxewPl6.js")).helpCircleSvg,
  image: async () => (await import("./image-D8Qa6dy_.js")).imageSvg,
  id: async () => (await import("./id-ChyUpm9Z.js")).idSvg,
  infoCircle: async () => (await import("./info-circle-C_nnGZ-Y.js")).infoCircleSvg,
  lightbulb: async () => (await import("./lightbulb-UGxR7THG.js")).lightbulbSvg,
  mail: async () => (await import("./mail-Beb-FXSj.js")).mailSvg,
  mobile: async () => (await import("./mobile-DzaOxTuh.js")).mobileSvg,
  more: async () => (await import("./more-BZu1lFID.js")).moreSvg,
  networkPlaceholder: async () => (await import("./network-placeholder-DB8GIJRc.js")).networkPlaceholderSvg,
  nftPlaceholder: async () => (await import("./nftPlaceholder-BNeoGOzX.js")).nftPlaceholderSvg,
  off: async () => (await import("./off-CrhRUS9u.js")).offSvg,
  playStore: async () => (await import("./play-store-Dg24zeRp.js")).playStoreSvg,
  plus: async () => (await import("./plus-DAuxQv6n.js")).plusSvg,
  qrCode: async () => (await import("./qr-code-Br4QQZpW.js")).qrCodeIcon,
  recycleHorizontal: async () => (await import("./recycle-horizontal-lEiOycAU.js")).recycleHorizontalSvg,
  refresh: async () => (await import("./refresh-CcdhNarq.js")).refreshSvg,
  search: async () => (await import("./search-DjdkObuL.js")).searchSvg,
  send: async () => (await import("./send-9u6gTWBH.js")).sendSvg,
  swapHorizontal: async () => (await import("./swapHorizontal-03w22vm0.js")).swapHorizontalSvg,
  swapHorizontalMedium: async () => (await import("./swapHorizontalMedium-BddbNOc1.js")).swapHorizontalMediumSvg,
  swapHorizontalBold: async () => (await import("./swapHorizontalBold-Dfydft4K.js")).swapHorizontalBoldSvg,
  swapHorizontalRoundedBold: async () => (await import("./swapHorizontalRoundedBold-DtFpLGdE.js")).swapHorizontalRoundedBoldSvg,
  swapVertical: async () => (await import("./swapVertical-C7ZMeBF_.js")).swapVerticalSvg,
  telegram: async () => (await import("./telegram-PE9Fixuk.js")).telegramSvg,
  threeDots: async () => (await import("./three-dots-Bjy0GGcr.js")).threeDotsSvg,
  twitch: async () => (await import("./twitch-BCs5tmTq.js")).twitchSvg,
  twitter: async () => (await import("./x-DucnZGew.js")).xSvg,
  twitterIcon: async () => (await import("./twitterIcon-uzpRNCXi.js")).twitterIconSvg,
  verify: async () => (await import("./verify-2KWkn7R3.js")).verifySvg,
  verifyFilled: async () => (await import("./verify-filled-Cd3fMtky.js")).verifyFilledSvg,
  wallet: async () => (await import("./wallet-CJ4Jrp3c.js")).walletSvg,
  walletConnect: async () => (await import("./walletconnect-Cx41XLyc.js")).walletConnectSvg,
  walletConnectLightBrown: async () => (await import("./walletconnect-Cx41XLyc.js")).walletConnectLightBrownSvg,
  walletConnectBrown: async () => (await import("./walletconnect-Cx41XLyc.js")).walletConnectBrownSvg,
  walletPlaceholder: async () => (await import("./wallet-placeholder-BG8ZuARj.js")).walletPlaceholderSvg,
  warningCircle: async () => (await import("./warning-circle-DybzguSf.js")).warningCircleSvg,
  x: async () => (await import("./x-DucnZGew.js")).xSvg,
  info: async () => (await import("./info-C_vHu6HI.js")).infoSvg,
  exclamationTriangle: async () => (await import("./exclamation-triangle-CzVqX-Ah.js")).exclamationTriangleSvg,
  reown: async () => (await import("./reown-logo-vM9SbYch.js")).reownSvg
};
async function U(i) {
  if (P.has(i))
    return P.get(i);
  const e = (O[i] ?? O.copy)();
  return P.set(i, e), e;
}
let m = class extends b {
  constructor() {
    super(...arguments), this.size = "md", this.name = "copy", this.color = "fg-300", this.aspectRatio = "1 / 1";
  }
  render() {
    return this.style.cssText = `
      --local-color: ${`var(--wui-color-${this.color});`}
      --local-width: ${`var(--wui-icon-size-${this.size});`}
      --local-aspect-ratio: ${this.aspectRatio}
    `, w`${I(U(this.name), w`<div class="fallback"></div>`)}`;
  }
};
m.styles = [S, W, G];
k([
  l()
], m.prototype, "size", void 0);
k([
  l()
], m.prototype, "name", void 0);
k([
  l()
], m.prototype, "color", void 0);
k([
  l()
], m.prototype, "aspectRatio", void 0);
m = k([
  x("wui-icon")
], m);
const N = y`
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
  .wui-font-micro-600 {
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
var R = function(i, t, e, r) {
  var a = arguments.length, o = a < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, e) : r, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") o = Reflect.decorate(i, t, e, r);
  else for (var s = i.length - 1; s >= 0; s--) (n = i[s]) && (o = (a < 3 ? n(o) : a > 3 ? n(t, e, o) : n(t, e)) || o);
  return a > 3 && o && Object.defineProperty(t, e, o), o;
};
let v = class extends b {
  constructor() {
    super(...arguments), this.variant = "paragraph-500", this.color = "fg-300", this.align = "left", this.lineClamp = void 0;
  }
  render() {
    const t = {
      [`wui-font-${this.variant}`]: !0,
      [`wui-color-${this.color}`]: !0,
      [`wui-line-clamp-${this.lineClamp}`]: !!this.lineClamp
    };
    return this.style.cssText = `
      --local-align: ${this.align};
      --local-color: var(--wui-color-${this.color});
    `, w`<slot class=${L(t)}></slot>`;
  }
};
v.styles = [S, N];
R([
  l()
], v.prototype, "variant", void 0);
R([
  l()
], v.prototype, "color", void 0);
R([
  l()
], v.prototype, "align", void 0);
R([
  l()
], v.prototype, "lineClamp", void 0);
v = R([
  x("wui-text")
], v);
const V = y`
  :host {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    background-color: var(--wui-color-gray-glass-020);
    border-radius: var(--local-border-radius);
    border: var(--local-border);
    box-sizing: content-box;
    width: var(--local-size);
    height: var(--local-size);
    min-height: var(--local-size);
    min-width: var(--local-size);
  }

  @supports (background: color-mix(in srgb, white 50%, black)) {
    :host {
      background-color: color-mix(in srgb, var(--local-bg-value) var(--local-bg-mix), transparent);
    }
  }
`;
var d = function(i, t, e, r) {
  var a = arguments.length, o = a < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, e) : r, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") o = Reflect.decorate(i, t, e, r);
  else for (var s = i.length - 1; s >= 0; s--) (n = i[s]) && (o = (a < 3 ? n(o) : a > 3 ? n(t, e, o) : n(t, e)) || o);
  return a > 3 && o && Object.defineProperty(t, e, o), o;
};
let u = class extends b {
  constructor() {
    super(...arguments), this.size = "md", this.backgroundColor = "accent-100", this.iconColor = "accent-100", this.background = "transparent", this.border = !1, this.borderColor = "wui-color-bg-125", this.icon = "copy";
  }
  render() {
    const t = this.iconSize || this.size, e = this.size === "lg", r = this.size === "xl", a = e ? "12%" : "16%", o = e ? "xxs" : r ? "s" : "3xl", n = this.background === "gray", s = this.background === "opaque", g = this.backgroundColor === "accent-100" && s || this.backgroundColor === "success-100" && s || this.backgroundColor === "error-100" && s || this.backgroundColor === "inverse-100" && s;
    let f = `var(--wui-color-${this.backgroundColor})`;
    return g ? f = `var(--wui-icon-box-bg-${this.backgroundColor})` : n && (f = `var(--wui-color-gray-${this.backgroundColor})`), this.style.cssText = `
       --local-bg-value: ${f};
       --local-bg-mix: ${g || n ? "100%" : a};
       --local-border-radius: var(--wui-border-radius-${o});
       --local-size: var(--wui-icon-box-size-${this.size});
       --local-border: ${this.borderColor === "wui-color-bg-125" ? "2px" : "1px"} solid ${this.border ? `var(--${this.borderColor})` : "transparent"}
   `, w` <wui-icon color=${this.iconColor} size=${t} name=${this.icon}></wui-icon> `;
  }
};
u.styles = [S, D, V];
d([
  l()
], u.prototype, "size", void 0);
d([
  l()
], u.prototype, "backgroundColor", void 0);
d([
  l()
], u.prototype, "iconColor", void 0);
d([
  l()
], u.prototype, "iconSize", void 0);
d([
  l()
], u.prototype, "background", void 0);
d([
  l({ type: Boolean })
], u.prototype, "border", void 0);
d([
  l()
], u.prototype, "borderColor", void 0);
d([
  l()
], u.prototype, "icon", void 0);
u = d([
  x("wui-icon-box")
], u);
const q = y`
  :host {
    display: block;
    width: var(--local-width);
    height: var(--local-height);
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
    border-radius: inherit;
  }
`;
var j = function(i, t, e, r) {
  var a = arguments.length, o = a < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, e) : r, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") o = Reflect.decorate(i, t, e, r);
  else for (var s = i.length - 1; s >= 0; s--) (n = i[s]) && (o = (a < 3 ? n(o) : a > 3 ? n(t, e, o) : n(t, e)) || o);
  return a > 3 && o && Object.defineProperty(t, e, o), o;
};
let $ = class extends b {
  constructor() {
    super(...arguments), this.src = "./path/to/image.jpg", this.alt = "Image", this.size = void 0;
  }
  render() {
    return this.style.cssText = `
      --local-width: ${this.size ? `var(--wui-icon-size-${this.size});` : "100%"};
      --local-height: ${this.size ? `var(--wui-icon-size-${this.size});` : "100%"};
      `, w`<img src=${this.src} alt=${this.alt} @error=${this.handleImageError} />`;
  }
  handleImageError() {
    this.dispatchEvent(new CustomEvent("onLoadError", { bubbles: !0, composed: !0 }));
  }
};
$.styles = [S, W, q];
j([
  l()
], $.prototype, "src", void 0);
j([
  l()
], $.prototype, "alt", void 0);
j([
  l()
], $.prototype, "size", void 0);
$ = j([
  x("wui-image")
], $);
const A = y`
  :host {
    display: flex;
    justify-content: center;
    align-items: center;
    height: var(--wui-spacing-m);
    padding: 0 var(--wui-spacing-3xs) !important;
    border-radius: var(--wui-border-radius-5xs);
    transition:
      border-radius var(--wui-duration-lg) var(--wui-ease-out-power-1),
      background-color var(--wui-duration-lg) var(--wui-ease-out-power-1);
    will-change: border-radius, background-color;
  }

  :host > wui-text {
    transform: translateY(5%);
  }

  :host([data-variant='main']) {
    background-color: var(--wui-color-accent-glass-015);
    color: var(--wui-color-accent-100);
  }

  :host([data-variant='shade']) {
    background-color: var(--wui-color-gray-glass-010);
    color: var(--wui-color-fg-200);
  }

  :host([data-variant='success']) {
    background-color: var(--wui-icon-box-bg-success-100);
    color: var(--wui-color-success-100);
  }

  :host([data-variant='error']) {
    background-color: var(--wui-icon-box-bg-error-100);
    color: var(--wui-color-error-100);
  }

  :host([data-size='lg']) {
    padding: 11px 5px !important;
  }

  :host([data-size='lg']) > wui-text {
    transform: translateY(2%);
  }
`;
var T = function(i, t, e, r) {
  var a = arguments.length, o = a < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, e) : r, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") o = Reflect.decorate(i, t, e, r);
  else for (var s = i.length - 1; s >= 0; s--) (n = i[s]) && (o = (a < 3 ? n(o) : a > 3 ? n(t, e, o) : n(t, e)) || o);
  return a > 3 && o && Object.defineProperty(t, e, o), o;
};
let z = class extends b {
  constructor() {
    super(...arguments), this.variant = "main", this.size = "lg";
  }
  render() {
    this.dataset.variant = this.variant, this.dataset.size = this.size;
    const t = this.size === "md" ? "mini-700" : "micro-700";
    return w`
      <wui-text data-variant=${this.variant} variant=${t} color="inherit">
        <slot></slot>
      </wui-text>
    `;
  }
};
z.styles = [S, A];
T([
  l()
], z.prototype, "variant", void 0);
T([
  l()
], z.prototype, "size", void 0);
z = T([
  x("wui-tag")
], z);
const Y = y`
  :host {
    display: flex;
  }

  :host([data-size='sm']) > svg {
    width: 12px;
    height: 12px;
  }

  :host([data-size='md']) > svg {
    width: 16px;
    height: 16px;
  }

  :host([data-size='lg']) > svg {
    width: 24px;
    height: 24px;
  }

  :host([data-size='xl']) > svg {
    width: 32px;
    height: 32px;
  }

  svg {
    animation: rotate 2s linear infinite;
  }

  circle {
    fill: none;
    stroke: var(--local-color);
    stroke-width: 4px;
    stroke-dasharray: 1, 124;
    stroke-dashoffset: 0;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

  :host([data-size='md']) > svg > circle {
    stroke-width: 6px;
  }

  :host([data-size='sm']) > svg > circle {
    stroke-width: 8px;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 124;
      stroke-dashoffset: 0;
    }

    50% {
      stroke-dasharray: 90, 124;
      stroke-dashoffset: -35;
    }

    100% {
      stroke-dashoffset: -125;
    }
  }
`;
var B = function(i, t, e, r) {
  var a = arguments.length, o = a < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, e) : r, n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") o = Reflect.decorate(i, t, e, r);
  else for (var s = i.length - 1; s >= 0; s--) (n = i[s]) && (o = (a < 3 ? n(o) : a > 3 ? n(t, e, o) : n(t, e)) || o);
  return a > 3 && o && Object.defineProperty(t, e, o), o;
};
let C = class extends b {
  constructor() {
    super(...arguments), this.color = "accent-100", this.size = "lg";
  }
  render() {
    return this.style.cssText = `--local-color: ${this.color === "inherit" ? "inherit" : `var(--wui-color-${this.color})`}`, this.dataset.size = this.size, w`<svg viewBox="25 25 50 50">
      <circle r="20" cy="50" cx="50"></circle>
    </svg>`;
  }
};
C.styles = [S, Y];
B([
  l()
], C.prototype, "color", void 0);
B([
  l()
], C.prototype, "size", void 0);
C = B([
  x("wui-loading-spinner")
], C);
export {
  h as U,
  x as c
};
