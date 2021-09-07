import { Subject } from "rxjs";
import { __extends } from "tslib";
import _ from "underscore";
import { ImageEditor, TextEditor, Editor, ListEditor } from "./editors";
import { ParentProperty } from "./Property";

type EditorType<T extends Editor> = new (...args: any[]) => T;

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
