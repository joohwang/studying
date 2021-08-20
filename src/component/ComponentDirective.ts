import { Directive, Part, PartInfo, directive } from "lit/directive.js";
import { styleMap } from 'lit/directives/style-map.js';
import { classMap } from 'lit/directives/class-map.js';
import { html } from 'lit';

export class ComponentDirective extends Directive {

    fontSize: number;

    fontColor: string;

    ed_text: boolean;

    context: any;

    constructor(_partInfo: PartInfo) {
        super(_partInfo);
        this.fontSize = 30;
        this.fontColor = 'black';
        this.ed_text = false;
    }


    update(_partInfo: Part) {
        console.log(_partInfo);
        return this.render();
    }


    render(...props: unknown[]) {
        console.log(props);
        const classes = {
            ed_text: this.ed_text,
            component: true
        }
        return html`<div class="${classMap(classes)}" style=${styleMap({ "fontSize": `${this.fontSize}px`, "color": this.fontColor, "width": "90%" })} contenteditable="true"></div>`;

    }

}