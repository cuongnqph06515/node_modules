/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
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
var IsNullFilterOperatorComponent = /** @class */ (function (_super) {
    tslib_1.__extends(IsNullFilterOperatorComponent, _super);
    function IsNullFilterOperatorComponent(localization) {
        return _super.call(this, "isnull", localization) || this;
    }
    IsNullFilterOperatorComponent.decorators = [
        { type: Component, args: [{
                    providers: [
                        {
                            provide: FilterOperatorBase,
                            useExisting: forwardRef(function () { return IsNullFilterOperatorComponent; })
                        }
                    ],
                    selector: 'kendo-filter-isnull-operator',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    IsNullFilterOperatorComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    return IsNullFilterOperatorComponent;
}(FilterOperatorBase));
export { IsNullFilterOperatorComponent };
