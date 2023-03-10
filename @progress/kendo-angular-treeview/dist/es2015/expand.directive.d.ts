import { EventEmitter, OnDestroy } from '@angular/core';
import { TreeViewComponent } from './treeview.component';
import { Subscription } from 'rxjs';
/**
 * A directive which manages the expanded state of the TreeView
 * ([see example]({% slug expandedstate_treeview %})).
 */
export declare class ExpandDirective implements OnDestroy {
    protected treeView: TreeViewComponent;
    /**
     * @hidden
     */
    isExpanded: <T>(item: T, index: string) => boolean;
    /**
     * Defines the item key that will be stored in the `expandedKeys` collection.
     */
    expandKey: string | ((context: {
        index: string;
        dataItem: any;
    }) => any);
    /**
     * Fires when the `expandedKeys` collection was updated.
     */
    expandedKeysChange: EventEmitter<any[]>;
    /**
     * Defines the collection that will store the expanded keys.
     */
    expandedKeys: any[];
    protected subscriptions: Subscription;
    private _expandedKeys;
    constructor(treeView: TreeViewComponent);
    ngOnDestroy(): void;
    protected itemKey(e: any): any;
    protected toggleExpand({ index, dataItem, expand }: any): void;
}
