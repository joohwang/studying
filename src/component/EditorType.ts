import { html, css } from "lit";
import { __extends } from "tslib";
import _ from "underscore";

interface Editor {
  setProperties(props: any);
  render();
}

type EditorType<T extends Editor> = new (...args: any[]) => T;

interface ImagePrperties {
  images;
  name;
  mime;
}

interface TextProperties {
  size: number;
  color: string;
}

interface ListProperties {}

class ImageEditor implements Editor {
  images: any;

  constructor() {}
  render() {
    throw new Error("Method not implemented.");
  }
  setProperties(props: any) {
    throw new Error("Method not implemented.");
  }
}

class ListEditor implements Editor {
  constructor() {}
  render() {
    throw new Error("Method not implemented.");
  }
  setProperties(props: any) {
    throw new Error("Method not implemented.");
  }
}

class TextEditor implements Editor {
  static styles = css`
    .text_editor {
      outline: none;
    }
  `;

  size: number;
  color: string;
  constructor() {}

  inputhandler(evt: Event) {
    this["classes"] = _.extend(this["classes"], { text_editor: true });
  }

  render() {
    return html`<div @input=${this.inputhandler} contenteditable="true"></div>`;
  }

  setProperties(properties: TextProperties) {
    this.size = properties.size;
    this.color = properties.color;
    console.log(this.size);
  }
}

export class Editors implements Editor {
  private editor;

  constructor(type: EditorType<ImageEditor | ListEditor | TextEditor>) {
    this.editor = new type();
  }
  render() {
    return this.editor.render();
  }

  setProperties(prop: any) {
    this.editor.setProperties(prop);
  }
}

export { ImageEditor, ListEditor, TextEditor };
