import { I as qn, b as El, g as Jp, c as B, a as $n, C as Xp, d as Pu, e as Qp, f as ef, s as Ja, h as Wn, i as Qr, k as Hn, A as Bc, E as At, j as tf, l as sf, y as Xt, m as Br, r as zn, O as Fc, o as ds, n as rf, p as jc, q as qc, t as ra, N as Wc, P as bl, Q as nf, u as of, v as af, w as vl, x as Nn, z as Ou, B as Vs, D as xs, F as sr, G as Ss } from "./index-Dn6P_e89.js";
import { formatUnits as cf, recoverAddress as lf, fallback as Cl, http as io, toHex as _l } from "viem";
import { B as df, T as uf } from "./lit-html-jz-94mx9.js";
/*! scure-base - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function hf(s) {
  return s instanceof Uint8Array || ArrayBuffer.isView(s) && s.constructor.name === "Uint8Array";
}
function xu(s, e) {
  return Array.isArray(e) ? e.length === 0 ? !0 : s ? e.every((t) => typeof t == "string") : e.every((t) => Number.isSafeInteger(t)) : !1;
}
function Do(s, e) {
  if (typeof e != "string")
    throw new Error(`${s}: string expected`);
  return !0;
}
function Hc(s) {
  if (!Number.isSafeInteger(s))
    throw new Error(`invalid integer: ${s}`);
}
function Xa(s) {
  if (!Array.isArray(s))
    throw new Error("array expected");
}
function $o(s, e) {
  if (!xu(!0, e))
    throw new Error(`${s}: array of strings expected`);
}
function pf(s, e) {
  if (!xu(!1, e))
    throw new Error(`${s}: array of numbers expected`);
}
// @__NO_SIDE_EFFECTS__
function ff(...s) {
  const e = (i) => i, t = (i, o) => (a) => i(o(a)), r = s.map((i) => i.encode).reduceRight(t, e), n = s.map((i) => i.decode).reduce(t, e);
  return { encode: r, decode: n };
}
// @__NO_SIDE_EFFECTS__
function gf(s) {
  const e = typeof s == "string" ? s.split("") : s, t = e.length;
  $o("alphabet", e);
  const r = new Map(e.map((n, i) => [n, i]));
  return {
    encode: (n) => (Xa(n), n.map((i) => {
      if (!Number.isSafeInteger(i) || i < 0 || i >= t)
        throw new Error(`alphabet.encode: digit index outside alphabet "${i}". Allowed: ${s}`);
      return e[i];
    })),
    decode: (n) => (Xa(n), n.map((i) => {
      Do("alphabet.decode", i);
      const o = r.get(i);
      if (o === void 0)
        throw new Error(`Unknown letter: "${i}". Allowed: ${s}`);
      return o;
    }))
  };
}
// @__NO_SIDE_EFFECTS__
function mf(s = "") {
  return Do("join", s), {
    encode: (e) => ($o("join.decode", e), e.join(s)),
    decode: (e) => (Do("join.decode", e), e.split(s))
  };
}
// @__NO_SIDE_EFFECTS__
function wf(s, e = "=") {
  return Hc(s), Do("padding", e), {
    encode(t) {
      for ($o("padding.encode", t); t.length * s % 8; )
        t.push(e);
      return t;
    },
    decode(t) {
      $o("padding.decode", t);
      let r = t.length;
      if (r * s % 8)
        throw new Error("padding: invalid, string should have whole number of bytes");
      for (; r > 0 && t[r - 1] === e; r--)
        if ((r - 1) * s % 8 === 0)
          throw new Error("padding: invalid, string has too much padding");
      return t.slice(0, r);
    }
  };
}
const ku = (s, e) => e === 0 ? s : ku(e, s % e), Lo = /* @__NO_SIDE_EFFECTS__ */ (s, e) => s + (e - ku(s, e)), wa = /* @__PURE__ */ (() => {
  let s = [];
  for (let e = 0; e < 40; e++)
    s.push(2 ** e);
  return s;
})();
function Al(s, e, t, r) {
  if (Xa(s), e <= 0 || e > 32)
    throw new Error(`convertRadix2: wrong from=${e}`);
  if (t <= 0 || t > 32)
    throw new Error(`convertRadix2: wrong to=${t}`);
  if (/* @__PURE__ */ Lo(e, t) > 32)
    throw new Error(`convertRadix2: carry overflow from=${e} to=${t} carryBits=${/* @__PURE__ */ Lo(e, t)}`);
  let n = 0, i = 0;
  const o = wa[e], a = wa[t] - 1, c = [];
  for (const l of s) {
    if (Hc(l), l >= o)
      throw new Error(`convertRadix2: invalid data word=${l} from=${e}`);
    if (n = n << e | l, i + e > 32)
      throw new Error(`convertRadix2: carry overflow pos=${i} from=${e}`);
    for (i += e; i >= t; i -= t)
      c.push((n >> i - t & a) >>> 0);
    const d = wa[i];
    if (d === void 0)
      throw new Error("invalid carry");
    n &= d - 1;
  }
  if (n = n << t - i & a, !r && i >= e)
    throw new Error("Excess padding");
  if (!r && n > 0)
    throw new Error(`Non-zero padding: ${n}`);
  return r && i > 0 && c.push(n >>> 0), c;
}
// @__NO_SIDE_EFFECTS__
function yf(s, e = !1) {
  if (Hc(s), s <= 0 || s > 32)
    throw new Error("radix2: bits should be in (0..32]");
  if (/* @__PURE__ */ Lo(8, s) > 32 || /* @__PURE__ */ Lo(s, 8) > 32)
    throw new Error("radix2: carry overflow");
  return {
    encode: (t) => {
      if (!hf(t))
        throw new Error("radix2.encode input should be Uint8Array");
      return Al(Array.from(t), 8, s, !e);
    },
    decode: (t) => (pf("radix2.decode", t), Uint8Array.from(Al(t, s, 8, e)))
  };
}
const Ef = /* @__PURE__ */ ff(/* @__PURE__ */ yf(5), /* @__PURE__ */ gf("ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"), /* @__PURE__ */ wf(5), /* @__PURE__ */ mf("")), bf = Symbol(), Il = Object.getPrototypeOf, Qa = /* @__PURE__ */ new WeakMap(), vf = (s) => s && (Qa.has(s) ? Qa.get(s) : Il(s) === Object.prototype || Il(s) === Array.prototype), Cf = (s) => vf(s) && s[bf] || null, Sl = (s, e = !0) => {
  Qa.set(s, e);
}, Mo = {}, ya = (s) => typeof s == "object" && s !== null, fr = /* @__PURE__ */ new WeakMap(), ui = /* @__PURE__ */ new WeakSet(), _f = (s = Object.is, e = (l, d) => new Proxy(l, d), t = (l) => ya(l) && !ui.has(l) && (Array.isArray(l) || !(Symbol.iterator in l)) && !(l instanceof WeakMap) && !(l instanceof WeakSet) && !(l instanceof Error) && !(l instanceof Number) && !(l instanceof Date) && !(l instanceof String) && !(l instanceof RegExp) && !(l instanceof ArrayBuffer), r = (l) => {
  switch (l.status) {
    case "fulfilled":
      return l.value;
    case "rejected":
      throw l.reason;
    default:
      throw l;
  }
}, n = /* @__PURE__ */ new WeakMap(), i = (l, d, u = r) => {
  const p = n.get(l);
  if ((p == null ? void 0 : p[0]) === d)
    return p[1];
  const g = Array.isArray(l) ? [] : Object.create(Object.getPrototypeOf(l));
  return Sl(g, !0), n.set(l, [d, g]), Reflect.ownKeys(l).forEach((w) => {
    if (Object.getOwnPropertyDescriptor(g, w))
      return;
    const m = Reflect.get(l, w), { enumerable: y } = Reflect.getOwnPropertyDescriptor(
      l,
      w
    ), C = {
      value: m,
      enumerable: y,
      // This is intentional to avoid copying with proxy-compare.
      // It's still non-writable, so it avoids assigning a value.
      configurable: !0
    };
    if (ui.has(m))
      Sl(m, !1);
    else if (m instanceof Promise)
      delete C.value, C.get = () => u(m);
    else if (fr.has(m)) {
      const [_, U] = fr.get(
        m
      );
      C.value = i(
        _,
        U(),
        u
      );
    }
    Object.defineProperty(g, w, C);
  }), Object.preventExtensions(g);
}, o = /* @__PURE__ */ new WeakMap(), a = [1, 1], c = (l) => {
  if (!ya(l))
    throw new Error("object required");
  const d = o.get(l);
  if (d)
    return d;
  let u = a[0];
  const p = /* @__PURE__ */ new Set(), g = (E, v = ++a[0]) => {
    u !== v && (u = v, p.forEach((b) => b(E, v)));
  };
  let w = a[1];
  const m = (E = ++a[1]) => (w !== E && !p.size && (w = E, C.forEach(([v]) => {
    const b = v[1](E);
    b > u && (u = b);
  })), u), y = (E) => (v, b) => {
    const A = [...v];
    A[1] = [E, ...A[1]], g(A, b);
  }, C = /* @__PURE__ */ new Map(), _ = (E, v) => {
    if ((Mo ? "production" : void 0) !== "production" && C.has(E))
      throw new Error("prop listener already exists");
    if (p.size) {
      const b = v[3](y(E));
      C.set(E, [v, b]);
    } else
      C.set(E, [v]);
  }, U = (E) => {
    var v;
    const b = C.get(E);
    b && (C.delete(E), (v = b[1]) == null || v.call(b));
  }, j = (E) => (p.add(E), p.size === 1 && C.forEach(([b, A], I) => {
    if ((Mo ? "production" : void 0) !== "production" && A)
      throw new Error("remove already exists");
    const x = b[3](y(I));
    C.set(I, [b, x]);
  }), () => {
    p.delete(E), p.size === 0 && C.forEach(([b, A], I) => {
      A && (A(), C.set(I, [b]));
    });
  }), P = Array.isArray(l) ? [] : Object.create(Object.getPrototypeOf(l)), se = e(P, {
    deleteProperty(E, v) {
      const b = Reflect.get(E, v);
      U(v);
      const A = Reflect.deleteProperty(E, v);
      return A && g(["delete", [v], b]), A;
    },
    set(E, v, b, A) {
      const I = Reflect.has(E, v), x = Reflect.get(E, v, A);
      if (I && (s(x, b) || o.has(b) && s(x, o.get(b))))
        return !0;
      U(v), ya(b) && (b = Cf(b) || b);
      let R = b;
      if (b instanceof Promise)
        b.then((O) => {
          b.status = "fulfilled", b.value = O, g(["resolve", [v], O]);
        }).catch((O) => {
          b.status = "rejected", b.reason = O, g(["reject", [v], O]);
        });
      else {
        !fr.has(b) && t(b) && (R = c(b));
        const O = !ui.has(R) && fr.get(R);
        O && _(v, O);
      }
      return Reflect.set(E, v, R, A), g(["set", [v], b, x]), !0;
    }
  });
  o.set(l, se);
  const K = [
    P,
    m,
    i,
    j
  ];
  return fr.set(se, K), Reflect.ownKeys(l).forEach((E) => {
    const v = Object.getOwnPropertyDescriptor(
      l,
      E
    );
    "value" in v && (se[E] = l[E], delete v.value, delete v.writable), Object.defineProperty(P, E, v);
  }), se;
}) => [
  // public functions
  c,
  // shared state
  fr,
  ui,
  // internal things
  s,
  e,
  t,
  r,
  n,
  i,
  o,
  a
], [Af] = _f();
function Ve(s = {}) {
  return Af(s);
}
function gt(s, e, t) {
  const r = fr.get(s);
  (Mo ? "production" : void 0) !== "production" && !r && console.warn("Please use proxy object");
  let n;
  const i = [], o = r[3];
  let a = !1;
  const l = o((d) => {
    i.push(d), n || (n = Promise.resolve().then(() => {
      n = void 0, a && e(i.splice(0));
    }));
  });
  return a = !0, () => {
    a = !1, l();
  };
}
function xi(s, e) {
  const t = fr.get(s);
  (Mo ? "production" : void 0) !== "production" && !t && console.warn("Please use proxy object");
  const [r, n, i] = t;
  return i(r, n(), e);
}
function Vr(s) {
  return ui.add(s), s;
}
function It(s, e, t, r) {
  let n = s[e];
  return gt(
    s,
    () => {
      const i = s[e];
      Object.is(n, i) || t(n = i);
    }
  );
}
function If(s) {
  const e = Ve({
    data: Array.from([]),
    has(t) {
      return this.data.some((r) => r[0] === t);
    },
    set(t, r) {
      const n = this.data.find((i) => i[0] === t);
      return n ? n[1] = r : this.data.push([t, r]), this;
    },
    get(t) {
      var r;
      return (r = this.data.find((n) => n[0] === t)) == null ? void 0 : r[1];
    },
    delete(t) {
      const r = this.data.findIndex((n) => n[0] === t);
      return r === -1 ? !1 : (this.data.splice(r, 1), !0);
    },
    clear() {
      this.data.splice(0);
    },
    get size() {
      return this.data.length;
    },
    toJSON() {
      return new Map(this.data);
    },
    forEach(t) {
      this.data.forEach((r) => {
        t(r[1], r[0], this);
      });
    },
    keys() {
      return this.data.map((t) => t[0]).values();
    },
    values() {
      return this.data.map((t) => t[1]).values();
    },
    entries() {
      return new Map(this.data).entries();
    },
    get [Symbol.toStringTag]() {
      return "Map";
    },
    [Symbol.iterator]() {
      return this.entries();
    }
  });
  return Object.defineProperties(e, {
    data: {
      enumerable: !1
    },
    size: {
      enumerable: !1
    },
    toJSON: {
      enumerable: !1
    }
  }), Object.seal(e), e;
}
const N = {
  WC_NAME_SUFFIX: ".reown.id",
  WC_NAME_SUFFIX_LEGACY: ".wcn.id",
  BLOCKCHAIN_API_RPC_URL: "https://rpc.walletconnect.org",
  PULSE_API_URL: "https://pulse.walletconnect.org",
  W3M_API_URL: "https://api.web3modal.org",
  CONNECTOR_ID: {
    WALLET_CONNECT: "walletConnect",
    INJECTED: "injected",
    WALLET_STANDARD: "announced",
    COINBASE: "coinbaseWallet",
    COINBASE_SDK: "coinbaseWalletSDK",
    SAFE: "safe",
    LEDGER: "ledger",
    OKX: "okx",
    EIP6963: "eip6963",
    AUTH: "ID_AUTH"
  },
  CONNECTOR_NAMES: {
    AUTH: "Auth"
  },
  AUTH_CONNECTOR_SUPPORTED_CHAINS: ["eip155", "solana"],
  LIMITS: {
    PENDING_TRANSACTIONS: 99
  },
  CHAIN: {
    EVM: "eip155",
    SOLANA: "solana",
    POLKADOT: "polkadot",
    BITCOIN: "bip122"
  },
  CHAIN_NAME_MAP: {
    eip155: "EVM Networks",
    solana: "Solana",
    polkadot: "Polkadot",
    bip122: "Bitcoin",
    cosmos: "Cosmos"
  },
  ADAPTER_TYPES: {
    BITCOIN: "bitcoin",
    SOLANA: "solana",
    WAGMI: "wagmi",
    ETHERS: "ethers",
    ETHERS5: "ethers5"
  },
  USDT_CONTRACT_ADDRESSES: [
    "0xdac17f958d2ee523a2206206994597c13d831ec7",
    "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
    "0x9702230a8ea53601f5cd2dc00fdbc13d4df4a8c7",
    "0x919C1c267BC06a7039e03fcc2eF738525769109c",
    "0x48065fbBE25f71C9282ddf5e1cD6D6A887483D5e",
    "0x55d398326f99059fF775485246999027B3197955",
    "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9"
  ],
  HTTP_STATUS_CODES: {
    SERVER_ERROR: 500,
    TOO_MANY_REQUESTS: 429,
    SERVICE_UNAVAILABLE: 503,
    FORBIDDEN: 403
  },
  UNSUPPORTED_NETWORK_NAME: "Unknown Network",
  SECURE_SITE_SDK_ORIGIN: (typeof process < "u" && typeof process.env < "u" ? process.env.NEXT_PUBLIC_SECURE_SITE_ORIGIN : void 0) || "https://secure.walletconnect.org",
  REMOTE_FEATURES_ALERTS: {
    MULTI_WALLET_NOT_ENABLED: {
      DEFAULT: {
        shortMessage: "Multi-Wallet Not Enabled",
        longMessage: "Multi-wallet support is not enabled. Please enable it in your AppKit configuration at cloud.reown.com."
      },
      CONNECTIONS_HOOK: {
        shortMessage: "Multi-Wallet Not Enabled",
        longMessage: "Multi-wallet support is not enabled. Please enable it in your AppKit configuration at cloud.reown.com to use the useAppKitConnections hook."
      },
      CONNECTION_HOOK: {
        shortMessage: "Multi-Wallet Not Enabled",
        longMessage: "Multi-wallet support is not enabled. Please enable it in your AppKit configuration at cloud.reown.com to use the useAppKitConnection hook."
      }
    }
  }
}, Uu = {
  caipNetworkIdToNumber(s) {
    return s ? Number(s.split(":")[1]) : void 0;
  },
  parseEvmChainId(s) {
    return typeof s == "string" ? this.caipNetworkIdToNumber(s) : s;
  },
  getNetworksByNamespace(s, e) {
    return (s == null ? void 0 : s.filter((t) => t.chainNamespace === e)) || [];
  },
  getFirstNetworkByNamespace(s, e) {
    return this.getNetworksByNamespace(s, e)[0];
  },
  getNetworkNameByCaipNetworkId(s, e) {
    var n;
    if (!e)
      return;
    const t = s.find((i) => i.caipNetworkId === e);
    if (t)
      return t.name;
    const [r] = e.split(":");
    return ((n = N.CHAIN_NAME_MAP) == null ? void 0 : n[r]) || void 0;
  }
};
var Sf = 20, Nf = 1, Kr = 1e6, Nl = 1e6, Tf = -7, Rf = 21, Pf = !1, Zi = "[big.js] ", en = Zi + "Invalid ", na = en + "decimal places", Of = en + "rounding mode", Du = Zi + "Division by zero", Le = {}, Ds = void 0, xf = /^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i;
function $u() {
  function s(e) {
    var t = this;
    if (!(t instanceof s)) return e === Ds ? $u() : new s(e);
    if (e instanceof s)
      t.s = e.s, t.e = e.e, t.c = e.c.slice();
    else {
      if (typeof e != "string") {
        if (s.strict === !0 && typeof e != "bigint")
          throw TypeError(en + "value");
        e = e === 0 && 1 / e < 0 ? "-0" : String(e);
      }
      kf(t, e);
    }
    t.constructor = s;
  }
  return s.prototype = Le, s.DP = Sf, s.RM = Nf, s.NE = Tf, s.PE = Rf, s.strict = Pf, s.roundDown = 0, s.roundHalfUp = 1, s.roundHalfEven = 2, s.roundUp = 3, s;
}
function kf(s, e) {
  var t, r, n;
  if (!xf.test(e))
    throw Error(en + "number");
  for (s.s = e.charAt(0) == "-" ? (e = e.slice(1), -1) : 1, (t = e.indexOf(".")) > -1 && (e = e.replace(".", "")), (r = e.search(/e/i)) > 0 ? (t < 0 && (t = r), t += +e.slice(r + 1), e = e.substring(0, r)) : t < 0 && (t = e.length), n = e.length, r = 0; r < n && e.charAt(r) == "0"; ) ++r;
  if (r == n)
    s.c = [s.e = 0];
  else {
    for (; n > 0 && e.charAt(--n) == "0"; ) ;
    for (s.e = t - r - 1, s.c = [], t = 0; r <= n; ) s.c[t++] = +e.charAt(r++);
  }
  return s;
}
function tn(s, e, t, r) {
  var n = s.c;
  if (t === Ds && (t = s.constructor.RM), t !== 0 && t !== 1 && t !== 2 && t !== 3)
    throw Error(Of);
  if (e < 1)
    r = t === 3 && (r || !!n[0]) || e === 0 && (t === 1 && n[0] >= 5 || t === 2 && (n[0] > 5 || n[0] === 5 && (r || n[1] !== Ds))), n.length = 1, r ? (s.e = s.e - e + 1, n[0] = 1) : n[0] = s.e = 0;
  else if (e < n.length) {
    if (r = t === 1 && n[e] >= 5 || t === 2 && (n[e] > 5 || n[e] === 5 && (r || n[e + 1] !== Ds || n[e - 1] & 1)) || t === 3 && (r || !!n[0]), n.length = e, r) {
      for (; ++n[--e] > 9; )
        if (n[e] = 0, e === 0) {
          ++s.e, n.unshift(1);
          break;
        }
    }
    for (e = n.length; !n[--e]; ) n.pop();
  }
  return s;
}
function sn(s, e, t) {
  var r = s.e, n = s.c.join(""), i = n.length;
  if (e)
    n = n.charAt(0) + (i > 1 ? "." + n.slice(1) : "") + (r < 0 ? "e" : "e+") + r;
  else if (r < 0) {
    for (; ++r; ) n = "0" + n;
    n = "0." + n;
  } else if (r > 0)
    if (++r > i)
      for (r -= i; r--; ) n += "0";
    else r < i && (n = n.slice(0, r) + "." + n.slice(r));
  else i > 1 && (n = n.charAt(0) + "." + n.slice(1));
  return s.s < 0 && t ? "-" + n : n;
}
Le.abs = function() {
  var s = new this.constructor(this);
  return s.s = 1, s;
};
Le.cmp = function(s) {
  var e, t = this, r = t.c, n = (s = new t.constructor(s)).c, i = t.s, o = s.s, a = t.e, c = s.e;
  if (!r[0] || !n[0]) return r[0] ? i : n[0] ? -o : 0;
  if (i != o) return i;
  if (e = i < 0, a != c) return a > c ^ e ? 1 : -1;
  for (o = (a = r.length) < (c = n.length) ? a : c, i = -1; ++i < o; )
    if (r[i] != n[i]) return r[i] > n[i] ^ e ? 1 : -1;
  return a == c ? 0 : a > c ^ e ? 1 : -1;
};
Le.div = function(s) {
  var e = this, t = e.constructor, r = e.c, n = (s = new t(s)).c, i = e.s == s.s ? 1 : -1, o = t.DP;
  if (o !== ~~o || o < 0 || o > Kr)
    throw Error(na);
  if (!n[0])
    throw Error(Du);
  if (!r[0])
    return s.s = i, s.c = [s.e = 0], s;
  var a, c, l, d, u, p = n.slice(), g = a = n.length, w = r.length, m = r.slice(0, a), y = m.length, C = s, _ = C.c = [], U = 0, j = o + (C.e = e.e - s.e) + 1;
  for (C.s = i, i = j < 0 ? 0 : j, p.unshift(0); y++ < a; ) m.push(0);
  do {
    for (l = 0; l < 10; l++) {
      if (a != (y = m.length))
        d = a > y ? 1 : -1;
      else
        for (u = -1, d = 0; ++u < a; )
          if (n[u] != m[u]) {
            d = n[u] > m[u] ? 1 : -1;
            break;
          }
      if (d < 0) {
        for (c = y == a ? n : p; y; ) {
          if (m[--y] < c[y]) {
            for (u = y; u && !m[--u]; ) m[u] = 9;
            --m[u], m[y] += 10;
          }
          m[y] -= c[y];
        }
        for (; !m[0]; ) m.shift();
      } else
        break;
    }
    _[U++] = d ? l : ++l, m[0] && d ? m[y] = r[g] || 0 : m = [r[g]];
  } while ((g++ < w || m[0] !== Ds) && i--);
  return !_[0] && U != 1 && (_.shift(), C.e--, j--), U > j && tn(C, j, t.RM, m[0] !== Ds), C;
};
Le.eq = function(s) {
  return this.cmp(s) === 0;
};
Le.gt = function(s) {
  return this.cmp(s) > 0;
};
Le.gte = function(s) {
  return this.cmp(s) > -1;
};
Le.lt = function(s) {
  return this.cmp(s) < 0;
};
Le.lte = function(s) {
  return this.cmp(s) < 1;
};
Le.minus = Le.sub = function(s) {
  var e, t, r, n, i = this, o = i.constructor, a = i.s, c = (s = new o(s)).s;
  if (a != c)
    return s.s = -c, i.plus(s);
  var l = i.c.slice(), d = i.e, u = s.c, p = s.e;
  if (!l[0] || !u[0])
    return u[0] ? s.s = -c : l[0] ? s = new o(i) : s.s = 1, s;
  if (a = d - p) {
    for ((n = a < 0) ? (a = -a, r = l) : (p = d, r = u), r.reverse(), c = a; c--; ) r.push(0);
    r.reverse();
  } else
    for (t = ((n = l.length < u.length) ? l : u).length, a = c = 0; c < t; c++)
      if (l[c] != u[c]) {
        n = l[c] < u[c];
        break;
      }
  if (n && (r = l, l = u, u = r, s.s = -s.s), (c = (t = u.length) - (e = l.length)) > 0) for (; c--; ) l[e++] = 0;
  for (c = e; t > a; ) {
    if (l[--t] < u[t]) {
      for (e = t; e && !l[--e]; ) l[e] = 9;
      --l[e], l[t] += 10;
    }
    l[t] -= u[t];
  }
  for (; l[--c] === 0; ) l.pop();
  for (; l[0] === 0; )
    l.shift(), --p;
  return l[0] || (s.s = 1, l = [p = 0]), s.c = l, s.e = p, s;
};
Le.mod = function(s) {
  var e, t = this, r = t.constructor, n = t.s, i = (s = new r(s)).s;
  if (!s.c[0])
    throw Error(Du);
  return t.s = s.s = 1, e = s.cmp(t) == 1, t.s = n, s.s = i, e ? new r(t) : (n = r.DP, i = r.RM, r.DP = r.RM = 0, t = t.div(s), r.DP = n, r.RM = i, this.minus(t.times(s)));
};
Le.neg = function() {
  var s = new this.constructor(this);
  return s.s = -s.s, s;
};
Le.plus = Le.add = function(s) {
  var e, t, r, n = this, i = n.constructor;
  if (s = new i(s), n.s != s.s)
    return s.s = -s.s, n.minus(s);
  var o = n.e, a = n.c, c = s.e, l = s.c;
  if (!a[0] || !l[0])
    return l[0] || (a[0] ? s = new i(n) : s.s = n.s), s;
  if (a = a.slice(), e = o - c) {
    for (e > 0 ? (c = o, r = l) : (e = -e, r = a), r.reverse(); e--; ) r.push(0);
    r.reverse();
  }
  for (a.length - l.length < 0 && (r = l, l = a, a = r), e = l.length, t = 0; e; a[e] %= 10) t = (a[--e] = a[e] + l[e] + t) / 10 | 0;
  for (t && (a.unshift(t), ++c), e = a.length; a[--e] === 0; ) a.pop();
  return s.c = a, s.e = c, s;
};
Le.pow = function(s) {
  var e = this, t = new e.constructor("1"), r = t, n = s < 0;
  if (s !== ~~s || s < -Nl || s > Nl)
    throw Error(en + "exponent");
  for (n && (s = -s); s & 1 && (r = r.times(e)), s >>= 1, !!s; )
    e = e.times(e);
  return n ? t.div(r) : r;
};
Le.prec = function(s, e) {
  if (s !== ~~s || s < 1 || s > Kr)
    throw Error(en + "precision");
  return tn(new this.constructor(this), s, e);
};
Le.round = function(s, e) {
  if (s === Ds) s = 0;
  else if (s !== ~~s || s < -Kr || s > Kr)
    throw Error(na);
  return tn(new this.constructor(this), s + this.e + 1, e);
};
Le.sqrt = function() {
  var s, e, t, r = this, n = r.constructor, i = r.s, o = r.e, a = new n("0.5");
  if (!r.c[0]) return new n(r);
  if (i < 0)
    throw Error(Zi + "No square root");
  i = Math.sqrt(+sn(r, !0, !0)), i === 0 || i === 1 / 0 ? (e = r.c.join(""), e.length + o & 1 || (e += "0"), i = Math.sqrt(e), o = ((o + 1) / 2 | 0) - (o < 0 || o & 1), s = new n((i == 1 / 0 ? "5e" : (i = i.toExponential()).slice(0, i.indexOf("e") + 1)) + o)) : s = new n(i + ""), o = s.e + (n.DP += 4);
  do
    t = s, s = a.times(t.plus(r.div(t)));
  while (t.c.slice(0, o).join("") !== s.c.slice(0, o).join(""));
  return tn(s, (n.DP -= 4) + s.e + 1, n.RM);
};
Le.times = Le.mul = function(s) {
  var e, t = this, r = t.constructor, n = t.c, i = (s = new r(s)).c, o = n.length, a = i.length, c = t.e, l = s.e;
  if (s.s = t.s == s.s ? 1 : -1, !n[0] || !i[0])
    return s.c = [s.e = 0], s;
  for (s.e = c + l, o < a && (e = n, n = i, i = e, l = o, o = a, a = l), e = new Array(l = o + a); l--; ) e[l] = 0;
  for (c = a; c--; ) {
    for (a = 0, l = o + c; l > c; )
      a = e[l] + i[c] * n[l - c - 1] + a, e[l--] = a % 10, a = a / 10 | 0;
    e[l] = a;
  }
  for (a ? ++s.e : e.shift(), c = e.length; !e[--c]; ) e.pop();
  return s.c = e, s;
};
Le.toExponential = function(s, e) {
  var t = this, r = t.c[0];
  if (s !== Ds) {
    if (s !== ~~s || s < 0 || s > Kr)
      throw Error(na);
    for (t = tn(new t.constructor(t), ++s, e); t.c.length < s; ) t.c.push(0);
  }
  return sn(t, !0, !!r);
};
Le.toFixed = function(s, e) {
  var t = this, r = t.c[0];
  if (s !== Ds) {
    if (s !== ~~s || s < 0 || s > Kr)
      throw Error(na);
    for (t = tn(new t.constructor(t), s + t.e + 1, e), s = s + t.e + 1; t.c.length < s; ) t.c.push(0);
  }
  return sn(t, !1, !!r);
};
Le[Symbol.for("nodejs.util.inspect.custom")] = Le.toJSON = Le.toString = function() {
  var s = this, e = s.constructor;
  return sn(s, s.e <= e.NE || s.e >= e.PE, !!s.c[0]);
};
Le.toNumber = function() {
  var s = +sn(this, !0, !0);
  if (this.constructor.strict === !0 && !this.eq(s.toString()))
    throw Error(Zi + "Imprecise conversion");
  return s;
};
Le.toPrecision = function(s, e) {
  var t = this, r = t.constructor, n = t.c[0];
  if (s !== Ds) {
    if (s !== ~~s || s < 1 || s > Kr)
      throw Error(en + "precision");
    for (t = tn(new r(t), s, e); t.c.length < s; ) t.c.push(0);
  }
  return sn(t, s <= t.e || t.e <= r.NE || t.e >= r.PE, !!n);
};
Le.valueOf = function() {
  var s = this, e = s.constructor;
  if (e.strict === !0)
    throw Error(Zi + "valueOf disallowed");
  return sn(s, s.e <= e.NE || s.e >= e.PE, !0);
};
var Zn = $u();
const Uf = {
  bigNumber(s) {
    return s ? new Zn(s) : new Zn(0);
  },
  multiply(s, e) {
    if (s === void 0 || e === void 0)
      return new Zn(0);
    const t = new Zn(s), r = new Zn(e);
    return t.times(r);
  },
  formatNumberToLocalString(s, e = 2) {
    return s === void 0 ? "0.00" : typeof s == "number" ? s.toLocaleString("en-US", {
      maximumFractionDigits: e,
      minimumFractionDigits: e
    }) : parseFloat(s).toLocaleString("en-US", {
      maximumFractionDigits: e,
      minimumFractionDigits: e
    });
  },
  parseLocalStringToNumber(s) {
    return s === void 0 ? 0 : parseFloat(s.replace(/,/gu, ""));
  }
}, Df = [
  {
    type: "function",
    name: "transfer",
    stateMutability: "nonpayable",
    inputs: [
      {
        name: "_to",
        type: "address"
      },
      {
        name: "_value",
        type: "uint256"
      }
    ],
    outputs: [
      {
        name: "",
        type: "bool"
      }
    ]
  },
  {
    type: "function",
    name: "transferFrom",
    stateMutability: "nonpayable",
    inputs: [
      {
        name: "_from",
        type: "address"
      },
      {
        name: "_to",
        type: "address"
      },
      {
        name: "_value",
        type: "uint256"
      }
    ],
    outputs: [
      {
        name: "",
        type: "bool"
      }
    ]
  }
], $f = [
  {
    type: "function",
    name: "approve",
    stateMutability: "nonpayable",
    inputs: [
      { name: "spender", type: "address" },
      { name: "amount", type: "uint256" }
    ],
    outputs: [{ type: "bool" }]
  }
], Lf = [
  {
    type: "function",
    name: "transfer",
    stateMutability: "nonpayable",
    inputs: [
      {
        name: "recipient",
        type: "address"
      },
      {
        name: "amount",
        type: "uint256"
      }
    ],
    outputs: []
  },
  {
    type: "function",
    name: "transferFrom",
    stateMutability: "nonpayable",
    inputs: [
      {
        name: "sender",
        type: "address"
      },
      {
        name: "recipient",
        type: "address"
      },
      {
        name: "amount",
        type: "uint256"
      }
    ],
    outputs: [
      {
        name: "",
        type: "bool"
      }
    ]
  }
], Mf = {
  getERC20Abi: (s) => N.USDT_CONTRACT_ADDRESSES.includes(s) ? Lf : Df,
  getSwapAbi: () => $f
}, Kt = {
  validateCaipAddress(s) {
    var e;
    if (((e = s.split(":")) == null ? void 0 : e.length) !== 3)
      throw new Error("Invalid CAIP Address");
    return s;
  },
  parseCaipAddress(s) {
    const e = s.split(":");
    if (e.length !== 3)
      throw new Error(`Invalid CAIP-10 address: ${s}`);
    const [t, r, n] = e;
    if (!t || !r || !n)
      throw new Error(`Invalid CAIP-10 address: ${s}`);
    return {
      chainNamespace: t,
      chainId: r,
      address: n
    };
  },
  parseCaipNetworkId(s) {
    const e = s.split(":");
    if (e.length !== 2)
      throw new Error(`Invalid CAIP-2 network id: ${s}`);
    const [t, r] = e;
    if (!t || !r)
      throw new Error(`Invalid CAIP-2 network id: ${s}`);
    return {
      chainNamespace: t,
      chainId: r
    };
  }
}, he = {
  WALLET_ID: "@appkit/wallet_id",
  WALLET_NAME: "@appkit/wallet_name",
  SOLANA_WALLET: "@appkit/solana_wallet",
  SOLANA_CAIP_CHAIN: "@appkit/solana_caip_chain",
  ACTIVE_CAIP_NETWORK_ID: "@appkit/active_caip_network_id",
  CONNECTED_SOCIAL: "@appkit/connected_social",
  CONNECTED_SOCIAL_USERNAME: "@appkit-wallet/SOCIAL_USERNAME",
  RECENT_WALLETS: "@appkit/recent_wallets",
  DEEPLINK_CHOICE: "WALLETCONNECT_DEEPLINK_CHOICE",
  ACTIVE_NAMESPACE: "@appkit/active_namespace",
  CONNECTED_NAMESPACES: "@appkit/connected_namespaces",
  CONNECTION_STATUS: "@appkit/connection_status",
  SIWX_AUTH_TOKEN: "@appkit/siwx-auth-token",
  SIWX_NONCE_TOKEN: "@appkit/siwx-nonce-token",
  TELEGRAM_SOCIAL_PROVIDER: "@appkit/social_provider",
  NATIVE_BALANCE_CACHE: "@appkit/native_balance_cache",
  PORTFOLIO_CACHE: "@appkit/portfolio_cache",
  ENS_CACHE: "@appkit/ens_cache",
  IDENTITY_CACHE: "@appkit/identity_cache",
  PREFERRED_ACCOUNT_TYPES: "@appkit/preferred_account_types",
  CONNECTIONS: "@appkit/connections",
  DISCONNECTED_CONNECTOR_IDS: "@appkit/disconnected_connector_ids"
};
function Ea(s) {
  if (!s)
    throw new Error("Namespace is required for CONNECTED_CONNECTOR_ID");
  return `@appkit/${s}:connected_connector_id`;
}
const le = {
  setItem(s, e) {
    hi() && e !== void 0 && localStorage.setItem(s, e);
  },
  getItem(s) {
    if (hi())
      return localStorage.getItem(s) || void 0;
  },
  removeItem(s) {
    hi() && localStorage.removeItem(s);
  },
  clear() {
    hi() && localStorage.clear();
  }
};
function hi() {
  return typeof window < "u" && typeof localStorage < "u";
}
function Zs(s, e) {
  return e === "light" ? {
    "--w3m-accent": (s == null ? void 0 : s["--w3m-accent"]) || "hsla(231, 100%, 70%, 1)",
    "--w3m-background": "#fff"
  } : {
    "--w3m-accent": (s == null ? void 0 : s["--w3m-accent"]) || "hsla(230, 100%, 67%, 1)",
    "--w3m-background": "#121313"
  };
}
const ba = (
  // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
  (typeof process < "u" && typeof process.env < "u" ? process.env.NEXT_PUBLIC_SECURE_SITE_ORIGIN : void 0) || "https://secure.walletconnect.org"
), Lu = [
  {
    label: "Meld.io",
    name: "meld",
    feeRange: "1-2%",
    url: "https://meldcrypto.com",
    supportedChains: ["eip155", "solana"]
  },
  {
    label: "Coinbase",
    name: "coinbase",
    feeRange: "1-2%",
    url: "",
    supportedChains: ["eip155"]
  }
], Bf = "WXETMuFUQmqqybHuRkSgxv:25B8LJHSfpG6LVjR2ytU5Cwh7Z4Sch2ocoU", Ue = {
  FOUR_MINUTES_MS: 24e4,
  TEN_SEC_MS: 1e4,
  FIVE_SEC_MS: 5e3,
  THREE_SEC_MS: 3e3,
  ONE_SEC_MS: 1e3,
  SECURE_SITE: ba,
  SECURE_SITE_DASHBOARD: `${ba}/dashboard`,
  SECURE_SITE_FAVICON: `${ba}/images/favicon.png`,
  RESTRICTED_TIMEZONES: [
    "ASIA/SHANGHAI",
    "ASIA/URUMQI",
    "ASIA/CHONGQING",
    "ASIA/HARBIN",
    "ASIA/KASHGAR",
    "ASIA/MACAU",
    "ASIA/HONG_KONG",
    "ASIA/MACAO",
    "ASIA/BEIJING",
    "ASIA/HARBIN"
  ],
  /**
   * Network name to Coinbase Pay SDK chain name map object
   * @see supported chain names on Coinbase for Pay SDK: https://github.com/coinbase/cbpay-js/blob/d4bda2c05c4d5917c8db6a05476b603546046394/src/types/onramp.ts
   */
  WC_COINBASE_PAY_SDK_CHAINS: [
    "ethereum",
    "arbitrum",
    "polygon",
    "berachain",
    "avalanche-c-chain",
    "optimism",
    "celo",
    "base"
  ],
  WC_COINBASE_PAY_SDK_FALLBACK_CHAIN: "ethereum",
  WC_COINBASE_PAY_SDK_CHAIN_NAME_MAP: {
    Ethereum: "ethereum",
    "Arbitrum One": "arbitrum",
    Polygon: "polygon",
    Berachain: "berachain",
    Avalanche: "avalanche-c-chain",
    "OP Mainnet": "optimism",
    Celo: "celo",
    Base: "base"
  },
  WC_COINBASE_ONRAMP_APP_ID: "bf18c88d-495a-463b-b249-0b9d3656cf5e",
  SWAP_SUGGESTED_TOKENS: [
    "ETH",
    "UNI",
    "1INCH",
    "AAVE",
    "SOL",
    "ADA",
    "AVAX",
    "DOT",
    "LINK",
    "NITRO",
    "GAIA",
    "MILK",
    "TRX",
    "NEAR",
    "GNO",
    "WBTC",
    "DAI",
    "WETH",
    "USDC",
    "USDT",
    "ARB",
    "BAL",
    "BICO",
    "CRV",
    "ENS",
    "MATIC",
    "OP"
  ],
  SWAP_POPULAR_TOKENS: [
    "ETH",
    "UNI",
    "1INCH",
    "AAVE",
    "SOL",
    "ADA",
    "AVAX",
    "DOT",
    "LINK",
    "NITRO",
    "GAIA",
    "MILK",
    "TRX",
    "NEAR",
    "GNO",
    "WBTC",
    "DAI",
    "WETH",
    "USDC",
    "USDT",
    "ARB",
    "BAL",
    "BICO",
    "CRV",
    "ENS",
    "MATIC",
    "OP",
    "METAL",
    "DAI",
    "CHAMP",
    "WOLF",
    "SALE",
    "BAL",
    "BUSD",
    "MUST",
    "BTCpx",
    "ROUTE",
    "HEX",
    "WELT",
    "amDAI",
    "VSQ",
    "VISION",
    "AURUM",
    "pSP",
    "SNX",
    "VC",
    "LINK",
    "CHP",
    "amUSDT",
    "SPHERE",
    "FOX",
    "GIDDY",
    "GFC",
    "OMEN",
    "OX_OLD",
    "DE",
    "WNT"
  ],
  BALANCE_SUPPORTED_CHAINS: ["eip155", "solana"],
  SWAP_SUPPORTED_NETWORKS: [
    // Ethereum'
    "eip155:1",
    // Arbitrum One'
    "eip155:42161",
    // Optimism'
    "eip155:10",
    // ZKSync Era'
    "eip155:324",
    // Base'
    "eip155:8453",
    // BNB Smart Chain'
    "eip155:56",
    // Polygon'
    "eip155:137",
    // Gnosis'
    "eip155:100",
    // Avalanche'
    "eip155:43114",
    // Fantom'
    "eip155:250",
    // Klaytn'
    "eip155:8217",
    // Aurora
    "eip155:1313161554"
  ],
  NAMES_SUPPORTED_CHAIN_NAMESPACES: ["eip155"],
  ONRAMP_SUPPORTED_CHAIN_NAMESPACES: ["eip155", "solana"],
  ACTIVITY_ENABLED_CHAIN_NAMESPACES: ["eip155"],
  NATIVE_TOKEN_ADDRESS: {
    eip155: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    solana: "So11111111111111111111111111111111111111111",
    polkadot: "0x",
    bip122: "0x",
    cosmos: "0x"
  },
  CONVERT_SLIPPAGE_TOLERANCE: 1,
  CONNECT_LABELS: {
    MOBILE: "Open and continue in the wallet app",
    WEB: "Open and continue in the wallet app"
  },
  SEND_SUPPORTED_NAMESPACES: ["eip155", "solana"],
  DEFAULT_REMOTE_FEATURES: {
    swaps: ["1inch"],
    onramp: ["meld", "coinbase"],
    email: !0,
    socials: [
      "google",
      "x",
      "discord",
      "farcaster",
      "github",
      "apple",
      "facebook"
    ],
    activity: !0,
    reownBranding: !0,
    multiWallet: !1
  },
  DEFAULT_REMOTE_FEATURES_DISABLED: {
    email: !1,
    socials: !1,
    swaps: !1,
    onramp: !1,
    activity: !1,
    reownBranding: !1
  },
  DEFAULT_FEATURES: {
    receive: !0,
    send: !0,
    emailShowWallets: !0,
    connectorTypeOrder: [
      "walletConnect",
      "recent",
      "injected",
      "featured",
      "custom",
      "external",
      "recommended"
    ],
    analytics: !0,
    allWallets: !0,
    legalCheckbox: !1,
    smartSessions: !1,
    collapseWallets: !1,
    walletFeaturesOrder: ["onramp", "swaps", "receive", "send"],
    connectMethodsOrder: void 0,
    pay: !1
  },
  DEFAULT_SOCIALS: [
    "google",
    "x",
    "farcaster",
    "discord",
    "apple",
    "github",
    "facebook"
  ],
  DEFAULT_ACCOUNT_TYPES: {
    bip122: "payment",
    eip155: "smartAccount",
    polkadot: "eoa",
    solana: "eoa"
  },
  ADAPTER_TYPES: {
    UNIVERSAL: "universal",
    SOLANA: "solana",
    WAGMI: "wagmi",
    ETHERS: "ethers",
    ETHERS5: "ethers5",
    BITCOIN: "bitcoin"
  }
}, $ = {
  // Cache expiry in milliseconds
  cacheExpiry: {
    portfolio: 3e4,
    nativeBalance: 3e4,
    ens: 3e5,
    identity: 3e5
  },
  isCacheExpired(s, e) {
    return Date.now() - s > e;
  },
  getActiveNetworkProps() {
    const s = $.getActiveNamespace(), e = $.getActiveCaipNetworkId(), t = e ? e.split(":")[1] : void 0, r = t ? isNaN(Number(t)) ? t : Number(t) : void 0;
    return {
      namespace: s,
      caipNetworkId: e,
      chainId: r
    };
  },
  setWalletConnectDeepLink({ name: s, href: e }) {
    try {
      le.setItem(he.DEEPLINK_CHOICE, JSON.stringify({ href: e, name: s }));
    } catch {
      console.info("Unable to set WalletConnect deep link");
    }
  },
  getWalletConnectDeepLink() {
    try {
      const s = le.getItem(he.DEEPLINK_CHOICE);
      if (s)
        return JSON.parse(s);
    } catch {
      console.info("Unable to get WalletConnect deep link");
    }
  },
  deleteWalletConnectDeepLink() {
    try {
      le.removeItem(he.DEEPLINK_CHOICE);
    } catch {
      console.info("Unable to delete WalletConnect deep link");
    }
  },
  setActiveNamespace(s) {
    try {
      le.setItem(he.ACTIVE_NAMESPACE, s);
    } catch {
      console.info("Unable to set active namespace");
    }
  },
  setActiveCaipNetworkId(s) {
    try {
      le.setItem(he.ACTIVE_CAIP_NETWORK_ID, s), $.setActiveNamespace(s.split(":")[0]);
    } catch {
      console.info("Unable to set active caip network id");
    }
  },
  getActiveCaipNetworkId() {
    try {
      return le.getItem(he.ACTIVE_CAIP_NETWORK_ID);
    } catch {
      console.info("Unable to get active caip network id");
      return;
    }
  },
  deleteActiveCaipNetworkId() {
    try {
      le.removeItem(he.ACTIVE_CAIP_NETWORK_ID);
    } catch {
      console.info("Unable to delete active caip network id");
    }
  },
  deleteConnectedConnectorId(s) {
    try {
      const e = Ea(s);
      le.removeItem(e);
    } catch {
      console.info("Unable to delete connected connector id");
    }
  },
  setAppKitRecent(s) {
    try {
      const e = $.getRecentWallets();
      e.find((r) => r.id === s.id) || (e.unshift(s), e.length > 2 && e.pop(), le.setItem(he.RECENT_WALLETS, JSON.stringify(e)));
    } catch {
      console.info("Unable to set AppKit recent");
    }
  },
  getRecentWallets() {
    try {
      const s = le.getItem(he.RECENT_WALLETS);
      return s ? JSON.parse(s) : [];
    } catch {
      console.info("Unable to get AppKit recent");
    }
    return [];
  },
  setConnectedConnectorId(s, e) {
    try {
      const t = Ea(s);
      le.setItem(t, e);
    } catch {
      console.info("Unable to set Connected Connector Id");
    }
  },
  getActiveNamespace() {
    try {
      return le.getItem(he.ACTIVE_NAMESPACE);
    } catch {
      console.info("Unable to get active namespace");
    }
  },
  getConnectedConnectorId(s) {
    if (s)
      try {
        const e = Ea(s);
        return le.getItem(e);
      } catch {
        console.info("Unable to get connected connector id in namespace", s);
      }
  },
  setConnectedSocialProvider(s) {
    try {
      le.setItem(he.CONNECTED_SOCIAL, s);
    } catch {
      console.info("Unable to set connected social provider");
    }
  },
  getConnectedSocialProvider() {
    try {
      return le.getItem(he.CONNECTED_SOCIAL);
    } catch {
      console.info("Unable to get connected social provider");
    }
  },
  deleteConnectedSocialProvider() {
    try {
      le.removeItem(he.CONNECTED_SOCIAL);
    } catch {
      console.info("Unable to delete connected social provider");
    }
  },
  getConnectedSocialUsername() {
    try {
      return le.getItem(he.CONNECTED_SOCIAL_USERNAME);
    } catch {
      console.info("Unable to get connected social username");
    }
  },
  getStoredActiveCaipNetworkId() {
    var t;
    const s = le.getItem(he.ACTIVE_CAIP_NETWORK_ID);
    return (t = s == null ? void 0 : s.split(":")) == null ? void 0 : t[1];
  },
  setConnectionStatus(s) {
    try {
      le.setItem(he.CONNECTION_STATUS, s);
    } catch {
      console.info("Unable to set connection status");
    }
  },
  getConnectionStatus() {
    try {
      return le.getItem(he.CONNECTION_STATUS);
    } catch {
      return;
    }
  },
  getConnectedNamespaces() {
    try {
      const s = le.getItem(he.CONNECTED_NAMESPACES);
      return s != null && s.length ? s.split(",") : [];
    } catch {
      return [];
    }
  },
  setConnectedNamespaces(s) {
    try {
      const e = Array.from(new Set(s));
      le.setItem(he.CONNECTED_NAMESPACES, e.join(","));
    } catch {
      console.info("Unable to set namespaces in storage");
    }
  },
  addConnectedNamespace(s) {
    try {
      const e = $.getConnectedNamespaces();
      e.includes(s) || (e.push(s), $.setConnectedNamespaces(e));
    } catch {
      console.info("Unable to add connected namespace");
    }
  },
  removeConnectedNamespace(s) {
    try {
      const e = $.getConnectedNamespaces(), t = e.indexOf(s);
      t > -1 && (e.splice(t, 1), $.setConnectedNamespaces(e));
    } catch {
      console.info("Unable to remove connected namespace");
    }
  },
  getTelegramSocialProvider() {
    try {
      return le.getItem(he.TELEGRAM_SOCIAL_PROVIDER);
    } catch {
      return console.info("Unable to get telegram social provider"), null;
    }
  },
  setTelegramSocialProvider(s) {
    try {
      le.setItem(he.TELEGRAM_SOCIAL_PROVIDER, s);
    } catch {
      console.info("Unable to set telegram social provider");
    }
  },
  removeTelegramSocialProvider() {
    try {
      le.removeItem(he.TELEGRAM_SOCIAL_PROVIDER);
    } catch {
      console.info("Unable to remove telegram social provider");
    }
  },
  getBalanceCache() {
    let s = {};
    try {
      const e = le.getItem(he.PORTFOLIO_CACHE);
      s = e ? JSON.parse(e) : {};
    } catch {
      console.info("Unable to get balance cache");
    }
    return s;
  },
  removeAddressFromBalanceCache(s) {
    try {
      const e = $.getBalanceCache();
      le.setItem(he.PORTFOLIO_CACHE, JSON.stringify({ ...e, [s]: void 0 }));
    } catch {
      console.info("Unable to remove address from balance cache", s);
    }
  },
  getBalanceCacheForCaipAddress(s) {
    try {
      const t = $.getBalanceCache()[s];
      if (t && !this.isCacheExpired(t.timestamp, this.cacheExpiry.portfolio))
        return t.balance;
      $.removeAddressFromBalanceCache(s);
    } catch {
      console.info("Unable to get balance cache for address", s);
    }
  },
  updateBalanceCache(s) {
    try {
      const e = $.getBalanceCache();
      e[s.caipAddress] = s, le.setItem(he.PORTFOLIO_CACHE, JSON.stringify(e));
    } catch {
      console.info("Unable to update balance cache", s);
    }
  },
  getNativeBalanceCache() {
    let s = {};
    try {
      const e = le.getItem(he.NATIVE_BALANCE_CACHE);
      s = e ? JSON.parse(e) : {};
    } catch {
      console.info("Unable to get balance cache");
    }
    return s;
  },
  removeAddressFromNativeBalanceCache(s) {
    try {
      const e = $.getBalanceCache();
      le.setItem(he.NATIVE_BALANCE_CACHE, JSON.stringify({ ...e, [s]: void 0 }));
    } catch {
      console.info("Unable to remove address from balance cache", s);
    }
  },
  getNativeBalanceCacheForCaipAddress(s) {
    try {
      const t = $.getNativeBalanceCache()[s];
      if (t && !this.isCacheExpired(t.timestamp, this.cacheExpiry.nativeBalance))
        return t;
      console.info("Discarding cache for address", s), $.removeAddressFromBalanceCache(s);
    } catch {
      console.info("Unable to get balance cache for address", s);
    }
  },
  updateNativeBalanceCache(s) {
    try {
      const e = $.getNativeBalanceCache();
      e[s.caipAddress] = s, le.setItem(he.NATIVE_BALANCE_CACHE, JSON.stringify(e));
    } catch {
      console.info("Unable to update balance cache", s);
    }
  },
  getEnsCache() {
    let s = {};
    try {
      const e = le.getItem(he.ENS_CACHE);
      s = e ? JSON.parse(e) : {};
    } catch {
      console.info("Unable to get ens name cache");
    }
    return s;
  },
  getEnsFromCacheForAddress(s) {
    try {
      const t = $.getEnsCache()[s];
      if (t && !this.isCacheExpired(t.timestamp, this.cacheExpiry.ens))
        return t.ens;
      $.removeEnsFromCache(s);
    } catch {
      console.info("Unable to get ens name from cache", s);
    }
  },
  updateEnsCache(s) {
    try {
      const e = $.getEnsCache();
      e[s.address] = s, le.setItem(he.ENS_CACHE, JSON.stringify(e));
    } catch {
      console.info("Unable to update ens name cache", s);
    }
  },
  removeEnsFromCache(s) {
    try {
      const e = $.getEnsCache();
      le.setItem(he.ENS_CACHE, JSON.stringify({ ...e, [s]: void 0 }));
    } catch {
      console.info("Unable to remove ens name from cache", s);
    }
  },
  getIdentityCache() {
    let s = {};
    try {
      const e = le.getItem(he.IDENTITY_CACHE);
      s = e ? JSON.parse(e) : {};
    } catch {
      console.info("Unable to get identity cache");
    }
    return s;
  },
  getIdentityFromCacheForAddress(s) {
    try {
      const t = $.getIdentityCache()[s];
      if (t && !this.isCacheExpired(t.timestamp, this.cacheExpiry.identity))
        return t.identity;
      $.removeIdentityFromCache(s);
    } catch {
      console.info("Unable to get identity from cache", s);
    }
  },
  updateIdentityCache(s) {
    try {
      const e = $.getIdentityCache();
      e[s.address] = {
        identity: s.identity,
        timestamp: s.timestamp
      }, le.setItem(he.IDENTITY_CACHE, JSON.stringify(e));
    } catch {
      console.info("Unable to update identity cache", s);
    }
  },
  removeIdentityFromCache(s) {
    try {
      const e = $.getIdentityCache();
      le.setItem(he.IDENTITY_CACHE, JSON.stringify({ ...e, [s]: void 0 }));
    } catch {
      console.info("Unable to remove identity from cache", s);
    }
  },
  clearAddressCache() {
    try {
      le.removeItem(he.PORTFOLIO_CACHE), le.removeItem(he.NATIVE_BALANCE_CACHE), le.removeItem(he.ENS_CACHE), le.removeItem(he.IDENTITY_CACHE);
    } catch {
      console.info("Unable to clear address cache");
    }
  },
  setPreferredAccountTypes(s) {
    try {
      le.setItem(he.PREFERRED_ACCOUNT_TYPES, JSON.stringify(s));
    } catch {
      console.info("Unable to set preferred account types", s);
    }
  },
  getPreferredAccountTypes() {
    try {
      const s = le.getItem(he.PREFERRED_ACCOUNT_TYPES);
      return s ? JSON.parse(s) : {};
    } catch {
      console.info("Unable to get preferred account types");
    }
    return {};
  },
  setConnections(s, e) {
    try {
      const t = $.getConnections(), r = t[e] ?? [], n = /* @__PURE__ */ new Map();
      for (const o of r)
        n.set(o.connectorId, { ...o });
      for (const o of s) {
        const a = n.get(o.connectorId), c = o.connectorId === N.CONNECTOR_ID.AUTH;
        if (a && !c) {
          const l = new Set(a.accounts.map((u) => u.address.toLowerCase())), d = o.accounts.filter((u) => !l.has(u.address.toLowerCase()));
          a.accounts.push(...d);
        } else
          n.set(o.connectorId, { ...o });
      }
      const i = {
        ...t,
        [e]: Array.from(n.values())
      };
      le.setItem(he.CONNECTIONS, JSON.stringify(i));
    } catch (t) {
      console.error("Unable to sync connections to storage", t);
    }
  },
  getConnections() {
    try {
      const s = le.getItem(he.CONNECTIONS);
      return s ? JSON.parse(s) : {};
    } catch (s) {
      return console.error("Unable to get connections from storage", s), {};
    }
  },
  deleteAddressFromConnection({ connectorId: s, address: e, namespace: t }) {
    try {
      const r = $.getConnections(), n = r[t] ?? [], i = new Map(n.map((a) => [a.connectorId, a])), o = i.get(s);
      o && (o.accounts.filter((c) => c.address.toLowerCase() !== e.toLowerCase()).length === 0 ? i.delete(s) : i.set(s, {
        ...o,
        accounts: o.accounts.filter((c) => c.address.toLowerCase() !== e.toLowerCase())
      })), le.setItem(he.CONNECTIONS, JSON.stringify({
        ...r,
        [t]: Array.from(i.values())
      }));
    } catch {
      console.error(`Unable to remove address "${e}" from connector "${s}" in namespace "${t}"`);
    }
  },
  getDisconnectedConnectorIds() {
    try {
      const s = le.getItem(he.DISCONNECTED_CONNECTOR_IDS);
      return s ? JSON.parse(s) : {};
    } catch {
      console.info("Unable to get disconnected connector ids");
    }
    return {};
  },
  addDisconnectedConnectorId(s, e) {
    try {
      const t = $.getDisconnectedConnectorIds(), r = t[e] ?? [];
      r.push(s), le.setItem(he.DISCONNECTED_CONNECTOR_IDS, JSON.stringify({
        ...t,
        [e]: Array.from(new Set(r))
      }));
    } catch {
      console.error(`Unable to set disconnected connector id "${s}" for namespace "${e}"`);
    }
  },
  removeDisconnectedConnectorId(s, e) {
    try {
      const t = $.getDisconnectedConnectorIds();
      let r = t[e] ?? [];
      r = r.filter((n) => n.toLowerCase() !== s.toLowerCase()), le.setItem(he.DISCONNECTED_CONNECTOR_IDS, JSON.stringify({
        ...t,
        [e]: Array.from(new Set(r))
      }));
    } catch {
      console.error(`Unable to remove disconnected connector id "${s}" for namespace "${e}"`);
    }
  },
  isConnectorDisconnected(s, e) {
    try {
      return ($.getDisconnectedConnectorIds()[e] ?? []).some((n) => n.toLowerCase() === s.toLowerCase());
    } catch {
      console.info(`Unable to get disconnected connector id "${s}" for namespace "${e}"`);
    }
    return !1;
  }
}, te = {
  isMobile() {
    var s;
    return this.isClient() ? !!(window != null && window.matchMedia && typeof window.matchMedia == "function" && ((s = window.matchMedia("(pointer:coarse)")) != null && s.matches) || /Android|webOS|iPhone|iPad|iPod|BlackBerry|Opera Mini/u.test(navigator.userAgent)) : !1;
  },
  checkCaipNetwork(s, e = "") {
    return s == null ? void 0 : s.caipNetworkId.toLocaleLowerCase().includes(e.toLowerCase());
  },
  isAndroid() {
    if (!this.isMobile())
      return !1;
    const s = window == null ? void 0 : window.navigator.userAgent.toLowerCase();
    return te.isMobile() && s.includes("android");
  },
  isIos() {
    if (!this.isMobile())
      return !1;
    const s = window == null ? void 0 : window.navigator.userAgent.toLowerCase();
    return s.includes("iphone") || s.includes("ipad");
  },
  isSafari() {
    return this.isClient() ? (window == null ? void 0 : window.navigator.userAgent.toLowerCase()).includes("safari") : !1;
  },
  isClient() {
    return typeof window < "u";
  },
  isPairingExpired(s) {
    return s ? s - Date.now() <= Ue.TEN_SEC_MS : !0;
  },
  isAllowedRetry(s, e = Ue.ONE_SEC_MS) {
    return Date.now() - s >= e;
  },
  copyToClopboard(s) {
    navigator.clipboard.writeText(s);
  },
  isIframe() {
    try {
      return (window == null ? void 0 : window.self) !== (window == null ? void 0 : window.top);
    } catch {
      return !1;
    }
  },
  isSafeApp() {
    var s, e;
    if (te.isClient() && window.self !== window.top)
      try {
        const t = (e = (s = window == null ? void 0 : window.location) == null ? void 0 : s.ancestorOrigins) == null ? void 0 : e[0], r = "https://app.safe.global";
        if (t) {
          const n = new URL(t), i = new URL(r);
          return n.hostname === i.hostname;
        }
      } catch {
        return !1;
      }
    return !1;
  },
  getPairingExpiry() {
    return Date.now() + Ue.FOUR_MINUTES_MS;
  },
  getNetworkId(s) {
    return s == null ? void 0 : s.split(":")[1];
  },
  getPlainAddress(s) {
    return s == null ? void 0 : s.split(":")[2];
  },
  async wait(s) {
    return new Promise((e) => {
      setTimeout(e, s);
    });
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  debounce(s, e = 500) {
    let t;
    return (...r) => {
      function n() {
        s(...r);
      }
      t && clearTimeout(t), t = setTimeout(n, e);
    };
  },
  isHttpUrl(s) {
    return s.startsWith("http://") || s.startsWith("https://");
  },
  formatNativeUrl(s, e, t = null) {
    if (te.isHttpUrl(s))
      return this.formatUniversalUrl(s, e);
    let r = s, n = t;
    r.includes("://") || (r = s.replaceAll("/", "").replaceAll(":", ""), r = `${r}://`), r.endsWith("/") || (r = `${r}/`), n && !(n != null && n.endsWith("/")) && (n = `${n}/`), this.isTelegram() && this.isAndroid() && (e = encodeURIComponent(e));
    const i = encodeURIComponent(e);
    return {
      redirect: `${r}wc?uri=${i}`,
      redirectUniversalLink: n ? `${n}wc?uri=${i}` : void 0,
      href: r
    };
  },
  formatUniversalUrl(s, e) {
    if (!te.isHttpUrl(s))
      return this.formatNativeUrl(s, e);
    let t = s;
    t.endsWith("/") || (t = `${t}/`);
    const r = encodeURIComponent(e);
    return {
      redirect: `${t}wc?uri=${r}`,
      href: t
    };
  },
  getOpenTargetForPlatform(s) {
    return s === "popupWindow" ? s : this.isTelegram() ? $.getTelegramSocialProvider() ? "_top" : "_blank" : s;
  },
  openHref(s, e, t) {
    window == null || window.open(s, this.getOpenTargetForPlatform(e), t || "noreferrer noopener");
  },
  returnOpenHref(s, e, t) {
    return window == null ? void 0 : window.open(s, this.getOpenTargetForPlatform(e), t || "noreferrer noopener");
  },
  isTelegram() {
    return typeof window < "u" && // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (!!window.TelegramWebviewProxy || // eslint-disable-next-line @typescript-eslint/no-explicit-any
    !!window.Telegram || // eslint-disable-next-line @typescript-eslint/no-explicit-any
    !!window.TelegramWebviewProxyProto);
  },
  isPWA() {
    var t, r;
    if (typeof window > "u")
      return !1;
    const s = window != null && window.matchMedia && typeof window.matchMedia == "function" ? (t = window.matchMedia("(display-mode: standalone)")) == null ? void 0 : t.matches : !1, e = (r = window == null ? void 0 : window.navigator) == null ? void 0 : r.standalone;
    return !!(s || e);
  },
  async preloadImage(s) {
    const e = new Promise((t, r) => {
      const n = new Image();
      n.onload = t, n.onerror = r, n.crossOrigin = "anonymous", n.src = s;
    });
    return Promise.race([e, te.wait(2e3)]);
  },
  formatBalance(s, e) {
    let t = "0.000";
    if (typeof s == "string") {
      const r = Number(s);
      if (r) {
        const n = Math.floor(r * 1e3) / 1e3;
        n && (t = n.toString());
      }
    }
    return `${t}${e ? ` ${e}` : ""}`;
  },
  formatBalance2(s, e) {
    var r;
    let t;
    if (s === "0")
      t = "0";
    else if (typeof s == "string") {
      const n = Number(s);
      n && (t = (r = n.toString().match(/^-?\d+(?:\.\d{0,3})?/u)) == null ? void 0 : r[0]);
    }
    return {
      value: t ?? "0",
      rest: t === "0" ? "000" : "",
      symbol: e
    };
  },
  getApiUrl() {
    return N.W3M_API_URL;
  },
  getBlockchainApiUrl() {
    return N.BLOCKCHAIN_API_RPC_URL;
  },
  getAnalyticsUrl() {
    return N.PULSE_API_URL;
  },
  getUUID() {
    return crypto != null && crypto.randomUUID ? crypto.randomUUID() : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/gu, (s) => {
      const e = Math.random() * 16 | 0;
      return (s === "x" ? e : e & 3 | 8).toString(16);
    });
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parseError(s) {
    var e, t;
    return typeof s == "string" ? s : typeof ((t = (e = s == null ? void 0 : s.issues) == null ? void 0 : e[0]) == null ? void 0 : t.message) == "string" ? s.issues[0].message : s instanceof Error ? s.message : "Unknown error";
  },
  sortRequestedNetworks(s, e = []) {
    const t = {};
    return e && s && (s.forEach((r, n) => {
      t[r] = n;
    }), e.sort((r, n) => {
      const i = t[r.id], o = t[n.id];
      return i !== void 0 && o !== void 0 ? i - o : i !== void 0 ? -1 : o !== void 0 ? 1 : 0;
    })), e;
  },
  calculateBalance(s) {
    let e = 0;
    for (const t of s)
      e += t.value ?? 0;
    return e;
  },
  formatTokenBalance(s) {
    const e = s.toFixed(2), [t, r] = e.split(".");
    return { dollars: t, pennies: r };
  },
  isAddress(s, e = "eip155") {
    switch (e) {
      case "eip155":
        if (/^(?:0x)?[0-9a-f]{40}$/iu.test(s)) {
          if (/^(?:0x)?[0-9a-f]{40}$/iu.test(s) || /^(?:0x)?[0-9A-F]{40}$/iu.test(s))
            return !0;
        } else return !1;
        return !1;
      case "solana":
        return /[1-9A-HJ-NP-Za-km-z]{32,44}$/iu.test(s);
      default:
        return !1;
    }
  },
  uniqueBy(s, e) {
    const t = /* @__PURE__ */ new Set();
    return s.filter((r) => {
      const n = r[e];
      return t.has(n) ? !1 : (t.add(n), !0);
    });
  },
  generateSdkVersion(s, e, t) {
    const n = s.length === 0 ? Ue.ADAPTER_TYPES.UNIVERSAL : s.map((i) => i.adapterType).join(",");
    return `${e}-${n}-${t}`;
  },
  // eslint-disable-next-line max-params
  createAccount(s, e, t, r, n) {
    return {
      namespace: s,
      address: e,
      type: t,
      publicKey: r,
      path: n
    };
  },
  isCaipAddress(s) {
    if (typeof s != "string")
      return !1;
    const e = s.split(":"), t = e[0];
    return e.filter(Boolean).length === 3 && t in N.CHAIN_NAME_MAP;
  },
  getAccount(s) {
    return s ? typeof s == "string" ? {
      address: s,
      chainId: void 0
    } : {
      address: s.address,
      chainId: s.chainId
    } : {
      address: void 0,
      chainId: void 0
    };
  },
  isMac() {
    const s = window == null ? void 0 : window.navigator.userAgent.toLowerCase();
    return s.includes("macintosh") && !s.includes("safari");
  },
  formatTelegramSocialLoginUrl(s) {
    const e = `--${encodeURIComponent(window == null ? void 0 : window.location.href)}`, t = "state=";
    if (new URL(s).host === "auth.magic.link") {
      const n = "provider_authorization_url=", i = s.substring(s.indexOf(n) + n.length), o = this.injectIntoUrl(decodeURIComponent(i), t, e);
      return s.replace(i, encodeURIComponent(o));
    }
    return this.injectIntoUrl(s, t, e);
  },
  injectIntoUrl(s, e, t) {
    const r = s.indexOf(e);
    if (r === -1)
      throw new Error(`${e} parameter not found in the URL: ${s}`);
    const n = s.indexOf("&", r), i = e.length, o = n !== -1 ? n : s.length, a = s.substring(0, r + i), c = s.substring(r + i, o), l = s.substring(n), d = c + t;
    return a + d + l;
  }
};
async function Jn(...s) {
  const e = await fetch(...s);
  if (!e.ok)
    throw new Error(`HTTP status code: ${e.status}`, {
      cause: e
    });
  return e;
}
class Ji {
  constructor({ baseUrl: e, clientId: t }) {
    this.baseUrl = e, this.clientId = t;
  }
  async get({ headers: e, signal: t, cache: r, ...n }) {
    const i = this.createUrl(n);
    return (await Jn(i, { method: "GET", headers: e, signal: t, cache: r })).json();
  }
  async getBlob({ headers: e, signal: t, ...r }) {
    const n = this.createUrl(r);
    return (await Jn(n, { method: "GET", headers: e, signal: t })).blob();
  }
  async post({ body: e, headers: t, signal: r, ...n }) {
    const i = this.createUrl(n);
    return (await Jn(i, {
      method: "POST",
      headers: t,
      body: e ? JSON.stringify(e) : void 0,
      signal: r
    })).json();
  }
  async put({ body: e, headers: t, signal: r, ...n }) {
    const i = this.createUrl(n);
    return (await Jn(i, {
      method: "PUT",
      headers: t,
      body: e ? JSON.stringify(e) : void 0,
      signal: r
    })).json();
  }
  async delete({ body: e, headers: t, signal: r, ...n }) {
    const i = this.createUrl(n);
    return (await Jn(i, {
      method: "DELETE",
      headers: t,
      body: e ? JSON.stringify(e) : void 0,
      signal: r
    })).json();
  }
  createUrl({ path: e, params: t }) {
    const r = new URL(e, this.baseUrl);
    return t && Object.entries(t).forEach(([n, i]) => {
      i && r.searchParams.append(n, i);
    }), this.clientId && r.searchParams.append("clientId", this.clientId), r;
  }
}
const Ff = {
  getFeatureValue(s, e) {
    const t = e == null ? void 0 : e[s];
    return t === void 0 ? Ue.DEFAULT_FEATURES[s] : t;
  },
  filterSocialsByPlatform(s) {
    if (!s || !s.length)
      return s;
    if (te.isTelegram()) {
      if (te.isIos())
        return s.filter((e) => e !== "google");
      if (te.isMac())
        return s.filter((e) => e !== "x");
      if (te.isAndroid())
        return s.filter((e) => !["facebook", "x"].includes(e));
    }
    return s;
  }
}, oe = Ve({
  features: Ue.DEFAULT_FEATURES,
  projectId: "",
  sdkType: "appkit",
  sdkVersion: "html-wagmi-undefined",
  defaultAccountTypes: Ue.DEFAULT_ACCOUNT_TYPES,
  enableNetworkSwitch: !0,
  experimental_preferUniversalLinks: !1,
  remoteFeatures: {}
}), S = {
  state: oe,
  subscribeKey(s, e) {
    return It(oe, s, e);
  },
  setOptions(s) {
    Object.assign(oe, s);
  },
  setRemoteFeatures(s) {
    var t;
    if (!s)
      return;
    const e = { ...oe.remoteFeatures, ...s };
    oe.remoteFeatures = e, (t = oe.remoteFeatures) != null && t.socials && (oe.remoteFeatures.socials = Ff.filterSocialsByPlatform(oe.remoteFeatures.socials));
  },
  setFeatures(s) {
    if (!s)
      return;
    oe.features || (oe.features = Ue.DEFAULT_FEATURES);
    const e = { ...oe.features, ...s };
    oe.features = e;
  },
  setProjectId(s) {
    oe.projectId = s;
  },
  setCustomRpcUrls(s) {
    oe.customRpcUrls = s;
  },
  setAllWallets(s) {
    oe.allWallets = s;
  },
  setIncludeWalletIds(s) {
    oe.includeWalletIds = s;
  },
  setExcludeWalletIds(s) {
    oe.excludeWalletIds = s;
  },
  setFeaturedWalletIds(s) {
    oe.featuredWalletIds = s;
  },
  setTokens(s) {
    oe.tokens = s;
  },
  setTermsConditionsUrl(s) {
    oe.termsConditionsUrl = s;
  },
  setPrivacyPolicyUrl(s) {
    oe.privacyPolicyUrl = s;
  },
  setCustomWallets(s) {
    oe.customWallets = s;
  },
  setIsSiweEnabled(s) {
    oe.isSiweEnabled = s;
  },
  setIsUniversalProvider(s) {
    oe.isUniversalProvider = s;
  },
  setSdkVersion(s) {
    oe.sdkVersion = s;
  },
  setMetadata(s) {
    oe.metadata = s;
  },
  setDisableAppend(s) {
    oe.disableAppend = s;
  },
  setEIP6963Enabled(s) {
    oe.enableEIP6963 = s;
  },
  setDebug(s) {
    oe.debug = s;
  },
  setEnableWalletConnect(s) {
    oe.enableWalletConnect = s;
  },
  setEnableWalletGuide(s) {
    oe.enableWalletGuide = s;
  },
  setEnableAuthLogger(s) {
    oe.enableAuthLogger = s;
  },
  setEnableWallets(s) {
    oe.enableWallets = s;
  },
  setPreferUniversalLinks(s) {
    oe.experimental_preferUniversalLinks = s;
  },
  setSIWX(s) {
    oe.siwx = s;
  },
  setConnectMethodsOrder(s) {
    oe.features = {
      ...oe.features,
      connectMethodsOrder: s
    };
  },
  setWalletFeaturesOrder(s) {
    oe.features = {
      ...oe.features,
      walletFeaturesOrder: s
    };
  },
  setSocialsOrder(s) {
    oe.remoteFeatures = {
      ...oe.remoteFeatures,
      socials: s
    };
  },
  setCollapseWallets(s) {
    oe.features = {
      ...oe.features,
      collapseWallets: s
    };
  },
  setEnableEmbedded(s) {
    oe.enableEmbedded = s;
  },
  setAllowUnsupportedChain(s) {
    oe.allowUnsupportedChain = s;
  },
  setManualWCControl(s) {
    oe.manualWCControl = s;
  },
  setEnableNetworkSwitch(s) {
    oe.enableNetworkSwitch = s;
  },
  setEnableReconnect(s) {
    oe.enableReconnect = s;
  },
  setDefaultAccountTypes(s = {}) {
    Object.entries(s).forEach(([e, t]) => {
      t && (oe.defaultAccountTypes[e] = t);
    });
  },
  setUniversalProviderConfigOverride(s) {
    oe.universalProviderConfigOverride = s;
  },
  getUniversalProviderConfigOverride() {
    return oe.universalProviderConfigOverride;
  },
  getSnapshot() {
    return xi(oe);
  }
}, jf = Object.freeze({
  enabled: !0,
  events: []
}), qf = new Ji({ baseUrl: te.getAnalyticsUrl(), clientId: null }), Wf = 5, Hf = 60 * 1e3, rr = Ve({
  ...jf
}), zf = {
  state: rr,
  subscribeKey(s, e) {
    return It(rr, s, e);
  },
  async sendError(s, e) {
    if (!rr.enabled)
      return;
    const t = Date.now();
    if (rr.events.filter((i) => {
      const o = new Date(i.properties.timestamp || "").getTime();
      return t - o < Hf;
    }).length >= Wf)
      return;
    const n = {
      type: "error",
      event: e,
      properties: {
        errorType: s.name,
        errorMessage: s.message,
        stackTrace: s.stack,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      }
    };
    rr.events.push(n);
    try {
      if (typeof window > "u")
        return;
      const { projectId: i, sdkType: o, sdkVersion: a } = S.state;
      await qf.post({
        path: "/e",
        params: {
          projectId: i,
          st: o,
          sv: a || "html-wagmi-4.2.2"
        },
        body: {
          eventId: te.getUUID(),
          url: window.location.href,
          domain: window.location.hostname,
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          props: {
            type: "error",
            event: e,
            errorType: s.name,
            errorMessage: s.message,
            stackTrace: s.stack
          }
        }
      });
    } catch {
    }
  },
  enable() {
    rr.enabled = !0;
  },
  disable() {
    rr.enabled = !1;
  },
  clearEvents() {
    rr.events = [];
  }
};
class Ln extends Error {
  constructor(e, t, r) {
    super(e), this.name = "AppKitError", this.category = t, this.originalError = r, Object.setPrototypeOf(this, Ln.prototype);
    let n = !1;
    if (r instanceof Error && typeof r.stack == "string" && r.stack) {
      const i = r.stack, o = i.indexOf(`
`);
      if (o > -1) {
        const a = i.substring(o + 1);
        this.stack = `${this.name}: ${this.message}
${a}`, n = !0;
      }
    }
    n || (Error.captureStackTrace ? Error.captureStackTrace(this, Ln) : this.stack || (this.stack = `${this.name}: ${this.message}`));
  }
}
function Tl(s, e) {
  const t = s instanceof Ln ? s : new Ln(s instanceof Error ? s.message : String(s), e, s);
  throw zf.sendError(t, t.category), t;
}
function Qt(s, e = "INTERNAL_SDK_ERROR") {
  const t = {};
  return Object.keys(s).forEach((r) => {
    const n = s[r];
    if (typeof n == "function") {
      let i = n;
      n.constructor.name === "AsyncFunction" ? i = async (...o) => {
        try {
          return await n(...o);
        } catch (a) {
          return Tl(a, e);
        }
      } : i = (...o) => {
        try {
          return n(...o);
        } catch (a) {
          return Tl(a, e);
        }
      }, t[r] = i;
    } else
      t[r] = n;
  }), t;
}
const Vf = "https://secure.walletconnect.org/sdk", Kf = (typeof process < "u" && typeof process.env < "u" ? process.env.NEXT_PUBLIC_SECURE_SITE_SDK_URL : void 0) || Vf, Gf = (typeof process < "u" && typeof process.env < "u" ? process.env.NEXT_PUBLIC_DEFAULT_LOG_LEVEL : void 0) || "error", Yf = (typeof process < "u" && typeof process.env < "u" ? process.env.NEXT_PUBLIC_SECURE_SITE_SDK_VERSION : void 0) || "4", ee = {
  APP_EVENT_KEY: "@w3m-app/",
  FRAME_EVENT_KEY: "@w3m-frame/",
  RPC_METHOD_KEY: "RPC_",
  STORAGE_KEY: "@appkit-wallet/",
  SESSION_TOKEN_KEY: "SESSION_TOKEN_KEY",
  EMAIL_LOGIN_USED_KEY: "EMAIL_LOGIN_USED_KEY",
  LAST_USED_CHAIN_KEY: "LAST_USED_CHAIN_KEY",
  LAST_EMAIL_LOGIN_TIME: "LAST_EMAIL_LOGIN_TIME",
  EMAIL: "EMAIL",
  PREFERRED_ACCOUNT_TYPE: "PREFERRED_ACCOUNT_TYPE",
  SMART_ACCOUNT_ENABLED: "SMART_ACCOUNT_ENABLED",
  SMART_ACCOUNT_ENABLED_NETWORKS: "SMART_ACCOUNT_ENABLED_NETWORKS",
  SOCIAL_USERNAME: "SOCIAL_USERNAME",
  APP_SWITCH_NETWORK: "@w3m-app/SWITCH_NETWORK",
  APP_CONNECT_EMAIL: "@w3m-app/CONNECT_EMAIL",
  APP_CONNECT_DEVICE: "@w3m-app/CONNECT_DEVICE",
  APP_CONNECT_OTP: "@w3m-app/CONNECT_OTP",
  APP_CONNECT_SOCIAL: "@w3m-app/CONNECT_SOCIAL",
  APP_GET_SOCIAL_REDIRECT_URI: "@w3m-app/GET_SOCIAL_REDIRECT_URI",
  APP_GET_USER: "@w3m-app/GET_USER",
  APP_SIGN_OUT: "@w3m-app/SIGN_OUT",
  APP_IS_CONNECTED: "@w3m-app/IS_CONNECTED",
  APP_GET_CHAIN_ID: "@w3m-app/GET_CHAIN_ID",
  APP_RPC_REQUEST: "@w3m-app/RPC_REQUEST",
  APP_UPDATE_EMAIL: "@w3m-app/UPDATE_EMAIL",
  APP_UPDATE_EMAIL_PRIMARY_OTP: "@w3m-app/UPDATE_EMAIL_PRIMARY_OTP",
  APP_UPDATE_EMAIL_SECONDARY_OTP: "@w3m-app/UPDATE_EMAIL_SECONDARY_OTP",
  APP_AWAIT_UPDATE_EMAIL: "@w3m-app/AWAIT_UPDATE_EMAIL",
  APP_SYNC_THEME: "@w3m-app/SYNC_THEME",
  APP_SYNC_DAPP_DATA: "@w3m-app/SYNC_DAPP_DATA",
  APP_GET_SMART_ACCOUNT_ENABLED_NETWORKS: "@w3m-app/GET_SMART_ACCOUNT_ENABLED_NETWORKS",
  APP_INIT_SMART_ACCOUNT: "@w3m-app/INIT_SMART_ACCOUNT",
  APP_SET_PREFERRED_ACCOUNT: "@w3m-app/SET_PREFERRED_ACCOUNT",
  APP_CONNECT_FARCASTER: "@w3m-app/CONNECT_FARCASTER",
  APP_GET_FARCASTER_URI: "@w3m-app/GET_FARCASTER_URI",
  APP_RELOAD: "@w3m-app/RELOAD",
  APP_RPC_ABORT: "@w3m-app/RPC_ABORT",
  FRAME_SWITCH_NETWORK_ERROR: "@w3m-frame/SWITCH_NETWORK_ERROR",
  FRAME_SWITCH_NETWORK_SUCCESS: "@w3m-frame/SWITCH_NETWORK_SUCCESS",
  FRAME_CONNECT_EMAIL_ERROR: "@w3m-frame/CONNECT_EMAIL_ERROR",
  FRAME_CONNECT_EMAIL_SUCCESS: "@w3m-frame/CONNECT_EMAIL_SUCCESS",
  FRAME_CONNECT_DEVICE_ERROR: "@w3m-frame/CONNECT_DEVICE_ERROR",
  FRAME_CONNECT_DEVICE_SUCCESS: "@w3m-frame/CONNECT_DEVICE_SUCCESS",
  FRAME_CONNECT_OTP_SUCCESS: "@w3m-frame/CONNECT_OTP_SUCCESS",
  FRAME_CONNECT_OTP_ERROR: "@w3m-frame/CONNECT_OTP_ERROR",
  FRAME_CONNECT_SOCIAL_SUCCESS: "@w3m-frame/CONNECT_SOCIAL_SUCCESS",
  FRAME_CONNECT_SOCIAL_ERROR: "@w3m-frame/CONNECT_SOCIAL_ERROR",
  FRAME_CONNECT_FARCASTER_SUCCESS: "@w3m-frame/CONNECT_FARCASTER_SUCCESS",
  FRAME_CONNECT_FARCASTER_ERROR: "@w3m-frame/CONNECT_FARCASTER_ERROR",
  FRAME_GET_FARCASTER_URI_SUCCESS: "@w3m-frame/GET_FARCASTER_URI_SUCCESS",
  FRAME_GET_FARCASTER_URI_ERROR: "@w3m-frame/GET_FARCASTER_URI_ERROR",
  FRAME_GET_SOCIAL_REDIRECT_URI_SUCCESS: "@w3m-frame/GET_SOCIAL_REDIRECT_URI_SUCCESS",
  FRAME_GET_SOCIAL_REDIRECT_URI_ERROR: "@w3m-frame/GET_SOCIAL_REDIRECT_URI_ERROR",
  FRAME_GET_USER_SUCCESS: "@w3m-frame/GET_USER_SUCCESS",
  FRAME_GET_USER_ERROR: "@w3m-frame/GET_USER_ERROR",
  FRAME_SIGN_OUT_SUCCESS: "@w3m-frame/SIGN_OUT_SUCCESS",
  FRAME_SIGN_OUT_ERROR: "@w3m-frame/SIGN_OUT_ERROR",
  FRAME_IS_CONNECTED_SUCCESS: "@w3m-frame/IS_CONNECTED_SUCCESS",
  FRAME_IS_CONNECTED_ERROR: "@w3m-frame/IS_CONNECTED_ERROR",
  FRAME_GET_CHAIN_ID_SUCCESS: "@w3m-frame/GET_CHAIN_ID_SUCCESS",
  FRAME_GET_CHAIN_ID_ERROR: "@w3m-frame/GET_CHAIN_ID_ERROR",
  FRAME_RPC_REQUEST_SUCCESS: "@w3m-frame/RPC_REQUEST_SUCCESS",
  FRAME_RPC_REQUEST_ERROR: "@w3m-frame/RPC_REQUEST_ERROR",
  FRAME_SESSION_UPDATE: "@w3m-frame/SESSION_UPDATE",
  FRAME_UPDATE_EMAIL_SUCCESS: "@w3m-frame/UPDATE_EMAIL_SUCCESS",
  FRAME_UPDATE_EMAIL_ERROR: "@w3m-frame/UPDATE_EMAIL_ERROR",
  FRAME_UPDATE_EMAIL_PRIMARY_OTP_SUCCESS: "@w3m-frame/UPDATE_EMAIL_PRIMARY_OTP_SUCCESS",
  FRAME_UPDATE_EMAIL_PRIMARY_OTP_ERROR: "@w3m-frame/UPDATE_EMAIL_PRIMARY_OTP_ERROR",
  FRAME_UPDATE_EMAIL_SECONDARY_OTP_SUCCESS: "@w3m-frame/UPDATE_EMAIL_SECONDARY_OTP_SUCCESS",
  FRAME_UPDATE_EMAIL_SECONDARY_OTP_ERROR: "@w3m-frame/UPDATE_EMAIL_SECONDARY_OTP_ERROR",
  FRAME_SYNC_THEME_SUCCESS: "@w3m-frame/SYNC_THEME_SUCCESS",
  FRAME_SYNC_THEME_ERROR: "@w3m-frame/SYNC_THEME_ERROR",
  FRAME_SYNC_DAPP_DATA_SUCCESS: "@w3m-frame/SYNC_DAPP_DATA_SUCCESS",
  FRAME_SYNC_DAPP_DATA_ERROR: "@w3m-frame/SYNC_DAPP_DATA_ERROR",
  FRAME_GET_SMART_ACCOUNT_ENABLED_NETWORKS_SUCCESS: "@w3m-frame/GET_SMART_ACCOUNT_ENABLED_NETWORKS_SUCCESS",
  FRAME_GET_SMART_ACCOUNT_ENABLED_NETWORKS_ERROR: "@w3m-frame/GET_SMART_ACCOUNT_ENABLED_NETWORKS_ERROR",
  FRAME_INIT_SMART_ACCOUNT_SUCCESS: "@w3m-frame/INIT_SMART_ACCOUNT_SUCCESS",
  FRAME_INIT_SMART_ACCOUNT_ERROR: "@w3m-frame/INIT_SMART_ACCOUNT_ERROR",
  FRAME_SET_PREFERRED_ACCOUNT_SUCCESS: "@w3m-frame/SET_PREFERRED_ACCOUNT_SUCCESS",
  FRAME_SET_PREFERRED_ACCOUNT_ERROR: "@w3m-frame/SET_PREFERRED_ACCOUNT_ERROR",
  FRAME_READY: "@w3m-frame/READY",
  FRAME_RELOAD_SUCCESS: "@w3m-frame/RELOAD_SUCCESS",
  FRAME_RELOAD_ERROR: "@w3m-frame/RELOAD_ERROR",
  FRAME_RPC_ABORT_SUCCESS: "@w3m-frame/RPC_ABORT_SUCCESS",
  FRAME_RPC_ABORT_ERROR: "@w3m-frame/RPC_ABORT_ERROR",
  RPC_RESPONSE_TYPE_ERROR: "RPC_RESPONSE_ERROR",
  RPC_RESPONSE_TYPE_TX: "RPC_RESPONSE_TRANSACTION_HASH",
  RPC_RESPONSE_TYPE_OBJECT: "RPC_RESPONSE_OBJECT"
}, it = {
  SAFE_RPC_METHODS: [
    "eth_accounts",
    "eth_blockNumber",
    "eth_call",
    "eth_chainId",
    "eth_estimateGas",
    "eth_feeHistory",
    "eth_gasPrice",
    "eth_getAccount",
    "eth_getBalance",
    "eth_getBlockByHash",
    "eth_getBlockByNumber",
    "eth_getBlockReceipts",
    "eth_getBlockTransactionCountByHash",
    "eth_getBlockTransactionCountByNumber",
    "eth_getCode",
    "eth_getFilterChanges",
    "eth_getFilterLogs",
    "eth_getLogs",
    "eth_getProof",
    "eth_getStorageAt",
    "eth_getTransactionByBlockHashAndIndex",
    "eth_getTransactionByBlockNumberAndIndex",
    "eth_getTransactionByHash",
    "eth_getTransactionCount",
    "eth_getTransactionReceipt",
    "eth_getUncleCountByBlockHash",
    "eth_getUncleCountByBlockNumber",
    "eth_maxPriorityFeePerGas",
    "eth_newBlockFilter",
    "eth_newFilter",
    "eth_newPendingTransactionFilter",
    "eth_sendRawTransaction",
    "eth_syncing",
    "eth_uninstallFilter",
    "wallet_getCapabilities",
    "wallet_getCallsStatus",
    "eth_getUserOperationReceipt",
    "eth_estimateUserOperationGas",
    "eth_getUserOperationByHash",
    "eth_supportedEntryPoints",
    "wallet_getAssets"
  ],
  NOT_SAFE_RPC_METHODS: [
    "personal_sign",
    "eth_signTypedData_v4",
    "eth_sendTransaction",
    "solana_signMessage",
    "solana_signTransaction",
    "solana_signAllTransactions",
    "solana_signAndSendTransaction",
    "wallet_sendCalls",
    "wallet_grantPermissions",
    "wallet_revokePermissions",
    "eth_sendUserOperation"
  ],
  GET_CHAIN_ID: "eth_chainId",
  RPC_METHOD_NOT_ALLOWED_MESSAGE: "Requested RPC call is not allowed",
  RPC_METHOD_NOT_ALLOWED_UI_MESSAGE: "Action not allowed",
  ACCOUNT_TYPES: {
    EOA: "eoa",
    SMART_ACCOUNT: "smartAccount"
  }
}, ks = {
  PHANTOM: {
    id: "a797aa35c0fadbfc1a53e7f675162ed5226968b44a19ee3d24385c64d1d3c393",
    url: "https://phantom.app"
  },
  SOLFLARE: {
    id: "1ca0bdd4747578705b1939af023d120677c64fe6ca76add81fda36e350605e79",
    url: "https://solflare.com"
  },
  COINBASE: {
    id: "fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa",
    url: "https://go.cb-w.com"
  }
}, Zf = {
  /**
   * Handles mobile wallet redirection for wallets that have Universal Links and doesn't support WalletConnect Deep Links.
   *
   * @param {string} id - The id of the wallet.
   * @param {ChainNamespace} namespace - The namespace of the chain.
   */
  handleMobileDeeplinkRedirect(s, e) {
    const t = window.location.href, r = encodeURIComponent(t);
    if (s === ks.PHANTOM.id && !("phantom" in window)) {
      const n = t.startsWith("https") ? "https" : "http", i = t.split("/")[2], o = encodeURIComponent(`${n}://${i}`);
      window.location.href = `${ks.PHANTOM.url}/ul/browse/${r}?ref=${o}`;
    }
    s === ks.SOLFLARE.id && !("solflare" in window) && (window.location.href = `${ks.SOLFLARE.url}/ul/v1/browse/${r}?ref=${r}`), e === N.CHAIN.SOLANA && s === ks.COINBASE.id && !("coinbaseSolana" in window) && (window.location.href = `${ks.COINBASE.url}/dapp?cb_url=${r}`);
  }
}, Wt = Ve({
  walletImages: {},
  networkImages: {},
  chainImages: {},
  connectorImages: {},
  tokenImages: {},
  currencyImages: {}
}), Jf = {
  state: Wt,
  subscribeNetworkImages(s) {
    return gt(Wt.networkImages, () => s(Wt.networkImages));
  },
  subscribeKey(s, e) {
    return It(Wt, s, e);
  },
  subscribe(s) {
    return gt(Wt, () => s(Wt));
  },
  setWalletImage(s, e) {
    Wt.walletImages[s] = e;
  },
  setNetworkImage(s, e) {
    Wt.networkImages[s] = e;
  },
  setChainImage(s, e) {
    Wt.chainImages[s] = e;
  },
  setConnectorImage(s, e) {
    Wt.connectorImages = { ...Wt.connectorImages, [s]: e };
  },
  setTokenImage(s, e) {
    Wt.tokenImages[s] = e;
  },
  setCurrencyImage(s, e) {
    Wt.currencyImages[s] = e;
  }
}, ws = Qt(Jf), Xf = {
  // Ethereum
  eip155: "ba0ba0cd-17c6-4806-ad93-f9d174f17900",
  // Solana
  solana: "a1b58899-f671-4276-6a5e-56ca5bd59700",
  // Polkadot
  polkadot: "",
  // Bitcoin
  bip122: "0b4838db-0161-4ffe-022d-532bf03dba00",
  // Cosmos
  cosmos: ""
}, va = Ve({
  networkImagePromises: {}
}), Mu = {
  async fetchWalletImage(s) {
    if (s)
      return await ne._fetchWalletImage(s), this.getWalletImageById(s);
  },
  async fetchNetworkImage(s) {
    if (!s)
      return;
    const e = this.getNetworkImageById(s);
    return e || (va.networkImagePromises[s] || (va.networkImagePromises[s] = ne._fetchNetworkImage(s)), await va.networkImagePromises[s], this.getNetworkImageById(s));
  },
  getWalletImageById(s) {
    if (s)
      return ws.state.walletImages[s];
  },
  getWalletImage(s) {
    if (s != null && s.image_url)
      return s == null ? void 0 : s.image_url;
    if (s != null && s.image_id)
      return ws.state.walletImages[s.image_id];
  },
  getNetworkImage(s) {
    var e, t, r;
    if ((e = s == null ? void 0 : s.assets) != null && e.imageUrl)
      return (t = s == null ? void 0 : s.assets) == null ? void 0 : t.imageUrl;
    if ((r = s == null ? void 0 : s.assets) != null && r.imageId)
      return ws.state.networkImages[s.assets.imageId];
  },
  getNetworkImageById(s) {
    if (s)
      return ws.state.networkImages[s];
  },
  getConnectorImage(s) {
    var e;
    if (s != null && s.imageUrl)
      return s.imageUrl;
    if ((e = s == null ? void 0 : s.info) != null && e.icon)
      return s.info.icon;
    if (s != null && s.imageId)
      return ws.state.connectorImages[s.imageId];
  },
  getChainImage(s) {
    return ws.state.networkImages[Xf[s]];
  }
}, nr = Ve({
  message: "",
  variant: "info",
  open: !1
}), Qf = {
  state: nr,
  subscribeKey(s, e) {
    return It(nr, s, e);
  },
  open(s, e) {
    const { debug: t } = S.state, { shortMessage: r, longMessage: n } = s;
    t && (nr.message = r, nr.variant = e, nr.open = !0), n && console.error(typeof n == "function" ? n() : n);
  },
  close() {
    nr.open = !1, nr.message = "", nr.variant = "info";
  }
}, rt = Qt(Qf), eg = te.getAnalyticsUrl(), tg = new Ji({ baseUrl: eg, clientId: null }), sg = ["MODAL_CREATED"], Ws = Ve({
  timestamp: Date.now(),
  reportedErrors: {},
  data: {
    type: "track",
    event: "MODAL_CREATED"
  }
}), $e = {
  state: Ws,
  subscribe(s) {
    return gt(Ws, () => s(Ws));
  },
  getSdkProperties() {
    const { projectId: s, sdkType: e, sdkVersion: t } = S.state;
    return {
      projectId: s,
      st: e,
      sv: t || "html-wagmi-4.2.2"
    };
  },
  async _sendAnalyticsEvent(s) {
    try {
      const e = X.state.address;
      if (sg.includes(s.data.event) || typeof window > "u")
        return;
      await tg.post({
        path: "/e",
        params: $e.getSdkProperties(),
        body: {
          eventId: te.getUUID(),
          url: window.location.href,
          domain: window.location.hostname,
          timestamp: s.timestamp,
          props: { ...s.data, address: e }
        }
      }), Ws.reportedErrors.FORBIDDEN = !1;
    } catch (e) {
      e instanceof Error && e.cause instanceof Response && e.cause.status === N.HTTP_STATUS_CODES.FORBIDDEN && !Ws.reportedErrors.FORBIDDEN && (rt.open({
        shortMessage: "Invalid App Configuration",
        longMessage: `Origin ${hi() ? window.origin : "uknown"} not found on Allowlist - update configuration on cloud.reown.com`
      }, "error"), Ws.reportedErrors.FORBIDDEN = !0);
    }
  },
  sendEvent(s) {
    var e;
    Ws.timestamp = Date.now(), Ws.data = s, (e = S.state.features) != null && e.analytics && $e._sendAnalyticsEvent(Ws);
  }
}, rg = te.getApiUrl(), Ot = new Ji({
  baseUrl: rg,
  clientId: null
}), ng = 40, Rl = 4, ig = 20, fe = Ve({
  promises: {},
  page: 1,
  count: 0,
  featured: [],
  allFeatured: [],
  recommended: [],
  allRecommended: [],
  wallets: [],
  filteredWallets: [],
  search: [],
  isAnalyticsEnabled: !1,
  excludedWallets: [],
  isFetchingRecommendedWallets: !1
}), ne = {
  state: fe,
  subscribeKey(s, e) {
    return It(fe, s, e);
  },
  _getSdkProperties() {
    const { projectId: s, sdkType: e, sdkVersion: t } = S.state;
    return {
      projectId: s,
      st: e || "appkit",
      sv: t || "html-wagmi-4.2.2"
    };
  },
  _filterOutExtensions(s) {
    return S.state.isUniversalProvider ? s.filter((e) => !!(e.mobile_link || e.desktop_link || e.webapp_link)) : s;
  },
  async _fetchWalletImage(s) {
    const e = `${Ot.baseUrl}/getWalletImage/${s}`, t = await Ot.getBlob({ path: e, params: ne._getSdkProperties() });
    ws.setWalletImage(s, URL.createObjectURL(t));
  },
  async _fetchNetworkImage(s) {
    const e = `${Ot.baseUrl}/public/getAssetImage/${s}`, t = await Ot.getBlob({ path: e, params: ne._getSdkProperties() });
    ws.setNetworkImage(s, URL.createObjectURL(t));
  },
  async _fetchConnectorImage(s) {
    const e = `${Ot.baseUrl}/public/getAssetImage/${s}`, t = await Ot.getBlob({ path: e, params: ne._getSdkProperties() });
    ws.setConnectorImage(s, URL.createObjectURL(t));
  },
  async _fetchCurrencyImage(s) {
    const e = `${Ot.baseUrl}/public/getCurrencyImage/${s}`, t = await Ot.getBlob({ path: e, params: ne._getSdkProperties() });
    ws.setCurrencyImage(s, URL.createObjectURL(t));
  },
  async _fetchTokenImage(s) {
    const e = `${Ot.baseUrl}/public/getTokenImage/${s}`, t = await Ot.getBlob({ path: e, params: ne._getSdkProperties() });
    ws.setTokenImage(s, URL.createObjectURL(t));
  },
  _filterWalletsByPlatform(s) {
    return te.isMobile() ? s == null ? void 0 : s.filter((t) => t.mobile_link || t.id === ks.COINBASE.id ? !0 : f.state.activeChain === "solana" && (t.id === ks.SOLFLARE.id || t.id === ks.PHANTOM.id)) : s;
  },
  async fetchProjectConfig() {
    return (await Ot.get({
      path: "/appkit/v1/config",
      params: ne._getSdkProperties()
    })).features;
  },
  async fetchAllowedOrigins() {
    try {
      const { allowedOrigins: s } = await Ot.get({
        path: "/projects/v1/origins",
        params: ne._getSdkProperties()
      });
      return s;
    } catch (s) {
      if (s instanceof Error && s.cause instanceof Response) {
        const e = s.cause.status;
        if (e === N.HTTP_STATUS_CODES.TOO_MANY_REQUESTS)
          throw new Error("RATE_LIMITED", { cause: s });
        if (e >= N.HTTP_STATUS_CODES.SERVER_ERROR && e < 600)
          throw new Error("SERVER_ERROR", { cause: s });
        return [];
      }
      return [];
    }
  },
  async fetchNetworkImages() {
    const s = f.getAllRequestedCaipNetworks(), e = s == null ? void 0 : s.map(({ assets: t }) => t == null ? void 0 : t.imageId).filter(Boolean).filter((t) => !Mu.getNetworkImageById(t));
    e && await Promise.allSettled(e.map((t) => ne._fetchNetworkImage(t)));
  },
  async fetchConnectorImages() {
    const { connectors: s } = F.state, e = s.map(({ imageId: t }) => t).filter(Boolean);
    await Promise.allSettled(e.map((t) => ne._fetchConnectorImage(t)));
  },
  async fetchCurrencyImages(s = []) {
    await Promise.allSettled(s.map((e) => ne._fetchCurrencyImage(e)));
  },
  async fetchTokenImages(s = []) {
    await Promise.allSettled(s.map((e) => ne._fetchTokenImage(e)));
  },
  async fetchWallets(s) {
    var i;
    const e = s.exclude ?? [];
    ne._getSdkProperties().sv.startsWith("html-core-") && e.push(...Object.values(ks).map((o) => o.id));
    const r = await Ot.get({
      path: "/getWallets",
      params: {
        ...ne._getSdkProperties(),
        ...s,
        page: String(s.page),
        entries: String(s.entries),
        include: (i = s.include) == null ? void 0 : i.join(","),
        exclude: e.join(",")
      }
    });
    return {
      data: ne._filterWalletsByPlatform(r == null ? void 0 : r.data) || [],
      // Keep original count for display on main page
      count: r == null ? void 0 : r.count
    };
  },
  async fetchFeaturedWallets() {
    const { featuredWalletIds: s } = S.state;
    if (s != null && s.length) {
      const e = {
        ...ne._getSdkProperties(),
        page: 1,
        entries: (s == null ? void 0 : s.length) ?? Rl,
        include: s
      }, { data: t } = await ne.fetchWallets(e), r = [...t].sort((i, o) => s.indexOf(i.id) - s.indexOf(o.id)), n = r.map((i) => i.image_id).filter(Boolean);
      await Promise.allSettled(n.map((i) => ne._fetchWalletImage(i))), fe.featured = r, fe.allFeatured = r;
    }
  },
  async fetchRecommendedWallets() {
    try {
      fe.isFetchingRecommendedWallets = !0;
      const { includeWalletIds: s, excludeWalletIds: e, featuredWalletIds: t } = S.state, r = [...e ?? [], ...t ?? []].filter(Boolean), n = f.getRequestedCaipNetworkIds().join(","), i = {
        page: 1,
        entries: Rl,
        include: s,
        exclude: r,
        chains: n
      }, { data: o, count: a } = await ne.fetchWallets(i), c = $.getRecentWallets(), l = o.map((u) => u.image_id).filter(Boolean), d = c.map((u) => u.image_id).filter(Boolean);
      await Promise.allSettled([...l, ...d].map((u) => ne._fetchWalletImage(u))), fe.recommended = o, fe.allRecommended = o, fe.count = a ?? 0;
    } catch {
    } finally {
      fe.isFetchingRecommendedWallets = !1;
    }
  },
  async fetchWalletsByPage({ page: s }) {
    const { includeWalletIds: e, excludeWalletIds: t, featuredWalletIds: r } = S.state, n = f.getRequestedCaipNetworkIds().join(","), i = [
      ...fe.recommended.map(({ id: d }) => d),
      ...t ?? [],
      ...r ?? []
    ].filter(Boolean), o = {
      page: s,
      entries: ng,
      include: e,
      exclude: i,
      chains: n
    }, { data: a, count: c } = await ne.fetchWallets(o), l = a.slice(0, ig).map((d) => d.image_id).filter(Boolean);
    await Promise.allSettled(l.map((d) => ne._fetchWalletImage(d))), fe.wallets = te.uniqueBy([...fe.wallets, ...ne._filterOutExtensions(a)], "id").filter((d) => {
      var u;
      return (u = d.chains) == null ? void 0 : u.some((p) => n.includes(p));
    }), fe.count = c > fe.count ? c : fe.count, fe.page = s;
  },
  async initializeExcludedWallets({ ids: s }) {
    const e = {
      page: 1,
      entries: s.length,
      include: s
    }, { data: t } = await ne.fetchWallets(e);
    t && t.forEach((r) => {
      fe.excludedWallets.push({ rdns: r.rdns, name: r.name });
    });
  },
  async searchWallet({ search: s, badge: e }) {
    const { includeWalletIds: t, excludeWalletIds: r } = S.state, n = f.getRequestedCaipNetworkIds().join(",");
    fe.search = [];
    const i = {
      page: 1,
      entries: 100,
      search: s == null ? void 0 : s.trim(),
      badge_type: e,
      include: t,
      exclude: r,
      chains: n
    }, { data: o } = await ne.fetchWallets(i);
    $e.sendEvent({
      type: "track",
      event: "SEARCH_WALLET",
      properties: { badge: e ?? "", search: s ?? "" }
    });
    const a = o.map((c) => c.image_id).filter(Boolean);
    await Promise.allSettled([
      ...a.map((c) => ne._fetchWalletImage(c)),
      te.wait(300)
    ]), fe.search = ne._filterOutExtensions(o);
  },
  initPromise(s, e) {
    const t = fe.promises[s];
    return t || (fe.promises[s] = e());
  },
  prefetch({ fetchConnectorImages: s = !0, fetchFeaturedWallets: e = !0, fetchRecommendedWallets: t = !0, fetchNetworkImages: r = !0 } = {}) {
    const n = [
      s && ne.initPromise("connectorImages", ne.fetchConnectorImages),
      e && ne.initPromise("featuredWallets", ne.fetchFeaturedWallets),
      t && ne.initPromise("recommendedWallets", ne.fetchRecommendedWallets),
      r && ne.initPromise("networkImages", ne.fetchNetworkImages)
    ].filter(Boolean);
    return Promise.allSettled(n);
  },
  prefetchAnalyticsConfig() {
    var s;
    (s = S.state.features) != null && s.analytics && ne.fetchAnalyticsConfig();
  },
  async fetchAnalyticsConfig() {
    try {
      const { isAnalyticsEnabled: s } = await Ot.get({
        path: "/getAnalyticsConfig",
        params: ne._getSdkProperties()
      });
      S.setFeatures({ analytics: s });
    } catch {
      S.setFeatures({ analytics: !1 });
    }
  },
  filterByNamespaces(s) {
    if (!(s != null && s.length)) {
      fe.featured = fe.allFeatured, fe.recommended = fe.allRecommended;
      return;
    }
    const e = f.getRequestedCaipNetworkIds().join(",");
    fe.featured = fe.allFeatured.filter((t) => {
      var r;
      return (r = t.chains) == null ? void 0 : r.some((n) => e.includes(n));
    }), fe.recommended = fe.allRecommended.filter((t) => {
      var r;
      return (r = t.chains) == null ? void 0 : r.some((n) => e.includes(n));
    }), fe.filteredWallets = fe.wallets.filter((t) => {
      var r;
      return (r = t.chains) == null ? void 0 : r.some((n) => e.includes(n));
    });
  },
  clearFilterByNamespaces() {
    fe.filteredWallets = [];
  },
  setFilterByNamespace(s) {
    if (!s) {
      fe.featured = fe.allFeatured, fe.recommended = fe.allRecommended;
      return;
    }
    const e = f.getRequestedCaipNetworkIds().join(",");
    fe.featured = fe.allFeatured.filter((t) => {
      var r;
      return (r = t.chains) == null ? void 0 : r.some((n) => e.includes(n));
    }), fe.recommended = fe.allRecommended.filter((t) => {
      var r;
      return (r = t.chains) == null ? void 0 : r.some((n) => e.includes(n));
    }), fe.filteredWallets = fe.wallets.filter((t) => {
      var r;
      return (r = t.chains) == null ? void 0 : r.some((n) => e.includes(n));
    });
  }
}, Me = Ve({
  view: "Connect",
  history: ["Connect"],
  transactionStack: []
}), og = {
  state: Me,
  subscribeKey(s, e) {
    return It(Me, s, e);
  },
  pushTransactionStack(s) {
    Me.transactionStack.push(s);
  },
  popTransactionStack(s) {
    const e = Me.transactionStack.pop();
    if (!e)
      return;
    const { onSuccess: t, onError: r, onCancel: n } = e;
    switch (s) {
      case "success":
        t == null || t();
        break;
      case "error":
        r == null || r(), de.goBack();
        break;
      case "cancel":
        n == null || n(), de.goBack();
        break;
    }
  },
  push(s, e) {
    s !== Me.view && (Me.view = s, Me.history.push(s), Me.data = e);
  },
  reset(s, e) {
    Me.view = s, Me.history = [s], Me.data = e;
  },
  replace(s, e) {
    Me.history.at(-1) === s || (Me.view = s, Me.history[Me.history.length - 1] = s, Me.data = e);
  },
  goBack() {
    var r;
    const s = f.state.activeCaipAddress, e = de.state.view === "ConnectingFarcaster", t = !s && e;
    if (Me.history.length > 1) {
      Me.history.pop();
      const [n] = Me.history.slice(-1);
      n && (s && n === "Connect" ? Me.view = "Account" : Me.view = n);
    } else
      Re.close();
    (r = Me.data) != null && r.wallet && (Me.data.wallet = void 0), setTimeout(() => {
      var n, i, o;
      if (t) {
        X.setFarcasterUrl(void 0, f.state.activeChain);
        const a = F.getAuthConnector();
        (n = a == null ? void 0 : a.provider) == null || n.reload();
        const c = xi(S.state);
        (o = (i = a == null ? void 0 : a.provider) == null ? void 0 : i.syncDappData) == null || o.call(i, {
          metadata: c.metadata,
          sdkVersion: c.sdkVersion,
          projectId: c.projectId,
          sdkType: c.sdkType
        });
      }
    }, 100);
  },
  goBackToIndex(s) {
    if (Me.history.length > 1) {
      Me.history = Me.history.slice(0, s + 1);
      const [e] = Me.history.slice(-1);
      e && (Me.view = e);
    }
  },
  goBackOrCloseModal() {
    de.state.history.length > 1 ? de.goBack() : Re.close();
  }
}, de = Qt(og), Hs = Ve({
  themeMode: "dark",
  themeVariables: {},
  w3mThemeVariables: void 0
}), ec = {
  state: Hs,
  subscribe(s) {
    return gt(Hs, () => s(Hs));
  },
  setThemeMode(s) {
    Hs.themeMode = s;
    try {
      const e = F.getAuthConnector();
      if (e) {
        const t = ec.getSnapshot().themeVariables;
        e.provider.syncTheme({
          themeMode: s,
          themeVariables: t,
          w3mThemeVariables: Zs(t, s)
        });
      }
    } catch {
      console.info("Unable to sync theme to auth connector");
    }
  },
  setThemeVariables(s) {
    Hs.themeVariables = { ...Hs.themeVariables, ...s };
    try {
      const e = F.getAuthConnector();
      if (e) {
        const t = ec.getSnapshot().themeVariables;
        e.provider.syncTheme({
          themeVariables: t,
          w3mThemeVariables: Zs(Hs.themeVariables, Hs.themeMode)
        });
      }
    } catch {
      console.info("Unable to sync theme to auth connector");
    }
  },
  getSnapshot() {
    return xi(Hs);
  }
}, Mt = Qt(ec), Bu = {
  eip155: void 0,
  solana: void 0,
  polkadot: void 0,
  bip122: void 0,
  cosmos: void 0
}, Ie = Ve({
  allConnectors: [],
  connectors: [],
  activeConnector: void 0,
  filterByNamespace: void 0,
  activeConnectorIds: { ...Bu },
  filterByNamespaceMap: {
    eip155: !0,
    solana: !0,
    polkadot: !0,
    bip122: !0,
    cosmos: !0
  }
}), ag = {
  state: Ie,
  subscribe(s) {
    return gt(Ie, () => {
      s(Ie);
    });
  },
  subscribeKey(s, e) {
    return It(Ie, s, e);
  },
  initialize(s) {
    s.forEach((e) => {
      const t = $.getConnectedConnectorId(e);
      t && F.setConnectorId(t, e);
    });
  },
  setActiveConnector(s) {
    s && (Ie.activeConnector = Vr(s));
  },
  setConnectors(s) {
    s.filter((n) => !Ie.allConnectors.some((i) => i.id === n.id && F.getConnectorName(i.name) === F.getConnectorName(n.name) && i.chain === n.chain)).forEach((n) => {
      n.type !== "MULTI_CHAIN" && Ie.allConnectors.push(Vr(n));
    });
    const t = F.getEnabledNamespaces(), r = F.getEnabledConnectors(t);
    Ie.connectors = F.mergeMultiChainConnectors(r);
  },
  filterByNamespaces(s) {
    Object.keys(Ie.filterByNamespaceMap).forEach((e) => {
      Ie.filterByNamespaceMap[e] = !1;
    }), s.forEach((e) => {
      Ie.filterByNamespaceMap[e] = !0;
    }), F.updateConnectorsForEnabledNamespaces();
  },
  filterByNamespace(s, e) {
    Ie.filterByNamespaceMap[s] = e, F.updateConnectorsForEnabledNamespaces();
  },
  updateConnectorsForEnabledNamespaces() {
    const s = F.getEnabledNamespaces(), e = F.getEnabledConnectors(s), t = F.areAllNamespacesEnabled();
    Ie.connectors = F.mergeMultiChainConnectors(e), t ? ne.clearFilterByNamespaces() : ne.filterByNamespaces(s);
  },
  getEnabledNamespaces() {
    return Object.entries(Ie.filterByNamespaceMap).filter(([s, e]) => e).map(([s]) => s);
  },
  getEnabledConnectors(s) {
    return Ie.allConnectors.filter((e) => s.includes(e.chain));
  },
  areAllNamespacesEnabled() {
    return Object.values(Ie.filterByNamespaceMap).every((s) => s);
  },
  mergeMultiChainConnectors(s) {
    const e = F.generateConnectorMapByName(s), t = [];
    return e.forEach((r) => {
      const n = r[0], i = (n == null ? void 0 : n.id) === N.CONNECTOR_ID.AUTH;
      r.length > 1 && n ? t.push({
        name: n.name,
        imageUrl: n.imageUrl,
        imageId: n.imageId,
        connectors: [...r],
        type: i ? "AUTH" : "MULTI_CHAIN",
        // These values are just placeholders, we don't use them in multi-chain connector select screen
        chain: "eip155",
        id: (n == null ? void 0 : n.id) || ""
      }) : n && t.push(n);
    }), t;
  },
  generateConnectorMapByName(s) {
    const e = /* @__PURE__ */ new Map();
    return s.forEach((t) => {
      const { name: r } = t, n = F.getConnectorName(r);
      if (!n)
        return;
      const i = e.get(n) || [];
      i.find((a) => a.chain === t.chain) || i.push(t), e.set(n, i);
    }), e;
  },
  getConnectorName(s) {
    return s && ({
      "Trust Wallet": "Trust"
    }[s] || s);
  },
  getUniqueConnectorsByName(s) {
    const e = [];
    return s.forEach((t) => {
      e.find((r) => r.chain === t.chain) || e.push(t);
    }), e;
  },
  addConnector(s) {
    var e, t, r;
    if (s.id === N.CONNECTOR_ID.AUTH) {
      const n = s, i = xi(S.state), o = Mt.getSnapshot().themeMode, a = Mt.getSnapshot().themeVariables;
      (t = (e = n == null ? void 0 : n.provider) == null ? void 0 : e.syncDappData) == null || t.call(e, {
        metadata: i.metadata,
        sdkVersion: i.sdkVersion,
        projectId: i.projectId,
        sdkType: i.sdkType
      }), (r = n == null ? void 0 : n.provider) == null || r.syncTheme({
        themeMode: o,
        themeVariables: a,
        w3mThemeVariables: Zs(a, o)
      }), F.setConnectors([s]);
    } else
      F.setConnectors([s]);
  },
  getAuthConnector(s) {
    var r;
    const e = s || f.state.activeChain, t = Ie.connectors.find((n) => n.id === N.CONNECTOR_ID.AUTH);
    if (t)
      return (r = t == null ? void 0 : t.connectors) != null && r.length ? t.connectors.find((i) => i.chain === e) : t;
  },
  getAnnouncedConnectorRdns() {
    return Ie.connectors.filter((s) => s.type === "ANNOUNCED").map((s) => {
      var e;
      return (e = s.info) == null ? void 0 : e.rdns;
    });
  },
  getConnectorById(s) {
    return Ie.allConnectors.find((e) => e.id === s);
  },
  getConnector(s, e) {
    return Ie.allConnectors.filter((r) => r.chain === f.state.activeChain).find((r) => {
      var n;
      return r.explorerId === s || ((n = r.info) == null ? void 0 : n.rdns) === e;
    });
  },
  syncIfAuthConnector(s) {
    var i, o;
    if (s.id !== "ID_AUTH")
      return;
    const e = s, t = xi(S.state), r = Mt.getSnapshot().themeMode, n = Mt.getSnapshot().themeVariables;
    (o = (i = e == null ? void 0 : e.provider) == null ? void 0 : i.syncDappData) == null || o.call(i, {
      metadata: t.metadata,
      sdkVersion: t.sdkVersion,
      sdkType: t.sdkType,
      projectId: t.projectId
    }), e.provider.syncTheme({
      themeMode: r,
      themeVariables: n,
      w3mThemeVariables: Zs(n, r)
    });
  },
  /**
   * Returns the connectors filtered by namespace.
   * @param namespace - The namespace to filter the connectors by.
   * @returns ConnectorWithProviders[].
   */
  getConnectorsByNamespace(s) {
    const e = Ie.allConnectors.filter((t) => t.chain === s);
    return F.mergeMultiChainConnectors(e);
  },
  canSwitchToSmartAccount(s) {
    return f.checkIfSmartAccountEnabled() && As(s) === it.ACCOUNT_TYPES.EOA;
  },
  selectWalletConnector(s) {
    const e = F.getConnector(s.id, s.rdns), t = f.state.activeChain;
    Zf.handleMobileDeeplinkRedirect((e == null ? void 0 : e.explorerId) || s.id, t), e ? de.push("ConnectingExternal", { connector: e }) : de.push("ConnectingWalletConnect", { wallet: s });
  },
  /**
   * Returns the connectors. If a namespace is provided, the connectors are filtered by namespace.
   * @param namespace - The namespace to filter the connectors by. If not provided, all connectors are returned.
   * @returns ConnectorWithProviders[].
   */
  getConnectors(s) {
    return s ? F.getConnectorsByNamespace(s) : F.mergeMultiChainConnectors(Ie.allConnectors);
  },
  /**
   * Sets the filter by namespace and updates the connectors.
   * @param namespace - The namespace to filter the connectors by.
   */
  setFilterByNamespace(s) {
    Ie.filterByNamespace = s, Ie.connectors = F.getConnectors(s), ne.setFilterByNamespace(s);
  },
  setConnectorId(s, e) {
    s && (Ie.activeConnectorIds = {
      ...Ie.activeConnectorIds,
      [e]: s
    }, $.setConnectedConnectorId(e, s));
  },
  removeConnectorId(s) {
    Ie.activeConnectorIds = {
      ...Ie.activeConnectorIds,
      [s]: void 0
    }, $.deleteConnectedConnectorId(s);
  },
  getConnectorId(s) {
    if (s)
      return Ie.activeConnectorIds[s];
  },
  isConnected(s) {
    return s ? !!Ie.activeConnectorIds[s] : Object.values(Ie.activeConnectorIds).some((e) => !!e);
  },
  resetConnectorIds() {
    Ie.activeConnectorIds = { ...Bu };
  }
}, F = Qt(ag), cg = 1e3, Xn = {
  checkNamespaceConnectorId(s, e) {
    return F.getConnectorId(s) === e;
  },
  isSocialProvider(s) {
    return Ue.DEFAULT_REMOTE_FEATURES.socials.includes(s);
  },
  connectWalletConnect({ walletConnect: s, connector: e, closeModalOnConnect: t = !0, redirectViewOnModalClose: r = "Connect", onOpen: n, onConnect: i }) {
    return new Promise((o, a) => {
      if (s && F.setActiveConnector(e), n == null || n(te.isMobile() && s), r) {
        const l = Re.subscribeKey("open", (d) => {
          d || (de.state.view !== r && de.replace(r), l(), a(new Error("Modal closed")));
        });
      }
      const c = f.subscribeKey("activeCaipAddress", (l) => {
        l && (i == null || i(), t && Re.close(), c(), o(Kt.parseCaipAddress(l)));
      });
    });
  },
  connectExternal(s) {
    return new Promise((e, t) => {
      const r = f.subscribeKey("activeCaipAddress", (n) => {
        n && (Re.close(), r(), e(Kt.parseCaipAddress(n)));
      });
      q.connectExternal(s, s.chain).catch(() => {
        r(), t(new Error("Connection rejected"));
      });
    });
  },
  connectSocial({ social: s, closeModalOnConnect: e = !0, onOpenFarcaster: t, onConnect: r }) {
    let n = X.state.socialWindow, i = X.state.socialProvider, o = !1, a = null;
    const c = f.subscribeKey("activeCaipAddress", (l) => {
      l && (e && Re.close(), c());
    });
    return new Promise((l, d) => {
      async function u(g) {
        var w;
        if ((w = g.data) != null && w.resultUri)
          if (g.origin === N.SECURE_SITE_SDK_ORIGIN) {
            window.removeEventListener("message", u, !1);
            try {
              const m = F.getAuthConnector();
              if (m && !o) {
                n && (n.close(), X.setSocialWindow(void 0, f.state.activeChain), n = X.state.socialWindow), o = !0;
                const y = g.data.resultUri;
                if (i && $e.sendEvent({
                  type: "track",
                  event: "SOCIAL_LOGIN_REQUEST_USER_DATA",
                  properties: { provider: i }
                }), await m.provider.connectSocial(y), i) {
                  $.setConnectedSocialProvider(i), await q.connectExternal({
                    id: m.id,
                    type: m.type,
                    socialUri: y
                  }, m.chain);
                  const C = f.state.activeCaipAddress;
                  if (!C) {
                    d(new Error("Failed to connect"));
                    return;
                  }
                  l(Kt.parseCaipAddress(C)), $e.sendEvent({
                    type: "track",
                    event: "SOCIAL_LOGIN_SUCCESS",
                    properties: { provider: i }
                  });
                }
              }
            } catch {
              i && $e.sendEvent({
                type: "track",
                event: "SOCIAL_LOGIN_ERROR",
                properties: { provider: i }
              }), d(new Error("Failed to connect"));
            }
          } else i && $e.sendEvent({
            type: "track",
            event: "SOCIAL_LOGIN_ERROR",
            properties: { provider: i }
          });
      }
      async function p() {
        if (s && (X.setSocialProvider(s, f.state.activeChain), i = X.state.socialProvider, $e.sendEvent({
          type: "track",
          event: "SOCIAL_LOGIN_STARTED",
          properties: { provider: i }
        })), i === "farcaster") {
          t == null || t();
          const g = Re.subscribeKey("open", (m) => {
            !m && s === "farcaster" && (d(new Error("Popup closed")), r == null || r(), g());
          }), w = F.getAuthConnector();
          if (w && !X.state.farcasterUrl)
            try {
              const { url: m } = await w.provider.getFarcasterUri();
              X.setFarcasterUrl(m, f.state.activeChain);
            } catch {
              d(new Error("Failed to connect to farcaster"));
            }
        } else {
          const g = F.getAuthConnector();
          a = te.returnOpenHref(`${N.SECURE_SITE_SDK_ORIGIN}/loading`, "popupWindow", "width=600,height=800,scrollbars=yes");
          try {
            if (g && i) {
              const { uri: w } = await g.provider.getSocialRedirectUri({
                provider: i
              });
              if (a && w) {
                X.setSocialWindow(a, f.state.activeChain), n = X.state.socialWindow, a.location.href = w;
                const m = setInterval(() => {
                  n != null && n.closed && !o && (d(new Error("Popup closed")), clearInterval(m));
                }, 1e3);
                window.addEventListener("message", u, !1);
              } else
                a == null || a.close(), d(new Error("Failed to initiate social connection"));
            }
          } catch {
            d(new Error("Failed to initiate social connection")), a == null || a.close();
          }
        }
      }
      p();
    });
  },
  connectEmail({ closeModalOnConnect: s = !0, redirectViewOnModalClose: e = "Connect", onOpen: t, onConnect: r }) {
    return new Promise((n, i) => {
      if (t == null || t(), e) {
        const a = Re.subscribeKey("open", (c) => {
          c || (de.state.view !== e && de.replace(e), a(), i(new Error("Modal closed")));
        });
      }
      const o = f.subscribeKey("activeCaipAddress", (a) => {
        a && (r == null || r(), s && Re.close(), o(), n(Kt.parseCaipAddress(a)));
      });
    });
  },
  async updateEmail() {
    const s = $.getConnectedConnectorId(f.state.activeChain), e = F.getAuthConnector();
    if (!e)
      throw new Error("No auth connector found");
    if (s !== N.CONNECTOR_ID.AUTH)
      throw new Error("Not connected to email or social");
    const t = e.provider.getEmail() ?? "";
    return de.push("UpdateEmailWallet", {
      email: t,
      redirectView: void 0
    }), new Promise((r, n) => {
      const i = setInterval(() => {
        const a = e.provider.getEmail() ?? "";
        a !== t && (Re.close(), clearInterval(i), o(), r({ email: a }));
      }, cg), o = Re.subscribeKey("open", (a) => {
        a || (de.state.view !== "Connect" && de.push("Connect"), clearInterval(i), o(), n(new Error("Modal closed")));
      });
    });
  },
  canSwitchToSmartAccount(s) {
    return f.checkIfSmartAccountEnabled() && As(s) === it.ACCOUNT_TYPES.EOA;
  }
};
function Fu() {
  var r, n;
  const s = ((r = f.state.activeCaipNetwork) == null ? void 0 : r.chainNamespace) || "eip155", e = ((n = f.state.activeCaipNetwork) == null ? void 0 : n.id) || 1, t = Ue.NATIVE_TOKEN_ADDRESS[s];
  return `${s}:${e}:${t}`;
}
function As(s) {
  var t;
  return (t = f.getAccountData(s)) == null ? void 0 : t.preferredAccountType;
}
const Bo = {
  getConnectionStatus(s, e) {
    const t = F.state.activeConnectorIds[e], r = q.getConnections(e);
    return !!t && s.connectorId === t ? "connected" : r.some((o) => o.connectorId.toLowerCase() === s.connectorId.toLowerCase()) ? "active" : "disconnected";
  },
  excludeConnectorAddressFromConnections({ connections: s, connectorId: e, addresses: t }) {
    return s.map((r) => {
      if ((e ? r.connectorId.toLowerCase() === e.toLowerCase() : !1) && t) {
        const i = r.accounts.filter((o) => !t.some((c) => c.toLowerCase() === o.address.toLowerCase()));
        return { ...r, accounts: i };
      }
      return r;
    });
  },
  excludeExistingConnections(s, e) {
    const t = new Set(s);
    return e.filter((r) => !t.has(r.connectorId));
  },
  getConnectionsByConnectorId(s, e) {
    return s.filter((t) => t.connectorId.toLowerCase() === e.toLowerCase());
  },
  getConnectionsData(s) {
    var a;
    const e = !!((a = S.state.remoteFeatures) != null && a.multiWallet), t = F.state.activeConnectorIds[s], r = q.getConnections(s), i = (q.state.recentConnections.get(s) ?? []).filter((c) => F.getConnectorById(c.connectorId)), o = Bo.excludeExistingConnections([...r.map((c) => c.connectorId), ...t ? [t] : []], i);
    return e ? {
      connections: r,
      recentConnections: o
    } : {
      connections: r.filter((c) => c.connectorId.toLowerCase() === (t == null ? void 0 : t.toLowerCase())),
      recentConnections: []
    };
  }
}, Dr = Object.freeze({
  message: "",
  variant: "success",
  svg: void 0,
  open: !1,
  autoClose: !0
}), tt = Ve({
  ...Dr
}), lg = {
  state: tt,
  subscribeKey(s, e) {
    return It(tt, s, e);
  },
  showLoading(s, e = {}) {
    this._showMessage({ message: s, variant: "loading", ...e });
  },
  showSuccess(s) {
    this._showMessage({ message: s, variant: "success" });
  },
  showSvg(s, e) {
    this._showMessage({ message: s, svg: e });
  },
  showError(s) {
    const e = te.parseError(s);
    this._showMessage({ message: e, variant: "error" });
  },
  hide() {
    tt.message = Dr.message, tt.variant = Dr.variant, tt.svg = Dr.svg, tt.open = Dr.open, tt.autoClose = Dr.autoClose;
  },
  _showMessage({ message: s, svg: e, variant: t = "success", autoClose: r = Dr.autoClose }) {
    tt.open ? (tt.open = !1, setTimeout(() => {
      tt.message = s, tt.variant = t, tt.svg = e, tt.open = !0, tt.autoClose = r;
    }, 150)) : (tt.message = s, tt.variant = t, tt.svg = e, tt.open = !0, tt.autoClose = r);
  }
}, ys = lg, qe = Ve({
  transactions: [],
  coinbaseTransactions: {},
  transactionsByYear: {},
  lastNetworkInView: void 0,
  loading: !1,
  empty: !1,
  next: void 0
}), dg = {
  state: qe,
  subscribe(s) {
    return gt(qe, () => s(qe));
  },
  setLastNetworkInView(s) {
    qe.lastNetworkInView = s;
  },
  async fetchTransactions(s, e) {
    var t;
    if (!s)
      throw new Error("Transactions can't be fetched without an accountAddress");
    qe.loading = !0;
    try {
      const r = await ae.fetchTransactions({
        account: s,
        cursor: qe.next,
        onramp: e,
        // Coinbase transaction history state updates require the latest data
        cache: e === "coinbase" ? "no-cache" : void 0,
        chainId: (t = f.state.activeCaipNetwork) == null ? void 0 : t.caipNetworkId
      }), n = pi.filterSpamTransactions(r.data), i = pi.filterByConnectedChain(n), o = [...qe.transactions, ...i];
      qe.loading = !1, e === "coinbase" ? qe.coinbaseTransactions = pi.groupTransactionsByYearAndMonth(qe.coinbaseTransactions, r.data) : (qe.transactions = o, qe.transactionsByYear = pi.groupTransactionsByYearAndMonth(qe.transactionsByYear, i)), qe.empty = o.length === 0, qe.next = r.next ? r.next : void 0;
    } catch {
      const n = f.state.activeChain;
      $e.sendEvent({
        type: "track",
        event: "ERROR_FETCH_TRANSACTIONS",
        properties: {
          address: s,
          projectId: S.state.projectId,
          cursor: qe.next,
          isSmartAccount: As(n) === it.ACCOUNT_TYPES.SMART_ACCOUNT
        }
      }), ys.showError("Failed to fetch transactions"), qe.loading = !1, qe.empty = !0, qe.next = void 0;
    }
  },
  groupTransactionsByYearAndMonth(s = {}, e = []) {
    const t = s;
    return e.forEach((r) => {
      const n = new Date(r.metadata.minedAt).getFullYear(), i = new Date(r.metadata.minedAt).getMonth(), o = t[n] ?? {}, c = (o[i] ?? []).filter((l) => l.id !== r.id);
      t[n] = {
        ...o,
        [i]: [...c, r].sort((l, d) => new Date(d.metadata.minedAt).getTime() - new Date(l.metadata.minedAt).getTime())
      };
    }), t;
  },
  filterSpamTransactions(s) {
    return s.filter((e) => !e.transfers.every((r) => {
      var n;
      return ((n = r.nft_info) == null ? void 0 : n.flags.is_spam) === !0;
    }));
  },
  filterByConnectedChain(s) {
    var r;
    const e = (r = f.state.activeCaipNetwork) == null ? void 0 : r.caipNetworkId;
    return s.filter((n) => n.metadata.chain === e);
  },
  clearCursor() {
    qe.next = void 0;
  },
  resetTransactions() {
    qe.transactions = [], qe.transactionsByYear = {}, qe.lastNetworkInView = void 0, qe.loading = !1, qe.empty = !1, qe.next = void 0;
  }
}, pi = Qt(dg, "API_ERROR"), _e = Ve({
  connections: /* @__PURE__ */ new Map(),
  recentConnections: /* @__PURE__ */ new Map(),
  isSwitchingConnection: !1,
  wcError: !1,
  buffering: !1,
  status: "disconnected"
});
let xr;
const ug = {
  state: _e,
  subscribe(s) {
    return gt(_e, () => s(_e));
  },
  subscribeKey(s, e) {
    return It(_e, s, e);
  },
  _getClient() {
    return _e._client;
  },
  setClient(s) {
    _e._client = Vr(s);
  },
  initialize(s) {
    const e = s.map((t) => t.namespace).filter(Boolean);
    q.syncStorageConnections(e);
  },
  syncStorageConnections(s) {
    const e = $.getConnections(), t = s ?? Array.from(f.state.chains.keys());
    for (const r of t) {
      const n = e[r] ?? [], i = new Map(_e.recentConnections);
      i.set(r, n), _e.recentConnections = i;
    }
  },
  getConnections(s) {
    return s ? _e.connections.get(s) ?? [] : [];
  },
  hasAnyConnection(s) {
    const e = q.state.connections;
    return Array.from(e.values()).flatMap((t) => t).some(({ connectorId: t }) => t === s);
  },
  async connectWalletConnect() {
    var s, e, t, r;
    if (te.isTelegram() || te.isSafari() && te.isIos()) {
      if (xr) {
        await xr, xr = void 0;
        return;
      }
      if (!te.isPairingExpired(_e == null ? void 0 : _e.wcPairingExpiry)) {
        const n = _e.wcUri;
        _e.wcUri = n;
        return;
      }
      xr = (e = (s = q._getClient()) == null ? void 0 : s.connectWalletConnect) == null ? void 0 : e.call(s).catch(() => {
      }), q.state.status = "connecting", await xr, xr = void 0, _e.wcPairingExpiry = void 0, q.state.status = "connected";
    } else
      await ((r = (t = q._getClient()) == null ? void 0 : t.connectWalletConnect) == null ? void 0 : r.call(t));
  },
  async connectExternal(s, e, t = !0) {
    var n, i;
    const r = await ((i = (n = q._getClient()) == null ? void 0 : n.connectExternal) == null ? void 0 : i.call(n, s));
    return t && f.setActiveNamespace(e), r;
  },
  async reconnectExternal(s) {
    var t, r;
    await ((r = (t = q._getClient()) == null ? void 0 : t.reconnectExternal) == null ? void 0 : r.call(t, s));
    const e = s.chain || f.state.activeChain;
    e && F.setConnectorId(s.id, e);
  },
  async setPreferredAccountType(s, e) {
    var r;
    Re.setLoading(!0, f.state.activeChain);
    const t = F.getAuthConnector();
    t && (X.setPreferredAccountType(s, e), await t.provider.setPreferredAccount(s), $.setPreferredAccountTypes(Object.entries(f.state.chains).reduce((n, [i, o]) => {
      const a = i, c = As(a);
      return c !== void 0 && (n[a] = c), n;
    }, {})), await q.reconnectExternal(t), Re.setLoading(!1, f.state.activeChain), $e.sendEvent({
      type: "track",
      event: "SET_PREFERRED_ACCOUNT_TYPE",
      properties: {
        accountType: s,
        network: ((r = f.state.activeCaipNetwork) == null ? void 0 : r.caipNetworkId) || ""
      }
    }));
  },
  async signMessage(s) {
    var e;
    return (e = q._getClient()) == null ? void 0 : e.signMessage(s);
  },
  parseUnits(s, e) {
    var t;
    return (t = q._getClient()) == null ? void 0 : t.parseUnits(s, e);
  },
  formatUnits(s, e) {
    var t;
    return (t = q._getClient()) == null ? void 0 : t.formatUnits(s, e);
  },
  async sendTransaction(s) {
    var e;
    return (e = q._getClient()) == null ? void 0 : e.sendTransaction(s);
  },
  async getCapabilities(s) {
    var e;
    return (e = q._getClient()) == null ? void 0 : e.getCapabilities(s);
  },
  async grantPermissions(s) {
    var e;
    return (e = q._getClient()) == null ? void 0 : e.grantPermissions(s);
  },
  async walletGetAssets(s) {
    var e;
    return ((e = q._getClient()) == null ? void 0 : e.walletGetAssets(s)) ?? {};
  },
  async estimateGas(s) {
    var e;
    return (e = q._getClient()) == null ? void 0 : e.estimateGas(s);
  },
  async writeContract(s) {
    var e;
    return (e = q._getClient()) == null ? void 0 : e.writeContract(s);
  },
  async getEnsAddress(s) {
    var e;
    return (e = q._getClient()) == null ? void 0 : e.getEnsAddress(s);
  },
  async getEnsAvatar(s) {
    var e;
    return (e = q._getClient()) == null ? void 0 : e.getEnsAvatar(s);
  },
  checkInstalled(s) {
    var e, t;
    return ((t = (e = q._getClient()) == null ? void 0 : e.checkInstalled) == null ? void 0 : t.call(e, s)) || !1;
  },
  resetWcConnection() {
    _e.wcUri = void 0, _e.wcPairingExpiry = void 0, _e.wcLinking = void 0, _e.recentWallet = void 0, _e.status = "disconnected", pi.resetTransactions(), $.deleteWalletConnectDeepLink();
  },
  resetUri() {
    _e.wcUri = void 0, _e.wcPairingExpiry = void 0, xr = void 0;
  },
  finalizeWcConnection() {
    var t, r;
    const { wcLinking: s, recentWallet: e } = q.state;
    s && $.setWalletConnectDeepLink(s), e && $.setAppKitRecent(e), $e.sendEvent({
      type: "track",
      event: "CONNECT_SUCCESS",
      properties: {
        method: s ? "mobile" : "qrcode",
        name: ((r = (t = de.state.data) == null ? void 0 : t.wallet) == null ? void 0 : r.name) || "Unknown"
      }
    });
  },
  setWcBasic(s) {
    _e.wcBasic = s;
  },
  setUri(s) {
    _e.wcUri = s, _e.wcPairingExpiry = te.getPairingExpiry();
  },
  setWcLinking(s) {
    _e.wcLinking = s;
  },
  setWcError(s) {
    _e.wcError = s, _e.buffering = !1;
  },
  setRecentWallet(s) {
    _e.recentWallet = s;
  },
  setBuffering(s) {
    _e.buffering = s;
  },
  setStatus(s) {
    _e.status = s;
  },
  setIsSwitchingConnection(s) {
    _e.isSwitchingConnection = s;
  },
  async disconnect({ id: s, namespace: e, initialDisconnect: t } = {}) {
    var r;
    try {
      await ((r = q._getClient()) == null ? void 0 : r.disconnect({
        id: s,
        chainNamespace: e,
        initialDisconnect: t
      }));
    } catch (n) {
      throw new Ln("Failed to disconnect", "INTERNAL_SDK_ERROR", n);
    }
  },
  setConnections(s, e) {
    const t = new Map(_e.connections);
    t.set(e, s), _e.connections = t;
  },
  async handleAuthAccountSwitch({ address: s, namespace: e }) {
    var n, i;
    const t = (i = (n = X.state.user) == null ? void 0 : n.accounts) == null ? void 0 : i.find((o) => o.type === "smartAccount"), r = t && t.address.toLowerCase() === s.toLowerCase() && Xn.canSwitchToSmartAccount(e) ? "smartAccount" : "eoa";
    await q.setPreferredAccountType(r, e);
  },
  async handleActiveConnection({ connection: s, namespace: e, address: t }) {
    const r = F.getConnectorById(s.connectorId), n = s.connectorId === N.CONNECTOR_ID.AUTH;
    if (!r)
      throw new Error(`No connector found for connection: ${s.connectorId}`);
    const i = await q.connectExternal({
      id: r.id,
      type: r.type,
      provider: r.provider,
      address: t,
      chain: e
    }, e);
    return n && t && await q.handleAuthAccountSwitch({ address: t, namespace: e }), i == null ? void 0 : i.address;
  },
  async handleDisconnectedConnection({ connection: s, namespace: e, address: t, closeModalOnConnect: r }) {
    var l, d;
    const n = F.getConnectorById(s.connectorId), i = (d = (l = s.auth) == null ? void 0 : l.name) == null ? void 0 : d.toLowerCase(), o = s.connectorId === N.CONNECTOR_ID.AUTH, a = s.connectorId === N.CONNECTOR_ID.WALLET_CONNECT;
    if (!n)
      throw new Error(`No connector found for connection: ${s.connectorId}`);
    let c;
    if (o)
      if (i && Xn.isSocialProvider(i)) {
        const { address: u } = await Xn.connectSocial({
          social: i,
          closeModalOnConnect: r,
          onOpenFarcaster() {
            Re.open({ view: "ConnectingFarcaster" });
          },
          onConnect() {
            de.replace("ProfileWallets");
          }
        });
        c = u;
      } else {
        const { address: u } = await Xn.connectEmail({
          closeModalOnConnect: r,
          onOpen() {
            Re.open({ view: "EmailLogin" });
          },
          onConnect() {
            de.replace("ProfileWallets");
          }
        });
        c = u;
      }
    else if (a) {
      const { address: u } = await Xn.connectWalletConnect({
        walletConnect: !0,
        connector: n,
        closeModalOnConnect: r,
        onOpen(p) {
          Re.open({ view: p ? "AllWallets" : "ConnectingWalletConnect" });
        },
        onConnect() {
          de.replace("ProfileWallets");
        }
      });
      c = u;
    } else {
      const u = await q.connectExternal({
        id: n.id,
        type: n.type,
        provider: n.provider,
        chain: e
      }, e);
      u && (c = u.address);
    }
    return o && t && await q.handleAuthAccountSwitch({ address: t, namespace: e }), c;
  },
  async switchConnection({ connection: s, address: e, namespace: t, closeModalOnConnect: r, onChange: n }) {
    let i;
    const o = X.getCaipAddress(t);
    if (o) {
      const { address: c } = Kt.parseCaipAddress(o);
      i = c;
    }
    const a = Bo.getConnectionStatus(s, t);
    switch (a) {
      case "connected":
      case "active": {
        const c = await q.handleActiveConnection({
          connection: s,
          namespace: t,
          address: e
        });
        if (i && c) {
          const l = c.toLowerCase() !== i.toLowerCase();
          n == null || n({
            address: c,
            namespace: t,
            hasSwitchedAccount: l,
            hasSwitchedWallet: a === "active"
          });
        }
        break;
      }
      case "disconnected": {
        const c = await q.handleDisconnectedConnection({
          connection: s,
          namespace: t,
          address: e,
          closeModalOnConnect: r
        });
        c && (n == null || n({
          address: c,
          namespace: t,
          hasSwitchedAccount: !0,
          hasSwitchedWallet: !0
        }));
        break;
      }
      default:
        throw new Error(`Invalid connection status: ${a}`);
    }
  }
}, q = Qt(ug), on = Ve({
  loading: !1,
  open: !1,
  selectedNetworkId: void 0,
  activeChain: void 0,
  initialized: !1
}), $s = {
  state: on,
  subscribe(s) {
    return gt(on, () => s(on));
  },
  subscribeOpen(s) {
    return It(on, "open", s);
  },
  set(s) {
    Object.assign(on, { ...on, ...s });
  }
}, hg = {
  async getTokenList() {
    var r;
    const s = f.state.activeCaipNetwork, e = await ae.fetchSwapTokens({
      chainId: s == null ? void 0 : s.caipNetworkId
    });
    return ((r = e == null ? void 0 : e.tokens) == null ? void 0 : r.map((n) => ({
      ...n,
      eip2612: !1,
      quantity: {
        decimals: "0",
        numeric: "0"
      },
      price: 0,
      value: 0
    }))) || [];
  },
  async fetchGasPrice() {
    var e;
    const s = f.state.activeCaipNetwork;
    if (!s)
      return null;
    try {
      switch (s.chainNamespace) {
        case "solana":
          const t = (e = await (q == null ? void 0 : q.estimateGas({ chainNamespace: "solana" }))) == null ? void 0 : e.toString();
          return {
            standard: t,
            fast: t,
            instant: t
          };
        case "eip155":
        default:
          return await ae.fetchGasPrice({
            chainId: s.caipNetworkId
          });
      }
    } catch {
      return null;
    }
  },
  async fetchSwapAllowance({ tokenAddress: s, userAddress: e, sourceTokenAmount: t, sourceTokenDecimals: r }) {
    const n = await ae.fetchSwapAllowance({
      tokenAddress: s,
      userAddress: e
    });
    if (n != null && n.allowance && t && r) {
      const i = q.parseUnits(t, r) || 0;
      return BigInt(n.allowance) >= i;
    }
    return !1;
  },
  async getMyTokensWithBalance(s) {
    const e = await zc.getMyTokensWithBalance(s);
    return X.setTokenBalance(e, f.state.activeChain), this.mapBalancesToSwapTokens(e);
  },
  /**
   * Maps the balances from Blockchain API to SwapTokenWithBalance array
   * @param balances
   * @returns SwapTokenWithBalance[]
   */
  mapBalancesToSwapTokens(s) {
    return (s == null ? void 0 : s.map((e) => ({
      ...e,
      address: e != null && e.address ? e.address : Fu(),
      decimals: parseInt(e.quantity.decimals, 10),
      logoUri: e.iconUrl,
      eip2612: !1
    }))) || [];
  }
}, De = Ve({
  tokenBalances: [],
  loading: !1
}), pg = {
  state: De,
  subscribe(s) {
    return gt(De, () => s(De));
  },
  subscribeKey(s, e) {
    return It(De, s, e);
  },
  setToken(s) {
    s && (De.token = Vr(s));
  },
  setTokenAmount(s) {
    De.sendTokenAmount = s;
  },
  setReceiverAddress(s) {
    De.receiverAddress = s;
  },
  setReceiverProfileImageUrl(s) {
    De.receiverProfileImageUrl = s;
  },
  setReceiverProfileName(s) {
    De.receiverProfileName = s;
  },
  setNetworkBalanceInUsd(s) {
    De.networkBalanceInUSD = s;
  },
  setLoading(s) {
    De.loading = s;
  },
  async sendToken() {
    var s;
    try {
      switch (xe.setLoading(!0), (s = f.state.activeCaipNetwork) == null ? void 0 : s.chainNamespace) {
        case "eip155":
          await xe.sendEvmToken();
          return;
        case "solana":
          await xe.sendSolanaToken();
          return;
        default:
          throw new Error("Unsupported chain");
      }
    } finally {
      xe.setLoading(!1);
    }
  },
  async sendEvmToken() {
    var t, r, n;
    const s = f.state.activeChain, e = As(s);
    if (!xe.state.sendTokenAmount || !xe.state.receiverAddress)
      throw new Error("An amount and receiver address are required");
    if (!xe.state.token)
      throw new Error("A token is required");
    (t = xe.state.token) != null && t.address ? ($e.sendEvent({
      type: "track",
      event: "SEND_INITIATED",
      properties: {
        isSmartAccount: e === it.ACCOUNT_TYPES.SMART_ACCOUNT,
        token: xe.state.token.address,
        amount: xe.state.sendTokenAmount,
        network: ((r = f.state.activeCaipNetwork) == null ? void 0 : r.caipNetworkId) || ""
      }
    }), await xe.sendERC20Token({
      receiverAddress: xe.state.receiverAddress,
      tokenAddress: xe.state.token.address,
      sendTokenAmount: xe.state.sendTokenAmount,
      decimals: xe.state.token.quantity.decimals
    })) : ($e.sendEvent({
      type: "track",
      event: "SEND_INITIATED",
      properties: {
        isSmartAccount: e === it.ACCOUNT_TYPES.SMART_ACCOUNT,
        token: xe.state.token.symbol || "",
        amount: xe.state.sendTokenAmount,
        network: ((n = f.state.activeCaipNetwork) == null ? void 0 : n.caipNetworkId) || ""
      }
    }), await xe.sendNativeToken({
      receiverAddress: xe.state.receiverAddress,
      sendTokenAmount: xe.state.sendTokenAmount,
      decimals: xe.state.token.quantity.decimals
    }));
  },
  async fetchTokenBalance(s) {
    var i, o;
    De.loading = !0;
    const e = (i = f.state.activeCaipNetwork) == null ? void 0 : i.caipNetworkId, t = (o = f.state.activeCaipNetwork) == null ? void 0 : o.chainNamespace, r = f.state.activeCaipAddress, n = r ? te.getPlainAddress(r) : void 0;
    if (De.lastRetry && !te.isAllowedRetry(De.lastRetry, 30 * Ue.ONE_SEC_MS))
      return De.loading = !1, [];
    try {
      if (n && e && t) {
        const a = await zc.getMyTokensWithBalance();
        return De.tokenBalances = a, De.lastRetry = void 0, a;
      }
    } catch (a) {
      De.lastRetry = Date.now(), s == null || s(a), ys.showError("Token Balance Unavailable");
    } finally {
      De.loading = !1;
    }
    return [];
  },
  fetchNetworkBalance() {
    if (De.tokenBalances.length === 0)
      return;
    const s = hg.mapBalancesToSwapTokens(De.tokenBalances);
    if (!s)
      return;
    const e = s.find((t) => t.address === Fu());
    e && (De.networkBalanceInUSD = e ? Uf.multiply(e.quantity.numeric, e.price).toString() : "0");
  },
  async sendNativeToken(s) {
    var i, o, a;
    de.pushTransactionStack({});
    const e = s.receiverAddress, t = X.state.address, r = q.parseUnits(s.sendTokenAmount.toString(), Number(s.decimals));
    await q.sendTransaction({
      chainNamespace: "eip155",
      to: e,
      address: t,
      data: "0x",
      value: r ?? BigInt(0)
    }), $e.sendEvent({
      type: "track",
      event: "SEND_SUCCESS",
      properties: {
        isSmartAccount: As("eip155") === it.ACCOUNT_TYPES.SMART_ACCOUNT,
        token: ((i = xe.state.token) == null ? void 0 : i.symbol) || "",
        amount: s.sendTokenAmount,
        network: ((o = f.state.activeCaipNetwork) == null ? void 0 : o.caipNetworkId) || ""
      }
    }), (a = q._getClient()) == null || a.updateBalance("eip155"), xe.resetSend();
  },
  async sendERC20Token(s) {
    de.pushTransactionStack({
      onSuccess() {
        de.replace("Account");
      }
    });
    const e = q.parseUnits(s.sendTokenAmount.toString(), Number(s.decimals));
    if (X.state.address && s.sendTokenAmount && s.receiverAddress && s.tokenAddress) {
      const t = te.getPlainAddress(s.tokenAddress);
      await q.writeContract({
        fromAddress: X.state.address,
        tokenAddress: t,
        args: [s.receiverAddress, e ?? BigInt(0)],
        method: "transfer",
        abi: Mf.getERC20Abi(t),
        chainNamespace: "eip155"
      }), xe.resetSend();
    }
  },
  async sendSolanaToken() {
    var s;
    if (!xe.state.sendTokenAmount || !xe.state.receiverAddress)
      throw new Error("An amount and receiver address are required");
    de.pushTransactionStack({
      onSuccess() {
        de.replace("Account");
      }
    }), await q.sendTransaction({
      chainNamespace: "solana",
      to: xe.state.receiverAddress,
      value: xe.state.sendTokenAmount
    }), (s = q._getClient()) == null || s.updateBalance("solana"), xe.resetSend();
  },
  resetSend() {
    De.token = void 0, De.sendTokenAmount = void 0, De.receiverAddress = void 0, De.receiverProfileImageUrl = void 0, De.receiverProfileName = void 0, De.loading = !1, De.tokenBalances = [];
  }
}, xe = Qt(pg), Ca = {
  currentTab: 0,
  tokenBalance: [],
  smartAccountDeployed: !1,
  addressLabels: /* @__PURE__ */ new Map(),
  user: void 0,
  preferredAccountType: void 0
}, oo = {
  caipNetwork: void 0,
  supportsAllNetworks: !0,
  smartAccountEnabledNetworks: []
}, W = Ve({
  chains: If(),
  activeCaipAddress: void 0,
  activeChain: void 0,
  activeCaipNetwork: void 0,
  noAdapters: !1,
  universalAdapter: {
    networkControllerClient: void 0,
    connectionControllerClient: void 0
  },
  isSwitchingNamespace: !1
}), fg = {
  state: W,
  subscribe(s) {
    return gt(W, () => {
      s(W);
    });
  },
  subscribeKey(s, e) {
    return It(W, s, e);
  },
  subscribeChainProp(s, e, t) {
    let r;
    return gt(W.chains, () => {
      var i;
      const n = t || W.activeChain;
      if (n) {
        const o = (i = W.chains.get(n)) == null ? void 0 : i[s];
        r !== o && (r = o, e(o));
      }
    });
  },
  initialize(s, e, t) {
    const { chainId: r, namespace: n } = $.getActiveNetworkProps(), i = e == null ? void 0 : e.find((d) => d.id.toString() === (r == null ? void 0 : r.toString())), a = s.find((d) => (d == null ? void 0 : d.namespace) === n) || (s == null ? void 0 : s[0]), c = s.map((d) => d.namespace).filter((d) => d !== void 0), l = S.state.enableEmbedded ? /* @__PURE__ */ new Set([...c]) : /* @__PURE__ */ new Set([...(e == null ? void 0 : e.map((d) => d.chainNamespace)) ?? []]);
    ((s == null ? void 0 : s.length) === 0 || !a) && (W.noAdapters = !0), W.noAdapters || (W.activeChain = a == null ? void 0 : a.namespace, W.activeCaipNetwork = i, f.setChainNetworkData(a == null ? void 0 : a.namespace, {
      caipNetwork: i
    }), W.activeChain && $s.set({ activeChain: a == null ? void 0 : a.namespace })), l.forEach((d) => {
      const u = e == null ? void 0 : e.filter((w) => w.chainNamespace === d), p = $.getPreferredAccountTypes() || {}, g = { ...S.state.defaultAccountTypes, ...p };
      f.state.chains.set(d, {
        namespace: d,
        networkState: Ve({
          ...oo,
          caipNetwork: u == null ? void 0 : u[0]
        }),
        accountState: Ve({
          ...Ca,
          preferredAccountType: g[d]
        }),
        caipNetworks: u ?? [],
        ...t
      }), f.setRequestedCaipNetworks(u ?? [], d);
    });
  },
  removeAdapter(s) {
    var e, t;
    if (W.activeChain === s) {
      const r = Array.from(W.chains.entries()).find(([n]) => n !== s);
      if (r) {
        const n = (t = (e = r[1]) == null ? void 0 : e.caipNetworks) == null ? void 0 : t[0];
        n && f.setActiveCaipNetwork(n);
      }
    }
    W.chains.delete(s);
  },
  addAdapter(s, { networkControllerClient: e, connectionControllerClient: t }, r) {
    W.chains.set(s.namespace, {
      namespace: s.namespace,
      networkState: {
        ...oo,
        caipNetwork: r[0]
      },
      accountState: Ca,
      caipNetworks: r,
      connectionControllerClient: t,
      networkControllerClient: e
    }), f.setRequestedCaipNetworks((r == null ? void 0 : r.filter((n) => n.chainNamespace === s.namespace)) ?? [], s.namespace);
  },
  addNetwork(s) {
    var t;
    const e = W.chains.get(s.chainNamespace);
    if (e) {
      const r = [...e.caipNetworks || []];
      (t = e.caipNetworks) != null && t.find((n) => n.id === s.id) || r.push(s), W.chains.set(s.chainNamespace, { ...e, caipNetworks: r }), f.setRequestedCaipNetworks(r, s.chainNamespace), F.filterByNamespace(s.chainNamespace, !0);
    }
  },
  removeNetwork(s, e) {
    var r, n, i;
    const t = W.chains.get(s);
    if (t) {
      const o = ((r = W.activeCaipNetwork) == null ? void 0 : r.id) === e, a = [
        ...((n = t.caipNetworks) == null ? void 0 : n.filter((c) => c.id !== e)) || []
      ];
      o && ((i = t == null ? void 0 : t.caipNetworks) != null && i[0]) && f.setActiveCaipNetwork(t.caipNetworks[0]), W.chains.set(s, { ...t, caipNetworks: a }), f.setRequestedCaipNetworks(a || [], s), a.length === 0 && F.filterByNamespace(s, !1);
    }
  },
  setAdapterNetworkState(s, e) {
    const t = W.chains.get(s);
    t && (t.networkState = {
      ...t.networkState || oo,
      ...e
    }, W.chains.set(s, t));
  },
  setChainAccountData(s, e, t = !0) {
    if (!s)
      throw new Error("Chain is required to update chain account data");
    const r = W.chains.get(s);
    if (r) {
      const n = { ...r.accountState || Ca, ...e };
      W.chains.set(s, { ...r, accountState: n }), (W.chains.size === 1 || W.activeChain === s) && (e.caipAddress && (W.activeCaipAddress = e.caipAddress), X.replaceState(n));
    }
  },
  setChainNetworkData(s, e) {
    if (!s)
      return;
    const t = W.chains.get(s);
    if (t) {
      const r = { ...t.networkState || oo, ...e };
      W.chains.set(s, { ...t, networkState: r });
    }
  },
  // eslint-disable-next-line max-params
  setAccountProp(s, e, t, r = !0) {
    f.setChainAccountData(t, { [s]: e }, r);
  },
  setActiveNamespace(s) {
    var r, n;
    W.activeChain = s;
    const e = s ? W.chains.get(s) : void 0, t = (r = e == null ? void 0 : e.networkState) == null ? void 0 : r.caipNetwork;
    t != null && t.id && s && (W.activeCaipAddress = (n = e == null ? void 0 : e.accountState) == null ? void 0 : n.caipAddress, W.activeCaipNetwork = t, f.setChainNetworkData(s, { caipNetwork: t }), $.setActiveCaipNetworkId(t == null ? void 0 : t.caipNetworkId), $s.set({
      activeChain: s,
      selectedNetworkId: t == null ? void 0 : t.caipNetworkId
    }));
  },
  setActiveCaipNetwork(s) {
    var r, n, i;
    if (!s)
      return;
    W.activeChain !== s.chainNamespace && f.setIsSwitchingNamespace(!0);
    const e = W.chains.get(s.chainNamespace);
    W.activeChain = s.chainNamespace, W.activeCaipNetwork = s, f.setChainNetworkData(s.chainNamespace, { caipNetwork: s }), (r = e == null ? void 0 : e.accountState) != null && r.address ? W.activeCaipAddress = `${s.chainNamespace}:${s.id}:${(n = e == null ? void 0 : e.accountState) == null ? void 0 : n.address}` : W.activeCaipAddress = void 0, f.setAccountProp("caipAddress", W.activeCaipAddress, s.chainNamespace), e && X.replaceState(e.accountState), xe.resetSend(), $s.set({
      activeChain: W.activeChain,
      selectedNetworkId: (i = W.activeCaipNetwork) == null ? void 0 : i.caipNetworkId
    }), $.setActiveCaipNetworkId(s.caipNetworkId), !f.checkIfSupportedNetwork(s.chainNamespace) && S.state.enableNetworkSwitch && !S.state.allowUnsupportedChain && !q.state.wcBasic && f.showUnsupportedChainUI();
  },
  addCaipNetwork(s) {
    var t;
    if (!s)
      return;
    const e = W.chains.get(s.chainNamespace);
    e && ((t = e == null ? void 0 : e.caipNetworks) == null || t.push(s));
  },
  async switchActiveNamespace(s) {
    var n;
    if (!s)
      return;
    const e = s !== f.state.activeChain, t = (n = f.getNetworkData(s)) == null ? void 0 : n.caipNetwork, r = f.getCaipNetworkByNamespace(s, t == null ? void 0 : t.id);
    e && r && await f.switchActiveNetwork(r);
  },
  async switchActiveNetwork(s) {
    var n;
    const e = f.state.chains.get(f.state.activeChain), t = !((n = e == null ? void 0 : e.caipNetworks) != null && n.some((i) => {
      var o;
      return i.id === ((o = W.activeCaipNetwork) == null ? void 0 : o.id);
    })), r = f.getNetworkControllerClient(s.chainNamespace);
    if (r) {
      try {
        await r.switchCaipNetwork(s), t && Re.close();
      } catch {
        de.goBack();
      }
      $e.sendEvent({
        type: "track",
        event: "SWITCH_NETWORK",
        properties: { network: s.caipNetworkId }
      });
    }
  },
  getNetworkControllerClient(s) {
    const e = s || W.activeChain, t = W.chains.get(e);
    if (!t)
      throw new Error("Chain adapter not found");
    if (!t.networkControllerClient)
      throw new Error("NetworkController client not set");
    return t.networkControllerClient;
  },
  getConnectionControllerClient(s) {
    const e = s || W.activeChain;
    if (!e)
      throw new Error("Chain is required to get connection controller client");
    const t = W.chains.get(e);
    if (!(t != null && t.connectionControllerClient))
      throw new Error("ConnectionController client not set");
    return t.connectionControllerClient;
  },
  getAccountProp(s, e) {
    var n;
    let t = W.activeChain;
    if (e && (t = e), !t)
      return;
    const r = (n = W.chains.get(t)) == null ? void 0 : n.accountState;
    if (r)
      return r[s];
  },
  getNetworkProp(s, e) {
    var r;
    const t = (r = W.chains.get(e)) == null ? void 0 : r.networkState;
    if (t)
      return t[s];
  },
  getRequestedCaipNetworks(s) {
    const e = W.chains.get(s), { approvedCaipNetworkIds: t = [], requestedCaipNetworks: r = [] } = (e == null ? void 0 : e.networkState) || {};
    return te.sortRequestedNetworks(t, r);
  },
  getAllRequestedCaipNetworks() {
    const s = [];
    return W.chains.forEach((e) => {
      const t = f.getRequestedCaipNetworks(e.namespace);
      s.push(...t);
    }), s;
  },
  setRequestedCaipNetworks(s, e) {
    f.setAdapterNetworkState(e, { requestedCaipNetworks: s });
    const r = f.getAllRequestedCaipNetworks().map((i) => i.chainNamespace), n = Array.from(new Set(r));
    F.filterByNamespaces(n);
  },
  getAllApprovedCaipNetworkIds() {
    const s = [];
    return W.chains.forEach((e) => {
      const t = f.getApprovedCaipNetworkIds(e.namespace);
      s.push(...t);
    }), s;
  },
  getActiveCaipNetwork(s) {
    var e, t;
    return s ? (t = (e = W.chains.get(s)) == null ? void 0 : e.networkState) == null ? void 0 : t.caipNetwork : W.activeCaipNetwork;
  },
  getActiveCaipAddress() {
    return W.activeCaipAddress;
  },
  getApprovedCaipNetworkIds(s) {
    var r;
    const e = W.chains.get(s);
    return ((r = e == null ? void 0 : e.networkState) == null ? void 0 : r.approvedCaipNetworkIds) || [];
  },
  async setApprovedCaipNetworksData(s) {
    const e = f.getNetworkControllerClient(), t = await (e == null ? void 0 : e.getApprovedCaipNetworksData());
    f.setAdapterNetworkState(s, {
      approvedCaipNetworkIds: t == null ? void 0 : t.approvedCaipNetworkIds,
      supportsAllNetworks: t == null ? void 0 : t.supportsAllNetworks
    });
  },
  checkIfSupportedNetwork(s, e) {
    const t = e || W.activeCaipNetwork, r = f.getRequestedCaipNetworks(s);
    return r.length ? r == null ? void 0 : r.some((n) => n.id === (t == null ? void 0 : t.id)) : !0;
  },
  checkIfSupportedChainId(s) {
    if (!W.activeChain)
      return !0;
    const e = f.getRequestedCaipNetworks(W.activeChain);
    return e == null ? void 0 : e.some((t) => t.id === s);
  },
  // Smart Account Network Handlers
  setSmartAccountEnabledNetworks(s, e) {
    f.setAdapterNetworkState(e, { smartAccountEnabledNetworks: s });
  },
  checkIfSmartAccountEnabled() {
    var r;
    const s = Uu.caipNetworkIdToNumber((r = W.activeCaipNetwork) == null ? void 0 : r.caipNetworkId), e = W.activeChain;
    if (!e || !s)
      return !1;
    const t = f.getNetworkProp("smartAccountEnabledNetworks", e);
    return !!(t != null && t.includes(Number(s)));
  },
  showUnsupportedChainUI() {
    Re.open({ view: "UnsupportedChain" });
  },
  checkIfNamesSupported() {
    const s = W.activeCaipNetwork;
    return !!(s != null && s.chainNamespace && Ue.NAMES_SUPPORTED_CHAIN_NAMESPACES.includes(s.chainNamespace));
  },
  resetNetwork(s) {
    f.setAdapterNetworkState(s, {
      approvedCaipNetworkIds: void 0,
      supportsAllNetworks: !0
    });
  },
  resetAccount(s) {
    const e = s;
    if (!e)
      throw new Error("Chain is required to set account prop");
    const t = f.getAccountProp("preferredAccountType", e);
    W.activeCaipAddress = void 0, f.setChainAccountData(e, {
      smartAccountDeployed: !1,
      currentTab: 0,
      caipAddress: void 0,
      address: void 0,
      balance: void 0,
      balanceSymbol: void 0,
      profileName: void 0,
      profileImage: void 0,
      addressExplorerUrl: void 0,
      tokenBalance: [],
      connectedWalletInfo: void 0,
      preferredAccountType: t,
      socialProvider: void 0,
      socialWindow: void 0,
      farcasterUrl: void 0,
      user: void 0,
      status: "disconnected"
    }), F.removeConnectorId(e);
  },
  setIsSwitchingNamespace(s) {
    W.isSwitchingNamespace = s;
  },
  getFirstCaipNetworkSupportsAuthConnector() {
    var t, r;
    const s = [];
    let e;
    if (W.chains.forEach((n) => {
      N.AUTH_CONNECTOR_SUPPORTED_CHAINS.find((i) => i === n.namespace) && n.namespace && s.push(n.namespace);
    }), s.length > 0) {
      const n = s[0];
      return e = n ? (r = (t = W.chains.get(n)) == null ? void 0 : t.caipNetworks) == null ? void 0 : r[0] : void 0, e;
    }
  },
  getAccountData(s) {
    var e;
    return s ? (e = f.state.chains.get(s)) == null ? void 0 : e.accountState : X.state;
  },
  getNetworkData(s) {
    var t;
    const e = s || W.activeChain;
    if (e)
      return (t = f.state.chains.get(e)) == null ? void 0 : t.networkState;
  },
  getCaipNetworkByNamespace(s, e) {
    var n, i, o;
    if (!s)
      return;
    const t = f.state.chains.get(s), r = (n = t == null ? void 0 : t.caipNetworks) == null ? void 0 : n.find((a) => a.id === e);
    return r || ((i = t == null ? void 0 : t.networkState) == null ? void 0 : i.caipNetwork) || ((o = t == null ? void 0 : t.caipNetworks) == null ? void 0 : o[0]);
  },
  /**
   * Get the requested CaipNetwork IDs for a given namespace. If namespace is not provided, all requested CaipNetwork IDs will be returned
   * @param namespace - The namespace to get the requested CaipNetwork IDs for
   * @returns The requested CaipNetwork IDs
   */
  getRequestedCaipNetworkIds() {
    const s = F.state.filterByNamespace;
    return (s ? [W.chains.get(s)] : Array.from(W.chains.values())).flatMap((t) => (t == null ? void 0 : t.caipNetworks) || []).map((t) => t.caipNetworkId);
  },
  getCaipNetworks(s) {
    return s ? f.getRequestedCaipNetworks(s) : f.getAllRequestedCaipNetworks();
  },
  setLastConnectedSIWECaipNetwork(s) {
    W.lastConnectedSIWECaipNetwork = s;
  },
  getLastConnectedSIWECaipNetwork() {
    return W.lastConnectedSIWECaipNetwork;
  }
}, f = Qt(fg), gg = {
  purchaseCurrencies: [
    {
      id: "2b92315d-eab7-5bef-84fa-089a131333f5",
      name: "USD Coin",
      symbol: "USDC",
      networks: [
        {
          name: "ethereum-mainnet",
          display_name: "Ethereum",
          chain_id: "1",
          contract_address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
        },
        {
          name: "polygon-mainnet",
          display_name: "Polygon",
          chain_id: "137",
          contract_address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"
        }
      ]
    },
    {
      id: "2b92315d-eab7-5bef-84fa-089a131333f5",
      name: "Ether",
      symbol: "ETH",
      networks: [
        {
          name: "ethereum-mainnet",
          display_name: "Ethereum",
          chain_id: "1",
          contract_address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
        },
        {
          name: "polygon-mainnet",
          display_name: "Polygon",
          chain_id: "137",
          contract_address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"
        }
      ]
    }
  ],
  paymentCurrencies: [
    {
      id: "USD",
      payment_method_limits: [
        {
          id: "card",
          min: "10.00",
          max: "7500.00"
        },
        {
          id: "ach_bank_account",
          min: "10.00",
          max: "25000.00"
        }
      ]
    },
    {
      id: "EUR",
      payment_method_limits: [
        {
          id: "card",
          min: "10.00",
          max: "7500.00"
        },
        {
          id: "ach_bank_account",
          min: "10.00",
          max: "25000.00"
        }
      ]
    }
  ]
}, ju = te.getBlockchainApiUrl(), xt = Ve({
  clientId: null,
  api: new Ji({ baseUrl: ju, clientId: null }),
  supportedChains: { http: [], ws: [] }
}), ae = {
  state: xt,
  async get(s) {
    const { st: e, sv: t } = ae.getSdkProperties(), r = S.state.projectId, n = {
      ...s.params || {},
      st: e,
      sv: t,
      projectId: r
    };
    return xt.api.get({
      ...s,
      params: n
    });
  },
  getSdkProperties() {
    const { sdkType: s, sdkVersion: e } = S.state;
    return {
      st: s || "unknown",
      sv: e || "unknown"
    };
  },
  async isNetworkSupported(s) {
    if (!s)
      return !1;
    try {
      xt.supportedChains.http.length || await ae.getSupportedNetworks();
    } catch {
      return !1;
    }
    return xt.supportedChains.http.includes(s);
  },
  async getSupportedNetworks() {
    try {
      const s = await ae.get({
        path: "v1/supported-chains"
      });
      return xt.supportedChains = s, s;
    } catch {
      return xt.supportedChains;
    }
  },
  async fetchIdentity({ address: s, caipNetworkId: e }) {
    if (!await ae.isNetworkSupported(e))
      return { avatar: "", name: "" };
    const r = $.getIdentityFromCacheForAddress(s);
    if (r)
      return r;
    const n = await ae.get({
      path: `/v1/identity/${s}`,
      params: {
        sender: f.state.activeCaipAddress ? te.getPlainAddress(f.state.activeCaipAddress) : void 0
      }
    });
    return $.updateIdentityCache({
      address: s,
      identity: n,
      timestamp: Date.now()
    }), n;
  },
  async fetchTransactions({ account: s, cursor: e, onramp: t, signal: r, cache: n, chainId: i }) {
    var a;
    return await ae.isNetworkSupported((a = f.state.activeCaipNetwork) == null ? void 0 : a.caipNetworkId) ? ae.get({
      path: `/v1/account/${s}/history`,
      params: {
        cursor: e,
        onramp: t,
        chainId: i
      },
      signal: r,
      cache: n
    }) : { data: [], next: void 0 };
  },
  async fetchSwapQuote({ amount: s, userAddress: e, from: t, to: r, gasPrice: n }) {
    var o;
    return await ae.isNetworkSupported((o = f.state.activeCaipNetwork) == null ? void 0 : o.caipNetworkId) ? ae.get({
      path: "/v1/convert/quotes",
      headers: {
        "Content-Type": "application/json"
      },
      params: {
        amount: s,
        userAddress: e,
        from: t,
        to: r,
        gasPrice: n
      }
    }) : { quotes: [] };
  },
  async fetchSwapTokens({ chainId: s }) {
    var t;
    return await ae.isNetworkSupported((t = f.state.activeCaipNetwork) == null ? void 0 : t.caipNetworkId) ? ae.get({
      path: "/v1/convert/tokens",
      params: { chainId: s }
    }) : { tokens: [] };
  },
  async fetchTokenPrice({ addresses: s }) {
    var t;
    return await ae.isNetworkSupported((t = f.state.activeCaipNetwork) == null ? void 0 : t.caipNetworkId) ? xt.api.post({
      path: "/v1/fungible/price",
      body: {
        currency: "usd",
        addresses: s,
        projectId: S.state.projectId
      },
      headers: {
        "Content-Type": "application/json"
      }
    }) : { fungibles: [] };
  },
  async fetchSwapAllowance({ tokenAddress: s, userAddress: e }) {
    var r;
    return await ae.isNetworkSupported((r = f.state.activeCaipNetwork) == null ? void 0 : r.caipNetworkId) ? ae.get({
      path: "/v1/convert/allowance",
      params: {
        tokenAddress: s,
        userAddress: e
      },
      headers: {
        "Content-Type": "application/json"
      }
    }) : { allowance: "0" };
  },
  async fetchGasPrice({ chainId: s }) {
    var n;
    const { st: e, sv: t } = ae.getSdkProperties();
    if (!await ae.isNetworkSupported((n = f.state.activeCaipNetwork) == null ? void 0 : n.caipNetworkId))
      throw new Error("Network not supported for Gas Price");
    return ae.get({
      path: "/v1/convert/gas-price",
      headers: {
        "Content-Type": "application/json"
      },
      params: {
        chainId: s,
        st: e,
        sv: t
      }
    });
  },
  async generateSwapCalldata({ amount: s, from: e, to: t, userAddress: r, disableEstimate: n }) {
    var o;
    if (!await ae.isNetworkSupported((o = f.state.activeCaipNetwork) == null ? void 0 : o.caipNetworkId))
      throw new Error("Network not supported for Swaps");
    return xt.api.post({
      path: "/v1/convert/build-transaction",
      headers: {
        "Content-Type": "application/json"
      },
      body: {
        amount: s,
        eip155: {
          slippage: Ue.CONVERT_SLIPPAGE_TOLERANCE
        },
        projectId: S.state.projectId,
        from: e,
        to: t,
        userAddress: r,
        disableEstimate: n
      }
    });
  },
  async generateApproveCalldata({ from: s, to: e, userAddress: t }) {
    var o;
    const { st: r, sv: n } = ae.getSdkProperties();
    if (!await ae.isNetworkSupported((o = f.state.activeCaipNetwork) == null ? void 0 : o.caipNetworkId))
      throw new Error("Network not supported for Swaps");
    return ae.get({
      path: "/v1/convert/build-approve",
      headers: {
        "Content-Type": "application/json"
      },
      params: {
        userAddress: t,
        from: s,
        to: e,
        st: r,
        sv: n
      }
    });
  },
  async getBalance(s, e, t) {
    var l;
    const { st: r, sv: n } = ae.getSdkProperties();
    if (!await ae.isNetworkSupported((l = f.state.activeCaipNetwork) == null ? void 0 : l.caipNetworkId))
      return ys.showError("Token Balance Unavailable"), { balances: [] };
    const o = `${e}:${s}`, a = $.getBalanceCacheForCaipAddress(o);
    if (a)
      return a;
    const c = await ae.get({
      path: `/v1/account/${s}/balance`,
      params: {
        currency: "usd",
        chainId: e,
        forceUpdate: t,
        st: r,
        sv: n
      }
    });
    return $.updateBalanceCache({
      caipAddress: o,
      balance: c,
      timestamp: Date.now()
    }), c;
  },
  async lookupEnsName(s) {
    var t;
    return await ae.isNetworkSupported((t = f.state.activeCaipNetwork) == null ? void 0 : t.caipNetworkId) ? ae.get({
      path: `/v1/profile/account/${s}`,
      params: { apiVersion: "2" }
    }) : { addresses: {}, attributes: [] };
  },
  async reverseLookupEnsName({ address: s }) {
    var t;
    return await ae.isNetworkSupported((t = f.state.activeCaipNetwork) == null ? void 0 : t.caipNetworkId) ? ae.get({
      path: `/v1/profile/reverse/${s}`,
      params: {
        sender: X.state.address,
        apiVersion: "2"
      }
    }) : [];
  },
  async getEnsNameSuggestions(s) {
    var t;
    return await ae.isNetworkSupported((t = f.state.activeCaipNetwork) == null ? void 0 : t.caipNetworkId) ? ae.get({
      path: `/v1/profile/suggestions/${s}`,
      params: { zone: "reown.id" }
    }) : { suggestions: [] };
  },
  async registerEnsName({ coinType: s, address: e, message: t, signature: r }) {
    var i;
    return await ae.isNetworkSupported((i = f.state.activeCaipNetwork) == null ? void 0 : i.caipNetworkId) ? xt.api.post({
      path: "/v1/profile/account",
      body: { coin_type: s, address: e, message: t, signature: r },
      headers: {
        "Content-Type": "application/json"
      }
    }) : { success: !1 };
  },
  async generateOnRampURL({ destinationWallets: s, partnerUserId: e, defaultNetwork: t, purchaseAmount: r, paymentAmount: n }) {
    var a;
    return await ae.isNetworkSupported((a = f.state.activeCaipNetwork) == null ? void 0 : a.caipNetworkId) ? (await xt.api.post({
      path: "/v1/generators/onrampurl",
      params: {
        projectId: S.state.projectId
      },
      body: {
        destinationWallets: s,
        defaultNetwork: t,
        partnerUserId: e,
        defaultExperience: "buy",
        presetCryptoAmount: r,
        presetFiatAmount: n
      }
    })).url : "";
  },
  async getOnrampOptions() {
    var e;
    if (!await ae.isNetworkSupported((e = f.state.activeCaipNetwork) == null ? void 0 : e.caipNetworkId))
      return { paymentCurrencies: [], purchaseCurrencies: [] };
    try {
      return await ae.get({
        path: "/v1/onramp/options"
      });
    } catch {
      return gg;
    }
  },
  async getOnrampQuote({ purchaseCurrency: s, paymentCurrency: e, amount: t, network: r }) {
    var n;
    try {
      return await ae.isNetworkSupported((n = f.state.activeCaipNetwork) == null ? void 0 : n.caipNetworkId) ? await xt.api.post({
        path: "/v1/onramp/quote",
        params: {
          projectId: S.state.projectId
        },
        body: {
          purchaseCurrency: s,
          paymentCurrency: e,
          amount: t,
          network: r
        }
      }) : null;
    } catch {
      return {
        coinbaseFee: { amount: t, currency: e.id },
        networkFee: { amount: t, currency: e.id },
        paymentSubtotal: { amount: t, currency: e.id },
        paymentTotal: { amount: t, currency: e.id },
        purchaseAmount: { amount: t, currency: e.id },
        quoteId: "mocked-quote-id"
      };
    }
  },
  async getSmartSessions(s) {
    var t;
    return await ae.isNetworkSupported((t = f.state.activeCaipNetwork) == null ? void 0 : t.caipNetworkId) ? ae.get({
      path: `/v1/sessions/${s}`
    }) : [];
  },
  async revokeSmartSession(s, e, t) {
    var n;
    return await ae.isNetworkSupported((n = f.state.activeCaipNetwork) == null ? void 0 : n.caipNetworkId) ? xt.api.post({
      path: `/v1/sessions/${s}/revoke`,
      params: {
        projectId: S.state.projectId
      },
      body: {
        pci: e,
        signature: t
      }
    }) : { success: !1 };
  },
  setClientId(s) {
    xt.clientId = s, xt.api = new Ji({ baseUrl: ju, clientId: s });
  }
}, _a = {
  /**
   * Creates a Balance object from an ERC7811 Asset object
   * @param asset - Asset object to convert
   * @param chainId - Chain ID in CAIP-2 format
   * @returns Balance object
   */
  createBalance(s, e) {
    const t = {
      name: s.metadata.name || "",
      symbol: s.metadata.symbol || "",
      decimals: s.metadata.decimals || 0,
      value: s.metadata.value || 0,
      price: s.metadata.price || 0,
      iconUrl: s.metadata.iconUrl || ""
    };
    return {
      name: t.name,
      symbol: t.symbol,
      chainId: e,
      address: s.address === "native" ? void 0 : this.convertAddressToCAIP10Address(s.address, e),
      value: t.value,
      price: t.price,
      quantity: {
        decimals: t.decimals.toString(),
        numeric: this.convertHexToBalance({
          hex: s.balance,
          decimals: t.decimals
        })
      },
      iconUrl: t.iconUrl
    };
  },
  /**
   * Converts a hex string to a Balance object
   * @param hex - Hex string to convert
   * @param decimals - Number of decimals to use
   * @returns Balance object
   */
  convertHexToBalance({ hex: s, decimals: e }) {
    return cf(BigInt(s), e);
  },
  /**
   * Converts an address to a CAIP-10 address
   * @param address - Address to convert
   * @param chainId - Chain ID in CAIP-2 format
   * @returns CAIP-10 address
   */
  convertAddressToCAIP10Address(s, e) {
    return `${e}:${s}`;
  },
  /**
   *  Creates a CAIP-2 Chain ID from a chain ID and namespace
   * @param chainId  - Chain ID in hex format
   * @param namespace  - Chain namespace
   * @returns
   */
  createCAIP2ChainId(s, e) {
    return `${e}:${parseInt(s, 16)}`;
  },
  /**
   * Gets the chain ID in hex format from a CAIP-2 Chain ID
   * @param caip2ChainId - CAIP-2 Chain ID
   * @returns Chain ID in hex format
   */
  getChainIdHexFromCAIP2ChainId(s) {
    const e = s.split(":");
    if (e.length < 2 || !e[1])
      return "0x0";
    const t = e[1], r = parseInt(t, 10);
    return isNaN(r) ? "0x0" : `0x${r.toString(16)}`;
  },
  /**
   * Checks if a response is a valid WalletGetAssetsResponse
   * @param response - The response to check
   * @returns True if the response is a valid WalletGetAssetsResponse, false otherwise
   */
  isWalletGetAssetsResponse(s) {
    return typeof s != "object" || s === null ? !1 : Object.values(s).every((e) => Array.isArray(e) && e.every((t) => this.isValidAsset(t)));
  },
  /**
   * Checks if an asset object is valid.
   * @param asset - The asset object to check.
   * @returns True if the asset is valid, false otherwise.
   */
  isValidAsset(s) {
    return typeof s == "object" && s !== null && typeof s.address == "string" && typeof s.balance == "string" && (s.type === "ERC20" || s.type === "NATIVE") && typeof s.metadata == "object" && s.metadata !== null && typeof s.metadata.name == "string" && typeof s.metadata.symbol == "string" && typeof s.metadata.decimals == "number" && typeof s.metadata.price == "number" && typeof s.metadata.iconUrl == "string";
  }
}, zc = {
  /**
   * Get the balances of the user's tokens. If user connected with Auth provider or and on the EIP155 network,
   * it'll use the `wallet_getAssets` and `wallet_getCapabilities` calls to fetch the balance rather than Blockchain API
   * @param forceUpdate - If true, the balances will be fetched from the server
   * @returns The balances of the user's tokens
   */
  async getMyTokensWithBalance(s) {
    const e = X.state.address, t = f.state.activeCaipNetwork, r = F.getConnectorId("eip155") === N.CONNECTOR_ID.AUTH;
    if (!e || !t)
      return [];
    const n = `${t.caipNetworkId}:${e}`, i = $.getBalanceCacheForCaipAddress(n);
    if (i)
      return i.balances;
    if (t.chainNamespace === "eip155" && r) {
      const a = await this.getEIP155Balances(e, t);
      if (a)
        return this.filterLowQualityTokens(a);
    }
    const o = await ae.getBalance(e, t.caipNetworkId, s);
    return this.filterLowQualityTokens(o.balances);
  },
  /**
   * Get the balances of the user's tokens on the EIP155 network using native `wallet_getAssets` and `wallet_getCapabilities` calls
   * @param address - The address of the user
   * @param caipNetwork - The CAIP network
   * @returns The balances of the user's tokens on the EIP155 network
   */
  async getEIP155Balances(s, e) {
    var t, r;
    try {
      const n = _a.getChainIdHexFromCAIP2ChainId(e.caipNetworkId), i = await q.getCapabilities(s);
      if (!((r = (t = i == null ? void 0 : i[n]) == null ? void 0 : t.assetDiscovery) != null && r.supported))
        return null;
      const o = await q.walletGetAssets({
        account: s,
        chainFilter: [n]
      });
      if (!_a.isWalletGetAssetsResponse(o))
        return null;
      const c = (o[n] || []).map((l) => _a.createBalance(l, e.caipNetworkId));
      return $.updateBalanceCache({
        caipAddress: `${e.caipNetworkId}:${s}`,
        balance: { balances: c },
        timestamp: Date.now()
      }), c;
    } catch {
      return null;
    }
  },
  /**
   * The 1Inch API includes many low-quality tokens in the balance response,
   * which appear inconsistently. This filter prevents them from being displayed.
   */
  filterLowQualityTokens(s) {
    return s.filter((e) => e.quantity.decimals !== "0");
  }
}, Ns = Ve({
  currentTab: 0,
  tokenBalance: [],
  smartAccountDeployed: !1,
  addressLabels: /* @__PURE__ */ new Map()
}), mg = {
  state: Ns,
  replaceState(s) {
    s && Object.assign(Ns, Vr(s));
  },
  subscribe(s) {
    return f.subscribeChainProp("accountState", (e) => {
      if (e)
        return s(e);
    });
  },
  subscribeKey(s, e, t) {
    let r;
    return f.subscribeChainProp("accountState", (n) => {
      if (n) {
        const i = n[s];
        r !== i && (r = i, e(i));
      }
    }, t);
  },
  setStatus(s, e) {
    f.setAccountProp("status", s, e);
  },
  getCaipAddress(s) {
    return f.getAccountProp("caipAddress", s);
  },
  setCaipAddress(s, e) {
    const t = s ? te.getPlainAddress(s) : void 0;
    e === f.state.activeChain && (f.state.activeCaipAddress = s), f.setAccountProp("caipAddress", s, e), f.setAccountProp("address", t, e);
  },
  setBalance(s, e, t) {
    f.setAccountProp("balance", s, t), f.setAccountProp("balanceSymbol", e, t);
  },
  setProfileName(s, e) {
    f.setAccountProp("profileName", s, e);
  },
  setProfileImage(s, e) {
    f.setAccountProp("profileImage", s, e);
  },
  setUser(s, e) {
    f.setAccountProp("user", s, e);
  },
  setAddressExplorerUrl(s, e) {
    f.setAccountProp("addressExplorerUrl", s, e);
  },
  setSmartAccountDeployed(s, e) {
    f.setAccountProp("smartAccountDeployed", s, e);
  },
  setCurrentTab(s) {
    f.setAccountProp("currentTab", s, f.state.activeChain);
  },
  setTokenBalance(s, e) {
    s && f.setAccountProp("tokenBalance", s, e);
  },
  setShouldUpdateToAddress(s, e) {
    f.setAccountProp("shouldUpdateToAddress", s, e);
  },
  addAddressLabel(s, e, t) {
    const r = f.getAccountProp("addressLabels", t) || /* @__PURE__ */ new Map();
    r.set(s, e), f.setAccountProp("addressLabels", r, t);
  },
  removeAddressLabel(s, e) {
    const t = f.getAccountProp("addressLabels", e) || /* @__PURE__ */ new Map();
    t.delete(s), f.setAccountProp("addressLabels", t, e);
  },
  setConnectedWalletInfo(s, e) {
    f.setAccountProp("connectedWalletInfo", s, e, !1);
  },
  setPreferredAccountType(s, e) {
    f.setAccountProp("preferredAccountType", s, e);
  },
  setSocialProvider(s, e) {
    s && f.setAccountProp("socialProvider", s, e);
  },
  setSocialWindow(s, e) {
    f.setAccountProp("socialWindow", s ? Vr(s) : void 0, e);
  },
  setFarcasterUrl(s, e) {
    f.setAccountProp("farcasterUrl", s, e);
  },
  async fetchTokenBalance(s) {
    var i, o;
    Ns.balanceLoading = !0;
    const e = (i = f.state.activeCaipNetwork) == null ? void 0 : i.caipNetworkId, t = (o = f.state.activeCaipNetwork) == null ? void 0 : o.chainNamespace, r = f.state.activeCaipAddress, n = r ? te.getPlainAddress(r) : void 0;
    if (Ns.lastRetry && !te.isAllowedRetry(Ns.lastRetry, 30 * Ue.ONE_SEC_MS))
      return Ns.balanceLoading = !1, [];
    try {
      if (n && e && t) {
        const a = await zc.getMyTokensWithBalance();
        return X.setTokenBalance(a, t), Ns.lastRetry = void 0, Ns.balanceLoading = !1, a;
      }
    } catch (a) {
      Ns.lastRetry = Date.now(), s == null || s(a), ys.showError("Token Balance Unavailable");
    } finally {
      Ns.balanceLoading = !1;
    }
    return [];
  },
  resetAccount(s) {
    f.resetAccount(s);
  }
}, X = Qt(mg), wg = {
  /**
   * Function to handle the network switch.
   * This function has variety of conditions to handle the network switch depending on the connectors or namespace's connection states.
   * @param args.network - The network to switch to.
   * @param args.shouldConfirmSwitch - Whether to confirm the switch. If true, the user will be asked to confirm the switch if necessary.
   * @returns void
   */
  onSwitchNetwork({ network: s, ignoreSwitchConfirmation: e = !1 }) {
    const t = f.state.activeCaipNetwork, r = de.state.data;
    if (s.id === (t == null ? void 0 : t.id))
      return;
    const i = X.getCaipAddress(f.state.activeChain), o = s.chainNamespace !== f.state.activeChain, a = X.getCaipAddress(s.chainNamespace), l = F.getConnectorId(f.state.activeChain) === N.CONNECTOR_ID.AUTH, d = N.AUTH_CONNECTOR_SUPPORTED_CHAINS.find((u) => u === s.chainNamespace);
    e || l && d ? de.push("SwitchNetwork", { ...r, network: s }) : /** * If user switching to a different namespace and next namespace is not connected, we need to show switch active chain view for confirmation first. */ i && o && !a ? de.push("SwitchActiveChain", {
      switchToChain: s.chainNamespace,
      navigateTo: "Connect",
      navigateWithReplace: !0,
      network: s
    }) : de.push("SwitchNetwork", { ...r, network: s });
  }
}, kt = Ve({
  loading: !1,
  loadingNamespaceMap: /* @__PURE__ */ new Map(),
  open: !1,
  shake: !1,
  namespace: void 0
}), yg = {
  state: kt,
  subscribe(s) {
    return gt(kt, () => s(kt));
  },
  subscribeKey(s, e) {
    return It(kt, s, e);
  },
  async open(s) {
    var i, o;
    const e = s == null ? void 0 : s.namespace, t = f.state.activeChain, r = e && e !== t, n = (i = f.getAccountData(s == null ? void 0 : s.namespace)) == null ? void 0 : i.caipAddress;
    if (q.state.wcBasic ? ne.prefetch({ fetchNetworkImages: !1, fetchConnectorImages: !1 }) : await ne.prefetch(), F.setFilterByNamespace(s == null ? void 0 : s.namespace), Re.setLoading(!0, e), e && r) {
      const a = ((o = f.getNetworkData(e)) == null ? void 0 : o.caipNetwork) || f.getRequestedCaipNetworks(e)[0];
      a && wg.onSwitchNetwork({ network: a, ignoreSwitchConfirmation: !0 });
    } else {
      const a = f.state.noAdapters;
      S.state.manualWCControl || a && !n ? te.isMobile() ? de.reset("AllWallets") : de.reset("ConnectingWalletConnectBasic") : s != null && s.view ? de.reset(s.view, s.data) : n ? de.reset("Account") : de.reset("Connect");
    }
    kt.open = !0, $s.set({ open: !0 }), $e.sendEvent({
      type: "track",
      event: "MODAL_OPEN",
      properties: { connected: !!n }
    });
  },
  close() {
    const s = S.state.enableEmbedded, e = !!f.state.activeCaipAddress;
    kt.open && $e.sendEvent({
      type: "track",
      event: "MODAL_CLOSE",
      properties: { connected: e }
    }), kt.open = !1, de.reset("Connect"), Re.clearLoading(), s ? e ? de.replace("Account") : de.push("Connect") : $s.set({ open: !1 }), q.resetUri();
  },
  setLoading(s, e) {
    e && kt.loadingNamespaceMap.set(e, s), kt.loading = s, $s.set({ loading: s });
  },
  clearLoading() {
    kt.loadingNamespaceMap.clear(), kt.loading = !1;
  },
  shake() {
    kt.shake || (kt.shake = !0, setTimeout(() => {
      kt.shake = !1;
    }, 500));
  }
}, Re = Qt(yg), Ei = {
  id: "2b92315d-eab7-5bef-84fa-089a131333f5",
  name: "USD Coin",
  symbol: "USDC",
  networks: [
    {
      name: "ethereum-mainnet",
      display_name: "Ethereum",
      chain_id: "1",
      contract_address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
    },
    {
      name: "polygon-mainnet",
      display_name: "Polygon",
      chain_id: "137",
      contract_address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"
    }
  ]
}, tc = {
  id: "USD",
  payment_method_limits: [
    {
      id: "card",
      min: "10.00",
      max: "7500.00"
    },
    {
      id: "ach_bank_account",
      min: "10.00",
      max: "25000.00"
    }
  ]
}, Eg = {
  providers: Lu,
  selectedProvider: null,
  error: null,
  purchaseCurrency: Ei,
  paymentCurrency: tc,
  purchaseCurrencies: [Ei],
  paymentCurrencies: [],
  quotesLoading: !1
}, Ae = Ve(Eg), bg = {
  state: Ae,
  subscribe(s) {
    return gt(Ae, () => s(Ae));
  },
  subscribeKey(s, e) {
    return It(Ae, s, e);
  },
  setSelectedProvider(s) {
    if (s && s.name === "meld") {
      const e = f.state.activeChain === N.CHAIN.SOLANA ? "SOL" : "USDC", t = X.state.address ?? "", r = new URL(s.url);
      r.searchParams.append("publicKey", Bf), r.searchParams.append("destinationCurrencyCode", e), r.searchParams.append("walletAddress", t), r.searchParams.append("externalCustomerId", S.state.projectId), Ae.selectedProvider = { ...s, url: r.toString() };
    } else
      Ae.selectedProvider = s;
  },
  setOnrampProviders(s) {
    if (Array.isArray(s) && s.every((e) => typeof e == "string")) {
      const e = s, t = Lu.filter((r) => e.includes(r.name));
      Ae.providers = t;
    } else
      Ae.providers = [];
  },
  setPurchaseCurrency(s) {
    Ae.purchaseCurrency = s;
  },
  setPaymentCurrency(s) {
    Ae.paymentCurrency = s;
  },
  setPurchaseAmount(s) {
    sc.state.purchaseAmount = s;
  },
  setPaymentAmount(s) {
    sc.state.paymentAmount = s;
  },
  async getAvailableCurrencies() {
    const s = await ae.getOnrampOptions();
    Ae.purchaseCurrencies = s.purchaseCurrencies, Ae.paymentCurrencies = s.paymentCurrencies, Ae.paymentCurrency = s.paymentCurrencies[0] || tc, Ae.purchaseCurrency = s.purchaseCurrencies[0] || Ei, await ne.fetchCurrencyImages(s.paymentCurrencies.map((e) => e.id)), await ne.fetchTokenImages(s.purchaseCurrencies.map((e) => e.symbol));
  },
  async getQuote() {
    var s, e;
    Ae.quotesLoading = !0;
    try {
      const t = await ae.getOnrampQuote({
        purchaseCurrency: Ae.purchaseCurrency,
        paymentCurrency: Ae.paymentCurrency,
        amount: ((s = Ae.paymentAmount) == null ? void 0 : s.toString()) || "0",
        network: (e = Ae.purchaseCurrency) == null ? void 0 : e.symbol
      });
      return Ae.quotesLoading = !1, Ae.purchaseAmount = Number(t == null ? void 0 : t.purchaseAmount.amount), t;
    } catch (t) {
      return Ae.error = t.message, Ae.quotesLoading = !1, null;
    } finally {
      Ae.quotesLoading = !1;
    }
  },
  resetState() {
    Ae.selectedProvider = null, Ae.error = null, Ae.purchaseCurrency = Ei, Ae.paymentCurrency = tc, Ae.purchaseCurrencies = [Ei], Ae.paymentCurrencies = [], Ae.paymentAmount = void 0, Ae.purchaseAmount = void 0, Ae.quotesLoading = !1;
  }
}, sc = Qt(bg), Pl = 2147483648, vg = {
  convertEVMChainIdToCoinType(s) {
    if (s >= Pl)
      throw new Error("Invalid chainId");
    return (Pl | s) >>> 0;
  }
}, ts = Ve({
  suggestions: [],
  loading: !1
}), Cg = {
  state: ts,
  subscribe(s) {
    return gt(ts, () => s(ts));
  },
  subscribeKey(s, e) {
    return It(ts, s, e);
  },
  async resolveName(s) {
    var e, t;
    try {
      return await ae.lookupEnsName(s);
    } catch (r) {
      const n = r;
      throw new Error(((t = (e = n == null ? void 0 : n.reasons) == null ? void 0 : e[0]) == null ? void 0 : t.description) || "Error resolving name");
    }
  },
  async isNameRegistered(s) {
    try {
      return await ae.lookupEnsName(s), !0;
    } catch {
      return !1;
    }
  },
  async getSuggestions(s) {
    try {
      ts.loading = !0, ts.suggestions = [];
      const e = await ae.getEnsNameSuggestions(s);
      return ts.suggestions = e.suggestions.map((t) => ({
        ...t,
        name: t.name
      })) || [], ts.suggestions;
    } catch (e) {
      const t = bi.parseEnsApiError(e, "Error fetching name suggestions");
      throw new Error(t);
    } finally {
      ts.loading = !1;
    }
  },
  async getNamesForAddress(s) {
    try {
      if (!f.state.activeCaipNetwork)
        return [];
      const t = $.getEnsFromCacheForAddress(s);
      if (t)
        return t;
      const r = await ae.reverseLookupEnsName({ address: s });
      return $.updateEnsCache({
        address: s,
        ens: r,
        timestamp: Date.now()
      }), r;
    } catch (e) {
      const t = bi.parseEnsApiError(e, "Error fetching names for address");
      throw new Error(t);
    }
  },
  async registerName(s) {
    const e = f.state.activeCaipNetwork;
    if (!e)
      throw new Error("Network not found");
    const t = X.state.address, r = F.getAuthConnector();
    if (!t || !r)
      throw new Error("Address or auth connector not found");
    ts.loading = !0;
    try {
      const n = JSON.stringify({
        name: s,
        attributes: {},
        // Unix timestamp
        timestamp: Math.floor(Date.now() / 1e3)
      });
      de.pushTransactionStack({
        onCancel() {
          de.replace("RegisterAccountName");
        }
      });
      const i = await q.signMessage(n);
      ts.loading = !1;
      const o = e.id;
      if (!o)
        throw new Error("Network not found");
      const a = vg.convertEVMChainIdToCoinType(Number(o));
      await ae.registerEnsName({
        coinType: a,
        address: t,
        signature: i,
        message: n
      }), X.setProfileName(s, e.chainNamespace), de.replace("RegisterAccountNameSuccess");
    } catch (n) {
      const i = bi.parseEnsApiError(n, `Error registering name ${s}`);
      throw de.replace("RegisterAccountName"), new Error(i);
    } finally {
      ts.loading = !1;
    }
  },
  validateName(s) {
    return /^[a-zA-Z0-9-]{4,}$/u.test(s);
  },
  parseEnsApiError(s, e) {
    var r, n;
    const t = s;
    return ((n = (r = t == null ? void 0 : t.reasons) == null ? void 0 : r[0]) == null ? void 0 : n.description) || e;
  }
}, bi = Qt(Cg);
var _g = Object.defineProperty, Ag = (s, e, t) => e in s ? _g(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t, Ol = (s, e, t) => Ag(s, typeof e != "symbol" ? e + "" : e, t);
let Ig = class extends qn {
  constructor(e) {
    super(), this.opts = e, Ol(this, "protocol", "wc"), Ol(this, "version", 2);
  }
};
var Sg = Object.defineProperty, Ng = (s, e, t) => e in s ? Sg(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t, Tg = (s, e, t) => Ng(s, e + "", t);
let Rg = class extends qn {
  constructor(e, t) {
    super(), this.core = e, this.logger = t, Tg(this, "records", /* @__PURE__ */ new Map());
  }
}, Pg = class {
  constructor(e, t) {
    this.logger = e, this.core = t;
  }
}, Og = class extends qn {
  constructor(e, t) {
    super(), this.relayer = e, this.logger = t;
  }
}, xg = class extends qn {
  constructor(e) {
    super();
  }
}, kg = class {
  constructor(e, t, r, n) {
    this.core = e, this.logger = t, this.name = r;
  }
}, Ug = class extends qn {
  constructor(e, t) {
    super(), this.relayer = e, this.logger = t;
  }
}, Dg = class extends qn {
  constructor(e, t) {
    super(), this.core = e, this.logger = t;
  }
}, $g = class {
  constructor(e, t, r) {
    this.core = e, this.logger = t, this.store = r;
  }
}, Lg = class {
  constructor(e, t) {
    this.projectId = e, this.logger = t;
  }
}, Mg = class {
  constructor(e, t, r) {
    this.core = e, this.logger = t, this.telemetryEnabled = r;
  }
};
var Bg = Object.defineProperty, Fg = (s, e, t) => e in s ? Bg(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t, xl = (s, e, t) => Fg(s, typeof e != "symbol" ? e + "" : e, t);
let jg = class {
  constructor(e) {
    this.opts = e, xl(this, "protocol", "wc"), xl(this, "version", 2);
  }
}, qg = class {
  constructor(e) {
    this.client = e;
  }
};
function Wg(s) {
  const e = s.length;
  let t = 0, r = 0;
  for (; r < e; ) {
    let n = s.charCodeAt(r++);
    if (n & 4294967168)
      if (!(n & 4294965248))
        t += 2;
      else {
        if (n >= 55296 && n <= 56319 && r < e) {
          const i = s.charCodeAt(r);
          (i & 64512) === 56320 && (++r, n = ((n & 1023) << 10) + (i & 1023) + 65536);
        }
        n & 4294901760 ? t += 4 : t += 3;
      }
    else {
      t++;
      continue;
    }
  }
  return t;
}
function Hg(s, e, t) {
  const r = s.length;
  let n = t, i = 0;
  for (; i < r; ) {
    let o = s.charCodeAt(i++);
    if (o & 4294967168)
      if (!(o & 4294965248))
        e[n++] = o >> 6 & 31 | 192;
      else {
        if (o >= 55296 && o <= 56319 && i < r) {
          const a = s.charCodeAt(i);
          (a & 64512) === 56320 && (++i, o = ((o & 1023) << 10) + (a & 1023) + 65536);
        }
        o & 4294901760 ? (e[n++] = o >> 18 & 7 | 240, e[n++] = o >> 12 & 63 | 128, e[n++] = o >> 6 & 63 | 128) : (e[n++] = o >> 12 & 15 | 224, e[n++] = o >> 6 & 63 | 128);
      }
    else {
      e[n++] = o;
      continue;
    }
    e[n++] = o & 63 | 128;
  }
}
const zg = new TextEncoder(), Vg = 50;
function Kg(s, e, t) {
  zg.encodeInto(s, e.subarray(t));
}
function Gg(s, e, t) {
  s.length > Vg ? Kg(s, e, t) : Hg(s, e, t);
}
const Yg = 4096;
function qu(s, e, t) {
  let r = e;
  const n = r + t, i = [];
  let o = "";
  for (; r < n; ) {
    const a = s[r++];
    if (!(a & 128))
      i.push(a);
    else if ((a & 224) === 192) {
      const c = s[r++] & 63;
      i.push((a & 31) << 6 | c);
    } else if ((a & 240) === 224) {
      const c = s[r++] & 63, l = s[r++] & 63;
      i.push((a & 31) << 12 | c << 6 | l);
    } else if ((a & 248) === 240) {
      const c = s[r++] & 63, l = s[r++] & 63, d = s[r++] & 63;
      let u = (a & 7) << 18 | c << 12 | l << 6 | d;
      u > 65535 && (u -= 65536, i.push(u >>> 10 & 1023 | 55296), u = 56320 | u & 1023), i.push(u);
    } else
      i.push(a);
    i.length >= Yg && (o += String.fromCharCode(...i), i.length = 0);
  }
  return i.length > 0 && (o += String.fromCharCode(...i)), o;
}
const Zg = new TextDecoder(), Jg = 200;
function Xg(s, e, t) {
  const r = s.subarray(e, e + t);
  return Zg.decode(r);
}
function Qg(s, e, t) {
  return t > Jg ? Xg(s, e, t) : qu(s, e, t);
}
class ao {
  constructor(e, t) {
    this.type = e, this.data = t;
  }
}
class Vt extends Error {
  constructor(e) {
    super(e);
    const t = Object.create(Vt.prototype);
    Object.setPrototypeOf(this, t), Object.defineProperty(this, "name", {
      configurable: !0,
      enumerable: !1,
      value: Vt.name
    });
  }
}
const Qn = 4294967295;
function em(s, e, t) {
  const r = t / 4294967296, n = t;
  s.setUint32(e, r), s.setUint32(e + 4, n);
}
function Wu(s, e, t) {
  const r = Math.floor(t / 4294967296), n = t;
  s.setUint32(e, r), s.setUint32(e + 4, n);
}
function Hu(s, e) {
  const t = s.getInt32(e), r = s.getUint32(e + 4);
  return t * 4294967296 + r;
}
function tm(s, e) {
  const t = s.getUint32(e), r = s.getUint32(e + 4);
  return t * 4294967296 + r;
}
const sm = -1, rm = 4294967296 - 1, nm = 17179869184 - 1;
function im({ sec: s, nsec: e }) {
  if (s >= 0 && e >= 0 && s <= nm)
    if (e === 0 && s <= rm) {
      const t = new Uint8Array(4);
      return new DataView(t.buffer).setUint32(0, s), t;
    } else {
      const t = s / 4294967296, r = s & 4294967295, n = new Uint8Array(8), i = new DataView(n.buffer);
      return i.setUint32(0, e << 2 | t & 3), i.setUint32(4, r), n;
    }
  else {
    const t = new Uint8Array(12), r = new DataView(t.buffer);
    return r.setUint32(0, e), Wu(r, 4, s), t;
  }
}
function om(s) {
  const e = s.getTime(), t = Math.floor(e / 1e3), r = (e - t * 1e3) * 1e6, n = Math.floor(r / 1e9);
  return {
    sec: t + n,
    nsec: r - n * 1e9
  };
}
function am(s) {
  if (s instanceof Date) {
    const e = om(s);
    return im(e);
  } else
    return null;
}
function cm(s) {
  const e = new DataView(s.buffer, s.byteOffset, s.byteLength);
  switch (s.byteLength) {
    case 4:
      return { sec: e.getUint32(0), nsec: 0 };
    case 8: {
      const t = e.getUint32(0), r = e.getUint32(4), n = (t & 3) * 4294967296 + r, i = t >>> 2;
      return { sec: n, nsec: i };
    }
    case 12: {
      const t = Hu(e, 4), r = e.getUint32(0);
      return { sec: t, nsec: r };
    }
    default:
      throw new Vt(`Unrecognized data size for timestamp (expected 4, 8, or 12): ${s.length}`);
  }
}
function lm(s) {
  const e = cm(s);
  return new Date(e.sec * 1e3 + e.nsec / 1e6);
}
const dm = {
  type: sm,
  encode: am,
  decode: lm
};
class Fo {
  constructor() {
    this.builtInEncoders = [], this.builtInDecoders = [], this.encoders = [], this.decoders = [], this.register(dm);
  }
  register({ type: e, encode: t, decode: r }) {
    if (e >= 0)
      this.encoders[e] = t, this.decoders[e] = r;
    else {
      const n = -1 - e;
      this.builtInEncoders[n] = t, this.builtInDecoders[n] = r;
    }
  }
  tryToEncode(e, t) {
    for (let r = 0; r < this.builtInEncoders.length; r++) {
      const n = this.builtInEncoders[r];
      if (n != null) {
        const i = n(e, t);
        if (i != null) {
          const o = -1 - r;
          return new ao(o, i);
        }
      }
    }
    for (let r = 0; r < this.encoders.length; r++) {
      const n = this.encoders[r];
      if (n != null) {
        const i = n(e, t);
        if (i != null) {
          const o = r;
          return new ao(o, i);
        }
      }
    }
    return e instanceof ao ? e : null;
  }
  decode(e, t, r) {
    const n = t < 0 ? this.builtInDecoders[-1 - t] : this.decoders[t];
    return n ? n(e, t, r) : new ao(t, e);
  }
}
Fo.defaultCodec = new Fo();
function um(s) {
  return s instanceof ArrayBuffer || typeof SharedArrayBuffer < "u" && s instanceof SharedArrayBuffer;
}
function rc(s) {
  return s instanceof Uint8Array ? s : ArrayBuffer.isView(s) ? new Uint8Array(s.buffer, s.byteOffset, s.byteLength) : um(s) ? new Uint8Array(s) : Uint8Array.from(s);
}
const hm = 100, pm = 2048;
class Vc {
  constructor(e) {
    this.entered = !1, this.extensionCodec = (e == null ? void 0 : e.extensionCodec) ?? Fo.defaultCodec, this.context = e == null ? void 0 : e.context, this.useBigInt64 = (e == null ? void 0 : e.useBigInt64) ?? !1, this.maxDepth = (e == null ? void 0 : e.maxDepth) ?? hm, this.initialBufferSize = (e == null ? void 0 : e.initialBufferSize) ?? pm, this.sortKeys = (e == null ? void 0 : e.sortKeys) ?? !1, this.forceFloat32 = (e == null ? void 0 : e.forceFloat32) ?? !1, this.ignoreUndefined = (e == null ? void 0 : e.ignoreUndefined) ?? !1, this.forceIntegerToFloat = (e == null ? void 0 : e.forceIntegerToFloat) ?? !1, this.pos = 0, this.view = new DataView(new ArrayBuffer(this.initialBufferSize)), this.bytes = new Uint8Array(this.view.buffer);
  }
  clone() {
    return new Vc({
      extensionCodec: this.extensionCodec,
      context: this.context,
      useBigInt64: this.useBigInt64,
      maxDepth: this.maxDepth,
      initialBufferSize: this.initialBufferSize,
      sortKeys: this.sortKeys,
      forceFloat32: this.forceFloat32,
      ignoreUndefined: this.ignoreUndefined,
      forceIntegerToFloat: this.forceIntegerToFloat
    });
  }
  reinitializeState() {
    this.pos = 0;
  }
  /**
   * This is almost equivalent to {@link Encoder#encode}, but it returns an reference of the encoder's internal buffer and thus much faster than {@link Encoder#encode}.
   *
   * @returns Encodes the object and returns a shared reference the encoder's internal buffer.
   */
  encodeSharedRef(e) {
    if (this.entered)
      return this.clone().encodeSharedRef(e);
    try {
      return this.entered = !0, this.reinitializeState(), this.doEncode(e, 1), this.bytes.subarray(0, this.pos);
    } finally {
      this.entered = !1;
    }
  }
  /**
   * @returns Encodes the object and returns a copy of the encoder's internal buffer.
   */
  encode(e) {
    if (this.entered)
      return this.clone().encode(e);
    try {
      return this.entered = !0, this.reinitializeState(), this.doEncode(e, 1), this.bytes.slice(0, this.pos);
    } finally {
      this.entered = !1;
    }
  }
  doEncode(e, t) {
    if (t > this.maxDepth)
      throw new Error(`Too deep objects in depth ${t}`);
    e == null ? this.encodeNil() : typeof e == "boolean" ? this.encodeBoolean(e) : typeof e == "number" ? this.forceIntegerToFloat ? this.encodeNumberAsFloat(e) : this.encodeNumber(e) : typeof e == "string" ? this.encodeString(e) : this.useBigInt64 && typeof e == "bigint" ? this.encodeBigInt64(e) : this.encodeObject(e, t);
  }
  ensureBufferSizeToWrite(e) {
    const t = this.pos + e;
    this.view.byteLength < t && this.resizeBuffer(t * 2);
  }
  resizeBuffer(e) {
    const t = new ArrayBuffer(e), r = new Uint8Array(t), n = new DataView(t);
    r.set(this.bytes), this.view = n, this.bytes = r;
  }
  encodeNil() {
    this.writeU8(192);
  }
  encodeBoolean(e) {
    e === !1 ? this.writeU8(194) : this.writeU8(195);
  }
  encodeNumber(e) {
    !this.forceIntegerToFloat && Number.isSafeInteger(e) ? e >= 0 ? e < 128 ? this.writeU8(e) : e < 256 ? (this.writeU8(204), this.writeU8(e)) : e < 65536 ? (this.writeU8(205), this.writeU16(e)) : e < 4294967296 ? (this.writeU8(206), this.writeU32(e)) : this.useBigInt64 ? this.encodeNumberAsFloat(e) : (this.writeU8(207), this.writeU64(e)) : e >= -32 ? this.writeU8(224 | e + 32) : e >= -128 ? (this.writeU8(208), this.writeI8(e)) : e >= -32768 ? (this.writeU8(209), this.writeI16(e)) : e >= -2147483648 ? (this.writeU8(210), this.writeI32(e)) : this.useBigInt64 ? this.encodeNumberAsFloat(e) : (this.writeU8(211), this.writeI64(e)) : this.encodeNumberAsFloat(e);
  }
  encodeNumberAsFloat(e) {
    this.forceFloat32 ? (this.writeU8(202), this.writeF32(e)) : (this.writeU8(203), this.writeF64(e));
  }
  encodeBigInt64(e) {
    e >= BigInt(0) ? (this.writeU8(207), this.writeBigUint64(e)) : (this.writeU8(211), this.writeBigInt64(e));
  }
  writeStringHeader(e) {
    if (e < 32)
      this.writeU8(160 + e);
    else if (e < 256)
      this.writeU8(217), this.writeU8(e);
    else if (e < 65536)
      this.writeU8(218), this.writeU16(e);
    else if (e < 4294967296)
      this.writeU8(219), this.writeU32(e);
    else
      throw new Error(`Too long string: ${e} bytes in UTF-8`);
  }
  encodeString(e) {
    const r = Wg(e);
    this.ensureBufferSizeToWrite(5 + r), this.writeStringHeader(r), Gg(e, this.bytes, this.pos), this.pos += r;
  }
  encodeObject(e, t) {
    const r = this.extensionCodec.tryToEncode(e, this.context);
    if (r != null)
      this.encodeExtension(r);
    else if (Array.isArray(e))
      this.encodeArray(e, t);
    else if (ArrayBuffer.isView(e))
      this.encodeBinary(e);
    else if (typeof e == "object")
      this.encodeMap(e, t);
    else
      throw new Error(`Unrecognized object: ${Object.prototype.toString.apply(e)}`);
  }
  encodeBinary(e) {
    const t = e.byteLength;
    if (t < 256)
      this.writeU8(196), this.writeU8(t);
    else if (t < 65536)
      this.writeU8(197), this.writeU16(t);
    else if (t < 4294967296)
      this.writeU8(198), this.writeU32(t);
    else
      throw new Error(`Too large binary: ${t}`);
    const r = rc(e);
    this.writeU8a(r);
  }
  encodeArray(e, t) {
    const r = e.length;
    if (r < 16)
      this.writeU8(144 + r);
    else if (r < 65536)
      this.writeU8(220), this.writeU16(r);
    else if (r < 4294967296)
      this.writeU8(221), this.writeU32(r);
    else
      throw new Error(`Too large array: ${r}`);
    for (const n of e)
      this.doEncode(n, t + 1);
  }
  countWithoutUndefined(e, t) {
    let r = 0;
    for (const n of t)
      e[n] !== void 0 && r++;
    return r;
  }
  encodeMap(e, t) {
    const r = Object.keys(e);
    this.sortKeys && r.sort();
    const n = this.ignoreUndefined ? this.countWithoutUndefined(e, r) : r.length;
    if (n < 16)
      this.writeU8(128 + n);
    else if (n < 65536)
      this.writeU8(222), this.writeU16(n);
    else if (n < 4294967296)
      this.writeU8(223), this.writeU32(n);
    else
      throw new Error(`Too large map object: ${n}`);
    for (const i of r) {
      const o = e[i];
      this.ignoreUndefined && o === void 0 || (this.encodeString(i), this.doEncode(o, t + 1));
    }
  }
  encodeExtension(e) {
    if (typeof e.data == "function") {
      const r = e.data(this.pos + 6), n = r.length;
      if (n >= 4294967296)
        throw new Error(`Too large extension object: ${n}`);
      this.writeU8(201), this.writeU32(n), this.writeI8(e.type), this.writeU8a(r);
      return;
    }
    const t = e.data.length;
    if (t === 1)
      this.writeU8(212);
    else if (t === 2)
      this.writeU8(213);
    else if (t === 4)
      this.writeU8(214);
    else if (t === 8)
      this.writeU8(215);
    else if (t === 16)
      this.writeU8(216);
    else if (t < 256)
      this.writeU8(199), this.writeU8(t);
    else if (t < 65536)
      this.writeU8(200), this.writeU16(t);
    else if (t < 4294967296)
      this.writeU8(201), this.writeU32(t);
    else
      throw new Error(`Too large extension object: ${t}`);
    this.writeI8(e.type), this.writeU8a(e.data);
  }
  writeU8(e) {
    this.ensureBufferSizeToWrite(1), this.view.setUint8(this.pos, e), this.pos++;
  }
  writeU8a(e) {
    const t = e.length;
    this.ensureBufferSizeToWrite(t), this.bytes.set(e, this.pos), this.pos += t;
  }
  writeI8(e) {
    this.ensureBufferSizeToWrite(1), this.view.setInt8(this.pos, e), this.pos++;
  }
  writeU16(e) {
    this.ensureBufferSizeToWrite(2), this.view.setUint16(this.pos, e), this.pos += 2;
  }
  writeI16(e) {
    this.ensureBufferSizeToWrite(2), this.view.setInt16(this.pos, e), this.pos += 2;
  }
  writeU32(e) {
    this.ensureBufferSizeToWrite(4), this.view.setUint32(this.pos, e), this.pos += 4;
  }
  writeI32(e) {
    this.ensureBufferSizeToWrite(4), this.view.setInt32(this.pos, e), this.pos += 4;
  }
  writeF32(e) {
    this.ensureBufferSizeToWrite(4), this.view.setFloat32(this.pos, e), this.pos += 4;
  }
  writeF64(e) {
    this.ensureBufferSizeToWrite(8), this.view.setFloat64(this.pos, e), this.pos += 8;
  }
  writeU64(e) {
    this.ensureBufferSizeToWrite(8), em(this.view, this.pos, e), this.pos += 8;
  }
  writeI64(e) {
    this.ensureBufferSizeToWrite(8), Wu(this.view, this.pos, e), this.pos += 8;
  }
  writeBigUint64(e) {
    this.ensureBufferSizeToWrite(8), this.view.setBigUint64(this.pos, e), this.pos += 8;
  }
  writeBigInt64(e) {
    this.ensureBufferSizeToWrite(8), this.view.setBigInt64(this.pos, e), this.pos += 8;
  }
}
function fm(s, e) {
  return new Vc(e).encodeSharedRef(s);
}
function Aa(s) {
  return `${s < 0 ? "-" : ""}0x${Math.abs(s).toString(16).padStart(2, "0")}`;
}
const gm = 16, mm = 16;
class wm {
  constructor(e = gm, t = mm) {
    this.hit = 0, this.miss = 0, this.maxKeyLength = e, this.maxLengthPerKey = t, this.caches = [];
    for (let r = 0; r < this.maxKeyLength; r++)
      this.caches.push([]);
  }
  canBeCached(e) {
    return e > 0 && e <= this.maxKeyLength;
  }
  find(e, t, r) {
    const n = this.caches[r - 1];
    e: for (const i of n) {
      const o = i.bytes;
      for (let a = 0; a < r; a++)
        if (o[a] !== e[t + a])
          continue e;
      return i.str;
    }
    return null;
  }
  store(e, t) {
    const r = this.caches[e.length - 1], n = { bytes: e, str: t };
    r.length >= this.maxLengthPerKey ? r[Math.random() * r.length | 0] = n : r.push(n);
  }
  decode(e, t, r) {
    const n = this.find(e, t, r);
    if (n != null)
      return this.hit++, n;
    this.miss++;
    const i = qu(e, t, r), o = Uint8Array.prototype.slice.call(e, t, t + r);
    return this.store(o, i), i;
  }
}
const nc = "array", vi = "map_key", zu = "map_value", ym = (s) => {
  if (typeof s == "string" || typeof s == "number")
    return s;
  throw new Vt("The type of key must be string or number but " + typeof s);
};
class Em {
  constructor() {
    this.stack = [], this.stackHeadPosition = -1;
  }
  get length() {
    return this.stackHeadPosition + 1;
  }
  top() {
    return this.stack[this.stackHeadPosition];
  }
  pushArrayState(e) {
    const t = this.getUninitializedStateFromPool();
    t.type = nc, t.position = 0, t.size = e, t.array = new Array(e);
  }
  pushMapState(e) {
    const t = this.getUninitializedStateFromPool();
    t.type = vi, t.readCount = 0, t.size = e, t.map = {};
  }
  getUninitializedStateFromPool() {
    if (this.stackHeadPosition++, this.stackHeadPosition === this.stack.length) {
      const e = {
        type: void 0,
        size: 0,
        array: void 0,
        position: 0,
        readCount: 0,
        map: void 0,
        key: null
      };
      this.stack.push(e);
    }
    return this.stack[this.stackHeadPosition];
  }
  release(e) {
    if (this.stack[this.stackHeadPosition] !== e)
      throw new Error("Invalid stack state. Released state is not on top of the stack.");
    if (e.type === nc) {
      const r = e;
      r.size = 0, r.array = void 0, r.position = 0, r.type = void 0;
    }
    if (e.type === vi || e.type === zu) {
      const r = e;
      r.size = 0, r.map = void 0, r.readCount = 0, r.type = void 0;
    }
    this.stackHeadPosition--;
  }
  reset() {
    this.stack.length = 0, this.stackHeadPosition = -1;
  }
}
const ei = -1, Kc = new DataView(new ArrayBuffer(0)), bm = new Uint8Array(Kc.buffer);
try {
  Kc.getInt8(0);
} catch (s) {
  if (!(s instanceof RangeError))
    throw new Error("This module is not supported in the current JavaScript engine because DataView does not throw RangeError on out-of-bounds access");
}
const kl = new RangeError("Insufficient data"), vm = new wm();
class Gc {
  constructor(e) {
    this.totalPos = 0, this.pos = 0, this.view = Kc, this.bytes = bm, this.headByte = ei, this.stack = new Em(), this.entered = !1, this.extensionCodec = (e == null ? void 0 : e.extensionCodec) ?? Fo.defaultCodec, this.context = e == null ? void 0 : e.context, this.useBigInt64 = (e == null ? void 0 : e.useBigInt64) ?? !1, this.rawStrings = (e == null ? void 0 : e.rawStrings) ?? !1, this.maxStrLength = (e == null ? void 0 : e.maxStrLength) ?? Qn, this.maxBinLength = (e == null ? void 0 : e.maxBinLength) ?? Qn, this.maxArrayLength = (e == null ? void 0 : e.maxArrayLength) ?? Qn, this.maxMapLength = (e == null ? void 0 : e.maxMapLength) ?? Qn, this.maxExtLength = (e == null ? void 0 : e.maxExtLength) ?? Qn, this.keyDecoder = (e == null ? void 0 : e.keyDecoder) !== void 0 ? e.keyDecoder : vm, this.mapKeyConverter = (e == null ? void 0 : e.mapKeyConverter) ?? ym;
  }
  clone() {
    return new Gc({
      extensionCodec: this.extensionCodec,
      context: this.context,
      useBigInt64: this.useBigInt64,
      rawStrings: this.rawStrings,
      maxStrLength: this.maxStrLength,
      maxBinLength: this.maxBinLength,
      maxArrayLength: this.maxArrayLength,
      maxMapLength: this.maxMapLength,
      maxExtLength: this.maxExtLength,
      keyDecoder: this.keyDecoder
    });
  }
  reinitializeState() {
    this.totalPos = 0, this.headByte = ei, this.stack.reset();
  }
  setBuffer(e) {
    const t = rc(e);
    this.bytes = t, this.view = new DataView(t.buffer, t.byteOffset, t.byteLength), this.pos = 0;
  }
  appendBuffer(e) {
    if (this.headByte === ei && !this.hasRemaining(1))
      this.setBuffer(e);
    else {
      const t = this.bytes.subarray(this.pos), r = rc(e), n = new Uint8Array(t.length + r.length);
      n.set(t), n.set(r, t.length), this.setBuffer(n);
    }
  }
  hasRemaining(e) {
    return this.view.byteLength - this.pos >= e;
  }
  createExtraByteError(e) {
    const { view: t, pos: r } = this;
    return new RangeError(`Extra ${t.byteLength - r} of ${t.byteLength} byte(s) found at buffer[${e}]`);
  }
  /**
   * @throws {@link DecodeError}
   * @throws {@link RangeError}
   */
  decode(e) {
    if (this.entered)
      return this.clone().decode(e);
    try {
      this.entered = !0, this.reinitializeState(), this.setBuffer(e);
      const t = this.doDecodeSync();
      if (this.hasRemaining(1))
        throw this.createExtraByteError(this.pos);
      return t;
    } finally {
      this.entered = !1;
    }
  }
  *decodeMulti(e) {
    if (this.entered) {
      yield* this.clone().decodeMulti(e);
      return;
    }
    try {
      for (this.entered = !0, this.reinitializeState(), this.setBuffer(e); this.hasRemaining(1); )
        yield this.doDecodeSync();
    } finally {
      this.entered = !1;
    }
  }
  async decodeAsync(e) {
    if (this.entered)
      return this.clone().decodeAsync(e);
    try {
      this.entered = !0;
      let t = !1, r;
      for await (const a of e) {
        if (t)
          throw this.entered = !1, this.createExtraByteError(this.totalPos);
        this.appendBuffer(a);
        try {
          r = this.doDecodeSync(), t = !0;
        } catch (c) {
          if (!(c instanceof RangeError))
            throw c;
        }
        this.totalPos += this.pos;
      }
      if (t) {
        if (this.hasRemaining(1))
          throw this.createExtraByteError(this.totalPos);
        return r;
      }
      const { headByte: n, pos: i, totalPos: o } = this;
      throw new RangeError(`Insufficient data in parsing ${Aa(n)} at ${o} (${i} in the current buffer)`);
    } finally {
      this.entered = !1;
    }
  }
  decodeArrayStream(e) {
    return this.decodeMultiAsync(e, !0);
  }
  decodeStream(e) {
    return this.decodeMultiAsync(e, !1);
  }
  async *decodeMultiAsync(e, t) {
    if (this.entered) {
      yield* this.clone().decodeMultiAsync(e, t);
      return;
    }
    try {
      this.entered = !0;
      let r = t, n = -1;
      for await (const i of e) {
        if (t && n === 0)
          throw this.createExtraByteError(this.totalPos);
        this.appendBuffer(i), r && (n = this.readArraySize(), r = !1, this.complete());
        try {
          for (; yield this.doDecodeSync(), --n !== 0; )
            ;
        } catch (o) {
          if (!(o instanceof RangeError))
            throw o;
        }
        this.totalPos += this.pos;
      }
    } finally {
      this.entered = !1;
    }
  }
  doDecodeSync() {
    e: for (; ; ) {
      const e = this.readHeadByte();
      let t;
      if (e >= 224)
        t = e - 256;
      else if (e < 192)
        if (e < 128)
          t = e;
        else if (e < 144) {
          const n = e - 128;
          if (n !== 0) {
            this.pushMapState(n), this.complete();
            continue e;
          } else
            t = {};
        } else if (e < 160) {
          const n = e - 144;
          if (n !== 0) {
            this.pushArrayState(n), this.complete();
            continue e;
          } else
            t = [];
        } else {
          const n = e - 160;
          t = this.decodeString(n, 0);
        }
      else if (e === 192)
        t = null;
      else if (e === 194)
        t = !1;
      else if (e === 195)
        t = !0;
      else if (e === 202)
        t = this.readF32();
      else if (e === 203)
        t = this.readF64();
      else if (e === 204)
        t = this.readU8();
      else if (e === 205)
        t = this.readU16();
      else if (e === 206)
        t = this.readU32();
      else if (e === 207)
        this.useBigInt64 ? t = this.readU64AsBigInt() : t = this.readU64();
      else if (e === 208)
        t = this.readI8();
      else if (e === 209)
        t = this.readI16();
      else if (e === 210)
        t = this.readI32();
      else if (e === 211)
        this.useBigInt64 ? t = this.readI64AsBigInt() : t = this.readI64();
      else if (e === 217) {
        const n = this.lookU8();
        t = this.decodeString(n, 1);
      } else if (e === 218) {
        const n = this.lookU16();
        t = this.decodeString(n, 2);
      } else if (e === 219) {
        const n = this.lookU32();
        t = this.decodeString(n, 4);
      } else if (e === 220) {
        const n = this.readU16();
        if (n !== 0) {
          this.pushArrayState(n), this.complete();
          continue e;
        } else
          t = [];
      } else if (e === 221) {
        const n = this.readU32();
        if (n !== 0) {
          this.pushArrayState(n), this.complete();
          continue e;
        } else
          t = [];
      } else if (e === 222) {
        const n = this.readU16();
        if (n !== 0) {
          this.pushMapState(n), this.complete();
          continue e;
        } else
          t = {};
      } else if (e === 223) {
        const n = this.readU32();
        if (n !== 0) {
          this.pushMapState(n), this.complete();
          continue e;
        } else
          t = {};
      } else if (e === 196) {
        const n = this.lookU8();
        t = this.decodeBinary(n, 1);
      } else if (e === 197) {
        const n = this.lookU16();
        t = this.decodeBinary(n, 2);
      } else if (e === 198) {
        const n = this.lookU32();
        t = this.decodeBinary(n, 4);
      } else if (e === 212)
        t = this.decodeExtension(1, 0);
      else if (e === 213)
        t = this.decodeExtension(2, 0);
      else if (e === 214)
        t = this.decodeExtension(4, 0);
      else if (e === 215)
        t = this.decodeExtension(8, 0);
      else if (e === 216)
        t = this.decodeExtension(16, 0);
      else if (e === 199) {
        const n = this.lookU8();
        t = this.decodeExtension(n, 1);
      } else if (e === 200) {
        const n = this.lookU16();
        t = this.decodeExtension(n, 2);
      } else if (e === 201) {
        const n = this.lookU32();
        t = this.decodeExtension(n, 4);
      } else
        throw new Vt(`Unrecognized type byte: ${Aa(e)}`);
      this.complete();
      const r = this.stack;
      for (; r.length > 0; ) {
        const n = r.top();
        if (n.type === nc)
          if (n.array[n.position] = t, n.position++, n.position === n.size)
            t = n.array, r.release(n);
          else
            continue e;
        else if (n.type === vi) {
          if (t === "__proto__")
            throw new Vt("The key __proto__ is not allowed");
          n.key = this.mapKeyConverter(t), n.type = zu;
          continue e;
        } else if (n.map[n.key] = t, n.readCount++, n.readCount === n.size)
          t = n.map, r.release(n);
        else {
          n.key = null, n.type = vi;
          continue e;
        }
      }
      return t;
    }
  }
  readHeadByte() {
    return this.headByte === ei && (this.headByte = this.readU8()), this.headByte;
  }
  complete() {
    this.headByte = ei;
  }
  readArraySize() {
    const e = this.readHeadByte();
    switch (e) {
      case 220:
        return this.readU16();
      case 221:
        return this.readU32();
      default: {
        if (e < 160)
          return e - 144;
        throw new Vt(`Unrecognized array type byte: ${Aa(e)}`);
      }
    }
  }
  pushMapState(e) {
    if (e > this.maxMapLength)
      throw new Vt(`Max length exceeded: map length (${e}) > maxMapLengthLength (${this.maxMapLength})`);
    this.stack.pushMapState(e);
  }
  pushArrayState(e) {
    if (e > this.maxArrayLength)
      throw new Vt(`Max length exceeded: array length (${e}) > maxArrayLength (${this.maxArrayLength})`);
    this.stack.pushArrayState(e);
  }
  decodeString(e, t) {
    return !this.rawStrings || this.stateIsMapKey() ? this.decodeUtf8String(e, t) : this.decodeBinary(e, t);
  }
  /**
   * @throws {@link RangeError}
   */
  decodeUtf8String(e, t) {
    var i;
    if (e > this.maxStrLength)
      throw new Vt(`Max length exceeded: UTF-8 byte length (${e}) > maxStrLength (${this.maxStrLength})`);
    if (this.bytes.byteLength < this.pos + t + e)
      throw kl;
    const r = this.pos + t;
    let n;
    return this.stateIsMapKey() && ((i = this.keyDecoder) != null && i.canBeCached(e)) ? n = this.keyDecoder.decode(this.bytes, r, e) : n = Qg(this.bytes, r, e), this.pos += t + e, n;
  }
  stateIsMapKey() {
    return this.stack.length > 0 ? this.stack.top().type === vi : !1;
  }
  /**
   * @throws {@link RangeError}
   */
  decodeBinary(e, t) {
    if (e > this.maxBinLength)
      throw new Vt(`Max length exceeded: bin length (${e}) > maxBinLength (${this.maxBinLength})`);
    if (!this.hasRemaining(e + t))
      throw kl;
    const r = this.pos + t, n = this.bytes.subarray(r, r + e);
    return this.pos += t + e, n;
  }
  decodeExtension(e, t) {
    if (e > this.maxExtLength)
      throw new Vt(`Max length exceeded: ext length (${e}) > maxExtLength (${this.maxExtLength})`);
    const r = this.view.getInt8(this.pos + t), n = this.decodeBinary(
      e,
      t + 1
      /* extType */
    );
    return this.extensionCodec.decode(n, r, this.context);
  }
  lookU8() {
    return this.view.getUint8(this.pos);
  }
  lookU16() {
    return this.view.getUint16(this.pos);
  }
  lookU32() {
    return this.view.getUint32(this.pos);
  }
  readU8() {
    const e = this.view.getUint8(this.pos);
    return this.pos++, e;
  }
  readI8() {
    const e = this.view.getInt8(this.pos);
    return this.pos++, e;
  }
  readU16() {
    const e = this.view.getUint16(this.pos);
    return this.pos += 2, e;
  }
  readI16() {
    const e = this.view.getInt16(this.pos);
    return this.pos += 2, e;
  }
  readU32() {
    const e = this.view.getUint32(this.pos);
    return this.pos += 4, e;
  }
  readI32() {
    const e = this.view.getInt32(this.pos);
    return this.pos += 4, e;
  }
  readU64() {
    const e = tm(this.view, this.pos);
    return this.pos += 8, e;
  }
  readI64() {
    const e = Hu(this.view, this.pos);
    return this.pos += 8, e;
  }
  readU64AsBigInt() {
    const e = this.view.getBigUint64(this.pos);
    return this.pos += 8, e;
  }
  readI64AsBigInt() {
    const e = this.view.getBigInt64(this.pos);
    return this.pos += 8, e;
  }
  readF32() {
    const e = this.view.getFloat32(this.pos);
    return this.pos += 4, e;
  }
  readF64() {
    const e = this.view.getFloat64(this.pos);
    return this.pos += 8, e;
  }
}
function Cm(s, e) {
  return new Gc(e).decode(s);
}
function Yc(s) {
  return globalThis.Buffer != null ? new Uint8Array(s.buffer, s.byteOffset, s.byteLength) : s;
}
function Vu(s = 0) {
  return globalThis.Buffer != null && globalThis.Buffer.allocUnsafe != null ? Yc(globalThis.Buffer.allocUnsafe(s)) : new Uint8Array(s);
}
function Ci(s, e) {
  e || (e = s.reduce((n, i) => n + i.length, 0));
  const t = Vu(e);
  let r = 0;
  for (const n of s)
    t.set(n, r), r += n.length;
  return Yc(t);
}
function Ku(s, e, t, r) {
  return {
    name: s,
    prefix: e,
    encoder: {
      name: s,
      prefix: e,
      encode: t
    },
    decoder: { decode: r }
  };
}
const Ul = Ku("utf8", "u", (s) => "u" + new TextDecoder("utf8").decode(s), (s) => new TextEncoder().encode(s.substring(1))), Ia = Ku("ascii", "a", (s) => {
  let e = "a";
  for (let t = 0; t < s.length; t++)
    e += String.fromCharCode(s[t]);
  return e;
}, (s) => {
  s = s.substring(1);
  const e = Vu(s.length);
  for (let t = 0; t < s.length; t++)
    e[t] = s.charCodeAt(t);
  return e;
}), Gu = {
  utf8: Ul,
  "utf-8": Ul,
  hex: El.base16,
  latin1: Ia,
  ascii: Ia,
  binary: Ia,
  ...El
};
function as(s, e = "utf8") {
  const t = Gu[e];
  if (!t)
    throw new Error(`Unsupported encoding "${e}"`);
  return (e === "utf8" || e === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null ? Yc(globalThis.Buffer.from(s, "utf-8")) : t.decoder.decode(`${t.prefix}${s}`);
}
function qt(s, e = "utf8") {
  const t = Gu[e];
  if (!t)
    throw new Error(`Unsupported encoding "${e}"`);
  return (e === "utf8" || e === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null ? globalThis.Buffer.from(s.buffer, s.byteOffset, s.byteLength).toString("utf8") : t.encoder.encode(s).substring(1);
}
const _m = "Input must be an string, Buffer or Uint8Array";
function Am(s) {
  let e;
  if (s instanceof Uint8Array)
    e = s;
  else if (typeof s == "string")
    e = new TextEncoder().encode(s);
  else
    throw new Error(_m);
  return e;
}
function Im(s) {
  return Array.prototype.map.call(s, function(e) {
    return (e < 16 ? "0" : "") + e.toString(16);
  }).join("");
}
function co(s) {
  return (4294967296 + s).toString(16).substring(1);
}
function Sm(s, e, t) {
  let r = `
` + s + " = ";
  for (let n = 0; n < e.length; n += 2) {
    if (t === 32)
      r += co(e[n]).toUpperCase(), r += " ", r += co(e[n + 1]).toUpperCase();
    else if (t === 64)
      r += co(e[n + 1]).toUpperCase(), r += co(e[n]).toUpperCase();
    else throw new Error("Invalid size " + t);
    n % 6 === 4 ? r += `
` + new Array(s.length + 4).join(" ") : n < e.length - 2 && (r += " ");
  }
  console.log(r);
}
function Nm(s, e, t) {
  let r = (/* @__PURE__ */ new Date()).getTime();
  const n = new Uint8Array(e);
  for (let o = 0; o < e; o++)
    n[o] = o % 256;
  const i = (/* @__PURE__ */ new Date()).getTime();
  console.log("Generated random input in " + (i - r) + "ms"), r = i;
  for (let o = 0; o < t; o++) {
    const a = s(n), c = (/* @__PURE__ */ new Date()).getTime(), l = c - r;
    r = c, console.log("Hashed in " + l + "ms: " + a.substring(0, 20) + "..."), console.log(
      Math.round(e / (1 << 20) / (l / 1e3) * 100) / 100 + " MB PER SECOND"
    );
  }
}
var Yu = {
  normalizeInput: Am,
  toHex: Im,
  debugPrint: Sm,
  testSpeed: Nm
};
const Io = Yu;
function lo(s, e, t) {
  const r = s[e] + s[t];
  let n = s[e + 1] + s[t + 1];
  r >= 4294967296 && n++, s[e] = r, s[e + 1] = n;
}
function Dl(s, e, t, r) {
  let n = s[e] + t;
  t < 0 && (n += 4294967296);
  let i = s[e + 1] + r;
  n >= 4294967296 && i++, s[e] = n, s[e + 1] = i;
}
function Zu(s, e) {
  return s[e] ^ s[e + 1] << 8 ^ s[e + 2] << 16 ^ s[e + 3] << 24;
}
function ir(s, e, t, r, n, i) {
  const o = fi[n], a = fi[n + 1], c = fi[i], l = fi[i + 1];
  lo(ge, s, e), Dl(ge, s, o, a);
  let d = ge[r] ^ ge[s], u = ge[r + 1] ^ ge[s + 1];
  ge[r] = u, ge[r + 1] = d, lo(ge, t, r), d = ge[e] ^ ge[t], u = ge[e + 1] ^ ge[t + 1], ge[e] = d >>> 24 ^ u << 8, ge[e + 1] = u >>> 24 ^ d << 8, lo(ge, s, e), Dl(ge, s, c, l), d = ge[r] ^ ge[s], u = ge[r + 1] ^ ge[s + 1], ge[r] = d >>> 16 ^ u << 16, ge[r + 1] = u >>> 16 ^ d << 16, lo(ge, t, r), d = ge[e] ^ ge[t], u = ge[e + 1] ^ ge[t + 1], ge[e] = u >>> 31 ^ d << 1, ge[e + 1] = d >>> 31 ^ u << 1;
}
const Ju = new Uint32Array([
  4089235720,
  1779033703,
  2227873595,
  3144134277,
  4271175723,
  1013904242,
  1595750129,
  2773480762,
  2917565137,
  1359893119,
  725511199,
  2600822924,
  4215389547,
  528734635,
  327033209,
  1541459225
]), Tm = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  14,
  10,
  4,
  8,
  9,
  15,
  13,
  6,
  1,
  12,
  0,
  2,
  11,
  7,
  5,
  3,
  11,
  8,
  12,
  0,
  5,
  2,
  15,
  13,
  10,
  14,
  3,
  6,
  7,
  1,
  9,
  4,
  7,
  9,
  3,
  1,
  13,
  12,
  11,
  14,
  2,
  6,
  5,
  10,
  4,
  0,
  15,
  8,
  9,
  0,
  5,
  7,
  2,
  4,
  10,
  15,
  14,
  1,
  11,
  12,
  6,
  8,
  3,
  13,
  2,
  12,
  6,
  10,
  0,
  11,
  8,
  3,
  4,
  13,
  7,
  5,
  15,
  14,
  1,
  9,
  12,
  5,
  1,
  15,
  14,
  13,
  4,
  10,
  0,
  7,
  6,
  3,
  9,
  2,
  8,
  11,
  13,
  11,
  7,
  14,
  12,
  1,
  3,
  9,
  5,
  0,
  15,
  4,
  8,
  6,
  2,
  10,
  6,
  15,
  14,
  9,
  11,
  3,
  0,
  8,
  12,
  2,
  13,
  7,
  1,
  4,
  10,
  5,
  10,
  2,
  8,
  4,
  7,
  6,
  1,
  5,
  15,
  11,
  9,
  14,
  3,
  12,
  13,
  0,
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  14,
  10,
  4,
  8,
  9,
  15,
  13,
  6,
  1,
  12,
  0,
  2,
  11,
  7,
  5,
  3
], wt = new Uint8Array(
  Tm.map(function(s) {
    return s * 2;
  })
), ge = new Uint32Array(32), fi = new Uint32Array(32);
function Xu(s, e) {
  let t = 0;
  for (t = 0; t < 16; t++)
    ge[t] = s.h[t], ge[t + 16] = Ju[t];
  for (ge[24] = ge[24] ^ s.t, ge[25] = ge[25] ^ s.t / 4294967296, e && (ge[28] = ~ge[28], ge[29] = ~ge[29]), t = 0; t < 32; t++)
    fi[t] = Zu(s.b, 4 * t);
  for (t = 0; t < 12; t++)
    ir(0, 8, 16, 24, wt[t * 16 + 0], wt[t * 16 + 1]), ir(2, 10, 18, 26, wt[t * 16 + 2], wt[t * 16 + 3]), ir(4, 12, 20, 28, wt[t * 16 + 4], wt[t * 16 + 5]), ir(6, 14, 22, 30, wt[t * 16 + 6], wt[t * 16 + 7]), ir(0, 10, 20, 30, wt[t * 16 + 8], wt[t * 16 + 9]), ir(2, 12, 22, 24, wt[t * 16 + 10], wt[t * 16 + 11]), ir(4, 14, 16, 26, wt[t * 16 + 12], wt[t * 16 + 13]), ir(6, 8, 18, 28, wt[t * 16 + 14], wt[t * 16 + 15]);
  for (t = 0; t < 16; t++)
    s.h[t] = s.h[t] ^ ge[t] ^ ge[t + 16];
}
const or = new Uint8Array([
  0,
  0,
  0,
  0,
  //  0: outlen, keylen, fanout, depth
  0,
  0,
  0,
  0,
  //  4: leaf length, sequential mode
  0,
  0,
  0,
  0,
  //  8: node offset
  0,
  0,
  0,
  0,
  // 12: node offset
  0,
  0,
  0,
  0,
  // 16: node depth, inner length, rfu
  0,
  0,
  0,
  0,
  // 20: rfu
  0,
  0,
  0,
  0,
  // 24: rfu
  0,
  0,
  0,
  0,
  // 28: rfu
  0,
  0,
  0,
  0,
  // 32: salt
  0,
  0,
  0,
  0,
  // 36: salt
  0,
  0,
  0,
  0,
  // 40: salt
  0,
  0,
  0,
  0,
  // 44: salt
  0,
  0,
  0,
  0,
  // 48: personal
  0,
  0,
  0,
  0,
  // 52: personal
  0,
  0,
  0,
  0,
  // 56: personal
  0,
  0,
  0,
  0
  // 60: personal
]);
function Qu(s, e, t, r) {
  if (s === 0 || s > 64)
    throw new Error("Illegal output length, expected 0 < length <= 64");
  if (e && e.length > 64)
    throw new Error("Illegal key, expected Uint8Array with 0 < length <= 64");
  if (t && t.length !== 16)
    throw new Error("Illegal salt, expected Uint8Array with length is 16");
  if (r && r.length !== 16)
    throw new Error("Illegal personal, expected Uint8Array with length is 16");
  const n = {
    b: new Uint8Array(128),
    h: new Uint32Array(16),
    t: 0,
    // input count
    c: 0,
    // pointer within buffer
    outlen: s
    // output length in bytes
  };
  or.fill(0), or[0] = s, e && (or[1] = e.length), or[2] = 1, or[3] = 1, t && or.set(t, 32), r && or.set(r, 48);
  for (let i = 0; i < 16; i++)
    n.h[i] = Ju[i] ^ Zu(or, i * 4);
  return e && (Zc(n, e), n.c = 128), n;
}
function Zc(s, e) {
  for (let t = 0; t < e.length; t++)
    s.c === 128 && (s.t += s.c, Xu(s, !1), s.c = 0), s.b[s.c++] = e[t];
}
function eh(s) {
  for (s.t += s.c; s.c < 128; )
    s.b[s.c++] = 0;
  Xu(s, !0);
  const e = new Uint8Array(s.outlen);
  for (let t = 0; t < s.outlen; t++)
    e[t] = s.h[t >> 2] >> 8 * (t & 3);
  return e;
}
function th(s, e, t, r, n) {
  t = t || 64, s = Io.normalizeInput(s), r && (r = Io.normalizeInput(r)), n && (n = Io.normalizeInput(n));
  const i = Qu(t, e, r, n);
  return Zc(i, s), eh(i);
}
function Rm(s, e, t, r, n) {
  const i = th(s, e, t, r, n);
  return Io.toHex(i);
}
var Pm = {
  blake2b: th,
  blake2bHex: Rm,
  blake2bInit: Qu,
  blake2bUpdate: Zc,
  blake2bFinal: eh
};
const sh = Yu;
function Om(s, e) {
  return s[e] ^ s[e + 1] << 8 ^ s[e + 2] << 16 ^ s[e + 3] << 24;
}
function ar(s, e, t, r, n, i) {
  Te[s] = Te[s] + Te[e] + n, Te[r] = uo(Te[r] ^ Te[s], 16), Te[t] = Te[t] + Te[r], Te[e] = uo(Te[e] ^ Te[t], 12), Te[s] = Te[s] + Te[e] + i, Te[r] = uo(Te[r] ^ Te[s], 8), Te[t] = Te[t] + Te[r], Te[e] = uo(Te[e] ^ Te[t], 7);
}
function uo(s, e) {
  return s >>> e ^ s << 32 - e;
}
const rh = new Uint32Array([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]), yt = new Uint8Array([
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  14,
  10,
  4,
  8,
  9,
  15,
  13,
  6,
  1,
  12,
  0,
  2,
  11,
  7,
  5,
  3,
  11,
  8,
  12,
  0,
  5,
  2,
  15,
  13,
  10,
  14,
  3,
  6,
  7,
  1,
  9,
  4,
  7,
  9,
  3,
  1,
  13,
  12,
  11,
  14,
  2,
  6,
  5,
  10,
  4,
  0,
  15,
  8,
  9,
  0,
  5,
  7,
  2,
  4,
  10,
  15,
  14,
  1,
  11,
  12,
  6,
  8,
  3,
  13,
  2,
  12,
  6,
  10,
  0,
  11,
  8,
  3,
  4,
  13,
  7,
  5,
  15,
  14,
  1,
  9,
  12,
  5,
  1,
  15,
  14,
  13,
  4,
  10,
  0,
  7,
  6,
  3,
  9,
  2,
  8,
  11,
  13,
  11,
  7,
  14,
  12,
  1,
  3,
  9,
  5,
  0,
  15,
  4,
  8,
  6,
  2,
  10,
  6,
  15,
  14,
  9,
  11,
  3,
  0,
  8,
  12,
  2,
  13,
  7,
  1,
  4,
  10,
  5,
  10,
  2,
  8,
  4,
  7,
  6,
  1,
  5,
  15,
  11,
  9,
  14,
  3,
  12,
  13,
  0
]), Te = new Uint32Array(16), lt = new Uint32Array(16);
function nh(s, e) {
  let t = 0;
  for (t = 0; t < 8; t++)
    Te[t] = s.h[t], Te[t + 8] = rh[t];
  for (Te[12] ^= s.t, Te[13] ^= s.t / 4294967296, e && (Te[14] = ~Te[14]), t = 0; t < 16; t++)
    lt[t] = Om(s.b, 4 * t);
  for (t = 0; t < 10; t++)
    ar(0, 4, 8, 12, lt[yt[t * 16 + 0]], lt[yt[t * 16 + 1]]), ar(1, 5, 9, 13, lt[yt[t * 16 + 2]], lt[yt[t * 16 + 3]]), ar(2, 6, 10, 14, lt[yt[t * 16 + 4]], lt[yt[t * 16 + 5]]), ar(3, 7, 11, 15, lt[yt[t * 16 + 6]], lt[yt[t * 16 + 7]]), ar(0, 5, 10, 15, lt[yt[t * 16 + 8]], lt[yt[t * 16 + 9]]), ar(1, 6, 11, 12, lt[yt[t * 16 + 10]], lt[yt[t * 16 + 11]]), ar(2, 7, 8, 13, lt[yt[t * 16 + 12]], lt[yt[t * 16 + 13]]), ar(3, 4, 9, 14, lt[yt[t * 16 + 14]], lt[yt[t * 16 + 15]]);
  for (t = 0; t < 8; t++)
    s.h[t] ^= Te[t] ^ Te[t + 8];
}
function ih(s, e) {
  if (!(s > 0 && s <= 32))
    throw new Error("Incorrect output length, should be in [1, 32]");
  const t = e ? e.length : 0;
  if (e && !(t > 0 && t <= 32))
    throw new Error("Incorrect key length, should be in [1, 32]");
  const r = {
    h: new Uint32Array(rh),
    // hash state
    b: new Uint8Array(64),
    // input block
    c: 0,
    // pointer within block
    t: 0,
    // input count
    outlen: s
    // output length in bytes
  };
  return r.h[0] ^= 16842752 ^ t << 8 ^ s, t > 0 && (Jc(r, e), r.c = 64), r;
}
function Jc(s, e) {
  for (let t = 0; t < e.length; t++)
    s.c === 64 && (s.t += s.c, nh(s, !1), s.c = 0), s.b[s.c++] = e[t];
}
function oh(s) {
  for (s.t += s.c; s.c < 64; )
    s.b[s.c++] = 0;
  nh(s, !0);
  const e = new Uint8Array(s.outlen);
  for (let t = 0; t < s.outlen; t++)
    e[t] = s.h[t >> 2] >> 8 * (t & 3) & 255;
  return e;
}
function ah(s, e, t) {
  t = t || 32, s = sh.normalizeInput(s);
  const r = ih(t, e);
  return Jc(r, s), oh(r);
}
function xm(s, e, t) {
  const r = ah(s, e, t);
  return sh.toHex(r);
}
var km = {
  blake2s: ah,
  blake2sHex: xm,
  blake2sInit: ih,
  blake2sUpdate: Jc,
  blake2sFinal: oh
};
const ti = Pm, si = km;
var Um = {
  blake2b: ti.blake2b,
  blake2bHex: ti.blake2bHex,
  blake2bInit: ti.blake2bInit,
  blake2bUpdate: ti.blake2bUpdate,
  blake2bFinal: ti.blake2bFinal,
  blake2s: si.blake2s,
  blake2sHex: si.blake2sHex,
  blake2sInit: si.blake2sInit,
  blake2sUpdate: si.blake2sUpdate,
  blake2sFinal: si.blake2sFinal
};
const Dm = ":";
function On(s) {
  const [e, t] = s.split(Dm);
  return { namespace: e, reference: t };
}
function ch(s, e) {
  return s.includes(":") ? [s] : e.chains || [];
}
var $m = Object.defineProperty, Lm = Object.defineProperties, Mm = Object.getOwnPropertyDescriptors, $l = Object.getOwnPropertySymbols, Bm = Object.prototype.hasOwnProperty, Fm = Object.prototype.propertyIsEnumerable, Ll = (s, e, t) => e in s ? $m(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t, Ml = (s, e) => {
  for (var t in e || (e = {})) Bm.call(e, t) && Ll(s, t, e[t]);
  if ($l) for (var t of $l(e)) Fm.call(e, t) && Ll(s, t, e[t]);
  return s;
}, jm = (s, e) => Lm(s, Mm(e));
const qm = "ReactNative", Zt = { reactNative: "react-native", node: "node", browser: "browser", unknown: "unknown" }, Wm = "js";
function jo() {
  return typeof process < "u" && typeof process.versions < "u" && typeof process.versions.node < "u";
}
function Or() {
  return !$n() && !!Pu() && navigator.product === qm;
}
function Hm() {
  return Or() && typeof global < "u" && typeof (global == null ? void 0 : global.Platform) < "u" && (global == null ? void 0 : global.Platform.OS) === "android";
}
function zm() {
  return Or() && typeof global < "u" && typeof (global == null ? void 0 : global.Platform) < "u" && (global == null ? void 0 : global.Platform.OS) === "ios";
}
function Vn() {
  return !jo() && !!Pu() && !!$n();
}
function Xi() {
  return Or() ? Zt.reactNative : jo() ? Zt.node : Vn() ? Zt.browser : Zt.unknown;
}
function Bl() {
  var s;
  try {
    return Or() && typeof global < "u" && typeof (global == null ? void 0 : global.Application) < "u" ? (s = global.Application) == null ? void 0 : s.applicationId : void 0;
  } catch {
    return;
  }
}
function Vm(s, e) {
  const t = new URLSearchParams(s);
  for (const r of Object.keys(e).sort()) if (e.hasOwnProperty(r)) {
    const n = e[r];
    n !== void 0 && t.set(r, n);
  }
  return t.toString();
}
function Km(s) {
  var e, t;
  const r = lh();
  try {
    return s != null && s.url && r.url && new URL(s.url).host !== new URL(r.url).host && (console.warn(`The configured WalletConnect 'metadata.url':${s.url} differs from the actual page url:${r.url}. This is probably unintended and can lead to issues.`), s.url = r.url), (e = s == null ? void 0 : s.icons) != null && e.length && s.icons.length > 0 && (s.icons = s.icons.filter((n) => n !== "")), jm(Ml(Ml({}, r), s), { url: (s == null ? void 0 : s.url) || r.url, name: (s == null ? void 0 : s.name) || r.name, description: (s == null ? void 0 : s.description) || r.description, icons: (t = s == null ? void 0 : s.icons) != null && t.length && s.icons.length > 0 ? s.icons : r.icons });
  } catch (n) {
    return console.warn("Error populating app metadata", n), s || r;
  }
}
function lh() {
  return Jp() || { name: "", description: "", url: "", icons: [""] };
}
function Gm() {
  if (Xi() === Zt.reactNative && typeof global < "u" && typeof (global == null ? void 0 : global.Platform) < "u") {
    const { OS: t, Version: r } = global.Platform;
    return [t, r].join("-");
  }
  const s = Qp();
  if (s === null) return "unknown";
  const e = s.os ? s.os.replace(" ", "").toLowerCase() : "unknown";
  return s.type === "browser" ? [e, s.name, s.version].join("-") : [e, s.version].join("-");
}
function Ym() {
  var s;
  const e = Xi();
  return e === Zt.browser ? [e, ((s = ef()) == null ? void 0 : s.host) || "unknown"].join(":") : e;
}
function dh(s, e, t) {
  const r = Gm(), n = Ym();
  return [[s, e].join("-"), [Wm, t].join("-"), r, n].join("/");
}
function Zm({ protocol: s, version: e, relayUrl: t, sdkVersion: r, auth: n, projectId: i, useOnCloseEvent: o, bundleId: a, packageName: c }) {
  const l = t.split("?"), d = dh(s, e, r), u = { auth: n, ua: d, projectId: i, useOnCloseEvent: o, packageName: c || void 0, bundleId: a || void 0 }, p = Vm(l[1] || "", u);
  return l[0] + "?" + p;
}
function Fr(s, e) {
  return s.filter((t) => e.includes(t)).length === s.length;
}
function ic(s) {
  return Object.fromEntries(s.entries());
}
function oc(s) {
  return new Map(Object.entries(s));
}
function $r(s = B.FIVE_MINUTES, e) {
  const t = B.toMiliseconds(s || B.FIVE_MINUTES);
  let r, n, i, o;
  return { resolve: (a) => {
    i && r && (clearTimeout(i), r(a), o = Promise.resolve(a));
  }, reject: (a) => {
    i && n && (clearTimeout(i), n(a));
  }, done: () => new Promise((a, c) => {
    if (o) return a(o);
    i = setTimeout(() => {
      const l = new Error(e);
      o = Promise.reject(l), c(l);
    }, t), r = a, n = c;
  }) };
}
function vr(s, e, t) {
  return new Promise(async (r, n) => {
    const i = setTimeout(() => n(new Error(t)), e);
    try {
      const o = await s;
      r(o);
    } catch (o) {
      n(o);
    }
    clearTimeout(i);
  });
}
function uh(s, e) {
  if (typeof e == "string" && e.startsWith(`${s}:`)) return e;
  if (s.toLowerCase() === "topic") {
    if (typeof e != "string") throw new Error('Value must be "string" for expirer target type: topic');
    return `topic:${e}`;
  } else if (s.toLowerCase() === "id") {
    if (typeof e != "number") throw new Error('Value must be "number" for expirer target type: id');
    return `id:${e}`;
  }
  throw new Error(`Unknown expirer target type: ${s}`);
}
function Jm(s) {
  return uh("topic", s);
}
function Xm(s) {
  return uh("id", s);
}
function hh(s) {
  const [e, t] = s.split(":"), r = { id: void 0, topic: void 0 };
  if (e === "topic" && typeof t == "string") r.topic = t;
  else if (e === "id" && Number.isInteger(Number(t))) r.id = Number(t);
  else throw new Error(`Invalid target, expected id:number or topic:string, got ${e}:${t}`);
  return r;
}
function nt(s, e) {
  return B.fromMiliseconds(Date.now() + B.toMiliseconds(s));
}
function gr(s) {
  return Date.now() >= B.toMiliseconds(s);
}
function ke(s, e) {
  return `${s}${e ? `:${e}` : ""}`;
}
function Ls(s = [], e = []) {
  return [.../* @__PURE__ */ new Set([...s, ...e])];
}
async function Qm({ id: s, topic: e, wcDeepLink: t }) {
  var r;
  try {
    if (!t) return;
    const n = typeof t == "string" ? JSON.parse(t) : t, i = n == null ? void 0 : n.href;
    if (typeof i != "string") return;
    const o = ew(i, s, e), a = Xi();
    if (a === Zt.browser) {
      if (!((r = $n()) != null && r.hasFocus())) {
        console.warn("Document does not have focus, skipping deeplink.");
        return;
      }
      tw(o);
    } else a === Zt.reactNative && typeof (global == null ? void 0 : global.Linking) < "u" && await global.Linking.openURL(o);
  } catch (n) {
    console.error(n);
  }
}
function ew(s, e, t) {
  const r = `requestId=${e}&sessionTopic=${t}`;
  s.endsWith("/") && (s = s.slice(0, -1));
  let n = `${s}`;
  if (s.startsWith("https://t.me")) {
    const i = s.includes("?") ? "&startapp=" : "?startapp=";
    n = `${n}${i}${iw(r, !0)}`;
  } else n = `${n}/wc?${r}`;
  return n;
}
function tw(s) {
  let e = "_self";
  nw() ? e = "_top" : (rw() || s.startsWith("https://") || s.startsWith("http://")) && (e = "_blank"), window.open(s, e, "noreferrer noopener");
}
async function sw(s, e) {
  let t = "";
  try {
    if (Vn() && (t = localStorage.getItem(e), t)) return t;
    t = await s.getItem(e);
  } catch (r) {
    console.error(r);
  }
  return t;
}
function Fl(s, e) {
  if (!s.includes(e)) return null;
  const t = s.split(/([&,?,=])/), r = t.indexOf(e);
  return t[r + 2];
}
function jl() {
  return typeof crypto < "u" && crypto != null && crypto.randomUUID ? crypto.randomUUID() : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/gu, (s) => {
    const e = Math.random() * 16 | 0;
    return (s === "x" ? e : e & 3 | 8).toString(16);
  });
}
function Xc() {
  return typeof process < "u" && process.env.IS_VITEST === "true";
}
function rw() {
  return typeof window < "u" && (!!window.TelegramWebviewProxy || !!window.Telegram || !!window.TelegramWebviewProxyProto);
}
function nw() {
  try {
    return window.self !== window.top;
  } catch {
    return !1;
  }
}
function iw(s, e = !1) {
  const t = Buffer.from(s).toString("base64");
  return e ? t.replace(/[=]/g, "") : t;
}
function ph(s) {
  return Buffer.from(s, "base64").toString("utf-8");
}
function ow(s) {
  return new Promise((e) => setTimeout(e, s));
}
const ho = BigInt(2 ** 32 - 1), ql = BigInt(32);
function fh(s, e = !1) {
  return e ? { h: Number(s & ho), l: Number(s >> ql & ho) } : { h: Number(s >> ql & ho) | 0, l: Number(s & ho) | 0 };
}
function gh(s, e = !1) {
  const t = s.length;
  let r = new Uint32Array(t), n = new Uint32Array(t);
  for (let i = 0; i < t; i++) {
    const { h: o, l: a } = fh(s[i], e);
    [r[i], n[i]] = [o, a];
  }
  return [r, n];
}
const Wl = (s, e, t) => s >>> t, Hl = (s, e, t) => s << 32 - t | e >>> t, mr = (s, e, t) => s >>> t | e << 32 - t, wr = (s, e, t) => s << 32 - t | e >>> t, gi = (s, e, t) => s << 64 - t | e >>> t - 32, mi = (s, e, t) => s >>> t - 32 | e << 64 - t, aw = (s, e) => e, cw = (s, e) => s, lw = (s, e, t) => s << t | e >>> 32 - t, dw = (s, e, t) => e << t | s >>> 32 - t, uw = (s, e, t) => e << t - 32 | s >>> 64 - t, hw = (s, e, t) => s << t - 32 | e >>> 64 - t;
function ms(s, e, t, r) {
  const n = (e >>> 0) + (r >>> 0);
  return { h: s + t + (n / 2 ** 32 | 0) | 0, l: n | 0 };
}
const Qc = (s, e, t) => (s >>> 0) + (e >>> 0) + (t >>> 0), el = (s, e, t, r) => e + t + r + (s / 2 ** 32 | 0) | 0, pw = (s, e, t, r) => (s >>> 0) + (e >>> 0) + (t >>> 0) + (r >>> 0), fw = (s, e, t, r, n) => e + t + r + n + (s / 2 ** 32 | 0) | 0, gw = (s, e, t, r, n) => (s >>> 0) + (e >>> 0) + (t >>> 0) + (r >>> 0) + (n >>> 0), mw = (s, e, t, r, n, i) => e + t + r + n + i + (s / 2 ** 32 | 0) | 0, an = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
function tl(s) {
  return s instanceof Uint8Array || ArrayBuffer.isView(s) && s.constructor.name === "Uint8Array";
}
function er(s) {
  if (!Number.isSafeInteger(s) || s < 0) throw new Error("positive integer expected, got " + s);
}
function cs(s, ...e) {
  if (!tl(s)) throw new Error("Uint8Array expected");
  if (e.length > 0 && !e.includes(s.length)) throw new Error("Uint8Array expected of length " + e + ", got length=" + s.length);
}
function sl(s) {
  if (typeof s != "function" || typeof s.create != "function") throw new Error("Hash should be wrapped by utils.createHasher");
  er(s.outputLen), er(s.blockLen);
}
function Nr(s, e = !0) {
  if (s.destroyed) throw new Error("Hash instance has been destroyed");
  if (e && s.finished) throw new Error("Hash#digest() has already been called");
}
function rl(s, e) {
  cs(s);
  const t = e.outputLen;
  if (s.length < t) throw new Error("digestInto() expects output buffer of length at least " + t);
}
function ki(s) {
  return new Uint32Array(s.buffer, s.byteOffset, Math.floor(s.byteLength / 4));
}
function ls(...s) {
  for (let e = 0; e < s.length; e++) s[e].fill(0);
}
function Sa(s) {
  return new DataView(s.buffer, s.byteOffset, s.byteLength);
}
function Ts(s, e) {
  return s << 32 - e | s >>> e;
}
const mh = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
function wh(s) {
  return s << 24 & 4278190080 | s << 8 & 16711680 | s >>> 8 & 65280 | s >>> 24 & 255;
}
const Ks = mh ? (s) => s : (s) => wh(s);
function ww(s) {
  for (let e = 0; e < s.length; e++) s[e] = wh(s[e]);
  return s;
}
const yr = mh ? (s) => s : ww, yh = typeof Uint8Array.from([]).toHex == "function" && typeof Uint8Array.fromHex == "function", yw = Array.from({ length: 256 }, (s, e) => e.toString(16).padStart(2, "0"));
function Ui(s) {
  if (cs(s), yh) return s.toHex();
  let e = "";
  for (let t = 0; t < s.length; t++) e += yw[s[t]];
  return e;
}
const zs = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
function zl(s) {
  if (s >= zs._0 && s <= zs._9) return s - zs._0;
  if (s >= zs.A && s <= zs.F) return s - (zs.A - 10);
  if (s >= zs.a && s <= zs.f) return s - (zs.a - 10);
}
function nl(s) {
  if (typeof s != "string") throw new Error("hex string expected, got " + typeof s);
  if (yh) return Uint8Array.fromHex(s);
  const e = s.length, t = e / 2;
  if (e % 2) throw new Error("hex string expected, got unpadded hex of length " + e);
  const r = new Uint8Array(t);
  for (let n = 0, i = 0; n < t; n++, i += 2) {
    const o = zl(s.charCodeAt(i)), a = zl(s.charCodeAt(i + 1));
    if (o === void 0 || a === void 0) {
      const c = s[i] + s[i + 1];
      throw new Error('hex string expected, got non-hex character "' + c + '" at index ' + i);
    }
    r[n] = o * 16 + a;
  }
  return r;
}
function Ew(s) {
  if (typeof s != "string") throw new Error("string expected");
  return new Uint8Array(new TextEncoder().encode(s));
}
function vs(s) {
  return typeof s == "string" && (s = Ew(s)), cs(s), s;
}
function jr(...s) {
  let e = 0;
  for (let r = 0; r < s.length; r++) {
    const n = s[r];
    cs(n), e += n.length;
  }
  const t = new Uint8Array(e);
  for (let r = 0, n = 0; r < s.length; r++) {
    const i = s[r];
    t.set(i, n), n += i.length;
  }
  return t;
}
let ia = class {
};
function Qi(s) {
  const e = (r) => s().update(vs(r)).digest(), t = s();
  return e.outputLen = t.outputLen, e.blockLen = t.blockLen, e.create = () => s(), e;
}
function bw(s) {
  const e = (r, n) => s(n).update(vs(r)).digest(), t = s({});
  return e.outputLen = t.outputLen, e.blockLen = t.blockLen, e.create = (r) => s(r), e;
}
function Kn(s = 32) {
  if (an && typeof an.getRandomValues == "function") return an.getRandomValues(new Uint8Array(s));
  if (an && typeof an.randomBytes == "function") return Uint8Array.from(an.randomBytes(s));
  throw new Error("crypto.getRandomValues must be defined");
}
const vw = BigInt(0), ri = BigInt(1), Cw = BigInt(2), _w = BigInt(7), Aw = BigInt(256), Iw = BigInt(113), Eh = [], bh = [], vh = [];
for (let s = 0, e = ri, t = 1, r = 0; s < 24; s++) {
  [t, r] = [r, (2 * t + 3 * r) % 5], Eh.push(2 * (5 * r + t)), bh.push((s + 1) * (s + 2) / 2 % 64);
  let n = vw;
  for (let i = 0; i < 7; i++) e = (e << ri ^ (e >> _w) * Iw) % Aw, e & Cw && (n ^= ri << (ri << BigInt(i)) - ri);
  vh.push(n);
}
const Ch = gh(vh, !0), Sw = Ch[0], Nw = Ch[1], Vl = (s, e, t) => t > 32 ? uw(s, e, t) : lw(s, e, t), Kl = (s, e, t) => t > 32 ? hw(s, e, t) : dw(s, e, t);
function Tw(s, e = 24) {
  const t = new Uint32Array(10);
  for (let r = 24 - e; r < 24; r++) {
    for (let o = 0; o < 10; o++) t[o] = s[o] ^ s[o + 10] ^ s[o + 20] ^ s[o + 30] ^ s[o + 40];
    for (let o = 0; o < 10; o += 2) {
      const a = (o + 8) % 10, c = (o + 2) % 10, l = t[c], d = t[c + 1], u = Vl(l, d, 1) ^ t[a], p = Kl(l, d, 1) ^ t[a + 1];
      for (let g = 0; g < 50; g += 10) s[o + g] ^= u, s[o + g + 1] ^= p;
    }
    let n = s[2], i = s[3];
    for (let o = 0; o < 24; o++) {
      const a = bh[o], c = Vl(n, i, a), l = Kl(n, i, a), d = Eh[o];
      n = s[d], i = s[d + 1], s[d] = c, s[d + 1] = l;
    }
    for (let o = 0; o < 50; o += 10) {
      for (let a = 0; a < 10; a++) t[a] = s[o + a];
      for (let a = 0; a < 10; a++) s[o + a] ^= ~t[(a + 2) % 10] & t[(a + 4) % 10];
    }
    s[0] ^= Sw[r], s[1] ^= Nw[r];
  }
  ls(t);
}
let Rw = class _h extends ia {
  constructor(e, t, r, n = !1, i = 24) {
    if (super(), this.pos = 0, this.posOut = 0, this.finished = !1, this.destroyed = !1, this.enableXOF = !1, this.blockLen = e, this.suffix = t, this.outputLen = r, this.enableXOF = n, this.rounds = i, er(r), !(0 < e && e < 200)) throw new Error("only keccak-f1600 function is supported");
    this.state = new Uint8Array(200), this.state32 = ki(this.state);
  }
  clone() {
    return this._cloneInto();
  }
  keccak() {
    yr(this.state32), Tw(this.state32, this.rounds), yr(this.state32), this.posOut = 0, this.pos = 0;
  }
  update(e) {
    Nr(this), e = vs(e), cs(e);
    const { blockLen: t, state: r } = this, n = e.length;
    for (let i = 0; i < n; ) {
      const o = Math.min(t - this.pos, n - i);
      for (let a = 0; a < o; a++) r[this.pos++] ^= e[i++];
      this.pos === t && this.keccak();
    }
    return this;
  }
  finish() {
    if (this.finished) return;
    this.finished = !0;
    const { state: e, suffix: t, pos: r, blockLen: n } = this;
    e[r] ^= t, t & 128 && r === n - 1 && this.keccak(), e[n - 1] ^= 128, this.keccak();
  }
  writeInto(e) {
    Nr(this, !1), cs(e), this.finish();
    const t = this.state, { blockLen: r } = this;
    for (let n = 0, i = e.length; n < i; ) {
      this.posOut >= r && this.keccak();
      const o = Math.min(r - this.posOut, i - n);
      e.set(t.subarray(this.posOut, this.posOut + o), n), this.posOut += o, n += o;
    }
    return e;
  }
  xofInto(e) {
    if (!this.enableXOF) throw new Error("XOF is not possible for this instance");
    return this.writeInto(e);
  }
  xof(e) {
    return er(e), this.xofInto(new Uint8Array(e));
  }
  digestInto(e) {
    if (rl(e, this), this.finished) throw new Error("digest() was already called");
    return this.writeInto(e), this.destroy(), e;
  }
  digest() {
    return this.digestInto(new Uint8Array(this.outputLen));
  }
  destroy() {
    this.destroyed = !0, ls(this.state);
  }
  _cloneInto(e) {
    const { blockLen: t, suffix: r, outputLen: n, rounds: i, enableXOF: o } = this;
    return e || (e = new _h(t, r, n, o, i)), e.state32.set(this.state32), e.pos = this.pos, e.posOut = this.posOut, e.finished = this.finished, e.rounds = i, e.suffix = r, e.outputLen = n, e.enableXOF = o, e.destroyed = this.destroyed, e;
  }
};
const Pw = (s, e, t) => Qi(() => new Rw(e, s, t)), Ow = Pw(1, 136, 256 / 8);
function xw(s, e, t, r) {
  if (typeof s.setBigUint64 == "function") return s.setBigUint64(e, t, r);
  const n = BigInt(32), i = BigInt(4294967295), o = Number(t >> n & i), a = Number(t & i), c = r ? 4 : 0, l = r ? 0 : 4;
  s.setUint32(e + c, o, r), s.setUint32(e + l, a, r);
}
function kw(s, e, t) {
  return s & e ^ ~s & t;
}
function Uw(s, e, t) {
  return s & e ^ s & t ^ e & t;
}
let Ah = class extends ia {
  constructor(e, t, r, n) {
    super(), this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.blockLen = e, this.outputLen = t, this.padOffset = r, this.isLE = n, this.buffer = new Uint8Array(e), this.view = Sa(this.buffer);
  }
  update(e) {
    Nr(this), e = vs(e), cs(e);
    const { view: t, buffer: r, blockLen: n } = this, i = e.length;
    for (let o = 0; o < i; ) {
      const a = Math.min(n - this.pos, i - o);
      if (a === n) {
        const c = Sa(e);
        for (; n <= i - o; o += n) this.process(c, o);
        continue;
      }
      r.set(e.subarray(o, o + a), this.pos), this.pos += a, o += a, this.pos === n && (this.process(t, 0), this.pos = 0);
    }
    return this.length += e.length, this.roundClean(), this;
  }
  digestInto(e) {
    Nr(this), rl(e, this), this.finished = !0;
    const { buffer: t, view: r, blockLen: n, isLE: i } = this;
    let { pos: o } = this;
    t[o++] = 128, ls(this.buffer.subarray(o)), this.padOffset > n - o && (this.process(r, 0), o = 0);
    for (let u = o; u < n; u++) t[u] = 0;
    xw(r, n - 8, BigInt(this.length * 8), i), this.process(r, 0);
    const a = Sa(e), c = this.outputLen;
    if (c % 4) throw new Error("_sha2: outputLen should be aligned to 32bit");
    const l = c / 4, d = this.get();
    if (l > d.length) throw new Error("_sha2: outputLen bigger than state");
    for (let u = 0; u < l; u++) a.setUint32(4 * u, d[u], i);
  }
  digest() {
    const { buffer: e, outputLen: t } = this;
    this.digestInto(e);
    const r = e.slice(0, t);
    return this.destroy(), r;
  }
  _cloneInto(e) {
    e || (e = new this.constructor()), e.set(...this.get());
    const { blockLen: t, buffer: r, length: n, finished: i, destroyed: o, pos: a } = this;
    return e.destroyed = o, e.finished = i, e.length = n, e.pos = a, n % t && e.buffer.set(r), e;
  }
  clone() {
    return this._cloneInto();
  }
};
const cr = Uint32Array.from([1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225]), Et = Uint32Array.from([3418070365, 3238371032, 1654270250, 914150663, 2438529370, 812702999, 355462360, 4144912697, 1731405415, 4290775857, 2394180231, 1750603025, 3675008525, 1694076839, 1203062813, 3204075428]), bt = Uint32Array.from([1779033703, 4089235720, 3144134277, 2227873595, 1013904242, 4271175723, 2773480762, 1595750129, 1359893119, 2917565137, 2600822924, 725511199, 528734635, 4215389547, 1541459225, 327033209]), Dw = Uint32Array.from([1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298]), lr = new Uint32Array(64);
let $w = class extends Ah {
  constructor(e = 32) {
    super(64, e, 8, !1), this.A = cr[0] | 0, this.B = cr[1] | 0, this.C = cr[2] | 0, this.D = cr[3] | 0, this.E = cr[4] | 0, this.F = cr[5] | 0, this.G = cr[6] | 0, this.H = cr[7] | 0;
  }
  get() {
    const { A: e, B: t, C: r, D: n, E: i, F: o, G: a, H: c } = this;
    return [e, t, r, n, i, o, a, c];
  }
  set(e, t, r, n, i, o, a, c) {
    this.A = e | 0, this.B = t | 0, this.C = r | 0, this.D = n | 0, this.E = i | 0, this.F = o | 0, this.G = a | 0, this.H = c | 0;
  }
  process(e, t) {
    for (let u = 0; u < 16; u++, t += 4) lr[u] = e.getUint32(t, !1);
    for (let u = 16; u < 64; u++) {
      const p = lr[u - 15], g = lr[u - 2], w = Ts(p, 7) ^ Ts(p, 18) ^ p >>> 3, m = Ts(g, 17) ^ Ts(g, 19) ^ g >>> 10;
      lr[u] = m + lr[u - 7] + w + lr[u - 16] | 0;
    }
    let { A: r, B: n, C: i, D: o, E: a, F: c, G: l, H: d } = this;
    for (let u = 0; u < 64; u++) {
      const p = Ts(a, 6) ^ Ts(a, 11) ^ Ts(a, 25), g = d + p + kw(a, c, l) + Dw[u] + lr[u] | 0, w = (Ts(r, 2) ^ Ts(r, 13) ^ Ts(r, 22)) + Uw(r, n, i) | 0;
      d = l, l = c, c = a, a = o + g | 0, o = i, i = n, n = r, r = g + w | 0;
    }
    r = r + this.A | 0, n = n + this.B | 0, i = i + this.C | 0, o = o + this.D | 0, a = a + this.E | 0, c = c + this.F | 0, l = l + this.G | 0, d = d + this.H | 0, this.set(r, n, i, o, a, c, l, d);
  }
  roundClean() {
    ls(lr);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), ls(this.buffer);
  }
};
const Ih = gh(["0x428a2f98d728ae22", "0x7137449123ef65cd", "0xb5c0fbcfec4d3b2f", "0xe9b5dba58189dbbc", "0x3956c25bf348b538", "0x59f111f1b605d019", "0x923f82a4af194f9b", "0xab1c5ed5da6d8118", "0xd807aa98a3030242", "0x12835b0145706fbe", "0x243185be4ee4b28c", "0x550c7dc3d5ffb4e2", "0x72be5d74f27b896f", "0x80deb1fe3b1696b1", "0x9bdc06a725c71235", "0xc19bf174cf692694", "0xe49b69c19ef14ad2", "0xefbe4786384f25e3", "0x0fc19dc68b8cd5b5", "0x240ca1cc77ac9c65", "0x2de92c6f592b0275", "0x4a7484aa6ea6e483", "0x5cb0a9dcbd41fbd4", "0x76f988da831153b5", "0x983e5152ee66dfab", "0xa831c66d2db43210", "0xb00327c898fb213f", "0xbf597fc7beef0ee4", "0xc6e00bf33da88fc2", "0xd5a79147930aa725", "0x06ca6351e003826f", "0x142929670a0e6e70", "0x27b70a8546d22ffc", "0x2e1b21385c26c926", "0x4d2c6dfc5ac42aed", "0x53380d139d95b3df", "0x650a73548baf63de", "0x766a0abb3c77b2a8", "0x81c2c92e47edaee6", "0x92722c851482353b", "0xa2bfe8a14cf10364", "0xa81a664bbc423001", "0xc24b8b70d0f89791", "0xc76c51a30654be30", "0xd192e819d6ef5218", "0xd69906245565a910", "0xf40e35855771202a", "0x106aa07032bbd1b8", "0x19a4c116b8d2d0c8", "0x1e376c085141ab53", "0x2748774cdf8eeb99", "0x34b0bcb5e19b48a8", "0x391c0cb3c5c95a63", "0x4ed8aa4ae3418acb", "0x5b9cca4f7763e373", "0x682e6ff3d6b2b8a3", "0x748f82ee5defb2fc", "0x78a5636f43172f60", "0x84c87814a1f0ab72", "0x8cc702081a6439ec", "0x90befffa23631e28", "0xa4506cebde82bde9", "0xbef9a3f7b2c67915", "0xc67178f2e372532b", "0xca273eceea26619c", "0xd186b8c721c0c207", "0xeada7dd6cde0eb1e", "0xf57d4f7fee6ed178", "0x06f067aa72176fba", "0x0a637dc5a2c898a6", "0x113f9804bef90dae", "0x1b710b35131c471b", "0x28db77f523047d84", "0x32caab7b40c72493", "0x3c9ebe0a15c9bebc", "0x431d67c49c100d4c", "0x4cc5d4becb3e42b6", "0x597f299cfc657e2a", "0x5fcb6fab3ad6faec", "0x6c44198c4a475817"].map((s) => BigInt(s))), Lw = Ih[0], Mw = Ih[1], dr = new Uint32Array(80), ur = new Uint32Array(80);
let il = class extends Ah {
  constructor(e = 64) {
    super(128, e, 16, !1), this.Ah = bt[0] | 0, this.Al = bt[1] | 0, this.Bh = bt[2] | 0, this.Bl = bt[3] | 0, this.Ch = bt[4] | 0, this.Cl = bt[5] | 0, this.Dh = bt[6] | 0, this.Dl = bt[7] | 0, this.Eh = bt[8] | 0, this.El = bt[9] | 0, this.Fh = bt[10] | 0, this.Fl = bt[11] | 0, this.Gh = bt[12] | 0, this.Gl = bt[13] | 0, this.Hh = bt[14] | 0, this.Hl = bt[15] | 0;
  }
  get() {
    const { Ah: e, Al: t, Bh: r, Bl: n, Ch: i, Cl: o, Dh: a, Dl: c, Eh: l, El: d, Fh: u, Fl: p, Gh: g, Gl: w, Hh: m, Hl: y } = this;
    return [e, t, r, n, i, o, a, c, l, d, u, p, g, w, m, y];
  }
  set(e, t, r, n, i, o, a, c, l, d, u, p, g, w, m, y) {
    this.Ah = e | 0, this.Al = t | 0, this.Bh = r | 0, this.Bl = n | 0, this.Ch = i | 0, this.Cl = o | 0, this.Dh = a | 0, this.Dl = c | 0, this.Eh = l | 0, this.El = d | 0, this.Fh = u | 0, this.Fl = p | 0, this.Gh = g | 0, this.Gl = w | 0, this.Hh = m | 0, this.Hl = y | 0;
  }
  process(e, t) {
    for (let U = 0; U < 16; U++, t += 4) dr[U] = e.getUint32(t), ur[U] = e.getUint32(t += 4);
    for (let U = 16; U < 80; U++) {
      const j = dr[U - 15] | 0, P = ur[U - 15] | 0, re = mr(j, P, 1) ^ mr(j, P, 8) ^ Wl(j, P, 7), se = wr(j, P, 1) ^ wr(j, P, 8) ^ Hl(j, P, 7), K = dr[U - 2] | 0, E = ur[U - 2] | 0, v = mr(K, E, 19) ^ gi(K, E, 61) ^ Wl(K, E, 6), b = wr(K, E, 19) ^ mi(K, E, 61) ^ Hl(K, E, 6), A = pw(se, b, ur[U - 7], ur[U - 16]), I = fw(A, re, v, dr[U - 7], dr[U - 16]);
      dr[U] = I | 0, ur[U] = A | 0;
    }
    let { Ah: r, Al: n, Bh: i, Bl: o, Ch: a, Cl: c, Dh: l, Dl: d, Eh: u, El: p, Fh: g, Fl: w, Gh: m, Gl: y, Hh: C, Hl: _ } = this;
    for (let U = 0; U < 80; U++) {
      const j = mr(u, p, 14) ^ mr(u, p, 18) ^ gi(u, p, 41), P = wr(u, p, 14) ^ wr(u, p, 18) ^ mi(u, p, 41), re = u & g ^ ~u & m, se = p & w ^ ~p & y, K = gw(_, P, se, Mw[U], ur[U]), E = mw(K, C, j, re, Lw[U], dr[U]), v = K | 0, b = mr(r, n, 28) ^ gi(r, n, 34) ^ gi(r, n, 39), A = wr(r, n, 28) ^ mi(r, n, 34) ^ mi(r, n, 39), I = r & i ^ r & a ^ i & a, x = n & o ^ n & c ^ o & c;
      C = m | 0, _ = y | 0, m = g | 0, y = w | 0, g = u | 0, w = p | 0, { h: u, l: p } = ms(l | 0, d | 0, E | 0, v | 0), l = a | 0, d = c | 0, a = i | 0, c = o | 0, i = r | 0, o = n | 0;
      const R = Qc(v, A, x);
      r = el(R, E, b, I), n = R | 0;
    }
    ({ h: r, l: n } = ms(this.Ah | 0, this.Al | 0, r | 0, n | 0)), { h: i, l: o } = ms(this.Bh | 0, this.Bl | 0, i | 0, o | 0), { h: a, l: c } = ms(this.Ch | 0, this.Cl | 0, a | 0, c | 0), { h: l, l: d } = ms(this.Dh | 0, this.Dl | 0, l | 0, d | 0), { h: u, l: p } = ms(this.Eh | 0, this.El | 0, u | 0, p | 0), { h: g, l: w } = ms(this.Fh | 0, this.Fl | 0, g | 0, w | 0), { h: m, l: y } = ms(this.Gh | 0, this.Gl | 0, m | 0, y | 0), { h: C, l: _ } = ms(this.Hh | 0, this.Hl | 0, C | 0, _ | 0), this.set(r, n, i, o, a, c, l, d, u, p, g, w, m, y, C, _);
  }
  roundClean() {
    ls(dr, ur);
  }
  destroy() {
    ls(this.buffer), this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
}, Bw = class extends il {
  constructor() {
    super(48), this.Ah = Et[0] | 0, this.Al = Et[1] | 0, this.Bh = Et[2] | 0, this.Bl = Et[3] | 0, this.Ch = Et[4] | 0, this.Cl = Et[5] | 0, this.Dh = Et[6] | 0, this.Dl = Et[7] | 0, this.Eh = Et[8] | 0, this.El = Et[9] | 0, this.Fh = Et[10] | 0, this.Fl = Et[11] | 0, this.Gh = Et[12] | 0, this.Gl = Et[13] | 0, this.Hh = Et[14] | 0, this.Hl = Et[15] | 0;
  }
};
const vt = Uint32Array.from([573645204, 4230739756, 2673172387, 3360449730, 596883563, 1867755857, 2520282905, 1497426621, 2519219938, 2827943907, 3193839141, 1401305490, 721525244, 746961066, 246885852, 2177182882]);
let Fw = class extends il {
  constructor() {
    super(32), this.Ah = vt[0] | 0, this.Al = vt[1] | 0, this.Bh = vt[2] | 0, this.Bl = vt[3] | 0, this.Ch = vt[4] | 0, this.Cl = vt[5] | 0, this.Dh = vt[6] | 0, this.Dl = vt[7] | 0, this.Eh = vt[8] | 0, this.El = vt[9] | 0, this.Fh = vt[10] | 0, this.Fl = vt[11] | 0, this.Gh = vt[12] | 0, this.Gl = vt[13] | 0, this.Hh = vt[14] | 0, this.Hl = vt[15] | 0;
  }
};
const oa = Qi(() => new $w()), jw = Qi(() => new il()), qw = Qi(() => new Bw()), Ww = Qi(() => new Fw()), Hw = Uint8Array.from([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3, 11, 8, 12, 0, 5, 2, 15, 13, 10, 14, 3, 6, 7, 1, 9, 4, 7, 9, 3, 1, 13, 12, 11, 14, 2, 6, 5, 10, 4, 0, 15, 8, 9, 0, 5, 7, 2, 4, 10, 15, 14, 1, 11, 12, 6, 8, 3, 13, 2, 12, 6, 10, 0, 11, 8, 3, 4, 13, 7, 5, 15, 14, 1, 9, 12, 5, 1, 15, 14, 13, 4, 10, 0, 7, 6, 3, 9, 2, 8, 11, 13, 11, 7, 14, 12, 1, 3, 9, 5, 0, 15, 4, 8, 6, 2, 10, 6, 15, 14, 9, 11, 3, 0, 8, 12, 2, 13, 7, 1, 4, 10, 5, 10, 2, 8, 4, 7, 6, 1, 5, 15, 11, 9, 14, 3, 12, 13, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3, 11, 8, 12, 0, 5, 2, 15, 13, 10, 14, 3, 6, 7, 1, 9, 4, 7, 9, 3, 1, 13, 12, 11, 14, 2, 6, 5, 10, 4, 0, 15, 8, 9, 0, 5, 7, 2, 4, 10, 15, 14, 1, 11, 12, 6, 8, 3, 13, 2, 12, 6, 10, 0, 11, 8, 3, 4, 13, 7, 5, 15, 14, 1, 9]), st = Uint32Array.from([4089235720, 1779033703, 2227873595, 3144134277, 4271175723, 1013904242, 1595750129, 2773480762, 2917565137, 1359893119, 725511199, 2600822924, 4215389547, 528734635, 327033209, 1541459225]), H = new Uint32Array(32);
function hr(s, e, t, r, n, i) {
  const o = n[i], a = n[i + 1];
  let c = H[2 * s], l = H[2 * s + 1], d = H[2 * e], u = H[2 * e + 1], p = H[2 * t], g = H[2 * t + 1], w = H[2 * r], m = H[2 * r + 1], y = Qc(c, d, o);
  l = el(y, l, u, a), c = y | 0, { Dh: m, Dl: w } = { Dh: m ^ l, Dl: w ^ c }, { Dh: m, Dl: w } = { Dh: aw(m, w), Dl: cw(m) }, { h: g, l: p } = ms(g, p, m, w), { Bh: u, Bl: d } = { Bh: u ^ g, Bl: d ^ p }, { Bh: u, Bl: d } = { Bh: mr(u, d, 24), Bl: wr(u, d, 24) }, H[2 * s] = c, H[2 * s + 1] = l, H[2 * e] = d, H[2 * e + 1] = u, H[2 * t] = p, H[2 * t + 1] = g, H[2 * r] = w, H[2 * r + 1] = m;
}
function pr(s, e, t, r, n, i) {
  const o = n[i], a = n[i + 1];
  let c = H[2 * s], l = H[2 * s + 1], d = H[2 * e], u = H[2 * e + 1], p = H[2 * t], g = H[2 * t + 1], w = H[2 * r], m = H[2 * r + 1], y = Qc(c, d, o);
  l = el(y, l, u, a), c = y | 0, { Dh: m, Dl: w } = { Dh: m ^ l, Dl: w ^ c }, { Dh: m, Dl: w } = { Dh: mr(m, w, 16), Dl: wr(m, w, 16) }, { h: g, l: p } = ms(g, p, m, w), { Bh: u, Bl: d } = { Bh: u ^ g, Bl: d ^ p }, { Bh: u, Bl: d } = { Bh: gi(u, d, 63), Bl: mi(u, d, 63) }, H[2 * s] = c, H[2 * s + 1] = l, H[2 * e] = d, H[2 * e + 1] = u, H[2 * t] = p, H[2 * t + 1] = g, H[2 * r] = w, H[2 * r + 1] = m;
}
function zw(s, e = {}, t, r, n) {
  if (er(t), s < 0 || s > t) throw new Error("outputLen bigger than keyLen");
  const { key: i, salt: o, personalization: a } = e;
  if (i !== void 0 && (i.length < 1 || i.length > t)) throw new Error("key length must be undefined or 1.." + t);
  if (o !== void 0 && o.length !== r) throw new Error("salt must be undefined or " + r);
  if (a !== void 0 && a.length !== n) throw new Error("personalization must be undefined or " + n);
}
class Vw extends ia {
  constructor(e, t) {
    super(), this.finished = !1, this.destroyed = !1, this.length = 0, this.pos = 0, er(e), er(t), this.blockLen = e, this.outputLen = t, this.buffer = new Uint8Array(e), this.buffer32 = ki(this.buffer);
  }
  update(e) {
    Nr(this), e = vs(e), cs(e);
    const { blockLen: t, buffer: r, buffer32: n } = this, i = e.length, o = e.byteOffset, a = e.buffer;
    for (let c = 0; c < i; ) {
      this.pos === t && (yr(n), this.compress(n, 0, !1), yr(n), this.pos = 0);
      const l = Math.min(t - this.pos, i - c), d = o + c;
      if (l === t && !(d % 4) && c + l < i) {
        const u = new Uint32Array(a, d, Math.floor((i - c) / 4));
        yr(u);
        for (let p = 0; c + t < i; p += n.length, c += t) this.length += t, this.compress(u, p, !1);
        yr(u);
        continue;
      }
      r.set(e.subarray(c, c + l), this.pos), this.pos += l, this.length += l, c += l;
    }
    return this;
  }
  digestInto(e) {
    Nr(this), rl(e, this);
    const { pos: t, buffer32: r } = this;
    this.finished = !0, ls(this.buffer.subarray(t)), yr(r), this.compress(r, 0, !0), yr(r);
    const n = ki(e);
    this.get().forEach((i, o) => n[o] = Ks(i));
  }
  digest() {
    const { buffer: e, outputLen: t } = this;
    this.digestInto(e);
    const r = e.slice(0, t);
    return this.destroy(), r;
  }
  _cloneInto(e) {
    const { buffer: t, length: r, finished: n, destroyed: i, outputLen: o, pos: a } = this;
    return e || (e = new this.constructor({ dkLen: o })), e.set(...this.get()), e.buffer.set(t), e.destroyed = i, e.finished = n, e.length = r, e.pos = a, e.outputLen = o, e;
  }
  clone() {
    return this._cloneInto();
  }
}
class Kw extends Vw {
  constructor(e = {}) {
    const t = e.dkLen === void 0 ? 64 : e.dkLen;
    super(128, t), this.v0l = st[0] | 0, this.v0h = st[1] | 0, this.v1l = st[2] | 0, this.v1h = st[3] | 0, this.v2l = st[4] | 0, this.v2h = st[5] | 0, this.v3l = st[6] | 0, this.v3h = st[7] | 0, this.v4l = st[8] | 0, this.v4h = st[9] | 0, this.v5l = st[10] | 0, this.v5h = st[11] | 0, this.v6l = st[12] | 0, this.v6h = st[13] | 0, this.v7l = st[14] | 0, this.v7h = st[15] | 0, zw(t, e, 64, 16, 16);
    let { key: r, personalization: n, salt: i } = e, o = 0;
    if (r !== void 0 && (r = vs(r), o = r.length), this.v0l ^= this.outputLen | o << 8 | 65536 | 1 << 24, i !== void 0) {
      i = vs(i);
      const a = ki(i);
      this.v4l ^= Ks(a[0]), this.v4h ^= Ks(a[1]), this.v5l ^= Ks(a[2]), this.v5h ^= Ks(a[3]);
    }
    if (n !== void 0) {
      n = vs(n);
      const a = ki(n);
      this.v6l ^= Ks(a[0]), this.v6h ^= Ks(a[1]), this.v7l ^= Ks(a[2]), this.v7h ^= Ks(a[3]);
    }
    if (r !== void 0) {
      const a = new Uint8Array(this.blockLen);
      a.set(r), this.update(a);
    }
  }
  get() {
    let { v0l: e, v0h: t, v1l: r, v1h: n, v2l: i, v2h: o, v3l: a, v3h: c, v4l: l, v4h: d, v5l: u, v5h: p, v6l: g, v6h: w, v7l: m, v7h: y } = this;
    return [e, t, r, n, i, o, a, c, l, d, u, p, g, w, m, y];
  }
  set(e, t, r, n, i, o, a, c, l, d, u, p, g, w, m, y) {
    this.v0l = e | 0, this.v0h = t | 0, this.v1l = r | 0, this.v1h = n | 0, this.v2l = i | 0, this.v2h = o | 0, this.v3l = a | 0, this.v3h = c | 0, this.v4l = l | 0, this.v4h = d | 0, this.v5l = u | 0, this.v5h = p | 0, this.v6l = g | 0, this.v6h = w | 0, this.v7l = m | 0, this.v7h = y | 0;
  }
  compress(e, t, r) {
    this.get().forEach((c, l) => H[l] = c), H.set(st, 16);
    let { h: n, l: i } = fh(BigInt(this.length));
    H[24] = st[8] ^ i, H[25] = st[9] ^ n, r && (H[28] = ~H[28], H[29] = ~H[29]);
    let o = 0;
    const a = Hw;
    for (let c = 0; c < 12; c++) hr(0, 4, 8, 12, e, t + 2 * a[o++]), pr(0, 4, 8, 12, e, t + 2 * a[o++]), hr(1, 5, 9, 13, e, t + 2 * a[o++]), pr(1, 5, 9, 13, e, t + 2 * a[o++]), hr(2, 6, 10, 14, e, t + 2 * a[o++]), pr(2, 6, 10, 14, e, t + 2 * a[o++]), hr(3, 7, 11, 15, e, t + 2 * a[o++]), pr(3, 7, 11, 15, e, t + 2 * a[o++]), hr(0, 5, 10, 15, e, t + 2 * a[o++]), pr(0, 5, 10, 15, e, t + 2 * a[o++]), hr(1, 6, 11, 12, e, t + 2 * a[o++]), pr(1, 6, 11, 12, e, t + 2 * a[o++]), hr(2, 7, 8, 13, e, t + 2 * a[o++]), pr(2, 7, 8, 13, e, t + 2 * a[o++]), hr(3, 4, 9, 14, e, t + 2 * a[o++]), pr(3, 4, 9, 14, e, t + 2 * a[o++]);
    this.v0l ^= H[0] ^ H[16], this.v0h ^= H[1] ^ H[17], this.v1l ^= H[2] ^ H[18], this.v1h ^= H[3] ^ H[19], this.v2l ^= H[4] ^ H[20], this.v2h ^= H[5] ^ H[21], this.v3l ^= H[6] ^ H[22], this.v3h ^= H[7] ^ H[23], this.v4l ^= H[8] ^ H[24], this.v4h ^= H[9] ^ H[25], this.v5l ^= H[10] ^ H[26], this.v5h ^= H[11] ^ H[27], this.v6l ^= H[12] ^ H[28], this.v6h ^= H[13] ^ H[29], this.v7l ^= H[14] ^ H[30], this.v7h ^= H[15] ^ H[31], ls(H);
  }
  destroy() {
    this.destroyed = !0, ls(this.buffer32), this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
}
const Gw = bw((s) => new Kw(s)), Yw = "https://rpc.walletconnect.org/v1";
function Sh(s) {
  const e = `Ethereum Signed Message:
${s.length}`, t = new TextEncoder().encode(e + s);
  return "0x" + Buffer.from(Ow(t)).toString("hex");
}
async function Zw(s, e, t, r, n, i) {
  switch (t.t) {
    case "eip191":
      return await Jw(s, e, t.s);
    case "eip1271":
      return await Xw(s, e, t.s, r, n, i);
    default:
      throw new Error(`verifySignature failed: Attempted to verify CacaoSignature with unknown type: ${t.t}`);
  }
}
async function Jw(s, e, t) {
  return (await lf({ hash: Sh(e), signature: t })).toLowerCase() === s.toLowerCase();
}
async function Xw(s, e, t, r, n, i) {
  const o = On(r);
  if (!o.namespace || !o.reference) throw new Error(`isValidEip1271Signature failed: chainId must be in CAIP-2 format, received: ${r}`);
  try {
    const a = "0x1626ba7e", c = "0000000000000000000000000000000000000000000000000000000000000040", l = t.substring(2), d = (l.length / 2).toString(16).padStart(64, "0"), u = (e.startsWith("0x") ? e : Sh(e)).substring(2), p = a + u + c + d + l, g = await fetch(`${i || Yw}/?chainId=${r}&projectId=${n}`, { headers: { "Content-Type": "application/json" }, method: "POST", body: JSON.stringify({ id: Qw(), jsonrpc: "2.0", method: "eth_call", params: [{ to: s, data: p }, "latest"] }) }), { result: w } = await g.json();
    return w ? w.slice(0, a.length).toLowerCase() === a.toLowerCase() : !1;
  } catch (a) {
    return console.error("isValidEip1271Signature: ", a), !1;
  }
}
function Qw() {
  return Date.now() + Math.floor(Math.random() * 1e3);
}
function ey(s) {
  const e = atob(s), t = new Uint8Array(e.length);
  for (let o = 0; o < e.length; o++) t[o] = e.charCodeAt(o);
  const r = t[0];
  if (r === 0) throw new Error("No signatures found");
  const n = 1 + r * 64;
  if (t.length < n) throw new Error("Transaction data too short for claimed signature count");
  if (t.length < 100) throw new Error("Transaction too short");
  const i = Buffer.from(s, "base64").slice(1, 65);
  return Wn.encode(i);
}
function ty(s) {
  const e = new Uint8Array(Buffer.from(s, "base64")), t = Array.from("TransactionData::").map((i) => i.charCodeAt(0)), r = new Uint8Array(t.length + e.length);
  r.set(t), r.set(e, t.length);
  const n = Gw(r, { dkLen: 32 });
  return Wn.encode(n);
}
function Gl(s) {
  const e = new Uint8Array(oa(sy(s)));
  return Wn.encode(e);
}
function sy(s) {
  if (s instanceof Uint8Array) return s;
  if (Array.isArray(s)) return new Uint8Array(s);
  if (typeof s == "object" && s != null && s.data) return new Uint8Array(Object.values(s.data));
  if (typeof s == "object" && s) return new Uint8Array(Object.values(s));
  throw new Error("getNearUint8ArrayFromBytes: Unexpected result type from bytes array");
}
function Yl(s) {
  const e = Buffer.from(s, "base64"), t = Cm(e).txn;
  if (!t) throw new Error("Invalid signed transaction: missing 'txn' field");
  const r = fm(t), n = Buffer.from("TX"), i = Buffer.concat([n, Buffer.from(r)]), o = Ww(i);
  return Ef.encode(o).replace(/=+$/, "");
}
function Na(s) {
  const e = [];
  let t = BigInt(s);
  for (; t >= BigInt(128); ) e.push(Number(t & BigInt(127) | BigInt(128))), t >>= BigInt(7);
  return e.push(Number(t)), Buffer.from(e);
}
function ry(s) {
  const e = Buffer.from(s.signed.bodyBytes, "base64"), t = Buffer.from(s.signed.authInfoBytes, "base64"), r = Buffer.from(s.signature.signature, "base64"), n = [];
  n.push(Buffer.from([10])), n.push(Na(e.length)), n.push(e), n.push(Buffer.from([18])), n.push(Na(t.length)), n.push(t), n.push(Buffer.from([26])), n.push(Na(r.length)), n.push(r);
  const i = Buffer.concat(n), o = oa(i);
  return Buffer.from(o).toString("hex").toUpperCase();
}
var ny = Object.defineProperty, iy = Object.defineProperties, oy = Object.getOwnPropertyDescriptors, Zl = Object.getOwnPropertySymbols, ay = Object.prototype.hasOwnProperty, cy = Object.prototype.propertyIsEnumerable, Jl = (s, e, t) => e in s ? ny(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t, ly = (s, e) => {
  for (var t in e || (e = {})) ay.call(e, t) && Jl(s, t, e[t]);
  if (Zl) for (var t of Zl(e)) cy.call(e, t) && Jl(s, t, e[t]);
  return s;
}, dy = (s, e) => iy(s, oy(e));
const uy = "did:pkh:", ol = (s) => s == null ? void 0 : s.split(":"), hy = (s) => {
  const e = s && ol(s);
  if (e) return s.includes(uy) ? e[3] : e[1];
}, ac = (s) => {
  const e = s && ol(s);
  if (e) return e[2] + ":" + e[3];
}, qo = (s) => {
  const e = s && ol(s);
  if (e) return e.pop();
};
async function Xl(s) {
  const { cacao: e, projectId: t } = s, { s: r, p: n } = e, i = Nh(n, n.iss), o = qo(n.iss);
  return await Zw(o, i, r, ac(n.iss), t);
}
const Nh = (s, e) => {
  const t = `${s.domain} wants you to sign in with your Ethereum account:`, r = qo(e);
  if (!s.aud && !s.uri) throw new Error("Either `aud` or `uri` is required to construct the message");
  let n = s.statement || void 0;
  const i = `URI: ${s.aud || s.uri}`, o = `Version: ${s.version}`, a = `Chain ID: ${hy(e)}`, c = `Nonce: ${s.nonce}`, l = `Issued At: ${s.iat}`, d = s.exp ? `Expiration Time: ${s.exp}` : void 0, u = s.nbf ? `Not Before: ${s.nbf}` : void 0, p = s.requestId ? `Request ID: ${s.requestId}` : void 0, g = s.resources ? `Resources:${s.resources.map((m) => `
- ${m}`).join("")}` : void 0, w = So(s.resources);
  if (w) {
    const m = Di(w);
    n = vy(n, m);
  }
  return [t, r, "", n, "", i, o, a, c, l, d, u, p, g].filter((m) => m != null).join(`
`);
};
function py(s) {
  return Buffer.from(JSON.stringify(s)).toString("base64");
}
function fy(s) {
  return JSON.parse(Buffer.from(s, "base64").toString("utf-8"));
}
function Gr(s) {
  if (!s) throw new Error("No recap provided, value is undefined");
  if (!s.att) throw new Error("No `att` property found");
  const e = Object.keys(s.att);
  if (!(e != null && e.length)) throw new Error("No resources found in `att` property");
  e.forEach((t) => {
    const r = s.att[t];
    if (Array.isArray(r)) throw new Error(`Resource must be an object: ${t}`);
    if (typeof r != "object") throw new Error(`Resource must be an object: ${t}`);
    if (!Object.keys(r).length) throw new Error(`Resource object is empty: ${t}`);
    Object.keys(r).forEach((n) => {
      const i = r[n];
      if (!Array.isArray(i)) throw new Error(`Ability limits ${n} must be an array of objects, found: ${i}`);
      if (!i.length) throw new Error(`Value of ${n} is empty array, must be an array with objects`);
      i.forEach((o) => {
        if (typeof o != "object") throw new Error(`Ability limits (${n}) must be an array of objects, found: ${o}`);
      });
    });
  });
}
function gy(s, e, t, r = {}) {
  return t == null || t.sort((n, i) => n.localeCompare(i)), { att: { [s]: my(e, t, r) } };
}
function my(s, e, t = {}) {
  e = e == null ? void 0 : e.sort((n, i) => n.localeCompare(i));
  const r = e.map((n) => ({ [`${s}/${n}`]: [t] }));
  return Object.assign({}, ...r);
}
function Th(s) {
  return Gr(s), `urn:recap:${py(s).replace(/=/g, "")}`;
}
function Di(s) {
  const e = fy(s.replace("urn:recap:", ""));
  return Gr(e), e;
}
function wy(s, e, t) {
  const r = gy(s, e, t);
  return Th(r);
}
function yy(s) {
  return s && s.includes("urn:recap:");
}
function Ey(s, e) {
  const t = Di(s), r = Di(e), n = by(t, r);
  return Th(n);
}
function by(s, e) {
  Gr(s), Gr(e);
  const t = Object.keys(s.att).concat(Object.keys(e.att)).sort((n, i) => n.localeCompare(i)), r = { att: {} };
  return t.forEach((n) => {
    var i, o;
    Object.keys(((i = s.att) == null ? void 0 : i[n]) || {}).concat(Object.keys(((o = e.att) == null ? void 0 : o[n]) || {})).sort((a, c) => a.localeCompare(c)).forEach((a) => {
      var c, l;
      r.att[n] = dy(ly({}, r.att[n]), { [a]: ((c = s.att[n]) == null ? void 0 : c[a]) || ((l = e.att[n]) == null ? void 0 : l[a]) });
    });
  }), r;
}
function vy(s = "", e) {
  Gr(e);
  const t = "I further authorize the stated URI to perform the following actions on my behalf: ";
  if (s.includes(t)) return s;
  const r = [];
  let n = 0;
  Object.keys(e.att).forEach((a) => {
    const c = Object.keys(e.att[a]).map((u) => ({ ability: u.split("/")[0], action: u.split("/")[1] }));
    c.sort((u, p) => u.action.localeCompare(p.action));
    const l = {};
    c.forEach((u) => {
      l[u.ability] || (l[u.ability] = []), l[u.ability].push(u.action);
    });
    const d = Object.keys(l).map((u) => (n++, `(${n}) '${u}': '${l[u].join("', '")}' for '${a}'.`));
    r.push(d.join(", ").replace(".,", "."));
  });
  const i = r.join(" "), o = `${t}${i}`;
  return `${s ? s + " " : ""}${o}`;
}
function Ql(s) {
  var e;
  const t = Di(s);
  Gr(t);
  const r = (e = t.att) == null ? void 0 : e.eip155;
  return r ? Object.keys(r).map((n) => n.split("/")[1]) : [];
}
function ed(s) {
  const e = Di(s);
  Gr(e);
  const t = [];
  return Object.values(e.att).forEach((r) => {
    Object.values(r).forEach((n) => {
      var i;
      (i = n == null ? void 0 : n[0]) != null && i.chains && t.push(n[0].chains);
    });
  }), [...new Set(t.flat())];
}
function So(s) {
  if (!s) return;
  const e = s == null ? void 0 : s[s.length - 1];
  return yy(e) ? e : void 0;
}
/*! noble-ciphers - MIT License (c) 2023 Paul Miller (paulmillr.com) */
function Rh(s) {
  return s instanceof Uint8Array || ArrayBuffer.isView(s) && s.constructor.name === "Uint8Array";
}
function cc(s) {
  if (typeof s != "boolean") throw new Error(`boolean expected, not ${s}`);
}
function Ta(s) {
  if (!Number.isSafeInteger(s) || s < 0) throw new Error("positive integer expected, got " + s);
}
function Ft(s, ...e) {
  if (!Rh(s)) throw new Error("Uint8Array expected");
  if (e.length > 0 && !e.includes(s.length)) throw new Error("Uint8Array expected of length " + e + ", got length=" + s.length);
}
function td(s, e = !0) {
  if (s.destroyed) throw new Error("Hash instance has been destroyed");
  if (e && s.finished) throw new Error("Hash#digest() has already been called");
}
function Cy(s, e) {
  Ft(s);
  const t = e.outputLen;
  if (s.length < t) throw new Error("digestInto() expects output buffer of length at least " + t);
}
function Cr(s) {
  return new Uint32Array(s.buffer, s.byteOffset, Math.floor(s.byteLength / 4));
}
function Mn(...s) {
  for (let e = 0; e < s.length; e++) s[e].fill(0);
}
function _y(s) {
  return new DataView(s.buffer, s.byteOffset, s.byteLength);
}
const Ay = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
function Iy(s) {
  if (typeof s != "string") throw new Error("string expected");
  return new Uint8Array(new TextEncoder().encode(s));
}
function lc(s) {
  if (typeof s == "string") s = Iy(s);
  else if (Rh(s)) s = dc(s);
  else throw new Error("Uint8Array expected, got " + typeof s);
  return s;
}
function Sy(s, e) {
  if (e == null || typeof e != "object") throw new Error("options must be defined");
  return Object.assign(s, e);
}
function Ny(s, e) {
  if (s.length !== e.length) return !1;
  let t = 0;
  for (let r = 0; r < s.length; r++) t |= s[r] ^ e[r];
  return t === 0;
}
const Ty = (s, e) => {
  function t(r, ...n) {
    if (Ft(r), !Ay) throw new Error("Non little-endian hardware is not yet supported");
    if (s.nonceLength !== void 0) {
      const l = n[0];
      if (!l) throw new Error("nonce / iv required");
      s.varSizeNonce ? Ft(l) : Ft(l, s.nonceLength);
    }
    const i = s.tagLength;
    i && n[1] !== void 0 && Ft(n[1]);
    const o = e(r, ...n), a = (l, d) => {
      if (d !== void 0) {
        if (l !== 2) throw new Error("cipher output not supported");
        Ft(d);
      }
    };
    let c = !1;
    return { encrypt(l, d) {
      if (c) throw new Error("cannot encrypt() twice with same key + nonce");
      return c = !0, Ft(l), a(o.encrypt.length, d), o.encrypt(l, d);
    }, decrypt(l, d) {
      if (Ft(l), i && l.length < i) throw new Error("invalid ciphertext length: smaller than tagLength=" + i);
      return a(o.decrypt.length, d), o.decrypt(l, d);
    } };
  }
  return Object.assign(t, s), t;
};
function sd(s, e, t = !0) {
  if (e === void 0) return new Uint8Array(s);
  if (e.length !== s) throw new Error("invalid output length, expected " + s + ", got: " + e.length);
  if (t && !Py(e)) throw new Error("invalid output, must be aligned");
  return e;
}
function rd(s, e, t, r) {
  if (typeof s.setBigUint64 == "function") return s.setBigUint64(e, t, r);
  const n = BigInt(32), i = BigInt(4294967295), o = Number(t >> n & i), a = Number(t & i);
  s.setUint32(e + 4, o, r), s.setUint32(e + 0, a, r);
}
function Ry(s, e, t) {
  cc(t);
  const r = new Uint8Array(16), n = _y(r);
  return rd(n, 0, BigInt(e), t), rd(n, 8, BigInt(s), t), r;
}
function Py(s) {
  return s.byteOffset % 4 === 0;
}
function dc(s) {
  return Uint8Array.from(s);
}
const Ph = (s) => Uint8Array.from(s.split("").map((e) => e.charCodeAt(0))), Oy = Ph("expand 16-byte k"), xy = Ph("expand 32-byte k"), ky = Cr(Oy), Uy = Cr(xy);
function Se(s, e) {
  return s << e | s >>> 32 - e;
}
function uc(s) {
  return s.byteOffset % 4 === 0;
}
const po = 64, Dy = 16, Oh = 2 ** 32 - 1, nd = new Uint32Array();
function $y(s, e, t, r, n, i, o, a) {
  const c = n.length, l = new Uint8Array(po), d = Cr(l), u = uc(n) && uc(i), p = u ? Cr(n) : nd, g = u ? Cr(i) : nd;
  for (let w = 0; w < c; o++) {
    if (s(e, t, r, d, o, a), o >= Oh) throw new Error("arx: counter overflow");
    const m = Math.min(po, c - w);
    if (u && m === po) {
      const y = w / 4;
      if (w % 4 !== 0) throw new Error("arx: invalid block position");
      for (let C = 0, _; C < Dy; C++) _ = y + C, g[_] = p[_] ^ d[C];
      w += po;
      continue;
    }
    for (let y = 0, C; y < m; y++) C = w + y, i[C] = n[C] ^ l[y];
    w += m;
  }
}
function Ly(s, e) {
  const { allowShortKeys: t, extendNonceFn: r, counterLength: n, counterRight: i, rounds: o } = Sy({ allowShortKeys: !1, counterLength: 8, counterRight: !1, rounds: 20 }, e);
  if (typeof s != "function") throw new Error("core must be a function");
  return Ta(n), Ta(o), cc(i), cc(t), (a, c, l, d, u = 0) => {
    Ft(a), Ft(c), Ft(l);
    const p = l.length;
    if (d === void 0 && (d = new Uint8Array(p)), Ft(d), Ta(u), u < 0 || u >= Oh) throw new Error("arx: counter overflow");
    if (d.length < p) throw new Error(`arx: output (${d.length}) is shorter than data (${p})`);
    const g = [];
    let w = a.length, m, y;
    if (w === 32) g.push(m = dc(a)), y = Uy;
    else if (w === 16 && t) m = new Uint8Array(32), m.set(a), m.set(a, 16), y = ky, g.push(m);
    else throw new Error(`arx: invalid 32-byte key, got length=${w}`);
    uc(c) || g.push(c = dc(c));
    const C = Cr(m);
    if (r) {
      if (c.length !== 24) throw new Error("arx: extended nonce must be 24 bytes");
      r(y, C, Cr(c.subarray(0, 16)), C), c = c.subarray(16);
    }
    const _ = 16 - n;
    if (_ !== c.length) throw new Error(`arx: nonce must be ${_} or 16 bytes`);
    if (_ !== 12) {
      const j = new Uint8Array(12);
      j.set(c, i ? 0 : 12 - c.length), c = j, g.push(c);
    }
    const U = Cr(c);
    return $y(s, y, C, U, l, d, u, o), Mn(...g), d;
  };
}
const dt = (s, e) => s[e++] & 255 | (s[e++] & 255) << 8;
class My {
  constructor(e) {
    this.blockLen = 16, this.outputLen = 16, this.buffer = new Uint8Array(16), this.r = new Uint16Array(10), this.h = new Uint16Array(10), this.pad = new Uint16Array(8), this.pos = 0, this.finished = !1, e = lc(e), Ft(e, 32);
    const t = dt(e, 0), r = dt(e, 2), n = dt(e, 4), i = dt(e, 6), o = dt(e, 8), a = dt(e, 10), c = dt(e, 12), l = dt(e, 14);
    this.r[0] = t & 8191, this.r[1] = (t >>> 13 | r << 3) & 8191, this.r[2] = (r >>> 10 | n << 6) & 7939, this.r[3] = (n >>> 7 | i << 9) & 8191, this.r[4] = (i >>> 4 | o << 12) & 255, this.r[5] = o >>> 1 & 8190, this.r[6] = (o >>> 14 | a << 2) & 8191, this.r[7] = (a >>> 11 | c << 5) & 8065, this.r[8] = (c >>> 8 | l << 8) & 8191, this.r[9] = l >>> 5 & 127;
    for (let d = 0; d < 8; d++) this.pad[d] = dt(e, 16 + 2 * d);
  }
  process(e, t, r = !1) {
    const n = r ? 0 : 2048, { h: i, r: o } = this, a = o[0], c = o[1], l = o[2], d = o[3], u = o[4], p = o[5], g = o[6], w = o[7], m = o[8], y = o[9], C = dt(e, t + 0), _ = dt(e, t + 2), U = dt(e, t + 4), j = dt(e, t + 6), P = dt(e, t + 8), re = dt(e, t + 10), se = dt(e, t + 12), K = dt(e, t + 14);
    let E = i[0] + (C & 8191), v = i[1] + ((C >>> 13 | _ << 3) & 8191), b = i[2] + ((_ >>> 10 | U << 6) & 8191), A = i[3] + ((U >>> 7 | j << 9) & 8191), I = i[4] + ((j >>> 4 | P << 12) & 8191), x = i[5] + (P >>> 1 & 8191), R = i[6] + ((P >>> 14 | re << 2) & 8191), O = i[7] + ((re >>> 11 | se << 5) & 8191), L = i[8] + ((se >>> 8 | K << 8) & 8191), z = i[9] + (K >>> 5 | n), k = 0, Q = k + E * a + v * (5 * y) + b * (5 * m) + A * (5 * w) + I * (5 * g);
    k = Q >>> 13, Q &= 8191, Q += x * (5 * p) + R * (5 * u) + O * (5 * d) + L * (5 * l) + z * (5 * c), k += Q >>> 13, Q &= 8191;
    let Z = k + E * c + v * a + b * (5 * y) + A * (5 * m) + I * (5 * w);
    k = Z >>> 13, Z &= 8191, Z += x * (5 * g) + R * (5 * p) + O * (5 * u) + L * (5 * d) + z * (5 * l), k += Z >>> 13, Z &= 8191;
    let ce = k + E * l + v * c + b * a + A * (5 * y) + I * (5 * m);
    k = ce >>> 13, ce &= 8191, ce += x * (5 * w) + R * (5 * g) + O * (5 * p) + L * (5 * u) + z * (5 * d), k += ce >>> 13, ce &= 8191;
    let Ee = k + E * d + v * l + b * c + A * a + I * (5 * y);
    k = Ee >>> 13, Ee &= 8191, Ee += x * (5 * m) + R * (5 * w) + O * (5 * g) + L * (5 * p) + z * (5 * u), k += Ee >>> 13, Ee &= 8191;
    let ye = k + E * u + v * d + b * l + A * c + I * a;
    k = ye >>> 13, ye &= 8191, ye += x * (5 * y) + R * (5 * m) + O * (5 * w) + L * (5 * g) + z * (5 * p), k += ye >>> 13, ye &= 8191;
    let be = k + E * p + v * u + b * d + A * l + I * c;
    k = be >>> 13, be &= 8191, be += x * a + R * (5 * y) + O * (5 * m) + L * (5 * w) + z * (5 * g), k += be >>> 13, be &= 8191;
    let Fe = k + E * g + v * p + b * u + A * d + I * l;
    k = Fe >>> 13, Fe &= 8191, Fe += x * c + R * a + O * (5 * y) + L * (5 * m) + z * (5 * w), k += Fe >>> 13, Fe &= 8191;
    let Xe = k + E * w + v * g + b * p + A * u + I * d;
    k = Xe >>> 13, Xe &= 8191, Xe += x * l + R * c + O * a + L * (5 * y) + z * (5 * m), k += Xe >>> 13, Xe &= 8191;
    let Je = k + E * m + v * w + b * g + A * p + I * u;
    k = Je >>> 13, Je &= 8191, Je += x * d + R * l + O * c + L * a + z * (5 * y), k += Je >>> 13, Je &= 8191;
    let Ge = k + E * y + v * m + b * w + A * g + I * p;
    k = Ge >>> 13, Ge &= 8191, Ge += x * u + R * d + O * l + L * c + z * a, k += Ge >>> 13, Ge &= 8191, k = (k << 2) + k | 0, k = k + Q | 0, Q = k & 8191, k = k >>> 13, Z += k, i[0] = Q, i[1] = Z, i[2] = ce, i[3] = Ee, i[4] = ye, i[5] = be, i[6] = Fe, i[7] = Xe, i[8] = Je, i[9] = Ge;
  }
  finalize() {
    const { h: e, pad: t } = this, r = new Uint16Array(10);
    let n = e[1] >>> 13;
    e[1] &= 8191;
    for (let a = 2; a < 10; a++) e[a] += n, n = e[a] >>> 13, e[a] &= 8191;
    e[0] += n * 5, n = e[0] >>> 13, e[0] &= 8191, e[1] += n, n = e[1] >>> 13, e[1] &= 8191, e[2] += n, r[0] = e[0] + 5, n = r[0] >>> 13, r[0] &= 8191;
    for (let a = 1; a < 10; a++) r[a] = e[a] + n, n = r[a] >>> 13, r[a] &= 8191;
    r[9] -= 8192;
    let i = (n ^ 1) - 1;
    for (let a = 0; a < 10; a++) r[a] &= i;
    i = ~i;
    for (let a = 0; a < 10; a++) e[a] = e[a] & i | r[a];
    e[0] = (e[0] | e[1] << 13) & 65535, e[1] = (e[1] >>> 3 | e[2] << 10) & 65535, e[2] = (e[2] >>> 6 | e[3] << 7) & 65535, e[3] = (e[3] >>> 9 | e[4] << 4) & 65535, e[4] = (e[4] >>> 12 | e[5] << 1 | e[6] << 14) & 65535, e[5] = (e[6] >>> 2 | e[7] << 11) & 65535, e[6] = (e[7] >>> 5 | e[8] << 8) & 65535, e[7] = (e[8] >>> 8 | e[9] << 5) & 65535;
    let o = e[0] + t[0];
    e[0] = o & 65535;
    for (let a = 1; a < 8; a++) o = (e[a] + t[a] | 0) + (o >>> 16) | 0, e[a] = o & 65535;
    Mn(r);
  }
  update(e) {
    td(this), e = lc(e), Ft(e);
    const { buffer: t, blockLen: r } = this, n = e.length;
    for (let i = 0; i < n; ) {
      const o = Math.min(r - this.pos, n - i);
      if (o === r) {
        for (; r <= n - i; i += r) this.process(e, i);
        continue;
      }
      t.set(e.subarray(i, i + o), this.pos), this.pos += o, i += o, this.pos === r && (this.process(t, 0, !1), this.pos = 0);
    }
    return this;
  }
  destroy() {
    Mn(this.h, this.r, this.buffer, this.pad);
  }
  digestInto(e) {
    td(this), Cy(e, this), this.finished = !0;
    const { buffer: t, h: r } = this;
    let { pos: n } = this;
    if (n) {
      for (t[n++] = 1; n < 16; n++) t[n] = 0;
      this.process(t, 0, !0);
    }
    this.finalize();
    let i = 0;
    for (let o = 0; o < 8; o++) e[i++] = r[o] >>> 0, e[i++] = r[o] >>> 8;
    return e;
  }
  digest() {
    const { buffer: e, outputLen: t } = this;
    this.digestInto(e);
    const r = e.slice(0, t);
    return this.destroy(), r;
  }
}
function By(s) {
  const e = (r, n) => s(n).update(lc(r)).digest(), t = s(new Uint8Array(32));
  return e.outputLen = t.outputLen, e.blockLen = t.blockLen, e.create = (r) => s(r), e;
}
const Fy = By((s) => new My(s));
function jy(s, e, t, r, n, i = 20) {
  let o = s[0], a = s[1], c = s[2], l = s[3], d = e[0], u = e[1], p = e[2], g = e[3], w = e[4], m = e[5], y = e[6], C = e[7], _ = n, U = t[0], j = t[1], P = t[2], re = o, se = a, K = c, E = l, v = d, b = u, A = p, I = g, x = w, R = m, O = y, L = C, z = _, k = U, Q = j, Z = P;
  for (let Ee = 0; Ee < i; Ee += 2) re = re + v | 0, z = Se(z ^ re, 16), x = x + z | 0, v = Se(v ^ x, 12), re = re + v | 0, z = Se(z ^ re, 8), x = x + z | 0, v = Se(v ^ x, 7), se = se + b | 0, k = Se(k ^ se, 16), R = R + k | 0, b = Se(b ^ R, 12), se = se + b | 0, k = Se(k ^ se, 8), R = R + k | 0, b = Se(b ^ R, 7), K = K + A | 0, Q = Se(Q ^ K, 16), O = O + Q | 0, A = Se(A ^ O, 12), K = K + A | 0, Q = Se(Q ^ K, 8), O = O + Q | 0, A = Se(A ^ O, 7), E = E + I | 0, Z = Se(Z ^ E, 16), L = L + Z | 0, I = Se(I ^ L, 12), E = E + I | 0, Z = Se(Z ^ E, 8), L = L + Z | 0, I = Se(I ^ L, 7), re = re + b | 0, Z = Se(Z ^ re, 16), O = O + Z | 0, b = Se(b ^ O, 12), re = re + b | 0, Z = Se(Z ^ re, 8), O = O + Z | 0, b = Se(b ^ O, 7), se = se + A | 0, z = Se(z ^ se, 16), L = L + z | 0, A = Se(A ^ L, 12), se = se + A | 0, z = Se(z ^ se, 8), L = L + z | 0, A = Se(A ^ L, 7), K = K + I | 0, k = Se(k ^ K, 16), x = x + k | 0, I = Se(I ^ x, 12), K = K + I | 0, k = Se(k ^ K, 8), x = x + k | 0, I = Se(I ^ x, 7), E = E + v | 0, Q = Se(Q ^ E, 16), R = R + Q | 0, v = Se(v ^ R, 12), E = E + v | 0, Q = Se(Q ^ E, 8), R = R + Q | 0, v = Se(v ^ R, 7);
  let ce = 0;
  r[ce++] = o + re | 0, r[ce++] = a + se | 0, r[ce++] = c + K | 0, r[ce++] = l + E | 0, r[ce++] = d + v | 0, r[ce++] = u + b | 0, r[ce++] = p + A | 0, r[ce++] = g + I | 0, r[ce++] = w + x | 0, r[ce++] = m + R | 0, r[ce++] = y + O | 0, r[ce++] = C + L | 0, r[ce++] = _ + z | 0, r[ce++] = U + k | 0, r[ce++] = j + Q | 0, r[ce++] = P + Z | 0;
}
const qy = Ly(jy, { counterRight: !1, counterLength: 4, allowShortKeys: !1 }), Wy = new Uint8Array(16), id = (s, e) => {
  s.update(e);
  const t = e.length % 16;
  t && s.update(Wy.subarray(t));
}, Hy = new Uint8Array(32);
function od(s, e, t, r, n) {
  const i = s(e, t, Hy), o = Fy.create(i);
  n && id(o, n), id(o, r);
  const a = Ry(r.length, n ? n.length : 0, !0);
  o.update(a);
  const c = o.digest();
  return Mn(i, a), c;
}
const zy = (s) => (e, t, r) => ({ encrypt(n, i) {
  const o = n.length;
  i = sd(o + 16, i, !1), i.set(n);
  const a = i.subarray(0, -16);
  s(e, t, a, a, 1);
  const c = od(s, e, t, a, r);
  return i.set(c, o), Mn(c), i;
}, decrypt(n, i) {
  i = sd(n.length - 16, i, !1);
  const o = n.subarray(0, -16), a = n.subarray(-16), c = od(s, e, t, o, r);
  if (!Ny(a, c)) throw new Error("invalid tag");
  return i.set(n.subarray(0, -16)), s(e, t, i, i, 1), Mn(c), i;
} }), xh = Ty({ blockSize: 64, nonceLength: 12, tagLength: 16 }, zy(qy));
let kh = class extends ia {
  constructor(e, t) {
    super(), this.finished = !1, this.destroyed = !1, sl(e);
    const r = vs(t);
    if (this.iHash = e.create(), typeof this.iHash.update != "function") throw new Error("Expected instance of class which extends utils.Hash");
    this.blockLen = this.iHash.blockLen, this.outputLen = this.iHash.outputLen;
    const n = this.blockLen, i = new Uint8Array(n);
    i.set(r.length > n ? e.create().update(r).digest() : r);
    for (let o = 0; o < i.length; o++) i[o] ^= 54;
    this.iHash.update(i), this.oHash = e.create();
    for (let o = 0; o < i.length; o++) i[o] ^= 106;
    this.oHash.update(i), ls(i);
  }
  update(e) {
    return Nr(this), this.iHash.update(e), this;
  }
  digestInto(e) {
    Nr(this), cs(e, this.outputLen), this.finished = !0, this.iHash.digestInto(e), this.oHash.update(e), this.oHash.digestInto(e), this.destroy();
  }
  digest() {
    const e = new Uint8Array(this.oHash.outputLen);
    return this.digestInto(e), e;
  }
  _cloneInto(e) {
    e || (e = Object.create(Object.getPrototypeOf(this), {}));
    const { oHash: t, iHash: r, finished: n, destroyed: i, blockLen: o, outputLen: a } = this;
    return e = e, e.finished = n, e.destroyed = i, e.blockLen = o, e.outputLen = a, e.oHash = t._cloneInto(e.oHash), e.iHash = r._cloneInto(e.iHash), e;
  }
  clone() {
    return this._cloneInto();
  }
  destroy() {
    this.destroyed = !0, this.oHash.destroy(), this.iHash.destroy();
  }
};
const aa = (s, e, t) => new kh(s, e).update(t).digest();
aa.create = (s, e) => new kh(s, e);
function Vy(s, e, t) {
  return sl(s), t === void 0 && (t = new Uint8Array(s.outputLen)), aa(s, vs(t), vs(e));
}
const Ra = Uint8Array.from([0]), ad = Uint8Array.of();
function Ky(s, e, t, r = 32) {
  sl(s), er(r);
  const n = s.outputLen;
  if (r > 255 * n) throw new Error("Length should be <= 255*HashLen");
  const i = Math.ceil(r / n);
  t === void 0 && (t = ad);
  const o = new Uint8Array(i * n), a = aa.create(s, e), c = a._cloneInto(), l = new Uint8Array(a.outputLen);
  for (let d = 0; d < i; d++) Ra[0] = d + 1, c.update(d === 0 ? ad : l).update(t).update(Ra).digestInto(l), o.set(l, n * d), a._cloneInto(c);
  return a.destroy(), c.destroy(), ls(l, Ra), o.slice(0, r);
}
const Gy = (s, e, t, r, n) => Ky(s, Vy(s, e, t), r, n), ca = oa, al = BigInt(0), hc = BigInt(1);
function Wo(s, e) {
  if (typeof e != "boolean") throw new Error(s + " boolean expected, got " + e);
}
function fo(s) {
  const e = s.toString(16);
  return e.length & 1 ? "0" + e : e;
}
function Uh(s) {
  if (typeof s != "string") throw new Error("hex string expected, got " + typeof s);
  return s === "" ? al : BigInt("0x" + s);
}
function la(s) {
  return Uh(Ui(s));
}
function Ho(s) {
  return cs(s), Uh(Ui(Uint8Array.from(s).reverse()));
}
function cl(s, e) {
  return nl(s.toString(16).padStart(e * 2, "0"));
}
function ll(s, e) {
  return cl(s, e).reverse();
}
function Bt(s, e, t) {
  let r;
  if (typeof e == "string") try {
    r = nl(e);
  } catch (i) {
    throw new Error(s + " must be hex string or Uint8Array, cause: " + i);
  }
  else if (tl(e)) r = Uint8Array.from(e);
  else throw new Error(s + " must be hex string or Uint8Array");
  const n = r.length;
  if (typeof t == "number" && n !== t) throw new Error(s + " of length " + t + " expected, got " + n);
  return r;
}
const Pa = (s) => typeof s == "bigint" && al <= s;
function Yy(s, e, t) {
  return Pa(s) && Pa(e) && Pa(t) && e <= s && s < t;
}
function pc(s, e, t, r) {
  if (!Yy(e, t, r)) throw new Error("expected valid " + s + ": " + t + " <= n < " + r + ", got " + e);
}
function Zy(s) {
  let e;
  for (e = 0; s > al; s >>= hc, e += 1) ;
  return e;
}
const da = (s) => (hc << BigInt(s)) - hc;
function Jy(s, e, t) {
  if (typeof s != "number" || s < 2) throw new Error("hashLen must be a number");
  if (typeof e != "number" || e < 2) throw new Error("qByteLen must be a number");
  if (typeof t != "function") throw new Error("hmacFn must be a function");
  const r = (p) => new Uint8Array(p), n = (p) => Uint8Array.of(p);
  let i = r(s), o = r(s), a = 0;
  const c = () => {
    i.fill(1), o.fill(0), a = 0;
  }, l = (...p) => t(o, i, ...p), d = (p = r(0)) => {
    o = l(n(0), p), i = l(), p.length !== 0 && (o = l(n(1), p), i = l());
  }, u = () => {
    if (a++ >= 1e3) throw new Error("drbg: tried 1000 values");
    let p = 0;
    const g = [];
    for (; p < e; ) {
      i = l();
      const w = i.slice();
      g.push(w), p += i.length;
    }
    return jr(...g);
  };
  return (p, g) => {
    c(), d(p);
    let w;
    for (; !(w = g(u())); ) d();
    return c(), w;
  };
}
function ua(s, e, t = {}) {
  if (!s || typeof s != "object") throw new Error("expected valid options object");
  function r(n, i, o) {
    const a = s[n];
    if (o && a === void 0) return;
    const c = typeof a;
    if (c !== i || a === null) throw new Error(`param "${n}" is invalid: expected ${i}, got ${c}`);
  }
  Object.entries(e).forEach(([n, i]) => r(n, i, !1)), Object.entries(t).forEach(([n, i]) => r(n, i, !0));
}
function cd(s) {
  const e = /* @__PURE__ */ new WeakMap();
  return (t, ...r) => {
    const n = e.get(t);
    if (n !== void 0) return n;
    const i = s(t, ...r);
    return e.set(t, i), i;
  };
}
const jt = BigInt(0), Tt = BigInt(1), qr = BigInt(2), Xy = BigInt(3), Dh = BigInt(4), $h = BigInt(5), Lh = BigInt(8);
function os(s, e) {
  const t = s % e;
  return t >= jt ? t : e + t;
}
function gs(s, e, t) {
  let r = s;
  for (; e-- > jt; ) r *= r, r %= t;
  return r;
}
function ld(s, e) {
  if (s === jt) throw new Error("invert: expected non-zero number");
  if (e <= jt) throw new Error("invert: expected positive modulus, got " + e);
  let t = os(s, e), r = e, n = jt, i = Tt;
  for (; t !== jt; ) {
    const o = r / t, a = r % t, c = n - i * o;
    r = t, t = a, n = i, i = c;
  }
  if (r !== Tt) throw new Error("invert: does not exist");
  return os(n, e);
}
function Mh(s, e) {
  const t = (s.ORDER + Tt) / Dh, r = s.pow(e, t);
  if (!s.eql(s.sqr(r), e)) throw new Error("Cannot find square root");
  return r;
}
function Qy(s, e) {
  const t = (s.ORDER - $h) / Lh, r = s.mul(e, qr), n = s.pow(r, t), i = s.mul(e, n), o = s.mul(s.mul(i, qr), n), a = s.mul(i, s.sub(o, s.ONE));
  if (!s.eql(s.sqr(a), e)) throw new Error("Cannot find square root");
  return a;
}
function e0(s) {
  if (s < BigInt(3)) throw new Error("sqrt is not defined for small field");
  let e = s - Tt, t = 0;
  for (; e % qr === jt; ) e /= qr, t++;
  let r = qr;
  const n = Gn(s);
  for (; dd(n, r) === 1; ) if (r++ > 1e3) throw new Error("Cannot find square root: probably non-prime P");
  if (t === 1) return Mh;
  let i = n.pow(r, e);
  const o = (e + Tt) / qr;
  return function(a, c) {
    if (a.is0(c)) return c;
    if (dd(a, c) !== 1) throw new Error("Cannot find square root");
    let l = t, d = a.mul(a.ONE, i), u = a.pow(c, e), p = a.pow(c, o);
    for (; !a.eql(u, a.ONE); ) {
      if (a.is0(u)) return a.ZERO;
      let g = 1, w = a.sqr(u);
      for (; !a.eql(w, a.ONE); ) if (g++, w = a.sqr(w), g === l) throw new Error("Cannot find square root");
      const m = Tt << BigInt(l - g - 1), y = a.pow(d, m);
      l = g, d = a.sqr(y), u = a.mul(u, d), p = a.mul(p, y);
    }
    return p;
  };
}
function t0(s) {
  return s % Dh === Xy ? Mh : s % Lh === $h ? Qy : e0(s);
}
const s0 = ["create", "isValid", "is0", "neg", "inv", "sqrt", "sqr", "eql", "add", "sub", "mul", "pow", "div", "addN", "subN", "mulN", "sqrN"];
function r0(s) {
  const e = { ORDER: "bigint", MASK: "bigint", BYTES: "number", BITS: "number" }, t = s0.reduce((r, n) => (r[n] = "function", r), e);
  return ua(s, t), s;
}
function n0(s, e, t) {
  if (t < jt) throw new Error("invalid exponent, negatives unsupported");
  if (t === jt) return s.ONE;
  if (t === Tt) return e;
  let r = s.ONE, n = e;
  for (; t > jt; ) t & Tt && (r = s.mul(r, n)), n = s.sqr(n), t >>= Tt;
  return r;
}
function Bh(s, e, t = !1) {
  const r = new Array(e.length).fill(t ? s.ZERO : void 0), n = e.reduce((o, a, c) => s.is0(a) ? o : (r[c] = o, s.mul(o, a)), s.ONE), i = s.inv(n);
  return e.reduceRight((o, a, c) => s.is0(a) ? o : (r[c] = s.mul(o, r[c]), s.mul(o, a)), i), r;
}
function dd(s, e) {
  const t = (s.ORDER - Tt) / qr, r = s.pow(e, t), n = s.eql(r, s.ONE), i = s.eql(r, s.ZERO), o = s.eql(r, s.neg(s.ONE));
  if (!n && !i && !o) throw new Error("invalid Legendre symbol result");
  return n ? 1 : i ? 0 : -1;
}
function i0(s, e) {
  e !== void 0 && er(e);
  const t = e !== void 0 ? e : s.toString(2).length, r = Math.ceil(t / 8);
  return { nBitLength: t, nByteLength: r };
}
function Gn(s, e, t = !1, r = {}) {
  if (s <= jt) throw new Error("invalid field: expected ORDER > 0, got " + s);
  let n, i;
  if (typeof e == "object" && e != null) {
    if (r.sqrt || t) throw new Error("cannot specify opts in two arguments");
    const d = e;
    d.BITS && (n = d.BITS), d.sqrt && (i = d.sqrt), typeof d.isLE == "boolean" && (t = d.isLE);
  } else typeof e == "number" && (n = e), r.sqrt && (i = r.sqrt);
  const { nBitLength: o, nByteLength: a } = i0(s, n);
  if (a > 2048) throw new Error("invalid field: expected ORDER of <= 2048 bytes");
  let c;
  const l = Object.freeze({ ORDER: s, isLE: t, BITS: o, BYTES: a, MASK: da(o), ZERO: jt, ONE: Tt, create: (d) => os(d, s), isValid: (d) => {
    if (typeof d != "bigint") throw new Error("invalid field element: expected bigint, got " + typeof d);
    return jt <= d && d < s;
  }, is0: (d) => d === jt, isValidNot0: (d) => !l.is0(d) && l.isValid(d), isOdd: (d) => (d & Tt) === Tt, neg: (d) => os(-d, s), eql: (d, u) => d === u, sqr: (d) => os(d * d, s), add: (d, u) => os(d + u, s), sub: (d, u) => os(d - u, s), mul: (d, u) => os(d * u, s), pow: (d, u) => n0(l, d, u), div: (d, u) => os(d * ld(u, s), s), sqrN: (d) => d * d, addN: (d, u) => d + u, subN: (d, u) => d - u, mulN: (d, u) => d * u, inv: (d) => ld(d, s), sqrt: i || ((d) => (c || (c = t0(s)), c(l, d))), toBytes: (d) => t ? ll(d, a) : cl(d, a), fromBytes: (d) => {
    if (d.length !== a) throw new Error("Field.fromBytes: expected " + a + " bytes, got " + d.length);
    return t ? Ho(d) : la(d);
  }, invertBatch: (d) => Bh(l, d), cmov: (d, u, p) => p ? u : d });
  return Object.freeze(l);
}
function Fh(s) {
  if (typeof s != "bigint") throw new Error("field order must be bigint");
  const e = s.toString(2).length;
  return Math.ceil(e / 8);
}
function jh(s) {
  const e = Fh(s);
  return e + Math.ceil(e / 2);
}
function o0(s, e, t = !1) {
  const r = s.length, n = Fh(e), i = jh(e);
  if (r < 16 || r < i || r > 1024) throw new Error("expected " + i + "-1024 bytes of input, got " + r);
  const o = t ? Ho(s) : la(s), a = os(o, e - Tt) + Tt;
  return t ? ll(a, n) : cl(a, n);
}
const Bn = BigInt(0), Wr = BigInt(1);
function _i(s, e) {
  const t = e.negate();
  return s ? t : e;
}
function a0(s, e, t) {
  const r = (i) => i.pz, n = Bh(s.Fp, t.map(r));
  return t.map((i, o) => i.toAffine(n[o])).map(s.fromAffine);
}
function qh(s, e) {
  if (!Number.isSafeInteger(s) || s <= 0 || s > e) throw new Error("invalid window size, expected [1.." + e + "], got W=" + s);
}
function Oa(s, e) {
  qh(s, e);
  const t = Math.ceil(e / s) + 1, r = 2 ** (s - 1), n = 2 ** s, i = da(s), o = BigInt(s);
  return { windows: t, windowSize: r, mask: i, maxNumber: n, shiftBy: o };
}
function ud(s, e, t) {
  const { windowSize: r, mask: n, maxNumber: i, shiftBy: o } = t;
  let a = Number(s & n), c = s >> o;
  a > r && (a -= i, c += Wr);
  const l = e * r, d = l + Math.abs(a) - 1, u = a === 0, p = a < 0, g = e % 2 !== 0;
  return { nextN: c, offset: d, isZero: u, isNeg: p, isNegF: g, offsetF: l };
}
function c0(s, e) {
  if (!Array.isArray(s)) throw new Error("array expected");
  s.forEach((t, r) => {
    if (!(t instanceof e)) throw new Error("invalid point at index " + r);
  });
}
function l0(s, e) {
  if (!Array.isArray(s)) throw new Error("array of scalars expected");
  s.forEach((t, r) => {
    if (!e.isValid(t)) throw new Error("invalid scalar at index " + r);
  });
}
const xa = /* @__PURE__ */ new WeakMap(), Wh = /* @__PURE__ */ new WeakMap();
function ka(s) {
  return Wh.get(s) || 1;
}
function hd(s) {
  if (s !== Bn) throw new Error("invalid wNAF");
}
function d0(s, e) {
  return { constTimeNegate: _i, hasPrecomputes(t) {
    return ka(t) !== 1;
  }, unsafeLadder(t, r, n = s.ZERO) {
    let i = t;
    for (; r > Bn; ) r & Wr && (n = n.add(i)), i = i.double(), r >>= Wr;
    return n;
  }, precomputeWindow(t, r) {
    const { windows: n, windowSize: i } = Oa(r, e), o = [];
    let a = t, c = a;
    for (let l = 0; l < n; l++) {
      c = a, o.push(c);
      for (let d = 1; d < i; d++) c = c.add(a), o.push(c);
      a = c.double();
    }
    return o;
  }, wNAF(t, r, n) {
    let i = s.ZERO, o = s.BASE;
    const a = Oa(t, e);
    for (let c = 0; c < a.windows; c++) {
      const { nextN: l, offset: d, isZero: u, isNeg: p, isNegF: g, offsetF: w } = ud(n, c, a);
      n = l, u ? o = o.add(_i(g, r[w])) : i = i.add(_i(p, r[d]));
    }
    return hd(n), { p: i, f: o };
  }, wNAFUnsafe(t, r, n, i = s.ZERO) {
    const o = Oa(t, e);
    for (let a = 0; a < o.windows && n !== Bn; a++) {
      const { nextN: c, offset: l, isZero: d, isNeg: u } = ud(n, a, o);
      if (n = c, !d) {
        const p = r[l];
        i = i.add(u ? p.negate() : p);
      }
    }
    return hd(n), i;
  }, getPrecomputes(t, r, n) {
    let i = xa.get(r);
    return i || (i = this.precomputeWindow(r, t), t !== 1 && (typeof n == "function" && (i = n(i)), xa.set(r, i))), i;
  }, wNAFCached(t, r, n) {
    const i = ka(t);
    return this.wNAF(i, this.getPrecomputes(i, t, n), r);
  }, wNAFCachedUnsafe(t, r, n, i) {
    const o = ka(t);
    return o === 1 ? this.unsafeLadder(t, r, i) : this.wNAFUnsafe(o, this.getPrecomputes(o, t, n), r, i);
  }, setWindowSize(t, r) {
    qh(r, e), Wh.set(t, r), xa.delete(t);
  } };
}
function u0(s, e, t, r) {
  let n = e, i = s.ZERO, o = s.ZERO;
  for (; t > Bn || r > Bn; ) t & Wr && (i = i.add(n)), r & Wr && (o = o.add(n)), n = n.double(), t >>= Wr, r >>= Wr;
  return { p1: i, p2: o };
}
function h0(s, e, t, r) {
  c0(t, s), l0(r, e);
  const n = t.length, i = r.length;
  if (n !== i) throw new Error("arrays of points and scalars must have equal length");
  const o = s.ZERO, a = Zy(BigInt(n));
  let c = 1;
  a > 12 ? c = a - 3 : a > 4 ? c = a - 2 : a > 0 && (c = 2);
  const l = da(c), d = new Array(Number(l) + 1).fill(o), u = Math.floor((e.BITS - 1) / c) * c;
  let p = o;
  for (let g = u; g >= 0; g -= c) {
    d.fill(o);
    for (let m = 0; m < i; m++) {
      const y = r[m], C = Number(y >> BigInt(g) & l);
      d[C] = d[C].add(t[m]);
    }
    let w = o;
    for (let m = d.length - 1, y = o; m > 0; m--) y = y.add(d[m]), w = w.add(y);
    if (p = p.add(w), g !== 0) for (let m = 0; m < c; m++) p = p.double();
  }
  return p;
}
function pd(s, e) {
  if (e) {
    if (e.ORDER !== s) throw new Error("Field.ORDER must match order: Fp == p, Fn == n");
    return r0(e), e;
  } else return Gn(s);
}
function p0(s, e, t = {}) {
  if (!e || typeof e != "object") throw new Error(`expected valid ${s} CURVE object`);
  for (const o of ["p", "n", "h"]) {
    const a = e[o];
    if (!(typeof a == "bigint" && a > Bn)) throw new Error(`CURVE.${o} must be positive bigint`);
  }
  const r = pd(e.p, t.Fp), n = pd(e.n, t.Fn), i = ["Gx", "Gy", "a", "b"];
  for (const o of i) if (!r.isValid(e[o])) throw new Error(`CURVE.${o} must be valid field element of CURVE.Fp`);
  return { Fp: r, Fn: n };
}
BigInt(0), BigInt(1), BigInt(2), BigInt(8);
const ni = BigInt(0), cn = BigInt(1), go = BigInt(2);
function f0(s) {
  return ua(s, { adjustScalarBytes: "function", powPminus2: "function" }), Object.freeze({ ...s });
}
function g0(s) {
  const e = f0(s), { P: t, type: r, adjustScalarBytes: n, powPminus2: i, randomBytes: o } = e, a = r === "x25519";
  if (!a && r !== "x448") throw new Error("invalid type");
  const c = o || Kn, l = a ? 255 : 448, d = a ? 32 : 56, u = BigInt(a ? 9 : 5), p = BigInt(a ? 121665 : 39081), g = a ? go ** BigInt(254) : go ** BigInt(447), w = a ? BigInt(8) * go ** BigInt(251) - cn : BigInt(4) * go ** BigInt(445) - cn, m = g + w + cn, y = (E) => os(E, t), C = _(u);
  function _(E) {
    return ll(y(E), d);
  }
  function U(E) {
    const v = Bt("u coordinate", E, d);
    return a && (v[31] &= 127), y(Ho(v));
  }
  function j(E) {
    return Ho(n(Bt("scalar", E, d)));
  }
  function P(E, v) {
    const b = K(U(v), j(E));
    if (b === ni) throw new Error("invalid private or public key received");
    return _(b);
  }
  function re(E) {
    return P(E, C);
  }
  function se(E, v, b) {
    const A = y(E * (v - b));
    return v = y(v - A), b = y(b + A), { x_2: v, x_3: b };
  }
  function K(E, v) {
    pc("u", E, ni, t), pc("scalar", v, g, m);
    const b = v, A = E;
    let I = cn, x = ni, R = E, O = cn, L = ni;
    for (let k = BigInt(l - 1); k >= ni; k--) {
      const Q = b >> k & cn;
      L ^= Q, { x_2: I, x_3: R } = se(L, I, R), { x_2: x, x_3: O } = se(L, x, O), L = Q;
      const Z = I + x, ce = y(Z * Z), Ee = I - x, ye = y(Ee * Ee), be = ce - ye, Fe = R + O, Xe = R - O, Je = y(Xe * Z), Ge = y(Fe * Ee), es = Je + Ge, qs = Je - Ge;
      R = y(es * es), O = y(A * y(qs * qs)), I = y(ce * ye), x = y(be * (ce + y(p * be)));
    }
    ({ x_2: I, x_3: R } = se(L, I, R)), { x_2: x, x_3: O } = se(L, x, O);
    const z = i(x);
    return y(I * z);
  }
  return { scalarMult: P, scalarMultBase: re, getSharedSecret: (E, v) => P(E, v), getPublicKey: (E) => re(E), utils: { randomPrivateKey: () => c(d) }, GuBytes: C.slice() };
}
BigInt(0);
const m0 = BigInt(1), fd = BigInt(2), w0 = BigInt(3), y0 = BigInt(5);
BigInt(8);
const Hh = { p: BigInt("0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffed"), n: BigInt("0x1000000000000000000000000000000014def9dea2f79cd65812631a5cf5d3ed"), a: BigInt("0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffec"), d: BigInt("0x52036cee2b6ffe738cc740797779e89800700a4d4141d8ab75eb4dca135978a3"), Gx: BigInt("0x216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a"), Gy: BigInt("0x6666666666666666666666666666666666666666666666666666666666666658") };
function E0(s) {
  const e = BigInt(10), t = BigInt(20), r = BigInt(40), n = BigInt(80), i = Hh.p, o = s * s % i * s % i, a = gs(o, fd, i) * o % i, c = gs(a, m0, i) * s % i, l = gs(c, y0, i) * c % i, d = gs(l, e, i) * l % i, u = gs(d, t, i) * d % i, p = gs(u, r, i) * u % i, g = gs(p, n, i) * p % i, w = gs(g, n, i) * p % i, m = gs(w, e, i) * l % i;
  return { pow_p_5_8: gs(m, fd, i) * s % i, b2: o };
}
function b0(s) {
  return s[0] &= 248, s[31] &= 127, s[31] |= 64, s;
}
const fc = (() => {
  const s = Hh.p;
  return g0({ P: s, type: "x25519", powPminus2: (e) => {
    const { pow_p_5_8: t, b2: r } = E0(e);
    return os(gs(t, w0, s) * r, s);
  }, adjustScalarBytes: b0 });
})();
function gd(s) {
  s.lowS !== void 0 && Wo("lowS", s.lowS), s.prehash !== void 0 && Wo("prehash", s.prehash);
}
class v0 extends Error {
  constructor(e = "") {
    super(e);
  }
}
const Ys = { Err: v0, _tlv: { encode: (s, e) => {
  const { Err: t } = Ys;
  if (s < 0 || s > 256) throw new t("tlv.encode: wrong tag");
  if (e.length & 1) throw new t("tlv.encode: unpadded data");
  const r = e.length / 2, n = fo(r);
  if (n.length / 2 & 128) throw new t("tlv.encode: long form length too big");
  const i = r > 127 ? fo(n.length / 2 | 128) : "";
  return fo(s) + i + n + e;
}, decode(s, e) {
  const { Err: t } = Ys;
  let r = 0;
  if (s < 0 || s > 256) throw new t("tlv.encode: wrong tag");
  if (e.length < 2 || e[r++] !== s) throw new t("tlv.decode: wrong tlv");
  const n = e[r++], i = !!(n & 128);
  let o = 0;
  if (!i) o = n;
  else {
    const c = n & 127;
    if (!c) throw new t("tlv.decode(long): indefinite length not supported");
    if (c > 4) throw new t("tlv.decode(long): byte length is too big");
    const l = e.subarray(r, r + c);
    if (l.length !== c) throw new t("tlv.decode: length bytes not complete");
    if (l[0] === 0) throw new t("tlv.decode(long): zero leftmost byte");
    for (const d of l) o = o << 8 | d;
    if (r += c, o < 128) throw new t("tlv.decode(long): not minimal encoding");
  }
  const a = e.subarray(r, r + o);
  if (a.length !== o) throw new t("tlv.decode: wrong value length");
  return { v: a, l: e.subarray(r + o) };
} }, _int: { encode(s) {
  const { Err: e } = Ys;
  if (s < Ai) throw new e("integer: negative integers are not allowed");
  let t = fo(s);
  if (Number.parseInt(t[0], 16) & 8 && (t = "00" + t), t.length & 1) throw new e("unexpected DER parsing assertion: unpadded hex");
  return t;
}, decode(s) {
  const { Err: e } = Ys;
  if (s[0] & 128) throw new e("invalid signature integer: negative");
  if (s[0] === 0 && !(s[1] & 128)) throw new e("invalid signature integer: unnecessary leading zero");
  return la(s);
} }, toSig(s) {
  const { Err: e, _int: t, _tlv: r } = Ys, n = Bt("signature", s), { v: i, l: o } = r.decode(48, n);
  if (o.length) throw new e("invalid signature: left bytes after parsing");
  const { v: a, l: c } = r.decode(2, i), { v: l, l: d } = r.decode(2, c);
  if (d.length) throw new e("invalid signature: left bytes after parsing");
  return { r: t.decode(a), s: t.decode(l) };
}, hexFromSig(s) {
  const { _tlv: e, _int: t } = Ys, r = e.encode(2, t.encode(s.r)), n = e.encode(2, t.encode(s.s)), i = r + n;
  return e.encode(48, i);
} }, Ai = BigInt(0), Ii = BigInt(1), C0 = BigInt(2), mo = BigInt(3), _0 = BigInt(4);
function A0(s, e, t) {
  function r(n) {
    const i = s.sqr(n), o = s.mul(i, n);
    return s.add(s.add(o, s.mul(n, e)), t);
  }
  return r;
}
function zh(s, e, t) {
  const { BYTES: r } = s;
  function n(i) {
    let o;
    if (typeof i == "bigint") o = i;
    else {
      let a = Bt("private key", i);
      if (e) {
        if (!e.includes(a.length * 2)) throw new Error("invalid private key");
        const c = new Uint8Array(r);
        c.set(a, c.length - a.length), a = c;
      }
      try {
        o = s.fromBytes(a);
      } catch {
        throw new Error(`invalid private key: expected ui8a of size ${r}, got ${typeof i}`);
      }
    }
    if (t && (o = s.create(o)), !s.isValidNot0(o)) throw new Error("invalid private key: out of range [1..N-1]");
    return o;
  }
  return n;
}
function I0(s, e = {}) {
  const { Fp: t, Fn: r } = p0("weierstrass", s, e), { h: n, n: i } = s;
  ua(e, {}, { allowInfinityPoint: "boolean", clearCofactor: "function", isTorsionFree: "function", fromBytes: "function", toBytes: "function", endo: "object", wrapPrivateKey: "boolean" });
  const { endo: o } = e;
  if (o && (!t.is0(s.a) || typeof o.beta != "bigint" || typeof o.splitScalar != "function")) throw new Error('invalid endo: expected "beta": bigint and "splitScalar": function');
  function a() {
    if (!t.isOdd) throw new Error("compression is not supported: Field does not have .isOdd()");
  }
  function c(K, E, v) {
    const { x: b, y: A } = E.toAffine(), I = t.toBytes(b);
    if (Wo("isCompressed", v), v) {
      a();
      const x = !t.isOdd(A);
      return jr(Vh(x), I);
    } else return jr(Uint8Array.of(4), I, t.toBytes(A));
  }
  function l(K) {
    cs(K);
    const E = t.BYTES, v = E + 1, b = 2 * E + 1, A = K.length, I = K[0], x = K.subarray(1);
    if (A === v && (I === 2 || I === 3)) {
      const R = t.fromBytes(x);
      if (!t.isValid(R)) throw new Error("bad point: is not on curve, wrong x");
      const O = p(R);
      let L;
      try {
        L = t.sqrt(O);
      } catch (k) {
        const Q = k instanceof Error ? ": " + k.message : "";
        throw new Error("bad point: is not on curve, sqrt error" + Q);
      }
      a();
      const z = t.isOdd(L);
      return (I & 1) === 1 !== z && (L = t.neg(L)), { x: R, y: L };
    } else if (A === b && I === 4) {
      const R = t.fromBytes(x.subarray(E * 0, E * 1)), O = t.fromBytes(x.subarray(E * 1, E * 2));
      if (!g(R, O)) throw new Error("bad point: is not on curve");
      return { x: R, y: O };
    } else throw new Error(`bad point: got length ${A}, expected compressed=${v} or uncompressed=${b}`);
  }
  const d = e.toBytes || c, u = e.fromBytes || l, p = A0(t, s.a, s.b);
  function g(K, E) {
    const v = t.sqr(E), b = p(K);
    return t.eql(v, b);
  }
  if (!g(s.Gx, s.Gy)) throw new Error("bad curve params: generator point");
  const w = t.mul(t.pow(s.a, mo), _0), m = t.mul(t.sqr(s.b), BigInt(27));
  if (t.is0(t.add(w, m))) throw new Error("bad curve params: a or b");
  function y(K, E, v = !1) {
    if (!t.isValid(E) || v && t.is0(E)) throw new Error(`bad point coordinate ${K}`);
    return E;
  }
  function C(K) {
    if (!(K instanceof P)) throw new Error("ProjectivePoint expected");
  }
  const _ = cd((K, E) => {
    const { px: v, py: b, pz: A } = K;
    if (t.eql(A, t.ONE)) return { x: v, y: b };
    const I = K.is0();
    E == null && (E = I ? t.ONE : t.inv(A));
    const x = t.mul(v, E), R = t.mul(b, E), O = t.mul(A, E);
    if (I) return { x: t.ZERO, y: t.ZERO };
    if (!t.eql(O, t.ONE)) throw new Error("invZ was invalid");
    return { x, y: R };
  }), U = cd((K) => {
    if (K.is0()) {
      if (e.allowInfinityPoint && !t.is0(K.py)) return;
      throw new Error("bad point: ZERO");
    }
    const { x: E, y: v } = K.toAffine();
    if (!t.isValid(E) || !t.isValid(v)) throw new Error("bad point: x or y not field elements");
    if (!g(E, v)) throw new Error("bad point: equation left != right");
    if (!K.isTorsionFree()) throw new Error("bad point: not in prime-order subgroup");
    return !0;
  });
  function j(K, E, v, b, A) {
    return v = new P(t.mul(v.px, K), v.py, v.pz), E = _i(b, E), v = _i(A, v), E.add(v);
  }
  class P {
    constructor(E, v, b) {
      this.px = y("x", E), this.py = y("y", v, !0), this.pz = y("z", b), Object.freeze(this);
    }
    static fromAffine(E) {
      const { x: v, y: b } = E || {};
      if (!E || !t.isValid(v) || !t.isValid(b)) throw new Error("invalid affine point");
      if (E instanceof P) throw new Error("projective point not allowed");
      return t.is0(v) && t.is0(b) ? P.ZERO : new P(v, b, t.ONE);
    }
    get x() {
      return this.toAffine().x;
    }
    get y() {
      return this.toAffine().y;
    }
    static normalizeZ(E) {
      return a0(P, "pz", E);
    }
    static fromBytes(E) {
      return cs(E), P.fromHex(E);
    }
    static fromHex(E) {
      const v = P.fromAffine(u(Bt("pointHex", E)));
      return v.assertValidity(), v;
    }
    static fromPrivateKey(E) {
      const v = zh(r, e.allowedPrivateKeyLengths, e.wrapPrivateKey);
      return P.BASE.multiply(v(E));
    }
    static msm(E, v) {
      return h0(P, r, E, v);
    }
    precompute(E = 8, v = !0) {
      return se.setWindowSize(this, E), v || this.multiply(mo), this;
    }
    _setWindowSize(E) {
      this.precompute(E);
    }
    assertValidity() {
      U(this);
    }
    hasEvenY() {
      const { y: E } = this.toAffine();
      if (!t.isOdd) throw new Error("Field doesn't support isOdd");
      return !t.isOdd(E);
    }
    equals(E) {
      C(E);
      const { px: v, py: b, pz: A } = this, { px: I, py: x, pz: R } = E, O = t.eql(t.mul(v, R), t.mul(I, A)), L = t.eql(t.mul(b, R), t.mul(x, A));
      return O && L;
    }
    negate() {
      return new P(this.px, t.neg(this.py), this.pz);
    }
    double() {
      const { a: E, b: v } = s, b = t.mul(v, mo), { px: A, py: I, pz: x } = this;
      let R = t.ZERO, O = t.ZERO, L = t.ZERO, z = t.mul(A, A), k = t.mul(I, I), Q = t.mul(x, x), Z = t.mul(A, I);
      return Z = t.add(Z, Z), L = t.mul(A, x), L = t.add(L, L), R = t.mul(E, L), O = t.mul(b, Q), O = t.add(R, O), R = t.sub(k, O), O = t.add(k, O), O = t.mul(R, O), R = t.mul(Z, R), L = t.mul(b, L), Q = t.mul(E, Q), Z = t.sub(z, Q), Z = t.mul(E, Z), Z = t.add(Z, L), L = t.add(z, z), z = t.add(L, z), z = t.add(z, Q), z = t.mul(z, Z), O = t.add(O, z), Q = t.mul(I, x), Q = t.add(Q, Q), z = t.mul(Q, Z), R = t.sub(R, z), L = t.mul(Q, k), L = t.add(L, L), L = t.add(L, L), new P(R, O, L);
    }
    add(E) {
      C(E);
      const { px: v, py: b, pz: A } = this, { px: I, py: x, pz: R } = E;
      let O = t.ZERO, L = t.ZERO, z = t.ZERO;
      const k = s.a, Q = t.mul(s.b, mo);
      let Z = t.mul(v, I), ce = t.mul(b, x), Ee = t.mul(A, R), ye = t.add(v, b), be = t.add(I, x);
      ye = t.mul(ye, be), be = t.add(Z, ce), ye = t.sub(ye, be), be = t.add(v, A);
      let Fe = t.add(I, R);
      return be = t.mul(be, Fe), Fe = t.add(Z, Ee), be = t.sub(be, Fe), Fe = t.add(b, A), O = t.add(x, R), Fe = t.mul(Fe, O), O = t.add(ce, Ee), Fe = t.sub(Fe, O), z = t.mul(k, be), O = t.mul(Q, Ee), z = t.add(O, z), O = t.sub(ce, z), z = t.add(ce, z), L = t.mul(O, z), ce = t.add(Z, Z), ce = t.add(ce, Z), Ee = t.mul(k, Ee), be = t.mul(Q, be), ce = t.add(ce, Ee), Ee = t.sub(Z, Ee), Ee = t.mul(k, Ee), be = t.add(be, Ee), Z = t.mul(ce, be), L = t.add(L, Z), Z = t.mul(Fe, be), O = t.mul(ye, O), O = t.sub(O, Z), Z = t.mul(ye, ce), z = t.mul(Fe, z), z = t.add(z, Z), new P(O, L, z);
    }
    subtract(E) {
      return this.add(E.negate());
    }
    is0() {
      return this.equals(P.ZERO);
    }
    multiply(E) {
      const { endo: v } = e;
      if (!r.isValidNot0(E)) throw new Error("invalid scalar: out of range");
      let b, A;
      const I = (x) => se.wNAFCached(this, x, P.normalizeZ);
      if (v) {
        const { k1neg: x, k1: R, k2neg: O, k2: L } = v.splitScalar(E), { p: z, f: k } = I(R), { p: Q, f: Z } = I(L);
        A = k.add(Z), b = j(v.beta, z, Q, x, O);
      } else {
        const { p: x, f: R } = I(E);
        b = x, A = R;
      }
      return P.normalizeZ([b, A])[0];
    }
    multiplyUnsafe(E) {
      const { endo: v } = e, b = this;
      if (!r.isValid(E)) throw new Error("invalid scalar: out of range");
      if (E === Ai || b.is0()) return P.ZERO;
      if (E === Ii) return b;
      if (se.hasPrecomputes(this)) return this.multiply(E);
      if (v) {
        const { k1neg: A, k1: I, k2neg: x, k2: R } = v.splitScalar(E), { p1: O, p2: L } = u0(P, b, I, R);
        return j(v.beta, O, L, A, x);
      } else return se.wNAFCachedUnsafe(b, E);
    }
    multiplyAndAddUnsafe(E, v, b) {
      const A = this.multiplyUnsafe(v).add(E.multiplyUnsafe(b));
      return A.is0() ? void 0 : A;
    }
    toAffine(E) {
      return _(this, E);
    }
    isTorsionFree() {
      const { isTorsionFree: E } = e;
      return n === Ii ? !0 : E ? E(P, this) : se.wNAFCachedUnsafe(this, i).is0();
    }
    clearCofactor() {
      const { clearCofactor: E } = e;
      return n === Ii ? this : E ? E(P, this) : this.multiplyUnsafe(n);
    }
    toBytes(E = !0) {
      return Wo("isCompressed", E), this.assertValidity(), d(P, this, E);
    }
    toRawBytes(E = !0) {
      return this.toBytes(E);
    }
    toHex(E = !0) {
      return Ui(this.toBytes(E));
    }
    toString() {
      return `<Point ${this.is0() ? "ZERO" : this.toHex()}>`;
    }
  }
  P.BASE = new P(s.Gx, s.Gy, t.ONE), P.ZERO = new P(t.ZERO, t.ONE, t.ZERO), P.Fp = t, P.Fn = r;
  const re = r.BITS, se = d0(P, e.endo ? Math.ceil(re / 2) : re);
  return P;
}
function Vh(s) {
  return Uint8Array.of(s ? 2 : 3);
}
function S0(s, e, t = {}) {
  ua(e, { hash: "function" }, { hmac: "function", lowS: "boolean", randomBytes: "function", bits2int: "function", bits2int_modN: "function" });
  const r = e.randomBytes || Kn, n = e.hmac || ((b, ...A) => aa(e.hash, b, jr(...A))), { Fp: i, Fn: o } = s, { ORDER: a, BITS: c } = o;
  function l(b) {
    const A = a >> Ii;
    return b > A;
  }
  function d(b) {
    return l(b) ? o.neg(b) : b;
  }
  function u(b, A) {
    if (!o.isValidNot0(A)) throw new Error(`invalid signature ${b}: out of range 1..CURVE.n`);
  }
  class p {
    constructor(A, I, x) {
      u("r", A), u("s", I), this.r = A, this.s = I, x != null && (this.recovery = x), Object.freeze(this);
    }
    static fromCompact(A) {
      const I = o.BYTES, x = Bt("compactSignature", A, I * 2);
      return new p(o.fromBytes(x.subarray(0, I)), o.fromBytes(x.subarray(I, I * 2)));
    }
    static fromDER(A) {
      const { r: I, s: x } = Ys.toSig(Bt("DER", A));
      return new p(I, x);
    }
    assertValidity() {
    }
    addRecoveryBit(A) {
      return new p(this.r, this.s, A);
    }
    recoverPublicKey(A) {
      const I = i.ORDER, { r: x, s: R, recovery: O } = this;
      if (O == null || ![0, 1, 2, 3].includes(O)) throw new Error("recovery id invalid");
      if (a * C0 < I && O > 1) throw new Error("recovery id is ambiguous for h>1 curve");
      const L = O === 2 || O === 3 ? x + a : x;
      if (!i.isValid(L)) throw new Error("recovery id 2 or 3 invalid");
      const z = i.toBytes(L), k = s.fromHex(jr(Vh((O & 1) === 0), z)), Q = o.inv(L), Z = U(Bt("msgHash", A)), ce = o.create(-Z * Q), Ee = o.create(R * Q), ye = s.BASE.multiplyUnsafe(ce).add(k.multiplyUnsafe(Ee));
      if (ye.is0()) throw new Error("point at infinify");
      return ye.assertValidity(), ye;
    }
    hasHighS() {
      return l(this.s);
    }
    normalizeS() {
      return this.hasHighS() ? new p(this.r, o.neg(this.s), this.recovery) : this;
    }
    toBytes(A) {
      if (A === "compact") return jr(o.toBytes(this.r), o.toBytes(this.s));
      if (A === "der") return nl(Ys.hexFromSig(this));
      throw new Error("invalid format");
    }
    toDERRawBytes() {
      return this.toBytes("der");
    }
    toDERHex() {
      return Ui(this.toBytes("der"));
    }
    toCompactRawBytes() {
      return this.toBytes("compact");
    }
    toCompactHex() {
      return Ui(this.toBytes("compact"));
    }
  }
  const g = zh(o, t.allowedPrivateKeyLengths, t.wrapPrivateKey), w = { isValidPrivateKey(b) {
    try {
      return g(b), !0;
    } catch {
      return !1;
    }
  }, normPrivateKeyToScalar: g, randomPrivateKey: () => {
    const b = a;
    return o0(r(jh(b)), b);
  }, precompute(b = 8, A = s.BASE) {
    return A.precompute(b, !1);
  } };
  function m(b, A = !0) {
    return s.fromPrivateKey(b).toBytes(A);
  }
  function y(b) {
    if (typeof b == "bigint") return !1;
    if (b instanceof s) return !0;
    const A = Bt("key", b).length, I = i.BYTES, x = I + 1, R = 2 * I + 1;
    if (!(t.allowedPrivateKeyLengths || o.BYTES === x)) return A === x || A === R;
  }
  function C(b, A, I = !0) {
    if (y(b) === !0) throw new Error("first arg must be private key");
    if (y(A) === !1) throw new Error("second arg must be public key");
    return s.fromHex(A).multiply(g(b)).toBytes(I);
  }
  const _ = e.bits2int || function(b) {
    if (b.length > 8192) throw new Error("input is too large");
    const A = la(b), I = b.length * 8 - c;
    return I > 0 ? A >> BigInt(I) : A;
  }, U = e.bits2int_modN || function(b) {
    return o.create(_(b));
  }, j = da(c);
  function P(b) {
    return pc("num < 2^" + c, b, Ai, j), o.toBytes(b);
  }
  function re(b, A, I = se) {
    if (["recovered", "canonical"].some((ye) => ye in I)) throw new Error("sign() legacy options not supported");
    const { hash: x } = e;
    let { lowS: R, prehash: O, extraEntropy: L } = I;
    R == null && (R = !0), b = Bt("msgHash", b), gd(I), O && (b = Bt("prehashed msgHash", x(b)));
    const z = U(b), k = g(A), Q = [P(k), P(z)];
    if (L != null && L !== !1) {
      const ye = L === !0 ? r(i.BYTES) : L;
      Q.push(Bt("extraEntropy", ye));
    }
    const Z = jr(...Q), ce = z;
    function Ee(ye) {
      const be = _(ye);
      if (!o.isValidNot0(be)) return;
      const Fe = o.inv(be), Xe = s.BASE.multiply(be).toAffine(), Je = o.create(Xe.x);
      if (Je === Ai) return;
      const Ge = o.create(Fe * o.create(ce + Je * k));
      if (Ge === Ai) return;
      let es = (Xe.x === Je ? 0 : 2) | Number(Xe.y & Ii), qs = Ge;
      return R && l(Ge) && (qs = d(Ge), es ^= 1), new p(Je, qs, es);
    }
    return { seed: Z, k2sig: Ee };
  }
  const se = { lowS: e.lowS, prehash: !1 }, K = { lowS: e.lowS, prehash: !1 };
  function E(b, A, I = se) {
    const { seed: x, k2sig: R } = re(b, A, I);
    return Jy(e.hash.outputLen, o.BYTES, n)(x, R);
  }
  s.BASE.precompute(8);
  function v(b, A, I, x = K) {
    const R = b;
    A = Bt("msgHash", A), I = Bt("publicKey", I), gd(x);
    const { lowS: O, prehash: L, format: z } = x;
    if ("strict" in x) throw new Error("options.strict was renamed to lowS");
    if (z !== void 0 && !["compact", "der", "js"].includes(z)) throw new Error('format must be "compact", "der" or "js"');
    const k = typeof R == "string" || tl(R), Q = !k && !z && typeof R == "object" && R !== null && typeof R.r == "bigint" && typeof R.s == "bigint";
    if (!k && !Q) throw new Error("invalid signature, expected Uint8Array, hex string or Signature instance");
    let Z, ce;
    try {
      if (Q) if (z === void 0 || z === "js") Z = new p(R.r, R.s);
      else throw new Error("invalid format");
      if (k) {
        try {
          z !== "compact" && (Z = p.fromDER(R));
        } catch (es) {
          if (!(es instanceof Ys.Err)) throw es;
        }
        !Z && z !== "der" && (Z = p.fromCompact(R));
      }
      ce = s.fromHex(I);
    } catch {
      return !1;
    }
    if (!Z || O && Z.hasHighS()) return !1;
    L && (A = e.hash(A));
    const { r: Ee, s: ye } = Z, be = U(A), Fe = o.inv(ye), Xe = o.create(be * Fe), Je = o.create(Ee * Fe), Ge = s.BASE.multiplyUnsafe(Xe).add(ce.multiplyUnsafe(Je));
    return Ge.is0() ? !1 : o.create(Ge.x) === Ee;
  }
  return Object.freeze({ getPublicKey: m, getSharedSecret: C, sign: E, verify: v, utils: w, Point: s, Signature: p });
}
function N0(s) {
  const e = { a: s.a, b: s.b, p: s.Fp.ORDER, n: s.n, h: s.h, Gx: s.Gx, Gy: s.Gy }, t = s.Fp, r = Gn(e.n, s.nBitLength), n = { Fp: t, Fn: r, allowedPrivateKeyLengths: s.allowedPrivateKeyLengths, allowInfinityPoint: s.allowInfinityPoint, endo: s.endo, wrapPrivateKey: s.wrapPrivateKey, isTorsionFree: s.isTorsionFree, clearCofactor: s.clearCofactor, fromBytes: s.fromBytes, toBytes: s.toBytes };
  return { CURVE: e, curveOpts: n };
}
function T0(s) {
  const { CURVE: e, curveOpts: t } = N0(s), r = { hash: s.hash, hmac: s.hmac, randomBytes: s.randomBytes, lowS: s.lowS, bits2int: s.bits2int, bits2int_modN: s.bits2int_modN };
  return { CURVE: e, curveOpts: t, ecdsaOpts: r };
}
function R0(s, e) {
  return Object.assign({}, e, { ProjectivePoint: e.Point, CURVE: s });
}
function P0(s) {
  const { CURVE: e, curveOpts: t, ecdsaOpts: r } = T0(s), n = I0(e, t), i = S0(n, r, t);
  return R0(s, i);
}
function gc(s, e) {
  const t = (r) => P0({ ...s, hash: r });
  return { ...t(e), create: t };
}
const Kh = { p: BigInt("0xffffffff00000001000000000000000000000000ffffffffffffffffffffffff"), n: BigInt("0xffffffff00000000ffffffffffffffffbce6faada7179e84f3b9cac2fc632551"), h: BigInt(1), a: BigInt("0xffffffff00000001000000000000000000000000fffffffffffffffffffffffc"), b: BigInt("0x5ac635d8aa3a93e7b3ebbd55769886bc651d06b0cc53b0f63bce3c3e27d2604b"), Gx: BigInt("0x6b17d1f2e12c4247f8bce6e563a440f277037d812deb33a0f4a13945d898c296"), Gy: BigInt("0x4fe342e2fe1a7f9b8ee7eb4a7c0f9e162bce33576b315ececbb6406837bf51f5") }, Gh = { p: BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffeffffffff0000000000000000ffffffff"), n: BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffc7634d81f4372ddf581a0db248b0a77aecec196accc52973"), h: BigInt(1), a: BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffeffffffff0000000000000000fffffffc"), b: BigInt("0xb3312fa7e23ee7e4988e056be3f82d19181d9c6efe8141120314088f5013875ac656398d8a2ed19d2a85c8edd3ec2aef"), Gx: BigInt("0xaa87ca22be8b05378eb1c71ef320ad746e1d3b628ba79b9859f741e082542a385502f25dbf55296c3a545e3872760ab7"), Gy: BigInt("0x3617de4a96262c6f5d9e98bf9292dc29f8f41dbd289a147ce9da3113b5f0b8c00a60b1ce1d7e819d7a431d7c90ea0e5f") }, Yh = { p: BigInt("0x1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"), n: BigInt("0x01fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffa51868783bf2f966b7fcc0148f709a5d03bb5c9b8899c47aebb6fb71e91386409"), h: BigInt(1), a: BigInt("0x1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc"), b: BigInt("0x0051953eb9618e1c9a1f929a21a0b68540eea2da725b99b315f3b8b489918ef109e156193951ec7e937b1652c0bd3bb1bf073573df883d2c34f1ef451fd46b503f00"), Gx: BigInt("0x00c6858e06b70404e9cd9e3ecb662395b4429c648139053fb521f828af606b4d3dbaa14b5e77efe75928fe1dc127a2ffa8de3348b3c1856a429bf97e7e31c2e5bd66"), Gy: BigInt("0x011839296a789a3bc0045c8a5fb42c7d1bd998f54449579b446817afbd17273e662c97ee72995ef42640c550b9013fad0761353c7086a272c24088be94769fd16650") }, O0 = Gn(Kh.p), x0 = Gn(Gh.p), k0 = Gn(Yh.p), U0 = gc({ ...Kh, Fp: O0, lowS: !1 }, oa);
gc({ ...Gh, Fp: x0, lowS: !1 }, qw), gc({ ...Yh, Fp: k0, lowS: !1, allowedPrivateKeyLengths: [130, 131, 132] }, jw);
const D0 = U0, Zh = "base10", Rt = "base16", Es = "base64pad", Er = "base64url", eo = "utf8", Jh = 0, Js = 1, to = 2, $0 = 0, md = 1, Si = 12, dl = 32;
function L0() {
  const s = fc.utils.randomPrivateKey(), e = fc.getPublicKey(s);
  return { privateKey: qt(s, Rt), publicKey: qt(e, Rt) };
}
function mc() {
  const s = Kn(dl);
  return qt(s, Rt);
}
function M0(s, e) {
  const t = fc.getSharedSecret(as(s, Rt), as(e, Rt)), r = Gy(ca, t, void 0, void 0, dl);
  return qt(r, Rt);
}
function No(s) {
  const e = ca(as(s, Rt));
  return qt(e, Rt);
}
function Us(s) {
  const e = ca(as(s, eo));
  return qt(e, Rt);
}
function Xh(s) {
  return as(`${s}`, Zh);
}
function Yr(s) {
  return Number(qt(s, Zh));
}
function Qh(s) {
  return s.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}
function ep(s) {
  const e = s.replace(/-/g, "+").replace(/_/g, "/"), t = (4 - e.length % 4) % 4;
  return e + "=".repeat(t);
}
function B0(s) {
  const e = Xh(typeof s.type < "u" ? s.type : Jh);
  if (Yr(e) === Js && typeof s.senderPublicKey > "u") throw new Error("Missing sender public key for type 1 envelope");
  const t = typeof s.senderPublicKey < "u" ? as(s.senderPublicKey, Rt) : void 0, r = typeof s.iv < "u" ? as(s.iv, Rt) : Kn(Si), n = as(s.symKey, Rt), i = xh(n, r).encrypt(as(s.message, eo)), o = tp({ type: e, sealed: i, iv: r, senderPublicKey: t });
  return s.encoding === Er ? Qh(o) : o;
}
function F0(s) {
  const e = as(s.symKey, Rt), { sealed: t, iv: r } = $i({ encoded: s.encoded, encoding: s.encoding }), n = xh(e, r).decrypt(t);
  if (n === null) throw new Error("Failed to decrypt");
  return qt(n, eo);
}
function j0(s, e) {
  const t = Xh(to), r = Kn(Si), n = as(s, eo), i = tp({ type: t, sealed: n, iv: r });
  return e === Er ? Qh(i) : i;
}
function q0(s, e) {
  const { sealed: t } = $i({ encoded: s, encoding: e });
  return qt(t, eo);
}
function tp(s) {
  if (Yr(s.type) === to) return qt(Ci([s.type, s.sealed]), Es);
  if (Yr(s.type) === Js) {
    if (typeof s.senderPublicKey > "u") throw new Error("Missing sender public key for type 1 envelope");
    return qt(Ci([s.type, s.senderPublicKey, s.iv, s.sealed]), Es);
  }
  return qt(Ci([s.type, s.iv, s.sealed]), Es);
}
function $i(s) {
  const e = (s.encoding || Es) === Er ? ep(s.encoded) : s.encoded, t = as(e, Es), r = t.slice($0, md), n = md;
  if (Yr(r) === Js) {
    const c = n + dl, l = c + Si, d = t.slice(n, c), u = t.slice(c, l), p = t.slice(l);
    return { type: r, sealed: p, iv: u, senderPublicKey: d };
  }
  if (Yr(r) === to) {
    const c = t.slice(n), l = Kn(Si);
    return { type: r, sealed: c, iv: l };
  }
  const i = n + Si, o = t.slice(n, i), a = t.slice(i);
  return { type: r, sealed: a, iv: o };
}
function W0(s, e) {
  const t = $i({ encoded: s, encoding: e == null ? void 0 : e.encoding });
  return sp({ type: Yr(t.type), senderPublicKey: typeof t.senderPublicKey < "u" ? qt(t.senderPublicKey, Rt) : void 0, receiverPublicKey: e == null ? void 0 : e.receiverPublicKey });
}
function sp(s) {
  const e = (s == null ? void 0 : s.type) || Jh;
  if (e === Js) {
    if (typeof (s == null ? void 0 : s.senderPublicKey) > "u") throw new Error("missing sender public key");
    if (typeof (s == null ? void 0 : s.receiverPublicKey) > "u") throw new Error("missing receiver public key");
  }
  return { type: e, senderPublicKey: s == null ? void 0 : s.senderPublicKey, receiverPublicKey: s == null ? void 0 : s.receiverPublicKey };
}
function wd(s) {
  return s.type === Js && typeof s.senderPublicKey == "string" && typeof s.receiverPublicKey == "string";
}
function yd(s) {
  return s.type === to;
}
function H0(s) {
  const e = Buffer.from(s.x, "base64"), t = Buffer.from(s.y, "base64");
  return Ci([new Uint8Array([4]), e, t]);
}
function z0(s, e) {
  const [t, r, n] = s.split("."), i = Buffer.from(ep(n), "base64");
  if (i.length !== 64) throw new Error("Invalid signature length");
  const o = i.slice(0, 32), a = i.slice(32, 64), c = `${t}.${r}`, l = ca(c), d = H0(e);
  if (!D0.verify(Ci([o, a]), l, d)) throw new Error("Invalid signature");
  return Ja(s).payload;
}
const V0 = "irn";
function zo(s) {
  return (s == null ? void 0 : s.relay) || { protocol: V0 };
}
function wi(s) {
  const e = Xp[s];
  if (typeof e > "u") throw new Error(`Relay Protocol not supported: ${s}`);
  return e;
}
function K0(s, e = "-") {
  const t = {}, r = "relay" + e;
  return Object.keys(s).forEach((n) => {
    if (n.startsWith(r)) {
      const i = n.replace(r, ""), o = s[n];
      t[i] = o;
    }
  }), t;
}
function Ed(s) {
  if (!s.includes("wc:")) {
    const l = ph(s);
    l != null && l.includes("wc:") && (s = l);
  }
  s = s.includes("wc://") ? s.replace("wc://", "") : s, s = s.includes("wc:") ? s.replace("wc:", "") : s;
  const e = s.indexOf(":"), t = s.indexOf("?") !== -1 ? s.indexOf("?") : void 0, r = s.substring(0, e), n = s.substring(e + 1, t).split("@"), i = typeof t < "u" ? s.substring(t) : "", o = new URLSearchParams(i), a = {};
  o.forEach((l, d) => {
    a[d] = l;
  });
  const c = typeof a.methods == "string" ? a.methods.split(",") : void 0;
  return { protocol: r, topic: G0(n[0]), version: parseInt(n[1], 10), symKey: a.symKey, relay: K0(a), methods: c, expiryTimestamp: a.expiryTimestamp ? parseInt(a.expiryTimestamp, 10) : void 0 };
}
function G0(s) {
  return s.startsWith("//") ? s.substring(2) : s;
}
function Y0(s, e = "-") {
  const t = "relay", r = {};
  return Object.keys(s).forEach((n) => {
    const i = n, o = t + e + i;
    s[i] && (r[o] = s[i]);
  }), r;
}
function bd(s) {
  const e = new URLSearchParams(), t = Y0(s.relay);
  Object.keys(t).sort().forEach((n) => {
    e.set(n, t[n]);
  }), e.set("symKey", s.symKey), s.expiryTimestamp && e.set("expiryTimestamp", s.expiryTimestamp.toString()), s.methods && e.set("methods", s.methods.join(","));
  const r = e.toString();
  return `${s.protocol}:${s.topic}@${s.version}?${r}`;
}
function wo(s, e, t) {
  return `${s}?wc_ev=${t}&topic=${e}`;
}
var Z0 = Object.defineProperty, J0 = Object.defineProperties, X0 = Object.getOwnPropertyDescriptors, vd = Object.getOwnPropertySymbols, Q0 = Object.prototype.hasOwnProperty, eE = Object.prototype.propertyIsEnumerable, Cd = (s, e, t) => e in s ? Z0(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t, tE = (s, e) => {
  for (var t in e || (e = {})) Q0.call(e, t) && Cd(s, t, e[t]);
  if (vd) for (var t of vd(e)) eE.call(e, t) && Cd(s, t, e[t]);
  return s;
}, sE = (s, e) => J0(s, X0(e));
function Yn(s) {
  const e = [];
  return s.forEach((t) => {
    const [r, n] = t.split(":");
    e.push(`${r}:${n}`);
  }), e;
}
function rE(s) {
  const e = [];
  return Object.values(s).forEach((t) => {
    e.push(...Yn(t.accounts));
  }), e;
}
function nE(s, e) {
  const t = [];
  return Object.values(s).forEach((r) => {
    Yn(r.accounts).includes(e) && t.push(...r.methods);
  }), t;
}
function iE(s, e) {
  const t = [];
  return Object.values(s).forEach((r) => {
    Yn(r.accounts).includes(e) && t.push(...r.events);
  }), t;
}
function ha(s) {
  return s.includes(":");
}
function Tn(s) {
  return ha(s) ? s.split(":")[0] : s;
}
function _d(s) {
  var e, t, r;
  const n = {};
  if (!_r(s)) return n;
  for (const [i, o] of Object.entries(s)) {
    const a = ha(i) ? [i] : o.chains, c = o.methods || [], l = o.events || [], d = Tn(i);
    n[d] = sE(tE({}, n[d]), { chains: Ls(a, (e = n[d]) == null ? void 0 : e.chains), methods: Ls(c, (t = n[d]) == null ? void 0 : t.methods), events: Ls(l, (r = n[d]) == null ? void 0 : r.events) });
  }
  return n;
}
function oE(s) {
  const e = {};
  return s == null || s.forEach((t) => {
    var r;
    const [n, i] = t.split(":");
    e[n] || (e[n] = { accounts: [], chains: [], events: [], methods: [] }), e[n].accounts.push(t), (r = e[n].chains) == null || r.push(`${n}:${i}`);
  }), e;
}
function Ad(s, e) {
  e = e.map((r) => r.replace("did:pkh:", ""));
  const t = oE(e);
  for (const [r, n] of Object.entries(t)) n.methods ? n.methods = Ls(n.methods, s) : n.methods = s, n.events = ["chainChanged", "accountsChanged"];
  return t;
}
function aE(s, e) {
  var t, r, n, i, o, a;
  const c = _d(s), l = _d(e), d = {}, u = Object.keys(c).concat(Object.keys(l));
  for (const p of u) d[p] = { chains: Ls((t = c[p]) == null ? void 0 : t.chains, (r = l[p]) == null ? void 0 : r.chains), methods: Ls((n = c[p]) == null ? void 0 : n.methods, (i = l[p]) == null ? void 0 : i.methods), events: Ls((o = c[p]) == null ? void 0 : o.events, (a = l[p]) == null ? void 0 : a.events) };
  return d;
}
const cE = { INVALID_METHOD: { message: "Invalid method.", code: 1001 }, INVALID_EVENT: { message: "Invalid event.", code: 1002 }, INVALID_UPDATE_REQUEST: { message: "Invalid update request.", code: 1003 }, INVALID_EXTEND_REQUEST: { message: "Invalid extend request.", code: 1004 }, INVALID_SESSION_SETTLE_REQUEST: { message: "Invalid session settle request.", code: 1005 }, UNAUTHORIZED_METHOD: { message: "Unauthorized method.", code: 3001 }, UNAUTHORIZED_EVENT: { message: "Unauthorized event.", code: 3002 }, UNAUTHORIZED_UPDATE_REQUEST: { message: "Unauthorized update request.", code: 3003 }, UNAUTHORIZED_EXTEND_REQUEST: { message: "Unauthorized extend request.", code: 3004 }, USER_REJECTED: { message: "User rejected.", code: 5e3 }, USER_REJECTED_CHAINS: { message: "User rejected chains.", code: 5001 }, USER_REJECTED_METHODS: { message: "User rejected methods.", code: 5002 }, USER_REJECTED_EVENTS: { message: "User rejected events.", code: 5003 }, UNSUPPORTED_CHAINS: { message: "Unsupported chains.", code: 5100 }, UNSUPPORTED_METHODS: { message: "Unsupported methods.", code: 5101 }, UNSUPPORTED_EVENTS: { message: "Unsupported events.", code: 5102 }, UNSUPPORTED_ACCOUNTS: { message: "Unsupported accounts.", code: 5103 }, UNSUPPORTED_NAMESPACE_KEY: { message: "Unsupported namespace key.", code: 5104 }, USER_DISCONNECTED: { message: "User disconnected.", code: 6e3 }, SESSION_SETTLEMENT_FAILED: { message: "Session settlement failed.", code: 7e3 }, WC_METHOD_UNSUPPORTED: { message: "Unsupported wc_ method.", code: 10001 } }, lE = { NOT_INITIALIZED: { message: "Not initialized.", code: 1 }, NO_MATCHING_KEY: { message: "No matching key.", code: 2 }, RESTORE_WILL_OVERRIDE: { message: "Restore will override.", code: 3 }, RESUBSCRIBED: { message: "Resubscribed.", code: 4 }, MISSING_OR_INVALID: { message: "Missing or invalid.", code: 5 }, EXPIRED: { message: "Expired.", code: 6 }, UNKNOWN_TYPE: { message: "Unknown type.", code: 7 }, MISMATCHED_TOPIC: { message: "Mismatched topic.", code: 8 }, NON_CONFORMING_NAMESPACES: { message: "Non conforming namespaces.", code: 9 } };
function M(s, e) {
  const { message: t, code: r } = lE[s];
  return { message: e ? `${t} ${e}` : t, code: r };
}
function Ke(s, e) {
  const { message: t, code: r } = cE[s];
  return { message: e ? `${t} ${e}` : t, code: r };
}
function Xs(s, e) {
  return !!Array.isArray(s);
}
function _r(s) {
  return Object.getPrototypeOf(s) === Object.prototype && Object.keys(s).length;
}
function ft(s) {
  return typeof s > "u";
}
function et(s, e) {
  return e && ft(s) ? !0 : typeof s == "string" && !!s.trim().length;
}
function ul(s, e) {
  return e && ft(s) ? !0 : typeof s == "number" && !isNaN(s);
}
function dE(s, e) {
  const { requiredNamespaces: t } = e, r = Object.keys(s.namespaces), n = Object.keys(t);
  let i = !0;
  return Fr(n, r) ? (r.forEach((o) => {
    const { accounts: a, methods: c, events: l } = s.namespaces[o], d = Yn(a), u = t[o];
    (!Fr(ch(o, u), d) || !Fr(u.methods, c) || !Fr(u.events, l)) && (i = !1);
  }), i) : !1;
}
function Vo(s) {
  return et(s, !1) && s.includes(":") ? s.split(":").length === 2 : !1;
}
function uE(s) {
  if (et(s, !1) && s.includes(":")) {
    const e = s.split(":");
    if (e.length === 3) {
      const t = e[0] + ":" + e[1];
      return !!e[2] && Vo(t);
    }
  }
  return !1;
}
function hE(s) {
  function e(t) {
    try {
      return typeof new URL(t) < "u";
    } catch {
      return !1;
    }
  }
  try {
    if (et(s, !1)) {
      if (e(s)) return !0;
      const t = ph(s);
      return e(t);
    }
  } catch {
  }
  return !1;
}
function pE(s) {
  var e;
  return (e = s == null ? void 0 : s.proposer) == null ? void 0 : e.publicKey;
}
function fE(s) {
  return s == null ? void 0 : s.topic;
}
function gE(s, e) {
  let t = null;
  return et(s == null ? void 0 : s.publicKey, !1) || (t = M("MISSING_OR_INVALID", `${e} controller public key should be a string`)), t;
}
function Id(s) {
  let e = !0;
  return Xs(s) ? s.length && (e = s.every((t) => et(t, !1))) : e = !1, e;
}
function mE(s, e, t) {
  let r = null;
  return Xs(e) && e.length ? e.forEach((n) => {
    r || Vo(n) || (r = Ke("UNSUPPORTED_CHAINS", `${t}, chain ${n} should be a string and conform to "namespace:chainId" format`));
  }) : Vo(s) || (r = Ke("UNSUPPORTED_CHAINS", `${t}, chains must be defined as "namespace:chainId" e.g. "eip155:1": {...} in the namespace key OR as an array of CAIP-2 chainIds e.g. eip155: { chains: ["eip155:1", "eip155:5"] }`)), r;
}
function wE(s, e, t) {
  let r = null;
  return Object.entries(s).forEach(([n, i]) => {
    if (r) return;
    const o = mE(n, ch(n, i), `${e} ${t}`);
    o && (r = o);
  }), r;
}
function yE(s, e) {
  let t = null;
  return Xs(s) ? s.forEach((r) => {
    t || uE(r) || (t = Ke("UNSUPPORTED_ACCOUNTS", `${e}, account ${r} should be a string and conform to "namespace:chainId:address" format`));
  }) : t = Ke("UNSUPPORTED_ACCOUNTS", `${e}, accounts should be an array of strings conforming to "namespace:chainId:address" format`), t;
}
function EE(s, e) {
  let t = null;
  return Object.values(s).forEach((r) => {
    if (t) return;
    const n = yE(r == null ? void 0 : r.accounts, `${e} namespace`);
    n && (t = n);
  }), t;
}
function bE(s, e) {
  let t = null;
  return Id(s == null ? void 0 : s.methods) ? Id(s == null ? void 0 : s.events) || (t = Ke("UNSUPPORTED_EVENTS", `${e}, events should be an array of strings or empty array for no events`)) : t = Ke("UNSUPPORTED_METHODS", `${e}, methods should be an array of strings or empty array for no methods`), t;
}
function rp(s, e) {
  let t = null;
  return Object.values(s).forEach((r) => {
    if (t) return;
    const n = bE(r, `${e}, namespace`);
    n && (t = n);
  }), t;
}
function vE(s, e, t) {
  let r = null;
  if (s && _r(s)) {
    const n = rp(s, e);
    n && (r = n);
    const i = wE(s, e, t);
    i && (r = i);
  } else r = M("MISSING_OR_INVALID", `${e}, ${t} should be an object with data`);
  return r;
}
function Ua(s, e) {
  let t = null;
  if (s && _r(s)) {
    const r = rp(s, e);
    r && (t = r);
    const n = EE(s, e);
    n && (t = n);
  } else t = M("MISSING_OR_INVALID", `${e}, namespaces should be an object with data`);
  return t;
}
function np(s) {
  return et(s.protocol, !0);
}
function CE(s, e) {
  let t = !1;
  return s ? s && Xs(s) && s.length && s.forEach((r) => {
    t = np(r);
  }) : t = !0, t;
}
function _E(s) {
  return typeof s == "number";
}
function Lt(s) {
  return typeof s < "u" && typeof s !== null;
}
function AE(s) {
  return !(!s || typeof s != "object" || !s.code || !ul(s.code, !1) || !s.message || !et(s.message, !1));
}
function IE(s) {
  return !(ft(s) || !et(s.method, !1));
}
function SE(s) {
  return !(ft(s) || ft(s.result) && ft(s.error) || !ul(s.id, !1) || !et(s.jsonrpc, !1));
}
function NE(s) {
  return !(ft(s) || !et(s.name, !1));
}
function Sd(s, e) {
  return !(!Vo(e) || !rE(s).includes(e));
}
function TE(s, e, t) {
  return et(t, !1) ? nE(s, e).includes(t) : !1;
}
function RE(s, e, t) {
  return et(t, !1) ? iE(s, e).includes(t) : !1;
}
function Nd(s, e, t) {
  let r = null;
  const n = PE(s), i = OE(e), o = Object.keys(n), a = Object.keys(i), c = Td(Object.keys(s)), l = Td(Object.keys(e)), d = c.filter((u) => !l.includes(u));
  return d.length && (r = M("NON_CONFORMING_NAMESPACES", `${t} namespaces keys don't satisfy requiredNamespaces.
      Required: ${d.toString()}
      Received: ${Object.keys(e).toString()}`)), Fr(o, a) || (r = M("NON_CONFORMING_NAMESPACES", `${t} namespaces chains don't satisfy required namespaces.
      Required: ${o.toString()}
      Approved: ${a.toString()}`)), Object.keys(e).forEach((u) => {
    if (!u.includes(":") || r) return;
    const p = Yn(e[u].accounts);
    p.includes(u) || (r = M("NON_CONFORMING_NAMESPACES", `${t} namespaces accounts don't satisfy namespace accounts for ${u}
        Required: ${u}
        Approved: ${p.toString()}`));
  }), o.forEach((u) => {
    r || (Fr(n[u].methods, i[u].methods) ? Fr(n[u].events, i[u].events) || (r = M("NON_CONFORMING_NAMESPACES", `${t} namespaces events don't satisfy namespace events for ${u}`)) : r = M("NON_CONFORMING_NAMESPACES", `${t} namespaces methods don't satisfy namespace methods for ${u}`));
  }), r;
}
function PE(s) {
  const e = {};
  return Object.keys(s).forEach((t) => {
    var r;
    t.includes(":") ? e[t] = s[t] : (r = s[t].chains) == null || r.forEach((n) => {
      e[n] = { methods: s[t].methods, events: s[t].events };
    });
  }), e;
}
function Td(s) {
  return [...new Set(s.map((e) => e.includes(":") ? e.split(":")[0] : e))];
}
function OE(s) {
  const e = {};
  return Object.keys(s).forEach((t) => {
    if (t.includes(":")) e[t] = s[t];
    else {
      const r = Yn(s[t].accounts);
      r == null || r.forEach((n) => {
        e[n] = { accounts: s[t].accounts.filter((i) => i.includes(`${n}:`)), methods: s[t].methods, events: s[t].events };
      });
    }
  }), e;
}
function xE(s, e) {
  return ul(s, !1) && s <= e.max && s >= e.min;
}
function Rd() {
  const s = Xi();
  return new Promise((e) => {
    switch (s) {
      case Zt.browser:
        e(kE());
        break;
      case Zt.reactNative:
        e(UE());
        break;
      case Zt.node:
        e(DE());
        break;
      default:
        e(!0);
    }
  });
}
function kE() {
  return Vn() && (navigator == null ? void 0 : navigator.onLine);
}
async function UE() {
  if (Or() && typeof global < "u" && global != null && global.NetInfo) {
    const s = await (global == null ? void 0 : global.NetInfo.fetch());
    return s == null ? void 0 : s.isConnected;
  }
  return !0;
}
function DE() {
  return !0;
}
function $E(s) {
  switch (Xi()) {
    case Zt.browser:
      LE(s);
      break;
    case Zt.reactNative:
      ME(s);
      break;
  }
}
function LE(s) {
  !Or() && Vn() && (window.addEventListener("online", () => s(!0)), window.addEventListener("offline", () => s(!1)));
}
function ME(s) {
  Or() && typeof global < "u" && global != null && global.NetInfo && (global == null || global.NetInfo.addEventListener((e) => s(e == null ? void 0 : e.isConnected)));
}
function BE() {
  var s;
  return Vn() && $n() ? ((s = $n()) == null ? void 0 : s.visibilityState) === "visible" : !0;
}
const Da = {};
class ii {
  static get(e) {
    return Da[e];
  }
  static set(e, t) {
    Da[e] = t;
  }
  static delete(e) {
    delete Da[e];
  }
}
function FE(s) {
  const e = Wn.decode(s);
  if (e.length < 33) throw new Error("Too short to contain a public key");
  return e.slice(1, 33);
}
function jE({ publicKey: s, signature: e, payload: t }) {
  var r;
  const n = wc(t.method), i = 128 | parseInt(((r = t.version) == null ? void 0 : r.toString()) || "4"), o = HE(t.address), a = t.era === "00" ? new Uint8Array([0]) : wc(t.era);
  if (a.length !== 1 && a.length !== 2) throw new Error("Invalid era length");
  const c = parseInt(t.nonce, 16), l = new Uint8Array([c & 255, c >> 8 & 255]), d = BigInt(`0x${WE(t.tip)}`), u = VE(d), p = new Uint8Array([0, ...s, o, ...e, ...a, ...l, ...u, ...n]), g = zE(p.length + 1);
  return new Uint8Array([...g, i, ...p]);
}
function qE(s) {
  const e = wc(s), t = Um.blake2b(e, void 0, 32);
  return "0x" + Buffer.from(t).toString("hex");
}
function wc(s) {
  return new Uint8Array(s.replace(/^0x/, "").match(/.{1,2}/g).map((e) => parseInt(e, 16)));
}
function WE(s) {
  return s.startsWith("0x") ? s.slice(2) : s;
}
function HE(s) {
  const e = Wn.decode(s)[0];
  return e === 42 ? 0 : e === 60 ? 2 : 1;
}
function zE(s) {
  if (s < 64) return new Uint8Array([s << 2]);
  if (s < 16384) {
    const e = s << 2 | 1;
    return new Uint8Array([e & 255, e >> 8 & 255]);
  } else if (s < 1 << 30) {
    const e = s << 2 | 2;
    return new Uint8Array([e & 255, e >> 8 & 255, e >> 16 & 255, e >> 24 & 255]);
  } else throw new Error("Compact encoding > 2^30 not supported");
}
function VE(s) {
  if (s < BigInt(1) << BigInt(6)) return new Uint8Array([Number(s << BigInt(2))]);
  if (s < BigInt(1) << BigInt(14)) {
    const e = s << BigInt(2) | BigInt(1);
    return new Uint8Array([Number(e & BigInt(255)), Number(e >> BigInt(8) & BigInt(255))]);
  } else if (s < BigInt(1) << BigInt(30)) {
    const e = s << BigInt(2) | BigInt(2);
    return new Uint8Array([Number(e & BigInt(255)), Number(e >> BigInt(8) & BigInt(255)), Number(e >> BigInt(16) & BigInt(255)), Number(e >> BigInt(24) & BigInt(255))]);
  } else throw new Error("BigInt compact encoding not supported > 2^30");
}
function KE(s) {
  const e = Uint8Array.from(Buffer.from(s.signature, "hex")), t = FE(s.transaction.address), r = jE({ publicKey: t, signature: e, payload: s.transaction }), n = Buffer.from(r).toString("hex");
  return qE(n);
}
const ip = "wc", op = 2, yc = "core", Bs = `${ip}@2:${yc}:`, GE = { logger: "error" }, YE = { database: ":memory:" }, ZE = "crypto", Pd = "client_ed25519_seed", JE = B.ONE_DAY, XE = "keychain", QE = "0.3", eb = "messages", tb = "0.3", Od = B.SIX_HOURS, sb = "publisher", ap = "irn", rb = "error", cp = "wss://relay.walletconnect.org", nb = "relayer", ct = { message: "relayer_message", message_ack: "relayer_message_ack", connect: "relayer_connect", disconnect: "relayer_disconnect", error: "relayer_error", connection_stalled: "relayer_connection_stalled", transport_closed: "relayer_transport_closed", publish: "relayer_publish" }, ib = "_subscription", ss = { payload: "payload", connect: "connect", disconnect: "disconnect", error: "error" }, ob = 0.1, Ec = "2.21.3", ze = { link_mode: "link_mode", relay: "relay" }, To = { inbound: "inbound", outbound: "outbound" }, ab = "0.3", cb = "WALLETCONNECT_CLIENT_ID", xd = "WALLETCONNECT_LINK_MODE_APPS", zt = { created: "subscription_created", deleted: "subscription_deleted", expired: "subscription_expired", disabled: "subscription_disabled", sync: "subscription_sync", resubscribed: "subscription_resubscribed" }, lb = "subscription", db = "0.3", ub = "pairing", hb = "0.3", oi = { wc_pairingDelete: { req: { ttl: B.ONE_DAY, prompt: !1, tag: 1e3 }, res: { ttl: B.ONE_DAY, prompt: !1, tag: 1001 } }, wc_pairingPing: { req: { ttl: B.THIRTY_SECONDS, prompt: !1, tag: 1002 }, res: { ttl: B.THIRTY_SECONDS, prompt: !1, tag: 1003 } }, unregistered_method: { req: { ttl: B.ONE_DAY, prompt: !1, tag: 0 }, res: { ttl: B.ONE_DAY, prompt: !1, tag: 0 } } }, Lr = { create: "pairing_create", expire: "pairing_expire", delete: "pairing_delete", ping: "pairing_ping" }, hs = { created: "history_created", updated: "history_updated", deleted: "history_deleted", sync: "history_sync" }, pb = "history", fb = "0.3", gb = "expirer", is = { created: "expirer_created", deleted: "expirer_deleted", expired: "expirer_expired", sync: "expirer_sync" }, mb = "0.3", wb = "verify-api", yb = "https://verify.walletconnect.com", lp = "https://verify.walletconnect.org", Ni = lp, Eb = `${Ni}/v3`, bb = [yb, lp], vb = "echo", Cb = "https://echo.walletconnect.com", Os = { pairing_started: "pairing_started", pairing_uri_validation_success: "pairing_uri_validation_success", pairing_uri_not_expired: "pairing_uri_not_expired", store_new_pairing: "store_new_pairing", subscribing_pairing_topic: "subscribing_pairing_topic", subscribe_pairing_topic_success: "subscribe_pairing_topic_success", existing_pairing: "existing_pairing", pairing_not_expired: "pairing_not_expired", emit_inactive_pairing: "emit_inactive_pairing", emit_session_proposal: "emit_session_proposal", subscribing_to_pairing_topic: "subscribing_to_pairing_topic" }, Gs = { no_wss_connection: "no_wss_connection", no_internet_connection: "no_internet_connection", malformed_pairing_uri: "malformed_pairing_uri", active_pairing_already_exists: "active_pairing_already_exists", subscribe_pairing_topic_failure: "subscribe_pairing_topic_failure", pairing_expired: "pairing_expired", proposal_expired: "proposal_expired", proposal_listener_not_found: "proposal_listener_not_found" }, ps = { session_approve_started: "session_approve_started", proposal_not_expired: "proposal_not_expired", session_namespaces_validation_success: "session_namespaces_validation_success", create_session_topic: "create_session_topic", subscribing_session_topic: "subscribing_session_topic", subscribe_session_topic_success: "subscribe_session_topic_success", publishing_session_approve: "publishing_session_approve", session_approve_publish_success: "session_approve_publish_success", store_session: "store_session", publishing_session_settle: "publishing_session_settle", session_settle_publish_success: "session_settle_publish_success" }, kr = { no_internet_connection: "no_internet_connection", no_wss_connection: "no_wss_connection", proposal_expired: "proposal_expired", subscribe_session_topic_failure: "subscribe_session_topic_failure", session_approve_publish_failure: "session_approve_publish_failure", session_settle_publish_failure: "session_settle_publish_failure", session_approve_namespace_validation_failure: "session_approve_namespace_validation_failure", proposal_not_found: "proposal_not_found" }, Ur = { authenticated_session_approve_started: "authenticated_session_approve_started", create_authenticated_session_topic: "create_authenticated_session_topic", cacaos_verified: "cacaos_verified", store_authenticated_session: "store_authenticated_session", subscribing_authenticated_session_topic: "subscribing_authenticated_session_topic", subscribe_authenticated_session_topic_success: "subscribe_authenticated_session_topic_success", publishing_authenticated_session_approve: "publishing_authenticated_session_approve" }, ai = { no_internet_connection: "no_internet_connection", invalid_cacao: "invalid_cacao", subscribe_authenticated_session_topic_failure: "subscribe_authenticated_session_topic_failure", authenticated_session_approve_publish_failure: "authenticated_session_approve_publish_failure", authenticated_session_pending_request_not_found: "authenticated_session_pending_request_not_found" }, _b = 0.1, Ab = "event-client", Ib = 86400, Sb = "https://pulse.walletconnect.org/batch";
function Nb(s, e) {
  if (s.length >= 255) throw new TypeError("Alphabet too long");
  for (var t = new Uint8Array(256), r = 0; r < t.length; r++) t[r] = 255;
  for (var n = 0; n < s.length; n++) {
    var i = s.charAt(n), o = i.charCodeAt(0);
    if (t[o] !== 255) throw new TypeError(i + " is ambiguous");
    t[o] = n;
  }
  var a = s.length, c = s.charAt(0), l = Math.log(a) / Math.log(256), d = Math.log(256) / Math.log(a);
  function u(w) {
    if (w instanceof Uint8Array || (ArrayBuffer.isView(w) ? w = new Uint8Array(w.buffer, w.byteOffset, w.byteLength) : Array.isArray(w) && (w = Uint8Array.from(w))), !(w instanceof Uint8Array)) throw new TypeError("Expected Uint8Array");
    if (w.length === 0) return "";
    for (var m = 0, y = 0, C = 0, _ = w.length; C !== _ && w[C] === 0; ) C++, m++;
    for (var U = (_ - C) * d + 1 >>> 0, j = new Uint8Array(U); C !== _; ) {
      for (var P = w[C], re = 0, se = U - 1; (P !== 0 || re < y) && se !== -1; se--, re++) P += 256 * j[se] >>> 0, j[se] = P % a >>> 0, P = P / a >>> 0;
      if (P !== 0) throw new Error("Non-zero carry");
      y = re, C++;
    }
    for (var K = U - y; K !== U && j[K] === 0; ) K++;
    for (var E = c.repeat(m); K < U; ++K) E += s.charAt(j[K]);
    return E;
  }
  function p(w) {
    if (typeof w != "string") throw new TypeError("Expected String");
    if (w.length === 0) return new Uint8Array();
    var m = 0;
    if (w[m] !== " ") {
      for (var y = 0, C = 0; w[m] === c; ) y++, m++;
      for (var _ = (w.length - m) * l + 1 >>> 0, U = new Uint8Array(_); w[m]; ) {
        var j = t[w.charCodeAt(m)];
        if (j === 255) return;
        for (var P = 0, re = _ - 1; (j !== 0 || P < C) && re !== -1; re--, P++) j += a * U[re] >>> 0, U[re] = j % 256 >>> 0, j = j / 256 >>> 0;
        if (j !== 0) throw new Error("Non-zero carry");
        C = P, m++;
      }
      if (w[m] !== " ") {
        for (var se = _ - C; se !== _ && U[se] === 0; ) se++;
        for (var K = new Uint8Array(y + (_ - se)), E = y; se !== _; ) K[E++] = U[se++];
        return K;
      }
    }
  }
  function g(w) {
    var m = p(w);
    if (m) return m;
    throw new Error(`Non-${e} character`);
  }
  return { encode: u, decodeUnsafe: p, decode: g };
}
var Tb = Nb, Rb = Tb;
const dp = (s) => {
  if (s instanceof Uint8Array && s.constructor.name === "Uint8Array") return s;
  if (s instanceof ArrayBuffer) return new Uint8Array(s);
  if (ArrayBuffer.isView(s)) return new Uint8Array(s.buffer, s.byteOffset, s.byteLength);
  throw new Error("Unknown type, must be binary type");
}, Pb = (s) => new TextEncoder().encode(s), Ob = (s) => new TextDecoder().decode(s);
class xb {
  constructor(e, t, r) {
    this.name = e, this.prefix = t, this.baseEncode = r;
  }
  encode(e) {
    if (e instanceof Uint8Array) return `${this.prefix}${this.baseEncode(e)}`;
    throw Error("Unknown type, must be binary type");
  }
}
class kb {
  constructor(e, t, r) {
    if (this.name = e, this.prefix = t, t.codePointAt(0) === void 0) throw new Error("Invalid prefix character");
    this.prefixCodePoint = t.codePointAt(0), this.baseDecode = r;
  }
  decode(e) {
    if (typeof e == "string") {
      if (e.codePointAt(0) !== this.prefixCodePoint) throw Error(`Unable to decode multibase string ${JSON.stringify(e)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
      return this.baseDecode(e.slice(this.prefix.length));
    } else throw Error("Can only multibase decode strings");
  }
  or(e) {
    return up(this, e);
  }
}
class Ub {
  constructor(e) {
    this.decoders = e;
  }
  or(e) {
    return up(this, e);
  }
  decode(e) {
    const t = e[0], r = this.decoders[t];
    if (r) return r.decode(e);
    throw RangeError(`Unable to decode multibase string ${JSON.stringify(e)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
  }
}
const up = (s, e) => new Ub({ ...s.decoders || { [s.prefix]: s }, ...e.decoders || { [e.prefix]: e } });
class Db {
  constructor(e, t, r, n) {
    this.name = e, this.prefix = t, this.baseEncode = r, this.baseDecode = n, this.encoder = new xb(e, t, r), this.decoder = new kb(e, t, n);
  }
  encode(e) {
    return this.encoder.encode(e);
  }
  decode(e) {
    return this.decoder.decode(e);
  }
}
const pa = ({ name: s, prefix: e, encode: t, decode: r }) => new Db(s, e, t, r), so = ({ prefix: s, name: e, alphabet: t }) => {
  const { encode: r, decode: n } = Rb(t, e);
  return pa({ prefix: s, name: e, encode: r, decode: (i) => dp(n(i)) });
}, $b = (s, e, t, r) => {
  const n = {};
  for (let d = 0; d < e.length; ++d) n[e[d]] = d;
  let i = s.length;
  for (; s[i - 1] === "="; ) --i;
  const o = new Uint8Array(i * t / 8 | 0);
  let a = 0, c = 0, l = 0;
  for (let d = 0; d < i; ++d) {
    const u = n[s[d]];
    if (u === void 0) throw new SyntaxError(`Non-${r} character`);
    c = c << t | u, a += t, a >= 8 && (a -= 8, o[l++] = 255 & c >> a);
  }
  if (a >= t || 255 & c << 8 - a) throw new SyntaxError("Unexpected end of data");
  return o;
}, Lb = (s, e, t) => {
  const r = e[e.length - 1] === "=", n = (1 << t) - 1;
  let i = "", o = 0, a = 0;
  for (let c = 0; c < s.length; ++c) for (a = a << 8 | s[c], o += 8; o > t; ) o -= t, i += e[n & a >> o];
  if (o && (i += e[n & a << t - o]), r) for (; i.length * t & 7; ) i += "=";
  return i;
}, mt = ({ name: s, prefix: e, bitsPerChar: t, alphabet: r }) => pa({ prefix: e, name: s, encode(n) {
  return Lb(n, r, t);
}, decode(n) {
  return $b(n, r, t, s);
} }), Mb = pa({ prefix: "\0", name: "identity", encode: (s) => Ob(s), decode: (s) => Pb(s) });
var Bb = Object.freeze({ __proto__: null, identity: Mb });
const Fb = mt({ prefix: "0", name: "base2", alphabet: "01", bitsPerChar: 1 });
var jb = Object.freeze({ __proto__: null, base2: Fb });
const qb = mt({ prefix: "7", name: "base8", alphabet: "01234567", bitsPerChar: 3 });
var Wb = Object.freeze({ __proto__: null, base8: qb });
const Hb = so({ prefix: "9", name: "base10", alphabet: "0123456789" });
var zb = Object.freeze({ __proto__: null, base10: Hb });
const Vb = mt({ prefix: "f", name: "base16", alphabet: "0123456789abcdef", bitsPerChar: 4 }), Kb = mt({ prefix: "F", name: "base16upper", alphabet: "0123456789ABCDEF", bitsPerChar: 4 });
var Gb = Object.freeze({ __proto__: null, base16: Vb, base16upper: Kb });
const Yb = mt({ prefix: "b", name: "base32", alphabet: "abcdefghijklmnopqrstuvwxyz234567", bitsPerChar: 5 }), Zb = mt({ prefix: "B", name: "base32upper", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567", bitsPerChar: 5 }), Jb = mt({ prefix: "c", name: "base32pad", alphabet: "abcdefghijklmnopqrstuvwxyz234567=", bitsPerChar: 5 }), Xb = mt({ prefix: "C", name: "base32padupper", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=", bitsPerChar: 5 }), Qb = mt({ prefix: "v", name: "base32hex", alphabet: "0123456789abcdefghijklmnopqrstuv", bitsPerChar: 5 }), ev = mt({ prefix: "V", name: "base32hexupper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV", bitsPerChar: 5 }), tv = mt({ prefix: "t", name: "base32hexpad", alphabet: "0123456789abcdefghijklmnopqrstuv=", bitsPerChar: 5 }), sv = mt({ prefix: "T", name: "base32hexpadupper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=", bitsPerChar: 5 }), rv = mt({ prefix: "h", name: "base32z", alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769", bitsPerChar: 5 });
var nv = Object.freeze({ __proto__: null, base32: Yb, base32upper: Zb, base32pad: Jb, base32padupper: Xb, base32hex: Qb, base32hexupper: ev, base32hexpad: tv, base32hexpadupper: sv, base32z: rv });
const iv = so({ prefix: "k", name: "base36", alphabet: "0123456789abcdefghijklmnopqrstuvwxyz" }), ov = so({ prefix: "K", name: "base36upper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ" });
var av = Object.freeze({ __proto__: null, base36: iv, base36upper: ov });
const cv = so({ name: "base58btc", prefix: "z", alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz" }), lv = so({ name: "base58flickr", prefix: "Z", alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ" });
var dv = Object.freeze({ __proto__: null, base58btc: cv, base58flickr: lv });
const uv = mt({ prefix: "m", name: "base64", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", bitsPerChar: 6 }), hv = mt({ prefix: "M", name: "base64pad", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", bitsPerChar: 6 }), pv = mt({ prefix: "u", name: "base64url", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_", bitsPerChar: 6 }), fv = mt({ prefix: "U", name: "base64urlpad", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=", bitsPerChar: 6 });
var gv = Object.freeze({ __proto__: null, base64: uv, base64pad: hv, base64url: pv, base64urlpad: fv });
const hp = Array.from("🚀🪐☄🛰🌌🌑🌒🌓🌔🌕🌖🌗🌘🌍🌏🌎🐉☀💻🖥💾💿😂❤😍🤣😊🙏💕😭😘👍😅👏😁🔥🥰💔💖💙😢🤔😆🙄💪😉☺👌🤗💜😔😎😇🌹🤦🎉💞✌✨🤷😱😌🌸🙌😋💗💚😏💛🙂💓🤩😄😀🖤😃💯🙈👇🎶😒🤭❣😜💋👀😪😑💥🙋😞😩😡🤪👊🥳😥🤤👉💃😳✋😚😝😴🌟😬🙃🍀🌷😻😓⭐✅🥺🌈😈🤘💦✔😣🏃💐☹🎊💘😠☝😕🌺🎂🌻😐🖕💝🙊😹🗣💫💀👑🎵🤞😛🔴😤🌼😫⚽🤙☕🏆🤫👈😮🙆🍻🍃🐶💁😲🌿🧡🎁⚡🌞🎈❌✊👋😰🤨😶🤝🚶💰🍓💢🤟🙁🚨💨🤬✈🎀🍺🤓😙💟🌱😖👶🥴▶➡❓💎💸⬇😨🌚🦋😷🕺⚠🙅😟😵👎🤲🤠🤧📌🔵💅🧐🐾🍒😗🤑🌊🤯🐷☎💧😯💆👆🎤🙇🍑❄🌴💣🐸💌📍🥀🤢👅💡💩👐📸👻🤐🤮🎼🥵🚩🍎🍊👼💍📣🥂"), mv = hp.reduce((s, e, t) => (s[t] = e, s), []), wv = hp.reduce((s, e, t) => (s[e.codePointAt(0)] = t, s), []);
function yv(s) {
  return s.reduce((e, t) => (e += mv[t], e), "");
}
function Ev(s) {
  const e = [];
  for (const t of s) {
    const r = wv[t.codePointAt(0)];
    if (r === void 0) throw new Error(`Non-base256emoji character: ${t}`);
    e.push(r);
  }
  return new Uint8Array(e);
}
const bv = pa({ prefix: "🚀", name: "base256emoji", encode: yv, decode: Ev });
var vv = Object.freeze({ __proto__: null, base256emoji: bv }), Cv = pp, kd = 128, _v = -128, Av = Math.pow(2, 31);
function pp(s, e, t) {
  e = e || [], t = t || 0;
  for (var r = t; s >= Av; ) e[t++] = s & 255 | kd, s /= 128;
  for (; s & _v; ) e[t++] = s & 255 | kd, s >>>= 7;
  return e[t] = s | 0, pp.bytes = t - r + 1, e;
}
var Iv = bc, Sv = 128, Ud = 127;
function bc(s, r) {
  var t = 0, r = r || 0, n = 0, i = r, o, a = s.length;
  do {
    if (i >= a) throw bc.bytes = 0, new RangeError("Could not decode varint");
    o = s[i++], t += n < 28 ? (o & Ud) << n : (o & Ud) * Math.pow(2, n), n += 7;
  } while (o >= Sv);
  return bc.bytes = i - r, t;
}
var Nv = Math.pow(2, 7), Tv = Math.pow(2, 14), Rv = Math.pow(2, 21), Pv = Math.pow(2, 28), Ov = Math.pow(2, 35), xv = Math.pow(2, 42), kv = Math.pow(2, 49), Uv = Math.pow(2, 56), Dv = Math.pow(2, 63), $v = function(s) {
  return s < Nv ? 1 : s < Tv ? 2 : s < Rv ? 3 : s < Pv ? 4 : s < Ov ? 5 : s < xv ? 6 : s < kv ? 7 : s < Uv ? 8 : s < Dv ? 9 : 10;
}, Lv = { encode: Cv, decode: Iv, encodingLength: $v }, fp = Lv;
const Dd = (s, e, t = 0) => (fp.encode(s, e, t), e), $d = (s) => fp.encodingLength(s), vc = (s, e) => {
  const t = e.byteLength, r = $d(s), n = r + $d(t), i = new Uint8Array(n + t);
  return Dd(s, i, 0), Dd(t, i, r), i.set(e, n), new Mv(s, t, e, i);
};
class Mv {
  constructor(e, t, r, n) {
    this.code = e, this.size = t, this.digest = r, this.bytes = n;
  }
}
const gp = ({ name: s, code: e, encode: t }) => new Bv(s, e, t);
class Bv {
  constructor(e, t, r) {
    this.name = e, this.code = t, this.encode = r;
  }
  digest(e) {
    if (e instanceof Uint8Array) {
      const t = this.encode(e);
      return t instanceof Uint8Array ? vc(this.code, t) : t.then((r) => vc(this.code, r));
    } else throw Error("Unknown type, must be binary type");
  }
}
const mp = (s) => async (e) => new Uint8Array(await crypto.subtle.digest(s, e)), Fv = gp({ name: "sha2-256", code: 18, encode: mp("SHA-256") }), jv = gp({ name: "sha2-512", code: 19, encode: mp("SHA-512") });
var qv = Object.freeze({ __proto__: null, sha256: Fv, sha512: jv });
const wp = 0, Wv = "identity", yp = dp, Hv = (s) => vc(wp, yp(s)), zv = { code: wp, name: Wv, encode: yp, digest: Hv };
var Vv = Object.freeze({ __proto__: null, identity: zv });
new TextEncoder(), new TextDecoder();
const Ld = { ...Bb, ...jb, ...Wb, ...zb, ...Gb, ...nv, ...av, ...dv, ...gv, ...vv };
({ ...qv, ...Vv });
function Ep(s) {
  return globalThis.Buffer != null ? new Uint8Array(s.buffer, s.byteOffset, s.byteLength) : s;
}
function Kv(s = 0) {
  return globalThis.Buffer != null && globalThis.Buffer.allocUnsafe != null ? Ep(globalThis.Buffer.allocUnsafe(s)) : new Uint8Array(s);
}
function bp(s, e, t, r) {
  return { name: s, prefix: e, encoder: { name: s, prefix: e, encode: t }, decoder: { decode: r } };
}
const Md = bp("utf8", "u", (s) => "u" + new TextDecoder("utf8").decode(s), (s) => new TextEncoder().encode(s.substring(1))), $a = bp("ascii", "a", (s) => {
  let e = "a";
  for (let t = 0; t < s.length; t++) e += String.fromCharCode(s[t]);
  return e;
}, (s) => {
  s = s.substring(1);
  const e = Kv(s.length);
  for (let t = 0; t < s.length; t++) e[t] = s.charCodeAt(t);
  return e;
}), Gv = { utf8: Md, "utf-8": Md, hex: Ld.base16, latin1: $a, ascii: $a, binary: $a, ...Ld };
function Yv(s, e = "utf8") {
  const t = Gv[e];
  if (!t) throw new Error(`Unsupported encoding "${e}"`);
  return (e === "utf8" || e === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null ? Ep(globalThis.Buffer.from(s, "utf-8")) : t.decoder.decode(`${t.prefix}${s}`);
}
var Zv = Object.defineProperty, Jv = (s, e, t) => e in s ? Zv(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t, Rs = (s, e, t) => Jv(s, typeof e != "symbol" ? e + "" : e, t);
class Xv {
  constructor(e, t) {
    this.core = e, this.logger = t, Rs(this, "keychain", /* @__PURE__ */ new Map()), Rs(this, "name", XE), Rs(this, "version", QE), Rs(this, "initialized", !1), Rs(this, "storagePrefix", Bs), Rs(this, "init", async () => {
      if (!this.initialized) {
        const r = await this.getKeyChain();
        typeof r < "u" && (this.keychain = r), this.initialized = !0;
      }
    }), Rs(this, "has", (r) => (this.isInitialized(), this.keychain.has(r))), Rs(this, "set", async (r, n) => {
      this.isInitialized(), this.keychain.set(r, n), await this.persist();
    }), Rs(this, "get", (r) => {
      this.isInitialized();
      const n = this.keychain.get(r);
      if (typeof n > "u") {
        const { message: i } = M("NO_MATCHING_KEY", `${this.name}: ${r}`);
        throw new Error(i);
      }
      return n;
    }), Rs(this, "del", async (r) => {
      this.isInitialized(), this.keychain.delete(r), await this.persist();
    }), this.core = e, this.logger = At(t, this.name);
  }
  get context() {
    return Xt(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  async setKeyChain(e) {
    await this.core.storage.setItem(this.storageKey, ic(e));
  }
  async getKeyChain() {
    const e = await this.core.storage.getItem(this.storageKey);
    return typeof e < "u" ? oc(e) : void 0;
  }
  async persist() {
    await this.setKeyChain(this.keychain);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = M("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
}
var Qv = Object.defineProperty, eC = (s, e, t) => e in s ? Qv(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t, ut = (s, e, t) => eC(s, typeof e != "symbol" ? e + "" : e, t);
class tC {
  constructor(e, t, r) {
    this.core = e, this.logger = t, ut(this, "name", ZE), ut(this, "keychain"), ut(this, "randomSessionIdentifier", mc()), ut(this, "initialized", !1), ut(this, "init", async () => {
      this.initialized || (await this.keychain.init(), this.initialized = !0);
    }), ut(this, "hasKeys", (n) => (this.isInitialized(), this.keychain.has(n))), ut(this, "getClientId", async () => {
      this.isInitialized();
      const n = await this.getClientSeed(), i = bl(n);
      return nf(i.publicKey);
    }), ut(this, "generateKeyPair", () => {
      this.isInitialized();
      const n = L0();
      return this.setPrivateKey(n.publicKey, n.privateKey);
    }), ut(this, "signJWT", async (n) => {
      this.isInitialized();
      const i = await this.getClientSeed(), o = bl(i), a = this.randomSessionIdentifier;
      return await of(a, n, JE, o);
    }), ut(this, "generateSharedKey", (n, i, o) => {
      this.isInitialized();
      const a = this.getPrivateKey(n), c = M0(a, i);
      return this.setSymKey(c, o);
    }), ut(this, "setSymKey", async (n, i) => {
      this.isInitialized();
      const o = i || No(n);
      return await this.keychain.set(o, n), o;
    }), ut(this, "deleteKeyPair", async (n) => {
      this.isInitialized(), await this.keychain.del(n);
    }), ut(this, "deleteSymKey", async (n) => {
      this.isInitialized(), await this.keychain.del(n);
    }), ut(this, "encode", async (n, i, o) => {
      this.isInitialized();
      const a = sp(o), c = af(i);
      if (yd(a)) return j0(c, o == null ? void 0 : o.encoding);
      if (wd(a)) {
        const p = a.senderPublicKey, g = a.receiverPublicKey;
        n = await this.generateSharedKey(p, g);
      }
      const l = this.getSymKey(n), { type: d, senderPublicKey: u } = a;
      return B0({ type: d, symKey: l, message: c, senderPublicKey: u, encoding: o == null ? void 0 : o.encoding });
    }), ut(this, "decode", async (n, i, o) => {
      this.isInitialized();
      const a = W0(i, o);
      if (yd(a)) {
        const c = q0(i, o == null ? void 0 : o.encoding);
        return vl(c);
      }
      if (wd(a)) {
        const c = a.receiverPublicKey, l = a.senderPublicKey;
        n = await this.generateSharedKey(c, l);
      }
      try {
        const c = this.getSymKey(n), l = F0({ symKey: c, encoded: i, encoding: o == null ? void 0 : o.encoding });
        return vl(l);
      } catch (c) {
        this.logger.error(`Failed to decode message from topic: '${n}', clientId: '${await this.getClientId()}'`), this.logger.error(c);
      }
    }), ut(this, "getPayloadType", (n, i = Es) => {
      const o = $i({ encoded: n, encoding: i });
      return Yr(o.type);
    }), ut(this, "getPayloadSenderPublicKey", (n, i = Es) => {
      const o = $i({ encoded: n, encoding: i });
      return o.senderPublicKey ? qt(o.senderPublicKey, Rt) : void 0;
    }), this.core = e, this.logger = At(t, this.name), this.keychain = r || new Xv(this.core, this.logger);
  }
  get context() {
    return Xt(this.logger);
  }
  async setPrivateKey(e, t) {
    return await this.keychain.set(e, t), e;
  }
  getPrivateKey(e) {
    return this.keychain.get(e);
  }
  async getClientSeed() {
    let e = "";
    try {
      e = this.keychain.get(Pd);
    } catch {
      e = mc(), await this.keychain.set(Pd, e);
    }
    return Yv(e, "base16");
  }
  getSymKey(e) {
    return this.keychain.get(e);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = M("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
}
var sC = Object.defineProperty, rC = Object.defineProperties, nC = Object.getOwnPropertyDescriptors, Bd = Object.getOwnPropertySymbols, iC = Object.prototype.hasOwnProperty, oC = Object.prototype.propertyIsEnumerable, Cc = (s, e, t) => e in s ? sC(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t, aC = (s, e) => {
  for (var t in e || (e = {})) iC.call(e, t) && Cc(s, t, e[t]);
  if (Bd) for (var t of Bd(e)) oC.call(e, t) && Cc(s, t, e[t]);
  return s;
}, cC = (s, e) => rC(s, nC(e)), Ht = (s, e, t) => Cc(s, typeof e != "symbol" ? e + "" : e, t);
class lC extends Pg {
  constructor(e, t) {
    super(e, t), this.logger = e, this.core = t, Ht(this, "messages", /* @__PURE__ */ new Map()), Ht(this, "messagesWithoutClientAck", /* @__PURE__ */ new Map()), Ht(this, "name", eb), Ht(this, "version", tb), Ht(this, "initialized", !1), Ht(this, "storagePrefix", Bs), Ht(this, "init", async () => {
      if (!this.initialized) {
        this.logger.trace("Initialized");
        try {
          const r = await this.getRelayerMessages();
          typeof r < "u" && (this.messages = r);
          const n = await this.getRelayerMessagesWithoutClientAck();
          typeof n < "u" && (this.messagesWithoutClientAck = n), this.logger.debug(`Successfully Restored records for ${this.name}`), this.logger.trace({ type: "method", method: "restore", size: this.messages.size });
        } catch (r) {
          this.logger.debug(`Failed to Restore records for ${this.name}`), this.logger.error(r);
        } finally {
          this.initialized = !0;
        }
      }
    }), Ht(this, "set", async (r, n, i) => {
      this.isInitialized();
      const o = Us(n);
      let a = this.messages.get(r);
      if (typeof a > "u" && (a = {}), typeof a[o] < "u") return o;
      if (a[o] = n, this.messages.set(r, a), i === To.inbound) {
        const c = this.messagesWithoutClientAck.get(r) || {};
        this.messagesWithoutClientAck.set(r, cC(aC({}, c), { [o]: n }));
      }
      return await this.persist(), o;
    }), Ht(this, "get", (r) => {
      this.isInitialized();
      let n = this.messages.get(r);
      return typeof n > "u" && (n = {}), n;
    }), Ht(this, "getWithoutAck", (r) => {
      this.isInitialized();
      const n = {};
      for (const i of r) {
        const o = this.messagesWithoutClientAck.get(i) || {};
        n[i] = Object.values(o);
      }
      return n;
    }), Ht(this, "has", (r, n) => {
      this.isInitialized();
      const i = this.get(r), o = Us(n);
      return typeof i[o] < "u";
    }), Ht(this, "ack", async (r, n) => {
      this.isInitialized();
      const i = this.messagesWithoutClientAck.get(r);
      if (typeof i > "u") return;
      const o = Us(n);
      delete i[o], Object.keys(i).length === 0 ? this.messagesWithoutClientAck.delete(r) : this.messagesWithoutClientAck.set(r, i), await this.persist();
    }), Ht(this, "del", async (r) => {
      this.isInitialized(), this.messages.delete(r), this.messagesWithoutClientAck.delete(r), await this.persist();
    }), this.logger = At(e, this.name), this.core = t;
  }
  get context() {
    return Xt(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  get storageKeyWithoutClientAck() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name + "_withoutClientAck";
  }
  async setRelayerMessages(e) {
    await this.core.storage.setItem(this.storageKey, ic(e));
  }
  async setRelayerMessagesWithoutClientAck(e) {
    await this.core.storage.setItem(this.storageKeyWithoutClientAck, ic(e));
  }
  async getRelayerMessages() {
    const e = await this.core.storage.getItem(this.storageKey);
    return typeof e < "u" ? oc(e) : void 0;
  }
  async getRelayerMessagesWithoutClientAck() {
    const e = await this.core.storage.getItem(this.storageKeyWithoutClientAck);
    return typeof e < "u" ? oc(e) : void 0;
  }
  async persist() {
    await this.setRelayerMessages(this.messages), await this.setRelayerMessagesWithoutClientAck(this.messagesWithoutClientAck);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = M("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
}
var dC = Object.defineProperty, uC = Object.defineProperties, hC = Object.getOwnPropertyDescriptors, Fd = Object.getOwnPropertySymbols, pC = Object.prototype.hasOwnProperty, fC = Object.prototype.propertyIsEnumerable, _c = (s, e, t) => e in s ? dC(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t, yo = (s, e) => {
  for (var t in e || (e = {})) pC.call(e, t) && _c(s, t, e[t]);
  if (Fd) for (var t of Fd(e)) fC.call(e, t) && _c(s, t, e[t]);
  return s;
}, La = (s, e) => uC(s, hC(e)), fs = (s, e, t) => _c(s, typeof e != "symbol" ? e + "" : e, t);
class gC extends Og {
  constructor(e, t) {
    super(e, t), this.relayer = e, this.logger = t, fs(this, "events", new Qr.EventEmitter()), fs(this, "name", sb), fs(this, "queue", /* @__PURE__ */ new Map()), fs(this, "publishTimeout", B.toMiliseconds(B.ONE_MINUTE)), fs(this, "initialPublishTimeout", B.toMiliseconds(B.ONE_SECOND * 15)), fs(this, "needsTransportRestart", !1), fs(this, "publish", async (r, n, i) => {
      var o;
      this.logger.debug("Publishing Payload"), this.logger.trace({ type: "method", method: "publish", params: { topic: r, message: n, opts: i } });
      const a = (i == null ? void 0 : i.ttl) || Od, c = zo(i), l = (i == null ? void 0 : i.prompt) || !1, d = (i == null ? void 0 : i.tag) || 0, u = (i == null ? void 0 : i.id) || Nn().toString(), p = { topic: r, message: n, opts: { ttl: a, relay: c, prompt: l, tag: d, id: u, attestation: i == null ? void 0 : i.attestation, tvf: i == null ? void 0 : i.tvf } }, g = `Failed to publish payload, please try again. id:${u} tag:${d}`;
      try {
        const w = new Promise(async (m) => {
          const y = ({ id: _ }) => {
            p.opts.id === _ && (this.removeRequestFromQueue(_), this.relayer.events.removeListener(ct.publish, y), m(p));
          };
          this.relayer.events.on(ct.publish, y);
          const C = vr(new Promise((_, U) => {
            this.rpcPublish({ topic: r, message: n, ttl: a, prompt: l, tag: d, id: u, attestation: i == null ? void 0 : i.attestation, tvf: i == null ? void 0 : i.tvf }).then(_).catch((j) => {
              this.logger.warn(j, j == null ? void 0 : j.message), U(j);
            });
          }), this.initialPublishTimeout, `Failed initial publish, retrying.... id:${u} tag:${d}`);
          try {
            await C, this.events.removeListener(ct.publish, y);
          } catch (_) {
            this.queue.set(u, La(yo({}, p), { attempt: 1 })), this.logger.warn(_, _ == null ? void 0 : _.message);
          }
        });
        this.logger.trace({ type: "method", method: "publish", params: { id: u, topic: r, message: n, opts: i } }), await vr(w, this.publishTimeout, g);
      } catch (w) {
        if (this.logger.debug("Failed to Publish Payload"), this.logger.error(w), (o = i == null ? void 0 : i.internal) != null && o.throwOnFailedPublish) throw w;
      } finally {
        this.queue.delete(u);
      }
    }), fs(this, "on", (r, n) => {
      this.events.on(r, n);
    }), fs(this, "once", (r, n) => {
      this.events.once(r, n);
    }), fs(this, "off", (r, n) => {
      this.events.off(r, n);
    }), fs(this, "removeListener", (r, n) => {
      this.events.removeListener(r, n);
    }), this.relayer = e, this.logger = At(t, this.name), this.registerEventListeners();
  }
  get context() {
    return Xt(this.logger);
  }
  async rpcPublish(e) {
    var t, r, n, i;
    const { topic: o, message: a, ttl: c = Od, prompt: l, tag: d, id: u, attestation: p, tvf: g } = e, w = { method: wi(zo().protocol).publish, params: yo({ topic: o, message: a, ttl: c, prompt: l, tag: d, attestation: p }, g), id: u };
    ft((t = w.params) == null ? void 0 : t.prompt) && ((r = w.params) == null || delete r.prompt), ft((n = w.params) == null ? void 0 : n.tag) && ((i = w.params) == null || delete i.tag), this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "message", direction: "outgoing", request: w });
    const m = await this.relayer.request(w);
    return this.relayer.events.emit(ct.publish, e), this.logger.debug("Successfully Published Payload"), m;
  }
  removeRequestFromQueue(e) {
    this.queue.delete(e);
  }
  checkQueue() {
    this.queue.forEach(async (e, t) => {
      const r = e.attempt + 1;
      this.queue.set(t, La(yo({}, e), { attempt: r }));
      const { topic: n, message: i, opts: o, attestation: a } = e;
      this.logger.warn({}, `Publisher: queue->publishing: ${e.opts.id}, tag: ${e.opts.tag}, attempt: ${r}`), await this.rpcPublish(La(yo({}, e), { topic: n, message: i, ttl: o.ttl, prompt: o.prompt, tag: o.tag, id: o.id, attestation: a, tvf: o.tvf })), this.logger.warn({}, `Publisher: queue->published: ${e.opts.id}`);
    });
  }
  registerEventListeners() {
    this.relayer.core.heartbeat.on(zn.pulse, () => {
      if (this.needsTransportRestart) {
        this.needsTransportRestart = !1, this.relayer.events.emit(ct.connection_stalled);
        return;
      }
      this.checkQueue();
    }), this.relayer.on(ct.message_ack, (e) => {
      this.removeRequestFromQueue(e.id.toString());
    });
  }
}
var mC = Object.defineProperty, wC = (s, e, t) => e in s ? mC(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t, ln = (s, e, t) => wC(s, typeof e != "symbol" ? e + "" : e, t);
class yC {
  constructor() {
    ln(this, "map", /* @__PURE__ */ new Map()), ln(this, "set", (e, t) => {
      const r = this.get(e);
      this.exists(e, t) || this.map.set(e, [...r, t]);
    }), ln(this, "get", (e) => this.map.get(e) || []), ln(this, "exists", (e, t) => this.get(e).includes(t)), ln(this, "delete", (e, t) => {
      if (typeof t > "u") {
        this.map.delete(e);
        return;
      }
      if (!this.map.has(e)) return;
      const r = this.get(e);
      if (!this.exists(e, t)) return;
      const n = r.filter((i) => i !== t);
      if (!n.length) {
        this.map.delete(e);
        return;
      }
      this.map.set(e, n);
    }), ln(this, "clear", () => {
      this.map.clear();
    });
  }
  get topics() {
    return Array.from(this.map.keys());
  }
}
var EC = Object.defineProperty, bC = Object.defineProperties, vC = Object.getOwnPropertyDescriptors, jd = Object.getOwnPropertySymbols, CC = Object.prototype.hasOwnProperty, _C = Object.prototype.propertyIsEnumerable, Ac = (s, e, t) => e in s ? EC(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t, ci = (s, e) => {
  for (var t in e || (e = {})) CC.call(e, t) && Ac(s, t, e[t]);
  if (jd) for (var t of jd(e)) _C.call(e, t) && Ac(s, t, e[t]);
  return s;
}, Ma = (s, e) => bC(s, vC(e)), je = (s, e, t) => Ac(s, typeof e != "symbol" ? e + "" : e, t);
class AC extends Ug {
  constructor(e, t) {
    super(e, t), this.relayer = e, this.logger = t, je(this, "subscriptions", /* @__PURE__ */ new Map()), je(this, "topicMap", new yC()), je(this, "events", new Qr.EventEmitter()), je(this, "name", lb), je(this, "version", db), je(this, "pending", /* @__PURE__ */ new Map()), je(this, "cached", []), je(this, "initialized", !1), je(this, "storagePrefix", Bs), je(this, "subscribeTimeout", B.toMiliseconds(B.ONE_MINUTE)), je(this, "initialSubscribeTimeout", B.toMiliseconds(B.ONE_SECOND * 15)), je(this, "clientId"), je(this, "batchSubscribeTopicsLimit", 500), je(this, "init", async () => {
      this.initialized || (this.logger.trace("Initialized"), this.registerEventListeners(), await this.restore()), this.initialized = !0;
    }), je(this, "subscribe", async (r, n) => {
      this.isInitialized(), this.logger.debug("Subscribing Topic"), this.logger.trace({ type: "method", method: "subscribe", params: { topic: r, opts: n } });
      try {
        const i = zo(n), o = { topic: r, relay: i, transportType: n == null ? void 0 : n.transportType };
        this.pending.set(r, o);
        const a = await this.rpcSubscribe(r, i, n);
        return typeof a == "string" && (this.onSubscribe(a, o), this.logger.debug("Successfully Subscribed Topic"), this.logger.trace({ type: "method", method: "subscribe", params: { topic: r, opts: n } })), a;
      } catch (i) {
        throw this.logger.debug("Failed to Subscribe Topic"), this.logger.error(i), i;
      }
    }), je(this, "unsubscribe", async (r, n) => {
      this.isInitialized(), typeof (n == null ? void 0 : n.id) < "u" ? await this.unsubscribeById(r, n.id, n) : await this.unsubscribeByTopic(r, n);
    }), je(this, "isSubscribed", (r) => new Promise((n) => {
      n(this.topicMap.topics.includes(r));
    })), je(this, "isKnownTopic", (r) => new Promise((n) => {
      n(this.topicMap.topics.includes(r) || this.pending.has(r) || this.cached.some((i) => i.topic === r));
    })), je(this, "on", (r, n) => {
      this.events.on(r, n);
    }), je(this, "once", (r, n) => {
      this.events.once(r, n);
    }), je(this, "off", (r, n) => {
      this.events.off(r, n);
    }), je(this, "removeListener", (r, n) => {
      this.events.removeListener(r, n);
    }), je(this, "start", async () => {
      await this.onConnect();
    }), je(this, "stop", async () => {
      await this.onDisconnect();
    }), je(this, "restart", async () => {
      await this.restore(), await this.onRestart();
    }), je(this, "checkPending", async () => {
      if (this.pending.size === 0 && (!this.initialized || !this.relayer.connected)) return;
      const r = [];
      this.pending.forEach((n) => {
        r.push(n);
      }), await this.batchSubscribe(r);
    }), je(this, "registerEventListeners", () => {
      this.relayer.core.heartbeat.on(zn.pulse, async () => {
        await this.checkPending();
      }), this.events.on(zt.created, async (r) => {
        const n = zt.created;
        this.logger.info(`Emitting ${n}`), this.logger.debug({ type: "event", event: n, data: r }), await this.persist();
      }), this.events.on(zt.deleted, async (r) => {
        const n = zt.deleted;
        this.logger.info(`Emitting ${n}`), this.logger.debug({ type: "event", event: n, data: r }), await this.persist();
      });
    }), this.relayer = e, this.logger = At(t, this.name), this.clientId = "";
  }
  get context() {
    return Xt(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.relayer.core.customStoragePrefix + "//" + this.name;
  }
  get length() {
    return this.subscriptions.size;
  }
  get ids() {
    return Array.from(this.subscriptions.keys());
  }
  get values() {
    return Array.from(this.subscriptions.values());
  }
  get topics() {
    return this.topicMap.topics;
  }
  get hasAnyTopics() {
    return this.topicMap.topics.length > 0 || this.pending.size > 0 || this.cached.length > 0 || this.subscriptions.size > 0;
  }
  hasSubscription(e, t) {
    let r = !1;
    try {
      r = this.getSubscription(e).topic === t;
    } catch {
    }
    return r;
  }
  reset() {
    this.cached = [], this.initialized = !0;
  }
  onDisable() {
    this.values.length > 0 && (this.cached = this.values), this.subscriptions.clear(), this.topicMap.clear();
  }
  async unsubscribeByTopic(e, t) {
    const r = this.topicMap.get(e);
    await Promise.all(r.map(async (n) => await this.unsubscribeById(e, n, t)));
  }
  async unsubscribeById(e, t, r) {
    this.logger.debug("Unsubscribing Topic"), this.logger.trace({ type: "method", method: "unsubscribe", params: { topic: e, id: t, opts: r } });
    try {
      const n = zo(r);
      await this.restartToComplete({ topic: e, id: t, relay: n }), await this.rpcUnsubscribe(e, t, n);
      const i = Ke("USER_DISCONNECTED", `${this.name}, ${e}`);
      await this.onUnsubscribe(e, t, i), this.logger.debug("Successfully Unsubscribed Topic"), this.logger.trace({ type: "method", method: "unsubscribe", params: { topic: e, id: t, opts: r } });
    } catch (n) {
      throw this.logger.debug("Failed to Unsubscribe Topic"), this.logger.error(n), n;
    }
  }
  async rpcSubscribe(e, t, r) {
    var n;
    (!r || (r == null ? void 0 : r.transportType) === ze.relay) && await this.restartToComplete({ topic: e, id: e, relay: t });
    const i = { method: wi(t.protocol).subscribe, params: { topic: e } };
    this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "payload", direction: "outgoing", request: i });
    const o = (n = r == null ? void 0 : r.internal) == null ? void 0 : n.throwOnFailedPublish;
    try {
      const a = await this.getSubscriptionId(e);
      if ((r == null ? void 0 : r.transportType) === ze.link_mode) return setTimeout(() => {
        (this.relayer.connected || this.relayer.connecting) && this.relayer.request(i).catch((d) => this.logger.warn(d));
      }, B.toMiliseconds(B.ONE_SECOND)), a;
      const c = new Promise(async (d) => {
        const u = (p) => {
          p.topic === e && (this.events.removeListener(zt.created, u), d(p.id));
        };
        this.events.on(zt.created, u);
        try {
          const p = await vr(new Promise((g, w) => {
            this.relayer.request(i).catch((m) => {
              this.logger.warn(m, m == null ? void 0 : m.message), w(m);
            }).then(g);
          }), this.initialSubscribeTimeout, `Subscribing to ${e} failed, please try again`);
          this.events.removeListener(zt.created, u), d(p);
        } catch {
        }
      }), l = await vr(c, this.subscribeTimeout, `Subscribing to ${e} failed, please try again`);
      if (!l && o) throw new Error(`Subscribing to ${e} failed, please try again`);
      return l ? a : null;
    } catch (a) {
      if (this.logger.debug("Outgoing Relay Subscribe Payload stalled"), this.relayer.events.emit(ct.connection_stalled), o) throw a;
    }
    return null;
  }
  async rpcBatchSubscribe(e) {
    if (!e.length) return;
    const t = e[0].relay, r = { method: wi(t.protocol).batchSubscribe, params: { topics: e.map((n) => n.topic) } };
    this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "payload", direction: "outgoing", request: r });
    try {
      await await vr(new Promise((n) => {
        this.relayer.request(r).catch((i) => this.logger.warn(i)).then(n);
      }), this.subscribeTimeout, "rpcBatchSubscribe failed, please try again");
    } catch {
      this.relayer.events.emit(ct.connection_stalled);
    }
  }
  async rpcBatchFetchMessages(e) {
    if (!e.length) return;
    const t = e[0].relay, r = { method: wi(t.protocol).batchFetchMessages, params: { topics: e.map((i) => i.topic) } };
    this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "payload", direction: "outgoing", request: r });
    let n;
    try {
      n = await await vr(new Promise((i, o) => {
        this.relayer.request(r).catch((a) => {
          this.logger.warn(a), o(a);
        }).then(i);
      }), this.subscribeTimeout, "rpcBatchFetchMessages failed, please try again");
    } catch {
      this.relayer.events.emit(ct.connection_stalled);
    }
    return n;
  }
  rpcUnsubscribe(e, t, r) {
    const n = { method: wi(r.protocol).unsubscribe, params: { topic: e, id: t } };
    return this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "payload", direction: "outgoing", request: n }), this.relayer.request(n);
  }
  onSubscribe(e, t) {
    this.setSubscription(e, Ma(ci({}, t), { id: e })), this.pending.delete(t.topic);
  }
  onBatchSubscribe(e) {
    e.length && e.forEach((t) => {
      this.setSubscription(t.id, ci({}, t)), this.pending.delete(t.topic);
    });
  }
  async onUnsubscribe(e, t, r) {
    this.events.removeAllListeners(t), this.hasSubscription(t, e) && this.deleteSubscription(t, r), await this.relayer.messages.del(e);
  }
  async setRelayerSubscriptions(e) {
    await this.relayer.core.storage.setItem(this.storageKey, e);
  }
  async getRelayerSubscriptions() {
    return await this.relayer.core.storage.getItem(this.storageKey);
  }
  setSubscription(e, t) {
    this.logger.debug("Setting subscription"), this.logger.trace({ type: "method", method: "setSubscription", id: e, subscription: t }), this.addSubscription(e, t);
  }
  addSubscription(e, t) {
    this.subscriptions.set(e, ci({}, t)), this.topicMap.set(t.topic, e), this.events.emit(zt.created, t);
  }
  getSubscription(e) {
    this.logger.debug("Getting subscription"), this.logger.trace({ type: "method", method: "getSubscription", id: e });
    const t = this.subscriptions.get(e);
    if (!t) {
      const { message: r } = M("NO_MATCHING_KEY", `${this.name}: ${e}`);
      throw new Error(r);
    }
    return t;
  }
  deleteSubscription(e, t) {
    this.logger.debug("Deleting subscription"), this.logger.trace({ type: "method", method: "deleteSubscription", id: e, reason: t });
    const r = this.getSubscription(e);
    this.subscriptions.delete(e), this.topicMap.delete(r.topic, e), this.events.emit(zt.deleted, Ma(ci({}, r), { reason: t }));
  }
  async persist() {
    await this.setRelayerSubscriptions(this.values), this.events.emit(zt.sync);
  }
  async onRestart() {
    if (this.cached.length) {
      const e = [...this.cached], t = Math.ceil(this.cached.length / this.batchSubscribeTopicsLimit);
      for (let r = 0; r < t; r++) {
        const n = e.splice(0, this.batchSubscribeTopicsLimit);
        await this.batchSubscribe(n);
      }
    }
    this.events.emit(zt.resubscribed);
  }
  async restore() {
    try {
      const e = await this.getRelayerSubscriptions();
      if (typeof e > "u" || !e.length) return;
      if (this.subscriptions.size) {
        const { message: t } = M("RESTORE_WILL_OVERRIDE", this.name);
        throw this.logger.error(t), this.logger.error(`${this.name}: ${JSON.stringify(this.values)}`), new Error(t);
      }
      this.cached = e, this.logger.debug(`Successfully Restored subscriptions for ${this.name}`), this.logger.trace({ type: "method", method: "restore", subscriptions: this.values });
    } catch (e) {
      this.logger.debug(`Failed to Restore subscriptions for ${this.name}`), this.logger.error(e);
    }
  }
  async batchSubscribe(e) {
    e.length && (await this.rpcBatchSubscribe(e), this.onBatchSubscribe(await Promise.all(e.map(async (t) => Ma(ci({}, t), { id: await this.getSubscriptionId(t.topic) })))));
  }
  async batchFetchMessages(e) {
    if (!e.length) return;
    this.logger.trace(`Fetching batch messages for ${e.length} subscriptions`);
    const t = await this.rpcBatchFetchMessages(e);
    t && t.messages && (await ow(B.toMiliseconds(B.ONE_SECOND)), await this.relayer.handleBatchMessageEvents(t.messages));
  }
  async onConnect() {
    await this.restart(), this.reset();
  }
  onDisconnect() {
    this.onDisable();
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = M("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
  async restartToComplete(e) {
    !this.relayer.connected && !this.relayer.connecting && (this.cached.push(e), await this.relayer.transportOpen());
  }
  async getClientId() {
    return this.clientId || (this.clientId = await this.relayer.core.crypto.getClientId()), this.clientId;
  }
  async getSubscriptionId(e) {
    return Us(e + await this.getClientId());
  }
}
var IC = Object.defineProperty, qd = Object.getOwnPropertySymbols, SC = Object.prototype.hasOwnProperty, NC = Object.prototype.propertyIsEnumerable, Ic = (s, e, t) => e in s ? IC(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t, Wd = (s, e) => {
  for (var t in e || (e = {})) SC.call(e, t) && Ic(s, t, e[t]);
  if (qd) for (var t of qd(e)) NC.call(e, t) && Ic(s, t, e[t]);
  return s;
}, Ne = (s, e, t) => Ic(s, typeof e != "symbol" ? e + "" : e, t);
class TC extends xg {
  constructor(e) {
    super(e), Ne(this, "protocol", "wc"), Ne(this, "version", 2), Ne(this, "core"), Ne(this, "logger"), Ne(this, "events", new Qr.EventEmitter()), Ne(this, "provider"), Ne(this, "messages"), Ne(this, "subscriber"), Ne(this, "publisher"), Ne(this, "name", nb), Ne(this, "transportExplicitlyClosed", !1), Ne(this, "initialized", !1), Ne(this, "connectionAttemptInProgress", !1), Ne(this, "relayUrl"), Ne(this, "projectId"), Ne(this, "packageName"), Ne(this, "bundleId"), Ne(this, "hasExperiencedNetworkDisruption", !1), Ne(this, "pingTimeout"), Ne(this, "heartBeatTimeout", B.toMiliseconds(B.THIRTY_SECONDS + B.FIVE_SECONDS)), Ne(this, "reconnectTimeout"), Ne(this, "connectPromise"), Ne(this, "reconnectInProgress", !1), Ne(this, "requestsInFlight", []), Ne(this, "connectTimeout", B.toMiliseconds(B.ONE_SECOND * 15)), Ne(this, "request", async (t) => {
      var r, n;
      this.logger.debug("Publishing Request Payload");
      const i = t.id || Nn().toString();
      await this.toEstablishConnection();
      try {
        this.logger.trace({ id: i, method: t.method, topic: (r = t.params) == null ? void 0 : r.topic }, "relayer.request - publishing...");
        const o = `${i}:${((n = t.params) == null ? void 0 : n.tag) || ""}`;
        this.requestsInFlight.push(o);
        const a = await this.provider.request(t);
        return this.requestsInFlight = this.requestsInFlight.filter((c) => c !== o), a;
      } catch (o) {
        throw this.logger.debug(`Failed to Publish Request: ${i}`), o;
      }
    }), Ne(this, "resetPingTimeout", () => {
      jo() && (clearTimeout(this.pingTimeout), this.pingTimeout = setTimeout(() => {
        var t, r, n, i;
        try {
          this.logger.debug({}, "pingTimeout: Connection stalled, terminating..."), (i = (n = (r = (t = this.provider) == null ? void 0 : t.connection) == null ? void 0 : r.socket) == null ? void 0 : n.terminate) == null || i.call(n);
        } catch (o) {
          this.logger.warn(o, o == null ? void 0 : o.message);
        }
      }, this.heartBeatTimeout));
    }), Ne(this, "onPayloadHandler", (t) => {
      this.onProviderPayload(t), this.resetPingTimeout();
    }), Ne(this, "onConnectHandler", () => {
      this.logger.warn({}, "Relayer connected 🛜"), this.startPingTimeout(), this.events.emit(ct.connect);
    }), Ne(this, "onDisconnectHandler", () => {
      this.logger.warn({}, "Relayer disconnected 🛑"), this.requestsInFlight = [], this.onProviderDisconnect();
    }), Ne(this, "onProviderErrorHandler", (t) => {
      this.logger.fatal(`Fatal socket error: ${t.message}`), this.events.emit(ct.error, t), this.logger.fatal("Fatal socket error received, closing transport"), this.transportClose();
    }), Ne(this, "registerProviderListeners", () => {
      this.provider.on(ss.payload, this.onPayloadHandler), this.provider.on(ss.connect, this.onConnectHandler), this.provider.on(ss.disconnect, this.onDisconnectHandler), this.provider.on(ss.error, this.onProviderErrorHandler);
    }), this.core = e.core, this.logger = typeof e.logger < "u" && typeof e.logger != "string" ? At(e.logger, this.name) : Fc(Hn({ level: e.logger || rb })), this.messages = new lC(this.logger, e.core), this.subscriber = new AC(this, this.logger), this.publisher = new gC(this, this.logger), this.relayUrl = (e == null ? void 0 : e.relayUrl) || cp, this.projectId = e.projectId, Hm() ? this.packageName = Bl() : zm() && (this.bundleId = Bl()), this.provider = {};
  }
  async init() {
    this.logger.trace("Initialized"), this.registerEventListeners(), await Promise.all([this.messages.init(), this.subscriber.init()]), this.initialized = !0, this.transportOpen().catch((e) => this.logger.warn(e, e == null ? void 0 : e.message));
  }
  get context() {
    return Xt(this.logger);
  }
  get connected() {
    var e, t, r;
    return ((r = (t = (e = this.provider) == null ? void 0 : e.connection) == null ? void 0 : t.socket) == null ? void 0 : r.readyState) === 1 || !1;
  }
  get connecting() {
    var e, t, r;
    return ((r = (t = (e = this.provider) == null ? void 0 : e.connection) == null ? void 0 : t.socket) == null ? void 0 : r.readyState) === 0 || this.connectPromise !== void 0 || !1;
  }
  async publish(e, t, r) {
    this.isInitialized(), await this.publisher.publish(e, t, r), await this.recordMessageEvent({ topic: e, message: t, publishedAt: Date.now(), transportType: ze.relay }, To.outbound);
  }
  async subscribe(e, t) {
    var r, n, i;
    this.isInitialized(), (!(t != null && t.transportType) || (t == null ? void 0 : t.transportType) === "relay") && await this.toEstablishConnection();
    const o = typeof ((r = t == null ? void 0 : t.internal) == null ? void 0 : r.throwOnFailedPublish) > "u" ? !0 : (n = t == null ? void 0 : t.internal) == null ? void 0 : n.throwOnFailedPublish;
    let a = ((i = this.subscriber.topicMap.get(e)) == null ? void 0 : i[0]) || "", c;
    const l = (d) => {
      d.topic === e && (this.subscriber.off(zt.created, l), c());
    };
    return await Promise.all([new Promise((d) => {
      c = d, this.subscriber.on(zt.created, l);
    }), new Promise(async (d, u) => {
      a = await this.subscriber.subscribe(e, Wd({ internal: { throwOnFailedPublish: o } }, t)).catch((p) => {
        o && u(p);
      }) || a, d();
    })]), a;
  }
  async unsubscribe(e, t) {
    this.isInitialized(), await this.subscriber.unsubscribe(e, t);
  }
  on(e, t) {
    this.events.on(e, t);
  }
  once(e, t) {
    this.events.once(e, t);
  }
  off(e, t) {
    this.events.off(e, t);
  }
  removeListener(e, t) {
    this.events.removeListener(e, t);
  }
  async transportDisconnect() {
    this.provider.disconnect && (this.hasExperiencedNetworkDisruption || this.connected) ? await vr(this.provider.disconnect(), 2e3, "provider.disconnect()").catch(() => this.onProviderDisconnect()) : this.onProviderDisconnect();
  }
  async transportClose() {
    this.transportExplicitlyClosed = !0, await this.transportDisconnect();
  }
  async transportOpen(e) {
    if (!this.subscriber.hasAnyTopics) {
      this.logger.warn("Starting WS connection skipped because the client has no topics to work with.");
      return;
    }
    if (this.connectPromise ? (this.logger.debug({}, "Waiting for existing connection attempt to resolve..."), await this.connectPromise, this.logger.debug({}, "Existing connection attempt resolved")) : (this.connectPromise = new Promise(async (t, r) => {
      await this.connect(e).then(t).catch(r).finally(() => {
        this.connectPromise = void 0;
      });
    }), await this.connectPromise), !this.connected) throw new Error(`Couldn't establish socket connection to the relay server: ${this.relayUrl}`);
  }
  async restartTransport(e) {
    this.logger.debug({}, "Restarting transport..."), !this.connectionAttemptInProgress && (this.relayUrl = e || this.relayUrl, await this.confirmOnlineStateOrThrow(), await this.transportClose(), await this.transportOpen());
  }
  async confirmOnlineStateOrThrow() {
    if (!await Rd()) throw new Error("No internet connection detected. Please restart your network and try again.");
  }
  async handleBatchMessageEvents(e) {
    if ((e == null ? void 0 : e.length) === 0) {
      this.logger.trace("Batch message events is empty. Ignoring...");
      return;
    }
    const t = e.sort((r, n) => r.publishedAt - n.publishedAt);
    this.logger.debug(`Batch of ${t.length} message events sorted`);
    for (const r of t) try {
      await this.onMessageEvent(r);
    } catch (n) {
      this.logger.warn(n, "Error while processing batch message event: " + (n == null ? void 0 : n.message));
    }
    this.logger.trace(`Batch of ${t.length} message events processed`);
  }
  async onLinkMessageEvent(e, t) {
    const { topic: r } = e;
    if (!t.sessionExists) {
      const n = nt(B.FIVE_MINUTES), i = { topic: r, expiry: n, relay: { protocol: "irn" }, active: !1 };
      await this.core.pairing.pairings.set(r, i);
    }
    this.events.emit(ct.message, e), await this.recordMessageEvent(e, To.inbound);
  }
  async connect(e) {
    await this.confirmOnlineStateOrThrow(), e && e !== this.relayUrl && (this.relayUrl = e, await this.transportDisconnect()), this.connectionAttemptInProgress = !0, this.transportExplicitlyClosed = !1;
    let t = 1;
    for (; t < 6; ) {
      try {
        if (this.transportExplicitlyClosed) break;
        this.logger.debug({}, `Connecting to ${this.relayUrl}, attempt: ${t}...`), await this.createProvider(), await new Promise(async (r, n) => {
          const i = () => {
            n(new Error("Connection interrupted while trying to connect"));
          };
          this.provider.once(ss.disconnect, i), await vr(new Promise((o, a) => {
            this.provider.connect().then(o).catch(a);
          }), this.connectTimeout, `Socket stalled when trying to connect to ${this.relayUrl}`).catch((o) => {
            n(o);
          }).finally(() => {
            this.provider.off(ss.disconnect, i), clearTimeout(this.reconnectTimeout);
          }), await new Promise(async (o, a) => {
            const c = () => {
              n(new Error("Connection interrupted while trying to subscribe"));
            };
            this.provider.once(ss.disconnect, c), await this.subscriber.start().then(o).catch(a).finally(() => {
              this.provider.off(ss.disconnect, c);
            });
          }), this.hasExperiencedNetworkDisruption = !1, r();
        });
      } catch (r) {
        await this.subscriber.stop();
        const n = r;
        this.logger.warn({}, n.message), this.hasExperiencedNetworkDisruption = !0;
      } finally {
        this.connectionAttemptInProgress = !1;
      }
      if (this.connected) {
        this.logger.debug({}, `Connected to ${this.relayUrl} successfully on attempt: ${t}`);
        break;
      }
      await new Promise((r) => setTimeout(r, B.toMiliseconds(t * 1))), t++;
    }
  }
  startPingTimeout() {
    var e, t, r, n, i;
    if (jo()) try {
      (t = (e = this.provider) == null ? void 0 : e.connection) != null && t.socket && ((i = (n = (r = this.provider) == null ? void 0 : r.connection) == null ? void 0 : n.socket) == null || i.on("ping", () => {
        this.resetPingTimeout();
      })), this.resetPingTimeout();
    } catch (o) {
      this.logger.warn(o, o == null ? void 0 : o.message);
    }
  }
  async createProvider() {
    this.provider.connection && this.unregisterProviderListeners();
    const e = await this.core.crypto.signJWT(this.relayUrl);
    this.provider = new ds(new rf(Zm({ sdkVersion: Ec, protocol: this.protocol, version: this.version, relayUrl: this.relayUrl, projectId: this.projectId, auth: e, useOnCloseEvent: !0, bundleId: this.bundleId, packageName: this.packageName }))), this.registerProviderListeners();
  }
  async recordMessageEvent(e, t) {
    const { topic: r, message: n } = e;
    await this.messages.set(r, n, t);
  }
  async shouldIgnoreMessageEvent(e) {
    const { topic: t, message: r } = e;
    if (!r || r.length === 0) return this.logger.warn(`Ignoring invalid/empty message: ${r}`), !0;
    if (!await this.subscriber.isKnownTopic(t)) return this.logger.warn(`Ignoring message for unknown topic ${t}`), !0;
    const n = this.messages.has(t, r);
    return n && this.logger.warn(`Ignoring duplicate message: ${r}`), n;
  }
  async onProviderPayload(e) {
    if (this.logger.debug("Incoming Relay Payload"), this.logger.trace({ type: "payload", direction: "incoming", payload: e }), jc(e)) {
      if (!e.method.endsWith(ib)) return;
      const t = e.params, { topic: r, message: n, publishedAt: i, attestation: o } = t.data, a = { topic: r, message: n, publishedAt: i, transportType: ze.relay, attestation: o };
      this.logger.debug("Emitting Relayer Payload"), this.logger.trace(Wd({ type: "event", event: t.id }, a)), this.events.emit(t.id, a), await this.acknowledgePayload(e), await this.onMessageEvent(a);
    } else qc(e) && this.events.emit(ct.message_ack, e);
  }
  async onMessageEvent(e) {
    await this.shouldIgnoreMessageEvent(e) || (await this.recordMessageEvent(e, To.inbound), this.events.emit(ct.message, e));
  }
  async acknowledgePayload(e) {
    const t = ra(e.id, !0);
    await this.provider.connection.send(t);
  }
  unregisterProviderListeners() {
    this.provider.off(ss.payload, this.onPayloadHandler), this.provider.off(ss.connect, this.onConnectHandler), this.provider.off(ss.disconnect, this.onDisconnectHandler), this.provider.off(ss.error, this.onProviderErrorHandler), clearTimeout(this.pingTimeout);
  }
  async registerEventListeners() {
    let e = await Rd();
    $E(async (t) => {
      e !== t && (e = t, t ? await this.transportOpen().catch((r) => this.logger.error(r, r == null ? void 0 : r.message)) : (this.hasExperiencedNetworkDisruption = !0, await this.transportDisconnect(), this.transportExplicitlyClosed = !1));
    }), this.core.heartbeat.on(zn.pulse, async () => {
      if (!this.transportExplicitlyClosed && !this.connected && BE()) try {
        await this.confirmOnlineStateOrThrow(), await this.transportOpen();
      } catch (t) {
        this.logger.warn(t, t == null ? void 0 : t.message);
      }
    });
  }
  async onProviderDisconnect() {
    clearTimeout(this.pingTimeout), this.events.emit(ct.disconnect), this.connectionAttemptInProgress = !1, !this.reconnectInProgress && (this.reconnectInProgress = !0, await this.subscriber.stop(), this.subscriber.hasAnyTopics && (this.transportExplicitlyClosed || (this.reconnectTimeout = setTimeout(async () => {
      await this.transportOpen().catch((e) => this.logger.error(e, e == null ? void 0 : e.message)), this.reconnectTimeout = void 0, this.reconnectInProgress = !1;
    }, B.toMiliseconds(ob)))));
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = M("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
  async toEstablishConnection() {
    if (await this.confirmOnlineStateOrThrow(), !this.connected) {
      if (this.connectPromise) {
        await this.connectPromise;
        return;
      }
      await this.connect();
    }
  }
}
function RC(s, e) {
  return s === e || Number.isNaN(s) && Number.isNaN(e);
}
function Hd(s) {
  return Object.getOwnPropertySymbols(s).filter((e) => Object.prototype.propertyIsEnumerable.call(s, e));
}
function zd(s) {
  return s == null ? s === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(s);
}
const PC = "[object RegExp]", OC = "[object String]", xC = "[object Number]", kC = "[object Boolean]", Vd = "[object Arguments]", UC = "[object Symbol]", DC = "[object Date]", $C = "[object Map]", LC = "[object Set]", MC = "[object Array]", BC = "[object Function]", FC = "[object ArrayBuffer]", Ba = "[object Object]", jC = "[object Error]", qC = "[object DataView]", WC = "[object Uint8Array]", HC = "[object Uint8ClampedArray]", zC = "[object Uint16Array]", VC = "[object Uint32Array]", KC = "[object BigUint64Array]", GC = "[object Int8Array]", YC = "[object Int16Array]", ZC = "[object Int32Array]", JC = "[object BigInt64Array]", XC = "[object Float32Array]", QC = "[object Float64Array]";
function e_() {
}
function Kd(s) {
  if (!s || typeof s != "object") return !1;
  const e = Object.getPrototypeOf(s);
  return e === null || e === Object.prototype || Object.getPrototypeOf(e) === null ? Object.prototype.toString.call(s) === "[object Object]" : !1;
}
function t_(s, e, t) {
  return yi(s, e, void 0, void 0, void 0, void 0, t);
}
function yi(s, e, t, r, n, i, o) {
  const a = o(s, e, t, r, n, i);
  if (a !== void 0) return a;
  if (typeof s == typeof e) switch (typeof s) {
    case "bigint":
    case "string":
    case "boolean":
    case "symbol":
    case "undefined":
      return s === e;
    case "number":
      return s === e || Object.is(s, e);
    case "function":
      return s === e;
    case "object":
      return Ti(s, e, i, o);
  }
  return Ti(s, e, i, o);
}
function Ti(s, e, t, r) {
  if (Object.is(s, e)) return !0;
  let n = zd(s), i = zd(e);
  if (n === Vd && (n = Ba), i === Vd && (i = Ba), n !== i) return !1;
  switch (n) {
    case OC:
      return s.toString() === e.toString();
    case xC: {
      const c = s.valueOf(), l = e.valueOf();
      return RC(c, l);
    }
    case kC:
    case DC:
    case UC:
      return Object.is(s.valueOf(), e.valueOf());
    case PC:
      return s.source === e.source && s.flags === e.flags;
    case BC:
      return s === e;
  }
  t = t ?? /* @__PURE__ */ new Map();
  const o = t.get(s), a = t.get(e);
  if (o != null && a != null) return o === e;
  t.set(s, e), t.set(e, s);
  try {
    switch (n) {
      case $C: {
        if (s.size !== e.size) return !1;
        for (const [c, l] of s.entries()) if (!e.has(c) || !yi(l, e.get(c), c, s, e, t, r)) return !1;
        return !0;
      }
      case LC: {
        if (s.size !== e.size) return !1;
        const c = Array.from(s.values()), l = Array.from(e.values());
        for (let d = 0; d < c.length; d++) {
          const u = c[d], p = l.findIndex((g) => yi(u, g, void 0, s, e, t, r));
          if (p === -1) return !1;
          l.splice(p, 1);
        }
        return !0;
      }
      case MC:
      case WC:
      case HC:
      case zC:
      case VC:
      case KC:
      case GC:
      case YC:
      case ZC:
      case JC:
      case XC:
      case QC: {
        if (typeof Buffer < "u" && Buffer.isBuffer(s) !== Buffer.isBuffer(e) || s.length !== e.length) return !1;
        for (let c = 0; c < s.length; c++) if (!yi(s[c], e[c], c, s, e, t, r)) return !1;
        return !0;
      }
      case FC:
        return s.byteLength !== e.byteLength ? !1 : Ti(new Uint8Array(s), new Uint8Array(e), t, r);
      case qC:
        return s.byteLength !== e.byteLength || s.byteOffset !== e.byteOffset ? !1 : Ti(new Uint8Array(s), new Uint8Array(e), t, r);
      case jC:
        return s.name === e.name && s.message === e.message;
      case Ba: {
        if (!(Ti(s.constructor, e.constructor, t, r) || Kd(s) && Kd(e))) return !1;
        const c = [...Object.keys(s), ...Hd(s)], l = [...Object.keys(e), ...Hd(e)];
        if (c.length !== l.length) return !1;
        for (let d = 0; d < c.length; d++) {
          const u = c[d], p = s[u];
          if (!Object.hasOwn(e, u)) return !1;
          const g = e[u];
          if (!yi(p, g, u, s, e, t, r)) return !1;
        }
        return !0;
      }
      default:
        return !1;
    }
  } finally {
    t.delete(s), t.delete(e);
  }
}
function s_(s, e) {
  return t_(s, e, e_);
}
var r_ = Object.defineProperty, Gd = Object.getOwnPropertySymbols, n_ = Object.prototype.hasOwnProperty, i_ = Object.prototype.propertyIsEnumerable, Sc = (s, e, t) => e in s ? r_(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t, Yd = (s, e) => {
  for (var t in e || (e = {})) n_.call(e, t) && Sc(s, t, e[t]);
  if (Gd) for (var t of Gd(e)) i_.call(e, t) && Sc(s, t, e[t]);
  return s;
}, Ut = (s, e, t) => Sc(s, typeof e != "symbol" ? e + "" : e, t);
class rn extends kg {
  constructor(e, t, r, n = Bs, i = void 0) {
    super(e, t, r, n), this.core = e, this.logger = t, this.name = r, Ut(this, "map", /* @__PURE__ */ new Map()), Ut(this, "version", ab), Ut(this, "cached", []), Ut(this, "initialized", !1), Ut(this, "getKey"), Ut(this, "storagePrefix", Bs), Ut(this, "recentlyDeleted", []), Ut(this, "recentlyDeletedLimit", 200), Ut(this, "init", async () => {
      this.initialized || (this.logger.trace("Initialized"), await this.restore(), this.cached.forEach((o) => {
        this.getKey && o !== null && !ft(o) ? this.map.set(this.getKey(o), o) : pE(o) ? this.map.set(o.id, o) : fE(o) && this.map.set(o.topic, o);
      }), this.cached = [], this.initialized = !0);
    }), Ut(this, "set", async (o, a) => {
      this.isInitialized(), this.map.has(o) ? await this.update(o, a) : (this.logger.debug("Setting value"), this.logger.trace({ type: "method", method: "set", key: o, value: a }), this.map.set(o, a), await this.persist());
    }), Ut(this, "get", (o) => (this.isInitialized(), this.logger.debug("Getting value"), this.logger.trace({ type: "method", method: "get", key: o }), this.getData(o))), Ut(this, "getAll", (o) => (this.isInitialized(), o ? this.values.filter((a) => Object.keys(o).every((c) => s_(a[c], o[c]))) : this.values)), Ut(this, "update", async (o, a) => {
      this.isInitialized(), this.logger.debug("Updating value"), this.logger.trace({ type: "method", method: "update", key: o, update: a });
      const c = Yd(Yd({}, this.getData(o)), a);
      this.map.set(o, c), await this.persist();
    }), Ut(this, "delete", async (o, a) => {
      this.isInitialized(), this.map.has(o) && (this.logger.debug("Deleting value"), this.logger.trace({ type: "method", method: "delete", key: o, reason: a }), this.map.delete(o), this.addToRecentlyDeleted(o), await this.persist());
    }), this.logger = At(t, this.name), this.storagePrefix = n, this.getKey = i;
  }
  get context() {
    return Xt(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  get length() {
    return this.map.size;
  }
  get keys() {
    return Array.from(this.map.keys());
  }
  get values() {
    return Array.from(this.map.values());
  }
  addToRecentlyDeleted(e) {
    this.recentlyDeleted.push(e), this.recentlyDeleted.length >= this.recentlyDeletedLimit && this.recentlyDeleted.splice(0, this.recentlyDeletedLimit / 2);
  }
  async setDataStore(e) {
    await this.core.storage.setItem(this.storageKey, e);
  }
  async getDataStore() {
    return await this.core.storage.getItem(this.storageKey);
  }
  getData(e) {
    const t = this.map.get(e);
    if (!t) {
      if (this.recentlyDeleted.includes(e)) {
        const { message: n } = M("MISSING_OR_INVALID", `Record was recently deleted - ${this.name}: ${e}`);
        throw this.logger.error(n), new Error(n);
      }
      const { message: r } = M("NO_MATCHING_KEY", `${this.name}: ${e}`);
      throw this.logger.error(r), new Error(r);
    }
    return t;
  }
  async persist() {
    await this.setDataStore(this.values);
  }
  async restore() {
    try {
      const e = await this.getDataStore();
      if (typeof e > "u" || !e.length) return;
      if (this.map.size) {
        const { message: t } = M("RESTORE_WILL_OVERRIDE", this.name);
        throw this.logger.error(t), new Error(t);
      }
      this.cached = e, this.logger.debug(`Successfully Restored value for ${this.name}`), this.logger.trace({ type: "method", method: "restore", value: this.values });
    } catch (e) {
      this.logger.debug(`Failed to Restore value for ${this.name}`), this.logger.error(e);
    }
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = M("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
}
var o_ = Object.defineProperty, a_ = (s, e, t) => e in s ? o_(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t, ve = (s, e, t) => a_(s, typeof e != "symbol" ? e + "" : e, t);
class c_ {
  constructor(e, t) {
    this.core = e, this.logger = t, ve(this, "name", ub), ve(this, "version", hb), ve(this, "events", new Wc()), ve(this, "pairings"), ve(this, "initialized", !1), ve(this, "storagePrefix", Bs), ve(this, "ignoredPayloadTypes", [Js]), ve(this, "registeredMethods", []), ve(this, "init", async () => {
      this.initialized || (await this.pairings.init(), await this.cleanup(), this.registerRelayerEvents(), this.registerExpirerEvents(), this.initialized = !0, this.logger.trace("Initialized"));
    }), ve(this, "register", ({ methods: r }) => {
      this.isInitialized(), this.registeredMethods = [.../* @__PURE__ */ new Set([...this.registeredMethods, ...r])];
    }), ve(this, "create", async (r) => {
      this.isInitialized();
      const n = mc(), i = await this.core.crypto.setSymKey(n), o = nt(B.FIVE_MINUTES), a = { protocol: ap }, c = { topic: i, expiry: o, relay: a, active: !1, methods: r == null ? void 0 : r.methods }, l = bd({ protocol: this.core.protocol, version: this.core.version, topic: i, symKey: n, relay: a, expiryTimestamp: o, methods: r == null ? void 0 : r.methods });
      return this.events.emit(Lr.create, c), this.core.expirer.set(i, o), await this.pairings.set(i, c), await this.core.relayer.subscribe(i, { transportType: r == null ? void 0 : r.transportType }), { topic: i, uri: l };
    }), ve(this, "pair", async (r) => {
      this.isInitialized();
      const n = this.core.eventClient.createEvent({ properties: { topic: r == null ? void 0 : r.uri, trace: [Os.pairing_started] } });
      this.isValidPair(r, n);
      const { topic: i, symKey: o, relay: a, expiryTimestamp: c, methods: l } = Ed(r.uri);
      n.props.properties.topic = i, n.addTrace(Os.pairing_uri_validation_success), n.addTrace(Os.pairing_uri_not_expired);
      let d;
      if (this.pairings.keys.includes(i)) {
        if (d = this.pairings.get(i), n.addTrace(Os.existing_pairing), d.active) throw n.setError(Gs.active_pairing_already_exists), new Error(`Pairing already exists: ${i}. Please try again with a new connection URI.`);
        n.addTrace(Os.pairing_not_expired);
      }
      const u = c || nt(B.FIVE_MINUTES), p = { topic: i, relay: a, expiry: u, active: !1, methods: l };
      this.core.expirer.set(i, u), await this.pairings.set(i, p), n.addTrace(Os.store_new_pairing), r.activatePairing && await this.activate({ topic: i }), this.events.emit(Lr.create, p), n.addTrace(Os.emit_inactive_pairing), this.core.crypto.keychain.has(i) || await this.core.crypto.setSymKey(o, i), n.addTrace(Os.subscribing_pairing_topic);
      try {
        await this.core.relayer.confirmOnlineStateOrThrow();
      } catch {
        n.setError(Gs.no_internet_connection);
      }
      try {
        await this.core.relayer.subscribe(i, { relay: a });
      } catch (g) {
        throw n.setError(Gs.subscribe_pairing_topic_failure), g;
      }
      return n.addTrace(Os.subscribe_pairing_topic_success), p;
    }), ve(this, "activate", async ({ topic: r }) => {
      this.isInitialized();
      const n = nt(B.FIVE_MINUTES);
      this.core.expirer.set(r, n), await this.pairings.update(r, { active: !0, expiry: n });
    }), ve(this, "ping", async (r) => {
      this.isInitialized(), await this.isValidPing(r), this.logger.warn("ping() is deprecated and will be removed in the next major release.");
      const { topic: n } = r;
      if (this.pairings.keys.includes(n)) {
        const i = await this.sendRequest(n, "wc_pairingPing", {}), { done: o, resolve: a, reject: c } = $r();
        this.events.once(ke("pairing_ping", i), ({ error: l }) => {
          l ? c(l) : a();
        }), await o();
      }
    }), ve(this, "updateExpiry", async ({ topic: r, expiry: n }) => {
      this.isInitialized(), await this.pairings.update(r, { expiry: n });
    }), ve(this, "updateMetadata", async ({ topic: r, metadata: n }) => {
      this.isInitialized(), await this.pairings.update(r, { peerMetadata: n });
    }), ve(this, "getPairings", () => (this.isInitialized(), this.pairings.values)), ve(this, "disconnect", async (r) => {
      this.isInitialized(), await this.isValidDisconnect(r);
      const { topic: n } = r;
      this.pairings.keys.includes(n) && (await this.sendRequest(n, "wc_pairingDelete", Ke("USER_DISCONNECTED")), await this.deletePairing(n));
    }), ve(this, "formatUriFromPairing", (r) => {
      this.isInitialized();
      const { topic: n, relay: i, expiry: o, methods: a } = r, c = this.core.crypto.keychain.get(n);
      return bd({ protocol: this.core.protocol, version: this.core.version, topic: n, symKey: c, relay: i, expiryTimestamp: o, methods: a });
    }), ve(this, "sendRequest", async (r, n, i) => {
      const o = Br(n, i), a = await this.core.crypto.encode(r, o), c = oi[n].req;
      return this.core.history.set(r, o), this.core.relayer.publish(r, a, c), o.id;
    }), ve(this, "sendResult", async (r, n, i) => {
      const o = ra(r, i), a = await this.core.crypto.encode(n, o), c = (await this.core.history.get(n, r)).request.method, l = oi[c].res;
      await this.core.relayer.publish(n, a, l), await this.core.history.resolve(o);
    }), ve(this, "sendError", async (r, n, i) => {
      const o = Ou(r, i), a = await this.core.crypto.encode(n, o), c = (await this.core.history.get(n, r)).request.method, l = oi[c] ? oi[c].res : oi.unregistered_method.res;
      await this.core.relayer.publish(n, a, l), await this.core.history.resolve(o);
    }), ve(this, "deletePairing", async (r, n) => {
      await this.core.relayer.unsubscribe(r), await Promise.all([this.pairings.delete(r, Ke("USER_DISCONNECTED")), this.core.crypto.deleteSymKey(r), n ? Promise.resolve() : this.core.expirer.del(r)]);
    }), ve(this, "cleanup", async () => {
      const r = this.pairings.getAll().filter((n) => gr(n.expiry));
      await Promise.all(r.map((n) => this.deletePairing(n.topic)));
    }), ve(this, "onRelayEventRequest", async (r) => {
      const { topic: n, payload: i } = r;
      switch (i.method) {
        case "wc_pairingPing":
          return await this.onPairingPingRequest(n, i);
        case "wc_pairingDelete":
          return await this.onPairingDeleteRequest(n, i);
        default:
          return await this.onUnknownRpcMethodRequest(n, i);
      }
    }), ve(this, "onRelayEventResponse", async (r) => {
      const { topic: n, payload: i } = r, o = (await this.core.history.get(n, i.id)).request.method;
      switch (o) {
        case "wc_pairingPing":
          return this.onPairingPingResponse(n, i);
        default:
          return this.onUnknownRpcMethodResponse(o);
      }
    }), ve(this, "onPairingPingRequest", async (r, n) => {
      const { id: i } = n;
      try {
        this.isValidPing({ topic: r }), await this.sendResult(i, r, !0), this.events.emit(Lr.ping, { id: i, topic: r });
      } catch (o) {
        await this.sendError(i, r, o), this.logger.error(o);
      }
    }), ve(this, "onPairingPingResponse", (r, n) => {
      const { id: i } = n;
      setTimeout(() => {
        Vs(n) ? this.events.emit(ke("pairing_ping", i), {}) : xs(n) && this.events.emit(ke("pairing_ping", i), { error: n.error });
      }, 500);
    }), ve(this, "onPairingDeleteRequest", async (r, n) => {
      const { id: i } = n;
      try {
        this.isValidDisconnect({ topic: r }), await this.deletePairing(r), this.events.emit(Lr.delete, { id: i, topic: r });
      } catch (o) {
        await this.sendError(i, r, o), this.logger.error(o);
      }
    }), ve(this, "onUnknownRpcMethodRequest", async (r, n) => {
      const { id: i, method: o } = n;
      try {
        if (this.registeredMethods.includes(o)) return;
        const a = Ke("WC_METHOD_UNSUPPORTED", o);
        await this.sendError(i, r, a), this.logger.error(a);
      } catch (a) {
        await this.sendError(i, r, a), this.logger.error(a);
      }
    }), ve(this, "onUnknownRpcMethodResponse", (r) => {
      this.registeredMethods.includes(r) || this.logger.error(Ke("WC_METHOD_UNSUPPORTED", r));
    }), ve(this, "isValidPair", (r, n) => {
      var i;
      if (!Lt(r)) {
        const { message: a } = M("MISSING_OR_INVALID", `pair() params: ${r}`);
        throw n.setError(Gs.malformed_pairing_uri), new Error(a);
      }
      if (!hE(r.uri)) {
        const { message: a } = M("MISSING_OR_INVALID", `pair() uri: ${r.uri}`);
        throw n.setError(Gs.malformed_pairing_uri), new Error(a);
      }
      const o = Ed(r == null ? void 0 : r.uri);
      if (!((i = o == null ? void 0 : o.relay) != null && i.protocol)) {
        const { message: a } = M("MISSING_OR_INVALID", "pair() uri#relay-protocol");
        throw n.setError(Gs.malformed_pairing_uri), new Error(a);
      }
      if (!(o != null && o.symKey)) {
        const { message: a } = M("MISSING_OR_INVALID", "pair() uri#symKey");
        throw n.setError(Gs.malformed_pairing_uri), new Error(a);
      }
      if (o != null && o.expiryTimestamp && B.toMiliseconds(o == null ? void 0 : o.expiryTimestamp) < Date.now()) {
        n.setError(Gs.pairing_expired);
        const { message: a } = M("EXPIRED", "pair() URI has expired. Please try again with a new connection URI.");
        throw new Error(a);
      }
    }), ve(this, "isValidPing", async (r) => {
      if (!Lt(r)) {
        const { message: i } = M("MISSING_OR_INVALID", `ping() params: ${r}`);
        throw new Error(i);
      }
      const { topic: n } = r;
      await this.isValidPairingTopic(n);
    }), ve(this, "isValidDisconnect", async (r) => {
      if (!Lt(r)) {
        const { message: i } = M("MISSING_OR_INVALID", `disconnect() params: ${r}`);
        throw new Error(i);
      }
      const { topic: n } = r;
      await this.isValidPairingTopic(n);
    }), ve(this, "isValidPairingTopic", async (r) => {
      if (!et(r, !1)) {
        const { message: n } = M("MISSING_OR_INVALID", `pairing topic should be a string: ${r}`);
        throw new Error(n);
      }
      if (!this.pairings.keys.includes(r)) {
        const { message: n } = M("NO_MATCHING_KEY", `pairing topic doesn't exist: ${r}`);
        throw new Error(n);
      }
      if (gr(this.pairings.get(r).expiry)) {
        await this.deletePairing(r);
        const { message: n } = M("EXPIRED", `pairing topic: ${r}`);
        throw new Error(n);
      }
    }), this.core = e, this.logger = At(t, this.name), this.pairings = new rn(this.core, this.logger, this.name, this.storagePrefix);
  }
  get context() {
    return Xt(this.logger);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = M("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
  registerRelayerEvents() {
    this.core.relayer.on(ct.message, async (e) => {
      const { topic: t, message: r, transportType: n } = e;
      if (this.pairings.keys.includes(t) && n !== ze.link_mode && !this.ignoredPayloadTypes.includes(this.core.crypto.getPayloadType(r))) try {
        const i = await this.core.crypto.decode(t, r);
        jc(i) ? (this.core.history.set(t, i), await this.onRelayEventRequest({ topic: t, payload: i })) : qc(i) && (await this.core.history.resolve(i), await this.onRelayEventResponse({ topic: t, payload: i }), this.core.history.delete(t, i.id)), await this.core.relayer.messages.ack(t, r);
      } catch (i) {
        this.logger.error(i);
      }
    });
  }
  registerExpirerEvents() {
    this.core.expirer.on(is.expired, async (e) => {
      const { topic: t } = hh(e.target);
      t && this.pairings.keys.includes(t) && (await this.deletePairing(t, !0), this.events.emit(Lr.expire, { topic: t }));
    });
  }
}
var l_ = Object.defineProperty, d_ = (s, e, t) => e in s ? l_(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t, ht = (s, e, t) => d_(s, typeof e != "symbol" ? e + "" : e, t);
class u_ extends Rg {
  constructor(e, t) {
    super(e, t), this.core = e, this.logger = t, ht(this, "records", /* @__PURE__ */ new Map()), ht(this, "events", new Qr.EventEmitter()), ht(this, "name", pb), ht(this, "version", fb), ht(this, "cached", []), ht(this, "initialized", !1), ht(this, "storagePrefix", Bs), ht(this, "init", async () => {
      this.initialized || (this.logger.trace("Initialized"), await this.restore(), this.cached.forEach((r) => this.records.set(r.id, r)), this.cached = [], this.registerEventListeners(), this.initialized = !0);
    }), ht(this, "set", (r, n, i) => {
      if (this.isInitialized(), this.logger.debug("Setting JSON-RPC request history record"), this.logger.trace({ type: "method", method: "set", topic: r, request: n, chainId: i }), this.records.has(n.id)) return;
      const o = { id: n.id, topic: r, request: { method: n.method, params: n.params || null }, chainId: i, expiry: nt(B.THIRTY_DAYS) };
      this.records.set(o.id, o), this.persist(), this.events.emit(hs.created, o);
    }), ht(this, "resolve", async (r) => {
      if (this.isInitialized(), this.logger.debug("Updating JSON-RPC response history record"), this.logger.trace({ type: "method", method: "update", response: r }), !this.records.has(r.id)) return;
      const n = await this.getRecord(r.id);
      typeof n.response > "u" && (n.response = xs(r) ? { error: r.error } : { result: r.result }, this.records.set(n.id, n), this.persist(), this.events.emit(hs.updated, n));
    }), ht(this, "get", async (r, n) => (this.isInitialized(), this.logger.debug("Getting record"), this.logger.trace({ type: "method", method: "get", topic: r, id: n }), await this.getRecord(n))), ht(this, "delete", (r, n) => {
      this.isInitialized(), this.logger.debug("Deleting record"), this.logger.trace({ type: "method", method: "delete", id: n }), this.values.forEach((i) => {
        if (i.topic === r) {
          if (typeof n < "u" && i.id !== n) return;
          this.records.delete(i.id), this.events.emit(hs.deleted, i);
        }
      }), this.persist();
    }), ht(this, "exists", async (r, n) => (this.isInitialized(), this.records.has(n) ? (await this.getRecord(n)).topic === r : !1)), ht(this, "on", (r, n) => {
      this.events.on(r, n);
    }), ht(this, "once", (r, n) => {
      this.events.once(r, n);
    }), ht(this, "off", (r, n) => {
      this.events.off(r, n);
    }), ht(this, "removeListener", (r, n) => {
      this.events.removeListener(r, n);
    }), this.logger = At(t, this.name);
  }
  get context() {
    return Xt(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  get size() {
    return this.records.size;
  }
  get keys() {
    return Array.from(this.records.keys());
  }
  get values() {
    return Array.from(this.records.values());
  }
  get pending() {
    const e = [];
    return this.values.forEach((t) => {
      if (typeof t.response < "u") return;
      const r = { topic: t.topic, request: Br(t.request.method, t.request.params, t.id), chainId: t.chainId };
      return e.push(r);
    }), e;
  }
  async setJsonRpcRecords(e) {
    await this.core.storage.setItem(this.storageKey, e);
  }
  async getJsonRpcRecords() {
    return await this.core.storage.getItem(this.storageKey);
  }
  getRecord(e) {
    this.isInitialized();
    const t = this.records.get(e);
    if (!t) {
      const { message: r } = M("NO_MATCHING_KEY", `${this.name}: ${e}`);
      throw new Error(r);
    }
    return t;
  }
  async persist() {
    await this.setJsonRpcRecords(this.values), this.events.emit(hs.sync);
  }
  async restore() {
    try {
      const e = await this.getJsonRpcRecords();
      if (typeof e > "u" || !e.length) return;
      if (this.records.size) {
        const { message: t } = M("RESTORE_WILL_OVERRIDE", this.name);
        throw this.logger.error(t), new Error(t);
      }
      this.cached = e, this.logger.debug(`Successfully Restored records for ${this.name}`), this.logger.trace({ type: "method", method: "restore", records: this.values });
    } catch (e) {
      this.logger.debug(`Failed to Restore records for ${this.name}`), this.logger.error(e);
    }
  }
  registerEventListeners() {
    this.events.on(hs.created, (e) => {
      const t = hs.created;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, record: e });
    }), this.events.on(hs.updated, (e) => {
      const t = hs.updated;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, record: e });
    }), this.events.on(hs.deleted, (e) => {
      const t = hs.deleted;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, record: e });
    }), this.core.heartbeat.on(zn.pulse, () => {
      this.cleanup();
    });
  }
  cleanup() {
    try {
      this.isInitialized();
      let e = !1;
      this.records.forEach((t) => {
        B.toMiliseconds(t.expiry || 0) - Date.now() <= 0 && (this.logger.info(`Deleting expired history log: ${t.id}`), this.records.delete(t.id), this.events.emit(hs.deleted, t, !1), e = !0);
      }), e && this.persist();
    } catch (e) {
      this.logger.warn(e);
    }
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = M("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
}
var h_ = Object.defineProperty, p_ = (s, e, t) => e in s ? h_(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t, Ct = (s, e, t) => p_(s, typeof e != "symbol" ? e + "" : e, t);
class f_ extends Dg {
  constructor(e, t) {
    super(e, t), this.core = e, this.logger = t, Ct(this, "expirations", /* @__PURE__ */ new Map()), Ct(this, "events", new Qr.EventEmitter()), Ct(this, "name", gb), Ct(this, "version", mb), Ct(this, "cached", []), Ct(this, "initialized", !1), Ct(this, "storagePrefix", Bs), Ct(this, "init", async () => {
      this.initialized || (this.logger.trace("Initialized"), await this.restore(), this.cached.forEach((r) => this.expirations.set(r.target, r)), this.cached = [], this.registerEventListeners(), this.initialized = !0);
    }), Ct(this, "has", (r) => {
      try {
        const n = this.formatTarget(r);
        return typeof this.getExpiration(n) < "u";
      } catch {
        return !1;
      }
    }), Ct(this, "set", (r, n) => {
      this.isInitialized();
      const i = this.formatTarget(r), o = { target: i, expiry: n };
      this.expirations.set(i, o), this.checkExpiry(i, o), this.events.emit(is.created, { target: i, expiration: o });
    }), Ct(this, "get", (r) => {
      this.isInitialized();
      const n = this.formatTarget(r);
      return this.getExpiration(n);
    }), Ct(this, "del", (r) => {
      if (this.isInitialized(), this.has(r)) {
        const n = this.formatTarget(r), i = this.getExpiration(n);
        this.expirations.delete(n), this.events.emit(is.deleted, { target: n, expiration: i });
      }
    }), Ct(this, "on", (r, n) => {
      this.events.on(r, n);
    }), Ct(this, "once", (r, n) => {
      this.events.once(r, n);
    }), Ct(this, "off", (r, n) => {
      this.events.off(r, n);
    }), Ct(this, "removeListener", (r, n) => {
      this.events.removeListener(r, n);
    }), this.logger = At(t, this.name);
  }
  get context() {
    return Xt(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  get length() {
    return this.expirations.size;
  }
  get keys() {
    return Array.from(this.expirations.keys());
  }
  get values() {
    return Array.from(this.expirations.values());
  }
  formatTarget(e) {
    if (typeof e == "string") return Jm(e);
    if (typeof e == "number") return Xm(e);
    const { message: t } = M("UNKNOWN_TYPE", `Target type: ${typeof e}`);
    throw new Error(t);
  }
  async setExpirations(e) {
    await this.core.storage.setItem(this.storageKey, e);
  }
  async getExpirations() {
    return await this.core.storage.getItem(this.storageKey);
  }
  async persist() {
    await this.setExpirations(this.values), this.events.emit(is.sync);
  }
  async restore() {
    try {
      const e = await this.getExpirations();
      if (typeof e > "u" || !e.length) return;
      if (this.expirations.size) {
        const { message: t } = M("RESTORE_WILL_OVERRIDE", this.name);
        throw this.logger.error(t), new Error(t);
      }
      this.cached = e, this.logger.debug(`Successfully Restored expirations for ${this.name}`), this.logger.trace({ type: "method", method: "restore", expirations: this.values });
    } catch (e) {
      this.logger.debug(`Failed to Restore expirations for ${this.name}`), this.logger.error(e);
    }
  }
  getExpiration(e) {
    const t = this.expirations.get(e);
    if (!t) {
      const { message: r } = M("NO_MATCHING_KEY", `${this.name}: ${e}`);
      throw this.logger.warn(r), new Error(r);
    }
    return t;
  }
  checkExpiry(e, t) {
    const { expiry: r } = t;
    B.toMiliseconds(r) - Date.now() <= 0 && this.expire(e, t);
  }
  expire(e, t) {
    this.expirations.delete(e), this.events.emit(is.expired, { target: e, expiration: t });
  }
  checkExpirations() {
    this.core.relayer.connected && this.expirations.forEach((e, t) => this.checkExpiry(t, e));
  }
  registerEventListeners() {
    this.core.heartbeat.on(zn.pulse, () => this.checkExpirations()), this.events.on(is.created, (e) => {
      const t = is.created;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, data: e }), this.persist();
    }), this.events.on(is.expired, (e) => {
      const t = is.expired;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, data: e }), this.persist();
    }), this.events.on(is.deleted, (e) => {
      const t = is.deleted;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, data: e }), this.persist();
    });
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = M("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
}
var g_ = Object.defineProperty, m_ = (s, e, t) => e in s ? g_(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t, Qe = (s, e, t) => m_(s, typeof e != "symbol" ? e + "" : e, t);
class w_ extends $g {
  constructor(e, t, r) {
    super(e, t, r), this.core = e, this.logger = t, this.store = r, Qe(this, "name", wb), Qe(this, "abortController"), Qe(this, "isDevEnv"), Qe(this, "verifyUrlV3", Eb), Qe(this, "storagePrefix", Bs), Qe(this, "version", op), Qe(this, "publicKey"), Qe(this, "fetchPromise"), Qe(this, "init", async () => {
      var n;
      this.isDevEnv || (this.publicKey = await this.store.getItem(this.storeKey), this.publicKey && B.toMiliseconds((n = this.publicKey) == null ? void 0 : n.expiresAt) < Date.now() && (this.logger.debug("verify v2 public key expired"), await this.removePublicKey()));
    }), Qe(this, "register", async (n) => {
      if (!Vn() || this.isDevEnv) return;
      const i = window.location.origin, { id: o, decryptedId: a } = n, c = `${this.verifyUrlV3}/attestation?projectId=${this.core.projectId}&origin=${i}&id=${o}&decryptedId=${a}`;
      try {
        const l = $n(), d = this.startAbortTimer(B.ONE_SECOND * 5), u = await new Promise((p, g) => {
          const w = () => {
            window.removeEventListener("message", y), l.body.removeChild(m), g("attestation aborted");
          };
          this.abortController.signal.addEventListener("abort", w);
          const m = l.createElement("iframe");
          m.src = c, m.style.display = "none", m.addEventListener("error", w, { signal: this.abortController.signal });
          const y = (C) => {
            if (C.data && typeof C.data == "string") try {
              const _ = JSON.parse(C.data);
              if (_.type === "verify_attestation") {
                if (Ja(_.attestation).payload.id !== o) return;
                clearInterval(d), l.body.removeChild(m), this.abortController.signal.removeEventListener("abort", w), window.removeEventListener("message", y), p(_.attestation === null ? "" : _.attestation);
              }
            } catch (_) {
              this.logger.warn(_);
            }
          };
          l.body.appendChild(m), window.addEventListener("message", y, { signal: this.abortController.signal });
        });
        return this.logger.debug("jwt attestation", u), u;
      } catch (l) {
        this.logger.warn(l);
      }
      return "";
    }), Qe(this, "resolve", async (n) => {
      if (this.isDevEnv) return "";
      const { attestationId: i, hash: o, encryptedId: a } = n;
      if (i === "") {
        this.logger.debug("resolve: attestationId is empty, skipping");
        return;
      }
      if (i) {
        if (Ja(i).payload.id !== a) return;
        const l = await this.isValidJwtAttestation(i);
        if (l) {
          if (!l.isVerified) {
            this.logger.warn("resolve: jwt attestation: origin url not verified");
            return;
          }
          return l;
        }
      }
      if (!o) return;
      const c = this.getVerifyUrl(n == null ? void 0 : n.verifyUrl);
      return this.fetchAttestation(o, c);
    }), Qe(this, "fetchAttestation", async (n, i) => {
      this.logger.debug(`resolving attestation: ${n} from url: ${i}`);
      const o = this.startAbortTimer(B.ONE_SECOND * 5), a = await fetch(`${i}/attestation/${n}?v2Supported=true`, { signal: this.abortController.signal });
      return clearTimeout(o), a.status === 200 ? await a.json() : void 0;
    }), Qe(this, "getVerifyUrl", (n) => {
      let i = n || Ni;
      return bb.includes(i) || (this.logger.info(`verify url: ${i}, not included in trusted list, assigning default: ${Ni}`), i = Ni), i;
    }), Qe(this, "fetchPublicKey", async () => {
      try {
        this.logger.debug(`fetching public key from: ${this.verifyUrlV3}`);
        const n = this.startAbortTimer(B.FIVE_SECONDS), i = await fetch(`${this.verifyUrlV3}/public-key`, { signal: this.abortController.signal });
        return clearTimeout(n), await i.json();
      } catch (n) {
        this.logger.warn(n);
      }
    }), Qe(this, "persistPublicKey", async (n) => {
      this.logger.debug("persisting public key to local storage", n), await this.store.setItem(this.storeKey, n), this.publicKey = n;
    }), Qe(this, "removePublicKey", async () => {
      this.logger.debug("removing verify v2 public key from storage"), await this.store.removeItem(this.storeKey), this.publicKey = void 0;
    }), Qe(this, "isValidJwtAttestation", async (n) => {
      const i = await this.getPublicKey();
      try {
        if (i) return this.validateAttestation(n, i);
      } catch (a) {
        this.logger.error(a), this.logger.warn("error validating attestation");
      }
      const o = await this.fetchAndPersistPublicKey();
      try {
        if (o) return this.validateAttestation(n, o);
      } catch (a) {
        this.logger.error(a), this.logger.warn("error validating attestation");
      }
    }), Qe(this, "getPublicKey", async () => this.publicKey ? this.publicKey : await this.fetchAndPersistPublicKey()), Qe(this, "fetchAndPersistPublicKey", async () => {
      if (this.fetchPromise) return await this.fetchPromise, this.publicKey;
      this.fetchPromise = new Promise(async (i) => {
        const o = await this.fetchPublicKey();
        o && (await this.persistPublicKey(o), i(o));
      });
      const n = await this.fetchPromise;
      return this.fetchPromise = void 0, n;
    }), Qe(this, "validateAttestation", (n, i) => {
      const o = z0(n, i.publicKey), a = { hasExpired: B.toMiliseconds(o.exp) < Date.now(), payload: o };
      if (a.hasExpired) throw this.logger.warn("resolve: jwt attestation expired"), new Error("JWT attestation expired");
      return { origin: a.payload.origin, isScam: a.payload.isScam, isVerified: a.payload.isVerified };
    }), this.logger = At(t, this.name), this.abortController = new AbortController(), this.isDevEnv = Xc(), this.init();
  }
  get storeKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//verify:public:key";
  }
  get context() {
    return Xt(this.logger);
  }
  startAbortTimer(e) {
    return this.abortController = new AbortController(), setTimeout(() => this.abortController.abort(), B.toMiliseconds(e));
  }
}
var y_ = Object.defineProperty, E_ = (s, e, t) => e in s ? y_(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t, Zd = (s, e, t) => E_(s, typeof e != "symbol" ? e + "" : e, t);
class b_ extends Lg {
  constructor(e, t) {
    super(e, t), this.projectId = e, this.logger = t, Zd(this, "context", vb), Zd(this, "registerDeviceToken", async (r) => {
      const { clientId: n, token: i, notificationType: o, enableEncrypted: a = !1 } = r, c = `${Cb}/${this.projectId}/clients`;
      await fetch(c, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ client_id: n, type: o, token: i, always_raw: a }) });
    }), this.logger = At(t, this.context);
  }
}
var v_ = Object.defineProperty, Jd = Object.getOwnPropertySymbols, C_ = Object.prototype.hasOwnProperty, __ = Object.prototype.propertyIsEnumerable, Nc = (s, e, t) => e in s ? v_(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t, li = (s, e) => {
  for (var t in e || (e = {})) C_.call(e, t) && Nc(s, t, e[t]);
  if (Jd) for (var t of Jd(e)) __.call(e, t) && Nc(s, t, e[t]);
  return s;
}, ot = (s, e, t) => Nc(s, typeof e != "symbol" ? e + "" : e, t);
class A_ extends Mg {
  constructor(e, t, r = !0) {
    super(e, t, r), this.core = e, this.logger = t, ot(this, "context", Ab), ot(this, "storagePrefix", Bs), ot(this, "storageVersion", _b), ot(this, "events", /* @__PURE__ */ new Map()), ot(this, "shouldPersist", !1), ot(this, "init", async () => {
      if (!Xc()) try {
        const n = { eventId: jl(), timestamp: Date.now(), domain: this.getAppDomain(), props: { event: "INIT", type: "", properties: { client_id: await this.core.crypto.getClientId(), user_agent: dh(this.core.relayer.protocol, this.core.relayer.version, Ec) } } };
        await this.sendEvent([n]);
      } catch (n) {
        this.logger.warn(n);
      }
    }), ot(this, "createEvent", (n) => {
      const { event: i = "ERROR", type: o = "", properties: { topic: a, trace: c } } = n, l = jl(), d = this.core.projectId || "", u = Date.now(), p = li({ eventId: l, timestamp: u, props: { event: i, type: o, properties: { topic: a, trace: c } }, bundleId: d, domain: this.getAppDomain() }, this.setMethods(l));
      return this.telemetryEnabled && (this.events.set(l, p), this.shouldPersist = !0), p;
    }), ot(this, "getEvent", (n) => {
      const { eventId: i, topic: o } = n;
      if (i) return this.events.get(i);
      const a = Array.from(this.events.values()).find((c) => c.props.properties.topic === o);
      if (a) return li(li({}, a), this.setMethods(a.eventId));
    }), ot(this, "deleteEvent", (n) => {
      const { eventId: i } = n;
      this.events.delete(i), this.shouldPersist = !0;
    }), ot(this, "setEventListeners", () => {
      this.core.heartbeat.on(zn.pulse, async () => {
        this.shouldPersist && await this.persist(), this.events.forEach((n) => {
          B.fromMiliseconds(Date.now()) - B.fromMiliseconds(n.timestamp) > Ib && (this.events.delete(n.eventId), this.shouldPersist = !0);
        });
      });
    }), ot(this, "setMethods", (n) => ({ addTrace: (i) => this.addTrace(n, i), setError: (i) => this.setError(n, i) })), ot(this, "addTrace", (n, i) => {
      const o = this.events.get(n);
      o && (o.props.properties.trace.push(i), this.events.set(n, o), this.shouldPersist = !0);
    }), ot(this, "setError", (n, i) => {
      const o = this.events.get(n);
      o && (o.props.type = i, o.timestamp = Date.now(), this.events.set(n, o), this.shouldPersist = !0);
    }), ot(this, "persist", async () => {
      await this.core.storage.setItem(this.storageKey, Array.from(this.events.values())), this.shouldPersist = !1;
    }), ot(this, "restore", async () => {
      try {
        const n = await this.core.storage.getItem(this.storageKey) || [];
        if (!n.length) return;
        n.forEach((i) => {
          this.events.set(i.eventId, li(li({}, i), this.setMethods(i.eventId)));
        });
      } catch (n) {
        this.logger.warn(n);
      }
    }), ot(this, "submit", async () => {
      if (!this.telemetryEnabled || this.events.size === 0) return;
      const n = [];
      for (const [i, o] of this.events) o.props.type && n.push(o);
      if (n.length !== 0) try {
        if ((await this.sendEvent(n)).ok) for (const i of n) this.events.delete(i.eventId), this.shouldPersist = !0;
      } catch (i) {
        this.logger.warn(i);
      }
    }), ot(this, "sendEvent", async (n) => {
      const i = this.getAppDomain() ? "" : "&sp=desktop";
      return await fetch(`${Sb}?projectId=${this.core.projectId}&st=events_sdk&sv=js-${Ec}${i}`, { method: "POST", body: JSON.stringify(n) });
    }), ot(this, "getAppDomain", () => lh().url), this.logger = At(t, this.context), this.telemetryEnabled = r, r ? this.restore().then(async () => {
      await this.submit(), this.setEventListeners();
    }) : this.persist();
  }
  get storageKey() {
    return this.storagePrefix + this.storageVersion + this.core.customStoragePrefix + "//" + this.context;
  }
}
var I_ = Object.defineProperty, Xd = Object.getOwnPropertySymbols, S_ = Object.prototype.hasOwnProperty, N_ = Object.prototype.propertyIsEnumerable, Tc = (s, e, t) => e in s ? I_(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t, Qd = (s, e) => {
  for (var t in e || (e = {})) S_.call(e, t) && Tc(s, t, e[t]);
  if (Xd) for (var t of Xd(e)) N_.call(e, t) && Tc(s, t, e[t]);
  return s;
}, We = (s, e, t) => Tc(s, typeof e != "symbol" ? e + "" : e, t);
let T_ = class vp extends Ig {
  constructor(e) {
    var t;
    super(e), We(this, "protocol", ip), We(this, "version", op), We(this, "name", yc), We(this, "relayUrl"), We(this, "projectId"), We(this, "customStoragePrefix"), We(this, "events", new Qr.EventEmitter()), We(this, "logger"), We(this, "heartbeat"), We(this, "relayer"), We(this, "crypto"), We(this, "storage"), We(this, "history"), We(this, "expirer"), We(this, "pairing"), We(this, "verify"), We(this, "echoClient"), We(this, "linkModeSupportedApps"), We(this, "eventClient"), We(this, "initialized", !1), We(this, "logChunkController"), We(this, "on", (a, c) => this.events.on(a, c)), We(this, "once", (a, c) => this.events.once(a, c)), We(this, "off", (a, c) => this.events.off(a, c)), We(this, "removeListener", (a, c) => this.events.removeListener(a, c)), We(this, "dispatchEnvelope", ({ topic: a, message: c, sessionExists: l }) => {
      if (!a || !c) return;
      const d = { topic: a, message: c, publishedAt: Date.now(), transportType: ze.link_mode };
      this.relayer.onLinkMessageEvent(d, { sessionExists: l });
    });
    const r = this.getGlobalCore(e == null ? void 0 : e.customStoragePrefix);
    if (r) try {
      return this.customStoragePrefix = r.customStoragePrefix, this.logger = r.logger, this.heartbeat = r.heartbeat, this.crypto = r.crypto, this.history = r.history, this.expirer = r.expirer, this.storage = r.storage, this.relayer = r.relayer, this.pairing = r.pairing, this.verify = r.verify, this.echoClient = r.echoClient, this.linkModeSupportedApps = r.linkModeSupportedApps, this.eventClient = r.eventClient, this.initialized = r.initialized, this.logChunkController = r.logChunkController, r;
    } catch (a) {
      console.warn("Failed to copy global core", a);
    }
    this.projectId = e == null ? void 0 : e.projectId, this.relayUrl = (e == null ? void 0 : e.relayUrl) || cp, this.customStoragePrefix = e != null && e.customStoragePrefix ? `:${e.customStoragePrefix}` : "";
    const n = Hn({ level: typeof (e == null ? void 0 : e.logger) == "string" && e.logger ? e.logger : GE.logger, name: yc }), { logger: i, chunkLoggerController: o } = Bc({ opts: n, maxSizeInBytes: e == null ? void 0 : e.maxLogBlobSizeInBytes, loggerOverride: e == null ? void 0 : e.logger });
    this.logChunkController = o, (t = this.logChunkController) != null && t.downloadLogsBlobInBrowser && (window.downloadLogsBlobInBrowser = async () => {
      var a, c;
      (a = this.logChunkController) != null && a.downloadLogsBlobInBrowser && ((c = this.logChunkController) == null || c.downloadLogsBlobInBrowser({ clientId: await this.crypto.getClientId() }));
    }), this.logger = At(i, this.name), this.heartbeat = new tf(), this.crypto = new tC(this, this.logger, e == null ? void 0 : e.keychain), this.history = new u_(this, this.logger), this.expirer = new f_(this, this.logger), this.storage = e != null && e.storage ? e.storage : new sf(Qd(Qd({}, YE), e == null ? void 0 : e.storageOptions)), this.relayer = new TC({ core: this, logger: this.logger, relayUrl: this.relayUrl, projectId: this.projectId }), this.pairing = new c_(this, this.logger), this.verify = new w_(this, this.logger, this.storage), this.echoClient = new b_(this.projectId || "", this.logger), this.linkModeSupportedApps = [], this.eventClient = new A_(this, this.logger, e == null ? void 0 : e.telemetryEnabled), this.setGlobalCore(this);
  }
  static async init(e) {
    const t = new vp(e);
    await t.initialize();
    const r = await t.crypto.getClientId();
    return await t.storage.setItem(cb, r), t;
  }
  get context() {
    return Xt(this.logger);
  }
  async start() {
    this.initialized || await this.initialize();
  }
  async getLogsBlob() {
    var e;
    return (e = this.logChunkController) == null ? void 0 : e.logsToBlob({ clientId: await this.crypto.getClientId() });
  }
  async addLinkModeSupportedApp(e) {
    this.linkModeSupportedApps.includes(e) || (this.linkModeSupportedApps.push(e), await this.storage.setItem(xd, this.linkModeSupportedApps));
  }
  async initialize() {
    this.logger.trace("Initialized");
    try {
      await this.crypto.init(), await this.history.init(), await this.expirer.init(), await this.relayer.init(), await this.heartbeat.init(), await this.pairing.init(), this.linkModeSupportedApps = await this.storage.getItem(xd) || [], this.initialized = !0, this.logger.info("Core Initialization Success");
    } catch (e) {
      throw this.logger.warn(`Core Initialization Failure at epoch ${Date.now()}`, e), this.logger.error(e.message), e;
    }
  }
  getGlobalCore(e = "") {
    try {
      if (this.isGlobalCoreDisabled()) return;
      const t = `_walletConnectCore_${e}`, r = `${t}_count`;
      return globalThis[r] = (globalThis[r] || 0) + 1, globalThis[r] > 1 && console.warn(`WalletConnect Core is already initialized. This is probably a mistake and can lead to unexpected behavior. Init() was called ${globalThis[r]} times.`), globalThis[t];
    } catch (t) {
      console.warn("Failed to get global WalletConnect core", t);
      return;
    }
  }
  setGlobalCore(e) {
    var t;
    try {
      if (this.isGlobalCoreDisabled()) return;
      const r = `_walletConnectCore_${((t = e.opts) == null ? void 0 : t.customStoragePrefix) || ""}`;
      globalThis[r] = e;
    } catch (r) {
      console.warn("Failed to set global WalletConnect core", r);
    }
  }
  isGlobalCoreDisabled() {
    try {
      return typeof process < "u" && process.env.DISABLE_GLOBAL_CORE === "true";
    } catch {
      return !0;
    }
  }
};
const R_ = T_, Cp = "wc", _p = 2, Ap = "client", hl = `${Cp}@${_p}:${Ap}:`, Fa = { name: Ap, logger: "error" }, eu = "WALLETCONNECT_DEEPLINK_CHOICE", P_ = "proposal", tu = "Proposal expired", O_ = "session", dn = B.SEVEN_DAYS, x_ = "engine", at = { wc_sessionPropose: { req: { ttl: B.FIVE_MINUTES, prompt: !0, tag: 1100 }, res: { ttl: B.FIVE_MINUTES, prompt: !1, tag: 1101 }, reject: { ttl: B.FIVE_MINUTES, prompt: !1, tag: 1120 }, autoReject: { ttl: B.FIVE_MINUTES, prompt: !1, tag: 1121 } }, wc_sessionSettle: { req: { ttl: B.FIVE_MINUTES, prompt: !1, tag: 1102 }, res: { ttl: B.FIVE_MINUTES, prompt: !1, tag: 1103 } }, wc_sessionUpdate: { req: { ttl: B.ONE_DAY, prompt: !1, tag: 1104 }, res: { ttl: B.ONE_DAY, prompt: !1, tag: 1105 } }, wc_sessionExtend: { req: { ttl: B.ONE_DAY, prompt: !1, tag: 1106 }, res: { ttl: B.ONE_DAY, prompt: !1, tag: 1107 } }, wc_sessionRequest: { req: { ttl: B.FIVE_MINUTES, prompt: !0, tag: 1108 }, res: { ttl: B.FIVE_MINUTES, prompt: !1, tag: 1109 } }, wc_sessionEvent: { req: { ttl: B.FIVE_MINUTES, prompt: !0, tag: 1110 }, res: { ttl: B.FIVE_MINUTES, prompt: !1, tag: 1111 } }, wc_sessionDelete: { req: { ttl: B.ONE_DAY, prompt: !1, tag: 1112 }, res: { ttl: B.ONE_DAY, prompt: !1, tag: 1113 } }, wc_sessionPing: { req: { ttl: B.ONE_DAY, prompt: !1, tag: 1114 }, res: { ttl: B.ONE_DAY, prompt: !1, tag: 1115 } }, wc_sessionAuthenticate: { req: { ttl: B.ONE_HOUR, prompt: !0, tag: 1116 }, res: { ttl: B.ONE_HOUR, prompt: !1, tag: 1117 }, reject: { ttl: B.FIVE_MINUTES, prompt: !1, tag: 1118 }, autoReject: { ttl: B.FIVE_MINUTES, prompt: !1, tag: 1119 } } }, ja = { min: B.FIVE_MINUTES, max: B.SEVEN_DAYS }, Ps = { idle: "IDLE", active: "ACTIVE" }, k_ = { eth_sendTransaction: { key: "" }, eth_sendRawTransaction: { key: "" }, wallet_sendCalls: { key: "" }, solana_signTransaction: { key: "signature" }, solana_signAllTransactions: { key: "transactions" }, solana_signAndSendTransaction: { key: "signature" }, sui_signAndExecuteTransaction: { key: "digest" }, sui_signTransaction: { key: "" }, hedera_signAndExecuteTransaction: { key: "transactionId" }, hedera_executeTransaction: { key: "transactionId" }, near_signTransaction: { key: "" }, near_signTransactions: { key: "" }, tron_signTransaction: { key: "txID" }, xrpl_signTransaction: { key: "" }, xrpl_signTransactionFor: { key: "" }, algo_signTxn: { key: "" }, sendTransfer: { key: "txid" }, stacks_stxTransfer: { key: "txId" }, polkadot_signTransaction: { key: "" }, cosmos_signDirect: { key: "" } }, U_ = "request", D_ = ["wc_sessionPropose", "wc_sessionRequest", "wc_authRequest", "wc_sessionAuthenticate"], $_ = "wc", L_ = "auth", M_ = "authKeys", B_ = "pairingTopics", F_ = "requests", fa = `${$_}@${1.5}:${L_}:`, Ro = `${fa}:PUB_KEY`;
var j_ = Object.defineProperty, q_ = Object.defineProperties, W_ = Object.getOwnPropertyDescriptors, su = Object.getOwnPropertySymbols, H_ = Object.prototype.hasOwnProperty, z_ = Object.prototype.propertyIsEnumerable, Rc = (s, e, t) => e in s ? j_(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t, He = (s, e) => {
  for (var t in e || (e = {})) H_.call(e, t) && Rc(s, t, e[t]);
  if (su) for (var t of su(e)) z_.call(e, t) && Rc(s, t, e[t]);
  return s;
}, Dt = (s, e) => q_(s, W_(e)), T = (s, e, t) => Rc(s, typeof e != "symbol" ? e + "" : e, t);
class V_ extends qg {
  constructor(e) {
    super(e), T(this, "name", x_), T(this, "events", new Wc()), T(this, "initialized", !1), T(this, "requestQueue", { state: Ps.idle, queue: [] }), T(this, "sessionRequestQueue", { state: Ps.idle, queue: [] }), T(this, "requestQueueDelay", B.ONE_SECOND), T(this, "expectedPairingMethodMap", /* @__PURE__ */ new Map()), T(this, "recentlyDeletedMap", /* @__PURE__ */ new Map()), T(this, "recentlyDeletedLimit", 200), T(this, "relayMessageCache", []), T(this, "pendingSessions", /* @__PURE__ */ new Map()), T(this, "init", async () => {
      this.initialized || (await this.cleanup(), this.registerRelayerEvents(), this.registerExpirerEvents(), this.registerPairingEvents(), await this.registerLinkModeListeners(), this.client.core.pairing.register({ methods: Object.keys(at) }), this.initialized = !0, setTimeout(async () => {
        await this.processPendingMessageEvents(), this.sessionRequestQueue.queue = this.getPendingSessionRequests(), this.processSessionRequestQueue();
      }, B.toMiliseconds(this.requestQueueDelay)));
    }), T(this, "connect", async (t) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      const r = Dt(He({}, t), { requiredNamespaces: t.requiredNamespaces || {}, optionalNamespaces: t.optionalNamespaces || {} });
      await this.isValidConnect(r), r.optionalNamespaces = aE(r.requiredNamespaces, r.optionalNamespaces), r.requiredNamespaces = {};
      const { pairingTopic: n, requiredNamespaces: i, optionalNamespaces: o, sessionProperties: a, scopedProperties: c, relays: l } = r;
      let d = n, u, p = !1;
      try {
        if (d) {
          const re = this.client.core.pairing.pairings.get(d);
          this.client.logger.warn("connect() with existing pairing topic is deprecated and will be removed in the next major release."), p = re.active;
        }
      } catch (re) {
        throw this.client.logger.error(`connect() -> pairing.get(${d}) failed`), re;
      }
      if (!d || !p) {
        const { topic: re, uri: se } = await this.client.core.pairing.create();
        d = re, u = se;
      }
      if (!d) {
        const { message: re } = M("NO_MATCHING_KEY", `connect() pairing topic: ${d}`);
        throw new Error(re);
      }
      const g = await this.client.core.crypto.generateKeyPair(), w = at.wc_sessionPropose.req.ttl || B.FIVE_MINUTES, m = nt(w), y = Dt(He(He({ requiredNamespaces: i, optionalNamespaces: o, relays: l ?? [{ protocol: ap }], proposer: { publicKey: g, metadata: this.client.metadata }, expiryTimestamp: m, pairingTopic: d }, a && { sessionProperties: a }), c && { scopedProperties: c }), { id: sr() }), C = ke("session_connect", y.id), { reject: _, resolve: U, done: j } = $r(w, tu), P = ({ id: re }) => {
        re === y.id && (this.client.events.off("proposal_expire", P), this.pendingSessions.delete(y.id), this.events.emit(C, { error: { message: tu, code: 0 } }));
      };
      return this.client.events.on("proposal_expire", P), this.events.once(C, ({ error: re, session: se }) => {
        this.client.events.off("proposal_expire", P), re ? _(re) : se && U(se);
      }), await this.sendRequest({ topic: d, method: "wc_sessionPropose", params: y, throwOnFailedPublish: !0, clientRpcId: y.id }), await this.setProposal(y.id, y), { uri: u, approval: j };
    }), T(this, "pair", async (t) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      try {
        return await this.client.core.pairing.pair(t);
      } catch (r) {
        throw this.client.logger.error("pair() failed"), r;
      }
    }), T(this, "approve", async (t) => {
      var r, n, i;
      const o = this.client.core.eventClient.createEvent({ properties: { topic: (r = t == null ? void 0 : t.id) == null ? void 0 : r.toString(), trace: [ps.session_approve_started] } });
      try {
        this.isInitialized(), await this.confirmOnlineStateOrThrow();
      } catch (E) {
        throw o.setError(kr.no_internet_connection), E;
      }
      try {
        await this.isValidProposalId(t == null ? void 0 : t.id);
      } catch (E) {
        throw this.client.logger.error(`approve() -> proposal.get(${t == null ? void 0 : t.id}) failed`), o.setError(kr.proposal_not_found), E;
      }
      try {
        await this.isValidApprove(t);
      } catch (E) {
        throw this.client.logger.error("approve() -> isValidApprove() failed"), o.setError(kr.session_approve_namespace_validation_failure), E;
      }
      const { id: a, relayProtocol: c, namespaces: l, sessionProperties: d, scopedProperties: u, sessionConfig: p } = t, g = this.client.proposal.get(a);
      this.client.core.eventClient.deleteEvent({ eventId: o.eventId });
      const { pairingTopic: w, proposer: m, requiredNamespaces: y, optionalNamespaces: C } = g;
      let _ = (n = this.client.core.eventClient) == null ? void 0 : n.getEvent({ topic: w });
      _ || (_ = (i = this.client.core.eventClient) == null ? void 0 : i.createEvent({ type: ps.session_approve_started, properties: { topic: w, trace: [ps.session_approve_started, ps.session_namespaces_validation_success] } }));
      const U = await this.client.core.crypto.generateKeyPair(), j = m.publicKey, P = await this.client.core.crypto.generateSharedKey(U, j), re = He(He(He({ relay: { protocol: c ?? "irn" }, namespaces: l, controller: { publicKey: U, metadata: this.client.metadata }, expiry: nt(dn) }, d && { sessionProperties: d }), u && { scopedProperties: u }), p && { sessionConfig: p }), se = ze.relay;
      _.addTrace(ps.subscribing_session_topic);
      try {
        await this.client.core.relayer.subscribe(P, { transportType: se });
      } catch (E) {
        throw _.setError(kr.subscribe_session_topic_failure), E;
      }
      _.addTrace(ps.subscribe_session_topic_success);
      const K = Dt(He({}, re), { topic: P, requiredNamespaces: y, optionalNamespaces: C, pairingTopic: w, acknowledged: !1, self: re.controller, peer: { publicKey: m.publicKey, metadata: m.metadata }, controller: U, transportType: ze.relay });
      await this.client.session.set(P, K), _.addTrace(ps.store_session);
      try {
        _.addTrace(ps.publishing_session_settle), await this.sendRequest({ topic: P, method: "wc_sessionSettle", params: re, throwOnFailedPublish: !0 }).catch((E) => {
          throw _ == null || _.setError(kr.session_settle_publish_failure), E;
        }), _.addTrace(ps.session_settle_publish_success), _.addTrace(ps.publishing_session_approve), await this.sendResult({ id: a, topic: w, result: { relay: { protocol: c ?? "irn" }, responderPublicKey: U }, throwOnFailedPublish: !0 }).catch((E) => {
          throw _ == null || _.setError(kr.session_approve_publish_failure), E;
        }), _.addTrace(ps.session_approve_publish_success);
      } catch (E) {
        throw this.client.logger.error(E), this.client.session.delete(P, Ke("USER_DISCONNECTED")), await this.client.core.relayer.unsubscribe(P), E;
      }
      return this.client.core.eventClient.deleteEvent({ eventId: _.eventId }), await this.client.core.pairing.updateMetadata({ topic: w, metadata: m.metadata }), await this.deleteProposal(a), await this.client.core.pairing.activate({ topic: w }), await this.setExpiry(P, nt(dn)), { topic: P, acknowledged: () => Promise.resolve(this.client.session.get(P)) };
    }), T(this, "reject", async (t) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      try {
        await this.isValidReject(t);
      } catch (o) {
        throw this.client.logger.error("reject() -> isValidReject() failed"), o;
      }
      const { id: r, reason: n } = t;
      let i;
      try {
        i = this.client.proposal.get(r).pairingTopic;
      } catch (o) {
        throw this.client.logger.error(`reject() -> proposal.get(${r}) failed`), o;
      }
      i && await this.sendError({ id: r, topic: i, error: n, rpcOpts: at.wc_sessionPropose.reject }), await this.deleteProposal(r);
    }), T(this, "update", async (t) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      try {
        await this.isValidUpdate(t);
      } catch (u) {
        throw this.client.logger.error("update() -> isValidUpdate() failed"), u;
      }
      const { topic: r, namespaces: n } = t, { done: i, resolve: o, reject: a } = $r(), c = sr(), l = Nn().toString(), d = this.client.session.get(r).namespaces;
      return this.events.once(ke("session_update", c), ({ error: u }) => {
        u ? a(u) : o();
      }), await this.client.session.update(r, { namespaces: n }), await this.sendRequest({ topic: r, method: "wc_sessionUpdate", params: { namespaces: n }, throwOnFailedPublish: !0, clientRpcId: c, relayRpcId: l }).catch((u) => {
        this.client.logger.error(u), this.client.session.update(r, { namespaces: d }), a(u);
      }), { acknowledged: i };
    }), T(this, "extend", async (t) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      try {
        await this.isValidExtend(t);
      } catch (c) {
        throw this.client.logger.error("extend() -> isValidExtend() failed"), c;
      }
      const { topic: r } = t, n = sr(), { done: i, resolve: o, reject: a } = $r();
      return this.events.once(ke("session_extend", n), ({ error: c }) => {
        c ? a(c) : o();
      }), await this.setExpiry(r, nt(dn)), this.sendRequest({ topic: r, method: "wc_sessionExtend", params: {}, clientRpcId: n, throwOnFailedPublish: !0 }).catch((c) => {
        a(c);
      }), { acknowledged: i };
    }), T(this, "request", async (t) => {
      this.isInitialized();
      try {
        await this.isValidRequest(t);
      } catch (y) {
        throw this.client.logger.error("request() -> isValidRequest() failed"), y;
      }
      const { chainId: r, request: n, topic: i, expiry: o = at.wc_sessionRequest.req.ttl } = t, a = this.client.session.get(i);
      (a == null ? void 0 : a.transportType) === ze.relay && await this.confirmOnlineStateOrThrow();
      const c = sr(), l = Nn().toString(), { done: d, resolve: u, reject: p } = $r(o, "Request expired. Please try again.");
      this.events.once(ke("session_request", c), ({ error: y, result: C }) => {
        y ? p(y) : u(C);
      });
      const g = "wc_sessionRequest", w = this.getAppLinkIfEnabled(a.peer.metadata, a.transportType);
      if (w) return await this.sendRequest({ clientRpcId: c, relayRpcId: l, topic: i, method: g, params: { request: Dt(He({}, n), { expiryTimestamp: nt(o) }), chainId: r }, expiry: o, throwOnFailedPublish: !0, appLink: w }).catch((y) => p(y)), this.client.events.emit("session_request_sent", { topic: i, request: n, chainId: r, id: c }), await d();
      const m = { request: Dt(He({}, n), { expiryTimestamp: nt(o) }), chainId: r };
      return await Promise.all([new Promise(async (y) => {
        await this.sendRequest({ clientRpcId: c, relayRpcId: l, topic: i, method: g, params: m, expiry: o, throwOnFailedPublish: !0, tvf: this.getTVFParams(c, m) }).catch((C) => p(C)), this.client.events.emit("session_request_sent", { topic: i, request: n, chainId: r, id: c }), y();
      }), new Promise(async (y) => {
        var C;
        if (!((C = a.sessionConfig) != null && C.disableDeepLink)) {
          const _ = await sw(this.client.core.storage, eu);
          await Qm({ id: c, topic: i, wcDeepLink: _ });
        }
        y();
      }), d()]).then((y) => y[2]);
    }), T(this, "respond", async (t) => {
      this.isInitialized(), await this.isValidRespond(t);
      const { topic: r, response: n } = t, { id: i } = n, o = this.client.session.get(r);
      o.transportType === ze.relay && await this.confirmOnlineStateOrThrow();
      const a = this.getAppLinkIfEnabled(o.peer.metadata, o.transportType);
      Vs(n) ? await this.sendResult({ id: i, topic: r, result: n.result, throwOnFailedPublish: !0, appLink: a }) : xs(n) && await this.sendError({ id: i, topic: r, error: n.error, appLink: a }), this.cleanupAfterResponse(t);
    }), T(this, "ping", async (t) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      try {
        await this.isValidPing(t);
      } catch (n) {
        throw this.client.logger.error("ping() -> isValidPing() failed"), n;
      }
      const { topic: r } = t;
      if (this.client.session.keys.includes(r)) {
        const n = sr(), i = Nn().toString(), { done: o, resolve: a, reject: c } = $r();
        this.events.once(ke("session_ping", n), ({ error: l }) => {
          l ? c(l) : a();
        }), await Promise.all([this.sendRequest({ topic: r, method: "wc_sessionPing", params: {}, throwOnFailedPublish: !0, clientRpcId: n, relayRpcId: i }), o()]);
      } else this.client.core.pairing.pairings.keys.includes(r) && (this.client.logger.warn("ping() on pairing topic is deprecated and will be removed in the next major release."), await this.client.core.pairing.ping({ topic: r }));
    }), T(this, "emit", async (t) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow(), await this.isValidEmit(t);
      const { topic: r, event: n, chainId: i } = t, o = Nn().toString(), a = sr();
      await this.sendRequest({ topic: r, method: "wc_sessionEvent", params: { event: n, chainId: i }, throwOnFailedPublish: !0, relayRpcId: o, clientRpcId: a });
    }), T(this, "disconnect", async (t) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow(), await this.isValidDisconnect(t);
      const { topic: r } = t;
      if (this.client.session.keys.includes(r)) await this.sendRequest({ topic: r, method: "wc_sessionDelete", params: Ke("USER_DISCONNECTED"), throwOnFailedPublish: !0 }), await this.deleteSession({ topic: r, emitEvent: !1 });
      else if (this.client.core.pairing.pairings.keys.includes(r)) await this.client.core.pairing.disconnect({ topic: r });
      else {
        const { message: n } = M("MISMATCHED_TOPIC", `Session or pairing topic not found: ${r}`);
        throw new Error(n);
      }
    }), T(this, "find", (t) => (this.isInitialized(), this.client.session.getAll().filter((r) => dE(r, t)))), T(this, "getPendingSessionRequests", () => this.client.pendingRequest.getAll()), T(this, "authenticate", async (t, r) => {
      var n;
      this.isInitialized(), this.isValidAuthenticate(t);
      const i = r && this.client.core.linkModeSupportedApps.includes(r) && ((n = this.client.metadata.redirect) == null ? void 0 : n.linkMode), o = i ? ze.link_mode : ze.relay;
      o === ze.relay && await this.confirmOnlineStateOrThrow();
      const { chains: a, statement: c = "", uri: l, domain: d, nonce: u, type: p, exp: g, nbf: w, methods: m = [], expiry: y } = t, C = [...t.resources || []], { topic: _, uri: U } = await this.client.core.pairing.create({ methods: ["wc_sessionAuthenticate"], transportType: o });
      this.client.logger.info({ message: "Generated new pairing", pairing: { topic: _, uri: U } });
      const j = await this.client.core.crypto.generateKeyPair(), P = No(j);
      if (await Promise.all([this.client.auth.authKeys.set(Ro, { responseTopic: P, publicKey: j }), this.client.auth.pairingTopics.set(P, { topic: P, pairingTopic: _ })]), await this.client.core.relayer.subscribe(P, { transportType: o }), this.client.logger.info(`sending request to new pairing topic: ${_}`), m.length > 0) {
        const { namespace: k } = On(a[0]);
        let Q = wy(k, "request", m);
        So(C) && (Q = Ey(Q, C.pop())), C.push(Q);
      }
      const re = y && y > at.wc_sessionAuthenticate.req.ttl ? y : at.wc_sessionAuthenticate.req.ttl, se = { authPayload: { type: p ?? "caip122", chains: a, statement: c, aud: l, domain: d, version: "1", nonce: u, iat: (/* @__PURE__ */ new Date()).toISOString(), exp: g, nbf: w, resources: C }, requester: { publicKey: j, metadata: this.client.metadata }, expiryTimestamp: nt(re) }, K = { eip155: { chains: a, methods: [.../* @__PURE__ */ new Set(["personal_sign", ...m])], events: ["chainChanged", "accountsChanged"] } }, E = { requiredNamespaces: {}, optionalNamespaces: K, relays: [{ protocol: "irn" }], pairingTopic: _, proposer: { publicKey: j, metadata: this.client.metadata }, expiryTimestamp: nt(at.wc_sessionPropose.req.ttl), id: sr() }, { done: v, resolve: b, reject: A } = $r(re, "Request expired"), I = sr(), x = ke("session_connect", E.id), R = ke("session_request", I), O = async ({ error: k, session: Q }) => {
        this.events.off(R, L), k ? A(k) : Q && b({ session: Q });
      }, L = async (k) => {
        var Q, Z, ce;
        if (await this.deletePendingAuthRequest(I, { message: "fulfilled", code: 0 }), k.error) {
          const Ge = Ke("WC_METHOD_UNSUPPORTED", "wc_sessionAuthenticate");
          return k.error.code === Ge.code ? void 0 : (this.events.off(x, O), A(k.error.message));
        }
        await this.deleteProposal(E.id), this.events.off(x, O);
        const { cacaos: Ee, responder: ye } = k.result, be = [], Fe = [];
        for (const Ge of Ee) {
          await Xl({ cacao: Ge, projectId: this.client.core.projectId }) || (this.client.logger.error(Ge, "Signature verification failed"), A(Ke("SESSION_SETTLEMENT_FAILED", "Signature verification failed")));
          const { p: es } = Ge, qs = So(es.resources), yl = [ac(es.iss)], Yp = qo(es.iss);
          if (qs) {
            const ma = Ql(qs), Zp = ed(qs);
            be.push(...ma), yl.push(...Zp);
          }
          for (const ma of yl) Fe.push(`${ma}:${Yp}`);
        }
        const Xe = await this.client.core.crypto.generateSharedKey(j, ye.publicKey);
        let Je;
        be.length > 0 && (Je = { topic: Xe, acknowledged: !0, self: { publicKey: j, metadata: this.client.metadata }, peer: ye, controller: ye.publicKey, expiry: nt(dn), requiredNamespaces: {}, optionalNamespaces: {}, relay: { protocol: "irn" }, pairingTopic: _, namespaces: Ad([...new Set(be)], [...new Set(Fe)]), transportType: o }, await this.client.core.relayer.subscribe(Xe, { transportType: o }), await this.client.session.set(Xe, Je), _ && await this.client.core.pairing.updateMetadata({ topic: _, metadata: ye.metadata }), Je = this.client.session.get(Xe)), (Q = this.client.metadata.redirect) != null && Q.linkMode && (Z = ye.metadata.redirect) != null && Z.linkMode && (ce = ye.metadata.redirect) != null && ce.universal && r && (this.client.core.addLinkModeSupportedApp(ye.metadata.redirect.universal), this.client.session.update(Xe, { transportType: ze.link_mode })), b({ auths: Ee, session: Je });
      };
      this.events.once(x, O), this.events.once(R, L);
      let z;
      try {
        if (i) {
          const k = Br("wc_sessionAuthenticate", se, I);
          this.client.core.history.set(_, k);
          const Q = await this.client.core.crypto.encode("", k, { type: to, encoding: Er });
          z = wo(r, _, Q);
        } else await Promise.all([this.sendRequest({ topic: _, method: "wc_sessionAuthenticate", params: se, expiry: t.expiry, throwOnFailedPublish: !0, clientRpcId: I }), this.sendRequest({ topic: _, method: "wc_sessionPropose", params: E, expiry: at.wc_sessionPropose.req.ttl, throwOnFailedPublish: !0, clientRpcId: E.id })]);
      } catch (k) {
        throw this.events.off(x, O), this.events.off(R, L), k;
      }
      return await this.setProposal(E.id, E), await this.setAuthRequest(I, { request: Dt(He({}, se), { verifyContext: {} }), pairingTopic: _, transportType: o }), { uri: z ?? U, response: v };
    }), T(this, "approveSessionAuthenticate", async (t) => {
      const { id: r, auths: n } = t, i = this.client.core.eventClient.createEvent({ properties: { topic: r.toString(), trace: [Ur.authenticated_session_approve_started] } });
      try {
        this.isInitialized();
      } catch (y) {
        throw i.setError(ai.no_internet_connection), y;
      }
      const o = this.getPendingAuthRequest(r);
      if (!o) throw i.setError(ai.authenticated_session_pending_request_not_found), new Error(`Could not find pending auth request with id ${r}`);
      const a = o.transportType || ze.relay;
      a === ze.relay && await this.confirmOnlineStateOrThrow();
      const c = o.requester.publicKey, l = await this.client.core.crypto.generateKeyPair(), d = No(c), u = { type: Js, receiverPublicKey: c, senderPublicKey: l }, p = [], g = [];
      for (const y of n) {
        if (!await Xl({ cacao: y, projectId: this.client.core.projectId })) {
          i.setError(ai.invalid_cacao);
          const P = Ke("SESSION_SETTLEMENT_FAILED", "Signature verification failed");
          throw await this.sendError({ id: r, topic: d, error: P, encodeOpts: u }), new Error(P.message);
        }
        i.addTrace(Ur.cacaos_verified);
        const { p: C } = y, _ = So(C.resources), U = [ac(C.iss)], j = qo(C.iss);
        if (_) {
          const P = Ql(_), re = ed(_);
          p.push(...P), U.push(...re);
        }
        for (const P of U) g.push(`${P}:${j}`);
      }
      const w = await this.client.core.crypto.generateSharedKey(l, c);
      i.addTrace(Ur.create_authenticated_session_topic);
      let m;
      if ((p == null ? void 0 : p.length) > 0) {
        m = { topic: w, acknowledged: !0, self: { publicKey: l, metadata: this.client.metadata }, peer: { publicKey: c, metadata: o.requester.metadata }, controller: c, expiry: nt(dn), authentication: n, requiredNamespaces: {}, optionalNamespaces: {}, relay: { protocol: "irn" }, pairingTopic: o.pairingTopic, namespaces: Ad([...new Set(p)], [...new Set(g)]), transportType: a }, i.addTrace(Ur.subscribing_authenticated_session_topic);
        try {
          await this.client.core.relayer.subscribe(w, { transportType: a });
        } catch (y) {
          throw i.setError(ai.subscribe_authenticated_session_topic_failure), y;
        }
        i.addTrace(Ur.subscribe_authenticated_session_topic_success), await this.client.session.set(w, m), i.addTrace(Ur.store_authenticated_session), await this.client.core.pairing.updateMetadata({ topic: o.pairingTopic, metadata: o.requester.metadata });
      }
      i.addTrace(Ur.publishing_authenticated_session_approve);
      try {
        await this.sendResult({ topic: d, id: r, result: { cacaos: n, responder: { publicKey: l, metadata: this.client.metadata } }, encodeOpts: u, throwOnFailedPublish: !0, appLink: this.getAppLinkIfEnabled(o.requester.metadata, a) });
      } catch (y) {
        throw i.setError(ai.authenticated_session_approve_publish_failure), y;
      }
      return await this.client.auth.requests.delete(r, { message: "fulfilled", code: 0 }), await this.client.core.pairing.activate({ topic: o.pairingTopic }), this.client.core.eventClient.deleteEvent({ eventId: i.eventId }), { session: m };
    }), T(this, "rejectSessionAuthenticate", async (t) => {
      this.isInitialized();
      const { id: r, reason: n } = t, i = this.getPendingAuthRequest(r);
      if (!i) throw new Error(`Could not find pending auth request with id ${r}`);
      i.transportType === ze.relay && await this.confirmOnlineStateOrThrow();
      const o = i.requester.publicKey, a = await this.client.core.crypto.generateKeyPair(), c = No(o), l = { type: Js, receiverPublicKey: o, senderPublicKey: a };
      await this.sendError({ id: r, topic: c, error: n, encodeOpts: l, rpcOpts: at.wc_sessionAuthenticate.reject, appLink: this.getAppLinkIfEnabled(i.requester.metadata, i.transportType) }), await this.client.auth.requests.delete(r, { message: "rejected", code: 0 }), await this.deleteProposal(r);
    }), T(this, "formatAuthMessage", (t) => {
      this.isInitialized();
      const { request: r, iss: n } = t;
      return Nh(r, n);
    }), T(this, "processRelayMessageCache", () => {
      setTimeout(async () => {
        if (this.relayMessageCache.length !== 0) for (; this.relayMessageCache.length > 0; ) try {
          const t = this.relayMessageCache.shift();
          t && await this.onRelayMessage(t);
        } catch (t) {
          this.client.logger.error(t);
        }
      }, 50);
    }), T(this, "cleanupDuplicatePairings", async (t) => {
      if (t.pairingTopic) try {
        const r = this.client.core.pairing.pairings.get(t.pairingTopic), n = this.client.core.pairing.pairings.getAll().filter((i) => {
          var o, a;
          return ((o = i.peerMetadata) == null ? void 0 : o.url) && ((a = i.peerMetadata) == null ? void 0 : a.url) === t.peer.metadata.url && i.topic && i.topic !== r.topic;
        });
        if (n.length === 0) return;
        this.client.logger.info(`Cleaning up ${n.length} duplicate pairing(s)`), await Promise.all(n.map((i) => this.client.core.pairing.disconnect({ topic: i.topic }))), this.client.logger.info("Duplicate pairings clean up finished");
      } catch (r) {
        this.client.logger.error(r);
      }
    }), T(this, "deleteSession", async (t) => {
      var r;
      const { topic: n, expirerHasDeleted: i = !1, emitEvent: o = !0, id: a = 0 } = t, { self: c } = this.client.session.get(n);
      await this.client.core.relayer.unsubscribe(n), await this.client.session.delete(n, Ke("USER_DISCONNECTED")), this.addToRecentlyDeleted(n, "session"), this.client.core.crypto.keychain.has(c.publicKey) && await this.client.core.crypto.deleteKeyPair(c.publicKey), this.client.core.crypto.keychain.has(n) && await this.client.core.crypto.deleteSymKey(n), i || this.client.core.expirer.del(n), this.client.core.storage.removeItem(eu).catch((l) => this.client.logger.warn(l)), this.getPendingSessionRequests().forEach((l) => {
        l.topic === n && this.deletePendingSessionRequest(l.id, Ke("USER_DISCONNECTED"));
      }), n === ((r = this.sessionRequestQueue.queue[0]) == null ? void 0 : r.topic) && (this.sessionRequestQueue.state = Ps.idle), o && this.client.events.emit("session_delete", { id: a, topic: n });
    }), T(this, "deleteProposal", async (t, r) => {
      if (r) try {
        const n = this.client.proposal.get(t), i = this.client.core.eventClient.getEvent({ topic: n.pairingTopic });
        i == null || i.setError(kr.proposal_expired);
      } catch {
      }
      await Promise.all([this.client.proposal.delete(t, Ke("USER_DISCONNECTED")), r ? Promise.resolve() : this.client.core.expirer.del(t)]), this.addToRecentlyDeleted(t, "proposal");
    }), T(this, "deletePendingSessionRequest", async (t, r, n = !1) => {
      await Promise.all([this.client.pendingRequest.delete(t, r), n ? Promise.resolve() : this.client.core.expirer.del(t)]), this.addToRecentlyDeleted(t, "request"), this.sessionRequestQueue.queue = this.sessionRequestQueue.queue.filter((i) => i.id !== t), n && (this.sessionRequestQueue.state = Ps.idle, this.client.events.emit("session_request_expire", { id: t }));
    }), T(this, "deletePendingAuthRequest", async (t, r, n = !1) => {
      await Promise.all([this.client.auth.requests.delete(t, r), n ? Promise.resolve() : this.client.core.expirer.del(t)]);
    }), T(this, "setExpiry", async (t, r) => {
      this.client.session.keys.includes(t) && (this.client.core.expirer.set(t, r), await this.client.session.update(t, { expiry: r }));
    }), T(this, "setProposal", async (t, r) => {
      this.client.core.expirer.set(t, nt(at.wc_sessionPropose.req.ttl)), await this.client.proposal.set(t, r);
    }), T(this, "setAuthRequest", async (t, r) => {
      const { request: n, pairingTopic: i, transportType: o = ze.relay } = r;
      this.client.core.expirer.set(t, n.expiryTimestamp), await this.client.auth.requests.set(t, { authPayload: n.authPayload, requester: n.requester, expiryTimestamp: n.expiryTimestamp, id: t, pairingTopic: i, verifyContext: n.verifyContext, transportType: o });
    }), T(this, "setPendingSessionRequest", async (t) => {
      const { id: r, topic: n, params: i, verifyContext: o } = t, a = i.request.expiryTimestamp || nt(at.wc_sessionRequest.req.ttl);
      this.client.core.expirer.set(r, a), await this.client.pendingRequest.set(r, { id: r, topic: n, params: i, verifyContext: o });
    }), T(this, "sendRequest", async (t) => {
      const { topic: r, method: n, params: i, expiry: o, relayRpcId: a, clientRpcId: c, throwOnFailedPublish: l, appLink: d, tvf: u } = t, p = Br(n, i, c);
      let g;
      const w = !!d;
      try {
        const C = w ? Er : Es;
        g = await this.client.core.crypto.encode(r, p, { encoding: C });
      } catch (C) {
        throw await this.cleanup(), this.client.logger.error(`sendRequest() -> core.crypto.encode() for topic ${r} failed`), C;
      }
      let m;
      if (D_.includes(n)) {
        const C = Us(JSON.stringify(p)), _ = Us(g);
        m = await this.client.core.verify.register({ id: _, decryptedId: C });
      }
      const y = at[n].req;
      if (y.attestation = m, o && (y.ttl = o), a && (y.id = a), this.client.core.history.set(r, p), w) {
        const C = wo(d, r, g);
        await global.Linking.openURL(C, this.client.name);
      } else {
        const C = at[n].req;
        o && (C.ttl = o), a && (C.id = a), C.tvf = Dt(He({}, u), { correlationId: p.id }), l ? (C.internal = Dt(He({}, C.internal), { throwOnFailedPublish: !0 }), await this.client.core.relayer.publish(r, g, C)) : this.client.core.relayer.publish(r, g, C).catch((_) => this.client.logger.error(_));
      }
      return p.id;
    }), T(this, "sendResult", async (t) => {
      const { id: r, topic: n, result: i, throwOnFailedPublish: o, encodeOpts: a, appLink: c } = t, l = ra(r, i);
      let d;
      const u = c && typeof (global == null ? void 0 : global.Linking) < "u";
      try {
        const w = u ? Er : Es;
        d = await this.client.core.crypto.encode(n, l, Dt(He({}, a || {}), { encoding: w }));
      } catch (w) {
        throw await this.cleanup(), this.client.logger.error(`sendResult() -> core.crypto.encode() for topic ${n} failed`), w;
      }
      let p, g;
      try {
        p = await this.client.core.history.get(n, r);
        const w = p.request;
        try {
          g = this.getTVFParams(r, w.params, i);
        } catch (m) {
          this.client.logger.warn(`sendResult() -> getTVFParams() failed: ${m == null ? void 0 : m.message}`);
        }
      } catch (w) {
        throw this.client.logger.error(`sendResult() -> history.get(${n}, ${r}) failed`), w;
      }
      if (u) {
        const w = wo(c, n, d);
        await global.Linking.openURL(w, this.client.name);
      } else {
        const w = p.request.method, m = at[w].res;
        m.tvf = Dt(He({}, g), { correlationId: r }), o ? (m.internal = Dt(He({}, m.internal), { throwOnFailedPublish: !0 }), await this.client.core.relayer.publish(n, d, m)) : this.client.core.relayer.publish(n, d, m).catch((y) => this.client.logger.error(y));
      }
      await this.client.core.history.resolve(l);
    }), T(this, "sendError", async (t) => {
      const { id: r, topic: n, error: i, encodeOpts: o, rpcOpts: a, appLink: c } = t, l = Ou(r, i);
      let d;
      const u = c && typeof (global == null ? void 0 : global.Linking) < "u";
      try {
        const g = u ? Er : Es;
        d = await this.client.core.crypto.encode(n, l, Dt(He({}, o || {}), { encoding: g }));
      } catch (g) {
        throw await this.cleanup(), this.client.logger.error(`sendError() -> core.crypto.encode() for topic ${n} failed`), g;
      }
      let p;
      try {
        p = await this.client.core.history.get(n, r);
      } catch (g) {
        throw this.client.logger.error(`sendError() -> history.get(${n}, ${r}) failed`), g;
      }
      if (u) {
        const g = wo(c, n, d);
        await global.Linking.openURL(g, this.client.name);
      } else {
        const g = p.request.method, w = a || at[g].res;
        this.client.core.relayer.publish(n, d, w);
      }
      await this.client.core.history.resolve(l);
    }), T(this, "cleanup", async () => {
      const t = [], r = [];
      this.client.session.getAll().forEach((n) => {
        let i = !1;
        gr(n.expiry) && (i = !0), this.client.core.crypto.keychain.has(n.topic) || (i = !0), i && t.push(n.topic);
      }), this.client.proposal.getAll().forEach((n) => {
        gr(n.expiryTimestamp) && r.push(n.id);
      }), await Promise.all([...t.map((n) => this.deleteSession({ topic: n })), ...r.map((n) => this.deleteProposal(n))]);
    }), T(this, "onProviderMessageEvent", async (t) => {
      !this.initialized || this.relayMessageCache.length > 0 ? this.relayMessageCache.push(t) : await this.onRelayMessage(t);
    }), T(this, "onRelayEventRequest", async (t) => {
      this.requestQueue.queue.push(t), await this.processRequestsQueue();
    }), T(this, "processRequestsQueue", async () => {
      if (this.requestQueue.state === Ps.active) {
        this.client.logger.info("Request queue already active, skipping...");
        return;
      }
      for (this.client.logger.info(`Request queue starting with ${this.requestQueue.queue.length} requests`); this.requestQueue.queue.length > 0; ) {
        this.requestQueue.state = Ps.active;
        const t = this.requestQueue.queue.shift();
        if (t) try {
          await this.processRequest(t);
        } catch (r) {
          this.client.logger.warn(r);
        }
      }
      this.requestQueue.state = Ps.idle;
    }), T(this, "processRequest", async (t) => {
      const { topic: r, payload: n, attestation: i, transportType: o, encryptedId: a } = t, c = n.method;
      if (!this.shouldIgnorePairingRequest({ topic: r, requestMethod: c })) switch (c) {
        case "wc_sessionPropose":
          return await this.onSessionProposeRequest({ topic: r, payload: n, attestation: i, encryptedId: a });
        case "wc_sessionSettle":
          return await this.onSessionSettleRequest(r, n);
        case "wc_sessionUpdate":
          return await this.onSessionUpdateRequest(r, n);
        case "wc_sessionExtend":
          return await this.onSessionExtendRequest(r, n);
        case "wc_sessionPing":
          return await this.onSessionPingRequest(r, n);
        case "wc_sessionDelete":
          return await this.onSessionDeleteRequest(r, n);
        case "wc_sessionRequest":
          return await this.onSessionRequest({ topic: r, payload: n, attestation: i, encryptedId: a, transportType: o });
        case "wc_sessionEvent":
          return await this.onSessionEventRequest(r, n);
        case "wc_sessionAuthenticate":
          return await this.onSessionAuthenticateRequest({ topic: r, payload: n, attestation: i, encryptedId: a, transportType: o });
        default:
          return this.client.logger.info(`Unsupported request method ${c}`);
      }
    }), T(this, "onRelayEventResponse", async (t) => {
      const { topic: r, payload: n, transportType: i } = t, o = (await this.client.core.history.get(r, n.id)).request.method;
      switch (o) {
        case "wc_sessionPropose":
          return this.onSessionProposeResponse(r, n, i);
        case "wc_sessionSettle":
          return this.onSessionSettleResponse(r, n);
        case "wc_sessionUpdate":
          return this.onSessionUpdateResponse(r, n);
        case "wc_sessionExtend":
          return this.onSessionExtendResponse(r, n);
        case "wc_sessionPing":
          return this.onSessionPingResponse(r, n);
        case "wc_sessionRequest":
          return this.onSessionRequestResponse(r, n);
        case "wc_sessionAuthenticate":
          return this.onSessionAuthenticateResponse(r, n);
        default:
          return this.client.logger.info(`Unsupported response method ${o}`);
      }
    }), T(this, "onRelayEventUnknownPayload", (t) => {
      const { topic: r } = t, { message: n } = M("MISSING_OR_INVALID", `Decoded payload on topic ${r} is not identifiable as a JSON-RPC request or a response.`);
      throw new Error(n);
    }), T(this, "shouldIgnorePairingRequest", (t) => {
      const { topic: r, requestMethod: n } = t, i = this.expectedPairingMethodMap.get(r);
      return !i || i.includes(n) ? !1 : !!(i.includes("wc_sessionAuthenticate") && this.client.events.listenerCount("session_authenticate") > 0);
    }), T(this, "onSessionProposeRequest", async (t) => {
      const { topic: r, payload: n, attestation: i, encryptedId: o } = t, { params: a, id: c } = n;
      try {
        const l = this.client.core.eventClient.getEvent({ topic: r });
        this.client.events.listenerCount("session_proposal") === 0 && (console.warn("No listener for session_proposal event"), l == null || l.setError(Gs.proposal_listener_not_found)), this.isValidConnect(He({}, n.params));
        const d = a.expiryTimestamp || nt(at.wc_sessionPropose.req.ttl), u = He({ id: c, pairingTopic: r, expiryTimestamp: d, attestation: i, encryptedId: o }, a);
        await this.setProposal(c, u);
        const p = await this.getVerifyContext({ attestationId: i, hash: Us(JSON.stringify(n)), encryptedId: o, metadata: u.proposer.metadata });
        l == null || l.addTrace(Os.emit_session_proposal), this.client.events.emit("session_proposal", { id: c, params: u, verifyContext: p });
      } catch (l) {
        await this.sendError({ id: c, topic: r, error: l, rpcOpts: at.wc_sessionPropose.autoReject }), this.client.logger.error(l);
      }
    }), T(this, "onSessionProposeResponse", async (t, r, n) => {
      const { id: i } = r;
      if (Vs(r)) {
        const { result: o } = r;
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", result: o });
        const a = this.client.proposal.get(i);
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", proposal: a });
        const c = a.proposer.publicKey;
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", selfPublicKey: c });
        const l = o.responderPublicKey;
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", peerPublicKey: l });
        const d = await this.client.core.crypto.generateSharedKey(c, l);
        this.pendingSessions.set(i, { sessionTopic: d, pairingTopic: t, proposalId: i, publicKey: c });
        const u = await this.client.core.relayer.subscribe(d, { transportType: n });
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", subscriptionId: u }), await this.client.core.pairing.activate({ topic: t });
      } else if (xs(r)) {
        await this.deleteProposal(i);
        const o = ke("session_connect", i);
        if (this.events.listenerCount(o) === 0) throw new Error(`emitting ${o} without any listeners, 954`);
        this.events.emit(o, { error: r.error });
      }
    }), T(this, "onSessionSettleRequest", async (t, r) => {
      const { id: n, params: i } = r;
      try {
        this.isValidSessionSettleRequest(i);
        const { relay: o, controller: a, expiry: c, namespaces: l, sessionProperties: d, scopedProperties: u, sessionConfig: p } = r.params, g = [...this.pendingSessions.values()].find((y) => y.sessionTopic === t);
        if (!g) return this.client.logger.error(`Pending session not found for topic ${t}`);
        const w = this.client.proposal.get(g.proposalId), m = Dt(He(He(He({ topic: t, relay: o, expiry: c, namespaces: l, acknowledged: !0, pairingTopic: g.pairingTopic, requiredNamespaces: w.requiredNamespaces, optionalNamespaces: w.optionalNamespaces, controller: a.publicKey, self: { publicKey: g.publicKey, metadata: this.client.metadata }, peer: { publicKey: a.publicKey, metadata: a.metadata } }, d && { sessionProperties: d }), u && { scopedProperties: u }), p && { sessionConfig: p }), { transportType: ze.relay });
        await this.client.session.set(m.topic, m), await this.setExpiry(m.topic, m.expiry), await this.client.core.pairing.updateMetadata({ topic: g.pairingTopic, metadata: m.peer.metadata }), this.client.events.emit("session_connect", { session: m }), this.events.emit(ke("session_connect", g.proposalId), { session: m }), this.pendingSessions.delete(g.proposalId), this.deleteProposal(g.proposalId, !1), this.cleanupDuplicatePairings(m), await this.sendResult({ id: r.id, topic: t, result: !0 });
      } catch (o) {
        await this.sendError({ id: n, topic: t, error: o }), this.client.logger.error(o);
      }
    }), T(this, "onSessionSettleResponse", async (t, r) => {
      const { id: n } = r;
      Vs(r) ? (await this.client.session.update(t, { acknowledged: !0 }), this.events.emit(ke("session_approve", n), {})) : xs(r) && (await this.client.session.delete(t, Ke("USER_DISCONNECTED")), this.events.emit(ke("session_approve", n), { error: r.error }));
    }), T(this, "onSessionUpdateRequest", async (t, r) => {
      const { params: n, id: i } = r;
      try {
        const o = `${t}_session_update`, a = ii.get(o);
        if (a && this.isRequestOutOfSync(a, i)) {
          this.client.logger.warn(`Discarding out of sync request - ${i}`), this.sendError({ id: i, topic: t, error: Ke("INVALID_UPDATE_REQUEST") });
          return;
        }
        this.isValidUpdate(He({ topic: t }, n));
        try {
          ii.set(o, i), await this.client.session.update(t, { namespaces: n.namespaces }), await this.sendResult({ id: i, topic: t, result: !0 });
        } catch (c) {
          throw ii.delete(o), c;
        }
        this.client.events.emit("session_update", { id: i, topic: t, params: n });
      } catch (o) {
        await this.sendError({ id: i, topic: t, error: o }), this.client.logger.error(o);
      }
    }), T(this, "isRequestOutOfSync", (t, r) => r.toString().slice(0, -3) < t.toString().slice(0, -3)), T(this, "onSessionUpdateResponse", (t, r) => {
      const { id: n } = r, i = ke("session_update", n);
      if (this.events.listenerCount(i) === 0) throw new Error(`emitting ${i} without any listeners`);
      Vs(r) ? this.events.emit(ke("session_update", n), {}) : xs(r) && this.events.emit(ke("session_update", n), { error: r.error });
    }), T(this, "onSessionExtendRequest", async (t, r) => {
      const { id: n } = r;
      try {
        this.isValidExtend({ topic: t }), await this.setExpiry(t, nt(dn)), await this.sendResult({ id: n, topic: t, result: !0 }), this.client.events.emit("session_extend", { id: n, topic: t });
      } catch (i) {
        await this.sendError({ id: n, topic: t, error: i }), this.client.logger.error(i);
      }
    }), T(this, "onSessionExtendResponse", (t, r) => {
      const { id: n } = r, i = ke("session_extend", n);
      if (this.events.listenerCount(i) === 0) throw new Error(`emitting ${i} without any listeners`);
      Vs(r) ? this.events.emit(ke("session_extend", n), {}) : xs(r) && this.events.emit(ke("session_extend", n), { error: r.error });
    }), T(this, "onSessionPingRequest", async (t, r) => {
      const { id: n } = r;
      try {
        this.isValidPing({ topic: t }), await this.sendResult({ id: n, topic: t, result: !0, throwOnFailedPublish: !0 }), this.client.events.emit("session_ping", { id: n, topic: t });
      } catch (i) {
        await this.sendError({ id: n, topic: t, error: i }), this.client.logger.error(i);
      }
    }), T(this, "onSessionPingResponse", (t, r) => {
      const { id: n } = r, i = ke("session_ping", n);
      setTimeout(() => {
        if (this.events.listenerCount(i) === 0) throw new Error(`emitting ${i} without any listeners 2176`);
        Vs(r) ? this.events.emit(ke("session_ping", n), {}) : xs(r) && this.events.emit(ke("session_ping", n), { error: r.error });
      }, 500);
    }), T(this, "onSessionDeleteRequest", async (t, r) => {
      const { id: n } = r;
      try {
        this.isValidDisconnect({ topic: t, reason: r.params }), Promise.all([new Promise((i) => {
          this.client.core.relayer.once(ct.publish, async () => {
            i(await this.deleteSession({ topic: t, id: n }));
          });
        }), this.sendResult({ id: n, topic: t, result: !0 }), this.cleanupPendingSentRequestsForTopic({ topic: t, error: Ke("USER_DISCONNECTED") })]).catch((i) => this.client.logger.error(i));
      } catch (i) {
        this.client.logger.error(i);
      }
    }), T(this, "onSessionRequest", async (t) => {
      var r, n, i;
      const { topic: o, payload: a, attestation: c, encryptedId: l, transportType: d } = t, { id: u, params: p } = a;
      try {
        await this.isValidRequest(He({ topic: o }, p));
        const g = this.client.session.get(o), w = await this.getVerifyContext({ attestationId: c, hash: Us(JSON.stringify(Br("wc_sessionRequest", p, u))), encryptedId: l, metadata: g.peer.metadata, transportType: d }), m = { id: u, topic: o, params: p, verifyContext: w };
        await this.setPendingSessionRequest(m), d === ze.link_mode && (r = g.peer.metadata.redirect) != null && r.universal && this.client.core.addLinkModeSupportedApp((n = g.peer.metadata.redirect) == null ? void 0 : n.universal), (i = this.client.signConfig) != null && i.disableRequestQueue ? this.emitSessionRequest(m) : (this.addSessionRequestToSessionRequestQueue(m), this.processSessionRequestQueue());
      } catch (g) {
        await this.sendError({ id: u, topic: o, error: g }), this.client.logger.error(g);
      }
    }), T(this, "onSessionRequestResponse", (t, r) => {
      const { id: n } = r, i = ke("session_request", n);
      if (this.events.listenerCount(i) === 0) throw new Error(`emitting ${i} without any listeners`);
      Vs(r) ? this.events.emit(ke("session_request", n), { result: r.result }) : xs(r) && this.events.emit(ke("session_request", n), { error: r.error });
    }), T(this, "onSessionEventRequest", async (t, r) => {
      const { id: n, params: i } = r;
      try {
        const o = `${t}_session_event_${i.event.name}`, a = ii.get(o);
        if (a && this.isRequestOutOfSync(a, n)) {
          this.client.logger.info(`Discarding out of sync request - ${n}`);
          return;
        }
        this.isValidEmit(He({ topic: t }, i)), this.client.events.emit("session_event", { id: n, topic: t, params: i }), ii.set(o, n);
      } catch (o) {
        await this.sendError({ id: n, topic: t, error: o }), this.client.logger.error(o);
      }
    }), T(this, "onSessionAuthenticateResponse", (t, r) => {
      const { id: n } = r;
      this.client.logger.trace({ type: "method", method: "onSessionAuthenticateResponse", topic: t, payload: r }), Vs(r) ? this.events.emit(ke("session_request", n), { result: r.result }) : xs(r) && this.events.emit(ke("session_request", n), { error: r.error });
    }), T(this, "onSessionAuthenticateRequest", async (t) => {
      var r;
      const { topic: n, payload: i, attestation: o, encryptedId: a, transportType: c } = t;
      try {
        const { requester: l, authPayload: d, expiryTimestamp: u } = i.params, p = await this.getVerifyContext({ attestationId: o, hash: Us(JSON.stringify(i)), encryptedId: a, metadata: l.metadata, transportType: c }), g = { requester: l, pairingTopic: n, id: i.id, authPayload: d, verifyContext: p, expiryTimestamp: u };
        await this.setAuthRequest(i.id, { request: g, pairingTopic: n, transportType: c }), c === ze.link_mode && (r = l.metadata.redirect) != null && r.universal && this.client.core.addLinkModeSupportedApp(l.metadata.redirect.universal), this.client.events.emit("session_authenticate", { topic: n, params: i.params, id: i.id, verifyContext: p });
      } catch (l) {
        this.client.logger.error(l);
        const d = i.params.requester.publicKey, u = await this.client.core.crypto.generateKeyPair(), p = this.getAppLinkIfEnabled(i.params.requester.metadata, c), g = { type: Js, receiverPublicKey: d, senderPublicKey: u };
        await this.sendError({ id: i.id, topic: n, error: l, encodeOpts: g, rpcOpts: at.wc_sessionAuthenticate.autoReject, appLink: p });
      }
    }), T(this, "addSessionRequestToSessionRequestQueue", (t) => {
      this.sessionRequestQueue.queue.push(t);
    }), T(this, "cleanupAfterResponse", (t) => {
      this.deletePendingSessionRequest(t.response.id, { message: "fulfilled", code: 0 }), setTimeout(() => {
        this.sessionRequestQueue.state = Ps.idle, this.processSessionRequestQueue();
      }, B.toMiliseconds(this.requestQueueDelay));
    }), T(this, "cleanupPendingSentRequestsForTopic", ({ topic: t, error: r }) => {
      const n = this.client.core.history.pending;
      n.length > 0 && n.filter((i) => i.topic === t && i.request.method === "wc_sessionRequest").forEach((i) => {
        const o = i.request.id, a = ke("session_request", o);
        if (this.events.listenerCount(a) === 0) throw new Error(`emitting ${a} without any listeners`);
        this.events.emit(ke("session_request", i.request.id), { error: r });
      });
    }), T(this, "processSessionRequestQueue", () => {
      if (this.sessionRequestQueue.state === Ps.active) {
        this.client.logger.info("session request queue is already active.");
        return;
      }
      const t = this.sessionRequestQueue.queue[0];
      if (!t) {
        this.client.logger.info("session request queue is empty.");
        return;
      }
      try {
        this.sessionRequestQueue.state = Ps.active, this.emitSessionRequest(t);
      } catch (r) {
        this.client.logger.error(r);
      }
    }), T(this, "emitSessionRequest", (t) => {
      this.client.events.emit("session_request", t);
    }), T(this, "onPairingCreated", (t) => {
      if (t.methods && this.expectedPairingMethodMap.set(t.topic, t.methods), t.active) return;
      const r = this.client.proposal.getAll().find((n) => n.pairingTopic === t.topic);
      r && this.onSessionProposeRequest({ topic: t.topic, payload: Br("wc_sessionPropose", Dt(He({}, r), { requiredNamespaces: r.requiredNamespaces, optionalNamespaces: r.optionalNamespaces, relays: r.relays, proposer: r.proposer, sessionProperties: r.sessionProperties, scopedProperties: r.scopedProperties }), r.id), attestation: r.attestation, encryptedId: r.encryptedId });
    }), T(this, "isValidConnect", async (t) => {
      if (!Lt(t)) {
        const { message: l } = M("MISSING_OR_INVALID", `connect() params: ${JSON.stringify(t)}`);
        throw new Error(l);
      }
      const { pairingTopic: r, requiredNamespaces: n, optionalNamespaces: i, sessionProperties: o, scopedProperties: a, relays: c } = t;
      if (ft(r) || await this.isValidPairingTopic(r), !CE(c)) {
        const { message: l } = M("MISSING_OR_INVALID", `connect() relays: ${c}`);
        throw new Error(l);
      }
      if (!ft(n) && _r(n) !== 0) {
        const l = "requiredNamespaces are deprecated and are automatically assigned to optionalNamespaces";
        ["fatal", "error", "silent"].includes(this.client.logger.level) ? console.warn(l) : this.client.logger.warn(l), this.validateNamespaces(n, "requiredNamespaces");
      }
      if (!ft(i) && _r(i) !== 0 && this.validateNamespaces(i, "optionalNamespaces"), ft(o) || this.validateSessionProps(o, "sessionProperties"), !ft(a)) {
        this.validateSessionProps(a, "scopedProperties");
        const l = Object.keys(n || {}).concat(Object.keys(i || {}));
        if (!Object.keys(a).every((d) => l.includes(d))) throw new Error(`Scoped properties must be a subset of required/optional namespaces, received: ${JSON.stringify(a)}, required/optional namespaces: ${JSON.stringify(l)}`);
      }
    }), T(this, "validateNamespaces", (t, r) => {
      const n = vE(t, "connect()", r);
      if (n) throw new Error(n.message);
    }), T(this, "isValidApprove", async (t) => {
      if (!Lt(t)) throw new Error(M("MISSING_OR_INVALID", `approve() params: ${t}`).message);
      const { id: r, namespaces: n, relayProtocol: i, sessionProperties: o, scopedProperties: a } = t;
      this.checkRecentlyDeleted(r), await this.isValidProposalId(r);
      const c = this.client.proposal.get(r), l = Ua(n, "approve()");
      if (l) throw new Error(l.message);
      const d = Nd(c.requiredNamespaces, n, "approve()");
      if (d) throw new Error(d.message);
      if (!et(i, !0)) {
        const { message: u } = M("MISSING_OR_INVALID", `approve() relayProtocol: ${i}`);
        throw new Error(u);
      }
      if (ft(o) || this.validateSessionProps(o, "sessionProperties"), !ft(a)) {
        this.validateSessionProps(a, "scopedProperties");
        const u = new Set(Object.keys(n));
        if (!Object.keys(a).every((p) => u.has(p))) throw new Error(`Scoped properties must be a subset of approved namespaces, received: ${JSON.stringify(a)}, approved namespaces: ${Array.from(u).join(", ")}`);
      }
    }), T(this, "isValidReject", async (t) => {
      if (!Lt(t)) {
        const { message: i } = M("MISSING_OR_INVALID", `reject() params: ${t}`);
        throw new Error(i);
      }
      const { id: r, reason: n } = t;
      if (this.checkRecentlyDeleted(r), await this.isValidProposalId(r), !AE(n)) {
        const { message: i } = M("MISSING_OR_INVALID", `reject() reason: ${JSON.stringify(n)}`);
        throw new Error(i);
      }
    }), T(this, "isValidSessionSettleRequest", (t) => {
      if (!Lt(t)) {
        const { message: l } = M("MISSING_OR_INVALID", `onSessionSettleRequest() params: ${t}`);
        throw new Error(l);
      }
      const { relay: r, controller: n, namespaces: i, expiry: o } = t;
      if (!np(r)) {
        const { message: l } = M("MISSING_OR_INVALID", "onSessionSettleRequest() relay protocol should be a string");
        throw new Error(l);
      }
      const a = gE(n, "onSessionSettleRequest()");
      if (a) throw new Error(a.message);
      const c = Ua(i, "onSessionSettleRequest()");
      if (c) throw new Error(c.message);
      if (gr(o)) {
        const { message: l } = M("EXPIRED", "onSessionSettleRequest()");
        throw new Error(l);
      }
    }), T(this, "isValidUpdate", async (t) => {
      if (!Lt(t)) {
        const { message: c } = M("MISSING_OR_INVALID", `update() params: ${t}`);
        throw new Error(c);
      }
      const { topic: r, namespaces: n } = t;
      this.checkRecentlyDeleted(r), await this.isValidSessionTopic(r);
      const i = this.client.session.get(r), o = Ua(n, "update()");
      if (o) throw new Error(o.message);
      const a = Nd(i.requiredNamespaces, n, "update()");
      if (a) throw new Error(a.message);
    }), T(this, "isValidExtend", async (t) => {
      if (!Lt(t)) {
        const { message: n } = M("MISSING_OR_INVALID", `extend() params: ${t}`);
        throw new Error(n);
      }
      const { topic: r } = t;
      this.checkRecentlyDeleted(r), await this.isValidSessionTopic(r);
    }), T(this, "isValidRequest", async (t) => {
      if (!Lt(t)) {
        const { message: c } = M("MISSING_OR_INVALID", `request() params: ${t}`);
        throw new Error(c);
      }
      const { topic: r, request: n, chainId: i, expiry: o } = t;
      this.checkRecentlyDeleted(r), await this.isValidSessionTopic(r);
      const { namespaces: a } = this.client.session.get(r);
      if (!Sd(a, i)) {
        const { message: c } = M("MISSING_OR_INVALID", `request() chainId: ${i}`);
        throw new Error(c);
      }
      if (!IE(n)) {
        const { message: c } = M("MISSING_OR_INVALID", `request() ${JSON.stringify(n)}`);
        throw new Error(c);
      }
      if (!TE(a, i, n.method)) {
        const { message: c } = M("MISSING_OR_INVALID", `request() method: ${n.method}`);
        throw new Error(c);
      }
      if (o && !xE(o, ja)) {
        const { message: c } = M("MISSING_OR_INVALID", `request() expiry: ${o}. Expiry must be a number (in seconds) between ${ja.min} and ${ja.max}`);
        throw new Error(c);
      }
    }), T(this, "isValidRespond", async (t) => {
      var r;
      if (!Lt(t)) {
        const { message: o } = M("MISSING_OR_INVALID", `respond() params: ${t}`);
        throw new Error(o);
      }
      const { topic: n, response: i } = t;
      try {
        await this.isValidSessionTopic(n);
      } catch (o) {
        throw (r = t == null ? void 0 : t.response) != null && r.id && this.cleanupAfterResponse(t), o;
      }
      if (!SE(i)) {
        const { message: o } = M("MISSING_OR_INVALID", `respond() response: ${JSON.stringify(i)}`);
        throw new Error(o);
      }
    }), T(this, "isValidPing", async (t) => {
      if (!Lt(t)) {
        const { message: n } = M("MISSING_OR_INVALID", `ping() params: ${t}`);
        throw new Error(n);
      }
      const { topic: r } = t;
      await this.isValidSessionOrPairingTopic(r);
    }), T(this, "isValidEmit", async (t) => {
      if (!Lt(t)) {
        const { message: a } = M("MISSING_OR_INVALID", `emit() params: ${t}`);
        throw new Error(a);
      }
      const { topic: r, event: n, chainId: i } = t;
      await this.isValidSessionTopic(r);
      const { namespaces: o } = this.client.session.get(r);
      if (!Sd(o, i)) {
        const { message: a } = M("MISSING_OR_INVALID", `emit() chainId: ${i}`);
        throw new Error(a);
      }
      if (!NE(n)) {
        const { message: a } = M("MISSING_OR_INVALID", `emit() event: ${JSON.stringify(n)}`);
        throw new Error(a);
      }
      if (!RE(o, i, n.name)) {
        const { message: a } = M("MISSING_OR_INVALID", `emit() event: ${JSON.stringify(n)}`);
        throw new Error(a);
      }
    }), T(this, "isValidDisconnect", async (t) => {
      if (!Lt(t)) {
        const { message: n } = M("MISSING_OR_INVALID", `disconnect() params: ${t}`);
        throw new Error(n);
      }
      const { topic: r } = t;
      await this.isValidSessionOrPairingTopic(r);
    }), T(this, "isValidAuthenticate", (t) => {
      const { chains: r, uri: n, domain: i, nonce: o } = t;
      if (!Array.isArray(r) || r.length === 0) throw new Error("chains is required and must be a non-empty array");
      if (!et(n, !1)) throw new Error("uri is required parameter");
      if (!et(i, !1)) throw new Error("domain is required parameter");
      if (!et(o, !1)) throw new Error("nonce is required parameter");
      if ([...new Set(r.map((c) => On(c).namespace))].length > 1) throw new Error("Multi-namespace requests are not supported. Please request single namespace only.");
      const { namespace: a } = On(r[0]);
      if (a !== "eip155") throw new Error("Only eip155 namespace is supported for authenticated sessions. Please use .connect() for non-eip155 chains.");
    }), T(this, "getVerifyContext", async (t) => {
      const { attestationId: r, hash: n, encryptedId: i, metadata: o, transportType: a } = t, c = { verified: { verifyUrl: o.verifyUrl || Ni, validation: "UNKNOWN", origin: o.url || "" } };
      try {
        if (a === ze.link_mode) {
          const d = this.getAppLinkIfEnabled(o, a);
          return c.verified.validation = d && new URL(d).origin === new URL(o.url).origin ? "VALID" : "INVALID", c;
        }
        const l = await this.client.core.verify.resolve({ attestationId: r, hash: n, encryptedId: i, verifyUrl: o.verifyUrl });
        l && (c.verified.origin = l.origin, c.verified.isScam = l.isScam, c.verified.validation = l.origin === new URL(o.url).origin ? "VALID" : "INVALID");
      } catch (l) {
        this.client.logger.warn(l);
      }
      return this.client.logger.debug(`Verify context: ${JSON.stringify(c)}`), c;
    }), T(this, "validateSessionProps", (t, r) => {
      Object.values(t).forEach((n, i) => {
        if (n == null) {
          const { message: o } = M("MISSING_OR_INVALID", `${r} must contain an existing value for each key. Received: ${n} for key ${Object.keys(t)[i]}`);
          throw new Error(o);
        }
      });
    }), T(this, "getPendingAuthRequest", (t) => {
      const r = this.client.auth.requests.get(t);
      return typeof r == "object" ? r : void 0;
    }), T(this, "addToRecentlyDeleted", (t, r) => {
      if (this.recentlyDeletedMap.set(t, r), this.recentlyDeletedMap.size >= this.recentlyDeletedLimit) {
        let n = 0;
        const i = this.recentlyDeletedLimit / 2;
        for (const o of this.recentlyDeletedMap.keys()) {
          if (n++ >= i) break;
          this.recentlyDeletedMap.delete(o);
        }
      }
    }), T(this, "checkRecentlyDeleted", (t) => {
      const r = this.recentlyDeletedMap.get(t);
      if (r) {
        const { message: n } = M("MISSING_OR_INVALID", `Record was recently deleted - ${r}: ${t}`);
        throw new Error(n);
      }
    }), T(this, "isLinkModeEnabled", (t, r) => {
      var n, i, o, a, c, l, d, u, p;
      return !t || r !== ze.link_mode ? !1 : ((i = (n = this.client.metadata) == null ? void 0 : n.redirect) == null ? void 0 : i.linkMode) === !0 && ((a = (o = this.client.metadata) == null ? void 0 : o.redirect) == null ? void 0 : a.universal) !== void 0 && ((l = (c = this.client.metadata) == null ? void 0 : c.redirect) == null ? void 0 : l.universal) !== "" && ((d = t == null ? void 0 : t.redirect) == null ? void 0 : d.universal) !== void 0 && ((u = t == null ? void 0 : t.redirect) == null ? void 0 : u.universal) !== "" && ((p = t == null ? void 0 : t.redirect) == null ? void 0 : p.linkMode) === !0 && this.client.core.linkModeSupportedApps.includes(t.redirect.universal) && typeof (global == null ? void 0 : global.Linking) < "u";
    }), T(this, "getAppLinkIfEnabled", (t, r) => {
      var n;
      return this.isLinkModeEnabled(t, r) ? (n = t == null ? void 0 : t.redirect) == null ? void 0 : n.universal : void 0;
    }), T(this, "handleLinkModeMessage", ({ url: t }) => {
      if (!t || !t.includes("wc_ev") || !t.includes("topic")) return;
      const r = Fl(t, "topic") || "", n = decodeURIComponent(Fl(t, "wc_ev") || ""), i = this.client.session.keys.includes(r);
      i && this.client.session.update(r, { transportType: ze.link_mode }), this.client.core.dispatchEnvelope({ topic: r, message: n, sessionExists: i });
    }), T(this, "registerLinkModeListeners", async () => {
      var t;
      if (Xc() || Or() && (t = this.client.metadata.redirect) != null && t.linkMode) {
        const r = global == null ? void 0 : global.Linking;
        if (typeof r < "u") {
          r.addEventListener("url", this.handleLinkModeMessage, this.client.name);
          const n = await r.getInitialURL();
          n && setTimeout(() => {
            this.handleLinkModeMessage({ url: n });
          }, 50);
        }
      }
    }), T(this, "getTVFParams", (t, r, n) => {
      var i, o, a;
      if (!((i = r.request) != null && i.method)) return {};
      const c = { correlationId: t, rpcMethods: [r.request.method], chainId: r.chainId };
      try {
        const l = this.extractTxHashesFromResult(r.request, n);
        c.txHashes = l, c.contractAddresses = this.isValidContractData(r.request.params) ? [(a = (o = r.request.params) == null ? void 0 : o[0]) == null ? void 0 : a.to] : [];
      } catch (l) {
        this.client.logger.warn("Error getting TVF params", l);
      }
      return c;
    }), T(this, "isValidContractData", (t) => {
      var r;
      if (!t) return !1;
      try {
        const n = (t == null ? void 0 : t.data) || ((r = t == null ? void 0 : t[0]) == null ? void 0 : r.data);
        if (!n.startsWith("0x")) return !1;
        const i = n.slice(2);
        return /^[0-9a-fA-F]*$/.test(i) ? i.length % 2 === 0 : !1;
      } catch {
      }
      return !1;
    }), T(this, "extractTxHashesFromResult", (t, r) => {
      var n;
      try {
        if (!r) return [];
        const i = t.method, o = k_[i];
        if (i === "sui_signTransaction") return [ty(r.transactionBytes)];
        if (i === "near_signTransaction") return [Gl(r)];
        if (i === "near_signTransactions") return r.map((c) => Gl(c));
        if (i === "xrpl_signTransactionFor" || i === "xrpl_signTransaction") return [(n = r.tx_json) == null ? void 0 : n.hash];
        if (i === "polkadot_signTransaction") return [KE({ transaction: t.params.transactionPayload, signature: r.signature })];
        if (i === "algo_signTxn") return Xs(r) ? r.map((c) => Yl(c)) : [Yl(r)];
        if (i === "cosmos_signDirect") return [ry(r)];
        if (typeof r == "string") return [r];
        const a = r[o.key];
        if (Xs(a)) return i === "solana_signAllTransactions" ? a.map((c) => ey(c)) : a;
        if (typeof a == "string") return [a];
      } catch (i) {
        this.client.logger.warn("Error extracting tx hashes from result", i);
      }
      return [];
    });
  }
  async processPendingMessageEvents() {
    try {
      const e = this.client.session.keys, t = this.client.core.relayer.messages.getWithoutAck(e);
      for (const [r, n] of Object.entries(t)) for (const i of n) try {
        await this.onProviderMessageEvent({ topic: r, message: i, publishedAt: Date.now() });
      } catch {
        this.client.logger.warn(`Error processing pending message event for topic: ${r}, message: ${i}`);
      }
    } catch (e) {
      this.client.logger.warn("processPendingMessageEvents failed", e);
    }
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = M("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
  async confirmOnlineStateOrThrow() {
    await this.client.core.relayer.confirmOnlineStateOrThrow();
  }
  registerRelayerEvents() {
    this.client.core.relayer.on(ct.message, (e) => {
      this.onProviderMessageEvent(e);
    });
  }
  async onRelayMessage(e) {
    const { topic: t, message: r, attestation: n, transportType: i } = e, { publicKey: o } = this.client.auth.authKeys.keys.includes(Ro) ? this.client.auth.authKeys.get(Ro) : { publicKey: void 0 };
    try {
      const a = await this.client.core.crypto.decode(t, r, { receiverPublicKey: o, encoding: i === ze.link_mode ? Er : Es });
      jc(a) ? (this.client.core.history.set(t, a), await this.onRelayEventRequest({ topic: t, payload: a, attestation: n, transportType: i, encryptedId: Us(r) })) : qc(a) ? (await this.client.core.history.resolve(a), await this.onRelayEventResponse({ topic: t, payload: a, transportType: i }), this.client.core.history.delete(t, a.id)) : await this.onRelayEventUnknownPayload({ topic: t, payload: a, transportType: i }), await this.client.core.relayer.messages.ack(t, r);
    } catch (a) {
      this.client.logger.error(a);
    }
  }
  registerExpirerEvents() {
    this.client.core.expirer.on(is.expired, async (e) => {
      const { topic: t, id: r } = hh(e.target);
      if (r && this.client.pendingRequest.keys.includes(r)) return await this.deletePendingSessionRequest(r, M("EXPIRED"), !0);
      if (r && this.client.auth.requests.keys.includes(r)) return await this.deletePendingAuthRequest(r, M("EXPIRED"), !0);
      t ? this.client.session.keys.includes(t) && (await this.deleteSession({ topic: t, expirerHasDeleted: !0 }), this.client.events.emit("session_expire", { topic: t })) : r && (await this.deleteProposal(r, !0), this.client.events.emit("proposal_expire", { id: r }));
    });
  }
  registerPairingEvents() {
    this.client.core.pairing.events.on(Lr.create, (e) => this.onPairingCreated(e)), this.client.core.pairing.events.on(Lr.delete, (e) => {
      this.addToRecentlyDeleted(e.topic, "pairing");
    });
  }
  isValidPairingTopic(e) {
    if (!et(e, !1)) {
      const { message: t } = M("MISSING_OR_INVALID", `pairing topic should be a string: ${e}`);
      throw new Error(t);
    }
    if (!this.client.core.pairing.pairings.keys.includes(e)) {
      const { message: t } = M("NO_MATCHING_KEY", `pairing topic doesn't exist: ${e}`);
      throw new Error(t);
    }
    if (gr(this.client.core.pairing.pairings.get(e).expiry)) {
      const { message: t } = M("EXPIRED", `pairing topic: ${e}`);
      throw new Error(t);
    }
  }
  async isValidSessionTopic(e) {
    if (!et(e, !1)) {
      const { message: t } = M("MISSING_OR_INVALID", `session topic should be a string: ${e}`);
      throw new Error(t);
    }
    if (this.checkRecentlyDeleted(e), !this.client.session.keys.includes(e)) {
      const { message: t } = M("NO_MATCHING_KEY", `session topic doesn't exist: ${e}`);
      throw new Error(t);
    }
    if (gr(this.client.session.get(e).expiry)) {
      await this.deleteSession({ topic: e });
      const { message: t } = M("EXPIRED", `session topic: ${e}`);
      throw new Error(t);
    }
    if (!this.client.core.crypto.keychain.has(e)) {
      const { message: t } = M("MISSING_OR_INVALID", `session topic does not exist in keychain: ${e}`);
      throw await this.deleteSession({ topic: e }), new Error(t);
    }
  }
  async isValidSessionOrPairingTopic(e) {
    if (this.checkRecentlyDeleted(e), this.client.session.keys.includes(e)) await this.isValidSessionTopic(e);
    else if (this.client.core.pairing.pairings.keys.includes(e)) this.isValidPairingTopic(e);
    else if (et(e, !1)) {
      const { message: t } = M("NO_MATCHING_KEY", `session or pairing topic doesn't exist: ${e}`);
      throw new Error(t);
    } else {
      const { message: t } = M("MISSING_OR_INVALID", `session or pairing topic should be a string: ${e}`);
      throw new Error(t);
    }
  }
  async isValidProposalId(e) {
    if (!_E(e)) {
      const { message: t } = M("MISSING_OR_INVALID", `proposal id should be a number: ${e}`);
      throw new Error(t);
    }
    if (!this.client.proposal.keys.includes(e)) {
      const { message: t } = M("NO_MATCHING_KEY", `proposal id doesn't exist: ${e}`);
      throw new Error(t);
    }
    if (gr(this.client.proposal.get(e).expiryTimestamp)) {
      await this.deleteProposal(e);
      const { message: t } = M("EXPIRED", `proposal id: ${e}`);
      throw new Error(t);
    }
  }
}
class K_ extends rn {
  constructor(e, t) {
    super(e, t, P_, hl), this.core = e, this.logger = t;
  }
}
let G_ = class extends rn {
  constructor(e, t) {
    super(e, t, O_, hl), this.core = e, this.logger = t;
  }
};
class Y_ extends rn {
  constructor(e, t) {
    super(e, t, U_, hl, (r) => r.id), this.core = e, this.logger = t;
  }
}
class Z_ extends rn {
  constructor(e, t) {
    super(e, t, M_, fa, () => Ro), this.core = e, this.logger = t;
  }
}
class J_ extends rn {
  constructor(e, t) {
    super(e, t, B_, fa), this.core = e, this.logger = t;
  }
}
class X_ extends rn {
  constructor(e, t) {
    super(e, t, F_, fa, (r) => r.id), this.core = e, this.logger = t;
  }
}
var Q_ = Object.defineProperty, e1 = (s, e, t) => e in s ? Q_(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t, qa = (s, e, t) => e1(s, typeof e != "symbol" ? e + "" : e, t);
class t1 {
  constructor(e, t) {
    this.core = e, this.logger = t, qa(this, "authKeys"), qa(this, "pairingTopics"), qa(this, "requests"), this.authKeys = new Z_(this.core, this.logger), this.pairingTopics = new J_(this.core, this.logger), this.requests = new X_(this.core, this.logger);
  }
  async init() {
    await this.authKeys.init(), await this.pairingTopics.init(), await this.requests.init();
  }
}
var s1 = Object.defineProperty, r1 = (s, e, t) => e in s ? s1(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t, Ce = (s, e, t) => r1(s, typeof e != "symbol" ? e + "" : e, t);
let n1 = class Ip extends jg {
  constructor(e) {
    super(e), Ce(this, "protocol", Cp), Ce(this, "version", _p), Ce(this, "name", Fa.name), Ce(this, "metadata"), Ce(this, "core"), Ce(this, "logger"), Ce(this, "events", new Qr.EventEmitter()), Ce(this, "engine"), Ce(this, "session"), Ce(this, "proposal"), Ce(this, "pendingRequest"), Ce(this, "auth"), Ce(this, "signConfig"), Ce(this, "on", (r, n) => this.events.on(r, n)), Ce(this, "once", (r, n) => this.events.once(r, n)), Ce(this, "off", (r, n) => this.events.off(r, n)), Ce(this, "removeListener", (r, n) => this.events.removeListener(r, n)), Ce(this, "removeAllListeners", (r) => this.events.removeAllListeners(r)), Ce(this, "connect", async (r) => {
      try {
        return await this.engine.connect(r);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    }), Ce(this, "pair", async (r) => {
      try {
        return await this.engine.pair(r);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    }), Ce(this, "approve", async (r) => {
      try {
        return await this.engine.approve(r);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    }), Ce(this, "reject", async (r) => {
      try {
        return await this.engine.reject(r);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    }), Ce(this, "update", async (r) => {
      try {
        return await this.engine.update(r);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    }), Ce(this, "extend", async (r) => {
      try {
        return await this.engine.extend(r);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    }), Ce(this, "request", async (r) => {
      try {
        return await this.engine.request(r);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    }), Ce(this, "respond", async (r) => {
      try {
        return await this.engine.respond(r);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    }), Ce(this, "ping", async (r) => {
      try {
        return await this.engine.ping(r);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    }), Ce(this, "emit", async (r) => {
      try {
        return await this.engine.emit(r);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    }), Ce(this, "disconnect", async (r) => {
      try {
        return await this.engine.disconnect(r);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    }), Ce(this, "find", (r) => {
      try {
        return this.engine.find(r);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    }), Ce(this, "getPendingSessionRequests", () => {
      try {
        return this.engine.getPendingSessionRequests();
      } catch (r) {
        throw this.logger.error(r.message), r;
      }
    }), Ce(this, "authenticate", async (r, n) => {
      try {
        return await this.engine.authenticate(r, n);
      } catch (i) {
        throw this.logger.error(i.message), i;
      }
    }), Ce(this, "formatAuthMessage", (r) => {
      try {
        return this.engine.formatAuthMessage(r);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    }), Ce(this, "approveSessionAuthenticate", async (r) => {
      try {
        return await this.engine.approveSessionAuthenticate(r);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    }), Ce(this, "rejectSessionAuthenticate", async (r) => {
      try {
        return await this.engine.rejectSessionAuthenticate(r);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    }), this.name = (e == null ? void 0 : e.name) || Fa.name, this.metadata = Km(e == null ? void 0 : e.metadata), this.signConfig = e == null ? void 0 : e.signConfig;
    const t = typeof (e == null ? void 0 : e.logger) < "u" && typeof (e == null ? void 0 : e.logger) != "string" ? e.logger : Fc(Hn({ level: (e == null ? void 0 : e.logger) || Fa.logger }));
    this.core = (e == null ? void 0 : e.core) || new R_(e), this.logger = At(t, this.name), this.session = new G_(this.core, this.logger), this.proposal = new K_(this.core, this.logger), this.pendingRequest = new Y_(this.core, this.logger), this.engine = new V_(this), this.auth = new t1(this.core, this.logger);
  }
  static async init(e) {
    const t = new Ip(e);
    return await t.initialize(), t;
  }
  get context() {
    return Xt(this.logger);
  }
  get pairing() {
    return this.core.pairing.pairings;
  }
  async initialize() {
    this.logger.trace("Initialized");
    try {
      await this.core.start(), await this.session.init(), await this.proposal.init(), await this.pendingRequest.init(), await this.auth.init(), await this.engine.init(), this.logger.info("SignClient Initialization Success"), setTimeout(() => {
        this.engine.processRelayMessageCache();
      }, B.toMiliseconds(B.ONE_SECOND));
    } catch (e) {
      throw this.logger.info("SignClient Initialization Failure"), this.logger.error(e.message), e;
    }
  }
};
const ru = "error", i1 = "wss://relay.walletconnect.org", o1 = "wc", a1 = "universal_provider", Eo = `${o1}@2:${a1}:`, Sp = "https://rpc.walletconnect.org/v1/", _n = "generic", c1 = `${Sp}bundler`, us = { DEFAULT_CHAIN_CHANGED: "default_chain_changed" };
function pl(s) {
  return s == null || typeof s != "object" && typeof s != "function";
}
function Np(s) {
  return Object.getOwnPropertySymbols(s).filter((e) => Object.prototype.propertyIsEnumerable.call(s, e));
}
function Tp(s) {
  return s == null ? s === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(s);
}
const l1 = "[object RegExp]", Rp = "[object String]", Pp = "[object Number]", Op = "[object Boolean]", xp = "[object Arguments]", d1 = "[object Symbol]", u1 = "[object Date]", h1 = "[object Map]", p1 = "[object Set]", f1 = "[object Array]", g1 = "[object ArrayBuffer]", m1 = "[object Object]", w1 = "[object DataView]", y1 = "[object Uint8Array]", E1 = "[object Uint8ClampedArray]", b1 = "[object Uint16Array]", v1 = "[object Uint32Array]", C1 = "[object Int8Array]", _1 = "[object Int16Array]", A1 = "[object Int32Array]", I1 = "[object Float32Array]", S1 = "[object Float64Array]";
function fl(s) {
  return ArrayBuffer.isView(s) && !(s instanceof DataView);
}
function N1(s, e) {
  return Rn(s, void 0, s, /* @__PURE__ */ new Map(), e);
}
function Rn(s, e, t, r = /* @__PURE__ */ new Map(), n = void 0) {
  const i = n == null ? void 0 : n(s, e, t, r);
  if (i != null) return i;
  if (pl(s)) return s;
  if (r.has(s)) return r.get(s);
  if (Array.isArray(s)) {
    const o = new Array(s.length);
    r.set(s, o);
    for (let a = 0; a < s.length; a++) o[a] = Rn(s[a], a, t, r, n);
    return Object.hasOwn(s, "index") && (o.index = s.index), Object.hasOwn(s, "input") && (o.input = s.input), o;
  }
  if (s instanceof Date) return new Date(s.getTime());
  if (s instanceof RegExp) {
    const o = new RegExp(s.source, s.flags);
    return o.lastIndex = s.lastIndex, o;
  }
  if (s instanceof Map) {
    const o = /* @__PURE__ */ new Map();
    r.set(s, o);
    for (const [a, c] of s) o.set(a, Rn(c, a, t, r, n));
    return o;
  }
  if (s instanceof Set) {
    const o = /* @__PURE__ */ new Set();
    r.set(s, o);
    for (const a of s) o.add(Rn(a, void 0, t, r, n));
    return o;
  }
  if (typeof Buffer < "u" && Buffer.isBuffer(s)) return s.subarray();
  if (fl(s)) {
    const o = new (Object.getPrototypeOf(s)).constructor(s.length);
    r.set(s, o);
    for (let a = 0; a < s.length; a++) o[a] = Rn(s[a], a, t, r, n);
    return o;
  }
  if (s instanceof ArrayBuffer || typeof SharedArrayBuffer < "u" && s instanceof SharedArrayBuffer) return s.slice(0);
  if (s instanceof DataView) {
    const o = new DataView(s.buffer.slice(0), s.byteOffset, s.byteLength);
    return r.set(s, o), Mr(o, s, t, r, n), o;
  }
  if (typeof File < "u" && s instanceof File) {
    const o = new File([s], s.name, { type: s.type });
    return r.set(s, o), Mr(o, s, t, r, n), o;
  }
  if (s instanceof Blob) {
    const o = new Blob([s], { type: s.type });
    return r.set(s, o), Mr(o, s, t, r, n), o;
  }
  if (s instanceof Error) {
    const o = new s.constructor();
    return r.set(s, o), o.message = s.message, o.name = s.name, o.stack = s.stack, o.cause = s.cause, Mr(o, s, t, r, n), o;
  }
  if (typeof s == "object" && T1(s)) {
    const o = Object.create(Object.getPrototypeOf(s));
    return r.set(s, o), Mr(o, s, t, r, n), o;
  }
  return s;
}
function Mr(s, e, t = s, r, n) {
  const i = [...Object.keys(e), ...Np(e)];
  for (let o = 0; o < i.length; o++) {
    const a = i[o], c = Object.getOwnPropertyDescriptor(s, a);
    (c == null || c.writable) && (s[a] = Rn(e[a], a, t, r, n));
  }
}
function T1(s) {
  switch (Tp(s)) {
    case xp:
    case f1:
    case g1:
    case w1:
    case Op:
    case u1:
    case I1:
    case S1:
    case C1:
    case _1:
    case A1:
    case h1:
    case Pp:
    case m1:
    case l1:
    case p1:
    case Rp:
    case d1:
    case y1:
    case E1:
    case b1:
    case v1:
      return !0;
    default:
      return !1;
  }
}
function R1(s, e) {
  return N1(s, (t, r, n, i) => {
    if (typeof s == "object") switch (Object.prototype.toString.call(s)) {
      case Pp:
      case Rp:
      case Op: {
        const o = new s.constructor(s == null ? void 0 : s.valueOf());
        return Mr(o, s), o;
      }
      case xp: {
        const o = {};
        return Mr(o, s), o.length = s.length, o[Symbol.iterator] = s[Symbol.iterator], o;
      }
      default:
        return;
    }
  });
}
function nu(s) {
  return R1(s);
}
function iu(s) {
  return s !== null && typeof s == "object" && Tp(s) === "[object Arguments]";
}
function ou(s) {
  return typeof s == "object" && s !== null;
}
function P1() {
}
function O1(s) {
  return fl(s);
}
function x1(s) {
  var t;
  if (typeof s != "object" || s == null) return !1;
  if (Object.getPrototypeOf(s) === null) return !0;
  if (Object.prototype.toString.call(s) !== "[object Object]") {
    const r = s[Symbol.toStringTag];
    return r == null || !((t = Object.getOwnPropertyDescriptor(s, Symbol.toStringTag)) != null && t.writable) ? !1 : s.toString() === `[object ${r}]`;
  }
  let e = s;
  for (; Object.getPrototypeOf(e) !== null; ) e = Object.getPrototypeOf(e);
  return Object.getPrototypeOf(s) === e;
}
function k1(s) {
  if (pl(s)) return s;
  if (Array.isArray(s) || fl(s) || s instanceof ArrayBuffer || typeof SharedArrayBuffer < "u" && s instanceof SharedArrayBuffer) return s.slice(0);
  const e = Object.getPrototypeOf(s), t = e.constructor;
  if (s instanceof Date || s instanceof Map || s instanceof Set) return new t(s);
  if (s instanceof RegExp) {
    const r = new t(s);
    return r.lastIndex = s.lastIndex, r;
  }
  if (s instanceof DataView) return new t(s.buffer.slice(0));
  if (s instanceof Error) {
    const r = new t(s.message);
    return r.stack = s.stack, r.name = s.name, r.cause = s.cause, r;
  }
  if (typeof File < "u" && s instanceof File) return new t([s], s.name, { type: s.type, lastModified: s.lastModified });
  if (typeof s == "object") {
    const r = Object.create(e);
    return Object.assign(r, s);
  }
  return s;
}
function U1(s, ...e) {
  const t = e.slice(0, -1), r = e[e.length - 1];
  let n = s;
  for (let i = 0; i < t.length; i++) {
    const o = t[i];
    n = Pc(n, o, r, /* @__PURE__ */ new Map());
  }
  return n;
}
function Pc(s, e, t, r) {
  if (pl(s) && (s = Object(s)), e == null || typeof e != "object") return s;
  if (r.has(e)) return k1(r.get(e));
  if (r.set(e, s), Array.isArray(e)) {
    e = e.slice();
    for (let i = 0; i < e.length; i++) e[i] = e[i] ?? void 0;
  }
  const n = [...Object.keys(e), ...Np(e)];
  for (let i = 0; i < n.length; i++) {
    const o = n[i];
    let a = e[o], c = s[o];
    if (iu(a) && (a = { ...a }), iu(c) && (c = { ...c }), typeof Buffer < "u" && Buffer.isBuffer(a) && (a = nu(a)), Array.isArray(a)) if (typeof c == "object" && c != null) {
      const d = [], u = Reflect.ownKeys(c);
      for (let p = 0; p < u.length; p++) {
        const g = u[p];
        d[g] = c[g];
      }
      c = d;
    } else c = [];
    const l = t(c, a, o, s, e, r);
    l != null ? s[o] = l : Array.isArray(a) || ou(c) && ou(a) ? s[o] = Pc(c, a, t, r) : c == null && x1(a) ? s[o] = Pc({}, a, t, r) : c == null && O1(a) ? s[o] = nu(a) : (c === void 0 || a !== void 0) && (s[o] = a);
  }
  return s;
}
function D1(s, ...e) {
  return U1(s, ...e, P1);
}
var $1 = Object.defineProperty, L1 = Object.defineProperties, M1 = Object.getOwnPropertyDescriptors, au = Object.getOwnPropertySymbols, B1 = Object.prototype.hasOwnProperty, F1 = Object.prototype.propertyIsEnumerable, cu = (s, e, t) => e in s ? $1(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t, bo = (s, e) => {
  for (var t in e || (e = {})) B1.call(e, t) && cu(s, t, e[t]);
  if (au) for (var t of au(e)) F1.call(e, t) && cu(s, t, e[t]);
  return s;
}, j1 = (s, e) => L1(s, M1(e));
function Jt(s, e, t) {
  var r;
  const n = On(s);
  return ((r = e.rpcMap) == null ? void 0 : r[n.reference]) || `${Sp}?chainId=${n.namespace}:${n.reference}&projectId=${t}`;
}
function nn(s) {
  return s.includes(":") ? s.split(":")[1] : s;
}
function kp(s) {
  return s.map((e) => `${e.split(":")[0]}:${e.split(":")[1]}`);
}
function q1(s, e) {
  const t = Object.keys(e.namespaces).filter((n) => n.includes(s));
  if (!t.length) return [];
  const r = [];
  return t.forEach((n) => {
    const i = e.namespaces[n].accounts;
    r.push(...i);
  }), r;
}
function vo(s = {}, e = {}) {
  const t = lu(s), r = lu(e);
  return D1(t, r);
}
function lu(s) {
  var e, t, r, n, i;
  const o = {};
  if (!_r(s)) return o;
  for (const [a, c] of Object.entries(s)) {
    const l = ha(a) ? [a] : c.chains, d = c.methods || [], u = c.events || [], p = c.rpcMap || {}, g = Tn(a);
    o[g] = j1(bo(bo({}, o[g]), c), { chains: Ls(l, (e = o[g]) == null ? void 0 : e.chains), methods: Ls(d, (t = o[g]) == null ? void 0 : t.methods), events: Ls(u, (r = o[g]) == null ? void 0 : r.events) }), (_r(p) || _r(((n = o[g]) == null ? void 0 : n.rpcMap) || {})) && (o[g].rpcMap = bo(bo({}, p), (i = o[g]) == null ? void 0 : i.rpcMap));
  }
  return o;
}
function du(s) {
  return s.includes(":") ? s.split(":")[2] : s;
}
function uu(s) {
  const e = {};
  for (const [t, r] of Object.entries(s)) {
    const n = r.methods || [], i = r.events || [], o = r.accounts || [], a = ha(t) ? [t] : r.chains ? r.chains : kp(r.accounts);
    e[t] = { chains: a, methods: n, events: i, accounts: o };
  }
  return e;
}
function Wa(s) {
  return typeof s == "number" ? s : s.includes("0x") ? parseInt(s, 16) : (s = s.includes(":") ? s.split(":")[1] : s, isNaN(Number(s)) ? s : Number(s));
}
const Up = {}, Oe = (s) => Up[s], Ha = (s, e) => {
  Up[s] = e;
};
var W1 = Object.defineProperty, H1 = (s, e, t) => e in s ? W1(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t, un = (s, e, t) => H1(s, typeof e != "symbol" ? e + "" : e, t);
class z1 {
  constructor(e) {
    un(this, "name", "polkadot"), un(this, "client"), un(this, "httpProviders"), un(this, "events"), un(this, "namespace"), un(this, "chainId"), this.namespace = e.namespace, this.events = Oe("events"), this.client = Oe("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(e) {
    this.namespace = Object.assign(this.namespace, e);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId;
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const e = this.namespace.chains[0];
    if (!e) throw new Error("ChainId not found");
    return e.split(":")[1];
  }
  request(e) {
    return this.namespace.methods.includes(e.request.method) ? this.client.request(e) : this.getHttpProvider().request(e.request);
  }
  setDefaultChain(e, t) {
    this.httpProviders[e] || this.setHttpProvider(e, t), this.chainId = e, this.events.emit(us.DEFAULT_CHAIN_CHANGED, `${this.name}:${e}`);
  }
  getAccounts() {
    const e = this.namespace.accounts;
    return e ? e.filter((t) => t.split(":")[1] === this.chainId.toString()).map((t) => t.split(":")[2]) || [] : [];
  }
  createHttpProviders() {
    const e = {};
    return this.namespace.chains.forEach((t) => {
      var r;
      const n = nn(t);
      e[n] = this.createHttpProvider(n, (r = this.namespace.rpcMap) == null ? void 0 : r[t]);
    }), e;
  }
  getHttpProvider() {
    const e = `${this.name}:${this.chainId}`, t = this.httpProviders[e];
    if (typeof t > "u") throw new Error(`JSON-RPC provider for ${e} not found`);
    return t;
  }
  setHttpProvider(e, t) {
    const r = this.createHttpProvider(e, t);
    r && (this.httpProviders[e] = r);
  }
  createHttpProvider(e, t) {
    const r = t || Jt(e, this.namespace, this.client.core.projectId);
    if (!r) throw new Error(`No RPC url provided for chainId: ${e}`);
    return new ds(new Ss(r, Oe("disableProviderPing")));
  }
}
var V1 = Object.defineProperty, K1 = Object.defineProperties, G1 = Object.getOwnPropertyDescriptors, hu = Object.getOwnPropertySymbols, Y1 = Object.prototype.hasOwnProperty, Z1 = Object.prototype.propertyIsEnumerable, Oc = (s, e, t) => e in s ? V1(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t, pu = (s, e) => {
  for (var t in e || (e = {})) Y1.call(e, t) && Oc(s, t, e[t]);
  if (hu) for (var t of hu(e)) Z1.call(e, t) && Oc(s, t, e[t]);
  return s;
}, fu = (s, e) => K1(s, G1(e)), hn = (s, e, t) => Oc(s, typeof e != "symbol" ? e + "" : e, t);
class J1 {
  constructor(e) {
    hn(this, "name", "eip155"), hn(this, "client"), hn(this, "chainId"), hn(this, "namespace"), hn(this, "httpProviders"), hn(this, "events"), this.namespace = e.namespace, this.events = Oe("events"), this.client = Oe("client"), this.httpProviders = this.createHttpProviders(), this.chainId = parseInt(this.getDefaultChain());
  }
  async request(e) {
    switch (e.request.method) {
      case "eth_requestAccounts":
        return this.getAccounts();
      case "eth_accounts":
        return this.getAccounts();
      case "wallet_switchEthereumChain":
        return await this.handleSwitchChain(e);
      case "eth_chainId":
        return parseInt(this.getDefaultChain());
      case "wallet_getCapabilities":
        return await this.getCapabilities(e);
      case "wallet_getCallsStatus":
        return await this.getCallStatus(e);
    }
    return this.namespace.methods.includes(e.request.method) ? await this.client.request(e) : this.getHttpProvider().request(e.request);
  }
  updateNamespace(e) {
    this.namespace = Object.assign(this.namespace, e);
  }
  setDefaultChain(e, t) {
    this.httpProviders[e] || this.setHttpProvider(parseInt(e), t), this.chainId = parseInt(e), this.events.emit(us.DEFAULT_CHAIN_CHANGED, `${this.name}:${e}`);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId.toString();
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const e = this.namespace.chains[0];
    if (!e) throw new Error("ChainId not found");
    return e.split(":")[1];
  }
  createHttpProvider(e, t) {
    const r = t || Jt(`${this.name}:${e}`, this.namespace, this.client.core.projectId);
    if (!r) throw new Error(`No RPC url provided for chainId: ${e}`);
    return new ds(new Ss(r, Oe("disableProviderPing")));
  }
  setHttpProvider(e, t) {
    const r = this.createHttpProvider(e, t);
    r && (this.httpProviders[e] = r);
  }
  createHttpProviders() {
    const e = {};
    return this.namespace.chains.forEach((t) => {
      var r;
      const n = parseInt(nn(t));
      e[n] = this.createHttpProvider(n, (r = this.namespace.rpcMap) == null ? void 0 : r[t]);
    }), e;
  }
  getAccounts() {
    const e = this.namespace.accounts;
    return e ? [...new Set(e.filter((t) => t.split(":")[1] === this.chainId.toString()).map((t) => t.split(":")[2]))] : [];
  }
  getHttpProvider() {
    const e = this.chainId, t = this.httpProviders[e];
    if (typeof t > "u") throw new Error(`JSON-RPC provider for ${e} not found`);
    return t;
  }
  async handleSwitchChain(e) {
    var t, r;
    let n = e.request.params ? (t = e.request.params[0]) == null ? void 0 : t.chainId : "0x0";
    n = n.startsWith("0x") ? n : `0x${n}`;
    const i = parseInt(n, 16);
    if (this.isChainApproved(i)) this.setDefaultChain(`${i}`);
    else if (this.namespace.methods.includes("wallet_switchEthereumChain")) await this.client.request({ topic: e.topic, request: { method: e.request.method, params: [{ chainId: n }] }, chainId: (r = this.namespace.chains) == null ? void 0 : r[0] }), this.setDefaultChain(`${i}`);
    else throw new Error(`Failed to switch to chain 'eip155:${i}'. The chain is not approved or the wallet does not support 'wallet_switchEthereumChain' method.`);
    return null;
  }
  isChainApproved(e) {
    return this.namespace.chains.includes(`${this.name}:${e}`);
  }
  async getCapabilities(e) {
    var t, r, n, i, o;
    const a = (r = (t = e.request) == null ? void 0 : t.params) == null ? void 0 : r[0], c = ((i = (n = e.request) == null ? void 0 : n.params) == null ? void 0 : i[1]) || [], l = `${a}${c.join(",")}`;
    if (!a) throw new Error("Missing address parameter in `wallet_getCapabilities` request");
    const d = this.client.session.get(e.topic), u = ((o = d == null ? void 0 : d.sessionProperties) == null ? void 0 : o.capabilities) || {};
    if (u != null && u[l]) return u == null ? void 0 : u[l];
    const p = await this.client.request(e);
    try {
      await this.client.session.update(e.topic, { sessionProperties: fu(pu({}, d.sessionProperties || {}), { capabilities: fu(pu({}, u || {}), { [l]: p }) }) });
    } catch (g) {
      console.warn("Failed to update session with capabilities", g);
    }
    return p;
  }
  async getCallStatus(e) {
    var t, r;
    const n = this.client.session.get(e.topic), i = (t = n.sessionProperties) == null ? void 0 : t.bundler_name;
    if (i) {
      const a = this.getBundlerUrl(e.chainId, i);
      try {
        return await this.getUserOperationReceipt(a, e);
      } catch (c) {
        console.warn("Failed to fetch call status from bundler", c, a);
      }
    }
    const o = (r = n.sessionProperties) == null ? void 0 : r.bundler_url;
    if (o) try {
      return await this.getUserOperationReceipt(o, e);
    } catch (a) {
      console.warn("Failed to fetch call status from custom bundler", a, o);
    }
    if (this.namespace.methods.includes(e.request.method)) return await this.client.request(e);
    throw new Error("Fetching call status not approved by the wallet.");
  }
  async getUserOperationReceipt(e, t) {
    var r;
    const n = new URL(e), i = await fetch(n, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Br("eth_getUserOperationReceipt", [(r = t.request.params) == null ? void 0 : r[0]])) });
    if (!i.ok) throw new Error(`Failed to fetch user operation receipt - ${i.status}`);
    return await i.json();
  }
  getBundlerUrl(e, t) {
    return `${c1}?projectId=${this.client.core.projectId}&chainId=${e}&bundler=${t}`;
  }
}
var X1 = Object.defineProperty, Q1 = (s, e, t) => e in s ? X1(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t, pn = (s, e, t) => Q1(s, typeof e != "symbol" ? e + "" : e, t);
class eA {
  constructor(e) {
    pn(this, "name", "solana"), pn(this, "client"), pn(this, "httpProviders"), pn(this, "events"), pn(this, "namespace"), pn(this, "chainId"), this.namespace = e.namespace, this.events = Oe("events"), this.client = Oe("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(e) {
    this.namespace = Object.assign(this.namespace, e);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  request(e) {
    return this.namespace.methods.includes(e.request.method) ? this.client.request(e) : this.getHttpProvider().request(e.request);
  }
  setDefaultChain(e, t) {
    this.httpProviders[e] || this.setHttpProvider(e, t), this.chainId = e, this.events.emit(us.DEFAULT_CHAIN_CHANGED, `${this.name}:${e}`);
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId;
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const e = this.namespace.chains[0];
    if (!e) throw new Error("ChainId not found");
    return e.split(":")[1];
  }
  getAccounts() {
    const e = this.namespace.accounts;
    return e ? [...new Set(e.filter((t) => t.split(":")[1] === this.chainId.toString()).map((t) => t.split(":")[2]))] : [];
  }
  createHttpProviders() {
    const e = {};
    return this.namespace.chains.forEach((t) => {
      var r;
      const n = nn(t);
      e[n] = this.createHttpProvider(n, (r = this.namespace.rpcMap) == null ? void 0 : r[t]);
    }), e;
  }
  getHttpProvider() {
    const e = `${this.name}:${this.chainId}`, t = this.httpProviders[e];
    if (typeof t > "u") throw new Error(`JSON-RPC provider for ${e} not found`);
    return t;
  }
  setHttpProvider(e, t) {
    const r = this.createHttpProvider(e, t);
    r && (this.httpProviders[e] = r);
  }
  createHttpProvider(e, t) {
    const r = t || Jt(e, this.namespace, this.client.core.projectId);
    if (!r) throw new Error(`No RPC url provided for chainId: ${e}`);
    return new ds(new Ss(r, Oe("disableProviderPing")));
  }
}
var tA = Object.defineProperty, sA = (s, e, t) => e in s ? tA(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t, fn = (s, e, t) => sA(s, typeof e != "symbol" ? e + "" : e, t);
class rA {
  constructor(e) {
    fn(this, "name", "cosmos"), fn(this, "client"), fn(this, "httpProviders"), fn(this, "events"), fn(this, "namespace"), fn(this, "chainId"), this.namespace = e.namespace, this.events = Oe("events"), this.client = Oe("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(e) {
    this.namespace = Object.assign(this.namespace, e);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId;
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const e = this.namespace.chains[0];
    if (!e) throw new Error("ChainId not found");
    return e.split(":")[1];
  }
  request(e) {
    return this.namespace.methods.includes(e.request.method) ? this.client.request(e) : this.getHttpProvider().request(e.request);
  }
  setDefaultChain(e, t) {
    this.httpProviders[e] || this.setHttpProvider(e, t), this.chainId = e, this.events.emit(us.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
  }
  getAccounts() {
    const e = this.namespace.accounts;
    return e ? [...new Set(e.filter((t) => t.split(":")[1] === this.chainId.toString()).map((t) => t.split(":")[2]))] : [];
  }
  createHttpProviders() {
    const e = {};
    return this.namespace.chains.forEach((t) => {
      var r;
      const n = nn(t);
      e[n] = this.createHttpProvider(n, (r = this.namespace.rpcMap) == null ? void 0 : r[t]);
    }), e;
  }
  getHttpProvider() {
    const e = `${this.name}:${this.chainId}`, t = this.httpProviders[e];
    if (typeof t > "u") throw new Error(`JSON-RPC provider for ${e} not found`);
    return t;
  }
  setHttpProvider(e, t) {
    const r = this.createHttpProvider(e, t);
    r && (this.httpProviders[e] = r);
  }
  createHttpProvider(e, t) {
    const r = t || Jt(e, this.namespace, this.client.core.projectId);
    if (!r) throw new Error(`No RPC url provided for chainId: ${e}`);
    return new ds(new Ss(r, Oe("disableProviderPing")));
  }
}
var nA = Object.defineProperty, iA = (s, e, t) => e in s ? nA(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t, gn = (s, e, t) => iA(s, typeof e != "symbol" ? e + "" : e, t);
class oA {
  constructor(e) {
    gn(this, "name", "algorand"), gn(this, "client"), gn(this, "httpProviders"), gn(this, "events"), gn(this, "namespace"), gn(this, "chainId"), this.namespace = e.namespace, this.events = Oe("events"), this.client = Oe("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(e) {
    this.namespace = Object.assign(this.namespace, e);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  request(e) {
    return this.namespace.methods.includes(e.request.method) ? this.client.request(e) : this.getHttpProvider().request(e.request);
  }
  setDefaultChain(e, t) {
    if (!this.httpProviders[e]) {
      const r = t || Jt(`${this.name}:${e}`, this.namespace, this.client.core.projectId);
      if (!r) throw new Error(`No RPC url provided for chainId: ${e}`);
      this.setHttpProvider(e, r);
    }
    this.chainId = e, this.events.emit(us.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId;
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const e = this.namespace.chains[0];
    if (!e) throw new Error("ChainId not found");
    return e.split(":")[1];
  }
  getAccounts() {
    const e = this.namespace.accounts;
    return e ? [...new Set(e.filter((t) => t.split(":")[1] === this.chainId.toString()).map((t) => t.split(":")[2]))] : [];
  }
  createHttpProviders() {
    const e = {};
    return this.namespace.chains.forEach((t) => {
      var r;
      e[t] = this.createHttpProvider(t, (r = this.namespace.rpcMap) == null ? void 0 : r[t]);
    }), e;
  }
  getHttpProvider() {
    const e = `${this.name}:${this.chainId}`, t = this.httpProviders[e];
    if (typeof t > "u") throw new Error(`JSON-RPC provider for ${e} not found`);
    return t;
  }
  setHttpProvider(e, t) {
    const r = this.createHttpProvider(e, t);
    r && (this.httpProviders[e] = r);
  }
  createHttpProvider(e, t) {
    const r = t || Jt(e, this.namespace, this.client.core.projectId);
    return typeof r > "u" ? void 0 : new ds(new Ss(r, Oe("disableProviderPing")));
  }
}
var aA = Object.defineProperty, cA = (s, e, t) => e in s ? aA(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t, mn = (s, e, t) => cA(s, typeof e != "symbol" ? e + "" : e, t);
class lA {
  constructor(e) {
    mn(this, "name", "cip34"), mn(this, "client"), mn(this, "httpProviders"), mn(this, "events"), mn(this, "namespace"), mn(this, "chainId"), this.namespace = e.namespace, this.events = Oe("events"), this.client = Oe("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(e) {
    this.namespace = Object.assign(this.namespace, e);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId;
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const e = this.namespace.chains[0];
    if (!e) throw new Error("ChainId not found");
    return e.split(":")[1];
  }
  request(e) {
    return this.namespace.methods.includes(e.request.method) ? this.client.request(e) : this.getHttpProvider().request(e.request);
  }
  setDefaultChain(e, t) {
    this.httpProviders[e] || this.setHttpProvider(e, t), this.chainId = e, this.events.emit(us.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
  }
  getAccounts() {
    const e = this.namespace.accounts;
    return e ? [...new Set(e.filter((t) => t.split(":")[1] === this.chainId.toString()).map((t) => t.split(":")[2]))] : [];
  }
  createHttpProviders() {
    const e = {};
    return this.namespace.chains.forEach((t) => {
      const r = this.getCardanoRPCUrl(t), n = nn(t);
      e[n] = this.createHttpProvider(n, r);
    }), e;
  }
  getHttpProvider() {
    const e = `${this.name}:${this.chainId}`, t = this.httpProviders[e];
    if (typeof t > "u") throw new Error(`JSON-RPC provider for ${e} not found`);
    return t;
  }
  getCardanoRPCUrl(e) {
    const t = this.namespace.rpcMap;
    if (t) return t[e];
  }
  setHttpProvider(e, t) {
    const r = this.createHttpProvider(e, t);
    r && (this.httpProviders[e] = r);
  }
  createHttpProvider(e, t) {
    const r = t || this.getCardanoRPCUrl(e);
    if (!r) throw new Error(`No RPC url provided for chainId: ${e}`);
    return new ds(new Ss(r, Oe("disableProviderPing")));
  }
}
var dA = Object.defineProperty, uA = (s, e, t) => e in s ? dA(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t, wn = (s, e, t) => uA(s, typeof e != "symbol" ? e + "" : e, t);
class hA {
  constructor(e) {
    wn(this, "name", "elrond"), wn(this, "client"), wn(this, "httpProviders"), wn(this, "events"), wn(this, "namespace"), wn(this, "chainId"), this.namespace = e.namespace, this.events = Oe("events"), this.client = Oe("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(e) {
    this.namespace = Object.assign(this.namespace, e);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  request(e) {
    return this.namespace.methods.includes(e.request.method) ? this.client.request(e) : this.getHttpProvider().request(e.request);
  }
  setDefaultChain(e, t) {
    this.httpProviders[e] || this.setHttpProvider(e, t), this.chainId = e, this.events.emit(us.DEFAULT_CHAIN_CHANGED, `${this.name}:${e}`);
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId;
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const e = this.namespace.chains[0];
    if (!e) throw new Error("ChainId not found");
    return e.split(":")[1];
  }
  getAccounts() {
    const e = this.namespace.accounts;
    return e ? [...new Set(e.filter((t) => t.split(":")[1] === this.chainId.toString()).map((t) => t.split(":")[2]))] : [];
  }
  createHttpProviders() {
    const e = {};
    return this.namespace.chains.forEach((t) => {
      var r;
      const n = nn(t);
      e[n] = this.createHttpProvider(n, (r = this.namespace.rpcMap) == null ? void 0 : r[t]);
    }), e;
  }
  getHttpProvider() {
    const e = `${this.name}:${this.chainId}`, t = this.httpProviders[e];
    if (typeof t > "u") throw new Error(`JSON-RPC provider for ${e} not found`);
    return t;
  }
  setHttpProvider(e, t) {
    const r = this.createHttpProvider(e, t);
    r && (this.httpProviders[e] = r);
  }
  createHttpProvider(e, t) {
    const r = t || Jt(e, this.namespace, this.client.core.projectId);
    if (!r) throw new Error(`No RPC url provided for chainId: ${e}`);
    return new ds(new Ss(r, Oe("disableProviderPing")));
  }
}
var pA = Object.defineProperty, fA = (s, e, t) => e in s ? pA(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t, yn = (s, e, t) => fA(s, typeof e != "symbol" ? e + "" : e, t);
class gA {
  constructor(e) {
    yn(this, "name", "multiversx"), yn(this, "client"), yn(this, "httpProviders"), yn(this, "events"), yn(this, "namespace"), yn(this, "chainId"), this.namespace = e.namespace, this.events = Oe("events"), this.client = Oe("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(e) {
    this.namespace = Object.assign(this.namespace, e);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  request(e) {
    return this.namespace.methods.includes(e.request.method) ? this.client.request(e) : this.getHttpProvider().request(e.request);
  }
  setDefaultChain(e, t) {
    this.httpProviders[e] || this.setHttpProvider(e, t), this.chainId = e, this.events.emit(us.DEFAULT_CHAIN_CHANGED, `${this.name}:${e}`);
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId;
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const e = this.namespace.chains[0];
    if (!e) throw new Error("ChainId not found");
    return e.split(":")[1];
  }
  getAccounts() {
    const e = this.namespace.accounts;
    return e ? [...new Set(e.filter((t) => t.split(":")[1] === this.chainId.toString()).map((t) => t.split(":")[2]))] : [];
  }
  createHttpProviders() {
    const e = {};
    return this.namespace.chains.forEach((t) => {
      var r;
      const n = nn(t);
      e[n] = this.createHttpProvider(n, (r = this.namespace.rpcMap) == null ? void 0 : r[t]);
    }), e;
  }
  getHttpProvider() {
    const e = `${this.name}:${this.chainId}`, t = this.httpProviders[e];
    if (typeof t > "u") throw new Error(`JSON-RPC provider for ${e} not found`);
    return t;
  }
  setHttpProvider(e, t) {
    const r = this.createHttpProvider(e, t);
    r && (this.httpProviders[e] = r);
  }
  createHttpProvider(e, t) {
    const r = t || Jt(e, this.namespace, this.client.core.projectId);
    if (!r) throw new Error(`No RPC url provided for chainId: ${e}`);
    return new ds(new Ss(r, Oe("disableProviderPing")));
  }
}
var mA = Object.defineProperty, wA = (s, e, t) => e in s ? mA(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t, En = (s, e, t) => wA(s, typeof e != "symbol" ? e + "" : e, t);
class yA {
  constructor(e) {
    En(this, "name", "near"), En(this, "client"), En(this, "httpProviders"), En(this, "events"), En(this, "namespace"), En(this, "chainId"), this.namespace = e.namespace, this.events = Oe("events"), this.client = Oe("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(e) {
    this.namespace = Object.assign(this.namespace, e);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId;
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const e = this.namespace.chains[0];
    if (!e) throw new Error("ChainId not found");
    return e.split(":")[1];
  }
  request(e) {
    return this.namespace.methods.includes(e.request.method) ? this.client.request(e) : this.getHttpProvider().request(e.request);
  }
  setDefaultChain(e, t) {
    if (this.chainId = e, !this.httpProviders[e]) {
      const r = t || Jt(`${this.name}:${e}`, this.namespace);
      if (!r) throw new Error(`No RPC url provided for chainId: ${e}`);
      this.setHttpProvider(e, r);
    }
    this.events.emit(us.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
  }
  getAccounts() {
    const e = this.namespace.accounts;
    return e ? e.filter((t) => t.split(":")[1] === this.chainId.toString()).map((t) => t.split(":")[2]) || [] : [];
  }
  createHttpProviders() {
    const e = {};
    return this.namespace.chains.forEach((t) => {
      var r;
      e[t] = this.createHttpProvider(t, (r = this.namespace.rpcMap) == null ? void 0 : r[t]);
    }), e;
  }
  getHttpProvider() {
    const e = `${this.name}:${this.chainId}`, t = this.httpProviders[e];
    if (typeof t > "u") throw new Error(`JSON-RPC provider for ${e} not found`);
    return t;
  }
  setHttpProvider(e, t) {
    const r = this.createHttpProvider(e, t);
    r && (this.httpProviders[e] = r);
  }
  createHttpProvider(e, t) {
    const r = t || Jt(e, this.namespace);
    return typeof r > "u" ? void 0 : new ds(new Ss(r, Oe("disableProviderPing")));
  }
}
var EA = Object.defineProperty, bA = (s, e, t) => e in s ? EA(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t, bn = (s, e, t) => bA(s, typeof e != "symbol" ? e + "" : e, t);
class vA {
  constructor(e) {
    bn(this, "name", "tezos"), bn(this, "client"), bn(this, "httpProviders"), bn(this, "events"), bn(this, "namespace"), bn(this, "chainId"), this.namespace = e.namespace, this.events = Oe("events"), this.client = Oe("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(e) {
    this.namespace = Object.assign(this.namespace, e);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId;
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const e = this.namespace.chains[0];
    if (!e) throw new Error("ChainId not found");
    return e.split(":")[1];
  }
  request(e) {
    return this.namespace.methods.includes(e.request.method) ? this.client.request(e) : this.getHttpProvider().request(e.request);
  }
  setDefaultChain(e, t) {
    if (this.chainId = e, !this.httpProviders[e]) {
      const r = t || Jt(`${this.name}:${e}`, this.namespace);
      if (!r) throw new Error(`No RPC url provided for chainId: ${e}`);
      this.setHttpProvider(e, r);
    }
    this.events.emit(us.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
  }
  getAccounts() {
    const e = this.namespace.accounts;
    return e ? e.filter((t) => t.split(":")[1] === this.chainId.toString()).map((t) => t.split(":")[2]) || [] : [];
  }
  createHttpProviders() {
    const e = {};
    return this.namespace.chains.forEach((t) => {
      e[t] = this.createHttpProvider(t);
    }), e;
  }
  getHttpProvider() {
    const e = `${this.name}:${this.chainId}`, t = this.httpProviders[e];
    if (typeof t > "u") throw new Error(`JSON-RPC provider for ${e} not found`);
    return t;
  }
  setHttpProvider(e, t) {
    const r = this.createHttpProvider(e, t);
    r && (this.httpProviders[e] = r);
  }
  createHttpProvider(e, t) {
    const r = t || Jt(e, this.namespace);
    return typeof r > "u" ? void 0 : new ds(new Ss(r));
  }
}
var CA = Object.defineProperty, _A = (s, e, t) => e in s ? CA(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t, vn = (s, e, t) => _A(s, typeof e != "symbol" ? e + "" : e, t);
class AA {
  constructor(e) {
    vn(this, "name", _n), vn(this, "client"), vn(this, "httpProviders"), vn(this, "events"), vn(this, "namespace"), vn(this, "chainId"), this.namespace = e.namespace, this.events = Oe("events"), this.client = Oe("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(e) {
    this.namespace.chains = [...new Set((this.namespace.chains || []).concat(e.chains || []))], this.namespace.accounts = [...new Set((this.namespace.accounts || []).concat(e.accounts || []))], this.namespace.methods = [...new Set((this.namespace.methods || []).concat(e.methods || []))], this.namespace.events = [...new Set((this.namespace.events || []).concat(e.events || []))], this.httpProviders = this.createHttpProviders();
  }
  requestAccounts() {
    return this.getAccounts();
  }
  request(e) {
    return this.namespace.methods.includes(e.request.method) ? this.client.request(e) : this.getHttpProvider(e.chainId).request(e.request);
  }
  setDefaultChain(e, t) {
    this.httpProviders[e] || this.setHttpProvider(e, t), this.chainId = e, this.events.emit(us.DEFAULT_CHAIN_CHANGED, `${this.name}:${e}`);
  }
  getDefaultChain() {
    if (this.chainId) return this.chainId;
    if (this.namespace.defaultChain) return this.namespace.defaultChain;
    const e = this.namespace.chains[0];
    if (!e) throw new Error("ChainId not found");
    return e.split(":")[1];
  }
  getAccounts() {
    const e = this.namespace.accounts;
    return e ? [...new Set(e.filter((t) => t.split(":")[1] === this.chainId.toString()).map((t) => t.split(":")[2]))] : [];
  }
  createHttpProviders() {
    var e, t;
    const r = {};
    return (t = (e = this.namespace) == null ? void 0 : e.accounts) == null || t.forEach((n) => {
      const i = On(n);
      r[`${i.namespace}:${i.reference}`] = this.createHttpProvider(n);
    }), r;
  }
  getHttpProvider(e) {
    const t = this.httpProviders[e];
    if (typeof t > "u") throw new Error(`JSON-RPC provider for ${e} not found`);
    return t;
  }
  setHttpProvider(e, t) {
    const r = this.createHttpProvider(e, t);
    r && (this.httpProviders[e] = r);
  }
  createHttpProvider(e, t) {
    const r = t || Jt(e, this.namespace, this.client.core.projectId);
    if (!r) throw new Error(`No RPC url provided for chainId: ${e}`);
    return new ds(new Ss(r, Oe("disableProviderPing")));
  }
}
var IA = Object.defineProperty, SA = Object.defineProperties, NA = Object.getOwnPropertyDescriptors, gu = Object.getOwnPropertySymbols, TA = Object.prototype.hasOwnProperty, RA = Object.prototype.propertyIsEnumerable, xc = (s, e, t) => e in s ? IA(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t, Co = (s, e) => {
  for (var t in e || (e = {})) TA.call(e, t) && xc(s, t, e[t]);
  if (gu) for (var t of gu(e)) RA.call(e, t) && xc(s, t, e[t]);
  return s;
}, za = (s, e) => SA(s, NA(e)), rs = (s, e, t) => xc(s, typeof e != "symbol" ? e + "" : e, t);
class gl {
  constructor(e) {
    rs(this, "client"), rs(this, "namespaces"), rs(this, "optionalNamespaces"), rs(this, "sessionProperties"), rs(this, "scopedProperties"), rs(this, "events", new Wc()), rs(this, "rpcProviders", {}), rs(this, "session"), rs(this, "providerOpts"), rs(this, "logger"), rs(this, "uri"), rs(this, "disableProviderPing", !1), this.providerOpts = e, this.logger = typeof (e == null ? void 0 : e.logger) < "u" && typeof (e == null ? void 0 : e.logger) != "string" ? e.logger : Fc(Hn({ level: (e == null ? void 0 : e.logger) || ru })), this.disableProviderPing = (e == null ? void 0 : e.disableProviderPing) || !1;
  }
  static async init(e) {
    const t = new gl(e);
    return await t.initialize(), t;
  }
  async request(e, t, r) {
    const [n, i] = this.validateChain(t);
    if (!this.session) throw new Error("Please call connect() before request()");
    return await this.getProvider(n).request({ request: Co({}, e), chainId: `${n}:${i}`, topic: this.session.topic, expiry: r });
  }
  sendAsync(e, t, r, n) {
    const i = (/* @__PURE__ */ new Date()).getTime();
    this.request(e, r, n).then((o) => t(null, ra(i, o))).catch((o) => t(o, void 0));
  }
  async enable() {
    if (!this.client) throw new Error("Sign Client not initialized");
    return this.session || await this.connect({ namespaces: this.namespaces, optionalNamespaces: this.optionalNamespaces, sessionProperties: this.sessionProperties, scopedProperties: this.scopedProperties }), await this.requestAccounts();
  }
  async disconnect() {
    var e;
    if (!this.session) throw new Error("Please call connect() before enable()");
    await this.client.disconnect({ topic: (e = this.session) == null ? void 0 : e.topic, reason: Ke("USER_DISCONNECTED") }), await this.cleanup();
  }
  async connect(e) {
    if (!this.client) throw new Error("Sign Client not initialized");
    if (this.setNamespaces(e), await this.cleanupPendingPairings(), !e.skipPairing) return await this.pair(e.pairingTopic);
  }
  async authenticate(e, t) {
    if (!this.client) throw new Error("Sign Client not initialized");
    this.setNamespaces(e), await this.cleanupPendingPairings();
    const { uri: r, response: n } = await this.client.authenticate(e, t);
    r && (this.uri = r, this.events.emit("display_uri", r));
    const i = await n();
    if (this.session = i.session, this.session) {
      const o = uu(this.session.namespaces);
      this.namespaces = vo(this.namespaces, o), await this.persist("namespaces", this.namespaces), this.onConnect();
    }
    return i;
  }
  on(e, t) {
    this.events.on(e, t);
  }
  once(e, t) {
    this.events.once(e, t);
  }
  removeListener(e, t) {
    this.events.removeListener(e, t);
  }
  off(e, t) {
    this.events.off(e, t);
  }
  get isWalletConnect() {
    return !0;
  }
  async pair(e) {
    const { uri: t, approval: r } = await this.client.connect({ pairingTopic: e, requiredNamespaces: this.namespaces, optionalNamespaces: this.optionalNamespaces, sessionProperties: this.sessionProperties, scopedProperties: this.scopedProperties });
    t && (this.uri = t, this.events.emit("display_uri", t));
    const n = await r();
    this.session = n;
    const i = uu(n.namespaces);
    return this.namespaces = vo(this.namespaces, i), await this.persist("namespaces", this.namespaces), await this.persist("optionalNamespaces", this.optionalNamespaces), this.onConnect(), this.session;
  }
  setDefaultChain(e, t) {
    try {
      if (!this.session) return;
      const [r, n] = this.validateChain(e), i = this.getProvider(r);
      i.name === _n ? i.setDefaultChain(`${r}:${n}`, t) : i.setDefaultChain(n, t);
    } catch (r) {
      if (!/Please call connect/.test(r.message)) throw r;
    }
  }
  async cleanupPendingPairings(e = {}) {
    this.logger.info("Cleaning up inactive pairings...");
    const t = this.client.pairing.getAll();
    if (Xs(t)) {
      for (const r of t) e.deletePairings ? this.client.core.expirer.set(r.topic, 0) : await this.client.core.relayer.subscriber.unsubscribe(r.topic);
      this.logger.info(`Inactive pairings cleared: ${t.length}`);
    }
  }
  abortPairingAttempt() {
    this.logger.warn("abortPairingAttempt is deprecated. This is now a no-op.");
  }
  async checkStorage() {
    this.namespaces = await this.getFromStore("namespaces") || {}, this.optionalNamespaces = await this.getFromStore("optionalNamespaces") || {}, this.session && this.createProviders();
  }
  async initialize() {
    this.logger.trace("Initialized"), await this.createClient(), await this.checkStorage(), this.registerEventListeners();
  }
  async createClient() {
    var e, t;
    if (this.client = this.providerOpts.client || await n1.init({ core: this.providerOpts.core, logger: this.providerOpts.logger || ru, relayUrl: this.providerOpts.relayUrl || i1, projectId: this.providerOpts.projectId, metadata: this.providerOpts.metadata, storageOptions: this.providerOpts.storageOptions, storage: this.providerOpts.storage, name: this.providerOpts.name, customStoragePrefix: this.providerOpts.customStoragePrefix, telemetryEnabled: this.providerOpts.telemetryEnabled }), this.providerOpts.session) try {
      this.session = this.client.session.get(this.providerOpts.session.topic);
    } catch (r) {
      throw this.logger.error("Failed to get session", r), new Error(`The provided session: ${(t = (e = this.providerOpts) == null ? void 0 : e.session) == null ? void 0 : t.topic} doesn't exist in the Sign client`);
    }
    else {
      const r = this.client.session.getAll();
      this.session = r[0];
    }
    this.logger.trace("SignClient Initialized");
  }
  createProviders() {
    if (!this.client) throw new Error("Sign Client not initialized");
    if (!this.session) throw new Error("Session not initialized. Please call connect() before enable()");
    const e = [...new Set(Object.keys(this.session.namespaces).map((t) => Tn(t)))];
    Ha("client", this.client), Ha("events", this.events), Ha("disableProviderPing", this.disableProviderPing), e.forEach((t) => {
      if (!this.session) return;
      const r = q1(t, this.session), n = kp(r), i = vo(this.namespaces, this.optionalNamespaces), o = za(Co({}, i[t]), { accounts: r, chains: n });
      switch (t) {
        case "eip155":
          this.rpcProviders[t] = new J1({ namespace: o });
          break;
        case "algorand":
          this.rpcProviders[t] = new oA({ namespace: o });
          break;
        case "solana":
          this.rpcProviders[t] = new eA({ namespace: o });
          break;
        case "cosmos":
          this.rpcProviders[t] = new rA({ namespace: o });
          break;
        case "polkadot":
          this.rpcProviders[t] = new z1({ namespace: o });
          break;
        case "cip34":
          this.rpcProviders[t] = new lA({ namespace: o });
          break;
        case "elrond":
          this.rpcProviders[t] = new hA({ namespace: o });
          break;
        case "multiversx":
          this.rpcProviders[t] = new gA({ namespace: o });
          break;
        case "near":
          this.rpcProviders[t] = new yA({ namespace: o });
          break;
        case "tezos":
          this.rpcProviders[t] = new vA({ namespace: o });
          break;
        default:
          this.rpcProviders[_n] ? this.rpcProviders[_n].updateNamespace(o) : this.rpcProviders[_n] = new AA({ namespace: o });
      }
    });
  }
  registerEventListeners() {
    if (typeof this.client > "u") throw new Error("Sign Client is not initialized");
    this.client.on("session_ping", (e) => {
      var t;
      const { topic: r } = e;
      r === ((t = this.session) == null ? void 0 : t.topic) && this.events.emit("session_ping", e);
    }), this.client.on("session_event", (e) => {
      var t;
      const { params: r, topic: n } = e;
      if (n !== ((t = this.session) == null ? void 0 : t.topic)) return;
      const { event: i } = r;
      if (i.name === "accountsChanged") {
        const o = i.data;
        o && Xs(o) && this.events.emit("accountsChanged", o.map(du));
      } else if (i.name === "chainChanged") {
        const o = r.chainId, a = r.event.data, c = Tn(o), l = Wa(o) !== Wa(a) ? `${c}:${Wa(a)}` : o;
        this.onChainChanged(l);
      } else this.events.emit(i.name, i.data);
      this.events.emit("session_event", e);
    }), this.client.on("session_update", ({ topic: e, params: t }) => {
      var r, n;
      if (e !== ((r = this.session) == null ? void 0 : r.topic)) return;
      const { namespaces: i } = t, o = (n = this.client) == null ? void 0 : n.session.get(e);
      this.session = za(Co({}, o), { namespaces: i }), this.onSessionUpdate(), this.events.emit("session_update", { topic: e, params: t });
    }), this.client.on("session_delete", async (e) => {
      var t;
      e.topic === ((t = this.session) == null ? void 0 : t.topic) && (await this.cleanup(), this.events.emit("session_delete", e), this.events.emit("disconnect", za(Co({}, Ke("USER_DISCONNECTED")), { data: e.topic })));
    }), this.on(us.DEFAULT_CHAIN_CHANGED, (e) => {
      this.onChainChanged(e, !0);
    });
  }
  getProvider(e) {
    return this.rpcProviders[e] || this.rpcProviders[_n];
  }
  onSessionUpdate() {
    Object.keys(this.rpcProviders).forEach((e) => {
      var t;
      this.getProvider(e).updateNamespace((t = this.session) == null ? void 0 : t.namespaces[e]);
    });
  }
  setNamespaces(e) {
    const { namespaces: t = {}, optionalNamespaces: r = {}, sessionProperties: n, scopedProperties: i } = e;
    this.optionalNamespaces = vo(t, r), this.sessionProperties = n, this.scopedProperties = i;
  }
  validateChain(e) {
    const [t, r] = (e == null ? void 0 : e.split(":")) || ["", ""];
    if (!this.namespaces || !Object.keys(this.namespaces).length) return [t, r];
    if (t && !Object.keys(this.namespaces || {}).map((o) => Tn(o)).includes(t)) throw new Error(`Namespace '${t}' is not configured. Please call connect() first with namespace config.`);
    if (t && r) return [t, r];
    const n = Tn(Object.keys(this.namespaces)[0]), i = this.rpcProviders[n].getDefaultChain();
    return [n, i];
  }
  async requestAccounts() {
    const [e] = this.validateChain();
    return await this.getProvider(e).requestAccounts();
  }
  async onChainChanged(e, t = !1) {
    if (!this.namespaces) return;
    const [r, n] = this.validateChain(e);
    if (!n) return;
    this.updateNamespaceChain(r, n), this.events.emit("chainChanged", n);
    const i = this.getProvider(r).getDefaultChain();
    t || this.getProvider(r).setDefaultChain(n), this.emitAccountsChangedOnChainChange({ namespace: r, previousChainId: i, newChainId: e }), await this.persist("namespaces", this.namespaces);
  }
  emitAccountsChangedOnChainChange({ namespace: e, previousChainId: t, newChainId: r }) {
    var n, i;
    try {
      if (t === r) return;
      const o = (i = (n = this.session) == null ? void 0 : n.namespaces[e]) == null ? void 0 : i.accounts;
      if (!o) return;
      const a = o.filter((c) => c.includes(`${r}:`)).map(du);
      if (!Xs(a)) return;
      this.events.emit("accountsChanged", a);
    } catch (o) {
      this.logger.warn("Failed to emit accountsChanged on chain change", o);
    }
  }
  updateNamespaceChain(e, t) {
    if (!this.namespaces) return;
    const r = this.namespaces[e] ? e : `${e}:${t}`, n = { chains: [], methods: [], events: [], defaultChain: t };
    this.namespaces[r] ? this.namespaces[r] && (this.namespaces[r].defaultChain = t) : this.namespaces[r] = n;
  }
  onConnect() {
    this.createProviders(), this.events.emit("connect", { session: this.session });
  }
  async cleanup() {
    this.namespaces = void 0, this.optionalNamespaces = void 0, this.sessionProperties = void 0, await this.deleteFromStore("namespaces"), await this.deleteFromStore("optionalNamespaces"), await this.deleteFromStore("sessionProperties"), this.session = void 0, await this.cleanupPendingPairings({ deletePairings: !0 }), await this.cleanupStorage();
  }
  async persist(e, t) {
    var r;
    const n = ((r = this.session) == null ? void 0 : r.topic) || "";
    await this.client.core.storage.setItem(`${Eo}/${e}${n}`, t);
  }
  async getFromStore(e) {
    var t;
    const r = ((t = this.session) == null ? void 0 : t.topic) || "";
    return await this.client.core.storage.getItem(`${Eo}/${e}${r}`);
  }
  async deleteFromStore(e) {
    var t;
    const r = ((t = this.session) == null ? void 0 : t.topic) || "";
    await this.client.core.storage.removeItem(`${Eo}/${e}${r}`);
  }
  async cleanupStorage() {
    var e;
    try {
      if (((e = this.client) == null ? void 0 : e.session.length) > 0) return;
      const t = await this.client.core.storage.getKeys();
      for (const r of t) r.startsWith(Eo) && await this.client.core.storage.removeItem(r);
    } catch (t) {
      this.logger.warn("Failed to cleanup storage", t);
    }
  }
}
const xn = {
  getSIWX() {
    return S.state.siwx;
  },
  async initializeIfEnabled() {
    var i;
    const s = S.state.siwx, e = f.getActiveCaipAddress();
    if (!(s && e))
      return;
    const [t, r, n] = e.split(":");
    if (f.checkIfSupportedNetwork(t))
      try {
        if ((await s.getSessions(`${t}:${r}`, n)).length)
          return;
        await Re.open({
          view: "SIWXSignMessage"
        });
      } catch (o) {
        console.error("SIWXUtil:initializeIfEnabled", o), $e.sendEvent({
          type: "track",
          event: "SIWX_AUTH_ERROR",
          properties: this.getSIWXEventProperties()
        }), await ((i = q._getClient()) == null ? void 0 : i.disconnect().catch(console.error)), de.reset("Connect"), ys.showError("A problem occurred while trying initialize authentication");
      }
  },
  async requestSignMessage() {
    const s = S.state.siwx, e = te.getPlainAddress(f.getActiveCaipAddress()), t = f.getActiveCaipNetwork(), r = q._getClient();
    if (!s)
      throw new Error("SIWX is not enabled");
    if (!e)
      throw new Error("No ActiveCaipAddress found");
    if (!t)
      throw new Error("No ActiveCaipNetwork or client found");
    if (!r)
      throw new Error("No ConnectionController client found");
    try {
      const n = await s.createMessage({
        chainId: t.caipNetworkId,
        accountAddress: e
      }), i = n.toString();
      F.getConnectorId(t.chainNamespace) === N.CONNECTOR_ID.AUTH && de.pushTransactionStack({});
      const a = await r.signMessage(i);
      await s.addSession({
        data: n,
        message: i,
        signature: a
      }), f.setLastConnectedSIWECaipNetwork(t), Re.close(), $e.sendEvent({
        type: "track",
        event: "SIWX_AUTH_SUCCESS",
        properties: this.getSIWXEventProperties()
      });
    } catch (n) {
      const i = this.getSIWXEventProperties();
      (!Re.state.open || de.state.view === "ApproveTransaction") && await Re.open({
        view: "SIWXSignMessage"
      }), i.isSmartAccount ? ys.showError("This application might not support Smart Accounts") : ys.showError("Signature declined"), $e.sendEvent({
        type: "track",
        event: "SIWX_AUTH_ERROR",
        properties: i
      }), console.error("SWIXUtil:requestSignMessage", n);
    }
  },
  async cancelSignMessage() {
    var s;
    try {
      const e = this.getSIWX();
      if ((s = e == null ? void 0 : e.getRequired) == null ? void 0 : s.call(e)) {
        const r = f.getLastConnectedSIWECaipNetwork();
        if (r) {
          const n = await (e == null ? void 0 : e.getSessions(r == null ? void 0 : r.caipNetworkId, te.getPlainAddress(f.getActiveCaipAddress()) || ""));
          n && n.length > 0 ? await f.switchActiveNetwork(r) : await q.disconnect();
        } else
          await q.disconnect();
      } else
        Re.close();
      Re.close(), $e.sendEvent({
        event: "CLICK_CANCEL_SIWX",
        type: "track",
        properties: this.getSIWXEventProperties()
      });
    } catch (e) {
      console.error("SIWXUtil:cancelSignMessage", e);
    }
  },
  async getAllSessions() {
    const s = this.getSIWX(), e = f.getAllRequestedCaipNetworks(), t = [];
    return await Promise.all(e.map(async (r) => {
      const n = await (s == null ? void 0 : s.getSessions(r.caipNetworkId, te.getPlainAddress(f.getActiveCaipAddress()) || ""));
      n && t.push(...n);
    })), t;
  },
  async getSessions() {
    const s = S.state.siwx, e = te.getPlainAddress(f.getActiveCaipAddress()), t = f.getActiveCaipNetwork();
    return s && e && t ? s.getSessions(t.caipNetworkId, e) : [];
  },
  async isSIWXCloseDisabled() {
    var e;
    const s = this.getSIWX();
    if (s) {
      const t = de.state.view === "ApproveTransaction", r = de.state.view === "SIWXSignMessage";
      if (t || r)
        return ((e = s.getRequired) == null ? void 0 : e.call(s)) && (await this.getSessions()).length === 0;
    }
    return !1;
  },
  async universalProviderAuthenticate({ universalProvider: s, chains: e, methods: t }) {
    var a, c, l;
    const r = xn.getSIWX(), n = new Set(e.map((d) => d.split(":")[0]));
    if (!r || n.size !== 1 || !n.has("eip155"))
      return !1;
    const i = await r.createMessage({
      chainId: ((a = f.getActiveCaipNetwork()) == null ? void 0 : a.caipNetworkId) || "",
      accountAddress: ""
    }), o = await s.authenticate({
      nonce: i.nonce,
      domain: i.domain,
      uri: i.uri,
      exp: i.expirationTime,
      iat: i.issuedAt,
      nbf: i.notBefore,
      requestId: i.requestId,
      version: i.version,
      resources: i.resources,
      statement: i.statement,
      chainId: i.chainId,
      methods: t,
      // The first chainId is what is used for universal provider to build the message
      chains: [i.chainId, ...e.filter((d) => d !== i.chainId)]
    });
    if (ys.showLoading("Authenticating...", { autoClose: !1 }), X.setConnectedWalletInfo({
      ...o.session.peer.metadata,
      name: o.session.peer.metadata.name,
      icon: (c = o.session.peer.metadata.icons) == null ? void 0 : c[0],
      type: "WALLET_CONNECT"
    }, Array.from(n)[0]), (l = o == null ? void 0 : o.auths) != null && l.length) {
      const d = o.auths.map((u) => {
        const p = s.client.formatAuthMessage({
          request: u.p,
          iss: u.p.iss
        });
        return {
          data: {
            ...u.p,
            accountAddress: u.p.iss.split(":").slice(-1).join(""),
            chainId: u.p.iss.split(":").slice(2, 4).join(":"),
            uri: u.p.aud,
            version: u.p.version || i.version,
            expirationTime: u.p.exp,
            issuedAt: u.p.iat,
            notBefore: u.p.nbf
          },
          message: p,
          signature: u.s.s,
          cacao: u
        };
      });
      try {
        await r.setSessions(d), $e.sendEvent({
          type: "track",
          event: "SIWX_AUTH_SUCCESS",
          properties: xn.getSIWXEventProperties()
        });
      } catch (u) {
        throw console.error("SIWX:universalProviderAuth - failed to set sessions", u), $e.sendEvent({
          type: "track",
          event: "SIWX_AUTH_ERROR",
          properties: xn.getSIWXEventProperties()
        }), await s.disconnect().catch(console.error), u;
      } finally {
        ys.hide();
      }
    }
    return !0;
  },
  getSIWXEventProperties() {
    var e;
    const s = f.state.activeChain;
    return {
      network: ((e = f.state.activeCaipNetwork) == null ? void 0 : e.caipNetworkId) || "",
      isSmartAccount: As(s) === it.ACCOUNT_TYPES.SMART_ACCOUNT
    };
  },
  async clearSessions() {
    const s = this.getSIWX();
    s && await s.setSessions([]);
  }
}, Gt = {
  METMASK_CONNECTOR_NAME: "MetaMask",
  TRUST_CONNECTOR_NAME: "Trust Wallet",
  SOLFLARE_CONNECTOR_NAME: "Solflare",
  PHANTOM_CONNECTOR_NAME: "Phantom",
  COIN98_CONNECTOR_NAME: "Coin98",
  MAGIC_EDEN_CONNECTOR_NAME: "Magic Eden",
  BACKPACK_CONNECTOR_NAME: "Backpack",
  BITGET_CONNECTOR_NAME: "Bitget Wallet",
  FRONTIER_CONNECTOR_NAME: "Frontier",
  XVERSE_CONNECTOR_NAME: "Xverse Wallet",
  LEATHER_CONNECTOR_NAME: "Leather",
  EIP155: "eip155",
  ADD_CHAIN_METHOD: "wallet_addEthereumChain",
  EIP6963_ANNOUNCE_EVENT: "eip6963:announceProvider",
  EIP6963_REQUEST_EVENT: "eip6963:requestProvider",
  CONNECTOR_RDNS_MAP: {
    coinbaseWallet: "com.coinbase.wallet",
    coinbaseWalletSDK: "com.coinbase.wallet"
  },
  CONNECTOR_TYPE_EXTERNAL: "EXTERNAL",
  CONNECTOR_TYPE_WALLET_CONNECT: "WALLET_CONNECT",
  CONNECTOR_TYPE_INJECTED: "INJECTED",
  CONNECTOR_TYPE_ANNOUNCED: "ANNOUNCED",
  CONNECTOR_TYPE_AUTH: "AUTH",
  CONNECTOR_TYPE_MULTI_CHAIN: "MULTI_CHAIN",
  CONNECTOR_TYPE_W3M_AUTH: "ID_AUTH"
}, Li = {
  NetworkImageIds: {
    1: "ba0ba0cd-17c6-4806-ad93-f9d174f17900",
    42161: "3bff954d-5cb0-47a0-9a23-d20192e74600",
    43114: "30c46e53-e989-45fb-4549-be3bd4eb3b00",
    56: "93564157-2e8e-4ce7-81df-b264dbee9b00",
    250: "06b26297-fe0c-4733-5d6b-ffa5498aac00",
    10: "ab9c186a-c52f-464b-2906-ca59d760a400",
    137: "41d04d42-da3b-4453-8506-668cc0727900",
    5e3: "e86fae9b-b770-4eea-e520-150e12c81100",
    295: "6a97d510-cac8-4e58-c7ce-e8681b044c00",
    11155111: "e909ea0a-f92a-4512-c8fc-748044ea6800",
    84532: "a18a7ecd-e307-4360-4746-283182228e00",
    1301: "4eeea7ef-0014-4649-5d1d-07271a80f600",
    130: "2257980a-3463-48c6-cbac-a42d2a956e00",
    10143: "0a728e83-bacb-46db-7844-948f05434900",
    100: "02b53f6a-e3d4-479e-1cb4-21178987d100",
    9001: "f926ff41-260d-4028-635e-91913fc28e00",
    324: "b310f07f-4ef7-49f3-7073-2a0a39685800",
    314: "5a73b3dd-af74-424e-cae0-0de859ee9400",
    4689: "34e68754-e536-40da-c153-6ef2e7188a00",
    1088: "3897a66d-40b9-4833-162f-a2c90531c900",
    1284: "161038da-44ae-4ec7-1208-0ea569454b00",
    1285: "f1d73bb6-5450-4e18-38f7-fb6484264a00",
    7777777: "845c60df-d429-4991-e687-91ae45791600",
    42220: "ab781bbc-ccc6-418d-d32d-789b15da1f00",
    8453: "7289c336-3981-4081-c5f4-efc26ac64a00",
    1313161554: "3ff73439-a619-4894-9262-4470c773a100",
    2020: "b8101fc0-9c19-4b6f-ec65-f6dfff106e00",
    2021: "b8101fc0-9c19-4b6f-ec65-f6dfff106e00",
    80094: "e329c2c9-59b0-4a02-83e4-212ff3779900",
    2741: "fc2427d1-5af9-4a9c-8da5-6f94627cd900",
    "5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp": "a1b58899-f671-4276-6a5e-56ca5bd59700",
    "4uhcVJyU9pJkvQyS88uRDiswHXSCkY3z": "a1b58899-f671-4276-6a5e-56ca5bd59700",
    EtWTRABZaYq6iMfeYKouRu166VU2xqa1: "a1b58899-f671-4276-6a5e-56ca5bd59700",
    "000000000019d6689c085ae165831e93": "0b4838db-0161-4ffe-022d-532bf03dba00",
    "000000000933ea01ad0ee984209779ba": "39354064-d79b-420b-065d-f980c4b78200"
  },
  ConnectorImageIds: {
    [N.CONNECTOR_ID.COINBASE]: "0c2840c3-5b04-4c44-9661-fbd4b49e1800",
    [N.CONNECTOR_ID.COINBASE_SDK]: "0c2840c3-5b04-4c44-9661-fbd4b49e1800",
    [N.CONNECTOR_ID.SAFE]: "461db637-8616-43ce-035a-d89b8a1d5800",
    [N.CONNECTOR_ID.LEDGER]: "54a1aa77-d202-4f8d-0fb2-5d2bb6db0300",
    [N.CONNECTOR_ID.WALLET_CONNECT]: "ef1a1fcf-7fe8-4d69-bd6d-fda1345b4400",
    [N.CONNECTOR_ID.INJECTED]: "07ba87ed-43aa-4adf-4540-9e6a2b9cae00"
  },
  ConnectorNamesMap: {
    [N.CONNECTOR_ID.INJECTED]: "Browser Wallet",
    [N.CONNECTOR_ID.WALLET_CONNECT]: "WalletConnect",
    [N.CONNECTOR_ID.COINBASE]: "Coinbase",
    [N.CONNECTOR_ID.COINBASE_SDK]: "Coinbase",
    [N.CONNECTOR_ID.LEDGER]: "Ledger",
    [N.CONNECTOR_ID.SAFE]: "Safe"
  }
}, Nt = {
  getCaipTokens(s) {
    if (!s)
      return;
    const e = {};
    return Object.entries(s).forEach(([t, r]) => {
      e[`${Gt.EIP155}:${t}`] = r;
    }), e;
  },
  isLowerCaseMatch(s, e) {
    return (s == null ? void 0 : s.toLowerCase()) === (e == null ? void 0 : e.toLowerCase());
  },
  getActiveNamespaceConnectedToAuth() {
    const s = f.state.activeChain;
    return N.AUTH_CONNECTOR_SUPPORTED_CHAINS.find((e) => F.getConnectorId(e) === N.CONNECTOR_ID.AUTH && e === s);
  },
  withRetry({ conditionFn: s, intervalMs: e, maxRetries: t }) {
    let r = 0;
    return new Promise((n) => {
      async function i() {
        return r += 1, await s() ? n(!0) : r >= t ? n(!1) : (setTimeout(i, e), null);
      }
      i();
    });
  }
}, PA = new AbortController(), St = {
  EmbeddedWalletAbortController: PA,
  UniversalProviderErrors: {
    UNAUTHORIZED_DOMAIN_NOT_ALLOWED: {
      message: "Unauthorized: origin not allowed",
      alertErrorKey: "INVALID_APP_CONFIGURATION"
    },
    JWT_VALIDATION_ERROR: {
      message: "JWT validation error: JWT Token is not yet valid",
      alertErrorKey: "JWT_TOKEN_NOT_VALID"
    },
    INVALID_KEY: {
      message: "Unauthorized: invalid key",
      alertErrorKey: "INVALID_PROJECT_ID"
    }
  },
  ALERT_ERRORS: {
    SWITCH_NETWORK_NOT_FOUND: {
      shortMessage: "Network Not Found",
      longMessage: "Network not found - please make sure it is included in 'networks' array in createAppKit function"
    },
    INVALID_APP_CONFIGURATION: {
      shortMessage: "Invalid App Configuration",
      longMessage: () => `Origin ${OA() ? window.origin : "unknown"} not found on Allowlist - update configuration on cloud.reown.com`
    },
    IFRAME_LOAD_FAILED: {
      shortMessage: "Network Error - Could not load embedded wallet",
      longMessage: () => "There was an issue loading the embedded wallet. Please try again later."
    },
    IFRAME_REQUEST_TIMEOUT: {
      shortMessage: "Embedded Wallet Request Timed Out",
      longMessage: () => "There was an issue doing the request to the embedded wallet. Please try again later."
    },
    UNVERIFIED_DOMAIN: {
      shortMessage: "Invalid App Configuration",
      longMessage: () => "There was an issue loading the embedded wallet. Please verify that your domain is allowed at cloud.reown.com"
    },
    JWT_TOKEN_NOT_VALID: {
      shortMessage: "Session Expired",
      longMessage: "Invalid session found on UniversalProvider - please check your time settings and connect again"
    },
    INVALID_PROJECT_ID: {
      shortMessage: "Invalid App Configuration",
      longMessage: "Invalid Project ID - update configuration"
    },
    PROJECT_ID_NOT_CONFIGURED: {
      shortMessage: "Project ID Not Configured",
      longMessage: "Project ID Not Configured - update configuration on cloud.reown.com"
    },
    SERVER_ERROR_APP_CONFIGURATION: {
      shortMessage: "Server Error",
      longMessage: (s) => `Failed to get App Configuration ${s || ""}`
    },
    RATE_LIMITED_APP_CONFIGURATION: {
      shortMessage: "Rate Limited",
      longMessage: "Rate limited when trying to get the App Configuration"
    }
  }
};
function OA() {
  return typeof window < "u";
}
const xA = {
  createLogger(s, e = "error") {
    const t = Hn({
      level: e
    }), { logger: r } = Bc({
      opts: t
    });
    return r.error = (...n) => {
      for (const i of n)
        if (i instanceof Error) {
          s(i, ...n);
          return;
        }
      s(void 0, ...n);
    }, r;
  }
}, kA = "rpc.walletconnect.org";
function mu(s, e) {
  const t = new URL("https://rpc.walletconnect.org/v1/");
  return t.searchParams.set("chainId", s), t.searchParams.set("projectId", e), t.toString();
}
const Va = [
  "near:mainnet",
  "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",
  "eip155:1101",
  "eip155:56",
  "eip155:42161",
  "eip155:7777777",
  "eip155:59144",
  "eip155:324",
  "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1",
  "eip155:5000",
  "solana:4sgjmw1sunhzsxgspuhpqldx6wiyjntz",
  "eip155:80084",
  "eip155:5003",
  "eip155:100",
  "eip155:8453",
  "eip155:42220",
  "eip155:1313161555",
  "eip155:17000",
  "eip155:1",
  "eip155:300",
  "eip155:1313161554",
  "eip155:1329",
  "eip155:84532",
  "eip155:421614",
  "eip155:11155111",
  "eip155:8217",
  "eip155:43114",
  "solana:4uhcVJyU9pJkvQyS88uRDiswHXSCkY3z",
  "eip155:999999999",
  "eip155:11155420",
  "eip155:80002",
  "eip155:97",
  "eip155:43113",
  "eip155:137",
  "eip155:10",
  "eip155:1301",
  "bip122:000000000019d6689c085ae165831e93",
  "bip122:000000000933ea01ad0ee984209779ba"
], An = {
  extendRpcUrlWithProjectId(s, e) {
    let t = !1;
    try {
      t = new URL(s).host === kA;
    } catch {
      t = !1;
    }
    if (t) {
      const r = new URL(s);
      return r.searchParams.has("projectId") || r.searchParams.set("projectId", e), r.toString();
    }
    return s;
  },
  isCaipNetwork(s) {
    return "chainNamespace" in s && "caipNetworkId" in s;
  },
  getChainNamespace(s) {
    return this.isCaipNetwork(s) ? s.chainNamespace : N.CHAIN.EVM;
  },
  getCaipNetworkId(s) {
    return this.isCaipNetwork(s) ? s.caipNetworkId : `${N.CHAIN.EVM}:${s.id}`;
  },
  getDefaultRpcUrl(s, e, t) {
    var n, i, o;
    const r = (o = (i = (n = s.rpcUrls) == null ? void 0 : n.default) == null ? void 0 : i.http) == null ? void 0 : o[0];
    return Va.includes(e) ? mu(e, t) : r || "";
  },
  extendCaipNetwork(s, { customNetworkImageUrls: e, projectId: t, customRpcUrls: r }) {
    var p, g, w, m, y;
    const n = this.getChainNamespace(s), i = this.getCaipNetworkId(s), o = (p = s.rpcUrls.default.http) == null ? void 0 : p[0], a = this.getDefaultRpcUrl(s, i, t), c = ((m = (w = (g = s == null ? void 0 : s.rpcUrls) == null ? void 0 : g.chainDefault) == null ? void 0 : w.http) == null ? void 0 : m[0]) || o, l = ((y = r == null ? void 0 : r[i]) == null ? void 0 : y.map((C) => C.url)) || [], d = [...l, a], u = [...l];
    return c && !u.includes(c) && u.push(c), {
      ...s,
      chainNamespace: n,
      caipNetworkId: i,
      assets: {
        imageId: Li.NetworkImageIds[s.id],
        imageUrl: e == null ? void 0 : e[s.id]
      },
      rpcUrls: {
        ...s.rpcUrls,
        default: {
          http: d
        },
        chainDefault: {
          http: u
        }
      }
    };
  },
  extendCaipNetworks(s, { customNetworkImageUrls: e, projectId: t, customRpcUrls: r }) {
    return s.map((n) => An.extendCaipNetwork(n, {
      customNetworkImageUrls: e,
      customRpcUrls: r,
      projectId: t
    }));
  },
  getViemTransport(s, e, t) {
    var n, i, o;
    const r = [];
    return t == null || t.forEach((a) => {
      r.push(io(a.url, a.config));
    }), Va.includes(s.caipNetworkId) && r.push(io(mu(s.caipNetworkId, e), {
      fetchOptions: {
        headers: {
          "Content-Type": "text/plain"
        }
      }
    })), (o = (i = (n = s == null ? void 0 : s.rpcUrls) == null ? void 0 : n.default) == null ? void 0 : i.http) == null || o.forEach((a) => {
      r.push(io(a));
    }), Cl(r);
  },
  extendWagmiTransports(s, e, t) {
    if (Va.includes(s.caipNetworkId)) {
      const r = this.getDefaultRpcUrl(s, s.caipNetworkId, e);
      return Cl([t, io(r)]);
    }
    return t;
  },
  getUnsupportedNetwork(s) {
    return {
      id: s.split(":")[1],
      caipNetworkId: s,
      name: N.UNSUPPORTED_NETWORK_NAME,
      chainNamespace: s.split(":")[0],
      nativeCurrency: {
        name: "",
        decimals: 0,
        symbol: ""
      },
      rpcUrls: {
        default: {
          http: []
        }
      }
    };
  },
  getCaipNetworkFromStorage(s) {
    var c;
    const e = $.getActiveCaipNetworkId(), t = f.getAllRequestedCaipNetworks(), r = Array.from(((c = f.state.chains) == null ? void 0 : c.keys()) || []), n = e == null ? void 0 : e.split(":")[0], i = n ? r.includes(n) : !1, o = t == null ? void 0 : t.find((l) => l.caipNetworkId === e);
    return i && !o && e ? this.getUnsupportedNetwork(e) : o || s || (t == null ? void 0 : t[0]);
  }
}, Ko = {
  eip155: void 0,
  solana: void 0,
  polkadot: void 0,
  bip122: void 0,
  cosmos: void 0
}, $t = Ve({
  providers: { ...Ko },
  providerIds: { ...Ko }
}), Be = {
  state: $t,
  subscribeKey(s, e) {
    return It($t, s, e);
  },
  subscribe(s) {
    return gt($t, () => {
      s($t);
    });
  },
  subscribeProviders(s) {
    return gt($t.providers, () => s($t.providers));
  },
  setProvider(s, e) {
    e && ($t.providers[s] = Vr(e));
  },
  getProvider(s) {
    return $t.providers[s];
  },
  setProviderId(s, e) {
    e && ($t.providerIds[s] = e);
  },
  getProviderId(s) {
    if (s)
      return $t.providerIds[s];
  },
  reset() {
    $t.providers = { ...Ko }, $t.providerIds = { ...Ko };
  },
  resetChain(s) {
    $t.providers[s] = void 0, $t.providerIds[s] = void 0;
  }
}, UA = {
  BLOCKCHAIN_API_RPC_URL: "https://rpc.walletconnect.org",
  SECURE_SITE_SDK_ORIGIN: (typeof process < "u" && typeof process.env < "u" ? process.env.NEXT_PUBLIC_SECURE_SITE_ORIGIN : void 0) || "https://secure.walletconnect.org"
}, wu = {
  transactionHash: /^0x(?:[A-Fa-f0-9]{64})$/u,
  signedMessage: /^0x(?:[a-fA-F0-9]{62,})$/u
}, pt = {
  set(s, e) {
    Yt.isClient && localStorage.setItem(`${ee.STORAGE_KEY}${s}`, e);
  },
  get(s) {
    return Yt.isClient ? localStorage.getItem(`${ee.STORAGE_KEY}${s}`) : null;
  },
  delete(s, e) {
    Yt.isClient && (e ? localStorage.removeItem(s) : localStorage.removeItem(`${ee.STORAGE_KEY}${s}`));
  }
}, _o = 30 * 1e3, Yt = {
  checkIfAllowedToTriggerEmail() {
    const s = pt.get(ee.LAST_EMAIL_LOGIN_TIME);
    if (s) {
      const e = Date.now() - Number(s);
      if (e < _o) {
        const t = Math.ceil((_o - e) / 1e3);
        throw new Error(`Please try again after ${t} seconds`);
      }
    }
  },
  getTimeToNextEmailLogin() {
    const s = pt.get(ee.LAST_EMAIL_LOGIN_TIME);
    if (s) {
      const e = Date.now() - Number(s);
      if (e < _o)
        return Math.ceil((_o - e) / 1e3);
    }
    return 0;
  },
  checkIfRequestExists(s) {
    return it.NOT_SAFE_RPC_METHODS.includes(s.method) || it.SAFE_RPC_METHODS.includes(s.method);
  },
  getResponseType(s) {
    return typeof s == "string" && ((s == null ? void 0 : s.match(wu.transactionHash)) || (s == null ? void 0 : s.match(wu.signedMessage))) ? ee.RPC_RESPONSE_TYPE_TX : ee.RPC_RESPONSE_TYPE_OBJECT;
  },
  checkIfRequestIsSafe(s) {
    return it.SAFE_RPC_METHODS.includes(s.method);
  },
  isClient: typeof window < "u"
};
var Pe;
(function(s) {
  s.assertEqual = (n) => n;
  function e(n) {
  }
  s.assertIs = e;
  function t(n) {
    throw new Error();
  }
  s.assertNever = t, s.arrayToEnum = (n) => {
    const i = {};
    for (const o of n)
      i[o] = o;
    return i;
  }, s.getValidEnumValues = (n) => {
    const i = s.objectKeys(n).filter((a) => typeof n[n[a]] != "number"), o = {};
    for (const a of i)
      o[a] = n[a];
    return s.objectValues(o);
  }, s.objectValues = (n) => s.objectKeys(n).map(function(i) {
    return n[i];
  }), s.objectKeys = typeof Object.keys == "function" ? (n) => Object.keys(n) : (n) => {
    const i = [];
    for (const o in n)
      Object.prototype.hasOwnProperty.call(n, o) && i.push(o);
    return i;
  }, s.find = (n, i) => {
    for (const o of n)
      if (i(o))
        return o;
  }, s.isInteger = typeof Number.isInteger == "function" ? (n) => Number.isInteger(n) : (n) => typeof n == "number" && isFinite(n) && Math.floor(n) === n;
  function r(n, i = " | ") {
    return n.map((o) => typeof o == "string" ? `'${o}'` : o).join(i);
  }
  s.joinValues = r, s.jsonStringifyReplacer = (n, i) => typeof i == "bigint" ? i.toString() : i;
})(Pe || (Pe = {}));
var kc;
(function(s) {
  s.mergeShapes = (e, t) => ({
    ...e,
    ...t
    // second overwrites first
  });
})(kc || (kc = {}));
const V = Pe.arrayToEnum([
  "string",
  "nan",
  "number",
  "integer",
  "float",
  "boolean",
  "date",
  "bigint",
  "symbol",
  "function",
  "undefined",
  "null",
  "array",
  "object",
  "unknown",
  "promise",
  "void",
  "never",
  "map",
  "set"
]), br = (s) => {
  switch (typeof s) {
    case "undefined":
      return V.undefined;
    case "string":
      return V.string;
    case "number":
      return isNaN(s) ? V.nan : V.number;
    case "boolean":
      return V.boolean;
    case "function":
      return V.function;
    case "bigint":
      return V.bigint;
    case "symbol":
      return V.symbol;
    case "object":
      return Array.isArray(s) ? V.array : s === null ? V.null : s.then && typeof s.then == "function" && s.catch && typeof s.catch == "function" ? V.promise : typeof Map < "u" && s instanceof Map ? V.map : typeof Set < "u" && s instanceof Set ? V.set : typeof Date < "u" && s instanceof Date ? V.date : V.object;
    default:
      return V.unknown;
  }
}, D = Pe.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of",
  "not_finite"
]), DA = (s) => JSON.stringify(s, null, 2).replace(/"([^"]+)":/g, "$1:");
class Cs extends Error {
  constructor(e) {
    super(), this.issues = [], this.addIssue = (r) => {
      this.issues = [...this.issues, r];
    }, this.addIssues = (r = []) => {
      this.issues = [...this.issues, ...r];
    };
    const t = new.target.prototype;
    Object.setPrototypeOf ? Object.setPrototypeOf(this, t) : this.__proto__ = t, this.name = "ZodError", this.issues = e;
  }
  get errors() {
    return this.issues;
  }
  format(e) {
    const t = e || function(i) {
      return i.message;
    }, r = { _errors: [] }, n = (i) => {
      for (const o of i.issues)
        if (o.code === "invalid_union")
          o.unionErrors.map(n);
        else if (o.code === "invalid_return_type")
          n(o.returnTypeError);
        else if (o.code === "invalid_arguments")
          n(o.argumentsError);
        else if (o.path.length === 0)
          r._errors.push(t(o));
        else {
          let a = r, c = 0;
          for (; c < o.path.length; ) {
            const l = o.path[c];
            c === o.path.length - 1 ? (a[l] = a[l] || { _errors: [] }, a[l]._errors.push(t(o))) : a[l] = a[l] || { _errors: [] }, a = a[l], c++;
          }
        }
    };
    return n(this), r;
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, Pe.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(e = (t) => t.message) {
    const t = {}, r = [];
    for (const n of this.issues)
      n.path.length > 0 ? (t[n.path[0]] = t[n.path[0]] || [], t[n.path[0]].push(e(n))) : r.push(e(n));
    return { formErrors: r, fieldErrors: t };
  }
  get formErrors() {
    return this.flatten();
  }
}
Cs.create = (s) => new Cs(s);
const Mi = (s, e) => {
  let t;
  switch (s.code) {
    case D.invalid_type:
      s.received === V.undefined ? t = "Required" : t = `Expected ${s.expected}, received ${s.received}`;
      break;
    case D.invalid_literal:
      t = `Invalid literal value, expected ${JSON.stringify(s.expected, Pe.jsonStringifyReplacer)}`;
      break;
    case D.unrecognized_keys:
      t = `Unrecognized key(s) in object: ${Pe.joinValues(s.keys, ", ")}`;
      break;
    case D.invalid_union:
      t = "Invalid input";
      break;
    case D.invalid_union_discriminator:
      t = `Invalid discriminator value. Expected ${Pe.joinValues(s.options)}`;
      break;
    case D.invalid_enum_value:
      t = `Invalid enum value. Expected ${Pe.joinValues(s.options)}, received '${s.received}'`;
      break;
    case D.invalid_arguments:
      t = "Invalid function arguments";
      break;
    case D.invalid_return_type:
      t = "Invalid function return type";
      break;
    case D.invalid_date:
      t = "Invalid date";
      break;
    case D.invalid_string:
      typeof s.validation == "object" ? "includes" in s.validation ? (t = `Invalid input: must include "${s.validation.includes}"`, typeof s.validation.position == "number" && (t = `${t} at one or more positions greater than or equal to ${s.validation.position}`)) : "startsWith" in s.validation ? t = `Invalid input: must start with "${s.validation.startsWith}"` : "endsWith" in s.validation ? t = `Invalid input: must end with "${s.validation.endsWith}"` : Pe.assertNever(s.validation) : s.validation !== "regex" ? t = `Invalid ${s.validation}` : t = "Invalid";
      break;
    case D.too_small:
      s.type === "array" ? t = `Array must contain ${s.exact ? "exactly" : s.inclusive ? "at least" : "more than"} ${s.minimum} element(s)` : s.type === "string" ? t = `String must contain ${s.exact ? "exactly" : s.inclusive ? "at least" : "over"} ${s.minimum} character(s)` : s.type === "number" ? t = `Number must be ${s.exact ? "exactly equal to " : s.inclusive ? "greater than or equal to " : "greater than "}${s.minimum}` : s.type === "date" ? t = `Date must be ${s.exact ? "exactly equal to " : s.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(s.minimum))}` : t = "Invalid input";
      break;
    case D.too_big:
      s.type === "array" ? t = `Array must contain ${s.exact ? "exactly" : s.inclusive ? "at most" : "less than"} ${s.maximum} element(s)` : s.type === "string" ? t = `String must contain ${s.exact ? "exactly" : s.inclusive ? "at most" : "under"} ${s.maximum} character(s)` : s.type === "number" ? t = `Number must be ${s.exact ? "exactly" : s.inclusive ? "less than or equal to" : "less than"} ${s.maximum}` : s.type === "bigint" ? t = `BigInt must be ${s.exact ? "exactly" : s.inclusive ? "less than or equal to" : "less than"} ${s.maximum}` : s.type === "date" ? t = `Date must be ${s.exact ? "exactly" : s.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(s.maximum))}` : t = "Invalid input";
      break;
    case D.custom:
      t = "Invalid input";
      break;
    case D.invalid_intersection_types:
      t = "Intersection results could not be merged";
      break;
    case D.not_multiple_of:
      t = `Number must be a multiple of ${s.multipleOf}`;
      break;
    case D.not_finite:
      t = "Number must be finite";
      break;
    default:
      t = e.defaultError, Pe.assertNever(s);
  }
  return { message: t };
};
let Dp = Mi;
function $A(s) {
  Dp = s;
}
function Go() {
  return Dp;
}
const Yo = (s) => {
  const { data: e, path: t, errorMaps: r, issueData: n } = s, i = [...t, ...n.path || []], o = {
    ...n,
    path: i
  };
  let a = "";
  const c = r.filter((l) => !!l).slice().reverse();
  for (const l of c)
    a = l(o, { data: e, defaultError: a }).message;
  return {
    ...n,
    path: i,
    message: n.message || a
  };
}, LA = [];
function J(s, e) {
  const t = Yo({
    issueData: e,
    data: s.data,
    path: s.path,
    errorMaps: [
      s.common.contextualErrorMap,
      s.schemaErrorMap,
      Go(),
      Mi
      // then global default map
    ].filter((r) => !!r)
  });
  s.common.issues.push(t);
}
class _t {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    this.value === "valid" && (this.value = "dirty");
  }
  abort() {
    this.value !== "aborted" && (this.value = "aborted");
  }
  static mergeArray(e, t) {
    const r = [];
    for (const n of t) {
      if (n.status === "aborted")
        return pe;
      n.status === "dirty" && e.dirty(), r.push(n.value);
    }
    return { status: e.value, value: r };
  }
  static async mergeObjectAsync(e, t) {
    const r = [];
    for (const n of t)
      r.push({
        key: await n.key,
        value: await n.value
      });
    return _t.mergeObjectSync(e, r);
  }
  static mergeObjectSync(e, t) {
    const r = {};
    for (const n of t) {
      const { key: i, value: o } = n;
      if (i.status === "aborted" || o.status === "aborted")
        return pe;
      i.status === "dirty" && e.dirty(), o.status === "dirty" && e.dirty(), i.value !== "__proto__" && (typeof o.value < "u" || n.alwaysSet) && (r[i.value] = o.value);
    }
    return { status: e.value, value: r };
  }
}
const pe = Object.freeze({
  status: "aborted"
}), $p = (s) => ({ status: "dirty", value: s }), Pt = (s) => ({ status: "valid", value: s }), Uc = (s) => s.status === "aborted", Dc = (s) => s.status === "dirty", Bi = (s) => s.status === "valid", Zo = (s) => typeof Promise < "u" && s instanceof Promise;
var ie;
(function(s) {
  s.errToObj = (e) => typeof e == "string" ? { message: e } : e || {}, s.toString = (e) => typeof e == "string" ? e : e == null ? void 0 : e.message;
})(ie || (ie = {}));
class Fs {
  constructor(e, t, r, n) {
    this._cachedPath = [], this.parent = e, this.data = t, this._path = r, this._key = n;
  }
  get path() {
    return this._cachedPath.length || (this._key instanceof Array ? this._cachedPath.push(...this._path, ...this._key) : this._cachedPath.push(...this._path, this._key)), this._cachedPath;
  }
}
const yu = (s, e) => {
  if (Bi(e))
    return { success: !0, data: e.value };
  if (!s.common.issues.length)
    throw new Error("Validation failed but no issues detected.");
  return {
    success: !1,
    get error() {
      if (this._error)
        return this._error;
      const t = new Cs(s.common.issues);
      return this._error = t, this._error;
    }
  };
};
function me(s) {
  if (!s)
    return {};
  const { errorMap: e, invalid_type_error: t, required_error: r, description: n } = s;
  if (e && (t || r))
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  return e ? { errorMap: e, description: n } : { errorMap: (o, a) => o.code !== "invalid_type" ? { message: a.defaultError } : typeof a.data > "u" ? { message: r ?? a.defaultError } : { message: t ?? a.defaultError }, description: n };
}
class we {
  constructor(e) {
    this.spa = this.safeParseAsync, this._def = e, this.parse = this.parse.bind(this), this.safeParse = this.safeParse.bind(this), this.parseAsync = this.parseAsync.bind(this), this.safeParseAsync = this.safeParseAsync.bind(this), this.spa = this.spa.bind(this), this.refine = this.refine.bind(this), this.refinement = this.refinement.bind(this), this.superRefine = this.superRefine.bind(this), this.optional = this.optional.bind(this), this.nullable = this.nullable.bind(this), this.nullish = this.nullish.bind(this), this.array = this.array.bind(this), this.promise = this.promise.bind(this), this.or = this.or.bind(this), this.and = this.and.bind(this), this.transform = this.transform.bind(this), this.brand = this.brand.bind(this), this.default = this.default.bind(this), this.catch = this.catch.bind(this), this.describe = this.describe.bind(this), this.pipe = this.pipe.bind(this), this.readonly = this.readonly.bind(this), this.isNullable = this.isNullable.bind(this), this.isOptional = this.isOptional.bind(this);
  }
  get description() {
    return this._def.description;
  }
  _getType(e) {
    return br(e.data);
  }
  _getOrReturnCtx(e, t) {
    return t || {
      common: e.parent.common,
      data: e.data,
      parsedType: br(e.data),
      schemaErrorMap: this._def.errorMap,
      path: e.path,
      parent: e.parent
    };
  }
  _processInputParams(e) {
    return {
      status: new _t(),
      ctx: {
        common: e.parent.common,
        data: e.data,
        parsedType: br(e.data),
        schemaErrorMap: this._def.errorMap,
        path: e.path,
        parent: e.parent
      }
    };
  }
  _parseSync(e) {
    const t = this._parse(e);
    if (Zo(t))
      throw new Error("Synchronous parse encountered promise.");
    return t;
  }
  _parseAsync(e) {
    const t = this._parse(e);
    return Promise.resolve(t);
  }
  parse(e, t) {
    const r = this.safeParse(e, t);
    if (r.success)
      return r.data;
    throw r.error;
  }
  safeParse(e, t) {
    var r;
    const n = {
      common: {
        issues: [],
        async: (r = t == null ? void 0 : t.async) !== null && r !== void 0 ? r : !1,
        contextualErrorMap: t == null ? void 0 : t.errorMap
      },
      path: (t == null ? void 0 : t.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: br(e)
    }, i = this._parseSync({ data: e, path: n.path, parent: n });
    return yu(n, i);
  }
  async parseAsync(e, t) {
    const r = await this.safeParseAsync(e, t);
    if (r.success)
      return r.data;
    throw r.error;
  }
  async safeParseAsync(e, t) {
    const r = {
      common: {
        issues: [],
        contextualErrorMap: t == null ? void 0 : t.errorMap,
        async: !0
      },
      path: (t == null ? void 0 : t.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: br(e)
    }, n = this._parse({ data: e, path: r.path, parent: r }), i = await (Zo(n) ? n : Promise.resolve(n));
    return yu(r, i);
  }
  refine(e, t) {
    const r = (n) => typeof t == "string" || typeof t > "u" ? { message: t } : typeof t == "function" ? t(n) : t;
    return this._refinement((n, i) => {
      const o = e(n), a = () => i.addIssue({
        code: D.custom,
        ...r(n)
      });
      return typeof Promise < "u" && o instanceof Promise ? o.then((c) => c ? !0 : (a(), !1)) : o ? !0 : (a(), !1);
    });
  }
  refinement(e, t) {
    return this._refinement((r, n) => e(r) ? !0 : (n.addIssue(typeof t == "function" ? t(r, n) : t), !1));
  }
  _refinement(e) {
    return new Is({
      schema: this,
      typeName: ue.ZodEffects,
      effect: { type: "refinement", refinement: e }
    });
  }
  superRefine(e) {
    return this._refinement(e);
  }
  optional() {
    return Qs.create(this, this._def);
  }
  nullable() {
    return Xr.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return _s.create(this, this._def);
  }
  promise() {
    return jn.create(this, this._def);
  }
  or(e) {
    return Wi.create([this, e], this._def);
  }
  and(e) {
    return Hi.create(this, e, this._def);
  }
  transform(e) {
    return new Is({
      ...me(this._def),
      schema: this,
      typeName: ue.ZodEffects,
      effect: { type: "transform", transform: e }
    });
  }
  default(e) {
    const t = typeof e == "function" ? e : () => e;
    return new Yi({
      ...me(this._def),
      innerType: this,
      defaultValue: t,
      typeName: ue.ZodDefault
    });
  }
  brand() {
    return new Mp({
      typeName: ue.ZodBranded,
      type: this,
      ...me(this._def)
    });
  }
  catch(e) {
    const t = typeof e == "function" ? e : () => e;
    return new ea({
      ...me(this._def),
      innerType: this,
      catchValue: t,
      typeName: ue.ZodCatch
    });
  }
  describe(e) {
    const t = this.constructor;
    return new t({
      ...this._def,
      description: e
    });
  }
  pipe(e) {
    return ro.create(this, e);
  }
  readonly() {
    return sa.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
const MA = /^c[^\s-]{8,}$/i, BA = /^[a-z][a-z0-9]*$/, FA = /^[0-9A-HJKMNP-TV-Z]{26}$/, jA = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i, qA = /^(?!\.)(?!.*\.\.)([A-Z0-9_+-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i, WA = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
let Ka;
const HA = /^(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))$/, zA = /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/, VA = (s) => s.precision ? s.offset ? new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${s.precision}}(([+-]\\d{2}(:?\\d{2})?)|Z)$`) : new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${s.precision}}Z$`) : s.precision === 0 ? s.offset ? new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(([+-]\\d{2}(:?\\d{2})?)|Z)$") : new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}Z$") : s.offset ? new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?(([+-]\\d{2}(:?\\d{2})?)|Z)$") : new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?Z$");
function KA(s, e) {
  return !!((e === "v4" || !e) && HA.test(s) || (e === "v6" || !e) && zA.test(s));
}
class bs extends we {
  _parse(e) {
    if (this._def.coerce && (e.data = String(e.data)), this._getType(e) !== V.string) {
      const i = this._getOrReturnCtx(e);
      return J(
        i,
        {
          code: D.invalid_type,
          expected: V.string,
          received: i.parsedType
        }
        //
      ), pe;
    }
    const r = new _t();
    let n;
    for (const i of this._def.checks)
      if (i.kind === "min")
        e.data.length < i.value && (n = this._getOrReturnCtx(e, n), J(n, {
          code: D.too_small,
          minimum: i.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: i.message
        }), r.dirty());
      else if (i.kind === "max")
        e.data.length > i.value && (n = this._getOrReturnCtx(e, n), J(n, {
          code: D.too_big,
          maximum: i.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: i.message
        }), r.dirty());
      else if (i.kind === "length") {
        const o = e.data.length > i.value, a = e.data.length < i.value;
        (o || a) && (n = this._getOrReturnCtx(e, n), o ? J(n, {
          code: D.too_big,
          maximum: i.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: i.message
        }) : a && J(n, {
          code: D.too_small,
          minimum: i.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: i.message
        }), r.dirty());
      } else if (i.kind === "email")
        qA.test(e.data) || (n = this._getOrReturnCtx(e, n), J(n, {
          validation: "email",
          code: D.invalid_string,
          message: i.message
        }), r.dirty());
      else if (i.kind === "emoji")
        Ka || (Ka = new RegExp(WA, "u")), Ka.test(e.data) || (n = this._getOrReturnCtx(e, n), J(n, {
          validation: "emoji",
          code: D.invalid_string,
          message: i.message
        }), r.dirty());
      else if (i.kind === "uuid")
        jA.test(e.data) || (n = this._getOrReturnCtx(e, n), J(n, {
          validation: "uuid",
          code: D.invalid_string,
          message: i.message
        }), r.dirty());
      else if (i.kind === "cuid")
        MA.test(e.data) || (n = this._getOrReturnCtx(e, n), J(n, {
          validation: "cuid",
          code: D.invalid_string,
          message: i.message
        }), r.dirty());
      else if (i.kind === "cuid2")
        BA.test(e.data) || (n = this._getOrReturnCtx(e, n), J(n, {
          validation: "cuid2",
          code: D.invalid_string,
          message: i.message
        }), r.dirty());
      else if (i.kind === "ulid")
        FA.test(e.data) || (n = this._getOrReturnCtx(e, n), J(n, {
          validation: "ulid",
          code: D.invalid_string,
          message: i.message
        }), r.dirty());
      else if (i.kind === "url")
        try {
          new URL(e.data);
        } catch {
          n = this._getOrReturnCtx(e, n), J(n, {
            validation: "url",
            code: D.invalid_string,
            message: i.message
          }), r.dirty();
        }
      else i.kind === "regex" ? (i.regex.lastIndex = 0, i.regex.test(e.data) || (n = this._getOrReturnCtx(e, n), J(n, {
        validation: "regex",
        code: D.invalid_string,
        message: i.message
      }), r.dirty())) : i.kind === "trim" ? e.data = e.data.trim() : i.kind === "includes" ? e.data.includes(i.value, i.position) || (n = this._getOrReturnCtx(e, n), J(n, {
        code: D.invalid_string,
        validation: { includes: i.value, position: i.position },
        message: i.message
      }), r.dirty()) : i.kind === "toLowerCase" ? e.data = e.data.toLowerCase() : i.kind === "toUpperCase" ? e.data = e.data.toUpperCase() : i.kind === "startsWith" ? e.data.startsWith(i.value) || (n = this._getOrReturnCtx(e, n), J(n, {
        code: D.invalid_string,
        validation: { startsWith: i.value },
        message: i.message
      }), r.dirty()) : i.kind === "endsWith" ? e.data.endsWith(i.value) || (n = this._getOrReturnCtx(e, n), J(n, {
        code: D.invalid_string,
        validation: { endsWith: i.value },
        message: i.message
      }), r.dirty()) : i.kind === "datetime" ? VA(i).test(e.data) || (n = this._getOrReturnCtx(e, n), J(n, {
        code: D.invalid_string,
        validation: "datetime",
        message: i.message
      }), r.dirty()) : i.kind === "ip" ? KA(e.data, i.version) || (n = this._getOrReturnCtx(e, n), J(n, {
        validation: "ip",
        code: D.invalid_string,
        message: i.message
      }), r.dirty()) : Pe.assertNever(i);
    return { status: r.value, value: e.data };
  }
  _regex(e, t, r) {
    return this.refinement((n) => e.test(n), {
      validation: t,
      code: D.invalid_string,
      ...ie.errToObj(r)
    });
  }
  _addCheck(e) {
    return new bs({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  email(e) {
    return this._addCheck({ kind: "email", ...ie.errToObj(e) });
  }
  url(e) {
    return this._addCheck({ kind: "url", ...ie.errToObj(e) });
  }
  emoji(e) {
    return this._addCheck({ kind: "emoji", ...ie.errToObj(e) });
  }
  uuid(e) {
    return this._addCheck({ kind: "uuid", ...ie.errToObj(e) });
  }
  cuid(e) {
    return this._addCheck({ kind: "cuid", ...ie.errToObj(e) });
  }
  cuid2(e) {
    return this._addCheck({ kind: "cuid2", ...ie.errToObj(e) });
  }
  ulid(e) {
    return this._addCheck({ kind: "ulid", ...ie.errToObj(e) });
  }
  ip(e) {
    return this._addCheck({ kind: "ip", ...ie.errToObj(e) });
  }
  datetime(e) {
    var t;
    return typeof e == "string" ? this._addCheck({
      kind: "datetime",
      precision: null,
      offset: !1,
      message: e
    }) : this._addCheck({
      kind: "datetime",
      precision: typeof (e == null ? void 0 : e.precision) > "u" ? null : e == null ? void 0 : e.precision,
      offset: (t = e == null ? void 0 : e.offset) !== null && t !== void 0 ? t : !1,
      ...ie.errToObj(e == null ? void 0 : e.message)
    });
  }
  regex(e, t) {
    return this._addCheck({
      kind: "regex",
      regex: e,
      ...ie.errToObj(t)
    });
  }
  includes(e, t) {
    return this._addCheck({
      kind: "includes",
      value: e,
      position: t == null ? void 0 : t.position,
      ...ie.errToObj(t == null ? void 0 : t.message)
    });
  }
  startsWith(e, t) {
    return this._addCheck({
      kind: "startsWith",
      value: e,
      ...ie.errToObj(t)
    });
  }
  endsWith(e, t) {
    return this._addCheck({
      kind: "endsWith",
      value: e,
      ...ie.errToObj(t)
    });
  }
  min(e, t) {
    return this._addCheck({
      kind: "min",
      value: e,
      ...ie.errToObj(t)
    });
  }
  max(e, t) {
    return this._addCheck({
      kind: "max",
      value: e,
      ...ie.errToObj(t)
    });
  }
  length(e, t) {
    return this._addCheck({
      kind: "length",
      value: e,
      ...ie.errToObj(t)
    });
  }
  /**
   * @deprecated Use z.string().min(1) instead.
   * @see {@link ZodString.min}
   */
  nonempty(e) {
    return this.min(1, ie.errToObj(e));
  }
  trim() {
    return new bs({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new bs({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new bs({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }]
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((e) => e.kind === "datetime");
  }
  get isEmail() {
    return !!this._def.checks.find((e) => e.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((e) => e.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((e) => e.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((e) => e.kind === "uuid");
  }
  get isCUID() {
    return !!this._def.checks.find((e) => e.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((e) => e.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((e) => e.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((e) => e.kind === "ip");
  }
  get minLength() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "min" && (e === null || t.value > e) && (e = t.value);
    return e;
  }
  get maxLength() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "max" && (e === null || t.value < e) && (e = t.value);
    return e;
  }
}
bs.create = (s) => {
  var e;
  return new bs({
    checks: [],
    typeName: ue.ZodString,
    coerce: (e = s == null ? void 0 : s.coerce) !== null && e !== void 0 ? e : !1,
    ...me(s)
  });
};
function GA(s, e) {
  const t = (s.toString().split(".")[1] || "").length, r = (e.toString().split(".")[1] || "").length, n = t > r ? t : r, i = parseInt(s.toFixed(n).replace(".", "")), o = parseInt(e.toFixed(n).replace(".", ""));
  return i % o / Math.pow(10, n);
}
class Tr extends we {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
  }
  _parse(e) {
    if (this._def.coerce && (e.data = Number(e.data)), this._getType(e) !== V.number) {
      const i = this._getOrReturnCtx(e);
      return J(i, {
        code: D.invalid_type,
        expected: V.number,
        received: i.parsedType
      }), pe;
    }
    let r;
    const n = new _t();
    for (const i of this._def.checks)
      i.kind === "int" ? Pe.isInteger(e.data) || (r = this._getOrReturnCtx(e, r), J(r, {
        code: D.invalid_type,
        expected: "integer",
        received: "float",
        message: i.message
      }), n.dirty()) : i.kind === "min" ? (i.inclusive ? e.data < i.value : e.data <= i.value) && (r = this._getOrReturnCtx(e, r), J(r, {
        code: D.too_small,
        minimum: i.value,
        type: "number",
        inclusive: i.inclusive,
        exact: !1,
        message: i.message
      }), n.dirty()) : i.kind === "max" ? (i.inclusive ? e.data > i.value : e.data >= i.value) && (r = this._getOrReturnCtx(e, r), J(r, {
        code: D.too_big,
        maximum: i.value,
        type: "number",
        inclusive: i.inclusive,
        exact: !1,
        message: i.message
      }), n.dirty()) : i.kind === "multipleOf" ? GA(e.data, i.value) !== 0 && (r = this._getOrReturnCtx(e, r), J(r, {
        code: D.not_multiple_of,
        multipleOf: i.value,
        message: i.message
      }), n.dirty()) : i.kind === "finite" ? Number.isFinite(e.data) || (r = this._getOrReturnCtx(e, r), J(r, {
        code: D.not_finite,
        message: i.message
      }), n.dirty()) : Pe.assertNever(i);
    return { status: n.value, value: e.data };
  }
  gte(e, t) {
    return this.setLimit("min", e, !0, ie.toString(t));
  }
  gt(e, t) {
    return this.setLimit("min", e, !1, ie.toString(t));
  }
  lte(e, t) {
    return this.setLimit("max", e, !0, ie.toString(t));
  }
  lt(e, t) {
    return this.setLimit("max", e, !1, ie.toString(t));
  }
  setLimit(e, t, r, n) {
    return new Tr({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: e,
          value: t,
          inclusive: r,
          message: ie.toString(n)
        }
      ]
    });
  }
  _addCheck(e) {
    return new Tr({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  int(e) {
    return this._addCheck({
      kind: "int",
      message: ie.toString(e)
    });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !1,
      message: ie.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !1,
      message: ie.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !0,
      message: ie.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !0,
      message: ie.toString(e)
    });
  }
  multipleOf(e, t) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: ie.toString(t)
    });
  }
  finite(e) {
    return this._addCheck({
      kind: "finite",
      message: ie.toString(e)
    });
  }
  safe(e) {
    return this._addCheck({
      kind: "min",
      inclusive: !0,
      value: Number.MIN_SAFE_INTEGER,
      message: ie.toString(e)
    })._addCheck({
      kind: "max",
      inclusive: !0,
      value: Number.MAX_SAFE_INTEGER,
      message: ie.toString(e)
    });
  }
  get minValue() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "min" && (e === null || t.value > e) && (e = t.value);
    return e;
  }
  get maxValue() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "max" && (e === null || t.value < e) && (e = t.value);
    return e;
  }
  get isInt() {
    return !!this._def.checks.find((e) => e.kind === "int" || e.kind === "multipleOf" && Pe.isInteger(e.value));
  }
  get isFinite() {
    let e = null, t = null;
    for (const r of this._def.checks) {
      if (r.kind === "finite" || r.kind === "int" || r.kind === "multipleOf")
        return !0;
      r.kind === "min" ? (t === null || r.value > t) && (t = r.value) : r.kind === "max" && (e === null || r.value < e) && (e = r.value);
    }
    return Number.isFinite(t) && Number.isFinite(e);
  }
}
Tr.create = (s) => new Tr({
  checks: [],
  typeName: ue.ZodNumber,
  coerce: (s == null ? void 0 : s.coerce) || !1,
  ...me(s)
});
class Rr extends we {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte;
  }
  _parse(e) {
    if (this._def.coerce && (e.data = BigInt(e.data)), this._getType(e) !== V.bigint) {
      const i = this._getOrReturnCtx(e);
      return J(i, {
        code: D.invalid_type,
        expected: V.bigint,
        received: i.parsedType
      }), pe;
    }
    let r;
    const n = new _t();
    for (const i of this._def.checks)
      i.kind === "min" ? (i.inclusive ? e.data < i.value : e.data <= i.value) && (r = this._getOrReturnCtx(e, r), J(r, {
        code: D.too_small,
        type: "bigint",
        minimum: i.value,
        inclusive: i.inclusive,
        message: i.message
      }), n.dirty()) : i.kind === "max" ? (i.inclusive ? e.data > i.value : e.data >= i.value) && (r = this._getOrReturnCtx(e, r), J(r, {
        code: D.too_big,
        type: "bigint",
        maximum: i.value,
        inclusive: i.inclusive,
        message: i.message
      }), n.dirty()) : i.kind === "multipleOf" ? e.data % i.value !== BigInt(0) && (r = this._getOrReturnCtx(e, r), J(r, {
        code: D.not_multiple_of,
        multipleOf: i.value,
        message: i.message
      }), n.dirty()) : Pe.assertNever(i);
    return { status: n.value, value: e.data };
  }
  gte(e, t) {
    return this.setLimit("min", e, !0, ie.toString(t));
  }
  gt(e, t) {
    return this.setLimit("min", e, !1, ie.toString(t));
  }
  lte(e, t) {
    return this.setLimit("max", e, !0, ie.toString(t));
  }
  lt(e, t) {
    return this.setLimit("max", e, !1, ie.toString(t));
  }
  setLimit(e, t, r, n) {
    return new Rr({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: e,
          value: t,
          inclusive: r,
          message: ie.toString(n)
        }
      ]
    });
  }
  _addCheck(e) {
    return new Rr({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !1,
      message: ie.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !1,
      message: ie.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !0,
      message: ie.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !0,
      message: ie.toString(e)
    });
  }
  multipleOf(e, t) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: ie.toString(t)
    });
  }
  get minValue() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "min" && (e === null || t.value > e) && (e = t.value);
    return e;
  }
  get maxValue() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "max" && (e === null || t.value < e) && (e = t.value);
    return e;
  }
}
Rr.create = (s) => {
  var e;
  return new Rr({
    checks: [],
    typeName: ue.ZodBigInt,
    coerce: (e = s == null ? void 0 : s.coerce) !== null && e !== void 0 ? e : !1,
    ...me(s)
  });
};
class Fi extends we {
  _parse(e) {
    if (this._def.coerce && (e.data = !!e.data), this._getType(e) !== V.boolean) {
      const r = this._getOrReturnCtx(e);
      return J(r, {
        code: D.invalid_type,
        expected: V.boolean,
        received: r.parsedType
      }), pe;
    }
    return Pt(e.data);
  }
}
Fi.create = (s) => new Fi({
  typeName: ue.ZodBoolean,
  coerce: (s == null ? void 0 : s.coerce) || !1,
  ...me(s)
});
class Zr extends we {
  _parse(e) {
    if (this._def.coerce && (e.data = new Date(e.data)), this._getType(e) !== V.date) {
      const i = this._getOrReturnCtx(e);
      return J(i, {
        code: D.invalid_type,
        expected: V.date,
        received: i.parsedType
      }), pe;
    }
    if (isNaN(e.data.getTime())) {
      const i = this._getOrReturnCtx(e);
      return J(i, {
        code: D.invalid_date
      }), pe;
    }
    const r = new _t();
    let n;
    for (const i of this._def.checks)
      i.kind === "min" ? e.data.getTime() < i.value && (n = this._getOrReturnCtx(e, n), J(n, {
        code: D.too_small,
        message: i.message,
        inclusive: !0,
        exact: !1,
        minimum: i.value,
        type: "date"
      }), r.dirty()) : i.kind === "max" ? e.data.getTime() > i.value && (n = this._getOrReturnCtx(e, n), J(n, {
        code: D.too_big,
        message: i.message,
        inclusive: !0,
        exact: !1,
        maximum: i.value,
        type: "date"
      }), r.dirty()) : Pe.assertNever(i);
    return {
      status: r.value,
      value: new Date(e.data.getTime())
    };
  }
  _addCheck(e) {
    return new Zr({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  min(e, t) {
    return this._addCheck({
      kind: "min",
      value: e.getTime(),
      message: ie.toString(t)
    });
  }
  max(e, t) {
    return this._addCheck({
      kind: "max",
      value: e.getTime(),
      message: ie.toString(t)
    });
  }
  get minDate() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "min" && (e === null || t.value > e) && (e = t.value);
    return e != null ? new Date(e) : null;
  }
  get maxDate() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "max" && (e === null || t.value < e) && (e = t.value);
    return e != null ? new Date(e) : null;
  }
}
Zr.create = (s) => new Zr({
  checks: [],
  coerce: (s == null ? void 0 : s.coerce) || !1,
  typeName: ue.ZodDate,
  ...me(s)
});
class Jo extends we {
  _parse(e) {
    if (this._getType(e) !== V.symbol) {
      const r = this._getOrReturnCtx(e);
      return J(r, {
        code: D.invalid_type,
        expected: V.symbol,
        received: r.parsedType
      }), pe;
    }
    return Pt(e.data);
  }
}
Jo.create = (s) => new Jo({
  typeName: ue.ZodSymbol,
  ...me(s)
});
class ji extends we {
  _parse(e) {
    if (this._getType(e) !== V.undefined) {
      const r = this._getOrReturnCtx(e);
      return J(r, {
        code: D.invalid_type,
        expected: V.undefined,
        received: r.parsedType
      }), pe;
    }
    return Pt(e.data);
  }
}
ji.create = (s) => new ji({
  typeName: ue.ZodUndefined,
  ...me(s)
});
class qi extends we {
  _parse(e) {
    if (this._getType(e) !== V.null) {
      const r = this._getOrReturnCtx(e);
      return J(r, {
        code: D.invalid_type,
        expected: V.null,
        received: r.parsedType
      }), pe;
    }
    return Pt(e.data);
  }
}
qi.create = (s) => new qi({
  typeName: ue.ZodNull,
  ...me(s)
});
class Fn extends we {
  constructor() {
    super(...arguments), this._any = !0;
  }
  _parse(e) {
    return Pt(e.data);
  }
}
Fn.create = (s) => new Fn({
  typeName: ue.ZodAny,
  ...me(s)
});
class Hr extends we {
  constructor() {
    super(...arguments), this._unknown = !0;
  }
  _parse(e) {
    return Pt(e.data);
  }
}
Hr.create = (s) => new Hr({
  typeName: ue.ZodUnknown,
  ...me(s)
});
class tr extends we {
  _parse(e) {
    const t = this._getOrReturnCtx(e);
    return J(t, {
      code: D.invalid_type,
      expected: V.never,
      received: t.parsedType
    }), pe;
  }
}
tr.create = (s) => new tr({
  typeName: ue.ZodNever,
  ...me(s)
});
class Xo extends we {
  _parse(e) {
    if (this._getType(e) !== V.undefined) {
      const r = this._getOrReturnCtx(e);
      return J(r, {
        code: D.invalid_type,
        expected: V.void,
        received: r.parsedType
      }), pe;
    }
    return Pt(e.data);
  }
}
Xo.create = (s) => new Xo({
  typeName: ue.ZodVoid,
  ...me(s)
});
class _s extends we {
  _parse(e) {
    const { ctx: t, status: r } = this._processInputParams(e), n = this._def;
    if (t.parsedType !== V.array)
      return J(t, {
        code: D.invalid_type,
        expected: V.array,
        received: t.parsedType
      }), pe;
    if (n.exactLength !== null) {
      const o = t.data.length > n.exactLength.value, a = t.data.length < n.exactLength.value;
      (o || a) && (J(t, {
        code: o ? D.too_big : D.too_small,
        minimum: a ? n.exactLength.value : void 0,
        maximum: o ? n.exactLength.value : void 0,
        type: "array",
        inclusive: !0,
        exact: !0,
        message: n.exactLength.message
      }), r.dirty());
    }
    if (n.minLength !== null && t.data.length < n.minLength.value && (J(t, {
      code: D.too_small,
      minimum: n.minLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: n.minLength.message
    }), r.dirty()), n.maxLength !== null && t.data.length > n.maxLength.value && (J(t, {
      code: D.too_big,
      maximum: n.maxLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: n.maxLength.message
    }), r.dirty()), t.common.async)
      return Promise.all([...t.data].map((o, a) => n.type._parseAsync(new Fs(t, o, t.path, a)))).then((o) => _t.mergeArray(r, o));
    const i = [...t.data].map((o, a) => n.type._parseSync(new Fs(t, o, t.path, a)));
    return _t.mergeArray(r, i);
  }
  get element() {
    return this._def.type;
  }
  min(e, t) {
    return new _s({
      ...this._def,
      minLength: { value: e, message: ie.toString(t) }
    });
  }
  max(e, t) {
    return new _s({
      ...this._def,
      maxLength: { value: e, message: ie.toString(t) }
    });
  }
  length(e, t) {
    return new _s({
      ...this._def,
      exactLength: { value: e, message: ie.toString(t) }
    });
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
_s.create = (s, e) => new _s({
  type: s,
  minLength: null,
  maxLength: null,
  exactLength: null,
  typeName: ue.ZodArray,
  ...me(e)
});
function In(s) {
  if (s instanceof Ye) {
    const e = {};
    for (const t in s.shape) {
      const r = s.shape[t];
      e[t] = Qs.create(In(r));
    }
    return new Ye({
      ...s._def,
      shape: () => e
    });
  } else return s instanceof _s ? new _s({
    ...s._def,
    type: In(s.element)
  }) : s instanceof Qs ? Qs.create(In(s.unwrap())) : s instanceof Xr ? Xr.create(In(s.unwrap())) : s instanceof js ? js.create(s.items.map((e) => In(e))) : s;
}
class Ye extends we {
  constructor() {
    super(...arguments), this._cached = null, this.nonstrict = this.passthrough, this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const e = this._def.shape(), t = Pe.objectKeys(e);
    return this._cached = { shape: e, keys: t };
  }
  _parse(e) {
    if (this._getType(e) !== V.object) {
      const l = this._getOrReturnCtx(e);
      return J(l, {
        code: D.invalid_type,
        expected: V.object,
        received: l.parsedType
      }), pe;
    }
    const { status: r, ctx: n } = this._processInputParams(e), { shape: i, keys: o } = this._getCached(), a = [];
    if (!(this._def.catchall instanceof tr && this._def.unknownKeys === "strip"))
      for (const l in n.data)
        o.includes(l) || a.push(l);
    const c = [];
    for (const l of o) {
      const d = i[l], u = n.data[l];
      c.push({
        key: { status: "valid", value: l },
        value: d._parse(new Fs(n, u, n.path, l)),
        alwaysSet: l in n.data
      });
    }
    if (this._def.catchall instanceof tr) {
      const l = this._def.unknownKeys;
      if (l === "passthrough")
        for (const d of a)
          c.push({
            key: { status: "valid", value: d },
            value: { status: "valid", value: n.data[d] }
          });
      else if (l === "strict")
        a.length > 0 && (J(n, {
          code: D.unrecognized_keys,
          keys: a
        }), r.dirty());
      else if (l !== "strip") throw new Error("Internal ZodObject error: invalid unknownKeys value.");
    } else {
      const l = this._def.catchall;
      for (const d of a) {
        const u = n.data[d];
        c.push({
          key: { status: "valid", value: d },
          value: l._parse(
            new Fs(n, u, n.path, d)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: d in n.data
        });
      }
    }
    return n.common.async ? Promise.resolve().then(async () => {
      const l = [];
      for (const d of c) {
        const u = await d.key;
        l.push({
          key: u,
          value: await d.value,
          alwaysSet: d.alwaysSet
        });
      }
      return l;
    }).then((l) => _t.mergeObjectSync(r, l)) : _t.mergeObjectSync(r, c);
  }
  get shape() {
    return this._def.shape();
  }
  strict(e) {
    return ie.errToObj, new Ye({
      ...this._def,
      unknownKeys: "strict",
      ...e !== void 0 ? {
        errorMap: (t, r) => {
          var n, i, o, a;
          const c = (o = (i = (n = this._def).errorMap) === null || i === void 0 ? void 0 : i.call(n, t, r).message) !== null && o !== void 0 ? o : r.defaultError;
          return t.code === "unrecognized_keys" ? {
            message: (a = ie.errToObj(e).message) !== null && a !== void 0 ? a : c
          } : {
            message: c
          };
        }
      } : {}
    });
  }
  strip() {
    return new Ye({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new Ye({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  // const AugmentFactory =
  //   <Def extends ZodObjectDef>(def: Def) =>
  //   <Augmentation extends ZodRawShape>(
  //     augmentation: Augmentation
  //   ): ZodObject<
  //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
  //     Def["unknownKeys"],
  //     Def["catchall"]
  //   > => {
  //     return new ZodObject({
  //       ...def,
  //       shape: () => ({
  //         ...def.shape(),
  //         ...augmentation,
  //       }),
  //     }) as any;
  //   };
  extend(e) {
    return new Ye({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...e
      })
    });
  }
  /**
   * Prior to zod@1.0.12 there was a bug in the
   * inferred type of merged objects. Please
   * upgrade if you are experiencing issues.
   */
  merge(e) {
    return new Ye({
      unknownKeys: e._def.unknownKeys,
      catchall: e._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...e._def.shape()
      }),
      typeName: ue.ZodObject
    });
  }
  // merge<
  //   Incoming extends AnyZodObject,
  //   Augmentation extends Incoming["shape"],
  //   NewOutput extends {
  //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
  //       ? Augmentation[k]["_output"]
  //       : k extends keyof Output
  //       ? Output[k]
  //       : never;
  //   },
  //   NewInput extends {
  //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
  //       ? Augmentation[k]["_input"]
  //       : k extends keyof Input
  //       ? Input[k]
  //       : never;
  //   }
  // >(
  //   merging: Incoming
  // ): ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"],
  //   NewOutput,
  //   NewInput
  // > {
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  setKey(e, t) {
    return this.augment({ [e]: t });
  }
  // merge<Incoming extends AnyZodObject>(
  //   merging: Incoming
  // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
  // ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"]
  // > {
  //   // const mergedShape = objectUtil.mergeShapes(
  //   //   this._def.shape(),
  //   //   merging._def.shape()
  //   // );
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  catchall(e) {
    return new Ye({
      ...this._def,
      catchall: e
    });
  }
  pick(e) {
    const t = {};
    return Pe.objectKeys(e).forEach((r) => {
      e[r] && this.shape[r] && (t[r] = this.shape[r]);
    }), new Ye({
      ...this._def,
      shape: () => t
    });
  }
  omit(e) {
    const t = {};
    return Pe.objectKeys(this.shape).forEach((r) => {
      e[r] || (t[r] = this.shape[r]);
    }), new Ye({
      ...this._def,
      shape: () => t
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return In(this);
  }
  partial(e) {
    const t = {};
    return Pe.objectKeys(this.shape).forEach((r) => {
      const n = this.shape[r];
      e && !e[r] ? t[r] = n : t[r] = n.optional();
    }), new Ye({
      ...this._def,
      shape: () => t
    });
  }
  required(e) {
    const t = {};
    return Pe.objectKeys(this.shape).forEach((r) => {
      if (e && !e[r])
        t[r] = this.shape[r];
      else {
        let i = this.shape[r];
        for (; i instanceof Qs; )
          i = i._def.innerType;
        t[r] = i;
      }
    }), new Ye({
      ...this._def,
      shape: () => t
    });
  }
  keyof() {
    return Lp(Pe.objectKeys(this.shape));
  }
}
Ye.create = (s, e) => new Ye({
  shape: () => s,
  unknownKeys: "strip",
  catchall: tr.create(),
  typeName: ue.ZodObject,
  ...me(e)
});
Ye.strictCreate = (s, e) => new Ye({
  shape: () => s,
  unknownKeys: "strict",
  catchall: tr.create(),
  typeName: ue.ZodObject,
  ...me(e)
});
Ye.lazycreate = (s, e) => new Ye({
  shape: s,
  unknownKeys: "strip",
  catchall: tr.create(),
  typeName: ue.ZodObject,
  ...me(e)
});
class Wi extends we {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e), r = this._def.options;
    function n(i) {
      for (const a of i)
        if (a.result.status === "valid")
          return a.result;
      for (const a of i)
        if (a.result.status === "dirty")
          return t.common.issues.push(...a.ctx.common.issues), a.result;
      const o = i.map((a) => new Cs(a.ctx.common.issues));
      return J(t, {
        code: D.invalid_union,
        unionErrors: o
      }), pe;
    }
    if (t.common.async)
      return Promise.all(r.map(async (i) => {
        const o = {
          ...t,
          common: {
            ...t.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await i._parseAsync({
            data: t.data,
            path: t.path,
            parent: o
          }),
          ctx: o
        };
      })).then(n);
    {
      let i;
      const o = [];
      for (const c of r) {
        const l = {
          ...t,
          common: {
            ...t.common,
            issues: []
          },
          parent: null
        }, d = c._parseSync({
          data: t.data,
          path: t.path,
          parent: l
        });
        if (d.status === "valid")
          return d;
        d.status === "dirty" && !i && (i = { result: d, ctx: l }), l.common.issues.length && o.push(l.common.issues);
      }
      if (i)
        return t.common.issues.push(...i.ctx.common.issues), i.result;
      const a = o.map((c) => new Cs(c));
      return J(t, {
        code: D.invalid_union,
        unionErrors: a
      }), pe;
    }
  }
  get options() {
    return this._def.options;
  }
}
Wi.create = (s, e) => new Wi({
  options: s,
  typeName: ue.ZodUnion,
  ...me(e)
});
const Po = (s) => s instanceof Vi ? Po(s.schema) : s instanceof Is ? Po(s.innerType()) : s instanceof Ki ? [s.value] : s instanceof Pr ? s.options : s instanceof Gi ? Object.keys(s.enum) : s instanceof Yi ? Po(s._def.innerType) : s instanceof ji ? [void 0] : s instanceof qi ? [null] : null;
class ga extends we {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    if (t.parsedType !== V.object)
      return J(t, {
        code: D.invalid_type,
        expected: V.object,
        received: t.parsedType
      }), pe;
    const r = this.discriminator, n = t.data[r], i = this.optionsMap.get(n);
    return i ? t.common.async ? i._parseAsync({
      data: t.data,
      path: t.path,
      parent: t
    }) : i._parseSync({
      data: t.data,
      path: t.path,
      parent: t
    }) : (J(t, {
      code: D.invalid_union_discriminator,
      options: Array.from(this.optionsMap.keys()),
      path: [r]
    }), pe);
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get options() {
    return this._def.options;
  }
  get optionsMap() {
    return this._def.optionsMap;
  }
  /**
   * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
   * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
   * have a different value for each object in the union.
   * @param discriminator the name of the discriminator property
   * @param types an array of object schemas
   * @param params
   */
  static create(e, t, r) {
    const n = /* @__PURE__ */ new Map();
    for (const i of t) {
      const o = Po(i.shape[e]);
      if (!o)
        throw new Error(`A discriminator value for key \`${e}\` could not be extracted from all schema options`);
      for (const a of o) {
        if (n.has(a))
          throw new Error(`Discriminator property ${String(e)} has duplicate value ${String(a)}`);
        n.set(a, i);
      }
    }
    return new ga({
      typeName: ue.ZodDiscriminatedUnion,
      discriminator: e,
      options: t,
      optionsMap: n,
      ...me(r)
    });
  }
}
function $c(s, e) {
  const t = br(s), r = br(e);
  if (s === e)
    return { valid: !0, data: s };
  if (t === V.object && r === V.object) {
    const n = Pe.objectKeys(e), i = Pe.objectKeys(s).filter((a) => n.indexOf(a) !== -1), o = { ...s, ...e };
    for (const a of i) {
      const c = $c(s[a], e[a]);
      if (!c.valid)
        return { valid: !1 };
      o[a] = c.data;
    }
    return { valid: !0, data: o };
  } else if (t === V.array && r === V.array) {
    if (s.length !== e.length)
      return { valid: !1 };
    const n = [];
    for (let i = 0; i < s.length; i++) {
      const o = s[i], a = e[i], c = $c(o, a);
      if (!c.valid)
        return { valid: !1 };
      n.push(c.data);
    }
    return { valid: !0, data: n };
  } else return t === V.date && r === V.date && +s == +e ? { valid: !0, data: s } : { valid: !1 };
}
class Hi extends we {
  _parse(e) {
    const { status: t, ctx: r } = this._processInputParams(e), n = (i, o) => {
      if (Uc(i) || Uc(o))
        return pe;
      const a = $c(i.value, o.value);
      return a.valid ? ((Dc(i) || Dc(o)) && t.dirty(), { status: t.value, value: a.data }) : (J(r, {
        code: D.invalid_intersection_types
      }), pe);
    };
    return r.common.async ? Promise.all([
      this._def.left._parseAsync({
        data: r.data,
        path: r.path,
        parent: r
      }),
      this._def.right._parseAsync({
        data: r.data,
        path: r.path,
        parent: r
      })
    ]).then(([i, o]) => n(i, o)) : n(this._def.left._parseSync({
      data: r.data,
      path: r.path,
      parent: r
    }), this._def.right._parseSync({
      data: r.data,
      path: r.path,
      parent: r
    }));
  }
}
Hi.create = (s, e, t) => new Hi({
  left: s,
  right: e,
  typeName: ue.ZodIntersection,
  ...me(t)
});
class js extends we {
  _parse(e) {
    const { status: t, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== V.array)
      return J(r, {
        code: D.invalid_type,
        expected: V.array,
        received: r.parsedType
      }), pe;
    if (r.data.length < this._def.items.length)
      return J(r, {
        code: D.too_small,
        minimum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: "array"
      }), pe;
    !this._def.rest && r.data.length > this._def.items.length && (J(r, {
      code: D.too_big,
      maximum: this._def.items.length,
      inclusive: !0,
      exact: !1,
      type: "array"
    }), t.dirty());
    const i = [...r.data].map((o, a) => {
      const c = this._def.items[a] || this._def.rest;
      return c ? c._parse(new Fs(r, o, r.path, a)) : null;
    }).filter((o) => !!o);
    return r.common.async ? Promise.all(i).then((o) => _t.mergeArray(t, o)) : _t.mergeArray(t, i);
  }
  get items() {
    return this._def.items;
  }
  rest(e) {
    return new js({
      ...this._def,
      rest: e
    });
  }
}
js.create = (s, e) => {
  if (!Array.isArray(s))
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  return new js({
    items: s,
    typeName: ue.ZodTuple,
    rest: null,
    ...me(e)
  });
};
class zi extends we {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: t, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== V.object)
      return J(r, {
        code: D.invalid_type,
        expected: V.object,
        received: r.parsedType
      }), pe;
    const n = [], i = this._def.keyType, o = this._def.valueType;
    for (const a in r.data)
      n.push({
        key: i._parse(new Fs(r, a, r.path, a)),
        value: o._parse(new Fs(r, r.data[a], r.path, a))
      });
    return r.common.async ? _t.mergeObjectAsync(t, n) : _t.mergeObjectSync(t, n);
  }
  get element() {
    return this._def.valueType;
  }
  static create(e, t, r) {
    return t instanceof we ? new zi({
      keyType: e,
      valueType: t,
      typeName: ue.ZodRecord,
      ...me(r)
    }) : new zi({
      keyType: bs.create(),
      valueType: e,
      typeName: ue.ZodRecord,
      ...me(t)
    });
  }
}
class Qo extends we {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: t, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== V.map)
      return J(r, {
        code: D.invalid_type,
        expected: V.map,
        received: r.parsedType
      }), pe;
    const n = this._def.keyType, i = this._def.valueType, o = [...r.data.entries()].map(([a, c], l) => ({
      key: n._parse(new Fs(r, a, r.path, [l, "key"])),
      value: i._parse(new Fs(r, c, r.path, [l, "value"]))
    }));
    if (r.common.async) {
      const a = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const c of o) {
          const l = await c.key, d = await c.value;
          if (l.status === "aborted" || d.status === "aborted")
            return pe;
          (l.status === "dirty" || d.status === "dirty") && t.dirty(), a.set(l.value, d.value);
        }
        return { status: t.value, value: a };
      });
    } else {
      const a = /* @__PURE__ */ new Map();
      for (const c of o) {
        const l = c.key, d = c.value;
        if (l.status === "aborted" || d.status === "aborted")
          return pe;
        (l.status === "dirty" || d.status === "dirty") && t.dirty(), a.set(l.value, d.value);
      }
      return { status: t.value, value: a };
    }
  }
}
Qo.create = (s, e, t) => new Qo({
  valueType: e,
  keyType: s,
  typeName: ue.ZodMap,
  ...me(t)
});
class Jr extends we {
  _parse(e) {
    const { status: t, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== V.set)
      return J(r, {
        code: D.invalid_type,
        expected: V.set,
        received: r.parsedType
      }), pe;
    const n = this._def;
    n.minSize !== null && r.data.size < n.minSize.value && (J(r, {
      code: D.too_small,
      minimum: n.minSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: n.minSize.message
    }), t.dirty()), n.maxSize !== null && r.data.size > n.maxSize.value && (J(r, {
      code: D.too_big,
      maximum: n.maxSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: n.maxSize.message
    }), t.dirty());
    const i = this._def.valueType;
    function o(c) {
      const l = /* @__PURE__ */ new Set();
      for (const d of c) {
        if (d.status === "aborted")
          return pe;
        d.status === "dirty" && t.dirty(), l.add(d.value);
      }
      return { status: t.value, value: l };
    }
    const a = [...r.data.values()].map((c, l) => i._parse(new Fs(r, c, r.path, l)));
    return r.common.async ? Promise.all(a).then((c) => o(c)) : o(a);
  }
  min(e, t) {
    return new Jr({
      ...this._def,
      minSize: { value: e, message: ie.toString(t) }
    });
  }
  max(e, t) {
    return new Jr({
      ...this._def,
      maxSize: { value: e, message: ie.toString(t) }
    });
  }
  size(e, t) {
    return this.min(e, t).max(e, t);
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
Jr.create = (s, e) => new Jr({
  valueType: s,
  minSize: null,
  maxSize: null,
  typeName: ue.ZodSet,
  ...me(e)
});
class kn extends we {
  constructor() {
    super(...arguments), this.validate = this.implement;
  }
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    if (t.parsedType !== V.function)
      return J(t, {
        code: D.invalid_type,
        expected: V.function,
        received: t.parsedType
      }), pe;
    function r(a, c) {
      return Yo({
        data: a,
        path: t.path,
        errorMaps: [
          t.common.contextualErrorMap,
          t.schemaErrorMap,
          Go(),
          Mi
        ].filter((l) => !!l),
        issueData: {
          code: D.invalid_arguments,
          argumentsError: c
        }
      });
    }
    function n(a, c) {
      return Yo({
        data: a,
        path: t.path,
        errorMaps: [
          t.common.contextualErrorMap,
          t.schemaErrorMap,
          Go(),
          Mi
        ].filter((l) => !!l),
        issueData: {
          code: D.invalid_return_type,
          returnTypeError: c
        }
      });
    }
    const i = { errorMap: t.common.contextualErrorMap }, o = t.data;
    if (this._def.returns instanceof jn) {
      const a = this;
      return Pt(async function(...c) {
        const l = new Cs([]), d = await a._def.args.parseAsync(c, i).catch((g) => {
          throw l.addIssue(r(c, g)), l;
        }), u = await Reflect.apply(o, this, d);
        return await a._def.returns._def.type.parseAsync(u, i).catch((g) => {
          throw l.addIssue(n(u, g)), l;
        });
      });
    } else {
      const a = this;
      return Pt(function(...c) {
        const l = a._def.args.safeParse(c, i);
        if (!l.success)
          throw new Cs([r(c, l.error)]);
        const d = Reflect.apply(o, this, l.data), u = a._def.returns.safeParse(d, i);
        if (!u.success)
          throw new Cs([n(d, u.error)]);
        return u.data;
      });
    }
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...e) {
    return new kn({
      ...this._def,
      args: js.create(e).rest(Hr.create())
    });
  }
  returns(e) {
    return new kn({
      ...this._def,
      returns: e
    });
  }
  implement(e) {
    return this.parse(e);
  }
  strictImplement(e) {
    return this.parse(e);
  }
  static create(e, t, r) {
    return new kn({
      args: e || js.create([]).rest(Hr.create()),
      returns: t || Hr.create(),
      typeName: ue.ZodFunction,
      ...me(r)
    });
  }
}
class Vi extends we {
  get schema() {
    return this._def.getter();
  }
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    return this._def.getter()._parse({ data: t.data, path: t.path, parent: t });
  }
}
Vi.create = (s, e) => new Vi({
  getter: s,
  typeName: ue.ZodLazy,
  ...me(e)
});
class Ki extends we {
  _parse(e) {
    if (e.data !== this._def.value) {
      const t = this._getOrReturnCtx(e);
      return J(t, {
        received: t.data,
        code: D.invalid_literal,
        expected: this._def.value
      }), pe;
    }
    return { status: "valid", value: e.data };
  }
  get value() {
    return this._def.value;
  }
}
Ki.create = (s, e) => new Ki({
  value: s,
  typeName: ue.ZodLiteral,
  ...me(e)
});
function Lp(s, e) {
  return new Pr({
    values: s,
    typeName: ue.ZodEnum,
    ...me(e)
  });
}
class Pr extends we {
  _parse(e) {
    if (typeof e.data != "string") {
      const t = this._getOrReturnCtx(e), r = this._def.values;
      return J(t, {
        expected: Pe.joinValues(r),
        received: t.parsedType,
        code: D.invalid_type
      }), pe;
    }
    if (this._def.values.indexOf(e.data) === -1) {
      const t = this._getOrReturnCtx(e), r = this._def.values;
      return J(t, {
        received: t.data,
        code: D.invalid_enum_value,
        options: r
      }), pe;
    }
    return Pt(e.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const e = {};
    for (const t of this._def.values)
      e[t] = t;
    return e;
  }
  get Values() {
    const e = {};
    for (const t of this._def.values)
      e[t] = t;
    return e;
  }
  get Enum() {
    const e = {};
    for (const t of this._def.values)
      e[t] = t;
    return e;
  }
  extract(e) {
    return Pr.create(e);
  }
  exclude(e) {
    return Pr.create(this.options.filter((t) => !e.includes(t)));
  }
}
Pr.create = Lp;
class Gi extends we {
  _parse(e) {
    const t = Pe.getValidEnumValues(this._def.values), r = this._getOrReturnCtx(e);
    if (r.parsedType !== V.string && r.parsedType !== V.number) {
      const n = Pe.objectValues(t);
      return J(r, {
        expected: Pe.joinValues(n),
        received: r.parsedType,
        code: D.invalid_type
      }), pe;
    }
    if (t.indexOf(e.data) === -1) {
      const n = Pe.objectValues(t);
      return J(r, {
        received: r.data,
        code: D.invalid_enum_value,
        options: n
      }), pe;
    }
    return Pt(e.data);
  }
  get enum() {
    return this._def.values;
  }
}
Gi.create = (s, e) => new Gi({
  values: s,
  typeName: ue.ZodNativeEnum,
  ...me(e)
});
class jn extends we {
  unwrap() {
    return this._def.type;
  }
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    if (t.parsedType !== V.promise && t.common.async === !1)
      return J(t, {
        code: D.invalid_type,
        expected: V.promise,
        received: t.parsedType
      }), pe;
    const r = t.parsedType === V.promise ? t.data : Promise.resolve(t.data);
    return Pt(r.then((n) => this._def.type.parseAsync(n, {
      path: t.path,
      errorMap: t.common.contextualErrorMap
    })));
  }
}
jn.create = (s, e) => new jn({
  type: s,
  typeName: ue.ZodPromise,
  ...me(e)
});
class Is extends we {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === ue.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(e) {
    const { status: t, ctx: r } = this._processInputParams(e), n = this._def.effect || null, i = {
      addIssue: (o) => {
        J(r, o), o.fatal ? t.abort() : t.dirty();
      },
      get path() {
        return r.path;
      }
    };
    if (i.addIssue = i.addIssue.bind(i), n.type === "preprocess") {
      const o = n.transform(r.data, i);
      return r.common.issues.length ? {
        status: "dirty",
        value: r.data
      } : r.common.async ? Promise.resolve(o).then((a) => this._def.schema._parseAsync({
        data: a,
        path: r.path,
        parent: r
      })) : this._def.schema._parseSync({
        data: o,
        path: r.path,
        parent: r
      });
    }
    if (n.type === "refinement") {
      const o = (a) => {
        const c = n.refinement(a, i);
        if (r.common.async)
          return Promise.resolve(c);
        if (c instanceof Promise)
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        return a;
      };
      if (r.common.async === !1) {
        const a = this._def.schema._parseSync({
          data: r.data,
          path: r.path,
          parent: r
        });
        return a.status === "aborted" ? pe : (a.status === "dirty" && t.dirty(), o(a.value), { status: t.value, value: a.value });
      } else
        return this._def.schema._parseAsync({ data: r.data, path: r.path, parent: r }).then((a) => a.status === "aborted" ? pe : (a.status === "dirty" && t.dirty(), o(a.value).then(() => ({ status: t.value, value: a.value }))));
    }
    if (n.type === "transform")
      if (r.common.async === !1) {
        const o = this._def.schema._parseSync({
          data: r.data,
          path: r.path,
          parent: r
        });
        if (!Bi(o))
          return o;
        const a = n.transform(o.value, i);
        if (a instanceof Promise)
          throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
        return { status: t.value, value: a };
      } else
        return this._def.schema._parseAsync({ data: r.data, path: r.path, parent: r }).then((o) => Bi(o) ? Promise.resolve(n.transform(o.value, i)).then((a) => ({ status: t.value, value: a })) : o);
    Pe.assertNever(n);
  }
}
Is.create = (s, e, t) => new Is({
  schema: s,
  typeName: ue.ZodEffects,
  effect: e,
  ...me(t)
});
Is.createWithPreprocess = (s, e, t) => new Is({
  schema: e,
  effect: { type: "preprocess", transform: s },
  typeName: ue.ZodEffects,
  ...me(t)
});
class Qs extends we {
  _parse(e) {
    return this._getType(e) === V.undefined ? Pt(void 0) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
Qs.create = (s, e) => new Qs({
  innerType: s,
  typeName: ue.ZodOptional,
  ...me(e)
});
class Xr extends we {
  _parse(e) {
    return this._getType(e) === V.null ? Pt(null) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
Xr.create = (s, e) => new Xr({
  innerType: s,
  typeName: ue.ZodNullable,
  ...me(e)
});
class Yi extends we {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    let r = t.data;
    return t.parsedType === V.undefined && (r = this._def.defaultValue()), this._def.innerType._parse({
      data: r,
      path: t.path,
      parent: t
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
}
Yi.create = (s, e) => new Yi({
  innerType: s,
  typeName: ue.ZodDefault,
  defaultValue: typeof e.default == "function" ? e.default : () => e.default,
  ...me(e)
});
class ea extends we {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e), r = {
      ...t,
      common: {
        ...t.common,
        issues: []
      }
    }, n = this._def.innerType._parse({
      data: r.data,
      path: r.path,
      parent: {
        ...r
      }
    });
    return Zo(n) ? n.then((i) => ({
      status: "valid",
      value: i.status === "valid" ? i.value : this._def.catchValue({
        get error() {
          return new Cs(r.common.issues);
        },
        input: r.data
      })
    })) : {
      status: "valid",
      value: n.status === "valid" ? n.value : this._def.catchValue({
        get error() {
          return new Cs(r.common.issues);
        },
        input: r.data
      })
    };
  }
  removeCatch() {
    return this._def.innerType;
  }
}
ea.create = (s, e) => new ea({
  innerType: s,
  typeName: ue.ZodCatch,
  catchValue: typeof e.catch == "function" ? e.catch : () => e.catch,
  ...me(e)
});
class ta extends we {
  _parse(e) {
    if (this._getType(e) !== V.nan) {
      const r = this._getOrReturnCtx(e);
      return J(r, {
        code: D.invalid_type,
        expected: V.nan,
        received: r.parsedType
      }), pe;
    }
    return { status: "valid", value: e.data };
  }
}
ta.create = (s) => new ta({
  typeName: ue.ZodNaN,
  ...me(s)
});
const YA = Symbol("zod_brand");
class Mp extends we {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e), r = t.data;
    return this._def.type._parse({
      data: r,
      path: t.path,
      parent: t
    });
  }
  unwrap() {
    return this._def.type;
  }
}
class ro extends we {
  _parse(e) {
    const { status: t, ctx: r } = this._processInputParams(e);
    if (r.common.async)
      return (async () => {
        const i = await this._def.in._parseAsync({
          data: r.data,
          path: r.path,
          parent: r
        });
        return i.status === "aborted" ? pe : i.status === "dirty" ? (t.dirty(), $p(i.value)) : this._def.out._parseAsync({
          data: i.value,
          path: r.path,
          parent: r
        });
      })();
    {
      const n = this._def.in._parseSync({
        data: r.data,
        path: r.path,
        parent: r
      });
      return n.status === "aborted" ? pe : n.status === "dirty" ? (t.dirty(), {
        status: "dirty",
        value: n.value
      }) : this._def.out._parseSync({
        data: n.value,
        path: r.path,
        parent: r
      });
    }
  }
  static create(e, t) {
    return new ro({
      in: e,
      out: t,
      typeName: ue.ZodPipeline
    });
  }
}
class sa extends we {
  _parse(e) {
    const t = this._def.innerType._parse(e);
    return Bi(t) && (t.value = Object.freeze(t.value)), t;
  }
}
sa.create = (s, e) => new sa({
  innerType: s,
  typeName: ue.ZodReadonly,
  ...me(e)
});
const Bp = (s, e = {}, t) => s ? Fn.create().superRefine((r, n) => {
  var i, o;
  if (!s(r)) {
    const a = typeof e == "function" ? e(r) : typeof e == "string" ? { message: e } : e, c = (o = (i = a.fatal) !== null && i !== void 0 ? i : t) !== null && o !== void 0 ? o : !0, l = typeof a == "string" ? { message: a } : a;
    n.addIssue({ code: "custom", ...l, fatal: c });
  }
}) : Fn.create(), ZA = {
  object: Ye.lazycreate
};
var ue;
(function(s) {
  s.ZodString = "ZodString", s.ZodNumber = "ZodNumber", s.ZodNaN = "ZodNaN", s.ZodBigInt = "ZodBigInt", s.ZodBoolean = "ZodBoolean", s.ZodDate = "ZodDate", s.ZodSymbol = "ZodSymbol", s.ZodUndefined = "ZodUndefined", s.ZodNull = "ZodNull", s.ZodAny = "ZodAny", s.ZodUnknown = "ZodUnknown", s.ZodNever = "ZodNever", s.ZodVoid = "ZodVoid", s.ZodArray = "ZodArray", s.ZodObject = "ZodObject", s.ZodUnion = "ZodUnion", s.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", s.ZodIntersection = "ZodIntersection", s.ZodTuple = "ZodTuple", s.ZodRecord = "ZodRecord", s.ZodMap = "ZodMap", s.ZodSet = "ZodSet", s.ZodFunction = "ZodFunction", s.ZodLazy = "ZodLazy", s.ZodLiteral = "ZodLiteral", s.ZodEnum = "ZodEnum", s.ZodEffects = "ZodEffects", s.ZodNativeEnum = "ZodNativeEnum", s.ZodOptional = "ZodOptional", s.ZodNullable = "ZodNullable", s.ZodDefault = "ZodDefault", s.ZodCatch = "ZodCatch", s.ZodPromise = "ZodPromise", s.ZodBranded = "ZodBranded", s.ZodPipeline = "ZodPipeline", s.ZodReadonly = "ZodReadonly";
})(ue || (ue = {}));
const JA = (s, e = {
  message: `Input not instance of ${s.name}`
}) => Bp((t) => t instanceof s, e), Fp = bs.create, jp = Tr.create, XA = ta.create, QA = Rr.create, qp = Fi.create, eI = Zr.create, tI = Jo.create, sI = ji.create, rI = qi.create, nI = Fn.create, iI = Hr.create, oI = tr.create, aI = Xo.create, cI = _s.create, lI = Ye.create, dI = Ye.strictCreate, uI = Wi.create, hI = ga.create, pI = Hi.create, fI = js.create, gI = zi.create, mI = Qo.create, wI = Jr.create, yI = kn.create, EI = Vi.create, bI = Ki.create, vI = Pr.create, CI = Gi.create, _I = jn.create, Eu = Is.create, AI = Qs.create, II = Xr.create, SI = Is.createWithPreprocess, NI = ro.create, TI = () => Fp().optional(), RI = () => jp().optional(), PI = () => qp().optional(), OI = {
  string: (s) => bs.create({ ...s, coerce: !0 }),
  number: (s) => Tr.create({ ...s, coerce: !0 }),
  boolean: (s) => Fi.create({
    ...s,
    coerce: !0
  }),
  bigint: (s) => Rr.create({ ...s, coerce: !0 }),
  date: (s) => Zr.create({ ...s, coerce: !0 })
}, xI = pe;
var h = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  defaultErrorMap: Mi,
  setErrorMap: $A,
  getErrorMap: Go,
  makeIssue: Yo,
  EMPTY_PATH: LA,
  addIssueToContext: J,
  ParseStatus: _t,
  INVALID: pe,
  DIRTY: $p,
  OK: Pt,
  isAborted: Uc,
  isDirty: Dc,
  isValid: Bi,
  isAsync: Zo,
  get util() {
    return Pe;
  },
  get objectUtil() {
    return kc;
  },
  ZodParsedType: V,
  getParsedType: br,
  ZodType: we,
  ZodString: bs,
  ZodNumber: Tr,
  ZodBigInt: Rr,
  ZodBoolean: Fi,
  ZodDate: Zr,
  ZodSymbol: Jo,
  ZodUndefined: ji,
  ZodNull: qi,
  ZodAny: Fn,
  ZodUnknown: Hr,
  ZodNever: tr,
  ZodVoid: Xo,
  ZodArray: _s,
  ZodObject: Ye,
  ZodUnion: Wi,
  ZodDiscriminatedUnion: ga,
  ZodIntersection: Hi,
  ZodTuple: js,
  ZodRecord: zi,
  ZodMap: Qo,
  ZodSet: Jr,
  ZodFunction: kn,
  ZodLazy: Vi,
  ZodLiteral: Ki,
  ZodEnum: Pr,
  ZodNativeEnum: Gi,
  ZodPromise: jn,
  ZodEffects: Is,
  ZodTransformer: Is,
  ZodOptional: Qs,
  ZodNullable: Xr,
  ZodDefault: Yi,
  ZodCatch: ea,
  ZodNaN: ta,
  BRAND: YA,
  ZodBranded: Mp,
  ZodPipeline: ro,
  ZodReadonly: sa,
  custom: Bp,
  Schema: we,
  ZodSchema: we,
  late: ZA,
  get ZodFirstPartyTypeKind() {
    return ue;
  },
  coerce: OI,
  any: nI,
  array: cI,
  bigint: QA,
  boolean: qp,
  date: eI,
  discriminatedUnion: hI,
  effect: Eu,
  enum: vI,
  function: yI,
  instanceof: JA,
  intersection: pI,
  lazy: EI,
  literal: bI,
  map: mI,
  nan: XA,
  nativeEnum: CI,
  never: oI,
  null: rI,
  nullable: II,
  number: jp,
  object: lI,
  oboolean: PI,
  onumber: RI,
  optional: AI,
  ostring: TI,
  pipeline: NI,
  preprocess: SI,
  promise: _I,
  record: gI,
  set: wI,
  strictObject: dI,
  string: Fp,
  symbol: tI,
  transformer: Eu,
  tuple: fI,
  undefined: sI,
  union: uI,
  unknown: iI,
  void: aI,
  NEVER: xI,
  ZodIssueCode: D,
  quotelessJson: DA,
  ZodError: Cs
});
const Ze = h.object({ message: h.string() });
function G(s) {
  return h.literal(ee[s]);
}
h.object({
  accessList: h.array(h.string()),
  blockHash: h.string().nullable(),
  blockNumber: h.string().nullable(),
  chainId: h.string().or(h.number()),
  from: h.string(),
  gas: h.string(),
  hash: h.string(),
  input: h.string().nullable(),
  maxFeePerGas: h.string(),
  maxPriorityFeePerGas: h.string(),
  nonce: h.string(),
  r: h.string(),
  s: h.string(),
  to: h.string(),
  transactionIndex: h.string().nullable(),
  type: h.string(),
  v: h.string(),
  value: h.string()
});
const kI = h.object({ chainId: h.string().or(h.number()) }), UI = h.object({ email: h.string().email() }), DI = h.object({ otp: h.string() }), $I = h.object({
  uri: h.string(),
  preferredAccountType: h.optional(h.string()),
  chainId: h.optional(h.string().or(h.number()))
}), LI = h.object({
  chainId: h.optional(h.string().or(h.number())),
  preferredAccountType: h.optional(h.string()),
  socialUri: h.optional(h.string())
}), MI = h.object({
  provider: h.enum(["google", "github", "apple", "facebook", "x", "discord"])
}), BI = h.object({ email: h.string().email() }), FI = h.object({ otp: h.string() }), jI = h.object({ otp: h.string() }), qI = h.object({
  themeMode: h.optional(h.enum(["light", "dark"])),
  themeVariables: h.optional(h.record(h.string(), h.string().or(h.number()))),
  w3mThemeVariables: h.optional(h.record(h.string(), h.string()))
}), WI = h.object({
  metadata: h.object({
    name: h.string(),
    description: h.string(),
    url: h.string(),
    icons: h.array(h.string())
  }).optional(),
  sdkVersion: h.string().optional(),
  sdkType: h.string().optional(),
  projectId: h.string()
}), HI = h.object({ type: h.string() }), zI = h.object({
  action: h.enum(["VERIFY_DEVICE", "VERIFY_OTP", "CONNECT"])
}), VI = h.object({
  url: h.string()
}), KI = h.object({
  userName: h.string()
}), GI = h.object({
  email: h.string().optional().nullable(),
  address: h.string(),
  chainId: h.string().or(h.number()),
  accounts: h.array(h.object({
    address: h.string(),
    type: h.enum([
      it.ACCOUNT_TYPES.EOA,
      it.ACCOUNT_TYPES.SMART_ACCOUNT
    ])
  })).optional(),
  userName: h.string().optional().nullable(),
  preferredAccountType: h.optional(h.string())
}), YI = h.object({
  action: h.enum(["VERIFY_PRIMARY_OTP", "VERIFY_SECONDARY_OTP"])
}), ZI = h.object({
  email: h.string().email().optional().nullable(),
  address: h.string(),
  chainId: h.string().or(h.number()),
  smartAccountDeployed: h.optional(h.boolean()),
  accounts: h.array(h.object({
    address: h.string(),
    type: h.enum([
      it.ACCOUNT_TYPES.EOA,
      it.ACCOUNT_TYPES.SMART_ACCOUNT
    ])
  })).optional(),
  preferredAccountType: h.optional(h.string())
}), JI = h.object({ uri: h.string() }), XI = h.object({ isConnected: h.boolean() }), QI = h.object({ chainId: h.string().or(h.number()) }), eS = h.object({ chainId: h.string().or(h.number()) }), tS = h.object({ newEmail: h.string().email() }), sS = h.object({
  smartAccountEnabledNetworks: h.array(h.number())
});
h.object({
  address: h.string(),
  isDeployed: h.boolean()
});
const rS = h.object({
  version: h.string().optional()
}), nS = h.object({ type: h.string(), address: h.string() }), iS = h.any(), oS = h.object({
  method: h.literal("eth_accounts")
}), aS = h.object({
  method: h.literal("eth_blockNumber")
}), cS = h.object({
  method: h.literal("eth_call"),
  params: h.array(h.any())
}), lS = h.object({
  method: h.literal("eth_chainId")
}), dS = h.object({
  method: h.literal("eth_estimateGas"),
  params: h.array(h.any())
}), uS = h.object({
  method: h.literal("eth_feeHistory"),
  params: h.array(h.any())
}), hS = h.object({
  method: h.literal("eth_gasPrice")
}), pS = h.object({
  method: h.literal("eth_getAccount"),
  params: h.array(h.any())
}), fS = h.object({
  method: h.literal("eth_getBalance"),
  params: h.array(h.any())
}), gS = h.object({
  method: h.literal("eth_getBlockByHash"),
  params: h.array(h.any())
}), mS = h.object({
  method: h.literal("eth_getBlockByNumber"),
  params: h.array(h.any())
}), wS = h.object({
  method: h.literal("eth_getBlockReceipts"),
  params: h.array(h.any())
}), yS = h.object({
  method: h.literal("eth_getBlockTransactionCountByHash"),
  params: h.array(h.any())
}), ES = h.object({
  method: h.literal("eth_getBlockTransactionCountByNumber"),
  params: h.array(h.any())
}), bS = h.object({
  method: h.literal("eth_getCode"),
  params: h.array(h.any())
}), vS = h.object({
  method: h.literal("eth_getFilterChanges"),
  params: h.array(h.any())
}), CS = h.object({
  method: h.literal("eth_getFilterLogs"),
  params: h.array(h.any())
}), _S = h.object({
  method: h.literal("eth_getLogs"),
  params: h.array(h.any())
}), AS = h.object({
  method: h.literal("eth_getProof"),
  params: h.array(h.any())
}), IS = h.object({
  method: h.literal("eth_getStorageAt"),
  params: h.array(h.any())
}), SS = h.object({
  method: h.literal("eth_getTransactionByBlockHashAndIndex"),
  params: h.array(h.any())
}), NS = h.object({
  method: h.literal("eth_getTransactionByBlockNumberAndIndex"),
  params: h.array(h.any())
}), TS = h.object({
  method: h.literal("eth_getTransactionByHash"),
  params: h.array(h.any())
}), RS = h.object({
  method: h.literal("eth_getTransactionCount"),
  params: h.array(h.any())
}), PS = h.object({
  method: h.literal("eth_getTransactionReceipt"),
  params: h.array(h.any())
}), OS = h.object({
  method: h.literal("eth_getUncleCountByBlockHash"),
  params: h.array(h.any())
}), xS = h.object({
  method: h.literal("eth_getUncleCountByBlockNumber"),
  params: h.array(h.any())
}), kS = h.object({
  method: h.literal("eth_maxPriorityFeePerGas")
}), US = h.object({
  method: h.literal("eth_newBlockFilter")
}), DS = h.object({
  method: h.literal("eth_newFilter"),
  params: h.array(h.any())
}), $S = h.object({
  method: h.literal("eth_newPendingTransactionFilter")
}), LS = h.object({
  method: h.literal("eth_sendRawTransaction"),
  params: h.array(h.any())
}), MS = h.object({
  method: h.literal("eth_syncing"),
  params: h.array(h.any())
}), BS = h.object({
  method: h.literal("eth_uninstallFilter"),
  params: h.array(h.any())
}), bu = h.object({
  method: h.literal("personal_sign"),
  params: h.array(h.any())
}), FS = h.object({
  method: h.literal("eth_signTypedData_v4"),
  params: h.array(h.any())
}), jS = h.object({
  method: h.literal("eth_sendTransaction"),
  params: h.array(h.any())
}), qS = h.object({
  method: h.literal("solana_signMessage"),
  params: h.object({
    message: h.string(),
    pubkey: h.string()
  })
}), WS = h.object({
  method: h.literal("solana_signTransaction"),
  params: h.object({
    transaction: h.string()
  })
}), HS = h.object({
  method: h.literal("solana_signAllTransactions"),
  params: h.object({
    transactions: h.array(h.string())
  })
}), zS = h.object({
  method: h.literal("solana_signAndSendTransaction"),
  params: h.object({
    transaction: h.string(),
    options: h.object({
      skipPreflight: h.boolean().optional(),
      preflightCommitment: h.enum([
        "processed",
        "confirmed",
        "finalized",
        "recent",
        "single",
        "singleGossip",
        "root",
        "max"
      ]).optional(),
      maxRetries: h.number().optional(),
      minContextSlot: h.number().optional()
    }).optional()
  })
}), VS = h.object({
  method: h.literal("wallet_sendCalls"),
  params: h.array(h.object({
    chainId: h.string().or(h.number()).optional(),
    from: h.string().optional(),
    version: h.string().optional(),
    capabilities: h.any().optional(),
    calls: h.array(h.object({
      to: h.string().startsWith("0x"),
      data: h.string().startsWith("0x").optional(),
      value: h.string().optional()
    }))
  }))
}), KS = h.object({
  method: h.literal("wallet_getCallsStatus"),
  params: h.array(h.string())
}), GS = h.object({
  method: h.literal("wallet_getCapabilities"),
  params: h.array(h.string().or(h.number()).optional()).optional()
}), YS = h.object({
  method: h.literal("wallet_grantPermissions"),
  params: h.array(h.any())
}), ZS = h.object({
  method: h.literal("wallet_revokePermissions"),
  params: h.any()
}), JS = h.object({
  method: h.literal("wallet_getAssets"),
  params: h.any()
}), vu = h.object({
  token: h.string()
}), Y = h.object({
  id: h.string().optional()
}), di = {
  appEvent: Y.extend({
    type: G("APP_SWITCH_NETWORK"),
    payload: kI
  }).or(Y.extend({
    type: G("APP_CONNECT_EMAIL"),
    payload: UI
  })).or(Y.extend({ type: G("APP_CONNECT_DEVICE") })).or(Y.extend({ type: G("APP_CONNECT_OTP"), payload: DI })).or(Y.extend({
    type: G("APP_CONNECT_SOCIAL"),
    payload: $I
  })).or(Y.extend({ type: G("APP_GET_FARCASTER_URI") })).or(Y.extend({ type: G("APP_CONNECT_FARCASTER") })).or(Y.extend({
    type: G("APP_GET_USER"),
    payload: h.optional(LI)
  })).or(Y.extend({
    type: G("APP_GET_SOCIAL_REDIRECT_URI"),
    payload: MI
  })).or(Y.extend({ type: G("APP_SIGN_OUT") })).or(Y.extend({
    type: G("APP_IS_CONNECTED"),
    payload: h.optional(vu)
  })).or(Y.extend({ type: G("APP_GET_CHAIN_ID") })).or(Y.extend({ type: G("APP_GET_SMART_ACCOUNT_ENABLED_NETWORKS") })).or(Y.extend({ type: G("APP_INIT_SMART_ACCOUNT") })).or(Y.extend({
    type: G("APP_SET_PREFERRED_ACCOUNT"),
    payload: HI
  })).or(Y.extend({
    type: G("APP_RPC_REQUEST"),
    payload: bu.or(JS).or(oS).or(aS).or(cS).or(lS).or(dS).or(uS).or(hS).or(pS).or(fS).or(gS).or(mS).or(wS).or(yS).or(ES).or(bS).or(vS).or(CS).or(_S).or(AS).or(IS).or(SS).or(NS).or(TS).or(RS).or(PS).or(OS).or(xS).or(kS).or(US).or(DS).or($S).or(LS).or(MS).or(BS).or(bu).or(FS).or(jS).or(qS).or(WS).or(HS).or(zS).or(KS).or(VS).or(GS).or(YS).or(ZS).and(h.object({
      chainId: h.string().or(h.number()).optional(),
      chainNamespace: h.enum(["eip155", "solana", "polkadot", "bip122", "cosmos"]).optional()
    }))
  })).or(Y.extend({ type: G("APP_UPDATE_EMAIL"), payload: BI })).or(Y.extend({
    type: G("APP_UPDATE_EMAIL_PRIMARY_OTP"),
    payload: FI
  })).or(Y.extend({
    type: G("APP_UPDATE_EMAIL_SECONDARY_OTP"),
    payload: jI
  })).or(Y.extend({ type: G("APP_SYNC_THEME"), payload: qI })).or(Y.extend({
    type: G("APP_SYNC_DAPP_DATA"),
    payload: WI
  })).or(Y.extend({
    type: G("APP_RELOAD")
  })).or(Y.extend({
    type: G("APP_RPC_ABORT")
  })),
  frameEvent: Y.extend({ type: G("FRAME_SWITCH_NETWORK_ERROR"), payload: Ze }).or(Y.extend({
    type: G("FRAME_SWITCH_NETWORK_SUCCESS"),
    payload: eS
  })).or(Y.extend({
    type: G("FRAME_CONNECT_EMAIL_SUCCESS"),
    payload: zI
  })).or(Y.extend({ type: G("FRAME_CONNECT_EMAIL_ERROR"), payload: Ze })).or(Y.extend({
    type: G("FRAME_GET_FARCASTER_URI_SUCCESS"),
    payload: VI
  })).or(Y.extend({ type: G("FRAME_GET_FARCASTER_URI_ERROR"), payload: Ze })).or(Y.extend({
    type: G("FRAME_CONNECT_FARCASTER_SUCCESS"),
    payload: KI
  })).or(Y.extend({ type: G("FRAME_CONNECT_FARCASTER_ERROR"), payload: Ze })).or(Y.extend({ type: G("FRAME_CONNECT_OTP_ERROR"), payload: Ze })).or(Y.extend({ type: G("FRAME_CONNECT_OTP_SUCCESS") })).or(Y.extend({ type: G("FRAME_CONNECT_DEVICE_ERROR"), payload: Ze })).or(Y.extend({ type: G("FRAME_CONNECT_DEVICE_SUCCESS") })).or(Y.extend({
    type: G("FRAME_CONNECT_SOCIAL_SUCCESS"),
    payload: GI
  })).or(Y.extend({
    type: G("FRAME_CONNECT_SOCIAL_ERROR"),
    payload: Ze
  })).or(Y.extend({ type: G("FRAME_GET_USER_ERROR"), payload: Ze })).or(Y.extend({
    type: G("FRAME_GET_USER_SUCCESS"),
    payload: ZI
  })).or(Y.extend({
    type: G("FRAME_GET_SOCIAL_REDIRECT_URI_ERROR"),
    payload: Ze
  })).or(Y.extend({
    type: G("FRAME_GET_SOCIAL_REDIRECT_URI_SUCCESS"),
    payload: JI
  })).or(Y.extend({ type: G("FRAME_SIGN_OUT_ERROR"), payload: Ze })).or(Y.extend({ type: G("FRAME_SIGN_OUT_SUCCESS") })).or(Y.extend({ type: G("FRAME_IS_CONNECTED_ERROR"), payload: Ze })).or(Y.extend({
    type: G("FRAME_IS_CONNECTED_SUCCESS"),
    payload: XI
  })).or(Y.extend({ type: G("FRAME_GET_CHAIN_ID_ERROR"), payload: Ze })).or(Y.extend({
    type: G("FRAME_GET_CHAIN_ID_SUCCESS"),
    payload: QI
  })).or(Y.extend({ type: G("FRAME_RPC_REQUEST_ERROR"), payload: Ze })).or(Y.extend({ type: G("FRAME_RPC_REQUEST_SUCCESS"), payload: iS })).or(Y.extend({ type: G("FRAME_SESSION_UPDATE"), payload: vu })).or(Y.extend({ type: G("FRAME_UPDATE_EMAIL_ERROR"), payload: Ze })).or(Y.extend({
    type: G("FRAME_UPDATE_EMAIL_SUCCESS"),
    payload: YI
  })).or(Y.extend({
    type: G("FRAME_UPDATE_EMAIL_PRIMARY_OTP_ERROR"),
    payload: Ze
  })).or(Y.extend({ type: G("FRAME_UPDATE_EMAIL_PRIMARY_OTP_SUCCESS") })).or(Y.extend({
    type: G("FRAME_UPDATE_EMAIL_SECONDARY_OTP_ERROR"),
    payload: Ze
  })).or(Y.extend({
    type: G("FRAME_UPDATE_EMAIL_SECONDARY_OTP_SUCCESS"),
    payload: tS
  })).or(Y.extend({ type: G("FRAME_SYNC_THEME_ERROR"), payload: Ze })).or(Y.extend({ type: G("FRAME_SYNC_THEME_SUCCESS") })).or(Y.extend({ type: G("FRAME_SYNC_DAPP_DATA_ERROR"), payload: Ze })).or(Y.extend({ type: G("FRAME_SYNC_DAPP_DATA_SUCCESS") })).or(Y.extend({
    type: G("FRAME_GET_SMART_ACCOUNT_ENABLED_NETWORKS_SUCCESS"),
    payload: sS
  })).or(Y.extend({
    type: G("FRAME_GET_SMART_ACCOUNT_ENABLED_NETWORKS_ERROR"),
    payload: Ze
  })).or(Y.extend({ type: G("FRAME_INIT_SMART_ACCOUNT_ERROR"), payload: Ze })).or(Y.extend({
    type: G("FRAME_SET_PREFERRED_ACCOUNT_SUCCESS"),
    payload: nS
  })).or(Y.extend({
    type: G("FRAME_SET_PREFERRED_ACCOUNT_ERROR"),
    payload: Ze
  })).or(Y.extend({ type: G("FRAME_READY"), payload: rS })).or(Y.extend({
    type: G("FRAME_RELOAD_ERROR"),
    payload: Ze
  })).or(Y.extend({ type: G("FRAME_RELOAD_SUCCESS") }))
};
function Ga(s, e = {}) {
  var t;
  return typeof (e == null ? void 0 : e.type) == "string" && ((t = e == null ? void 0 : e.type) == null ? void 0 : t.includes(s));
}
class XS {
  constructor({ projectId: e, isAppClient: t = !1, chainId: r = "eip155:1", enableLogger: n = !0 }) {
    if (this.iframe = null, this.iframeIsReady = !1, this.rpcUrl = UA.BLOCKCHAIN_API_RPC_URL, this.initFrame = () => {
      const i = document.getElementById("w3m-iframe");
      this.iframe && !i && document.body.appendChild(this.iframe);
    }, this.events = {
      registerFrameEventHandler: (i, o, a) => {
        function c({ data: l }) {
          if (!Ga(ee.FRAME_EVENT_KEY, l))
            return;
          const d = di.frameEvent.parse(l);
          d.id === i && (o(d), window.removeEventListener("message", c));
        }
        Yt.isClient && (window.addEventListener("message", c), a.addEventListener("abort", () => {
          window.removeEventListener("message", c);
        }));
      },
      onFrameEvent: (i) => {
        Yt.isClient && window.addEventListener("message", ({ data: o }) => {
          if (!Ga(ee.FRAME_EVENT_KEY, o))
            return;
          const a = di.frameEvent.parse(o);
          i(a);
        });
      },
      onAppEvent: (i) => {
        Yt.isClient && window.addEventListener("message", ({ data: o }) => {
          if (!Ga(ee.APP_EVENT_KEY, o))
            return;
          const a = di.appEvent.parse(o);
          i(a);
        });
      },
      postAppEvent: (i) => {
        var o;
        if (Yt.isClient) {
          if (!((o = this.iframe) != null && o.contentWindow))
            throw new Error("W3mFrame: iframe is not set");
          di.appEvent.parse(i), this.iframe.contentWindow.postMessage(i, "*");
        }
      },
      postFrameEvent: (i) => {
        if (Yt.isClient) {
          if (!parent)
            throw new Error("W3mFrame: parent is not set");
          di.frameEvent.parse(i), parent.postMessage(i, "*");
        }
      }
    }, this.projectId = e, this.frameLoadPromise = new Promise((i, o) => {
      this.frameLoadPromiseResolver = { resolve: i, reject: o };
    }), t && (this.frameLoadPromise = new Promise((i, o) => {
      this.frameLoadPromiseResolver = { resolve: i, reject: o };
    }), Yt.isClient)) {
      const i = document.createElement("iframe");
      i.id = "w3m-iframe", i.src = `${Kf}?projectId=${e}&chainId=${r}&version=${Yf}&enableLogger=${n}`, i.name = "w3m-secure-iframe", i.style.position = "fixed", i.style.zIndex = "999999", i.style.display = "none", i.style.border = "none", i.style.animationDelay = "0s, 50ms", i.style.borderBottomLeftRadius = "clamp(0px, var(--wui-border-radius-l), 44px)", i.style.borderBottomRightRadius = "clamp(0px, var(--wui-border-radius-l), 44px)", this.iframe = i, this.iframe.onerror = () => {
        var o;
        (o = this.frameLoadPromiseResolver) == null || o.reject("Unable to load email login dependency");
      }, this.events.onFrameEvent((o) => {
        var a;
        o.type === "@w3m-frame/READY" && (this.iframeIsReady = !0, (a = this.frameLoadPromiseResolver) == null || a.resolve(void 0));
      });
    }
  }
  get networks() {
    const e = [
      "eip155:1",
      "eip155:5",
      "eip155:11155111",
      "eip155:10",
      "eip155:420",
      "eip155:42161",
      "eip155:421613",
      "eip155:137",
      "eip155:80001",
      "eip155:42220",
      "eip155:1313161554",
      "eip155:1313161555",
      "eip155:56",
      "eip155:97",
      "eip155:43114",
      "eip155:43113",
      "eip155:324",
      "eip155:280",
      "eip155:100",
      "eip155:8453",
      "eip155:84531",
      "eip155:84532",
      "eip155:7777777",
      "eip155:999",
      "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",
      "solana:4uhcVJyU9pJkvQyS88uRDiswHXSCkY3z",
      "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1"
    ].map((t) => ({
      [t]: {
        rpcUrl: `${this.rpcUrl}/v1/?chainId=${t}&projectId=${this.projectId}`,
        chainId: t
      }
    }));
    return Object.assign({}, ...e);
  }
}
class QS {
  constructor(e) {
    var i;
    const t = Hn({
      level: Gf
    }), { logger: r, chunkLoggerController: n } = Bc({
      opts: t
    });
    this.logger = At(r, this.constructor.name), this.chunkLoggerController = n, typeof window < "u" && ((i = this.chunkLoggerController) != null && i.downloadLogsBlobInBrowser) && (window.downloadAppKitLogsBlob || (window.downloadAppKitLogsBlob = {}), window.downloadAppKitLogsBlob.sdk = () => {
      var o;
      (o = this.chunkLoggerController) != null && o.downloadLogsBlobInBrowser && this.chunkLoggerController.downloadLogsBlobInBrowser({
        projectId: e
      });
    });
  }
}
class eN {
  constructor({ projectId: e, chainId: t, enableLogger: r = !0, onTimeout: n, abortController: i, getActiveCaipNetwork: o }) {
    this.openRpcRequests = [], this.isInitialized = !1, r && (this.w3mLogger = new QS(e)), this.abortController = i, this.getActiveCaipNetwork = o, this.w3mFrame = new XS({ projectId: e, isAppClient: !0, chainId: t, enableLogger: r }), this.onTimeout = n, this.getLoginEmailUsed() && this.createFrame();
  }
  async createFrame() {
    this.w3mFrame.initFrame(), this.initPromise = new Promise((e) => {
      this.w3mFrame.events.onFrameEvent((t) => {
        t.type === ee.FRAME_READY && setTimeout(() => {
          e();
        }, 500);
      });
    }), await this.initPromise, this.isInitialized = !0, this.initPromise = void 0;
  }
  async init() {
    if (!this.isInitialized) {
      if (this.initPromise) {
        await this.initPromise;
        return;
      }
      await this.createFrame();
    }
  }
  getLoginEmailUsed() {
    return !!pt.get(ee.EMAIL_LOGIN_USED_KEY);
  }
  getEmail() {
    return pt.get(ee.EMAIL);
  }
  getUsername() {
    return pt.get(ee.SOCIAL_USERNAME);
  }
  async reload() {
    var e;
    try {
      await this.appEvent({
        type: ee.APP_RELOAD
      });
    } catch (t) {
      throw (e = this.w3mLogger) == null || e.logger.error({ error: t }, "Error reloading iframe"), t;
    }
  }
  async connectEmail(e) {
    var t;
    try {
      Yt.checkIfAllowedToTriggerEmail(), await this.init();
      const r = await this.appEvent({
        type: ee.APP_CONNECT_EMAIL,
        payload: e
      });
      return this.setNewLastEmailLoginTime(), r;
    } catch (r) {
      throw (t = this.w3mLogger) == null || t.logger.error({ error: r }, "Error connecting email"), r;
    }
  }
  async connectDevice() {
    var e;
    try {
      return this.appEvent({
        type: ee.APP_CONNECT_DEVICE
      });
    } catch (t) {
      throw (e = this.w3mLogger) == null || e.logger.error({ error: t }, "Error connecting device"), t;
    }
  }
  async connectOtp(e) {
    var t;
    try {
      return this.appEvent({
        type: ee.APP_CONNECT_OTP,
        payload: e
      });
    } catch (r) {
      throw (t = this.w3mLogger) == null || t.logger.error({ error: r }, "Error connecting otp"), r;
    }
  }
  async isConnected() {
    var e;
    try {
      if (!this.getLoginEmailUsed())
        return { isConnected: !1 };
      const t = await this.appEvent({
        type: ee.APP_IS_CONNECTED
      });
      return t != null && t.isConnected || this.deleteAuthLoginCache(), t;
    } catch (t) {
      throw this.deleteAuthLoginCache(), (e = this.w3mLogger) == null || e.logger.error({ error: t }, "Error checking connection"), t;
    }
  }
  async getChainId() {
    var e;
    try {
      const t = await this.appEvent({
        type: ee.APP_GET_CHAIN_ID
      });
      return this.setLastUsedChainId(t.chainId), t;
    } catch (t) {
      throw (e = this.w3mLogger) == null || e.logger.error({ error: t }, "Error getting chain id"), t;
    }
  }
  async getSocialRedirectUri(e) {
    var t;
    try {
      return await this.init(), this.appEvent({
        type: ee.APP_GET_SOCIAL_REDIRECT_URI,
        payload: e
      });
    } catch (r) {
      throw (t = this.w3mLogger) == null || t.logger.error({ error: r }, "Error getting social redirect uri"), r;
    }
  }
  async updateEmail(e) {
    var t;
    try {
      const r = await this.appEvent({
        type: ee.APP_UPDATE_EMAIL,
        payload: e
      });
      return this.setNewLastEmailLoginTime(), r;
    } catch (r) {
      throw (t = this.w3mLogger) == null || t.logger.error({ error: r }, "Error updating email"), r;
    }
  }
  async updateEmailPrimaryOtp(e) {
    var t;
    try {
      return this.appEvent({
        type: ee.APP_UPDATE_EMAIL_PRIMARY_OTP,
        payload: e
      });
    } catch (r) {
      throw (t = this.w3mLogger) == null || t.logger.error({ error: r }, "Error updating email primary otp"), r;
    }
  }
  async updateEmailSecondaryOtp(e) {
    var t;
    try {
      const r = await this.appEvent({
        type: ee.APP_UPDATE_EMAIL_SECONDARY_OTP,
        payload: e
      });
      return this.setLoginSuccess(r.newEmail), r;
    } catch (r) {
      throw (t = this.w3mLogger) == null || t.logger.error({ error: r }, "Error updating email secondary otp"), r;
    }
  }
  async syncTheme(e) {
    var t;
    try {
      return this.appEvent({
        type: ee.APP_SYNC_THEME,
        payload: e
      });
    } catch (r) {
      throw (t = this.w3mLogger) == null || t.logger.error({ error: r }, "Error syncing theme"), r;
    }
  }
  async syncDappData(e) {
    var t;
    try {
      return this.appEvent({
        type: ee.APP_SYNC_DAPP_DATA,
        payload: e
      });
    } catch (r) {
      throw (t = this.w3mLogger) == null || t.logger.error({ error: r }, "Error syncing dapp data"), r;
    }
  }
  async getSmartAccountEnabledNetworks() {
    var e;
    try {
      const t = await this.appEvent({
        type: ee.APP_GET_SMART_ACCOUNT_ENABLED_NETWORKS
      });
      return this.persistSmartAccountEnabledNetworks(t.smartAccountEnabledNetworks), t;
    } catch (t) {
      throw this.persistSmartAccountEnabledNetworks([]), (e = this.w3mLogger) == null || e.logger.error({ error: t }, "Error getting smart account enabled networks"), t;
    }
  }
  async setPreferredAccount(e) {
    var t;
    try {
      return this.appEvent({
        type: ee.APP_SET_PREFERRED_ACCOUNT,
        payload: { type: e }
      });
    } catch (r) {
      throw (t = this.w3mLogger) == null || t.logger.error({ error: r }, "Error setting preferred account"), r;
    }
  }
  async connect(e) {
    var t, r;
    if (e != null && e.socialUri)
      try {
        await this.init();
        const n = await this.appEvent({
          type: ee.APP_CONNECT_SOCIAL,
          payload: {
            uri: e.socialUri,
            preferredAccountType: e.preferredAccountType,
            chainId: e.chainId
          }
        });
        return n.userName && this.setSocialLoginSuccess(n.userName), this.setLoginSuccess(n.email), this.setLastUsedChainId(n.chainId), this.user = n, n;
      } catch (n) {
        throw (t = this.w3mLogger) == null || t.logger.error({ error: n }, "Error connecting social"), n;
      }
    else
      try {
        const n = (e == null ? void 0 : e.chainId) || this.getLastUsedChainId() || 1, i = await this.getUser({
          chainId: n,
          preferredAccountType: e == null ? void 0 : e.preferredAccountType
        });
        return this.setLoginSuccess(i.email), this.setLastUsedChainId(i.chainId), this.user = i, i;
      } catch (n) {
        throw (r = this.w3mLogger) == null || r.logger.error({ error: n }, "Error connecting"), n;
      }
  }
  async getUser(e) {
    var t;
    try {
      await this.init();
      const r = (e == null ? void 0 : e.chainId) || this.getLastUsedChainId() || 1, n = await this.appEvent({
        type: ee.APP_GET_USER,
        payload: { ...e, chainId: r }
      });
      return this.user = n, n;
    } catch (r) {
      throw (t = this.w3mLogger) == null || t.logger.error({ error: r }, "Error connecting"), r;
    }
  }
  async connectSocial(e) {
    var t;
    try {
      await this.init();
      const r = await this.appEvent({
        type: ee.APP_CONNECT_SOCIAL,
        payload: { uri: e }
      });
      return r.userName && this.setSocialLoginSuccess(r.userName), r;
    } catch (r) {
      throw (t = this.w3mLogger) == null || t.logger.error({ error: r }, "Error connecting social"), r;
    }
  }
  async getFarcasterUri() {
    var e;
    try {
      return await this.init(), await this.appEvent({
        type: ee.APP_GET_FARCASTER_URI
      });
    } catch (t) {
      throw (e = this.w3mLogger) == null || e.logger.error({ error: t }, "Error getting farcaster uri"), t;
    }
  }
  async connectFarcaster() {
    var e;
    try {
      const t = await this.appEvent({
        type: ee.APP_CONNECT_FARCASTER
      });
      return t.userName && this.setSocialLoginSuccess(t.userName), t;
    } catch (t) {
      throw (e = this.w3mLogger) == null || e.logger.error({ error: t }, "Error connecting farcaster"), t;
    }
  }
  async switchNetwork(e) {
    var t;
    try {
      const r = await this.appEvent({
        type: ee.APP_SWITCH_NETWORK,
        payload: { chainId: e }
      });
      return this.setLastUsedChainId(r.chainId), r;
    } catch (r) {
      throw (t = this.w3mLogger) == null || t.logger.error({ error: r }, "Error switching network"), r;
    }
  }
  async disconnect() {
    var e;
    try {
      return this.deleteAuthLoginCache(), await new Promise(async (r) => {
        const n = setTimeout(() => {
          r();
        }, 3e3);
        await this.appEvent({
          type: ee.APP_SIGN_OUT
        }), clearTimeout(n), r();
      });
    } catch (t) {
      throw (e = this.w3mLogger) == null || e.logger.error({ error: t }, "Error disconnecting"), t;
    }
  }
  async request(e) {
    var r, n, i, o, a;
    const t = e;
    try {
      if (it.GET_CHAIN_ID === e.method)
        return this.getLastUsedChainId();
      const c = e.chainNamespace || "eip155", l = (r = this.getActiveCaipNetwork(c)) == null ? void 0 : r.id;
      t.chainNamespace = c, t.chainId = l, (n = this.rpcRequestHandler) == null || n.call(this, e);
      const d = await this.appEvent({
        type: ee.APP_RPC_REQUEST,
        payload: t
      });
      return (i = this.rpcSuccessHandler) == null || i.call(this, d, t), d;
    } catch (c) {
      throw (o = this.rpcErrorHandler) == null || o.call(this, c, t), (a = this.w3mLogger) == null || a.logger.error({ error: c }, "Error requesting"), c;
    }
  }
  onRpcRequest(e) {
    this.rpcRequestHandler = e;
  }
  onRpcSuccess(e) {
    this.rpcSuccessHandler = e;
  }
  onRpcError(e) {
    this.rpcErrorHandler = e;
  }
  onIsConnected(e) {
    this.w3mFrame.events.onFrameEvent((t) => {
      t.type === ee.FRAME_IS_CONNECTED_SUCCESS && t.payload.isConnected && e();
    });
  }
  onNotConnected(e) {
    this.w3mFrame.events.onFrameEvent((t) => {
      t.type === ee.FRAME_IS_CONNECTED_ERROR && e(), t.type === ee.FRAME_IS_CONNECTED_SUCCESS && !t.payload.isConnected && e();
    });
  }
  onConnect(e) {
    this.w3mFrame.events.onFrameEvent((t) => {
      t.type === ee.FRAME_GET_USER_SUCCESS && e(t.payload);
    });
  }
  onSocialConnected(e) {
    this.w3mFrame.events.onFrameEvent((t) => {
      t.type === ee.FRAME_CONNECT_SOCIAL_SUCCESS && e(t.payload);
    });
  }
  async getCapabilities() {
    try {
      return await this.request({
        method: "wallet_getCapabilities"
      }) || {};
    } catch {
      return {};
    }
  }
  onSetPreferredAccount(e) {
    this.w3mFrame.events.onFrameEvent((t) => {
      t.type === ee.FRAME_SET_PREFERRED_ACCOUNT_SUCCESS ? e(t.payload) : t.type === ee.FRAME_SET_PREFERRED_ACCOUNT_ERROR && e({ type: it.ACCOUNT_TYPES.EOA });
    });
  }
  getAvailableChainIds() {
    return Object.keys(this.w3mFrame.networks);
  }
  async rejectRpcRequests() {
    var e;
    try {
      await Promise.all(this.openRpcRequests.map(async ({ abortController: t, method: r }) => {
        it.SAFE_RPC_METHODS.includes(r) || t.abort(), await this.appEvent({
          type: ee.APP_RPC_ABORT
        });
      })), this.openRpcRequests = [];
    } catch (t) {
      (e = this.w3mLogger) == null || e.logger.error({ error: t }, "Error aborting RPC request");
    }
  }
  async appEvent(e) {
    let t, r;
    function n(c) {
      return c.replace("@w3m-app/", "");
    }
    const i = [
      ee.APP_SYNC_DAPP_DATA,
      ee.APP_SYNC_THEME,
      ee.APP_SET_PREFERRED_ACCOUNT
    ], o = n(e.type);
    return !this.w3mFrame.iframeIsReady && !i.includes(e.type) && (r = setTimeout(() => {
      var c;
      (c = this.onTimeout) == null || c.call(this, "iframe_load_failed"), this.abortController.abort();
    }, 2e4)), await this.w3mFrame.frameLoadPromise, clearTimeout(r), [
      ee.APP_CONNECT_EMAIL,
      ee.APP_CONNECT_DEVICE,
      ee.APP_CONNECT_OTP,
      ee.APP_CONNECT_SOCIAL,
      ee.APP_GET_SOCIAL_REDIRECT_URI
    ].map(n).includes(o) && (t = setTimeout(() => {
      var c;
      (c = this.onTimeout) == null || c.call(this, "iframe_request_timeout"), this.abortController.abort();
    }, 12e4)), new Promise((c, l) => {
      var g, w, m;
      const d = Math.random().toString(36).substring(7);
      (m = (g = this.w3mLogger) == null ? void 0 : (w = g.logger).info) == null || m.call(w, { event: e, id: d }, "Sending app event"), this.w3mFrame.events.postAppEvent({ ...e, id: d });
      const u = new AbortController();
      if (o === "RPC_REQUEST") {
        const y = e;
        this.openRpcRequests = [...this.openRpcRequests, { ...y.payload, abortController: u }];
      }
      u.signal.addEventListener("abort", () => {
        o === "RPC_REQUEST" ? l(new Error("Request was aborted")) : o !== "GET_FARCASTER_URI" && l(new Error("Something went wrong"));
      });
      function p(y, C) {
        var _, U, j;
        y.id === d && ((U = C == null ? void 0 : (_ = C.logger).info) == null || U.call(_, { framEvent: y, id: d }, "Received frame response"), y.type === `@w3m-frame/${o}_SUCCESS` ? (t && clearTimeout(t), r && clearTimeout(r), "payload" in y && c(y.payload), c(void 0)) : y.type === `@w3m-frame/${o}_ERROR` && (t && clearTimeout(t), r && clearTimeout(r), "payload" in y && l(new Error(((j = y.payload) == null ? void 0 : j.message) || "An error occurred")), l(new Error("An error occurred"))));
      }
      this.w3mFrame.events.registerFrameEventHandler(d, (y) => p(y, this.w3mLogger), this.abortController.signal);
    });
  }
  setNewLastEmailLoginTime() {
    pt.set(ee.LAST_EMAIL_LOGIN_TIME, Date.now().toString());
  }
  setSocialLoginSuccess(e) {
    pt.set(ee.SOCIAL_USERNAME, e);
  }
  setLoginSuccess(e) {
    e && pt.set(ee.EMAIL, e), pt.set(ee.EMAIL_LOGIN_USED_KEY, "true"), pt.delete(ee.LAST_EMAIL_LOGIN_TIME);
  }
  deleteAuthLoginCache() {
    pt.delete(ee.EMAIL_LOGIN_USED_KEY), pt.delete(ee.EMAIL), pt.delete(ee.LAST_USED_CHAIN_KEY), pt.delete(ee.SOCIAL_USERNAME);
  }
  setLastUsedChainId(e) {
    e && pt.set(ee.LAST_USED_CHAIN_KEY, String(e));
  }
  getLastUsedChainId() {
    const e = pt.get(ee.LAST_USED_CHAIN_KEY) ?? void 0, t = Number(e);
    return isNaN(t) ? e : t;
  }
  persistSmartAccountEnabledNetworks(e) {
    pt.set(ee.SMART_ACCOUNT_ENABLED_NETWORKS, e.join(","));
  }
}
class Ri {
  // eslint-disable-next-line @typescript-eslint/no-empty-function -- This is a singleton
  constructor() {
  }
  static getInstance({ projectId: e, chainId: t, enableLogger: r, onTimeout: n, abortController: i, getActiveCaipNetwork: o }) {
    return Ri.instance || (Ri.instance = new eN({
      projectId: e,
      chainId: t,
      enableLogger: r,
      onTimeout: n,
      abortController: i,
      getActiveCaipNetwork: o
    })), Ri.instance;
  }
}
const tN = {
  ACCOUNT_TABS: [{ label: "Tokens" }, { label: "NFTs" }, { label: "Activity" }],
  SECURE_SITE_ORIGIN: (typeof process < "u" && typeof process.env < "u" ? process.env.NEXT_PUBLIC_SECURE_SITE_ORIGIN : void 0) || "https://secure.walletconnect.org",
  VIEW_DIRECTION: {
    Next: "next",
    Prev: "prev"
  },
  DEFAULT_CONNECT_METHOD_ORDER: ["email", "social", "wallet"],
  ANIMATION_DURATIONS: {
    HeaderText: 120,
    ModalHeight: 150,
    ViewTransition: 150
  }
}, Lc = {
  filterOutDuplicatesByRDNS(s) {
    const e = S.state.enableEIP6963 ? F.state.connectors : [], t = $.getRecentWallets(), r = e.map((a) => {
      var c;
      return (c = a.info) == null ? void 0 : c.rdns;
    }).filter(Boolean), n = t.map((a) => a.rdns).filter(Boolean), i = r.concat(n);
    if (i.includes("io.metamask.mobile") && te.isMobile()) {
      const a = i.indexOf("io.metamask.mobile");
      i[a] = "io.metamask";
    }
    return s.filter((a) => !(a != null && a.rdns && i.includes(String(a.rdns)) || !(a != null && a.rdns) && e.some((l) => l.name === a.name)));
  },
  filterOutDuplicatesByIds(s) {
    const e = F.state.connectors.filter((a) => a.type === "ANNOUNCED" || a.type === "INJECTED"), t = $.getRecentWallets(), r = e.map((a) => a.explorerId), n = t.map((a) => a.id), i = r.concat(n);
    return s.filter((a) => !i.includes(a == null ? void 0 : a.id));
  },
  filterOutDuplicateWallets(s) {
    const e = this.filterOutDuplicatesByRDNS(s);
    return this.filterOutDuplicatesByIds(e);
  },
  markWalletsAsInstalled(s) {
    const { connectors: e } = F.state, { featuredWalletIds: t } = S.state, r = e.filter((o) => o.type === "ANNOUNCED").reduce((o, a) => {
      var c;
      return (c = a.info) != null && c.rdns && (o[a.info.rdns] = !0), o;
    }, {});
    return s.map((o) => ({
      ...o,
      installed: !!o.rdns && !!r[o.rdns ?? ""]
    })).sort((o, a) => {
      const c = Number(a.installed) - Number(o.installed);
      if (c !== 0)
        return c;
      if (t != null && t.length) {
        const l = t.indexOf(o.id), d = t.indexOf(a.id);
        if (l !== -1 && d !== -1)
          return l - d;
        if (l !== -1)
          return -1;
        if (d !== -1)
          return 1;
      }
      return 0;
    });
  },
  getConnectOrderMethod(s, e) {
    var c;
    const t = (s == null ? void 0 : s.connectMethodsOrder) || ((c = S.state.features) == null ? void 0 : c.connectMethodsOrder), r = e || F.state.connectors;
    if (t)
      return t;
    const { injected: n, announced: i } = Oo.getConnectorsByType(r, ne.state.recommended, ne.state.featured), o = n.filter(Oo.showConnector), a = i.filter(Oo.showConnector);
    return o.length || a.length ? ["wallet", "email", "social"] : tN.DEFAULT_CONNECT_METHOD_ORDER;
  },
  isExcluded(s) {
    const e = !!s.rdns && ne.state.excludedWallets.some((r) => r.rdns === s.rdns), t = !!s.name && ne.state.excludedWallets.some((r) => Nt.isLowerCaseMatch(r.name, s.name));
    return e || t;
  }
}, Oo = {
  getConnectorsByType(s, e, t) {
    const { customWallets: r } = S.state, n = $.getRecentWallets(), i = Lc.filterOutDuplicateWallets(e), o = Lc.filterOutDuplicateWallets(t), a = s.filter((u) => u.type === "MULTI_CHAIN"), c = s.filter((u) => u.type === "ANNOUNCED"), l = s.filter((u) => u.type === "INJECTED"), d = s.filter((u) => u.type === "EXTERNAL");
    return {
      custom: r,
      recent: n,
      external: d,
      multiChain: a,
      announced: c,
      injected: l,
      recommended: i,
      featured: o
    };
  },
  showConnector(s) {
    var n;
    const e = (n = s.info) == null ? void 0 : n.rdns, t = !!e && ne.state.excludedWallets.some((i) => !!i.rdns && i.rdns === e), r = !!s.name && ne.state.excludedWallets.some((i) => Nt.isLowerCaseMatch(i.name, s.name));
    return !(s.type === "INJECTED" && (s.name === "Browser Wallet" && (!te.isMobile() || te.isMobile() && !e && !q.checkInstalled()) || t || r) || (s.type === "ANNOUNCED" || s.type === "EXTERNAL") && (t || r));
  },
  getIsConnectedWithWC() {
    return Array.from(f.state.chains.values()).some((t) => F.getConnectorId(t.namespace) === N.CONNECTOR_ID.WALLET_CONNECT);
  },
  getConnectorTypeOrder({ recommended: s, featured: e, custom: t, recent: r, announced: n, injected: i, multiChain: o, external: a, overriddenConnectors: c = ((l) => (l = S.state.features) == null ? void 0 : l.connectorTypeOrder)() ?? [] }) {
    const p = [
      { type: "walletConnect", isEnabled: S.state.enableWalletConnect },
      { type: "recent", isEnabled: r.length > 0 },
      { type: "injected", isEnabled: [...i, ...n, ...o].length > 0 },
      { type: "featured", isEnabled: e.length > 0 },
      { type: "custom", isEnabled: t && t.length > 0 },
      { type: "external", isEnabled: a.length > 0 },
      { type: "recommended", isEnabled: s.length > 0 }
    ].filter((y) => y.isEnabled), g = new Set(p.map((y) => y.type)), w = c.filter((y) => g.has(y)).map((y) => ({ type: y, isEnabled: !0 })), m = p.filter(({ type: y }) => !w.some(({ type: _ }) => _ === y));
    return Array.from(new Set([...w, ...m].map(({ type: y }) => y)));
  },
  getAuthName({ email: s, socialUsername: e, socialProvider: t }) {
    return e ? t && t === "discord" && e.endsWith("0") ? e.slice(0, -1) : e : s.length > 30 ? `${s.slice(0, -3)}...` : s;
  },
  async fetchProviderData(s) {
    var e, t;
    try {
      if (s.name === "Browser Wallet" && !te.isMobile())
        return { accounts: [], chainId: void 0 };
      if (s.id === N.CONNECTOR_ID.AUTH)
        return { accounts: [], chainId: void 0 };
      const [r, n] = await Promise.all([
        (e = s.provider) == null ? void 0 : e.request({ method: "eth_accounts" }),
        (t = s.provider) == null ? void 0 : t.request({ method: "eth_chainId" }).then((i) => Number(i))
      ]);
      return { accounts: r, chainId: n };
    } catch (r) {
      return console.warn(`Failed to fetch provider data for ${s.name}`, r), { accounts: [], chainId: void 0 };
    }
  }
};
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const xo = globalThis, ml = xo.ShadowRoot && (xo.ShadyCSS === void 0 || xo.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, wl = Symbol(), Cu = /* @__PURE__ */ new WeakMap();
let Wp = class {
  constructor(e, t, r) {
    if (this._$cssResult$ = !0, r !== wl) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (ml && e === void 0) {
      const r = t !== void 0 && t.length === 1;
      r && (e = Cu.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), r && Cu.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const ns = (s) => new Wp(typeof s == "string" ? s : s + "", void 0, wl), Un = (s, ...e) => {
  const t = s.length === 1 ? s[0] : e.reduce((r, n, i) => r + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + s[i + 1], s[0]);
  return new Wp(t, s, wl);
}, sN = (s, e) => {
  if (ml) s.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const r = document.createElement("style"), n = xo.litNonce;
    n !== void 0 && r.setAttribute("nonce", n), r.textContent = t.cssText, s.appendChild(r);
  }
}, _u = ml ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const r of e.cssRules) t += r.cssText;
  return ns(t);
})(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: rN, defineProperty: nN, getOwnPropertyDescriptor: iN, getOwnPropertyNames: oN, getOwnPropertySymbols: aN, getPrototypeOf: cN } = Object, Ar = globalThis, Au = Ar.trustedTypes, lN = Au ? Au.emptyScript : "", Ya = Ar.reactiveElementPolyfillSupport, Pi = (s, e) => s, Mc = { toAttribute(s, e) {
  switch (e) {
    case Boolean:
      s = s ? lN : null;
      break;
    case Object:
    case Array:
      s = s == null ? s : JSON.stringify(s);
  }
  return s;
}, fromAttribute(s, e) {
  let t = s;
  switch (e) {
    case Boolean:
      t = s !== null;
      break;
    case Number:
      t = s === null ? null : Number(s);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(s);
      } catch {
        t = null;
      }
  }
  return t;
} }, Hp = (s, e) => !rN(s, e), Iu = { attribute: !0, type: String, converter: Mc, reflect: !1, useDefault: !1, hasChanged: Hp };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), Ar.litPropertyMetadata ?? (Ar.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
class Sn extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = Iu) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const r = Symbol(), n = this.getPropertyDescriptor(e, r, t);
      n !== void 0 && nN(this.prototype, e, n);
    }
  }
  static getPropertyDescriptor(e, t, r) {
    const { get: n, set: i } = iN(this.prototype, e) ?? { get() {
      return this[t];
    }, set(o) {
      this[t] = o;
    } };
    return { get: n, set(o) {
      const a = n == null ? void 0 : n.call(this);
      i == null || i.call(this, o), this.requestUpdate(e, a, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Iu;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Pi("elementProperties"))) return;
    const e = cN(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Pi("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Pi("properties"))) {
      const t = this.properties, r = [...oN(t), ...aN(t)];
      for (const n of r) this.createProperty(n, t[n]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [r, n] of t) this.elementProperties.set(r, n);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, r] of this.elementProperties) {
      const n = this._$Eu(t, r);
      n !== void 0 && this._$Eh.set(n, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const r = new Set(e.flat(1 / 0).reverse());
      for (const n of r) t.unshift(_u(n));
    } else e !== void 0 && t.push(_u(e));
    return t;
  }
  static _$Eu(e, t) {
    const r = t.attribute;
    return r === !1 ? void 0 : typeof r == "string" ? r : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var e;
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (e = this.constructor.l) == null || e.forEach((t) => t(this));
  }
  addController(e) {
    var t;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(e), this.renderRoot !== void 0 && this.isConnected && ((t = e.hostConnected) == null || t.call(e));
  }
  removeController(e) {
    var t;
    (t = this._$EO) == null || t.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
    for (const r of t.keys()) this.hasOwnProperty(r) && (e.set(r, this[r]), delete this[r]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return sN(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach((t) => {
      var r;
      return (r = t.hostConnected) == null ? void 0 : r.call(t);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach((t) => {
      var r;
      return (r = t.hostDisconnected) == null ? void 0 : r.call(t);
    });
  }
  attributeChangedCallback(e, t, r) {
    this._$AK(e, r);
  }
  _$ET(e, t) {
    var i;
    const r = this.constructor.elementProperties.get(e), n = this.constructor._$Eu(e, r);
    if (n !== void 0 && r.reflect === !0) {
      const o = (((i = r.converter) == null ? void 0 : i.toAttribute) !== void 0 ? r.converter : Mc).toAttribute(t, r.type);
      this._$Em = e, o == null ? this.removeAttribute(n) : this.setAttribute(n, o), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var i, o;
    const r = this.constructor, n = r._$Eh.get(e);
    if (n !== void 0 && this._$Em !== n) {
      const a = r.getPropertyOptions(n), c = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((i = a.converter) == null ? void 0 : i.fromAttribute) !== void 0 ? a.converter : Mc;
      this._$Em = n, this[n] = c.fromAttribute(t, a.type) ?? ((o = this._$Ej) == null ? void 0 : o.get(n)) ?? null, this._$Em = null;
    }
  }
  requestUpdate(e, t, r) {
    var n;
    if (e !== void 0) {
      const i = this.constructor, o = this[e];
      if (r ?? (r = i.getPropertyOptions(e)), !((r.hasChanged ?? Hp)(o, t) || r.useDefault && r.reflect && o === ((n = this._$Ej) == null ? void 0 : n.get(e)) && !this.hasAttribute(i._$Eu(e, r)))) return;
      this.C(e, t, r);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: r, reflect: n, wrapped: i }, o) {
    r && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, o ?? t ?? this[e]), i !== !0 || o !== void 0) || (this._$AL.has(e) || (this.hasUpdated || r || (t = void 0), this._$AL.set(e, t)), n === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (t) {
      Promise.reject(t);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var r;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [i, o] of this._$Ep) this[i] = o;
        this._$Ep = void 0;
      }
      const n = this.constructor.elementProperties;
      if (n.size > 0) for (const [i, o] of n) {
        const { wrapped: a } = o, c = this[i];
        a !== !0 || this._$AL.has(i) || c === void 0 || this.C(i, void 0, o, c);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), (r = this._$EO) == null || r.forEach((n) => {
        var i;
        return (i = n.hostUpdate) == null ? void 0 : i.call(n);
      }), this.update(t)) : this._$EM();
    } catch (n) {
      throw e = !1, this._$EM(), n;
    }
    e && this._$AE(t);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var t;
    (t = this._$EO) == null || t.forEach((r) => {
      var n;
      return (n = r.hostUpdated) == null ? void 0 : n.call(r);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
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
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((t) => this._$ET(t, this[t]))), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
}
Sn.elementStyles = [], Sn.shadowRootOptions = { mode: "open" }, Sn[Pi("elementProperties")] = /* @__PURE__ */ new Map(), Sn[Pi("finalized")] = /* @__PURE__ */ new Map(), Ya == null || Ya({ ReactiveElement: Sn }), (Ar.reactiveElementVersions ?? (Ar.reactiveElementVersions = [])).push("2.1.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const zr = globalThis;
class ko extends Sn {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t;
    const e = super.createRenderRoot();
    return (t = this.renderOptions).renderBefore ?? (t.renderBefore = e.firstChild), e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = df(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var e;
    super.connectedCallback(), (e = this._$Do) == null || e.setConnected(!0);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this._$Do) == null || e.setConnected(!1);
  }
  render() {
    return uf;
  }
}
var Ru;
ko._$litElement$ = !0, ko.finalized = !0, (Ru = zr.litElementHydrateSupport) == null || Ru.call(zr, { LitElement: ko });
const Za = zr.litElementPolyfillSupport;
Za == null || Za({ LitElement: ko });
(zr.litElementVersions ?? (zr.litElementVersions = [])).push("4.2.0");
let Oi, Ir, Sr;
function VN(s, e) {
  Oi = document.createElement("style"), Ir = document.createElement("style"), Sr = document.createElement("style"), Oi.textContent = Dn(s).core.cssText, Ir.textContent = Dn(s).dark.cssText, Sr.textContent = Dn(s).light.cssText, document.head.appendChild(Oi), document.head.appendChild(Ir), document.head.appendChild(Sr), zp(e);
}
function zp(s) {
  Ir && Sr && (s === "light" ? (Ir.removeAttribute("media"), Sr.media = "enabled") : (Sr.removeAttribute("media"), Ir.media = "enabled"));
}
function dN(s) {
  Oi && Ir && Sr && (Oi.textContent = Dn(s).core.cssText, Ir.textContent = Dn(s).dark.cssText, Sr.textContent = Dn(s).light.cssText);
}
function Dn(s) {
  return {
    core: Un`
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
      @keyframes w3m-shake {
        0% {
          transform: scale(1) rotate(0deg);
        }
        20% {
          transform: scale(1) rotate(-1deg);
        }
        40% {
          transform: scale(1) rotate(1.5deg);
        }
        60% {
          transform: scale(1) rotate(-1.5deg);
        }
        80% {
          transform: scale(1) rotate(1deg);
        }
        100% {
          transform: scale(1) rotate(0deg);
        }
      }
      @keyframes w3m-iframe-fade-out {
        0% {
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
      }
      @keyframes w3m-iframe-zoom-in {
        0% {
          transform: translateY(50px);
          opacity: 0;
        }
        100% {
          transform: translateY(0px);
          opacity: 1;
        }
      }
      @keyframes w3m-iframe-zoom-in-mobile {
        0% {
          transform: scale(0.95);
          opacity: 0;
        }
        100% {
          transform: scale(1);
          opacity: 1;
        }
      }
      :root {
        --w3m-modal-width: 360px;
        --w3m-color-mix-strength: ${ns(s != null && s["--w3m-color-mix-strength"] ? `${s["--w3m-color-mix-strength"]}%` : "0%")};
        --w3m-font-family: ${ns((s == null ? void 0 : s["--w3m-font-family"]) || "Inter, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;")};
        --w3m-font-size-master: ${ns((s == null ? void 0 : s["--w3m-font-size-master"]) || "10px")};
        --w3m-border-radius-master: ${ns((s == null ? void 0 : s["--w3m-border-radius-master"]) || "4px")};
        --w3m-z-index: ${ns((s == null ? void 0 : s["--w3m-z-index"]) || 999)};

        --wui-font-family: var(--w3m-font-family);

        --wui-font-size-mini: calc(var(--w3m-font-size-master) * 0.8);
        --wui-font-size-micro: var(--w3m-font-size-master);
        --wui-font-size-tiny: calc(var(--w3m-font-size-master) * 1.2);
        --wui-font-size-small: calc(var(--w3m-font-size-master) * 1.4);
        --wui-font-size-paragraph: calc(var(--w3m-font-size-master) * 1.6);
        --wui-font-size-medium: calc(var(--w3m-font-size-master) * 1.8);
        --wui-font-size-large: calc(var(--w3m-font-size-master) * 2);
        --wui-font-size-title-6: calc(var(--w3m-font-size-master) * 2.2);
        --wui-font-size-medium-title: calc(var(--w3m-font-size-master) * 2.4);
        --wui-font-size-2xl: calc(var(--w3m-font-size-master) * 4);

        --wui-border-radius-5xs: var(--w3m-border-radius-master);
        --wui-border-radius-4xs: calc(var(--w3m-border-radius-master) * 1.5);
        --wui-border-radius-3xs: calc(var(--w3m-border-radius-master) * 2);
        --wui-border-radius-xxs: calc(var(--w3m-border-radius-master) * 3);
        --wui-border-radius-xs: calc(var(--w3m-border-radius-master) * 4);
        --wui-border-radius-s: calc(var(--w3m-border-radius-master) * 5);
        --wui-border-radius-m: calc(var(--w3m-border-radius-master) * 7);
        --wui-border-radius-l: calc(var(--w3m-border-radius-master) * 9);
        --wui-border-radius-3xl: calc(var(--w3m-border-radius-master) * 20);

        --wui-font-weight-light: 400;
        --wui-font-weight-regular: 500;
        --wui-font-weight-medium: 600;
        --wui-font-weight-bold: 700;

        --wui-letter-spacing-2xl: -1.6px;
        --wui-letter-spacing-medium-title: -0.96px;
        --wui-letter-spacing-title-6: -0.88px;
        --wui-letter-spacing-large: -0.8px;
        --wui-letter-spacing-medium: -0.72px;
        --wui-letter-spacing-paragraph: -0.64px;
        --wui-letter-spacing-small: -0.56px;
        --wui-letter-spacing-tiny: -0.48px;
        --wui-letter-spacing-micro: -0.2px;
        --wui-letter-spacing-mini: -0.16px;

        --wui-spacing-0: 0px;
        --wui-spacing-4xs: 2px;
        --wui-spacing-3xs: 4px;
        --wui-spacing-xxs: 6px;
        --wui-spacing-2xs: 7px;
        --wui-spacing-xs: 8px;
        --wui-spacing-1xs: 10px;
        --wui-spacing-s: 12px;
        --wui-spacing-m: 14px;
        --wui-spacing-l: 16px;
        --wui-spacing-2l: 18px;
        --wui-spacing-xl: 20px;
        --wui-spacing-xxl: 24px;
        --wui-spacing-2xl: 32px;
        --wui-spacing-3xl: 40px;
        --wui-spacing-4xl: 90px;
        --wui-spacing-5xl: 95px;

        --wui-icon-box-size-xxs: 14px;
        --wui-icon-box-size-xs: 20px;
        --wui-icon-box-size-sm: 24px;
        --wui-icon-box-size-md: 32px;
        --wui-icon-box-size-mdl: 36px;
        --wui-icon-box-size-lg: 40px;
        --wui-icon-box-size-2lg: 48px;
        --wui-icon-box-size-xl: 64px;

        --wui-icon-size-inherit: inherit;
        --wui-icon-size-xxs: 10px;
        --wui-icon-size-xs: 12px;
        --wui-icon-size-sm: 14px;
        --wui-icon-size-md: 16px;
        --wui-icon-size-mdl: 18px;
        --wui-icon-size-lg: 20px;
        --wui-icon-size-xl: 24px;
        --wui-icon-size-xxl: 28px;

        --wui-wallet-image-size-inherit: inherit;
        --wui-wallet-image-size-sm: 40px;
        --wui-wallet-image-size-md: 56px;
        --wui-wallet-image-size-lg: 80px;

        --wui-visual-size-size-inherit: inherit;
        --wui-visual-size-sm: 40px;
        --wui-visual-size-md: 55px;
        --wui-visual-size-lg: 80px;

        --wui-box-size-md: 100px;
        --wui-box-size-lg: 120px;

        --wui-ease-out-power-2: cubic-bezier(0, 0, 0.22, 1);
        --wui-ease-out-power-1: cubic-bezier(0, 0, 0.55, 1);

        --wui-ease-in-power-3: cubic-bezier(0.66, 0, 1, 1);
        --wui-ease-in-power-2: cubic-bezier(0.45, 0, 1, 1);
        --wui-ease-in-power-1: cubic-bezier(0.3, 0, 1, 1);

        --wui-ease-inout-power-1: cubic-bezier(0.45, 0, 0.55, 1);

        --wui-duration-lg: 200ms;
        --wui-duration-md: 125ms;
        --wui-duration-sm: 75ms;

        --wui-path-network-sm: path(
          'M15.4 2.1a5.21 5.21 0 0 1 5.2 0l11.61 6.7a5.21 5.21 0 0 1 2.61 4.52v13.4c0 1.87-1 3.59-2.6 4.52l-11.61 6.7c-1.62.93-3.6.93-5.22 0l-11.6-6.7a5.21 5.21 0 0 1-2.61-4.51v-13.4c0-1.87 1-3.6 2.6-4.52L15.4 2.1Z'
        );

        --wui-path-network-md: path(
          'M43.4605 10.7248L28.0485 1.61089C25.5438 0.129705 22.4562 0.129705 19.9515 1.61088L4.53951 10.7248C2.03626 12.2051 0.5 14.9365 0.5 17.886V36.1139C0.5 39.0635 2.03626 41.7949 4.53951 43.2752L19.9515 52.3891C22.4562 53.8703 25.5438 53.8703 28.0485 52.3891L43.4605 43.2752C45.9637 41.7949 47.5 39.0635 47.5 36.114V17.8861C47.5 14.9365 45.9637 12.2051 43.4605 10.7248Z'
        );

        --wui-path-network-lg: path(
          'M78.3244 18.926L50.1808 2.45078C45.7376 -0.150261 40.2624 -0.150262 35.8192 2.45078L7.6756 18.926C3.23322 21.5266 0.5 26.3301 0.5 31.5248V64.4752C0.5 69.6699 3.23322 74.4734 7.6756 77.074L35.8192 93.5492C40.2624 96.1503 45.7376 96.1503 50.1808 93.5492L78.3244 77.074C82.7668 74.4734 85.5 69.6699 85.5 64.4752V31.5248C85.5 26.3301 82.7668 21.5266 78.3244 18.926Z'
        );

        --wui-width-network-sm: 36px;
        --wui-width-network-md: 48px;
        --wui-width-network-lg: 86px;

        --wui-height-network-sm: 40px;
        --wui-height-network-md: 54px;
        --wui-height-network-lg: 96px;

        --wui-icon-size-network-xs: 12px;
        --wui-icon-size-network-sm: 16px;
        --wui-icon-size-network-md: 24px;
        --wui-icon-size-network-lg: 42px;

        --wui-color-inherit: inherit;

        --wui-color-inverse-100: #fff;
        --wui-color-inverse-000: #000;

        --wui-cover: rgba(20, 20, 20, 0.8);

        --wui-color-modal-bg: var(--wui-color-modal-bg-base);

        --wui-color-accent-100: var(--wui-color-accent-base-100);
        --wui-color-accent-090: var(--wui-color-accent-base-090);
        --wui-color-accent-080: var(--wui-color-accent-base-080);

        --wui-color-success-100: var(--wui-color-success-base-100);
        --wui-color-success-125: var(--wui-color-success-base-125);

        --wui-color-warning-100: var(--wui-color-warning-base-100);

        --wui-color-error-100: var(--wui-color-error-base-100);
        --wui-color-error-125: var(--wui-color-error-base-125);

        --wui-color-blue-100: var(--wui-color-blue-base-100);
        --wui-color-blue-90: var(--wui-color-blue-base-90);

        --wui-icon-box-bg-error-100: var(--wui-icon-box-bg-error-base-100);
        --wui-icon-box-bg-blue-100: var(--wui-icon-box-bg-blue-base-100);
        --wui-icon-box-bg-success-100: var(--wui-icon-box-bg-success-base-100);
        --wui-icon-box-bg-inverse-100: var(--wui-icon-box-bg-inverse-base-100);

        --wui-all-wallets-bg-100: var(--wui-all-wallets-bg-100);

        --wui-avatar-border: var(--wui-avatar-border-base);

        --wui-thumbnail-border: var(--wui-thumbnail-border-base);

        --wui-wallet-button-bg: var(--wui-wallet-button-bg-base);

        --wui-box-shadow-blue: var(--wui-color-accent-glass-020);
      }

      @supports (background: color-mix(in srgb, white 50%, black)) {
        :root {
          --wui-color-modal-bg: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-modal-bg-base)
          );

          --wui-box-shadow-blue: color-mix(in srgb, var(--wui-color-accent-100) 20%, transparent);

          --wui-color-accent-100: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 100%,
            transparent
          );
          --wui-color-accent-090: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 90%,
            transparent
          );
          --wui-color-accent-080: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 80%,
            transparent
          );
          --wui-color-accent-glass-090: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 90%,
            transparent
          );
          --wui-color-accent-glass-080: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 80%,
            transparent
          );
          --wui-color-accent-glass-020: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 20%,
            transparent
          );
          --wui-color-accent-glass-015: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 15%,
            transparent
          );
          --wui-color-accent-glass-010: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 10%,
            transparent
          );
          --wui-color-accent-glass-005: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 5%,
            transparent
          );
          --wui-color-accent-002: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 2%,
            transparent
          );

          --wui-color-fg-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-100)
          );
          --wui-color-fg-125: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-125)
          );
          --wui-color-fg-150: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-150)
          );
          --wui-color-fg-175: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-175)
          );
          --wui-color-fg-200: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-200)
          );
          --wui-color-fg-225: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-225)
          );
          --wui-color-fg-250: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-250)
          );
          --wui-color-fg-275: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-275)
          );
          --wui-color-fg-300: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-300)
          );
          --wui-color-fg-325: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-325)
          );
          --wui-color-fg-350: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-350)
          );

          --wui-color-bg-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-100)
          );
          --wui-color-bg-125: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-125)
          );
          --wui-color-bg-150: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-150)
          );
          --wui-color-bg-175: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-175)
          );
          --wui-color-bg-200: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-200)
          );
          --wui-color-bg-225: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-225)
          );
          --wui-color-bg-250: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-250)
          );
          --wui-color-bg-275: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-275)
          );
          --wui-color-bg-300: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-300)
          );
          --wui-color-bg-325: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-325)
          );
          --wui-color-bg-350: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-350)
          );

          --wui-color-success-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-success-base-100)
          );
          --wui-color-success-125: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-success-base-125)
          );

          --wui-color-warning-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-warning-base-100)
          );

          --wui-color-error-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-error-base-100)
          );
          --wui-color-blue-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-blue-base-100)
          );
          --wui-color-blue-90: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-blue-base-90)
          );
          --wui-color-error-125: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-error-base-125)
          );

          --wui-icon-box-bg-error-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-icon-box-bg-error-base-100)
          );
          --wui-icon-box-bg-accent-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-icon-box-bg-blue-base-100)
          );
          --wui-icon-box-bg-success-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-icon-box-bg-success-base-100)
          );
          --wui-icon-box-bg-inverse-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-icon-box-bg-inverse-base-100)
          );

          --wui-all-wallets-bg-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-all-wallets-bg-100)
          );

          --wui-avatar-border: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-avatar-border-base)
          );

          --wui-thumbnail-border: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-thumbnail-border-base)
          );

          --wui-wallet-button-bg: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-wallet-button-bg-base)
          );
        }
      }
    `,
    light: Un`
      :root {
        --w3m-color-mix: ${ns((s == null ? void 0 : s["--w3m-color-mix"]) || "#fff")};
        --w3m-accent: ${ns(Zs(s, "dark")["--w3m-accent"])};
        --w3m-default: #fff;

        --wui-color-modal-bg-base: ${ns(Zs(s, "dark")["--w3m-background"])};
        --wui-color-accent-base-100: var(--w3m-accent);

        --wui-color-blueberry-100: hsla(230, 100%, 67%, 1);
        --wui-color-blueberry-090: hsla(231, 76%, 61%, 1);
        --wui-color-blueberry-080: hsla(230, 59%, 55%, 1);
        --wui-color-blueberry-050: hsla(231, 100%, 70%, 0.1);

        --wui-color-fg-100: #e4e7e7;
        --wui-color-fg-125: #d0d5d5;
        --wui-color-fg-150: #a8b1b1;
        --wui-color-fg-175: #a8b0b0;
        --wui-color-fg-200: #949e9e;
        --wui-color-fg-225: #868f8f;
        --wui-color-fg-250: #788080;
        --wui-color-fg-275: #788181;
        --wui-color-fg-300: #6e7777;
        --wui-color-fg-325: #9a9a9a;
        --wui-color-fg-350: #363636;

        --wui-color-bg-100: #141414;
        --wui-color-bg-125: #191a1a;
        --wui-color-bg-150: #1e1f1f;
        --wui-color-bg-175: #222525;
        --wui-color-bg-200: #272a2a;
        --wui-color-bg-225: #2c3030;
        --wui-color-bg-250: #313535;
        --wui-color-bg-275: #363b3b;
        --wui-color-bg-300: #3b4040;
        --wui-color-bg-325: #252525;
        --wui-color-bg-350: #ffffff;

        --wui-color-success-base-100: #26d962;
        --wui-color-success-base-125: #30a46b;

        --wui-color-warning-base-100: #f3a13f;

        --wui-color-error-base-100: #f25a67;
        --wui-color-error-base-125: #df4a34;

        --wui-color-blue-base-100: rgba(102, 125, 255, 1);
        --wui-color-blue-base-90: rgba(102, 125, 255, 0.9);

        --wui-color-success-glass-001: rgba(38, 217, 98, 0.01);
        --wui-color-success-glass-002: rgba(38, 217, 98, 0.02);
        --wui-color-success-glass-005: rgba(38, 217, 98, 0.05);
        --wui-color-success-glass-010: rgba(38, 217, 98, 0.1);
        --wui-color-success-glass-015: rgba(38, 217, 98, 0.15);
        --wui-color-success-glass-020: rgba(38, 217, 98, 0.2);
        --wui-color-success-glass-025: rgba(38, 217, 98, 0.25);
        --wui-color-success-glass-030: rgba(38, 217, 98, 0.3);
        --wui-color-success-glass-060: rgba(38, 217, 98, 0.6);
        --wui-color-success-glass-080: rgba(38, 217, 98, 0.8);

        --wui-color-success-glass-reown-020: rgba(48, 164, 107, 0.2);

        --wui-color-warning-glass-reown-020: rgba(243, 161, 63, 0.2);

        --wui-color-error-glass-001: rgba(242, 90, 103, 0.01);
        --wui-color-error-glass-002: rgba(242, 90, 103, 0.02);
        --wui-color-error-glass-005: rgba(242, 90, 103, 0.05);
        --wui-color-error-glass-010: rgba(242, 90, 103, 0.1);
        --wui-color-error-glass-015: rgba(242, 90, 103, 0.15);
        --wui-color-error-glass-020: rgba(242, 90, 103, 0.2);
        --wui-color-error-glass-025: rgba(242, 90, 103, 0.25);
        --wui-color-error-glass-030: rgba(242, 90, 103, 0.3);
        --wui-color-error-glass-060: rgba(242, 90, 103, 0.6);
        --wui-color-error-glass-080: rgba(242, 90, 103, 0.8);

        --wui-color-error-glass-reown-020: rgba(223, 74, 52, 0.2);

        --wui-color-gray-glass-001: rgba(255, 255, 255, 0.01);
        --wui-color-gray-glass-002: rgba(255, 255, 255, 0.02);
        --wui-color-gray-glass-005: rgba(255, 255, 255, 0.05);
        --wui-color-gray-glass-010: rgba(255, 255, 255, 0.1);
        --wui-color-gray-glass-015: rgba(255, 255, 255, 0.15);
        --wui-color-gray-glass-020: rgba(255, 255, 255, 0.2);
        --wui-color-gray-glass-025: rgba(255, 255, 255, 0.25);
        --wui-color-gray-glass-030: rgba(255, 255, 255, 0.3);
        --wui-color-gray-glass-060: rgba(255, 255, 255, 0.6);
        --wui-color-gray-glass-080: rgba(255, 255, 255, 0.8);
        --wui-color-gray-glass-090: rgba(255, 255, 255, 0.9);

        --wui-color-dark-glass-100: rgba(42, 42, 42, 1);

        --wui-icon-box-bg-error-base-100: #3c2426;
        --wui-icon-box-bg-blue-base-100: #20303f;
        --wui-icon-box-bg-success-base-100: #1f3a28;
        --wui-icon-box-bg-inverse-base-100: #243240;

        --wui-all-wallets-bg-100: #222b35;

        --wui-avatar-border-base: #252525;

        --wui-thumbnail-border-base: #252525;

        --wui-wallet-button-bg-base: var(--wui-color-bg-125);

        --w3m-card-embedded-shadow-color: rgb(17 17 18 / 25%);
      }
    `,
    dark: Un`
      :root {
        --w3m-color-mix: ${ns((s == null ? void 0 : s["--w3m-color-mix"]) || "#000")};
        --w3m-accent: ${ns(Zs(s, "light")["--w3m-accent"])};
        --w3m-default: #000;

        --wui-color-modal-bg-base: ${ns(Zs(s, "light")["--w3m-background"])};
        --wui-color-accent-base-100: var(--w3m-accent);

        --wui-color-blueberry-100: hsla(231, 100%, 70%, 1);
        --wui-color-blueberry-090: hsla(231, 97%, 72%, 1);
        --wui-color-blueberry-080: hsla(231, 92%, 74%, 1);

        --wui-color-fg-100: #141414;
        --wui-color-fg-125: #2d3131;
        --wui-color-fg-150: #474d4d;
        --wui-color-fg-175: #636d6d;
        --wui-color-fg-200: #798686;
        --wui-color-fg-225: #828f8f;
        --wui-color-fg-250: #8b9797;
        --wui-color-fg-275: #95a0a0;
        --wui-color-fg-300: #9ea9a9;
        --wui-color-fg-325: #9a9a9a;
        --wui-color-fg-350: #d0d0d0;

        --wui-color-bg-100: #ffffff;
        --wui-color-bg-125: #f5fafa;
        --wui-color-bg-150: #f3f8f8;
        --wui-color-bg-175: #eef4f4;
        --wui-color-bg-200: #eaf1f1;
        --wui-color-bg-225: #e5eded;
        --wui-color-bg-250: #e1e9e9;
        --wui-color-bg-275: #dce7e7;
        --wui-color-bg-300: #d8e3e3;
        --wui-color-bg-325: #f3f3f3;
        --wui-color-bg-350: #202020;

        --wui-color-success-base-100: #26b562;
        --wui-color-success-base-125: #30a46b;

        --wui-color-warning-base-100: #f3a13f;

        --wui-color-error-base-100: #f05142;
        --wui-color-error-base-125: #df4a34;

        --wui-color-blue-base-100: rgba(102, 125, 255, 1);
        --wui-color-blue-base-90: rgba(102, 125, 255, 0.9);

        --wui-color-success-glass-001: rgba(38, 181, 98, 0.01);
        --wui-color-success-glass-002: rgba(38, 181, 98, 0.02);
        --wui-color-success-glass-005: rgba(38, 181, 98, 0.05);
        --wui-color-success-glass-010: rgba(38, 181, 98, 0.1);
        --wui-color-success-glass-015: rgba(38, 181, 98, 0.15);
        --wui-color-success-glass-020: rgba(38, 181, 98, 0.2);
        --wui-color-success-glass-025: rgba(38, 181, 98, 0.25);
        --wui-color-success-glass-030: rgba(38, 181, 98, 0.3);
        --wui-color-success-glass-060: rgba(38, 181, 98, 0.6);
        --wui-color-success-glass-080: rgba(38, 181, 98, 0.8);

        --wui-color-success-glass-reown-020: rgba(48, 164, 107, 0.2);

        --wui-color-warning-glass-reown-020: rgba(243, 161, 63, 0.2);

        --wui-color-error-glass-001: rgba(240, 81, 66, 0.01);
        --wui-color-error-glass-002: rgba(240, 81, 66, 0.02);
        --wui-color-error-glass-005: rgba(240, 81, 66, 0.05);
        --wui-color-error-glass-010: rgba(240, 81, 66, 0.1);
        --wui-color-error-glass-015: rgba(240, 81, 66, 0.15);
        --wui-color-error-glass-020: rgba(240, 81, 66, 0.2);
        --wui-color-error-glass-025: rgba(240, 81, 66, 0.25);
        --wui-color-error-glass-030: rgba(240, 81, 66, 0.3);
        --wui-color-error-glass-060: rgba(240, 81, 66, 0.6);
        --wui-color-error-glass-080: rgba(240, 81, 66, 0.8);

        --wui-color-error-glass-reown-020: rgba(223, 74, 52, 0.2);

        --wui-icon-box-bg-error-base-100: #f4dfdd;
        --wui-icon-box-bg-blue-base-100: #d9ecfb;
        --wui-icon-box-bg-success-base-100: #daf0e4;
        --wui-icon-box-bg-inverse-base-100: #dcecfc;

        --wui-all-wallets-bg-100: #e8f1fa;

        --wui-avatar-border-base: #f3f4f4;

        --wui-thumbnail-border-base: #eaefef;

        --wui-wallet-button-bg-base: var(--wui-color-bg-125);

        --wui-color-gray-glass-001: rgba(0, 0, 0, 0.01);
        --wui-color-gray-glass-002: rgba(0, 0, 0, 0.02);
        --wui-color-gray-glass-005: rgba(0, 0, 0, 0.05);
        --wui-color-gray-glass-010: rgba(0, 0, 0, 0.1);
        --wui-color-gray-glass-015: rgba(0, 0, 0, 0.15);
        --wui-color-gray-glass-020: rgba(0, 0, 0, 0.2);
        --wui-color-gray-glass-025: rgba(0, 0, 0, 0.25);
        --wui-color-gray-glass-030: rgba(0, 0, 0, 0.3);
        --wui-color-gray-glass-060: rgba(0, 0, 0, 0.6);
        --wui-color-gray-glass-080: rgba(0, 0, 0, 0.8);
        --wui-color-gray-glass-090: rgba(0, 0, 0, 0.9);

        --wui-color-dark-glass-100: rgba(233, 233, 233, 1);

        --w3m-card-embedded-shadow-color: rgb(224 225 233 / 25%);
      }
    `
  };
}
const KN = Un`
  *,
  *::after,
  *::before,
  :host {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-style: normal;
    text-rendering: optimizeSpeed;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: transparent;
    font-family: var(--wui-font-family);
    backface-visibility: hidden;
  }
`, GN = Un`
  button,
  a {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    transition:
      color var(--wui-duration-lg) var(--wui-ease-out-power-1),
      background-color var(--wui-duration-lg) var(--wui-ease-out-power-1),
      border var(--wui-duration-lg) var(--wui-ease-out-power-1),
      border-radius var(--wui-duration-lg) var(--wui-ease-out-power-1),
      box-shadow var(--wui-duration-lg) var(--wui-ease-out-power-1);
    will-change: background-color, color, border, box-shadow, border-radius;
    outline: none;
    border: none;
    column-gap: var(--wui-spacing-3xs);
    background-color: transparent;
    text-decoration: none;
  }

  wui-flex {
    transition: border-radius var(--wui-duration-lg) var(--wui-ease-out-power-1);
    will-change: border-radius;
  }

  button:disabled > wui-wallet-image,
  button:disabled > wui-all-wallets-image,
  button:disabled > wui-network-image,
  button:disabled > wui-image,
  button:disabled > wui-transaction-visual,
  button:disabled > wui-logo {
    filter: grayscale(1);
  }

  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled {
      background-color: var(--wui-color-gray-glass-005);
    }

    button:active:enabled {
      background-color: var(--wui-color-gray-glass-010);
    }
  }

  button:disabled > wui-icon-box {
    opacity: 0.5;
  }

  input {
    border: none;
    outline: none;
    appearance: none;
  }
`, YN = Un`
  .wui-color-inherit {
    color: var(--wui-color-inherit);
  }

  .wui-color-accent-100 {
    color: var(--wui-color-accent-100);
  }

  .wui-color-error-100 {
    color: var(--wui-color-error-100);
  }

  .wui-color-blue-100 {
    color: var(--wui-color-blue-100);
  }

  .wui-color-blue-90 {
    color: var(--wui-color-blue-90);
  }

  .wui-color-error-125 {
    color: var(--wui-color-error-125);
  }

  .wui-color-success-100 {
    color: var(--wui-color-success-100);
  }

  .wui-color-success-125 {
    color: var(--wui-color-success-125);
  }

  .wui-color-inverse-100 {
    color: var(--wui-color-inverse-100);
  }

  .wui-color-inverse-000 {
    color: var(--wui-color-inverse-000);
  }

  .wui-color-fg-100 {
    color: var(--wui-color-fg-100);
  }

  .wui-color-fg-200 {
    color: var(--wui-color-fg-200);
  }

  .wui-color-fg-300 {
    color: var(--wui-color-fg-300);
  }

  .wui-color-fg-325 {
    color: var(--wui-color-fg-325);
  }

  .wui-color-fg-350 {
    color: var(--wui-color-fg-350);
  }

  .wui-bg-color-inherit {
    background-color: var(--wui-color-inherit);
  }

  .wui-bg-color-blue-100 {
    background-color: var(--wui-color-accent-100);
  }

  .wui-bg-color-error-100 {
    background-color: var(--wui-color-error-100);
  }

  .wui-bg-color-error-125 {
    background-color: var(--wui-color-error-125);
  }

  .wui-bg-color-success-100 {
    background-color: var(--wui-color-success-100);
  }

  .wui-bg-color-success-125 {
    background-color: var(--wui-color-success-100);
  }

  .wui-bg-color-inverse-100 {
    background-color: var(--wui-color-inverse-100);
  }

  .wui-bg-color-inverse-000 {
    background-color: var(--wui-color-inverse-000);
  }

  .wui-bg-color-fg-100 {
    background-color: var(--wui-color-fg-100);
  }

  .wui-bg-color-fg-200 {
    background-color: var(--wui-color-fg-200);
  }

  .wui-bg-color-fg-300 {
    background-color: var(--wui-color-fg-300);
  }

  .wui-color-fg-325 {
    background-color: var(--wui-color-fg-325);
  }

  .wui-color-fg-350 {
    background-color: var(--wui-color-fg-350);
  }
`, Uo = {
  hexStringToNumber(s) {
    const e = s.startsWith("0x") ? s.slice(2) : s;
    return parseInt(e, 16);
  },
  numberToHexString(s) {
    return `0x${s.toString(16)}`;
  },
  async getUserInfo(s) {
    const [e, t] = await Promise.all([
      Uo.getAddresses(s),
      Uo.getChainId(s)
    ]);
    return { chainId: t, addresses: e };
  },
  async getChainId(s) {
    const e = await s.request({ method: "eth_chainId" });
    return Number(e);
  },
  async getAddress(s) {
    const [e] = await s.request({ method: "eth_accounts" });
    return e;
  },
  async getAddresses(s) {
    return await s.request({ method: "eth_accounts" });
  },
  async addEthereumChain(s, e) {
    var r, n;
    const t = ((r = e.rpcUrls.chainDefault) == null ? void 0 : r.http) || [];
    await s.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: Uo.numberToHexString(e.id),
          rpcUrls: [...t],
          chainName: e.name,
          nativeCurrency: {
            name: e.nativeCurrency.name,
            decimals: e.nativeCurrency.decimals,
            symbol: e.nativeCurrency.symbol
          },
          blockExplorerUrls: [(n = e.blockExplorers) == null ? void 0 : n.default.url],
          iconUrls: [Li.NetworkImageIds[e.id]]
        }
      ]
    });
  }
}, Cn = {
  ACCOUNT_INDEXES: {
    PAYMENT: 0,
    ORDINAL: 1
  }
};
function no(s) {
  return {
    formatters: void 0,
    fees: void 0,
    serializers: void 0,
    ...s
  };
}
const Su = no({
  id: "5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",
  name: "Solana",
  network: "solana-mainnet",
  nativeCurrency: { name: "Solana", symbol: "SOL", decimals: 9 },
  rpcUrls: {
    default: { http: ["https://rpc.walletconnect.org/v1"] }
  },
  blockExplorers: { default: { name: "Solscan", url: "https://solscan.io" } },
  testnet: !1,
  chainNamespace: "solana",
  caipNetworkId: "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",
  deprecatedCaipNetworkId: "solana:4sGjMW1sUnHzSxGspuhpqLDx6wiyjNtZ"
}), Nu = no({
  id: "EtWTRABZaYq6iMfeYKouRu166VU2xqa1",
  name: "Solana Devnet",
  network: "solana-devnet",
  nativeCurrency: { name: "Solana", symbol: "SOL", decimals: 9 },
  rpcUrls: {
    default: { http: ["https://rpc.walletconnect.org/v1"] }
  },
  blockExplorers: { default: { name: "Solscan", url: "https://solscan.io" } },
  testnet: !0,
  chainNamespace: "solana",
  caipNetworkId: "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1",
  deprecatedCaipNetworkId: "solana:8E9rvCKLFQia2Y35HXjjpWzj8weVo44K"
});
no({
  id: "4uhcVJyU9pJkvQyS88uRDiswHXSCkY3z",
  name: "Solana Testnet",
  network: "solana-testnet",
  nativeCurrency: { name: "Solana", symbol: "SOL", decimals: 9 },
  rpcUrls: {
    default: { http: ["https://rpc.walletconnect.org/v1"] }
  },
  blockExplorers: { default: { name: "Solscan", url: "https://solscan.io" } },
  testnet: !0,
  chainNamespace: "solana",
  caipNetworkId: "solana:4uhcVJyU9pJkvQyS88uRDiswHXSCkY3z"
});
no({
  id: "000000000019d6689c085ae165831e93",
  caipNetworkId: "bip122:000000000019d6689c085ae165831e93",
  chainNamespace: "bip122",
  name: "Bitcoin",
  nativeCurrency: {
    name: "Bitcoin",
    symbol: "BTC",
    decimals: 8
  },
  rpcUrls: {
    default: { http: ["https://rpc.walletconnect.org/v1"] }
  }
});
no({
  id: "000000000933ea01ad0ee984209779ba",
  caipNetworkId: "bip122:000000000933ea01ad0ee984209779ba",
  chainNamespace: "bip122",
  name: "Bitcoin Testnet",
  nativeCurrency: {
    name: "Bitcoin",
    symbol: "BTC",
    decimals: 8
  },
  rpcUrls: {
    default: { http: ["https://rpc.walletconnect.org/v1"] }
  },
  testnet: !0
});
const Vp = {
  solana: [
    "solana_signMessage",
    "solana_signTransaction",
    "solana_requestAccounts",
    "solana_getAccounts",
    "solana_signAllTransactions",
    "solana_signAndSendTransaction"
  ],
  eip155: [
    "eth_accounts",
    "eth_requestAccounts",
    "eth_sendRawTransaction",
    "eth_sign",
    "eth_signTransaction",
    "eth_signTypedData",
    "eth_signTypedData_v3",
    "eth_signTypedData_v4",
    "eth_sendTransaction",
    "personal_sign",
    "wallet_switchEthereumChain",
    "wallet_addEthereumChain",
    "wallet_getPermissions",
    "wallet_requestPermissions",
    "wallet_registerOnboarding",
    "wallet_watchAsset",
    "wallet_scanQRCode",
    // EIP-5792
    "wallet_getCallsStatus",
    "wallet_showCallsStatus",
    "wallet_sendCalls",
    "wallet_getCapabilities",
    // EIP-7715
    "wallet_grantPermissions",
    "wallet_revokePermissions",
    //EIP-7811
    "wallet_getAssets"
  ],
  bip122: ["sendTransfer", "signMessage", "signPsbt", "getAccountAddresses"]
}, Ms = {
  getMethodsByChainNamespace(s) {
    return Vp[s] || [];
  },
  createDefaultNamespace(s) {
    return {
      methods: this.getMethodsByChainNamespace(s),
      events: ["accountsChanged", "chainChanged"],
      chains: [],
      rpcMap: {}
    };
  },
  applyNamespaceOverrides(s, e) {
    if (!e)
      return { ...s };
    const t = { ...s }, r = /* @__PURE__ */ new Set();
    if (e.methods && Object.keys(e.methods).forEach((n) => r.add(n)), e.chains && Object.keys(e.chains).forEach((n) => r.add(n)), e.events && Object.keys(e.events).forEach((n) => r.add(n)), e.rpcMap && Object.keys(e.rpcMap).forEach((n) => {
      const [i] = n.split(":");
      i && r.add(i);
    }), r.forEach((n) => {
      t[n] || (t[n] = this.createDefaultNamespace(n));
    }), e.methods && Object.entries(e.methods).forEach(([n, i]) => {
      t[n] && (t[n].methods = i);
    }), e.chains && Object.entries(e.chains).forEach(([n, i]) => {
      t[n] && (t[n].chains = i);
    }), e.events && Object.entries(e.events).forEach(([n, i]) => {
      t[n] && (t[n].events = i);
    }), e.rpcMap) {
      const n = /* @__PURE__ */ new Set();
      Object.entries(e.rpcMap).forEach(([i, o]) => {
        const [a, c] = i.split(":");
        !a || !c || !t[a] || (t[a].rpcMap || (t[a].rpcMap = {}), n.has(a) || (t[a].rpcMap = {}, n.add(a)), t[a].rpcMap[c] = o);
      });
    }
    return t;
  },
  createNamespaces(s, e) {
    const t = s.reduce((r, n) => {
      const { id: i, chainNamespace: o, rpcUrls: a } = n, c = a.default.http[0];
      r[o] || (r[o] = this.createDefaultNamespace(o));
      const l = `${o}:${i}`, d = r[o];
      switch (d.chains.push(l), l) {
        case Su.caipNetworkId:
          d.chains.push(Su.deprecatedCaipNetworkId);
          break;
        case Nu.caipNetworkId:
          d.chains.push(Nu.deprecatedCaipNetworkId);
          break;
      }
      return d != null && d.rpcMap && c && (d.rpcMap[i] = c), r;
    }, {});
    return this.applyNamespaceOverrides(t, e);
  },
  resolveReownName: async (s) => {
    var r;
    const e = await bi.resolveName(s);
    return ((r = (Object.values(e == null ? void 0 : e.addresses) || [])[0]) == null ? void 0 : r.address) || !1;
  },
  getChainsFromNamespaces(s = {}) {
    return Object.values(s).flatMap((e) => {
      const t = e.chains || [], r = e.accounts.map((n) => {
        const [i, o] = n.split(":");
        return `${i}:${o}`;
      });
      return Array.from(/* @__PURE__ */ new Set([...t, ...r]));
    });
  },
  isSessionEventData(s) {
    return typeof s == "object" && s !== null && "id" in s && "topic" in s && "params" in s && typeof s.params == "object" && s.params !== null && "chainId" in s.params && "event" in s.params && typeof s.params.event == "object" && s.params.event !== null;
  },
  isOriginAllowed(s, e, t) {
    for (const r of [...e, ...t])
      if (r.includes("*")) {
        const i = `^${r.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&").replace(/\\\*/gu, ".*")}$`;
        if (new RegExp(i, "u").test(s))
          return !0;
      } else
        try {
          if (new URL(r).origin === s)
            return !0;
        } catch {
          if (r === s)
            return !0;
        }
    return !1;
  },
  listenWcProvider({ universalProvider: s, namespace: e, onConnect: t, onDisconnect: r, onAccountsChanged: n, onChainChanged: i, onDisplayUri: o }) {
    t && s.on("connect", () => {
      const a = Ms.getWalletConnectAccounts(s, e);
      t(a);
    }), r && s.on("disconnect", () => {
      r();
    }), n && s.on("session_event", (a) => {
      if (Ms.isSessionEventData(a)) {
        const { name: c, data: l } = a.params.event;
        if (c === "accountsChanged" && Array.isArray(l)) {
          const d = l.filter((u) => te.isCaipAddress(u)).map((u) => Kt.parseCaipAddress(u)).filter((u) => u.chainNamespace === e);
          n(d);
        }
      }
    }), i && s.on("chainChanged", (a) => {
      i(a);
    }), o && s.on("display_uri", (a) => {
      o(a);
    });
  },
  getWalletConnectAccounts(s, e) {
    var n, i, o, a;
    const t = /* @__PURE__ */ new Set(), r = (a = (o = (i = (n = s == null ? void 0 : s.session) == null ? void 0 : n.namespaces) == null ? void 0 : i[e]) == null ? void 0 : o.accounts) == null ? void 0 : a.map((c) => Kt.parseCaipAddress(c)).filter(({ address: c }) => t.has(c.toLowerCase()) ? !1 : (t.add(c.toLowerCase()), !0));
    return r && r.length > 0 ? r : [];
  }
};
class uN {
  constructor(e) {
    this.namespace = e.namespace;
  }
  async syncConnections(e) {
    switch (this.namespace) {
      case N.CHAIN.EVM:
        await this.syncEVMConnections(e);
        break;
      case N.CHAIN.SOLANA:
        await this.syncSolanaConnections(e);
        break;
      case N.CHAIN.BITCOIN:
        await this.syncBitcoinConnections(e);
        break;
      default:
        throw new Error(`Unsupported chain namespace: ${this.namespace}`);
    }
  }
  async syncEVMConnections({ connectors: e, caipNetworks: t, universalProvider: r, getConnectionStatusInfo: n, onConnection: i, onListenProvider: o }) {
    await Promise.all(e.filter((a) => {
      const { hasDisconnected: c, hasConnected: l } = n(a.id);
      return !c && l;
    }).map(async (a) => {
      if (a.id === N.CONNECTOR_ID.WALLET_CONNECT) {
        const c = Ms.getWalletConnectAccounts(r, this.namespace), l = t.find((d) => {
          var u, p;
          return d.chainNamespace === this.namespace && d.id.toString() === ((p = (u = c[0]) == null ? void 0 : u.chainId) == null ? void 0 : p.toString());
        });
        c.length > 0 && i({
          connectorId: a.id,
          accounts: c.map((d) => ({ address: d.address })),
          caipNetwork: l
        });
      } else {
        const { accounts: c, chainId: l } = await Oo.fetchProviderData(a);
        if (c.length > 0 && l) {
          const d = t.find((u) => u.chainNamespace === this.namespace && u.id.toString() === l.toString());
          i({
            connectorId: a.id,
            accounts: c.map((u) => ({ address: u })),
            caipNetwork: d
          }), a.provider && a.id !== N.CONNECTOR_ID.AUTH && a.id !== N.CONNECTOR_ID.WALLET_CONNECT && o(a.id, a.provider);
        }
      }
    }));
  }
  async syncSolanaConnections({ connectors: e, caipNetwork: t, universalProvider: r, getConnectionStatusInfo: n, onConnection: i, onListenProvider: o }) {
    await Promise.all(e.filter((a) => {
      const { hasDisconnected: c, hasConnected: l } = n(a.id);
      return !c && l;
    }).map(async (a) => {
      if (a.id === N.CONNECTOR_ID.WALLET_CONNECT) {
        const c = Ms.getWalletConnectAccounts(r, this.namespace);
        c.length > 0 && i({
          connectorId: a.id,
          accounts: c.map((l) => ({ address: l.address })),
          caipNetwork: t
        });
      } else {
        const c = await a.connect({
          chainId: t == null ? void 0 : t.id
        });
        c && (i({
          connectorId: a.id,
          accounts: [{ address: c }],
          caipNetwork: t
        }), o(a.id, a.provider));
      }
    }));
  }
  async syncBitcoinConnections({ connectors: e, caipNetwork: t, universalProvider: r, getConnectionStatusInfo: n, onConnection: i, onListenProvider: o }) {
    await Promise.all(e.filter((a) => {
      const { hasDisconnected: c, hasConnected: l } = n(a.id);
      return !c && l;
    }).map(async (a) => {
      var p, g, w, m, y, C;
      if (a.id === N.CONNECTOR_ID.WALLET_CONNECT) {
        const _ = Ms.getWalletConnectAccounts(r, this.namespace);
        _.length > 0 && i({
          connectorId: a.id,
          accounts: _.map((U) => ({ address: U.address })),
          caipNetwork: t
        });
        return;
      }
      const c = await a.connect(), l = await a.getAccountAddresses();
      let d = l == null ? void 0 : l.map((_) => te.createAccount(N.CHAIN.BITCOIN, _.address, _.purpose || "payment", _.publicKey, _.path));
      if (d && d.length > 1 && (d = [
        {
          namespace: N.CHAIN.BITCOIN,
          publicKey: ((p = d[Cn.ACCOUNT_INDEXES.PAYMENT]) == null ? void 0 : p.publicKey) ?? "",
          path: ((g = d[Cn.ACCOUNT_INDEXES.PAYMENT]) == null ? void 0 : g.path) ?? "",
          address: ((w = d[Cn.ACCOUNT_INDEXES.PAYMENT]) == null ? void 0 : w.address) ?? "",
          type: "payment"
        },
        {
          namespace: N.CHAIN.BITCOIN,
          publicKey: ((m = d[Cn.ACCOUNT_INDEXES.ORDINAL]) == null ? void 0 : m.publicKey) ?? "",
          path: ((y = d[Cn.ACCOUNT_INDEXES.ORDINAL]) == null ? void 0 : y.path) ?? "",
          address: ((C = d[Cn.ACCOUNT_INDEXES.ORDINAL]) == null ? void 0 : C.address) ?? "",
          type: "ordinal"
        }
      ]), !(a.chains.find((_) => _.id === (t == null ? void 0 : t.id)) || a.chains[0]))
        throw new Error("The connector does not support any of the requested chains");
      c && (o(a.id, a.provider), i({
        connectorId: a.id,
        accounts: d.map((_) => ({ address: _.address, type: _.type })),
        caipNetwork: t
      }));
    }));
  }
  /**
   * Gets a connection based on provided parameters.
   * If connectorId is provided, returns connection for that specific connector.
   * Otherwise, returns the first available valid connection.
   *
   * @param params - Connection parameters
   * @param params.address - Optional address to filter by
   * @param params.connectorId - Optional connector ID to filter by
   * @param params.connections - List of available connections
   * @param params.connectors - List of available connectors
   * @returns Connection or null if none found
   */
  getConnection({ address: e, connectorId: t, connections: r, connectors: n }) {
    if (t) {
      const o = r.find((l) => Nt.isLowerCaseMatch(l.connectorId, t));
      if (!o)
        return null;
      const a = n.find((l) => Nt.isLowerCaseMatch(l.id, o.connectorId)), c = e ? o.accounts.find((l) => Nt.isLowerCaseMatch(l.address, e)) : o.accounts[0];
      return { ...o, account: c, connector: a };
    }
    const i = r.find((o) => o.accounts.length > 0 && n.some((a) => Nt.isLowerCaseMatch(a.id, o.connectorId)));
    if (i) {
      const [o] = i.accounts, a = n.find((c) => Nt.isLowerCaseMatch(c.id, i.connectorId));
      return {
        ...i,
        account: o,
        connector: a
      };
    }
    return null;
  }
}
const Pn = {
  ERROR_CODE_UNRECOGNIZED_CHAIN_ID: 4902,
  ERROR_CODE_DEFAULT: 5e3,
  ERROR_INVALID_CHAIN_ID: 32603,
  DEFAULT_ALLOWED_ANCESTORS: [
    "http://localhost:*",
    "https://*.pages.dev",
    "https://*.vercel.app",
    "https://*.ngrok-free.app",
    "https://secure-mobile.walletconnect.com",
    "https://secure-mobile.walletconnect.org"
  ]
};
class Kp {
  constructor({ provider: e, namespace: t }) {
    this.id = N.CONNECTOR_ID.WALLET_CONNECT, this.name = Li.ConnectorNamesMap[N.CONNECTOR_ID.WALLET_CONNECT], this.type = "WALLET_CONNECT", this.imageId = Li.ConnectorImageIds[N.CONNECTOR_ID.WALLET_CONNECT], this.getCaipNetworks = f.getCaipNetworks.bind(f), this.caipNetworks = this.getCaipNetworks(), this.provider = e, this.chain = t;
  }
  get chains() {
    return this.getCaipNetworks();
  }
  async connectWalletConnect() {
    if (!await this.authenticate()) {
      const t = this.getCaipNetworks(), r = S.state.universalProviderConfigOverride, n = Ms.createNamespaces(t, r);
      await this.provider.connect({ optionalNamespaces: n });
    }
    return {
      clientId: await this.provider.client.core.crypto.getClientId(),
      session: this.provider.session
    };
  }
  async disconnect() {
    await this.provider.disconnect();
  }
  async authenticate() {
    const e = this.chains.map((t) => t.caipNetworkId);
    return xn.universalProviderAuthenticate({
      universalProvider: this.provider,
      chains: e,
      methods: hN
    });
  }
}
const hN = [
  "eth_accounts",
  "eth_requestAccounts",
  "eth_sendRawTransaction",
  "eth_sign",
  "eth_signTransaction",
  "eth_signTypedData",
  "eth_signTypedData_v3",
  "eth_signTypedData_v4",
  "eth_sendTransaction",
  "personal_sign",
  "wallet_switchEthereumChain",
  "wallet_addEthereumChain",
  "wallet_getPermissions",
  "wallet_requestPermissions",
  "wallet_registerOnboarding",
  "wallet_watchAsset",
  "wallet_scanQRCode",
  // EIP-5792
  "wallet_getCallsStatus",
  "wallet_sendCalls",
  "wallet_getCapabilities",
  // EIP-7715
  "wallet_grantPermissions",
  "wallet_revokePermissions",
  //EIP-7811
  "wallet_getAssets"
], pN = [
  N.CONNECTOR_ID.AUTH,
  N.CONNECTOR_ID.WALLET_CONNECT
];
class fN {
  /**
   * Creates an instance of AdapterBlueprint.
   * @param {AdapterBlueprint.Params} params - The parameters for initializing the adapter
   */
  constructor(e) {
    this.availableConnectors = [], this.availableConnections = [], this.providerHandlers = {}, this.eventListeners = /* @__PURE__ */ new Map(), this.getCaipNetworks = (t) => f.getCaipNetworks(t), this.getConnectorId = (t) => F.getConnectorId(t), e && this.construct(e), e != null && e.namespace && (this.connectionManager = new uN({
      namespace: e.namespace
    }));
  }
  /**
   * Initializes the adapter with the given parameters.
   * @param {AdapterBlueprint.Params} params - The parameters for initializing the adapter
   */
  construct(e) {
    this.projectId = e.projectId, this.namespace = e.namespace, this.adapterType = e.adapterType;
  }
  /**
   * Gets the available connectors.
   * @returns {Connector[]} An array of available connectors
   */
  get connectors() {
    return this.availableConnectors;
  }
  /**
   * Gets the available connections.
   * @returns {Connection[]} An array of available connections
   */
  get connections() {
    return this.availableConnections;
  }
  /**
   * Gets the supported networks.
   * @returns {CaipNetwork[]} An array of supported networks
   */
  get networks() {
    return this.getCaipNetworks(this.namespace);
  }
  /**
   * Handles the auth connected event.
   * @param {W3mFrameTypes.Responses['FrameGetUserResponse']} user - The user response
   */
  onAuthConnected({ accounts: e, chainId: t }) {
    const r = this.getCaipNetworks().filter((n) => n.chainNamespace === this.namespace).find((n) => n.id.toString() === (t == null ? void 0 : t.toString()));
    e && r && this.addConnection({
      connectorId: N.CONNECTOR_ID.AUTH,
      accounts: e,
      caipNetwork: r
    });
  }
  /**
   * Sets the auth provider.
   * @param {W3mFrameProvider} authProvider - The auth provider instance
   */
  setAuthProvider(e) {
    e.onConnect(this.onAuthConnected.bind(this)), e.onSocialConnected(this.onAuthConnected.bind(this)), this.addConnector({
      id: N.CONNECTOR_ID.AUTH,
      type: "AUTH",
      name: N.CONNECTOR_NAMES.AUTH,
      provider: e,
      imageId: Li.ConnectorImageIds[N.CONNECTOR_ID.AUTH],
      chain: this.namespace,
      chains: []
    });
  }
  /**
   * Adds one or more connectors to the available connectors list.
   * @param {...Connector} connectors - The connectors to add
   */
  addConnector(...e) {
    const t = /* @__PURE__ */ new Set();
    this.availableConnectors = [...e, ...this.availableConnectors].filter((r) => t.has(r.id) ? !1 : (t.add(r.id), !0)), this.emit("connectors", this.availableConnectors);
  }
  /**
   * Adds connections to the available connections list
   * @param {...Connection} connections - The connections to add
   */
  addConnection(...e) {
    const t = /* @__PURE__ */ new Set();
    this.availableConnections = [...e, ...this.availableConnections].filter((r) => t.has(r.connectorId.toLowerCase()) ? !1 : (t.add(r.connectorId.toLowerCase()), !0)), this.emit("connections", this.availableConnections);
  }
  /**
   * Deletes a connection from the available connections list
   * @param {string} connectorId - The connector ID of the connection to delete
   */
  deleteConnection(e) {
    this.availableConnections = this.availableConnections.filter((t) => !Nt.isLowerCaseMatch(t.connectorId, e)), this.emit("connections", this.availableConnections);
  }
  /**
   * Clears all connections from the available connections list
   * @param {boolean} emit - Whether to emit the connections event
   */
  clearConnections(e = !1) {
    this.availableConnections = [], e && this.emit("connections", this.availableConnections);
  }
  setStatus(e, t) {
    X.setStatus(e, t);
  }
  /**
   * Adds an event listener for a specific event.
   * @template T
   * @param {T} eventName - The name of the event
   * @param {EventCallback<T>} callback - The callback function to be called when the event is emitted
   */
  on(e, t) {
    var r;
    this.eventListeners.has(e) || this.eventListeners.set(e, /* @__PURE__ */ new Set()), (r = this.eventListeners.get(e)) == null || r.add(t);
  }
  /**
   * Removes an event listener for a specific event.
   * @template T
   * @param {T} eventName - The name of the event
   * @param {EventCallback<T>} callback - The callback function to be removed
   */
  off(e, t) {
    const r = this.eventListeners.get(e);
    r && r.delete(t);
  }
  /**
   * Removes all event listeners.
   */
  removeAllEventListeners() {
    this.eventListeners.forEach((e) => {
      e.clear();
    });
  }
  /**
   * Emits an event with the given name and optional data.
   * @template T
   * @param {T} eventName - The name of the event to emit
   * @param {EventData[T]} [data] - The optional data to be passed to the event listeners
   */
  emit(e, t) {
    const r = this.eventListeners.get(e);
    r && r.forEach((n) => n(t));
  }
  /**
   * Connects to WalletConnect.
   * @param {number | string} [_chainId] - Optional chain ID to connect to
   */
  async connectWalletConnect(e) {
    return { clientId: (await this.getWalletConnectConnector().connectWalletConnect()).clientId };
  }
  /**
   * Switches the network.
   * @param {AdapterBlueprint.SwitchNetworkParams} params - Network switching parameters
   */
  async switchNetwork(e) {
    const { caipNetwork: t, providerType: r } = e;
    if (!e.provider)
      return;
    const n = "provider" in e.provider ? e.provider.provider : e.provider;
    if (r === "WALLET_CONNECT") {
      n.setDefaultChain(t.caipNetworkId);
      return;
    }
    if (n && r === "AUTH") {
      const i = n, o = As(t.chainNamespace);
      await i.switchNetwork(t.caipNetworkId);
      const a = await i.getUser({
        chainId: t.caipNetworkId,
        preferredAccountType: o
      });
      this.emit("switchNetwork", a);
    }
  }
  getWalletConnectConnector() {
    const e = this.connectors.find((t) => t instanceof Kp);
    if (!e)
      throw new Error("WalletConnectConnector not found");
    return e;
  }
  /**
   * Handles connect event for a specific connector.
   * @param {string[]} accounts - The accounts that changed
   * @param {string} connectorId - The ID of the connector
   */
  onConnect(e, t) {
    if (e.length > 0) {
      const { address: r, chainId: n } = te.getAccount(e[0]), i = this.getCaipNetworks().filter((a) => a.chainNamespace === this.namespace).find((a) => a.id.toString() === (n == null ? void 0 : n.toString())), o = this.connectors.find((a) => a.id === t);
      r && (this.emit("accountChanged", {
        address: r,
        chainId: n,
        connector: o
      }), this.addConnection({
        connectorId: t,
        accounts: e.map((a) => {
          const { address: c } = te.getAccount(a);
          return { address: c };
        }),
        caipNetwork: i
      }));
    }
  }
  /**
   * Handles accounts changed event for a specific connector.
   * @param {string[]} accounts - The accounts that changed
   * @param {string} connectorId - The ID of the connector
   */
  onAccountsChanged(e, t, r = !0) {
    var n, i;
    if (e.length > 0) {
      const { address: o } = te.getAccount(e[0]), a = (n = this.connectionManager) == null ? void 0 : n.getConnection({
        connectorId: t,
        connections: this.connections,
        connectors: this.connectors
      });
      o && Nt.isLowerCaseMatch(this.getConnectorId(N.CHAIN.EVM), t) && this.emit("accountChanged", {
        address: o,
        chainId: (i = a == null ? void 0 : a.caipNetwork) == null ? void 0 : i.id,
        connector: a == null ? void 0 : a.connector
      }), this.addConnection({
        connectorId: t,
        accounts: e.map((c) => {
          const { address: l } = te.getAccount(c);
          return { address: l };
        }),
        caipNetwork: a == null ? void 0 : a.caipNetwork
      });
    } else r && this.onDisconnect(t);
  }
  /**
   * Handles disconnect event for a specific connector.
   * @param {string} connectorId - The ID of the connector
   */
  onDisconnect(e) {
    this.removeProviderListeners(e), this.deleteConnection(e), Nt.isLowerCaseMatch(this.getConnectorId(N.CHAIN.EVM), e) && this.emitFirstAvailableConnection(), this.connections.length === 0 && this.emit("disconnect");
  }
  /**
   * Handles chain changed event for a specific connector.
   * @param {string} chainId - The ID of the chain that changed
   * @param {string} connectorId - The ID of the connector
   */
  onChainChanged(e, t) {
    var o;
    const r = typeof e == "string" && e.startsWith("0x") ? Uo.hexStringToNumber(e).toString() : e.toString(), n = (o = this.connectionManager) == null ? void 0 : o.getConnection({
      connectorId: t,
      connections: this.connections,
      connectors: this.connectors
    }), i = this.getCaipNetworks().filter((a) => a.chainNamespace === this.namespace).find((a) => a.id.toString() === r);
    n && this.addConnection({
      connectorId: t,
      accounts: n.accounts,
      caipNetwork: i
    }), Nt.isLowerCaseMatch(this.getConnectorId(N.CHAIN.EVM), t) && this.emit("switchNetwork", { chainId: r });
  }
  /**
   * Listens to provider events for a specific connector.
   * @param {string} connectorId - The ID of the connector
   * @param {Provider | CombinedProvider} provider - The provider to listen to
   */
  listenProviderEvents(e, t) {
    if (pN.includes(e))
      return;
    const r = (o) => this.onAccountsChanged(o, e), n = (o) => this.onChainChanged(o, e), i = () => this.onDisconnect(e);
    this.providerHandlers[e] || (t.on("disconnect", i), t.on("accountsChanged", r), t.on("chainChanged", n), this.providerHandlers[e] = {
      provider: t,
      disconnect: i,
      accountsChanged: r,
      chainChanged: n
    });
  }
  /**
   * Removes provider listeners for a specific connector.
   * @param {string} connectorId - The ID of the connector
   */
  removeProviderListeners(e) {
    if (this.providerHandlers[e]) {
      const { provider: t, disconnect: r, accountsChanged: n, chainChanged: i } = this.providerHandlers[e];
      t.removeListener("disconnect", r), t.removeListener("accountsChanged", n), t.removeListener("chainChanged", i), this.providerHandlers[e] = null;
    }
  }
  /**
   * Emits the first available connection.
   */
  emitFirstAvailableConnection() {
    var t, r;
    const e = (t = this.connectionManager) == null ? void 0 : t.getConnection({
      connections: this.connections,
      connectors: this.connectors
    });
    if (e) {
      const [n] = e.accounts;
      this.emit("accountChanged", {
        address: n == null ? void 0 : n.address,
        chainId: (r = e.caipNetwork) == null ? void 0 : r.id,
        connector: e.connector
      });
    }
  }
}
class gN extends fN {
  async setUniversalProvider(e) {
    return this.addConnector(new Kp({
      provider: e,
      caipNetworks: this.getCaipNetworks(),
      namespace: this.namespace
    })), Promise.resolve();
  }
  async connect(e) {
    return Promise.resolve({
      id: "WALLET_CONNECT",
      type: "WALLET_CONNECT",
      chainId: Number(e.chainId),
      provider: this.provider,
      address: ""
    });
  }
  async disconnect() {
    try {
      await this.getWalletConnectConnector().disconnect(), this.emit("disconnect");
    } catch (e) {
      console.warn("UniversalAdapter:disconnect - error", e);
    }
    return { connections: [] };
  }
  syncConnections() {
    return Promise.resolve();
  }
  async getAccounts({ namespace: e }) {
    var n, i, o, a;
    const t = this.provider, r = ((a = (o = (i = (n = t == null ? void 0 : t.session) == null ? void 0 : n.namespaces) == null ? void 0 : i[e]) == null ? void 0 : o.accounts) == null ? void 0 : a.map((c) => {
      const [, , l] = c.split(":");
      return l;
    }).filter((c, l, d) => d.indexOf(c) === l)) || [];
    return Promise.resolve({
      accounts: r.map((c) => te.createAccount(e, c, e === "bip122" ? "payment" : "eoa"))
    });
  }
  async syncConnectors() {
    return Promise.resolve();
  }
  async getBalance(e) {
    var i, o, a, c, l;
    if (!(e.caipNetwork && Ue.BALANCE_SUPPORTED_CHAINS.includes((i = e.caipNetwork) == null ? void 0 : i.chainNamespace)) || (o = e.caipNetwork) != null && o.testnet)
      return {
        balance: "0.00",
        symbol: ((a = e.caipNetwork) == null ? void 0 : a.nativeCurrency.symbol) || ""
      };
    if (X.state.balanceLoading && e.chainId === ((c = f.state.activeCaipNetwork) == null ? void 0 : c.id))
      return {
        balance: X.state.balance || "0.00",
        symbol: X.state.balanceSymbol || ""
      };
    const n = (await X.fetchTokenBalance()).find((d) => {
      var u, p;
      return d.chainId === `${(u = e.caipNetwork) == null ? void 0 : u.chainNamespace}:${e.chainId}` && d.symbol === ((p = e.caipNetwork) == null ? void 0 : p.nativeCurrency.symbol);
    });
    return {
      balance: (n == null ? void 0 : n.quantity.numeric) || "0.00",
      symbol: (n == null ? void 0 : n.symbol) || ((l = e.caipNetwork) == null ? void 0 : l.nativeCurrency.symbol) || ""
    };
  }
  async signMessage(e) {
    var o, a, c;
    const { provider: t, message: r, address: n } = e;
    if (!t)
      throw new Error("UniversalAdapter:signMessage - provider is undefined");
    let i = "";
    return ((o = f.state.activeCaipNetwork) == null ? void 0 : o.chainNamespace) === N.CHAIN.SOLANA ? i = (await t.request({
      method: "solana_signMessage",
      params: {
        message: Wn.encode(new TextEncoder().encode(r)),
        pubkey: n
      }
    }, (a = f.state.activeCaipNetwork) == null ? void 0 : a.caipNetworkId)).signature : i = await t.request({
      method: "personal_sign",
      params: [r, n]
    }, (c = f.state.activeCaipNetwork) == null ? void 0 : c.caipNetworkId), { signature: i };
  }
  // -- Transaction methods ---------------------------------------------------
  /**
   *
   * These methods are supported only on `wagmi` and `ethers` since the Solana SDK does not support them in the same way.
   * These function definition is to have a type parity between the clients. Currently not in use.
   */
  async estimateGas() {
    return Promise.resolve({
      gas: BigInt(0)
    });
  }
  async sendTransaction() {
    return Promise.resolve({
      hash: ""
    });
  }
  walletGetAssets(e) {
    return Promise.resolve({});
  }
  async writeContract() {
    return Promise.resolve({
      hash: ""
    });
  }
  emitFirstAvailableConnection() {
  }
  parseUnits() {
    return 0n;
  }
  formatUnits() {
    return "0";
  }
  async getCapabilities() {
    return Promise.resolve({});
  }
  async grantPermissions() {
    return Promise.resolve({});
  }
  async revokePermissions() {
    return Promise.resolve("0x");
  }
  async syncConnection() {
    return Promise.resolve({
      id: "WALLET_CONNECT",
      type: "WALLET_CONNECT",
      chainId: 1,
      provider: this.provider,
      address: ""
    });
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async switchNetwork(e) {
    var n, i, o, a, c, l;
    const { caipNetwork: t } = e, r = this.getWalletConnectConnector();
    if (t.chainNamespace === N.CHAIN.EVM)
      try {
        await ((n = r.provider) == null ? void 0 : n.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: _l(t.id) }]
        }));
      } catch (d) {
        if (d.code === Pn.ERROR_CODE_UNRECOGNIZED_CHAIN_ID || d.code === Pn.ERROR_INVALID_CHAIN_ID || d.code === Pn.ERROR_CODE_DEFAULT || ((o = (i = d == null ? void 0 : d.data) == null ? void 0 : i.originalError) == null ? void 0 : o.code) === Pn.ERROR_CODE_UNRECOGNIZED_CHAIN_ID)
          try {
            await ((l = r.provider) == null ? void 0 : l.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: _l(t.id),
                  rpcUrls: [(a = t == null ? void 0 : t.rpcUrls.chainDefault) == null ? void 0 : a.http],
                  chainName: t.name,
                  nativeCurrency: t.nativeCurrency,
                  blockExplorerUrls: [(c = t.blockExplorers) == null ? void 0 : c.default.url]
                }
              ]
            }));
          } catch {
            throw new Error("Chain is not supported");
          }
      }
    r.provider.setDefaultChain(t.caipNetworkId);
  }
  getWalletConnectProvider() {
    const e = this.connectors.find((r) => r.type === "WALLET_CONNECT");
    return e == null ? void 0 : e.provider;
  }
}
const mN = [
  "email",
  "socials",
  "swaps",
  "onramp",
  "activity",
  "reownBranding",
  "multiWallet"
], Ao = {
  email: {
    apiFeatureName: "social_login",
    localFeatureName: "email",
    returnType: !1,
    isLegacy: !1,
    isAvailableOnBasic: !1,
    processApi: (s) => {
      if (!(s != null && s.config))
        return !1;
      const e = s.config;
      return !!s.isEnabled && e.includes("email");
    },
    processFallback: (s) => s === void 0 ? Ue.DEFAULT_REMOTE_FEATURES.email : !!s
  },
  socials: {
    apiFeatureName: "social_login",
    localFeatureName: "socials",
    returnType: !1,
    isLegacy: !1,
    isAvailableOnBasic: !1,
    processApi: (s) => {
      if (!(s != null && s.config))
        return !1;
      const e = s.config;
      return s.isEnabled && e.length > 0 ? e.filter((t) => t !== "email") : !1;
    },
    processFallback: (s) => s === void 0 ? Ue.DEFAULT_REMOTE_FEATURES.socials : typeof s == "boolean" ? s ? Ue.DEFAULT_REMOTE_FEATURES.socials : !1 : s
  },
  swaps: {
    apiFeatureName: "swap",
    localFeatureName: "swaps",
    returnType: !1,
    isLegacy: !1,
    isAvailableOnBasic: !1,
    processApi: (s) => {
      if (!(s != null && s.config))
        return !1;
      const e = s.config;
      return s.isEnabled && e.length > 0 ? e : !1;
    },
    processFallback: (s) => s === void 0 ? Ue.DEFAULT_REMOTE_FEATURES.swaps : typeof s == "boolean" ? s ? Ue.DEFAULT_REMOTE_FEATURES.swaps : !1 : s
  },
  onramp: {
    apiFeatureName: "onramp",
    localFeatureName: "onramp",
    returnType: !1,
    isLegacy: !1,
    isAvailableOnBasic: !1,
    processApi: (s) => {
      if (!(s != null && s.config))
        return !1;
      const e = s.config;
      return s.isEnabled && e.length > 0 ? e : !1;
    },
    processFallback: (s) => s === void 0 ? Ue.DEFAULT_REMOTE_FEATURES.onramp : typeof s == "boolean" ? s ? Ue.DEFAULT_REMOTE_FEATURES.onramp : !1 : s
  },
  activity: {
    apiFeatureName: "activity",
    localFeatureName: "history",
    returnType: !1,
    isLegacy: !0,
    isAvailableOnBasic: !1,
    processApi: (s) => !!s.isEnabled,
    processFallback: (s) => s === void 0 ? Ue.DEFAULT_REMOTE_FEATURES.activity : !!s
  },
  reownBranding: {
    apiFeatureName: "reown_branding",
    localFeatureName: "reownBranding",
    returnType: !1,
    isLegacy: !1,
    isAvailableOnBasic: !1,
    processApi: (s) => !!s.isEnabled,
    processFallback: (s) => s === void 0 ? Ue.DEFAULT_REMOTE_FEATURES.reownBranding : !!s
  },
  multiWallet: {
    apiFeatureName: "multi_wallet",
    localFeatureName: "multiWallet",
    returnType: !1,
    isLegacy: !1,
    isAvailableOnBasic: !1,
    processApi: (s) => !!s.isEnabled,
    processFallback: () => Ue.DEFAULT_REMOTE_FEATURES.multiWallet
  }
}, wN = {
  localSettingsOverridden: /* @__PURE__ */ new Set(),
  getApiConfig(s, e) {
    return e == null ? void 0 : e.find((t) => t.id === s);
  },
  addWarning(s, e) {
    if (s !== void 0) {
      const t = Ao[e], r = t.isLegacy ? `"features.${t.localFeatureName}" (now "${e}")` : `"features.${e}"`;
      this.localSettingsOverridden.add(r);
    }
  },
  processFeature(s, e, t, r, n) {
    const i = Ao[s], o = e[i.localFeatureName];
    if (n && !i.isAvailableOnBasic)
      return !1;
    if (r) {
      const a = this.getApiConfig(i.apiFeatureName, t);
      return (a == null ? void 0 : a.config) === null ? this.processFallbackFeature(s, o) : a != null && a.config ? (o !== void 0 && this.addWarning(o, s), this.processApiFeature(s, a)) : !1;
    }
    return this.processFallbackFeature(s, o);
  },
  processApiFeature(s, e) {
    return Ao[s].processApi(e);
  },
  processFallbackFeature(s, e) {
    return Ao[s].processFallback(e);
  },
  async fetchRemoteFeatures(s) {
    const e = s.basic ?? !1, t = s.features || {};
    this.localSettingsOverridden.clear();
    let r = null, n = !1;
    try {
      r = await ne.fetchProjectConfig(), n = r != null;
    } catch (o) {
      console.warn("[Reown Config] Failed to fetch remote project configuration. Using local/default values.", o);
    }
    const i = n && !e ? Ue.DEFAULT_REMOTE_FEATURES : Ue.DEFAULT_REMOTE_FEATURES_DISABLED;
    try {
      for (const o of mN) {
        const a = this.processFeature(o, t, r, n, e);
        Object.assign(i, { [o]: a });
      }
    } catch (o) {
      return console.warn("[Reown Config] Failed to process the configuration from Cloud. Using default values.", o), Ue.DEFAULT_REMOTE_FEATURES;
    }
    if (n && this.localSettingsOverridden.size > 0) {
      const o = `Your local configuration for ${Array.from(this.localSettingsOverridden).join(", ")} was ignored because a remote configuration was successfully fetched. Please manage these features via your project dashboard on dashboard.reown.com.`;
      rt.open({
        shortMessage: "Local configuration ignored",
        longMessage: `[Reown Config Notice] ${o}`
      }, "warning");
    }
    return i;
  }
};
class yN {
  constructor(e) {
    this.chainNamespaces = [], this.remoteFeatures = {}, this.reportedAlertErrors = {}, this.getCaipNetwork = (t, r) => {
      var n, i, o, a;
      if (t) {
        const c = (i = (n = f.getNetworkData(t)) == null ? void 0 : n.requestedCaipNetworks) == null ? void 0 : i.find((u) => u.id === r);
        if (c)
          return c;
        const l = (o = f.getNetworkData(t)) == null ? void 0 : o.caipNetwork;
        return l || ((a = f.getRequestedCaipNetworks(t).filter((u) => u.chainNamespace === t)) == null ? void 0 : a[0]);
      }
      return f.state.activeCaipNetwork || this.defaultCaipNetwork;
    }, this.getCaipNetworkId = () => {
      const t = this.getCaipNetwork();
      if (t)
        return t.id;
    }, this.getCaipNetworks = (t) => f.getCaipNetworks(t), this.getActiveChainNamespace = () => f.state.activeChain, this.setRequestedCaipNetworks = (t, r) => {
      f.setRequestedCaipNetworks(t, r);
    }, this.getApprovedCaipNetworkIds = () => f.getAllApprovedCaipNetworkIds(), this.getCaipAddress = (t) => f.state.activeChain === t || !t ? f.state.activeCaipAddress : f.getAccountProp("caipAddress", t), this.setClientId = (t) => {
      ae.setClientId(t);
    }, this.getProvider = (t) => Be.getProvider(t), this.getProviderType = (t) => Be.getProviderId(t), this.getPreferredAccountType = (t) => As(t), this.setCaipAddress = (t, r) => {
      X.setCaipAddress(t, r);
    }, this.setBalance = (t, r, n) => {
      X.setBalance(t, r, n);
    }, this.setProfileName = (t, r) => {
      X.setProfileName(t, r);
    }, this.setProfileImage = (t, r) => {
      X.setProfileImage(t, r);
    }, this.setUser = (t, r) => {
      X.setUser(t, r);
    }, this.resetAccount = (t) => {
      X.resetAccount(t);
    }, this.setCaipNetwork = (t) => {
      f.setActiveCaipNetwork(t);
    }, this.setCaipNetworkOfNamespace = (t, r) => {
      f.setChainNetworkData(r, { caipNetwork: t });
    }, this.setStatus = (t, r) => {
      X.setStatus(t, r), F.isConnected() ? $.setConnectionStatus("connected") : $.setConnectionStatus("disconnected");
    }, this.getAddressByChainNamespace = (t) => f.getAccountProp("address", t), this.setConnectors = (t) => {
      const r = [...F.state.allConnectors, ...t];
      F.setConnectors(r);
    }, this.setConnections = (t, r) => {
      $.setConnections(t, r), q.setConnections(t, r);
    }, this.fetchIdentity = (t) => ae.fetchIdentity(t), this.getReownName = (t) => bi.getNamesForAddress(t), this.getConnectors = () => F.getConnectors(), this.getConnectorImage = (t) => Mu.getConnectorImage(t), this.getConnections = (t) => this.remoteFeatures.multiWallet ? Bo.getConnectionsData(t).connections : (rt.open(N.REMOTE_FEATURES_ALERTS.MULTI_WALLET_NOT_ENABLED.DEFAULT, "info"), []), this.getRecentConnections = (t) => this.remoteFeatures.multiWallet ? Bo.getConnectionsData(t).recentConnections : (rt.open(N.REMOTE_FEATURES_ALERTS.MULTI_WALLET_NOT_ENABLED.DEFAULT, "info"), []), this.switchConnection = async (t) => {
      if (!this.remoteFeatures.multiWallet) {
        rt.open(N.REMOTE_FEATURES_ALERTS.MULTI_WALLET_NOT_ENABLED.DEFAULT, "info");
        return;
      }
      await q.switchConnection(t);
    }, this.deleteConnection = (t) => {
      if (!this.remoteFeatures.multiWallet) {
        rt.open(N.REMOTE_FEATURES_ALERTS.MULTI_WALLET_NOT_ENABLED.DEFAULT, "info");
        return;
      }
      $.deleteAddressFromConnection(t), q.syncStorageConnections();
    }, this.setConnectedWalletInfo = (t, r) => {
      const n = Be.getProviderId(r), i = t ? { ...t, type: n } : void 0;
      X.setConnectedWalletInfo(i, r);
    }, this.getIsConnectedState = () => !!f.state.activeCaipAddress, this.addAddressLabel = (t, r, n) => {
      X.addAddressLabel(t, r, n);
    }, this.removeAddressLabel = (t, r) => {
      X.removeAddressLabel(t, r);
    }, this.getAddress = (t) => f.state.activeChain === t || !t ? X.state.address : f.getAccountProp("address", t), this.setApprovedCaipNetworksData = (t) => f.setApprovedCaipNetworksData(t), this.resetNetwork = (t) => {
      f.resetNetwork(t);
    }, this.addConnector = (t) => {
      F.addConnector(t);
    }, this.resetWcConnection = () => {
      q.resetWcConnection();
    }, this.setAddressExplorerUrl = (t, r) => {
      X.setAddressExplorerUrl(t, r);
    }, this.setSmartAccountDeployed = (t, r) => {
      X.setSmartAccountDeployed(t, r);
    }, this.setPreferredAccountType = (t, r) => {
      f.setAccountProp("preferredAccountType", t, r);
    }, this.setEIP6963Enabled = (t) => {
      S.setEIP6963Enabled(t);
    }, this.handleUnsafeRPCRequest = () => {
      if (this.isOpen()) {
        if (this.isTransactionStackEmpty())
          return;
        this.redirect("ApproveTransaction");
      } else
        this.open({ view: "ApproveTransaction" });
    }, this.options = e, this.version = e.sdkVersion, this.caipNetworks = this.extendCaipNetworks(e), this.chainNamespaces = this.getChainNamespacesSet(e.adapters, this.caipNetworks), this.defaultCaipNetwork = this.extendDefaultCaipNetwork(e), this.chainAdapters = this.createAdapters(e.adapters), this.readyPromise = this.initialize(e);
  }
  getChainNamespacesSet(e, t) {
    const r = e == null ? void 0 : e.map((i) => i.namespace).filter((i) => !!i);
    if (r != null && r.length)
      return [...new Set(r)];
    const n = t == null ? void 0 : t.map((i) => i.chainNamespace);
    return [...new Set(n)];
  }
  async initialize(e) {
    var t, r, n;
    this.initializeProjectSettings(e), this.initControllers(e), await this.initChainAdapters(), this.sendInitializeEvent(e), S.state.enableReconnect ? (await this.syncExistingConnection(), await this.syncAdapterConnections()) : await this.unSyncExistingConnection(), this.remoteFeatures = await wN.fetchRemoteFeatures(e), S.setRemoteFeatures(this.remoteFeatures), this.remoteFeatures.onramp && sc.setOnrampProviders(this.remoteFeatures.onramp), ((t = S.state.remoteFeatures) != null && t.email || Array.isArray((r = S.state.remoteFeatures) == null ? void 0 : r.socials) && ((n = S.state.remoteFeatures) == null ? void 0 : n.socials.length) > 0) && await this.checkAllowedOrigins();
  }
  async checkAllowedOrigins() {
    try {
      const e = await ne.fetchAllowedOrigins();
      if (!e || !te.isClient()) {
        rt.open(St.ALERT_ERRORS.PROJECT_ID_NOT_CONFIGURED, "error");
        return;
      }
      const t = window.location.origin;
      Ms.isOriginAllowed(t, e, Pn.DEFAULT_ALLOWED_ANCESTORS) || rt.open(St.ALERT_ERRORS.INVALID_APP_CONFIGURATION, "error");
    } catch (e) {
      if (!(e instanceof Error)) {
        rt.open(St.ALERT_ERRORS.PROJECT_ID_NOT_CONFIGURED, "error");
        return;
      }
      switch (e.message) {
        case "RATE_LIMITED":
          rt.open(St.ALERT_ERRORS.RATE_LIMITED_APP_CONFIGURATION, "error");
          break;
        case "SERVER_ERROR": {
          const t = e.cause instanceof Error ? e.cause : e;
          rt.open({
            shortMessage: St.ALERT_ERRORS.SERVER_ERROR_APP_CONFIGURATION.shortMessage,
            longMessage: St.ALERT_ERRORS.SERVER_ERROR_APP_CONFIGURATION.longMessage(t.message)
          }, "error");
          break;
        }
        default:
          rt.open(St.ALERT_ERRORS.PROJECT_ID_NOT_CONFIGURED, "error");
      }
    }
  }
  sendInitializeEvent(e) {
    var r;
    const { ...t } = e;
    delete t.adapters, delete t.universalProvider, $e.sendEvent({
      type: "track",
      event: "INITIALIZE",
      properties: {
        ...t,
        networks: e.networks.map((n) => n.id),
        siweConfig: {
          options: ((r = e.siweConfig) == null ? void 0 : r.options) || {}
        }
      }
    });
  }
  // -- Controllers initialization ---------------------------------------------------
  initControllers(e) {
    this.initializeOptionsController(e), this.initializeChainController(e), this.initializeThemeController(e), this.initializeConnectionController(e), this.initializeConnectorController();
  }
  initializeThemeController(e) {
    e.themeMode && Mt.setThemeMode(e.themeMode), e.themeVariables && Mt.setThemeVariables(e.themeVariables);
  }
  initializeChainController(e) {
    if (!this.connectionControllerClient || !this.networkControllerClient)
      throw new Error("ConnectionControllerClient and NetworkControllerClient must be set");
    f.initialize(e.adapters ?? [], this.caipNetworks, {
      connectionControllerClient: this.connectionControllerClient,
      networkControllerClient: this.networkControllerClient
    });
    const t = this.getDefaultNetwork();
    t && f.setActiveCaipNetwork(t);
  }
  initializeConnectionController(e) {
    q.initialize(e.adapters ?? []), q.setWcBasic(e.basic ?? !1);
  }
  initializeConnectorController() {
    F.initialize(this.chainNamespaces);
  }
  initializeProjectSettings(e) {
    S.setProjectId(e.projectId), S.setSdkVersion(e.sdkVersion);
  }
  initializeOptionsController(e) {
    var n;
    S.setDebug(e.debug !== !1), S.setEnableWalletConnect(e.enableWalletConnect !== !1), S.setEnableWalletGuide(e.enableWalletGuide !== !1), S.setEnableWallets(e.enableWallets !== !1), S.setEIP6963Enabled(e.enableEIP6963 !== !1), S.setEnableNetworkSwitch(e.enableNetworkSwitch !== !1), S.setEnableReconnect(e.enableReconnect !== !1), S.setEnableAuthLogger(e.enableAuthLogger !== !1), S.setCustomRpcUrls(e.customRpcUrls), S.setEnableEmbedded(e.enableEmbedded), S.setAllWallets(e.allWallets), S.setIncludeWalletIds(e.includeWalletIds), S.setExcludeWalletIds(e.excludeWalletIds), S.setFeaturedWalletIds(e.featuredWalletIds), S.setTokens(e.tokens), S.setTermsConditionsUrl(e.termsConditionsUrl), S.setPrivacyPolicyUrl(e.privacyPolicyUrl), S.setCustomWallets(e.customWallets), S.setFeatures(e.features), S.setAllowUnsupportedChain(e.allowUnsupportedChain), S.setUniversalProviderConfigOverride(e.universalProviderConfigOverride), S.setPreferUniversalLinks(e.experimental_preferUniversalLinks), S.setDefaultAccountTypes(e.defaultAccountTypes);
    const t = this.getDefaultMetaData();
    if (!e.metadata && t && (e.metadata = t), S.setMetadata(e.metadata), S.setDisableAppend(e.disableAppend), S.setEnableEmbedded(e.enableEmbedded), S.setSIWX(e.siwx), !e.projectId) {
      rt.open(St.ALERT_ERRORS.PROJECT_ID_NOT_CONFIGURED, "error");
      return;
    }
    if (((n = e.adapters) == null ? void 0 : n.find((i) => i.namespace === N.CHAIN.EVM)) && e.siweConfig) {
      if (e.siwx)
        throw new Error("Cannot set both `siweConfig` and `siwx` options");
      S.setSIWX(e.siweConfig.mapToSIWX());
    }
  }
  getDefaultMetaData() {
    var e, t, r, n;
    return te.isClient() ? {
      name: ((t = (e = document.getElementsByTagName("title")) == null ? void 0 : e[0]) == null ? void 0 : t.textContent) || "",
      description: ((r = document.querySelector('meta[property="og:description"]')) == null ? void 0 : r.content) || "",
      url: window.location.origin,
      icons: [((n = document.querySelector('link[rel~="icon"]')) == null ? void 0 : n.href) || ""]
    } : null;
  }
  // -- Network Initialization ---------------------------------------------------
  setUnsupportedNetwork(e) {
    const t = this.getActiveChainNamespace();
    if (t) {
      const r = An.getUnsupportedNetwork(`${t}:${e}`);
      f.setActiveCaipNetwork(r);
    }
  }
  getDefaultNetwork() {
    return An.getCaipNetworkFromStorage(this.defaultCaipNetwork);
  }
  extendCaipNetwork(e, t) {
    return An.extendCaipNetwork(e, {
      customNetworkImageUrls: t.chainImages,
      projectId: t.projectId
    });
  }
  extendCaipNetworks(e) {
    return An.extendCaipNetworks(e.networks, {
      customNetworkImageUrls: e.chainImages,
      customRpcUrls: e.customRpcUrls,
      projectId: e.projectId
    });
  }
  extendDefaultCaipNetwork(e) {
    const t = e.networks.find((n) => {
      var i;
      return n.id === ((i = e.defaultNetwork) == null ? void 0 : i.id);
    });
    return t ? An.extendCaipNetwork(t, {
      customNetworkImageUrls: e.chainImages,
      customRpcUrls: e.customRpcUrls,
      projectId: e.projectId
    }) : void 0;
  }
  async disconnectNamespace(e, t) {
    try {
      this.setLoading(!0, e);
      let r = {
        connections: []
      };
      const n = this.getAdapter(e), { caipAddress: i } = f.getAccountData(e) || {};
      return (i || !S.state.enableReconnect) && (n != null && n.disconnect) && (r = await n.disconnect({ id: t })), this.setLoading(!1, e), r;
    } catch (r) {
      throw this.setLoading(!1, e), new Error(`Failed to disconnect chains: ${r.message}`);
    }
  }
  // -- Client Initialization ---------------------------------------------------
  createClients() {
    this.connectionControllerClient = {
      connectWalletConnect: async () => {
        var l;
        const e = f.state.activeChain, t = this.getAdapter(e), r = (l = this.getCaipNetwork(e)) == null ? void 0 : l.id, n = q.getConnections(e), i = this.remoteFeatures.multiWallet, o = n.length > 0;
        if (!t)
          throw new Error("Adapter not found");
        const a = await t.connectWalletConnect(r);
        (!o || !i) && this.close(), this.setClientId((a == null ? void 0 : a.clientId) || null), $.setConnectedNamespaces([...f.state.chains.keys()]), await this.syncWalletConnectAccount(), await xn.initializeIfEnabled();
      },
      connectExternal: async ({ id: e, address: t, info: r, type: n, provider: i, chain: o, caipNetwork: a, socialUri: c }) => {
        var w, m, y, C, _, U;
        const l = f.state.activeChain, d = o || l, u = this.getAdapter(d);
        if (o && o !== l && !a) {
          const j = this.getCaipNetworks().find((P) => P.chainNamespace === o);
          j && this.setCaipNetwork(j);
        }
        if (!u)
          throw new Error("Adapter not found");
        const p = this.getCaipNetwork(d), g = await u.connect({
          id: e,
          address: t,
          info: r,
          type: n,
          provider: i,
          socialUri: c,
          chainId: (a == null ? void 0 : a.id) || (p == null ? void 0 : p.id),
          rpcUrl: ((y = (m = (w = a == null ? void 0 : a.rpcUrls) == null ? void 0 : w.default) == null ? void 0 : m.http) == null ? void 0 : y[0]) || ((U = (_ = (C = p == null ? void 0 : p.rpcUrls) == null ? void 0 : C.default) == null ? void 0 : _.http) == null ? void 0 : U[0])
        });
        if (g)
          return $.addConnectedNamespace(d), this.syncProvider({ ...g, chainNamespace: d }), this.setStatus("connected", d), this.syncConnectedWalletInfo(d), $.removeDisconnectedConnectorId(e, d), { address: g.address };
      },
      reconnectExternal: async ({ id: e, info: t, type: r, provider: n }) => {
        var a;
        const i = f.state.activeChain, o = this.getAdapter(i);
        o != null && o.reconnect && (await (o == null ? void 0 : o.reconnect({ id: e, info: t, type: r, provider: n, chainId: (a = this.getCaipNetwork()) == null ? void 0 : a.id })), $.addConnectedNamespace(i), this.syncConnectedWalletInfo(i));
      },
      disconnect: async (e) => {
        const { id: t, chainNamespace: r, initialDisconnect: n } = e || {}, i = Array.from(f.state.chains.keys()), o = F.getConnectorId(r || f.state.activeChain), a = t === N.CONNECTOR_ID.AUTH || o === N.CONNECTOR_ID.AUTH, c = t === N.CONNECTOR_ID.WALLET_CONNECT || o === N.CONNECTOR_ID.WALLET_CONNECT;
        try {
          let l = r ? [r] : i;
          (c || a) && (l = i);
          const d = l.map(async (g) => {
            let w = t;
            (c || a) && !t && (w = o), n && a && ($.deleteConnectedSocialProvider(), l.forEach((y) => {
              $.addDisconnectedConnectorId(w || "", y);
            }));
            const m = await this.disconnectNamespace(g, w);
            m && m.connections.forEach((y) => {
              y.connectorId === N.CONNECTOR_ID.AUTH && $.deleteConnectedSocialProvider(), $.addDisconnectedConnectorId(y.connectorId, g);
            }), n && this.onDisconnectNamespace({ chainNamespace: g, closeModal: !1 });
          }), u = await Promise.allSettled(d);
          xe.resetSend(), q.resetWcConnection(), await xn.clearSessions(), F.setFilterByNamespace(void 0), q.syncStorageConnections();
          const p = u.filter((g) => g.status === "rejected");
          if (p.length > 0)
            throw new Error(p.map((g) => g.reason.message).join(", "));
          $e.sendEvent({
            type: "track",
            event: "DISCONNECT_SUCCESS",
            properties: {
              namespace: r || "all"
            }
          });
        } catch (l) {
          throw new Error(`Failed to disconnect chains: ${l.message}`);
        }
      },
      checkInstalled: (e) => e ? e.some((t) => {
        var r;
        return !!((r = window.ethereum) != null && r[String(t)]);
      }) : !!window.ethereum,
      signMessage: async (e) => {
        const t = this.getAdapter(f.state.activeChain), r = await (t == null ? void 0 : t.signMessage({
          message: e,
          address: X.state.address,
          provider: Be.getProvider(f.state.activeChain)
        }));
        return (r == null ? void 0 : r.signature) || "";
      },
      sendTransaction: async (e) => {
        const t = e.chainNamespace;
        if (Ue.SEND_SUPPORTED_NAMESPACES.includes(t)) {
          const r = this.getAdapter(f.state.activeChain), n = Be.getProvider(t), i = await (r == null ? void 0 : r.sendTransaction({
            ...e,
            caipNetwork: this.getCaipNetwork(),
            provider: n
          }));
          return (i == null ? void 0 : i.hash) || "";
        }
        return "";
      },
      estimateGas: async (e) => {
        if (e.chainNamespace === N.CHAIN.EVM) {
          const t = this.getAdapter(f.state.activeChain), r = Be.getProvider(f.state.activeChain), n = this.getCaipNetwork();
          if (!n)
            throw new Error("CaipNetwork is undefined");
          const i = await (t == null ? void 0 : t.estimateGas({
            ...e,
            provider: r,
            caipNetwork: n
          }));
          return (i == null ? void 0 : i.gas) || 0n;
        }
        return 0n;
      },
      getEnsAvatar: async () => {
        var e;
        return await this.syncIdentity({
          address: X.state.address,
          chainId: Number((e = this.getCaipNetwork()) == null ? void 0 : e.id),
          chainNamespace: f.state.activeChain
        }), X.state.profileImage || !1;
      },
      getEnsAddress: async (e) => await Ms.resolveReownName(e),
      writeContract: async (e) => {
        const t = this.getAdapter(f.state.activeChain), r = this.getCaipNetwork(), n = this.getCaipAddress(), i = Be.getProvider(f.state.activeChain);
        if (!r || !n)
          throw new Error("CaipNetwork or CaipAddress is undefined");
        const o = await (t == null ? void 0 : t.writeContract({ ...e, caipNetwork: r, provider: i, caipAddress: n }));
        return o == null ? void 0 : o.hash;
      },
      parseUnits: (e, t) => {
        const r = this.getAdapter(f.state.activeChain);
        return (r == null ? void 0 : r.parseUnits({ value: e, decimals: t })) ?? 0n;
      },
      formatUnits: (e, t) => {
        const r = this.getAdapter(f.state.activeChain);
        return (r == null ? void 0 : r.formatUnits({ value: e, decimals: t })) ?? "0";
      },
      getCapabilities: async (e) => {
        const t = this.getAdapter(f.state.activeChain);
        return await (t == null ? void 0 : t.getCapabilities(e));
      },
      grantPermissions: async (e) => {
        const t = this.getAdapter(f.state.activeChain);
        return await (t == null ? void 0 : t.grantPermissions(e));
      },
      revokePermissions: async (e) => {
        const t = this.getAdapter(f.state.activeChain);
        return t != null && t.revokePermissions ? await t.revokePermissions(e) : "0x";
      },
      walletGetAssets: async (e) => {
        const t = this.getAdapter(f.state.activeChain);
        return await (t == null ? void 0 : t.walletGetAssets(e)) ?? {};
      },
      updateBalance: (e) => {
        const t = this.getCaipNetwork(e);
        !t || !X.state.address || this.updateNativeBalance(X.state.address, t == null ? void 0 : t.id, e);
      }
    }, this.networkControllerClient = {
      switchCaipNetwork: async (e) => await this.switchCaipNetwork(e),
      // eslint-disable-next-line @typescript-eslint/require-await
      getApprovedCaipNetworksData: async () => this.getApprovedCaipNetworksData()
    }, q.setClient(this.connectionControllerClient);
  }
  getApprovedCaipNetworksData() {
    var t, r, n, i, o;
    if (Be.getProviderId(f.state.activeChain) === Gt.CONNECTOR_TYPE_WALLET_CONNECT) {
      const a = (r = (t = this.universalProvider) == null ? void 0 : t.session) == null ? void 0 : r.namespaces;
      return {
        /*
         * MetaMask Wallet only returns 1 namespace in the session object. This makes it imposible
         * to switch to other networks. Setting supportsAllNetworks to true for MetaMask Wallet
         * will make it possible to switch to other networks.
         */
        supportsAllNetworks: ((o = (i = (n = this.universalProvider) == null ? void 0 : n.session) == null ? void 0 : i.peer) == null ? void 0 : o.metadata.name) === "MetaMask Wallet",
        approvedCaipNetworkIds: this.getChainsFromNamespaces(a)
      };
    }
    return { supportsAllNetworks: !0, approvedCaipNetworkIds: [] };
  }
  async switchCaipNetwork(e) {
    if (!e)
      return;
    const t = e.chainNamespace;
    if (this.getAddressByChainNamespace(e.chainNamespace)) {
      const n = Be.getProvider(t), i = Be.getProviderId(t);
      if (e.chainNamespace === f.state.activeChain) {
        const o = this.getAdapter(t);
        await (o == null ? void 0 : o.switchNetwork({ caipNetwork: e, provider: n, providerType: i }));
      } else if (this.setCaipNetwork(e), i === Gt.CONNECTOR_TYPE_WALLET_CONNECT)
        this.syncWalletConnectAccount();
      else {
        const o = this.getAddressByChainNamespace(t);
        o && this.syncAccount({
          address: o,
          chainId: e.id,
          chainNamespace: t
        });
      }
    } else
      this.setCaipNetwork(e);
  }
  getChainsFromNamespaces(e = {}) {
    return Object.values(e).flatMap((t) => {
      const r = t.chains || [], n = t.accounts.map((i) => {
        const { chainId: o, chainNamespace: a } = Kt.parseCaipAddress(i);
        return `${a}:${o}`;
      });
      return Array.from(/* @__PURE__ */ new Set([...r, ...n]));
    });
  }
  // -- Adapter Initialization ---------------------------------------------------
  createAdapters(e) {
    return this.createClients(), this.chainNamespaces.reduce((t, r) => {
      var i;
      const n = e == null ? void 0 : e.find((o) => o.namespace === r);
      return n ? (n.construct({
        namespace: r,
        projectId: (i = this.options) == null ? void 0 : i.projectId,
        networks: this.getCaipNetworks()
      }), t[r] = n) : t[r] = new gN({
        namespace: r,
        networks: this.getCaipNetworks()
      }), t;
    }, {});
  }
  async initChainAdapter(e) {
    var t;
    this.onConnectors(e), this.listenAdapter(e), await ((t = this.chainAdapters) == null ? void 0 : t[e].syncConnectors(this.options, this)), await this.createUniversalProviderForAdapter(e);
  }
  async initChainAdapters() {
    await Promise.all(this.chainNamespaces.map(async (e) => {
      await this.initChainAdapter(e);
    }));
  }
  onConnectors(e) {
    const t = this.getAdapter(e);
    t == null || t.on("connectors", this.setConnectors.bind(this));
  }
  listenAdapter(e) {
    const t = this.getAdapter(e);
    if (!t)
      return;
    const r = $.getConnectionStatus();
    S.state.enableReconnect === !1 ? this.setStatus("disconnected", e) : r === "connected" ? this.setStatus("connecting", e) : r === "disconnected" ? ($.clearAddressCache(), this.setStatus(r, e)) : this.setStatus(r, e), t.on("switchNetwork", ({ address: n, chainId: i }) => {
      const o = this.getCaipNetworks().find((l) => l.id.toString() === i.toString() || l.caipNetworkId.toString() === i.toString()), a = f.state.activeChain === e, c = f.getAccountProp("address", e);
      if (o) {
        const l = a && n ? n : c;
        l && this.syncAccount({ address: l, chainId: o.id, chainNamespace: e });
      } else
        this.setUnsupportedNetwork(i);
    }), t.on("disconnect", () => {
      this.onDisconnectNamespace({ chainNamespace: e });
    }), t.on("connections", (n) => {
      this.setConnections(n, e);
    }), t.on("pendingTransactions", () => {
      const n = X.state.address, i = f.state.activeCaipNetwork;
      !n || !(i != null && i.id) || this.updateNativeBalance(n, i.id, i.chainNamespace);
    }), t.on("accountChanged", ({ address: n, chainId: i, connector: o }) => {
      var c, l;
      const a = f.state.activeChain === e;
      o != null && o.provider && (this.syncProvider({
        id: o.id,
        type: o.type,
        provider: o.provider,
        chainNamespace: e
      }), this.syncConnectedWalletInfo(e)), a && i ? this.syncAccount({
        address: n,
        chainId: i,
        chainNamespace: e
      }) : a && ((c = f.state.activeCaipNetwork) != null && c.id) ? this.syncAccount({
        address: n,
        chainId: (l = f.state.activeCaipNetwork) == null ? void 0 : l.id,
        chainNamespace: e
      }) : this.syncAccountInfo(n, i, e), $.addConnectedNamespace(e);
    });
  }
  async createUniversalProviderForAdapter(e) {
    var t, r, n;
    await this.getUniversalProvider(), this.universalProvider && await ((n = (r = (t = this.chainAdapters) == null ? void 0 : t[e]) == null ? void 0 : r.setUniversalProvider) == null ? void 0 : n.call(r, this.universalProvider));
  }
  // -- Connection Sync ---------------------------------------------------
  async syncExistingConnection() {
    await Promise.allSettled(this.chainNamespaces.map((e) => this.syncNamespaceConnection(e)));
  }
  async unSyncExistingConnection() {
    try {
      await Promise.allSettled(this.chainNamespaces.map((e) => q.disconnect({ namespace: e, initialDisconnect: !0 })));
    } catch (e) {
      console.error("Error disconnecting existing connections:", e);
    }
  }
  async syncNamespaceConnection(e) {
    try {
      e === N.CHAIN.EVM && te.isSafeApp() && F.setConnectorId(N.CONNECTOR_ID.SAFE, e);
      const t = F.getConnectorId(e);
      switch (this.setStatus("connecting", e), t) {
        case N.CONNECTOR_ID.WALLET_CONNECT:
          await this.syncWalletConnectAccount();
          break;
        case N.CONNECTOR_ID.AUTH:
          break;
        default:
          await this.syncAdapterConnection(e);
      }
    } catch (t) {
      console.warn("AppKit couldn't sync existing connection", t), this.setStatus("disconnected", e);
    }
  }
  onDisconnectNamespace(e) {
    const { chainNamespace: t, closeModal: r } = e || {};
    f.resetAccount(t), f.resetNetwork(t), F.removeConnectorId(t), $.removeConnectedNamespace(t), Be.resetChain(t), this.setUser(void 0, t), this.setStatus("disconnected", t), this.setConnectedWalletInfo(void 0, t), r !== !1 && Re.close();
  }
  async syncAdapterConnections() {
    await Promise.allSettled(this.chainNamespaces.map((e) => {
      var n;
      const t = this.getCaipAddress(e), r = this.getCaipNetwork(e);
      return (n = this.chainAdapters) == null ? void 0 : n[e].syncConnections({
        connectToFirstConnector: !t,
        caipNetwork: r,
        getConnectorStorageInfo(i) {
          const a = $.getConnections()[e] ?? [];
          return {
            hasDisconnected: $.isConnectorDisconnected(i, e),
            hasConnected: a.some((c) => Nt.isLowerCaseMatch(c.connectorId, i))
          };
        }
      });
    }));
  }
  async syncAdapterConnection(e) {
    var a, c, l;
    const t = this.getAdapter(e), r = F.getConnectorId(e), n = this.getCaipNetwork(e), o = F.getConnectors(e).find((d) => d.id === r);
    try {
      if (!t || !o)
        throw new Error(`Adapter or connector not found for namespace ${e}`);
      if (!(n != null && n.id))
        throw new Error("CaipNetwork not found");
      const d = await (t == null ? void 0 : t.syncConnection({
        namespace: e,
        id: o.id,
        chainId: n.id,
        rpcUrl: (l = (c = (a = n == null ? void 0 : n.rpcUrls) == null ? void 0 : a.default) == null ? void 0 : c.http) == null ? void 0 : l[0]
      }));
      d ? (this.syncProvider({ ...d, chainNamespace: e }), await this.syncAccount({ ...d, chainNamespace: e }), this.setStatus("connected", e)) : this.setStatus("disconnected", e);
    } catch {
      this.onDisconnectNamespace({ chainNamespace: e, closeModal: !1 });
    }
  }
  async syncWalletConnectAccount() {
    var r, n;
    const e = Object.keys(((n = (r = this.universalProvider) == null ? void 0 : r.session) == null ? void 0 : n.namespaces) || {}), t = this.chainNamespaces.map(async (i) => {
      var d, u, p, g, w;
      const o = this.getAdapter(i), a = ((g = (p = (u = (d = this.universalProvider) == null ? void 0 : d.session) == null ? void 0 : u.namespaces) == null ? void 0 : p[i]) == null ? void 0 : g.accounts) || [], c = (w = f.state.activeCaipNetwork) == null ? void 0 : w.id, l = a.find((m) => {
        const { chainId: y } = Kt.parseCaipAddress(m);
        return y === (c == null ? void 0 : c.toString());
      }) || a[0];
      if (l) {
        const m = Kt.validateCaipAddress(l), { chainId: y, address: C } = Kt.parseCaipAddress(m);
        if (Be.setProviderId(i, Gt.CONNECTOR_TYPE_WALLET_CONNECT), this.caipNetworks && f.state.activeCaipNetwork && (o == null ? void 0 : o.namespace) !== N.CHAIN.EVM) {
          const _ = o == null ? void 0 : o.getWalletConnectProvider({
            caipNetworks: this.getCaipNetworks(),
            provider: this.universalProvider,
            activeCaipNetwork: f.state.activeCaipNetwork
          });
          Be.setProvider(i, _);
        } else
          Be.setProvider(i, this.universalProvider);
        F.setConnectorId(N.CONNECTOR_ID.WALLET_CONNECT, i), $.addConnectedNamespace(i), await this.syncAccount({
          address: C,
          chainId: y,
          chainNamespace: i
        });
      } else e.includes(i) && this.setStatus("disconnected", i);
      this.syncConnectedWalletInfo(i), await f.setApprovedCaipNetworksData(i);
    });
    await Promise.all(t);
  }
  syncProvider({ type: e, provider: t, id: r, chainNamespace: n }) {
    Be.setProviderId(n, e), Be.setProvider(n, t), F.setConnectorId(r, n);
  }
  async syncAccount(e) {
    var u, p;
    const t = e.chainNamespace === f.state.activeChain, r = f.getCaipNetworkByNamespace(e.chainNamespace, e.chainId), { address: n, chainId: i, chainNamespace: o } = e, { chainId: a } = $.getActiveNetworkProps(), c = i || a, l = ((u = f.state.activeCaipNetwork) == null ? void 0 : u.name) === N.UNSUPPORTED_NETWORK_NAME, d = f.getNetworkProp("supportsAllNetworks", o);
    if (this.setStatus("connected", o), !(l && !d) && c) {
      let g = this.getCaipNetworks().find((y) => y.id.toString() === c.toString()), w = this.getCaipNetworks().find((y) => y.chainNamespace === o);
      if (!d && !g && !w) {
        const y = this.getApprovedCaipNetworkIds() || [], C = y.find((U) => {
          var j;
          return ((j = Kt.parseCaipNetworkId(U)) == null ? void 0 : j.chainId) === c.toString();
        }), _ = y.find((U) => {
          var j;
          return ((j = Kt.parseCaipNetworkId(U)) == null ? void 0 : j.chainNamespace) === o;
        });
        g = this.getCaipNetworks().find((U) => U.caipNetworkId === C), w = this.getCaipNetworks().find((U) => U.caipNetworkId === _ || // This is a workaround used in Solana network to support deprecated caipNetworkId
        "deprecatedCaipNetworkId" in U && U.deprecatedCaipNetworkId === _);
      }
      const m = g || w;
      (m == null ? void 0 : m.chainNamespace) === f.state.activeChain ? S.state.enableNetworkSwitch && !S.state.allowUnsupportedChain && ((p = f.state.activeCaipNetwork) == null ? void 0 : p.name) === N.UNSUPPORTED_NETWORK_NAME ? f.showUnsupportedChainUI() : this.setCaipNetwork(m) : t || r && this.setCaipNetworkOfNamespace(r, o), this.syncConnectedWalletInfo(o), Nt.isLowerCaseMatch(n, X.state.address) || this.syncAccountInfo(n, m == null ? void 0 : m.id, o), t ? await this.syncBalance({ address: n, chainId: m == null ? void 0 : m.id, chainNamespace: o }) : await this.syncBalance({ address: n, chainId: r == null ? void 0 : r.id, chainNamespace: o });
    }
  }
  async syncAccountInfo(e, t, r) {
    const n = this.getCaipAddress(r), i = t || (n == null ? void 0 : n.split(":")[1]);
    if (!i)
      return;
    const o = `${r}:${i}:${e}`;
    this.setCaipAddress(o, r), await this.syncIdentity({
      address: e,
      chainId: i,
      chainNamespace: r
    });
  }
  async syncReownName(e, t) {
    try {
      const r = await this.getReownName(e);
      if (r[0]) {
        const n = r[0];
        this.setProfileName(n.name, t);
      } else
        this.setProfileName(null, t);
    } catch {
      this.setProfileName(null, t);
    }
  }
  syncConnectedWalletInfo(e) {
    var n;
    const t = F.getConnectorId(e), r = Be.getProviderId(e);
    if (r === Gt.CONNECTOR_TYPE_ANNOUNCED || r === Gt.CONNECTOR_TYPE_INJECTED) {
      if (t) {
        const i = this.getConnectors().find((o) => {
          var d, u;
          const a = o.id === t, c = ((d = o.info) == null ? void 0 : d.rdns) === t, l = (u = o.connectors) == null ? void 0 : u.some((p) => {
            var g;
            return p.id === t || ((g = p.info) == null ? void 0 : g.rdns) === t;
          });
          return a || c || !!l;
        });
        if (i) {
          const { info: o, name: a, imageUrl: c } = i, l = c || this.getConnectorImage(i);
          this.setConnectedWalletInfo({ name: a, icon: l, ...o }, e);
        }
      }
    } else if (r === Gt.CONNECTOR_TYPE_WALLET_CONNECT) {
      const i = Be.getProvider(e);
      i != null && i.session && this.setConnectedWalletInfo({
        ...i.session.peer.metadata,
        name: i.session.peer.metadata.name,
        icon: (n = i.session.peer.metadata.icons) == null ? void 0 : n[0]
      }, e);
    } else if (t && t === N.CONNECTOR_ID.COINBASE) {
      const i = this.getConnectors().find((o) => o.id === N.CONNECTOR_ID.COINBASE);
      this.setConnectedWalletInfo({ name: "Coinbase Wallet", icon: this.getConnectorImage(i) }, e);
    }
  }
  async syncBalance(e) {
    !Uu.getNetworksByNamespace(this.getCaipNetworks(), e.chainNamespace).find((r) => {
      var n;
      return r.id.toString() === ((n = e.chainId) == null ? void 0 : n.toString());
    }) || !e.chainId || await this.updateNativeBalance(e.address, e.chainId, e.chainNamespace);
  }
  async ready() {
    await this.readyPromise;
  }
  async updateNativeBalance(e, t, r) {
    const n = this.getAdapter(r), i = f.getCaipNetworkByNamespace(r, t);
    if (n) {
      const o = await n.getBalance({
        address: e,
        chainId: t,
        caipNetwork: i,
        tokens: this.options.tokens
      });
      return this.setBalance(o.balance, o.symbol, r), o;
    }
  }
  // -- Universal Provider ---------------------------------------------------
  async initializeUniversalAdapter() {
    var r, n, i, o, a, c, l, d, u, p;
    const e = xA.createLogger((g, ...w) => {
      g && this.handleAlertError(g), console.error(...w);
    }), t = {
      projectId: (r = this.options) == null ? void 0 : r.projectId,
      metadata: {
        name: (n = this.options) != null && n.metadata ? (i = this.options) == null ? void 0 : i.metadata.name : "",
        description: (o = this.options) != null && o.metadata ? (a = this.options) == null ? void 0 : a.metadata.description : "",
        url: (c = this.options) != null && c.metadata ? (l = this.options) == null ? void 0 : l.metadata.url : "",
        icons: (d = this.options) != null && d.metadata ? (u = this.options) == null ? void 0 : u.metadata.icons : [""]
      },
      logger: e
    };
    S.setManualWCControl(!!((p = this.options) != null && p.manualWCControl)), this.universalProvider = this.options.universalProvider ?? await gl.init(t), S.state.enableReconnect === !1 && this.universalProvider.session && await this.universalProvider.disconnect(), this.listenWalletConnect();
  }
  listenWalletConnect() {
    this.universalProvider && this.chainNamespaces.forEach((e) => {
      Ms.listenWcProvider({
        universalProvider: this.universalProvider,
        namespace: e,
        onDisplayUri: (t) => {
          q.setUri(t);
        },
        onConnect: () => {
          q.finalizeWcConnection();
        },
        onDisconnect: () => {
          f.state.noAdapters && this.resetAccount(e), q.resetWcConnection();
        },
        onChainChanged: (t) => {
          const r = f.state.activeChain, n = F.state.activeConnectorIds[r] === N.CONNECTOR_ID.WALLET_CONNECT;
          if (r === e && (f.state.noAdapters || n)) {
            const i = this.getCaipNetworks().find((a) => a.id.toString() === t.toString() || a.caipNetworkId.toString() === t.toString()), o = this.getCaipNetwork();
            if (!i) {
              this.setUnsupportedNetwork(t);
              return;
            }
            (o == null ? void 0 : o.id.toString()) !== (i == null ? void 0 : i.id.toString()) && (o == null ? void 0 : o.chainNamespace) === (i == null ? void 0 : i.chainNamespace) && this.setCaipNetwork(i);
          }
        },
        onAccountsChanged: (t) => {
          const r = f.state.activeChain, n = F.state.activeConnectorIds[r] === N.CONNECTOR_ID.WALLET_CONNECT;
          if (r === e && (f.state.noAdapters || n) && t.length > 0) {
            const i = t[0];
            this.syncAccount({
              address: i.address,
              chainId: i.chainId,
              chainNamespace: i.chainNamespace
            });
          }
        }
      });
    });
  }
  createUniversalProvider() {
    var e;
    return !this.universalProviderInitPromise && te.isClient() && ((e = this.options) != null && e.projectId) && (this.universalProviderInitPromise = this.initializeUniversalAdapter()), this.universalProviderInitPromise;
  }
  async getUniversalProvider() {
    if (!this.universalProvider)
      try {
        await this.createUniversalProvider();
      } catch (e) {
        $e.sendEvent({
          type: "error",
          event: "INTERNAL_SDK_ERROR",
          properties: {
            errorType: "UniversalProviderInitError",
            errorMessage: e instanceof Error ? e.message : "Unknown",
            uncaught: !1
          }
        }), console.error("AppKit:getUniversalProvider - Cannot create provider", e);
      }
    return this.universalProvider;
  }
  // - Utils -------------------------------------------------------------------
  handleAlertError(e) {
    const t = Object.entries(St.UniversalProviderErrors).find(([, { message: a }]) => e.message.includes(a)), [r, n] = t ?? [], { message: i, alertErrorKey: o } = n ?? {};
    if (r && i && !this.reportedAlertErrors[r]) {
      const a = St.ALERT_ERRORS[o];
      a && (rt.open(a, "error"), this.reportedAlertErrors[r] = !0);
    }
  }
  getAdapter(e) {
    var t;
    if (e)
      return (t = this.chainAdapters) == null ? void 0 : t[e];
  }
  createAdapter(e) {
    var n;
    if (!e)
      return;
    const t = e.namespace;
    if (!t)
      return;
    this.createClients();
    const r = e;
    r.namespace = t, r.construct({
      namespace: t,
      projectId: (n = this.options) == null ? void 0 : n.projectId,
      networks: this.getCaipNetworks()
    }), this.chainNamespaces.includes(t) || this.chainNamespaces.push(t), this.chainAdapters && (this.chainAdapters[t] = r);
  }
  // -- Public -------------------------------------------------------------------
  async open(e) {
    if (await this.injectModalUi(), e != null && e.uri && q.setUri(e.uri), e != null && e.arguments)
      switch (e == null ? void 0 : e.view) {
        case "Swap":
          return Re.open({ ...e, data: { swap: e.arguments } });
      }
    return Re.open(e);
  }
  async close() {
    await this.injectModalUi(), Re.close();
  }
  setLoading(e, t) {
    Re.setLoading(e, t);
  }
  async disconnect(e) {
    await q.disconnect({ namespace: e });
  }
  getSIWX() {
    return S.state.siwx;
  }
  // -- review these -------------------------------------------------------------------
  getError() {
    return "";
  }
  getChainId() {
    var e;
    return (e = f.state.activeCaipNetwork) == null ? void 0 : e.id;
  }
  async switchNetwork(e) {
    const t = this.getCaipNetworks().find((r) => r.id === e.id);
    if (!t) {
      rt.open(St.ALERT_ERRORS.SWITCH_NETWORK_NOT_FOUND, "error");
      return;
    }
    await f.switchActiveNetwork(t);
  }
  getWalletProvider() {
    return f.state.activeChain ? Be.state.providers[f.state.activeChain] : null;
  }
  getWalletProviderType() {
    return Be.getProviderId(f.state.activeChain);
  }
  subscribeProviders(e) {
    return Be.subscribeProviders(e);
  }
  getThemeMode() {
    return Mt.state.themeMode;
  }
  getThemeVariables() {
    return Mt.state.themeVariables;
  }
  setThemeMode(e) {
    Mt.setThemeMode(e), zp(Mt.state.themeMode);
  }
  setTermsConditionsUrl(e) {
    S.setTermsConditionsUrl(e);
  }
  setPrivacyPolicyUrl(e) {
    S.setPrivacyPolicyUrl(e);
  }
  setThemeVariables(e) {
    Mt.setThemeVariables(e), dN(Mt.state.themeVariables);
  }
  subscribeTheme(e) {
    return Mt.subscribe(e);
  }
  subscribeConnections(e) {
    return this.remoteFeatures.multiWallet ? q.subscribe(e) : (rt.open(N.REMOTE_FEATURES_ALERTS.MULTI_WALLET_NOT_ENABLED.DEFAULT, "info"), () => {
    });
  }
  getWalletInfo(e) {
    return e ? f.getAccountProp("connectedWalletInfo", e) : X.state.connectedWalletInfo;
  }
  getAccount(e) {
    const t = F.getAuthConnector(e), r = f.getAccountData(e), n = f.state.activeChain, i = $.getConnectedConnectorId(e || n), a = q.getConnections(e).flatMap((c) => c.accounts.map(({ address: l, type: d }) => te.createAccount(e, l, d || "eoa")));
    if (r)
      return {
        allAccounts: a,
        caipAddress: r.caipAddress,
        address: te.getPlainAddress(r.caipAddress),
        isConnected: !!r.caipAddress,
        status: r.status,
        embeddedWalletInfo: t && i === N.CONNECTOR_ID.AUTH ? {
          user: r.user ? {
            ...r.user,
            /*
             * Getting the username from the chain controller works well for social logins,
             * but Farcaster uses a different connection flow and doesn't emit the username via events.
             * Since the username is stored in local storage before the chain controller updates,
             * it's safe to use the local storage value here.
             */
            username: $.getConnectedSocialUsername()
          } : void 0,
          authProvider: r.socialProvider || "email",
          accountType: As(e || n),
          isSmartAccountDeployed: !!r.smartAccountDeployed
        } : void 0
      };
  }
  subscribeAccount(e, t) {
    const r = () => {
      const n = this.getAccount(t);
      n && e(n);
    };
    t ? f.subscribeChainProp("accountState", r, t) : f.subscribe(r), F.subscribe(r);
  }
  subscribeNetwork(e) {
    return f.subscribe(({ activeCaipNetwork: t }) => {
      e({
        caipNetwork: t,
        chainId: t == null ? void 0 : t.id,
        caipNetworkId: t == null ? void 0 : t.caipNetworkId
      });
    });
  }
  subscribeWalletInfo(e, t) {
    return t ? X.subscribeKey("connectedWalletInfo", e, t) : X.subscribeKey("connectedWalletInfo", e);
  }
  subscribeShouldUpdateToAddress(e) {
    X.subscribeKey("shouldUpdateToAddress", e);
  }
  subscribeCaipNetworkChange(e) {
    f.subscribeKey("activeCaipNetwork", e);
  }
  getState() {
    return $s.state;
  }
  getRemoteFeatures() {
    return S.state.remoteFeatures;
  }
  subscribeState(e) {
    return $s.subscribe(e);
  }
  subscribeRemoteFeatures(e) {
    return S.subscribeKey("remoteFeatures", e);
  }
  showErrorMessage(e) {
    ys.showError(e);
  }
  showSuccessMessage(e) {
    ys.showSuccess(e);
  }
  getEvent() {
    return { ...$e.state };
  }
  subscribeEvents(e) {
    return $e.subscribe(e);
  }
  replace(e) {
    de.replace(e);
  }
  redirect(e) {
    de.push(e);
  }
  popTransactionStack(e) {
    de.popTransactionStack(e);
  }
  isOpen() {
    return Re.state.open;
  }
  isTransactionStackEmpty() {
    return de.state.transactionStack.length === 0;
  }
  static getInstance() {
    return this.instance;
  }
  updateFeatures(e) {
    S.setFeatures(e);
  }
  updateRemoteFeatures(e) {
    S.setRemoteFeatures(e);
  }
  updateOptions(e) {
    const r = { ...S.state || {}, ...e };
    S.setOptions(r);
  }
  setConnectMethodsOrder(e) {
    S.setConnectMethodsOrder(e);
  }
  setWalletFeaturesOrder(e) {
    S.setWalletFeaturesOrder(e);
  }
  setCollapseWallets(e) {
    S.setCollapseWallets(e);
  }
  setSocialsOrder(e) {
    S.setSocialsOrder(e);
  }
  getConnectMethodsOrder() {
    return Lc.getConnectOrderMethod(S.state.features, F.getConnectors());
  }
  /**
   * Adds a network to an existing adapter in AppKit.
   * @param namespace - The chain namespace to add the network to (e.g. 'eip155', 'solana')
   * @param network - The network configuration to add
   * @throws Error if adapter for namespace doesn't exist
   */
  addNetwork(e, t) {
    if (this.chainAdapters && !this.chainAdapters[e])
      throw new Error(`Adapter for namespace ${e} doesn't exist`);
    const r = this.extendCaipNetwork(t, this.options);
    this.getCaipNetworks().find((n) => n.id === r.id) || f.addNetwork(r);
  }
  /**
   * Removes a network from an existing adapter in AppKit.
   * @param namespace - The chain namespace the network belongs to
   * @param networkId - The network ID to remove
   * @throws Error if adapter for namespace doesn't exist or if removing last network
   */
  removeNetwork(e, t) {
    if (this.chainAdapters && !this.chainAdapters[e])
      throw new Error(`Adapter for namespace ${e} doesn't exist`);
    this.getCaipNetworks().find((n) => n.id === t) && f.removeNetwork(e, t);
  }
}
let Tu = !1;
class Gp extends yN {
  // -- Private ------------------------------------------------------------------
  onAuthProviderConnected(e) {
    const t = f.state.activeChain, r = t === N.CHAIN.EVM ? `eip155:${e.chainId}:${e.address}` : `${e.chainId}:${e.address}`, n = S.state.defaultAccountTypes[t], i = As(t), o = e.preferredAccountType || i || n;
    Nt.isLowerCaseMatch(e.address, X.state.address) || this.syncIdentity({
      address: e.address,
      chainId: e.chainId,
      chainNamespace: t
    }), this.setCaipAddress(r, t), this.setUser({ ...X.state.user || {}, ...e }, t), this.setSmartAccountDeployed(!!e.smartAccountDeployed, t), this.setPreferredAccountType(o, t), this.setLoading(!1, t);
  }
  setupAuthConnectorListeners(e) {
    e.onRpcRequest((t) => {
      Yt.checkIfRequestExists(t) ? Yt.checkIfRequestIsSafe(t) || this.handleUnsafeRPCRequest() : (this.open(), console.error(it.RPC_METHOD_NOT_ALLOWED_MESSAGE, {
        method: t.method
      }), setTimeout(() => {
        this.showErrorMessage(it.RPC_METHOD_NOT_ALLOWED_UI_MESSAGE);
      }, 300), e.rejectRpcRequests());
    }), e.onRpcError(() => {
      this.isOpen() && (this.isTransactionStackEmpty() ? this.close() : this.popTransactionStack("error"));
    }), e.onRpcSuccess((t, r) => {
      const n = Yt.checkIfRequestIsSafe(r), i = X.state.address, o = f.state.activeCaipNetwork;
      n || (i && (o != null && o.id) && this.updateNativeBalance(i, o.id, o.chainNamespace), this.isTransactionStackEmpty() ? this.close() : this.popTransactionStack("success"));
    }), e.onNotConnected(() => {
      const t = f.state.activeChain;
      F.getConnectorId(t) === N.CONNECTOR_ID.AUTH && (this.setCaipAddress(void 0, t), this.setLoading(!1, t));
    }), e.onConnect(this.onAuthProviderConnected.bind(this)), e.onSocialConnected(this.onAuthProviderConnected.bind(this)), e.onSetPreferredAccount(({ address: t, type: r }) => {
      t && this.setPreferredAccountType(r, f.state.activeChain);
    });
  }
  async syncAuthConnectorTheme(e) {
    if (!e)
      return;
    const t = Mt.getSnapshot(), r = S.getSnapshot();
    await Promise.all([
      e.syncDappData({
        metadata: r.metadata,
        sdkVersion: r.sdkVersion,
        projectId: r.projectId,
        sdkType: r.sdkType
      }),
      e.syncTheme({
        themeMode: t.themeMode,
        themeVariables: t.themeVariables,
        w3mThemeVariables: Zs(t.themeVariables, t.themeMode)
      })
    ]);
  }
  async syncAuthConnector(e, t) {
    var l, d, u, p;
    const r = N.AUTH_CONNECTOR_SUPPORTED_CHAINS.includes(t), n = t === f.state.activeChain;
    if (!r)
      return;
    this.setLoading(!0, t);
    const i = e.getLoginEmailUsed();
    this.setLoading(i, t), i && this.setStatus("connecting", t);
    const o = e.getEmail(), a = e.getUsername();
    this.setUser({ ...((l = X.state) == null ? void 0 : l.user) || {}, username: a, email: o }, t), this.setupAuthConnectorListeners(e);
    const { isConnected: c } = await e.isConnected();
    if (await this.syncAuthConnectorTheme(e), t && r && n) {
      const g = await e.getSmartAccountEnabledNetworks();
      f.setSmartAccountEnabledNetworks((g == null ? void 0 : g.smartAccountEnabledNetworks) || [], t), c && ((d = this.connectionControllerClient) != null && d.connectExternal) ? (await ((p = this.connectionControllerClient) == null ? void 0 : p.connectExternal({
        id: N.CONNECTOR_ID.AUTH,
        info: { name: N.CONNECTOR_ID.AUTH },
        type: Gt.CONNECTOR_TYPE_AUTH,
        provider: e,
        chainId: (u = f.state.activeCaipNetwork) == null ? void 0 : u.id,
        chain: t
      })), this.setStatus("connected", t)) : F.getConnectorId(t) === N.CONNECTOR_ID.AUTH && (this.setStatus("disconnected", t), $.removeConnectedNamespace(t));
    }
    this.setLoading(!1, t);
  }
  async checkExistingTelegramSocialConnection(e) {
    var t;
    try {
      if (!te.isTelegram())
        return;
      const r = $.getTelegramSocialProvider();
      if (!r || !te.isClient())
        return;
      const i = new URL(window.location.href).searchParams.get("result_uri");
      if (!i)
        return;
      X.setSocialProvider(r, e), await ((t = this.authProvider) == null ? void 0 : t.init());
      const o = F.getAuthConnector();
      r && o && (this.setLoading(!0, e), await q.connectExternal({
        id: o.id,
        type: o.type,
        socialUri: i
      }, o.chain), $.setConnectedSocialProvider(r), $.removeTelegramSocialProvider(), $e.sendEvent({
        type: "track",
        event: "SOCIAL_LOGIN_SUCCESS",
        properties: { provider: r }
      }));
    } catch (r) {
      this.setLoading(!1, e), console.error("checkExistingSTelegramocialConnection error", r);
    }
    try {
      const r = new URL(window.location.href);
      r.searchParams.delete("result_uri"), window.history.replaceState({}, document.title, r.toString());
    } catch (r) {
      console.error("tma social login failed", r);
    }
  }
  createAuthProvider(e) {
    var l, d, u, p;
    if (!N.AUTH_CONNECTOR_SUPPORTED_CHAINS.includes(e))
      return;
    const r = (l = this.remoteFeatures) == null ? void 0 : l.email, n = Array.isArray((d = this.remoteFeatures) == null ? void 0 : d.socials) && this.remoteFeatures.socials.length > 0, i = r || n, a = Nt.getActiveNamespaceConnectedToAuth() || e;
    !this.authProvider && ((u = this.options) != null && u.projectId) && i && (this.authProvider = Ri.getInstance({
      projectId: this.options.projectId,
      enableLogger: this.options.enableAuthLogger,
      chainId: (p = this.getCaipNetwork(a)) == null ? void 0 : p.caipNetworkId,
      abortController: St.EmbeddedWalletAbortController,
      onTimeout: (g) => {
        g === "iframe_load_failed" ? rt.open(St.ALERT_ERRORS.IFRAME_LOAD_FAILED, "error") : g === "iframe_request_timeout" ? rt.open(St.ALERT_ERRORS.IFRAME_REQUEST_TIMEOUT, "error") : g === "unverified_domain" && rt.open(St.ALERT_ERRORS.UNVERIFIED_DOMAIN, "error");
      },
      getActiveCaipNetwork: (g) => f.getActiveCaipNetwork(g)
    }), $s.subscribeOpen((g) => {
      var w;
      !g && this.isTransactionStackEmpty() && ((w = this.authProvider) == null || w.rejectRpcRequests());
    }));
    const c = e === f.state.activeChain && S.state.enableReconnect;
    S.state.enableReconnect === !1 ? this.syncAuthConnectorTheme(this.authProvider) : this.authProvider && c && (this.syncAuthConnector(this.authProvider, e), this.checkExistingTelegramSocialConnection(e));
  }
  createAuthProviderForAdapter(e) {
    var t, r, n;
    this.createAuthProvider(e), this.authProvider && ((n = (r = (t = this.chainAdapters) == null ? void 0 : t[e]) == null ? void 0 : r.setAuthProvider) == null || n.call(r, this.authProvider));
  }
  // -- Overrides ----------------------------------------------------------------
  initControllers(e) {
    super.initControllers(e), this.options.excludeWalletIds && ne.initializeExcludedWallets({ ids: this.options.excludeWalletIds });
  }
  async switchCaipNetwork(e) {
    var o, a;
    if (!e)
      return;
    const t = f.state.activeChain, r = e.chainNamespace, n = this.getAddressByChainNamespace(r);
    if (r === t && n) {
      const c = this.getAdapter(r), l = Be.getProvider(r), d = Be.getProviderId(r);
      await (c == null ? void 0 : c.switchNetwork({ caipNetwork: e, provider: l, providerType: d })), this.setCaipNetwork(e);
    } else {
      const l = Be.getProviderId(t) === Gt.CONNECTOR_TYPE_AUTH, d = Be.getProviderId(r), u = d === Gt.CONNECTOR_TYPE_AUTH, p = N.AUTH_CONNECTOR_SUPPORTED_CHAINS.includes(r);
      if ((l && d === void 0 || u) && p)
        try {
          if (f.state.activeChain = e.chainNamespace, n) {
            const g = this.getAdapter(r);
            await (g == null ? void 0 : g.switchNetwork({
              caipNetwork: e,
              provider: this.authProvider,
              providerType: d
            }));
          } else
            await ((a = (o = this.connectionControllerClient) == null ? void 0 : o.connectExternal) == null ? void 0 : a.call(o, {
              id: N.CONNECTOR_ID.AUTH,
              provider: this.authProvider,
              chain: r,
              chainId: e.id,
              type: Gt.CONNECTOR_TYPE_AUTH,
              caipNetwork: e
            }));
          this.setCaipNetwork(e);
        } catch {
          const w = this.getAdapter(r);
          await (w == null ? void 0 : w.switchNetwork({
            caipNetwork: e,
            provider: this.authProvider,
            providerType: d
          }));
        }
      else if (d === Gt.CONNECTOR_TYPE_WALLET_CONNECT) {
        if (!f.state.noAdapters) {
          const g = this.getAdapter(r), w = Be.getProvider(r), m = Be.getProviderId(r);
          await (g == null ? void 0 : g.switchNetwork({ caipNetwork: e, provider: w, providerType: m }));
        }
        this.setCaipNetwork(e), this.syncWalletConnectAccount();
      } else
        this.setCaipNetwork(e), n && this.syncAccount({
          address: n,
          chainId: e.id,
          chainNamespace: r
        });
    }
  }
  async initialize(e) {
    var t;
    await super.initialize(e), (t = this.chainNamespaces) == null || t.forEach((r) => {
      this.createAuthProviderForAdapter(r);
    }), await this.injectModalUi(), $s.set({ initialized: !0 });
  }
  async syncIdentity({ address: e, chainId: t, chainNamespace: r }) {
    var o;
    const n = `${r}:${t}`, i = (o = this.caipNetworks) == null ? void 0 : o.find((a) => a.caipNetworkId === n);
    if (r !== N.CHAIN.EVM || i != null && i.testnet) {
      this.setProfileName(null, r), this.setProfileImage(null, r);
      return;
    }
    try {
      const { name: a, avatar: c } = await this.fetchIdentity({
        address: e,
        caipNetworkId: n
      });
      this.setProfileName(a, r), this.setProfileImage(c, r);
    } catch {
      await this.syncReownName(e, r), t !== 1 && this.setProfileImage(null, r);
    }
  }
  syncConnectedWalletInfo(e) {
    const t = Be.getProviderId(e);
    if (t === Gt.CONNECTOR_TYPE_AUTH) {
      const r = this.authProvider;
      if (r) {
        const n = $.getConnectedSocialProvider() ?? "email", i = r.getEmail() ?? r.getUsername();
        this.setConnectedWalletInfo({ name: t, identifier: i, social: n }, e);
      }
    } else
      super.syncConnectedWalletInfo(e);
  }
  async injectModalUi() {
    if (te.isClient() && !Tu)
      try {
        const e = { ...Ue.DEFAULT_FEATURES, ...this.options.features }, t = this.remoteFeatures;
        if (await this.loadModalComponents(e, t), te.isClient() && !document.querySelector("w3m-modal")) {
          const n = document.createElement("w3m-modal");
          !S.state.disableAppend && !S.state.enableEmbedded && document.body.insertAdjacentElement("beforeend", n);
        }
        Tu = !0;
      } catch (e) {
        console.error("Error injecting modal UI:", e);
      }
  }
  // This separate method helps with tree-shaking for SSR builds
  async loadModalComponents(e, t) {
    if (!te.isClient())
      return;
    const r = [];
    (t.email || t.socials && t.socials.length > 0) && r.push(import("./embedded-wallet-DyRAzq-z.js")), t.email && r.push(import("./email-CToTwr2b.js")), t.socials && r.push(import("./socials-q6yrUmGf.js")), t.swaps && t.swaps.length > 0 && r.push(import("./swaps-Q6V4yAHi.js")), e.send && r.push(import("./send-DBk4AWJS.js")), e.receive && r.push(import("./receive-Da9YTeyW.js")), t.onramp && t.onramp.length > 0 && r.push(import("./onramp-DF5MgZdd.js")), t.activity && r.push(import("./transactions-DbPSgBvg.js")), e.pay && r.push(import("./index-B3Pz8NH5.js")), await Promise.all([
      ...r,
      import("./index-B5ek-XwF.js"),
      import("./w3m-modal-DZtw81Gm.js")
    ]);
  }
}
const EN = "1.7.11";
function bN(s) {
  return new Gp({
    ...s,
    sdkVersion: te.generateSdkVersion(s.adapters ?? [], "html", EN)
  });
}
const ZN = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  AccountController: X,
  AppKit: Gp,
  CoreHelperUtil: te,
  DEFAULT_METHODS: Vp,
  WcConstantsUtil: Pn,
  WcHelpersUtil: Ms,
  createAppKit: bN
}, Symbol.toStringTag, { value: "Module" }));
export {
  xn as $,
  X as A,
  ae as B,
  F as C,
  It as D,
  bi as E,
  gt as F,
  ne as G,
  sc as H,
  pi as I,
  ws as J,
  Mf as K,
  Be as L,
  Re as M,
  Uf as N,
  S as O,
  Kt as P,
  Oo as Q,
  de as R,
  ys as S,
  Mt as T,
  Bo as U,
  Nt as V,
  it as W,
  YN as X,
  Lc as Y,
  An as Z,
  wg as _,
  ko as a,
  VN as a0,
  Hp as a1,
  Mc as a2,
  ZN as a3,
  Ue as b,
  N as c,
  te as d,
  f as e,
  $e as f,
  Zs as g,
  As as h,
  Un as i,
  GN as j,
  Yt as k,
  q as l,
  Gt as m,
  eN as n,
  rt as o,
  tN as p,
  $ as q,
  KN as r,
  St as s,
  xe as t,
  Mu as u,
  Ve as v,
  Qt as w,
  hg as x,
  zc as y,
  Fu as z
};
