import { html } from "lit";
import { Editor } from "./Editor";
import _ from "underscore";

interface TextProperties {
  size: number;
  color: string;
}

export class TextEditor extends Editor {
  size: number;
  color: string;
  constructor() {
    super(arguments);
  }

  inputhandler(evt: Event) {
    this["classes"] = _.extend(this["classes"], { text: true });
  }

  render() {
    return html`<div
      @contextmenu=${this.showContextMenu.bind(this)}
      @input=${this.inputhandler}
      contenteditable="true"
    ></div>`;
  }

  getContextMenuProperty() {
    return {};
  }

  setProperties(properties: TextProperties) {
    this.size = properties.size;
    this.color = properties.color;
    console.log(this.size);
  }
}
