/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ContentChild, Component, ElementRef, EventEmitter, HostBinding, Input, Renderer2, isDevMode, ChangeDetectorRef } from '@angular/core';
import { LocalizationService, L10N_PREFIX } from '@progress/kendo-angular-l10n';
import { NgControl } from '@angular/forms';
import { guid, KendoInput } from '@progress/kendo-angular-common';
import { FloatingLabelInputAdapter } from './floating-label-input-adapter';
const isFunction = (x) => Object.prototype.toString.call(x) === '[object Function]';
const ɵ0 = isFunction;
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
export class FloatingLabelComponent {
    constructor(elementRef, renderer, changeDetectorRef, localization) {
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
        this.labelId = `k-${guid()}`;
        this.autoFillStarted = false;
        this.direction = localization.rtl ? 'rtl' : 'ltr';
        this.renderer.removeAttribute(this.elementRef.nativeElement, "id");
    }
    get focusedClass() {
        return this.focused;
    }
    get invalidClass() {
        return this.invalid;
    }
    /**
     * @hidden
     */
    ngAfterContentInit() {
        this.validateSetup();
        const control = new FloatingLabelInputAdapter(this.kendoInput || this.formControl.valueAccessor, this.formControl);
        this.addHandlers(control);
        this.setLabelFor(control);
    }
    ngAfterViewInit() {
        if (this.kendoInput) {
            this.setAriaLabelledby(this.kendoInput);
        }
    }
    /**
     * @hidden
     */
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    /**
     * @hidden
     */
    textFor(key) {
        return this.localization.get(key);
    }
    subscribe(control, eventName, handler) {
        if (control[eventName] instanceof EventEmitter) {
            const subscription = control[eventName].subscribe(handler);
            if (!this.subscription) {
                this.subscription = subscription;
            }
            else {
                this.subscription.add(subscription);
            }
        }
    }
    updateState() {
        const empty = value => {
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
        const formControl = this.formControl;
        if (formControl) {
            const valueAccessor = formControl.valueAccessor;
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
    }
    setAriaLabelledby(component) {
        const componentId = component.focusableId || component.id;
        if (componentId) {
            const focusableElement = this.elementRef.nativeElement.querySelector(`#${componentId}`);
            this.renderer.setAttribute(focusableElement, 'aria-labelledby', this.labelId);
        }
    }
    setLabelFor(control) {
        const controlId = control.focusableId || control.id;
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
            const id = `k-${guid()}`;
            control.focusableId = id;
            this.id = id;
        }
    }
    handleAutofill(control) {
        this.subscribe(control, 'autoFillStart', () => {
            this.autoFillStarted = true;
            this.renderer.removeClass(this.elementRef.nativeElement, 'k-state-empty');
        });
        this.subscribe(control, 'autoFillEnd', () => {
            if (this.autoFillStarted) {
                this.autoFillStarted = false;
                if (this.empty) {
                    this.renderer.addClass(this.elementRef.nativeElement, 'k-state-empty');
                }
            }
        });
    }
    addHandlers(control) {
        const setFocus = (isFocused) => () => {
            this.focused = isFocused;
            this.updateState();
        };
        this.subscribe(control, 'onFocus', setFocus(true));
        this.subscribe(control, 'onBlur', setFocus(false));
        this.handleAutofill(control);
        const updateState = () => this.updateState();
        updateState();
        this.subscribe(control, 'onValueChange', updateState);
    }
    validateSetup() {
        if (!this.formControl && !this.kendoInput) {
            if (isDevMode()) {
                throw new Error("The FloatingLabelComponent requires a Kendo Input component" +
                    " or a forms-bound component to function properly.");
            }
            return;
        }
    }
}
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
                template: `
        <ng-container kendoFloatingLabelLocalizedMessages
            i18n-optional="kendo.floatinglabel.optional|The text for the optional segment of a FloatingLabel component"
            optional="Optional"
         >
        </ng-container>
        <ng-content></ng-content>
        <label *ngIf="text" [for]="id" [attr.id]="labelId" class="k-label">
            {{ text }}<span *ngIf="optional" class="k-label-optional">({{textFor('optional')}})</span>
        </label>
    `
            },] },
];
/** @nocollapse */
FloatingLabelComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: ChangeDetectorRef },
    { type: LocalizationService }
];
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
export { ɵ0 };
