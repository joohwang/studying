import { LitElement, html, css } from 'https://cdn.skypack.dev/lit';
import { customElement, state } from 'https://cdn.skypack.dev/lit/decorators';

import Events from './events/events.ts';

@customElement("text-editor")
export class TextEditor extends LitElement {

    static styles = css`div {height: 100%; max-width : 80%; background-color: #eeeded4a; min-height : 500px; }`

    @state()
    private components: symbol[];

    evt: Events;

    constructor() {
        super();
        this.evt = new Events(this);
        this.components = [];
    }


    focusEdtior(evt: Event) {

        let tag = this.evt.add(evt);

        if (tag === undefined) return void (0);

        this.components.push(tag.render());
        this.requestUpdate();
    }

    render(): any {
        return html`<div @dblclick=${this.focusEdtior} @click=${this.focusEdtior}>${this.components}</div>`;
    }

}