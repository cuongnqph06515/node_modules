/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Renderer2, ElementRef, OnDestroy, AfterContentChecked, OnChanges, EventEmitter, NgZone } from '@angular/core';
import { SelectionService } from './selection.service';
import { SelectAllCheckboxState } from "./types";
/**
 * Represents the select-all checkbox feature of the Grid ([see example]({% slug selection_grid %}#toc-select-all-feature)).
 */
export declare class SelectAllCheckboxDirective implements AfterContentChecked, OnDestroy, OnChanges {
    private selectionService;
    private el;
    private renderer;
    private ngZone;
    /**
     * Explicitly overrides the state of the select-all checkbox.
     */
    state: SelectAllCheckboxState;
    /**
     * Fires when the user clicks the `kendoGridSelectAllCheckbox` select-all checkbox
     * ([see example]({% slug selection_grid %}#toc-select-all-feature)).
     */
    selectAllChange: EventEmitter<SelectAllCheckboxState>;
    type: string;
    private destroyClick;
    private stateSet;
    ngAfterContentChecked(): void;
    ngOnChanges(): void;
    constructor(selectionService: SelectionService, el: ElementRef, renderer: Renderer2, ngZone: NgZone);
    ngOnDestroy(): void;
    /**
     * @hidden
     */
    onClick(): void;
    /**
     * @hidden
     */
    private setState;
    /**
     * @hidden
     */
    private stateToBool;
}
