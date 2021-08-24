import { html, css } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { directive } from "lit/directive.js";
import { repeat } from "lit/directives/repeat.js";
import { ComponentContextDirective } from "./component/ComponentContextDirective";
import { TextComponent } from "./component/TextComponent";
import { Subscriber } from "./component/Subscriber";
import { v4 } from "uuid";
import { EventHandler } from "./component/EventHandler";

@customElement("editor-main")
export class EditorMain extends Subscriber {
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
    .component {
      outline: none;
      width: 90%;
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

  @query(".ed_compon_tool_bar")
  _componentMenu: HTMLDivElement;

  @query(".ed_compon_tool_button")
  _button: HTMLDivElement;

  @property()
  componentDirective: any[];

  @property()
  context;

  eventHandler: EventHandler;

  constructor() {
    super();
    this.componentDirective = [];
    this.eventHandler = new EventHandler();
  }

  subscribe(param: Map<EventTarget, unknown>) {
    this.componentDirective = this.componentDirective.map((e, i) => {
      let val;
      return i ===
        [...this.shadowRoot.querySelectorAll(".component")].findIndex(
          (e) => param.has(e) && (val = param.get(e))
        )
        ? ((e._d = e._d.bind(e._d, val)), e)
        : e;
    });
  }

  clickHandler(evt: Event) {
    if (this.context !== undefined) this.context = undefined;
    const component = directive(
      TextComponent.bind(undefined, this.eventHandler)
    );

    const targets = evt.composedPath();
    if (this._container.isEqualNode(targets[0] as Node)) {
      const _v4 = v4();
      const _c = { _i: _v4, _d: component };
      this.componentDirective = [...this.componentDirective, _c];
    }
  }

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has("componentDirective")) {
      const div: Element = this.shadowRoot.querySelector(
        ".ed_container div.component:last-child"
      );
      if (div !== undefined && div !== null) {
        this.setComponentToolbarStyle(div as HTMLElement);
        super.onSubscribe(div, this.eventHandler);
      }
    }
  }

  setComponentToolbarStyle(_d: HTMLElement) {
    const rect = this._container.getBoundingClientRect(),
      dRect = _d.getBoundingClientRect();
    let width: string;

    this._componentMenu.style.display = "flex";
    this._componentMenu.style.justifyContent = "center";
    this._componentMenu.style.alignItems = "center";
    this._componentMenu.style.left = `${rect.left}px`;
    this._componentMenu.style.top = `${dRect.top}px`;
    this._componentMenu.style.width = width = `${
      (rect.width - dRect.width) * 0.5
    }px`;
    this._componentMenu.style.height = `${dRect.height}px`;

    this._button.style.height = this._button.style.width = `${
      parseInt(width) * 0.8
    }px`;
  }

  contextMenuHandler(evt: Event) {
    evt.preventDefault();
    this.context = (directive(ComponentContextDirective) as Function).bind(
      this,
      evt
    );
  }

  render() {
    return html`<div
        class="ed_container"
        @contextmenu=${this.contextMenuHandler}
        @click=${this.clickHandler}
      >
        <div class="ed_compon_tool_bar">
          <div class="ed_compon_tool_button"></div>
        </div>
        ${repeat(
          this.componentDirective,
          (_d) => {
            console.log(_d._i);
            _d._i;
          },
          (_d: any, _i: number) => _d._d()
        )}
      </div>
      ${(typeof this.context == "function" && this.context()) || ``}`;
  }
}
