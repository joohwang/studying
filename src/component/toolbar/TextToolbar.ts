import { ContextToolbar } from "./ContextToolbar";

export class TextToolbar extends ContextToolbar {
  subTypeRender() {
    throw new Error("Method not implemented.");
  }

  public static type() {
    return "text";
  }
}
