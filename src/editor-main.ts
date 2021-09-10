import { html, css, LitElement } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { directive } from "lit/directive.js";
import { EditorElement } from "./component/EditorElement";
import _ from "underscore";
import { ToolbarDirective } from "./component/toolbar/ToolbarDirective";

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
  `;

  @query(".ed_container")
  _container: HTMLDivElement;

  @property()
  editorRect;

  @property()
  elements: EditorElement[];

  toolbar;

  toolbarsJson;

  @property()
  toolbarRoot;

  constructor() {
    super();
    this.elements = [];
    this.addEventListener("showtoolbar", this.setComponentToolbarStyle, false);
    this.toolbar = directive(ToolbarDirective);

    fetch("/toolbar.json")
      .then((data) => data.json())
      .then((v) => _.isArray(v.toolbars) && (this.toolbarsJson = v.toolbars));
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
    const styles = { position: "absolute" };
    return html`<div class="ed_container" @click=${this.clickHandler}>
      ${this.elements}
      ${this.toolbar({
        _c: _.extend(
          {
            absolTop: this._container?.offsetTop,
          },
          this._container?.getBoundingClientRect()
        ),
        _e: this.editorRect,
        _t: this.toolbarRoot,
        _j: this.toolbarsJson,
      })}
    </div>`;
  }
}
