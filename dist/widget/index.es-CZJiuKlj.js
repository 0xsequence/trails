import { g as Ha, c as x, a as ai, C as Ga, d as So, e as Wa, f as Ja, s as Vs, h as Qa, I as fi, i as It, k as ps, A as Ya, E as Pe, j as Za, l as Xa, y as De, m as Rt, r as yi, O as Er, o as Me, n as ec, p as Ir, q as Pr, t as ds, N as _r, P as kr, Q as tc, u as ic, v as sc, w as Fr, x as ii, z as Oo, B as ct, D as et, F as gt, G as We } from "./index-BTADCVrB.js";
import { recoverAddress as rc } from "viem";
import { f as Ue, t as Oe, c as xi } from "./to-string-c9IXkpj-.js";
const nc = ":";
function oi(i) {
  const [e, t] = i.split(nc);
  return { namespace: e, reference: t };
}
function Ur(i, e = []) {
  const t = [];
  return Object.keys(i).forEach((s) => {
    if (e.length && !e.includes(s)) return;
    const r = i[s];
    t.push(...r.accounts);
  }), t;
}
function Ao(i, e) {
  return i.includes(":") ? [i] : e.chains || [];
}
var oc = Object.defineProperty, ac = Object.defineProperties, cc = Object.getOwnPropertyDescriptors, Mr = Object.getOwnPropertySymbols, hc = Object.prototype.hasOwnProperty, lc = Object.prototype.propertyIsEnumerable, Lr = (i, e, t) => e in i ? oc(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t, Br = (i, e) => {
  for (var t in e || (e = {})) hc.call(e, t) && Lr(i, t, e[t]);
  if (Mr) for (var t of Mr(e)) lc.call(e, t) && Lr(i, t, e[t]);
  return i;
}, uc = (i, e) => ac(i, cc(e));
const pc = "ReactNative", Te = { reactNative: "react-native", node: "node", browser: "browser", unknown: "unknown" }, dc = "js";
function as() {
  return typeof process < "u" && typeof process.versions < "u" && typeof process.versions.node < "u";
}
function Pt() {
  return !ai() && !!So() && navigator.product === pc;
}
function gc() {
  return Pt() && typeof global < "u" && typeof (global == null ? void 0 : global.Platform) < "u" && (global == null ? void 0 : global.Platform.OS) === "android";
}
function fc() {
  return Pt() && typeof global < "u" && typeof (global == null ? void 0 : global.Platform) < "u" && (global == null ? void 0 : global.Platform.OS) === "ios";
}
function mi() {
  return !as() && !!So() && !!ai();
}
function Ui() {
  return Pt() ? Te.reactNative : as() ? Te.node : mi() ? Te.browser : Te.unknown;
}
function zr() {
  var i;
  try {
    return Pt() && typeof global < "u" && typeof (global == null ? void 0 : global.Application) < "u" ? (i = global.Application) == null ? void 0 : i.applicationId : void 0;
  } catch {
    return;
  }
}
function yc(i, e) {
  const t = new URLSearchParams(i);
  for (const s of Object.keys(e).sort()) if (e.hasOwnProperty(s)) {
    const r = e[s];
    r !== void 0 && t.set(s, r);
  }
  return t.toString();
}
function mc(i) {
  var e, t;
  const s = Co();
  try {
    return i != null && i.url && s.url && new URL(i.url).host !== new URL(s.url).host && (console.warn(`The configured WalletConnect 'metadata.url':${i.url} differs from the actual page url:${s.url}. This is probably unintended and can lead to issues.`), i.url = s.url), (e = i == null ? void 0 : i.icons) != null && e.length && i.icons.length > 0 && (i.icons = i.icons.filter((r) => r !== "")), uc(Br(Br({}, s), i), { url: (i == null ? void 0 : i.url) || s.url, name: (i == null ? void 0 : i.name) || s.name, description: (i == null ? void 0 : i.description) || s.description, icons: (t = i == null ? void 0 : i.icons) != null && t.length && i.icons.length > 0 ? i.icons : s.icons });
  } catch (r) {
    return console.warn("Error populating app metadata", r), i || s;
  }
}
function Co() {
  return Ha() || { name: "", description: "", url: "", icons: [""] };
}
function wc() {
  if (Ui() === Te.reactNative && typeof global < "u" && typeof (global == null ? void 0 : global.Platform) < "u") {
    const { OS: t, Version: s } = global.Platform;
    return [t, s].join("-");
  }
  const i = Wa();
  if (i === null) return "unknown";
  const e = i.os ? i.os.replace(" ", "").toLowerCase() : "unknown";
  return i.type === "browser" ? [e, i.name, i.version].join("-") : [e, i.version].join("-");
}
function bc() {
  var i;
  const e = Ui();
  return e === Te.browser ? [e, ((i = Ja()) == null ? void 0 : i.host) || "unknown"].join(":") : e;
}
function xo(i, e, t) {
  const s = wc(), r = bc();
  return [[i, e].join("-"), [dc, t].join("-"), s, r].join("/");
}
function vc({ protocol: i, version: e, relayUrl: t, sdkVersion: s, auth: r, projectId: n, useOnCloseEvent: o, bundleId: a, packageName: c }) {
  const h = t.split("?"), l = xo(i, e, s), u = { auth: r, ua: l, projectId: n, useOnCloseEvent: o, packageName: c || void 0, bundleId: a || void 0 }, p = yc(h[1] || "", u);
  return h[0] + "?" + p;
}
function Tt(i, e) {
  return i.filter((t) => e.includes(t)).length === i.length;
}
function Ks(i) {
  return Object.fromEntries(i.entries());
}
function Hs(i) {
  return new Map(Object.entries(i));
}
function Ot(i = x.FIVE_MINUTES, e) {
  const t = x.toMiliseconds(i || x.FIVE_MINUTES);
  let s, r, n, o;
  return { resolve: (a) => {
    n && s && (clearTimeout(n), s(a), o = Promise.resolve(a));
  }, reject: (a) => {
    n && r && (clearTimeout(n), r(a));
  }, done: () => new Promise((a, c) => {
    if (o) return a(o);
    n = setTimeout(() => {
      const h = new Error(e);
      o = Promise.reject(h), c(h);
    }, t), s = a, r = c;
  }) };
}
function bt(i, e, t) {
  return new Promise(async (s, r) => {
    const n = setTimeout(() => r(new Error(t)), e);
    try {
      const o = await i;
      s(o);
    } catch (o) {
      r(o);
    }
    clearTimeout(n);
  });
}
function No(i, e) {
  if (typeof e == "string" && e.startsWith(`${i}:`)) return e;
  if (i.toLowerCase() === "topic") {
    if (typeof e != "string") throw new Error('Value must be "string" for expirer target type: topic');
    return `topic:${e}`;
  } else if (i.toLowerCase() === "id") {
    if (typeof e != "number") throw new Error('Value must be "number" for expirer target type: id');
    return `id:${e}`;
  }
  throw new Error(`Unknown expirer target type: ${i}`);
}
function Ec(i) {
  return No("topic", i);
}
function Ic(i) {
  return No("id", i);
}
function Ro(i) {
  const [e, t] = i.split(":"), s = { id: void 0, topic: void 0 };
  if (e === "topic" && typeof t == "string") s.topic = t;
  else if (e === "id" && Number.isInteger(Number(t))) s.id = Number(t);
  else throw new Error(`Invalid target, expected id:number or topic:string, got ${e}:${t}`);
  return s;
}
function ae(i, e) {
  return x.fromMiliseconds(Date.now() + x.toMiliseconds(i));
}
function mt(i) {
  return Date.now() >= x.toMiliseconds(i);
}
function W(i, e) {
  return `${i}${e ? `:${e}` : ""}`;
}
function it(i = [], e = []) {
  return [.../* @__PURE__ */ new Set([...i, ...e])];
}
async function Pc({ id: i, topic: e, wcDeepLink: t }) {
  var s;
  try {
    if (!t) return;
    const r = typeof t == "string" ? JSON.parse(t) : t, n = r == null ? void 0 : r.href;
    if (typeof n != "string") return;
    const o = _c(n, i, e), a = Ui();
    if (a === Te.browser) {
      if (!((s = ai()) != null && s.hasFocus())) {
        console.warn("Document does not have focus, skipping deeplink.");
        return;
      }
      $c(o);
    } else a === Te.reactNative && typeof (global == null ? void 0 : global.Linking) < "u" && await global.Linking.openURL(o);
  } catch (r) {
    console.error(r);
  }
}
function _c(i, e, t) {
  const s = `requestId=${e}&sessionTopic=${t}`;
  i.endsWith("/") && (i = i.slice(0, -1));
  let r = `${i}`;
  if (i.startsWith("https://t.me")) {
    const n = i.includes("?") ? "&startapp=" : "?startapp=";
    r = `${r}${n}${Cc(s, !0)}`;
  } else r = `${r}/wc?${s}`;
  return r;
}
function $c(i) {
  let e = "_self";
  Ac() ? e = "_top" : (Oc() || i.startsWith("https://") || i.startsWith("http://")) && (e = "_blank"), window.open(i, e, "noreferrer noopener");
}
async function Sc(i, e) {
  let t = "";
  try {
    if (mi() && (t = localStorage.getItem(e), t)) return t;
    t = await i.getItem(e);
  } catch (s) {
    console.error(s);
  }
  return t;
}
function Vr(i, e) {
  if (!i.includes(e)) return null;
  const t = i.split(/([&,?,=])/), s = t.indexOf(e);
  return t[s + 2];
}
function Kr() {
  return typeof crypto < "u" && crypto != null && crypto.randomUUID ? crypto.randomUUID() : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/gu, (i) => {
    const e = Math.random() * 16 | 0;
    return (i === "x" ? e : e & 3 | 8).toString(16);
  });
}
function $r() {
  return typeof process < "u" && process.env.IS_VITEST === "true";
}
function Oc() {
  return typeof window < "u" && (!!window.TelegramWebviewProxy || !!window.Telegram || !!window.TelegramWebviewProxyProto);
}
function Ac() {
  try {
    return window.self !== window.top;
  } catch {
    return !1;
  }
}
function Cc(i, e = !1) {
  const t = Buffer.from(i).toString("base64");
  return e ? t.replace(/[=]/g, "") : t;
}
function To(i) {
  return Buffer.from(i, "base64").toString("utf-8");
}
function xc(i) {
  return new Promise((e) => setTimeout(e, i));
}
function qi(i) {
  if (!Number.isSafeInteger(i) || i < 0) throw new Error("positive integer expected, got " + i);
}
function Nc(i) {
  return i instanceof Uint8Array || ArrayBuffer.isView(i) && i.constructor.name === "Uint8Array";
}
function Mi(i, ...e) {
  if (!Nc(i)) throw new Error("Uint8Array expected");
  if (e.length > 0 && !e.includes(i.length)) throw new Error("Uint8Array expected of length " + e + ", got length=" + i.length);
}
function Sr(i) {
  if (typeof i != "function" || typeof i.create != "function") throw new Error("Hash should be wrapped by utils.wrapConstructor");
  qi(i.outputLen), qi(i.blockLen);
}
function ci(i, e = !0) {
  if (i.destroyed) throw new Error("Hash instance has been destroyed");
  if (e && i.finished) throw new Error("Hash#digest() has already been called");
}
function qo(i, e) {
  Mi(i);
  const t = e.outputLen;
  if (i.length < t) throw new Error("digestInto() expects output buffer of length at least " + t);
}
const Gi = BigInt(2 ** 32 - 1), Hr = BigInt(32);
function Rc(i, e = !1) {
  return e ? { h: Number(i & Gi), l: Number(i >> Hr & Gi) } : { h: Number(i >> Hr & Gi) | 0, l: Number(i & Gi) | 0 };
}
function Tc(i, e = !1) {
  let t = new Uint32Array(i.length), s = new Uint32Array(i.length);
  for (let r = 0; r < i.length; r++) {
    const { h: n, l: o } = Rc(i[r], e);
    [t[r], s[r]] = [n, o];
  }
  return [t, s];
}
const qc = (i, e, t) => i << t | e >>> 32 - t, Dc = (i, e, t) => e << t | i >>> 32 - t, jc = (i, e, t) => e << t - 32 | i >>> 64 - t, kc = (i, e, t) => i << t - 32 | e >>> 64 - t, Mt = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
function Fc(i) {
  return new Uint32Array(i.buffer, i.byteOffset, Math.floor(i.byteLength / 4));
}
function Is(i) {
  return new DataView(i.buffer, i.byteOffset, i.byteLength);
}
function Qe(i, e) {
  return i << 32 - e | i >>> e;
}
const Gr = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
function Uc(i) {
  return i << 24 & 4278190080 | i << 8 & 16711680 | i >>> 8 & 65280 | i >>> 24 & 255;
}
function Wr(i) {
  for (let e = 0; e < i.length; e++) i[e] = Uc(i[e]);
}
function Mc(i) {
  if (typeof i != "string") throw new Error("utf8ToBytes expected string, got " + typeof i);
  return new Uint8Array(new TextEncoder().encode(i));
}
function hi(i) {
  return typeof i == "string" && (i = Mc(i)), Mi(i), i;
}
function Lc(...i) {
  let e = 0;
  for (let s = 0; s < i.length; s++) {
    const r = i[s];
    Mi(r), e += r.length;
  }
  const t = new Uint8Array(e);
  for (let s = 0, r = 0; s < i.length; s++) {
    const n = i[s];
    t.set(n, r), r += n.length;
  }
  return t;
}
let Or = class {
  clone() {
    return this._cloneInto();
  }
};
function Do(i) {
  const e = (s) => i().update(hi(s)).digest(), t = i();
  return e.outputLen = t.outputLen, e.blockLen = t.blockLen, e.create = () => i(), e;
}
function wi(i = 32) {
  if (Mt && typeof Mt.getRandomValues == "function") return Mt.getRandomValues(new Uint8Array(i));
  if (Mt && typeof Mt.randomBytes == "function") return Mt.randomBytes(i);
  throw new Error("crypto.getRandomValues must be defined");
}
const jo = [], ko = [], Fo = [], Bc = BigInt(0), Ei = BigInt(1), zc = BigInt(2), Vc = BigInt(7), Kc = BigInt(256), Hc = BigInt(113);
for (let i = 0, e = Ei, t = 1, s = 0; i < 24; i++) {
  [t, s] = [s, (2 * t + 3 * s) % 5], jo.push(2 * (5 * s + t)), ko.push((i + 1) * (i + 2) / 2 % 64);
  let r = Bc;
  for (let n = 0; n < 7; n++) e = (e << Ei ^ (e >> Vc) * Hc) % Kc, e & zc && (r ^= Ei << (Ei << BigInt(n)) - Ei);
  Fo.push(r);
}
const [Gc, Wc] = Tc(Fo, !0), Jr = (i, e, t) => t > 32 ? jc(i, e, t) : qc(i, e, t), Qr = (i, e, t) => t > 32 ? kc(i, e, t) : Dc(i, e, t);
function Jc(i, e = 24) {
  const t = new Uint32Array(10);
  for (let s = 24 - e; s < 24; s++) {
    for (let o = 0; o < 10; o++) t[o] = i[o] ^ i[o + 10] ^ i[o + 20] ^ i[o + 30] ^ i[o + 40];
    for (let o = 0; o < 10; o += 2) {
      const a = (o + 8) % 10, c = (o + 2) % 10, h = t[c], l = t[c + 1], u = Jr(h, l, 1) ^ t[a], p = Qr(h, l, 1) ^ t[a + 1];
      for (let d = 0; d < 50; d += 10) i[o + d] ^= u, i[o + d + 1] ^= p;
    }
    let r = i[2], n = i[3];
    for (let o = 0; o < 24; o++) {
      const a = ko[o], c = Jr(r, n, a), h = Qr(r, n, a), l = jo[o];
      r = i[l], n = i[l + 1], i[l] = c, i[l + 1] = h;
    }
    for (let o = 0; o < 50; o += 10) {
      for (let a = 0; a < 10; a++) t[a] = i[o + a];
      for (let a = 0; a < 10; a++) i[o + a] ^= ~t[(a + 2) % 10] & t[(a + 4) % 10];
    }
    i[0] ^= Gc[s], i[1] ^= Wc[s];
  }
  t.fill(0);
}
let Qc = class Uo extends Or {
  constructor(e, t, s, r = !1, n = 24) {
    if (super(), this.blockLen = e, this.suffix = t, this.outputLen = s, this.enableXOF = r, this.rounds = n, this.pos = 0, this.posOut = 0, this.finished = !1, this.destroyed = !1, qi(s), 0 >= this.blockLen || this.blockLen >= 200) throw new Error("Sha3 supports only keccak-f1600 function");
    this.state = new Uint8Array(200), this.state32 = Fc(this.state);
  }
  keccak() {
    Gr || Wr(this.state32), Jc(this.state32, this.rounds), Gr || Wr(this.state32), this.posOut = 0, this.pos = 0;
  }
  update(e) {
    ci(this);
    const { blockLen: t, state: s } = this;
    e = hi(e);
    const r = e.length;
    for (let n = 0; n < r; ) {
      const o = Math.min(t - this.pos, r - n);
      for (let a = 0; a < o; a++) s[this.pos++] ^= e[n++];
      this.pos === t && this.keccak();
    }
    return this;
  }
  finish() {
    if (this.finished) return;
    this.finished = !0;
    const { state: e, suffix: t, pos: s, blockLen: r } = this;
    e[s] ^= t, t & 128 && s === r - 1 && this.keccak(), e[r - 1] ^= 128, this.keccak();
  }
  writeInto(e) {
    ci(this, !1), Mi(e), this.finish();
    const t = this.state, { blockLen: s } = this;
    for (let r = 0, n = e.length; r < n; ) {
      this.posOut >= s && this.keccak();
      const o = Math.min(s - this.posOut, n - r);
      e.set(t.subarray(this.posOut, this.posOut + o), r), this.posOut += o, r += o;
    }
    return e;
  }
  xofInto(e) {
    if (!this.enableXOF) throw new Error("XOF is not possible for this instance");
    return this.writeInto(e);
  }
  xof(e) {
    return qi(e), this.xofInto(new Uint8Array(e));
  }
  digestInto(e) {
    if (qo(e, this), this.finished) throw new Error("digest() was already called");
    return this.writeInto(e), this.destroy(), e;
  }
  digest() {
    return this.digestInto(new Uint8Array(this.outputLen));
  }
  destroy() {
    this.destroyed = !0, this.state.fill(0);
  }
  _cloneInto(e) {
    const { blockLen: t, suffix: s, outputLen: r, rounds: n, enableXOF: o } = this;
    return e || (e = new Uo(t, s, r, o, n)), e.state32.set(this.state32), e.pos = this.pos, e.posOut = this.posOut, e.finished = this.finished, e.rounds = n, e.suffix = s, e.outputLen = r, e.enableXOF = o, e.destroyed = this.destroyed, e;
  }
};
const Yc = (i, e, t) => Do(() => new Qc(e, i, t)), Zc = Yc(1, 136, 256 / 8), Xc = "https://rpc.walletconnect.org/v1";
function Mo(i) {
  const e = `Ethereum Signed Message:
${i.length}`, t = new TextEncoder().encode(e + i);
  return "0x" + Buffer.from(Zc(t)).toString("hex");
}
async function eh(i, e, t, s, r, n) {
  switch (t.t) {
    case "eip191":
      return await th(i, e, t.s);
    case "eip1271":
      return await ih(i, e, t.s, s, r, n);
    default:
      throw new Error(`verifySignature failed: Attempted to verify CacaoSignature with unknown type: ${t.t}`);
  }
}
async function th(i, e, t) {
  return (await rc({ hash: Mo(e), signature: t })).toLowerCase() === i.toLowerCase();
}
async function ih(i, e, t, s, r, n) {
  const o = oi(s);
  if (!o.namespace || !o.reference) throw new Error(`isValidEip1271Signature failed: chainId must be in CAIP-2 format, received: ${s}`);
  try {
    const a = "0x1626ba7e", c = "0000000000000000000000000000000000000000000000000000000000000040", h = "0000000000000000000000000000000000000000000000000000000000000041", l = t.substring(2), u = Mo(e).substring(2), p = a + u + c + h + l, d = await fetch(`${n || Xc}/?chainId=${s}&projectId=${r}`, { method: "POST", body: JSON.stringify({ id: sh(), jsonrpc: "2.0", method: "eth_call", params: [{ to: i, data: p }, "latest"] }) }), { result: f } = await d.json();
    return f ? f.slice(0, a.length).toLowerCase() === a.toLowerCase() : !1;
  } catch (a) {
    return console.error("isValidEip1271Signature: ", a), !1;
  }
}
function sh() {
  return Date.now() + Math.floor(Math.random() * 1e3);
}
function rh(i) {
  const e = atob(i), t = new Uint8Array(e.length);
  for (let o = 0; o < e.length; o++) t[o] = e.charCodeAt(o);
  const s = t[0];
  if (s === 0) throw new Error("No signatures found");
  const r = 1 + s * 64;
  if (t.length < r) throw new Error("Transaction data too short for claimed signature count");
  if (t.length < 100) throw new Error("Transaction too short");
  const n = Buffer.from(i, "base64").slice(1, 65);
  return Qa.encode(n);
}
var nh = Object.defineProperty, oh = Object.defineProperties, ah = Object.getOwnPropertyDescriptors, Yr = Object.getOwnPropertySymbols, ch = Object.prototype.hasOwnProperty, hh = Object.prototype.propertyIsEnumerable, Zr = (i, e, t) => e in i ? nh(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t, lh = (i, e) => {
  for (var t in e || (e = {})) ch.call(e, t) && Zr(i, t, e[t]);
  if (Yr) for (var t of Yr(e)) hh.call(e, t) && Zr(i, t, e[t]);
  return i;
}, uh = (i, e) => oh(i, ah(e));
const ph = "did:pkh:", Ar = (i) => i == null ? void 0 : i.split(":"), dh = (i) => {
  const e = i && Ar(i);
  if (e) return i.includes(ph) ? e[3] : e[1];
}, Gs = (i) => {
  const e = i && Ar(i);
  if (e) return e[2] + ":" + e[3];
}, cs = (i) => {
  const e = i && Ar(i);
  if (e) return e.pop();
};
async function Xr(i) {
  const { cacao: e, projectId: t } = i, { s, p: r } = e, n = Lo(r, r.iss), o = cs(r.iss);
  return await eh(o, n, s, Gs(r.iss), t);
}
const Lo = (i, e) => {
  const t = `${i.domain} wants you to sign in with your Ethereum account:`, s = cs(e);
  if (!i.aud && !i.uri) throw new Error("Either `aud` or `uri` is required to construct the message");
  let r = i.statement || void 0;
  const n = `URI: ${i.aud || i.uri}`, o = `Version: ${i.version}`, a = `Chain ID: ${dh(e)}`, c = `Nonce: ${i.nonce}`, h = `Issued At: ${i.iat}`, l = i.exp ? `Expiration Time: ${i.exp}` : void 0, u = i.nbf ? `Not Before: ${i.nbf}` : void 0, p = i.requestId ? `Request ID: ${i.requestId}` : void 0, d = i.resources ? `Resources:${i.resources.map((m) => `
- ${m}`).join("")}` : void 0, f = ss(i.resources);
  if (f) {
    const m = Di(f);
    r = Ih(r, m);
  }
  return [t, s, "", r, "", n, o, a, c, h, l, u, p, d].filter((m) => m != null).join(`
`);
};
function gh(i) {
  return Buffer.from(JSON.stringify(i)).toString("base64");
}
function fh(i) {
  return JSON.parse(Buffer.from(i, "base64").toString("utf-8"));
}
function Dt(i) {
  if (!i) throw new Error("No recap provided, value is undefined");
  if (!i.att) throw new Error("No `att` property found");
  const e = Object.keys(i.att);
  if (!(e != null && e.length)) throw new Error("No resources found in `att` property");
  e.forEach((t) => {
    const s = i.att[t];
    if (Array.isArray(s)) throw new Error(`Resource must be an object: ${t}`);
    if (typeof s != "object") throw new Error(`Resource must be an object: ${t}`);
    if (!Object.keys(s).length) throw new Error(`Resource object is empty: ${t}`);
    Object.keys(s).forEach((r) => {
      const n = s[r];
      if (!Array.isArray(n)) throw new Error(`Ability limits ${r} must be an array of objects, found: ${n}`);
      if (!n.length) throw new Error(`Value of ${r} is empty array, must be an array with objects`);
      n.forEach((o) => {
        if (typeof o != "object") throw new Error(`Ability limits (${r}) must be an array of objects, found: ${o}`);
      });
    });
  });
}
function yh(i, e, t, s = {}) {
  return t == null || t.sort((r, n) => r.localeCompare(n)), { att: { [i]: mh(e, t, s) } };
}
function mh(i, e, t = {}) {
  e = e == null ? void 0 : e.sort((r, n) => r.localeCompare(n));
  const s = e.map((r) => ({ [`${i}/${r}`]: [t] }));
  return Object.assign({}, ...s);
}
function Bo(i) {
  return Dt(i), `urn:recap:${gh(i).replace(/=/g, "")}`;
}
function Di(i) {
  const e = fh(i.replace("urn:recap:", ""));
  return Dt(e), e;
}
function wh(i, e, t) {
  const s = yh(i, e, t);
  return Bo(s);
}
function bh(i) {
  return i && i.includes("urn:recap:");
}
function vh(i, e) {
  const t = Di(i), s = Di(e), r = Eh(t, s);
  return Bo(r);
}
function Eh(i, e) {
  Dt(i), Dt(e);
  const t = Object.keys(i.att).concat(Object.keys(e.att)).sort((r, n) => r.localeCompare(n)), s = { att: {} };
  return t.forEach((r) => {
    var n, o;
    Object.keys(((n = i.att) == null ? void 0 : n[r]) || {}).concat(Object.keys(((o = e.att) == null ? void 0 : o[r]) || {})).sort((a, c) => a.localeCompare(c)).forEach((a) => {
      var c, h;
      s.att[r] = uh(lh({}, s.att[r]), { [a]: ((c = i.att[r]) == null ? void 0 : c[a]) || ((h = e.att[r]) == null ? void 0 : h[a]) });
    });
  }), s;
}
function Ih(i = "", e) {
  Dt(e);
  const t = "I further authorize the stated URI to perform the following actions on my behalf: ";
  if (i.includes(t)) return i;
  const s = [];
  let r = 0;
  Object.keys(e.att).forEach((a) => {
    const c = Object.keys(e.att[a]).map((u) => ({ ability: u.split("/")[0], action: u.split("/")[1] }));
    c.sort((u, p) => u.action.localeCompare(p.action));
    const h = {};
    c.forEach((u) => {
      h[u.ability] || (h[u.ability] = []), h[u.ability].push(u.action);
    });
    const l = Object.keys(h).map((u) => (r++, `(${r}) '${u}': '${h[u].join("', '")}' for '${a}'.`));
    s.push(l.join(", ").replace(".,", "."));
  });
  const n = s.join(" "), o = `${t}${n}`;
  return `${i ? i + " " : ""}${o}`;
}
function en(i) {
  var e;
  const t = Di(i);
  Dt(t);
  const s = (e = t.att) == null ? void 0 : e.eip155;
  return s ? Object.keys(s).map((r) => r.split("/")[1]) : [];
}
function tn(i) {
  const e = Di(i);
  Dt(e);
  const t = [];
  return Object.values(e.att).forEach((s) => {
    Object.values(s).forEach((r) => {
      var n;
      (n = r == null ? void 0 : r[0]) != null && n.chains && t.push(r[0].chains);
    });
  }), [...new Set(t.flat())];
}
function ss(i) {
  if (!i) return;
  const e = i == null ? void 0 : i[i.length - 1];
  return bh(e) ? e : void 0;
}
function Ps(i) {
  if (!Number.isSafeInteger(i) || i < 0) throw new Error("positive integer expected, got " + i);
}
function zo(i) {
  return i instanceof Uint8Array || ArrayBuffer.isView(i) && i.constructor.name === "Uint8Array";
}
function Re(i, ...e) {
  if (!zo(i)) throw new Error("Uint8Array expected");
  if (e.length > 0 && !e.includes(i.length)) throw new Error("Uint8Array expected of length " + e + ", got length=" + i.length);
}
function sn(i, e = !0) {
  if (i.destroyed) throw new Error("Hash instance has been destroyed");
  if (e && i.finished) throw new Error("Hash#digest() has already been called");
}
function Ph(i, e) {
  Re(i);
  const t = e.outputLen;
  if (i.length < t) throw new Error("digestInto() expects output buffer of length at least " + t);
}
function rn(i) {
  if (typeof i != "boolean") throw new Error(`boolean expected, not ${i}`);
}
const vt = (i) => new Uint32Array(i.buffer, i.byteOffset, Math.floor(i.byteLength / 4)), _h = (i) => new DataView(i.buffer, i.byteOffset, i.byteLength), $h = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
if (!$h) throw new Error("Non little-endian hardware is not supported");
function Sh(i) {
  if (typeof i != "string") throw new Error("string expected");
  return new Uint8Array(new TextEncoder().encode(i));
}
function Ws(i) {
  if (typeof i == "string") i = Sh(i);
  else if (zo(i)) i = Js(i);
  else throw new Error("Uint8Array expected, got " + typeof i);
  return i;
}
function Oh(i, e) {
  if (e == null || typeof e != "object") throw new Error("options must be defined");
  return Object.assign(i, e);
}
function Ah(i, e) {
  if (i.length !== e.length) return !1;
  let t = 0;
  for (let s = 0; s < i.length; s++) t |= i[s] ^ e[s];
  return t === 0;
}
const Ch = (i, e) => {
  function t(s, ...r) {
    if (Re(s), i.nonceLength !== void 0) {
      const h = r[0];
      if (!h) throw new Error("nonce / iv required");
      i.varSizeNonce ? Re(h) : Re(h, i.nonceLength);
    }
    const n = i.tagLength;
    n && r[1] !== void 0 && Re(r[1]);
    const o = e(s, ...r), a = (h, l) => {
      if (l !== void 0) {
        if (h !== 2) throw new Error("cipher output not supported");
        Re(l);
      }
    };
    let c = !1;
    return { encrypt(h, l) {
      if (c) throw new Error("cannot encrypt() twice with same key + nonce");
      return c = !0, Re(h), a(o.encrypt.length, l), o.encrypt(h, l);
    }, decrypt(h, l) {
      if (Re(h), n && h.length < n) throw new Error("invalid ciphertext length: smaller than tagLength=" + n);
      return a(o.decrypt.length, l), o.decrypt(h, l);
    } };
  }
  return Object.assign(t, i), t;
};
function nn(i, e, t = !0) {
  if (e === void 0) return new Uint8Array(i);
  if (e.length !== i) throw new Error("invalid output length, expected " + i + ", got: " + e.length);
  if (t && !xh(e)) throw new Error("invalid output, must be aligned");
  return e;
}
function on(i, e, t, s) {
  if (typeof i.setBigUint64 == "function") return i.setBigUint64(e, t, s);
  const r = BigInt(32), n = BigInt(4294967295), o = Number(t >> r & n), a = Number(t & n);
  i.setUint32(e + 4, o, s), i.setUint32(e + 0, a, s);
}
function xh(i) {
  return i.byteOffset % 4 === 0;
}
function Js(i) {
  return Uint8Array.from(i);
}
function li(...i) {
  for (let e = 0; e < i.length; e++) i[e].fill(0);
}
const Vo = (i) => Uint8Array.from(i.split("").map((e) => e.charCodeAt(0))), Nh = Vo("expand 16-byte k"), Rh = Vo("expand 32-byte k"), Th = vt(Nh), qh = vt(Rh);
function V(i, e) {
  return i << e | i >>> 32 - e;
}
function Qs(i) {
  return i.byteOffset % 4 === 0;
}
const Wi = 64, Dh = 16, Ko = 2 ** 32 - 1, an = new Uint32Array();
function jh(i, e, t, s, r, n, o, a) {
  const c = r.length, h = new Uint8Array(Wi), l = vt(h), u = Qs(r) && Qs(n), p = u ? vt(r) : an, d = u ? vt(n) : an;
  for (let f = 0; f < c; o++) {
    if (i(e, t, s, l, o, a), o >= Ko) throw new Error("arx: counter overflow");
    const m = Math.min(Wi, c - f);
    if (u && m === Wi) {
      const g = f / 4;
      if (f % 4 !== 0) throw new Error("arx: invalid block position");
      for (let w = 0, y; w < Dh; w++) y = g + w, d[y] = p[y] ^ l[w];
      f += Wi;
      continue;
    }
    for (let g = 0, w; g < m; g++) w = f + g, n[w] = r[w] ^ h[g];
    f += m;
  }
}
function kh(i, e) {
  const { allowShortKeys: t, extendNonceFn: s, counterLength: r, counterRight: n, rounds: o } = Oh({ allowShortKeys: !1, counterLength: 8, counterRight: !1, rounds: 20 }, e);
  if (typeof i != "function") throw new Error("core must be a function");
  return Ps(r), Ps(o), rn(n), rn(t), (a, c, h, l, u = 0) => {
    Re(a), Re(c), Re(h);
    const p = h.length;
    if (l === void 0 && (l = new Uint8Array(p)), Re(l), Ps(u), u < 0 || u >= Ko) throw new Error("arx: counter overflow");
    if (l.length < p) throw new Error(`arx: output (${l.length}) is shorter than data (${p})`);
    const d = [];
    let f = a.length, m, g;
    if (f === 32) d.push(m = Js(a)), g = qh;
    else if (f === 16 && t) m = new Uint8Array(32), m.set(a), m.set(a, 16), g = Th, d.push(m);
    else throw new Error(`arx: invalid 32-byte key, got length=${f}`);
    Qs(c) || d.push(c = Js(c));
    const w = vt(m);
    if (s) {
      if (c.length !== 24) throw new Error("arx: extended nonce must be 24 bytes");
      s(g, w, vt(c.subarray(0, 16)), w), c = c.subarray(16);
    }
    const y = 16 - r;
    if (y !== c.length) throw new Error(`arx: nonce must be ${y} or 16 bytes`);
    if (y !== 12) {
      const A = new Uint8Array(12);
      A.set(c, n ? 0 : 12 - c.length), c = A, d.push(c);
    }
    const I = vt(c);
    return jh(i, g, w, I, h, l, u, o), li(...d), l;
  };
}
const ge = (i, e) => i[e++] & 255 | (i[e++] & 255) << 8;
class Fh {
  constructor(e) {
    this.blockLen = 16, this.outputLen = 16, this.buffer = new Uint8Array(16), this.r = new Uint16Array(10), this.h = new Uint16Array(10), this.pad = new Uint16Array(8), this.pos = 0, this.finished = !1, e = Ws(e), Re(e, 32);
    const t = ge(e, 0), s = ge(e, 2), r = ge(e, 4), n = ge(e, 6), o = ge(e, 8), a = ge(e, 10), c = ge(e, 12), h = ge(e, 14);
    this.r[0] = t & 8191, this.r[1] = (t >>> 13 | s << 3) & 8191, this.r[2] = (s >>> 10 | r << 6) & 7939, this.r[3] = (r >>> 7 | n << 9) & 8191, this.r[4] = (n >>> 4 | o << 12) & 255, this.r[5] = o >>> 1 & 8190, this.r[6] = (o >>> 14 | a << 2) & 8191, this.r[7] = (a >>> 11 | c << 5) & 8065, this.r[8] = (c >>> 8 | h << 8) & 8191, this.r[9] = h >>> 5 & 127;
    for (let l = 0; l < 8; l++) this.pad[l] = ge(e, 16 + 2 * l);
  }
  process(e, t, s = !1) {
    const r = s ? 0 : 2048, { h: n, r: o } = this, a = o[0], c = o[1], h = o[2], l = o[3], u = o[4], p = o[5], d = o[6], f = o[7], m = o[8], g = o[9], w = ge(e, t + 0), y = ge(e, t + 2), I = ge(e, t + 4), A = ge(e, t + 6), N = ge(e, t + 8), P = ge(e, t + 10), $ = ge(e, t + 12), R = ge(e, t + 14);
    let b = n[0] + (w & 8191), k = n[1] + ((w >>> 13 | y << 3) & 8191), q = n[2] + ((y >>> 10 | I << 6) & 8191), j = n[3] + ((I >>> 7 | A << 9) & 8191), U = n[4] + ((A >>> 4 | N << 12) & 8191), E = n[5] + (N >>> 1 & 8191), O = n[6] + ((N >>> 14 | P << 2) & 8191), S = n[7] + ((P >>> 11 | $ << 5) & 8191), T = n[8] + (($ >>> 8 | R << 8) & 8191), D = n[9] + (R >>> 5 | r), _ = 0, F = _ + b * a + k * (5 * g) + q * (5 * m) + j * (5 * f) + U * (5 * d);
    _ = F >>> 13, F &= 8191, F += E * (5 * p) + O * (5 * u) + S * (5 * l) + T * (5 * h) + D * (5 * c), _ += F >>> 13, F &= 8191;
    let M = _ + b * c + k * a + q * (5 * g) + j * (5 * m) + U * (5 * f);
    _ = M >>> 13, M &= 8191, M += E * (5 * d) + O * (5 * p) + S * (5 * u) + T * (5 * l) + D * (5 * h), _ += M >>> 13, M &= 8191;
    let L = _ + b * h + k * c + q * a + j * (5 * g) + U * (5 * m);
    _ = L >>> 13, L &= 8191, L += E * (5 * f) + O * (5 * d) + S * (5 * p) + T * (5 * u) + D * (5 * l), _ += L >>> 13, L &= 8191;
    let Z = _ + b * l + k * h + q * c + j * a + U * (5 * g);
    _ = Z >>> 13, Z &= 8191, Z += E * (5 * m) + O * (5 * f) + S * (5 * d) + T * (5 * p) + D * (5 * u), _ += Z >>> 13, Z &= 8191;
    let G = _ + b * u + k * l + q * h + j * c + U * a;
    _ = G >>> 13, G &= 8191, G += E * (5 * g) + O * (5 * m) + S * (5 * f) + T * (5 * d) + D * (5 * p), _ += G >>> 13, G &= 8191;
    let ie = _ + b * p + k * u + q * l + j * h + U * c;
    _ = ie >>> 13, ie &= 8191, ie += E * a + O * (5 * g) + S * (5 * m) + T * (5 * f) + D * (5 * d), _ += ie >>> 13, ie &= 8191;
    let ce = _ + b * d + k * p + q * u + j * l + U * h;
    _ = ce >>> 13, ce &= 8191, ce += E * c + O * a + S * (5 * g) + T * (5 * m) + D * (5 * f), _ += ce >>> 13, ce &= 8191;
    let be = _ + b * f + k * d + q * p + j * u + U * l;
    _ = be >>> 13, be &= 8191, be += E * h + O * c + S * a + T * (5 * g) + D * (5 * m), _ += be >>> 13, be &= 8191;
    let ne = _ + b * m + k * f + q * d + j * p + U * u;
    _ = ne >>> 13, ne &= 8191, ne += E * l + O * h + S * c + T * a + D * (5 * g), _ += ne >>> 13, ne &= 8191;
    let oe = _ + b * g + k * m + q * f + j * d + U * p;
    _ = oe >>> 13, oe &= 8191, oe += E * u + O * l + S * h + T * c + D * a, _ += oe >>> 13, oe &= 8191, _ = (_ << 2) + _ | 0, _ = _ + F | 0, F = _ & 8191, _ = _ >>> 13, M += _, n[0] = F, n[1] = M, n[2] = L, n[3] = Z, n[4] = G, n[5] = ie, n[6] = ce, n[7] = be, n[8] = ne, n[9] = oe;
  }
  finalize() {
    const { h: e, pad: t } = this, s = new Uint16Array(10);
    let r = e[1] >>> 13;
    e[1] &= 8191;
    for (let a = 2; a < 10; a++) e[a] += r, r = e[a] >>> 13, e[a] &= 8191;
    e[0] += r * 5, r = e[0] >>> 13, e[0] &= 8191, e[1] += r, r = e[1] >>> 13, e[1] &= 8191, e[2] += r, s[0] = e[0] + 5, r = s[0] >>> 13, s[0] &= 8191;
    for (let a = 1; a < 10; a++) s[a] = e[a] + r, r = s[a] >>> 13, s[a] &= 8191;
    s[9] -= 8192;
    let n = (r ^ 1) - 1;
    for (let a = 0; a < 10; a++) s[a] &= n;
    n = ~n;
    for (let a = 0; a < 10; a++) e[a] = e[a] & n | s[a];
    e[0] = (e[0] | e[1] << 13) & 65535, e[1] = (e[1] >>> 3 | e[2] << 10) & 65535, e[2] = (e[2] >>> 6 | e[3] << 7) & 65535, e[3] = (e[3] >>> 9 | e[4] << 4) & 65535, e[4] = (e[4] >>> 12 | e[5] << 1 | e[6] << 14) & 65535, e[5] = (e[6] >>> 2 | e[7] << 11) & 65535, e[6] = (e[7] >>> 5 | e[8] << 8) & 65535, e[7] = (e[8] >>> 8 | e[9] << 5) & 65535;
    let o = e[0] + t[0];
    e[0] = o & 65535;
    for (let a = 1; a < 8; a++) o = (e[a] + t[a] | 0) + (o >>> 16) | 0, e[a] = o & 65535;
    li(s);
  }
  update(e) {
    sn(this);
    const { buffer: t, blockLen: s } = this;
    e = Ws(e);
    const r = e.length;
    for (let n = 0; n < r; ) {
      const o = Math.min(s - this.pos, r - n);
      if (o === s) {
        for (; s <= r - n; n += s) this.process(e, n);
        continue;
      }
      t.set(e.subarray(n, n + o), this.pos), this.pos += o, n += o, this.pos === s && (this.process(t, 0, !1), this.pos = 0);
    }
    return this;
  }
  destroy() {
    li(this.h, this.r, this.buffer, this.pad);
  }
  digestInto(e) {
    sn(this), Ph(e, this), this.finished = !0;
    const { buffer: t, h: s } = this;
    let { pos: r } = this;
    if (r) {
      for (t[r++] = 1; r < 16; r++) t[r] = 0;
      this.process(t, 0, !0);
    }
    this.finalize();
    let n = 0;
    for (let o = 0; o < 8; o++) e[n++] = s[o] >>> 0, e[n++] = s[o] >>> 8;
    return e;
  }
  digest() {
    const { buffer: e, outputLen: t } = this;
    this.digestInto(e);
    const s = e.slice(0, t);
    return this.destroy(), s;
  }
}
function Uh(i) {
  const e = (s, r) => i(r).update(Ws(s)).digest(), t = i(new Uint8Array(32));
  return e.outputLen = t.outputLen, e.blockLen = t.blockLen, e.create = (s) => i(s), e;
}
const Mh = Uh((i) => new Fh(i));
function Lh(i, e, t, s, r, n = 20) {
  let o = i[0], a = i[1], c = i[2], h = i[3], l = e[0], u = e[1], p = e[2], d = e[3], f = e[4], m = e[5], g = e[6], w = e[7], y = r, I = t[0], A = t[1], N = t[2], P = o, $ = a, R = c, b = h, k = l, q = u, j = p, U = d, E = f, O = m, S = g, T = w, D = y, _ = I, F = A, M = N;
  for (let Z = 0; Z < n; Z += 2) P = P + k | 0, D = V(D ^ P, 16), E = E + D | 0, k = V(k ^ E, 12), P = P + k | 0, D = V(D ^ P, 8), E = E + D | 0, k = V(k ^ E, 7), $ = $ + q | 0, _ = V(_ ^ $, 16), O = O + _ | 0, q = V(q ^ O, 12), $ = $ + q | 0, _ = V(_ ^ $, 8), O = O + _ | 0, q = V(q ^ O, 7), R = R + j | 0, F = V(F ^ R, 16), S = S + F | 0, j = V(j ^ S, 12), R = R + j | 0, F = V(F ^ R, 8), S = S + F | 0, j = V(j ^ S, 7), b = b + U | 0, M = V(M ^ b, 16), T = T + M | 0, U = V(U ^ T, 12), b = b + U | 0, M = V(M ^ b, 8), T = T + M | 0, U = V(U ^ T, 7), P = P + q | 0, M = V(M ^ P, 16), S = S + M | 0, q = V(q ^ S, 12), P = P + q | 0, M = V(M ^ P, 8), S = S + M | 0, q = V(q ^ S, 7), $ = $ + j | 0, D = V(D ^ $, 16), T = T + D | 0, j = V(j ^ T, 12), $ = $ + j | 0, D = V(D ^ $, 8), T = T + D | 0, j = V(j ^ T, 7), R = R + U | 0, _ = V(_ ^ R, 16), E = E + _ | 0, U = V(U ^ E, 12), R = R + U | 0, _ = V(_ ^ R, 8), E = E + _ | 0, U = V(U ^ E, 7), b = b + k | 0, F = V(F ^ b, 16), O = O + F | 0, k = V(k ^ O, 12), b = b + k | 0, F = V(F ^ b, 8), O = O + F | 0, k = V(k ^ O, 7);
  let L = 0;
  s[L++] = o + P | 0, s[L++] = a + $ | 0, s[L++] = c + R | 0, s[L++] = h + b | 0, s[L++] = l + k | 0, s[L++] = u + q | 0, s[L++] = p + j | 0, s[L++] = d + U | 0, s[L++] = f + E | 0, s[L++] = m + O | 0, s[L++] = g + S | 0, s[L++] = w + T | 0, s[L++] = y + D | 0, s[L++] = I + _ | 0, s[L++] = A + F | 0, s[L++] = N + M | 0;
}
const Bh = kh(Lh, { counterRight: !1, counterLength: 4, allowShortKeys: !1 }), zh = new Uint8Array(16), cn = (i, e) => {
  i.update(e);
  const t = e.length % 16;
  t && i.update(zh.subarray(t));
}, Vh = new Uint8Array(32);
function hn(i, e, t, s, r) {
  const n = i(e, t, Vh), o = Mh.create(n);
  r && cn(o, r), cn(o, s);
  const a = new Uint8Array(16), c = _h(a);
  on(c, 0, BigInt(r ? r.length : 0), !0), on(c, 8, BigInt(s.length), !0), o.update(a);
  const h = o.digest();
  return li(n, a), h;
}
const Kh = (i) => (e, t, s) => ({ encrypt(r, n) {
  const o = r.length;
  n = nn(o + 16, n, !1), n.set(r);
  const a = n.subarray(0, -16);
  i(e, t, a, a, 1);
  const c = hn(i, e, t, a, s);
  return n.set(c, o), li(c), n;
}, decrypt(r, n) {
  n = nn(r.length - 16, n, !1);
  const o = r.subarray(0, -16), a = r.subarray(-16), c = hn(i, e, t, o, s);
  if (!Ah(a, c)) throw new Error("invalid tag");
  return n.set(r.subarray(0, -16)), i(e, t, n, n, 1), li(c), n;
} }), Ho = Ch({ blockSize: 64, nonceLength: 12, tagLength: 16 }, Kh(Bh));
let Go = class extends Or {
  constructor(e, t) {
    super(), this.finished = !1, this.destroyed = !1, Sr(e);
    const s = hi(t);
    if (this.iHash = e.create(), typeof this.iHash.update != "function") throw new Error("Expected instance of class which extends utils.Hash");
    this.blockLen = this.iHash.blockLen, this.outputLen = this.iHash.outputLen;
    const r = this.blockLen, n = new Uint8Array(r);
    n.set(s.length > r ? e.create().update(s).digest() : s);
    for (let o = 0; o < n.length; o++) n[o] ^= 54;
    this.iHash.update(n), this.oHash = e.create();
    for (let o = 0; o < n.length; o++) n[o] ^= 106;
    this.oHash.update(n), n.fill(0);
  }
  update(e) {
    return ci(this), this.iHash.update(e), this;
  }
  digestInto(e) {
    ci(this), Mi(e, this.outputLen), this.finished = !0, this.iHash.digestInto(e), this.oHash.update(e), this.oHash.digestInto(e), this.destroy();
  }
  digest() {
    const e = new Uint8Array(this.oHash.outputLen);
    return this.digestInto(e), e;
  }
  _cloneInto(e) {
    e || (e = Object.create(Object.getPrototypeOf(this), {}));
    const { oHash: t, iHash: s, finished: r, destroyed: n, blockLen: o, outputLen: a } = this;
    return e = e, e.finished = r, e.destroyed = n, e.blockLen = o, e.outputLen = a, e.oHash = t._cloneInto(e.oHash), e.iHash = s._cloneInto(e.iHash), e;
  }
  destroy() {
    this.destroyed = !0, this.oHash.destroy(), this.iHash.destroy();
  }
};
const gs = (i, e, t) => new Go(i, e).update(t).digest();
gs.create = (i, e) => new Go(i, e);
function Hh(i, e, t) {
  return Sr(i), t === void 0 && (t = new Uint8Array(i.outputLen)), gs(i, hi(t), hi(e));
}
const _s = new Uint8Array([0]), ln = new Uint8Array();
function Gh(i, e, t, s = 32) {
  if (Sr(i), qi(s), s > 255 * i.outputLen) throw new Error("Length should be <= 255*HashLen");
  const r = Math.ceil(s / i.outputLen);
  t === void 0 && (t = ln);
  const n = new Uint8Array(r * i.outputLen), o = gs.create(i, e), a = o._cloneInto(), c = new Uint8Array(o.outputLen);
  for (let h = 0; h < r; h++) _s[0] = h + 1, a.update(h === 0 ? ln : c).update(t).update(_s).digestInto(c), n.set(c, i.outputLen * h), o._cloneInto(a);
  return o.destroy(), a.destroy(), c.fill(0), _s.fill(0), n.slice(0, s);
}
const Wh = (i, e, t, s, r) => Gh(i, Hh(i, e, t), s, r);
function Jh(i, e, t, s) {
  if (typeof i.setBigUint64 == "function") return i.setBigUint64(e, t, s);
  const r = BigInt(32), n = BigInt(4294967295), o = Number(t >> r & n), a = Number(t & n), c = s ? 4 : 0, h = s ? 0 : 4;
  i.setUint32(e + c, o, s), i.setUint32(e + h, a, s);
}
function Qh(i, e, t) {
  return i & e ^ ~i & t;
}
function Yh(i, e, t) {
  return i & e ^ i & t ^ e & t;
}
let Zh = class extends Or {
  constructor(e, t, s, r) {
    super(), this.blockLen = e, this.outputLen = t, this.padOffset = s, this.isLE = r, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(e), this.view = Is(this.buffer);
  }
  update(e) {
    ci(this);
    const { view: t, buffer: s, blockLen: r } = this;
    e = hi(e);
    const n = e.length;
    for (let o = 0; o < n; ) {
      const a = Math.min(r - this.pos, n - o);
      if (a === r) {
        const c = Is(e);
        for (; r <= n - o; o += r) this.process(c, o);
        continue;
      }
      s.set(e.subarray(o, o + a), this.pos), this.pos += a, o += a, this.pos === r && (this.process(t, 0), this.pos = 0);
    }
    return this.length += e.length, this.roundClean(), this;
  }
  digestInto(e) {
    ci(this), qo(e, this), this.finished = !0;
    const { buffer: t, view: s, blockLen: r, isLE: n } = this;
    let { pos: o } = this;
    t[o++] = 128, this.buffer.subarray(o).fill(0), this.padOffset > r - o && (this.process(s, 0), o = 0);
    for (let u = o; u < r; u++) t[u] = 0;
    Jh(s, r - 8, BigInt(this.length * 8), n), this.process(s, 0);
    const a = Is(e), c = this.outputLen;
    if (c % 4) throw new Error("_sha2: outputLen should be aligned to 32bit");
    const h = c / 4, l = this.get();
    if (h > l.length) throw new Error("_sha2: outputLen bigger than state");
    for (let u = 0; u < h; u++) a.setUint32(4 * u, l[u], n);
  }
  digest() {
    const { buffer: e, outputLen: t } = this;
    this.digestInto(e);
    const s = e.slice(0, t);
    return this.destroy(), s;
  }
  _cloneInto(e) {
    e || (e = new this.constructor()), e.set(...this.get());
    const { blockLen: t, buffer: s, length: r, finished: n, destroyed: o, pos: a } = this;
    return e.length = r, e.pos = a, e.finished = n, e.destroyed = o, r % t && e.buffer.set(s), e;
  }
};
const Xh = new Uint32Array([1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298]), ft = new Uint32Array([1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225]), yt = new Uint32Array(64);
class el extends Zh {
  constructor() {
    super(64, 32, 8, !1), this.A = ft[0] | 0, this.B = ft[1] | 0, this.C = ft[2] | 0, this.D = ft[3] | 0, this.E = ft[4] | 0, this.F = ft[5] | 0, this.G = ft[6] | 0, this.H = ft[7] | 0;
  }
  get() {
    const { A: e, B: t, C: s, D: r, E: n, F: o, G: a, H: c } = this;
    return [e, t, s, r, n, o, a, c];
  }
  set(e, t, s, r, n, o, a, c) {
    this.A = e | 0, this.B = t | 0, this.C = s | 0, this.D = r | 0, this.E = n | 0, this.F = o | 0, this.G = a | 0, this.H = c | 0;
  }
  process(e, t) {
    for (let u = 0; u < 16; u++, t += 4) yt[u] = e.getUint32(t, !1);
    for (let u = 16; u < 64; u++) {
      const p = yt[u - 15], d = yt[u - 2], f = Qe(p, 7) ^ Qe(p, 18) ^ p >>> 3, m = Qe(d, 17) ^ Qe(d, 19) ^ d >>> 10;
      yt[u] = m + yt[u - 7] + f + yt[u - 16] | 0;
    }
    let { A: s, B: r, C: n, D: o, E: a, F: c, G: h, H: l } = this;
    for (let u = 0; u < 64; u++) {
      const p = Qe(a, 6) ^ Qe(a, 11) ^ Qe(a, 25), d = l + p + Qh(a, c, h) + Xh[u] + yt[u] | 0, f = (Qe(s, 2) ^ Qe(s, 13) ^ Qe(s, 22)) + Yh(s, r, n) | 0;
      l = h, h = c, c = a, a = o + d | 0, o = n, n = r, r = s, s = d + f | 0;
    }
    s = s + this.A | 0, r = r + this.B | 0, n = n + this.C | 0, o = o + this.D | 0, a = a + this.E | 0, c = c + this.F | 0, h = h + this.G | 0, l = l + this.H | 0, this.set(s, r, n, o, a, c, h, l);
  }
  roundClean() {
    yt.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
}
const Li = Do(() => new el());
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const fs = BigInt(0), ys = BigInt(1), tl = BigInt(2);
function jt(i) {
  return i instanceof Uint8Array || ArrayBuffer.isView(i) && i.constructor.name === "Uint8Array";
}
function Bi(i) {
  if (!jt(i)) throw new Error("Uint8Array expected");
}
function ui(i, e) {
  if (typeof e != "boolean") throw new Error(i + " boolean expected, got " + e);
}
const il = Array.from({ length: 256 }, (i, e) => e.toString(16).padStart(2, "0"));
function pi(i) {
  Bi(i);
  let e = "";
  for (let t = 0; t < i.length; t++) e += il[i[t]];
  return e;
}
function si(i) {
  const e = i.toString(16);
  return e.length & 1 ? "0" + e : e;
}
function Cr(i) {
  if (typeof i != "string") throw new Error("hex string expected, got " + typeof i);
  return i === "" ? fs : BigInt("0x" + i);
}
const at = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
function un(i) {
  if (i >= at._0 && i <= at._9) return i - at._0;
  if (i >= at.A && i <= at.F) return i - (at.A - 10);
  if (i >= at.a && i <= at.f) return i - (at.a - 10);
}
function di(i) {
  if (typeof i != "string") throw new Error("hex string expected, got " + typeof i);
  const e = i.length, t = e / 2;
  if (e % 2) throw new Error("hex string expected, got unpadded hex of length " + e);
  const s = new Uint8Array(t);
  for (let r = 0, n = 0; r < t; r++, n += 2) {
    const o = un(i.charCodeAt(n)), a = un(i.charCodeAt(n + 1));
    if (o === void 0 || a === void 0) {
      const c = i[n] + i[n + 1];
      throw new Error('hex string expected, got non-hex character "' + c + '" at index ' + n);
    }
    s[r] = o * 16 + a;
  }
  return s;
}
function qt(i) {
  return Cr(pi(i));
}
function ji(i) {
  return Bi(i), Cr(pi(Uint8Array.from(i).reverse()));
}
function gi(i, e) {
  return di(i.toString(16).padStart(e * 2, "0"));
}
function ms(i, e) {
  return gi(i, e).reverse();
}
function sl(i) {
  return di(si(i));
}
function Ne(i, e, t) {
  let s;
  if (typeof e == "string") try {
    s = di(e);
  } catch (n) {
    throw new Error(i + " must be hex string or Uint8Array, cause: " + n);
  }
  else if (jt(e)) s = Uint8Array.from(e);
  else throw new Error(i + " must be hex string or Uint8Array");
  const r = s.length;
  if (typeof t == "number" && r !== t) throw new Error(i + " of length " + t + " expected, got " + r);
  return s;
}
function ki(...i) {
  let e = 0;
  for (let s = 0; s < i.length; s++) {
    const r = i[s];
    Bi(r), e += r.length;
  }
  const t = new Uint8Array(e);
  for (let s = 0, r = 0; s < i.length; s++) {
    const n = i[s];
    t.set(n, r), r += n.length;
  }
  return t;
}
function rl(i, e) {
  if (i.length !== e.length) return !1;
  let t = 0;
  for (let s = 0; s < i.length; s++) t |= i[s] ^ e[s];
  return t === 0;
}
function nl(i) {
  if (typeof i != "string") throw new Error("string expected");
  return new Uint8Array(new TextEncoder().encode(i));
}
const $s = (i) => typeof i == "bigint" && fs <= i;
function ws(i, e, t) {
  return $s(i) && $s(e) && $s(t) && e <= i && i < t;
}
function pt(i, e, t, s) {
  if (!ws(e, t, s)) throw new Error("expected valid " + i + ": " + t + " <= n < " + s + ", got " + e);
}
function Wo(i) {
  let e;
  for (e = 0; i > fs; i >>= ys, e += 1) ;
  return e;
}
function ol(i, e) {
  return i >> BigInt(e) & ys;
}
function al(i, e, t) {
  return i | (t ? ys : fs) << BigInt(e);
}
const xr = (i) => (tl << BigInt(i - 1)) - ys, Ss = (i) => new Uint8Array(i), pn = (i) => Uint8Array.from(i);
function Jo(i, e, t) {
  if (typeof i != "number" || i < 2) throw new Error("hashLen must be a number");
  if (typeof e != "number" || e < 2) throw new Error("qByteLen must be a number");
  if (typeof t != "function") throw new Error("hmacFn must be a function");
  let s = Ss(i), r = Ss(i), n = 0;
  const o = () => {
    s.fill(1), r.fill(0), n = 0;
  }, a = (...l) => t(r, s, ...l), c = (l = Ss()) => {
    r = a(pn([0]), l), s = a(), l.length !== 0 && (r = a(pn([1]), l), s = a());
  }, h = () => {
    if (n++ >= 1e3) throw new Error("drbg: tried 1000 values");
    let l = 0;
    const u = [];
    for (; l < e; ) {
      s = a();
      const p = s.slice();
      u.push(p), l += s.length;
    }
    return ki(...u);
  };
  return (l, u) => {
    o(), c(l);
    let p;
    for (; !(p = u(h())); ) c();
    return o(), p;
  };
}
const cl = { bigint: (i) => typeof i == "bigint", function: (i) => typeof i == "function", boolean: (i) => typeof i == "boolean", string: (i) => typeof i == "string", stringOrUint8Array: (i) => typeof i == "string" || jt(i), isSafeInteger: (i) => Number.isSafeInteger(i), array: (i) => Array.isArray(i), field: (i, e) => e.Fp.isValid(i), hash: (i) => typeof i == "function" && Number.isSafeInteger(i.outputLen) };
function bi(i, e, t = {}) {
  const s = (r, n, o) => {
    const a = cl[n];
    if (typeof a != "function") throw new Error("invalid validator function");
    const c = i[r];
    if (!(o && c === void 0) && !a(c, i)) throw new Error("param " + String(r) + " is invalid. Expected " + n + ", got " + c);
  };
  for (const [r, n] of Object.entries(e)) s(r, n, !1);
  for (const [r, n] of Object.entries(t)) s(r, n, !0);
  return i;
}
const hl = () => {
  throw new Error("not implemented");
};
function Ys(i) {
  const e = /* @__PURE__ */ new WeakMap();
  return (t, ...s) => {
    const r = e.get(t);
    if (r !== void 0) return r;
    const n = i(t, ...s);
    return e.set(t, n), n;
  };
}
var ll = Object.freeze({ __proto__: null, isBytes: jt, abytes: Bi, abool: ui, bytesToHex: pi, numberToHexUnpadded: si, hexToNumber: Cr, hexToBytes: di, bytesToNumberBE: qt, bytesToNumberLE: ji, numberToBytesBE: gi, numberToBytesLE: ms, numberToVarBytesBE: sl, ensureBytes: Ne, concatBytes: ki, equalBytes: rl, utf8ToBytes: nl, inRange: ws, aInRange: pt, bitLen: Wo, bitGet: ol, bitSet: al, bitMask: xr, createHmacDrbg: Jo, validateObject: bi, notImplemented: hl, memoized: Ys });
const de = BigInt(0), te = BigInt(1), Ct = BigInt(2), ul = BigInt(3), Zs = BigInt(4), dn = BigInt(5), gn = BigInt(8);
function Se(i, e) {
  const t = i % e;
  return t >= de ? t : e + t;
}
function Qo(i, e, t) {
  if (e < de) throw new Error("invalid exponent, negatives unsupported");
  if (t <= de) throw new Error("invalid modulus");
  if (t === te) return de;
  let s = te;
  for (; e > de; ) e & te && (s = s * i % t), i = i * i % t, e >>= te;
  return s;
}
function Ke(i, e, t) {
  let s = i;
  for (; e-- > de; ) s *= s, s %= t;
  return s;
}
function Xs(i, e) {
  if (i === de) throw new Error("invert: expected non-zero number");
  if (e <= de) throw new Error("invert: expected positive modulus, got " + e);
  let t = Se(i, e), s = e, r = de, n = te;
  for (; t !== de; ) {
    const o = s / t, a = s % t, c = r - n * o;
    s = t, t = a, r = n, n = c;
  }
  if (s !== te) throw new Error("invert: does not exist");
  return Se(r, e);
}
function pl(i) {
  const e = (i - te) / Ct;
  let t, s, r;
  for (t = i - te, s = 0; t % Ct === de; t /= Ct, s++) ;
  for (r = Ct; r < i && Qo(r, e, i) !== i - te; r++) if (r > 1e3) throw new Error("Cannot find square root: likely non-prime P");
  if (s === 1) {
    const o = (i + te) / Zs;
    return function(a, c) {
      const h = a.pow(c, o);
      if (!a.eql(a.sqr(h), c)) throw new Error("Cannot find square root");
      return h;
    };
  }
  const n = (t + te) / Ct;
  return function(o, a) {
    if (o.pow(a, e) === o.neg(o.ONE)) throw new Error("Cannot find square root");
    let c = s, h = o.pow(o.mul(o.ONE, r), t), l = o.pow(a, n), u = o.pow(a, t);
    for (; !o.eql(u, o.ONE); ) {
      if (o.eql(u, o.ZERO)) return o.ZERO;
      let p = 1;
      for (let f = o.sqr(u); p < c && !o.eql(f, o.ONE); p++) f = o.sqr(f);
      const d = o.pow(h, te << BigInt(c - p - 1));
      h = o.sqr(d), l = o.mul(l, d), u = o.mul(u, h), c = p;
    }
    return l;
  };
}
function dl(i) {
  if (i % Zs === ul) {
    const e = (i + te) / Zs;
    return function(t, s) {
      const r = t.pow(s, e);
      if (!t.eql(t.sqr(r), s)) throw new Error("Cannot find square root");
      return r;
    };
  }
  if (i % gn === dn) {
    const e = (i - dn) / gn;
    return function(t, s) {
      const r = t.mul(s, Ct), n = t.pow(r, e), o = t.mul(s, n), a = t.mul(t.mul(o, Ct), n), c = t.mul(o, t.sub(a, t.ONE));
      if (!t.eql(t.sqr(c), s)) throw new Error("Cannot find square root");
      return c;
    };
  }
  return pl(i);
}
const gl = ["create", "isValid", "is0", "neg", "inv", "sqrt", "sqr", "eql", "add", "sub", "mul", "pow", "div", "addN", "subN", "mulN", "sqrN"];
function fl(i) {
  const e = { ORDER: "bigint", MASK: "bigint", BYTES: "isSafeInteger", BITS: "isSafeInteger" }, t = gl.reduce((s, r) => (s[r] = "function", s), e);
  return bi(i, t);
}
function yl(i, e, t) {
  if (t < de) throw new Error("invalid exponent, negatives unsupported");
  if (t === de) return i.ONE;
  if (t === te) return e;
  let s = i.ONE, r = e;
  for (; t > de; ) t & te && (s = i.mul(s, r)), r = i.sqr(r), t >>= te;
  return s;
}
function ml(i, e) {
  const t = new Array(e.length), s = e.reduce((n, o, a) => i.is0(o) ? n : (t[a] = n, i.mul(n, o)), i.ONE), r = i.inv(s);
  return e.reduceRight((n, o, a) => i.is0(o) ? n : (t[a] = i.mul(n, t[a]), i.mul(n, o)), r), t;
}
function Yo(i, e) {
  const t = e !== void 0 ? e : i.toString(2).length, s = Math.ceil(t / 8);
  return { nBitLength: t, nByteLength: s };
}
function Zo(i, e, t = !1, s = {}) {
  if (i <= de) throw new Error("invalid field: expected ORDER > 0, got " + i);
  const { nBitLength: r, nByteLength: n } = Yo(i, e);
  if (n > 2048) throw new Error("invalid field: expected ORDER of <= 2048 bytes");
  let o;
  const a = Object.freeze({ ORDER: i, isLE: t, BITS: r, BYTES: n, MASK: xr(r), ZERO: de, ONE: te, create: (c) => Se(c, i), isValid: (c) => {
    if (typeof c != "bigint") throw new Error("invalid field element: expected bigint, got " + typeof c);
    return de <= c && c < i;
  }, is0: (c) => c === de, isOdd: (c) => (c & te) === te, neg: (c) => Se(-c, i), eql: (c, h) => c === h, sqr: (c) => Se(c * c, i), add: (c, h) => Se(c + h, i), sub: (c, h) => Se(c - h, i), mul: (c, h) => Se(c * h, i), pow: (c, h) => yl(a, c, h), div: (c, h) => Se(c * Xs(h, i), i), sqrN: (c) => c * c, addN: (c, h) => c + h, subN: (c, h) => c - h, mulN: (c, h) => c * h, inv: (c) => Xs(c, i), sqrt: s.sqrt || ((c) => (o || (o = dl(i)), o(a, c))), invertBatch: (c) => ml(a, c), cmov: (c, h, l) => l ? h : c, toBytes: (c) => t ? ms(c, n) : gi(c, n), fromBytes: (c) => {
    if (c.length !== n) throw new Error("Field.fromBytes: expected " + n + " bytes, got " + c.length);
    return t ? ji(c) : qt(c);
  } });
  return Object.freeze(a);
}
function Xo(i) {
  if (typeof i != "bigint") throw new Error("field order must be bigint");
  const e = i.toString(2).length;
  return Math.ceil(e / 8);
}
function ea(i) {
  const e = Xo(i);
  return e + Math.ceil(e / 2);
}
function wl(i, e, t = !1) {
  const s = i.length, r = Xo(e), n = ea(e);
  if (s < 16 || s < n || s > 1024) throw new Error("expected " + n + "-1024 bytes of input, got " + s);
  const o = t ? ji(i) : qt(i), a = Se(o, e - te) + te;
  return t ? ms(a, r) : gi(a, r);
}
const fn = BigInt(0), Ji = BigInt(1);
function Os(i, e) {
  const t = e.negate();
  return i ? t : e;
}
function ta(i, e) {
  if (!Number.isSafeInteger(i) || i <= 0 || i > e) throw new Error("invalid window size, expected [1.." + e + "], got W=" + i);
}
function As(i, e) {
  ta(i, e);
  const t = Math.ceil(e / i) + 1, s = 2 ** (i - 1);
  return { windows: t, windowSize: s };
}
function bl(i, e) {
  if (!Array.isArray(i)) throw new Error("array expected");
  i.forEach((t, s) => {
    if (!(t instanceof e)) throw new Error("invalid point at index " + s);
  });
}
function vl(i, e) {
  if (!Array.isArray(i)) throw new Error("array of scalars expected");
  i.forEach((t, s) => {
    if (!e.isValid(t)) throw new Error("invalid scalar at index " + s);
  });
}
const Cs = /* @__PURE__ */ new WeakMap(), ia = /* @__PURE__ */ new WeakMap();
function xs(i) {
  return ia.get(i) || 1;
}
function El(i, e) {
  return { constTimeNegate: Os, hasPrecomputes(t) {
    return xs(t) !== 1;
  }, unsafeLadder(t, s, r = i.ZERO) {
    let n = t;
    for (; s > fn; ) s & Ji && (r = r.add(n)), n = n.double(), s >>= Ji;
    return r;
  }, precomputeWindow(t, s) {
    const { windows: r, windowSize: n } = As(s, e), o = [];
    let a = t, c = a;
    for (let h = 0; h < r; h++) {
      c = a, o.push(c);
      for (let l = 1; l < n; l++) c = c.add(a), o.push(c);
      a = c.double();
    }
    return o;
  }, wNAF(t, s, r) {
    const { windows: n, windowSize: o } = As(t, e);
    let a = i.ZERO, c = i.BASE;
    const h = BigInt(2 ** t - 1), l = 2 ** t, u = BigInt(t);
    for (let p = 0; p < n; p++) {
      const d = p * o;
      let f = Number(r & h);
      r >>= u, f > o && (f -= l, r += Ji);
      const m = d, g = d + Math.abs(f) - 1, w = p % 2 !== 0, y = f < 0;
      f === 0 ? c = c.add(Os(w, s[m])) : a = a.add(Os(y, s[g]));
    }
    return { p: a, f: c };
  }, wNAFUnsafe(t, s, r, n = i.ZERO) {
    const { windows: o, windowSize: a } = As(t, e), c = BigInt(2 ** t - 1), h = 2 ** t, l = BigInt(t);
    for (let u = 0; u < o; u++) {
      const p = u * a;
      if (r === fn) break;
      let d = Number(r & c);
      if (r >>= l, d > a && (d -= h, r += Ji), d === 0) continue;
      let f = s[p + Math.abs(d) - 1];
      d < 0 && (f = f.negate()), n = n.add(f);
    }
    return n;
  }, getPrecomputes(t, s, r) {
    let n = Cs.get(s);
    return n || (n = this.precomputeWindow(s, t), t !== 1 && Cs.set(s, r(n))), n;
  }, wNAFCached(t, s, r) {
    const n = xs(t);
    return this.wNAF(n, this.getPrecomputes(n, t, r), s);
  }, wNAFCachedUnsafe(t, s, r, n) {
    const o = xs(t);
    return o === 1 ? this.unsafeLadder(t, s, n) : this.wNAFUnsafe(o, this.getPrecomputes(o, t, r), s, n);
  }, setWindowSize(t, s) {
    ta(s, e), ia.set(t, s), Cs.delete(t);
  } };
}
function Il(i, e, t, s) {
  if (bl(t, i), vl(s, e), t.length !== s.length) throw new Error("arrays of points and scalars must have equal length");
  const r = i.ZERO, n = Wo(BigInt(t.length)), o = n > 12 ? n - 3 : n > 4 ? n - 2 : n ? 2 : 1, a = (1 << o) - 1, c = new Array(a + 1).fill(r), h = Math.floor((e.BITS - 1) / o) * o;
  let l = r;
  for (let u = h; u >= 0; u -= o) {
    c.fill(r);
    for (let d = 0; d < s.length; d++) {
      const f = s[d], m = Number(f >> BigInt(u) & BigInt(a));
      c[m] = c[m].add(t[d]);
    }
    let p = r;
    for (let d = c.length - 1, f = r; d > 0; d--) f = f.add(c[d]), p = p.add(f);
    if (l = l.add(p), u !== 0) for (let d = 0; d < o; d++) l = l.double();
  }
  return l;
}
function sa(i) {
  return fl(i.Fp), bi(i, { n: "bigint", h: "bigint", Gx: "field", Gy: "field" }, { nBitLength: "isSafeInteger", nByteLength: "isSafeInteger" }), Object.freeze({ ...Yo(i.n, i.nBitLength), ...i, p: i.Fp.ORDER });
}
BigInt(0), BigInt(1), BigInt(2), BigInt(8);
const Lt = BigInt(0), Ns = BigInt(1);
function Pl(i) {
  return bi(i, { a: "bigint" }, { montgomeryBits: "isSafeInteger", nByteLength: "isSafeInteger", adjustScalarBytes: "function", domain: "function", powPminus2: "function", Gu: "bigint" }), Object.freeze({ ...i });
}
function _l(i) {
  const e = Pl(i), { P: t } = e, s = (y) => Se(y, t), r = e.montgomeryBits, n = Math.ceil(r / 8), o = e.nByteLength, a = e.adjustScalarBytes || ((y) => y), c = e.powPminus2 || ((y) => Qo(y, t - BigInt(2), t));
  function h(y, I, A) {
    const N = s(y * (I - A));
    return I = s(I - N), A = s(A + N), [I, A];
  }
  const l = (e.a - BigInt(2)) / BigInt(4);
  function u(y, I) {
    pt("u", y, Lt, t), pt("scalar", I, Lt, t);
    const A = I, N = y;
    let P = Ns, $ = Lt, R = y, b = Ns, k = Lt, q;
    for (let U = BigInt(r - 1); U >= Lt; U--) {
      const E = A >> U & Ns;
      k ^= E, q = h(k, P, R), P = q[0], R = q[1], q = h(k, $, b), $ = q[0], b = q[1], k = E;
      const O = P + $, S = s(O * O), T = P - $, D = s(T * T), _ = S - D, F = R + b, M = R - b, L = s(M * O), Z = s(F * T), G = L + Z, ie = L - Z;
      R = s(G * G), b = s(N * s(ie * ie)), P = s(S * D), $ = s(_ * (S + s(l * _)));
    }
    q = h(k, P, R), P = q[0], R = q[1], q = h(k, $, b), $ = q[0], b = q[1];
    const j = c($);
    return s(P * j);
  }
  function p(y) {
    return ms(s(y), n);
  }
  function d(y) {
    const I = Ne("u coordinate", y, n);
    return o === 32 && (I[31] &= 127), ji(I);
  }
  function f(y) {
    const I = Ne("scalar", y), A = I.length;
    if (A !== n && A !== o) {
      let N = "" + n + " or " + o;
      throw new Error("invalid scalar, expected " + N + " bytes, got " + A);
    }
    return ji(a(I));
  }
  function m(y, I) {
    const A = d(I), N = f(y), P = u(A, N);
    if (P === Lt) throw new Error("invalid private or public key received");
    return p(P);
  }
  const g = p(e.Gu);
  function w(y) {
    return m(y, g);
  }
  return { scalarMult: m, scalarMultBase: w, getSharedSecret: (y, I) => m(y, I), getPublicKey: (y) => w(y), utils: { randomPrivateKey: () => e.randomBytes(e.nByteLength) }, GuBytes: g };
}
const er = BigInt("57896044618658097711785492504343953926634992332820282019728792003956564819949");
BigInt(0);
const $l = BigInt(1), yn = BigInt(2), Sl = BigInt(3), Ol = BigInt(5);
BigInt(8);
function Al(i) {
  const e = BigInt(10), t = BigInt(20), s = BigInt(40), r = BigInt(80), n = er, o = i * i % n * i % n, a = Ke(o, yn, n) * o % n, c = Ke(a, $l, n) * i % n, h = Ke(c, Ol, n) * c % n, l = Ke(h, e, n) * h % n, u = Ke(l, t, n) * l % n, p = Ke(u, s, n) * u % n, d = Ke(p, r, n) * p % n, f = Ke(d, r, n) * p % n, m = Ke(f, e, n) * h % n;
  return { pow_p_5_8: Ke(m, yn, n) * i % n, b2: o };
}
function Cl(i) {
  return i[0] &= 248, i[31] &= 127, i[31] |= 64, i;
}
const tr = _l({ P: er, a: BigInt(486662), montgomeryBits: 255, nByteLength: 32, Gu: BigInt(9), powPminus2: (i) => {
  const e = er, { pow_p_5_8: t, b2: s } = Al(i);
  return Se(Ke(t, Sl, e) * s, e);
}, adjustScalarBytes: Cl, randomBytes: wi });
function mn(i) {
  i.lowS !== void 0 && ui("lowS", i.lowS), i.prehash !== void 0 && ui("prehash", i.prehash);
}
function xl(i) {
  const e = sa(i);
  bi(e, { a: "field", b: "field" }, { allowedPrivateKeyLengths: "array", wrapPrivateKey: "boolean", isTorsionFree: "function", clearCofactor: "function", allowInfinityPoint: "boolean", fromBytes: "function", toBytes: "function" });
  const { endo: t, Fp: s, a: r } = e;
  if (t) {
    if (!s.eql(r, s.ZERO)) throw new Error("invalid endomorphism, can only be defined for Koblitz curves that have a=0");
    if (typeof t != "object" || typeof t.beta != "bigint" || typeof t.splitScalar != "function") throw new Error("invalid endomorphism, expected beta: bigint and splitScalar: function");
  }
  return Object.freeze({ ...e });
}
const { bytesToNumberBE: Nl, hexToBytes: Rl } = ll;
class Tl extends Error {
  constructor(e = "") {
    super(e);
  }
}
const lt = { Err: Tl, _tlv: { encode: (i, e) => {
  const { Err: t } = lt;
  if (i < 0 || i > 256) throw new t("tlv.encode: wrong tag");
  if (e.length & 1) throw new t("tlv.encode: unpadded data");
  const s = e.length / 2, r = si(s);
  if (r.length / 2 & 128) throw new t("tlv.encode: long form length too big");
  const n = s > 127 ? si(r.length / 2 | 128) : "";
  return si(i) + n + r + e;
}, decode(i, e) {
  const { Err: t } = lt;
  let s = 0;
  if (i < 0 || i > 256) throw new t("tlv.encode: wrong tag");
  if (e.length < 2 || e[s++] !== i) throw new t("tlv.decode: wrong tlv");
  const r = e[s++], n = !!(r & 128);
  let o = 0;
  if (!n) o = r;
  else {
    const c = r & 127;
    if (!c) throw new t("tlv.decode(long): indefinite length not supported");
    if (c > 4) throw new t("tlv.decode(long): byte length is too big");
    const h = e.subarray(s, s + c);
    if (h.length !== c) throw new t("tlv.decode: length bytes not complete");
    if (h[0] === 0) throw new t("tlv.decode(long): zero leftmost byte");
    for (const l of h) o = o << 8 | l;
    if (s += c, o < 128) throw new t("tlv.decode(long): not minimal encoding");
  }
  const a = e.subarray(s, s + o);
  if (a.length !== o) throw new t("tlv.decode: wrong value length");
  return { v: a, l: e.subarray(s + o) };
} }, _int: { encode(i) {
  const { Err: e } = lt;
  if (i < ut) throw new e("integer: negative integers are not allowed");
  let t = si(i);
  if (Number.parseInt(t[0], 16) & 8 && (t = "00" + t), t.length & 1) throw new e("unexpected DER parsing assertion: unpadded hex");
  return t;
}, decode(i) {
  const { Err: e } = lt;
  if (i[0] & 128) throw new e("invalid signature integer: negative");
  if (i[0] === 0 && !(i[1] & 128)) throw new e("invalid signature integer: unnecessary leading zero");
  return Nl(i);
} }, toSig(i) {
  const { Err: e, _int: t, _tlv: s } = lt, r = typeof i == "string" ? Rl(i) : i;
  Bi(r);
  const { v: n, l: o } = s.decode(48, r);
  if (o.length) throw new e("invalid signature: left bytes after parsing");
  const { v: a, l: c } = s.decode(2, n), { v: h, l } = s.decode(2, c);
  if (l.length) throw new e("invalid signature: left bytes after parsing");
  return { r: t.decode(a), s: t.decode(h) };
}, hexFromSig(i) {
  const { _tlv: e, _int: t } = lt, s = e.encode(2, t.encode(i.r)), r = e.encode(2, t.encode(i.s)), n = s + r;
  return e.encode(48, n);
} }, ut = BigInt(0), ue = BigInt(1);
BigInt(2);
const wn = BigInt(3);
BigInt(4);
function ql(i) {
  const e = xl(i), { Fp: t } = e, s = Zo(e.n, e.nBitLength), r = e.toBytes || ((m, g, w) => {
    const y = g.toAffine();
    return ki(Uint8Array.from([4]), t.toBytes(y.x), t.toBytes(y.y));
  }), n = e.fromBytes || ((m) => {
    const g = m.subarray(1), w = t.fromBytes(g.subarray(0, t.BYTES)), y = t.fromBytes(g.subarray(t.BYTES, 2 * t.BYTES));
    return { x: w, y };
  });
  function o(m) {
    const { a: g, b: w } = e, y = t.sqr(m), I = t.mul(y, m);
    return t.add(t.add(I, t.mul(m, g)), w);
  }
  if (!t.eql(t.sqr(e.Gy), o(e.Gx))) throw new Error("bad generator point: equation left != right");
  function a(m) {
    return ws(m, ue, e.n);
  }
  function c(m) {
    const { allowedPrivateKeyLengths: g, nByteLength: w, wrapPrivateKey: y, n: I } = e;
    if (g && typeof m != "bigint") {
      if (jt(m) && (m = pi(m)), typeof m != "string" || !g.includes(m.length)) throw new Error("invalid private key");
      m = m.padStart(w * 2, "0");
    }
    let A;
    try {
      A = typeof m == "bigint" ? m : qt(Ne("private key", m, w));
    } catch {
      throw new Error("invalid private key, expected hex or " + w + " bytes, got " + typeof m);
    }
    return y && (A = Se(A, I)), pt("private key", A, ue, I), A;
  }
  function h(m) {
    if (!(m instanceof p)) throw new Error("ProjectivePoint expected");
  }
  const l = Ys((m, g) => {
    const { px: w, py: y, pz: I } = m;
    if (t.eql(I, t.ONE)) return { x: w, y };
    const A = m.is0();
    g == null && (g = A ? t.ONE : t.inv(I));
    const N = t.mul(w, g), P = t.mul(y, g), $ = t.mul(I, g);
    if (A) return { x: t.ZERO, y: t.ZERO };
    if (!t.eql($, t.ONE)) throw new Error("invZ was invalid");
    return { x: N, y: P };
  }), u = Ys((m) => {
    if (m.is0()) {
      if (e.allowInfinityPoint && !t.is0(m.py)) return;
      throw new Error("bad point: ZERO");
    }
    const { x: g, y: w } = m.toAffine();
    if (!t.isValid(g) || !t.isValid(w)) throw new Error("bad point: x or y not FE");
    const y = t.sqr(w), I = o(g);
    if (!t.eql(y, I)) throw new Error("bad point: equation left != right");
    if (!m.isTorsionFree()) throw new Error("bad point: not in prime-order subgroup");
    return !0;
  });
  class p {
    constructor(g, w, y) {
      if (this.px = g, this.py = w, this.pz = y, g == null || !t.isValid(g)) throw new Error("x required");
      if (w == null || !t.isValid(w)) throw new Error("y required");
      if (y == null || !t.isValid(y)) throw new Error("z required");
      Object.freeze(this);
    }
    static fromAffine(g) {
      const { x: w, y } = g || {};
      if (!g || !t.isValid(w) || !t.isValid(y)) throw new Error("invalid affine point");
      if (g instanceof p) throw new Error("projective point not allowed");
      const I = (A) => t.eql(A, t.ZERO);
      return I(w) && I(y) ? p.ZERO : new p(w, y, t.ONE);
    }
    get x() {
      return this.toAffine().x;
    }
    get y() {
      return this.toAffine().y;
    }
    static normalizeZ(g) {
      const w = t.invertBatch(g.map((y) => y.pz));
      return g.map((y, I) => y.toAffine(w[I])).map(p.fromAffine);
    }
    static fromHex(g) {
      const w = p.fromAffine(n(Ne("pointHex", g)));
      return w.assertValidity(), w;
    }
    static fromPrivateKey(g) {
      return p.BASE.multiply(c(g));
    }
    static msm(g, w) {
      return Il(p, s, g, w);
    }
    _setWindowSize(g) {
      f.setWindowSize(this, g);
    }
    assertValidity() {
      u(this);
    }
    hasEvenY() {
      const { y: g } = this.toAffine();
      if (t.isOdd) return !t.isOdd(g);
      throw new Error("Field doesn't support isOdd");
    }
    equals(g) {
      h(g);
      const { px: w, py: y, pz: I } = this, { px: A, py: N, pz: P } = g, $ = t.eql(t.mul(w, P), t.mul(A, I)), R = t.eql(t.mul(y, P), t.mul(N, I));
      return $ && R;
    }
    negate() {
      return new p(this.px, t.neg(this.py), this.pz);
    }
    double() {
      const { a: g, b: w } = e, y = t.mul(w, wn), { px: I, py: A, pz: N } = this;
      let P = t.ZERO, $ = t.ZERO, R = t.ZERO, b = t.mul(I, I), k = t.mul(A, A), q = t.mul(N, N), j = t.mul(I, A);
      return j = t.add(j, j), R = t.mul(I, N), R = t.add(R, R), P = t.mul(g, R), $ = t.mul(y, q), $ = t.add(P, $), P = t.sub(k, $), $ = t.add(k, $), $ = t.mul(P, $), P = t.mul(j, P), R = t.mul(y, R), q = t.mul(g, q), j = t.sub(b, q), j = t.mul(g, j), j = t.add(j, R), R = t.add(b, b), b = t.add(R, b), b = t.add(b, q), b = t.mul(b, j), $ = t.add($, b), q = t.mul(A, N), q = t.add(q, q), b = t.mul(q, j), P = t.sub(P, b), R = t.mul(q, k), R = t.add(R, R), R = t.add(R, R), new p(P, $, R);
    }
    add(g) {
      h(g);
      const { px: w, py: y, pz: I } = this, { px: A, py: N, pz: P } = g;
      let $ = t.ZERO, R = t.ZERO, b = t.ZERO;
      const k = e.a, q = t.mul(e.b, wn);
      let j = t.mul(w, A), U = t.mul(y, N), E = t.mul(I, P), O = t.add(w, y), S = t.add(A, N);
      O = t.mul(O, S), S = t.add(j, U), O = t.sub(O, S), S = t.add(w, I);
      let T = t.add(A, P);
      return S = t.mul(S, T), T = t.add(j, E), S = t.sub(S, T), T = t.add(y, I), $ = t.add(N, P), T = t.mul(T, $), $ = t.add(U, E), T = t.sub(T, $), b = t.mul(k, S), $ = t.mul(q, E), b = t.add($, b), $ = t.sub(U, b), b = t.add(U, b), R = t.mul($, b), U = t.add(j, j), U = t.add(U, j), E = t.mul(k, E), S = t.mul(q, S), U = t.add(U, E), E = t.sub(j, E), E = t.mul(k, E), S = t.add(S, E), j = t.mul(U, S), R = t.add(R, j), j = t.mul(T, S), $ = t.mul(O, $), $ = t.sub($, j), j = t.mul(O, U), b = t.mul(T, b), b = t.add(b, j), new p($, R, b);
    }
    subtract(g) {
      return this.add(g.negate());
    }
    is0() {
      return this.equals(p.ZERO);
    }
    wNAF(g) {
      return f.wNAFCached(this, g, p.normalizeZ);
    }
    multiplyUnsafe(g) {
      const { endo: w, n: y } = e;
      pt("scalar", g, ut, y);
      const I = p.ZERO;
      if (g === ut) return I;
      if (this.is0() || g === ue) return this;
      if (!w || f.hasPrecomputes(this)) return f.wNAFCachedUnsafe(this, g, p.normalizeZ);
      let { k1neg: A, k1: N, k2neg: P, k2: $ } = w.splitScalar(g), R = I, b = I, k = this;
      for (; N > ut || $ > ut; ) N & ue && (R = R.add(k)), $ & ue && (b = b.add(k)), k = k.double(), N >>= ue, $ >>= ue;
      return A && (R = R.negate()), P && (b = b.negate()), b = new p(t.mul(b.px, w.beta), b.py, b.pz), R.add(b);
    }
    multiply(g) {
      const { endo: w, n: y } = e;
      pt("scalar", g, ue, y);
      let I, A;
      if (w) {
        const { k1neg: N, k1: P, k2neg: $, k2: R } = w.splitScalar(g);
        let { p: b, f: k } = this.wNAF(P), { p: q, f: j } = this.wNAF(R);
        b = f.constTimeNegate(N, b), q = f.constTimeNegate($, q), q = new p(t.mul(q.px, w.beta), q.py, q.pz), I = b.add(q), A = k.add(j);
      } else {
        const { p: N, f: P } = this.wNAF(g);
        I = N, A = P;
      }
      return p.normalizeZ([I, A])[0];
    }
    multiplyAndAddUnsafe(g, w, y) {
      const I = p.BASE, A = (P, $) => $ === ut || $ === ue || !P.equals(I) ? P.multiplyUnsafe($) : P.multiply($), N = A(this, w).add(A(g, y));
      return N.is0() ? void 0 : N;
    }
    toAffine(g) {
      return l(this, g);
    }
    isTorsionFree() {
      const { h: g, isTorsionFree: w } = e;
      if (g === ue) return !0;
      if (w) return w(p, this);
      throw new Error("isTorsionFree() has not been declared for the elliptic curve");
    }
    clearCofactor() {
      const { h: g, clearCofactor: w } = e;
      return g === ue ? this : w ? w(p, this) : this.multiplyUnsafe(e.h);
    }
    toRawBytes(g = !0) {
      return ui("isCompressed", g), this.assertValidity(), r(p, this, g);
    }
    toHex(g = !0) {
      return ui("isCompressed", g), pi(this.toRawBytes(g));
    }
  }
  p.BASE = new p(e.Gx, e.Gy, t.ONE), p.ZERO = new p(t.ZERO, t.ONE, t.ZERO);
  const d = e.nBitLength, f = El(p, e.endo ? Math.ceil(d / 2) : d);
  return { CURVE: e, ProjectivePoint: p, normPrivateKeyToScalar: c, weierstrassEquation: o, isWithinCurveOrder: a };
}
function Dl(i) {
  const e = sa(i);
  return bi(e, { hash: "hash", hmac: "function", randomBytes: "function" }, { bits2int: "function", bits2int_modN: "function", lowS: "boolean" }), Object.freeze({ lowS: !0, ...e });
}
function jl(i) {
  const e = Dl(i), { Fp: t, n: s } = e, r = t.BYTES + 1, n = 2 * t.BYTES + 1;
  function o(E) {
    return Se(E, s);
  }
  function a(E) {
    return Xs(E, s);
  }
  const { ProjectivePoint: c, normPrivateKeyToScalar: h, weierstrassEquation: l, isWithinCurveOrder: u } = ql({ ...e, toBytes(E, O, S) {
    const T = O.toAffine(), D = t.toBytes(T.x), _ = ki;
    return ui("isCompressed", S), S ? _(Uint8Array.from([O.hasEvenY() ? 2 : 3]), D) : _(Uint8Array.from([4]), D, t.toBytes(T.y));
  }, fromBytes(E) {
    const O = E.length, S = E[0], T = E.subarray(1);
    if (O === r && (S === 2 || S === 3)) {
      const D = qt(T);
      if (!ws(D, ue, t.ORDER)) throw new Error("Point is not on curve");
      const _ = l(D);
      let F;
      try {
        F = t.sqrt(_);
      } catch (L) {
        const Z = L instanceof Error ? ": " + L.message : "";
        throw new Error("Point is not on curve" + Z);
      }
      const M = (F & ue) === ue;
      return (S & 1) === 1 !== M && (F = t.neg(F)), { x: D, y: F };
    } else if (O === n && S === 4) {
      const D = t.fromBytes(T.subarray(0, t.BYTES)), _ = t.fromBytes(T.subarray(t.BYTES, 2 * t.BYTES));
      return { x: D, y: _ };
    } else {
      const D = r, _ = n;
      throw new Error("invalid Point, expected length of " + D + ", or uncompressed " + _ + ", got " + O);
    }
  } }), p = (E) => pi(gi(E, e.nByteLength));
  function d(E) {
    const O = s >> ue;
    return E > O;
  }
  function f(E) {
    return d(E) ? o(-E) : E;
  }
  const m = (E, O, S) => qt(E.slice(O, S));
  class g {
    constructor(O, S, T) {
      this.r = O, this.s = S, this.recovery = T, this.assertValidity();
    }
    static fromCompact(O) {
      const S = e.nByteLength;
      return O = Ne("compactSignature", O, S * 2), new g(m(O, 0, S), m(O, S, 2 * S));
    }
    static fromDER(O) {
      const { r: S, s: T } = lt.toSig(Ne("DER", O));
      return new g(S, T);
    }
    assertValidity() {
      pt("r", this.r, ue, s), pt("s", this.s, ue, s);
    }
    addRecoveryBit(O) {
      return new g(this.r, this.s, O);
    }
    recoverPublicKey(O) {
      const { r: S, s: T, recovery: D } = this, _ = P(Ne("msgHash", O));
      if (D == null || ![0, 1, 2, 3].includes(D)) throw new Error("recovery id invalid");
      const F = D === 2 || D === 3 ? S + e.n : S;
      if (F >= t.ORDER) throw new Error("recovery id 2 or 3 invalid");
      const M = D & 1 ? "03" : "02", L = c.fromHex(M + p(F)), Z = a(F), G = o(-_ * Z), ie = o(T * Z), ce = c.BASE.multiplyAndAddUnsafe(L, G, ie);
      if (!ce) throw new Error("point at infinify");
      return ce.assertValidity(), ce;
    }
    hasHighS() {
      return d(this.s);
    }
    normalizeS() {
      return this.hasHighS() ? new g(this.r, o(-this.s), this.recovery) : this;
    }
    toDERRawBytes() {
      return di(this.toDERHex());
    }
    toDERHex() {
      return lt.hexFromSig({ r: this.r, s: this.s });
    }
    toCompactRawBytes() {
      return di(this.toCompactHex());
    }
    toCompactHex() {
      return p(this.r) + p(this.s);
    }
  }
  const w = { isValidPrivateKey(E) {
    try {
      return h(E), !0;
    } catch {
      return !1;
    }
  }, normPrivateKeyToScalar: h, randomPrivateKey: () => {
    const E = ea(e.n);
    return wl(e.randomBytes(E), e.n);
  }, precompute(E = 8, O = c.BASE) {
    return O._setWindowSize(E), O.multiply(BigInt(3)), O;
  } };
  function y(E, O = !0) {
    return c.fromPrivateKey(E).toRawBytes(O);
  }
  function I(E) {
    const O = jt(E), S = typeof E == "string", T = (O || S) && E.length;
    return O ? T === r || T === n : S ? T === 2 * r || T === 2 * n : E instanceof c;
  }
  function A(E, O, S = !0) {
    if (I(E)) throw new Error("first arg must be private key");
    if (!I(O)) throw new Error("second arg must be public key");
    return c.fromHex(O).multiply(h(E)).toRawBytes(S);
  }
  const N = e.bits2int || function(E) {
    if (E.length > 8192) throw new Error("input is too large");
    const O = qt(E), S = E.length * 8 - e.nBitLength;
    return S > 0 ? O >> BigInt(S) : O;
  }, P = e.bits2int_modN || function(E) {
    return o(N(E));
  }, $ = xr(e.nBitLength);
  function R(E) {
    return pt("num < 2^" + e.nBitLength, E, ut, $), gi(E, e.nByteLength);
  }
  function b(E, O, S = k) {
    if (["recovered", "canonical"].some((ne) => ne in S)) throw new Error("sign() legacy options not supported");
    const { hash: T, randomBytes: D } = e;
    let { lowS: _, prehash: F, extraEntropy: M } = S;
    _ == null && (_ = !0), E = Ne("msgHash", E), mn(S), F && (E = Ne("prehashed msgHash", T(E)));
    const L = P(E), Z = h(O), G = [R(Z), R(L)];
    if (M != null && M !== !1) {
      const ne = M === !0 ? D(t.BYTES) : M;
      G.push(Ne("extraEntropy", ne));
    }
    const ie = ki(...G), ce = L;
    function be(ne) {
      const oe = N(ne);
      if (!u(oe)) return;
      const _t = a(oe), rt = c.BASE.multiply(oe).toAffine(), Je = o(rt.x);
      if (Je === ut) return;
      const nt = o(_t * o(ce + Je * Z));
      if (nt === ut) return;
      let ot = (rt.x === Je ? 0 : 2) | Number(rt.y & ue), Hi = nt;
      return _ && d(nt) && (Hi = f(nt), ot ^= 1), new g(Je, Hi, ot);
    }
    return { seed: ie, k2sig: be };
  }
  const k = { lowS: e.lowS, prehash: !1 }, q = { lowS: e.lowS, prehash: !1 };
  function j(E, O, S = k) {
    const { seed: T, k2sig: D } = b(E, O, S), _ = e;
    return Jo(_.hash.outputLen, _.nByteLength, _.hmac)(T, D);
  }
  c.BASE._setWindowSize(8);
  function U(E, O, S, T = q) {
    var nt;
    const D = E;
    O = Ne("msgHash", O), S = Ne("publicKey", S);
    const { lowS: _, prehash: F, format: M } = T;
    if (mn(T), "strict" in T) throw new Error("options.strict was renamed to lowS");
    if (M !== void 0 && M !== "compact" && M !== "der") throw new Error("format must be compact or der");
    const L = typeof D == "string" || jt(D), Z = !L && !M && typeof D == "object" && D !== null && typeof D.r == "bigint" && typeof D.s == "bigint";
    if (!L && !Z) throw new Error("invalid signature, expected Uint8Array, hex string or Signature instance");
    let G, ie;
    try {
      if (Z && (G = new g(D.r, D.s)), L) {
        try {
          M !== "compact" && (G = g.fromDER(D));
        } catch (ot) {
          if (!(ot instanceof lt.Err)) throw ot;
        }
        !G && M !== "der" && (G = g.fromCompact(D));
      }
      ie = c.fromHex(S);
    } catch {
      return !1;
    }
    if (!G || _ && G.hasHighS()) return !1;
    F && (O = e.hash(O));
    const { r: ce, s: be } = G, ne = P(O), oe = a(be), _t = o(ne * oe), rt = o(ce * oe), Je = (nt = c.BASE.multiplyAndAddUnsafe(ie, _t, rt)) == null ? void 0 : nt.toAffine();
    return Je ? o(Je.x) === ce : !1;
  }
  return { CURVE: e, getPublicKey: y, getSharedSecret: A, sign: j, verify: U, ProjectivePoint: c, Signature: g, utils: w };
}
function kl(i) {
  return { hash: i, hmac: (e, ...t) => gs(i, e, Lc(...t)), randomBytes: wi };
}
function Fl(i, e) {
  const t = (s) => jl({ ...i, ...kl(s) });
  return { ...t(e), create: t };
}
const ra = Zo(BigInt("0xffffffff00000001000000000000000000000000ffffffffffffffffffffffff")), Ul = ra.create(BigInt("-3")), Ml = BigInt("0x5ac635d8aa3a93e7b3ebbd55769886bc651d06b0cc53b0f63bce3c3e27d2604b"), Ll = Fl({ a: Ul, b: Ml, Fp: ra, n: BigInt("0xffffffff00000000ffffffffffffffffbce6faada7179e84f3b9cac2fc632551"), Gx: BigInt("0x6b17d1f2e12c4247f8bce6e563a440f277037d812deb33a0f4a13945d898c296"), Gy: BigInt("0x4fe342e2fe1a7f9b8ee7eb4a7c0f9e162bce33576b315ececbb6406837bf51f5"), h: BigInt(1), lowS: !1 }, Li), na = "base10", Ie = "base16", He = "base64pad", wt = "base64url", zi = "utf8", oa = 0, dt = 1, Vi = 2, Bl = 0, bn = 1, Ni = 12, Nr = 32;
function zl() {
  const i = tr.utils.randomPrivateKey(), e = tr.getPublicKey(i);
  return { privateKey: Oe(i, Ie), publicKey: Oe(e, Ie) };
}
function ir() {
  const i = wi(Nr);
  return Oe(i, Ie);
}
function Vl(i, e) {
  const t = tr.getSharedSecret(Ue(i, Ie), Ue(e, Ie)), s = Wh(Li, t, void 0, void 0, Nr);
  return Oe(s, Ie);
}
function rs(i) {
  const e = Li(Ue(i, Ie));
  return Oe(e, Ie);
}
function tt(i) {
  const e = Li(Ue(i, zi));
  return Oe(e, Ie);
}
function aa(i) {
  return Ue(`${i}`, na);
}
function kt(i) {
  return Number(Oe(i, na));
}
function ca(i) {
  return i.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}
function ha(i) {
  const e = i.replace(/-/g, "+").replace(/_/g, "/"), t = (4 - e.length % 4) % 4;
  return e + "=".repeat(t);
}
function Kl(i) {
  const e = aa(typeof i.type < "u" ? i.type : oa);
  if (kt(e) === dt && typeof i.senderPublicKey > "u") throw new Error("Missing sender public key for type 1 envelope");
  const t = typeof i.senderPublicKey < "u" ? Ue(i.senderPublicKey, Ie) : void 0, s = typeof i.iv < "u" ? Ue(i.iv, Ie) : wi(Ni), r = Ue(i.symKey, Ie), n = Ho(r, s).encrypt(Ue(i.message, zi)), o = la({ type: e, sealed: n, iv: s, senderPublicKey: t });
  return i.encoding === wt ? ca(o) : o;
}
function Hl(i) {
  const e = Ue(i.symKey, Ie), { sealed: t, iv: s } = Fi({ encoded: i.encoded, encoding: i.encoding }), r = Ho(e, s).decrypt(t);
  if (r === null) throw new Error("Failed to decrypt");
  return Oe(r, zi);
}
function Gl(i, e) {
  const t = aa(Vi), s = wi(Ni), r = Ue(i, zi), n = la({ type: t, sealed: r, iv: s });
  return e === wt ? ca(n) : n;
}
function Wl(i, e) {
  const { sealed: t } = Fi({ encoded: i, encoding: e });
  return Oe(t, zi);
}
function la(i) {
  if (kt(i.type) === Vi) return Oe(xi([i.type, i.sealed]), He);
  if (kt(i.type) === dt) {
    if (typeof i.senderPublicKey > "u") throw new Error("Missing sender public key for type 1 envelope");
    return Oe(xi([i.type, i.senderPublicKey, i.iv, i.sealed]), He);
  }
  return Oe(xi([i.type, i.iv, i.sealed]), He);
}
function Fi(i) {
  const e = (i.encoding || He) === wt ? ha(i.encoded) : i.encoded, t = Ue(e, He), s = t.slice(Bl, bn), r = bn;
  if (kt(s) === dt) {
    const c = r + Nr, h = c + Ni, l = t.slice(r, c), u = t.slice(c, h), p = t.slice(h);
    return { type: s, sealed: p, iv: u, senderPublicKey: l };
  }
  if (kt(s) === Vi) {
    const c = t.slice(r), h = wi(Ni);
    return { type: s, sealed: c, iv: h };
  }
  const n = r + Ni, o = t.slice(r, n), a = t.slice(n);
  return { type: s, sealed: a, iv: o };
}
function Jl(i, e) {
  const t = Fi({ encoded: i, encoding: e == null ? void 0 : e.encoding });
  return ua({ type: kt(t.type), senderPublicKey: typeof t.senderPublicKey < "u" ? Oe(t.senderPublicKey, Ie) : void 0, receiverPublicKey: e == null ? void 0 : e.receiverPublicKey });
}
function ua(i) {
  const e = (i == null ? void 0 : i.type) || oa;
  if (e === dt) {
    if (typeof (i == null ? void 0 : i.senderPublicKey) > "u") throw new Error("missing sender public key");
    if (typeof (i == null ? void 0 : i.receiverPublicKey) > "u") throw new Error("missing receiver public key");
  }
  return { type: e, senderPublicKey: i == null ? void 0 : i.senderPublicKey, receiverPublicKey: i == null ? void 0 : i.receiverPublicKey };
}
function vn(i) {
  return i.type === dt && typeof i.senderPublicKey == "string" && typeof i.receiverPublicKey == "string";
}
function En(i) {
  return i.type === Vi;
}
function Ql(i) {
  const e = Buffer.from(i.x, "base64"), t = Buffer.from(i.y, "base64");
  return xi([new Uint8Array([4]), e, t]);
}
function Yl(i, e) {
  const [t, s, r] = i.split("."), n = Buffer.from(ha(r), "base64");
  if (n.length !== 64) throw new Error("Invalid signature length");
  const o = n.slice(0, 32), a = n.slice(32, 64), c = `${t}.${s}`, h = Li(c), l = Ql(e);
  if (!Ll.verify(xi([o, a]), h, l)) throw new Error("Invalid signature");
  return Vs(i).payload;
}
const Zl = "irn";
function hs(i) {
  return (i == null ? void 0 : i.relay) || { protocol: Zl };
}
function Ai(i) {
  const e = Ga[i];
  if (typeof e > "u") throw new Error(`Relay Protocol not supported: ${i}`);
  return e;
}
function Xl(i, e = "-") {
  const t = {}, s = "relay" + e;
  return Object.keys(i).forEach((r) => {
    if (r.startsWith(s)) {
      const n = r.replace(s, ""), o = i[r];
      t[n] = o;
    }
  }), t;
}
function In(i) {
  if (!i.includes("wc:")) {
    const h = To(i);
    h != null && h.includes("wc:") && (i = h);
  }
  i = i.includes("wc://") ? i.replace("wc://", "") : i, i = i.includes("wc:") ? i.replace("wc:", "") : i;
  const e = i.indexOf(":"), t = i.indexOf("?") !== -1 ? i.indexOf("?") : void 0, s = i.substring(0, e), r = i.substring(e + 1, t).split("@"), n = typeof t < "u" ? i.substring(t) : "", o = new URLSearchParams(n), a = {};
  o.forEach((h, l) => {
    a[l] = h;
  });
  const c = typeof a.methods == "string" ? a.methods.split(",") : void 0;
  return { protocol: s, topic: eu(r[0]), version: parseInt(r[1], 10), symKey: a.symKey, relay: Xl(a), methods: c, expiryTimestamp: a.expiryTimestamp ? parseInt(a.expiryTimestamp, 10) : void 0 };
}
function eu(i) {
  return i.startsWith("//") ? i.substring(2) : i;
}
function tu(i, e = "-") {
  const t = "relay", s = {};
  return Object.keys(i).forEach((r) => {
    const n = r, o = t + e + n;
    i[n] && (s[o] = i[n]);
  }), s;
}
function Pn(i) {
  const e = new URLSearchParams(), t = tu(i.relay);
  Object.keys(t).sort().forEach((r) => {
    e.set(r, t[r]);
  }), e.set("symKey", i.symKey), i.expiryTimestamp && e.set("expiryTimestamp", i.expiryTimestamp.toString()), i.methods && e.set("methods", i.methods.join(","));
  const s = e.toString();
  return `${i.protocol}:${i.topic}@${i.version}?${s}`;
}
function Qi(i, e, t) {
  return `${i}?wc_ev=${t}&topic=${e}`;
}
var iu = Object.defineProperty, su = Object.defineProperties, ru = Object.getOwnPropertyDescriptors, _n = Object.getOwnPropertySymbols, nu = Object.prototype.hasOwnProperty, ou = Object.prototype.propertyIsEnumerable, $n = (i, e, t) => e in i ? iu(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t, au = (i, e) => {
  for (var t in e || (e = {})) nu.call(e, t) && $n(i, t, e[t]);
  if (_n) for (var t of _n(e)) ou.call(e, t) && $n(i, t, e[t]);
  return i;
}, cu = (i, e) => su(i, ru(e));
function vi(i) {
  const e = [];
  return i.forEach((t) => {
    const [s, r] = t.split(":");
    e.push(`${s}:${r}`);
  }), e;
}
function hu(i) {
  const e = [];
  return Object.values(i).forEach((t) => {
    e.push(...vi(t.accounts));
  }), e;
}
function lu(i, e) {
  const t = [];
  return Object.values(i).forEach((s) => {
    vi(s.accounts).includes(e) && t.push(...s.methods);
  }), t;
}
function uu(i, e) {
  const t = [];
  return Object.values(i).forEach((s) => {
    vi(s.accounts).includes(e) && t.push(...s.events);
  }), t;
}
function bs(i) {
  return i.includes(":");
}
function ri(i) {
  return bs(i) ? i.split(":")[0] : i;
}
function Sn(i) {
  var e, t, s;
  const r = {};
  if (!Et(i)) return r;
  for (const [n, o] of Object.entries(i)) {
    const a = bs(n) ? [n] : o.chains, c = o.methods || [], h = o.events || [], l = ri(n);
    r[l] = cu(au({}, r[l]), { chains: it(a, (e = r[l]) == null ? void 0 : e.chains), methods: it(c, (t = r[l]) == null ? void 0 : t.methods), events: it(h, (s = r[l]) == null ? void 0 : s.events) });
  }
  return r;
}
function pu(i) {
  const e = {};
  return i == null || i.forEach((t) => {
    var s;
    const [r, n] = t.split(":");
    e[r] || (e[r] = { accounts: [], chains: [], events: [], methods: [] }), e[r].accounts.push(t), (s = e[r].chains) == null || s.push(`${r}:${n}`);
  }), e;
}
function On(i, e) {
  e = e.map((s) => s.replace("did:pkh:", ""));
  const t = pu(e);
  for (const [s, r] of Object.entries(t)) r.methods ? r.methods = it(r.methods, i) : r.methods = i, r.events = ["chainChanged", "accountsChanged"];
  return t;
}
function du(i, e) {
  var t, s, r, n, o, a;
  const c = Sn(i), h = Sn(e), l = {}, u = Object.keys(c).concat(Object.keys(h));
  for (const p of u) l[p] = { chains: it((t = c[p]) == null ? void 0 : t.chains, (s = h[p]) == null ? void 0 : s.chains), methods: it((r = c[p]) == null ? void 0 : r.methods, (n = h[p]) == null ? void 0 : n.methods), events: it((o = c[p]) == null ? void 0 : o.events, (a = h[p]) == null ? void 0 : a.events) };
  return l;
}
const gu = { INVALID_METHOD: { message: "Invalid method.", code: 1001 }, INVALID_EVENT: { message: "Invalid event.", code: 1002 }, INVALID_UPDATE_REQUEST: { message: "Invalid update request.", code: 1003 }, INVALID_EXTEND_REQUEST: { message: "Invalid extend request.", code: 1004 }, INVALID_SESSION_SETTLE_REQUEST: { message: "Invalid session settle request.", code: 1005 }, UNAUTHORIZED_METHOD: { message: "Unauthorized method.", code: 3001 }, UNAUTHORIZED_EVENT: { message: "Unauthorized event.", code: 3002 }, UNAUTHORIZED_UPDATE_REQUEST: { message: "Unauthorized update request.", code: 3003 }, UNAUTHORIZED_EXTEND_REQUEST: { message: "Unauthorized extend request.", code: 3004 }, USER_REJECTED: { message: "User rejected.", code: 5e3 }, USER_REJECTED_CHAINS: { message: "User rejected chains.", code: 5001 }, USER_REJECTED_METHODS: { message: "User rejected methods.", code: 5002 }, USER_REJECTED_EVENTS: { message: "User rejected events.", code: 5003 }, UNSUPPORTED_CHAINS: { message: "Unsupported chains.", code: 5100 }, UNSUPPORTED_METHODS: { message: "Unsupported methods.", code: 5101 }, UNSUPPORTED_EVENTS: { message: "Unsupported events.", code: 5102 }, UNSUPPORTED_ACCOUNTS: { message: "Unsupported accounts.", code: 5103 }, UNSUPPORTED_NAMESPACE_KEY: { message: "Unsupported namespace key.", code: 5104 }, USER_DISCONNECTED: { message: "User disconnected.", code: 6e3 }, SESSION_SETTLEMENT_FAILED: { message: "Session settlement failed.", code: 7e3 }, WC_METHOD_UNSUPPORTED: { message: "Unsupported wc_ method.", code: 10001 } }, fu = { NOT_INITIALIZED: { message: "Not initialized.", code: 1 }, NO_MATCHING_KEY: { message: "No matching key.", code: 2 }, RESTORE_WILL_OVERRIDE: { message: "Restore will override.", code: 3 }, RESUBSCRIBED: { message: "Resubscribed.", code: 4 }, MISSING_OR_INVALID: { message: "Missing or invalid.", code: 5 }, EXPIRED: { message: "Expired.", code: 6 }, UNKNOWN_TYPE: { message: "Unknown type.", code: 7 }, MISMATCHED_TOPIC: { message: "Mismatched topic.", code: 8 }, NON_CONFORMING_NAMESPACES: { message: "Non conforming namespaces.", code: 9 } };
function C(i, e) {
  const { message: t, code: s } = fu[i];
  return { message: e ? `${t} ${e}` : t, code: s };
}
function J(i, e) {
  const { message: t, code: s } = gu[i];
  return { message: e ? `${t} ${e}` : t, code: s };
}
function Ge(i, e) {
  return !!Array.isArray(i);
}
function Et(i) {
  return Object.getPrototypeOf(i) === Object.prototype && Object.keys(i).length;
}
function me(i) {
  return typeof i > "u";
}
function re(i, e) {
  return e && me(i) ? !0 : typeof i == "string" && !!i.trim().length;
}
function Rr(i, e) {
  return e && me(i) ? !0 : typeof i == "number" && !isNaN(i);
}
function yu(i, e) {
  const { requiredNamespaces: t } = e, s = Object.keys(i.namespaces), r = Object.keys(t);
  let n = !0;
  return Tt(r, s) ? (s.forEach((o) => {
    const { accounts: a, methods: c, events: h } = i.namespaces[o], l = vi(a), u = t[o];
    (!Tt(Ao(o, u), l) || !Tt(u.methods, c) || !Tt(u.events, h)) && (n = !1);
  }), n) : !1;
}
function ls(i) {
  return re(i, !1) && i.includes(":") ? i.split(":").length === 2 : !1;
}
function mu(i) {
  if (re(i, !1) && i.includes(":")) {
    const e = i.split(":");
    if (e.length === 3) {
      const t = e[0] + ":" + e[1];
      return !!e[2] && ls(t);
    }
  }
  return !1;
}
function wu(i) {
  function e(t) {
    try {
      return typeof new URL(t) < "u";
    } catch {
      return !1;
    }
  }
  try {
    if (re(i, !1)) {
      if (e(i)) return !0;
      const t = To(i);
      return e(t);
    }
  } catch {
  }
  return !1;
}
function bu(i) {
  var e;
  return (e = i == null ? void 0 : i.proposer) == null ? void 0 : e.publicKey;
}
function vu(i) {
  return i == null ? void 0 : i.topic;
}
function Eu(i, e) {
  let t = null;
  return re(i == null ? void 0 : i.publicKey, !1) || (t = C("MISSING_OR_INVALID", `${e} controller public key should be a string`)), t;
}
function An(i) {
  let e = !0;
  return Ge(i) ? i.length && (e = i.every((t) => re(t, !1))) : e = !1, e;
}
function Iu(i, e, t) {
  let s = null;
  return Ge(e) && e.length ? e.forEach((r) => {
    s || ls(r) || (s = J("UNSUPPORTED_CHAINS", `${t}, chain ${r} should be a string and conform to "namespace:chainId" format`));
  }) : ls(i) || (s = J("UNSUPPORTED_CHAINS", `${t}, chains must be defined as "namespace:chainId" e.g. "eip155:1": {...} in the namespace key OR as an array of CAIP-2 chainIds e.g. eip155: { chains: ["eip155:1", "eip155:5"] }`)), s;
}
function Pu(i, e, t) {
  let s = null;
  return Object.entries(i).forEach(([r, n]) => {
    if (s) return;
    const o = Iu(r, Ao(r, n), `${e} ${t}`);
    o && (s = o);
  }), s;
}
function _u(i, e) {
  let t = null;
  return Ge(i) ? i.forEach((s) => {
    t || mu(s) || (t = J("UNSUPPORTED_ACCOUNTS", `${e}, account ${s} should be a string and conform to "namespace:chainId:address" format`));
  }) : t = J("UNSUPPORTED_ACCOUNTS", `${e}, accounts should be an array of strings conforming to "namespace:chainId:address" format`), t;
}
function $u(i, e) {
  let t = null;
  return Object.values(i).forEach((s) => {
    if (t) return;
    const r = _u(s == null ? void 0 : s.accounts, `${e} namespace`);
    r && (t = r);
  }), t;
}
function Su(i, e) {
  let t = null;
  return An(i == null ? void 0 : i.methods) ? An(i == null ? void 0 : i.events) || (t = J("UNSUPPORTED_EVENTS", `${e}, events should be an array of strings or empty array for no events`)) : t = J("UNSUPPORTED_METHODS", `${e}, methods should be an array of strings or empty array for no methods`), t;
}
function pa(i, e) {
  let t = null;
  return Object.values(i).forEach((s) => {
    if (t) return;
    const r = Su(s, `${e}, namespace`);
    r && (t = r);
  }), t;
}
function Ou(i, e, t) {
  let s = null;
  if (i && Et(i)) {
    const r = pa(i, e);
    r && (s = r);
    const n = Pu(i, e, t);
    n && (s = n);
  } else s = C("MISSING_OR_INVALID", `${e}, ${t} should be an object with data`);
  return s;
}
function Rs(i, e) {
  let t = null;
  if (i && Et(i)) {
    const s = pa(i, e);
    s && (t = s);
    const r = $u(i, e);
    r && (t = r);
  } else t = C("MISSING_OR_INVALID", `${e}, namespaces should be an object with data`);
  return t;
}
function da(i) {
  return re(i.protocol, !0);
}
function Au(i, e) {
  let t = !1;
  return i ? i && Ge(i) && i.length && i.forEach((s) => {
    t = da(s);
  }) : t = !0, t;
}
function Cu(i) {
  return typeof i == "number";
}
function $e(i) {
  return typeof i < "u" && typeof i !== null;
}
function xu(i) {
  return !(!i || typeof i != "object" || !i.code || !Rr(i.code, !1) || !i.message || !re(i.message, !1));
}
function Nu(i) {
  return !(me(i) || !re(i.method, !1));
}
function Ru(i) {
  return !(me(i) || me(i.result) && me(i.error) || !Rr(i.id, !1) || !re(i.jsonrpc, !1));
}
function Tu(i) {
  return !(me(i) || !re(i.name, !1));
}
function Cn(i, e) {
  return !(!ls(e) || !hu(i).includes(e));
}
function qu(i, e, t) {
  return re(t, !1) ? lu(i, e).includes(t) : !1;
}
function Du(i, e, t) {
  return re(t, !1) ? uu(i, e).includes(t) : !1;
}
function xn(i, e, t) {
  let s = null;
  const r = ju(i), n = ku(e), o = Object.keys(r), a = Object.keys(n), c = Nn(Object.keys(i)), h = Nn(Object.keys(e)), l = c.filter((u) => !h.includes(u));
  return l.length && (s = C("NON_CONFORMING_NAMESPACES", `${t} namespaces keys don't satisfy requiredNamespaces.
      Required: ${l.toString()}
      Received: ${Object.keys(e).toString()}`)), Tt(o, a) || (s = C("NON_CONFORMING_NAMESPACES", `${t} namespaces chains don't satisfy required namespaces.
      Required: ${o.toString()}
      Approved: ${a.toString()}`)), Object.keys(e).forEach((u) => {
    if (!u.includes(":") || s) return;
    const p = vi(e[u].accounts);
    p.includes(u) || (s = C("NON_CONFORMING_NAMESPACES", `${t} namespaces accounts don't satisfy namespace accounts for ${u}
        Required: ${u}
        Approved: ${p.toString()}`));
  }), o.forEach((u) => {
    s || (Tt(r[u].methods, n[u].methods) ? Tt(r[u].events, n[u].events) || (s = C("NON_CONFORMING_NAMESPACES", `${t} namespaces events don't satisfy namespace events for ${u}`)) : s = C("NON_CONFORMING_NAMESPACES", `${t} namespaces methods don't satisfy namespace methods for ${u}`));
  }), s;
}
function ju(i) {
  const e = {};
  return Object.keys(i).forEach((t) => {
    var s;
    t.includes(":") ? e[t] = i[t] : (s = i[t].chains) == null || s.forEach((r) => {
      e[r] = { methods: i[t].methods, events: i[t].events };
    });
  }), e;
}
function Nn(i) {
  return [...new Set(i.map((e) => e.includes(":") ? e.split(":")[0] : e))];
}
function ku(i) {
  const e = {};
  return Object.keys(i).forEach((t) => {
    if (t.includes(":")) e[t] = i[t];
    else {
      const s = vi(i[t].accounts);
      s == null || s.forEach((r) => {
        e[r] = { accounts: i[t].accounts.filter((n) => n.includes(`${r}:`)), methods: i[t].methods, events: i[t].events };
      });
    }
  }), e;
}
function Fu(i, e) {
  return Rr(i, !1) && i <= e.max && i >= e.min;
}
function Rn() {
  const i = Ui();
  return new Promise((e) => {
    switch (i) {
      case Te.browser:
        e(Uu());
        break;
      case Te.reactNative:
        e(Mu());
        break;
      case Te.node:
        e(Lu());
        break;
      default:
        e(!0);
    }
  });
}
function Uu() {
  return mi() && (navigator == null ? void 0 : navigator.onLine);
}
async function Mu() {
  if (Pt() && typeof global < "u" && global != null && global.NetInfo) {
    const i = await (global == null ? void 0 : global.NetInfo.fetch());
    return i == null ? void 0 : i.isConnected;
  }
  return !0;
}
function Lu() {
  return !0;
}
function Bu(i) {
  switch (Ui()) {
    case Te.browser:
      zu(i);
      break;
    case Te.reactNative:
      Vu(i);
      break;
  }
}
function zu(i) {
  !Pt() && mi() && (window.addEventListener("online", () => i(!0)), window.addEventListener("offline", () => i(!1)));
}
function Vu(i) {
  Pt() && typeof global < "u" && global != null && global.NetInfo && (global == null || global.NetInfo.addEventListener((e) => i(e == null ? void 0 : e.isConnected)));
}
function Ku() {
  var i;
  return mi() && ai() ? ((i = ai()) == null ? void 0 : i.visibilityState) === "visible" : !0;
}
const Ts = {};
class Ii {
  static get(e) {
    return Ts[e];
  }
  static set(e, t) {
    Ts[e] = t;
  }
  static delete(e) {
    delete Ts[e];
  }
}
var Hu = Object.defineProperty, Gu = (i, e, t) => e in i ? Hu(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t, Tn = (i, e, t) => Gu(i, typeof e != "symbol" ? e + "" : e, t);
let Wu = class extends fi {
  constructor(e) {
    super(), this.opts = e, Tn(this, "protocol", "wc"), Tn(this, "version", 2);
  }
};
var Ju = Object.defineProperty, Qu = (i, e, t) => e in i ? Ju(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t, Yu = (i, e, t) => Qu(i, e + "", t);
let Zu = class extends fi {
  constructor(e, t) {
    super(), this.core = e, this.logger = t, Yu(this, "records", /* @__PURE__ */ new Map());
  }
}, Xu = class {
  constructor(e, t) {
    this.logger = e, this.core = t;
  }
};
class ep extends fi {
  constructor(e, t) {
    super(), this.relayer = e, this.logger = t;
  }
}
let tp = class extends fi {
  constructor(e) {
    super();
  }
}, ip = class {
  constructor(e, t, s, r) {
    this.core = e, this.logger = t, this.name = s;
  }
}, sp = class extends fi {
  constructor(e, t) {
    super(), this.relayer = e, this.logger = t;
  }
}, rp = class extends fi {
  constructor(e, t) {
    super(), this.core = e, this.logger = t;
  }
}, np = class {
  constructor(e, t, s) {
    this.core = e, this.logger = t, this.store = s;
  }
}, op = class {
  constructor(e, t) {
    this.projectId = e, this.logger = t;
  }
}, ap = class {
  constructor(e, t, s) {
    this.core = e, this.logger = t, this.telemetryEnabled = s;
  }
};
var cp = Object.defineProperty, hp = (i, e, t) => e in i ? cp(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t, qn = (i, e, t) => hp(i, typeof e != "symbol" ? e + "" : e, t);
let lp = class {
  constructor(e) {
    this.opts = e, qn(this, "protocol", "wc"), qn(this, "version", 2);
  }
}, up = class {
  constructor(e) {
    this.client = e;
  }
};
const ga = "wc", fa = 2, sr = "core", st = `${ga}@2:${sr}:`, pp = { logger: "error" }, dp = { database: ":memory:" }, gp = "crypto", Dn = "client_ed25519_seed", fp = x.ONE_DAY, yp = "keychain", mp = "0.3", wp = "messages", bp = "0.3", jn = x.SIX_HOURS, vp = "publisher", ya = "irn", Ep = "error", ma = "wss://relay.walletconnect.org", Ip = "relayer", pe = { message: "relayer_message", message_ack: "relayer_message_ack", connect: "relayer_connect", disconnect: "relayer_disconnect", error: "relayer_error", connection_stalled: "relayer_connection_stalled", transport_closed: "relayer_transport_closed", publish: "relayer_publish" }, Pp = "_subscription", je = { payload: "payload", connect: "connect", disconnect: "disconnect", error: "error" }, _p = 0.1, rr = "2.21.1", ee = { link_mode: "link_mode", relay: "relay" }, ns = { inbound: "inbound", outbound: "outbound" }, $p = "0.3", Sp = "WALLETCONNECT_CLIENT_ID", kn = "WALLETCONNECT_LINK_MODE_APPS", xe = { created: "subscription_created", deleted: "subscription_deleted", expired: "subscription_expired", disabled: "subscription_disabled", sync: "subscription_sync", resubscribed: "subscription_resubscribed" }, Op = "subscription", Ap = "0.3", Cp = "pairing", xp = "0.3", Pi = { wc_pairingDelete: { req: { ttl: x.ONE_DAY, prompt: !1, tag: 1e3 }, res: { ttl: x.ONE_DAY, prompt: !1, tag: 1001 } }, wc_pairingPing: { req: { ttl: x.THIRTY_SECONDS, prompt: !1, tag: 1002 }, res: { ttl: x.THIRTY_SECONDS, prompt: !1, tag: 1003 } }, unregistered_method: { req: { ttl: x.ONE_DAY, prompt: !1, tag: 0 }, res: { ttl: x.ONE_DAY, prompt: !1, tag: 0 } } }, xt = { create: "pairing_create", expire: "pairing_expire", delete: "pairing_delete", ping: "pairing_ping" }, Be = { created: "history_created", updated: "history_updated", deleted: "history_deleted", sync: "history_sync" }, Np = "history", Rp = "0.3", Tp = "expirer", Fe = { created: "expirer_created", deleted: "expirer_deleted", expired: "expirer_expired", sync: "expirer_sync" }, qp = "0.3", Dp = "verify-api", jp = "https://verify.walletconnect.com", wa = "https://verify.walletconnect.org", Ri = wa, kp = `${Ri}/v3`, Fp = [jp, wa], Up = "echo", Mp = "https://echo.walletconnect.com", Xe = { pairing_started: "pairing_started", pairing_uri_validation_success: "pairing_uri_validation_success", pairing_uri_not_expired: "pairing_uri_not_expired", store_new_pairing: "store_new_pairing", subscribing_pairing_topic: "subscribing_pairing_topic", subscribe_pairing_topic_success: "subscribe_pairing_topic_success", existing_pairing: "existing_pairing", pairing_not_expired: "pairing_not_expired", emit_inactive_pairing: "emit_inactive_pairing", emit_session_proposal: "emit_session_proposal", subscribing_to_pairing_topic: "subscribing_to_pairing_topic" }, ht = { no_wss_connection: "no_wss_connection", no_internet_connection: "no_internet_connection", malformed_pairing_uri: "malformed_pairing_uri", active_pairing_already_exists: "active_pairing_already_exists", subscribe_pairing_topic_failure: "subscribe_pairing_topic_failure", pairing_expired: "pairing_expired", proposal_expired: "proposal_expired", proposal_listener_not_found: "proposal_listener_not_found" }, ze = { session_approve_started: "session_approve_started", proposal_not_expired: "proposal_not_expired", session_namespaces_validation_success: "session_namespaces_validation_success", create_session_topic: "create_session_topic", subscribing_session_topic: "subscribing_session_topic", subscribe_session_topic_success: "subscribe_session_topic_success", publishing_session_approve: "publishing_session_approve", session_approve_publish_success: "session_approve_publish_success", store_session: "store_session", publishing_session_settle: "publishing_session_settle", session_settle_publish_success: "session_settle_publish_success" }, $t = { no_internet_connection: "no_internet_connection", no_wss_connection: "no_wss_connection", proposal_expired: "proposal_expired", subscribe_session_topic_failure: "subscribe_session_topic_failure", session_approve_publish_failure: "session_approve_publish_failure", session_settle_publish_failure: "session_settle_publish_failure", session_approve_namespace_validation_failure: "session_approve_namespace_validation_failure", proposal_not_found: "proposal_not_found" }, St = { authenticated_session_approve_started: "authenticated_session_approve_started", create_authenticated_session_topic: "create_authenticated_session_topic", cacaos_verified: "cacaos_verified", store_authenticated_session: "store_authenticated_session", subscribing_authenticated_session_topic: "subscribing_authenticated_session_topic", subscribe_authenticated_session_topic_success: "subscribe_authenticated_session_topic_success", publishing_authenticated_session_approve: "publishing_authenticated_session_approve" }, _i = { no_internet_connection: "no_internet_connection", invalid_cacao: "invalid_cacao", subscribe_authenticated_session_topic_failure: "subscribe_authenticated_session_topic_failure", authenticated_session_approve_publish_failure: "authenticated_session_approve_publish_failure", authenticated_session_pending_request_not_found: "authenticated_session_pending_request_not_found" }, Lp = 0.1, Bp = "event-client", zp = 86400, Vp = "https://pulse.walletconnect.org/batch";
function Kp(i, e) {
  if (i.length >= 255) throw new TypeError("Alphabet too long");
  for (var t = new Uint8Array(256), s = 0; s < t.length; s++) t[s] = 255;
  for (var r = 0; r < i.length; r++) {
    var n = i.charAt(r), o = n.charCodeAt(0);
    if (t[o] !== 255) throw new TypeError(n + " is ambiguous");
    t[o] = r;
  }
  var a = i.length, c = i.charAt(0), h = Math.log(a) / Math.log(256), l = Math.log(256) / Math.log(a);
  function u(f) {
    if (f instanceof Uint8Array || (ArrayBuffer.isView(f) ? f = new Uint8Array(f.buffer, f.byteOffset, f.byteLength) : Array.isArray(f) && (f = Uint8Array.from(f))), !(f instanceof Uint8Array)) throw new TypeError("Expected Uint8Array");
    if (f.length === 0) return "";
    for (var m = 0, g = 0, w = 0, y = f.length; w !== y && f[w] === 0; ) w++, m++;
    for (var I = (y - w) * l + 1 >>> 0, A = new Uint8Array(I); w !== y; ) {
      for (var N = f[w], P = 0, $ = I - 1; (N !== 0 || P < g) && $ !== -1; $--, P++) N += 256 * A[$] >>> 0, A[$] = N % a >>> 0, N = N / a >>> 0;
      if (N !== 0) throw new Error("Non-zero carry");
      g = P, w++;
    }
    for (var R = I - g; R !== I && A[R] === 0; ) R++;
    for (var b = c.repeat(m); R < I; ++R) b += i.charAt(A[R]);
    return b;
  }
  function p(f) {
    if (typeof f != "string") throw new TypeError("Expected String");
    if (f.length === 0) return new Uint8Array();
    var m = 0;
    if (f[m] !== " ") {
      for (var g = 0, w = 0; f[m] === c; ) g++, m++;
      for (var y = (f.length - m) * h + 1 >>> 0, I = new Uint8Array(y); f[m]; ) {
        var A = t[f.charCodeAt(m)];
        if (A === 255) return;
        for (var N = 0, P = y - 1; (A !== 0 || N < w) && P !== -1; P--, N++) A += a * I[P] >>> 0, I[P] = A % 256 >>> 0, A = A / 256 >>> 0;
        if (A !== 0) throw new Error("Non-zero carry");
        w = N, m++;
      }
      if (f[m] !== " ") {
        for (var $ = y - w; $ !== y && I[$] === 0; ) $++;
        for (var R = new Uint8Array(g + (y - $)), b = g; $ !== y; ) R[b++] = I[$++];
        return R;
      }
    }
  }
  function d(f) {
    var m = p(f);
    if (m) return m;
    throw new Error(`Non-${e} character`);
  }
  return { encode: u, decodeUnsafe: p, decode: d };
}
var Hp = Kp, Gp = Hp;
const ba = (i) => {
  if (i instanceof Uint8Array && i.constructor.name === "Uint8Array") return i;
  if (i instanceof ArrayBuffer) return new Uint8Array(i);
  if (ArrayBuffer.isView(i)) return new Uint8Array(i.buffer, i.byteOffset, i.byteLength);
  throw new Error("Unknown type, must be binary type");
}, Wp = (i) => new TextEncoder().encode(i), Jp = (i) => new TextDecoder().decode(i);
class Qp {
  constructor(e, t, s) {
    this.name = e, this.prefix = t, this.baseEncode = s;
  }
  encode(e) {
    if (e instanceof Uint8Array) return `${this.prefix}${this.baseEncode(e)}`;
    throw Error("Unknown type, must be binary type");
  }
}
class Yp {
  constructor(e, t, s) {
    if (this.name = e, this.prefix = t, t.codePointAt(0) === void 0) throw new Error("Invalid prefix character");
    this.prefixCodePoint = t.codePointAt(0), this.baseDecode = s;
  }
  decode(e) {
    if (typeof e == "string") {
      if (e.codePointAt(0) !== this.prefixCodePoint) throw Error(`Unable to decode multibase string ${JSON.stringify(e)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
      return this.baseDecode(e.slice(this.prefix.length));
    } else throw Error("Can only multibase decode strings");
  }
  or(e) {
    return va(this, e);
  }
}
class Zp {
  constructor(e) {
    this.decoders = e;
  }
  or(e) {
    return va(this, e);
  }
  decode(e) {
    const t = e[0], s = this.decoders[t];
    if (s) return s.decode(e);
    throw RangeError(`Unable to decode multibase string ${JSON.stringify(e)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
  }
}
const va = (i, e) => new Zp({ ...i.decoders || { [i.prefix]: i }, ...e.decoders || { [e.prefix]: e } });
class Xp {
  constructor(e, t, s, r) {
    this.name = e, this.prefix = t, this.baseEncode = s, this.baseDecode = r, this.encoder = new Qp(e, t, s), this.decoder = new Yp(e, t, r);
  }
  encode(e) {
    return this.encoder.encode(e);
  }
  decode(e) {
    return this.decoder.decode(e);
  }
}
const vs = ({ name: i, prefix: e, encode: t, decode: s }) => new Xp(i, e, t, s), Ki = ({ prefix: i, name: e, alphabet: t }) => {
  const { encode: s, decode: r } = Gp(t, e);
  return vs({ prefix: i, name: e, encode: s, decode: (n) => ba(r(n)) });
}, ed = (i, e, t, s) => {
  const r = {};
  for (let l = 0; l < e.length; ++l) r[e[l]] = l;
  let n = i.length;
  for (; i[n - 1] === "="; ) --n;
  const o = new Uint8Array(n * t / 8 | 0);
  let a = 0, c = 0, h = 0;
  for (let l = 0; l < n; ++l) {
    const u = r[i[l]];
    if (u === void 0) throw new SyntaxError(`Non-${s} character`);
    c = c << t | u, a += t, a >= 8 && (a -= 8, o[h++] = 255 & c >> a);
  }
  if (a >= t || 255 & c << 8 - a) throw new SyntaxError("Unexpected end of data");
  return o;
}, td = (i, e, t) => {
  const s = e[e.length - 1] === "=", r = (1 << t) - 1;
  let n = "", o = 0, a = 0;
  for (let c = 0; c < i.length; ++c) for (a = a << 8 | i[c], o += 8; o > t; ) o -= t, n += e[r & a >> o];
  if (o && (n += e[r & a << t - o]), s) for (; n.length * t & 7; ) n += "=";
  return n;
}, we = ({ name: i, prefix: e, bitsPerChar: t, alphabet: s }) => vs({ prefix: e, name: i, encode(r) {
  return td(r, s, t);
}, decode(r) {
  return ed(r, s, t, i);
} }), id = vs({ prefix: "\0", name: "identity", encode: (i) => Jp(i), decode: (i) => Wp(i) });
var sd = Object.freeze({ __proto__: null, identity: id });
const rd = we({ prefix: "0", name: "base2", alphabet: "01", bitsPerChar: 1 });
var nd = Object.freeze({ __proto__: null, base2: rd });
const od = we({ prefix: "7", name: "base8", alphabet: "01234567", bitsPerChar: 3 });
var ad = Object.freeze({ __proto__: null, base8: od });
const cd = Ki({ prefix: "9", name: "base10", alphabet: "0123456789" });
var hd = Object.freeze({ __proto__: null, base10: cd });
const ld = we({ prefix: "f", name: "base16", alphabet: "0123456789abcdef", bitsPerChar: 4 }), ud = we({ prefix: "F", name: "base16upper", alphabet: "0123456789ABCDEF", bitsPerChar: 4 });
var pd = Object.freeze({ __proto__: null, base16: ld, base16upper: ud });
const dd = we({ prefix: "b", name: "base32", alphabet: "abcdefghijklmnopqrstuvwxyz234567", bitsPerChar: 5 }), gd = we({ prefix: "B", name: "base32upper", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567", bitsPerChar: 5 }), fd = we({ prefix: "c", name: "base32pad", alphabet: "abcdefghijklmnopqrstuvwxyz234567=", bitsPerChar: 5 }), yd = we({ prefix: "C", name: "base32padupper", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=", bitsPerChar: 5 }), md = we({ prefix: "v", name: "base32hex", alphabet: "0123456789abcdefghijklmnopqrstuv", bitsPerChar: 5 }), wd = we({ prefix: "V", name: "base32hexupper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV", bitsPerChar: 5 }), bd = we({ prefix: "t", name: "base32hexpad", alphabet: "0123456789abcdefghijklmnopqrstuv=", bitsPerChar: 5 }), vd = we({ prefix: "T", name: "base32hexpadupper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=", bitsPerChar: 5 }), Ed = we({ prefix: "h", name: "base32z", alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769", bitsPerChar: 5 });
var Id = Object.freeze({ __proto__: null, base32: dd, base32upper: gd, base32pad: fd, base32padupper: yd, base32hex: md, base32hexupper: wd, base32hexpad: bd, base32hexpadupper: vd, base32z: Ed });
const Pd = Ki({ prefix: "k", name: "base36", alphabet: "0123456789abcdefghijklmnopqrstuvwxyz" }), _d = Ki({ prefix: "K", name: "base36upper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ" });
var $d = Object.freeze({ __proto__: null, base36: Pd, base36upper: _d });
const Sd = Ki({ name: "base58btc", prefix: "z", alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz" }), Od = Ki({ name: "base58flickr", prefix: "Z", alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ" });
var Ad = Object.freeze({ __proto__: null, base58btc: Sd, base58flickr: Od });
const Cd = we({ prefix: "m", name: "base64", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", bitsPerChar: 6 }), xd = we({ prefix: "M", name: "base64pad", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", bitsPerChar: 6 }), Nd = we({ prefix: "u", name: "base64url", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_", bitsPerChar: 6 }), Rd = we({ prefix: "U", name: "base64urlpad", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=", bitsPerChar: 6 });
var Td = Object.freeze({ __proto__: null, base64: Cd, base64pad: xd, base64url: Nd, base64urlpad: Rd });
const Ea = Array.from("🚀🪐☄🛰🌌🌑🌒🌓🌔🌕🌖🌗🌘🌍🌏🌎🐉☀💻🖥💾💿😂❤😍🤣😊🙏💕😭😘👍😅👏😁🔥🥰💔💖💙😢🤔😆🙄💪😉☺👌🤗💜😔😎😇🌹🤦🎉💞✌✨🤷😱😌🌸🙌😋💗💚😏💛🙂💓🤩😄😀🖤😃💯🙈👇🎶😒🤭❣😜💋👀😪😑💥🙋😞😩😡🤪👊🥳😥🤤👉💃😳✋😚😝😴🌟😬🙃🍀🌷😻😓⭐✅🥺🌈😈🤘💦✔😣🏃💐☹🎊💘😠☝😕🌺🎂🌻😐🖕💝🙊😹🗣💫💀👑🎵🤞😛🔴😤🌼😫⚽🤙☕🏆🤫👈😮🙆🍻🍃🐶💁😲🌿🧡🎁⚡🌞🎈❌✊👋😰🤨😶🤝🚶💰🍓💢🤟🙁🚨💨🤬✈🎀🍺🤓😙💟🌱😖👶🥴▶➡❓💎💸⬇😨🌚🦋😷🕺⚠🙅😟😵👎🤲🤠🤧📌🔵💅🧐🐾🍒😗🤑🌊🤯🐷☎💧😯💆👆🎤🙇🍑❄🌴💣🐸💌📍🥀🤢👅💡💩👐📸👻🤐🤮🎼🥵🚩🍎🍊👼💍📣🥂"), qd = Ea.reduce((i, e, t) => (i[t] = e, i), []), Dd = Ea.reduce((i, e, t) => (i[e.codePointAt(0)] = t, i), []);
function jd(i) {
  return i.reduce((e, t) => (e += qd[t], e), "");
}
function kd(i) {
  const e = [];
  for (const t of i) {
    const s = Dd[t.codePointAt(0)];
    if (s === void 0) throw new Error(`Non-base256emoji character: ${t}`);
    e.push(s);
  }
  return new Uint8Array(e);
}
const Fd = vs({ prefix: "🚀", name: "base256emoji", encode: jd, decode: kd });
var Ud = Object.freeze({ __proto__: null, base256emoji: Fd }), Md = Ia, Fn = 128, Ld = -128, Bd = Math.pow(2, 31);
function Ia(i, e, t) {
  e = e || [], t = t || 0;
  for (var s = t; i >= Bd; ) e[t++] = i & 255 | Fn, i /= 128;
  for (; i & Ld; ) e[t++] = i & 255 | Fn, i >>>= 7;
  return e[t] = i | 0, Ia.bytes = t - s + 1, e;
}
var zd = nr, Vd = 128, Un = 127;
function nr(i, s) {
  var t = 0, s = s || 0, r = 0, n = s, o, a = i.length;
  do {
    if (n >= a) throw nr.bytes = 0, new RangeError("Could not decode varint");
    o = i[n++], t += r < 28 ? (o & Un) << r : (o & Un) * Math.pow(2, r), r += 7;
  } while (o >= Vd);
  return nr.bytes = n - s, t;
}
var Kd = Math.pow(2, 7), Hd = Math.pow(2, 14), Gd = Math.pow(2, 21), Wd = Math.pow(2, 28), Jd = Math.pow(2, 35), Qd = Math.pow(2, 42), Yd = Math.pow(2, 49), Zd = Math.pow(2, 56), Xd = Math.pow(2, 63), eg = function(i) {
  return i < Kd ? 1 : i < Hd ? 2 : i < Gd ? 3 : i < Wd ? 4 : i < Jd ? 5 : i < Qd ? 6 : i < Yd ? 7 : i < Zd ? 8 : i < Xd ? 9 : 10;
}, tg = { encode: Md, decode: zd, encodingLength: eg }, Pa = tg;
const Mn = (i, e, t = 0) => (Pa.encode(i, e, t), e), Ln = (i) => Pa.encodingLength(i), or = (i, e) => {
  const t = e.byteLength, s = Ln(i), r = s + Ln(t), n = new Uint8Array(r + t);
  return Mn(i, n, 0), Mn(t, n, s), n.set(e, r), new ig(i, t, e, n);
};
class ig {
  constructor(e, t, s, r) {
    this.code = e, this.size = t, this.digest = s, this.bytes = r;
  }
}
const _a = ({ name: i, code: e, encode: t }) => new sg(i, e, t);
class sg {
  constructor(e, t, s) {
    this.name = e, this.code = t, this.encode = s;
  }
  digest(e) {
    if (e instanceof Uint8Array) {
      const t = this.encode(e);
      return t instanceof Uint8Array ? or(this.code, t) : t.then((s) => or(this.code, s));
    } else throw Error("Unknown type, must be binary type");
  }
}
const $a = (i) => async (e) => new Uint8Array(await crypto.subtle.digest(i, e)), rg = _a({ name: "sha2-256", code: 18, encode: $a("SHA-256") }), ng = _a({ name: "sha2-512", code: 19, encode: $a("SHA-512") });
var og = Object.freeze({ __proto__: null, sha256: rg, sha512: ng });
const Sa = 0, ag = "identity", Oa = ba, cg = (i) => or(Sa, Oa(i)), hg = { code: Sa, name: ag, encode: Oa, digest: cg };
var lg = Object.freeze({ __proto__: null, identity: hg });
new TextEncoder(), new TextDecoder();
const Bn = { ...sd, ...nd, ...ad, ...hd, ...pd, ...Id, ...$d, ...Ad, ...Td, ...Ud };
({ ...og, ...lg });
function ug(i = 0) {
  return globalThis.Buffer != null && globalThis.Buffer.allocUnsafe != null ? globalThis.Buffer.allocUnsafe(i) : new Uint8Array(i);
}
function Aa(i, e, t, s) {
  return { name: i, prefix: e, encoder: { name: i, prefix: e, encode: t }, decoder: { decode: s } };
}
const zn = Aa("utf8", "u", (i) => "u" + new TextDecoder("utf8").decode(i), (i) => new TextEncoder().encode(i.substring(1))), qs = Aa("ascii", "a", (i) => {
  let e = "a";
  for (let t = 0; t < i.length; t++) e += String.fromCharCode(i[t]);
  return e;
}, (i) => {
  i = i.substring(1);
  const e = ug(i.length);
  for (let t = 0; t < i.length; t++) e[t] = i.charCodeAt(t);
  return e;
}), pg = { utf8: zn, "utf-8": zn, hex: Bn.base16, latin1: qs, ascii: qs, binary: qs, ...Bn };
function dg(i, e = "utf8") {
  const t = pg[e];
  if (!t) throw new Error(`Unsupported encoding "${e}"`);
  return (e === "utf8" || e === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null ? globalThis.Buffer.from(i, "utf8") : t.decoder.decode(`${t.prefix}${i}`);
}
var gg = Object.defineProperty, fg = (i, e, t) => e in i ? gg(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t, Ye = (i, e, t) => fg(i, typeof e != "symbol" ? e + "" : e, t);
class yg {
  constructor(e, t) {
    this.core = e, this.logger = t, Ye(this, "keychain", /* @__PURE__ */ new Map()), Ye(this, "name", yp), Ye(this, "version", mp), Ye(this, "initialized", !1), Ye(this, "storagePrefix", st), Ye(this, "init", async () => {
      if (!this.initialized) {
        const s = await this.getKeyChain();
        typeof s < "u" && (this.keychain = s), this.initialized = !0;
      }
    }), Ye(this, "has", (s) => (this.isInitialized(), this.keychain.has(s))), Ye(this, "set", async (s, r) => {
      this.isInitialized(), this.keychain.set(s, r), await this.persist();
    }), Ye(this, "get", (s) => {
      this.isInitialized();
      const r = this.keychain.get(s);
      if (typeof r > "u") {
        const { message: n } = C("NO_MATCHING_KEY", `${this.name}: ${s}`);
        throw new Error(n);
      }
      return r;
    }), Ye(this, "del", async (s) => {
      this.isInitialized(), this.keychain.delete(s), await this.persist();
    }), this.core = e, this.logger = Pe(t, this.name);
  }
  get context() {
    return De(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  async setKeyChain(e) {
    await this.core.storage.setItem(this.storageKey, Ks(e));
  }
  async getKeyChain() {
    const e = await this.core.storage.getItem(this.storageKey);
    return typeof e < "u" ? Hs(e) : void 0;
  }
  async persist() {
    await this.setKeyChain(this.keychain);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = C("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
}
var mg = Object.defineProperty, wg = (i, e, t) => e in i ? mg(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t, fe = (i, e, t) => wg(i, typeof e != "symbol" ? e + "" : e, t);
class bg {
  constructor(e, t, s) {
    this.core = e, this.logger = t, fe(this, "name", gp), fe(this, "keychain"), fe(this, "randomSessionIdentifier", ir()), fe(this, "initialized", !1), fe(this, "init", async () => {
      this.initialized || (await this.keychain.init(), this.initialized = !0);
    }), fe(this, "hasKeys", (r) => (this.isInitialized(), this.keychain.has(r))), fe(this, "getClientId", async () => {
      this.isInitialized();
      const r = await this.getClientSeed(), n = kr(r);
      return tc(n.publicKey);
    }), fe(this, "generateKeyPair", () => {
      this.isInitialized();
      const r = zl();
      return this.setPrivateKey(r.publicKey, r.privateKey);
    }), fe(this, "signJWT", async (r) => {
      this.isInitialized();
      const n = await this.getClientSeed(), o = kr(n), a = this.randomSessionIdentifier;
      return await ic(a, r, fp, o);
    }), fe(this, "generateSharedKey", (r, n, o) => {
      this.isInitialized();
      const a = this.getPrivateKey(r), c = Vl(a, n);
      return this.setSymKey(c, o);
    }), fe(this, "setSymKey", async (r, n) => {
      this.isInitialized();
      const o = n || rs(r);
      return await this.keychain.set(o, r), o;
    }), fe(this, "deleteKeyPair", async (r) => {
      this.isInitialized(), await this.keychain.del(r);
    }), fe(this, "deleteSymKey", async (r) => {
      this.isInitialized(), await this.keychain.del(r);
    }), fe(this, "encode", async (r, n, o) => {
      this.isInitialized();
      const a = ua(o), c = sc(n);
      if (En(a)) return Gl(c, o == null ? void 0 : o.encoding);
      if (vn(a)) {
        const p = a.senderPublicKey, d = a.receiverPublicKey;
        r = await this.generateSharedKey(p, d);
      }
      const h = this.getSymKey(r), { type: l, senderPublicKey: u } = a;
      return Kl({ type: l, symKey: h, message: c, senderPublicKey: u, encoding: o == null ? void 0 : o.encoding });
    }), fe(this, "decode", async (r, n, o) => {
      this.isInitialized();
      const a = Jl(n, o);
      if (En(a)) {
        const c = Wl(n, o == null ? void 0 : o.encoding);
        return Fr(c);
      }
      if (vn(a)) {
        const c = a.receiverPublicKey, h = a.senderPublicKey;
        r = await this.generateSharedKey(c, h);
      }
      try {
        const c = this.getSymKey(r), h = Hl({ symKey: c, encoded: n, encoding: o == null ? void 0 : o.encoding });
        return Fr(h);
      } catch (c) {
        this.logger.error(`Failed to decode message from topic: '${r}', clientId: '${await this.getClientId()}'`), this.logger.error(c);
      }
    }), fe(this, "getPayloadType", (r, n = He) => {
      const o = Fi({ encoded: r, encoding: n });
      return kt(o.type);
    }), fe(this, "getPayloadSenderPublicKey", (r, n = He) => {
      const o = Fi({ encoded: r, encoding: n });
      return o.senderPublicKey ? Oe(o.senderPublicKey, Ie) : void 0;
    }), this.core = e, this.logger = Pe(t, this.name), this.keychain = s || new yg(this.core, this.logger);
  }
  get context() {
    return De(this.logger);
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
      e = this.keychain.get(Dn);
    } catch {
      e = ir(), await this.keychain.set(Dn, e);
    }
    return dg(e, "base16");
  }
  getSymKey(e) {
    return this.keychain.get(e);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = C("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
}
var vg = Object.defineProperty, Eg = Object.defineProperties, Ig = Object.getOwnPropertyDescriptors, Vn = Object.getOwnPropertySymbols, Pg = Object.prototype.hasOwnProperty, _g = Object.prototype.propertyIsEnumerable, ar = (i, e, t) => e in i ? vg(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t, $g = (i, e) => {
  for (var t in e || (e = {})) Pg.call(e, t) && ar(i, t, e[t]);
  if (Vn) for (var t of Vn(e)) _g.call(e, t) && ar(i, t, e[t]);
  return i;
}, Sg = (i, e) => Eg(i, Ig(e)), Ae = (i, e, t) => ar(i, typeof e != "symbol" ? e + "" : e, t);
class Og extends Xu {
  constructor(e, t) {
    super(e, t), this.logger = e, this.core = t, Ae(this, "messages", /* @__PURE__ */ new Map()), Ae(this, "messagesWithoutClientAck", /* @__PURE__ */ new Map()), Ae(this, "name", wp), Ae(this, "version", bp), Ae(this, "initialized", !1), Ae(this, "storagePrefix", st), Ae(this, "init", async () => {
      if (!this.initialized) {
        this.logger.trace("Initialized");
        try {
          const s = await this.getRelayerMessages();
          typeof s < "u" && (this.messages = s);
          const r = await this.getRelayerMessagesWithoutClientAck();
          typeof r < "u" && (this.messagesWithoutClientAck = r), this.logger.debug(`Successfully Restored records for ${this.name}`), this.logger.trace({ type: "method", method: "restore", size: this.messages.size });
        } catch (s) {
          this.logger.debug(`Failed to Restore records for ${this.name}`), this.logger.error(s);
        } finally {
          this.initialized = !0;
        }
      }
    }), Ae(this, "set", async (s, r, n) => {
      this.isInitialized();
      const o = tt(r);
      let a = this.messages.get(s);
      if (typeof a > "u" && (a = {}), typeof a[o] < "u") return o;
      if (a[o] = r, this.messages.set(s, a), n === ns.inbound) {
        const c = this.messagesWithoutClientAck.get(s) || {};
        this.messagesWithoutClientAck.set(s, Sg($g({}, c), { [o]: r }));
      }
      return await this.persist(), o;
    }), Ae(this, "get", (s) => {
      this.isInitialized();
      let r = this.messages.get(s);
      return typeof r > "u" && (r = {}), r;
    }), Ae(this, "getWithoutAck", (s) => {
      this.isInitialized();
      const r = {};
      for (const n of s) {
        const o = this.messagesWithoutClientAck.get(n) || {};
        r[n] = Object.values(o);
      }
      return r;
    }), Ae(this, "has", (s, r) => {
      this.isInitialized();
      const n = this.get(s), o = tt(r);
      return typeof n[o] < "u";
    }), Ae(this, "ack", async (s, r) => {
      this.isInitialized();
      const n = this.messagesWithoutClientAck.get(s);
      if (typeof n > "u") return;
      const o = tt(r);
      delete n[o], Object.keys(n).length === 0 ? this.messagesWithoutClientAck.delete(s) : this.messagesWithoutClientAck.set(s, n), await this.persist();
    }), Ae(this, "del", async (s) => {
      this.isInitialized(), this.messages.delete(s), this.messagesWithoutClientAck.delete(s), await this.persist();
    }), this.logger = Pe(e, this.name), this.core = t;
  }
  get context() {
    return De(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  get storageKeyWithoutClientAck() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name + "_withoutClientAck";
  }
  async setRelayerMessages(e) {
    await this.core.storage.setItem(this.storageKey, Ks(e));
  }
  async setRelayerMessagesWithoutClientAck(e) {
    await this.core.storage.setItem(this.storageKeyWithoutClientAck, Ks(e));
  }
  async getRelayerMessages() {
    const e = await this.core.storage.getItem(this.storageKey);
    return typeof e < "u" ? Hs(e) : void 0;
  }
  async getRelayerMessagesWithoutClientAck() {
    const e = await this.core.storage.getItem(this.storageKeyWithoutClientAck);
    return typeof e < "u" ? Hs(e) : void 0;
  }
  async persist() {
    await this.setRelayerMessages(this.messages), await this.setRelayerMessagesWithoutClientAck(this.messagesWithoutClientAck);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = C("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
}
var Ag = Object.defineProperty, Cg = Object.defineProperties, xg = Object.getOwnPropertyDescriptors, Kn = Object.getOwnPropertySymbols, Ng = Object.prototype.hasOwnProperty, Rg = Object.prototype.propertyIsEnumerable, cr = (i, e, t) => e in i ? Ag(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t, Yi = (i, e) => {
  for (var t in e || (e = {})) Ng.call(e, t) && cr(i, t, e[t]);
  if (Kn) for (var t of Kn(e)) Rg.call(e, t) && cr(i, t, e[t]);
  return i;
}, Ds = (i, e) => Cg(i, xg(e)), Ve = (i, e, t) => cr(i, typeof e != "symbol" ? e + "" : e, t);
class Tg extends ep {
  constructor(e, t) {
    super(e, t), this.relayer = e, this.logger = t, Ve(this, "events", new It.EventEmitter()), Ve(this, "name", vp), Ve(this, "queue", /* @__PURE__ */ new Map()), Ve(this, "publishTimeout", x.toMiliseconds(x.ONE_MINUTE)), Ve(this, "initialPublishTimeout", x.toMiliseconds(x.ONE_SECOND * 15)), Ve(this, "needsTransportRestart", !1), Ve(this, "publish", async (s, r, n) => {
      var o;
      this.logger.debug("Publishing Payload"), this.logger.trace({ type: "method", method: "publish", params: { topic: s, message: r, opts: n } });
      const a = (n == null ? void 0 : n.ttl) || jn, c = hs(n), h = (n == null ? void 0 : n.prompt) || !1, l = (n == null ? void 0 : n.tag) || 0, u = (n == null ? void 0 : n.id) || ii().toString(), p = { topic: s, message: r, opts: { ttl: a, relay: c, prompt: h, tag: l, id: u, attestation: n == null ? void 0 : n.attestation, tvf: n == null ? void 0 : n.tvf } }, d = `Failed to publish payload, please try again. id:${u} tag:${l}`;
      try {
        const f = new Promise(async (m) => {
          const g = ({ id: y }) => {
            p.opts.id === y && (this.removeRequestFromQueue(y), this.relayer.events.removeListener(pe.publish, g), m(p));
          };
          this.relayer.events.on(pe.publish, g);
          const w = bt(new Promise((y, I) => {
            this.rpcPublish({ topic: s, message: r, ttl: a, prompt: h, tag: l, id: u, attestation: n == null ? void 0 : n.attestation, tvf: n == null ? void 0 : n.tvf }).then(y).catch((A) => {
              this.logger.warn(A, A == null ? void 0 : A.message), I(A);
            });
          }), this.initialPublishTimeout, `Failed initial publish, retrying.... id:${u} tag:${l}`);
          try {
            await w, this.events.removeListener(pe.publish, g);
          } catch (y) {
            this.queue.set(u, Ds(Yi({}, p), { attempt: 1 })), this.logger.warn(y, y == null ? void 0 : y.message);
          }
        });
        this.logger.trace({ type: "method", method: "publish", params: { id: u, topic: s, message: r, opts: n } }), await bt(f, this.publishTimeout, d);
      } catch (f) {
        if (this.logger.debug("Failed to Publish Payload"), this.logger.error(f), (o = n == null ? void 0 : n.internal) != null && o.throwOnFailedPublish) throw f;
      } finally {
        this.queue.delete(u);
      }
    }), Ve(this, "on", (s, r) => {
      this.events.on(s, r);
    }), Ve(this, "once", (s, r) => {
      this.events.once(s, r);
    }), Ve(this, "off", (s, r) => {
      this.events.off(s, r);
    }), Ve(this, "removeListener", (s, r) => {
      this.events.removeListener(s, r);
    }), this.relayer = e, this.logger = Pe(t, this.name), this.registerEventListeners();
  }
  get context() {
    return De(this.logger);
  }
  async rpcPublish(e) {
    var t, s, r, n;
    const { topic: o, message: a, ttl: c = jn, prompt: h, tag: l, id: u, attestation: p, tvf: d } = e, f = { method: Ai(hs().protocol).publish, params: Yi({ topic: o, message: a, ttl: c, prompt: h, tag: l, attestation: p }, d), id: u };
    me((t = f.params) == null ? void 0 : t.prompt) && ((s = f.params) == null || delete s.prompt), me((r = f.params) == null ? void 0 : r.tag) && ((n = f.params) == null || delete n.tag), this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "message", direction: "outgoing", request: f });
    const m = await this.relayer.request(f);
    return this.relayer.events.emit(pe.publish, e), this.logger.debug("Successfully Published Payload"), m;
  }
  removeRequestFromQueue(e) {
    this.queue.delete(e);
  }
  checkQueue() {
    this.queue.forEach(async (e, t) => {
      const s = e.attempt + 1;
      this.queue.set(t, Ds(Yi({}, e), { attempt: s }));
      const { topic: r, message: n, opts: o, attestation: a } = e;
      this.logger.warn({}, `Publisher: queue->publishing: ${e.opts.id}, tag: ${e.opts.tag}, attempt: ${s}`), await this.rpcPublish(Ds(Yi({}, e), { topic: r, message: n, ttl: o.ttl, prompt: o.prompt, tag: o.tag, id: o.id, attestation: a, tvf: o.tvf })), this.logger.warn({}, `Publisher: queue->published: ${e.opts.id}`);
    });
  }
  registerEventListeners() {
    this.relayer.core.heartbeat.on(yi.pulse, () => {
      if (this.needsTransportRestart) {
        this.needsTransportRestart = !1, this.relayer.events.emit(pe.connection_stalled);
        return;
      }
      this.checkQueue();
    }), this.relayer.on(pe.message_ack, (e) => {
      this.removeRequestFromQueue(e.id.toString());
    });
  }
}
var qg = Object.defineProperty, Dg = (i, e, t) => e in i ? qg(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t, Bt = (i, e, t) => Dg(i, typeof e != "symbol" ? e + "" : e, t);
class jg {
  constructor() {
    Bt(this, "map", /* @__PURE__ */ new Map()), Bt(this, "set", (e, t) => {
      const s = this.get(e);
      this.exists(e, t) || this.map.set(e, [...s, t]);
    }), Bt(this, "get", (e) => this.map.get(e) || []), Bt(this, "exists", (e, t) => this.get(e).includes(t)), Bt(this, "delete", (e, t) => {
      if (typeof t > "u") {
        this.map.delete(e);
        return;
      }
      if (!this.map.has(e)) return;
      const s = this.get(e);
      if (!this.exists(e, t)) return;
      const r = s.filter((n) => n !== t);
      if (!r.length) {
        this.map.delete(e);
        return;
      }
      this.map.set(e, r);
    }), Bt(this, "clear", () => {
      this.map.clear();
    });
  }
  get topics() {
    return Array.from(this.map.keys());
  }
}
var kg = Object.defineProperty, Fg = Object.defineProperties, Ug = Object.getOwnPropertyDescriptors, Hn = Object.getOwnPropertySymbols, Mg = Object.prototype.hasOwnProperty, Lg = Object.prototype.propertyIsEnumerable, hr = (i, e, t) => e in i ? kg(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t, $i = (i, e) => {
  for (var t in e || (e = {})) Mg.call(e, t) && hr(i, t, e[t]);
  if (Hn) for (var t of Hn(e)) Lg.call(e, t) && hr(i, t, e[t]);
  return i;
}, js = (i, e) => Fg(i, Ug(e)), Q = (i, e, t) => hr(i, typeof e != "symbol" ? e + "" : e, t);
class Bg extends sp {
  constructor(e, t) {
    super(e, t), this.relayer = e, this.logger = t, Q(this, "subscriptions", /* @__PURE__ */ new Map()), Q(this, "topicMap", new jg()), Q(this, "events", new It.EventEmitter()), Q(this, "name", Op), Q(this, "version", Ap), Q(this, "pending", /* @__PURE__ */ new Map()), Q(this, "cached", []), Q(this, "initialized", !1), Q(this, "storagePrefix", st), Q(this, "subscribeTimeout", x.toMiliseconds(x.ONE_MINUTE)), Q(this, "initialSubscribeTimeout", x.toMiliseconds(x.ONE_SECOND * 15)), Q(this, "clientId"), Q(this, "batchSubscribeTopicsLimit", 500), Q(this, "init", async () => {
      this.initialized || (this.logger.trace("Initialized"), this.registerEventListeners(), await this.restore()), this.initialized = !0;
    }), Q(this, "subscribe", async (s, r) => {
      this.isInitialized(), this.logger.debug("Subscribing Topic"), this.logger.trace({ type: "method", method: "subscribe", params: { topic: s, opts: r } });
      try {
        const n = hs(r), o = { topic: s, relay: n, transportType: r == null ? void 0 : r.transportType };
        this.pending.set(s, o);
        const a = await this.rpcSubscribe(s, n, r);
        return typeof a == "string" && (this.onSubscribe(a, o), this.logger.debug("Successfully Subscribed Topic"), this.logger.trace({ type: "method", method: "subscribe", params: { topic: s, opts: r } })), a;
      } catch (n) {
        throw this.logger.debug("Failed to Subscribe Topic"), this.logger.error(n), n;
      }
    }), Q(this, "unsubscribe", async (s, r) => {
      this.isInitialized(), typeof (r == null ? void 0 : r.id) < "u" ? await this.unsubscribeById(s, r.id, r) : await this.unsubscribeByTopic(s, r);
    }), Q(this, "isSubscribed", (s) => new Promise((r) => {
      r(this.topicMap.topics.includes(s));
    })), Q(this, "isKnownTopic", (s) => new Promise((r) => {
      r(this.topicMap.topics.includes(s) || this.pending.has(s) || this.cached.some((n) => n.topic === s));
    })), Q(this, "on", (s, r) => {
      this.events.on(s, r);
    }), Q(this, "once", (s, r) => {
      this.events.once(s, r);
    }), Q(this, "off", (s, r) => {
      this.events.off(s, r);
    }), Q(this, "removeListener", (s, r) => {
      this.events.removeListener(s, r);
    }), Q(this, "start", async () => {
      await this.onConnect();
    }), Q(this, "stop", async () => {
      await this.onDisconnect();
    }), Q(this, "restart", async () => {
      await this.restore(), await this.onRestart();
    }), Q(this, "checkPending", async () => {
      if (this.pending.size === 0 && (!this.initialized || !this.relayer.connected)) return;
      const s = [];
      this.pending.forEach((r) => {
        s.push(r);
      }), await this.batchSubscribe(s);
    }), Q(this, "registerEventListeners", () => {
      this.relayer.core.heartbeat.on(yi.pulse, async () => {
        await this.checkPending();
      }), this.events.on(xe.created, async (s) => {
        const r = xe.created;
        this.logger.info(`Emitting ${r}`), this.logger.debug({ type: "event", event: r, data: s }), await this.persist();
      }), this.events.on(xe.deleted, async (s) => {
        const r = xe.deleted;
        this.logger.info(`Emitting ${r}`), this.logger.debug({ type: "event", event: r, data: s }), await this.persist();
      });
    }), this.relayer = e, this.logger = Pe(t, this.name), this.clientId = "";
  }
  get context() {
    return De(this.logger);
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
    let s = !1;
    try {
      s = this.getSubscription(e).topic === t;
    } catch {
    }
    return s;
  }
  reset() {
    this.cached = [], this.initialized = !0;
  }
  onDisable() {
    this.values.length > 0 && (this.cached = this.values), this.subscriptions.clear(), this.topicMap.clear();
  }
  async unsubscribeByTopic(e, t) {
    const s = this.topicMap.get(e);
    await Promise.all(s.map(async (r) => await this.unsubscribeById(e, r, t)));
  }
  async unsubscribeById(e, t, s) {
    this.logger.debug("Unsubscribing Topic"), this.logger.trace({ type: "method", method: "unsubscribe", params: { topic: e, id: t, opts: s } });
    try {
      const r = hs(s);
      await this.restartToComplete({ topic: e, id: t, relay: r }), await this.rpcUnsubscribe(e, t, r);
      const n = J("USER_DISCONNECTED", `${this.name}, ${e}`);
      await this.onUnsubscribe(e, t, n), this.logger.debug("Successfully Unsubscribed Topic"), this.logger.trace({ type: "method", method: "unsubscribe", params: { topic: e, id: t, opts: s } });
    } catch (r) {
      throw this.logger.debug("Failed to Unsubscribe Topic"), this.logger.error(r), r;
    }
  }
  async rpcSubscribe(e, t, s) {
    var r;
    (!s || (s == null ? void 0 : s.transportType) === ee.relay) && await this.restartToComplete({ topic: e, id: e, relay: t });
    const n = { method: Ai(t.protocol).subscribe, params: { topic: e } };
    this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "payload", direction: "outgoing", request: n });
    const o = (r = s == null ? void 0 : s.internal) == null ? void 0 : r.throwOnFailedPublish;
    try {
      const a = await this.getSubscriptionId(e);
      if ((s == null ? void 0 : s.transportType) === ee.link_mode) return setTimeout(() => {
        (this.relayer.connected || this.relayer.connecting) && this.relayer.request(n).catch((l) => this.logger.warn(l));
      }, x.toMiliseconds(x.ONE_SECOND)), a;
      const c = new Promise(async (l) => {
        const u = (p) => {
          p.topic === e && (this.events.removeListener(xe.created, u), l(p.id));
        };
        this.events.on(xe.created, u);
        try {
          const p = await bt(new Promise((d, f) => {
            this.relayer.request(n).catch((m) => {
              this.logger.warn(m, m == null ? void 0 : m.message), f(m);
            }).then(d);
          }), this.initialSubscribeTimeout, `Subscribing to ${e} failed, please try again`);
          this.events.removeListener(xe.created, u), l(p);
        } catch {
        }
      }), h = await bt(c, this.subscribeTimeout, `Subscribing to ${e} failed, please try again`);
      if (!h && o) throw new Error(`Subscribing to ${e} failed, please try again`);
      return h ? a : null;
    } catch (a) {
      if (this.logger.debug("Outgoing Relay Subscribe Payload stalled"), this.relayer.events.emit(pe.connection_stalled), o) throw a;
    }
    return null;
  }
  async rpcBatchSubscribe(e) {
    if (!e.length) return;
    const t = e[0].relay, s = { method: Ai(t.protocol).batchSubscribe, params: { topics: e.map((r) => r.topic) } };
    this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "payload", direction: "outgoing", request: s });
    try {
      await await bt(new Promise((r) => {
        this.relayer.request(s).catch((n) => this.logger.warn(n)).then(r);
      }), this.subscribeTimeout, "rpcBatchSubscribe failed, please try again");
    } catch {
      this.relayer.events.emit(pe.connection_stalled);
    }
  }
  async rpcBatchFetchMessages(e) {
    if (!e.length) return;
    const t = e[0].relay, s = { method: Ai(t.protocol).batchFetchMessages, params: { topics: e.map((n) => n.topic) } };
    this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "payload", direction: "outgoing", request: s });
    let r;
    try {
      r = await await bt(new Promise((n, o) => {
        this.relayer.request(s).catch((a) => {
          this.logger.warn(a), o(a);
        }).then(n);
      }), this.subscribeTimeout, "rpcBatchFetchMessages failed, please try again");
    } catch {
      this.relayer.events.emit(pe.connection_stalled);
    }
    return r;
  }
  rpcUnsubscribe(e, t, s) {
    const r = { method: Ai(s.protocol).unsubscribe, params: { topic: e, id: t } };
    return this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "payload", direction: "outgoing", request: r }), this.relayer.request(r);
  }
  onSubscribe(e, t) {
    this.setSubscription(e, js($i({}, t), { id: e })), this.pending.delete(t.topic);
  }
  onBatchSubscribe(e) {
    e.length && e.forEach((t) => {
      this.setSubscription(t.id, $i({}, t)), this.pending.delete(t.topic);
    });
  }
  async onUnsubscribe(e, t, s) {
    this.events.removeAllListeners(t), this.hasSubscription(t, e) && this.deleteSubscription(t, s), await this.relayer.messages.del(e);
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
    this.subscriptions.set(e, $i({}, t)), this.topicMap.set(t.topic, e), this.events.emit(xe.created, t);
  }
  getSubscription(e) {
    this.logger.debug("Getting subscription"), this.logger.trace({ type: "method", method: "getSubscription", id: e });
    const t = this.subscriptions.get(e);
    if (!t) {
      const { message: s } = C("NO_MATCHING_KEY", `${this.name}: ${e}`);
      throw new Error(s);
    }
    return t;
  }
  deleteSubscription(e, t) {
    this.logger.debug("Deleting subscription"), this.logger.trace({ type: "method", method: "deleteSubscription", id: e, reason: t });
    const s = this.getSubscription(e);
    this.subscriptions.delete(e), this.topicMap.delete(s.topic, e), this.events.emit(xe.deleted, js($i({}, s), { reason: t }));
  }
  async persist() {
    await this.setRelayerSubscriptions(this.values), this.events.emit(xe.sync);
  }
  async onRestart() {
    if (this.cached.length) {
      const e = [...this.cached], t = Math.ceil(this.cached.length / this.batchSubscribeTopicsLimit);
      for (let s = 0; s < t; s++) {
        const r = e.splice(0, this.batchSubscribeTopicsLimit);
        await this.batchSubscribe(r);
      }
    }
    this.events.emit(xe.resubscribed);
  }
  async restore() {
    try {
      const e = await this.getRelayerSubscriptions();
      if (typeof e > "u" || !e.length) return;
      if (this.subscriptions.size) {
        const { message: t } = C("RESTORE_WILL_OVERRIDE", this.name);
        throw this.logger.error(t), this.logger.error(`${this.name}: ${JSON.stringify(this.values)}`), new Error(t);
      }
      this.cached = e, this.logger.debug(`Successfully Restored subscriptions for ${this.name}`), this.logger.trace({ type: "method", method: "restore", subscriptions: this.values });
    } catch (e) {
      this.logger.debug(`Failed to Restore subscriptions for ${this.name}`), this.logger.error(e);
    }
  }
  async batchSubscribe(e) {
    e.length && (await this.rpcBatchSubscribe(e), this.onBatchSubscribe(await Promise.all(e.map(async (t) => js($i({}, t), { id: await this.getSubscriptionId(t.topic) })))));
  }
  async batchFetchMessages(e) {
    if (!e.length) return;
    this.logger.trace(`Fetching batch messages for ${e.length} subscriptions`);
    const t = await this.rpcBatchFetchMessages(e);
    t && t.messages && (await xc(x.toMiliseconds(x.ONE_SECOND)), await this.relayer.handleBatchMessageEvents(t.messages));
  }
  async onConnect() {
    await this.restart(), this.reset();
  }
  onDisconnect() {
    this.onDisable();
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = C("NOT_INITIALIZED", this.name);
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
    return tt(e + await this.getClientId());
  }
}
var zg = Object.defineProperty, Gn = Object.getOwnPropertySymbols, Vg = Object.prototype.hasOwnProperty, Kg = Object.prototype.propertyIsEnumerable, lr = (i, e, t) => e in i ? zg(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t, Wn = (i, e) => {
  for (var t in e || (e = {})) Vg.call(e, t) && lr(i, t, e[t]);
  if (Gn) for (var t of Gn(e)) Kg.call(e, t) && lr(i, t, e[t]);
  return i;
}, K = (i, e, t) => lr(i, typeof e != "symbol" ? e + "" : e, t);
class Hg extends tp {
  constructor(e) {
    super(e), K(this, "protocol", "wc"), K(this, "version", 2), K(this, "core"), K(this, "logger"), K(this, "events", new It.EventEmitter()), K(this, "provider"), K(this, "messages"), K(this, "subscriber"), K(this, "publisher"), K(this, "name", Ip), K(this, "transportExplicitlyClosed", !1), K(this, "initialized", !1), K(this, "connectionAttemptInProgress", !1), K(this, "relayUrl"), K(this, "projectId"), K(this, "packageName"), K(this, "bundleId"), K(this, "hasExperiencedNetworkDisruption", !1), K(this, "pingTimeout"), K(this, "heartBeatTimeout", x.toMiliseconds(x.THIRTY_SECONDS + x.FIVE_SECONDS)), K(this, "reconnectTimeout"), K(this, "connectPromise"), K(this, "reconnectInProgress", !1), K(this, "requestsInFlight", []), K(this, "connectTimeout", x.toMiliseconds(x.ONE_SECOND * 15)), K(this, "request", async (t) => {
      var s, r;
      this.logger.debug("Publishing Request Payload");
      const n = t.id || ii().toString();
      await this.toEstablishConnection();
      try {
        this.logger.trace({ id: n, method: t.method, topic: (s = t.params) == null ? void 0 : s.topic }, "relayer.request - publishing...");
        const o = `${n}:${((r = t.params) == null ? void 0 : r.tag) || ""}`;
        this.requestsInFlight.push(o);
        const a = await this.provider.request(t);
        return this.requestsInFlight = this.requestsInFlight.filter((c) => c !== o), a;
      } catch (o) {
        throw this.logger.debug(`Failed to Publish Request: ${n}`), o;
      }
    }), K(this, "resetPingTimeout", () => {
      as() && (clearTimeout(this.pingTimeout), this.pingTimeout = setTimeout(() => {
        var t, s, r, n;
        try {
          this.logger.debug({}, "pingTimeout: Connection stalled, terminating..."), (n = (r = (s = (t = this.provider) == null ? void 0 : t.connection) == null ? void 0 : s.socket) == null ? void 0 : r.terminate) == null || n.call(r);
        } catch (o) {
          this.logger.warn(o, o == null ? void 0 : o.message);
        }
      }, this.heartBeatTimeout));
    }), K(this, "onPayloadHandler", (t) => {
      this.onProviderPayload(t), this.resetPingTimeout();
    }), K(this, "onConnectHandler", () => {
      this.logger.warn({}, "Relayer connected 🛜"), this.startPingTimeout(), this.events.emit(pe.connect);
    }), K(this, "onDisconnectHandler", () => {
      this.logger.warn({}, "Relayer disconnected 🛑"), this.requestsInFlight = [], this.onProviderDisconnect();
    }), K(this, "onProviderErrorHandler", (t) => {
      this.logger.fatal(`Fatal socket error: ${t.message}`), this.events.emit(pe.error, t), this.logger.fatal("Fatal socket error received, closing transport"), this.transportClose();
    }), K(this, "registerProviderListeners", () => {
      this.provider.on(je.payload, this.onPayloadHandler), this.provider.on(je.connect, this.onConnectHandler), this.provider.on(je.disconnect, this.onDisconnectHandler), this.provider.on(je.error, this.onProviderErrorHandler);
    }), this.core = e.core, this.logger = typeof e.logger < "u" && typeof e.logger != "string" ? Pe(e.logger, this.name) : Er(ps({ level: e.logger || Ep })), this.messages = new Og(this.logger, e.core), this.subscriber = new Bg(this, this.logger), this.publisher = new Tg(this, this.logger), this.relayUrl = (e == null ? void 0 : e.relayUrl) || ma, this.projectId = e.projectId, gc() ? this.packageName = zr() : fc() && (this.bundleId = zr()), this.provider = {};
  }
  async init() {
    if (this.logger.trace("Initialized"), this.registerEventListeners(), await Promise.all([this.messages.init(), this.subscriber.init()]), this.initialized = !0, this.subscriber.hasAnyTopics) try {
      await this.transportOpen();
    } catch (e) {
      this.logger.warn(e, e == null ? void 0 : e.message);
    }
  }
  get context() {
    return De(this.logger);
  }
  get connected() {
    var e, t, s;
    return ((s = (t = (e = this.provider) == null ? void 0 : e.connection) == null ? void 0 : t.socket) == null ? void 0 : s.readyState) === 1 || !1;
  }
  get connecting() {
    var e, t, s;
    return ((s = (t = (e = this.provider) == null ? void 0 : e.connection) == null ? void 0 : t.socket) == null ? void 0 : s.readyState) === 0 || this.connectPromise !== void 0 || !1;
  }
  async publish(e, t, s) {
    this.isInitialized(), await this.publisher.publish(e, t, s), await this.recordMessageEvent({ topic: e, message: t, publishedAt: Date.now(), transportType: ee.relay }, ns.outbound);
  }
  async subscribe(e, t) {
    var s, r, n;
    this.isInitialized(), (!(t != null && t.transportType) || (t == null ? void 0 : t.transportType) === "relay") && await this.toEstablishConnection();
    const o = typeof ((s = t == null ? void 0 : t.internal) == null ? void 0 : s.throwOnFailedPublish) > "u" ? !0 : (r = t == null ? void 0 : t.internal) == null ? void 0 : r.throwOnFailedPublish;
    let a = ((n = this.subscriber.topicMap.get(e)) == null ? void 0 : n[0]) || "", c;
    const h = (l) => {
      l.topic === e && (this.subscriber.off(xe.created, h), c());
    };
    return await Promise.all([new Promise((l) => {
      c = l, this.subscriber.on(xe.created, h);
    }), new Promise(async (l, u) => {
      a = await this.subscriber.subscribe(e, Wn({ internal: { throwOnFailedPublish: o } }, t)).catch((p) => {
        o && u(p);
      }) || a, l();
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
    this.provider.disconnect && (this.hasExperiencedNetworkDisruption || this.connected) ? await bt(this.provider.disconnect(), 2e3, "provider.disconnect()").catch(() => this.onProviderDisconnect()) : this.onProviderDisconnect();
  }
  async transportClose() {
    this.transportExplicitlyClosed = !0, await this.transportDisconnect();
  }
  async transportOpen(e) {
    if (!this.subscriber.hasAnyTopics) {
      this.logger.warn("Starting WS connection skipped because the client has no topics to work with.");
      return;
    }
    if (this.connectPromise ? (this.logger.debug({}, "Waiting for existing connection attempt to resolve..."), await this.connectPromise, this.logger.debug({}, "Existing connection attempt resolved")) : (this.connectPromise = new Promise(async (t, s) => {
      await this.connect(e).then(t).catch(s).finally(() => {
        this.connectPromise = void 0;
      });
    }), await this.connectPromise), !this.connected) throw new Error(`Couldn't establish socket connection to the relay server: ${this.relayUrl}`);
  }
  async restartTransport(e) {
    this.logger.debug({}, "Restarting transport..."), !this.connectionAttemptInProgress && (this.relayUrl = e || this.relayUrl, await this.confirmOnlineStateOrThrow(), await this.transportClose(), await this.transportOpen());
  }
  async confirmOnlineStateOrThrow() {
    if (!await Rn()) throw new Error("No internet connection detected. Please restart your network and try again.");
  }
  async handleBatchMessageEvents(e) {
    if ((e == null ? void 0 : e.length) === 0) {
      this.logger.trace("Batch message events is empty. Ignoring...");
      return;
    }
    const t = e.sort((s, r) => s.publishedAt - r.publishedAt);
    this.logger.debug(`Batch of ${t.length} message events sorted`);
    for (const s of t) try {
      await this.onMessageEvent(s);
    } catch (r) {
      this.logger.warn(r, "Error while processing batch message event: " + (r == null ? void 0 : r.message));
    }
    this.logger.trace(`Batch of ${t.length} message events processed`);
  }
  async onLinkMessageEvent(e, t) {
    const { topic: s } = e;
    if (!t.sessionExists) {
      const r = ae(x.FIVE_MINUTES), n = { topic: s, expiry: r, relay: { protocol: "irn" }, active: !1 };
      await this.core.pairing.pairings.set(s, n);
    }
    this.events.emit(pe.message, e), await this.recordMessageEvent(e, ns.inbound);
  }
  async connect(e) {
    await this.confirmOnlineStateOrThrow(), e && e !== this.relayUrl && (this.relayUrl = e, await this.transportDisconnect()), this.connectionAttemptInProgress = !0, this.transportExplicitlyClosed = !1;
    let t = 1;
    for (; t < 6; ) {
      try {
        if (this.transportExplicitlyClosed) break;
        this.logger.debug({}, `Connecting to ${this.relayUrl}, attempt: ${t}...`), await this.createProvider(), await new Promise(async (s, r) => {
          const n = () => {
            r(new Error("Connection interrupted while trying to subscribe"));
          };
          this.provider.once(je.disconnect, n), await bt(new Promise((o, a) => {
            this.provider.connect().then(o).catch(a);
          }), this.connectTimeout, `Socket stalled when trying to connect to ${this.relayUrl}`).catch((o) => {
            r(o);
          }).finally(() => {
            this.provider.off(je.disconnect, n), clearTimeout(this.reconnectTimeout);
          }), await new Promise(async (o, a) => {
            const c = () => {
              a(new Error("Connection interrupted while trying to subscribe"));
            };
            this.provider.once(je.disconnect, c), await this.subscriber.start().then(o).catch(a).finally(() => {
              this.provider.off(je.disconnect, c);
            });
          }), this.hasExperiencedNetworkDisruption = !1, s();
        });
      } catch (s) {
        await this.subscriber.stop();
        const r = s;
        this.logger.warn({}, r.message), this.hasExperiencedNetworkDisruption = !0;
      } finally {
        this.connectionAttemptInProgress = !1;
      }
      if (this.connected) {
        this.logger.debug({}, `Connected to ${this.relayUrl} successfully on attempt: ${t}`);
        break;
      }
      await new Promise((s) => setTimeout(s, x.toMiliseconds(t * 1))), t++;
    }
  }
  startPingTimeout() {
    var e, t, s, r, n;
    if (as()) try {
      (t = (e = this.provider) == null ? void 0 : e.connection) != null && t.socket && ((n = (r = (s = this.provider) == null ? void 0 : s.connection) == null ? void 0 : r.socket) == null || n.on("ping", () => {
        this.resetPingTimeout();
      })), this.resetPingTimeout();
    } catch (o) {
      this.logger.warn(o, o == null ? void 0 : o.message);
    }
  }
  async createProvider() {
    this.provider.connection && this.unregisterProviderListeners();
    const e = await this.core.crypto.signJWT(this.relayUrl);
    this.provider = new Me(new ec(vc({ sdkVersion: rr, protocol: this.protocol, version: this.version, relayUrl: this.relayUrl, projectId: this.projectId, auth: e, useOnCloseEvent: !0, bundleId: this.bundleId, packageName: this.packageName }))), this.registerProviderListeners();
  }
  async recordMessageEvent(e, t) {
    const { topic: s, message: r } = e;
    await this.messages.set(s, r, t);
  }
  async shouldIgnoreMessageEvent(e) {
    const { topic: t, message: s } = e;
    if (!s || s.length === 0) return this.logger.warn(`Ignoring invalid/empty message: ${s}`), !0;
    if (!await this.subscriber.isKnownTopic(t)) return this.logger.warn(`Ignoring message for unknown topic ${t}`), !0;
    const r = this.messages.has(t, s);
    return r && this.logger.warn(`Ignoring duplicate message: ${s}`), r;
  }
  async onProviderPayload(e) {
    if (this.logger.debug("Incoming Relay Payload"), this.logger.trace({ type: "payload", direction: "incoming", payload: e }), Ir(e)) {
      if (!e.method.endsWith(Pp)) return;
      const t = e.params, { topic: s, message: r, publishedAt: n, attestation: o } = t.data, a = { topic: s, message: r, publishedAt: n, transportType: ee.relay, attestation: o };
      this.logger.debug("Emitting Relayer Payload"), this.logger.trace(Wn({ type: "event", event: t.id }, a)), this.events.emit(t.id, a), await this.acknowledgePayload(e), await this.onMessageEvent(a);
    } else Pr(e) && this.events.emit(pe.message_ack, e);
  }
  async onMessageEvent(e) {
    await this.shouldIgnoreMessageEvent(e) || (await this.recordMessageEvent(e, ns.inbound), this.events.emit(pe.message, e));
  }
  async acknowledgePayload(e) {
    const t = ds(e.id, !0);
    await this.provider.connection.send(t);
  }
  unregisterProviderListeners() {
    this.provider.off(je.payload, this.onPayloadHandler), this.provider.off(je.connect, this.onConnectHandler), this.provider.off(je.disconnect, this.onDisconnectHandler), this.provider.off(je.error, this.onProviderErrorHandler), clearTimeout(this.pingTimeout);
  }
  async registerEventListeners() {
    let e = await Rn();
    Bu(async (t) => {
      e !== t && (e = t, t ? await this.transportOpen().catch((s) => this.logger.error(s, s == null ? void 0 : s.message)) : (this.hasExperiencedNetworkDisruption = !0, await this.transportDisconnect(), this.transportExplicitlyClosed = !1));
    }), this.core.heartbeat.on(yi.pulse, async () => {
      if (!this.transportExplicitlyClosed && !this.connected && Ku()) try {
        await this.confirmOnlineStateOrThrow(), await this.transportOpen();
      } catch (t) {
        this.logger.warn(t, t == null ? void 0 : t.message);
      }
    });
  }
  async onProviderDisconnect() {
    clearTimeout(this.pingTimeout), this.events.emit(pe.disconnect), this.connectionAttemptInProgress = !1, !this.reconnectInProgress && (this.reconnectInProgress = !0, await this.subscriber.stop(), this.subscriber.hasAnyTopics && (this.transportExplicitlyClosed || (this.reconnectTimeout = setTimeout(async () => {
      await this.transportOpen().catch((e) => this.logger.error(e, e == null ? void 0 : e.message)), this.reconnectTimeout = void 0, this.reconnectInProgress = !1;
    }, x.toMiliseconds(_p)))));
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = C("NOT_INITIALIZED", this.name);
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
function Gg() {
}
function Jn(i) {
  if (!i || typeof i != "object") return !1;
  const e = Object.getPrototypeOf(i);
  return e === null || e === Object.prototype || Object.getPrototypeOf(e) === null ? Object.prototype.toString.call(i) === "[object Object]" : !1;
}
function Qn(i) {
  return Object.getOwnPropertySymbols(i).filter((e) => Object.prototype.propertyIsEnumerable.call(i, e));
}
function Yn(i) {
  return i == null ? i === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(i);
}
const Wg = "[object RegExp]", Jg = "[object String]", Qg = "[object Number]", Yg = "[object Boolean]", Zn = "[object Arguments]", Zg = "[object Symbol]", Xg = "[object Date]", ef = "[object Map]", tf = "[object Set]", sf = "[object Array]", rf = "[object Function]", nf = "[object ArrayBuffer]", ks = "[object Object]", of = "[object Error]", af = "[object DataView]", cf = "[object Uint8Array]", hf = "[object Uint8ClampedArray]", lf = "[object Uint16Array]", uf = "[object Uint32Array]", pf = "[object BigUint64Array]", df = "[object Int8Array]", gf = "[object Int16Array]", ff = "[object Int32Array]", yf = "[object BigInt64Array]", mf = "[object Float32Array]", wf = "[object Float64Array]";
function bf(i, e) {
  return i === e || Number.isNaN(i) && Number.isNaN(e);
}
function vf(i, e, t) {
  return Ci(i, e, void 0, void 0, void 0, void 0, t);
}
function Ci(i, e, t, s, r, n, o) {
  const a = o(i, e, t, s, r, n);
  if (a !== void 0) return a;
  if (typeof i == typeof e) switch (typeof i) {
    case "bigint":
    case "string":
    case "boolean":
    case "symbol":
    case "undefined":
      return i === e;
    case "number":
      return i === e || Object.is(i, e);
    case "function":
      return i === e;
    case "object":
      return Ti(i, e, n, o);
  }
  return Ti(i, e, n, o);
}
function Ti(i, e, t, s) {
  if (Object.is(i, e)) return !0;
  let r = Yn(i), n = Yn(e);
  if (r === Zn && (r = ks), n === Zn && (n = ks), r !== n) return !1;
  switch (r) {
    case Jg:
      return i.toString() === e.toString();
    case Qg: {
      const c = i.valueOf(), h = e.valueOf();
      return bf(c, h);
    }
    case Yg:
    case Xg:
    case Zg:
      return Object.is(i.valueOf(), e.valueOf());
    case Wg:
      return i.source === e.source && i.flags === e.flags;
    case rf:
      return i === e;
  }
  t = t ?? /* @__PURE__ */ new Map();
  const o = t.get(i), a = t.get(e);
  if (o != null && a != null) return o === e;
  t.set(i, e), t.set(e, i);
  try {
    switch (r) {
      case ef: {
        if (i.size !== e.size) return !1;
        for (const [c, h] of i.entries()) if (!e.has(c) || !Ci(h, e.get(c), c, i, e, t, s)) return !1;
        return !0;
      }
      case tf: {
        if (i.size !== e.size) return !1;
        const c = Array.from(i.values()), h = Array.from(e.values());
        for (let l = 0; l < c.length; l++) {
          const u = c[l], p = h.findIndex((d) => Ci(u, d, void 0, i, e, t, s));
          if (p === -1) return !1;
          h.splice(p, 1);
        }
        return !0;
      }
      case sf:
      case cf:
      case hf:
      case lf:
      case uf:
      case pf:
      case df:
      case gf:
      case ff:
      case yf:
      case mf:
      case wf: {
        if (typeof Buffer < "u" && Buffer.isBuffer(i) !== Buffer.isBuffer(e) || i.length !== e.length) return !1;
        for (let c = 0; c < i.length; c++) if (!Ci(i[c], e[c], c, i, e, t, s)) return !1;
        return !0;
      }
      case nf:
        return i.byteLength !== e.byteLength ? !1 : Ti(new Uint8Array(i), new Uint8Array(e), t, s);
      case af:
        return i.byteLength !== e.byteLength || i.byteOffset !== e.byteOffset ? !1 : Ti(new Uint8Array(i), new Uint8Array(e), t, s);
      case of:
        return i.name === e.name && i.message === e.message;
      case ks: {
        if (!(Ti(i.constructor, e.constructor, t, s) || Jn(i) && Jn(e))) return !1;
        const c = [...Object.keys(i), ...Qn(i)], h = [...Object.keys(e), ...Qn(e)];
        if (c.length !== h.length) return !1;
        for (let l = 0; l < c.length; l++) {
          const u = c[l], p = i[u];
          if (!Object.hasOwn(e, u)) return !1;
          const d = e[u];
          if (!Ci(p, d, u, i, e, t, s)) return !1;
        }
        return !0;
      }
      default:
        return !1;
    }
  } finally {
    t.delete(i), t.delete(e);
  }
}
function Ef(i, e) {
  return vf(i, e, Gg);
}
var If = Object.defineProperty, Xn = Object.getOwnPropertySymbols, Pf = Object.prototype.hasOwnProperty, _f = Object.prototype.propertyIsEnumerable, ur = (i, e, t) => e in i ? If(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t, eo = (i, e) => {
  for (var t in e || (e = {})) Pf.call(e, t) && ur(i, t, e[t]);
  if (Xn) for (var t of Xn(e)) _f.call(e, t) && ur(i, t, e[t]);
  return i;
}, _e = (i, e, t) => ur(i, typeof e != "symbol" ? e + "" : e, t);
class Ft extends ip {
  constructor(e, t, s, r = st, n = void 0) {
    super(e, t, s, r), this.core = e, this.logger = t, this.name = s, _e(this, "map", /* @__PURE__ */ new Map()), _e(this, "version", $p), _e(this, "cached", []), _e(this, "initialized", !1), _e(this, "getKey"), _e(this, "storagePrefix", st), _e(this, "recentlyDeleted", []), _e(this, "recentlyDeletedLimit", 200), _e(this, "init", async () => {
      this.initialized || (this.logger.trace("Initialized"), await this.restore(), this.cached.forEach((o) => {
        this.getKey && o !== null && !me(o) ? this.map.set(this.getKey(o), o) : bu(o) ? this.map.set(o.id, o) : vu(o) && this.map.set(o.topic, o);
      }), this.cached = [], this.initialized = !0);
    }), _e(this, "set", async (o, a) => {
      this.isInitialized(), this.map.has(o) ? await this.update(o, a) : (this.logger.debug("Setting value"), this.logger.trace({ type: "method", method: "set", key: o, value: a }), this.map.set(o, a), await this.persist());
    }), _e(this, "get", (o) => (this.isInitialized(), this.logger.debug("Getting value"), this.logger.trace({ type: "method", method: "get", key: o }), this.getData(o))), _e(this, "getAll", (o) => (this.isInitialized(), o ? this.values.filter((a) => Object.keys(o).every((c) => Ef(a[c], o[c]))) : this.values)), _e(this, "update", async (o, a) => {
      this.isInitialized(), this.logger.debug("Updating value"), this.logger.trace({ type: "method", method: "update", key: o, update: a });
      const c = eo(eo({}, this.getData(o)), a);
      this.map.set(o, c), await this.persist();
    }), _e(this, "delete", async (o, a) => {
      this.isInitialized(), this.map.has(o) && (this.logger.debug("Deleting value"), this.logger.trace({ type: "method", method: "delete", key: o, reason: a }), this.map.delete(o), this.addToRecentlyDeleted(o), await this.persist());
    }), this.logger = Pe(t, this.name), this.storagePrefix = r, this.getKey = n;
  }
  get context() {
    return De(this.logger);
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
        const { message: r } = C("MISSING_OR_INVALID", `Record was recently deleted - ${this.name}: ${e}`);
        throw this.logger.error(r), new Error(r);
      }
      const { message: s } = C("NO_MATCHING_KEY", `${this.name}: ${e}`);
      throw this.logger.error(s), new Error(s);
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
        const { message: t } = C("RESTORE_WILL_OVERRIDE", this.name);
        throw this.logger.error(t), new Error(t);
      }
      this.cached = e, this.logger.debug(`Successfully Restored value for ${this.name}`), this.logger.trace({ type: "method", method: "restore", value: this.values });
    } catch (e) {
      this.logger.debug(`Failed to Restore value for ${this.name}`), this.logger.error(e);
    }
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = C("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
}
var $f = Object.defineProperty, Sf = (i, e, t) => e in i ? $f(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t, B = (i, e, t) => Sf(i, typeof e != "symbol" ? e + "" : e, t);
class Of {
  constructor(e, t) {
    this.core = e, this.logger = t, B(this, "name", Cp), B(this, "version", xp), B(this, "events", new _r()), B(this, "pairings"), B(this, "initialized", !1), B(this, "storagePrefix", st), B(this, "ignoredPayloadTypes", [dt]), B(this, "registeredMethods", []), B(this, "init", async () => {
      this.initialized || (await this.pairings.init(), await this.cleanup(), this.registerRelayerEvents(), this.registerExpirerEvents(), this.initialized = !0, this.logger.trace("Initialized"));
    }), B(this, "register", ({ methods: s }) => {
      this.isInitialized(), this.registeredMethods = [.../* @__PURE__ */ new Set([...this.registeredMethods, ...s])];
    }), B(this, "create", async (s) => {
      this.isInitialized();
      const r = ir(), n = await this.core.crypto.setSymKey(r), o = ae(x.FIVE_MINUTES), a = { protocol: ya }, c = { topic: n, expiry: o, relay: a, active: !1, methods: s == null ? void 0 : s.methods }, h = Pn({ protocol: this.core.protocol, version: this.core.version, topic: n, symKey: r, relay: a, expiryTimestamp: o, methods: s == null ? void 0 : s.methods });
      return this.events.emit(xt.create, c), this.core.expirer.set(n, o), await this.pairings.set(n, c), await this.core.relayer.subscribe(n, { transportType: s == null ? void 0 : s.transportType }), { topic: n, uri: h };
    }), B(this, "pair", async (s) => {
      this.isInitialized();
      const r = this.core.eventClient.createEvent({ properties: { topic: s == null ? void 0 : s.uri, trace: [Xe.pairing_started] } });
      this.isValidPair(s, r);
      const { topic: n, symKey: o, relay: a, expiryTimestamp: c, methods: h } = In(s.uri);
      r.props.properties.topic = n, r.addTrace(Xe.pairing_uri_validation_success), r.addTrace(Xe.pairing_uri_not_expired);
      let l;
      if (this.pairings.keys.includes(n)) {
        if (l = this.pairings.get(n), r.addTrace(Xe.existing_pairing), l.active) throw r.setError(ht.active_pairing_already_exists), new Error(`Pairing already exists: ${n}. Please try again with a new connection URI.`);
        r.addTrace(Xe.pairing_not_expired);
      }
      const u = c || ae(x.FIVE_MINUTES), p = { topic: n, relay: a, expiry: u, active: !1, methods: h };
      this.core.expirer.set(n, u), await this.pairings.set(n, p), r.addTrace(Xe.store_new_pairing), s.activatePairing && await this.activate({ topic: n }), this.events.emit(xt.create, p), r.addTrace(Xe.emit_inactive_pairing), this.core.crypto.keychain.has(n) || await this.core.crypto.setSymKey(o, n), r.addTrace(Xe.subscribing_pairing_topic);
      try {
        await this.core.relayer.confirmOnlineStateOrThrow();
      } catch {
        r.setError(ht.no_internet_connection);
      }
      try {
        await this.core.relayer.subscribe(n, { relay: a });
      } catch (d) {
        throw r.setError(ht.subscribe_pairing_topic_failure), d;
      }
      return r.addTrace(Xe.subscribe_pairing_topic_success), p;
    }), B(this, "activate", async ({ topic: s }) => {
      this.isInitialized();
      const r = ae(x.FIVE_MINUTES);
      this.core.expirer.set(s, r), await this.pairings.update(s, { active: !0, expiry: r });
    }), B(this, "ping", async (s) => {
      this.isInitialized(), await this.isValidPing(s), this.logger.warn("ping() is deprecated and will be removed in the next major release.");
      const { topic: r } = s;
      if (this.pairings.keys.includes(r)) {
        const n = await this.sendRequest(r, "wc_pairingPing", {}), { done: o, resolve: a, reject: c } = Ot();
        this.events.once(W("pairing_ping", n), ({ error: h }) => {
          h ? c(h) : a();
        }), await o();
      }
    }), B(this, "updateExpiry", async ({ topic: s, expiry: r }) => {
      this.isInitialized(), await this.pairings.update(s, { expiry: r });
    }), B(this, "updateMetadata", async ({ topic: s, metadata: r }) => {
      this.isInitialized(), await this.pairings.update(s, { peerMetadata: r });
    }), B(this, "getPairings", () => (this.isInitialized(), this.pairings.values)), B(this, "disconnect", async (s) => {
      this.isInitialized(), await this.isValidDisconnect(s);
      const { topic: r } = s;
      this.pairings.keys.includes(r) && (await this.sendRequest(r, "wc_pairingDelete", J("USER_DISCONNECTED")), await this.deletePairing(r));
    }), B(this, "formatUriFromPairing", (s) => {
      this.isInitialized();
      const { topic: r, relay: n, expiry: o, methods: a } = s, c = this.core.crypto.keychain.get(r);
      return Pn({ protocol: this.core.protocol, version: this.core.version, topic: r, symKey: c, relay: n, expiryTimestamp: o, methods: a });
    }), B(this, "sendRequest", async (s, r, n) => {
      const o = Rt(r, n), a = await this.core.crypto.encode(s, o), c = Pi[r].req;
      return this.core.history.set(s, o), this.core.relayer.publish(s, a, c), o.id;
    }), B(this, "sendResult", async (s, r, n) => {
      const o = ds(s, n), a = await this.core.crypto.encode(r, o), c = (await this.core.history.get(r, s)).request.method, h = Pi[c].res;
      await this.core.relayer.publish(r, a, h), await this.core.history.resolve(o);
    }), B(this, "sendError", async (s, r, n) => {
      const o = Oo(s, n), a = await this.core.crypto.encode(r, o), c = (await this.core.history.get(r, s)).request.method, h = Pi[c] ? Pi[c].res : Pi.unregistered_method.res;
      await this.core.relayer.publish(r, a, h), await this.core.history.resolve(o);
    }), B(this, "deletePairing", async (s, r) => {
      await this.core.relayer.unsubscribe(s), await Promise.all([this.pairings.delete(s, J("USER_DISCONNECTED")), this.core.crypto.deleteSymKey(s), r ? Promise.resolve() : this.core.expirer.del(s)]);
    }), B(this, "cleanup", async () => {
      const s = this.pairings.getAll().filter((r) => mt(r.expiry));
      await Promise.all(s.map((r) => this.deletePairing(r.topic)));
    }), B(this, "onRelayEventRequest", async (s) => {
      const { topic: r, payload: n } = s;
      switch (n.method) {
        case "wc_pairingPing":
          return await this.onPairingPingRequest(r, n);
        case "wc_pairingDelete":
          return await this.onPairingDeleteRequest(r, n);
        default:
          return await this.onUnknownRpcMethodRequest(r, n);
      }
    }), B(this, "onRelayEventResponse", async (s) => {
      const { topic: r, payload: n } = s, o = (await this.core.history.get(r, n.id)).request.method;
      switch (o) {
        case "wc_pairingPing":
          return this.onPairingPingResponse(r, n);
        default:
          return this.onUnknownRpcMethodResponse(o);
      }
    }), B(this, "onPairingPingRequest", async (s, r) => {
      const { id: n } = r;
      try {
        this.isValidPing({ topic: s }), await this.sendResult(n, s, !0), this.events.emit(xt.ping, { id: n, topic: s });
      } catch (o) {
        await this.sendError(n, s, o), this.logger.error(o);
      }
    }), B(this, "onPairingPingResponse", (s, r) => {
      const { id: n } = r;
      setTimeout(() => {
        ct(r) ? this.events.emit(W("pairing_ping", n), {}) : et(r) && this.events.emit(W("pairing_ping", n), { error: r.error });
      }, 500);
    }), B(this, "onPairingDeleteRequest", async (s, r) => {
      const { id: n } = r;
      try {
        this.isValidDisconnect({ topic: s }), await this.deletePairing(s), this.events.emit(xt.delete, { id: n, topic: s });
      } catch (o) {
        await this.sendError(n, s, o), this.logger.error(o);
      }
    }), B(this, "onUnknownRpcMethodRequest", async (s, r) => {
      const { id: n, method: o } = r;
      try {
        if (this.registeredMethods.includes(o)) return;
        const a = J("WC_METHOD_UNSUPPORTED", o);
        await this.sendError(n, s, a), this.logger.error(a);
      } catch (a) {
        await this.sendError(n, s, a), this.logger.error(a);
      }
    }), B(this, "onUnknownRpcMethodResponse", (s) => {
      this.registeredMethods.includes(s) || this.logger.error(J("WC_METHOD_UNSUPPORTED", s));
    }), B(this, "isValidPair", (s, r) => {
      var n;
      if (!$e(s)) {
        const { message: a } = C("MISSING_OR_INVALID", `pair() params: ${s}`);
        throw r.setError(ht.malformed_pairing_uri), new Error(a);
      }
      if (!wu(s.uri)) {
        const { message: a } = C("MISSING_OR_INVALID", `pair() uri: ${s.uri}`);
        throw r.setError(ht.malformed_pairing_uri), new Error(a);
      }
      const o = In(s == null ? void 0 : s.uri);
      if (!((n = o == null ? void 0 : o.relay) != null && n.protocol)) {
        const { message: a } = C("MISSING_OR_INVALID", "pair() uri#relay-protocol");
        throw r.setError(ht.malformed_pairing_uri), new Error(a);
      }
      if (!(o != null && o.symKey)) {
        const { message: a } = C("MISSING_OR_INVALID", "pair() uri#symKey");
        throw r.setError(ht.malformed_pairing_uri), new Error(a);
      }
      if (o != null && o.expiryTimestamp && x.toMiliseconds(o == null ? void 0 : o.expiryTimestamp) < Date.now()) {
        r.setError(ht.pairing_expired);
        const { message: a } = C("EXPIRED", "pair() URI has expired. Please try again with a new connection URI.");
        throw new Error(a);
      }
    }), B(this, "isValidPing", async (s) => {
      if (!$e(s)) {
        const { message: n } = C("MISSING_OR_INVALID", `ping() params: ${s}`);
        throw new Error(n);
      }
      const { topic: r } = s;
      await this.isValidPairingTopic(r);
    }), B(this, "isValidDisconnect", async (s) => {
      if (!$e(s)) {
        const { message: n } = C("MISSING_OR_INVALID", `disconnect() params: ${s}`);
        throw new Error(n);
      }
      const { topic: r } = s;
      await this.isValidPairingTopic(r);
    }), B(this, "isValidPairingTopic", async (s) => {
      if (!re(s, !1)) {
        const { message: r } = C("MISSING_OR_INVALID", `pairing topic should be a string: ${s}`);
        throw new Error(r);
      }
      if (!this.pairings.keys.includes(s)) {
        const { message: r } = C("NO_MATCHING_KEY", `pairing topic doesn't exist: ${s}`);
        throw new Error(r);
      }
      if (mt(this.pairings.get(s).expiry)) {
        await this.deletePairing(s);
        const { message: r } = C("EXPIRED", `pairing topic: ${s}`);
        throw new Error(r);
      }
    }), this.core = e, this.logger = Pe(t, this.name), this.pairings = new Ft(this.core, this.logger, this.name, this.storagePrefix);
  }
  get context() {
    return De(this.logger);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = C("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
  registerRelayerEvents() {
    this.core.relayer.on(pe.message, async (e) => {
      const { topic: t, message: s, transportType: r } = e;
      if (this.pairings.keys.includes(t) && r !== ee.link_mode && !this.ignoredPayloadTypes.includes(this.core.crypto.getPayloadType(s))) try {
        const n = await this.core.crypto.decode(t, s);
        Ir(n) ? (this.core.history.set(t, n), await this.onRelayEventRequest({ topic: t, payload: n })) : Pr(n) && (await this.core.history.resolve(n), await this.onRelayEventResponse({ topic: t, payload: n }), this.core.history.delete(t, n.id)), await this.core.relayer.messages.ack(t, s);
      } catch (n) {
        this.logger.error(n);
      }
    });
  }
  registerExpirerEvents() {
    this.core.expirer.on(Fe.expired, async (e) => {
      const { topic: t } = Ro(e.target);
      t && this.pairings.keys.includes(t) && (await this.deletePairing(t, !0), this.events.emit(xt.expire, { topic: t }));
    });
  }
}
var Af = Object.defineProperty, Cf = (i, e, t) => e in i ? Af(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t, ye = (i, e, t) => Cf(i, typeof e != "symbol" ? e + "" : e, t);
class xf extends Zu {
  constructor(e, t) {
    super(e, t), this.core = e, this.logger = t, ye(this, "records", /* @__PURE__ */ new Map()), ye(this, "events", new It.EventEmitter()), ye(this, "name", Np), ye(this, "version", Rp), ye(this, "cached", []), ye(this, "initialized", !1), ye(this, "storagePrefix", st), ye(this, "init", async () => {
      this.initialized || (this.logger.trace("Initialized"), await this.restore(), this.cached.forEach((s) => this.records.set(s.id, s)), this.cached = [], this.registerEventListeners(), this.initialized = !0);
    }), ye(this, "set", (s, r, n) => {
      if (this.isInitialized(), this.logger.debug("Setting JSON-RPC request history record"), this.logger.trace({ type: "method", method: "set", topic: s, request: r, chainId: n }), this.records.has(r.id)) return;
      const o = { id: r.id, topic: s, request: { method: r.method, params: r.params || null }, chainId: n, expiry: ae(x.THIRTY_DAYS) };
      this.records.set(o.id, o), this.persist(), this.events.emit(Be.created, o);
    }), ye(this, "resolve", async (s) => {
      if (this.isInitialized(), this.logger.debug("Updating JSON-RPC response history record"), this.logger.trace({ type: "method", method: "update", response: s }), !this.records.has(s.id)) return;
      const r = await this.getRecord(s.id);
      typeof r.response > "u" && (r.response = et(s) ? { error: s.error } : { result: s.result }, this.records.set(r.id, r), this.persist(), this.events.emit(Be.updated, r));
    }), ye(this, "get", async (s, r) => (this.isInitialized(), this.logger.debug("Getting record"), this.logger.trace({ type: "method", method: "get", topic: s, id: r }), await this.getRecord(r))), ye(this, "delete", (s, r) => {
      this.isInitialized(), this.logger.debug("Deleting record"), this.logger.trace({ type: "method", method: "delete", id: r }), this.values.forEach((n) => {
        if (n.topic === s) {
          if (typeof r < "u" && n.id !== r) return;
          this.records.delete(n.id), this.events.emit(Be.deleted, n);
        }
      }), this.persist();
    }), ye(this, "exists", async (s, r) => (this.isInitialized(), this.records.has(r) ? (await this.getRecord(r)).topic === s : !1)), ye(this, "on", (s, r) => {
      this.events.on(s, r);
    }), ye(this, "once", (s, r) => {
      this.events.once(s, r);
    }), ye(this, "off", (s, r) => {
      this.events.off(s, r);
    }), ye(this, "removeListener", (s, r) => {
      this.events.removeListener(s, r);
    }), this.logger = Pe(t, this.name);
  }
  get context() {
    return De(this.logger);
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
      const s = { topic: t.topic, request: Rt(t.request.method, t.request.params, t.id), chainId: t.chainId };
      return e.push(s);
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
      const { message: s } = C("NO_MATCHING_KEY", `${this.name}: ${e}`);
      throw new Error(s);
    }
    return t;
  }
  async persist() {
    await this.setJsonRpcRecords(this.values), this.events.emit(Be.sync);
  }
  async restore() {
    try {
      const e = await this.getJsonRpcRecords();
      if (typeof e > "u" || !e.length) return;
      if (this.records.size) {
        const { message: t } = C("RESTORE_WILL_OVERRIDE", this.name);
        throw this.logger.error(t), new Error(t);
      }
      this.cached = e, this.logger.debug(`Successfully Restored records for ${this.name}`), this.logger.trace({ type: "method", method: "restore", records: this.values });
    } catch (e) {
      this.logger.debug(`Failed to Restore records for ${this.name}`), this.logger.error(e);
    }
  }
  registerEventListeners() {
    this.events.on(Be.created, (e) => {
      const t = Be.created;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, record: e });
    }), this.events.on(Be.updated, (e) => {
      const t = Be.updated;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, record: e });
    }), this.events.on(Be.deleted, (e) => {
      const t = Be.deleted;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, record: e });
    }), this.core.heartbeat.on(yi.pulse, () => {
      this.cleanup();
    });
  }
  cleanup() {
    try {
      this.isInitialized();
      let e = !1;
      this.records.forEach((t) => {
        x.toMiliseconds(t.expiry || 0) - Date.now() <= 0 && (this.logger.info(`Deleting expired history log: ${t.id}`), this.records.delete(t.id), this.events.emit(Be.deleted, t, !1), e = !0);
      }), e && this.persist();
    } catch (e) {
      this.logger.warn(e);
    }
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = C("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
}
var Nf = Object.defineProperty, Rf = (i, e, t) => e in i ? Nf(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t, ve = (i, e, t) => Rf(i, typeof e != "symbol" ? e + "" : e, t);
class Tf extends rp {
  constructor(e, t) {
    super(e, t), this.core = e, this.logger = t, ve(this, "expirations", /* @__PURE__ */ new Map()), ve(this, "events", new It.EventEmitter()), ve(this, "name", Tp), ve(this, "version", qp), ve(this, "cached", []), ve(this, "initialized", !1), ve(this, "storagePrefix", st), ve(this, "init", async () => {
      this.initialized || (this.logger.trace("Initialized"), await this.restore(), this.cached.forEach((s) => this.expirations.set(s.target, s)), this.cached = [], this.registerEventListeners(), this.initialized = !0);
    }), ve(this, "has", (s) => {
      try {
        const r = this.formatTarget(s);
        return typeof this.getExpiration(r) < "u";
      } catch {
        return !1;
      }
    }), ve(this, "set", (s, r) => {
      this.isInitialized();
      const n = this.formatTarget(s), o = { target: n, expiry: r };
      this.expirations.set(n, o), this.checkExpiry(n, o), this.events.emit(Fe.created, { target: n, expiration: o });
    }), ve(this, "get", (s) => {
      this.isInitialized();
      const r = this.formatTarget(s);
      return this.getExpiration(r);
    }), ve(this, "del", (s) => {
      if (this.isInitialized(), this.has(s)) {
        const r = this.formatTarget(s), n = this.getExpiration(r);
        this.expirations.delete(r), this.events.emit(Fe.deleted, { target: r, expiration: n });
      }
    }), ve(this, "on", (s, r) => {
      this.events.on(s, r);
    }), ve(this, "once", (s, r) => {
      this.events.once(s, r);
    }), ve(this, "off", (s, r) => {
      this.events.off(s, r);
    }), ve(this, "removeListener", (s, r) => {
      this.events.removeListener(s, r);
    }), this.logger = Pe(t, this.name);
  }
  get context() {
    return De(this.logger);
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
    if (typeof e == "string") return Ec(e);
    if (typeof e == "number") return Ic(e);
    const { message: t } = C("UNKNOWN_TYPE", `Target type: ${typeof e}`);
    throw new Error(t);
  }
  async setExpirations(e) {
    await this.core.storage.setItem(this.storageKey, e);
  }
  async getExpirations() {
    return await this.core.storage.getItem(this.storageKey);
  }
  async persist() {
    await this.setExpirations(this.values), this.events.emit(Fe.sync);
  }
  async restore() {
    try {
      const e = await this.getExpirations();
      if (typeof e > "u" || !e.length) return;
      if (this.expirations.size) {
        const { message: t } = C("RESTORE_WILL_OVERRIDE", this.name);
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
      const { message: s } = C("NO_MATCHING_KEY", `${this.name}: ${e}`);
      throw this.logger.warn(s), new Error(s);
    }
    return t;
  }
  checkExpiry(e, t) {
    const { expiry: s } = t;
    x.toMiliseconds(s) - Date.now() <= 0 && this.expire(e, t);
  }
  expire(e, t) {
    this.expirations.delete(e), this.events.emit(Fe.expired, { target: e, expiration: t });
  }
  checkExpirations() {
    this.core.relayer.connected && this.expirations.forEach((e, t) => this.checkExpiry(t, e));
  }
  registerEventListeners() {
    this.core.heartbeat.on(yi.pulse, () => this.checkExpirations()), this.events.on(Fe.created, (e) => {
      const t = Fe.created;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, data: e }), this.persist();
    }), this.events.on(Fe.expired, (e) => {
      const t = Fe.expired;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, data: e }), this.persist();
    }), this.events.on(Fe.deleted, (e) => {
      const t = Fe.deleted;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, data: e }), this.persist();
    });
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = C("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
}
var qf = Object.defineProperty, Df = (i, e, t) => e in i ? qf(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t, se = (i, e, t) => Df(i, typeof e != "symbol" ? e + "" : e, t);
class jf extends np {
  constructor(e, t, s) {
    super(e, t, s), this.core = e, this.logger = t, this.store = s, se(this, "name", Dp), se(this, "abortController"), se(this, "isDevEnv"), se(this, "verifyUrlV3", kp), se(this, "storagePrefix", st), se(this, "version", fa), se(this, "publicKey"), se(this, "fetchPromise"), se(this, "init", async () => {
      var r;
      this.isDevEnv || (this.publicKey = await this.store.getItem(this.storeKey), this.publicKey && x.toMiliseconds((r = this.publicKey) == null ? void 0 : r.expiresAt) < Date.now() && (this.logger.debug("verify v2 public key expired"), await this.removePublicKey()));
    }), se(this, "register", async (r) => {
      if (!mi() || this.isDevEnv) return;
      const n = window.location.origin, { id: o, decryptedId: a } = r, c = `${this.verifyUrlV3}/attestation?projectId=${this.core.projectId}&origin=${n}&id=${o}&decryptedId=${a}`;
      try {
        const h = ai(), l = this.startAbortTimer(x.ONE_SECOND * 5), u = await new Promise((p, d) => {
          const f = () => {
            window.removeEventListener("message", g), h.body.removeChild(m), d("attestation aborted");
          };
          this.abortController.signal.addEventListener("abort", f);
          const m = h.createElement("iframe");
          m.src = c, m.style.display = "none", m.addEventListener("error", f, { signal: this.abortController.signal });
          const g = (w) => {
            if (w.data && typeof w.data == "string") try {
              const y = JSON.parse(w.data);
              if (y.type === "verify_attestation") {
                if (Vs(y.attestation).payload.id !== o) return;
                clearInterval(l), h.body.removeChild(m), this.abortController.signal.removeEventListener("abort", f), window.removeEventListener("message", g), p(y.attestation === null ? "" : y.attestation);
              }
            } catch (y) {
              this.logger.warn(y);
            }
          };
          h.body.appendChild(m), window.addEventListener("message", g, { signal: this.abortController.signal });
        });
        return this.logger.debug("jwt attestation", u), u;
      } catch (h) {
        this.logger.warn(h);
      }
      return "";
    }), se(this, "resolve", async (r) => {
      if (this.isDevEnv) return "";
      const { attestationId: n, hash: o, encryptedId: a } = r;
      if (n === "") {
        this.logger.debug("resolve: attestationId is empty, skipping");
        return;
      }
      if (n) {
        if (Vs(n).payload.id !== a) return;
        const h = await this.isValidJwtAttestation(n);
        if (h) {
          if (!h.isVerified) {
            this.logger.warn("resolve: jwt attestation: origin url not verified");
            return;
          }
          return h;
        }
      }
      if (!o) return;
      const c = this.getVerifyUrl(r == null ? void 0 : r.verifyUrl);
      return this.fetchAttestation(o, c);
    }), se(this, "fetchAttestation", async (r, n) => {
      this.logger.debug(`resolving attestation: ${r} from url: ${n}`);
      const o = this.startAbortTimer(x.ONE_SECOND * 5), a = await fetch(`${n}/attestation/${r}?v2Supported=true`, { signal: this.abortController.signal });
      return clearTimeout(o), a.status === 200 ? await a.json() : void 0;
    }), se(this, "getVerifyUrl", (r) => {
      let n = r || Ri;
      return Fp.includes(n) || (this.logger.info(`verify url: ${n}, not included in trusted list, assigning default: ${Ri}`), n = Ri), n;
    }), se(this, "fetchPublicKey", async () => {
      try {
        this.logger.debug(`fetching public key from: ${this.verifyUrlV3}`);
        const r = this.startAbortTimer(x.FIVE_SECONDS), n = await fetch(`${this.verifyUrlV3}/public-key`, { signal: this.abortController.signal });
        return clearTimeout(r), await n.json();
      } catch (r) {
        this.logger.warn(r);
      }
    }), se(this, "persistPublicKey", async (r) => {
      this.logger.debug("persisting public key to local storage", r), await this.store.setItem(this.storeKey, r), this.publicKey = r;
    }), se(this, "removePublicKey", async () => {
      this.logger.debug("removing verify v2 public key from storage"), await this.store.removeItem(this.storeKey), this.publicKey = void 0;
    }), se(this, "isValidJwtAttestation", async (r) => {
      const n = await this.getPublicKey();
      try {
        if (n) return this.validateAttestation(r, n);
      } catch (a) {
        this.logger.error(a), this.logger.warn("error validating attestation");
      }
      const o = await this.fetchAndPersistPublicKey();
      try {
        if (o) return this.validateAttestation(r, o);
      } catch (a) {
        this.logger.error(a), this.logger.warn("error validating attestation");
      }
    }), se(this, "getPublicKey", async () => this.publicKey ? this.publicKey : await this.fetchAndPersistPublicKey()), se(this, "fetchAndPersistPublicKey", async () => {
      if (this.fetchPromise) return await this.fetchPromise, this.publicKey;
      this.fetchPromise = new Promise(async (n) => {
        const o = await this.fetchPublicKey();
        o && (await this.persistPublicKey(o), n(o));
      });
      const r = await this.fetchPromise;
      return this.fetchPromise = void 0, r;
    }), se(this, "validateAttestation", (r, n) => {
      const o = Yl(r, n.publicKey), a = { hasExpired: x.toMiliseconds(o.exp) < Date.now(), payload: o };
      if (a.hasExpired) throw this.logger.warn("resolve: jwt attestation expired"), new Error("JWT attestation expired");
      return { origin: a.payload.origin, isScam: a.payload.isScam, isVerified: a.payload.isVerified };
    }), this.logger = Pe(t, this.name), this.abortController = new AbortController(), this.isDevEnv = $r(), this.init();
  }
  get storeKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//verify:public:key";
  }
  get context() {
    return De(this.logger);
  }
  startAbortTimer(e) {
    return this.abortController = new AbortController(), setTimeout(() => this.abortController.abort(), x.toMiliseconds(e));
  }
}
var kf = Object.defineProperty, Ff = (i, e, t) => e in i ? kf(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t, to = (i, e, t) => Ff(i, typeof e != "symbol" ? e + "" : e, t);
class Uf extends op {
  constructor(e, t) {
    super(e, t), this.projectId = e, this.logger = t, to(this, "context", Up), to(this, "registerDeviceToken", async (s) => {
      const { clientId: r, token: n, notificationType: o, enableEncrypted: a = !1 } = s, c = `${Mp}/${this.projectId}/clients`;
      await fetch(c, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ client_id: r, type: o, token: n, always_raw: a }) });
    }), this.logger = Pe(t, this.context);
  }
}
var Mf = Object.defineProperty, io = Object.getOwnPropertySymbols, Lf = Object.prototype.hasOwnProperty, Bf = Object.prototype.propertyIsEnumerable, pr = (i, e, t) => e in i ? Mf(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t, Si = (i, e) => {
  for (var t in e || (e = {})) Lf.call(e, t) && pr(i, t, e[t]);
  if (io) for (var t of io(e)) Bf.call(e, t) && pr(i, t, e[t]);
  return i;
}, he = (i, e, t) => pr(i, typeof e != "symbol" ? e + "" : e, t);
class zf extends ap {
  constructor(e, t, s = !0) {
    super(e, t, s), this.core = e, this.logger = t, he(this, "context", Bp), he(this, "storagePrefix", st), he(this, "storageVersion", Lp), he(this, "events", /* @__PURE__ */ new Map()), he(this, "shouldPersist", !1), he(this, "init", async () => {
      if (!$r()) try {
        const r = { eventId: Kr(), timestamp: Date.now(), domain: this.getAppDomain(), props: { event: "INIT", type: "", properties: { client_id: await this.core.crypto.getClientId(), user_agent: xo(this.core.relayer.protocol, this.core.relayer.version, rr) } } };
        await this.sendEvent([r]);
      } catch (r) {
        this.logger.warn(r);
      }
    }), he(this, "createEvent", (r) => {
      const { event: n = "ERROR", type: o = "", properties: { topic: a, trace: c } } = r, h = Kr(), l = this.core.projectId || "", u = Date.now(), p = Si({ eventId: h, timestamp: u, props: { event: n, type: o, properties: { topic: a, trace: c } }, bundleId: l, domain: this.getAppDomain() }, this.setMethods(h));
      return this.telemetryEnabled && (this.events.set(h, p), this.shouldPersist = !0), p;
    }), he(this, "getEvent", (r) => {
      const { eventId: n, topic: o } = r;
      if (n) return this.events.get(n);
      const a = Array.from(this.events.values()).find((c) => c.props.properties.topic === o);
      if (a) return Si(Si({}, a), this.setMethods(a.eventId));
    }), he(this, "deleteEvent", (r) => {
      const { eventId: n } = r;
      this.events.delete(n), this.shouldPersist = !0;
    }), he(this, "setEventListeners", () => {
      this.core.heartbeat.on(yi.pulse, async () => {
        this.shouldPersist && await this.persist(), this.events.forEach((r) => {
          x.fromMiliseconds(Date.now()) - x.fromMiliseconds(r.timestamp) > zp && (this.events.delete(r.eventId), this.shouldPersist = !0);
        });
      });
    }), he(this, "setMethods", (r) => ({ addTrace: (n) => this.addTrace(r, n), setError: (n) => this.setError(r, n) })), he(this, "addTrace", (r, n) => {
      const o = this.events.get(r);
      o && (o.props.properties.trace.push(n), this.events.set(r, o), this.shouldPersist = !0);
    }), he(this, "setError", (r, n) => {
      const o = this.events.get(r);
      o && (o.props.type = n, o.timestamp = Date.now(), this.events.set(r, o), this.shouldPersist = !0);
    }), he(this, "persist", async () => {
      await this.core.storage.setItem(this.storageKey, Array.from(this.events.values())), this.shouldPersist = !1;
    }), he(this, "restore", async () => {
      try {
        const r = await this.core.storage.getItem(this.storageKey) || [];
        if (!r.length) return;
        r.forEach((n) => {
          this.events.set(n.eventId, Si(Si({}, n), this.setMethods(n.eventId)));
        });
      } catch (r) {
        this.logger.warn(r);
      }
    }), he(this, "submit", async () => {
      if (!this.telemetryEnabled || this.events.size === 0) return;
      const r = [];
      for (const [n, o] of this.events) o.props.type && r.push(o);
      if (r.length !== 0) try {
        if ((await this.sendEvent(r)).ok) for (const n of r) this.events.delete(n.eventId), this.shouldPersist = !0;
      } catch (n) {
        this.logger.warn(n);
      }
    }), he(this, "sendEvent", async (r) => {
      const n = this.getAppDomain() ? "" : "&sp=desktop";
      return await fetch(`${Vp}?projectId=${this.core.projectId}&st=events_sdk&sv=js-${rr}${n}`, { method: "POST", body: JSON.stringify(r) });
    }), he(this, "getAppDomain", () => Co().url), this.logger = Pe(t, this.context), this.telemetryEnabled = s, s ? this.restore().then(async () => {
      await this.submit(), this.setEventListeners();
    }) : this.persist();
  }
  get storageKey() {
    return this.storagePrefix + this.storageVersion + this.core.customStoragePrefix + "//" + this.context;
  }
}
var Vf = Object.defineProperty, so = Object.getOwnPropertySymbols, Kf = Object.prototype.hasOwnProperty, Hf = Object.prototype.propertyIsEnumerable, dr = (i, e, t) => e in i ? Vf(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t, ro = (i, e) => {
  for (var t in e || (e = {})) Kf.call(e, t) && dr(i, t, e[t]);
  if (so) for (var t of so(e)) Hf.call(e, t) && dr(i, t, e[t]);
  return i;
}, X = (i, e, t) => dr(i, typeof e != "symbol" ? e + "" : e, t);
let Gf = class Ca extends Wu {
  constructor(e) {
    var t;
    super(e), X(this, "protocol", ga), X(this, "version", fa), X(this, "name", sr), X(this, "relayUrl"), X(this, "projectId"), X(this, "customStoragePrefix"), X(this, "events", new It.EventEmitter()), X(this, "logger"), X(this, "heartbeat"), X(this, "relayer"), X(this, "crypto"), X(this, "storage"), X(this, "history"), X(this, "expirer"), X(this, "pairing"), X(this, "verify"), X(this, "echoClient"), X(this, "linkModeSupportedApps"), X(this, "eventClient"), X(this, "initialized", !1), X(this, "logChunkController"), X(this, "on", (a, c) => this.events.on(a, c)), X(this, "once", (a, c) => this.events.once(a, c)), X(this, "off", (a, c) => this.events.off(a, c)), X(this, "removeListener", (a, c) => this.events.removeListener(a, c)), X(this, "dispatchEnvelope", ({ topic: a, message: c, sessionExists: h }) => {
      if (!a || !c) return;
      const l = { topic: a, message: c, publishedAt: Date.now(), transportType: ee.link_mode };
      this.relayer.onLinkMessageEvent(l, { sessionExists: h });
    });
    const s = this.getGlobalCore(e == null ? void 0 : e.customStoragePrefix);
    if (s) try {
      return this.customStoragePrefix = s.customStoragePrefix, this.logger = s.logger, this.heartbeat = s.heartbeat, this.crypto = s.crypto, this.history = s.history, this.expirer = s.expirer, this.storage = s.storage, this.relayer = s.relayer, this.pairing = s.pairing, this.verify = s.verify, this.echoClient = s.echoClient, this.linkModeSupportedApps = s.linkModeSupportedApps, this.eventClient = s.eventClient, this.initialized = s.initialized, this.logChunkController = s.logChunkController, s;
    } catch (a) {
      console.warn("Failed to copy global core", a);
    }
    this.projectId = e == null ? void 0 : e.projectId, this.relayUrl = (e == null ? void 0 : e.relayUrl) || ma, this.customStoragePrefix = e != null && e.customStoragePrefix ? `:${e.customStoragePrefix}` : "";
    const r = ps({ level: typeof (e == null ? void 0 : e.logger) == "string" && e.logger ? e.logger : pp.logger, name: sr }), { logger: n, chunkLoggerController: o } = Ya({ opts: r, maxSizeInBytes: e == null ? void 0 : e.maxLogBlobSizeInBytes, loggerOverride: e == null ? void 0 : e.logger });
    this.logChunkController = o, (t = this.logChunkController) != null && t.downloadLogsBlobInBrowser && (window.downloadLogsBlobInBrowser = async () => {
      var a, c;
      (a = this.logChunkController) != null && a.downloadLogsBlobInBrowser && ((c = this.logChunkController) == null || c.downloadLogsBlobInBrowser({ clientId: await this.crypto.getClientId() }));
    }), this.logger = Pe(n, this.name), this.heartbeat = new Za(), this.crypto = new bg(this, this.logger, e == null ? void 0 : e.keychain), this.history = new xf(this, this.logger), this.expirer = new Tf(this, this.logger), this.storage = e != null && e.storage ? e.storage : new Xa(ro(ro({}, dp), e == null ? void 0 : e.storageOptions)), this.relayer = new Hg({ core: this, logger: this.logger, relayUrl: this.relayUrl, projectId: this.projectId }), this.pairing = new Of(this, this.logger), this.verify = new jf(this, this.logger, this.storage), this.echoClient = new Uf(this.projectId || "", this.logger), this.linkModeSupportedApps = [], this.eventClient = new zf(this, this.logger, e == null ? void 0 : e.telemetryEnabled), this.setGlobalCore(this);
  }
  static async init(e) {
    const t = new Ca(e);
    await t.initialize();
    const s = await t.crypto.getClientId();
    return await t.storage.setItem(Sp, s), t;
  }
  get context() {
    return De(this.logger);
  }
  async start() {
    this.initialized || await this.initialize();
  }
  async getLogsBlob() {
    var e;
    return (e = this.logChunkController) == null ? void 0 : e.logsToBlob({ clientId: await this.crypto.getClientId() });
  }
  async addLinkModeSupportedApp(e) {
    this.linkModeSupportedApps.includes(e) || (this.linkModeSupportedApps.push(e), await this.storage.setItem(kn, this.linkModeSupportedApps));
  }
  async initialize() {
    this.logger.trace("Initialized");
    try {
      await this.crypto.init(), await this.history.init(), await this.expirer.init(), await this.relayer.init(), await this.heartbeat.init(), await this.pairing.init(), this.linkModeSupportedApps = await this.storage.getItem(kn) || [], this.initialized = !0, this.logger.info("Core Initialization Success");
    } catch (e) {
      throw this.logger.warn(`Core Initialization Failure at epoch ${Date.now()}`, e), this.logger.error(e.message), e;
    }
  }
  getGlobalCore(e = "") {
    try {
      if (this.isGlobalCoreDisabled()) return;
      const t = `_walletConnectCore_${e}`, s = `${t}_count`;
      return globalThis[s] = (globalThis[s] || 0) + 1, globalThis[s] > 1 && console.warn(`WalletConnect Core is already initialized. This is probably a mistake and can lead to unexpected behavior. Init() was called ${globalThis[s]} times.`), globalThis[t];
    } catch (t) {
      console.warn("Failed to get global WalletConnect core", t);
      return;
    }
  }
  setGlobalCore(e) {
    var t;
    try {
      if (this.isGlobalCoreDisabled()) return;
      const s = `_walletConnectCore_${((t = e.opts) == null ? void 0 : t.customStoragePrefix) || ""}`;
      globalThis[s] = e;
    } catch (s) {
      console.warn("Failed to set global WalletConnect core", s);
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
const Wf = Gf, xa = "wc", Na = 2, Ra = "client", Tr = `${xa}@${Na}:${Ra}:`, Fs = { name: Ra, logger: "error" }, no = "WALLETCONNECT_DEEPLINK_CHOICE", Jf = "proposal", oo = "Proposal expired", Qf = "session", zt = x.SEVEN_DAYS, Yf = "engine", le = { wc_sessionPropose: { req: { ttl: x.FIVE_MINUTES, prompt: !0, tag: 1100 }, res: { ttl: x.FIVE_MINUTES, prompt: !1, tag: 1101 }, reject: { ttl: x.FIVE_MINUTES, prompt: !1, tag: 1120 }, autoReject: { ttl: x.FIVE_MINUTES, prompt: !1, tag: 1121 } }, wc_sessionSettle: { req: { ttl: x.FIVE_MINUTES, prompt: !1, tag: 1102 }, res: { ttl: x.FIVE_MINUTES, prompt: !1, tag: 1103 } }, wc_sessionUpdate: { req: { ttl: x.ONE_DAY, prompt: !1, tag: 1104 }, res: { ttl: x.ONE_DAY, prompt: !1, tag: 1105 } }, wc_sessionExtend: { req: { ttl: x.ONE_DAY, prompt: !1, tag: 1106 }, res: { ttl: x.ONE_DAY, prompt: !1, tag: 1107 } }, wc_sessionRequest: { req: { ttl: x.FIVE_MINUTES, prompt: !0, tag: 1108 }, res: { ttl: x.FIVE_MINUTES, prompt: !1, tag: 1109 } }, wc_sessionEvent: { req: { ttl: x.FIVE_MINUTES, prompt: !0, tag: 1110 }, res: { ttl: x.FIVE_MINUTES, prompt: !1, tag: 1111 } }, wc_sessionDelete: { req: { ttl: x.ONE_DAY, prompt: !1, tag: 1112 }, res: { ttl: x.ONE_DAY, prompt: !1, tag: 1113 } }, wc_sessionPing: { req: { ttl: x.ONE_DAY, prompt: !1, tag: 1114 }, res: { ttl: x.ONE_DAY, prompt: !1, tag: 1115 } }, wc_sessionAuthenticate: { req: { ttl: x.ONE_HOUR, prompt: !0, tag: 1116 }, res: { ttl: x.ONE_HOUR, prompt: !1, tag: 1117 }, reject: { ttl: x.FIVE_MINUTES, prompt: !1, tag: 1118 }, autoReject: { ttl: x.FIVE_MINUTES, prompt: !1, tag: 1119 } } }, Us = { min: x.FIVE_MINUTES, max: x.SEVEN_DAYS }, Ze = { idle: "IDLE", active: "ACTIVE" }, ao = { eth_sendTransaction: { key: "" }, eth_sendRawTransaction: { key: "" }, wallet_sendCalls: { key: "" }, solana_signTransaction: { key: "signature" }, solana_signAllTransactions: { key: "transactions" }, solana_signAndSendTransaction: { key: "signature" } }, Zf = "request", Xf = ["wc_sessionPropose", "wc_sessionRequest", "wc_authRequest", "wc_sessionAuthenticate"], ey = "wc", ty = "auth", iy = "authKeys", sy = "pairingTopics", ry = "requests", Es = `${ey}@${1.5}:${ty}:`, os = `${Es}:PUB_KEY`;
var ny = Object.defineProperty, oy = Object.defineProperties, ay = Object.getOwnPropertyDescriptors, co = Object.getOwnPropertySymbols, cy = Object.prototype.hasOwnProperty, hy = Object.prototype.propertyIsEnumerable, gr = (i, e, t) => e in i ? ny(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t, Y = (i, e) => {
  for (var t in e || (e = {})) cy.call(e, t) && gr(i, t, e[t]);
  if (co) for (var t of co(e)) hy.call(e, t) && gr(i, t, e[t]);
  return i;
}, Ee = (i, e) => oy(i, ay(e)), v = (i, e, t) => gr(i, typeof e != "symbol" ? e + "" : e, t);
class ly extends up {
  constructor(e) {
    super(e), v(this, "name", Yf), v(this, "events", new _r()), v(this, "initialized", !1), v(this, "requestQueue", { state: Ze.idle, queue: [] }), v(this, "sessionRequestQueue", { state: Ze.idle, queue: [] }), v(this, "requestQueueDelay", x.ONE_SECOND), v(this, "expectedPairingMethodMap", /* @__PURE__ */ new Map()), v(this, "recentlyDeletedMap", /* @__PURE__ */ new Map()), v(this, "recentlyDeletedLimit", 200), v(this, "relayMessageCache", []), v(this, "pendingSessions", /* @__PURE__ */ new Map()), v(this, "init", async () => {
      this.initialized || (await this.cleanup(), this.registerRelayerEvents(), this.registerExpirerEvents(), this.registerPairingEvents(), await this.registerLinkModeListeners(), this.client.core.pairing.register({ methods: Object.keys(le) }), this.initialized = !0, setTimeout(async () => {
        await this.processPendingMessageEvents(), this.sessionRequestQueue.queue = this.getPendingSessionRequests(), this.processSessionRequestQueue();
      }, x.toMiliseconds(this.requestQueueDelay)));
    }), v(this, "connect", async (t) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      const s = Ee(Y({}, t), { requiredNamespaces: t.requiredNamespaces || {}, optionalNamespaces: t.optionalNamespaces || {} });
      await this.isValidConnect(s), s.optionalNamespaces = du(s.requiredNamespaces, s.optionalNamespaces), s.requiredNamespaces = {};
      const { pairingTopic: r, requiredNamespaces: n, optionalNamespaces: o, sessionProperties: a, scopedProperties: c, relays: h } = s;
      let l = r, u, p = !1;
      try {
        if (l) {
          const P = this.client.core.pairing.pairings.get(l);
          this.client.logger.warn("connect() with existing pairing topic is deprecated and will be removed in the next major release."), p = P.active;
        }
      } catch (P) {
        throw this.client.logger.error(`connect() -> pairing.get(${l}) failed`), P;
      }
      if (!l || !p) {
        const { topic: P, uri: $ } = await this.client.core.pairing.create();
        l = P, u = $;
      }
      if (!l) {
        const { message: P } = C("NO_MATCHING_KEY", `connect() pairing topic: ${l}`);
        throw new Error(P);
      }
      const d = await this.client.core.crypto.generateKeyPair(), f = le.wc_sessionPropose.req.ttl || x.FIVE_MINUTES, m = ae(f), g = Ee(Y(Y({ requiredNamespaces: n, optionalNamespaces: o, relays: h ?? [{ protocol: ya }], proposer: { publicKey: d, metadata: this.client.metadata }, expiryTimestamp: m, pairingTopic: l }, a && { sessionProperties: a }), c && { scopedProperties: c }), { id: gt() }), w = W("session_connect", g.id), { reject: y, resolve: I, done: A } = Ot(f, oo), N = ({ id: P }) => {
        P === g.id && (this.client.events.off("proposal_expire", N), this.pendingSessions.delete(g.id), this.events.emit(w, { error: { message: oo, code: 0 } }));
      };
      return this.client.events.on("proposal_expire", N), this.events.once(w, ({ error: P, session: $ }) => {
        this.client.events.off("proposal_expire", N), P ? y(P) : $ && I($);
      }), await this.sendRequest({ topic: l, method: "wc_sessionPropose", params: g, throwOnFailedPublish: !0, clientRpcId: g.id }), await this.setProposal(g.id, g), { uri: u, approval: A };
    }), v(this, "pair", async (t) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      try {
        return await this.client.core.pairing.pair(t);
      } catch (s) {
        throw this.client.logger.error("pair() failed"), s;
      }
    }), v(this, "approve", async (t) => {
      var s, r, n;
      const o = this.client.core.eventClient.createEvent({ properties: { topic: (s = t == null ? void 0 : t.id) == null ? void 0 : s.toString(), trace: [ze.session_approve_started] } });
      try {
        this.isInitialized(), await this.confirmOnlineStateOrThrow();
      } catch (b) {
        throw o.setError($t.no_internet_connection), b;
      }
      try {
        await this.isValidProposalId(t == null ? void 0 : t.id);
      } catch (b) {
        throw this.client.logger.error(`approve() -> proposal.get(${t == null ? void 0 : t.id}) failed`), o.setError($t.proposal_not_found), b;
      }
      try {
        await this.isValidApprove(t);
      } catch (b) {
        throw this.client.logger.error("approve() -> isValidApprove() failed"), o.setError($t.session_approve_namespace_validation_failure), b;
      }
      const { id: a, relayProtocol: c, namespaces: h, sessionProperties: l, scopedProperties: u, sessionConfig: p } = t, d = this.client.proposal.get(a);
      this.client.core.eventClient.deleteEvent({ eventId: o.eventId });
      const { pairingTopic: f, proposer: m, requiredNamespaces: g, optionalNamespaces: w } = d;
      let y = (r = this.client.core.eventClient) == null ? void 0 : r.getEvent({ topic: f });
      y || (y = (n = this.client.core.eventClient) == null ? void 0 : n.createEvent({ type: ze.session_approve_started, properties: { topic: f, trace: [ze.session_approve_started, ze.session_namespaces_validation_success] } }));
      const I = await this.client.core.crypto.generateKeyPair(), A = m.publicKey, N = await this.client.core.crypto.generateSharedKey(I, A), P = Y(Y(Y({ relay: { protocol: c ?? "irn" }, namespaces: h, controller: { publicKey: I, metadata: this.client.metadata }, expiry: ae(zt) }, l && { sessionProperties: l }), u && { scopedProperties: u }), p && { sessionConfig: p }), $ = ee.relay;
      y.addTrace(ze.subscribing_session_topic);
      try {
        await this.client.core.relayer.subscribe(N, { transportType: $ });
      } catch (b) {
        throw y.setError($t.subscribe_session_topic_failure), b;
      }
      y.addTrace(ze.subscribe_session_topic_success);
      const R = Ee(Y({}, P), { topic: N, requiredNamespaces: g, optionalNamespaces: w, pairingTopic: f, acknowledged: !1, self: P.controller, peer: { publicKey: m.publicKey, metadata: m.metadata }, controller: I, transportType: ee.relay });
      await this.client.session.set(N, R), y.addTrace(ze.store_session);
      try {
        y.addTrace(ze.publishing_session_settle), await this.sendRequest({ topic: N, method: "wc_sessionSettle", params: P, throwOnFailedPublish: !0 }).catch((b) => {
          throw y == null || y.setError($t.session_settle_publish_failure), b;
        }), y.addTrace(ze.session_settle_publish_success), y.addTrace(ze.publishing_session_approve), await this.sendResult({ id: a, topic: f, result: { relay: { protocol: c ?? "irn" }, responderPublicKey: I }, throwOnFailedPublish: !0 }).catch((b) => {
          throw y == null || y.setError($t.session_approve_publish_failure), b;
        }), y.addTrace(ze.session_approve_publish_success);
      } catch (b) {
        throw this.client.logger.error(b), this.client.session.delete(N, J("USER_DISCONNECTED")), await this.client.core.relayer.unsubscribe(N), b;
      }
      return this.client.core.eventClient.deleteEvent({ eventId: y.eventId }), await this.client.core.pairing.updateMetadata({ topic: f, metadata: m.metadata }), await this.client.proposal.delete(a, J("USER_DISCONNECTED")), await this.client.core.pairing.activate({ topic: f }), await this.setExpiry(N, ae(zt)), { topic: N, acknowledged: () => Promise.resolve(this.client.session.get(N)) };
    }), v(this, "reject", async (t) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      try {
        await this.isValidReject(t);
      } catch (o) {
        throw this.client.logger.error("reject() -> isValidReject() failed"), o;
      }
      const { id: s, reason: r } = t;
      let n;
      try {
        n = this.client.proposal.get(s).pairingTopic;
      } catch (o) {
        throw this.client.logger.error(`reject() -> proposal.get(${s}) failed`), o;
      }
      n && (await this.sendError({ id: s, topic: n, error: r, rpcOpts: le.wc_sessionPropose.reject }), await this.client.proposal.delete(s, J("USER_DISCONNECTED")));
    }), v(this, "update", async (t) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      try {
        await this.isValidUpdate(t);
      } catch (u) {
        throw this.client.logger.error("update() -> isValidUpdate() failed"), u;
      }
      const { topic: s, namespaces: r } = t, { done: n, resolve: o, reject: a } = Ot(), c = gt(), h = ii().toString(), l = this.client.session.get(s).namespaces;
      return this.events.once(W("session_update", c), ({ error: u }) => {
        u ? a(u) : o();
      }), await this.client.session.update(s, { namespaces: r }), await this.sendRequest({ topic: s, method: "wc_sessionUpdate", params: { namespaces: r }, throwOnFailedPublish: !0, clientRpcId: c, relayRpcId: h }).catch((u) => {
        this.client.logger.error(u), this.client.session.update(s, { namespaces: l }), a(u);
      }), { acknowledged: n };
    }), v(this, "extend", async (t) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      try {
        await this.isValidExtend(t);
      } catch (c) {
        throw this.client.logger.error("extend() -> isValidExtend() failed"), c;
      }
      const { topic: s } = t, r = gt(), { done: n, resolve: o, reject: a } = Ot();
      return this.events.once(W("session_extend", r), ({ error: c }) => {
        c ? a(c) : o();
      }), await this.setExpiry(s, ae(zt)), this.sendRequest({ topic: s, method: "wc_sessionExtend", params: {}, clientRpcId: r, throwOnFailedPublish: !0 }).catch((c) => {
        a(c);
      }), { acknowledged: n };
    }), v(this, "request", async (t) => {
      this.isInitialized();
      try {
        await this.isValidRequest(t);
      } catch (w) {
        throw this.client.logger.error("request() -> isValidRequest() failed"), w;
      }
      const { chainId: s, request: r, topic: n, expiry: o = le.wc_sessionRequest.req.ttl } = t, a = this.client.session.get(n);
      (a == null ? void 0 : a.transportType) === ee.relay && await this.confirmOnlineStateOrThrow();
      const c = gt(), h = ii().toString(), { done: l, resolve: u, reject: p } = Ot(o, "Request expired. Please try again.");
      this.events.once(W("session_request", c), ({ error: w, result: y }) => {
        w ? p(w) : u(y);
      });
      const d = "wc_sessionRequest", f = this.getAppLinkIfEnabled(a.peer.metadata, a.transportType);
      if (f) return await this.sendRequest({ clientRpcId: c, relayRpcId: h, topic: n, method: d, params: { request: Ee(Y({}, r), { expiryTimestamp: ae(o) }), chainId: s }, expiry: o, throwOnFailedPublish: !0, appLink: f }).catch((w) => p(w)), this.client.events.emit("session_request_sent", { topic: n, request: r, chainId: s, id: c }), await l();
      const m = { request: Ee(Y({}, r), { expiryTimestamp: ae(o) }), chainId: s }, g = this.shouldSetTVF(d, m);
      return await Promise.all([new Promise(async (w) => {
        await this.sendRequest(Y({ clientRpcId: c, relayRpcId: h, topic: n, method: d, params: m, expiry: o, throwOnFailedPublish: !0 }, g && { tvf: this.getTVFParams(c, m) })).catch((y) => p(y)), this.client.events.emit("session_request_sent", { topic: n, request: r, chainId: s, id: c }), w();
      }), new Promise(async (w) => {
        var y;
        if (!((y = a.sessionConfig) != null && y.disableDeepLink)) {
          const I = await Sc(this.client.core.storage, no);
          await Pc({ id: c, topic: n, wcDeepLink: I });
        }
        w();
      }), l()]).then((w) => w[2]);
    }), v(this, "respond", async (t) => {
      this.isInitialized(), await this.isValidRespond(t);
      const { topic: s, response: r } = t, { id: n } = r, o = this.client.session.get(s);
      o.transportType === ee.relay && await this.confirmOnlineStateOrThrow();
      const a = this.getAppLinkIfEnabled(o.peer.metadata, o.transportType);
      ct(r) ? await this.sendResult({ id: n, topic: s, result: r.result, throwOnFailedPublish: !0, appLink: a }) : et(r) && await this.sendError({ id: n, topic: s, error: r.error, appLink: a }), this.cleanupAfterResponse(t);
    }), v(this, "ping", async (t) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      try {
        await this.isValidPing(t);
      } catch (r) {
        throw this.client.logger.error("ping() -> isValidPing() failed"), r;
      }
      const { topic: s } = t;
      if (this.client.session.keys.includes(s)) {
        const r = gt(), n = ii().toString(), { done: o, resolve: a, reject: c } = Ot();
        this.events.once(W("session_ping", r), ({ error: h }) => {
          h ? c(h) : a();
        }), await Promise.all([this.sendRequest({ topic: s, method: "wc_sessionPing", params: {}, throwOnFailedPublish: !0, clientRpcId: r, relayRpcId: n }), o()]);
      } else this.client.core.pairing.pairings.keys.includes(s) && (this.client.logger.warn("ping() on pairing topic is deprecated and will be removed in the next major release."), await this.client.core.pairing.ping({ topic: s }));
    }), v(this, "emit", async (t) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow(), await this.isValidEmit(t);
      const { topic: s, event: r, chainId: n } = t, o = ii().toString(), a = gt();
      await this.sendRequest({ topic: s, method: "wc_sessionEvent", params: { event: r, chainId: n }, throwOnFailedPublish: !0, relayRpcId: o, clientRpcId: a });
    }), v(this, "disconnect", async (t) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow(), await this.isValidDisconnect(t);
      const { topic: s } = t;
      if (this.client.session.keys.includes(s)) await this.sendRequest({ topic: s, method: "wc_sessionDelete", params: J("USER_DISCONNECTED"), throwOnFailedPublish: !0 }), await this.deleteSession({ topic: s, emitEvent: !1 });
      else if (this.client.core.pairing.pairings.keys.includes(s)) await this.client.core.pairing.disconnect({ topic: s });
      else {
        const { message: r } = C("MISMATCHED_TOPIC", `Session or pairing topic not found: ${s}`);
        throw new Error(r);
      }
    }), v(this, "find", (t) => (this.isInitialized(), this.client.session.getAll().filter((s) => yu(s, t)))), v(this, "getPendingSessionRequests", () => this.client.pendingRequest.getAll()), v(this, "authenticate", async (t, s) => {
      var r;
      this.isInitialized(), this.isValidAuthenticate(t);
      const n = s && this.client.core.linkModeSupportedApps.includes(s) && ((r = this.client.metadata.redirect) == null ? void 0 : r.linkMode), o = n ? ee.link_mode : ee.relay;
      o === ee.relay && await this.confirmOnlineStateOrThrow();
      const { chains: a, statement: c = "", uri: h, domain: l, nonce: u, type: p, exp: d, nbf: f, methods: m = [], expiry: g } = t, w = [...t.resources || []], { topic: y, uri: I } = await this.client.core.pairing.create({ methods: ["wc_sessionAuthenticate"], transportType: o });
      this.client.logger.info({ message: "Generated new pairing", pairing: { topic: y, uri: I } });
      const A = await this.client.core.crypto.generateKeyPair(), N = rs(A);
      if (await Promise.all([this.client.auth.authKeys.set(os, { responseTopic: N, publicKey: A }), this.client.auth.pairingTopics.set(N, { topic: N, pairingTopic: y })]), await this.client.core.relayer.subscribe(N, { transportType: o }), this.client.logger.info(`sending request to new pairing topic: ${y}`), m.length > 0) {
        const { namespace: _ } = oi(a[0]);
        let F = wh(_, "request", m);
        ss(w) && (F = vh(F, w.pop())), w.push(F);
      }
      const P = g && g > le.wc_sessionAuthenticate.req.ttl ? g : le.wc_sessionAuthenticate.req.ttl, $ = { authPayload: { type: p ?? "caip122", chains: a, statement: c, aud: h, domain: l, version: "1", nonce: u, iat: (/* @__PURE__ */ new Date()).toISOString(), exp: d, nbf: f, resources: w }, requester: { publicKey: A, metadata: this.client.metadata }, expiryTimestamp: ae(P) }, R = { eip155: { chains: a, methods: [.../* @__PURE__ */ new Set(["personal_sign", ...m])], events: ["chainChanged", "accountsChanged"] } }, b = { requiredNamespaces: {}, optionalNamespaces: R, relays: [{ protocol: "irn" }], pairingTopic: y, proposer: { publicKey: A, metadata: this.client.metadata }, expiryTimestamp: ae(le.wc_sessionPropose.req.ttl), id: gt() }, { done: k, resolve: q, reject: j } = Ot(P, "Request expired"), U = gt(), E = W("session_connect", b.id), O = W("session_request", U), S = async ({ error: _, session: F }) => {
        this.events.off(O, T), _ ? j(_) : F && q({ session: F });
      }, T = async (_) => {
        var F, M, L;
        if (await this.deletePendingAuthRequest(U, { message: "fulfilled", code: 0 }), _.error) {
          const oe = J("WC_METHOD_UNSUPPORTED", "wc_sessionAuthenticate");
          return _.error.code === oe.code ? void 0 : (this.events.off(E, S), j(_.error.message));
        }
        await this.deleteProposal(b.id), this.events.off(E, S);
        const { cacaos: Z, responder: G } = _.result, ie = [], ce = [];
        for (const oe of Z) {
          await Xr({ cacao: oe, projectId: this.client.core.projectId }) || (this.client.logger.error(oe, "Signature verification failed"), j(J("SESSION_SETTLEMENT_FAILED", "Signature verification failed")));
          const { p: _t } = oe, rt = ss(_t.resources), Je = [Gs(_t.iss)], nt = cs(_t.iss);
          if (rt) {
            const ot = en(rt), Hi = tn(rt);
            ie.push(...ot), Je.push(...Hi);
          }
          for (const ot of Je) ce.push(`${ot}:${nt}`);
        }
        const be = await this.client.core.crypto.generateSharedKey(A, G.publicKey);
        let ne;
        ie.length > 0 && (ne = { topic: be, acknowledged: !0, self: { publicKey: A, metadata: this.client.metadata }, peer: G, controller: G.publicKey, expiry: ae(zt), requiredNamespaces: {}, optionalNamespaces: {}, relay: { protocol: "irn" }, pairingTopic: y, namespaces: On([...new Set(ie)], [...new Set(ce)]), transportType: o }, await this.client.core.relayer.subscribe(be, { transportType: o }), await this.client.session.set(be, ne), y && await this.client.core.pairing.updateMetadata({ topic: y, metadata: G.metadata }), ne = this.client.session.get(be)), (F = this.client.metadata.redirect) != null && F.linkMode && (M = G.metadata.redirect) != null && M.linkMode && (L = G.metadata.redirect) != null && L.universal && s && (this.client.core.addLinkModeSupportedApp(G.metadata.redirect.universal), this.client.session.update(be, { transportType: ee.link_mode })), q({ auths: Z, session: ne });
      };
      this.events.once(E, S), this.events.once(O, T);
      let D;
      try {
        if (n) {
          const _ = Rt("wc_sessionAuthenticate", $, U);
          this.client.core.history.set(y, _);
          const F = await this.client.core.crypto.encode("", _, { type: Vi, encoding: wt });
          D = Qi(s, y, F);
        } else await Promise.all([this.sendRequest({ topic: y, method: "wc_sessionAuthenticate", params: $, expiry: t.expiry, throwOnFailedPublish: !0, clientRpcId: U }), this.sendRequest({ topic: y, method: "wc_sessionPropose", params: b, expiry: le.wc_sessionPropose.req.ttl, throwOnFailedPublish: !0, clientRpcId: b.id })]);
      } catch (_) {
        throw this.events.off(E, S), this.events.off(O, T), _;
      }
      return await this.setProposal(b.id, b), await this.setAuthRequest(U, { request: Ee(Y({}, $), { verifyContext: {} }), pairingTopic: y, transportType: o }), { uri: D ?? I, response: k };
    }), v(this, "approveSessionAuthenticate", async (t) => {
      const { id: s, auths: r } = t, n = this.client.core.eventClient.createEvent({ properties: { topic: s.toString(), trace: [St.authenticated_session_approve_started] } });
      try {
        this.isInitialized();
      } catch (g) {
        throw n.setError(_i.no_internet_connection), g;
      }
      const o = this.getPendingAuthRequest(s);
      if (!o) throw n.setError(_i.authenticated_session_pending_request_not_found), new Error(`Could not find pending auth request with id ${s}`);
      const a = o.transportType || ee.relay;
      a === ee.relay && await this.confirmOnlineStateOrThrow();
      const c = o.requester.publicKey, h = await this.client.core.crypto.generateKeyPair(), l = rs(c), u = { type: dt, receiverPublicKey: c, senderPublicKey: h }, p = [], d = [];
      for (const g of r) {
        if (!await Xr({ cacao: g, projectId: this.client.core.projectId })) {
          n.setError(_i.invalid_cacao);
          const N = J("SESSION_SETTLEMENT_FAILED", "Signature verification failed");
          throw await this.sendError({ id: s, topic: l, error: N, encodeOpts: u }), new Error(N.message);
        }
        n.addTrace(St.cacaos_verified);
        const { p: w } = g, y = ss(w.resources), I = [Gs(w.iss)], A = cs(w.iss);
        if (y) {
          const N = en(y), P = tn(y);
          p.push(...N), I.push(...P);
        }
        for (const N of I) d.push(`${N}:${A}`);
      }
      const f = await this.client.core.crypto.generateSharedKey(h, c);
      n.addTrace(St.create_authenticated_session_topic);
      let m;
      if ((p == null ? void 0 : p.length) > 0) {
        m = { topic: f, acknowledged: !0, self: { publicKey: h, metadata: this.client.metadata }, peer: { publicKey: c, metadata: o.requester.metadata }, controller: c, expiry: ae(zt), authentication: r, requiredNamespaces: {}, optionalNamespaces: {}, relay: { protocol: "irn" }, pairingTopic: o.pairingTopic, namespaces: On([...new Set(p)], [...new Set(d)]), transportType: a }, n.addTrace(St.subscribing_authenticated_session_topic);
        try {
          await this.client.core.relayer.subscribe(f, { transportType: a });
        } catch (g) {
          throw n.setError(_i.subscribe_authenticated_session_topic_failure), g;
        }
        n.addTrace(St.subscribe_authenticated_session_topic_success), await this.client.session.set(f, m), n.addTrace(St.store_authenticated_session), await this.client.core.pairing.updateMetadata({ topic: o.pairingTopic, metadata: o.requester.metadata });
      }
      n.addTrace(St.publishing_authenticated_session_approve);
      try {
        await this.sendResult({ topic: l, id: s, result: { cacaos: r, responder: { publicKey: h, metadata: this.client.metadata } }, encodeOpts: u, throwOnFailedPublish: !0, appLink: this.getAppLinkIfEnabled(o.requester.metadata, a) });
      } catch (g) {
        throw n.setError(_i.authenticated_session_approve_publish_failure), g;
      }
      return await this.client.auth.requests.delete(s, { message: "fulfilled", code: 0 }), await this.client.core.pairing.activate({ topic: o.pairingTopic }), this.client.core.eventClient.deleteEvent({ eventId: n.eventId }), { session: m };
    }), v(this, "rejectSessionAuthenticate", async (t) => {
      this.isInitialized();
      const { id: s, reason: r } = t, n = this.getPendingAuthRequest(s);
      if (!n) throw new Error(`Could not find pending auth request with id ${s}`);
      n.transportType === ee.relay && await this.confirmOnlineStateOrThrow();
      const o = n.requester.publicKey, a = await this.client.core.crypto.generateKeyPair(), c = rs(o), h = { type: dt, receiverPublicKey: o, senderPublicKey: a };
      await this.sendError({ id: s, topic: c, error: r, encodeOpts: h, rpcOpts: le.wc_sessionAuthenticate.reject, appLink: this.getAppLinkIfEnabled(n.requester.metadata, n.transportType) }), await this.client.auth.requests.delete(s, { message: "rejected", code: 0 }), await this.client.proposal.delete(s, J("USER_DISCONNECTED"));
    }), v(this, "formatAuthMessage", (t) => {
      this.isInitialized();
      const { request: s, iss: r } = t;
      return Lo(s, r);
    }), v(this, "processRelayMessageCache", () => {
      setTimeout(async () => {
        if (this.relayMessageCache.length !== 0) for (; this.relayMessageCache.length > 0; ) try {
          const t = this.relayMessageCache.shift();
          t && await this.onRelayMessage(t);
        } catch (t) {
          this.client.logger.error(t);
        }
      }, 50);
    }), v(this, "cleanupDuplicatePairings", async (t) => {
      if (t.pairingTopic) try {
        const s = this.client.core.pairing.pairings.get(t.pairingTopic), r = this.client.core.pairing.pairings.getAll().filter((n) => {
          var o, a;
          return ((o = n.peerMetadata) == null ? void 0 : o.url) && ((a = n.peerMetadata) == null ? void 0 : a.url) === t.peer.metadata.url && n.topic && n.topic !== s.topic;
        });
        if (r.length === 0) return;
        this.client.logger.info(`Cleaning up ${r.length} duplicate pairing(s)`), await Promise.all(r.map((n) => this.client.core.pairing.disconnect({ topic: n.topic }))), this.client.logger.info("Duplicate pairings clean up finished");
      } catch (s) {
        this.client.logger.error(s);
      }
    }), v(this, "deleteSession", async (t) => {
      var s;
      const { topic: r, expirerHasDeleted: n = !1, emitEvent: o = !0, id: a = 0 } = t, { self: c } = this.client.session.get(r);
      await this.client.core.relayer.unsubscribe(r), await this.client.session.delete(r, J("USER_DISCONNECTED")), this.addToRecentlyDeleted(r, "session"), this.client.core.crypto.keychain.has(c.publicKey) && await this.client.core.crypto.deleteKeyPair(c.publicKey), this.client.core.crypto.keychain.has(r) && await this.client.core.crypto.deleteSymKey(r), n || this.client.core.expirer.del(r), this.client.core.storage.removeItem(no).catch((h) => this.client.logger.warn(h)), this.getPendingSessionRequests().forEach((h) => {
        h.topic === r && this.deletePendingSessionRequest(h.id, J("USER_DISCONNECTED"));
      }), r === ((s = this.sessionRequestQueue.queue[0]) == null ? void 0 : s.topic) && (this.sessionRequestQueue.state = Ze.idle), o && this.client.events.emit("session_delete", { id: a, topic: r });
    }), v(this, "deleteProposal", async (t, s) => {
      if (s) try {
        const r = this.client.proposal.get(t), n = this.client.core.eventClient.getEvent({ topic: r.pairingTopic });
        n == null || n.setError($t.proposal_expired);
      } catch {
      }
      await Promise.all([this.client.proposal.delete(t, J("USER_DISCONNECTED")), s ? Promise.resolve() : this.client.core.expirer.del(t)]), this.addToRecentlyDeleted(t, "proposal");
    }), v(this, "deletePendingSessionRequest", async (t, s, r = !1) => {
      await Promise.all([this.client.pendingRequest.delete(t, s), r ? Promise.resolve() : this.client.core.expirer.del(t)]), this.addToRecentlyDeleted(t, "request"), this.sessionRequestQueue.queue = this.sessionRequestQueue.queue.filter((n) => n.id !== t), r && (this.sessionRequestQueue.state = Ze.idle, this.client.events.emit("session_request_expire", { id: t }));
    }), v(this, "deletePendingAuthRequest", async (t, s, r = !1) => {
      await Promise.all([this.client.auth.requests.delete(t, s), r ? Promise.resolve() : this.client.core.expirer.del(t)]);
    }), v(this, "setExpiry", async (t, s) => {
      this.client.session.keys.includes(t) && (this.client.core.expirer.set(t, s), await this.client.session.update(t, { expiry: s }));
    }), v(this, "setProposal", async (t, s) => {
      this.client.core.expirer.set(t, ae(le.wc_sessionPropose.req.ttl)), await this.client.proposal.set(t, s);
    }), v(this, "setAuthRequest", async (t, s) => {
      const { request: r, pairingTopic: n, transportType: o = ee.relay } = s;
      this.client.core.expirer.set(t, r.expiryTimestamp), await this.client.auth.requests.set(t, { authPayload: r.authPayload, requester: r.requester, expiryTimestamp: r.expiryTimestamp, id: t, pairingTopic: n, verifyContext: r.verifyContext, transportType: o });
    }), v(this, "setPendingSessionRequest", async (t) => {
      const { id: s, topic: r, params: n, verifyContext: o } = t, a = n.request.expiryTimestamp || ae(le.wc_sessionRequest.req.ttl);
      this.client.core.expirer.set(s, a), await this.client.pendingRequest.set(s, { id: s, topic: r, params: n, verifyContext: o });
    }), v(this, "sendRequest", async (t) => {
      const { topic: s, method: r, params: n, expiry: o, relayRpcId: a, clientRpcId: c, throwOnFailedPublish: h, appLink: l, tvf: u } = t, p = Rt(r, n, c);
      let d;
      const f = !!l;
      try {
        const w = f ? wt : He;
        d = await this.client.core.crypto.encode(s, p, { encoding: w });
      } catch (w) {
        throw await this.cleanup(), this.client.logger.error(`sendRequest() -> core.crypto.encode() for topic ${s} failed`), w;
      }
      let m;
      if (Xf.includes(r)) {
        const w = tt(JSON.stringify(p)), y = tt(d);
        m = await this.client.core.verify.register({ id: y, decryptedId: w });
      }
      const g = le[r].req;
      if (g.attestation = m, o && (g.ttl = o), a && (g.id = a), this.client.core.history.set(s, p), f) {
        const w = Qi(l, s, d);
        await global.Linking.openURL(w, this.client.name);
      } else {
        const w = le[r].req;
        o && (w.ttl = o), a && (w.id = a), w.tvf = Ee(Y({}, u), { correlationId: p.id }), h ? (w.internal = Ee(Y({}, w.internal), { throwOnFailedPublish: !0 }), await this.client.core.relayer.publish(s, d, w)) : this.client.core.relayer.publish(s, d, w).catch((y) => this.client.logger.error(y));
      }
      return p.id;
    }), v(this, "sendResult", async (t) => {
      const { id: s, topic: r, result: n, throwOnFailedPublish: o, encodeOpts: a, appLink: c } = t, h = ds(s, n);
      let l;
      const u = c && typeof (global == null ? void 0 : global.Linking) < "u";
      try {
        const f = u ? wt : He;
        l = await this.client.core.crypto.encode(r, h, Ee(Y({}, a || {}), { encoding: f }));
      } catch (f) {
        throw await this.cleanup(), this.client.logger.error(`sendResult() -> core.crypto.encode() for topic ${r} failed`), f;
      }
      let p, d;
      try {
        p = await this.client.core.history.get(r, s);
        const f = p.request;
        try {
          this.shouldSetTVF(f.method, f.params) && (d = this.getTVFParams(s, f.params, n));
        } catch (m) {
          this.client.logger.warn("sendResult() -> getTVFParams() failed", m);
        }
      } catch (f) {
        throw this.client.logger.error(`sendResult() -> history.get(${r}, ${s}) failed`), f;
      }
      if (u) {
        const f = Qi(c, r, l);
        await global.Linking.openURL(f, this.client.name);
      } else {
        const f = p.request.method, m = le[f].res;
        m.tvf = Ee(Y({}, d), { correlationId: s }), o ? (m.internal = Ee(Y({}, m.internal), { throwOnFailedPublish: !0 }), await this.client.core.relayer.publish(r, l, m)) : this.client.core.relayer.publish(r, l, m).catch((g) => this.client.logger.error(g));
      }
      await this.client.core.history.resolve(h);
    }), v(this, "sendError", async (t) => {
      const { id: s, topic: r, error: n, encodeOpts: o, rpcOpts: a, appLink: c } = t, h = Oo(s, n);
      let l;
      const u = c && typeof (global == null ? void 0 : global.Linking) < "u";
      try {
        const d = u ? wt : He;
        l = await this.client.core.crypto.encode(r, h, Ee(Y({}, o || {}), { encoding: d }));
      } catch (d) {
        throw await this.cleanup(), this.client.logger.error(`sendError() -> core.crypto.encode() for topic ${r} failed`), d;
      }
      let p;
      try {
        p = await this.client.core.history.get(r, s);
      } catch (d) {
        throw this.client.logger.error(`sendError() -> history.get(${r}, ${s}) failed`), d;
      }
      if (u) {
        const d = Qi(c, r, l);
        await global.Linking.openURL(d, this.client.name);
      } else {
        const d = p.request.method, f = a || le[d].res;
        this.client.core.relayer.publish(r, l, f);
      }
      await this.client.core.history.resolve(h);
    }), v(this, "cleanup", async () => {
      const t = [], s = [];
      this.client.session.getAll().forEach((r) => {
        let n = !1;
        mt(r.expiry) && (n = !0), this.client.core.crypto.keychain.has(r.topic) || (n = !0), n && t.push(r.topic);
      }), this.client.proposal.getAll().forEach((r) => {
        mt(r.expiryTimestamp) && s.push(r.id);
      }), await Promise.all([...t.map((r) => this.deleteSession({ topic: r })), ...s.map((r) => this.deleteProposal(r))]);
    }), v(this, "onProviderMessageEvent", async (t) => {
      !this.initialized || this.relayMessageCache.length > 0 ? this.relayMessageCache.push(t) : await this.onRelayMessage(t);
    }), v(this, "onRelayEventRequest", async (t) => {
      this.requestQueue.queue.push(t), await this.processRequestsQueue();
    }), v(this, "processRequestsQueue", async () => {
      if (this.requestQueue.state === Ze.active) {
        this.client.logger.info("Request queue already active, skipping...");
        return;
      }
      for (this.client.logger.info(`Request queue starting with ${this.requestQueue.queue.length} requests`); this.requestQueue.queue.length > 0; ) {
        this.requestQueue.state = Ze.active;
        const t = this.requestQueue.queue.shift();
        if (t) try {
          await this.processRequest(t);
        } catch (s) {
          this.client.logger.warn(s);
        }
      }
      this.requestQueue.state = Ze.idle;
    }), v(this, "processRequest", async (t) => {
      const { topic: s, payload: r, attestation: n, transportType: o, encryptedId: a } = t, c = r.method;
      if (!this.shouldIgnorePairingRequest({ topic: s, requestMethod: c })) switch (c) {
        case "wc_sessionPropose":
          return await this.onSessionProposeRequest({ topic: s, payload: r, attestation: n, encryptedId: a });
        case "wc_sessionSettle":
          return await this.onSessionSettleRequest(s, r);
        case "wc_sessionUpdate":
          return await this.onSessionUpdateRequest(s, r);
        case "wc_sessionExtend":
          return await this.onSessionExtendRequest(s, r);
        case "wc_sessionPing":
          return await this.onSessionPingRequest(s, r);
        case "wc_sessionDelete":
          return await this.onSessionDeleteRequest(s, r);
        case "wc_sessionRequest":
          return await this.onSessionRequest({ topic: s, payload: r, attestation: n, encryptedId: a, transportType: o });
        case "wc_sessionEvent":
          return await this.onSessionEventRequest(s, r);
        case "wc_sessionAuthenticate":
          return await this.onSessionAuthenticateRequest({ topic: s, payload: r, attestation: n, encryptedId: a, transportType: o });
        default:
          return this.client.logger.info(`Unsupported request method ${c}`);
      }
    }), v(this, "onRelayEventResponse", async (t) => {
      const { topic: s, payload: r, transportType: n } = t, o = (await this.client.core.history.get(s, r.id)).request.method;
      switch (o) {
        case "wc_sessionPropose":
          return this.onSessionProposeResponse(s, r, n);
        case "wc_sessionSettle":
          return this.onSessionSettleResponse(s, r);
        case "wc_sessionUpdate":
          return this.onSessionUpdateResponse(s, r);
        case "wc_sessionExtend":
          return this.onSessionExtendResponse(s, r);
        case "wc_sessionPing":
          return this.onSessionPingResponse(s, r);
        case "wc_sessionRequest":
          return this.onSessionRequestResponse(s, r);
        case "wc_sessionAuthenticate":
          return this.onSessionAuthenticateResponse(s, r);
        default:
          return this.client.logger.info(`Unsupported response method ${o}`);
      }
    }), v(this, "onRelayEventUnknownPayload", (t) => {
      const { topic: s } = t, { message: r } = C("MISSING_OR_INVALID", `Decoded payload on topic ${s} is not identifiable as a JSON-RPC request or a response.`);
      throw new Error(r);
    }), v(this, "shouldIgnorePairingRequest", (t) => {
      const { topic: s, requestMethod: r } = t, n = this.expectedPairingMethodMap.get(s);
      return !n || n.includes(r) ? !1 : !!(n.includes("wc_sessionAuthenticate") && this.client.events.listenerCount("session_authenticate") > 0);
    }), v(this, "onSessionProposeRequest", async (t) => {
      const { topic: s, payload: r, attestation: n, encryptedId: o } = t, { params: a, id: c } = r;
      try {
        const h = this.client.core.eventClient.getEvent({ topic: s });
        this.client.events.listenerCount("session_proposal") === 0 && (console.warn("No listener for session_proposal event"), h == null || h.setError(ht.proposal_listener_not_found)), this.isValidConnect(Y({}, r.params));
        const l = a.expiryTimestamp || ae(le.wc_sessionPropose.req.ttl), u = Y({ id: c, pairingTopic: s, expiryTimestamp: l }, a);
        await this.setProposal(c, u);
        const p = await this.getVerifyContext({ attestationId: n, hash: tt(JSON.stringify(r)), encryptedId: o, metadata: u.proposer.metadata });
        h == null || h.addTrace(Xe.emit_session_proposal), this.client.events.emit("session_proposal", { id: c, params: u, verifyContext: p });
      } catch (h) {
        await this.sendError({ id: c, topic: s, error: h, rpcOpts: le.wc_sessionPropose.autoReject }), this.client.logger.error(h);
      }
    }), v(this, "onSessionProposeResponse", async (t, s, r) => {
      const { id: n } = s;
      if (ct(s)) {
        const { result: o } = s;
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", result: o });
        const a = this.client.proposal.get(n);
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", proposal: a });
        const c = a.proposer.publicKey;
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", selfPublicKey: c });
        const h = o.responderPublicKey;
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", peerPublicKey: h });
        const l = await this.client.core.crypto.generateSharedKey(c, h);
        this.pendingSessions.set(n, { sessionTopic: l, pairingTopic: t, proposalId: n, publicKey: c });
        const u = await this.client.core.relayer.subscribe(l, { transportType: r });
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", subscriptionId: u }), await this.client.core.pairing.activate({ topic: t });
      } else if (et(s)) {
        await this.client.proposal.delete(n, J("USER_DISCONNECTED"));
        const o = W("session_connect", n);
        if (this.events.listenerCount(o) === 0) throw new Error(`emitting ${o} without any listeners, 954`);
        this.events.emit(o, { error: s.error });
      }
    }), v(this, "onSessionSettleRequest", async (t, s) => {
      const { id: r, params: n } = s;
      try {
        this.isValidSessionSettleRequest(n);
        const { relay: o, controller: a, expiry: c, namespaces: h, sessionProperties: l, scopedProperties: u, sessionConfig: p } = s.params, d = [...this.pendingSessions.values()].find((g) => g.sessionTopic === t);
        if (!d) return this.client.logger.error(`Pending session not found for topic ${t}`);
        const f = this.client.proposal.get(d.proposalId), m = Ee(Y(Y(Y({ topic: t, relay: o, expiry: c, namespaces: h, acknowledged: !0, pairingTopic: d.pairingTopic, requiredNamespaces: f.requiredNamespaces, optionalNamespaces: f.optionalNamespaces, controller: a.publicKey, self: { publicKey: d.publicKey, metadata: this.client.metadata }, peer: { publicKey: a.publicKey, metadata: a.metadata } }, l && { sessionProperties: l }), u && { scopedProperties: u }), p && { sessionConfig: p }), { transportType: ee.relay });
        await this.client.session.set(m.topic, m), await this.setExpiry(m.topic, m.expiry), await this.client.core.pairing.updateMetadata({ topic: d.pairingTopic, metadata: m.peer.metadata }), this.client.events.emit("session_connect", { session: m }), this.events.emit(W("session_connect", d.proposalId), { session: m }), this.pendingSessions.delete(d.proposalId), this.deleteProposal(d.proposalId, !1), this.cleanupDuplicatePairings(m), await this.sendResult({ id: s.id, topic: t, result: !0, throwOnFailedPublish: !0 });
      } catch (o) {
        await this.sendError({ id: r, topic: t, error: o }), this.client.logger.error(o);
      }
    }), v(this, "onSessionSettleResponse", async (t, s) => {
      const { id: r } = s;
      ct(s) ? (await this.client.session.update(t, { acknowledged: !0 }), this.events.emit(W("session_approve", r), {})) : et(s) && (await this.client.session.delete(t, J("USER_DISCONNECTED")), this.events.emit(W("session_approve", r), { error: s.error }));
    }), v(this, "onSessionUpdateRequest", async (t, s) => {
      const { params: r, id: n } = s;
      try {
        const o = `${t}_session_update`, a = Ii.get(o);
        if (a && this.isRequestOutOfSync(a, n)) {
          this.client.logger.warn(`Discarding out of sync request - ${n}`), this.sendError({ id: n, topic: t, error: J("INVALID_UPDATE_REQUEST") });
          return;
        }
        this.isValidUpdate(Y({ topic: t }, r));
        try {
          Ii.set(o, n), await this.client.session.update(t, { namespaces: r.namespaces }), await this.sendResult({ id: n, topic: t, result: !0, throwOnFailedPublish: !0 });
        } catch (c) {
          throw Ii.delete(o), c;
        }
        this.client.events.emit("session_update", { id: n, topic: t, params: r });
      } catch (o) {
        await this.sendError({ id: n, topic: t, error: o }), this.client.logger.error(o);
      }
    }), v(this, "isRequestOutOfSync", (t, s) => s.toString().slice(0, -3) < t.toString().slice(0, -3)), v(this, "onSessionUpdateResponse", (t, s) => {
      const { id: r } = s, n = W("session_update", r);
      if (this.events.listenerCount(n) === 0) throw new Error(`emitting ${n} without any listeners`);
      ct(s) ? this.events.emit(W("session_update", r), {}) : et(s) && this.events.emit(W("session_update", r), { error: s.error });
    }), v(this, "onSessionExtendRequest", async (t, s) => {
      const { id: r } = s;
      try {
        this.isValidExtend({ topic: t }), await this.setExpiry(t, ae(zt)), await this.sendResult({ id: r, topic: t, result: !0, throwOnFailedPublish: !0 }), this.client.events.emit("session_extend", { id: r, topic: t });
      } catch (n) {
        await this.sendError({ id: r, topic: t, error: n }), this.client.logger.error(n);
      }
    }), v(this, "onSessionExtendResponse", (t, s) => {
      const { id: r } = s, n = W("session_extend", r);
      if (this.events.listenerCount(n) === 0) throw new Error(`emitting ${n} without any listeners`);
      ct(s) ? this.events.emit(W("session_extend", r), {}) : et(s) && this.events.emit(W("session_extend", r), { error: s.error });
    }), v(this, "onSessionPingRequest", async (t, s) => {
      const { id: r } = s;
      try {
        this.isValidPing({ topic: t }), await this.sendResult({ id: r, topic: t, result: !0, throwOnFailedPublish: !0 }), this.client.events.emit("session_ping", { id: r, topic: t });
      } catch (n) {
        await this.sendError({ id: r, topic: t, error: n }), this.client.logger.error(n);
      }
    }), v(this, "onSessionPingResponse", (t, s) => {
      const { id: r } = s, n = W("session_ping", r);
      setTimeout(() => {
        if (this.events.listenerCount(n) === 0) throw new Error(`emitting ${n} without any listeners 2176`);
        ct(s) ? this.events.emit(W("session_ping", r), {}) : et(s) && this.events.emit(W("session_ping", r), { error: s.error });
      }, 500);
    }), v(this, "onSessionDeleteRequest", async (t, s) => {
      const { id: r } = s;
      try {
        this.isValidDisconnect({ topic: t, reason: s.params }), Promise.all([new Promise((n) => {
          this.client.core.relayer.once(pe.publish, async () => {
            n(await this.deleteSession({ topic: t, id: r }));
          });
        }), this.sendResult({ id: r, topic: t, result: !0, throwOnFailedPublish: !0 }), this.cleanupPendingSentRequestsForTopic({ topic: t, error: J("USER_DISCONNECTED") })]).catch((n) => this.client.logger.error(n));
      } catch (n) {
        this.client.logger.error(n);
      }
    }), v(this, "onSessionRequest", async (t) => {
      var s, r, n;
      const { topic: o, payload: a, attestation: c, encryptedId: h, transportType: l } = t, { id: u, params: p } = a;
      try {
        await this.isValidRequest(Y({ topic: o }, p));
        const d = this.client.session.get(o), f = await this.getVerifyContext({ attestationId: c, hash: tt(JSON.stringify(Rt("wc_sessionRequest", p, u))), encryptedId: h, metadata: d.peer.metadata, transportType: l }), m = { id: u, topic: o, params: p, verifyContext: f };
        await this.setPendingSessionRequest(m), l === ee.link_mode && (s = d.peer.metadata.redirect) != null && s.universal && this.client.core.addLinkModeSupportedApp((r = d.peer.metadata.redirect) == null ? void 0 : r.universal), (n = this.client.signConfig) != null && n.disableRequestQueue ? this.emitSessionRequest(m) : (this.addSessionRequestToSessionRequestQueue(m), this.processSessionRequestQueue());
      } catch (d) {
        await this.sendError({ id: u, topic: o, error: d }), this.client.logger.error(d);
      }
    }), v(this, "onSessionRequestResponse", (t, s) => {
      const { id: r } = s, n = W("session_request", r);
      if (this.events.listenerCount(n) === 0) throw new Error(`emitting ${n} without any listeners`);
      ct(s) ? this.events.emit(W("session_request", r), { result: s.result }) : et(s) && this.events.emit(W("session_request", r), { error: s.error });
    }), v(this, "onSessionEventRequest", async (t, s) => {
      const { id: r, params: n } = s;
      try {
        const o = `${t}_session_event_${n.event.name}`, a = Ii.get(o);
        if (a && this.isRequestOutOfSync(a, r)) {
          this.client.logger.info(`Discarding out of sync request - ${r}`);
          return;
        }
        this.isValidEmit(Y({ topic: t }, n)), this.client.events.emit("session_event", { id: r, topic: t, params: n }), Ii.set(o, r);
      } catch (o) {
        await this.sendError({ id: r, topic: t, error: o }), this.client.logger.error(o);
      }
    }), v(this, "onSessionAuthenticateResponse", (t, s) => {
      const { id: r } = s;
      this.client.logger.trace({ type: "method", method: "onSessionAuthenticateResponse", topic: t, payload: s }), ct(s) ? this.events.emit(W("session_request", r), { result: s.result }) : et(s) && this.events.emit(W("session_request", r), { error: s.error });
    }), v(this, "onSessionAuthenticateRequest", async (t) => {
      var s;
      const { topic: r, payload: n, attestation: o, encryptedId: a, transportType: c } = t;
      try {
        const { requester: h, authPayload: l, expiryTimestamp: u } = n.params, p = await this.getVerifyContext({ attestationId: o, hash: tt(JSON.stringify(n)), encryptedId: a, metadata: h.metadata, transportType: c }), d = { requester: h, pairingTopic: r, id: n.id, authPayload: l, verifyContext: p, expiryTimestamp: u };
        await this.setAuthRequest(n.id, { request: d, pairingTopic: r, transportType: c }), c === ee.link_mode && (s = h.metadata.redirect) != null && s.universal && this.client.core.addLinkModeSupportedApp(h.metadata.redirect.universal), this.client.events.emit("session_authenticate", { topic: r, params: n.params, id: n.id, verifyContext: p });
      } catch (h) {
        this.client.logger.error(h);
        const l = n.params.requester.publicKey, u = await this.client.core.crypto.generateKeyPair(), p = this.getAppLinkIfEnabled(n.params.requester.metadata, c), d = { type: dt, receiverPublicKey: l, senderPublicKey: u };
        await this.sendError({ id: n.id, topic: r, error: h, encodeOpts: d, rpcOpts: le.wc_sessionAuthenticate.autoReject, appLink: p });
      }
    }), v(this, "addSessionRequestToSessionRequestQueue", (t) => {
      this.sessionRequestQueue.queue.push(t);
    }), v(this, "cleanupAfterResponse", (t) => {
      this.deletePendingSessionRequest(t.response.id, { message: "fulfilled", code: 0 }), setTimeout(() => {
        this.sessionRequestQueue.state = Ze.idle, this.processSessionRequestQueue();
      }, x.toMiliseconds(this.requestQueueDelay));
    }), v(this, "cleanupPendingSentRequestsForTopic", ({ topic: t, error: s }) => {
      const r = this.client.core.history.pending;
      r.length > 0 && r.filter((n) => n.topic === t && n.request.method === "wc_sessionRequest").forEach((n) => {
        const o = n.request.id, a = W("session_request", o);
        if (this.events.listenerCount(a) === 0) throw new Error(`emitting ${a} without any listeners`);
        this.events.emit(W("session_request", n.request.id), { error: s });
      });
    }), v(this, "processSessionRequestQueue", () => {
      if (this.sessionRequestQueue.state === Ze.active) {
        this.client.logger.info("session request queue is already active.");
        return;
      }
      const t = this.sessionRequestQueue.queue[0];
      if (!t) {
        this.client.logger.info("session request queue is empty.");
        return;
      }
      try {
        this.sessionRequestQueue.state = Ze.active, this.emitSessionRequest(t);
      } catch (s) {
        this.client.logger.error(s);
      }
    }), v(this, "emitSessionRequest", (t) => {
      this.client.events.emit("session_request", t);
    }), v(this, "onPairingCreated", (t) => {
      if (t.methods && this.expectedPairingMethodMap.set(t.topic, t.methods), t.active) return;
      const s = this.client.proposal.getAll().find((r) => r.pairingTopic === t.topic);
      s && this.onSessionProposeRequest({ topic: t.topic, payload: Rt("wc_sessionPropose", Ee(Y({}, s), { requiredNamespaces: s.requiredNamespaces, optionalNamespaces: s.optionalNamespaces, relays: s.relays, proposer: s.proposer, sessionProperties: s.sessionProperties, scopedProperties: s.scopedProperties }), s.id) });
    }), v(this, "isValidConnect", async (t) => {
      if (!$e(t)) {
        const { message: h } = C("MISSING_OR_INVALID", `connect() params: ${JSON.stringify(t)}`);
        throw new Error(h);
      }
      const { pairingTopic: s, requiredNamespaces: r, optionalNamespaces: n, sessionProperties: o, scopedProperties: a, relays: c } = t;
      if (me(s) || await this.isValidPairingTopic(s), !Au(c)) {
        const { message: h } = C("MISSING_OR_INVALID", `connect() relays: ${c}`);
        throw new Error(h);
      }
      if (!me(r) && Et(r) !== 0) {
        const h = "requiredNamespaces are deprecated and are automatically assigned to optionalNamespaces";
        ["fatal", "error", "silent"].includes(this.client.logger.level) ? console.warn(h) : this.client.logger.warn(h), this.validateNamespaces(r, "requiredNamespaces");
      }
      if (!me(n) && Et(n) !== 0 && this.validateNamespaces(n, "optionalNamespaces"), me(o) || this.validateSessionProps(o, "sessionProperties"), !me(a)) {
        this.validateSessionProps(a, "scopedProperties");
        const h = Object.keys(r || {}).concat(Object.keys(n || {}));
        if (!Object.keys(a).every((l) => h.includes(l))) throw new Error(`Scoped properties must be a subset of required/optional namespaces, received: ${JSON.stringify(a)}, required/optional namespaces: ${JSON.stringify(h)}`);
      }
    }), v(this, "validateNamespaces", (t, s) => {
      const r = Ou(t, "connect()", s);
      if (r) throw new Error(r.message);
    }), v(this, "isValidApprove", async (t) => {
      if (!$e(t)) throw new Error(C("MISSING_OR_INVALID", `approve() params: ${t}`).message);
      const { id: s, namespaces: r, relayProtocol: n, sessionProperties: o, scopedProperties: a } = t;
      this.checkRecentlyDeleted(s), await this.isValidProposalId(s);
      const c = this.client.proposal.get(s), h = Rs(r, "approve()");
      if (h) throw new Error(h.message);
      const l = xn(c.requiredNamespaces, r, "approve()");
      if (l) throw new Error(l.message);
      if (!re(n, !0)) {
        const { message: u } = C("MISSING_OR_INVALID", `approve() relayProtocol: ${n}`);
        throw new Error(u);
      }
      if (me(o) || this.validateSessionProps(o, "sessionProperties"), !me(a)) {
        this.validateSessionProps(a, "scopedProperties");
        const u = new Set(Object.keys(r));
        if (!Object.keys(a).every((p) => u.has(p))) throw new Error(`Scoped properties must be a subset of approved namespaces, received: ${JSON.stringify(a)}, approved namespaces: ${Array.from(u).join(", ")}`);
      }
    }), v(this, "isValidReject", async (t) => {
      if (!$e(t)) {
        const { message: n } = C("MISSING_OR_INVALID", `reject() params: ${t}`);
        throw new Error(n);
      }
      const { id: s, reason: r } = t;
      if (this.checkRecentlyDeleted(s), await this.isValidProposalId(s), !xu(r)) {
        const { message: n } = C("MISSING_OR_INVALID", `reject() reason: ${JSON.stringify(r)}`);
        throw new Error(n);
      }
    }), v(this, "isValidSessionSettleRequest", (t) => {
      if (!$e(t)) {
        const { message: h } = C("MISSING_OR_INVALID", `onSessionSettleRequest() params: ${t}`);
        throw new Error(h);
      }
      const { relay: s, controller: r, namespaces: n, expiry: o } = t;
      if (!da(s)) {
        const { message: h } = C("MISSING_OR_INVALID", "onSessionSettleRequest() relay protocol should be a string");
        throw new Error(h);
      }
      const a = Eu(r, "onSessionSettleRequest()");
      if (a) throw new Error(a.message);
      const c = Rs(n, "onSessionSettleRequest()");
      if (c) throw new Error(c.message);
      if (mt(o)) {
        const { message: h } = C("EXPIRED", "onSessionSettleRequest()");
        throw new Error(h);
      }
    }), v(this, "isValidUpdate", async (t) => {
      if (!$e(t)) {
        const { message: c } = C("MISSING_OR_INVALID", `update() params: ${t}`);
        throw new Error(c);
      }
      const { topic: s, namespaces: r } = t;
      this.checkRecentlyDeleted(s), await this.isValidSessionTopic(s);
      const n = this.client.session.get(s), o = Rs(r, "update()");
      if (o) throw new Error(o.message);
      const a = xn(n.requiredNamespaces, r, "update()");
      if (a) throw new Error(a.message);
    }), v(this, "isValidExtend", async (t) => {
      if (!$e(t)) {
        const { message: r } = C("MISSING_OR_INVALID", `extend() params: ${t}`);
        throw new Error(r);
      }
      const { topic: s } = t;
      this.checkRecentlyDeleted(s), await this.isValidSessionTopic(s);
    }), v(this, "isValidRequest", async (t) => {
      if (!$e(t)) {
        const { message: c } = C("MISSING_OR_INVALID", `request() params: ${t}`);
        throw new Error(c);
      }
      const { topic: s, request: r, chainId: n, expiry: o } = t;
      this.checkRecentlyDeleted(s), await this.isValidSessionTopic(s);
      const { namespaces: a } = this.client.session.get(s);
      if (!Cn(a, n)) {
        const { message: c } = C("MISSING_OR_INVALID", `request() chainId: ${n}`);
        throw new Error(c);
      }
      if (!Nu(r)) {
        const { message: c } = C("MISSING_OR_INVALID", `request() ${JSON.stringify(r)}`);
        throw new Error(c);
      }
      if (!qu(a, n, r.method)) {
        const { message: c } = C("MISSING_OR_INVALID", `request() method: ${r.method}`);
        throw new Error(c);
      }
      if (o && !Fu(o, Us)) {
        const { message: c } = C("MISSING_OR_INVALID", `request() expiry: ${o}. Expiry must be a number (in seconds) between ${Us.min} and ${Us.max}`);
        throw new Error(c);
      }
    }), v(this, "isValidRespond", async (t) => {
      var s;
      if (!$e(t)) {
        const { message: o } = C("MISSING_OR_INVALID", `respond() params: ${t}`);
        throw new Error(o);
      }
      const { topic: r, response: n } = t;
      try {
        await this.isValidSessionTopic(r);
      } catch (o) {
        throw (s = t == null ? void 0 : t.response) != null && s.id && this.cleanupAfterResponse(t), o;
      }
      if (!Ru(n)) {
        const { message: o } = C("MISSING_OR_INVALID", `respond() response: ${JSON.stringify(n)}`);
        throw new Error(o);
      }
    }), v(this, "isValidPing", async (t) => {
      if (!$e(t)) {
        const { message: r } = C("MISSING_OR_INVALID", `ping() params: ${t}`);
        throw new Error(r);
      }
      const { topic: s } = t;
      await this.isValidSessionOrPairingTopic(s);
    }), v(this, "isValidEmit", async (t) => {
      if (!$e(t)) {
        const { message: a } = C("MISSING_OR_INVALID", `emit() params: ${t}`);
        throw new Error(a);
      }
      const { topic: s, event: r, chainId: n } = t;
      await this.isValidSessionTopic(s);
      const { namespaces: o } = this.client.session.get(s);
      if (!Cn(o, n)) {
        const { message: a } = C("MISSING_OR_INVALID", `emit() chainId: ${n}`);
        throw new Error(a);
      }
      if (!Tu(r)) {
        const { message: a } = C("MISSING_OR_INVALID", `emit() event: ${JSON.stringify(r)}`);
        throw new Error(a);
      }
      if (!Du(o, n, r.name)) {
        const { message: a } = C("MISSING_OR_INVALID", `emit() event: ${JSON.stringify(r)}`);
        throw new Error(a);
      }
    }), v(this, "isValidDisconnect", async (t) => {
      if (!$e(t)) {
        const { message: r } = C("MISSING_OR_INVALID", `disconnect() params: ${t}`);
        throw new Error(r);
      }
      const { topic: s } = t;
      await this.isValidSessionOrPairingTopic(s);
    }), v(this, "isValidAuthenticate", (t) => {
      const { chains: s, uri: r, domain: n, nonce: o } = t;
      if (!Array.isArray(s) || s.length === 0) throw new Error("chains is required and must be a non-empty array");
      if (!re(r, !1)) throw new Error("uri is required parameter");
      if (!re(n, !1)) throw new Error("domain is required parameter");
      if (!re(o, !1)) throw new Error("nonce is required parameter");
      if ([...new Set(s.map((c) => oi(c).namespace))].length > 1) throw new Error("Multi-namespace requests are not supported. Please request single namespace only.");
      const { namespace: a } = oi(s[0]);
      if (a !== "eip155") throw new Error("Only eip155 namespace is supported for authenticated sessions. Please use .connect() for non-eip155 chains.");
    }), v(this, "getVerifyContext", async (t) => {
      const { attestationId: s, hash: r, encryptedId: n, metadata: o, transportType: a } = t, c = { verified: { verifyUrl: o.verifyUrl || Ri, validation: "UNKNOWN", origin: o.url || "" } };
      try {
        if (a === ee.link_mode) {
          const l = this.getAppLinkIfEnabled(o, a);
          return c.verified.validation = l && new URL(l).origin === new URL(o.url).origin ? "VALID" : "INVALID", c;
        }
        const h = await this.client.core.verify.resolve({ attestationId: s, hash: r, encryptedId: n, verifyUrl: o.verifyUrl });
        h && (c.verified.origin = h.origin, c.verified.isScam = h.isScam, c.verified.validation = h.origin === new URL(o.url).origin ? "VALID" : "INVALID");
      } catch (h) {
        this.client.logger.warn(h);
      }
      return this.client.logger.debug(`Verify context: ${JSON.stringify(c)}`), c;
    }), v(this, "validateSessionProps", (t, s) => {
      Object.values(t).forEach((r, n) => {
        if (r == null) {
          const { message: o } = C("MISSING_OR_INVALID", `${s} must contain an existing value for each key. Received: ${r} for key ${Object.keys(t)[n]}`);
          throw new Error(o);
        }
      });
    }), v(this, "getPendingAuthRequest", (t) => {
      const s = this.client.auth.requests.get(t);
      return typeof s == "object" ? s : void 0;
    }), v(this, "addToRecentlyDeleted", (t, s) => {
      if (this.recentlyDeletedMap.set(t, s), this.recentlyDeletedMap.size >= this.recentlyDeletedLimit) {
        let r = 0;
        const n = this.recentlyDeletedLimit / 2;
        for (const o of this.recentlyDeletedMap.keys()) {
          if (r++ >= n) break;
          this.recentlyDeletedMap.delete(o);
        }
      }
    }), v(this, "checkRecentlyDeleted", (t) => {
      const s = this.recentlyDeletedMap.get(t);
      if (s) {
        const { message: r } = C("MISSING_OR_INVALID", `Record was recently deleted - ${s}: ${t}`);
        throw new Error(r);
      }
    }), v(this, "isLinkModeEnabled", (t, s) => {
      var r, n, o, a, c, h, l, u, p;
      return !t || s !== ee.link_mode ? !1 : ((n = (r = this.client.metadata) == null ? void 0 : r.redirect) == null ? void 0 : n.linkMode) === !0 && ((a = (o = this.client.metadata) == null ? void 0 : o.redirect) == null ? void 0 : a.universal) !== void 0 && ((h = (c = this.client.metadata) == null ? void 0 : c.redirect) == null ? void 0 : h.universal) !== "" && ((l = t == null ? void 0 : t.redirect) == null ? void 0 : l.universal) !== void 0 && ((u = t == null ? void 0 : t.redirect) == null ? void 0 : u.universal) !== "" && ((p = t == null ? void 0 : t.redirect) == null ? void 0 : p.linkMode) === !0 && this.client.core.linkModeSupportedApps.includes(t.redirect.universal) && typeof (global == null ? void 0 : global.Linking) < "u";
    }), v(this, "getAppLinkIfEnabled", (t, s) => {
      var r;
      return this.isLinkModeEnabled(t, s) ? (r = t == null ? void 0 : t.redirect) == null ? void 0 : r.universal : void 0;
    }), v(this, "handleLinkModeMessage", ({ url: t }) => {
      if (!t || !t.includes("wc_ev") || !t.includes("topic")) return;
      const s = Vr(t, "topic") || "", r = decodeURIComponent(Vr(t, "wc_ev") || ""), n = this.client.session.keys.includes(s);
      n && this.client.session.update(s, { transportType: ee.link_mode }), this.client.core.dispatchEnvelope({ topic: s, message: r, sessionExists: n });
    }), v(this, "registerLinkModeListeners", async () => {
      var t;
      if ($r() || Pt() && (t = this.client.metadata.redirect) != null && t.linkMode) {
        const s = global == null ? void 0 : global.Linking;
        if (typeof s < "u") {
          s.addEventListener("url", this.handleLinkModeMessage, this.client.name);
          const r = await s.getInitialURL();
          r && setTimeout(() => {
            this.handleLinkModeMessage({ url: r });
          }, 50);
        }
      }
    }), v(this, "shouldSetTVF", (t, s) => {
      if (!s || t !== "wc_sessionRequest") return !1;
      const { request: r } = s;
      return Object.keys(ao).includes(r.method);
    }), v(this, "getTVFParams", (t, s, r) => {
      var n, o;
      try {
        const a = s.request.method, c = this.extractTxHashesFromResult(a, r);
        return Ee(Y({ correlationId: t, rpcMethods: [a], chainId: s.chainId }, this.isValidContractData(s.request.params) && { contractAddresses: [(o = (n = s.request.params) == null ? void 0 : n[0]) == null ? void 0 : o.to] }), { txHashes: c });
      } catch (a) {
        this.client.logger.warn("Error getting TVF params", a);
      }
      return {};
    }), v(this, "isValidContractData", (t) => {
      var s;
      if (!t) return !1;
      try {
        const r = (t == null ? void 0 : t.data) || ((s = t == null ? void 0 : t[0]) == null ? void 0 : s.data);
        if (!r.startsWith("0x")) return !1;
        const n = r.slice(2);
        return /^[0-9a-fA-F]*$/.test(n) ? n.length % 2 === 0 : !1;
      } catch {
      }
      return !1;
    }), v(this, "extractTxHashesFromResult", (t, s) => {
      try {
        const r = ao[t];
        if (typeof s == "string") return [s];
        const n = s[r.key];
        if (Ge(n)) return t === "solana_signAllTransactions" ? n.map((o) => rh(o)) : n;
        if (typeof n == "string") return [n];
      } catch (r) {
        this.client.logger.warn("Error extracting tx hashes from result", r);
      }
      return [];
    });
  }
  async processPendingMessageEvents() {
    try {
      const e = this.client.session.keys, t = this.client.core.relayer.messages.getWithoutAck(e);
      for (const [s, r] of Object.entries(t)) for (const n of r) try {
        await this.onProviderMessageEvent({ topic: s, message: n, publishedAt: Date.now() });
      } catch {
        this.client.logger.warn(`Error processing pending message event for topic: ${s}, message: ${n}`);
      }
    } catch (e) {
      this.client.logger.warn("processPendingMessageEvents failed", e);
    }
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = C("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
  async confirmOnlineStateOrThrow() {
    await this.client.core.relayer.confirmOnlineStateOrThrow();
  }
  registerRelayerEvents() {
    this.client.core.relayer.on(pe.message, (e) => {
      this.onProviderMessageEvent(e);
    });
  }
  async onRelayMessage(e) {
    const { topic: t, message: s, attestation: r, transportType: n } = e, { publicKey: o } = this.client.auth.authKeys.keys.includes(os) ? this.client.auth.authKeys.get(os) : { publicKey: void 0 };
    try {
      const a = await this.client.core.crypto.decode(t, s, { receiverPublicKey: o, encoding: n === ee.link_mode ? wt : He });
      Ir(a) ? (this.client.core.history.set(t, a), await this.onRelayEventRequest({ topic: t, payload: a, attestation: r, transportType: n, encryptedId: tt(s) })) : Pr(a) ? (await this.client.core.history.resolve(a), await this.onRelayEventResponse({ topic: t, payload: a, transportType: n }), this.client.core.history.delete(t, a.id)) : await this.onRelayEventUnknownPayload({ topic: t, payload: a, transportType: n }), await this.client.core.relayer.messages.ack(t, s);
    } catch (a) {
      this.client.logger.error(a);
    }
  }
  registerExpirerEvents() {
    this.client.core.expirer.on(Fe.expired, async (e) => {
      const { topic: t, id: s } = Ro(e.target);
      if (s && this.client.pendingRequest.keys.includes(s)) return await this.deletePendingSessionRequest(s, C("EXPIRED"), !0);
      if (s && this.client.auth.requests.keys.includes(s)) return await this.deletePendingAuthRequest(s, C("EXPIRED"), !0);
      t ? this.client.session.keys.includes(t) && (await this.deleteSession({ topic: t, expirerHasDeleted: !0 }), this.client.events.emit("session_expire", { topic: t })) : s && (await this.deleteProposal(s, !0), this.client.events.emit("proposal_expire", { id: s }));
    });
  }
  registerPairingEvents() {
    this.client.core.pairing.events.on(xt.create, (e) => this.onPairingCreated(e)), this.client.core.pairing.events.on(xt.delete, (e) => {
      this.addToRecentlyDeleted(e.topic, "pairing");
    });
  }
  isValidPairingTopic(e) {
    if (!re(e, !1)) {
      const { message: t } = C("MISSING_OR_INVALID", `pairing topic should be a string: ${e}`);
      throw new Error(t);
    }
    if (!this.client.core.pairing.pairings.keys.includes(e)) {
      const { message: t } = C("NO_MATCHING_KEY", `pairing topic doesn't exist: ${e}`);
      throw new Error(t);
    }
    if (mt(this.client.core.pairing.pairings.get(e).expiry)) {
      const { message: t } = C("EXPIRED", `pairing topic: ${e}`);
      throw new Error(t);
    }
  }
  async isValidSessionTopic(e) {
    if (!re(e, !1)) {
      const { message: t } = C("MISSING_OR_INVALID", `session topic should be a string: ${e}`);
      throw new Error(t);
    }
    if (this.checkRecentlyDeleted(e), !this.client.session.keys.includes(e)) {
      const { message: t } = C("NO_MATCHING_KEY", `session topic doesn't exist: ${e}`);
      throw new Error(t);
    }
    if (mt(this.client.session.get(e).expiry)) {
      await this.deleteSession({ topic: e });
      const { message: t } = C("EXPIRED", `session topic: ${e}`);
      throw new Error(t);
    }
    if (!this.client.core.crypto.keychain.has(e)) {
      const { message: t } = C("MISSING_OR_INVALID", `session topic does not exist in keychain: ${e}`);
      throw await this.deleteSession({ topic: e }), new Error(t);
    }
  }
  async isValidSessionOrPairingTopic(e) {
    if (this.checkRecentlyDeleted(e), this.client.session.keys.includes(e)) await this.isValidSessionTopic(e);
    else if (this.client.core.pairing.pairings.keys.includes(e)) this.isValidPairingTopic(e);
    else if (re(e, !1)) {
      const { message: t } = C("NO_MATCHING_KEY", `session or pairing topic doesn't exist: ${e}`);
      throw new Error(t);
    } else {
      const { message: t } = C("MISSING_OR_INVALID", `session or pairing topic should be a string: ${e}`);
      throw new Error(t);
    }
  }
  async isValidProposalId(e) {
    if (!Cu(e)) {
      const { message: t } = C("MISSING_OR_INVALID", `proposal id should be a number: ${e}`);
      throw new Error(t);
    }
    if (!this.client.proposal.keys.includes(e)) {
      const { message: t } = C("NO_MATCHING_KEY", `proposal id doesn't exist: ${e}`);
      throw new Error(t);
    }
    if (mt(this.client.proposal.get(e).expiryTimestamp)) {
      await this.deleteProposal(e);
      const { message: t } = C("EXPIRED", `proposal id: ${e}`);
      throw new Error(t);
    }
  }
}
class uy extends Ft {
  constructor(e, t) {
    super(e, t, Jf, Tr), this.core = e, this.logger = t;
  }
}
let py = class extends Ft {
  constructor(e, t) {
    super(e, t, Qf, Tr), this.core = e, this.logger = t;
  }
};
class dy extends Ft {
  constructor(e, t) {
    super(e, t, Zf, Tr, (s) => s.id), this.core = e, this.logger = t;
  }
}
class gy extends Ft {
  constructor(e, t) {
    super(e, t, iy, Es, () => os), this.core = e, this.logger = t;
  }
}
class fy extends Ft {
  constructor(e, t) {
    super(e, t, sy, Es), this.core = e, this.logger = t;
  }
}
class yy extends Ft {
  constructor(e, t) {
    super(e, t, ry, Es, (s) => s.id), this.core = e, this.logger = t;
  }
}
var my = Object.defineProperty, wy = (i, e, t) => e in i ? my(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t, Ms = (i, e, t) => wy(i, typeof e != "symbol" ? e + "" : e, t);
class by {
  constructor(e, t) {
    this.core = e, this.logger = t, Ms(this, "authKeys"), Ms(this, "pairingTopics"), Ms(this, "requests"), this.authKeys = new gy(this.core, this.logger), this.pairingTopics = new fy(this.core, this.logger), this.requests = new yy(this.core, this.logger);
  }
  async init() {
    await this.authKeys.init(), await this.pairingTopics.init(), await this.requests.init();
  }
}
var vy = Object.defineProperty, Ey = (i, e, t) => e in i ? vy(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t, z = (i, e, t) => Ey(i, typeof e != "symbol" ? e + "" : e, t);
let Iy = class Ta extends lp {
  constructor(e) {
    super(e), z(this, "protocol", xa), z(this, "version", Na), z(this, "name", Fs.name), z(this, "metadata"), z(this, "core"), z(this, "logger"), z(this, "events", new It.EventEmitter()), z(this, "engine"), z(this, "session"), z(this, "proposal"), z(this, "pendingRequest"), z(this, "auth"), z(this, "signConfig"), z(this, "on", (s, r) => this.events.on(s, r)), z(this, "once", (s, r) => this.events.once(s, r)), z(this, "off", (s, r) => this.events.off(s, r)), z(this, "removeListener", (s, r) => this.events.removeListener(s, r)), z(this, "removeAllListeners", (s) => this.events.removeAllListeners(s)), z(this, "connect", async (s) => {
      try {
        return await this.engine.connect(s);
      } catch (r) {
        throw this.logger.error(r.message), r;
      }
    }), z(this, "pair", async (s) => {
      try {
        return await this.engine.pair(s);
      } catch (r) {
        throw this.logger.error(r.message), r;
      }
    }), z(this, "approve", async (s) => {
      try {
        return await this.engine.approve(s);
      } catch (r) {
        throw this.logger.error(r.message), r;
      }
    }), z(this, "reject", async (s) => {
      try {
        return await this.engine.reject(s);
      } catch (r) {
        throw this.logger.error(r.message), r;
      }
    }), z(this, "update", async (s) => {
      try {
        return await this.engine.update(s);
      } catch (r) {
        throw this.logger.error(r.message), r;
      }
    }), z(this, "extend", async (s) => {
      try {
        return await this.engine.extend(s);
      } catch (r) {
        throw this.logger.error(r.message), r;
      }
    }), z(this, "request", async (s) => {
      try {
        return await this.engine.request(s);
      } catch (r) {
        throw this.logger.error(r.message), r;
      }
    }), z(this, "respond", async (s) => {
      try {
        return await this.engine.respond(s);
      } catch (r) {
        throw this.logger.error(r.message), r;
      }
    }), z(this, "ping", async (s) => {
      try {
        return await this.engine.ping(s);
      } catch (r) {
        throw this.logger.error(r.message), r;
      }
    }), z(this, "emit", async (s) => {
      try {
        return await this.engine.emit(s);
      } catch (r) {
        throw this.logger.error(r.message), r;
      }
    }), z(this, "disconnect", async (s) => {
      try {
        return await this.engine.disconnect(s);
      } catch (r) {
        throw this.logger.error(r.message), r;
      }
    }), z(this, "find", (s) => {
      try {
        return this.engine.find(s);
      } catch (r) {
        throw this.logger.error(r.message), r;
      }
    }), z(this, "getPendingSessionRequests", () => {
      try {
        return this.engine.getPendingSessionRequests();
      } catch (s) {
        throw this.logger.error(s.message), s;
      }
    }), z(this, "authenticate", async (s, r) => {
      try {
        return await this.engine.authenticate(s, r);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    }), z(this, "formatAuthMessage", (s) => {
      try {
        return this.engine.formatAuthMessage(s);
      } catch (r) {
        throw this.logger.error(r.message), r;
      }
    }), z(this, "approveSessionAuthenticate", async (s) => {
      try {
        return await this.engine.approveSessionAuthenticate(s);
      } catch (r) {
        throw this.logger.error(r.message), r;
      }
    }), z(this, "rejectSessionAuthenticate", async (s) => {
      try {
        return await this.engine.rejectSessionAuthenticate(s);
      } catch (r) {
        throw this.logger.error(r.message), r;
      }
    }), this.name = (e == null ? void 0 : e.name) || Fs.name, this.metadata = mc(e == null ? void 0 : e.metadata), this.signConfig = e == null ? void 0 : e.signConfig;
    const t = typeof (e == null ? void 0 : e.logger) < "u" && typeof (e == null ? void 0 : e.logger) != "string" ? e.logger : Er(ps({ level: (e == null ? void 0 : e.logger) || Fs.logger }));
    this.core = (e == null ? void 0 : e.core) || new Wf(e), this.logger = Pe(t, this.name), this.session = new py(this.core, this.logger), this.proposal = new uy(this.core, this.logger), this.pendingRequest = new dy(this.core, this.logger), this.engine = new ly(this), this.auth = new by(this.core, this.logger);
  }
  static async init(e) {
    const t = new Ta(e);
    return await t.initialize(), t;
  }
  get context() {
    return De(this.logger);
  }
  get pairing() {
    return this.core.pairing.pairings;
  }
  async initialize() {
    this.logger.trace("Initialized");
    try {
      await this.core.start(), await this.session.init(), await this.proposal.init(), await this.pendingRequest.init(), await this.auth.init(), await this.engine.init(), this.logger.info("SignClient Initialization Success"), setTimeout(() => {
        this.engine.processRelayMessageCache();
      }, x.toMiliseconds(x.ONE_SECOND));
    } catch (e) {
      throw this.logger.info("SignClient Initialization Failure"), this.logger.error(e.message), e;
    }
  }
};
const ho = "error", Py = "wss://relay.walletconnect.org", _y = "wc", $y = "universal_provider", Zi = `${_y}@2:${$y}:`, qa = "https://rpc.walletconnect.org/v1/", ti = "generic", Sy = `${qa}bundler`, Le = { DEFAULT_CHAIN_CHANGED: "default_chain_changed" };
function Oy() {
}
function qr(i) {
  return i == null || typeof i != "object" && typeof i != "function";
}
function Dr(i) {
  return ArrayBuffer.isView(i) && !(i instanceof DataView);
}
function Ay(i) {
  if (qr(i)) return i;
  if (Array.isArray(i) || Dr(i) || i instanceof ArrayBuffer || typeof SharedArrayBuffer < "u" && i instanceof SharedArrayBuffer) return i.slice(0);
  const e = Object.getPrototypeOf(i), t = e.constructor;
  if (i instanceof Date || i instanceof Map || i instanceof Set) return new t(i);
  if (i instanceof RegExp) {
    const s = new t(i);
    return s.lastIndex = i.lastIndex, s;
  }
  if (i instanceof DataView) return new t(i.buffer.slice(0));
  if (i instanceof Error) {
    const s = new t(i.message);
    return s.stack = i.stack, s.name = i.name, s.cause = i.cause, s;
  }
  if (typeof File < "u" && i instanceof File) return new t([i], i.name, { type: i.type, lastModified: i.lastModified });
  if (typeof i == "object") {
    const s = Object.create(e);
    return Object.assign(s, i);
  }
  return i;
}
function lo(i) {
  return typeof i == "object" && i !== null;
}
function Da(i) {
  return Object.getOwnPropertySymbols(i).filter((e) => Object.prototype.propertyIsEnumerable.call(i, e));
}
function ja(i) {
  return i == null ? i === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(i);
}
const Cy = "[object RegExp]", ka = "[object String]", Fa = "[object Number]", Ua = "[object Boolean]", Ma = "[object Arguments]", xy = "[object Symbol]", Ny = "[object Date]", Ry = "[object Map]", Ty = "[object Set]", qy = "[object Array]", Dy = "[object ArrayBuffer]", jy = "[object Object]", ky = "[object DataView]", Fy = "[object Uint8Array]", Uy = "[object Uint8ClampedArray]", My = "[object Uint16Array]", Ly = "[object Uint32Array]", By = "[object Int8Array]", zy = "[object Int16Array]", Vy = "[object Int32Array]", Ky = "[object Float32Array]", Hy = "[object Float64Array]";
function Gy(i, e) {
  return ni(i, void 0, i, /* @__PURE__ */ new Map(), e);
}
function ni(i, e, t, s = /* @__PURE__ */ new Map(), r = void 0) {
  const n = r == null ? void 0 : r(i, e, t, s);
  if (n != null) return n;
  if (qr(i)) return i;
  if (s.has(i)) return s.get(i);
  if (Array.isArray(i)) {
    const o = new Array(i.length);
    s.set(i, o);
    for (let a = 0; a < i.length; a++) o[a] = ni(i[a], a, t, s, r);
    return Object.hasOwn(i, "index") && (o.index = i.index), Object.hasOwn(i, "input") && (o.input = i.input), o;
  }
  if (i instanceof Date) return new Date(i.getTime());
  if (i instanceof RegExp) {
    const o = new RegExp(i.source, i.flags);
    return o.lastIndex = i.lastIndex, o;
  }
  if (i instanceof Map) {
    const o = /* @__PURE__ */ new Map();
    s.set(i, o);
    for (const [a, c] of i) o.set(a, ni(c, a, t, s, r));
    return o;
  }
  if (i instanceof Set) {
    const o = /* @__PURE__ */ new Set();
    s.set(i, o);
    for (const a of i) o.add(ni(a, void 0, t, s, r));
    return o;
  }
  if (typeof Buffer < "u" && Buffer.isBuffer(i)) return i.subarray();
  if (Dr(i)) {
    const o = new (Object.getPrototypeOf(i)).constructor(i.length);
    s.set(i, o);
    for (let a = 0; a < i.length; a++) o[a] = ni(i[a], a, t, s, r);
    return o;
  }
  if (i instanceof ArrayBuffer || typeof SharedArrayBuffer < "u" && i instanceof SharedArrayBuffer) return i.slice(0);
  if (i instanceof DataView) {
    const o = new DataView(i.buffer.slice(0), i.byteOffset, i.byteLength);
    return s.set(i, o), Nt(o, i, t, s, r), o;
  }
  if (typeof File < "u" && i instanceof File) {
    const o = new File([i], i.name, { type: i.type });
    return s.set(i, o), Nt(o, i, t, s, r), o;
  }
  if (i instanceof Blob) {
    const o = new Blob([i], { type: i.type });
    return s.set(i, o), Nt(o, i, t, s, r), o;
  }
  if (i instanceof Error) {
    const o = new i.constructor();
    return s.set(i, o), o.message = i.message, o.name = i.name, o.stack = i.stack, o.cause = i.cause, Nt(o, i, t, s, r), o;
  }
  if (typeof i == "object" && Wy(i)) {
    const o = Object.create(Object.getPrototypeOf(i));
    return s.set(i, o), Nt(o, i, t, s, r), o;
  }
  return i;
}
function Nt(i, e, t = i, s, r) {
  const n = [...Object.keys(e), ...Da(e)];
  for (let o = 0; o < n.length; o++) {
    const a = n[o], c = Object.getOwnPropertyDescriptor(i, a);
    (c == null || c.writable) && (i[a] = ni(e[a], a, t, s, r));
  }
}
function Wy(i) {
  switch (ja(i)) {
    case Ma:
    case qy:
    case Dy:
    case ky:
    case Ua:
    case Ny:
    case Ky:
    case Hy:
    case By:
    case zy:
    case Vy:
    case Ry:
    case Fa:
    case jy:
    case Cy:
    case Ty:
    case ka:
    case xy:
    case Fy:
    case Uy:
    case My:
    case Ly:
      return !0;
    default:
      return !1;
  }
}
function Jy(i, e) {
  return Gy(i, (t, s, r, n) => {
    if (typeof i == "object") switch (Object.prototype.toString.call(i)) {
      case Fa:
      case ka:
      case Ua: {
        const o = new i.constructor(i == null ? void 0 : i.valueOf());
        return Nt(o, i), o;
      }
      case Ma: {
        const o = {};
        return Nt(o, i), o.length = i.length, o[Symbol.iterator] = i[Symbol.iterator], o;
      }
      default:
        return;
    }
  });
}
function uo(i) {
  return Jy(i);
}
function po(i) {
  return i !== null && typeof i == "object" && ja(i) === "[object Arguments]";
}
function Qy(i) {
  return Dr(i);
}
function Yy(i) {
  var t;
  if (typeof i != "object" || i == null) return !1;
  if (Object.getPrototypeOf(i) === null) return !0;
  if (Object.prototype.toString.call(i) !== "[object Object]") {
    const s = i[Symbol.toStringTag];
    return s == null || !((t = Object.getOwnPropertyDescriptor(i, Symbol.toStringTag)) != null && t.writable) ? !1 : i.toString() === `[object ${s}]`;
  }
  let e = i;
  for (; Object.getPrototypeOf(e) !== null; ) e = Object.getPrototypeOf(e);
  return Object.getPrototypeOf(i) === e;
}
function Zy(i, ...e) {
  const t = e.slice(0, -1), s = e[e.length - 1];
  let r = i;
  for (let n = 0; n < t.length; n++) {
    const o = t[n];
    r = fr(r, o, s, /* @__PURE__ */ new Map());
  }
  return r;
}
function fr(i, e, t, s) {
  if (qr(i) && (i = Object(i)), e == null || typeof e != "object") return i;
  if (s.has(e)) return Ay(s.get(e));
  if (s.set(e, i), Array.isArray(e)) {
    e = e.slice();
    for (let n = 0; n < e.length; n++) e[n] = e[n] ?? void 0;
  }
  const r = [...Object.keys(e), ...Da(e)];
  for (let n = 0; n < r.length; n++) {
    const o = r[n];
    let a = e[o], c = i[o];
    if (po(a) && (a = { ...a }), po(c) && (c = { ...c }), typeof Buffer < "u" && Buffer.isBuffer(a) && (a = uo(a)), Array.isArray(a)) if (typeof c == "object" && c != null) {
      const l = [], u = Reflect.ownKeys(c);
      for (let p = 0; p < u.length; p++) {
        const d = u[p];
        l[d] = c[d];
      }
      c = l;
    } else c = [];
    const h = t(c, a, o, i, e, s);
    h != null ? i[o] = h : Array.isArray(a) || lo(c) && lo(a) ? i[o] = fr(c, a, t, s) : c == null && Yy(a) ? i[o] = fr({}, a, t, s) : c == null && Qy(a) ? i[o] = uo(a) : (c === void 0 || a !== void 0) && (i[o] = a);
  }
  return i;
}
function Xy(i, ...e) {
  return Zy(i, ...e, Oy);
}
var em = Object.defineProperty, tm = Object.defineProperties, im = Object.getOwnPropertyDescriptors, go = Object.getOwnPropertySymbols, sm = Object.prototype.hasOwnProperty, rm = Object.prototype.propertyIsEnumerable, fo = (i, e, t) => e in i ? em(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t, Xi = (i, e) => {
  for (var t in e || (e = {})) sm.call(e, t) && fo(i, t, e[t]);
  if (go) for (var t of go(e)) rm.call(e, t) && fo(i, t, e[t]);
  return i;
}, nm = (i, e) => tm(i, im(e));
function qe(i, e, t) {
  var s;
  const r = oi(i);
  return ((s = e.rpcMap) == null ? void 0 : s[r.reference]) || `${qa}?chainId=${r.namespace}:${r.reference}&projectId=${t}`;
}
function Ut(i) {
  return i.includes(":") ? i.split(":")[1] : i;
}
function La(i) {
  return i.map((e) => `${e.split(":")[0]}:${e.split(":")[1]}`);
}
function om(i, e) {
  const t = Object.keys(e.namespaces).filter((r) => r.includes(i));
  if (!t.length) return [];
  const s = [];
  return t.forEach((r) => {
    const n = e.namespaces[r].accounts;
    s.push(...n);
  }), s;
}
function es(i = {}, e = {}) {
  const t = yo(i), s = yo(e);
  return Xy(t, s);
}
function yo(i) {
  var e, t, s, r, n;
  const o = {};
  if (!Et(i)) return o;
  for (const [a, c] of Object.entries(i)) {
    const h = bs(a) ? [a] : c.chains, l = c.methods || [], u = c.events || [], p = c.rpcMap || {}, d = ri(a);
    o[d] = nm(Xi(Xi({}, o[d]), c), { chains: it(h, (e = o[d]) == null ? void 0 : e.chains), methods: it(l, (t = o[d]) == null ? void 0 : t.methods), events: it(u, (s = o[d]) == null ? void 0 : s.events) }), (Et(p) || Et(((r = o[d]) == null ? void 0 : r.rpcMap) || {})) && (o[d].rpcMap = Xi(Xi({}, p), (n = o[d]) == null ? void 0 : n.rpcMap));
  }
  return o;
}
function mo(i) {
  return i.includes(":") ? i.split(":")[2] : i;
}
function wo(i) {
  const e = {};
  for (const [t, s] of Object.entries(i)) {
    const r = s.methods || [], n = s.events || [], o = s.accounts || [], a = bs(t) ? [t] : s.chains ? s.chains : La(s.accounts);
    e[t] = { chains: a, methods: r, events: n, accounts: o };
  }
  return e;
}
function Ls(i) {
  return typeof i == "number" ? i : i.includes("0x") ? parseInt(i, 16) : (i = i.includes(":") ? i.split(":")[1] : i, isNaN(Number(i)) ? i : Number(i));
}
const Ba = {}, H = (i) => Ba[i], Bs = (i, e) => {
  Ba[i] = e;
};
var am = Object.defineProperty, cm = (i, e, t) => e in i ? am(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t, Vt = (i, e, t) => cm(i, typeof e != "symbol" ? e + "" : e, t);
class hm {
  constructor(e) {
    Vt(this, "name", "polkadot"), Vt(this, "client"), Vt(this, "httpProviders"), Vt(this, "events"), Vt(this, "namespace"), Vt(this, "chainId"), this.namespace = e.namespace, this.events = H("events"), this.client = H("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
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
    this.httpProviders[e] || this.setHttpProvider(e, t), this.chainId = e, this.events.emit(Le.DEFAULT_CHAIN_CHANGED, `${this.name}:${e}`);
  }
  getAccounts() {
    const e = this.namespace.accounts;
    return e ? e.filter((t) => t.split(":")[1] === this.chainId.toString()).map((t) => t.split(":")[2]) || [] : [];
  }
  createHttpProviders() {
    const e = {};
    return this.namespace.chains.forEach((t) => {
      var s;
      const r = Ut(t);
      e[r] = this.createHttpProvider(r, (s = this.namespace.rpcMap) == null ? void 0 : s[t]);
    }), e;
  }
  getHttpProvider() {
    const e = `${this.name}:${this.chainId}`, t = this.httpProviders[e];
    if (typeof t > "u") throw new Error(`JSON-RPC provider for ${e} not found`);
    return t;
  }
  setHttpProvider(e, t) {
    const s = this.createHttpProvider(e, t);
    s && (this.httpProviders[e] = s);
  }
  createHttpProvider(e, t) {
    const s = t || qe(e, this.namespace, this.client.core.projectId);
    if (!s) throw new Error(`No RPC url provided for chainId: ${e}`);
    return new Me(new We(s, H("disableProviderPing")));
  }
}
var lm = Object.defineProperty, um = Object.defineProperties, pm = Object.getOwnPropertyDescriptors, bo = Object.getOwnPropertySymbols, dm = Object.prototype.hasOwnProperty, gm = Object.prototype.propertyIsEnumerable, yr = (i, e, t) => e in i ? lm(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t, vo = (i, e) => {
  for (var t in e || (e = {})) dm.call(e, t) && yr(i, t, e[t]);
  if (bo) for (var t of bo(e)) gm.call(e, t) && yr(i, t, e[t]);
  return i;
}, Eo = (i, e) => um(i, pm(e)), Kt = (i, e, t) => yr(i, typeof e != "symbol" ? e + "" : e, t);
class fm {
  constructor(e) {
    Kt(this, "name", "eip155"), Kt(this, "client"), Kt(this, "chainId"), Kt(this, "namespace"), Kt(this, "httpProviders"), Kt(this, "events"), this.namespace = e.namespace, this.events = H("events"), this.client = H("client"), this.httpProviders = this.createHttpProviders(), this.chainId = parseInt(this.getDefaultChain());
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
    this.httpProviders[e] || this.setHttpProvider(parseInt(e), t), this.chainId = parseInt(e), this.events.emit(Le.DEFAULT_CHAIN_CHANGED, `${this.name}:${e}`);
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
    const s = t || qe(`${this.name}:${e}`, this.namespace, this.client.core.projectId);
    if (!s) throw new Error(`No RPC url provided for chainId: ${e}`);
    return new Me(new We(s, H("disableProviderPing")));
  }
  setHttpProvider(e, t) {
    const s = this.createHttpProvider(e, t);
    s && (this.httpProviders[e] = s);
  }
  createHttpProviders() {
    const e = {};
    return this.namespace.chains.forEach((t) => {
      var s;
      const r = parseInt(Ut(t));
      e[r] = this.createHttpProvider(r, (s = this.namespace.rpcMap) == null ? void 0 : s[t]);
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
    var t, s;
    let r = e.request.params ? (t = e.request.params[0]) == null ? void 0 : t.chainId : "0x0";
    r = r.startsWith("0x") ? r : `0x${r}`;
    const n = parseInt(r, 16);
    if (this.isChainApproved(n)) this.setDefaultChain(`${n}`);
    else if (this.namespace.methods.includes("wallet_switchEthereumChain")) await this.client.request({ topic: e.topic, request: { method: e.request.method, params: [{ chainId: r }] }, chainId: (s = this.namespace.chains) == null ? void 0 : s[0] }), this.setDefaultChain(`${n}`);
    else throw new Error(`Failed to switch to chain 'eip155:${n}'. The chain is not approved or the wallet does not support 'wallet_switchEthereumChain' method.`);
    return null;
  }
  isChainApproved(e) {
    return this.namespace.chains.includes(`${this.name}:${e}`);
  }
  async getCapabilities(e) {
    var t, s, r, n, o;
    const a = (s = (t = e.request) == null ? void 0 : t.params) == null ? void 0 : s[0], c = ((n = (r = e.request) == null ? void 0 : r.params) == null ? void 0 : n[1]) || [], h = `${a}${c.join(",")}`;
    if (!a) throw new Error("Missing address parameter in `wallet_getCapabilities` request");
    const l = this.client.session.get(e.topic), u = ((o = l == null ? void 0 : l.sessionProperties) == null ? void 0 : o.capabilities) || {};
    if (u != null && u[h]) return u == null ? void 0 : u[h];
    const p = await this.client.request(e);
    try {
      await this.client.session.update(e.topic, { sessionProperties: Eo(vo({}, l.sessionProperties || {}), { capabilities: Eo(vo({}, u || {}), { [h]: p }) }) });
    } catch (d) {
      console.warn("Failed to update session with capabilities", d);
    }
    return p;
  }
  async getCallStatus(e) {
    var t, s;
    const r = this.client.session.get(e.topic), n = (t = r.sessionProperties) == null ? void 0 : t.bundler_name;
    if (n) {
      const a = this.getBundlerUrl(e.chainId, n);
      try {
        return await this.getUserOperationReceipt(a, e);
      } catch (c) {
        console.warn("Failed to fetch call status from bundler", c, a);
      }
    }
    const o = (s = r.sessionProperties) == null ? void 0 : s.bundler_url;
    if (o) try {
      return await this.getUserOperationReceipt(o, e);
    } catch (a) {
      console.warn("Failed to fetch call status from custom bundler", a, o);
    }
    if (this.namespace.methods.includes(e.request.method)) return await this.client.request(e);
    throw new Error("Fetching call status not approved by the wallet.");
  }
  async getUserOperationReceipt(e, t) {
    var s;
    const r = new URL(e), n = await fetch(r, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Rt("eth_getUserOperationReceipt", [(s = t.request.params) == null ? void 0 : s[0]])) });
    if (!n.ok) throw new Error(`Failed to fetch user operation receipt - ${n.status}`);
    return await n.json();
  }
  getBundlerUrl(e, t) {
    return `${Sy}?projectId=${this.client.core.projectId}&chainId=${e}&bundler=${t}`;
  }
}
var ym = Object.defineProperty, mm = (i, e, t) => e in i ? ym(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t, Ht = (i, e, t) => mm(i, typeof e != "symbol" ? e + "" : e, t);
class wm {
  constructor(e) {
    Ht(this, "name", "solana"), Ht(this, "client"), Ht(this, "httpProviders"), Ht(this, "events"), Ht(this, "namespace"), Ht(this, "chainId"), this.namespace = e.namespace, this.events = H("events"), this.client = H("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
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
    this.httpProviders[e] || this.setHttpProvider(e, t), this.chainId = e, this.events.emit(Le.DEFAULT_CHAIN_CHANGED, `${this.name}:${e}`);
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
      var s;
      const r = Ut(t);
      e[r] = this.createHttpProvider(r, (s = this.namespace.rpcMap) == null ? void 0 : s[t]);
    }), e;
  }
  getHttpProvider() {
    const e = `${this.name}:${this.chainId}`, t = this.httpProviders[e];
    if (typeof t > "u") throw new Error(`JSON-RPC provider for ${e} not found`);
    return t;
  }
  setHttpProvider(e, t) {
    const s = this.createHttpProvider(e, t);
    s && (this.httpProviders[e] = s);
  }
  createHttpProvider(e, t) {
    const s = t || qe(e, this.namespace, this.client.core.projectId);
    if (!s) throw new Error(`No RPC url provided for chainId: ${e}`);
    return new Me(new We(s, H("disableProviderPing")));
  }
}
var bm = Object.defineProperty, vm = (i, e, t) => e in i ? bm(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t, Gt = (i, e, t) => vm(i, typeof e != "symbol" ? e + "" : e, t);
class Em {
  constructor(e) {
    Gt(this, "name", "cosmos"), Gt(this, "client"), Gt(this, "httpProviders"), Gt(this, "events"), Gt(this, "namespace"), Gt(this, "chainId"), this.namespace = e.namespace, this.events = H("events"), this.client = H("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
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
    this.httpProviders[e] || this.setHttpProvider(e, t), this.chainId = e, this.events.emit(Le.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
  }
  getAccounts() {
    const e = this.namespace.accounts;
    return e ? [...new Set(e.filter((t) => t.split(":")[1] === this.chainId.toString()).map((t) => t.split(":")[2]))] : [];
  }
  createHttpProviders() {
    const e = {};
    return this.namespace.chains.forEach((t) => {
      var s;
      const r = Ut(t);
      e[r] = this.createHttpProvider(r, (s = this.namespace.rpcMap) == null ? void 0 : s[t]);
    }), e;
  }
  getHttpProvider() {
    const e = `${this.name}:${this.chainId}`, t = this.httpProviders[e];
    if (typeof t > "u") throw new Error(`JSON-RPC provider for ${e} not found`);
    return t;
  }
  setHttpProvider(e, t) {
    const s = this.createHttpProvider(e, t);
    s && (this.httpProviders[e] = s);
  }
  createHttpProvider(e, t) {
    const s = t || qe(e, this.namespace, this.client.core.projectId);
    if (!s) throw new Error(`No RPC url provided for chainId: ${e}`);
    return new Me(new We(s, H("disableProviderPing")));
  }
}
var Im = Object.defineProperty, Pm = (i, e, t) => e in i ? Im(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t, Wt = (i, e, t) => Pm(i, typeof e != "symbol" ? e + "" : e, t);
class _m {
  constructor(e) {
    Wt(this, "name", "algorand"), Wt(this, "client"), Wt(this, "httpProviders"), Wt(this, "events"), Wt(this, "namespace"), Wt(this, "chainId"), this.namespace = e.namespace, this.events = H("events"), this.client = H("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
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
      const s = t || qe(`${this.name}:${e}`, this.namespace, this.client.core.projectId);
      if (!s) throw new Error(`No RPC url provided for chainId: ${e}`);
      this.setHttpProvider(e, s);
    }
    this.chainId = e, this.events.emit(Le.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
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
      var s;
      e[t] = this.createHttpProvider(t, (s = this.namespace.rpcMap) == null ? void 0 : s[t]);
    }), e;
  }
  getHttpProvider() {
    const e = `${this.name}:${this.chainId}`, t = this.httpProviders[e];
    if (typeof t > "u") throw new Error(`JSON-RPC provider for ${e} not found`);
    return t;
  }
  setHttpProvider(e, t) {
    const s = this.createHttpProvider(e, t);
    s && (this.httpProviders[e] = s);
  }
  createHttpProvider(e, t) {
    const s = t || qe(e, this.namespace, this.client.core.projectId);
    return typeof s > "u" ? void 0 : new Me(new We(s, H("disableProviderPing")));
  }
}
var $m = Object.defineProperty, Sm = (i, e, t) => e in i ? $m(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t, Jt = (i, e, t) => Sm(i, typeof e != "symbol" ? e + "" : e, t);
class Om {
  constructor(e) {
    Jt(this, "name", "cip34"), Jt(this, "client"), Jt(this, "httpProviders"), Jt(this, "events"), Jt(this, "namespace"), Jt(this, "chainId"), this.namespace = e.namespace, this.events = H("events"), this.client = H("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
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
    this.httpProviders[e] || this.setHttpProvider(e, t), this.chainId = e, this.events.emit(Le.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
  }
  getAccounts() {
    const e = this.namespace.accounts;
    return e ? [...new Set(e.filter((t) => t.split(":")[1] === this.chainId.toString()).map((t) => t.split(":")[2]))] : [];
  }
  createHttpProviders() {
    const e = {};
    return this.namespace.chains.forEach((t) => {
      const s = this.getCardanoRPCUrl(t), r = Ut(t);
      e[r] = this.createHttpProvider(r, s);
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
    const s = this.createHttpProvider(e, t);
    s && (this.httpProviders[e] = s);
  }
  createHttpProvider(e, t) {
    const s = t || this.getCardanoRPCUrl(e);
    if (!s) throw new Error(`No RPC url provided for chainId: ${e}`);
    return new Me(new We(s, H("disableProviderPing")));
  }
}
var Am = Object.defineProperty, Cm = (i, e, t) => e in i ? Am(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t, Qt = (i, e, t) => Cm(i, typeof e != "symbol" ? e + "" : e, t);
class xm {
  constructor(e) {
    Qt(this, "name", "elrond"), Qt(this, "client"), Qt(this, "httpProviders"), Qt(this, "events"), Qt(this, "namespace"), Qt(this, "chainId"), this.namespace = e.namespace, this.events = H("events"), this.client = H("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
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
    this.httpProviders[e] || this.setHttpProvider(e, t), this.chainId = e, this.events.emit(Le.DEFAULT_CHAIN_CHANGED, `${this.name}:${e}`);
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
      var s;
      const r = Ut(t);
      e[r] = this.createHttpProvider(r, (s = this.namespace.rpcMap) == null ? void 0 : s[t]);
    }), e;
  }
  getHttpProvider() {
    const e = `${this.name}:${this.chainId}`, t = this.httpProviders[e];
    if (typeof t > "u") throw new Error(`JSON-RPC provider for ${e} not found`);
    return t;
  }
  setHttpProvider(e, t) {
    const s = this.createHttpProvider(e, t);
    s && (this.httpProviders[e] = s);
  }
  createHttpProvider(e, t) {
    const s = t || qe(e, this.namespace, this.client.core.projectId);
    if (!s) throw new Error(`No RPC url provided for chainId: ${e}`);
    return new Me(new We(s, H("disableProviderPing")));
  }
}
var Nm = Object.defineProperty, Rm = (i, e, t) => e in i ? Nm(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t, Yt = (i, e, t) => Rm(i, typeof e != "symbol" ? e + "" : e, t);
class Tm {
  constructor(e) {
    Yt(this, "name", "multiversx"), Yt(this, "client"), Yt(this, "httpProviders"), Yt(this, "events"), Yt(this, "namespace"), Yt(this, "chainId"), this.namespace = e.namespace, this.events = H("events"), this.client = H("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
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
    this.httpProviders[e] || this.setHttpProvider(e, t), this.chainId = e, this.events.emit(Le.DEFAULT_CHAIN_CHANGED, `${this.name}:${e}`);
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
      var s;
      const r = Ut(t);
      e[r] = this.createHttpProvider(r, (s = this.namespace.rpcMap) == null ? void 0 : s[t]);
    }), e;
  }
  getHttpProvider() {
    const e = `${this.name}:${this.chainId}`, t = this.httpProviders[e];
    if (typeof t > "u") throw new Error(`JSON-RPC provider for ${e} not found`);
    return t;
  }
  setHttpProvider(e, t) {
    const s = this.createHttpProvider(e, t);
    s && (this.httpProviders[e] = s);
  }
  createHttpProvider(e, t) {
    const s = t || qe(e, this.namespace, this.client.core.projectId);
    if (!s) throw new Error(`No RPC url provided for chainId: ${e}`);
    return new Me(new We(s, H("disableProviderPing")));
  }
}
var qm = Object.defineProperty, Dm = (i, e, t) => e in i ? qm(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t, Zt = (i, e, t) => Dm(i, typeof e != "symbol" ? e + "" : e, t);
class jm {
  constructor(e) {
    Zt(this, "name", "near"), Zt(this, "client"), Zt(this, "httpProviders"), Zt(this, "events"), Zt(this, "namespace"), Zt(this, "chainId"), this.namespace = e.namespace, this.events = H("events"), this.client = H("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
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
      const s = t || qe(`${this.name}:${e}`, this.namespace);
      if (!s) throw new Error(`No RPC url provided for chainId: ${e}`);
      this.setHttpProvider(e, s);
    }
    this.events.emit(Le.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
  }
  getAccounts() {
    const e = this.namespace.accounts;
    return e ? e.filter((t) => t.split(":")[1] === this.chainId.toString()).map((t) => t.split(":")[2]) || [] : [];
  }
  createHttpProviders() {
    const e = {};
    return this.namespace.chains.forEach((t) => {
      var s;
      e[t] = this.createHttpProvider(t, (s = this.namespace.rpcMap) == null ? void 0 : s[t]);
    }), e;
  }
  getHttpProvider() {
    const e = `${this.name}:${this.chainId}`, t = this.httpProviders[e];
    if (typeof t > "u") throw new Error(`JSON-RPC provider for ${e} not found`);
    return t;
  }
  setHttpProvider(e, t) {
    const s = this.createHttpProvider(e, t);
    s && (this.httpProviders[e] = s);
  }
  createHttpProvider(e, t) {
    const s = t || qe(e, this.namespace);
    return typeof s > "u" ? void 0 : new Me(new We(s, H("disableProviderPing")));
  }
}
var km = Object.defineProperty, Fm = (i, e, t) => e in i ? km(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t, Xt = (i, e, t) => Fm(i, typeof e != "symbol" ? e + "" : e, t);
class Um {
  constructor(e) {
    Xt(this, "name", "tezos"), Xt(this, "client"), Xt(this, "httpProviders"), Xt(this, "events"), Xt(this, "namespace"), Xt(this, "chainId"), this.namespace = e.namespace, this.events = H("events"), this.client = H("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
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
      const s = t || qe(`${this.name}:${e}`, this.namespace);
      if (!s) throw new Error(`No RPC url provided for chainId: ${e}`);
      this.setHttpProvider(e, s);
    }
    this.events.emit(Le.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
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
    const s = this.createHttpProvider(e, t);
    s && (this.httpProviders[e] = s);
  }
  createHttpProvider(e, t) {
    const s = t || qe(e, this.namespace);
    return typeof s > "u" ? void 0 : new Me(new We(s));
  }
}
var Mm = Object.defineProperty, Lm = (i, e, t) => e in i ? Mm(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t, ei = (i, e, t) => Lm(i, typeof e != "symbol" ? e + "" : e, t);
class Bm {
  constructor(e) {
    ei(this, "name", ti), ei(this, "client"), ei(this, "httpProviders"), ei(this, "events"), ei(this, "namespace"), ei(this, "chainId"), this.namespace = e.namespace, this.events = H("events"), this.client = H("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
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
    this.httpProviders[e] || this.setHttpProvider(e, t), this.chainId = e, this.events.emit(Le.DEFAULT_CHAIN_CHANGED, `${this.name}:${e}`);
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
    const s = {};
    return (t = (e = this.namespace) == null ? void 0 : e.accounts) == null || t.forEach((r) => {
      const n = oi(r);
      s[`${n.namespace}:${n.reference}`] = this.createHttpProvider(r);
    }), s;
  }
  getHttpProvider(e) {
    const t = this.httpProviders[e];
    if (typeof t > "u") throw new Error(`JSON-RPC provider for ${e} not found`);
    return t;
  }
  setHttpProvider(e, t) {
    const s = this.createHttpProvider(e, t);
    s && (this.httpProviders[e] = s);
  }
  createHttpProvider(e, t) {
    const s = t || qe(e, this.namespace, this.client.core.projectId);
    if (!s) throw new Error(`No RPC url provided for chainId: ${e}`);
    return new Me(new We(s, H("disableProviderPing")));
  }
}
var zm = Object.defineProperty, Vm = Object.defineProperties, Km = Object.getOwnPropertyDescriptors, Io = Object.getOwnPropertySymbols, Hm = Object.prototype.hasOwnProperty, Gm = Object.prototype.propertyIsEnumerable, mr = (i, e, t) => e in i ? zm(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t, ts = (i, e) => {
  for (var t in e || (e = {})) Hm.call(e, t) && mr(i, t, e[t]);
  if (Io) for (var t of Io(e)) Gm.call(e, t) && mr(i, t, e[t]);
  return i;
}, zs = (i, e) => Vm(i, Km(e)), ke = (i, e, t) => mr(i, typeof e != "symbol" ? e + "" : e, t);
let Wm = class za {
  constructor(e) {
    ke(this, "client"), ke(this, "namespaces"), ke(this, "optionalNamespaces"), ke(this, "sessionProperties"), ke(this, "scopedProperties"), ke(this, "events", new _r()), ke(this, "rpcProviders", {}), ke(this, "session"), ke(this, "providerOpts"), ke(this, "logger"), ke(this, "uri"), ke(this, "disableProviderPing", !1), this.providerOpts = e, this.logger = typeof (e == null ? void 0 : e.logger) < "u" && typeof (e == null ? void 0 : e.logger) != "string" ? e.logger : Er(ps({ level: (e == null ? void 0 : e.logger) || ho })), this.disableProviderPing = (e == null ? void 0 : e.disableProviderPing) || !1;
  }
  static async init(e) {
    const t = new za(e);
    return await t.initialize(), t;
  }
  async request(e, t, s) {
    const [r, n] = this.validateChain(t);
    if (!this.session) throw new Error("Please call connect() before request()");
    return await this.getProvider(r).request({ request: ts({}, e), chainId: `${r}:${n}`, topic: this.session.topic, expiry: s });
  }
  sendAsync(e, t, s, r) {
    const n = (/* @__PURE__ */ new Date()).getTime();
    this.request(e, s, r).then((o) => t(null, ds(n, o))).catch((o) => t(o, void 0));
  }
  async enable() {
    if (!this.client) throw new Error("Sign Client not initialized");
    return this.session || await this.connect({ namespaces: this.namespaces, optionalNamespaces: this.optionalNamespaces, sessionProperties: this.sessionProperties, scopedProperties: this.scopedProperties }), await this.requestAccounts();
  }
  async disconnect() {
    var e;
    if (!this.session) throw new Error("Please call connect() before enable()");
    await this.client.disconnect({ topic: (e = this.session) == null ? void 0 : e.topic, reason: J("USER_DISCONNECTED") }), await this.cleanup();
  }
  async connect(e) {
    if (!this.client) throw new Error("Sign Client not initialized");
    if (this.setNamespaces(e), await this.cleanupPendingPairings(), !e.skipPairing) return await this.pair(e.pairingTopic);
  }
  async authenticate(e, t) {
    if (!this.client) throw new Error("Sign Client not initialized");
    this.setNamespaces(e), await this.cleanupPendingPairings();
    const { uri: s, response: r } = await this.client.authenticate(e, t);
    s && (this.uri = s, this.events.emit("display_uri", s));
    const n = await r();
    if (this.session = n.session, this.session) {
      const o = wo(this.session.namespaces);
      this.namespaces = es(this.namespaces, o), await this.persist("namespaces", this.namespaces), this.onConnect();
    }
    return n;
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
    const { uri: t, approval: s } = await this.client.connect({ pairingTopic: e, requiredNamespaces: this.namespaces, optionalNamespaces: this.optionalNamespaces, sessionProperties: this.sessionProperties, scopedProperties: this.scopedProperties });
    t && (this.uri = t, this.events.emit("display_uri", t));
    const r = await s();
    this.session = r;
    const n = wo(r.namespaces);
    return this.namespaces = es(this.namespaces, n), await this.persist("namespaces", this.namespaces), await this.persist("optionalNamespaces", this.optionalNamespaces), this.onConnect(), this.session;
  }
  setDefaultChain(e, t) {
    try {
      if (!this.session) return;
      const [s, r] = this.validateChain(e), n = this.getProvider(s);
      n.name === ti ? n.setDefaultChain(`${s}:${r}`, t) : n.setDefaultChain(r, t);
    } catch (s) {
      if (!/Please call connect/.test(s.message)) throw s;
    }
  }
  async cleanupPendingPairings(e = {}) {
    this.logger.info("Cleaning up inactive pairings...");
    const t = this.client.pairing.getAll();
    if (Ge(t)) {
      for (const s of t) e.deletePairings ? this.client.core.expirer.set(s.topic, 0) : await this.client.core.relayer.subscriber.unsubscribe(s.topic);
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
    if (this.client = this.providerOpts.client || await Iy.init({ core: this.providerOpts.core, logger: this.providerOpts.logger || ho, relayUrl: this.providerOpts.relayUrl || Py, projectId: this.providerOpts.projectId, metadata: this.providerOpts.metadata, storageOptions: this.providerOpts.storageOptions, storage: this.providerOpts.storage, name: this.providerOpts.name, customStoragePrefix: this.providerOpts.customStoragePrefix, telemetryEnabled: this.providerOpts.telemetryEnabled }), this.providerOpts.session) try {
      this.session = this.client.session.get(this.providerOpts.session.topic);
    } catch (s) {
      throw this.logger.error("Failed to get session", s), new Error(`The provided session: ${(t = (e = this.providerOpts) == null ? void 0 : e.session) == null ? void 0 : t.topic} doesn't exist in the Sign client`);
    }
    else {
      const s = this.client.session.getAll();
      this.session = s[0];
    }
    this.logger.trace("SignClient Initialized");
  }
  createProviders() {
    if (!this.client) throw new Error("Sign Client not initialized");
    if (!this.session) throw new Error("Session not initialized. Please call connect() before enable()");
    const e = [...new Set(Object.keys(this.session.namespaces).map((t) => ri(t)))];
    Bs("client", this.client), Bs("events", this.events), Bs("disableProviderPing", this.disableProviderPing), e.forEach((t) => {
      if (!this.session) return;
      const s = om(t, this.session), r = La(s), n = es(this.namespaces, this.optionalNamespaces), o = zs(ts({}, n[t]), { accounts: s, chains: r });
      switch (t) {
        case "eip155":
          this.rpcProviders[t] = new fm({ namespace: o });
          break;
        case "algorand":
          this.rpcProviders[t] = new _m({ namespace: o });
          break;
        case "solana":
          this.rpcProviders[t] = new wm({ namespace: o });
          break;
        case "cosmos":
          this.rpcProviders[t] = new Em({ namespace: o });
          break;
        case "polkadot":
          this.rpcProviders[t] = new hm({ namespace: o });
          break;
        case "cip34":
          this.rpcProviders[t] = new Om({ namespace: o });
          break;
        case "elrond":
          this.rpcProviders[t] = new xm({ namespace: o });
          break;
        case "multiversx":
          this.rpcProviders[t] = new Tm({ namespace: o });
          break;
        case "near":
          this.rpcProviders[t] = new jm({ namespace: o });
          break;
        case "tezos":
          this.rpcProviders[t] = new Um({ namespace: o });
          break;
        default:
          this.rpcProviders[ti] ? this.rpcProviders[ti].updateNamespace(o) : this.rpcProviders[ti] = new Bm({ namespace: o });
      }
    });
  }
  registerEventListeners() {
    if (typeof this.client > "u") throw new Error("Sign Client is not initialized");
    this.client.on("session_ping", (e) => {
      var t;
      const { topic: s } = e;
      s === ((t = this.session) == null ? void 0 : t.topic) && this.events.emit("session_ping", e);
    }), this.client.on("session_event", (e) => {
      var t;
      const { params: s, topic: r } = e;
      if (r !== ((t = this.session) == null ? void 0 : t.topic)) return;
      const { event: n } = s;
      if (n.name === "accountsChanged") {
        const o = n.data;
        o && Ge(o) && this.events.emit("accountsChanged", o.map(mo));
      } else if (n.name === "chainChanged") {
        const o = s.chainId, a = s.event.data, c = ri(o), h = Ls(o) !== Ls(a) ? `${c}:${Ls(a)}` : o;
        this.onChainChanged(h);
      } else this.events.emit(n.name, n.data);
      this.events.emit("session_event", e);
    }), this.client.on("session_update", ({ topic: e, params: t }) => {
      var s, r;
      if (e !== ((s = this.session) == null ? void 0 : s.topic)) return;
      const { namespaces: n } = t, o = (r = this.client) == null ? void 0 : r.session.get(e);
      this.session = zs(ts({}, o), { namespaces: n }), this.onSessionUpdate(), this.events.emit("session_update", { topic: e, params: t });
    }), this.client.on("session_delete", async (e) => {
      var t;
      e.topic === ((t = this.session) == null ? void 0 : t.topic) && (await this.cleanup(), this.events.emit("session_delete", e), this.events.emit("disconnect", zs(ts({}, J("USER_DISCONNECTED")), { data: e.topic })));
    }), this.on(Le.DEFAULT_CHAIN_CHANGED, (e) => {
      this.onChainChanged(e, !0);
    });
  }
  getProvider(e) {
    return this.rpcProviders[e] || this.rpcProviders[ti];
  }
  onSessionUpdate() {
    Object.keys(this.rpcProviders).forEach((e) => {
      var t;
      this.getProvider(e).updateNamespace((t = this.session) == null ? void 0 : t.namespaces[e]);
    });
  }
  setNamespaces(e) {
    const { namespaces: t = {}, optionalNamespaces: s = {}, sessionProperties: r, scopedProperties: n } = e;
    this.optionalNamespaces = es(t, s), this.sessionProperties = r, this.scopedProperties = n;
  }
  validateChain(e) {
    const [t, s] = (e == null ? void 0 : e.split(":")) || ["", ""];
    if (!this.namespaces || !Object.keys(this.namespaces).length) return [t, s];
    if (t && !Object.keys(this.namespaces || {}).map((o) => ri(o)).includes(t)) throw new Error(`Namespace '${t}' is not configured. Please call connect() first with namespace config.`);
    if (t && s) return [t, s];
    const r = ri(Object.keys(this.namespaces)[0]), n = this.rpcProviders[r].getDefaultChain();
    return [r, n];
  }
  async requestAccounts() {
    const [e] = this.validateChain();
    return await this.getProvider(e).requestAccounts();
  }
  async onChainChanged(e, t = !1) {
    if (!this.namespaces) return;
    const [s, r] = this.validateChain(e);
    if (!r) return;
    this.updateNamespaceChain(s, r), this.events.emit("chainChanged", r);
    const n = this.getProvider(s).getDefaultChain();
    t || this.getProvider(s).setDefaultChain(r), this.emitAccountsChangedOnChainChange({ namespace: s, previousChainId: n, newChainId: e }), await this.persist("namespaces", this.namespaces);
  }
  emitAccountsChangedOnChainChange({ namespace: e, previousChainId: t, newChainId: s }) {
    var r, n;
    try {
      if (t === s) return;
      const o = (n = (r = this.session) == null ? void 0 : r.namespaces[e]) == null ? void 0 : n.accounts;
      if (!o) return;
      const a = o.filter((c) => c.includes(`${s}:`)).map(mo);
      if (!Ge(a)) return;
      this.events.emit("accountsChanged", a);
    } catch (o) {
      this.logger.warn("Failed to emit accountsChanged on chain change", o);
    }
  }
  updateNamespaceChain(e, t) {
    if (!this.namespaces) return;
    const s = this.namespaces[e] ? e : `${e}:${t}`, r = { chains: [], methods: [], events: [], defaultChain: t };
    this.namespaces[s] ? this.namespaces[s] && (this.namespaces[s].defaultChain = t) : this.namespaces[s] = r;
  }
  onConnect() {
    this.createProviders(), this.events.emit("connect", { session: this.session });
  }
  async cleanup() {
    this.namespaces = void 0, this.optionalNamespaces = void 0, this.sessionProperties = void 0, await this.deleteFromStore("namespaces"), await this.deleteFromStore("optionalNamespaces"), await this.deleteFromStore("sessionProperties"), this.session = void 0, await this.cleanupPendingPairings({ deletePairings: !0 }), await this.cleanupStorage();
  }
  async persist(e, t) {
    var s;
    const r = ((s = this.session) == null ? void 0 : s.topic) || "";
    await this.client.core.storage.setItem(`${Zi}/${e}${r}`, t);
  }
  async getFromStore(e) {
    var t;
    const s = ((t = this.session) == null ? void 0 : t.topic) || "";
    return await this.client.core.storage.getItem(`${Zi}/${e}${s}`);
  }
  async deleteFromStore(e) {
    var t;
    const s = ((t = this.session) == null ? void 0 : t.topic) || "";
    await this.client.core.storage.removeItem(`${Zi}/${e}${s}`);
  }
  async cleanupStorage() {
    var e;
    try {
      if (((e = this.client) == null ? void 0 : e.session.length) > 0) return;
      const t = await this.client.core.storage.getKeys();
      for (const s of t) s.startsWith(Zi) && await this.client.core.storage.removeItem(s);
    } catch (t) {
      this.logger.warn("Failed to cleanup storage", t);
    }
  }
};
const Jm = Wm, Qm = "wc", Ym = "ethereum_provider", Zm = `${Qm}@2:${Ym}:`, Xm = "https://rpc.walletconnect.org/v1/", wr = ["eth_sendTransaction", "personal_sign"], ew = ["eth_accounts", "eth_requestAccounts", "eth_sendRawTransaction", "eth_sign", "eth_signTransaction", "eth_signTypedData", "eth_signTypedData_v3", "eth_signTypedData_v4", "eth_sendTransaction", "personal_sign", "wallet_switchEthereumChain", "wallet_addEthereumChain", "wallet_getPermissions", "wallet_requestPermissions", "wallet_registerOnboarding", "wallet_watchAsset", "wallet_scanQRCode", "wallet_sendCalls", "wallet_getCapabilities", "wallet_getCallsStatus", "wallet_showCallsStatus"], br = ["chainChanged", "accountsChanged"], tw = ["chainChanged", "accountsChanged", "message", "disconnect", "connect"], iw = async () => {
  const { createAppKit: i } = await import("./core-CPzRvkzn.js").then((e) => e.u);
  return i;
};
var sw = Object.defineProperty, rw = Object.defineProperties, nw = Object.getOwnPropertyDescriptors, Po = Object.getOwnPropertySymbols, ow = Object.prototype.hasOwnProperty, aw = Object.prototype.propertyIsEnumerable, vr = (i, e, t) => e in i ? sw(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t, At = (i, e) => {
  for (var t in e || (e = {})) ow.call(e, t) && vr(i, t, e[t]);
  if (Po) for (var t of Po(e)) aw.call(e, t) && vr(i, t, e[t]);
  return i;
}, Oi = (i, e) => rw(i, nw(e)), Ce = (i, e, t) => vr(i, typeof e != "symbol" ? e + "" : e, t);
function us(i) {
  return Number(i[0].split(":")[1]);
}
function is(i) {
  return `0x${i.toString(16)}`;
}
function cw(i) {
  const { chains: e, optionalChains: t, methods: s, optionalMethods: r, events: n, optionalEvents: o, rpcMap: a } = i;
  if (!Ge(e)) throw new Error("Invalid chains");
  const c = { chains: e, methods: s || wr, events: n || br, rpcMap: At({}, e.length ? { [us(e)]: a[us(e)] } : {}) }, h = n == null ? void 0 : n.filter((d) => !br.includes(d)), l = s == null ? void 0 : s.filter((d) => !wr.includes(d));
  if (!t && !o && !r && !(h != null && h.length) && !(l != null && l.length)) return { required: e.length ? c : void 0 };
  const u = (h == null ? void 0 : h.length) && (l == null ? void 0 : l.length) || !t, p = { chains: [...new Set(u ? c.chains.concat(t || []) : t)], methods: [...new Set(c.methods.concat(r != null && r.length ? r : ew))], events: [...new Set(c.events.concat(o != null && o.length ? o : tw))], rpcMap: a };
  return { required: e.length ? c : void 0, optional: t.length ? p : void 0 };
}
class jr {
  constructor() {
    Ce(this, "events", new It.EventEmitter()), Ce(this, "namespace", "eip155"), Ce(this, "accounts", []), Ce(this, "signer"), Ce(this, "chainId", 1), Ce(this, "modal"), Ce(this, "rpc"), Ce(this, "STORAGE_KEY", Zm), Ce(this, "on", (e, t) => (this.events.on(e, t), this)), Ce(this, "once", (e, t) => (this.events.once(e, t), this)), Ce(this, "removeListener", (e, t) => (this.events.removeListener(e, t), this)), Ce(this, "off", (e, t) => (this.events.off(e, t), this)), Ce(this, "parseAccount", (e) => this.isCompatibleChainId(e) ? this.parseAccountId(e).address : e), this.signer = {}, this.rpc = {};
  }
  static async init(e) {
    const t = new jr();
    return await t.initialize(e), t;
  }
  async request(e, t) {
    return await this.signer.request(e, this.formatChainId(this.chainId), t);
  }
  sendAsync(e, t, s) {
    this.signer.sendAsync(e, t, this.formatChainId(this.chainId), s);
  }
  get connected() {
    return this.signer.client ? this.signer.client.core.relayer.connected : !1;
  }
  get connecting() {
    return this.signer.client ? this.signer.client.core.relayer.connecting : !1;
  }
  async enable() {
    return this.session || await this.connect(), await this.request({ method: "eth_requestAccounts" });
  }
  async connect(e) {
    var t;
    if (!this.signer.client) throw new Error("Provider not initialized. Call init() first");
    this.loadConnectOpts(e);
    const { required: s, optional: r } = cw(this.rpc);
    try {
      const n = await new Promise(async (a, c) => {
        var h, l;
        this.rpc.showQrModal && ((h = this.modal) == null || h.open(), (l = this.modal) == null || l.subscribeState((p) => {
          !p.open && !this.signer.session && (this.signer.abortPairingAttempt(), c(new Error("Connection request reset. Please try again.")));
        }));
        const u = e != null && e.scopedProperties ? { [this.namespace]: e.scopedProperties } : void 0;
        await this.signer.connect(Oi(At({ namespaces: At({}, s && { [this.namespace]: s }) }, r && { optionalNamespaces: { [this.namespace]: r } }), { pairingTopic: e == null ? void 0 : e.pairingTopic, scopedProperties: u })).then((p) => {
          a(p);
        }).catch((p) => {
          var d;
          (d = this.modal) == null || d.showErrorMessage("Unable to connect"), c(new Error(p.message));
        });
      });
      if (!n) return;
      const o = Ur(n.namespaces, [this.namespace]);
      this.setChainIds(this.rpc.chains.length ? this.rpc.chains : o), this.setAccounts(o), this.events.emit("connect", { chainId: is(this.chainId) });
    } catch (n) {
      throw this.signer.logger.error(n), n;
    } finally {
      (t = this.modal) == null || t.close();
    }
  }
  async authenticate(e, t) {
    var s;
    if (!this.signer.client) throw new Error("Provider not initialized. Call init() first");
    this.loadConnectOpts({ chains: e == null ? void 0 : e.chains });
    try {
      const r = await new Promise(async (o, a) => {
        var c, h;
        this.rpc.showQrModal && ((c = this.modal) == null || c.open(), (h = this.modal) == null || h.subscribeState((l) => {
          !l.open && !this.signer.session && (this.signer.abortPairingAttempt(), a(new Error("Connection request reset. Please try again.")));
        })), await this.signer.authenticate(Oi(At({}, e), { chains: this.rpc.chains }), t).then((l) => {
          o(l);
        }).catch((l) => {
          var u;
          (u = this.modal) == null || u.showErrorMessage("Unable to connect"), a(new Error(l.message));
        });
      }), n = r.session;
      if (n) {
        const o = Ur(n.namespaces, [this.namespace]);
        this.setChainIds(this.rpc.chains.length ? this.rpc.chains : o), this.setAccounts(o), this.events.emit("connect", { chainId: is(this.chainId) });
      }
      return r;
    } catch (r) {
      throw this.signer.logger.error(r), r;
    } finally {
      (s = this.modal) == null || s.close();
    }
  }
  async disconnect() {
    this.session && await this.signer.disconnect(), this.reset();
  }
  get isWalletConnect() {
    return !0;
  }
  get session() {
    return this.signer.session;
  }
  registerEventListeners() {
    this.signer.on("session_event", (e) => {
      const { params: t } = e, { event: s } = t;
      s.name === "accountsChanged" ? (this.accounts = this.parseAccounts(s.data), this.events.emit("accountsChanged", this.accounts)) : s.name === "chainChanged" ? this.setChainId(this.formatChainId(s.data)) : this.events.emit(s.name, s.data), this.events.emit("session_event", e);
    }), this.signer.on("accountsChanged", (e) => {
      this.accounts = this.parseAccounts(e), this.events.emit("accountsChanged", this.accounts);
    }), this.signer.on("chainChanged", (e) => {
      const t = parseInt(e);
      this.chainId = t, this.events.emit("chainChanged", is(this.chainId)), this.persist();
    }), this.signer.on("session_update", (e) => {
      this.events.emit("session_update", e);
    }), this.signer.on("session_delete", (e) => {
      this.reset(), this.events.emit("session_delete", e), this.events.emit("disconnect", Oi(At({}, J("USER_DISCONNECTED")), { data: e.topic, name: "USER_DISCONNECTED" }));
    }), this.signer.on("display_uri", (e) => {
      this.events.emit("display_uri", e);
    });
  }
  switchEthereumChain(e) {
    this.request({ method: "wallet_switchEthereumChain", params: [{ chainId: e.toString(16) }] });
  }
  isCompatibleChainId(e) {
    return typeof e == "string" ? e.startsWith(`${this.namespace}:`) : !1;
  }
  formatChainId(e) {
    return `${this.namespace}:${e}`;
  }
  parseChainId(e) {
    return Number(e.split(":")[1]);
  }
  setChainIds(e) {
    const t = e.filter((s) => this.isCompatibleChainId(s)).map((s) => this.parseChainId(s));
    t.length && (this.chainId = t[0], this.events.emit("chainChanged", is(this.chainId)), this.persist());
  }
  setChainId(e) {
    if (this.isCompatibleChainId(e)) {
      const t = this.parseChainId(e);
      this.chainId = t, this.switchEthereumChain(t);
    }
  }
  parseAccountId(e) {
    const [t, s, r] = e.split(":");
    return { chainId: `${t}:${s}`, address: r };
  }
  setAccounts(e) {
    this.accounts = e.filter((t) => this.parseChainId(this.parseAccountId(t).chainId) === this.chainId).map((t) => this.parseAccountId(t).address), this.events.emit("accountsChanged", this.accounts);
  }
  getRpcConfig(e) {
    var t, s;
    const r = (t = e == null ? void 0 : e.chains) != null ? t : [], n = (s = e == null ? void 0 : e.optionalChains) != null ? s : [], o = r.concat(n);
    if (!o.length) throw new Error("No chains specified in either `chains` or `optionalChains`");
    const a = r.length ? (e == null ? void 0 : e.methods) || wr : [], c = r.length ? (e == null ? void 0 : e.events) || br : [], h = (e == null ? void 0 : e.optionalMethods) || [], l = (e == null ? void 0 : e.optionalEvents) || [], u = (e == null ? void 0 : e.rpcMap) || this.buildRpcMap(o, e.projectId), p = (e == null ? void 0 : e.qrModalOptions) || void 0;
    return { chains: r == null ? void 0 : r.map((d) => this.formatChainId(d)), optionalChains: n.map((d) => this.formatChainId(d)), methods: a, events: c, optionalMethods: h, optionalEvents: l, rpcMap: u, showQrModal: !!(e != null && e.showQrModal), qrModalOptions: p, projectId: e.projectId, metadata: e.metadata };
  }
  buildRpcMap(e, t) {
    const s = {};
    return e.forEach((r) => {
      s[r] = this.getRpcUrl(r, t);
    }), s;
  }
  async initialize(e) {
    if (this.rpc = this.getRpcConfig(e), this.chainId = this.rpc.chains.length ? us(this.rpc.chains) : us(this.rpc.optionalChains), this.signer = await Jm.init({ projectId: this.rpc.projectId, metadata: this.rpc.metadata, disableProviderPing: e.disableProviderPing, relayUrl: e.relayUrl, storage: e.storage, storageOptions: e.storageOptions, customStoragePrefix: e.customStoragePrefix, telemetryEnabled: e.telemetryEnabled, logger: e.logger }), this.registerEventListeners(), await this.loadPersistedSession(), this.rpc.showQrModal) {
      let t;
      try {
        const s = await iw(), { convertWCMToAppKitOptions: r } = await Promise.resolve().then(function() {
          return ww;
        }), n = r(Oi(At({}, this.rpc.qrModalOptions), { chains: [.../* @__PURE__ */ new Set([...this.rpc.chains, ...this.rpc.optionalChains])], metadata: this.rpc.metadata, projectId: this.rpc.projectId }));
        if (!n.networks.length) throw new Error("No networks found for WalletConnect·");
        t = s(Oi(At({}, n), { universalProvider: this.signer, manualWCControl: !0 }));
      } catch (s) {
        throw console.warn(s), new Error("To use QR modal, please install @reown/appkit package");
      }
      if (t) try {
        this.modal = t;
      } catch (s) {
        throw this.signer.logger.error(s), new Error("Could not generate WalletConnectModal Instance");
      }
    }
  }
  loadConnectOpts(e) {
    if (!e) return;
    const { chains: t, optionalChains: s, rpcMap: r } = e;
    t && Ge(t) && (this.rpc.chains = t.map((n) => this.formatChainId(n)), t.forEach((n) => {
      this.rpc.rpcMap[n] = (r == null ? void 0 : r[n]) || this.getRpcUrl(n);
    })), s && Ge(s) && (this.rpc.optionalChains = [], this.rpc.optionalChains = s == null ? void 0 : s.map((n) => this.formatChainId(n)), s.forEach((n) => {
      this.rpc.rpcMap[n] = (r == null ? void 0 : r[n]) || this.getRpcUrl(n);
    }));
  }
  getRpcUrl(e, t) {
    var s;
    return ((s = this.rpc.rpcMap) == null ? void 0 : s[e]) || `${Xm}?chainId=eip155:${e}&projectId=${t || this.rpc.projectId}`;
  }
  async loadPersistedSession() {
    if (this.session) try {
      const e = await this.signer.client.core.storage.getItem(`${this.STORAGE_KEY}/chainId`), t = this.session.namespaces[`${this.namespace}:${e}`] ? this.session.namespaces[`${this.namespace}:${e}`] : this.session.namespaces[this.namespace];
      this.setChainIds(e ? [this.formatChainId(e)] : t == null ? void 0 : t.accounts), this.setAccounts(t == null ? void 0 : t.accounts);
    } catch (e) {
      this.signer.logger.error("Failed to load persisted session, clearing state..."), this.signer.logger.error(e), await this.disconnect().catch((t) => this.signer.logger.warn(t));
    }
  }
  reset() {
    this.chainId = 1, this.accounts = [];
  }
  persist() {
    this.session && this.signer.client.core.storage.setItem(`${this.STORAGE_KEY}/chainId`, this.chainId);
  }
  parseAccounts(e) {
    return typeof e == "string" || e instanceof String ? [this.parseAccount(e)] : e.map((t) => this.parseAccount(t));
  }
}
const Fw = jr;
var hw = Object.defineProperty, lw = Object.defineProperties, uw = Object.getOwnPropertyDescriptors, _o = Object.getOwnPropertySymbols, pw = Object.prototype.hasOwnProperty, dw = Object.prototype.propertyIsEnumerable, $o = (i, e, t) => e in i ? hw(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t, Va = (i, e) => {
  for (var t in e || (e = {})) pw.call(e, t) && $o(i, t, e[t]);
  if (_o) for (var t of _o(e)) dw.call(e, t) && $o(i, t, e[t]);
  return i;
}, gw = (i, e) => lw(i, uw(e));
function fw(i) {
  if (i) return { "--w3m-font-family": i["--wcm-font-family"], "--w3m-accent": i["--wcm-accent-color"], "--w3m-color-mix": i["--wcm-background-color"], "--w3m-z-index": i["--wcm-z-index"] ? Number(i["--wcm-z-index"]) : void 0, "--w3m-qr-color": i["--wcm-accent-color"], "--w3m-font-size-master": i["--wcm-text-medium-regular-size"], "--w3m-border-radius-master": i["--wcm-container-border-radius"], "--w3m-color-mix-strength": 0 };
}
const yw = (i) => {
  const [e, t] = i.split(":");
  return Ka({ id: t, caipNetworkId: i, chainNamespace: e, name: "", nativeCurrency: { name: "", symbol: "", decimals: 8 }, rpcUrls: { default: { http: ["https://rpc.walletconnect.org/v1"] } } });
};
function mw(i) {
  var e, t, s, r, n, o, a;
  const c = (e = i.chains) == null ? void 0 : e.map(yw).filter(Boolean);
  if (c.length === 0) throw new Error("At least one chain must be specified");
  const h = c.find((u) => {
    var p;
    return u.id === ((p = i.defaultChain) == null ? void 0 : p.id);
  }), l = { projectId: i.projectId, networks: c, themeMode: i.themeMode, themeVariables: fw(i.themeVariables), chainImages: i.chainImages, connectorImages: i.walletImages, defaultNetwork: h, metadata: gw(Va({}, i.metadata), { name: ((t = i.metadata) == null ? void 0 : t.name) || "WalletConnect", description: ((s = i.metadata) == null ? void 0 : s.description) || "Connect to WalletConnect-compatible wallets", url: ((r = i.metadata) == null ? void 0 : r.url) || "https://walletconnect.org", icons: ((n = i.metadata) == null ? void 0 : n.icons) || ["https://walletconnect.org/walletconnect-logo.png"] }), showWallets: !0, featuredWalletIds: i.explorerRecommendedWalletIds === "NONE" ? [] : Array.isArray(i.explorerRecommendedWalletIds) ? i.explorerRecommendedWalletIds : [], excludeWalletIds: i.explorerExcludedWalletIds === "ALL" ? [] : Array.isArray(i.explorerExcludedWalletIds) ? i.explorerExcludedWalletIds : [], enableEIP6963: !1, enableInjected: !1, enableCoinbase: !0, enableWalletConnect: !0, features: { email: !1, socials: !1 } };
  if ((o = i.mobileWallets) != null && o.length || (a = i.desktopWallets) != null && a.length) {
    const u = [...(i.mobileWallets || []).map((f) => ({ id: f.id, name: f.name, links: f.links })), ...(i.desktopWallets || []).map((f) => ({ id: f.id, name: f.name, links: { native: f.links.native, universal: f.links.universal } }))], p = [...l.featuredWalletIds || [], ...l.excludeWalletIds || []], d = u.filter((f) => !p.includes(f.id));
    d.length && (l.customWallets = d);
  }
  return l;
}
function Ka(i) {
  return Va({ formatters: void 0, fees: void 0, serializers: void 0 }, i);
}
var ww = Object.freeze({ __proto__: null, convertWCMToAppKitOptions: mw, defineChain: Ka });
export {
  Fw as EthereumProvider,
  tw as OPTIONAL_EVENTS,
  ew as OPTIONAL_METHODS,
  br as REQUIRED_EVENTS,
  wr as REQUIRED_METHODS,
  jr as default
};
