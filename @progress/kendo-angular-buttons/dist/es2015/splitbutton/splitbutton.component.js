/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/* tslint:disable:no-access-missing-member */
import { Component, ElementRef, TemplateRef, Input, Output, HostBinding, HostListener, EventEmitter, ContentChild, ViewChild, ViewContainerRef, NgZone } from '@angular/core';
import { LocalizationService, L10N_PREFIX } from '@progress/kendo-angular-l10n';
import { PopupService } from '@progress/kendo-angular-popup';
import { ListButton } from './../listbutton/list-button';
import { ButtonItemTemplateDirective } from './../listbutton/button-item-template.directive';
import { FocusService } from './../focusable/focus.service';
import { NavigationService } from './../navigation/navigation.service';
import { NAVIGATION_CONFIG } from './../navigation/navigation-config';
import { isDocumentAvailable, guid } from '@progress/kendo-angular-common';
import { isPresent, tick } from './../util';
import { PreventableEvent } from '../preventable-event';
const NAVIGATION_SETTINGS = {
    useLeftRightArrows: true
};
const ɵ0 = NAVIGATION_SETTINGS;
const NAVIGATION_SETTINGS_PROVIDER = {
    provide: NAVIGATION_CONFIG,
    useValue: ɵ0
};
/**
 * Represents the Kendo UI SplitButton component for Angular.
 *
 * @example
 * ```ts
 * _@Component({
 * selector: 'my-app',
 * template: `
 *  <kendo-splitbutton [data]="data" [icon]="'paste'"
 *      (itemClick)="onSplitButtonItemClick($event)"
 *      (buttonClick)="onSplitButtonClick()">Paste</kendo-splitbutton>
 * `
 * })
 *
 * class AppComponent {
 *   public data: Array<any> = [{
 *       text: 'Keep Text Only',
 *       icon: 'paste-plain-text',
 *       click: () => { console.log('Keep Text Only click handler'); }
 *   }, {
 *       text: 'Paste as HTML',
 *       icon: 'paste-as-html'
 *   }, {
 *       text: 'Paste Markdown',
 *       icon: 'paste-markdown'
 *   }, {
 *       text: 'Set Default Paste'
 *   }];
 *
 *   public onSplitButtonClick(dataItem: any): void {
 *       console.log('Paste');
 *   }
 *
 *   public onSplitButtonItemClick(dataItem: any): void {
 *       if (dataItem) {
 *           console.log(dataItem.text);
 *       }
 *   }
 * }
 * ```
 */
