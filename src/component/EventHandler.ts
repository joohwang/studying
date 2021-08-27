import { Publisher } from "./Publisher";
import { Subscriber } from "./Subscriber";

export class EventHandler {
  private subscriber: Map<Element, Subscriber>;

  private observers: Map<Publisher, unknown>[];

  constructor() {
    this.subscriber = new Map();
    this.observers = [];
  }

  addSubscriber(publisher: Element, subscriber: Subscriber) {
    if (!this.subscriber.has(publisher)) {
      this.subscriber.set(publisher, subscriber);
      let _k;
      this.observers.some((e) => {
        const map = [...e.keys()].find(
          (k) => ((_k = k), undefined === e.get(k))
        );
        map instanceof Map && map.set(_k, publisher);
      });
    }
  }

  subscribe(param: Map<EventTarget, unknown>) {
    [...param.keys()]
      .filter((e) => this.subscriber.has(e as Element))
      .forEach((e) => this.subscriber.get(e as Element).subscribe(param));
  }

  directiveSubscribe(publisher: Publisher) {
    const subscirber = new Map();
    subscirber.set(publisher, undefined);
    this.observers.push(subscirber);
  }
}
