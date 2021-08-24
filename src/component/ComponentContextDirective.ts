import { html, Part } from "lit";
import { Directive, directive } from "lit/directive.js";
import { TextContext } from "./context/TextContext";

export class ComponentContextDirective extends Directive {
  update(_part: Part, props: unknown[]) {
    return this.render(props);
  }

  render(props: unknown[]): unknown {
    const evt: MouseEvent = props.find(
      (e) => e instanceof MouseEvent
    ) as MouseEvent;
    const paths = evt.composedPath();
    const target: HTMLElement = paths[0] as HTMLElement;

    const context = directive(TextContext.bind(TextContext, target));

    if (
      target instanceof HTMLElement &&
      target.classList.contains("component")
    ) {
      return html`<div
        style="position : absolute; top: ${evt.clientY}px; left : ${evt.clientX}px;"
      >
        ${context()}
      </div>`;
    }
  }
}
