/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, ElementRef, Renderer2, NgZone, Input, HostBinding, forwardRef, Component, NgModule, EventEmitter, isDevMode, ChangeDetectorRef, ContentChild, ViewChild } from '@angular/core';
import { isDocumentAvailable, guid, KendoInput } from '@progress/kendo-angular-common';
import { ComponentMessages, LocalizationService, L10N_PREFIX } from '@progress/kendo-angular-l10n';
import { CommonModule } from '@angular/common';
import { NgControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

/**
 * @hidden
 */
const isUploadComponent = (component) => component.wrapper && component.wrapper.tagName === 'KENDO-UPLOAD';
/**
 * @hidden
 */
const getNativeInputContent = (element) => element.querySelector('kendo-label > input, kendo-label > textarea, kendo-label > select');
/**
 * @hidden
 */
const isActiveCheckboxOrRadio = (component) => component instanceof HTMLInputElement && /^(checkbox|radio)$/.test(component.type) && !component.hidden;
/**
 * @hidden
 */
const isNestedOrAssociated = (component, label) => component.parentElement === label || label.hasAttribute('for');
/**
 * @hidden
 */
const shouldClickComponent = (component, label) => isActiveCheckboxOrRadio(component) && !isNestedOrAssociated(component, label);
/**
 * @hidden
 */
const getRootElement = (element) => {
    if (!element) {
        return null;
    }
    let rootElement = element;
    while (rootElement.parentElement) {
        rootElement = rootElement.parentElement;
    }
    return rootElement;
};

/**
 * Represents the [Kendo UI Label directive for Angular]({% slug overview_label %}).
 * The Label associates a focusable Angular component or an HTML element
 * with a `label` tag by using the `[for]` property binding.
 *
 * To associate a component by using the `label` element, either:
 * * Set the `[for]` property binding to a
 * [template reference variable]({{ site.data.urls.angular['templatesyntax'] }}#template-reference-variables--var-), or
 * * Set the `[for]` property binding to an `id` HTML string value.
 *
 * @example
 * ```ts
 * _@Component({
 * selector: 'my-app',
 * template: `
 *  <div class="row example-wrapper" style="min-height: 450px;">
 *    <div class="col-xs-12 col-md-6 example-col">
 *      <label [for]="datepicker">DatePicker: </label>
 *      <kendo-datepicker #datepicker></kendo-datepicker>
 *    </div>
 *
 *    <div class="col-xs-12 col-md-6 example-col">
 *      <label [for]="'input'">Input: </label>
 *      <input id="input" />
 *    </div>
 *  </div>
 * `
 * })
 * class AppComponent { }
 * ```
 */
class LabelDirective {
    constructor(label, renderer, zone) {
        this.label = label;
        this.renderer = renderer;
        this.zone = zone;
        this.labelClass = true;
        this.handleClick = () => {
            const component = this.getFocusableComponent();
            if (!component) {
                return;
            }
            if (isUploadComponent(component)) {
                component.fileSelect.nativeElement.click();
            }
            if (component.focus) {
                component.focus();
            }
            // https://www.w3.org/TR/html52/sec-forms.html#labelable-element
            if (shouldClickComponent(component, this.label.nativeElement)) {
                component.click();
            }
        };
    }
    get labelFor() {
        if (typeof this.for === 'string') {
            return this.for;
        }
        if (!isDocumentAvailable()) {
            return null;
        }
        const component = this.getFocusableComponent() || {};
        return component.focusableId || component.id || null;
    }
    /**
     * @hidden
     */
    ngAfterViewInit() {
        this.setAriaLabelledby();
        this.zone.runOutsideAngular(() => this.clickListener = this.renderer.listen(this.label.nativeElement, 'click', this.handleClick));
    }
    /**
     * @hidden
     */
    ngOnDestroy() {
        if (this.clickListener) {
            this.clickListener();
        }
    }
    /**
     * @hidden
     */
    setAriaLabelledby() {
        if (!isDocumentAvailable()) {
            return;
        }
        const component = this.getFocusableComponent();
        if (component && component.focusableId) {
            const rootElement = getRootElement(this.label.nativeElement);
            const labelTarget = rootElement.querySelector(`#${component.focusableId}`);
            if (!labelTarget) {
                return;
            }
            const labelElement = this.label.nativeElement;
            const id = labelElement.id || `k-${guid()}`;
            if (!labelElement.getAttribute('id')) {
                this.renderer.setAttribute(labelElement, 'id', id);
            }
            this.renderer.setAttribute(labelTarget, 'aria-labelledby', id);
        }
    }
    getFocusableComponent() {
        const target = this.for;
        return target && target.focus !== undefined ? target : null;
    }
}
LabelDirective.decorators = [
    { type: Directive, args: [{
                selector: 'label[for]' //tslint:disable-line:directive-selector
            },] },
];
/** @nocollapse */
LabelDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: NgZone }
];
LabelDirective.propDecorators = {
    for: [{ type: Input }],
    labelFor: [{ type: HostBinding, args: ['attr.for',] }],
    labelClass: [{ type: HostBinding, args: ['class.k-label',] }]
};

