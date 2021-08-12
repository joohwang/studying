import { LitElement, html, css } from 'https://cdn.skypack.dev/lit';
import { customElement, property } from 'https://cdn.skypack.dev/lit/decorators';
import { styleMap } from 'https://cdn.skypack.dev/lit/directives/style-map'

import Component from './Component.ts';

@customElement("text-component")
export default class TextComponent extends LitElement implements Component {

    static styles = css`.text_editor {
        outline : none;
        caret-color : black;
    }`;


    @property({ type: Number })
    fontSize: number;

    @property({ type: String })
    fontColor: string;

    constructor() {
        super();
        this.fontSize = 30;
        this.fontColor = "";

    }

    contextMenu(): void {
        throw new Error("Method not implemented.");
    }

    isSupport(): boolean {
        throw new Error("Method not implemented.");
    }


    firstUpdated() {
        this.renderRoot?.querySelector('div')?.focus();
    }

    styles() {
        return JSON.parse(`{
            "fontSize": "${this.fontSize}px"
        }`);
    }



    render(): any {

        return html`
            <div contenteditable="true" class="text_editor" style="${styleMap(this.styles())}" ></div>
        `;
    }
}