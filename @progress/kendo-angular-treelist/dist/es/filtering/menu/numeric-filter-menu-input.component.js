/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input } from '@angular/core';
import { ColumnComponent } from "../../columns/column.component";
import { FilterService } from '../filter.service';
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
        { type: Component, args: [{
                    selector: 'kendo-treelist-numeric-filter-menu-input',
                    template: "\n        <kendo-treelist-filter-menu-input-wrapper\n            [column]=\"column\"\n            [filter]=\"filter\"\n            [operators]=\"operators\"\n            [defaultOperator]=\"operator\"\n            [currentFilter]=\"currentFilter\"\n            [filterService]=\"filterService\"\n            >\n            <kendo-numerictextbox\n                kendoFilterInput\n                [filterDelay]=\"0\"\n                [autoCorrect]=\"true\"\n                [value]=\"currentFilter?.value\"\n                [format]=\"format\"\n                [decimals]=\"decimals\"\n                [spinners]=\"spinners\"\n                [min]=\"min\"\n                [max]=\"max\"\n                [step]=\"step\">\n            </kendo-numerictextbox>\n        </kendo-treelist-filter-menu-input-wrapper>\n    "
                },] },
    ];
    NumericFilterMenuInputComponent.propDecorators = {
        operators: [{ type: Input }],
        column: [{ type: Input }],
        filter: [{ type: Input }],
        operator: [{ type: Input }],
        currentFilter: [{ type: Input }],
        filterService: [{ type: Input }],
        step: [{ type: Input }],
        min: [{ type: Input }],
        max: [{ type: Input }],
        spinners: [{ type: Input }],
        decimals: [{ type: Input }],
        format: [{ type: Input }]
    };
    return NumericFilterMenuInputComponent;
}());
export { NumericFilterMenuInputComponent };
