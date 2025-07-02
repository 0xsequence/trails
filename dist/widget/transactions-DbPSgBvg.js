import { i as s, a } from "./index-CQJlV2Ao.js";
import { x as m } from "./lit-html-jz-94mx9.js";
import { c as d } from "./if-defined-BehxAGoH.js";
import "./index-C1aA3ajo.js";
const p = s`
  :host > wui-flex:first-child {
    height: 500px;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
  }

  :host > wui-flex:first-child::-webkit-scrollbar {
    display: none;
  }
`;
var u = function(o, t, i, n) {
  var r = arguments.length, e = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, i) : n, l;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") e = Reflect.decorate(o, t, i, n);
  else for (var c = o.length - 1; c >= 0; c--) (l = o[c]) && (e = (r < 3 ? l(e) : r > 3 ? l(t, i, e) : l(t, i)) || e);
  return r > 3 && e && Object.defineProperty(t, i, e), e;
};
let f = class extends a {
  render() {
    return m`
      <wui-flex flexDirection="column" .padding=${["0", "m", "m", "m"]} gap="s">
        <w3m-activity-list page="activity"></w3m-activity-list>
      </wui-flex>
    `;
  }
};
f.styles = p;
f = u([
  d("w3m-transactions-view")
], f);
export {
  f as W3mTransactionsView
};
