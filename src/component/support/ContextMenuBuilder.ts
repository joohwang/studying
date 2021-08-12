import ContextMenu from './ContextMenu.ts';

export default class ContextMenuBuilder<T extends ContextMenu> {

    private x: number;

    private y: number;

    constructor(private menu: new () => T) {

    }

    setX(x: number): this {
        this.x = x;
        return this;
    }

    setY(y: number): this {
        this.y = y;
        return this;
    }

    build(): T {
        let _m: T = new this.menu;
        _m.setPosition(this.x, this.y);
        return _m;

    }

}
