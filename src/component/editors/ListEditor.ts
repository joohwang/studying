import { html } from "lit";
import { Editor } from "./Editor";

export class ListEditor extends Editor {
  constructor() {
    super(arguments);
  }
  setProperties(props: any) {}
  render() {
    return html`<div>
      <ol contenteditable="true" style="outline:none;">
        <li></li>
      </ol>
    </div>`;
  }
  getContextMenuProperty() {
    throw new Error("Method not implemented.");
  }
}
