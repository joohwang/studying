import { html } from "lit";
import { StyleInfo, styleMap } from "lit/directives/style-map";
import _ from "underscore";

export abstract class ContextToolbar {
  private _icons = ["text", "img", "list"];

  private _toolbarStyle: StyleInfo = {};

  private _currentTarget;

  protected _menuButtonStyle: StyleInfo = {};

  protected _toolbarIcon: StyleInfo = {};

  constructor() {}

  abstract subTypeRender();

  toolbarClickHandler(evt: Event) {
    let target;
    const bar = (target = evt.currentTarget as HTMLElement)
      .nextElementSibling as HTMLElement;

    const rect = target.getBoundingClientRect();

    bar.style.left = `${rect.width + rect.left}px`;
    bar.style.top = `${rect.top}px`;
    bar.style.display = "inline-flex";

    bar.animate(
      [
        { transform: "translateX(0)", opacity: 0 },
        { transform: "translateX(10px)", opacity: 1 },
      ],
      {
        duration: 1000,
        easing: "cubic-bezier(0.250, 0.460, 0.450, 0.940) ",
        fill: "both",
      }
    );
  }

  toolbarIconHandler(evt: Event) {
    const _t = evt
      .composedPath()
      .find(
        (e) =>
          e instanceof HTMLLIElement &&
          this._icons.some((i) => [...e.classList].includes(i))
      ) as HTMLLIElement;

    let claz = {};
    claz[_t.classList.item(0)] = true;
    this._currentTarget["classes"] = _.extend(
      this._currentTarget["classes"],
      claz
    );
  }

  renderIcons() {
    return this._icons.map((e) => {
      return html`<li
        @click=${this.toolbarIconHandler.bind(this)}
        class="${e}"
        style=${styleMap(this._toolbarIcon)}
      >
        <img style="width : 25px; height : 25px;" src="/static/img/${e}.svg" />
      </li>`;
    });
  }

  renderHtmlString() {
    return html`
      <div
        style="${styleMap(this._menuButtonStyle)}"
        @click=${this.toolbarClickHandler.bind(this)}
      >
        <svg
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          width="25px"
          height="25px"
          viewBox="0 0 250 250"
          xml:space="preserve"
        >
          <g id="XMLID_221_">
            <path
              id="XMLID_222_"
              d="M95,70h120c8.284,0,15-6.716,15-15s-6.716-15-15-15H95c-8.284,0-15,6.716-15,15S86.716,70,95,70z"
            />
            <path
              id="XMLID_223_"
              d="M215,100H95c-8.284,0-15,6.716-15,15s6.716,15,15,15h120c8.284,0,15-6.716,15-15S223.284,100,215,100z"
            />
            <path
              id="XMLID_224_"
              d="M215,160H95c-8.284,0-15,6.716-15,15s6.716,15,15,15h120c8.284,0,15-6.716,15-15S223.284,160,215,160z"
            />
            <path
              id="XMLID_225_"
              d="M15,160c-3.95,0-7.811,1.6-10.61,4.39C1.6,167.19,0,171.05,0,175c0,3.95,1.6,7.81,4.39,10.61
           C7.189,188.4,11.05,190,15,190s7.81-1.6,10.609-4.39C28.399,182.81,30,178.95,30,175c0-3.95-1.601-7.81-4.391-10.61
           C22.81,161.6,18.95,160,15,160z"
            />
            <path
              id="XMLID_226_"
              d="M15,100c-3.95,0-7.811,1.6-10.61,4.39C1.6,107.19,0,111.05,0,115c0,3.95,1.6,7.81,4.39,10.61
           C7.189,128.4,11.05,130,15,130s7.81-1.6,10.609-4.39C28.399,122.81,30,118.95,30,115c0-3.95-1.601-7.81-4.391-10.61
           C22.81,101.6,18.95,100,15,100z"
            />
            <path
              id="XMLID_227_"
              d="M15,40c-3.95,0-7.811,1.6-10.61,4.39C1.6,47.19,0,51.05,0,55c0,3.95,1.6,7.81,4.39,10.61
           C7.189,68.4,11.05,70,15,70s7.81-1.6,10.609-4.39C28.399,62.81,30,58.95,30,55c0-3.95-1.601-7.81-4.391-10.61
           C22.81,41.6,18.95,40,15,40z"
            />
          </g>
        </svg>
      </div>
      <div style=${styleMap(this._toolbarStyle)}>${this.renderIcons()}</div>
    `;
  }

  setStyle(containerRect, componentRect) {
    const absolueYPointer =
      containerRect.top < 0
        ? window.pageYOffset + componentRect?.top
        : componentRect?.top;

    let width: string = `${
      Math.floor(((containerRect?.width - componentRect?.width) * 0.5) / 5) * 5
    }px`;

    this._menuButtonStyle = {
      width: width,
      height: width,
      left: `${containerRect.left}px`,
      top: `${absolueYPointer}px`,
      position: "absolute",
      display: "flex",
      alignItems: "center",
      paddingBottom: "10px",
      justifyContent: "center",
    };

    this._toolbarStyle = {
      display: "none",
      position: "absolute",
    };

    this._toolbarIcon = {
      listStyle: "none",
      marginRight: "5px",
      cursor: "pointer",
    };
  }

  render(prop: any) {
    this._currentTarget = prop?._t;

    const rect = prop._c,
      dRect = this._currentTarget?.shadowRoot
        .querySelector("div.component")
        ?.getBoundingClientRect();

    if (this._currentTarget === undefined) {
      this._toolbarStyle = this._menuButtonStyle = {
        display: "none",
      };
    } else {
      this.setStyle(rect, dRect);
    }

    if (
      this._currentTarget !== undefined &&
      this._currentTarget.shadowRoot.querySelector("div.component")?.classList
        .length > 1
    ) {
      return this.subTypeRender();
    } else {
      return this.renderHtmlString();
    }
  }
}
