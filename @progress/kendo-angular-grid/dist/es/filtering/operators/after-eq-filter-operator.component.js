/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { Component, forwardRef } from '@angular/core';
import { FilterOperatorBase } from './filter-operator.base';
import { LocalizationService } from '@progress/kendo-angular-l10n';
/*
 * Represents the `GreaterOrEqualTo` (**Is after or equal to**) date filter operator.
 *
 * For more information and examples, refer to:
 * * [Setting the default filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-default-filter-operator)
 * * [Setting the order of the filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-order-of-the-filter-operators)
 */
var AfterEqFilterOperatorComponent = /** @class */ (function (_super) {
    tslib_1.__extends(AfterEqFilterOperatorComponent, _super);
    function AfterEqFilterOperatorComponent(localization) {
        return _super.call(this, "after-eq", localization) || this;
    }
    /**
     * @hidden
     */
    AfterEqFilterOperatorComponent.prototype.toJSON = function () {
        return {
            text: this.text,
            value: "gte"
        };
    };
    AfterEqFilterOperatorComponent.decorators = [
        { type: Component, args: [{
                    providers: [
                        {
                            provide: FilterOperatorBase,
                            useExisting: forwardRef(function () { return AfterEqFilterOperatorComponent; })
                        }
                    ],
                    selector: 'kendo-filter-after-eq-operator',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    AfterEqFilterOperatorComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    return AfterEqFilterOperatorComponent;
}(FilterOperatorBase));
export { AfterEqFilterOperatorComponent };
