import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { classMap } from "lit/directives/class-map.js";
import { Editors, TextEditor } from "./EditorType";
import _ from "underscore";

@customElement("editor-element")
export class EditorElement extends LitElement {
  @property({ hasChanged: (val, oVal) => true })
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
    const element: HTMLElement = this.shadowRoot.querySelector("div.component");
    Promise.resolve(
      element.dispatchEvent(
        new CustomEvent("showtoolbar", {
          detail: element,
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

    /* 
    return this.image === undefined
      ? html`<div
          @drop=${this.dropHandler}
          @dragover=${(evt: Event) => evt.preventDefault()}
          @contextmenu=${(evt) => evt.preventDefault()}
          @focus=${(evt: Event) =>
            this.dispatchEvent(
              new CustomEvent("showtoolbar", {
                detail: evt.currentTarget,
                bubbles: true,
                composed: true,
              })
            )}
          @input=${(evt) => !this.ed_text && (this.ed_text = true)}
          class="${classMap(classes)}"
          style=${styleMap({
            fontSize: `${(this.fontSize && `${this.fontSize}px`) || `inherit`}`,
            color: this.fontColor,
            width: `${Math.trunc(
              this.parentElement.getBoundingClientRect().width * 0.9
            )}px`,
          })}
          contenteditable="true"
        ></div>`
      : html`<div><img src=${this.image} /></div>`;
      */
  }
}
