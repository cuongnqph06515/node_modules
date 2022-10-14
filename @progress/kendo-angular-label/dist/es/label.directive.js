/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { isUploadComponent, shouldClickComponent, getRootElement } from './util';
import { Directive, Input, HostBinding, ElementRef, Renderer2, NgZone } from '@angular/core';
import { isDocumentAvailable, guid } from '@progress/kendo-angular-common';
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
export { LabelDirective };
