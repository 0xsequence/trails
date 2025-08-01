var yt = 20, Pt = 1, S = 1e6, rt = 1e6, xt = -7, Ct = 21, Mt = !1, L = "[big.js] ", P = L + "Invalid ", F = P + "decimal places", Nt = P + "rounding mode", _t = L + "Division by zero", u = {}, A = void 0, Ut = /^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i;
function gt() {
  function i(t) {
    var e = this;
    if (!(e instanceof i)) return t === A ? gt() : new i(t);
    if (t instanceof i)
      e.s = t.s, e.e = t.e, e.c = t.c.slice();
    else {
      if (typeof t != "string") {
        if (i.strict === !0 && typeof t != "bigint")
          throw TypeError(P + "value");
        t = t === 0 && 1 / t < 0 ? "-0" : String(t);
      }
      Ot(e, t);
    }
    e.constructor = i;
  }
  return i.prototype = u, i.DP = yt, i.RM = Pt, i.NE = xt, i.PE = Ct, i.strict = Mt, i.roundDown = 0, i.roundHalfUp = 1, i.roundHalfEven = 2, i.roundUp = 3, i;
}
function Ot(i, t) {
  var e, s, r;
  if (!Ut.test(t))
    throw Error(P + "number");
  for (i.s = t.charAt(0) == "-" ? (t = t.slice(1), -1) : 1, (e = t.indexOf(".")) > -1 && (t = t.replace(".", "")), (s = t.search(/e/i)) > 0 ? (e < 0 && (e = s), e += +t.slice(s + 1), t = t.substring(0, s)) : e < 0 && (e = t.length), r = t.length, s = 0; s < r && t.charAt(s) == "0"; ) ++s;
  if (s == r)
    i.c = [i.e = 0];
  else {
    for (; r > 0 && t.charAt(--r) == "0"; ) ;
    for (i.e = e - s - 1, i.c = [], e = 0; s <= r; ) i.c[e++] = +t.charAt(s++);
  }
  return i;
}
function x(i, t, e, s) {
  var r = i.c;
  if (e === A && (e = i.constructor.RM), e !== 0 && e !== 1 && e !== 2 && e !== 3)
    throw Error(Nt);
  if (t < 1)
    s = e === 3 && (s || !!r[0]) || t === 0 && (e === 1 && r[0] >= 5 || e === 2 && (r[0] > 5 || r[0] === 5 && (s || r[1] !== A))), r.length = 1, s ? (i.e = i.e - t + 1, r[0] = 1) : r[0] = i.e = 0;
  else if (t < r.length) {
    if (s = e === 1 && r[t] >= 5 || e === 2 && (r[t] > 5 || r[t] === 5 && (s || r[t + 1] !== A || r[t - 1] & 1)) || e === 3 && (s || !!r[0]), r.length = t, s) {
      for (; ++r[--t] > 9; )
        if (r[t] = 0, t === 0) {
          ++i.e, r.unshift(1);
          break;
        }
    }
    for (t = r.length; !r[--t]; ) r.pop();
  }
  return i;
}
function C(i, t, e) {
  var s = i.e, r = i.c.join(""), n = r.length;
  if (t)
    r = r.charAt(0) + (n > 1 ? "." + r.slice(1) : "") + (s < 0 ? "e" : "e+") + s;
  else if (s < 0) {
    for (; ++s; ) r = "0" + r;
    r = "0." + r;
  } else if (s > 0)
    if (++s > n)
      for (s -= n; s--; ) r += "0";
    else s < n && (r = r.slice(0, s) + "." + r.slice(s));
  else n > 1 && (r = r.charAt(0) + "." + r.slice(1));
  return i.s < 0 && e ? "-" + r : r;
}
u.abs = function() {
  var i = new this.constructor(this);
  return i.s = 1, i;
};
u.cmp = function(i) {
  var t, e = this, s = e.c, r = (i = new e.constructor(i)).c, n = e.s, o = i.s, c = e.e, h = i.e;
  if (!s[0] || !r[0]) return s[0] ? n : r[0] ? -o : 0;
  if (n != o) return n;
  if (t = n < 0, c != h) return c > h ^ t ? 1 : -1;
  for (o = (c = s.length) < (h = r.length) ? c : h, n = -1; ++n < o; )
    if (s[n] != r[n]) return s[n] > r[n] ^ t ? 1 : -1;
  return c == h ? 0 : c > h ^ t ? 1 : -1;
};
u.div = function(i) {
  var t = this, e = t.constructor, s = t.c, r = (i = new e(i)).c, n = t.s == i.s ? 1 : -1, o = e.DP;
  if (o !== ~~o || o < 0 || o > S)
    throw Error(F);
  if (!r[0])
    throw Error(_t);
  if (!s[0])
    return i.s = n, i.c = [i.e = 0], i;
  var c, h, l, f, a, p = r.slice(), _ = c = r.length, M = s.length, d = s.slice(0, c), g = d.length, N = i, Z = N.c = [], K = 0, H = o + (N.e = t.e - i.e) + 1;
  for (N.s = n, n = H < 0 ? 0 : H, p.unshift(0); g++ < c; ) d.push(0);
  do {
    for (l = 0; l < 10; l++) {
      if (c != (g = d.length))
        f = c > g ? 1 : -1;
      else
        for (a = -1, f = 0; ++a < c; )
          if (r[a] != d[a]) {
            f = r[a] > d[a] ? 1 : -1;
            break;
          }
      if (f < 0) {
        for (h = g == c ? r : p; g; ) {
          if (d[--g] < h[g]) {
            for (a = g; a && !d[--a]; ) d[a] = 9;
            --d[a], d[g] += 10;
          }
          d[g] -= h[g];
        }
        for (; !d[0]; ) d.shift();
      } else
        break;
    }
    Z[K++] = f ? l : ++l, d[0] && f ? d[g] = s[_] || 0 : d = [s[_]];
  } while ((_++ < M || d[0] !== A) && n--);
  return !Z[0] && K != 1 && (Z.shift(), N.e--, H--), K > H && x(N, H, e.RM, d[0] !== A), N;
};
u.eq = function(i) {
  return this.cmp(i) === 0;
};
u.gt = function(i) {
  return this.cmp(i) > 0;
};
u.gte = function(i) {
  return this.cmp(i) > -1;
};
u.lt = function(i) {
  return this.cmp(i) < 0;
};
u.lte = function(i) {
  return this.cmp(i) < 1;
};
u.minus = u.sub = function(i) {
  var t, e, s, r, n = this, o = n.constructor, c = n.s, h = (i = new o(i)).s;
  if (c != h)
    return i.s = -h, n.plus(i);
  var l = n.c.slice(), f = n.e, a = i.c, p = i.e;
  if (!l[0] || !a[0])
    return a[0] ? i.s = -h : l[0] ? i = new o(n) : i.s = 1, i;
  if (c = f - p) {
    for ((r = c < 0) ? (c = -c, s = l) : (p = f, s = a), s.reverse(), h = c; h--; ) s.push(0);
    s.reverse();
  } else
    for (e = ((r = l.length < a.length) ? l : a).length, c = h = 0; h < e; h++)
      if (l[h] != a[h]) {
        r = l[h] < a[h];
        break;
      }
  if (r && (s = l, l = a, a = s, i.s = -i.s), (h = (e = a.length) - (t = l.length)) > 0) for (; h--; ) l[t++] = 0;
  for (h = t; e > c; ) {
    if (l[--e] < a[e]) {
      for (t = e; t && !l[--t]; ) l[t] = 9;
      --l[t], l[e] += 10;
    }
    l[e] -= a[e];
  }
  for (; l[--h] === 0; ) l.pop();
  for (; l[0] === 0; )
    l.shift(), --p;
  return l[0] || (i.s = 1, l = [p = 0]), i.c = l, i.e = p, i;
};
u.mod = function(i) {
  var t, e = this, s = e.constructor, r = e.s, n = (i = new s(i)).s;
  if (!i.c[0])
    throw Error(_t);
  return e.s = i.s = 1, t = i.cmp(e) == 1, e.s = r, i.s = n, t ? new s(e) : (r = s.DP, n = s.RM, s.DP = s.RM = 0, e = e.div(i), s.DP = r, s.RM = n, this.minus(e.times(i)));
};
u.neg = function() {
  var i = new this.constructor(this);
  return i.s = -i.s, i;
};
u.plus = u.add = function(i) {
  var t, e, s, r = this, n = r.constructor;
  if (i = new n(i), r.s != i.s)
    return i.s = -i.s, r.minus(i);
  var o = r.e, c = r.c, h = i.e, l = i.c;
  if (!c[0] || !l[0])
    return l[0] || (c[0] ? i = new n(r) : i.s = r.s), i;
  if (c = c.slice(), t = o - h) {
    for (t > 0 ? (h = o, s = l) : (t = -t, s = c), s.reverse(); t--; ) s.push(0);
    s.reverse();
  }
  for (c.length - l.length < 0 && (s = l, l = c, c = s), t = l.length, e = 0; t; c[t] %= 10) e = (c[--t] = c[t] + l[t] + e) / 10 | 0;
  for (e && (c.unshift(e), ++h), t = c.length; c[--t] === 0; ) c.pop();
  return i.c = c, i.e = h, i;
};
u.pow = function(i) {
  var t = this, e = new t.constructor("1"), s = e, r = i < 0;
  if (i !== ~~i || i < -rt || i > rt)
    throw Error(P + "exponent");
  for (r && (i = -i); i & 1 && (s = s.times(t)), i >>= 1, !!i; )
    t = t.times(t);
  return r ? e.div(s) : s;
};
u.prec = function(i, t) {
  if (i !== ~~i || i < 1 || i > S)
    throw Error(P + "precision");
  return x(new this.constructor(this), i, t);
};
u.round = function(i, t) {
  if (i === A) i = 0;
  else if (i !== ~~i || i < -S || i > S)
    throw Error(F);
  return x(new this.constructor(this), i + this.e + 1, t);
};
u.sqrt = function() {
  var i, t, e, s = this, r = s.constructor, n = s.s, o = s.e, c = new r("0.5");
  if (!s.c[0]) return new r(s);
  if (n < 0)
    throw Error(L + "No square root");
  n = Math.sqrt(+C(s, !0, !0)), n === 0 || n === 1 / 0 ? (t = s.c.join(""), t.length + o & 1 || (t += "0"), n = Math.sqrt(t), o = ((o + 1) / 2 | 0) - (o < 0 || o & 1), i = new r((n == 1 / 0 ? "5e" : (n = n.toExponential()).slice(0, n.indexOf("e") + 1)) + o)) : i = new r(n + ""), o = i.e + (r.DP += 4);
  do
    e = i, i = c.times(e.plus(s.div(e)));
  while (e.c.slice(0, o).join("") !== i.c.slice(0, o).join(""));
  return x(i, (r.DP -= 4) + i.e + 1, r.RM);
};
u.times = u.mul = function(i) {
  var t, e = this, s = e.constructor, r = e.c, n = (i = new s(i)).c, o = r.length, c = n.length, h = e.e, l = i.e;
  if (i.s = e.s == i.s ? 1 : -1, !r[0] || !n[0])
    return i.c = [i.e = 0], i;
  for (i.e = h + l, o < c && (t = r, r = n, n = t, l = o, o = c, c = l), t = new Array(l = o + c); l--; ) t[l] = 0;
  for (h = c; h--; ) {
    for (c = 0, l = o + h; l > h; )
      c = t[l] + n[h] * r[l - h - 1] + c, t[l--] = c % 10, c = c / 10 | 0;
    t[l] = c;
  }
  for (c ? ++i.e : t.shift(), h = t.length; !t[--h]; ) t.pop();
  return i.c = t, i;
};
u.toExponential = function(i, t) {
  var e = this, s = e.c[0];
  if (i !== A) {
    if (i !== ~~i || i < 0 || i > S)
      throw Error(F);
    for (e = x(new e.constructor(e), ++i, t); e.c.length < i; ) e.c.push(0);
  }
  return C(e, !0, !!s);
};
u.toFixed = function(i, t) {
  var e = this, s = e.c[0];
  if (i !== A) {
    if (i !== ~~i || i < 0 || i > S)
      throw Error(F);
    for (e = x(new e.constructor(e), i + e.e + 1, t), i = i + e.e + 1; e.c.length < i; ) e.c.push(0);
  }
  return C(e, !1, !!s);
};
u[Symbol.for("nodejs.util.inspect.custom")] = u.toJSON = u.toString = function() {
  var i = this, t = i.constructor;
  return C(i, i.e <= t.NE || i.e >= t.PE, !!i.c[0]);
};
u.toNumber = function() {
  var i = +C(this, !0, !0);
  if (this.constructor.strict === !0 && !this.eq(i.toString()))
    throw Error(L + "Imprecise conversion");
  return i;
};
u.toPrecision = function(i, t) {
  var e = this, s = e.constructor, r = e.c[0];
  if (i !== A) {
    if (i !== ~~i || i < 1 || i > S)
      throw Error(P + "precision");
    for (e = x(new s(e), i, t); e.c.length < i; ) e.c.push(0);
  }
  return C(e, i <= e.e || e.e <= s.NE || e.e >= s.PE, !!r);
};
u.valueOf = function() {
  var i = this, t = i.constructor;
  if (t.strict === !0)
    throw Error(L + "valueOf disallowed");
  return C(i, i.e <= t.NE || i.e >= t.PE, !0);
};
var Yt = gt();
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const q = globalThis, et = q.ShadowRoot && (q.ShadyCSS === void 0 || q.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, it = Symbol(), nt = /* @__PURE__ */ new WeakMap();
let At = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== it) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (et && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = nt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && nt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Rt = (i) => new At(typeof i == "string" ? i : i + "", void 0, it), Qt = (i, ...t) => {
  const e = i.length === 1 ? i[0] : t.reduce((s, r, n) => s + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + i[n + 1], i[0]);
  return new At(e, i, it);
}, Ht = (i, t) => {
  if (et) i.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), r = q.litNonce;
    r !== void 0 && s.setAttribute("nonce", r), s.textContent = e.cssText, i.appendChild(s);
  }
}, ot = et ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return Rt(e);
})(i) : i;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Tt, defineProperty: Dt, getOwnPropertyDescriptor: kt, getOwnPropertyNames: Bt, getOwnPropertySymbols: It, getPrototypeOf: jt } = Object, m = globalThis, ht = m.trustedTypes, Lt = ht ? ht.emptyScript : "", X = m.reactiveElementPolyfillSupport, D = (i, t) => i, tt = { toAttribute(i, t) {
  switch (t) {
    case Boolean:
      i = i ? Lt : null;
      break;
    case Object:
    case Array:
      i = i == null ? i : JSON.stringify(i);
  }
  return i;
}, fromAttribute(i, t) {
  let e = i;
  switch (t) {
    case Boolean:
      e = i !== null;
      break;
    case Number:
      e = i === null ? null : Number(i);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(i);
      } catch {
        e = null;
      }
  }
  return e;
} }, vt = (i, t) => !Tt(i, t), ct = { attribute: !0, type: String, converter: tt, reflect: !1, useDefault: !1, hasChanged: vt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), m.litPropertyMetadata ?? (m.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let U = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = ct) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), r = this.getPropertyDescriptor(t, s, e);
      r !== void 0 && Dt(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: r, set: n } = kt(this.prototype, t) ?? { get() {
      return this[e];
    }, set(o) {
      this[e] = o;
    } };
    return { get: r, set(o) {
      const c = r == null ? void 0 : r.call(this);
      n == null || n.call(this, o), this.requestUpdate(t, c, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? ct;
  }
  static _$Ei() {
    if (this.hasOwnProperty(D("elementProperties"))) return;
    const t = jt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(D("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(D("properties"))) {
      const e = this.properties, s = [...Bt(e), ...It(e)];
      for (const r of s) this.createProperty(r, e[r]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [s, r] of e) this.elementProperties.set(s, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, s] of this.elementProperties) {
      const r = this._$Eu(e, s);
      r !== void 0 && this._$Eh.set(r, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const r of s) e.unshift(ot(r));
    } else t !== void 0 && e.push(ot(t));
    return e;
  }
  static _$Eu(t, e) {
    const s = e.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((e) => e(this));
  }
  addController(t) {
    var e;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && ((e = t.hostConnected) == null || e.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$EO) == null || e.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const s of e.keys()) this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Ht(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((e) => {
      var s;
      return (s = e.hostConnected) == null ? void 0 : s.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((e) => {
      var s;
      return (s = e.hostDisconnected) == null ? void 0 : s.call(e);
    });
  }
  attributeChangedCallback(t, e, s) {
    this._$AK(t, s);
  }
  _$ET(t, e) {
    var n;
    const s = this.constructor.elementProperties.get(t), r = this.constructor._$Eu(t, s);
    if (r !== void 0 && s.reflect === !0) {
      const o = (((n = s.converter) == null ? void 0 : n.toAttribute) !== void 0 ? s.converter : tt).toAttribute(e, s.type);
      this._$Em = t, o == null ? this.removeAttribute(r) : this.setAttribute(r, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var n, o;
    const s = this.constructor, r = s._$Eh.get(t);
    if (r !== void 0 && this._$Em !== r) {
      const c = s.getPropertyOptions(r), h = typeof c.converter == "function" ? { fromAttribute: c.converter } : ((n = c.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? c.converter : tt;
      this._$Em = r;
      const l = h.fromAttribute(e, c.type);
      this[r] = l ?? ((o = this._$Ej) == null ? void 0 : o.get(r)) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, e, s) {
    var r;
    if (t !== void 0) {
      const n = this.constructor, o = this[t];
      if (s ?? (s = n.getPropertyOptions(t)), !((s.hasChanged ?? vt)(o, e) || s.useDefault && s.reflect && o === ((r = this._$Ej) == null ? void 0 : r.get(t)) && !this.hasAttribute(n._$Eu(t, s)))) return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: r, wrapped: n }, o) {
    s && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, o ?? e ?? this[t]), n !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), r === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var s;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [n, o] of this._$Ep) this[n] = o;
        this._$Ep = void 0;
      }
      const r = this.constructor.elementProperties;
      if (r.size > 0) for (const [n, o] of r) {
        const { wrapped: c } = o, h = this[n];
        c !== !0 || this._$AL.has(n) || h === void 0 || this.C(n, void 0, o, h);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (s = this._$EO) == null || s.forEach((r) => {
        var n;
        return (n = r.hostUpdate) == null ? void 0 : n.call(r);
      }), this.update(e)) : this._$EM();
    } catch (r) {
      throw t = !1, this._$EM(), r;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$EO) == null || e.forEach((s) => {
      var r;
      return (r = s.hostUpdated) == null ? void 0 : r.call(s);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((e) => this._$ET(e, this[e]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
U.elementStyles = [], U.shadowRootOptions = { mode: "open" }, U[D("elementProperties")] = /* @__PURE__ */ new Map(), U[D("finalized")] = /* @__PURE__ */ new Map(), X == null || X({ ReactiveElement: U }), (m.reactiveElementVersions ?? (m.reactiveElementVersions = [])).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const k = globalThis, W = k.trustedTypes, lt = W ? W.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, mt = "$lit$", v = `lit$${Math.random().toFixed(9).slice(2)}$`, Et = "?" + v, zt = `<${Et}>`, y = document, B = () => y.createComment(""), I = (i) => i === null || typeof i != "object" && typeof i != "function", st = Array.isArray, qt = (i) => st(i) || typeof (i == null ? void 0 : i[Symbol.iterator]) == "function", Y = `[ 	
\f\r]`, T = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, at = /-->/g, ut = />/g, E = RegExp(`>|${Y}(?:([^\\s"'>=/]+)(${Y}*=${Y}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ft = /'/g, pt = /"/g, wt = /^(?:script|style|textarea|title)$/i, bt = (i) => (t, ...e) => ({ _$litType$: i, strings: t, values: e }), ee = bt(1), ie = bt(2), O = Symbol.for("lit-noChange"), $ = Symbol.for("lit-nothing"), dt = /* @__PURE__ */ new WeakMap(), w = y.createTreeWalker(y, 129);
function St(i, t) {
  if (!st(i) || !i.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return lt !== void 0 ? lt.createHTML(t) : t;
}
const Vt = (i, t) => {
  const e = i.length - 1, s = [];
  let r, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = T;
  for (let c = 0; c < e; c++) {
    const h = i[c];
    let l, f, a = -1, p = 0;
    for (; p < h.length && (o.lastIndex = p, f = o.exec(h), f !== null); ) p = o.lastIndex, o === T ? f[1] === "!--" ? o = at : f[1] !== void 0 ? o = ut : f[2] !== void 0 ? (wt.test(f[2]) && (r = RegExp("</" + f[2], "g")), o = E) : f[3] !== void 0 && (o = E) : o === E ? f[0] === ">" ? (o = r ?? T, a = -1) : f[1] === void 0 ? a = -2 : (a = o.lastIndex - f[2].length, l = f[1], o = f[3] === void 0 ? E : f[3] === '"' ? pt : ft) : o === pt || o === ft ? o = E : o === at || o === ut ? o = T : (o = E, r = void 0);
    const _ = o === E && i[c + 1].startsWith("/>") ? " " : "";
    n += o === T ? h + zt : a >= 0 ? (s.push(l), h.slice(0, a) + mt + h.slice(a) + v + _) : h + v + (a === -2 ? c : _);
  }
  return [St(i, n + (i[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class j {
  constructor({ strings: t, _$litType$: e }, s) {
    let r;
    this.parts = [];
    let n = 0, o = 0;
    const c = t.length - 1, h = this.parts, [l, f] = Vt(t, e);
    if (this.el = j.createElement(l, s), w.currentNode = this.el.content, e === 2 || e === 3) {
      const a = this.el.content.firstChild;
      a.replaceWith(...a.childNodes);
    }
    for (; (r = w.nextNode()) !== null && h.length < c; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const a of r.getAttributeNames()) if (a.endsWith(mt)) {
          const p = f[o++], _ = r.getAttribute(a).split(v), M = /([.?@])?(.*)/.exec(p);
          h.push({ type: 1, index: n, name: M[2], strings: _, ctor: M[1] === "." ? Ft : M[1] === "?" ? Jt : M[1] === "@" ? Zt : J }), r.removeAttribute(a);
        } else a.startsWith(v) && (h.push({ type: 6, index: n }), r.removeAttribute(a));
        if (wt.test(r.tagName)) {
          const a = r.textContent.split(v), p = a.length - 1;
          if (p > 0) {
            r.textContent = W ? W.emptyScript : "";
            for (let _ = 0; _ < p; _++) r.append(a[_], B()), w.nextNode(), h.push({ type: 2, index: ++n });
            r.append(a[p], B());
          }
        }
      } else if (r.nodeType === 8) if (r.data === Et) h.push({ type: 2, index: n });
      else {
        let a = -1;
        for (; (a = r.data.indexOf(v, a + 1)) !== -1; ) h.push({ type: 7, index: n }), a += v.length - 1;
      }
      n++;
    }
  }
  static createElement(t, e) {
    const s = y.createElement("template");
    return s.innerHTML = t, s;
  }
}
function R(i, t, e = i, s) {
  var o, c;
  if (t === O) return t;
  let r = s !== void 0 ? (o = e._$Co) == null ? void 0 : o[s] : e._$Cl;
  const n = I(t) ? void 0 : t._$litDirective$;
  return (r == null ? void 0 : r.constructor) !== n && ((c = r == null ? void 0 : r._$AO) == null || c.call(r, !1), n === void 0 ? r = void 0 : (r = new n(i), r._$AT(i, e, s)), s !== void 0 ? (e._$Co ?? (e._$Co = []))[s] = r : e._$Cl = r), r !== void 0 && (t = R(i, r._$AS(i, t.values), r, s)), t;
}
class Wt {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: s } = this._$AD, r = ((t == null ? void 0 : t.creationScope) ?? y).importNode(e, !0);
    w.currentNode = r;
    let n = w.nextNode(), o = 0, c = 0, h = s[0];
    for (; h !== void 0; ) {
      if (o === h.index) {
        let l;
        h.type === 2 ? l = new z(n, n.nextSibling, this, t) : h.type === 1 ? l = new h.ctor(n, h.name, h.strings, this, t) : h.type === 6 && (l = new Kt(n, this, t)), this._$AV.push(l), h = s[++c];
      }
      o !== (h == null ? void 0 : h.index) && (n = w.nextNode(), o++);
    }
    return w.currentNode = y, r;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class z {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, s, r) {
    this.type = 2, this._$AH = $, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = r, this._$Cv = (r == null ? void 0 : r.isConnected) ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = R(this, t, e), I(t) ? t === $ || t == null || t === "" ? (this._$AH !== $ && this._$AR(), this._$AH = $) : t !== this._$AH && t !== O && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : qt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== $ && I(this._$AH) ? this._$AA.nextSibling.data = t : this.T(y.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var n;
    const { values: e, _$litType$: s } = t, r = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = j.createElement(St(s.h, s.h[0]), this.options)), s);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === r) this._$AH.p(e);
    else {
      const o = new Wt(r, this), c = o.u(this.options);
      o.p(e), this.T(c), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = dt.get(t.strings);
    return e === void 0 && dt.set(t.strings, e = new j(t)), e;
  }
  k(t) {
    st(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, r = 0;
    for (const n of t) r === e.length ? e.push(s = new z(this.O(B()), this.O(B()), this, this.options)) : s = e[r], s._$AI(n), r++;
    r < e.length && (this._$AR(s && s._$AB.nextSibling, r), e.length = r);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, e); t !== this._$AB; ) {
      const r = t.nextSibling;
      t.remove(), t = r;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class J {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, r, n) {
    this.type = 1, this._$AH = $, this._$AN = void 0, this.element = t, this.name = e, this._$AM = r, this.options = n, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = $;
  }
  _$AI(t, e = this, s, r) {
    const n = this.strings;
    let o = !1;
    if (n === void 0) t = R(this, t, e, 0), o = !I(t) || t !== this._$AH && t !== O, o && (this._$AH = t);
    else {
      const c = t;
      let h, l;
      for (t = n[0], h = 0; h < n.length - 1; h++) l = R(this, c[s + h], e, h), l === O && (l = this._$AH[h]), o || (o = !I(l) || l !== this._$AH[h]), l === $ ? t = $ : t !== $ && (t += (l ?? "") + n[h + 1]), this._$AH[h] = l;
    }
    o && !r && this.j(t);
  }
  j(t) {
    t === $ ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Ft extends J {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === $ ? void 0 : t;
  }
}
class Jt extends J {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== $);
  }
}
class Zt extends J {
  constructor(t, e, s, r, n) {
    super(t, e, s, r, n), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = R(this, t, e, 0) ?? $) === O) return;
    const s = this._$AH, r = t === $ && s !== $ || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, n = t !== $ && (s === $ || r);
    r && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Kt {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    R(this, t);
  }
}
const G = k.litHtmlPolyfillSupport;
G == null || G(j, z), (k.litHtmlVersions ?? (k.litHtmlVersions = [])).push("3.3.1");
const Xt = (i, t, e) => {
  const s = (e == null ? void 0 : e.renderBefore) ?? t;
  let r = s._$litPart$;
  if (r === void 0) {
    const n = (e == null ? void 0 : e.renderBefore) ?? null;
    s._$litPart$ = r = new z(t.insertBefore(B(), n), n, void 0, e ?? {});
  }
  return r._$AI(i), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const b = globalThis;
class V extends U {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var e;
    const t = super.createRenderRoot();
    return (e = this.renderOptions).renderBefore ?? (e.renderBefore = t.firstChild), t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Xt(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) == null || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) == null || t.setConnected(!1);
  }
  render() {
    return O;
  }
}
var $t;
V._$litElement$ = !0, V.finalized = !0, ($t = b.litElementHydrateSupport) == null || $t.call(b, { LitElement: V });
const Q = b.litElementPolyfillSupport;
Q == null || Q({ LitElement: V });
(b.litElementVersions ?? (b.litElementVersions = [])).push("4.2.1");
export {
  Yt as B,
  $ as E,
  O as T,
  V as a,
  ie as b,
  vt as f,
  Qt as i,
  Rt as r,
  tt as u,
  ee as x
};
