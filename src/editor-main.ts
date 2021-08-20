import { LitElement, html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { directive } from 'lit/directive.js';
import { repeat } from 'lit/directives/repeat.js';
import { ComponentDirective } from './component/ComponentDirective';
import { ComponentContextDirective } from './component/ComponentContextDirective';

@customElement("editor-main")
export class EditorMain extends LitElement {

    static styles = css`
        div {margin : 0}
        .ed_container {
            min-width : 50%;
            max-width : 80%;
            height : ${(screen.availHeight * 0.8)}px;
            background-color : #e3e3e36b;
            display : flex;
            flex-direction : column;
            align-items : center;
        }
        .component {
            outline : none;
            width : 90%;
        }
        .ed_compon_tool_bar {
            position : absolute;
            display : none;
        }
        .ed_compon_tool_button {
            background-color: #8fcdff80;
            border-radius : 50%;
        }
        `;


    @query(".ed_container")
    _container: HTMLDivElement;


    @query('.ed_compon_tool_bar')
    _componentMenu: HTMLDivElement;

    @query('.ed_compon_tool_button')
    _button: HTMLDivElement;

    @property()
    componentDirective: any[];

    @property()
    context;


    constructor() {
        super();
        this.componentDirective = [];
    }

    clickHandler(evt: Event) {
        const targets = evt.composedPath();
        if (this._container.isEqualNode((targets[0] as Node))) {
            this.componentDirective = [...this.componentDirective, { "_i": this.componentDirective.length, "_d": directive(ComponentDirective) }];
        }
    }

    updated(changedProperties: Map<string, unknown>) {
        if (changedProperties.has("componentDirective")) {
            const div: Element = this.shadowRoot.querySelector('.ed_container div.component:last-child');
            if (div !== undefined && div !== null) (div as HTMLElement).focus(), this.setComponentToolbarStyle((div as HTMLElement));
        }
    }

    setComponentToolbarStyle(_d: HTMLElement) {

        const rect = this._container.getBoundingClientRect(), dRect = _d.getBoundingClientRect();
        let width: string;

        this._componentMenu.style.display = 'flex';
        this._componentMenu.style.justifyContent = 'center';
        this._componentMenu.style.alignItems = 'center';
        this._componentMenu.style.left = `${rect.left}px`;
        this._componentMenu.style.top = `${dRect.top}px`;
        this._componentMenu.style.width = width = `${(rect.width - dRect.width) * 0.5}px`;
        this._componentMenu.style.height = `${dRect.height}px`;

        this._button.style.height = this._button.style.width = `${(parseInt(width) * 0.8)}px`;
    }

    contextMenuHandler(evt: Event) {
        evt.preventDefault();
        this.context = (directive(ComponentContextDirective) as Function).bind(this, evt);
    }

    inputHandler(evt: Event) {
        const _t = (evt.target as Element);
        const _p = _t.parentNode;
        const idx = [..._p.querySelectorAll('.component')].findIndex(_c => _t.isEqualNode(_c));

        let _c = this.componentDirective.splice(idx, 1).pop();
        _c._d.bind('test');
        this.componentDirective = this.componentDirective.splice(idx, 0, _c);
    }


    render() {
        return html`<div class="ed_container" @input=${this.inputHandler} @contextmenu=${this.contextMenuHandler} @click=${this.clickHandler}><div class="ed_compon_tool_bar"><div class="ed_compon_tool_button"></div></div>${repeat(this.componentDirective, (_d) => _d._i, (_d: any, _i: number) => _d._d())}</div>
        ${(typeof this.context == 'function' && this.context()) || ``}`;
    }

}