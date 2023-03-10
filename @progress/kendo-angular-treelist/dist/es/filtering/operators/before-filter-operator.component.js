/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { Component, forwardRef } from '@angular/core';
import { FilterOperatorBase } from './filter-operator.base';
import { LocalizationService } from '@progress/kendo-angular-l10n';
/*
 * Represents the `Less then` (**Is before**) date filter operator.
 *
 * For more information and examples, refer to:
 * * [Setting the default filter operators]({% slug builtinfiltertemplate_treelist %}#toc-setting-the-default-filter-operator)
 * * [Setting the order of the filter operators]({% slug builtinfiltertemplate_treelist %}#toc-setting-the-order-of-the-filter-operators)
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
        { type: Component, args: [{
                    providers: [
                        {
                            provide: FilterOperatorBase,
                            useExisting: forwardRef(function () { return BeforeFilterOperatorComponent; })
                        }
                    ],
                    selector: 'kendo-filter-before-operator',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    BeforeFilterOperatorComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    return BeforeFilterOperatorComponent;
}(FilterOperatorBase));
export { BeforeFilterOperatorComponent };
