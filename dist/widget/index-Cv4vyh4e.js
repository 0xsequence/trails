import { i as u, a as b, x as p } from "./lit-element-CWLRvgWK.js";
import { n as d, o as f } from "./class-map-BaJ3HzzH.js";
import { c as m } from "./index-D5_HZ1pl.js";
import { r as v, e as x } from "./index-C8kdZHDI.js";
const g = u`
  button {
    padding: var(--wui-spacing-4xs) var(--wui-spacing-xxs);
    border-radius: var(--wui-border-radius-3xs);
    background-color: transparent;
    color: var(--wui-color-accent-100);
  }

  button:disabled {
    background-color: transparent;
    color: var(--wui-color-gray-glass-015);
  }

  button:hover {
    background-color: var(--wui-color-gray-glass-005);
  }
`;
var l = function(i, t, r, n) {
  var s = arguments.length, o = s < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, r) : n, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") o = Reflect.decorate(i, t, r, n);
  else for (var c = i.length - 1; c >= 0; c--) (a = i[c]) && (o = (s < 3 ? a(o) : s > 3 ? a(t, r, o) : a(t, r)) || o);
  return s > 3 && o && Object.defineProperty(t, r, o), o;
};
let e = class extends b {
  constructor() {
    super(...arguments), this.tabIdx = void 0, this.disabled = !1, this.color = "inherit";
  }
  render() {
    return p`
      <button ?disabled=${this.disabled} tabindex=${f(this.tabIdx)}>
        <slot name="iconLeft"></slot>
        <wui-text variant="small-600" color=${this.color}>
          <slot></slot>
        </wui-text>
        <slot name="iconRight"></slot>
      </button>
    `;
  }
};
e.styles = [v, x, g];
l([
  d()
], e.prototype, "tabIdx", void 0);
l([
  d({ type: Boolean })
], e.prototype, "disabled", void 0);
l([
  d()
], e.prototype, "color", void 0);
e = l([
  m("wui-link")
], e);
