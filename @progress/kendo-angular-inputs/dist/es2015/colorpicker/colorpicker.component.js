/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, HostBinding, Input, Output, EventEmitter, ViewChild, ElementRef, TemplateRef, ViewContainerRef, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { PopupService } from '@progress/kendo-angular-popup';
import { PreventableEvent, ActiveColorClickEvent } from './models';
import { parseColor } from './utils/color-parser';
import { isPresent } from '../common/utils';
import { Keys, KendoInput } from '@progress/kendo-angular-common';
import { LocalizationService, L10N_PREFIX } from '@progress/kendo-angular-l10n';
const DEFAULT_PRESET = 'office';
const DEFAULT_ACCESSIBLE_PRESET = 'accessible';
import { PALETTEPRESETS } from './utils/palette-presets';
let serial = 0;
/**
 * Represents the [Kendo UI ColorPicker component for Angular]({% slug overview_colorpicker %}).
 * Designed to replace the `<input type="color">` HTML5 tag which is not widely supported in browsers.
 */
export class ColorPickerComponent {
    constructor(popupService, localizationService) {
        this.popupService = popupService;
        /**
         * @hidden
         */
        this.hostClasses = true;
        /**
         * @hidden
         */
        this.focusableId = `k-colorpicker-${serial++}`;
        /**
         * Sets what view the ColorPicker will render in the popup.
         */
        this.view = 'gradient';
        /**
         * Sets the read-only state of the ColorPicker.
         */
        this.readonly = false;
        /**
         * Sets the disabled state of the ColorPicker.
         */
        this.disabled = false;
        /**
         * Specifies the output format of the ColorPicker.
         * The input value may be in a different format. However, it will be parsed into the output `format`
         * after the component processes it.
         *
         * If the `gradient` view is used with the `opacity` option set to true, this setting will be ignored and `rgba` will be used instead.
         *
         * The supported values are:
         * * `rgba` (default)
         * * `hex`
         * * [`name`](https://www.w3.org/wiki/CSS/Properties/color/keywords)
         */
        this.format = 'rgba';
        /**
         * Fires each time the value is changed.
         */
        this.valueChange = new EventEmitter();
        /**
         * Fires each time the popup is about to open.
         * This event is preventable. If you cancel it, the popup will remain closed.
         */
        this.open = new EventEmitter();
        /**
         * Fires each time the popup is about to close.
         * This event is preventable. If you cancel it, the popup will remain open.
         */
        this.close = new EventEmitter();
        /**
         * Fires each time ColorPicker is focused.
         */
        this.onFocus = new EventEmitter();
        /**
         * Fires each time the ColorPicker is blurred.
         */
        this.onBlur = new EventEmitter();
        /**
         * Fires each time the left side of the ColorPicker wrapper is clicked.
         * The event is triggered regardless of whether a ColorPicker icon is set or not.
         *
         * The [`ActiveColorClickEvent`]({% slug api_inputs_activecolorclickevent %}) event provides the option to prevent the popup opening.
         */
        this.activeColorClick = new EventEmitter();
        this._tabindex = 0;
        this._popupSettings = { animate: true };
        this._paletteSettings = {};
        this._gradientSettings = { opacity: true, clearButton: false };
        this.notifyNgTouched = () => { };
        this.notifyNgChanged = () => { };
        this.dynamicRTLSubscription = localizationService.changes.subscribe(({ rtl }) => {
            this.direction = rtl ? 'rtl' : 'ltr';
        });
    }
    /**
     * Specifies the value of the initially selected color.
     */
    set value(value) {
        this._value = parseColor(value, this.format);
    }
    get value() {
        return this._value;
    }
    /**
     * Configures the popup of the ColorPicker.
     */
    set popupSettings(value) {
        this._popupSettings = Object.assign(this._popupSettings, value);
    }
    get popupSettings() {
        return this._popupSettings;
    }
    /**
     * Configures the palette that is displayed in the ColorPicker popup.
     */
    set paletteSettings(value) {
        this._paletteSettings = Object.assign(this._paletteSettings, value);
    }
    get paletteSettings() {
        return this._paletteSettings;
    }
    /**
     * Configures the gradient that is displayed in the ColorPicker popup.
     */
    set gradientSettings(value) {
        this._gradientSettings = Object.assign(this._gradientSettings, value);
    }
    get gradientSettings() {
        return this._gradientSettings;
    }
    /**
     * Specifies the [`tabindex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) of the component.
     */
    set tabindex(value) {
        const tabindex = Number(value);
        const defaultValue = 0;
        this._tabindex = !isNaN(tabindex) ? tabindex : defaultValue;
    }
    get tabindex() {
        return !this.disabled ? this._tabindex : undefined;
    }
    /**
     * Indicates whether the ColorPicker popup is open.
     */
    get isOpen() {
        return isPresent(this.popupRef);
    }
    /**
     * @hidden
     */
    get iconStyles() {
        if (this.iconClass) {
            return this.iconClass;
        }
        if (this.icon) {
            return `k-icon k-i-${this.icon}`;
        }
    }
    ngOnInit() {
        const defaultPreset = (this.format !== 'name') ? DEFAULT_PRESET : DEFAULT_ACCESSIBLE_PRESET;
        const settingsPalette = this._paletteSettings.palette;
        const presetColumns = typeof settingsPalette === 'string' && PALETTEPRESETS[settingsPalette] ?
            PALETTEPRESETS[settingsPalette].columns :
            undefined;
        this._paletteSettings = {
            palette: settingsPalette || defaultPreset,
            tileSize: this._paletteSettings.tileSize || 24,
            columns: this._paletteSettings.columns || presetColumns || 10
        };
    }
    ngOnChanges(changes) {
        if (changes.format && changes.format.currentValue === 'name') {
            this.view = 'palette';
        }
        if (this.view === 'gradient' && this.gradientSettings.opacity) {
            this.format = 'rgba';
            this.value = parseColor(this.value, this.format);
        }
    }
    ngOnDestroy() {
        this.closePopup();
        if (this.dynamicRTLSubscription) {
            this.dynamicRTLSubscription.unsubscribe();
        }
    }
    /**
     * @hidden
     */
    handleWrapperClick() {
        this.toggleWithEvents(!this.isOpen);
        this.focus();
    }
    /**
     * @hidden
     */
    handleActiveColorClick() {
        this.focus();
        const event = new ActiveColorClickEvent(this.value);
        this.activeColorClick.emit(event);
        if (!event.isOpenPrevented() || this.isOpen) {
            this.handleWrapperClick();
        }
    }
    /**
     * Focuses the wrapper of the ColorPicker.
     */
    focus() {
        if (this.disabled) {
            return;
        }
        this.wrapper.nativeElement.focus();
    }
    /**
     * @hidden
     */
    handleWrapperFocus() {
        if (isPresent(this.palette)) {
            this.palette.nativeElement.focus();
        }
        if (this.isFocused) {
            return;
        }
        this.isFocused = true;
        this.onFocus.emit();
    }
    /**
     * Blurs the ColorPicker.
     */
    blur() {
        this.wrapper.nativeElement.blur();
    }
    /**
     * @hidden
     */
    handleWrapperBlur() {
        if (this.isOpen) {
            return;
        }
        this.isFocused = false;
        this.onBlur.emit();
        this.notifyNgTouched();
    }
    /**
     * Clears the color value of the ColorPicker.
     */
    reset() {
        if (!isPresent(this.value)) {
            return;
        }
        this._value = undefined;
        this.notifyNgChanged(undefined);
    }
    /**
     * Toggles the popup of the ColorPicker.
     * Does not trigger the `open` and `close` events of the component.
     *
     * @param open An optional parameter. Specifies whether the popup will be opened or closed.
     */
    toggle(open) {
        if (this.disabled || this.readonly) {
            return;
        }
        this.closePopup();
        open = isPresent(open) ? open : !this.isOpen;
        if (open) {
            this.openPopup();
        }
    }
    /**
     * @hidden
     */
    handleValueChange(color, closePopup) {
        const parsedColor = parseColor(color, this.format);
        const valueChange = parsedColor !== this.value;
        if (closePopup) {
            this.toggleWithEvents(false);
            this.focus();
        }
        if (valueChange) {
            this.value = parsedColor;
            this.valueChange.emit(parsedColor);
            this.notifyNgChanged(parsedColor);
        }
    }
    /**
     * @hidden
     */
    handlePopupBlur(event) {
        const focusInPopupElement = this.popupRef.popupElement.contains(event.relatedTarget);
        const wrapperClicked = event.relatedTarget === this.wrapper.nativeElement;
        if (!this.isFocused || wrapperClicked || focusInPopupElement) {
            return;
        }
        this.isFocused = false;
        this.onBlur.emit();
        this.notifyNgTouched();
        this.toggleWithEvents(false);
    }
    /**
     * @hidden
     */
    writeValue(value) {
        this.value = value;
    }
    /**
     * @hidden
     */
    registerOnChange(fn) {
        this.notifyNgChanged = fn;
    }
    /**
     * @hidden
     */
    registerOnTouched(fn) {
        this.notifyNgTouched = fn;
    }
    /**
     * @hidden
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    /**
     * @hidden
     */
    handleWrapperKeyDown(event) {
        if (event.keyCode === Keys.ArrowDown || event.keyCode === Keys.Enter) {
            event.preventDefault();
            this.toggleWithEvents(true);
        }
    }
    /**
     * @hidden
     */
    handlePopupKeyDown(keyCode) {
        if (keyCode === Keys.Tab || keyCode === Keys.Escape) {
            this.toggleWithEvents(false);
            this.wrapper.nativeElement.focus();
        }
    }
    /**
     * @hidden
     * Used by the TextBoxContainer to determine if the component is empty.
     */
    isEmpty() {
        return false;
    }
    toggleWithEvents(open) {
        const sameState = this.isOpen === open;
        if (this.disabled || this.readonly || sameState) {
            return;
        }
        const eventArgs = new PreventableEvent();
        open ? this.open.emit(eventArgs) : this.close.emit(eventArgs);
        if (!eventArgs.isDefaultPrevented()) {
            this.toggle(open);
        }
    }
    openPopup() {
        const horizontalAlign = this.direction === "rtl" ? "right" : "left";
        const anchorPosition = { horizontal: horizontalAlign, vertical: "bottom" };
        const popupPosition = { horizontal: horizontalAlign, vertical: "top" };
        this.popupRef = this.popupService.open({
            anchor: this.wrapper,
            animate: this.popupSettings.animate,
            appendTo: this.popupSettings.appendTo,
            popupAlign: popupPosition,
            anchorAlign: anchorPosition,
            popupClass: 'k-colorpicker-popup',
            content: this.popupTemplate,
            positionMode: 'absolute'
        });
        this.popupRef.popupAnchorViewportLeave.subscribe(() => {
            this.toggleWithEvents(false);
            if (!this.isOpen) {
                this.wrapper.nativeElement.focus({
                    preventScroll: true
                });
            }
        });
    }
    closePopup() {
        if (!this.isOpen) {
            return;
        }
        this.popupRef.close();
        this.popupRef = null;
        this.palette = null;
    }
}
ColorPickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-colorpicker',
                providers: [{
                        multi: true,
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => ColorPickerComponent)
                    }, {
                        provide: KendoInput,
                        useExisting: forwardRef(() => ColorPickerComponent)
                    },
                    LocalizationService,
                    {
                        provide: L10N_PREFIX,
                        useValue: 'kendo.colorpicker'
                    }
                ],
                template: `
        <span
            #wrapper
            [ngClass]="{
                'k-picker-wrap': true,
                'k-state-disabled': this.disabled,
                'k-state-focused': this.isFocused
            }"
            role="listbox"
            [attr.aria-expanded]="isOpen"
            [id]="focusableId"
            [attr.tabindex]="tabindex"
            (focus)="handleWrapperFocus()"
            (blur)="handleWrapperBlur()"
            (mousedown)="$event.preventDefault()"
            (keydown)="handleWrapperKeyDown($event)"
        >
            <span *ngIf="!iconStyles" class="k-selected-color" [style.background-color]="value" (click)="handleActiveColorClick()">
                <span class="k-icon k-i-line" *ngIf="!value"></span>
            </span>
            <span *ngIf="iconStyles" class="k-tool-icon" [ngClass]="iconStyles" (click)="handleActiveColorClick()">
                <span class="k-selected-color" [style.background-color]="value"></span>
            </span>
            <span class="k-select" (click)="handleWrapperClick()">
                <span class="k-icon k-i-arrow-s"></span>
            </span>
        </span>
        <ng-template #popupTemplate>
            <kendo-colorgradient
                *ngIf="view === 'gradient' || view === 'combo'"
                kendoFocusOnDomReady
                [value]="value"
                [format]="format"
                [opacity]="gradientSettings.opacity"
                [clearButton]="gradientSettings.clearButton"
                (focusout)="handlePopupBlur($event)"
                (valueChange)="handleValueChange($event, false)"
                (keydown)="handlePopupKeyDown($event.keyCode)"
            >
            </kendo-colorgradient>
            <kendo-colorpalette
                #palette
                *ngIf="view === 'palette' || view === 'combo'"
                kendoFocusOnDomReady
                [palette]="paletteSettings.palette"
                [columns]="paletteSettings.columns"
                [tileSize]="paletteSettings.tileSize"
                [format]="format"
                [value]="value"
                (blur)="handlePopupBlur($event)"
                (cellSelection)="handleValueChange($event, true)"
                (mousedown)="$event.preventDefault()"
                (keydown)="handlePopupKeyDown($event.keyCode)"
            >
            </kendo-colorpalette>
        </ng-template>
        <ng-container #container></ng-container>
    `
            },] },
];
/** @nocollapse */
ColorPickerComponent.ctorParameters = () => [
    { type: PopupService },
    { type: LocalizationService }
];
ColorPickerComponent.propDecorators = {
    hostClasses: [{ type: HostBinding, args: ['class.k-widget',] }, { type: HostBinding, args: ['class.k-colorpicker',] }],
    direction: [{ type: HostBinding, args: ['attr.dir',] }],
    focusableId: [{ type: Input }],
    view: [{ type: Input }],
    readonly: [{ type: Input }],
    disabled: [{ type: Input }],
    format: [{ type: Input }],
    value: [{ type: Input }],
    popupSettings: [{ type: Input }],
    paletteSettings: [{ type: Input }],
    gradientSettings: [{ type: Input }],
    icon: [{ type: Input }],
    iconClass: [{ type: Input }],
    tabindex: [{ type: Input }],
    valueChange: [{ type: Output }],
    open: [{ type: Output }],
    close: [{ type: Output }],
    onFocus: [{ type: Output, args: ['focus',] }],
    onBlur: [{ type: Output, args: ['blur',] }],
    activeColorClick: [{ type: Output }],
    container: [{ type: ViewChild, args: ['container', { read: ViewContainerRef },] }],
    wrapper: [{ type: ViewChild, args: ['wrapper',] }],
    popupTemplate: [{ type: ViewChild, args: ['popupTemplate',] }],
    palette: [{ type: ViewChild, args: ['palette', { read: ElementRef },] }]
};
