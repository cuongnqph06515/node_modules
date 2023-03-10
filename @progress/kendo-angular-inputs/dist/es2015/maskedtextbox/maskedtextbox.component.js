/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, ElementRef, EventEmitter, HostBinding, HostListener, Inject, Input, Optional, Output, Renderer2, ViewChild, forwardRef, NgZone, Injector, isDevMode, ChangeDetectorRef } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { RTL } from '@progress/kendo-angular-l10n';
import { MaskingService } from './masking.service';
import { isChanged, anyChanged, guid, hasObservers, KendoInput } from '@progress/kendo-angular-common';
import { invokeElementMethod } from '../common/dom-utils';
import { requiresZoneOnBlur, isPresent } from '../common/utils';
const resolvedPromise = Promise.resolve(null);
const FOCUSED = 'k-state-focused';
/**
 * Represents the [Kendo UI MaskedTextBox component for Angular]({% slug overview_maskedtextbox %}).
 *
 * @example
 * ```ts-no-run
 *
 * _@Component({
 *     selector: 'my-app',
 *     template: `
 *      <kendo-maskedtextbox
 *          [mask]="mask"
 *          [value]="value">
 *      </kendo-maskedtextbox>
 *     `
 * })
 *
 * class AppComponent {
 *  public value: string = "9580128055807792";
 *  public mask: string = "0000-0000-0000-0000";
 * }
 * ```
 */
