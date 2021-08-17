import { LitElement, html } from 'https://cdn.skypack.dev/lit';

abstract class AbstractContextMenu extends LitElement {

    notify: any[] = [];

    constructor() {
        super();
    }

    setMenuData(_d: Record<string, unknown>): void {
        for (const prop in _d) {
            if (_d.hasOwnProperty(prop) && prop in this) {
                //@ts-expect-error
                this[prop] = _d[prop];
            }
        }
    }

    menuDataChange(evt: Event) {
        if (evt.currentTarget instanceof HTMLInputElement) {

            const target = evt.currentTarget;
            let obj: Record<string, unknown> = {};

            if (isNaN(target.valueAsNumber)) {
                obj[target.name] = target.value;
            } else {
                obj[target.name] = target.valueAsNumber;
            }

            this.dispatchEvent(new CustomEvent('contextdatachange', { detail: obj, bubbles: true, composed: true }))
        }
    }

    bgClick(evt: Event) {
        this.dispatchEvent(new CustomEvent('cxtremove', { detail: evt.currentTarget, bubbles: true, composed: true }));
    }

    contextBackground() {
        return html`<div @click=${this.bgClick} class="context_bg" style="top : 0; left: 0; position: absolute; z-index : 8888; width : ${window.screen.availWidth}px; height : ${window.screen.availHeight}px;"></div>`;
    }

    abstract setPosition(x: number, y: number): void;
}



export { AbstractContextMenu };