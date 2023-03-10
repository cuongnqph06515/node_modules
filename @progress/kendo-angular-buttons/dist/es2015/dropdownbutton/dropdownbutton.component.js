/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
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
const NAVIGATION_SETTINGS = {
    useLeftRightArrows: true
};
const ɵ0 = NAVIGATION_SETTINGS;
const NAVIGATION_SETTINGS_PROVIDER = {
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
export class DropDownButtonComponent extends ListButton {
    constructor(focusService, navigationService, wrapperRef, zone, popupService, elRef, localization) {
        super(focusService, navigationService, wrapperRef, zone, localization);
        this.popupService = popupService;
        this.elRef = elRef;
        /**
         * Defines the name of an existing icon in a Kendo UI theme.
         */
        this.icon = '';
        /**
         * Defines the list of CSS classes which are used for styling the Button with custom icons.
         */
        this.iconClass = '';
        /**
         * Defines a URL for styling the button with a custom image.
         */
        this.imageUrl = '';
        /**
         * Adds visual weight to the default button and makes it primary.
         */
        this.primary = false;
        /**
         * Changes the visual appearance by using alternative styling options.
         *
         * The available values are:
         * * `flat`
         * * `outline`
         */
        this.look = 'default';
        /**
         * Specifies the [`tabIndex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) of the component.
         */
        this.tabIndex = 0;
        /**
         * Fires each time the user clicks on a drop-down list item. The event data contains the data item bound to the clicked list item.
         */
        this.itemClick = new EventEmitter();
        /**
         * Fires each time the popup is about to open.
         * This event is preventable. If you cancel the event, the popup will remain closed.
         */
        this.open = new EventEmitter();
        /**
         * Fires each time the popup is about to close.
         * This event is preventable. If you cancel the event, the popup will remain open.
         */
        this.close = new EventEmitter();
        /**
         * Fires each time the DropDownButton gets focused.
         */
        this.onFocus = new EventEmitter(); //tslint:disable-line:no-output-rename
        /**
         * Fires each time the DropDownButton gets blurred.
         */
        this.onBlur = new EventEmitter(); //tslint:disable-line:no-output-rename
        this.listId = guid();
        this._itemClick = this.itemClick;
        this._blur = this.onBlur;
    }
    /**
     * Configures the popup of the DropDownButton.
     *
     * The available options are:
     * - `animate: Boolean`&mdash;Controls the popup animation. By default, the open and close animations are enabled.
     * - `popupClass: String`&mdash;Specifies a list of CSS classes that are used to style the popup.
     * - `appendTo: "root" | "component" | ViewContainerRef`&mdash;Specifies the component to which the popup will be appended.
     * - `align: "left" | "center" | "right"`&mdash;Specifies the alignment of the popup.
     */
    set popupSettings(settings) {
        this._popupSettings = Object.assign({ animate: true, popupClass: '' }, settings);
    }
    get popupSettings() {
        return this._popupSettings;
    }
    /**
     * Sets the disabled state of the DropDownButton.
     */
    set disabled(value) {
        if (value && this.openState) {
            this.openState = false;
        }
        this._disabled = value;
    }
    get disabled() {
        return this._disabled;
    }
    /**
     * Sets or gets the data of the DropDownButton.
     *
     * > The data has to be provided in an array-like list.
     */
    set data(data) {
        this._data = data || [];
    }
    get data() {
        return this._data;
    }
    /**
     * @hidden
     */
    set openState(open) {
        if (this.disabled) {
            return;
        }
        const eventArgs = new PreventableEvent();
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
    }
    /**
     * @hidden
     */
    get openState() {
        return this._open;
    }
    /**
     * @hidden
     */
    get componentTabIndex() {
        return this.disabled ? (-1) : this.tabIndex;
    }
    get appendTo() {
        const { appendTo } = this.popupSettings;
        if (!appendTo || appendTo === 'root') {
            return undefined;
        }
        return appendTo === 'component' ? this.container : appendTo;
    }
    get focused() {
        return this._isFocused && !this._disabled;
    }
    get widgetClasses() {
        return true;
    }
    get dir() {
        return this.direction;
    }
    /**
     * @hidden
     */
    get active() {
        return this._active;
    }
    /**
     * @hidden
     */
    keydown(event) {
        this.keyDownHandler(event);
    }
    /**
     * @hidden
     */
    keypress(event) {
        this.keyPressHandler(event);
    }
    /**
     * @hidden
     */
    keyup(event) {
        this.keyUpHandler(event);
    }
    /**
     * @hidden
     */
    mousedown(event) {
        if (this._disabled) {
            event.preventDefault();
        }
    }
    /**
     * @hidden
     */
    openPopup() {
        this.togglePopupVisibility();
    }
    /**
     * @hidden
     */
    get anchorAlign() {
        let align = { horizontal: this.popupSettings.align || 'left', vertical: 'bottom' };
        if (this.direction === 'rtl' && !isPresent(this.popupSettings.align)) {
            align.horizontal = 'right';
        }
        return align;
    }
    /**
     * @hidden
     */
    get popupAlign() {
        let align = { horizontal: this.popupSettings.align || 'left', vertical: 'top' };
        if (this.direction === 'rtl' && !isPresent(this.popupSettings.align)) {
            align.horizontal = 'right';
        }
        return align;
    }
    /**
     * Focuses the DropDownButton component.
     */
    focus() {
        if (isDocumentAvailable()) {
            this.button.nativeElement.focus();
        }
    }
    /**
     * Blurs the DropDownButton component.
     */
    blur() {
        if (isDocumentAvailable()) {
            this.button.nativeElement.blur();
            this.blurWrapper();
        }
    }
    ngOnDestroy() {
        super.ngOnDestroy();
        this.destroyPopup();
    }
    /**
     * Toggles the visibility of the popup.
     * If the `toggle` method is used to open or close the popup, the `open` and `close` events will not be fired.
     *
     * @param open - The state of the popup.
     */
    toggle(open) {
        if (this.disabled) {
            return;
        }
        tick(() => (this._toggle((open === undefined) ? !this._open : open)));
    }
    /**
     * Returns the current open state of the popup.
     */
    get isOpen() {
        return this.openState;
    }
    /**
     * @hidden
     */
    handleFocus() {
        if (!this._disabled && !this._isFocused) {
            this._isFocused = true;
            this.onFocus.emit();
        }
    }
    /**
     * @hidden
     */
    wrapperContains(element) {
        return this.wrapper === element
            || this.wrapper.contains(element)
            || (this.popupRef && this.popupRef.popupElement.contains(element));
    }
    subscribeNavigationEvents() {
        this.navigationSubscription = this.navigationService.navigate
            .subscribe(this.onArrowKeyNavigate.bind(this));
        this.enterPressSubscription = this.navigationService.enterpress.subscribe(this.onNavigationEnterPress.bind(this));
        this.enterUpSubscription = this.navigationService.enterup.subscribe(this.onNavigationEnterUp.bind(this));
        this.openSubscription = this.navigationService.open.subscribe(this.onNavigationOpen.bind(this));
        this.closeSubscription = merge(this.navigationService.close, this.navigationService.esc).subscribe(this.onNavigationClose.bind(this));
    }
    onNavigationEnterPress() {
        if (!this._disabled && !this.openState) {
            this._active = true;
        }
    }
    onNavigationEnterUp() {
        if (!this._disabled && !this.openState) {
            this._active = false;
        }
        if (this.openState) {
            let focused = this.focusService.focused;
            if (isPresent(focused) && focused !== -1) {
                this.emitItemClickHandler(focused);
            }
        }
        this.togglePopupVisibility();
        if (!this.openState && isDocumentAvailable()) {
            this.button.nativeElement.focus();
        }
    }
    onNavigationOpen() {
        if (!this._disabled && !this.openState) {
            this.togglePopupVisibility();
        }
    }
    onNavigationClose() {
        if (this.openState) {
            this.togglePopupVisibility();
            if (isDocumentAvailable()) {
                this.button.nativeElement.focus();
            }
        }
    }
    onArrowKeyNavigate(index) {
        this.focusService.focus(index);
    }
    _toggle(open) {
        if (this._open === open) {
            return;
        }
        this._open = open;
        this.destroyPopup();
        if (this._open) {
            this.createPopup();
        }
    }
    createPopup() {
        this.popupRef = this.popupService.open({
            anchor: this.elRef,
            anchorAlign: this.anchorAlign,
            animate: this.popupSettings.animate,
            appendTo: this.appendTo,
            content: this.popupTemplate,
            popupAlign: this.popupAlign,
            popupClass: this.popupClasses
        });
        this.popupRef.popupAnchorViewportLeave.subscribe(() => this.openState = false);
        this.popupRef.popupOpen.subscribe(this.focusFirstItem.bind(this));
    }
    destroyPopup() {
        if (this.popupRef) {
            this.popupRef.close();
            this.popupRef = null;
        }
    }
}
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
                template: `
        <button kendoButton #button
            role="menu"
            type="button"
            [tabindex]="componentTabIndex"
            [class.k-state-active]="active"
            [disabled]="disabled"
            [icon]="icon"
            [iconClass]="iconClass"
            [imageUrl]="imageUrl"
            [ngClass]="buttonClass"
            (click)="openPopup()"
            (focus)="handleFocus()"
            [attr.aria-disabled]="disabled"
            [attr.aria-expanded]="openState"
            [attr.aria-haspopup]="true"
            [attr.aria-owns]="listId"
            [look]="look"
            [primary]="primary"
            >
            <ng-content></ng-content>
        </button>
        <ng-template #popupTemplate>
            <kendo-button-list
                #buttonList
                [id]="listId"
                [data]="data"
                [textField]="textField"
                [itemTemplate]="itemTemplate"
                (onItemClick)="onItemClick($event)"
                (keydown)="keyDownHandler($event)"
                (keypress)="keyPressHandler($event)"
                (keyup)="keyUpHandler($event)"
            >
            </kendo-button-list>
        </ng-template>
        <ng-container #container></ng-container>
    `
            },] },
];
/** @nocollapse */
DropDownButtonComponent.ctorParameters = () => [
    { type: FocusService },
    { type: NavigationService },
    { type: ElementRef },
    { type: NgZone },
    { type: PopupService },
    { type: ElementRef },
    { type: LocalizationService }
];
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
export { ɵ0 };
