/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, forwardRef } from '@angular/core';
import { FilterOperatorBase } from './filter-operator.base';
import { LocalizationService } from '@progress/kendo-angular-l10n';
/*
 * Represents the `LessOrEqualTo` (**Is less than or equal to**) numeric filter operator.
 *
 * For more information and examples, refer to:
 * * [Setting the default filter operators]({% slug builtinfiltertemplate_treelist %}#toc-setting-the-default-filter-operator)
 * * [Setting the order of the filter operators]({% slug builtinfiltertemplate_treelist %}#toc-setting-the-order-of-the-filter-operators)
 */
export class LessOrEqualToFilterOperatorComponent extends FilterOperatorBase {
    constructor(localization) { super("lte", localization); }
}
LessOrEqualToFilterOperatorComponent.decorators = [
    { type: Component, args: [{
                providers: [
                    {
                        provide: FilterOperatorBase,
                        useExisting: forwardRef(() => LessOrEqualToFilterOperatorComponent)
                    }
                ],
                selector: 'kendo-filter-lte-operator',
                template: ``
            },] },
];
/** @nocollapse */
LessOrEqualToFilterOperatorComponent.ctorParameters = () => [
    { type: LocalizationService }
];
