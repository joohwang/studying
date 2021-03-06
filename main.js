const t1 = window.ShadowRoot && (window.ShadyCSS === void 0 || window.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, e7 = Symbol();
class s {
    constructor(t22, s31){
        if (s31 !== e7) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
        this.cssText = t22;
    }
    get styleSheet() {
        return t1 && this.t === void 0 && (this.t = new CSSStyleSheet(), this.t.replaceSync(this.cssText)), this.t;
    }
    toString() {
        return this.cssText;
    }
}
const n5 = new Map(), o = (t21)=>{
    let o2 = n5.get(t21);
    return o2 === void 0 && n5.set(t21, o2 = new s(t21, e7)), o2;
}, r5 = (t21)=>o(typeof t21 == "string" ? t21 : t21 + "")
, i1 = (t21, ...e2)=>{
    const n2 = t21.length === 1 ? t21[0] : e2.reduce((e3, n3, o2)=>e3 + ((t3)=>{
            if (t3 instanceof s) return t3.cssText;
            if (typeof t3 == "number") return t3;
            throw Error("Value passed to 'css' function must be a 'css' function result: " + t3 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
        })(n3) + t21[o2 + 1]
    , t21[0]);
    return o(n2);
}, S = (e2, s2)=>{
    t1 ? e2.adoptedStyleSheets = s2.map((t21)=>t21 instanceof CSSStyleSheet ? t21 : t21.styleSheet
    ) : s2.forEach((t21)=>{
        const s31 = document.createElement("style");
        s31.textContent = t21.cssText, e2.appendChild(s31);
    });
}, u = t1 ? (t21)=>t21
 : (t21)=>t21 instanceof CSSStyleSheet ? ((t3)=>{
        let e2 = "";
        for (const s2 of t3.cssRules)e2 += s2.cssText;
        return r5(e2);
    })(t21) : t21
;
var s1, e1, h, r1;
const o1 = {
    toAttribute (t, i) {
        switch(i){
            case Boolean:
                t = t ? "" : null;
                break;
            case Object:
            case Array:
                t = t == null ? t : JSON.stringify(t);
        }
        return t;
    },
    fromAttribute (t, i) {
        let s2 = t;
        switch(i){
            case Boolean:
                s2 = t !== null;
                break;
            case Number:
                s2 = t === null ? null : Number(t);
                break;
            case Object:
            case Array:
                try {
                    s2 = JSON.parse(t);
                } catch (t21) {
                    s2 = null;
                }
        }
        return s2;
    }
}, n1 = (t3, i2)=>i2 !== t3 && (i2 == i2 || t3 == t3)
, l = {
    attribute: true,
    type: String,
    converter: o1,
    reflect: false,
    hasChanged: n1
};
class a extends HTMLElement {
    constructor(){
        super(), this.??i = new Map(), this.??o = void 0, this.??l = void 0, this.isUpdatePending = false, this.hasUpdated = false, this.??h = null, this.u();
    }
    static addInitializer(t) {
        var i2;
        (i2 = this.v) !== null && i2 !== void 0 || (this.v = []), this.v.push(t);
    }
    static get observedAttributes() {
        this.finalize();
        const t3 = [];
        return this.elementProperties.forEach((i3, s2)=>{
            const e2 = this.??p(s2, i3);
            e2 !== void 0 && (this.??m.set(e2, s2), t3.push(e2));
        }), t3;
    }
    static createProperty(t, i = l) {
        if (i.state && (i.attribute = false), this.finalize(), this.elementProperties.set(t, i), !i.noAccessor && !this.prototype.hasOwnProperty(t)) {
            const s2 = typeof t == "symbol" ? Symbol() : "__" + t, e2 = this.getPropertyDescriptor(t, s2, i);
            e2 !== void 0 && Object.defineProperty(this.prototype, t, e2);
        }
    }
    static getPropertyDescriptor(t, i, s2) {
        return {
            get () {
                return this[i];
            },
            set (e2) {
                const h2 = this[t];
                this[i] = e2, this.requestUpdate(t, h2, s2);
            },
            configurable: true,
            enumerable: true
        };
    }
    static getPropertyOptions(t) {
        return this.elementProperties.get(t) || l;
    }
    static finalize() {
        if (this.hasOwnProperty("finalized")) return false;
        this.finalized = true;
        const t3 = Object.getPrototypeOf(this);
        if (t3.finalize(), this.elementProperties = new Map(t3.elementProperties), this.??m = new Map(), this.hasOwnProperty("properties")) {
            const t21 = this.properties, i3 = [
                ...Object.getOwnPropertyNames(t21),
                ...Object.getOwnPropertySymbols(t21)
            ];
            for (const s2 of i3)this.createProperty(s2, t21[s2]);
        }
        return this.elementStyles = this.finalizeStyles(this.styles), true;
    }
    static finalizeStyles(i) {
        const s2 = [];
        if (Array.isArray(i)) {
            const e2 = new Set(i.flat(1 / 0).reverse());
            for (const i21 of e2)s2.unshift(u(i21));
        } else i !== void 0 && s2.push(u(i));
        return s2;
    }
    static ??p(t, i) {
        const s2 = i.attribute;
        return s2 === false ? void 0 : typeof s2 == "string" ? s2 : typeof t == "string" ? t.toLowerCase() : void 0;
    }
    u() {
        var t3;
        this.??g = new Promise((t21)=>this.enableUpdating = t21
        ), this.L = new Map(), this.??_(), this.requestUpdate(), (t3 = this.constructor.v) === null || t3 === void 0 || t3.forEach((t21)=>t21(this)
        );
    }
    addController(t) {
        var i3, s2;
        ((i3 = this.??U) !== null && i3 !== void 0 ? i3 : this.??U = []).push(t), this.renderRoot !== void 0 && this.isConnected && ((s2 = t.hostConnected) === null || s2 === void 0 || s2.call(t));
    }
    removeController(t) {
        var i4;
        (i4 = this.??U) === null || i4 === void 0 || i4.splice(this.??U.indexOf(t) >>> 0, 1);
    }
    ??_() {
        this.constructor.elementProperties.forEach((t4, i5)=>{
            this.hasOwnProperty(i5) && (this.??i.set(i5, this[i5]), delete this[i5]);
        });
    }
    createRenderRoot() {
        var t4;
        const s2 = (t4 = this.shadowRoot) !== null && t4 !== void 0 ? t4 : this.attachShadow(this.constructor.shadowRootOptions);
        return S(s2, this.constructor.elementStyles), s2;
    }
    connectedCallback() {
        var t5;
        this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), (t5 = this.??U) === null || t5 === void 0 || t5.forEach((t21)=>{
            var i5;
            return (i5 = t21.hostConnected) === null || i5 === void 0 ? void 0 : i5.call(t21);
        }), this.??l && (this.??l(), this.??o = this.??l = void 0);
    }
    enableUpdating(t) {
    }
    disconnectedCallback() {
        var t6;
        (t6 = this.??U) === null || t6 === void 0 || t6.forEach((t21)=>{
            var i6;
            return (i6 = t21.hostDisconnected) === null || i6 === void 0 ? void 0 : i6.call(t21);
        }), this.??o = new Promise((t21)=>this.??l = t21
        );
    }
    attributeChangedCallback(t, i, s2) {
        this.K(t, s2);
    }
    ??j(t, i, s2 = l) {
        var e2, h2;
        const r2 = this.constructor.??p(t, s2);
        if (r2 !== void 0 && s2.reflect === true) {
            const n2 = ((h2 = (e2 = s2.converter) === null || e2 === void 0 ? void 0 : e2.toAttribute) !== null && h2 !== void 0 ? h2 : o1.toAttribute)(i, s2.type);
            this.??h = t, n2 == null ? this.removeAttribute(r2) : this.setAttribute(r2, n2), this.??h = null;
        }
    }
    K(t, i) {
        var s2, e2, h2;
        const r2 = this.constructor, n2 = r2.??m.get(t);
        if (n2 !== void 0 && this.??h !== n2) {
            const t21 = r2.getPropertyOptions(n2), l2 = t21.converter, a3 = (h2 = (e2 = (s2 = l2) === null || s2 === void 0 ? void 0 : s2.fromAttribute) !== null && e2 !== void 0 ? e2 : typeof l2 == "function" ? l2 : null) !== null && h2 !== void 0 ? h2 : o1.fromAttribute;
            this.??h = n2, this[n2] = a3(i, t21.type), this.??h = null;
        }
    }
    requestUpdate(t, i, s2) {
        let e2 = true;
        t !== void 0 && (((s2 = s2 || this.constructor.getPropertyOptions(t)).hasChanged || n1)(this[t], i) ? (this.L.has(t) || this.L.set(t, i), s2.reflect === true && this.??h !== t && (this.??k === void 0 && (this.??k = new Map()), this.??k.set(t, s2))) : e2 = false), !this.isUpdatePending && e2 && (this.??g = this.??q());
    }
    async ??q() {
        this.isUpdatePending = true;
        try {
            for(await this.??g; this.??o;)await this.??o;
        } catch (t21) {
            Promise.reject(t21);
        }
        const t7 = this.performUpdate();
        return t7 != null && await t7, !this.isUpdatePending;
    }
    performUpdate() {
        var t7;
        if (!this.isUpdatePending) return;
        this.hasUpdated, this.??i && (this.??i.forEach((t21, i21)=>this[i21] = t21
        ), this.??i = void 0);
        let i7 = false;
        const s2 = this.L;
        try {
            i7 = this.shouldUpdate(s2), i7 ? (this.willUpdate(s2), (t7 = this.??U) === null || t7 === void 0 || t7.forEach((t21)=>{
                var i21;
                return (i21 = t21.hostUpdate) === null || i21 === void 0 ? void 0 : i21.call(t21);
            }), this.update(s2)) : this.??$();
        } catch (t21) {
            throw i7 = false, this.??$(), t21;
        }
        i7 && this.E(s2);
    }
    willUpdate(t) {
    }
    E(t) {
        var i7;
        (i7 = this.??U) === null || i7 === void 0 || i7.forEach((t21)=>{
            var i22;
            return (i22 = t21.hostUpdated) === null || i22 === void 0 ? void 0 : i22.call(t21);
        }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t)), this.updated(t);
    }
    ??$() {
        this.L = new Map(), this.isUpdatePending = false;
    }
    get updateComplete() {
        return this.getUpdateComplete();
    }
    getUpdateComplete() {
        return this.??g;
    }
    shouldUpdate(t) {
        return true;
    }
    update(t) {
        this.??k !== void 0 && (this.??k.forEach((t21, i8)=>this.??j(i8, this[i8], t21)
        ), this.??k = void 0), this.??$();
    }
    updated(t) {
    }
    firstUpdated(t) {
    }
}
a.finalized = true, a.elementProperties = new Map(), a.elementStyles = [], a.shadowRootOptions = {
    mode: "open"
}, (e1 = (s1 = globalThis).reactiveElementPlatformSupport) === null || e1 === void 0 || e1.call(s1, {
    ReactiveElement: a
}), ((h = (r1 = globalThis).reactiveElementVersions) !== null && h !== void 0 ? h : r1.reactiveElementVersions = []).push("1.0.0-rc.2");
var t8, i8, s2, e2;
const o2 = globalThis.trustedTypes, l1 = o2 ? o2.createPolicy("lit-html", {
    createHTML: (t21)=>t21
}) : void 0, n2 = `lit$${(Math.random() + "").slice(9)}$`, h1 = "?" + n2, r2 = `<${h1}>`, u1 = document, c = (t21 = "")=>u1.createComment(t21)
, d = (t21)=>t21 === null || typeof t21 != "object" && typeof t21 != "function"
, v = Array.isArray, a1 = (t21)=>{
    var i23;
    return v(t21) || typeof ((i23 = t21) === null || i23 === void 0 ? void 0 : i23[Symbol.iterator]) == "function";
}, f = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, _ = /-->/g, m = />/g, p = />|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g, $ = /'/g, g = /"/g, y1 = /^(?:script|style|textarea)$/i, b = (t21)=>(i24, ...s21)=>({
            _$litType$: t21,
            strings: i24,
            values: s21
        })
