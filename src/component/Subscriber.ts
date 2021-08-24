import { LitElement } from "lit";
import { EventHandler } from "./EventHandler";

export abstract class Subscriber extends LitElement {
  constructor() {
    super();
  }

  abstract subscribe(param: Map<EventTarget, unknown>);

  onSubscribe(element: Element, event: EventHandler) {
    event.addSubscriber(element, this);
  }
}
