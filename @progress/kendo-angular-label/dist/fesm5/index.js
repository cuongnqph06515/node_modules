/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, ElementRef, Renderer2, NgZone, Input, HostBinding, forwardRef, Component, NgModule, EventEmitter, isDevMode, ChangeDetectorRef, ContentChild, ViewChild } from '@angular/core';
import { isDocumentAvailable, guid, KendoInput } from '@progress/kendo-angular-common';
import { __extends } from 'tslib';
import { ComponentMessages, LocalizationService, L10N_PREFIX } from '@progress/kendo-angular-l10n';
import { CommonModule } from '@angular/common';
import { NgControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

/**
 * @hidden
 */
var isUploadComponent = function (component) { return component.wrapper && component.wrapper.tagName === 'KENDO-UPLOAD'; };
/**
 * @hidden
 */
var getNativeInputContent = function (element) { return element.querySelector('kendo-label > input, kendo-label > textarea, kendo-label > select'); };
/**
 * @hidden
 */
var isActiveCheckboxOrRadio = function (component) { return component instanceof HTMLInputElement && /^(checkbox|radio)$/.test(component.type) && !component.hidden; };
/**
 * @hidden
 */
var isNestedOrAssociated = function (component, label) { return component.parentElement === label || label.hasAttribute('for'); };
/**
 * @hidden
 */
var shouldClickComponent = function (component, label) { return isActiveCheckboxOrRadio(component) && !isNestedOrAssociated(component, label); };
/**
 * @hidden
 */
var getRootElement = function (element) {
    if (!element) {
        return null;
    }
    var rootElement = element;
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
var LabelDirective = /** @class */ (function () {
    function LabelDirective(label, renderer, zone) {
        var _this = this;
        this.label = label;
        this.renderer = renderer;
        this.zone = zone;
        this.labelClass = true;
        this.handleClick = function () {
            var component = _this.getFocusableComponent();
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
            if (shouldClickComponent(component, _this.label.nativeElement)) {
                component.click();
            }
        };
    }
    Object.defineProperty(LabelDirective.prototype, "labelFor", {
        get: function () {
            if (typeof this.for === 'string') {
                return this.for;
            }
            if (!isDocumentAvailable()) {
                return null;
            }
            var component = this.getFocusableComponent() || {};
            return component.focusableId || component.id || null;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    LabelDirective.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.setAriaLabelledby();
        this.zone.runOutsideAngular(function () { return _this.clickListener = _this.renderer.listen(_this.label.nativeElement, 'click', _this.handleClick); });
    };
    /**
     * @hidden
     */
    LabelDirective.prototype.ngOnDestroy = function () {
        if (this.clickListener) {
            this.clickListener();
        }
    };
    /**
     * @hidden
     */
    LabelDirective.prototype.setAriaLabelledby = function () {
        if (!isDocumentAvailable()) {
            return;
        }
        var component = this.getFocusableComponent();
        if (component && component.focusableId) {
            var rootElement = getRootElement(this.label.nativeElement);
            var labelTarget = rootElement.querySelector("#" + component.focusableId);
            if (!labelTarget) {
                return;
            }
            var labelElement = this.label.nativeElement;
            var id = labelElement.id || "k-" + guid();
            if (!labelElement.getAttribute('id')) {
                this.renderer.setAttribute(labelElement, 'id', id);
            }
            this.renderer.setAttribute(labelTarget, 'aria-labelledby', id);
        }
    };
    LabelDirective.prototype.getFocusableComponent = function () {
        var target = this.for;
        return target && target.focus !== undefined ? target : null;
    };
    LabelDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'label[for]' //tslint:disable-line:directive-selector
                },] },
    ];
    /** @nocollapse */
    LabelDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: NgZone }
    ]; };
    LabelDirective.propDecorators = {
        for: [{ type: Input }],
        labelFor: [{ type: HostBinding, args: ['attr.for',] }],
        labelClass: [{ type: HostBinding, args: ['class.k-label',] }]
    };
    return LabelDirective;
}());

/**
 * @hidden
 */
var Messages = /** @class */ (function (_super) {
    __extends(Messages, _super);
    function Messages() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Messages.propDecorators = {
        optional: [{ type: Input }]
    };
    return Messages;
}(ComponentMessages));

/**
 * @hidden
 */
var LocalizedMessagesDirective = /** @class */ (function (_super) {
    __extends(LocalizedMessagesDirective, _super);
    function LocalizedMessagesDirective(service) {
        var _this = _super.call(this) || this;
        _this.service = service;
        return _this;
    }
    LocalizedMessagesDirective.decorators = [
        { type: Directive, args: [{
                    providers: [
                        {
                            provide: Messages,
                            useExisting: forwardRef(function () { return LocalizedMessagesDirective; })
                        }
                    ],
                    selector: "\n      [kendoLabelLocalizedMessages],\n      [kendoFloatingLabelLocalizedMessages]\n    "
                },] },
    ];
    /** @nocollapse */
    LocalizedMessagesDirective.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    return LocalizedMessagesDirective;
}(Messages));

/**
 * Custom component messages override default component messages
 * ([see example]({% slug label_globalization %}#toc-localization)).
 */
