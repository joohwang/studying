import { LitElement } from "lit";
import { Directive } from "lit/directive.js";
import { BasicToolbar } from "./BasicToolbar";
import { ContextToolbar } from "./ContextToolbar";
import { TextToolbar } from "./TextToolbar";

class ToolbarFactory {
  toolbar: ContextToolbar;
  constructor(element: LitElement) {
    const component = element.shadowRoot.querySelector(".component");
    if (component instanceof HTMLDivElement) {
      [...component.classList]
        .filter((e) => e !== "component")
        .map((e) => {
          switch (e) {
            case "text":
              this.toolbar = new TextToolbar(element);
              break;
            default:
              this.toolbar = new BasicToolbar(element);
          }
        });
    }
  }
}

export class ToolbarDirective extends Directive {
  render(props: any): unknown {
    new ToolbarFactory(props?._t);
    throw new Error("Method not implemented.");
  }
}
