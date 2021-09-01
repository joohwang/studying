import { isObservable, Subject } from "rxjs";
import { ParentProperty } from "../Property";

export abstract class Editor {
  protected observer: Subject<unknown>;
  protected parentProperty: ParentProperty;

  constructor(agrs: IArguments) {
    this.observer = [...agrs].find((e) => isObservable(e));
  }

  abstract setProperties(props: any);
  abstract render();

  abstract getContextMenuProperty(): any;

  showContextMenu() {
    this.getContextMenuProperty();
  }

  setParentProperty(property: ParentProperty) {
    this.parentProperty = property;
  }
}