, T = b(1), w = Symbol.for("lit-noChange"), A = Symbol.for("lit-nothing"), P = new WeakMap(), V = (t21, i24, s21)=>{
    var e21, o21;
    const l2 = (e21 = s21 == null ? void 0 : s21.renderBefore) !== null && e21 !== void 0 ? e21 : i24;
    let n21 = l2._$litPart$;
    if (n21 === void 0) {
        const t31 = (o21 = s21 == null ? void 0 : s21.renderBefore) !== null && o21 !== void 0 ? o21 : null;
        l2._$litPart$ = n21 = new C(i24.insertBefore(c(), t31), t31, void 0, s21);
    }
    return n21.I(t21), n21;
}, E = u1.createTreeWalker(u1, 129, null, false), M = (t21, i24)=>{
    const s21 = t21.length - 1, e22 = [];
    let o22, h2 = i24 === 2 ? "<svg>" : "", u2 = f;
    for(let i31 = 0; i31 < s21; i31++){
        const s31 = t21[i31];
        let l2, c3, d2 = -1, v2 = 0;
        for(; v2 < s31.length && (u2.lastIndex = v2, c3 = u2.exec(s31), c3 !== null);)v2 = u2.lastIndex, u2 === f ? c3[1] === "!--" ? u2 = _ : c3[1] !== void 0 ? u2 = m : c3[2] !== void 0 ? (y1.test(c3[2]) && (o22 = RegExp("</" + c3[2], "g")), u2 = p) : c3[3] !== void 0 && (u2 = p) : u2 === p ? c3[0] === ">" ? (u2 = o22 != null ? o22 : f, d2 = -1) : c3[1] === void 0 ? d2 = -2 : (d2 = u2.lastIndex - c3[2].length, l2 = c3[1], u2 = c3[3] === void 0 ? p : c3[3] === '"' ? g : $) : u2 === g || u2 === $ ? u2 = p : u2 === _ || u2 === m ? u2 = f : (u2 = p, o22 = void 0);
        const a2 = u2 === p && t21[i31 + 1].startsWith("/>") ? " " : "";
        h2 += u2 === f ? s31 + r2 : d2 >= 0 ? (e22.push(l2), s31.slice(0, d2) + "$lit$" + s31.slice(d2) + n2 + a2) : s31 + n2 + (d2 === -2 ? (e22.push(void 0), i31) : a2);
    }
    const c2 = h2 + (t21[s21] || "<?>") + (i24 === 2 ? "</svg>" : "");
    return [
        l1 !== void 0 ? l1.createHTML(c2) : c2,
        e22
    ];
};
class N {
    constructor({ strings: t21 , _$litType$: i24  }, s21){
        let e22;
        this.parts = [];
        let l2 = 0, r21 = 0;
        const u2 = t21.length - 1, d2 = this.parts, [v2, a2] = M(t21, i24);
        if (this.el = N.createElement(v2, s21), E.currentNode = this.el.content, i24 === 2) {
            const t31 = this.el.content, i31 = t31.firstChild;
            i31.remove(), t31.append(...i31.childNodes);
        }
        for(; (e22 = E.nextNode()) !== null && d2.length < u2;){
            if (e22.nodeType === 1) {
                if (e22.hasAttributes()) {
                    const t31 = [];
                    for (const i31 of e22.getAttributeNames())if (i31.endsWith("$lit$") || i31.startsWith(n2)) {
                        const s31 = a2[r21++];
                        if (t31.push(i31), s31 !== void 0) {
                            const t41 = e22.getAttribute(s31.toLowerCase() + "$lit$").split(n2), i41 = /([.?@])?(.*)/.exec(s31);
                            d2.push({
                                type: 1,
                                index: l2,
                                name: i41[2],
                                strings: t41,
                                ctor: i41[1] === "." ? I : i41[1] === "?" ? L : i41[1] === "@" ? R : H
                            });
                        } else d2.push({
                            type: 6,
                            index: l2
                        });
                    }
                    for (const i32 of t31)e22.removeAttribute(i32);
                }
                if (y1.test(e22.tagName)) {
                    const t31 = e22.textContent.split(n2), i31 = t31.length - 1;
                    if (i31 > 0) {
                        e22.textContent = o2 ? o2.emptyScript : "";
                        for(let s31 = 0; s31 < i31; s31++)e22.append(t31[s31], c()), E.nextNode(), d2.push({
                            type: 2,
                            index: ++l2
                        });
                        e22.append(t31[i31], c());
                    }
                }
            } else if (e22.nodeType === 8) {
                if (e22.data === h1) d2.push({
                    type: 2,
                    index: l2
                });
                else {
                    let t31 = -1;
                    for(; (t31 = e22.data.indexOf(n2, t31 + 1)) !== -1;)d2.push({
                        type: 7,
                        index: l2
                    }), t31 += n2.length - 1;
                }
            }
            l2++;
        }
    }
    static createElement(t2, i2) {
        const s22 = u1.createElement("template");
        return s22.innerHTML = t2, s22;
    }
}
function S1(t23, i26, s22 = t23, e23) {
    var o22, l21, n21, h2;
    if (i26 === w) return i26;
    let r22 = e23 !== void 0 ? (o22 = s22.??i) === null || o22 === void 0 ? void 0 : o22[e23] : s22.??o;
    const u21 = d(i26) ? void 0 : i26._$litDirective$;
    return (r22 == null ? void 0 : r22.constructor) !== u21 && ((l21 = r22 == null ? void 0 : r22.O) === null || l21 === void 0 || l21.call(r22, false), u21 === void 0 ? r22 = void 0 : (r22 = new u21(t23), r22.T(t23, s22, e23)), e23 !== void 0 ? ((n21 = (h2 = s22).??i) !== null && n21 !== void 0 ? n21 : h2.??i = [])[e23] = r22 : s22.??o = r22), r22 !== void 0 && (i26 = S1(t23, r22.S(t23, i26.values), r22, e23)), i26;
}
class k {
    constructor(t23, i26){
        this.l = [], this.N = void 0, this.D = t23, this.M = i26;
    }
    u(t2) {
        var i27;
        const { el: { content: s22  } , parts: e23  } = this.D, o22 = ((i27 = t2 == null ? void 0 : t2.creationScope) !== null && i27 !== void 0 ? i27 : u1).importNode(s22, true);
        E.currentNode = o22;
        let l21 = E.nextNode(), n21 = 0, h2 = 0, r22 = e23[0];
        for(; r22 !== void 0;){
            if (n21 === r22.index) {
                let i31;
                r22.type === 2 ? i31 = new C(l21, l21.nextSibling, this, t2) : r22.type === 1 ? i31 = new r22.ctor(l21, r22.name, r22.strings, this, t2) : r22.type === 6 && (i31 = new z(l21, this, t2)), this.l.push(i31), r22 = e23[++h2];
            }
            n21 !== (r22 == null ? void 0 : r22.index) && (l21 = E.nextNode(), n21++);
        }
        return o22;
    }
    v(t2) {
        let i28 = 0;
        for (const s22 of this.l)s22 !== void 0 && (s22.strings !== void 0 ? (s22.I(t2, s22, i28), i28 += s22.strings.length - 2) : s22.I(t2[i28])), i28++;
    }
}
class C {
    constructor(t24, i28, s22, e23){
        this.type = 2, this.N = void 0, this.A = t24, this.B = i28, this.M = s22, this.options = e23;
    }
    setConnected(t2) {
        var i29;
        (i29 = this.P) === null || i29 === void 0 || i29.call(this, t2);
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
        t2 = S1(this, t2, i2), d(t2) ? t2 === A || t2 == null || t2 === "" ? (this.H !== A && this.R(), this.H = A) : t2 !== this.H && t2 !== w && this.m(t2) : t2._$litType$ !== void 0 ? this._(t2) : t2.nodeType !== void 0 ? this.$(t2) : a1(t2) ? this.g(t2) : this.m(t2);
    }
    k(t2, i2 = this.B) {
        return this.A.parentNode.insertBefore(t2, i2);
    }
    $(t2) {
        this.H !== t2 && (this.R(), this.H = this.k(t2));
    }
    m(t2) {
        const i210 = this.A.nextSibling;
        i210 !== null && i210.nodeType === 3 && (this.B === null ? i210.nextSibling === null : i210 === this.B.previousSibling) ? i210.data = t2 : this.$(u1.createTextNode(t2)), this.H = t2;
    }
    _(t2) {
        var i210;
        const { values: s23 , _$litType$: e24  } = t2, o22 = typeof e24 == "number" ? this.C(t2) : (e24.el === void 0 && (e24.el = N.createElement(e24.h, this.options)), e24);
        if (((i210 = this.H) === null || i210 === void 0 ? void 0 : i210.D) === o22) this.H.v(s23);
        else {
            const t31 = new k(o22, this), i31 = t31.u(this.options);
            t31.v(s23), this.$(i31), this.H = t31;
        }
    }
    C(t2) {
        let i211 = P.get(t2.strings);
        return i211 === void 0 && P.set(t2.strings, i211 = new N(t2)), i211;
    }
    g(t2) {
        v(this.H) || (this.H = [], this.R());
        const i211 = this.H;
        let s23, e24 = 0;
        for (const o22 of t2)e24 === i211.length ? i211.push(s23 = new C(this.k(c()), this.k(c()), this, this.options)) : s23 = i211[e24], s23.I(o22), e24++;
        e24 < i211.length && (this.R(s23 && s23.B.nextSibling, e24), i211.length = e24);
    }
    R(t2 = this.A.nextSibling, i2) {
        var s23;
        for((s23 = this.P) === null || s23 === void 0 || s23.call(this, false, true, i2); t2 && t2 !== this.B;){
            const i31 = t2.nextSibling;
            t2.remove(), t2 = i31;
        }
    }
}
class H {
    constructor(t25, i211, s24, e24, o22){
        this.type = 1, this.H = A, this.N = void 0, this.V = void 0, this.element = t25, this.name = i211, this.M = e24, this.options = o22, s24.length > 2 || s24[0] !== "" || s24[1] !== "" ? (this.H = Array(s24.length - 1).fill(A), this.strings = s24) : this.H = A;
    }
    get tagName() {
        return this.element.tagName;
    }
    I(t2, i2 = this, s2, e2) {
        const o23 = this.strings;
        let l21 = false;
        if (o23 === void 0) t2 = S1(this, t2, i2, 0), l21 = !d(t2) || t2 !== this.H && t2 !== w, l21 && (this.H = t2);
        else {
            const e3 = t2;
            let n21, h2;
            for(t2 = o23[0], n21 = 0; n21 < o23.length - 1; n21++)h2 = S1(this, e3[s2 + n21], i2, n21), h2 === w && (h2 = this.H[n21]), l21 || (l21 = !d(h2) || h2 !== this.H[n21]), h2 === A ? t2 = A : t2 !== A && (t2 += (h2 != null ? h2 : "") + o23[n21 + 1]), this.H[n21] = h2;
        }
        l21 && !e2 && this.W(t2);
    }
    W(t2) {
        t2 === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t2 != null ? t2 : "");
    }
}
class I extends H {
    constructor(){
        super(...arguments), this.type = 3;
    }
    W(t2) {
        this.element[this.name] = t2 === A ? void 0 : t2;
    }
}
class L extends H {
    constructor(){
        super(...arguments), this.type = 4;
    }
    W(t2) {
        t2 && t2 !== A ? this.element.setAttribute(this.name, "") : this.element.removeAttribute(this.name);
    }
}
class R extends H {
    constructor(){
        super(...arguments), this.type = 5;
    }
    I(t2, i2 = this) {
        var s26;
        if ((t2 = (s26 = S1(this, t2, i2, 0)) !== null && s26 !== void 0 ? s26 : A) === w) return;
        const e26 = this.H, o23 = t2 === A && e26 !== A || t2.capture !== e26.capture || t2.once !== e26.once || t2.passive !== e26.passive, l21 = t2 !== A && (e26 === A || o23);
        o23 && this.element.removeEventListener(this.name, this, e26), l21 && this.element.addEventListener(this.name, this, t2), this.H = t2;
    }
    handleEvent(t2) {
        var i212, s27;
        typeof this.H == "function" ? this.H.call((s27 = (i212 = this.options) === null || i212 === void 0 ? void 0 : i212.host) !== null && s27 !== void 0 ? s27 : this.element, t2) : this.H.handleEvent(t2);
    }
}
class z {
    constructor(t26, i213, s28){
        this.element = t26, this.type = 6, this.N = void 0, this.V = void 0, this.M = i213, this.options = s28;
    }
    I(t2) {
        S1(this, t2);
    }
}
(i8 = (t8 = globalThis).litHtmlPlatformSupport) === null || i8 === void 0 || i8.call(t8, N, C), ((s2 = (e2 = globalThis).litHtmlVersions) !== null && s2 !== void 0 ? s2 : e2.litHtmlVersions = []).push("2.0.0-rc.3");
var i9, l3, o3, s4, n3, a3;
((i9 = (a3 = globalThis).litElementVersions) !== null && i9 !== void 0 ? i9 : a3.litElementVersions = []).push("3.0.0-rc.2");
class h2 extends a {
    constructor(){
        super(...arguments), this.renderOptions = {
            host: this
        }, this.??t = void 0;
    }
    createRenderRoot() {
        var t9, e3;
        const r3 = super.createRenderRoot();
        return (t9 = (e3 = this.renderOptions).renderBefore) !== null && t9 !== void 0 || (e3.renderBefore = r3.firstChild), r3;
    }
    update(t) {
        const r3 = this.render();
        super.update(t), this.??t = V(r3, this.renderRoot, this.renderOptions);
    }
    connectedCallback() {
        var t10;
        super.connectedCallback(), (t10 = this.??t) === null || t10 === void 0 || t10.setConnected(true);
    }
    disconnectedCallback() {
        var t11;
        super.disconnectedCallback(), (t11 = this.??t) === null || t11 === void 0 || t11.setConnected(false);
    }
    render() {
        return w;
    }
}
h2.finalized = true, h2._$litElement$ = true, (o3 = (l3 = globalThis).litElementHydrateSupport) === null || o3 === void 0 || o3.call(l3, {
    LitElement: h2
}), (n3 = (s4 = globalThis).litElementPlatformSupport) === null || n3 === void 0 || n3.call(s4, {
    LitElement: h2
});
const n4 = (n21)=>(e4)=>typeof e4 == "function" ? ((n31, e26)=>(window.customElements.define(n31, e26), e26)
        )(n21, e4) : ((n31, e26)=>{
            const { kind: t12 , elements: i10  } = e26;
            return {
                kind: t12,
                elements: i10,
                finisher (e3) {
                    window.customElements.define(n31, e3);
                }
            };
        })(n21, e4)
