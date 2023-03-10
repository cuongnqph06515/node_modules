/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, ElementRef, EventEmitter, HostBinding, Input, Output, Renderer2, ViewChild, forwardRef, isDevMode, NgZone, ChangeDetectorRef, Injector } from '@angular/core';
import { anyChanged, hasObservers, Keys, guid, KendoInput } from '@progress/kendo-angular-common';
import { areSame, requiresZoneOnBlur } from '../common/utils';
import { invokeElementMethod } from '../common/dom-utils';
import { add, toFixedPrecision, limitPrecision } from '../common/math';
import { createMaxValidator } from '../validators/max.validator';
import { createMinValidator } from '../validators/min.validator';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, NgControl } from '@angular/forms';
import { IntlService } from '@progress/kendo-angular-intl';
import { L10N_PREFIX, LocalizationService } from '@progress/kendo-angular-l10n';
import { MIN_DOC_LINK, MAX_DOC_LINK, POINT, INITIAL_SPIN_DELAY, SPIN_DELAY, EXPONENT_REGEX } from './constants';
import { defined, noop, numericRegex, isNumber, pad, decimalPart, getDeltaFromMouseWheel, getCaretPosition, extractSignificantNumericChars } from './utils';
import { ArrowDirection } from './arrow-direction';
import { mobileOS } from '@progress/kendo-common';
var PARSABLE_OPTIONS = ['min', 'max', 'step', 'decimals'];
var PARSABLE_DEFAULTS = {
    decimals: null,
    max: null,
    min: null,
    step: 1
};
var FOCUSED = 'k-state-focused';
var FORMATTED_VALUE = 'k-formatted-value';
/**
 * Represents the [Kendo UI NumericTextBox component for Angular]({% slug overview_numerictextbox %}).
 */