var CustomMessagesComponent = /** @class */ (function (_super) {
    __extends(CustomMessagesComponent, _super);
    function CustomMessagesComponent(service) {
        var _this = _super.call(this) || this;
        _this.service = service;
        return _this;
    }
    Object.defineProperty(CustomMessagesComponent.prototype, "override", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    CustomMessagesComponent.decorators = [
        { type: Component, args: [{
                    providers: [
                        {
                            provide: Messages,
                            useExisting: forwardRef(function () { return CustomMessagesComponent; })
                        }
                    ],
                    selector: 'kendo-label-messages, kendo-floatinglabel-messages',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    CustomMessagesComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    return CustomMessagesComponent;
}(Messages));

var SHARED_DIRECTIVES = [
    LocalizedMessagesDirective,
    CustomMessagesComponent
];
/**
 * @hidden
 */
var SharedDirectivesModule = /** @class */ (function () {
    function SharedDirectivesModule() {
    }
    SharedDirectivesModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [SHARED_DIRECTIVES],
                    exports: [SHARED_DIRECTIVES]
                },] },
    ];
    return SharedDirectivesModule;
}());

/**
 * @hidden
 */
var FloatingLabelInputAdapter = /** @class */ (function () {
    function FloatingLabelInputAdapter(component, formControl) {
        this.component = component;
        var isObservableOrEventEmitter = function (event) { return event instanceof Observable || event instanceof EventEmitter; };
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
    Object.defineProperty(FloatingLabelInputAdapter.prototype, "focusableId", {
        get: function () {
            var component = this.component;
            if ('focusableId' in component) {
                return component.focusableId;
            }
            else if ('id' in component) {
                return component.id;
            }
            return "";
        },
        set: function (value) {
            var component = this.component;
            if ('focusableId' in component) {
                component.focusableId = value;
            }
            else if ('id' in component) {
                component.id = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    return FloatingLabelInputAdapter;
}());

var isFunction = function (x) { return Object.prototype.toString.call(x) === '[object Function]'; };
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

var COMPONENT_DIRECTIVES = [FloatingLabelComponent];
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
var FloatingLabelModule = /** @class */ (function () {
    function FloatingLabelModule() {
    }
    FloatingLabelModule.decorators = [
        { type: NgModule, args: [{
                    declarations: COMPONENT_DIRECTIVES.slice(),
                    exports: COMPONENT_DIRECTIVES.concat([SharedDirectivesModule]),
                    imports: [CommonModule, SharedDirectivesModule]
                },] },
    ];
    return FloatingLabelModule;
}());

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
var LabelComponent = /** @class */ (function () {
    function LabelComponent(elementRef, renderer, localization) {
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
    LabelComponent.prototype.ngAfterContentInit = function () {
        if (this.for) {
            this.control = this.for;
            return;
        }
        var nativeInputContent = getNativeInputContent(this.elementRef.nativeElement);
        if (nativeInputContent) {
            if (!nativeInputContent.hasAttribute('id')) {
                this.renderer.setAttribute(nativeInputContent, 'id', "k-" + guid());
            }
            this.control = nativeInputContent;
            return;
        }
        this.control = this.kendoInput;
    };
    /**
     * @hidden
     */
    LabelComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscriptions.add(this.localization.changes.subscribe(function (_a) {
            var rtl = _a.rtl;
            _this.direction = rtl ? 'rtl' : 'ltr';
        }));
    };
    /**
     * @hidden
     */
    LabelComponent.prototype.ngAfterViewInit = function () {
        this.labelDirective.setAriaLabelledby();
    };
    /**
     * @hidden
     */
    LabelComponent.prototype.ngOnDestroy = function () {
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
        }
    };
    /**
     * @hidden
     */
    LabelComponent.prototype.textFor = function (key) {
        return this.localization.get(key);
    };
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
                    template: "\n        <ng-container kendoLabelLocalizedMessages\n            i18n-optional=\"kendo.label.optional|The text for the optional segment of a Label component\"\n            optional=\"Optional\"\n         >\n        </ng-container>\n        <label\n            [for]=\"control\"\n            [class.k-label-empty]=\"!text\">\n            {{ text }}<span *ngIf=\"optional\" class=\"k-label-optional\">({{textFor('optional')}})</span>\n        </label>\n        <ng-content></ng-content>\n    "
                },] },
    ];
    /** @nocollapse */
    LabelComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: LocalizationService }
    ]; };
    LabelComponent.propDecorators = {
        direction: [{ type: HostBinding, args: ['attr.dir',] }],
        text: [{ type: Input }],
        for: [{ type: Input }],
        optional: [{ type: Input }],
        labelDirective: [{ type: ViewChild, args: [LabelDirective, { static: true },] }],
        kendoInput: [{ type: ContentChild, args: [KendoInput, { static: true },] }]
    };
    return LabelComponent;
}());

var COMPONENT_DIRECTIVES$1 = [
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
var LabelModule = /** @class */ (function () {
    function LabelModule() {
    }
    LabelModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, SharedDirectivesModule],
                    declarations: COMPONENT_DIRECTIVES$1.slice(),
                    exports: COMPONENT_DIRECTIVES$1.concat([FloatingLabelModule, SharedDirectivesModule])
                },] },
    ];
    return LabelModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { LocalizedMessagesDirective, Messages, SharedDirectivesModule, LabelDirective, LabelModule, FloatingLabelModule, FloatingLabelComponent, LabelComponent, CustomMessagesComponent };
