import { html } from 'lit';
import { Directive } from 'lit/directive.js';

export class ComponentContextDirective extends Directive {

    render(...props: unknown[]): unknown {
        const evt: MouseEvent = (props.find(e => e instanceof MouseEvent) as MouseEvent);
        const paths = evt.composedPath();
        const target: HTMLElement = (paths[0] as HTMLElement);

        if (target instanceof HTMLElement && target.classList.contains("component")) {
            return html`<div style="width : 100px; height : 100px; position : absolute; top: ${evt.clientY}px; left : ${evt.clientX}px;">Test</div>`;
        }
    }

}
