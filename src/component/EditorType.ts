import { html, LitElement } from "lit";
import { directive } from "lit-html/directive";
import { of, Subject, isObservable, from } from "rxjs";
import { __extends } from "tslib";
import _ from "underscore";
import { ImageEditor, TextEditor, Editor } from "./editors";
import { ParentProperty } from "./Property";

type EditorType<T extends Editor> = new (...args: any[]) => T;

interface ListProperties {}

class ListEditor extends Editor {
  getContextMenuProperty() {
    throw new Error("Method not implemented.");
  }
  constructor() {
    super(arguments);
  }
  render() {
    throw new Error("Method not implemented.");
  }
  setProperties(props: any) {
    throw new Error("Method not implemented.");
  }
}

export class Editors {
  private editor: Editor;

  constructor(
    type: EditorType<ImageEditor | ListEditor | TextEditor>,
    subject: Subject<unknown>
  ) {
    this.editor = new type(subject);
  }

  render(property: ParentProperty) {
    this.editor.setParentProperty(property);
    return this.editor.render();
  }

  setProperties(prop: any) {
    this.editor.setProperties(prop);
  }
}

export { ImageEditor, ListEditor, TextEditor };