export class SplitButtonComponent extends ListButton {
    constructor(focusService, navigationService, wrapperRef, zone, popupService, elRef, localization) {
        super(focusService, navigationService, wrapperRef, zone, localization);
        this.popupService = popupService;
        this.elRef = elRef;
        /**
         * Sets the text of the SplitButton.
         */
        this.text = '';
        /**
         * Defines an icon to be rendered next to the button text
         * ([see example]({% slug databinding_splitbutton %}#toc-arrays-of-complex-data)).
         */
        this.icon = '';
        /**
         * Defines an icon with a custom CSS class to be rendered next to the button text
         * ([see example]({% slug databinding_splitbutton %}#toc-arrays-of-complex-data)).
         */
        this.iconClass = '';
        /**
         * Defines the location of an image to be displayed next to the button text
         * ([see example]({% slug databinding_splitbutton %}#toc-arrays-of-complex-data)).
         */
        this.imageUrl = '';
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
         * Specifies the name of the [font icon]({% slug icons %}#toc-list-of-font-icons) that will
         * be rendered for the button which opens the popup.
         */
        this.arrowButtonIcon = 'arrow-s';
        /**
         * Fires each time the user clicks the main button.
         *
         * @example
         * ```ts
         * _@Component({
         *    selector: 'my-app',
         *    template: `
         *        <kendo-splitbutton (buttonClick)="onSplitButtonClick()" [data]="data">
         *            Reply
         *        </kendo-splitbutton>
         *    `
         * })
         * class AppComponent {
         *    public data: Array<any> = ['Reply All', 'Forward', 'Reply & Delete'];
         *
         *    public onSplitButtonClick(): void {
         *      console.log('SplitButton click');
         *    }
         * }
         * ```
         *
         */
        this.buttonClick = new EventEmitter();
        /**
         * Fires each time the user clicks on the drop-down list. The event data contains the data item bound to the clicked list item.
         *
         * @example
         * ```ts
         * _@Component({
         *     selector: 'my-app',
         *    template: `
         *        <kendo-splitbutton (itemClick)="onSplitButtonItemClick($event)" [data]="data">
         *          Reply
         *      </kendo-splitbutton>
         *    `
         * })
         * class AppComponent {
         *    public data: Array<any> = ['Reply All', 'Forward', 'Reply & Delete'];
         *
         *   public onSplitButtonItemClick(dataItem?: string): void {
         *        if (dataItem) {
         *            console.log(dataItem);
         *       }
         *    }
         * }
         * ```
         *
         */
        this.itemClick = new EventEmitter();
        /**
         * Fires each time the SplitButton gets focused.
         */
        this.onFocus = new EventEmitter(); //tslint:disable-line:no-output-rename
        /**
         * Fires each time the SplitButton gets blurred.
         */
        this.onBlur = new EventEmitter(); //tslint:disable-line:no-output-rename
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
        this.listId = guid();
        this.buttonText = '';
        this._itemClick = this.itemClick;
        this._blur = this.onBlur;
    }
    /**
     * When set to `true`, disables a SplitButton item
     * ([see example]({% slug databinding_splitbutton %}#toc-arrays-of-complex-data)).
     */
    set disabled(value) {
        this._disabled = value;
    }
    get disabled() {
        return this._disabled;
    }
    /**
     * Configures the popup of the SplitButton.
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
     * Sets the data of the SplitButton.
     *
     * > The data has to be provided in an array-like list.
     */
    set data(data) {
        this._data = data || [];
    }
    get data() {
        if (!this._data) {
            this.data = [];
        }
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
    get active() {
        return this._active;
    }
    /**
     * @hidden
     */
    get componentTabIndex() {
        return this.disabled ? (-1) : this.tabIndex;
    }
    set isFocused(value) {
        this._isFocused = value;
    }
    get isFocused() {
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
    get ariaLabel() {
        return `${this.buttonText} splitbutton`;
    }
    /**
     * @hidden
     */
    onButtonFocus() {
        if (!this.isFocused) {
            this._isFocused = true;
            this.onFocus.emit();
        }
    }
    /**
     * @hidden
     */
    onButtonClick() {
        this.buttonClick.emit();
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
    ngAfterViewInit() {
        this.updateButtonText();
    }
    /**
     * @hidden
     */
    ngOnChanges(changes) {
        if (changes.hasOwnProperty('text')) {
            this.updateButtonText();
        }
    }
    /**
     * @hidden
     */
    togglePopupVisibility() {
        super.togglePopupVisibility();
        if (isDocumentAvailable()) {
            this.button.nativeElement.focus();
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
     * Focuses the SplitButton component.
     */
    focus() {
        if (isDocumentAvailable()) {
            this.button.nativeElement.focus();
        }
    }
    /**
     * Blurs the SplitButton component.
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
    enterHandler() {
        if (this.disabled) {
            return;
        }
        if (this.openState) {
            let focused = this.focusService.focused;
            if (isPresent(focused) && focused !== -1) {
                this.emitItemClickHandler(focused);
            }
        }
        else {
            this.buttonClick.emit();
        }
    }
    updateButtonText() {
        if (isDocumentAvailable()) {
            let innerText = this.wrapper.innerText.split('\n').join('').trim();
            //setTimout is needed because of `Expression has changed after it was checked.` error;
            setTimeout(() => { this.buttonText = innerText; }, 0);
        }
    }
    get appendTo() {
        const { appendTo } = this.popupSettings;
        if (!appendTo || appendTo === 'root') {
            return undefined;
        }
        return appendTo === 'component' ? this.containerRef : appendTo;
    }
    _toggle(open) {
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
SplitButtonComponent.decorators = [
    { type: Component, args: [{
                exportAs: 'kendoSplitButton',
                providers: [
                    FocusService,
                    NavigationService,
                    NAVIGATION_SETTINGS_PROVIDER,
                    LocalizationService,
                    {
                        provide: L10N_PREFIX,
                        useValue: 'kendo.splitbutton'
                    }
                ],
                selector: 'kendo-splitbutton',
                template: `
        <button kendoButton
            #button
            role="listbox"
            type="button"
            [look]="look"
            [tabindex]="componentTabIndex"
            [disabled]="disabled"
            [icon]="icon"
            [class.k-state-active]="active"
            [iconClass]="iconClass"
            [imageUrl]="imageUrl"
            [ngClass]="buttonClass"
            (focus)="onButtonFocus()"
            (click)="onButtonClick()"
            [attr.aria-disabled]="disabled"
            [attr.aria-expanded]="openState"
            [attr.aria-haspopup]="true"
            [attr.aria-owns]="listId"
            [attr.aria-label]="ariaLabel"
            >
            {{text}}<ng-content></ng-content>
        </button>
        <button kendoButton
            type="button"
            [disabled]="disabled"
            [icon]="arrowButtonIcon"
            [look]="look"
            [tabindex]="-1"
            [ngClass]="arrowButtonClass"
            (click)="togglePopupVisibility()">
        </button>
        <ng-template #popupTemplate>
            <kendo-button-list
                [id]="listId"
                [data]="data"
                [textField]="textField"
                [itemTemplate]="itemTemplate"
                (onItemBlur)="blurHandler()"
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
SplitButtonComponent.ctorParameters = () => [
    { type: FocusService },
    { type: NavigationService },
    { type: ElementRef },
    { type: NgZone },
    { type: PopupService },
    { type: ElementRef },
    { type: LocalizationService }
];
SplitButtonComponent.propDecorators = {
    text: [{ type: Input }],
    icon: [{ type: Input }],
    iconClass: [{ type: Input }],
    imageUrl: [{ type: Input }],
    look: [{ type: Input }],
    disabled: [{ type: Input }],
    popupSettings: [{ type: Input }],
    tabIndex: [{ type: Input }],
    textField: [{ type: Input }],
    data: [{ type: Input }],
    buttonClass: [{ type: Input }],
    arrowButtonClass: [{ type: Input }],
    arrowButtonIcon: [{ type: Input }],
    buttonClick: [{ type: Output }],
    itemClick: [{ type: Output }],
    onFocus: [{ type: Output, args: ['focus',] }],
    onBlur: [{ type: Output, args: ['blur',] }],
    open: [{ type: Output }],
    close: [{ type: Output }],
    itemTemplate: [{ type: ContentChild, args: [ButtonItemTemplateDirective,] }],
    button: [{ type: ViewChild, args: ['button',] }],
    popupTemplate: [{ type: ViewChild, args: ['popupTemplate',] }],
    containerRef: [{ type: ViewChild, args: ['container', { read: ViewContainerRef },] }],
    isFocused: [{ type: HostBinding, args: ['class.k-state-focused',] }],
    widgetClasses: [{ type: HostBinding, args: ['class.k-widget',] }, { type: HostBinding, args: ['class.k-split-button',] }, { type: HostBinding, args: ['class.k-button-group',] }],
    dir: [{ type: HostBinding, args: ['attr.dir',] }],
    keydown: [{ type: HostListener, args: ['keydown', ['$event'],] }],
    keypress: [{ type: HostListener, args: ['keypress', ['$event'],] }],
    keyup: [{ type: HostListener, args: ['keyup', ['$event'],] }]
};
export { ɵ0 };
