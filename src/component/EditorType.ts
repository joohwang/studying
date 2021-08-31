import { rejects } from "assert";
import { html, css } from "lit";
import {
  defer,
  fromEvent,
  Observable,
  of,
  Subject,
  isObservable,
  from,
} from "rxjs";
import { HotObservable } from "rxjs/internal/testing/HotObservable";
import { __extends } from "tslib";
import _ from "underscore";

interface Editor {
  setProperties(props: any);
  render();
}

type EditorType<T extends Editor> = new (...args: any[]) => T;

interface ImagePrperties {
  images;
  name;
  mime;
}

interface TextProperties {
  size: number;
  color: string;
}

interface ListProperties {}

class ImageEditor implements Editor {
  observer;

  images: any[];

  constructor() {
    this.observer = [...arguments].find((e) => isObservable(e));
    this.images = [];
  }

  imageDropHandler(evt: DragEvent) {
    evt.preventDefault();
    if (evt.dataTransfer.items) {
      Promise.all(
        (function* () {
          for (const file of evt.dataTransfer.items)
            yield new Promise(
              (resolve, reject) => (
                file.kind == "file" &&
                  (function (reader) {
                    reader.onload = (evt) => resolve(evt.target.result);
                    reader.readAsDataURL(file.getAsFile());
                  })(new FileReader()),
                file.kind != "file" && reject("Not File")
              )
            );
        })()
      )
        .then(
          (data) => (
            (this.images = [...this.images, ...data]),
            Promise.resolve(this.images)
          )
        )
        .then((_i) =>
          (function (images) {
            return new Observable((subscribe) => subscribe.next(images));
          })(_i)
            .subscribe(this.observer)
            .unsubscribe()
        );
    }
  }

