/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, ElementRef, Input, Renderer2, NgZone } from '@angular/core';
/* tslint:disable:no-input-rename */
/**
 * @hidden
 */
var EventsOutsideAngularDirective = /** @class */ (function () {
    function EventsOutsideAngularDirective(element, ngZone, renderer) {
        this.element = element;
        this.ngZone = ngZone;
        this.renderer = renderer;
        this.events = {};
    }
    EventsOutsideAngularDirective.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.element || !this.element.nativeElement) {
            return;
        }
        var events = this.events;
        this.subscriptions = [];
        this.ngZone.runOutsideAngular(function () {
            for (var name_1 in events) {
                if (events.hasOwnProperty(name_1)) {
                    _this.subscriptions.push(_this.renderer.listen(_this.element.nativeElement, name_1, _this.scope ? events[name_1].bind(_this.scope) : events[name_1]));
                }
            }
        });
    };
    EventsOutsideAngularDirective.prototype.ngOnDestroy = function () {
        if (this.subscriptions) {
            for (var idx = 0; idx < this.subscriptions.length; idx++) {
                this.subscriptions[idx]();
            }
            this.subscriptions = null;
        }
    };
    EventsOutsideAngularDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoEventsOutsideAngular]'
                },] },
    ];
    /** @nocollapse */
    EventsOutsideAngularDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgZone },
        { type: Renderer2 }
    ]; };
    EventsOutsideAngularDirective.propDecorators = {
        events: [{ type: Input, args: ['kendoEventsOutsideAngular',] }],
        scope: [{ type: Input }]
    };
    return EventsOutsideAngularDirective;
}());
export { EventsOutsideAngularDirective };
