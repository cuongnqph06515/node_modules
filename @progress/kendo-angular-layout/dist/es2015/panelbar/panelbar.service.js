/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
/**
 * @hidden
 */
let nextPanelbarId = 0;
/**
 * @hidden
 */
export class PanelBarService {
    constructor() {
        this.parentSource = new Subject();
        this.keepContentSource = new BehaviorSubject(false);
        this.childSource = new Subject();
        this.parent$ = this.parentSource.asObservable();
        this.children$ = this.childSource.asObservable();
        this.keepContent$ = this.keepContentSource.asObservable();
        this.pbId = nextPanelbarId++;
    }
    onKeepContent(keepContent) {
        this.keepContentSource.next(keepContent);
    }
    onSelect(event) {
        this.childSource.next(event);
    }
    onFocus() {
        this.parentSource.next(true);
    }
    onBlur() {
        this.parentSource.next(false);
    }
}
PanelBarService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
PanelBarService.ctorParameters = () => [];
