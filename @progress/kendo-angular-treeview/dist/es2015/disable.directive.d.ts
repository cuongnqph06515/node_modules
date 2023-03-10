import { ChangeDetectorRef, OnChanges } from '@angular/core';
import { TreeViewComponent } from './treeview.component';
/**
 * A directive which manages the disabled in-memory state of the TreeView node
 * ([see example]({% slug disabledstate_treeview %})).
 */
export declare class DisableDirective implements OnChanges {
    protected treeView: TreeViewComponent;
    protected cdr: ChangeDetectorRef;
    /**
     * @hidden
     */
    isDisabled: <T>(item: T, index: string) => boolean;
    /**
     * Defines the item key that will be stored in the `disabledKeys` collection.
     */
    disableKey: string | ((context: {
        index: string;
        dataItem: any;
    }) => any);
    /**
     * Defines the collection that will store the disabled keys.
     */
    disabledKeys: any[];
    constructor(treeView: TreeViewComponent, cdr: ChangeDetectorRef);
    ngOnChanges(changes?: any): void;
    protected itemKey(e: any): any;
}
