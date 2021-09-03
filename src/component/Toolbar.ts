import { html, noChange } from "lit";
import { Directive } from "lit/directive.js";
import { StyleInfo, styleMap } from "lit/directives/style-map.js";
import _ from "underscore";

export class Toolbar extends Directive {
  _icons = ["text", "img", "list"];

  _menuStyle: StyleInfo = {};

  _buttonStyle: StyleInfo = {};

  _toolbarStyle: StyleInfo = {};

  _toolbarIcon: StyleInfo = {};

  _currentTarget;

  toolbarClickHandler(evt: Event) {
    const div = evt.composedPath()[0] as HTMLElement;
    div.animate([{ opacity: "0" }, { opacity: "1" }], {
      duration: 1.2,
      easing: "cubic-bezier(0.390, 0.575, 0.565, 1.000)",
      fill: "both",
    });
    (evt.composedPath()[0] as HTMLElement).style.boxShadow =
      "inset 2px 1px 5px 0px;";

    this.toolbarShow(div);

    return noChange;
  }

  toolbarShow(div: HTMLElement) {
    const bar = div.nextElementSibling as HTMLElement;
    bar
      .querySelectorAll("*")
      .forEach((e) => ((e as HTMLElement).style.visibility = "visible"));
    bar.animate(
      [
        { transform: "translateX(0)", opacity: 0 },
        { transform: "translateX(10px)", opacity: 1, visibility: "visible" },
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
          e instanceof HTMLDivElement &&
          this._icons.some((i) => [...e.classList].includes(i))
      ) as HTMLDivElement;

    let claz = {};
    claz[_t.classList.item(1)] = true;
    this._currentTarget["classes"] = _.extend(
      this._currentTarget["classes"],
      claz
    );
  }

  renderIcons() {
    return this._icons.map((e) => {
      return html`<div
        @click=${this.toolbarIconHandler.bind(this)}
        class="ed_compon_tool_bar ${e}"
        style=${styleMap(this._toolbarIcon)}
      >
        <img
          src="/static/img/${e}.svg"
          style=${styleMap({ visibility: "hidden" })}
        />
      </div>`;
    });
  }

  renderHtmlString() {
    return html`<div
      class="ed_compon_tool_bar"
      style=${styleMap(this._menuStyle)}
    >
      <div
        class="ed_compon_tool_button"
        style=${styleMap(this._buttonStyle)}
        @click=${this.toolbarClickHandler.bind(this)}
      ></div>
      <div class="ed_compon_tool_bar bar" style=${styleMap(this._toolbarStyle)}>
        ${this.renderIcons()}
      </div>
    </div>`;
  }

  setStyle(containerRect, componentRect) {
    let tWdith = 0,
      tHeight = 0;

    const absolueYPointer =
      containerRect.top < 0
        ? window.pageYOffset + componentRect?.top
        : componentRect?.top;

    this._menuStyle = {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      left: `${containerRect?.left}px`,
      transform: `translate3d(0px, ${containerRect.top}px, 0px)`,
      width: `${(tWdith +=
        (containerRect?.width - componentRect?.width) * 2)}px`,
    };

    let width: string = `${
      (containerRect?.width - componentRect?.width) * 0.5
    }px`;

    this._buttonStyle = {
      height: `${(tHeight += parseInt(width) * 0.8)}px`,
      width: `${parseInt(width) * 0.8}px`,
      cursor: "pointer",
      transform: `translate3d(0px, ${-Math.abs(absolueYPointer) + 5}px, 0px)`,
      boxShadow: "2px 1px 5px 0px",
    };

    this._toolbarStyle = {
      width: `${(tWdith -= tHeight + 10)}px`,
      height: `${tHeight}px`,
    };

    this._toolbarIcon = {
      transform: `translate3d(0px, ${-Math.abs(absolueYPointer) + 5}px, 0px)`,
      visibility: "hidden",
      position: "relative",
      marginRight: "5px",
      cursor: "pointer",
    };
  }

  render(prop: any) {
    this._currentTarget = prop?._t;

    if (
      (this._currentTarget !== undefined &&
        this._currentTarget.shadowRoot.querySelector("div.component")?.classList
          .length > 1) ||
      this._currentTarget == undefined
    ) {
      this._menuStyle = {
        display: "none",
      };
    } else {
      const rect = prop._c,
        dRect = this._currentTarget?.shadowRoot
          .querySelector("div.component")
          ?.getBoundingClientRect();

      this.setStyle(rect, dRect);
    }

    return this.renderHtmlString();
  }
}
