/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./../utils");
var core_1 = require("@angular/core");
var selection_service_1 = require("./selection.service");
var utils_2 = require("../utils");
/**
 * Represents the select-all checkbox feature of the Grid ([see example]({% slug selection_grid %}#toc-select-all-feature)).
 */
var SelectAllCheckboxDirective = /** @class */ (function () {
    function SelectAllCheckboxDirective(selectionService, el, renderer, ngZone) {
        var _this = this;
        this.selectionService = selectionService;
        this.el = el;
        this.renderer = renderer;
        this.ngZone = ngZone;
        /**
         * Fires when the user clicks the `kendoGridSelectAllCheckbox` select-all checkbox
         * ([see example]({% slug selection_grid %}#toc-select-all-feature)).
         */
        this.selectAllChange = new core_1.EventEmitter();
        this.type = "checkbox";
        this.stateSet = false;
        this.ngZone.runOutsideAngular(function () {
            _this.destroyClick = _this.renderer.listen(_this.el.nativeElement, "click", _this.onClick.bind(_this));
        });
    }
    SelectAllCheckboxDirective.prototype.ngAfterContentChecked = function () {
        this.setState();
    };
    SelectAllCheckboxDirective.prototype.ngOnChanges = function () {
        this.stateSet = true;
    };
    SelectAllCheckboxDirective.prototype.ngOnDestroy = function () {
        if (this.destroyClick) {
            this.destroyClick();
        }
    };
    /**
     * @hidden
     */
    SelectAllCheckboxDirective.prototype.onClick = function () {
        var _this = this;
        // yields consistent cross-browser behavior when clicking an "indeterminate" checkbox
        var undefinedCheckedStateInIE = utils_1.detectIE() && this.selectionService.selectAllState === undefined;
        var isChecked = undefinedCheckedStateInIE ? true : this.el.nativeElement.checked;
        var options = this.selectionService.options;
        this.selectAllChange.emit(isChecked ? "checked" : "unchecked");
        if (options.enabled && options.mode === "multiple") {
            this.ngZone.run(function () {
                _this.selectionService.updateAll(isChecked);
            });
        }
    };
    /**
     * @hidden
     */
    SelectAllCheckboxDirective.prototype.setState = function () {
        var state = this.stateSet ? this.stateToBool() : this.selectionService.selectAllState;
        var elem = this.el.nativeElement;
        this.renderer.setProperty(elem, "indeterminate", !utils_2.isPresent(state));
        this.renderer.setProperty(elem, "checked", utils_2.isPresent(state) ? state : false);
    };
    /**
     * @hidden
     */
    SelectAllCheckboxDirective.prototype.stateToBool = function () {
        switch (this.state) {
            case "checked":
                return true;
            case "unchecked":
                return false;
            default:
                return undefined;
        }
    };
    SelectAllCheckboxDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[kendoGridSelectAllCheckbox]'
                },] },
    ];
    /** @nocollapse */
    SelectAllCheckboxDirective.ctorParameters = function () { return [
        { type: selection_service_1.SelectionService },
        { type: core_1.ElementRef },
        { type: core_1.Renderer2 },
        { type: core_1.NgZone }
    ]; };
    SelectAllCheckboxDirective.propDecorators = {
        state: [{ type: core_1.Input }],
        selectAllChange: [{ type: core_1.Output }],
        type: [{ type: core_1.HostBinding, args: ['attr.type',] }]
    };
    return SelectAllCheckboxDirective;
}());
exports.SelectAllCheckboxDirective = SelectAllCheckboxDirective;
