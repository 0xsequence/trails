import { ap as b, aq as x, ar as F, as as S, at as $, au as w, av as L, aw as O, ax as M, ay as E, az as D, aA as y, aB as G, aC as A, aD as I, aE as C, aF as m, aG as T, aH as H, aI as v, aJ as B, aK as U, aL as R, $ as j } from "./prepareSend-56cmiyOF.js";
function J(a) {
  const { abi: n, data: e } = a, s = b(e, 0, 4), t = n.find((o) => o.type === "function" && s === x(F(o)));
  if (!t)
    throw new S(s, {
      docsPath: "/docs/contract/decodeFunctionData"
    });
  return {
    functionName: t.name,
    args: "inputs" in t && t.inputs && t.inputs.length > 0 ? $(t.inputs, b(e, 4)) : void 0
  };
}
class _ extends w {
  constructor({ callbackSelector: n, cause: e, data: s, extraData: t, sender: o, urls: r }) {
    var c;
    super(e.shortMessage || "An error occurred while fetching for an offchain result.", {
      cause: e,
      metaMessages: [
        ...e.metaMessages || [],
        (c = e.metaMessages) != null && c.length ? "" : [],
        "Offchain Gateway Call:",
        r && [
          "  Gateway URL(s):",
          ...r.map((u) => `    ${L(u)}`)
        ],
        `  Sender: ${o}`,
        `  Data: ${s}`,
        `  Callback selector: ${n}`,
        `  Extra data: ${t}`
      ].flat(),
      name: "OffchainLookupError"
    });
  }
}
class z extends w {
  constructor({ result: n, url: e }) {
    super("Offchain gateway response is malformed. Response data must be a hex value.", {
      metaMessages: [
        `Gateway URL: ${L(e)}`,
        `Response: ${O(n)}`
      ],
      name: "OffchainLookupResponseMalformedError"
    });
  }
}
class K extends w {
  constructor({ sender: n, to: e }) {
    super("Reverted sender address does not match target contract address (`to`).", {
      metaMessages: [
        `Contract address: ${e}`,
        `OffchainLookup sender address: ${n}`
      ],
      name: "OffchainLookupSenderMismatchError"
    });
  }
}
const p = "/docs/contract/encodeErrorResult";
function k(a) {
  const { abi: n, errorName: e, args: s } = a;
  let t = n[0];
  if (e) {
    const u = M({ abi: n, args: s, name: e });
    if (!u)
      throw new E(e, { docsPath: p });
    t = u;
  }
  if (t.type !== "error")
    throw new E(void 0, { docsPath: p });
  const o = F(t), r = x(o);
  let c = "0x";
  if (s && s.length > 0) {
    if (!t.inputs)
      throw new D(t.name, { docsPath: p });
    c = y(t.inputs, s);
  }
  return G([r, c]);
}
const h = "/docs/contract/encodeFunctionResult";
function W(a) {
  const { abi: n, functionName: e, result: s } = a;
  let t = n[0];
  if (e) {
    const r = M({ abi: n, name: e });
    if (!r)
      throw new A(e, { docsPath: h });
    t = r;
  }
  if (t.type !== "function")
    throw new A(void 0, { docsPath: h });
  if (!t.outputs)
    throw new I(t.name, { docsPath: h });
  const o = (() => {
    if (t.outputs.length === 0)
      return [];
    if (t.outputs.length === 1)
      return [s];
    if (Array.isArray(s))
      return s;
    throw new C(s);
  })();
  return y(t.outputs, o);
}
const N = "x-batch-gateway:true";
async function P(a) {
  const { data: n, ccipRequest: e } = a, { args: [s] } = J({ abi: m, data: n }), t = [], o = [];
  return await Promise.all(s.map(async (r, c) => {
    try {
      o[c] = r.urls.includes(N) ? await P({ data: r.data, ccipRequest: e }) : await e(r), t[c] = !1;
    } catch (u) {
      t[c] = !0, o[c] = Q(u);
    }
  })), W({
    abi: m,
    functionName: "query",
    result: [t, o]
  });
}
function Q(a) {
  return a.name === "HttpRequestError" && a.status ? k({
    abi: m,
    errorName: "HttpError",
    args: [a.status, a.shortMessage]
  }) : k({
    abi: [T],
    errorName: "Error",
    args: ["shortMessage" in a ? a.shortMessage : a.message]
  });
}
const Z = "0x556f1830", V = {
  name: "OffchainLookup",
  type: "error",
  inputs: [
    {
      name: "sender",
      type: "address"
    },
    {
      name: "urls",
      type: "string[]"
    },
    {
      name: "callData",
      type: "bytes"
    },
    {
      name: "callbackFunction",
      type: "bytes4"
    },
    {
      name: "extraData",
      type: "bytes"
    }
  ]
};
async function tt(a, { blockNumber: n, blockTag: e, data: s, to: t }) {
  const { args: o } = H({
    data: s,
    abi: [V]
  }), [r, c, u, f, d] = o, { ccipRead: i } = a, g = i && typeof (i == null ? void 0 : i.request) == "function" ? i.request : X;
  try {
    if (!v(t, r))
      throw new K({ sender: r, to: t });
    const l = c.includes(N) ? await P({
      data: u,
      ccipRequest: g
    }) : await g({ data: u, sender: r, urls: c }), { data: q } = await B(a, {
      blockNumber: n,
      blockTag: e,
      data: U([
        f,
        y([{ type: "bytes" }, { type: "bytes" }], [l, d])
      ]),
      to: t
    });
    return q;
  } catch (l) {
    throw new _({
      callbackSelector: f,
      cause: l,
      data: s,
      extraData: d,
      sender: r,
      urls: c
    });
  }
}
async function X({ data: a, sender: n, urls: e }) {
  var t;
  let s = new Error("An unknown error occurred.");
  for (let o = 0; o < e.length; o++) {
    const r = e[o], c = r.includes("{data}") ? "GET" : "POST", u = c === "POST" ? { data: a, sender: n } : void 0, f = c === "POST" ? { "Content-Type": "application/json" } : {};
    try {
      const d = await fetch(r.replace("{sender}", n.toLowerCase()).replace("{data}", a), {
        body: JSON.stringify(u),
        headers: f,
        method: c
      });
      let i;
      if ((t = d.headers.get("Content-Type")) != null && t.startsWith("application/json") ? i = (await d.json()).data : i = await d.text(), !d.ok) {
        s = new R({
          body: u,
          details: i != null && i.error ? O(i.error) : d.statusText,
          headers: d.headers,
          status: d.status,
          url: r
        });
        continue;
      }
      if (!j(i)) {
        s = new z({
          result: i,
          url: r
        });
        continue;
      }
      return i;
    } catch (d) {
      s = new R({
        body: u,
        details: d.message,
        url: r
      });
    }
  }
  throw s;
}
export {
  X as ccipRequest,
  tt as offchainLookup,
  V as offchainLookupAbiItem,
  Z as offchainLookupSignature
};
