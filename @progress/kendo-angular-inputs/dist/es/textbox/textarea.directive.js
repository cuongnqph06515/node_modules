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
var TextAreaDirective = /** @class */ (function () {
    function TextAreaDirective(renderer, element, zone, changeDetector, injector, rtl) {
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
        this.ngChange = function (_) { };
        this.ngTouched = function () { };
        this.direction = rtl ? 'rtl' : 'ltr';
    }
    Object.defineProperty(TextAreaDirective.prototype, "id", {
        get: function () {
            return this.element.nativeElement.id;
        },
        set: function (id) {
            this.renderer.setAttribute(this.element.nativeElement, 'id', id);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    TextAreaDirective.prototype.writeValue = function (value) {
        this.elementValue = value;
        this.resize();
    };
    /**
     * @hidden
     */
    TextAreaDirective.prototype.registerOnChange = function (fn) {
        this.ngChange = fn;
    };
    /**
     * @hidden
     */
    TextAreaDirective.prototype.registerOnTouched = function (fn) {
        this.ngTouched = fn;
    };
    /**
     * @hidden
     */
    TextAreaDirective.prototype.setDisabledState = function (isDisabled) {
        this.setElementProperty('disabled', isDisabled);
    };
    TextAreaDirective.prototype.ngOnInit = function () {
        var _this = this;
        var element = this.element.nativeElement;
        this.zone.runOutsideAngular(function () {
            _this.listeners = [
                _this.renderer.listen(element, 'focus', _this.handleFocus.bind(_this)),
                _this.renderer.listen(element, 'blur', _this.handleBlur.bind(_this)),
                _this.renderer.listen(element, 'animationstart', function (e) {
                    if (e.animationName === 'autoFillStart') {
                        _this.autoFillStart.emit();
                    }
                    else if (e.animationName === 'autoFillEnd') {
                        _this.autoFillEnd.emit();
                    }
                })
            ];
            if (isDocumentAvailable() && _this.autoSize) {
                _this.resizeSubscription = fromEvent(window, 'resize')
                    .pipe((debounceTime(50)))
                    .subscribe(function () { return _this.resize(); });
            }
            _this.inputSubscription = fromEvent(element, 'input')
                .subscribe(_this.handleInput.bind(_this));
        });
        this.control = this.injector.get(NgControl, null);
    };
    TextAreaDirective.prototype.ngOnChanges = function (changes) {
        var element = this.element.nativeElement;
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
                element.style.height = this.initialHeight + "px";
            }
        }
        this.resize();
    };
    TextAreaDirective.prototype.ngOnDestroy = function () {
        this.listeners.forEach(function (listener) { return listener(); });
        if (this.inputSubscription) {
            this.inputSubscription.unsubscribe();
        }
        if (this.resizeSubscription) {
            this.resizeSubscription.unsubscribe();
        }
    };
    Object.defineProperty(TextAreaDirective.prototype, "elementValue", {
        get: function () {
            if (this.element) {
                return this.element.nativeElement.value;
            }
            return '';
        },
        set: function (value) {
            this.setElementProperty('value', (value === undefined || value === null) ? '' : value);
        },
        enumerable: true,
        configurable: true
    });
    TextAreaDirective.prototype.setElementProperty = function (name, value) {
        if (this.element) {
            this.renderer.setProperty(this.element.nativeElement, name, value);
        }
    };
    TextAreaDirective.prototype.resize = function () {
        if (!this.autoSize) {
            return;
        }
        var element = this.element.nativeElement;
        this.renderer.setStyle(element, 'overflow-y', 'hidden');
        element.style.height = this.initialHeight + "px";
        var scrollHeight = element.scrollHeight;
        if (scrollHeight > this.initialHeight) {
            element.style.height = scrollHeight + "px";
        }
    };
    TextAreaDirective.prototype.handleInput = function () {
        var _this = this;
        var value = this.elementValue;
        this.value = value;
        if (this.control || hasObservers(this.onValueChange) || hasObservers(this.valueChange)) {
            this.zone.run(function () {
                _this.ngChange(value);
                _this.onValueChange.emit(value);
                _this.valueChange.emit(value);
                _this.changeDetector.markForCheck();
            });
        }
        this.resize();
    };
    TextAreaDirective.prototype.handleFocus = function () {
        var _this = this;
        if (hasObservers(this.onFocus)) {
            this.zone.run(function () {
                _this.onFocus.emit();
            });
        }
    };
    TextAreaDirective.prototype.handleBlur = function () {
        var _this = this;
        if (hasObservers(this.onBlur) || requiresZoneOnBlur(this.control)) {
            this.zone.run(function () {
                _this.ngTouched();
                _this.onBlur.emit();
                _this.changeDetector.markForCheck();
            });
        }
    };
    TextAreaDirective.decorators = [
        { type: Directive, args: [{
                    providers: [{
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(function () { return TextAreaDirective; }),
                            multi: true
                        }, {
                            provide: KendoInput,
                            useExisting: forwardRef(function () { return TextAreaDirective; })
                        }],
                    selector: 'textarea[kendoTextArea]'
                },] },
    ];
    /** @nocollapse */
    TextAreaDirective.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ElementRef },
        { type: NgZone },
        { type: ChangeDetectorRef },
        { type: Injector },
        { type: Boolean, decorators: [{ type: Optional }, { type: Inject, args: [RTL,] }] }
    ]; };
    TextAreaDirective.propDecorators = {
        elementClass: [{ type: HostBinding, args: ['class.k-textarea',] }],
        autofillClass: [{ type: HostBinding, args: ['class.k-autofill',] }],
        direction: [{ type: HostBinding, args: ['attr.dir',] }],
        valueChange: [{ type: Output }],
        autoSize: [{ type: Input }],
        value: [{ type: Input }]
    };
    return TextAreaDirective;
}());
export { TextAreaDirective };
