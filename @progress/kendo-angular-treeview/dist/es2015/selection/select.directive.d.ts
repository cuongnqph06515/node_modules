import { EventEmitter, OnDestroy } from '@angular/core';
import { TreeViewComponent } from '../treeview.component';
import { SelectableSettings } from './selectable-settings';
import { Subscription } from 'rxjs';
/**
 * A directive which manages the in-memory selection state of the TreeView node
 * ([see example]({% slug selection_treeview %})).
 */
export declare class SelectDirective implements OnDestroy {
    protected treeView: TreeViewComponent;
    /**
     * @hidden
     */
    isSelected: <T>(item: T, index: string) => boolean;
    /**
     * Defines the item key that will be stored in the `selectedKeys` collection.
     */
    selectKey: string | ((context: {
        index: string;
        dataItem: any;
    }) => any);
    /**
     * Defines the current selection mode
     * ([see example]({% slug selection_treeview %}#toc-selection-modes)).
     */
    selection: boolean | SelectableSettings;
    /**
     * Defines the collection that will store the selected keys
     * ([see example]({% slug selection_treeview %}#toc-selection-modes)).
     */
    selectedKeys: any[];
    /**
     * Fires when the `selectedKeys` collection was updated.
     */
    selectedKeysChange: EventEmitter<any[]>;
    readonly getAriaMultiselectable: boolean;
    protected subscriptions: Subscription;
    private readonly options;
    private selectActions;
    private _selectedKeys;
    constructor(treeView: TreeViewComponent);
    ngOnDestroy(): void;
    protected itemKey(e: any): any;
    protected select(e: any): void;
    protected selectSingle(node: any): void;
    protected selectMultiple(node: any): void;
    private notify;
}
