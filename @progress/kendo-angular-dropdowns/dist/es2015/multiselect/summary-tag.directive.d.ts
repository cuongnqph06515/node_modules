/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { OnChanges } from '@angular/core';
import { MultiSelectComponent } from './multiselect.component';
/**
 * A directive which configures the MultiSelect to show one single summary tag for all selected data items.
 * When a number is provided, the summary tag is displayed after the given amount of data items are selected
 * ([more information and examples]({% slug summarytagmode_multiselect %})).
 *
 * @example
 * ```ts-no-run
 * <kendo-multiselect kendoMultiSelectSummaryTag [data]="data"></kendo-multiselect>
 * ```
 *
 * @example
 * ```ts-no-run
 * <kendo-multiselect [kendoMultiSelectSummaryTag]="2" [data]="data"></kendo-multiselect>
 * ```
 */
export declare class SummaryTagDirective implements OnChanges {
    private multiSelectComponent;
    /**
     * A numeric value that indicates the number of selected data items after which the summary tag will appear.
     */
    showAfter: number;
    constructor(multiSelectComponent: MultiSelectComponent);
    ngOnChanges(changes: any): void;
    private createTagMapper;
}
