/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { Component, forwardRef } from '@angular/core';
import { FilterOperatorBase } from './filter-operator.base';
import { LocalizationService } from '@progress/kendo-angular-l10n';
/**
 * Represents the `IsNotEmpty` (**Is not empty**) filter operator.
 *
 * For more information and examples, refer to:
 * * [Setting the default filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-default-filter-operator)
 * * [Setting the order of the filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-order-of-the-filter-operators)
 */
var IsNotEmptyFilterOperatorComponent = /** @class */ (function (_super) {
    tslib_1.__extends(IsNotEmptyFilterOperatorComponent, _super);
    function IsNotEmptyFilterOperatorComponent(localization) {
        return _super.call(this, "isnotempty", localization) || this;
    }
    IsNotEmptyFilterOperatorComponent.decorators = [
        { type: Component, args: [{
                    providers: [
                        {
                            provide: FilterOperatorBase,
                            useExisting: forwardRef(function () { return IsNotEmptyFilterOperatorComponent; })
                        }
                    ],
                    selector: 'kendo-filter-isnotempty-operator',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    IsNotEmptyFilterOperatorComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    return IsNotEmptyFilterOperatorComponent;
}(FilterOperatorBase));
export { IsNotEmptyFilterOperatorComponent };
