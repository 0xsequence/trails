import { i as v, a as f, x as l } from "./lit-element-CWLRvgWK.js";
import { r as p, n as h, o as M } from "./class-map-BaJ3HzzH.js";
import { M as S, k as D, T as N, G as j, i as _, r as P, a as C, H as c, A, c as U, E as y, g as x, b as $, W as T, S as k, R as H } from "./index-C8kdZHDI.js";
import { c as g } from "./index-D5_HZ1pl.js";
import { N as V } from "./index-ab7RLiXC.js";
import { e as z, n as F } from "./ref-B6QhSp7s.js";
import "./index-D1mlqkKH.js";
import "./index-DamJDtO7.js";
import "./index-Cikaon_L.js";
import "./index-BjV39Lye.js";
import "./index-BMwx-uEc.js";
import "./index-WFWVbb2G.js";
import "./index-Cv4vyh4e.js";
const G = v`
  div {
    width: 100%;
  }

  [data-ready='false'] {
    transform: scale(1.05);
  }

  @media (max-width: 430px) {
    [data-ready='false'] {
      transform: translateY(-50px);
    }
  }
`;
var W = function(a, e, i, n) {
  var r = arguments.length, t = r < 3 ? e : n === null ? n = Object.getOwnPropertyDescriptor(e, i) : n, s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") t = Reflect.decorate(a, e, i, n);
  else for (var o = a.length - 1; o >= 0; o--) (s = a[o]) && (t = (r < 3 ? s(t) : r > 3 ? s(e, i, t) : s(e, i)) || t);
  return r > 3 && t && Object.defineProperty(e, i, t), t;
};
const R = 600, I = 360, Y = 64;
let b = class extends f {
  constructor() {
    super(), this.bodyObserver = void 0, this.unsubscribe = [], this.iframe = document.getElementById("w3m-iframe"), this.ready = !1, this.unsubscribe.push(S.subscribeKey("open", (e) => {
      e || this.onHideIframe();
    }), S.subscribeKey("shake", (e) => {
      e ? this.iframe.style.animation = "w3m-shake 500ms var(--wui-ease-out-power-2)" : this.iframe.style.animation = "none";
    }));
  }
  disconnectedCallback() {
    var e;
    this.onHideIframe(), this.unsubscribe.forEach((i) => i()), (e = this.bodyObserver) == null || e.unobserve(window.document.body);
  }
  async firstUpdated() {
    var i;
    await this.syncTheme(), this.iframe.style.display = "block";
    const e = (i = this == null ? void 0 : this.renderRoot) == null ? void 0 : i.querySelector("div");
    this.bodyObserver = new ResizeObserver((n) => {
      var s, o;
      const r = (s = n == null ? void 0 : n[0]) == null ? void 0 : s.contentBoxSize, t = (o = r == null ? void 0 : r[0]) == null ? void 0 : o.inlineSize;
      this.iframe.style.height = `${R}px`, e.style.height = `${R}px`, t && t <= 430 ? (this.iframe.style.width = "100%", this.iframe.style.left = "0px", this.iframe.style.bottom = "0px", this.iframe.style.top = "unset") : (this.iframe.style.width = `${I}px`, this.iframe.style.left = `calc(50% - ${I / 2}px)`, this.iframe.style.top = `calc(50% - ${R / 2}px + ${Y / 2}px)`, this.iframe.style.bottom = "unset"), this.ready = !0, this.onShowIframe();
    }), this.bodyObserver.observe(window.document.body);
  }
  render() {
    return l`<div data-ready=${this.ready} id="w3m-frame-container"></div>`;
  }
  onShowIframe() {
    const e = window.innerWidth <= 430;
    this.iframe.style.animation = e ? "w3m-iframe-zoom-in-mobile 200ms var(--wui-ease-out-power-2)" : "w3m-iframe-zoom-in 200ms var(--wui-ease-out-power-2)";
  }
  onHideIframe() {
    this.iframe.style.display = "none", this.iframe.style.animation = "w3m-iframe-fade-out 200ms var(--wui-ease-out-power-2)";
  }
  async syncTheme() {
    const e = D.getAuthConnector();
    if (e) {
      const i = N.getSnapshot().themeMode, n = N.getSnapshot().themeVariables;
      await e.provider.syncTheme({
        themeVariables: n,
        w3mThemeVariables: j(n, i)
      });
    }
  }
};
b.styles = G;
W([
  p()
], b.prototype, "ready", void 0);
b = W([
  g("w3m-approve-transaction-view")
], b);
var L = function(a, e, i, n) {
  var r = arguments.length, t = r < 3 ? e : n === null ? n = Object.getOwnPropertyDescriptor(e, i) : n, s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") t = Reflect.decorate(a, e, i, n);
  else for (var o = a.length - 1; o >= 0; o--) (s = a[o]) && (t = (r < 3 ? s(t) : r > 3 ? s(e, i, t) : s(e, i)) || t);
  return r > 3 && t && Object.defineProperty(e, i, t), t;
};
let O = class extends f {
  render() {
    return l`
      <wui-flex flexDirection="column" alignItems="center" gap="xl" padding="xl">
        <wui-text variant="paragraph-400" color="fg-100">Follow the instructions on</wui-text>
        <wui-chip
          icon="externalLink"
          variant="fill"
          href=${_.SECURE_SITE_DASHBOARD}
          imageSrc=${_.SECURE_SITE_FAVICON}
          data-testid="w3m-secure-website-button"
        >
        </wui-chip>
        <wui-text variant="small-400" color="fg-200">
          You will have to reconnect for security reasons
        </wui-text>
      </wui-flex>
    `;
  }
};
O = L([
  g("w3m-upgrade-wallet-view")
], O);
const B = v`
  :host {
    position: relative;
    width: 100%;
    display: inline-block;
    color: var(--wui-color-fg-275);
  }

  .error {
    margin: var(--wui-spacing-xxs) var(--wui-spacing-m) var(--wui-spacing-0) var(--wui-spacing-m);
  }

  .base-name {
    position: absolute;
    right: 45px;
    top: 15px;
    text-align: right;
  }
`;
var w = function(a, e, i, n) {
  var r = arguments.length, t = r < 3 ? e : n === null ? n = Object.getOwnPropertyDescriptor(e, i) : n, s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") t = Reflect.decorate(a, e, i, n);
  else for (var o = a.length - 1; o >= 0; o--) (s = a[o]) && (t = (r < 3 ? s(t) : r > 3 ? s(e, i, t) : s(e, i)) || t);
  return r > 3 && t && Object.defineProperty(e, i, t), t;
};
let d = class extends f {
  constructor() {
    super(...arguments), this.disabled = !1, this.loading = !1;
  }
  render() {
    return l`
      <wui-input-text
        value=${M(this.value)}
        ?disabled=${this.disabled}
        .value=${this.value || ""}
        data-testid="wui-ens-input"
        inputRightPadding="5xl"
      >
        ${this.baseNameTemplate()} ${this.errorTemplate()}${this.loadingTemplate()}
      </wui-input-text>
    `;
  }
  baseNameTemplate() {
    return l`<wui-text variant="paragraph-400" color="fg-200" class="base-name">
      ${C.WC_NAME_SUFFIX}
    </wui-text>`;
  }
  loadingTemplate() {
    return this.loading ? l`<wui-loading-spinner size="md" color="accent-100"></wui-loading-spinner>` : null;
  }
  errorTemplate() {
    return this.errorMessage ? l`<wui-text variant="tiny-500" color="error-100" class="error"
        >${this.errorMessage}</wui-text
      >` : null;
  }
};
d.styles = [P, B];
w([
  h()
], d.prototype, "errorMessage", void 0);
w([
  h({ type: Boolean })
], d.prototype, "disabled", void 0);
w([
  h()
], d.prototype, "value", void 0);
w([
  h({ type: Boolean })
], d.prototype, "loading", void 0);
d = w([
  g("wui-ens-input")
], d);
const K = v`
  wui-flex {
    width: 100%;
  }

  .suggestion {
    border: none;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    padding: var(--wui-spacing-m);
  }

  .suggestion:disabled {
    opacity: 0.5;
    cursor: default;
  }

  .suggestion:focus-visible:not(:disabled) {
    outline: 1px solid var(--wui-color-gray-glass-020);
    background-color: var(--wui-color-gray-glass-005);
  }

  .suggestion:hover:not(:disabled) {
    background-color: var(--wui-color-gray-glass-005);
  }

  .suggested-name {
    max-width: 75%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  form {
    width: 100%;
    position: relative;
  }

  .input-submit-button,
  .input-loading-spinner {
    position: absolute;
    top: 26px;
    transform: translateY(-50%);
    right: 10px;
  }
`;
var m = function(a, e, i, n) {
  var r = arguments.length, t = r < 3 ? e : n === null ? n = Object.getOwnPropertyDescriptor(e, i) : n, s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") t = Reflect.decorate(a, e, i, n);
  else for (var o = a.length - 1; o >= 0; o--) (s = a[o]) && (t = (r < 3 ? s(t) : r > 3 ? s(e, i, t) : s(e, i)) || t);
  return r > 3 && t && Object.defineProperty(e, i, t), t;
};
let u = class extends f {
  constructor() {
    super(), this.formRef = z(), this.usubscribe = [], this.name = "", this.error = "", this.loading = c.state.loading, this.suggestions = c.state.suggestions, this.profileName = A.state.profileName, this.onDebouncedNameInputChange = U.debounce((e) => {
      c.validateName(e) ? (this.error = "", this.name = e, c.getSuggestions(e)) : e.length < 4 ? this.error = "Name must be at least 4 characters long" : this.error = "Can only contain letters, numbers and - characters";
    }), this.usubscribe.push(c.subscribe((e) => {
      this.suggestions = e.suggestions, this.loading = e.loading;
    }), A.subscribeKey("profileName", (e) => {
      this.profileName = e, e && (this.error = "You already own a name");
    }));
  }
  firstUpdated() {
    var e;
    (e = this.formRef.value) == null || e.addEventListener("keydown", this.onEnterKey.bind(this));
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), this.usubscribe.forEach((i) => i()), (e = this.formRef.value) == null || e.removeEventListener("keydown", this.onEnterKey.bind(this));
  }
  render() {
    return l`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        gap="m"
        .padding=${["0", "s", "m", "s"]}
      >
        <form ${F(this.formRef)} @submit=${this.onSubmitName.bind(this)}>
          <wui-ens-input
            @inputChange=${this.onNameInputChange.bind(this)}
            .errorMessage=${this.error}
            .value=${this.name}
          >
          </wui-ens-input>
          ${this.submitButtonTemplate()}
          <input type="submit" hidden />
        </form>
        ${this.templateSuggestions()}
      </wui-flex>
    `;
  }
  submitButtonTemplate() {
    const e = this.suggestions.find((n) => {
      var r, t;
      return ((t = (r = n.name) == null ? void 0 : r.split(".")) == null ? void 0 : t[0]) === this.name && n.registered;
    });
    if (this.loading)
      return l`<wui-loading-spinner
        class="input-loading-spinner"
        color="fg-200"
      ></wui-loading-spinner>`;
    const i = `${this.name}${C.WC_NAME_SUFFIX}`;
    return l`
      <wui-icon-link
        .disabled=${e}
        class="input-submit-button"
        size="sm"
        icon="chevronRight"
        iconColor=${e ? "fg-200" : "accent-100"}
        @click=${() => this.onSubmitName(i)}
      >
      </wui-icon-link>
    `;
  }
  onNameInputChange(e) {
    this.onDebouncedNameInputChange(e.detail);
  }
  nameSuggestionTagTemplate(e) {
    return this.loading ? l`<wui-loading-spinner color="fg-200"></wui-loading-spinner>` : e.registered ? l`<wui-tag variant="shade" size="lg">Registered</wui-tag>` : l`<wui-tag variant="success" size="lg">Available</wui-tag>`;
  }
  templateSuggestions() {
    return !this.name || this.name.length < 4 || this.error ? null : l`<wui-flex flexDirection="column" gap="xxs" alignItems="center">
      ${this.suggestions.map((e) => l`<button
            .disabled=${e.registered || this.loading}
            data-testid="account-name-suggestion"
            class="suggestion"
            @click=${() => this.onSubmitName(e.name)}
          >
            <wui-text color="fg-100" variant="paragraph-400" class="suggested-name">
              ${e.name}</wui-text
            >${this.nameSuggestionTagTemplate(e)}
          </button>`)}
    </wui-flex>`;
  }
  isAllowedToSubmit(e) {
    var r;
    const i = (r = e.split(".")) == null ? void 0 : r[0], n = this.suggestions.find((t) => {
      var s, o;
      return ((o = (s = t.name) == null ? void 0 : s.split(".")) == null ? void 0 : o[0]) === i && t.registered;
    });
    return !this.loading && !this.error && !this.profileName && i && c.validateName(i) && !n;
  }
  async onSubmitName(e) {
    try {
      if (!this.isAllowedToSubmit(e))
        return;
      y.sendEvent({
        type: "track",
        event: "REGISTER_NAME_INITIATED",
        properties: {
          isSmartAccount: x($.state.activeChain) === T.ACCOUNT_TYPES.SMART_ACCOUNT,
          ensName: e
        }
      }), await c.registerName(e), y.sendEvent({
        type: "track",
        event: "REGISTER_NAME_SUCCESS",
        properties: {
          isSmartAccount: x($.state.activeChain) === T.ACCOUNT_TYPES.SMART_ACCOUNT,
          ensName: e
        }
      });
    } catch (i) {
      k.showError(i.message), y.sendEvent({
        type: "track",
        event: "REGISTER_NAME_ERROR",
        properties: {
          isSmartAccount: x($.state.activeChain) === T.ACCOUNT_TYPES.SMART_ACCOUNT,
          ensName: e,
          error: (i == null ? void 0 : i.message) || "Unknown error"
        }
      });
    }
  }
  onEnterKey(e) {
    if (e.key === "Enter" && this.name && this.isAllowedToSubmit(this.name)) {
      const i = `${this.name}${C.WC_NAME_SUFFIX}`;
      this.onSubmitName(i);
    }
  }
};
u.styles = K;
m([
  h()
], u.prototype, "errorMessage", void 0);
m([
  p()
], u.prototype, "name", void 0);
m([
  p()
], u.prototype, "error", void 0);
m([
  p()
], u.prototype, "loading", void 0);
m([
  p()
], u.prototype, "suggestions", void 0);
m([
  p()
], u.prototype, "profileName", void 0);
u = m([
  g("w3m-register-account-name-view")
], u);
const X = v`
  .continue-button-container {
    width: 100%;
  }
`;
var q = function(a, e, i, n) {
  var r = arguments.length, t = r < 3 ? e : n === null ? n = Object.getOwnPropertyDescriptor(e, i) : n, s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") t = Reflect.decorate(a, e, i, n);
  else for (var o = a.length - 1; o >= 0; o--) (s = a[o]) && (t = (r < 3 ? s(t) : r > 3 ? s(e, i, t) : s(e, i)) || t);
  return r > 3 && t && Object.defineProperty(e, i, t), t;
};
let E = class extends f {
  render() {
    return l`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        gap="xxl"
        .padding=${["0", "0", "l", "0"]}
      >
        ${this.onboardingTemplate()} ${this.buttonsTemplate()}
        <wui-link
          @click=${() => {
      U.openHref(V.URLS.FAQ, "_blank");
    }}
        >
          Learn more
          <wui-icon color="inherit" slot="iconRight" name="externalLink"></wui-icon>
        </wui-link>
      </wui-flex>
    `;
  }
  onboardingTemplate() {
    return l` <wui-flex
      flexDirection="column"
      gap="xxl"
      alignItems="center"
      .padding=${["0", "xxl", "0", "xxl"]}
    >
      <wui-flex gap="s" alignItems="center" justifyContent="center">
        <wui-icon-box
          size="xl"
          iconcolor="success-100"
          backgroundcolor="success-100"
          icon="checkmark"
          background="opaque"
        ></wui-icon-box>
      </wui-flex>
      <wui-flex flexDirection="column" alignItems="center" gap="s">
        <wui-text align="center" variant="medium-600" color="fg-100">
          Account name chosen successfully
        </wui-text>
        <wui-text align="center" variant="paragraph-400" color="fg-100">
          You can now fund your account and trade crypto
        </wui-text>
      </wui-flex>
    </wui-flex>`;
  }
  buttonsTemplate() {
    return l`<wui-flex
      .padding=${["0", "2l", "0", "2l"]}
      gap="s"
      class="continue-button-container"
    >
      <wui-button fullWidth size="lg" borderRadius="xs" @click=${this.redirectToAccount.bind(this)}
        >Let's Go!
      </wui-button>
    </wui-flex>`;
  }
  redirectToAccount() {
    H.replace("Account");
  }
};
E.styles = X;
E = q([
  g("w3m-register-account-name-success-view")
], E);
export {
  b as W3mApproveTransactionView,
  E as W3mRegisterAccountNameSuccess,
  u as W3mRegisterAccountNameView,
  O as W3mUpgradeWalletView
};
