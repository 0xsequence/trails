import { b as u } from "./index-BTADCVrB.js";
function s(e = 0) {
  return globalThis.Buffer != null && globalThis.Buffer.allocUnsafe != null ? globalThis.Buffer.allocUnsafe(e) : new Uint8Array(e);
}
function b(e, t) {
  t || (t = e.reduce((f, a) => f + a.length, 0));
  const r = s(t);
  let o = 0;
  for (const f of e)
    r.set(f, o), o += f.length;
  return r;
}
function c(e, t, r, o) {
  return {
    name: e,
    prefix: t,
    encoder: {
      name: e,
      prefix: t,
      encode: r
    },
    decoder: { decode: o }
  };
}
const l = c("utf8", "u", (e) => "u" + new TextDecoder("utf8").decode(e), (e) => new TextEncoder().encode(e.substring(1))), n = c("ascii", "a", (e) => {
  let t = "a";
  for (let r = 0; r < e.length; r++)
    t += String.fromCharCode(e[r]);
  return t;
}, (e) => {
  e = e.substring(1);
  const t = s(e.length);
  for (let r = 0; r < e.length; r++)
    t[r] = e.charCodeAt(r);
  return t;
}), i = {
  utf8: l,
  "utf-8": l,
  hex: u.base16,
  latin1: n,
  ascii: n,
  binary: n,
  ...u
};
function h(e, t = "utf8") {
  const r = i[t];
  if (!r)
    throw new Error(`Unsupported encoding "${t}"`);
  return (t === "utf8" || t === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null ? globalThis.Buffer.from(e, "utf8") : r.decoder.decode(`${r.prefix}${e}`);
}
function g(e, t = "utf8") {
  const r = i[t];
  if (!r)
    throw new Error(`Unsupported encoding "${t}"`);
  return (t === "utf8" || t === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null ? globalThis.Buffer.from(e.buffer, e.byteOffset, e.byteLength).toString("utf8") : r.encoder.encode(e).substring(1);
}
export {
  b as c,
  h as f,
  g as t
};
