import { i as h, a as c, x as l } from "./lit-element-CWLRvgWK.js";
import { n as f } from "./class-map-BaJ3HzzH.js";
import { r as m } from "./index-C8kdZHDI.js";
import { c as p } from "./index-D5_HZ1pl.js";
const v = h`
  :host {
    display: block;
    width: var(--wui-box-size-md);
    height: var(--wui-box-size-md);
  }

  svg {
    width: var(--wui-box-size-md);
    height: var(--wui-box-size-md);
  }

  rect {
    fill: none;
    stroke: var(--wui-color-accent-100);
    stroke-width: 4px;
    stroke-linecap: round;
    animation: dash 1s linear infinite;
  }

  @keyframes dash {
    to {
      stroke-dashoffset: 0px;
    }
  }
`;
var u = function(a, t, s, r) {
  var i = arguments.length, e = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, s) : r, o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") e = Reflect.decorate(a, t, s, r);
  else for (var d = a.length - 1; d >= 0; d--) (o = a[d]) && (e = (i < 3 ? o(e) : i > 3 ? o(t, s, e) : o(t, s)) || e);
  return i > 3 && e && Object.defineProperty(t, s, e), e;
};
let n = class extends c {
  constructor() {
    super(...arguments), this.radius = 36;
  }
  render() {
    return this.svgLoaderTemplate();
  }
  svgLoaderTemplate() {
    const t = this.radius > 50 ? 50 : this.radius, r = 36 - t, i = 116 + r, e = 245 + r, o = 360 + r * 1.75;
    return l`
      <svg viewBox="0 0 110 110" width="110" height="110">
        <rect
          x="2"
          y="2"
          width="106"
          height="106"
          rx=${t}
          stroke-dasharray="${i} ${e}"
          stroke-dashoffset=${o}
        />
      </svg>
    `;
  }
};
n.styles = [m, v];
u([
  f({ type: Number })
], n.prototype, "radius", void 0);
n = u([
  p("wui-loading-thumbnail")
], n);
