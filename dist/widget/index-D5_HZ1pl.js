import { i as b, a as x, x as d } from "./lit-element-CWLRvgWK.js";
import { n, m as k, a as R } from "./class-map-BaJ3HzzH.js";
import { r as $, n as B } from "./index-C8kdZHDI.js";
const w = {
  getSpacingStyles(t, i) {
    if (Array.isArray(t))
      return t[i] ? `var(--wui-spacing-${t[i]})` : void 0;
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
  getTruncateString({ string: t, charsStart: i, charsEnd: e, truncate: o }) {
    return t.length <= i + e ? t : o === "end" ? `${t.substring(0, i)}...` : o === "start" ? `...${t.substring(t.length - e)}` : `${t.substring(0, Math.floor(i))}...${t.substring(t.length - Math.floor(e))}`;
  },
  generateAvatarColors(t) {
    const e = t.toLowerCase().replace(/^0x/iu, "").replace(/[^a-f0-9]/gu, "").substring(0, 6).padEnd(6, "0"), o = this.hexToRgb(e), r = getComputedStyle(document.documentElement).getPropertyValue("--w3m-border-radius-master"), s = 100 - 3 * Number(r == null ? void 0 : r.replace("px", "")), l = `${s}% ${s}% at 65% 40%`, u = [];
    for (let v = 0; v < 5; v += 1) {
      const y = this.tintColor(o, 0.15 * v);
      u.push(`rgb(${y[0]}, ${y[1]}, ${y[2]})`);
    }
    return `
    --local-color-1: ${u[0]};
    --local-color-2: ${u[1]};
    --local-color-3: ${u[2]};
    --local-color-4: ${u[3]};
    --local-color-5: ${u[4]};
    --local-radial-circle: ${l}
   `;
  },
  hexToRgb(t) {
    const i = parseInt(t, 16), e = i >> 16 & 255, o = i >> 8 & 255, r = i & 255;
    return [e, o, r];
  },
  tintColor(t, i) {
    const [e, o, r] = t, a = Math.round(e + (255 - e) * i), s = Math.round(o + (255 - o) * i), l = Math.round(r + (255 - r) * i);
    return [a, s, l];
  },
  isNumber(t) {
    return {
      number: /^[0-9]+$/u
    }.number.test(t);
  },
  getColorTheme(t) {
    var i;
    return t || (typeof window < "u" && window.matchMedia && typeof window.matchMedia == "function" ? (i = window.matchMedia("(prefers-color-scheme: dark)")) != null && i.matches ? "dark" : "light" : "dark");
  },
  splitBalance(t) {
    const i = t.split(".");
    return i.length === 2 ? [i[0], i[1]] : ["0", "00"];
  },
  roundNumber(t, i, e) {
    return t.toString().length >= i ? Number(t).toFixed(e) : t;
  }
};
function T(t, i) {
  const { kind: e, elements: o } = i;
  return {
    kind: e,
    elements: o,
    finisher(r) {
      customElements.get(t) || customElements.define(t, r);
    }
  };
}
function P(t, i) {
  return customElements.get(t) || customElements.define(t, i), i;
}
function C(t) {
  return function(e) {
    return typeof e == "function" ? P(t, e) : T(t, e);
  };
}
class j {
  constructor() {
    this.cache = /* @__PURE__ */ new Map();
  }
  set(i, e) {
    this.cache.set(i, e);
  }
  get(i) {
    return this.cache.get(i);
  }
  has(i) {
    return this.cache.has(i);
  }
  delete(i) {
    this.cache.delete(i);
  }
  clear() {
    this.cache.clear();
  }
}
const S = new j(), H = b`
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
var f = function(t, i, e, o) {
  var r = arguments.length, a = r < 3 ? i : o === null ? o = Object.getOwnPropertyDescriptor(i, e) : o, s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(t, i, e, o);
  else for (var l = t.length - 1; l >= 0; l--) (s = t[l]) && (a = (r < 3 ? s(a) : r > 3 ? s(i, e, a) : s(i, e)) || a);
  return r > 3 && a && Object.defineProperty(i, e, a), a;
};
const z = {
  add: async () => (await import("./add-56tPCtJ_.js")).addSvg,
  allWallets: async () => (await import("./all-wallets-CH_8keRE.js")).allWalletsSvg,
  arrowBottomCircle: async () => (await import("./arrow-bottom-circle-DHoPbCiU.js")).arrowBottomCircleSvg,
  appStore: async () => (await import("./app-store-bvdn-TSY.js")).appStoreSvg,
  apple: async () => (await import("./apple-LhQVxsfE.js")).appleSvg,
  arrowBottom: async () => (await import("./arrow-bottom-CFhjdtCb.js")).arrowBottomSvg,
  arrowLeft: async () => (await import("./arrow-left-Bq8R4CsT.js")).arrowLeftSvg,
  arrowRight: async () => (await import("./arrow-right-D3m6wPUW.js")).arrowRightSvg,
  arrowTop: async () => (await import("./arrow-top-CaaHGzYJ.js")).arrowTopSvg,
  bank: async () => (await import("./bank-BXY0hJoI.js")).bankSvg,
  browser: async () => (await import("./browser-CVxGYHeP.js")).browserSvg,
  bin: async () => (await import("./bin-DaJYlV6j.js")).binSvg,
  bitcoin: async () => (await import("./bitcoin-vq1qwiSV.js")).bitcoinSvg,
  card: async () => (await import("./card-CDTzAvsL.js")).cardSvg,
  checkmark: async () => (await import("./checkmark-BP3aqtad.js")).checkmarkSvg,
  checkmarkBold: async () => (await import("./checkmark-bold-D28y3gZ4.js")).checkmarkBoldSvg,
  chevronBottom: async () => (await import("./chevron-bottom-moIQomb4.js")).chevronBottomSvg,
  chevronLeft: async () => (await import("./chevron-left-rCNRyCWq.js")).chevronLeftSvg,
  chevronRight: async () => (await import("./chevron-right-PV2Wt-mi.js")).chevronRightSvg,
  chevronTop: async () => (await import("./chevron-top-Dae3R6-J.js")).chevronTopSvg,
  chromeStore: async () => (await import("./chrome-store-D14v-cuJ.js")).chromeStoreSvg,
  clock: async () => (await import("./clock-DvFQIFbo.js")).clockSvg,
  close: async () => (await import("./close-mfxBnzn_.js")).closeSvg,
  compass: async () => (await import("./compass-hyvlEdWr.js")).compassSvg,
  coinPlaceholder: async () => (await import("./coinPlaceholder-DqWjk1DX.js")).coinPlaceholderSvg,
  copy: async () => (await import("./copy-Ay2rEVKK.js")).copySvg,
  cursor: async () => (await import("./cursor-CvYM7Yg_.js")).cursorSvg,
  cursorTransparent: async () => (await import("./cursor-transparent-0fi0EnDb.js")).cursorTransparentSvg,
  circle: async () => (await import("./circle-DeG4hCH4.js")).circleSvg,
  desktop: async () => (await import("./desktop-CaMl8k9-.js")).desktopSvg,
  disconnect: async () => (await import("./disconnect-CVIsVvfZ.js")).disconnectSvg,
  discord: async () => (await import("./discord-DFQLgFiP.js")).discordSvg,
  ethereum: async () => (await import("./ethereum-DtZeJvhd.js")).ethereumSvg,
  etherscan: async () => (await import("./etherscan-B__pd59c.js")).etherscanSvg,
  extension: async () => (await import("./extension-CN-xZNsl.js")).extensionSvg,
  externalLink: async () => (await import("./external-link-DyfVfcSn.js")).externalLinkSvg,
  facebook: async () => (await import("./facebook-BBbKi5Dk.js")).facebookSvg,
  farcaster: async () => (await import("./farcaster-SYFdZeqv.js")).farcasterSvg,
  filters: async () => (await import("./filters-D_RY6GTC.js")).filtersSvg,
  github: async () => (await import("./github-CSko7QfH.js")).githubSvg,
  google: async () => (await import("./google-lfaYBRH1.js")).googleSvg,
  helpCircle: async () => (await import("./help-circle-N1OFbr-6.js")).helpCircleSvg,
  image: async () => (await import("./image-Cb5rRGF9.js")).imageSvg,
  id: async () => (await import("./id-D3TGcd0J.js")).idSvg,
  infoCircle: async () => (await import("./info-circle-DmYAG7Cp.js")).infoCircleSvg,
  lightbulb: async () => (await import("./lightbulb-DhoV3YPp.js")).lightbulbSvg,
  mail: async () => (await import("./mail-DjwBG-5d.js")).mailSvg,
  mobile: async () => (await import("./mobile-DJMowTYR.js")).mobileSvg,
  more: async () => (await import("./more-cheojBr0.js")).moreSvg,
  networkPlaceholder: async () => (await import("./network-placeholder-BhuTrDgY.js")).networkPlaceholderSvg,
  nftPlaceholder: async () => (await import("./nftPlaceholder-D9zFzugw.js")).nftPlaceholderSvg,
  off: async () => (await import("./off-4dK59lon.js")).offSvg,
  playStore: async () => (await import("./play-store-CMVYFGU6.js")).playStoreSvg,
  plus: async () => (await import("./plus-CdTDWKh3.js")).plusSvg,
  qrCode: async () => (await import("./qr-code-C2oe1D_d.js")).qrCodeIcon,
  recycleHorizontal: async () => (await import("./recycle-horizontal-CL_zY957.js")).recycleHorizontalSvg,
  refresh: async () => (await import("./refresh-GYlHD5ey.js")).refreshSvg,
  search: async () => (await import("./search-DJsJdhSq.js")).searchSvg,
  send: async () => (await import("./send-Bf_bcCvD.js")).sendSvg,
  swapHorizontal: async () => (await import("./swapHorizontal-zwGqhVpq.js")).swapHorizontalSvg,
  swapHorizontalMedium: async () => (await import("./swapHorizontalMedium--AStiNra.js")).swapHorizontalMediumSvg,
  swapHorizontalBold: async () => (await import("./swapHorizontalBold-B_dAI8NX.js")).swapHorizontalBoldSvg,
  swapHorizontalRoundedBold: async () => (await import("./swapHorizontalRoundedBold-B2jXZUYl.js")).swapHorizontalRoundedBoldSvg,
  swapVertical: async () => (await import("./swapVertical-BlO1w6Yv.js")).swapVerticalSvg,
  solana: async () => (await import("./solana-BkCFshNx.js")).solanaSvg,
  telegram: async () => (await import("./telegram-CC5GhSMH.js")).telegramSvg,
  threeDots: async () => (await import("./three-dots-CM7b_w5M.js")).threeDotsSvg,
  twitch: async () => (await import("./twitch-CLzoU-3g.js")).twitchSvg,
  twitter: async () => (await import("./x-BzozTtiT.js")).xSvg,
  twitterIcon: async () => (await import("./twitterIcon-CTCaxJ0T.js")).twitterIconSvg,
  user: async () => (await import("./user-vV65EZu5.js")).userSvg,
  verify: async () => (await import("./verify-DalSHwkv.js")).verifySvg,
  verifyFilled: async () => (await import("./verify-filled-CjnGWSks.js")).verifyFilledSvg,
  wallet: async () => (await import("./wallet-B9IW1MzI.js")).walletSvg,
  walletConnect: async () => (await import("./walletconnect-CkqHYokz.js")).walletConnectSvg,
  walletConnectLightBrown: async () => (await import("./walletconnect-CkqHYokz.js")).walletConnectLightBrownSvg,
  walletConnectBrown: async () => (await import("./walletconnect-CkqHYokz.js")).walletConnectBrownSvg,
  walletPlaceholder: async () => (await import("./wallet-placeholder-BRr4LQ6-.js")).walletPlaceholderSvg,
  warningCircle: async () => (await import("./warning-circle-Ci3On2Bp.js")).warningCircleSvg,
  x: async () => (await import("./x-BzozTtiT.js")).xSvg,
  info: async () => (await import("./info-DB2sOvI5.js")).infoSvg,
  exclamationTriangle: async () => (await import("./exclamation-triangle-sPbleM2-.js")).exclamationTriangleSvg,
  reown: async () => (await import("./reown-logo-BZos5KBB.js")).reownSvg,
  "x-mark": async () => (await import("./x-mark-CQZEK7Fm.js")).xMarkSvg
};
async function M(t) {
  if (S.has(t))
    return S.get(t);
  const e = (z[t] ?? z.copy)();
  return S.set(t, e), e;
}
let g = class extends x {
  constructor() {
    super(...arguments), this.size = "md", this.name = "copy", this.color = "fg-300", this.aspectRatio = "1 / 1";
  }
  render() {
    return this.style.cssText = `
      --local-color: ${`var(--wui-color-${this.color});`}
      --local-width: ${`var(--wui-icon-size-${this.size});`}
      --local-aspect-ratio: ${this.aspectRatio}
    `, d`${k(M(this.name), d`<div class="fallback"></div>`)}`;
  }
};
g.styles = [$, B, H];
f([
  n()
], g.prototype, "size", void 0);
f([
  n()
], g.prototype, "name", void 0);
f([
  n()
], g.prototype, "color", void 0);
f([
  n()
], g.prototype, "aspectRatio", void 0);
g = f([
  C("wui-icon")
], g);
const _ = b`
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
var h = function(t, i, e, o) {
  var r = arguments.length, a = r < 3 ? i : o === null ? o = Object.getOwnPropertyDescriptor(i, e) : o, s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(t, i, e, o);
  else for (var l = t.length - 1; l >= 0; l--) (s = t[l]) && (a = (r < 3 ? s(a) : r > 3 ? s(i, e, a) : s(i, e)) || a);
  return r > 3 && a && Object.defineProperty(i, e, a), a;
};
let m = class extends x {
  constructor() {
    super(...arguments), this.variant = "paragraph-500", this.color = "fg-300", this.align = "left", this.lineClamp = void 0;
  }
  render() {
    const i = {
      [`wui-font-${this.variant}`]: !0,
      [`wui-color-${this.color}`]: !0,
      [`wui-line-clamp-${this.lineClamp}`]: !!this.lineClamp
    };
    return this.style.cssText = `
      --local-align: ${this.align};
      --local-color: var(--wui-color-${this.color});
    `, d`<slot class=${R(i)}></slot>`;
  }
};
m.styles = [$, _];
h([
  n()
], m.prototype, "variant", void 0);
h([
  n()
], m.prototype, "color", void 0);
h([
  n()
], m.prototype, "align", void 0);
h([
  n()
], m.prototype, "lineClamp", void 0);
m = h([
  C("wui-text")
], m);
const I = b`
  :host {
    display: flex;
    width: inherit;
    height: inherit;
  }
`;
var p = function(t, i, e, o) {
  var r = arguments.length, a = r < 3 ? i : o === null ? o = Object.getOwnPropertyDescriptor(i, e) : o, s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(t, i, e, o);
  else for (var l = t.length - 1; l >= 0; l--) (s = t[l]) && (a = (r < 3 ? s(a) : r > 3 ? s(i, e, a) : s(i, e)) || a);
  return r > 3 && a && Object.defineProperty(i, e, a), a;
};
let c = class extends x {
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
      padding-top: ${this.padding && w.getSpacingStyles(this.padding, 0)};
      padding-right: ${this.padding && w.getSpacingStyles(this.padding, 1)};
      padding-bottom: ${this.padding && w.getSpacingStyles(this.padding, 2)};
      padding-left: ${this.padding && w.getSpacingStyles(this.padding, 3)};
      margin-top: ${this.margin && w.getSpacingStyles(this.margin, 0)};
      margin-right: ${this.margin && w.getSpacingStyles(this.margin, 1)};
      margin-bottom: ${this.margin && w.getSpacingStyles(this.margin, 2)};
      margin-left: ${this.margin && w.getSpacingStyles(this.margin, 3)};
    `, d`<slot></slot>`;
  }
};
c.styles = [$, I];
p([
  n()
], c.prototype, "flexDirection", void 0);
p([
  n()
], c.prototype, "flexWrap", void 0);
p([
  n()
], c.prototype, "flexBasis", void 0);
p([
  n()
], c.prototype, "flexGrow", void 0);
p([
  n()
], c.prototype, "flexShrink", void 0);
p([
  n()
], c.prototype, "alignItems", void 0);
p([
  n()
], c.prototype, "justifyContent", void 0);
p([
  n()
], c.prototype, "columnGap", void 0);
p([
  n()
], c.prototype, "rowGap", void 0);
p([
  n()
], c.prototype, "gap", void 0);
p([
  n()
], c.prototype, "padding", void 0);
p([
  n()
], c.prototype, "margin", void 0);
c = p([
  C("wui-flex")
], c);
export {
  w as U,
  C as c
};
