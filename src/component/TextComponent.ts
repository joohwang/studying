import { LitElement, html, css } from 'https://cdn.skypack.dev/lit';
import { customElement, property, state } from 'https://cdn.skypack.dev/lit/decorators';
import { styleMap } from 'https://cdn.skypack.dev/lit/directives/style-map'

import Component from './Component.ts';
import { TextContext } from './support/index.js';


@customElement("text-component")
export default class TextComponent extends LitElement implements Component {

    static styles = css`.text_editor {
        outline : none;
        caret-color : black;
    }`;


    @property({ type: Number, reflect: true })
    fontSize: number;

    @property({ type: String })
    fontColor: string;

    @property()
    data: Record<string, unknown>

    constructor() {
        super();
        this.fontSize = 30;
        this.fontColor = "black";
        this.data = {
            "fontSize": this.fontSize,
            "fontColor": this.fontColor
        }

    }

    contextDataChage(_d: Record<string, unknown>) {
        for (const key in _d) {
            const descriptor = Object.getOwnPropertyDescriptor(this, key) || {}
            if (descriptor.writable) {
                //@ts-expect-error
                this[key] = _d[key];
            }
        }
        this.requestUpdate();
    }

    contextMenuData(): Record<string, unknown> {
        return this.data;
    }

    contextMenu(): any {
        return TextContext;
    }

    isSupport(): boolean {
        throw new Error("Method not implemented.");
    }

    firstUpdated() {
        this.renderRoot?.querySelector('div')?.focus();
    }

    styles() {
        return JSON.parse(`{
            "fontSize": "${this.fontSize}px",
            "color" : "${this.fontColor}"
        }`);
    }



    render(): any {

        return html`
            <div contenteditable="true" class="text_editor" style="${styleMap(this.styles())}" ></div>
        `;
    }
}