/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, ElementRef, EventEmitter, Inject, Input, NgZone, Renderer2, Self } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { debounceTime, filter } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { isChanged } from '../utils';
/**
 * @hidden
 */
export class FilterInputDirective {
    constructor(valueAccessors, ngZone, element, renderer) {
        this.change = new EventEmitter();
        this.composing = false;
        this.filterDelay = 500;
        this.changeRequests = new Subject();
        this.accessor = valueAccessors[0];
        ngZone.runOutsideAngular(() => {
            const unsubscribeStart = renderer.listen(element.nativeElement, 'compositionstart', () => this.composing = true);
            const unsubscribeEnd = renderer.listen(element.nativeElement, 'compositionend', () => this.composing = false);
            this.unsubscribeEvents = () => {
                unsubscribeStart();
                unsubscribeEnd();
            };
        });
    }
    set value(value) {
        this.accessor.writeValue(value);
    }
    set disabled(value) {
        this.accessor.setDisabledState(value);
    }
    ngOnInit() {
        this.accessor.registerOnChange(x => this.filterDelay > 0 ?
            this.changeRequests.next(x) :
            this.change.emit(x));
        this.subscribeChanges();
    }
    ngOnChanges(changes) {
        if (isChanged('filterDelay', changes)) {
            this.unsubscribeChanges();
            this.subscribeChanges();
        }
    }
    ngOnDestroy() {
        this.unsubscribeChanges();
        this.unsubscribeEvents();
    }
    subscribeChanges() {
        this.changeRequestsSubscription = this.changeRequests
            .pipe(debounceTime(this.filterDelay), filter(() => !this.composing))
            .subscribe(x => this.change.emit(x));
    }
    unsubscribeChanges() {
        if (this.changeRequestsSubscription) {
            this.changeRequestsSubscription.unsubscribe();
        }
    }
}
FilterInputDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoFilterInput]'
            },] },
];
/** @nocollapse */
FilterInputDirective.ctorParameters = () => [
    { type: Array, decorators: [{ type: Self }, { type: Inject, args: [NG_VALUE_ACCESSOR,] }] },
    { type: NgZone },
    { type: ElementRef },
    { type: Renderer2 }
];
FilterInputDirective.propDecorators = {
    filterDelay: [{ type: Input }],
    value: [{ type: Input }]
};
