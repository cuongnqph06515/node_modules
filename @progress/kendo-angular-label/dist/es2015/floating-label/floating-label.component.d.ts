/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { AfterContentInit, ElementRef, OnDestroy, Renderer2, ChangeDetectorRef } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { NgControl } from '@angular/forms';
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
export declare class FloatingLabelComponent implements AfterContentInit, OnDestroy {
    private elementRef;
    private renderer;
    private changeDetectorRef;
    private localization;
    hostClasses: boolean;
    readonly focusedClass: boolean;
    readonly invalidClass: boolean;
    /**
     * @hidden
     */
    direction: string;
    /**
     * Sets the `id` attribute of the input inside the floating label.
     */
    id: string;
    /**
     * Specifies the text content of the floating label which describes the input.
     */
    text: string;
    /**
     * Allows marking a form field as optional. By default renders the `Optional` text when enabled.
     * The text can be customized by providing a custom message ([see example]({% slug label_globalization %}#toc-custom-messages)).
     *
     * The default value is `false`
     */
    optional: boolean;
    kendoInput: any;
    formControl: NgControl;
    /**
     * @hidden
     */
    focused: boolean;
    /**
     * @hidden
     */
    empty: boolean;
    /**
     * @hidden
     */
    invalid: boolean;
    /**
     * @hidden
     */
    labelId: string;
    private subscription;
    private autoFillStarted;
    constructor(elementRef: ElementRef, renderer: Renderer2, changeDetectorRef: ChangeDetectorRef, localization: LocalizationService);
    /**
     * @hidden
     */
    ngAfterContentInit(): void;
    ngAfterViewInit(): void;
    /**
     * @hidden
     */
    ngOnDestroy(): void;
    /**
     * @hidden
     */
    textFor(key: string): string;
    private subscribe;
    private updateState;
    private setAriaLabelledby;
    private setLabelFor;
    private handleAutofill;
    private addHandlers;
    private validateSetup;
}
