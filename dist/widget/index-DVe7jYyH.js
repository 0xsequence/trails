import { i as d, a as p, x as m } from "./lit-element-CWLRvgWK.js";
import { n as h } from "./class-map-BaJ3HzzH.js";
import { r as f, n as u } from "./index-C8kdZHDI.js";
import { c as b } from "./index-D5_HZ1pl.js";
const g = d`
  :host {
    display: block;
    width: var(--local-width);
    height: var(--local-height);
  }

  :host([data-object-fit='cover']) img {
    object-fit: cover;
    object-position: center center;
  }

  :host([data-object-fit='contain']) img {
    object-fit: contain;
    object-position: center center;
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: inherit;
  }
`;
var r = function(s, i, o, c) {
  var n = arguments.length, t = n < 3 ? i : c === null ? c = Object.getOwnPropertyDescriptor(i, o) : c, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") t = Reflect.decorate(s, i, o, c);
  else for (var l = s.length - 1; l >= 0; l--) (a = s[l]) && (t = (n < 3 ? a(t) : n > 3 ? a(i, o, t) : a(i, o)) || t);
  return n > 3 && t && Object.defineProperty(i, o, t), t;
};
let e = class extends p {
  constructor() {
    super(...arguments), this.src = "./path/to/image.jpg", this.alt = "Image", this.size = void 0, this.objectFit = "cover";
  }
  render() {
    return this.objectFit && (this.dataset.objectFit = this.objectFit), this.style.cssText = `
      --local-width: ${this.size ? `var(--wui-icon-size-${this.size});` : "100%"};
      --local-height: ${this.size ? `var(--wui-icon-size-${this.size});` : "100%"};
      `, m`<img src=${this.src} alt=${this.alt} @error=${this.handleImageError} />`;
  }
  handleImageError() {
    this.dispatchEvent(new CustomEvent("onLoadError", { bubbles: !0, composed: !0 }));
  }
};
e.styles = [f, u, g];
r([
  h()
], e.prototype, "src", void 0);
r([
  h()
], e.prototype, "alt", void 0);
r([
  h()
], e.prototype, "size", void 0);
r([
  h()
], e.prototype, "objectFit", void 0);
e = r([
  b("wui-image")
], e);
