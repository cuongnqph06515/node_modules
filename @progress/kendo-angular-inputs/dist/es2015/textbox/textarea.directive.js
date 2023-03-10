/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, ElementRef, EventEmitter, HostBinding, Renderer2, Optional, Inject, Input, NgZone, forwardRef, Output, ChangeDetectorRef, Injector } from '@angular/core';
import { NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { hasObservers, KendoInput, isDocumentAvailable } from '@progress/kendo-angular-common';
import { requiresZoneOnBlur } from '../common/utils';
import { RTL } from '@progress/kendo-angular-l10n';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
/**
 * Represents the [Kendo UI TextArea directive for the Inputs components for Angular]({% slug overview_textarea %}).
 * Provides floating labels to `textarea` elements.
 *
 * @example
 * ```ts-no-run
 * <textarea kendoTextArea></textarea>
 * ```
 */
export class TextAreaDirective {
    constructor(renderer, element, zone, changeDetector, injector, rtl) {
        this.renderer = renderer;
        this.element = element;
        this.zone = zone;
        this.changeDetector = changeDetector;
        this.injector = injector;
        this.elementClass = true;
        this.autofillClass = true;
        /**
         * Fires each time the textarea value is changed.
         */
        this.valueChange = new EventEmitter();
        /**
         * Specifies if the `textarea` element will resize its height automatically
         * ([see example]({% slug overview_textarea %}#toc-auto-resizing)).
         *
         * @default false
         */
        this.autoSize = false;
        /**
         * @hidden
         */
        this.onFocus = new EventEmitter();
        /**
         * @hidden
         */
        this.onBlur = new EventEmitter();
        /**
         * @hidden
         */
        this.onValueChange = new EventEmitter();
        /**
         * @hidden
         */
        this.autoFillStart = new EventEmitter();
        /**
         * @hidden
         */
        this.autoFillEnd = new EventEmitter();
        this.listeners = [];
        this.ngChange = (_) => { };
        this.ngTouched = () => { };
        this.direction = rtl ? 'rtl' : 'ltr';
    }
    get id() {
        return this.element.nativeElement.id;
    }
    set id(id) {
        this.renderer.setAttribute(this.element.nativeElement, 'id', id);
    }
    /**
     * @hidden
     */
    writeValue(value) {
        this.elementValue = value;
        this.resize();
    }
    /**
     * @hidden
     */
    registerOnChange(fn) {
        this.ngChange = fn;
    }
    /**
     * @hidden
     */
    registerOnTouched(fn) {
        this.ngTouched = fn;
    }
    /**
     * @hidden
     */
    setDisabledState(isDisabled) {
        this.setElementProperty('disabled', isDisabled);
    }
    ngOnInit() {
        const element = this.element.nativeElement;
        this.zone.runOutsideAngular(() => {
            this.listeners = [
                this.renderer.listen(element, 'focus', this.handleFocus.bind(this)),
                this.renderer.listen(element, 'blur', this.handleBlur.bind(this)),
                this.renderer.listen(element, 'animationstart', (e) => {
                    if (e.animationName === 'autoFillStart') {
                        this.autoFillStart.emit();
                    }
                    else if (e.animationName === 'autoFillEnd') {
                        this.autoFillEnd.emit();
                    }
                })
            ];
            if (isDocumentAvailable() && this.autoSize) {
                this.resizeSubscription = fromEvent(window, 'resize')
                    .pipe((debounceTime(50)))
                    .subscribe(() => this.resize());
            }
            this.inputSubscription = fromEvent(element, 'input')
                .subscribe(this.handleInput.bind(this));
        });
        this.control = this.injector.get(NgControl, null);
    }
    ngOnChanges(changes) {
        const element = this.element.nativeElement;
        if (changes.value) {
            this.elementValue = this.value;
        }
        if (changes.autoSize) {
            if (this.autoSize) {
                this.initialHeight = element.offsetHeight;
                this.renderer.setStyle(element, 'resize', 'none');
            }
            else {
                this.renderer.setStyle(element, 'overflow-y', 'auto');
                this.renderer.setStyle(element, 'resize', 'both');
                element.style.height = `${this.initialHeight}px`;
            }
        }
        this.resize();
    }
    ngOnDestroy() {
        this.listeners.forEach(listener => listener());
        if (this.inputSubscription) {
            this.inputSubscription.unsubscribe();
        }
        if (this.resizeSubscription) {
            this.resizeSubscription.unsubscribe();
        }
    }
    get elementValue() {
        if (this.element) {
            return this.element.nativeElement.value;
        }
        return '';
    }
    set elementValue(value) {
        this.setElementProperty('value', (value === undefined || value === null) ? '' : value);
    }
    setElementProperty(name, value) {
        if (this.element) {
            this.renderer.setProperty(this.element.nativeElement, name, value);
        }
    }
    resize() {
        if (!this.autoSize) {
            return;
        }
        const element = this.element.nativeElement;
        this.renderer.setStyle(element, 'overflow-y', 'hidden');
        element.style.height = `${this.initialHeight}px`;
        const scrollHeight = element.scrollHeight;
        if (scrollHeight > this.initialHeight) {
            element.style.height = `${scrollHeight}px`;
        }
    }
    handleInput() {
        const value = this.elementValue;
        this.value = value;
        if (this.control || hasObservers(this.onValueChange) || hasObservers(this.valueChange)) {
            this.zone.run(() => {
                this.ngChange(value);
                this.onValueChange.emit(value);
                this.valueChange.emit(value);
                this.changeDetector.markForCheck();
            });
        }
        this.resize();
    }
    handleFocus() {
        if (hasObservers(this.onFocus)) {
            this.zone.run(() => {
                this.onFocus.emit();
            });
        }
    }
    handleBlur() {
        if (hasObservers(this.onBlur) || requiresZoneOnBlur(this.control)) {
            this.zone.run(() => {
                this.ngTouched();
                this.onBlur.emit();
                this.changeDetector.markForCheck();
            });
        }
    }
}
TextAreaDirective.decorators = [
    { type: Directive, args: [{
                providers: [{
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => TextAreaDirective),
                        multi: true
                    }, {
                        provide: KendoInput,
                        useExisting: forwardRef(() => TextAreaDirective)
                    }],
                selector: 'textarea[kendoTextArea]'
            },] },
];
/** @nocollapse */
TextAreaDirective.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef },
    { type: NgZone },
    { type: ChangeDetectorRef },
    { type: Injector },
    { type: Boolean, decorators: [{ type: Optional }, { type: Inject, args: [RTL,] }] }
];
TextAreaDirective.propDecorators = {
    elementClass: [{ type: HostBinding, args: ['class.k-textarea',] }],
    autofillClass: [{ type: HostBinding, args: ['class.k-autofill',] }],
    direction: [{ type: HostBinding, args: ['attr.dir',] }],
    valueChange: [{ type: Output }],
    autoSize: [{ type: Input }],
    value: [{ type: Input }]
};
