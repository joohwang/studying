import { html, css, LitElement } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { directive } from "lit/directive.js";
import { EditorElement } from "./component/EditorElement";
import { Toolbar } from "./component/Toolbar";

@customElement("editor-main")
export class EditorMain extends LitElement {
  static styles = css`
    div {
      margin: 0;
    }
    .ed_container {
      min-width: 50%;
      max-width: 80%;
      padding-bottom: 70px;
      background-color: #e3e3e36b;
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 30px;
      color: black;
    }
    .ed_compon_tool_bar {
      position: absolute;
    }
    .ed_compon_tool_button {
      background-color: #8fcdff80;
      border-radius: 50%;
    }
    .ed_compon_tool_bar .bar {
      margin-left: 10px;
      position: relative;
      flext-direction: row;
      display: flex;
      align-items: center;
    }
    .ed_compon_tool_bar .bar div,
    img {
      visibility: hidden;
    }
    img {
      width: 20px;
      height: 20px;
    }
  `;

  @query(".ed_container")
  _container: HTMLDivElement;

  @property()
  editorRect;

  @property()
  elements: EditorElement[];

  toolbar;

  @property()
  toolbarRoot;

  constructor() {
    super();
    this.elements = [];
    this.addEventListener("showtoolbar", this.setComponentToolbarStyle, false);
    this.toolbar = directive(Toolbar);
  }

  clickHandler(evt: Event) {
    const targets = evt.composedPath();
    if (this._container.isEqualNode(targets[0] as Node)) {
      const temp = [new EditorElement()];
      this.elements = [...this.elements, ...temp];
    }
  }

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has("elements")) {
      const div: Element = this.shadowRoot.querySelector(
        "editor-element:last-child"
      );
      if (div !== undefined && div !== null) {
        //this.setComponentToolbarStyle(div as HTMLElement);
      }
    } else {
      console.log(changedProperties);
    }
  }

  setComponentToolbarStyle(evt: CustomEvent) {
    this.editorRect = evt.detail?.element?.getBoundingClientRect();
    this.toolbarRoot = evt.detail?.litClaz;
  }

  render() {
    return html`<div class="ed_container" @click=${this.clickHandler}>
      ${this.toolbar({
        _c: this._container?.getBoundingClientRect(),
        _e: this.editorRect,
        _t: this.toolbarRoot,
      })}
      ${this.elements}
    </div>`;
  }
}
