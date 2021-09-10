import { LitElement, noChange } from "lit";
import { Directive, PartInfo } from "lit/directive.js";
import { BasicToolbar } from "./BasicToolbar";
import { ContextToolbar } from "./ContextToolbar";
import { TextToolbar } from "./TextToolbar";
import _ from "underscore";

type ToolbarType<T extends ContextToolbar> = new (...args: any[]) => T;

class ToolbarCollecion implements Iterable<ToolbarType<ContextToolbar>> {
  collection: ToolbarType<ContextToolbar>[];

  constructor() {
    this.collection = [];
  }

  add(type: ToolbarType<ContextToolbar>) {
    this.collection.push(type);
  }

  [Symbol.iterator] = (): Iterator<ToolbarType<ContextToolbar>> => {
    return new ToolbarIterator(this);
  };
}

class ToolbarIterator implements Iterator<ToolbarType<ContextToolbar>> {
  collection: ToolbarCollecion;
  constructor(collection: ToolbarCollecion) {
    this.collection = collection;
  }
  next() {
    const collection = this.collection;
    return null;
  }
}

class ToolbarFactory {
  toolbars: any[];
  element: LitElement;

  constructor(element: LitElement, toolbars: any[]) {
    this.element = element;
    this.toolbars = toolbars;
  }

  public build(): string {
    const component = this.element?.shadowRoot.querySelector(".component");
    let claz;
    if (component instanceof HTMLDivElement) {
      claz = [...component.classList]
        .filter((e) => e !== "component")
        .find(async (e) => {
          const toolbarItem = this.toolbars.find((t) => t.type === e);
          const plug = await import(toolbarItem.claz);
          return Object.keys(plug)[0];
        });
    }

    if (claz === undefined)
      claz = this.toolbars
        ?.filter((t) => t.type === null)
        .find(async (e) => {
          const plug = await import(e.claz);
          return Object.keys(plug)[0];
        });

    return claz;
  }
}

export class ToolbarDirective extends Directive {
  render(props: any): any {
    const toolbarName: string = new ToolbarFactory(
      props?._t,
      props?._j
    ).build();
    if (typeof toolbarName == "string") {
      const toolbar = new (<any>BasicToolbar)[toolbarName]();
      return toolbar instanceof ContextToolbar ||
        toolbar instanceof BasicToolbar
        ? toolbar.render(props)
        : noChange;
    } else return noChange;
  }
}
