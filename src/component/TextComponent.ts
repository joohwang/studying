import { PartInfo, Part, directive } from "lit/directive.js";
import { Publisher } from "./Publisher";
import { html } from "lit";
import { styleMap } from "lit/directives/style-map.js";
import { classMap } from "lit/directives/class-map.js";
import { EventHandler } from "./EventHandler";
import { ComponentContextDirective } from "./ComponentContextDirective";

export class TextComponent extends Publisher {
  menu: any;

  fontSize: number;

  fontColor: string;

  ed_text: boolean = false;

  constructor(eventHander: EventHandler, partInfo: PartInfo) {
    super(partInfo);
    console.log(arguments);
    eventHander.directiveSubscribe(this);
  }

  emitMessage(evt: Event) {
    evt.preventDefault();
    console.log(evt);
    const evtTarget = new Map();
    switch (evt.constructor) {
      case InputEvent:
        evtTarget.set(evt.currentTarget, { ed_text: true });
        break;
      case PointerEvent:
        evtTarget.set(evt.currentTarget, {
          menu: directive(ComponentContextDirective),
        });
        break;
    }
    super.publish(evtTarget);
  }

  update(_partInfo: Part, props: unknown[]) {
    console.log(props);
    Object.assign(this, props[0]);
    return this.render(props);
  }

  render(props: unknown[]) {
    const classes = {
      ed_text: this.ed_text,
      component: true,
    };

    this.ed_text;

    return html`<div
        @input=${this.emitMessage.bind(this)}
        @contextmenu=${this.emitMessage.bind(this)}
        class="${classMap(classes)}"
        style=${styleMap({
          fontSize: `${(this.fontSize && `${this.fontSize}px`) || `inherit`}`,
          color: this.fontColor,
          width: "90%",
        })}
        contenteditable="true"
      ></div>
      ${this.menu && this.menu()}`;
  }
}