;
const i10 = (i214, e26)=>e26.kind === "method" && e26.descriptor && !("value" in e26.descriptor) ? {
        ...e26,
        finisher (n) {
            n.createProperty(e26.key, i214);
        }
    } : {
        kind: "field",
        key: Symbol(),
        placement: "own",
        descriptor: {
        },
        originalKey: e26.key,
        initializer () {
            typeof e26.initializer == "function" && (this[e26.key] = e26.initializer.call(this));
        },
        finisher (n) {
            n.createProperty(e26.key, i214);
        }
    }
;
function e4(e26) {
    return (n6, t12)=>t12 !== void 0 ? ((i214, e32, n21)=>{
            e32.constructor.createProperty(n21, i214);
        })(e26, n6, t12) : i10(e26, n6)
    ;
}
function r3(r22) {
    return e4({
        ...r22,
        state: true,
        attribute: false
    });
}
const e5 = (e26, t27, o23)=>{
    Object.defineProperty(t27, o23, e26);
}, o4 = ({ finisher: e26 , descriptor: t27  })=>(o23, n6)=>{
        var r4;
        if (n6 === void 0) {
            const n21 = (r4 = o23.originalKey) !== null && r4 !== void 0 ? r4 : o23.key, i11 = t27 != null ? {
                kind: "method",
                placement: "prototype",
                key: n21,
                descriptor: t27(o23.key)
            } : {
                ...o23,
                key: n21
            };
            return e26 != null && (i11.finisher = function(t31) {
                e26(t31, n21);
            }), i11;
        }
        {
            const r22 = o23.constructor;
            t27 !== void 0 && Object.defineProperty(o23, n6, t27(n6)), e26 == null || e26(r22, n6);
        }
    }
