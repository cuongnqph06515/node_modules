/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { Component, forwardRef } from '@angular/core';
import { FilterOperatorBase } from './filter-operator.base';
import { LocalizationService } from '@progress/kendo-angular-l10n';
/*
 * Represents the `Greater` (**Is greater than**) numeric filter operator.
 *
 * For more information and examples, refer to:
 * * [Setting the default filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-default-filter-operator)
 * * [Setting the order of the filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-order-of-the-filter-operators)
 */
var GreaterFilterOperatorComponent = /** @class */ (function (_super) {
    tslib_1.__extends(GreaterFilterOperatorComponent, _super);
    function GreaterFilterOperatorComponent(localization) {
        return _super.call(this, "gt", localization) || this;
    }
    GreaterFilterOperatorComponent.decorators = [
        { type: Component, args: [{
                    providers: [
                        {
                            provide: FilterOperatorBase,
                            useExisting: forwardRef(function () { return GreaterFilterOperatorComponent; })
                        }
                    ],
                    selector: 'kendo-filter-gt-operator',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    GreaterFilterOperatorComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    return GreaterFilterOperatorComponent;
}(FilterOperatorBase));
export { GreaterFilterOperatorComponent };
