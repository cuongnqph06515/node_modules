"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var focus_service_1 = require("./focus.service");
/**
 * @hidden
 */
var FocusableDirective = /** @class */ (function () {
    function FocusableDirective(element, renderer, focusService) {
        this.element = element;
        this.renderer = renderer;
        this.focusService = focusService;
        /**
         * The order of the element with respect to the other focusable elements.
         * If multiple elements share the same value, their relative to each other order follows their position in the component tree.
         */
        this.focusIndex = 0;
        this.toggle(false);
        this.focusService.register(this);
    }
    Object.defineProperty(FocusableDirective.prototype, "visible", {
        get: function () {
            return this.element.nativeElement.style.display !== 'none';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FocusableDirective.prototype, "enabled", {
        get: function () {
            return !this.element.nativeElement.disabled;
        },
        enumerable: true,
        configurable: true
    });
    FocusableDirective.prototype.ngOnDestroy = function () {
        this.focusService.unregister(this);
    };
    FocusableDirective.prototype.toggle = function (active) {
        if (active !== this.active) {
            var index = active ? '0' : '-1';
            this.renderer.setAttribute(this.element.nativeElement, 'tabIndex', index);
            this.active = active;
        }
    };
    FocusableDirective.prototype.canFocus = function () {
        return this.visible && this.enabled;
    };
    FocusableDirective.prototype.focus = function () {
        this.element.nativeElement.focus();
    };
    FocusableDirective.prototype.toggleFocus = function (value) {
        var focusedClass = 'k-state-selected';
        var element = this.element.nativeElement;
        if (value) {
            this.renderer.addClass(element, focusedClass);
        }
        else {
            this.renderer.removeClass(element, focusedClass);
        }
        this.renderer.setAttribute(element, 'aria-selected', value.toString());
    };
    FocusableDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[kendoSchedulerFocusIndex]'
                },] },
    ];
    /** @nocollapse */
    FocusableDirective.ctorParameters = function () { return [
        { type: core_1.ElementRef },
        { type: core_1.Renderer2 },
        { type: focus_service_1.FocusService }
    ]; };
    FocusableDirective.propDecorators = {
        focusIndex: [{ type: core_1.Input, args: ['kendoSchedulerFocusIndex',] }]
    };
    return FocusableDirective;
}());
exports.FocusableDirective = FocusableDirective;
