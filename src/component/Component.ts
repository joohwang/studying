import { AbstractContextMenu } from './support/ContextMenu.ts'

export default interface Component {

    contextMenu(): AbstractContextMenu;
    contextMenuData(): Record<string, unknown>;
    contextDataChage(_d: Record<string, unknown>): void;

    isSupport(): boolean;

}