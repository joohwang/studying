import { html } from "lit";
import { styleMap } from "lit/directives/style-map";
import { ImageSliderProperty } from "../Property";

export class ImageSlider {
  private images;

  private width;

  constructor(property: ImageSliderProperty) {
    this.images = property.images;
    this.width = property.width;
  }

  dragleaveHandler(evt: DragEvent) {
    evt.preventDefault();
    console.log(evt);
  }

  render() {
    return html`<div class="img_container">
      <div
        class="img_container_slider"
        style="transform: translate3d(0px, 0px, 0px);  transition-duration: 0ms;"
      >
        ${this.images.map(
          (e) =>
            html`<div
              class="img_slide"
              @drag=${(evt) => evt.preventDefault()}
              @dragleave=${this.dragleaveHandler}
              style=${styleMap({ width: `${this.width}px` })}
            >
              <img src="${e}" />
            </div>`
        )}
      </div>
    </div>`;
  }
}
