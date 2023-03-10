import { ɵɵdefineInjectable, Injectable, forwardRef, EventEmitter, Component, ChangeDetectionStrategy, ChangeDetectorRef, Input, Output, HostListener, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

/** Default values provider for rating */
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';

function RatingComponent_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵtext(0);
} if (rf & 2) {
    const value_r3 = ctx.value;
    const index_r4 = ctx.index;
    ɵngcc0.ɵɵtextInterpolate(index_r4 < value_r3 ? "\u2605" : "\u2606");
} }
function RatingComponent_ng_template_3_ng_template_3_Template(rf, ctx) { }
const _c0 = function (a0, a1) { return { index: a0, value: a1 }; };
function RatingComponent_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    const _r9 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "span", 3);
    ɵngcc0.ɵɵtext(1);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(2, "span", 4);
    ɵngcc0.ɵɵlistener("mouseenter", function RatingComponent_ng_template_3_Template_span_mouseenter_2_listener() { ɵngcc0.ɵɵrestoreView(_r9); const index_r6 = ctx.index; const ctx_r8 = ɵngcc0.ɵɵnextContext(); return ctx_r8.enter(index_r6 + 1); })("click", function RatingComponent_ng_template_3_Template_span_click_2_listener() { ɵngcc0.ɵɵrestoreView(_r9); const index_r6 = ctx.index; const ctx_r10 = ɵngcc0.ɵɵnextContext(); return ctx_r10.rate(index_r6 + 1); });
    ɵngcc0.ɵɵtemplate(3, RatingComponent_ng_template_3_ng_template_3_Template, 0, 0, "ng-template", 5);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const r_r5 = ctx.$implicit;
    const index_r6 = ctx.index;
    const ctx_r2 = ɵngcc0.ɵɵnextContext();
    const _r0 = ɵngcc0.ɵɵreference(2);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵtextInterpolate1("(", index_r6 < ctx_r2.value ? "*" : " ", ")");
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵstyleProp("cursor", ctx_r2.readonly ? "default" : "pointer");
    ɵngcc0.ɵɵclassProp("active", index_r6 < ctx_r2.value);
    ɵngcc0.ɵɵproperty("title", r_r5.title);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngTemplateOutlet", ctx_r2.customTemplate || _r0)("ngTemplateOutletContext", ɵngcc0.ɵɵpureFunction2(8, _c0, index_r6, ctx_r2.value));
} }
class RatingConfig {
    constructor() {
        /** aria label for rating */
        this.ariaLabel = 'rating';
    }
}
RatingConfig.ɵfac = function RatingConfig_Factory(t) { return new (t || RatingConfig)(); };
RatingConfig.ɵprov = ɵɵdefineInjectable({ factory: function RatingConfig_Factory() { return new RatingConfig(); }, token: RatingConfig, providedIn: "root" });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(RatingConfig, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return []; }, null); })();

const RATING_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RatingComponent),
    multi: true
};
class RatingComponent {
    constructor(changeDetection, config) {
        this.changeDetection = changeDetection;
        /** number of icons */
        this.max = 5;
        /** if true will not react on any user events */
        this.readonly = false;
        /** array of icons titles, default: (["one", "two", "three", "four", "five"]) */
        this.titles = [];
        /** fired when icon selected, $event:number equals to selected rating */
        this.onHover = new EventEmitter();
        /** fired when icon selected, $event:number equals to previous rating value */
        this.onLeave = new EventEmitter();
        this.onChange = Function.prototype;
        this.onTouched = Function.prototype;
        /** aria label for rating */
        this.ariaLabel = 'rating';
        this.range = [];
        this.value = 0;
        Object.assign(this, config);
    }
    onKeydown(event) {
        if ([37, 38, 39, 40].indexOf(event.which) === -1) {
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        const sign = event.which === 38 || event.which === 39 ? 1 : -1;
        this.rate(this.value + sign);
    }
    ngOnInit() {
        this.max = this.max || 5;
        this.titles =
            typeof this.titles !== 'undefined' && this.titles.length > 0
                ? this.titles
                : [];
        this.range = this.buildTemplateObjects(this.max);
    }
    // model -> view
    writeValue(value) {
        if (value % 1 !== value) {
            this.value = Math.round(value);
            this.preValue = value;
            this.changeDetection.markForCheck();
            return;
        }
        this.preValue = value;
        this.value = value;
        this.changeDetection.markForCheck();
    }
    enter(value) {
        if (!this.readonly) {
            this.value = value;
            this.changeDetection.markForCheck();
            this.onHover.emit(value);
        }
    }
    reset() {
        if (typeof this.preValue === 'number') {
            this.value = Math.round(this.preValue);
            this.changeDetection.markForCheck();
            this.onLeave.emit(this.value);
        }
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    rate(value) {
        if (!this.readonly && this.range
            && value >= 0 && value <= this.range.length) {
            this.writeValue(value);
            this.onChange(value);
        }
    }
    buildTemplateObjects(max) {
        const result = [];
        for (let i = 0; i < max; i++) {
            result.push({
                index: i,
                title: this.titles[i] || i + 1
            });
        }
        return result;
    }
}
RatingComponent.ɵfac = function RatingComponent_Factory(t) { return new (t || RatingComponent)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ChangeDetectorRef), ɵngcc0.ɵɵdirectiveInject(RatingConfig)); };
RatingComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: RatingComponent, selectors: [["rating"]], hostBindings: function RatingComponent_HostBindings(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵlistener("keydown", function RatingComponent_keydown_HostBindingHandler($event) { return ctx.onKeydown($event); });
    } }, inputs: { max: "max", readonly: "readonly", titles: "titles", customTemplate: "customTemplate" }, outputs: { onHover: "onHover", onLeave: "onLeave" }, features: [ɵngcc0.ɵɵProvidersFeature([RATING_CONTROL_VALUE_ACCESSOR])], decls: 4, vars: 4, consts: [["tabindex", "0", "role", "slider", "aria-valuemin", "0", 3, "mouseleave", "keydown"], ["star", ""], ["ngFor", "", 3, "ngForOf"], [1, "sr-only", "visually-hidden"], [1, "bs-rating-star", 3, "title", "mouseenter", "click"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"]], template: function RatingComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "span", 0);
        ɵngcc0.ɵɵlistener("mouseleave", function RatingComponent_Template_span_mouseleave_0_listener() { return ctx.reset(); })("keydown", function RatingComponent_Template_span_keydown_0_listener($event) { return ctx.onKeydown($event); });
        ɵngcc0.ɵɵtemplate(1, RatingComponent_ng_template_1_Template, 1, 1, "ng-template", null, 1, ɵngcc0.ɵɵtemplateRefExtractor);
        ɵngcc0.ɵɵtemplate(3, RatingComponent_ng_template_3_Template, 4, 11, "ng-template", 2);
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵattribute("aria-label", ctx.ariaLabel)("aria-valuemax", ctx.range.length)("aria-valuenow", ctx.value);
        ɵngcc0.ɵɵadvance(3);
        ɵngcc0.ɵɵproperty("ngForOf", ctx.range);
    } }, directives: [ɵngcc1.NgForOf, ɵngcc1.NgTemplateOutlet], encapsulation: 2, changeDetection: 0 });
RatingComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: RatingConfig }
];
RatingComponent.propDecorators = {
    max: [{ type: Input }],
    readonly: [{ type: Input }],
    titles: [{ type: Input }],
    customTemplate: [{ type: Input }],
    onHover: [{ type: Output }],
    onLeave: [{ type: Output }],
    onKeydown: [{ type: HostListener, args: ['keydown', ['$event'],] }]
};
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(RatingComponent, [{
        type: Component,
        args: [{
                selector: 'rating',
                template: "<span (mouseleave)=\"reset()\" (keydown)=\"onKeydown($event)\" tabindex=\"0\"\n      role=\"slider\" aria-valuemin=\"0\"\n      [attr.aria-label]=\"ariaLabel\"\n      [attr.aria-valuemax]=\"range.length\"\n      [attr.aria-valuenow]=\"value\">\n  <ng-template #star let-value=\"value\" let-index=\"index\">{{ index < value ? '&#9733;' : '&#9734;' }}</ng-template>\n  <ng-template ngFor let-r [ngForOf]=\"range\" let-index=\"index\">\n    <span class=\"sr-only visually-hidden\">({{ index < value ? '*' : ' ' }})</span>\n    <span class=\"bs-rating-star\"\n          (mouseenter)=\"enter(index + 1)\"\n          (click)=\"rate(index + 1)\"\n          [title]=\"r.title\"\n          [style.cursor]=\"readonly ? 'default' : 'pointer'\"\n          [class.active]=\"index < value\">\n      <ng-template [ngTemplateOutlet]=\"customTemplate || star\"\n                   [ngTemplateOutletContext]=\"{index: index, value: value}\">\n      </ng-template>\n    </span>\n  </ng-template>\n</span>\n",
                providers: [RATING_CONTROL_VALUE_ACCESSOR],
                changeDetection: ChangeDetectionStrategy.OnPush
            }]
    }], function () { return [{ type: ɵngcc0.ChangeDetectorRef }, { type: RatingConfig }]; }, { max: [{
            type: Input
        }], readonly: [{
            type: Input
        }], titles: [{
            type: Input
        }], onHover: [{
            type: Output
        }], onLeave: [{
            type: Output
        }], onKeydown: [{
            type: HostListener,
            args: ['keydown', ['$event']]
        }], customTemplate: [{
            type: Input
        }] }); })();

class RatingModule {
    static forRoot() {
        return {
            ngModule: RatingModule,
            providers: []
        };
    }
}
RatingModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: RatingModule });
RatingModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function RatingModule_Factory(t) { return new (t || RatingModule)(); }, imports: [[CommonModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(RatingModule, { declarations: function () { return [RatingComponent]; }, imports: function () { return [CommonModule]; }, exports: function () { return [RatingComponent]; } }); })();
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(RatingModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule],
                declarations: [RatingComponent],
                exports: [RatingComponent]
            }]
    }], null, null); })();

/**
 * Generated bundle index. Do not edit.
 */

export { RatingComponent, RatingConfig, RatingModule, RATING_CONTROL_VALUE_ACCESSOR as ɵa };

//# sourceMappingURL=ngx-bootstrap-rating.js.map