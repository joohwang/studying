import { AbstractContextMenu } from './ContextMenu.ts';

export default class ContextMenuBuilder<T extends AbstractContextMenu> {

    private _x: number;

    private _y: number;

    private _d: Record<string, unknown>;

    constructor(private menu: new () => T, d: Record<string, unknown>) {
        this._d = d;
    }

    setX(x: number): this {
        this._x = x;
        return this;
    }

    setY(y: number): this {
        this._y = y;
        return this;
    }

    build(): T {
        let _m: T = new this.menu;
        _m.setPosition(this._x, this._y);
        _m.setMenuData(this._d);
        return _m;

    }

}