var NumericTextBoxComponent = /** @class */ (function () {
    function NumericTextBoxComponent(intl, renderer, localizationService, injector, ngZone, changeDetector, hostElement) {
        var _this = this;
        this.intl = intl;
        this.renderer = renderer;
        this.localizationService = localizationService;
        this.injector = injector;
        this.ngZone = ngZone;
        this.changeDetector = changeDetector;
        this.hostElement = hostElement;
        /**
         * @hidden
         */
        this.focusableId = "k-" + guid();
        /**
         * Determines whether the NumericTextBox is disabled ([see example]({% slug disabled_numerictextbox %})).
         */
        this.disabled = false;
        /**
         * Determines whether the NumericTextBox is in its read-only state ([see example]({% slug readonly_numerictextbox %})).
         */
        this.readonly = false;
        /**
         * Sets the title of the `input` element of the NumericTextBox.
         */
        this.title = '';
        /**
         * Specifies whether the value will be auto-corrected based on the minimum and maximum values
         * ([see example]({% slug precision_numerictextbox %})).
         */
        this.autoCorrect = false;
        /**
         * Specifies the number of decimals that the user can enter when the input is focused
         * ([see example]({% slug precision_numerictextbox %})).
         */
        this.decimals = null;
        /**
         * Specifies the value that is used to increment or decrement the component value
         * ([see example]({% slug predefinedsteps_numerictextbox %})).
         */
        this.step = 1;
        /**
         * Specifies whether the **Up** and **Down** spin buttons will be rendered
         * ([see example]({% slug spinbuttons_numerictextbox %})).
         */
        this.spinners = true;
        /**
         * Determines whether the built-in minimum or maximum validators are enforced when a form is validated.
         *
         * > The 4.2.0 Angular version introduces the `min` and `max` validation directives. As a result, even if you set `rangeValidation`
         * to `false`, the built-in Angular validators will be executed.
         */
        this.rangeValidation = true;
        /**
         * Specifies the [`tabindex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) of the component.
         */
        this.tabindex = 0;
        /**
         * Determines whether the whole value will be selected when the NumericTextBox is clicked. Defaults to `true`.
         */
        this.selectOnFocus = true;
        /**
         * Specifies the value of the NumericTextBox
         * ([see example]({% slug formats_numerictextbox %})).
         */
        this.value = null;
        /**
         * Fires each time the user selects a new value ([see example]({% slug overview_numerictextbox %}#toc-events)).
         */
        this.valueChange = new EventEmitter();
        /**
         * Fires each time the user focuses the `input` element ([see example]({% slug overview_numerictextbox %}#toc-events)).
         */
        this.onFocus = new EventEmitter();
        /**
         * Fires each time the `input` element gets blurred ([see example]({% slug overview_numerictextbox %}#toc-events)).
         */
        this.onBlur = new EventEmitter();
        /**
         * @hidden
         */
        this.ArrowDirection = ArrowDirection;
        /**
         * @hidden
         */
        this.arrowDirection = ArrowDirection.None;
        this.inputValue = '';
        this.minValidateFn = noop;
        this.maxValidateFn = noop;
        this._format = "n2";
        this.isPasted = false;
        this.mouseDown = false;
        this.ngChange = noop;
        this.ngTouched = noop;
        this.ngValidatorChange = noop;
        /**
         * @hidden
         */
        this.increasePress = function (e) {
            _this.arrowPress(ArrowDirection.Up, e);
        };
        /**
         * @hidden
         */
        this.decreasePress = function (e) {
            _this.arrowPress(ArrowDirection.Down, e);
        };
        /**
         * @hidden
         */
        this.releaseArrow = function () {
            clearTimeout(_this.spinTimeout);
            if (_this.arrowDirection !== ArrowDirection.None) {
                _this.arrowDirection = ArrowDirection.None;
                _this.changeDetector.detectChanges();
            }
        };
        /**
         * @hidden
         */
        this.handlePaste = function () {
            _this.isPasted = true;
        };
        /**
         * @hidden
         */
        this.handleInput = function () {
            var input = _this.numericInput.nativeElement;
            var selectionStart = input.selectionStart, selectionEnd = input.selectionEnd, inputValue = input.value;
            if (_this.pressedKey === Keys.NumpadDecimal) {
                inputValue = _this.replaceNumpadDotValue();
            }
            if (_this.isPasted) {
                inputValue = _this.formatInputValue(_this.intl.parseNumber(inputValue));
            }
            if (!_this.isValid(inputValue)) {
                input.value = _this.inputValue;
                _this.setSelection(selectionStart - 1, selectionEnd - 1);
                return;
            }
            var parsedValue = _this.intl.parseNumber(inputValue);
            var value = _this.restrictDecimals(parsedValue);
            if (_this.autoCorrect) {
                var limited = _this.limitInputValue(value);
                value = limited.value;
                selectionStart = limited.selectionStart;
                selectionEnd = limited.selectionEnd;
            }
            if (parsedValue !== value || _this.hasTrailingZeros(inputValue) || !_this.focused) {
                _this.setInputValue(value);
                _this.setSelection(selectionStart, selectionEnd);
            }
            else {
                _this.inputValue = inputValue;
            }
            if (_this.isPasted) {
                input.value = _this.inputValue;
            }
            _this.updateValue(value);
            _this.previousSelection = null;
            _this.isPasted = false;
        };
        /**
         * @hidden
         */
        this.handleDragEnter = function () {
            if (!_this.focused && !_this.isDisabled) {
                _this.setInputValue(_this.value, true);
            }
        };
        /**
         * @hidden
         */
        this.handleMouseDown = function () {
            _this.mouseDown = true;
        };
        /**
         * @hidden
         */
        this.handleFocus = function () {
            if (!_this.focused) {
                _this.focused = true;
                if (!_this.isDisabled) {
                    var shouldSelectAll_1 = _this.selectOnFocus || !_this.mouseDown;
                    _this.ngZone.runOutsideAngular(function () {
                        setTimeout(function () {
                            if (shouldSelectAll_1) {
                                _this.selectAll();
                            }
                            else {
                                _this.selectCaret();
                            }
                        }, 0);
                    });
                }
            }
            _this.mouseDown = false;
            if (hasObservers(_this.onFocus)) {
                _this.ngZone.run(function () {
                    _this.onFocus.emit();
                });
            }
        };
        /**
         * @hidden
         */
        this.handleBlur = function () {
            _this.changeDetector.markForCheck();
            _this.focused = false;
            //blur is thrown before input when dragging the input text in IE
            if (_this.inputValue !== _this.elementValue) {
                _this.handleInput();
            }
            _this.setInputValue();
            if (hasObservers(_this.onBlur) || requiresZoneOnBlur(_this.control)) {
                _this.ngZone.run(function () {
                    _this.ngTouched();
                    _this.onBlur.emit();
                });
            }
        };
        /**
         * @hidden
         */
        this.handleKeyDown = function (e) {
            if (_this.isDisabled) {
                return;
            }
            var step;
            if (e.keyCode === Keys.ArrowDown) {
                step = -1;
            }
            else if (e.keyCode === Keys.ArrowUp) {
                step = 1;
            }
            if (step && _this.step) {
                e.preventDefault();
                _this.addStep(step);
            }
            var input = _this.numericInput.nativeElement;
            _this.previousSelection = {
                end: input.selectionEnd,
                start: input.selectionStart
            };
            _this.pressedKey = e.keyCode;
        };
        /**
         * @hidden
         */
        this.handleWheel = function (e) {
            if (_this.focused && !_this.isDisabled) {
                e.preventDefault();
                var delta = getDeltaFromMouseWheel(e);
                _this.addStep(delta);
            }
        };
        this.direction = localizationService.rtl ? 'rtl' : 'ltr';
    }
    Object.defineProperty(NumericTextBoxComponent.prototype, "format", {
        /**
         * Specifies the number format which is used when the NumericTextBox is not focused
         * ([see example]({% slug formats_numerictextbox %})).
         * If `format` is set to `null` or `undefined`, the default format will be used.
         */
        get: function () {
            var format = this._format;
            return format !== null && format !== undefined ? format : 'n2';
        },
        set: function (value) {
            this._format = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumericTextBoxComponent.prototype, "tabIndex", {
        get: function () {
            return this.tabindex;
        },
        /**
         * @hidden
         */
        set: function (tabIndex) {
            this.tabindex = tabIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumericTextBoxComponent.prototype, "widgetClasses", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    NumericTextBoxComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscriptions = this.localizationService
            .changes
            .subscribe(function (_a) {
            var rtl = _a.rtl;
            _this.direction = rtl ? 'rtl' : 'ltr';
        });
        this.subscriptions.add(this.intl.changes.subscribe(this.intlChange.bind(this)));
        if (this.hostElement) {
            this.renderer.removeAttribute(this.hostElement.nativeElement, "tabindex");
        }
        this.control = this.injector.get(NgControl, null);
    };
    /**
     * @hidden
     */
    NumericTextBoxComponent.prototype.ngOnChanges = function (changes) {
        if (anyChanged(PARSABLE_OPTIONS, changes, false)) {
            this.parseOptions(PARSABLE_OPTIONS.filter(function (option) { return changes[option]; }));
        }
        this.verifySettings();
        if (anyChanged(['min', 'max', 'rangeValidation'], changes, false)) {
            this.minValidateFn = this.rangeValidation ? createMinValidator(this.min) : noop;
            this.maxValidateFn = this.rangeValidation ? createMaxValidator(this.max) : noop;
            this.ngValidatorChange();
        }
        if (anyChanged(['autoCorrect', 'decimals', 'min'], changes)) {
            delete this.numericRegex;
        }
        if (anyChanged(['value', 'format'], changes, false)) {
            this.verifyValue(this.value);
            this.value = this.restrictModelValue(this.value);
            if (!this.focused || (this.intl.parseNumber(this.elementValue) !== this.value)) {
                this.setInputValue();
            }
        }
    };
    /**
     * @hidden
     */
    NumericTextBoxComponent.prototype.ngOnDestroy = function () {
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
        }
        clearTimeout(this.spinTimeout);
    };
    /**
     * @hidden
     */
    NumericTextBoxComponent.prototype.validate = function (control) {
        return this.minValidateFn(control) || this.maxValidateFn(control);
    };
    /**
     * @hidden
     */
    NumericTextBoxComponent.prototype.registerOnValidatorChange = function (fn) {
        this.ngValidatorChange = fn;
    };
    /**
     * @hidden
     */
    NumericTextBoxComponent.prototype.writeValue = function (value) {
        this.verifyValue(value);
        var restrictedValue = this.restrictModelValue(value);
        this.value = restrictedValue;
        this.setInputValue();
    };
    /**
     * @hidden
     */
    NumericTextBoxComponent.prototype.registerOnChange = function (fn) {
        this.ngChange = fn;
    };
    /**
     * @hidden
     */
    NumericTextBoxComponent.prototype.registerOnTouched = function (fn) {
        this.ngTouched = fn;
    };
    /**
     * @hidden
     * Called when the status of the component changes to or from `disabled`.
     * Depending on the value, it enables or disables the appropriate DOM element.
     *
     * @param isDisabled
     */
    NumericTextBoxComponent.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
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
    NumericTextBoxComponent.prototype.focus = function () {
        invokeElementMethod(this.numericInput, 'focus');
    };
    /**
     * Blurs the NumericTextBox.
     */
    NumericTextBoxComponent.prototype.blur = function () {
        invokeElementMethod(this.numericInput, 'blur');
    };
    /**
     * Notifies the `NumericTextBoxComponent` that the input value should be changed.
     * Can be used to update the input after setting the component properties directly.
     */
    NumericTextBoxComponent.prototype.notifyValueChange = function () {
        this.setInputValue();
    };
    Object.defineProperty(NumericTextBoxComponent.prototype, "incrementTitle", {
        /**
         * @hidden
         */
        get: function () {
            return this.localizationService.get('increment');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumericTextBoxComponent.prototype, "decrementTitle", {
        /**
         * @hidden
         */
        get: function () {
            return this.localizationService.get('decrement');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumericTextBoxComponent.prototype, "decimalSeparator", {
        get: function () {
            var numberSymbols = this.intl.numberSymbols();
            return numberSymbols.decimal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumericTextBoxComponent.prototype, "elementValue", {
        get: function () {
            return this.numericInput.nativeElement.value;
        },
        set: function (value) {
            this.renderer.setProperty(this.numericInput.nativeElement, 'value', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumericTextBoxComponent.prototype, "focused", {
        get: function () {
            return this.isFocused;
        },
        set: function (value) {
            if (this.isFocused !== value && this.numericWrap) {
                var wrap = this.numericWrap.nativeElement;
                var input = this.numericInput.nativeElement;
                if (value) {
                    this.renderer.addClass(wrap, FOCUSED);
                    if (!this.isDisabled) {
                        this.renderer.removeClass(input, FORMATTED_VALUE);
                    }
                }
                else {
                    this.renderer.removeClass(wrap, FOCUSED);
                    this.renderer.addClass(input, FORMATTED_VALUE);
                }
                this.isFocused = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumericTextBoxComponent.prototype, "hasDecimals", {
        get: function () {
            return this.decimals !== null && this.decimals >= 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumericTextBoxComponent.prototype, "isDisabled", {
        get: function () {
            return this.disabled || this.readonly;
        },
        enumerable: true,
        configurable: true
    });
    NumericTextBoxComponent.prototype.arrowPress = function (direction, e) {
        e.preventDefault();
        if (this.isDisabled) {
            return;
        }
        if (!mobileOS) {
            this.focused = true;
            this.focus();
        }
        if (this.arrowDirection !== direction) {
            this.arrowDirection = direction;
            this.changeDetector.detectChanges();
        }
        if (this.step) {
            this.spin(direction, INITIAL_SPIN_DELAY);
        }
        else {
            this.setInputValue();
        }
    };
    NumericTextBoxComponent.prototype.updateValue = function (value) {
        var _this = this;
        if (!areSame(this.value, value)) {
            this.ngZone.run(function () {
                _this.value = value;
                _this.ngChange(value);
                _this.valueChange.emit(value);
                _this.changeDetector.markForCheck();
            });
        }
    };
    NumericTextBoxComponent.prototype.replaceNumpadDotValue = function () {
        var value = this.inputValue || "";
        if (this.previousSelection) {
            var input = this.numericInput.nativeElement;
            var selectionStart = input.selectionStart, selectionEnd = input.selectionEnd;
            var _a = this.previousSelection, start = _a.start, end = _a.end;
            input.value = value = value.substring(0, start) + this.decimalSeparator + value.substring(end);
            this.setSelection(selectionStart, selectionEnd);
        }
        return value;
    };
    NumericTextBoxComponent.prototype.isValid = function (value) {
        if (!this.numericRegex) {
            this.numericRegex = numericRegex({
                autoCorrect: this.autoCorrect,
                decimals: this.decimals,
                min: this.min,
                separator: this.decimalSeparator
            });
        }
        return this.numericRegex.test(value);
    };
    NumericTextBoxComponent.prototype.spin = function (step, timeout) {
        var _this = this;
        clearTimeout(this.spinTimeout);
        this.spinTimeout = window.setTimeout(function () {
            _this.spin(step, SPIN_DELAY);
        }, timeout);
        this.addStep(step);
    };
    NumericTextBoxComponent.prototype.addStep = function (step) {
        var value = add(this.value || 0, this.step * step);
        value = this.limitValue(value);
        value = this.restrictDecimals(value);
        this.setInputValue(value);
        this.updateValue(value);
    };
    NumericTextBoxComponent.prototype.setSelection = function (start, end) {
        if (this.focused) {
            invokeElementMethod(this.numericInput, 'setSelectionRange', start, end);
        }
    };
    NumericTextBoxComponent.prototype.limitValue = function (value) {
        var result = value;
        if (!this.isInRange(value)) {
            if (isNumber(this.max) && value > this.max) {
                result = this.max;
            }
            if (isNumber(this.min) && value < this.min) {
                result = this.min;
            }
        }
        return result;
    };
    NumericTextBoxComponent.prototype.limitInputValue = function (value) {
        var _a = this.numericInput.nativeElement, selectionStart = _a.selectionStart, selectionEnd = _a.selectionEnd, enteredValue = _a.value;
        var limitedValue = value;
        var selectToEnd = false;
        if (!this.isInRange(value)) {
            var lengthChange = enteredValue.length - String(this.inputValue).length;
            var _b = this, min = _b.min, max = _b.max;
            var hasMax = isNumber(max);
            var hasMin = isNumber(min);
            var padLimit = void 0, replaceNext = void 0;
            var correctedValue = value;
            if (selectionStart === 0 && this.inputValue.substr(1) === enteredValue) {
                return {
                    selectionEnd: selectionEnd,
                    selectionStart: selectionStart,
                    value: null
                };
            }
            if (hasMax && value > max) {
                if (value > 0) {
                    replaceNext = true;
                }
                else {
                    padLimit = max;
                }
            }
            else if (hasMin && value < min) {
                if (value > 0) {
                    padLimit = min;
                }
                else {
                    replaceNext = true;
                }
            }
            if (padLimit) {
                var paddedValue = this.tryPadValue(value, padLimit);
                if (paddedValue && decimalPart(value) !== decimalPart(padLimit)) {
                    correctedValue = paddedValue;
                    selectToEnd = true;
                }
            }
            else if (replaceNext) {
                if (this.inputValue && selectionStart !== enteredValue.length) {
                    correctedValue = parseFloat(enteredValue.substr(0, selectionStart) +
                        enteredValue.substr(selectionStart + lengthChange));
                }
            }
            limitedValue = this.limitValue(correctedValue);
            selectToEnd = (selectToEnd || limitedValue !== correctedValue) && this.previousSelection &&
                (this.previousSelection.end - this.previousSelection.start + lengthChange) > 0;
        }
        return {
            selectionEnd: selectToEnd ? String(limitedValue).length : selectionEnd,
            selectionStart: selectionStart,
            value: limitedValue
        };
    };
    NumericTextBoxComponent.prototype.tryPadValue = function (value, limit) {
        var limitLength = String(Math.floor(limit)).length;
        var zeroPadded = pad(value, limitLength);
        var zeroPaddedNext = pad(value, limitLength + 1);
        var result;
        if (this.isInRange(zeroPadded)) {
            result = zeroPadded;
        }
        else if (this.isInRange(zeroPaddedNext)) {
            result = zeroPaddedNext;
        }
        return result;
    };
    NumericTextBoxComponent.prototype.isInRange = function (value) {
        return !isNumber(value) || ((!isNumber(this.min) || this.min <= value) && (!isNumber(this.max) || value <= this.max));
    };
    NumericTextBoxComponent.prototype.restrictModelValue = function (value) {
        var result = this.restrictDecimals(value, true);
        if (this.autoCorrect && this.limitValue(result) !== result) {
            result = null;
        }
        return result;
    };
    NumericTextBoxComponent.prototype.restrictDecimals = function (value, round) {
        var result = value;
        if (value && this.hasDecimals) {
            var decimals = this.decimals;
            var stringValue = String(value);
            if (round || EXPONENT_REGEX.test(stringValue)) {
                result = toFixedPrecision(value, decimals);
            }
            else {
                var parts = stringValue.split(POINT);
                var fraction = parts[1];
                if (fraction && fraction.length > decimals) {
                    fraction = fraction.substr(0, decimals);
                    result = parseFloat("" + parts[0] + POINT + fraction);
                }
            }
        }
        return result;
    };
    NumericTextBoxComponent.prototype.formatInputValue = function (value) {
        var stringValue = String(value);
        var exponentMatch = EXPONENT_REGEX.exec(stringValue);
        if (exponentMatch) {
            stringValue = value.toFixed(limitPrecision(parseInt(exponentMatch[1], 10)));
        }
        return stringValue.replace(POINT, this.decimalSeparator);
    };
    NumericTextBoxComponent.prototype.formatValue = function (value, focused) {
        var formattedValue;
        if (value === null || !defined(value) || value === '') {
            formattedValue = '';
        }
        else if (focused && !this.readonly) {
            formattedValue = this.formatInputValue(value);
        }
        else {
            formattedValue = this.intl.formatNumber(value, this.format);
        }
        return formattedValue;
    };
    NumericTextBoxComponent.prototype.setInputValue = function (value, focused) {
        if (value === void 0) { value = this.value; }
        if (focused === void 0) { focused = this.focused; }
        var formattedValue = this.formatValue(value, focused);
        this.elementValue = formattedValue;
        this.inputValue = formattedValue;
    };
    NumericTextBoxComponent.prototype.verifySettings = function () {
        if (!isDevMode()) {
            return;
        }
        if (this.min !== null && this.max !== null && this.min > this.max) {
            throw new Error("The max value should be bigger than the min. See " + MIN_DOC_LINK + " and " + MAX_DOC_LINK + ".");
        }
    };
    NumericTextBoxComponent.prototype.verifyValue = function (value) {
        if (isDevMode() && value && typeof value !== 'number') {
            throw new Error("The NumericTextBox component requires value of type Number and " + JSON.stringify(value) + " was set.");
        }
    };
    NumericTextBoxComponent.prototype.parseOptions = function (options) {
        for (var idx = 0; idx < options.length; idx++) {
            var name_1 = options[idx];
            var value = this[name_1];
            if (typeof value === 'string') {
                var parsed = parseFloat(value);
                var valid = !isNaN(parsed);
                if (isDevMode() && !valid && value !== '') {
                    throw new Error('The NumericTextBox component requires value of type Number or a String representing ' +
                        ("a number for the " + name_1 + " property and " + JSON.stringify(value) + " was set."));
                }
                this[name_1] = valid ? parsed : PARSABLE_DEFAULTS[name_1];
            }
        }
    };
    NumericTextBoxComponent.prototype.intlChange = function () {
        delete this.numericRegex;
        if (this.numericInput && (!this.focused || !this.isValid(this.elementValue))) {
            this.setInputValue();
        }
    };
    NumericTextBoxComponent.prototype.hasTrailingZeros = function (inputValue) {
        if (this.hasDecimals && this.focused) {
            var fraction = inputValue.split(this.decimalSeparator)[1];
            return fraction && fraction.length > this.decimals && fraction.lastIndexOf('0') === fraction.length - 1;
        }
    };
    NumericTextBoxComponent.prototype.selectAll = function () {
        this.setInputValue();
        this.setSelection(0, this.inputValue.length);
    };
    NumericTextBoxComponent.prototype.selectCaret = function () {
        var caretPosition = getCaretPosition(this.numericInput.nativeElement);
        var formattedValue = this.elementValue;
        var partialValue = formattedValue.substring(0, caretPosition);
        this.setInputValue();
        if (partialValue.length) {
            var significantCharsInFormattedValue = extractSignificantNumericChars(partialValue, this.decimalSeparator);
            var adjustedSignificantChars = this.adjustSignificantChars(formattedValue, significantCharsInFormattedValue);
            this.setSelection(adjustedSignificantChars, adjustedSignificantChars);
        }
        else {
            this.setSelection(0, 0);
        }
    };
    NumericTextBoxComponent.prototype.numberOfLeadingZeroes = function (formattedValue) {
        var separatorIndex = formattedValue.indexOf(this.decimalSeparator);
        var matchedLeadingZeroes = formattedValue.match(/^[^1-9]*?(0+)/);
        if (matchedLeadingZeroes) {
            var lengthOfMatch = matchedLeadingZeroes[0].length;
            var lengthOfLeadingZeroesMatch = matchedLeadingZeroes[1].length;
            return lengthOfMatch === separatorIndex ? lengthOfLeadingZeroesMatch - 1 : lengthOfLeadingZeroesMatch;
        }
        return 0;
    };
    NumericTextBoxComponent.prototype.adjustSignificantChars = function (formattedValue, significantChars) {
        var leadingZeroes = this.numberOfLeadingZeroes(formattedValue);
        if (leadingZeroes > 0) {
            return Math.max(0, significantChars - leadingZeroes);
        }
        return significantChars;
    };
    NumericTextBoxComponent.decorators = [
        { type: Component, args: [{
                    exportAs: 'kendoNumericTextBox',
                    providers: [
                        LocalizationService,
                        { provide: L10N_PREFIX, useValue: 'kendo.numerictextbox' },
                        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(function () { return NumericTextBoxComponent; }), multi: true },
                        { provide: NG_VALIDATORS, useExisting: forwardRef(function () { return NumericTextBoxComponent; }), multi: true },
                        { provide: KendoInput, useExisting: forwardRef(function () { return NumericTextBoxComponent; }) }
                    ],
                    selector: 'kendo-numerictextbox',
                    template: "\n        <ng-container kendoNumericTextBoxLocalizedMessages\n            i18n-increment=\"kendo.numerictextbox.increment|The title for the **Increment** button in the NumericTextBox\"\n            increment=\"Increase value\"\n            i18n-decrement=\"kendo.numerictextbox.decrement|The title for the **Decrement** button in the NumericTextBox\"\n            decrement=\"Decrease value\"\n        >\n        </ng-container>\n        <span\n            class=\"k-numeric-wrap\"\n            [class.k-state-disabled]=\"disabled\"\n            [kendoEventsOutsideAngular]=\"{ mousewheel: handleWheel, DOMMouseScroll: handleWheel }\"\n            #numericWrap>\n            <input\n            role=\"spinbutton\"\n            class=\"k-input k-formatted-value\"\n            autocomplete=\"off\"\n            autocorrect=\"off\"\n            [id]=\"focusableId\"\n            [attr.aria-valuemin]=\"min\"\n            [attr.aria-valuemax]=\"max\"\n            [attr.aria-valuenow]=\"value\"\n            [attr.title]=\"title\"\n            [attr.placeholder]=\"placeholder\"\n            [tabindex]=\"tabIndex\"\n            [disabled]=\"disabled\"\n            [readonly]=\"readonly\"\n            [kendoEventsOutsideAngular]=\"{\n                mousedown: handleMouseDown,\n                dragenter: handleDragEnter,\n                keydown: handleKeyDown,\n                input: handleInput,\n                focus: handleFocus,\n                blur: handleBlur,\n                paste: handlePaste\n            }\"\n            #numericInput />\n            <span class=\"k-select\" *ngIf=\"spinners\" [kendoEventsOutsideAngular]=\"{ mouseup: releaseArrow, mouseleave: releaseArrow }\">\n                <span\n                    [kendoEventsOutsideAngular]=\"{ mousedown: increasePress }\"\n                    [attr.aria-label]=\"incrementTitle\"\n                    [title]=\"incrementTitle\"\n                    [class.k-state-active]=\"arrowDirection === ArrowDirection.Up\"\n                    class=\"k-link k-link-increase\"\n                >\n                    <span class=\"k-icon k-i-arrow-n\"></span>\n                </span>\n                <span\n                    [kendoEventsOutsideAngular]=\"{ mousedown: decreasePress }\"\n                    [attr.aria-label]=\"decrementTitle\"\n                    [title]=\"decrementTitle\"\n                    [class.k-state-active]=\"arrowDirection === ArrowDirection.Down\"\n                    class=\"k-link k-link-decrease\"\n                >\n                    <span class=\"k-icon k-i-arrow-s\"></span>\n                </span>\n            </span>\n        </span>\n      "
                },] },
    ];
    /** @nocollapse */
    NumericTextBoxComponent.ctorParameters = function () { return [
        { type: IntlService },
        { type: Renderer2 },
        { type: LocalizationService },
        { type: Injector },
        { type: NgZone },
        { type: ChangeDetectorRef },
        { type: ElementRef }
    ]; };
    NumericTextBoxComponent.propDecorators = {
        focusableId: [{ type: Input }],
        disabled: [{ type: Input }],
        readonly: [{ type: Input }],
        title: [{ type: Input }],
        autoCorrect: [{ type: Input }],
        format: [{ type: Input }],
        max: [{ type: Input }],
        min: [{ type: Input }],
        decimals: [{ type: Input }],
        placeholder: [{ type: Input }],
        step: [{ type: Input }],
        spinners: [{ type: Input }],
        rangeValidation: [{ type: Input }],
        tabindex: [{ type: Input }],
        tabIndex: [{ type: Input }],
        selectOnFocus: [{ type: Input }],
        value: [{ type: Input }],
        valueChange: [{ type: Output }],
        onFocus: [{ type: Output, args: ['focus',] }],
        onBlur: [{ type: Output, args: ['blur',] }],
        numericInput: [{ type: ViewChild, args: ['numericInput', { static: true },] }],
        numericWrap: [{ type: ViewChild, args: ['numericWrap',] }],
        direction: [{ type: HostBinding, args: ['attr.dir',] }],
        widgetClasses: [{ type: HostBinding, args: ['class.k-widget',] }, { type: HostBinding, args: ['class.k-numerictextbox',] }]
    };
    return NumericTextBoxComponent;
}());
export { NumericTextBoxComponent };
