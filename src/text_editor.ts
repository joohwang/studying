import { LitElement, html, css } from 'https://cdn.skypack.dev/lit';
import { customElement, property } from 'https://cdn.skypack.dev/lit/decorators';

@customElement("text-editor")
export class TextEditor extends LitElement {
    @property()
    name = "hello";

    @property()
    value = 1;
    
    render() {
        return html`<div>${value}  : <span>${name}</span> </div>`;
    }

}