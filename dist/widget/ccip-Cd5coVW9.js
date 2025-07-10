import { al as b, am as x, an as F, ao as S, ap as $, aq as w, ar as O, as as L, at as M, au as E, av as D, aw as y, ax as G, ay as A, az as C, aA as I, aB as m, aC as T, aD as H, aE as v, aF as B, aG as U, aH as R, a1 as j } from "./tokenBalances-CTsCfgjB.js";
function _(a) {
  const { abi: r, data: e } = a, s = b(e, 0, 4), t = r.find((o) => o.type === "function" && s === x(F(o)));
  if (!t)
    throw new S(s, {
      docsPath: "/docs/contract/decodeFunctionData"
    });
  return {
    functionName: t.name,
    args: "inputs" in t && t.inputs && t.inputs.length > 0 ? $(t.inputs, b(e, 4)) : void 0
  };
}
class z extends w {
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
          ...n.map((u) => `    ${O(u)}`)
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
        `Gateway URL: ${O(e)}`,
        `Response: ${L(r)}`
      ],
      name: "OffchainLookupResponseMalformedError"
    });
  }
}
class W extends w {
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
  const o = F(t), n = x(o);
  let c = "0x";
  if (s && s.length > 0) {
    if (!t.inputs)
      throw new D(t.name, { docsPath: p });
    c = y(t.inputs, s);
  }
  return G([n, c]);
}
const h = "/docs/contract/encodeFunctionResult";
function K(a) {
  const { abi: r, functionName: e, result: s } = a;
  let t = r[0];
  if (e) {
    const n = M({ abi: r, name: e });
    if (!n)
      throw new A(e, { docsPath: h });
    t = n;
  }
  if (t.type !== "function")
    throw new A(void 0, { docsPath: h });
  if (!t.outputs)
    throw new C(t.name, { docsPath: h });
  const o = (() => {
    if (t.outputs.length === 0)
      return [];
    if (t.outputs.length === 1)
      return [s];
    if (Array.isArray(s))
      return s;
    throw new I(s);
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
      t[c] = !0, o[c] = Q(u);
    }
  })), K({
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
async function tt(a, { blockNumber: r, blockTag: e, data: s, to: t }) {
  const { args: o } = H({
    data: s,
    abi: [V]
  }), [n, c, u, f, d] = o, { ccipRead: i } = a, g = i && typeof (i == null ? void 0 : i.request) == "function" ? i.request : X;
  try {
    if (!v(t, n))
      throw new W({ sender: n, to: t });
    const l = c.includes(N) ? await P({
      data: u,
      ccipRequest: g
    }) : await g({ data: u, sender: n, urls: c }), { data: q } = await B(a, {
      blockNumber: r,
      blockTag: e,
      data: U([
        f,
        y([{ type: "bytes" }, { type: "bytes" }], [l, d])
      ]),
      to: t
    });
    return q;
  } catch (l) {
    throw new z({
      callbackSelector: f,
      cause: l,
      data: s,
      extraData: d,
      sender: n,
      urls: c
    });
  }
}
async function X({ data: a, sender: r, urls: e }) {
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
        s = new R({
          body: u,
          details: i != null && i.error ? L(i.error) : d.statusText,
          headers: d.headers,
          status: d.status,
          url: n
        });
        continue;
      }
      if (!j(i)) {
        s = new J({
          result: i,
          url: n
        });
        continue;
      }
      return i;
    } catch (d) {
      s = new R({
        body: u,
        details: d.message,
        url: n
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
