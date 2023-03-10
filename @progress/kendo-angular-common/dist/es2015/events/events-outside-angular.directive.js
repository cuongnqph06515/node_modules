/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, ElementRef, Input, Renderer2, NgZone } from '@angular/core';
/* tslint:disable:no-input-rename */
/**
 * @hidden
 */
export class EventsOutsideAngularDirective {
    constructor(element, ngZone, renderer) {
        this.element = element;
        this.ngZone = ngZone;
        this.renderer = renderer;
        this.events = {};
    }
    ngOnInit() {
        if (!this.element || !this.element.nativeElement) {
            return;
        }
        const events = this.events;
        this.subscriptions = [];
        this.ngZone.runOutsideAngular(() => {
            for (let name in events) {
                if (events.hasOwnProperty(name)) {
                    this.subscriptions.push(this.renderer.listen(this.element.nativeElement, name, this.scope ? events[name].bind(this.scope) : events[name]));
                }
            }
        });
    }
    ngOnDestroy() {
        if (this.subscriptions) {
            for (let idx = 0; idx < this.subscriptions.length; idx++) {
                this.subscriptions[idx]();
            }
            this.subscriptions = null;
        }
    }
}
EventsOutsideAngularDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoEventsOutsideAngular]'
            },] },
];
/** @nocollapse */
EventsOutsideAngularDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone },
    { type: Renderer2 }
];
EventsOutsideAngularDirective.propDecorators = {
    events: [{ type: Input, args: ['kendoEventsOutsideAngular',] }],
    scope: [{ type: Input }]
};
