/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { cloneDate } from '@progress/kendo-date-math';
import { Keys } from '@progress/kendo-angular-common';
import { Subscription, fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';
import { isPresent } from '../common/utils';
/**
 * @hidden
 */
var DateRangeInput = /** @class */ (function () {
    function DateRangeInput(activeRangeEnd, dateRangeService, input, element, renderer, zone) {
        this.activeRangeEnd = activeRangeEnd;
        this.dateRangeService = dateRangeService;
        this.input = input;
        this.element = element;
        this.renderer = renderer;
        this.zone = zone;
        this.navigateCalendarOnFocus = false;
        this.popupSubscriptions = new Subscription(function () { });
        this.subscriptions = new Subscription(function () { });
    }
    Object.defineProperty(DateRangeInput.prototype, "isActiveEnd", {
        get: function () {
            return this.dateRangeService.activeRangeEnd === this.activeRangeEnd;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateRangeInput.prototype, "popupCalendarActivated", {
        get: function () {
            var popup = this.dateRangeService.dateRangePopup$.value;
            return isPresent(popup) && isPresent(popup.calendar);
        },
        enumerable: true,
        configurable: true
    });
    DateRangeInput.prototype.init = function () {
        var _this = this;
        if (this.input.value) {
            this.dateRangeService.setRange(this.getRange(this.input.value));
        }
        [
            this.input.onBlur.subscribe(function () { return _this.deactivate(); }),
            this.input.onFocus.pipe(filter(function () { return !_this.popupCalendarActivated; })).subscribe(function () { return _this.activate(); }),
            this.input.valueUpdate.subscribe(function (value) { return _this.updateRange(value, 'change'); }),
            this.dateRangeService.activeRangeEnd$.subscribe(function () {
                if (_this.navigateCalendarOnFocus) {
                    _this.focusActiveDate();
                }
                _this.toggleActiveClass(_this.isActiveEnd);
            }),
            this.dateRangeService.dateRangePopup$.subscribe(function (popup) { return _this.initPopup(popup); }),
            this.dateRangeService.range$.subscribe(function (range) { return _this.updateInputValue(range); }),
            fromEvent(this.element.nativeElement, 'click').subscribe(function () { return _this.activate(); }),
            fromEvent(this.element.nativeElement, 'keydown').subscribe(function (event) { return _this.togglePopup(event || {}); })
        ].map(function (s) { return _this.subscriptions.add(s); });
    };
    DateRangeInput.prototype.destroy = function () {
        this.subscriptions.unsubscribe();
        this.unsubscribePopup();
    };
    DateRangeInput.prototype.initPopup = function (popup) {
        var _this = this;
        if (!popup) {
            this.unsubscribePopup();
            return;
        }
        if (!popup.anchor) {
            popup.anchor = this.element.nativeElement;
        }
        [
            popup.cancel.subscribe(function () { return _this.isActiveEnd && _this.input.focus(); }),
            popup.onFocus.subscribe(function () { return _this.toggleActiveClass(_this.isActiveEnd); }),
            popup.onBlur.subscribe(function () { return _this.deactivate(); })
        ].map(function (s) { return _this.popupSubscriptions.add(s); });
    };
    DateRangeInput.prototype.unsubscribePopup = function () {
        this.popupSubscriptions.unsubscribe();
        this.popupSubscriptions = new Subscription(function () { });
    };
    DateRangeInput.prototype.activate = function () {
        this.dateRangeService.setActiveRangeEnd(this.activeRangeEnd);
        this.dateRangeService.activatePopup();
    };
    DateRangeInput.prototype.deactivate = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            setTimeout(function () {
                _this.updateRange(_this.input.value, 'blur');
                if (_this.dateRangeService.hasActiveComponent()) {
                    return;
                }
                _this.toggleActiveClass(false);
                _this.zone.run(function () { return _this.dateRangeService.deactivatePopup(); });
            });
        });
    };
    DateRangeInput.prototype.updateRange = function (value, correctOn) {
        var range = this.getRange(value, correctOn);
        if (range) {
            this.focusActiveDate();
            this.dateRangeService.setRange(range);
        }
    };
    DateRangeInput.prototype.togglePopup = function (_a) {
        var altKey = _a.altKey, keyCode = _a.keyCode;
        if (keyCode === Keys.Escape) {
            this.dateRangeService.cancelPopup();
        }
        else if (altKey && keyCode === Keys.ArrowDown) {
            this.dateRangeService.activatePopup();
        }
    };
    DateRangeInput.prototype.focusActiveDate = function () {
        if (this.input.value && this.isActiveEnd) {
            this.dateRangeService.setFocusedDate(cloneDate(this.input.value));
        }
    };
    DateRangeInput.prototype.toggleActiveClass = function (show) {
        var action = show ? 'addClass' : 'removeClass';
        var nativeElement = this.element.nativeElement;
        if (nativeElement && nativeElement.querySelector) {
            this.renderer[action](nativeElement.querySelector('.k-dateinput-wrap'), 'k-state-focused');
        }
    };
    return DateRangeInput;
}());
export { DateRangeInput };
