/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var filter_operator_base_1 = require("./filter-operator.base");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
/**
 * Represents the `Equal` (**Is equal to**) filter operator.
 *
 * For more information and examples, refer to:
 * * [Setting the default filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-default-filter-operator)
 * * [Setting the order of the filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-order-of-the-filter-operators)
 */
var EqualFilterOperatorComponent = /** @class */ (function (_super) {
    tslib_1.__extends(EqualFilterOperatorComponent, _super);
    function EqualFilterOperatorComponent(localization) {
        return _super.call(this, "eq", localization) || this;
    }
    EqualFilterOperatorComponent.decorators = [
        { type: core_1.Component, args: [{
                    providers: [
                        {
                            provide: filter_operator_base_1.FilterOperatorBase,
                            useExisting: core_1.forwardRef(function () { return EqualFilterOperatorComponent; })
                        }
                    ],
                    selector: 'kendo-filter-eq-operator',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    EqualFilterOperatorComponent.ctorParameters = function () { return [
        { type: kendo_angular_l10n_1.LocalizationService }
    ]; };
    return EqualFilterOperatorComponent;
}(filter_operator_base_1.FilterOperatorBase));
exports.EqualFilterOperatorComponent = EqualFilterOperatorComponent;
