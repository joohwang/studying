import { LitElement } from "https://cdn.skypack.dev/lit";
import { Element } from "https://cdn.skypack.dev/html-element";

import { PTag } from '../component/p_tag.ts';

export default class Events {

    private target: any;

    constructor(target: any) {
        this.target = target;
    }

    add(evt: any): LitElement | undefined {
        return this.getComponent(evt);
    }

    hasComponent(evt: any): boolean {
        return evt.path.findIndex((e: any) => e instanceof Element && [...new Set(e.classList)].some((x: any): boolean => /editor/.test(x))) == 0;
    }

    getComponent(evt: any) {

        if (this.hasComponent(evt)) {
            evt.path[0].focus();
        } else {
            return new PTag();
        }
    }


}