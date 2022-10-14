/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ContentChild, Component, ElementRef, EventEmitter, HostBinding, Input, Renderer2, isDevMode, ChangeDetectorRef } from '@angular/core';
import { LocalizationService, L10N_PREFIX } from '@progress/kendo-angular-l10n';
import { NgControl } from '@angular/forms';
import { guid, KendoInput } from '@progress/kendo-angular-common';
import { FloatingLabelInputAdapter } from './floating-label-input-adapter';
var isFunction = function (x) { return Object.prototype.toString.call(x) === '[object Function]'; };
var ɵ0 = isFunction;
/**
 * Represents the [Kendo UI FloatingLabel component for Angular]({% slug overview_floatinglabel %}).
 * Provides floating labels to `input` elements.
 *
 * The FloatingLabel supports both Template and Reactive Forms and
 * [can contain Kendo UI for Angular Input components such as `kendo-combobox` and `kendo-numerictextbox`,
 * or HTML Input elements with the `kendoTextBox` directive applied]({% slug overview_floatinglabel %}#toc-implementing-floating-labels).
 *
 * @example
 * ```ts
 *
 * _@Component({
 *   selector: 'my-app',
 *   template: `
 *     <kendo-floatinglabel text="First name">
 *       <input [(ngModel)]="name" kendoTextBox />
 *     </kendo-floatinglabel>
 *   `
 * })
 * class AppComponent {
 *     public name = 'John';
 * }
 *
 * ```
 */
