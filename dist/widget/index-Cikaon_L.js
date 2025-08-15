import { i as u, a as b, x as p } from "./lit-element-CWLRvgWK.js";
import { n as l } from "./class-map-BaJ3HzzH.js";
import { c as w } from "./index-D5_HZ1pl.js";
import { r as f, e as v, n as h } from "./index-C8kdZHDI.js";
const m = u`
  button {
    border-radius: var(--local-border-radius);
    color: var(--wui-color-fg-100);
    padding: var(--local-padding);
  }

  @media (max-width: 700px) {
    :host(:not([size='sm'])) button {
      padding: var(--wui-spacing-s);
    }
  }

  button > wui-icon {
    pointer-events: none;
  }

  button:disabled > wui-icon {
    color: var(--wui-color-bg-300) !important;
  }

  button:disabled {
    background-color: transparent;
  }

  button:hover:not(:disabled) {
    background-color: var(--wui-color-accent-glass-015);
  }

  button:focus-visible:not(:disabled) {
    background-color: var(--wui-color-accent-glass-015);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-accent-100),
      0 0 0 4px var(--wui-color-accent-glass-020);
  }
`;
var r = function(s, o, i, n) {
  var a = arguments.length, e = a < 3 ? o : n === null ? n = Object.getOwnPropertyDescriptor(o, i) : n, c;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") e = Reflect.decorate(s, o, i, n);
  else for (var d = s.length - 1; d >= 0; d--) (c = s[d]) && (e = (a < 3 ? c(e) : a > 3 ? c(o, i, e) : c(o, i)) || e);
  return a > 3 && e && Object.defineProperty(o, i, e), e;
};
let t = class extends b {
  constructor() {
    super(...arguments), this.size = "md", this.disabled = !1, this.icon = "copy", this.iconColor = "inherit";
  }
  render() {
    this.dataset.size = this.size;
    let o = "", i = "";
    switch (this.size) {
      case "lg":
        o = "--wui-border-radius-xs", i = "--wui-spacing-1xs";
        break;
      case "sm":
        o = "--wui-border-radius-3xs", i = "--wui-spacing-xxs";
        break;
      default:
        o = "--wui-border-radius-xxs", i = "--wui-spacing-2xs";
        break;
    }
    return this.style.cssText = `
    --local-border-radius: var(${o});
    --local-padding: var(${i});
    `, p`
      <button ?disabled=${this.disabled}>
        <wui-icon color=${this.iconColor} size=${this.size} name=${this.icon}></wui-icon>
      </button>
    `;
  }
};
t.styles = [f, v, h, m];
r([
  l()
], t.prototype, "size", void 0);
r([
  l({ type: Boolean })
], t.prototype, "disabled", void 0);
r([
  l()
], t.prototype, "icon", void 0);
r([
  l()
], t.prototype, "iconColor", void 0);
t = r([
  w("wui-icon-link")
], t);
