/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ElementRef, Renderer2, NgZone, EventEmitter, SimpleChanges, OnChanges, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { OutputFormat, KendoDragEvent, HSVA } from './models';
import { LocalizationService } from '@progress/kendo-angular-l10n';
/**
 * The ColorGradient component enables smooth color transitions and provides options for selecting specific colors over the drag handle.
 * The ColorGradient is independently used by `kendo-colorpicker` and can be directly added to the page.
 */
export declare class ColorGradientComponent implements OnChanges, OnDestroy, ControlValueAccessor {
    private host;
    private ngZone;
    private renderer;
    private cdr;
    hostClasses: boolean;
    readonly disabledClass: boolean;
    readonly hostTabindex: number;
    /**
     * @hidden
     */
    readonly gradientId: string;
    /**
     * @hidden
     */
    id: string;
    /**
     * @hidden
     */
    direction: string;
    /**
     * Defines whether the alpha slider will be displayed.
     */
    opacity: boolean;
    /**
     * Sets the disabled state of the ColorGradient.
     */
    disabled: boolean;
    /**
     * Sets the read-only state of the ColorGradient.
     */
    readonly: boolean;
    /**
     * Specifies whether the ColorGradient should display a 'Clear color' button.
     */
    clearButton: boolean;
    /**
     * Specifies the value of the initially selected color.
     */
    value: string;
    /**
     * Specifies the [`tabindex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) of the component.
     */
    tabindex: number;
    /**
     * Fires each time the user selects a new color.
     */
    valueChange: EventEmitter<string>;
    /**
     * @hidden
     */
    backgroundColor: string;
    /**
     * @hidden
     *
     * Represents the currently selected `hue`, `saturation`, `value`, and `alpha` values.
     * The values are initially set in `ngOnInit` or in `ngOnChanges` and are
     * updated on moving the drag handle or the sliders.
     */
    hsva: HSVA;
    /**
     * Indicates whether the ColorGradient or any of its content is focused.
     */
    readonly isFocused: boolean;
    /**
     * @hidden
     */
    readonly alphaSliderValue: number;
    /**
     * Specifies the output format of the ColorGradientComponent.
     * The input value may be in a different format. However, it will be parsed into the output `format`
     * after the component processes it.
     *
     * The supported values are:
     * * (Default) `rgba`
     * * `hex`
     */
    format: OutputFormat;
    private _value;
    private _tabindex;
    private listeners;
    private dynamicRTLSubscription;
    private alphaSlider;
    private gradientWrapper;
    private dragHandle;
    private readonly gradientRect;
    constructor(host: ElementRef, ngZone: NgZone, renderer: Renderer2, cdr: ChangeDetectorRef, localizationService: LocalizationService);
    ngAfterViewInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    /**
     * Focuses the component.
     */
    focus(): void;
    /**
     * @hidden
     */
    reset(): void;
    /**
     * @hidden
     */
    handleDragPress(args: KendoDragEvent): void;
    /**
     * @hidden
     */
    onHandleDrag(args: any): void;
    /**
     * @hidden
     */
    onHandleRelease(): void;
    /**
     * @hidden
     */
    changePosition(position: KendoDragEvent): void;
    /**
     * @hidden
     */
    handleHueSliderChange(hue: number): void;
    /**
     * @hidden
     */
    handleAlphaSliderChange(alpha: number): void;
    /**
     * @hidden
     */
    handleInputsValueChange(color: string): void;
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
     * Used by the TextBoxContainer to determine if the component is empty.
     */
    isEmpty(): boolean;
    private notifyNgChanged;
    private notifyNgTouched;
    private moveDragHandle;
    private updateUI;
    private handleValueChange;
    private setDragHandleElementPosition;
    private setAlphaSliderBackground;
    private addEventListeners;
}