/**
 * @hidden
 */
class Messages extends ComponentMessages {
}
Messages.propDecorators = {
    optional: [{ type: Input }]
};

/**
 * @hidden
 */
class LocalizedMessagesDirective extends Messages {
    constructor(service) {
        super();
        this.service = service;
    }
}
LocalizedMessagesDirective.decorators = [
    { type: Directive, args: [{
                providers: [
                    {
                        provide: Messages,
                        useExisting: forwardRef(() => LocalizedMessagesDirective)
                    }
                ],
                selector: `
      [kendoLabelLocalizedMessages],
      [kendoFloatingLabelLocalizedMessages]
    `
            },] },
];
/** @nocollapse */
LocalizedMessagesDirective.ctorParameters = () => [
    { type: LocalizationService }
];

/**
 * Custom component messages override default component messages
 * ([see example]({% slug label_globalization %}#toc-localization)).
 */
class CustomMessagesComponent extends Messages {
    constructor(service) {
        super();
        this.service = service;
    }
    get override() {
        return true;
    }
}
CustomMessagesComponent.decorators = [
    { type: Component, args: [{
                providers: [
                    {
                        provide: Messages,
                        useExisting: forwardRef(() => CustomMessagesComponent)
                    }
                ],
                selector: 'kendo-label-messages, kendo-floatinglabel-messages',
                template: ``
            },] },
];
/** @nocollapse */
CustomMessagesComponent.ctorParameters = () => [
    { type: LocalizationService }
];

const SHARED_DIRECTIVES = [
    LocalizedMessagesDirective,
    CustomMessagesComponent
];
/**
 * @hidden
 */
class SharedDirectivesModule {
}
SharedDirectivesModule.decorators = [
    { type: NgModule, args: [{
                declarations: [SHARED_DIRECTIVES],
                exports: [SHARED_DIRECTIVES]
            },] },
];

/**
 * @hidden
 */
class FloatingLabelInputAdapter {
    constructor(component, formControl) {
        this.component = component;
        const isObservableOrEventEmitter = (event) => event instanceof Observable || event instanceof EventEmitter;
        if (isObservableOrEventEmitter(component.onFocus)) {
            this.onFocus = component.onFocus;
        }
        if (isObservableOrEventEmitter(component.autoFillStart)) {
            this.autoFillStart = component.autoFillStart;
        }
        if (isObservableOrEventEmitter(component.autoFillEnd)) {
            this.autoFillEnd = component.autoFillEnd;
        }
        if (isObservableOrEventEmitter(component.onBlur)) {
            this.onBlur = component.onBlur;
        }
        if (formControl) {
            this.onValueChange = formControl.valueChanges;
        }
        else if (component.onValueChange) {
            this.onValueChange = component.onValueChange;
        }
    }
    get focusableId() {
        const component = this.component;
        if ('focusableId' in component) {
            return component.focusableId;
        }
        else if ('id' in component) {
            return component.id;
        }
        return "";
    }
    set focusableId(value) {
        const component = this.component;
        if ('focusableId' in component) {
            component.focusableId = value;
        }
        else if ('id' in component) {
            component.id = value;
        }
    }
}