var FloatingLabelComponent = /** @class */ (function () {
    function FloatingLabelComponent(elementRef, renderer, changeDetectorRef, localization) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.changeDetectorRef = changeDetectorRef;
        this.localization = localization;
        this.hostClasses = true;
        /**
         * @hidden
         */
        this.focused = false;
        /**
         * @hidden
         */
        this.empty = true;
        /**
         * @hidden
         */
        this.invalid = false;
        /**
         * @hidden
         */
        this.labelId = "k-" + guid();
        this.autoFillStarted = false;
        this.direction = localization.rtl ? 'rtl' : 'ltr';
        this.renderer.removeAttribute(this.elementRef.nativeElement, "id");
    }
    Object.defineProperty(FloatingLabelComponent.prototype, "focusedClass", {
        get: function () {
            return this.focused;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FloatingLabelComponent.prototype, "invalidClass", {
        get: function () {
            return this.invalid;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    FloatingLabelComponent.prototype.ngAfterContentInit = function () {
        this.validateSetup();
        var control = new FloatingLabelInputAdapter(this.kendoInput || this.formControl.valueAccessor, this.formControl);
        this.addHandlers(control);
        this.setLabelFor(control);
    };
    FloatingLabelComponent.prototype.ngAfterViewInit = function () {
        if (this.kendoInput) {
            this.setAriaLabelledby(this.kendoInput);
        }
    };
    /**
     * @hidden
     */
    FloatingLabelComponent.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    /**
     * @hidden
     */
    FloatingLabelComponent.prototype.textFor = function (key) {
        return this.localization.get(key);
    };
    FloatingLabelComponent.prototype.subscribe = function (control, eventName, handler) {
        if (control[eventName] instanceof EventEmitter) {
            var subscription = control[eventName].subscribe(handler);
            if (!this.subscription) {
                this.subscription = subscription;
            }
            else {
                this.subscription.add(subscription);
            }
        }
    };
    FloatingLabelComponent.prototype.updateState = function () {
        var empty = function (value) {
            // zero is not an empty value (e.g., NumericTextBox)
            if (value === 0 || value === false) {
                return false;
            }
            // empty arrays are an empty value (e.g., MultiSelect)
            if (Array.isArray(value) && !value.length) {
                return true;
            }
            return !value;
        };
        var formControl = this.formControl;
        if (formControl) {
            var valueAccessor = formControl.valueAccessor;
            if (isFunction(valueAccessor.isEmpty)) {
                this.empty = valueAccessor.isEmpty();
            }
            else {
                this.empty = empty(formControl.value);
            }
            this.invalid = formControl.invalid && (formControl.touched || formControl.dirty);
        }
        else {
            this.empty = isFunction(this.kendoInput.isEmpty) ?
                this.kendoInput.isEmpty() : empty(this.kendoInput.value);
        }
        if (this.empty) {
            this.renderer.addClass(this.elementRef.nativeElement, 'k-state-empty');
        }
        else {
            this.renderer.removeClass(this.elementRef.nativeElement, 'k-state-empty');
        }
        this.changeDetectorRef.markForCheck();
    };
    FloatingLabelComponent.prototype.setAriaLabelledby = function (component) {
        var componentId = component.focusableId || component.id;
        if (componentId) {
            var focusableElement = this.elementRef.nativeElement.querySelector("#" + componentId);
            this.renderer.setAttribute(focusableElement, 'aria-labelledby', this.labelId);
        }
    };
    FloatingLabelComponent.prototype.setLabelFor = function (control) {
        var controlId = control.focusableId || control.id;
        if (this.id && controlId) {
            // input wins
            this.id = controlId;
        }
        else if (this.id) {
            control.focusableId = this.id;
        }
        else if (controlId) {
            this.id = controlId;
        }
        else {
            var id = "k-" + guid();
            control.focusableId = id;
            this.id = id;
        }
    };
    FloatingLabelComponent.prototype.handleAutofill = function (control) {
        var _this = this;
        this.subscribe(control, 'autoFillStart', function () {
            _this.autoFillStarted = true;
            _this.renderer.removeClass(_this.elementRef.nativeElement, 'k-state-empty');
        });
        this.subscribe(control, 'autoFillEnd', function () {
            if (_this.autoFillStarted) {
                _this.autoFillStarted = false;
                if (_this.empty) {
                    _this.renderer.addClass(_this.elementRef.nativeElement, 'k-state-empty');
                }
            }
        });
    };
    FloatingLabelComponent.prototype.addHandlers = function (control) {
        var _this = this;
        var setFocus = function (isFocused) { return function () {
            _this.focused = isFocused;
            _this.updateState();
        }; };
        this.subscribe(control, 'onFocus', setFocus(true));
        this.subscribe(control, 'onBlur', setFocus(false));
        this.handleAutofill(control);
        var updateState = function () { return _this.updateState(); };
        updateState();
        this.subscribe(control, 'onValueChange', updateState);
    };
    FloatingLabelComponent.prototype.validateSetup = function () {
        if (!this.formControl && !this.kendoInput) {
            if (isDevMode()) {
                throw new Error("The FloatingLabelComponent requires a Kendo Input component" +
                    " or a forms-bound component to function properly.");
            }
            return;
        }
    };
    FloatingLabelComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-floatinglabel',
                    exportAs: 'kendoFloatingLabel',
                    providers: [
                        LocalizationService,
                        {
                            provide: L10N_PREFIX,
                            useValue: 'kendo.floatinglabel'
                        }
                    ],
                    template: "\n        <ng-container kendoFloatingLabelLocalizedMessages\n            i18n-optional=\"kendo.floatinglabel.optional|The text for the optional segment of a FloatingLabel component\"\n            optional=\"Optional\"\n         >\n        </ng-container>\n        <ng-content></ng-content>\n        <label *ngIf=\"text\" [for]=\"id\" [attr.id]=\"labelId\" class=\"k-label\">\n            {{ text }}<span *ngIf=\"optional\" class=\"k-label-optional\">({{textFor('optional')}})</span>\n        </label>\n    "
                },] },
    ];
    /** @nocollapse */
    FloatingLabelComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: ChangeDetectorRef },
        { type: LocalizationService }
    ]; };
    FloatingLabelComponent.propDecorators = {
        hostClasses: [{ type: HostBinding, args: ['class.k-floating-label-container',] }],
        focusedClass: [{ type: HostBinding, args: ['class.k-state-focused',] }],
        invalidClass: [{ type: HostBinding, args: ['class.k-state-invalid',] }],
        direction: [{ type: HostBinding, args: ['attr.dir',] }],
        id: [{ type: Input }],
        text: [{ type: Input }],
        optional: [{ type: Input }],
        kendoInput: [{ type: ContentChild, args: [KendoInput,] }],
        formControl: [{ type: ContentChild, args: [NgControl,] }]
    };
    return FloatingLabelComponent;
}());
export { FloatingLabelComponent };
export { ɵ0 };
