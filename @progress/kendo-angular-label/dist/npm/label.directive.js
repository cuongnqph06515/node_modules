/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./util");
var core_1 = require("@angular/core");
var kendo_angular_common_1 = require("@progress/kendo-angular-common");
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
            if (util_1.isUploadComponent(component)) {
                component.fileSelect.nativeElement.click();
            }
            if (component.focus) {
                component.focus();
            }
            // https://www.w3.org/TR/html52/sec-forms.html#labelable-element
            if (util_1.shouldClickComponent(component, _this.label.nativeElement)) {
                component.click();
            }
        };
    }
    Object.defineProperty(LabelDirective.prototype, "labelFor", {
        get: function () {
            if (typeof this.for === 'string') {
                return this.for;
            }
            if (!kendo_angular_common_1.isDocumentAvailable()) {
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
        if (!kendo_angular_common_1.isDocumentAvailable()) {
            return;
        }
        var component = this.getFocusableComponent();
        if (component && component.focusableId) {
            var rootElement = util_1.getRootElement(this.label.nativeElement);
            var labelTarget = rootElement.querySelector("#" + component.focusableId);
            if (!labelTarget) {
                return;
            }
            var labelElement = this.label.nativeElement;
            var id = labelElement.id || "k-" + kendo_angular_common_1.guid();
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
        { type: core_1.Directive, args: [{
                    selector: 'label[for]' //tslint:disable-line:directive-selector
                },] },
    ];
    /** @nocollapse */
    LabelDirective.ctorParameters = function () { return [
        { type: core_1.ElementRef },
        { type: core_1.Renderer2 },
        { type: core_1.NgZone }
    ]; };
    LabelDirective.propDecorators = {
        for: [{ type: core_1.Input }],
        labelFor: [{ type: core_1.HostBinding, args: ['attr.for',] }],
        labelClass: [{ type: core_1.HostBinding, args: ['class.k-label',] }]
    };
    return LabelDirective;
}());
exports.LabelDirective = LabelDirective;
