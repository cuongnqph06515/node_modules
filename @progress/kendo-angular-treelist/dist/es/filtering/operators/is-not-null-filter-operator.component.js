/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { Component, forwardRef } from '@angular/core';
import { FilterOperatorBase } from './filter-operator.base';
import { LocalizationService } from '@progress/kendo-angular-l10n';
/**
 * Represents the `IsNotNull` (**Is not null**) filter operator.
 *
 * For more information and examples, refer to:
 * * [Setting the default filter operators]({% slug builtinfiltertemplate_treelist %}#toc-setting-the-default-filter-operator)
 * * [Setting the order of the filter operators]({% slug builtinfiltertemplate_treelist %}#toc-setting-the-order-of-the-filter-operators)
 */
var IsNotNullFilterOperatorComponent = /** @class */ (function (_super) {
    tslib_1.__extends(IsNotNullFilterOperatorComponent, _super);
    function IsNotNullFilterOperatorComponent(localization) {
        return _super.call(this, "isnotnull", localization) || this;
    }
    IsNotNullFilterOperatorComponent.decorators = [
        { type: Component, args: [{
                    providers: [
                        {
                            provide: FilterOperatorBase,
                            useExisting: forwardRef(function () { return IsNotNullFilterOperatorComponent; })
                        }
                    ],
                    selector: 'kendo-filter-isnotnull-operator',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    IsNotNullFilterOperatorComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    return IsNotNullFilterOperatorComponent;
}(FilterOperatorBase));
export { IsNotNullFilterOperatorComponent };
