import { Directive, PartInfo } from "lit/directive.js";
import { EventHandler } from "./EventHandler";

export abstract class Publisher extends Directive {
  private handle: EventHandler;

  constructor(_partInfo: PartInfo) {
    super(_partInfo);
  }

  abstract emitMessage(evt: Event);

  publish(param: Map<EventTarget, unknown>) {
    this.handle.subscribe(param);
  }

  onPublish(eventHander: EventHandler) {
    this.handle = eventHander;
  }
}
