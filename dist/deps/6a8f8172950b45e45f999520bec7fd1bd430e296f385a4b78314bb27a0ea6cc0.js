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
                                if (t3.push(i3), s3 !== void 0) {
                                    const t4 = e2.getAttribute(s3.toLowerCase() + "$lit$").split(n), i4 = /([.?@])?(.*)/.exec(s3);
                                    d2.push({ type: 1, index: l2, name: i4[2], strings: t4, ctor: i4[1] === "." ? I : i4[1] === "?" ? L : i4[1] === "@" ? R : H });
                                }
                                else
                                    d2.push({ type: 6, index: l2 });
                            }
                        for (const i3 of t3)
                            e2.removeAttribute(i3);
                    }
                    if (y.test(e2.tagName)) {
                        const t3 = e2.textContent.split(n), i3 = t3.length - 1;
                        if (i3 > 0) {
                            e2.textContent = o ? o.emptyScript : "";
                            for (let s3 = 0; s3 < i3; s3++)
                                e2.append(t3[s3], c()), E.nextNode(), d2.push({ type: 2, index: ++l2 });
                            e2.append(t3[i3], c());
                        }
                    }
                }
                else if (e2.nodeType === 8)
                    if (e2.data === h)
                        d2.push({ type: 2, index: l2 });
                    else {
                        let t3 = -1;
                        for (; (t3 = e2.data.indexOf(n, t3 + 1)) !== -1;)
                            d2.push({ type: 7, index: l2 }), t3 += n.length - 1;
                    }
                l2++;
            }
        }
        static createElement(t2, i2) {
            const s2 = u.createElement("template");
            return s2.innerHTML = t2, s2;
        }
    }
    function S(t2, i2, s2 = t2, e2) {
        var o2, l2, n2, h2;
        if (i2 === w)
            return i2;
        let r2 = e2 !== void 0 ? (o2 = s2.Σi) === null || o2 === void 0 ? void 0 : o2[e2] : s2.Σo;
        const u2 = d(i2) ? void 0 : i2._$litDirective$;
        return (r2 == null ? void 0 : r2.constructor) !== u2 && ((l2 = r2 == null ? void 0 : r2.O) === null || l2 === void 0 || l2.call(r2, false), u2 === void 0 ? r2 = void 0 : (r2 = new u2(t2), r2.T(t2, s2, e2)), e2 !== void 0 ? ((n2 = (h2 = s2).Σi) !== null && n2 !== void 0 ? n2 : h2.Σi = [])[e2] = r2 : s2.Σo = r2), r2 !== void 0 && (i2 = S(t2, r2.S(t2, i2.values), r2, e2)), i2;
    }
    class k {
        constructor(t2, i2) {
            this.l = [], this.N = void 0, this.D = t2, this.M = i2;
        }
        u(t2) {
            var i2;
            const { el: { content: s2 }, parts: e2 } = this.D, o2 = ((i2 = t2 == null ? void 0 : t2.creationScope) !== null && i2 !== void 0 ? i2 : u).importNode(s2, true);
            E.currentNode = o2;
            let l2 = E.nextNode(), n2 = 0, h2 = 0, r2 = e2[0];
            for (; r2 !== void 0;) {
                if (n2 === r2.index) {
                    let i3;
                    r2.type === 2 ? i3 = new C(l2, l2.nextSibling, this, t2) : r2.type === 1 ? i3 = new r2.ctor(l2, r2.name, r2.strings, this, t2) : r2.type === 6 && (i3 = new z(l2, this, t2)), this.l.push(i3), r2 = e2[++h2];
                }
                n2 !== (r2 == null ? void 0 : r2.index) && (l2 = E.nextNode(), n2++);
            }
            return o2;
        }
        v(t2) {
            let i2 = 0;
            for (const s2 of this.l)
                s2 !== void 0 && (s2.strings !== void 0 ? (s2.I(t2, s2, i2), i2 += s2.strings.length - 2) : s2.I(t2[i2])), i2++;
        }
    }
    class C {
        constructor(t2, i2, s2, e2) {
            this.type = 2, this.N = void 0, this.A = t2, this.B = i2, this.M = s2, this.options = e2;
        }
        setConnected(t2) {
            var i2;
            (i2 = this.P) === null || i2 === void 0 || i2.call(this, t2);
        }
        get parentNode() {
            return this.A.parentNode;
        }
        get startNode() {
            return this.A;
        }
        get endNode() {
            return this.B;
        }
        I(t2, i2 = this) {
            t2 = S(this, t2, i2), d(t2) ? t2 === A || t2 == null || t2 === "" ? (this.H !== A && this.R(), this.H = A) : t2 !== this.H && t2 !== w && this.m(t2) : t2._$litType$ !== void 0 ? this._(t2) : t2.nodeType !== void 0 ? this.$(t2) : a(t2) ? this.g(t2) : this.m(t2);
        }
        k(t2, i2 = this.B) {
            return this.A.parentNode.insertBefore(t2, i2);
        }
        $(t2) {
            this.H !== t2 && (this.R(), this.H = this.k(t2));
        }
        m(t2) {
            const i2 = this.A.nextSibling;
            i2 !== null && i2.nodeType === 3 && (this.B === null ? i2.nextSibling === null : i2 === this.B.previousSibling) ? i2.data = t2 : this.$(u.createTextNode(t2)), this.H = t2;
        }
        _(t2) {
            var i2;
            const { values: s2, _$litType$: e2 } = t2, o2 = typeof e2 == "number" ? this.C(t2) : (e2.el === void 0 && (e2.el = N.createElement(e2.h, this.options)), e2);
            if (((i2 = this.H) === null || i2 === void 0 ? void 0 : i2.D) === o2)
                this.H.v(s2);
            else {
                const t3 = new k(o2, this), i3 = t3.u(this.options);
                t3.v(s2), this.$(i3), this.H = t3;
            }
        }
        C(t2) {
            let i2 = P.get(t2.strings);
            return i2 === void 0 && P.set(t2.strings, i2 = new N(t2)), i2;
        }
        g(t2) {
            v(this.H) || (this.H = [], this.R());
            const i2 = this.H;
            let s2, e2 = 0;
            for (const o2 of t2)
                e2 === i2.length ? i2.push(s2 = new C(this.k(c()), this.k(c()), this, this.options)) : s2 = i2[e2], s2.I(o2), e2++;
            e2 < i2.length && (this.R(s2 && s2.B.nextSibling, e2), i2.length = e2);
        }
        R(t2 = this.A.nextSibling, i2) {
            var s2;
            for ((s2 = this.P) === null || s2 === void 0 || s2.call(this, false, true, i2); t2 && t2 !== this.B;) {
                const i3 = t2.nextSibling;
                t2.remove(), t2 = i3;
            }
        }
    }
    class H {
        constructor(t2, i2, s2, e2, o2) {
            this.type = 1, this.H = A, this.N = void 0, this.V = void 0, this.element = t2, this.name = i2, this.M = e2, this.options = o2, s2.length > 2 || s2[0] !== "" || s2[1] !== "" ? (this.H = Array(s2.length - 1).fill(A), this.strings = s2) : this.H = A;
        }
        get tagName() {
            return this.element.tagName;
        }
        I(t2, i2 = this, s2, e2) {
            const o2 = this.strings;
            let l2 = false;
            if (o2 === void 0)
                t2 = S(this, t2, i2, 0), l2 = !d(t2) || t2 !== this.H && t2 !== w, l2 && (this.H = t2);
            else {
                const e3 = t2;
                let n2, h2;
                for (t2 = o2[0], n2 = 0; n2 < o2.length - 1; n2++)
                    h2 = S(this, e3[s2 + n2], i2, n2), h2 === w && (h2 = this.H[n2]), l2 || (l2 = !d(h2) || h2 !== this.H[n2]), h2 === A ? t2 = A : t2 !== A && (t2 += (h2 != null ? h2 : "") + o2[n2 + 1]), this.H[n2] = h2;
            }
            l2 && !e2 && this.W(t2);
        }
        W(t2) {
            t2 === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t2 != null ? t2 : "");
        }
    }
    class I extends H {
        constructor() {
            super(...arguments), this.type = 3;
        }
        W(t2) {
            this.element[this.name] = t2 === A ? void 0 : t2;
        }
    }
    class L extends H {
        constructor() {
            super(...arguments), this.type = 4;
        }
        W(t2) {
            t2 && t2 !== A ? this.element.setAttribute(this.name, "") : this.element.removeAttribute(this.name);
        }
    }
    class R extends H {
        constructor() {
            super(...arguments), this.type = 5;
        }
        I(t2, i2 = this) {
            var s2;
            if ((t2 = (s2 = S(this, t2, i2, 0)) !== null && s2 !== void 0 ? s2 : A) === w)
                return;
            const e2 = this.H, o2 = t2 === A && e2 !== A || t2.capture !== e2.capture || t2.once !== e2.once || t2.passive !== e2.passive, l2 = t2 !== A && (e2 === A || o2);
            o2 && this.element.removeEventListener(this.name, this, e2), l2 && this.element.addEventListener(this.name, this, t2), this.H = t2;
        }
        handleEvent(t2) {
            var i2, s2;
            typeof this.H == "function" ? this.H.call((s2 = (i2 = this.options) === null || i2 === void 0 ? void 0 : i2.host) !== null && s2 !== void 0 ? s2 : this.element, t2) : this.H.handleEvent(t2);
        }
    }
    class z {
        constructor(t2, i2, s2) {
            this.element = t2, this.type = 6, this.N = void 0, this.V = void 0, this.M = i2, this.options = s2;
        }
        I(t2) {
            S(this, t2);
        }
    }
    const Z = { Z: "$lit$", U: n, Y: h, q: 1, X: M, tt: k, it: a, st: S, et: C, ot: H, nt: L, rt: R, lt: I, ht: z };
    (i = (t = globalThis).litHtmlPlatformSupport) === null || i === void 0 || i.call(t, N, C), ((s = (e = globalThis).litHtmlVersions) !== null && s !== void 0 ? s : e.litHtmlVersions = []).push("2.0.0-rc.3");
    const _default = null;
    return { default: _default, _Σ: Z, html: T, noChange: w, nothing: A, render: V, svg: x };
})();
const mod6 = (async () => {
    const { ReactiveElement } = await mod4;
    const { render, noChange } = await mod5;
    var i, l, o, s, n, a;
    const c = ReactiveElement;
    ((i = (a = globalThis).litElementVersions) !== null && i !== void 0 ? i : a.litElementVersions = []).push("3.0.0-rc.2");
    class h extends ReactiveElement {
        constructor() {
            super(...arguments), this.renderOptions = { host: this }, this.Φt = void 0;
        }
        createRenderRoot() {
            var t, e;
            const r = super.createRenderRoot();
            return (t = (e = this.renderOptions).renderBefore) !== null && t !== void 0 || (e.renderBefore = r.firstChild), r;
        }
        update(t) {
            const r = this.render();
            super.update(t), this.Φt = render(r, this.renderRoot, this.renderOptions);
        }
        connectedCallback() {
            var t;
            super.connectedCallback(), (t = this.Φt) === null || t === void 0 || t.setConnected(true);
        }
        disconnectedCallback() {
            var t;
            super.disconnectedCallback(), (t = this.Φt) === null || t === void 0 || t.setConnected(false);
        }
        render() {
            return noChange;
        }
    }
    h.finalized = true, h._$litElement$ = true, (o = (l = globalThis).litElementHydrateSupport) === null || o === void 0 || o.call(l, { LitElement: h }), (n = (s = globalThis).litElementPlatformSupport) === null || n === void 0 || n.call(s, { LitElement: h });
    const u = { K: (t, e, r) => {
            t.K(e, r);
        }, L: (t) => t.L };
    const _default = null;
    return { default: _default, LitElement: h, UpdatingElement: c, _Φ: u, ...await mod4, ...await mod5 };
})();
const mod2 = (async () => {
    await mod4;
    await mod5;
    const _default = null;
    return { default: _default, ...await mod6 };
})();
const mod = (async () => {
    const { default: _default } = await mod2;
    return { default: _default, ...await mod2 };
})();
const mod7 = (async () => {
    const n = (n2) => (e) => typeof e == "function" ? ((n3, e2) => (window.customElements.define(n3, e2), e2))(n2, e) : ((n3, e2) => {
        const { kind: t, elements: i } = e2;
        return { kind: t, elements: i, finisher(e3) {
                window.customElements.define(n3, e3);
            } };
    })(n2, e);
    const _default = null;
    return { default: _default, customElement: n };
})();
const mod8 = (async () => {
    const i = (i2, e2) => e2.kind === "method" && e2.descriptor && !("value" in e2.descriptor) ? { ...e2, finisher(n) {
            n.createProperty(e2.key, i2);
        } } : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: e2.key, initializer() {
            typeof e2.initializer == "function" && (this[e2.key] = e2.initializer.call(this));
        }, finisher(n) {
            n.createProperty(e2.key, i2);
        } };
    function e(e2) {
        return (n, t) => t !== void 0 ? ((i2, e3, n2) => {
            e3.constructor.createProperty(n2, i2);
        })(e2, n, t) : i(e2, n);
    }
    const _default = null;
    return { default: _default, property: e };
})();
const mod9 = (async () => {
    const { property: e } = await mod8;
    function r(r2) {
        return e({ ...r2, state: true, attribute: false });
    }
    const _default = null;
    return { default: _default, state: r };
})();
const mod16 = (async () => {
    const e = (e2, t2, o2) => {
        Object.defineProperty(t2, o2, e2);
    }, t = (e2, t2) => ({ kind: "method", placement: "prototype", key: t2.key, descriptor: e2 }), o = ({ finisher: e2, descriptor: t2 }) => (o2, n) => {
        var r;
        if (n === void 0) {
            const n2 = (r = o2.originalKey) !== null && r !== void 0 ? r : o2.key, i = t2 != null ? { kind: "method", placement: "prototype", key: n2, descriptor: t2(o2.key) } : { ...o2, key: n2 };
            return e2 != null && (i.finisher = function (t3) {
                e2(t3, n2);
            }), i;
        }
        {
            const r2 = o2.constructor;
            t2 !== void 0 && Object.defineProperty(o2, n, t2(n)), e2 == null || e2(r2, n);
        }
    };
    const _default = null;
    return { default: _default, decorateProperty: o, legacyPrototypeMethod: e, standardPrototypeMethod: t };
})();
const mod10 = (async () => {
    const { decorateProperty: o } = await mod16;
    function e(e2) {
        return o({ finisher: (r, t) => {
                Object.assign(r.prototype[t], e2);
            } });
    }
    const _default = null;
    return { default: _default, eventOptions: e };
})();
const mod11 = (async () => {
    const { decorateProperty: o$1 } = await mod16;
    function o(o2, r) {
        return o$1({ descriptor: (t) => {
                const i = { get() {
                        var t2;
                        return (t2 = this.renderRoot) === null || t2 === void 0 ? void 0 : t2.querySelector(o2);
                    }, enumerable: true, configurable: true };
                if (r) {
                    const r2 = typeof t == "symbol" ? Symbol() : "__" + t;
                    i.get = function () {
                        var t2;
                        return this[r2] === void 0 && (this[r2] = (t2 = this.renderRoot) === null || t2 === void 0 ? void 0 : t2.querySelector(o2)), this[r2];
                    };
                }
                return i;
            } });
    }
    const _default = null;
    return { default: _default, query: o };
})();
const mod12 = (async () => {
    const { decorateProperty: o } = await mod16;
    function e(e2) {
        return o({ descriptor: (r) => ({ get() {
                    var r2;
                    return (r2 = this.renderRoot) === null || r2 === void 0 ? void 0 : r2.querySelectorAll(e2);
                }, enumerable: true, configurable: true }) });
    }
    const _default = null;
    return { default: _default, queryAll: e };
})();
const mod13 = (async () => {
    const { decorateProperty: o } = await mod16;
    function e(e2) {
        return o({ descriptor: (r) => ({ async get() {
                    var r2;
                    return await this.updateComplete, (r2 = this.renderRoot) === null || r2 === void 0 ? void 0 : r2.querySelector(e2);
                }, enumerable: true, configurable: true }) });
    }
    const _default = null;
    return { default: _default, queryAsync: e };
})();
const mod14 = (async () => {
    const { decorateProperty: o$1 } = await mod16;
    const t = Element.prototype, n = t.msMatchesSelector || t.webkitMatchesSelector;
    function o(t2 = "", o2 = false, r = "") {
        return o$1({ descriptor: (e) => ({ get() {
                    var e2, l;
                    const i = "slot" + (t2 ? `[name=${t2}]` : ":not([name])");
                    let a = (l = (e2 = this.renderRoot) === null || e2 === void 0 ? void 0 : e2.querySelector(i)) === null || l === void 0 ? void 0 : l.assignedNodes({ flatten: o2 });
                    return a && r && (a = a.filter((e3) => e3.nodeType === Node.ELEMENT_NODE && (e3.matches ? e3.matches(r) : n.call(e3, r)))), a;
                }, enumerable: true, configurable: true }) });
    }
    const _default = null;
    return { default: _default, queryAssignedNodes: o };
})();
const mod3 = (async () => {
    const _default = null;
    return { default: _default, ...await mod7, ...await mod8, ...await mod9, ...await mod10, ...await mod11, ...await mod12, ...await mod13, ...await mod14 };
})();
const mod1 = (async () => {
    const { default: _default } = await mod3;
    return { default: _default, ...await mod3 };
})();
export default (async () => {
    const { LitElement, html, css } = await mod;
    const { customElement, property } = await mod1;
    let SimpleGreeting = class SimpleGreeting extends LitElement {
        static styles = css `p { color: black }`;
        name = "Somebody";
        render() {
            return html `<p>Hello, ${this.name}!</p>`;
        }
    };
    __decorate([
        property()
    ], SimpleGreeting.prototype, "name", void 0);
    SimpleGreeting = __decorate([
        customElement("simple-greeting")
    ], SimpleGreeting);
    return { SimpleGreeting };
})();
