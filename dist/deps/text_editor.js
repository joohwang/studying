var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/* https://cdn.skypack.dev/-/@lit/reactive-element@v1.0.0-rc.2-810hxb6J93lP2Fvpv3EZ/dist=es2020,mode=imports/optimized/@lit/reactive-element/css-tag.js */
const mod15 = (async () => {
    const t = window.ShadowRoot && (window.ShadyCSS === void 0 || window.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, e = Symbol();
    class s {
        constructor(t2, s3) {
            if (s3 !== e)
                throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
            this.cssText = t2;
        }
        get styleSheet() {
            return t && this.t === void 0 && (this.t = new CSSStyleSheet(), this.t.replaceSync(this.cssText)), this.t;
        }
        toString() {
            return this.cssText;
        }
    }
    const n = new Map(), o = (t2) => {
        let o2 = n.get(t2);
        return o2 === void 0 && n.set(t2, o2 = new s(t2, e)), o2;
    }, r = (t2) => o(typeof t2 == "string" ? t2 : t2 + ""), i = (t2, ...e2) => {
        const n2 = t2.length === 1 ? t2[0] : e2.reduce((e3, n3, o2) => e3 + ((t3) => {
            if (t3 instanceof s)
                return t3.cssText;
            if (typeof t3 == "number")
                return t3;
            throw Error("Value passed to 'css' function must be a 'css' function result: " + t3 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
        })(n3) + t2[o2 + 1], t2[0]);
        return o(n2);
    }, S = (e2, s2) => {
        t ? e2.adoptedStyleSheets = s2.map((t2) => t2 instanceof CSSStyleSheet ? t2 : t2.styleSheet) : s2.forEach((t2) => {
            const s3 = document.createElement("style");
            s3.textContent = t2.cssText, e2.appendChild(s3);
        });
    }, u = t ? (t2) => t2 : (t2) => t2 instanceof CSSStyleSheet ? ((t3) => {
        let e2 = "";
        for (const s2 of t3.cssRules)
            e2 += s2.cssText;
        return r(e2);
    })(t2) : t2;
    const _default = null;
    return { default: _default, CSSResult: s, adoptStyles: S, css: i, getCompatibleStyle: u, supportsAdoptingStyleSheets: t, unsafeCSS: r };
})();
const mod4 = (async () => {
    const { getCompatibleStyle: u, adoptStyles: S } = await mod15;
    const { CSSResult, adoptStyles, css, getCompatibleStyle, supportsAdoptingStyleSheets, unsafeCSS } = await mod15;
    var s, e, h, r;
    const o = { toAttribute(t, i) {
            switch (i) {
                case Boolean:
                    t = t ? "" : null;
                    break;
                case Object:
                case Array: t = t == null ? t : JSON.stringify(t);
            }
            return t;
        }, fromAttribute(t, i) {
            let s2 = t;
            switch (i) {
                case Boolean:
                    s2 = t !== null;
                    break;
                case Number:
                    s2 = t === null ? null : Number(t);
                    break;
                case Object:
                case Array: try {
                    s2 = JSON.parse(t);
                }
                catch (t2) {
                    s2 = null;
                }
            }
            return s2;
        } }, n = (t, i) => i !== t && (i == i || t == t), l = { attribute: true, type: String, converter: o, reflect: false, hasChanged: n };
    class a extends HTMLElement {
        constructor() {
            super(), this.Πi = new Map(), this.Πo = void 0, this.Πl = void 0, this.isUpdatePending = false, this.hasUpdated = false, this.Πh = null, this.u();
        }
        static addInitializer(t) {
            var i;
            (i = this.v) !== null && i !== void 0 || (this.v = []), this.v.push(t);
        }
        static get observedAttributes() {
            this.finalize();
            const t = [];
            return this.elementProperties.forEach((i, s2) => {
                const e2 = this.Πp(s2, i);
                e2 !== void 0 && (this.Πm.set(e2, s2), t.push(e2));
            }), t;
        }
        static createProperty(t, i = l) {
            if (i.state && (i.attribute = false), this.finalize(), this.elementProperties.set(t, i), !i.noAccessor && !this.prototype.hasOwnProperty(t)) {
                const s2 = typeof t == "symbol" ? Symbol() : "__" + t, e2 = this.getPropertyDescriptor(t, s2, i);
                e2 !== void 0 && Object.defineProperty(this.prototype, t, e2);
            }
        }
        static getPropertyDescriptor(t, i, s2) {
            return { get() {
                    return this[i];
                }, set(e2) {
                    const h2 = this[t];
                    this[i] = e2, this.requestUpdate(t, h2, s2);
                }, configurable: true, enumerable: true };
        }
        static getPropertyOptions(t) {
            return this.elementProperties.get(t) || l;
        }
        static finalize() {
            if (this.hasOwnProperty("finalized"))
                return false;
            this.finalized = true;
            const t = Object.getPrototypeOf(this);
            if (t.finalize(), this.elementProperties = new Map(t.elementProperties), this.Πm = new Map(), this.hasOwnProperty("properties")) {
                const t2 = this.properties, i = [...Object.getOwnPropertyNames(t2), ...Object.getOwnPropertySymbols(t2)];
                for (const s2 of i)
                    this.createProperty(s2, t2[s2]);
            }
            return this.elementStyles = this.finalizeStyles(this.styles), true;
        }
        static finalizeStyles(i) {
            const s2 = [];
            if (Array.isArray(i)) {
                const e2 = new Set(i.flat(1 / 0).reverse());
                for (const i2 of e2)
                    s2.unshift(u(i2));
            }
            else
                i !== void 0 && s2.push(u(i));
            return s2;
        }
        static Πp(t, i) {
            const s2 = i.attribute;
            return s2 === false ? void 0 : typeof s2 == "string" ? s2 : typeof t == "string" ? t.toLowerCase() : void 0;
        }
        u() {
            var t;
            this.Πg = new Promise((t2) => this.enableUpdating = t2), this.L = new Map(), this.Π_(), this.requestUpdate(), (t = this.constructor.v) === null || t === void 0 || t.forEach((t2) => t2(this));
        }
        addController(t) {
            var i, s2;
            ((i = this.ΠU) !== null && i !== void 0 ? i : this.ΠU = []).push(t), this.renderRoot !== void 0 && this.isConnected && ((s2 = t.hostConnected) === null || s2 === void 0 || s2.call(t));
        }
        removeController(t) {
            var i;
            (i = this.ΠU) === null || i === void 0 || i.splice(this.ΠU.indexOf(t) >>> 0, 1);
        }
        Π_() {
            this.constructor.elementProperties.forEach((t, i) => {
                this.hasOwnProperty(i) && (this.Πi.set(i, this[i]), delete this[i]);
            });
        }
        createRenderRoot() {
            var t;
            const s2 = (t = this.shadowRoot) !== null && t !== void 0 ? t : this.attachShadow(this.constructor.shadowRootOptions);
            return S(s2, this.constructor.elementStyles), s2;
        }
        connectedCallback() {
            var t;
            this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), (t = this.ΠU) === null || t === void 0 || t.forEach((t2) => {
                var i;
                return (i = t2.hostConnected) === null || i === void 0 ? void 0 : i.call(t2);
            }), this.Πl && (this.Πl(), this.Πo = this.Πl = void 0);
        }
        enableUpdating(t) {
        }
        disconnectedCallback() {
            var t;
            (t = this.ΠU) === null || t === void 0 || t.forEach((t2) => {
                var i;
                return (i = t2.hostDisconnected) === null || i === void 0 ? void 0 : i.call(t2);
            }), this.Πo = new Promise((t2) => this.Πl = t2);
        }
        attributeChangedCallback(t, i, s2) {
            this.K(t, s2);
        }
        Πj(t, i, s2 = l) {
            var e2, h2;
            const r2 = this.constructor.Πp(t, s2);
            if (r2 !== void 0 && s2.reflect === true) {
                const n2 = ((h2 = (e2 = s2.converter) === null || e2 === void 0 ? void 0 : e2.toAttribute) !== null && h2 !== void 0 ? h2 : o.toAttribute)(i, s2.type);
                this.Πh = t, n2 == null ? this.removeAttribute(r2) : this.setAttribute(r2, n2), this.Πh = null;
            }
        }
        K(t, i) {
            var s2, e2, h2;
            const r2 = this.constructor, n2 = r2.Πm.get(t);
            if (n2 !== void 0 && this.Πh !== n2) {
                const t2 = r2.getPropertyOptions(n2), l2 = t2.converter, a3 = (h2 = (e2 = (s2 = l2) === null || s2 === void 0 ? void 0 : s2.fromAttribute) !== null && e2 !== void 0 ? e2 : typeof l2 == "function" ? l2 : null) !== null && h2 !== void 0 ? h2 : o.fromAttribute;
                this.Πh = n2, this[n2] = a3(i, t2.type), this.Πh = null;
            }
        }
        requestUpdate(t, i, s2) {
            let e2 = true;
            t !== void 0 && (((s2 = s2 || this.constructor.getPropertyOptions(t)).hasChanged || n)(this[t], i) ? (this.L.has(t) || this.L.set(t, i), s2.reflect === true && this.Πh !== t && (this.Πk === void 0 && (this.Πk = new Map()), this.Πk.set(t, s2))) : e2 = false), !this.isUpdatePending && e2 && (this.Πg = this.Πq());
        }
        async Πq() {
            this.isUpdatePending = true;
            try {
                for (await this.Πg; this.Πo;)
                    await this.Πo;
            }
            catch (t2) {
                Promise.reject(t2);
            }
            const t = this.performUpdate();
            return t != null && await t, !this.isUpdatePending;
        }
        performUpdate() {
            var t;
            if (!this.isUpdatePending)
                return;
            this.hasUpdated, this.Πi && (this.Πi.forEach((t2, i2) => this[i2] = t2), this.Πi = void 0);
            let i = false;
            const s2 = this.L;
            try {
                i = this.shouldUpdate(s2), i ? (this.willUpdate(s2), (t = this.ΠU) === null || t === void 0 || t.forEach((t2) => {
                    var i2;
                    return (i2 = t2.hostUpdate) === null || i2 === void 0 ? void 0 : i2.call(t2);
                }), this.update(s2)) : this.Π$();
            }
            catch (t2) {
                throw i = false, this.Π$(), t2;
            }
            i && this.E(s2);
        }
        willUpdate(t) {
        }
        E(t) {
            var i;
            (i = this.ΠU) === null || i === void 0 || i.forEach((t2) => {
                var i2;
                return (i2 = t2.hostUpdated) === null || i2 === void 0 ? void 0 : i2.call(t2);
            }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t)), this.updated(t);
        }
        Π$() {
            this.L = new Map(), this.isUpdatePending = false;
        }
        get updateComplete() {
            return this.getUpdateComplete();
        }
        getUpdateComplete() {
            return this.Πg;
        }
        shouldUpdate(t) {
            return true;
        }
        update(t) {
            this.Πk !== void 0 && (this.Πk.forEach((t2, i) => this.Πj(i, this[i], t2)), this.Πk = void 0), this.Π$();
        }
        updated(t) {
        }
        firstUpdated(t) {
        }
    }
    a.finalized = true, a.elementProperties = new Map(), a.elementStyles = [], a.shadowRootOptions = { mode: "open" }, (e = (s = globalThis).reactiveElementPlatformSupport) === null || e === void 0 || e.call(s, { ReactiveElement: a }), ((h = (r = globalThis).reactiveElementVersions) !== null && h !== void 0 ? h : r.reactiveElementVersions = []).push("1.0.0-rc.2");
    const _default = null;
    return { default: _default, CSSResult, adoptStyles, css, getCompatibleStyle, supportsAdoptingStyleSheets, unsafeCSS, ReactiveElement: a, defaultConverter: o, notEqual: n };
})();
const mod5 = (async () => {
    var t, i, s, e;
    const o = globalThis.trustedTypes, l = o ? o.createPolicy("lit-html", { createHTML: (t2) => t2 }) : void 0, n = `lit$${(Math.random() + "").slice(9)}$`, h = "?" + n, r = `<${h}>`, u = document, c = (t2 = "") => u.createComment(t2), d = (t2) => t2 === null || typeof t2 != "object" && typeof t2 != "function", v = Array.isArray, a = (t2) => {
        var i2;
        return v(t2) || typeof ((i2 = t2) === null || i2 === void 0 ? void 0 : i2[Symbol.iterator]) == "function";
    }, f = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, _ = /-->/g, m = />/g, p = />|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g, $ = /'/g, g = /"/g, y = /^(?:script|style|textarea)$/i, b = (t2) => (i2, ...s2) => ({ _$litType$: t2, strings: i2, values: s2 }), T = b(1), x = b(2), w = Symbol.for("lit-noChange"), A = Symbol.for("lit-nothing"), P = new WeakMap(), V = (t2, i2, s2) => {
        var e2, o2;
        const l2 = (e2 = s2 == null ? void 0 : s2.renderBefore) !== null && e2 !== void 0 ? e2 : i2;
        let n2 = l2._$litPart$;
        if (n2 === void 0) {
            const t3 = (o2 = s2 == null ? void 0 : s2.renderBefore) !== null && o2 !== void 0 ? o2 : null;
            l2._$litPart$ = n2 = new C(i2.insertBefore(c(), t3), t3, void 0, s2);
        }
        return n2.I(t2), n2;
    }, E = u.createTreeWalker(u, 129, null, false), M = (t2, i2) => {
        const s2 = t2.length - 1, e2 = [];
        let o2, h2 = i2 === 2 ? "<svg>" : "", u2 = f;
        for (let i3 = 0; i3 < s2; i3++) {
            const s3 = t2[i3];
            let l2, c3, d2 = -1, v2 = 0;
            for (; v2 < s3.length && (u2.lastIndex = v2, c3 = u2.exec(s3), c3 !== null);)
                v2 = u2.lastIndex, u2 === f ? c3[1] === "!--" ? u2 = _ : c3[1] !== void 0 ? u2 = m : c3[2] !== void 0 ? (y.test(c3[2]) && (o2 = RegExp("</" + c3[2], "g")), u2 = p) : c3[3] !== void 0 && (u2 = p) : u2 === p ? c3[0] === ">" ? (u2 = o2 != null ? o2 : f, d2 = -1) : c3[1] === void 0 ? d2 = -2 : (d2 = u2.lastIndex - c3[2].length, l2 = c3[1], u2 = c3[3] === void 0 ? p : c3[3] === "\"" ? g : $) : u2 === g || u2 === $ ? u2 = p : u2 === _ || u2 === m ? u2 = f : (u2 = p, o2 = void 0);
            const a2 = u2 === p && t2[i3 + 1].startsWith("/>") ? " " : "";
            h2 += u2 === f ? s3 + r : d2 >= 0 ? (e2.push(l2), s3.slice(0, d2) + "$lit$" + s3.slice(d2) + n + a2) : s3 + n + (d2 === -2 ? (e2.push(void 0), i3) : a2);
        }
        const c2 = h2 + (t2[s2] || "<?>") + (i2 === 2 ? "</svg>" : "");
        return [l !== void 0 ? l.createHTML(c2) : c2, e2];
    };
    class N {
        constructor({ strings: t2, _$litType$: i2 }, s2) {
            let e2;
            this.parts = [];
            let l2 = 0, r2 = 0;
            const u2 = t2.length - 1, d2 = this.parts, [v2, a2] = M(t2, i2);
            if (this.el = N.createElement(v2, s2), E.currentNode = this.el.content, i2 === 2) {
                const t3 = this.el.content, i3 = t3.firstChild;
                i3.remove(), t3.append(...i3.childNodes);
            }
            for (; (e2 = E.nextNode()) !== null && d2.length < u2;) {
                if (e2.nodeType === 1) {
                    if (e2.hasAttributes()) {
                        const t3 = [];
                        for (const i3 of e2.getAttributeNames())
                            if (i3.endsWith("$lit$") || i3.startsWith(n)) {
                                const s3 = a2[r2++];
             