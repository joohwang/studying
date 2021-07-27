import { LitElement, html, css } from 'https://cdn.skypack.dev/lit';
import { customElement, property } from 'https://cdn.skypack.dev/lit/decorators';

@customElement("text-editor")
export class TextEditor extends LitElement {

    static styles = css`div {color : red; width : 100% }`

    @property()
    name = "hello!!!!";

    @property()
    value = 21221;

    @property()
    newValue = 'gogogo1';

    render(): any {
        return html`<div>${this.value}  : <span>${this.name}</span> </div>`;
    }

}