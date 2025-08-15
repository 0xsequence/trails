import { I as Nr, g as Hl, c as U, a as fr, C as Kl, d as yc, e as Vl, f as Gl, s as _n, h as bc, i as Bs, k as ni, A as vc, E as et, j as Jl, l as Yl, y as wt, m as Rs, r as Ar, O as no, o as At, n as Xl, p as oo, q as ao, t as ji, N as co, P as Io, Q as Zl, u as Ql, v as eu, w as No, x as cr, z as Ec, B as Zt, D as qt, F as is, G as Ut } from "./index-BTADCVrB.js";
import { formatUnits as tu, recoverAddress as su, fallback as Ao, http as mi, toHex as _o } from "viem";
import { f as Nt, t as ct, c as zr } from "./to-string-c9IXkpj-.js";
import { B as Tr, i as hr, r as St } from "./lit-element-CWLRvgWK.js";
const z = {
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
    SERVICE_UNAVAILABLE: 503,
    FORBIDDEN: 403
  },
  UNSUPPORTED_NETWORK_NAME: "Unknown Network",
  SECURE_SITE_SDK_ORIGIN: (typeof process < "u" && typeof process.env < "u" ? process.env.NEXT_PUBLIC_SECURE_SITE_ORIGIN : void 0) || "https://secure.walletconnect.org"
}, Cc = {
  caipNetworkIdToNumber(t) {
    return t ? Number(t.split(":")[1]) : void 0;
  },
  parseEvmChainId(t) {
    return typeof t == "string" ? this.caipNetworkIdToNumber(t) : t;
  },
  getNetworksByNamespace(t, e) {
    return (t == null ? void 0 : t.filter((s) => s.chainNamespace === e)) || [];
  },
  getFirstNetworkByNamespace(t, e) {
    return this.getNetworksByNamespace(t, e)[0];
  },
  getNetworkNameByCaipNetworkId(t, e) {
    var i;
    if (!e)
      return;
    const s = t.find((n) => n.caipNetworkId === e);
    if (s)
      return s.name;
    const [r] = e.split(":");
    return ((i = z.CHAIN_NAME_MAP) == null ? void 0 : i[r]) || void 0;
  }
}, ru = {
  bigNumber(t) {
    return t ? new Tr(t) : new Tr(0);
  },
  multiply(t, e) {
    if (t === void 0 || e === void 0)
      return new Tr(0);
    const s = new Tr(t), r = new Tr(e);
    return s.times(r);
  },
  formatNumberToLocalString(t, e = 2) {
    return t === void 0 ? "0.00" : typeof t == "number" ? t.toLocaleString("en-US", {
      maximumFractionDigits: e,
      minimumFractionDigits: e
    }) : parseFloat(t).toLocaleString("en-US", {
      maximumFractionDigits: e,
      minimumFractionDigits: e
    });
  },
  parseLocalStringToNumber(t) {
    return t === void 0 ? 0 : parseFloat(t.replace(/,/gu, ""));
  }
}, iu = [
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
], nu = [
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
], ou = [
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
], au = {
  getERC20Abi: (t) => z.USDT_CONTRACT_ADDRESSES.includes(t) ? ou : iu,
  getSwapAbi: () => nu
}, ns = {
  validateCaipAddress(t) {
    var e;
    if (((e = t.split(":")) == null ? void 0 : e.length) !== 3)
      throw new Error("Invalid CAIP Address");
    return t;
  },
  parseCaipAddress(t) {
    const e = t.split(":");
    if (e.length !== 3)
      throw new Error(`Invalid CAIP-10 address: ${t}`);
    const [s, r, i] = e;
    if (!s || !r || !i)
      throw new Error(`Invalid CAIP-10 address: ${t}`);
    return {
      chainNamespace: s,
      chainId: r,
      address: i
    };
  },
  parseCaipNetworkId(t) {
    const e = t.split(":");
    if (e.length !== 2)
      throw new Error(`Invalid CAIP-2 network id: ${t}`);
    const [s, r] = e;
    if (!s || !r)
      throw new Error(`Invalid CAIP-2 network id: ${t}`);
    return {
      chainNamespace: s,
      chainId: r
    };
  }
}, ee = {
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
  CONNECTIONS: "@appkit/connections"
};
function Xi(t) {
  if (!t)
    throw new Error("Namespace is required for CONNECTED_CONNECTOR_ID");
  return `@appkit/${t}:connected_connector_id`;
}
const Z = {
  setItem(t, e) {
    Fr() && e !== void 0 && localStorage.setItem(t, e);
  },
  getItem(t) {
    if (Fr())
      return localStorage.getItem(t) || void 0;
  },
  removeItem(t) {
    Fr() && localStorage.removeItem(t);
  },
  clear() {
    Fr() && localStorage.clear();
  }
};
function Fr() {
  return typeof window < "u" && typeof localStorage < "u";
}
function gs(t, e) {
  return e === "light" ? {
    "--w3m-accent": (t == null ? void 0 : t["--w3m-accent"]) || "hsla(231, 100%, 70%, 1)",
    "--w3m-background": "#fff"
  } : {
    "--w3m-accent": (t == null ? void 0 : t["--w3m-accent"]) || "hsla(230, 100%, 67%, 1)",
    "--w3m-background": "#121313"
  };
}
const cu = Symbol(), So = Object.getPrototypeOf, Sn = /* @__PURE__ */ new WeakMap(), lu = (t) => t && (Sn.has(t) ? Sn.get(t) : So(t) === Object.prototype || So(t) === Array.prototype), uu = (t) => lu(t) && t[cu] || null, Po = (t, e = !0) => {
  Sn.set(t, e);
}, Ui = {}, Zi = (t) => typeof t == "object" && t !== null, ds = /* @__PURE__ */ new WeakMap(), Mr = /* @__PURE__ */ new WeakSet(), du = (t = Object.is, e = (l, u) => new Proxy(l, u), s = (l) => Zi(l) && !Mr.has(l) && (Array.isArray(l) || !(Symbol.iterator in l)) && !(l instanceof WeakMap) && !(l instanceof WeakSet) && !(l instanceof Error) && !(l instanceof Number) && !(l instanceof Date) && !(l instanceof String) && !(l instanceof RegExp) && !(l instanceof ArrayBuffer), r = (l) => {
  switch (l.status) {
    case "fulfilled":
      return l.value;
    case "rejected":
      throw l.reason;
    default:
      throw l;
  }
}, i = /* @__PURE__ */ new WeakMap(), n = (l, u, d = r) => {
  const h = i.get(l);
  if ((h == null ? void 0 : h[0]) === u)
    return h[1];
  const g = Array.isArray(l) ? [] : Object.create(Object.getPrototypeOf(l));
  return Po(g, !0), i.set(l, [u, g]), Reflect.ownKeys(l).forEach((w) => {
    if (Object.getOwnPropertyDescriptor(g, w))
      return;
    const m = Reflect.get(l, w), { enumerable: f } = Reflect.getOwnPropertyDescriptor(
      l,
      w
    ), y = {
      value: m,
      enumerable: f,
      // This is intentional to avoid copying with proxy-compare.
      // It's still non-writable, so it avoids assigning a value.
      configurable: !0
    };
    if (Mr.has(m))
      Po(m, !1);
    else if (m instanceof Promise)
      delete y.value, y.get = () => d(m);
    else if (ds.has(m)) {
      const [b, E] = ds.get(
        m
      );
      y.value = n(
        b,
        E(),
        d
      );
    }
    Object.defineProperty(g, w, y);
  }), Object.preventExtensions(g);
}, o = /* @__PURE__ */ new WeakMap(), a = [1, 1], c = (l) => {
  if (!Zi(l))
    throw new Error("object required");
  const u = o.get(l);
  if (u)
    return u;
  let d = a[0];
  const h = /* @__PURE__ */ new Set(), g = (v, R = ++a[0]) => {
    d !== R && (d = R, h.forEach((C) => C(v, R)));
  };
  let w = a[1];
  const m = (v = ++a[1]) => (w !== v && !h.size && (w = v, y.forEach(([R]) => {
    const C = R[1](v);
    C > d && (d = C);
  })), d), f = (v) => (R, C) => {
    const L = [...R];
    L[1] = [v, ...L[1]], g(L, C);
  }, y = /* @__PURE__ */ new Map(), b = (v, R) => {
    if ((Ui ? "production" : void 0) !== "production" && y.has(v))
      throw new Error("prop listener already exists");
    if (h.size) {
      const C = R[3](f(v));
      y.set(v, [R, C]);
    } else
      y.set(v, [R]);
  }, E = (v) => {
    var R;
    const C = y.get(v);
    C && (y.delete(v), (R = C[1]) == null || R.call(C));
  }, _ = (v) => (h.add(v), h.size === 1 && y.forEach(([C, L], H) => {
    if ((Ui ? "production" : void 0) !== "production" && L)
      throw new Error("remove already exists");
    const I = C[3](f(H));
    y.set(H, [C, I]);
  }), () => {
    h.delete(v), h.size === 0 && y.forEach(([C, L], H) => {
      L && (L(), y.set(H, [C]));
    });
  }), x = Array.isArray(l) ? [] : Object.create(Object.getPrototypeOf(l)), S = e(x, {
    deleteProperty(v, R) {
      const C = Reflect.get(v, R);
      E(R);
      const L = Reflect.deleteProperty(v, R);
      return L && g(["delete", [R], C]), L;
    },
    set(v, R, C, L) {
      const H = Reflect.has(v, R), I = Reflect.get(v, R, L);
      if (H && (t(I, C) || o.has(C) && t(I, o.get(C))))
        return !0;
      E(R), Zi(C) && (C = uu(C) || C);
      let T = C;
      if (C instanceof Promise)
        C.then((A) => {
          C.status = "fulfilled", C.value = A, g(["resolve", [R], A]);
        }).catch((A) => {
          C.status = "rejected", C.reason = A, g(["reject", [R], A]);
        });
      else {
        !ds.has(C) && s(C) && (T = c(C));
        const A = !Mr.has(T) && ds.get(T);
        A && b(R, A);
      }
      return Reflect.set(v, R, T, L), g(["set", [R], C, I]), !0;
    }
  });
  o.set(l, S);
  const D = [
    x,
    m,
    n,
    _
  ];
  return ds.set(S, D), Reflect.ownKeys(l).forEach((v) => {
    const R = Object.getOwnPropertyDescriptor(
      l,
      v
    );
    "value" in R && (S[v] = l[v], delete R.value, delete R.writable), Object.defineProperty(x, v, R);
  }), S;
}) => [
  // public functions
  c,
  // shared state
  ds,
  Mr,
  // internal things
  t,
  e,
  s,
  r,
  i,
  n,
  o,
  a
], [hu] = du();
function Ae(t = {}) {
  return hu(t);
}
function Ye(t, e, s) {
  const r = ds.get(t);
  (Ui ? "production" : void 0) !== "production" && !r && console.warn("Please use proxy object");
  let i;
  const n = [], o = r[3];
  let a = !1;
  const l = o((u) => {
    n.push(u), i || (i = Promise.resolve().then(() => {
      i = void 0, a && e(n.splice(0));
    }));
  });
  return a = !0, () => {
    a = !1, l();
  };
}
function Qr(t, e) {
  const s = ds.get(t);
  (Ui ? "production" : void 0) !== "production" && !s && console.warn("Please use proxy object");
  const [r, i, n] = s;
  return n(r, i(), e);
}
function Ds(t) {
  return Mr.add(t), t;
}
function Xe(t, e, s, r) {
  let i = t[e];
  return Ye(
    t,
    () => {
      const n = t[e];
      Object.is(i, n) || s(i = n);
    }
  );
}
function pu(t) {
  const e = Ae({
    data: Array.from([]),
    has(s) {
      return this.data.some((r) => r[0] === s);
    },
    set(s, r) {
      const i = this.data.find((n) => n[0] === s);
      return i ? i[1] = r : this.data.push([s, r]), this;
    },
    get(s) {
      var r;
      return (r = this.data.find((i) => i[0] === s)) == null ? void 0 : r[1];
    },
    delete(s) {
      const r = this.data.findIndex((i) => i[0] === s);
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
    forEach(s) {
      this.data.forEach((r) => {
        s(r[1], r[0], this);
      });
    },
    keys() {
      return this.data.map((s) => s[0]).values();
    },
    values() {
      return this.data.map((s) => s[1]).values();
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
typeof process < "u" && typeof process.env < "u" && process.env.NEXT_PUBLIC_SECURE_SITE_ORIGIN;
const Ic = [
  {
    label: "Coinbase",
    name: "coinbase",
    feeRange: "1-2%",
    url: "",
    supportedChains: ["eip155"]
  },
  {
    label: "Meld.io",
    name: "meld",
    feeRange: "1-2%",
    url: "https://meldcrypto.com",
    supportedChains: ["eip155", "solana"]
  }
], gu = "WXETMuFUQmqqybHuRkSgxv:25B8LJHSfpG6LVjR2ytU5Cwh7Z4Sch2ocoU", ve = {
  FOUR_MINUTES_MS: 24e4,
  TEN_SEC_MS: 1e4,
  ONE_SEC_MS: 1e3,
  BALANCE_SUPPORTED_CHAINS: ["eip155", "solana"],
  NAMES_SUPPORTED_CHAIN_NAMESPACES: ["eip155"],
  NATIVE_TOKEN_ADDRESS: {
    eip155: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    solana: "So11111111111111111111111111111111111111111",
    polkadot: "0x",
    bip122: "0x",
    cosmos: "0x"
  },
  CONVERT_SLIPPAGE_TOLERANCE: 1,
  CONNECT_LABELS: {
    MOBILE: "Open and continue in the wallet app"
  },
  SEND_SUPPORTED_NAMESPACES: ["eip155", "solana"],
  DEFAULT_REMOTE_FEATURES: {
    swaps: ["1inch"],
    onramp: ["coinbase", "meld"],
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
    reownBranding: !0
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
  DEFAULT_ACCOUNT_TYPES: {
    bip122: "payment",
    eip155: "smartAccount",
    polkadot: "eoa",
    solana: "eoa"
  },
  ADAPTER_TYPES: {
    UNIVERSAL: "universal"
  }
}, j = {
  // Cache expiry in milliseconds
  cacheExpiry: {
    portfolio: 3e4,
    nativeBalance: 3e4,
    ens: 3e5,
    identity: 3e5
  },
  isCacheExpired(t, e) {
    return Date.now() - t > e;
  },
  getActiveNetworkProps() {
    const t = j.getActiveNamespace(), e = j.getActiveCaipNetworkId(), s = e ? e.split(":")[1] : void 0, r = s ? isNaN(Number(s)) ? s : Number(s) : void 0;
    return {
      namespace: t,
      caipNetworkId: e,
      chainId: r
    };
  },
  setWalletConnectDeepLink({ name: t, href: e }) {
    try {
      Z.setItem(ee.DEEPLINK_CHOICE, JSON.stringify({ href: e, name: t }));
    } catch {
      console.info("Unable to set WalletConnect deep link");
    }
  },
  getWalletConnectDeepLink() {
    try {
      const t = Z.getItem(ee.DEEPLINK_CHOICE);
      if (t)
        return JSON.parse(t);
    } catch {
      console.info("Unable to get WalletConnect deep link");
    }
  },
  deleteWalletConnectDeepLink() {
    try {
      Z.removeItem(ee.DEEPLINK_CHOICE);
    } catch {
      console.info("Unable to delete WalletConnect deep link");
    }
  },
  setActiveNamespace(t) {
    try {
      Z.setItem(ee.ACTIVE_NAMESPACE, t);
    } catch {
      console.info("Unable to set active namespace");
    }
  },
  setActiveCaipNetworkId(t) {
    try {
      Z.setItem(ee.ACTIVE_CAIP_NETWORK_ID, t), j.setActiveNamespace(t.split(":")[0]);
    } catch {
      console.info("Unable to set active caip network id");
    }
  },
  getActiveCaipNetworkId() {
    try {
      return Z.getItem(ee.ACTIVE_CAIP_NETWORK_ID);
    } catch {
      console.info("Unable to get active caip network id");
      return;
    }
  },
  deleteActiveCaipNetworkId() {
    try {
      Z.removeItem(ee.ACTIVE_CAIP_NETWORK_ID);
    } catch {
      console.info("Unable to delete active caip network id");
    }
  },
  deleteConnectedConnectorId(t) {
    try {
      const e = Xi(t);
      Z.removeItem(e);
    } catch {
      console.info("Unable to delete connected connector id");
    }
  },
  setAppKitRecent(t) {
    try {
      const e = j.getRecentWallets();
      e.find((r) => r.id === t.id) || (e.unshift(t), e.length > 2 && e.pop(), Z.setItem(ee.RECENT_WALLETS, JSON.stringify(e)));
    } catch {
      console.info("Unable to set AppKit recent");
    }
  },
  getRecentWallets() {
    try {
      const t = Z.getItem(ee.RECENT_WALLETS);
      return t ? JSON.parse(t) : [];
    } catch {
      console.info("Unable to get AppKit recent");
    }
    return [];
  },
  setConnectedConnectorId(t, e) {
    try {
      const s = Xi(t);
      Z.setItem(s, e);
    } catch {
      console.info("Unable to set Connected Connector Id");
    }
  },
  getActiveNamespace() {
    try {
      return Z.getItem(ee.ACTIVE_NAMESPACE);
    } catch {
      console.info("Unable to get active namespace");
    }
  },
  getConnectedConnectorId(t) {
    if (t)
      try {
        const e = Xi(t);
        return Z.getItem(e);
      } catch {
        console.info("Unable to get connected connector id in namespace ", t);
      }
  },
  setConnectedSocialProvider(t) {
    try {
      Z.setItem(ee.CONNECTED_SOCIAL, t);
    } catch {
      console.info("Unable to set connected social provider");
    }
  },
  getConnectedSocialProvider() {
    try {
      return Z.getItem(ee.CONNECTED_SOCIAL);
    } catch {
      console.info("Unable to get connected social provider");
    }
  },
  deleteConnectedSocialProvider() {
    try {
      Z.removeItem(ee.CONNECTED_SOCIAL);
    } catch {
      console.info("Unable to delete connected social provider");
    }
  },
  getConnectedSocialUsername() {
    try {
      return Z.getItem(ee.CONNECTED_SOCIAL_USERNAME);
    } catch {
      console.info("Unable to get connected social username");
    }
  },
  getStoredActiveCaipNetworkId() {
    var s;
    const t = Z.getItem(ee.ACTIVE_CAIP_NETWORK_ID);
    return (s = t == null ? void 0 : t.split(":")) == null ? void 0 : s[1];
  },
  setConnectionStatus(t) {
    try {
      Z.setItem(ee.CONNECTION_STATUS, t);
    } catch {
      console.info("Unable to set connection status");
    }
  },
  getConnectionStatus() {
    try {
      return Z.getItem(ee.CONNECTION_STATUS);
    } catch {
      return;
    }
  },
  getConnectedNamespaces() {
    try {
      const t = Z.getItem(ee.CONNECTED_NAMESPACES);
      return t != null && t.length ? t.split(",") : [];
    } catch {
      return [];
    }
  },
  setConnectedNamespaces(t) {
    try {
      const e = Array.from(new Set(t));
      Z.setItem(ee.CONNECTED_NAMESPACES, e.join(","));
    } catch {
      console.info("Unable to set namespaces in storage");
    }
  },
  addConnectedNamespace(t) {
    try {
      const e = j.getConnectedNamespaces();
      e.includes(t) || (e.push(t), j.setConnectedNamespaces(e));
    } catch {
      console.info("Unable to add connected namespace");
    }
  },
  removeConnectedNamespace(t) {
    try {
      const e = j.getConnectedNamespaces(), s = e.indexOf(t);
      s > -1 && (e.splice(s, 1), j.setConnectedNamespaces(e));
    } catch {
      console.info("Unable to remove connected namespace");
    }
  },
  getTelegramSocialProvider() {
    try {
      return Z.getItem(ee.TELEGRAM_SOCIAL_PROVIDER);
    } catch {
      return console.info("Unable to get telegram social provider"), null;
    }
  },
  setTelegramSocialProvider(t) {
    try {
      Z.setItem(ee.TELEGRAM_SOCIAL_PROVIDER, t);
    } catch {
      console.info("Unable to set telegram social provider");
    }
  },
  removeTelegramSocialProvider() {
    try {
      Z.removeItem(ee.TELEGRAM_SOCIAL_PROVIDER);
    } catch {
      console.info("Unable to remove telegram social provider");
    }
  },
  getBalanceCache() {
    let t = {};
    try {
      const e = Z.getItem(ee.PORTFOLIO_CACHE);
      t = e ? JSON.parse(e) : {};
    } catch {
      console.info("Unable to get balance cache");
    }
    return t;
  },
  removeAddressFromBalanceCache(t) {
    try {
      const e = j.getBalanceCache();
      Z.setItem(ee.PORTFOLIO_CACHE, JSON.stringify({ ...e, [t]: void 0 }));
    } catch {
      console.info("Unable to remove address from balance cache", t);
    }
  },
  getBalanceCacheForCaipAddress(t) {
    try {
      const s = j.getBalanceCache()[t];
      if (s && !this.isCacheExpired(s.timestamp, this.cacheExpiry.portfolio))
        return s.balance;
      j.removeAddressFromBalanceCache(t);
    } catch {
      console.info("Unable to get balance cache for address", t);
    }
  },
  updateBalanceCache(t) {
    try {
      const e = j.getBalanceCache();
      e[t.caipAddress] = t, Z.setItem(ee.PORTFOLIO_CACHE, JSON.stringify(e));
    } catch {
      console.info("Unable to update balance cache", t);
    }
  },
  getNativeBalanceCache() {
    let t = {};
    try {
      const e = Z.getItem(ee.NATIVE_BALANCE_CACHE);
      t = e ? JSON.parse(e) : {};
    } catch {
      console.info("Unable to get balance cache");
    }
    return t;
  },
  removeAddressFromNativeBalanceCache(t) {
    try {
      const e = j.getBalanceCache();
      Z.setItem(ee.NATIVE_BALANCE_CACHE, JSON.stringify({ ...e, [t]: void 0 }));
    } catch {
      console.info("Unable to remove address from balance cache", t);
    }
  },
  getNativeBalanceCacheForCaipAddress(t) {
    try {
      const s = j.getNativeBalanceCache()[t];
      if (s && !this.isCacheExpired(s.timestamp, this.cacheExpiry.nativeBalance))
        return s;
      console.info("Discarding cache for address", t), j.removeAddressFromBalanceCache(t);
    } catch {
      console.info("Unable to get balance cache for address", t);
    }
  },
  updateNativeBalanceCache(t) {
    try {
      const e = j.getNativeBalanceCache();
      e[t.caipAddress] = t, Z.setItem(ee.NATIVE_BALANCE_CACHE, JSON.stringify(e));
    } catch {
      console.info("Unable to update balance cache", t);
    }
  },
  getEnsCache() {
    let t = {};
    try {
      const e = Z.getItem(ee.ENS_CACHE);
      t = e ? JSON.parse(e) : {};
    } catch {
      console.info("Unable to get ens name cache");
    }
    return t;
  },
  getEnsFromCacheForAddress(t) {
    try {
      const s = j.getEnsCache()[t];
      if (s && !this.isCacheExpired(s.timestamp, this.cacheExpiry.ens))
        return s.ens;
      j.removeEnsFromCache(t);
    } catch {
      console.info("Unable to get ens name from cache", t);
    }
  },
  updateEnsCache(t) {
    try {
      const e = j.getEnsCache();
      e[t.address] = t, Z.setItem(ee.ENS_CACHE, JSON.stringify(e));
    } catch {
      console.info("Unable to update ens name cache", t);
    }
  },
  removeEnsFromCache(t) {
    try {
      const e = j.getEnsCache();
      Z.setItem(ee.ENS_CACHE, JSON.stringify({ ...e, [t]: void 0 }));
    } catch {
      console.info("Unable to remove ens name from cache", t);
    }
  },
  getIdentityCache() {
    let t = {};
    try {
      const e = Z.getItem(ee.IDENTITY_CACHE);
      t = e ? JSON.parse(e) : {};
    } catch {
      console.info("Unable to get identity cache");
    }
    return t;
  },
  getIdentityFromCacheForAddress(t) {
    try {
      const s = j.getIdentityCache()[t];
      if (s && !this.isCacheExpired(s.timestamp, this.cacheExpiry.identity))
        return s.identity;
      j.removeIdentityFromCache(t);
    } catch {
      console.info("Unable to get identity from cache", t);
    }
  },
  updateIdentityCache(t) {
    try {
      const e = j.getIdentityCache();
      e[t.address] = {
        identity: t.identity,
        timestamp: t.timestamp
      }, Z.setItem(ee.IDENTITY_CACHE, JSON.stringify(e));
    } catch {
      console.info("Unable to update identity cache", t);
    }
  },
  removeIdentityFromCache(t) {
    try {
      const e = j.getIdentityCache();
      Z.setItem(ee.IDENTITY_CACHE, JSON.stringify({ ...e, [t]: void 0 }));
    } catch {
      console.info("Unable to remove identity from cache", t);
    }
  },
  clearAddressCache() {
    try {
      Z.removeItem(ee.PORTFOLIO_CACHE), Z.removeItem(ee.NATIVE_BALANCE_CACHE), Z.removeItem(ee.ENS_CACHE), Z.removeItem(ee.IDENTITY_CACHE);
    } catch {
      console.info("Unable to clear address cache");
    }
  },
  setPreferredAccountTypes(t) {
    try {
      Z.setItem(ee.PREFERRED_ACCOUNT_TYPES, JSON.stringify(t));
    } catch {
      console.info("Unable to set preferred account types", t);
    }
  },
  getPreferredAccountTypes() {
    try {
      const t = Z.getItem(ee.PREFERRED_ACCOUNT_TYPES);
      return t ? JSON.parse(t) : {};
    } catch {
      console.info("Unable to get preferred account types");
    }
    return {};
  },
  setConnections(t, e) {
    try {
      const s = {
        ...j.getConnections(),
        [e]: t
      };
      Z.setItem(ee.CONNECTIONS, JSON.stringify(s));
    } catch (s) {
      console.error("Unable to sync connections to storage", s);
    }
  },
  getConnections() {
    try {
      const t = Z.getItem(ee.CONNECTIONS);
      return t ? JSON.parse(t) : {};
    } catch (t) {
      return console.error("Unable to get connections from storage", t), {};
    }
  }
}, X = {
  isMobile() {
    var t;
    return this.isClient() ? !!(typeof (window == null ? void 0 : window.matchMedia) == "function" && ((t = window == null ? void 0 : window.matchMedia("(pointer:coarse)")) != null && t.matches) || /Android|webOS|iPhone|iPad|iPod|BlackBerry|Opera Mini/u.test(navigator.userAgent)) : !1;
  },
  checkCaipNetwork(t, e = "") {
    return t == null ? void 0 : t.caipNetworkId.toLocaleLowerCase().includes(e.toLowerCase());
  },
  isAndroid() {
    if (!this.isMobile())
      return !1;
    const t = window == null ? void 0 : window.navigator.userAgent.toLowerCase();
    return X.isMobile() && t.includes("android");
  },
  isIos() {
    if (!this.isMobile())
      return !1;
    const t = window == null ? void 0 : window.navigator.userAgent.toLowerCase();
    return t.includes("iphone") || t.includes("ipad");
  },
  isSafari() {
    return this.isClient() ? (window == null ? void 0 : window.navigator.userAgent.toLowerCase()).includes("safari") : !1;
  },
  isClient() {
    return typeof window < "u";
  },
  isPairingExpired(t) {
    return t ? t - Date.now() <= ve.TEN_SEC_MS : !0;
  },
  isAllowedRetry(t, e = ve.ONE_SEC_MS) {
    return Date.now() - t >= e;
  },
  copyToClopboard(t) {
    navigator.clipboard.writeText(t);
  },
  isIframe() {
    try {
      return (window == null ? void 0 : window.self) !== (window == null ? void 0 : window.top);
    } catch {
      return !1;
    }
  },
  isSafeApp() {
    var t, e;
    if (X.isClient() && window.self !== window.top)
      try {
        const s = (e = (t = window == null ? void 0 : window.location) == null ? void 0 : t.ancestorOrigins) == null ? void 0 : e[0], r = "https://app.safe.global";
        if (s) {
          const i = new URL(s), n = new URL(r);
          return i.hostname === n.hostname;
        }
      } catch {
        return !1;
      }
    return !1;
  },
  getPairingExpiry() {
    return Date.now() + ve.FOUR_MINUTES_MS;
  },
  getNetworkId(t) {
    return t == null ? void 0 : t.split(":")[1];
  },
  getPlainAddress(t) {
    return t == null ? void 0 : t.split(":")[2];
  },
  async wait(t) {
    return new Promise((e) => {
      setTimeout(e, t);
    });
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  debounce(t, e = 500) {
    let s;
    return (...r) => {
      function i() {
        t(...r);
      }
      s && clearTimeout(s), s = setTimeout(i, e);
    };
  },
  isHttpUrl(t) {
    return t.startsWith("http://") || t.startsWith("https://");
  },
  formatNativeUrl(t, e, s = null) {
    if (X.isHttpUrl(t))
      return this.formatUniversalUrl(t, e);
    let r = t, i = s;
    r.includes("://") || (r = t.replaceAll("/", "").replaceAll(":", ""), r = `${r}://`), r.endsWith("/") || (r = `${r}/`), i && !(i != null && i.endsWith("/")) && (i = `${i}/`), this.isTelegram() && this.isAndroid() && (e = encodeURIComponent(e));
    const n = encodeURIComponent(e);
    return {
      redirect: `${r}wc?uri=${n}`,
      redirectUniversalLink: i ? `${i}wc?uri=${n}` : void 0,
      href: r
    };
  },
  formatUniversalUrl(t, e) {
    if (!X.isHttpUrl(t))
      return this.formatNativeUrl(t, e);
    let s = t;
    s.endsWith("/") || (s = `${s}/`);
    const r = encodeURIComponent(e);
    return {
      redirect: `${s}wc?uri=${r}`,
      href: s
    };
  },
  getOpenTargetForPlatform(t) {
    return t === "popupWindow" ? t : this.isTelegram() ? j.getTelegramSocialProvider() ? "_top" : "_blank" : t;
  },
  openHref(t, e, s) {
    window == null || window.open(t, this.getOpenTargetForPlatform(e), s || "noreferrer noopener");
  },
  returnOpenHref(t, e, s) {
    return window == null ? void 0 : window.open(t, this.getOpenTargetForPlatform(e), s || "noreferrer noopener");
  },
  isTelegram() {
    return typeof window < "u" && // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (!!window.TelegramWebviewProxy || // eslint-disable-next-line @typescript-eslint/no-explicit-any
    !!window.Telegram || // eslint-disable-next-line @typescript-eslint/no-explicit-any
    !!window.TelegramWebviewProxyProto);
  },
  isPWA() {
    var s, r, i;
    if (typeof window > "u")
      return !1;
    const t = (r = (s = window.matchMedia) == null ? void 0 : s.call(window, "(display-mode: standalone)")) == null ? void 0 : r.matches, e = (i = window == null ? void 0 : window.navigator) == null ? void 0 : i.standalone;
    return !!(t || e);
  },
  async preloadImage(t) {
    const e = new Promise((s, r) => {
      const i = new Image();
      i.onload = s, i.onerror = r, i.crossOrigin = "anonymous", i.src = t;
    });
    return Promise.race([e, X.wait(2e3)]);
  },
  formatBalance(t, e) {
    let s = "0.000";
    if (typeof t == "string") {
      const r = Number(t);
      if (r) {
        const i = Math.floor(r * 1e3) / 1e3;
        i && (s = i.toString());
      }
    }
    return `${s}${e ? ` ${e}` : ""}`;
  },
  formatBalance2(t, e) {
    var r;
    let s;
    if (t === "0")
      s = "0";
    else if (typeof t == "string") {
      const i = Number(t);
      i && (s = (r = i.toString().match(/^-?\d+(?:\.\d{0,3})?/u)) == null ? void 0 : r[0]);
    }
    return {
      value: s ?? "0",
      rest: s === "0" ? "000" : "",
      symbol: e
    };
  },
  getApiUrl() {
    return z.W3M_API_URL;
  },
  getBlockchainApiUrl() {
    return z.BLOCKCHAIN_API_RPC_URL;
  },
  getAnalyticsUrl() {
    return z.PULSE_API_URL;
  },
  getUUID() {
    return crypto != null && crypto.randomUUID ? crypto.randomUUID() : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/gu, (t) => {
      const e = Math.random() * 16 | 0;
      return (t === "x" ? e : e & 3 | 8).toString(16);
    });
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parseError(t) {
    var e, s;
    return typeof t == "string" ? t : typeof ((s = (e = t == null ? void 0 : t.issues) == null ? void 0 : e[0]) == null ? void 0 : s.message) == "string" ? t.issues[0].message : t instanceof Error ? t.message : "Unknown error";
  },
  sortRequestedNetworks(t, e = []) {
    const s = {};
    return e && t && (t.forEach((r, i) => {
      s[r] = i;
    }), e.sort((r, i) => {
      const n = s[r.id], o = s[i.id];
      return n !== void 0 && o !== void 0 ? n - o : n !== void 0 ? -1 : o !== void 0 ? 1 : 0;
    })), e;
  },
  calculateBalance(t) {
    let e = 0;
    for (const s of t)
      e += s.value ?? 0;
    return e;
  },
  formatTokenBalance(t) {
    const e = t.toFixed(2), [s, r] = e.split(".");
    return { dollars: s, pennies: r };
  },
  isAddress(t, e = "eip155") {
    switch (e) {
      case "eip155":
        if (/^(?:0x)?[0-9a-f]{40}$/iu.test(t)) {
          if (/^(?:0x)?[0-9a-f]{40}$/iu.test(t) || /^(?:0x)?[0-9A-F]{40}$/iu.test(t))
            return !0;
        } else return !1;
        return !1;
      case "solana":
        return /[1-9A-HJ-NP-Za-km-z]{32,44}$/iu.test(t);
      default:
        return !1;
    }
  },
  uniqueBy(t, e) {
    const s = /* @__PURE__ */ new Set();
    return t.filter((r) => {
      const i = r[e];
      return s.has(i) ? !1 : (s.add(i), !0);
    });
  },
  generateSdkVersion(t, e, s) {
    const i = t.length === 0 ? ve.ADAPTER_TYPES.UNIVERSAL : t.map((n) => n.adapterType).join(",");
    return `${e}-${i}-${s}`;
  },
  // eslint-disable-next-line max-params
  createAccount(t, e, s, r, i) {
    return {
      namespace: t,
      address: e,
      type: s,
      publicKey: r,
      path: i
    };
  },
  isCaipAddress(t) {
    if (typeof t != "string")
      return !1;
    const e = t.split(":"), s = e[0];
    return e.filter(Boolean).length === 3 && s in z.CHAIN_NAME_MAP;
  },
  isMac() {
    const t = window == null ? void 0 : window.navigator.userAgent.toLowerCase();
    return t.includes("macintosh") && !t.includes("safari");
  },
  formatTelegramSocialLoginUrl(t) {
    const e = `--${encodeURIComponent(window == null ? void 0 : window.location.href)}`, s = "state=";
    if (new URL(t).host === "auth.magic.link") {
      const i = "provider_authorization_url=", n = t.substring(t.indexOf(i) + i.length), o = this.injectIntoUrl(decodeURIComponent(n), s, e);
      return t.replace(n, encodeURIComponent(o));
    }
    return this.injectIntoUrl(t, s, e);
  },
  injectIntoUrl(t, e, s) {
    const r = t.indexOf(e);
    if (r === -1)
      throw new Error(`${e} parameter not found in the URL: ${t}`);
    const i = t.indexOf("&", r), n = e.length, o = i !== -1 ? i : t.length, a = t.substring(0, r + n), c = t.substring(r + n, o), l = t.substring(i), u = c + s;
    return a + u + l;
  }
};
async function kr(...t) {
  const e = await fetch(...t);
  if (!e.ok)
    throw new Error(`HTTP status code: ${e.status}`, {
      cause: e
    });
  return e;
}
class oi {
  constructor({ baseUrl: e, clientId: s }) {
    this.baseUrl = e, this.clientId = s;
  }
  async get({ headers: e, signal: s, cache: r, ...i }) {
    const n = this.createUrl(i);
    return (await kr(n, { method: "GET", headers: e, signal: s, cache: r })).json();
  }
  async getBlob({ headers: e, signal: s, ...r }) {
    const i = this.createUrl(r);
    return (await kr(i, { method: "GET", headers: e, signal: s })).blob();
  }
  async post({ body: e, headers: s, signal: r, ...i }) {
    const n = this.createUrl(i);
    return (await kr(n, {
      method: "POST",
      headers: s,
      body: e ? JSON.stringify(e) : void 0,
      signal: r
    })).json();
  }
  async put({ body: e, headers: s, signal: r, ...i }) {
    const n = this.createUrl(i);
    return (await kr(n, {
      method: "PUT",
      headers: s,
      body: e ? JSON.stringify(e) : void 0,
      signal: r
    })).json();
  }
  async delete({ body: e, headers: s, signal: r, ...i }) {
    const n = this.createUrl(i);
    return (await kr(n, {
      method: "DELETE",
      headers: s,
      body: e ? JSON.stringify(e) : void 0,
      signal: r
    })).json();
  }
  createUrl({ path: e, params: s }) {
    const r = new URL(e, this.baseUrl);
    return s && Object.entries(s).forEach(([i, n]) => {
      n && r.searchParams.append(i, n);
    }), this.clientId && r.searchParams.append("clientId", this.clientId), r;
  }
}
const fu = {
  getFeatureValue(t, e) {
    const s = e == null ? void 0 : e[t];
    return s === void 0 ? ve.DEFAULT_FEATURES[t] : s;
  },
  filterSocialsByPlatform(t) {
    if (!t || !t.length)
      return t;
    if (X.isTelegram()) {
      if (X.isIos())
        return t.filter((e) => e !== "google");
      if (X.isMac())
        return t.filter((e) => e !== "x");
      if (X.isAndroid())
        return t.filter((e) => !["facebook", "x"].includes(e));
    }
    return t;
  }
}, V = Ae({
  features: ve.DEFAULT_FEATURES,
  projectId: "",
  sdkType: "appkit",
  sdkVersion: "html-wagmi-undefined",
  defaultAccountTypes: ve.DEFAULT_ACCOUNT_TYPES,
  enableNetworkSwitch: !0,
  experimental_preferUniversalLinks: !1,
  remoteFeatures: {}
}), O = {
  state: V,
  subscribeKey(t, e) {
    return Xe(V, t, e);
  },
  setOptions(t) {
    Object.assign(V, t);
  },
  setRemoteFeatures(t) {
    var s;
    if (!t)
      return;
    const e = { ...V.remoteFeatures, ...t };
    V.remoteFeatures = e, (s = V.remoteFeatures) != null && s.socials && (V.remoteFeatures.socials = fu.filterSocialsByPlatform(V.remoteFeatures.socials));
  },
  setFeatures(t) {
    if (!t)
      return;
    V.features || (V.features = ve.DEFAULT_FEATURES);
    const e = { ...V.features, ...t };
    V.features = e;
  },
  setProjectId(t) {
    V.projectId = t;
  },
  setCustomRpcUrls(t) {
    V.customRpcUrls = t;
  },
  setAllWallets(t) {
    V.allWallets = t;
  },
  setIncludeWalletIds(t) {
    V.includeWalletIds = t;
  },
  setExcludeWalletIds(t) {
    V.excludeWalletIds = t;
  },
  setFeaturedWalletIds(t) {
    V.featuredWalletIds = t;
  },
  setTokens(t) {
    V.tokens = t;
  },
  setTermsConditionsUrl(t) {
    V.termsConditionsUrl = t;
  },
  setPrivacyPolicyUrl(t) {
    V.privacyPolicyUrl = t;
  },
  setCustomWallets(t) {
    V.customWallets = t;
  },
  setIsSiweEnabled(t) {
    V.isSiweEnabled = t;
  },
  setIsUniversalProvider(t) {
    V.isUniversalProvider = t;
  },
  setSdkVersion(t) {
    V.sdkVersion = t;
  },
  setMetadata(t) {
    V.metadata = t;
  },
  setDisableAppend(t) {
    V.disableAppend = t;
  },
  setEIP6963Enabled(t) {
    V.enableEIP6963 = t;
  },
  setDebug(t) {
    V.debug = t;
  },
  setEnableWalletConnect(t) {
    V.enableWalletConnect = t;
  },
  setEnableWalletGuide(t) {
    V.enableWalletGuide = t;
  },
  setEnableAuthLogger(t) {
    V.enableAuthLogger = t;
  },
  setEnableWallets(t) {
    V.enableWallets = t;
  },
  setPreferUniversalLinks(t) {
    V.experimental_preferUniversalLinks = t;
  },
  setHasMultipleAddresses(t) {
    V.hasMultipleAddresses = t;
  },
  setSIWX(t) {
    V.siwx = t;
  },
  setConnectMethodsOrder(t) {
    V.features = {
      ...V.features,
      connectMethodsOrder: t
    };
  },
  setWalletFeaturesOrder(t) {
    V.features = {
      ...V.features,
      walletFeaturesOrder: t
    };
  },
  setSocialsOrder(t) {
    V.remoteFeatures = {
      ...V.remoteFeatures,
      socials: t
    };
  },
  setCollapseWallets(t) {
    V.features = {
      ...V.features,
      collapseWallets: t
    };
  },
  setEnableEmbedded(t) {
    V.enableEmbedded = t;
  },
  setAllowUnsupportedChain(t) {
    V.allowUnsupportedChain = t;
  },
  setManualWCControl(t) {
    V.manualWCControl = t;
  },
  setEnableNetworkSwitch(t) {
    V.enableNetworkSwitch = t;
  },
  setDefaultAccountTypes(t = {}) {
    Object.entries(t).forEach(([e, s]) => {
      s && (V.defaultAccountTypes[e] = s);
    });
  },
  setUniversalProviderConfigOverride(t) {
    V.universalProviderConfigOverride = t;
  },
  getUniversalProviderConfigOverride() {
    return V.universalProviderConfigOverride;
  },
  getSnapshot() {
    return Qr(V);
  }
}, mu = Object.freeze({
  enabled: !0,
  events: []
}), wu = new oi({ baseUrl: X.getAnalyticsUrl(), clientId: null }), yu = 5, bu = 60 * 1e3, os = Ae({
  ...mu
}), vu = {
  state: os,
  subscribeKey(t, e) {
    return Xe(os, t, e);
  },
  async sendError(t, e) {
    if (!os.enabled)
      return;
    const s = Date.now();
    if (os.events.filter((n) => {
      const o = new Date(n.properties.timestamp || "").getTime();
      return s - o < bu;
    }).length >= yu)
      return;
    const i = {
      type: "error",
      event: e,
      properties: {
        errorType: t.name,
        errorMessage: t.message,
        stackTrace: t.stack,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      }
    };
    os.events.push(i);
    try {
      if (typeof window > "u")
        return;
      const { projectId: n, sdkType: o, sdkVersion: a } = O.state;
      await wu.post({
        path: "/e",
        params: {
          projectId: n,
          st: o,
          sv: a || "html-wagmi-4.2.2"
        },
        body: {
          eventId: X.getUUID(),
          url: window.location.href,
          domain: window.location.hostname,
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          props: {
            type: "error",
            event: e,
            errorType: t.name,
            errorMessage: t.message,
            stackTrace: t.stack
          }
        }
      });
    } catch {
    }
  },
  enable() {
    os.enabled = !0;
  },
  disable() {
    os.enabled = !1;
  },
  clearEvents() {
    os.events = [];
  }
};
class mr extends Error {
  constructor(e, s, r) {
    super(e), this.name = "AppKitError", this.category = s, this.originalError = r, Object.setPrototypeOf(this, mr.prototype);
    let i = !1;
    if (r instanceof Error && typeof r.stack == "string" && r.stack) {
      const n = r.stack, o = n.indexOf(`
`);
      if (o > -1) {
        const a = n.substring(o + 1);
        this.stack = `${this.name}: ${this.message}
${a}`, i = !0;
      }
    }
    i || (Error.captureStackTrace ? Error.captureStackTrace(this, mr) : this.stack || (this.stack = `${this.name}: ${this.message}`));
  }
}
function Oo(t, e) {
  const s = t instanceof mr ? t : new mr(t instanceof Error ? t.message : String(t), e, t);
  throw vu.sendError(s, s.category), s;
}
function yt(t, e = "INTERNAL_SDK_ERROR") {
  const s = {};
  return Object.keys(t).forEach((r) => {
    const i = t[r];
    if (typeof i == "function") {
      let n = i;
      i.constructor.name === "AsyncFunction" ? n = async (...o) => {
        try {
          return await i(...o);
        } catch (a) {
          return Oo(a, e);
        }
      } : n = (...o) => {
        try {
          return i(...o);
        } catch (a) {
          return Oo(a, e);
        }
      }, s[r] = n;
    } else
      s[r] = i;
  }), s;
}
const jt = {
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
}, Eu = {
  /**
   * Handles mobile wallet redirection for wallets that have Universal Links and doesn't support WalletConnect Deep Links.
   *
   * @param {string} id - The id of the wallet.
   * @param {ChainNamespace} namespace - The namespace of the chain.
   */
  handleMobileDeeplinkRedirect(t, e) {
    const s = window.location.href, r = encodeURIComponent(s);
    if (t === jt.PHANTOM.id && !("phantom" in window)) {
      const i = s.startsWith("https") ? "https" : "http", n = s.split("/")[2], o = encodeURIComponent(`${i}://${n}`);
      window.location.href = `${jt.PHANTOM.url}/ul/browse/${r}?ref=${o}`;
    }
    t === jt.SOLFLARE.id && !("solflare" in window) && (window.location.href = `${jt.SOLFLARE.url}/ul/v1/browse/${r}?ref=${r}`), e === z.CHAIN.SOLANA && t === jt.COINBASE.id && !("coinbaseSolana" in window) && (window.location.href = `${jt.COINBASE.url}/dapp?cb_url=${r}`);
  }
}, lt = Ae({
  walletImages: {},
  networkImages: {},
  chainImages: {},
  connectorImages: {},
  tokenImages: {},
  currencyImages: {}
}), Cu = {
  state: lt,
  subscribeNetworkImages(t) {
    return Ye(lt.networkImages, () => t(lt.networkImages));
  },
  subscribeKey(t, e) {
    return Xe(lt, t, e);
  },
  subscribe(t) {
    return Ye(lt, () => t(lt));
  },
  setWalletImage(t, e) {
    lt.walletImages[t] = e;
  },
  setNetworkImage(t, e) {
    lt.networkImages[t] = e;
  },
  setChainImage(t, e) {
    lt.chainImages[t] = e;
  },
  setConnectorImage(t, e) {
    lt.connectorImages = { ...lt.connectorImages, [t]: e };
  },
  setTokenImage(t, e) {
    lt.tokenImages[t] = e;
  },
  setCurrencyImage(t, e) {
    lt.currencyImages[t] = e;
  }
}, xt = yt(Cu), Iu = {
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
}, Qi = Ae({
  networkImagePromises: {}
}), Nc = {
  async fetchWalletImage(t) {
    if (t)
      return await K._fetchWalletImage(t), this.getWalletImageById(t);
  },
  async fetchNetworkImage(t) {
    if (!t)
      return;
    const e = this.getNetworkImageById(t);
    return e || (Qi.networkImagePromises[t] || (Qi.networkImagePromises[t] = K._fetchNetworkImage(t)), await Qi.networkImagePromises[t], this.getNetworkImageById(t));
  },
  getWalletImageById(t) {
    if (t)
      return xt.state.walletImages[t];
  },
  getWalletImage(t) {
    if (t != null && t.image_url)
      return t == null ? void 0 : t.image_url;
    if (t != null && t.image_id)
      return xt.state.walletImages[t.image_id];
  },
  getNetworkImage(t) {
    var e, s, r;
    if ((e = t == null ? void 0 : t.assets) != null && e.imageUrl)
      return (s = t == null ? void 0 : t.assets) == null ? void 0 : s.imageUrl;
    if ((r = t == null ? void 0 : t.assets) != null && r.imageId)
      return xt.state.networkImages[t.assets.imageId];
  },
  getNetworkImageById(t) {
    if (t)
      return xt.state.networkImages[t];
  },
  getConnectorImage(t) {
    if (t != null && t.imageUrl)
      return t.imageUrl;
    if (t != null && t.imageId)
      return xt.state.connectorImages[t.imageId];
  },
  getChainImage(t) {
    return xt.state.networkImages[Iu[t]];
  }
}, as = Ae({
  message: "",
  variant: "info",
  open: !1
}), Nu = {
  state: as,
  subscribeKey(t, e) {
    return Xe(as, t, e);
  },
  open(t, e) {
    const { debug: s } = O.state, { shortMessage: r, longMessage: i } = t;
    s && (as.message = r, as.variant = e, as.open = !0), i && console.error(typeof i == "function" ? i() : i);
  },
  close() {
    as.open = !1, as.message = "", as.variant = "info";
  }
}, Os = yt(Nu), Au = X.getAnalyticsUrl(), _u = new oi({ baseUrl: Au, clientId: null }), Su = ["MODAL_CREATED"], Jt = Ae({
  timestamp: Date.now(),
  reportedErrors: {},
  data: {
    type: "track",
    event: "MODAL_CREATED"
  }
}), Se = {
  state: Jt,
  subscribe(t) {
    return Ye(Jt, () => t(Jt));
  },
  getSdkProperties() {
    const { projectId: t, sdkType: e, sdkVersion: s } = O.state;
    return {
      projectId: t,
      st: e,
      sv: s || "html-wagmi-4.2.2"
    };
  },
  async _sendAnalyticsEvent(t) {
    try {
      const e = W.state.address;
      if (Su.includes(t.data.event) || typeof window > "u")
        return;
      await _u.post({
        path: "/e",
        params: Se.getSdkProperties(),
        body: {
          eventId: X.getUUID(),
          url: window.location.href,
          domain: window.location.hostname,
          timestamp: t.timestamp,
          props: { ...t.data, address: e }
        }
      }), Jt.reportedErrors.FORBIDDEN = !1;
    } catch (e) {
      e instanceof Error && e.cause instanceof Response && e.cause.status === z.HTTP_STATUS_CODES.FORBIDDEN && !Jt.reportedErrors.FORBIDDEN && (Os.open({
        shortMessage: "Invalid App Configuration",
        longMessage: `Origin ${Fr() ? window.origin : "uknown"} not found on Allowlist - update configuration on cloud.reown.com`
      }, "error"), Jt.reportedErrors.FORBIDDEN = !0);
    }
  },
  sendEvent(t) {
    var e;
    Jt.timestamp = Date.now(), Jt.data = t, (e = O.state.features) != null && e.analytics && Se._sendAnalyticsEvent(Jt);
  }
}, Pu = X.getApiUrl(), tt = new oi({
  baseUrl: Pu,
  clientId: null
}), Ou = 40, To = 4, Tu = 20, te = Ae({
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
}), K = {
  state: te,
  subscribeKey(t, e) {
    return Xe(te, t, e);
  },
  _getSdkProperties() {
    const { projectId: t, sdkType: e, sdkVersion: s } = O.state;
    return {
      projectId: t,
      st: e || "appkit",
      sv: s || "html-wagmi-4.2.2"
    };
  },
  _filterOutExtensions(t) {
    return O.state.isUniversalProvider ? t.filter((e) => !!(e.mobile_link || e.desktop_link || e.webapp_link)) : t;
  },
  async _fetchWalletImage(t) {
    const e = `${tt.baseUrl}/getWalletImage/${t}`, s = await tt.getBlob({ path: e, params: K._getSdkProperties() });
    xt.setWalletImage(t, URL.createObjectURL(s));
  },
  async _fetchNetworkImage(t) {
    const e = `${tt.baseUrl}/public/getAssetImage/${t}`, s = await tt.getBlob({ path: e, params: K._getSdkProperties() });
    xt.setNetworkImage(t, URL.createObjectURL(s));
  },
  async _fetchConnectorImage(t) {
    const e = `${tt.baseUrl}/public/getAssetImage/${t}`, s = await tt.getBlob({ path: e, params: K._getSdkProperties() });
    xt.setConnectorImage(t, URL.createObjectURL(s));
  },
  async _fetchCurrencyImage(t) {
    const e = `${tt.baseUrl}/public/getCurrencyImage/${t}`, s = await tt.getBlob({ path: e, params: K._getSdkProperties() });
    xt.setCurrencyImage(t, URL.createObjectURL(s));
  },
  async _fetchTokenImage(t) {
    const e = `${tt.baseUrl}/public/getTokenImage/${t}`, s = await tt.getBlob({ path: e, params: K._getSdkProperties() });
    xt.setTokenImage(t, URL.createObjectURL(s));
  },
  _filterWalletsByPlatform(t) {
    return X.isMobile() ? t == null ? void 0 : t.filter((s) => s.mobile_link || s.id === jt.COINBASE.id ? !0 : p.state.activeChain === "solana" && (s.id === jt.SOLFLARE.id || s.id === jt.PHANTOM.id)) : t;
  },
  async fetchProjectConfig() {
    return (await tt.get({
      path: "/appkit/v1/config",
      params: K._getSdkProperties()
    })).features;
  },
  async fetchAllowedOrigins() {
    try {
      const { allowedOrigins: t } = await tt.get({
        path: "/projects/v1/origins",
        params: K._getSdkProperties()
      });
      return t;
    } catch {
      return [];
    }
  },
  async fetchNetworkImages() {
    const t = p.getAllRequestedCaipNetworks(), e = t == null ? void 0 : t.map(({ assets: s }) => s == null ? void 0 : s.imageId).filter(Boolean).filter((s) => !Nc.getNetworkImageById(s));
    e && await Promise.allSettled(e.map((s) => K._fetchNetworkImage(s)));
  },
  async fetchConnectorImages() {
    const { connectors: t } = B.state, e = t.map(({ imageId: s }) => s).filter(Boolean);
    await Promise.allSettled(e.map((s) => K._fetchConnectorImage(s)));
  },
  async fetchCurrencyImages(t = []) {
    await Promise.allSettled(t.map((e) => K._fetchCurrencyImage(e)));
  },
  async fetchTokenImages(t = []) {
    await Promise.allSettled(t.map((e) => K._fetchTokenImage(e)));
  },
  async fetchWallets(t) {
    var n;
    const e = t.exclude ?? [];
    K._getSdkProperties().sv.startsWith("html-core-") && e.push(...Object.values(jt).map((o) => o.id));
    const r = await tt.get({
      path: "/getWallets",
      params: {
        ...K._getSdkProperties(),
        ...t,
        page: String(t.page),
        entries: String(t.entries),
        include: (n = t.include) == null ? void 0 : n.join(","),
        exclude: e.join(",")
      }
    });
    return {
      data: K._filterWalletsByPlatform(r == null ? void 0 : r.data) || [],
      // Keep original count for display on main page
      count: r == null ? void 0 : r.count
    };
  },
  async fetchFeaturedWallets() {
    const { featuredWalletIds: t } = O.state;
    if (t != null && t.length) {
      const e = {
        ...K._getSdkProperties(),
        page: 1,
        entries: (t == null ? void 0 : t.length) ?? To,
        include: t
      }, { data: s } = await K.fetchWallets(e), r = [...s].sort((n, o) => t.indexOf(n.id) - t.indexOf(o.id)), i = r.map((n) => n.image_id).filter(Boolean);
      await Promise.allSettled(i.map((n) => K._fetchWalletImage(n))), te.featured = r, te.allFeatured = r;
    }
  },
  async fetchRecommendedWallets() {
    try {
      te.isFetchingRecommendedWallets = !0;
      const { includeWalletIds: t, excludeWalletIds: e, featuredWalletIds: s } = O.state, r = [...e ?? [], ...s ?? []].filter(Boolean), i = p.getRequestedCaipNetworkIds().join(","), n = {
        page: 1,
        entries: To,
        include: t,
        exclude: r,
        chains: i
      }, { data: o, count: a } = await K.fetchWallets(n), c = j.getRecentWallets(), l = o.map((d) => d.image_id).filter(Boolean), u = c.map((d) => d.image_id).filter(Boolean);
      await Promise.allSettled([...l, ...u].map((d) => K._fetchWalletImage(d))), te.recommended = o, te.allRecommended = o, te.count = a ?? 0;
    } catch {
    } finally {
      te.isFetchingRecommendedWallets = !1;
    }
  },
  async fetchWalletsByPage({ page: t }) {
    const { includeWalletIds: e, excludeWalletIds: s, featuredWalletIds: r } = O.state, i = p.getRequestedCaipNetworkIds().join(","), n = [
      ...te.recommended.map(({ id: u }) => u),
      ...s ?? [],
      ...r ?? []
    ].filter(Boolean), o = {
      page: t,
      entries: Ou,
      include: e,
      exclude: n,
      chains: i
    }, { data: a, count: c } = await K.fetchWallets(o), l = a.slice(0, Tu).map((u) => u.image_id).filter(Boolean);
    await Promise.allSettled(l.map((u) => K._fetchWalletImage(u))), te.wallets = X.uniqueBy([...te.wallets, ...K._filterOutExtensions(a)], "id").filter((u) => {
      var d;
      return (d = u.chains) == null ? void 0 : d.some((h) => i.includes(h));
    }), te.count = c > te.count ? c : te.count, te.page = t;
  },
  async initializeExcludedWallets({ ids: t }) {
    const e = {
      page: 1,
      entries: t.length,
      include: t
    }, { data: s } = await K.fetchWallets(e);
    s && s.forEach((r) => {
      te.excludedWallets.push({ rdns: r.rdns, name: r.name });
    });
  },
  async searchWallet({ search: t, badge: e }) {
    const { includeWalletIds: s, excludeWalletIds: r } = O.state, i = p.getRequestedCaipNetworkIds().join(",");
    te.search = [];
    const n = {
      page: 1,
      entries: 100,
      search: t == null ? void 0 : t.trim(),
      badge_type: e,
      include: s,
      exclude: r,
      chains: i
    }, { data: o } = await K.fetchWallets(n);
    Se.sendEvent({
      type: "track",
      event: "SEARCH_WALLET",
      properties: { badge: e ?? "", search: t ?? "" }
    });
    const a = o.map((c) => c.image_id).filter(Boolean);
    await Promise.allSettled([
      ...a.map((c) => K._fetchWalletImage(c)),
      X.wait(300)
    ]), te.search = K._filterOutExtensions(o);
  },
  initPromise(t, e) {
    const s = te.promises[t];
    return s || (te.promises[t] = e());
  },
  prefetch({ fetchConnectorImages: t = !0, fetchFeaturedWallets: e = !0, fetchRecommendedWallets: s = !0, fetchNetworkImages: r = !0 } = {}) {
    const i = [
      t && K.initPromise("connectorImages", K.fetchConnectorImages),
      e && K.initPromise("featuredWallets", K.fetchFeaturedWallets),
      s && K.initPromise("recommendedWallets", K.fetchRecommendedWallets),
      r && K.initPromise("networkImages", K.fetchNetworkImages)
    ].filter(Boolean);
    return Promise.allSettled(i);
  },
  prefetchAnalyticsConfig() {
    var t;
    (t = O.state.features) != null && t.analytics && K.fetchAnalyticsConfig();
  },
  async fetchAnalyticsConfig() {
    try {
      const { isAnalyticsEnabled: t } = await tt.get({
        path: "/getAnalyticsConfig",
        params: K._getSdkProperties()
      });
      O.setFeatures({ analytics: t });
    } catch {
      O.setFeatures({ analytics: !1 });
    }
  },
  filterByNamespaces(t) {
    if (!(t != null && t.length)) {
      te.featured = te.allFeatured, te.recommended = te.allRecommended;
      return;
    }
    const e = p.getRequestedCaipNetworkIds().join(",");
    te.featured = te.allFeatured.filter((s) => {
      var r;
      return (r = s.chains) == null ? void 0 : r.some((i) => e.includes(i));
    }), te.recommended = te.allRecommended.filter((s) => {
      var r;
      return (r = s.chains) == null ? void 0 : r.some((i) => e.includes(i));
    }), te.filteredWallets = te.wallets.filter((s) => {
      var r;
      return (r = s.chains) == null ? void 0 : r.some((i) => e.includes(i));
    });
  },
  clearFilterByNamespaces() {
    te.filteredWallets = [];
  },
  setFilterByNamespace(t) {
    if (!t) {
      te.featured = te.allFeatured, te.recommended = te.allRecommended;
      return;
    }
    const e = p.getRequestedCaipNetworkIds().join(",");
    te.featured = te.allFeatured.filter((s) => {
      var r;
      return (r = s.chains) == null ? void 0 : r.some((i) => e.includes(i));
    }), te.recommended = te.allRecommended.filter((s) => {
      var r;
      return (r = s.chains) == null ? void 0 : r.some((i) => e.includes(i));
    }), te.filteredWallets = te.wallets.filter((s) => {
      var r;
      return (r = s.chains) == null ? void 0 : r.some((i) => e.includes(i));
    });
  }
}, fe = Ae({
  view: "Connect",
  history: ["Connect"],
  transactionStack: []
}), ku = {
  state: fe,
  subscribeKey(t, e) {
    return Xe(fe, t, e);
  },
  pushTransactionStack(t) {
    fe.transactionStack.push(t);
  },
  popTransactionStack(t) {
    const e = fe.transactionStack.pop();
    if (!e)
      return;
    const { onSuccess: s, onError: r, onCancel: i } = e;
    switch (t) {
      case "success":
        s == null || s();
        break;
      case "error":
        r == null || r(), re.goBack();
        break;
      case "cancel":
        i == null || i(), re.goBack();
        break;
    }
  },
  push(t, e) {
    t !== fe.view && (fe.view = t, fe.history.push(t), fe.data = e);
  },
  reset(t, e) {
    fe.view = t, fe.history = [t], fe.data = e;
  },
  replace(t, e) {
    fe.history.at(-1) === t || (fe.view = t, fe.history[fe.history.length - 1] = t, fe.data = e);
  },
  goBack() {
    var r;
    const t = p.state.activeCaipAddress, e = re.state.view === "ConnectingFarcaster", s = !t && e;
    if (fe.history.length > 1) {
      fe.history.pop();
      const [i] = fe.history.slice(-1);
      i && (t && i === "Connect" ? fe.view = "Account" : fe.view = i);
    } else
      qe.close();
    (r = fe.data) != null && r.wallet && (fe.data.wallet = void 0), setTimeout(() => {
      var i, n, o;
      if (s) {
        W.setFarcasterUrl(void 0, p.state.activeChain);
        const a = B.getAuthConnector();
        (i = a == null ? void 0 : a.provider) == null || i.reload();
        const c = Qr(O.state);
        (o = (n = a == null ? void 0 : a.provider) == null ? void 0 : n.syncDappData) == null || o.call(n, {
          metadata: c.metadata,
          sdkVersion: c.sdkVersion,
          projectId: c.projectId,
          sdkType: c.sdkType
        });
      }
    }, 100);
  },
  goBackToIndex(t) {
    if (fe.history.length > 1) {
      fe.history = fe.history.slice(0, t + 1);
      const [e] = fe.history.slice(-1);
      e && (fe.view = e);
    }
  },
  goBackOrCloseModal() {
    re.state.history.length > 1 ? re.goBack() : qe.close();
  }
}, re = yt(ku), Yt = Ae({
  themeMode: "dark",
  themeVariables: {},
  w3mThemeVariables: void 0
}), Pn = {
  state: Yt,
  subscribe(t) {
    return Ye(Yt, () => t(Yt));
  },
  setThemeMode(t) {
    Yt.themeMode = t;
    try {
      const e = B.getAuthConnector();
      if (e) {
        const s = Pn.getSnapshot().themeVariables;
        e.provider.syncTheme({
          themeMode: t,
          themeVariables: s,
          w3mThemeVariables: gs(s, t)
        });
      }
    } catch {
      console.info("Unable to sync theme to auth connector");
    }
  },
  setThemeVariables(t) {
    Yt.themeVariables = { ...Yt.themeVariables, ...t };
    try {
      const e = B.getAuthConnector();
      if (e) {
        const s = Pn.getSnapshot().themeVariables;
        e.provider.syncTheme({
          themeVariables: s,
          w3mThemeVariables: gs(Yt.themeVariables, Yt.themeMode)
        });
      }
    } catch {
      console.info("Unable to sync theme to auth connector");
    }
  },
  getSnapshot() {
    return Qr(Yt);
  }
}, ht = yt(Pn), Ac = {
  eip155: void 0,
  solana: void 0,
  polkadot: void 0,
  bip122: void 0,
  cosmos: void 0
}, ae = Ae({
  allConnectors: [],
  connectors: [],
  activeConnector: void 0,
  filterByNamespace: void 0,
  activeConnectorIds: { ...Ac },
  filterByNamespaceMap: {
    eip155: !0,
    solana: !0,
    polkadot: !0,
    bip122: !0,
    cosmos: !0
  }
}), xu = {
  state: ae,
  subscribe(t) {
    return Ye(ae, () => {
      t(ae);
    });
  },
  subscribeKey(t, e) {
    return Xe(ae, t, e);
  },
  initialize(t) {
    t.forEach((e) => {
      const s = j.getConnectedConnectorId(e);
      s && B.setConnectorId(s, e);
    });
  },
  setActiveConnector(t) {
    t && (ae.activeConnector = Ds(t));
  },
  setConnectors(t) {
    t.filter((i) => !ae.allConnectors.some((n) => n.id === i.id && B.getConnectorName(n.name) === B.getConnectorName(i.name) && n.chain === i.chain)).forEach((i) => {
      i.type !== "MULTI_CHAIN" && ae.allConnectors.push(Ds(i));
    });
    const s = B.getEnabledNamespaces(), r = B.getEnabledConnectors(s);
    ae.connectors = B.mergeMultiChainConnectors(r);
  },
  filterByNamespaces(t) {
    Object.keys(ae.filterByNamespaceMap).forEach((e) => {
      ae.filterByNamespaceMap[e] = !1;
    }), t.forEach((e) => {
      ae.filterByNamespaceMap[e] = !0;
    }), B.updateConnectorsForEnabledNamespaces();
  },
  filterByNamespace(t, e) {
    ae.filterByNamespaceMap[t] = e, B.updateConnectorsForEnabledNamespaces();
  },
  updateConnectorsForEnabledNamespaces() {
    const t = B.getEnabledNamespaces(), e = B.getEnabledConnectors(t), s = B.areAllNamespacesEnabled();
    ae.connectors = B.mergeMultiChainConnectors(e), s ? K.clearFilterByNamespaces() : K.filterByNamespaces(t);
  },
  getEnabledNamespaces() {
    return Object.entries(ae.filterByNamespaceMap).filter(([t, e]) => e).map(([t]) => t);
  },
  getEnabledConnectors(t) {
    return ae.allConnectors.filter((e) => t.includes(e.chain));
  },
  areAllNamespacesEnabled() {
    return Object.values(ae.filterByNamespaceMap).every((t) => t);
  },
  mergeMultiChainConnectors(t) {
    const e = B.generateConnectorMapByName(t), s = [];
    return e.forEach((r) => {
      const i = r[0], n = (i == null ? void 0 : i.id) === z.CONNECTOR_ID.AUTH;
      r.length > 1 && i ? s.push({
        name: i.name,
        imageUrl: i.imageUrl,
        imageId: i.imageId,
        connectors: [...r],
        type: n ? "AUTH" : "MULTI_CHAIN",
        // These values are just placeholders, we don't use them in multi-chain connector select screen
        chain: "eip155",
        id: (i == null ? void 0 : i.id) || ""
      }) : i && s.push(i);
    }), s;
  },
  generateConnectorMapByName(t) {
    const e = /* @__PURE__ */ new Map();
    return t.forEach((s) => {
      const { name: r } = s, i = B.getConnectorName(r);
      if (!i)
        return;
      const n = e.get(i) || [];
      n.find((a) => a.chain === s.chain) || n.push(s), e.set(i, n);
    }), e;
  },
  getConnectorName(t) {
    return t && ({
      "Trust Wallet": "Trust"
    }[t] || t);
  },
  getUniqueConnectorsByName(t) {
    const e = [];
    return t.forEach((s) => {
      e.find((r) => r.chain === s.chain) || e.push(s);
    }), e;
  },
  addConnector(t) {
    var e, s, r;
    if (t.id === z.CONNECTOR_ID.AUTH) {
      const i = t, n = Qr(O.state), o = ht.getSnapshot().themeMode, a = ht.getSnapshot().themeVariables;
      (s = (e = i == null ? void 0 : i.provider) == null ? void 0 : e.syncDappData) == null || s.call(e, {
        metadata: n.metadata,
        sdkVersion: n.sdkVersion,
        projectId: n.projectId,
        sdkType: n.sdkType
      }), (r = i == null ? void 0 : i.provider) == null || r.syncTheme({
        themeMode: o,
        themeVariables: a,
        w3mThemeVariables: gs(a, o)
      }), B.setConnectors([t]);
    } else
      B.setConnectors([t]);
  },
  getAuthConnector(t) {
    var r;
    const e = t || p.state.activeChain, s = ae.connectors.find((i) => i.id === z.CONNECTOR_ID.AUTH);
    if (s)
      return (r = s == null ? void 0 : s.connectors) != null && r.length ? s.connectors.find((n) => n.chain === e) : s;
  },
  getAnnouncedConnectorRdns() {
    return ae.connectors.filter((t) => t.type === "ANNOUNCED").map((t) => {
      var e;
      return (e = t.info) == null ? void 0 : e.rdns;
    });
  },
  getConnectorById(t) {
    return ae.allConnectors.find((e) => e.id === t);
  },
  getConnector(t, e) {
    return ae.allConnectors.filter((r) => r.chain === p.state.activeChain).find((r) => {
      var i;
      return r.explorerId === t || ((i = r.info) == null ? void 0 : i.rdns) === e;
    });
  },
  syncIfAuthConnector(t) {
    var n, o;
    if (t.id !== "ID_AUTH")
      return;
    const e = t, s = Qr(O.state), r = ht.getSnapshot().themeMode, i = ht.getSnapshot().themeVariables;
    (o = (n = e == null ? void 0 : e.provider) == null ? void 0 : n.syncDappData) == null || o.call(n, {
      metadata: s.metadata,
      sdkVersion: s.sdkVersion,
      sdkType: s.sdkType,
      projectId: s.projectId
    }), e.provider.syncTheme({
      themeMode: r,
      themeVariables: i,
      w3mThemeVariables: gs(i, r)
    });
  },
  /**
   * Returns the connectors filtered by namespace.
   * @param namespace - The namespace to filter the connectors by.
   * @returns ConnectorWithProviders[].
   */
  getConnectorsByNamespace(t) {
    const e = ae.allConnectors.filter((s) => s.chain === t);
    return B.mergeMultiChainConnectors(e);
  },
  selectWalletConnector(t) {
    const e = B.getConnector(t.id, t.rdns), s = p.state.activeChain;
    Eu.handleMobileDeeplinkRedirect((e == null ? void 0 : e.explorerId) || t.id, s), e ? re.push("ConnectingExternal", { connector: e }) : re.push("ConnectingWalletConnect", { wallet: t });
  },
  /**
   * Returns the connectors. If a namespace is provided, the connectors are filtered by namespace.
   * @param namespace - The namespace to filter the connectors by. If not provided, all connectors are returned.
   * @returns ConnectorWithProviders[].
   */
  getConnectors(t) {
    return t ? B.getConnectorsByNamespace(t) : B.mergeMultiChainConnectors(ae.allConnectors);
  },
  /**
   * Sets the filter by namespace and updates the connectors.
   * @param namespace - The namespace to filter the connectors by.
   */
  setFilterByNamespace(t) {
    ae.filterByNamespace = t, ae.connectors = B.getConnectors(t), K.setFilterByNamespace(t);
  },
  setConnectorId(t, e) {
    t && (ae.activeConnectorIds = {
      ...ae.activeConnectorIds,
      [e]: t
    }, j.setConnectedConnectorId(e, t));
  },
  removeConnectorId(t) {
    ae.activeConnectorIds = {
      ...ae.activeConnectorIds,
      [t]: void 0
    }, j.deleteConnectedConnectorId(t);
  },
  getConnectorId(t) {
    if (t)
      return ae.activeConnectorIds[t];
  },
  isConnected(t) {
    return t ? !!ae.activeConnectorIds[t] : Object.values(ae.activeConnectorIds).some((e) => !!e);
  },
  resetConnectorIds() {
    ae.activeConnectorIds = { ...Ac };
  }
}, B = yt(xu), Ru = "https://secure.walletconnect.org/sdk";
typeof process < "u" && typeof process.env < "u" && process.env.NEXT_PUBLIC_SECURE_SITE_SDK_URL;
typeof process < "u" && typeof process.env < "u" && process.env.NEXT_PUBLIC_DEFAULT_LOG_LEVEL;
typeof process < "u" && typeof process.env < "u" && process.env.NEXT_PUBLIC_SECURE_SITE_SDK_VERSION;
const Hr = {
  ACCOUNT_TYPES: {
    SMART_ACCOUNT: "smartAccount"
  }
}, Ss = Object.freeze({
  message: "",
  variant: "success",
  svg: void 0,
  open: !1,
  autoClose: !0
}), $e = Ae({
  ...Ss
}), $u = {
  state: $e,
  subscribeKey(t, e) {
    return Xe($e, t, e);
  },
  showLoading(t, e = {}) {
    this._showMessage({ message: t, variant: "loading", ...e });
  },
  showSuccess(t) {
    this._showMessage({ message: t, variant: "success" });
  },
  showSvg(t, e) {
    this._showMessage({ message: t, svg: e });
  },
  showError(t) {
    const e = X.parseError(t);
    this._showMessage({ message: e, variant: "error" });
  },
  hide() {
    $e.message = Ss.message, $e.variant = Ss.variant, $e.svg = Ss.svg, $e.open = Ss.open, $e.autoClose = Ss.autoClose;
  },
  _showMessage({ message: t, svg: e, variant: s = "success", autoClose: r = Ss.autoClose }) {
    $e.open ? ($e.open = !1, setTimeout(() => {
      $e.message = t, $e.variant = s, $e.svg = e, $e.open = !0, $e.autoClose = r;
    }, 150)) : ($e.message = t, $e.variant = s, $e.svg = e, $e.open = !0, $e.autoClose = r);
  }
}, Rt = $u, Ce = Ae({
  transactions: [],
  coinbaseTransactions: {},
  transactionsByYear: {},
  lastNetworkInView: void 0,
  loading: !1,
  empty: !1,
  next: void 0
}), Uu = {
  state: Ce,
  subscribe(t) {
    return Ye(Ce, () => t(Ce));
  },
  setLastNetworkInView(t) {
    Ce.lastNetworkInView = t;
  },
  async fetchTransactions(t, e) {
    var s, r;
    if (!t)
      throw new Error("Transactions can't be fetched without an accountAddress");
    Ce.loading = !0;
    try {
      const i = await J.fetchTransactions({
        account: t,
        cursor: Ce.next,
        onramp: e,
        // Coinbase transaction history state updates require the latest data
        cache: e === "coinbase" ? "no-cache" : void 0,
        chainId: (s = p.state.activeCaipNetwork) == null ? void 0 : s.caipNetworkId
      }), n = Br.filterSpamTransactions(i.data), o = Br.filterByConnectedChain(n), a = [...Ce.transactions, ...o];
      Ce.loading = !1, e === "coinbase" ? Ce.coinbaseTransactions = Br.groupTransactionsByYearAndMonth(Ce.coinbaseTransactions, i.data) : (Ce.transactions = a, Ce.transactionsByYear = Br.groupTransactionsByYearAndMonth(Ce.transactionsByYear, o)), Ce.empty = a.length === 0, Ce.next = i.next ? i.next : void 0;
    } catch {
      const n = p.state.activeChain;
      Se.sendEvent({
        type: "track",
        event: "ERROR_FETCH_TRANSACTIONS",
        properties: {
          address: t,
          projectId: O.state.projectId,
          cursor: Ce.next,
          isSmartAccount: ((r = W.state.preferredAccountTypes) == null ? void 0 : r[n]) === Hr.ACCOUNT_TYPES.SMART_ACCOUNT
        }
      }), Rt.showError("Failed to fetch transactions"), Ce.loading = !1, Ce.empty = !0, Ce.next = void 0;
    }
  },
  groupTransactionsByYearAndMonth(t = {}, e = []) {
    const s = t;
    return e.forEach((r) => {
      const i = new Date(r.metadata.minedAt).getFullYear(), n = new Date(r.metadata.minedAt).getMonth(), o = s[i] ?? {}, c = (o[n] ?? []).filter((l) => l.id !== r.id);
      s[i] = {
        ...o,
        [n]: [...c, r].sort((l, u) => new Date(u.metadata.minedAt).getTime() - new Date(l.metadata.minedAt).getTime())
      };
    }), s;
  },
  filterSpamTransactions(t) {
    return t.filter((e) => !e.transfers.every((r) => {
      var i;
      return ((i = r.nft_info) == null ? void 0 : i.flags.is_spam) === !0;
    }));
  },
  filterByConnectedChain(t) {
    var r;
    const e = (r = p.state.activeCaipNetwork) == null ? void 0 : r.caipNetworkId;
    return t.filter((i) => i.metadata.chain === e);
  },
  clearCursor() {
    Ce.next = void 0;
  },
  resetTransactions() {
    Ce.transactions = [], Ce.transactionsByYear = {}, Ce.lastNetworkInView = void 0, Ce.loading = !1, Ce.empty = !1, Ce.next = void 0;
  }
}, Br = yt(Uu, "API_ERROR"), we = Ae({
  connections: /* @__PURE__ */ new Map(),
  wcError: !1,
  buffering: !1,
  status: "disconnected"
});
let Ns;
const Du = {
  state: we,
  subscribeKey(t, e) {
    return Xe(we, t, e);
  },
  _getClient() {
    return we._client;
  },
  setClient(t) {
    we._client = Ds(t);
  },
  async connectWalletConnect() {
    var t, e, s, r;
    if (X.isTelegram() || X.isSafari() && X.isIos()) {
      if (Ns) {
        await Ns, Ns = void 0;
        return;
      }
      if (!X.isPairingExpired(we == null ? void 0 : we.wcPairingExpiry)) {
        const i = we.wcUri;
        we.wcUri = i;
        return;
      }
      Ns = (e = (t = Y._getClient()) == null ? void 0 : t.connectWalletConnect) == null ? void 0 : e.call(t).catch(() => {
      }), Y.state.status = "connecting", await Ns, Ns = void 0, we.wcPairingExpiry = void 0, Y.state.status = "connected";
    } else
      await ((r = (s = Y._getClient()) == null ? void 0 : s.connectWalletConnect) == null ? void 0 : r.call(s));
  },
  async connectExternal(t, e, s = !0) {
    var r, i;
    await ((i = (r = Y._getClient()) == null ? void 0 : r.connectExternal) == null ? void 0 : i.call(r, t)), s && p.setActiveNamespace(e);
  },
  async reconnectExternal(t) {
    var s, r;
    await ((r = (s = Y._getClient()) == null ? void 0 : s.reconnectExternal) == null ? void 0 : r.call(s, t));
    const e = t.chain || p.state.activeChain;
    e && B.setConnectorId(t.id, e);
  },
  async setPreferredAccountType(t, e) {
    var r;
    qe.setLoading(!0, p.state.activeChain);
    const s = B.getAuthConnector();
    s && (W.setPreferredAccountType(t, e), await s.provider.setPreferredAccount(t), j.setPreferredAccountTypes(W.state.preferredAccountTypes ?? { [e]: t }), await Y.reconnectExternal(s), qe.setLoading(!1, p.state.activeChain), Se.sendEvent({
      type: "track",
      event: "SET_PREFERRED_ACCOUNT_TYPE",
      properties: {
        accountType: t,
        network: ((r = p.state.activeCaipNetwork) == null ? void 0 : r.caipNetworkId) || ""
      }
    }));
  },
  async signMessage(t) {
    var e;
    return (e = Y._getClient()) == null ? void 0 : e.signMessage(t);
  },
  parseUnits(t, e) {
    var s;
    return (s = Y._getClient()) == null ? void 0 : s.parseUnits(t, e);
  },
  formatUnits(t, e) {
    var s;
    return (s = Y._getClient()) == null ? void 0 : s.formatUnits(t, e);
  },
  async sendTransaction(t) {
    var e;
    return (e = Y._getClient()) == null ? void 0 : e.sendTransaction(t);
  },
  async getCapabilities(t) {
    var e;
    return (e = Y._getClient()) == null ? void 0 : e.getCapabilities(t);
  },
  async grantPermissions(t) {
    var e;
    return (e = Y._getClient()) == null ? void 0 : e.grantPermissions(t);
  },
  async walletGetAssets(t) {
    var e;
    return ((e = Y._getClient()) == null ? void 0 : e.walletGetAssets(t)) ?? {};
  },
  async estimateGas(t) {
    var e;
    return (e = Y._getClient()) == null ? void 0 : e.estimateGas(t);
  },
  async writeContract(t) {
    var e;
    return (e = Y._getClient()) == null ? void 0 : e.writeContract(t);
  },
  async getEnsAddress(t) {
    var e;
    return (e = Y._getClient()) == null ? void 0 : e.getEnsAddress(t);
  },
  async getEnsAvatar(t) {
    var e;
    return (e = Y._getClient()) == null ? void 0 : e.getEnsAvatar(t);
  },
  checkInstalled(t) {
    var e, s;
    return ((s = (e = Y._getClient()) == null ? void 0 : e.checkInstalled) == null ? void 0 : s.call(e, t)) || !1;
  },
  resetWcConnection() {
    we.wcUri = void 0, we.wcPairingExpiry = void 0, we.wcLinking = void 0, we.recentWallet = void 0, we.status = "disconnected", Br.resetTransactions(), j.deleteWalletConnectDeepLink();
  },
  resetUri() {
    we.wcUri = void 0, we.wcPairingExpiry = void 0, Ns = void 0;
  },
  finalizeWcConnection() {
    var s, r;
    const { wcLinking: t, recentWallet: e } = Y.state;
    t && j.setWalletConnectDeepLink(t), e && j.setAppKitRecent(e), Se.sendEvent({
      type: "track",
      event: "CONNECT_SUCCESS",
      properties: {
        method: t ? "mobile" : "qrcode",
        name: ((r = (s = re.state.data) == null ? void 0 : s.wallet) == null ? void 0 : r.name) || "Unknown"
      }
    });
  },
  setWcBasic(t) {
    we.wcBasic = t;
  },
  setUri(t) {
    we.wcUri = t, we.wcPairingExpiry = X.getPairingExpiry();
  },
  setWcLinking(t) {
    we.wcLinking = t;
  },
  setWcError(t) {
    we.wcError = t, we.buffering = !1;
  },
  setRecentWallet(t) {
    we.recentWallet = t;
  },
  setBuffering(t) {
    we.buffering = t;
  },
  setStatus(t) {
    we.status = t;
  },
  async disconnect(t) {
    var e;
    try {
      await ((e = Y._getClient()) == null ? void 0 : e.disconnect(t));
    } catch (s) {
      throw new mr("Failed to disconnect", "INTERNAL_SDK_ERROR", s);
    }
  },
  setConnections(t, e) {
    we.connections.set(e, t);
  },
  switchAccount({ connection: t, address: e, namespace: s }) {
    if (B.state.activeConnectorIds[s] === t.connectorId) {
      const n = p.state.activeCaipNetwork;
      if (n) {
        const o = `${s}:${n.id}:${e}`;
        W.setCaipAddress(o, s);
      } else
        console.warn(`No current network found for namespace "${s}"`);
    } else {
      const n = B.getConnector(t.connectorId);
      n ? Y.connectExternal(n, s) : console.warn(`No connector found for namespace "${s}"`);
    }
  }
}, Y = yt(Du), Ws = Ae({
  loading: !1,
  open: !1,
  selectedNetworkId: void 0,
  activeChain: void 0,
  initialized: !1
}), ms = {
  state: Ws,
  subscribe(t) {
    return Ye(Ws, () => t(Ws));
  },
  subscribeOpen(t) {
    return Xe(Ws, "open", t);
  },
  set(t) {
    Object.assign(Ws, { ...Ws, ...t });
  }
}, en = {
  /**
   * Creates a Balance object from an ERC7811 Asset object
   * @param asset - Asset object to convert
   * @param chainId - Chain ID in CAIP-2 format
   * @returns Balance object
   */
  createBalance(t, e) {
    const s = {
      name: t.metadata.name || "",
      symbol: t.metadata.symbol || "",
      decimals: t.metadata.decimals || 0,
      value: t.metadata.value || 0,
      price: t.metadata.price || 0,
      iconUrl: t.metadata.iconUrl || ""
    };
    return {
      name: s.name,
      symbol: s.symbol,
      chainId: e,
      address: t.address === "native" ? void 0 : this.convertAddressToCAIP10Address(t.address, e),
      value: s.value,
      price: s.price,
      quantity: {
        decimals: s.decimals.toString(),
        numeric: this.convertHexToBalance({
          hex: t.balance,
          decimals: s.decimals
        })
      },
      iconUrl: s.iconUrl
    };
  },
  /**
   * Converts a hex string to a Balance object
   * @param hex - Hex string to convert
   * @param decimals - Number of decimals to use
   * @returns Balance object
   */
  convertHexToBalance({ hex: t, decimals: e }) {
    return tu(BigInt(t), e);
  },
  /**
   * Converts an address to a CAIP-10 address
   * @param address - Address to convert
   * @param chainId - Chain ID in CAIP-2 format
   * @returns CAIP-10 address
   */
  convertAddressToCAIP10Address(t, e) {
    return `${e}:${t}`;
  },
  /**
   *  Creates a CAIP-2 Chain ID from a chain ID and namespace
   * @param chainId  - Chain ID in hex format
   * @param namespace  - Chain namespace
   * @returns
   */
  createCAIP2ChainId(t, e) {
    return `${e}:${parseInt(t, 16)}`;
  },
  /**
   * Gets the chain ID in hex format from a CAIP-2 Chain ID
   * @param caip2ChainId - CAIP-2 Chain ID
   * @returns Chain ID in hex format
   */
  getChainIdHexFromCAIP2ChainId(t) {
    const e = t.split(":");
    if (e.length < 2 || !e[1])
      return "0x0";
    const s = e[1], r = parseInt(s, 10);
    return isNaN(r) ? "0x0" : `0x${r.toString(16)}`;
  },
  /**
   * Checks if a response is a valid WalletGetAssetsResponse
   * @param response - The response to check
   * @returns True if the response is a valid WalletGetAssetsResponse, false otherwise
   */
  isWalletGetAssetsResponse(t) {
    return typeof t != "object" || t === null ? !1 : Object.values(t).every((e) => Array.isArray(e) && e.every((s) => this.isValidAsset(s)));
  },
  /**
   * Checks if an asset object is valid.
   * @param asset - The asset object to check.
   * @returns True if the asset is valid, false otherwise.
   */
  isValidAsset(t) {
    return typeof t == "object" && t !== null && typeof t.address == "string" && typeof t.balance == "string" && (t.type === "ERC20" || t.type === "NATIVE") && typeof t.metadata == "object" && t.metadata !== null && typeof t.metadata.name == "string" && typeof t.metadata.symbol == "string" && typeof t.metadata.decimals == "number" && typeof t.metadata.price == "number" && typeof t.metadata.iconUrl == "string";
  }
}, ko = {
  async getMyTokensWithBalance(t) {
    const e = W.state.address, s = p.state.activeCaipNetwork;
    if (!e || !s)
      return [];
    if (s.chainNamespace === "eip155") {
      const i = await this.getEIP155Balances(e, s);
      if (i)
        return this.filterLowQualityTokens(i);
    }
    const r = await J.getBalance(e, s.caipNetworkId, t);
    return this.filterLowQualityTokens(r.balances);
  },
  async getEIP155Balances(t, e) {
    var s, r;
    try {
      const i = en.getChainIdHexFromCAIP2ChainId(e.caipNetworkId), n = await Y.getCapabilities(t);
      if (!((r = (s = n == null ? void 0 : n[i]) == null ? void 0 : s.assetDiscovery) != null && r.supported))
        return null;
      const o = await Y.walletGetAssets({
        account: t,
        chainFilter: [i]
      });
      return en.isWalletGetAssetsResponse(o) ? (o[i] || []).map((c) => en.createBalance(c, e.caipNetworkId)) : null;
    } catch {
      return null;
    }
  },
  /**
   * The 1Inch API includes many low-quality tokens in the balance response,
   * which appear inconsistently. This filter prevents them from being displayed.
   */
  filterLowQualityTokens(t) {
    return t.filter((e) => e.quantity.decimals !== "0");
  },
  mapBalancesToSwapTokens(t) {
    return (t == null ? void 0 : t.map((e) => ({
      ...e,
      address: e != null && e.address ? e.address : p.getActiveNetworkTokenAddress(),
      decimals: parseInt(e.quantity.decimals, 10),
      logoUri: e.iconUrl,
      eip2612: !1
    }))) || [];
  }
}, ge = Ae({
  tokenBalances: [],
  loading: !1
}), Lu = {
  state: ge,
  subscribe(t) {
    return Ye(ge, () => t(ge));
  },
  subscribeKey(t, e) {
    return Xe(ge, t, e);
  },
  setToken(t) {
    t && (ge.token = Ds(t));
  },
  setTokenAmount(t) {
    ge.sendTokenAmount = t;
  },
  setReceiverAddress(t) {
    ge.receiverAddress = t;
  },
  setReceiverProfileImageUrl(t) {
    ge.receiverProfileImageUrl = t;
  },
  setReceiverProfileName(t) {
    ge.receiverProfileName = t;
  },
  setNetworkBalanceInUsd(t) {
    ge.networkBalanceInUSD = t;
  },
  setLoading(t) {
    ge.loading = t;
  },
  async sendToken() {
    var t;
    try {
      switch (de.setLoading(!0), (t = p.state.activeCaipNetwork) == null ? void 0 : t.chainNamespace) {
        case "eip155":
          await de.sendEvmToken();
          return;
        case "solana":
          await de.sendSolanaToken();
          return;
        default:
          throw new Error("Unsupported chain");
      }
    } finally {
      de.setLoading(!1);
    }
  },
  async sendEvmToken() {
    var s, r, i, n;
    const t = p.state.activeChain, e = (s = W.state.preferredAccountTypes) == null ? void 0 : s[t];
    if (!de.state.sendTokenAmount || !de.state.receiverAddress)
      throw new Error("An amount and receiver address are required");
    if (!de.state.token)
      throw new Error("A token is required");
    (r = de.state.token) != null && r.address ? (Se.sendEvent({
      type: "track",
      event: "SEND_INITIATED",
      properties: {
        isSmartAccount: e === Hr.ACCOUNT_TYPES.SMART_ACCOUNT,
        token: de.state.token.address,
        amount: de.state.sendTokenAmount,
        network: ((i = p.state.activeCaipNetwork) == null ? void 0 : i.caipNetworkId) || ""
      }
    }), await de.sendERC20Token({
      receiverAddress: de.state.receiverAddress,
      tokenAddress: de.state.token.address,
      sendTokenAmount: de.state.sendTokenAmount,
      decimals: de.state.token.quantity.decimals
    })) : (Se.sendEvent({
      type: "track",
      event: "SEND_INITIATED",
      properties: {
        isSmartAccount: e === Hr.ACCOUNT_TYPES.SMART_ACCOUNT,
        token: de.state.token.symbol || "",
        amount: de.state.sendTokenAmount,
        network: ((n = p.state.activeCaipNetwork) == null ? void 0 : n.caipNetworkId) || ""
      }
    }), await de.sendNativeToken({
      receiverAddress: de.state.receiverAddress,
      sendTokenAmount: de.state.sendTokenAmount,
      decimals: de.state.token.quantity.decimals
    }));
  },
  async fetchTokenBalance(t) {
    var n, o;
    ge.loading = !0;
    const e = (n = p.state.activeCaipNetwork) == null ? void 0 : n.caipNetworkId, s = (o = p.state.activeCaipNetwork) == null ? void 0 : o.chainNamespace, r = p.state.activeCaipAddress, i = r ? X.getPlainAddress(r) : void 0;
    if (ge.lastRetry && !X.isAllowedRetry(ge.lastRetry, 30 * ve.ONE_SEC_MS))
      return ge.loading = !1, [];
    try {
      if (i && e && s) {
        const a = await ko.getMyTokensWithBalance();
        return ge.tokenBalances = a, ge.lastRetry = void 0, a;
      }
    } catch (a) {
      ge.lastRetry = Date.now(), t == null || t(a), Rt.showError("Token Balance Unavailable");
    } finally {
      ge.loading = !1;
    }
    return [];
  },
  fetchNetworkBalance() {
    if (ge.tokenBalances.length === 0)
      return;
    const t = ko.mapBalancesToSwapTokens(ge.tokenBalances);
    if (!t)
      return;
    const e = t.find((s) => s.address === p.getActiveNetworkTokenAddress());
    e && (ge.networkBalanceInUSD = e ? ru.multiply(e.quantity.numeric, e.price).toString() : "0");
  },
  async sendNativeToken(t) {
    var n, o, a, c;
    re.pushTransactionStack({});
    const e = t.receiverAddress, s = W.state.address, r = Y.parseUnits(t.sendTokenAmount.toString(), Number(t.decimals));
    await Y.sendTransaction({
      chainNamespace: "eip155",
      to: e,
      address: s,
      data: "0x",
      value: r ?? BigInt(0)
    }), Se.sendEvent({
      type: "track",
      event: "SEND_SUCCESS",
      properties: {
        isSmartAccount: ((n = W.state.preferredAccountTypes) == null ? void 0 : n.eip155) === Hr.ACCOUNT_TYPES.SMART_ACCOUNT,
        token: ((o = de.state.token) == null ? void 0 : o.symbol) || "",
        amount: t.sendTokenAmount,
        network: ((a = p.state.activeCaipNetwork) == null ? void 0 : a.caipNetworkId) || ""
      }
    }), (c = Y._getClient()) == null || c.updateBalance("eip155"), de.resetSend();
  },
  async sendERC20Token(t) {
    re.pushTransactionStack({
      onSuccess() {
        re.replace("Account");
      }
    });
    const e = Y.parseUnits(t.sendTokenAmount.toString(), Number(t.decimals));
    if (W.state.address && t.sendTokenAmount && t.receiverAddress && t.tokenAddress) {
      const s = X.getPlainAddress(t.tokenAddress);
      await Y.writeContract({
        fromAddress: W.state.address,
        tokenAddress: s,
        args: [t.receiverAddress, e ?? BigInt(0)],
        method: "transfer",
        abi: au.getERC20Abi(s),
        chainNamespace: "eip155"
      }), de.resetSend();
    }
  },
  async sendSolanaToken() {
    var t;
    if (!de.state.sendTokenAmount || !de.state.receiverAddress)
      throw new Error("An amount and receiver address are required");
    re.pushTransactionStack({
      onSuccess() {
        re.replace("Account");
      }
    }), await Y.sendTransaction({
      chainNamespace: "solana",
      to: de.state.receiverAddress,
      value: de.state.sendTokenAmount
    }), (t = Y._getClient()) == null || t.updateBalance("solana"), de.resetSend();
  },
  resetSend() {
    ge.token = void 0, ge.sendTokenAmount = void 0, ge.receiverAddress = void 0, ge.receiverProfileImageUrl = void 0, ge.receiverProfileName = void 0, ge.loading = !1, ge.tokenBalances = [];
  }
}, de = yt(Lu), tn = {
  currentTab: 0,
  tokenBalance: [],
  smartAccountDeployed: !1,
  addressLabels: /* @__PURE__ */ new Map(),
  allAccounts: [],
  user: void 0
}, wi = {
  caipNetwork: void 0,
  supportsAllNetworks: !0,
  smartAccountEnabledNetworks: []
}, F = Ae({
  chains: pu(),
  activeCaipAddress: void 0,
  activeChain: void 0,
  activeCaipNetwork: void 0,
  noAdapters: !1,
  universalAdapter: {
    networkControllerClient: void 0,
    connectionControllerClient: void 0
  },
  isSwitchingNamespace: !1
}), Fu = {
  state: F,
  subscribe(t) {
    return Ye(F, () => {
      t(F);
    });
  },
  subscribeKey(t, e) {
    return Xe(F, t, e);
  },
  subscribeChainProp(t, e, s) {
    let r;
    return Ye(F.chains, () => {
      var n;
      const i = s || F.activeChain;
      if (i) {
        const o = (n = F.chains.get(i)) == null ? void 0 : n[t];
        r !== o && (r = o, e(o));
      }
    });
  },
  initialize(t, e, s) {
    const { chainId: r, namespace: i } = j.getActiveNetworkProps(), n = e == null ? void 0 : e.find((u) => u.id.toString() === (r == null ? void 0 : r.toString())), a = t.find((u) => (u == null ? void 0 : u.namespace) === i) || (t == null ? void 0 : t[0]), c = t.map((u) => u.namespace).filter((u) => u !== void 0), l = O.state.enableEmbedded ? /* @__PURE__ */ new Set([...c]) : /* @__PURE__ */ new Set([...(e == null ? void 0 : e.map((u) => u.chainNamespace)) ?? []]);
    ((t == null ? void 0 : t.length) === 0 || !a) && (F.noAdapters = !0), F.noAdapters || (F.activeChain = a == null ? void 0 : a.namespace, F.activeCaipNetwork = n, p.setChainNetworkData(a == null ? void 0 : a.namespace, {
      caipNetwork: n
    }), F.activeChain && ms.set({ activeChain: a == null ? void 0 : a.namespace })), l.forEach((u) => {
      const d = e == null ? void 0 : e.filter((h) => h.chainNamespace === u);
      p.state.chains.set(u, {
        namespace: u,
        networkState: Ae({
          ...wi,
          caipNetwork: d == null ? void 0 : d[0]
        }),
        accountState: Ae(tn),
        caipNetworks: d ?? [],
        ...s
      }), p.setRequestedCaipNetworks(d ?? [], u);
    });
  },
  removeAdapter(t) {
    var e, s;
    if (F.activeChain === t) {
      const r = Array.from(F.chains.entries()).find(([i]) => i !== t);
      if (r) {
        const i = (s = (e = r[1]) == null ? void 0 : e.caipNetworks) == null ? void 0 : s[0];
        i && p.setActiveCaipNetwork(i);
      }
    }
    F.chains.delete(t);
  },
  addAdapter(t, { networkControllerClient: e, connectionControllerClient: s }, r) {
    F.chains.set(t.namespace, {
      namespace: t.namespace,
      networkState: {
        ...wi,
        caipNetwork: r[0]
      },
      accountState: tn,
      caipNetworks: r,
      connectionControllerClient: s,
      networkControllerClient: e
    }), p.setRequestedCaipNetworks((r == null ? void 0 : r.filter((i) => i.chainNamespace === t.namespace)) ?? [], t.namespace);
  },
  addNetwork(t) {
    var s;
    const e = F.chains.get(t.chainNamespace);
    if (e) {
      const r = [...e.caipNetworks || []];
      (s = e.caipNetworks) != null && s.find((i) => i.id === t.id) || r.push(t), F.chains.set(t.chainNamespace, { ...e, caipNetworks: r }), p.setRequestedCaipNetworks(r, t.chainNamespace), B.filterByNamespace(t.chainNamespace, !0);
    }
  },
  removeNetwork(t, e) {
    var r, i, n;
    const s = F.chains.get(t);
    if (s) {
      const o = ((r = F.activeCaipNetwork) == null ? void 0 : r.id) === e, a = [
        ...((i = s.caipNetworks) == null ? void 0 : i.filter((c) => c.id !== e)) || []
      ];
      o && ((n = s == null ? void 0 : s.caipNetworks) != null && n[0]) && p.setActiveCaipNetwork(s.caipNetworks[0]), F.chains.set(t, { ...s, caipNetworks: a }), p.setRequestedCaipNetworks(a || [], t), a.length === 0 && B.filterByNamespace(t, !1);
    }
  },
  setAdapterNetworkState(t, e) {
    const s = F.chains.get(t);
    s && (s.networkState = {
      ...s.networkState || wi,
      ...e
    }, F.chains.set(t, s));
  },
  setChainAccountData(t, e, s = !0) {
    if (!t)
      throw new Error("Chain is required to update chain account data");
    const r = F.chains.get(t);
    if (r) {
      const i = { ...r.accountState || tn, ...e };
      F.chains.set(t, { ...r, accountState: i }), (F.chains.size === 1 || F.activeChain === t) && (e.caipAddress && (F.activeCaipAddress = e.caipAddress), W.replaceState(i));
    }
  },
  setChainNetworkData(t, e) {
    if (!t)
      return;
    const s = F.chains.get(t);
    if (s) {
      const r = { ...s.networkState || wi, ...e };
      F.chains.set(t, { ...s, networkState: r });
    }
  },
  // eslint-disable-next-line max-params
  setAccountProp(t, e, s, r = !0) {
    p.setChainAccountData(s, { [t]: e }, r), t === "status" && e === "disconnected" && s && B.removeConnectorId(s);
  },
  setActiveNamespace(t) {
    var r, i;
    F.activeChain = t;
    const e = t ? F.chains.get(t) : void 0, s = (r = e == null ? void 0 : e.networkState) == null ? void 0 : r.caipNetwork;
    s != null && s.id && t && (F.activeCaipAddress = (i = e == null ? void 0 : e.accountState) == null ? void 0 : i.caipAddress, F.activeCaipNetwork = s, p.setChainNetworkData(t, { caipNetwork: s }), j.setActiveCaipNetworkId(s == null ? void 0 : s.caipNetworkId), ms.set({
      activeChain: t,
      selectedNetworkId: s == null ? void 0 : s.caipNetworkId
    }));
  },
  setActiveCaipNetwork(t) {
    var r, i, n;
    if (!t)
      return;
    F.activeChain !== t.chainNamespace && p.setIsSwitchingNamespace(!0);
    const e = F.chains.get(t.chainNamespace);
    F.activeChain = t.chainNamespace, F.activeCaipNetwork = t, p.setChainNetworkData(t.chainNamespace, { caipNetwork: t }), (r = e == null ? void 0 : e.accountState) != null && r.address ? F.activeCaipAddress = `${t.chainNamespace}:${t.id}:${(i = e == null ? void 0 : e.accountState) == null ? void 0 : i.address}` : F.activeCaipAddress = void 0, p.setAccountProp("caipAddress", F.activeCaipAddress, t.chainNamespace), e && W.replaceState(e.accountState), de.resetSend(), ms.set({
      activeChain: F.activeChain,
      selectedNetworkId: (n = F.activeCaipNetwork) == null ? void 0 : n.caipNetworkId
    }), j.setActiveCaipNetworkId(t.caipNetworkId), !p.checkIfSupportedNetwork(t.chainNamespace) && O.state.enableNetworkSwitch && !O.state.allowUnsupportedChain && !Y.state.wcBasic && p.showUnsupportedChainUI();
  },
  addCaipNetwork(t) {
    var s;
    if (!t)
      return;
    const e = F.chains.get(t.chainNamespace);
    e && ((s = e == null ? void 0 : e.caipNetworks) == null || s.push(t));
  },
  async switchActiveNamespace(t) {
    var i;
    if (!t)
      return;
    const e = t !== p.state.activeChain, s = (i = p.getNetworkData(t)) == null ? void 0 : i.caipNetwork, r = p.getCaipNetworkByNamespace(t, s == null ? void 0 : s.id);
    e && r && await p.switchActiveNetwork(r);
  },
  async switchActiveNetwork(t) {
    var i;
    const e = p.state.chains.get(p.state.activeChain), s = !((i = e == null ? void 0 : e.caipNetworks) != null && i.some((n) => {
      var o;
      return n.id === ((o = F.activeCaipNetwork) == null ? void 0 : o.id);
    })), r = p.getNetworkControllerClient(t.chainNamespace);
    if (r) {
      try {
        await r.switchCaipNetwork(t), s && qe.close();
      } catch {
        re.goBack();
      }
      Se.sendEvent({
        type: "track",
        event: "SWITCH_NETWORK",
        properties: { network: t.caipNetworkId }
      });
    }
  },
  getNetworkControllerClient(t) {
    const e = t || F.activeChain, s = F.chains.get(e);
    if (!s)
      throw new Error("Chain adapter not found");
    if (!s.networkControllerClient)
      throw new Error("NetworkController client not set");
    return s.networkControllerClient;
  },
  getConnectionControllerClient(t) {
    const e = t || F.activeChain;
    if (!e)
      throw new Error("Chain is required to get connection controller client");
    const s = F.chains.get(e);
    if (!(s != null && s.connectionControllerClient))
      throw new Error("ConnectionController client not set");
    return s.connectionControllerClient;
  },
  getAccountProp(t, e) {
    var i;
    let s = F.activeChain;
    if (e && (s = e), !s)
      return;
    const r = (i = F.chains.get(s)) == null ? void 0 : i.accountState;
    if (r)
      return r[t];
  },
  getNetworkProp(t, e) {
    var r;
    const s = (r = F.chains.get(e)) == null ? void 0 : r.networkState;
    if (s)
      return s[t];
  },
  getRequestedCaipNetworks(t) {
    const e = F.chains.get(t), { approvedCaipNetworkIds: s = [], requestedCaipNetworks: r = [] } = (e == null ? void 0 : e.networkState) || {};
    return X.sortRequestedNetworks(s, r);
  },
  getAllRequestedCaipNetworks() {
    const t = [];
    return F.chains.forEach((e) => {
      const s = p.getRequestedCaipNetworks(e.namespace);
      t.push(...s);
    }), t;
  },
  setRequestedCaipNetworks(t, e) {
    p.setAdapterNetworkState(e, { requestedCaipNetworks: t });
    const r = p.getAllRequestedCaipNetworks().map((n) => n.chainNamespace), i = Array.from(new Set(r));
    B.filterByNamespaces(i);
  },
  getAllApprovedCaipNetworkIds() {
    const t = [];
    return F.chains.forEach((e) => {
      const s = p.getApprovedCaipNetworkIds(e.namespace);
      t.push(...s);
    }), t;
  },
  getActiveCaipNetwork() {
    return F.activeCaipNetwork;
  },
  getActiveCaipAddress() {
    return F.activeCaipAddress;
  },
  getApprovedCaipNetworkIds(t) {
    var r;
    const e = F.chains.get(t);
    return ((r = e == null ? void 0 : e.networkState) == null ? void 0 : r.approvedCaipNetworkIds) || [];
  },
  async setApprovedCaipNetworksData(t) {
    const e = p.getNetworkControllerClient(), s = await (e == null ? void 0 : e.getApprovedCaipNetworksData());
    p.setAdapterNetworkState(t, {
      approvedCaipNetworkIds: s == null ? void 0 : s.approvedCaipNetworkIds,
      supportsAllNetworks: s == null ? void 0 : s.supportsAllNetworks
    });
  },
  checkIfSupportedNetwork(t, e) {
    const s = e || F.activeCaipNetwork, r = p.getRequestedCaipNetworks(t);
    return r.length ? r == null ? void 0 : r.some((i) => i.id === (s == null ? void 0 : s.id)) : !0;
  },
  checkIfSupportedChainId(t) {
    if (!F.activeChain)
      return !0;
    const e = p.getRequestedCaipNetworks(F.activeChain);
    return e == null ? void 0 : e.some((s) => s.id === t);
  },
  // Smart Account Network Handlers
  setSmartAccountEnabledNetworks(t, e) {
    p.setAdapterNetworkState(e, { smartAccountEnabledNetworks: t });
  },
  checkIfSmartAccountEnabled() {
    var r;
    const t = Cc.caipNetworkIdToNumber((r = F.activeCaipNetwork) == null ? void 0 : r.caipNetworkId), e = F.activeChain;
    if (!e || !t)
      return !1;
    const s = p.getNetworkProp("smartAccountEnabledNetworks", e);
    return !!(s != null && s.includes(Number(t)));
  },
  getActiveNetworkTokenAddress() {
    var r, i;
    const t = ((r = F.activeCaipNetwork) == null ? void 0 : r.chainNamespace) || "eip155", e = ((i = F.activeCaipNetwork) == null ? void 0 : i.id) || 1, s = ve.NATIVE_TOKEN_ADDRESS[t];
    return `${t}:${e}:${s}`;
  },
  showUnsupportedChainUI() {
    qe.open({ view: "UnsupportedChain" });
  },
  checkIfNamesSupported() {
    const t = F.activeCaipNetwork;
    return !!(t != null && t.chainNamespace && ve.NAMES_SUPPORTED_CHAIN_NAMESPACES.includes(t.chainNamespace));
  },
  resetNetwork(t) {
    p.setAdapterNetworkState(t, {
      approvedCaipNetworkIds: void 0,
      supportsAllNetworks: !0,
      smartAccountEnabledNetworks: []
    });
  },
  resetAccount(t) {
    const e = t;
    if (!e)
      throw new Error("Chain is required to set account prop");
    F.activeCaipAddress = void 0, p.setChainAccountData(e, {
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
      preferredAccountTypes: void 0,
      socialProvider: void 0,
      socialWindow: void 0,
      farcasterUrl: void 0,
      allAccounts: [],
      user: void 0,
      status: "disconnected"
    }), B.removeConnectorId(e);
  },
  setIsSwitchingNamespace(t) {
    F.isSwitchingNamespace = t;
  },
  getFirstCaipNetworkSupportsAuthConnector() {
    var s, r;
    const t = [];
    let e;
    if (F.chains.forEach((i) => {
      z.AUTH_CONNECTOR_SUPPORTED_CHAINS.find((n) => n === i.namespace) && i.namespace && t.push(i.namespace);
    }), t.length > 0) {
      const i = t[0];
      return e = i ? (r = (s = F.chains.get(i)) == null ? void 0 : s.caipNetworks) == null ? void 0 : r[0] : void 0, e;
    }
  },
  getAccountData(t) {
    var e;
    return t ? (e = p.state.chains.get(t)) == null ? void 0 : e.accountState : W.state;
  },
  getNetworkData(t) {
    var s;
    const e = t || F.activeChain;
    if (e)
      return (s = p.state.chains.get(e)) == null ? void 0 : s.networkState;
  },
  getCaipNetworkByNamespace(t, e) {
    var i, n, o;
    if (!t)
      return;
    const s = p.state.chains.get(t), r = (i = s == null ? void 0 : s.caipNetworks) == null ? void 0 : i.find((a) => a.id === e);
    return r || ((n = s == null ? void 0 : s.networkState) == null ? void 0 : n.caipNetwork) || ((o = s == null ? void 0 : s.caipNetworks) == null ? void 0 : o[0]);
  },
  /**
   * Get the requested CaipNetwork IDs for a given namespace. If namespace is not provided, all requested CaipNetwork IDs will be returned
   * @param namespace - The namespace to get the requested CaipNetwork IDs for
   * @returns The requested CaipNetwork IDs
   */
  getRequestedCaipNetworkIds() {
    const t = B.state.filterByNamespace;
    return (t ? [F.chains.get(t)] : Array.from(F.chains.values())).flatMap((s) => (s == null ? void 0 : s.caipNetworks) || []).map((s) => s.caipNetworkId);
  },
  getCaipNetworks(t) {
    return t ? p.getRequestedCaipNetworks(t) : p.getAllRequestedCaipNetworks();
  }
}, p = yt(Fu), Mu = {
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
}, _c = X.getBlockchainApiUrl(), st = Ae({
  clientId: null,
  api: new oi({ baseUrl: _c, clientId: null }),
  supportedChains: { http: [], ws: [] }
}), J = {
  state: st,
  async get(t) {
    const { st: e, sv: s } = J.getSdkProperties(), r = O.state.projectId, i = {
      ...t.params || {},
      st: e,
      sv: s,
      projectId: r
    };
    return st.api.get({
      ...t,
      params: i
    });
  },
  getSdkProperties() {
    const { sdkType: t, sdkVersion: e } = O.state;
    return {
      st: t || "unknown",
      sv: e || "unknown"
    };
  },
  async isNetworkSupported(t) {
    if (!t)
      return !1;
    try {
      st.supportedChains.http.length || await J.getSupportedNetworks();
    } catch {
      return !1;
    }
    return st.supportedChains.http.includes(t);
  },
  async getSupportedNetworks() {
    try {
      const t = await J.get({
        path: "v1/supported-chains"
      });
      return st.supportedChains = t, t;
    } catch {
      return st.supportedChains;
    }
  },
  async fetchIdentity({ address: t, caipNetworkId: e }) {
    if (!await J.isNetworkSupported(e))
      return { avatar: "", name: "" };
    const r = j.getIdentityFromCacheForAddress(t);
    if (r)
      return r;
    const i = await J.get({
      path: `/v1/identity/${t}`,
      params: {
        sender: p.state.activeCaipAddress ? X.getPlainAddress(p.state.activeCaipAddress) : void 0
      }
    });
    return j.updateIdentityCache({
      address: t,
      identity: i,
      timestamp: Date.now()
    }), i;
  },
  async fetchTransactions({ account: t, cursor: e, onramp: s, signal: r, cache: i, chainId: n }) {
    var a;
    return await J.isNetworkSupported((a = p.state.activeCaipNetwork) == null ? void 0 : a.caipNetworkId) ? J.get({
      path: `/v1/account/${t}/history`,
      params: {
        cursor: e,
        onramp: s,
        chainId: n
      },
      signal: r,
      cache: i
    }) : { data: [], next: void 0 };
  },
  async fetchSwapQuote({ amount: t, userAddress: e, from: s, to: r, gasPrice: i }) {
    var o;
    return await J.isNetworkSupported((o = p.state.activeCaipNetwork) == null ? void 0 : o.caipNetworkId) ? J.get({
      path: "/v1/convert/quotes",
      headers: {
        "Content-Type": "application/json"
      },
      params: {
        amount: t,
        userAddress: e,
        from: s,
        to: r,
        gasPrice: i
      }
    }) : { quotes: [] };
  },
  async fetchSwapTokens({ chainId: t }) {
    var s;
    return await J.isNetworkSupported((s = p.state.activeCaipNetwork) == null ? void 0 : s.caipNetworkId) ? J.get({
      path: "/v1/convert/tokens",
      params: { chainId: t }
    }) : { tokens: [] };
  },
  async fetchTokenPrice({ addresses: t }) {
    var s;
    return await J.isNetworkSupported((s = p.state.activeCaipNetwork) == null ? void 0 : s.caipNetworkId) ? st.api.post({
      path: "/v1/fungible/price",
      body: {
        currency: "usd",
        addresses: t,
        projectId: O.state.projectId
      },
      headers: {
        "Content-Type": "application/json"
      }
    }) : { fungibles: [] };
  },
  async fetchSwapAllowance({ tokenAddress: t, userAddress: e }) {
    var r;
    return await J.isNetworkSupported((r = p.state.activeCaipNetwork) == null ? void 0 : r.caipNetworkId) ? J.get({
      path: "/v1/convert/allowance",
      params: {
        tokenAddress: t,
        userAddress: e
      },
      headers: {
        "Content-Type": "application/json"
      }
    }) : { allowance: "0" };
  },
  async fetchGasPrice({ chainId: t }) {
    var i;
    const { st: e, sv: s } = J.getSdkProperties();
    if (!await J.isNetworkSupported((i = p.state.activeCaipNetwork) == null ? void 0 : i.caipNetworkId))
      throw new Error("Network not supported for Gas Price");
    return J.get({
      path: "/v1/convert/gas-price",
      headers: {
        "Content-Type": "application/json"
      },
      params: {
        chainId: t,
        st: e,
        sv: s
      }
    });
  },
  async generateSwapCalldata({ amount: t, from: e, to: s, userAddress: r, disableEstimate: i }) {
    var o;
    if (!await J.isNetworkSupported((o = p.state.activeCaipNetwork) == null ? void 0 : o.caipNetworkId))
      throw new Error("Network not supported for Swaps");
    return st.api.post({
      path: "/v1/convert/build-transaction",
      headers: {
        "Content-Type": "application/json"
      },
      body: {
        amount: t,
        eip155: {
          slippage: ve.CONVERT_SLIPPAGE_TOLERANCE
        },
        projectId: O.state.projectId,
        from: e,
        to: s,
        userAddress: r,
        disableEstimate: i
      }
    });
  },
  async generateApproveCalldata({ from: t, to: e, userAddress: s }) {
    var o;
    const { st: r, sv: i } = J.getSdkProperties();
    if (!await J.isNetworkSupported((o = p.state.activeCaipNetwork) == null ? void 0 : o.caipNetworkId))
      throw new Error("Network not supported for Swaps");
    return J.get({
      path: "/v1/convert/build-approve",
      headers: {
        "Content-Type": "application/json"
      },
      params: {
        userAddress: s,
        from: t,
        to: e,
        st: r,
        sv: i
      }
    });
  },
  async getBalance(t, e, s) {
    var l;
    const { st: r, sv: i } = J.getSdkProperties();
    if (!await J.isNetworkSupported((l = p.state.activeCaipNetwork) == null ? void 0 : l.caipNetworkId))
      return Rt.showError("Token Balance Unavailable"), { balances: [] };
    const o = `${e}:${t}`, a = j.getBalanceCacheForCaipAddress(o);
    if (a)
      return a;
    const c = await J.get({
      path: `/v1/account/${t}/balance`,
      params: {
        currency: "usd",
        chainId: e,
        forceUpdate: s,
        st: r,
        sv: i
      }
    });
    return j.updateBalanceCache({
      caipAddress: o,
      balance: c,
      timestamp: Date.now()
    }), c;
  },
  async lookupEnsName(t) {
    var s;
    return await J.isNetworkSupported((s = p.state.activeCaipNetwork) == null ? void 0 : s.caipNetworkId) ? J.get({
      path: `/v1/profile/account/${t}`,
      params: { apiVersion: "2" }
    }) : { addresses: {}, attributes: [] };
  },
  async reverseLookupEnsName({ address: t }) {
    var s;
    return await J.isNetworkSupported((s = p.state.activeCaipNetwork) == null ? void 0 : s.caipNetworkId) ? J.get({
      path: `/v1/profile/reverse/${t}`,
      params: {
        sender: W.state.address,
        apiVersion: "2"
      }
    }) : [];
  },
  async getEnsNameSuggestions(t) {
    var s;
    return await J.isNetworkSupported((s = p.state.activeCaipNetwork) == null ? void 0 : s.caipNetworkId) ? J.get({
      path: `/v1/profile/suggestions/${t}`,
      params: { zone: "reown.id" }
    }) : { suggestions: [] };
  },
  async registerEnsName({ coinType: t, address: e, message: s, signature: r }) {
    var n;
    return await J.isNetworkSupported((n = p.state.activeCaipNetwork) == null ? void 0 : n.caipNetworkId) ? st.api.post({
      path: "/v1/profile/account",
      body: { coin_type: t, address: e, message: s, signature: r },
      headers: {
        "Content-Type": "application/json"
      }
    }) : { success: !1 };
  },
  async generateOnRampURL({ destinationWallets: t, partnerUserId: e, defaultNetwork: s, purchaseAmount: r, paymentAmount: i }) {
    var a;
    return await J.isNetworkSupported((a = p.state.activeCaipNetwork) == null ? void 0 : a.caipNetworkId) ? (await st.api.post({
      path: "/v1/generators/onrampurl",
      params: {
        projectId: O.state.projectId
      },
      body: {
        destinationWallets: t,
        defaultNetwork: s,
        partnerUserId: e,
        defaultExperience: "buy",
        presetCryptoAmount: r,
        presetFiatAmount: i
      }
    })).url : "";
  },
  async getOnrampOptions() {
    var e;
    if (!await J.isNetworkSupported((e = p.state.activeCaipNetwork) == null ? void 0 : e.caipNetworkId))
      return { paymentCurrencies: [], purchaseCurrencies: [] };
    try {
      return await J.get({
        path: "/v1/onramp/options"
      });
    } catch {
      return Mu;
    }
  },
  async getOnrampQuote({ purchaseCurrency: t, paymentCurrency: e, amount: s, network: r }) {
    var i;
    try {
      return await J.isNetworkSupported((i = p.state.activeCaipNetwork) == null ? void 0 : i.caipNetworkId) ? await st.api.post({
        path: "/v1/onramp/quote",
        params: {
          projectId: O.state.projectId
        },
        body: {
          purchaseCurrency: t,
          paymentCurrency: e,
          amount: s,
          network: r
        }
      }) : null;
    } catch {
      return {
        coinbaseFee: { amount: s, currency: e.id },
        networkFee: { amount: s, currency: e.id },
        paymentSubtotal: { amount: s, currency: e.id },
        paymentTotal: { amount: s, currency: e.id },
        purchaseAmount: { amount: s, currency: e.id },
        quoteId: "mocked-quote-id"
      };
    }
  },
  async getSmartSessions(t) {
    var s;
    return await J.isNetworkSupported((s = p.state.activeCaipNetwork) == null ? void 0 : s.caipNetworkId) ? J.get({
      path: `/v1/sessions/${t}`
    }) : [];
  },
  async revokeSmartSession(t, e, s) {
    var i;
    return await J.isNetworkSupported((i = p.state.activeCaipNetwork) == null ? void 0 : i.caipNetworkId) ? st.api.post({
      path: `/v1/sessions/${t}/revoke`,
      params: {
        projectId: O.state.projectId
      },
      body: {
        pci: e,
        signature: s
      }
    }) : { success: !1 };
  },
  setClientId(t) {
    st.clientId = t, st.api = new oi({ baseUrl: _c, clientId: t });
  }
}, bt = Ae({
  currentTab: 0,
  tokenBalance: [],
  smartAccountDeployed: !1,
  addressLabels: /* @__PURE__ */ new Map(),
  allAccounts: []
}), Bu = {
  state: bt,
  replaceState(t) {
    t && Object.assign(bt, Ds(t));
  },
  subscribe(t) {
    return p.subscribeChainProp("accountState", (e) => {
      if (e)
        return t(e);
    });
  },
  subscribeKey(t, e, s) {
    let r;
    return p.subscribeChainProp("accountState", (i) => {
      if (i) {
        const n = i[t];
        r !== n && (r = n, e(n));
      }
    }, s);
  },
  setStatus(t, e) {
    p.setAccountProp("status", t, e);
  },
  getCaipAddress(t) {
    return p.getAccountProp("caipAddress", t);
  },
  setCaipAddress(t, e) {
    const s = t ? X.getPlainAddress(t) : void 0;
    e === p.state.activeChain && (p.state.activeCaipAddress = t), p.setAccountProp("caipAddress", t, e), p.setAccountProp("address", s, e);
  },
  setBalance(t, e, s) {
    p.setAccountProp("balance", t, s), p.setAccountProp("balanceSymbol", e, s);
  },
  setProfileName(t, e) {
    p.setAccountProp("profileName", t, e);
  },
  setProfileImage(t, e) {
    p.setAccountProp("profileImage", t, e);
  },
  setUser(t, e) {
    p.setAccountProp("user", t, e);
  },
  setAddressExplorerUrl(t, e) {
    p.setAccountProp("addressExplorerUrl", t, e);
  },
  setSmartAccountDeployed(t, e) {
    p.setAccountProp("smartAccountDeployed", t, e);
  },
  setCurrentTab(t) {
    p.setAccountProp("currentTab", t, p.state.activeChain);
  },
  setTokenBalance(t, e) {
    t && p.setAccountProp("tokenBalance", t, e);
  },
  setShouldUpdateToAddress(t, e) {
    p.setAccountProp("shouldUpdateToAddress", t, e);
  },
  setAllAccounts(t, e) {
    p.setAccountProp("allAccounts", t, e);
  },
  addAddressLabel(t, e, s) {
    const r = p.getAccountProp("addressLabels", s) || /* @__PURE__ */ new Map();
    r.set(t, e), p.setAccountProp("addressLabels", r, s);
  },
  removeAddressLabel(t, e) {
    const s = p.getAccountProp("addressLabels", e) || /* @__PURE__ */ new Map();
    s.delete(t), p.setAccountProp("addressLabels", s, e);
  },
  setConnectedWalletInfo(t, e) {
    p.setAccountProp("connectedWalletInfo", t, e, !1);
  },
  setPreferredAccountType(t, e) {
    p.setAccountProp("preferredAccountTypes", {
      ...bt.preferredAccountTypes,
      [e]: t
    }, e);
  },
  setPreferredAccountTypes(t) {
    bt.preferredAccountTypes = t;
  },
  setSocialProvider(t, e) {
    t && p.setAccountProp("socialProvider", t, e);
  },
  setSocialWindow(t, e) {
    p.setAccountProp("socialWindow", t ? Ds(t) : void 0, e);
  },
  setFarcasterUrl(t, e) {
    p.setAccountProp("farcasterUrl", t, e);
  },
  async fetchTokenBalance(t) {
    var n, o;
    bt.balanceLoading = !0;
    const e = (n = p.state.activeCaipNetwork) == null ? void 0 : n.caipNetworkId, s = (o = p.state.activeCaipNetwork) == null ? void 0 : o.chainNamespace, r = p.state.activeCaipAddress, i = r ? X.getPlainAddress(r) : void 0;
    if (bt.lastRetry && !X.isAllowedRetry(bt.lastRetry, 30 * ve.ONE_SEC_MS))
      return bt.balanceLoading = !1, [];
    try {
      if (i && e && s) {
        const c = (await J.getBalance(i, e)).balances.filter((l) => l.quantity.decimals !== "0");
        return W.setTokenBalance(c, s), bt.lastRetry = void 0, bt.balanceLoading = !1, c;
      }
    } catch (a) {
      bt.lastRetry = Date.now(), t == null || t(a), Rt.showError("Token Balance Unavailable");
    } finally {
      bt.balanceLoading = !1;
    }
    return [];
  },
  resetAccount(t) {
    p.resetAccount(t);
  }
}, W = yt(Bu), qu = {
  /**
   * Function to handle the network switch.
   * This function has variety of conditions to handle the network switch depending on the connectors or namespace's connection states.
   * @param args.network - The network to switch to.
   * @param args.shouldConfirmSwitch - Whether to confirm the switch. If true, the user will be asked to confirm the switch if necessary.
   * @returns void
   */
  onSwitchNetwork({ network: t, ignoreSwitchConfirmation: e = !1 }) {
    const s = p.state.activeCaipNetwork, r = re.state.data;
    if (t.id === (s == null ? void 0 : s.id))
      return;
    const n = W.getCaipAddress(p.state.activeChain), o = t.chainNamespace !== p.state.activeChain, a = W.getCaipAddress(t.chainNamespace), l = B.getConnectorId(p.state.activeChain) === z.CONNECTOR_ID.AUTH, u = z.AUTH_CONNECTOR_SUPPORTED_CHAINS.find((d) => d === t.chainNamespace);
    e || l && u ? re.push("SwitchNetwork", { ...r, network: t }) : /** * If user switching to a different namespace and next namespace is not connected, we need to show switch active chain view for confirmation first. */ n && o && !a ? re.push("SwitchActiveChain", {
      switchToChain: t.chainNamespace,
      navigateTo: "Connect",
      navigateWithReplace: !0,
      network: t
    }) : re.push("SwitchNetwork", { ...r, network: t });
  }
}, rt = Ae({
  loading: !1,
  loadingNamespaceMap: /* @__PURE__ */ new Map(),
  open: !1,
  shake: !1,
  namespace: void 0
}), ju = {
  state: rt,
  subscribe(t) {
    return Ye(rt, () => t(rt));
  },
  subscribeKey(t, e) {
    return Xe(rt, t, e);
  },
  async open(t) {
    var o, a;
    const e = W.state.status === "connected", s = t == null ? void 0 : t.namespace, r = p.state.activeChain, i = s && s !== r, n = (o = p.getAccountData(t == null ? void 0 : t.namespace)) == null ? void 0 : o.caipAddress;
    if (Y.state.wcBasic ? K.prefetch({ fetchNetworkImages: !1, fetchConnectorImages: !1 }) : await K.prefetch({
      fetchConnectorImages: !e,
      fetchFeaturedWallets: !e,
      fetchRecommendedWallets: !e
    }), B.setFilterByNamespace(t == null ? void 0 : t.namespace), qe.setLoading(!0, s), s && i) {
      const c = ((a = p.getNetworkData(s)) == null ? void 0 : a.caipNetwork) || p.getRequestedCaipNetworks(s)[0];
      c && qu.onSwitchNetwork({ network: c, ignoreSwitchConfirmation: !0 });
    } else {
      const c = p.state.noAdapters;
      O.state.manualWCControl || c && !n ? X.isMobile() ? re.reset("AllWallets") : re.reset("ConnectingWalletConnectBasic") : t != null && t.view ? re.reset(t.view, t.data) : n ? re.reset("Account") : re.reset("Connect");
    }
    rt.open = !0, ms.set({ open: !0 }), Se.sendEvent({
      type: "track",
      event: "MODAL_OPEN",
      properties: { connected: !!n }
    });
  },
  close() {
    const t = O.state.enableEmbedded, e = !!p.state.activeCaipAddress;
    rt.open && Se.sendEvent({
      type: "track",
      event: "MODAL_CLOSE",
      properties: { connected: e }
    }), rt.open = !1, re.reset("Connect"), qe.clearLoading(), t ? e ? re.replace("Account") : re.push("Connect") : ms.set({ open: !1 }), Y.resetUri();
  },
  setLoading(t, e) {
    e && rt.loadingNamespaceMap.set(e, t), rt.loading = t, ms.set({ loading: t });
  },
  clearLoading() {
    rt.loadingNamespaceMap.clear(), rt.loading = !1;
  },
  shake() {
    rt.shake || (rt.shake = !0, setTimeout(() => {
      rt.shake = !1;
    }, 500));
  }
}, qe = yt(ju), Kr = {
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
}, On = {
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
}, Wu = {
  providers: Ic,
  selectedProvider: null,
  error: null,
  purchaseCurrency: Kr,
  paymentCurrency: On,
  purchaseCurrencies: [Kr],
  paymentCurrencies: [],
  quotesLoading: !1
}, oe = Ae(Wu), zu = {
  state: oe,
  subscribe(t) {
    return Ye(oe, () => t(oe));
  },
  subscribeKey(t, e) {
    return Xe(oe, t, e);
  },
  setSelectedProvider(t) {
    if (t && t.name === "meld") {
      const e = p.state.activeChain === z.CHAIN.SOLANA ? "SOL" : "USDC", s = W.state.address ?? "", r = new URL(t.url);
      r.searchParams.append("publicKey", gu), r.searchParams.append("destinationCurrencyCode", e), r.searchParams.append("walletAddress", s), r.searchParams.append("externalCustomerId", O.state.projectId), oe.selectedProvider = { ...t, url: r.toString() };
    } else
      oe.selectedProvider = t;
  },
  setOnrampProviders(t) {
    if (Array.isArray(t) && t.every((e) => typeof e == "string")) {
      const e = t, s = Ic.filter((r) => e.includes(r.name));
      oe.providers = s;
    } else
      oe.providers = [];
  },
  setPurchaseCurrency(t) {
    oe.purchaseCurrency = t;
  },
  setPaymentCurrency(t) {
    oe.paymentCurrency = t;
  },
  setPurchaseAmount(t) {
    Tn.state.purchaseAmount = t;
  },
  setPaymentAmount(t) {
    Tn.state.paymentAmount = t;
  },
  async getAvailableCurrencies() {
    const t = await J.getOnrampOptions();
    oe.purchaseCurrencies = t.purchaseCurrencies, oe.paymentCurrencies = t.paymentCurrencies, oe.paymentCurrency = t.paymentCurrencies[0] || On, oe.purchaseCurrency = t.purchaseCurrencies[0] || Kr, await K.fetchCurrencyImages(t.paymentCurrencies.map((e) => e.id)), await K.fetchTokenImages(t.purchaseCurrencies.map((e) => e.symbol));
  },
  async getQuote() {
    var t, e;
    oe.quotesLoading = !0;
    try {
      const s = await J.getOnrampQuote({
        purchaseCurrency: oe.purchaseCurrency,
        paymentCurrency: oe.paymentCurrency,
        amount: ((t = oe.paymentAmount) == null ? void 0 : t.toString()) || "0",
        network: (e = oe.purchaseCurrency) == null ? void 0 : e.symbol
      });
      return oe.quotesLoading = !1, oe.purchaseAmount = Number(s == null ? void 0 : s.purchaseAmount.amount), s;
    } catch (s) {
      return oe.error = s.message, oe.quotesLoading = !1, null;
    } finally {
      oe.quotesLoading = !1;
    }
  },
  resetState() {
    oe.selectedProvider = null, oe.error = null, oe.purchaseCurrency = Kr, oe.paymentCurrency = On, oe.purchaseCurrencies = [Kr], oe.paymentCurrencies = [], oe.paymentAmount = void 0, oe.purchaseAmount = void 0, oe.quotesLoading = !1;
  }
}, Tn = yt(zu), xo = 2147483648, Hu = {
  convertEVMChainIdToCoinType(t) {
    if (t >= xo)
      throw new Error("Invalid chainId");
    return (xo | t) >>> 0;
  }
}, vt = Ae({
  suggestions: [],
  loading: !1
}), Ku = {
  state: vt,
  subscribe(t) {
    return Ye(vt, () => t(vt));
  },
  subscribeKey(t, e) {
    return Xe(vt, t, e);
  },
  async resolveName(t) {
    var e, s;
    try {
      return await J.lookupEnsName(t);
    } catch (r) {
      const i = r;
      throw new Error(((s = (e = i == null ? void 0 : i.reasons) == null ? void 0 : e[0]) == null ? void 0 : s.description) || "Error resolving name");
    }
  },
  async isNameRegistered(t) {
    try {
      return await J.lookupEnsName(t), !0;
    } catch {
      return !1;
    }
  },
  async getSuggestions(t) {
    try {
      vt.loading = !0, vt.suggestions = [];
      const e = await J.getEnsNameSuggestions(t);
      return vt.suggestions = e.suggestions.map((s) => ({
        ...s,
        name: s.name
      })) || [], vt.suggestions;
    } catch (e) {
      const s = Vr.parseEnsApiError(e, "Error fetching name suggestions");
      throw new Error(s);
    } finally {
      vt.loading = !1;
    }
  },
  async getNamesForAddress(t) {
    try {
      if (!p.state.activeCaipNetwork)
        return [];
      const s = j.getEnsFromCacheForAddress(t);
      if (s)
        return s;
      const r = await J.reverseLookupEnsName({ address: t });
      return j.updateEnsCache({
        address: t,
        ens: r,
        timestamp: Date.now()
      }), r;
    } catch (e) {
      const s = Vr.parseEnsApiError(e, "Error fetching names for address");
      throw new Error(s);
    }
  },
  async registerName(t) {
    const e = p.state.activeCaipNetwork;
    if (!e)
      throw new Error("Network not found");
    const s = W.state.address, r = B.getAuthConnector();
    if (!s || !r)
      throw new Error("Address or auth connector not found");
    vt.loading = !0;
    try {
      const i = JSON.stringify({
        name: t,
        attributes: {},
        // Unix timestamp
        timestamp: Math.floor(Date.now() / 1e3)
      });
      re.pushTransactionStack({
        onCancel() {
          re.replace("RegisterAccountName");
        }
      });
      const n = await Y.signMessage(i);
      vt.loading = !1;
      const o = e.id;
      if (!o)
        throw new Error("Network not found");
      const a = Hu.convertEVMChainIdToCoinType(Number(o));
      await J.registerEnsName({
        coinType: a,
        address: s,
        signature: n,
        message: i
      }), W.setProfileName(t, e.chainNamespace), re.replace("RegisterAccountNameSuccess");
    } catch (i) {
      const n = Vr.parseEnsApiError(i, `Error registering name ${t}`);
      throw re.replace("RegisterAccountName"), new Error(n);
    } finally {
      vt.loading = !1;
    }
  },
  validateName(t) {
    return /^[a-zA-Z0-9-]{4,}$/u.test(t);
  },
  parseEnsApiError(t, e) {
    var r, i;
    const s = t;
    return ((i = (r = s == null ? void 0 : s.reasons) == null ? void 0 : r[0]) == null ? void 0 : i.description) || e;
  }
}, Vr = yt(Ku);
var Vu = Object.defineProperty, Gu = (t, e, s) => e in t ? Vu(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s, Ro = (t, e, s) => Gu(t, typeof e != "symbol" ? e + "" : e, s);
let Ju = class extends Nr {
  constructor(e) {
    super(), this.opts = e, Ro(this, "protocol", "wc"), Ro(this, "version", 2);
  }
};
var Yu = Object.defineProperty, Xu = (t, e, s) => e in t ? Yu(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s, Zu = (t, e, s) => Xu(t, e + "", s);
let Qu = class extends Nr {
  constructor(e, s) {
    super(), this.core = e, this.logger = s, Zu(this, "records", /* @__PURE__ */ new Map());
  }
}, ed = class {
  constructor(e, s) {
    this.logger = e, this.core = s;
  }
};
class td extends Nr {
  constructor(e, s) {
    super(), this.relayer = e, this.logger = s;
  }
}
let sd = class extends Nr {
  constructor(e) {
    super();
  }
}, rd = class {
  constructor(e, s, r, i) {
    this.core = e, this.logger = s, this.name = r;
  }
}, id = class extends Nr {
  constructor(e, s) {
    super(), this.relayer = e, this.logger = s;
  }
}, nd = class extends Nr {
  constructor(e, s) {
    super(), this.core = e, this.logger = s;
  }
}, od = class {
  constructor(e, s, r) {
    this.core = e, this.logger = s, this.store = r;
  }
}, ad = class {
  constructor(e, s) {
    this.projectId = e, this.logger = s;
  }
}, cd = class {
  constructor(e, s, r) {
    this.core = e, this.logger = s, this.telemetryEnabled = r;
  }
};
var ld = Object.defineProperty, ud = (t, e, s) => e in t ? ld(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s, $o = (t, e, s) => ud(t, typeof e != "symbol" ? e + "" : e, s);
let dd = class {
  constructor(e) {
    this.opts = e, $o(this, "protocol", "wc"), $o(this, "version", 2);
  }
}, hd = class {
  constructor(e) {
    this.client = e;
  }
};
const pd = ":";
function pr(t) {
  const [e, s] = t.split(pd);
  return { namespace: e, reference: s };
}
function Sc(t, e) {
  return t.includes(":") ? [t] : e.chains || [];
}
var gd = Object.defineProperty, fd = Object.defineProperties, md = Object.getOwnPropertyDescriptors, Uo = Object.getOwnPropertySymbols, wd = Object.prototype.hasOwnProperty, yd = Object.prototype.propertyIsEnumerable, Do = (t, e, s) => e in t ? gd(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s, Lo = (t, e) => {
  for (var s in e || (e = {})) wd.call(e, s) && Do(t, s, e[s]);
  if (Uo) for (var s of Uo(e)) yd.call(e, s) && Do(t, s, e[s]);
  return t;
}, bd = (t, e) => fd(t, md(e));
const vd = "ReactNative", ft = { reactNative: "react-native", node: "node", browser: "browser", unknown: "unknown" }, Ed = "js";
function Di() {
  return typeof process < "u" && typeof process.versions < "u" && typeof process.versions.node < "u";
}
function Cs() {
  return !fr() && !!yc() && navigator.product === vd;
}
function Cd() {
  return Cs() && typeof global < "u" && typeof (global == null ? void 0 : global.Platform) < "u" && (global == null ? void 0 : global.Platform.OS) === "android";
}
function Id() {
  return Cs() && typeof global < "u" && typeof (global == null ? void 0 : global.Platform) < "u" && (global == null ? void 0 : global.Platform.OS) === "ios";
}
function _r() {
  return !Di() && !!yc() && !!fr();
}
function ai() {
  return Cs() ? ft.reactNative : Di() ? ft.node : _r() ? ft.browser : ft.unknown;
}
function Fo() {
  var t;
  try {
    return Cs() && typeof global < "u" && typeof (global == null ? void 0 : global.Application) < "u" ? (t = global.Application) == null ? void 0 : t.applicationId : void 0;
  } catch {
    return;
  }
}
function Nd(t, e) {
  const s = new URLSearchParams(t);
  for (const r of Object.keys(e).sort()) if (e.hasOwnProperty(r)) {
    const i = e[r];
    i !== void 0 && s.set(r, i);
  }
  return s.toString();
}
function Ad(t) {
  var e, s;
  const r = Pc();
  try {
    return t != null && t.url && r.url && new URL(t.url).host !== new URL(r.url).host && (console.warn(`The configured WalletConnect 'metadata.url':${t.url} differs from the actual page url:${r.url}. This is probably unintended and can lead to issues.`), t.url = r.url), (e = t == null ? void 0 : t.icons) != null && e.length && t.icons.length > 0 && (t.icons = t.icons.filter((i) => i !== "")), bd(Lo(Lo({}, r), t), { url: (t == null ? void 0 : t.url) || r.url, name: (t == null ? void 0 : t.name) || r.name, description: (t == null ? void 0 : t.description) || r.description, icons: (s = t == null ? void 0 : t.icons) != null && s.length && t.icons.length > 0 ? t.icons : r.icons });
  } catch (i) {
    return console.warn("Error populating app metadata", i), t || r;
  }
}
function Pc() {
  return Hl() || { name: "", description: "", url: "", icons: [""] };
}
function _d() {
  if (ai() === ft.reactNative && typeof global < "u" && typeof (global == null ? void 0 : global.Platform) < "u") {
    const { OS: s, Version: r } = global.Platform;
    return [s, r].join("-");
  }
  const t = Vl();
  if (t === null) return "unknown";
  const e = t.os ? t.os.replace(" ", "").toLowerCase() : "unknown";
  return t.type === "browser" ? [e, t.name, t.version].join("-") : [e, t.version].join("-");
}
function Sd() {
  var t;
  const e = ai();
  return e === ft.browser ? [e, ((t = Gl()) == null ? void 0 : t.host) || "unknown"].join(":") : e;
}
function Oc(t, e, s) {
  const r = _d(), i = Sd();
  return [[t, e].join("-"), [Ed, s].join("-"), r, i].join("/");
}
function Pd({ protocol: t, version: e, relayUrl: s, sdkVersion: r, auth: i, projectId: n, useOnCloseEvent: o, bundleId: a, packageName: c }) {
  const l = s.split("?"), u = Oc(t, e, r), d = { auth: i, ua: u, projectId: n, useOnCloseEvent: o, packageName: c || void 0, bundleId: a || void 0 }, h = Nd(l[1] || "", d);
  return l[0] + "?" + h;
}
function $s(t, e) {
  return t.filter((s) => e.includes(s)).length === t.length;
}
function kn(t) {
  return Object.fromEntries(t.entries());
}
function xn(t) {
  return new Map(Object.entries(t));
}
function Ps(t = U.FIVE_MINUTES, e) {
  const s = U.toMiliseconds(t || U.FIVE_MINUTES);
  let r, i, n, o;
  return { resolve: (a) => {
    n && r && (clearTimeout(n), r(a), o = Promise.resolve(a));
  }, reject: (a) => {
    n && i && (clearTimeout(n), i(a));
  }, done: () => new Promise((a, c) => {
    if (o) return a(o);
    n = setTimeout(() => {
      const l = new Error(e);
      o = Promise.reject(l), c(l);
    }, s), r = a, i = c;
  }) };
}
function fs(t, e, s) {
  return new Promise(async (r, i) => {
    const n = setTimeout(() => i(new Error(s)), e);
    try {
      const o = await t;
      r(o);
    } catch (o) {
      i(o);
    }
    clearTimeout(n);
  });
}
function Tc(t, e) {
  if (typeof e == "string" && e.startsWith(`${t}:`)) return e;
  if (t.toLowerCase() === "topic") {
    if (typeof e != "string") throw new Error('Value must be "string" for expirer target type: topic');
    return `topic:${e}`;
  } else if (t.toLowerCase() === "id") {
    if (typeof e != "number") throw new Error('Value must be "number" for expirer target type: id');
    return `id:${e}`;
  }
  throw new Error(`Unknown expirer target type: ${t}`);
}
function Od(t) {
  return Tc("topic", t);
}
function Td(t) {
  return Tc("id", t);
}
function kc(t) {
  const [e, s] = t.split(":"), r = { id: void 0, topic: void 0 };
  if (e === "topic" && typeof s == "string") r.topic = s;
  else if (e === "id" && Number.isInteger(Number(s))) r.id = Number(s);
  else throw new Error(`Invalid target, expected id:number or topic:string, got ${e}:${s}`);
  return r;
}
function Ue(t, e) {
  return U.fromMiliseconds(Date.now() + U.toMiliseconds(t));
}
function hs(t) {
  return Date.now() >= U.toMiliseconds(t);
}
function pe(t, e) {
  return `${t}${e ? `:${e}` : ""}`;
}
function zt(t = [], e = []) {
  return [.../* @__PURE__ */ new Set([...t, ...e])];
}
async function kd({ id: t, topic: e, wcDeepLink: s }) {
  var r;
  try {
    if (!s) return;
    const i = typeof s == "string" ? JSON.parse(s) : s, n = i == null ? void 0 : i.href;
    if (typeof n != "string") return;
    const o = xd(n, t, e), a = ai();
    if (a === ft.browser) {
      if (!((r = fr()) != null && r.hasFocus())) {
        console.warn("Document does not have focus, skipping deeplink.");
        return;
      }
      Rd(o);
    } else a === ft.reactNative && typeof (global == null ? void 0 : global.Linking) < "u" && await global.Linking.openURL(o);
  } catch (i) {
    console.error(i);
  }
}
function xd(t, e, s) {
  const r = `requestId=${e}&sessionTopic=${s}`;
  t.endsWith("/") && (t = t.slice(0, -1));
  let i = `${t}`;
  if (t.startsWith("https://t.me")) {
    const n = t.includes("?") ? "&startapp=" : "?startapp=";
    i = `${i}${n}${Ld(r, !0)}`;
  } else i = `${i}/wc?${r}`;
  return i;
}
function Rd(t) {
  let e = "_self";
  Dd() ? e = "_top" : (Ud() || t.startsWith("https://") || t.startsWith("http://")) && (e = "_blank"), window.open(t, e, "noreferrer noopener");
}
async function $d(t, e) {
  let s = "";
  try {
    if (_r() && (s = localStorage.getItem(e), s)) return s;
    s = await t.getItem(e);
  } catch (r) {
    console.error(r);
  }
  return s;
}
function Mo(t, e) {
  if (!t.includes(e)) return null;
  const s = t.split(/([&,?,=])/), r = s.indexOf(e);
  return s[r + 2];
}
function Bo() {
  return typeof crypto < "u" && crypto != null && crypto.randomUUID ? crypto.randomUUID() : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/gu, (t) => {
    const e = Math.random() * 16 | 0;
    return (t === "x" ? e : e & 3 | 8).toString(16);
  });
}
function lo() {
  return typeof process < "u" && process.env.IS_VITEST === "true";
}
function Ud() {
  return typeof window < "u" && (!!window.TelegramWebviewProxy || !!window.Telegram || !!window.TelegramWebviewProxyProto);
}
function Dd() {
  try {
    return window.self !== window.top;
  } catch {
    return !1;
  }
}
function Ld(t, e = !1) {
  const s = Buffer.from(t).toString("base64");
  return e ? s.replace(/[=]/g, "") : s;
}
function xc(t) {
  return Buffer.from(t, "base64").toString("utf-8");
}
function Fd(t) {
  return new Promise((e) => setTimeout(e, t));
}
function ei(t) {
  if (!Number.isSafeInteger(t) || t < 0) throw new Error("positive integer expected, got " + t);
}
function Md(t) {
  return t instanceof Uint8Array || ArrayBuffer.isView(t) && t.constructor.name === "Uint8Array";
}
function ci(t, ...e) {
  if (!Md(t)) throw new Error("Uint8Array expected");
  if (e.length > 0 && !e.includes(t.length)) throw new Error("Uint8Array expected of length " + e + ", got length=" + t.length);
}
function uo(t) {
  if (typeof t != "function" || typeof t.create != "function") throw new Error("Hash should be wrapped by utils.wrapConstructor");
  ei(t.outputLen), ei(t.blockLen);
}
function wr(t, e = !0) {
  if (t.destroyed) throw new Error("Hash instance has been destroyed");
  if (e && t.finished) throw new Error("Hash#digest() has already been called");
}
function Rc(t, e) {
  ci(t);
  const s = e.outputLen;
  if (t.length < s) throw new Error("digestInto() expects output buffer of length at least " + s);
}
const yi = BigInt(2 ** 32 - 1), qo = BigInt(32);
function Bd(t, e = !1) {
  return e ? { h: Number(t & yi), l: Number(t >> qo & yi) } : { h: Number(t >> qo & yi) | 0, l: Number(t & yi) | 0 };
}
function qd(t, e = !1) {
  let s = new Uint32Array(t.length), r = new Uint32Array(t.length);
  for (let i = 0; i < t.length; i++) {
    const { h: n, l: o } = Bd(t[i], e);
    [s[i], r[i]] = [n, o];
  }
  return [s, r];
}
const jd = (t, e, s) => t << s | e >>> 32 - s, Wd = (t, e, s) => e << s | t >>> 32 - s, zd = (t, e, s) => e << s - 32 | t >>> 64 - s, Hd = (t, e, s) => t << s - 32 | e >>> 64 - s, zs = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
function Kd(t) {
  return new Uint32Array(t.buffer, t.byteOffset, Math.floor(t.byteLength / 4));
}
function sn(t) {
  return new DataView(t.buffer, t.byteOffset, t.byteLength);
}
function Lt(t, e) {
  return t << 32 - e | t >>> e;
}
const jo = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
function Vd(t) {
  return t << 24 & 4278190080 | t << 8 & 16711680 | t >>> 8 & 65280 | t >>> 24 & 255;
}
function Wo(t) {
  for (let e = 0; e < t.length; e++) t[e] = Vd(t[e]);
}
function Gd(t) {
  if (typeof t != "string") throw new Error("utf8ToBytes expected string, got " + typeof t);
  return new Uint8Array(new TextEncoder().encode(t));
}
function yr(t) {
  return typeof t == "string" && (t = Gd(t)), ci(t), t;
}
function Jd(...t) {
  let e = 0;
  for (let r = 0; r < t.length; r++) {
    const i = t[r];
    ci(i), e += i.length;
  }
  const s = new Uint8Array(e);
  for (let r = 0, i = 0; r < t.length; r++) {
    const n = t[r];
    s.set(n, i), i += n.length;
  }
  return s;
}
let ho = class {
  clone() {
    return this._cloneInto();
  }
};
function $c(t) {
  const e = (r) => t().update(yr(r)).digest(), s = t();
  return e.outputLen = s.outputLen, e.blockLen = s.blockLen, e.create = () => t(), e;
}
function Sr(t = 32) {
  if (zs && typeof zs.getRandomValues == "function") return zs.getRandomValues(new Uint8Array(t));
  if (zs && typeof zs.randomBytes == "function") return zs.randomBytes(t);
  throw new Error("crypto.getRandomValues must be defined");
}
const Uc = [], Dc = [], Lc = [], Yd = BigInt(0), xr = BigInt(1), Xd = BigInt(2), Zd = BigInt(7), Qd = BigInt(256), eh = BigInt(113);
for (let t = 0, e = xr, s = 1, r = 0; t < 24; t++) {
  [s, r] = [r, (2 * s + 3 * r) % 5], Uc.push(2 * (5 * r + s)), Dc.push((t + 1) * (t + 2) / 2 % 64);
  let i = Yd;
  for (let n = 0; n < 7; n++) e = (e << xr ^ (e >> Zd) * eh) % Qd, e & Xd && (i ^= xr << (xr << BigInt(n)) - xr);
  Lc.push(i);
}
const [th, sh] = qd(Lc, !0), zo = (t, e, s) => s > 32 ? zd(t, e, s) : jd(t, e, s), Ho = (t, e, s) => s > 32 ? Hd(t, e, s) : Wd(t, e, s);
function rh(t, e = 24) {
  const s = new Uint32Array(10);
  for (let r = 24 - e; r < 24; r++) {
    for (let o = 0; o < 10; o++) s[o] = t[o] ^ t[o + 10] ^ t[o + 20] ^ t[o + 30] ^ t[o + 40];
    for (let o = 0; o < 10; o += 2) {
      const a = (o + 8) % 10, c = (o + 2) % 10, l = s[c], u = s[c + 1], d = zo(l, u, 1) ^ s[a], h = Ho(l, u, 1) ^ s[a + 1];
      for (let g = 0; g < 50; g += 10) t[o + g] ^= d, t[o + g + 1] ^= h;
    }
    let i = t[2], n = t[3];
    for (let o = 0; o < 24; o++) {
      const a = Dc[o], c = zo(i, n, a), l = Ho(i, n, a), u = Uc[o];
      i = t[u], n = t[u + 1], t[u] = c, t[u + 1] = l;
    }
    for (let o = 0; o < 50; o += 10) {
      for (let a = 0; a < 10; a++) s[a] = t[o + a];
      for (let a = 0; a < 10; a++) t[o + a] ^= ~s[(a + 2) % 10] & s[(a + 4) % 10];
    }
    t[0] ^= th[r], t[1] ^= sh[r];
  }
  s.fill(0);
}
let ih = class Fc extends ho {
  constructor(e, s, r, i = !1, n = 24) {
    if (super(), this.blockLen = e, this.suffix = s, this.outputLen = r, this.enableXOF = i, this.rounds = n, this.pos = 0, this.posOut = 0, this.finished = !1, this.destroyed = !1, ei(r), 0 >= this.blockLen || this.blockLen >= 200) throw new Error("Sha3 supports only keccak-f1600 function");
    this.state = new Uint8Array(200), this.state32 = Kd(this.state);
  }
  keccak() {
    jo || Wo(this.state32), rh(this.state32, this.rounds), jo || Wo(this.state32), this.posOut = 0, this.pos = 0;
  }
  update(e) {
    wr(this);
    const { blockLen: s, state: r } = this;
    e = yr(e);
    const i = e.length;
    for (let n = 0; n < i; ) {
      const o = Math.min(s - this.pos, i - n);
      for (let a = 0; a < o; a++) r[this.pos++] ^= e[n++];
      this.pos === s && this.keccak();
    }
    return this;
  }
  finish() {
    if (this.finished) return;
    this.finished = !0;
    const { state: e, suffix: s, pos: r, blockLen: i } = this;
    e[r] ^= s, s & 128 && r === i - 1 && this.keccak(), e[i - 1] ^= 128, this.keccak();
  }
  writeInto(e) {
    wr(this, !1), ci(e), this.finish();
    const s = this.state, { blockLen: r } = this;
    for (let i = 0, n = e.length; i < n; ) {
      this.posOut >= r && this.keccak();
      const o = Math.min(r - this.posOut, n - i);
      e.set(s.subarray(this.posOut, this.posOut + o), i), this.posOut += o, i += o;
    }
    return e;
  }
  xofInto(e) {
    if (!this.enableXOF) throw new Error("XOF is not possible for this instance");
    return this.writeInto(e);
  }
  xof(e) {
    return ei(e), this.xofInto(new Uint8Array(e));
  }
  digestInto(e) {
    if (Rc(e, this), this.finished) throw new Error("digest() was already called");
    return this.writeInto(e), this.destroy(), e;
  }
  digest() {
    return this.digestInto(new Uint8Array(this.outputLen));
  }
  destroy() {
    this.destroyed = !0, this.state.fill(0);
  }
  _cloneInto(e) {
    const { blockLen: s, suffix: r, outputLen: i, rounds: n, enableXOF: o } = this;
    return e || (e = new Fc(s, r, i, o, n)), e.state32.set(this.state32), e.pos = this.pos, e.posOut = this.posOut, e.finished = this.finished, e.rounds = n, e.suffix = r, e.outputLen = i, e.enableXOF = o, e.destroyed = this.destroyed, e;
  }
};
const nh = (t, e, s) => $c(() => new ih(e, t, s)), oh = nh(1, 136, 256 / 8), ah = "https://rpc.walletconnect.org/v1";
function Mc(t) {
  const e = `Ethereum Signed Message:
${t.length}`, s = new TextEncoder().encode(e + t);
  return "0x" + Buffer.from(oh(s)).toString("hex");
}
async function ch(t, e, s, r, i, n) {
  switch (s.t) {
    case "eip191":
      return await lh(t, e, s.s);
    case "eip1271":
      return await uh(t, e, s.s, r, i, n);
    default:
      throw new Error(`verifySignature failed: Attempted to verify CacaoSignature with unknown type: ${s.t}`);
  }
}
async function lh(t, e, s) {
  return (await su({ hash: Mc(e), signature: s })).toLowerCase() === t.toLowerCase();
}
async function uh(t, e, s, r, i, n) {
  const o = pr(r);
  if (!o.namespace || !o.reference) throw new Error(`isValidEip1271Signature failed: chainId must be in CAIP-2 format, received: ${r}`);
  try {
    const a = "0x1626ba7e", c = "0000000000000000000000000000000000000000000000000000000000000040", l = "0000000000000000000000000000000000000000000000000000000000000041", u = s.substring(2), d = Mc(e).substring(2), h = a + d + c + l + u, g = await fetch(`${n || ah}/?chainId=${r}&projectId=${i}`, { method: "POST", body: JSON.stringify({ id: dh(), jsonrpc: "2.0", method: "eth_call", params: [{ to: t, data: h }, "latest"] }) }), { result: w } = await g.json();
    return w ? w.slice(0, a.length).toLowerCase() === a.toLowerCase() : !1;
  } catch (a) {
    return console.error("isValidEip1271Signature: ", a), !1;
  }
}
function dh() {
  return Date.now() + Math.floor(Math.random() * 1e3);
}
function hh(t) {
  const e = atob(t), s = new Uint8Array(e.length);
  for (let o = 0; o < e.length; o++) s[o] = e.charCodeAt(o);
  const r = s[0];
  if (r === 0) throw new Error("No signatures found");
  const i = 1 + r * 64;
  if (s.length < i) throw new Error("Transaction data too short for claimed signature count");
  if (s.length < 100) throw new Error("Transaction too short");
  const n = Buffer.from(t, "base64").slice(1, 65);
  return bc.encode(n);
}
var ph = Object.defineProperty, gh = Object.defineProperties, fh = Object.getOwnPropertyDescriptors, Ko = Object.getOwnPropertySymbols, mh = Object.prototype.hasOwnProperty, wh = Object.prototype.propertyIsEnumerable, Vo = (t, e, s) => e in t ? ph(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s, yh = (t, e) => {
  for (var s in e || (e = {})) mh.call(e, s) && Vo(t, s, e[s]);
  if (Ko) for (var s of Ko(e)) wh.call(e, s) && Vo(t, s, e[s]);
  return t;
}, bh = (t, e) => gh(t, fh(e));
const vh = "did:pkh:", po = (t) => t == null ? void 0 : t.split(":"), Eh = (t) => {
  const e = t && po(t);
  if (e) return t.includes(vh) ? e[3] : e[1];
}, Rn = (t) => {
  const e = t && po(t);
  if (e) return e[2] + ":" + e[3];
}, Li = (t) => {
  const e = t && po(t);
  if (e) return e.pop();
};
async function Go(t) {
  const { cacao: e, projectId: s } = t, { s: r, p: i } = e, n = Bc(i, i.iss), o = Li(i.iss);
  return await ch(o, n, r, Rn(i.iss), s);
}
const Bc = (t, e) => {
  const s = `${t.domain} wants you to sign in with your Ethereum account:`, r = Li(e);
  if (!t.aud && !t.uri) throw new Error("Either `aud` or `uri` is required to construct the message");
  let i = t.statement || void 0;
  const n = `URI: ${t.aud || t.uri}`, o = `Version: ${t.version}`, a = `Chain ID: ${Eh(e)}`, c = `Nonce: ${t.nonce}`, l = `Issued At: ${t.iat}`, u = t.exp ? `Expiration Time: ${t.exp}` : void 0, d = t.nbf ? `Not Before: ${t.nbf}` : void 0, h = t.requestId ? `Request ID: ${t.requestId}` : void 0, g = t.resources ? `Resources:${t.resources.map((m) => `
- ${m}`).join("")}` : void 0, w = Oi(t.resources);
  if (w) {
    const m = ti(w);
    i = Th(i, m);
  }
  return [s, r, "", i, "", n, o, a, c, l, u, d, h, g].filter((m) => m != null).join(`
`);
};
function Ch(t) {
  return Buffer.from(JSON.stringify(t)).toString("base64");
}
function Ih(t) {
  return JSON.parse(Buffer.from(t, "base64").toString("utf-8"));
}
function Ls(t) {
  if (!t) throw new Error("No recap provided, value is undefined");
  if (!t.att) throw new Error("No `att` property found");
  const e = Object.keys(t.att);
  if (!(e != null && e.length)) throw new Error("No resources found in `att` property");
  e.forEach((s) => {
    const r = t.att[s];
    if (Array.isArray(r)) throw new Error(`Resource must be an object: ${s}`);
    if (typeof r != "object") throw new Error(`Resource must be an object: ${s}`);
    if (!Object.keys(r).length) throw new Error(`Resource object is empty: ${s}`);
    Object.keys(r).forEach((i) => {
      const n = r[i];
      if (!Array.isArray(n)) throw new Error(`Ability limits ${i} must be an array of objects, found: ${n}`);
      if (!n.length) throw new Error(`Value of ${i} is empty array, must be an array with objects`);
      n.forEach((o) => {
        if (typeof o != "object") throw new Error(`Ability limits (${i}) must be an array of objects, found: ${o}`);
      });
    });
  });
}
function Nh(t, e, s, r = {}) {
  return s == null || s.sort((i, n) => i.localeCompare(n)), { att: { [t]: Ah(e, s, r) } };
}
function Ah(t, e, s = {}) {
  e = e == null ? void 0 : e.sort((i, n) => i.localeCompare(n));
  const r = e.map((i) => ({ [`${t}/${i}`]: [s] }));
  return Object.assign({}, ...r);
}
function qc(t) {
  return Ls(t), `urn:recap:${Ch(t).replace(/=/g, "")}`;
}
function ti(t) {
  const e = Ih(t.replace("urn:recap:", ""));
  return Ls(e), e;
}
function _h(t, e, s) {
  const r = Nh(t, e, s);
  return qc(r);
}
function Sh(t) {
  return t && t.includes("urn:recap:");
}
function Ph(t, e) {
  const s = ti(t), r = ti(e), i = Oh(s, r);
  return qc(i);
}
function Oh(t, e) {
  Ls(t), Ls(e);
  const s = Object.keys(t.att).concat(Object.keys(e.att)).sort((i, n) => i.localeCompare(n)), r = { att: {} };
  return s.forEach((i) => {
    var n, o;
    Object.keys(((n = t.att) == null ? void 0 : n[i]) || {}).concat(Object.keys(((o = e.att) == null ? void 0 : o[i]) || {})).sort((a, c) => a.localeCompare(c)).forEach((a) => {
      var c, l;
      r.att[i] = bh(yh({}, r.att[i]), { [a]: ((c = t.att[i]) == null ? void 0 : c[a]) || ((l = e.att[i]) == null ? void 0 : l[a]) });
    });
  }), r;
}
function Th(t = "", e) {
  Ls(e);
  const s = "I further authorize the stated URI to perform the following actions on my behalf: ";
  if (t.includes(s)) return t;
  const r = [];
  let i = 0;
  Object.keys(e.att).forEach((a) => {
    const c = Object.keys(e.att[a]).map((d) => ({ ability: d.split("/")[0], action: d.split("/")[1] }));
    c.sort((d, h) => d.action.localeCompare(h.action));
    const l = {};
    c.forEach((d) => {
      l[d.ability] || (l[d.ability] = []), l[d.ability].push(d.action);
    });
    const u = Object.keys(l).map((d) => (i++, `(${i}) '${d}': '${l[d].join("', '")}' for '${a}'.`));
    r.push(u.join(", ").replace(".,", "."));
  });
  const n = r.join(" "), o = `${s}${n}`;
  return `${t ? t + " " : ""}${o}`;
}
function Jo(t) {
  var e;
  const s = ti(t);
  Ls(s);
  const r = (e = s.att) == null ? void 0 : e.eip155;
  return r ? Object.keys(r).map((i) => i.split("/")[1]) : [];
}
function Yo(t) {
  const e = ti(t);
  Ls(e);
  const s = [];
  return Object.values(e.att).forEach((r) => {
    Object.values(r).forEach((i) => {
      var n;
      (n = i == null ? void 0 : i[0]) != null && n.chains && s.push(i[0].chains);
    });
  }), [...new Set(s.flat())];
}
function Oi(t) {
  if (!t) return;
  const e = t == null ? void 0 : t[t.length - 1];
  return Sh(e) ? e : void 0;
}
function rn(t) {
  if (!Number.isSafeInteger(t) || t < 0) throw new Error("positive integer expected, got " + t);
}
function jc(t) {
  return t instanceof Uint8Array || ArrayBuffer.isView(t) && t.constructor.name === "Uint8Array";
}
function gt(t, ...e) {
  if (!jc(t)) throw new Error("Uint8Array expected");
  if (e.length > 0 && !e.includes(t.length)) throw new Error("Uint8Array expected of length " + e + ", got length=" + t.length);
}
function Xo(t, e = !0) {
  if (t.destroyed) throw new Error("Hash instance has been destroyed");
  if (e && t.finished) throw new Error("Hash#digest() has already been called");
}
function kh(t, e) {
  gt(t);
  const s = e.outputLen;
  if (t.length < s) throw new Error("digestInto() expects output buffer of length at least " + s);
}
function Zo(t) {
  if (typeof t != "boolean") throw new Error(`boolean expected, not ${t}`);
}
const ws = (t) => new Uint32Array(t.buffer, t.byteOffset, Math.floor(t.byteLength / 4)), xh = (t) => new DataView(t.buffer, t.byteOffset, t.byteLength), Rh = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
if (!Rh) throw new Error("Non little-endian hardware is not supported");
function $h(t) {
  if (typeof t != "string") throw new Error("string expected");
  return new Uint8Array(new TextEncoder().encode(t));
}
function $n(t) {
  if (typeof t == "string") t = $h(t);
  else if (jc(t)) t = Un(t);
  else throw new Error("Uint8Array expected, got " + typeof t);
  return t;
}
function Uh(t, e) {
  if (e == null || typeof e != "object") throw new Error("options must be defined");
  return Object.assign(t, e);
}
function Dh(t, e) {
  if (t.length !== e.length) return !1;
  let s = 0;
  for (let r = 0; r < t.length; r++) s |= t[r] ^ e[r];
  return s === 0;
}
const Lh = (t, e) => {
  function s(r, ...i) {
    if (gt(r), t.nonceLength !== void 0) {
      const l = i[0];
      if (!l) throw new Error("nonce / iv required");
      t.varSizeNonce ? gt(l) : gt(l, t.nonceLength);
    }
    const n = t.tagLength;
    n && i[1] !== void 0 && gt(i[1]);
    const o = e(r, ...i), a = (l, u) => {
      if (u !== void 0) {
        if (l !== 2) throw new Error("cipher output not supported");
        gt(u);
      }
    };
    let c = !1;
    return { encrypt(l, u) {
      if (c) throw new Error("cannot encrypt() twice with same key + nonce");
      return c = !0, gt(l), a(o.encrypt.length, u), o.encrypt(l, u);
    }, decrypt(l, u) {
      if (gt(l), n && l.length < n) throw new Error("invalid ciphertext length: smaller than tagLength=" + n);
      return a(o.decrypt.length, u), o.decrypt(l, u);
    } };
  }
  return Object.assign(s, t), s;
};
function Qo(t, e, s = !0) {
  if (e === void 0) return new Uint8Array(t);
  if (e.length !== t) throw new Error("invalid output length, expected " + t + ", got: " + e.length);
  if (s && !Fh(e)) throw new Error("invalid output, must be aligned");
  return e;
}
function ea(t, e, s, r) {
  if (typeof t.setBigUint64 == "function") return t.setBigUint64(e, s, r);
  const i = BigInt(32), n = BigInt(4294967295), o = Number(s >> i & n), a = Number(s & n);
  t.setUint32(e + 4, o, r), t.setUint32(e + 0, a, r);
}
function Fh(t) {
  return t.byteOffset % 4 === 0;
}
function Un(t) {
  return Uint8Array.from(t);
}
function br(...t) {
  for (let e = 0; e < t.length; e++) t[e].fill(0);
}
const Wc = (t) => Uint8Array.from(t.split("").map((e) => e.charCodeAt(0))), Mh = Wc("expand 16-byte k"), Bh = Wc("expand 32-byte k"), qh = ws(Mh), jh = ws(Bh);
function ce(t, e) {
  return t << e | t >>> 32 - e;
}
function Dn(t) {
  return t.byteOffset % 4 === 0;
}
const bi = 64, Wh = 16, zc = 2 ** 32 - 1, ta = new Uint32Array();
function zh(t, e, s, r, i, n, o, a) {
  const c = i.length, l = new Uint8Array(bi), u = ws(l), d = Dn(i) && Dn(n), h = d ? ws(i) : ta, g = d ? ws(n) : ta;
  for (let w = 0; w < c; o++) {
    if (t(e, s, r, u, o, a), o >= zc) throw new Error("arx: counter overflow");
    const m = Math.min(bi, c - w);
    if (d && m === bi) {
      const f = w / 4;
      if (w % 4 !== 0) throw new Error("arx: invalid block position");
      for (let y = 0, b; y < Wh; y++) b = f + y, g[b] = h[b] ^ u[y];
      w += bi;
      continue;
    }
    for (let f = 0, y; f < m; f++) y = w + f, n[y] = i[y] ^ l[f];
    w += m;
  }
}
function Hh(t, e) {
  const { allowShortKeys: s, extendNonceFn: r, counterLength: i, counterRight: n, rounds: o } = Uh({ allowShortKeys: !1, counterLength: 8, counterRight: !1, rounds: 20 }, e);
  if (typeof t != "function") throw new Error("core must be a function");
  return rn(i), rn(o), Zo(n), Zo(s), (a, c, l, u, d = 0) => {
    gt(a), gt(c), gt(l);
    const h = l.length;
    if (u === void 0 && (u = new Uint8Array(h)), gt(u), rn(d), d < 0 || d >= zc) throw new Error("arx: counter overflow");
    if (u.length < h) throw new Error(`arx: output (${u.length}) is shorter than data (${h})`);
    const g = [];
    let w = a.length, m, f;
    if (w === 32) g.push(m = Un(a)), f = jh;
    else if (w === 16 && s) m = new Uint8Array(32), m.set(a), m.set(a, 16), f = qh, g.push(m);
    else throw new Error(`arx: invalid 32-byte key, got length=${w}`);
    Dn(c) || g.push(c = Un(c));
    const y = ws(m);
    if (r) {
      if (c.length !== 24) throw new Error("arx: extended nonce must be 24 bytes");
      r(f, y, ws(c.subarray(0, 16)), y), c = c.subarray(16);
    }
    const b = 16 - i;
    if (b !== c.length) throw new Error(`arx: nonce must be ${b} or 16 bytes`);
    if (b !== 12) {
      const _ = new Uint8Array(12);
      _.set(c, n ? 0 : 12 - c.length), c = _, g.push(c);
    }
    const E = ws(c);
    return zh(t, f, y, E, l, u, d, o), br(...g), u;
  };
}
const We = (t, e) => t[e++] & 255 | (t[e++] & 255) << 8;
class Kh {
  constructor(e) {
    this.blockLen = 16, this.outputLen = 16, this.buffer = new Uint8Array(16), this.r = new Uint16Array(10), this.h = new Uint16Array(10), this.pad = new Uint16Array(8), this.pos = 0, this.finished = !1, e = $n(e), gt(e, 32);
    const s = We(e, 0), r = We(e, 2), i = We(e, 4), n = We(e, 6), o = We(e, 8), a = We(e, 10), c = We(e, 12), l = We(e, 14);
    this.r[0] = s & 8191, this.r[1] = (s >>> 13 | r << 3) & 8191, this.r[2] = (r >>> 10 | i << 6) & 7939, this.r[3] = (i >>> 7 | n << 9) & 8191, this.r[4] = (n >>> 4 | o << 12) & 255, this.r[5] = o >>> 1 & 8190, this.r[6] = (o >>> 14 | a << 2) & 8191, this.r[7] = (a >>> 11 | c << 5) & 8065, this.r[8] = (c >>> 8 | l << 8) & 8191, this.r[9] = l >>> 5 & 127;
    for (let u = 0; u < 8; u++) this.pad[u] = We(e, 16 + 2 * u);
  }
  process(e, s, r = !1) {
    const i = r ? 0 : 2048, { h: n, r: o } = this, a = o[0], c = o[1], l = o[2], u = o[3], d = o[4], h = o[5], g = o[6], w = o[7], m = o[8], f = o[9], y = We(e, s + 0), b = We(e, s + 2), E = We(e, s + 4), _ = We(e, s + 6), x = We(e, s + 8), P = We(e, s + 10), S = We(e, s + 12), D = We(e, s + 14);
    let v = n[0] + (y & 8191), R = n[1] + ((y >>> 13 | b << 3) & 8191), C = n[2] + ((b >>> 10 | E << 6) & 8191), L = n[3] + ((E >>> 7 | _ << 9) & 8191), H = n[4] + ((_ >>> 4 | x << 12) & 8191), I = n[5] + (x >>> 1 & 8191), T = n[6] + ((x >>> 14 | P << 2) & 8191), A = n[7] + ((P >>> 11 | S << 5) & 8191), M = n[8] + ((S >>> 8 | D << 8) & 8191), q = n[9] + (D >>> 5 | i), k = 0, G = k + v * a + R * (5 * f) + C * (5 * m) + L * (5 * w) + H * (5 * g);
    k = G >>> 13, G &= 8191, G += I * (5 * h) + T * (5 * d) + A * (5 * u) + M * (5 * l) + q * (5 * c), k += G >>> 13, G &= 8191;
    let Q = k + v * c + R * a + C * (5 * f) + L * (5 * m) + H * (5 * w);
    k = Q >>> 13, Q &= 8191, Q += I * (5 * g) + T * (5 * h) + A * (5 * d) + M * (5 * u) + q * (5 * l), k += Q >>> 13, Q &= 8191;
    let se = k + v * l + R * c + C * a + L * (5 * f) + H * (5 * m);
    k = se >>> 13, se &= 8191, se += I * (5 * w) + T * (5 * g) + A * (5 * h) + M * (5 * d) + q * (5 * u), k += se >>> 13, se &= 8191;
    let Ee = k + v * u + R * l + C * c + L * a + H * (5 * f);
    k = Ee >>> 13, Ee &= 8191, Ee += I * (5 * m) + T * (5 * w) + A * (5 * g) + M * (5 * h) + q * (5 * d), k += Ee >>> 13, Ee &= 8191;
    let he = k + v * d + R * u + C * l + L * c + H * a;
    k = he >>> 13, he &= 8191, he += I * (5 * f) + T * (5 * m) + A * (5 * w) + M * (5 * g) + q * (5 * h), k += he >>> 13, he &= 8191;
    let Oe = k + v * h + R * d + C * u + L * l + H * c;
    k = Oe >>> 13, Oe &= 8191, Oe += I * a + T * (5 * f) + A * (5 * m) + M * (5 * w) + q * (5 * g), k += Oe >>> 13, Oe &= 8191;
    let De = k + v * g + R * h + C * d + L * u + H * l;
    k = De >>> 13, De &= 8191, De += I * c + T * a + A * (5 * f) + M * (5 * m) + q * (5 * w), k += De >>> 13, De &= 8191;
    let Ge = k + v * w + R * g + C * h + L * d + H * u;
    k = Ge >>> 13, Ge &= 8191, Ge += I * l + T * c + A * a + M * (5 * f) + q * (5 * m), k += Ge >>> 13, Ge &= 8191;
    let xe = k + v * m + R * w + C * g + L * h + H * d;
    k = xe >>> 13, xe &= 8191, xe += I * u + T * l + A * c + M * a + q * (5 * f), k += xe >>> 13, xe &= 8191;
    let Re = k + v * f + R * m + C * w + L * g + H * h;
    k = Re >>> 13, Re &= 8191, Re += I * d + T * u + A * l + M * c + q * a, k += Re >>> 13, Re &= 8191, k = (k << 2) + k | 0, k = k + G | 0, G = k & 8191, k = k >>> 13, Q += k, n[0] = G, n[1] = Q, n[2] = se, n[3] = Ee, n[4] = he, n[5] = Oe, n[6] = De, n[7] = Ge, n[8] = xe, n[9] = Re;
  }
  finalize() {
    const { h: e, pad: s } = this, r = new Uint16Array(10);
    let i = e[1] >>> 13;
    e[1] &= 8191;
    for (let a = 2; a < 10; a++) e[a] += i, i = e[a] >>> 13, e[a] &= 8191;
    e[0] += i * 5, i = e[0] >>> 13, e[0] &= 8191, e[1] += i, i = e[1] >>> 13, e[1] &= 8191, e[2] += i, r[0] = e[0] + 5, i = r[0] >>> 13, r[0] &= 8191;
    for (let a = 1; a < 10; a++) r[a] = e[a] + i, i = r[a] >>> 13, r[a] &= 8191;
    r[9] -= 8192;
    let n = (i ^ 1) - 1;
    for (let a = 0; a < 10; a++) r[a] &= n;
    n = ~n;
    for (let a = 0; a < 10; a++) e[a] = e[a] & n | r[a];
    e[0] = (e[0] | e[1] << 13) & 65535, e[1] = (e[1] >>> 3 | e[2] << 10) & 65535, e[2] = (e[2] >>> 6 | e[3] << 7) & 65535, e[3] = (e[3] >>> 9 | e[4] << 4) & 65535, e[4] = (e[4] >>> 12 | e[5] << 1 | e[6] << 14) & 65535, e[5] = (e[6] >>> 2 | e[7] << 11) & 65535, e[6] = (e[7] >>> 5 | e[8] << 8) & 65535, e[7] = (e[8] >>> 8 | e[9] << 5) & 65535;
    let o = e[0] + s[0];
    e[0] = o & 65535;
    for (let a = 1; a < 8; a++) o = (e[a] + s[a] | 0) + (o >>> 16) | 0, e[a] = o & 65535;
    br(r);
  }
  update(e) {
    Xo(this);
    const { buffer: s, blockLen: r } = this;
    e = $n(e);
    const i = e.length;
    for (let n = 0; n < i; ) {
      const o = Math.min(r - this.pos, i - n);
      if (o === r) {
        for (; r <= i - n; n += r) this.process(e, n);
        continue;
      }
      s.set(e.subarray(n, n + o), this.pos), this.pos += o, n += o, this.pos === r && (this.process(s, 0, !1), this.pos = 0);
    }
    return this;
  }
  destroy() {
    br(this.h, this.r, this.buffer, this.pad);
  }
  digestInto(e) {
    Xo(this), kh(e, this), this.finished = !0;
    const { buffer: s, h: r } = this;
    let { pos: i } = this;
    if (i) {
      for (s[i++] = 1; i < 16; i++) s[i] = 0;
      this.process(s, 0, !0);
    }
    this.finalize();
    let n = 0;
    for (let o = 0; o < 8; o++) e[n++] = r[o] >>> 0, e[n++] = r[o] >>> 8;
    return e;
  }
  digest() {
    const { buffer: e, outputLen: s } = this;
    this.digestInto(e);
    const r = e.slice(0, s);
    return this.destroy(), r;
  }
}
function Vh(t) {
  const e = (r, i) => t(i).update($n(r)).digest(), s = t(new Uint8Array(32));
  return e.outputLen = s.outputLen, e.blockLen = s.blockLen, e.create = (r) => t(r), e;
}
const Gh = Vh((t) => new Kh(t));
function Jh(t, e, s, r, i, n = 20) {
  let o = t[0], a = t[1], c = t[2], l = t[3], u = e[0], d = e[1], h = e[2], g = e[3], w = e[4], m = e[5], f = e[6], y = e[7], b = i, E = s[0], _ = s[1], x = s[2], P = o, S = a, D = c, v = l, R = u, C = d, L = h, H = g, I = w, T = m, A = f, M = y, q = b, k = E, G = _, Q = x;
  for (let Ee = 0; Ee < n; Ee += 2) P = P + R | 0, q = ce(q ^ P, 16), I = I + q | 0, R = ce(R ^ I, 12), P = P + R | 0, q = ce(q ^ P, 8), I = I + q | 0, R = ce(R ^ I, 7), S = S + C | 0, k = ce(k ^ S, 16), T = T + k | 0, C = ce(C ^ T, 12), S = S + C | 0, k = ce(k ^ S, 8), T = T + k | 0, C = ce(C ^ T, 7), D = D + L | 0, G = ce(G ^ D, 16), A = A + G | 0, L = ce(L ^ A, 12), D = D + L | 0, G = ce(G ^ D, 8), A = A + G | 0, L = ce(L ^ A, 7), v = v + H | 0, Q = ce(Q ^ v, 16), M = M + Q | 0, H = ce(H ^ M, 12), v = v + H | 0, Q = ce(Q ^ v, 8), M = M + Q | 0, H = ce(H ^ M, 7), P = P + C | 0, Q = ce(Q ^ P, 16), A = A + Q | 0, C = ce(C ^ A, 12), P = P + C | 0, Q = ce(Q ^ P, 8), A = A + Q | 0, C = ce(C ^ A, 7), S = S + L | 0, q = ce(q ^ S, 16), M = M + q | 0, L = ce(L ^ M, 12), S = S + L | 0, q = ce(q ^ S, 8), M = M + q | 0, L = ce(L ^ M, 7), D = D + H | 0, k = ce(k ^ D, 16), I = I + k | 0, H = ce(H ^ I, 12), D = D + H | 0, k = ce(k ^ D, 8), I = I + k | 0, H = ce(H ^ I, 7), v = v + R | 0, G = ce(G ^ v, 16), T = T + G | 0, R = ce(R ^ T, 12), v = v + R | 0, G = ce(G ^ v, 8), T = T + G | 0, R = ce(R ^ T, 7);
  let se = 0;
  r[se++] = o + P | 0, r[se++] = a + S | 0, r[se++] = c + D | 0, r[se++] = l + v | 0, r[se++] = u + R | 0, r[se++] = d + C | 0, r[se++] = h + L | 0, r[se++] = g + H | 0, r[se++] = w + I | 0, r[se++] = m + T | 0, r[se++] = f + A | 0, r[se++] = y + M | 0, r[se++] = b + q | 0, r[se++] = E + k | 0, r[se++] = _ + G | 0, r[se++] = x + Q | 0;
}
const Yh = Hh(Jh, { counterRight: !1, counterLength: 4, allowShortKeys: !1 }), Xh = new Uint8Array(16), sa = (t, e) => {
  t.update(e);
  const s = e.length % 16;
  s && t.update(Xh.subarray(s));
}, Zh = new Uint8Array(32);
function ra(t, e, s, r, i) {
  const n = t(e, s, Zh), o = Gh.create(n);
  i && sa(o, i), sa(o, r);
  const a = new Uint8Array(16), c = xh(a);
  ea(c, 0, BigInt(i ? i.length : 0), !0), ea(c, 8, BigInt(r.length), !0), o.update(a);
  const l = o.digest();
  return br(n, a), l;
}
const Qh = (t) => (e, s, r) => ({ encrypt(i, n) {
  const o = i.length;
  n = Qo(o + 16, n, !1), n.set(i);
  const a = n.subarray(0, -16);
  t(e, s, a, a, 1);
  const c = ra(t, e, s, a, r);
  return n.set(c, o), br(c), n;
}, decrypt(i, n) {
  n = Qo(i.length - 16, n, !1);
  const o = i.subarray(0, -16), a = i.subarray(-16), c = ra(t, e, s, o, r);
  if (!Dh(a, c)) throw new Error("invalid tag");
  return n.set(i.subarray(0, -16)), t(e, s, n, n, 1), br(c), n;
} }), Hc = Lh({ blockSize: 64, nonceLength: 12, tagLength: 16 }, Qh(Yh));
let Kc = class extends ho {
  constructor(e, s) {
    super(), this.finished = !1, this.destroyed = !1, uo(e);
    const r = yr(s);
    if (this.iHash = e.create(), typeof this.iHash.update != "function") throw new Error("Expected instance of class which extends utils.Hash");
    this.blockLen = this.iHash.blockLen, this.outputLen = this.iHash.outputLen;
    const i = this.blockLen, n = new Uint8Array(i);
    n.set(r.length > i ? e.create().update(r).digest() : r);
    for (let o = 0; o < n.length; o++) n[o] ^= 54;
    this.iHash.update(n), this.oHash = e.create();
    for (let o = 0; o < n.length; o++) n[o] ^= 106;
    this.oHash.update(n), n.fill(0);
  }
  update(e) {
    return wr(this), this.iHash.update(e), this;
  }
  digestInto(e) {
    wr(this), ci(e, this.outputLen), this.finished = !0, this.iHash.digestInto(e), this.oHash.update(e), this.oHash.digestInto(e), this.destroy();
  }
  digest() {
    const e = new Uint8Array(this.oHash.outputLen);
    return this.digestInto(e), e;
  }
  _cloneInto(e) {
    e || (e = Object.create(Object.getPrototypeOf(this), {}));
    const { oHash: s, iHash: r, finished: i, destroyed: n, blockLen: o, outputLen: a } = this;
    return e = e, e.finished = i, e.destroyed = n, e.blockLen = o, e.outputLen = a, e.oHash = s._cloneInto(e.oHash), e.iHash = r._cloneInto(e.iHash), e;
  }
  destroy() {
    this.destroyed = !0, this.oHash.destroy(), this.iHash.destroy();
  }
};
const Wi = (t, e, s) => new Kc(t, e).update(s).digest();
Wi.create = (t, e) => new Kc(t, e);
function ep(t, e, s) {
  return uo(t), s === void 0 && (s = new Uint8Array(t.outputLen)), Wi(t, yr(s), yr(e));
}
const nn = new Uint8Array([0]), ia = new Uint8Array();
function tp(t, e, s, r = 32) {
  if (uo(t), ei(r), r > 255 * t.outputLen) throw new Error("Length should be <= 255*HashLen");
  const i = Math.ceil(r / t.outputLen);
  s === void 0 && (s = ia);
  const n = new Uint8Array(i * t.outputLen), o = Wi.create(t, e), a = o._cloneInto(), c = new Uint8Array(o.outputLen);
  for (let l = 0; l < i; l++) nn[0] = l + 1, a.update(l === 0 ? ia : c).update(s).update(nn).digestInto(c), n.set(c, t.outputLen * l), o._cloneInto(a);
  return o.destroy(), a.destroy(), c.fill(0), nn.fill(0), n.slice(0, r);
}
const sp = (t, e, s, r, i) => tp(t, ep(t, e, s), r, i);
function rp(t, e, s, r) {
  if (typeof t.setBigUint64 == "function") return t.setBigUint64(e, s, r);
  const i = BigInt(32), n = BigInt(4294967295), o = Number(s >> i & n), a = Number(s & n), c = r ? 4 : 0, l = r ? 0 : 4;
  t.setUint32(e + c, o, r), t.setUint32(e + l, a, r);
}
function ip(t, e, s) {
  return t & e ^ ~t & s;
}
function np(t, e, s) {
  return t & e ^ t & s ^ e & s;
}
let op = class extends ho {
  constructor(e, s, r, i) {
    super(), this.blockLen = e, this.outputLen = s, this.padOffset = r, this.isLE = i, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(e), this.view = sn(this.buffer);
  }
  update(e) {
    wr(this);
    const { view: s, buffer: r, blockLen: i } = this;
    e = yr(e);
    const n = e.length;
    for (let o = 0; o < n; ) {
      const a = Math.min(i - this.pos, n - o);
      if (a === i) {
        const c = sn(e);
        for (; i <= n - o; o += i) this.process(c, o);
        continue;
      }
      r.set(e.subarray(o, o + a), this.pos), this.pos += a, o += a, this.pos === i && (this.process(s, 0), this.pos = 0);
    }
    return this.length += e.length, this.roundClean(), this;
  }
  digestInto(e) {
    wr(this), Rc(e, this), this.finished = !0;
    const { buffer: s, view: r, blockLen: i, isLE: n } = this;
    let { pos: o } = this;
    s[o++] = 128, this.buffer.subarray(o).fill(0), this.padOffset > i - o && (this.process(r, 0), o = 0);
    for (let d = o; d < i; d++) s[d] = 0;
    rp(r, i - 8, BigInt(this.length * 8), n), this.process(r, 0);
    const a = sn(e), c = this.outputLen;
    if (c % 4) throw new Error("_sha2: outputLen should be aligned to 32bit");
    const l = c / 4, u = this.get();
    if (l > u.length) throw new Error("_sha2: outputLen bigger than state");
    for (let d = 0; d < l; d++) a.setUint32(4 * d, u[d], n);
  }
  digest() {
    const { buffer: e, outputLen: s } = this;
    this.digestInto(e);
    const r = e.slice(0, s);
    return this.destroy(), r;
  }
  _cloneInto(e) {
    e || (e = new this.constructor()), e.set(...this.get());
    const { blockLen: s, buffer: r, length: i, finished: n, destroyed: o, pos: a } = this;
    return e.length = i, e.pos = a, e.finished = n, e.destroyed = o, i % s && e.buffer.set(r), e;
  }
};
const ap = new Uint32Array([1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298]), cs = new Uint32Array([1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225]), ls = new Uint32Array(64);
class cp extends op {
  constructor() {
    super(64, 32, 8, !1), this.A = cs[0] | 0, this.B = cs[1] | 0, this.C = cs[2] | 0, this.D = cs[3] | 0, this.E = cs[4] | 0, this.F = cs[5] | 0, this.G = cs[6] | 0, this.H = cs[7] | 0;
  }
  get() {
    const { A: e, B: s, C: r, D: i, E: n, F: o, G: a, H: c } = this;
    return [e, s, r, i, n, o, a, c];
  }
  set(e, s, r, i, n, o, a, c) {
    this.A = e | 0, this.B = s | 0, this.C = r | 0, this.D = i | 0, this.E = n | 0, this.F = o | 0, this.G = a | 0, this.H = c | 0;
  }
  process(e, s) {
    for (let d = 0; d < 16; d++, s += 4) ls[d] = e.getUint32(s, !1);
    for (let d = 16; d < 64; d++) {
      const h = ls[d - 15], g = ls[d - 2], w = Lt(h, 7) ^ Lt(h, 18) ^ h >>> 3, m = Lt(g, 17) ^ Lt(g, 19) ^ g >>> 10;
      ls[d] = m + ls[d - 7] + w + ls[d - 16] | 0;
    }
    let { A: r, B: i, C: n, D: o, E: a, F: c, G: l, H: u } = this;
    for (let d = 0; d < 64; d++) {
      const h = Lt(a, 6) ^ Lt(a, 11) ^ Lt(a, 25), g = u + h + ip(a, c, l) + ap[d] + ls[d] | 0, w = (Lt(r, 2) ^ Lt(r, 13) ^ Lt(r, 22)) + np(r, i, n) | 0;
      u = l, l = c, c = a, a = o + g | 0, o = n, n = i, i = r, r = g + w | 0;
    }
    r = r + this.A | 0, i = i + this.B | 0, n = n + this.C | 0, o = o + this.D | 0, a = a + this.E | 0, c = c + this.F | 0, l = l + this.G | 0, u = u + this.H | 0, this.set(r, i, n, o, a, c, l, u);
  }
  roundClean() {
    ls.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
}
const li = $c(() => new cp());
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const zi = BigInt(0), Hi = BigInt(1), lp = BigInt(2);
function Fs(t) {
  return t instanceof Uint8Array || ArrayBuffer.isView(t) && t.constructor.name === "Uint8Array";
}
function ui(t) {
  if (!Fs(t)) throw new Error("Uint8Array expected");
}
function vr(t, e) {
  if (typeof e != "boolean") throw new Error(t + " boolean expected, got " + e);
}
const up = Array.from({ length: 256 }, (t, e) => e.toString(16).padStart(2, "0"));
function Er(t) {
  ui(t);
  let e = "";
  for (let s = 0; s < t.length; s++) e += up[t[s]];
  return e;
}
function lr(t) {
  const e = t.toString(16);
  return e.length & 1 ? "0" + e : e;
}
function go(t) {
  if (typeof t != "string") throw new Error("hex string expected, got " + typeof t);
  return t === "" ? zi : BigInt("0x" + t);
}
const Xt = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
function na(t) {
  if (t >= Xt._0 && t <= Xt._9) return t - Xt._0;
  if (t >= Xt.A && t <= Xt.F) return t - (Xt.A - 10);
  if (t >= Xt.a && t <= Xt.f) return t - (Xt.a - 10);
}
function Cr(t) {
  if (typeof t != "string") throw new Error("hex string expected, got " + typeof t);
  const e = t.length, s = e / 2;
  if (e % 2) throw new Error("hex string expected, got unpadded hex of length " + e);
  const r = new Uint8Array(s);
  for (let i = 0, n = 0; i < s; i++, n += 2) {
    const o = na(t.charCodeAt(n)), a = na(t.charCodeAt(n + 1));
    if (o === void 0 || a === void 0) {
      const c = t[n] + t[n + 1];
      throw new Error('hex string expected, got non-hex character "' + c + '" at index ' + n);
    }
    r[i] = o * 16 + a;
  }
  return r;
}
function Us(t) {
  return go(Er(t));
}
function si(t) {
  return ui(t), go(Er(Uint8Array.from(t).reverse()));
}
function Ir(t, e) {
  return Cr(t.toString(16).padStart(e * 2, "0"));
}
function Ki(t, e) {
  return Ir(t, e).reverse();
}
function dp(t) {
  return Cr(lr(t));
}
function pt(t, e, s) {
  let r;
  if (typeof e == "string") try {
    r = Cr(e);
  } catch (n) {
    throw new Error(t + " must be hex string or Uint8Array, cause: " + n);
  }
  else if (Fs(e)) r = Uint8Array.from(e);
  else throw new Error(t + " must be hex string or Uint8Array");
  const i = r.length;
  if (typeof s == "number" && i !== s) throw new Error(t + " of length " + s + " expected, got " + i);
  return r;
}
function ri(...t) {
  let e = 0;
  for (let r = 0; r < t.length; r++) {
    const i = t[r];
    ui(i), e += i.length;
  }
  const s = new Uint8Array(e);
  for (let r = 0, i = 0; r < t.length; r++) {
    const n = t[r];
    s.set(n, i), i += n.length;
  }
  return s;
}
function hp(t, e) {
  if (t.length !== e.length) return !1;
  let s = 0;
  for (let r = 0; r < t.length; r++) s |= t[r] ^ e[r];
  return s === 0;
}
function pp(t) {
  if (typeof t != "string") throw new Error("string expected");
  return new Uint8Array(new TextEncoder().encode(t));
}
const on = (t) => typeof t == "bigint" && zi <= t;
function Vi(t, e, s) {
  return on(t) && on(e) && on(s) && e <= t && t < s;
}
function ss(t, e, s, r) {
  if (!Vi(e, s, r)) throw new Error("expected valid " + t + ": " + s + " <= n < " + r + ", got " + e);
}
function Vc(t) {
  let e;
  for (e = 0; t > zi; t >>= Hi, e += 1) ;
  return e;
}
function gp(t, e) {
  return t >> BigInt(e) & Hi;
}
function fp(t, e, s) {
  return t | (s ? Hi : zi) << BigInt(e);
}
const fo = (t) => (lp << BigInt(t - 1)) - Hi, an = (t) => new Uint8Array(t), oa = (t) => Uint8Array.from(t);
function Gc(t, e, s) {
  if (typeof t != "number" || t < 2) throw new Error("hashLen must be a number");
  if (typeof e != "number" || e < 2) throw new Error("qByteLen must be a number");
  if (typeof s != "function") throw new Error("hmacFn must be a function");
  let r = an(t), i = an(t), n = 0;
  const o = () => {
    r.fill(1), i.fill(0), n = 0;
  }, a = (...u) => s(i, r, ...u), c = (u = an()) => {
    i = a(oa([0]), u), r = a(), u.length !== 0 && (i = a(oa([1]), u), r = a());
  }, l = () => {
    if (n++ >= 1e3) throw new Error("drbg: tried 1000 values");
    let u = 0;
    const d = [];
    for (; u < e; ) {
      r = a();
      const h = r.slice();
      d.push(h), u += r.length;
    }
    return ri(...d);
  };
  return (u, d) => {
    o(), c(u);
    let h;
    for (; !(h = d(l())); ) c();
    return o(), h;
  };
}
const mp = { bigint: (t) => typeof t == "bigint", function: (t) => typeof t == "function", boolean: (t) => typeof t == "boolean", string: (t) => typeof t == "string", stringOrUint8Array: (t) => typeof t == "string" || Fs(t), isSafeInteger: (t) => Number.isSafeInteger(t), array: (t) => Array.isArray(t), field: (t, e) => e.Fp.isValid(t), hash: (t) => typeof t == "function" && Number.isSafeInteger(t.outputLen) };
function Pr(t, e, s = {}) {
  const r = (i, n, o) => {
    const a = mp[n];
    if (typeof a != "function") throw new Error("invalid validator function");
    const c = t[i];
    if (!(o && c === void 0) && !a(c, t)) throw new Error("param " + String(i) + " is invalid. Expected " + n + ", got " + c);
  };
  for (const [i, n] of Object.entries(e)) r(i, n, !1);
  for (const [i, n] of Object.entries(s)) r(i, n, !0);
  return t;
}
const wp = () => {
  throw new Error("not implemented");
};
function Ln(t) {
  const e = /* @__PURE__ */ new WeakMap();
  return (s, ...r) => {
    const i = e.get(s);
    if (i !== void 0) return i;
    const n = t(s, ...r);
    return e.set(s, n), n;
  };
}
var yp = Object.freeze({ __proto__: null, isBytes: Fs, abytes: ui, abool: vr, bytesToHex: Er, numberToHexUnpadded: lr, hexToNumber: go, hexToBytes: Cr, bytesToNumberBE: Us, bytesToNumberLE: si, numberToBytesBE: Ir, numberToBytesLE: Ki, numberToVarBytesBE: dp, ensureBytes: pt, concatBytes: ri, equalBytes: hp, utf8ToBytes: pp, inRange: Vi, aInRange: ss, bitLen: Vc, bitGet: gp, bitSet: fp, bitMask: fo, createHmacDrbg: Gc, validateObject: Pr, notImplemented: wp, memoized: Ln });
const je = BigInt(0), Pe = BigInt(1), Ts = BigInt(2), bp = BigInt(3), Fn = BigInt(4), aa = BigInt(5), ca = BigInt(8);
function at(t, e) {
  const s = t % e;
  return s >= je ? s : e + s;
}
function Jc(t, e, s) {
  if (e < je) throw new Error("invalid exponent, negatives unsupported");
  if (s <= je) throw new Error("invalid modulus");
  if (s === Pe) return je;
  let r = Pe;
  for (; e > je; ) e & Pe && (r = r * t % s), t = t * t % s, e >>= Pe;
  return r;
}
function kt(t, e, s) {
  let r = t;
  for (; e-- > je; ) r *= r, r %= s;
  return r;
}
function Mn(t, e) {
  if (t === je) throw new Error("invert: expected non-zero number");
  if (e <= je) throw new Error("invert: expected positive modulus, got " + e);
  let s = at(t, e), r = e, i = je, n = Pe;
  for (; s !== je; ) {
    const o = r / s, a = r % s, c = i - n * o;
    r = s, s = a, i = n, n = c;
  }
  if (r !== Pe) throw new Error("invert: does not exist");
  return at(i, e);
}
function vp(t) {
  const e = (t - Pe) / Ts;
  let s, r, i;
  for (s = t - Pe, r = 0; s % Ts === je; s /= Ts, r++) ;
  for (i = Ts; i < t && Jc(i, e, t) !== t - Pe; i++) if (i > 1e3) throw new Error("Cannot find square root: likely non-prime P");
  if (r === 1) {
    const o = (t + Pe) / Fn;
    return function(a, c) {
      const l = a.pow(c, o);
      if (!a.eql(a.sqr(l), c)) throw new Error("Cannot find square root");
      return l;
    };
  }
  const n = (s + Pe) / Ts;
  return function(o, a) {
    if (o.pow(a, e) === o.neg(o.ONE)) throw new Error("Cannot find square root");
    let c = r, l = o.pow(o.mul(o.ONE, i), s), u = o.pow(a, n), d = o.pow(a, s);
    for (; !o.eql(d, o.ONE); ) {
      if (o.eql(d, o.ZERO)) return o.ZERO;
      let h = 1;
      for (let w = o.sqr(d); h < c && !o.eql(w, o.ONE); h++) w = o.sqr(w);
      const g = o.pow(l, Pe << BigInt(c - h - 1));
      l = o.sqr(g), u = o.mul(u, g), d = o.mul(d, l), c = h;
    }
    return u;
  };
}
function Ep(t) {
  if (t % Fn === bp) {
    const e = (t + Pe) / Fn;
    return function(s, r) {
      const i = s.pow(r, e);
      if (!s.eql(s.sqr(i), r)) throw new Error("Cannot find square root");
      return i;
    };
  }
  if (t % ca === aa) {
    const e = (t - aa) / ca;
    return function(s, r) {
      const i = s.mul(r, Ts), n = s.pow(i, e), o = s.mul(r, n), a = s.mul(s.mul(o, Ts), n), c = s.mul(o, s.sub(a, s.ONE));
      if (!s.eql(s.sqr(c), r)) throw new Error("Cannot find square root");
      return c;
    };
  }
  return vp(t);
}
const Cp = ["create", "isValid", "is0", "neg", "inv", "sqrt", "sqr", "eql", "add", "sub", "mul", "pow", "div", "addN", "subN", "mulN", "sqrN"];
function Ip(t) {
  const e = { ORDER: "bigint", MASK: "bigint", BYTES: "isSafeInteger", BITS: "isSafeInteger" }, s = Cp.reduce((r, i) => (r[i] = "function", r), e);
  return Pr(t, s);
}
function Np(t, e, s) {
  if (s < je) throw new Error("invalid exponent, negatives unsupported");
  if (s === je) return t.ONE;
  if (s === Pe) return e;
  let r = t.ONE, i = e;
  for (; s > je; ) s & Pe && (r = t.mul(r, i)), i = t.sqr(i), s >>= Pe;
  return r;
}
function Ap(t, e) {
  const s = new Array(e.length), r = e.reduce((n, o, a) => t.is0(o) ? n : (s[a] = n, t.mul(n, o)), t.ONE), i = t.inv(r);
  return e.reduceRight((n, o, a) => t.is0(o) ? n : (s[a] = t.mul(n, s[a]), t.mul(n, o)), i), s;
}
function Yc(t, e) {
  const s = e !== void 0 ? e : t.toString(2).length, r = Math.ceil(s / 8);
  return { nBitLength: s, nByteLength: r };
}
function Xc(t, e, s = !1, r = {}) {
  if (t <= je) throw new Error("invalid field: expected ORDER > 0, got " + t);
  const { nBitLength: i, nByteLength: n } = Yc(t, e);
  if (n > 2048) throw new Error("invalid field: expected ORDER of <= 2048 bytes");
  let o;
  const a = Object.freeze({ ORDER: t, isLE: s, BITS: i, BYTES: n, MASK: fo(i), ZERO: je, ONE: Pe, create: (c) => at(c, t), isValid: (c) => {
    if (typeof c != "bigint") throw new Error("invalid field element: expected bigint, got " + typeof c);
    return je <= c && c < t;
  }, is0: (c) => c === je, isOdd: (c) => (c & Pe) === Pe, neg: (c) => at(-c, t), eql: (c, l) => c === l, sqr: (c) => at(c * c, t), add: (c, l) => at(c + l, t), sub: (c, l) => at(c - l, t), mul: (c, l) => at(c * l, t), pow: (c, l) => Np(a, c, l), div: (c, l) => at(c * Mn(l, t), t), sqrN: (c) => c * c, addN: (c, l) => c + l, subN: (c, l) => c - l, mulN: (c, l) => c * l, inv: (c) => Mn(c, t), sqrt: r.sqrt || ((c) => (o || (o = Ep(t)), o(a, c))), invertBatch: (c) => Ap(a, c), cmov: (c, l, u) => u ? l : c, toBytes: (c) => s ? Ki(c, n) : Ir(c, n), fromBytes: (c) => {
    if (c.length !== n) throw new Error("Field.fromBytes: expected " + n + " bytes, got " + c.length);
    return s ? si(c) : Us(c);
  } });
  return Object.freeze(a);
}
function Zc(t) {
  if (typeof t != "bigint") throw new Error("field order must be bigint");
  const e = t.toString(2).length;
  return Math.ceil(e / 8);
}
function Qc(t) {
  const e = Zc(t);
  return e + Math.ceil(e / 2);
}
function _p(t, e, s = !1) {
  const r = t.length, i = Zc(e), n = Qc(e);
  if (r < 16 || r < n || r > 1024) throw new Error("expected " + n + "-1024 bytes of input, got " + r);
  const o = s ? si(t) : Us(t), a = at(o, e - Pe) + Pe;
  return s ? Ki(a, i) : Ir(a, i);
}
const la = BigInt(0), vi = BigInt(1);
function cn(t, e) {
  const s = e.negate();
  return t ? s : e;
}
function el(t, e) {
  if (!Number.isSafeInteger(t) || t <= 0 || t > e) throw new Error("invalid window size, expected [1.." + e + "], got W=" + t);
}
function ln(t, e) {
  el(t, e);
  const s = Math.ceil(e / t) + 1, r = 2 ** (t - 1);
  return { windows: s, windowSize: r };
}
function Sp(t, e) {
  if (!Array.isArray(t)) throw new Error("array expected");
  t.forEach((s, r) => {
    if (!(s instanceof e)) throw new Error("invalid point at index " + r);
  });
}
function Pp(t, e) {
  if (!Array.isArray(t)) throw new Error("array of scalars expected");
  t.forEach((s, r) => {
    if (!e.isValid(s)) throw new Error("invalid scalar at index " + r);
  });
}
const un = /* @__PURE__ */ new WeakMap(), tl = /* @__PURE__ */ new WeakMap();
function dn(t) {
  return tl.get(t) || 1;
}
function Op(t, e) {
  return { constTimeNegate: cn, hasPrecomputes(s) {
    return dn(s) !== 1;
  }, unsafeLadder(s, r, i = t.ZERO) {
    let n = s;
    for (; r > la; ) r & vi && (i = i.add(n)), n = n.double(), r >>= vi;
    return i;
  }, precomputeWindow(s, r) {
    const { windows: i, windowSize: n } = ln(r, e), o = [];
    let a = s, c = a;
    for (let l = 0; l < i; l++) {
      c = a, o.push(c);
      for (let u = 1; u < n; u++) c = c.add(a), o.push(c);
      a = c.double();
    }
    return o;
  }, wNAF(s, r, i) {
    const { windows: n, windowSize: o } = ln(s, e);
    let a = t.ZERO, c = t.BASE;
    const l = BigInt(2 ** s - 1), u = 2 ** s, d = BigInt(s);
    for (let h = 0; h < n; h++) {
      const g = h * o;
      let w = Number(i & l);
      i >>= d, w > o && (w -= u, i += vi);
      const m = g, f = g + Math.abs(w) - 1, y = h % 2 !== 0, b = w < 0;
      w === 0 ? c = c.add(cn(y, r[m])) : a = a.add(cn(b, r[f]));
    }
    return { p: a, f: c };
  }, wNAFUnsafe(s, r, i, n = t.ZERO) {
    const { windows: o, windowSize: a } = ln(s, e), c = BigInt(2 ** s - 1), l = 2 ** s, u = BigInt(s);
    for (let d = 0; d < o; d++) {
      const h = d * a;
      if (i === la) break;
      let g = Number(i & c);
      if (i >>= u, g > a && (g -= l, i += vi), g === 0) continue;
      let w = r[h + Math.abs(g) - 1];
      g < 0 && (w = w.negate()), n = n.add(w);
    }
    return n;
  }, getPrecomputes(s, r, i) {
    let n = un.get(r);
    return n || (n = this.precomputeWindow(r, s), s !== 1 && un.set(r, i(n))), n;
  }, wNAFCached(s, r, i) {
    const n = dn(s);
    return this.wNAF(n, this.getPrecomputes(n, s, i), r);
  }, wNAFCachedUnsafe(s, r, i, n) {
    const o = dn(s);
    return o === 1 ? this.unsafeLadder(s, r, n) : this.wNAFUnsafe(o, this.getPrecomputes(o, s, i), r, n);
  }, setWindowSize(s, r) {
    el(r, e), tl.set(s, r), un.delete(s);
  } };
}
function Tp(t, e, s, r) {
  if (Sp(s, t), Pp(r, e), s.length !== r.length) throw new Error("arrays of points and scalars must have equal length");
  const i = t.ZERO, n = Vc(BigInt(s.length)), o = n > 12 ? n - 3 : n > 4 ? n - 2 : n ? 2 : 1, a = (1 << o) - 1, c = new Array(a + 1).fill(i), l = Math.floor((e.BITS - 1) / o) * o;
  let u = i;
  for (let d = l; d >= 0; d -= o) {
    c.fill(i);
    for (let g = 0; g < r.length; g++) {
      const w = r[g], m = Number(w >> BigInt(d) & BigInt(a));
      c[m] = c[m].add(s[g]);
    }
    let h = i;
    for (let g = c.length - 1, w = i; g > 0; g--) w = w.add(c[g]), h = h.add(w);
    if (u = u.add(h), d !== 0) for (let g = 0; g < o; g++) u = u.double();
  }
  return u;
}
function sl(t) {
  return Ip(t.Fp), Pr(t, { n: "bigint", h: "bigint", Gx: "field", Gy: "field" }, { nBitLength: "isSafeInteger", nByteLength: "isSafeInteger" }), Object.freeze({ ...Yc(t.n, t.nBitLength), ...t, p: t.Fp.ORDER });
}
BigInt(0), BigInt(1), BigInt(2), BigInt(8);
const Hs = BigInt(0), hn = BigInt(1);
function kp(t) {
  return Pr(t, { a: "bigint" }, { montgomeryBits: "isSafeInteger", nByteLength: "isSafeInteger", adjustScalarBytes: "function", domain: "function", powPminus2: "function", Gu: "bigint" }), Object.freeze({ ...t });
}
function xp(t) {
  const e = kp(t), { P: s } = e, r = (b) => at(b, s), i = e.montgomeryBits, n = Math.ceil(i / 8), o = e.nByteLength, a = e.adjustScalarBytes || ((b) => b), c = e.powPminus2 || ((b) => Jc(b, s - BigInt(2), s));
  function l(b, E, _) {
    const x = r(b * (E - _));
    return E = r(E - x), _ = r(_ + x), [E, _];
  }
  const u = (e.a - BigInt(2)) / BigInt(4);
  function d(b, E) {
    ss("u", b, Hs, s), ss("scalar", E, Hs, s);
    const _ = E, x = b;
    let P = hn, S = Hs, D = b, v = hn, R = Hs, C;
    for (let H = BigInt(i - 1); H >= Hs; H--) {
      const I = _ >> H & hn;
      R ^= I, C = l(R, P, D), P = C[0], D = C[1], C = l(R, S, v), S = C[0], v = C[1], R = I;
      const T = P + S, A = r(T * T), M = P - S, q = r(M * M), k = A - q, G = D + v, Q = D - v, se = r(Q * T), Ee = r(G * M), he = se + Ee, Oe = se - Ee;
      D = r(he * he), v = r(x * r(Oe * Oe)), P = r(A * q), S = r(k * (A + r(u * k)));
    }
    C = l(R, P, D), P = C[0], D = C[1], C = l(R, S, v), S = C[0], v = C[1];
    const L = c(S);
    return r(P * L);
  }
  function h(b) {
    return Ki(r(b), n);
  }
  function g(b) {
    const E = pt("u coordinate", b, n);
    return o === 32 && (E[31] &= 127), si(E);
  }
  function w(b) {
    const E = pt("scalar", b), _ = E.length;
    if (_ !== n && _ !== o) {
      let x = "" + n + " or " + o;
      throw new Error("invalid scalar, expected " + x + " bytes, got " + _);
    }
    return si(a(E));
  }
  function m(b, E) {
    const _ = g(E), x = w(b), P = d(_, x);
    if (P === Hs) throw new Error("invalid private or public key received");
    return h(P);
  }
  const f = h(e.Gu);
  function y(b) {
    return m(b, f);
  }
  return { scalarMult: m, scalarMultBase: y, getSharedSecret: (b, E) => m(b, E), getPublicKey: (b) => y(b), utils: { randomPrivateKey: () => e.randomBytes(e.nByteLength) }, GuBytes: f };
}
const Bn = BigInt("57896044618658097711785492504343953926634992332820282019728792003956564819949");
BigInt(0);
const Rp = BigInt(1), ua = BigInt(2), $p = BigInt(3), Up = BigInt(5);
BigInt(8);
function Dp(t) {
  const e = BigInt(10), s = BigInt(20), r = BigInt(40), i = BigInt(80), n = Bn, o = t * t % n * t % n, a = kt(o, ua, n) * o % n, c = kt(a, Rp, n) * t % n, l = kt(c, Up, n) * c % n, u = kt(l, e, n) * l % n, d = kt(u, s, n) * u % n, h = kt(d, r, n) * d % n, g = kt(h, i, n) * h % n, w = kt(g, i, n) * h % n, m = kt(w, e, n) * l % n;
  return { pow_p_5_8: kt(m, ua, n) * t % n, b2: o };
}
function Lp(t) {
  return t[0] &= 248, t[31] &= 127, t[31] |= 64, t;
}
const qn = xp({ P: Bn, a: BigInt(486662), montgomeryBits: 255, nByteLength: 32, Gu: BigInt(9), powPminus2: (t) => {
  const e = Bn, { pow_p_5_8: s, b2: r } = Dp(t);
  return at(kt(s, $p, e) * r, e);
}, adjustScalarBytes: Lp, randomBytes: Sr });
function da(t) {
  t.lowS !== void 0 && vr("lowS", t.lowS), t.prehash !== void 0 && vr("prehash", t.prehash);
}
function Fp(t) {
  const e = sl(t);
  Pr(e, { a: "field", b: "field" }, { allowedPrivateKeyLengths: "array", wrapPrivateKey: "boolean", isTorsionFree: "function", clearCofactor: "function", allowInfinityPoint: "boolean", fromBytes: "function", toBytes: "function" });
  const { endo: s, Fp: r, a: i } = e;
  if (s) {
    if (!r.eql(i, r.ZERO)) throw new Error("invalid endomorphism, can only be defined for Koblitz curves that have a=0");
    if (typeof s != "object" || typeof s.beta != "bigint" || typeof s.splitScalar != "function") throw new Error("invalid endomorphism, expected beta: bigint and splitScalar: function");
  }
  return Object.freeze({ ...e });
}
const { bytesToNumberBE: Mp, hexToBytes: Bp } = yp;
class qp extends Error {
  constructor(e = "") {
    super(e);
  }
}
const es = { Err: qp, _tlv: { encode: (t, e) => {
  const { Err: s } = es;
  if (t < 0 || t > 256) throw new s("tlv.encode: wrong tag");
  if (e.length & 1) throw new s("tlv.encode: unpadded data");
  const r = e.length / 2, i = lr(r);
  if (i.length / 2 & 128) throw new s("tlv.encode: long form length too big");
  const n = r > 127 ? lr(i.length / 2 | 128) : "";
  return lr(t) + n + i + e;
}, decode(t, e) {
  const { Err: s } = es;
  let r = 0;
  if (t < 0 || t > 256) throw new s("tlv.encode: wrong tag");
  if (e.length < 2 || e[r++] !== t) throw new s("tlv.decode: wrong tlv");
  const i = e[r++], n = !!(i & 128);
  let o = 0;
  if (!n) o = i;
  else {
    const c = i & 127;
    if (!c) throw new s("tlv.decode(long): indefinite length not supported");
    if (c > 4) throw new s("tlv.decode(long): byte length is too big");
    const l = e.subarray(r, r + c);
    if (l.length !== c) throw new s("tlv.decode: length bytes not complete");
    if (l[0] === 0) throw new s("tlv.decode(long): zero leftmost byte");
    for (const u of l) o = o << 8 | u;
    if (r += c, o < 128) throw new s("tlv.decode(long): not minimal encoding");
  }
  const a = e.subarray(r, r + o);
  if (a.length !== o) throw new s("tlv.decode: wrong value length");
  return { v: a, l: e.subarray(r + o) };
} }, _int: { encode(t) {
  const { Err: e } = es;
  if (t < ts) throw new e("integer: negative integers are not allowed");
  let s = lr(t);
  if (Number.parseInt(s[0], 16) & 8 && (s = "00" + s), s.length & 1) throw new e("unexpected DER parsing assertion: unpadded hex");
  return s;
}, decode(t) {
  const { Err: e } = es;
  if (t[0] & 128) throw new e("invalid signature integer: negative");
  if (t[0] === 0 && !(t[1] & 128)) throw new e("invalid signature integer: unnecessary leading zero");
  return Mp(t);
} }, toSig(t) {
  const { Err: e, _int: s, _tlv: r } = es, i = typeof t == "string" ? Bp(t) : t;
  ui(i);
  const { v: n, l: o } = r.decode(48, i);
  if (o.length) throw new e("invalid signature: left bytes after parsing");
  const { v: a, l: c } = r.decode(2, n), { v: l, l: u } = r.decode(2, c);
  if (u.length) throw new e("invalid signature: left bytes after parsing");
  return { r: s.decode(a), s: s.decode(l) };
}, hexFromSig(t) {
  const { _tlv: e, _int: s } = es, r = e.encode(2, s.encode(t.r)), i = e.encode(2, s.encode(t.s)), n = r + i;
  return e.encode(48, n);
} }, ts = BigInt(0), Me = BigInt(1);
BigInt(2);
const ha = BigInt(3);
BigInt(4);
function jp(t) {
  const e = Fp(t), { Fp: s } = e, r = Xc(e.n, e.nBitLength), i = e.toBytes || ((m, f, y) => {
    const b = f.toAffine();
    return ri(Uint8Array.from([4]), s.toBytes(b.x), s.toBytes(b.y));
  }), n = e.fromBytes || ((m) => {
    const f = m.subarray(1), y = s.fromBytes(f.subarray(0, s.BYTES)), b = s.fromBytes(f.subarray(s.BYTES, 2 * s.BYTES));
    return { x: y, y: b };
  });
  function o(m) {
    const { a: f, b: y } = e, b = s.sqr(m), E = s.mul(b, m);
    return s.add(s.add(E, s.mul(m, f)), y);
  }
  if (!s.eql(s.sqr(e.Gy), o(e.Gx))) throw new Error("bad generator point: equation left != right");
  function a(m) {
    return Vi(m, Me, e.n);
  }
  function c(m) {
    const { allowedPrivateKeyLengths: f, nByteLength: y, wrapPrivateKey: b, n: E } = e;
    if (f && typeof m != "bigint") {
      if (Fs(m) && (m = Er(m)), typeof m != "string" || !f.includes(m.length)) throw new Error("invalid private key");
      m = m.padStart(y * 2, "0");
    }
    let _;
    try {
      _ = typeof m == "bigint" ? m : Us(pt("private key", m, y));
    } catch {
      throw new Error("invalid private key, expected hex or " + y + " bytes, got " + typeof m);
    }
    return b && (_ = at(_, E)), ss("private key", _, Me, E), _;
  }
  function l(m) {
    if (!(m instanceof h)) throw new Error("ProjectivePoint expected");
  }
  const u = Ln((m, f) => {
    const { px: y, py: b, pz: E } = m;
    if (s.eql(E, s.ONE)) return { x: y, y: b };
    const _ = m.is0();
    f == null && (f = _ ? s.ONE : s.inv(E));
    const x = s.mul(y, f), P = s.mul(b, f), S = s.mul(E, f);
    if (_) return { x: s.ZERO, y: s.ZERO };
    if (!s.eql(S, s.ONE)) throw new Error("invZ was invalid");
    return { x, y: P };
  }), d = Ln((m) => {
    if (m.is0()) {
      if (e.allowInfinityPoint && !s.is0(m.py)) return;
      throw new Error("bad point: ZERO");
    }
    const { x: f, y } = m.toAffine();
    if (!s.isValid(f) || !s.isValid(y)) throw new Error("bad point: x or y not FE");
    const b = s.sqr(y), E = o(f);
    if (!s.eql(b, E)) throw new Error("bad point: equation left != right");
    if (!m.isTorsionFree()) throw new Error("bad point: not in prime-order subgroup");
    return !0;
  });
  class h {
    constructor(f, y, b) {
      if (this.px = f, this.py = y, this.pz = b, f == null || !s.isValid(f)) throw new Error("x required");
      if (y == null || !s.isValid(y)) throw new Error("y required");
      if (b == null || !s.isValid(b)) throw new Error("z required");
      Object.freeze(this);
    }
    static fromAffine(f) {
      const { x: y, y: b } = f || {};
      if (!f || !s.isValid(y) || !s.isValid(b)) throw new Error("invalid affine point");
      if (f instanceof h) throw new Error("projective point not allowed");
      const E = (_) => s.eql(_, s.ZERO);
      return E(y) && E(b) ? h.ZERO : new h(y, b, s.ONE);
    }
    get x() {
      return this.toAffine().x;
    }
    get y() {
      return this.toAffine().y;
    }
    static normalizeZ(f) {
      const y = s.invertBatch(f.map((b) => b.pz));
      return f.map((b, E) => b.toAffine(y[E])).map(h.fromAffine);
    }
    static fromHex(f) {
      const y = h.fromAffine(n(pt("pointHex", f)));
      return y.assertValidity(), y;
    }
    static fromPrivateKey(f) {
      return h.BASE.multiply(c(f));
    }
    static msm(f, y) {
      return Tp(h, r, f, y);
    }
    _setWindowSize(f) {
      w.setWindowSize(this, f);
    }
    assertValidity() {
      d(this);
    }
    hasEvenY() {
      const { y: f } = this.toAffine();
      if (s.isOdd) return !s.isOdd(f);
      throw new Error("Field doesn't support isOdd");
    }
    equals(f) {
      l(f);
      const { px: y, py: b, pz: E } = this, { px: _, py: x, pz: P } = f, S = s.eql(s.mul(y, P), s.mul(_, E)), D = s.eql(s.mul(b, P), s.mul(x, E));
      return S && D;
    }
    negate() {
      return new h(this.px, s.neg(this.py), this.pz);
    }
    double() {
      const { a: f, b: y } = e, b = s.mul(y, ha), { px: E, py: _, pz: x } = this;
      let P = s.ZERO, S = s.ZERO, D = s.ZERO, v = s.mul(E, E), R = s.mul(_, _), C = s.mul(x, x), L = s.mul(E, _);
      return L = s.add(L, L), D = s.mul(E, x), D = s.add(D, D), P = s.mul(f, D), S = s.mul(b, C), S = s.add(P, S), P = s.sub(R, S), S = s.add(R, S), S = s.mul(P, S), P = s.mul(L, P), D = s.mul(b, D), C = s.mul(f, C), L = s.sub(v, C), L = s.mul(f, L), L = s.add(L, D), D = s.add(v, v), v = s.add(D, v), v = s.add(v, C), v = s.mul(v, L), S = s.add(S, v), C = s.mul(_, x), C = s.add(C, C), v = s.mul(C, L), P = s.sub(P, v), D = s.mul(C, R), D = s.add(D, D), D = s.add(D, D), new h(P, S, D);
    }
    add(f) {
      l(f);
      const { px: y, py: b, pz: E } = this, { px: _, py: x, pz: P } = f;
      let S = s.ZERO, D = s.ZERO, v = s.ZERO;
      const R = e.a, C = s.mul(e.b, ha);
      let L = s.mul(y, _), H = s.mul(b, x), I = s.mul(E, P), T = s.add(y, b), A = s.add(_, x);
      T = s.mul(T, A), A = s.add(L, H), T = s.sub(T, A), A = s.add(y, E);
      let M = s.add(_, P);
      return A = s.mul(A, M), M = s.add(L, I), A = s.sub(A, M), M = s.add(b, E), S = s.add(x, P), M = s.mul(M, S), S = s.add(H, I), M = s.sub(M, S), v = s.mul(R, A), S = s.mul(C, I), v = s.add(S, v), S = s.sub(H, v), v = s.add(H, v), D = s.mul(S, v), H = s.add(L, L), H = s.add(H, L), I = s.mul(R, I), A = s.mul(C, A), H = s.add(H, I), I = s.sub(L, I), I = s.mul(R, I), A = s.add(A, I), L = s.mul(H, A), D = s.add(D, L), L = s.mul(M, A), S = s.mul(T, S), S = s.sub(S, L), L = s.mul(T, H), v = s.mul(M, v), v = s.add(v, L), new h(S, D, v);
    }
    subtract(f) {
      return this.add(f.negate());
    }
    is0() {
      return this.equals(h.ZERO);
    }
    wNAF(f) {
      return w.wNAFCached(this, f, h.normalizeZ);
    }
    multiplyUnsafe(f) {
      const { endo: y, n: b } = e;
      ss("scalar", f, ts, b);
      const E = h.ZERO;
      if (f === ts) return E;
      if (this.is0() || f === Me) return this;
      if (!y || w.hasPrecomputes(this)) return w.wNAFCachedUnsafe(this, f, h.normalizeZ);
      let { k1neg: _, k1: x, k2neg: P, k2: S } = y.splitScalar(f), D = E, v = E, R = this;
      for (; x > ts || S > ts; ) x & Me && (D = D.add(R)), S & Me && (v = v.add(R)), R = R.double(), x >>= Me, S >>= Me;
      return _ && (D = D.negate()), P && (v = v.negate()), v = new h(s.mul(v.px, y.beta), v.py, v.pz), D.add(v);
    }
    multiply(f) {
      const { endo: y, n: b } = e;
      ss("scalar", f, Me, b);
      let E, _;
      if (y) {
        const { k1neg: x, k1: P, k2neg: S, k2: D } = y.splitScalar(f);
        let { p: v, f: R } = this.wNAF(P), { p: C, f: L } = this.wNAF(D);
        v = w.constTimeNegate(x, v), C = w.constTimeNegate(S, C), C = new h(s.mul(C.px, y.beta), C.py, C.pz), E = v.add(C), _ = R.add(L);
      } else {
        const { p: x, f: P } = this.wNAF(f);
        E = x, _ = P;
      }
      return h.normalizeZ([E, _])[0];
    }
    multiplyAndAddUnsafe(f, y, b) {
      const E = h.BASE, _ = (P, S) => S === ts || S === Me || !P.equals(E) ? P.multiplyUnsafe(S) : P.multiply(S), x = _(this, y).add(_(f, b));
      return x.is0() ? void 0 : x;
    }
    toAffine(f) {
      return u(this, f);
    }
    isTorsionFree() {
      const { h: f, isTorsionFree: y } = e;
      if (f === Me) return !0;
      if (y) return y(h, this);
      throw new Error("isTorsionFree() has not been declared for the elliptic curve");
    }
    clearCofactor() {
      const { h: f, clearCofactor: y } = e;
      return f === Me ? this : y ? y(h, this) : this.multiplyUnsafe(e.h);
    }
    toRawBytes(f = !0) {
      return vr("isCompressed", f), this.assertValidity(), i(h, this, f);
    }
    toHex(f = !0) {
      return vr("isCompressed", f), Er(this.toRawBytes(f));
    }
  }
  h.BASE = new h(e.Gx, e.Gy, s.ONE), h.ZERO = new h(s.ZERO, s.ONE, s.ZERO);
  const g = e.nBitLength, w = Op(h, e.endo ? Math.ceil(g / 2) : g);
  return { CURVE: e, ProjectivePoint: h, normPrivateKeyToScalar: c, weierstrassEquation: o, isWithinCurveOrder: a };
}
function Wp(t) {
  const e = sl(t);
  return Pr(e, { hash: "hash", hmac: "function", randomBytes: "function" }, { bits2int: "function", bits2int_modN: "function", lowS: "boolean" }), Object.freeze({ lowS: !0, ...e });
}
function zp(t) {
  const e = Wp(t), { Fp: s, n: r } = e, i = s.BYTES + 1, n = 2 * s.BYTES + 1;
  function o(I) {
    return at(I, r);
  }
  function a(I) {
    return Mn(I, r);
  }
  const { ProjectivePoint: c, normPrivateKeyToScalar: l, weierstrassEquation: u, isWithinCurveOrder: d } = jp({ ...e, toBytes(I, T, A) {
    const M = T.toAffine(), q = s.toBytes(M.x), k = ri;
    return vr("isCompressed", A), A ? k(Uint8Array.from([T.hasEvenY() ? 2 : 3]), q) : k(Uint8Array.from([4]), q, s.toBytes(M.y));
  }, fromBytes(I) {
    const T = I.length, A = I[0], M = I.subarray(1);
    if (T === i && (A === 2 || A === 3)) {
      const q = Us(M);
      if (!Vi(q, Me, s.ORDER)) throw new Error("Point is not on curve");
      const k = u(q);
      let G;
      try {
        G = s.sqrt(k);
      } catch (se) {
        const Ee = se instanceof Error ? ": " + se.message : "";
        throw new Error("Point is not on curve" + Ee);
      }
      const Q = (G & Me) === Me;
      return (A & 1) === 1 !== Q && (G = s.neg(G)), { x: q, y: G };
    } else if (T === n && A === 4) {
      const q = s.fromBytes(M.subarray(0, s.BYTES)), k = s.fromBytes(M.subarray(s.BYTES, 2 * s.BYTES));
      return { x: q, y: k };
    } else {
      const q = i, k = n;
      throw new Error("invalid Point, expected length of " + q + ", or uncompressed " + k + ", got " + T);
    }
  } }), h = (I) => Er(Ir(I, e.nByteLength));
  function g(I) {
    const T = r >> Me;
    return I > T;
  }
  function w(I) {
    return g(I) ? o(-I) : I;
  }
  const m = (I, T, A) => Us(I.slice(T, A));
  class f {
    constructor(T, A, M) {
      this.r = T, this.s = A, this.recovery = M, this.assertValidity();
    }
    static fromCompact(T) {
      const A = e.nByteLength;
      return T = pt("compactSignature", T, A * 2), new f(m(T, 0, A), m(T, A, 2 * A));
    }
    static fromDER(T) {
      const { r: A, s: M } = es.toSig(pt("DER", T));
      return new f(A, M);
    }
    assertValidity() {
      ss("r", this.r, Me, r), ss("s", this.s, Me, r);
    }
    addRecoveryBit(T) {
      return new f(this.r, this.s, T);
    }
    recoverPublicKey(T) {
      const { r: A, s: M, recovery: q } = this, k = P(pt("msgHash", T));
      if (q == null || ![0, 1, 2, 3].includes(q)) throw new Error("recovery id invalid");
      const G = q === 2 || q === 3 ? A + e.n : A;
      if (G >= s.ORDER) throw new Error("recovery id 2 or 3 invalid");
      const Q = q & 1 ? "03" : "02", se = c.fromHex(Q + h(G)), Ee = a(G), he = o(-k * Ee), Oe = o(M * Ee), De = c.BASE.multiplyAndAddUnsafe(se, he, Oe);
      if (!De) throw new Error("point at infinify");
      return De.assertValidity(), De;
    }
    hasHighS() {
      return g(this.s);
    }
    normalizeS() {
      return this.hasHighS() ? new f(this.r, o(-this.s), this.recovery) : this;
    }
    toDERRawBytes() {
      return Cr(this.toDERHex());
    }
    toDERHex() {
      return es.hexFromSig({ r: this.r, s: this.s });
    }
    toCompactRawBytes() {
      return Cr(this.toCompactHex());
    }
    toCompactHex() {
      return h(this.r) + h(this.s);
    }
  }
  const y = { isValidPrivateKey(I) {
    try {
      return l(I), !0;
    } catch {
      return !1;
    }
  }, normPrivateKeyToScalar: l, randomPrivateKey: () => {
    const I = Qc(e.n);
    return _p(e.randomBytes(I), e.n);
  }, precompute(I = 8, T = c.BASE) {
    return T._setWindowSize(I), T.multiply(BigInt(3)), T;
  } };
  function b(I, T = !0) {
    return c.fromPrivateKey(I).toRawBytes(T);
  }
  function E(I) {
    const T = Fs(I), A = typeof I == "string", M = (T || A) && I.length;
    return T ? M === i || M === n : A ? M === 2 * i || M === 2 * n : I instanceof c;
  }
  function _(I, T, A = !0) {
    if (E(I)) throw new Error("first arg must be private key");
    if (!E(T)) throw new Error("second arg must be public key");
    return c.fromHex(T).multiply(l(I)).toRawBytes(A);
  }
  const x = e.bits2int || function(I) {
    if (I.length > 8192) throw new Error("input is too large");
    const T = Us(I), A = I.length * 8 - e.nBitLength;
    return A > 0 ? T >> BigInt(A) : T;
  }, P = e.bits2int_modN || function(I) {
    return o(x(I));
  }, S = fo(e.nBitLength);
  function D(I) {
    return ss("num < 2^" + e.nBitLength, I, ts, S), Ir(I, e.nByteLength);
  }
  function v(I, T, A = R) {
    if (["recovered", "canonical"].some((xe) => xe in A)) throw new Error("sign() legacy options not supported");
    const { hash: M, randomBytes: q } = e;
    let { lowS: k, prehash: G, extraEntropy: Q } = A;
    k == null && (k = !0), I = pt("msgHash", I), da(A), G && (I = pt("prehashed msgHash", M(I)));
    const se = P(I), Ee = l(T), he = [D(Ee), D(se)];
    if (Q != null && Q !== !1) {
      const xe = Q === !0 ? q(s.BYTES) : Q;
      he.push(pt("extraEntropy", xe));
    }
    const Oe = ri(...he), De = se;
    function Ge(xe) {
      const Re = x(xe);
      if (!d(Re)) return;
      const Is = a(Re), Kt = c.BASE.multiply(Re).toAffine(), Dt = o(Kt.x);
      if (Dt === ts) return;
      const Vt = o(Is * o(De + Dt * Ee));
      if (Vt === ts) return;
      let Gt = (Kt.x === Dt ? 0 : 2) | Number(Kt.y & Me), fi = Vt;
      return k && g(Vt) && (fi = w(Vt), Gt ^= 1), new f(Dt, fi, Gt);
    }
    return { seed: Oe, k2sig: Ge };
  }
  const R = { lowS: e.lowS, prehash: !1 }, C = { lowS: e.lowS, prehash: !1 };
  function L(I, T, A = R) {
    const { seed: M, k2sig: q } = v(I, T, A), k = e;
    return Gc(k.hash.outputLen, k.nByteLength, k.hmac)(M, q);
  }
  c.BASE._setWindowSize(8);
  function H(I, T, A, M = C) {
    var Vt;
    const q = I;
    T = pt("msgHash", T), A = pt("publicKey", A);
    const { lowS: k, prehash: G, format: Q } = M;
    if (da(M), "strict" in M) throw new Error("options.strict was renamed to lowS");
    if (Q !== void 0 && Q !== "compact" && Q !== "der") throw new Error("format must be compact or der");
    const se = typeof q == "string" || Fs(q), Ee = !se && !Q && typeof q == "object" && q !== null && typeof q.r == "bigint" && typeof q.s == "bigint";
    if (!se && !Ee) throw new Error("invalid signature, expected Uint8Array, hex string or Signature instance");
    let he, Oe;
    try {
      if (Ee && (he = new f(q.r, q.s)), se) {
        try {
          Q !== "compact" && (he = f.fromDER(q));
        } catch (Gt) {
          if (!(Gt instanceof es.Err)) throw Gt;
        }
        !he && Q !== "der" && (he = f.fromCompact(q));
      }
      Oe = c.fromHex(A);
    } catch {
      return !1;
    }
    if (!he || k && he.hasHighS()) return !1;
    G && (T = e.hash(T));
    const { r: De, s: Ge } = he, xe = P(T), Re = a(Ge), Is = o(xe * Re), Kt = o(De * Re), Dt = (Vt = c.BASE.multiplyAndAddUnsafe(Oe, Is, Kt)) == null ? void 0 : Vt.toAffine();
    return Dt ? o(Dt.x) === De : !1;
  }
  return { CURVE: e, getPublicKey: b, getSharedSecret: _, sign: L, verify: H, ProjectivePoint: c, Signature: f, utils: y };
}
function Hp(t) {
  return { hash: t, hmac: (e, ...s) => Wi(t, e, Jd(...s)), randomBytes: Sr };
}
function Kp(t, e) {
  const s = (r) => zp({ ...t, ...Hp(r) });
  return { ...s(e), create: s };
}
const rl = Xc(BigInt("0xffffffff00000001000000000000000000000000ffffffffffffffffffffffff")), Vp = rl.create(BigInt("-3")), Gp = BigInt("0x5ac635d8aa3a93e7b3ebbd55769886bc651d06b0cc53b0f63bce3c3e27d2604b"), Jp = Kp({ a: Vp, b: Gp, Fp: rl, n: BigInt("0xffffffff00000000ffffffffffffffffbce6faada7179e84f3b9cac2fc632551"), Gx: BigInt("0x6b17d1f2e12c4247f8bce6e563a440f277037d812deb33a0f4a13945d898c296"), Gy: BigInt("0x4fe342e2fe1a7f9b8ee7eb4a7c0f9e162bce33576b315ececbb6406837bf51f5"), h: BigInt(1), lowS: !1 }, li), il = "base10", Qe = "base16", $t = "base64pad", ps = "base64url", di = "utf8", nl = 0, rs = 1, hi = 2, Yp = 0, pa = 1, Gr = 12, mo = 32;
function Xp() {
  const t = qn.utils.randomPrivateKey(), e = qn.getPublicKey(t);
  return { privateKey: ct(t, Qe), publicKey: ct(e, Qe) };
}
function jn() {
  const t = Sr(mo);
  return ct(t, Qe);
}
function Zp(t, e) {
  const s = qn.getSharedSecret(Nt(t, Qe), Nt(e, Qe)), r = sp(li, s, void 0, void 0, mo);
  return ct(r, Qe);
}
function Ti(t) {
  const e = li(Nt(t, Qe));
  return ct(e, Qe);
}
function Wt(t) {
  const e = li(Nt(t, di));
  return ct(e, Qe);
}
function ol(t) {
  return Nt(`${t}`, il);
}
function Ms(t) {
  return Number(ct(t, il));
}
function al(t) {
  return t.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}
function cl(t) {
  const e = t.replace(/-/g, "+").replace(/_/g, "/"), s = (4 - e.length % 4) % 4;
  return e + "=".repeat(s);
}
function Qp(t) {
  const e = ol(typeof t.type < "u" ? t.type : nl);
  if (Ms(e) === rs && typeof t.senderPublicKey > "u") throw new Error("Missing sender public key for type 1 envelope");
  const s = typeof t.senderPublicKey < "u" ? Nt(t.senderPublicKey, Qe) : void 0, r = typeof t.iv < "u" ? Nt(t.iv, Qe) : Sr(Gr), i = Nt(t.symKey, Qe), n = Hc(i, r).encrypt(Nt(t.message, di)), o = ll({ type: e, sealed: n, iv: r, senderPublicKey: s });
  return t.encoding === ps ? al(o) : o;
}
function eg(t) {
  const e = Nt(t.symKey, Qe), { sealed: s, iv: r } = ii({ encoded: t.encoded, encoding: t.encoding }), i = Hc(e, r).decrypt(s);
  if (i === null) throw new Error("Failed to decrypt");
  return ct(i, di);
}
function tg(t, e) {
  const s = ol(hi), r = Sr(Gr), i = Nt(t, di), n = ll({ type: s, sealed: i, iv: r });
  return e === ps ? al(n) : n;
}
function sg(t, e) {
  const { sealed: s } = ii({ encoded: t, encoding: e });
  return ct(s, di);
}
function ll(t) {
  if (Ms(t.type) === hi) return ct(zr([t.type, t.sealed]), $t);
  if (Ms(t.type) === rs) {
    if (typeof t.senderPublicKey > "u") throw new Error("Missing sender public key for type 1 envelope");
    return ct(zr([t.type, t.senderPublicKey, t.iv, t.sealed]), $t);
  }
  return ct(zr([t.type, t.iv, t.sealed]), $t);
}
function ii(t) {
  const e = (t.encoding || $t) === ps ? cl(t.encoded) : t.encoded, s = Nt(e, $t), r = s.slice(Yp, pa), i = pa;
  if (Ms(r) === rs) {
    const c = i + mo, l = c + Gr, u = s.slice(i, c), d = s.slice(c, l), h = s.slice(l);
    return { type: r, sealed: h, iv: d, senderPublicKey: u };
  }
  if (Ms(r) === hi) {
    const c = s.slice(i), l = Sr(Gr);
    return { type: r, sealed: c, iv: l };
  }
  const n = i + Gr, o = s.slice(i, n), a = s.slice(n);
  return { type: r, sealed: a, iv: o };
}
function rg(t, e) {
  const s = ii({ encoded: t, encoding: e == null ? void 0 : e.encoding });
  return ul({ type: Ms(s.type), senderPublicKey: typeof s.senderPublicKey < "u" ? ct(s.senderPublicKey, Qe) : void 0, receiverPublicKey: e == null ? void 0 : e.receiverPublicKey });
}
function ul(t) {
  const e = (t == null ? void 0 : t.type) || nl;
  if (e === rs) {
    if (typeof (t == null ? void 0 : t.senderPublicKey) > "u") throw new Error("missing sender public key");
    if (typeof (t == null ? void 0 : t.receiverPublicKey) > "u") throw new Error("missing receiver public key");
  }
  return { type: e, senderPublicKey: t == null ? void 0 : t.senderPublicKey, receiverPublicKey: t == null ? void 0 : t.receiverPublicKey };
}
function ga(t) {
  return t.type === rs && typeof t.senderPublicKey == "string" && typeof t.receiverPublicKey == "string";
}
function fa(t) {
  return t.type === hi;
}
function ig(t) {
  const e = Buffer.from(t.x, "base64"), s = Buffer.from(t.y, "base64");
  return zr([new Uint8Array([4]), e, s]);
}
function ng(t, e) {
  const [s, r, i] = t.split("."), n = Buffer.from(cl(i), "base64");
  if (n.length !== 64) throw new Error("Invalid signature length");
  const o = n.slice(0, 32), a = n.slice(32, 64), c = `${s}.${r}`, l = li(c), u = ig(e);
  if (!Jp.verify(zr([o, a]), l, u)) throw new Error("Invalid signature");
  return _n(t).payload;
}
const og = "irn";
function Fi(t) {
  return (t == null ? void 0 : t.relay) || { protocol: og };
}
function qr(t) {
  const e = Kl[t];
  if (typeof e > "u") throw new Error(`Relay Protocol not supported: ${t}`);
  return e;
}
function ag(t, e = "-") {
  const s = {}, r = "relay" + e;
  return Object.keys(t).forEach((i) => {
    if (i.startsWith(r)) {
      const n = i.replace(r, ""), o = t[i];
      s[n] = o;
    }
  }), s;
}
function ma(t) {
  if (!t.includes("wc:")) {
    const l = xc(t);
    l != null && l.includes("wc:") && (t = l);
  }
  t = t.includes("wc://") ? t.replace("wc://", "") : t, t = t.includes("wc:") ? t.replace("wc:", "") : t;
  const e = t.indexOf(":"), s = t.indexOf("?") !== -1 ? t.indexOf("?") : void 0, r = t.substring(0, e), i = t.substring(e + 1, s).split("@"), n = typeof s < "u" ? t.substring(s) : "", o = new URLSearchParams(n), a = {};
  o.forEach((l, u) => {
    a[u] = l;
  });
  const c = typeof a.methods == "string" ? a.methods.split(",") : void 0;
  return { protocol: r, topic: cg(i[0]), version: parseInt(i[1], 10), symKey: a.symKey, relay: ag(a), methods: c, expiryTimestamp: a.expiryTimestamp ? parseInt(a.expiryTimestamp, 10) : void 0 };
}
function cg(t) {
  return t.startsWith("//") ? t.substring(2) : t;
}
function lg(t, e = "-") {
  const s = "relay", r = {};
  return Object.keys(t).forEach((i) => {
    const n = i, o = s + e + n;
    t[n] && (r[o] = t[n]);
  }), r;
}
function wa(t) {
  const e = new URLSearchParams(), s = lg(t.relay);
  Object.keys(s).sort().forEach((i) => {
    e.set(i, s[i]);
  }), e.set("symKey", t.symKey), t.expiryTimestamp && e.set("expiryTimestamp", t.expiryTimestamp.toString()), t.methods && e.set("methods", t.methods.join(","));
  const r = e.toString();
  return `${t.protocol}:${t.topic}@${t.version}?${r}`;
}
function Ei(t, e, s) {
  return `${t}?wc_ev=${s}&topic=${e}`;
}
var ug = Object.defineProperty, dg = Object.defineProperties, hg = Object.getOwnPropertyDescriptors, ya = Object.getOwnPropertySymbols, pg = Object.prototype.hasOwnProperty, gg = Object.prototype.propertyIsEnumerable, ba = (t, e, s) => e in t ? ug(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s, fg = (t, e) => {
  for (var s in e || (e = {})) pg.call(e, s) && ba(t, s, e[s]);
  if (ya) for (var s of ya(e)) gg.call(e, s) && ba(t, s, e[s]);
  return t;
}, mg = (t, e) => dg(t, hg(e));
function Or(t) {
  const e = [];
  return t.forEach((s) => {
    const [r, i] = s.split(":");
    e.push(`${r}:${i}`);
  }), e;
}
function wg(t) {
  const e = [];
  return Object.values(t).forEach((s) => {
    e.push(...Or(s.accounts));
  }), e;
}
function yg(t, e) {
  const s = [];
  return Object.values(t).forEach((r) => {
    Or(r.accounts).includes(e) && s.push(...r.methods);
  }), s;
}
function bg(t, e) {
  const s = [];
  return Object.values(t).forEach((r) => {
    Or(r.accounts).includes(e) && s.push(...r.events);
  }), s;
}
function Gi(t) {
  return t.includes(":");
}
function ur(t) {
  return Gi(t) ? t.split(":")[0] : t;
}
function va(t) {
  var e, s, r;
  const i = {};
  if (!bs(t)) return i;
  for (const [n, o] of Object.entries(t)) {
    const a = Gi(n) ? [n] : o.chains, c = o.methods || [], l = o.events || [], u = ur(n);
    i[u] = mg(fg({}, i[u]), { chains: zt(a, (e = i[u]) == null ? void 0 : e.chains), methods: zt(c, (s = i[u]) == null ? void 0 : s.methods), events: zt(l, (r = i[u]) == null ? void 0 : r.events) });
  }
  return i;
}
function vg(t) {
  const e = {};
  return t == null || t.forEach((s) => {
    var r;
    const [i, n] = s.split(":");
    e[i] || (e[i] = { accounts: [], chains: [], events: [], methods: [] }), e[i].accounts.push(s), (r = e[i].chains) == null || r.push(`${i}:${n}`);
  }), e;
}
function Ea(t, e) {
  e = e.map((r) => r.replace("did:pkh:", ""));
  const s = vg(e);
  for (const [r, i] of Object.entries(s)) i.methods ? i.methods = zt(i.methods, t) : i.methods = t, i.events = ["chainChanged", "accountsChanged"];
  return s;
}
function Eg(t, e) {
  var s, r, i, n, o, a;
  const c = va(t), l = va(e), u = {}, d = Object.keys(c).concat(Object.keys(l));
  for (const h of d) u[h] = { chains: zt((s = c[h]) == null ? void 0 : s.chains, (r = l[h]) == null ? void 0 : r.chains), methods: zt((i = c[h]) == null ? void 0 : i.methods, (n = l[h]) == null ? void 0 : n.methods), events: zt((o = c[h]) == null ? void 0 : o.events, (a = l[h]) == null ? void 0 : a.events) };
  return u;
}
const Cg = { INVALID_METHOD: { message: "Invalid method.", code: 1001 }, INVALID_EVENT: { message: "Invalid event.", code: 1002 }, INVALID_UPDATE_REQUEST: { message: "Invalid update request.", code: 1003 }, INVALID_EXTEND_REQUEST: { message: "Invalid extend request.", code: 1004 }, INVALID_SESSION_SETTLE_REQUEST: { message: "Invalid session settle request.", code: 1005 }, UNAUTHORIZED_METHOD: { message: "Unauthorized method.", code: 3001 }, UNAUTHORIZED_EVENT: { message: "Unauthorized event.", code: 3002 }, UNAUTHORIZED_UPDATE_REQUEST: { message: "Unauthorized update request.", code: 3003 }, UNAUTHORIZED_EXTEND_REQUEST: { message: "Unauthorized extend request.", code: 3004 }, USER_REJECTED: { message: "User rejected.", code: 5e3 }, USER_REJECTED_CHAINS: { message: "User rejected chains.", code: 5001 }, USER_REJECTED_METHODS: { message: "User rejected methods.", code: 5002 }, USER_REJECTED_EVENTS: { message: "User rejected events.", code: 5003 }, UNSUPPORTED_CHAINS: { message: "Unsupported chains.", code: 5100 }, UNSUPPORTED_METHODS: { message: "Unsupported methods.", code: 5101 }, UNSUPPORTED_EVENTS: { message: "Unsupported events.", code: 5102 }, UNSUPPORTED_ACCOUNTS: { message: "Unsupported accounts.", code: 5103 }, UNSUPPORTED_NAMESPACE_KEY: { message: "Unsupported namespace key.", code: 5104 }, USER_DISCONNECTED: { message: "User disconnected.", code: 6e3 }, SESSION_SETTLEMENT_FAILED: { message: "Session settlement failed.", code: 7e3 }, WC_METHOD_UNSUPPORTED: { message: "Unsupported wc_ method.", code: 10001 } }, Ig = { NOT_INITIALIZED: { message: "Not initialized.", code: 1 }, NO_MATCHING_KEY: { message: "No matching key.", code: 2 }, RESTORE_WILL_OVERRIDE: { message: "Restore will override.", code: 3 }, RESUBSCRIBED: { message: "Resubscribed.", code: 4 }, MISSING_OR_INVALID: { message: "Missing or invalid.", code: 5 }, EXPIRED: { message: "Expired.", code: 6 }, UNKNOWN_TYPE: { message: "Unknown type.", code: 7 }, MISMATCHED_TOPIC: { message: "Mismatched topic.", code: 8 }, NON_CONFORMING_NAMESPACES: { message: "Non conforming namespaces.", code: 9 } };
function $(t, e) {
  const { message: s, code: r } = Ig[t];
  return { message: e ? `${s} ${e}` : s, code: r };
}
function me(t, e) {
  const { message: s, code: r } = Cg[t];
  return { message: e ? `${s} ${e}` : s, code: r };
}
function ys(t, e) {
  return !!Array.isArray(t);
}
function bs(t) {
  return Object.getPrototypeOf(t) === Object.prototype && Object.keys(t).length;
}
function Ke(t) {
  return typeof t > "u";
}
function ke(t, e) {
  return e && Ke(t) ? !0 : typeof t == "string" && !!t.trim().length;
}
function wo(t, e) {
  return e && Ke(t) ? !0 : typeof t == "number" && !isNaN(t);
}
function Ng(t, e) {
  const { requiredNamespaces: s } = e, r = Object.keys(t.namespaces), i = Object.keys(s);
  let n = !0;
  return $s(i, r) ? (r.forEach((o) => {
    const { accounts: a, methods: c, events: l } = t.namespaces[o], u = Or(a), d = s[o];
    (!$s(Sc(o, d), u) || !$s(d.methods, c) || !$s(d.events, l)) && (n = !1);
  }), n) : !1;
}
function Mi(t) {
  return ke(t, !1) && t.includes(":") ? t.split(":").length === 2 : !1;
}
function Ag(t) {
  if (ke(t, !1) && t.includes(":")) {
    const e = t.split(":");
    if (e.length === 3) {
      const s = e[0] + ":" + e[1];
      return !!e[2] && Mi(s);
    }
  }
  return !1;
}
function _g(t) {
  function e(s) {
    try {
      return typeof new URL(s) < "u";
    } catch {
      return !1;
    }
  }
  try {
    if (ke(t, !1)) {
      if (e(t)) return !0;
      const s = xc(t);
      return e(s);
    }
  } catch {
  }
  return !1;
}
function Sg(t) {
  var e;
  return (e = t == null ? void 0 : t.proposer) == null ? void 0 : e.publicKey;
}
function Pg(t) {
  return t == null ? void 0 : t.topic;
}
function Og(t, e) {
  let s = null;
  return ke(t == null ? void 0 : t.publicKey, !1) || (s = $("MISSING_OR_INVALID", `${e} controller public key should be a string`)), s;
}
function Ca(t) {
  let e = !0;
  return ys(t) ? t.length && (e = t.every((s) => ke(s, !1))) : e = !1, e;
}
function Tg(t, e, s) {
  let r = null;
  return ys(e) && e.length ? e.forEach((i) => {
    r || Mi(i) || (r = me("UNSUPPORTED_CHAINS", `${s}, chain ${i} should be a string and conform to "namespace:chainId" format`));
  }) : Mi(t) || (r = me("UNSUPPORTED_CHAINS", `${s}, chains must be defined as "namespace:chainId" e.g. "eip155:1": {...} in the namespace key OR as an array of CAIP-2 chainIds e.g. eip155: { chains: ["eip155:1", "eip155:5"] }`)), r;
}
function kg(t, e, s) {
  let r = null;
  return Object.entries(t).forEach(([i, n]) => {
    if (r) return;
    const o = Tg(i, Sc(i, n), `${e} ${s}`);
    o && (r = o);
  }), r;
}
function xg(t, e) {
  let s = null;
  return ys(t) ? t.forEach((r) => {
    s || Ag(r) || (s = me("UNSUPPORTED_ACCOUNTS", `${e}, account ${r} should be a string and conform to "namespace:chainId:address" format`));
  }) : s = me("UNSUPPORTED_ACCOUNTS", `${e}, accounts should be an array of strings conforming to "namespace:chainId:address" format`), s;
}
function Rg(t, e) {
  let s = null;
  return Object.values(t).forEach((r) => {
    if (s) return;
    const i = xg(r == null ? void 0 : r.accounts, `${e} namespace`);
    i && (s = i);
  }), s;
}
function $g(t, e) {
  let s = null;
  return Ca(t == null ? void 0 : t.methods) ? Ca(t == null ? void 0 : t.events) || (s = me("UNSUPPORTED_EVENTS", `${e}, events should be an array of strings or empty array for no events`)) : s = me("UNSUPPORTED_METHODS", `${e}, methods should be an array of strings or empty array for no methods`), s;
}
function dl(t, e) {
  let s = null;
  return Object.values(t).forEach((r) => {
    if (s) return;
    const i = $g(r, `${e}, namespace`);
    i && (s = i);
  }), s;
}
function Ug(t, e, s) {
  let r = null;
  if (t && bs(t)) {
    const i = dl(t, e);
    i && (r = i);
    const n = kg(t, e, s);
    n && (r = n);
  } else r = $("MISSING_OR_INVALID", `${e}, ${s} should be an object with data`);
  return r;
}
function pn(t, e) {
  let s = null;
  if (t && bs(t)) {
    const r = dl(t, e);
    r && (s = r);
    const i = Rg(t, e);
    i && (s = i);
  } else s = $("MISSING_OR_INVALID", `${e}, namespaces should be an object with data`);
  return s;
}
function hl(t) {
  return ke(t.protocol, !0);
}
function Dg(t, e) {
  let s = !1;
  return t ? t && ys(t) && t.length && t.forEach((r) => {
    s = hl(r);
  }) : s = !0, s;
}
function Lg(t) {
  return typeof t == "number";
}
function ot(t) {
  return typeof t < "u" && typeof t !== null;
}
function Fg(t) {
  return !(!t || typeof t != "object" || !t.code || !wo(t.code, !1) || !t.message || !ke(t.message, !1));
}
function Mg(t) {
  return !(Ke(t) || !ke(t.method, !1));
}
function Bg(t) {
  return !(Ke(t) || Ke(t.result) && Ke(t.error) || !wo(t.id, !1) || !ke(t.jsonrpc, !1));
}
function qg(t) {
  return !(Ke(t) || !ke(t.name, !1));
}
function Ia(t, e) {
  return !(!Mi(e) || !wg(t).includes(e));
}
function jg(t, e, s) {
  return ke(s, !1) ? yg(t, e).includes(s) : !1;
}
function Wg(t, e, s) {
  return ke(s, !1) ? bg(t, e).includes(s) : !1;
}
function Na(t, e, s) {
  let r = null;
  const i = zg(t), n = Hg(e), o = Object.keys(i), a = Object.keys(n), c = Aa(Object.keys(t)), l = Aa(Object.keys(e)), u = c.filter((d) => !l.includes(d));
  return u.length && (r = $("NON_CONFORMING_NAMESPACES", `${s} namespaces keys don't satisfy requiredNamespaces.
      Required: ${u.toString()}
      Received: ${Object.keys(e).toString()}`)), $s(o, a) || (r = $("NON_CONFORMING_NAMESPACES", `${s} namespaces chains don't satisfy required namespaces.
      Required: ${o.toString()}
      Approved: ${a.toString()}`)), Object.keys(e).forEach((d) => {
    if (!d.includes(":") || r) return;
    const h = Or(e[d].accounts);
    h.includes(d) || (r = $("NON_CONFORMING_NAMESPACES", `${s} namespaces accounts don't satisfy namespace accounts for ${d}
        Required: ${d}
        Approved: ${h.toString()}`));
  }), o.forEach((d) => {
    r || ($s(i[d].methods, n[d].methods) ? $s(i[d].events, n[d].events) || (r = $("NON_CONFORMING_NAMESPACES", `${s} namespaces events don't satisfy namespace events for ${d}`)) : r = $("NON_CONFORMING_NAMESPACES", `${s} namespaces methods don't satisfy namespace methods for ${d}`));
  }), r;
}
function zg(t) {
  const e = {};
  return Object.keys(t).forEach((s) => {
    var r;
    s.includes(":") ? e[s] = t[s] : (r = t[s].chains) == null || r.forEach((i) => {
      e[i] = { methods: t[s].methods, events: t[s].events };
    });
  }), e;
}
function Aa(t) {
  return [...new Set(t.map((e) => e.includes(":") ? e.split(":")[0] : e))];
}
function Hg(t) {
  const e = {};
  return Object.keys(t).forEach((s) => {
    if (s.includes(":")) e[s] = t[s];
    else {
      const r = Or(t[s].accounts);
      r == null || r.forEach((i) => {
        e[i] = { accounts: t[s].accounts.filter((n) => n.includes(`${i}:`)), methods: t[s].methods, events: t[s].events };
      });
    }
  }), e;
}
function Kg(t, e) {
  return wo(t, !1) && t <= e.max && t >= e.min;
}
function _a() {
  const t = ai();
  return new Promise((e) => {
    switch (t) {
      case ft.browser:
        e(Vg());
        break;
      case ft.reactNative:
        e(Gg());
        break;
      case ft.node:
        e(Jg());
        break;
      default:
        e(!0);
    }
  });
}
function Vg() {
  return _r() && (navigator == null ? void 0 : navigator.onLine);
}
async function Gg() {
  if (Cs() && typeof global < "u" && global != null && global.NetInfo) {
    const t = await (global == null ? void 0 : global.NetInfo.fetch());
    return t == null ? void 0 : t.isConnected;
  }
  return !0;
}
function Jg() {
  return !0;
}
function Yg(t) {
  switch (ai()) {
    case ft.browser:
      Xg(t);
      break;
    case ft.reactNative:
      Zg(t);
      break;
  }
}
function Xg(t) {
  !Cs() && _r() && (window.addEventListener("online", () => t(!0)), window.addEventListener("offline", () => t(!1)));
}
function Zg(t) {
  Cs() && typeof global < "u" && global != null && global.NetInfo && (global == null || global.NetInfo.addEventListener((e) => t(e == null ? void 0 : e.isConnected)));
}
function Qg() {
  var t;
  return _r() && fr() ? ((t = fr()) == null ? void 0 : t.visibilityState) === "visible" : !0;
}
const gn = {};
class Rr {
  static get(e) {
    return gn[e];
  }
  static set(e, s) {
    gn[e] = s;
  }
  static delete(e) {
    delete gn[e];
  }
}
const pl = "wc", gl = 2, Wn = "core", Ht = `${pl}@2:${Wn}:`, ef = { logger: "error" }, tf = { database: ":memory:" }, sf = "crypto", Sa = "client_ed25519_seed", rf = U.ONE_DAY, nf = "keychain", of = "0.3", af = "messages", cf = "0.3", Pa = U.SIX_HOURS, lf = "publisher", fl = "irn", uf = "error", ml = "wss://relay.walletconnect.org", df = "relayer", Be = { message: "relayer_message", message_ack: "relayer_message_ack", connect: "relayer_connect", disconnect: "relayer_disconnect", error: "relayer_error", connection_stalled: "relayer_connection_stalled", transport_closed: "relayer_transport_closed", publish: "relayer_publish" }, hf = "_subscription", Et = { payload: "payload", connect: "connect", disconnect: "disconnect", error: "error" }, pf = 0.1, zn = "2.21.0", Ne = { link_mode: "link_mode", relay: "relay" }, ki = { inbound: "inbound", outbound: "outbound" }, gf = "0.3", ff = "WALLETCONNECT_CLIENT_ID", Oa = "WALLETCONNECT_LINK_MODE_APPS", dt = { created: "subscription_created", deleted: "subscription_deleted", expired: "subscription_expired", disabled: "subscription_disabled", sync: "subscription_sync", resubscribed: "subscription_resubscribed" }, mf = "subscription", wf = "0.3", yf = "pairing", bf = "0.3", $r = { wc_pairingDelete: { req: { ttl: U.ONE_DAY, prompt: !1, tag: 1e3 }, res: { ttl: U.ONE_DAY, prompt: !1, tag: 1001 } }, wc_pairingPing: { req: { ttl: U.THIRTY_SECONDS, prompt: !1, tag: 1002 }, res: { ttl: U.THIRTY_SECONDS, prompt: !1, tag: 1003 } }, unregistered_method: { req: { ttl: U.ONE_DAY, prompt: !1, tag: 0 }, res: { ttl: U.ONE_DAY, prompt: !1, tag: 0 } } }, ks = { create: "pairing_create", expire: "pairing_expire", delete: "pairing_delete", ping: "pairing_ping" }, Pt = { created: "history_created", updated: "history_updated", deleted: "history_deleted", sync: "history_sync" }, vf = "history", Ef = "0.3", Cf = "expirer", It = { created: "expirer_created", deleted: "expirer_deleted", expired: "expirer_expired", sync: "expirer_sync" }, If = "0.3", Nf = "verify-api", Af = "https://verify.walletconnect.com", wl = "https://verify.walletconnect.org", Jr = wl, _f = `${Jr}/v3`, Sf = [Af, wl], Pf = "echo", Of = "https://echo.walletconnect.com", Bt = { pairing_started: "pairing_started", pairing_uri_validation_success: "pairing_uri_validation_success", pairing_uri_not_expired: "pairing_uri_not_expired", store_new_pairing: "store_new_pairing", subscribing_pairing_topic: "subscribing_pairing_topic", subscribe_pairing_topic_success: "subscribe_pairing_topic_success", existing_pairing: "existing_pairing", pairing_not_expired: "pairing_not_expired", emit_inactive_pairing: "emit_inactive_pairing", emit_session_proposal: "emit_session_proposal", subscribing_to_pairing_topic: "subscribing_to_pairing_topic" }, Qt = { no_wss_connection: "no_wss_connection", no_internet_connection: "no_internet_connection", malformed_pairing_uri: "malformed_pairing_uri", active_pairing_already_exists: "active_pairing_already_exists", subscribe_pairing_topic_failure: "subscribe_pairing_topic_failure", pairing_expired: "pairing_expired", proposal_expired: "proposal_expired", proposal_listener_not_found: "proposal_listener_not_found" }, Ot = { session_approve_started: "session_approve_started", proposal_not_expired: "proposal_not_expired", session_namespaces_validation_success: "session_namespaces_validation_success", create_session_topic: "create_session_topic", subscribing_session_topic: "subscribing_session_topic", subscribe_session_topic_success: "subscribe_session_topic_success", publishing_session_approve: "publishing_session_approve", session_approve_publish_success: "session_approve_publish_success", store_session: "store_session", publishing_session_settle: "publishing_session_settle", session_settle_publish_success: "session_settle_publish_success" }, As = { no_internet_connection: "no_internet_connection", no_wss_connection: "no_wss_connection", proposal_expired: "proposal_expired", subscribe_session_topic_failure: "subscribe_session_topic_failure", session_approve_publish_failure: "session_approve_publish_failure", session_settle_publish_failure: "session_settle_publish_failure", session_approve_namespace_validation_failure: "session_approve_namespace_validation_failure", proposal_not_found: "proposal_not_found" }, _s = { authenticated_session_approve_started: "authenticated_session_approve_started", create_authenticated_session_topic: "create_authenticated_session_topic", cacaos_verified: "cacaos_verified", store_authenticated_session: "store_authenticated_session", subscribing_authenticated_session_topic: "subscribing_authenticated_session_topic", subscribe_authenticated_session_topic_success: "subscribe_authenticated_session_topic_success", publishing_authenticated_session_approve: "publishing_authenticated_session_approve" }, Ur = { no_internet_connection: "no_internet_connection", invalid_cacao: "invalid_cacao", subscribe_authenticated_session_topic_failure: "subscribe_authenticated_session_topic_failure", authenticated_session_approve_publish_failure: "authenticated_session_approve_publish_failure", authenticated_session_pending_request_not_found: "authenticated_session_pending_request_not_found" }, Tf = 0.1, kf = "event-client", xf = 86400, Rf = "https://pulse.walletconnect.org/batch";
function $f(t, e) {
  if (t.length >= 255) throw new TypeError("Alphabet too long");
  for (var s = new Uint8Array(256), r = 0; r < s.length; r++) s[r] = 255;
  for (var i = 0; i < t.length; i++) {
    var n = t.charAt(i), o = n.charCodeAt(0);
    if (s[o] !== 255) throw new TypeError(n + " is ambiguous");
    s[o] = i;
  }
  var a = t.length, c = t.charAt(0), l = Math.log(a) / Math.log(256), u = Math.log(256) / Math.log(a);
  function d(w) {
    if (w instanceof Uint8Array || (ArrayBuffer.isView(w) ? w = new Uint8Array(w.buffer, w.byteOffset, w.byteLength) : Array.isArray(w) && (w = Uint8Array.from(w))), !(w instanceof Uint8Array)) throw new TypeError("Expected Uint8Array");
    if (w.length === 0) return "";
    for (var m = 0, f = 0, y = 0, b = w.length; y !== b && w[y] === 0; ) y++, m++;
    for (var E = (b - y) * u + 1 >>> 0, _ = new Uint8Array(E); y !== b; ) {
      for (var x = w[y], P = 0, S = E - 1; (x !== 0 || P < f) && S !== -1; S--, P++) x += 256 * _[S] >>> 0, _[S] = x % a >>> 0, x = x / a >>> 0;
      if (x !== 0) throw new Error("Non-zero carry");
      f = P, y++;
    }
    for (var D = E - f; D !== E && _[D] === 0; ) D++;
    for (var v = c.repeat(m); D < E; ++D) v += t.charAt(_[D]);
    return v;
  }
  function h(w) {
    if (typeof w != "string") throw new TypeError("Expected String");
    if (w.length === 0) return new Uint8Array();
    var m = 0;
    if (w[m] !== " ") {
      for (var f = 0, y = 0; w[m] === c; ) f++, m++;
      for (var b = (w.length - m) * l + 1 >>> 0, E = new Uint8Array(b); w[m]; ) {
        var _ = s[w.charCodeAt(m)];
        if (_ === 255) return;
        for (var x = 0, P = b - 1; (_ !== 0 || x < y) && P !== -1; P--, x++) _ += a * E[P] >>> 0, E[P] = _ % 256 >>> 0, _ = _ / 256 >>> 0;
        if (_ !== 0) throw new Error("Non-zero carry");
        y = x, m++;
      }
      if (w[m] !== " ") {
        for (var S = b - y; S !== b && E[S] === 0; ) S++;
        for (var D = new Uint8Array(f + (b - S)), v = f; S !== b; ) D[v++] = E[S++];
        return D;
      }
    }
  }
  function g(w) {
    var m = h(w);
    if (m) return m;
    throw new Error(`Non-${e} character`);
  }
  return { encode: d, decodeUnsafe: h, decode: g };
}
var Uf = $f, Df = Uf;
const yl = (t) => {
  if (t instanceof Uint8Array && t.constructor.name === "Uint8Array") return t;
  if (t instanceof ArrayBuffer) return new Uint8Array(t);
  if (ArrayBuffer.isView(t)) return new Uint8Array(t.buffer, t.byteOffset, t.byteLength);
  throw new Error("Unknown type, must be binary type");
}, Lf = (t) => new TextEncoder().encode(t), Ff = (t) => new TextDecoder().decode(t);
class Mf {
  constructor(e, s, r) {
    this.name = e, this.prefix = s, this.baseEncode = r;
  }
  encode(e) {
    if (e instanceof Uint8Array) return `${this.prefix}${this.baseEncode(e)}`;
    throw Error("Unknown type, must be binary type");
  }
}
class Bf {
  constructor(e, s, r) {
    if (this.name = e, this.prefix = s, s.codePointAt(0) === void 0) throw new Error("Invalid prefix character");
    this.prefixCodePoint = s.codePointAt(0), this.baseDecode = r;
  }
  decode(e) {
    if (typeof e == "string") {
      if (e.codePointAt(0) !== this.prefixCodePoint) throw Error(`Unable to decode multibase string ${JSON.stringify(e)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
      return this.baseDecode(e.slice(this.prefix.length));
    } else throw Error("Can only multibase decode strings");
  }
  or(e) {
    return bl(this, e);
  }
}
class qf {
  constructor(e) {
    this.decoders = e;
  }
  or(e) {
    return bl(this, e);
  }
  decode(e) {
    const s = e[0], r = this.decoders[s];
    if (r) return r.decode(e);
    throw RangeError(`Unable to decode multibase string ${JSON.stringify(e)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
  }
}
const bl = (t, e) => new qf({ ...t.decoders || { [t.prefix]: t }, ...e.decoders || { [e.prefix]: e } });
class jf {
  constructor(e, s, r, i) {
    this.name = e, this.prefix = s, this.baseEncode = r, this.baseDecode = i, this.encoder = new Mf(e, s, r), this.decoder = new Bf(e, s, i);
  }
  encode(e) {
    return this.encoder.encode(e);
  }
  decode(e) {
    return this.decoder.decode(e);
  }
}
const Ji = ({ name: t, prefix: e, encode: s, decode: r }) => new jf(t, e, s, r), pi = ({ prefix: t, name: e, alphabet: s }) => {
  const { encode: r, decode: i } = Df(s, e);
  return Ji({ prefix: t, name: e, encode: r, decode: (n) => yl(i(n)) });
}, Wf = (t, e, s, r) => {
  const i = {};
  for (let u = 0; u < e.length; ++u) i[e[u]] = u;
  let n = t.length;
  for (; t[n - 1] === "="; ) --n;
  const o = new Uint8Array(n * s / 8 | 0);
  let a = 0, c = 0, l = 0;
  for (let u = 0; u < n; ++u) {
    const d = i[t[u]];
    if (d === void 0) throw new SyntaxError(`Non-${r} character`);
    c = c << s | d, a += s, a >= 8 && (a -= 8, o[l++] = 255 & c >> a);
  }
  if (a >= s || 255 & c << 8 - a) throw new SyntaxError("Unexpected end of data");
  return o;
}, zf = (t, e, s) => {
  const r = e[e.length - 1] === "=", i = (1 << s) - 1;
  let n = "", o = 0, a = 0;
  for (let c = 0; c < t.length; ++c) for (a = a << 8 | t[c], o += 8; o > s; ) o -= s, n += e[i & a >> o];
  if (o && (n += e[i & a << s - o]), r) for (; n.length * s & 7; ) n += "=";
  return n;
}, Ve = ({ name: t, prefix: e, bitsPerChar: s, alphabet: r }) => Ji({ prefix: e, name: t, encode(i) {
  return zf(i, r, s);
}, decode(i) {
  return Wf(i, r, s, t);
} }), Hf = Ji({ prefix: "\0", name: "identity", encode: (t) => Ff(t), decode: (t) => Lf(t) });
var Kf = Object.freeze({ __proto__: null, identity: Hf });
const Vf = Ve({ prefix: "0", name: "base2", alphabet: "01", bitsPerChar: 1 });
var Gf = Object.freeze({ __proto__: null, base2: Vf });
const Jf = Ve({ prefix: "7", name: "base8", alphabet: "01234567", bitsPerChar: 3 });
var Yf = Object.freeze({ __proto__: null, base8: Jf });
const Xf = pi({ prefix: "9", name: "base10", alphabet: "0123456789" });
var Zf = Object.freeze({ __proto__: null, base10: Xf });
const Qf = Ve({ prefix: "f", name: "base16", alphabet: "0123456789abcdef", bitsPerChar: 4 }), em = Ve({ prefix: "F", name: "base16upper", alphabet: "0123456789ABCDEF", bitsPerChar: 4 });
var tm = Object.freeze({ __proto__: null, base16: Qf, base16upper: em });
const sm = Ve({ prefix: "b", name: "base32", alphabet: "abcdefghijklmnopqrstuvwxyz234567", bitsPerChar: 5 }), rm = Ve({ prefix: "B", name: "base32upper", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567", bitsPerChar: 5 }), im = Ve({ prefix: "c", name: "base32pad", alphabet: "abcdefghijklmnopqrstuvwxyz234567=", bitsPerChar: 5 }), nm = Ve({ prefix: "C", name: "base32padupper", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=", bitsPerChar: 5 }), om = Ve({ prefix: "v", name: "base32hex", alphabet: "0123456789abcdefghijklmnopqrstuv", bitsPerChar: 5 }), am = Ve({ prefix: "V", name: "base32hexupper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV", bitsPerChar: 5 }), cm = Ve({ prefix: "t", name: "base32hexpad", alphabet: "0123456789abcdefghijklmnopqrstuv=", bitsPerChar: 5 }), lm = Ve({ prefix: "T", name: "base32hexpadupper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=", bitsPerChar: 5 }), um = Ve({ prefix: "h", name: "base32z", alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769", bitsPerChar: 5 });
var dm = Object.freeze({ __proto__: null, base32: sm, base32upper: rm, base32pad: im, base32padupper: nm, base32hex: om, base32hexupper: am, base32hexpad: cm, base32hexpadupper: lm, base32z: um });
const hm = pi({ prefix: "k", name: "base36", alphabet: "0123456789abcdefghijklmnopqrstuvwxyz" }), pm = pi({ prefix: "K", name: "base36upper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ" });
var gm = Object.freeze({ __proto__: null, base36: hm, base36upper: pm });
const fm = pi({ name: "base58btc", prefix: "z", alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz" }), mm = pi({ name: "base58flickr", prefix: "Z", alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ" });
var wm = Object.freeze({ __proto__: null, base58btc: fm, base58flickr: mm });
const ym = Ve({ prefix: "m", name: "base64", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", bitsPerChar: 6 }), bm = Ve({ prefix: "M", name: "base64pad", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", bitsPerChar: 6 }), vm = Ve({ prefix: "u", name: "base64url", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_", bitsPerChar: 6 }), Em = Ve({ prefix: "U", name: "base64urlpad", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=", bitsPerChar: 6 });
var Cm = Object.freeze({ __proto__: null, base64: ym, base64pad: bm, base64url: vm, base64urlpad: Em });
const vl = Array.from("🚀🪐☄🛰🌌🌑🌒🌓🌔🌕🌖🌗🌘🌍🌏🌎🐉☀💻🖥💾💿😂❤😍🤣😊🙏💕😭😘👍😅👏😁🔥🥰💔💖💙😢🤔😆🙄💪😉☺👌🤗💜😔😎😇🌹🤦🎉💞✌✨🤷😱😌🌸🙌😋💗💚😏💛🙂💓🤩😄😀🖤😃💯🙈👇🎶😒🤭❣😜💋👀😪😑💥🙋😞😩😡🤪👊🥳😥🤤👉💃😳✋😚😝😴🌟😬🙃🍀🌷😻😓⭐✅🥺🌈😈🤘💦✔😣🏃💐☹🎊💘😠☝😕🌺🎂🌻😐🖕💝🙊😹🗣💫💀👑🎵🤞😛🔴😤🌼😫⚽🤙☕🏆🤫👈😮🙆🍻🍃🐶💁😲🌿🧡🎁⚡🌞🎈❌✊👋😰🤨😶🤝🚶💰🍓💢🤟🙁🚨💨🤬✈🎀🍺🤓😙💟🌱😖👶🥴▶➡❓💎💸⬇😨🌚🦋😷🕺⚠🙅😟😵👎🤲🤠🤧📌🔵💅🧐🐾🍒😗🤑🌊🤯🐷☎💧😯💆👆🎤🙇🍑❄🌴💣🐸💌📍🥀🤢👅💡💩👐📸👻🤐🤮🎼🥵🚩🍎🍊👼💍📣🥂"), Im = vl.reduce((t, e, s) => (t[s] = e, t), []), Nm = vl.reduce((t, e, s) => (t[e.codePointAt(0)] = s, t), []);
function Am(t) {
  return t.reduce((e, s) => (e += Im[s], e), "");
}
function _m(t) {
  const e = [];
  for (const s of t) {
    const r = Nm[s.codePointAt(0)];
    if (r === void 0) throw new Error(`Non-base256emoji character: ${s}`);
    e.push(r);
  }
  return new Uint8Array(e);
}
const Sm = Ji({ prefix: "🚀", name: "base256emoji", encode: Am, decode: _m });
var Pm = Object.freeze({ __proto__: null, base256emoji: Sm }), Om = El, Ta = 128, Tm = -128, km = Math.pow(2, 31);
function El(t, e, s) {
  e = e || [], s = s || 0;
  for (var r = s; t >= km; ) e[s++] = t & 255 | Ta, t /= 128;
  for (; t & Tm; ) e[s++] = t & 255 | Ta, t >>>= 7;
  return e[s] = t | 0, El.bytes = s - r + 1, e;
}
var xm = Hn, Rm = 128, ka = 127;
function Hn(t, r) {
  var s = 0, r = r || 0, i = 0, n = r, o, a = t.length;
  do {
    if (n >= a) throw Hn.bytes = 0, new RangeError("Could not decode varint");
    o = t[n++], s += i < 28 ? (o & ka) << i : (o & ka) * Math.pow(2, i), i += 7;
  } while (o >= Rm);
  return Hn.bytes = n - r, s;
}
var $m = Math.pow(2, 7), Um = Math.pow(2, 14), Dm = Math.pow(2, 21), Lm = Math.pow(2, 28), Fm = Math.pow(2, 35), Mm = Math.pow(2, 42), Bm = Math.pow(2, 49), qm = Math.pow(2, 56), jm = Math.pow(2, 63), Wm = function(t) {
  return t < $m ? 1 : t < Um ? 2 : t < Dm ? 3 : t < Lm ? 4 : t < Fm ? 5 : t < Mm ? 6 : t < Bm ? 7 : t < qm ? 8 : t < jm ? 9 : 10;
}, zm = { encode: Om, decode: xm, encodingLength: Wm }, Cl = zm;
const xa = (t, e, s = 0) => (Cl.encode(t, e, s), e), Ra = (t) => Cl.encodingLength(t), Kn = (t, e) => {
  const s = e.byteLength, r = Ra(t), i = r + Ra(s), n = new Uint8Array(i + s);
  return xa(t, n, 0), xa(s, n, r), n.set(e, i), new Hm(t, s, e, n);
};
class Hm {
  constructor(e, s, r, i) {
    this.code = e, this.size = s, this.digest = r, this.bytes = i;
  }
}
const Il = ({ name: t, code: e, encode: s }) => new Km(t, e, s);
class Km {
  constructor(e, s, r) {
    this.name = e, this.code = s, this.encode = r;
  }
  digest(e) {
    if (e instanceof Uint8Array) {
      const s = this.encode(e);
      return s instanceof Uint8Array ? Kn(this.code, s) : s.then((r) => Kn(this.code, r));
    } else throw Error("Unknown type, must be binary type");
  }
}
const Nl = (t) => async (e) => new Uint8Array(await crypto.subtle.digest(t, e)), Vm = Il({ name: "sha2-256", code: 18, encode: Nl("SHA-256") }), Gm = Il({ name: "sha2-512", code: 19, encode: Nl("SHA-512") });
var Jm = Object.freeze({ __proto__: null, sha256: Vm, sha512: Gm });
const Al = 0, Ym = "identity", _l = yl, Xm = (t) => Kn(Al, _l(t)), Zm = { code: Al, name: Ym, encode: _l, digest: Xm };
var Qm = Object.freeze({ __proto__: null, identity: Zm });
new TextEncoder(), new TextDecoder();
const $a = { ...Kf, ...Gf, ...Yf, ...Zf, ...tm, ...dm, ...gm, ...wm, ...Cm, ...Pm };
({ ...Jm, ...Qm });
function ew(t = 0) {
  return globalThis.Buffer != null && globalThis.Buffer.allocUnsafe != null ? globalThis.Buffer.allocUnsafe(t) : new Uint8Array(t);
}
function Sl(t, e, s, r) {
  return { name: t, prefix: e, encoder: { name: t, prefix: e, encode: s }, decoder: { decode: r } };
}
const Ua = Sl("utf8", "u", (t) => "u" + new TextDecoder("utf8").decode(t), (t) => new TextEncoder().encode(t.substring(1))), fn = Sl("ascii", "a", (t) => {
  let e = "a";
  for (let s = 0; s < t.length; s++) e += String.fromCharCode(t[s]);
  return e;
}, (t) => {
  t = t.substring(1);
  const e = ew(t.length);
  for (let s = 0; s < t.length; s++) e[s] = t.charCodeAt(s);
  return e;
}), tw = { utf8: Ua, "utf-8": Ua, hex: $a.base16, latin1: fn, ascii: fn, binary: fn, ...$a };
function sw(t, e = "utf8") {
  const s = tw[e];
  if (!s) throw new Error(`Unsupported encoding "${e}"`);
  return (e === "utf8" || e === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null ? globalThis.Buffer.from(t, "utf8") : s.decoder.decode(`${s.prefix}${t}`);
}
var rw = Object.defineProperty, iw = (t, e, s) => e in t ? rw(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s, Ft = (t, e, s) => iw(t, typeof e != "symbol" ? e + "" : e, s);
class nw {
  constructor(e, s) {
    this.core = e, this.logger = s, Ft(this, "keychain", /* @__PURE__ */ new Map()), Ft(this, "name", nf), Ft(this, "version", of), Ft(this, "initialized", !1), Ft(this, "storagePrefix", Ht), Ft(this, "init", async () => {
      if (!this.initialized) {
        const r = await this.getKeyChain();
        typeof r < "u" && (this.keychain = r), this.initialized = !0;
      }
    }), Ft(this, "has", (r) => (this.isInitialized(), this.keychain.has(r))), Ft(this, "set", async (r, i) => {
      this.isInitialized(), this.keychain.set(r, i), await this.persist();
    }), Ft(this, "get", (r) => {
      this.isInitialized();
      const i = this.keychain.get(r);
      if (typeof i > "u") {
        const { message: n } = $("NO_MATCHING_KEY", `${this.name}: ${r}`);
        throw new Error(n);
      }
      return i;
    }), Ft(this, "del", async (r) => {
      this.isInitialized(), this.keychain.delete(r), await this.persist();
    }), this.core = e, this.logger = et(s, this.name);
  }
  get context() {
    return wt(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  async setKeyChain(e) {
    await this.core.storage.setItem(this.storageKey, kn(e));
  }
  async getKeyChain() {
    const e = await this.core.storage.getItem(this.storageKey);
    return typeof e < "u" ? xn(e) : void 0;
  }
  async persist() {
    await this.setKeyChain(this.keychain);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = $("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
}
var ow = Object.defineProperty, aw = (t, e, s) => e in t ? ow(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s, ze = (t, e, s) => aw(t, typeof e != "symbol" ? e + "" : e, s);
class cw {
  constructor(e, s, r) {
    this.core = e, this.logger = s, ze(this, "name", sf), ze(this, "keychain"), ze(this, "randomSessionIdentifier", jn()), ze(this, "initialized", !1), ze(this, "init", async () => {
      this.initialized || (await this.keychain.init(), this.initialized = !0);
    }), ze(this, "hasKeys", (i) => (this.isInitialized(), this.keychain.has(i))), ze(this, "getClientId", async () => {
      this.isInitialized();
      const i = await this.getClientSeed(), n = Io(i);
      return Zl(n.publicKey);
    }), ze(this, "generateKeyPair", () => {
      this.isInitialized();
      const i = Xp();
      return this.setPrivateKey(i.publicKey, i.privateKey);
    }), ze(this, "signJWT", async (i) => {
      this.isInitialized();
      const n = await this.getClientSeed(), o = Io(n), a = this.randomSessionIdentifier;
      return await Ql(a, i, rf, o);
    }), ze(this, "generateSharedKey", (i, n, o) => {
      this.isInitialized();
      const a = this.getPrivateKey(i), c = Zp(a, n);
      return this.setSymKey(c, o);
    }), ze(this, "setSymKey", async (i, n) => {
      this.isInitialized();
      const o = n || Ti(i);
      return await this.keychain.set(o, i), o;
    }), ze(this, "deleteKeyPair", async (i) => {
      this.isInitialized(), await this.keychain.del(i);
    }), ze(this, "deleteSymKey", async (i) => {
      this.isInitialized(), await this.keychain.del(i);
    }), ze(this, "encode", async (i, n, o) => {
      this.isInitialized();
      const a = ul(o), c = eu(n);
      if (fa(a)) return tg(c, o == null ? void 0 : o.encoding);
      if (ga(a)) {
        const h = a.senderPublicKey, g = a.receiverPublicKey;
        i = await this.generateSharedKey(h, g);
      }
      const l = this.getSymKey(i), { type: u, senderPublicKey: d } = a;
      return Qp({ type: u, symKey: l, message: c, senderPublicKey: d, encoding: o == null ? void 0 : o.encoding });
    }), ze(this, "decode", async (i, n, o) => {
      this.isInitialized();
      const a = rg(n, o);
      if (fa(a)) {
        const c = sg(n, o == null ? void 0 : o.encoding);
        return No(c);
      }
      if (ga(a)) {
        const c = a.receiverPublicKey, l = a.senderPublicKey;
        i = await this.generateSharedKey(c, l);
      }
      try {
        const c = this.getSymKey(i), l = eg({ symKey: c, encoded: n, encoding: o == null ? void 0 : o.encoding });
        return No(l);
      } catch (c) {
        this.logger.error(`Failed to decode message from topic: '${i}', clientId: '${await this.getClientId()}'`), this.logger.error(c);
      }
    }), ze(this, "getPayloadType", (i, n = $t) => {
      const o = ii({ encoded: i, encoding: n });
      return Ms(o.type);
    }), ze(this, "getPayloadSenderPublicKey", (i, n = $t) => {
      const o = ii({ encoded: i, encoding: n });
      return o.senderPublicKey ? ct(o.senderPublicKey, Qe) : void 0;
    }), this.core = e, this.logger = et(s, this.name), this.keychain = r || new nw(this.core, this.logger);
  }
  get context() {
    return wt(this.logger);
  }
  async setPrivateKey(e, s) {
    return await this.keychain.set(e, s), e;
  }
  getPrivateKey(e) {
    return this.keychain.get(e);
  }
  async getClientSeed() {
    let e = "";
    try {
      e = this.keychain.get(Sa);
    } catch {
      e = jn(), await this.keychain.set(Sa, e);
    }
    return sw(e, "base16");
  }
  getSymKey(e) {
    return this.keychain.get(e);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = $("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
}
var lw = Object.defineProperty, uw = Object.defineProperties, dw = Object.getOwnPropertyDescriptors, Da = Object.getOwnPropertySymbols, hw = Object.prototype.hasOwnProperty, pw = Object.prototype.propertyIsEnumerable, Vn = (t, e, s) => e in t ? lw(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s, gw = (t, e) => {
  for (var s in e || (e = {})) hw.call(e, s) && Vn(t, s, e[s]);
  if (Da) for (var s of Da(e)) pw.call(e, s) && Vn(t, s, e[s]);
  return t;
}, fw = (t, e) => uw(t, dw(e)), ut = (t, e, s) => Vn(t, typeof e != "symbol" ? e + "" : e, s);
class mw extends ed {
  constructor(e, s) {
    super(e, s), this.logger = e, this.core = s, ut(this, "messages", /* @__PURE__ */ new Map()), ut(this, "messagesWithoutClientAck", /* @__PURE__ */ new Map()), ut(this, "name", af), ut(this, "version", cf), ut(this, "initialized", !1), ut(this, "storagePrefix", Ht), ut(this, "init", async () => {
      if (!this.initialized) {
        this.logger.trace("Initialized");
        try {
          const r = await this.getRelayerMessages();
          typeof r < "u" && (this.messages = r);
          const i = await this.getRelayerMessagesWithoutClientAck();
          typeof i < "u" && (this.messagesWithoutClientAck = i), this.logger.debug(`Successfully Restored records for ${this.name}`), this.logger.trace({ type: "method", method: "restore", size: this.messages.size });
        } catch (r) {
          this.logger.debug(`Failed to Restore records for ${this.name}`), this.logger.error(r);
        } finally {
          this.initialized = !0;
        }
      }
    }), ut(this, "set", async (r, i, n) => {
      this.isInitialized();
      const o = Wt(i);
      let a = this.messages.get(r);
      if (typeof a > "u" && (a = {}), typeof a[o] < "u") return o;
      if (a[o] = i, this.messages.set(r, a), n === ki.inbound) {
        const c = this.messagesWithoutClientAck.get(r) || {};
        this.messagesWithoutClientAck.set(r, fw(gw({}, c), { [o]: i }));
      }
      return await this.persist(), o;
    }), ut(this, "get", (r) => {
      this.isInitialized();
      let i = this.messages.get(r);
      return typeof i > "u" && (i = {}), i;
    }), ut(this, "getWithoutAck", (r) => {
      this.isInitialized();
      const i = {};
      for (const n of r) {
        const o = this.messagesWithoutClientAck.get(n) || {};
        i[n] = Object.values(o);
      }
      return i;
    }), ut(this, "has", (r, i) => {
      this.isInitialized();
      const n = this.get(r), o = Wt(i);
      return typeof n[o] < "u";
    }), ut(this, "ack", async (r, i) => {
      this.isInitialized();
      const n = this.messagesWithoutClientAck.get(r);
      if (typeof n > "u") return;
      const o = Wt(i);
      delete n[o], Object.keys(n).length === 0 ? this.messagesWithoutClientAck.delete(r) : this.messagesWithoutClientAck.set(r, n), await this.persist();
    }), ut(this, "del", async (r) => {
      this.isInitialized(), this.messages.delete(r), this.messagesWithoutClientAck.delete(r), await this.persist();
    }), this.logger = et(e, this.name), this.core = s;
  }
  get context() {
    return wt(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  get storageKeyWithoutClientAck() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name + "_withoutClientAck";
  }
  async setRelayerMessages(e) {
    await this.core.storage.setItem(this.storageKey, kn(e));
  }
  async setRelayerMessagesWithoutClientAck(e) {
    await this.core.storage.setItem(this.storageKeyWithoutClientAck, kn(e));
  }
  async getRelayerMessages() {
    const e = await this.core.storage.getItem(this.storageKey);
    return typeof e < "u" ? xn(e) : void 0;
  }
  async getRelayerMessagesWithoutClientAck() {
    const e = await this.core.storage.getItem(this.storageKeyWithoutClientAck);
    return typeof e < "u" ? xn(e) : void 0;
  }
  async persist() {
    await this.setRelayerMessages(this.messages), await this.setRelayerMessagesWithoutClientAck(this.messagesWithoutClientAck);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = $("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
}
var ww = Object.defineProperty, yw = Object.defineProperties, bw = Object.getOwnPropertyDescriptors, La = Object.getOwnPropertySymbols, vw = Object.prototype.hasOwnProperty, Ew = Object.prototype.propertyIsEnumerable, Gn = (t, e, s) => e in t ? ww(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s, Ci = (t, e) => {
  for (var s in e || (e = {})) vw.call(e, s) && Gn(t, s, e[s]);
  if (La) for (var s of La(e)) Ew.call(e, s) && Gn(t, s, e[s]);
  return t;
}, mn = (t, e) => yw(t, bw(e)), Tt = (t, e, s) => Gn(t, typeof e != "symbol" ? e + "" : e, s);
class Cw extends td {
  constructor(e, s) {
    super(e, s), this.relayer = e, this.logger = s, Tt(this, "events", new Bs.EventEmitter()), Tt(this, "name", lf), Tt(this, "queue", /* @__PURE__ */ new Map()), Tt(this, "publishTimeout", U.toMiliseconds(U.ONE_MINUTE)), Tt(this, "initialPublishTimeout", U.toMiliseconds(U.ONE_SECOND * 15)), Tt(this, "needsTransportRestart", !1), Tt(this, "publish", async (r, i, n) => {
      var o;
      this.logger.debug("Publishing Payload"), this.logger.trace({ type: "method", method: "publish", params: { topic: r, message: i, opts: n } });
      const a = (n == null ? void 0 : n.ttl) || Pa, c = Fi(n), l = (n == null ? void 0 : n.prompt) || !1, u = (n == null ? void 0 : n.tag) || 0, d = (n == null ? void 0 : n.id) || cr().toString(), h = { topic: r, message: i, opts: { ttl: a, relay: c, prompt: l, tag: u, id: d, attestation: n == null ? void 0 : n.attestation, tvf: n == null ? void 0 : n.tvf } }, g = `Failed to publish payload, please try again. id:${d} tag:${u}`;
      try {
        const w = new Promise(async (m) => {
          const f = ({ id: b }) => {
            h.opts.id === b && (this.removeRequestFromQueue(b), this.relayer.events.removeListener(Be.publish, f), m(h));
          };
          this.relayer.events.on(Be.publish, f);
          const y = fs(new Promise((b, E) => {
            this.rpcPublish({ topic: r, message: i, ttl: a, prompt: l, tag: u, id: d, attestation: n == null ? void 0 : n.attestation, tvf: n == null ? void 0 : n.tvf }).then(b).catch((_) => {
              this.logger.warn(_, _ == null ? void 0 : _.message), E(_);
            });
          }), this.initialPublishTimeout, `Failed initial publish, retrying.... id:${d} tag:${u}`);
          try {
            await y, this.events.removeListener(Be.publish, f);
          } catch (b) {
            this.queue.set(d, mn(Ci({}, h), { attempt: 1 })), this.logger.warn(b, b == null ? void 0 : b.message);
          }
        });
        this.logger.trace({ type: "method", method: "publish", params: { id: d, topic: r, message: i, opts: n } }), await fs(w, this.publishTimeout, g);
      } catch (w) {
        if (this.logger.debug("Failed to Publish Payload"), this.logger.error(w), (o = n == null ? void 0 : n.internal) != null && o.throwOnFailedPublish) throw w;
      } finally {
        this.queue.delete(d);
      }
    }), Tt(this, "on", (r, i) => {
      this.events.on(r, i);
    }), Tt(this, "once", (r, i) => {
      this.events.once(r, i);
    }), Tt(this, "off", (r, i) => {
      this.events.off(r, i);
    }), Tt(this, "removeListener", (r, i) => {
      this.events.removeListener(r, i);
    }), this.relayer = e, this.logger = et(s, this.name), this.registerEventListeners();
  }
  get context() {
    return wt(this.logger);
  }
  async rpcPublish(e) {
    var s, r, i, n;
    const { topic: o, message: a, ttl: c = Pa, prompt: l, tag: u, id: d, attestation: h, tvf: g } = e, w = { method: qr(Fi().protocol).publish, params: Ci({ topic: o, message: a, ttl: c, prompt: l, tag: u, attestation: h }, g), id: d };
    Ke((s = w.params) == null ? void 0 : s.prompt) && ((r = w.params) == null || delete r.prompt), Ke((i = w.params) == null ? void 0 : i.tag) && ((n = w.params) == null || delete n.tag), this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "message", direction: "outgoing", request: w });
    const m = await this.relayer.request(w);
    return this.relayer.events.emit(Be.publish, e), this.logger.debug("Successfully Published Payload"), m;
  }
  removeRequestFromQueue(e) {
    this.queue.delete(e);
  }
  checkQueue() {
    this.queue.forEach(async (e, s) => {
      const r = e.attempt + 1;
      this.queue.set(s, mn(Ci({}, e), { attempt: r }));
      const { topic: i, message: n, opts: o, attestation: a } = e;
      this.logger.warn({}, `Publisher: queue->publishing: ${e.opts.id}, tag: ${e.opts.tag}, attempt: ${r}`), await this.rpcPublish(mn(Ci({}, e), { topic: i, message: n, ttl: o.ttl, prompt: o.prompt, tag: o.tag, id: o.id, attestation: a, tvf: o.tvf })), this.logger.warn({}, `Publisher: queue->published: ${e.opts.id}`);
    });
  }
  registerEventListeners() {
    this.relayer.core.heartbeat.on(Ar.pulse, () => {
      if (this.needsTransportRestart) {
        this.needsTransportRestart = !1, this.relayer.events.emit(Be.connection_stalled);
        return;
      }
      this.checkQueue();
    }), this.relayer.on(Be.message_ack, (e) => {
      this.removeRequestFromQueue(e.id.toString());
    });
  }
}
var Iw = Object.defineProperty, Nw = (t, e, s) => e in t ? Iw(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s, Ks = (t, e, s) => Nw(t, typeof e != "symbol" ? e + "" : e, s);
class Aw {
  constructor() {
    Ks(this, "map", /* @__PURE__ */ new Map()), Ks(this, "set", (e, s) => {
      const r = this.get(e);
      this.exists(e, s) || this.map.set(e, [...r, s]);
    }), Ks(this, "get", (e) => this.map.get(e) || []), Ks(this, "exists", (e, s) => this.get(e).includes(s)), Ks(this, "delete", (e, s) => {
      if (typeof s > "u") {
        this.map.delete(e);
        return;
      }
      if (!this.map.has(e)) return;
      const r = this.get(e);
      if (!this.exists(e, s)) return;
      const i = r.filter((n) => n !== s);
      if (!i.length) {
        this.map.delete(e);
        return;
      }
      this.map.set(e, i);
    }), Ks(this, "clear", () => {
      this.map.clear();
    });
  }
  get topics() {
    return Array.from(this.map.keys());
  }
}
var _w = Object.defineProperty, Sw = Object.defineProperties, Pw = Object.getOwnPropertyDescriptors, Fa = Object.getOwnPropertySymbols, Ow = Object.prototype.hasOwnProperty, Tw = Object.prototype.propertyIsEnumerable, Jn = (t, e, s) => e in t ? _w(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s, Dr = (t, e) => {
  for (var s in e || (e = {})) Ow.call(e, s) && Jn(t, s, e[s]);
  if (Fa) for (var s of Fa(e)) Tw.call(e, s) && Jn(t, s, e[s]);
  return t;
}, wn = (t, e) => Sw(t, Pw(e)), ye = (t, e, s) => Jn(t, typeof e != "symbol" ? e + "" : e, s);
class kw extends id {
  constructor(e, s) {
    super(e, s), this.relayer = e, this.logger = s, ye(this, "subscriptions", /* @__PURE__ */ new Map()), ye(this, "topicMap", new Aw()), ye(this, "events", new Bs.EventEmitter()), ye(this, "name", mf), ye(this, "version", wf), ye(this, "pending", /* @__PURE__ */ new Map()), ye(this, "cached", []), ye(this, "initialized", !1), ye(this, "storagePrefix", Ht), ye(this, "subscribeTimeout", U.toMiliseconds(U.ONE_MINUTE)), ye(this, "initialSubscribeTimeout", U.toMiliseconds(U.ONE_SECOND * 15)), ye(this, "clientId"), ye(this, "batchSubscribeTopicsLimit", 500), ye(this, "init", async () => {
      this.initialized || (this.logger.trace("Initialized"), this.registerEventListeners(), await this.restore()), this.initialized = !0;
    }), ye(this, "subscribe", async (r, i) => {
      this.isInitialized(), this.logger.debug("Subscribing Topic"), this.logger.trace({ type: "method", method: "subscribe", params: { topic: r, opts: i } });
      try {
        const n = Fi(i), o = { topic: r, relay: n, transportType: i == null ? void 0 : i.transportType };
        this.pending.set(r, o);
        const a = await this.rpcSubscribe(r, n, i);
        return typeof a == "string" && (this.onSubscribe(a, o), this.logger.debug("Successfully Subscribed Topic"), this.logger.trace({ type: "method", method: "subscribe", params: { topic: r, opts: i } })), a;
      } catch (n) {
        throw this.logger.debug("Failed to Subscribe Topic"), this.logger.error(n), n;
      }
    }), ye(this, "unsubscribe", async (r, i) => {
      this.isInitialized(), typeof (i == null ? void 0 : i.id) < "u" ? await this.unsubscribeById(r, i.id, i) : await this.unsubscribeByTopic(r, i);
    }), ye(this, "isSubscribed", (r) => new Promise((i) => {
      i(this.topicMap.topics.includes(r));
    })), ye(this, "isKnownTopic", (r) => new Promise((i) => {
      i(this.topicMap.topics.includes(r) || this.pending.has(r) || this.cached.some((n) => n.topic === r));
    })), ye(this, "on", (r, i) => {
      this.events.on(r, i);
    }), ye(this, "once", (r, i) => {
      this.events.once(r, i);
    }), ye(this, "off", (r, i) => {
      this.events.off(r, i);
    }), ye(this, "removeListener", (r, i) => {
      this.events.removeListener(r, i);
    }), ye(this, "start", async () => {
      await this.onConnect();
    }), ye(this, "stop", async () => {
      await this.onDisconnect();
    }), ye(this, "restart", async () => {
      await this.restore(), await this.onRestart();
    }), ye(this, "checkPending", async () => {
      if (this.pending.size === 0 && (!this.initialized || !this.relayer.connected)) return;
      const r = [];
      this.pending.forEach((i) => {
        r.push(i);
      }), await this.batchSubscribe(r);
    }), ye(this, "registerEventListeners", () => {
      this.relayer.core.heartbeat.on(Ar.pulse, async () => {
        await this.checkPending();
      }), this.events.on(dt.created, async (r) => {
        const i = dt.created;
        this.logger.info(`Emitting ${i}`), this.logger.debug({ type: "event", event: i, data: r }), await this.persist();
      }), this.events.on(dt.deleted, async (r) => {
        const i = dt.deleted;
        this.logger.info(`Emitting ${i}`), this.logger.debug({ type: "event", event: i, data: r }), await this.persist();
      });
    }), this.relayer = e, this.logger = et(s, this.name), this.clientId = "";
  }
  get context() {
    return wt(this.logger);
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
  hasSubscription(e, s) {
    let r = !1;
    try {
      r = this.getSubscription(e).topic === s;
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
  async unsubscribeByTopic(e, s) {
    const r = this.topicMap.get(e);
    await Promise.all(r.map(async (i) => await this.unsubscribeById(e, i, s)));
  }
  async unsubscribeById(e, s, r) {
    this.logger.debug("Unsubscribing Topic"), this.logger.trace({ type: "method", method: "unsubscribe", params: { topic: e, id: s, opts: r } });
    try {
      const i = Fi(r);
      await this.restartToComplete({ topic: e, id: s, relay: i }), await this.rpcUnsubscribe(e, s, i);
      const n = me("USER_DISCONNECTED", `${this.name}, ${e}`);
      await this.onUnsubscribe(e, s, n), this.logger.debug("Successfully Unsubscribed Topic"), this.logger.trace({ type: "method", method: "unsubscribe", params: { topic: e, id: s, opts: r } });
    } catch (i) {
      throw this.logger.debug("Failed to Unsubscribe Topic"), this.logger.error(i), i;
    }
  }
  async rpcSubscribe(e, s, r) {
    var i;
    (!r || (r == null ? void 0 : r.transportType) === Ne.relay) && await this.restartToComplete({ topic: e, id: e, relay: s });
    const n = { method: qr(s.protocol).subscribe, params: { topic: e } };
    this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "payload", direction: "outgoing", request: n });
    const o = (i = r == null ? void 0 : r.internal) == null ? void 0 : i.throwOnFailedPublish;
    try {
      const a = await this.getSubscriptionId(e);
      if ((r == null ? void 0 : r.transportType) === Ne.link_mode) return setTimeout(() => {
        (this.relayer.connected || this.relayer.connecting) && this.relayer.request(n).catch((u) => this.logger.warn(u));
      }, U.toMiliseconds(U.ONE_SECOND)), a;
      const c = new Promise(async (u) => {
        const d = (h) => {
          h.topic === e && (this.events.removeListener(dt.created, d), u(h.id));
        };
        this.events.on(dt.created, d);
        try {
          const h = await fs(new Promise((g, w) => {
            this.relayer.request(n).catch((m) => {
              this.logger.warn(m, m == null ? void 0 : m.message), w(m);
            }).then(g);
          }), this.initialSubscribeTimeout, `Subscribing to ${e} failed, please try again`);
          this.events.removeListener(dt.created, d), u(h);
        } catch {
        }
      }), l = await fs(c, this.subscribeTimeout, `Subscribing to ${e} failed, please try again`);
      if (!l && o) throw new Error(`Subscribing to ${e} failed, please try again`);
      return l ? a : null;
    } catch (a) {
      if (this.logger.debug("Outgoing Relay Subscribe Payload stalled"), this.relayer.events.emit(Be.connection_stalled), o) throw a;
    }
    return null;
  }
  async rpcBatchSubscribe(e) {
    if (!e.length) return;
    const s = e[0].relay, r = { method: qr(s.protocol).batchSubscribe, params: { topics: e.map((i) => i.topic) } };
    this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "payload", direction: "outgoing", request: r });
    try {
      await await fs(new Promise((i) => {
        this.relayer.request(r).catch((n) => this.logger.warn(n)).then(i);
      }), this.subscribeTimeout, "rpcBatchSubscribe failed, please try again");
    } catch {
      this.relayer.events.emit(Be.connection_stalled);
    }
  }
  async rpcBatchFetchMessages(e) {
    if (!e.length) return;
    const s = e[0].relay, r = { method: qr(s.protocol).batchFetchMessages, params: { topics: e.map((n) => n.topic) } };
    this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "payload", direction: "outgoing", request: r });
    let i;
    try {
      i = await await fs(new Promise((n, o) => {
        this.relayer.request(r).catch((a) => {
          this.logger.warn(a), o(a);
        }).then(n);
      }), this.subscribeTimeout, "rpcBatchFetchMessages failed, please try again");
    } catch {
      this.relayer.events.emit(Be.connection_stalled);
    }
    return i;
  }
  rpcUnsubscribe(e, s, r) {
    const i = { method: qr(r.protocol).unsubscribe, params: { topic: e, id: s } };
    return this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "payload", direction: "outgoing", request: i }), this.relayer.request(i);
  }
  onSubscribe(e, s) {
    this.setSubscription(e, wn(Dr({}, s), { id: e })), this.pending.delete(s.topic);
  }
  onBatchSubscribe(e) {
    e.length && e.forEach((s) => {
      this.setSubscription(s.id, Dr({}, s)), this.pending.delete(s.topic);
    });
  }
  async onUnsubscribe(e, s, r) {
    this.events.removeAllListeners(s), this.hasSubscription(s, e) && this.deleteSubscription(s, r), await this.relayer.messages.del(e);
  }
  async setRelayerSubscriptions(e) {
    await this.relayer.core.storage.setItem(this.storageKey, e);
  }
  async getRelayerSubscriptions() {
    return await this.relayer.core.storage.getItem(this.storageKey);
  }
  setSubscription(e, s) {
    this.logger.debug("Setting subscription"), this.logger.trace({ type: "method", method: "setSubscription", id: e, subscription: s }), this.addSubscription(e, s);
  }
  addSubscription(e, s) {
    this.subscriptions.set(e, Dr({}, s)), this.topicMap.set(s.topic, e), this.events.emit(dt.created, s);
  }
  getSubscription(e) {
    this.logger.debug("Getting subscription"), this.logger.trace({ type: "method", method: "getSubscription", id: e });
    const s = this.subscriptions.get(e);
    if (!s) {
      const { message: r } = $("NO_MATCHING_KEY", `${this.name}: ${e}`);
      throw new Error(r);
    }
    return s;
  }
  deleteSubscription(e, s) {
    this.logger.debug("Deleting subscription"), this.logger.trace({ type: "method", method: "deleteSubscription", id: e, reason: s });
    const r = this.getSubscription(e);
    this.subscriptions.delete(e), this.topicMap.delete(r.topic, e), this.events.emit(dt.deleted, wn(Dr({}, r), { reason: s }));
  }
  async persist() {
    await this.setRelayerSubscriptions(this.values), this.events.emit(dt.sync);
  }
  async onRestart() {
    if (this.cached.length) {
      const e = [...this.cached], s = Math.ceil(this.cached.length / this.batchSubscribeTopicsLimit);
      for (let r = 0; r < s; r++) {
        const i = e.splice(0, this.batchSubscribeTopicsLimit);
        await this.batchSubscribe(i);
      }
    }
    this.events.emit(dt.resubscribed);
  }
  async restore() {
    try {
      const e = await this.getRelayerSubscriptions();
      if (typeof e > "u" || !e.length) return;
      if (this.subscriptions.size) {
        const { message: s } = $("RESTORE_WILL_OVERRIDE", this.name);
        throw this.logger.error(s), this.logger.error(`${this.name}: ${JSON.stringify(this.values)}`), new Error(s);
      }
      this.cached = e, this.logger.debug(`Successfully Restored subscriptions for ${this.name}`), this.logger.trace({ type: "method", method: "restore", subscriptions: this.values });
    } catch (e) {
      this.logger.debug(`Failed to Restore subscriptions for ${this.name}`), this.logger.error(e);
    }
  }
  async batchSubscribe(e) {
    e.length && (await this.rpcBatchSubscribe(e), this.onBatchSubscribe(await Promise.all(e.map(async (s) => wn(Dr({}, s), { id: await this.getSubscriptionId(s.topic) })))));
  }
  async batchFetchMessages(e) {
    if (!e.length) return;
    this.logger.trace(`Fetching batch messages for ${e.length} subscriptions`);
    const s = await this.rpcBatchFetchMessages(e);
    s && s.messages && (await Fd(U.toMiliseconds(U.ONE_SECOND)), await this.relayer.handleBatchMessageEvents(s.messages));
  }
  async onConnect() {
    await this.restart(), this.reset();
  }
  onDisconnect() {
    this.onDisable();
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = $("NOT_INITIALIZED", this.name);
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
    return Wt(e + await this.getClientId());
  }
}
var xw = Object.defineProperty, Ma = Object.getOwnPropertySymbols, Rw = Object.prototype.hasOwnProperty, $w = Object.prototype.propertyIsEnumerable, Yn = (t, e, s) => e in t ? xw(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s, Ba = (t, e) => {
  for (var s in e || (e = {})) Rw.call(e, s) && Yn(t, s, e[s]);
  if (Ma) for (var s of Ma(e)) $w.call(e, s) && Yn(t, s, e[s]);
  return t;
}, le = (t, e, s) => Yn(t, typeof e != "symbol" ? e + "" : e, s);
class Uw extends sd {
  constructor(e) {
    super(e), le(this, "protocol", "wc"), le(this, "version", 2), le(this, "core"), le(this, "logger"), le(this, "events", new Bs.EventEmitter()), le(this, "provider"), le(this, "messages"), le(this, "subscriber"), le(this, "publisher"), le(this, "name", df), le(this, "transportExplicitlyClosed", !1), le(this, "initialized", !1), le(this, "connectionAttemptInProgress", !1), le(this, "relayUrl"), le(this, "projectId"), le(this, "packageName"), le(this, "bundleId"), le(this, "hasExperiencedNetworkDisruption", !1), le(this, "pingTimeout"), le(this, "heartBeatTimeout", U.toMiliseconds(U.THIRTY_SECONDS + U.FIVE_SECONDS)), le(this, "reconnectTimeout"), le(this, "connectPromise"), le(this, "reconnectInProgress", !1), le(this, "requestsInFlight", []), le(this, "connectTimeout", U.toMiliseconds(U.ONE_SECOND * 15)), le(this, "request", async (s) => {
      var r, i;
      this.logger.debug("Publishing Request Payload");
      const n = s.id || cr().toString();
      await this.toEstablishConnection();
      try {
        this.logger.trace({ id: n, method: s.method, topic: (r = s.params) == null ? void 0 : r.topic }, "relayer.request - publishing...");
        const o = `${n}:${((i = s.params) == null ? void 0 : i.tag) || ""}`;
        this.requestsInFlight.push(o);
        const a = await this.provider.request(s);
        return this.requestsInFlight = this.requestsInFlight.filter((c) => c !== o), a;
      } catch (o) {
        throw this.logger.debug(`Failed to Publish Request: ${n}`), o;
      }
    }), le(this, "resetPingTimeout", () => {
      Di() && (clearTimeout(this.pingTimeout), this.pingTimeout = setTimeout(() => {
        var s, r, i, n;
        try {
          this.logger.debug({}, "pingTimeout: Connection stalled, terminating..."), (n = (i = (r = (s = this.provider) == null ? void 0 : s.connection) == null ? void 0 : r.socket) == null ? void 0 : i.terminate) == null || n.call(i);
        } catch (o) {
          this.logger.warn(o, o == null ? void 0 : o.message);
        }
      }, this.heartBeatTimeout));
    }), le(this, "onPayloadHandler", (s) => {
      this.onProviderPayload(s), this.resetPingTimeout();
    }), le(this, "onConnectHandler", () => {
      this.logger.warn({}, "Relayer connected 🛜"), this.startPingTimeout(), this.events.emit(Be.connect);
    }), le(this, "onDisconnectHandler", () => {
      this.logger.warn({}, "Relayer disconnected 🛑"), this.requestsInFlight = [], this.onProviderDisconnect();
    }), le(this, "onProviderErrorHandler", (s) => {
      this.logger.fatal(`Fatal socket error: ${s.message}`), this.events.emit(Be.error, s), this.logger.fatal("Fatal socket error received, closing transport"), this.transportClose();
    }), le(this, "registerProviderListeners", () => {
      this.provider.on(Et.payload, this.onPayloadHandler), this.provider.on(Et.connect, this.onConnectHandler), this.provider.on(Et.disconnect, this.onDisconnectHandler), this.provider.on(Et.error, this.onProviderErrorHandler);
    }), this.core = e.core, this.logger = typeof e.logger < "u" && typeof e.logger != "string" ? et(e.logger, this.name) : no(ni({ level: e.logger || uf })), this.messages = new mw(this.logger, e.core), this.subscriber = new kw(this, this.logger), this.publisher = new Cw(this, this.logger), this.relayUrl = (e == null ? void 0 : e.relayUrl) || ml, this.projectId = e.projectId, Cd() ? this.packageName = Fo() : Id() && (this.bundleId = Fo()), this.provider = {};
  }
  async init() {
    if (this.logger.trace("Initialized"), this.registerEventListeners(), await Promise.all([this.messages.init(), this.subscriber.init()]), this.initialized = !0, this.subscriber.hasAnyTopics) try {
      await this.transportOpen();
    } catch (e) {
      this.logger.warn(e, e == null ? void 0 : e.message);
    }
  }
  get context() {
    return wt(this.logger);
  }
  get connected() {
    var e, s, r;
    return ((r = (s = (e = this.provider) == null ? void 0 : e.connection) == null ? void 0 : s.socket) == null ? void 0 : r.readyState) === 1 || !1;
  }
  get connecting() {
    var e, s, r;
    return ((r = (s = (e = this.provider) == null ? void 0 : e.connection) == null ? void 0 : s.socket) == null ? void 0 : r.readyState) === 0 || this.connectPromise !== void 0 || !1;
  }
  async publish(e, s, r) {
    this.isInitialized(), await this.publisher.publish(e, s, r), await this.recordMessageEvent({ topic: e, message: s, publishedAt: Date.now(), transportType: Ne.relay }, ki.outbound);
  }
  async subscribe(e, s) {
    var r, i, n;
    this.isInitialized(), (!(s != null && s.transportType) || (s == null ? void 0 : s.transportType) === "relay") && await this.toEstablishConnection();
    const o = typeof ((r = s == null ? void 0 : s.internal) == null ? void 0 : r.throwOnFailedPublish) > "u" ? !0 : (i = s == null ? void 0 : s.internal) == null ? void 0 : i.throwOnFailedPublish;
    let a = ((n = this.subscriber.topicMap.get(e)) == null ? void 0 : n[0]) || "", c;
    const l = (u) => {
      u.topic === e && (this.subscriber.off(dt.created, l), c());
    };
    return await Promise.all([new Promise((u) => {
      c = u, this.subscriber.on(dt.created, l);
    }), new Promise(async (u, d) => {
      a = await this.subscriber.subscribe(e, Ba({ internal: { throwOnFailedPublish: o } }, s)).catch((h) => {
        o && d(h);
      }) || a, u();
    })]), a;
  }
  async unsubscribe(e, s) {
    this.isInitialized(), await this.subscriber.unsubscribe(e, s);
  }
  on(e, s) {
    this.events.on(e, s);
  }
  once(e, s) {
    this.events.once(e, s);
  }
  off(e, s) {
    this.events.off(e, s);
  }
  removeListener(e, s) {
    this.events.removeListener(e, s);
  }
  async transportDisconnect() {
    this.provider.disconnect && (this.hasExperiencedNetworkDisruption || this.connected) ? await fs(this.provider.disconnect(), 2e3, "provider.disconnect()").catch(() => this.onProviderDisconnect()) : this.onProviderDisconnect();
  }
  async transportClose() {
    this.transportExplicitlyClosed = !0, await this.transportDisconnect();
  }
  async transportOpen(e) {
    if (!this.subscriber.hasAnyTopics) {
      this.logger.warn("Starting WS connection skipped because the client has no topics to work with.");
      return;
    }
    if (this.connectPromise ? (this.logger.debug({}, "Waiting for existing connection attempt to resolve..."), await this.connectPromise, this.logger.debug({}, "Existing connection attempt resolved")) : (this.connectPromise = new Promise(async (s, r) => {
      await this.connect(e).then(s).catch(r).finally(() => {
        this.connectPromise = void 0;
      });
    }), await this.connectPromise), !this.connected) throw new Error(`Couldn't establish socket connection to the relay server: ${this.relayUrl}`);
  }
  async restartTransport(e) {
    this.logger.debug({}, "Restarting transport..."), !this.connectionAttemptInProgress && (this.relayUrl = e || this.relayUrl, await this.confirmOnlineStateOrThrow(), await this.transportClose(), await this.transportOpen());
  }
  async confirmOnlineStateOrThrow() {
    if (!await _a()) throw new Error("No internet connection detected. Please restart your network and try again.");
  }
  async handleBatchMessageEvents(e) {
    if ((e == null ? void 0 : e.length) === 0) {
      this.logger.trace("Batch message events is empty. Ignoring...");
      return;
    }
    const s = e.sort((r, i) => r.publishedAt - i.publishedAt);
    this.logger.debug(`Batch of ${s.length} message events sorted`);
    for (const r of s) try {
      await this.onMessageEvent(r);
    } catch (i) {
      this.logger.warn(i, "Error while processing batch message event: " + (i == null ? void 0 : i.message));
    }
    this.logger.trace(`Batch of ${s.length} message events processed`);
  }
  async onLinkMessageEvent(e, s) {
    const { topic: r } = e;
    if (!s.sessionExists) {
      const i = Ue(U.FIVE_MINUTES), n = { topic: r, expiry: i, relay: { protocol: "irn" }, active: !1 };
      await this.core.pairing.pairings.set(r, n);
    }
    this.events.emit(Be.message, e), await this.recordMessageEvent(e, ki.inbound);
  }
  async connect(e) {
    await this.confirmOnlineStateOrThrow(), e && e !== this.relayUrl && (this.relayUrl = e, await this.transportDisconnect()), this.connectionAttemptInProgress = !0, this.transportExplicitlyClosed = !1;
    let s = 1;
    for (; s < 6; ) {
      try {
        if (this.transportExplicitlyClosed) break;
        this.logger.debug({}, `Connecting to ${this.relayUrl}, attempt: ${s}...`), await this.createProvider(), await new Promise(async (r, i) => {
          const n = () => {
            i(new Error("Connection interrupted while trying to subscribe"));
          };
          this.provider.once(Et.disconnect, n), await fs(new Promise((o, a) => {
            this.provider.connect().then(o).catch(a);
          }), this.connectTimeout, `Socket stalled when trying to connect to ${this.relayUrl}`).catch((o) => {
            i(o);
          }).finally(() => {
            this.provider.off(Et.disconnect, n), clearTimeout(this.reconnectTimeout);
          }), await new Promise(async (o, a) => {
            const c = () => {
              a(new Error("Connection interrupted while trying to subscribe"));
            };
            this.provider.once(Et.disconnect, c), await this.subscriber.start().then(o).catch(a).finally(() => {
              this.provider.off(Et.disconnect, c);
            });
          }), this.hasExperiencedNetworkDisruption = !1, r();
        });
      } catch (r) {
        await this.subscriber.stop();
        const i = r;
        this.logger.warn({}, i.message), this.hasExperiencedNetworkDisruption = !0;
      } finally {
        this.connectionAttemptInProgress = !1;
      }
      if (this.connected) {
        this.logger.debug({}, `Connected to ${this.relayUrl} successfully on attempt: ${s}`);
        break;
      }
      await new Promise((r) => setTimeout(r, U.toMiliseconds(s * 1))), s++;
    }
  }
  startPingTimeout() {
    var e, s, r, i, n;
    if (Di()) try {
      (s = (e = this.provider) == null ? void 0 : e.connection) != null && s.socket && ((n = (i = (r = this.provider) == null ? void 0 : r.connection) == null ? void 0 : i.socket) == null || n.on("ping", () => {
        this.resetPingTimeout();
      })), this.resetPingTimeout();
    } catch (o) {
      this.logger.warn(o, o == null ? void 0 : o.message);
    }
  }
  async createProvider() {
    this.provider.connection && this.unregisterProviderListeners();
    const e = await this.core.crypto.signJWT(this.relayUrl);
    this.provider = new At(new Xl(Pd({ sdkVersion: zn, protocol: this.protocol, version: this.version, relayUrl: this.relayUrl, projectId: this.projectId, auth: e, useOnCloseEvent: !0, bundleId: this.bundleId, packageName: this.packageName }))), this.registerProviderListeners();
  }
  async recordMessageEvent(e, s) {
    const { topic: r, message: i } = e;
    await this.messages.set(r, i, s);
  }
  async shouldIgnoreMessageEvent(e) {
    const { topic: s, message: r } = e;
    if (!r || r.length === 0) return this.logger.warn(`Ignoring invalid/empty message: ${r}`), !0;
    if (!await this.subscriber.isKnownTopic(s)) return this.logger.warn(`Ignoring message for unknown topic ${s}`), !0;
    const i = this.messages.has(s, r);
    return i && this.logger.warn(`Ignoring duplicate message: ${r}`), i;
  }
  async onProviderPayload(e) {
    if (this.logger.debug("Incoming Relay Payload"), this.logger.trace({ type: "payload", direction: "incoming", payload: e }), oo(e)) {
      if (!e.method.endsWith(hf)) return;
      const s = e.params, { topic: r, message: i, publishedAt: n, attestation: o } = s.data, a = { topic: r, message: i, publishedAt: n, transportType: Ne.relay, attestation: o };
      this.logger.debug("Emitting Relayer Payload"), this.logger.trace(Ba({ type: "event", event: s.id }, a)), this.events.emit(s.id, a), await this.acknowledgePayload(e), await this.onMessageEvent(a);
    } else ao(e) && this.events.emit(Be.message_ack, e);
  }
  async onMessageEvent(e) {
    await this.shouldIgnoreMessageEvent(e) || (await this.recordMessageEvent(e, ki.inbound), this.events.emit(Be.message, e));
  }
  async acknowledgePayload(e) {
    const s = ji(e.id, !0);
    await this.provider.connection.send(s);
  }
  unregisterProviderListeners() {
    this.provider.off(Et.payload, this.onPayloadHandler), this.provider.off(Et.connect, this.onConnectHandler), this.provider.off(Et.disconnect, this.onDisconnectHandler), this.provider.off(Et.error, this.onProviderErrorHandler), clearTimeout(this.pingTimeout);
  }
  async registerEventListeners() {
    let e = await _a();
    Yg(async (s) => {
      e !== s && (e = s, s ? await this.transportOpen().catch((r) => this.logger.error(r, r == null ? void 0 : r.message)) : (this.hasExperiencedNetworkDisruption = !0, await this.transportDisconnect(), this.transportExplicitlyClosed = !1));
    }), this.core.heartbeat.on(Ar.pulse, async () => {
      if (!this.transportExplicitlyClosed && !this.connected && Qg()) try {
        await this.confirmOnlineStateOrThrow(), await this.transportOpen();
      } catch (s) {
        this.logger.warn(s, s == null ? void 0 : s.message);
      }
    });
  }
  async onProviderDisconnect() {
    clearTimeout(this.pingTimeout), this.events.emit(Be.disconnect), this.connectionAttemptInProgress = !1, !this.reconnectInProgress && (this.reconnectInProgress = !0, await this.subscriber.stop(), this.subscriber.hasAnyTopics && (this.transportExplicitlyClosed || (this.reconnectTimeout = setTimeout(async () => {
      await this.transportOpen().catch((e) => this.logger.error(e, e == null ? void 0 : e.message)), this.reconnectTimeout = void 0, this.reconnectInProgress = !1;
    }, U.toMiliseconds(pf)))));
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = $("NOT_INITIALIZED", this.name);
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
function Dw() {
}
function qa(t) {
  if (!t || typeof t != "object") return !1;
  const e = Object.getPrototypeOf(t);
  return e === null || e === Object.prototype || Object.getPrototypeOf(e) === null ? Object.prototype.toString.call(t) === "[object Object]" : !1;
}
function ja(t) {
  return Object.getOwnPropertySymbols(t).filter((e) => Object.prototype.propertyIsEnumerable.call(t, e));
}
function Wa(t) {
  return t == null ? t === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(t);
}
const Lw = "[object RegExp]", Fw = "[object String]", Mw = "[object Number]", Bw = "[object Boolean]", za = "[object Arguments]", qw = "[object Symbol]", jw = "[object Date]", Ww = "[object Map]", zw = "[object Set]", Hw = "[object Array]", Kw = "[object Function]", Vw = "[object ArrayBuffer]", yn = "[object Object]", Gw = "[object Error]", Jw = "[object DataView]", Yw = "[object Uint8Array]", Xw = "[object Uint8ClampedArray]", Zw = "[object Uint16Array]", Qw = "[object Uint32Array]", ey = "[object BigUint64Array]", ty = "[object Int8Array]", sy = "[object Int16Array]", ry = "[object Int32Array]", iy = "[object BigInt64Array]", ny = "[object Float32Array]", oy = "[object Float64Array]";
function ay(t, e) {
  return t === e || Number.isNaN(t) && Number.isNaN(e);
}
function cy(t, e, s) {
  return jr(t, e, void 0, void 0, void 0, void 0, s);
}
function jr(t, e, s, r, i, n, o) {
  const a = o(t, e, s, r, i, n);
  if (a !== void 0) return a;
  if (typeof t == typeof e) switch (typeof t) {
    case "bigint":
    case "string":
    case "boolean":
    case "symbol":
    case "undefined":
      return t === e;
    case "number":
      return t === e || Object.is(t, e);
    case "function":
      return t === e;
    case "object":
      return Yr(t, e, n, o);
  }
  return Yr(t, e, n, o);
}
function Yr(t, e, s, r) {
  if (Object.is(t, e)) return !0;
  let i = Wa(t), n = Wa(e);
  if (i === za && (i = yn), n === za && (n = yn), i !== n) return !1;
  switch (i) {
    case Fw:
      return t.toString() === e.toString();
    case Mw: {
      const c = t.valueOf(), l = e.valueOf();
      return ay(c, l);
    }
    case Bw:
    case jw:
    case qw:
      return Object.is(t.valueOf(), e.valueOf());
    case Lw:
      return t.source === e.source && t.flags === e.flags;
    case Kw:
      return t === e;
  }
  s = s ?? /* @__PURE__ */ new Map();
  const o = s.get(t), a = s.get(e);
  if (o != null && a != null) return o === e;
  s.set(t, e), s.set(e, t);
  try {
    switch (i) {
      case Ww: {
        if (t.size !== e.size) return !1;
        for (const [c, l] of t.entries()) if (!e.has(c) || !jr(l, e.get(c), c, t, e, s, r)) return !1;
        return !0;
      }
      case zw: {
        if (t.size !== e.size) return !1;
        const c = Array.from(t.values()), l = Array.from(e.values());
        for (let u = 0; u < c.length; u++) {
          const d = c[u], h = l.findIndex((g) => jr(d, g, void 0, t, e, s, r));
          if (h === -1) return !1;
          l.splice(h, 1);
        }
        return !0;
      }
      case Hw:
      case Yw:
      case Xw:
      case Zw:
      case Qw:
      case ey:
      case ty:
      case sy:
      case ry:
      case iy:
      case ny:
      case oy: {
        if (typeof Buffer < "u" && Buffer.isBuffer(t) !== Buffer.isBuffer(e) || t.length !== e.length) return !1;
        for (let c = 0; c < t.length; c++) if (!jr(t[c], e[c], c, t, e, s, r)) return !1;
        return !0;
      }
      case Vw:
        return t.byteLength !== e.byteLength ? !1 : Yr(new Uint8Array(t), new Uint8Array(e), s, r);
      case Jw:
        return t.byteLength !== e.byteLength || t.byteOffset !== e.byteOffset ? !1 : Yr(new Uint8Array(t), new Uint8Array(e), s, r);
      case Gw:
        return t.name === e.name && t.message === e.message;
      case yn: {
        if (!(Yr(t.constructor, e.constructor, s, r) || qa(t) && qa(e))) return !1;
        const c = [...Object.keys(t), ...ja(t)], l = [...Object.keys(e), ...ja(e)];
        if (c.length !== l.length) return !1;
        for (let u = 0; u < c.length; u++) {
          const d = c[u], h = t[d];
          if (!Object.hasOwn(e, d)) return !1;
          const g = e[d];
          if (!jr(h, g, d, t, e, s, r)) return !1;
        }
        return !0;
      }
      default:
        return !1;
    }
  } finally {
    s.delete(t), s.delete(e);
  }
}
function ly(t, e) {
  return cy(t, e, Dw);
}
var uy = Object.defineProperty, Ha = Object.getOwnPropertySymbols, dy = Object.prototype.hasOwnProperty, hy = Object.prototype.propertyIsEnumerable, Xn = (t, e, s) => e in t ? uy(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s, Ka = (t, e) => {
  for (var s in e || (e = {})) dy.call(e, s) && Xn(t, s, e[s]);
  if (Ha) for (var s of Ha(e)) hy.call(e, s) && Xn(t, s, e[s]);
  return t;
}, it = (t, e, s) => Xn(t, typeof e != "symbol" ? e + "" : e, s);
class qs extends rd {
  constructor(e, s, r, i = Ht, n = void 0) {
    super(e, s, r, i), this.core = e, this.logger = s, this.name = r, it(this, "map", /* @__PURE__ */ new Map()), it(this, "version", gf), it(this, "cached", []), it(this, "initialized", !1), it(this, "getKey"), it(this, "storagePrefix", Ht), it(this, "recentlyDeleted", []), it(this, "recentlyDeletedLimit", 200), it(this, "init", async () => {
      this.initialized || (this.logger.trace("Initialized"), await this.restore(), this.cached.forEach((o) => {
        this.getKey && o !== null && !Ke(o) ? this.map.set(this.getKey(o), o) : Sg(o) ? this.map.set(o.id, o) : Pg(o) && this.map.set(o.topic, o);
      }), this.cached = [], this.initialized = !0);
    }), it(this, "set", async (o, a) => {
      this.isInitialized(), this.map.has(o) ? await this.update(o, a) : (this.logger.debug("Setting value"), this.logger.trace({ type: "method", method: "set", key: o, value: a }), this.map.set(o, a), await this.persist());
    }), it(this, "get", (o) => (this.isInitialized(), this.logger.debug("Getting value"), this.logger.trace({ type: "method", method: "get", key: o }), this.getData(o))), it(this, "getAll", (o) => (this.isInitialized(), o ? this.values.filter((a) => Object.keys(o).every((c) => ly(a[c], o[c]))) : this.values)), it(this, "update", async (o, a) => {
      this.isInitialized(), this.logger.debug("Updating value"), this.logger.trace({ type: "method", method: "update", key: o, update: a });
      const c = Ka(Ka({}, this.getData(o)), a);
      this.map.set(o, c), await this.persist();
    }), it(this, "delete", async (o, a) => {
      this.isInitialized(), this.map.has(o) && (this.logger.debug("Deleting value"), this.logger.trace({ type: "method", method: "delete", key: o, reason: a }), this.map.delete(o), this.addToRecentlyDeleted(o), await this.persist());
    }), this.logger = et(s, this.name), this.storagePrefix = i, this.getKey = n;
  }
  get context() {
    return wt(this.logger);
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
    const s = this.map.get(e);
    if (!s) {
      if (this.recentlyDeleted.includes(e)) {
        const { message: i } = $("MISSING_OR_INVALID", `Record was recently deleted - ${this.name}: ${e}`);
        throw this.logger.error(i), new Error(i);
      }
      const { message: r } = $("NO_MATCHING_KEY", `${this.name}: ${e}`);
      throw this.logger.error(r), new Error(r);
    }
    return s;
  }
  async persist() {
    await this.setDataStore(this.values);
  }
  async restore() {
    try {
      const e = await this.getDataStore();
      if (typeof e > "u" || !e.length) return;
      if (this.map.size) {
        const { message: s } = $("RESTORE_WILL_OVERRIDE", this.name);
        throw this.logger.error(s), new Error(s);
      }
      this.cached = e, this.logger.debug(`Successfully Restored value for ${this.name}`), this.logger.trace({ type: "method", method: "restore", value: this.values });
    } catch (e) {
      this.logger.debug(`Failed to Restore value for ${this.name}`), this.logger.error(e);
    }
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = $("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
}
var py = Object.defineProperty, gy = (t, e, s) => e in t ? py(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s, ie = (t, e, s) => gy(t, typeof e != "symbol" ? e + "" : e, s);
class fy {
  constructor(e, s) {
    this.core = e, this.logger = s, ie(this, "name", yf), ie(this, "version", bf), ie(this, "events", new co()), ie(this, "pairings"), ie(this, "initialized", !1), ie(this, "storagePrefix", Ht), ie(this, "ignoredPayloadTypes", [rs]), ie(this, "registeredMethods", []), ie(this, "init", async () => {
      this.initialized || (await this.pairings.init(), await this.cleanup(), this.registerRelayerEvents(), this.registerExpirerEvents(), this.initialized = !0, this.logger.trace("Initialized"));
    }), ie(this, "register", ({ methods: r }) => {
      this.isInitialized(), this.registeredMethods = [.../* @__PURE__ */ new Set([...this.registeredMethods, ...r])];
    }), ie(this, "create", async (r) => {
      this.isInitialized();
      const i = jn(), n = await this.core.crypto.setSymKey(i), o = Ue(U.FIVE_MINUTES), a = { protocol: fl }, c = { topic: n, expiry: o, relay: a, active: !1, methods: r == null ? void 0 : r.methods }, l = wa({ protocol: this.core.protocol, version: this.core.version, topic: n, symKey: i, relay: a, expiryTimestamp: o, methods: r == null ? void 0 : r.methods });
      return this.events.emit(ks.create, c), this.core.expirer.set(n, o), await this.pairings.set(n, c), await this.core.relayer.subscribe(n, { transportType: r == null ? void 0 : r.transportType }), { topic: n, uri: l };
    }), ie(this, "pair", async (r) => {
      this.isInitialized();
      const i = this.core.eventClient.createEvent({ properties: { topic: r == null ? void 0 : r.uri, trace: [Bt.pairing_started] } });
      this.isValidPair(r, i);
      const { topic: n, symKey: o, relay: a, expiryTimestamp: c, methods: l } = ma(r.uri);
      i.props.properties.topic = n, i.addTrace(Bt.pairing_uri_validation_success), i.addTrace(Bt.pairing_uri_not_expired);
      let u;
      if (this.pairings.keys.includes(n)) {
        if (u = this.pairings.get(n), i.addTrace(Bt.existing_pairing), u.active) throw i.setError(Qt.active_pairing_already_exists), new Error(`Pairing already exists: ${n}. Please try again with a new connection URI.`);
        i.addTrace(Bt.pairing_not_expired);
      }
      const d = c || Ue(U.FIVE_MINUTES), h = { topic: n, relay: a, expiry: d, active: !1, methods: l };
      this.core.expirer.set(n, d), await this.pairings.set(n, h), i.addTrace(Bt.store_new_pairing), r.activatePairing && await this.activate({ topic: n }), this.events.emit(ks.create, h), i.addTrace(Bt.emit_inactive_pairing), this.core.crypto.keychain.has(n) || await this.core.crypto.setSymKey(o, n), i.addTrace(Bt.subscribing_pairing_topic);
      try {
        await this.core.relayer.confirmOnlineStateOrThrow();
      } catch {
        i.setError(Qt.no_internet_connection);
      }
      try {
        await this.core.relayer.subscribe(n, { relay: a });
      } catch (g) {
        throw i.setError(Qt.subscribe_pairing_topic_failure), g;
      }
      return i.addTrace(Bt.subscribe_pairing_topic_success), h;
    }), ie(this, "activate", async ({ topic: r }) => {
      this.isInitialized();
      const i = Ue(U.FIVE_MINUTES);
      this.core.expirer.set(r, i), await this.pairings.update(r, { active: !0, expiry: i });
    }), ie(this, "ping", async (r) => {
      this.isInitialized(), await this.isValidPing(r), this.logger.warn("ping() is deprecated and will be removed in the next major release.");
      const { topic: i } = r;
      if (this.pairings.keys.includes(i)) {
        const n = await this.sendRequest(i, "wc_pairingPing", {}), { done: o, resolve: a, reject: c } = Ps();
        this.events.once(pe("pairing_ping", n), ({ error: l }) => {
          l ? c(l) : a();
        }), await o();
      }
    }), ie(this, "updateExpiry", async ({ topic: r, expiry: i }) => {
      this.isInitialized(), await this.pairings.update(r, { expiry: i });
    }), ie(this, "updateMetadata", async ({ topic: r, metadata: i }) => {
      this.isInitialized(), await this.pairings.update(r, { peerMetadata: i });
    }), ie(this, "getPairings", () => (this.isInitialized(), this.pairings.values)), ie(this, "disconnect", async (r) => {
      this.isInitialized(), await this.isValidDisconnect(r);
      const { topic: i } = r;
      this.pairings.keys.includes(i) && (await this.sendRequest(i, "wc_pairingDelete", me("USER_DISCONNECTED")), await this.deletePairing(i));
    }), ie(this, "formatUriFromPairing", (r) => {
      this.isInitialized();
      const { topic: i, relay: n, expiry: o, methods: a } = r, c = this.core.crypto.keychain.get(i);
      return wa({ protocol: this.core.protocol, version: this.core.version, topic: i, symKey: c, relay: n, expiryTimestamp: o, methods: a });
    }), ie(this, "sendRequest", async (r, i, n) => {
      const o = Rs(i, n), a = await this.core.crypto.encode(r, o), c = $r[i].req;
      return this.core.history.set(r, o), this.core.relayer.publish(r, a, c), o.id;
    }), ie(this, "sendResult", async (r, i, n) => {
      const o = ji(r, n), a = await this.core.crypto.encode(i, o), c = (await this.core.history.get(i, r)).request.method, l = $r[c].res;
      await this.core.relayer.publish(i, a, l), await this.core.history.resolve(o);
    }), ie(this, "sendError", async (r, i, n) => {
      const o = Ec(r, n), a = await this.core.crypto.encode(i, o), c = (await this.core.history.get(i, r)).request.method, l = $r[c] ? $r[c].res : $r.unregistered_method.res;
      await this.core.relayer.publish(i, a, l), await this.core.history.resolve(o);
    }), ie(this, "deletePairing", async (r, i) => {
      await this.core.relayer.unsubscribe(r), await Promise.all([this.pairings.delete(r, me("USER_DISCONNECTED")), this.core.crypto.deleteSymKey(r), i ? Promise.resolve() : this.core.expirer.del(r)]);
    }), ie(this, "cleanup", async () => {
      const r = this.pairings.getAll().filter((i) => hs(i.expiry));
      await Promise.all(r.map((i) => this.deletePairing(i.topic)));
    }), ie(this, "onRelayEventRequest", async (r) => {
      const { topic: i, payload: n } = r;
      switch (n.method) {
        case "wc_pairingPing":
          return await this.onPairingPingRequest(i, n);
        case "wc_pairingDelete":
          return await this.onPairingDeleteRequest(i, n);
        default:
          return await this.onUnknownRpcMethodRequest(i, n);
      }
    }), ie(this, "onRelayEventResponse", async (r) => {
      const { topic: i, payload: n } = r, o = (await this.core.history.get(i, n.id)).request.method;
      switch (o) {
        case "wc_pairingPing":
          return this.onPairingPingResponse(i, n);
        default:
          return this.onUnknownRpcMethodResponse(o);
      }
    }), ie(this, "onPairingPingRequest", async (r, i) => {
      const { id: n } = i;
      try {
        this.isValidPing({ topic: r }), await this.sendResult(n, r, !0), this.events.emit(ks.ping, { id: n, topic: r });
      } catch (o) {
        await this.sendError(n, r, o), this.logger.error(o);
      }
    }), ie(this, "onPairingPingResponse", (r, i) => {
      const { id: n } = i;
      setTimeout(() => {
        Zt(i) ? this.events.emit(pe("pairing_ping", n), {}) : qt(i) && this.events.emit(pe("pairing_ping", n), { error: i.error });
      }, 500);
    }), ie(this, "onPairingDeleteRequest", async (r, i) => {
      const { id: n } = i;
      try {
        this.isValidDisconnect({ topic: r }), await this.deletePairing(r), this.events.emit(ks.delete, { id: n, topic: r });
      } catch (o) {
        await this.sendError(n, r, o), this.logger.error(o);
      }
    }), ie(this, "onUnknownRpcMethodRequest", async (r, i) => {
      const { id: n, method: o } = i;
      try {
        if (this.registeredMethods.includes(o)) return;
        const a = me("WC_METHOD_UNSUPPORTED", o);
        await this.sendError(n, r, a), this.logger.error(a);
      } catch (a) {
        await this.sendError(n, r, a), this.logger.error(a);
      }
    }), ie(this, "onUnknownRpcMethodResponse", (r) => {
      this.registeredMethods.includes(r) || this.logger.error(me("WC_METHOD_UNSUPPORTED", r));
    }), ie(this, "isValidPair", (r, i) => {
      var n;
      if (!ot(r)) {
        const { message: a } = $("MISSING_OR_INVALID", `pair() params: ${r}`);
        throw i.setError(Qt.malformed_pairing_uri), new Error(a);
      }
      if (!_g(r.uri)) {
        const { message: a } = $("MISSING_OR_INVALID", `pair() uri: ${r.uri}`);
        throw i.setError(Qt.malformed_pairing_uri), new Error(a);
      }
      const o = ma(r == null ? void 0 : r.uri);
      if (!((n = o == null ? void 0 : o.relay) != null && n.protocol)) {
        const { message: a } = $("MISSING_OR_INVALID", "pair() uri#relay-protocol");
        throw i.setError(Qt.malformed_pairing_uri), new Error(a);
      }
      if (!(o != null && o.symKey)) {
        const { message: a } = $("MISSING_OR_INVALID", "pair() uri#symKey");
        throw i.setError(Qt.malformed_pairing_uri), new Error(a);
      }
      if (o != null && o.expiryTimestamp && U.toMiliseconds(o == null ? void 0 : o.expiryTimestamp) < Date.now()) {
        i.setError(Qt.pairing_expired);
        const { message: a } = $("EXPIRED", "pair() URI has expired. Please try again with a new connection URI.");
        throw new Error(a);
      }
    }), ie(this, "isValidPing", async (r) => {
      if (!ot(r)) {
        const { message: n } = $("MISSING_OR_INVALID", `ping() params: ${r}`);
        throw new Error(n);
      }
      const { topic: i } = r;
      await this.isValidPairingTopic(i);
    }), ie(this, "isValidDisconnect", async (r) => {
      if (!ot(r)) {
        const { message: n } = $("MISSING_OR_INVALID", `disconnect() params: ${r}`);
        throw new Error(n);
      }
      const { topic: i } = r;
      await this.isValidPairingTopic(i);
    }), ie(this, "isValidPairingTopic", async (r) => {
      if (!ke(r, !1)) {
        const { message: i } = $("MISSING_OR_INVALID", `pairing topic should be a string: ${r}`);
        throw new Error(i);
      }
      if (!this.pairings.keys.includes(r)) {
        const { message: i } = $("NO_MATCHING_KEY", `pairing topic doesn't exist: ${r}`);
        throw new Error(i);
      }
      if (hs(this.pairings.get(r).expiry)) {
        await this.deletePairing(r);
        const { message: i } = $("EXPIRED", `pairing topic: ${r}`);
        throw new Error(i);
      }
    }), this.core = e, this.logger = et(s, this.name), this.pairings = new qs(this.core, this.logger, this.name, this.storagePrefix);
  }
  get context() {
    return wt(this.logger);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = $("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
  registerRelayerEvents() {
    this.core.relayer.on(Be.message, async (e) => {
      const { topic: s, message: r, transportType: i } = e;
      if (this.pairings.keys.includes(s) && i !== Ne.link_mode && !this.ignoredPayloadTypes.includes(this.core.crypto.getPayloadType(r))) try {
        const n = await this.core.crypto.decode(s, r);
        oo(n) ? (this.core.history.set(s, n), await this.onRelayEventRequest({ topic: s, payload: n })) : ao(n) && (await this.core.history.resolve(n), await this.onRelayEventResponse({ topic: s, payload: n }), this.core.history.delete(s, n.id)), await this.core.relayer.messages.ack(s, r);
      } catch (n) {
        this.logger.error(n);
      }
    });
  }
  registerExpirerEvents() {
    this.core.expirer.on(It.expired, async (e) => {
      const { topic: s } = kc(e.target);
      s && this.pairings.keys.includes(s) && (await this.deletePairing(s, !0), this.events.emit(ks.expire, { topic: s }));
    });
  }
}
var my = Object.defineProperty, wy = (t, e, s) => e in t ? my(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s, He = (t, e, s) => wy(t, typeof e != "symbol" ? e + "" : e, s);
class yy extends Qu {
  constructor(e, s) {
    super(e, s), this.core = e, this.logger = s, He(this, "records", /* @__PURE__ */ new Map()), He(this, "events", new Bs.EventEmitter()), He(this, "name", vf), He(this, "version", Ef), He(this, "cached", []), He(this, "initialized", !1), He(this, "storagePrefix", Ht), He(this, "init", async () => {
      this.initialized || (this.logger.trace("Initialized"), await this.restore(), this.cached.forEach((r) => this.records.set(r.id, r)), this.cached = [], this.registerEventListeners(), this.initialized = !0);
    }), He(this, "set", (r, i, n) => {
      if (this.isInitialized(), this.logger.debug("Setting JSON-RPC request history record"), this.logger.trace({ type: "method", method: "set", topic: r, request: i, chainId: n }), this.records.has(i.id)) return;
      const o = { id: i.id, topic: r, request: { method: i.method, params: i.params || null }, chainId: n, expiry: Ue(U.THIRTY_DAYS) };
      this.records.set(o.id, o), this.persist(), this.events.emit(Pt.created, o);
    }), He(this, "resolve", async (r) => {
      if (this.isInitialized(), this.logger.debug("Updating JSON-RPC response history record"), this.logger.trace({ type: "method", method: "update", response: r }), !this.records.has(r.id)) return;
      const i = await this.getRecord(r.id);
      typeof i.response > "u" && (i.response = qt(r) ? { error: r.error } : { result: r.result }, this.records.set(i.id, i), this.persist(), this.events.emit(Pt.updated, i));
    }), He(this, "get", async (r, i) => (this.isInitialized(), this.logger.debug("Getting record"), this.logger.trace({ type: "method", method: "get", topic: r, id: i }), await this.getRecord(i))), He(this, "delete", (r, i) => {
      this.isInitialized(), this.logger.debug("Deleting record"), this.logger.trace({ type: "method", method: "delete", id: i }), this.values.forEach((n) => {
        if (n.topic === r) {
          if (typeof i < "u" && n.id !== i) return;
          this.records.delete(n.id), this.events.emit(Pt.deleted, n);
        }
      }), this.persist();
    }), He(this, "exists", async (r, i) => (this.isInitialized(), this.records.has(i) ? (await this.getRecord(i)).topic === r : !1)), He(this, "on", (r, i) => {
      this.events.on(r, i);
    }), He(this, "once", (r, i) => {
      this.events.once(r, i);
    }), He(this, "off", (r, i) => {
      this.events.off(r, i);
    }), He(this, "removeListener", (r, i) => {
      this.events.removeListener(r, i);
    }), this.logger = et(s, this.name);
  }
  get context() {
    return wt(this.logger);
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
    return this.values.forEach((s) => {
      if (typeof s.response < "u") return;
      const r = { topic: s.topic, request: Rs(s.request.method, s.request.params, s.id), chainId: s.chainId };
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
    const s = this.records.get(e);
    if (!s) {
      const { message: r } = $("NO_MATCHING_KEY", `${this.name}: ${e}`);
      throw new Error(r);
    }
    return s;
  }
  async persist() {
    await this.setJsonRpcRecords(this.values), this.events.emit(Pt.sync);
  }
  async restore() {
    try {
      const e = await this.getJsonRpcRecords();
      if (typeof e > "u" || !e.length) return;
      if (this.records.size) {
        const { message: s } = $("RESTORE_WILL_OVERRIDE", this.name);
        throw this.logger.error(s), new Error(s);
      }
      this.cached = e, this.logger.debug(`Successfully Restored records for ${this.name}`), this.logger.trace({ type: "method", method: "restore", records: this.values });
    } catch (e) {
      this.logger.debug(`Failed to Restore records for ${this.name}`), this.logger.error(e);
    }
  }
  registerEventListeners() {
    this.events.on(Pt.created, (e) => {
      const s = Pt.created;
      this.logger.info(`Emitting ${s}`), this.logger.debug({ type: "event", event: s, record: e });
    }), this.events.on(Pt.updated, (e) => {
      const s = Pt.updated;
      this.logger.info(`Emitting ${s}`), this.logger.debug({ type: "event", event: s, record: e });
    }), this.events.on(Pt.deleted, (e) => {
      const s = Pt.deleted;
      this.logger.info(`Emitting ${s}`), this.logger.debug({ type: "event", event: s, record: e });
    }), this.core.heartbeat.on(Ar.pulse, () => {
      this.cleanup();
    });
  }
  cleanup() {
    try {
      this.isInitialized();
      let e = !1;
      this.records.forEach((s) => {
        U.toMiliseconds(s.expiry || 0) - Date.now() <= 0 && (this.logger.info(`Deleting expired history log: ${s.id}`), this.records.delete(s.id), this.events.emit(Pt.deleted, s, !1), e = !0);
      }), e && this.persist();
    } catch (e) {
      this.logger.warn(e);
    }
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = $("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
}
var by = Object.defineProperty, vy = (t, e, s) => e in t ? by(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s, Je = (t, e, s) => vy(t, typeof e != "symbol" ? e + "" : e, s);
class Ey extends nd {
  constructor(e, s) {
    super(e, s), this.core = e, this.logger = s, Je(this, "expirations", /* @__PURE__ */ new Map()), Je(this, "events", new Bs.EventEmitter()), Je(this, "name", Cf), Je(this, "version", If), Je(this, "cached", []), Je(this, "initialized", !1), Je(this, "storagePrefix", Ht), Je(this, "init", async () => {
      this.initialized || (this.logger.trace("Initialized"), await this.restore(), this.cached.forEach((r) => this.expirations.set(r.target, r)), this.cached = [], this.registerEventListeners(), this.initialized = !0);
    }), Je(this, "has", (r) => {
      try {
        const i = this.formatTarget(r);
        return typeof this.getExpiration(i) < "u";
      } catch {
        return !1;
      }
    }), Je(this, "set", (r, i) => {
      this.isInitialized();
      const n = this.formatTarget(r), o = { target: n, expiry: i };
      this.expirations.set(n, o), this.checkExpiry(n, o), this.events.emit(It.created, { target: n, expiration: o });
    }), Je(this, "get", (r) => {
      this.isInitialized();
      const i = this.formatTarget(r);
      return this.getExpiration(i);
    }), Je(this, "del", (r) => {
      if (this.isInitialized(), this.has(r)) {
        const i = this.formatTarget(r), n = this.getExpiration(i);
        this.expirations.delete(i), this.events.emit(It.deleted, { target: i, expiration: n });
      }
    }), Je(this, "on", (r, i) => {
      this.events.on(r, i);
    }), Je(this, "once", (r, i) => {
      this.events.once(r, i);
    }), Je(this, "off", (r, i) => {
      this.events.off(r, i);
    }), Je(this, "removeListener", (r, i) => {
      this.events.removeListener(r, i);
    }), this.logger = et(s, this.name);
  }
  get context() {
    return wt(this.logger);
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
    if (typeof e == "string") return Od(e);
    if (typeof e == "number") return Td(e);
    const { message: s } = $("UNKNOWN_TYPE", `Target type: ${typeof e}`);
    throw new Error(s);
  }
  async setExpirations(e) {
    await this.core.storage.setItem(this.storageKey, e);
  }
  async getExpirations() {
    return await this.core.storage.getItem(this.storageKey);
  }
  async persist() {
    await this.setExpirations(this.values), this.events.emit(It.sync);
  }
  async restore() {
    try {
      const e = await this.getExpirations();
      if (typeof e > "u" || !e.length) return;
      if (this.expirations.size) {
        const { message: s } = $("RESTORE_WILL_OVERRIDE", this.name);
        throw this.logger.error(s), new Error(s);
      }
      this.cached = e, this.logger.debug(`Successfully Restored expirations for ${this.name}`), this.logger.trace({ type: "method", method: "restore", expirations: this.values });
    } catch (e) {
      this.logger.debug(`Failed to Restore expirations for ${this.name}`), this.logger.error(e);
    }
  }
  getExpiration(e) {
    const s = this.expirations.get(e);
    if (!s) {
      const { message: r } = $("NO_MATCHING_KEY", `${this.name}: ${e}`);
      throw this.logger.warn(r), new Error(r);
    }
    return s;
  }
  checkExpiry(e, s) {
    const { expiry: r } = s;
    U.toMiliseconds(r) - Date.now() <= 0 && this.expire(e, s);
  }
  expire(e, s) {
    this.expirations.delete(e), this.events.emit(It.expired, { target: e, expiration: s });
  }
  checkExpirations() {
    this.core.relayer.connected && this.expirations.forEach((e, s) => this.checkExpiry(s, e));
  }
  registerEventListeners() {
    this.core.heartbeat.on(Ar.pulse, () => this.checkExpirations()), this.events.on(It.created, (e) => {
      const s = It.created;
      this.logger.info(`Emitting ${s}`), this.logger.debug({ type: "event", event: s, data: e }), this.persist();
    }), this.events.on(It.expired, (e) => {
      const s = It.expired;
      this.logger.info(`Emitting ${s}`), this.logger.debug({ type: "event", event: s, data: e }), this.persist();
    }), this.events.on(It.deleted, (e) => {
      const s = It.deleted;
      this.logger.info(`Emitting ${s}`), this.logger.debug({ type: "event", event: s, data: e }), this.persist();
    });
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = $("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
}
var Cy = Object.defineProperty, Iy = (t, e, s) => e in t ? Cy(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s, Te = (t, e, s) => Iy(t, typeof e != "symbol" ? e + "" : e, s);
class Ny extends od {
  constructor(e, s, r) {
    super(e, s, r), this.core = e, this.logger = s, this.store = r, Te(this, "name", Nf), Te(this, "abortController"), Te(this, "isDevEnv"), Te(this, "verifyUrlV3", _f), Te(this, "storagePrefix", Ht), Te(this, "version", gl), Te(this, "publicKey"), Te(this, "fetchPromise"), Te(this, "init", async () => {
      var i;
      this.isDevEnv || (this.publicKey = await this.store.getItem(this.storeKey), this.publicKey && U.toMiliseconds((i = this.publicKey) == null ? void 0 : i.expiresAt) < Date.now() && (this.logger.debug("verify v2 public key expired"), await this.removePublicKey()));
    }), Te(this, "register", async (i) => {
      if (!_r() || this.isDevEnv) return;
      const n = window.location.origin, { id: o, decryptedId: a } = i, c = `${this.verifyUrlV3}/attestation?projectId=${this.core.projectId}&origin=${n}&id=${o}&decryptedId=${a}`;
      try {
        const l = fr(), u = this.startAbortTimer(U.ONE_SECOND * 5), d = await new Promise((h, g) => {
          const w = () => {
            window.removeEventListener("message", f), l.body.removeChild(m), g("attestation aborted");
          };
          this.abortController.signal.addEventListener("abort", w);
          const m = l.createElement("iframe");
          m.src = c, m.style.display = "none", m.addEventListener("error", w, { signal: this.abortController.signal });
          const f = (y) => {
            if (y.data && typeof y.data == "string") try {
              const b = JSON.parse(y.data);
              if (b.type === "verify_attestation") {
                if (_n(b.attestation).payload.id !== o) return;
                clearInterval(u), l.body.removeChild(m), this.abortController.signal.removeEventListener("abort", w), window.removeEventListener("message", f), h(b.attestation === null ? "" : b.attestation);
              }
            } catch (b) {
              this.logger.warn(b);
            }
          };
          l.body.appendChild(m), window.addEventListener("message", f, { signal: this.abortController.signal });
        });
        return this.logger.debug("jwt attestation", d), d;
      } catch (l) {
        this.logger.warn(l);
      }
      return "";
    }), Te(this, "resolve", async (i) => {
      if (this.isDevEnv) return "";
      const { attestationId: n, hash: o, encryptedId: a } = i;
      if (n === "") {
        this.logger.debug("resolve: attestationId is empty, skipping");
        return;
      }
      if (n) {
        if (_n(n).payload.id !== a) return;
        const l = await this.isValidJwtAttestation(n);
        if (l) {
          if (!l.isVerified) {
            this.logger.warn("resolve: jwt attestation: origin url not verified");
            return;
          }
          return l;
        }
      }
      if (!o) return;
      const c = this.getVerifyUrl(i == null ? void 0 : i.verifyUrl);
      return this.fetchAttestation(o, c);
    }), Te(this, "fetchAttestation", async (i, n) => {
      this.logger.debug(`resolving attestation: ${i} from url: ${n}`);
      const o = this.startAbortTimer(U.ONE_SECOND * 5), a = await fetch(`${n}/attestation/${i}?v2Supported=true`, { signal: this.abortController.signal });
      return clearTimeout(o), a.status === 200 ? await a.json() : void 0;
    }), Te(this, "getVerifyUrl", (i) => {
      let n = i || Jr;
      return Sf.includes(n) || (this.logger.info(`verify url: ${n}, not included in trusted list, assigning default: ${Jr}`), n = Jr), n;
    }), Te(this, "fetchPublicKey", async () => {
      try {
        this.logger.debug(`fetching public key from: ${this.verifyUrlV3}`);
        const i = this.startAbortTimer(U.FIVE_SECONDS), n = await fetch(`${this.verifyUrlV3}/public-key`, { signal: this.abortController.signal });
        return clearTimeout(i), await n.json();
      } catch (i) {
        this.logger.warn(i);
      }
    }), Te(this, "persistPublicKey", async (i) => {
      this.logger.debug("persisting public key to local storage", i), await this.store.setItem(this.storeKey, i), this.publicKey = i;
    }), Te(this, "removePublicKey", async () => {
      this.logger.debug("removing verify v2 public key from storage"), await this.store.removeItem(this.storeKey), this.publicKey = void 0;
    }), Te(this, "isValidJwtAttestation", async (i) => {
      const n = await this.getPublicKey();
      try {
        if (n) return this.validateAttestation(i, n);
      } catch (a) {
        this.logger.error(a), this.logger.warn("error validating attestation");
      }
      const o = await this.fetchAndPersistPublicKey();
      try {
        if (o) return this.validateAttestation(i, o);
      } catch (a) {
        this.logger.error(a), this.logger.warn("error validating attestation");
      }
    }), Te(this, "getPublicKey", async () => this.publicKey ? this.publicKey : await this.fetchAndPersistPublicKey()), Te(this, "fetchAndPersistPublicKey", async () => {
      if (this.fetchPromise) return await this.fetchPromise, this.publicKey;
      this.fetchPromise = new Promise(async (n) => {
        const o = await this.fetchPublicKey();
        o && (await this.persistPublicKey(o), n(o));
      });
      const i = await this.fetchPromise;
      return this.fetchPromise = void 0, i;
    }), Te(this, "validateAttestation", (i, n) => {
      const o = ng(i, n.publicKey), a = { hasExpired: U.toMiliseconds(o.exp) < Date.now(), payload: o };
      if (a.hasExpired) throw this.logger.warn("resolve: jwt attestation expired"), new Error("JWT attestation expired");
      return { origin: a.payload.origin, isScam: a.payload.isScam, isVerified: a.payload.isVerified };
    }), this.logger = et(s, this.name), this.abortController = new AbortController(), this.isDevEnv = lo(), this.init();
  }
  get storeKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//verify:public:key";
  }
  get context() {
    return wt(this.logger);
  }
  startAbortTimer(e) {
    return this.abortController = new AbortController(), setTimeout(() => this.abortController.abort(), U.toMiliseconds(e));
  }
}
var Ay = Object.defineProperty, _y = (t, e, s) => e in t ? Ay(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s, Va = (t, e, s) => _y(t, typeof e != "symbol" ? e + "" : e, s);
class Sy extends ad {
  constructor(e, s) {
    super(e, s), this.projectId = e, this.logger = s, Va(this, "context", Pf), Va(this, "registerDeviceToken", async (r) => {
      const { clientId: i, token: n, notificationType: o, enableEncrypted: a = !1 } = r, c = `${Of}/${this.projectId}/clients`;
      await fetch(c, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ client_id: i, type: o, token: n, always_raw: a }) });
    }), this.logger = et(s, this.context);
  }
}
var Py = Object.defineProperty, Ga = Object.getOwnPropertySymbols, Oy = Object.prototype.hasOwnProperty, Ty = Object.prototype.propertyIsEnumerable, Zn = (t, e, s) => e in t ? Py(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s, Lr = (t, e) => {
  for (var s in e || (e = {})) Oy.call(e, s) && Zn(t, s, e[s]);
  if (Ga) for (var s of Ga(e)) Ty.call(e, s) && Zn(t, s, e[s]);
  return t;
}, Le = (t, e, s) => Zn(t, typeof e != "symbol" ? e + "" : e, s);
class ky extends cd {
  constructor(e, s, r = !0) {
    super(e, s, r), this.core = e, this.logger = s, Le(this, "context", kf), Le(this, "storagePrefix", Ht), Le(this, "storageVersion", Tf), Le(this, "events", /* @__PURE__ */ new Map()), Le(this, "shouldPersist", !1), Le(this, "init", async () => {
      if (!lo()) try {
        const i = { eventId: Bo(), timestamp: Date.now(), domain: this.getAppDomain(), props: { event: "INIT", type: "", properties: { client_id: await this.core.crypto.getClientId(), user_agent: Oc(this.core.relayer.protocol, this.core.relayer.version, zn) } } };
        await this.sendEvent([i]);
      } catch (i) {
        this.logger.warn(i);
      }
    }), Le(this, "createEvent", (i) => {
      const { event: n = "ERROR", type: o = "", properties: { topic: a, trace: c } } = i, l = Bo(), u = this.core.projectId || "", d = Date.now(), h = Lr({ eventId: l, timestamp: d, props: { event: n, type: o, properties: { topic: a, trace: c } }, bundleId: u, domain: this.getAppDomain() }, this.setMethods(l));
      return this.telemetryEnabled && (this.events.set(l, h), this.shouldPersist = !0), h;
    }), Le(this, "getEvent", (i) => {
      const { eventId: n, topic: o } = i;
      if (n) return this.events.get(n);
      const a = Array.from(this.events.values()).find((c) => c.props.properties.topic === o);
      if (a) return Lr(Lr({}, a), this.setMethods(a.eventId));
    }), Le(this, "deleteEvent", (i) => {
      const { eventId: n } = i;
      this.events.delete(n), this.shouldPersist = !0;
    }), Le(this, "setEventListeners", () => {
      this.core.heartbeat.on(Ar.pulse, async () => {
        this.shouldPersist && await this.persist(), this.events.forEach((i) => {
          U.fromMiliseconds(Date.now()) - U.fromMiliseconds(i.timestamp) > xf && (this.events.delete(i.eventId), this.shouldPersist = !0);
        });
      });
    }), Le(this, "setMethods", (i) => ({ addTrace: (n) => this.addTrace(i, n), setError: (n) => this.setError(i, n) })), Le(this, "addTrace", (i, n) => {
      const o = this.events.get(i);
      o && (o.props.properties.trace.push(n), this.events.set(i, o), this.shouldPersist = !0);
    }), Le(this, "setError", (i, n) => {
      const o = this.events.get(i);
      o && (o.props.type = n, o.timestamp = Date.now(), this.events.set(i, o), this.shouldPersist = !0);
    }), Le(this, "persist", async () => {
      await this.core.storage.setItem(this.storageKey, Array.from(this.events.values())), this.shouldPersist = !1;
    }), Le(this, "restore", async () => {
      try {
        const i = await this.core.storage.getItem(this.storageKey) || [];
        if (!i.length) return;
        i.forEach((n) => {
          this.events.set(n.eventId, Lr(Lr({}, n), this.setMethods(n.eventId)));
        });
      } catch (i) {
        this.logger.warn(i);
      }
    }), Le(this, "submit", async () => {
      if (!this.telemetryEnabled || this.events.size === 0) return;
      const i = [];
      for (const [n, o] of this.events) o.props.type && i.push(o);
      if (i.length !== 0) try {
        if ((await this.sendEvent(i)).ok) for (const n of i) this.events.delete(n.eventId), this.shouldPersist = !0;
      } catch (n) {
        this.logger.warn(n);
      }
    }), Le(this, "sendEvent", async (i) => {
      const n = this.getAppDomain() ? "" : "&sp=desktop";
      return await fetch(`${Rf}?projectId=${this.core.projectId}&st=events_sdk&sv=js-${zn}${n}`, { method: "POST", body: JSON.stringify(i) });
    }), Le(this, "getAppDomain", () => Pc().url), this.logger = et(s, this.context), this.telemetryEnabled = r, r ? this.restore().then(async () => {
      await this.submit(), this.setEventListeners();
    }) : this.persist();
  }
  get storageKey() {
    return this.storagePrefix + this.storageVersion + this.core.customStoragePrefix + "//" + this.context;
  }
}
var xy = Object.defineProperty, Ja = Object.getOwnPropertySymbols, Ry = Object.prototype.hasOwnProperty, $y = Object.prototype.propertyIsEnumerable, Qn = (t, e, s) => e in t ? xy(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s, Ya = (t, e) => {
  for (var s in e || (e = {})) Ry.call(e, s) && Qn(t, s, e[s]);
  if (Ja) for (var s of Ja(e)) $y.call(e, s) && Qn(t, s, e[s]);
  return t;
}, Ie = (t, e, s) => Qn(t, typeof e != "symbol" ? e + "" : e, s);
let Uy = class Pl extends Ju {
  constructor(e) {
    var s;
    super(e), Ie(this, "protocol", pl), Ie(this, "version", gl), Ie(this, "name", Wn), Ie(this, "relayUrl"), Ie(this, "projectId"), Ie(this, "customStoragePrefix"), Ie(this, "events", new Bs.EventEmitter()), Ie(this, "logger"), Ie(this, "heartbeat"), Ie(this, "relayer"), Ie(this, "crypto"), Ie(this, "storage"), Ie(this, "history"), Ie(this, "expirer"), Ie(this, "pairing"), Ie(this, "verify"), Ie(this, "echoClient"), Ie(this, "linkModeSupportedApps"), Ie(this, "eventClient"), Ie(this, "initialized", !1), Ie(this, "logChunkController"), Ie(this, "on", (a, c) => this.events.on(a, c)), Ie(this, "once", (a, c) => this.events.once(a, c)), Ie(this, "off", (a, c) => this.events.off(a, c)), Ie(this, "removeListener", (a, c) => this.events.removeListener(a, c)), Ie(this, "dispatchEnvelope", ({ topic: a, message: c, sessionExists: l }) => {
      if (!a || !c) return;
      const u = { topic: a, message: c, publishedAt: Date.now(), transportType: Ne.link_mode };
      this.relayer.onLinkMessageEvent(u, { sessionExists: l });
    });
    const r = this.getGlobalCore(e == null ? void 0 : e.customStoragePrefix);
    if (r) try {
      return this.customStoragePrefix = r.customStoragePrefix, this.logger = r.logger, this.heartbeat = r.heartbeat, this.crypto = r.crypto, this.history = r.history, this.expirer = r.expirer, this.storage = r.storage, this.relayer = r.relayer, this.pairing = r.pairing, this.verify = r.verify, this.echoClient = r.echoClient, this.linkModeSupportedApps = r.linkModeSupportedApps, this.eventClient = r.eventClient, this.initialized = r.initialized, this.logChunkController = r.logChunkController, r;
    } catch (a) {
      console.warn("Failed to copy global core", a);
    }
    this.projectId = e == null ? void 0 : e.projectId, this.relayUrl = (e == null ? void 0 : e.relayUrl) || ml, this.customStoragePrefix = e != null && e.customStoragePrefix ? `:${e.customStoragePrefix}` : "";
    const i = ni({ level: typeof (e == null ? void 0 : e.logger) == "string" && e.logger ? e.logger : ef.logger, name: Wn }), { logger: n, chunkLoggerController: o } = vc({ opts: i, maxSizeInBytes: e == null ? void 0 : e.maxLogBlobSizeInBytes, loggerOverride: e == null ? void 0 : e.logger });
    this.logChunkController = o, (s = this.logChunkController) != null && s.downloadLogsBlobInBrowser && (window.downloadLogsBlobInBrowser = async () => {
      var a, c;
      (a = this.logChunkController) != null && a.downloadLogsBlobInBrowser && ((c = this.logChunkController) == null || c.downloadLogsBlobInBrowser({ clientId: await this.crypto.getClientId() }));
    }), this.logger = et(n, this.name), this.heartbeat = new Jl(), this.crypto = new cw(this, this.logger, e == null ? void 0 : e.keychain), this.history = new yy(this, this.logger), this.expirer = new Ey(this, this.logger), this.storage = e != null && e.storage ? e.storage : new Yl(Ya(Ya({}, tf), e == null ? void 0 : e.storageOptions)), this.relayer = new Uw({ core: this, logger: this.logger, relayUrl: this.relayUrl, projectId: this.projectId }), this.pairing = new fy(this, this.logger), this.verify = new Ny(this, this.logger, this.storage), this.echoClient = new Sy(this.projectId || "", this.logger), this.linkModeSupportedApps = [], this.eventClient = new ky(this, this.logger, e == null ? void 0 : e.telemetryEnabled), this.setGlobalCore(this);
  }
  static async init(e) {
    const s = new Pl(e);
    await s.initialize();
    const r = await s.crypto.getClientId();
    return await s.storage.setItem(ff, r), s;
  }
  get context() {
    return wt(this.logger);
  }
  async start() {
    this.initialized || await this.initialize();
  }
  async getLogsBlob() {
    var e;
    return (e = this.logChunkController) == null ? void 0 : e.logsToBlob({ clientId: await this.crypto.getClientId() });
  }
  async addLinkModeSupportedApp(e) {
    this.linkModeSupportedApps.includes(e) || (this.linkModeSupportedApps.push(e), await this.storage.setItem(Oa, this.linkModeSupportedApps));
  }
  async initialize() {
    this.logger.trace("Initialized");
    try {
      await this.crypto.init(), await this.history.init(), await this.expirer.init(), await this.relayer.init(), await this.heartbeat.init(), await this.pairing.init(), this.linkModeSupportedApps = await this.storage.getItem(Oa) || [], this.initialized = !0, this.logger.info("Core Initialization Success");
    } catch (e) {
      throw this.logger.warn(`Core Initialization Failure at epoch ${Date.now()}`, e), this.logger.error(e.message), e;
    }
  }
  getGlobalCore(e = "") {
    try {
      if (this.isGlobalCoreDisabled()) return;
      const s = `_walletConnectCore_${e}`, r = `${s}_count`;
      return globalThis[r] = (globalThis[r] || 0) + 1, globalThis[r] > 1 && console.warn(`WalletConnect Core is already initialized. This is probably a mistake and can lead to unexpected behavior. Init() was called ${globalThis[r]} times.`), globalThis[s];
    } catch (s) {
      console.warn("Failed to get global WalletConnect core", s);
      return;
    }
  }
  setGlobalCore(e) {
    var s;
    try {
      if (this.isGlobalCoreDisabled()) return;
      const r = `_walletConnectCore_${((s = e.opts) == null ? void 0 : s.customStoragePrefix) || ""}`;
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
const Dy = Uy, Ol = "wc", Tl = 2, kl = "client", yo = `${Ol}@${Tl}:${kl}:`, bn = { name: kl, logger: "error" }, Xa = "WALLETCONNECT_DEEPLINK_CHOICE", Ly = "proposal", Za = "Proposal expired", Fy = "session", Vs = U.SEVEN_DAYS, My = "engine", Fe = { wc_sessionPropose: { req: { ttl: U.FIVE_MINUTES, prompt: !0, tag: 1100 }, res: { ttl: U.FIVE_MINUTES, prompt: !1, tag: 1101 }, reject: { ttl: U.FIVE_MINUTES, prompt: !1, tag: 1120 }, autoReject: { ttl: U.FIVE_MINUTES, prompt: !1, tag: 1121 } }, wc_sessionSettle: { req: { ttl: U.FIVE_MINUTES, prompt: !1, tag: 1102 }, res: { ttl: U.FIVE_MINUTES, prompt: !1, tag: 1103 } }, wc_sessionUpdate: { req: { ttl: U.ONE_DAY, prompt: !1, tag: 1104 }, res: { ttl: U.ONE_DAY, prompt: !1, tag: 1105 } }, wc_sessionExtend: { req: { ttl: U.ONE_DAY, prompt: !1, tag: 1106 }, res: { ttl: U.ONE_DAY, prompt: !1, tag: 1107 } }, wc_sessionRequest: { req: { ttl: U.FIVE_MINUTES, prompt: !0, tag: 1108 }, res: { ttl: U.FIVE_MINUTES, prompt: !1, tag: 1109 } }, wc_sessionEvent: { req: { ttl: U.FIVE_MINUTES, prompt: !0, tag: 1110 }, res: { ttl: U.FIVE_MINUTES, prompt: !1, tag: 1111 } }, wc_sessionDelete: { req: { ttl: U.ONE_DAY, prompt: !1, tag: 1112 }, res: { ttl: U.ONE_DAY, prompt: !1, tag: 1113 } }, wc_sessionPing: { req: { ttl: U.ONE_DAY, prompt: !1, tag: 1114 }, res: { ttl: U.ONE_DAY, prompt: !1, tag: 1115 } }, wc_sessionAuthenticate: { req: { ttl: U.ONE_HOUR, prompt: !0, tag: 1116 }, res: { ttl: U.ONE_HOUR, prompt: !1, tag: 1117 }, reject: { ttl: U.FIVE_MINUTES, prompt: !1, tag: 1118 }, autoReject: { ttl: U.FIVE_MINUTES, prompt: !1, tag: 1119 } } }, vn = { min: U.FIVE_MINUTES, max: U.SEVEN_DAYS }, Mt = { idle: "IDLE", active: "ACTIVE" }, Qa = { eth_sendTransaction: { key: "" }, eth_sendRawTransaction: { key: "" }, wallet_sendCalls: { key: "" }, solana_signTransaction: { key: "signature" }, solana_signAllTransactions: { key: "transactions" }, solana_signAndSendTransaction: { key: "signature" } }, By = "request", qy = ["wc_sessionPropose", "wc_sessionRequest", "wc_authRequest", "wc_sessionAuthenticate"], jy = "wc", Wy = "auth", zy = "authKeys", Hy = "pairingTopics", Ky = "requests", Yi = `${jy}@${1.5}:${Wy}:`, xi = `${Yi}:PUB_KEY`;
var Vy = Object.defineProperty, Gy = Object.defineProperties, Jy = Object.getOwnPropertyDescriptors, ec = Object.getOwnPropertySymbols, Yy = Object.prototype.hasOwnProperty, Xy = Object.prototype.propertyIsEnumerable, eo = (t, e, s) => e in t ? Vy(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s, be = (t, e) => {
  for (var s in e || (e = {})) Yy.call(e, s) && eo(t, s, e[s]);
  if (ec) for (var s of ec(e)) Xy.call(e, s) && eo(t, s, e[s]);
  return t;
}, Ze = (t, e) => Gy(t, Jy(e)), N = (t, e, s) => eo(t, typeof e != "symbol" ? e + "" : e, s);
class Zy extends hd {
  constructor(e) {
    super(e), N(this, "name", My), N(this, "events", new co()), N(this, "initialized", !1), N(this, "requestQueue", { state: Mt.idle, queue: [] }), N(this, "sessionRequestQueue", { state: Mt.idle, queue: [] }), N(this, "requestQueueDelay", U.ONE_SECOND), N(this, "expectedPairingMethodMap", /* @__PURE__ */ new Map()), N(this, "recentlyDeletedMap", /* @__PURE__ */ new Map()), N(this, "recentlyDeletedLimit", 200), N(this, "relayMessageCache", []), N(this, "pendingSessions", /* @__PURE__ */ new Map()), N(this, "init", async () => {
      this.initialized || (await this.cleanup(), this.registerRelayerEvents(), this.registerExpirerEvents(), this.registerPairingEvents(), await this.registerLinkModeListeners(), this.client.core.pairing.register({ methods: Object.keys(Fe) }), this.initialized = !0, setTimeout(async () => {
        await this.processPendingMessageEvents(), this.sessionRequestQueue.queue = this.getPendingSessionRequests(), this.processSessionRequestQueue();
      }, U.toMiliseconds(this.requestQueueDelay)));
    }), N(this, "connect", async (s) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      const r = Ze(be({}, s), { requiredNamespaces: s.requiredNamespaces || {}, optionalNamespaces: s.optionalNamespaces || {} });
      await this.isValidConnect(r), r.optionalNamespaces = Eg(r.requiredNamespaces, r.optionalNamespaces), r.requiredNamespaces = {};
      const { pairingTopic: i, requiredNamespaces: n, optionalNamespaces: o, sessionProperties: a, scopedProperties: c, relays: l } = r;
      let u = i, d, h = !1;
      try {
        if (u) {
          const P = this.client.core.pairing.pairings.get(u);
          this.client.logger.warn("connect() with existing pairing topic is deprecated and will be removed in the next major release."), h = P.active;
        }
      } catch (P) {
        throw this.client.logger.error(`connect() -> pairing.get(${u}) failed`), P;
      }
      if (!u || !h) {
        const { topic: P, uri: S } = await this.client.core.pairing.create();
        u = P, d = S;
      }
      if (!u) {
        const { message: P } = $("NO_MATCHING_KEY", `connect() pairing topic: ${u}`);
        throw new Error(P);
      }
      const g = await this.client.core.crypto.generateKeyPair(), w = Fe.wc_sessionPropose.req.ttl || U.FIVE_MINUTES, m = Ue(w), f = Ze(be(be({ requiredNamespaces: n, optionalNamespaces: o, relays: l ?? [{ protocol: fl }], proposer: { publicKey: g, metadata: this.client.metadata }, expiryTimestamp: m, pairingTopic: u }, a && { sessionProperties: a }), c && { scopedProperties: c }), { id: is() }), y = pe("session_connect", f.id), { reject: b, resolve: E, done: _ } = Ps(w, Za), x = ({ id: P }) => {
        P === f.id && (this.client.events.off("proposal_expire", x), this.pendingSessions.delete(f.id), this.events.emit(y, { error: { message: Za, code: 0 } }));
      };
      return this.client.events.on("proposal_expire", x), this.events.once(y, ({ error: P, session: S }) => {
        this.client.events.off("proposal_expire", x), P ? b(P) : S && E(S);
      }), await this.sendRequest({ topic: u, method: "wc_sessionPropose", params: f, throwOnFailedPublish: !0, clientRpcId: f.id }), await this.setProposal(f.id, f), { uri: d, approval: _ };
    }), N(this, "pair", async (s) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      try {
        return await this.client.core.pairing.pair(s);
      } catch (r) {
        throw this.client.logger.error("pair() failed"), r;
      }
    }), N(this, "approve", async (s) => {
      var r, i, n;
      const o = this.client.core.eventClient.createEvent({ properties: { topic: (r = s == null ? void 0 : s.id) == null ? void 0 : r.toString(), trace: [Ot.session_approve_started] } });
      try {
        this.isInitialized(), await this.confirmOnlineStateOrThrow();
      } catch (v) {
        throw o.setError(As.no_internet_connection), v;
      }
      try {
        await this.isValidProposalId(s == null ? void 0 : s.id);
      } catch (v) {
        throw this.client.logger.error(`approve() -> proposal.get(${s == null ? void 0 : s.id}) failed`), o.setError(As.proposal_not_found), v;
      }
      try {
        await this.isValidApprove(s);
      } catch (v) {
        throw this.client.logger.error("approve() -> isValidApprove() failed"), o.setError(As.session_approve_namespace_validation_failure), v;
      }
      const { id: a, relayProtocol: c, namespaces: l, sessionProperties: u, scopedProperties: d, sessionConfig: h } = s, g = this.client.proposal.get(a);
      this.client.core.eventClient.deleteEvent({ eventId: o.eventId });
      const { pairingTopic: w, proposer: m, requiredNamespaces: f, optionalNamespaces: y } = g;
      let b = (i = this.client.core.eventClient) == null ? void 0 : i.getEvent({ topic: w });
      b || (b = (n = this.client.core.eventClient) == null ? void 0 : n.createEvent({ type: Ot.session_approve_started, properties: { topic: w, trace: [Ot.session_approve_started, Ot.session_namespaces_validation_success] } }));
      const E = await this.client.core.crypto.generateKeyPair(), _ = m.publicKey, x = await this.client.core.crypto.generateSharedKey(E, _), P = be(be(be({ relay: { protocol: c ?? "irn" }, namespaces: l, controller: { publicKey: E, metadata: this.client.metadata }, expiry: Ue(Vs) }, u && { sessionProperties: u }), d && { scopedProperties: d }), h && { sessionConfig: h }), S = Ne.relay;
      b.addTrace(Ot.subscribing_session_topic);
      try {
        await this.client.core.relayer.subscribe(x, { transportType: S });
      } catch (v) {
        throw b.setError(As.subscribe_session_topic_failure), v;
      }
      b.addTrace(Ot.subscribe_session_topic_success);
      const D = Ze(be({}, P), { topic: x, requiredNamespaces: f, optionalNamespaces: y, pairingTopic: w, acknowledged: !1, self: P.controller, peer: { publicKey: m.publicKey, metadata: m.metadata }, controller: E, transportType: Ne.relay });
      await this.client.session.set(x, D), b.addTrace(Ot.store_session);
      try {
        b.addTrace(Ot.publishing_session_settle), await this.sendRequest({ topic: x, method: "wc_sessionSettle", params: P, throwOnFailedPublish: !0 }).catch((v) => {
          throw b == null || b.setError(As.session_settle_publish_failure), v;
        }), b.addTrace(Ot.session_settle_publish_success), b.addTrace(Ot.publishing_session_approve), await this.sendResult({ id: a, topic: w, result: { relay: { protocol: c ?? "irn" }, responderPublicKey: E }, throwOnFailedPublish: !0 }).catch((v) => {
          throw b == null || b.setError(As.session_approve_publish_failure), v;
        }), b.addTrace(Ot.session_approve_publish_success);
      } catch (v) {
        throw this.client.logger.error(v), this.client.session.delete(x, me("USER_DISCONNECTED")), await this.client.core.relayer.unsubscribe(x), v;
      }
      return this.client.core.eventClient.deleteEvent({ eventId: b.eventId }), await this.client.core.pairing.updateMetadata({ topic: w, metadata: m.metadata }), await this.client.proposal.delete(a, me("USER_DISCONNECTED")), await this.client.core.pairing.activate({ topic: w }), await this.setExpiry(x, Ue(Vs)), { topic: x, acknowledged: () => Promise.resolve(this.client.session.get(x)) };
    }), N(this, "reject", async (s) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      try {
        await this.isValidReject(s);
      } catch (o) {
        throw this.client.logger.error("reject() -> isValidReject() failed"), o;
      }
      const { id: r, reason: i } = s;
      let n;
      try {
        n = this.client.proposal.get(r).pairingTopic;
      } catch (o) {
        throw this.client.logger.error(`reject() -> proposal.get(${r}) failed`), o;
      }
      n && (await this.sendError({ id: r, topic: n, error: i, rpcOpts: Fe.wc_sessionPropose.reject }), await this.client.proposal.delete(r, me("USER_DISCONNECTED")));
    }), N(this, "update", async (s) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      try {
        await this.isValidUpdate(s);
      } catch (d) {
        throw this.client.logger.error("update() -> isValidUpdate() failed"), d;
      }
      const { topic: r, namespaces: i } = s, { done: n, resolve: o, reject: a } = Ps(), c = is(), l = cr().toString(), u = this.client.session.get(r).namespaces;
      return this.events.once(pe("session_update", c), ({ error: d }) => {
        d ? a(d) : o();
      }), await this.client.session.update(r, { namespaces: i }), await this.sendRequest({ topic: r, method: "wc_sessionUpdate", params: { namespaces: i }, throwOnFailedPublish: !0, clientRpcId: c, relayRpcId: l }).catch((d) => {
        this.client.logger.error(d), this.client.session.update(r, { namespaces: u }), a(d);
      }), { acknowledged: n };
    }), N(this, "extend", async (s) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      try {
        await this.isValidExtend(s);
      } catch (c) {
        throw this.client.logger.error("extend() -> isValidExtend() failed"), c;
      }
      const { topic: r } = s, i = is(), { done: n, resolve: o, reject: a } = Ps();
      return this.events.once(pe("session_extend", i), ({ error: c }) => {
        c ? a(c) : o();
      }), await this.setExpiry(r, Ue(Vs)), this.sendRequest({ topic: r, method: "wc_sessionExtend", params: {}, clientRpcId: i, throwOnFailedPublish: !0 }).catch((c) => {
        a(c);
      }), { acknowledged: n };
    }), N(this, "request", async (s) => {
      this.isInitialized();
      try {
        await this.isValidRequest(s);
      } catch (y) {
        throw this.client.logger.error("request() -> isValidRequest() failed"), y;
      }
      const { chainId: r, request: i, topic: n, expiry: o = Fe.wc_sessionRequest.req.ttl } = s, a = this.client.session.get(n);
      (a == null ? void 0 : a.transportType) === Ne.relay && await this.confirmOnlineStateOrThrow();
      const c = is(), l = cr().toString(), { done: u, resolve: d, reject: h } = Ps(o, "Request expired. Please try again.");
      this.events.once(pe("session_request", c), ({ error: y, result: b }) => {
        y ? h(y) : d(b);
      });
      const g = "wc_sessionRequest", w = this.getAppLinkIfEnabled(a.peer.metadata, a.transportType);
      if (w) return await this.sendRequest({ clientRpcId: c, relayRpcId: l, topic: n, method: g, params: { request: Ze(be({}, i), { expiryTimestamp: Ue(o) }), chainId: r }, expiry: o, throwOnFailedPublish: !0, appLink: w }).catch((y) => h(y)), this.client.events.emit("session_request_sent", { topic: n, request: i, chainId: r, id: c }), await u();
      const m = { request: Ze(be({}, i), { expiryTimestamp: Ue(o) }), chainId: r }, f = this.shouldSetTVF(g, m);
      return await Promise.all([new Promise(async (y) => {
        await this.sendRequest(be({ clientRpcId: c, relayRpcId: l, topic: n, method: g, params: m, expiry: o, throwOnFailedPublish: !0 }, f && { tvf: this.getTVFParams(c, m) })).catch((b) => h(b)), this.client.events.emit("session_request_sent", { topic: n, request: i, chainId: r, id: c }), y();
      }), new Promise(async (y) => {
        var b;
        if (!((b = a.sessionConfig) != null && b.disableDeepLink)) {
          const E = await $d(this.client.core.storage, Xa);
          await kd({ id: c, topic: n, wcDeepLink: E });
        }
        y();
      }), u()]).then((y) => y[2]);
    }), N(this, "respond", async (s) => {
      this.isInitialized(), await this.isValidRespond(s);
      const { topic: r, response: i } = s, { id: n } = i, o = this.client.session.get(r);
      o.transportType === Ne.relay && await this.confirmOnlineStateOrThrow();
      const a = this.getAppLinkIfEnabled(o.peer.metadata, o.transportType);
      Zt(i) ? await this.sendResult({ id: n, topic: r, result: i.result, throwOnFailedPublish: !0, appLink: a }) : qt(i) && await this.sendError({ id: n, topic: r, error: i.error, appLink: a }), this.cleanupAfterResponse(s);
    }), N(this, "ping", async (s) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      try {
        await this.isValidPing(s);
      } catch (i) {
        throw this.client.logger.error("ping() -> isValidPing() failed"), i;
      }
      const { topic: r } = s;
      if (this.client.session.keys.includes(r)) {
        const i = is(), n = cr().toString(), { done: o, resolve: a, reject: c } = Ps();
        this.events.once(pe("session_ping", i), ({ error: l }) => {
          l ? c(l) : a();
        }), await Promise.all([this.sendRequest({ topic: r, method: "wc_sessionPing", params: {}, throwOnFailedPublish: !0, clientRpcId: i, relayRpcId: n }), o()]);
      } else this.client.core.pairing.pairings.keys.includes(r) && (this.client.logger.warn("ping() on pairing topic is deprecated and will be removed in the next major release."), await this.client.core.pairing.ping({ topic: r }));
    }), N(this, "emit", async (s) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow(), await this.isValidEmit(s);
      const { topic: r, event: i, chainId: n } = s, o = cr().toString(), a = is();
      await this.sendRequest({ topic: r, method: "wc_sessionEvent", params: { event: i, chainId: n }, throwOnFailedPublish: !0, relayRpcId: o, clientRpcId: a });
    }), N(this, "disconnect", async (s) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow(), await this.isValidDisconnect(s);
      const { topic: r } = s;
      if (this.client.session.keys.includes(r)) await this.sendRequest({ topic: r, method: "wc_sessionDelete", params: me("USER_DISCONNECTED"), throwOnFailedPublish: !0 }), await this.deleteSession({ topic: r, emitEvent: !1 });
      else if (this.client.core.pairing.pairings.keys.includes(r)) await this.client.core.pairing.disconnect({ topic: r });
      else {
        const { message: i } = $("MISMATCHED_TOPIC", `Session or pairing topic not found: ${r}`);
        throw new Error(i);
      }
    }), N(this, "find", (s) => (this.isInitialized(), this.client.session.getAll().filter((r) => Ng(r, s)))), N(this, "getPendingSessionRequests", () => this.client.pendingRequest.getAll()), N(this, "authenticate", async (s, r) => {
      var i;
      this.isInitialized(), this.isValidAuthenticate(s);
      const n = r && this.client.core.linkModeSupportedApps.includes(r) && ((i = this.client.metadata.redirect) == null ? void 0 : i.linkMode), o = n ? Ne.link_mode : Ne.relay;
      o === Ne.relay && await this.confirmOnlineStateOrThrow();
      const { chains: a, statement: c = "", uri: l, domain: u, nonce: d, type: h, exp: g, nbf: w, methods: m = [], expiry: f } = s, y = [...s.resources || []], { topic: b, uri: E } = await this.client.core.pairing.create({ methods: ["wc_sessionAuthenticate"], transportType: o });
      this.client.logger.info({ message: "Generated new pairing", pairing: { topic: b, uri: E } });
      const _ = await this.client.core.crypto.generateKeyPair(), x = Ti(_);
      if (await Promise.all([this.client.auth.authKeys.set(xi, { responseTopic: x, publicKey: _ }), this.client.auth.pairingTopics.set(x, { topic: x, pairingTopic: b })]), await this.client.core.relayer.subscribe(x, { transportType: o }), this.client.logger.info(`sending request to new pairing topic: ${b}`), m.length > 0) {
        const { namespace: k } = pr(a[0]);
        let G = _h(k, "request", m);
        Oi(y) && (G = Ph(G, y.pop())), y.push(G);
      }
      const P = f && f > Fe.wc_sessionAuthenticate.req.ttl ? f : Fe.wc_sessionAuthenticate.req.ttl, S = { authPayload: { type: h ?? "caip122", chains: a, statement: c, aud: l, domain: u, version: "1", nonce: d, iat: (/* @__PURE__ */ new Date()).toISOString(), exp: g, nbf: w, resources: y }, requester: { publicKey: _, metadata: this.client.metadata }, expiryTimestamp: Ue(P) }, D = { eip155: { chains: a, methods: [.../* @__PURE__ */ new Set(["personal_sign", ...m])], events: ["chainChanged", "accountsChanged"] } }, v = { requiredNamespaces: {}, optionalNamespaces: D, relays: [{ protocol: "irn" }], pairingTopic: b, proposer: { publicKey: _, metadata: this.client.metadata }, expiryTimestamp: Ue(Fe.wc_sessionPropose.req.ttl), id: is() }, { done: R, resolve: C, reject: L } = Ps(P, "Request expired"), H = is(), I = pe("session_connect", v.id), T = pe("session_request", H), A = async ({ error: k, session: G }) => {
        this.events.off(T, M), k ? L(k) : G && C({ session: G });
      }, M = async (k) => {
        var G, Q, se;
        if (await this.deletePendingAuthRequest(H, { message: "fulfilled", code: 0 }), k.error) {
          const Re = me("WC_METHOD_UNSUPPORTED", "wc_sessionAuthenticate");
          return k.error.code === Re.code ? void 0 : (this.events.off(I, A), L(k.error.message));
        }
        await this.deleteProposal(v.id), this.events.off(I, A);
        const { cacaos: Ee, responder: he } = k.result, Oe = [], De = [];
        for (const Re of Ee) {
          await Go({ cacao: Re, projectId: this.client.core.projectId }) || (this.client.logger.error(Re, "Signature verification failed"), L(me("SESSION_SETTLEMENT_FAILED", "Signature verification failed")));
          const { p: Is } = Re, Kt = Oi(Is.resources), Dt = [Rn(Is.iss)], Vt = Li(Is.iss);
          if (Kt) {
            const Gt = Jo(Kt), fi = Yo(Kt);
            Oe.push(...Gt), Dt.push(...fi);
          }
          for (const Gt of Dt) De.push(`${Gt}:${Vt}`);
        }
        const Ge = await this.client.core.crypto.generateSharedKey(_, he.publicKey);
        let xe;
        Oe.length > 0 && (xe = { topic: Ge, acknowledged: !0, self: { publicKey: _, metadata: this.client.metadata }, peer: he, controller: he.publicKey, expiry: Ue(Vs), requiredNamespaces: {}, optionalNamespaces: {}, relay: { protocol: "irn" }, pairingTopic: b, namespaces: Ea([...new Set(Oe)], [...new Set(De)]), transportType: o }, await this.client.core.relayer.subscribe(Ge, { transportType: o }), await this.client.session.set(Ge, xe), b && await this.client.core.pairing.updateMetadata({ topic: b, metadata: he.metadata }), xe = this.client.session.get(Ge)), (G = this.client.metadata.redirect) != null && G.linkMode && (Q = he.metadata.redirect) != null && Q.linkMode && (se = he.metadata.redirect) != null && se.universal && r && (this.client.core.addLinkModeSupportedApp(he.metadata.redirect.universal), this.client.session.update(Ge, { transportType: Ne.link_mode })), C({ auths: Ee, session: xe });
      };
      this.events.once(I, A), this.events.once(T, M);
      let q;
      try {
        if (n) {
          const k = Rs("wc_sessionAuthenticate", S, H);
          this.client.core.history.set(b, k);
          const G = await this.client.core.crypto.encode("", k, { type: hi, encoding: ps });
          q = Ei(r, b, G);
        } else await Promise.all([this.sendRequest({ topic: b, method: "wc_sessionAuthenticate", params: S, expiry: s.expiry, throwOnFailedPublish: !0, clientRpcId: H }), this.sendRequest({ topic: b, method: "wc_sessionPropose", params: v, expiry: Fe.wc_sessionPropose.req.ttl, throwOnFailedPublish: !0, clientRpcId: v.id })]);
      } catch (k) {
        throw this.events.off(I, A), this.events.off(T, M), k;
      }
      return await this.setProposal(v.id, v), await this.setAuthRequest(H, { request: Ze(be({}, S), { verifyContext: {} }), pairingTopic: b, transportType: o }), { uri: q ?? E, response: R };
    }), N(this, "approveSessionAuthenticate", async (s) => {
      const { id: r, auths: i } = s, n = this.client.core.eventClient.createEvent({ properties: { topic: r.toString(), trace: [_s.authenticated_session_approve_started] } });
      try {
        this.isInitialized();
      } catch (f) {
        throw n.setError(Ur.no_internet_connection), f;
      }
      const o = this.getPendingAuthRequest(r);
      if (!o) throw n.setError(Ur.authenticated_session_pending_request_not_found), new Error(`Could not find pending auth request with id ${r}`);
      const a = o.transportType || Ne.relay;
      a === Ne.relay && await this.confirmOnlineStateOrThrow();
      const c = o.requester.publicKey, l = await this.client.core.crypto.generateKeyPair(), u = Ti(c), d = { type: rs, receiverPublicKey: c, senderPublicKey: l }, h = [], g = [];
      for (const f of i) {
        if (!await Go({ cacao: f, projectId: this.client.core.projectId })) {
          n.setError(Ur.invalid_cacao);
          const x = me("SESSION_SETTLEMENT_FAILED", "Signature verification failed");
          throw await this.sendError({ id: r, topic: u, error: x, encodeOpts: d }), new Error(x.message);
        }
        n.addTrace(_s.cacaos_verified);
        const { p: y } = f, b = Oi(y.resources), E = [Rn(y.iss)], _ = Li(y.iss);
        if (b) {
          const x = Jo(b), P = Yo(b);
          h.push(...x), E.push(...P);
        }
        for (const x of E) g.push(`${x}:${_}`);
      }
      const w = await this.client.core.crypto.generateSharedKey(l, c);
      n.addTrace(_s.create_authenticated_session_topic);
      let m;
      if ((h == null ? void 0 : h.length) > 0) {
        m = { topic: w, acknowledged: !0, self: { publicKey: l, metadata: this.client.metadata }, peer: { publicKey: c, metadata: o.requester.metadata }, controller: c, expiry: Ue(Vs), authentication: i, requiredNamespaces: {}, optionalNamespaces: {}, relay: { protocol: "irn" }, pairingTopic: o.pairingTopic, namespaces: Ea([...new Set(h)], [...new Set(g)]), transportType: a }, n.addTrace(_s.subscribing_authenticated_session_topic);
        try {
          await this.client.core.relayer.subscribe(w, { transportType: a });
        } catch (f) {
          throw n.setError(Ur.subscribe_authenticated_session_topic_failure), f;
        }
        n.addTrace(_s.subscribe_authenticated_session_topic_success), await this.client.session.set(w, m), n.addTrace(_s.store_authenticated_session), await this.client.core.pairing.updateMetadata({ topic: o.pairingTopic, metadata: o.requester.metadata });
      }
      n.addTrace(_s.publishing_authenticated_session_approve);
      try {
        await this.sendResult({ topic: u, id: r, result: { cacaos: i, responder: { publicKey: l, metadata: this.client.metadata } }, encodeOpts: d, throwOnFailedPublish: !0, appLink: this.getAppLinkIfEnabled(o.requester.metadata, a) });
      } catch (f) {
        throw n.setError(Ur.authenticated_session_approve_publish_failure), f;
      }
      return await this.client.auth.requests.delete(r, { message: "fulfilled", code: 0 }), await this.client.core.pairing.activate({ topic: o.pairingTopic }), this.client.core.eventClient.deleteEvent({ eventId: n.eventId }), { session: m };
    }), N(this, "rejectSessionAuthenticate", async (s) => {
      this.isInitialized();
      const { id: r, reason: i } = s, n = this.getPendingAuthRequest(r);
      if (!n) throw new Error(`Could not find pending auth request with id ${r}`);
      n.transportType === Ne.relay && await this.confirmOnlineStateOrThrow();
      const o = n.requester.publicKey, a = await this.client.core.crypto.generateKeyPair(), c = Ti(o), l = { type: rs, receiverPublicKey: o, senderPublicKey: a };
      await this.sendError({ id: r, topic: c, error: i, encodeOpts: l, rpcOpts: Fe.wc_sessionAuthenticate.reject, appLink: this.getAppLinkIfEnabled(n.requester.metadata, n.transportType) }), await this.client.auth.requests.delete(r, { message: "rejected", code: 0 }), await this.client.proposal.delete(r, me("USER_DISCONNECTED"));
    }), N(this, "formatAuthMessage", (s) => {
      this.isInitialized();
      const { request: r, iss: i } = s;
      return Bc(r, i);
    }), N(this, "processRelayMessageCache", () => {
      setTimeout(async () => {
        if (this.relayMessageCache.length !== 0) for (; this.relayMessageCache.length > 0; ) try {
          const s = this.relayMessageCache.shift();
          s && await this.onRelayMessage(s);
        } catch (s) {
          this.client.logger.error(s);
        }
      }, 50);
    }), N(this, "cleanupDuplicatePairings", async (s) => {
      if (s.pairingTopic) try {
        const r = this.client.core.pairing.pairings.get(s.pairingTopic), i = this.client.core.pairing.pairings.getAll().filter((n) => {
          var o, a;
          return ((o = n.peerMetadata) == null ? void 0 : o.url) && ((a = n.peerMetadata) == null ? void 0 : a.url) === s.peer.metadata.url && n.topic && n.topic !== r.topic;
        });
        if (i.length === 0) return;
        this.client.logger.info(`Cleaning up ${i.length} duplicate pairing(s)`), await Promise.all(i.map((n) => this.client.core.pairing.disconnect({ topic: n.topic }))), this.client.logger.info("Duplicate pairings clean up finished");
      } catch (r) {
        this.client.logger.error(r);
      }
    }), N(this, "deleteSession", async (s) => {
      var r;
      const { topic: i, expirerHasDeleted: n = !1, emitEvent: o = !0, id: a = 0 } = s, { self: c } = this.client.session.get(i);
      await this.client.core.relayer.unsubscribe(i), await this.client.session.delete(i, me("USER_DISCONNECTED")), this.addToRecentlyDeleted(i, "session"), this.client.core.crypto.keychain.has(c.publicKey) && await this.client.core.crypto.deleteKeyPair(c.publicKey), this.client.core.crypto.keychain.has(i) && await this.client.core.crypto.deleteSymKey(i), n || this.client.core.expirer.del(i), this.client.core.storage.removeItem(Xa).catch((l) => this.client.logger.warn(l)), this.getPendingSessionRequests().forEach((l) => {
        l.topic === i && this.deletePendingSessionRequest(l.id, me("USER_DISCONNECTED"));
      }), i === ((r = this.sessionRequestQueue.queue[0]) == null ? void 0 : r.topic) && (this.sessionRequestQueue.state = Mt.idle), o && this.client.events.emit("session_delete", { id: a, topic: i });
    }), N(this, "deleteProposal", async (s, r) => {
      if (r) try {
        const i = this.client.proposal.get(s), n = this.client.core.eventClient.getEvent({ topic: i.pairingTopic });
        n == null || n.setError(As.proposal_expired);
      } catch {
      }
      await Promise.all([this.client.proposal.delete(s, me("USER_DISCONNECTED")), r ? Promise.resolve() : this.client.core.expirer.del(s)]), this.addToRecentlyDeleted(s, "proposal");
    }), N(this, "deletePendingSessionRequest", async (s, r, i = !1) => {
      await Promise.all([this.client.pendingRequest.delete(s, r), i ? Promise.resolve() : this.client.core.expirer.del(s)]), this.addToRecentlyDeleted(s, "request"), this.sessionRequestQueue.queue = this.sessionRequestQueue.queue.filter((n) => n.id !== s), i && (this.sessionRequestQueue.state = Mt.idle, this.client.events.emit("session_request_expire", { id: s }));
    }), N(this, "deletePendingAuthRequest", async (s, r, i = !1) => {
      await Promise.all([this.client.auth.requests.delete(s, r), i ? Promise.resolve() : this.client.core.expirer.del(s)]);
    }), N(this, "setExpiry", async (s, r) => {
      this.client.session.keys.includes(s) && (this.client.core.expirer.set(s, r), await this.client.session.update(s, { expiry: r }));
    }), N(this, "setProposal", async (s, r) => {
      this.client.core.expirer.set(s, Ue(Fe.wc_sessionPropose.req.ttl)), await this.client.proposal.set(s, r);
    }), N(this, "setAuthRequest", async (s, r) => {
      const { request: i, pairingTopic: n, transportType: o = Ne.relay } = r;
      this.client.core.expirer.set(s, i.expiryTimestamp), await this.client.auth.requests.set(s, { authPayload: i.authPayload, requester: i.requester, expiryTimestamp: i.expiryTimestamp, id: s, pairingTopic: n, verifyContext: i.verifyContext, transportType: o });
    }), N(this, "setPendingSessionRequest", async (s) => {
      const { id: r, topic: i, params: n, verifyContext: o } = s, a = n.request.expiryTimestamp || Ue(Fe.wc_sessionRequest.req.ttl);
      this.client.core.expirer.set(r, a), await this.client.pendingRequest.set(r, { id: r, topic: i, params: n, verifyContext: o });
    }), N(this, "sendRequest", async (s) => {
      const { topic: r, method: i, params: n, expiry: o, relayRpcId: a, clientRpcId: c, throwOnFailedPublish: l, appLink: u, tvf: d } = s, h = Rs(i, n, c);
      let g;
      const w = !!u;
      try {
        const y = w ? ps : $t;
        g = await this.client.core.crypto.encode(r, h, { encoding: y });
      } catch (y) {
        throw await this.cleanup(), this.client.logger.error(`sendRequest() -> core.crypto.encode() for topic ${r} failed`), y;
      }
      let m;
      if (qy.includes(i)) {
        const y = Wt(JSON.stringify(h)), b = Wt(g);
        m = await this.client.core.verify.register({ id: b, decryptedId: y });
      }
      const f = Fe[i].req;
      if (f.attestation = m, o && (f.ttl = o), a && (f.id = a), this.client.core.history.set(r, h), w) {
        const y = Ei(u, r, g);
        await global.Linking.openURL(y, this.client.name);
      } else {
        const y = Fe[i].req;
        o && (y.ttl = o), a && (y.id = a), y.tvf = Ze(be({}, d), { correlationId: h.id }), l ? (y.internal = Ze(be({}, y.internal), { throwOnFailedPublish: !0 }), await this.client.core.relayer.publish(r, g, y)) : this.client.core.relayer.publish(r, g, y).catch((b) => this.client.logger.error(b));
      }
      return h.id;
    }), N(this, "sendResult", async (s) => {
      const { id: r, topic: i, result: n, throwOnFailedPublish: o, encodeOpts: a, appLink: c } = s, l = ji(r, n);
      let u;
      const d = c && typeof (global == null ? void 0 : global.Linking) < "u";
      try {
        const w = d ? ps : $t;
        u = await this.client.core.crypto.encode(i, l, Ze(be({}, a || {}), { encoding: w }));
      } catch (w) {
        throw await this.cleanup(), this.client.logger.error(`sendResult() -> core.crypto.encode() for topic ${i} failed`), w;
      }
      let h, g;
      try {
        h = await this.client.core.history.get(i, r);
        const w = h.request;
        try {
          this.shouldSetTVF(w.method, w.params) && (g = this.getTVFParams(r, w.params, n));
        } catch (m) {
          this.client.logger.warn("sendResult() -> getTVFParams() failed", m);
        }
      } catch (w) {
        throw this.client.logger.error(`sendResult() -> history.get(${i}, ${r}) failed`), w;
      }
      if (d) {
        const w = Ei(c, i, u);
        await global.Linking.openURL(w, this.client.name);
      } else {
        const w = h.request.method, m = Fe[w].res;
        m.tvf = Ze(be({}, g), { correlationId: r }), o ? (m.internal = Ze(be({}, m.internal), { throwOnFailedPublish: !0 }), await this.client.core.relayer.publish(i, u, m)) : this.client.core.relayer.publish(i, u, m).catch((f) => this.client.logger.error(f));
      }
      await this.client.core.history.resolve(l);
    }), N(this, "sendError", async (s) => {
      const { id: r, topic: i, error: n, encodeOpts: o, rpcOpts: a, appLink: c } = s, l = Ec(r, n);
      let u;
      const d = c && typeof (global == null ? void 0 : global.Linking) < "u";
      try {
        const g = d ? ps : $t;
        u = await this.client.core.crypto.encode(i, l, Ze(be({}, o || {}), { encoding: g }));
      } catch (g) {
        throw await this.cleanup(), this.client.logger.error(`sendError() -> core.crypto.encode() for topic ${i} failed`), g;
      }
      let h;
      try {
        h = await this.client.core.history.get(i, r);
      } catch (g) {
        throw this.client.logger.error(`sendError() -> history.get(${i}, ${r}) failed`), g;
      }
      if (d) {
        const g = Ei(c, i, u);
        await global.Linking.openURL(g, this.client.name);
      } else {
        const g = h.request.method, w = a || Fe[g].res;
        this.client.core.relayer.publish(i, u, w);
      }
      await this.client.core.history.resolve(l);
    }), N(this, "cleanup", async () => {
      const s = [], r = [];
      this.client.session.getAll().forEach((i) => {
        let n = !1;
        hs(i.expiry) && (n = !0), this.client.core.crypto.keychain.has(i.topic) || (n = !0), n && s.push(i.topic);
      }), this.client.proposal.getAll().forEach((i) => {
        hs(i.expiryTimestamp) && r.push(i.id);
      }), await Promise.all([...s.map((i) => this.deleteSession({ topic: i })), ...r.map((i) => this.deleteProposal(i))]);
    }), N(this, "onProviderMessageEvent", async (s) => {
      !this.initialized || this.relayMessageCache.length > 0 ? this.relayMessageCache.push(s) : await this.onRelayMessage(s);
    }), N(this, "onRelayEventRequest", async (s) => {
      this.requestQueue.queue.push(s), await this.processRequestsQueue();
    }), N(this, "processRequestsQueue", async () => {
      if (this.requestQueue.state === Mt.active) {
        this.client.logger.info("Request queue already active, skipping...");
        return;
      }
      for (this.client.logger.info(`Request queue starting with ${this.requestQueue.queue.length} requests`); this.requestQueue.queue.length > 0; ) {
        this.requestQueue.state = Mt.active;
        const s = this.requestQueue.queue.shift();
        if (s) try {
          await this.processRequest(s);
        } catch (r) {
          this.client.logger.warn(r);
        }
      }
      this.requestQueue.state = Mt.idle;
    }), N(this, "processRequest", async (s) => {
      const { topic: r, payload: i, attestation: n, transportType: o, encryptedId: a } = s, c = i.method;
      if (!this.shouldIgnorePairingRequest({ topic: r, requestMethod: c })) switch (c) {
        case "wc_sessionPropose":
          return await this.onSessionProposeRequest({ topic: r, payload: i, attestation: n, encryptedId: a });
        case "wc_sessionSettle":
          return await this.onSessionSettleRequest(r, i);
        case "wc_sessionUpdate":
          return await this.onSessionUpdateRequest(r, i);
        case "wc_sessionExtend":
          return await this.onSessionExtendRequest(r, i);
        case "wc_sessionPing":
          return await this.onSessionPingRequest(r, i);
        case "wc_sessionDelete":
          return await this.onSessionDeleteRequest(r, i);
        case "wc_sessionRequest":
          return await this.onSessionRequest({ topic: r, payload: i, attestation: n, encryptedId: a, transportType: o });
        case "wc_sessionEvent":
          return await this.onSessionEventRequest(r, i);
        case "wc_sessionAuthenticate":
          return await this.onSessionAuthenticateRequest({ topic: r, payload: i, attestation: n, encryptedId: a, transportType: o });
        default:
          return this.client.logger.info(`Unsupported request method ${c}`);
      }
    }), N(this, "onRelayEventResponse", async (s) => {
      const { topic: r, payload: i, transportType: n } = s, o = (await this.client.core.history.get(r, i.id)).request.method;
      switch (o) {
        case "wc_sessionPropose":
          return this.onSessionProposeResponse(r, i, n);
        case "wc_sessionSettle":
          return this.onSessionSettleResponse(r, i);
        case "wc_sessionUpdate":
          return this.onSessionUpdateResponse(r, i);
        case "wc_sessionExtend":
          return this.onSessionExtendResponse(r, i);
        case "wc_sessionPing":
          return this.onSessionPingResponse(r, i);
        case "wc_sessionRequest":
          return this.onSessionRequestResponse(r, i);
        case "wc_sessionAuthenticate":
          return this.onSessionAuthenticateResponse(r, i);
        default:
          return this.client.logger.info(`Unsupported response method ${o}`);
      }
    }), N(this, "onRelayEventUnknownPayload", (s) => {
      const { topic: r } = s, { message: i } = $("MISSING_OR_INVALID", `Decoded payload on topic ${r} is not identifiable as a JSON-RPC request or a response.`);
      throw new Error(i);
    }), N(this, "shouldIgnorePairingRequest", (s) => {
      const { topic: r, requestMethod: i } = s, n = this.expectedPairingMethodMap.get(r);
      return !n || n.includes(i) ? !1 : !!(n.includes("wc_sessionAuthenticate") && this.client.events.listenerCount("session_authenticate") > 0);
    }), N(this, "onSessionProposeRequest", async (s) => {
      const { topic: r, payload: i, attestation: n, encryptedId: o } = s, { params: a, id: c } = i;
      try {
        const l = this.client.core.eventClient.getEvent({ topic: r });
        this.client.events.listenerCount("session_proposal") === 0 && (console.warn("No listener for session_proposal event"), l == null || l.setError(Qt.proposal_listener_not_found)), this.isValidConnect(be({}, i.params));
        const u = a.expiryTimestamp || Ue(Fe.wc_sessionPropose.req.ttl), d = be({ id: c, pairingTopic: r, expiryTimestamp: u }, a);
        await this.setProposal(c, d);
        const h = await this.getVerifyContext({ attestationId: n, hash: Wt(JSON.stringify(i)), encryptedId: o, metadata: d.proposer.metadata });
        l == null || l.addTrace(Bt.emit_session_proposal), this.client.events.emit("session_proposal", { id: c, params: d, verifyContext: h });
      } catch (l) {
        await this.sendError({ id: c, topic: r, error: l, rpcOpts: Fe.wc_sessionPropose.autoReject }), this.client.logger.error(l);
      }
    }), N(this, "onSessionProposeResponse", async (s, r, i) => {
      const { id: n } = r;
      if (Zt(r)) {
        const { result: o } = r;
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", result: o });
        const a = this.client.proposal.get(n);
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", proposal: a });
        const c = a.proposer.publicKey;
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", selfPublicKey: c });
        const l = o.responderPublicKey;
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", peerPublicKey: l });
        const u = await this.client.core.crypto.generateSharedKey(c, l);
        this.pendingSessions.set(n, { sessionTopic: u, pairingTopic: s, proposalId: n, publicKey: c });
        const d = await this.client.core.relayer.subscribe(u, { transportType: i });
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", subscriptionId: d }), await this.client.core.pairing.activate({ topic: s });
      } else if (qt(r)) {
        await this.client.proposal.delete(n, me("USER_DISCONNECTED"));
        const o = pe("session_connect", n);
        if (this.events.listenerCount(o) === 0) throw new Error(`emitting ${o} without any listeners, 954`);
        this.events.emit(o, { error: r.error });
      }
    }), N(this, "onSessionSettleRequest", async (s, r) => {
      const { id: i, params: n } = r;
      try {
        this.isValidSessionSettleRequest(n);
        const { relay: o, controller: a, expiry: c, namespaces: l, sessionProperties: u, scopedProperties: d, sessionConfig: h } = r.params, g = [...this.pendingSessions.values()].find((f) => f.sessionTopic === s);
        if (!g) return this.client.logger.error(`Pending session not found for topic ${s}`);
        const w = this.client.proposal.get(g.proposalId), m = Ze(be(be(be({ topic: s, relay: o, expiry: c, namespaces: l, acknowledged: !0, pairingTopic: g.pairingTopic, requiredNamespaces: w.requiredNamespaces, optionalNamespaces: w.optionalNamespaces, controller: a.publicKey, self: { publicKey: g.publicKey, metadata: this.client.metadata }, peer: { publicKey: a.publicKey, metadata: a.metadata } }, u && { sessionProperties: u }), d && { scopedProperties: d }), h && { sessionConfig: h }), { transportType: Ne.relay });
        await this.client.session.set(m.topic, m), await this.setExpiry(m.topic, m.expiry), await this.client.core.pairing.updateMetadata({ topic: g.pairingTopic, metadata: m.peer.metadata }), this.client.events.emit("session_connect", { session: m }), this.events.emit(pe("session_connect", g.proposalId), { session: m }), this.pendingSessions.delete(g.proposalId), this.deleteProposal(g.proposalId, !1), this.cleanupDuplicatePairings(m), await this.sendResult({ id: r.id, topic: s, result: !0, throwOnFailedPublish: !0 });
      } catch (o) {
        await this.sendError({ id: i, topic: s, error: o }), this.client.logger.error(o);
      }
    }), N(this, "onSessionSettleResponse", async (s, r) => {
      const { id: i } = r;
      Zt(r) ? (await this.client.session.update(s, { acknowledged: !0 }), this.events.emit(pe("session_approve", i), {})) : qt(r) && (await this.client.session.delete(s, me("USER_DISCONNECTED")), this.events.emit(pe("session_approve", i), { error: r.error }));
    }), N(this, "onSessionUpdateRequest", async (s, r) => {
      const { params: i, id: n } = r;
      try {
        const o = `${s}_session_update`, a = Rr.get(o);
        if (a && this.isRequestOutOfSync(a, n)) {
          this.client.logger.warn(`Discarding out of sync request - ${n}`), this.sendError({ id: n, topic: s, error: me("INVALID_UPDATE_REQUEST") });
          return;
        }
        this.isValidUpdate(be({ topic: s }, i));
        try {
          Rr.set(o, n), await this.client.session.update(s, { namespaces: i.namespaces }), await this.sendResult({ id: n, topic: s, result: !0, throwOnFailedPublish: !0 });
        } catch (c) {
          throw Rr.delete(o), c;
        }
        this.client.events.emit("session_update", { id: n, topic: s, params: i });
      } catch (o) {
        await this.sendError({ id: n, topic: s, error: o }), this.client.logger.error(o);
      }
    }), N(this, "isRequestOutOfSync", (s, r) => r.toString().slice(0, -3) < s.toString().slice(0, -3)), N(this, "onSessionUpdateResponse", (s, r) => {
      const { id: i } = r, n = pe("session_update", i);
      if (this.events.listenerCount(n) === 0) throw new Error(`emitting ${n} without any listeners`);
      Zt(r) ? this.events.emit(pe("session_update", i), {}) : qt(r) && this.events.emit(pe("session_update", i), { error: r.error });
    }), N(this, "onSessionExtendRequest", async (s, r) => {
      const { id: i } = r;
      try {
        this.isValidExtend({ topic: s }), await this.setExpiry(s, Ue(Vs)), await this.sendResult({ id: i, topic: s, result: !0, throwOnFailedPublish: !0 }), this.client.events.emit("session_extend", { id: i, topic: s });
      } catch (n) {
        await this.sendError({ id: i, topic: s, error: n }), this.client.logger.error(n);
      }
    }), N(this, "onSessionExtendResponse", (s, r) => {
      const { id: i } = r, n = pe("session_extend", i);
      if (this.events.listenerCount(n) === 0) throw new Error(`emitting ${n} without any listeners`);
      Zt(r) ? this.events.emit(pe("session_extend", i), {}) : qt(r) && this.events.emit(pe("session_extend", i), { error: r.error });
    }), N(this, "onSessionPingRequest", async (s, r) => {
      const { id: i } = r;
      try {
        this.isValidPing({ topic: s }), await this.sendResult({ id: i, topic: s, result: !0, throwOnFailedPublish: !0 }), this.client.events.emit("session_ping", { id: i, topic: s });
      } catch (n) {
        await this.sendError({ id: i, topic: s, error: n }), this.client.logger.error(n);
      }
    }), N(this, "onSessionPingResponse", (s, r) => {
      const { id: i } = r, n = pe("session_ping", i);
      setTimeout(() => {
        if (this.events.listenerCount(n) === 0) throw new Error(`emitting ${n} without any listeners 2176`);
        Zt(r) ? this.events.emit(pe("session_ping", i), {}) : qt(r) && this.events.emit(pe("session_ping", i), { error: r.error });
      }, 500);
    }), N(this, "onSessionDeleteRequest", async (s, r) => {
      const { id: i } = r;
      try {
        this.isValidDisconnect({ topic: s, reason: r.params }), Promise.all([new Promise((n) => {
          this.client.core.relayer.once(Be.publish, async () => {
            n(await this.deleteSession({ topic: s, id: i }));
          });
        }), this.sendResult({ id: i, topic: s, result: !0, throwOnFailedPublish: !0 }), this.cleanupPendingSentRequestsForTopic({ topic: s, error: me("USER_DISCONNECTED") })]).catch((n) => this.client.logger.error(n));
      } catch (n) {
        this.client.logger.error(n);
      }
    }), N(this, "onSessionRequest", async (s) => {
      var r, i, n;
      const { topic: o, payload: a, attestation: c, encryptedId: l, transportType: u } = s, { id: d, params: h } = a;
      try {
        await this.isValidRequest(be({ topic: o }, h));
        const g = this.client.session.get(o), w = await this.getVerifyContext({ attestationId: c, hash: Wt(JSON.stringify(Rs("wc_sessionRequest", h, d))), encryptedId: l, metadata: g.peer.metadata, transportType: u }), m = { id: d, topic: o, params: h, verifyContext: w };
        await this.setPendingSessionRequest(m), u === Ne.link_mode && (r = g.peer.metadata.redirect) != null && r.universal && this.client.core.addLinkModeSupportedApp((i = g.peer.metadata.redirect) == null ? void 0 : i.universal), (n = this.client.signConfig) != null && n.disableRequestQueue ? this.emitSessionRequest(m) : (this.addSessionRequestToSessionRequestQueue(m), this.processSessionRequestQueue());
      } catch (g) {
        await this.sendError({ id: d, topic: o, error: g }), this.client.logger.error(g);
      }
    }), N(this, "onSessionRequestResponse", (s, r) => {
      const { id: i } = r, n = pe("session_request", i);
      if (this.events.listenerCount(n) === 0) throw new Error(`emitting ${n} without any listeners`);
      Zt(r) ? this.events.emit(pe("session_request", i), { result: r.result }) : qt(r) && this.events.emit(pe("session_request", i), { error: r.error });
    }), N(this, "onSessionEventRequest", async (s, r) => {
      const { id: i, params: n } = r;
      try {
        const o = `${s}_session_event_${n.event.name}`, a = Rr.get(o);
        if (a && this.isRequestOutOfSync(a, i)) {
          this.client.logger.info(`Discarding out of sync request - ${i}`);
          return;
        }
        this.isValidEmit(be({ topic: s }, n)), this.client.events.emit("session_event", { id: i, topic: s, params: n }), Rr.set(o, i);
      } catch (o) {
        await this.sendError({ id: i, topic: s, error: o }), this.client.logger.error(o);
      }
    }), N(this, "onSessionAuthenticateResponse", (s, r) => {
      const { id: i } = r;
      this.client.logger.trace({ type: "method", method: "onSessionAuthenticateResponse", topic: s, payload: r }), Zt(r) ? this.events.emit(pe("session_request", i), { result: r.result }) : qt(r) && this.events.emit(pe("session_request", i), { error: r.error });
    }), N(this, "onSessionAuthenticateRequest", async (s) => {
      var r;
      const { topic: i, payload: n, attestation: o, encryptedId: a, transportType: c } = s;
      try {
        const { requester: l, authPayload: u, expiryTimestamp: d } = n.params, h = await this.getVerifyContext({ attestationId: o, hash: Wt(JSON.stringify(n)), encryptedId: a, metadata: l.metadata, transportType: c }), g = { requester: l, pairingTopic: i, id: n.id, authPayload: u, verifyContext: h, expiryTimestamp: d };
        await this.setAuthRequest(n.id, { request: g, pairingTopic: i, transportType: c }), c === Ne.link_mode && (r = l.metadata.redirect) != null && r.universal && this.client.core.addLinkModeSupportedApp(l.metadata.redirect.universal), this.client.events.emit("session_authenticate", { topic: i, params: n.params, id: n.id, verifyContext: h });
      } catch (l) {
        this.client.logger.error(l);
        const u = n.params.requester.publicKey, d = await this.client.core.crypto.generateKeyPair(), h = this.getAppLinkIfEnabled(n.params.requester.metadata, c), g = { type: rs, receiverPublicKey: u, senderPublicKey: d };
        await this.sendError({ id: n.id, topic: i, error: l, encodeOpts: g, rpcOpts: Fe.wc_sessionAuthenticate.autoReject, appLink: h });
      }
    }), N(this, "addSessionRequestToSessionRequestQueue", (s) => {
      this.sessionRequestQueue.queue.push(s);
    }), N(this, "cleanupAfterResponse", (s) => {
      this.deletePendingSessionRequest(s.response.id, { message: "fulfilled", code: 0 }), setTimeout(() => {
        this.sessionRequestQueue.state = Mt.idle, this.processSessionRequestQueue();
      }, U.toMiliseconds(this.requestQueueDelay));
    }), N(this, "cleanupPendingSentRequestsForTopic", ({ topic: s, error: r }) => {
      const i = this.client.core.history.pending;
      i.length > 0 && i.filter((n) => n.topic === s && n.request.method === "wc_sessionRequest").forEach((n) => {
        const o = n.request.id, a = pe("session_request", o);
        if (this.events.listenerCount(a) === 0) throw new Error(`emitting ${a} without any listeners`);
        this.events.emit(pe("session_request", n.request.id), { error: r });
      });
    }), N(this, "processSessionRequestQueue", () => {
      if (this.sessionRequestQueue.state === Mt.active) {
        this.client.logger.info("session request queue is already active.");
        return;
      }
      const s = this.sessionRequestQueue.queue[0];
      if (!s) {
        this.client.logger.info("session request queue is empty.");
        return;
      }
      try {
        this.sessionRequestQueue.state = Mt.active, this.emitSessionRequest(s);
      } catch (r) {
        this.client.logger.error(r);
      }
    }), N(this, "emitSessionRequest", (s) => {
      this.client.events.emit("session_request", s);
    }), N(this, "onPairingCreated", (s) => {
      if (s.methods && this.expectedPairingMethodMap.set(s.topic, s.methods), s.active) return;
      const r = this.client.proposal.getAll().find((i) => i.pairingTopic === s.topic);
      r && this.onSessionProposeRequest({ topic: s.topic, payload: Rs("wc_sessionPropose", Ze(be({}, r), { requiredNamespaces: r.requiredNamespaces, optionalNamespaces: r.optionalNamespaces, relays: r.relays, proposer: r.proposer, sessionProperties: r.sessionProperties, scopedProperties: r.scopedProperties }), r.id) });
    }), N(this, "isValidConnect", async (s) => {
      if (!ot(s)) {
        const { message: l } = $("MISSING_OR_INVALID", `connect() params: ${JSON.stringify(s)}`);
        throw new Error(l);
      }
      const { pairingTopic: r, requiredNamespaces: i, optionalNamespaces: n, sessionProperties: o, scopedProperties: a, relays: c } = s;
      if (Ke(r) || await this.isValidPairingTopic(r), !Dg(c)) {
        const { message: l } = $("MISSING_OR_INVALID", `connect() relays: ${c}`);
        throw new Error(l);
      }
      if (!Ke(i) && bs(i) !== 0) {
        const l = "requiredNamespaces are deprecated and are automatically assigned to optionalNamespaces";
        ["fatal", "error", "silent"].includes(this.client.logger.level) ? console.warn(l) : this.client.logger.warn(l), this.validateNamespaces(i, "requiredNamespaces");
      }
      if (!Ke(n) && bs(n) !== 0 && this.validateNamespaces(n, "optionalNamespaces"), Ke(o) || this.validateSessionProps(o, "sessionProperties"), !Ke(a)) {
        this.validateSessionProps(a, "scopedProperties");
        const l = Object.keys(i || {}).concat(Object.keys(n || {}));
        if (!Object.keys(a).every((u) => l.includes(u))) throw new Error(`Scoped properties must be a subset of required/optional namespaces, received: ${JSON.stringify(a)}, required/optional namespaces: ${JSON.stringify(l)}`);
      }
    }), N(this, "validateNamespaces", (s, r) => {
      const i = Ug(s, "connect()", r);
      if (i) throw new Error(i.message);
    }), N(this, "isValidApprove", async (s) => {
      if (!ot(s)) throw new Error($("MISSING_OR_INVALID", `approve() params: ${s}`).message);
      const { id: r, namespaces: i, relayProtocol: n, sessionProperties: o, scopedProperties: a } = s;
      this.checkRecentlyDeleted(r), await this.isValidProposalId(r);
      const c = this.client.proposal.get(r), l = pn(i, "approve()");
      if (l) throw new Error(l.message);
      const u = Na(c.requiredNamespaces, i, "approve()");
      if (u) throw new Error(u.message);
      if (!ke(n, !0)) {
        const { message: d } = $("MISSING_OR_INVALID", `approve() relayProtocol: ${n}`);
        throw new Error(d);
      }
      if (Ke(o) || this.validateSessionProps(o, "sessionProperties"), !Ke(a)) {
        this.validateSessionProps(a, "scopedProperties");
        const d = new Set(Object.keys(i));
        if (!Object.keys(a).every((h) => d.has(h))) throw new Error(`Scoped properties must be a subset of approved namespaces, received: ${JSON.stringify(a)}, approved namespaces: ${Array.from(d).join(", ")}`);
      }
    }), N(this, "isValidReject", async (s) => {
      if (!ot(s)) {
        const { message: n } = $("MISSING_OR_INVALID", `reject() params: ${s}`);
        throw new Error(n);
      }
      const { id: r, reason: i } = s;
      if (this.checkRecentlyDeleted(r), await this.isValidProposalId(r), !Fg(i)) {
        const { message: n } = $("MISSING_OR_INVALID", `reject() reason: ${JSON.stringify(i)}`);
        throw new Error(n);
      }
    }), N(this, "isValidSessionSettleRequest", (s) => {
      if (!ot(s)) {
        const { message: l } = $("MISSING_OR_INVALID", `onSessionSettleRequest() params: ${s}`);
        throw new Error(l);
      }
      const { relay: r, controller: i, namespaces: n, expiry: o } = s;
      if (!hl(r)) {
        const { message: l } = $("MISSING_OR_INVALID", "onSessionSettleRequest() relay protocol should be a string");
        throw new Error(l);
      }
      const a = Og(i, "onSessionSettleRequest()");
      if (a) throw new Error(a.message);
      const c = pn(n, "onSessionSettleRequest()");
      if (c) throw new Error(c.message);
      if (hs(o)) {
        const { message: l } = $("EXPIRED", "onSessionSettleRequest()");
        throw new Error(l);
      }
    }), N(this, "isValidUpdate", async (s) => {
      if (!ot(s)) {
        const { message: c } = $("MISSING_OR_INVALID", `update() params: ${s}`);
        throw new Error(c);
      }
      const { topic: r, namespaces: i } = s;
      this.checkRecentlyDeleted(r), await this.isValidSessionTopic(r);
      const n = this.client.session.get(r), o = pn(i, "update()");
      if (o) throw new Error(o.message);
      const a = Na(n.requiredNamespaces, i, "update()");
      if (a) throw new Error(a.message);
    }), N(this, "isValidExtend", async (s) => {
      if (!ot(s)) {
        const { message: i } = $("MISSING_OR_INVALID", `extend() params: ${s}`);
        throw new Error(i);
      }
      const { topic: r } = s;
      this.checkRecentlyDeleted(r), await this.isValidSessionTopic(r);
    }), N(this, "isValidRequest", async (s) => {
      if (!ot(s)) {
        const { message: c } = $("MISSING_OR_INVALID", `request() params: ${s}`);
        throw new Error(c);
      }
      const { topic: r, request: i, chainId: n, expiry: o } = s;
      this.checkRecentlyDeleted(r), await this.isValidSessionTopic(r);
      const { namespaces: a } = this.client.session.get(r);
      if (!Ia(a, n)) {
        const { message: c } = $("MISSING_OR_INVALID", `request() chainId: ${n}`);
        throw new Error(c);
      }
      if (!Mg(i)) {
        const { message: c } = $("MISSING_OR_INVALID", `request() ${JSON.stringify(i)}`);
        throw new Error(c);
      }
      if (!jg(a, n, i.method)) {
        const { message: c } = $("MISSING_OR_INVALID", `request() method: ${i.method}`);
        throw new Error(c);
      }
      if (o && !Kg(o, vn)) {
        const { message: c } = $("MISSING_OR_INVALID", `request() expiry: ${o}. Expiry must be a number (in seconds) between ${vn.min} and ${vn.max}`);
        throw new Error(c);
      }
    }), N(this, "isValidRespond", async (s) => {
      var r;
      if (!ot(s)) {
        const { message: o } = $("MISSING_OR_INVALID", `respond() params: ${s}`);
        throw new Error(o);
      }
      const { topic: i, response: n } = s;
      try {
        await this.isValidSessionTopic(i);
      } catch (o) {
        throw (r = s == null ? void 0 : s.response) != null && r.id && this.cleanupAfterResponse(s), o;
      }
      if (!Bg(n)) {
        const { message: o } = $("MISSING_OR_INVALID", `respond() response: ${JSON.stringify(n)}`);
        throw new Error(o);
      }
    }), N(this, "isValidPing", async (s) => {
      if (!ot(s)) {
        const { message: i } = $("MISSING_OR_INVALID", `ping() params: ${s}`);
        throw new Error(i);
      }
      const { topic: r } = s;
      await this.isValidSessionOrPairingTopic(r);
    }), N(this, "isValidEmit", async (s) => {
      if (!ot(s)) {
        const { message: a } = $("MISSING_OR_INVALID", `emit() params: ${s}`);
        throw new Error(a);
      }
      const { topic: r, event: i, chainId: n } = s;
      await this.isValidSessionTopic(r);
      const { namespaces: o } = this.client.session.get(r);
      if (!Ia(o, n)) {
        const { message: a } = $("MISSING_OR_INVALID", `emit() chainId: ${n}`);
        throw new Error(a);
      }
      if (!qg(i)) {
        const { message: a } = $("MISSING_OR_INVALID", `emit() event: ${JSON.stringify(i)}`);
        throw new Error(a);
      }
      if (!Wg(o, n, i.name)) {
        const { message: a } = $("MISSING_OR_INVALID", `emit() event: ${JSON.stringify(i)}`);
        throw new Error(a);
      }
    }), N(this, "isValidDisconnect", async (s) => {
      if (!ot(s)) {
        const { message: i } = $("MISSING_OR_INVALID", `disconnect() params: ${s}`);
        throw new Error(i);
      }
      const { topic: r } = s;
      await this.isValidSessionOrPairingTopic(r);
    }), N(this, "isValidAuthenticate", (s) => {
      const { chains: r, uri: i, domain: n, nonce: o } = s;
      if (!Array.isArray(r) || r.length === 0) throw new Error("chains is required and must be a non-empty array");
      if (!ke(i, !1)) throw new Error("uri is required parameter");
      if (!ke(n, !1)) throw new Error("domain is required parameter");
      if (!ke(o, !1)) throw new Error("nonce is required parameter");
      if ([...new Set(r.map((c) => pr(c).namespace))].length > 1) throw new Error("Multi-namespace requests are not supported. Please request single namespace only.");
      const { namespace: a } = pr(r[0]);
      if (a !== "eip155") throw new Error("Only eip155 namespace is supported for authenticated sessions. Please use .connect() for non-eip155 chains.");
    }), N(this, "getVerifyContext", async (s) => {
      const { attestationId: r, hash: i, encryptedId: n, metadata: o, transportType: a } = s, c = { verified: { verifyUrl: o.verifyUrl || Jr, validation: "UNKNOWN", origin: o.url || "" } };
      try {
        if (a === Ne.link_mode) {
          const u = this.getAppLinkIfEnabled(o, a);
          return c.verified.validation = u && new URL(u).origin === new URL(o.url).origin ? "VALID" : "INVALID", c;
        }
        const l = await this.client.core.verify.resolve({ attestationId: r, hash: i, encryptedId: n, verifyUrl: o.verifyUrl });
        l && (c.verified.origin = l.origin, c.verified.isScam = l.isScam, c.verified.validation = l.origin === new URL(o.url).origin ? "VALID" : "INVALID");
      } catch (l) {
        this.client.logger.warn(l);
      }
      return this.client.logger.debug(`Verify context: ${JSON.stringify(c)}`), c;
    }), N(this, "validateSessionProps", (s, r) => {
      Object.values(s).forEach((i, n) => {
        if (i == null) {
          const { message: o } = $("MISSING_OR_INVALID", `${r} must contain an existing value for each key. Received: ${i} for key ${Object.keys(s)[n]}`);
          throw new Error(o);
        }
      });
    }), N(this, "getPendingAuthRequest", (s) => {
      const r = this.client.auth.requests.get(s);
      return typeof r == "object" ? r : void 0;
    }), N(this, "addToRecentlyDeleted", (s, r) => {
      if (this.recentlyDeletedMap.set(s, r), this.recentlyDeletedMap.size >= this.recentlyDeletedLimit) {
        let i = 0;
        const n = this.recentlyDeletedLimit / 2;
        for (const o of this.recentlyDeletedMap.keys()) {
          if (i++ >= n) break;
          this.recentlyDeletedMap.delete(o);
        }
      }
    }), N(this, "checkRecentlyDeleted", (s) => {
      const r = this.recentlyDeletedMap.get(s);
      if (r) {
        const { message: i } = $("MISSING_OR_INVALID", `Record was recently deleted - ${r}: ${s}`);
        throw new Error(i);
      }
    }), N(this, "isLinkModeEnabled", (s, r) => {
      var i, n, o, a, c, l, u, d, h;
      return !s || r !== Ne.link_mode ? !1 : ((n = (i = this.client.metadata) == null ? void 0 : i.redirect) == null ? void 0 : n.linkMode) === !0 && ((a = (o = this.client.metadata) == null ? void 0 : o.redirect) == null ? void 0 : a.universal) !== void 0 && ((l = (c = this.client.metadata) == null ? void 0 : c.redirect) == null ? void 0 : l.universal) !== "" && ((u = s == null ? void 0 : s.redirect) == null ? void 0 : u.universal) !== void 0 && ((d = s == null ? void 0 : s.redirect) == null ? void 0 : d.universal) !== "" && ((h = s == null ? void 0 : s.redirect) == null ? void 0 : h.linkMode) === !0 && this.client.core.linkModeSupportedApps.includes(s.redirect.universal) && typeof (global == null ? void 0 : global.Linking) < "u";
    }), N(this, "getAppLinkIfEnabled", (s, r) => {
      var i;
      return this.isLinkModeEnabled(s, r) ? (i = s == null ? void 0 : s.redirect) == null ? void 0 : i.universal : void 0;
    }), N(this, "handleLinkModeMessage", ({ url: s }) => {
      if (!s || !s.includes("wc_ev") || !s.includes("topic")) return;
      const r = Mo(s, "topic") || "", i = decodeURIComponent(Mo(s, "wc_ev") || ""), n = this.client.session.keys.includes(r);
      n && this.client.session.update(r, { transportType: Ne.link_mode }), this.client.core.dispatchEnvelope({ topic: r, message: i, sessionExists: n });
    }), N(this, "registerLinkModeListeners", async () => {
      var s;
      if (lo() || Cs() && (s = this.client.metadata.redirect) != null && s.linkMode) {
        const r = global == null ? void 0 : global.Linking;
        if (typeof r < "u") {
          r.addEventListener("url", this.handleLinkModeMessage, this.client.name);
          const i = await r.getInitialURL();
          i && setTimeout(() => {
            this.handleLinkModeMessage({ url: i });
          }, 50);
        }
      }
    }), N(this, "shouldSetTVF", (s, r) => {
      if (!r || s !== "wc_sessionRequest") return !1;
      const { request: i } = r;
      return Object.keys(Qa).includes(i.method);
    }), N(this, "getTVFParams", (s, r, i) => {
      var n, o;
      try {
        const a = r.request.method, c = this.extractTxHashesFromResult(a, i);
        return Ze(be({ correlationId: s, rpcMethods: [a], chainId: r.chainId }, this.isValidContractData(r.request.params) && { contractAddresses: [(o = (n = r.request.params) == null ? void 0 : n[0]) == null ? void 0 : o.to] }), { txHashes: c });
      } catch (a) {
        this.client.logger.warn("Error getting TVF params", a);
      }
      return {};
    }), N(this, "isValidContractData", (s) => {
      var r;
      if (!s) return !1;
      try {
        const i = (s == null ? void 0 : s.data) || ((r = s == null ? void 0 : s[0]) == null ? void 0 : r.data);
        if (!i.startsWith("0x")) return !1;
        const n = i.slice(2);
        return /^[0-9a-fA-F]*$/.test(n) ? n.length % 2 === 0 : !1;
      } catch {
      }
      return !1;
    }), N(this, "extractTxHashesFromResult", (s, r) => {
      try {
        const i = Qa[s];
        if (typeof r == "string") return [r];
        const n = r[i.key];
        if (ys(n)) return s === "solana_signAllTransactions" ? n.map((o) => hh(o)) : n;
        if (typeof n == "string") return [n];
      } catch (i) {
        this.client.logger.warn("Error extracting tx hashes from result", i);
      }
      return [];
    });
  }
  async processPendingMessageEvents() {
    try {
      const e = this.client.session.keys, s = this.client.core.relayer.messages.getWithoutAck(e);
      for (const [r, i] of Object.entries(s)) for (const n of i) try {
        await this.onProviderMessageEvent({ topic: r, message: n, publishedAt: Date.now() });
      } catch {
        this.client.logger.warn(`Error processing pending message event for topic: ${r}, message: ${n}`);
      }
    } catch (e) {
      this.client.logger.warn("processPendingMessageEvents failed", e);
    }
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = $("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
  async confirmOnlineStateOrThrow() {
    await this.client.core.relayer.confirmOnlineStateOrThrow();
  }
  registerRelayerEvents() {
    this.client.core.relayer.on(Be.message, (e) => {
      this.onProviderMessageEvent(e);
    });
  }
  async onRelayMessage(e) {
    const { topic: s, message: r, attestation: i, transportType: n } = e, { publicKey: o } = this.client.auth.authKeys.keys.includes(xi) ? this.client.auth.authKeys.get(xi) : { publicKey: void 0 };
    try {
      const a = await this.client.core.crypto.decode(s, r, { receiverPublicKey: o, encoding: n === Ne.link_mode ? ps : $t });
      oo(a) ? (this.client.core.history.set(s, a), await this.onRelayEventRequest({ topic: s, payload: a, attestation: i, transportType: n, encryptedId: Wt(r) })) : ao(a) ? (await this.client.core.history.resolve(a), await this.onRelayEventResponse({ topic: s, payload: a, transportType: n }), this.client.core.history.delete(s, a.id)) : await this.onRelayEventUnknownPayload({ topic: s, payload: a, transportType: n }), await this.client.core.relayer.messages.ack(s, r);
    } catch (a) {
      this.client.logger.error(a);
    }
  }
  registerExpirerEvents() {
    this.client.core.expirer.on(It.expired, async (e) => {
      const { topic: s, id: r } = kc(e.target);
      if (r && this.client.pendingRequest.keys.includes(r)) return await this.deletePendingSessionRequest(r, $("EXPIRED"), !0);
      if (r && this.client.auth.requests.keys.includes(r)) return await this.deletePendingAuthRequest(r, $("EXPIRED"), !0);
      s ? this.client.session.keys.includes(s) && (await this.deleteSession({ topic: s, expirerHasDeleted: !0 }), this.client.events.emit("session_expire", { topic: s })) : r && (await this.deleteProposal(r, !0), this.client.events.emit("proposal_expire", { id: r }));
    });
  }
  registerPairingEvents() {
    this.client.core.pairing.events.on(ks.create, (e) => this.onPairingCreated(e)), this.client.core.pairing.events.on(ks.delete, (e) => {
      this.addToRecentlyDeleted(e.topic, "pairing");
    });
  }
  isValidPairingTopic(e) {
    if (!ke(e, !1)) {
      const { message: s } = $("MISSING_OR_INVALID", `pairing topic should be a string: ${e}`);
      throw new Error(s);
    }
    if (!this.client.core.pairing.pairings.keys.includes(e)) {
      const { message: s } = $("NO_MATCHING_KEY", `pairing topic doesn't exist: ${e}`);
      throw new Error(s);
    }
    if (hs(this.client.core.pairing.pairings.get(e).expiry)) {
      const { message: s } = $("EXPIRED", `pairing topic: ${e}`);
      throw new Error(s);
    }
  }
  async isValidSessionTopic(e) {
    if (!ke(e, !1)) {
      const { message: s } = $("MISSING_OR_INVALID", `session topic should be a string: ${e}`);
      throw new Error(s);
    }
    if (this.checkRecentlyDeleted(e), !this.client.session.keys.includes(e)) {
      const { message: s } = $("NO_MATCHING_KEY", `session topic doesn't exist: ${e}`);
      throw new Error(s);
    }
    if (hs(this.client.session.get(e).expiry)) {
      await this.deleteSession({ topic: e });
      const { message: s } = $("EXPIRED", `session topic: ${e}`);
      throw new Error(s);
    }
    if (!this.client.core.crypto.keychain.has(e)) {
      const { message: s } = $("MISSING_OR_INVALID", `session topic does not exist in keychain: ${e}`);
      throw await this.deleteSession({ topic: e }), new Error(s);
    }
  }
  async isValidSessionOrPairingTopic(e) {
    if (this.checkRecentlyDeleted(e), this.client.session.keys.includes(e)) await this.isValidSessionTopic(e);
    else if (this.client.core.pairing.pairings.keys.includes(e)) this.isValidPairingTopic(e);
    else if (ke(e, !1)) {
      const { message: s } = $("NO_MATCHING_KEY", `session or pairing topic doesn't exist: ${e}`);
      throw new Error(s);
    } else {
      const { message: s } = $("MISSING_OR_INVALID", `session or pairing topic should be a string: ${e}`);
      throw new Error(s);
    }
  }
  async isValidProposalId(e) {
    if (!Lg(e)) {
      const { message: s } = $("MISSING_OR_INVALID", `proposal id should be a number: ${e}`);
      throw new Error(s);
    }
    if (!this.client.proposal.keys.includes(e)) {
      const { message: s } = $("NO_MATCHING_KEY", `proposal id doesn't exist: ${e}`);
      throw new Error(s);
    }
    if (hs(this.client.proposal.get(e).expiryTimestamp)) {
      await this.deleteProposal(e);
      const { message: s } = $("EXPIRED", `proposal id: ${e}`);
      throw new Error(s);
    }
  }
}
class Qy extends qs {
  constructor(e, s) {
    super(e, s, Ly, yo), this.core = e, this.logger = s;
  }
}
let eb = class extends qs {
  constructor(e, s) {
    super(e, s, Fy, yo), this.core = e, this.logger = s;
  }
};
class tb extends qs {
  constructor(e, s) {
    super(e, s, By, yo, (r) => r.id), this.core = e, this.logger = s;
  }
}
class sb extends qs {
  constructor(e, s) {
    super(e, s, zy, Yi, () => xi), this.core = e, this.logger = s;
  }
}
class rb extends qs {
  constructor(e, s) {
    super(e, s, Hy, Yi), this.core = e, this.logger = s;
  }
}
class ib extends qs {
  constructor(e, s) {
    super(e, s, Ky, Yi, (r) => r.id), this.core = e, this.logger = s;
  }
}
var nb = Object.defineProperty, ob = (t, e, s) => e in t ? nb(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s, En = (t, e, s) => ob(t, typeof e != "symbol" ? e + "" : e, s);
class ab {
  constructor(e, s) {
    this.core = e, this.logger = s, En(this, "authKeys"), En(this, "pairingTopics"), En(this, "requests"), this.authKeys = new sb(this.core, this.logger), this.pairingTopics = new rb(this.core, this.logger), this.requests = new ib(this.core, this.logger);
  }
  async init() {
    await this.authKeys.init(), await this.pairingTopics.init(), await this.requests.init();
  }
}
var cb = Object.defineProperty, lb = (t, e, s) => e in t ? cb(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s, ne = (t, e, s) => lb(t, typeof e != "symbol" ? e + "" : e, s);
let ub = class xl extends dd {
  constructor(e) {
    super(e), ne(this, "protocol", Ol), ne(this, "version", Tl), ne(this, "name", bn.name), ne(this, "metadata"), ne(this, "core"), ne(this, "logger"), ne(this, "events", new Bs.EventEmitter()), ne(this, "engine"), ne(this, "session"), ne(this, "proposal"), ne(this, "pendingRequest"), ne(this, "auth"), ne(this, "signConfig"), ne(this, "on", (r, i) => this.events.on(r, i)), ne(this, "once", (r, i) => this.events.once(r, i)), ne(this, "off", (r, i) => this.events.off(r, i)), ne(this, "removeListener", (r, i) => this.events.removeListener(r, i)), ne(this, "removeAllListeners", (r) => this.events.removeAllListeners(r)), ne(this, "connect", async (r) => {
      try {
        return await this.engine.connect(r);
      } catch (i) {
        throw this.logger.error(i.message), i;
      }
    }), ne(this, "pair", async (r) => {
      try {
        return await this.engine.pair(r);
      } catch (i) {
        throw this.logger.error(i.message), i;
      }
    }), ne(this, "approve", async (r) => {
      try {
        return await this.engine.approve(r);
      } catch (i) {
        throw this.logger.error(i.message), i;
      }
    }), ne(this, "reject", async (r) => {
      try {
        return await this.engine.reject(r);
      } catch (i) {
        throw this.logger.error(i.message), i;
      }
    }), ne(this, "update", async (r) => {
      try {
        return await this.engine.update(r);
      } catch (i) {
        throw this.logger.error(i.message), i;
      }
    }), ne(this, "extend", async (r) => {
      try {
        return await this.engine.extend(r);
      } catch (i) {
        throw this.logger.error(i.message), i;
      }
    }), ne(this, "request", async (r) => {
      try {
        return await this.engine.request(r);
      } catch (i) {
        throw this.logger.error(i.message), i;
      }
    }), ne(this, "respond", async (r) => {
      try {
        return await this.engine.respond(r);
      } catch (i) {
        throw this.logger.error(i.message), i;
      }
    }), ne(this, "ping", async (r) => {
      try {
        return await this.engine.ping(r);
      } catch (i) {
        throw this.logger.error(i.message), i;
      }
    }), ne(this, "emit", async (r) => {
      try {
        return await this.engine.emit(r);
      } catch (i) {
        throw this.logger.error(i.message), i;
      }
    }), ne(this, "disconnect", async (r) => {
      try {
        return await this.engine.disconnect(r);
      } catch (i) {
        throw this.logger.error(i.message), i;
      }
    }), ne(this, "find", (r) => {
      try {
        return this.engine.find(r);
      } catch (i) {
        throw this.logger.error(i.message), i;
      }
    }), ne(this, "getPendingSessionRequests", () => {
      try {
        return this.engine.getPendingSessionRequests();
      } catch (r) {
        throw this.logger.error(r.message), r;
      }
    }), ne(this, "authenticate", async (r, i) => {
      try {
        return await this.engine.authenticate(r, i);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    }), ne(this, "formatAuthMessage", (r) => {
      try {
        return this.engine.formatAuthMessage(r);
      } catch (i) {
        throw this.logger.error(i.message), i;
      }
    }), ne(this, "approveSessionAuthenticate", async (r) => {
      try {
        return await this.engine.approveSessionAuthenticate(r);
      } catch (i) {
        throw this.logger.error(i.message), i;
      }
    }), ne(this, "rejectSessionAuthenticate", async (r) => {
      try {
        return await this.engine.rejectSessionAuthenticate(r);
      } catch (i) {
        throw this.logger.error(i.message), i;
      }
    }), this.name = (e == null ? void 0 : e.name) || bn.name, this.metadata = Ad(e == null ? void 0 : e.metadata), this.signConfig = e == null ? void 0 : e.signConfig;
    const s = typeof (e == null ? void 0 : e.logger) < "u" && typeof (e == null ? void 0 : e.logger) != "string" ? e.logger : no(ni({ level: (e == null ? void 0 : e.logger) || bn.logger }));
    this.core = (e == null ? void 0 : e.core) || new Dy(e), this.logger = et(s, this.name), this.session = new eb(this.core, this.logger), this.proposal = new Qy(this.core, this.logger), this.pendingRequest = new tb(this.core, this.logger), this.engine = new Zy(this), this.auth = new ab(this.core, this.logger);
  }
  static async init(e) {
    const s = new xl(e);
    return await s.initialize(), s;
  }
  get context() {
    return wt(this.logger);
  }
  get pairing() {
    return this.core.pairing.pairings;
  }
  async initialize() {
    this.logger.trace("Initialized");
    try {
      await this.core.start(), await this.session.init(), await this.proposal.init(), await this.pendingRequest.init(), await this.auth.init(), await this.engine.init(), this.logger.info("SignClient Initialization Success"), setTimeout(() => {
        this.engine.processRelayMessageCache();
      }, U.toMiliseconds(U.ONE_SECOND));
    } catch (e) {
      throw this.logger.info("SignClient Initialization Failure"), this.logger.error(e.message), e;
    }
  }
};
const tc = "error", db = "wss://relay.walletconnect.org", hb = "wc", pb = "universal_provider", Ii = `${hb}@2:${pb}:`, Rl = "https://rpc.walletconnect.org/v1/", or = "generic", gb = `${Rl}bundler`, _t = { DEFAULT_CHAIN_CHANGED: "default_chain_changed" };
function fb() {
}
function bo(t) {
  return t == null || typeof t != "object" && typeof t != "function";
}
function vo(t) {
  return ArrayBuffer.isView(t) && !(t instanceof DataView);
}
function mb(t) {
  if (bo(t)) return t;
  if (Array.isArray(t) || vo(t) || t instanceof ArrayBuffer || typeof SharedArrayBuffer < "u" && t instanceof SharedArrayBuffer) return t.slice(0);
  const e = Object.getPrototypeOf(t), s = e.constructor;
  if (t instanceof Date || t instanceof Map || t instanceof Set) return new s(t);
  if (t instanceof RegExp) {
    const r = new s(t);
    return r.lastIndex = t.lastIndex, r;
  }
  if (t instanceof DataView) return new s(t.buffer.slice(0));
  if (t instanceof Error) {
    const r = new s(t.message);
    return r.stack = t.stack, r.name = t.name, r.cause = t.cause, r;
  }
  if (typeof File < "u" && t instanceof File) return new s([t], t.name, { type: t.type, lastModified: t.lastModified });
  if (typeof t == "object") {
    const r = Object.create(e);
    return Object.assign(r, t);
  }
  return t;
}
function sc(t) {
  return typeof t == "object" && t !== null;
}
function $l(t) {
  return Object.getOwnPropertySymbols(t).filter((e) => Object.prototype.propertyIsEnumerable.call(t, e));
}
function Ul(t) {
  return t == null ? t === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(t);
}
const wb = "[object RegExp]", Dl = "[object String]", Ll = "[object Number]", Fl = "[object Boolean]", Ml = "[object Arguments]", yb = "[object Symbol]", bb = "[object Date]", vb = "[object Map]", Eb = "[object Set]", Cb = "[object Array]", Ib = "[object ArrayBuffer]", Nb = "[object Object]", Ab = "[object DataView]", _b = "[object Uint8Array]", Sb = "[object Uint8ClampedArray]", Pb = "[object Uint16Array]", Ob = "[object Uint32Array]", Tb = "[object Int8Array]", kb = "[object Int16Array]", xb = "[object Int32Array]", Rb = "[object Float32Array]", $b = "[object Float64Array]";
function Ub(t, e) {
  return dr(t, void 0, t, /* @__PURE__ */ new Map(), e);
}
function dr(t, e, s, r = /* @__PURE__ */ new Map(), i = void 0) {
  const n = i == null ? void 0 : i(t, e, s, r);
  if (n != null) return n;
  if (bo(t)) return t;
  if (r.has(t)) return r.get(t);
  if (Array.isArray(t)) {
    const o = new Array(t.length);
    r.set(t, o);
    for (let a = 0; a < t.length; a++) o[a] = dr(t[a], a, s, r, i);
    return Object.hasOwn(t, "index") && (o.index = t.index), Object.hasOwn(t, "input") && (o.input = t.input), o;
  }
  if (t instanceof Date) return new Date(t.getTime());
  if (t instanceof RegExp) {
    const o = new RegExp(t.source, t.flags);
    return o.lastIndex = t.lastIndex, o;
  }
  if (t instanceof Map) {
    const o = /* @__PURE__ */ new Map();
    r.set(t, o);
    for (const [a, c] of t) o.set(a, dr(c, a, s, r, i));
    return o;
  }
  if (t instanceof Set) {
    const o = /* @__PURE__ */ new Set();
    r.set(t, o);
    for (const a of t) o.add(dr(a, void 0, s, r, i));
    return o;
  }
  if (typeof Buffer < "u" && Buffer.isBuffer(t)) return t.subarray();
  if (vo(t)) {
    const o = new (Object.getPrototypeOf(t)).constructor(t.length);
    r.set(t, o);
    for (let a = 0; a < t.length; a++) o[a] = dr(t[a], a, s, r, i);
    return o;
  }
  if (t instanceof ArrayBuffer || typeof SharedArrayBuffer < "u" && t instanceof SharedArrayBuffer) return t.slice(0);
  if (t instanceof DataView) {
    const o = new DataView(t.buffer.slice(0), t.byteOffset, t.byteLength);
    return r.set(t, o), xs(o, t, s, r, i), o;
  }
  if (typeof File < "u" && t instanceof File) {
    const o = new File([t], t.name, { type: t.type });
    return r.set(t, o), xs(o, t, s, r, i), o;
  }
  if (t instanceof Blob) {
    const o = new Blob([t], { type: t.type });
    return r.set(t, o), xs(o, t, s, r, i), o;
  }
  if (t instanceof Error) {
    const o = new t.constructor();
    return r.set(t, o), o.message = t.message, o.name = t.name, o.stack = t.stack, o.cause = t.cause, xs(o, t, s, r, i), o;
  }
  if (typeof t == "object" && Db(t)) {
    const o = Object.create(Object.getPrototypeOf(t));
    return r.set(t, o), xs(o, t, s, r, i), o;
  }
  return t;
}
function xs(t, e, s = t, r, i) {
  const n = [...Object.keys(e), ...$l(e)];
  for (let o = 0; o < n.length; o++) {
    const a = n[o], c = Object.getOwnPropertyDescriptor(t, a);
    (c == null || c.writable) && (t[a] = dr(e[a], a, s, r, i));
  }
}
function Db(t) {
  switch (Ul(t)) {
    case Ml:
    case Cb:
    case Ib:
    case Ab:
    case Fl:
    case bb:
    case Rb:
    case $b:
    case Tb:
    case kb:
    case xb:
    case vb:
    case Ll:
    case Nb:
    case wb:
    case Eb:
    case Dl:
    case yb:
    case _b:
    case Sb:
    case Pb:
    case Ob:
      return !0;
    default:
      return !1;
  }
}
function Lb(t, e) {
  return Ub(t, (s, r, i, n) => {
    if (typeof t == "object") switch (Object.prototype.toString.call(t)) {
      case Ll:
      case Dl:
      case Fl: {
        const o = new t.constructor(t == null ? void 0 : t.valueOf());
        return xs(o, t), o;
      }
      case Ml: {
        const o = {};
        return xs(o, t), o.length = t.length, o[Symbol.iterator] = t[Symbol.iterator], o;
      }
      default:
        return;
    }
  });
}
function rc(t) {
  return Lb(t);
}
function ic(t) {
  return t !== null && typeof t == "object" && Ul(t) === "[object Arguments]";
}
function Fb(t) {
  return vo(t);
}
function Mb(t) {
  var s;
  if (typeof t != "object" || t == null) return !1;
  if (Object.getPrototypeOf(t) === null) return !0;
  if (Object.prototype.toString.call(t) !== "[object Object]") {
    const r = t[Symbol.toStringTag];
    return r == null || !((s = Object.getOwnPropertyDescriptor(t, Symbol.toStringTag)) != null && s.writable) ? !1 : t.toString() === `[object ${r}]`;
  }
  let e = t;
  for (; Object.getPrototypeOf(e) !== null; ) e = Object.getPrototypeOf(e);
  return Object.getPrototypeOf(t) === e;
}
function Bb(t, ...e) {
  const s = e.slice(0, -1), r = e[e.length - 1];
  let i = t;
  for (let n = 0; n < s.length; n++) {
    const o = s[n];
    i = to(i, o, r, /* @__PURE__ */ new Map());
  }
  return i;
}
function to(t, e, s, r) {
  if (bo(t) && (t = Object(t)), e == null || typeof e != "object") return t;
  if (r.has(e)) return mb(r.get(e));
  if (r.set(e, t), Array.isArray(e)) {
    e = e.slice();
    for (let n = 0; n < e.length; n++) e[n] = e[n] ?? void 0;
  }
  const i = [...Object.keys(e), ...$l(e)];
  for (let n = 0; n < i.length; n++) {
    const o = i[n];
    let a = e[o], c = t[o];
    if (ic(a) && (a = { ...a }), ic(c) && (c = { ...c }), typeof Buffer < "u" && Buffer.isBuffer(a) && (a = rc(a)), Array.isArray(a)) if (typeof c == "object" && c != null) {
      const u = [], d = Reflect.ownKeys(c);
      for (let h = 0; h < d.length; h++) {
        const g = d[h];
        u[g] = c[g];
      }
      c = u;
    } else c = [];
    const l = s(c, a, o, t, e, r);
    l != null ? t[o] = l : Array.isArray(a) || sc(c) && sc(a) ? t[o] = to(c, a, s, r) : c == null && Mb(a) ? t[o] = to({}, a, s, r) : c == null && Fb(a) ? t[o] = rc(a) : (c === void 0 || a !== void 0) && (t[o] = a);
  }
  return t;
}
function qb(t, ...e) {
  return Bb(t, ...e, fb);
}
var jb = Object.defineProperty, Wb = Object.defineProperties, zb = Object.getOwnPropertyDescriptors, nc = Object.getOwnPropertySymbols, Hb = Object.prototype.hasOwnProperty, Kb = Object.prototype.propertyIsEnumerable, oc = (t, e, s) => e in t ? jb(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s, Ni = (t, e) => {
  for (var s in e || (e = {})) Hb.call(e, s) && oc(t, s, e[s]);
  if (nc) for (var s of nc(e)) Kb.call(e, s) && oc(t, s, e[s]);
  return t;
}, Vb = (t, e) => Wb(t, zb(e));
function mt(t, e, s) {
  var r;
  const i = pr(t);
  return ((r = e.rpcMap) == null ? void 0 : r[i.reference]) || `${Rl}?chainId=${i.namespace}:${i.reference}&projectId=${s}`;
}
function js(t) {
  return t.includes(":") ? t.split(":")[1] : t;
}
function Bl(t) {
  return t.map((e) => `${e.split(":")[0]}:${e.split(":")[1]}`);
}
function Gb(t, e) {
  const s = Object.keys(e.namespaces).filter((i) => i.includes(t));
  if (!s.length) return [];
  const r = [];
  return s.forEach((i) => {
    const n = e.namespaces[i].accounts;
    r.push(...n);
  }), r;
}
function Ai(t = {}, e = {}) {
  const s = ac(t), r = ac(e);
  return qb(s, r);
}
function ac(t) {
  var e, s, r, i, n;
  const o = {};
  if (!bs(t)) return o;
  for (const [a, c] of Object.entries(t)) {
    const l = Gi(a) ? [a] : c.chains, u = c.methods || [], d = c.events || [], h = c.rpcMap || {}, g = ur(a);
    o[g] = Vb(Ni(Ni({}, o[g]), c), { chains: zt(l, (e = o[g]) == null ? void 0 : e.chains), methods: zt(u, (s = o[g]) == null ? void 0 : s.methods), events: zt(d, (r = o[g]) == null ? void 0 : r.events) }), (bs(h) || bs(((i = o[g]) == null ? void 0 : i.rpcMap) || {})) && (o[g].rpcMap = Ni(Ni({}, h), (n = o[g]) == null ? void 0 : n.rpcMap));
  }
  return o;
}
function cc(t) {
  return t.includes(":") ? t.split(":")[2] : t;
}
function lc(t) {
  const e = {};
  for (const [s, r] of Object.entries(t)) {
    const i = r.methods || [], n = r.events || [], o = r.accounts || [], a = Gi(s) ? [s] : r.chains ? r.chains : Bl(r.accounts);
    e[s] = { chains: a, methods: i, events: n, accounts: o };
  }
  return e;
}
function Cn(t) {
  return typeof t == "number" ? t : t.includes("0x") ? parseInt(t, 16) : (t = t.includes(":") ? t.split(":")[1] : t, isNaN(Number(t)) ? t : Number(t));
}
const ql = {}, ue = (t) => ql[t], In = (t, e) => {
  ql[t] = e;
};
var Jb = Object.defineProperty, Yb = (t, e, s) => e in t ? Jb(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s, Gs = (t, e, s) => Yb(t, typeof e != "symbol" ? e + "" : e, s);
class Xb {
  constructor(e) {
    Gs(this, "name", "polkadot"), Gs(this, "client"), Gs(this, "httpProviders"), Gs(this, "events"), Gs(this, "namespace"), Gs(this, "chainId"), this.namespace = e.namespace, this.events = ue("events"), this.client = ue("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
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
  setDefaultChain(e, s) {
    this.httpProviders[e] || this.setHttpProvider(e, s), this.chainId = e, this.events.emit(_t.DEFAULT_CHAIN_CHANGED, `${this.name}:${e}`);
  }
  getAccounts() {
    const e = this.namespace.accounts;
    return e ? e.filter((s) => s.split(":")[1] === this.chainId.toString()).map((s) => s.split(":")[2]) || [] : [];
  }
  createHttpProviders() {
    const e = {};
    return this.namespace.chains.forEach((s) => {
      var r;
      const i = js(s);
      e[i] = this.createHttpProvider(i, (r = this.namespace.rpcMap) == null ? void 0 : r[s]);
    }), e;
  }
  getHttpProvider() {
    const e = `${this.name}:${this.chainId}`, s = this.httpProviders[e];
    if (typeof s > "u") throw new Error(`JSON-RPC provider for ${e} not found`);
    return s;
  }
  setHttpProvider(e, s) {
    const r = this.createHttpProvider(e, s);
    r && (this.httpProviders[e] = r);
  }
  createHttpProvider(e, s) {
    const r = s || mt(e, this.namespace, this.client.core.projectId);
    if (!r) throw new Error(`No RPC url provided for chainId: ${e}`);
    return new At(new Ut(r, ue("disableProviderPing")));
  }
}
var Zb = Object.defineProperty, Qb = Object.defineProperties, ev = Object.getOwnPropertyDescriptors, uc = Object.getOwnPropertySymbols, tv = Object.prototype.hasOwnProperty, sv = Object.prototype.propertyIsEnumerable, so = (t, e, s) => e in t ? Zb(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s, dc = (t, e) => {
  for (var s in e || (e = {})) tv.call(e, s) && so(t, s, e[s]);
  if (uc) for (var s of uc(e)) sv.call(e, s) && so(t, s, e[s]);
  return t;
}, hc = (t, e) => Qb(t, ev(e)), Js = (t, e, s) => so(t, typeof e != "symbol" ? e + "" : e, s);
class rv {
  constructor(e) {
    Js(this, "name", "eip155"), Js(this, "client"), Js(this, "chainId"), Js(this, "namespace"), Js(this, "httpProviders"), Js(this, "events"), this.namespace = e.namespace, this.events = ue("events"), this.client = ue("client"), this.httpProviders = this.createHttpProviders(), this.chainId = parseInt(this.getDefaultChain());
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
  setDefaultChain(e, s) {
    this.httpProviders[e] || this.setHttpProvider(parseInt(e), s), this.chainId = parseInt(e), this.events.emit(_t.DEFAULT_CHAIN_CHANGED, `${this.name}:${e}`);
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
  createHttpProvider(e, s) {
    const r = s || mt(`${this.name}:${e}`, this.namespace, this.client.core.projectId);
    if (!r) throw new Error(`No RPC url provided for chainId: ${e}`);
    return new At(new Ut(r, ue("disableProviderPing")));
  }
  setHttpProvider(e, s) {
    const r = this.createHttpProvider(e, s);
    r && (this.httpProviders[e] = r);
  }
  createHttpProviders() {
    const e = {};
    return this.namespace.chains.forEach((s) => {
      var r;
      const i = parseInt(js(s));
      e[i] = this.createHttpProvider(i, (r = this.namespace.rpcMap) == null ? void 0 : r[s]);
    }), e;
  }
  getAccounts() {
    const e = this.namespace.accounts;
    return e ? [...new Set(e.filter((s) => s.split(":")[1] === this.chainId.toString()).map((s) => s.split(":")[2]))] : [];
  }
  getHttpProvider() {
    const e = this.chainId, s = this.httpProviders[e];
    if (typeof s > "u") throw new Error(`JSON-RPC provider for ${e} not found`);
    return s;
  }
  async handleSwitchChain(e) {
    var s, r;
    let i = e.request.params ? (s = e.request.params[0]) == null ? void 0 : s.chainId : "0x0";
    i = i.startsWith("0x") ? i : `0x${i}`;
    const n = parseInt(i, 16);
    if (this.isChainApproved(n)) this.setDefaultChain(`${n}`);
    else if (this.namespace.methods.includes("wallet_switchEthereumChain")) await this.client.request({ topic: e.topic, request: { method: e.request.method, params: [{ chainId: i }] }, chainId: (r = this.namespace.chains) == null ? void 0 : r[0] }), this.setDefaultChain(`${n}`);
    else throw new Error(`Failed to switch to chain 'eip155:${n}'. The chain is not approved or the wallet does not support 'wallet_switchEthereumChain' method.`);
    return null;
  }
  isChainApproved(e) {
    return this.namespace.chains.includes(`${this.name}:${e}`);
  }
  async getCapabilities(e) {
    var s, r, i, n, o;
    const a = (r = (s = e.request) == null ? void 0 : s.params) == null ? void 0 : r[0], c = ((n = (i = e.request) == null ? void 0 : i.params) == null ? void 0 : n[1]) || [], l = `${a}${c.join(",")}`;
    if (!a) throw new Error("Missing address parameter in `wallet_getCapabilities` request");
    const u = this.client.session.get(e.topic), d = ((o = u == null ? void 0 : u.sessionProperties) == null ? void 0 : o.capabilities) || {};
    if (d != null && d[l]) return d == null ? void 0 : d[l];
    const h = await this.client.request(e);
    try {
      await this.client.session.update(e.topic, { sessionProperties: hc(dc({}, u.sessionProperties || {}), { capabilities: hc(dc({}, d || {}), { [l]: h }) }) });
    } catch (g) {
      console.warn("Failed to update session with capabilities", g);
    }
    return h;
  }
  async getCallStatus(e) {
    var s, r;
    const i = this.client.session.get(e.topic), n = (s = i.sessionProperties) == null ? void 0 : s.bundler_name;
    if (n) {
      const a = this.getBundlerUrl(e.chainId, n);
      try {
        return await this.getUserOperationReceipt(a, e);
      } catch (c) {
        console.warn("Failed to fetch call status from bundler", c, a);
      }
    }
    const o = (r = i.sessionProperties) == null ? void 0 : r.bundler_url;
    if (o) try {
      return await this.getUserOperationReceipt(o, e);
    } catch (a) {
      console.warn("Failed to fetch call status from custom bundler", a, o);
    }
    if (this.namespace.methods.includes(e.request.method)) return await this.client.request(e);
    throw new Error("Fetching call status not approved by the wallet.");
  }
  async getUserOperationReceipt(e, s) {
    var r;
    const i = new URL(e), n = await fetch(i, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Rs("eth_getUserOperationReceipt", [(r = s.request.params) == null ? void 0 : r[0]])) });
    if (!n.ok) throw new Error(`Failed to fetch user operation receipt - ${n.status}`);
    return await n.json();
  }
  getBundlerUrl(e, s) {
    return `${gb}?projectId=${this.client.core.projectId}&chainId=${e}&bundler=${s}`;
  }
}
var iv = Object.defineProperty, nv = (t, e, s) => e in t ? iv(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s, Ys = (t, e, s) => nv(t, typeof e != "symbol" ? e + "" : e, s);
class ov {
  constructor(e) {
    Ys(this, "name", "solana"), Ys(this, "client"), Ys(this, "httpProviders"), Ys(this, "events"), Ys(this, "namespace"), Ys(this, "chainId"), this.namespace = e.namespace, this.events = ue("events"), this.client = ue("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
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
  setDefaultChain(e, s) {
    this.httpProviders[e] || this.setHttpProvider(e, s), this.chainId = e, this.events.emit(_t.DEFAULT_CHAIN_CHANGED, `${this.name}:${e}`);
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
    return e ? [...new Set(e.filter((s) => s.split(":")[1] === this.chainId.toString()).map((s) => s.split(":")[2]))] : [];
  }
  createHttpProviders() {
    const e = {};
    return this.namespace.chains.forEach((s) => {
      var r;
      const i = js(s);
      e[i] = this.createHttpProvider(i, (r = this.namespace.rpcMap) == null ? void 0 : r[s]);
    }), e;
  }
  getHttpProvider() {
    const e = `${this.name}:${this.chainId}`, s = this.httpProviders[e];
    if (typeof s > "u") throw new Error(`JSON-RPC provider for ${e} not found`);
    return s;
  }
  setHttpProvider(e, s) {
    const r = this.createHttpProvider(e, s);
    r && (this.httpProviders[e] = r);
  }
  createHttpProvider(e, s) {
    const r = s || mt(e, this.namespace, this.client.core.projectId);
    if (!r) throw new Error(`No RPC url provided for chainId: ${e}`);
    return new At(new Ut(r, ue("disableProviderPing")));
  }
}
var av = Object.defineProperty, cv = (t, e, s) => e in t ? av(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s, Xs = (t, e, s) => cv(t, typeof e != "symbol" ? e + "" : e, s);
class lv {
  constructor(e) {
    Xs(this, "name", "cosmos"), Xs(this, "client"), Xs(this, "httpProviders"), Xs(this, "events"), Xs(this, "namespace"), Xs(this, "chainId"), this.namespace = e.namespace, this.events = ue("events"), this.client = ue("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
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
  setDefaultChain(e, s) {
    this.httpProviders[e] || this.setHttpProvider(e, s), this.chainId = e, this.events.emit(_t.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
  }
  getAccounts() {
    const e = this.namespace.accounts;
    return e ? [...new Set(e.filter((s) => s.split(":")[1] === this.chainId.toString()).map((s) => s.split(":")[2]))] : [];
  }
  createHttpProviders() {
    const e = {};
    return this.namespace.chains.forEach((s) => {
      var r;
      const i = js(s);
      e[i] = this.createHttpProvider(i, (r = this.namespace.rpcMap) == null ? void 0 : r[s]);
    }), e;
  }
  getHttpProvider() {
    const e = `${this.name}:${this.chainId}`, s = this.httpProviders[e];
    if (typeof s > "u") throw new Error(`JSON-RPC provider for ${e} not found`);
    return s;
  }
  setHttpProvider(e, s) {
    const r = this.createHttpProvider(e, s);
    r && (this.httpProviders[e] = r);
  }
  createHttpProvider(e, s) {
    const r = s || mt(e, this.namespace, this.client.core.projectId);
    if (!r) throw new Error(`No RPC url provided for chainId: ${e}`);
    return new At(new Ut(r, ue("disableProviderPing")));
  }
}
var uv = Object.defineProperty, dv = (t, e, s) => e in t ? uv(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s, Zs = (t, e, s) => dv(t, typeof e != "symbol" ? e + "" : e, s);
class hv {
  constructor(e) {
    Zs(this, "name", "algorand"), Zs(this, "client"), Zs(this, "httpProviders"), Zs(this, "events"), Zs(this, "namespace"), Zs(this, "chainId"), this.namespace = e.namespace, this.events = ue("events"), this.client = ue("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
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
  setDefaultChain(e, s) {
    if (!this.httpProviders[e]) {
      const r = s || mt(`${this.name}:${e}`, this.namespace, this.client.core.projectId);
      if (!r) throw new Error(`No RPC url provided for chainId: ${e}`);
      this.setHttpProvider(e, r);
    }
    this.chainId = e, this.events.emit(_t.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
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
    return e ? [...new Set(e.filter((s) => s.split(":")[1] === this.chainId.toString()).map((s) => s.split(":")[2]))] : [];
  }
  createHttpProviders() {
    const e = {};
    return this.namespace.chains.forEach((s) => {
      var r;
      e[s] = this.createHttpProvider(s, (r = this.namespace.rpcMap) == null ? void 0 : r[s]);
    }), e;
  }
  getHttpProvider() {
    const e = `${this.name}:${this.chainId}`, s = this.httpProviders[e];
    if (typeof s > "u") throw new Error(`JSON-RPC provider for ${e} not found`);
    return s;
  }
  setHttpProvider(e, s) {
    const r = this.createHttpProvider(e, s);
    r && (this.httpProviders[e] = r);
  }
  createHttpProvider(e, s) {
    const r = s || mt(e, this.namespace, this.client.core.projectId);
    return typeof r > "u" ? void 0 : new At(new Ut(r, ue("disableProviderPing")));
  }
}
var pv = Object.defineProperty, gv = (t, e, s) => e in t ? pv(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s, Qs = (t, e, s) => gv(t, typeof e != "symbol" ? e + "" : e, s);
class fv {
  constructor(e) {
    Qs(this, "name", "cip34"), Qs(this, "client"), Qs(this, "httpProviders"), Qs(this, "events"), Qs(this, "namespace"), Qs(this, "chainId"), this.namespace = e.namespace, this.events = ue("events"), this.client = ue("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
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
  setDefaultChain(e, s) {
    this.httpProviders[e] || this.setHttpProvider(e, s), this.chainId = e, this.events.emit(_t.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
  }
  getAccounts() {
    const e = this.namespace.accounts;
    return e ? [...new Set(e.filter((s) => s.split(":")[1] === this.chainId.toString()).map((s) => s.split(":")[2]))] : [];
  }
  createHttpProviders() {
    const e = {};
    return this.namespace.chains.forEach((s) => {
      const r = this.getCardanoRPCUrl(s), i = js(s);
      e[i] = this.createHttpProvider(i, r);
    }), e;
  }
  getHttpProvider() {
    const e = `${this.name}:${this.chainId}`, s = this.httpProviders[e];
    if (typeof s > "u") throw new Error(`JSON-RPC provider for ${e} not found`);
    return s;
  }
  getCardanoRPCUrl(e) {
    const s = this.namespace.rpcMap;
    if (s) return s[e];
  }
  setHttpProvider(e, s) {
    const r = this.createHttpProvider(e, s);
    r && (this.httpProviders[e] = r);
  }
  createHttpProvider(e, s) {
    const r = s || this.getCardanoRPCUrl(e);
    if (!r) throw new Error(`No RPC url provided for chainId: ${e}`);
    return new At(new Ut(r, ue("disableProviderPing")));
  }
}
var mv = Object.defineProperty, wv = (t, e, s) => e in t ? mv(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s, er = (t, e, s) => wv(t, typeof e != "symbol" ? e + "" : e, s);
class yv {
  constructor(e) {
    er(this, "name", "elrond"), er(this, "client"), er(this, "httpProviders"), er(this, "events"), er(this, "namespace"), er(this, "chainId"), this.namespace = e.namespace, this.events = ue("events"), this.client = ue("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
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
  setDefaultChain(e, s) {
    this.httpProviders[e] || this.setHttpProvider(e, s), this.chainId = e, this.events.emit(_t.DEFAULT_CHAIN_CHANGED, `${this.name}:${e}`);
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
    return e ? [...new Set(e.filter((s) => s.split(":")[1] === this.chainId.toString()).map((s) => s.split(":")[2]))] : [];
  }
  createHttpProviders() {
    const e = {};
    return this.namespace.chains.forEach((s) => {
      var r;
      const i = js(s);
      e[i] = this.createHttpProvider(i, (r = this.namespace.rpcMap) == null ? void 0 : r[s]);
    }), e;
  }
  getHttpProvider() {
    const e = `${this.name}:${this.chainId}`, s = this.httpProviders[e];
    if (typeof s > "u") throw new Error(`JSON-RPC provider for ${e} not found`);
    return s;
  }
  setHttpProvider(e, s) {
    const r = this.createHttpProvider(e, s);
    r && (this.httpProviders[e] = r);
  }
  createHttpProvider(e, s) {
    const r = s || mt(e, this.namespace, this.client.core.projectId);
    if (!r) throw new Error(`No RPC url provided for chainId: ${e}`);
    return new At(new Ut(r, ue("disableProviderPing")));
  }
}
var bv = Object.defineProperty, vv = (t, e, s) => e in t ? bv(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s, tr = (t, e, s) => vv(t, typeof e != "symbol" ? e + "" : e, s);
class Ev {
  constructor(e) {
    tr(this, "name", "multiversx"), tr(this, "client"), tr(this, "httpProviders"), tr(this, "events"), tr(this, "namespace"), tr(this, "chainId"), this.namespace = e.namespace, this.events = ue("events"), this.client = ue("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
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
  setDefaultChain(e, s) {
    this.httpProviders[e] || this.setHttpProvider(e, s), this.chainId = e, this.events.emit(_t.DEFAULT_CHAIN_CHANGED, `${this.name}:${e}`);
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
    return e ? [...new Set(e.filter((s) => s.split(":")[1] === this.chainId.toString()).map((s) => s.split(":")[2]))] : [];
  }
  createHttpProviders() {
    const e = {};
    return this.namespace.chains.forEach((s) => {
      var r;
      const i = js(s);
      e[i] = this.createHttpProvider(i, (r = this.namespace.rpcMap) == null ? void 0 : r[s]);
    }), e;
  }
  getHttpProvider() {
    const e = `${this.name}:${this.chainId}`, s = this.httpProviders[e];
    if (typeof s > "u") throw new Error(`JSON-RPC provider for ${e} not found`);
    return s;
  }
  setHttpProvider(e, s) {
    const r = this.createHttpProvider(e, s);
    r && (this.httpProviders[e] = r);
  }
  createHttpProvider(e, s) {
    const r = s || mt(e, this.namespace, this.client.core.projectId);
    if (!r) throw new Error(`No RPC url provided for chainId: ${e}`);
    return new At(new Ut(r, ue("disableProviderPing")));
  }
}
var Cv = Object.defineProperty, Iv = (t, e, s) => e in t ? Cv(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s, sr = (t, e, s) => Iv(t, typeof e != "symbol" ? e + "" : e, s);
class Nv {
  constructor(e) {
    sr(this, "name", "near"), sr(this, "client"), sr(this, "httpProviders"), sr(this, "events"), sr(this, "namespace"), sr(this, "chainId"), this.namespace = e.namespace, this.events = ue("events"), this.client = ue("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
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
  setDefaultChain(e, s) {
    if (this.chainId = e, !this.httpProviders[e]) {
      const r = s || mt(`${this.name}:${e}`, this.namespace);
      if (!r) throw new Error(`No RPC url provided for chainId: ${e}`);
      this.setHttpProvider(e, r);
    }
    this.events.emit(_t.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
  }
  getAccounts() {
    const e = this.namespace.accounts;
    return e ? e.filter((s) => s.split(":")[1] === this.chainId.toString()).map((s) => s.split(":")[2]) || [] : [];
  }
  createHttpProviders() {
    const e = {};
    return this.namespace.chains.forEach((s) => {
      var r;
      e[s] = this.createHttpProvider(s, (r = this.namespace.rpcMap) == null ? void 0 : r[s]);
    }), e;
  }
  getHttpProvider() {
    const e = `${this.name}:${this.chainId}`, s = this.httpProviders[e];
    if (typeof s > "u") throw new Error(`JSON-RPC provider for ${e} not found`);
    return s;
  }
  setHttpProvider(e, s) {
    const r = this.createHttpProvider(e, s);
    r && (this.httpProviders[e] = r);
  }
  createHttpProvider(e, s) {
    const r = s || mt(e, this.namespace);
    return typeof r > "u" ? void 0 : new At(new Ut(r, ue("disableProviderPing")));
  }
}
var Av = Object.defineProperty, _v = (t, e, s) => e in t ? Av(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s, rr = (t, e, s) => _v(t, typeof e != "symbol" ? e + "" : e, s);
class Sv {
  constructor(e) {
    rr(this, "name", "tezos"), rr(this, "client"), rr(this, "httpProviders"), rr(this, "events"), rr(this, "namespace"), rr(this, "chainId"), this.namespace = e.namespace, this.events = ue("events"), this.client = ue("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
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
  setDefaultChain(e, s) {
    if (this.chainId = e, !this.httpProviders[e]) {
      const r = s || mt(`${this.name}:${e}`, this.namespace);
      if (!r) throw new Error(`No RPC url provided for chainId: ${e}`);
      this.setHttpProvider(e, r);
    }
    this.events.emit(_t.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
  }
  getAccounts() {
    const e = this.namespace.accounts;
    return e ? e.filter((s) => s.split(":")[1] === this.chainId.toString()).map((s) => s.split(":")[2]) || [] : [];
  }
  createHttpProviders() {
    const e = {};
    return this.namespace.chains.forEach((s) => {
      e[s] = this.createHttpProvider(s);
    }), e;
  }
  getHttpProvider() {
    const e = `${this.name}:${this.chainId}`, s = this.httpProviders[e];
    if (typeof s > "u") throw new Error(`JSON-RPC provider for ${e} not found`);
    return s;
  }
  setHttpProvider(e, s) {
    const r = this.createHttpProvider(e, s);
    r && (this.httpProviders[e] = r);
  }
  createHttpProvider(e, s) {
    const r = s || mt(e, this.namespace);
    return typeof r > "u" ? void 0 : new At(new Ut(r));
  }
}
var Pv = Object.defineProperty, Ov = (t, e, s) => e in t ? Pv(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s, ir = (t, e, s) => Ov(t, typeof e != "symbol" ? e + "" : e, s);
class Tv {
  constructor(e) {
    ir(this, "name", or), ir(this, "client"), ir(this, "httpProviders"), ir(this, "events"), ir(this, "namespace"), ir(this, "chainId"), this.namespace = e.namespace, this.events = ue("events"), this.client = ue("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
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
  setDefaultChain(e, s) {
    this.httpProviders[e] || this.setHttpProvider(e, s), this.chainId = e, this.events.emit(_t.DEFAULT_CHAIN_CHANGED, `${this.name}:${e}`);
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
    return e ? [...new Set(e.filter((s) => s.split(":")[1] === this.chainId.toString()).map((s) => s.split(":")[2]))] : [];
  }
  createHttpProviders() {
    var e, s;
    const r = {};
    return (s = (e = this.namespace) == null ? void 0 : e.accounts) == null || s.forEach((i) => {
      const n = pr(i);
      r[`${n.namespace}:${n.reference}`] = this.createHttpProvider(i);
    }), r;
  }
  getHttpProvider(e) {
    const s = this.httpProviders[e];
    if (typeof s > "u") throw new Error(`JSON-RPC provider for ${e} not found`);
    return s;
  }
  setHttpProvider(e, s) {
    const r = this.createHttpProvider(e, s);
    r && (this.httpProviders[e] = r);
  }
  createHttpProvider(e, s) {
    const r = s || mt(e, this.namespace, this.client.core.projectId);
    if (!r) throw new Error(`No RPC url provided for chainId: ${e}`);
    return new At(new Ut(r, ue("disableProviderPing")));
  }
}
var kv = Object.defineProperty, xv = Object.defineProperties, Rv = Object.getOwnPropertyDescriptors, pc = Object.getOwnPropertySymbols, $v = Object.prototype.hasOwnProperty, Uv = Object.prototype.propertyIsEnumerable, ro = (t, e, s) => e in t ? kv(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s, _i = (t, e) => {
  for (var s in e || (e = {})) $v.call(e, s) && ro(t, s, e[s]);
  if (pc) for (var s of pc(e)) Uv.call(e, s) && ro(t, s, e[s]);
  return t;
}, Nn = (t, e) => xv(t, Rv(e)), Ct = (t, e, s) => ro(t, typeof e != "symbol" ? e + "" : e, s);
class Eo {
  constructor(e) {
    Ct(this, "client"), Ct(this, "namespaces"), Ct(this, "optionalNamespaces"), Ct(this, "sessionProperties"), Ct(this, "scopedProperties"), Ct(this, "events", new co()), Ct(this, "rpcProviders", {}), Ct(this, "session"), Ct(this, "providerOpts"), Ct(this, "logger"), Ct(this, "uri"), Ct(this, "disableProviderPing", !1), this.providerOpts = e, this.logger = typeof (e == null ? void 0 : e.logger) < "u" && typeof (e == null ? void 0 : e.logger) != "string" ? e.logger : no(ni({ level: (e == null ? void 0 : e.logger) || tc })), this.disableProviderPing = (e == null ? void 0 : e.disableProviderPing) || !1;
  }
  static async init(e) {
    const s = new Eo(e);
    return await s.initialize(), s;
  }
  async request(e, s, r) {
    const [i, n] = this.validateChain(s);
    if (!this.session) throw new Error("Please call connect() before request()");
    return await this.getProvider(i).request({ request: _i({}, e), chainId: `${i}:${n}`, topic: this.session.topic, expiry: r });
  }
  sendAsync(e, s, r, i) {
    const n = (/* @__PURE__ */ new Date()).getTime();
    this.request(e, r, i).then((o) => s(null, ji(n, o))).catch((o) => s(o, void 0));
  }
  async enable() {
    if (!this.client) throw new Error("Sign Client not initialized");
    return this.session || await this.connect({ namespaces: this.namespaces, optionalNamespaces: this.optionalNamespaces, sessionProperties: this.sessionProperties, scopedProperties: this.scopedProperties }), await this.requestAccounts();
  }
  async disconnect() {
    var e;
    if (!this.session) throw new Error("Please call connect() before enable()");
    await this.client.disconnect({ topic: (e = this.session) == null ? void 0 : e.topic, reason: me("USER_DISCONNECTED") }), await this.cleanup();
  }
  async connect(e) {
    if (!this.client) throw new Error("Sign Client not initialized");
    if (this.setNamespaces(e), await this.cleanupPendingPairings(), !e.skipPairing) return await this.pair(e.pairingTopic);
  }
  async authenticate(e, s) {
    if (!this.client) throw new Error("Sign Client not initialized");
    this.setNamespaces(e), await this.cleanupPendingPairings();
    const { uri: r, response: i } = await this.client.authenticate(e, s);
    r && (this.uri = r, this.events.emit("display_uri", r));
    const n = await i();
    if (this.session = n.session, this.session) {
      const o = lc(this.session.namespaces);
      this.namespaces = Ai(this.namespaces, o), await this.persist("namespaces", this.namespaces), this.onConnect();
    }
    return n;
  }
  on(e, s) {
    this.events.on(e, s);
  }
  once(e, s) {
    this.events.once(e, s);
  }
  removeListener(e, s) {
    this.events.removeListener(e, s);
  }
  off(e, s) {
    this.events.off(e, s);
  }
  get isWalletConnect() {
    return !0;
  }
  async pair(e) {
    const { uri: s, approval: r } = await this.client.connect({ pairingTopic: e, requiredNamespaces: this.namespaces, optionalNamespaces: this.optionalNamespaces, sessionProperties: this.sessionProperties, scopedProperties: this.scopedProperties });
    s && (this.uri = s, this.events.emit("display_uri", s));
    const i = await r();
    this.session = i;
    const n = lc(i.namespaces);
    return this.namespaces = Ai(this.namespaces, n), await this.persist("namespaces", this.namespaces), await this.persist("optionalNamespaces", this.optionalNamespaces), this.onConnect(), this.session;
  }
  setDefaultChain(e, s) {
    try {
      if (!this.session) return;
      const [r, i] = this.validateChain(e), n = this.getProvider(r);
      n.name === or ? n.setDefaultChain(`${r}:${i}`, s) : n.setDefaultChain(i, s);
    } catch (r) {
      if (!/Please call connect/.test(r.message)) throw r;
    }
  }
  async cleanupPendingPairings(e = {}) {
    this.logger.info("Cleaning up inactive pairings...");
    const s = this.client.pairing.getAll();
    if (ys(s)) {
      for (const r of s) e.deletePairings ? this.client.core.expirer.set(r.topic, 0) : await this.client.core.relayer.subscriber.unsubscribe(r.topic);
      this.logger.info(`Inactive pairings cleared: ${s.length}`);
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
    var e, s;
    if (this.client = this.providerOpts.client || await ub.init({ core: this.providerOpts.core, logger: this.providerOpts.logger || tc, relayUrl: this.providerOpts.relayUrl || db, projectId: this.providerOpts.projectId, metadata: this.providerOpts.metadata, storageOptions: this.providerOpts.storageOptions, storage: this.providerOpts.storage, name: this.providerOpts.name, customStoragePrefix: this.providerOpts.customStoragePrefix, telemetryEnabled: this.providerOpts.telemetryEnabled }), this.providerOpts.session) try {
      this.session = this.client.session.get(this.providerOpts.session.topic);
    } catch (r) {
      throw this.logger.error("Failed to get session", r), new Error(`The provided session: ${(s = (e = this.providerOpts) == null ? void 0 : e.session) == null ? void 0 : s.topic} doesn't exist in the Sign client`);
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
    const e = [...new Set(Object.keys(this.session.namespaces).map((s) => ur(s)))];
    In("client", this.client), In("events", this.events), In("disableProviderPing", this.disableProviderPing), e.forEach((s) => {
      if (!this.session) return;
      const r = Gb(s, this.session), i = Bl(r), n = Ai(this.namespaces, this.optionalNamespaces), o = Nn(_i({}, n[s]), { accounts: r, chains: i });
      switch (s) {
        case "eip155":
          this.rpcProviders[s] = new rv({ namespace: o });
          break;
        case "algorand":
          this.rpcProviders[s] = new hv({ namespace: o });
          break;
        case "solana":
          this.rpcProviders[s] = new ov({ namespace: o });
          break;
        case "cosmos":
          this.rpcProviders[s] = new lv({ namespace: o });
          break;
        case "polkadot":
          this.rpcProviders[s] = new Xb({ namespace: o });
          break;
        case "cip34":
          this.rpcProviders[s] = new fv({ namespace: o });
          break;
        case "elrond":
          this.rpcProviders[s] = new yv({ namespace: o });
          break;
        case "multiversx":
          this.rpcProviders[s] = new Ev({ namespace: o });
          break;
        case "near":
          this.rpcProviders[s] = new Nv({ namespace: o });
          break;
        case "tezos":
          this.rpcProviders[s] = new Sv({ namespace: o });
          break;
        default:
          this.rpcProviders[or] ? this.rpcProviders[or].updateNamespace(o) : this.rpcProviders[or] = new Tv({ namespace: o });
      }
    });
  }
  registerEventListeners() {
    if (typeof this.client > "u") throw new Error("Sign Client is not initialized");
    this.client.on("session_ping", (e) => {
      var s;
      const { topic: r } = e;
      r === ((s = this.session) == null ? void 0 : s.topic) && this.events.emit("session_ping", e);
    }), this.client.on("session_event", (e) => {
      var s;
      const { params: r, topic: i } = e;
      if (i !== ((s = this.session) == null ? void 0 : s.topic)) return;
      const { event: n } = r;
      if (n.name === "accountsChanged") {
        const o = n.data;
        o && ys(o) && this.events.emit("accountsChanged", o.map(cc));
      } else if (n.name === "chainChanged") {
        const o = r.chainId, a = r.event.data, c = ur(o), l = Cn(o) !== Cn(a) ? `${c}:${Cn(a)}` : o;
        this.onChainChanged(l);
      } else this.events.emit(n.name, n.data);
      this.events.emit("session_event", e);
    }), this.client.on("session_update", ({ topic: e, params: s }) => {
      var r, i;
      if (e !== ((r = this.session) == null ? void 0 : r.topic)) return;
      const { namespaces: n } = s, o = (i = this.client) == null ? void 0 : i.session.get(e);
      this.session = Nn(_i({}, o), { namespaces: n }), this.onSessionUpdate(), this.events.emit("session_update", { topic: e, params: s });
    }), this.client.on("session_delete", async (e) => {
      var s;
      e.topic === ((s = this.session) == null ? void 0 : s.topic) && (await this.cleanup(), this.events.emit("session_delete", e), this.events.emit("disconnect", Nn(_i({}, me("USER_DISCONNECTED")), { data: e.topic })));
    }), this.on(_t.DEFAULT_CHAIN_CHANGED, (e) => {
      this.onChainChanged(e, !0);
    });
  }
  getProvider(e) {
    return this.rpcProviders[e] || this.rpcProviders[or];
  }
  onSessionUpdate() {
    Object.keys(this.rpcProviders).forEach((e) => {
      var s;
      this.getProvider(e).updateNamespace((s = this.session) == null ? void 0 : s.namespaces[e]);
    });
  }
  setNamespaces(e) {
    const { namespaces: s = {}, optionalNamespaces: r = {}, sessionProperties: i, scopedProperties: n } = e;
    this.optionalNamespaces = Ai(s, r), this.sessionProperties = i, this.scopedProperties = n;
  }
  validateChain(e) {
    const [s, r] = (e == null ? void 0 : e.split(":")) || ["", ""];
    if (!this.namespaces || !Object.keys(this.namespaces).length) return [s, r];
    if (s && !Object.keys(this.namespaces || {}).map((o) => ur(o)).includes(s)) throw new Error(`Namespace '${s}' is not configured. Please call connect() first with namespace config.`);
    if (s && r) return [s, r];
    const i = ur(Object.keys(this.namespaces)[0]), n = this.rpcProviders[i].getDefaultChain();
    return [i, n];
  }
  async requestAccounts() {
    const [e] = this.validateChain();
    return await this.getProvider(e).requestAccounts();
  }
  async onChainChanged(e, s = !1) {
    if (!this.namespaces) return;
    const [r, i] = this.validateChain(e);
    if (!i) return;
    this.updateNamespaceChain(r, i), this.events.emit("chainChanged", i);
    const n = this.getProvider(r).getDefaultChain();
    s || this.getProvider(r).setDefaultChain(i), this.emitAccountsChangedOnChainChange({ namespace: r, previousChainId: n, newChainId: e }), await this.persist("namespaces", this.namespaces);
  }
  emitAccountsChangedOnChainChange({ namespace: e, previousChainId: s, newChainId: r }) {
    var i, n;
    try {
      if (s === r) return;
      const o = (n = (i = this.session) == null ? void 0 : i.namespaces[e]) == null ? void 0 : n.accounts;
      if (!o) return;
      const a = o.filter((c) => c.includes(`${r}:`)).map(cc);
      if (!ys(a)) return;
      this.events.emit("accountsChanged", a);
    } catch (o) {
      this.logger.warn("Failed to emit accountsChanged on chain change", o);
    }
  }
  updateNamespaceChain(e, s) {
    if (!this.namespaces) return;
    const r = this.namespaces[e] ? e : `${e}:${s}`, i = { chains: [], methods: [], events: [], defaultChain: s };
    this.namespaces[r] ? this.namespaces[r] && (this.namespaces[r].defaultChain = s) : this.namespaces[r] = i;
  }
  onConnect() {
    this.createProviders(), this.events.emit("connect", { session: this.session });
  }
  async cleanup() {
    this.namespaces = void 0, this.optionalNamespaces = void 0, this.sessionProperties = void 0, await this.deleteFromStore("namespaces"), await this.deleteFromStore("optionalNamespaces"), await this.deleteFromStore("sessionProperties"), this.session = void 0, await this.cleanupPendingPairings({ deletePairings: !0 }), await this.cleanupStorage();
  }
  async persist(e, s) {
    var r;
    const i = ((r = this.session) == null ? void 0 : r.topic) || "";
    await this.client.core.storage.setItem(`${Ii}/${e}${i}`, s);
  }
  async getFromStore(e) {
    var s;
    const r = ((s = this.session) == null ? void 0 : s.topic) || "";
    return await this.client.core.storage.getItem(`${Ii}/${e}${r}`);
  }
  async deleteFromStore(e) {
    var s;
    const r = ((s = this.session) == null ? void 0 : s.topic) || "";
    await this.client.core.storage.removeItem(`${Ii}/${e}${r}`);
  }
  async cleanupStorage() {
    var e;
    try {
      if (((e = this.client) == null ? void 0 : e.session.length) > 0) return;
      const s = await this.client.core.storage.getKeys();
      for (const r of s) r.startsWith(Ii) && await this.client.core.storage.removeItem(r);
    } catch (s) {
      this.logger.warn("Failed to cleanup storage", s);
    }
  }
}
const Xr = {
  getSIWX() {
    return O.state.siwx;
  },
  async initializeIfEnabled() {
    var n;
    const t = O.state.siwx, e = p.getActiveCaipAddress();
    if (!(t && e))
      return;
    const [s, r, i] = e.split(":");
    if (p.checkIfSupportedNetwork(s))
      try {
        if ((await t.getSessions(`${s}:${r}`, i)).length)
          return;
        await qe.open({
          view: "SIWXSignMessage"
        });
      } catch (o) {
        console.error("SIWXUtil:initializeIfEnabled", o), Se.sendEvent({
          type: "track",
          event: "SIWX_AUTH_ERROR",
          properties: this.getSIWXEventProperties()
        }), await ((n = Y._getClient()) == null ? void 0 : n.disconnect().catch(console.error)), re.reset("Connect"), Rt.showError("A problem occurred while trying initialize authentication");
      }
  },
  async requestSignMessage() {
    const t = O.state.siwx, e = X.getPlainAddress(p.getActiveCaipAddress()), s = p.getActiveCaipNetwork(), r = Y._getClient();
    if (!t)
      throw new Error("SIWX is not enabled");
    if (!e)
      throw new Error("No ActiveCaipAddress found");
    if (!s)
      throw new Error("No ActiveCaipNetwork or client found");
    if (!r)
      throw new Error("No ConnectionController client found");
    try {
      const i = await t.createMessage({
        chainId: s.caipNetworkId,
        accountAddress: e
      }), n = i.toString();
      B.getConnectorId(s.chainNamespace) === z.CONNECTOR_ID.AUTH && re.pushTransactionStack({});
      const a = await r.signMessage(n);
      await t.addSession({
        data: i,
        message: n,
        signature: a
      }), qe.close(), Se.sendEvent({
        type: "track",
        event: "SIWX_AUTH_SUCCESS",
        properties: this.getSIWXEventProperties()
      });
    } catch (i) {
      const n = this.getSIWXEventProperties();
      (!qe.state.open || re.state.view === "ApproveTransaction") && await qe.open({
        view: "SIWXSignMessage"
      }), n.isSmartAccount ? Rt.showError("This application might not support Smart Accounts") : Rt.showError("Signature declined"), Se.sendEvent({
        type: "track",
        event: "SIWX_AUTH_ERROR",
        properties: n
      }), console.error("SWIXUtil:requestSignMessage", i);
    }
  },
  async cancelSignMessage() {
    var t;
    try {
      const e = this.getSIWX();
      ((t = e == null ? void 0 : e.getRequired) == null ? void 0 : t.call(e)) ? await Y.disconnect() : qe.close(), re.reset("Connect"), Se.sendEvent({
        event: "CLICK_CANCEL_SIWX",
        type: "track",
        properties: this.getSIWXEventProperties()
      });
    } catch (e) {
      console.error("SIWXUtil:cancelSignMessage", e);
    }
  },
  async getSessions() {
    const t = O.state.siwx, e = X.getPlainAddress(p.getActiveCaipAddress()), s = p.getActiveCaipNetwork();
    return t && e && s ? t.getSessions(s.caipNetworkId, e) : [];
  },
  async isSIWXCloseDisabled() {
    var e;
    const t = this.getSIWX();
    if (t) {
      const s = re.state.view === "ApproveTransaction", r = re.state.view === "SIWXSignMessage";
      if (s || r)
        return ((e = t.getRequired) == null ? void 0 : e.call(t)) && (await this.getSessions()).length === 0;
    }
    return !1;
  },
  async universalProviderAuthenticate({ universalProvider: t, chains: e, methods: s }) {
    var a, c, l;
    const r = Xr.getSIWX(), i = new Set(e.map((u) => u.split(":")[0]));
    if (!r || i.size !== 1 || !i.has("eip155"))
      return !1;
    const n = await r.createMessage({
      chainId: ((a = p.getActiveCaipNetwork()) == null ? void 0 : a.caipNetworkId) || "",
      accountAddress: ""
    }), o = await t.authenticate({
      nonce: n.nonce,
      domain: n.domain,
      uri: n.uri,
      exp: n.expirationTime,
      iat: n.issuedAt,
      nbf: n.notBefore,
      requestId: n.requestId,
      version: n.version,
      resources: n.resources,
      statement: n.statement,
      chainId: n.chainId,
      methods: s,
      // The first chainId is what is used for universal provider to build the message
      chains: [n.chainId, ...e.filter((u) => u !== n.chainId)]
    });
    if (Rt.showLoading("Authenticating...", { autoClose: !1 }), W.setConnectedWalletInfo({
      ...o.session.peer.metadata,
      name: o.session.peer.metadata.name,
      icon: (c = o.session.peer.metadata.icons) == null ? void 0 : c[0],
      type: "WALLET_CONNECT"
    }, Array.from(i)[0]), (l = o == null ? void 0 : o.auths) != null && l.length) {
      const u = o.auths.map((d) => {
        const h = t.client.formatAuthMessage({
          request: d.p,
          iss: d.p.iss
        });
        return {
          data: {
            ...d.p,
            accountAddress: d.p.iss.split(":").slice(-1).join(""),
            chainId: d.p.iss.split(":").slice(2, 4).join(":"),
            uri: d.p.aud,
            version: d.p.version || n.version,
            expirationTime: d.p.exp,
            issuedAt: d.p.iat,
            notBefore: d.p.nbf
          },
          message: h,
          signature: d.s.s,
          cacao: d
        };
      });
      try {
        await r.setSessions(u), Se.sendEvent({
          type: "track",
          event: "SIWX_AUTH_SUCCESS",
          properties: Xr.getSIWXEventProperties()
        });
      } catch (d) {
        throw console.error("SIWX:universalProviderAuth - failed to set sessions", d), Se.sendEvent({
          type: "track",
          event: "SIWX_AUTH_ERROR",
          properties: Xr.getSIWXEventProperties()
        }), await t.disconnect().catch(console.error), d;
      } finally {
        Rt.hide();
      }
    }
    return !0;
  },
  getSIWXEventProperties() {
    var e, s;
    const t = p.state.activeChain;
    return {
      network: ((e = p.state.activeCaipNetwork) == null ? void 0 : e.caipNetworkId) || "",
      isSmartAccount: ((s = W.state.preferredAccountTypes) == null ? void 0 : s[t]) === Hr.ACCOUNT_TYPES.SMART_ACCOUNT
    };
  },
  async clearSessions() {
    const t = this.getSIWX();
    t && await t.setSessions([]);
  }
};
function Si(t, e) {
  return B.getConnectorId(t) === e;
}
function Dv(t) {
  const e = Array.from(p.state.chains.keys());
  let s = [];
  return t ? (s.push([t, p.state.chains.get(t)]), Si(t, z.CONNECTOR_ID.WALLET_CONNECT) ? e.forEach((r) => {
    r !== t && Si(r, z.CONNECTOR_ID.WALLET_CONNECT) && s.push([r, p.state.chains.get(r)]);
  }) : Si(t, z.CONNECTOR_ID.AUTH) && e.forEach((r) => {
    r !== t && Si(r, z.CONNECTOR_ID.AUTH) && s.push([r, p.state.chains.get(r)]);
  })) : s = Array.from(p.state.chains.entries()), s;
}
const us = {
  EIP155: "eip155",
  CONNECTOR_TYPE_WALLET_CONNECT: "WALLET_CONNECT",
  CONNECTOR_TYPE_INJECTED: "INJECTED",
  CONNECTOR_TYPE_ANNOUNCED: "ANNOUNCED"
}, Bi = {
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
    [z.CONNECTOR_ID.COINBASE]: "0c2840c3-5b04-4c44-9661-fbd4b49e1800",
    [z.CONNECTOR_ID.COINBASE_SDK]: "0c2840c3-5b04-4c44-9661-fbd4b49e1800",
    [z.CONNECTOR_ID.SAFE]: "461db637-8616-43ce-035a-d89b8a1d5800",
    [z.CONNECTOR_ID.LEDGER]: "54a1aa77-d202-4f8d-0fb2-5d2bb6db0300",
    [z.CONNECTOR_ID.WALLET_CONNECT]: "ef1a1fcf-7fe8-4d69-bd6d-fda1345b4400",
    [z.CONNECTOR_ID.INJECTED]: "07ba87ed-43aa-4adf-4540-9e6a2b9cae00"
  },
  ConnectorNamesMap: {
    [z.CONNECTOR_ID.INJECTED]: "Browser Wallet",
    [z.CONNECTOR_ID.WALLET_CONNECT]: "WalletConnect",
    [z.CONNECTOR_ID.COINBASE]: "Coinbase",
    [z.CONNECTOR_ID.COINBASE_SDK]: "Coinbase",
    [z.CONNECTOR_ID.LEDGER]: "Ledger",
    [z.CONNECTOR_ID.SAFE]: "Safe"
  }
}, Co = {
  getCaipTokens(t) {
    if (!t)
      return;
    const e = {};
    return Object.entries(t).forEach(([s, r]) => {
      e[`${us.EIP155}:${s}`] = r;
    }), e;
  },
  isLowerCaseMatch(t, e) {
    return (t == null ? void 0 : t.toLowerCase()) === (e == null ? void 0 : e.toLowerCase());
  }
};
new AbortController();
const nr = {
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
      longMessage: () => `Origin ${Lv() ? window.origin : "unknown"} not found on Allowlist - update configuration on cloud.reown.com`
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
    }
  }
};
function Lv() {
  return typeof window < "u";
}
const Fv = {
  createLogger(t, e = "error") {
    const s = ni({
      level: e
    }), { logger: r } = vc({
      opts: s
    });
    return r.error = (...i) => {
      for (const n of i)
        if (n instanceof Error) {
          t(n, ...i);
          return;
        }
      t(void 0, ...i);
    }, r;
  }
}, Mv = "rpc.walletconnect.org";
function gc(t, e) {
  const s = new URL("https://rpc.walletconnect.org/v1/");
  return s.searchParams.set("chainId", t), s.searchParams.set("projectId", e), s.toString();
}
const An = [
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
], ar = {
  extendRpcUrlWithProjectId(t, e) {
    let s = !1;
    try {
      s = new URL(t).host === Mv;
    } catch {
      s = !1;
    }
    if (s) {
      const r = new URL(t);
      return r.searchParams.has("projectId") || r.searchParams.set("projectId", e), r.toString();
    }
    return t;
  },
  isCaipNetwork(t) {
    return "chainNamespace" in t && "caipNetworkId" in t;
  },
  getChainNamespace(t) {
    return this.isCaipNetwork(t) ? t.chainNamespace : z.CHAIN.EVM;
  },
  getCaipNetworkId(t) {
    return this.isCaipNetwork(t) ? t.caipNetworkId : `${z.CHAIN.EVM}:${t.id}`;
  },
  getDefaultRpcUrl(t, e, s) {
    var i, n, o;
    const r = (o = (n = (i = t.rpcUrls) == null ? void 0 : i.default) == null ? void 0 : n.http) == null ? void 0 : o[0];
    return An.includes(e) ? gc(e, s) : r || "";
  },
  extendCaipNetwork(t, { customNetworkImageUrls: e, projectId: s, customRpcUrls: r }) {
    var h, g, w, m, f;
    const i = this.getChainNamespace(t), n = this.getCaipNetworkId(t), o = (h = t.rpcUrls.default.http) == null ? void 0 : h[0], a = this.getDefaultRpcUrl(t, n, s), c = ((m = (w = (g = t == null ? void 0 : t.rpcUrls) == null ? void 0 : g.chainDefault) == null ? void 0 : w.http) == null ? void 0 : m[0]) || o, l = ((f = r == null ? void 0 : r[n]) == null ? void 0 : f.map((y) => y.url)) || [], u = [...l, a], d = [...l];
    return c && !d.includes(c) && d.push(c), {
      ...t,
      chainNamespace: i,
      caipNetworkId: n,
      assets: {
        imageId: Bi.NetworkImageIds[t.id],
        imageUrl: e == null ? void 0 : e[t.id]
      },
      rpcUrls: {
        ...t.rpcUrls,
        default: {
          http: u
        },
        chainDefault: {
          http: d
        }
      }
    };
  },
  extendCaipNetworks(t, { customNetworkImageUrls: e, projectId: s, customRpcUrls: r }) {
    return t.map((i) => ar.extendCaipNetwork(i, {
      customNetworkImageUrls: e,
      customRpcUrls: r,
      projectId: s
    }));
  },
  getViemTransport(t, e, s) {
    var i, n, o;
    const r = [];
    return s == null || s.forEach((a) => {
      r.push(mi(a.url, a.config));
    }), An.includes(t.caipNetworkId) && r.push(mi(gc(t.caipNetworkId, e), {
      fetchOptions: {
        headers: {
          "Content-Type": "text/plain"
        }
      }
    })), (o = (n = (i = t == null ? void 0 : t.rpcUrls) == null ? void 0 : i.default) == null ? void 0 : n.http) == null || o.forEach((a) => {
      r.push(mi(a));
    }), Ao(r);
  },
  extendWagmiTransports(t, e, s) {
    if (An.includes(t.caipNetworkId)) {
      const r = this.getDefaultRpcUrl(t, t.caipNetworkId, e);
      return Ao([s, mi(r)]);
    }
    return s;
  },
  getUnsupportedNetwork(t) {
    return {
      id: t.split(":")[1],
      caipNetworkId: t,
      name: z.UNSUPPORTED_NETWORK_NAME,
      chainNamespace: t.split(":")[0],
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
  getCaipNetworkFromStorage(t) {
    var c;
    const e = j.getActiveCaipNetworkId(), s = p.getAllRequestedCaipNetworks(), r = Array.from(((c = p.state.chains) == null ? void 0 : c.keys()) || []), i = e == null ? void 0 : e.split(":")[0], n = i ? r.includes(i) : !1, o = s == null ? void 0 : s.find((l) => l.caipNetworkId === e);
    return n && !o && e ? this.getUnsupportedNetwork(e) : o || t || (s == null ? void 0 : s[0]);
  }
}, qi = {
  eip155: void 0,
  solana: void 0,
  polkadot: void 0,
  bip122: void 0,
  cosmos: void 0
}, nt = Ae({
  providers: { ...qi },
  providerIds: { ...qi }
}), _e = {
  state: nt,
  subscribeKey(t, e) {
    return Xe(nt, t, e);
  },
  subscribe(t) {
    return Ye(nt, () => {
      t(nt);
    });
  },
  subscribeProviders(t) {
    return Ye(nt.providers, () => t(nt.providers));
  },
  setProvider(t, e) {
    e && (nt.providers[t] = Ds(e));
  },
  getProvider(t) {
    return nt.providers[t];
  },
  setProviderId(t, e) {
    e && (nt.providerIds[t] = e);
  },
  getProviderId(t) {
    if (t)
      return nt.providerIds[t];
  },
  reset() {
    nt.providers = { ...qi }, nt.providerIds = { ...qi };
  },
  resetChain(t) {
    nt.providers[t] = void 0, nt.providerIds[t] = void 0;
  }
}, Bv = {
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
}, io = {
  filterOutDuplicatesByRDNS(t) {
    const e = O.state.enableEIP6963 ? B.state.connectors : [], s = j.getRecentWallets(), r = e.map((a) => {
      var c;
      return (c = a.info) == null ? void 0 : c.rdns;
    }).filter(Boolean), i = s.map((a) => a.rdns).filter(Boolean), n = r.concat(i);
    if (n.includes("io.metamask.mobile") && X.isMobile()) {
      const a = n.indexOf("io.metamask.mobile");
      n[a] = "io.metamask";
    }
    return t.filter((a) => !n.includes(String(a == null ? void 0 : a.rdns)));
  },
  filterOutDuplicatesByIds(t) {
    const e = B.state.connectors.filter((a) => a.type === "ANNOUNCED" || a.type === "INJECTED"), s = j.getRecentWallets(), r = e.map((a) => a.explorerId), i = s.map((a) => a.id), n = r.concat(i);
    return t.filter((a) => !n.includes(a == null ? void 0 : a.id));
  },
  filterOutDuplicateWallets(t) {
    const e = this.filterOutDuplicatesByRDNS(t);
    return this.filterOutDuplicatesByIds(e);
  },
  markWalletsAsInstalled(t) {
    const { connectors: e } = B.state, { featuredWalletIds: s } = O.state, r = e.filter((o) => o.type === "ANNOUNCED").reduce((o, a) => {
      var c;
      return (c = a.info) != null && c.rdns && (o[a.info.rdns] = !0), o;
    }, {});
    return t.map((o) => ({
      ...o,
      installed: !!o.rdns && !!r[o.rdns ?? ""]
    })).sort((o, a) => {
      const c = Number(a.installed) - Number(o.installed);
      if (c !== 0)
        return c;
      if (s != null && s.length) {
        const l = s.indexOf(o.id), u = s.indexOf(a.id);
        if (l !== -1 && u !== -1)
          return l - u;
        if (l !== -1)
          return -1;
        if (u !== -1)
          return 1;
      }
      return 0;
    });
  },
  getConnectOrderMethod(t, e) {
    var c;
    const s = (t == null ? void 0 : t.connectMethodsOrder) || ((c = O.state.features) == null ? void 0 : c.connectMethodsOrder), r = e || B.state.connectors;
    if (s)
      return s;
    const { injected: i, announced: n } = Ri.getConnectorsByType(r, K.state.recommended, K.state.featured), o = i.filter(Ri.showConnector), a = n.filter(Ri.showConnector);
    return o.length || a.length ? ["wallet", "email", "social"] : Bv.DEFAULT_CONNECT_METHOD_ORDER;
  },
  isExcluded(t) {
    const e = !!t.rdns && K.state.excludedWallets.some((r) => r.rdns === t.rdns), s = !!t.name && K.state.excludedWallets.some((r) => Co.isLowerCaseMatch(r.name, t.name));
    return e || s;
  }
}, Ri = {
  getConnectorsByType(t, e, s) {
    const { customWallets: r } = O.state, i = j.getRecentWallets(), n = io.filterOutDuplicateWallets(e), o = io.filterOutDuplicateWallets(s), a = t.filter((d) => d.type === "MULTI_CHAIN"), c = t.filter((d) => d.type === "ANNOUNCED"), l = t.filter((d) => d.type === "INJECTED"), u = t.filter((d) => d.type === "EXTERNAL");
    return {
      custom: r,
      recent: i,
      external: u,
      multiChain: a,
      announced: c,
      injected: l,
      recommended: n,
      featured: o
    };
  },
  showConnector(t) {
    var i;
    const e = (i = t.info) == null ? void 0 : i.rdns, s = !!e && K.state.excludedWallets.some((n) => !!n.rdns && n.rdns === e), r = !!t.name && K.state.excludedWallets.some((n) => Co.isLowerCaseMatch(n.name, t.name));
    return !(t.type === "INJECTED" && (t.name === "Browser Wallet" && (!X.isMobile() || X.isMobile() && !e && !Y.checkInstalled()) || s || r) || (t.type === "ANNOUNCED" || t.type === "EXTERNAL") && (s || r));
  },
  getIsConnectedWithWC() {
    return Array.from(p.state.chains.values()).some((s) => B.getConnectorId(s.namespace) === z.CONNECTOR_ID.WALLET_CONNECT);
  },
  getConnectorTypeOrder({ recommended: t, featured: e, custom: s, recent: r, announced: i, injected: n, multiChain: o, external: a, overriddenConnectors: c = ((l) => (l = O.state.features) == null ? void 0 : l.connectorTypeOrder)() ?? [] }) {
    const u = Ri.getIsConnectedWithWC(), g = [
      { type: "walletConnect", isEnabled: O.state.enableWalletConnect && !u },
      { type: "recent", isEnabled: r.length > 0 },
      { type: "injected", isEnabled: [...n, ...i, ...o].length > 0 },
      { type: "featured", isEnabled: e.length > 0 },
      { type: "custom", isEnabled: s && s.length > 0 },
      { type: "external", isEnabled: a.length > 0 },
      { type: "recommended", isEnabled: t.length > 0 }
    ].filter((y) => y.isEnabled), w = new Set(g.map((y) => y.type)), m = c.filter((y) => w.has(y)).map((y) => ({ type: y, isEnabled: !0 })), f = g.filter(({ type: y }) => !m.some(({ type: E }) => E === y));
    return Array.from(new Set([...m, ...f].map(({ type: y }) => y)));
  }
};
let Zr, vs, Es;
function w0(t, e) {
  Zr = document.createElement("style"), vs = document.createElement("style"), Es = document.createElement("style"), Zr.textContent = gr(t).core.cssText, vs.textContent = gr(t).dark.cssText, Es.textContent = gr(t).light.cssText, document.head.appendChild(Zr), document.head.appendChild(vs), document.head.appendChild(Es), jl(e);
}
function jl(t) {
  vs && Es && (t === "light" ? (vs.removeAttribute("media"), Es.media = "enabled") : (Es.removeAttribute("media"), vs.media = "enabled"));
}
function qv(t) {
  Zr && vs && Es && (Zr.textContent = gr(t).core.cssText, vs.textContent = gr(t).dark.cssText, Es.textContent = gr(t).light.cssText);
}
function gr(t) {
  return {
    core: hr`
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
        --w3m-color-mix-strength: ${St(t != null && t["--w3m-color-mix-strength"] ? `${t["--w3m-color-mix-strength"]}%` : "0%")};
        --w3m-font-family: ${St((t == null ? void 0 : t["--w3m-font-family"]) || "Inter, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;")};
        --w3m-font-size-master: ${St((t == null ? void 0 : t["--w3m-font-size-master"]) || "10px")};
        --w3m-border-radius-master: ${St((t == null ? void 0 : t["--w3m-border-radius-master"]) || "4px")};
        --w3m-z-index: ${St((t == null ? void 0 : t["--w3m-z-index"]) || 999)};

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
    light: hr`
      :root {
        --w3m-color-mix: ${St((t == null ? void 0 : t["--w3m-color-mix"]) || "#fff")};
        --w3m-accent: ${St(gs(t, "dark")["--w3m-accent"])};
        --w3m-default: #fff;

        --wui-color-modal-bg-base: ${St(gs(t, "dark")["--w3m-background"])};
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
    dark: hr`
      :root {
        --w3m-color-mix: ${St((t == null ? void 0 : t["--w3m-color-mix"]) || "#000")};
        --w3m-accent: ${St(gs(t, "light")["--w3m-accent"])};
        --w3m-default: #000;

        --wui-color-modal-bg-base: ${St(gs(t, "light")["--w3m-background"])};
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
const y0 = hr`
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
`, b0 = hr`
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
`, v0 = hr`
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
`, Wr = {
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
function gi(t) {
  return {
    formatters: void 0,
    fees: void 0,
    serializers: void 0,
    ...t
  };
}
const fc = gi({
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
}), mc = gi({
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
gi({
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
gi({
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
gi({
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
const jv = {
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
}, $i = {
  getMethodsByChainNamespace(t) {
    return jv[t] || [];
  },
  createDefaultNamespace(t) {
    return {
      methods: this.getMethodsByChainNamespace(t),
      events: ["accountsChanged", "chainChanged"],
      chains: [],
      rpcMap: {}
    };
  },
  applyNamespaceOverrides(t, e) {
    if (!e)
      return { ...t };
    const s = { ...t }, r = /* @__PURE__ */ new Set();
    if (e.methods && Object.keys(e.methods).forEach((i) => r.add(i)), e.chains && Object.keys(e.chains).forEach((i) => r.add(i)), e.events && Object.keys(e.events).forEach((i) => r.add(i)), e.rpcMap && Object.keys(e.rpcMap).forEach((i) => {
      const [n] = i.split(":");
      n && r.add(n);
    }), r.forEach((i) => {
      s[i] || (s[i] = this.createDefaultNamespace(i));
    }), e.methods && Object.entries(e.methods).forEach(([i, n]) => {
      s[i] && (s[i].methods = n);
    }), e.chains && Object.entries(e.chains).forEach(([i, n]) => {
      s[i] && (s[i].chains = n);
    }), e.events && Object.entries(e.events).forEach(([i, n]) => {
      s[i] && (s[i].events = n);
    }), e.rpcMap) {
      const i = /* @__PURE__ */ new Set();
      Object.entries(e.rpcMap).forEach(([n, o]) => {
        const [a, c] = n.split(":");
        !a || !c || !s[a] || (s[a].rpcMap || (s[a].rpcMap = {}), i.has(a) || (s[a].rpcMap = {}, i.add(a)), s[a].rpcMap[c] = o);
      });
    }
    return s;
  },
  createNamespaces(t, e) {
    const s = t.reduce((r, i) => {
      const { id: n, chainNamespace: o, rpcUrls: a } = i, c = a.default.http[0];
      r[o] || (r[o] = this.createDefaultNamespace(o));
      const l = `${o}:${n}`, u = r[o];
      switch (u.chains.push(l), l) {
        case fc.caipNetworkId:
          u.chains.push(fc.deprecatedCaipNetworkId);
          break;
        case mc.caipNetworkId:
          u.chains.push(mc.deprecatedCaipNetworkId);
          break;
      }
      return u != null && u.rpcMap && c && (u.rpcMap[n] = c), r;
    }, {});
    return this.applyNamespaceOverrides(s, e);
  },
  resolveReownName: async (t) => {
    var r;
    const e = await Vr.resolveName(t);
    return ((r = (Object.values(e == null ? void 0 : e.addresses) || [])[0]) == null ? void 0 : r.address) || !1;
  },
  getChainsFromNamespaces(t = {}) {
    return Object.values(t).flatMap((e) => {
      const s = e.chains || [], r = e.accounts.map((i) => {
        const [n, o] = i.split(":");
        return `${n}:${o}`;
      });
      return Array.from(/* @__PURE__ */ new Set([...s, ...r]));
    });
  },
  isSessionEventData(t) {
    return typeof t == "object" && t !== null && "id" in t && "topic" in t && "params" in t && typeof t.params == "object" && t.params !== null && "chainId" in t.params && "event" in t.params && typeof t.params.event == "object" && t.params.event !== null;
  },
  isOriginAllowed(t, e, s) {
    for (const r of [...e, ...s])
      if (r.includes("*")) {
        const n = `^${r.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&").replace(/\\\*/gu, ".*")}$`;
        if (new RegExp(n, "u").test(t))
          return !0;
      } else
        try {
          if (new URL(r).origin === t)
            return !0;
        } catch {
          if (r === t)
            return !0;
        }
    return !1;
  }
};
class Wl {
  constructor({ provider: e, namespace: s }) {
    this.id = z.CONNECTOR_ID.WALLET_CONNECT, this.name = Bi.ConnectorNamesMap[z.CONNECTOR_ID.WALLET_CONNECT], this.type = "WALLET_CONNECT", this.imageId = Bi.ConnectorImageIds[z.CONNECTOR_ID.WALLET_CONNECT], this.getCaipNetworks = p.getCaipNetworks.bind(p), this.caipNetworks = this.getCaipNetworks(), this.provider = e, this.chain = s;
  }
  get chains() {
    return this.getCaipNetworks();
  }
  async connectWalletConnect() {
    if (!await this.authenticate()) {
      const s = this.getCaipNetworks(), r = O.state.universalProviderConfigOverride, i = $i.createNamespaces(s, r);
      await this.provider.connect({ optionalNamespaces: i });
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
    const e = this.chains.map((s) => s.caipNetworkId);
    return Xr.universalProviderAuthenticate({
      universalProvider: this.provider,
      chains: e,
      methods: Wv
    });
  }
}
const Wv = [
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
];
class zv {
  /**
   * Creates an instance of AdapterBlueprint.
   * @param {AdapterBlueprint.Params} params - The parameters for initializing the adapter
   */
  constructor(e) {
    this.availableConnectors = [], this.eventListeners = /* @__PURE__ */ new Map(), this.getCaipNetworks = (s) => p.getCaipNetworks(s), e && this.construct(e);
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
   * Gets the supported networks.
   * @returns {CaipNetwork[]} An array of supported networks
   */
  get networks() {
    return this.getCaipNetworks(this.namespace);
  }
  /**
   * Sets the auth provider.
   * @param {W3mFrameProvider} authProvider - The auth provider instance
   */
  setAuthProvider(e) {
    this.addConnector({
      id: z.CONNECTOR_ID.AUTH,
      type: "AUTH",
      name: z.CONNECTOR_NAMES.AUTH,
      provider: e,
      imageId: Bi.ConnectorImageIds[z.CONNECTOR_ID.AUTH],
      chain: this.namespace,
      chains: []
    });
  }
  /**
   * Adds one or more connectors to the available connectors list.
   * @param {...Connector} connectors - The connectors to add
   */
  addConnector(...e) {
    const s = /* @__PURE__ */ new Set();
    this.availableConnectors = [...e, ...this.availableConnectors].filter((r) => s.has(r.id) ? !1 : (s.add(r.id), !0)), this.emit("connectors", this.availableConnectors);
  }
  setStatus(e, s) {
    W.setStatus(e, s);
  }
  /**
   * Adds an event listener for a specific event.
   * @template T
   * @param {T} eventName - The name of the event
   * @param {EventCallback<T>} callback - The callback function to be called when the event is emitted
   */
  on(e, s) {
    var r;
    this.eventListeners.has(e) || this.eventListeners.set(e, /* @__PURE__ */ new Set()), (r = this.eventListeners.get(e)) == null || r.add(s);
  }
  /**
   * Removes an event listener for a specific event.
   * @template T
   * @param {T} eventName - The name of the event
   * @param {EventCallback<T>} callback - The callback function to be removed
   */
  off(e, s) {
    const r = this.eventListeners.get(e);
    r && r.delete(s);
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
  emit(e, s) {
    const r = this.eventListeners.get(e);
    r && r.forEach((i) => i(s));
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
    var n;
    const { caipNetwork: s, providerType: r } = e;
    if (!e.provider)
      return;
    const i = "provider" in e.provider ? e.provider.provider : e.provider;
    if (r === "WALLET_CONNECT") {
      i.setDefaultChain(s.caipNetworkId);
      return;
    }
    if (i && r === "AUTH") {
      const o = i, a = (n = W.state.preferredAccountTypes) == null ? void 0 : n[s.chainNamespace];
      await o.switchNetwork(s.caipNetworkId);
      const c = await o.getUser({
        chainId: s.caipNetworkId,
        preferredAccountType: a
      });
      this.emit("switchNetwork", c);
    }
  }
  getWalletConnectConnector() {
    const e = this.connectors.find((s) => s instanceof Wl);
    if (!e)
      throw new Error("WalletConnectConnector not found");
    return e;
  }
}
class Hv extends zv {
  setUniversalProvider(e) {
    this.addConnector(new Wl({
      provider: e,
      caipNetworks: this.getCaipNetworks(),
      namespace: this.namespace
    }));
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
      await this.getWalletConnectConnector().disconnect();
    } catch (e) {
      console.warn("UniversalAdapter:disconnect - error", e);
    }
  }
  async getAccounts({ namespace: e }) {
    var i, n, o, a;
    const s = this.provider, r = ((a = (o = (n = (i = s == null ? void 0 : s.session) == null ? void 0 : i.namespaces) == null ? void 0 : n[e]) == null ? void 0 : o.accounts) == null ? void 0 : a.map((c) => {
      const [, , l] = c.split(":");
      return l;
    }).filter((c, l, u) => u.indexOf(c) === l)) || [];
    return Promise.resolve({
      accounts: r.map((c) => X.createAccount(e, c, e === "bip122" ? "payment" : "eoa"))
    });
  }
  async syncConnectors() {
    return Promise.resolve();
  }
  async getBalance(e) {
    var n, o, a, c, l;
    if (!(e.caipNetwork && ve.BALANCE_SUPPORTED_CHAINS.includes((n = e.caipNetwork) == null ? void 0 : n.chainNamespace)) || (o = e.caipNetwork) != null && o.testnet)
      return {
        balance: "0.00",
        symbol: ((a = e.caipNetwork) == null ? void 0 : a.nativeCurrency.symbol) || ""
      };
    if (W.state.balanceLoading && e.chainId === ((c = p.state.activeCaipNetwork) == null ? void 0 : c.id))
      return {
        balance: W.state.balance || "0.00",
        symbol: W.state.balanceSymbol || ""
      };
    const i = (await W.fetchTokenBalance()).find((u) => {
      var d, h;
      return u.chainId === `${(d = e.caipNetwork) == null ? void 0 : d.chainNamespace}:${e.chainId}` && u.symbol === ((h = e.caipNetwork) == null ? void 0 : h.nativeCurrency.symbol);
    });
    return {
      balance: (i == null ? void 0 : i.quantity.numeric) || "0.00",
      symbol: (i == null ? void 0 : i.symbol) || ((l = e.caipNetwork) == null ? void 0 : l.nativeCurrency.symbol) || ""
    };
  }
  async signMessage(e) {
    var o, a, c;
    const { provider: s, message: r, address: i } = e;
    if (!s)
      throw new Error("UniversalAdapter:signMessage - provider is undefined");
    let n = "";
    return ((o = p.state.activeCaipNetwork) == null ? void 0 : o.chainNamespace) === z.CHAIN.SOLANA ? n = (await s.request({
      method: "solana_signMessage",
      params: {
        message: bc.encode(new TextEncoder().encode(r)),
        pubkey: i
      }
    }, (a = p.state.activeCaipNetwork) == null ? void 0 : a.caipNetworkId)).signature : n = await s.request({
      method: "personal_sign",
      params: [r, i]
    }, (c = p.state.activeCaipNetwork) == null ? void 0 : c.caipNetworkId), { signature: n };
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
    var i, n, o, a, c, l;
    const { caipNetwork: s } = e, r = this.getWalletConnectConnector();
    if (s.chainNamespace === z.CHAIN.EVM)
      try {
        await ((i = r.provider) == null ? void 0 : i.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: _o(s.id) }]
        }));
      } catch (u) {
        if (u.code === Wr.ERROR_CODE_UNRECOGNIZED_CHAIN_ID || u.code === Wr.ERROR_INVALID_CHAIN_ID || u.code === Wr.ERROR_CODE_DEFAULT || ((o = (n = u == null ? void 0 : u.data) == null ? void 0 : n.originalError) == null ? void 0 : o.code) === Wr.ERROR_CODE_UNRECOGNIZED_CHAIN_ID)
          try {
            await ((l = r.provider) == null ? void 0 : l.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: _o(s.id),
                  rpcUrls: [(a = s == null ? void 0 : s.rpcUrls.chainDefault) == null ? void 0 : a.http],
                  chainName: s.name,
                  nativeCurrency: s.nativeCurrency,
                  blockExplorerUrls: [(c = s.blockExplorers) == null ? void 0 : c.default.url]
                }
              ]
            }));
          } catch {
            throw new Error("Chain is not supported");
          }
      }
    r.provider.setDefaultChain(s.caipNetworkId);
  }
  getWalletConnectProvider() {
    const e = this.connectors.find((r) => r.type === "WALLET_CONNECT");
    return e == null ? void 0 : e.provider;
  }
}
const Kv = [
  "email",
  "socials",
  "swaps",
  "onramp",
  "activity",
  "reownBranding"
], Pi = {
  email: {
    apiFeatureName: "social_login",
    localFeatureName: "email",
    returnType: !1,
    isLegacy: !1,
    isAvailableOnBasic: !1,
    processApi: (t) => {
      if (!(t != null && t.config))
        return !1;
      const e = t.config;
      return !!t.isEnabled && e.includes("email");
    },
    processFallback: (t) => t === void 0 ? ve.DEFAULT_REMOTE_FEATURES.email : !!t
  },
  socials: {
    apiFeatureName: "social_login",
    localFeatureName: "socials",
    returnType: !1,
    isLegacy: !1,
    isAvailableOnBasic: !1,
    processApi: (t) => {
      if (!(t != null && t.config))
        return !1;
      const e = t.config;
      return t.isEnabled && e.length > 0 ? e.filter((s) => s !== "email") : !1;
    },
    processFallback: (t) => t === void 0 ? ve.DEFAULT_REMOTE_FEATURES.socials : typeof t == "boolean" ? t ? ve.DEFAULT_REMOTE_FEATURES.socials : !1 : t
  },
  swaps: {
    apiFeatureName: "swap",
    localFeatureName: "swaps",
    returnType: !1,
    isLegacy: !1,
    isAvailableOnBasic: !1,
    processApi: (t) => {
      if (!(t != null && t.config))
        return !1;
      const e = t.config;
      return t.isEnabled && e.length > 0 ? e : !1;
    },
    processFallback: (t) => t === void 0 ? ve.DEFAULT_REMOTE_FEATURES.swaps : typeof t == "boolean" ? t ? ve.DEFAULT_REMOTE_FEATURES.swaps : !1 : t
  },
  onramp: {
    apiFeatureName: "onramp",
    localFeatureName: "onramp",
    returnType: !1,
    isLegacy: !1,
    isAvailableOnBasic: !1,
    processApi: (t) => {
      if (!(t != null && t.config))
        return !1;
      const e = t.config;
      return t.isEnabled && e.length > 0 ? e : !1;
    },
    processFallback: (t) => t === void 0 ? ve.DEFAULT_REMOTE_FEATURES.onramp : typeof t == "boolean" ? t ? ve.DEFAULT_REMOTE_FEATURES.onramp : !1 : t
  },
  activity: {
    apiFeatureName: "activity",
    localFeatureName: "history",
    returnType: !1,
    isLegacy: !0,
    isAvailableOnBasic: !1,
    processApi: (t) => !!t.isEnabled,
    processFallback: (t) => t === void 0 ? ve.DEFAULT_REMOTE_FEATURES.activity : !!t
  },
  reownBranding: {
    apiFeatureName: "reown_branding",
    localFeatureName: "reownBranding",
    returnType: !1,
    isLegacy: !1,
    isAvailableOnBasic: !1,
    processApi: (t) => !!t.isEnabled,
    processFallback: (t) => t === void 0 ? ve.DEFAULT_REMOTE_FEATURES.reownBranding : !!t
  }
}, Vv = {
  localSettingsOverridden: /* @__PURE__ */ new Set(),
  getApiConfig(t, e) {
    return e == null ? void 0 : e.find((s) => s.id === t);
  },
  addWarning(t, e) {
    if (t !== void 0) {
      const s = Pi[e], r = s.isLegacy ? `"features.${s.localFeatureName}" (now "${e}")` : `"features.${e}"`;
      this.localSettingsOverridden.add(r);
    }
  },
  processFeature(t, e, s, r, i) {
    const n = Pi[t], o = e[n.localFeatureName];
    if (i && !n.isAvailableOnBasic)
      return !1;
    if (r) {
      const a = this.getApiConfig(n.apiFeatureName, s);
      return (a == null ? void 0 : a.config) === null ? this.processFallbackFeature(t, o) : a != null && a.config ? (o !== void 0 && this.addWarning(o, t), this.processApiFeature(t, a)) : !1;
    }
    return this.processFallbackFeature(t, o);
  },
  processApiFeature(t, e) {
    return Pi[t].processApi(e);
  },
  processFallbackFeature(t, e) {
    return Pi[t].processFallback(e);
  },
  async fetchRemoteFeatures(t) {
    const e = t.basic ?? !1, s = t.features || {};
    this.localSettingsOverridden.clear();
    let r = null, i = !1;
    try {
      r = await K.fetchProjectConfig(), i = r != null;
    } catch (o) {
      console.warn("[Reown Config] Failed to fetch remote project configuration. Using local/default values.", o);
    }
    const n = i && !e ? ve.DEFAULT_REMOTE_FEATURES : ve.DEFAULT_REMOTE_FEATURES_DISABLED;
    try {
      for (const o of Kv) {
        const a = this.processFeature(o, s, r, i, e);
        Object.assign(n, { [o]: a });
      }
    } catch (o) {
      return console.warn("[Reown Config] Failed to process the configuration from Cloud. Using default values.", o), ve.DEFAULT_REMOTE_FEATURES;
    }
    if (i && this.localSettingsOverridden.size > 0) {
      const o = `Your local configuration for ${Array.from(this.localSettingsOverridden).join(", ")} was ignored because a remote configuration was successfully fetched. Please manage these features via your project dashboard on dashboard.reown.com.`;
      Os.open({
        shortMessage: "Local configuration ignored",
        longMessage: `[Reown Config Notice] ${o}`
      }, "warning");
    }
    return n;
  }
};
class Gv {
  constructor(e) {
    this.chainNamespaces = [], this.remoteFeatures = {}, this.reportedAlertErrors = {}, this.getCaipNetwork = (s, r) => {
      var i, n, o, a;
      if (s) {
        const c = (n = (i = p.getNetworkData(s)) == null ? void 0 : i.requestedCaipNetworks) == null ? void 0 : n.find((d) => d.id === r);
        if (c)
          return c;
        const l = (o = p.getNetworkData(s)) == null ? void 0 : o.caipNetwork;
        return l || ((a = p.getRequestedCaipNetworks(s).filter((d) => d.chainNamespace === s)) == null ? void 0 : a[0]);
      }
      return p.state.activeCaipNetwork || this.defaultCaipNetwork;
    }, this.getCaipNetworkId = () => {
      const s = this.getCaipNetwork();
      if (s)
        return s.id;
    }, this.getCaipNetworks = (s) => p.getCaipNetworks(s), this.getActiveChainNamespace = () => p.state.activeChain, this.setRequestedCaipNetworks = (s, r) => {
      p.setRequestedCaipNetworks(s, r);
    }, this.getApprovedCaipNetworkIds = () => p.getAllApprovedCaipNetworkIds(), this.getCaipAddress = (s) => p.state.activeChain === s || !s ? p.state.activeCaipAddress : p.getAccountProp("caipAddress", s), this.setClientId = (s) => {
      J.setClientId(s);
    }, this.getProvider = (s) => _e.getProvider(s), this.getProviderType = (s) => _e.getProviderId(s), this.getPreferredAccountType = (s) => {
      var r;
      return (r = W.state.preferredAccountTypes) == null ? void 0 : r[s];
    }, this.setCaipAddress = (s, r) => {
      W.setCaipAddress(s, r), s && O.state.enableEmbedded && this.close();
    }, this.setBalance = (s, r, i) => {
      W.setBalance(s, r, i);
    }, this.setProfileName = (s, r) => {
      W.setProfileName(s, r);
    }, this.setProfileImage = (s, r) => {
      W.setProfileImage(s, r);
    }, this.setUser = (s, r) => {
      W.setUser(s, r);
    }, this.resetAccount = (s) => {
      W.resetAccount(s);
    }, this.setCaipNetwork = (s) => {
      p.setActiveCaipNetwork(s);
    }, this.setCaipNetworkOfNamespace = (s, r) => {
      p.setChainNetworkData(r, { caipNetwork: s });
    }, this.setAllAccounts = (s, r) => {
      W.setAllAccounts(s, r), O.setHasMultipleAddresses((s == null ? void 0 : s.length) > 1);
    }, this.setStatus = (s, r) => {
      W.setStatus(s, r), B.isConnected() ? j.setConnectionStatus("connected") : j.setConnectionStatus("disconnected");
    }, this.getAddressByChainNamespace = (s) => p.getAccountProp("address", s), this.setConnectors = (s) => {
      const r = [...B.state.allConnectors, ...s];
      B.setConnectors(r);
    }, this.setConnections = (s, r) => {
      Y.setConnections(s, r);
    }, this.fetchIdentity = (s) => J.fetchIdentity(s), this.getReownName = (s) => Vr.getNamesForAddress(s), this.getConnectors = () => B.getConnectors(), this.getConnectorImage = (s) => Nc.getConnectorImage(s), this.setConnectedWalletInfo = (s, r) => {
      const i = _e.getProviderId(r), n = s ? { ...s, type: i } : void 0;
      W.setConnectedWalletInfo(n, r);
    }, this.getIsConnectedState = () => !!p.state.activeCaipAddress, this.addAddressLabel = (s, r, i) => {
      W.addAddressLabel(s, r, i);
    }, this.removeAddressLabel = (s, r) => {
      W.removeAddressLabel(s, r);
    }, this.getAddress = (s) => p.state.activeChain === s || !s ? W.state.address : p.getAccountProp("address", s), this.setApprovedCaipNetworksData = (s) => p.setApprovedCaipNetworksData(s), this.resetNetwork = (s) => {
      p.resetNetwork(s);
    }, this.addConnector = (s) => {
      B.addConnector(s);
    }, this.resetWcConnection = () => {
      Y.resetWcConnection();
    }, this.setAddressExplorerUrl = (s, r) => {
      W.setAddressExplorerUrl(s, r);
    }, this.setSmartAccountDeployed = (s, r) => {
      W.setSmartAccountDeployed(s, r);
    }, this.setSmartAccountEnabledNetworks = (s, r) => {
      p.setSmartAccountEnabledNetworks(s, r);
    }, this.setPreferredAccountType = (s, r) => {
      W.setPreferredAccountType(s, r);
    }, this.setEIP6963Enabled = (s) => {
      O.setEIP6963Enabled(s);
    }, this.handleUnsafeRPCRequest = () => {
      if (this.isOpen()) {
        if (this.isTransactionStackEmpty())
          return;
        this.redirect("ApproveTransaction");
      } else
        this.open({ view: "ApproveTransaction" });
    }, this.options = e, this.version = e.sdkVersion, this.caipNetworks = this.extendCaipNetworks(e), this.chainNamespaces = this.getChainNamespacesSet(e.adapters, this.caipNetworks), this.defaultCaipNetwork = this.extendDefaultCaipNetwork(e), this.chainAdapters = this.createAdapters(e.adapters), this.readyPromise = this.initialize(e);
  }
  getChainNamespacesSet(e, s) {
    const r = e == null ? void 0 : e.map((n) => n.namespace).filter((n) => !!n);
    if (r != null && r.length)
      return [...new Set(r)];
    const i = s == null ? void 0 : s.map((n) => n.chainNamespace);
    return [...new Set(i)];
  }
  async initialize(e) {
    var s, r, i;
    this.initializeProjectSettings(e), this.initControllers(e), await this.initChainAdapters(), this.sendInitializeEvent(e), await this.syncExistingConnection(), this.remoteFeatures = await Vv.fetchRemoteFeatures(e), O.setRemoteFeatures(this.remoteFeatures), this.remoteFeatures.onramp && Tn.setOnrampProviders(this.remoteFeatures.onramp), ((s = O.state.remoteFeatures) != null && s.email || Array.isArray((r = O.state.remoteFeatures) == null ? void 0 : r.socials) && ((i = O.state.remoteFeatures) == null ? void 0 : i.socials.length) > 0) && await this.checkAllowedOrigins();
  }
  async checkAllowedOrigins() {
    const e = await K.fetchAllowedOrigins();
    if (e && X.isClient()) {
      const s = window.location.origin;
      $i.isOriginAllowed(s, e, Wr.DEFAULT_ALLOWED_ANCESTORS) || Os.open(nr.ALERT_ERRORS.INVALID_APP_CONFIGURATION, "error");
    } else
      Os.open(nr.ALERT_ERRORS.PROJECT_ID_NOT_CONFIGURED, "error");
  }
  sendInitializeEvent(e) {
    var r;
    const { ...s } = e;
    delete s.adapters, delete s.universalProvider, Se.sendEvent({
      type: "track",
      event: "INITIALIZE",
      properties: {
        ...s,
        networks: e.networks.map((i) => i.id),
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
    e.themeMode && ht.setThemeMode(e.themeMode), e.themeVariables && ht.setThemeVariables(e.themeVariables);
  }
  initializeChainController(e) {
    if (!this.connectionControllerClient || !this.networkControllerClient)
      throw new Error("ConnectionControllerClient and NetworkControllerClient must be set");
    p.initialize(e.adapters ?? [], this.caipNetworks, {
      connectionControllerClient: this.connectionControllerClient,
      networkControllerClient: this.networkControllerClient
    });
    const s = this.getDefaultNetwork();
    s && p.setActiveCaipNetwork(s);
  }
  initializeConnectionController(e) {
    Y.setWcBasic(e.basic ?? !1);
  }
  initializeConnectorController() {
    B.initialize(this.chainNamespaces);
  }
  initializeProjectSettings(e) {
    O.setProjectId(e.projectId), O.setSdkVersion(e.sdkVersion);
  }
  initializeOptionsController(e) {
    var o;
    O.setDebug(e.debug !== !1), O.setEnableWalletConnect(e.enableWalletConnect !== !1), O.setEnableWalletGuide(e.enableWalletGuide !== !1), O.setEnableWallets(e.enableWallets !== !1), O.setEIP6963Enabled(e.enableEIP6963 !== !1), O.setEnableNetworkSwitch(e.enableNetworkSwitch !== !1), O.setEnableAuthLogger(e.enableAuthLogger !== !1), O.setCustomRpcUrls(e.customRpcUrls), O.setEnableEmbedded(e.enableEmbedded), O.setAllWallets(e.allWallets), O.setIncludeWalletIds(e.includeWalletIds), O.setExcludeWalletIds(e.excludeWalletIds), O.setFeaturedWalletIds(e.featuredWalletIds), O.setTokens(e.tokens), O.setTermsConditionsUrl(e.termsConditionsUrl), O.setPrivacyPolicyUrl(e.privacyPolicyUrl), O.setCustomWallets(e.customWallets), O.setFeatures(e.features), O.setAllowUnsupportedChain(e.allowUnsupportedChain), O.setUniversalProviderConfigOverride(e.universalProviderConfigOverride), O.setPreferUniversalLinks(e.experimental_preferUniversalLinks), O.setDefaultAccountTypes(e.defaultAccountTypes);
    const s = j.getPreferredAccountTypes() || {}, r = { ...O.state.defaultAccountTypes, ...s };
    W.setPreferredAccountTypes(r);
    const i = this.getDefaultMetaData();
    if (!e.metadata && i && (e.metadata = i), O.setMetadata(e.metadata), O.setDisableAppend(e.disableAppend), O.setEnableEmbedded(e.enableEmbedded), O.setSIWX(e.siwx), !e.projectId) {
      Os.open(nr.ALERT_ERRORS.PROJECT_ID_NOT_CONFIGURED, "error");
      return;
    }
    if (((o = e.adapters) == null ? void 0 : o.find((a) => a.namespace === z.CHAIN.EVM)) && e.siweConfig) {
      if (e.siwx)
        throw new Error("Cannot set both `siweConfig` and `siwx` options");
      O.setSIWX(e.siweConfig.mapToSIWX());
    }
  }
  getDefaultMetaData() {
    var e, s, r, i;
    return X.isClient() ? {
      name: ((s = (e = document.getElementsByTagName("title")) == null ? void 0 : e[0]) == null ? void 0 : s.textContent) || "",
      description: ((r = document.querySelector('meta[property="og:description"]')) == null ? void 0 : r.content) || "",
      url: window.location.origin,
      icons: [((i = document.querySelector('link[rel~="icon"]')) == null ? void 0 : i.href) || ""]
    } : null;
  }
  // -- Network Initialization ---------------------------------------------------
  setUnsupportedNetwork(e) {
    const s = this.getActiveChainNamespace();
    if (s) {
      const r = ar.getUnsupportedNetwork(`${s}:${e}`);
      p.setActiveCaipNetwork(r);
    }
  }
  getDefaultNetwork() {
    return ar.getCaipNetworkFromStorage(this.defaultCaipNetwork);
  }
  extendCaipNetwork(e, s) {
    return ar.extendCaipNetwork(e, {
      customNetworkImageUrls: s.chainImages,
      projectId: s.projectId
    });
  }
  extendCaipNetworks(e) {
    return ar.extendCaipNetworks(e.networks, {
      customNetworkImageUrls: e.chainImages,
      customRpcUrls: e.customRpcUrls,
      projectId: e.projectId
    });
  }
  extendDefaultCaipNetwork(e) {
    const s = e.networks.find((i) => {
      var n;
      return i.id === ((n = e.defaultNetwork) == null ? void 0 : n.id);
    });
    return s ? ar.extendCaipNetwork(s, {
      customNetworkImageUrls: e.chainImages,
      customRpcUrls: e.customRpcUrls,
      projectId: e.projectId
    }) : void 0;
  }
  async disconnectNamespace(e) {
    try {
      const s = this.getAdapter(e), r = _e.getProvider(e), i = _e.getProviderId(e), { caipAddress: n } = p.getAccountData(e) || {};
      this.setLoading(!0, e), n && (s != null && s.disconnect) && await s.disconnect({ provider: r, providerType: i }), j.removeConnectedNamespace(e), _e.resetChain(e), this.setUser(void 0, e), this.setStatus("disconnected", e), this.setConnectedWalletInfo(void 0, e), B.removeConnectorId(e), p.resetAccount(e), p.resetNetwork(e), this.setLoading(!1, e);
    } catch (s) {
      throw this.setLoading(!1, e), new Error(`Failed to disconnect chain ${e}: ${s.message}`);
    }
  }
  // -- Client Initialization ---------------------------------------------------
  createClients() {
    this.connectionControllerClient = {
      connectWalletConnect: async () => {
        var n;
        const e = p.state.activeChain, s = this.getAdapter(e), r = (n = this.getCaipNetwork(e)) == null ? void 0 : n.id;
        if (!s)
          throw new Error("Adapter not found");
        const i = await s.connectWalletConnect(r);
        this.close(), this.setClientId((i == null ? void 0 : i.clientId) || null), j.setConnectedNamespaces([...p.state.chains.keys()]), this.chainNamespaces.forEach((o) => {
          B.setConnectorId(us.CONNECTOR_TYPE_WALLET_CONNECT, o);
        }), await this.syncWalletConnectAccount();
      },
      connectExternal: async ({ id: e, info: s, type: r, provider: i, chain: n, caipNetwork: o, socialUri: a }) => {
        var m, f, y, b, E, _;
        const c = p.state.activeChain, l = n || c, u = this.getAdapter(l);
        if (n && n !== c && !o) {
          const x = this.getCaipNetworks().find((P) => P.chainNamespace === n);
          x && this.setCaipNetwork(x);
        }
        if (!u)
          throw new Error("Adapter not found");
        const d = this.getCaipNetwork(l), h = await u.connect({
          id: e,
          info: s,
          type: r,
          provider: i,
          socialUri: a,
          chainId: (o == null ? void 0 : o.id) || (d == null ? void 0 : d.id),
          rpcUrl: ((y = (f = (m = o == null ? void 0 : o.rpcUrls) == null ? void 0 : m.default) == null ? void 0 : f.http) == null ? void 0 : y[0]) || ((_ = (E = (b = d == null ? void 0 : d.rpcUrls) == null ? void 0 : b.default) == null ? void 0 : E.http) == null ? void 0 : _[0])
        });
        if (!h)
          return;
        j.addConnectedNamespace(l), this.syncProvider({ ...h, chainNamespace: l });
        const g = W.state.allAccounts, { accounts: w } = (g == null ? void 0 : g.length) > 0 ? (
          // eslint-disable-next-line line-comment-position
          // Using new array else the accounts will have the same reference and react will not re-render
          { accounts: [...g] }
        ) : await u.getAccounts({ namespace: l, id: e });
        this.setAllAccounts(w, l), this.setStatus("connected", l), this.syncConnectedWalletInfo(l);
      },
      reconnectExternal: async ({ id: e, info: s, type: r, provider: i }) => {
        var a;
        const n = p.state.activeChain, o = this.getAdapter(n);
        o != null && o.reconnect && (await (o == null ? void 0 : o.reconnect({ id: e, info: s, type: r, provider: i, chainId: (a = this.getCaipNetwork()) == null ? void 0 : a.id })), j.addConnectedNamespace(n), this.syncConnectedWalletInfo(n));
      },
      disconnect: async (e) => {
        const s = Dv(e);
        try {
          const r = await Promise.allSettled(s.map(async ([n]) => this.disconnectNamespace(n)));
          de.resetSend(), Y.resetWcConnection(), await Xr.clearSessions(), B.setFilterByNamespace(void 0);
          const i = r.filter((n) => n.status === "rejected");
          if (i.length > 0)
            throw new Error(i.map((n) => n.reason.message).join(", "));
          j.deleteConnectedSocialProvider(), Se.sendEvent({
            type: "track",
            event: "DISCONNECT_SUCCESS",
            properties: {
              namespace: e || "all"
            }
          });
        } catch (r) {
          throw new Error(`Failed to disconnect chains: ${r.message}`);
        }
      },
      checkInstalled: (e) => e ? e.some((s) => {
        var r;
        return !!((r = window.ethereum) != null && r[String(s)]);
      }) : !!window.ethereum,
      signMessage: async (e) => {
        const s = this.getAdapter(p.state.activeChain), r = await (s == null ? void 0 : s.signMessage({
          message: e,
          address: W.state.address,
          provider: _e.getProvider(p.state.activeChain)
        }));
        return (r == null ? void 0 : r.signature) || "";
      },
      sendTransaction: async (e) => {
        const s = e.chainNamespace;
        if (ve.SEND_SUPPORTED_NAMESPACES.includes(s)) {
          const r = this.getAdapter(p.state.activeChain), i = _e.getProvider(s), n = await (r == null ? void 0 : r.sendTransaction({
            ...e,
            caipNetwork: this.getCaipNetwork(),
            provider: i
          }));
          return (n == null ? void 0 : n.hash) || "";
        }
        return "";
      },
      estimateGas: async (e) => {
        if (e.chainNamespace === z.CHAIN.EVM) {
          const s = this.getAdapter(p.state.activeChain), r = _e.getProvider(p.state.activeChain), i = this.getCaipNetwork();
          if (!i)
            throw new Error("CaipNetwork is undefined");
          const n = await (s == null ? void 0 : s.estimateGas({
            ...e,
            provider: r,
            caipNetwork: i
          }));
          return (n == null ? void 0 : n.gas) || 0n;
        }
        return 0n;
      },
      getEnsAvatar: async () => {
        var e;
        return await this.syncIdentity({
          address: W.state.address,
          chainId: Number((e = this.getCaipNetwork()) == null ? void 0 : e.id),
          chainNamespace: p.state.activeChain
        }), W.state.profileImage || !1;
      },
      getEnsAddress: async (e) => await $i.resolveReownName(e),
      writeContract: async (e) => {
        const s = this.getAdapter(p.state.activeChain), r = this.getCaipNetwork(), i = this.getCaipAddress(), n = _e.getProvider(p.state.activeChain);
        if (!r || !i)
          throw new Error("CaipNetwork or CaipAddress is undefined");
        const o = await (s == null ? void 0 : s.writeContract({ ...e, caipNetwork: r, provider: n, caipAddress: i }));
        return o == null ? void 0 : o.hash;
      },
      parseUnits: (e, s) => {
        const r = this.getAdapter(p.state.activeChain);
        return (r == null ? void 0 : r.parseUnits({ value: e, decimals: s })) ?? 0n;
      },
      formatUnits: (e, s) => {
        const r = this.getAdapter(p.state.activeChain);
        return (r == null ? void 0 : r.formatUnits({ value: e, decimals: s })) ?? "0";
      },
      getCapabilities: async (e) => {
        const s = this.getAdapter(p.state.activeChain);
        return await (s == null ? void 0 : s.getCapabilities(e));
      },
      grantPermissions: async (e) => {
        const s = this.getAdapter(p.state.activeChain);
        return await (s == null ? void 0 : s.grantPermissions(e));
      },
      revokePermissions: async (e) => {
        const s = this.getAdapter(p.state.activeChain);
        return s != null && s.revokePermissions ? await s.revokePermissions(e) : "0x";
      },
      walletGetAssets: async (e) => {
        const s = this.getAdapter(p.state.activeChain);
        return await (s == null ? void 0 : s.walletGetAssets(e)) ?? {};
      },
      updateBalance: (e) => {
        const s = this.getCaipNetwork(e);
        !s || !W.state.address || this.updateNativeBalance(W.state.address, s == null ? void 0 : s.id, e);
      }
    }, this.networkControllerClient = {
      switchCaipNetwork: async (e) => await this.switchCaipNetwork(e),
      // eslint-disable-next-line @typescript-eslint/require-await
      getApprovedCaipNetworksData: async () => this.getApprovedCaipNetworksData()
    }, Y.setClient(this.connectionControllerClient);
  }
  getApprovedCaipNetworksData() {
    var s, r, i, n, o;
    if (_e.getProviderId(p.state.activeChain) === us.CONNECTOR_TYPE_WALLET_CONNECT) {
      const a = (r = (s = this.universalProvider) == null ? void 0 : s.session) == null ? void 0 : r.namespaces;
      return {
        /*
         * MetaMask Wallet only returns 1 namespace in the session object. This makes it imposible
         * to switch to other networks. Setting supportsAllNetworks to true for MetaMask Wallet
         * will make it possible to switch to other networks.
         */
        supportsAllNetworks: ((o = (n = (i = this.universalProvider) == null ? void 0 : i.session) == null ? void 0 : n.peer) == null ? void 0 : o.metadata.name) === "MetaMask Wallet",
        approvedCaipNetworkIds: this.getChainsFromNamespaces(a)
      };
    }
    return { supportsAllNetworks: !0, approvedCaipNetworkIds: [] };
  }
  async switchCaipNetwork(e) {
    if (!e)
      return;
    const s = e.chainNamespace;
    if (this.getAddressByChainNamespace(e.chainNamespace)) {
      const i = _e.getProvider(s), n = _e.getProviderId(s);
      if (e.chainNamespace === p.state.activeChain) {
        const o = this.getAdapter(s);
        await (o == null ? void 0 : o.switchNetwork({ caipNetwork: e, provider: i, providerType: n }));
      } else if (this.setCaipNetwork(e), n === us.CONNECTOR_TYPE_WALLET_CONNECT)
        this.syncWalletConnectAccount();
      else {
        const o = this.getAddressByChainNamespace(s);
        o && this.syncAccount({
          address: o,
          chainId: e.id,
          chainNamespace: s
        });
      }
    } else
      this.setCaipNetwork(e);
  }
  getChainsFromNamespaces(e = {}) {
    return Object.values(e).flatMap((s) => {
      const r = s.chains || [], i = s.accounts.map((n) => {
        const { chainId: o, chainNamespace: a } = ns.parseCaipAddress(n);
        return `${a}:${o}`;
      });
      return Array.from(/* @__PURE__ */ new Set([...r, ...i]));
    });
  }
  // -- Adapter Initialization ---------------------------------------------------
  createAdapters(e) {
    return this.createClients(), this.chainNamespaces.reduce((s, r) => {
      var n;
      const i = e == null ? void 0 : e.find((o) => o.namespace === r);
      return i ? (i.construct({
        namespace: r,
        projectId: (n = this.options) == null ? void 0 : n.projectId,
        networks: this.getCaipNetworks()
      }), s[r] = i) : s[r] = new Hv({
        namespace: r,
        networks: this.getCaipNetworks()
      }), s;
    }, {});
  }
  async initChainAdapter(e) {
    var s;
    this.onConnectors(e), this.listenAdapter(e), await ((s = this.chainAdapters) == null ? void 0 : s[e].syncConnectors(this.options, this)), await this.createUniversalProviderForAdapter(e);
  }
  async initChainAdapters() {
    await Promise.all(this.chainNamespaces.map(async (e) => {
      await this.initChainAdapter(e);
    }));
  }
  onConnectors(e) {
    const s = this.getAdapter(e);
    s == null || s.on("connectors", this.setConnectors.bind(this));
  }
  listenAdapter(e) {
    const s = this.getAdapter(e);
    if (!s)
      return;
    const r = j.getConnectionStatus();
    r === "connected" ? this.setStatus("connecting", e) : r === "disconnected" ? (j.clearAddressCache(), this.setStatus(r, e)) : this.setStatus(r, e), s.on("switchNetwork", ({ address: i, chainId: n }) => {
      const o = this.getCaipNetworks().find((l) => l.id === n || l.caipNetworkId === n), a = p.state.activeChain === e, c = p.getAccountProp("address", e);
      if (o) {
        const l = a && i ? i : c;
        l && this.syncAccount({ address: l, chainId: o.id, chainNamespace: e });
      } else
        this.setUnsupportedNetwork(n);
    }), s.on("disconnect", this.disconnect.bind(this, e)), s.on("connections", (i) => {
      this.setConnections(i, e);
    }), s.on("pendingTransactions", () => {
      const i = W.state.address, n = p.state.activeCaipNetwork;
      !i || !(n != null && n.id) || this.updateNativeBalance(i, n.id, n.chainNamespace);
    }), s.on("accountChanged", ({ address: i, chainId: n }) => {
      var a, c;
      const o = p.state.activeChain === e;
      o && n ? this.syncAccount({
        address: i,
        chainId: n,
        chainNamespace: e
      }) : o && ((a = p.state.activeCaipNetwork) != null && a.id) ? this.syncAccount({
        address: i,
        chainId: (c = p.state.activeCaipNetwork) == null ? void 0 : c.id,
        chainNamespace: e
      }) : this.syncAccountInfo(i, n, e), this.syncAllAccounts(e);
    });
  }
  async createUniversalProviderForAdapter(e) {
    var s, r, i;
    await this.getUniversalProvider(), this.universalProvider && ((i = (r = (s = this.chainAdapters) == null ? void 0 : s[e]) == null ? void 0 : r.setUniversalProvider) == null || i.call(r, this.universalProvider));
  }
  // -- Connection Sync ---------------------------------------------------
  async syncExistingConnection() {
    await Promise.allSettled(this.chainNamespaces.map((e) => this.syncNamespaceConnection(e)));
  }
  async syncNamespaceConnection(e) {
    try {
      e === z.CHAIN.EVM && X.isSafeApp() && B.setConnectorId(z.CONNECTOR_ID.SAFE, e);
      const s = B.getConnectorId(e);
      switch (this.setStatus("connecting", e), s) {
        case z.CONNECTOR_ID.WALLET_CONNECT:
          await this.syncWalletConnectAccount();
          break;
        case z.CONNECTOR_ID.AUTH:
          break;
        default:
          await this.syncAdapterConnection(e);
      }
    } catch (s) {
      console.warn("AppKit couldn't sync existing connection", s), this.setStatus("disconnected", e);
    }
  }
  async syncAdapterConnection(e) {
    var a, c, l;
    const s = this.getAdapter(e), r = B.getConnectorId(e), i = this.getCaipNetwork(e), o = B.getConnectors(e).find((u) => u.id === r);
    try {
      if (!s || !o)
        throw new Error(`Adapter or connector not found for namespace ${e}`);
      if (!(i != null && i.id))
        throw new Error("CaipNetwork not found");
      const u = await (s == null ? void 0 : s.syncConnection({
        namespace: e,
        id: o.id,
        chainId: i.id,
        rpcUrl: (l = (c = (a = i == null ? void 0 : i.rpcUrls) == null ? void 0 : a.default) == null ? void 0 : c.http) == null ? void 0 : l[0]
      }));
      if (u) {
        const d = await (s == null ? void 0 : s.getAccounts({
          namespace: e,
          id: o.id
        }));
        d && d.accounts.length > 0 ? this.setAllAccounts(d.accounts, e) : this.setAllAccounts([X.createAccount(e, u.address, "eoa")], e), this.syncProvider({ ...u, chainNamespace: e }), await this.syncAccount({ ...u, chainNamespace: e }), this.setStatus("connected", e);
      } else
        this.setStatus("disconnected", e);
    } catch {
      this.setStatus("disconnected", e);
    }
  }
  async syncWalletConnectAccount() {
    const e = this.chainNamespaces.map(async (s) => {
      var a, c, l, u, d;
      const r = this.getAdapter(s), i = ((u = (l = (c = (a = this.universalProvider) == null ? void 0 : a.session) == null ? void 0 : c.namespaces) == null ? void 0 : l[s]) == null ? void 0 : u.accounts) || [], n = (d = p.state.activeCaipNetwork) == null ? void 0 : d.id, o = i.find((h) => {
        const { chainId: g } = ns.parseCaipAddress(h);
        return g === (n == null ? void 0 : n.toString());
      }) || i[0];
      if (o) {
        const h = ns.validateCaipAddress(o), { chainId: g, address: w } = ns.parseCaipAddress(h);
        if (_e.setProviderId(s, us.CONNECTOR_TYPE_WALLET_CONNECT), this.caipNetworks && p.state.activeCaipNetwork && (r == null ? void 0 : r.namespace) !== z.CHAIN.EVM) {
          const m = r == null ? void 0 : r.getWalletConnectProvider({
            caipNetworks: this.getCaipNetworks(),
            provider: this.universalProvider,
            activeCaipNetwork: p.state.activeCaipNetwork
          });
          _e.setProvider(s, m);
        } else
          _e.setProvider(s, this.universalProvider);
        B.setConnectorId(z.CONNECTOR_ID.WALLET_CONNECT, s), j.addConnectedNamespace(s), this.syncWalletConnectAccounts(s), await this.syncAccount({
          address: w,
          chainId: g,
          chainNamespace: s
        });
      } else
        this.setStatus("disconnected", s);
      this.syncConnectedWalletInfo(s), await p.setApprovedCaipNetworksData(s);
    });
    await Promise.all(e);
  }
  syncWalletConnectAccounts(e) {
    var r, i, n, o, a;
    const s = (a = (o = (n = (i = (r = this.universalProvider) == null ? void 0 : r.session) == null ? void 0 : i.namespaces) == null ? void 0 : n[e]) == null ? void 0 : o.accounts) == null ? void 0 : a.map((c) => {
      const { address: l } = ns.parseCaipAddress(c);
      return l;
    }).filter((c, l, u) => u.indexOf(c) === l);
    s && this.setAllAccounts(s.map((c) => X.createAccount(e, c, e === "bip122" ? "payment" : "eoa")), e);
  }
  syncProvider({ type: e, provider: s, id: r, chainNamespace: i }) {
    _e.setProviderId(i, e), _e.setProvider(i, s), B.setConnectorId(r, i);
  }
  async syncAllAccounts(e) {
    const s = B.getConnectorId(e);
    if (!s)
      return;
    const r = this.getAdapter(e), i = await (r == null ? void 0 : r.getAccounts({ namespace: e, id: s }));
    i && i.accounts.length > 0 && this.setAllAccounts(i.accounts, e);
  }
  async syncAccount(e) {
    var d, h;
    const s = e.chainNamespace === p.state.activeChain, r = p.getCaipNetworkByNamespace(e.chainNamespace, e.chainId), { address: i, chainId: n, chainNamespace: o } = e, { chainId: a } = j.getActiveNetworkProps(), c = n || a, l = ((d = p.state.activeCaipNetwork) == null ? void 0 : d.name) === z.UNSUPPORTED_NETWORK_NAME, u = p.getNetworkProp("supportsAllNetworks", o);
    if (this.setStatus("connected", o), !(l && !u) && c) {
      let g = this.getCaipNetworks().find((f) => f.id.toString() === c.toString()), w = this.getCaipNetworks().find((f) => f.chainNamespace === o);
      if (!u && !g && !w) {
        const f = this.getApprovedCaipNetworkIds() || [], y = f.find((E) => {
          var _;
          return ((_ = ns.parseCaipNetworkId(E)) == null ? void 0 : _.chainId) === c.toString();
        }), b = f.find((E) => {
          var _;
          return ((_ = ns.parseCaipNetworkId(E)) == null ? void 0 : _.chainNamespace) === o;
        });
        g = this.getCaipNetworks().find((E) => E.caipNetworkId === y), w = this.getCaipNetworks().find((E) => E.caipNetworkId === b || // This is a workaround used in Solana network to support deprecated caipNetworkId
        "deprecatedCaipNetworkId" in E && E.deprecatedCaipNetworkId === b);
      }
      const m = g || w;
      (m == null ? void 0 : m.chainNamespace) === p.state.activeChain ? O.state.enableNetworkSwitch && !O.state.allowUnsupportedChain && ((h = p.state.activeCaipNetwork) == null ? void 0 : h.name) === z.UNSUPPORTED_NETWORK_NAME ? p.showUnsupportedChainUI() : this.setCaipNetwork(m) : s || r && this.setCaipNetworkOfNamespace(r, o), this.syncConnectedWalletInfo(o), Co.isLowerCaseMatch(i, W.state.address) || this.syncAccountInfo(i, m == null ? void 0 : m.id, o), s ? await this.syncBalance({ address: i, chainId: m == null ? void 0 : m.id, chainNamespace: o }) : await this.syncBalance({ address: i, chainId: r == null ? void 0 : r.id, chainNamespace: o });
    }
  }
  async syncAccountInfo(e, s, r) {
    const i = this.getCaipAddress(r), n = s || (i == null ? void 0 : i.split(":")[1]);
    if (!n)
      return;
    const o = `${r}:${n}:${e}`;
    this.setCaipAddress(o, r), await this.syncIdentity({
      address: e,
      chainId: n,
      chainNamespace: r
    });
  }
  async syncReownName(e, s) {
    try {
      const r = await this.getReownName(e);
      if (r[0]) {
        const i = r[0];
        this.setProfileName(i.name, s);
      } else
        this.setProfileName(null, s);
    } catch {
      this.setProfileName(null, s);
    }
  }
  syncConnectedWalletInfo(e) {
    var i;
    const s = B.getConnectorId(e), r = _e.getProviderId(e);
    if (r === us.CONNECTOR_TYPE_ANNOUNCED || r === us.CONNECTOR_TYPE_INJECTED) {
      if (s) {
        const n = this.getConnectors().find((o) => o.id === s);
        if (n) {
          const { info: o, name: a, imageUrl: c } = n, l = c || this.getConnectorImage(n);
          this.setConnectedWalletInfo({ name: a, icon: l, ...o }, e);
        }
      }
    } else if (r === us.CONNECTOR_TYPE_WALLET_CONNECT) {
      const n = _e.getProvider(e);
      n != null && n.session && this.setConnectedWalletInfo({
        ...n.session.peer.metadata,
        name: n.session.peer.metadata.name,
        icon: (i = n.session.peer.metadata.icons) == null ? void 0 : i[0]
      }, e);
    } else if (s && s === z.CONNECTOR_ID.COINBASE) {
      const n = this.getConnectors().find((o) => o.id === z.CONNECTOR_ID.COINBASE);
      this.setConnectedWalletInfo({ name: "Coinbase Wallet", icon: this.getConnectorImage(n) }, e);
    }
  }
  async syncBalance(e) {
    !Cc.getNetworksByNamespace(this.getCaipNetworks(), e.chainNamespace).find((r) => {
      var i;
      return r.id.toString() === ((i = e.chainId) == null ? void 0 : i.toString());
    }) || !e.chainId || await this.updateNativeBalance(e.address, e.chainId, e.chainNamespace);
  }
  async ready() {
    await this.readyPromise;
  }
  async updateNativeBalance(e, s, r) {
    const i = this.getAdapter(r), n = p.getCaipNetworkByNamespace(r, s);
    if (i) {
      const o = await i.getBalance({
        address: e,
        chainId: s,
        caipNetwork: n,
        tokens: this.options.tokens
      });
      return this.setBalance(o.balance, o.symbol, r), o;
    }
  }
  // -- Universal Provider ---------------------------------------------------
  async initializeUniversalAdapter() {
    var r, i, n, o, a, c, l, u, d, h;
    const e = Fv.createLogger((g, ...w) => {
      g && this.handleAlertError(g), console.error(...w);
    }), s = {
      projectId: (r = this.options) == null ? void 0 : r.projectId,
      metadata: {
        name: (i = this.options) != null && i.metadata ? (n = this.options) == null ? void 0 : n.metadata.name : "",
        description: (o = this.options) != null && o.metadata ? (a = this.options) == null ? void 0 : a.metadata.description : "",
        url: (c = this.options) != null && c.metadata ? (l = this.options) == null ? void 0 : l.metadata.url : "",
        icons: (u = this.options) != null && u.metadata ? (d = this.options) == null ? void 0 : d.metadata.icons : [""]
      },
      logger: e
    };
    O.setManualWCControl(!!((h = this.options) != null && h.manualWCControl)), this.universalProvider = this.options.universalProvider ?? await Eo.init(s), this.listenWalletConnect();
  }
  listenWalletConnect() {
    this.universalProvider && (this.universalProvider.on("display_uri", (e) => {
      Y.setUri(e);
    }), this.universalProvider.on("connect", Y.finalizeWcConnection), this.universalProvider.on("disconnect", () => {
      this.chainNamespaces.forEach((e) => {
        this.resetAccount(e);
      }), Y.resetWcConnection();
    }), this.universalProvider.on("chainChanged", (e) => {
      const s = this.getCaipNetworks().find((i) => i.id == e), r = this.getCaipNetwork();
      if (!s) {
        this.setUnsupportedNetwork(e);
        return;
      }
      (r == null ? void 0 : r.id) !== (s == null ? void 0 : s.id) && this.setCaipNetwork(s);
    }), this.universalProvider.on("session_event", (e) => {
      if ($i.isSessionEventData(e)) {
        const { name: s, data: r } = e.params.event;
        s === "accountsChanged" && Array.isArray(r) && X.isCaipAddress(r[0]) && this.syncAccount(ns.parseCaipAddress(r[0]));
      }
    }));
  }
  createUniversalProvider() {
    var e;
    return !this.universalProviderInitPromise && X.isClient() && ((e = this.options) != null && e.projectId) && (this.universalProviderInitPromise = this.initializeUniversalAdapter()), this.universalProviderInitPromise;
  }
  async getUniversalProvider() {
    if (!this.universalProvider)
      try {
        await this.createUniversalProvider();
      } catch (e) {
        Se.sendEvent({
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
    const s = Object.entries(nr.UniversalProviderErrors).find(([, { message: a }]) => e.message.includes(a)), [r, i] = s ?? [], { message: n, alertErrorKey: o } = i ?? {};
    if (r && n && !this.reportedAlertErrors[r]) {
      const a = nr.ALERT_ERRORS[o];
      a && (Os.open(a, "error"), this.reportedAlertErrors[r] = !0);
    }
  }
  getAdapter(e) {
    var s;
    if (e)
      return (s = this.chainAdapters) == null ? void 0 : s[e];
  }
  createAdapter(e) {
    var i;
    if (!e)
      return;
    const s = e.namespace;
    if (!s)
      return;
    this.createClients();
    const r = e;
    r.namespace = s, r.construct({
      namespace: s,
      projectId: (i = this.options) == null ? void 0 : i.projectId,
      networks: this.getCaipNetworks()
    }), this.chainNamespaces.includes(s) || this.chainNamespaces.push(s), this.chainAdapters && (this.chainAdapters[s] = r);
  }
  // -- Public -------------------------------------------------------------------
  async open(e) {
    if (await this.injectModalUi(), e != null && e.uri && Y.setUri(e.uri), e != null && e.arguments)
      switch (e == null ? void 0 : e.view) {
        case "Swap":
          return qe.open({ ...e, data: { swap: e.arguments } });
      }
    return qe.open(e);
  }
  async close() {
    await this.injectModalUi(), qe.close();
  }
  setLoading(e, s) {
    qe.setLoading(e, s);
  }
  async disconnect(e) {
    await Y.disconnect(e);
  }
  getSIWX() {
    return O.state.siwx;
  }
  // -- review these -------------------------------------------------------------------
  getError() {
    return "";
  }
  getChainId() {
    var e;
    return (e = p.state.activeCaipNetwork) == null ? void 0 : e.id;
  }
  async switchNetwork(e) {
    const s = this.getCaipNetworks().find((r) => r.id === e.id);
    if (!s) {
      Os.open(nr.ALERT_ERRORS.SWITCH_NETWORK_NOT_FOUND, "error");
      return;
    }
    await p.switchActiveNetwork(s);
  }
  getWalletProvider() {
    return p.state.activeChain ? _e.state.providers[p.state.activeChain] : null;
  }
  getWalletProviderType() {
    return _e.getProviderId(p.state.activeChain);
  }
  subscribeProviders(e) {
    return _e.subscribeProviders(e);
  }
  getThemeMode() {
    return ht.state.themeMode;
  }
  getThemeVariables() {
    return ht.state.themeVariables;
  }
  setThemeMode(e) {
    ht.setThemeMode(e), jl(ht.state.themeMode);
  }
  setTermsConditionsUrl(e) {
    O.setTermsConditionsUrl(e);
  }
  setPrivacyPolicyUrl(e) {
    O.setPrivacyPolicyUrl(e);
  }
  setThemeVariables(e) {
    ht.setThemeVariables(e), qv(ht.state.themeVariables);
  }
  subscribeTheme(e) {
    return ht.subscribe(e);
  }
  getWalletInfo() {
    return W.state.connectedWalletInfo;
  }
  getAccount(e) {
    var o;
    const s = B.getAuthConnector(e), r = p.getAccountData(e), i = p.state.activeChain, n = j.getConnectedConnectorId(e || i);
    if (r)
      return {
        allAccounts: r.allAccounts,
        caipAddress: r.caipAddress,
        address: X.getPlainAddress(r.caipAddress),
        isConnected: !!r.caipAddress,
        status: r.status,
        embeddedWalletInfo: s && n === z.CONNECTOR_ID.AUTH ? {
          user: r.user ? {
            ...r.user,
            /*
             * Getting the username from the chain controller works well for social logins,
             * but Farcaster uses a different connection flow and doesn't emit the username via events.
             * Since the username is stored in local storage before the chain controller updates,
             * it's safe to use the local storage value here.
             */
            username: j.getConnectedSocialUsername()
          } : void 0,
          authProvider: r.socialProvider || "email",
          accountType: (o = r.preferredAccountTypes) == null ? void 0 : o[e || i],
          isSmartAccountDeployed: !!r.smartAccountDeployed
        } : void 0
      };
  }
  subscribeAccount(e, s) {
    const r = () => {
      const i = this.getAccount(s);
      i && e(i);
    };
    s ? p.subscribeChainProp("accountState", r, s) : p.subscribe(r), B.subscribe(r);
  }
  subscribeNetwork(e) {
    return p.subscribe(({ activeCaipNetwork: s }) => {
      e({
        caipNetwork: s,
        chainId: s == null ? void 0 : s.id,
        caipNetworkId: s == null ? void 0 : s.caipNetworkId
      });
    });
  }
  subscribeWalletInfo(e) {
    return W.subscribeKey("connectedWalletInfo", e);
  }
  subscribeShouldUpdateToAddress(e) {
    W.subscribeKey("shouldUpdateToAddress", e);
  }
  subscribeCaipNetworkChange(e) {
    p.subscribeKey("activeCaipNetwork", e);
  }
  getState() {
    return ms.state;
  }
  subscribeState(e) {
    return ms.subscribe(e);
  }
  showErrorMessage(e) {
    Rt.showError(e);
  }
  showSuccessMessage(e) {
    Rt.showSuccess(e);
  }
  getEvent() {
    return { ...Se.state };
  }
  subscribeEvents(e) {
    return Se.subscribe(e);
  }
  replace(e) {
    re.replace(e);
  }
  redirect(e) {
    re.push(e);
  }
  popTransactionStack(e) {
    re.popTransactionStack(e);
  }
  isOpen() {
    return qe.state.open;
  }
  isTransactionStackEmpty() {
    return re.state.transactionStack.length === 0;
  }
  static getInstance() {
    return this.instance;
  }
  updateFeatures(e) {
    O.setFeatures(e);
  }
  updateRemoteFeatures(e) {
    O.setRemoteFeatures(e);
  }
  updateOptions(e) {
    const r = { ...O.state || {}, ...e };
    O.setOptions(r);
  }
  setConnectMethodsOrder(e) {
    O.setConnectMethodsOrder(e);
  }
  setWalletFeaturesOrder(e) {
    O.setWalletFeaturesOrder(e);
  }
  setCollapseWallets(e) {
    O.setCollapseWallets(e);
  }
  setSocialsOrder(e) {
    O.setSocialsOrder(e);
  }
  getConnectMethodsOrder() {
    return io.getConnectOrderMethod(O.state.features, B.getConnectors());
  }
  /**
   * Adds a network to an existing adapter in AppKit.
   * @param namespace - The chain namespace to add the network to (e.g. 'eip155', 'solana')
   * @param network - The network configuration to add
   * @throws Error if adapter for namespace doesn't exist
   */
  addNetwork(e, s) {
    if (this.chainAdapters && !this.chainAdapters[e])
      throw new Error(`Adapter for namespace ${e} doesn't exist`);
    const r = this.extendCaipNetwork(s, this.options);
    this.getCaipNetworks().find((i) => i.id === r.id) || p.addNetwork(r);
  }
  /**
   * Removes a network from an existing adapter in AppKit.
   * @param namespace - The chain namespace the network belongs to
   * @param networkId - The network ID to remove
   * @throws Error if adapter for namespace doesn't exist or if removing last network
   */
  removeNetwork(e, s) {
    if (this.chainAdapters && !this.chainAdapters[e])
      throw new Error(`Adapter for namespace ${e} doesn't exist`);
    this.getCaipNetworks().find((i) => i.id === s) && p.removeNetwork(e, s);
  }
}
let wc = !1;
class zl extends Gv {
  // -- Overrides --------------------------------------------------------------
  async open(e) {
    B.isConnected() || await super.open(e);
  }
  async close() {
    await super.close(), this.options.manualWCControl && Y.finalizeWcConnection();
  }
  async syncIdentity(e) {
    return Promise.resolve();
  }
  async syncBalance(e) {
    return Promise.resolve();
  }
  async injectModalUi() {
    if (!wc && X.isClient()) {
      if (await import("./basic-DYVmUxlc.js"), await import("./w3m-modal-CZPSh7cS.js"), !document.querySelector("w3m-modal")) {
        const s = document.createElement("w3m-modal");
        !O.state.disableAppend && !O.state.enableEmbedded && document.body.insertAdjacentElement("beforeend", s);
      }
      wc = !0;
    }
  }
}
const Jv = "1.7.8";
function Yv(t) {
  return new zl({
    ...t,
    basic: !0,
    sdkVersion: `html-core-${Jv}`
  });
}
const E0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  AppKit: zl,
  createAppKit: Yv
}, Symbol.toStringTag, { value: "Module" }));
export {
  Os as A,
  p as C,
  Se as E,
  qe as M,
  O,
  re as R,
  Xr as S,
  ht as T,
  io as W,
  Ye as a,
  Nc as b,
  v0 as c,
  xt as d,
  b0 as e,
  Bv as f,
  B as g,
  W as h,
  Rt as i,
  K as j,
  w0 as k,
  X as l,
  z as m,
  Ri as n,
  Y as o,
  Ae as p,
  j as q,
  y0 as r,
  Xe as s,
  ve as t,
  E0 as u,
  yt as w
};
