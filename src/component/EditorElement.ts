import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { classMap } from "lit/directives/class-map.js";
import { Editors, ImageEditor, ListEditor, TextEditor } from "./EditorType";
import _ from "underscore";

@customElement("editor-element")
export class EditorElement extends LitElement {
  static styles = css`
    .component.img {
      border: 1px solid black;
      height: 50px;
      border-radius: 15px;
    }
    .component.text div {
      outline: none;
    }
  `;

  @property({
    hasChanged: (val, oVal) => val !== undefined && oVal !== undefined,
  })
  classes: Record<string, boolean>;

  @property()
  fontSize;

  @property()
  fontColor;

  @property()
  image;

  @property()
  editor;

  constructor() {
    super();
    this.editor = new Editors(TextEditor);
    this.classes = {
      component: true,
    };
    this.editor.setProperties({ size: 30, color: "black" });
  }

  firstUpdated() {
    this.setToolbarPosition();
  }

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has("classes")) {
      Promise.resolve(
        this.dispatchEvent(
          new CustomEvent("showtoolbar", { bubbles: true, composed: true })
        )
      )
        .then((e) => super.getUpdateComplete())
        .then((e) => {
          if (this.classes.img) this.editor = new Editors(ImageEditor);
          if (this.classes.list) this.editor = new Editors(ListEditor);
        });
    }
  }

  setToolbarPosition() {
    const element: HTMLElement = this.shadowRoot.querySelector("div.component");
    Promise.resolve(
      element.dispatchEvent(
        new CustomEvent("showtoolbar", {
          detail: { element: element, litClaz: this },
          bubbles: true,
          composed: true,
        })
      )
    )
      .then((e) => super.getUpdateComplete())
      .then((e) => element.querySelector("div").focus());
  }

  dropHandler(evt: DragEvent) {
    evt.preventDefault();
    if (evt.dataTransfer.items) {
      const render = new FileReader();
      render.onload = (evt) => {
        this.image = evt.target.result;
      };

      for (let i = 0; i < evt.dataTransfer.items.length; i++) {
        const item = evt.dataTransfer.items[i];
        if (item.kind == "file") {
          render.readAsDataURL(item.getAsFile());
        }
      }
    }
  }

  render() {
    return html`<div
      @click=${(evt: Event) => this.setToolbarPosition()}
      class=${classMap(this.classes)}
      style=${styleMap({
        fontSize: `${(this.fontSize && `${this.fontSize}px`) || `inherit`}`,
        color: this.fontColor,
        width: `${Math.trunc(
          this.parentElement.getBoundingClientRect().width * 0.9
        )}px`,
      })}
    >
      ${this.editor.render()}
    </div>`;
  }
}
