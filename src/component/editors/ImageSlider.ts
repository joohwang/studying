import { html, LitElement, Part } from "lit";
import { Directive, PartInfo } from "lit/directive.js";
import { styleMap } from "lit/directives/style-map";
import Swiper, { Pagination } from "swiper";
import { ImageSliderProperty } from "../Property";

export class ImageSlider extends Directive {
  private images;

  private width;

  private isDrag: boolean;

  private startPointX: number;

  private movePointX: number;

  private offsetX: number;

  private container: HTMLDivElement;

  private activeIdx: number;

  constructor(property: ImageSliderProperty, _part: PartInfo) {
    super(_part);
    this.images = property.images;
    this.width = property.width;
    this.offsetX = 0;
    this.activeIdx = 0;
  }

  update(_part: Part, prop: unknown[]) {
    const host = _part.options.host;
    if (host instanceof LitElement) {
      const div = host.shadowRoot.querySelector(".component");
      const observer = new MutationObserver((mutations) => {
        for (
          let i = 0, mutation, idx;
          i < mutations.length;
          mutation = mutations[i],
            mutation.type === "childList" &&
              ((idx = [...new Set(mutation.addedNodes)].findIndex((e) =>
                (e as HTMLElement).classList.contains("img_container")
              )),
              idx > -1) &&
              new Swiper(mutation.addedNodes[idx] as HTMLElement, {
                on: {
                  init: (swiper: Swiper) => (
                    console.log(swiper), observer.disconnect()
                  ),
                },
                speed: 500,
                modules: [Pagination],
                pagination: {
                  el: (mutation.addedNodes[idx] as HTMLElement).querySelector(
                    ".img_pagination"
                  ) as HTMLElement,
                  type: "bullets",
                  bulletClass: "img_pagination_bullet",
                  renderBullet: (i, s) => `<div class="${s}"></div>`,
                },
              }),
            i++
        );
      });
      observer.observe(div as Node, {
        childList: true,
        attributes: false,
        subtree: true,
      });
    }

    console.log(_part.options.host);
    return this.render(prop);
  }

  mouseUpHandler(evt: DragEvent) {
    this.startPointX = this.movePointX;
    this.isDrag = false;
  }

  mouseMoveHandler(evt: MouseEvent) {
    if (this.isDrag) {
      evt.preventDefault();

      this.movePointX = evt.clientX - this.startPointX;
      this.offsetX = this.movePointX;

      if (this.container instanceof HTMLDivElement)
        this.movingContainer(this.movePointX);
    }
  }

  mouseDownHandler(evt: MouseEvent) {
    if (this.container === undefined)
      this.container = [...evt.composedPath()].find((e) =>
        (e as HTMLElement).classList.contains("img_container_slider")
      ) as HTMLDivElement;

    this.startPointX = evt.clientX - this.offsetX;
    this.isDrag = true;
  }

  dragleaveHandler(evt) {
    const isRight = this.movePointX < 0,
      target = evt.currentTarget as HTMLDivElement;

    let idx = 0;
    if (isRight) {
      idx = 1;
    } else {
      idx = -1;
    }

    this.newActiveIdx(idx);

    console.log(
      target.getBoundingClientRect().width * this.activeIdx * (idx * -1)
    );

    this.movingContainer(
      target.getBoundingClientRect().width * this.activeIdx * (idx * -1)
    );
  }

  movingContainer(point: number) {
    this.container.style.transform = `translate3d(${point}px, 0px, 0px)`;
  }

  newActiveIdx(idx: number) {
    let _idx = this.activeIdx;
    _idx += idx;

    const array = [...this.container.querySelectorAll(".img_slide")];
    if (array.length > _idx && _idx > 0) {
      this.activeIdx = _idx;
    }
    if (_idx < 0) {
      this.activeIdx = 0;
    }

    array.forEach((e, i) =>
      i == this.activeIdx
        ? e.classList.add("active")
        : e.classList.remove("active")
    );
  }

  render(prop: unknown[]) {
    return html`<div class="img_container swiper">
      <div class="img_container_slider swiper-wrapper"">
        ${this.images.map(
          (e, idx) =>
            html`<div
              class="img_slide swiper-slide"
              style=${styleMap({ width: `${this.width}px` })}
            >
              <img class="slide_element" src="${e}" />
            </div>`
        )}
      </div>
      <div class="img_pagination swiper-pagination"></div>
    </div>`;
  }
}
