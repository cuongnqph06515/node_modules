/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var kendo_angular_common_1 = require("@progress/kendo-angular-common");
var label_directive_1 = require("./../label.directive");
var util_1 = require("./../util");
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
        this.subscriptions = new rxjs_1.Subscription();
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
        var nativeInputContent = util_1.getNativeInputContent(this.elementRef.nativeElement);
        if (nativeInputContent) {
            if (!nativeInputContent.hasAttribute('id')) {
                this.renderer.setAttribute(nativeInputContent, 'id', "k-" + kendo_angular_common_1.guid());
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
        { type: core_1.Component, args: [{
                    selector: 'kendo-label',
                    exportAs: 'kendoLabel',
                    providers: [
                        kendo_angular_l10n_1.LocalizationService,
                        {
                            provide: kendo_angular_l10n_1.L10N_PREFIX,
                            useValue: 'kendo.label'
                        }
                    ],
                    template: "\n        <ng-container kendoLabelLocalizedMessages\n            i18n-optional=\"kendo.label.optional|The text for the optional segment of a Label component\"\n            optional=\"Optional\"\n         >\n        </ng-container>\n        <label\n            [for]=\"control\"\n            [class.k-label-empty]=\"!text\">\n            {{ text }}<span *ngIf=\"optional\" class=\"k-label-optional\">({{textFor('optional')}})</span>\n        </label>\n        <ng-content></ng-content>\n    "
                },] },
    ];
    /** @nocollapse */
    LabelComponent.ctorParameters = function () { return [
        { type: core_1.ElementRef },
        { type: core_1.Renderer2 },
        { type: kendo_angular_l10n_1.LocalizationService }
    ]; };
    LabelComponent.propDecorators = {
        direction: [{ type: core_1.HostBinding, args: ['attr.dir',] }],
        text: [{ type: core_1.Input }],
        for: [{ type: core_1.Input }],
        optional: [{ type: core_1.Input }],
        labelDirective: [{ type: core_1.ViewChild, args: [label_directive_1.LabelDirective, { static: true },] }],
        kendoInput: [{ type: core_1.ContentChild, args: [kendo_angular_common_1.KendoInput, { static: true },] }]
    };
    return LabelComponent;
}());
exports.LabelComponent = LabelComponent;
