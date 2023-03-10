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
 * Represents the `Less then` (**Is before**) date filter operator.
 *
 * For more information and examples, refer to:
 * * [Setting the default filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-default-filter-operator)
 * * [Setting the order of the filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-order-of-the-filter-operators)
 */
var BeforeFilterOperatorComponent = /** @class */ (function (_super) {
    tslib_1.__extends(BeforeFilterOperatorComponent, _super);
    function BeforeFilterOperatorComponent(localization) {
        return _super.call(this, "before", localization) || this;
    }
    /**
     * @hidden
     */
    BeforeFilterOperatorComponent.prototype.toJSON = function () {
        return {
            text: this.text,
            value: "lt"
        };
    };
    BeforeFilterOperatorComponent.decorators = [
        { type: core_1.Component, args: [{
                    providers: [
                        {
                            provide: filter_operator_base_1.FilterOperatorBase,
                            useExisting: core_1.forwardRef(function () { return BeforeFilterOperatorComponent; })
                        }
                    ],
                    selector: 'kendo-filter-before-operator',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    BeforeFilterOperatorComponent.ctorParameters = function () { return [
        { type: kendo_angular_l10n_1.LocalizationService }
    ]; };
    return BeforeFilterOperatorComponent;
}(filter_operator_base_1.FilterOperatorBase));
exports.BeforeFilterOperatorComponent = BeforeFilterOperatorComponent;
