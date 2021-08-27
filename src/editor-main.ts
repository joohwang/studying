import { html, css, LitElement } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { StyleInfo, styleMap } from "lit/directives/style-map.js";
import { EditorElement } from "./component/EditorElement";

@customElement("editor-main")
export class EditorMain extends LitElement {
  static styles = css`
    div {
      margin: 0;
    }
    .ed_container {
      min-width: 50%;
      max-width: 80%;
      height: ${screen.availHeight * 0.8}px;
      background-color: #e3e3e36b;
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 30px;
      color: black;
    }
    .ed_compon_tool_bar {
      position: absolute;
      display: none;
    }
    .ed_compon_tool_button {
      background-color: #8fcdff80;
      border-radius: 50%;
    }
    .text_context {
      width: 500px;
      height: 300px;
      background-color: white;
    }
  `;

  @query(".ed_container")
  _container: HTMLDivElement;

  @property()
  _menuStyle: StyleInfo = {};

  @property()
  _buttonStyle: StyleInfo = {};

  @property()
  elements: EditorElement[];

  constructor() {
    super();
    this.elements = [];
    this.addEventListener("showtoolbar", this.setComponentToolbarStyle, false);
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
    const rect = this._container.getBoundingClientRect(),
      dRect = evt.detail.getBoundingClientRect();

    let width: string;

    this._menuStyle = {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      left: `${rect.left}px`,
      top: `${dRect.top}px`,
      width: (width = `${(rect.width - dRect.width) * 0.5}px`),
      height: `${dRect.height}px`,
    };

    this._buttonStyle = {
      height: `${parseInt(width) * 0.8}px`,
      width: `${parseInt(width) * 0.8}px`,
    };
  }

  render() {
    return html`<div class="ed_container" @click=${this.clickHandler}>
      <div class="ed_compon_tool_bar" style=${styleMap(this._menuStyle)}>
        <div
          class="ed_compon_tool_button"
          style=${styleMap(this._buttonStyle)}
        ></div>
      </div>
      ${this.elements}
    </div>`;
  }
}
