import { OnInit } from '@angular/core';
import { TreeViewComponent } from './treeview.component';
/**
 * A directive which encapsulates the retrieval of child nodes.
 */
export declare class HierarchyBindingDirective implements OnInit {
    protected treeView: TreeViewComponent;
    /**
     * The field name which holds the data items of the child component.
     */
    /**
    * The field name which holds the data items of the child component.
    */
    childrenField: string;
    private _childrenField;
    constructor(treeView: TreeViewComponent);
    ngOnInit(): void;
}