const isFunction = (x) => Object.prototype.toString.call(x) === '[object Function]';
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
class FloatingLabelComponent {
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

const COMPONENT_DIRECTIVES = [FloatingLabelComponent];
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the TextBox directive.
 *
 * @example
 *
 * ```ts-no-run
 *
 * // The browser platform with a compiler
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 *
 * import { NgModule } from '@angular/core';
 *
 * // Import the app component
 * import { AppComponent } from './app.component';
 *
 * // Define the app module
 * _@NgModule({
 *     declarations: [AppComponent], // declare app component
 *     imports:      [BrowserModule, FloatingLabelModule], // import FloatingLabel module
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 *
 * ```
 */
class FloatingLabelModule {
}
FloatingLabelModule.decorators = [
    { type: NgModule, args: [{
                declarations: [...COMPONENT_DIRECTIVES],
                exports: [...COMPONENT_DIRECTIVES, SharedDirectivesModule],
                imports: [CommonModule, SharedDirectivesModule]
            },] },
];

/**
 * Represents the [Kendo UI Label component for Angular]({% slug label_basic %}).
 *
 * Associates a label with input elements or components.
 *
 * @example
 * ```ts
 *
 * _@Component({
 *   selector: 'my-app',
 *   template: `
 *     <kendo-label [for]="input" text="First name">
 *       <input [(ngModel)]="name" kendoTextBox #input />
 *     </kendo-label>
 *   `
 * })
 * class AppComponent {
 *     public name = 'John';
 * }
 *
 * ```
 */
class LabelComponent {
    constructor(elementRef, renderer, localization) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.localization = localization;
        this.subscriptions = new Subscription();
        this.direction = localization.rtl ? 'rtl' : 'ltr';
        this.renderer.removeAttribute(this.elementRef.nativeElement, 'id');
    }
    /**
     * @hidden
     */
    ngAfterContentInit() {
        if (this.for) {
            this.control = this.for;
            return;
        }
        const nativeInputContent = getNativeInputContent(this.elementRef.nativeElement);
        if (nativeInputContent) {
            if (!nativeInputContent.hasAttribute('id')) {
                this.renderer.setAttribute(nativeInputContent, 'id', `k-${guid()}`);
            }
            this.control = nativeInputContent;
            return;
        }
        this.control = this.kendoInput;
    }
    /**
     * @hidden
     */
    ngOnInit() {
        this.subscriptions.add(this.localization.changes.subscribe(({ rtl }) => {
            this.direction = rtl ? 'rtl' : 'ltr';
        }));
    }
    /**
     * @hidden
     */
    ngAfterViewInit() {
        this.labelDirective.setAriaLabelledby();
    }
    /**
     * @hidden
     */
    ngOnDestroy() {
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
        }
    }
    /**
     * @hidden
     */
    textFor(key) {
        return this.localization.get(key);
    }
}
LabelComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-label',
                exportAs: 'kendoLabel',
                providers: [
                    LocalizationService,
                    {
                        provide: L10N_PREFIX,
                        useValue: 'kendo.label'
                    }
                ],
                template: `
        <ng-container kendoLabelLocalizedMessages
            i18n-optional="kendo.label.optional|The text for the optional segment of a Label component"
            optional="Optional"
         >
        </ng-container>
        <label
            [for]="control"
            [class.k-label-empty]="!text">
            {{ text }}<span *ngIf="optional" class="k-label-optional">({{textFor('optional')}})</span>
        </label>
        <ng-content></ng-content>
    `
            },] },
];
/** @nocollapse */
LabelComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: LocalizationService }
];
LabelComponent.propDecorators = {
    direction: [{ type: HostBinding, args: ['attr.dir',] }],
    text: [{ type: Input }],
    for: [{ type: Input }],
    optional: [{ type: Input }],
    labelDirective: [{ type: ViewChild, args: [LabelDirective, { static: true },] }],
    kendoInput: [{ type: ContentChild, args: [KendoInput, { static: true },] }]
};

const COMPONENT_DIRECTIVES$1 = [
    LabelDirective,
    LabelComponent
];
/**
 * The exported package module.
 *
 * The package exports:
 * - `LabelDirective`&mdash;The Label directive class.
 * - `LabelComponent`&mdash;The Label component class
 * - `FLoatingLabel`&mdash;The FloatingLabel component class.
 *
 * @example
 *
 * ```ts-no-run
 * // Import the Label module
 * import { LabelModule } from '@progress/kendo-angular-label';
 *
 * // The browser platform with a compiler
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 *
 * import { NgModule } from '@angular/core';
 *
 * // Import the app component
 * import { AppComponent } from './app.component';
 *
 * // Define the app module
 * _@NgModule({
 *     declarations: [AppComponent], // declare app component
 *     imports:      [BrowserModule, LabelModule], // import Label module
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 *
 * ```
 */
class LabelModule {
}
LabelModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, SharedDirectivesModule],
                declarations: [...COMPONENT_DIRECTIVES$1],
                exports: [...COMPONENT_DIRECTIVES$1, FloatingLabelModule, SharedDirectivesModule]
            },] },
];

/**
 * Generated bundle index. Do not edit.
 */

export { LocalizedMessagesDirective, Messages, SharedDirectivesModule, LabelDirective, LabelModule, FloatingLabelModule, FloatingLabelComponent, LabelComponent, CustomMessagesComponent };
