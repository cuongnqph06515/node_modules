/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var kendo_angular_common_1 = require("@progress/kendo-angular-common");
/**
 * Represents the [Kendo UI TextBox directive]({% slug overview_textbox %}) for the Inputs components for Angular.
 * Used to style the textbox of any `input` element.
 *
 * @example
 * ```ts-no-run
 * <input kendoTextBox />
 * <input kendoTextBox type="email" />
 * <input kendoTextBox type="password" />
 * ```
 */
var TextBoxDirective = /** @class */ (function () {
    function TextBoxDirective(renderer, inputElement, ngZone) {
        this.renderer = renderer;
        this.inputElement = inputElement;
        this.ngZone = ngZone;
        this.hostClass = true;
        /**
         * @hidden
         */
        this.onFocus = new core_1.EventEmitter();
        /**
         * @hidden
         */
        this.onBlur = new core_1.EventEmitter();
        /**
         * @hidden
         */
        this.onValueChange = new core_1.EventEmitter();
        /**
         * @hidden
         */
        this.autoFillStart = new core_1.EventEmitter();
        /**
         * @hidden
         */
        this.autoFillEnd = new core_1.EventEmitter();
        this.listeners = [];
    }
    Object.defineProperty(TextBoxDirective.prototype, "value", {
        /**
         * @hidden
         */
        get: function () {
            return this.inputElement.nativeElement.value;
        },
        /**
         * @hidden
         */
        set: function (text) {
            if (!this.inputElement) {
                return;
            }
            this.inputElement.nativeElement.value = (text === undefined || text === null) ? '' : text;
            this.onValueChange.emit();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextBoxDirective.prototype, "id", {
        get: function () {
            return this.inputElement.nativeElement.id;
        },
        set: function (id) {
            this.renderer.setAttribute(this.inputElement.nativeElement, 'id', id);
        },
        enumerable: true,
        configurable: true
    });
    TextBoxDirective.prototype.ngAfterViewInit = function () {
        var _this = this;
        var input = this.inputElement.nativeElement;
        this.listeners = [
            this.renderer.listen(input, 'focus', function () { return _this.onFocus.emit(); }),
            this.renderer.listen(input, 'blur', function () { return _this.onBlur.emit(); })
        ];
        this.ngZone.runOutsideAngular(function () {
            _this.renderer.listen(input, 'animationstart', function (e) {
                if (e.animationName === 'autoFillStart') {
                    _this.autoFillStart.emit();
                }
                else if (e.animationName === 'autoFillEnd') {
                    _this.autoFillEnd.emit();
                }
            });
        });
    };
    TextBoxDirective.prototype.ngOnDestroy = function () {
        this.listeners.forEach(function (listener) { return listener(); });
    };
    TextBoxDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: 'input[kendoTextBox]',
                    providers: [{
                            provide: kendo_angular_common_1.KendoInput,
                            useExisting: core_1.forwardRef(function () { return TextBoxDirective; })
                        }]
                },] },
    ];
    /** @nocollapse */
    TextBoxDirective.ctorParameters = function () { return [
        { type: core_1.Renderer2 },
        { type: core_1.ElementRef },
        { type: core_1.NgZone }
    ]; };
    TextBoxDirective.propDecorators = {
        hostClass: [{ type: core_1.HostBinding, args: ['class.k-textbox',] }],
        value: [{ type: core_1.Input }]
    };
    return TextBoxDirective;
}());
exports.TextBoxDirective = TextBoxDirective;
