/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var key_events_1 = require("./../navigation/key-events");
var navigation_action_1 = require("./../navigation/navigation-action");
var kendo_angular_common_1 = require("@progress/kendo-angular-common");
var util_1 = require("./../util");
/**
 * @hidden
 */
var ListButton = /** @class */ (function () {
    function ListButton(focusService, navigationService, wrapperRef, _zone, localization) {
        var _this = this;
        this.focusService = focusService;
        this.navigationService = navigationService;
        this.wrapperRef = wrapperRef;
        this._zone = _zone;
        this._open = false;
        this._disabled = false;
        this._active = false;
        this._popupSettings = { animate: true, popupClass: '' };
        this.listId = kendo_angular_common_1.guid();
        this._isFocused = false;
        this.wrapperBlurred = new core_1.EventEmitter();
        this.focusService = focusService;
        this.navigationService = navigationService;
        this.wrapper = wrapperRef.nativeElement;
        this.localizationChangeSubscription = localization.changes.subscribe(function (_a) {
            var rtl = _a.rtl;
            return _this.direction = rtl ? 'rtl' : 'ltr';
        });
        this.subscribeEvents();
    }
    Object.defineProperty(ListButton.prototype, "popupClasses", {
        get: function () {
            var popupClasses = [
                'k-list-container',
                'k-reset',
                'k-group'
            ];
            if (this._popupSettings.popupClass) {
                popupClasses.push(this._popupSettings.popupClass);
            }
            return popupClasses.join(' ');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListButton.prototype, "openState", {
        get: function () {
            return this._open;
        },
        set: function (open) {
            this._open = open;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    ListButton.prototype.togglePopupVisibility = function () {
        if (this._disabled) {
            return;
        }
        this.openState = !this.openState;
        if (!this.openState) {
            this.focusService.focus(-1);
        }
    };
    /**
     * @hidden
     */
    ListButton.prototype.onItemClick = function (index) {
        var _this = this;
        this.emitItemClickHandler(index);
        setTimeout(function () { _this.focusWrapper(); }, 1);
    };
    ListButton.prototype.ngOnDestroy = function () {
        this.openState = false;
        this.unsubscribeEvents();
        clearTimeout(this.focusFirstTimeout);
        clearTimeout(this.blurTimeout);
        if (this.localizationChangeSubscription) {
            this.localizationChangeSubscription.unsubscribe();
        }
    };
    ListButton.prototype.subscribeEvents = function () {
        if (!kendo_angular_common_1.isDocumentAvailable()) {
            return;
        }
        this.subscribeListItemFocusEvent();
        this.subscribeComponentBlurredEvent();
        this.subscribeNavigationEvents();
    };
    ListButton.prototype.subscribeListItemFocusEvent = function () {
        var _this = this;
        this.focusSubscription = this.focusService.onFocus.subscribe(function () {
            _this._isFocused = true;
        });
    };
    ListButton.prototype.subscribeComponentBlurredEvent = function () {
        var _this = this;
        this._zone.runOutsideAngular(function () {
            _this.documentClick = rxjs_1.fromEvent(document, 'click').pipe(operators_1.filter(function (event) {
                return !_this.wrapperContains(event.target);
            }));
            _this.tabSubscription = _this.navigationService.tab.pipe(operators_1.filter(function () { return _this._isFocused; })).subscribe(_this.handleTab.bind(_this));
            _this.componentBlurredSubscription = rxjs_1.merge(_this.documentClick, _this.wrapperBlurred).pipe(operators_1.filter(function () { return _this._isFocused; })).subscribe(function () { return _this._zone.run(function () { return _this.blurWrapper(); }); });
        });
    };
    ListButton.prototype.subscribeNavigationEvents = function () {
        var _this = this;
        this.navigationSubscription = this.navigationService.navigate
            .subscribe(this.focusService.focus.bind(this.focusService));
        this.enterPressSubscription = this.navigationService.enterpress.subscribe(function () {
            if (!_this._disabled && !_this._open) {
                _this._active = true;
            }
        });
        this.enterUpSubscription = this.navigationService.enterup.subscribe(function () {
            if (!_this._open) {
                _this._active = false;
            }
            _this.enterHandler();
            _this.focusWrapper();
        });
        this.openSubscription = this.navigationService.open.subscribe(function () {
            if (!_this._open) {
                _this.togglePopupVisibility();
                _this.focusFirstItem();
            }
            else {
                _this.focusWrapper();
            }
        });
        this.closeSubscription = rxjs_1.merge(this.navigationService.close, this.navigationService.esc).subscribe(function () { return _this.focusWrapper(); });
    };
    ListButton.prototype.enterHandler = function () { }; // tslint:disable-line
    ListButton.prototype.unsubscribeEvents = function () {
        if (!kendo_angular_common_1.isDocumentAvailable()) {
            return;
        }
        this.unsubscribe(this.componentBlurredSubscription);
        this.unsubscribe(this.focusSubscription);
        this.unsubscribe(this.navigationSubscription);
        this.unsubscribe(this.enterPressSubscription);
        this.unsubscribe(this.enterUpSubscription);
        this.unsubscribe(this.openSubscription);
        this.unsubscribe(this.closeSubscription);
        this.unsubscribe(this.tabSubscription);
    };
    ListButton.prototype.unsubscribe = function (subscription) {
        if (subscription) {
            subscription.unsubscribe();
        }
    };
    /**
     * @hidden
     */
    ListButton.prototype.keyDownHandler = function (event) {
        this.keyHandler(event);
    };
    /**
     * @hidden
     */
    ListButton.prototype.keyPressHandler = function (event) {
        this.keyHandler(event, key_events_1.KeyEvents.keypress);
    };
    /**
     * @hidden
     */
    ListButton.prototype.keyUpHandler = function (event) {
        this.keyHandler(event, key_events_1.KeyEvents.keyup);
    };
    /**
     * @hidden
     */
    ListButton.prototype.keyHandler = function (event, keyEvent) {
        if (this._disabled) {
            return;
        }
        var focused = this.focusService.focused || 0;
        var eventData = event;
        var action = this.navigationService.process({
            altKey: eventData.altKey,
            current: focused,
            keyCode: eventData.keyCode,
            keyEvent: keyEvent,
            max: this._data ? this._data.length - 1 : 0,
            min: 0
        });
        if (action !== navigation_action_1.NavigationAction.Undefined &&
            action !== navigation_action_1.NavigationAction.Tab &&
            (action !== navigation_action_1.NavigationAction.Enter || (action === navigation_action_1.NavigationAction.Enter && this._open))) {
            eventData.preventDefault();
        }
    };
    ListButton.prototype.emitItemClickHandler = function (index) {
        var dataItem = this._data[index];
        if (this._itemClick) {
            this._itemClick.emit(dataItem);
        }
        if (dataItem && dataItem.click && !dataItem.disabled) {
            dataItem.click(dataItem);
        }
    };
    ListButton.prototype.focusFirstItem = function () {
        var _this = this;
        if (this._data && util_1.isPresent(this._data[0])) {
            this.focusFirstTimeout = setTimeout(function () { _this.focusService.focus(0); }, 1);
        }
    };
    ListButton.prototype.focusWrapper = function () {
        if (this._open) {
            this.togglePopupVisibility();
            this.focusButton();
        }
    };
    /**
     * @hidden
     */
    ListButton.prototype.blurHandler = function () {
        var _this = this;
        if (!kendo_angular_common_1.isDocumentAvailable()) {
            return;
        }
        this.blurTimeout = setTimeout(function () {
            if (!_this.wrapperContains(document.activeElement)) {
                _this.blurWrapper();
            }
        });
    };
    ListButton.prototype.wrapperContains = function (element) {
        return this.wrapper === element || this.wrapper.contains(element);
    };
    ListButton.prototype.blurWrapper = function () {
        if (this._open) {
            this.togglePopupVisibility();
        }
        this._isFocused = false;
        this._blur.emit();
    };
    ListButton.prototype.focusButton = function () {
        if (this.button) {
            this.button.nativeElement.focus();
        }
    };
    ListButton.prototype.handleTab = function () {
        this.focusButton();
        this.blurWrapper();
    };
    return ListButton;
}());
exports.ListButton = ListButton;
