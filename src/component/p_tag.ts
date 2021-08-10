import { LitElement, html, css } from 'https://cdn.skypack.dev/lit';
import { customElement, property } from 'https://cdn.skypack.dev/lit/decorators';
import { styleMap, classMap } from 'https://cdn.skypack.dev/lit/directives

import { PTagConst } from '../const/p-tag-const.ts';

@customElement("p-tag")
export class PTag extends LitElement implements PTagConst {

    static styles = css`
        .p_editor {
            outline : none;
            margin :0
        }
    `;

    @property({ type: Number })
    fontSize: number;

    @property({ type: String })
    fontColor: string;


    constructor() {
        super();
        this.fontSize = 30;
        this.fontColor = "";
    }


    render(): any {
        return html`<p contenteditable="true" class="${classMap()}" style=${styleMap({ fontSize: `${this.fontSize}px`, caretColor: `black` })}></p>`;
    }
}