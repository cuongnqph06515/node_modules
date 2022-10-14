/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ContentChild, Component, ElementRef, HostBinding, Input, Renderer2, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { LocalizationService, L10N_PREFIX } from '@progress/kendo-angular-l10n';
import { KendoInput, guid } from '@progress/kendo-angular-common';
import { LabelDirective } from './../label.directive';
import { getNativeInputContent } from './../util';
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
export { LabelComponent };
