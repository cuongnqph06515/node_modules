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
/*
 * Represents the `GreaterOrEqualTo` (**Is after or equal to**) date filter operator.
 *
 * For more information and examples, refer to:
 * * [Setting the default filter operators]({% slug builtinfiltertemplate_treelist %}#toc-setting-the-default-filter-operator)
 * * [Setting the order of the filter operators]({% slug builtinfiltertemplate_treelist %}#toc-setting-the-order-of-the-filter-operators)
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
        { type: core_1.Component, args: [{
                    providers: [
                        {
                            provide: filter_operator_base_1.FilterOperatorBase,
                            useExisting: core_1.forwardRef(function () { return AfterEqFilterOperatorComponent; })
                        }
                    ],
                    selector: 'kendo-filter-after-eq-operator',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    AfterEqFilterOperatorComponent.ctorParameters = function () { return [
        { type: kendo_angular_l10n_1.LocalizationService }
    ]; };
    return AfterEqFilterOperatorComponent;
}(filter_operator_base_1.FilterOperatorBase));
exports.AfterEqFilterOperatorComponent = AfterEqFilterOperatorComponent;
