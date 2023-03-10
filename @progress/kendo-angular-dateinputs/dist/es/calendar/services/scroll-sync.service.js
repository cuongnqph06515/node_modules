/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable, NgZone } from '@angular/core';
import { CalendarDOMService } from './dom.service';
var divideByMagnitude = function (magnitude) { return function (x) { return Math.floor(x / magnitude); }; };
var ɵ0 = divideByMagnitude;
var powerByMagnitude = function (magnitude) { return function (x) { return x * magnitude; }; };
var ɵ1 = powerByMagnitude;
/**
 * @hidden
 */
var ScrollSyncService = /** @class */ (function () {
    function ScrollSyncService(dom, zone) {
        this.dom = dom;
        this.zone = zone;
    }
    ScrollSyncService.prototype.configure = function (activeView) {
        var magnitude = Math.max(this.dom.viewHeight(activeView) / this.dom.navigationItemHeight, 1);
        this.divideByMagnitude = divideByMagnitude(magnitude);
        this.powerByMagnitude = powerByMagnitude(magnitude);
    };
    ScrollSyncService.prototype.sync = function (navigator, view) {
        var _this = this;
        this.unsubscribe();
        if (!navigator || !view) {
            return;
        }
        this.navigator = navigator;
        this.view = view;
        this.zone.runOutsideAngular(function () {
            var navScrolled, monthScrolled;
            _this.navSubscription = navigator.scroll$()
                .subscribe(function (e) {
                if (monthScrolled) {
                    monthScrolled = false;
                    return;
                }
                navScrolled = true;
                _this.scrollSiblingOf(e.target);
            });
            _this.viewSubscription = view.scroll$()
                .subscribe(function (e) {
                if (navScrolled) {
                    navScrolled = false;
                    return;
                }
                monthScrolled = true;
                _this.scrollSiblingOf(e.target);
            });
        });
    };
    ScrollSyncService.prototype.scrollSiblingOf = function (scrolledElement) {
        var component = this.siblingComponent(scrolledElement);
        var scrollTop = this.calculateScroll(component, scrolledElement.scrollTop);
        component.scrollTo(scrollTop);
    };
    ScrollSyncService.prototype.siblingComponent = function (scrollableElement) {
        return this.navigator.container.nativeElement === scrollableElement ? this.view : this.navigator;
    };
    ScrollSyncService.prototype.calculateScroll = function (component, scrollTop) {
        var modifier = component === this.navigator ? this.divideByMagnitude : this.powerByMagnitude;
        return modifier(scrollTop);
    };
    ScrollSyncService.prototype.destroy = function () {
        this.unsubscribe();
    };
    ScrollSyncService.prototype.unsubscribe = function () {
        if (this.navSubscription) {
            this.navSubscription.unsubscribe();
        }
        if (this.viewSubscription) {
            this.viewSubscription.unsubscribe();
        }
    };
    ScrollSyncService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ScrollSyncService.ctorParameters = function () { return [
        { type: CalendarDOMService },
        { type: NgZone }
    ]; };
    return ScrollSyncService;
}());
export { ScrollSyncService };
export { ɵ0, ɵ1 };