  defaultRender() {
    return html`<svg
        style="vertical-align:middle; margin : 0px 5px;"
        height="30px"
        viewBox="0 0 511.999 511"
        width="30px"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="m469.488281 84.417969h-4.390625c-2.570312-22.023438-20.292968-39.484375-42.441406-41.621094-2.542969-23.742187-22.683594-42.296875-47.085938-42.296875h-302.21875c-40.445312 0-73.351562 32.90625-73.351562 73.347656v211.902344c0 24.574219 18.804688 44.828125 42.773438 47.144531 2.515624 23.488281 22.261718 41.886719 46.3125 42.273438.0625 4.167969.714843 8.191406 1.898437 11.988281 5.386719 17.292969 21.550781 29.882812 40.59375 29.882812h337.910156c23.441407 0 42.511719-19.070312 42.511719-42.507812v-247.601562c0-23.441407-19.070312-42.511719-42.511719-42.511719zm22.511719 42.511719v163.738281l-43.5-32.859375c-11.886719-8.976563-27.960938-9.117188-40-.347656l-55.027344 40.09375-104.9375-108.1875c-12.5-12.890626-32.839844-13.683594-46.304687-1.800782l-93.160157 82.191406v-142.828124c0-12.414063 10.097657-22.511719 22.507813-22.511719h337.910156c12.414063 0 22.511719 10.097656 22.511719 22.511719zm0 247.597656c0 12.414062-10.097656 22.511718-22.507812 22.511718h-337.914063c-10.082031 0-18.640625-6.667968-21.492187-15.824218-.660157-2.113282-1.015626-4.359375-1.015626-6.683594v-78.105469l106.394532-93.863281c5.441406-4.804688 13.660156-4.484375 18.714844.726562l47.359374 48.828126c0 .003906 0 .003906.003907.003906l94.261719 97.183594c1.960937 2.023437 4.566406 3.039062 7.179687 3.039062 2.507813 0 5.019531-.9375 6.960937-2.820312 3.960938-3.847657 4.058594-10.175782.214844-14.140626l-22.625-23.328124 52.742188-38.425782c4.867187-3.546875 11.363281-3.492187 16.167968.136719l55.554688 41.964844zm-429.5-46.707032v-236.109374c0-1.003907.050781-2 .152344-2.976563 1.492187-14.675781 13.925781-26.164063 28.988281-26.164063h122.320313c5.523437 0 10-4.476562 10-10 0-5.523437-4.476563-10-10-10h-122.320313c-27.097656 0-49.140625 22.042969-49.140625 49.140626v220.976562c-12.777344-2.300781-22.5-13.503906-22.5-26.9375v-211.902344c0-29.414062 23.933594-53.347656 53.351562-53.347656h302.21875c13.273438 0 24.371094 9.503906 26.84375 22.070312h-108.453124c-5.523438 0-10 4.476563-10 10 0 5.523438 4.476562 10 10 10h118.96875.011718 5.128906c13.195313 0 24.242188 9.394532 26.800782 21.847657h-313.292969c-23.4375 0-42.507813 19.070312-42.507813 42.511719v164.976562.007812 63.253907c-14.722656-.417969-26.570312-12.523438-26.570312-27.347657zm0 0"
        />
        <path
          d="m388.515625 145.117188c-23.601563 0-42.796875 19.199218-42.796875 42.792968 0 23.597656 19.199219 42.796875 42.796875 42.796875 23.59375 0 42.792969-19.199219 42.792969-42.796875 0-23.59375-19.199219-42.792968-42.792969-42.792968zm0 65.589843c-12.570313 0-22.796875-10.226562-22.796875-22.792969 0-12.570312 10.226562-22.796874 22.796875-22.796874 12.566406 0 22.792969 10.226562 22.792969 22.796874 0 12.566407-10.226563 22.792969-22.792969 22.792969zm0 0"
        />
        <path
          d="m244.730469 56.398438c.25.601562.558593 1.179687.917969 1.722656.363281.546875.78125 1.058594 1.242187 1.519531.460937.457031.96875.878906 1.519531 1.25.539063.359375 1.128906.667969 1.730469.917969.597656.25 1.230469.441406 1.871094.570312.636719.128906 1.296875.191406 1.949219.191406.660156 0 1.308593-.0625 1.960937-.191406.636719-.128906 1.257813-.320312 1.867187-.570312.601563-.25 1.179688-.558594 1.722657-.917969.546875-.371094 1.058593-.792969 1.519531-1.25.46875-.460937.878906-.972656 1.25-1.519531.359375-.542969.667969-1.121094.917969-1.722656.25-.609376.441406-1.238282.570312-1.867188.128907-.652344.191407-1.3125.191407-1.960938 0-.652343-.0625-1.3125-.191407-1.949218-.128906-.640625-.320312-1.273438-.570312-1.871094-.25-.609375-.558594-1.191406-.917969-1.730469-.371094-.550781-.78125-1.058593-1.25-1.519531-.460938-.460938-.972656-.878906-1.519531-1.242188-.542969-.359374-1.121094-.667968-1.722657-.917968-.609374-.25-1.230468-.441406-1.867187-.570313-1.292969-.261719-2.621094-.261719-3.910156 0-.640625.128907-1.273438.320313-1.871094.570313-.601563.25-1.191406.558594-1.730469.917968-.550781.363282-1.058594.78125-1.519531 1.242188s-.878906.96875-1.242187 1.519531c-.359376.539063-.667969 1.121094-.917969 1.730469-.25.597656-.441407 1.230469-.570313 1.871094-.128906.636718-.199218 1.296875-.199218 1.949218 0 .648438.070312 1.308594.199218 1.960938.128906.628906.320313 1.257812.570313 1.867188zm0 0"
        /></svg
      >Drop Images`;
  }

  imageRender() {
    return html`<div class="image_area">
      ${this.images.map((e) => html`<img src="${e}" />`)}
    </div>`;
  }

  render() {
    return html`<div
      @dragover=${(evt) => (
        evt.stopPropagation(),
        evt.preventDefault(),
        (evt.dataTransfer.dropEffect = "copy")
      )}
      @drop=${this.imageDropHandler.bind(this)}
    >
      ${this.images.length == 0 ? this.defaultRender() : this.imageRender()}
    </div>`;
  }
  setProperties(props: any) {
    throw new Error("Method not implemented.");
  }
}

class ListEditor implements Editor {
  constructor() {}
  render() {
    throw new Error("Method not implemented.");
  }
  setProperties(props: any) {
    throw new Error("Method not implemented.");
  }
}

class TextEditor implements Editor {
  size: number;
  color: string;
  constructor() {}

  inputhandler(evt: Event) {
    this["classes"] = _.extend(this["classes"], { text: true });
  }

  render() {
    return html`<div @input=${this.inputhandler} contenteditable="true"></div>`;
  }

  setProperties(properties: TextProperties) {
    this.size = properties.size;
    this.color = properties.color;
    console.log(this.size);
  }
}

export class Editors implements Editor {
  private editor;

  constructor(
    type: EditorType<ImageEditor | ListEditor | TextEditor>,
    subject: Subject<unknown>
  ) {
    this.editor = new type(subject);
  }

  render() {
    return this.editor.render();
  }

  setProperties(prop: any) {
    this.editor.setProperties(prop);
  }
}

export { ImageEditor, ListEditor, TextEditor };
