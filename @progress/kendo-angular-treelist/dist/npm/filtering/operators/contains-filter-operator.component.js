/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var filter_operator_base_1 = require("./filter-operator.base");
/**
 * Represents the `Contains` (**Contains**) filter operator.
 *
 * For more information and examples, refer to:
 * * [Setting the default filter operators]({% slug builtinfiltertemplate_treelist %}#toc-setting-the-default-filter-operator)
 * * [Setting the order of the filter operators]({% slug builtinfiltertemplate_treelist %}#toc-setting-the-order-of-the-filter-operators)
 */
var ContainsFilterOperatorComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ContainsFilterOperatorComponent, _super);
    function ContainsFilterOperatorComponent(localization) {
        return _super.call(this, "contains", localization) || this;
    }
    ContainsFilterOperatorComponent.decorators = [
        { type: core_1.Component, args: [{
                    providers: [
                        {
                            provide: filter_operator_base_1.FilterOperatorBase,
                            useExisting: core_1.forwardRef(function () { return ContainsFilterOperatorComponent; })
                        }
                    ],
                    selector: 'kendo-filter-contains-operator',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    ContainsFilterOperatorComponent.ctorParameters = function () { return [
        { type: kendo_angular_l10n_1.LocalizationService }
    ]; };
    return ContainsFilterOperatorComponent;
}(filter_operator_base_1.FilterOperatorBase));
exports.ContainsFilterOperatorComponent = ContainsFilterOperatorComponent;
