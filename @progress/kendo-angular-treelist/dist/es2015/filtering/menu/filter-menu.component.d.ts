/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { FilterService } from "../filter.service";
import { CompositeFilterDescriptor } from "@progress/kendo-data-query";
import { ColumnComponent } from '../../columns/column.component';
import { SinglePopupService } from '../../common/single-popup.service';
import { LocalizationService } from "@progress/kendo-angular-l10n";
/**
 * @hidden
 */
export declare class FilterMenuComponent {
    protected filterService: FilterService;
    protected popupService: SinglePopupService;
    protected localization: LocalizationService;
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
    filterLabel: string;
    private popupRef;
    constructor(filterService: FilterService, popupService: SinglePopupService, localization: LocalizationService);
    readonly hasFilters: boolean;
    toggle(anchor: any, template: any): boolean;
    close(): void;
}
