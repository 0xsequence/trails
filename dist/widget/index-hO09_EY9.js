import { i as c, a as g, x as u } from "./lit-element-CWLRvgWK.js";
import { n as d } from "./class-map-BaJ3HzzH.js";
import "./index-DVe7jYyH.js";
import "./index-Dcf_tL1W.js";
import { c as h } from "./index-D5_HZ1pl.js";
import { r as m, e as x } from "./index-C8kdZHDI.js";
import "./index-WFWVbb2G.js";
const w = c`
  :host {
    display: block;
  }

  :host > button,
  :host > wui-flex {
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
var p = function(o, e, r, s) {
  var n = arguments.length, t = n < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, r) : s, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") t = Reflect.decorate(o, e, r, s);
  else for (var l = o.length - 1; l >= 0; l--) (a = o[l]) && (t = (n < 3 ? a(t) : n > 3 ? a(e, r, t) : a(e, r)) || t);
  return n > 3 && t && Object.defineProperty(e, r, t), t;
};
let i = class extends g {
  constructor() {
    super(...arguments), this.text = "", this.loading = !1;
  }
  render() {
    return this.loading ? u` <wui-flex alignItems="center" gap="xxs" padding="xs">
        <wui-shimmer width="24px" height="24px"></wui-shimmer>
        <wui-shimmer width="40px" height="20px" borderRadius="4xs"></wui-shimmer>
      </wui-flex>` : u`
      <button>
        ${this.tokenTemplate()}
        <wui-text variant="paragraph-600" color="fg-100">${this.text}</wui-text>
      </button>
    `;
  }
  tokenTemplate() {
    return this.imageSrc ? u`<wui-image src=${this.imageSrc}></wui-image>` : u`
      <wui-icon-box
        size="sm"
        iconColor="fg-200"
        backgroundColor="fg-300"
        icon="networkPlaceholder"
      ></wui-icon-box>
    `;
  }
};
i.styles = [m, x, w];
p([
  d()
], i.prototype, "imageSrc", void 0);
p([
  d()
], i.prototype, "text", void 0);
p([
  d({ type: Boolean })
], i.prototype, "loading", void 0);
i = p([
  h("wui-token-button")
], i);
