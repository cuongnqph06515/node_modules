/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { EventEmitter, OnDestroy, ViewContainerRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { PopupService } from '@progress/kendo-angular-popup';
import { PopupSettings, PreventableEvent, PaletteSettings, OutputFormat, ActiveColorClickEvent, ColorPickerView, GradientSettings } from './models';
import { LocalizationService } from '@progress/kendo-angular-l10n';
/**
 * Represents the [Kendo UI ColorPicker component for Angular]({% slug overview_colorpicker %}).
 * Designed to replace the `<input type="color">` HTML5 tag which is not widely supported in browsers.
 */
export declare class ColorPickerComponent implements OnDestroy, ControlValueAccessor {
    private popupService;
    /**
     * @hidden
     */
    hostClasses: boolean;
    /**
     * @hidden
     */
    direction: string;
    /**
     * @hidden
     */
    focusableId: string;
    /**
     * Sets what view the ColorPicker will render in the popup.
     */
    view: ColorPickerView;
    /**
     * Sets the read-only state of the ColorPicker.
     */
    readonly: boolean;
    /**
     * Sets the disabled state of the ColorPicker.
     */
    disabled: boolean;
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
    format: OutputFormat;
    /**
     * Specifies the value of the initially selected color.
     */
    value: string;
    /**
     * Configures the popup of the ColorPicker.
     */
    popupSettings: PopupSettings;
    /**
     * Configures the palette that is displayed in the ColorPicker popup.
     */
    paletteSettings: PaletteSettings;
    /**
     * Configures the gradient that is displayed in the ColorPicker popup.
     */
    gradientSettings: GradientSettings;
    /**
     * Defines the name of an [existing icon in the Kendo UI theme]({% slug icons %}).
     * Provide only the name of the icon without the `k-icon` or the `k-i-` prefixes.
     * For example, `edit-tools` will be parsed to `k-icon k-i-edit-tools`.
     */
    icon: string;
    /**
     * A CSS class name which displays an icon in the ColorPicker button.
     * `iconClass` is compatible with the `ngClass` syntax.
     *
     * Takes precedence over `icon` if both are defined.
     */
    iconClass: string | Array<string> | {
        [key: string]: boolean;
    };
    /**
     * Specifies the [`tabindex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) of the component.
     */
    tabindex: number;
    /**
     * Fires each time the value is changed.
     */
    valueChange: EventEmitter<any>;
    /**
     * Fires each time the popup is about to open.
     * This event is preventable. If you cancel it, the popup will remain closed.
     */
    open: EventEmitter<PreventableEvent>;
    /**
     * Fires each time the popup is about to close.
     * This event is preventable. If you cancel it, the popup will remain open.
     */
    close: EventEmitter<PreventableEvent>;
    /**
     * Fires each time ColorPicker is focused.
     */
    onFocus: EventEmitter<any>;
    /**
     * Fires each time the ColorPicker is blurred.
     */
    onBlur: EventEmitter<any>;
    /**
     * Fires each time the left side of the ColorPicker wrapper is clicked.
     * The event is triggered regardless of whether a ColorPicker icon is set or not.
     *
     * The [`ActiveColorClickEvent`]({% slug api_inputs_activecolorclickevent %}) event provides the option to prevent the popup opening.
     */
    activeColorClick: EventEmitter<ActiveColorClickEvent>;
    /**
     * Indicates whether the ColorPicker wrapper is focused.
     */
    isFocused: boolean;
    /**
     * Indicates whether the ColorPicker popup is open.
     */
    readonly isOpen: boolean;
    /**
     * @hidden
     */
    readonly iconStyles: string | string[] | {
        [key: string]: boolean;
    };
    /**
     * Provides a reference to a container element inside the component markup.
     * The container element references the location of the appended popup&mdash;
     * for example, inside the component markup.
     */
    container: ViewContainerRef;
    private wrapper;
    private popupTemplate;
    private palette;
    private popupRef;
    private _value;
    private _tabindex;
    private _popupSettings;
    private _paletteSettings;
    private _gradientSettings;
    private dynamicRTLSubscription;
    constructor(popupService: PopupService, localizationService: LocalizationService);
    ngOnInit(): void;
    ngOnChanges(changes: any): void;
    ngOnDestroy(): void;
    /**
     * @hidden
     */
    handleWrapperClick(): void;
    /**
     * @hidden
     */
    handleActiveColorClick(): void;
    /**
     * Focuses the wrapper of the ColorPicker.
     */
    focus(): void;
    /**
     * @hidden
     */
    handleWrapperFocus(): void;
    /**
     * Blurs the ColorPicker.
     */
    blur(): void;
    /**
     * @hidden
     */
    handleWrapperBlur(): void;
    /**
     * Clears the color value of the ColorPicker.
     */
    reset(): void;
    /**
     * Toggles the popup of the ColorPicker.
     * Does not trigger the `open` and `close` events of the component.
     *
     * @param open An optional parameter. Specifies whether the popup will be opened or closed.
     */
    toggle(open?: boolean): void;
    /**
     * @hidden
     */
    handleValueChange(color: string, closePopup: boolean): void;
    /**
     * @hidden
     */
    handlePopupBlur(event: FocusEvent): void;
    /**
     * @hidden
     */
    writeValue(value: string): void;
    /**
     * @hidden
     */
    registerOnChange(fn: any): void;
    /**
     * @hidden
     */
    registerOnTouched(fn: any): void;
    /**
     * @hidden
     */
    setDisabledState(isDisabled: boolean): void;
    /**
     * @hidden
     */
    handleWrapperKeyDown(event: any): void;
    /**
     * @hidden
     */
    handlePopupKeyDown(keyCode: number): void;
    /**
     * @hidden
     * Used by the TextBoxContainer to determine if the component is empty.
     */
    isEmpty(): boolean;
    private toggleWithEvents;
    private openPopup;
    private closePopup;
    private notifyNgTouched;
    private notifyNgChanged;
}
