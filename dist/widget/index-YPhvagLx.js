import { k as cr, A as lr, a as Or, V as kr, G as Pr } from "./index-DZrLrZkO.js";
import { formatUnits as Ur, fallback as Vn, http as Qt, toHex as qn } from "viem";
import { B as Tt, r as ke, i as Et } from "./lit-element-CWLRvgWK.js";
const xr = Symbol(), Kn = Object.getPrototypeOf, Un = /* @__PURE__ */ new WeakMap(), Lr = (t) => t && (Un.has(t) ? Un.get(t) : Kn(t) === Object.prototype || Kn(t) === Array.prototype), Dr = (t) => Lr(t) && t[xr] || null, zn = (t, e = !0) => {
  Un.set(t, e);
}, ln = {}, $n = (t) => typeof t == "object" && t !== null, Mr = (t) => $n(t) && !Yt.has(t) && (Array.isArray(t) || !(Symbol.iterator in t)) && !(t instanceof WeakMap) && !(t instanceof WeakSet) && !(t instanceof Error) && !(t instanceof Number) && !(t instanceof Date) && !(t instanceof String) && !(t instanceof RegExp) && !(t instanceof ArrayBuffer) && !(t instanceof Promise), dr = (t, e) => {
  const n = xn.get(t);
  if ((n == null ? void 0 : n[0]) === e)
    return n[1];
  const r = Array.isArray(t) ? [] : Object.create(Object.getPrototypeOf(t));
  return zn(r, !0), xn.set(t, [e, r]), Reflect.ownKeys(t).forEach((s) => {
    if (Object.getOwnPropertyDescriptor(r, s))
      return;
    const a = Reflect.get(t, s), { enumerable: o } = Reflect.getOwnPropertyDescriptor(
      t,
      s
    ), i = {
      value: a,
      enumerable: o,
      // This is intentional to avoid copying with proxy-compare.
      // It's still non-writable, so it avoids assigning a value.
      configurable: !0
    };
    if (Yt.has(a))
      zn(a, !1);
    else if (nt.has(a)) {
      const [l, u] = nt.get(
        a
      );
      i.value = dr(l, u());
    }
    Object.defineProperty(r, s, i);
  }), Object.preventExtensions(r);
}, Fr = (t, e, n, r) => ({
  deleteProperty(s, a) {
    const o = Reflect.get(s, a);
    n(a);
    const i = Reflect.deleteProperty(s, a);
    return i && r(["delete", [a], o]), i;
  },
  set(s, a, o, i) {
    const l = !t() && Reflect.has(s, a), u = Reflect.get(s, a, i);
    if (l && (Yn(u, o) || xt.has(o) && Yn(u, xt.get(o))))
      return !0;
    n(a), $n(o) && (o = Dr(o) || o);
    const p = !nt.has(o) && Br(o) ? ae(o) : o;
    return e(a, p), Reflect.set(s, a, p, i), r(["set", [a], o, u]), !0;
  }
}), nt = /* @__PURE__ */ new WeakMap(), Yt = /* @__PURE__ */ new WeakSet(), xn = /* @__PURE__ */ new WeakMap(), It = [1, 1], xt = /* @__PURE__ */ new WeakMap();
let Yn = Object.is, Wr = (t, e) => new Proxy(t, e), Br = Mr, jr = dr, Hr = Fr;
function ae(t = {}) {
  if (!$n(t))
    throw new Error("object required");
  const e = xt.get(t);
  if (e)
    return e;
  let n = It[0];
  const r = /* @__PURE__ */ new Set(), s = (_, V = ++It[0]) => {
    n !== V && (n = V, r.forEach((U) => U(_, V)));
  };
  let a = It[1];
  const o = (_ = ++It[1]) => (a !== _ && !r.size && (a = _, l.forEach(([V]) => {
    const U = V[1](_);
    U > n && (n = U);
  })), n), i = (_) => (V, U) => {
    const ee = [...V];
    ee[1] = [_, ...ee[1]], s(ee, U);
  }, l = /* @__PURE__ */ new Map(), u = (_, V) => {
    const U = !Yt.has(V) && nt.get(V);
    if (U) {
      if ((ln ? "production" : void 0) !== "production" && l.has(_))
        throw new Error("prop listener already exists");
      if (r.size) {
        const ee = U[2](i(_));
        l.set(_, [U, ee]);
      } else
        l.set(_, [U]);
    }
  }, p = (_) => {
    var V;
    const U = l.get(_);
    U && (l.delete(_), (V = U[1]) == null || V.call(U));
  }, h = (_) => (r.add(_), r.size === 1 && l.forEach(([U, ee], fe) => {
    if ((ln ? "production" : void 0) !== "production" && ee)
      throw new Error("remove already exists");
    const Nn = U[2](i(fe));
    l.set(fe, [U, Nn]);
  }), () => {
    r.delete(_), r.size === 0 && l.forEach(([U, ee], fe) => {
      ee && (ee(), l.set(fe, [U]));
    });
  });
  let R = !0;
  const T = Hr(
    () => R,
    u,
    p,
    s
  ), P = Wr(t, T);
  xt.set(t, P);
  const M = [t, o, h];
  return nt.set(P, M), Reflect.ownKeys(t).forEach((_) => {
    const V = Object.getOwnPropertyDescriptor(
      t,
      _
    );
    "value" in V && V.writable && (P[_] = t[_]);
  }), R = !1, P;
}
function he(t, e, n) {
  const r = nt.get(t);
  (ln ? "production" : void 0) !== "production" && !r && console.warn("Please use proxy object");
  let s;
  const a = [], o = r[2];
  let i = !1;
  const u = o((p) => {
    a.push(p), s || (s = Promise.resolve().then(() => {
      s = void 0, i && e(a.splice(0));
    }));
  });
  return i = !0, () => {
    i = !1, u();
  };
}
function Lt(t) {
  const e = nt.get(t);
  (ln ? "production" : void 0) !== "production" && !e && console.warn("Please use proxy object");
  const [n, r] = e;
  return jr(n, r());
}
function dt(t) {
  return Yt.add(t), t;
}
function $r() {
  return {
    proxyStateMap: nt,
    refSet: Yt,
    snapCache: xn,
    versionHolder: It,
    proxyCache: xt
  };
}
function ge(t, e, n, r) {
  let s = t[e];
  return he(
    t,
    () => {
      const a = t[e];
      Object.is(s, a) || n(s = a);
    }
  );
}
const { proxyStateMap: Gr, snapCache: Vr } = $r(), en = (t) => Gr.has(t);
function qr(t) {
  const e = [];
  let n = 0;
  const r = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new WeakMap(), a = () => {
    const u = Vr.get(i), p = u == null ? void 0 : u[1];
    if (p && !s.has(p)) {
      const h = new Map(r);
      s.set(p, h);
    }
  }, o = (u) => s.get(u) || r, i = {
    data: e,
    index: n,
    epoch: 0,
    get size() {
      return en(this) || a(), o(this).size;
    },
    get(u) {
      const h = o(this).get(u);
      if (h === void 0) {
        this.epoch;
        return;
      }
      return this.data[h];
    },
    has(u) {
      const p = o(this);
      return this.epoch, p.has(u);
    },
    set(u, p) {
      if (!en(this))
        throw new Error("Cannot perform mutations on a snapshot");
      const h = r.get(u);
      return h === void 0 ? (r.set(u, this.index), this.data[this.index++] = p) : this.data[h] = p, this.epoch++, this;
    },
    delete(u) {
      if (!en(this))
        throw new Error("Cannot perform mutations on a snapshot");
      const p = r.get(u);
      return p === void 0 ? !1 : (delete this.data[p], r.delete(u), this.epoch++, !0);
    },
    clear() {
      if (!en(this))
        throw new Error("Cannot perform mutations on a snapshot");
      this.data.length = 0, this.index = 0, this.epoch++, r.clear();
    },
    forEach(u) {
      this.epoch, o(this).forEach((h, R) => {
        u(this.data[h], R, this);
      });
    },
    *entries() {
      this.epoch;
      const u = o(this);
      for (const [p, h] of u)
        yield [p, this.data[h]];
    },
    *keys() {
      this.epoch;
      const u = o(this);
      for (const p of u.keys())
        yield p;
    },
    *values() {
      this.epoch;
      const u = o(this);
      for (const p of u.values())
        yield this.data[p];
    },
    [Symbol.iterator]() {
      return this.entries();
    },
    get [Symbol.toStringTag]() {
      return "Map";
    },
    toJSON() {
      return new Map(this.entries());
    }
  }, l = ae(i);
  return Object.defineProperties(l, {
    size: { enumerable: !1 },
    index: { enumerable: !1 },
    epoch: { enumerable: !1 },
    data: { enumerable: !1 },
    toJSON: { enumerable: !1 }
  }), Object.seal(l), l;
}
const f = {
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
}, ur = {
  caipNetworkIdToNumber(t) {
    return t ? Number(t.split(":")[1]) : void 0;
  },
  parseEvmChainId(t) {
    return typeof t == "string" ? this.caipNetworkIdToNumber(t) : t;
  },
  getNetworksByNamespace(t, e) {
    return (t == null ? void 0 : t.filter((n) => n.chainNamespace === e)) || [];
  },
  getFirstNetworkByNamespace(t, e) {
    return this.getNetworksByNamespace(t, e)[0];
  },
  getNetworkNameByCaipNetworkId(t, e) {
    var s;
    if (!e)
      return;
    const n = t.find((a) => a.caipNetworkId === e);
    if (n)
      return n.name;
    const [r] = e.split(":");
    return ((s = f.CHAIN_NAME_MAP) == null ? void 0 : s[r]) || void 0;
  }
}, Kr = {
  bigNumber(t) {
    return t ? new Tt(t) : new Tt(0);
  },
  multiply(t, e) {
    if (t === void 0 || e === void 0)
      return new Tt(0);
    const n = new Tt(t), r = new Tt(e);
    return n.times(r);
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
}, zr = [
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
], Yr = [
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
], Zr = [
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
], Xr = {
  getERC20Abi: (t) => f.USDT_CONTRACT_ADDRESSES.includes(t) ? Zr : zr,
  getSwapAbi: () => Yr
}, Se = {
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
    const [n, r, s] = e;
    if (!n || !r || !s)
      throw new Error(`Invalid CAIP-10 address: ${t}`);
    return {
      chainNamespace: n,
      chainId: r,
      address: s
    };
  },
  parseCaipNetworkId(t) {
    const e = t.split(":");
    if (e.length !== 2)
      throw new Error(`Invalid CAIP-2 network id: ${t}`);
    const [n, r] = e;
    if (!n || !r)
      throw new Error(`Invalid CAIP-2 network id: ${t}`);
    return {
      chainNamespace: n,
      chainId: r
    };
  }
}, j = {
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
function vn(t) {
  if (!t)
    throw new Error("Namespace is required for CONNECTED_CONNECTOR_ID");
  return `@appkit/${t}:connected_connector_id`;
}
const F = {
  setItem(t, e) {
    Rt() && e !== void 0 && localStorage.setItem(t, e);
  },
  getItem(t) {
    if (Rt())
      return localStorage.getItem(t) || void 0;
  },
  removeItem(t) {
    Rt() && localStorage.removeItem(t);
  },
  clear() {
    Rt() && localStorage.clear();
  }
};
function Rt() {
  return typeof window < "u" && typeof localStorage < "u";
}
function ze(t, e) {
  return e === "light" ? {
    "--w3m-accent": (t == null ? void 0 : t["--w3m-accent"]) || "hsla(231, 100%, 70%, 1)",
    "--w3m-background": "#fff"
  } : {
    "--w3m-accent": (t == null ? void 0 : t["--w3m-accent"]) || "hsla(230, 100%, 67%, 1)",
    "--w3m-background": "#121313"
  };
}
const Tn = (
  // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
  (typeof process < "u" && typeof process.env < "u" ? process.env.NEXT_PUBLIC_SECURE_SITE_ORIGIN : void 0) || "https://secure.walletconnect.org"
), pr = [
  {
    label: "Meld.io",
    name: "meld",
    feeRange: "1-2%",
    url: "https://meldcrypto.com",
    supportedChains: ["eip155", "solana"]
  }
], Jr = "WXETMuFUQmqqybHuRkSgxv:25B8LJHSfpG6LVjR2ytU5Cwh7Z4Sch2ocoU", Q = {
  FOUR_MINUTES_MS: 24e4,
  TEN_SEC_MS: 1e4,
  FIVE_SEC_MS: 5e3,
  THREE_SEC_MS: 3e3,
  ONE_SEC_MS: 1e3,
  SECURE_SITE: Tn,
  SECURE_SITE_DASHBOARD: `${Tn}/dashboard`,
  SECURE_SITE_FAVICON: `${Tn}/images/favicon.png`,
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
  BALANCE_SUPPORTED_CHAINS: [
    f.CHAIN.EVM,
    f.CHAIN.SOLANA
  ],
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
  NAMES_SUPPORTED_CHAIN_NAMESPACES: [f.CHAIN.EVM],
  ONRAMP_SUPPORTED_CHAIN_NAMESPACES: [
    f.CHAIN.EVM,
    f.CHAIN.SOLANA
  ],
  ACTIVITY_ENABLED_CHAIN_NAMESPACES: [f.CHAIN.EVM],
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
  SEND_SUPPORTED_NAMESPACES: [
    f.CHAIN.EVM,
    f.CHAIN.SOLANA
  ],
  DEFAULT_REMOTE_FEATURES: {
    swaps: ["1inch"],
    onramp: ["meld"],
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
  },
  SIWX_DEFAULTS: {
    signOutOnDisconnect: !0
  }
}, C = {
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
    const t = C.getActiveNamespace(), e = C.getActiveCaipNetworkId(), n = e ? e.split(":")[1] : void 0, r = n ? isNaN(Number(n)) ? n : Number(n) : void 0;
    return {
      namespace: t,
      caipNetworkId: e,
      chainId: r
    };
  },
  setWalletConnectDeepLink({ name: t, href: e }) {
    try {
      F.setItem(j.DEEPLINK_CHOICE, JSON.stringify({ href: e, name: t }));
    } catch {
      console.info("Unable to set WalletConnect deep link");
    }
  },
  getWalletConnectDeepLink() {
    try {
      const t = F.getItem(j.DEEPLINK_CHOICE);
      if (t)
        return JSON.parse(t);
    } catch {
      console.info("Unable to get WalletConnect deep link");
    }
  },
  deleteWalletConnectDeepLink() {
    try {
      F.removeItem(j.DEEPLINK_CHOICE);
    } catch {
      console.info("Unable to delete WalletConnect deep link");
    }
  },
  setActiveNamespace(t) {
    try {
      F.setItem(j.ACTIVE_NAMESPACE, t);
    } catch {
      console.info("Unable to set active namespace");
    }
  },
  setActiveCaipNetworkId(t) {
    try {
      F.setItem(j.ACTIVE_CAIP_NETWORK_ID, t), C.setActiveNamespace(t.split(":")[0]);
    } catch {
      console.info("Unable to set active caip network id");
    }
  },
  getActiveCaipNetworkId() {
    try {
      return F.getItem(j.ACTIVE_CAIP_NETWORK_ID);
    } catch {
      console.info("Unable to get active caip network id");
      return;
    }
  },
  deleteActiveCaipNetworkId() {
    try {
      F.removeItem(j.ACTIVE_CAIP_NETWORK_ID);
    } catch {
      console.info("Unable to delete active caip network id");
    }
  },
  deleteConnectedConnectorId(t) {
    try {
      const e = vn(t);
      F.removeItem(e);
    } catch {
      console.info("Unable to delete connected connector id");
    }
  },
  setAppKitRecent(t) {
    try {
      const e = C.getRecentWallets();
      e.find((r) => r.id === t.id) || (e.unshift(t), e.length > 2 && e.pop(), F.setItem(j.RECENT_WALLETS, JSON.stringify(e)));
    } catch {
      console.info("Unable to set AppKit recent");
    }
  },
  getRecentWallets() {
    try {
      const t = F.getItem(j.RECENT_WALLETS);
      return t ? JSON.parse(t) : [];
    } catch {
      console.info("Unable to get AppKit recent");
    }
    return [];
  },
  setConnectedConnectorId(t, e) {
    try {
      const n = vn(t);
      F.setItem(n, e);
    } catch {
      console.info("Unable to set Connected Connector Id");
    }
  },
  getActiveNamespace() {
    try {
      return F.getItem(j.ACTIVE_NAMESPACE);
    } catch {
      console.info("Unable to get active namespace");
    }
  },
  getConnectedConnectorId(t) {
    if (t)
      try {
        const e = vn(t);
        return F.getItem(e);
      } catch {
        console.info("Unable to get connected connector id in namespace", t);
      }
  },
  setConnectedSocialProvider(t) {
    try {
      F.setItem(j.CONNECTED_SOCIAL, t);
    } catch {
      console.info("Unable to set connected social provider");
    }
  },
  getConnectedSocialProvider() {
    try {
      return F.getItem(j.CONNECTED_SOCIAL);
    } catch {
      console.info("Unable to get connected social provider");
    }
  },
  deleteConnectedSocialProvider() {
    try {
      F.removeItem(j.CONNECTED_SOCIAL);
    } catch {
      console.info("Unable to delete connected social provider");
    }
  },
  getConnectedSocialUsername() {
    try {
      return F.getItem(j.CONNECTED_SOCIAL_USERNAME);
    } catch {
      console.info("Unable to get connected social username");
    }
  },
  getStoredActiveCaipNetworkId() {
    var n;
    const t = F.getItem(j.ACTIVE_CAIP_NETWORK_ID);
    return (n = t == null ? void 0 : t.split(":")) == null ? void 0 : n[1];
  },
  setConnectionStatus(t) {
    try {
      F.setItem(j.CONNECTION_STATUS, t);
    } catch {
      console.info("Unable to set connection status");
    }
  },
  getConnectionStatus() {
    try {
      return F.getItem(j.CONNECTION_STATUS);
    } catch {
      return;
    }
  },
  getConnectedNamespaces() {
    try {
      const t = F.getItem(j.CONNECTED_NAMESPACES);
      return t != null && t.length ? t.split(",") : [];
    } catch {
      return [];
    }
  },
  setConnectedNamespaces(t) {
    try {
      const e = Array.from(new Set(t));
      F.setItem(j.CONNECTED_NAMESPACES, e.join(","));
    } catch {
      console.info("Unable to set namespaces in storage");
    }
  },
  addConnectedNamespace(t) {
    try {
      const e = C.getConnectedNamespaces();
      e.includes(t) || (e.push(t), C.setConnectedNamespaces(e));
    } catch {
      console.info("Unable to add connected namespace");
    }
  },
  removeConnectedNamespace(t) {
    try {
      const e = C.getConnectedNamespaces(), n = e.indexOf(t);
      n > -1 && (e.splice(n, 1), C.setConnectedNamespaces(e));
    } catch {
      console.info("Unable to remove connected namespace");
    }
  },
  getTelegramSocialProvider() {
    try {
      return F.getItem(j.TELEGRAM_SOCIAL_PROVIDER);
    } catch {
      return console.info("Unable to get telegram social provider"), null;
    }
  },
  setTelegramSocialProvider(t) {
    try {
      F.setItem(j.TELEGRAM_SOCIAL_PROVIDER, t);
    } catch {
      console.info("Unable to set telegram social provider");
    }
  },
  removeTelegramSocialProvider() {
    try {
      F.removeItem(j.TELEGRAM_SOCIAL_PROVIDER);
    } catch {
      console.info("Unable to remove telegram social provider");
    }
  },
  getBalanceCache() {
    let t = {};
    try {
      const e = F.getItem(j.PORTFOLIO_CACHE);
      t = e ? JSON.parse(e) : {};
    } catch {
      console.info("Unable to get balance cache");
    }
    return t;
  },
  removeAddressFromBalanceCache(t) {
    try {
      const e = C.getBalanceCache();
      F.setItem(j.PORTFOLIO_CACHE, JSON.stringify({ ...e, [t]: void 0 }));
    } catch {
      console.info("Unable to remove address from balance cache", t);
    }
  },
  getBalanceCacheForCaipAddress(t) {
    try {
      const n = C.getBalanceCache()[t];
      if (n && !this.isCacheExpired(n.timestamp, this.cacheExpiry.portfolio))
        return n.balance;
      C.removeAddressFromBalanceCache(t);
    } catch {
      console.info("Unable to get balance cache for address", t);
    }
  },
  updateBalanceCache(t) {
    try {
      const e = C.getBalanceCache();
      e[t.caipAddress] = t, F.setItem(j.PORTFOLIO_CACHE, JSON.stringify(e));
    } catch {
      console.info("Unable to update balance cache", t);
    }
  },
  getNativeBalanceCache() {
    let t = {};
    try {
      const e = F.getItem(j.NATIVE_BALANCE_CACHE);
      t = e ? JSON.parse(e) : {};
    } catch {
      console.info("Unable to get balance cache");
    }
    return t;
  },
  removeAddressFromNativeBalanceCache(t) {
    try {
      const e = C.getBalanceCache();
      F.setItem(j.NATIVE_BALANCE_CACHE, JSON.stringify({ ...e, [t]: void 0 }));
    } catch {
      console.info("Unable to remove address from balance cache", t);
    }
  },
  getNativeBalanceCacheForCaipAddress(t) {
    try {
      const n = C.getNativeBalanceCache()[t];
      if (n && !this.isCacheExpired(n.timestamp, this.cacheExpiry.nativeBalance))
        return n;
      console.info("Discarding cache for address", t), C.removeAddressFromBalanceCache(t);
    } catch {
      console.info("Unable to get balance cache for address", t);
    }
  },
  updateNativeBalanceCache(t) {
    try {
      const e = C.getNativeBalanceCache();
      e[t.caipAddress] = t, F.setItem(j.NATIVE_BALANCE_CACHE, JSON.stringify(e));
    } catch {
      console.info("Unable to update balance cache", t);
    }
  },
  getEnsCache() {
    let t = {};
    try {
      const e = F.getItem(j.ENS_CACHE);
      t = e ? JSON.parse(e) : {};
    } catch {
      console.info("Unable to get ens name cache");
    }
    return t;
  },
  getEnsFromCacheForAddress(t) {
    try {
      const n = C.getEnsCache()[t];
      if (n && !this.isCacheExpired(n.timestamp, this.cacheExpiry.ens))
        return n.ens;
      C.removeEnsFromCache(t);
    } catch {
      console.info("Unable to get ens name from cache", t);
    }
  },
  updateEnsCache(t) {
    try {
      const e = C.getEnsCache();
      e[t.address] = t, F.setItem(j.ENS_CACHE, JSON.stringify(e));
    } catch {
      console.info("Unable to update ens name cache", t);
    }
  },
  removeEnsFromCache(t) {
    try {
      const e = C.getEnsCache();
      F.setItem(j.ENS_CACHE, JSON.stringify({ ...e, [t]: void 0 }));
    } catch {
      console.info("Unable to remove ens name from cache", t);
    }
  },
  getIdentityCache() {
    let t = {};
    try {
      const e = F.getItem(j.IDENTITY_CACHE);
      t = e ? JSON.parse(e) : {};
    } catch {
      console.info("Unable to get identity cache");
    }
    return t;
  },
  getIdentityFromCacheForAddress(t) {
    try {
      const n = C.getIdentityCache()[t];
      if (n && !this.isCacheExpired(n.timestamp, this.cacheExpiry.identity))
        return n.identity;
      C.removeIdentityFromCache(t);
    } catch {
      console.info("Unable to get identity from cache", t);
    }
  },
  updateIdentityCache(t) {
    try {
      const e = C.getIdentityCache();
      e[t.address] = {
        identity: t.identity,
        timestamp: t.timestamp
      }, F.setItem(j.IDENTITY_CACHE, JSON.stringify(e));
    } catch {
      console.info("Unable to update identity cache", t);
    }
  },
  removeIdentityFromCache(t) {
    try {
      const e = C.getIdentityCache();
      F.setItem(j.IDENTITY_CACHE, JSON.stringify({ ...e, [t]: void 0 }));
    } catch {
      console.info("Unable to remove identity from cache", t);
    }
  },
  clearAddressCache() {
    try {
      F.removeItem(j.PORTFOLIO_CACHE), F.removeItem(j.NATIVE_BALANCE_CACHE), F.removeItem(j.ENS_CACHE), F.removeItem(j.IDENTITY_CACHE);
    } catch {
      console.info("Unable to clear address cache");
    }
  },
  setPreferredAccountTypes(t) {
    try {
      F.setItem(j.PREFERRED_ACCOUNT_TYPES, JSON.stringify(t));
    } catch {
      console.info("Unable to set preferred account types", t);
    }
  },
  getPreferredAccountTypes() {
    try {
      const t = F.getItem(j.PREFERRED_ACCOUNT_TYPES);
      return t ? JSON.parse(t) : {};
    } catch {
      console.info("Unable to get preferred account types");
    }
    return {};
  },
  setConnections(t, e) {
    try {
      const n = C.getConnections(), r = n[e] ?? [], s = /* @__PURE__ */ new Map();
      for (const o of r)
        s.set(o.connectorId, { ...o });
      for (const o of t) {
        const i = s.get(o.connectorId), l = o.connectorId === f.CONNECTOR_ID.AUTH;
        if (i && !l) {
          const u = new Set(i.accounts.map((h) => h.address.toLowerCase())), p = o.accounts.filter((h) => !u.has(h.address.toLowerCase()));
          i.accounts.push(...p);
        } else
          s.set(o.connectorId, { ...o });
      }
      const a = {
        ...n,
        [e]: Array.from(s.values())
      };
      F.setItem(j.CONNECTIONS, JSON.stringify(a));
    } catch (n) {
      console.error("Unable to sync connections to storage", n);
    }
  },
  getConnections() {
    try {
      const t = F.getItem(j.CONNECTIONS);
      return t ? JSON.parse(t) : {};
    } catch (t) {
      return console.error("Unable to get connections from storage", t), {};
    }
  },
  deleteAddressFromConnection({ connectorId: t, address: e, namespace: n }) {
    try {
      const r = C.getConnections(), s = r[n] ?? [], a = new Map(s.map((i) => [i.connectorId, i])), o = a.get(t);
      o && (o.accounts.filter((l) => l.address.toLowerCase() !== e.toLowerCase()).length === 0 ? a.delete(t) : a.set(t, {
        ...o,
        accounts: o.accounts.filter((l) => l.address.toLowerCase() !== e.toLowerCase())
      })), F.setItem(j.CONNECTIONS, JSON.stringify({
        ...r,
        [n]: Array.from(a.values())
      }));
    } catch {
      console.error(`Unable to remove address "${e}" from connector "${t}" in namespace "${n}"`);
    }
  },
  getDisconnectedConnectorIds() {
    try {
      const t = F.getItem(j.DISCONNECTED_CONNECTOR_IDS);
      return t ? JSON.parse(t) : {};
    } catch {
      console.info("Unable to get disconnected connector ids");
    }
    return {};
  },
  addDisconnectedConnectorId(t, e) {
    try {
      const n = C.getDisconnectedConnectorIds(), r = n[e] ?? [];
      r.push(t), F.setItem(j.DISCONNECTED_CONNECTOR_IDS, JSON.stringify({
        ...n,
        [e]: Array.from(new Set(r))
      }));
    } catch {
      console.error(`Unable to set disconnected connector id "${t}" for namespace "${e}"`);
    }
  },
  removeDisconnectedConnectorId(t, e) {
    try {
      const n = C.getDisconnectedConnectorIds();
      let r = n[e] ?? [];
      r = r.filter((s) => s.toLowerCase() !== t.toLowerCase()), F.setItem(j.DISCONNECTED_CONNECTOR_IDS, JSON.stringify({
        ...n,
        [e]: Array.from(new Set(r))
      }));
    } catch {
      console.error(`Unable to remove disconnected connector id "${t}" for namespace "${e}"`);
    }
  },
  isConnectorDisconnected(t, e) {
    try {
      return (C.getDisconnectedConnectorIds()[e] ?? []).some((s) => s.toLowerCase() === t.toLowerCase());
    } catch {
      console.info(`Unable to get disconnected connector id "${t}" for namespace "${e}"`);
    }
    return !1;
  }
}, O = {
  isMobile() {
    var t;
    return this.isClient() ? !!(window != null && window.matchMedia && typeof window.matchMedia == "function" && ((t = window.matchMedia("(pointer:coarse)")) != null && t.matches) || /Android|webOS|iPhone|iPad|iPod|BlackBerry|Opera Mini/u.test(navigator.userAgent)) : !1;
  },
  checkCaipNetwork(t, e = "") {
    return t == null ? void 0 : t.caipNetworkId.toLocaleLowerCase().includes(e.toLowerCase());
  },
  isAndroid() {
    if (!this.isMobile())
      return !1;
    const t = window == null ? void 0 : window.navigator.userAgent.toLowerCase();
    return O.isMobile() && t.includes("android");
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
    return t ? t - Date.now() <= Q.TEN_SEC_MS : !0;
  },
  isAllowedRetry(t, e = Q.ONE_SEC_MS) {
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
    if (O.isClient() && window.self !== window.top)
      try {
        const n = (e = (t = window == null ? void 0 : window.location) == null ? void 0 : t.ancestorOrigins) == null ? void 0 : e[0], r = "https://app.safe.global";
        if (n) {
          const s = new URL(n), a = new URL(r);
          return s.hostname === a.hostname;
        }
      } catch {
        return !1;
      }
    return !1;
  },
  getPairingExpiry() {
    return Date.now() + Q.FOUR_MINUTES_MS;
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
    let n;
    return (...r) => {
      function s() {
        t(...r);
      }
      n && clearTimeout(n), n = setTimeout(s, e);
    };
  },
  isHttpUrl(t) {
    return t.startsWith("http://") || t.startsWith("https://");
  },
  formatNativeUrl(t, e, n = null) {
    if (O.isHttpUrl(t))
      return this.formatUniversalUrl(t, e);
    let r = t, s = n;
    r.includes("://") || (r = t.replaceAll("/", "").replaceAll(":", ""), r = `${r}://`), r.endsWith("/") || (r = `${r}/`), s && !(s != null && s.endsWith("/")) && (s = `${s}/`), this.isTelegram() && this.isAndroid() && (e = encodeURIComponent(e));
    const a = encodeURIComponent(e);
    return {
      redirect: `${r}wc?uri=${a}`,
      redirectUniversalLink: s ? `${s}wc?uri=${a}` : void 0,
      href: r
    };
  },
  formatUniversalUrl(t, e) {
    if (!O.isHttpUrl(t))
      return this.formatNativeUrl(t, e);
    let n = t;
    n.endsWith("/") || (n = `${n}/`);
    const r = encodeURIComponent(e);
    return {
      redirect: `${n}wc?uri=${r}`,
      href: n
    };
  },
  getOpenTargetForPlatform(t) {
    return t === "popupWindow" ? t : this.isTelegram() ? C.getTelegramSocialProvider() ? "_top" : "_blank" : t;
  },
  openHref(t, e, n) {
    window == null || window.open(t, this.getOpenTargetForPlatform(e), n || "noreferrer noopener");
  },
  returnOpenHref(t, e, n) {
    return window == null ? void 0 : window.open(t, this.getOpenTargetForPlatform(e), n || "noreferrer noopener");
  },
  isTelegram() {
    return typeof window < "u" && // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (!!window.TelegramWebviewProxy || // eslint-disable-next-line @typescript-eslint/no-explicit-any
    !!window.Telegram || // eslint-disable-next-line @typescript-eslint/no-explicit-any
    !!window.TelegramWebviewProxyProto);
  },
  isPWA() {
    var n, r;
    if (typeof window > "u")
      return !1;
    const t = window != null && window.matchMedia && typeof window.matchMedia == "function" ? (n = window.matchMedia("(display-mode: standalone)")) == null ? void 0 : n.matches : !1, e = (r = window == null ? void 0 : window.navigator) == null ? void 0 : r.standalone;
    return !!(t || e);
  },
  async preloadImage(t) {
    const e = new Promise((n, r) => {
      const s = new Image();
      s.onload = n, s.onerror = r, s.crossOrigin = "anonymous", s.src = t;
    });
    return Promise.race([e, O.wait(2e3)]);
  },
  formatBalance(t, e) {
    let n = "0.000";
    if (typeof t == "string") {
      const r = Number(t);
      if (r) {
        const s = Math.floor(r * 1e3) / 1e3;
        s && (n = s.toString());
      }
    }
    return `${n}${e ? ` ${e}` : ""}`;
  },
  formatBalance2(t, e) {
    var r;
    let n;
    if (t === "0")
      n = "0";
    else if (typeof t == "string") {
      const s = Number(t);
      s && (n = (r = s.toString().match(/^-?\d+(?:\.\d{0,3})?/u)) == null ? void 0 : r[0]);
    }
    return {
      value: n ?? "0",
      rest: n === "0" ? "000" : "",
      symbol: e
    };
  },
  getApiUrl() {
    return f.W3M_API_URL;
  },
  getBlockchainApiUrl() {
    return f.BLOCKCHAIN_API_RPC_URL;
  },
  getAnalyticsUrl() {
    return f.PULSE_API_URL;
  },
  getUUID() {
    return crypto != null && crypto.randomUUID ? crypto.randomUUID() : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/gu, (t) => {
      const e = Math.random() * 16 | 0;
      return (t === "x" ? e : e & 3 | 8).toString(16);
    });
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parseError(t) {
    var e, n;
    return typeof t == "string" ? t : typeof ((n = (e = t == null ? void 0 : t.issues) == null ? void 0 : e[0]) == null ? void 0 : n.message) == "string" ? t.issues[0].message : t instanceof Error ? t.message : "Unknown error";
  },
  sortRequestedNetworks(t, e = []) {
    const n = {};
    return e && t && (t.forEach((r, s) => {
      n[r] = s;
    }), e.sort((r, s) => {
      const a = n[r.id], o = n[s.id];
      return a !== void 0 && o !== void 0 ? a - o : a !== void 0 ? -1 : o !== void 0 ? 1 : 0;
    })), e;
  },
  calculateBalance(t) {
    let e = 0;
    for (const n of t)
      e += n.value ?? 0;
    return e;
  },
  formatTokenBalance(t) {
    const e = t.toFixed(2), [n, r] = e.split(".");
    return { dollars: n, pennies: r };
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
    const n = /* @__PURE__ */ new Set();
    return t.filter((r) => {
      const s = r[e];
      return n.has(s) ? !1 : (n.add(s), !0);
    });
  },
  generateSdkVersion(t, e, n) {
    const s = t.length === 0 ? Q.ADAPTER_TYPES.UNIVERSAL : t.map((a) => a.adapterType).join(",");
    return `${e}-${s}-${n}`;
  },
  // eslint-disable-next-line max-params
  createAccount(t, e, n, r, s) {
    return {
      namespace: t,
      address: e,
      type: n,
      publicKey: r,
      path: s
    };
  },
  isCaipAddress(t) {
    if (typeof t != "string")
      return !1;
    const e = t.split(":"), n = e[0];
    return e.filter(Boolean).length === 3 && n in f.CHAIN_NAME_MAP;
  },
  getAccount(t) {
    return t ? typeof t == "string" ? {
      address: t,
      chainId: void 0
    } : {
      address: t.address,
      chainId: t.chainId
    } : {
      address: void 0,
      chainId: void 0
    };
  },
  isMac() {
    const t = window == null ? void 0 : window.navigator.userAgent.toLowerCase();
    return t.includes("macintosh") && !t.includes("safari");
  },
  formatTelegramSocialLoginUrl(t) {
    const e = `--${encodeURIComponent(window == null ? void 0 : window.location.href)}`, n = "state=";
    if (new URL(t).host === "auth.magic.link") {
      const s = "provider_authorization_url=", a = t.substring(t.indexOf(s) + s.length), o = this.injectIntoUrl(decodeURIComponent(a), n, e);
      return t.replace(a, encodeURIComponent(o));
    }
    return this.injectIntoUrl(t, n, e);
  },
  injectIntoUrl(t, e, n) {
    const r = t.indexOf(e);
    if (r === -1)
      throw new Error(`${e} parameter not found in the URL: ${t}`);
    const s = t.indexOf("&", r), a = e.length, o = s !== -1 ? s : t.length, i = t.substring(0, r + a), l = t.substring(r + a, o), u = t.substring(s), p = l + n;
    return i + p + u;
  }
};
async function St(...t) {
  const e = await fetch(...t);
  if (!e.ok)
    throw new Error(`HTTP status code: ${e.status}`, {
      cause: e
    });
  return e;
}
class Zt {
  constructor({ baseUrl: e, clientId: n }) {
    this.baseUrl = e, this.clientId = n;
  }
  async get({ headers: e, signal: n, cache: r, ...s }) {
    const a = this.createUrl(s);
    return (await St(a, { method: "GET", headers: e, signal: n, cache: r })).json();
  }
  async getBlob({ headers: e, signal: n, ...r }) {
    const s = this.createUrl(r);
    return (await St(s, { method: "GET", headers: e, signal: n })).blob();
  }
  async post({ body: e, headers: n, signal: r, ...s }) {
    const a = this.createUrl(s);
    return (await St(a, {
      method: "POST",
      headers: n,
      body: e ? JSON.stringify(e) : void 0,
      signal: r
    })).json();
  }
  async put({ body: e, headers: n, signal: r, ...s }) {
    const a = this.createUrl(s);
    return (await St(a, {
      method: "PUT",
      headers: n,
      body: e ? JSON.stringify(e) : void 0,
      signal: r
    })).json();
  }
  async delete({ body: e, headers: n, signal: r, ...s }) {
    const a = this.createUrl(s);
    return (await St(a, {
      method: "DELETE",
      headers: n,
      body: e ? JSON.stringify(e) : void 0,
      signal: r
    })).json();
  }
  createUrl({ path: e, params: n }) {
    const r = new URL(e, this.baseUrl);
    return n && Object.entries(n).forEach(([s, a]) => {
      a && r.searchParams.append(s, a);
    }), this.clientId && r.searchParams.append("clientId", this.clientId), r;
  }
}
const Qr = {
  getFeatureValue(t, e) {
    const n = e == null ? void 0 : e[t];
    return n === void 0 ? Q.DEFAULT_FEATURES[t] : n;
  },
  filterSocialsByPlatform(t) {
    if (!t || !t.length)
      return t;
    if (O.isTelegram()) {
      if (O.isIos())
        return t.filter((e) => e !== "google");
      if (O.isMac())
        return t.filter((e) => e !== "x");
      if (O.isAndroid())
        return t.filter((e) => !["facebook", "x"].includes(e));
    }
    return t;
  }
}, k = ae({
  features: Q.DEFAULT_FEATURES,
  projectId: "",
  sdkType: "appkit",
  sdkVersion: "html-wagmi-undefined",
  defaultAccountTypes: Q.DEFAULT_ACCOUNT_TYPES,
  enableNetworkSwitch: !0,
  experimental_preferUniversalLinks: !1,
  remoteFeatures: {}
}), m = {
  state: k,
  subscribeKey(t, e) {
    return ge(k, t, e);
  },
  setOptions(t) {
    Object.assign(k, t);
  },
  setRemoteFeatures(t) {
    var n, r;
    if (!t)
      return;
    const e = { ...k.remoteFeatures, ...t };
    k.remoteFeatures = e, (n = k.remoteFeatures) != null && n.socials && (k.remoteFeatures.socials = Qr.filterSocialsByPlatform(k.remoteFeatures.socials)), (r = k.features) != null && r.pay && (k.remoteFeatures.email = !1, k.remoteFeatures.socials = !1);
  },
  setFeatures(t) {
    var n;
    if (!t)
      return;
    k.features || (k.features = Q.DEFAULT_FEATURES);
    const e = { ...k.features, ...t };
    k.features = e, (n = k.features) != null && n.pay && k.remoteFeatures && (k.remoteFeatures.email = !1, k.remoteFeatures.socials = !1);
  },
  setProjectId(t) {
    k.projectId = t;
  },
  setCustomRpcUrls(t) {
    k.customRpcUrls = t;
  },
  setAllWallets(t) {
    k.allWallets = t;
  },
  setIncludeWalletIds(t) {
    k.includeWalletIds = t;
  },
  setExcludeWalletIds(t) {
    k.excludeWalletIds = t;
  },
  setFeaturedWalletIds(t) {
    k.featuredWalletIds = t;
  },
  setTokens(t) {
    k.tokens = t;
  },
  setTermsConditionsUrl(t) {
    k.termsConditionsUrl = t;
  },
  setPrivacyPolicyUrl(t) {
    k.privacyPolicyUrl = t;
  },
  setCustomWallets(t) {
    k.customWallets = t;
  },
  setIsSiweEnabled(t) {
    k.isSiweEnabled = t;
  },
  setIsUniversalProvider(t) {
    k.isUniversalProvider = t;
  },
  setSdkVersion(t) {
    k.sdkVersion = t;
  },
  setMetadata(t) {
    k.metadata = t;
  },
  setDisableAppend(t) {
    k.disableAppend = t;
  },
  setEIP6963Enabled(t) {
    k.enableEIP6963 = t;
  },
  setDebug(t) {
    k.debug = t;
  },
  setEnableWalletConnect(t) {
    k.enableWalletConnect = t;
  },
  setEnableWalletGuide(t) {
    k.enableWalletGuide = t;
  },
  setEnableAuthLogger(t) {
    k.enableAuthLogger = t;
  },
  setEnableWallets(t) {
    k.enableWallets = t;
  },
  setPreferUniversalLinks(t) {
    k.experimental_preferUniversalLinks = t;
  },
  setSIWX(t) {
    if (t)
      for (const [e, n] of Object.entries(Q.SIWX_DEFAULTS))
        t[e] ?? (t[e] = n);
    k.siwx = t;
  },
  setConnectMethodsOrder(t) {
    k.features = {
      ...k.features,
      connectMethodsOrder: t
    };
  },
  setWalletFeaturesOrder(t) {
    k.features = {
      ...k.features,
      walletFeaturesOrder: t
    };
  },
  setSocialsOrder(t) {
    k.remoteFeatures = {
      ...k.remoteFeatures,
      socials: t
    };
  },
  setCollapseWallets(t) {
    k.features = {
      ...k.features,
      collapseWallets: t
    };
  },
  setEnableEmbedded(t) {
    k.enableEmbedded = t;
  },
  setAllowUnsupportedChain(t) {
    k.allowUnsupportedChain = t;
  },
  setManualWCControl(t) {
    k.manualWCControl = t;
  },
  setEnableNetworkSwitch(t) {
    k.enableNetworkSwitch = t;
  },
  setEnableReconnect(t) {
    k.enableReconnect = t;
  },
  setDefaultAccountTypes(t = {}) {
    Object.entries(t).forEach(([e, n]) => {
      n && (k.defaultAccountTypes[e] = n);
    });
  },
  setUniversalProviderConfigOverride(t) {
    k.universalProviderConfigOverride = t;
  },
  getUniversalProviderConfigOverride() {
    return k.universalProviderConfigOverride;
  },
  getSnapshot() {
    return Lt(k);
  }
}, es = Object.freeze({
  enabled: !0,
  events: []
}), ts = new Zt({ baseUrl: O.getAnalyticsUrl(), clientId: null }), ns = 5, rs = 60 * 1e3, Xe = ae({
  ...es
}), ss = {
  state: Xe,
  subscribeKey(t, e) {
    return ge(Xe, t, e);
  },
  async sendError(t, e) {
    if (!Xe.enabled)
      return;
    const n = Date.now();
    if (Xe.events.filter((a) => {
      const o = new Date(a.properties.timestamp || "").getTime();
      return n - o < rs;
    }).length >= ns)
      return;
    const s = {
      type: "error",
      event: e,
      properties: {
        errorType: t.name,
        errorMessage: t.message,
        stackTrace: t.stack,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      }
    };
    Xe.events.push(s);
    try {
      if (typeof window > "u")
        return;
      const { projectId: a, sdkType: o, sdkVersion: i } = m.state;
      await ts.post({
        path: "/e",
        params: {
          projectId: a,
          st: o,
          sv: i || "html-wagmi-4.2.2"
        },
        body: {
          eventId: O.getUUID(),
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
    Xe.enabled = !0;
  },
  disable() {
    Xe.enabled = !1;
  },
  clearEvents() {
    Xe.events = [];
  }
};
class yt extends Error {
  constructor(e, n, r) {
    super(e), this.name = "AppKitError", this.category = n, this.originalError = r, Object.setPrototypeOf(this, yt.prototype);
    let s = !1;
    if (r instanceof Error && typeof r.stack == "string" && r.stack) {
      const a = r.stack, o = a.indexOf(`
`);
      if (o > -1) {
        const i = a.substring(o + 1);
        this.stack = `${this.name}: ${this.message}
${i}`, s = !0;
      }
    }
    s || (Error.captureStackTrace ? Error.captureStackTrace(this, yt) : this.stack || (this.stack = `${this.name}: ${this.message}`));
  }
}
function Zn(t, e) {
  const n = t instanceof yt ? t : new yt(t instanceof Error ? t.message : String(t), e, t);
  throw ss.sendError(n, n.category), n;
}
function Re(t, e = "INTERNAL_SDK_ERROR") {
  const n = {};
  return Object.keys(t).forEach((r) => {
    const s = t[r];
    if (typeof s == "function") {
      let a = s;
      s.constructor.name === "AsyncFunction" ? a = async (...o) => {
        try {
          return await s(...o);
        } catch (i) {
          return Zn(i, e);
        }
      } : a = (...o) => {
        try {
          return s(...o);
        } catch (i) {
          return Zn(i, e);
        }
      }, n[r] = a;
    } else
      n[r] = s;
  }), n;
}
const as = "https://secure.walletconnect.org/sdk", os = (typeof process < "u" && typeof process.env < "u" ? process.env.NEXT_PUBLIC_SECURE_SITE_SDK_URL : void 0) || as, is = (typeof process < "u" && typeof process.env < "u" ? process.env.NEXT_PUBLIC_DEFAULT_LOG_LEVEL : void 0) || "error", cs = (typeof process < "u" && typeof process.env < "u" ? process.env.NEXT_PUBLIC_SECURE_SITE_SDK_VERSION : void 0) || "4", b = {
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
}, ue = {
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
}, je = {
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
}, ls = {
  /**
   * Handles mobile wallet redirection for wallets that have Universal Links and doesn't support WalletConnect Deep Links.
   *
   * @param {string} id - The id of the wallet.
   * @param {ChainNamespace} namespace - The namespace of the chain.
   */
  handleMobileDeeplinkRedirect(t, e) {
    const n = window.location.href, r = encodeURIComponent(n);
    if (t === je.PHANTOM.id && !("phantom" in window)) {
      const s = n.startsWith("https") ? "https" : "http", a = n.split("/")[2], o = encodeURIComponent(`${s}://${a}`);
      window.location.href = `${je.PHANTOM.url}/ul/browse/${r}?ref=${o}`;
    }
    t === je.SOLFLARE.id && !("solflare" in window) && (window.location.href = `${je.SOLFLARE.url}/ul/v1/browse/${r}?ref=${r}`), e === f.CHAIN.SOLANA && t === je.COINBASE.id && !("coinbaseSolana" in window) && (window.location.href = `${je.COINBASE.url}/dapp?cb_url=${r}`);
  }
}, Te = ae({
  walletImages: {},
  networkImages: {},
  chainImages: {},
  connectorImages: {},
  tokenImages: {},
  currencyImages: {}
}), ds = {
  state: Te,
  subscribeNetworkImages(t) {
    return he(Te.networkImages, () => t(Te.networkImages));
  },
  subscribeKey(t, e) {
    return ge(Te, t, e);
  },
  subscribe(t) {
    return he(Te, () => t(Te));
  },
  setWalletImage(t, e) {
    Te.walletImages[t] = e;
  },
  setNetworkImage(t, e) {
    Te.networkImages[t] = e;
  },
  setChainImage(t, e) {
    Te.chainImages[t] = e;
  },
  setConnectorImage(t, e) {
    Te.connectorImages = { ...Te.connectorImages, [t]: e };
  },
  setTokenImage(t, e) {
    Te.tokenImages[t] = e;
  },
  setCurrencyImage(t, e) {
    Te.currencyImages[t] = e;
  }
}, Pe = Re(ds), us = {
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
}, Sn = ae({
  networkImagePromises: {}
}), hr = {
  async fetchWalletImage(t) {
    if (t)
      return await x._fetchWalletImage(t), this.getWalletImageById(t);
  },
  async fetchNetworkImage(t) {
    if (!t)
      return;
    const e = this.getNetworkImageById(t);
    return e || (Sn.networkImagePromises[t] || (Sn.networkImagePromises[t] = x._fetchNetworkImage(t)), await Sn.networkImagePromises[t], this.getNetworkImageById(t));
  },
  getWalletImageById(t) {
    if (t)
      return Pe.state.walletImages[t];
  },
  getWalletImage(t) {
    if (t != null && t.image_url)
      return t == null ? void 0 : t.image_url;
    if (t != null && t.image_id)
      return Pe.state.walletImages[t.image_id];
  },
  getNetworkImage(t) {
    var e, n, r;
    if ((e = t == null ? void 0 : t.assets) != null && e.imageUrl)
      return (n = t == null ? void 0 : t.assets) == null ? void 0 : n.imageUrl;
    if ((r = t == null ? void 0 : t.assets) != null && r.imageId)
      return Pe.state.networkImages[t.assets.imageId];
  },
  getNetworkImageById(t) {
    if (t)
      return Pe.state.networkImages[t];
  },
  getConnectorImage(t) {
    var e;
    if (t != null && t.imageUrl)
      return t.imageUrl;
    if ((e = t == null ? void 0 : t.info) != null && e.icon)
      return t.info.icon;
    if (t != null && t.imageId)
      return Pe.state.connectorImages[t.imageId];
  },
  getChainImage(t) {
    return Pe.state.networkImages[us[t]];
  }
}, Je = ae({
  message: "",
  variant: "info",
  open: !1
}), ps = {
  state: Je,
  subscribeKey(t, e) {
    return ge(Je, t, e);
  },
  open(t, e) {
    const { debug: n } = m.state, { shortMessage: r, longMessage: s } = t;
    n && (Je.message = r, Je.variant = e, Je.open = !0), s && console.error(typeof s == "function" ? s() : s);
  },
  close() {
    Je.open = !1, Je.message = "", Je.variant = "info";
  }
}, de = Re(ps), hs = O.getAnalyticsUrl(), fs = new Zt({ baseUrl: hs, clientId: null }), ms = ["MODAL_CREATED"], qe = ae({
  timestamp: Date.now(),
  reportedErrors: {},
  data: {
    type: "track",
    event: "MODAL_CREATED"
  }
}), ne = {
  state: qe,
  subscribe(t) {
    return he(qe, () => t(qe));
  },
  getSdkProperties() {
    const { projectId: t, sdkType: e, sdkVersion: n } = m.state;
    return {
      projectId: t,
      st: e,
      sv: n || "html-wagmi-4.2.2"
    };
  },
  async _sendAnalyticsEvent(t) {
    try {
      const e = I.state.address;
      if (ms.includes(t.data.event) || typeof window > "u")
        return;
      await fs.post({
        path: "/e",
        params: ne.getSdkProperties(),
        body: {
          eventId: O.getUUID(),
          url: window.location.href,
          domain: window.location.hostname,
          timestamp: t.timestamp,
          props: { ...t.data, address: e }
        }
      }), qe.reportedErrors.FORBIDDEN = !1;
    } catch (e) {
      e instanceof Error && e.cause instanceof Response && e.cause.status === f.HTTP_STATUS_CODES.FORBIDDEN && !qe.reportedErrors.FORBIDDEN && (de.open({
        shortMessage: "Invalid App Configuration",
        longMessage: `Origin ${Rt() ? window.origin : "uknown"} not found on Allowlist - update configuration on cloud.reown.com`
      }, "error"), qe.reportedErrors.FORBIDDEN = !0);
    }
  },
  sendEvent(t) {
    var e;
    qe.timestamp = Date.now(), qe.data = t, ((e = m.state.features) != null && e.analytics || t.event === "INITIALIZE") && ne._sendAnalyticsEvent(qe);
  }
}, gs = O.getApiUrl(), _e = new Zt({
  baseUrl: gs,
  clientId: null
}), Cs = 40, Xn = 4, ws = 20, $ = ae({
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
}), x = {
  state: $,
  subscribeKey(t, e) {
    return ge($, t, e);
  },
  _getSdkProperties() {
    const { projectId: t, sdkType: e, sdkVersion: n } = m.state;
    return {
      projectId: t,
      st: e || "appkit",
      sv: n || "html-wagmi-4.2.2"
    };
  },
  _filterOutExtensions(t) {
    return m.state.isUniversalProvider ? t.filter((e) => !!(e.mobile_link || e.desktop_link || e.webapp_link)) : t;
  },
  async _fetchWalletImage(t) {
    const e = `${_e.baseUrl}/getWalletImage/${t}`, n = await _e.getBlob({ path: e, params: x._getSdkProperties() });
    Pe.setWalletImage(t, URL.createObjectURL(n));
  },
  async _fetchNetworkImage(t) {
    const e = `${_e.baseUrl}/public/getAssetImage/${t}`, n = await _e.getBlob({ path: e, params: x._getSdkProperties() });
    Pe.setNetworkImage(t, URL.createObjectURL(n));
  },
  async _fetchConnectorImage(t) {
    const e = `${_e.baseUrl}/public/getAssetImage/${t}`, n = await _e.getBlob({ path: e, params: x._getSdkProperties() });
    Pe.setConnectorImage(t, URL.createObjectURL(n));
  },
  async _fetchCurrencyImage(t) {
    const e = `${_e.baseUrl}/public/getCurrencyImage/${t}`, n = await _e.getBlob({ path: e, params: x._getSdkProperties() });
    Pe.setCurrencyImage(t, URL.createObjectURL(n));
  },
  async _fetchTokenImage(t) {
    const e = `${_e.baseUrl}/public/getTokenImage/${t}`, n = await _e.getBlob({ path: e, params: x._getSdkProperties() });
    Pe.setTokenImage(t, URL.createObjectURL(n));
  },
  _filterWalletsByPlatform(t) {
    return O.isMobile() ? t == null ? void 0 : t.filter((n) => n.mobile_link || n.id === je.COINBASE.id ? !0 : d.state.activeChain === "solana" && (n.id === je.SOLFLARE.id || n.id === je.PHANTOM.id)) : t;
  },
  async fetchProjectConfig() {
    return (await _e.get({
      path: "/appkit/v1/config",
      params: x._getSdkProperties()
    })).features;
  },
  async fetchAllowedOrigins() {
    try {
      const { allowedOrigins: t } = await _e.get({
        path: "/projects/v1/origins",
        params: x._getSdkProperties()
      });
      return t;
    } catch (t) {
      if (t instanceof Error && t.cause instanceof Response) {
        const e = t.cause.status;
        if (e === f.HTTP_STATUS_CODES.TOO_MANY_REQUESTS)
          throw new Error("RATE_LIMITED", { cause: t });
        if (e >= f.HTTP_STATUS_CODES.SERVER_ERROR && e < 600)
          throw new Error("SERVER_ERROR", { cause: t });
        return [];
      }
      return [];
    }
  },
  async fetchNetworkImages() {
    const t = d.getAllRequestedCaipNetworks(), e = t == null ? void 0 : t.map(({ assets: n }) => n == null ? void 0 : n.imageId).filter(Boolean).filter((n) => !hr.getNetworkImageById(n));
    e && await Promise.allSettled(e.map((n) => x._fetchNetworkImage(n)));
  },
  async fetchConnectorImages() {
    const { connectors: t } = w.state, e = t.map(({ imageId: n }) => n).filter(Boolean);
    await Promise.allSettled(e.map((n) => x._fetchConnectorImage(n)));
  },
  async fetchCurrencyImages(t = []) {
    await Promise.allSettled(t.map((e) => x._fetchCurrencyImage(e)));
  },
  async fetchTokenImages(t = []) {
    await Promise.allSettled(t.map((e) => x._fetchTokenImage(e)));
  },
  async fetchWallets(t) {
    var a;
    const e = t.exclude ?? [];
    x._getSdkProperties().sv.startsWith("html-core-") && e.push(...Object.values(je).map((o) => o.id));
    const r = await _e.get({
      path: "/getWallets",
      params: {
        ...x._getSdkProperties(),
        ...t,
        page: String(t.page),
        entries: String(t.entries),
        include: (a = t.include) == null ? void 0 : a.join(","),
        exclude: e.join(",")
      }
    });
    return {
      data: x._filterWalletsByPlatform(r == null ? void 0 : r.data) || [],
      // Keep original count for display on main page
      count: r == null ? void 0 : r.count
    };
  },
  async fetchFeaturedWallets() {
    const { featuredWalletIds: t } = m.state;
    if (t != null && t.length) {
      const e = {
        ...x._getSdkProperties(),
        page: 1,
        entries: (t == null ? void 0 : t.length) ?? Xn,
        include: t
      }, { data: n } = await x.fetchWallets(e), r = [...n].sort((a, o) => t.indexOf(a.id) - t.indexOf(o.id)), s = r.map((a) => a.image_id).filter(Boolean);
      await Promise.allSettled(s.map((a) => x._fetchWalletImage(a))), $.featured = r, $.allFeatured = r;
    }
  },
  async fetchRecommendedWallets() {
    try {
      $.isFetchingRecommendedWallets = !0;
      const { includeWalletIds: t, excludeWalletIds: e, featuredWalletIds: n } = m.state, r = [...e ?? [], ...n ?? []].filter(Boolean), s = d.getRequestedCaipNetworkIds().join(","), a = {
        page: 1,
        entries: Xn,
        include: t,
        exclude: r,
        chains: s
      }, { data: o, count: i } = await x.fetchWallets(a), l = C.getRecentWallets(), u = o.map((h) => h.image_id).filter(Boolean), p = l.map((h) => h.image_id).filter(Boolean);
      await Promise.allSettled([...u, ...p].map((h) => x._fetchWalletImage(h))), $.recommended = o, $.allRecommended = o, $.count = i ?? 0;
    } catch {
    } finally {
      $.isFetchingRecommendedWallets = !1;
    }
  },
  async fetchWalletsByPage({ page: t }) {
    const { includeWalletIds: e, excludeWalletIds: n, featuredWalletIds: r } = m.state, s = d.getRequestedCaipNetworkIds().join(","), a = [
      ...$.recommended.map(({ id: p }) => p),
      ...n ?? [],
      ...r ?? []
    ].filter(Boolean), o = {
      page: t,
      entries: Cs,
      include: e,
      exclude: a,
      chains: s
    }, { data: i, count: l } = await x.fetchWallets(o), u = i.slice(0, ws).map((p) => p.image_id).filter(Boolean);
    await Promise.allSettled(u.map((p) => x._fetchWalletImage(p))), $.wallets = O.uniqueBy([...$.wallets, ...x._filterOutExtensions(i)], "id").filter((p) => {
      var h;
      return (h = p.chains) == null ? void 0 : h.some((R) => s.includes(R));
    }), $.count = l > $.count ? l : $.count, $.page = t;
  },
  async initializeExcludedWallets({ ids: t }) {
    const e = {
      page: 1,
      entries: t.length,
      include: t
    }, { data: n } = await x.fetchWallets(e);
    n && n.forEach((r) => {
      $.excludedWallets.push({ rdns: r.rdns, name: r.name });
    });
  },
  async searchWallet({ search: t, badge: e }) {
    const { includeWalletIds: n, excludeWalletIds: r } = m.state, s = d.getRequestedCaipNetworkIds().join(",");
    $.search = [];
    const a = {
      page: 1,
      entries: 100,
      search: t == null ? void 0 : t.trim(),
      badge_type: e,
      include: n,
      exclude: r,
      chains: s
    }, { data: o } = await x.fetchWallets(a);
    ne.sendEvent({
      type: "track",
      event: "SEARCH_WALLET",
      properties: { badge: e ?? "", search: t ?? "" }
    });
    const i = o.map((l) => l.image_id).filter(Boolean);
    await Promise.allSettled([
      ...i.map((l) => x._fetchWalletImage(l)),
      O.wait(300)
    ]), $.search = x._filterOutExtensions(o);
  },
  initPromise(t, e) {
    const n = $.promises[t];
    return n || ($.promises[t] = e());
  },
  prefetch({ fetchConnectorImages: t = !0, fetchFeaturedWallets: e = !0, fetchRecommendedWallets: n = !0, fetchNetworkImages: r = !0 } = {}) {
    const s = [
      t && x.initPromise("connectorImages", x.fetchConnectorImages),
      e && x.initPromise("featuredWallets", x.fetchFeaturedWallets),
      n && x.initPromise("recommendedWallets", x.fetchRecommendedWallets),
      r && x.initPromise("networkImages", x.fetchNetworkImages)
    ].filter(Boolean);
    return Promise.allSettled(s);
  },
  prefetchAnalyticsConfig() {
    var t;
    (t = m.state.features) != null && t.analytics && x.fetchAnalyticsConfig();
  },
  async fetchAnalyticsConfig() {
    try {
      const { isAnalyticsEnabled: t } = await _e.get({
        path: "/getAnalyticsConfig",
        params: x._getSdkProperties()
      });
      m.setFeatures({ analytics: t });
    } catch {
      m.setFeatures({ analytics: !1 });
    }
  },
  filterByNamespaces(t) {
    if (!(t != null && t.length)) {
      $.featured = $.allFeatured, $.recommended = $.allRecommended;
      return;
    }
    const e = d.getRequestedCaipNetworkIds().join(",");
    $.featured = $.allFeatured.filter((n) => {
      var r;
      return (r = n.chains) == null ? void 0 : r.some((s) => e.includes(s));
    }), $.recommended = $.allRecommended.filter((n) => {
      var r;
      return (r = n.chains) == null ? void 0 : r.some((s) => e.includes(s));
    }), $.filteredWallets = $.wallets.filter((n) => {
      var r;
      return (r = n.chains) == null ? void 0 : r.some((s) => e.includes(s));
    });
  },
  clearFilterByNamespaces() {
    $.filteredWallets = [];
  },
  setFilterByNamespace(t) {
    if (!t) {
      $.featured = $.allFeatured, $.recommended = $.allRecommended;
      return;
    }
    const e = d.getRequestedCaipNetworkIds().join(",");
    $.featured = $.allFeatured.filter((n) => {
      var r;
      return (r = n.chains) == null ? void 0 : r.some((s) => e.includes(s));
    }), $.recommended = $.allRecommended.filter((n) => {
      var r;
      return (r = n.chains) == null ? void 0 : r.some((s) => e.includes(s));
    }), $.filteredWallets = $.wallets.filter((n) => {
      var r;
      return (r = n.chains) == null ? void 0 : r.some((s) => e.includes(s));
    });
  }
}, re = ae({
  view: "Connect",
  history: ["Connect"],
  transactionStack: []
}), Es = {
  state: re,
  subscribeKey(t, e) {
    return ge(re, t, e);
  },
  pushTransactionStack(t) {
    re.transactionStack.push(t);
  },
  popTransactionStack(t) {
    const e = re.transactionStack.pop();
    if (!e)
      return;
    const { onSuccess: n, onError: r, onCancel: s } = e;
    switch (t) {
      case "success":
        n == null || n();
        break;
      case "error":
        r == null || r(), W.goBack();
        break;
      case "cancel":
        s == null || s(), W.goBack();
        break;
    }
  },
  push(t, e) {
    t !== re.view && (re.view = t, re.history.push(t), re.data = e);
  },
  reset(t, e) {
    re.view = t, re.history = [t], re.data = e;
  },
  replace(t, e) {
    re.history.at(-1) === t || (re.view = t, re.history[re.history.length - 1] = t, re.data = e);
  },
  goBack() {
    var r;
    const t = d.state.activeCaipAddress, e = W.state.view === "ConnectingFarcaster", n = !t && e;
    if (re.history.length > 1) {
      re.history.pop();
      const [s] = re.history.slice(-1);
      s && (t && s === "Connect" ? re.view = "Account" : re.view = s);
    } else
      Z.close();
    (r = re.data) != null && r.wallet && (re.data.wallet = void 0), setTimeout(() => {
      var s, a, o;
      if (n) {
        I.setFarcasterUrl(void 0, d.state.activeChain);
        const i = w.getAuthConnector();
        (s = i == null ? void 0 : i.provider) == null || s.reload();
        const l = Lt(m.state);
        (o = (a = i == null ? void 0 : i.provider) == null ? void 0 : a.syncDappData) == null || o.call(a, {
          metadata: l.metadata,
          sdkVersion: l.sdkVersion,
          projectId: l.projectId,
          sdkType: l.sdkType
        });
      }
    }, 100);
  },
  goBackToIndex(t) {
    if (re.history.length > 1) {
      re.history = re.history.slice(0, t + 1);
      const [e] = re.history.slice(-1);
      e && (re.view = e);
    }
  },
  goBackOrCloseModal() {
    W.state.history.length > 1 ? W.goBack() : Z.close();
  }
}, W = Re(Es), Ke = ae({
  themeMode: "dark",
  themeVariables: {},
  w3mThemeVariables: void 0
}), Ln = {
  state: Ke,
  subscribe(t) {
    return he(Ke, () => t(Ke));
  },
  setThemeMode(t) {
    Ke.themeMode = t;
    try {
      const e = w.getAuthConnector();
      if (e) {
        const n = Ln.getSnapshot().themeVariables;
        e.provider.syncTheme({
          themeMode: t,
          themeVariables: n,
          w3mThemeVariables: ze(n, t)
        });
      }
    } catch {
      console.info("Unable to sync theme to auth connector");
    }
  },
  setThemeVariables(t) {
    Ke.themeVariables = { ...Ke.themeVariables, ...t };
    try {
      const e = w.getAuthConnector();
      if (e) {
        const n = Ln.getSnapshot().themeVariables;
        e.provider.syncTheme({
          themeVariables: n,
          w3mThemeVariables: ze(Ke.themeVariables, Ke.themeMode)
        });
      }
    } catch {
      console.info("Unable to sync theme to auth connector");
    }
  },
  getSnapshot() {
    return Lt(Ke);
  }
}, ve = Re(Ln), fr = {
  eip155: void 0,
  solana: void 0,
  polkadot: void 0,
  bip122: void 0,
  cosmos: void 0
}, Y = ae({
  allConnectors: [],
  connectors: [],
  activeConnector: void 0,
  filterByNamespace: void 0,
  activeConnectorIds: { ...fr },
  filterByNamespaceMap: {
    eip155: !0,
    solana: !0,
    polkadot: !0,
    bip122: !0,
    cosmos: !0
  }
}), _s = {
  state: Y,
  subscribe(t) {
    return he(Y, () => {
      t(Y);
    });
  },
  subscribeKey(t, e) {
    return ge(Y, t, e);
  },
  initialize(t) {
    t.forEach((e) => {
      const n = C.getConnectedConnectorId(e);
      n && w.setConnectorId(n, e);
    });
  },
  setActiveConnector(t) {
    t && (Y.activeConnector = dt(t));
  },
  setConnectors(t) {
    t.filter((s) => !Y.allConnectors.some((a) => a.id === s.id && w.getConnectorName(a.name) === w.getConnectorName(s.name) && a.chain === s.chain)).forEach((s) => {
      s.type !== "MULTI_CHAIN" && Y.allConnectors.push(dt(s));
    });
    const n = w.getEnabledNamespaces(), r = w.getEnabledConnectors(n);
    Y.connectors = w.mergeMultiChainConnectors(r);
  },
  filterByNamespaces(t) {
    Object.keys(Y.filterByNamespaceMap).forEach((e) => {
      Y.filterByNamespaceMap[e] = !1;
    }), t.forEach((e) => {
      Y.filterByNamespaceMap[e] = !0;
    }), w.updateConnectorsForEnabledNamespaces();
  },
  filterByNamespace(t, e) {
    Y.filterByNamespaceMap[t] = e, w.updateConnectorsForEnabledNamespaces();
  },
  updateConnectorsForEnabledNamespaces() {
    const t = w.getEnabledNamespaces(), e = w.getEnabledConnectors(t), n = w.areAllNamespacesEnabled();
    Y.connectors = w.mergeMultiChainConnectors(e), n ? x.clearFilterByNamespaces() : x.filterByNamespaces(t);
  },
  getEnabledNamespaces() {
    return Object.entries(Y.filterByNamespaceMap).filter(([t, e]) => e).map(([t]) => t);
  },
  getEnabledConnectors(t) {
    return Y.allConnectors.filter((e) => t.includes(e.chain));
  },
  areAllNamespacesEnabled() {
    return Object.values(Y.filterByNamespaceMap).every((t) => t);
  },
  mergeMultiChainConnectors(t) {
    const e = w.generateConnectorMapByName(t), n = [];
    return e.forEach((r) => {
      const s = r[0], a = (s == null ? void 0 : s.id) === f.CONNECTOR_ID.AUTH;
      r.length > 1 && s ? n.push({
        name: s.name,
        imageUrl: s.imageUrl,
        imageId: s.imageId,
        connectors: [...r],
        type: a ? "AUTH" : "MULTI_CHAIN",
        // These values are just placeholders, we don't use them in multi-chain connector select screen
        chain: "eip155",
        id: (s == null ? void 0 : s.id) || ""
      }) : s && n.push(s);
    }), n;
  },
  generateConnectorMapByName(t) {
    const e = /* @__PURE__ */ new Map();
    return t.forEach((n) => {
      const { name: r } = n, s = w.getConnectorName(r);
      if (!s)
        return;
      const a = e.get(s) || [];
      a.find((i) => i.chain === n.chain) || a.push(n), e.set(s, a);
    }), e;
  },
  getConnectorName(t) {
    return t && ({
      "Trust Wallet": "Trust"
    }[t] || t);
  },
  getUniqueConnectorsByName(t) {
    const e = [];
    return t.forEach((n) => {
      e.find((r) => r.chain === n.chain) || e.push(n);
    }), e;
  },
  addConnector(t) {
    var e, n, r;
    if (t.id === f.CONNECTOR_ID.AUTH) {
      const s = t, a = Lt(m.state), o = ve.getSnapshot().themeMode, i = ve.getSnapshot().themeVariables;
      (n = (e = s == null ? void 0 : s.provider) == null ? void 0 : e.syncDappData) == null || n.call(e, {
        metadata: a.metadata,
        sdkVersion: a.sdkVersion,
        projectId: a.projectId,
        sdkType: a.sdkType
      }), (r = s == null ? void 0 : s.provider) == null || r.syncTheme({
        themeMode: o,
        themeVariables: i,
        w3mThemeVariables: ze(i, o)
      }), w.setConnectors([t]);
    } else
      w.setConnectors([t]);
  },
  getAuthConnector(t) {
    var r;
    const e = t || d.state.activeChain, n = Y.connectors.find((s) => s.id === f.CONNECTOR_ID.AUTH);
    if (n)
      return (r = n == null ? void 0 : n.connectors) != null && r.length ? n.connectors.find((a) => a.chain === e) : n;
  },
  getAnnouncedConnectorRdns() {
    return Y.connectors.filter((t) => t.type === "ANNOUNCED").map((t) => {
      var e;
      return (e = t.info) == null ? void 0 : e.rdns;
    });
  },
  getConnectorById(t) {
    return Y.allConnectors.find((e) => e.id === t);
  },
  getConnector(t, e) {
    return Y.allConnectors.filter((r) => r.chain === d.state.activeChain).find((r) => {
      var s;
      return r.explorerId === t || ((s = r.info) == null ? void 0 : s.rdns) === e;
    });
  },
  syncIfAuthConnector(t) {
    var a, o;
    if (t.id !== "ID_AUTH")
      return;
    const e = t, n = Lt(m.state), r = ve.getSnapshot().themeMode, s = ve.getSnapshot().themeVariables;
    (o = (a = e == null ? void 0 : e.provider) == null ? void 0 : a.syncDappData) == null || o.call(a, {
      metadata: n.metadata,
      sdkVersion: n.sdkVersion,
      sdkType: n.sdkType,
      projectId: n.projectId
    }), e.provider.syncTheme({
      themeMode: r,
      themeVariables: s,
      w3mThemeVariables: ze(s, r)
    });
  },
  /**
   * Returns the connectors filtered by namespace.
   * @param namespace - The namespace to filter the connectors by.
   * @returns ConnectorWithProviders[].
   */
  getConnectorsByNamespace(t) {
    const e = Y.allConnectors.filter((n) => n.chain === t);
    return w.mergeMultiChainConnectors(e);
  },
  canSwitchToSmartAccount(t) {
    return d.checkIfSmartAccountEnabled() && Fe(t) === ue.ACCOUNT_TYPES.EOA;
  },
  selectWalletConnector(t) {
    const e = w.getConnector(t.id, t.rdns);
    ls.handleMobileDeeplinkRedirect((e == null ? void 0 : e.explorerId) || t.id, d.state.activeChain), e ? W.push("ConnectingExternal", { connector: e, wallet: t }) : W.push("ConnectingWalletConnect", { wallet: t });
  },
  /**
   * Returns the connectors. If a namespace is provided, the connectors are filtered by namespace.
   * @param namespace - The namespace to filter the connectors by. If not provided, all connectors are returned.
   * @returns ConnectorWithProviders[].
   */
  getConnectors(t) {
    return t ? w.getConnectorsByNamespace(t) : w.mergeMultiChainConnectors(Y.allConnectors);
  },
  /**
   * Sets the filter by namespace and updates the connectors.
   * @param namespace - The namespace to filter the connectors by.
   */
  setFilterByNamespace(t) {
    Y.filterByNamespace = t, Y.connectors = w.getConnectors(t), x.setFilterByNamespace(t);
  },
  setConnectorId(t, e) {
    t && (Y.activeConnectorIds = {
      ...Y.activeConnectorIds,
      [e]: t
    }, C.setConnectedConnectorId(e, t));
  },
  removeConnectorId(t) {
    Y.activeConnectorIds = {
      ...Y.activeConnectorIds,
      [t]: void 0
    }, C.deleteConnectedConnectorId(t);
  },
  getConnectorId(t) {
    if (t)
      return Y.activeConnectorIds[t];
  },
  isConnected(t) {
    return t ? !!Y.activeConnectorIds[t] : Object.values(Y.activeConnectorIds).some((e) => !!e);
  },
  resetConnectorIds() {
    Y.activeConnectorIds = { ...fr };
  }
}, w = Re(_s), As = 1e3, bt = {
  checkNamespaceConnectorId(t, e) {
    return w.getConnectorId(t) === e;
  },
  isSocialProvider(t) {
    return Q.DEFAULT_REMOTE_FEATURES.socials.includes(t);
  },
  connectWalletConnect({ walletConnect: t, connector: e, closeModalOnConnect: n = !0, redirectViewOnModalClose: r = "Connect", onOpen: s, onConnect: a }) {
    return new Promise((o, i) => {
      if (t && w.setActiveConnector(e), s == null || s(O.isMobile() && t), r) {
        const u = Z.subscribeKey("open", (p) => {
          p || (W.state.view !== r && W.replace(r), u(), i(new Error("Modal closed")));
        });
      }
      const l = d.subscribeKey("activeCaipAddress", (u) => {
        u && (a == null || a(), n && Z.close(), l(), o(Se.parseCaipAddress(u)));
      });
    });
  },
  connectExternal(t) {
    return new Promise((e, n) => {
      const r = d.subscribeKey("activeCaipAddress", (s) => {
        s && (Z.close(), r(), e(Se.parseCaipAddress(s)));
      });
      E.connectExternal(t, t.chain).catch(() => {
        r(), n(new Error("Connection rejected"));
      });
    });
  },
  connectSocial({ social: t, closeModalOnConnect: e = !0, onOpenFarcaster: n, onConnect: r }) {
    let s = I.state.socialWindow, a = I.state.socialProvider, o = !1, i = null;
    const l = d.subscribeKey("activeCaipAddress", (u) => {
      u && (e && Z.close(), l());
    });
    return new Promise((u, p) => {
      async function h(T) {
        var P, M;
        if ((P = T.data) != null && P.resultUri)
          if (T.origin === f.SECURE_SITE_SDK_ORIGIN) {
            window.removeEventListener("message", h, !1);
            try {
              const _ = w.getAuthConnector();
              if (_ && !o) {
                s && (s.close(), I.setSocialWindow(void 0, d.state.activeChain), s = I.state.socialWindow), o = !0;
                const V = T.data.resultUri;
                if (a && ne.sendEvent({
                  type: "track",
                  event: "SOCIAL_LOGIN_REQUEST_USER_DATA",
                  properties: { provider: a }
                }), a) {
                  C.setConnectedSocialProvider(a), await E.connectExternal({
                    id: _.id,
                    type: _.type,
                    socialUri: V
                  }, _.chain);
                  const U = d.state.activeCaipAddress;
                  if (!U) {
                    p(new Error("Failed to connect"));
                    return;
                  }
                  u(Se.parseCaipAddress(U)), ne.sendEvent({
                    type: "track",
                    event: "SOCIAL_LOGIN_SUCCESS",
                    properties: {
                      provider: a,
                      caipNetworkId: (M = d.getActiveCaipNetwork()) == null ? void 0 : M.caipNetworkId
                    }
                  });
                }
              }
            } catch {
              a && ne.sendEvent({
                type: "track",
                event: "SOCIAL_LOGIN_ERROR",
                properties: { provider: a }
              }), p(new Error("Failed to connect"));
            }
          } else a && ne.sendEvent({
            type: "track",
            event: "SOCIAL_LOGIN_ERROR",
            properties: { provider: a }
          });
      }
      async function R() {
        if (t && (I.setSocialProvider(t, d.state.activeChain), a = I.state.socialProvider, ne.sendEvent({
          type: "track",
          event: "SOCIAL_LOGIN_STARTED",
          properties: { provider: a }
        })), a === "farcaster") {
          n == null || n();
          const T = Z.subscribeKey("open", (M) => {
            !M && t === "farcaster" && (p(new Error("Popup closed")), r == null || r(), T());
          }), P = w.getAuthConnector();
          if (P && !I.state.farcasterUrl)
            try {
              const { url: M } = await P.provider.getFarcasterUri();
              I.setFarcasterUrl(M, d.state.activeChain);
            } catch {
              p(new Error("Failed to connect to farcaster"));
            }
        } else {
          const T = w.getAuthConnector();
          i = O.returnOpenHref(`${f.SECURE_SITE_SDK_ORIGIN}/loading`, "popupWindow", "width=600,height=800,scrollbars=yes");
          try {
            if (T && a) {
              const { uri: P } = await T.provider.getSocialRedirectUri({
                provider: a
              });
              if (i && P) {
                I.setSocialWindow(i, d.state.activeChain), s = I.state.socialWindow, i.location.href = P;
                const M = setInterval(() => {
                  s != null && s.closed && !o && (p(new Error("Popup closed")), clearInterval(M));
                }, 1e3);
                window.addEventListener("message", h, !1);
              } else
                i == null || i.close(), p(new Error("Failed to initiate social connection"));
            }
          } catch {
            p(new Error("Failed to initiate social connection")), i == null || i.close();
          }
        }
      }
      R();
    });
  },
  connectEmail({ closeModalOnConnect: t = !0, redirectViewOnModalClose: e = "Connect", onOpen: n, onConnect: r }) {
    return new Promise((s, a) => {
      if (n == null || n(), e) {
        const i = Z.subscribeKey("open", (l) => {
          l || (W.state.view !== e && W.replace(e), i(), a(new Error("Modal closed")));
        });
      }
      const o = d.subscribeKey("activeCaipAddress", (i) => {
        i && (r == null || r(), t && Z.close(), o(), s(Se.parseCaipAddress(i)));
      });
    });
  },
  async updateEmail() {
    const t = C.getConnectedConnectorId(d.state.activeChain), e = w.getAuthConnector();
    if (!e)
      throw new Error("No auth connector found");
    if (t !== f.CONNECTOR_ID.AUTH)
      throw new Error("Not connected to email or social");
    const n = e.provider.getEmail() ?? "";
    return W.push("UpdateEmailWallet", {
      email: n,
      redirectView: void 0
    }), new Promise((r, s) => {
      const a = setInterval(() => {
        const i = e.provider.getEmail() ?? "";
        i !== n && (Z.close(), clearInterval(a), o(), r({ email: i }));
      }, As), o = Z.subscribeKey("open", (i) => {
        i || (W.state.view !== "Connect" && W.push("Connect"), clearInterval(a), o(), s(new Error("Modal closed")));
      });
    });
  },
  canSwitchToSmartAccount(t) {
    return d.checkIfSmartAccountEnabled() && Fe(t) === ue.ACCOUNT_TYPES.EOA;
  }
};
function mr() {
  var r, s;
  const t = ((r = d.state.activeCaipNetwork) == null ? void 0 : r.chainNamespace) || "eip155", e = ((s = d.state.activeCaipNetwork) == null ? void 0 : s.id) || 1, n = Q.NATIVE_TOKEN_ADDRESS[t];
  return `${t}:${e}:${n}`;
}
function Fe(t) {
  var n;
  return (n = d.getAccountData(t)) == null ? void 0 : n.preferredAccountType;
}
const dn = {
  getConnectionStatus(t, e) {
    const n = w.state.activeConnectorIds[e], r = E.getConnections(e);
    return !!n && t.connectorId === n ? "connected" : r.some((o) => o.connectorId.toLowerCase() === t.connectorId.toLowerCase()) ? "active" : "disconnected";
  },
  excludeConnectorAddressFromConnections({ connections: t, connectorId: e, addresses: n }) {
    return t.map((r) => {
      if ((e ? r.connectorId.toLowerCase() === e.toLowerCase() : !1) && n) {
        const a = r.accounts.filter((o) => !n.some((l) => l.toLowerCase() === o.address.toLowerCase()));
        return { ...r, accounts: a };
      }
      return r;
    });
  },
  excludeExistingConnections(t, e) {
    const n = new Set(t);
    return e.filter((r) => !n.has(r.connectorId));
  },
  getConnectionsByConnectorId(t, e) {
    return t.filter((n) => n.connectorId.toLowerCase() === e.toLowerCase());
  },
  getConnectionsData(t) {
    var i;
    const e = !!((i = m.state.remoteFeatures) != null && i.multiWallet), n = w.state.activeConnectorIds[t], r = E.getConnections(t), a = (E.state.recentConnections.get(t) ?? []).filter((l) => w.getConnectorById(l.connectorId)), o = dn.excludeExistingConnections([...r.map((l) => l.connectorId), ...n ? [n] : []], a);
    return e ? {
      connections: r,
      recentConnections: o
    } : {
      connections: r.filter((l) => l.connectorId.toLowerCase() === (n == null ? void 0 : n.toLowerCase())),
      recentConnections: []
    };
  }
}, ct = Object.freeze({
  message: "",
  variant: "success",
  svg: void 0,
  open: !1,
  autoClose: !0
}), le = ae({
  ...ct
}), ys = {
  state: le,
  subscribeKey(t, e) {
    return ge(le, t, e);
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
    const e = O.parseError(t);
    this._showMessage({ message: e, variant: "error" });
  },
  hide() {
    le.message = ct.message, le.variant = ct.variant, le.svg = ct.svg, le.open = ct.open, le.autoClose = ct.autoClose;
  },
  _showMessage({ message: t, svg: e, variant: n = "success", autoClose: r = ct.autoClose }) {
    le.open ? (le.open = !1, setTimeout(() => {
      le.message = t, le.variant = n, le.svg = e, le.open = !0, le.autoClose = r;
    }, 150)) : (le.message = t, le.variant = n, le.svg = e, le.open = !0, le.autoClose = r);
  }
}, He = ys, oe = ae({
  transactions: [],
  transactionsByYear: {},
  lastNetworkInView: void 0,
  loading: !1,
  empty: !1,
  next: void 0
}), Ns = {
  state: oe,
  subscribe(t) {
    return he(oe, () => t(oe));
  },
  setLastNetworkInView(t) {
    oe.lastNetworkInView = t;
  },
  async fetchTransactions(t) {
    var e;
    if (!t)
      throw new Error("Transactions can't be fetched without an accountAddress");
    oe.loading = !0;
    try {
      const n = await D.fetchTransactions({
        account: t,
        cursor: oe.next,
        chainId: (e = d.state.activeCaipNetwork) == null ? void 0 : e.caipNetworkId
      }), r = sn.filterSpamTransactions(n.data), s = sn.filterByConnectedChain(r), a = [...oe.transactions, ...s];
      oe.loading = !1, oe.transactions = a, oe.transactionsByYear = sn.groupTransactionsByYearAndMonth(oe.transactionsByYear, s), oe.empty = a.length === 0, oe.next = n.next ? n.next : void 0;
    } catch {
      const r = d.state.activeChain;
      ne.sendEvent({
        type: "track",
        event: "ERROR_FETCH_TRANSACTIONS",
        properties: {
          address: t,
          projectId: m.state.projectId,
          cursor: oe.next,
          isSmartAccount: Fe(r) === ue.ACCOUNT_TYPES.SMART_ACCOUNT
        }
      }), He.showError("Failed to fetch transactions"), oe.loading = !1, oe.empty = !0, oe.next = void 0;
    }
  },
  groupTransactionsByYearAndMonth(t = {}, e = []) {
    const n = t;
    return e.forEach((r) => {
      const s = new Date(r.metadata.minedAt).getFullYear(), a = new Date(r.metadata.minedAt).getMonth(), o = n[s] ?? {}, l = (o[a] ?? []).filter((u) => u.id !== r.id);
      n[s] = {
        ...o,
        [a]: [...l, r].sort((u, p) => new Date(p.metadata.minedAt).getTime() - new Date(u.metadata.minedAt).getTime())
      };
    }), n;
  },
  filterSpamTransactions(t) {
    return t.filter((e) => !e.transfers.every((r) => {
      var s;
      return ((s = r.nft_info) == null ? void 0 : s.flags.is_spam) === !0;
    }));
  },
  filterByConnectedChain(t) {
    var r;
    const e = (r = d.state.activeCaipNetwork) == null ? void 0 : r.caipNetworkId;
    return t.filter((s) => s.metadata.chain === e);
  },
  clearCursor() {
    oe.next = void 0;
  },
  resetTransactions() {
    oe.transactions = [], oe.transactionsByYear = {}, oe.lastNetworkInView = void 0, oe.loading = !1, oe.empty = !1, oe.next = void 0;
  }
}, sn = Re(Ns, "API_ERROR"), K = ae({
  connections: /* @__PURE__ */ new Map(),
  recentConnections: /* @__PURE__ */ new Map(),
  isSwitchingConnection: !1,
  wcError: !1,
  buffering: !1,
  status: "disconnected"
});
let ot;
const vs = {
  state: K,
  subscribe(t) {
    return he(K, () => t(K));
  },
  subscribeKey(t, e) {
    return ge(K, t, e);
  },
  _getClient() {
    return K._client;
  },
  setClient(t) {
    K._client = dt(t);
  },
  initialize(t) {
    const e = t.filter((n) => !!n.namespace).map((n) => n.namespace);
    E.syncStorageConnections(e);
  },
  syncStorageConnections(t) {
    const e = C.getConnections(), n = t ?? Array.from(d.state.chains.keys());
    for (const r of n) {
      const s = e[r] ?? [], a = new Map(K.recentConnections);
      a.set(r, s), K.recentConnections = a;
    }
  },
  getConnections(t) {
    return t ? K.connections.get(t) ?? [] : [];
  },
  hasAnyConnection(t) {
    const e = E.state.connections;
    return Array.from(e.values()).flatMap((n) => n).some(({ connectorId: n }) => n === t);
  },
  async connectWalletConnect() {
    var t, e, n, r;
    if (O.isTelegram() || O.isSafari() && O.isIos()) {
      if (ot) {
        await ot, ot = void 0;
        return;
      }
      if (!O.isPairingExpired(K == null ? void 0 : K.wcPairingExpiry)) {
        const s = K.wcUri;
        K.wcUri = s;
        return;
      }
      ot = (e = (t = E._getClient()) == null ? void 0 : t.connectWalletConnect) == null ? void 0 : e.call(t).catch(() => {
      }), E.state.status = "connecting", await ot, ot = void 0, K.wcPairingExpiry = void 0, E.state.status = "connected";
    } else
      await ((r = (n = E._getClient()) == null ? void 0 : n.connectWalletConnect) == null ? void 0 : r.call(n));
  },
  async connectExternal(t, e, n = !0) {
    var s, a;
    const r = await ((a = (s = E._getClient()) == null ? void 0 : s.connectExternal) == null ? void 0 : a.call(s, t));
    return n && d.setActiveNamespace(e), r;
  },
  async reconnectExternal(t) {
    var n, r;
    await ((r = (n = E._getClient()) == null ? void 0 : n.reconnectExternal) == null ? void 0 : r.call(n, t));
    const e = t.chain || d.state.activeChain;
    e && w.setConnectorId(t.id, e);
  },
  async setPreferredAccountType(t, e) {
    var r;
    if (!e)
      return;
    Z.setLoading(!0, d.state.activeChain);
    const n = w.getAuthConnector();
    n && (I.setPreferredAccountType(t, e), await n.provider.setPreferredAccount(t), C.setPreferredAccountTypes(Object.entries(d.state.chains).reduce((s, [a, o]) => {
      const i = a, l = Fe(i);
      return l !== void 0 && (s[i] = l), s;
    }, {})), await E.reconnectExternal(n), Z.setLoading(!1, d.state.activeChain), ne.sendEvent({
      type: "track",
      event: "SET_PREFERRED_ACCOUNT_TYPE",
      properties: {
        accountType: t,
        network: ((r = d.state.activeCaipNetwork) == null ? void 0 : r.caipNetworkId) || ""
      }
    }));
  },
  async signMessage(t) {
    var e;
    return (e = E._getClient()) == null ? void 0 : e.signMessage(t);
  },
  parseUnits(t, e) {
    var n;
    return (n = E._getClient()) == null ? void 0 : n.parseUnits(t, e);
  },
  formatUnits(t, e) {
    var n;
    return (n = E._getClient()) == null ? void 0 : n.formatUnits(t, e);
  },
  async sendTransaction(t) {
    var e;
    return (e = E._getClient()) == null ? void 0 : e.sendTransaction(t);
  },
  async getCapabilities(t) {
    var e;
    return (e = E._getClient()) == null ? void 0 : e.getCapabilities(t);
  },
  async grantPermissions(t) {
    var e;
    return (e = E._getClient()) == null ? void 0 : e.grantPermissions(t);
  },
  async walletGetAssets(t) {
    var e;
    return ((e = E._getClient()) == null ? void 0 : e.walletGetAssets(t)) ?? {};
  },
  async estimateGas(t) {
    var e;
    return (e = E._getClient()) == null ? void 0 : e.estimateGas(t);
  },
  async writeContract(t) {
    var e;
    return (e = E._getClient()) == null ? void 0 : e.writeContract(t);
  },
  async getEnsAddress(t) {
    var e;
    return (e = E._getClient()) == null ? void 0 : e.getEnsAddress(t);
  },
  async getEnsAvatar(t) {
    var e;
    return (e = E._getClient()) == null ? void 0 : e.getEnsAvatar(t);
  },
  checkInstalled(t) {
    var e, n;
    return ((n = (e = E._getClient()) == null ? void 0 : e.checkInstalled) == null ? void 0 : n.call(e, t)) || !1;
  },
  resetWcConnection() {
    K.wcUri = void 0, K.wcPairingExpiry = void 0, K.wcLinking = void 0, K.recentWallet = void 0, K.status = "disconnected", sn.resetTransactions(), C.deleteWalletConnectDeepLink();
  },
  resetUri() {
    K.wcUri = void 0, K.wcPairingExpiry = void 0, ot = void 0;
  },
  finalizeWcConnection() {
    var n, r, s;
    const { wcLinking: t, recentWallet: e } = E.state;
    t && C.setWalletConnectDeepLink(t), e && C.setAppKitRecent(e), ne.sendEvent({
      type: "track",
      event: "CONNECT_SUCCESS",
      properties: {
        method: t ? "mobile" : "qrcode",
        name: ((r = (n = W.state.data) == null ? void 0 : n.wallet) == null ? void 0 : r.name) || "Unknown",
        caipNetworkId: (s = d.getActiveCaipNetwork()) == null ? void 0 : s.caipNetworkId
      }
    });
  },
  setWcBasic(t) {
    K.wcBasic = t;
  },
  setUri(t) {
    K.wcUri = t, K.wcPairingExpiry = O.getPairingExpiry();
  },
  setWcLinking(t) {
    K.wcLinking = t;
  },
  setWcError(t) {
    K.wcError = t, K.buffering = !1;
  },
  setRecentWallet(t) {
    K.recentWallet = t;
  },
  setBuffering(t) {
    K.buffering = t;
  },
  setStatus(t) {
    K.status = t;
  },
  setIsSwitchingConnection(t) {
    K.isSwitchingConnection = t;
  },
  async disconnect({ id: t, namespace: e, initialDisconnect: n } = {}) {
    var r;
    try {
      await ((r = E._getClient()) == null ? void 0 : r.disconnect({
        id: t,
        chainNamespace: e,
        initialDisconnect: n
      }));
    } catch (s) {
      throw new yt("Failed to disconnect", "INTERNAL_SDK_ERROR", s);
    }
  },
  setConnections(t, e) {
    const n = new Map(K.connections);
    n.set(e, t), K.connections = n;
  },
  async handleAuthAccountSwitch({ address: t, namespace: e }) {
    var s, a;
    const n = (a = (s = I.state.user) == null ? void 0 : s.accounts) == null ? void 0 : a.find((o) => o.type === "smartAccount"), r = n && n.address.toLowerCase() === t.toLowerCase() && bt.canSwitchToSmartAccount(e) ? "smartAccount" : "eoa";
    await E.setPreferredAccountType(r, e);
  },
  async handleActiveConnection({ connection: t, namespace: e, address: n }) {
    const r = w.getConnectorById(t.connectorId), s = t.connectorId === f.CONNECTOR_ID.AUTH;
    if (!r)
      throw new Error(`No connector found for connection: ${t.connectorId}`);
    if (s)
      s && n && await E.handleAuthAccountSwitch({ address: n, namespace: e });
    else {
      const a = await E.connectExternal({
        id: r.id,
        type: r.type,
        provider: r.provider,
        address: n,
        chain: e
      }, e);
      return a == null ? void 0 : a.address;
    }
    return n;
  },
  async handleDisconnectedConnection({ connection: t, namespace: e, address: n, closeModalOnConnect: r }) {
    var u, p;
    const s = w.getConnectorById(t.connectorId), a = (p = (u = t.auth) == null ? void 0 : u.name) == null ? void 0 : p.toLowerCase(), o = t.connectorId === f.CONNECTOR_ID.AUTH, i = t.connectorId === f.CONNECTOR_ID.WALLET_CONNECT;
    if (!s)
      throw new Error(`No connector found for connection: ${t.connectorId}`);
    let l;
    if (o)
      if (a && bt.isSocialProvider(a)) {
        const { address: h } = await bt.connectSocial({
          social: a,
          closeModalOnConnect: r,
          onOpenFarcaster() {
            Z.open({ view: "ConnectingFarcaster" });
          },
          onConnect() {
            W.replace("ProfileWallets");
          }
        });
        l = h;
      } else {
        const { address: h } = await bt.connectEmail({
          closeModalOnConnect: r,
          onOpen() {
            Z.open({ view: "EmailLogin" });
          },
          onConnect() {
            W.replace("ProfileWallets");
          }
        });
        l = h;
      }
    else if (i) {
      const { address: h } = await bt.connectWalletConnect({
        walletConnect: !0,
        connector: s,
        closeModalOnConnect: r,
        onOpen(R) {
          Z.open({ view: R ? "AllWallets" : "ConnectingWalletConnect" });
        },
        onConnect() {
          W.replace("ProfileWallets");
        }
      });
      l = h;
    } else {
      const h = await E.connectExternal({
        id: s.id,
        type: s.type,
        provider: s.provider,
        chain: e
      }, e);
      h && (l = h.address);
    }
    return o && n && await E.handleAuthAccountSwitch({ address: n, namespace: e }), l;
  },
  async switchConnection({ connection: t, address: e, namespace: n, closeModalOnConnect: r, onChange: s }) {
    let a;
    const o = I.getCaipAddress(n);
    if (o) {
      const { address: l } = Se.parseCaipAddress(o);
      a = l;
    }
    const i = dn.getConnectionStatus(t, n);
    switch (i) {
      case "connected":
      case "active": {
        const l = await E.handleActiveConnection({
          connection: t,
          namespace: n,
          address: e
        });
        if (a && l) {
          const u = l.toLowerCase() !== a.toLowerCase();
          s == null || s({
            address: l,
            namespace: n,
            hasSwitchedAccount: u,
            hasSwitchedWallet: i === "active"
          });
        }
        break;
      }
      case "disconnected": {
        const l = await E.handleDisconnectedConnection({
          connection: t,
          namespace: n,
          address: e,
          closeModalOnConnect: r
        });
        l && (s == null || s({
          address: l,
          namespace: n,
          hasSwitchedAccount: !0,
          hasSwitchedWallet: !0
        }));
        break;
      }
      default:
        throw new Error(`Invalid connection status: ${i}`);
    }
  }
}, E = Re(vs), ft = ae({
  loading: !1,
  open: !1,
  selectedNetworkId: void 0,
  activeChain: void 0,
  initialized: !1
}), xe = {
  state: ft,
  subscribe(t) {
    return he(ft, () => t(ft));
  },
  subscribeOpen(t) {
    return ge(ft, "open", t);
  },
  set(t) {
    Object.assign(ft, { ...ft, ...t });
  }
}, Ts = {
  async getTokenList() {
    var r;
    const t = d.state.activeCaipNetwork, e = await D.fetchSwapTokens({
      chainId: t == null ? void 0 : t.caipNetworkId
    });
    return ((r = e == null ? void 0 : e.tokens) == null ? void 0 : r.map((s) => ({
      ...s,
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
    const t = d.state.activeCaipNetwork;
    if (!t)
      return null;
    try {
      switch (t.chainNamespace) {
        case "solana":
          const n = (e = await (E == null ? void 0 : E.estimateGas({ chainNamespace: "solana" }))) == null ? void 0 : e.toString();
          return {
            standard: n,
            fast: n,
            instant: n
          };
        case "eip155":
        default:
          return await D.fetchGasPrice({
            chainId: t.caipNetworkId
          });
      }
    } catch {
      return null;
    }
  },
  async fetchSwapAllowance({ tokenAddress: t, userAddress: e, sourceTokenAmount: n, sourceTokenDecimals: r }) {
    const s = await D.fetchSwapAllowance({
      tokenAddress: t,
      userAddress: e
    });
    if (s != null && s.allowance && n && r) {
      const a = E.parseUnits(n, r) || 0;
      return BigInt(s.allowance) >= a;
    }
    return !1;
  },
  async getMyTokensWithBalance(t) {
    const e = await Gn.getMyTokensWithBalance(t);
    return I.setTokenBalance(e, d.state.activeChain), this.mapBalancesToSwapTokens(e);
  },
  /**
   * Maps the balances from Blockchain API to SwapTokenWithBalance array
   * @param balances
   * @returns SwapTokenWithBalance[]
   */
  mapBalancesToSwapTokens(t) {
    return (t == null ? void 0 : t.map((e) => ({
      ...e,
      address: e != null && e.address ? e.address : mr(),
      decimals: parseInt(e.quantity.decimals, 10),
      logoUri: e.iconUrl,
      eip2612: !1
    }))) || [];
  }
}, te = ae({
  tokenBalances: [],
  loading: !1
}), Ss = {
  state: te,
  subscribe(t) {
    return he(te, () => t(te));
  },
  subscribeKey(t, e) {
    return ge(te, t, e);
  },
  setToken(t) {
    t && (te.token = dt(t));
  },
  setTokenAmount(t) {
    te.sendTokenAmount = t;
  },
  setReceiverAddress(t) {
    te.receiverAddress = t;
  },
  setReceiverProfileImageUrl(t) {
    te.receiverProfileImageUrl = t;
  },
  setReceiverProfileName(t) {
    te.receiverProfileName = t;
  },
  setNetworkBalanceInUsd(t) {
    te.networkBalanceInUSD = t;
  },
  setLoading(t) {
    te.loading = t;
  },
  async sendToken() {
    var t;
    try {
      switch (J.setLoading(!0), (t = d.state.activeCaipNetwork) == null ? void 0 : t.chainNamespace) {
        case "eip155":
          await J.sendEvmToken();
          return;
        case "solana":
          await J.sendSolanaToken();
          return;
        default:
          throw new Error("Unsupported chain");
      }
    } finally {
      J.setLoading(!1);
    }
  },
  async sendEvmToken() {
    var n, r, s;
    const t = d.state.activeChain;
    if (!t)
      throw new Error("SendController:sendEvmToken - activeChainNamespace is required");
    const e = Fe(t);
    if (!J.state.sendTokenAmount || !J.state.receiverAddress)
      throw new Error("An amount and receiver address are required");
    if (!J.state.token)
      throw new Error("A token is required");
    (n = J.state.token) != null && n.address ? (ne.sendEvent({
      type: "track",
      event: "SEND_INITIATED",
      properties: {
        isSmartAccount: e === ue.ACCOUNT_TYPES.SMART_ACCOUNT,
        token: J.state.token.address,
        amount: J.state.sendTokenAmount,
        network: ((r = d.state.activeCaipNetwork) == null ? void 0 : r.caipNetworkId) || ""
      }
    }), await J.sendERC20Token({
      receiverAddress: J.state.receiverAddress,
      tokenAddress: J.state.token.address,
      sendTokenAmount: J.state.sendTokenAmount,
      decimals: J.state.token.quantity.decimals
    })) : (ne.sendEvent({
      type: "track",
      event: "SEND_INITIATED",
      properties: {
        isSmartAccount: e === ue.ACCOUNT_TYPES.SMART_ACCOUNT,
        token: J.state.token.symbol || "",
        amount: J.state.sendTokenAmount,
        network: ((s = d.state.activeCaipNetwork) == null ? void 0 : s.caipNetworkId) || ""
      }
    }), await J.sendNativeToken({
      receiverAddress: J.state.receiverAddress,
      sendTokenAmount: J.state.sendTokenAmount,
      decimals: J.state.token.quantity.decimals
    }));
  },
  async fetchTokenBalance(t) {
    var a, o;
    te.loading = !0;
    const e = (a = d.state.activeCaipNetwork) == null ? void 0 : a.caipNetworkId, n = (o = d.state.activeCaipNetwork) == null ? void 0 : o.chainNamespace, r = d.state.activeCaipAddress, s = r ? O.getPlainAddress(r) : void 0;
    if (te.lastRetry && !O.isAllowedRetry(te.lastRetry, 30 * Q.ONE_SEC_MS))
      return te.loading = !1, [];
    try {
      if (s && e && n) {
        const i = await Gn.getMyTokensWithBalance();
        return te.tokenBalances = i, te.lastRetry = void 0, i;
      }
    } catch (i) {
      te.lastRetry = Date.now(), t == null || t(i), He.showError("Token Balance Unavailable");
    } finally {
      te.loading = !1;
    }
    return [];
  },
  fetchNetworkBalance() {
    if (te.tokenBalances.length === 0)
      return;
    const t = Ts.mapBalancesToSwapTokens(te.tokenBalances);
    if (!t)
      return;
    const e = t.find((n) => n.address === mr());
    e && (te.networkBalanceInUSD = e ? Kr.multiply(e.quantity.numeric, e.price).toString() : "0");
  },
  async sendNativeToken(t) {
    var a, o, i;
    W.pushTransactionStack({});
    const e = t.receiverAddress, n = I.state.address, r = E.parseUnits(t.sendTokenAmount.toString(), Number(t.decimals));
    await E.sendTransaction({
      chainNamespace: f.CHAIN.EVM,
      to: e,
      address: n,
      data: "0x",
      value: r ?? BigInt(0)
    }), ne.sendEvent({
      type: "track",
      event: "SEND_SUCCESS",
      properties: {
        isSmartAccount: Fe("eip155") === ue.ACCOUNT_TYPES.SMART_ACCOUNT,
        token: ((a = J.state.token) == null ? void 0 : a.symbol) || "",
        amount: t.sendTokenAmount,
        network: ((o = d.state.activeCaipNetwork) == null ? void 0 : o.caipNetworkId) || ""
      }
    }), (i = E._getClient()) == null || i.updateBalance("eip155"), J.resetSend();
  },
  async sendERC20Token(t) {
    W.pushTransactionStack({
      onSuccess() {
        W.replace("Account");
      }
    });
    const e = E.parseUnits(t.sendTokenAmount.toString(), Number(t.decimals));
    if (I.state.address && t.sendTokenAmount && t.receiverAddress && t.tokenAddress) {
      const n = O.getPlainAddress(t.tokenAddress);
      if (!n)
        throw new Error("SendController:sendERC20Token - tokenAddress is required");
      await E.writeContract({
        fromAddress: I.state.address,
        tokenAddress: n,
        args: [t.receiverAddress, e ?? BigInt(0)],
        method: "transfer",
        abi: Xr.getERC20Abi(n),
        chainNamespace: f.CHAIN.EVM
      }), J.resetSend();
    }
  },
  async sendSolanaToken() {
    var t;
    if (!J.state.sendTokenAmount || !J.state.receiverAddress)
      throw new Error("An amount and receiver address are required");
    W.pushTransactionStack({
      onSuccess() {
        W.replace("Account");
      }
    }), await E.sendTransaction({
      chainNamespace: "solana",
      to: J.state.receiverAddress,
      value: J.state.sendTokenAmount
    }), (t = E._getClient()) == null || t.updateBalance("solana"), J.resetSend();
  },
  resetSend() {
    te.token = void 0, te.sendTokenAmount = void 0, te.receiverAddress = void 0, te.receiverProfileImageUrl = void 0, te.receiverProfileName = void 0, te.loading = !1, te.tokenBalances = [];
  }
}, J = Re(Ss), bn = {
  currentTab: 0,
  tokenBalance: [],
  smartAccountDeployed: !1,
  addressLabels: /* @__PURE__ */ new Map(),
  user: void 0,
  preferredAccountType: void 0
}, tn = {
  caipNetwork: void 0,
  supportsAllNetworks: !0,
  smartAccountEnabledNetworks: []
}, A = ae({
  chains: qr(),
  activeCaipAddress: void 0,
  activeChain: void 0,
  activeCaipNetwork: void 0,
  noAdapters: !1,
  universalAdapter: {
    networkControllerClient: void 0,
    connectionControllerClient: void 0
  },
  isSwitchingNamespace: !1
}), bs = {
  state: A,
  subscribe(t) {
    return he(A, () => {
      t(A);
    });
  },
  subscribeKey(t, e) {
    return ge(A, t, e);
  },
  subscribeChainProp(t, e, n) {
    let r;
    return he(A.chains, () => {
      var a;
      const s = n || A.activeChain;
      if (s) {
        const o = (a = A.chains.get(s)) == null ? void 0 : a[t];
        r !== o && (r = o, e(o));
      }
    });
  },
  initialize(t, e, n) {
    const { chainId: r, namespace: s } = C.getActiveNetworkProps(), a = e == null ? void 0 : e.find((p) => p.id.toString() === (r == null ? void 0 : r.toString())), i = t.find((p) => (p == null ? void 0 : p.namespace) === s) || (t == null ? void 0 : t[0]), l = t.map((p) => p.namespace).filter((p) => p !== void 0), u = m.state.enableEmbedded ? /* @__PURE__ */ new Set([...l]) : /* @__PURE__ */ new Set([...(e == null ? void 0 : e.map((p) => p.chainNamespace)) ?? []]);
    ((t == null ? void 0 : t.length) === 0 || !i) && (A.noAdapters = !0), A.noAdapters || (A.activeChain = i == null ? void 0 : i.namespace, A.activeCaipNetwork = a, d.setChainNetworkData(i == null ? void 0 : i.namespace, {
      caipNetwork: a
    }), A.activeChain && xe.set({ activeChain: i == null ? void 0 : i.namespace })), u.forEach((p) => {
      const h = e == null ? void 0 : e.filter((P) => P.chainNamespace === p), R = C.getPreferredAccountTypes() || {}, T = { ...m.state.defaultAccountTypes, ...R };
      d.state.chains.set(p, {
        namespace: p,
        networkState: ae({ ...tn, caipNetwork: h == null ? void 0 : h[0] }),
        accountState: ae({ ...bn, preferredAccountType: T[p] }),
        caipNetworks: h ?? [],
        ...n
      }), d.setRequestedCaipNetworks(h ?? [], p);
    });
  },
  removeAdapter(t) {
    var e, n;
    if (A.activeChain === t) {
      const r = Array.from(A.chains.entries()).find(([s]) => s !== t);
      if (r) {
        const s = (n = (e = r[1]) == null ? void 0 : e.caipNetworks) == null ? void 0 : n[0];
        s && d.setActiveCaipNetwork(s);
      }
    }
    A.chains.delete(t);
  },
  addAdapter(t, { networkControllerClient: e, connectionControllerClient: n }, r) {
    if (!t.namespace)
      throw new Error("ChainController:addAdapter - adapter must have a namespace");
    A.chains.set(t.namespace, {
      namespace: t.namespace,
      networkState: { ...tn, caipNetwork: r[0] },
      accountState: bn,
      caipNetworks: r,
      connectionControllerClient: n,
      networkControllerClient: e
    }), d.setRequestedCaipNetworks((r == null ? void 0 : r.filter((s) => s.chainNamespace === t.namespace)) ?? [], t.namespace);
  },
  addNetwork(t) {
    var n;
    const e = A.chains.get(t.chainNamespace);
    if (e) {
      const r = [...e.caipNetworks || []];
      (n = e.caipNetworks) != null && n.find((s) => s.id === t.id) || r.push(t), A.chains.set(t.chainNamespace, { ...e, caipNetworks: r }), d.setRequestedCaipNetworks(r, t.chainNamespace), w.filterByNamespace(t.chainNamespace, !0);
    }
  },
  removeNetwork(t, e) {
    var r, s, a;
    const n = A.chains.get(t);
    if (n) {
      const o = ((r = A.activeCaipNetwork) == null ? void 0 : r.id) === e, i = [
        ...((s = n.caipNetworks) == null ? void 0 : s.filter((l) => l.id !== e)) || []
      ];
      o && ((a = n == null ? void 0 : n.caipNetworks) != null && a[0]) && d.setActiveCaipNetwork(n.caipNetworks[0]), A.chains.set(t, { ...n, caipNetworks: i }), d.setRequestedCaipNetworks(i || [], t), i.length === 0 && w.filterByNamespace(t, !1);
    }
  },
  setAdapterNetworkState(t, e) {
    const n = A.chains.get(t);
    n && (n.networkState = {
      ...n.networkState || tn,
      ...e
    }, A.chains.set(t, n));
  },
  setChainAccountData(t, e, n = !0) {
    if (!t)
      throw new Error("Chain is required to update chain account data");
    const r = A.chains.get(t);
    if (r) {
      const s = { ...r.accountState || bn, ...e };
      A.chains.set(t, { ...r, accountState: s }), (A.chains.size === 1 || A.activeChain === t) && (e.caipAddress && (A.activeCaipAddress = e.caipAddress), I.replaceState(s));
    }
  },
  setChainNetworkData(t, e) {
    if (!t)
      return;
    const n = A.chains.get(t);
    if (n) {
      const r = { ...n.networkState || tn, ...e };
      A.chains.set(t, { ...n, networkState: r });
    }
  },
  // eslint-disable-next-line max-params
  setAccountProp(t, e, n, r = !0) {
    d.setChainAccountData(n, { [t]: e }, r);
  },
  setActiveNamespace(t) {
    var r, s;
    A.activeChain = t;
    const e = t ? A.chains.get(t) : void 0, n = (r = e == null ? void 0 : e.networkState) == null ? void 0 : r.caipNetwork;
    n != null && n.id && t && (A.activeCaipAddress = (s = e == null ? void 0 : e.accountState) == null ? void 0 : s.caipAddress, A.activeCaipNetwork = n, d.setChainNetworkData(t, { caipNetwork: n }), C.setActiveCaipNetworkId(n == null ? void 0 : n.caipNetworkId), xe.set({
      activeChain: t,
      selectedNetworkId: n == null ? void 0 : n.caipNetworkId
    }));
  },
  setActiveCaipNetwork(t) {
    var r, s, a;
    if (!t)
      return;
    A.activeChain !== t.chainNamespace && d.setIsSwitchingNamespace(!0);
    const e = A.chains.get(t.chainNamespace);
    A.activeChain = t.chainNamespace, A.activeCaipNetwork = t, d.setChainNetworkData(t.chainNamespace, { caipNetwork: t }), (r = e == null ? void 0 : e.accountState) != null && r.address ? A.activeCaipAddress = `${t.chainNamespace}:${t.id}:${(s = e == null ? void 0 : e.accountState) == null ? void 0 : s.address}` : A.activeCaipAddress = void 0, d.setAccountProp("caipAddress", A.activeCaipAddress, t.chainNamespace), e && I.replaceState(e.accountState), J.resetSend(), xe.set({
      activeChain: A.activeChain,
      selectedNetworkId: (a = A.activeCaipNetwork) == null ? void 0 : a.caipNetworkId
    }), C.setActiveCaipNetworkId(t.caipNetworkId), !d.checkIfSupportedNetwork(t.chainNamespace) && m.state.enableNetworkSwitch && !m.state.allowUnsupportedChain && !E.state.wcBasic && d.showUnsupportedChainUI();
  },
  addCaipNetwork(t) {
    var n;
    if (!t)
      return;
    const e = A.chains.get(t.chainNamespace);
    e && ((n = e == null ? void 0 : e.caipNetworks) == null || n.push(t));
  },
  async switchActiveNamespace(t) {
    var s;
    if (!t)
      return;
    const e = t !== d.state.activeChain, n = (s = d.getNetworkData(t)) == null ? void 0 : s.caipNetwork, r = d.getCaipNetworkByNamespace(t, n == null ? void 0 : n.id);
    e && r && await d.switchActiveNetwork(r);
  },
  async switchActiveNetwork(t) {
    var a;
    const e = d.state.activeChain;
    if (!e)
      throw new Error("ChainController:switchActiveNetwork - namespace is required");
    const n = d.state.chains.get(e), r = !((a = n == null ? void 0 : n.caipNetworks) != null && a.some((o) => {
      var i;
      return o.id === ((i = A.activeCaipNetwork) == null ? void 0 : i.id);
    })), s = d.getNetworkControllerClient(t.chainNamespace);
    if (s) {
      try {
        await s.switchCaipNetwork(t), r && Z.close();
      } catch {
        W.goBack();
      }
      ne.sendEvent({
        type: "track",
        event: "SWITCH_NETWORK",
        properties: { network: t.caipNetworkId }
      });
    }
  },
  getNetworkControllerClient(t) {
    const e = t || A.activeChain;
    if (!e)
      throw new Error("ChainController:getNetworkControllerClient - chain is required");
    const n = A.chains.get(e);
    if (!n)
      throw new Error("Chain adapter not found");
    if (!n.networkControllerClient)
      throw new Error("NetworkController client not set");
    return n.networkControllerClient;
  },
  getConnectionControllerClient(t) {
    const e = t || A.activeChain;
    if (!e)
      throw new Error("Chain is required to get connection controller client");
    const n = A.chains.get(e);
    if (!(n != null && n.connectionControllerClient))
      throw new Error("ConnectionController client not set");
    return n.connectionControllerClient;
  },
  getAccountProp(t, e) {
    var s;
    let n = A.activeChain;
    if (e && (n = e), !n)
      return;
    const r = (s = A.chains.get(n)) == null ? void 0 : s.accountState;
    if (r)
      return r[t];
  },
  getNetworkProp(t, e) {
    var r;
    const n = (r = A.chains.get(e)) == null ? void 0 : r.networkState;
    if (n)
      return n[t];
  },
  getRequestedCaipNetworks(t) {
    const e = A.chains.get(t), { approvedCaipNetworkIds: n = [], requestedCaipNetworks: r = [] } = (e == null ? void 0 : e.networkState) || {};
    return O.sortRequestedNetworks(n, r).filter((o) => o == null ? void 0 : o.id);
  },
  getAllRequestedCaipNetworks() {
    const t = [];
    return A.chains.forEach((e) => {
      if (!e.namespace)
        throw new Error("ChainController:getAllRequestedCaipNetworks - chainAdapter must have a namespace");
      const n = d.getRequestedCaipNetworks(e.namespace);
      t.push(...n);
    }), t;
  },
  setRequestedCaipNetworks(t, e) {
    d.setAdapterNetworkState(e, { requestedCaipNetworks: t });
    const r = d.getAllRequestedCaipNetworks().map((a) => a.chainNamespace), s = Array.from(new Set(r));
    w.filterByNamespaces(s);
  },
  getAllApprovedCaipNetworkIds() {
    const t = [];
    return A.chains.forEach((e) => {
      if (!e.namespace)
        throw new Error("ChainController:getAllApprovedCaipNetworkIds - chainAdapter must have a namespace");
      const n = d.getApprovedCaipNetworkIds(e.namespace);
      t.push(...n);
    }), t;
  },
  getActiveCaipNetwork(t) {
    var e, n;
    return t ? (n = (e = A.chains.get(t)) == null ? void 0 : e.networkState) == null ? void 0 : n.caipNetwork : A.activeCaipNetwork;
  },
  getActiveCaipAddress() {
    return A.activeCaipAddress;
  },
  getApprovedCaipNetworkIds(t) {
    var r;
    const e = A.chains.get(t);
    return ((r = e == null ? void 0 : e.networkState) == null ? void 0 : r.approvedCaipNetworkIds) || [];
  },
  async setApprovedCaipNetworksData(t) {
    const e = d.getNetworkControllerClient(), n = await (e == null ? void 0 : e.getApprovedCaipNetworksData());
    d.setAdapterNetworkState(t, {
      approvedCaipNetworkIds: n == null ? void 0 : n.approvedCaipNetworkIds,
      supportsAllNetworks: n == null ? void 0 : n.supportsAllNetworks
    });
  },
  checkIfSupportedNetwork(t, e) {
    var s;
    const n = e || ((s = A.activeCaipNetwork) == null ? void 0 : s.caipNetworkId), r = d.getRequestedCaipNetworks(t);
    return r.length ? r == null ? void 0 : r.some((a) => a.caipNetworkId === n) : !0;
  },
  checkIfSupportedChainId(t) {
    if (!A.activeChain)
      return !0;
    const e = d.getRequestedCaipNetworks(A.activeChain);
    return e == null ? void 0 : e.some((n) => n.id === t);
  },
  // Smart Account Network Handlers
  setSmartAccountEnabledNetworks(t, e) {
    d.setAdapterNetworkState(e, { smartAccountEnabledNetworks: t });
  },
  checkIfSmartAccountEnabled() {
    var r;
    const t = ur.caipNetworkIdToNumber((r = A.activeCaipNetwork) == null ? void 0 : r.caipNetworkId), e = A.activeChain;
    if (!e || !t)
      return !1;
    const n = d.getNetworkProp("smartAccountEnabledNetworks", e);
    return !!(n != null && n.includes(Number(t)));
  },
  showUnsupportedChainUI() {
    Z.open({ view: "UnsupportedChain" });
  },
  checkIfNamesSupported() {
    const t = A.activeCaipNetwork;
    return !!(t != null && t.chainNamespace && Q.NAMES_SUPPORTED_CHAIN_NAMESPACES.includes(t.chainNamespace));
  },
  resetNetwork(t) {
    d.setAdapterNetworkState(t, {
      approvedCaipNetworkIds: void 0,
      supportsAllNetworks: !0
    });
  },
  resetAccount(t) {
    const e = t;
    if (!e)
      throw new Error("Chain is required to set account prop");
    const n = m.state.defaultAccountTypes[e], r = d.getAccountProp("preferredAccountType", e);
    A.activeCaipAddress = void 0, d.setChainAccountData(e, {
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
      preferredAccountType: n || r,
      socialProvider: void 0,
      socialWindow: void 0,
      farcasterUrl: void 0,
      user: void 0,
      status: "disconnected"
    }), w.removeConnectorId(e);
  },
  setIsSwitchingNamespace(t) {
    A.isSwitchingNamespace = t;
  },
  getFirstCaipNetworkSupportsAuthConnector() {
    var n, r;
    const t = [];
    let e;
    if (A.chains.forEach((s) => {
      f.AUTH_CONNECTOR_SUPPORTED_CHAINS.find((a) => a === s.namespace) && s.namespace && t.push(s.namespace);
    }), t.length > 0) {
      const s = t[0];
      return e = s ? (r = (n = A.chains.get(s)) == null ? void 0 : n.caipNetworks) == null ? void 0 : r[0] : void 0, e;
    }
  },
  getAccountData(t) {
    var e;
    return t ? (e = d.state.chains.get(t)) == null ? void 0 : e.accountState : I.state;
  },
  getNetworkData(t) {
    var n;
    const e = t || A.activeChain;
    if (e)
      return (n = d.state.chains.get(e)) == null ? void 0 : n.networkState;
  },
  getCaipNetworkByNamespace(t, e) {
    var s, a, o;
    if (!t)
      return;
    const n = d.state.chains.get(t), r = (s = n == null ? void 0 : n.caipNetworks) == null ? void 0 : s.find((i) => i.id === e);
    return r || ((a = n == null ? void 0 : n.networkState) == null ? void 0 : a.caipNetwork) || ((o = n == null ? void 0 : n.caipNetworks) == null ? void 0 : o[0]);
  },
  /**
   * Get the requested CaipNetwork IDs for a given namespace. If namespace is not provided, all requested CaipNetwork IDs will be returned
   * @param namespace - The namespace to get the requested CaipNetwork IDs for
   * @returns The requested CaipNetwork IDs
   */
  getRequestedCaipNetworkIds() {
    const t = w.state.filterByNamespace;
    return (t ? [A.chains.get(t)] : Array.from(A.chains.values())).flatMap((n) => (n == null ? void 0 : n.caipNetworks) || []).map((n) => n.caipNetworkId);
  },
  getCaipNetworks(t) {
    return t ? d.getRequestedCaipNetworks(t) : d.getAllRequestedCaipNetworks();
  },
  setLastConnectedSIWECaipNetwork(t) {
    A.lastConnectedSIWECaipNetwork = t;
  },
  getLastConnectedSIWECaipNetwork() {
    return A.lastConnectedSIWECaipNetwork;
  }
}, d = Re(bs), Is = {
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
}, gr = O.getBlockchainApiUrl(), Ae = ae({
  clientId: null,
  api: new Zt({ baseUrl: gr, clientId: null }),
  supportedChains: { http: [], ws: [] }
}), D = {
  state: Ae,
  async get(t) {
    const { st: e, sv: n } = D.getSdkProperties(), r = m.state.projectId, s = {
      ...t.params || {},
      st: e,
      sv: n,
      projectId: r
    };
    return Ae.api.get({
      ...t,
      params: s
    });
  },
  getSdkProperties() {
    const { sdkType: t, sdkVersion: e } = m.state;
    return {
      st: t || "unknown",
      sv: e || "unknown"
    };
  },
  async isNetworkSupported(t) {
    if (!t)
      return !1;
    try {
      Ae.supportedChains.http.length || await D.getSupportedNetworks();
    } catch {
      return !1;
    }
    return Ae.supportedChains.http.includes(t);
  },
  async getSupportedNetworks() {
    try {
      const t = await D.get({
        path: "v1/supported-chains"
      });
      return Ae.supportedChains = t, t;
    } catch {
      return Ae.supportedChains;
    }
  },
  async fetchIdentity({ address: t, caipNetworkId: e }) {
    if (!await D.isNetworkSupported(e))
      return { avatar: "", name: "" };
    const r = C.getIdentityFromCacheForAddress(t);
    if (r)
      return r;
    const s = await D.get({
      path: `/v1/identity/${t}`,
      params: {
        sender: d.state.activeCaipAddress ? O.getPlainAddress(d.state.activeCaipAddress) : void 0
      }
    });
    return C.updateIdentityCache({
      address: t,
      identity: s,
      timestamp: Date.now()
    }), s;
  },
  async fetchTransactions({ account: t, cursor: e, signal: n, cache: r, chainId: s }) {
    var o;
    return await D.isNetworkSupported((o = d.state.activeCaipNetwork) == null ? void 0 : o.caipNetworkId) ? D.get({
      path: `/v1/account/${t}/history`,
      params: {
        cursor: e,
        chainId: s
      },
      signal: n,
      cache: r
    }) : { data: [], next: void 0 };
  },
  async fetchSwapQuote({ amount: t, userAddress: e, from: n, to: r, gasPrice: s }) {
    var o;
    return await D.isNetworkSupported((o = d.state.activeCaipNetwork) == null ? void 0 : o.caipNetworkId) ? D.get({
      path: "/v1/convert/quotes",
      headers: {
        "Content-Type": "application/json"
      },
      params: {
        amount: t,
        userAddress: e,
        from: n,
        to: r,
        gasPrice: s
      }
    }) : { quotes: [] };
  },
  async fetchSwapTokens({ chainId: t }) {
    var n;
    return await D.isNetworkSupported((n = d.state.activeCaipNetwork) == null ? void 0 : n.caipNetworkId) ? D.get({
      path: "/v1/convert/tokens",
      params: { chainId: t }
    }) : { tokens: [] };
  },
  async fetchTokenPrice({ addresses: t }) {
    var n;
    return await D.isNetworkSupported((n = d.state.activeCaipNetwork) == null ? void 0 : n.caipNetworkId) ? Ae.api.post({
      path: "/v1/fungible/price",
      body: {
        currency: "usd",
        addresses: t,
        projectId: m.state.projectId
      },
      headers: {
        "Content-Type": "application/json"
      }
    }) : { fungibles: [] };
  },
  async fetchSwapAllowance({ tokenAddress: t, userAddress: e }) {
    var r;
    return await D.isNetworkSupported((r = d.state.activeCaipNetwork) == null ? void 0 : r.caipNetworkId) ? D.get({
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
    var s;
    const { st: e, sv: n } = D.getSdkProperties();
    if (!await D.isNetworkSupported((s = d.state.activeCaipNetwork) == null ? void 0 : s.caipNetworkId))
      throw new Error("Network not supported for Gas Price");
    return D.get({
      path: "/v1/convert/gas-price",
      headers: {
        "Content-Type": "application/json"
      },
      params: {
        chainId: t,
        st: e,
        sv: n
      }
    });
  },
  async generateSwapCalldata({ amount: t, from: e, to: n, userAddress: r, disableEstimate: s }) {
    var o;
    if (!await D.isNetworkSupported((o = d.state.activeCaipNetwork) == null ? void 0 : o.caipNetworkId))
      throw new Error("Network not supported for Swaps");
    return Ae.api.post({
      path: "/v1/convert/build-transaction",
      headers: {
        "Content-Type": "application/json"
      },
      body: {
        amount: t,
        eip155: {
          slippage: Q.CONVERT_SLIPPAGE_TOLERANCE
        },
        projectId: m.state.projectId,
        from: e,
        to: n,
        userAddress: r,
        disableEstimate: s
      }
    });
  },
  async generateApproveCalldata({ from: t, to: e, userAddress: n }) {
    var o;
    const { st: r, sv: s } = D.getSdkProperties();
    if (!await D.isNetworkSupported((o = d.state.activeCaipNetwork) == null ? void 0 : o.caipNetworkId))
      throw new Error("Network not supported for Swaps");
    return D.get({
      path: "/v1/convert/build-approve",
      headers: {
        "Content-Type": "application/json"
      },
      params: {
        userAddress: n,
        from: t,
        to: e,
        st: r,
        sv: s
      }
    });
  },
  async getBalance(t, e, n) {
    var u;
    const { st: r, sv: s } = D.getSdkProperties();
    if (!await D.isNetworkSupported((u = d.state.activeCaipNetwork) == null ? void 0 : u.caipNetworkId))
      return He.showError("Token Balance Unavailable"), { balances: [] };
    const o = `${e}:${t}`, i = C.getBalanceCacheForCaipAddress(o);
    if (i)
      return i;
    const l = await D.get({
      path: `/v1/account/${t}/balance`,
      params: {
        currency: "usd",
        chainId: e,
        forceUpdate: n,
        st: r,
        sv: s
      }
    });
    return C.updateBalanceCache({
      caipAddress: o,
      balance: l,
      timestamp: Date.now()
    }), l;
  },
  async lookupEnsName(t) {
    var n;
    return await D.isNetworkSupported((n = d.state.activeCaipNetwork) == null ? void 0 : n.caipNetworkId) ? D.get({
      path: `/v1/profile/account/${t}`,
      params: { apiVersion: "2" }
    }) : { addresses: {}, attributes: [] };
  },
  async reverseLookupEnsName({ address: t }) {
    var n;
    return await D.isNetworkSupported((n = d.state.activeCaipNetwork) == null ? void 0 : n.caipNetworkId) ? D.get({
      path: `/v1/profile/reverse/${t}`,
      params: {
        sender: I.state.address,
        apiVersion: "2"
      }
    }) : [];
  },
  async getEnsNameSuggestions(t) {
    var n;
    return await D.isNetworkSupported((n = d.state.activeCaipNetwork) == null ? void 0 : n.caipNetworkId) ? D.get({
      path: `/v1/profile/suggestions/${t}`,
      params: { zone: "reown.id" }
    }) : { suggestions: [] };
  },
  async registerEnsName({ coinType: t, address: e, message: n, signature: r }) {
    var a;
    return await D.isNetworkSupported((a = d.state.activeCaipNetwork) == null ? void 0 : a.caipNetworkId) ? Ae.api.post({
      path: "/v1/profile/account",
      body: { coin_type: t, address: e, message: n, signature: r },
      headers: {
        "Content-Type": "application/json"
      }
    }) : { success: !1 };
  },
  async generateOnRampURL({ destinationWallets: t, partnerUserId: e, defaultNetwork: n, purchaseAmount: r, paymentAmount: s }) {
    var i;
    return await D.isNetworkSupported((i = d.state.activeCaipNetwork) == null ? void 0 : i.caipNetworkId) ? (await Ae.api.post({
      path: "/v1/generators/onrampurl",
      params: {
        projectId: m.state.projectId
      },
      body: {
        destinationWallets: t,
        defaultNetwork: n,
        partnerUserId: e,
        defaultExperience: "buy",
        presetCryptoAmount: r,
        presetFiatAmount: s
      }
    })).url : "";
  },
  async getOnrampOptions() {
    var e;
    if (!await D.isNetworkSupported((e = d.state.activeCaipNetwork) == null ? void 0 : e.caipNetworkId))
      return { paymentCurrencies: [], purchaseCurrencies: [] };
    try {
      return await D.get({
        path: "/v1/onramp/options"
      });
    } catch {
      return Is;
    }
  },
  async getOnrampQuote({ purchaseCurrency: t, paymentCurrency: e, amount: n, network: r }) {
    var s;
    try {
      return await D.isNetworkSupported((s = d.state.activeCaipNetwork) == null ? void 0 : s.caipNetworkId) ? await Ae.api.post({
        path: "/v1/onramp/quote",
        params: {
          projectId: m.state.projectId
        },
        body: {
          purchaseCurrency: t,
          paymentCurrency: e,
          amount: n,
          network: r
        }
      }) : null;
    } catch {
      return {
        networkFee: { amount: n, currency: e.id },
        paymentSubtotal: { amount: n, currency: e.id },
        paymentTotal: { amount: n, currency: e.id },
        purchaseAmount: { amount: n, currency: e.id },
        quoteId: "mocked-quote-id"
      };
    }
  },
  async getSmartSessions(t) {
    var n;
    return await D.isNetworkSupported((n = d.state.activeCaipNetwork) == null ? void 0 : n.caipNetworkId) ? D.get({
      path: `/v1/sessions/${t}`
    }) : [];
  },
  async revokeSmartSession(t, e, n) {
    var s;
    return await D.isNetworkSupported((s = d.state.activeCaipNetwork) == null ? void 0 : s.caipNetworkId) ? Ae.api.post({
      path: `/v1/sessions/${t}/revoke`,
      params: {
        projectId: m.state.projectId
      },
      body: {
        pci: e,
        signature: n
      }
    }) : { success: !1 };
  },
  setClientId(t) {
    Ae.clientId = t, Ae.api = new Zt({ baseUrl: gr, clientId: t });
  }
}, In = {
  /**
   * Creates a Balance object from an ERC7811 Asset object
   * @param asset - Asset object to convert
   * @param chainId - Chain ID in CAIP-2 format
   * @returns Balance object
   */
  createBalance(t, e) {
    const n = {
      name: t.metadata.name || "",
      symbol: t.metadata.symbol || "",
      decimals: t.metadata.decimals || 0,
      value: t.metadata.value || 0,
      price: t.metadata.price || 0,
      iconUrl: t.metadata.iconUrl || ""
    };
    return {
      name: n.name,
      symbol: n.symbol,
      chainId: e,
      address: t.address === "native" ? void 0 : this.convertAddressToCAIP10Address(t.address, e),
      value: n.value,
      price: n.price,
      quantity: {
        decimals: n.decimals.toString(),
        numeric: this.convertHexToBalance({
          hex: t.balance,
          decimals: n.decimals
        })
      },
      iconUrl: n.iconUrl
    };
  },
  /**
   * Converts a hex string to a Balance object
   * @param hex - Hex string to convert
   * @param decimals - Number of decimals to use
   * @returns Balance object
   */
  convertHexToBalance({ hex: t, decimals: e }) {
    return Ur(BigInt(t), e);
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
    const n = e[1], r = parseInt(n, 10);
    return isNaN(r) ? "0x0" : `0x${r.toString(16)}`;
  },
  /**
   * Checks if a response is a valid WalletGetAssetsResponse
   * @param response - The response to check
   * @returns True if the response is a valid WalletGetAssetsResponse, false otherwise
   */
  isWalletGetAssetsResponse(t) {
    return typeof t != "object" || t === null ? !1 : Object.values(t).every((e) => Array.isArray(e) && e.every((n) => this.isValidAsset(n)));
  },
  /**
   * Checks if an asset object is valid.
   * @param asset - The asset object to check.
   * @returns True if the asset is valid, false otherwise.
   */
  isValidAsset(t) {
    return typeof t == "object" && t !== null && typeof t.address == "string" && typeof t.balance == "string" && (t.type === "ERC20" || t.type === "NATIVE") && typeof t.metadata == "object" && t.metadata !== null && typeof t.metadata.name == "string" && typeof t.metadata.symbol == "string" && typeof t.metadata.decimals == "number" && typeof t.metadata.price == "number" && typeof t.metadata.iconUrl == "string";
  }
}, Gn = {
  /**
   * Get the balances of the user's tokens. If user connected with Auth provider or and on the EIP155 network,
   * it'll use the `wallet_getAssets` and `wallet_getCapabilities` calls to fetch the balance rather than Blockchain API
   * @param forceUpdate - If true, the balances will be fetched from the server
   * @returns The balances of the user's tokens
   */
  async getMyTokensWithBalance(t) {
    const e = I.state.address, n = d.state.activeCaipNetwork, r = w.getConnectorId("eip155") === f.CONNECTOR_ID.AUTH;
    if (!e || !n)
      return [];
    const s = `${n.caipNetworkId}:${e}`, a = C.getBalanceCacheForCaipAddress(s);
    if (a)
      return a.balances;
    if (n.chainNamespace === f.CHAIN.EVM && r) {
      const i = await this.getEIP155Balances(e, n);
      if (i)
        return this.filterLowQualityTokens(i);
    }
    const o = await D.getBalance(e, n.caipNetworkId, t);
    return this.filterLowQualityTokens(o.balances);
  },
  /**
   * Get the balances of the user's tokens on the EIP155 network using native `wallet_getAssets` and `wallet_getCapabilities` calls
   * @param address - The address of the user
   * @param caipNetwork - The CAIP network
   * @returns The balances of the user's tokens on the EIP155 network
   */
  async getEIP155Balances(t, e) {
    var n, r;
    try {
      const s = In.getChainIdHexFromCAIP2ChainId(e.caipNetworkId), a = await E.getCapabilities(t);
      if (!((r = (n = a == null ? void 0 : a[s]) == null ? void 0 : n.assetDiscovery) != null && r.supported))
        return null;
      const o = await E.walletGetAssets({
        account: t,
        chainFilter: [s]
      });
      if (!In.isWalletGetAssetsResponse(o))
        return null;
      const l = (o[s] || []).map((u) => In.createBalance(u, e.caipNetworkId));
      return C.updateBalanceCache({
        caipAddress: `${e.caipNetworkId}:${t}`,
        balance: { balances: l },
        timestamp: Date.now()
      }), l;
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
  }
}, Be = ae({
  currentTab: 0,
  tokenBalance: [],
  smartAccountDeployed: !1,
  addressLabels: /* @__PURE__ */ new Map()
}), Rs = {
  state: Be,
  replaceState(t) {
    t && Object.assign(Be, dt(t));
  },
  subscribe(t) {
    return d.subscribeChainProp("accountState", (e) => {
      if (e)
        return t(e);
    });
  },
  subscribeKey(t, e, n) {
    let r;
    return d.subscribeChainProp("accountState", (s) => {
      if (s) {
        const a = s[t];
        r !== a && (r = a, e(a));
      }
    }, n);
  },
  setStatus(t, e) {
    d.setAccountProp("status", t, e);
  },
  getCaipAddress(t) {
    return d.getAccountProp("caipAddress", t);
  },
  setCaipAddress(t, e) {
    const n = t ? O.getPlainAddress(t) : void 0;
    e === d.state.activeChain && (d.state.activeCaipAddress = t), d.setAccountProp("caipAddress", t, e), d.setAccountProp("address", n, e);
  },
  setBalance(t, e, n) {
    d.setAccountProp("balance", t, n), d.setAccountProp("balanceSymbol", e, n);
  },
  setProfileName(t, e) {
    d.setAccountProp("profileName", t, e);
  },
  setProfileImage(t, e) {
    d.setAccountProp("profileImage", t, e);
  },
  setUser(t, e) {
    d.setAccountProp("user", t, e);
  },
  setAddressExplorerUrl(t, e) {
    d.setAccountProp("addressExplorerUrl", t, e);
  },
  setSmartAccountDeployed(t, e) {
    d.setAccountProp("smartAccountDeployed", t, e);
  },
  setCurrentTab(t) {
    d.setAccountProp("currentTab", t, d.state.activeChain);
  },
  setTokenBalance(t, e) {
    t && d.setAccountProp("tokenBalance", t, e);
  },
  setShouldUpdateToAddress(t, e) {
    d.setAccountProp("shouldUpdateToAddress", t, e);
  },
  addAddressLabel(t, e, n) {
    const r = d.getAccountProp("addressLabels", n) || /* @__PURE__ */ new Map();
    r.set(t, e), d.setAccountProp("addressLabels", r, n);
  },
  removeAddressLabel(t, e) {
    const n = d.getAccountProp("addressLabels", e) || /* @__PURE__ */ new Map();
    n.delete(t), d.setAccountProp("addressLabels", n, e);
  },
  setConnectedWalletInfo(t, e) {
    d.setAccountProp("connectedWalletInfo", t, e, !1);
  },
  setPreferredAccountType(t, e) {
    d.setAccountProp("preferredAccountType", t, e);
  },
  setSocialProvider(t, e) {
    t && d.setAccountProp("socialProvider", t, e);
  },
  setSocialWindow(t, e) {
    d.setAccountProp("socialWindow", t ? dt(t) : void 0, e);
  },
  setFarcasterUrl(t, e) {
    d.setAccountProp("farcasterUrl", t, e);
  },
  async fetchTokenBalance(t) {
    var a, o;
    Be.balanceLoading = !0;
    const e = (a = d.state.activeCaipNetwork) == null ? void 0 : a.caipNetworkId, n = (o = d.state.activeCaipNetwork) == null ? void 0 : o.chainNamespace, r = d.state.activeCaipAddress, s = r ? O.getPlainAddress(r) : void 0;
    if (Be.lastRetry && !O.isAllowedRetry(Be.lastRetry, 30 * Q.ONE_SEC_MS))
      return Be.balanceLoading = !1, [];
    try {
      if (s && e && n) {
        const i = await Gn.getMyTokensWithBalance();
        return I.setTokenBalance(i, n), Be.lastRetry = void 0, Be.balanceLoading = !1, i;
      }
    } catch (i) {
      Be.lastRetry = Date.now(), t == null || t(i), He.showError("Token Balance Unavailable");
    } finally {
      Be.balanceLoading = !1;
    }
    return [];
  },
  resetAccount(t) {
    d.resetAccount(t);
  }
}, I = Re(Rs), Os = {
  /**
   * Function to handle the network switch.
   * This function has variety of conditions to handle the network switch depending on the connectors or namespace's connection states.
   * @param args.network - The network to switch to.
   * @param args.shouldConfirmSwitch - Whether to confirm the switch. If true, the user will be asked to confirm the switch if necessary.
   * @returns void
   */
  onSwitchNetwork({ network: t, ignoreSwitchConfirmation: e = !1 }) {
    const n = d.state.activeCaipNetwork, r = W.state.data;
    if (t.id === (n == null ? void 0 : n.id))
      return;
    const a = I.getCaipAddress(d.state.activeChain), o = t.chainNamespace !== d.state.activeChain, i = I.getCaipAddress(t.chainNamespace), u = w.getConnectorId(d.state.activeChain) === f.CONNECTOR_ID.AUTH, p = f.AUTH_CONNECTOR_SUPPORTED_CHAINS.find((h) => h === t.chainNamespace);
    e || u && p ? W.push("SwitchNetwork", { ...r, network: t }) : /** * If user switching to a different namespace and next namespace is not connected, we need to show switch active chain view for confirmation first. */ a && o && !i ? W.push("SwitchActiveChain", {
      switchToChain: t.chainNamespace,
      navigateTo: "Connect",
      navigateWithReplace: !0,
      network: t
    }) : W.push("SwitchNetwork", { ...r, network: t });
  }
}, ye = ae({
  loading: !1,
  loadingNamespaceMap: /* @__PURE__ */ new Map(),
  open: !1,
  shake: !1,
  namespace: void 0
}), ks = {
  state: ye,
  subscribe(t) {
    return he(ye, () => t(ye));
  },
  subscribeKey(t, e) {
    return ge(ye, t, e);
  },
  async open(t) {
    var a, o;
    const e = t == null ? void 0 : t.namespace, n = d.state.activeChain, r = e && e !== n, s = (a = d.getAccountData(t == null ? void 0 : t.namespace)) == null ? void 0 : a.caipAddress;
    if (E.state.wcBasic ? x.prefetch({ fetchNetworkImages: !1, fetchConnectorImages: !1 }) : await x.prefetch(), w.setFilterByNamespace(t == null ? void 0 : t.namespace), Z.setLoading(!0, e), e && r) {
      const i = ((o = d.getNetworkData(e)) == null ? void 0 : o.caipNetwork) || d.getRequestedCaipNetworks(e)[0];
      i && Os.onSwitchNetwork({ network: i, ignoreSwitchConfirmation: !0 });
    } else {
      const i = d.state.noAdapters;
      m.state.manualWCControl || i && !s ? O.isMobile() ? W.reset("AllWallets") : W.reset("ConnectingWalletConnectBasic") : t != null && t.view ? W.reset(t.view, t.data) : s ? W.reset("Account") : W.reset("Connect");
    }
    ye.open = !0, xe.set({ open: !0 }), ne.sendEvent({
      type: "track",
      event: "MODAL_OPEN",
      properties: { connected: !!s }
    });
  },
  close() {
    const t = m.state.enableEmbedded, e = !!d.state.activeCaipAddress;
    ye.open && ne.sendEvent({
      type: "track",
      event: "MODAL_CLOSE",
      properties: { connected: e }
    }), ye.open = !1, W.reset("Connect"), Z.clearLoading(), t ? e ? W.replace("Account") : W.push("Connect") : xe.set({ open: !1 }), E.resetUri();
  },
  setLoading(t, e) {
    e && ye.loadingNamespaceMap.set(e, t), ye.loading = t, xe.set({ loading: t });
  },
  clearLoading() {
    ye.loadingNamespaceMap.clear(), ye.loading = !1, xe.set({ loading: !1 });
  },
  shake() {
    ye.shake || (ye.shake = !0, setTimeout(() => {
      ye.shake = !1;
    }, 500));
  }
}, Z = Re(ks), Ot = {
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
}, Dn = {
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
}, Ps = {
  providers: pr,
  selectedProvider: null,
  error: null,
  purchaseCurrency: Ot,
  paymentCurrency: Dn,
  purchaseCurrencies: [Ot],
  paymentCurrencies: [],
  quotesLoading: !1
}, z = ae(Ps), Us = {
  state: z,
  subscribe(t) {
    return he(z, () => t(z));
  },
  subscribeKey(t, e) {
    return ge(z, t, e);
  },
  setSelectedProvider(t) {
    if (t && t.name === "meld") {
      const e = d.state.activeChain, n = e === f.CHAIN.SOLANA ? "SOL" : "USDC", r = d.getAccountProp("address", e) ?? "", s = new URL(t.url);
      s.searchParams.append("publicKey", Jr), s.searchParams.append("destinationCurrencyCode", n), s.searchParams.append("walletAddress", r), s.searchParams.append("externalCustomerId", m.state.projectId), z.selectedProvider = { ...t, url: s.toString() };
    } else
      z.selectedProvider = t;
  },
  setOnrampProviders(t) {
    if (Array.isArray(t) && t.every((e) => typeof e == "string")) {
      const e = t, n = pr.filter((r) => e.includes(r.name));
      z.providers = n;
    } else
      z.providers = [];
  },
  setPurchaseCurrency(t) {
    z.purchaseCurrency = t;
  },
  setPaymentCurrency(t) {
    z.paymentCurrency = t;
  },
  setPurchaseAmount(t) {
    Mn.state.purchaseAmount = t;
  },
  setPaymentAmount(t) {
    Mn.state.paymentAmount = t;
  },
  async getAvailableCurrencies() {
    const t = await D.getOnrampOptions();
    z.purchaseCurrencies = t.purchaseCurrencies, z.paymentCurrencies = t.paymentCurrencies, z.paymentCurrency = t.paymentCurrencies[0] || Dn, z.purchaseCurrency = t.purchaseCurrencies[0] || Ot, await x.fetchCurrencyImages(t.paymentCurrencies.map((e) => e.id)), await x.fetchTokenImages(t.purchaseCurrencies.map((e) => e.symbol));
  },
  async getQuote() {
    var t, e;
    z.quotesLoading = !0;
    try {
      const n = await D.getOnrampQuote({
        purchaseCurrency: z.purchaseCurrency,
        paymentCurrency: z.paymentCurrency,
        amount: ((t = z.paymentAmount) == null ? void 0 : t.toString()) || "0",
        network: (e = z.purchaseCurrency) == null ? void 0 : e.symbol
      });
      return z.quotesLoading = !1, z.purchaseAmount = Number(n == null ? void 0 : n.purchaseAmount.amount), n;
    } catch (n) {
      return z.error = n.message, z.quotesLoading = !1, null;
    } finally {
      z.quotesLoading = !1;
    }
  },
  resetState() {
    z.selectedProvider = null, z.error = null, z.purchaseCurrency = Ot, z.paymentCurrency = Dn, z.purchaseCurrencies = [Ot], z.paymentCurrencies = [], z.paymentAmount = void 0, z.purchaseAmount = void 0, z.quotesLoading = !1;
  }
}, Mn = Re(Us), Jn = 2147483648, xs = {
  convertEVMChainIdToCoinType(t) {
    if (t >= Jn)
      throw new Error("Invalid chainId");
    return (Jn | t) >>> 0;
  }
}, Oe = ae({
  suggestions: [],
  loading: !1
}), Ls = {
  state: Oe,
  subscribe(t) {
    return he(Oe, () => t(Oe));
  },
  subscribeKey(t, e) {
    return ge(Oe, t, e);
  },
  async resolveName(t) {
    var e, n;
    try {
      return await D.lookupEnsName(t);
    } catch (r) {
      const s = r;
      throw new Error(((n = (e = s == null ? void 0 : s.reasons) == null ? void 0 : e[0]) == null ? void 0 : n.description) || "Error resolving name");
    }
  },
  async isNameRegistered(t) {
    try {
      return await D.lookupEnsName(t), !0;
    } catch {
      return !1;
    }
  },
  async getSuggestions(t) {
    try {
      Oe.loading = !0, Oe.suggestions = [];
      const e = await D.getEnsNameSuggestions(t);
      return Oe.suggestions = e.suggestions.map((n) => ({
        ...n,
        name: n.name
      })) || [], Oe.suggestions;
    } catch (e) {
      const n = kt.parseEnsApiError(e, "Error fetching name suggestions");
      throw new Error(n);
    } finally {
      Oe.loading = !1;
    }
  },
  async getNamesForAddress(t) {
    try {
      if (!d.state.activeCaipNetwork)
        return [];
      const n = C.getEnsFromCacheForAddress(t);
      if (n)
        return n;
      const r = await D.reverseLookupEnsName({ address: t });
      return C.updateEnsCache({
        address: t,
        ens: r,
        timestamp: Date.now()
      }), r;
    } catch (e) {
      const n = kt.parseEnsApiError(e, "Error fetching names for address");
      throw new Error(n);
    }
  },
  async registerName(t) {
    const e = d.state.activeCaipNetwork, n = I.state.address, r = w.getAuthConnector();
    if (!e)
      throw new Error("Network not found");
    if (!n || !r)
      throw new Error("Address or auth connector not found");
    Oe.loading = !0;
    try {
      const s = JSON.stringify({
        name: t,
        attributes: {},
        // Unix timestamp
        timestamp: Math.floor(Date.now() / 1e3)
      });
      W.pushTransactionStack({
        onCancel() {
          W.replace("RegisterAccountName");
        }
      });
      const a = await E.signMessage(s);
      Oe.loading = !1;
      const o = e.id;
      if (!o)
        throw new Error("Network not found");
      const i = xs.convertEVMChainIdToCoinType(Number(o));
      await D.registerEnsName({
        coinType: i,
        address: n,
        signature: a,
        message: s
      }), I.setProfileName(t, e.chainNamespace), W.replace("RegisterAccountNameSuccess");
    } catch (s) {
      const a = kt.parseEnsApiError(s, `Error registering name ${t}`);
      throw W.replace("RegisterAccountName"), new Error(a);
    } finally {
      Oe.loading = !1;
    }
  },
  validateName(t) {
    return /^[a-zA-Z0-9-]{4,}$/u.test(t);
  },
  parseEnsApiError(t, e) {
    var r, s;
    const n = t;
    return ((s = (r = n == null ? void 0 : n.reasons) == null ? void 0 : r[0]) == null ? void 0 : s.description) || e;
  }
}, kt = Re(Ls);
let it = null;
const Ue = {
  getSIWX() {
    return m.state.siwx;
  },
  async initializeIfEnabled(t = d.getActiveCaipAddress()) {
    var a;
    const e = m.state.siwx;
    if (!(e && t))
      return;
    const [n, r, s] = t.split(":");
    if (d.checkIfSupportedNetwork(n, `${n}:${r}`))
      try {
        if (it && await it, (await e.getSessions(`${n}:${r}`, s)).length)
          return;
        await Z.open({
          view: "SIWXSignMessage"
        });
      } catch (o) {
        console.error("SIWXUtil:initializeIfEnabled", o), ne.sendEvent({
          type: "track",
          event: "SIWX_AUTH_ERROR",
          properties: this.getSIWXEventProperties()
        }), await ((a = E._getClient()) == null ? void 0 : a.disconnect().catch(console.error)), W.reset("Connect"), He.showError("A problem occurred while trying initialize authentication");
      }
  },
  async requestSignMessage() {
    const t = m.state.siwx, e = O.getPlainAddress(d.getActiveCaipAddress()), n = d.getActiveCaipNetwork(), r = E._getClient();
    if (!t)
      throw new Error("SIWX is not enabled");
    if (!e)
      throw new Error("No ActiveCaipAddress found");
    if (!n)
      throw new Error("No ActiveCaipNetwork or client found");
    if (!r)
      throw new Error("No ConnectionController client found");
    try {
      const s = await t.createMessage({
        chainId: n.caipNetworkId,
        accountAddress: e
      }), a = s.toString();
      w.getConnectorId(n.chainNamespace) === f.CONNECTOR_ID.AUTH && W.pushTransactionStack({});
      const i = await r.signMessage(a);
      await t.addSession({
        data: s,
        message: a,
        signature: i
      }), d.setLastConnectedSIWECaipNetwork(n), Z.close(), ne.sendEvent({
        type: "track",
        event: "SIWX_AUTH_SUCCESS",
        properties: this.getSIWXEventProperties()
      });
    } catch (s) {
      const a = this.getSIWXEventProperties();
      (!Z.state.open || W.state.view === "ApproveTransaction") && await Z.open({
        view: "SIWXSignMessage"
      }), He.showError("Error signing message"), ne.sendEvent({
        type: "track",
        event: "SIWX_AUTH_ERROR",
        properties: a
      }), console.error("SWIXUtil:requestSignMessage", s);
    }
  },
  async cancelSignMessage() {
    var t;
    try {
      const e = this.getSIWX();
      if ((t = e == null ? void 0 : e.getRequired) == null ? void 0 : t.call(e)) {
        const r = d.getLastConnectedSIWECaipNetwork();
        if (r) {
          const s = await (e == null ? void 0 : e.getSessions(r == null ? void 0 : r.caipNetworkId, O.getPlainAddress(d.getActiveCaipAddress()) || ""));
          s && s.length > 0 ? await d.switchActiveNetwork(r) : await E.disconnect();
        } else
          await E.disconnect();
      } else
        Z.close();
      Z.close(), ne.sendEvent({
        event: "CLICK_CANCEL_SIWX",
        type: "track",
        properties: this.getSIWXEventProperties()
      });
    } catch (e) {
      console.error("SIWXUtil:cancelSignMessage", e);
    }
  },
  async getAllSessions() {
    const t = this.getSIWX(), e = d.getAllRequestedCaipNetworks(), n = [];
    return await Promise.all(e.map(async (r) => {
      const s = await (t == null ? void 0 : t.getSessions(r.caipNetworkId, O.getPlainAddress(d.getActiveCaipAddress()) || ""));
      s && n.push(...s);
    })), n;
  },
  async getSessions(t) {
    const e = m.state.siwx;
    let n = t == null ? void 0 : t.address;
    if (!n) {
      const s = d.getActiveCaipAddress();
      n = O.getPlainAddress(s);
    }
    let r = t == null ? void 0 : t.caipNetworkId;
    if (!r) {
      const s = d.getActiveCaipNetwork();
      r = s == null ? void 0 : s.caipNetworkId;
    }
    return e && n && r ? e.getSessions(r, n) : [];
  },
  async isSIWXCloseDisabled() {
    var e;
    const t = this.getSIWX();
    if (t) {
      const n = W.state.view === "ApproveTransaction", r = W.state.view === "SIWXSignMessage";
      if (n || r)
        return ((e = t.getRequired) == null ? void 0 : e.call(t)) && (await this.getSessions()).length === 0;
    }
    return !1;
  },
  async authConnectorAuthenticate({ authConnector: t, chainId: e, socialUri: n, preferredAccountType: r, chainNamespace: s }) {
    const a = Ue.getSIWX();
    if (!a || !s.includes(f.CHAIN.EVM)) {
      const p = await t.connect({
        chainId: e,
        socialUri: n,
        preferredAccountType: r
      });
      return {
        address: p.address,
        chainId: p.chainId,
        accounts: p.accounts
      };
    }
    const o = `${s}:${e}`, i = await a.createMessage({
      chainId: o,
      accountAddress: "<<AccountAddress>>"
    }), l = {
      accountAddress: i.accountAddress,
      chainId: i.chainId,
      domain: i.domain,
      uri: i.uri,
      version: i.version,
      nonce: i.nonce,
      notBefore: i.notBefore,
      statement: i.statement,
      resources: i.resources,
      requestId: i.requestId,
      issuedAt: i.issuedAt,
      expirationTime: i.expirationTime,
      serializedMessage: i.toString()
    }, u = await t.connect({
      chainId: e,
      socialUri: n,
      siwxMessage: l,
      preferredAccountType: r
    });
    return l.accountAddress = u.address, l.serializedMessage = u.message || "", u.signature && u.message && await Ue.addEmbeddedWalletSession(l, u.message, u.signature), {
      address: u.address,
      chainId: u.chainId,
      accounts: u.accounts
    };
  },
  async addEmbeddedWalletSession(t, e, n) {
    if (it)
      return it;
    const r = Ue.getSIWX();
    return r ? (it = r.addSession({
      data: t,
      message: e,
      signature: n
    }).finally(() => {
      it = null;
    }), it) : Promise.resolve();
  },
  async universalProviderAuthenticate({ universalProvider: t, chains: e, methods: n }) {
    var i, l, u;
    const r = Ue.getSIWX(), s = new Set(e.map((p) => p.split(":")[0]));
    if (!r || s.size !== 1 || !s.has("eip155"))
      return !1;
    const a = await r.createMessage({
      chainId: ((i = d.getActiveCaipNetwork()) == null ? void 0 : i.caipNetworkId) || "",
      accountAddress: ""
    }), o = await t.authenticate({
      nonce: a.nonce,
      domain: a.domain,
      uri: a.uri,
      exp: a.expirationTime,
      iat: a.issuedAt,
      nbf: a.notBefore,
      requestId: a.requestId,
      version: a.version,
      resources: a.resources,
      statement: a.statement,
      chainId: a.chainId,
      methods: n,
      // The first chainId is what is used for universal provider to build the message
      chains: [a.chainId, ...e.filter((p) => p !== a.chainId)]
    });
    if (He.showLoading("Authenticating...", { autoClose: !1 }), I.setConnectedWalletInfo({
      ...o.session.peer.metadata,
      name: o.session.peer.metadata.name,
      icon: (l = o.session.peer.metadata.icons) == null ? void 0 : l[0],
      type: "WALLET_CONNECT"
    }, Array.from(s)[0]), (u = o == null ? void 0 : o.auths) != null && u.length) {
      const p = o.auths.map((h) => {
        const R = t.client.formatAuthMessage({
          request: h.p,
          iss: h.p.iss
        });
        return {
          data: {
            ...h.p,
            accountAddress: h.p.iss.split(":").slice(-1).join(""),
            chainId: h.p.iss.split(":").slice(2, 4).join(":"),
            uri: h.p.aud,
            version: h.p.version || a.version,
            expirationTime: h.p.exp,
            issuedAt: h.p.iat,
            notBefore: h.p.nbf
          },
          message: R,
          signature: h.s.s,
          cacao: h
        };
      });
      try {
        await r.setSessions(p), ne.sendEvent({
          type: "track",
          event: "SIWX_AUTH_SUCCESS",
          properties: Ue.getSIWXEventProperties()
        });
      } catch (h) {
        throw console.error("SIWX:universalProviderAuth - failed to set sessions", h), ne.sendEvent({
          type: "track",
          event: "SIWX_AUTH_ERROR",
          properties: Ue.getSIWXEventProperties()
        }), await t.disconnect().catch(console.error), h;
      } finally {
        He.hide();
      }
    }
    return !0;
  },
  getSIWXEventProperties() {
    var e;
    const t = d.state.activeChain;
    if (!t)
      throw new Error("SIWXUtil:getSIWXEventProperties - namespace is required");
    return {
      network: ((e = d.state.activeCaipNetwork) == null ? void 0 : e.caipNetworkId) || "",
      isSmartAccount: Fe(t) === ue.ACCOUNT_TYPES.SMART_ACCOUNT
    };
  },
  async clearSessions() {
    const t = this.getSIWX();
    t && await t.setSessions([]);
  }
}, be = {
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
  EIP155: f.CHAIN.EVM,
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
}, Dt = {
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
    [f.CONNECTOR_ID.COINBASE]: "0c2840c3-5b04-4c44-9661-fbd4b49e1800",
    [f.CONNECTOR_ID.COINBASE_SDK]: "0c2840c3-5b04-4c44-9661-fbd4b49e1800",
    [f.CONNECTOR_ID.SAFE]: "461db637-8616-43ce-035a-d89b8a1d5800",
    [f.CONNECTOR_ID.LEDGER]: "54a1aa77-d202-4f8d-0fb2-5d2bb6db0300",
    [f.CONNECTOR_ID.WALLET_CONNECT]: "ef1a1fcf-7fe8-4d69-bd6d-fda1345b4400",
    [f.CONNECTOR_ID.INJECTED]: "07ba87ed-43aa-4adf-4540-9e6a2b9cae00"
  },
  ConnectorNamesMap: {
    [f.CONNECTOR_ID.INJECTED]: "Browser Wallet",
    [f.CONNECTOR_ID.WALLET_CONNECT]: "WalletConnect",
    [f.CONNECTOR_ID.COINBASE]: "Coinbase",
    [f.CONNECTOR_ID.COINBASE_SDK]: "Coinbase",
    [f.CONNECTOR_ID.LEDGER]: "Ledger",
    [f.CONNECTOR_ID.SAFE]: "Safe"
  }
}, we = {
  getCaipTokens(t) {
    if (!t)
      return;
    const e = {};
    return Object.entries(t).forEach(([n, r]) => {
      e[`${be.EIP155}:${n}`] = r;
    }), e;
  },
  isLowerCaseMatch(t, e) {
    return (t == null ? void 0 : t.toLowerCase()) === (e == null ? void 0 : e.toLowerCase());
  },
  getActiveNamespaceConnectedToAuth() {
    const t = d.state.activeChain;
    return f.AUTH_CONNECTOR_SUPPORTED_CHAINS.find((e) => w.getConnectorId(e) === f.CONNECTOR_ID.AUTH && e === t);
  },
  withRetry({ conditionFn: t, intervalMs: e, maxRetries: n }) {
    let r = 0;
    return new Promise((s) => {
      async function a() {
        return r += 1, await t() ? s(!0) : r >= n ? s(!1) : (setTimeout(a, e), null);
      }
      a();
    });
  }
}, Ds = new AbortController(), Ce = {
  EmbeddedWalletAbortController: Ds,
  UniversalProviderErrors: {
    UNAUTHORIZED_DOMAIN_NOT_ALLOWED: {
      message: "Unauthorized: origin not allowed",
      alertErrorKey: "ORIGIN_NOT_ALLOWED"
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
      longMessage: "Network not found. Please make sure it is included in 'networks' array in createAppKit function."
    },
    ORIGIN_NOT_ALLOWED: {
      shortMessage: "Origin Not Allowed",
      longMessage: () => `🔧 Origin ${Ms() ? window.origin : "unknown"} not found on allow list. Please update your project configurations on dashboard.reown.com.`
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
      shortMessage: "Unverified Domain",
      longMessage: () => "There was an issue loading the embedded wallet. Please verify that your domain is allowed at dashboard.reown.com."
    },
    JWT_TOKEN_NOT_VALID: {
      shortMessage: "Session Expired",
      longMessage: "Invalid session found on UniversalProvider. Please check your time settings and connect again."
    },
    INVALID_PROJECT_ID: {
      shortMessage: "Invalid Project ID",
      longMessage: "The project ID is invalid. Visit dashboard.reown.com to get a new one."
    },
    PROJECT_ID_NOT_CONFIGURED: {
      shortMessage: "Project ID Not Configured",
      longMessage: "Project ID Not Configured. Please update your project configurations on dashboard.reown.com."
    },
    SERVER_ERROR_APP_CONFIGURATION: {
      shortMessage: "Server Error",
      longMessage: (t) => `Failed to get App Configuration ${t || ""}`
    },
    RATE_LIMITED_APP_CONFIGURATION: {
      shortMessage: "Rate Limited",
      longMessage: "Rate limited when trying to get the App Configuration"
    }
  }
};
function Ms() {
  return typeof window < "u";
}
const Fs = {
  createLogger(t, e = "error") {
    const n = cr({
      level: e
    }), { logger: r } = lr({
      opts: n
    });
    return r.error = (...s) => {
      for (const a of s)
        if (a instanceof Error) {
          t(a, ...s);
          return;
        }
      t(void 0, ...s);
    }, r;
  }
}, Ws = "rpc.walletconnect.org";
function Qn(t, e) {
  const n = new URL("https://rpc.walletconnect.org/v1/");
  return n.searchParams.set("chainId", t), n.searchParams.set("projectId", e), n.toString();
}
const Rn = [
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
], gt = {
  extendRpcUrlWithProjectId(t, e) {
    let n = !1;
    try {
      n = new URL(t).host === Ws;
    } catch {
      n = !1;
    }
    if (n) {
      const r = new URL(t);
      return r.searchParams.has("projectId") || r.searchParams.set("projectId", e), r.toString();
    }
    return t;
  },
  isCaipNetwork(t) {
    return "chainNamespace" in t && "caipNetworkId" in t;
  },
  getChainNamespace(t) {
    return this.isCaipNetwork(t) ? t.chainNamespace : f.CHAIN.EVM;
  },
  getCaipNetworkId(t) {
    return this.isCaipNetwork(t) ? t.caipNetworkId : `${f.CHAIN.EVM}:${t.id}`;
  },
  getDefaultRpcUrl(t, e, n) {
    var s, a, o;
    const r = (o = (a = (s = t.rpcUrls) == null ? void 0 : s.default) == null ? void 0 : a.http) == null ? void 0 : o[0];
    return Rn.includes(e) ? Qn(e, n) : r || "";
  },
  extendCaipNetwork(t, { customNetworkImageUrls: e, projectId: n, customRpcUrls: r }) {
    var R, T, P, M, _, V, U;
    const s = this.getChainNamespace(t), a = this.getCaipNetworkId(t), o = (P = (T = (R = t.rpcUrls) == null ? void 0 : R.default) == null ? void 0 : T.http) == null ? void 0 : P[0], i = this.getDefaultRpcUrl(t, a, n), l = ((V = (_ = (M = t == null ? void 0 : t.rpcUrls) == null ? void 0 : M.chainDefault) == null ? void 0 : _.http) == null ? void 0 : V[0]) || o, u = ((U = r == null ? void 0 : r[a]) == null ? void 0 : U.map((ee) => ee.url)) || [], p = [...u, ...i ? [i] : []], h = [...u];
    return l && !h.includes(l) && h.push(l), {
      ...t,
      chainNamespace: s,
      caipNetworkId: a,
      assets: {
        imageId: Dt.NetworkImageIds[t.id],
        imageUrl: e == null ? void 0 : e[t.id]
      },
      rpcUrls: {
        ...t.rpcUrls,
        default: {
          http: p
        },
        chainDefault: {
          http: h
        }
      }
    };
  },
  extendCaipNetworks(t, { customNetworkImageUrls: e, projectId: n, customRpcUrls: r }) {
    return t.map((s) => gt.extendCaipNetwork(s, {
      customNetworkImageUrls: e,
      customRpcUrls: r,
      projectId: n
    }));
  },
  getViemTransport(t, e, n) {
    var s, a, o;
    const r = [];
    return n == null || n.forEach((i) => {
      r.push(Qt(i.url, i.config));
    }), Rn.includes(t.caipNetworkId) && r.push(Qt(Qn(t.caipNetworkId, e), {
      fetchOptions: {
        headers: {
          "Content-Type": "text/plain"
        }
      }
    })), (o = (a = (s = t == null ? void 0 : t.rpcUrls) == null ? void 0 : s.default) == null ? void 0 : a.http) == null || o.forEach((i) => {
      r.push(Qt(i));
    }), Vn(r);
  },
  extendWagmiTransports(t, e, n) {
    if (Rn.includes(t.caipNetworkId)) {
      const r = this.getDefaultRpcUrl(t, t.caipNetworkId, e);
      return Vn([n, Qt(r)]);
    }
    return n;
  },
  getUnsupportedNetwork(t) {
    return {
      id: t.split(":")[1],
      caipNetworkId: t,
      name: f.UNSUPPORTED_NETWORK_NAME,
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
    var l;
    const e = C.getActiveCaipNetworkId(), n = d.getAllRequestedCaipNetworks(), r = Array.from(((l = d.state.chains) == null ? void 0 : l.keys()) || []), s = e == null ? void 0 : e.split(":")[0], a = s ? r.includes(s) : !1, o = n == null ? void 0 : n.find((u) => u.caipNetworkId === e);
    return a && !o && e ? this.getUnsupportedNetwork(e) : o || t || (n == null ? void 0 : n[0]);
  }
}, un = {
  eip155: void 0,
  solana: void 0,
  polkadot: void 0,
  bip122: void 0,
  cosmos: void 0
}, Ne = ae({
  providers: { ...un },
  providerIds: { ...un }
}), se = {
  state: Ne,
  subscribeKey(t, e) {
    return ge(Ne, t, e);
  },
  subscribe(t) {
    return he(Ne, () => {
      t(Ne);
    });
  },
  subscribeProviders(t) {
    return he(Ne.providers, () => t(Ne.providers));
  },
  setProvider(t, e) {
    t && e && (Ne.providers[t] = dt(e));
  },
  getProvider(t) {
    if (t)
      return Ne.providers[t];
  },
  setProviderId(t, e) {
    e && (Ne.providerIds[t] = e);
  },
  getProviderId(t) {
    if (t)
      return Ne.providerIds[t];
  },
  reset() {
    Ne.providers = { ...un }, Ne.providerIds = { ...un };
  },
  resetChain(t) {
    Ne.providers[t] = void 0, Ne.providerIds[t] = void 0;
  }
}, Cr = {
  BLOCKCHAIN_API_RPC_URL: "https://rpc.walletconnect.org",
  SECURE_SITE_SDK_ORIGIN: (typeof process < "u" && typeof process.env < "u" ? process.env.NEXT_PUBLIC_SECURE_SITE_ORIGIN : void 0) || "https://secure.walletconnect.org"
}, Bs = {
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
    const [n, r, s] = e;
    if (!n || !r || !s)
      throw new Error(`Invalid CAIP-10 address: ${t}`);
    return {
      chainNamespace: n,
      chainId: r,
      address: s
    };
  },
  parseCaipNetworkId(t) {
    const e = t.split(":");
    if (e.length !== 2)
      throw new Error(`Invalid CAIP-2 network id: ${t}`);
    const [n, r] = e;
    if (!n || !r)
      throw new Error(`Invalid CAIP-2 network id: ${t}`);
    return {
      chainNamespace: n,
      chainId: r
    };
  }
}, er = {
  transactionHash: /^0x(?:[A-Fa-f0-9]{64})$/u,
  signedMessage: /^0x(?:[a-fA-F0-9]{62,})$/u
}, pe = {
  set(t, e) {
    Ie.isClient && localStorage.setItem(`${b.STORAGE_KEY}${t}`, e);
  },
  get(t) {
    return Ie.isClient ? localStorage.getItem(`${b.STORAGE_KEY}${t}`) : null;
  },
  delete(t, e) {
    Ie.isClient && (e ? localStorage.removeItem(t) : localStorage.removeItem(`${b.STORAGE_KEY}${t}`));
  }
}, nn = 30 * 1e3, Ie = {
  checkIfAllowedToTriggerEmail() {
    const t = pe.get(b.LAST_EMAIL_LOGIN_TIME);
    if (t) {
      const e = Date.now() - Number(t);
      if (e < nn) {
        const n = Math.ceil((nn - e) / 1e3);
        throw new Error(`Please try again after ${n} seconds`);
      }
    }
  },
  getTimeToNextEmailLogin() {
    const t = pe.get(b.LAST_EMAIL_LOGIN_TIME);
    if (t) {
      const e = Date.now() - Number(t);
      if (e < nn)
        return Math.ceil((nn - e) / 1e3);
    }
    return 0;
  },
  checkIfRequestExists(t) {
    return ue.NOT_SAFE_RPC_METHODS.includes(t.method) || ue.SAFE_RPC_METHODS.includes(t.method);
  },
  getResponseType(t) {
    return typeof t == "string" && ((t == null ? void 0 : t.match(er.transactionHash)) || (t == null ? void 0 : t.match(er.signedMessage))) ? b.RPC_RESPONSE_TYPE_TX : b.RPC_RESPONSE_TYPE_OBJECT;
  },
  checkIfRequestIsSafe(t) {
    return ue.SAFE_RPC_METHODS.includes(t.method);
  },
  isClient: typeof window < "u"
};
var X;
(function(t) {
  t.assertEqual = (s) => s;
  function e(s) {
  }
  t.assertIs = e;
  function n(s) {
    throw new Error();
  }
  t.assertNever = n, t.arrayToEnum = (s) => {
    const a = {};
    for (const o of s)
      a[o] = o;
    return a;
  }, t.getValidEnumValues = (s) => {
    const a = t.objectKeys(s).filter((i) => typeof s[s[i]] != "number"), o = {};
    for (const i of a)
      o[i] = s[i];
    return t.objectValues(o);
  }, t.objectValues = (s) => t.objectKeys(s).map(function(a) {
    return s[a];
  }), t.objectKeys = typeof Object.keys == "function" ? (s) => Object.keys(s) : (s) => {
    const a = [];
    for (const o in s)
      Object.prototype.hasOwnProperty.call(s, o) && a.push(o);
    return a;
  }, t.find = (s, a) => {
    for (const o of s)
      if (a(o))
        return o;
  }, t.isInteger = typeof Number.isInteger == "function" ? (s) => Number.isInteger(s) : (s) => typeof s == "number" && isFinite(s) && Math.floor(s) === s;
  function r(s, a = " | ") {
    return s.map((o) => typeof o == "string" ? `'${o}'` : o).join(a);
  }
  t.joinValues = r, t.jsonStringifyReplacer = (s, a) => typeof a == "bigint" ? a.toString() : a;
})(X || (X = {}));
var Fn;
(function(t) {
  t.mergeShapes = (e, n) => ({
    ...e,
    ...n
    // second overwrites first
  });
})(Fn || (Fn = {}));
const y = X.arrayToEnum([
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
]), Qe = (t) => {
  switch (typeof t) {
    case "undefined":
      return y.undefined;
    case "string":
      return y.string;
    case "number":
      return isNaN(t) ? y.nan : y.number;
    case "boolean":
      return y.boolean;
    case "function":
      return y.function;
    case "bigint":
      return y.bigint;
    case "symbol":
      return y.symbol;
    case "object":
      return Array.isArray(t) ? y.array : t === null ? y.null : t.then && typeof t.then == "function" && t.catch && typeof t.catch == "function" ? y.promise : typeof Map < "u" && t instanceof Map ? y.map : typeof Set < "u" && t instanceof Set ? y.set : typeof Date < "u" && t instanceof Date ? y.date : y.object;
    default:
      return y.unknown;
  }
}, g = X.arrayToEnum([
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
]), js = (t) => JSON.stringify(t, null, 2).replace(/"([^"]+)":/g, "$1:");
class De extends Error {
  constructor(e) {
    super(), this.issues = [], this.addIssue = (r) => {
      this.issues = [...this.issues, r];
    }, this.addIssues = (r = []) => {
      this.issues = [...this.issues, ...r];
    };
    const n = new.target.prototype;
    Object.setPrototypeOf ? Object.setPrototypeOf(this, n) : this.__proto__ = n, this.name = "ZodError", this.issues = e;
  }
  get errors() {
    return this.issues;
  }
  format(e) {
    const n = e || function(a) {
      return a.message;
    }, r = { _errors: [] }, s = (a) => {
      for (const o of a.issues)
        if (o.code === "invalid_union")
          o.unionErrors.map(s);
        else if (o.code === "invalid_return_type")
          s(o.returnTypeError);
        else if (o.code === "invalid_arguments")
          s(o.argumentsError);
        else if (o.path.length === 0)
          r._errors.push(n(o));
        else {
          let i = r, l = 0;
          for (; l < o.path.length; ) {
            const u = o.path[l];
            l === o.path.length - 1 ? (i[u] = i[u] || { _errors: [] }, i[u]._errors.push(n(o))) : i[u] = i[u] || { _errors: [] }, i = i[u], l++;
          }
        }
    };
    return s(this), r;
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, X.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(e = (n) => n.message) {
    const n = {}, r = [];
    for (const s of this.issues)
      s.path.length > 0 ? (n[s.path[0]] = n[s.path[0]] || [], n[s.path[0]].push(e(s))) : r.push(e(s));
    return { formErrors: r, fieldErrors: n };
  }
  get formErrors() {
    return this.flatten();
  }
}
De.create = (t) => new De(t);
const Mt = (t, e) => {
  let n;
  switch (t.code) {
    case g.invalid_type:
      t.received === y.undefined ? n = "Required" : n = `Expected ${t.expected}, received ${t.received}`;
      break;
    case g.invalid_literal:
      n = `Invalid literal value, expected ${JSON.stringify(t.expected, X.jsonStringifyReplacer)}`;
      break;
    case g.unrecognized_keys:
      n = `Unrecognized key(s) in object: ${X.joinValues(t.keys, ", ")}`;
      break;
    case g.invalid_union:
      n = "Invalid input";
      break;
    case g.invalid_union_discriminator:
      n = `Invalid discriminator value. Expected ${X.joinValues(t.options)}`;
      break;
    case g.invalid_enum_value:
      n = `Invalid enum value. Expected ${X.joinValues(t.options)}, received '${t.received}'`;
      break;
    case g.invalid_arguments:
      n = "Invalid function arguments";
      break;
    case g.invalid_return_type:
      n = "Invalid function return type";
      break;
    case g.invalid_date:
      n = "Invalid date";
      break;
    case g.invalid_string:
      typeof t.validation == "object" ? "includes" in t.validation ? (n = `Invalid input: must include "${t.validation.includes}"`, typeof t.validation.position == "number" && (n = `${n} at one or more positions greater than or equal to ${t.validation.position}`)) : "startsWith" in t.validation ? n = `Invalid input: must start with "${t.validation.startsWith}"` : "endsWith" in t.validation ? n = `Invalid input: must end with "${t.validation.endsWith}"` : X.assertNever(t.validation) : t.validation !== "regex" ? n = `Invalid ${t.validation}` : n = "Invalid";
      break;
    case g.too_small:
      t.type === "array" ? n = `Array must contain ${t.exact ? "exactly" : t.inclusive ? "at least" : "more than"} ${t.minimum} element(s)` : t.type === "string" ? n = `String must contain ${t.exact ? "exactly" : t.inclusive ? "at least" : "over"} ${t.minimum} character(s)` : t.type === "number" ? n = `Number must be ${t.exact ? "exactly equal to " : t.inclusive ? "greater than or equal to " : "greater than "}${t.minimum}` : t.type === "date" ? n = `Date must be ${t.exact ? "exactly equal to " : t.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(t.minimum))}` : n = "Invalid input";
      break;
    case g.too_big:
      t.type === "array" ? n = `Array must contain ${t.exact ? "exactly" : t.inclusive ? "at most" : "less than"} ${t.maximum} element(s)` : t.type === "string" ? n = `String must contain ${t.exact ? "exactly" : t.inclusive ? "at most" : "under"} ${t.maximum} character(s)` : t.type === "number" ? n = `Number must be ${t.exact ? "exactly" : t.inclusive ? "less than or equal to" : "less than"} ${t.maximum}` : t.type === "bigint" ? n = `BigInt must be ${t.exact ? "exactly" : t.inclusive ? "less than or equal to" : "less than"} ${t.maximum}` : t.type === "date" ? n = `Date must be ${t.exact ? "exactly" : t.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(t.maximum))}` : n = "Invalid input";
      break;
    case g.custom:
      n = "Invalid input";
      break;
    case g.invalid_intersection_types:
      n = "Intersection results could not be merged";
      break;
    case g.not_multiple_of:
      n = `Number must be a multiple of ${t.multipleOf}`;
      break;
    case g.not_finite:
      n = "Number must be finite";
      break;
    default:
      n = e.defaultError, X.assertNever(t);
  }
  return { message: n };
};
let wr = Mt;
function Hs(t) {
  wr = t;
}
function pn() {
  return wr;
}
const hn = (t) => {
  const { data: e, path: n, errorMaps: r, issueData: s } = t, a = [...n, ...s.path || []], o = {
    ...s,
    path: a
  };
  let i = "";
  const l = r.filter((u) => !!u).slice().reverse();
  for (const u of l)
    i = u(o, { data: e, defaultError: i }).message;
  return {
    ...s,
    path: a,
    message: s.message || i
  };
}, $s = [];
function S(t, e) {
  const n = hn({
    issueData: e,
    data: t.data,
    path: t.path,
    errorMaps: [
      t.common.contextualErrorMap,
      t.schemaErrorMap,
      pn(),
      Mt
      // then global default map
    ].filter((r) => !!r)
  });
  t.common.issues.push(n);
}
class me {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    this.value === "valid" && (this.value = "dirty");
  }
  abort() {
    this.value !== "aborted" && (this.value = "aborted");
  }
  static mergeArray(e, n) {
    const r = [];
    for (const s of n) {
      if (s.status === "aborted")
        return H;
      s.status === "dirty" && e.dirty(), r.push(s.value);
    }
    return { status: e.value, value: r };
  }
  static async mergeObjectAsync(e, n) {
    const r = [];
    for (const s of n)
      r.push({
        key: await s.key,
        value: await s.value
      });
    return me.mergeObjectSync(e, r);
  }
  static mergeObjectSync(e, n) {
    const r = {};
    for (const s of n) {
      const { key: a, value: o } = s;
      if (a.status === "aborted" || o.status === "aborted")
        return H;
      a.status === "dirty" && e.dirty(), o.status === "dirty" && e.dirty(), a.value !== "__proto__" && (typeof o.value < "u" || s.alwaysSet) && (r[a.value] = o.value);
    }
    return { status: e.value, value: r };
  }
}
const H = Object.freeze({
  status: "aborted"
}), Er = (t) => ({ status: "dirty", value: t }), Ee = (t) => ({ status: "valid", value: t }), Wn = (t) => t.status === "aborted", Bn = (t) => t.status === "dirty", Ft = (t) => t.status === "valid", fn = (t) => typeof Promise < "u" && t instanceof Promise;
var L;
(function(t) {
  t.errToObj = (e) => typeof e == "string" ? { message: e } : e || {}, t.toString = (e) => typeof e == "string" ? e : e == null ? void 0 : e.message;
})(L || (L = {}));
class Ge {
  constructor(e, n, r, s) {
    this._cachedPath = [], this.parent = e, this.data = n, this._path = r, this._key = s;
  }
  get path() {
    return this._cachedPath.length || (this._key instanceof Array ? this._cachedPath.push(...this._path, ...this._key) : this._cachedPath.push(...this._path, this._key)), this._cachedPath;
  }
}
const tr = (t, e) => {
  if (Ft(e))
    return { success: !0, data: e.value };
  if (!t.common.issues.length)
    throw new Error("Validation failed but no issues detected.");
  return {
    success: !1,
    get error() {
      if (this._error)
        return this._error;
      const n = new De(t.common.issues);
      return this._error = n, this._error;
    }
  };
};
function G(t) {
  if (!t)
    return {};
  const { errorMap: e, invalid_type_error: n, required_error: r, description: s } = t;
  if (e && (n || r))
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  return e ? { errorMap: e, description: s } : { errorMap: (o, i) => o.code !== "invalid_type" ? { message: i.defaultError } : typeof i.data > "u" ? { message: r ?? i.defaultError } : { message: n ?? i.defaultError }, description: s };
}
class q {
  constructor(e) {
    this.spa = this.safeParseAsync, this._def = e, this.parse = this.parse.bind(this), this.safeParse = this.safeParse.bind(this), this.parseAsync = this.parseAsync.bind(this), this.safeParseAsync = this.safeParseAsync.bind(this), this.spa = this.spa.bind(this), this.refine = this.refine.bind(this), this.refinement = this.refinement.bind(this), this.superRefine = this.superRefine.bind(this), this.optional = this.optional.bind(this), this.nullable = this.nullable.bind(this), this.nullish = this.nullish.bind(this), this.array = this.array.bind(this), this.promise = this.promise.bind(this), this.or = this.or.bind(this), this.and = this.and.bind(this), this.transform = this.transform.bind(this), this.brand = this.brand.bind(this), this.default = this.default.bind(this), this.catch = this.catch.bind(this), this.describe = this.describe.bind(this), this.pipe = this.pipe.bind(this), this.readonly = this.readonly.bind(this), this.isNullable = this.isNullable.bind(this), this.isOptional = this.isOptional.bind(this);
  }
  get description() {
    return this._def.description;
  }
  _getType(e) {
    return Qe(e.data);
  }
  _getOrReturnCtx(e, n) {
    return n || {
      common: e.parent.common,
      data: e.data,
      parsedType: Qe(e.data),
      schemaErrorMap: this._def.errorMap,
      path: e.path,
      parent: e.parent
    };
  }
  _processInputParams(e) {
    return {
      status: new me(),
      ctx: {
        common: e.parent.common,
        data: e.data,
        parsedType: Qe(e.data),
        schemaErrorMap: this._def.errorMap,
        path: e.path,
        parent: e.parent
      }
    };
  }
  _parseSync(e) {
    const n = this._parse(e);
    if (fn(n))
      throw new Error("Synchronous parse encountered promise.");
    return n;
  }
  _parseAsync(e) {
    const n = this._parse(e);
    return Promise.resolve(n);
  }
  parse(e, n) {
    const r = this.safeParse(e, n);
    if (r.success)
      return r.data;
    throw r.error;
  }
  safeParse(e, n) {
    var r;
    const s = {
      common: {
        issues: [],
        async: (r = n == null ? void 0 : n.async) !== null && r !== void 0 ? r : !1,
        contextualErrorMap: n == null ? void 0 : n.errorMap
      },
      path: (n == null ? void 0 : n.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: Qe(e)
    }, a = this._parseSync({ data: e, path: s.path, parent: s });
    return tr(s, a);
  }
  async parseAsync(e, n) {
    const r = await this.safeParseAsync(e, n);
    if (r.success)
      return r.data;
    throw r.error;
  }
  async safeParseAsync(e, n) {
    const r = {
      common: {
        issues: [],
        contextualErrorMap: n == null ? void 0 : n.errorMap,
        async: !0
      },
      path: (n == null ? void 0 : n.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: Qe(e)
    }, s = this._parse({ data: e, path: r.path, parent: r }), a = await (fn(s) ? s : Promise.resolve(s));
    return tr(r, a);
  }
  refine(e, n) {
    const r = (s) => typeof n == "string" || typeof n > "u" ? { message: n } : typeof n == "function" ? n(s) : n;
    return this._refinement((s, a) => {
      const o = e(s), i = () => a.addIssue({
        code: g.custom,
        ...r(s)
      });
      return typeof Promise < "u" && o instanceof Promise ? o.then((l) => l ? !0 : (i(), !1)) : o ? !0 : (i(), !1);
    });
  }
  refinement(e, n) {
    return this._refinement((r, s) => e(r) ? !0 : (s.addIssue(typeof n == "function" ? n(r, s) : n), !1));
  }
  _refinement(e) {
    return new We({
      schema: this,
      typeName: B.ZodEffects,
      effect: { type: "refinement", refinement: e }
    });
  }
  superRefine(e) {
    return this._refinement(e);
  }
  optional() {
    return Ye.create(this, this._def);
  }
  nullable() {
    return ht.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return Me.create(this, this._def);
  }
  promise() {
    return vt.create(this, this._def);
  }
  or(e) {
    return Ht.create([this, e], this._def);
  }
  and(e) {
    return $t.create(this, e, this._def);
  }
  transform(e) {
    return new We({
      ...G(this._def),
      schema: this,
      typeName: B.ZodEffects,
      effect: { type: "transform", transform: e }
    });
  }
  default(e) {
    const n = typeof e == "function" ? e : () => e;
    return new zt({
      ...G(this._def),
      innerType: this,
      defaultValue: n,
      typeName: B.ZodDefault
    });
  }
  brand() {
    return new Ar({
      typeName: B.ZodBranded,
      type: this,
      ...G(this._def)
    });
  }
  catch(e) {
    const n = typeof e == "function" ? e : () => e;
    return new wn({
      ...G(this._def),
      innerType: this,
      catchValue: n,
      typeName: B.ZodCatch
    });
  }
  describe(e) {
    const n = this.constructor;
    return new n({
      ...this._def,
      description: e
    });
  }
  pipe(e) {
    return Xt.create(this, e);
  }
  readonly() {
    return _n.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
const Gs = /^c[^\s-]{8,}$/i, Vs = /^[a-z][a-z0-9]*$/, qs = /^[0-9A-HJKMNP-TV-Z]{26}$/, Ks = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i, zs = /^(?!\.)(?!.*\.\.)([A-Z0-9_+-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i, Ys = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
let On;
const Zs = /^(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))$/, Xs = /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/, Js = (t) => t.precision ? t.offset ? new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${t.precision}}(([+-]\\d{2}(:?\\d{2})?)|Z)$`) : new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${t.precision}}Z$`) : t.precision === 0 ? t.offset ? new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(([+-]\\d{2}(:?\\d{2})?)|Z)$") : new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}Z$") : t.offset ? new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?(([+-]\\d{2}(:?\\d{2})?)|Z)$") : new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?Z$");
function Qs(t, e) {
  return !!((e === "v4" || !e) && Zs.test(t) || (e === "v6" || !e) && Xs.test(t));
}
class Le extends q {
  _parse(e) {
    if (this._def.coerce && (e.data = String(e.data)), this._getType(e) !== y.string) {
      const a = this._getOrReturnCtx(e);
      return S(
        a,
        {
          code: g.invalid_type,
          expected: y.string,
          received: a.parsedType
        }
        //
      ), H;
    }
    const r = new me();
    let s;
    for (const a of this._def.checks)
      if (a.kind === "min")
        e.data.length < a.value && (s = this._getOrReturnCtx(e, s), S(s, {
          code: g.too_small,
          minimum: a.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: a.message
        }), r.dirty());
      else if (a.kind === "max")
        e.data.length > a.value && (s = this._getOrReturnCtx(e, s), S(s, {
          code: g.too_big,
          maximum: a.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: a.message
        }), r.dirty());
      else if (a.kind === "length") {
        const o = e.data.length > a.value, i = e.data.length < a.value;
        (o || i) && (s = this._getOrReturnCtx(e, s), o ? S(s, {
          code: g.too_big,
          maximum: a.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: a.message
        }) : i && S(s, {
          code: g.too_small,
          minimum: a.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: a.message
        }), r.dirty());
      } else if (a.kind === "email")
        zs.test(e.data) || (s = this._getOrReturnCtx(e, s), S(s, {
          validation: "email",
          code: g.invalid_string,
          message: a.message
        }), r.dirty());
      else if (a.kind === "emoji")
        On || (On = new RegExp(Ys, "u")), On.test(e.data) || (s = this._getOrReturnCtx(e, s), S(s, {
          validation: "emoji",
          code: g.invalid_string,
          message: a.message
        }), r.dirty());
      else if (a.kind === "uuid")
        Ks.test(e.data) || (s = this._getOrReturnCtx(e, s), S(s, {
          validation: "uuid",
          code: g.invalid_string,
          message: a.message
        }), r.dirty());
      else if (a.kind === "cuid")
        Gs.test(e.data) || (s = this._getOrReturnCtx(e, s), S(s, {
          validation: "cuid",
          code: g.invalid_string,
          message: a.message
        }), r.dirty());
      else if (a.kind === "cuid2")
        Vs.test(e.data) || (s = this._getOrReturnCtx(e, s), S(s, {
          validation: "cuid2",
          code: g.invalid_string,
          message: a.message
        }), r.dirty());
      else if (a.kind === "ulid")
        qs.test(e.data) || (s = this._getOrReturnCtx(e, s), S(s, {
          validation: "ulid",
          code: g.invalid_string,
          message: a.message
        }), r.dirty());
      else if (a.kind === "url")
        try {
          new URL(e.data);
        } catch {
          s = this._getOrReturnCtx(e, s), S(s, {
            validation: "url",
            code: g.invalid_string,
            message: a.message
          }), r.dirty();
        }
      else a.kind === "regex" ? (a.regex.lastIndex = 0, a.regex.test(e.data) || (s = this._getOrReturnCtx(e, s), S(s, {
        validation: "regex",
        code: g.invalid_string,
        message: a.message
      }), r.dirty())) : a.kind === "trim" ? e.data = e.data.trim() : a.kind === "includes" ? e.data.includes(a.value, a.position) || (s = this._getOrReturnCtx(e, s), S(s, {
        code: g.invalid_string,
        validation: { includes: a.value, position: a.position },
        message: a.message
      }), r.dirty()) : a.kind === "toLowerCase" ? e.data = e.data.toLowerCase() : a.kind === "toUpperCase" ? e.data = e.data.toUpperCase() : a.kind === "startsWith" ? e.data.startsWith(a.value) || (s = this._getOrReturnCtx(e, s), S(s, {
        code: g.invalid_string,
        validation: { startsWith: a.value },
        message: a.message
      }), r.dirty()) : a.kind === "endsWith" ? e.data.endsWith(a.value) || (s = this._getOrReturnCtx(e, s), S(s, {
        code: g.invalid_string,
        validation: { endsWith: a.value },
        message: a.message
      }), r.dirty()) : a.kind === "datetime" ? Js(a).test(e.data) || (s = this._getOrReturnCtx(e, s), S(s, {
        code: g.invalid_string,
        validation: "datetime",
        message: a.message
      }), r.dirty()) : a.kind === "ip" ? Qs(e.data, a.version) || (s = this._getOrReturnCtx(e, s), S(s, {
        validation: "ip",
        code: g.invalid_string,
        message: a.message
      }), r.dirty()) : X.assertNever(a);
    return { status: r.value, value: e.data };
  }
  _regex(e, n, r) {
    return this.refinement((s) => e.test(s), {
      validation: n,
      code: g.invalid_string,
      ...L.errToObj(r)
    });
  }
  _addCheck(e) {
    return new Le({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  email(e) {
    return this._addCheck({ kind: "email", ...L.errToObj(e) });
  }
  url(e) {
    return this._addCheck({ kind: "url", ...L.errToObj(e) });
  }
  emoji(e) {
    return this._addCheck({ kind: "emoji", ...L.errToObj(e) });
  }
  uuid(e) {
    return this._addCheck({ kind: "uuid", ...L.errToObj(e) });
  }
  cuid(e) {
    return this._addCheck({ kind: "cuid", ...L.errToObj(e) });
  }
  cuid2(e) {
    return this._addCheck({ kind: "cuid2", ...L.errToObj(e) });
  }
  ulid(e) {
    return this._addCheck({ kind: "ulid", ...L.errToObj(e) });
  }
  ip(e) {
    return this._addCheck({ kind: "ip", ...L.errToObj(e) });
  }
  datetime(e) {
    var n;
    return typeof e == "string" ? this._addCheck({
      kind: "datetime",
      precision: null,
      offset: !1,
      message: e
    }) : this._addCheck({
      kind: "datetime",
      precision: typeof (e == null ? void 0 : e.precision) > "u" ? null : e == null ? void 0 : e.precision,
      offset: (n = e == null ? void 0 : e.offset) !== null && n !== void 0 ? n : !1,
      ...L.errToObj(e == null ? void 0 : e.message)
    });
  }
  regex(e, n) {
    return this._addCheck({
      kind: "regex",
      regex: e,
      ...L.errToObj(n)
    });
  }
  includes(e, n) {
    return this._addCheck({
      kind: "includes",
      value: e,
      position: n == null ? void 0 : n.position,
      ...L.errToObj(n == null ? void 0 : n.message)
    });
  }
  startsWith(e, n) {
    return this._addCheck({
      kind: "startsWith",
      value: e,
      ...L.errToObj(n)
    });
  }
  endsWith(e, n) {
    return this._addCheck({
      kind: "endsWith",
      value: e,
      ...L.errToObj(n)
    });
  }
  min(e, n) {
    return this._addCheck({
      kind: "min",
      value: e,
      ...L.errToObj(n)
    });
  }
  max(e, n) {
    return this._addCheck({
      kind: "max",
      value: e,
      ...L.errToObj(n)
    });
  }
  length(e, n) {
    return this._addCheck({
      kind: "length",
      value: e,
      ...L.errToObj(n)
    });
  }
  /**
   * @deprecated Use z.string().min(1) instead.
   * @see {@link ZodString.min}
   */
  nonempty(e) {
    return this.min(1, L.errToObj(e));
  }
  trim() {
    return new Le({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new Le({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new Le({
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
    for (const n of this._def.checks)
      n.kind === "min" && (e === null || n.value > e) && (e = n.value);
    return e;
  }
  get maxLength() {
    let e = null;
    for (const n of this._def.checks)
      n.kind === "max" && (e === null || n.value < e) && (e = n.value);
    return e;
  }
}
Le.create = (t) => {
  var e;
  return new Le({
    checks: [],
    typeName: B.ZodString,
    coerce: (e = t == null ? void 0 : t.coerce) !== null && e !== void 0 ? e : !1,
    ...G(t)
  });
};
function ea(t, e) {
  const n = (t.toString().split(".")[1] || "").length, r = (e.toString().split(".")[1] || "").length, s = n > r ? n : r, a = parseInt(t.toFixed(s).replace(".", "")), o = parseInt(e.toFixed(s).replace(".", ""));
  return a % o / Math.pow(10, s);
}
class rt extends q {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
  }
  _parse(e) {
    if (this._def.coerce && (e.data = Number(e.data)), this._getType(e) !== y.number) {
      const a = this._getOrReturnCtx(e);
      return S(a, {
        code: g.invalid_type,
        expected: y.number,
        received: a.parsedType
      }), H;
    }
    let r;
    const s = new me();
    for (const a of this._def.checks)
      a.kind === "int" ? X.isInteger(e.data) || (r = this._getOrReturnCtx(e, r), S(r, {
        code: g.invalid_type,
        expected: "integer",
        received: "float",
        message: a.message
      }), s.dirty()) : a.kind === "min" ? (a.inclusive ? e.data < a.value : e.data <= a.value) && (r = this._getOrReturnCtx(e, r), S(r, {
        code: g.too_small,
        minimum: a.value,
        type: "number",
        inclusive: a.inclusive,
        exact: !1,
        message: a.message
      }), s.dirty()) : a.kind === "max" ? (a.inclusive ? e.data > a.value : e.data >= a.value) && (r = this._getOrReturnCtx(e, r), S(r, {
        code: g.too_big,
        maximum: a.value,
        type: "number",
        inclusive: a.inclusive,
        exact: !1,
        message: a.message
      }), s.dirty()) : a.kind === "multipleOf" ? ea(e.data, a.value) !== 0 && (r = this._getOrReturnCtx(e, r), S(r, {
        code: g.not_multiple_of,
        multipleOf: a.value,
        message: a.message
      }), s.dirty()) : a.kind === "finite" ? Number.isFinite(e.data) || (r = this._getOrReturnCtx(e, r), S(r, {
        code: g.not_finite,
        message: a.message
      }), s.dirty()) : X.assertNever(a);
    return { status: s.value, value: e.data };
  }
  gte(e, n) {
    return this.setLimit("min", e, !0, L.toString(n));
  }
  gt(e, n) {
    return this.setLimit("min", e, !1, L.toString(n));
  }
  lte(e, n) {
    return this.setLimit("max", e, !0, L.toString(n));
  }
  lt(e, n) {
    return this.setLimit("max", e, !1, L.toString(n));
  }
  setLimit(e, n, r, s) {
    return new rt({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: e,
          value: n,
          inclusive: r,
          message: L.toString(s)
        }
      ]
    });
  }
  _addCheck(e) {
    return new rt({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  int(e) {
    return this._addCheck({
      kind: "int",
      message: L.toString(e)
    });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !1,
      message: L.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !1,
      message: L.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !0,
      message: L.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !0,
      message: L.toString(e)
    });
  }
  multipleOf(e, n) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: L.toString(n)
    });
  }
  finite(e) {
    return this._addCheck({
      kind: "finite",
      message: L.toString(e)
    });
  }
  safe(e) {
    return this._addCheck({
      kind: "min",
      inclusive: !0,
      value: Number.MIN_SAFE_INTEGER,
      message: L.toString(e)
    })._addCheck({
      kind: "max",
      inclusive: !0,
      value: Number.MAX_SAFE_INTEGER,
      message: L.toString(e)
    });
  }
  get minValue() {
    let e = null;
    for (const n of this._def.checks)
      n.kind === "min" && (e === null || n.value > e) && (e = n.value);
    return e;
  }
  get maxValue() {
    let e = null;
    for (const n of this._def.checks)
      n.kind === "max" && (e === null || n.value < e) && (e = n.value);
    return e;
  }
  get isInt() {
    return !!this._def.checks.find((e) => e.kind === "int" || e.kind === "multipleOf" && X.isInteger(e.value));
  }
  get isFinite() {
    let e = null, n = null;
    for (const r of this._def.checks) {
      if (r.kind === "finite" || r.kind === "int" || r.kind === "multipleOf")
        return !0;
      r.kind === "min" ? (n === null || r.value > n) && (n = r.value) : r.kind === "max" && (e === null || r.value < e) && (e = r.value);
    }
    return Number.isFinite(n) && Number.isFinite(e);
  }
}
rt.create = (t) => new rt({
  checks: [],
  typeName: B.ZodNumber,
  coerce: (t == null ? void 0 : t.coerce) || !1,
  ...G(t)
});
class st extends q {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte;
  }
  _parse(e) {
    if (this._def.coerce && (e.data = BigInt(e.data)), this._getType(e) !== y.bigint) {
      const a = this._getOrReturnCtx(e);
      return S(a, {
        code: g.invalid_type,
        expected: y.bigint,
        received: a.parsedType
      }), H;
    }
    let r;
    const s = new me();
    for (const a of this._def.checks)
      a.kind === "min" ? (a.inclusive ? e.data < a.value : e.data <= a.value) && (r = this._getOrReturnCtx(e, r), S(r, {
        code: g.too_small,
        type: "bigint",
        minimum: a.value,
        inclusive: a.inclusive,
        message: a.message
      }), s.dirty()) : a.kind === "max" ? (a.inclusive ? e.data > a.value : e.data >= a.value) && (r = this._getOrReturnCtx(e, r), S(r, {
        code: g.too_big,
        type: "bigint",
        maximum: a.value,
        inclusive: a.inclusive,
        message: a.message
      }), s.dirty()) : a.kind === "multipleOf" ? e.data % a.value !== BigInt(0) && (r = this._getOrReturnCtx(e, r), S(r, {
        code: g.not_multiple_of,
        multipleOf: a.value,
        message: a.message
      }), s.dirty()) : X.assertNever(a);
    return { status: s.value, value: e.data };
  }
  gte(e, n) {
    return this.setLimit("min", e, !0, L.toString(n));
  }
  gt(e, n) {
    return this.setLimit("min", e, !1, L.toString(n));
  }
  lte(e, n) {
    return this.setLimit("max", e, !0, L.toString(n));
  }
  lt(e, n) {
    return this.setLimit("max", e, !1, L.toString(n));
  }
  setLimit(e, n, r, s) {
    return new st({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: e,
          value: n,
          inclusive: r,
          message: L.toString(s)
        }
      ]
    });
  }
  _addCheck(e) {
    return new st({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !1,
      message: L.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !1,
      message: L.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !0,
      message: L.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !0,
      message: L.toString(e)
    });
  }
  multipleOf(e, n) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: L.toString(n)
    });
  }
  get minValue() {
    let e = null;
    for (const n of this._def.checks)
      n.kind === "min" && (e === null || n.value > e) && (e = n.value);
    return e;
  }
  get maxValue() {
    let e = null;
    for (const n of this._def.checks)
      n.kind === "max" && (e === null || n.value < e) && (e = n.value);
    return e;
  }
}
st.create = (t) => {
  var e;
  return new st({
    checks: [],
    typeName: B.ZodBigInt,
    coerce: (e = t == null ? void 0 : t.coerce) !== null && e !== void 0 ? e : !1,
    ...G(t)
  });
};
class Wt extends q {
  _parse(e) {
    if (this._def.coerce && (e.data = !!e.data), this._getType(e) !== y.boolean) {
      const r = this._getOrReturnCtx(e);
      return S(r, {
        code: g.invalid_type,
        expected: y.boolean,
        received: r.parsedType
      }), H;
    }
    return Ee(e.data);
  }
}
Wt.create = (t) => new Wt({
  typeName: B.ZodBoolean,
  coerce: (t == null ? void 0 : t.coerce) || !1,
  ...G(t)
});
class ut extends q {
  _parse(e) {
    if (this._def.coerce && (e.data = new Date(e.data)), this._getType(e) !== y.date) {
      const a = this._getOrReturnCtx(e);
      return S(a, {
        code: g.invalid_type,
        expected: y.date,
        received: a.parsedType
      }), H;
    }
    if (isNaN(e.data.getTime())) {
      const a = this._getOrReturnCtx(e);
      return S(a, {
        code: g.invalid_date
      }), H;
    }
    const r = new me();
    let s;
    for (const a of this._def.checks)
      a.kind === "min" ? e.data.getTime() < a.value && (s = this._getOrReturnCtx(e, s), S(s, {
        code: g.too_small,
        message: a.message,
        inclusive: !0,
        exact: !1,
        minimum: a.value,
        type: "date"
      }), r.dirty()) : a.kind === "max" ? e.data.getTime() > a.value && (s = this._getOrReturnCtx(e, s), S(s, {
        code: g.too_big,
        message: a.message,
        inclusive: !0,
        exact: !1,
        maximum: a.value,
        type: "date"
      }), r.dirty()) : X.assertNever(a);
    return {
      status: r.value,
      value: new Date(e.data.getTime())
    };
  }
  _addCheck(e) {
    return new ut({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  min(e, n) {
    return this._addCheck({
      kind: "min",
      value: e.getTime(),
      message: L.toString(n)
    });
  }
  max(e, n) {
    return this._addCheck({
      kind: "max",
      value: e.getTime(),
      message: L.toString(n)
    });
  }
  get minDate() {
    let e = null;
    for (const n of this._def.checks)
      n.kind === "min" && (e === null || n.value > e) && (e = n.value);
    return e != null ? new Date(e) : null;
  }
  get maxDate() {
    let e = null;
    for (const n of this._def.checks)
      n.kind === "max" && (e === null || n.value < e) && (e = n.value);
    return e != null ? new Date(e) : null;
  }
}
ut.create = (t) => new ut({
  checks: [],
  coerce: (t == null ? void 0 : t.coerce) || !1,
  typeName: B.ZodDate,
  ...G(t)
});
class mn extends q {
  _parse(e) {
    if (this._getType(e) !== y.symbol) {
      const r = this._getOrReturnCtx(e);
      return S(r, {
        code: g.invalid_type,
        expected: y.symbol,
        received: r.parsedType
      }), H;
    }
    return Ee(e.data);
  }
}
mn.create = (t) => new mn({
  typeName: B.ZodSymbol,
  ...G(t)
});
class Bt extends q {
  _parse(e) {
    if (this._getType(e) !== y.undefined) {
      const r = this._getOrReturnCtx(e);
      return S(r, {
        code: g.invalid_type,
        expected: y.undefined,
        received: r.parsedType
      }), H;
    }
    return Ee(e.data);
  }
}
Bt.create = (t) => new Bt({
  typeName: B.ZodUndefined,
  ...G(t)
});
class jt extends q {
  _parse(e) {
    if (this._getType(e) !== y.null) {
      const r = this._getOrReturnCtx(e);
      return S(r, {
        code: g.invalid_type,
        expected: y.null,
        received: r.parsedType
      }), H;
    }
    return Ee(e.data);
  }
}
jt.create = (t) => new jt({
  typeName: B.ZodNull,
  ...G(t)
});
class Nt extends q {
  constructor() {
    super(...arguments), this._any = !0;
  }
  _parse(e) {
    return Ee(e.data);
  }
}
Nt.create = (t) => new Nt({
  typeName: B.ZodAny,
  ...G(t)
});
class lt extends q {
  constructor() {
    super(...arguments), this._unknown = !0;
  }
  _parse(e) {
    return Ee(e.data);
  }
}
lt.create = (t) => new lt({
  typeName: B.ZodUnknown,
  ...G(t)
});
class Ze extends q {
  _parse(e) {
    const n = this._getOrReturnCtx(e);
    return S(n, {
      code: g.invalid_type,
      expected: y.never,
      received: n.parsedType
    }), H;
  }
}
Ze.create = (t) => new Ze({
  typeName: B.ZodNever,
  ...G(t)
});
class gn extends q {
  _parse(e) {
    if (this._getType(e) !== y.undefined) {
      const r = this._getOrReturnCtx(e);
      return S(r, {
        code: g.invalid_type,
        expected: y.void,
        received: r.parsedType
      }), H;
    }
    return Ee(e.data);
  }
}
gn.create = (t) => new gn({
  typeName: B.ZodVoid,
  ...G(t)
});
class Me extends q {
  _parse(e) {
    const { ctx: n, status: r } = this._processInputParams(e), s = this._def;
    if (n.parsedType !== y.array)
      return S(n, {
        code: g.invalid_type,
        expected: y.array,
        received: n.parsedType
      }), H;
    if (s.exactLength !== null) {
      const o = n.data.length > s.exactLength.value, i = n.data.length < s.exactLength.value;
      (o || i) && (S(n, {
        code: o ? g.too_big : g.too_small,
        minimum: i ? s.exactLength.value : void 0,
        maximum: o ? s.exactLength.value : void 0,
        type: "array",
        inclusive: !0,
        exact: !0,
        message: s.exactLength.message
      }), r.dirty());
    }
    if (s.minLength !== null && n.data.length < s.minLength.value && (S(n, {
      code: g.too_small,
      minimum: s.minLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: s.minLength.message
    }), r.dirty()), s.maxLength !== null && n.data.length > s.maxLength.value && (S(n, {
      code: g.too_big,
      maximum: s.maxLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: s.maxLength.message
    }), r.dirty()), n.common.async)
      return Promise.all([...n.data].map((o, i) => s.type._parseAsync(new Ge(n, o, n.path, i)))).then((o) => me.mergeArray(r, o));
    const a = [...n.data].map((o, i) => s.type._parseSync(new Ge(n, o, n.path, i)));
    return me.mergeArray(r, a);
  }
  get element() {
    return this._def.type;
  }
  min(e, n) {
    return new Me({
      ...this._def,
      minLength: { value: e, message: L.toString(n) }
    });
  }
  max(e, n) {
    return new Me({
      ...this._def,
      maxLength: { value: e, message: L.toString(n) }
    });
  }
  length(e, n) {
    return new Me({
      ...this._def,
      exactLength: { value: e, message: L.toString(n) }
    });
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
Me.create = (t, e) => new Me({
  type: t,
  minLength: null,
  maxLength: null,
  exactLength: null,
  typeName: B.ZodArray,
  ...G(e)
});
function Ct(t) {
  if (t instanceof ie) {
    const e = {};
    for (const n in t.shape) {
      const r = t.shape[n];
      e[n] = Ye.create(Ct(r));
    }
    return new ie({
      ...t._def,
      shape: () => e
    });
  } else return t instanceof Me ? new Me({
    ...t._def,
    type: Ct(t.element)
  }) : t instanceof Ye ? Ye.create(Ct(t.unwrap())) : t instanceof ht ? ht.create(Ct(t.unwrap())) : t instanceof Ve ? Ve.create(t.items.map((e) => Ct(e))) : t;
}
class ie extends q {
  constructor() {
    super(...arguments), this._cached = null, this.nonstrict = this.passthrough, this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const e = this._def.shape(), n = X.objectKeys(e);
    return this._cached = { shape: e, keys: n };
  }
  _parse(e) {
    if (this._getType(e) !== y.object) {
      const u = this._getOrReturnCtx(e);
      return S(u, {
        code: g.invalid_type,
        expected: y.object,
        received: u.parsedType
      }), H;
    }
    const { status: r, ctx: s } = this._processInputParams(e), { shape: a, keys: o } = this._getCached(), i = [];
    if (!(this._def.catchall instanceof Ze && this._def.unknownKeys === "strip"))
      for (const u in s.data)
        o.includes(u) || i.push(u);
    const l = [];
    for (const u of o) {
      const p = a[u], h = s.data[u];
      l.push({
        key: { status: "valid", value: u },
        value: p._parse(new Ge(s, h, s.path, u)),
        alwaysSet: u in s.data
      });
    }
    if (this._def.catchall instanceof Ze) {
      const u = this._def.unknownKeys;
      if (u === "passthrough")
        for (const p of i)
          l.push({
            key: { status: "valid", value: p },
            value: { status: "valid", value: s.data[p] }
          });
      else if (u === "strict")
        i.length > 0 && (S(s, {
          code: g.unrecognized_keys,
          keys: i
        }), r.dirty());
      else if (u !== "strip") throw new Error("Internal ZodObject error: invalid unknownKeys value.");
    } else {
      const u = this._def.catchall;
      for (const p of i) {
        const h = s.data[p];
        l.push({
          key: { status: "valid", value: p },
          value: u._parse(
            new Ge(s, h, s.path, p)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: p in s.data
        });
      }
    }
    return s.common.async ? Promise.resolve().then(async () => {
      const u = [];
      for (const p of l) {
        const h = await p.key;
        u.push({
          key: h,
          value: await p.value,
          alwaysSet: p.alwaysSet
        });
      }
      return u;
    }).then((u) => me.mergeObjectSync(r, u)) : me.mergeObjectSync(r, l);
  }
  get shape() {
    return this._def.shape();
  }
  strict(e) {
    return L.errToObj, new ie({
      ...this._def,
      unknownKeys: "strict",
      ...e !== void 0 ? {
        errorMap: (n, r) => {
          var s, a, o, i;
          const l = (o = (a = (s = this._def).errorMap) === null || a === void 0 ? void 0 : a.call(s, n, r).message) !== null && o !== void 0 ? o : r.defaultError;
          return n.code === "unrecognized_keys" ? {
            message: (i = L.errToObj(e).message) !== null && i !== void 0 ? i : l
          } : {
            message: l
          };
        }
      } : {}
    });
  }
  strip() {
    return new ie({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new ie({
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
    return new ie({
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
    return new ie({
      unknownKeys: e._def.unknownKeys,
      catchall: e._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...e._def.shape()
      }),
      typeName: B.ZodObject
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
  setKey(e, n) {
    return this.augment({ [e]: n });
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
    return new ie({
      ...this._def,
      catchall: e
    });
  }
  pick(e) {
    const n = {};
    return X.objectKeys(e).forEach((r) => {
      e[r] && this.shape[r] && (n[r] = this.shape[r]);
    }), new ie({
      ...this._def,
      shape: () => n
    });
  }
  omit(e) {
    const n = {};
    return X.objectKeys(this.shape).forEach((r) => {
      e[r] || (n[r] = this.shape[r]);
    }), new ie({
      ...this._def,
      shape: () => n
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return Ct(this);
  }
  partial(e) {
    const n = {};
    return X.objectKeys(this.shape).forEach((r) => {
      const s = this.shape[r];
      e && !e[r] ? n[r] = s : n[r] = s.optional();
    }), new ie({
      ...this._def,
      shape: () => n
    });
  }
  required(e) {
    const n = {};
    return X.objectKeys(this.shape).forEach((r) => {
      if (e && !e[r])
        n[r] = this.shape[r];
      else {
        let a = this.shape[r];
        for (; a instanceof Ye; )
          a = a._def.innerType;
        n[r] = a;
      }
    }), new ie({
      ...this._def,
      shape: () => n
    });
  }
  keyof() {
    return _r(X.objectKeys(this.shape));
  }
}
ie.create = (t, e) => new ie({
  shape: () => t,
  unknownKeys: "strip",
  catchall: Ze.create(),
  typeName: B.ZodObject,
  ...G(e)
});
ie.strictCreate = (t, e) => new ie({
  shape: () => t,
  unknownKeys: "strict",
  catchall: Ze.create(),
  typeName: B.ZodObject,
  ...G(e)
});
ie.lazycreate = (t, e) => new ie({
  shape: t,
  unknownKeys: "strip",
  catchall: Ze.create(),
  typeName: B.ZodObject,
  ...G(e)
});
class Ht extends q {
  _parse(e) {
    const { ctx: n } = this._processInputParams(e), r = this._def.options;
    function s(a) {
      for (const i of a)
        if (i.result.status === "valid")
          return i.result;
      for (const i of a)
        if (i.result.status === "dirty")
          return n.common.issues.push(...i.ctx.common.issues), i.result;
      const o = a.map((i) => new De(i.ctx.common.issues));
      return S(n, {
        code: g.invalid_union,
        unionErrors: o
      }), H;
    }
    if (n.common.async)
      return Promise.all(r.map(async (a) => {
        const o = {
          ...n,
          common: {
            ...n.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await a._parseAsync({
            data: n.data,
            path: n.path,
            parent: o
          }),
          ctx: o
        };
      })).then(s);
    {
      let a;
      const o = [];
      for (const l of r) {
        const u = {
          ...n,
          common: {
            ...n.common,
            issues: []
          },
          parent: null
        }, p = l._parseSync({
          data: n.data,
          path: n.path,
          parent: u
        });
        if (p.status === "valid")
          return p;
        p.status === "dirty" && !a && (a = { result: p, ctx: u }), u.common.issues.length && o.push(u.common.issues);
      }
      if (a)
        return n.common.issues.push(...a.ctx.common.issues), a.result;
      const i = o.map((l) => new De(l));
      return S(n, {
        code: g.invalid_union,
        unionErrors: i
      }), H;
    }
  }
  get options() {
    return this._def.options;
  }
}
Ht.create = (t, e) => new Ht({
  options: t,
  typeName: B.ZodUnion,
  ...G(e)
});
const an = (t) => t instanceof Vt ? an(t.schema) : t instanceof We ? an(t.innerType()) : t instanceof qt ? [t.value] : t instanceof at ? t.options : t instanceof Kt ? Object.keys(t.enum) : t instanceof zt ? an(t._def.innerType) : t instanceof Bt ? [void 0] : t instanceof jt ? [null] : null;
class An extends q {
  _parse(e) {
    const { ctx: n } = this._processInputParams(e);
    if (n.parsedType !== y.object)
      return S(n, {
        code: g.invalid_type,
        expected: y.object,
        received: n.parsedType
      }), H;
    const r = this.discriminator, s = n.data[r], a = this.optionsMap.get(s);
    return a ? n.common.async ? a._parseAsync({
      data: n.data,
      path: n.path,
      parent: n
    }) : a._parseSync({
      data: n.data,
      path: n.path,
      parent: n
    }) : (S(n, {
      code: g.invalid_union_discriminator,
      options: Array.from(this.optionsMap.keys()),
      path: [r]
    }), H);
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
  static create(e, n, r) {
    const s = /* @__PURE__ */ new Map();
    for (const a of n) {
      const o = an(a.shape[e]);
      if (!o)
        throw new Error(`A discriminator value for key \`${e}\` could not be extracted from all schema options`);
      for (const i of o) {
        if (s.has(i))
          throw new Error(`Discriminator property ${String(e)} has duplicate value ${String(i)}`);
        s.set(i, a);
      }
    }
    return new An({
      typeName: B.ZodDiscriminatedUnion,
      discriminator: e,
      options: n,
      optionsMap: s,
      ...G(r)
    });
  }
}
function jn(t, e) {
  const n = Qe(t), r = Qe(e);
  if (t === e)
    return { valid: !0, data: t };
  if (n === y.object && r === y.object) {
    const s = X.objectKeys(e), a = X.objectKeys(t).filter((i) => s.indexOf(i) !== -1), o = { ...t, ...e };
    for (const i of a) {
      const l = jn(t[i], e[i]);
      if (!l.valid)
        return { valid: !1 };
      o[i] = l.data;
    }
    return { valid: !0, data: o };
  } else if (n === y.array && r === y.array) {
    if (t.length !== e.length)
      return { valid: !1 };
    const s = [];
    for (let a = 0; a < t.length; a++) {
      const o = t[a], i = e[a], l = jn(o, i);
      if (!l.valid)
        return { valid: !1 };
      s.push(l.data);
    }
    return { valid: !0, data: s };
  } else return n === y.date && r === y.date && +t == +e ? { valid: !0, data: t } : { valid: !1 };
}
class $t extends q {
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e), s = (a, o) => {
      if (Wn(a) || Wn(o))
        return H;
      const i = jn(a.value, o.value);
      return i.valid ? ((Bn(a) || Bn(o)) && n.dirty(), { status: n.value, value: i.data }) : (S(r, {
        code: g.invalid_intersection_types
      }), H);
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
    ]).then(([a, o]) => s(a, o)) : s(this._def.left._parseSync({
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
$t.create = (t, e, n) => new $t({
  left: t,
  right: e,
  typeName: B.ZodIntersection,
  ...G(n)
});
class Ve extends q {
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== y.array)
      return S(r, {
        code: g.invalid_type,
        expected: y.array,
        received: r.parsedType
      }), H;
    if (r.data.length < this._def.items.length)
      return S(r, {
        code: g.too_small,
        minimum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: "array"
      }), H;
    !this._def.rest && r.data.length > this._def.items.length && (S(r, {
      code: g.too_big,
      maximum: this._def.items.length,
      inclusive: !0,
      exact: !1,
      type: "array"
    }), n.dirty());
    const a = [...r.data].map((o, i) => {
      const l = this._def.items[i] || this._def.rest;
      return l ? l._parse(new Ge(r, o, r.path, i)) : null;
    }).filter((o) => !!o);
    return r.common.async ? Promise.all(a).then((o) => me.mergeArray(n, o)) : me.mergeArray(n, a);
  }
  get items() {
    return this._def.items;
  }
  rest(e) {
    return new Ve({
      ...this._def,
      rest: e
    });
  }
}
Ve.create = (t, e) => {
  if (!Array.isArray(t))
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  return new Ve({
    items: t,
    typeName: B.ZodTuple,
    rest: null,
    ...G(e)
  });
};
class Gt extends q {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== y.object)
      return S(r, {
        code: g.invalid_type,
        expected: y.object,
        received: r.parsedType
      }), H;
    const s = [], a = this._def.keyType, o = this._def.valueType;
    for (const i in r.data)
      s.push({
        key: a._parse(new Ge(r, i, r.path, i)),
        value: o._parse(new Ge(r, r.data[i], r.path, i))
      });
    return r.common.async ? me.mergeObjectAsync(n, s) : me.mergeObjectSync(n, s);
  }
  get element() {
    return this._def.valueType;
  }
  static create(e, n, r) {
    return n instanceof q ? new Gt({
      keyType: e,
      valueType: n,
      typeName: B.ZodRecord,
      ...G(r)
    }) : new Gt({
      keyType: Le.create(),
      valueType: e,
      typeName: B.ZodRecord,
      ...G(n)
    });
  }
}
class Cn extends q {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== y.map)
      return S(r, {
        code: g.invalid_type,
        expected: y.map,
        received: r.parsedType
      }), H;
    const s = this._def.keyType, a = this._def.valueType, o = [...r.data.entries()].map(([i, l], u) => ({
      key: s._parse(new Ge(r, i, r.path, [u, "key"])),
      value: a._parse(new Ge(r, l, r.path, [u, "value"]))
    }));
    if (r.common.async) {
      const i = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const l of o) {
          const u = await l.key, p = await l.value;
          if (u.status === "aborted" || p.status === "aborted")
            return H;
          (u.status === "dirty" || p.status === "dirty") && n.dirty(), i.set(u.value, p.value);
        }
        return { status: n.value, value: i };
      });
    } else {
      const i = /* @__PURE__ */ new Map();
      for (const l of o) {
        const u = l.key, p = l.value;
        if (u.status === "aborted" || p.status === "aborted")
          return H;
        (u.status === "dirty" || p.status === "dirty") && n.dirty(), i.set(u.value, p.value);
      }
      return { status: n.value, value: i };
    }
  }
}
Cn.create = (t, e, n) => new Cn({
  valueType: e,
  keyType: t,
  typeName: B.ZodMap,
  ...G(n)
});
class pt extends q {
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== y.set)
      return S(r, {
        code: g.invalid_type,
        expected: y.set,
        received: r.parsedType
      }), H;
    const s = this._def;
    s.minSize !== null && r.data.size < s.minSize.value && (S(r, {
      code: g.too_small,
      minimum: s.minSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: s.minSize.message
    }), n.dirty()), s.maxSize !== null && r.data.size > s.maxSize.value && (S(r, {
      code: g.too_big,
      maximum: s.maxSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: s.maxSize.message
    }), n.dirty());
    const a = this._def.valueType;
    function o(l) {
      const u = /* @__PURE__ */ new Set();
      for (const p of l) {
        if (p.status === "aborted")
          return H;
        p.status === "dirty" && n.dirty(), u.add(p.value);
      }
      return { status: n.value, value: u };
    }
    const i = [...r.data.values()].map((l, u) => a._parse(new Ge(r, l, r.path, u)));
    return r.common.async ? Promise.all(i).then((l) => o(l)) : o(i);
  }
  min(e, n) {
    return new pt({
      ...this._def,
      minSize: { value: e, message: L.toString(n) }
    });
  }
  max(e, n) {
    return new pt({
      ...this._def,
      maxSize: { value: e, message: L.toString(n) }
    });
  }
  size(e, n) {
    return this.min(e, n).max(e, n);
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
pt.create = (t, e) => new pt({
  valueType: t,
  minSize: null,
  maxSize: null,
  typeName: B.ZodSet,
  ...G(e)
});
class _t extends q {
  constructor() {
    super(...arguments), this.validate = this.implement;
  }
  _parse(e) {
    const { ctx: n } = this._processInputParams(e);
    if (n.parsedType !== y.function)
      return S(n, {
        code: g.invalid_type,
        expected: y.function,
        received: n.parsedType
      }), H;
    function r(i, l) {
      return hn({
        data: i,
        path: n.path,
        errorMaps: [
          n.common.contextualErrorMap,
          n.schemaErrorMap,
          pn(),
          Mt
        ].filter((u) => !!u),
        issueData: {
          code: g.invalid_arguments,
          argumentsError: l
        }
      });
    }
    function s(i, l) {
      return hn({
        data: i,
        path: n.path,
        errorMaps: [
          n.common.contextualErrorMap,
          n.schemaErrorMap,
          pn(),
          Mt
        ].filter((u) => !!u),
        issueData: {
          code: g.invalid_return_type,
          returnTypeError: l
        }
      });
    }
    const a = { errorMap: n.common.contextualErrorMap }, o = n.data;
    if (this._def.returns instanceof vt) {
      const i = this;
      return Ee(async function(...l) {
        const u = new De([]), p = await i._def.args.parseAsync(l, a).catch((T) => {
          throw u.addIssue(r(l, T)), u;
        }), h = await Reflect.apply(o, this, p);
        return await i._def.returns._def.type.parseAsync(h, a).catch((T) => {
          throw u.addIssue(s(h, T)), u;
        });
      });
    } else {
      const i = this;
      return Ee(function(...l) {
        const u = i._def.args.safeParse(l, a);
        if (!u.success)
          throw new De([r(l, u.error)]);
        const p = Reflect.apply(o, this, u.data), h = i._def.returns.safeParse(p, a);
        if (!h.success)
          throw new De([s(p, h.error)]);
        return h.data;
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
    return new _t({
      ...this._def,
      args: Ve.create(e).rest(lt.create())
    });
  }
  returns(e) {
    return new _t({
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
  static create(e, n, r) {
    return new _t({
      args: e || Ve.create([]).rest(lt.create()),
      returns: n || lt.create(),
      typeName: B.ZodFunction,
      ...G(r)
    });
  }
}
class Vt extends q {
  get schema() {
    return this._def.getter();
  }
  _parse(e) {
    const { ctx: n } = this._processInputParams(e);
    return this._def.getter()._parse({ data: n.data, path: n.path, parent: n });
  }
}
Vt.create = (t, e) => new Vt({
  getter: t,
  typeName: B.ZodLazy,
  ...G(e)
});
class qt extends q {
  _parse(e) {
    if (e.data !== this._def.value) {
      const n = this._getOrReturnCtx(e);
      return S(n, {
        received: n.data,
        code: g.invalid_literal,
        expected: this._def.value
      }), H;
    }
    return { status: "valid", value: e.data };
  }
  get value() {
    return this._def.value;
  }
}
qt.create = (t, e) => new qt({
  value: t,
  typeName: B.ZodLiteral,
  ...G(e)
});
function _r(t, e) {
  return new at({
    values: t,
    typeName: B.ZodEnum,
    ...G(e)
  });
}
class at extends q {
  _parse(e) {
    if (typeof e.data != "string") {
      const n = this._getOrReturnCtx(e), r = this._def.values;
      return S(n, {
        expected: X.joinValues(r),
        received: n.parsedType,
        code: g.invalid_type
      }), H;
    }
    if (this._def.values.indexOf(e.data) === -1) {
      const n = this._getOrReturnCtx(e), r = this._def.values;
      return S(n, {
        received: n.data,
        code: g.invalid_enum_value,
        options: r
      }), H;
    }
    return Ee(e.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const e = {};
    for (const n of this._def.values)
      e[n] = n;
    return e;
  }
  get Values() {
    const e = {};
    for (const n of this._def.values)
      e[n] = n;
    return e;
  }
  get Enum() {
    const e = {};
    for (const n of this._def.values)
      e[n] = n;
    return e;
  }
  extract(e) {
    return at.create(e);
  }
  exclude(e) {
    return at.create(this.options.filter((n) => !e.includes(n)));
  }
}
at.create = _r;
class Kt extends q {
  _parse(e) {
    const n = X.getValidEnumValues(this._def.values), r = this._getOrReturnCtx(e);
    if (r.parsedType !== y.string && r.parsedType !== y.number) {
      const s = X.objectValues(n);
      return S(r, {
        expected: X.joinValues(s),
        received: r.parsedType,
        code: g.invalid_type
      }), H;
    }
    if (n.indexOf(e.data) === -1) {
      const s = X.objectValues(n);
      return S(r, {
        received: r.data,
        code: g.invalid_enum_value,
        options: s
      }), H;
    }
    return Ee(e.data);
  }
  get enum() {
    return this._def.values;
  }
}
Kt.create = (t, e) => new Kt({
  values: t,
  typeName: B.ZodNativeEnum,
  ...G(e)
});
class vt extends q {
  unwrap() {
    return this._def.type;
  }
  _parse(e) {
    const { ctx: n } = this._processInputParams(e);
    if (n.parsedType !== y.promise && n.common.async === !1)
      return S(n, {
        code: g.invalid_type,
        expected: y.promise,
        received: n.parsedType
      }), H;
    const r = n.parsedType === y.promise ? n.data : Promise.resolve(n.data);
    return Ee(r.then((s) => this._def.type.parseAsync(s, {
      path: n.path,
      errorMap: n.common.contextualErrorMap
    })));
  }
}
vt.create = (t, e) => new vt({
  type: t,
  typeName: B.ZodPromise,
  ...G(e)
});
class We extends q {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === B.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e), s = this._def.effect || null, a = {
      addIssue: (o) => {
        S(r, o), o.fatal ? n.abort() : n.dirty();
      },
      get path() {
        return r.path;
      }
    };
    if (a.addIssue = a.addIssue.bind(a), s.type === "preprocess") {
      const o = s.transform(r.data, a);
      return r.common.issues.length ? {
        status: "dirty",
        value: r.data
      } : r.common.async ? Promise.resolve(o).then((i) => this._def.schema._parseAsync({
        data: i,
        path: r.path,
        parent: r
      })) : this._def.schema._parseSync({
        data: o,
        path: r.path,
        parent: r
      });
    }
    if (s.type === "refinement") {
      const o = (i) => {
        const l = s.refinement(i, a);
        if (r.common.async)
          return Promise.resolve(l);
        if (l instanceof Promise)
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        return i;
      };
      if (r.common.async === !1) {
        const i = this._def.schema._parseSync({
          data: r.data,
          path: r.path,
          parent: r
        });
        return i.status === "aborted" ? H : (i.status === "dirty" && n.dirty(), o(i.value), { status: n.value, value: i.value });
      } else
        return this._def.schema._parseAsync({ data: r.data, path: r.path, parent: r }).then((i) => i.status === "aborted" ? H : (i.status === "dirty" && n.dirty(), o(i.value).then(() => ({ status: n.value, value: i.value }))));
    }
    if (s.type === "transform")
      if (r.common.async === !1) {
        const o = this._def.schema._parseSync({
          data: r.data,
          path: r.path,
          parent: r
        });
        if (!Ft(o))
          return o;
        const i = s.transform(o.value, a);
        if (i instanceof Promise)
          throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
        return { status: n.value, value: i };
      } else
        return this._def.schema._parseAsync({ data: r.data, path: r.path, parent: r }).then((o) => Ft(o) ? Promise.resolve(s.transform(o.value, a)).then((i) => ({ status: n.value, value: i })) : o);
    X.assertNever(s);
  }
}
We.create = (t, e, n) => new We({
  schema: t,
  typeName: B.ZodEffects,
  effect: e,
  ...G(n)
});
We.createWithPreprocess = (t, e, n) => new We({
  schema: e,
  effect: { type: "preprocess", transform: t },
  typeName: B.ZodEffects,
  ...G(n)
});
class Ye extends q {
  _parse(e) {
    return this._getType(e) === y.undefined ? Ee(void 0) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
Ye.create = (t, e) => new Ye({
  innerType: t,
  typeName: B.ZodOptional,
  ...G(e)
});
class ht extends q {
  _parse(e) {
    return this._getType(e) === y.null ? Ee(null) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
ht.create = (t, e) => new ht({
  innerType: t,
  typeName: B.ZodNullable,
  ...G(e)
});
class zt extends q {
  _parse(e) {
    const { ctx: n } = this._processInputParams(e);
    let r = n.data;
    return n.parsedType === y.undefined && (r = this._def.defaultValue()), this._def.innerType._parse({
      data: r,
      path: n.path,
      parent: n
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
}
zt.create = (t, e) => new zt({
  innerType: t,
  typeName: B.ZodDefault,
  defaultValue: typeof e.default == "function" ? e.default : () => e.default,
  ...G(e)
});
class wn extends q {
  _parse(e) {
    const { ctx: n } = this._processInputParams(e), r = {
      ...n,
      common: {
        ...n.common,
        issues: []
      }
    }, s = this._def.innerType._parse({
      data: r.data,
      path: r.path,
      parent: {
        ...r
      }
    });
    return fn(s) ? s.then((a) => ({
      status: "valid",
      value: a.status === "valid" ? a.value : this._def.catchValue({
        get error() {
          return new De(r.common.issues);
        },
        input: r.data
      })
    })) : {
      status: "valid",
      value: s.status === "valid" ? s.value : this._def.catchValue({
        get error() {
          return new De(r.common.issues);
        },
        input: r.data
      })
    };
  }
  removeCatch() {
    return this._def.innerType;
  }
}
wn.create = (t, e) => new wn({
  innerType: t,
  typeName: B.ZodCatch,
  catchValue: typeof e.catch == "function" ? e.catch : () => e.catch,
  ...G(e)
});
class En extends q {
  _parse(e) {
    if (this._getType(e) !== y.nan) {
      const r = this._getOrReturnCtx(e);
      return S(r, {
        code: g.invalid_type,
        expected: y.nan,
        received: r.parsedType
      }), H;
    }
    return { status: "valid", value: e.data };
  }
}
En.create = (t) => new En({
  typeName: B.ZodNaN,
  ...G(t)
});
const ta = Symbol("zod_brand");
class Ar extends q {
  _parse(e) {
    const { ctx: n } = this._processInputParams(e), r = n.data;
    return this._def.type._parse({
      data: r,
      path: n.path,
      parent: n
    });
  }
  unwrap() {
    return this._def.type;
  }
}
class Xt extends q {
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e);
    if (r.common.async)
      return (async () => {
        const a = await this._def.in._parseAsync({
          data: r.data,
          path: r.path,
          parent: r
        });
        return a.status === "aborted" ? H : a.status === "dirty" ? (n.dirty(), Er(a.value)) : this._def.out._parseAsync({
          data: a.value,
          path: r.path,
          parent: r
        });
      })();
    {
      const s = this._def.in._parseSync({
        data: r.data,
        path: r.path,
        parent: r
      });
      return s.status === "aborted" ? H : s.status === "dirty" ? (n.dirty(), {
        status: "dirty",
        value: s.value
      }) : this._def.out._parseSync({
        data: s.value,
        path: r.path,
        parent: r
      });
    }
  }
  static create(e, n) {
    return new Xt({
      in: e,
      out: n,
      typeName: B.ZodPipeline
    });
  }
}
class _n extends q {
  _parse(e) {
    const n = this._def.innerType._parse(e);
    return Ft(n) && (n.value = Object.freeze(n.value)), n;
  }
}
_n.create = (t, e) => new _n({
  innerType: t,
  typeName: B.ZodReadonly,
  ...G(e)
});
const yr = (t, e = {}, n) => t ? Nt.create().superRefine((r, s) => {
  var a, o;
  if (!t(r)) {
    const i = typeof e == "function" ? e(r) : typeof e == "string" ? { message: e } : e, l = (o = (a = i.fatal) !== null && a !== void 0 ? a : n) !== null && o !== void 0 ? o : !0, u = typeof i == "string" ? { message: i } : i;
    s.addIssue({ code: "custom", ...u, fatal: l });
  }
}) : Nt.create(), na = {
  object: ie.lazycreate
};
var B;
(function(t) {
  t.ZodString = "ZodString", t.ZodNumber = "ZodNumber", t.ZodNaN = "ZodNaN", t.ZodBigInt = "ZodBigInt", t.ZodBoolean = "ZodBoolean", t.ZodDate = "ZodDate", t.ZodSymbol = "ZodSymbol", t.ZodUndefined = "ZodUndefined", t.ZodNull = "ZodNull", t.ZodAny = "ZodAny", t.ZodUnknown = "ZodUnknown", t.ZodNever = "ZodNever", t.ZodVoid = "ZodVoid", t.ZodArray = "ZodArray", t.ZodObject = "ZodObject", t.ZodUnion = "ZodUnion", t.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", t.ZodIntersection = "ZodIntersection", t.ZodTuple = "ZodTuple", t.ZodRecord = "ZodRecord", t.ZodMap = "ZodMap", t.ZodSet = "ZodSet", t.ZodFunction = "ZodFunction", t.ZodLazy = "ZodLazy", t.ZodLiteral = "ZodLiteral", t.ZodEnum = "ZodEnum", t.ZodEffects = "ZodEffects", t.ZodNativeEnum = "ZodNativeEnum", t.ZodOptional = "ZodOptional", t.ZodNullable = "ZodNullable", t.ZodDefault = "ZodDefault", t.ZodCatch = "ZodCatch", t.ZodPromise = "ZodPromise", t.ZodBranded = "ZodBranded", t.ZodPipeline = "ZodPipeline", t.ZodReadonly = "ZodReadonly";
})(B || (B = {}));
const ra = (t, e = {
  message: `Input not instance of ${t.name}`
}) => yr((n) => n instanceof t, e), Nr = Le.create, vr = rt.create, sa = En.create, aa = st.create, Tr = Wt.create, oa = ut.create, ia = mn.create, ca = Bt.create, la = jt.create, da = Nt.create, ua = lt.create, pa = Ze.create, ha = gn.create, fa = Me.create, ma = ie.create, ga = ie.strictCreate, Ca = Ht.create, wa = An.create, Ea = $t.create, _a = Ve.create, Aa = Gt.create, ya = Cn.create, Na = pt.create, va = _t.create, Ta = Vt.create, Sa = qt.create, ba = at.create, Ia = Kt.create, Ra = vt.create, nr = We.create, Oa = Ye.create, ka = ht.create, Pa = We.createWithPreprocess, Ua = Xt.create, xa = () => Nr().optional(), La = () => vr().optional(), Da = () => Tr().optional(), Ma = {
  string: (t) => Le.create({ ...t, coerce: !0 }),
  number: (t) => rt.create({ ...t, coerce: !0 }),
  boolean: (t) => Wt.create({
    ...t,
    coerce: !0
  }),
  bigint: (t) => st.create({ ...t, coerce: !0 }),
  date: (t) => ut.create({ ...t, coerce: !0 })
}, Fa = H;
var c = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  defaultErrorMap: Mt,
  setErrorMap: Hs,
  getErrorMap: pn,
  makeIssue: hn,
  EMPTY_PATH: $s,
  addIssueToContext: S,
  ParseStatus: me,
  INVALID: H,
  DIRTY: Er,
  OK: Ee,
  isAborted: Wn,
  isDirty: Bn,
  isValid: Ft,
  isAsync: fn,
  get util() {
    return X;
  },
  get objectUtil() {
    return Fn;
  },
  ZodParsedType: y,
  getParsedType: Qe,
  ZodType: q,
  ZodString: Le,
  ZodNumber: rt,
  ZodBigInt: st,
  ZodBoolean: Wt,
  ZodDate: ut,
  ZodSymbol: mn,
  ZodUndefined: Bt,
  ZodNull: jt,
  ZodAny: Nt,
  ZodUnknown: lt,
  ZodNever: Ze,
  ZodVoid: gn,
  ZodArray: Me,
  ZodObject: ie,
  ZodUnion: Ht,
  ZodDiscriminatedUnion: An,
  ZodIntersection: $t,
  ZodTuple: Ve,
  ZodRecord: Gt,
  ZodMap: Cn,
  ZodSet: pt,
  ZodFunction: _t,
  ZodLazy: Vt,
  ZodLiteral: qt,
  ZodEnum: at,
  ZodNativeEnum: Kt,
  ZodPromise: vt,
  ZodEffects: We,
  ZodTransformer: We,
  ZodOptional: Ye,
  ZodNullable: ht,
  ZodDefault: zt,
  ZodCatch: wn,
  ZodNaN: En,
  BRAND: ta,
  ZodBranded: Ar,
  ZodPipeline: Xt,
  ZodReadonly: _n,
  custom: yr,
  Schema: q,
  ZodSchema: q,
  late: na,
  get ZodFirstPartyTypeKind() {
    return B;
  },
  coerce: Ma,
  any: da,
  array: fa,
  bigint: aa,
  boolean: Tr,
  date: oa,
  discriminatedUnion: wa,
  effect: nr,
  enum: ba,
  function: va,
  instanceof: ra,
  intersection: Ea,
  lazy: Ta,
  literal: Sa,
  map: ya,
  nan: sa,
  nativeEnum: Ia,
  never: pa,
  null: la,
  nullable: ka,
  number: vr,
  object: ma,
  oboolean: Da,
  onumber: La,
  optional: Oa,
  ostring: xa,
  pipeline: Ua,
  preprocess: Pa,
  promise: Ra,
  record: Aa,
  set: Na,
  strictObject: ga,
  string: Nr,
  symbol: ia,
  transformer: nr,
  tuple: _a,
  undefined: ca,
  union: Ca,
  unknown: ua,
  void: ha,
  NEVER: Fa,
  ZodIssueCode: g,
  quotelessJson: js,
  ZodError: De
});
const ce = c.object({ message: c.string() });
function N(t) {
  return c.literal(b[t]);
}
const yn = c.object({
  serializedMessage: c.string().optional(),
  accountAddress: c.string(),
  chainId: c.string(),
  notBefore: c.string().optional(),
  domain: c.string(),
  uri: c.string(),
  version: c.string(),
  nonce: c.string(),
  statement: c.string().optional(),
  resources: c.array(c.string()).optional(),
  requestId: c.string().optional(),
  issuedAt: c.string().optional(),
  expirationTime: c.string().optional()
});
c.object({
  accessList: c.array(c.string()),
  blockHash: c.string().nullable(),
  blockNumber: c.string().nullable(),
  chainId: c.string().or(c.number()),
  from: c.string(),
  gas: c.string(),
  hash: c.string(),
  input: c.string().nullable(),
  maxFeePerGas: c.string(),
  maxPriorityFeePerGas: c.string(),
  nonce: c.string(),
  r: c.string(),
  s: c.string(),
  to: c.string(),
  transactionIndex: c.string().nullable(),
  type: c.string(),
  v: c.string(),
  value: c.string()
});
const Wa = c.object({
  chainId: c.string().or(c.number()),
  rpcUrl: c.optional(c.string())
}), Ba = c.object({ email: c.string().email() }), ja = c.object({ otp: c.string() }), Ha = c.object({
  uri: c.string(),
  preferredAccountType: c.optional(c.string()),
  chainId: c.optional(c.string().or(c.number())),
  siwxMessage: c.optional(yn),
  rpcUrl: c.optional(c.string())
}), $a = c.object({
  chainId: c.optional(c.string().or(c.number())),
  preferredAccountType: c.optional(c.string()),
  socialUri: c.optional(c.string()),
  siwxMessage: c.optional(yn),
  rpcUrl: c.optional(c.string())
}), Ga = c.object({
  provider: c.enum(["google", "github", "apple", "facebook", "x", "discord"])
}), Va = c.object({ email: c.string().email() }), qa = c.object({ otp: c.string() }), Ka = c.object({ otp: c.string() }), za = c.object({
  themeMode: c.optional(c.enum(["light", "dark"])),
  themeVariables: c.optional(c.record(c.string(), c.string().or(c.number()))),
  w3mThemeVariables: c.optional(c.record(c.string(), c.string()))
}), Ya = c.object({
  metadata: c.object({
    name: c.string(),
    description: c.string(),
    url: c.string(),
    icons: c.array(c.string())
  }).optional(),
  sdkVersion: c.string().optional(),
  sdkType: c.string().optional(),
  projectId: c.string()
}), Za = c.object({ type: c.string() }), Xa = c.object({
  action: c.enum(["VERIFY_DEVICE", "VERIFY_OTP", "CONNECT"])
}), Ja = c.object({
  url: c.string()
}), Qa = c.object({
  userName: c.string()
}), eo = c.object({
  email: c.string().optional().nullable(),
  address: c.string(),
  chainId: c.string().or(c.number()),
  accounts: c.array(c.object({
    address: c.string(),
    type: c.enum([
      ue.ACCOUNT_TYPES.EOA,
      ue.ACCOUNT_TYPES.SMART_ACCOUNT
    ])
  })).optional(),
  userName: c.string().optional().nullable(),
  preferredAccountType: c.optional(c.string()),
  signature: c.string().optional(),
  message: c.string().optional(),
  siwxMessage: c.optional(yn)
}), to = c.object({
  action: c.enum(["VERIFY_PRIMARY_OTP", "VERIFY_SECONDARY_OTP"])
}), no = c.object({
  email: c.string().email().optional().nullable(),
  address: c.string(),
  chainId: c.string().or(c.number()),
  smartAccountDeployed: c.optional(c.boolean()),
  accounts: c.array(c.object({
    address: c.string(),
    type: c.enum([
      ue.ACCOUNT_TYPES.EOA,
      ue.ACCOUNT_TYPES.SMART_ACCOUNT
    ])
  })).optional(),
  preferredAccountType: c.optional(c.string()),
  signature: c.string().optional(),
  message: c.string().optional(),
  siwxMessage: c.optional(yn)
}), ro = c.object({ uri: c.string() }), so = c.object({ isConnected: c.boolean() }), ao = c.object({ chainId: c.string().or(c.number()) }), oo = c.object({ chainId: c.string().or(c.number()) }), io = c.object({ newEmail: c.string().email() }), co = c.object({
  smartAccountEnabledNetworks: c.array(c.number())
});
c.object({
  address: c.string(),
  isDeployed: c.boolean()
});
const lo = c.object({
  version: c.string().optional()
}), uo = c.object({ type: c.string(), address: c.string() }), po = c.any(), ho = c.object({
  method: c.literal("eth_accounts")
}), fo = c.object({
  method: c.literal("eth_blockNumber")
}), mo = c.object({
  method: c.literal("eth_call"),
  params: c.array(c.any())
}), go = c.object({
  method: c.literal("eth_chainId")
}), Co = c.object({
  method: c.literal("eth_estimateGas"),
  params: c.array(c.any())
}), wo = c.object({
  method: c.literal("eth_feeHistory"),
  params: c.array(c.any())
}), Eo = c.object({
  method: c.literal("eth_gasPrice")
}), _o = c.object({
  method: c.literal("eth_getAccount"),
  params: c.array(c.any())
}), Ao = c.object({
  method: c.literal("eth_getBalance"),
  params: c.array(c.any())
}), yo = c.object({
  method: c.literal("eth_getBlockByHash"),
  params: c.array(c.any())
}), No = c.object({
  method: c.literal("eth_getBlockByNumber"),
  params: c.array(c.any())
}), vo = c.object({
  method: c.literal("eth_getBlockReceipts"),
  params: c.array(c.any())
}), To = c.object({
  method: c.literal("eth_getBlockTransactionCountByHash"),
  params: c.array(c.any())
}), So = c.object({
  method: c.literal("eth_getBlockTransactionCountByNumber"),
  params: c.array(c.any())
}), bo = c.object({
  method: c.literal("eth_getCode"),
  params: c.array(c.any())
}), Io = c.object({
  method: c.literal("eth_getFilterChanges"),
  params: c.array(c.any())
}), Ro = c.object({
  method: c.literal("eth_getFilterLogs"),
  params: c.array(c.any())
}), Oo = c.object({
  method: c.literal("eth_getLogs"),
  params: c.array(c.any())
}), ko = c.object({
  method: c.literal("eth_getProof"),
  params: c.array(c.any())
}), Po = c.object({
  method: c.literal("eth_getStorageAt"),
  params: c.array(c.any())
}), Uo = c.object({
  method: c.literal("eth_getTransactionByBlockHashAndIndex"),
  params: c.array(c.any())
}), xo = c.object({
  method: c.literal("eth_getTransactionByBlockNumberAndIndex"),
  params: c.array(c.any())
}), Lo = c.object({
  method: c.literal("eth_getTransactionByHash"),
  params: c.array(c.any())
}), Do = c.object({
  method: c.literal("eth_getTransactionCount"),
  params: c.array(c.any())
}), Mo = c.object({
  method: c.literal("eth_getTransactionReceipt"),
  params: c.array(c.any())
}), Fo = c.object({
  method: c.literal("eth_getUncleCountByBlockHash"),
  params: c.array(c.any())
}), Wo = c.object({
  method: c.literal("eth_getUncleCountByBlockNumber"),
  params: c.array(c.any())
}), Bo = c.object({
  method: c.literal("eth_maxPriorityFeePerGas")
}), jo = c.object({
  method: c.literal("eth_newBlockFilter")
}), Ho = c.object({
  method: c.literal("eth_newFilter"),
  params: c.array(c.any())
}), $o = c.object({
  method: c.literal("eth_newPendingTransactionFilter")
}), Go = c.object({
  method: c.literal("eth_sendRawTransaction"),
  params: c.array(c.any())
}), Vo = c.object({
  method: c.literal("eth_syncing"),
  params: c.array(c.any())
}), qo = c.object({
  method: c.literal("eth_uninstallFilter"),
  params: c.array(c.any())
}), rr = c.object({
  method: c.literal("personal_sign"),
  params: c.array(c.any())
}), Ko = c.object({
  method: c.literal("eth_signTypedData_v4"),
  params: c.array(c.any())
}), zo = c.object({
  method: c.literal("eth_sendTransaction"),
  params: c.array(c.any())
}), Yo = c.object({
  method: c.literal("solana_signMessage"),
  params: c.object({
    message: c.string(),
    pubkey: c.string()
  })
}), Zo = c.object({
  method: c.literal("solana_signTransaction"),
  params: c.object({
    transaction: c.string()
  })
}), Xo = c.object({
  method: c.literal("solana_signAllTransactions"),
  params: c.object({
    transactions: c.array(c.string())
  })
}), Jo = c.object({
  method: c.literal("solana_signAndSendTransaction"),
  params: c.object({
    transaction: c.string(),
    options: c.object({
      skipPreflight: c.boolean().optional(),
      preflightCommitment: c.enum([
        "processed",
        "confirmed",
        "finalized",
        "recent",
        "single",
        "singleGossip",
        "root",
        "max"
      ]).optional(),
      maxRetries: c.number().optional(),
      minContextSlot: c.number().optional()
    }).optional()
  })
}), Qo = c.object({
  method: c.literal("wallet_sendCalls"),
  params: c.array(c.object({
    chainId: c.string().or(c.number()).optional(),
    from: c.string().optional(),
    version: c.string().optional(),
    capabilities: c.any().optional(),
    calls: c.array(c.object({
      to: c.string().startsWith("0x"),
      data: c.string().startsWith("0x").optional(),
      value: c.string().optional()
    }))
  }))
}), ei = c.object({
  method: c.literal("wallet_getCallsStatus"),
  params: c.array(c.string())
}), ti = c.object({
  method: c.literal("wallet_getCapabilities"),
  params: c.array(c.string().or(c.number()).optional()).optional()
}), ni = c.object({
  method: c.literal("wallet_grantPermissions"),
  params: c.array(c.any())
}), ri = c.object({
  method: c.literal("wallet_revokePermissions"),
  params: c.any()
}), si = c.object({
  method: c.literal("wallet_getAssets"),
  params: c.any()
}), sr = c.object({
  token: c.string()
}), v = c.object({
  id: c.string().optional()
}), kn = {
  appEvent: v.extend({
    type: N("APP_SWITCH_NETWORK"),
    payload: Wa
  }).or(v.extend({
    type: N("APP_CONNECT_EMAIL"),
    payload: Ba
  })).or(v.extend({ type: N("APP_CONNECT_DEVICE") })).or(v.extend({ type: N("APP_CONNECT_OTP"), payload: ja })).or(v.extend({
    type: N("APP_CONNECT_SOCIAL"),
    payload: Ha
  })).or(v.extend({ type: N("APP_GET_FARCASTER_URI") })).or(v.extend({ type: N("APP_CONNECT_FARCASTER") })).or(v.extend({
    type: N("APP_GET_USER"),
    payload: c.optional($a)
  })).or(v.extend({
    type: N("APP_GET_SOCIAL_REDIRECT_URI"),
    payload: Ga
  })).or(v.extend({ type: N("APP_SIGN_OUT") })).or(v.extend({
    type: N("APP_IS_CONNECTED"),
    payload: c.optional(sr)
  })).or(v.extend({ type: N("APP_GET_CHAIN_ID") })).or(v.extend({ type: N("APP_GET_SMART_ACCOUNT_ENABLED_NETWORKS") })).or(v.extend({ type: N("APP_INIT_SMART_ACCOUNT") })).or(v.extend({
    type: N("APP_SET_PREFERRED_ACCOUNT"),
    payload: Za
  })).or(v.extend({
    type: N("APP_RPC_REQUEST"),
    payload: rr.or(si).or(ho).or(fo).or(mo).or(go).or(Co).or(wo).or(Eo).or(_o).or(Ao).or(yo).or(No).or(vo).or(To).or(So).or(bo).or(Io).or(Ro).or(Oo).or(ko).or(Po).or(Uo).or(xo).or(Lo).or(Do).or(Mo).or(Fo).or(Wo).or(Bo).or(jo).or(Ho).or($o).or(Go).or(Vo).or(qo).or(rr).or(Ko).or(zo).or(Yo).or(Zo).or(Xo).or(Jo).or(ei).or(Qo).or(ti).or(ni).or(ri).and(c.object({
      chainId: c.string().or(c.number()).optional(),
      chainNamespace: c.enum(["eip155", "solana", "polkadot", "bip122", "cosmos"]).optional(),
      rpcUrl: c.string().optional()
    }))
  })).or(v.extend({ type: N("APP_UPDATE_EMAIL"), payload: Va })).or(v.extend({
    type: N("APP_UPDATE_EMAIL_PRIMARY_OTP"),
    payload: qa
  })).or(v.extend({
    type: N("APP_UPDATE_EMAIL_SECONDARY_OTP"),
    payload: Ka
  })).or(v.extend({ type: N("APP_SYNC_THEME"), payload: za })).or(v.extend({
    type: N("APP_SYNC_DAPP_DATA"),
    payload: Ya
  })).or(v.extend({
    type: N("APP_RELOAD")
  })).or(v.extend({
    type: N("APP_RPC_ABORT")
  })),
  frameEvent: v.extend({ type: N("FRAME_SWITCH_NETWORK_ERROR"), payload: ce }).or(v.extend({
    type: N("FRAME_SWITCH_NETWORK_SUCCESS"),
    payload: oo
  })).or(v.extend({
    type: N("FRAME_CONNECT_EMAIL_SUCCESS"),
    payload: Xa
  })).or(v.extend({ type: N("FRAME_CONNECT_EMAIL_ERROR"), payload: ce })).or(v.extend({
    type: N("FRAME_GET_FARCASTER_URI_SUCCESS"),
    payload: Ja
  })).or(v.extend({ type: N("FRAME_GET_FARCASTER_URI_ERROR"), payload: ce })).or(v.extend({
    type: N("FRAME_CONNECT_FARCASTER_SUCCESS"),
    payload: Qa
  })).or(v.extend({ type: N("FRAME_CONNECT_FARCASTER_ERROR"), payload: ce })).or(v.extend({ type: N("FRAME_CONNECT_OTP_ERROR"), payload: ce })).or(v.extend({ type: N("FRAME_CONNECT_OTP_SUCCESS") })).or(v.extend({ type: N("FRAME_CONNECT_DEVICE_ERROR"), payload: ce })).or(v.extend({ type: N("FRAME_CONNECT_DEVICE_SUCCESS") })).or(v.extend({
    type: N("FRAME_CONNECT_SOCIAL_SUCCESS"),
    payload: eo
  })).or(v.extend({
    type: N("FRAME_CONNECT_SOCIAL_ERROR"),
    payload: ce
  })).or(v.extend({ type: N("FRAME_GET_USER_ERROR"), payload: ce })).or(v.extend({
    type: N("FRAME_GET_USER_SUCCESS"),
    payload: no
  })).or(v.extend({
    type: N("FRAME_GET_SOCIAL_REDIRECT_URI_ERROR"),
    payload: ce
  })).or(v.extend({
    type: N("FRAME_GET_SOCIAL_REDIRECT_URI_SUCCESS"),
    payload: ro
  })).or(v.extend({ type: N("FRAME_SIGN_OUT_ERROR"), payload: ce })).or(v.extend({ type: N("FRAME_SIGN_OUT_SUCCESS") })).or(v.extend({ type: N("FRAME_IS_CONNECTED_ERROR"), payload: ce })).or(v.extend({
    type: N("FRAME_IS_CONNECTED_SUCCESS"),
    payload: so
  })).or(v.extend({ type: N("FRAME_GET_CHAIN_ID_ERROR"), payload: ce })).or(v.extend({
    type: N("FRAME_GET_CHAIN_ID_SUCCESS"),
    payload: ao
  })).or(v.extend({ type: N("FRAME_RPC_REQUEST_ERROR"), payload: ce })).or(v.extend({ type: N("FRAME_RPC_REQUEST_SUCCESS"), payload: po })).or(v.extend({ type: N("FRAME_SESSION_UPDATE"), payload: sr })).or(v.extend({ type: N("FRAME_UPDATE_EMAIL_ERROR"), payload: ce })).or(v.extend({
    type: N("FRAME_UPDATE_EMAIL_SUCCESS"),
    payload: to
  })).or(v.extend({
    type: N("FRAME_UPDATE_EMAIL_PRIMARY_OTP_ERROR"),
    payload: ce
  })).or(v.extend({ type: N("FRAME_UPDATE_EMAIL_PRIMARY_OTP_SUCCESS") })).or(v.extend({
    type: N("FRAME_UPDATE_EMAIL_SECONDARY_OTP_ERROR"),
    payload: ce
  })).or(v.extend({
    type: N("FRAME_UPDATE_EMAIL_SECONDARY_OTP_SUCCESS"),
    payload: io
  })).or(v.extend({ type: N("FRAME_SYNC_THEME_ERROR"), payload: ce })).or(v.extend({ type: N("FRAME_SYNC_THEME_SUCCESS") })).or(v.extend({ type: N("FRAME_SYNC_DAPP_DATA_ERROR"), payload: ce })).or(v.extend({ type: N("FRAME_SYNC_DAPP_DATA_SUCCESS") })).or(v.extend({
    type: N("FRAME_GET_SMART_ACCOUNT_ENABLED_NETWORKS_SUCCESS"),
    payload: co
  })).or(v.extend({
    type: N("FRAME_GET_SMART_ACCOUNT_ENABLED_NETWORKS_ERROR"),
    payload: ce
  })).or(v.extend({ type: N("FRAME_INIT_SMART_ACCOUNT_ERROR"), payload: ce })).or(v.extend({
    type: N("FRAME_SET_PREFERRED_ACCOUNT_SUCCESS"),
    payload: uo
  })).or(v.extend({
    type: N("FRAME_SET_PREFERRED_ACCOUNT_ERROR"),
    payload: ce
  })).or(v.extend({ type: N("FRAME_READY"), payload: lo })).or(v.extend({
    type: N("FRAME_RELOAD_ERROR"),
    payload: ce
  })).or(v.extend({ type: N("FRAME_RELOAD_SUCCESS") }))
};
function Pn(t, e = {}) {
  var n;
  return typeof (e == null ? void 0 : e.type) == "string" && ((n = e == null ? void 0 : e.type) == null ? void 0 : n.includes(t));
}
function ai({ projectId: t, chainId: e, version: n, enableLogger: r, rpcUrl: s = Cr.BLOCKCHAIN_API_RPC_URL }) {
  const a = new URL(os);
  return a.searchParams.set("projectId", t), a.searchParams.set("chainId", String(e)), a.searchParams.set("version", n), a.searchParams.set("enableLogger", String(r)), a.searchParams.set("rpcUrl", s), a.toString();
}
class oi {
  constructor({ projectId: e, isAppClient: n = !1, chainId: r = "eip155:1", enableLogger: s = !0, rpcUrl: a = Cr.BLOCKCHAIN_API_RPC_URL }) {
    if (this.iframe = null, this.iframeIsReady = !1, this.initFrame = () => {
      const o = document.getElementById("w3m-iframe");
      this.iframe && !o && document.body.appendChild(this.iframe);
    }, this.events = {
      registerFrameEventHandler: (o, i, l) => {
        function u({ data: p }) {
          var R;
          if (!Pn(b.FRAME_EVENT_KEY, p))
            return;
          const h = kn.frameEvent.safeParse(p);
          if (!h.success) {
            console.warn("W3mFrame: invalid frame event", h.error.message);
            return;
          }
          ((R = h.data) == null ? void 0 : R.id) === o && (i(h.data), window.removeEventListener("message", u));
        }
        Ie.isClient && (window.addEventListener("message", u), l.addEventListener("abort", () => {
          window.removeEventListener("message", u);
        }));
      },
      onFrameEvent: (o) => {
        Ie.isClient && window.addEventListener("message", ({ data: i }) => {
          if (!Pn(b.FRAME_EVENT_KEY, i))
            return;
          const l = kn.frameEvent.safeParse(i);
          l.success ? o(l.data) : console.warn("W3mFrame: invalid frame event", l.error.message);
        });
      },
      onAppEvent: (o) => {
        Ie.isClient && window.addEventListener("message", ({ data: i }) => {
          if (!Pn(b.APP_EVENT_KEY, i))
            return;
          const l = kn.appEvent.safeParse(i);
          l.success || console.warn("W3mFrame: invalid app event", l.error.message), o(i);
        });
      },
      postAppEvent: (o) => {
        var i;
        if (Ie.isClient) {
          if (!((i = this.iframe) != null && i.contentWindow))
            throw new Error("W3mFrame: iframe is not set");
          this.iframe.contentWindow.postMessage(o, "*");
        }
      },
      postFrameEvent: (o) => {
        if (Ie.isClient) {
          if (!parent)
            throw new Error("W3mFrame: parent is not set");
          parent.postMessage(o, "*");
        }
      }
    }, this.projectId = e, this.frameLoadPromise = new Promise((o, i) => {
      this.frameLoadPromiseResolver = { resolve: o, reject: i };
    }), this.rpcUrl = a, n && (this.frameLoadPromise = new Promise((o, i) => {
      this.frameLoadPromiseResolver = { resolve: o, reject: i };
    }), Ie.isClient)) {
      const o = document.createElement("iframe");
      o.id = "w3m-iframe", o.src = ai({
        projectId: e,
        chainId: r,
        version: cs,
        enableLogger: s,
        rpcUrl: this.rpcUrl
      }), o.name = "w3m-secure-iframe", o.style.position = "fixed", o.style.zIndex = "999999", o.style.display = "none", o.style.border = "none", o.style.animationDelay = "0s, 50ms", o.style.borderBottomLeftRadius = "clamp(0px, var(--wui-border-radius-l), 44px)", o.style.borderBottomRightRadius = "clamp(0px, var(--wui-border-radius-l), 44px)", this.iframe = o, this.iframe.onerror = () => {
        var i;
        (i = this.frameLoadPromiseResolver) == null || i.reject("Unable to load email login dependency");
      }, this.events.onFrameEvent((i) => {
        var l;
        i.type === "@w3m-frame/READY" && (this.iframeIsReady = !0, (l = this.frameLoadPromiseResolver) == null || l.resolve(void 0));
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
    ].map((n) => ({
      [n]: {
        rpcUrl: `${this.rpcUrl}/v1/?chainId=${n}&projectId=${this.projectId}`,
        chainId: n
      }
    }));
    return Object.assign({}, ...e);
  }
}
class ii {
  constructor(e) {
    var a;
    const n = cr({
      level: is
    }), { logger: r, chunkLoggerController: s } = lr({
      opts: n
    });
    this.logger = Or(r, this.constructor.name), this.chunkLoggerController = s, typeof window < "u" && ((a = this.chunkLoggerController) != null && a.downloadLogsBlobInBrowser) && (window.downloadAppKitLogsBlob || (window.downloadAppKitLogsBlob = {}), window.downloadAppKitLogsBlob.sdk = () => {
      var o;
      (o = this.chunkLoggerController) != null && o.downloadLogsBlobInBrowser && this.chunkLoggerController.downloadLogsBlobInBrowser({
        projectId: e
      });
    });
  }
}
class ci {
  constructor({ projectId: e, chainId: n, enableLogger: r = !0, onTimeout: s, abortController: a, getActiveCaipNetwork: o }) {
    this.openRpcRequests = [], this.isInitialized = !1, r && (this.w3mLogger = new ii(e)), this.abortController = a, this.getActiveCaipNetwork = o;
    const i = this.getRpcUrl(n);
    this.w3mFrame = new oi({ projectId: e, isAppClient: !0, chainId: n, enableLogger: r, rpcUrl: i }), this.onTimeout = s, this.getLoginEmailUsed() && this.createFrame();
  }
  async createFrame() {
    this.w3mFrame.initFrame(), this.initPromise = new Promise((e) => {
      this.w3mFrame.events.onFrameEvent((n) => {
        n.type === b.FRAME_READY && setTimeout(() => {
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
    return !!pe.get(b.EMAIL_LOGIN_USED_KEY);
  }
  getEmail() {
    return pe.get(b.EMAIL);
  }
  getUsername() {
    return pe.get(b.SOCIAL_USERNAME);
  }
  async reload() {
    var e;
    try {
      await this.appEvent({
        type: b.APP_RELOAD
      });
    } catch (n) {
      throw (e = this.w3mLogger) == null || e.logger.error({ error: n }, "Error reloading iframe"), n;
    }
  }
  async connectEmail(e) {
    var n;
    try {
      Ie.checkIfAllowedToTriggerEmail(), await this.init();
      const r = await this.appEvent({
        type: b.APP_CONNECT_EMAIL,
        payload: e
      });
      return this.setNewLastEmailLoginTime(), r;
    } catch (r) {
      throw (n = this.w3mLogger) == null || n.logger.error({ error: r }, "Error connecting email"), r;
    }
  }
  async connectDevice() {
    var e;
    try {
      return this.appEvent({
        type: b.APP_CONNECT_DEVICE
      });
    } catch (n) {
      throw (e = this.w3mLogger) == null || e.logger.error({ error: n }, "Error connecting device"), n;
    }
  }
  async connectOtp(e) {
    var n;
    try {
      return this.appEvent({
        type: b.APP_CONNECT_OTP,
        payload: e
      });
    } catch (r) {
      throw (n = this.w3mLogger) == null || n.logger.error({ error: r }, "Error connecting otp"), r;
    }
  }
  async isConnected() {
    var e;
    try {
      if (!this.getLoginEmailUsed())
        return { isConnected: !1 };
      const n = await this.appEvent({
        type: b.APP_IS_CONNECTED
      });
      return n != null && n.isConnected || this.deleteAuthLoginCache(), n;
    } catch (n) {
      throw this.deleteAuthLoginCache(), (e = this.w3mLogger) == null || e.logger.error({ error: n }, "Error checking connection"), n;
    }
  }
  async getChainId() {
    var e;
    try {
      const n = await this.appEvent({
        type: b.APP_GET_CHAIN_ID
      });
      return this.setLastUsedChainId(n.chainId), n;
    } catch (n) {
      throw (e = this.w3mLogger) == null || e.logger.error({ error: n }, "Error getting chain id"), n;
    }
  }
  async getSocialRedirectUri(e) {
    var n;
    try {
      return await this.init(), this.appEvent({
        type: b.APP_GET_SOCIAL_REDIRECT_URI,
        payload: e
      });
    } catch (r) {
      throw (n = this.w3mLogger) == null || n.logger.error({ error: r }, "Error getting social redirect uri"), r;
    }
  }
  async updateEmail(e) {
    var n;
    try {
      const r = await this.appEvent({
        type: b.APP_UPDATE_EMAIL,
        payload: e
      });
      return this.setNewLastEmailLoginTime(), r;
    } catch (r) {
      throw (n = this.w3mLogger) == null || n.logger.error({ error: r }, "Error updating email"), r;
    }
  }
  async updateEmailPrimaryOtp(e) {
    var n;
    try {
      return this.appEvent({
        type: b.APP_UPDATE_EMAIL_PRIMARY_OTP,
        payload: e
      });
    } catch (r) {
      throw (n = this.w3mLogger) == null || n.logger.error({ error: r }, "Error updating email primary otp"), r;
    }
  }
  async updateEmailSecondaryOtp(e) {
    var n;
    try {
      const r = await this.appEvent({
        type: b.APP_UPDATE_EMAIL_SECONDARY_OTP,
        payload: e
      });
      return this.setLoginSuccess(r.newEmail), r;
    } catch (r) {
      throw (n = this.w3mLogger) == null || n.logger.error({ error: r }, "Error updating email secondary otp"), r;
    }
  }
  async syncTheme(e) {
    var n;
    try {
      return this.appEvent({
        type: b.APP_SYNC_THEME,
        payload: e
      });
    } catch (r) {
      throw (n = this.w3mLogger) == null || n.logger.error({ error: r }, "Error syncing theme"), r;
    }
  }
  async syncDappData(e) {
    var n;
    try {
      return this.appEvent({
        type: b.APP_SYNC_DAPP_DATA,
        payload: e
      });
    } catch (r) {
      throw (n = this.w3mLogger) == null || n.logger.error({ error: r }, "Error syncing dapp data"), r;
    }
  }
  async getSmartAccountEnabledNetworks() {
    var e;
    try {
      const n = await this.appEvent({
        type: b.APP_GET_SMART_ACCOUNT_ENABLED_NETWORKS
      });
      return this.persistSmartAccountEnabledNetworks(n.smartAccountEnabledNetworks), n;
    } catch (n) {
      throw this.persistSmartAccountEnabledNetworks([]), (e = this.w3mLogger) == null || e.logger.error({ error: n }, "Error getting smart account enabled networks"), n;
    }
  }
  async setPreferredAccount(e) {
    var n;
    try {
      return this.appEvent({
        type: b.APP_SET_PREFERRED_ACCOUNT,
        payload: { type: e }
      });
    } catch (r) {
      throw (n = this.w3mLogger) == null || n.logger.error({ error: r }, "Error setting preferred account"), r;
    }
  }
  async connect(e) {
    var n, r;
    if (e != null && e.socialUri)
      try {
        await this.init();
        const s = this.getRpcUrl(e.chainId), a = await this.appEvent({
          type: b.APP_CONNECT_SOCIAL,
          payload: {
            uri: e.socialUri,
            preferredAccountType: e.preferredAccountType,
            chainId: e.chainId,
            siwxMessage: e.siwxMessage,
            rpcUrl: s
          }
        });
        return a.userName && this.setSocialLoginSuccess(a.userName), this.setLoginSuccess(a.email), this.setLastUsedChainId(a.chainId), this.user = a, a;
      } catch (s) {
        throw (n = this.w3mLogger) == null || n.logger.error({ error: s }, "Error connecting social"), s;
      }
    else
      try {
        const s = (e == null ? void 0 : e.chainId) || this.getLastUsedChainId() || 1, a = await this.getUser({
          chainId: s,
          preferredAccountType: e == null ? void 0 : e.preferredAccountType,
          siwxMessage: e == null ? void 0 : e.siwxMessage,
          rpcUrl: this.getRpcUrl(s)
        });
        return this.setLoginSuccess(a.email), this.setLastUsedChainId(a.chainId), this.user = a, a;
      } catch (s) {
        throw (r = this.w3mLogger) == null || r.logger.error({ error: s }, "Error connecting"), s;
      }
  }
  async getUser(e) {
    var n;
    try {
      await this.init();
      const r = (e == null ? void 0 : e.chainId) || this.getLastUsedChainId() || 1, s = await this.appEvent({
        type: b.APP_GET_USER,
        payload: { ...e, chainId: r }
      });
      return this.user = s, s;
    } catch (r) {
      throw (n = this.w3mLogger) == null || n.logger.error({ error: r }, "Error connecting"), r;
    }
  }
  async connectSocial({ uri: e, chainId: n, preferredAccountType: r }) {
    var s;
    try {
      await this.init();
      const a = this.getRpcUrl(n), o = await this.appEvent({
        type: b.APP_CONNECT_SOCIAL,
        payload: { uri: e, chainId: n, rpcUrl: a, preferredAccountType: r }
      });
      return o.userName && this.setSocialLoginSuccess(o.userName), o;
    } catch (a) {
      throw (s = this.w3mLogger) == null || s.logger.error({ error: a }, "Error connecting social"), a;
    }
  }
  async getFarcasterUri() {
    var e;
    try {
      return await this.init(), await this.appEvent({
        type: b.APP_GET_FARCASTER_URI
      });
    } catch (n) {
      throw (e = this.w3mLogger) == null || e.logger.error({ error: n }, "Error getting farcaster uri"), n;
    }
  }
  async connectFarcaster() {
    var e;
    try {
      const n = await this.appEvent({
        type: b.APP_CONNECT_FARCASTER
      });
      return n.userName && this.setSocialLoginSuccess(n.userName), n;
    } catch (n) {
      throw (e = this.w3mLogger) == null || e.logger.error({ error: n }, "Error connecting farcaster"), n;
    }
  }
  async switchNetwork({ chainId: e }) {
    var n;
    try {
      const r = this.getRpcUrl(e), s = await this.appEvent({
        type: b.APP_SWITCH_NETWORK,
        payload: { chainId: e, rpcUrl: r }
      });
      return this.setLastUsedChainId(s.chainId), s;
    } catch (r) {
      throw (n = this.w3mLogger) == null || n.logger.error({ error: r }, "Error switching network"), r;
    }
  }
  async disconnect() {
    var e;
    try {
      return this.deleteAuthLoginCache(), await new Promise(async (r) => {
        const s = setTimeout(() => {
          r();
        }, 3e3);
        await this.appEvent({
          type: b.APP_SIGN_OUT
        }), clearTimeout(s), r();
      });
    } catch (n) {
      throw (e = this.w3mLogger) == null || e.logger.error({ error: n }, "Error disconnecting"), n;
    }
  }
  async request(e) {
    var r, s, a, o, i;
    const n = e;
    try {
      if (ue.GET_CHAIN_ID === e.method)
        return this.getLastUsedChainId();
      const l = e.chainNamespace || "eip155", u = (r = this.getActiveCaipNetwork(l)) == null ? void 0 : r.id;
      n.chainNamespace = l, n.chainId = u, n.rpcUrl = this.getRpcUrl(u), (s = this.rpcRequestHandler) == null || s.call(this, e);
      const p = await this.appEvent({
        type: b.APP_RPC_REQUEST,
        payload: n
      });
      return (a = this.rpcSuccessHandler) == null || a.call(this, p, n), p;
    } catch (l) {
      throw (o = this.rpcErrorHandler) == null || o.call(this, l, n), (i = this.w3mLogger) == null || i.logger.error({ error: l }, "Error requesting"), l;
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
    this.w3mFrame.events.onFrameEvent((n) => {
      n.type === b.FRAME_IS_CONNECTED_SUCCESS && n.payload.isConnected && e();
    });
  }
  onNotConnected(e) {
    this.w3mFrame.events.onFrameEvent((n) => {
      n.type === b.FRAME_IS_CONNECTED_ERROR && e(), n.type === b.FRAME_IS_CONNECTED_SUCCESS && !n.payload.isConnected && e();
    });
  }
  onConnect(e) {
    this.w3mFrame.events.onFrameEvent((n) => {
      n.type === b.FRAME_GET_USER_SUCCESS && e(n.payload);
    });
  }
  onSocialConnected(e) {
    this.w3mFrame.events.onFrameEvent((n) => {
      n.type === b.FRAME_CONNECT_SOCIAL_SUCCESS && e(n.payload);
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
    this.w3mFrame.events.onFrameEvent((n) => {
      n.type === b.FRAME_SET_PREFERRED_ACCOUNT_SUCCESS ? e(n.payload) : n.type === b.FRAME_SET_PREFERRED_ACCOUNT_ERROR && e({ type: ue.ACCOUNT_TYPES.EOA });
    });
  }
  getAvailableChainIds() {
    return Object.keys(this.w3mFrame.networks);
  }
  async rejectRpcRequests() {
    var e;
    try {
      await Promise.all(this.openRpcRequests.map(async ({ abortController: n, method: r }) => {
        ue.SAFE_RPC_METHODS.includes(r) || n.abort(), await this.appEvent({
          type: b.APP_RPC_ABORT
        });
      })), this.openRpcRequests = [];
    } catch (n) {
      (e = this.w3mLogger) == null || e.logger.error({ error: n }, "Error aborting RPC request");
    }
  }
  async appEvent(e) {
    let n, r;
    function s(l) {
      return l.replace("@w3m-app/", "");
    }
    const a = [
      b.APP_SYNC_DAPP_DATA,
      b.APP_SYNC_THEME,
      b.APP_SET_PREFERRED_ACCOUNT
    ], o = s(e.type);
    return !this.w3mFrame.iframeIsReady && !a.includes(e.type) && (r = setTimeout(() => {
      var l;
      (l = this.onTimeout) == null || l.call(this, "iframe_load_failed"), this.abortController.abort();
    }, 2e4)), await this.w3mFrame.frameLoadPromise, clearTimeout(r), [
      b.APP_CONNECT_EMAIL,
      b.APP_CONNECT_DEVICE,
      b.APP_CONNECT_OTP,
      b.APP_CONNECT_SOCIAL,
      b.APP_GET_SOCIAL_REDIRECT_URI
    ].map(s).includes(o) && (n = setTimeout(() => {
      var l;
      (l = this.onTimeout) == null || l.call(this, "iframe_request_timeout"), this.abortController.abort();
    }, 12e4)), new Promise((l, u) => {
      var T, P, M;
      const p = Math.random().toString(36).substring(7);
      (M = (T = this.w3mLogger) == null ? void 0 : (P = T.logger).info) == null || M.call(P, { event: e, id: p }, "Sending app event"), this.w3mFrame.events.postAppEvent({ ...e, id: p });
      const h = new AbortController();
      if (o === "RPC_REQUEST") {
        const _ = e;
        this.openRpcRequests = [...this.openRpcRequests, { ..._.payload, abortController: h }];
      }
      h.signal.addEventListener("abort", () => {
        o === "RPC_REQUEST" ? u(new Error("Request was aborted")) : o !== "GET_FARCASTER_URI" && u(new Error("Something went wrong"));
      });
      function R(_, V) {
        var U, ee, fe;
        _.id === p && ((ee = V == null ? void 0 : (U = V.logger).info) == null || ee.call(U, { framEvent: _, id: p }, "Received frame response"), _.type === `@w3m-frame/${o}_SUCCESS` ? (n && clearTimeout(n), r && clearTimeout(r), "payload" in _ && l(_.payload), l(void 0)) : _.type === `@w3m-frame/${o}_ERROR` && (n && clearTimeout(n), r && clearTimeout(r), "payload" in _ && u(new Error(((fe = _.payload) == null ? void 0 : fe.message) || "An error occurred")), u(new Error("An error occurred"))));
      }
      this.w3mFrame.events.registerFrameEventHandler(p, (_) => R(_, this.w3mLogger), this.abortController.signal);
    });
  }
  setNewLastEmailLoginTime() {
    pe.set(b.LAST_EMAIL_LOGIN_TIME, Date.now().toString());
  }
  setSocialLoginSuccess(e) {
    pe.set(b.SOCIAL_USERNAME, e);
  }
  setLoginSuccess(e) {
    e && pe.set(b.EMAIL, e), pe.set(b.EMAIL_LOGIN_USED_KEY, "true"), pe.delete(b.LAST_EMAIL_LOGIN_TIME);
  }
  deleteAuthLoginCache() {
    pe.delete(b.EMAIL_LOGIN_USED_KEY), pe.delete(b.EMAIL), pe.delete(b.LAST_USED_CHAIN_KEY), pe.delete(b.SOCIAL_USERNAME);
  }
  setLastUsedChainId(e) {
    e && pe.set(b.LAST_USED_CHAIN_KEY, String(e));
  }
  getLastUsedChainId() {
    const e = pe.get(b.LAST_USED_CHAIN_KEY) ?? void 0, n = Number(e);
    return isNaN(n) ? e : n;
  }
  persistSmartAccountEnabledNetworks(e) {
    pe.set(b.SMART_ACCOUNT_ENABLED_NETWORKS, e.join(","));
  }
  getRpcUrl(e) {
    var s, a;
    let n = e === void 0 ? void 0 : "eip155";
    typeof e == "string" && (e.includes(":") ? n = (s = Bs.parseCaipNetworkId(e)) == null ? void 0 : s.chainNamespace : Number.isInteger(Number(e)) ? n = "eip155" : n = "solana");
    const r = this.getActiveCaipNetwork(n);
    return (a = r == null ? void 0 : r.rpcUrls.default.http) == null ? void 0 : a[0];
  }
}
class Pt {
  // eslint-disable-next-line @typescript-eslint/no-empty-function -- This is a singleton
  constructor() {
  }
  static getInstance({ projectId: e, chainId: n, enableLogger: r, onTimeout: s, abortController: a, getActiveCaipNetwork: o }) {
    return Pt.instance || (Pt.instance = new ci({
      projectId: e,
      chainId: n,
      enableLogger: r,
      onTimeout: s,
      abortController: a,
      getActiveCaipNetwork: o
    })), Pt.instance;
  }
}
const li = {
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
}, Hn = {
  filterOutDuplicatesByRDNS(t) {
    const e = m.state.enableEIP6963 ? w.state.connectors : [], n = C.getRecentWallets(), r = e.map((i) => {
      var l;
      return (l = i.info) == null ? void 0 : l.rdns;
    }).filter(Boolean), s = n.map((i) => i.rdns).filter(Boolean), a = r.concat(s);
    if (a.includes("io.metamask.mobile") && O.isMobile()) {
      const i = a.indexOf("io.metamask.mobile");
      a[i] = "io.metamask";
    }
    return t.filter((i) => !(i != null && i.rdns && a.includes(String(i.rdns)) || !(i != null && i.rdns) && e.some((u) => u.name === i.name)));
  },
  filterOutDuplicatesByIds(t) {
    const e = w.state.connectors.filter((i) => i.type === "ANNOUNCED" || i.type === "INJECTED"), n = C.getRecentWallets(), r = e.map((i) => i.explorerId), s = n.map((i) => i.id), a = r.concat(s);
    return t.filter((i) => !a.includes(i == null ? void 0 : i.id));
  },
  filterOutDuplicateWallets(t) {
    const e = this.filterOutDuplicatesByRDNS(t);
    return this.filterOutDuplicatesByIds(e);
  },
  markWalletsAsInstalled(t) {
    const { connectors: e } = w.state, { featuredWalletIds: n } = m.state, r = e.filter((o) => o.type === "ANNOUNCED").reduce((o, i) => {
      var l;
      return (l = i.info) != null && l.rdns && (o[i.info.rdns] = !0), o;
    }, {});
    return t.map((o) => ({
      ...o,
      installed: !!o.rdns && !!r[o.rdns ?? ""]
    })).sort((o, i) => {
      const l = Number(i.installed) - Number(o.installed);
      if (l !== 0)
        return l;
      if (n != null && n.length) {
        const u = n.indexOf(o.id), p = n.indexOf(i.id);
        if (u !== -1 && p !== -1)
          return u - p;
        if (u !== -1)
          return -1;
        if (p !== -1)
          return 1;
      }
      return 0;
    });
  },
  getConnectOrderMethod(t, e) {
    var l;
    const n = (t == null ? void 0 : t.connectMethodsOrder) || ((l = m.state.features) == null ? void 0 : l.connectMethodsOrder), r = e || w.state.connectors;
    if (n)
      return n;
    const { injected: s, announced: a } = on.getConnectorsByType(r, x.state.recommended, x.state.featured), o = s.filter(on.showConnector), i = a.filter(on.showConnector);
    return o.length || i.length ? ["wallet", "email", "social"] : li.DEFAULT_CONNECT_METHOD_ORDER;
  },
  isExcluded(t) {
    const e = !!t.rdns && x.state.excludedWallets.some((r) => r.rdns === t.rdns), n = !!t.name && x.state.excludedWallets.some((r) => we.isLowerCaseMatch(r.name, t.name));
    return e || n;
  },
  markWalletsWithDisplayIndex(t) {
    return t.map((e, n) => ({ ...e, display_index: n }));
  }
}, on = {
  getConnectorsByType(t, e, n) {
    const { customWallets: r } = m.state, s = C.getRecentWallets(), a = Hn.filterOutDuplicateWallets(e), o = Hn.filterOutDuplicateWallets(n), i = t.filter((h) => h.type === "MULTI_CHAIN"), l = t.filter((h) => h.type === "ANNOUNCED"), u = t.filter((h) => h.type === "INJECTED"), p = t.filter((h) => h.type === "EXTERNAL");
    return {
      custom: r,
      recent: s,
      external: p,
      multiChain: i,
      announced: l,
      injected: u,
      recommended: a,
      featured: o
    };
  },
  showConnector(t) {
    var s;
    const e = (s = t.info) == null ? void 0 : s.rdns, n = !!e && x.state.excludedWallets.some((a) => !!a.rdns && a.rdns === e), r = !!t.name && x.state.excludedWallets.some((a) => we.isLowerCaseMatch(a.name, t.name));
    return !(t.type === "INJECTED" && (t.name === "Browser Wallet" && (!O.isMobile() || O.isMobile() && !e && !E.checkInstalled()) || n || r) || (t.type === "ANNOUNCED" || t.type === "EXTERNAL") && (n || r));
  },
  getIsConnectedWithWC() {
    return Array.from(d.state.chains.values()).some((n) => w.getConnectorId(n.namespace) === f.CONNECTOR_ID.WALLET_CONNECT);
  },
  getConnectorTypeOrder({ recommended: t, featured: e, custom: n, recent: r, announced: s, injected: a, multiChain: o, external: i, overriddenConnectors: l = ((u) => (u = m.state.features) == null ? void 0 : u.connectorTypeOrder)() ?? [] }) {
    const R = [
      { type: "walletConnect", isEnabled: m.state.enableWalletConnect },
      { type: "recent", isEnabled: r.length > 0 },
      { type: "injected", isEnabled: [...a, ...s, ...o].length > 0 },
      { type: "featured", isEnabled: e.length > 0 },
      { type: "custom", isEnabled: n && n.length > 0 },
      { type: "external", isEnabled: i.length > 0 },
      { type: "recommended", isEnabled: t.length > 0 }
    ].filter((_) => _.isEnabled), T = new Set(R.map((_) => _.type)), P = l.filter((_) => T.has(_)).map((_) => ({ type: _, isEnabled: !0 })), M = R.filter(({ type: _ }) => !P.some(({ type: U }) => U === _));
    return Array.from(new Set([...P, ...M].map(({ type: _ }) => _)));
  },
  getAuthName({ email: t, socialUsername: e, socialProvider: n }) {
    return e ? n && n === "discord" && e.endsWith("0") ? e.slice(0, -1) : e : t.length > 30 ? `${t.slice(0, -3)}...` : t;
  },
  async fetchProviderData(t) {
    var e, n;
    try {
      if (t.name === "Browser Wallet" && !O.isMobile())
        return { accounts: [], chainId: void 0 };
      if (t.id === f.CONNECTOR_ID.AUTH)
        return { accounts: [], chainId: void 0 };
      const [r, s] = await Promise.all([
        (e = t.provider) == null ? void 0 : e.request({ method: "eth_accounts" }),
        (n = t.provider) == null ? void 0 : n.request({ method: "eth_chainId" }).then((a) => Number(a))
      ]);
      return { accounts: r, chainId: s };
    } catch (r) {
      return console.warn(`Failed to fetch provider data for ${t.name}`, r), { accounts: [], chainId: void 0 };
    }
  }
};
let Ut, et, tt;
function vi(t, e) {
  Ut = document.createElement("style"), et = document.createElement("style"), tt = document.createElement("style"), Ut.textContent = At(t).core.cssText, et.textContent = At(t).dark.cssText, tt.textContent = At(t).light.cssText, document.head.appendChild(Ut), document.head.appendChild(et), document.head.appendChild(tt), Sr(e);
}
function Sr(t) {
  et && tt && (t === "light" ? (et.removeAttribute("media"), tt.media = "enabled") : (tt.removeAttribute("media"), et.media = "enabled"));
}
function di(t) {
  Ut && et && tt && (Ut.textContent = At(t).core.cssText, et.textContent = At(t).dark.cssText, tt.textContent = At(t).light.cssText);
}
function At(t) {
  return {
    core: Et`
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
        --w3m-color-mix-strength: ${ke(t != null && t["--w3m-color-mix-strength"] ? `${t["--w3m-color-mix-strength"]}%` : "0%")};
        --w3m-font-family: ${ke((t == null ? void 0 : t["--w3m-font-family"]) || "Inter, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;")};
        --w3m-font-size-master: ${ke((t == null ? void 0 : t["--w3m-font-size-master"]) || "10px")};
        --w3m-border-radius-master: ${ke((t == null ? void 0 : t["--w3m-border-radius-master"]) || "4px")};
        --w3m-z-index: ${ke((t == null ? void 0 : t["--w3m-z-index"]) || 999)};

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
    light: Et`
      :root {
        --w3m-color-mix: ${ke((t == null ? void 0 : t["--w3m-color-mix"]) || "#fff")};
        --w3m-accent: ${ke(ze(t, "dark")["--w3m-accent"])};
        --w3m-default: #fff;

        --wui-color-modal-bg-base: ${ke(ze(t, "dark")["--w3m-background"])};
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
    dark: Et`
      :root {
        --w3m-color-mix: ${ke((t == null ? void 0 : t["--w3m-color-mix"]) || "#000")};
        --w3m-accent: ${ke(ze(t, "light")["--w3m-accent"])};
        --w3m-default: #000;

        --wui-color-modal-bg-base: ${ke(ze(t, "light")["--w3m-background"])};
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
const Ti = Et`
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
`, Si = Et`
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
`, bi = Et`
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
`, cn = {
  hexStringToNumber(t) {
    const e = t.startsWith("0x") ? t.slice(2) : t;
    return parseInt(e, 16);
  },
  numberToHexString(t) {
    return `0x${t.toString(16)}`;
  },
  async getUserInfo(t) {
    const [e, n] = await Promise.all([
      cn.getAddresses(t),
      cn.getChainId(t)
    ]);
    return { chainId: n, addresses: e };
  },
  async getChainId(t) {
    const e = await t.request({ method: "eth_chainId" });
    return Number(e);
  },
  async getAddress(t) {
    const [e] = await t.request({ method: "eth_accounts" });
    return e;
  },
  async getAddresses(t) {
    return await t.request({ method: "eth_accounts" });
  },
  async addEthereumChain(t, e) {
    var r, s;
    const n = ((r = e.rpcUrls.chainDefault) == null ? void 0 : r.http) || [];
    await t.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: cn.numberToHexString(e.id),
          rpcUrls: [...n],
          chainName: e.name,
          nativeCurrency: {
            name: e.nativeCurrency.name,
            decimals: e.nativeCurrency.decimals,
            symbol: e.nativeCurrency.symbol
          },
          blockExplorerUrls: [(s = e.blockExplorers) == null ? void 0 : s.default.url],
          iconUrls: [Dt.NetworkImageIds[e.id]]
        }
      ]
    });
  }
}, mt = {
  ACCOUNT_INDEXES: {
    PAYMENT: 0,
    ORDINAL: 1
  }
};
function Jt(t) {
  return {
    formatters: void 0,
    fees: void 0,
    serializers: void 0,
    ...t
  };
}
const ar = Jt({
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
}), or = Jt({
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
Jt({
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
Jt({
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
Jt({
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
const br = {
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
}, $e = {
  getMethodsByChainNamespace(t) {
    return br[t] || [];
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
    const n = { ...t }, r = /* @__PURE__ */ new Set();
    if (e.methods && Object.keys(e.methods).forEach((s) => r.add(s)), e.chains && Object.keys(e.chains).forEach((s) => r.add(s)), e.events && Object.keys(e.events).forEach((s) => r.add(s)), e.rpcMap && Object.keys(e.rpcMap).forEach((s) => {
      const [a] = s.split(":");
      a && r.add(a);
    }), r.forEach((s) => {
      n[s] || (n[s] = this.createDefaultNamespace(s));
    }), e.methods && Object.entries(e.methods).forEach(([s, a]) => {
      n[s] && (n[s].methods = a);
    }), e.chains && Object.entries(e.chains).forEach(([s, a]) => {
      n[s] && (n[s].chains = a);
    }), e.events && Object.entries(e.events).forEach(([s, a]) => {
      n[s] && (n[s].events = a);
    }), e.rpcMap) {
      const s = /* @__PURE__ */ new Set();
      Object.entries(e.rpcMap).forEach(([a, o]) => {
        const [i, l] = a.split(":");
        !i || !l || !n[i] || (n[i].rpcMap || (n[i].rpcMap = {}), s.has(i) || (n[i].rpcMap = {}, s.add(i)), n[i].rpcMap[l] = o);
      });
    }
    return n;
  },
  createNamespaces(t, e) {
    const n = t.reduce((r, s) => {
      const { id: a, chainNamespace: o, rpcUrls: i } = s, l = i.default.http[0];
      r[o] || (r[o] = this.createDefaultNamespace(o));
      const u = `${o}:${a}`, p = r[o];
      switch (p.chains.push(u), u) {
        case ar.caipNetworkId:
          p.chains.push(ar.deprecatedCaipNetworkId);
          break;
        case or.caipNetworkId:
          p.chains.push(or.deprecatedCaipNetworkId);
          break;
      }
      return p != null && p.rpcMap && l && (p.rpcMap[a] = l), r;
    }, {});
    return this.applyNamespaceOverrides(n, e);
  },
  resolveReownName: async (t) => {
    var r;
    const e = await kt.resolveName(t);
    return ((r = (Object.values(e == null ? void 0 : e.addresses) || [])[0]) == null ? void 0 : r.address) || !1;
  },
  getChainsFromNamespaces(t = {}) {
    return Object.values(t).flatMap((e) => {
      const n = e.chains || [], r = e.accounts.map((s) => {
        const [a, o] = s.split(":");
        return `${a}:${o}`;
      });
      return Array.from(/* @__PURE__ */ new Set([...n, ...r]));
    });
  },
  isSessionEventData(t) {
    return typeof t == "object" && t !== null && "id" in t && "topic" in t && "params" in t && typeof t.params == "object" && t.params !== null && "chainId" in t.params && "event" in t.params && typeof t.params.event == "object" && t.params.event !== null;
  },
  isOriginAllowed(t, e, n) {
    for (const r of [...e, ...n])
      if (r.includes("*")) {
        const a = `^${r.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&").replace(/\\\*/gu, ".*")}$`;
        if (new RegExp(a, "u").test(t))
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
  },
  listenWcProvider({ universalProvider: t, namespace: e, onConnect: n, onDisconnect: r, onAccountsChanged: s, onChainChanged: a, onDisplayUri: o }) {
    n && t.on("connect", () => {
      const i = $e.getWalletConnectAccounts(t, e);
      n(i);
    }), r && t.on("disconnect", () => {
      r();
    }), s && t.on("session_event", (i) => {
      if ($e.isSessionEventData(i)) {
        const { name: l, data: u } = i.params.event;
        if (l === "accountsChanged" && Array.isArray(u)) {
          const p = u.filter((h) => O.isCaipAddress(h)).map((h) => Se.parseCaipAddress(h)).filter((h) => h.chainNamespace === e);
          s(p);
        }
      }
    }), a && t.on("chainChanged", (i) => {
      a(i);
    }), o && t.on("display_uri", (i) => {
      o(i);
    });
  },
  getWalletConnectAccounts(t, e) {
    var s, a, o, i;
    const n = /* @__PURE__ */ new Set(), r = (i = (o = (a = (s = t == null ? void 0 : t.session) == null ? void 0 : s.namespaces) == null ? void 0 : a[e]) == null ? void 0 : o.accounts) == null ? void 0 : i.map((l) => Se.parseCaipAddress(l)).filter(({ address: l }) => n.has(l.toLowerCase()) ? !1 : (n.add(l.toLowerCase()), !0));
    return r && r.length > 0 ? r : [];
  }
};
class ui {
  constructor(e) {
    this.namespace = e.namespace;
  }
  async syncConnections(e) {
    switch (this.namespace) {
      case f.CHAIN.EVM:
        await this.syncEVMConnections(e);
        break;
      case f.CHAIN.SOLANA:
        await this.syncSolanaConnections(e);
        break;
      case f.CHAIN.BITCOIN:
        await this.syncBitcoinConnections(e);
        break;
      default:
        throw new Error(`Unsupported chain namespace: ${this.namespace}`);
    }
  }
  async syncEVMConnections({ connectors: e, caipNetworks: n, universalProvider: r, getConnectionStatusInfo: s, onConnection: a, onListenProvider: o }) {
    await Promise.all(e.filter((i) => {
      const { hasDisconnected: l, hasConnected: u } = s(i.id);
      return !l && u;
    }).map(async (i) => {
      if (i.id === f.CONNECTOR_ID.WALLET_CONNECT) {
        const l = $e.getWalletConnectAccounts(r, this.namespace), u = n.find((p) => {
          var h, R;
          return p.chainNamespace === this.namespace && p.id.toString() === ((R = (h = l[0]) == null ? void 0 : h.chainId) == null ? void 0 : R.toString());
        });
        l.length > 0 && a({
          connectorId: i.id,
          accounts: l.map((p) => ({ address: p.address })),
          caipNetwork: u
        });
      } else {
        const { accounts: l, chainId: u } = await on.fetchProviderData(i);
        if (l.length > 0 && u) {
          const p = n.find((h) => h.chainNamespace === this.namespace && h.id.toString() === u.toString());
          a({
            connectorId: i.id,
            accounts: l.map((h) => ({ address: h })),
            caipNetwork: p
          }), i.provider && i.id !== f.CONNECTOR_ID.AUTH && i.id !== f.CONNECTOR_ID.WALLET_CONNECT && o(i.id, i.provider);
        }
      }
    }));
  }
  async syncSolanaConnections({ connectors: e, caipNetwork: n, universalProvider: r, getConnectionStatusInfo: s, onConnection: a, onListenProvider: o }) {
    await Promise.all(e.filter((i) => {
      const { hasDisconnected: l, hasConnected: u } = s(i.id);
      return !l && u;
    }).map(async (i) => {
      if (i.id === f.CONNECTOR_ID.WALLET_CONNECT) {
        const l = $e.getWalletConnectAccounts(r, this.namespace);
        l.length > 0 && a({
          connectorId: i.id,
          accounts: l.map((u) => ({ address: u.address })),
          caipNetwork: n
        });
      } else {
        const l = await i.connect({
          chainId: n == null ? void 0 : n.id
        });
        l && (a({
          connectorId: i.id,
          accounts: [{ address: l }],
          caipNetwork: n
        }), o(i.id, i.provider));
      }
    }));
  }
  async syncBitcoinConnections({ connectors: e, caipNetwork: n, universalProvider: r, getConnectionStatusInfo: s, onConnection: a, onListenProvider: o }) {
    await Promise.all(e.filter((i) => {
      const { hasDisconnected: l, hasConnected: u } = s(i.id);
      return !l && u;
    }).map(async (i) => {
      var R, T, P, M, _, V;
      if (i.id === f.CONNECTOR_ID.WALLET_CONNECT) {
        const U = $e.getWalletConnectAccounts(r, this.namespace);
        U.length > 0 && a({
          connectorId: i.id,
          accounts: U.map((ee) => ({ address: ee.address })),
          caipNetwork: n
        });
        return;
      }
      const l = await i.connect(), u = await i.getAccountAddresses();
      let p = u == null ? void 0 : u.map((U) => O.createAccount(f.CHAIN.BITCOIN, U.address, U.purpose || "payment", U.publicKey, U.path));
      if (p && p.length > 1 && (p = [
        {
          namespace: f.CHAIN.BITCOIN,
          publicKey: ((R = p[mt.ACCOUNT_INDEXES.PAYMENT]) == null ? void 0 : R.publicKey) ?? "",
          path: ((T = p[mt.ACCOUNT_INDEXES.PAYMENT]) == null ? void 0 : T.path) ?? "",
          address: ((P = p[mt.ACCOUNT_INDEXES.PAYMENT]) == null ? void 0 : P.address) ?? "",
          type: "payment"
        },
        {
          namespace: f.CHAIN.BITCOIN,
          publicKey: ((M = p[mt.ACCOUNT_INDEXES.ORDINAL]) == null ? void 0 : M.publicKey) ?? "",
          path: ((_ = p[mt.ACCOUNT_INDEXES.ORDINAL]) == null ? void 0 : _.path) ?? "",
          address: ((V = p[mt.ACCOUNT_INDEXES.ORDINAL]) == null ? void 0 : V.address) ?? "",
          type: "ordinal"
        }
      ]), !(i.chains.find((U) => U.id === (n == null ? void 0 : n.id)) || i.chains[0]))
        throw new Error("The connector does not support any of the requested chains");
      l && (o(i.id, i.provider), a({
        connectorId: i.id,
        accounts: p.map((U) => ({ address: U.address, type: U.type })),
        caipNetwork: n
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
  getConnection({ address: e, connectorId: n, connections: r, connectors: s }) {
    if (n) {
      const o = r.find((u) => we.isLowerCaseMatch(u.connectorId, n));
      if (!o)
        return null;
      const i = s.find((u) => we.isLowerCaseMatch(u.id, o.connectorId)), l = e ? o.accounts.find((u) => we.isLowerCaseMatch(u.address, e)) : o.accounts[0];
      return { ...o, account: l, connector: i };
    }
    const a = r.find((o) => o.accounts.length > 0 && s.some((i) => we.isLowerCaseMatch(i.id, o.connectorId)));
    if (a) {
      const [o] = a.accounts, i = s.find((l) => we.isLowerCaseMatch(l.id, a.connectorId));
      return {
        ...a,
        account: o,
        connector: i
      };
    }
    return null;
  }
}
const wt = {
  ERROR_CODE_UNRECOGNIZED_CHAIN_ID: 4902,
  ERROR_CODE_DEFAULT: 5e3,
  ERROR_INVALID_CHAIN_ID: 32603,
  DEFAULT_ALLOWED_ANCESTORS: [
    "http://localhost:*",
    "https://localhost:*",
    "http://127.0.0.1:*",
    "https://127.0.0.1:*",
    "https://*.pages.dev",
    "https://*.vercel.app",
    "https://*.ngrok-free.app",
    "https://secure-mobile.walletconnect.com",
    "https://secure-mobile.walletconnect.org"
  ]
};
class Ir {
  constructor({ provider: e, namespace: n }) {
    this.id = f.CONNECTOR_ID.WALLET_CONNECT, this.name = Dt.ConnectorNamesMap[f.CONNECTOR_ID.WALLET_CONNECT], this.type = "WALLET_CONNECT", this.imageId = Dt.ConnectorImageIds[f.CONNECTOR_ID.WALLET_CONNECT], this.getCaipNetworks = d.getCaipNetworks.bind(d), this.caipNetworks = this.getCaipNetworks(), this.provider = e, this.chain = n;
  }
  get chains() {
    return this.getCaipNetworks();
  }
  async connectWalletConnect() {
    if (!await this.authenticate()) {
      const n = this.getCaipNetworks(), r = m.state.universalProviderConfigOverride, s = $e.createNamespaces(n, r);
      await this.provider.connect({ optionalNamespaces: s });
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
    const e = this.chains.map((n) => n.caipNetworkId);
    return Ue.universalProviderAuthenticate({
      universalProvider: this.provider,
      chains: e,
      methods: pi
    });
  }
}
const pi = [
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
], hi = [
  f.CONNECTOR_ID.AUTH,
  f.CONNECTOR_ID.WALLET_CONNECT
];
class fi {
  /**
   * Creates an instance of AdapterBlueprint.
   * @param {AdapterBlueprint.Params} params - The parameters for initializing the adapter
   */
  constructor(e) {
    this.availableConnectors = [], this.availableConnections = [], this.providerHandlers = {}, this.eventListeners = /* @__PURE__ */ new Map(), this.getCaipNetworks = (n) => d.getCaipNetworks(n), this.getConnectorId = (n) => w.getConnectorId(n), e && this.construct(e), e != null && e.namespace && (this.connectionManager = new ui({
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
  onAuthConnected({ accounts: e, chainId: n }) {
    const r = this.getCaipNetworks().filter((s) => s.chainNamespace === this.namespace).find((s) => s.id.toString() === (n == null ? void 0 : n.toString()));
    e && r && this.addConnection({
      connectorId: f.CONNECTOR_ID.AUTH,
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
      id: f.CONNECTOR_ID.AUTH,
      type: "AUTH",
      name: f.CONNECTOR_NAMES.AUTH,
      provider: e,
      imageId: Dt.ConnectorImageIds[f.CONNECTOR_ID.AUTH],
      chain: this.namespace,
      chains: []
    });
  }
  /**
   * Adds one or more connectors to the available connectors list.
   * @param {...Connector} connectors - The connectors to add
   */
  addConnector(...e) {
    const n = /* @__PURE__ */ new Set();
    this.availableConnectors = [...e, ...this.availableConnectors].filter((r) => n.has(r.id) ? !1 : (n.add(r.id), !0)), this.emit("connectors", this.availableConnectors);
  }
  /**
   * Adds connections to the available connections list
   * @param {...Connection} connections - The connections to add
   */
  addConnection(...e) {
    const n = /* @__PURE__ */ new Set();
    this.availableConnections = [...e, ...this.availableConnections].filter((r) => n.has(r.connectorId.toLowerCase()) ? !1 : (n.add(r.connectorId.toLowerCase()), !0)), this.emit("connections", this.availableConnections);
  }
  /**
   * Deletes a connection from the available connections list
   * @param {string} connectorId - The connector ID of the connection to delete
   */
  deleteConnection(e) {
    this.availableConnections = this.availableConnections.filter((n) => !we.isLowerCaseMatch(n.connectorId, e)), this.emit("connections", this.availableConnections);
  }
  /**
   * Clears all connections from the available connections list
   * @param {boolean} emit - Whether to emit the connections event
   */
  clearConnections(e = !1) {
    this.availableConnections = [], e && this.emit("connections", this.availableConnections);
  }
  setStatus(e, n) {
    I.setStatus(e, n);
  }
  /**
   * Adds an event listener for a specific event.
   * @template T
   * @param {T} eventName - The name of the event
   * @param {EventCallback<T>} callback - The callback function to be called when the event is emitted
   */
  on(e, n) {
    var r;
    this.eventListeners.has(e) || this.eventListeners.set(e, /* @__PURE__ */ new Set()), (r = this.eventListeners.get(e)) == null || r.add(n);
  }
  /**
   * Removes an event listener for a specific event.
   * @template T
   * @param {T} eventName - The name of the event
   * @param {EventCallback<T>} callback - The callback function to be removed
   */
  off(e, n) {
    const r = this.eventListeners.get(e);
    r && r.delete(n);
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
  emit(e, n) {
    const r = this.eventListeners.get(e);
    r && r.forEach((s) => s(n));
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
    const { caipNetwork: n, providerType: r } = e;
    if (!e.provider)
      return;
    const s = "provider" in e.provider ? e.provider.provider : e.provider;
    if (r === "WALLET_CONNECT") {
      s.setDefaultChain(n.caipNetworkId);
      return;
    }
    if (s && r === "AUTH") {
      const a = s, o = Fe(n.chainNamespace);
      await a.switchNetwork({ chainId: n.caipNetworkId });
      const i = await a.getUser({
        chainId: n.caipNetworkId,
        preferredAccountType: o
      });
      this.emit("switchNetwork", i);
    }
  }
  getWalletConnectConnector() {
    const e = this.connectors.find((n) => n instanceof Ir);
    if (!e)
      throw new Error("WalletConnectConnector not found");
    return e;
  }
  /**
   * Handles connect event for a specific connector.
   * @param {string[]} accounts - The accounts that changed
   * @param {string} connectorId - The ID of the connector
   */
  onConnect(e, n) {
    if (e.length > 0) {
      const { address: r, chainId: s } = O.getAccount(e[0]), a = this.getCaipNetworks().filter((i) => i.chainNamespace === this.namespace).find((i) => i.id.toString() === (s == null ? void 0 : s.toString())), o = this.connectors.find((i) => i.id === n);
      r && (this.emit("accountChanged", {
        address: r,
        chainId: s,
        connector: o
      }), this.addConnection({
        connectorId: n,
        accounts: e.map((i) => {
          const { address: l } = O.getAccount(i);
          return { address: l };
        }),
        caipNetwork: a
      }));
    }
  }
  /**
   * Handles accounts changed event for a specific connector.
   * @param {string[]} accounts - The accounts that changed
   * @param {string} connectorId - The ID of the connector
   */
  onAccountsChanged(e, n, r = !0) {
    var s, a;
    if (e.length > 0) {
      const { address: o } = O.getAccount(e[0]), i = (s = this.connectionManager) == null ? void 0 : s.getConnection({
        connectorId: n,
        connections: this.connections,
        connectors: this.connectors
      });
      o && we.isLowerCaseMatch(this.getConnectorId(f.CHAIN.EVM), n) && this.emit("accountChanged", {
        address: o,
        chainId: (a = i == null ? void 0 : i.caipNetwork) == null ? void 0 : a.id,
        connector: i == null ? void 0 : i.connector
      }), this.addConnection({
        connectorId: n,
        accounts: e.map((l) => {
          const { address: u } = O.getAccount(l);
          return { address: u };
        }),
        caipNetwork: i == null ? void 0 : i.caipNetwork
      });
    } else r && this.onDisconnect(n);
  }
  /**
   * Handles disconnect event for a specific connector.
   * @param {string} connectorId - The ID of the connector
   */
  onDisconnect(e) {
    this.removeProviderListeners(e), this.deleteConnection(e), we.isLowerCaseMatch(this.getConnectorId(f.CHAIN.EVM), e) && this.emitFirstAvailableConnection(), this.connections.length === 0 && this.emit("disconnect");
  }
  /**
   * Handles chain changed event for a specific connector.
   * @param {string} chainId - The ID of the chain that changed
   * @param {string} connectorId - The ID of the connector
   */
  onChainChanged(e, n) {
    var o;
    const r = typeof e == "string" && e.startsWith("0x") ? cn.hexStringToNumber(e).toString() : e.toString(), s = (o = this.connectionManager) == null ? void 0 : o.getConnection({
      connectorId: n,
      connections: this.connections,
      connectors: this.connectors
    }), a = this.getCaipNetworks().filter((i) => i.chainNamespace === this.namespace).find((i) => i.id.toString() === r);
    s && this.addConnection({
      connectorId: n,
      accounts: s.accounts,
      caipNetwork: a
    }), we.isLowerCaseMatch(this.getConnectorId(f.CHAIN.EVM), n) && this.emit("switchNetwork", { chainId: r });
  }
  /**
   * Listens to provider events for a specific connector.
   * @param {string} connectorId - The ID of the connector
   * @param {Provider | CombinedProvider} provider - The provider to listen to
   */
  listenProviderEvents(e, n) {
    if (hi.includes(e))
      return;
    const r = (o) => this.onAccountsChanged(o, e), s = (o) => this.onChainChanged(o, e), a = () => this.onDisconnect(e);
    this.providerHandlers[e] || (n.on("disconnect", a), n.on("accountsChanged", r), n.on("chainChanged", s), this.providerHandlers[e] = {
      provider: n,
      disconnect: a,
      accountsChanged: r,
      chainChanged: s
    });
  }
  /**
   * Removes provider listeners for a specific connector.
   * @param {string} connectorId - The ID of the connector
   */
  removeProviderListeners(e) {
    if (this.providerHandlers[e]) {
      const { provider: n, disconnect: r, accountsChanged: s, chainChanged: a } = this.providerHandlers[e];
      n.removeListener("disconnect", r), n.removeListener("accountsChanged", s), n.removeListener("chainChanged", a), this.providerHandlers[e] = null;
    }
  }
  /**
   * Emits the first available connection.
   */
  emitFirstAvailableConnection() {
    var n, r;
    const e = (n = this.connectionManager) == null ? void 0 : n.getConnection({
      connections: this.connections,
      connectors: this.connectors
    });
    if (e) {
      const [s] = e.accounts;
      this.emit("accountChanged", {
        address: s == null ? void 0 : s.address,
        chainId: (r = e.caipNetwork) == null ? void 0 : r.id,
        connector: e.connector
      });
    }
  }
}
class mi extends fi {
  async setUniversalProvider(e) {
    if (!this.namespace)
      throw new Error("UniversalAdapter:setUniversalProvider - namespace is required");
    return this.addConnector(new Ir({
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
    var s, a, o, i;
    const n = this.provider, r = ((i = (o = (a = (s = n == null ? void 0 : n.session) == null ? void 0 : s.namespaces) == null ? void 0 : a[e]) == null ? void 0 : o.accounts) == null ? void 0 : i.map((l) => {
      const [, , u] = l.split(":");
      return u;
    }).filter((l, u, p) => p.indexOf(l) === u)) || [];
    return Promise.resolve({
      accounts: r.map((l) => O.createAccount(e, l, e === "bip122" ? "payment" : "eoa"))
    });
  }
  async syncConnectors() {
    return Promise.resolve();
  }
  async getBalance(e) {
    var a, o, i, l, u;
    if (!(e.caipNetwork && Q.BALANCE_SUPPORTED_CHAINS.includes((a = e.caipNetwork) == null ? void 0 : a.chainNamespace)) || (o = e.caipNetwork) != null && o.testnet)
      return {
        balance: "0.00",
        symbol: ((i = e.caipNetwork) == null ? void 0 : i.nativeCurrency.symbol) || ""
      };
    if (I.state.balanceLoading && e.chainId === ((l = d.state.activeCaipNetwork) == null ? void 0 : l.id))
      return {
        balance: I.state.balance || "0.00",
        symbol: I.state.balanceSymbol || ""
      };
    const s = (await I.fetchTokenBalance()).find((p) => {
      var h, R;
      return p.chainId === `${(h = e.caipNetwork) == null ? void 0 : h.chainNamespace}:${e.chainId}` && p.symbol === ((R = e.caipNetwork) == null ? void 0 : R.nativeCurrency.symbol);
    });
    return {
      balance: (s == null ? void 0 : s.quantity.numeric) || "0.00",
      symbol: (s == null ? void 0 : s.symbol) || ((u = e.caipNetwork) == null ? void 0 : u.nativeCurrency.symbol) || ""
    };
  }
  async signMessage(e) {
    var o, i, l;
    const { provider: n, message: r, address: s } = e;
    if (!n)
      throw new Error("UniversalAdapter:signMessage - provider is undefined");
    let a = "";
    return ((o = d.state.activeCaipNetwork) == null ? void 0 : o.chainNamespace) === f.CHAIN.SOLANA ? a = (await n.request({
      method: "solana_signMessage",
      params: {
        message: kr.encode(new TextEncoder().encode(r)),
        pubkey: s
      }
    }, (i = d.state.activeCaipNetwork) == null ? void 0 : i.caipNetworkId)).signature : a = await n.request({
      method: "personal_sign",
      params: [r, s]
    }, (l = d.state.activeCaipNetwork) == null ? void 0 : l.caipNetworkId), { signature: a };
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
    var s, a, o, i, l, u;
    const { caipNetwork: n } = e, r = this.getWalletConnectConnector();
    if (n.chainNamespace === f.CHAIN.EVM)
      try {
        await ((s = r.provider) == null ? void 0 : s.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: qn(n.id) }]
        }));
      } catch (p) {
        if (p.code === wt.ERROR_CODE_UNRECOGNIZED_CHAIN_ID || p.code === wt.ERROR_INVALID_CHAIN_ID || p.code === wt.ERROR_CODE_DEFAULT || ((o = (a = p == null ? void 0 : p.data) == null ? void 0 : a.originalError) == null ? void 0 : o.code) === wt.ERROR_CODE_UNRECOGNIZED_CHAIN_ID)
          try {
            await ((u = r.provider) == null ? void 0 : u.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: qn(n.id),
                  rpcUrls: [(i = n == null ? void 0 : n.rpcUrls.chainDefault) == null ? void 0 : i.http],
                  chainName: n.name,
                  nativeCurrency: n.nativeCurrency,
                  blockExplorerUrls: [(l = n.blockExplorers) == null ? void 0 : l.default.url]
                }
              ]
            }));
          } catch {
            throw new Error("Chain is not supported");
          }
      }
    r.provider.setDefaultChain(n.caipNetworkId);
  }
  getWalletConnectProvider() {
    const e = this.connectors.find((r) => r.type === "WALLET_CONNECT");
    return e == null ? void 0 : e.provider;
  }
}
const gi = [
  "email",
  "socials",
  "swaps",
  "onramp",
  "activity",
  "reownBranding",
  "multiWallet"
], rn = {
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
    processFallback: (t) => t === void 0 ? Q.DEFAULT_REMOTE_FEATURES.email : !!t
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
      return t.isEnabled && e.length > 0 ? e.filter((n) => n !== "email") : !1;
    },
    processFallback: (t) => t === void 0 ? Q.DEFAULT_REMOTE_FEATURES.socials : typeof t == "boolean" ? t ? Q.DEFAULT_REMOTE_FEATURES.socials : !1 : t
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
    processFallback: (t) => t === void 0 ? Q.DEFAULT_REMOTE_FEATURES.swaps : typeof t == "boolean" ? t ? Q.DEFAULT_REMOTE_FEATURES.swaps : !1 : t
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
    processFallback: (t) => t === void 0 ? Q.DEFAULT_REMOTE_FEATURES.onramp : typeof t == "boolean" ? t ? Q.DEFAULT_REMOTE_FEATURES.onramp : !1 : t
  },
  activity: {
    apiFeatureName: "activity",
    localFeatureName: "history",
    returnType: !1,
    isLegacy: !0,
    isAvailableOnBasic: !1,
    processApi: (t) => !!t.isEnabled,
    processFallback: (t) => t === void 0 ? Q.DEFAULT_REMOTE_FEATURES.activity : !!t
  },
  reownBranding: {
    apiFeatureName: "reown_branding",
    localFeatureName: "reownBranding",
    returnType: !1,
    isLegacy: !1,
    isAvailableOnBasic: !1,
    processApi: (t) => !!t.isEnabled,
    processFallback: (t) => t === void 0 ? Q.DEFAULT_REMOTE_FEATURES.reownBranding : !!t
  },
  multiWallet: {
    apiFeatureName: "multi_wallet",
    localFeatureName: "multiWallet",
    returnType: !1,
    isLegacy: !1,
    isAvailableOnBasic: !1,
    processApi: (t) => !!t.isEnabled,
    processFallback: () => Q.DEFAULT_REMOTE_FEATURES.multiWallet
  }
}, Ci = {
  localSettingsOverridden: /* @__PURE__ */ new Set(),
  getApiConfig(t, e) {
    return e == null ? void 0 : e.find((n) => n.id === t);
  },
  addWarning(t, e) {
    if (t !== void 0) {
      const n = rn[e], r = n.isLegacy ? `"features.${n.localFeatureName}" (now "${e}")` : `"features.${e}"`;
      this.localSettingsOverridden.add(r);
    }
  },
  processFeature(t, e, n, r, s) {
    const a = rn[t], o = e[a.localFeatureName];
    if (s && !a.isAvailableOnBasic)
      return !1;
    if (r) {
      const i = this.getApiConfig(a.apiFeatureName, n);
      return (i == null ? void 0 : i.config) === null ? this.processFallbackFeature(t, o) : i != null && i.config ? (o !== void 0 && this.addWarning(o, t), this.processApiFeature(t, i)) : !1;
    }
    return this.processFallbackFeature(t, o);
  },
  processApiFeature(t, e) {
    return rn[t].processApi(e);
  },
  processFallbackFeature(t, e) {
    return rn[t].processFallback(e);
  },
  async fetchRemoteFeatures(t) {
    const e = t.basic ?? !1, n = t.features || {};
    this.localSettingsOverridden.clear();
    let r = null, s = !1;
    try {
      r = await x.fetchProjectConfig(), s = r != null;
    } catch (o) {
      console.warn("[Reown Config] Failed to fetch remote project configuration. Using local/default values.", o);
    }
    const a = s && !e ? Q.DEFAULT_REMOTE_FEATURES : Q.DEFAULT_REMOTE_FEATURES_DISABLED;
    try {
      for (const o of gi) {
        const i = this.processFeature(o, n, r, s, e);
        Object.assign(a, { [o]: i });
      }
    } catch (o) {
      return console.warn("[Reown Config] Failed to process the configuration from Cloud. Using default values.", o), Q.DEFAULT_REMOTE_FEATURES;
    }
    if (s && this.localSettingsOverridden.size > 0) {
      const o = `Your local configuration for ${Array.from(this.localSettingsOverridden).join(", ")} was ignored because a remote configuration was successfully fetched. Please manage these features via your project dashboard on dashboard.reown.com.`;
      de.open({
        shortMessage: "Local configuration ignored",
        longMessage: `[Reown Config Notice] ${o}`
      }, "warning");
    }
    return a;
  }
};
class wi {
  constructor(e) {
    this.chainNamespaces = [], this.remoteFeatures = {}, this.reportedAlertErrors = {}, this.getCaipNetwork = (n, r) => {
      var s, a, o;
      if (n) {
        const i = (s = d.getCaipNetworks(n)) == null ? void 0 : s.find((p) => p.id === r);
        if (i)
          return i;
        const l = (a = d.getNetworkData(n)) == null ? void 0 : a.caipNetwork;
        return l || ((o = d.getRequestedCaipNetworks(n).filter((p) => p.chainNamespace === n)) == null ? void 0 : o[0]);
      }
      return d.state.activeCaipNetwork || this.defaultCaipNetwork;
    }, this.getCaipNetworkId = () => {
      const n = this.getCaipNetwork();
      if (n)
        return n.id;
    }, this.getCaipNetworks = (n) => d.getCaipNetworks(n), this.getActiveChainNamespace = () => d.state.activeChain, this.setRequestedCaipNetworks = (n, r) => {
      d.setRequestedCaipNetworks(n, r);
    }, this.getApprovedCaipNetworkIds = () => d.getAllApprovedCaipNetworkIds(), this.getCaipAddress = (n) => d.state.activeChain === n || !n ? d.state.activeCaipAddress : d.getAccountProp("caipAddress", n), this.setClientId = (n) => {
      D.setClientId(n);
    }, this.getProvider = (n) => se.getProvider(n), this.getProviderType = (n) => se.getProviderId(n), this.getPreferredAccountType = (n) => Fe(n), this.setCaipAddress = (n, r) => {
      I.setCaipAddress(n, r);
    }, this.setBalance = (n, r, s) => {
      I.setBalance(n, r, s);
    }, this.setProfileName = (n, r) => {
      I.setProfileName(n, r);
    }, this.setProfileImage = (n, r) => {
      I.setProfileImage(n, r);
    }, this.setUser = (n, r) => {
      I.setUser(n, r);
    }, this.resetAccount = (n) => {
      I.resetAccount(n);
    }, this.setCaipNetwork = (n) => {
      d.setActiveCaipNetwork(n);
    }, this.setCaipNetworkOfNamespace = (n, r) => {
      d.setChainNetworkData(r, { caipNetwork: n });
    }, this.setStatus = (n, r) => {
      I.setStatus(n, r), w.isConnected() ? C.setConnectionStatus("connected") : C.setConnectionStatus("disconnected");
    }, this.getAddressByChainNamespace = (n) => d.getAccountProp("address", n), this.setConnectors = (n) => {
      const r = [...w.state.allConnectors, ...n];
      w.setConnectors(r);
    }, this.setConnections = (n, r) => {
      C.setConnections(n, r), E.setConnections(n, r);
    }, this.fetchIdentity = (n) => D.fetchIdentity(n), this.getReownName = (n) => kt.getNamesForAddress(n), this.getConnectors = () => w.getConnectors(), this.getConnectorImage = (n) => hr.getConnectorImage(n), this.getConnections = (n) => this.remoteFeatures.multiWallet ? dn.getConnectionsData(n).connections : (de.open(f.REMOTE_FEATURES_ALERTS.MULTI_WALLET_NOT_ENABLED.DEFAULT, "info"), []), this.getRecentConnections = (n) => this.remoteFeatures.multiWallet ? dn.getConnectionsData(n).recentConnections : (de.open(f.REMOTE_FEATURES_ALERTS.MULTI_WALLET_NOT_ENABLED.DEFAULT, "info"), []), this.switchConnection = async (n) => {
      if (!this.remoteFeatures.multiWallet) {
        de.open(f.REMOTE_FEATURES_ALERTS.MULTI_WALLET_NOT_ENABLED.DEFAULT, "info");
        return;
      }
      await E.switchConnection(n);
    }, this.deleteConnection = (n) => {
      if (!this.remoteFeatures.multiWallet) {
        de.open(f.REMOTE_FEATURES_ALERTS.MULTI_WALLET_NOT_ENABLED.DEFAULT, "info");
        return;
      }
      C.deleteAddressFromConnection(n), E.syncStorageConnections();
    }, this.setConnectedWalletInfo = (n, r) => {
      const s = se.getProviderId(r), a = n ? { ...n, type: s } : void 0;
      I.setConnectedWalletInfo(a, r);
    }, this.getIsConnectedState = () => !!d.state.activeCaipAddress, this.addAddressLabel = (n, r, s) => {
      I.addAddressLabel(n, r, s);
    }, this.removeAddressLabel = (n, r) => {
      I.removeAddressLabel(n, r);
    }, this.getAddress = (n) => d.state.activeChain === n || !n ? I.state.address : d.getAccountProp("address", n), this.setApprovedCaipNetworksData = (n) => d.setApprovedCaipNetworksData(n), this.resetNetwork = (n) => {
      d.resetNetwork(n);
    }, this.addConnector = (n) => {
      w.addConnector(n);
    }, this.resetWcConnection = () => {
      E.resetWcConnection();
    }, this.setAddressExplorerUrl = (n, r) => {
      I.setAddressExplorerUrl(n, r);
    }, this.setSmartAccountDeployed = (n, r) => {
      I.setSmartAccountDeployed(n, r);
    }, this.setPreferredAccountType = (n, r) => {
      d.setAccountProp("preferredAccountType", n, r);
    }, this.setEIP6963Enabled = (n) => {
      m.setEIP6963Enabled(n);
    }, this.handleUnsafeRPCRequest = () => {
      if (this.isOpen()) {
        if (this.isTransactionStackEmpty())
          return;
        this.redirect("ApproveTransaction");
      } else
        this.open({ view: "ApproveTransaction" });
    }, this.options = e, this.version = e.sdkVersion, this.caipNetworks = this.extendCaipNetworks(e), this.chainNamespaces = this.getChainNamespacesSet(e.adapters, this.caipNetworks), this.defaultCaipNetwork = this.extendDefaultCaipNetwork(e), this.chainAdapters = this.createAdapters(e.adapters), this.readyPromise = this.initialize(e);
  }
  getChainNamespacesSet(e, n) {
    const r = e == null ? void 0 : e.map((a) => a.namespace).filter((a) => !!a);
    if (r != null && r.length)
      return [...new Set(r)];
    const s = n == null ? void 0 : n.map((a) => a.chainNamespace);
    return [...new Set(s)];
  }
  async initialize(e) {
    var n, r, s;
    this.initializeProjectSettings(e), this.initControllers(e), await this.initChainAdapters(), this.sendInitializeEvent(e), m.state.enableReconnect ? (await this.syncExistingConnection(), await this.syncAdapterConnections()) : await this.unSyncExistingConnection(), this.remoteFeatures = await Ci.fetchRemoteFeatures(e), m.setRemoteFeatures(this.remoteFeatures), this.remoteFeatures.onramp && Mn.setOnrampProviders(this.remoteFeatures.onramp), ((n = m.state.remoteFeatures) != null && n.email || Array.isArray((r = m.state.remoteFeatures) == null ? void 0 : r.socials) && ((s = m.state.remoteFeatures) == null ? void 0 : s.socials.length) > 0) && await this.checkAllowedOrigins();
  }
  async checkAllowedOrigins() {
    try {
      const e = await x.fetchAllowedOrigins();
      if (!e || !O.isClient()) {
        de.open(Ce.ALERT_ERRORS.PROJECT_ID_NOT_CONFIGURED, "error");
        return;
      }
      const n = window.location.origin;
      $e.isOriginAllowed(n, e, wt.DEFAULT_ALLOWED_ANCESTORS) || de.open(Ce.ALERT_ERRORS.ORIGIN_NOT_ALLOWED, "error");
    } catch (e) {
      if (!(e instanceof Error)) {
        de.open(Ce.ALERT_ERRORS.PROJECT_ID_NOT_CONFIGURED, "error");
        return;
      }
      switch (e.message) {
        case "RATE_LIMITED":
          de.open(Ce.ALERT_ERRORS.RATE_LIMITED_APP_CONFIGURATION, "error");
          break;
        case "SERVER_ERROR": {
          const n = e.cause instanceof Error ? e.cause : e;
          de.open({
            shortMessage: Ce.ALERT_ERRORS.SERVER_ERROR_APP_CONFIGURATION.shortMessage,
            longMessage: Ce.ALERT_ERRORS.SERVER_ERROR_APP_CONFIGURATION.longMessage(n.message)
          }, "error");
          break;
        }
        default:
          de.open(Ce.ALERT_ERRORS.PROJECT_ID_NOT_CONFIGURED, "error");
      }
    }
  }
  sendInitializeEvent(e) {
    var r;
    const { ...n } = e;
    delete n.adapters, delete n.universalProvider, ne.sendEvent({
      type: "track",
      event: "INITIALIZE",
      properties: {
        ...n,
        networks: e.networks.map((s) => s.id),
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
    e.themeMode && ve.setThemeMode(e.themeMode), e.themeVariables && ve.setThemeVariables(e.themeVariables);
  }
  initializeChainController(e) {
    if (!this.connectionControllerClient || !this.networkControllerClient)
      throw new Error("ConnectionControllerClient and NetworkControllerClient must be set");
    d.initialize(e.adapters ?? [], this.caipNetworks, {
      connectionControllerClient: this.connectionControllerClient,
      networkControllerClient: this.networkControllerClient
    });
    const n = this.getDefaultNetwork();
    n && d.setActiveCaipNetwork(n);
  }
  initializeConnectionController(e) {
    E.initialize(e.adapters ?? []), E.setWcBasic(e.basic ?? !1);
  }
  initializeConnectorController() {
    w.initialize(this.chainNamespaces);
  }
  initializeProjectSettings(e) {
    m.setProjectId(e.projectId), m.setSdkVersion(e.sdkVersion);
  }
  initializeOptionsController(e) {
    var s;
    m.setDebug(e.debug !== !1), m.setEnableWalletConnect(e.enableWalletConnect !== !1), m.setEnableWalletGuide(e.enableWalletGuide !== !1), m.setEnableWallets(e.enableWallets !== !1), m.setEIP6963Enabled(e.enableEIP6963 !== !1), m.setEnableNetworkSwitch(e.enableNetworkSwitch !== !1), m.setEnableReconnect(e.enableReconnect !== !1), m.setEnableAuthLogger(e.enableAuthLogger !== !1), m.setCustomRpcUrls(e.customRpcUrls), m.setEnableEmbedded(e.enableEmbedded), m.setAllWallets(e.allWallets), m.setIncludeWalletIds(e.includeWalletIds), m.setExcludeWalletIds(e.excludeWalletIds), m.setFeaturedWalletIds(e.featuredWalletIds), m.setTokens(e.tokens), m.setTermsConditionsUrl(e.termsConditionsUrl), m.setPrivacyPolicyUrl(e.privacyPolicyUrl), m.setCustomWallets(e.customWallets), m.setFeatures(e.features), m.setAllowUnsupportedChain(e.allowUnsupportedChain), m.setUniversalProviderConfigOverride(e.universalProviderConfigOverride), m.setPreferUniversalLinks(e.experimental_preferUniversalLinks), m.setDefaultAccountTypes(e.defaultAccountTypes);
    const n = this.getDefaultMetaData();
    if (!e.metadata && n && (e.metadata = n), m.setMetadata(e.metadata), m.setDisableAppend(e.disableAppend), m.setEnableEmbedded(e.enableEmbedded), m.setSIWX(e.siwx), !e.projectId) {
      de.open(Ce.ALERT_ERRORS.PROJECT_ID_NOT_CONFIGURED, "error");
      return;
    }
    if (((s = e.adapters) == null ? void 0 : s.find((a) => a.namespace === f.CHAIN.EVM)) && e.siweConfig) {
      if (e.siwx)
        throw new Error("Cannot set both `siweConfig` and `siwx` options");
      m.setSIWX(e.siweConfig.mapToSIWX());
    }
  }
  getDefaultMetaData() {
    var e, n, r, s;
    return O.isClient() ? {
      name: ((n = (e = document.getElementsByTagName("title")) == null ? void 0 : e[0]) == null ? void 0 : n.textContent) || "",
      description: ((r = document.querySelector('meta[property="og:description"]')) == null ? void 0 : r.content) || "",
      url: window.location.origin,
      icons: [((s = document.querySelector('link[rel~="icon"]')) == null ? void 0 : s.href) || ""]
    } : null;
  }
  // -- Network Initialization ---------------------------------------------------
  setUnsupportedNetwork(e) {
    const n = this.getActiveChainNamespace();
    if (n) {
      const r = gt.getUnsupportedNetwork(`${n}:${e}`);
      d.setActiveCaipNetwork(r);
    }
  }
  getDefaultNetwork() {
    return gt.getCaipNetworkFromStorage(this.defaultCaipNetwork);
  }
  extendCaipNetwork(e, n) {
    return gt.extendCaipNetwork(e, {
      customNetworkImageUrls: n.chainImages,
      projectId: n.projectId
    });
  }
  extendCaipNetworks(e) {
    return gt.extendCaipNetworks(e.networks, {
      customNetworkImageUrls: e.chainImages,
      customRpcUrls: e.customRpcUrls,
      projectId: e.projectId
    });
  }
  extendDefaultCaipNetwork(e) {
    const n = e.networks.find((s) => {
      var a;
      return s.id === ((a = e.defaultNetwork) == null ? void 0 : a.id);
    });
    return n ? gt.extendCaipNetwork(n, {
      customNetworkImageUrls: e.chainImages,
      customRpcUrls: e.customRpcUrls,
      projectId: e.projectId
    }) : void 0;
  }
  async disconnectNamespace(e, n) {
    try {
      this.setLoading(!0, e);
      let r = {
        connections: []
      };
      const s = this.getAdapter(e), { caipAddress: a } = d.getAccountData(e) || {};
      return (a || !m.state.enableReconnect) && (s != null && s.disconnect) && (r = await s.disconnect({ id: n })), this.setLoading(!1, e), r;
    } catch (r) {
      throw this.setLoading(!1, e), new Error(`Failed to disconnect chains: ${r.message}`);
    }
  }
  // -- Client Initialization ---------------------------------------------------
  createClients() {
    this.connectionControllerClient = {
      connectWalletConnect: async () => {
        var u;
        const e = d.state.activeChain, n = this.getAdapter(e), r = (u = this.getCaipNetwork(e)) == null ? void 0 : u.id, s = E.getConnections(e), a = this.remoteFeatures.multiWallet, o = s.length > 0;
        if (!n)
          throw new Error("Adapter not found");
        const i = await n.connectWalletConnect(r);
        (!o || !a) && this.close(), this.setClientId((i == null ? void 0 : i.clientId) || null), C.setConnectedNamespaces([...d.state.chains.keys()]), await this.syncWalletConnectAccount(), await Ue.initializeIfEnabled();
      },
      connectExternal: async ({ id: e, address: n, info: r, type: s, provider: a, chain: o, caipNetwork: i, socialUri: l }) => {
        var P, M, _, V, U, ee;
        const u = d.state.activeChain, p = o || u, h = this.getAdapter(p);
        if (o && o !== u && !i) {
          const fe = this.getCaipNetworks().find((Nn) => Nn.chainNamespace === o);
          fe && this.setCaipNetwork(fe);
        }
        if (!p)
          throw new Error("connectExternal: namespace not found");
        if (!h)
          throw new Error("connectExternal: adapter not found");
        const R = this.getCaipNetwork(p), T = await h.connect({
          id: e,
          address: n,
          info: r,
          type: s,
          provider: a,
          socialUri: l,
          chainId: (i == null ? void 0 : i.id) || (R == null ? void 0 : R.id),
          rpcUrl: ((_ = (M = (P = i == null ? void 0 : i.rpcUrls) == null ? void 0 : P.default) == null ? void 0 : M.http) == null ? void 0 : _[0]) || ((ee = (U = (V = R == null ? void 0 : R.rpcUrls) == null ? void 0 : V.default) == null ? void 0 : U.http) == null ? void 0 : ee[0])
        });
        if (T)
          return C.addConnectedNamespace(p), this.syncProvider({ ...T, chainNamespace: p }), this.setStatus("connected", p), this.syncConnectedWalletInfo(p), C.removeDisconnectedConnectorId(e, p), { address: T.address };
      },
      reconnectExternal: async ({ id: e, info: n, type: r, provider: s }) => {
        var i;
        const a = d.state.activeChain, o = this.getAdapter(a);
        if (!a)
          throw new Error("reconnectExternal: namespace not found");
        if (!o)
          throw new Error("reconnectExternal: adapter not found");
        o != null && o.reconnect && (await (o == null ? void 0 : o.reconnect({ id: e, info: n, type: r, provider: s, chainId: (i = this.getCaipNetwork()) == null ? void 0 : i.id })), C.addConnectedNamespace(a), this.syncConnectedWalletInfo(a));
      },
      disconnect: async (e) => {
        var u;
        const { id: n, chainNamespace: r, initialDisconnect: s } = e || {}, a = r || d.state.activeChain, o = w.getConnectorId(a), i = n === f.CONNECTOR_ID.AUTH || o === f.CONNECTOR_ID.AUTH, l = n === f.CONNECTOR_ID.WALLET_CONNECT || o === f.CONNECTOR_ID.WALLET_CONNECT;
        try {
          const p = Array.from(d.state.chains.keys());
          let h = r ? [r] : p;
          (l || i) && (h = p);
          const R = h.map(async (M) => {
            const _ = w.getConnectorId(M), V = await this.disconnectNamespace(M, n || _);
            V && (i && C.deleteConnectedSocialProvider(), V.connections.forEach((U) => {
              C.addDisconnectedConnectorId(U.connectorId, M);
            })), s && this.onDisconnectNamespace({ chainNamespace: M, closeModal: !1 });
          }), T = await Promise.allSettled(R);
          J.resetSend(), E.resetWcConnection(), (u = Ue.getSIWX()) != null && u.signOutOnDisconnect && await Ue.clearSessions(), w.setFilterByNamespace(void 0), E.syncStorageConnections();
          const P = T.filter((M) => M.status === "rejected");
          if (P.length > 0)
            throw new Error(P.map((M) => M.reason.message).join(", "));
          ne.sendEvent({
            type: "track",
            event: "DISCONNECT_SUCCESS",
            properties: {
              namespace: r || "all"
            }
          });
        } catch (p) {
          throw new Error(`Failed to disconnect chains: ${p.message}`);
        }
      },
      checkInstalled: (e) => e ? e.some((n) => {
        var r;
        return !!((r = window.ethereum) != null && r[String(n)]);
      }) : !!window.ethereum,
      signMessage: async (e) => {
        const n = d.state.activeChain, r = this.getAdapter(d.state.activeChain);
        if (!n)
          throw new Error("signMessage: namespace not found");
        if (!r)
          throw new Error("signMessage: adapter not found");
        const s = await (r == null ? void 0 : r.signMessage({
          message: e,
          address: I.state.address,
          provider: se.getProvider(n)
        }));
        return (s == null ? void 0 : s.signature) || "";
      },
      sendTransaction: async (e) => {
        const n = e.chainNamespace;
        if (!n)
          throw new Error("sendTransaction: namespace not found");
        if (Q.SEND_SUPPORTED_NAMESPACES.includes(n)) {
          const r = this.getAdapter(n);
          if (!r)
            throw new Error("sendTransaction: adapter not found");
          const s = se.getProvider(n), a = await (r == null ? void 0 : r.sendTransaction({
            ...e,
            caipNetwork: this.getCaipNetwork(),
            provider: s
          }));
          return (a == null ? void 0 : a.hash) || "";
        }
        return "";
      },
      estimateGas: async (e) => {
        const n = e.chainNamespace;
        if (n === f.CHAIN.EVM) {
          const r = this.getAdapter(n);
          if (!r)
            throw new Error("estimateGas: adapter is required but got undefined");
          const s = se.getProvider(n), a = this.getCaipNetwork();
          if (!a)
            throw new Error("estimateGas: caipNetwork is required but got undefined");
          const o = await (r == null ? void 0 : r.estimateGas({ ...e, provider: s, caipNetwork: a }));
          return (o == null ? void 0 : o.gas) || 0n;
        }
        return 0n;
      },
      getEnsAvatar: async () => {
        var n;
        const e = d.state.activeChain;
        if (!e)
          throw new Error("getEnsAvatar: namespace is required but got undefined");
        return await this.syncIdentity({
          address: I.state.address,
          chainId: Number((n = this.getCaipNetwork()) == null ? void 0 : n.id),
          chainNamespace: e
        }), I.state.profileImage || !1;
      },
      getEnsAddress: async (e) => await $e.resolveReownName(e),
      writeContract: async (e) => {
        const n = d.state.activeChain, r = this.getAdapter(n);
        if (!n)
          throw new Error("writeContract: namespace is required but got undefined");
        if (!r)
          throw new Error("writeContract: adapter is required but got undefined");
        const s = this.getCaipNetwork(), a = this.getCaipAddress(), o = se.getProvider(n);
        if (!s || !a)
          throw new Error("writeContract: caipNetwork or caipAddress is required but got undefined");
        const i = await (r == null ? void 0 : r.writeContract({ ...e, caipNetwork: s, provider: o, caipAddress: a }));
        return i == null ? void 0 : i.hash;
      },
      parseUnits: (e, n) => {
        const r = this.getAdapter(d.state.activeChain);
        if (!r)
          throw new Error("parseUnits: adapter is required but got undefined");
        return (r == null ? void 0 : r.parseUnits({ value: e, decimals: n })) ?? 0n;
      },
      formatUnits: (e, n) => {
        const r = this.getAdapter(d.state.activeChain);
        if (!r)
          throw new Error("formatUnits: adapter is required but got undefined");
        return (r == null ? void 0 : r.formatUnits({ value: e, decimals: n })) ?? "0";
      },
      getCapabilities: async (e) => {
        const n = this.getAdapter(d.state.activeChain);
        if (!n)
          throw new Error("getCapabilities: adapter is required but got undefined");
        return await (n == null ? void 0 : n.getCapabilities(e));
      },
      grantPermissions: async (e) => {
        const n = this.getAdapter(d.state.activeChain);
        if (!n)
          throw new Error("grantPermissions: adapter is required but got undefined");
        return await (n == null ? void 0 : n.grantPermissions(e));
      },
      revokePermissions: async (e) => {
        const n = this.getAdapter(d.state.activeChain);
        if (!n)
          throw new Error("revokePermissions: adapter is required but got undefined");
        return n != null && n.revokePermissions ? await n.revokePermissions(e) : "0x";
      },
      walletGetAssets: async (e) => {
        const n = this.getAdapter(d.state.activeChain);
        if (!n)
          throw new Error("walletGetAssets: adapter is required but got undefined");
        return await (n == null ? void 0 : n.walletGetAssets(e)) ?? {};
      },
      updateBalance: (e) => {
        const n = this.getCaipNetwork(e);
        !n || !I.state.address || this.updateNativeBalance(I.state.address, n == null ? void 0 : n.id, e);
      }
    }, this.networkControllerClient = {
      switchCaipNetwork: async (e) => await this.switchCaipNetwork(e),
      // eslint-disable-next-line @typescript-eslint/require-await
      getApprovedCaipNetworksData: async () => this.getApprovedCaipNetworksData()
    }, E.setClient(this.connectionControllerClient);
  }
  getApprovedCaipNetworksData() {
    var n, r, s, a, o;
    if (se.getProviderId(d.state.activeChain) === be.CONNECTOR_TYPE_WALLET_CONNECT) {
      const i = (r = (n = this.universalProvider) == null ? void 0 : n.session) == null ? void 0 : r.namespaces;
      return {
        /*
         * MetaMask Wallet only returns 1 namespace in the session object. This makes it imposible
         * to switch to other networks. Setting supportsAllNetworks to true for MetaMask Wallet
         * will make it possible to switch to other networks.
         */
        supportsAllNetworks: ((o = (a = (s = this.universalProvider) == null ? void 0 : s.session) == null ? void 0 : a.peer) == null ? void 0 : o.metadata.name) === "MetaMask Wallet",
        approvedCaipNetworkIds: this.getChainsFromNamespaces(i)
      };
    }
    return { supportsAllNetworks: !0, approvedCaipNetworkIds: [] };
  }
  async switchCaipNetwork(e) {
    if (!e)
      return;
    const n = e.chainNamespace;
    if (this.getAddressByChainNamespace(e.chainNamespace)) {
      const s = se.getProvider(n), a = se.getProviderId(n);
      if (e.chainNamespace === d.state.activeChain) {
        const o = this.getAdapter(n);
        await (o == null ? void 0 : o.switchNetwork({ caipNetwork: e, provider: s, providerType: a }));
      } else if (this.setCaipNetwork(e), a === be.CONNECTOR_TYPE_WALLET_CONNECT)
        this.syncWalletConnectAccount();
      else {
        const o = this.getAddressByChainNamespace(n);
        o && this.syncAccount({
          address: o,
          chainId: e.id,
          chainNamespace: n
        });
      }
    } else
      this.setCaipNetwork(e);
  }
  getChainsFromNamespaces(e = {}) {
    return Object.values(e).flatMap((n) => {
      const r = n.chains || [], s = n.accounts.map((a) => {
        const { chainId: o, chainNamespace: i } = Se.parseCaipAddress(a);
        return `${i}:${o}`;
      });
      return Array.from(/* @__PURE__ */ new Set([...r, ...s]));
    });
  }
  // -- Adapter Initialization ---------------------------------------------------
  createAdapters(e) {
    return this.createClients(), this.chainNamespaces.reduce((n, r) => {
      var a;
      const s = e == null ? void 0 : e.find((o) => o.namespace === r);
      return s ? (s.construct({
        namespace: r,
        projectId: (a = this.options) == null ? void 0 : a.projectId,
        networks: this.getCaipNetworks()
      }), n[r] = s) : n[r] = new mi({
        namespace: r,
        networks: this.getCaipNetworks()
      }), n;
    }, {});
  }
  async initChainAdapter(e) {
    var n;
    this.onConnectors(e), this.listenAdapter(e), await ((n = this.chainAdapters) == null ? void 0 : n[e].syncConnectors(this.options, this)), await this.createUniversalProviderForAdapter(e);
  }
  async initChainAdapters() {
    await Promise.all(this.chainNamespaces.map(async (e) => {
      await this.initChainAdapter(e);
    }));
  }
  onConnectors(e) {
    const n = this.getAdapter(e);
    n == null || n.on("connectors", this.setConnectors.bind(this));
  }
  listenAdapter(e) {
    const n = this.getAdapter(e);
    if (!n)
      return;
    const r = C.getConnectionStatus();
    m.state.enableReconnect === !1 ? this.setStatus("disconnected", e) : r === "connected" ? this.setStatus("connecting", e) : r === "disconnected" ? (C.clearAddressCache(), this.setStatus(r, e)) : this.setStatus(r, e), n.on("switchNetwork", ({ address: s, chainId: a }) => {
      const o = this.getCaipNetworks().find((u) => u.id.toString() === a.toString() || u.caipNetworkId.toString() === a.toString()), i = d.state.activeChain === e, l = d.getAccountProp("address", e);
      if (o) {
        const u = i && s ? s : l;
        u && this.syncAccount({ address: u, chainId: o.id, chainNamespace: e });
      } else
        this.setUnsupportedNetwork(a);
    }), n.on("disconnect", () => {
      this.onDisconnectNamespace({ chainNamespace: e });
    }), n.on("connections", (s) => {
      this.setConnections(s, e);
    }), n.on("pendingTransactions", () => {
      const s = I.state.address, a = d.state.activeCaipNetwork;
      !s || !(a != null && a.id) || this.updateNativeBalance(s, a.id, a.chainNamespace);
    }), n.on("accountChanged", ({ address: s, chainId: a, connector: o }) => {
      var l, u;
      const i = d.state.activeChain === e;
      o != null && o.provider && (this.syncProvider({
        id: o.id,
        type: o.type,
        provider: o.provider,
        chainNamespace: e
      }), this.syncConnectedWalletInfo(e)), i && a ? this.syncAccount({
        address: s,
        chainId: a,
        chainNamespace: e
      }) : i && ((l = d.state.activeCaipNetwork) != null && l.id) ? this.syncAccount({
        address: s,
        chainId: (u = d.state.activeCaipNetwork) == null ? void 0 : u.id,
        chainNamespace: e
      }) : this.syncAccountInfo(s, a, e), C.addConnectedNamespace(e);
    });
  }
  async createUniversalProviderForAdapter(e) {
    var n, r, s;
    await this.getUniversalProvider(), this.universalProvider && await ((s = (r = (n = this.chainAdapters) == null ? void 0 : n[e]) == null ? void 0 : r.setUniversalProvider) == null ? void 0 : s.call(r, this.universalProvider));
  }
  // -- Connection Sync ---------------------------------------------------
  async syncExistingConnection() {
    await Promise.allSettled(this.chainNamespaces.map((e) => this.syncNamespaceConnection(e)));
  }
  async unSyncExistingConnection() {
    try {
      await Promise.allSettled(this.chainNamespaces.map((e) => E.disconnect({ namespace: e, initialDisconnect: !0 })));
    } catch (e) {
      console.error("Error disconnecting existing connections:", e);
    }
  }
  async syncNamespaceConnection(e) {
    try {
      e === f.CHAIN.EVM && O.isSafeApp() && w.setConnectorId(f.CONNECTOR_ID.SAFE, e);
      const n = w.getConnectorId(e);
      switch (this.setStatus("connecting", e), n) {
        case f.CONNECTOR_ID.WALLET_CONNECT:
          await this.syncWalletConnectAccount();
          break;
        case f.CONNECTOR_ID.AUTH:
          break;
        default:
          await this.syncAdapterConnection(e);
      }
    } catch (n) {
      console.warn("AppKit couldn't sync existing connection", n), this.setStatus("disconnected", e);
    }
  }
  onDisconnectNamespace(e) {
    const { chainNamespace: n, closeModal: r } = e || {};
    d.resetAccount(n), d.resetNetwork(n), C.removeConnectedNamespace(n);
    const s = Array.from(d.state.chains.keys());
    (n ? [n] : s).forEach((o) => C.addDisconnectedConnectorId(w.getConnectorId(o) || "", o)), w.removeConnectorId(n), se.resetChain(n), this.setUser(void 0, n), this.setStatus("disconnected", n), this.setConnectedWalletInfo(void 0, n), r !== !1 && Z.close();
  }
  async syncAdapterConnections() {
    await Promise.allSettled(this.chainNamespaces.map((e) => {
      var s;
      const n = this.getCaipAddress(e), r = this.getCaipNetwork(e);
      return (s = this.chainAdapters) == null ? void 0 : s[e].syncConnections({
        connectToFirstConnector: !n,
        caipNetwork: r,
        getConnectorStorageInfo(a) {
          const i = C.getConnections()[e] ?? [];
          return {
            hasDisconnected: C.isConnectorDisconnected(a, e),
            hasConnected: i.some((l) => we.isLowerCaseMatch(l.connectorId, a))
          };
        }
      });
    }));
  }
  async syncAdapterConnection(e) {
    var i, l, u;
    const n = this.getAdapter(e), r = w.getConnectorId(e), s = this.getCaipNetwork(e), o = w.getConnectors(e).find((p) => p.id === r);
    try {
      if (!n || !o)
        throw new Error(`Adapter or connector not found for namespace ${e}`);
      if (!(s != null && s.id))
        throw new Error("CaipNetwork not found");
      const p = await (n == null ? void 0 : n.syncConnection({
        namespace: e,
        id: o.id,
        chainId: s.id,
        rpcUrl: (u = (l = (i = s == null ? void 0 : s.rpcUrls) == null ? void 0 : i.default) == null ? void 0 : l.http) == null ? void 0 : u[0]
      }));
      p ? (this.syncProvider({ ...p, chainNamespace: e }), await this.syncAccount({ ...p, chainNamespace: e }), this.setStatus("connected", e)) : this.setStatus("disconnected", e);
    } catch {
      this.onDisconnectNamespace({ chainNamespace: e, closeModal: !1 });
    }
  }
  async syncWalletConnectAccount() {
    var r, s;
    const e = Object.keys(((s = (r = this.universalProvider) == null ? void 0 : r.session) == null ? void 0 : s.namespaces) || {}), n = this.chainNamespaces.map(async (a) => {
      var p, h, R, T, P;
      const o = this.getAdapter(a);
      if (!o)
        return;
      const i = ((T = (R = (h = (p = this.universalProvider) == null ? void 0 : p.session) == null ? void 0 : h.namespaces) == null ? void 0 : R[a]) == null ? void 0 : T.accounts) || [], l = (P = d.state.activeCaipNetwork) == null ? void 0 : P.id, u = i.find((M) => {
        const { chainId: _ } = Se.parseCaipAddress(M);
        return _ === (l == null ? void 0 : l.toString());
      }) || i[0];
      if (u) {
        const M = Se.validateCaipAddress(u), { chainId: _, address: V } = Se.parseCaipAddress(M);
        if (se.setProviderId(a, be.CONNECTOR_TYPE_WALLET_CONNECT), this.caipNetworks && d.state.activeCaipNetwork && o.namespace !== f.CHAIN.EVM) {
          const U = o.getWalletConnectProvider({
            caipNetworks: this.getCaipNetworks(),
            provider: this.universalProvider,
            activeCaipNetwork: d.state.activeCaipNetwork
          });
          se.setProvider(a, U);
        } else
          se.setProvider(a, this.universalProvider);
        w.setConnectorId(f.CONNECTOR_ID.WALLET_CONNECT, a), C.addConnectedNamespace(a), await this.syncAccount({
          address: V,
          chainId: _,
          chainNamespace: a
        });
      } else e.includes(a) && this.setStatus("disconnected", a);
      this.syncConnectedWalletInfo(a), await d.setApprovedCaipNetworksData(a);
    });
    await Promise.all(n);
  }
  syncProvider({ type: e, provider: n, id: r, chainNamespace: s }) {
    se.setProviderId(s, e), se.setProvider(s, n), w.setConnectorId(r, s);
  }
  async syncAccount(e) {
    var h, R;
    const n = e.chainNamespace === d.state.activeChain, r = d.getCaipNetworkByNamespace(e.chainNamespace, e.chainId), { address: s, chainId: a, chainNamespace: o } = e, { chainId: i } = C.getActiveNetworkProps(), l = a || i, u = ((h = d.state.activeCaipNetwork) == null ? void 0 : h.name) === f.UNSUPPORTED_NETWORK_NAME, p = d.getNetworkProp("supportsAllNetworks", o);
    if (this.setStatus("connected", o), !(u && !p) && l) {
      let T = this.getCaipNetworks().find((_) => _.id.toString() === l.toString()), P = this.getCaipNetworks().find((_) => _.chainNamespace === o);
      if (!p && !T && !P) {
        const _ = this.getApprovedCaipNetworkIds() || [], V = _.find((ee) => {
          var fe;
          return ((fe = Se.parseCaipNetworkId(ee)) == null ? void 0 : fe.chainId) === l.toString();
        }), U = _.find((ee) => {
          var fe;
          return ((fe = Se.parseCaipNetworkId(ee)) == null ? void 0 : fe.chainNamespace) === o;
        });
        T = this.getCaipNetworks().find((ee) => ee.caipNetworkId === V), P = this.getCaipNetworks().find((ee) => ee.caipNetworkId === U || // This is a workaround used in Solana network to support deprecated caipNetworkId
        "deprecatedCaipNetworkId" in ee && ee.deprecatedCaipNetworkId === U);
      }
      const M = T || P;
      (M == null ? void 0 : M.chainNamespace) === d.state.activeChain ? m.state.enableNetworkSwitch && !m.state.allowUnsupportedChain && ((R = d.state.activeCaipNetwork) == null ? void 0 : R.name) === f.UNSUPPORTED_NETWORK_NAME ? d.showUnsupportedChainUI() : this.setCaipNetwork(M) : n || r && this.setCaipNetworkOfNamespace(r, o), this.syncConnectedWalletInfo(o), we.isLowerCaseMatch(s, I.state.address) || this.syncAccountInfo(s, M == null ? void 0 : M.id, o), n ? await this.syncBalance({ address: s, chainId: M == null ? void 0 : M.id, chainNamespace: o }) : await this.syncBalance({ address: s, chainId: r == null ? void 0 : r.id, chainNamespace: o });
    }
  }
  async syncAccountInfo(e, n, r) {
    const s = this.getCaipAddress(r), a = n || (s == null ? void 0 : s.split(":")[1]);
    if (!a)
      return;
    const o = `${r}:${a}:${e}`;
    this.setCaipAddress(o, r), await this.syncIdentity({
      address: e,
      chainId: a,
      chainNamespace: r
    });
  }
  async syncReownName(e, n) {
    try {
      const r = await this.getReownName(e);
      if (r[0]) {
        const s = r[0];
        this.setProfileName(s.name, n);
      } else
        this.setProfileName(null, n);
    } catch {
      this.setProfileName(null, n);
    }
  }
  syncConnectedWalletInfo(e) {
    var s;
    const n = w.getConnectorId(e), r = se.getProviderId(e);
    if (r === be.CONNECTOR_TYPE_ANNOUNCED || r === be.CONNECTOR_TYPE_INJECTED) {
      if (n) {
        const o = this.getConnectors().find((i) => {
          var h, R;
          const l = i.id === n, u = ((h = i.info) == null ? void 0 : h.rdns) === n, p = (R = i.connectors) == null ? void 0 : R.some((T) => {
            var P;
            return T.id === n || ((P = T.info) == null ? void 0 : P.rdns) === n;
          });
          return l || u || !!p;
        });
        if (o) {
          const { info: i, name: l, imageUrl: u } = o, p = u || this.getConnectorImage(o);
          this.setConnectedWalletInfo({ name: l, icon: p, ...i }, e);
        }
      }
    } else if (r === be.CONNECTOR_TYPE_WALLET_CONNECT) {
      const a = se.getProvider(e);
      a != null && a.session && this.setConnectedWalletInfo({
        ...a.session.peer.metadata,
        name: a.session.peer.metadata.name,
        icon: (s = a.session.peer.metadata.icons) == null ? void 0 : s[0]
      }, e);
    } else if (n && (n === f.CONNECTOR_ID.COINBASE_SDK || n === f.CONNECTOR_ID.COINBASE)) {
      const a = this.getConnectors().find((u) => u.id === n), o = (a == null ? void 0 : a.name) || "Coinbase Wallet", i = (a == null ? void 0 : a.imageUrl) || this.getConnectorImage(a), l = a == null ? void 0 : a.info;
      this.setConnectedWalletInfo({
        ...l,
        name: o,
        icon: i
      }, e);
    }
  }
  async syncBalance(e) {
    !ur.getNetworksByNamespace(this.getCaipNetworks(), e.chainNamespace).find((r) => {
      var s;
      return r.id.toString() === ((s = e.chainId) == null ? void 0 : s.toString());
    }) || !e.chainId || await this.updateNativeBalance(e.address, e.chainId, e.chainNamespace);
  }
  async ready() {
    await this.readyPromise;
  }
  async updateNativeBalance(e, n, r) {
    const s = this.getAdapter(r), a = d.getCaipNetworkByNamespace(r, n);
    if (s) {
      const o = await s.getBalance({
        address: e,
        chainId: n,
        caipNetwork: a,
        tokens: this.options.tokens
      });
      return this.setBalance(o.balance, o.symbol, r), o;
    }
  }
  // -- Universal Provider ---------------------------------------------------
  async initializeUniversalAdapter() {
    var r, s, a, o, i, l, u, p, h, R;
    const e = Fs.createLogger((T, ...P) => {
      T && this.handleAlertError(T), console.error(...P);
    }), n = {
      projectId: (r = this.options) == null ? void 0 : r.projectId,
      metadata: {
        name: (s = this.options) != null && s.metadata ? (a = this.options) == null ? void 0 : a.metadata.name : "",
        description: (o = this.options) != null && o.metadata ? (i = this.options) == null ? void 0 : i.metadata.description : "",
        url: (l = this.options) != null && l.metadata ? (u = this.options) == null ? void 0 : u.metadata.url : "",
        icons: (p = this.options) != null && p.metadata ? (h = this.options) == null ? void 0 : h.metadata.icons : [""]
      },
      logger: e
    };
    m.setManualWCControl(!!((R = this.options) != null && R.manualWCControl)), this.universalProvider = this.options.universalProvider ?? await Pr.init(n), m.state.enableReconnect === !1 && this.universalProvider.session && await this.universalProvider.disconnect(), this.listenWalletConnect();
  }
  listenWalletConnect() {
    this.universalProvider && this.chainNamespaces.forEach((e) => {
      $e.listenWcProvider({
        universalProvider: this.universalProvider,
        namespace: e,
        onDisplayUri: (n) => {
          E.setUri(n);
        },
        onConnect: () => {
          E.finalizeWcConnection();
        },
        onDisconnect: () => {
          d.state.noAdapters && this.resetAccount(e), E.resetWcConnection();
        },
        onChainChanged: (n) => {
          const r = d.state.activeChain, s = r && w.state.activeConnectorIds[r] === f.CONNECTOR_ID.WALLET_CONNECT;
          if (r === e && (d.state.noAdapters || s)) {
            const a = this.getCaipNetworks().find((i) => i.id.toString() === n.toString() || i.caipNetworkId.toString() === n.toString()), o = this.getCaipNetwork();
            if (!a) {
              this.setUnsupportedNetwork(n);
              return;
            }
            (o == null ? void 0 : o.id.toString()) !== (a == null ? void 0 : a.id.toString()) && (o == null ? void 0 : o.chainNamespace) === (a == null ? void 0 : a.chainNamespace) && this.setCaipNetwork(a);
          }
        },
        onAccountsChanged: (n) => {
          const r = d.state.activeChain, s = r && w.state.activeConnectorIds[r] === f.CONNECTOR_ID.WALLET_CONNECT;
          if (r === e && (d.state.noAdapters || s) && n.length > 0) {
            const a = n[0];
            this.syncAccount({
              address: a.address,
              chainId: a.chainId,
              chainNamespace: a.chainNamespace
            });
          }
        }
      });
    });
  }
  createUniversalProvider() {
    var e;
    return !this.universalProviderInitPromise && O.isClient() && ((e = this.options) != null && e.projectId) && (this.universalProviderInitPromise = this.initializeUniversalAdapter()), this.universalProviderInitPromise;
  }
  async getUniversalProvider() {
    if (!this.universalProvider)
      try {
        await this.createUniversalProvider();
      } catch (e) {
        ne.sendEvent({
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
    const n = Object.entries(Ce.UniversalProviderErrors).find(([, { message: i }]) => e.message.includes(i)), [r, s] = n ?? [], { message: a, alertErrorKey: o } = s ?? {};
    if (r && a && !this.reportedAlertErrors[r]) {
      const i = Ce.ALERT_ERRORS[o];
      i && (de.open(i, "error"), this.reportedAlertErrors[r] = !0);
    }
  }
  getAdapter(e) {
    var n;
    if (e)
      return (n = this.chainAdapters) == null ? void 0 : n[e];
  }
  createAdapter(e) {
    var s;
    if (!e)
      return;
    const n = e.namespace;
    if (!n)
      return;
    this.createClients();
    const r = e;
    r.namespace = n, r.construct({
      namespace: n,
      projectId: (s = this.options) == null ? void 0 : s.projectId,
      networks: this.getCaipNetworks()
    }), this.chainNamespaces.includes(n) || this.chainNamespaces.push(n), this.chainAdapters && (this.chainAdapters[n] = r);
  }
  // -- Public -------------------------------------------------------------------
  async open(e) {
    if (await this.injectModalUi(), e != null && e.uri && E.setUri(e.uri), e != null && e.arguments)
      switch (e == null ? void 0 : e.view) {
        case "Swap":
          return Z.open({ ...e, data: { swap: e.arguments } });
      }
    return Z.open(e);
  }
  async close() {
    await this.injectModalUi(), Z.close();
  }
  setLoading(e, n) {
    Z.setLoading(e, n);
  }
  async disconnect(e) {
    await E.disconnect({ namespace: e });
  }
  getSIWX() {
    return m.state.siwx;
  }
  // -- review these -------------------------------------------------------------------
  getError() {
    return "";
  }
  getChainId() {
    var e;
    return (e = d.state.activeCaipNetwork) == null ? void 0 : e.id;
  }
  async switchNetwork(e) {
    const n = this.getCaipNetworks().find((r) => r.id === e.id);
    if (!n) {
      de.open(Ce.ALERT_ERRORS.SWITCH_NETWORK_NOT_FOUND, "error");
      return;
    }
    await d.switchActiveNetwork(n);
  }
  getWalletProvider() {
    return d.state.activeChain ? se.state.providers[d.state.activeChain] : null;
  }
  getWalletProviderType() {
    return se.getProviderId(d.state.activeChain);
  }
  subscribeProviders(e) {
    return se.subscribeProviders(e);
  }
  getThemeMode() {
    return ve.state.themeMode;
  }
  getThemeVariables() {
    return ve.state.themeVariables;
  }
  setThemeMode(e) {
    ve.setThemeMode(e), Sr(ve.state.themeMode);
  }
  setTermsConditionsUrl(e) {
    m.setTermsConditionsUrl(e);
  }
  setPrivacyPolicyUrl(e) {
    m.setPrivacyPolicyUrl(e);
  }
  setThemeVariables(e) {
    ve.setThemeVariables(e), di(ve.state.themeVariables);
  }
  subscribeTheme(e) {
    return ve.subscribe(e);
  }
  subscribeConnections(e) {
    return this.remoteFeatures.multiWallet ? E.subscribe(e) : (de.open(f.REMOTE_FEATURES_ALERTS.MULTI_WALLET_NOT_ENABLED.DEFAULT, "info"), () => {
    });
  }
  getWalletInfo(e) {
    return e ? d.getAccountProp("connectedWalletInfo", e) : I.state.connectedWalletInfo;
  }
  getAccount(e) {
    const n = e || d.state.activeChain, r = w.getAuthConnector(n), s = d.getAccountData(n), a = C.getConnectedConnectorId(d.state.activeChain), o = E.getConnections(n);
    if (!n)
      throw new Error("AppKit:getAccount - namespace is required");
    const i = o.flatMap((l) => l.accounts.map(({ address: u, type: p }) => O.createAccount(n, u, p || "eoa")));
    if (s)
      return {
        allAccounts: i,
        caipAddress: s.caipAddress,
        address: O.getPlainAddress(s.caipAddress),
        isConnected: !!s.caipAddress,
        status: s.status,
        embeddedWalletInfo: r && a === f.CONNECTOR_ID.AUTH ? {
          user: s.user ? {
            ...s.user,
            /*
             * Getting the username from the chain controller works well for social logins,
             * but Farcaster uses a different connection flow and doesn't emit the username via events.
             * Since the username is stored in local storage before the chain controller updates,
             * it's safe to use the local storage value here.
             */
            username: C.getConnectedSocialUsername()
          } : void 0,
          authProvider: s.socialProvider || "email",
          accountType: Fe(n),
          isSmartAccountDeployed: !!s.smartAccountDeployed
        } : void 0
      };
  }
  subscribeAccount(e, n) {
    const r = () => {
      const s = this.getAccount(n);
      s && e(s);
    };
    n ? d.subscribeChainProp("accountState", r, n) : d.subscribe(r), w.subscribe(r);
  }
  subscribeNetwork(e) {
    return d.subscribe(({ activeCaipNetwork: n }) => {
      e({
        caipNetwork: n,
        chainId: n == null ? void 0 : n.id,
        caipNetworkId: n == null ? void 0 : n.caipNetworkId
      });
    });
  }
  subscribeWalletInfo(e, n) {
    return n ? I.subscribeKey("connectedWalletInfo", e, n) : I.subscribeKey("connectedWalletInfo", e);
  }
  subscribeShouldUpdateToAddress(e) {
    I.subscribeKey("shouldUpdateToAddress", e);
  }
  subscribeCaipNetworkChange(e) {
    d.subscribeKey("activeCaipNetwork", e);
  }
  getState() {
    return xe.state;
  }
  getRemoteFeatures() {
    return m.state.remoteFeatures;
  }
  subscribeState(e) {
    return xe.subscribe(e);
  }
  subscribeRemoteFeatures(e) {
    return m.subscribeKey("remoteFeatures", e);
  }
  showErrorMessage(e) {
    He.showError(e);
  }
  showSuccessMessage(e) {
    He.showSuccess(e);
  }
  getEvent() {
    return { ...ne.state };
  }
  subscribeEvents(e) {
    return ne.subscribe(e);
  }
  replace(e) {
    W.replace(e);
  }
  redirect(e) {
    W.push(e);
  }
  popTransactionStack(e) {
    W.popTransactionStack(e);
  }
  isOpen() {
    return Z.state.open;
  }
  isTransactionStackEmpty() {
    return W.state.transactionStack.length === 0;
  }
  static getInstance() {
    return this.instance;
  }
  updateFeatures(e) {
    m.setFeatures(e);
  }
  updateRemoteFeatures(e) {
    m.setRemoteFeatures(e);
  }
  updateOptions(e) {
    const r = { ...m.state || {}, ...e };
    m.setOptions(r);
  }
  setConnectMethodsOrder(e) {
    m.setConnectMethodsOrder(e);
  }
  setWalletFeaturesOrder(e) {
    m.setWalletFeaturesOrder(e);
  }
  setCollapseWallets(e) {
    m.setCollapseWallets(e);
  }
  setSocialsOrder(e) {
    m.setSocialsOrder(e);
  }
  getConnectMethodsOrder() {
    return Hn.getConnectOrderMethod(m.state.features, w.getConnectors());
  }
  /**
   * Adds a network to an existing adapter in AppKit.
   * @param namespace - The chain namespace to add the network to (e.g. 'eip155', 'solana')
   * @param network - The network configuration to add
   * @throws Error if adapter for namespace doesn't exist
   */
  addNetwork(e, n) {
    if (this.chainAdapters && !this.chainAdapters[e])
      throw new Error(`Adapter for namespace ${e} doesn't exist`);
    const r = this.extendCaipNetwork(n, this.options);
    this.getCaipNetworks().find((s) => s.id === r.id) || d.addNetwork(r);
  }
  /**
   * Removes a network from an existing adapter in AppKit.
   * @param namespace - The chain namespace the network belongs to
   * @param networkId - The network ID to remove
   * @throws Error if adapter for namespace doesn't exist or if removing last network
   */
  removeNetwork(e, n) {
    if (this.chainAdapters && !this.chainAdapters[e])
      throw new Error(`Adapter for namespace ${e} doesn't exist`);
    this.getCaipNetworks().find((s) => s.id === n) && d.removeNetwork(e, n);
  }
}
let ir = !1;
class Rr extends wi {
  // -- Private ------------------------------------------------------------------
  async onAuthProviderConnected(e) {
    e.message && e.signature && e.siwxMessage && await Ue.addEmbeddedWalletSession({
      chainId: e.siwxMessage.chainId,
      accountAddress: e.address,
      notBefore: e.siwxMessage.notBefore,
      statement: e.siwxMessage.statement,
      resources: e.siwxMessage.resources,
      requestId: e.siwxMessage.requestId,
      issuedAt: e.siwxMessage.issuedAt,
      domain: e.siwxMessage.domain,
      uri: e.siwxMessage.uri,
      version: e.siwxMessage.version,
      nonce: e.siwxMessage.nonce
    }, e.message, e.signature);
    const n = d.state.activeChain;
    if (!n)
      throw new Error("AppKit:onAuthProviderConnected - namespace is required");
    const r = n === f.CHAIN.EVM ? `eip155:${e.chainId}:${e.address}` : `${e.chainId}:${e.address}`, s = m.state.defaultAccountTypes[n], a = Fe(n), o = e.preferredAccountType || a || s;
    we.isLowerCaseMatch(e.address, I.state.address) || this.syncIdentity({
      address: e.address,
      chainId: e.chainId,
      chainNamespace: n
    }), this.setCaipAddress(r, n);
    const { signature: i, siwxMessage: l, message: u, ...p } = e;
    this.setUser({ ...I.state.user || {}, ...p }, n), this.setSmartAccountDeployed(!!e.smartAccountDeployed, n), this.setPreferredAccountType(o, n), this.setLoading(!1, n);
  }
  setupAuthConnectorListeners(e) {
    e.onRpcRequest((n) => {
      Ie.checkIfRequestExists(n) ? Ie.checkIfRequestIsSafe(n) || this.handleUnsafeRPCRequest() : (this.open(), console.error(ue.RPC_METHOD_NOT_ALLOWED_MESSAGE, {
        method: n.method
      }), setTimeout(() => {
        this.showErrorMessage(ue.RPC_METHOD_NOT_ALLOWED_UI_MESSAGE);
      }, 300), e.rejectRpcRequests());
    }), e.onRpcError(() => {
      this.isOpen() && (this.isTransactionStackEmpty() ? this.close() : this.popTransactionStack("error"));
    }), e.onRpcSuccess((n, r) => {
      const s = Ie.checkIfRequestIsSafe(r), a = I.state.address, o = d.state.activeCaipNetwork;
      s || (a && (o != null && o.id) && this.updateNativeBalance(a, o.id, o.chainNamespace), this.isTransactionStackEmpty() ? this.close() : this.popTransactionStack("success"));
    }), e.onNotConnected(() => {
      const n = d.state.activeChain;
      if (!n)
        throw new Error("AppKit:onNotConnected - namespace is required");
      w.getConnectorId(n) === f.CONNECTOR_ID.AUTH && (this.setCaipAddress(void 0, n), this.setLoading(!1, n));
    }), e.onConnect(this.onAuthProviderConnected.bind(this)), e.onSocialConnected(this.onAuthProviderConnected.bind(this)), e.onSetPreferredAccount(({ address: n, type: r }) => {
      const s = d.state.activeChain;
      if (!s)
        throw new Error("AppKit:onSetPreferredAccount - namespace is required");
      n && this.setPreferredAccountType(r, s);
    });
  }
  async syncAuthConnectorTheme(e) {
    if (!e)
      return;
    const n = ve.getSnapshot(), r = m.getSnapshot();
    await Promise.all([
      e.syncDappData({
        metadata: r.metadata,
        sdkVersion: r.sdkVersion,
        projectId: r.projectId,
        sdkType: r.sdkType
      }),
      e.syncTheme({
        themeMode: n.themeMode,
        themeVariables: n.themeVariables,
        w3mThemeVariables: ze(n.themeVariables, n.themeMode)
      })
    ]);
  }
  async syncAuthConnector(e, n) {
    var u, p, h, R;
    const r = f.AUTH_CONNECTOR_SUPPORTED_CHAINS.includes(n), s = n === d.state.activeChain;
    if (!r)
      return;
    this.setLoading(!0, n);
    const a = e.getLoginEmailUsed();
    this.setLoading(a, n), a && this.setStatus("connecting", n);
    const o = e.getEmail(), i = e.getUsername();
    this.setUser({ ...((u = I.state) == null ? void 0 : u.user) || {}, username: i, email: o }, n), this.setupAuthConnectorListeners(e);
    const { isConnected: l } = await e.isConnected();
    if (await this.syncAuthConnectorTheme(e), n && r && s) {
      const T = await e.getSmartAccountEnabledNetworks();
      d.setSmartAccountEnabledNetworks((T == null ? void 0 : T.smartAccountEnabledNetworks) || [], n), l && ((p = this.connectionControllerClient) != null && p.connectExternal) ? (await ((R = this.connectionControllerClient) == null ? void 0 : R.connectExternal({
        id: f.CONNECTOR_ID.AUTH,
        info: { name: f.CONNECTOR_ID.AUTH },
        type: be.CONNECTOR_TYPE_AUTH,
        provider: e,
        chainId: (h = d.state.activeCaipNetwork) == null ? void 0 : h.id,
        chain: n
      })), this.setStatus("connected", n)) : w.getConnectorId(n) === f.CONNECTOR_ID.AUTH && (this.setStatus("disconnected", n), C.removeConnectedNamespace(n));
    }
    this.setLoading(!1, n);
  }
  async checkExistingTelegramSocialConnection(e) {
    var n, r;
    try {
      if (!O.isTelegram())
        return;
      const s = C.getTelegramSocialProvider();
      if (!s || !O.isClient())
        return;
      const o = new URL(window.location.href).searchParams.get("result_uri");
      if (!o)
        return;
      I.setSocialProvider(s, e), await ((n = this.authProvider) == null ? void 0 : n.init());
      const i = w.getAuthConnector();
      s && i && (this.setLoading(!0, e), await E.connectExternal({
        id: i.id,
        type: i.type,
        socialUri: o
      }, i.chain), C.setConnectedSocialProvider(s), C.removeTelegramSocialProvider(), ne.sendEvent({
        type: "track",
        event: "SOCIAL_LOGIN_SUCCESS",
        properties: {
          provider: s,
          caipNetworkId: (r = d.getActiveCaipNetwork()) == null ? void 0 : r.caipNetworkId
        }
      }));
    } catch (s) {
      this.setLoading(!1, e), console.error("checkExistingSTelegramocialConnection error", s);
    }
    try {
      const s = new URL(window.location.href);
      s.searchParams.delete("result_uri"), window.history.replaceState({}, document.title, s.toString());
    } catch (s) {
      console.error("tma social login failed", s);
    }
  }
  createAuthProvider(e) {
    var u, p, h, R;
    if (!f.AUTH_CONNECTOR_SUPPORTED_CHAINS.includes(e))
      return;
    const r = (u = this.remoteFeatures) == null ? void 0 : u.email, s = Array.isArray((p = this.remoteFeatures) == null ? void 0 : p.socials) && this.remoteFeatures.socials.length > 0, a = r || s, i = we.getActiveNamespaceConnectedToAuth() || e;
    !this.authProvider && ((h = this.options) != null && h.projectId) && a && (this.authProvider = Pt.getInstance({
      projectId: this.options.projectId,
      enableLogger: this.options.enableAuthLogger,
      chainId: (R = this.getCaipNetwork(i)) == null ? void 0 : R.caipNetworkId,
      abortController: Ce.EmbeddedWalletAbortController,
      onTimeout: (T) => {
        T === "iframe_load_failed" ? de.open(Ce.ALERT_ERRORS.IFRAME_LOAD_FAILED, "error") : T === "iframe_request_timeout" ? de.open(Ce.ALERT_ERRORS.IFRAME_REQUEST_TIMEOUT, "error") : T === "unverified_domain" && de.open(Ce.ALERT_ERRORS.UNVERIFIED_DOMAIN, "error");
      },
      getActiveCaipNetwork: (T) => d.getActiveCaipNetwork(T)
    }), xe.subscribeOpen((T) => {
      var P;
      !T && this.isTransactionStackEmpty() && ((P = this.authProvider) == null || P.rejectRpcRequests());
    }));
    const l = e === d.state.activeChain && m.state.enableReconnect;
    m.state.enableReconnect === !1 ? this.syncAuthConnectorTheme(this.authProvider) : this.authProvider && l && (this.syncAuthConnector(this.authProvider, e), this.checkExistingTelegramSocialConnection(e));
  }
  createAuthProviderForAdapter(e) {
    var n, r, s;
    this.createAuthProvider(e), this.authProvider && ((s = (r = (n = this.chainAdapters) == null ? void 0 : n[e]) == null ? void 0 : r.setAuthProvider) == null || s.call(r, this.authProvider));
  }
  // -- Overrides ----------------------------------------------------------------
  initControllers(e) {
    super.initControllers(e), this.options.excludeWalletIds && x.initializeExcludedWallets({ ids: this.options.excludeWalletIds });
  }
  async switchCaipNetwork(e) {
    var o, i;
    if (!e)
      return;
    const n = d.state.activeChain, r = e.chainNamespace, s = this.getAddressByChainNamespace(r);
    if (r === n && s) {
      const l = this.getAdapter(r), u = se.getProvider(r), p = se.getProviderId(r);
      await (l == null ? void 0 : l.switchNetwork({ caipNetwork: e, provider: u, providerType: p })), this.setCaipNetwork(e);
    } else {
      const u = se.getProviderId(n) === be.CONNECTOR_TYPE_AUTH, p = se.getProviderId(r), h = p === be.CONNECTOR_TYPE_AUTH, R = f.AUTH_CONNECTOR_SUPPORTED_CHAINS.includes(r);
      if (!r)
        throw new Error("AppKit:switchCaipNetwork - networkNamespace is required");
      if ((u && p === void 0 || h) && R)
        try {
          if (d.state.activeChain = e.chainNamespace, s) {
            const T = this.getAdapter(r);
            await (T == null ? void 0 : T.switchNetwork({
              caipNetwork: e,
              provider: this.authProvider,
              providerType: p
            }));
          } else
            await ((i = (o = this.connectionControllerClient) == null ? void 0 : o.connectExternal) == null ? void 0 : i.call(o, {
              id: f.CONNECTOR_ID.AUTH,
              provider: this.authProvider,
              chain: r,
              chainId: e.id,
              type: be.CONNECTOR_TYPE_AUTH,
              caipNetwork: e
            }));
          this.setCaipNetwork(e);
        } catch {
          const P = this.getAdapter(r);
          await (P == null ? void 0 : P.switchNetwork({
            caipNetwork: e,
            provider: this.authProvider,
            providerType: p
          }));
        }
      else if (p === be.CONNECTOR_TYPE_WALLET_CONNECT) {
        if (!d.state.noAdapters) {
          const T = this.getAdapter(r), P = se.getProvider(r), M = se.getProviderId(r);
          await (T == null ? void 0 : T.switchNetwork({ caipNetwork: e, provider: P, providerType: M }));
        }
        this.setCaipNetwork(e), this.syncWalletConnectAccount();
      } else
        this.setCaipNetwork(e), s && this.syncAccount({
          address: s,
          chainId: e.id,
          chainNamespace: r
        });
    }
  }
  async initialize(e) {
    var n;
    await super.initialize(e), (n = this.chainNamespaces) == null || n.forEach((r) => {
      this.createAuthProviderForAdapter(r);
    }), await this.injectModalUi(), xe.set({ initialized: !0 });
  }
  async syncIdentity({ address: e, chainId: n, chainNamespace: r }) {
    var o;
    const s = `${r}:${n}`, a = (o = this.caipNetworks) == null ? void 0 : o.find((i) => i.caipNetworkId === s);
    if (r !== f.CHAIN.EVM || a != null && a.testnet) {
      this.setProfileName(null, r), this.setProfileImage(null, r);
      return;
    }
    try {
      const { name: i, avatar: l } = await this.fetchIdentity({
        address: e,
        caipNetworkId: s
      });
      this.setProfileName(i, r), this.setProfileImage(l, r);
    } catch {
      await this.syncReownName(e, r), n !== 1 && this.setProfileImage(null, r);
    }
  }
  syncConnectedWalletInfo(e) {
    const n = se.getProviderId(e);
    if (n === be.CONNECTOR_TYPE_AUTH) {
      const r = this.authProvider;
      if (r) {
        const s = C.getConnectedSocialProvider() ?? "email", a = r.getEmail() ?? r.getUsername();
        this.setConnectedWalletInfo({ name: n, identifier: a, social: s }, e);
      }
    } else
      super.syncConnectedWalletInfo(e);
  }
  async injectModalUi() {
    if (O.isClient() && !ir)
      try {
        const e = { ...Q.DEFAULT_FEATURES, ...this.options.features }, n = this.remoteFeatures;
        if (await this.loadModalComponents(e, n), O.isClient() && !document.querySelector("w3m-modal")) {
          const s = document.createElement("w3m-modal");
          !m.state.disableAppend && !m.state.enableEmbedded && document.body.insertAdjacentElement("beforeend", s);
        }
        ir = !0;
      } catch (e) {
        console.error("Error injecting modal UI:", e);
      }
  }
  // This separate method helps with tree-shaking for SSR builds
  async loadModalComponents(e, n) {
    if (!O.isClient())
      return;
    const r = [];
    (n.email || n.socials && n.socials.length > 0) && r.push(import("./embedded-wallet-Dic96YAL.js")), n.email && r.push(import("./email-Bt2vxgEU.js")), n.socials && r.push(import("./socials-Dga0RlQ4.js")), n.swaps && n.swaps.length > 0 && r.push(import("./swaps-D6C0LEIs.js")), e.send && r.push(import("./send-C6ivW5of.js")), e.receive && r.push(import("./receive-CfTUiF3d.js")), n.onramp && n.onramp.length > 0 && r.push(import("./onramp-Drcj3FVB.js")), n.activity && r.push(import("./transactions-Dj-VEWu5.js")), e.pay && r.push(import("./index-CAw-a9Hv.js")), await Promise.all([
      ...r,
      import("./index-DuIa77Rf.js"),
      import("./w3m-modal-qRzZlpdL.js")
    ]);
  }
}
const Ei = "1.7.16";
function _i(t) {
  return new Rr({
    ...t,
    sdkVersion: O.generateSdkVersion(t.adapters ?? [], "html", Ei)
  });
}
const Ii = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  AccountController: I,
  AppKit: Rr,
  CoreHelperUtil: O,
  DEFAULT_METHODS: br,
  WcConstantsUtil: wt,
  WcHelpersUtil: $e,
  createAppKit: _i
}, Symbol.toStringTag, { value: "Module" }));
export {
  Ii as $,
  I as A,
  D as B,
  w as C,
  Mn as D,
  kt as E,
  Pe as F,
  se as G,
  Xr as H,
  on as I,
  dn as J,
  we as K,
  bi as L,
  Z as M,
  Kr as N,
  m as O,
  Se as P,
  x as Q,
  W as R,
  He as S,
  ve as T,
  Hn as U,
  gt as V,
  ue as W,
  Os as X,
  Ue as Y,
  sn as Z,
  vi as _,
  Q as a,
  f as b,
  O as c,
  ne as d,
  Fe as e,
  d as f,
  ze as g,
  Si as h,
  Ie as i,
  E as j,
  be as k,
  ci as l,
  de as m,
  li as n,
  C as o,
  Ce as p,
  J as q,
  Ti as r,
  hr as s,
  ae as t,
  Ts as u,
  Gn as v,
  Re as w,
  mr as x,
  ge as y,
  he as z
};
