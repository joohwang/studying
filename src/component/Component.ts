import { AbstractContextMenu } from './support/ContextMenu.ts'

export default interface Component {

    contextMenu(): AbstractContextMenu;
    contextMenuData(): Record<string, unknown>;
    contextDataChage(evt: CustomEvent): void;

    isSupport(): boolean;

}