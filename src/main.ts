import { LitElement, html, css } from 'https://cdn.skypack.dev/lit';
import { customElement, property } from 'https://cdn.skypack.dev/lit/decorators';

import './text_editor.ts';

import { ContextMenuSupport, AbstractContextMenu } from './component/support/index.js';

@customElement('editor-main')
export class EditorMain extends LitElement {

    static styles = css`div { width : 100%; height : 100%; }`;


    @property()
    support: ContextMenuSupport;

    menu: AbstractContextMenu;

    constructor() {
        super();
        this.support = new ContextMenuSupport;
    }

    contextHandler(evt: any) {
        evt.preventDefault();
        if (this.support.findContextMenuType(evt.path)) {
            this.menu = this.support.getContextMenu(evt.pageX, evt.pageY);
            this.requestUpdate();
        }
    }

    contextRemove(evt: CustomEvent) {
        if (this.menu !== undefined) {
            delete this.menu;
            this.requestUpdate();
        }
    }

    render(): any {
        return html`<text-editor @contextmenu=${this.contextHandler}  @cxtremove=${this.contextRemove}></text-editor>${this.menu}`;
    }
}
