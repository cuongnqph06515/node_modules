/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { NumericTextBoxComponent } from '@progress/kendo-angular-inputs';
// tslint:disable:no-access-missing-member
import { Component, ChangeDetectorRef, ViewChild, NgZone } from '@angular/core';
import { PagerElementComponent } from './pager-element.component';
import { LocalizationService } from "@progress/kendo-angular-l10n";
import { PagerContextService } from "./pager-context.service";
import { Keys } from '@progress/kendo-angular-common';
/**
 * Displays an input element which allows the typing and rendering of page numbers.
 */
var PagerInputComponent = /** @class */ (function (_super) {
    tslib_1.__extends(PagerInputComponent, _super);
    function PagerInputComponent(localization, pagerContext, zone, cd) {
        var _this = _super.call(this, localization, pagerContext, cd) || this;
        _this.pagerContext = pagerContext;
        _this.zone = zone;
        /**
         * @hidden
         *
         * @param {string} value
         *
         * @memberOf PagerInputComponent
         */
        _this.handleKeyDown = function (event) {
            var incomingValue = _this.numericInput.value || _this.current;
            if (event.keyCode === Keys.Enter) {
                event.preventDefault();
                if (incomingValue !== _this.current) {
                    _this.zone.run(function () {
                        _this.changePage(incomingValue - 1);
                    });
                }
            }
        };
        /**
         * @hidden
         *
         * @param {string} value
         *
         * @memberOf PagerInputComponent
         */
        _this.handleBlur = function () {
            var inputValue = _this.numericInput.value;
            if (!inputValue) {
                _this.numericInput.writeValue(_this.current);
                return;
            }
            if (inputValue !== _this.current) {
                _this.zone.run(function () {
                    _this.changePage(inputValue - 1);
                });
            }
        };
        return _this;
    }
    Object.defineProperty(PagerInputComponent.prototype, "current", {
        /**
         * @hidden
         */
        get: function () {
            return this.hasPages ? this.currentPage : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PagerInputComponent.prototype, "hasPages", {
        get: function () {
            return this.totalPages !== 0;
        },
        enumerable: true,
        configurable: true
    });
    PagerInputComponent.prototype.onChanges = function (_a) {
        var total = _a.total, skip = _a.skip, pageSize = _a.pageSize;
        this.total = total;
        this.skip = skip;
        this.pageSize = pageSize;
        this.cd.markForCheck();
    };
    PagerInputComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-pager-input',
                    template: "\n     <span [ngClass]=\"{'k-pager-input': true, 'k-label': true}\">\n        {{textFor('pagerPage')}}\n        <kendo-numerictextbox\n            [style.margin]=\"'0 1ex'\"\n            [style.width]=\"'3em'\"\n            [spinners]=\"false\"\n            [decimals]=\"0\"\n            format=\"n0\"\n            [disabled]=\"!hasPages\"\n            [value]=\"current\"\n            [min]=\"hasPages ? 1 : 0\"\n            [max]=\"totalPages\"\n            [autoCorrect]=\"true\"\n            [kendoEventsOutsideAngular]=\"{\n                keydown: handleKeyDown,\n                focusout: handleBlur\n            }\"></kendo-numerictextbox>\n        {{textFor('pagerOf')}} {{totalPages}}\n     </span>\n    "
                },] },
    ];
    /** @nocollapse */
    PagerInputComponent.ctorParameters = function () { return [
        { type: LocalizationService },
        { type: PagerContextService },
        { type: NgZone },
        { type: ChangeDetectorRef }
    ]; };
    PagerInputComponent.propDecorators = {
        numericInput: [{ type: ViewChild, args: [NumericTextBoxComponent,] }]
    };
    return PagerInputComponent;
}(PagerElementComponent));
export { PagerInputComponent };
