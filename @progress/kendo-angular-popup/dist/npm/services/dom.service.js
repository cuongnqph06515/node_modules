/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var kendo_popup_common_1 = require("@progress/kendo-popup-common");
var util_1 = require("../util");
var kendo_angular_common_1 = require("@progress/kendo-angular-common");
var STYLES = [
    'font-size',
    'font-family',
    'font-stretch',
    'font-style',
    'font-weight',
    'line-height'
];
/**
 * @hidden
 */
var DOMService = /** @class */ (function () {
    function DOMService() {
    }
    DOMService.prototype.addOffset = function (current, addition) {
        return {
            left: current.left + addition.left,
            top: current.top + addition.top
        };
    };
    DOMService.prototype.addScroll = function (rect, scroll) {
        return kendo_popup_common_1.addScroll(rect, scroll);
    };
    DOMService.prototype.align = function (settings) {
        return kendo_popup_common_1.align(settings);
    };
    DOMService.prototype.boundingOffset = function (el) {
        return kendo_popup_common_1.boundingOffset(this.nativeElement(el));
    };
    DOMService.prototype.getFontStyles = function (el) {
        var window = this.getWindow();
        if (!window || !el) {
            return [];
        }
        var computedStyles = window.getComputedStyle(this.nativeElement(el));
        return STYLES.map(function (font) { return ({ key: font, value: computedStyles[font] }); });
    };
    DOMService.prototype.getWindow = function () {
        return util_1.isWindowAvailable() ? window : null;
    };
    DOMService.prototype.hasOffsetParent = function (el) {
        if (!el) {
            return false;
        }
        return !!this.nativeElement(el).offsetParent;
    };
    DOMService.prototype.offset = function (el) {
        if (!el) {
            return null;
        }
        return kendo_popup_common_1.offset(this.nativeElement(el));
    };
    DOMService.prototype.offsetAtPoint = function (el, currentLocation) {
        if (!el) {
            return null;
        }
        var element = this.nativeElement(el);
        var _a = element.style, left = _a.left, top = _a.top, transition = _a.transition;
        element.style.transition = 'none';
        element.style.left = currentLocation.left + "px";
        element.style.top = currentLocation.top + "px";
        var currentOffset = kendo_popup_common_1.offset(element);
        element.style.left = left;
        element.style.top = top;
        // prevents elements with transition to be animated because of the change
        // tslint:disable-next-line:no-unused-expression
        element.offsetHeight;
        element.style.transition = transition;
        return currentOffset;
    };
    DOMService.prototype.nativeElement = function (el) {
        if (!el) {
            return null;
        }
        return el.nativeElement || el;
    };
    DOMService.prototype.position = function (element, popup, scale) {
        if (scale === void 0) { scale = 1; }
        if (!element || !popup) {
            return null;
        }
        return kendo_popup_common_1.positionWithScroll(this.nativeElement(element), this.nativeElement(popup), scale);
    };
    DOMService.prototype.removeScroll = function (rect, scroll) {
        return kendo_popup_common_1.removeScroll(rect, scroll);
    };
    DOMService.prototype.restrictToView = function (settings) {
        return kendo_popup_common_1.restrictToView(settings);
    };
    DOMService.prototype.scrollPosition = function (el) {
        return kendo_popup_common_1.scrollPosition(this.nativeElement(el));
    };
    DOMService.prototype.scrollableParents = function (el) {
        return util_1.scrollableParents(this.nativeElement(el));
    };
    DOMService.prototype.stackingElementOffset = function (el) {
        var relativeContextElement = this.getRelativeContextElement(el);
        if (!relativeContextElement) {
            return null;
        }
        return kendo_popup_common_1.offset(relativeContextElement);
    };
    DOMService.prototype.stackingElementScroll = function (el) {
        var relativeContextElement = this.getRelativeContextElement(el);
        if (!relativeContextElement) {
            return { x: 0, y: 0 };
        }
        return {
            x: relativeContextElement.scrollLeft,
            y: relativeContextElement.scrollTop
        };
    };
    DOMService.prototype.getRelativeContextElement = function (el) {
        if (!el || !util_1.hasRelativeStackingContext()) {
            return null;
        }
        var parent = this.nativeElement(el).parentElement;
        while (parent) {
            if (window.getComputedStyle(parent).transform !== 'none') {
                return parent;
            }
            parent = parent.parentElement;
        }
        return null;
    };
    DOMService.prototype.useRelativePosition = function (el) {
        return !!this.getRelativeContextElement(el);
    };
    DOMService.prototype.windowViewPort = function (el) {
        return kendo_popup_common_1.getWindowViewPort(this.nativeElement(el));
    };
    DOMService.prototype.zIndex = function (anchor, container) {
        return util_1.zIndex(this.nativeElement(anchor), this.nativeElement(container));
    };
    DOMService.prototype.zoomLevel = function () {
        if (!kendo_angular_common_1.isDocumentAvailable() || !util_1.isWindowAvailable()) {
            return 1;
        }
        return parseFloat((document.documentElement.clientWidth / window.innerWidth).toFixed(2)) || 1;
    };
    DOMService.prototype.isZoomed = function () {
        return this.zoomLevel() > 1;
    };
    DOMService.decorators = [
        { type: core_1.Injectable },
    ];
    return DOMService;
}());
exports.DOMService = DOMService;
