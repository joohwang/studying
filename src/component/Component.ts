import ContextMenu from './support/ContextMenu.ts'

export default interface Component {

    contextMenu(): ContextMenu;
    isSupport(): boolean;

}