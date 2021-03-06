import { html, css } from 'https://cdn.skypack.dev/lit';
import { customElement, property } from 'https://cdn.skypack.dev/lit/decorators';
import { styleMap } from 'https://cdn.skypack.dev/lit/directives/style-map'

import { AbstractContextMenu } from './ContextMenu.ts';

@customElement("text-context-menu")
export default class TextContextMenu extends AbstractContextMenu {


    static styles = css`
        .text_context {
            position : absolute;
            background-color : #fff;
            box-shadow: 2px 9px 7px 0px #00000033;
            z-index : 9999;
        }
    `;

    @property()
    x: number;

    @property()
    y: number;

    @property({ type: Number })
    fontSize: number;

    @property({ type: String })
    fontColor: string;


    constructor() {
        super();
    }

    setPosition(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }

    render(): any {

        return html`
            <div class="text_context" style="${styleMap({ top: `${this.y}px`, left: `${this.x}px` })}">
                <span>Font Size</span><input @change=${this.menuDataChange} type=number name=fontSize value=${this.fontSize} />
                <span>Font Color</span><input @change=${this.menuDataChange} name=fontColor value=${this.fontColor} />
            </div>
            ${this.contextBackground()}
        `;
    }

}