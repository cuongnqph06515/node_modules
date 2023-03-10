/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var filter_service_1 = require("../filter.service");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var string_filter_component_1 = require("../string-filter.component");
/**
 * Represents a string-filter cell component
 * ([see example]({% slug builtinfiltertemplate_treelist %}#toc-configuration-components-for-filter-templates)).
 *
 * @example
 *
 *  ```html-no-run
 *      <kendo-treelist-column field="ProductName" title="Product Name">
 *          <ng-template kendoTreeListFilterCellTemplate let-filter let-column="column">
 *          <kendo-treelist-string-filter-cell
 *              [showOperators]="false"
 *              [column]="column"
 *              [filter]="filter">
 *          </kendo-treelist-string-filter-cell>
 *          </ng-template>
 *      </kendo-treelist-column>
 *   ```
 */
var StringFilterCellComponent = /** @class */ (function (_super) {
    tslib_1.__extends(StringFilterCellComponent, _super);
    function StringFilterCellComponent(filterService, localization) {
        var _this = _super.call(this, filterService, localization) || this;
        /**
         * Determines the delay time (in milliseconds) before the filter value is submitted.
         * A value of `0` indicates no delay. The default value is `500`.
         * @type {boolean}
         */
        _this.filterDelay = 500;
        /**
         * Determines if the drop-down filter operators will be displayed.
         * The default value is `true`.
         * @type {boolean}
         */
        _this.showOperators = true;
        return _this;
    }
    StringFilterCellComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'kendo-treelist-string-filter-cell',
                    template: "\n        <kendo-treelist-filter-wrapper-cell\n            [column]=\"column\"\n            [filter]=\"filter\"\n            [operators]=\"operators\"\n            [defaultOperator]=\"operator\"\n            [showOperators]=\"showOperators\">\n            <input\n                class=\"k-textbox\"\n                kendoTreeListFocusable\n                kendoFilterInput\n                [filterDelay]=\"filterDelay\"\n                [ngModel]=\"currentFilter?.value\" />\n        </kendo-treelist-filter-wrapper-cell>\n    "
                },] },
    ];
    /** @nocollapse */
    StringFilterCellComponent.ctorParameters = function () { return [
        { type: filter_service_1.FilterService },
        { type: kendo_angular_l10n_1.LocalizationService }
    ]; };
    StringFilterCellComponent.propDecorators = {
        filterDelay: [{ type: core_1.Input }],
        showOperators: [{ type: core_1.Input }]
    };
    return StringFilterCellComponent;
}(string_filter_component_1.StringFilterComponent));
exports.StringFilterCellComponent = StringFilterCellComponent;
