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
export class LabelComponent {
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
