import { LitElement, html, css } from 'https://cdn.skypack.dev/lit';
import { customElement, property } from 'https://cdn.skypack.dev/lit/decorators';

@customElement('simple-greeting')
export class SimpleGreeting extends LitElement {
    static styles = css`p { color: black }`;

    @property()
    name = 'Somebody';

    render(): any {
        return html`<p>Hello, ${this.name}!</p>`;
    }
}
