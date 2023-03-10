/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
/**
 * @hidden
 */
var nextPanelbarId = 0;
/**
 * @hidden
 */
var PanelBarService = /** @class */ (function () {
    function PanelBarService() {
        this.parentSource = new rxjs_1.Subject();
        this.keepContentSource = new rxjs_1.BehaviorSubject(false);
        this.childSource = new rxjs_1.Subject();
        this.parent$ = this.parentSource.asObservable();
        this.children$ = this.childSource.asObservable();
        this.keepContent$ = this.keepContentSource.asObservable();
        this.pbId = nextPanelbarId++;
    }
    PanelBarService.prototype.onKeepContent = function (keepContent) {
        this.keepContentSource.next(keepContent);
    };
    PanelBarService.prototype.onSelect = function (event) {
        this.childSource.next(event);
    };
    PanelBarService.prototype.onFocus = function () {
        this.parentSource.next(true);
    };
    PanelBarService.prototype.onBlur = function () {
        this.parentSource.next(false);
    };
    PanelBarService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    PanelBarService.ctorParameters = function () { return []; };
    return PanelBarService;
}());
exports.PanelBarService = PanelBarService;
