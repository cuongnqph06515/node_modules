/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { GridComponent } from '../grid.component';
import { Selection } from "./selection-default";
/**
 * A directive which stores the row selection state of the Grid in memory
 * ([see example]({% slug selection_grid %}#toc-during-data-operations)).
 */
export declare class SelectionDirective extends Selection implements OnInit, OnDestroy {
    protected grid: GridComponent;
    constructor(grid: GridComponent, cd: ChangeDetectorRef);
    /**
     * @hidden
     */
    ngOnInit(): void;
    /**
     * @hidden
     */
    ngOnDestroy(): void;
}
