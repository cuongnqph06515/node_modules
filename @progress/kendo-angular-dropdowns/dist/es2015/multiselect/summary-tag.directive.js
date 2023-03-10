/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, Input } from '@angular/core';
import { isPresent } from '../common/util';
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
export class SummaryTagDirective {
    constructor(multiSelectComponent) {
        this.multiSelectComponent = multiSelectComponent;
        /**
         * A numeric value that indicates the number of selected data items after which the summary tag will appear.
         */
        this.showAfter = 0; // tslint:disable-line:no-input-rename
        this.createTagMapper();
    }
    ngOnChanges(changes) {
        if (isPresent(changes.showAfter)) {
            this.createTagMapper();
            this.multiSelectComponent.onTagMapperChange();
        }
    }
    createTagMapper() {
        this.multiSelectComponent.tagMapper = (tags) => {
            if (tags.length > this.showAfter) {
                let result;
                result = tags.slice(0, this.showAfter);
                result.push(tags.slice(this.showAfter, tags.length));
                return result;
            }
            else {
                return tags;
            }
        };
    }
}
SummaryTagDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoMultiSelectSummaryTag]'
            },] },
];
/** @nocollapse */
SummaryTagDirective.ctorParameters = () => [
    { type: MultiSelectComponent }
];
SummaryTagDirective.propDecorators = {
    showAfter: [{ type: Input, args: ['kendoMultiSelectSummaryTag',] }]
};
