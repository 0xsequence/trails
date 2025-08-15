import { V as b, W as O, X as x, Y as $, Z as q, _ as w, $ as F, a0 as L, a1 as M, a2 as E, a3 as D, a4 as y, a5 as G, a6 as R, a7 as I, a8 as T, a9 as m, aa as C, ab as H, ac as v, ad as U, ae as j, af as A, ag as B } from "./prepareSend-CyXootal.js";
function _(a) {
  const { abi: r, data: e } = a, s = b(e, 0, 4), t = r.find((o) => o.type === "function" && s === O(x(o)));
  if (!t)
    throw new $(s, {
      docsPath: "/docs/contract/decodeFunctionData"
    });
  return {
    functionName: t.name,
    args: "inputs" in t && t.inputs && t.inputs.length > 0 ? q(t.inputs, b(e, 4)) : void 0
  };
}
class W extends w {
  constructor({ callbackSelector: r, cause: e, data: s, extraData: t, sender: o, urls: n }) {
    var c;
    super(e.shortMessage || "An error occurred while fetching for an offchain result.", {
      cause: e,
      metaMessages: [
        ...e.metaMessages || [],
        (c = e.metaMessages) != null && c.length ? "" : [],
        "Offchain Gateway Call:",
        n && [
          "  Gateway URL(s):",
          ...n.map((u) => `    ${F(u)}`)
        ],
        `  Sender: ${o}`,
        `  Data: ${s}`,
        `  Callback selector: ${r}`,
        `  Extra data: ${t}`
      ].flat(),
      name: "OffchainLookupError"
    });
  }
}
class J extends w {
  constructor({ result: r, url: e }) {
    super("Offchain gateway response is malformed. Response data must be a hex value.", {
      metaMessages: [
        `Gateway URL: ${F(e)}`,
        `Response: ${L(r)}`
      ],
      name: "OffchainLookupResponseMalformedError"
    });
  }
}
class V extends w {
  constructor({ sender: r, to: e }) {
    super("Reverted sender address does not match target contract address (`to`).", {
      metaMessages: [
        `Contract address: ${e}`,
        `OffchainLookup sender address: ${r}`
      ],
      name: "OffchainLookupSenderMismatchError"
    });
  }
}
const p = "/docs/contract/encodeErrorResult";
function k(a) {
  const { abi: r, errorName: e, args: s } = a;
  let t = r[0];
  if (e) {
    const u = M({ abi: r, args: s, name: e });
    if (!u)
      throw new E(e, { docsPath: p });
    t = u;
  }
  if (t.type !== "error")
    throw new E(void 0, { docsPath: p });
  const o = x(t), n = O(o);
  let c = "0x";
  if (s && s.length > 0) {
    if (!t.inputs)
      throw new D(t.name, { docsPath: p });
    c = y(t.inputs, s);
  }
  return G([n, c]);
}
const h = "/docs/contract/encodeFunctionResult";
function X(a) {
  const { abi: r, functionName: e, result: s } = a;
  let t = r[0];
  if (e) {
    const n = M({ abi: r, name: e });
    if (!n)
      throw new R(e, { docsPath: h });
    t = n;
  }
  if (t.type !== "function")
    throw new R(void 0, { docsPath: h });
  if (!t.outputs)
    throw new I(t.name, { docsPath: h });
  const o = (() => {
    if (t.outputs.length === 0)
      return [];
    if (t.outputs.length === 1)
      return [s];
    if (Array.isArray(s))
      return s;
    throw new T(s);
  })();
  return y(t.outputs, o);
}
const N = "x-batch-gateway:true";
async function P(a) {
  const { data: r, ccipRequest: e } = a, { args: [s] } = _({ abi: m, data: r }), t = [], o = [];
  return await Promise.all(s.map(async (n, c) => {
    try {
      o[c] = n.urls.includes(N) ? await P({ data: n.data, ccipRequest: e }) : await e(n), t[c] = !1;
    } catch (u) {
      t[c] = !0, o[c] = Y(u);
    }
  })), X({
    abi: m,
    functionName: "query",
    result: [t, o]
  });
}
function Y(a) {
  return a.name === "HttpRequestError" && a.status ? k({
    abi: m,
    errorName: "HttpError",
    args: [a.status, a.shortMessage]
  }) : k({
    abi: [C],
    errorName: "Error",
    args: ["shortMessage" in a ? a.shortMessage : a.message]
  });
}
const Q = "0x556f1830", Z = {
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
async function tt(a, { blockNumber: r, blockTag: e, data: s, to: t }) {
  const { args: o } = H({
    data: s,
    abi: [Z]
  }), [n, c, u, f, d] = o, { ccipRead: i } = a, g = i && typeof (i == null ? void 0 : i.request) == "function" ? i.request : z;
  try {
    if (!v(t, n))
      throw new V({ sender: n, to: t });
    const l = c.includes(N) ? await P({
      data: u,
      ccipRequest: g
    }) : await g({ data: u, sender: n, urls: c }), { data: S } = await U(a, {
      blockNumber: r,
      blockTag: e,
      data: j([
        f,
        y([{ type: "bytes" }, { type: "bytes" }], [l, d])
      ]),
      to: t
    });
    return S;
  } catch (l) {
    throw new W({
      callbackSelector: f,
      cause: l,
      data: s,
      extraData: d,
      sender: n,
      urls: c
    });
  }
}
async function z({ data: a, sender: r, urls: e }) {
  var t;
  let s = new Error("An unknown error occurred.");
  for (let o = 0; o < e.length; o++) {
    const n = e[o], c = n.includes("{data}") ? "GET" : "POST", u = c === "POST" ? { data: a, sender: r } : void 0, f = c === "POST" ? { "Content-Type": "application/json" } : {};
    try {
      const d = await fetch(n.replace("{sender}", r.toLowerCase()).replace("{data}", a), {
        body: JSON.stringify(u),
        headers: f,
        method: c
      });
      let i;
      if ((t = d.headers.get("Content-Type")) != null && t.startsWith("application/json") ? i = (await d.json()).data : i = await d.text(), !d.ok) {
        s = new A({
          body: u,
          details: i != null && i.error ? L(i.error) : d.statusText,
          headers: d.headers,
          status: d.status,
          url: n
        });
        continue;
      }
      if (!B(i)) {
        s = new J({
          result: i,
          url: n
        });
        continue;
      }
      return i;
    } catch (d) {
      s = new A({
        body: u,
        details: d.message,
        url: n
      });
    }
  }
  throw s;
}
export {
  z as ccipRequest,
  tt as offchainLookup,
  Z as offchainLookupAbiItem,
  Q as offchainLookupSignature
};
