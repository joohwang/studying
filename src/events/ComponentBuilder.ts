import { Component, TextComponent } from '../component/index.js';

export default class ComponentBuilder {

    private target: any;

    constructor(target: any) {
        this.target = target;
    }

    add(evt: any): Component | undefined {
        return this.getComponent(evt);
    }

    hasComponent(evt: any): boolean {
        return evt.path.findIndex((e: any) => e instanceof HTMLElement && [...new Set(e.classList)].some((x: any): boolean => /editor/.test(x))) == 0;
    }

    getComponent(evt: any): Component | undefined {

        if (this.hasComponent(evt)) {
            evt.path[0].focus();
        } else {
            return new TextComponent;
        }
    }




}