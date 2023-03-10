/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, forwardRef } from '@angular/core';
import { FilterOperatorBase } from './filter-operator.base';
import { LocalizationService } from '@progress/kendo-angular-l10n';
/*
 * Represents the `GreaterOrEqualTo` (**Is after or equal to**) date filter operator.
 *
 * For more information and examples, refer to:
 * * [Setting the default filter operators]({% slug builtinfiltertemplate_treelist %}#toc-setting-the-default-filter-operator)
 * * [Setting the order of the filter operators]({% slug builtinfiltertemplate_treelist %}#toc-setting-the-order-of-the-filter-operators)
 */
export class AfterEqFilterOperatorComponent extends FilterOperatorBase {
    constructor(localization) { super("after-eq", localization); }
    /**
     * @hidden
     */
    toJSON() {
        return {
            text: this.text,
            value: "gte"
        };
    }
}
AfterEqFilterOperatorComponent.decorators = [
    { type: Component, args: [{
                providers: [
                    {
                        provide: FilterOperatorBase,
                        useExisting: forwardRef(() => AfterEqFilterOperatorComponent)
                    }
                ],
                selector: 'kendo-filter-after-eq-operator',
                template: ``
            },] },
];
/** @nocollapse */
AfterEqFilterOperatorComponent.ctorParameters = () => [
    { type: LocalizationService }
];
