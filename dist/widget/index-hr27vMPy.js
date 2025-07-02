const pe = Symbol(), ee = Object.getPrototypeOf, Y = /* @__PURE__ */ new WeakMap(), me = (e) => e && (Y.has(e) ? Y.get(e) : ee(e) === Object.prototype || ee(e) === Array.prototype), he = (e) => me(e) && e[pe] || null, te = (e, t = !0) => {
  Y.set(e, t);
}, z = {}, F = (e) => typeof e == "object" && e !== null, L = /* @__PURE__ */ new WeakMap(), V = /* @__PURE__ */ new WeakSet(), ge = (e = Object.is, t = (o, g) => new Proxy(o, g), s = (o) => F(o) && !V.has(o) && (Array.isArray(o) || !(Symbol.iterator in o)) && !(o instanceof WeakMap) && !(o instanceof WeakSet) && !(o instanceof Error) && !(o instanceof Number) && !(o instanceof Date) && !(o instanceof String) && !(o instanceof RegExp) && !(o instanceof ArrayBuffer), n = (o) => {
  switch (o.status) {
    case "fulfilled":
      return o.value;
    case "rejected":
      throw o.reason;
    default:
      throw o;
  }
}, l = /* @__PURE__ */ new WeakMap(), c = (o, g, I = n) => {
  const v = l.get(o);
  if ((v == null ? void 0 : v[0]) === g)
    return v[1];
  const w = Array.isArray(o) ? [] : Object.create(Object.getPrototypeOf(o));
  return te(w, !0), l.set(o, [g, w]), Reflect.ownKeys(o).forEach((D) => {
    if (Object.getOwnPropertyDescriptor(w, D))
      return;
    const _ = Reflect.get(o, D), A = {
      value: _,
      enumerable: !0,
      // This is intentional to avoid copying with proxy-compare.
      // It's still non-writable, so it avoids assigning a value.
      configurable: !0
    };
    if (V.has(_))
      te(_, !1);
    else if (_ instanceof Promise)
      delete A.value, A.get = () => I(_);
    else if (L.has(_)) {
      const [y, H] = L.get(
        _
      );
      A.value = c(
        y,
        H(),
        I
      );
    }
    Object.defineProperty(w, D, A);
  }), Object.preventExtensions(w);
}, d = /* @__PURE__ */ new WeakMap(), f = [1, 1], E = (o) => {
  if (!F(o))
    throw new Error("object required");
  const g = d.get(o);
  if (g)
    return g;
  let I = f[0];
  const v = /* @__PURE__ */ new Set(), w = (i, a = ++f[0]) => {
    I !== a && (I = a, v.forEach((r) => r(i, a)));
  };
  let D = f[1];
  const _ = (i = ++f[1]) => (D !== i && !v.size && (D = i, y.forEach(([a]) => {
    const r = a[1](i);
    r > I && (I = r);
  })), I), A = (i) => (a, r) => {
    const h = [...a];
    h[1] = [i, ...h[1]], w(h, r);
  }, y = /* @__PURE__ */ new Map(), H = (i, a) => {
    if ((z ? "production" : void 0) !== "production" && y.has(i))
      throw new Error("prop listener already exists");
    if (v.size) {
      const r = a[3](A(i));
      y.set(i, [a, r]);
    } else
      y.set(i, [a]);
  }, Z = (i) => {
    var a;
    const r = y.get(i);
    r && (y.delete(i), (a = r[1]) == null || a.call(r));
  }, ue = (i) => (v.add(i), v.size === 1 && y.forEach(([r, h], U) => {
    if ((z ? "production" : void 0) !== "production" && h)
      throw new Error("remove already exists");
    const k = r[3](A(U));
    y.set(U, [r, k]);
  }), () => {
    v.delete(i), v.size === 0 && y.forEach(([r, h], U) => {
      h && (h(), y.set(U, [r]));
    });
  }), q = Array.isArray(o) ? [] : Object.create(Object.getPrototypeOf(o)), R = t(q, {
    deleteProperty(i, a) {
      const r = Reflect.get(i, a);
      Z(a);
      const h = Reflect.deleteProperty(i, a);
      return h && w(["delete", [a], r]), h;
    },
    set(i, a, r, h) {
      const U = Reflect.has(i, a), k = Reflect.get(i, a, h);
      if (U && (e(k, r) || d.has(r) && e(k, d.get(r))))
        return !0;
      Z(a), F(r) && (r = he(r) || r);
      let x = r;
      if (r instanceof Promise)
        r.then((C) => {
          r.status = "fulfilled", r.value = C, w(["resolve", [a], C]);
        }).catch((C) => {
          r.status = "rejected", r.reason = C, w(["reject", [a], C]);
        });
      else {
        !L.has(r) && s(r) && (x = E(r));
        const C = !V.has(x) && L.get(x);
        C && H(a, C);
      }
      return Reflect.set(i, a, x, h), w(["set", [a], r, k]), !0;
    }
  });
  d.set(o, R);
  const fe = [
    q,
    _,
    c,
    ue
  ];
  return L.set(R, fe), Reflect.ownKeys(o).forEach((i) => {
    const a = Object.getOwnPropertyDescriptor(
      o,
      i
    );
    "value" in a && (R[i] = o[i], delete a.value, delete a.writable), Object.defineProperty(q, i, a);
  }), R;
}) => [
  // public functions
  E,
  // shared state
  L,
  V,
  // internal things
  e,
  t,
  s,
  n,
  l,
  c,
  d,
  f
], [ye] = ge();
function P(e = {}) {
  return ye(e);
}
function j(e, t, s) {
  const n = L.get(e);
  (z ? "production" : void 0) !== "production" && !n && console.warn("Please use proxy object");
  let l;
  const c = [], d = n[3];
  let f = !1;
  const o = d((g) => {
    c.push(g), l || (l = Promise.resolve().then(() => {
      l = void 0, f && t(c.splice(0));
    }));
  });
  return f = !0, () => {
    f = !1, o();
  };
}
function ve(e, t) {
  const s = L.get(e);
  (z ? "production" : void 0) !== "production" && !s && console.warn("Please use proxy object");
  const [n, l, c] = s;
  return c(n, l(), t);
}
const u = P({
  history: ["ConnectWallet"],
  view: "ConnectWallet",
  data: void 0
}), de = {
  state: u,
  subscribe(e) {
    return j(u, () => e(u));
  },
  push(e, t) {
    e !== u.view && (u.view = e, t && (u.data = t), u.history.push(e));
  },
  reset(e) {
    u.view = e, u.history = [e];
  },
  replace(e) {
    u.history.length > 1 && (u.history[u.history.length - 1] = e, u.view = e);
  },
  goBack() {
    if (u.history.length > 1) {
      u.history.pop();
      const [e] = u.history.slice(-1);
      u.view = e;
    }
  },
  setData(e) {
    u.data = e;
  }
}, m = {
  WALLETCONNECT_DEEPLINK_CHOICE: "WALLETCONNECT_DEEPLINK_CHOICE",
  WCM_VERSION: "WCM_VERSION",
  RECOMMENDED_WALLET_AMOUNT: 9,
  isMobile() {
    return typeof window < "u" ? !!(window.matchMedia("(pointer:coarse)").matches || /Android|webOS|iPhone|iPad|iPod|BlackBerry|Opera Mini/u.test(navigator.userAgent)) : !1;
  },
  isAndroid() {
    return m.isMobile() && navigator.userAgent.toLowerCase().includes("android");
  },
  isIos() {
    const e = navigator.userAgent.toLowerCase();
    return m.isMobile() && (e.includes("iphone") || e.includes("ipad"));
  },
  isHttpUrl(e) {
    return e.startsWith("http://") || e.startsWith("https://");
  },
  isArray(e) {
    return Array.isArray(e) && e.length > 0;
  },
  isTelegram() {
    return typeof window < "u" && // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (!!window.TelegramWebviewProxy || // eslint-disable-next-line @typescript-eslint/no-explicit-any
    !!window.Telegram || // eslint-disable-next-line @typescript-eslint/no-explicit-any
    !!window.TelegramWebviewProxyProto);
  },
  formatNativeUrl(e, t, s) {
    if (m.isHttpUrl(e))
      return this.formatUniversalUrl(e, t, s);
    let n = e;
    n.includes("://") || (n = e.replaceAll("/", "").replaceAll(":", ""), n = `${n}://`), n.endsWith("/") || (n = `${n}/`), this.setWalletConnectDeepLink(n, s);
    const l = encodeURIComponent(t);
    return `${n}wc?uri=${l}`;
  },
  formatUniversalUrl(e, t, s) {
    if (!m.isHttpUrl(e))
      return this.formatNativeUrl(e, t, s);
    let n = e;
    if (n.startsWith("https://t.me")) {
      const c = Buffer.from(t).toString("base64").replace(/[=]/g, "");
      n.endsWith("/") && (n = n.slice(0, -1)), this.setWalletConnectDeepLink(n, s);
      const d = new URL(n);
      return d.searchParams.set("startapp", c), d.toString();
    }
    n.endsWith("/") || (n = `${n}/`), this.setWalletConnectDeepLink(n, s);
    const l = encodeURIComponent(t);
    return `${n}wc?uri=${l}`;
  },
  async wait(e) {
    return new Promise((t) => {
      setTimeout(t, e);
    });
  },
  openHref(e, t) {
    const s = this.isTelegram() ? "_blank" : t;
    window.open(e, s, "noreferrer noopener");
  },
  setWalletConnectDeepLink(e, t) {
    try {
      localStorage.setItem(m.WALLETCONNECT_DEEPLINK_CHOICE, JSON.stringify({ href: e, name: t }));
    } catch {
      console.info("Unable to set WalletConnect deep link");
    }
  },
  setWalletConnectAndroidDeepLink(e) {
    try {
      const [t] = e.split("?");
      localStorage.setItem(
        m.WALLETCONNECT_DEEPLINK_CHOICE,
        JSON.stringify({ href: t, name: "Android" })
      );
    } catch {
      console.info("Unable to set WalletConnect android deep link");
    }
  },
  removeWalletConnectDeepLink() {
    try {
      localStorage.removeItem(m.WALLETCONNECT_DEEPLINK_CHOICE);
    } catch {
      console.info("Unable to remove WalletConnect deep link");
    }
  },
  setModalVersionInStorage() {
    try {
      typeof localStorage < "u" && localStorage.setItem(m.WCM_VERSION, "2.7.0");
    } catch {
      console.info("Unable to set Web3Modal version in storage");
    }
  },
  getWalletRouterData() {
    var e;
    const t = (e = de.state.data) == null ? void 0 : e.Wallet;
    if (!t)
      throw new Error('Missing "Wallet" view data');
    return t;
  }
}, we = typeof location < "u" && (location.hostname.includes("localhost") || location.protocol.includes("https")), p = P({
  enabled: we,
  userSessionId: "",
  events: [],
  connectedWalletId: void 0
}), be = {
  state: p,
  subscribe(e) {
    return j(p.events, () => e(ve(p.events[p.events.length - 1])));
  },
  initialize() {
    p.enabled && typeof (crypto == null ? void 0 : crypto.randomUUID) < "u" && (p.userSessionId = crypto.randomUUID());
  },
  setConnectedWalletId(e) {
    p.connectedWalletId = e;
  },
  click(e) {
    if (p.enabled) {
      const t = {
        type: "CLICK",
        name: e.name,
        userSessionId: p.userSessionId,
        timestamp: Date.now(),
        data: e
      };
      p.events.push(t);
    }
  },
  track(e) {
    if (p.enabled) {
      const t = {
        type: "TRACK",
        name: e.name,
        userSessionId: p.userSessionId,
        timestamp: Date.now(),
        data: e
      };
      p.events.push(t);
    }
  },
  view(e) {
    if (p.enabled) {
      const t = {
        type: "VIEW",
        name: e.name,
        userSessionId: p.userSessionId,
        timestamp: Date.now(),
        data: e
      };
      p.events.push(t);
    }
  }
}, O = P({
  chains: void 0,
  walletConnectUri: void 0,
  isAuth: !1,
  isCustomDesktop: !1,
  isCustomMobile: !1,
  isDataLoaded: !1,
  isUiLoaded: !1
}), b = {
  state: O,
  subscribe(e) {
    return j(O, () => e(O));
  },
  setChains(e) {
    O.chains = e;
  },
  setWalletConnectUri(e) {
    O.walletConnectUri = e;
  },
  setIsCustomDesktop(e) {
    O.isCustomDesktop = e;
  },
  setIsCustomMobile(e) {
    O.isCustomMobile = e;
  },
  setIsDataLoaded(e) {
    O.isDataLoaded = e;
  },
  setIsUiLoaded(e) {
    O.isUiLoaded = e;
  },
  setIsAuth(e) {
    O.isAuth = e;
  }
}, B = P({
  projectId: "",
  mobileWallets: void 0,
  desktopWallets: void 0,
  walletImages: void 0,
  chains: void 0,
  enableAuthMode: !1,
  enableExplorer: !0,
  explorerExcludedWalletIds: void 0,
  explorerRecommendedWalletIds: void 0,
  termsOfServiceUrl: void 0,
  privacyPolicyUrl: void 0
}), T = {
  state: B,
  subscribe(e) {
    return j(B, () => e(B));
  },
  setConfig(e) {
    var t, s;
    be.initialize(), b.setChains(e.chains), b.setIsAuth(!!e.enableAuthMode), b.setIsCustomMobile(!!((t = e.mobileWallets) != null && t.length)), b.setIsCustomDesktop(!!((s = e.desktopWallets) != null && s.length)), m.setModalVersionInStorage(), Object.assign(B, e);
  }
};
var Ie = Object.defineProperty, se = Object.getOwnPropertySymbols, Oe = Object.prototype.hasOwnProperty, We = Object.prototype.propertyIsEnumerable, ne = (e, t, s) => t in e ? Ie(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[t] = s, _e = (e, t) => {
  for (var s in t || (t = {}))
    Oe.call(t, s) && ne(e, s, t[s]);
  if (se)
    for (var s of se(t))
      We.call(t, s) && ne(e, s, t[s]);
  return e;
};
const G = "https://explorer-api.walletconnect.com", Q = "wcm", X = "js-2.7.0";
async function K(e, t) {
  const s = _e({ sdkType: Q, sdkVersion: X }, t), n = new URL(e, G);
  return n.searchParams.append("projectId", T.state.projectId), Object.entries(s).forEach(([c, d]) => {
    d && n.searchParams.append(c, String(d));
  }), (await fetch(n)).json();
}
const M = {
  async getDesktopListings(e) {
    return K("/w3m/v1/getDesktopListings", e);
  },
  async getMobileListings(e) {
    return K("/w3m/v1/getMobileListings", e);
  },
  async getInjectedListings(e) {
    return K("/w3m/v1/getInjectedListings", e);
  },
  async getAllListings(e) {
    return K("/w3m/v1/getAllListings", e);
  },
  getWalletImageUrl(e) {
    return `${G}/w3m/v1/getWalletImage/${e}?projectId=${T.state.projectId}&sdkType=${Q}&sdkVersion=${X}`;
  },
  getAssetImageUrl(e) {
    return `${G}/w3m/v1/getAssetImage/${e}?projectId=${T.state.projectId}&sdkType=${Q}&sdkVersion=${X}`;
  }
};
var Ee = Object.defineProperty, oe = Object.getOwnPropertySymbols, Ce = Object.prototype.hasOwnProperty, Le = Object.prototype.propertyIsEnumerable, re = (e, t, s) => t in e ? Ee(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[t] = s, Pe = (e, t) => {
  for (var s in t || (t = {}))
    Ce.call(t, s) && re(e, s, t[s]);
  if (oe)
    for (var s of oe(t))
      Le.call(t, s) && re(e, s, t[s]);
  return e;
};
const ae = m.isMobile(), W = P({
  wallets: { listings: [], total: 0, page: 1 },
  search: { listings: [], total: 0, page: 1 },
  recomendedWallets: []
}), Te = {
  state: W,
  async getRecomendedWallets() {
    const { explorerRecommendedWalletIds: e, explorerExcludedWalletIds: t } = T.state;
    if (e === "NONE" || t === "ALL" && !e)
      return W.recomendedWallets;
    if (m.isArray(e)) {
      const n = { recommendedIds: e.join(",") }, { listings: l } = await M.getAllListings(n), c = Object.values(l);
      c.sort((d, f) => {
        const E = e.indexOf(d.id), o = e.indexOf(f.id);
        return E - o;
      }), W.recomendedWallets = c;
    } else {
      const { chains: s, isAuth: n } = b.state, l = s == null ? void 0 : s.join(","), c = m.isArray(t), d = {
        page: 1,
        sdks: n ? "auth_v1" : void 0,
        entries: m.RECOMMENDED_WALLET_AMOUNT,
        chains: l,
        version: 2,
        excludedIds: c ? t.join(",") : void 0
      }, { listings: f } = ae ? await M.getMobileListings(d) : await M.getDesktopListings(d);
      W.recomendedWallets = Object.values(f);
    }
    return W.recomendedWallets;
  },
  async getWallets(e) {
    const t = Pe({}, e), { explorerRecommendedWalletIds: s, explorerExcludedWalletIds: n } = T.state, { recomendedWallets: l } = W;
    if (n === "ALL")
      return W.wallets;
    l.length ? t.excludedIds = l.map((I) => I.id).join(",") : m.isArray(s) && (t.excludedIds = s.join(",")), m.isArray(n) && (t.excludedIds = [t.excludedIds, n].filter(Boolean).join(",")), b.state.isAuth && (t.sdks = "auth_v1");
    const { page: c, search: d } = e, { listings: f, total: E } = ae ? await M.getMobileListings(t) : await M.getDesktopListings(t), o = Object.values(f), g = d ? "search" : "wallets";
    return W[g] = {
      listings: [...W[g].listings, ...o],
      total: E,
      page: c ?? 1
    }, { listings: o, total: E };
  },
  getWalletImageUrl(e) {
    return M.getWalletImageUrl(e);
  },
  getAssetImageUrl(e) {
    return M.getAssetImageUrl(e);
  },
  resetSearch() {
    W.search = { listings: [], total: 0, page: 1 };
  }
}, $ = P({
  open: !1
}), J = {
  state: $,
  subscribe(e) {
    return j($, () => e($));
  },
  async open(e) {
    return new Promise((t) => {
      const { isUiLoaded: s, isDataLoaded: n } = b.state;
      if (m.removeWalletConnectDeepLink(), b.setWalletConnectUri(e == null ? void 0 : e.uri), b.setChains(e == null ? void 0 : e.chains), de.reset("ConnectWallet"), s && n)
        $.open = !0, t();
      else {
        const l = setInterval(() => {
          const c = b.state;
          c.isUiLoaded && c.isDataLoaded && (clearInterval(l), $.open = !0, t());
        }, 200);
      }
    });
  },
  close() {
    $.open = !1;
  }
};
var Ae = Object.defineProperty, ie = Object.getOwnPropertySymbols, Me = Object.prototype.hasOwnProperty, Se = Object.prototype.propertyIsEnumerable, le = (e, t, s) => t in e ? Ae(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[t] = s, je = (e, t) => {
  for (var s in t || (t = {}))
    Me.call(t, s) && le(e, s, t[s]);
  if (ie)
    for (var s of ie(t))
      Se.call(t, s) && le(e, s, t[s]);
  return e;
};
function De() {
  return typeof matchMedia < "u" && matchMedia("(prefers-color-scheme: dark)").matches;
}
const N = P({
  themeMode: De() ? "dark" : "light"
}), ce = {
  state: N,
  subscribe(e) {
    return j(N, () => e(N));
  },
  setThemeConfig(e) {
    const { themeMode: t, themeVariables: s } = e;
    t && (N.themeMode = t), s && (N.themeVariables = je({}, s));
  }
}, S = P({
  open: !1,
  message: "",
  variant: "success"
}), ke = {
  state: S,
  subscribe(e) {
    return j(S, () => e(S));
  },
  openToast(e, t) {
    S.open = !0, S.message = e, S.variant = t;
  },
  closeToast() {
    S.open = !1;
  }
};
class Ue {
  constructor(t) {
    this.openModal = J.open, this.closeModal = J.close, this.subscribeModal = J.subscribe, this.setTheme = ce.setThemeConfig, ce.setThemeConfig(t), T.setConfig(t), this.initUi();
  }
  async initUi() {
    if (typeof window < "u") {
      await import("./index-C_x9EzwQ.js");
      const t = document.createElement("wcm-modal");
      document.body.insertAdjacentElement("beforeend", t), b.setIsUiLoaded(!0);
    }
  }
}
const Ne = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  WalletConnectModal: Ue
}, Symbol.toStringTag, { value: "Module" }));
export {
  T as C,
  be as E,
  J as M,
  b as O,
  de as R,
  ke as T,
  ce as a,
  Te as b,
  m as c,
  Ne as i
};
