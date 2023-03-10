import { OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TreeViewComponent } from './treeview.component';
/**
 * A directive which encapsulates the retrieval of the child nodes.
 */
export declare class FlatDataBindingDirective implements OnInit, OnChanges {
    protected treeView: TreeViewComponent;
    /**
     * The nodes which will be displayed by the TreeView.
     */
    nodes: any[];
    /**
     * Represents the parent field whose value will be matched with the parent node.
     */
    parentIdField: string;
    /**
     * Represents the unique field which identifies a node.
     */
    idField: string;
    protected originalData: any[];
    constructor(treeView: TreeViewComponent);
    /**
     * @hidden
     */
    ngOnInit(): void;
    /**
     * @hidden
     */
    ngOnChanges(changes: SimpleChanges): void;
}