export class MaskedTextBoxComponent {
    constructor(service, renderer, hostElement, ngZone, injector, changeDetector, rtl) {
        this.service = service;
        this.renderer = renderer;
        this.hostElement = hostElement;
        this.ngZone = ngZone;
        this.injector = injector;
        this.changeDetector = changeDetector;
        /**
         * @hidden
         */
        this.focusableId = `k-${guid()}`;
        /**
         * Determines whether the MaskedTextBox is disabled ([see example]({% slug disabled_maskedtextbox %})).
         */
        this.disabled = false;
        /**
         * Determines whether the MaskedTextBox is in its read-only state ([see example]({% slug readonly_maskedtextbox %})).
         */
        this.readonly = false;
        this.hostClasses = true;
        /**
         * Represents a prompt character for the masked value.
         * @default `_`
         */
        this.prompt = '_';
        /**
         * Indicates a character which represents an empty position in the raw value.
         * @default ' '
         */
        this.promptPlaceholder = ' ';
        /**
         * Indicates whether to include literals in the raw value  ([see example]({% slug value_maskedtextbox %})).
         * @default false
         */
        this.includeLiterals = false;
        /**
         * Specifies if the mask should be shown on focus for empty value.
         */
        this.maskOnFocus = false;
        /**
         * Determines whether the built-in mask validator is enforced when a form is validated
         * ([see example]({% slug validation_maskedtextbox %})).
         * @default true
         */
        this.maskValidation = true;
        /**
         * Specifies the [`tabindex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) of the component.
         */
        this.tabindex = 0;
        /**
         * Fires each time the user focuses the `input` element.
         *
         * > To wire the event programmatically, use the `onFocus` property.
         *
         * @example
         * ```ts-no-run
         * _@Component({
         * selector: 'my-app',
         * template: `
         *  <kendo-maskedtextbox (focus)="handleFocus()"></kendo-maskedtextbox>
         * `
         * })
         * class AppComponent {
         *   public handleFocus(): void {
         *      console.log("Component is focused");
         *   }
         * }
         * ```
         */
        this.onFocus = new EventEmitter(); //tslint:disable-line:no-output-rename
        /**
         * Fires each time the `input` element gets blurred.
         *
         * > To wire the event programmatically, use the `onBlur` property.
         *
         * @example
         * ```ts-no-run
         * _@Component({
         * selector: 'my-app',
         * template: `
         *  <kendo-maskedtextbox (blur)="handleBlur()"></kendo-maskedtextbox>
         * `
         * })
         * class AppComponent {
         *   public handleBlur(): void {
         *      console.log("Component is blurred");
         *   }
         * }
         * ```
         */
        this.onBlur = new EventEmitter(); //tslint:disable-line:no-output-rename
        /**
         * Fires each time the value changes.
         */
        this.valueChange = new EventEmitter();
        this.focusClick = false;
        this.defaultRules = {
            "#": /[\d\s\+\-]/,
            "&": /[\S]/,
            "0": /[\d]/,
            "9": /[\d\s]/,
            "?": /[a-zA-Z\s]/,
            "A": /[a-zA-Z0-9]/,
            "C": /./,
            "L": /[a-zA-Z]/,
            "a": /[a-zA-Z0-9\s]/
        };
        this.isPasted = false;
        this.selection = [0, 0];
        /**
         * @hidden
         */
        this.handleFocus = () => {
            this.focused = true;
            if (this.maskOnFocus && this.emptyMask) {
                this.updateInput(this.service.maskRaw(this.value));
                this.ngZone.runOutsideAngular(() => {
                    setTimeout(() => { this.setSelection(0, 0); }, 0);
                });
            }
            if (hasObservers(this.onFocus)) {
                this.ngZone.run(() => {
                    this.onFocus.emit();
                });
            }
        };
        /**
         * @hidden
         */
        this.handleClick = () => {
            if (this.focused && !this.focusClick) {
                this.focusClick = true;
                const { selectionStart, selectionEnd } = this.input.nativeElement;
                if (selectionStart === selectionEnd) {
                    this.setFocusSelection();
                }
            }
        };
        /**
         * @hidden
         */
        this.handleBlur = () => {
            this.changeDetector.markForCheck();
            this.focused = false;
            this.focusClick = false;
            if (this.maskOnFocus && this.emptyMask) {
                this.updateInput(this.maskedValue);
            }
            if (hasObservers(this.onBlur) || requiresZoneOnBlur(this.control)) {
                this.ngZone.run(() => {
                    this.onTouched();
                    this.onBlur.emit();
                });
            }
        };
        this.onChange = (_) => { };
        this.onTouched = () => { };
        this.direction = rtl ? 'rtl' : 'ltr';
        this.updateService();
    }
    get hostDisabledClass() {
        return this.disabled;
    }
    /**
     * Exposes the RegExp-based mask validation array ([see example]({% slug masks_maskedtextbox %})).
     */
    get rules() {
        return this._rules || this.defaultRules;
    }
    set rules(value) {
        this._rules = Object.assign({}, this.defaultRules, value);
    }
    /**
     * @hidden
     */
    set tabIndex(tabIndex) {
        this.tabindex = tabIndex;
    }
    get tabIndex() {
        return this.tabindex;
    }
    ngOnInit() {
        if (this.hostElement) {
            this.renderer.removeAttribute(this.hostElement.nativeElement, "tabindex");
        }
        this.control = this.injector.get(NgControl, null);
    }
    /**
     * @hidden
     * Used by the TextBoxContainer to determine if the MaskedTextBox is empty.
     */
    isEmpty() {
        if (this.input) {
            return !Boolean(this.input.nativeElement.value);
        }
    }
    /**
     * @hidden
     */
    handleDragDrop() {
        return false;
    }
    /**
     * Focuses the MaskedTextBox.
     *
     * @example
     * ```ts-no-run
     * _@Component({
     * selector: 'my-app',
     * template: `
     *  <button (click)="maskedinput.focus()">Focus the input</button>
     *  <kendo-maskedtextbox #maskedinput></kendo-maskedtextbox>
     * `
     * })
     * class AppComponent { }
     * ```
     */
    focus() {
        if (!this.input) {
            return;
        }
        this.input.nativeElement.focus();
        this.setFocusSelection();
    }
    /**
     * Blurs the MaskedTextBox.
     */
    blur() {
        if (!this.input) {
            return;
        }
        this.input.nativeElement.blur();
    }
    /**
     * @hidden
     */
    pasteHandler(e) {
        const { selectionStart, selectionEnd } = e.target;
        if (selectionEnd === selectionStart) {
            return;
        }
        this.isPasted = true;
        this.selection = [selectionStart, selectionEnd];
    }
    /**
     * @hidden
     */
    inputHandler(e) {
        const value = e.target.value;
        const [start, end] = this.selection;
        if (!this.mask) {
            this.updateValue(value);
            this.isPasted = false;
            return;
        }
        let result;
        if (this.isPasted) {
            this.isPasted = false;
            const rightPart = this.maskedValue.length - end;
            const to = value.length - rightPart;
            result = this.service.maskInRange(value.slice(start, to), this.maskedValue, start, end);
        }
        else {
            result = this.service.maskInput(value, this.maskedValue, e.target.selectionStart);
        }
        this.updateInput(result.value, result.selection);
        this.updateValue(result.value);
    }
    /**
     * @hidden
     */
    ngOnChanges(changes) {
        if (changes.value) {
            this.value = this.normalizeValue();
        }
        if (!this.mask) {
            this.updateInput(this.value);
            return;
        }
        const next = this.extractChanges(changes);
        this.updateService(next);
        if (isChanged('value', changes)) {
            const maskedValue = this.service.maskRaw(this.value);
            if (maskedValue !== this.maskedValue) {
                this.updateInput(maskedValue);
            }
        }
        else if (anyChanged(['promptPlaceholder', 'includeLiterals'], changes)) {
            resolvedPromise.then(() => {
                this.updateValue(this.maskedValue);
            });
        }
        else {
            this.updateInput(this.service.maskRaw(this.value));
        }
    }
    /**
     * @hidden
     * Writes a new value to the element.
     */
    writeValue(value) {
        this.value = this.normalizeValue(value);
        this.updateInput(this.service.maskRaw(this.value));
    }
    /**
     * @hidden
     * Sets the function that will be called when a `change` event is triggered.
     */
    registerOnChange(fn) {
        this.onChange = fn;
    }
    /**
     * @hidden
     * Sets the function that will be called when a `touch` event is triggered.
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    /**
     * @hidden
     * Called when the status of the component changes to or from `disabled`.
     * Depending on the value, it enables or disables the appropriate DOM element.
     *
     * @param isDisabled
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    /**
     * @hidden
     */
    validate(_) {
        if (this.maskValidation === false || !this.mask) {
            return null;
        }
        if (!this.service.validationValue(this.maskedValue)) {
            return null;
        }
        if (this.maskedValue.indexOf(this.prompt) !== -1) {
            return {
                patternError: {
                    mask: this.mask,
                    maskedValue: this.maskedValue,
                    value: this.value
                }
            };
        }
        return null;
    }
    /**
     * @hidden
     */
    updateValue(maskedValue) {
        if (this.mask && !this.service.validationValue(maskedValue)) {
            this.value = '';
        }
        else {
            this.value = this.service.rawValue(maskedValue);
        }
        this.onChange(this.value);
        this.valueChange.emit(this.value);
    }
    updateInput(maskedValue = '', selection) {
        this.maskedValue = maskedValue;
        const value = this.maskOnFocus && !this.focused && this.emptyMask ? '' : maskedValue;
        this.renderer.setProperty(this.input.nativeElement, "value", value);
        if (selection !== undefined) {
            this.setSelection(selection, selection);
        }
    }
    extractChanges(changes) {
        return Object.keys(changes).filter(key => key !== 'rules').reduce((obj, key) => {
            obj[key] = changes[key].currentValue;
            return obj;
        }, {}); // tslint:disable-line:align
    }
    updateService(extra) {
        const config = Object.assign({
            includeLiterals: this.includeLiterals,
            mask: this.mask,
            prompt: this.prompt,
            promptPlaceholder: this.promptPlaceholder,
            rules: this.rules
        }, extra); // tslint:disable-line:align
        this.service.update(config);
    }
    setSelection(start = this.selection[0], end = this.selection[1]) {
        if (this.focused) {
            invokeElementMethod(this.input, 'setSelectionRange', start, end);
        }
    }
    get emptyMask() {
        return this.service.maskRaw() === this.maskedValue;
    }
    setFocusSelection() {
        const selectionStart = this.input.nativeElement.selectionStart;
        const index = this.maskedValue ? this.maskedValue.indexOf(this.prompt) : 0;
        if (index >= 0 && index < selectionStart) {
            this.selection = [index, index];
            this.setSelection();
        }
    }
    get focused() {
        return this.isFocused;
    }
    set focused(value) {
        if (this.isFocused !== value && this.hostElement) {
            const element = this.hostElement.nativeElement;
            if (value) {
                this.renderer.addClass(element, FOCUSED);
            }
            else {
                this.renderer.removeClass(element, FOCUSED);
            }
            this.isFocused = value;
        }
    }
    normalizeValue(value = this.value) {
        const present = isPresent(value);
        if (present && typeof value !== 'string') {
            if (isDevMode()) {
                throw new Error('The MaskedTextBox component supports only string values.');
            }
            return String(value);
        }
        return present ? value : '';
    }
}
MaskedTextBoxComponent.decorators = [
    { type: Component, args: [{
                exportAs: 'kendoMaskedTextBox',
                providers: [
                    MaskingService,
                    {
                        multi: true,
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => MaskedTextBoxComponent) /* tslint:disable-line */
                    },
                    {
                        multi: true,
                        provide: NG_VALIDATORS,
                        useExisting: forwardRef(() => MaskedTextBoxComponent) /* tslint:disable-line */
                    },
                    {
                        provide: KendoInput,
                        useExisting: forwardRef(() => MaskedTextBoxComponent)
                    }
                ],
                selector: 'kendo-maskedtextbox',
                template: `
        <input type="text"
            #input
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
            class="k-textbox"
            [id]="focusableId"
            [tabindex]="tabIndex"
            [attr.title]="title"
            [disabled]="disabled"
            [readonly]="readonly"
            [kendoEventsOutsideAngular]="{
                focus: handleFocus,
                blur: handleBlur,
                click: handleClick,
                dragstart: handleDragDrop,
                drop: handleDragDrop
            }"
        />
    `
            },] },
];
/** @nocollapse */
MaskedTextBoxComponent.ctorParameters = () => [
    { type: MaskingService },
    { type: Renderer2 },
    { type: ElementRef },
    { type: NgZone },
    { type: Injector },
    { type: ChangeDetectorRef },
    { type: Boolean, decorators: [{ type: Optional }, { type: Inject, args: [RTL,] }] }
];
MaskedTextBoxComponent.propDecorators = {
    focusableId: [{ type: Input }],
    disabled: [{ type: Input }],
    readonly: [{ type: Input }],
    title: [{ type: Input }],
    direction: [{ type: HostBinding, args: ['attr.dir',] }],
    hostClasses: [{ type: HostBinding, args: ['class.k-widget',] }, { type: HostBinding, args: ['class.k-maskedtextbox',] }],
    hostDisabledClass: [{ type: HostBinding, args: ['class.k-state-disabled',] }],
    mask: [{ type: Input }],
    value: [{ type: Input }],
    rules: [{ type: Input }],
    prompt: [{ type: Input }],
    promptPlaceholder: [{ type: Input }],
    includeLiterals: [{ type: Input }],
    maskOnFocus: [{ type: Input }],
    maskValidation: [{ type: Input }],
    tabindex: [{ type: Input }],
    tabIndex: [{ type: Input }],
    onFocus: [{ type: Output, args: ['focus',] }],
    onBlur: [{ type: Output, args: ['blur',] }],
    valueChange: [{ type: Output }],
    input: [{ type: ViewChild, args: ['input', { static: true },] }],
    pasteHandler: [{ type: HostListener, args: ['paste', ['$event'],] }],
    inputHandler: [{ type: HostListener, args: ['input', ['$event'],] }]
};
