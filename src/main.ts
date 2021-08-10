import { LitElement, html, css } from 'https://cdn.skypack.dev/lit';
import { customElement } from 'https://cdn.skypack.dev/lit/decorators';

import './text_editor.ts';

@customElement('editor-main')
export class EditorMain extends LitElement {

    static styles = css`div { width : 100%; height : 100%; }`;

    render(): any {
        return html`<div><text-editor></text-editor></div>`;
    }
}
