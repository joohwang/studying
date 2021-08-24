import { PartInfo, Part } from "lit/directive.js";
import { Publisher } from "./Publisher";
import { html } from "lit";
import { styleMap } from "lit/directives/style-map.js";
import { classMap } from "lit/directives/class-map.js";
import { EventHandler } from "./EventHandler";

export class TextComponent extends Publisher {
  uuid: string;

  fontSize: number;

  fontColor: string;

  ed_text: boolean = false;

  constructor(eventHander: EventHandler, partInfo: PartInfo) {
    super(partInfo);
    super.onPublish(eventHander);
  }

  emitMessage(evt: Event) {
    const evtTarget = new Map();
    evtTarget.set(evt.currentTarget, { ed_text: true });
    super.publish(evtTarget);
  }

  update(_partInfo: Part, props: unknown[]) {
    console.log(_partInfo);
    return this.render(props);
  }

  render(props: unknown[]) {
    const classes = Object.assign(
      {
        ed_text: this.ed_text,
        component: true,
      },
      props[0]
    );
    console.log(classes);
    return html`<div
      @input=${this.emitMessage.bind(this)}
      class="${classMap(classes)}"
      style=${styleMap({
        fontSize: `${(this.fontSize && `${this.fontSize}px`) || `inherit`}`,
        color: this.fontColor,
        width: "90%",
      })}
      contenteditable="true"
    ></div>`;
  }
}
