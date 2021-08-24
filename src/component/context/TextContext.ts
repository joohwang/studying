import { html } from "lit";
import { Directive, PartInfo } from "lit-html/directive.js";

export class TextContext extends Directive {
  private fontSize: number;

  private color: string;

  constructor(element: HTMLElement, _partInfo: PartInfo) {
    super(_partInfo);
    const styles: CSSStyleDeclaration = getComputedStyle(element);
    this.fontSize = parseInt(styles.getPropertyValue("font-size"));
    this.color = styles.getPropertyValue("color");
  }

  change(evt) {
    console.log(evt);
  }

  render() {
    return html`<div class="text_context">
      <span>font-size</span
      ><input @change=${this.change} value="${this.fontSize}" />
    </div>`;
  }
}
