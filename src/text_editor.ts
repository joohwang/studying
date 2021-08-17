import { LitElement, html, css } from 'https://cdn.skypack.dev/lit';
import { customElement, state } from 'https://cdn.skypack.dev/lit/decorators';

import builder from './events/ComponentBuilder.ts';
import { Component } from './component/index.js';

@customElement("text-editor")
export class TextEditor extends LitElement {

    static styles = css`div:not([class]) {height: 100%; max-width : 80%; background-color: #eeeded4a; min-height : 500px; }`

    @state()
    private components: Component[];

    evt: builder;

    constructor() {
        super();
        this.evt = new builder(this);
        this.components = [];
    }

    getLitElement() {
        return this.components;
    }


    focusEdtior(evt: Event): void {

        let tag = this.evt.add(evt);

        if (tag === undefined) return void (0);

        this.components.push(tag);
        this.requestUpdate();
    }

    render(): any {
        return html`
            <div @dblclick=${this.focusEdtior} >${this.components}</div>
        `;
    }

}