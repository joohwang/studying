import { LitElement } from 'https://cdn.skypack.dev/lit';

abstract class AbstractContextMenu extends LitElement {

    notify: any;

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

    setNotify(notify: any) {
        this.notify = notify;
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

            this.notify(obj);
        }
    }

    abstract setPosition(x: number, y: number): void;
}



export { AbstractContextMenu };