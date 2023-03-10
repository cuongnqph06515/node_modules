/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var column_component_1 = require("../../columns/column.component");
var filter_service_1 = require("../filter.service");
/**
 * @hidden
 */
var NumericFilterMenuInputComponent = /** @class */ (function () {
    function NumericFilterMenuInputComponent() {
        this.operators = [];
        /**
         * Specifies the value which is used to increment or decrement the component value.
         * @type {numeric}
         */
        this.step = 1;
        /**
         * Specifies whether the **Up** and **Down** spin buttons will be rendered.
         * @type {boolean}
         */
        this.spinners = true;
    }
    NumericFilterMenuInputComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'kendo-treelist-numeric-filter-menu-input',
                    template: "\n        <kendo-treelist-filter-menu-input-wrapper\n            [column]=\"column\"\n            [filter]=\"filter\"\n            [operators]=\"operators\"\n            [defaultOperator]=\"operator\"\n            [currentFilter]=\"currentFilter\"\n            [filterService]=\"filterService\"\n            >\n            <kendo-numerictextbox\n                kendoFilterInput\n                [filterDelay]=\"0\"\n                [autoCorrect]=\"true\"\n                [value]=\"currentFilter?.value\"\n                [format]=\"format\"\n                [decimals]=\"decimals\"\n                [spinners]=\"spinners\"\n                [min]=\"min\"\n                [max]=\"max\"\n                [step]=\"step\">\n            </kendo-numerictextbox>\n        </kendo-treelist-filter-menu-input-wrapper>\n    "
                },] },
    ];
    NumericFilterMenuInputComponent.propDecorators = {
        operators: [{ type: core_1.Input }],
        column: [{ type: core_1.Input }],
        filter: [{ type: core_1.Input }],
        operator: [{ type: core_1.Input }],
        currentFilter: [{ type: core_1.Input }],
        filterService: [{ type: core_1.Input }],
        step: [{ type: core_1.Input }],
        min: [{ type: core_1.Input }],
        max: [{ type: core_1.Input }],
        spinners: [{ type: core_1.Input }],
        decimals: [{ type: core_1.Input }],
        format: [{ type: core_1.Input }]
    };
    return NumericFilterMenuInputComponent;
}());
exports.NumericFilterMenuInputComponent = NumericFilterMenuInputComponent;
