/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, forwardRef } from '@angular/core';
import { FilterOperatorBase } from './filter-operator.base';
import { LocalizationService } from '@progress/kendo-angular-l10n';
/**
 * Represents the `IsNull` (**Is null**) filter operator.
 *
 * For more information and examples, refer to:
 * * [Setting the default filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-default-filter-operator)
 * * [Setting the order of the filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-order-of-the-filter-operators)
 */
export class IsNullFilterOperatorComponent extends FilterOperatorBase {
    constructor(localization) { super("isnull", localization); }
}
IsNullFilterOperatorComponent.decorators = [
    { type: Component, args: [{
                providers: [
                    {
                        provide: FilterOperatorBase,
                        useExisting: forwardRef(() => IsNullFilterOperatorComponent)
                    }
                ],
                selector: 'kendo-filter-isnull-operator',
                template: ``
            },] },
];
/** @nocollapse */
IsNullFilterOperatorComponent.ctorParameters = () => [
    { type: LocalizationService }
];
