/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable, NgZone } from '@angular/core';
import { CalendarDOMService } from './dom.service';
const divideByMagnitude = (magnitude) => x => Math.floor(x / magnitude);
const ɵ0 = divideByMagnitude;
const powerByMagnitude = (magnitude) => x => x * magnitude;
const ɵ1 = powerByMagnitude;
/**
 * @hidden
 */
export class ScrollSyncService {
    constructor(dom, zone) {
        this.dom = dom;
        this.zone = zone;
    }
    configure(activeView) {
        const magnitude = Math.max(this.dom.viewHeight(activeView) / this.dom.navigationItemHeight, 1);
        this.divideByMagnitude = divideByMagnitude(magnitude);
        this.powerByMagnitude = powerByMagnitude(magnitude);
    }
    sync(navigator, view) {
        this.unsubscribe();
        if (!navigator || !view) {
            return;
        }
        this.navigator = navigator;
        this.view = view;
        this.zone.runOutsideAngular(() => {
            let navScrolled, monthScrolled;
            this.navSubscription = navigator.scroll$()
                .subscribe((e) => {
                if (monthScrolled) {
                    monthScrolled = false;
                    return;
                }
                navScrolled = true;
                this.scrollSiblingOf(e.target);
            });
            this.viewSubscription = view.scroll$()
                .subscribe((e) => {
                if (navScrolled) {
                    navScrolled = false;
                    return;
                }
                monthScrolled = true;
                this.scrollSiblingOf(e.target);
            });
        });
    }
    scrollSiblingOf(scrolledElement) {
        const component = this.siblingComponent(scrolledElement);
        const scrollTop = this.calculateScroll(component, scrolledElement.scrollTop);
        component.scrollTo(scrollTop);
    }
    siblingComponent(scrollableElement) {
        return this.navigator.container.nativeElement === scrollableElement ? this.view : this.navigator;
    }
    calculateScroll(component, scrollTop) {
        const modifier = component === this.navigator ? this.divideByMagnitude : this.powerByMagnitude;
        return modifier(scrollTop);
    }
    destroy() {
        this.unsubscribe();
    }
    unsubscribe() {
        if (this.navSubscription) {
            this.navSubscription.unsubscribe();
        }
        if (this.viewSubscription) {
            this.viewSubscription.unsubscribe();
        }
    }
}
ScrollSyncService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ScrollSyncService.ctorParameters = () => [
    { type: CalendarDOMService },
    { type: NgZone }
];
export { ɵ0, ɵ1 };
