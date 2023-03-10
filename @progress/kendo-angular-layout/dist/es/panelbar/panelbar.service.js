/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
/**
 * @hidden
 */
var nextPanelbarId = 0;
/**
 * @hidden
 */
var PanelBarService = /** @class */ (function () {
    function PanelBarService() {
        this.parentSource = new Subject();
        this.keepContentSource = new BehaviorSubject(false);
        this.childSource = new Subject();
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
        { type: Injectable },
    ];
    /** @nocollapse */
    PanelBarService.ctorParameters = function () { return []; };
    return PanelBarService;
}());
export { PanelBarService };
