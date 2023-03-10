/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { PopupService } from '@progress/kendo-angular-popup';
import { Injectable, Renderer2, NgZone } from '@angular/core';
import { isPresent } from '../utils';
import { PreventableEvent } from './preventable-event';
import { Subject } from 'rxjs';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { ScrollSyncService } from '../scrolling/scroll-sync.service';
const contains = (node, predicate) => {
    while (node) {
        if (predicate(node)) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
};
const ɵ0 = contains;
/**
 * Arguments for the `close` event of the filter and column-menu popup.
 */
export class PopupCloseEvent extends PreventableEvent {
    constructor(e) {
        super();
        this.originalEvent = e;
    }
}
const DEFAULT_POPUP_CLASS = 'k-grid-filter-popup';
/**
 * The service that is used for the popups of the filter and column menus
 * ([see example]({% slug reusablecustomfilters_grid %}#toc-filter-menu-with-popup)).
 */
export class SinglePopupService {
    constructor(popupService, renderer, ngZone, scrollSyncService, localization) {
        this.popupService = popupService;
        this.renderer = renderer;
        this.ngZone = ngZone;
        this.localization = localization;
        /**
         * Fires when the filter or column menus are about to close because the user clicked outside their popups.
         * Used to prevent the popup from closing.
         */
        this.onClose = new Subject();
        this.scrollSubscription = scrollSyncService.changes.subscribe(() => this.destroy());
    }
    /**
     * @hidden
     */
    open(anchor, template, popupRef, popupClass = DEFAULT_POPUP_CLASS) {
        const toggle = isPresent(popupRef) && this.popupRef === popupRef;
        this.destroy();
        if (!toggle) {
            const direction = this.localization.rtl ? 'right' : 'left';
            this.popupRef = this.popupService.open({
                anchorAlign: { vertical: 'bottom', horizontal: direction },
                popupAlign: { vertical: 'top', horizontal: direction },
                anchor: anchor,
                popupClass: popupClass,
                content: template,
                positionMode: "absolute"
            });
            this.renderer.setAttribute(this.popupRef.popupElement, 'dir', this.localization.rtl ? 'rtl' : 'ltr');
            this.attachClose(anchor);
        }
        return this.popupRef;
    }
    /**
     * @hidden
     */
    destroy() {
        if (this.popupRef) {
            this.detachClose();
            this.popupRef.close();
            this.popupRef = null;
        }
    }
    ngOnDestroy() {
        this.destroy();
        this.scrollSubscription.unsubscribe();
    }
    detachClose() {
        if (this.removeClick) {
            this.removeClick();
        }
    }
    attachClose(skipElement) {
        this.detachClose();
        this.ngZone.runOutsideAngular(() => this.removeClick = this.renderer.listen("document", "click", (e) => {
            if (!contains(e.target, x => this.popupRef.popupElement === x || x === skipElement)) {
                const args = new PopupCloseEvent(e);
                this.onClose.next(args);
                if (!args.isDefaultPrevented()) {
                    this.destroy();
                }
            }
        }));
    }
}
SinglePopupService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
SinglePopupService.ctorParameters = () => [
    { type: PopupService },
    { type: Renderer2 },
    { type: NgZone },
    { type: ScrollSyncService },
    { type: LocalizationService }
];
export { ɵ0 };
