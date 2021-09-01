import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { classMap } from "lit/directives/class-map.js";
import { Editors, ImageEditor, ListEditor, TextEditor } from "./EditorType";
import _ from "underscore";
import { Subject } from "rxjs";

@customElement("editor-element")
export class EditorElement extends LitElement {
  static styles = css`
    .component {
      margin: 5px 0px;
      height: auto;
    }
    .component.img .img_drop {
      border: 1px outset;
      border-radius: 15px;
      background-color: #ffffff6b;
      color: #808080;
      text-align: center;
    }
    .component.text div {
      outline: none;
    }
    .img_container {
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    .img_container_slider {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      transition-property: transform;
      box-sizing: content-box;
    }
    .img_slide {
      background-color: #ffffff8f;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      width: 100%;
      height: 100%;
      position: relative;
      transition-property: transform;
    }
  `;

  @property({
    hasChanged: (val, oVal) => val !== undefined && oVal !== undefined,
  })
  classes: Record<string, boolean>;

  subject: Subject<unknown>;

  @property()
  childChange: number;

  @property({ hasChanged: (val, oVal) => (console.log(val, oVal), true) })
  editor: Editors;

  constructor() {
    super();
    this.reactive();
    this.editor = new Editors(TextEditor, this.subject);
    this.classes = {
      component: true,
    };
    this.childChange = 0;
    this.editor.setProperties({ size: 30, color: "black" });
  }

  reactive() {
    this.subject = new Subject();
    this.subject.subscribe({
      next: (value) => (console.log(value), this.childChange++),
      complete: () => console.log("subject complete"),
    });
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
          if (this.classes.img)
            this.editor = new Editors(ImageEditor, this.subject);
          if (this.classes.list)
            this.editor = new Editors(ListEditor, this.subject);
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

  render() {
    const width = Math.trunc(
      this.parentElement.getBoundingClientRect().width * 0.9
    );

    return html`<div
      @click=${(evt: Event) => this.setToolbarPosition()}
      class=${classMap(this.classes)}
      style=${styleMap({
        width: `${width}px`,
      })}
    >
      ${this.editor.render({ width: width })}
    </div>`;
  }
}
