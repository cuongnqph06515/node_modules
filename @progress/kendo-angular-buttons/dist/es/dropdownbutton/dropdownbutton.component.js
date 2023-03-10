/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
/* tslint:disable:no-access-missing-member */
import { Component, ContentChild, TemplateRef, ViewChild, ViewContainerRef, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output, NgZone } from '@angular/core';
import { LocalizationService, L10N_PREFIX } from '@progress/kendo-angular-l10n';
import { PopupService } from '@progress/kendo-angular-popup';
import { isDocumentAvailable, guid } from '@progress/kendo-angular-common';
import { ButtonItemTemplateDirective } from '../listbutton/button-item-template.directive';
import { isPresent, tick } from '../util';
import { ListButton } from '../listbutton/list-button';
import { ListComponent } from '../listbutton/list.component';
import { FocusService } from '../focusable/focus.service';
import { NavigationService } from '../navigation/navigation.service';
import { NAVIGATION_CONFIG } from '../navigation/navigation-config';
import { PreventableEvent } from '../preventable-event';
import { merge } from 'rxjs';
var NAVIGATION_SETTINGS = {
    useLeftRightArrows: true
};
var ɵ0 = NAVIGATION_SETTINGS;
var NAVIGATION_SETTINGS_PROVIDER = {
    provide: NAVIGATION_CONFIG,
    useValue: ɵ0
};
/**
 * Represents the Kendo UI DropDownButton component for Angular.
 *
 * @example
 * ```ts
 * _@Component({
 * selector: 'my-app',
 * template: `
 *  <kendo-dropdownbutton [data]="data">
 *    User Settings
 *  </kendo-dropdownbutton>
 * `
 * })
 * class AppComponent {
 *   public data: Array<any> = [{
 *       text: 'My Profile'
 *   }, {
 *       text: 'Friend Requests'
 *   }, {
 *       text: 'Account Settings'
 *   }, {
 *       text: 'Support'
 *   }, {
 *       text: 'Log Out'
 *   }];
 * }
 * ```
 */