;
const t12 = {
    ATTRIBUTE: 1,
    CHILD: 2,
    PROPERTY: 3,
    BOOLEAN_ATTRIBUTE: 4,
    EVENT: 5,
    ELEMENT: 6
}, i11 = (t27)=>(...i214)=>({
            _$litDirective$: t27,
            values: i214
        })
;
class s5 {
    constructor(t27){
    }
    T(t2, i2, s3) {
        this.??dt = t2, this.M = i2, this.??ct = s3;
    }
    S(t2, i2) {
        return this.update(t2, i2);
    }
    update(t2, i2) {
        return this.render(...i2);
    }
}
const i12 = i11(class extends s5 {
    constructor(t$1){
        var e6;
        if (super(t$1), t$1.type !== t12.ATTRIBUTE || t$1.name !== "style" || ((e6 = t$1.strings) === null || e6 === void 0 ? void 0 : e6.length) > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
    }
    render(t2) {
        return Object.keys(t2).reduce((e7, r5)=>{
            const s29 = t2[r5];
            return s29 == null ? e7 : e7 + `${r5 = r5.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${s29};`;
        }, "");
    }
    update(e, [r]) {
        const { style: s29  } = e.element;
        if (this.St === void 0) {
            this.St = new Set();
            for(const t28 in r)this.St.add(t28);
            return this.render(r);
        }
        this.St.forEach((t28)=>{
            r[t28] == null && (this.St.delete(t28), t28.includes("-") ? s29.removeProperty(t28) : s29[t28] = "");
        });
        for(const t28 in r){
            const e26 = r[t28];
            e26 != null && (this.St.add(t28), t28.includes("-") ? s29.setProperty(t28, e26) : s29[t28] = e26);
        }
        return w;
    }
});
class AbstractContextMenu extends h2 {
    notify = [];
    constructor(){
        super();
    }
    setMenuData(_d) {
        for(const prop in _d){
            if (_d.hasOwnProperty(prop) && prop in this) {
                this[prop] = _d[prop];
            }
        }
    }
    menuDataChange(evt) {
        if (evt.currentTarget instanceof HTMLInputElement) {
            const target = evt.currentTarget;
            let obj = {
            };
            if (isNaN(target.valueAsNumber)) {
                obj[target.name] = target.value;
            } else {
                obj[target.name] = target.valueAsNumber;
            }
            this.dispatchEvent(new CustomEvent('contextdatachange', {
                detail: obj,
                bubbles: true,
                composed: true
            }));
        }
    }
    bgClick(evt) {
        this.dispatchEvent(new CustomEvent('cxtremove', {
            detail: evt.currentTarget,
            bubbles: true,
            composed: true
        }));
    }
    contextBackground() {
        return T`<div @click=${this.bgClick} class="context_bg" style="top : 0; left: 0; position: absolute; z-index : 8888; width : ${window.screen.availWidth}px; height : ${window.screen.availHeight}px;"></div>`;
    }
}
function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {
    };
    Object.keys(descriptor).forEach(function(key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;
    if ("value" in desc || desc.initializer) {
        desc.writable = true;
    }
    desc = decorators.slice().reverse().reduce(function(desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc);
    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }
    if (desc.initializer === void 0) {
        Object.defineProperty(target, property, desc);
        desc = null;
    }
    return desc;
}
function _initializerDefineProperty(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
        enumerable: descriptor.enumerable,
        configurable: descriptor.configurable,
        writable: descriptor.writable,
        value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
}
var _class, _descriptor, _dec, _descriptor1, _dec1, _descriptor2, _dec2, _descriptor3, _dec3;
var _dec4 = n4("text-context-menu");
let TextContextMenu = _class = _dec4(((_class = class TextContextMenu1 extends AbstractContextMenu {
    static styles = i1`\n        .text_context {\n            position : absolute;\n            background-color : #fff;\n            box-shadow: 2px 9px 7px 0px #00000033;\n            z-index : 9999;\n        }\n    `;
    constructor(){
        super();
        _initializerDefineProperty(this, "x", _descriptor, this);
        _initializerDefineProperty(this, "y", _descriptor1, this);
        _initializerDefineProperty(this, "fontSize", _descriptor2, this);
        _initializerDefineProperty(this, "fontColor", _descriptor3, this);
    }
    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }
    render() {
        return T`\n            <div class="text_context" style="${i12({
            top: `${this.y}px`,
            left: `${this.x}px`
        })}">\n                <span>Font Size</span><input @change=${this.menuDataChange} type=number name=fontSize value=${this.fontSize} />\n                <span>Font Color</span><input @change=${this.menuDataChange} name=fontColor value=${this.fontColor} />\n            </div>\n            ${this.contextBackground()}\n        `;
    }
}) || _class, _dec = e4(), _dec1 = e4(), _dec2 = e4({
    type: Number
}), _dec3 = e4({
    type: String
}), _descriptor = _applyDecoratedDescriptor(_class.prototype, "x", [
    _dec
], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: void 0
}), _descriptor1 = _applyDecoratedDescriptor(_class.prototype, "y", [
    _dec1
], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: void 0
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "fontSize", [
    _dec2
], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: void 0
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "fontColor", [
    _dec3
], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: void 0
}), _class)) || _class;
class ContextMenuBuilder {
    menu;
    _x;
    _y;
    _d;
    constructor(menu1, d1){
        this.menu = menu1;
        this._d = d1;
    }
    setX(x) {
        this._x = x;
        return this;
    }
    setY(y) {
        this._y = y;
        return this;
    }
    build() {
        let _m = new this.menu;
        _m.setPosition(this._x, this._y);
        _m.setMenuData(this._d);
        return _m;
    }
}
class ContextMenuSupport {
    FUNCTION_NAME_TYPE;
    FUNCTION_NAME_DATA;
    FUNCTION_NAME_CHANGE;
    contextMenu;
    builder;
    _target;
    constructor(){
        this.FUNCTION_NAME_TYPE = "contextMenu";
        this.FUNCTION_NAME_DATA = "contextMenuData";
        this.FUNCTION_NAME_CHANGE = "contextDataChage";
    }
    findContextMenuType(paths) {
        const _c = paths.find((e8)=>e8.constructor.name.indexOf("Component") != -1
        );
        if (_c === undefined) return false;
        const _contextMenu = _c[this.FUNCTION_NAME_TYPE].call(_c);
        const _data = _c[this.FUNCTION_NAME_DATA].call(_c);
        this.builder = new ContextMenuBuilder(_contextMenu, _data);
        this._target = _c;
        return true;
    }
    changeData(_d) {
        this._target[this.FUNCTION_NAME_CHANGE].call(this._target, _d);
    }
    getContextMenu(x, y) {
        return this.contextMenu = this.builder.setX(x).setY(y).build();
    }
}
function _applyDecoratedDescriptor1(target, property, decorators, descriptor, context) {
    var desc = {
    };
    Object.keys(descriptor).forEach(function(key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;
    if ("value" in desc || desc.initializer) {
        desc.writable = true;
    }
    desc = decorators.slice().reverse().reduce(function(desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc);
    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }
    if (desc.initializer === void 0) {
        Object.defineProperty(target, property, desc);
        desc = null;
    }
    return desc;
}
function _initializerDefineProperty1(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
        enumerable: descriptor.enumerable,
        configurable: descriptor.configurable,
        writable: descriptor.writable,
        value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
}
var _class1, _descriptor4, _dec5, _descriptor5, _dec6;
var _dec7 = n4("text-component");
let TextComponent = _class1 = _dec7(((_class1 = class TextComponent1 extends h2 {
    static styles = i1`.text_editor {\n        outline : none;\n        caret-color : black;\n    }\n    ::selection  {\n        color : white;\n        background-color : #a0a0a0;\n    }`;
    constructor(){
        super();
        _initializerDefineProperty1(this, "fontSize", _descriptor4, this);
        _initializerDefineProperty1(this, "fontColor", _descriptor5, this);
        this.fontSize = 30;
        this.fontColor = "black";
    }
    contextDataChage(evt) {
        for(const key in evt){
            const descriptor = Object.getOwnPropertyDescriptor(this, key) || {
            };
            if (descriptor.writable) {
                this[key] = evt[key];
            }
        }
        this.requestUpdate();
    }
    contextMenuData() {
        return {
            "fontSize": this.fontSize,
            "fontColor": this.fontColor
        };
    }
    contextMenu() {
        return TextContextMenu;
    }
    isSupport() {
        throw new Error("Method not implemented.");
    }
    firstUpdated() {
        this.renderRoot?.querySelector('div')?.focus();
    }
    styles() {
        return JSON.parse(`{\n            "fontSize": "${this.fontSize}px",\n            "color" : "${this.fontColor}"\n        }`);
    }
    render() {
        return T`\n            <div @selectionchange=${(evt)=>console.log(evt)
        } @contextdatachange=${this.contextDataChage} contenteditable="true" class="text_editor" style="${i12(this.styles())}" ></div>\n        `;
    }
}) || _class1, _dec5 = e4({
    type: Number
}), _dec6 = e4({
    type: String
}), _descriptor4 = _applyDecoratedDescriptor1(_class1.prototype, "fontSize", [
    _dec5
], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: void 0
}), _descriptor5 = _applyDecoratedDescriptor1(_class1.prototype, "fontColor", [
    _dec6
], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: void 0
}), _class1)) || _class1;
class ComponentBuilder {
    target;
    constructor(target){
        this.target = target;
    }
    add(evt) {
        return this.getComponent(evt);
    }
    hasComponent(evt) {
        return evt.path.findIndex((e8)=>e8 instanceof HTMLElement && [
                ...new Set(e8.classList)
            ].some((x)=>/editor/.test(x)
            )
        ) == 0;
    }
    getComponent(evt) {
        if (this.hasComponent(evt)) {
            evt.path[0].focus();
        } else {
            return new TextComponent;
        }
    }
}
function _applyDecoratedDescriptor2(target1, property, decorators, descriptor, context) {
    var desc = {
    };
    Object.keys(descriptor).forEach(function(key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;
    if ("value" in desc || desc.initializer) {
        desc.writable = true;
    }
    desc = decorators.slice().reverse().reduce(function(desc, decorator) {
        return decorator(target1, property, desc) || desc;
    }, desc);
    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }
    if (desc.initializer === void 0) {
        Object.defineProperty(target1, property, desc);
        desc = null;
    }
    return desc;
}
function _initializerDefineProperty2(target1, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target1, property, {
        enumerable: descriptor.enumerable,
        configurable: descriptor.configurable,
        writable: descriptor.writable,
        value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
}
var _class2, _descriptor6, _dec8;
var _dec9 = n4("text-editor");
let TextEditor = _class2 = _dec9(((_class2 = class TextEditor1 extends h2 {
    static styles = i1`div:not([class]) {height: 100%; max-width : 80%; background-color: #eeeded4a; min-height : 500px; }`;
    evt;
    constructor(){
        super();
        _initializerDefineProperty2(this, "components", _descriptor6, this);
        this.evt = new ComponentBuilder(this);
        this.components = [];
    }
    getLitElement() {
        return this.components;
    }
    focusEdtior(evt) {
        let tag = this.evt.add(evt);
        if (tag === undefined) return void 0;
        this.components.push(tag);
        this.requestUpdate();
    }
    render() {
        return T`\n            <div @dblclick=${this.focusEdtior} >${this.components}</div>\n        `;
    }
}) || _class2, _dec8 = r3(), _descriptor6 = _applyDecoratedDescriptor2(_class2.prototype, "components", [
    _dec8
], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: void 0
}), _class2)) || _class2;
function _applyDecoratedDescriptor3(target1, property, decorators, descriptor, context) {
    var desc = {
    };
    Object.keys(descriptor).forEach(function(key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;
    if ("value" in desc || desc.initializer) {
        desc.writable = true;
    }
    desc = decorators.slice().reverse().reduce(function(desc, decorator) {
        return decorator(target1, property, desc) || desc;
    }, desc);
    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }
    if (desc.initializer === void 0) {
        Object.defineProperty(target1, property, desc);
        desc = null;
    }
    return desc;
}
function _initializerDefineProperty3(target1, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target1, property, {
        enumerable: descriptor.enumerable,
        configurable: descriptor.configurable,
        writable: descriptor.writable,
        value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
}
var _class3, _descriptor7, _dec10;
var _dec11 = n4('editor-main');
let EditorMain2 = _class3 = _dec11(((_class3 = class EditorMain1 extends h2 {
    static styles = i1`div { width : 100%; height : 100%; }`;
    menu;
    constructor(){
        super();
        _initializerDefineProperty3(this, "support", _descriptor7, this);
        this.support = new ContextMenuSupport;
    }
    contextHandler(evt) {
        evt.preventDefault();
        if (this.support.findContextMenuType(evt.path)) {
            this.menu = this.support.getContextMenu(evt.pageX, evt.pageY);
            this.requestUpdate();
        }
    }
    contextRemove(evt) {
        if (this.menu !== undefined) {
            delete this.menu;
            this.requestUpdate();
        }
    }
    render() {
        return T`<text-editor @contextmenu=${this.contextHandler}  @cxtremove=${this.contextRemove}></text-editor>${this.menu}`;
    }
}) || _class3, _dec10 = e4(), _descriptor7 = _applyDecoratedDescriptor3(_class3.prototype, "support", [
    _dec10
], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: void 0
}), _class3)) || _class3;
export { EditorMain2 as EditorMain };
