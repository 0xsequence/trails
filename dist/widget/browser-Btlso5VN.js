import { H as pt } from "./index-D1T7oYIH.js";
var O = {}, Pt = function() {
  return typeof Promise == "function" && Promise.prototype && Promise.prototype.then;
}, dt = {}, T = {};
let it;
const Rt = [
  0,
  // Not used
  26,
  44,
  70,
  100,
  134,
  172,
  196,
  242,
  292,
  346,
  404,
  466,
  532,
  581,
  655,
  733,
  815,
  901,
  991,
  1085,
  1156,
  1258,
  1364,
  1474,
  1588,
  1706,
  1828,
  1921,
  2051,
  2185,
  2323,
  2465,
  2611,
  2761,
  2876,
  3034,
  3196,
  3362,
  3532,
  3706
];
T.getSymbolSize = function(t) {
  if (!t) throw new Error('"version" cannot be null or undefined');
  if (t < 1 || t > 40) throw new Error('"version" should be in range from 1 to 40');
  return t * 4 + 17;
};
T.getSymbolTotalCodewords = function(t) {
  return Rt[t];
};
T.getBCHDigit = function(e) {
  let t = 0;
  for (; e !== 0; )
    t++, e >>>= 1;
  return t;
};
T.setToSJISFunction = function(t) {
  if (typeof t != "function")
    throw new Error('"toSJISFunc" is not a valid function.');
  it = t;
};
T.isKanjiModeEnabled = function() {
  return typeof it < "u";
};
T.toSJIS = function(t) {
  return it(t);
};
var v = {};
(function(e) {
  e.L = { bit: 1 }, e.M = { bit: 0 }, e.Q = { bit: 3 }, e.H = { bit: 2 };
  function t(i) {
    if (typeof i != "string")
      throw new Error("Param is not a string");
    switch (i.toLowerCase()) {
      case "l":
      case "low":
        return e.L;
      case "m":
      case "medium":
        return e.M;
      case "q":
      case "quartile":
        return e.Q;
      case "h":
      case "high":
        return e.H;
      default:
        throw new Error("Unknown EC Level: " + i);
    }
  }
  e.isValid = function(o) {
    return o && typeof o.bit < "u" && o.bit >= 0 && o.bit < 4;
  }, e.from = function(o, r) {
    if (e.isValid(o))
      return o;
    try {
      return t(o);
    } catch {
      return r;
    }
  };
})(v);
function ht() {
  this.buffer = [], this.length = 0;
}
ht.prototype = {
  get: function(e) {
    const t = Math.floor(e / 8);
    return (this.buffer[t] >>> 7 - e % 8 & 1) === 1;
  },
  put: function(e, t) {
    for (let i = 0; i < t; i++)
      this.putBit((e >>> t - i - 1 & 1) === 1);
  },
  getLengthInBits: function() {
    return this.length;
  },
  putBit: function(e) {
    const t = Math.floor(this.length / 8);
    this.buffer.length <= t && this.buffer.push(0), e && (this.buffer[t] |= 128 >>> this.length % 8), this.length++;
  }
};
var Lt = ht;
function K(e) {
  if (!e || e < 1)
    throw new Error("BitMatrix size must be defined and greater than 0");
  this.size = e, this.data = new Uint8Array(e * e), this.reservedBit = new Uint8Array(e * e);
}
K.prototype.set = function(e, t, i, o) {
  const r = e * this.size + t;
  this.data[r] = i, o && (this.reservedBit[r] = !0);
};
K.prototype.get = function(e, t) {
  return this.data[e * this.size + t];
};
K.prototype.xor = function(e, t, i) {
  this.data[e * this.size + t] ^= i;
};
K.prototype.isReserved = function(e, t) {
  return this.reservedBit[e * this.size + t];
};
var Dt = K, wt = {};
(function(e) {
  const t = T.getSymbolSize;
  e.getRowColCoords = function(o) {
    if (o === 1) return [];
    const r = Math.floor(o / 7) + 2, n = t(o), s = n === 145 ? 26 : Math.ceil((n - 13) / (2 * r - 2)) * 2, c = [n - 7];
    for (let u = 1; u < r - 1; u++)
      c[u] = c[u - 1] - s;
    return c.push(6), c.reverse();
  }, e.getPositions = function(o) {
    const r = [], n = e.getRowColCoords(o), s = n.length;
    for (let c = 0; c < s; c++)
      for (let u = 0; u < s; u++)
        c === 0 && u === 0 || // top-left
        c === 0 && u === s - 1 || // bottom-left
        c === s - 1 && u === 0 || r.push([n[c], n[u]]);
    return r;
  };
})(wt);
var mt = {};
const Ut = T.getSymbolSize, at = 7;
mt.getPositions = function(t) {
  const i = Ut(t);
  return [
    // top-left
    [0, 0],
    // top-right
    [i - at, 0],
    // bottom-left
    [0, i - at]
  ];
};
var Et = {};
(function(e) {
  e.Patterns = {
    PATTERN000: 0,
    PATTERN001: 1,
    PATTERN010: 2,
    PATTERN011: 3,
    PATTERN100: 4,
    PATTERN101: 5,
    PATTERN110: 6,
    PATTERN111: 7
  };
  const t = {
    N1: 3,
    N2: 3,
    N3: 40,
    N4: 10
  };
  e.isValid = function(r) {
    return r != null && r !== "" && !isNaN(r) && r >= 0 && r <= 7;
  }, e.from = function(r) {
    return e.isValid(r) ? parseInt(r, 10) : void 0;
  }, e.getPenaltyN1 = function(r) {
    const n = r.size;
    let s = 0, c = 0, u = 0, l = null, a = null;
    for (let A = 0; A < n; A++) {
      c = u = 0, l = a = null;
      for (let w = 0; w < n; w++) {
        let g = r.get(A, w);
        g === l ? c++ : (c >= 5 && (s += t.N1 + (c - 5)), l = g, c = 1), g = r.get(w, A), g === a ? u++ : (u >= 5 && (s += t.N1 + (u - 5)), a = g, u = 1);
      }
      c >= 5 && (s += t.N1 + (c - 5)), u >= 5 && (s += t.N1 + (u - 5));
    }
    return s;
  }, e.getPenaltyN2 = function(r) {
    const n = r.size;
    let s = 0;
    for (let c = 0; c < n - 1; c++)
      for (let u = 0; u < n - 1; u++) {
        const l = r.get(c, u) + r.get(c, u + 1) + r.get(c + 1, u) + r.get(c + 1, u + 1);
        (l === 4 || l === 0) && s++;
      }
    return s * t.N2;
  }, e.getPenaltyN3 = function(r) {
    const n = r.size;
    let s = 0, c = 0, u = 0;
    for (let l = 0; l < n; l++) {
      c = u = 0;
      for (let a = 0; a < n; a++)
        c = c << 1 & 2047 | r.get(l, a), a >= 10 && (c === 1488 || c === 93) && s++, u = u << 1 & 2047 | r.get(a, l), a >= 10 && (u === 1488 || u === 93) && s++;
    }
    return s * t.N3;
  }, e.getPenaltyN4 = function(r) {
    let n = 0;
    const s = r.data.length;
    for (let u = 0; u < s; u++) n += r.data[u];
    return Math.abs(Math.ceil(n * 100 / s / 5) - 10) * t.N4;
  };
  function i(o, r, n) {
    switch (o) {
      case e.Patterns.PATTERN000:
        return (r + n) % 2 === 0;
      case e.Patterns.PATTERN001:
        return r % 2 === 0;
      case e.Patterns.PATTERN010:
        return n % 3 === 0;
      case e.Patterns.PATTERN011:
        return (r + n) % 3 === 0;
      case e.Patterns.PATTERN100:
        return (Math.floor(r / 2) + Math.floor(n / 3)) % 2 === 0;
      case e.Patterns.PATTERN101:
        return r * n % 2 + r * n % 3 === 0;
      case e.Patterns.PATTERN110:
        return (r * n % 2 + r * n % 3) % 2 === 0;
      case e.Patterns.PATTERN111:
        return (r * n % 3 + (r + n) % 2) % 2 === 0;
      default:
        throw new Error("bad maskPattern:" + o);
    }
  }
  e.applyMask = function(r, n) {
    const s = n.size;
    for (let c = 0; c < s; c++)
      for (let u = 0; u < s; u++)
        n.isReserved(u, c) || n.xor(u, c, i(r, u, c));
  }, e.getBestMask = function(r, n) {
    const s = Object.keys(e.Patterns).length;
    let c = 0, u = 1 / 0;
    for (let l = 0; l < s; l++) {
      n(l), e.applyMask(l, r);
      const a = e.getPenaltyN1(r) + e.getPenaltyN2(r) + e.getPenaltyN3(r) + e.getPenaltyN4(r);
      e.applyMask(l, r), a < u && (u = a, c = l);
    }
    return c;
  };
})(Et);
var G = {};
const R = v, J = [
  // L  M  Q  H
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  2,
  2,
  1,
  2,
  2,
  4,
  1,
  2,
  4,
  4,
  2,
  4,
  4,
  4,
  2,
  4,
  6,
  5,
  2,
  4,
  6,
  6,
  2,
  5,
  8,
  8,
  4,
  5,
  8,
  8,
  4,
  5,
  8,
  11,
  4,
  8,
  10,
  11,
  4,
  9,
  12,
  16,
  4,
  9,
  16,
  16,
  6,
  10,
  12,
  18,
  6,
  10,
  17,
  16,
  6,
  11,
  16,
  19,
  6,
  13,
  18,
  21,
  7,
  14,
  21,
  25,
  8,
  16,
  20,
  25,
  8,
  17,
  23,
  25,
  9,
  17,
  23,
  34,
  9,
  18,
  25,
  30,
  10,
  20,
  27,
  32,
  12,
  21,
  29,
  35,
  12,
  23,
  34,
  37,
  12,
  25,
  34,
  40,
  13,
  26,
  35,
  42,
  14,
  28,
  38,
  45,
  15,
  29,
  40,
  48,
  16,
  31,
  43,
  51,
  17,
  33,
  45,
  54,
  18,
  35,
  48,
  57,
  19,
  37,
  51,
  60,
  19,
  38,
  53,
  63,
  20,
  40,
  56,
  66,
  21,
  43,
  59,
  70,
  22,
  45,
  62,
  74,
  24,
  47,
  65,
  77,
  25,
  49,
  68,
  81
], Y = [
  // L  M  Q  H
  7,
  10,
  13,
  17,
  10,
  16,
  22,
  28,
  15,
  26,
  36,
  44,
  20,
  36,
  52,
  64,
  26,
  48,
  72,
  88,
  36,
  64,
  96,
  112,
  40,
  72,
  108,
  130,
  48,
  88,
  132,
  156,
  60,
  110,
  160,
  192,
  72,
  130,
  192,
  224,
  80,
  150,
  224,
  264,
  96,
  176,
  260,
  308,
  104,
  198,
  288,
  352,
  120,
  216,
  320,
  384,
  132,
  240,
  360,
  432,
  144,
  280,
  408,
  480,
  168,
  308,
  448,
  532,
  180,
  338,
  504,
  588,
  196,
  364,
  546,
  650,
  224,
  416,
  600,
  700,
  224,
  442,
  644,
  750,
  252,
  476,
  690,
  816,
  270,
  504,
  750,
  900,
  300,
  560,
  810,
  960,
  312,
  588,
  870,
  1050,
  336,
  644,
  952,
  1110,
  360,
  700,
  1020,
  1200,
  390,
  728,
  1050,
  1260,
  420,
  784,
  1140,
  1350,
  450,
  812,
  1200,
  1440,
  480,
  868,
  1290,
  1530,
  510,
  924,
  1350,
  1620,
  540,
  980,
  1440,
  1710,
  570,
  1036,
  1530,
  1800,
  570,
  1064,
  1590,
  1890,
  600,
  1120,
  1680,
  1980,
  630,
  1204,
  1770,
  2100,
  660,
  1260,
  1860,
  2220,
  720,
  1316,
  1950,
  2310,
  750,
  1372,
  2040,
  2430
];
G.getBlocksCount = function(t, i) {
  switch (i) {
    case R.L:
      return J[(t - 1) * 4 + 0];
    case R.M:
      return J[(t - 1) * 4 + 1];
    case R.Q:
      return J[(t - 1) * 4 + 2];
    case R.H:
      return J[(t - 1) * 4 + 3];
    default:
      return;
  }
};
G.getTotalCodewordsCount = function(t, i) {
  switch (i) {
    case R.L:
      return Y[(t - 1) * 4 + 0];
    case R.M:
      return Y[(t - 1) * 4 + 1];
    case R.Q:
      return Y[(t - 1) * 4 + 2];
    case R.H:
      return Y[(t - 1) * 4 + 3];
    default:
      return;
  }
};
var Ct = {}, j = {};
const H = new Uint8Array(512), $ = new Uint8Array(256);
(function() {
  let t = 1;
  for (let i = 0; i < 255; i++)
    H[i] = t, $[t] = i, t <<= 1, t & 256 && (t ^= 285);
  for (let i = 255; i < 512; i++)
    H[i] = H[i - 255];
})();
j.log = function(t) {
  if (t < 1) throw new Error("log(" + t + ")");
  return $[t];
};
j.exp = function(t) {
  return H[t];
};
j.mul = function(t, i) {
  return t === 0 || i === 0 ? 0 : H[$[t] + $[i]];
};
(function(e) {
  const t = j;
  e.mul = function(o, r) {
    const n = new Uint8Array(o.length + r.length - 1);
    for (let s = 0; s < o.length; s++)
      for (let c = 0; c < r.length; c++)
        n[s + c] ^= t.mul(o[s], r[c]);
    return n;
  }, e.mod = function(o, r) {
    let n = new Uint8Array(o);
    for (; n.length - r.length >= 0; ) {
      const s = n[0];
      for (let u = 0; u < r.length; u++)
        n[u] ^= t.mul(r[u], s);
      let c = 0;
      for (; c < n.length && n[c] === 0; ) c++;
      n = n.slice(c);
    }
    return n;
  }, e.generateECPolynomial = function(o) {
    let r = new Uint8Array([1]);
    for (let n = 0; n < o; n++)
      r = e.mul(r, new Uint8Array([1, t.exp(n)]));
    return r;
  };
})(Ct);
const yt = Ct;
function st(e) {
  this.genPoly = void 0, this.degree = e, this.degree && this.initialize(this.degree);
}
st.prototype.initialize = function(t) {
  this.degree = t, this.genPoly = yt.generateECPolynomial(this.degree);
};
st.prototype.encode = function(t) {
  if (!this.genPoly)
    throw new Error("Encoder not initialized");
  const i = new Uint8Array(t.length + this.degree);
  i.set(t);
  const o = yt.mod(i, this.genPoly), r = this.degree - o.length;
  if (r > 0) {
    const n = new Uint8Array(this.degree);
    return n.set(o, r), n;
  }
  return o;
};
var Ft = st, Bt = {}, L = {}, ut = {};
ut.isValid = function(t) {
  return !isNaN(t) && t >= 1 && t <= 40;
};
var b = {};
const At = "[0-9]+", kt = "[A-Z $%*+\\-./:]+";
let V = "(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";
V = V.replace(/u/g, "\\u");
const zt = "(?:(?![A-Z0-9 $%*+\\-./:]|" + V + `)(?:.|[\r
]))+`;
b.KANJI = new RegExp(V, "g");
b.BYTE_KANJI = new RegExp("[^A-Z0-9 $%*+\\-./:]+", "g");
b.BYTE = new RegExp(zt, "g");
b.NUMERIC = new RegExp(At, "g");
b.ALPHANUMERIC = new RegExp(kt, "g");
const Ht = new RegExp("^" + V + "$"), Vt = new RegExp("^" + At + "$"), Kt = new RegExp("^[A-Z0-9 $%*+\\-./:]+$");
b.testKanji = function(t) {
  return Ht.test(t);
};
b.testNumeric = function(t) {
  return Vt.test(t);
};
b.testAlphanumeric = function(t) {
  return Kt.test(t);
};
(function(e) {
  const t = ut, i = b;
  e.NUMERIC = {
    id: "Numeric",
    bit: 1,
    ccBits: [10, 12, 14]
  }, e.ALPHANUMERIC = {
    id: "Alphanumeric",
    bit: 2,
    ccBits: [9, 11, 13]
  }, e.BYTE = {
    id: "Byte",
    bit: 4,
    ccBits: [8, 16, 16]
  }, e.KANJI = {
    id: "Kanji",
    bit: 8,
    ccBits: [8, 10, 12]
  }, e.MIXED = {
    bit: -1
  }, e.getCharCountIndicator = function(n, s) {
    if (!n.ccBits) throw new Error("Invalid mode: " + n);
    if (!t.isValid(s))
      throw new Error("Invalid version: " + s);
    return s >= 1 && s < 10 ? n.ccBits[0] : s < 27 ? n.ccBits[1] : n.ccBits[2];
  }, e.getBestModeForData = function(n) {
    return i.testNumeric(n) ? e.NUMERIC : i.testAlphanumeric(n) ? e.ALPHANUMERIC : i.testKanji(n) ? e.KANJI : e.BYTE;
  }, e.toString = function(n) {
    if (n && n.id) return n.id;
    throw new Error("Invalid mode");
  }, e.isValid = function(n) {
    return n && n.bit && n.ccBits;
  };
  function o(r) {
    if (typeof r != "string")
      throw new Error("Param is not a string");
    switch (r.toLowerCase()) {
      case "numeric":
        return e.NUMERIC;
      case "alphanumeric":
        return e.ALPHANUMERIC;
      case "kanji":
        return e.KANJI;
      case "byte":
        return e.BYTE;
      default:
        throw new Error("Unknown mode: " + r);
    }
  }
  e.from = function(n, s) {
    if (e.isValid(n))
      return n;
    try {
      return o(n);
    } catch {
      return s;
    }
  };
})(L);
(function(e) {
  const t = T, i = G, o = v, r = L, n = ut, s = 7973, c = t.getBCHDigit(s);
  function u(w, g, E) {
    for (let C = 1; C <= 40; C++)
      if (g <= e.getCapacity(C, E, w))
        return C;
  }
  function l(w, g) {
    return r.getCharCountIndicator(w, g) + 4;
  }
  function a(w, g) {
    let E = 0;
    return w.forEach(function(C) {
      const N = l(C.mode, g);
      E += N + C.getBitsLength();
    }), E;
  }
  function A(w, g) {
    for (let E = 1; E <= 40; E++)
      if (a(w, E) <= e.getCapacity(E, g, r.MIXED))
        return E;
  }
  e.from = function(g, E) {
    return n.isValid(g) ? parseInt(g, 10) : E;
  }, e.getCapacity = function(g, E, C) {
    if (!n.isValid(g))
      throw new Error("Invalid QR Code version");
    typeof C > "u" && (C = r.BYTE);
    const N = t.getSymbolTotalCodewords(g), h = i.getTotalCodewordsCount(g, E), m = (N - h) * 8;
    if (C === r.MIXED) return m;
    const d = m - l(C, g);
    switch (C) {
      case r.NUMERIC:
        return Math.floor(d / 10 * 3);
      case r.ALPHANUMERIC:
        return Math.floor(d / 11 * 2);
      case r.KANJI:
        return Math.floor(d / 13);
      case r.BYTE:
      default:
        return Math.floor(d / 8);
    }
  }, e.getBestVersionForData = function(g, E) {
    let C;
    const N = o.from(E, o.M);
    if (Array.isArray(g)) {
      if (g.length > 1)
        return A(g, N);
      if (g.length === 0)
        return 1;
      C = g[0];
    } else
      C = g;
    return u(C.mode, C.getLength(), N);
  }, e.getEncodedBits = function(g) {
    if (!n.isValid(g) || g < 7)
      throw new Error("Invalid QR Code version");
    let E = g << 12;
    for (; t.getBCHDigit(E) - c >= 0; )
      E ^= s << t.getBCHDigit(E) - c;
    return g << 12 | E;
  };
})(Bt);
var It = {};
const et = T, Nt = 1335, Jt = 21522, ft = et.getBCHDigit(Nt);
It.getEncodedBits = function(t, i) {
  const o = t.bit << 3 | i;
  let r = o << 10;
  for (; et.getBCHDigit(r) - ft >= 0; )
    r ^= Nt << et.getBCHDigit(r) - ft;
  return (o << 10 | r) ^ Jt;
};
var Tt = {};
const Yt = L;
function D(e) {
  this.mode = Yt.NUMERIC, this.data = e.toString();
}
D.getBitsLength = function(t) {
  return 10 * Math.floor(t / 3) + (t % 3 ? t % 3 * 3 + 1 : 0);
};
D.prototype.getLength = function() {
  return this.data.length;
};
D.prototype.getBitsLength = function() {
  return D.getBitsLength(this.data.length);
};
D.prototype.write = function(t) {
  let i, o, r;
  for (i = 0; i + 3 <= this.data.length; i += 3)
    o = this.data.substr(i, 3), r = parseInt(o, 10), t.put(r, 10);
  const n = this.data.length - i;
  n > 0 && (o = this.data.substr(i), r = parseInt(o, 10), t.put(r, n * 3 + 1));
};
var $t = D;
const _t = L, W = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  " ",
  "$",
  "%",
  "*",
  "+",
  "-",
  ".",
  "/",
  ":"
];
function U(e) {
  this.mode = _t.ALPHANUMERIC, this.data = e;
}
U.getBitsLength = function(t) {
  return 11 * Math.floor(t / 2) + 6 * (t % 2);
};
U.prototype.getLength = function() {
  return this.data.length;
};
U.prototype.getBitsLength = function() {
  return U.getBitsLength(this.data.length);
};
U.prototype.write = function(t) {
  let i;
  for (i = 0; i + 2 <= this.data.length; i += 2) {
    let o = W.indexOf(this.data[i]) * 45;
    o += W.indexOf(this.data[i + 1]), t.put(o, 11);
  }
  this.data.length % 2 && t.put(W.indexOf(this.data[i]), 6);
};
var Ot = U, vt = function(t) {
  for (var i = [], o = t.length, r = 0; r < o; r++) {
    var n = t.charCodeAt(r);
    if (n >= 55296 && n <= 56319 && o > r + 1) {
      var s = t.charCodeAt(r + 1);
      s >= 56320 && s <= 57343 && (n = (n - 55296) * 1024 + s - 56320 + 65536, r += 1);
    }
    if (n < 128) {
      i.push(n);
      continue;
    }
    if (n < 2048) {
      i.push(n >> 6 | 192), i.push(n & 63 | 128);
      continue;
    }
    if (n < 55296 || n >= 57344 && n < 65536) {
      i.push(n >> 12 | 224), i.push(n >> 6 & 63 | 128), i.push(n & 63 | 128);
      continue;
    }
    if (n >= 65536 && n <= 1114111) {
      i.push(n >> 18 | 240), i.push(n >> 12 & 63 | 128), i.push(n >> 6 & 63 | 128), i.push(n & 63 | 128);
      continue;
    }
    i.push(239, 191, 189);
  }
  return new Uint8Array(i).buffer;
};
const Gt = vt, jt = L;
function F(e) {
  this.mode = jt.BYTE, typeof e == "string" && (e = Gt(e)), this.data = new Uint8Array(e);
}
F.getBitsLength = function(t) {
  return t * 8;
};
F.prototype.getLength = function() {
  return this.data.length;
};
F.prototype.getBitsLength = function() {
  return F.getBitsLength(this.data.length);
};
F.prototype.write = function(e) {
  for (let t = 0, i = this.data.length; t < i; t++)
    e.put(this.data[t], 8);
};
var Qt = F;
const qt = L, Wt = T;
function k(e) {
  this.mode = qt.KANJI, this.data = e;
}
k.getBitsLength = function(t) {
  return t * 13;
};
k.prototype.getLength = function() {
  return this.data.length;
};
k.prototype.getBitsLength = function() {
  return k.getBitsLength(this.data.length);
};
k.prototype.write = function(e) {
  let t;
  for (t = 0; t < this.data.length; t++) {
    let i = Wt.toSJIS(this.data[t]);
    if (i >= 33088 && i <= 40956)
      i -= 33088;
    else if (i >= 57408 && i <= 60351)
      i -= 49472;
    else
      throw new Error(
        "Invalid SJIS character: " + this.data[t] + `
Make sure your charset is UTF-8`
      );
    i = (i >>> 8 & 255) * 192 + (i & 255), e.put(i, 13);
  }
};
var Zt = k;
(function(e) {
  const t = L, i = $t, o = Ot, r = Qt, n = Zt, s = b, c = T, u = pt;
  function l(h) {
    return unescape(encodeURIComponent(h)).length;
  }
  function a(h, m, d) {
    const f = [];
    let y;
    for (; (y = h.exec(d)) !== null; )
      f.push({
        data: y[0],
        index: y.index,
        mode: m,
        length: y[0].length
      });
    return f;
  }
  function A(h) {
    const m = a(s.NUMERIC, t.NUMERIC, h), d = a(s.ALPHANUMERIC, t.ALPHANUMERIC, h);
    let f, y;
    return c.isKanjiModeEnabled() ? (f = a(s.BYTE, t.BYTE, h), y = a(s.KANJI, t.KANJI, h)) : (f = a(s.BYTE_KANJI, t.BYTE, h), y = []), m.concat(d, f, y).sort(function(I, M) {
      return I.index - M.index;
    }).map(function(I) {
      return {
        data: I.data,
        mode: I.mode,
        length: I.length
      };
    });
  }
  function w(h, m) {
    switch (m) {
      case t.NUMERIC:
        return i.getBitsLength(h);
      case t.ALPHANUMERIC:
        return o.getBitsLength(h);
      case t.KANJI:
        return n.getBitsLength(h);
      case t.BYTE:
        return r.getBitsLength(h);
    }
  }
  function g(h) {
    return h.reduce(function(m, d) {
      const f = m.length - 1 >= 0 ? m[m.length - 1] : null;
      return f && f.mode === d.mode ? (m[m.length - 1].data += d.data, m) : (m.push(d), m);
    }, []);
  }
  function E(h) {
    const m = [];
    for (let d = 0; d < h.length; d++) {
      const f = h[d];
      switch (f.mode) {
        case t.NUMERIC:
          m.push([
            f,
            { data: f.data, mode: t.ALPHANUMERIC, length: f.length },
            { data: f.data, mode: t.BYTE, length: f.length }
          ]);
          break;
        case t.ALPHANUMERIC:
          m.push([
            f,
            { data: f.data, mode: t.BYTE, length: f.length }
          ]);
          break;
        case t.KANJI:
          m.push([
            f,
            { data: f.data, mode: t.BYTE, length: l(f.data) }
          ]);
          break;
        case t.BYTE:
          m.push([
            { data: f.data, mode: t.BYTE, length: l(f.data) }
          ]);
      }
    }
    return m;
  }
  function C(h, m) {
    const d = {}, f = { start: {} };
    let y = ["start"];
    for (let B = 0; B < h.length; B++) {
      const I = h[B], M = [];
      for (let P = 0; P < I.length; P++) {
        const S = I[P], z = "" + B + P;
        M.push(z), d[z] = { node: S, lastCount: 0 }, f[z] = {};
        for (let q = 0; q < y.length; q++) {
          const p = y[q];
          d[p] && d[p].node.mode === S.mode ? (f[p][z] = w(d[p].lastCount + S.length, S.mode) - w(d[p].lastCount, S.mode), d[p].lastCount += S.length) : (d[p] && (d[p].lastCount = S.length), f[p][z] = w(S.length, S.mode) + 4 + t.getCharCountIndicator(S.mode, m));
        }
      }
      y = M;
    }
    for (let B = 0; B < y.length; B++)
      f[y[B]].end = 0;
    return { map: f, table: d };
  }
  function N(h, m) {
    let d;
    const f = t.getBestModeForData(h);
    if (d = t.from(m, f), d !== t.BYTE && d.bit < f.bit)
      throw new Error('"' + h + '" cannot be encoded with mode ' + t.toString(d) + `.
 Suggested mode is: ` + t.toString(f));
    switch (d === t.KANJI && !c.isKanjiModeEnabled() && (d = t.BYTE), d) {
      case t.NUMERIC:
        return new i(h);
      case t.ALPHANUMERIC:
        return new o(h);
      case t.KANJI:
        return new n(h);
      case t.BYTE:
        return new r(h);
    }
  }
  e.fromArray = function(m) {
    return m.reduce(function(d, f) {
      return typeof f == "string" ? d.push(N(f, null)) : f.data && d.push(N(f.data, f.mode)), d;
    }, []);
  }, e.fromString = function(m, d) {
    const f = A(m, c.isKanjiModeEnabled()), y = E(f), B = C(y, d), I = u.find_path(B.map, "start", "end"), M = [];
    for (let P = 1; P < I.length - 1; P++)
      M.push(B.table[I[P]].node);
    return e.fromArray(g(M));
  }, e.rawSplit = function(m) {
    return e.fromArray(
      A(m, c.isKanjiModeEnabled())
    );
  };
})(Tt);
const Q = T, Z = v, Xt = Lt, xt = Dt, te = wt, ee = mt, nt = Et, rt = G, ne = Ft, _ = Bt, re = It, oe = L, X = Tt;
function ie(e, t) {
  const i = e.size, o = ee.getPositions(t);
  for (let r = 0; r < o.length; r++) {
    const n = o[r][0], s = o[r][1];
    for (let c = -1; c <= 7; c++)
      if (!(n + c <= -1 || i <= n + c))
        for (let u = -1; u <= 7; u++)
          s + u <= -1 || i <= s + u || (c >= 0 && c <= 6 && (u === 0 || u === 6) || u >= 0 && u <= 6 && (c === 0 || c === 6) || c >= 2 && c <= 4 && u >= 2 && u <= 4 ? e.set(n + c, s + u, !0, !0) : e.set(n + c, s + u, !1, !0));
  }
}
function se(e) {
  const t = e.size;
  for (let i = 8; i < t - 8; i++) {
    const o = i % 2 === 0;
    e.set(i, 6, o, !0), e.set(6, i, o, !0);
  }
}
function ue(e, t) {
  const i = te.getPositions(t);
  for (let o = 0; o < i.length; o++) {
    const r = i[o][0], n = i[o][1];
    for (let s = -2; s <= 2; s++)
      for (let c = -2; c <= 2; c++)
        s === -2 || s === 2 || c === -2 || c === 2 || s === 0 && c === 0 ? e.set(r + s, n + c, !0, !0) : e.set(r + s, n + c, !1, !0);
  }
}
function ce(e, t) {
  const i = e.size, o = _.getEncodedBits(t);
  let r, n, s;
  for (let c = 0; c < 18; c++)
    r = Math.floor(c / 3), n = c % 3 + i - 8 - 3, s = (o >> c & 1) === 1, e.set(r, n, s, !0), e.set(n, r, s, !0);
}
function x(e, t, i) {
  const o = e.size, r = re.getEncodedBits(t, i);
  let n, s;
  for (n = 0; n < 15; n++)
    s = (r >> n & 1) === 1, n < 6 ? e.set(n, 8, s, !0) : n < 8 ? e.set(n + 1, 8, s, !0) : e.set(o - 15 + n, 8, s, !0), n < 8 ? e.set(8, o - n - 1, s, !0) : n < 9 ? e.set(8, 15 - n - 1 + 1, s, !0) : e.set(8, 15 - n - 1, s, !0);
  e.set(o - 8, 8, 1, !0);
}
function le(e, t) {
  const i = e.size;
  let o = -1, r = i - 1, n = 7, s = 0;
  for (let c = i - 1; c > 0; c -= 2)
    for (c === 6 && c--; ; ) {
      for (let u = 0; u < 2; u++)
        if (!e.isReserved(r, c - u)) {
          let l = !1;
          s < t.length && (l = (t[s] >>> n & 1) === 1), e.set(r, c - u, l), n--, n === -1 && (s++, n = 7);
        }
      if (r += o, r < 0 || i <= r) {
        r -= o, o = -o;
        break;
      }
    }
}
function ae(e, t, i) {
  const o = new Xt();
  i.forEach(function(u) {
    o.put(u.mode.bit, 4), o.put(u.getLength(), oe.getCharCountIndicator(u.mode, e)), u.write(o);
  });
  const r = Q.getSymbolTotalCodewords(e), n = rt.getTotalCodewordsCount(e, t), s = (r - n) * 8;
  for (o.getLengthInBits() + 4 <= s && o.put(0, 4); o.getLengthInBits() % 8 !== 0; )
    o.putBit(0);
  const c = (s - o.getLengthInBits()) / 8;
  for (let u = 0; u < c; u++)
    o.put(u % 2 ? 17 : 236, 8);
  return fe(o, e, t);
}
function fe(e, t, i) {
  const o = Q.getSymbolTotalCodewords(t), r = rt.getTotalCodewordsCount(t, i), n = o - r, s = rt.getBlocksCount(t, i), c = o % s, u = s - c, l = Math.floor(o / s), a = Math.floor(n / s), A = a + 1, w = l - a, g = new ne(w);
  let E = 0;
  const C = new Array(s), N = new Array(s);
  let h = 0;
  const m = new Uint8Array(e.buffer);
  for (let I = 0; I < s; I++) {
    const M = I < u ? a : A;
    C[I] = m.slice(E, E + M), N[I] = g.encode(C[I]), E += M, h = Math.max(h, M);
  }
  const d = new Uint8Array(o);
  let f = 0, y, B;
  for (y = 0; y < h; y++)
    for (B = 0; B < s; B++)
      y < C[B].length && (d[f++] = C[B][y]);
  for (y = 0; y < w; y++)
    for (B = 0; B < s; B++)
      d[f++] = N[B][y];
  return d;
}
function ge(e, t, i, o) {
  let r;
  if (Array.isArray(e))
    r = X.fromArray(e);
  else if (typeof e == "string") {
    let l = t;
    if (!l) {
      const a = X.rawSplit(e);
      l = _.getBestVersionForData(a, i);
    }
    r = X.fromString(e, l || 40);
  } else
    throw new Error("Invalid data");
  const n = _.getBestVersionForData(r, i);
  if (!n)
    throw new Error("The amount of data is too big to be stored in a QR Code");
  if (!t)
    t = n;
  else if (t < n)
    throw new Error(
      `
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: ` + n + `.
`
    );
  const s = ae(t, i, r), c = Q.getSymbolSize(t), u = new xt(c);
  return ie(u, t), se(u), ue(u, t), x(u, i, 0), t >= 7 && ce(u, t), le(u, s), isNaN(o) && (o = nt.getBestMask(
    u,
    x.bind(null, u, i)
  )), nt.applyMask(o, u), x(u, i, o), {
    modules: u,
    version: t,
    errorCorrectionLevel: i,
    maskPattern: o,
    segments: r
  };
}
dt.create = function(t, i) {
  if (typeof t > "u" || t === "")
    throw new Error("No input text");
  let o = Z.M, r, n;
  return typeof i < "u" && (o = Z.from(i.errorCorrectionLevel, Z.M), r = _.from(i.version), n = nt.from(i.maskPattern), i.toSJISFunc && Q.setToSJISFunction(i.toSJISFunc)), ge(t, r, o, n);
};
var Mt = {}, ct = {};
(function(e) {
  function t(i) {
    if (typeof i == "number" && (i = i.toString()), typeof i != "string")
      throw new Error("Color should be defined as hex string");
    let o = i.slice().replace("#", "").split("");
    if (o.length < 3 || o.length === 5 || o.length > 8)
      throw new Error("Invalid hex color: " + i);
    (o.length === 3 || o.length === 4) && (o = Array.prototype.concat.apply([], o.map(function(n) {
      return [n, n];
    }))), o.length === 6 && o.push("F", "F");
    const r = parseInt(o.join(""), 16);
    return {
      r: r >> 24 & 255,
      g: r >> 16 & 255,
      b: r >> 8 & 255,
      a: r & 255,
      hex: "#" + o.slice(0, 6).join("")
    };
  }
  e.getOptions = function(o) {
    o || (o = {}), o.color || (o.color = {});
    const r = typeof o.margin > "u" || o.margin === null || o.margin < 0 ? 4 : o.margin, n = o.width && o.width >= 21 ? o.width : void 0, s = o.scale || 4;
    return {
      width: n,
      scale: n ? 4 : s,
      margin: r,
      color: {
        dark: t(o.color.dark || "#000000ff"),
        light: t(o.color.light || "#ffffffff")
      },
      type: o.type,
      rendererOpts: o.rendererOpts || {}
    };
  }, e.getScale = function(o, r) {
    return r.width && r.width >= o + r.margin * 2 ? r.width / (o + r.margin * 2) : r.scale;
  }, e.getImageWidth = function(o, r) {
    const n = e.getScale(o, r);
    return Math.floor((o + r.margin * 2) * n);
  }, e.qrToImageData = function(o, r, n) {
    const s = r.modules.size, c = r.modules.data, u = e.getScale(s, n), l = Math.floor((s + n.margin * 2) * u), a = n.margin * u, A = [n.color.light, n.color.dark];
    for (let w = 0; w < l; w++)
      for (let g = 0; g < l; g++) {
        let E = (w * l + g) * 4, C = n.color.light;
        if (w >= a && g >= a && w < l - a && g < l - a) {
          const N = Math.floor((w - a) / u), h = Math.floor((g - a) / u);
          C = A[c[N * s + h] ? 1 : 0];
        }
        o[E++] = C.r, o[E++] = C.g, o[E++] = C.b, o[E] = C.a;
      }
  };
})(ct);
(function(e) {
  const t = ct;
  function i(r, n, s) {
    r.clearRect(0, 0, n.width, n.height), n.style || (n.style = {}), n.height = s, n.width = s, n.style.height = s + "px", n.style.width = s + "px";
  }
  function o() {
    try {
      return document.createElement("canvas");
    } catch {
      throw new Error("You need to specify a canvas element");
    }
  }
  e.render = function(n, s, c) {
    let u = c, l = s;
    typeof u > "u" && (!s || !s.getContext) && (u = s, s = void 0), s || (l = o()), u = t.getOptions(u);
    const a = t.getImageWidth(n.modules.size, u), A = l.getContext("2d"), w = A.createImageData(a, a);
    return t.qrToImageData(w.data, n, u), i(A, l, a), A.putImageData(w, 0, 0), l;
  }, e.renderToDataURL = function(n, s, c) {
    let u = c;
    typeof u > "u" && (!s || !s.getContext) && (u = s, s = void 0), u || (u = {});
    const l = e.render(n, s, u), a = u.type || "image/png", A = u.rendererOpts || {};
    return l.toDataURL(a, A.quality);
  };
})(Mt);
var St = {};
const de = ct;
function gt(e, t) {
  const i = e.a / 255, o = t + '="' + e.hex + '"';
  return i < 1 ? o + " " + t + '-opacity="' + i.toFixed(2).slice(1) + '"' : o;
}
function tt(e, t, i) {
  let o = e + t;
  return typeof i < "u" && (o += " " + i), o;
}
function he(e, t, i) {
  let o = "", r = 0, n = !1, s = 0;
  for (let c = 0; c < e.length; c++) {
    const u = Math.floor(c % t), l = Math.floor(c / t);
    !u && !n && (n = !0), e[c] ? (s++, c > 0 && u > 0 && e[c - 1] || (o += n ? tt("M", u + i, 0.5 + l + i) : tt("m", r, 0), r = 0, n = !1), u + 1 < t && e[c + 1] || (o += tt("h", s), s = 0)) : r++;
  }
  return o;
}
St.render = function(t, i, o) {
  const r = de.getOptions(i), n = t.modules.size, s = t.modules.data, c = n + r.margin * 2, u = r.color.light.a ? "<path " + gt(r.color.light, "fill") + ' d="M0 0h' + c + "v" + c + 'H0z"/>' : "", l = "<path " + gt(r.color.dark, "stroke") + ' d="' + he(s, n, r.margin) + '"/>', a = 'viewBox="0 0 ' + c + " " + c + '"', w = '<svg xmlns="http://www.w3.org/2000/svg" ' + (r.width ? 'width="' + r.width + '" height="' + r.width + '" ' : "") + a + ' shape-rendering="crispEdges">' + u + l + `</svg>
`;
  return typeof o == "function" && o(null, w), w;
};
const we = Pt, ot = dt, bt = Mt, me = St;
function lt(e, t, i, o, r) {
  const n = [].slice.call(arguments, 1), s = n.length, c = typeof n[s - 1] == "function";
  if (!c && !we())
    throw new Error("Callback required as last argument");
  if (c) {
    if (s < 2)
      throw new Error("Too few arguments provided");
    s === 2 ? (r = i, i = t, t = o = void 0) : s === 3 && (t.getContext && typeof r > "u" ? (r = o, o = void 0) : (r = o, o = i, i = t, t = void 0));
  } else {
    if (s < 1)
      throw new Error("Too few arguments provided");
    return s === 1 ? (i = t, t = o = void 0) : s === 2 && !t.getContext && (o = i, i = t, t = void 0), new Promise(function(u, l) {
      try {
        const a = ot.create(i, o);
        u(e(a, t, o));
      } catch (a) {
        l(a);
      }
    });
  }
  try {
    const u = ot.create(i, o);
    r(null, e(u, t, o));
  } catch (u) {
    r(u);
  }
}
O.create = ot.create;
O.toCanvas = lt.bind(null, bt.render);
O.toDataURL = lt.bind(null, bt.renderToDataURL);
O.toString = lt.bind(null, function(e, t, i) {
  return me.render(e, i);
});
export {
  O as b
};
