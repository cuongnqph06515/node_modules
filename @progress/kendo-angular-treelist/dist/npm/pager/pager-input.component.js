/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var kendo_angular_inputs_1 = require("@progress/kendo-angular-inputs");
var core_1 = require("@angular/core");
var pager_element_component_1 = require("./pager-element.component");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var pager_context_service_1 = require("./pager-context.service");
var kendo_angular_common_1 = require("@progress/kendo-angular-common");
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
            if (event.keyCode === kendo_angular_common_1.Keys.Enter) {
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
        { type: core_1.Component, args: [{
                    selector: 'kendo-pager-input',
                    template: "\n     <span [ngClass]=\"{'k-pager-input': true, 'k-label': true}\">\n        {{textFor('pagerPage')}}\n        <kendo-numerictextbox\n            [style.margin]=\"'0 1ex'\"\n            [style.width]=\"'3em'\"\n            [spinners]=\"false\"\n            [decimals]=\"0\"\n            format=\"n0\"\n            [disabled]=\"!hasPages\"\n            [value]=\"current\"\n            [min]=\"hasPages ? 1 : 0\"\n            [max]=\"totalPages\"\n            [autoCorrect]=\"true\"\n            [kendoEventsOutsideAngular]=\"{\n                keydown: handleKeyDown,\n                focusout: handleBlur\n            }\"></kendo-numerictextbox>\n        {{textFor('pagerOf')}} {{totalPages}}\n     </span>\n    "
                },] },
    ];
    /** @nocollapse */
    PagerInputComponent.ctorParameters = function () { return [
        { type: kendo_angular_l10n_1.LocalizationService },
        { type: pager_context_service_1.PagerContextService },
        { type: core_1.NgZone },
        { type: core_1.ChangeDetectorRef }
    ]; };
    PagerInputComponent.propDecorators = {
        numericInput: [{ type: core_1.ViewChild, args: [kendo_angular_inputs_1.NumericTextBoxComponent,] }]
    };
    return PagerInputComponent;
}(pager_element_component_1.PagerElementComponent));
exports.PagerInputComponent = PagerInputComponent;
