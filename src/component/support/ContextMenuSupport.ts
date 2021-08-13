import { AbstractContextMenu } from './ContextMenu.ts';
import ContextMenuBuilder from './ContextMenuBuilder.ts';


interface Properties {
    FUNCTION_NAME_TYPE: string;
    FUNCTION_NAME_DATA: string;
    FUNCTION_NAME_CHANGE: string;
    contextMenu: AbstractContextMenu;
    builder: ContextMenuBuilder<AbstractContextMenu>;
}

export default class ContextMenuSupport implements Properties {

    FUNCTION_NAME_TYPE: string;

    FUNCTION_NAME_DATA: string;

    FUNCTION_NAME_CHANGE: string;

    contextMenu: AbstractContextMenu;

    builder: ContextMenuBuilder<AbstractContextMenu>;

    _target: any;

    constructor() {
        this.FUNCTION_NAME_TYPE = "contextMenu";
        this.FUNCTION_NAME_DATA = "contextMenuData";
        this.FUNCTION_NAME_CHANGE = "contextDataChage";
    }

    findContextMenuType(paths: HTMLElement[]): boolean {
        const _c: any = paths.find((e: any) => e.constructor.name.indexOf("Component") != -1);

        if (_c === undefined) return false;

        const _contextMenu = _c[this.FUNCTION_NAME_TYPE].call(_c);
        const _data: Record<string, unknown> = _c[this.FUNCTION_NAME_DATA].call(_c);
        this.builder = new ContextMenuBuilder(_contextMenu, _data);

        this._target = _c;

        return true;
    }

    changeData(_d: any) {
        this._target[this.FUNCTION_NAME_CHANGE].call(this._target, _d);
    }

    getContextMenu(x: number, y: number): AbstractContextMenu {
        return this.contextMenu = this.builder.setX(x).setY(y).build(this.changeData.bind(this));
    }



}