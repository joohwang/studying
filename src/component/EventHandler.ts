import { Subscriber } from "./Subscriber";

export class EventHandler {
  private subscriber: Map<Element, Subscriber>;

  constructor() {
    this.subscriber = new Map();
  }

  addSubscriber(publisher: Element, subscriber: Subscriber) {
    if (!this.subscriber.has(publisher)) {
      this.subscriber.set(publisher, subscriber);
    }
  }

  subscribe(param: Map<EventTarget, unknown>) {
    [...param.keys()]
      .filter((e) => this.subscriber.has(e as Element))
      .forEach((e) => this.subscriber.get(e as Element).subscribe(param));
  }
}