var DropDownButtonComponent = /** @class */ (function (_super) {
    tslib_1.__extends(DropDownButtonComponent, _super);
    function DropDownButtonComponent(focusService, navigationService, wrapperRef, zone, popupService, elRef, localization) {
        var _this = _super.call(this, focusService, navigationService, wrapperRef, zone, localization) || this;
        _this.popupService = popupService;
        _this.elRef = elRef;
        /**
         * Defines the name of an existing icon in a Kendo UI theme.
         */
        _this.icon = '';
        /**
         * Defines the list of CSS classes which are used for styling the Button with custom icons.
         */
        _this.iconClass = '';
        /**
         * Defines a URL for styling the button with a custom image.
         */
        _this.imageUrl = '';
        /**
         * Adds visual weight to the default button and makes it primary.
         */
        _this.primary = false;
        /**
         * Changes the visual appearance by using alternative styling options.
         *
         * The available values are:
         * * `flat`
         * * `outline`
         */
        _this.look = 'default';
        /**
         * Specifies the [`tabIndex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) of the component.
         */
        _this.tabIndex = 0;
        /**
         * Fires each time the user clicks on a drop-down list item. The event data contains the data item bound to the clicked list item.
         */
        _this.itemClick = new EventEmitter();
        /**
         * Fires each time the popup is about to open.
         * This event is preventable. If you cancel the event, the popup will remain closed.
         */
        _this.open = new EventEmitter();
        /**
         * Fires each time the popup is about to close.
         * This event is preventable. If you cancel the event, the popup will remain open.
         */
        _this.close = new EventEmitter();
        /**
         * Fires each time the DropDownButton gets focused.
         */
        _this.onFocus = new EventEmitter(); //tslint:disable-line:no-output-rename
        /**
         * Fires each time the DropDownButton gets blurred.
         */
        _this.onBlur = new EventEmitter(); //tslint:disable-line:no-output-rename
        _this.listId = guid();
        _this._itemClick = _this.itemClick;
        _this._blur = _this.onBlur;
        return _this;
    }
    Object.defineProperty(DropDownButtonComponent.prototype, "popupSettings", {
        get: function () {
            return this._popupSettings;
        },
        /**
         * Configures the popup of the DropDownButton.
         *
         * The available options are:
         * - `animate: Boolean`&mdash;Controls the popup animation. By default, the open and close animations are enabled.
         * - `popupClass: String`&mdash;Specifies a list of CSS classes that are used to style the popup.
         * - `appendTo: "root" | "component" | ViewContainerRef`&mdash;Specifies the component to which the popup will be appended.
         * - `align: "left" | "center" | "right"`&mdash;Specifies the alignment of the popup.
         */
        set: function (settings) {
            this._popupSettings = Object.assign({ animate: true, popupClass: '' }, settings);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownButtonComponent.prototype, "disabled", {
        get: function () {
            return this._disabled;
        },
        /**
         * Sets the disabled state of the DropDownButton.
         */
        set: function (value) {
            if (value && this.openState) {
                this.openState = false;
            }
            this._disabled = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownButtonComponent.prototype, "data", {
        get: function () {
            return this._data;
        },
        /**
         * Sets or gets the data of the DropDownButton.
         *
         * > The data has to be provided in an array-like list.
         */
        set: function (data) {
            this._data = data || [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownButtonComponent.prototype, "openState", {
        /**
         * @hidden
         */
        get: function () {
            return this._open;
        },
        /**
         * @hidden
         */
        set: function (open) {
            if (this.disabled) {
                return;
            }
            var eventArgs = new PreventableEvent();
            if (open) {
                this.open.emit(eventArgs);
            }
            else {
                this.close.emit(eventArgs);
            }
            if (eventArgs.isDefaultPrevented()) {
                return;
            }
            this._toggle(open);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownButtonComponent.prototype, "componentTabIndex", {
        /**
         * @hidden
         */
        get: function () {
            return this.disabled ? (-1) : this.tabIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownButtonComponent.prototype, "appendTo", {
        get: function () {
            var appendTo = this.popupSettings.appendTo;
            if (!appendTo || appendTo === 'root') {
                return undefined;
            }
            return appendTo === 'component' ? this.container : appendTo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownButtonComponent.prototype, "focused", {
        get: function () {
            return this._isFocused && !this._disabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownButtonComponent.prototype, "widgetClasses", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownButtonComponent.prototype, "dir", {
        get: function () {
            return this.direction;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownButtonComponent.prototype, "active", {
        /**
         * @hidden
         */
        get: function () {
            return this._active;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    DropDownButtonComponent.prototype.keydown = function (event) {
        this.keyDownHandler(event);
    };
    /**
     * @hidden
     */
    DropDownButtonComponent.prototype.keypress = function (event) {
        this.keyPressHandler(event);
    };
    /**
     * @hidden
     */
    DropDownButtonComponent.prototype.keyup = function (event) {
        this.keyUpHandler(event);
    };
    /**
     * @hidden
     */
    DropDownButtonComponent.prototype.mousedown = function (event) {
        if (this._disabled) {
            event.preventDefault();
        }
    };
    /**
     * @hidden
     */
    DropDownButtonComponent.prototype.openPopup = function () {
        this.togglePopupVisibility();
    };
    Object.defineProperty(DropDownButtonComponent.prototype, "anchorAlign", {
        /**
         * @hidden
         */
        get: function () {
            var align = { horizontal: this.popupSettings.align || 'left', vertical: 'bottom' };
            if (this.direction === 'rtl' && !isPresent(this.popupSettings.align)) {
                align.horizontal = 'right';
            }
            return align;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownButtonComponent.prototype, "popupAlign", {
        /**
         * @hidden
         */
        get: function () {
            var align = { horizontal: this.popupSettings.align || 'left', vertical: 'top' };
            if (this.direction === 'rtl' && !isPresent(this.popupSettings.align)) {
                align.horizontal = 'right';
            }
            return align;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Focuses the DropDownButton component.
     */
    DropDownButtonComponent.prototype.focus = function () {
        if (isDocumentAvailable()) {
            this.button.nativeElement.focus();
        }
    };
    /**
     * Blurs the DropDownButton component.
     */
    DropDownButtonComponent.prototype.blur = function () {
        if (isDocumentAvailable()) {
            this.button.nativeElement.blur();
            this.blurWrapper();
        }
    };
    DropDownButtonComponent.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
        this.destroyPopup();
    };
    /**
     * Toggles the visibility of the popup.
     * If the `toggle` method is used to open or close the popup, the `open` and `close` events will not be fired.
     *
     * @param open - The state of the popup.
     */
    DropDownButtonComponent.prototype.toggle = function (open) {
        var _this = this;
        if (this.disabled) {
            return;
        }
        tick(function () { return (_this._toggle((open === undefined) ? !_this._open : open)); });
    };
    Object.defineProperty(DropDownButtonComponent.prototype, "isOpen", {
        /**
         * Returns the current open state of the popup.
         */
        get: function () {
            return this.openState;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    DropDownButtonComponent.prototype.handleFocus = function () {
        if (!this._disabled && !this._isFocused) {
            this._isFocused = true;
            this.onFocus.emit();
        }
    };
    /**
     * @hidden
     */
    DropDownButtonComponent.prototype.wrapperContains = function (element) {
        return this.wrapper === element
            || this.wrapper.contains(element)
            || (this.popupRef && this.popupRef.popupElement.contains(element));
    };
    DropDownButtonComponent.prototype.subscribeNavigationEvents = function () {
        this.navigationSubscription = this.navigationService.navigate
            .subscribe(this.onArrowKeyNavigate.bind(this));
        this.enterPressSubscription = this.navigationService.enterpress.subscribe(this.onNavigationEnterPress.bind(this));
        this.enterUpSubscription = this.navigationService.enterup.subscribe(this.onNavigationEnterUp.bind(this));
        this.openSubscription = this.navigationService.open.subscribe(this.onNavigationOpen.bind(this));
        this.closeSubscription = merge(this.navigationService.close, this.navigationService.esc).subscribe(this.onNavigationClose.bind(this));
    };
    DropDownButtonComponent.prototype.onNavigationEnterPress = function () {
        if (!this._disabled && !this.openState) {
            this._active = true;
        }
    };
    DropDownButtonComponent.prototype.onNavigationEnterUp = function () {
        if (!this._disabled && !this.openState) {
            this._active = false;
        }
        if (this.openState) {
            var focused = this.focusService.focused;
            if (isPresent(focused) && focused !== -1) {
                this.emitItemClickHandler(focused);
            }
        }
        this.togglePopupVisibility();
        if (!this.openState && isDocumentAvailable()) {
            this.button.nativeElement.focus();
        }
    };
    DropDownButtonComponent.prototype.onNavigationOpen = function () {
        if (!this._disabled && !this.openState) {
            this.togglePopupVisibility();
        }
    };
    DropDownButtonComponent.prototype.onNavigationClose = function () {
        if (this.openState) {
            this.togglePopupVisibility();
            if (isDocumentAvailable()) {
                this.button.nativeElement.focus();
            }
        }
    };
    DropDownButtonComponent.prototype.onArrowKeyNavigate = function (index) {
        this.focusService.focus(index);
    };
    DropDownButtonComponent.prototype._toggle = function (open) {
        if (this._open === open) {
            return;
        }
        this._open = open;
        this.destroyPopup();
        if (this._open) {
            this.createPopup();
        }
    };
    DropDownButtonComponent.prototype.createPopup = function () {
        var _this = this;
        this.popupRef = this.popupService.open({
            anchor: this.elRef,
            anchorAlign: this.anchorAlign,
            animate: this.popupSettings.animate,
            appendTo: this.appendTo,
            content: this.popupTemplate,
            popupAlign: this.popupAlign,
            popupClass: this.popupClasses
        });
        this.popupRef.popupAnchorViewportLeave.subscribe(function () { return _this.openState = false; });
        this.popupRef.popupOpen.subscribe(this.focusFirstItem.bind(this));
    };
    DropDownButtonComponent.prototype.destroyPopup = function () {
        if (this.popupRef) {
            this.popupRef.close();
            this.popupRef = null;
        }
    };
    DropDownButtonComponent.decorators = [
        { type: Component, args: [{
                    exportAs: 'kendoDropDownButton',
                    providers: [
                        FocusService,
                        NavigationService,
                        NAVIGATION_SETTINGS_PROVIDER,
                        LocalizationService,
                        {
                            provide: L10N_PREFIX,
                            useValue: 'kendo.dropdownbutton'
                        }
                    ],
                    selector: 'kendo-dropdownbutton',
                    template: "\n        <button kendoButton #button\n            role=\"menu\"\n            type=\"button\"\n            [tabindex]=\"componentTabIndex\"\n            [class.k-state-active]=\"active\"\n            [disabled]=\"disabled\"\n            [icon]=\"icon\"\n            [iconClass]=\"iconClass\"\n            [imageUrl]=\"imageUrl\"\n            [ngClass]=\"buttonClass\"\n            (click)=\"openPopup()\"\n            (focus)=\"handleFocus()\"\n            [attr.aria-disabled]=\"disabled\"\n            [attr.aria-expanded]=\"openState\"\n            [attr.aria-haspopup]=\"true\"\n            [attr.aria-owns]=\"listId\"\n            [look]=\"look\"\n            [primary]=\"primary\"\n            >\n            <ng-content></ng-content>\n        </button>\n        <ng-template #popupTemplate>\n            <kendo-button-list\n                #buttonList\n                [id]=\"listId\"\n                [data]=\"data\"\n                [textField]=\"textField\"\n                [itemTemplate]=\"itemTemplate\"\n                (onItemClick)=\"onItemClick($event)\"\n                (keydown)=\"keyDownHandler($event)\"\n                (keypress)=\"keyPressHandler($event)\"\n                (keyup)=\"keyUpHandler($event)\"\n            >\n            </kendo-button-list>\n        </ng-template>\n        <ng-container #container></ng-container>\n    "
                },] },
    ];
    /** @nocollapse */
    DropDownButtonComponent.ctorParameters = function () { return [
        { type: FocusService },
        { type: NavigationService },
        { type: ElementRef },
        { type: NgZone },
        { type: PopupService },
        { type: ElementRef },
        { type: LocalizationService }
    ]; };
    DropDownButtonComponent.propDecorators = {
        icon: [{ type: Input }],
        iconClass: [{ type: Input }],
        imageUrl: [{ type: Input }],
        popupSettings: [{ type: Input }],
        textField: [{ type: Input }],
        disabled: [{ type: Input }],
        data: [{ type: Input }],
        primary: [{ type: Input }],
        look: [{ type: Input }],
        buttonClass: [{ type: Input }],
        tabIndex: [{ type: Input }],
        itemClick: [{ type: Output }],
        open: [{ type: Output }],
        close: [{ type: Output }],
        onFocus: [{ type: Output, args: ['focus',] }],
        onBlur: [{ type: Output, args: ['blur',] }],
        focused: [{ type: HostBinding, args: ['class.k-state-focused',] }],
        widgetClasses: [{ type: HostBinding, args: ['class.k-widget',] }, { type: HostBinding, args: ['class.k-dropdown-button',] }],
        dir: [{ type: HostBinding, args: ['attr.dir',] }],
        itemTemplate: [{ type: ContentChild, args: [ButtonItemTemplateDirective,] }],
        button: [{ type: ViewChild, args: ['button',] }],
        buttonList: [{ type: ViewChild, args: ['buttonList',] }],
        popupTemplate: [{ type: ViewChild, args: ['popupTemplate',] }],
        container: [{ type: ViewChild, args: ['container', { read: ViewContainerRef },] }],
        keydown: [{ type: HostListener, args: ['keydown', ['$event'],] }],
        keypress: [{ type: HostListener, args: ['keypress', ['$event'],] }],
        keyup: [{ type: HostListener, args: ['keyup', ['$event'],] }],
        mousedown: [{ type: HostListener, args: ['mousedown', ['$event'],] }]
    };
    return DropDownButtonComponent;
}(ListButton));
export { DropDownButtonComponent };
export { ɵ0 };
