import ContextMenu from './ContextMenu.ts';
import ContextMenuBuilder from './ContextMenuBuilder.ts';

interface Properties {
    FUNCTION_NAME: string;
    contextMenu: new () => ContextMenu;
    builder: ContextMenuBuilder<ContextMenu>;
}

export default class ContextMenuSupport implements Properties {

    FUNCTION_NAME: string;

    contextMenu: new () => ContextMenu;

    builder: ContextMenuBuilder<ContextMenu>;

    constructor() {
        this.FUNCTION_NAME = "contextMenu";
    }

    findContextMenuType(paths: HTMLElement[]): boolean {
        let _c: any = paths.find((e: any) => typeof e[this.FUNCTION_NAME] == 'function');

        if (_c === undefined) return false;

        this.contextMenu = _c[this.FUNCTION_NAME].call(_c);
        this.builder = new ContextMenuBuilder(this.contextMenu);

        return true;
    }

    getContextMenu(x: number, y: number): ContextMenu {
        return this.builder.setX(x).setY(y).build();
    }



}