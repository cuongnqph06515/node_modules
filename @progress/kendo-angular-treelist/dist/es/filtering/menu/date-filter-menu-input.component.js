/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input } from '@angular/core';
import { ColumnComponent } from "../../columns/column.component";
import { FilterService } from '../filter.service';
import { SinglePopupService } from '../../common/single-popup.service';
import { filter } from 'rxjs/operators';
/**
 * @hidden
 */
var DateFilterMenuInputComponent = /** @class */ (function () {
    function DateFilterMenuInputComponent(popupService) {
        this.popupService = popupService;
        this.operators = [];
    }
    DateFilterMenuInputComponent.prototype.open = function (picker) {
        this.subscription = this.popupService.onClose
            .pipe(filter(function () { return picker.isActive; }))
            .subscribe(function (e) { return e.preventDefault(); });
    };
    DateFilterMenuInputComponent.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    DateFilterMenuInputComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-treelist-date-filter-menu-input',
                    template: "\n        <kendo-treelist-filter-menu-input-wrapper\n            [column]=\"column\"\n            [filter]=\"filter\"\n            [operators]=\"operators\"\n            [defaultOperator]=\"operator\"\n            [currentFilter]=\"currentFilter\"\n            [filterService]=\"filterService\"\n            >\n            <kendo-datepicker\n                #picker\n                kendoFilterInput\n                [filterDelay]=\"0\"\n                (open)=\"open(picker)\"\n                [value]=\"currentFilter?.value\"\n                [placeholder]=\"placeholder\"\n                [formatPlaceholder]=\"formatPlaceholder\"\n                [format]=\"format\"\n                [min]=\"min\"\n                [max]=\"max\"\n                [activeView]=\"activeView\"\n                [bottomView]=\"bottomView\"\n                [topView]=\"topView\"\n                [weekNumber]=\"weekNumber\"\n                >\n            </kendo-datepicker>\n        </kendo-treelist-filter-menu-input-wrapper>\n    "
                },] },
    ];
    /** @nocollapse */
    DateFilterMenuInputComponent.ctorParameters = function () { return [
        { type: SinglePopupService }
    ]; };
    DateFilterMenuInputComponent.propDecorators = {
        operators: [{ type: Input }],
        column: [{ type: Input }],
        filter: [{ type: Input }],
        operator: [{ type: Input }],
        currentFilter: [{ type: Input }],
        filterService: [{ type: Input }],
        format: [{ type: Input }],
        formatPlaceholder: [{ type: Input }],
        placeholder: [{ type: Input }],
        min: [{ type: Input }],
        max: [{ type: Input }],
        activeView: [{ type: Input }],
        bottomView: [{ type: Input }],
        topView: [{ type: Input }],
        weekNumber: [{ type: Input }]
    };
    return DateFilterMenuInputComponent;
}());
export { DateFilterMenuInputComponent };
