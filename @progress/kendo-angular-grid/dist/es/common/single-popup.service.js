/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { PopupService } from '@progress/kendo-angular-popup';
import { Injectable, Renderer2, NgZone } from '@angular/core';
import { isPresent } from '../utils';
import { PreventableEvent } from './preventable-event';
import { Subject } from 'rxjs';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { ScrollSyncService } from '../scrolling/scroll-sync.service';
var contains = function (node, predicate) {
    while (node) {
        if (predicate(node)) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
};
var ɵ0 = contains;
/**
 * Arguments for the `close` event of the filter and column-menu popup.
 */
var PopupCloseEvent = /** @class */ (function (_super) {
    tslib_1.__extends(PopupCloseEvent, _super);
    function PopupCloseEvent(e) {
        var _this = _super.call(this) || this;
        _this.originalEvent = e;
        return _this;
    }
    return PopupCloseEvent;
}(PreventableEvent));
export { PopupCloseEvent };
var DEFAULT_POPUP_CLASS = 'k-grid-filter-popup';
/**
 * The service that is used for the popups of the filter and column menus
 * ([see example]({% slug reusablecustomfilters_grid %}#toc-filter-menu-with-popup)).
 */
var SinglePopupService = /** @class */ (function () {
    function SinglePopupService(popupService, renderer, ngZone, scrollSyncService, localization) {
        var _this = this;
        this.popupService = popupService;
        this.renderer = renderer;
        this.ngZone = ngZone;
        this.localization = localization;
        /**
         * Fires when the filter or column menus are about to close because the user clicked outside their popups.
         * Used to prevent the popup from closing.
         */
        this.onClose = new Subject();
        this.scrollSubscription = scrollSyncService.changes.subscribe(function () { return _this.destroy(); });
    }
    /**
     * @hidden
     */
    SinglePopupService.prototype.open = function (anchor, template, popupRef, popupClass) {
        if (popupClass === void 0) { popupClass = DEFAULT_POPUP_CLASS; }
        var toggle = isPresent(popupRef) && this.popupRef === popupRef;
        this.destroy();
        if (!toggle) {
            var direction = this.localization.rtl ? 'right' : 'left';
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
    };
    /**
     * @hidden
     */
    SinglePopupService.prototype.destroy = function () {
        if (this.popupRef) {
            this.detachClose();
            this.popupRef.close();
            this.popupRef = null;
        }
    };
    SinglePopupService.prototype.ngOnDestroy = function () {
        this.destroy();
        this.scrollSubscription.unsubscribe();
    };
    SinglePopupService.prototype.detachClose = function () {
        if (this.removeClick) {
            this.removeClick();
        }
    };
    SinglePopupService.prototype.attachClose = function (skipElement) {
        var _this = this;
        this.detachClose();
        this.ngZone.runOutsideAngular(function () {
            return _this.removeClick = _this.renderer.listen("document", "click", function (e) {
                if (!contains(e.target, function (x) { return _this.popupRef.popupElement === x || x === skipElement; })) {
                    var args = new PopupCloseEvent(e);
                    _this.onClose.next(args);
                    if (!args.isDefaultPrevented()) {
                        _this.destroy();
                    }
                }
            });
        });
    };
    SinglePopupService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    SinglePopupService.ctorParameters = function () { return [
        { type: PopupService },
        { type: Renderer2 },
        { type: NgZone },
        { type: ScrollSyncService },
        { type: LocalizationService }
    ]; };
    return SinglePopupService;
}());
export { SinglePopupService };
export { ɵ0 };
