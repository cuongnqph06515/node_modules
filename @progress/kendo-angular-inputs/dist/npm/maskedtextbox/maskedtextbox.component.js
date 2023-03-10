/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var masking_service_1 = require("./masking.service");
var kendo_angular_common_1 = require("@progress/kendo-angular-common");
var dom_utils_1 = require("../common/dom-utils");
var utils_1 = require("../common/utils");
var resolvedPromise = Promise.resolve(null);
var FOCUSED = 'k-state-focused';
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
var MaskedTextBoxComponent = /** @class */ (function () {
    function MaskedTextBoxComponent(service, renderer, hostElement, ngZone, injector, changeDetector, rtl) {
        var _this = this;
        this.service = service;
        this.renderer = renderer;
        this.hostElement = hostElement;
        this.ngZone = ngZone;
        this.injector = injector;
        this.changeDetector = changeDetector;
        /**
         * @hidden
         */
        this.focusableId = "k-" + kendo_angular_common_1.guid();
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
        this.onFocus = new core_1.EventEmitter(); //tslint:disable-line:no-output-rename
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
        this.onBlur = new core_1.EventEmitter(); //tslint:disable-line:no-output-rename
        /**
         * Fires each time the value changes.
         */
        this.valueChange = new core_1.EventEmitter();
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
        this.handleFocus = function () {
            _this.focused = true;
            if (_this.maskOnFocus && _this.emptyMask) {
                _this.updateInput(_this.service.maskRaw(_this.value));
                _this.ngZone.runOutsideAngular(function () {
                    setTimeout(function () { _this.setSelection(0, 0); }, 0);
                });
            }
            if (kendo_angular_common_1.hasObservers(_this.onFocus)) {
                _this.ngZone.run(function () {
                    _this.onFocus.emit();
                });
            }
        };
        /**
         * @hidden
         */
        this.handleClick = function () {
            if (_this.focused && !_this.focusClick) {
                _this.focusClick = true;
                var _a = _this.input.nativeElement, selectionStart = _a.selectionStart, selectionEnd = _a.selectionEnd;
                if (selectionStart === selectionEnd) {
                    _this.setFocusSelection();
                }
            }
        };
        /**
         * @hidden
         */
        this.handleBlur = function () {
            _this.changeDetector.markForCheck();
            _this.focused = false;
            _this.focusClick = false;
            if (_this.maskOnFocus && _this.emptyMask) {
                _this.updateInput(_this.maskedValue);
            }
            if (kendo_angular_common_1.hasObservers(_this.onBlur) || utils_1.requiresZoneOnBlur(_this.control)) {
                _this.ngZone.run(function () {
                    _this.onTouched();
                    _this.onBlur.emit();
                });
            }
        };
        this.onChange = function (_) { };
        this.onTouched = function () { };
        this.direction = rtl ? 'rtl' : 'ltr';
        this.updateService();
    }
    Object.defineProperty(MaskedTextBoxComponent.prototype, "hostDisabledClass", {
        get: function () {
            return this.disabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaskedTextBoxComponent.prototype, "rules", {
        /**
         * Exposes the RegExp-based mask validation array ([see example]({% slug masks_maskedtextbox %})).
         */
        get: function () {
            return this._rules || this.defaultRules;
        },
        set: function (value) {
            this._rules = Object.assign({}, this.defaultRules, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaskedTextBoxComponent.prototype, "tabIndex", {
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
    MaskedTextBoxComponent.prototype.ngOnInit = function () {
        if (this.hostElement) {
            this.renderer.removeAttribute(this.hostElement.nativeElement, "tabindex");
        }
        this.control = this.injector.get(forms_1.NgControl, null);
    };
    /**
     * @hidden
     * Used by the TextBoxContainer to determine if the MaskedTextBox is empty.
     */
    MaskedTextBoxComponent.prototype.isEmpty = function () {
        if (this.input) {
            return !Boolean(this.input.nativeElement.value);
        }
    };
    /**
     * @hidden
     */
    MaskedTextBoxComponent.prototype.handleDragDrop = function () {
        return false;
    };
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
    MaskedTextBoxComponent.prototype.focus = function () {
        if (!this.input) {
            return;
        }
        this.input.nativeElement.focus();
        this.setFocusSelection();
    };
    /**
     * Blurs the MaskedTextBox.
     */
    MaskedTextBoxComponent.prototype.blur = function () {
        if (!this.input) {
            return;
        }
        this.input.nativeElement.blur();
    };
    /**
     * @hidden
     */
    MaskedTextBoxComponent.prototype.pasteHandler = function (e) {
        var _a = e.target, selectionStart = _a.selectionStart, selectionEnd = _a.selectionEnd;
        if (selectionEnd === selectionStart) {
            return;
        }
        this.isPasted = true;
        this.selection = [selectionStart, selectionEnd];
    };
    /**
     * @hidden
     */
    MaskedTextBoxComponent.prototype.inputHandler = function (e) {
        var value = e.target.value;
        var _a = this.selection, start = _a[0], end = _a[1];
        if (!this.mask) {
            this.updateValue(value);
            this.isPasted = false;
            return;
        }
        var result;
        if (this.isPasted) {
            this.isPasted = false;
            var rightPart = this.maskedValue.length - end;
            var to = value.length - rightPart;
            result = this.service.maskInRange(value.slice(start, to), this.maskedValue, start, end);
        }
        else {
            result = this.service.maskInput(value, this.maskedValue, e.target.selectionStart);
        }
        this.updateInput(result.value, result.selection);
        this.updateValue(result.value);
    };
    /**
     * @hidden
     */
    MaskedTextBoxComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes.value) {
            this.value = this.normalizeValue();
        }
        if (!this.mask) {
            this.updateInput(this.value);
            return;
        }
        var next = this.extractChanges(changes);
        this.updateService(next);
        if (kendo_angular_common_1.isChanged('value', changes)) {
            var maskedValue = this.service.maskRaw(this.value);
            if (maskedValue !== this.maskedValue) {
                this.updateInput(maskedValue);
            }
        }
        else if (kendo_angular_common_1.anyChanged(['promptPlaceholder', 'includeLiterals'], changes)) {
            resolvedPromise.then(function () {
                _this.updateValue(_this.maskedValue);
            });
        }
        else {
            this.updateInput(this.service.maskRaw(this.value));
        }
    };
    /**
     * @hidden
     * Writes a new value to the element.
     */
    MaskedTextBoxComponent.prototype.writeValue = function (value) {
        this.value = this.normalizeValue(value);
        this.updateInput(this.service.maskRaw(this.value));
    };
    /**
     * @hidden
     * Sets the function that will be called when a `change` event is triggered.
     */
    MaskedTextBoxComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    /**
     * @hidden
     * Sets the function that will be called when a `touch` event is triggered.
     */
    MaskedTextBoxComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    /**
     * @hidden
     * Called when the status of the component changes to or from `disabled`.
     * Depending on the value, it enables or disables the appropriate DOM element.
     *
     * @param isDisabled
     */
    MaskedTextBoxComponent.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    /**
     * @hidden
     */
    MaskedTextBoxComponent.prototype.validate = function (_) {
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
    };
    /**
     * @hidden
     */
    MaskedTextBoxComponent.prototype.updateValue = function (maskedValue) {
        if (this.mask && !this.service.validationValue(maskedValue)) {
            this.value = '';
        }
        else {
            this.value = this.service.rawValue(maskedValue);
        }
        this.onChange(this.value);
        this.valueChange.emit(this.value);
    };
    MaskedTextBoxComponent.prototype.updateInput = function (maskedValue, selection) {
        if (maskedValue === void 0) { maskedValue = ''; }
        this.maskedValue = maskedValue;
        var value = this.maskOnFocus && !this.focused && this.emptyMask ? '' : maskedValue;
        this.renderer.setProperty(this.input.nativeElement, "value", value);
        if (selection !== undefined) {
            this.setSelection(selection, selection);
        }
    };
    MaskedTextBoxComponent.prototype.extractChanges = function (changes) {
        return Object.keys(changes).filter(function (key) { return key !== 'rules'; }).reduce(function (obj, key) {
            obj[key] = changes[key].currentValue;
            return obj;
        }, {}); // tslint:disable-line:align
    };
    MaskedTextBoxComponent.prototype.updateService = function (extra) {
        var config = Object.assign({
            includeLiterals: this.includeLiterals,
            mask: this.mask,
            prompt: this.prompt,
            promptPlaceholder: this.promptPlaceholder,
            rules: this.rules
        }, extra); // tslint:disable-line:align
        this.service.update(config);
    };
    MaskedTextBoxComponent.prototype.setSelection = function (start, end) {
        if (start === void 0) { start = this.selection[0]; }
        if (end === void 0) { end = this.selection[1]; }
        if (this.focused) {
            dom_utils_1.invokeElementMethod(this.input, 'setSelectionRange', start, end);
        }
    };
    Object.defineProperty(MaskedTextBoxComponent.prototype, "emptyMask", {
        get: function () {
            return this.service.maskRaw() === this.maskedValue;
        },
        enumerable: true,
        configurable: true
    });
    MaskedTextBoxComponent.prototype.setFocusSelection = function () {
        var selectionStart = this.input.nativeElement.selectionStart;
        var index = this.maskedValue ? this.maskedValue.indexOf(this.prompt) : 0;
        if (index >= 0 && index < selectionStart) {
            this.selection = [index, index];
            this.setSelection();
        }
    };
    Object.defineProperty(MaskedTextBoxComponent.prototype, "focused", {
        get: function () {
            return this.isFocused;
        },
        set: function (value) {
            if (this.isFocused !== value && this.hostElement) {
                var element = this.hostElement.nativeElement;
                if (value) {
                    this.renderer.addClass(element, FOCUSED);
                }
                else {
                    this.renderer.removeClass(element, FOCUSED);
                }
                this.isFocused = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    MaskedTextBoxComponent.prototype.normalizeValue = function (value) {
        if (value === void 0) { value = this.value; }
        var present = utils_1.isPresent(value);
        if (present && typeof value !== 'string') {
            if (core_1.isDevMode()) {
                throw new Error('The MaskedTextBox component supports only string values.');
            }
            return String(value);
        }
        return present ? value : '';
    };
    MaskedTextBoxComponent.decorators = [
        { type: core_1.Component, args: [{
                    exportAs: 'kendoMaskedTextBox',
                    providers: [
                        masking_service_1.MaskingService,
                        {
                            multi: true,
                            provide: forms_1.NG_VALUE_ACCESSOR,
                            useExisting: core_1.forwardRef(function () { return MaskedTextBoxComponent; }) /* tslint:disable-line */
                        },
                        {
                            multi: true,
                            provide: forms_1.NG_VALIDATORS,
                            useExisting: core_1.forwardRef(function () { return MaskedTextBoxComponent; }) /* tslint:disable-line */
                        },
                        {
                            provide: kendo_angular_common_1.KendoInput,
                            useExisting: core_1.forwardRef(function () { return MaskedTextBoxComponent; })
                        }
                    ],
                    selector: 'kendo-maskedtextbox',
                    template: "\n        <input type=\"text\"\n            #input\n            autocomplete=\"off\"\n            autocorrect=\"off\"\n            autocapitalize=\"off\"\n            spellcheck=\"false\"\n            class=\"k-textbox\"\n            [id]=\"focusableId\"\n            [tabindex]=\"tabIndex\"\n            [attr.title]=\"title\"\n            [disabled]=\"disabled\"\n            [readonly]=\"readonly\"\n            [kendoEventsOutsideAngular]=\"{\n                focus: handleFocus,\n                blur: handleBlur,\n                click: handleClick,\n                dragstart: handleDragDrop,\n                drop: handleDragDrop\n            }\"\n        />\n    "
                },] },
    ];
    /** @nocollapse */
    MaskedTextBoxComponent.ctorParameters = function () { return [
        { type: masking_service_1.MaskingService },
        { type: core_1.Renderer2 },
        { type: core_1.ElementRef },
        { type: core_1.NgZone },
        { type: core_1.Injector },
        { type: core_1.ChangeDetectorRef },
        { type: Boolean, decorators: [{ type: core_1.Optional }, { type: core_1.Inject, args: [kendo_angular_l10n_1.RTL,] }] }
    ]; };
    MaskedTextBoxComponent.propDecorators = {
        focusableId: [{ type: core_1.Input }],
        disabled: [{ type: core_1.Input }],
        readonly: [{ type: core_1.Input }],
        title: [{ type: core_1.Input }],
        direction: [{ type: core_1.HostBinding, args: ['attr.dir',] }],
        hostClasses: [{ type: core_1.HostBinding, args: ['class.k-widget',] }, { type: core_1.HostBinding, args: ['class.k-maskedtextbox',] }],
        hostDisabledClass: [{ type: core_1.HostBinding, args: ['class.k-state-disabled',] }],
        mask: [{ type: core_1.Input }],
        value: [{ type: core_1.Input }],
        rules: [{ type: core_1.Input }],
        prompt: [{ type: core_1.Input }],
        promptPlaceholder: [{ type: core_1.Input }],
        includeLiterals: [{ type: core_1.Input }],
        maskOnFocus: [{ type: core_1.Input }],
        maskValidation: [{ type: core_1.Input }],
        tabindex: [{ type: core_1.Input }],
        tabIndex: [{ type: core_1.Input }],
        onFocus: [{ type: core_1.Output, args: ['focus',] }],
        onBlur: [{ type: core_1.Output, args: ['blur',] }],
        valueChange: [{ type: core_1.Output }],
        input: [{ type: core_1.ViewChild, args: ['input', { static: true },] }],
        pasteHandler: [{ type: core_1.HostListener, args: ['paste', ['$event'],] }],
        inputHandler: [{ type: core_1.HostListener, args: ['input', ['$event'],] }]
    };
    return MaskedTextBoxComponent;
}());
exports.MaskedTextBoxComponent = MaskedTextBoxComponent;
