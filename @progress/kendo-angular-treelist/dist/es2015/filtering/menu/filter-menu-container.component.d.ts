/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { OnInit, EventEmitter, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CompositeFilterDescriptor } from "@progress/kendo-data-query";
import { ColumnComponent } from "../../columns/column.component";
import { FilterService } from "../filter.service";
import { LocalizationService } from '@progress/kendo-angular-l10n';
/**
 * @hidden
 */
export declare class FilterMenuContainerComponent implements OnInit, OnDestroy {
    protected parentService: FilterService;
    childService: FilterService;
    protected localization: LocalizationService;
    protected cd: ChangeDetectorRef;
    close: EventEmitter<any>;
    /**
     * The column with which the filter is associated.
     * @type {ColumnComponent}
     */
    column: ColumnComponent;
    /**
    * The current root filter.
    * @type {CompositeFilterDescriptor}
    */
    filter: CompositeFilterDescriptor;
    /**
     * @hidden
     */
    actionsClass: string;
    readonly childFilter: CompositeFilterDescriptor;
    private _childFilter;
    private subscription;
    private _templateContext;
    private _filter;
    constructor(parentService: FilterService, childService: FilterService, localization: LocalizationService, cd: ChangeDetectorRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    readonly disabled: boolean;
    readonly templateContext: any;
    readonly hasTemplate: boolean;
    submit(): boolean;
    reset(): void;
    readonly clearText: string;
    readonly filterText: string;
}
