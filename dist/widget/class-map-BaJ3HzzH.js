import { f as w, u as b, E as m, T as $ } from "./lit-element-CWLRvgWK.js";
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const y = { attribute: !0, type: String, converter: b, reflect: !1, hasChanged: w }, T = (t = y, e, s) => {
  const { kind: r, metadata: i } = s;
  let n = globalThis.litPropertyMetadata.get(i);
  if (n === void 0 && globalThis.litPropertyMetadata.set(i, n = /* @__PURE__ */ new Map()), r === "setter" && ((t = Object.create(t)).wrapped = !0), n.set(s.name, t), r === "accessor") {
    const { name: c } = s;
    return { set(o) {
      const h = e.get.call(this);
      e.set.call(this, o), this.requestUpdate(c, h, t);
    }, init(o) {
      return o !== void 0 && this.C(c, void 0, t, o), o;
    } };
  }
  if (r === "setter") {
    const { name: c } = s;
    return function(o) {
      const h = this[c];
      e.call(this, o), this.requestUpdate(c, h, t);
    };
  }
  throw Error("Unsupported decorator location: " + r);
};
function M(t) {
  return (e, s) => typeof s == "object" ? T(t, e, s) : ((r, i, n) => {
    const c = i.hasOwnProperty(n);
    return i.constructor.createProperty(n, r), c ? Object.getOwnPropertyDescriptor(i, n) : void 0;
  })(t, e, s);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function D(t) {
  return M({ ...t, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const G = (t) => t ?? m;
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const O = (t) => t === null || typeof t != "object" && typeof t != "function", P = (t) => t.strings === void 0;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const p = { ATTRIBUTE: 1, CHILD: 2 }, C = (t) => (...e) => ({ _$litDirective$: t, values: e });
let A = class {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, s, r) {
    this._$Ct = e, this._$AM = s, this._$Ci = r;
  }
  _$AS(e, s) {
    return this.update(e, s);
  }
  update(e, s) {
    return this.render(...s);
  }
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const d = (t, e) => {
  var r;
  const s = t._$AN;
  if (s === void 0) return !1;
  for (const i of s) (r = i._$AO) == null || r.call(i, e, !1), d(i, e);
  return !0;
}, u = (t) => {
  let e, s;
  do {
    if ((e = t._$AM) === void 0) break;
    s = e._$AN, s.delete(t), t = e;
  } while ((s == null ? void 0 : s.size) === 0);
}, v = (t) => {
  for (let e; e = t._$AM; t = e) {
    let s = e._$AN;
    if (s === void 0) e._$AN = s = /* @__PURE__ */ new Set();
    else if (s.has(t)) break;
    s.add(t), N(e);
  }
};
function U(t) {
  this._$AN !== void 0 ? (u(this), this._$AM = t, v(this)) : this._$AM = t;
}
function j(t, e = !1, s = 0) {
  const r = this._$AH, i = this._$AN;
  if (i !== void 0 && i.size !== 0) if (e) if (Array.isArray(r)) for (let n = s; n < r.length; n++) d(r[n], !1), u(r[n]);
  else r != null && (d(r, !1), u(r));
  else d(this, t);
}
const N = (t) => {
  t.type == p.CHILD && (t._$AP ?? (t._$AP = j), t._$AQ ?? (t._$AQ = U));
};
class I extends A {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }
  _$AT(e, s, r) {
    super._$AT(e, s, r), v(this), this.isConnected = e._$AU;
  }
  _$AO(e, s = !0) {
    var r, i;
    e !== this.isConnected && (this.isConnected = e, e ? (r = this.reconnected) == null || r.call(this) : (i = this.disconnected) == null || i.call(this)), s && (d(this, e), u(this));
  }
  setValue(e) {
    if (P(this._$Ct)) this._$Ct._$AI(e, this);
    else {
      const s = [...this._$Ct._$AH];
      s[this._$Ci] = e, this._$Ct._$AI(s, this, 0);
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
class x {
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
class E {
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
const f = (t) => !O(t) && typeof t.then == "function", _ = 1073741823;
class S extends I {
  constructor() {
    super(...arguments), this._$Cwt = _, this._$Cbt = [], this._$CK = new x(this), this._$CX = new E();
  }
  render(...e) {
    return e.find((s) => !f(s)) ?? $;
  }
  update(e, s) {
    const r = this._$Cbt;
    let i = r.length;
    this._$Cbt = s;
    const n = this._$CK, c = this._$CX;
    this.isConnected || this.disconnected();
    for (let o = 0; o < s.length && !(o > this._$Cwt); o++) {
      const h = s[o];
      if (!f(h)) return this._$Cwt = o, h;
      o < i && h === r[o] || (this._$Cwt = _, i = 0, Promise.resolve(h).then(async (g) => {
        for (; c.get(); ) await c.get();
        const a = n.deref();
        if (a !== void 0) {
          const l = a._$Cbt.indexOf(h);
          l > -1 && l < a._$Cwt && (a._$Cwt = l, a.setValue(g));
        }
      }));
    }
    return $;
  }
  disconnected() {
    this._$CK.disconnect(), this._$CX.pause();
  }
  reconnected() {
    this._$CK.reconnect(this), this._$CX.resume();
  }
}
const K = C(S);
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const X = C(class extends A {
  constructor(t) {
    var e;
    if (super(t), t.type !== p.ATTRIBUTE || t.name !== "class" || ((e = t.strings) == null ? void 0 : e.length) > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(t) {
    return " " + Object.keys(t).filter((e) => t[e]).join(" ") + " ";
  }
  update(t, [e]) {
    var r, i;
    if (this.st === void 0) {
      this.st = /* @__PURE__ */ new Set(), t.strings !== void 0 && (this.nt = new Set(t.strings.join(" ").split(/\s/).filter((n) => n !== "")));
      for (const n in e) e[n] && !((r = this.nt) != null && r.has(n)) && this.st.add(n);
      return this.render(e);
    }
    const s = t.element.classList;
    for (const n of this.st) n in e || (s.remove(n), this.st.delete(n));
    for (const n in e) {
      const c = !!e[n];
      c === this.st.has(n) || (i = this.nt) != null && i.has(n) || (c ? (s.add(n), this.st.add(n)) : (s.remove(n), this.st.delete(n)));
    }
    return $;
  }
});
export {
  X as a,
  C as e,
  I as f,
  K as m,
  M as n,
  G as o,
  D as r
};
