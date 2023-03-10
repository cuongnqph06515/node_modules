/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, Input, HostBinding, ElementRef } from '@angular/core';
import { FocusService } from './focus.service';
import { isDocumentAvailable } from '@progress/kendo-angular-common';
/**
 * @hidden
 */
export class FocusableDirective {
    constructor(focusService, elementRef) {
        this.focusService = focusService;
        this.element = elementRef.nativeElement;
        this.subscribeEvents();
    }
    get focusedClassName() {
        return this.focusService.isFocused(this.index);
    }
    /**
     * @hidden
     */
    ngOnDestroy() {
        this.unsubscribeEvents();
    }
    subscribeEvents() {
        if (!isDocumentAvailable()) {
            return;
        }
        this.focusSubscription = this.focusService.onFocus.subscribe((index) => {
            if (this.index === index) {
                this.element.focus();
            }
        });
    }
    unsubscribeEvents() {
        if (!isDocumentAvailable()) {
            return;
        }
        if (this.focusSubscription) {
            this.focusSubscription.unsubscribe();
        }
    }
}
FocusableDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoButtonFocusable]'
            },] },
];
/** @nocollapse */
FocusableDirective.ctorParameters = () => [
    { type: FocusService },
    { type: ElementRef }
];
FocusableDirective.propDecorators = {
    index: [{ type: Input }],
    focusedClassName: [{ type: HostBinding, args: ['class.k-state-focused',] }]
};
