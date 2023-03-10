/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ElementRef, EventEmitter, OnChanges, OnDestroy, Renderer2, NgZone, ChangeDetectorRef, Injector } from '@angular/core';
import { ControlValueAccessor, AbstractControl, NgControl, Validator } from '@angular/forms';
import { IntlService, NumberFormatOptions } from '@progress/kendo-angular-intl';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { ArrowDirection } from './arrow-direction';
import { Subscription } from 'rxjs';
/**
 * Represents the [Kendo UI NumericTextBox component for Angular]({% slug overview_numerictextbox %}).
 */
export declare class NumericTextBoxComponent implements ControlValueAccessor, OnChanges, OnDestroy, Validator {
    private intl;
    private renderer;
    private localizationService;
    private injector;
    private ngZone;
    private changeDetector;
    private hostElement;
    /**
     * @hidden
     */
    focusableId: string;
    /**
     * Determines whether the NumericTextBox is disabled ([see example]({% slug disabled_numerictextbox %})).
     */
    disabled: boolean;
    /**
     * Determines whether the NumericTextBox is in its read-only state ([see example]({% slug readonly_numerictextbox %})).
     */
    readonly: boolean;
    /**
     * Sets the title of the `input` element of the NumericTextBox.
     */
    title: string;
    /**
     * Specifies whether the value will be auto-corrected based on the minimum and maximum values
     * ([see example]({% slug precision_numerictextbox %})).
     */
    autoCorrect: boolean;
    /**
     * Specifies the number format which is used when the NumericTextBox is not focused
     * ([see example]({% slug formats_numerictextbox %})).
     * If `format` is set to `null` or `undefined`, the default format will be used.
     */
    format: string | NumberFormatOptions | null | undefined;
    /**
     * Specifies the greatest value that is valid
     * ([see example]({% slug precision_numerictextbox %}#toc-value-ranges)).
     */
    max: number;
    /**
     * Specifies the smallest value that is valid
     * ([see example]({% slug precision_numerictextbox %}#toc-value-ranges)).
     */
    min: number;
    /**
     * Specifies the number of decimals that the user can enter when the input is focused
     * ([see example]({% slug precision_numerictextbox %})).
     */
    decimals: number;
    /**
     * Specifies the input placeholder.
     */
    placeholder: string;
    /**
     * Specifies the value that is used to increment or decrement the component value
     * ([see example]({% slug predefinedsteps_numerictextbox %})).
     */
    step: number;
    /**
     * Specifies whether the **Up** and **Down** spin buttons will be rendered
     * ([see example]({% slug spinbuttons_numerictextbox %})).
     */
    spinners: boolean;
    /**
     * Determines whether the built-in minimum or maximum validators are enforced when a form is validated.
     *
     * > The 4.2.0 Angular version introduces the `min` and `max` validation directives. As a result, even if you set `rangeValidation`
     * to `false`, the built-in Angular validators will be executed.
     */
    rangeValidation: boolean;
    /**
     * Specifies the [`tabindex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) of the component.
     */
    tabindex: number;
    /**
     * @hidden
     */
    tabIndex: number;
    /**
     * Determines whether the whole value will be selected when the NumericTextBox is clicked. Defaults to `true`.
     */
    selectOnFocus: boolean;
    /**
     * Specifies the value of the NumericTextBox
     * ([see example]({% slug formats_numerictextbox %})).
     */
    value: number;
    /**
     * Fires each time the user selects a new value ([see example]({% slug overview_numerictextbox %}#toc-events)).
     */
    valueChange: EventEmitter<any>;
    /**
     * Fires each time the user focuses the `input` element ([see example]({% slug overview_numerictextbox %}#toc-events)).
     */
    onFocus: EventEmitter<any>;
    /**
     * Fires each time the `input` element gets blurred ([see example]({% slug overview_numerictextbox %}#toc-events)).
     */
    onBlur: EventEmitter<any>;
    /**
     * @hidden
     */
    numericInput: ElementRef;
    numericWrap: ElementRef;
    direction: string;
    /**
     * @hidden
     */
    ArrowDirection: any;
    /**
     * @hidden
     */
    arrowDirection: ArrowDirection;
    readonly widgetClasses: boolean;
    protected subscriptions: Subscription;
    protected inputValue: string;
    protected spinTimeout: number;
    protected isFocused: boolean;
    protected minValidateFn: any;
    protected maxValidateFn: any;
    protected numericRegex: RegExp;
    protected _format: string | NumberFormatOptions;
    protected previousSelection: any;
    protected pressedKey: any;
    protected control: NgControl;
    protected isPasted: boolean;
    protected mouseDown: boolean;
    private ngChange;
    private ngTouched;
    private ngValidatorChange;
    constructor(intl: IntlService, renderer: Renderer2, localizationService: LocalizationService, injector: Injector, ngZone: NgZone, changeDetector: ChangeDetectorRef, hostElement: ElementRef);
    ngOnInit(): void;
    /**
     * @hidden
     */
    increasePress: (e: any) => void;
    /**
     * @hidden
     */
    decreasePress: (e: any) => void;
    /**
     * @hidden
     */
    releaseArrow: () => void;
    /**
     * @hidden
     */
    ngOnChanges(changes: any): void;
    /**
     * @hidden
     */
    ngOnDestroy(): void;
    /**
     * @hidden
     */
    validate(control: AbstractControl): {
        [key: string]: any;
    };
    /**
     * @hidden
     */
    registerOnValidatorChange(fn: Function): void;
    /**
     * @hidden
     */
    writeValue(value: number): void;
    /**
     * @hidden
     */
    registerOnChange(fn: () => any): void;
    /**
     * @hidden
     */
    registerOnTouched(fn: () => any): void;
    /**
     * @hidden
     * Called when the status of the component changes to or from `disabled`.
     * Depending on the value, it enables or disables the appropriate DOM element.
     *
     * @param isDisabled
     */
    setDisabledState(isDisabled: boolean): void;
    /**
     * Focuses the NumericTextBox.
     *
     * @example
     * ```ts-no-run
     * _@Component({
     * selector: 'my-app',
     * template: `
     *  <button (click)="numerictextbox.focus()">Focus NumericTextBox</button>
     *  <kendo-numerictextbox #numerictextbox></kendo-numerictextbox>
     * `
     * })
     * class AppComponent { }
     * ```
     */
    focus(): void;
    /**
     * Blurs the NumericTextBox.
     */
    blur(): void;
    /**
     * Notifies the `NumericTextBoxComponent` that the input value should be changed.
     * Can be used to update the input after setting the component properties directly.
     */
    notifyValueChange(): void;
    /**
     * @hidden
     */
    handlePaste: () => void;
    /**
     * @hidden
     */
    handleInput: () => void;
    /**
     * @hidden
     */
    handleDragEnter: () => void;
    /**
     * @hidden
     */
    handleMouseDown: () => void;
    /**
     * @hidden
     */
    handleFocus: () => void;
    /**
     * @hidden
     */
    handleBlur: () => void;
    /**
     * @hidden
     */
    handleKeyDown: (e: any) => void;
    /**
     * @hidden
     */
    handleWheel: (e: any) => void;
    /**
     * @hidden
     */
    readonly incrementTitle: string;
    /**
     * @hidden
     */
    readonly decrementTitle: string;
    private readonly decimalSeparator;
    private elementValue;
    private focused;
    private readonly hasDecimals;
    private readonly isDisabled;
    private arrowPress;
    private updateValue;
    private replaceNumpadDotValue;
    private isValid;
    private spin;
    private addStep;
    private setSelection;
    private limitValue;
    private limitInputValue;
    private tryPadValue;
    private isInRange;
    private restrictModelValue;
    private restrictDecimals;
    private formatInputValue;
    private formatValue;
    private setInputValue;
    private verifySettings;
    private verifyValue;
    private parseOptions;
    private intlChange;
    private hasTrailingZeros;
    private selectAll;
    private selectCaret;
    private numberOfLeadingZeroes;
    private adjustSignificantChars;
}
