import { style, animate, AnimationBuilder } from '@angular/animations';
import { EventEmitter, Directive, ElementRef, Renderer2, Output, HostBinding, Input, NgModule } from '@angular/core';

import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/animations';
const COLLAPSE_ANIMATION_TIMING = '400ms cubic-bezier(0.4,0.0,0.2,1)';
const expandAnimation = [
    style({ height: 0, visibility: 'hidden' }),
    animate(COLLAPSE_ANIMATION_TIMING, style({ height: '*', visibility: 'visible' }))
];
const collapseAnimation = [
    style({ height: '*', visibility: 'visible' }),
    animate(COLLAPSE_ANIMATION_TIMING, style({ height: 0, visibility: 'hidden' }))
];

class CollapseDirective {
    constructor(_el, _renderer, _builder) {
        this._el = _el;
        this._renderer = _renderer;
        /** This event fires as soon as content collapses */
        this.collapsed = new EventEmitter();
        /** This event fires when collapsing is started */
        this.collapses = new EventEmitter();
        /** This event fires as soon as content becomes visible */
        this.expanded = new EventEmitter();
        /** This event fires when expansion is started */
        this.expands = new EventEmitter();
        // shown
        this.isExpanded = true;
        this.collapseNewValue = true;
        // hidden
        this.isCollapsed = false;
        // stale state
        this.isCollapse = true;
        // animation state
        this.isCollapsing = false;
        /** turn on/off animation */
        this.isAnimated = false;
        this._display = 'block';
        this._stylesLoaded = false;
        this._COLLAPSE_ACTION_NAME = 'collapse';
        this._EXPAND_ACTION_NAME = 'expand';
        this._factoryCollapseAnimation = _builder.build(collapseAnimation);
        this._factoryExpandAnimation = _builder.build(expandAnimation);
    }
    set display(value) {
        if (!this.isAnimated) {
            this._renderer.setStyle(this._el.nativeElement, 'display', value);
            return;
        }
        this._display = value;
        if (value === 'none') {
            this.hide();
            return;
        }
        this.show();
    }
    /** A flag indicating visibility of content (shown or hidden) */
    set collapse(value) {
        this.collapseNewValue = value;
        if (!this._player || this._isAnimationDone) {
            this.isExpanded = value;
            this.toggle();
        }
    }
    get collapse() {
        return this.isExpanded;
    }
    ngAfterViewChecked() {
        this._stylesLoaded = true;
        if (!this._player || !this._isAnimationDone) {
            return;
        }
        this._player.reset();
        this._renderer.setStyle(this._el.nativeElement, 'height', '*');
    }
    /** allows to manually toggle content visibility */
    toggle() {
        if (this.isExpanded) {
            this.hide();
        }
        else {
            this.show();
        }
    }
    /** allows to manually hide content */
    hide() {
        this.isCollapsing = true;
        this.isExpanded = false;
        this.isCollapsed = true;
        this.isCollapsing = false;
        this.collapses.emit(this);
        this._isAnimationDone = false;
        this.animationRun(this.isAnimated, this._COLLAPSE_ACTION_NAME)(() => {
            this._isAnimationDone = true;
            if (this.collapseNewValue !== this.isCollapsed && this.isAnimated) {
                this.show();
                return;
            }
            this.collapsed.emit(this);
            this._renderer.setStyle(this._el.nativeElement, 'display', 'none');
        });
    }
    /** allows to manually show collapsed content */
    show() {
        this._renderer.setStyle(this._el.nativeElement, 'display', this._display);
        this.isCollapsing = true;
        this.isExpanded = true;
        this.isCollapsed = false;
        this.isCollapsing = false;
        this.expands.emit(this);
        this._isAnimationDone = false;
        this.animationRun(this.isAnimated, this._EXPAND_ACTION_NAME)(() => {
            this._isAnimationDone = true;
            if (this.collapseNewValue !== this.isCollapsed && this.isAnimated) {
                this.hide();
                return;
            }
            this.expanded.emit(this);
            this._renderer.removeStyle(this._el.nativeElement, 'overflow');
        });
    }
    animationRun(isAnimated, action) {
        if (!isAnimated || !this._stylesLoaded) {
            return (callback) => callback();
        }
        this._renderer.setStyle(this._el.nativeElement, 'overflow', 'hidden');
        this._renderer.addClass(this._el.nativeElement, 'collapse');
        const factoryAnimation = (action === this._EXPAND_ACTION_NAME)
            ? this._factoryExpandAnimation
            : this._factoryCollapseAnimation;
        if (this._player) {
            this._player.destroy();
        }
        this._player = factoryAnimation.create(this._el.nativeElement);
        this._player.play();
        return (callback) => { var _a; return (_a = this._player) === null || _a === void 0 ? void 0 : _a.onDone(callback); };
    }
}
CollapseDirective.ɵfac = function CollapseDirective_Factory(t) { return new (t || CollapseDirective)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.Renderer2), ɵngcc0.ɵɵdirectiveInject(ɵngcc1.AnimationBuilder)); };
CollapseDirective.ɵdir = ɵngcc0.ɵɵdefineDirective({ type: CollapseDirective, selectors: [["", "collapse", ""]], hostVars: 10, hostBindings: function CollapseDirective_HostBindings(rf, ctx) { if (rf & 2) {
        ɵngcc0.ɵɵattribute("aria-expanded", ctx.isExpanded)("aria-hidden", ctx.isCollapsed);
        ɵngcc0.ɵɵclassProp("collapse", ctx.isCollapse)("in", ctx.isExpanded)("show", ctx.isExpanded)("collapsing", ctx.isCollapsing);
    } }, inputs: { isAnimated: "isAnimated", display: "display", collapse: "collapse" }, outputs: { collapsed: "collapsed", collapses: "collapses", expanded: "expanded", expands: "expands" }, exportAs: ["bs-collapse"] });
CollapseDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: AnimationBuilder }
];
CollapseDirective.propDecorators = {
    collapsed: [{ type: Output }],
    collapses: [{ type: Output }],
    expanded: [{ type: Output }],
    expands: [{ type: Output }],
    isExpanded: [{ type: HostBinding, args: ['class.in',] }, { type: HostBinding, args: ['class.show',] }, { type: HostBinding, args: ['attr.aria-expanded',] }],
    isCollapsed: [{ type: HostBinding, args: ['attr.aria-hidden',] }],
    isCollapse: [{ type: HostBinding, args: ['class.collapse',] }],
    isCollapsing: [{ type: HostBinding, args: ['class.collapsing',] }],
    display: [{ type: Input }],
    isAnimated: [{ type: Input }],
    collapse: [{ type: Input }]
};
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(CollapseDirective, [{
        type: Directive,
        args: [{
                selector: '[collapse]',
                exportAs: 'bs-collapse',
                // eslint-disable-next-line @angular-eslint/no-host-metadata-property
                host: {
                    '[class.collapse]': 'true'
                }
            }]
    }], function () { return [{ type: ɵngcc0.ElementRef }, { type: ɵngcc0.Renderer2 }, { type: ɵngcc1.AnimationBuilder }]; }, { collapsed: [{
            type: Output
        }], collapses: [{
            type: Output
        }], expanded: [{
            type: Output
        }], expands: [{
            type: Output
        }], isExpanded: [{
            type: HostBinding,
            args: ['class.in']
        }, {
            type: HostBinding,
            args: ['class.show']
        }, {
            type: HostBinding,
            args: ['attr.aria-expanded']
        }], isCollapsed: [{
            type: HostBinding,
            args: ['attr.aria-hidden']
        }], isCollapse: [{
            type: HostBinding,
            args: ['class.collapse']
        }], isCollapsing: [{
            type: HostBinding,
            args: ['class.collapsing']
        }], isAnimated: [{
            type: Input
        }], display: [{
            type: Input
        }], collapse: [{
            type: Input
        }] }); })();

class CollapseModule {
    static forRoot() {
        return { ngModule: CollapseModule, providers: [] };
    }
}
CollapseModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: CollapseModule });
CollapseModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function CollapseModule_Factory(t) { return new (t || CollapseModule)(); } });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(CollapseModule, { declarations: [CollapseDirective], exports: [CollapseDirective] }); })();
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(CollapseModule, [{
        type: NgModule,
        args: [{
                declarations: [CollapseDirective],
                exports: [CollapseDirective]
            }]
    }], null, null); })();

/**
 * Generated bundle index. Do not edit.
 */

export { CollapseDirective, CollapseModule };

//# sourceMappingURL=ngx-bootstrap-collapse.js.map