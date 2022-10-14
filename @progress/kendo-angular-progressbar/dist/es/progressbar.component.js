import * as tslib_1 from "tslib";
import { ProgressBarBase } from './common/progressbar-base';
import { Component, Input, NgZone, Renderer2, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { formatValue, calculateRatio, runAnimation } from './common/util';
import { LocalizationService, L10N_PREFIX } from '@progress/kendo-angular-l10n';
import { hasObservers } from '@progress/kendo-angular-common';
/**
 * Represents the [Kendo UI ProgressBar component for Angular]({% slug overview_progressbar %}).
 *
 * @example
 * ```ts-preview
 * _@Component({
 *    selector: 'my-app',
 *    template: `
 *        <kendo-progressbar [value]="value">
 *        </kendo-progressbar>
 *    `
 * })
 * class AppComponent {
 *     public value = 50;
 * }
 * ```
 */
var ProgressBarComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ProgressBarComponent, _super);
    /**
     * @hidden
     */
    function ProgressBarComponent(localization, zone, renderer) {
        var _this = _super.call(this, localization) || this;
        _this.localization = localization;
        _this.zone = zone;
        _this.renderer = renderer;
        /**
         * Determines whether the status label will be visible.
         * Defaults to `true` - the label will be visible and displayed with the default
         * `LabelSettings` - position: `end` and format: `value`
         */
        _this.label = true;
        /**
         * The animation configuration of the ProgressBar.
         * Defaults to `false`
         */
        _this.animation = false;
        /**
         * The event is fired when the animation indicating the latest value change is finished.
         */
        _this.animationEnd = new EventEmitter();
        return _this;
    }
    Object.defineProperty(ProgressBarComponent.prototype, "showLabel", {
        /**
         * @hidden
         */
        get: function () {
            if (typeof this.label === 'boolean') {
                return this.label;
            }
            else {
                if (this.label && !this.label.hasOwnProperty('visible')) {
                    this.label.visible = true;
                }
                return this.label.visible;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProgressBarComponent.prototype, "labelPosition", {
        /**
         * @hidden
         */
        get: function () {
            if (typeof this.label === 'boolean') {
                return 'end';
            }
            else {
                if (this.label && !this.label.hasOwnProperty('position')) {
                    this.label.position = 'end';
                }
                return this.label.position;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProgressBarComponent.prototype, "isPositionStart", {
        /**
         * @hidden
         */
        get: function () {
            return this.labelPosition === 'start';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProgressBarComponent.prototype, "isPositionCenter", {
        /**
         * @hidden
         */
        get: function () {
            return this.labelPosition === 'center';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProgressBarComponent.prototype, "isPositionEnd", {
        /**
         * @hidden
         */
        get: function () {
            return this.labelPosition === 'end';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProgressBarComponent.prototype, "formattedLabelValue", {
        /**
         * @hidden
         */
        get: function () {
            return formatValue(this.displayValue, this.min, this.max, this.label);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    ProgressBarComponent.prototype.ngOnInit = function () {
        if (this.animation && this.previousValue !== this.displayValue) {
            this.startAnimation(0);
        }
    };
    /**
     * @hidden
     */
    ProgressBarComponent.prototype.ngOnChanges = function (changes) {
        _super.prototype.ngOnChanges.call(this, changes);
        if (runAnimation(changes, this.animation, this.previousValue, this.displayValue)) {
            this.startAnimation(this.previousValue);
        }
    };
    /**
     * @hidden
     */
    ProgressBarComponent.prototype.ngOnDestroy = function () {
        if (this.animationStartSubscription) {
            this.animationStartSubscription.unsubscribe();
        }
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
    };
    /**
     * @hidden
     */
    ProgressBarComponent.prototype.startAnimation = function (previousValue) {
        this.animate(this.progressStatusElement.nativeElement, previousValue, this.progressStatusWrapperElement.nativeElement);
    };
    Object.defineProperty(ProgressBarComponent.prototype, "animationDuration", {
        /**
         * @hidden
         */
        get: function () {
            if (typeof this.animation === 'boolean') {
                return 400;
            }
            else {
                if (this.animation && !this.animation.hasOwnProperty('duration')) {
                    this.animation.duration = 400;
                }
                return this.animation.duration;
            }
        },
        enumerable: true,
        configurable: true
    });
    ProgressBarComponent.prototype.animate = function (element, previousValue, wrapperElement) {
        var _this = this;
        var isHorizontal = this.orientation === 'horizontal';
        var previousRatio = calculateRatio(this.min, this.max, previousValue);
        var previousStatusWidth = isHorizontal ? previousRatio * 100 : 100;
        var previousStatusHeight = !isHorizontal ? previousRatio * 100 : 100;
        this.zone.runOutsideAngular(function () {
            if (_this.animationFrame) {
                cancelAnimationFrame(_this.animationFrame);
            }
            var property = isHorizontal ? 'width' : 'height';
            var startTime = new Date().getTime();
            var startSize = isHorizontal ? previousStatusWidth : previousStatusHeight;
            var deltaSize = isHorizontal ? _this.statusWidth - previousStatusWidth : _this.statusHeight - previousStatusHeight;
            var duration = _this.animationDuration * Math.abs((deltaSize / 100));
            var animate = function () {
                var elapsed = new Date().getTime() - startTime;
                var position = Math.min(elapsed / duration, 1);
                var width = startSize + deltaSize * position;
                var wrapperWidth = (100 / width) * 100;
                _this.renderer.setStyle(element, property, width + '%');
                _this.renderer.setStyle(wrapperElement, property, wrapperWidth + '%');
                if (position < 1) {
                    requestAnimationFrame(animate);
                }
                else {
                    if (hasObservers(_this.animationEnd)) {
                        _this.animationEnd.emit({
                            from: previousValue,
                            to: _this.displayValue
                        });
                    }
                }
            };
            animate();
        });
    };
    ProgressBarComponent.decorators = [
        { type: Component, args: [{
                    exportAs: 'kendoProgressBar',
                    selector: 'kendo-progressbar',
                    template: "\n        <span class=\"k-progress-status-wrap\"\n            [class.k-progress-start]=\"isPositionStart\"\n            [class.k-progress-center]=\"isPositionCenter\"\n            [class.k-progress-end]=\"isPositionEnd\"\n            [ngStyle]=\"emptyCssStyle\"\n            [ngClass]=\"emptyCssClass\">\n            <span *ngIf=\"showLabel\" class=\"k-progress-status\">{{formattedLabelValue}}</span>\n        </span>\n        <div\n            #progressStatus\n            class=\"k-state-selected\"\n            [class.k-complete]=\"isCompleted\"\n            [ngStyle]=\"progressCssStyle\"\n            [ngClass]=\"progressCssClass\"\n            [style.width.%]=\"statusWidth\"\n            [style.height.%]=\"statusHeight\"\n            >\n            <span\n                #progressStatusWrap\n                class=\"k-progress-status-wrap\"\n                [style.width.%]=\"statusWrapperWidth\"\n                [style.height.%]=\"statusWrapperHeight\"\n                [class.k-progress-start]=\"isPositionStart\"\n                [class.k-progress-center]=\"isPositionCenter\"\n                [class.k-progress-end]=\"isPositionEnd\"\n                >\n                <span *ngIf=\"showLabel\" class=\"k-progress-status\">{{formattedLabelValue}}</span>\n            </span>\n        </div>\n       ",
                    providers: [
                        LocalizationService,
                        {
                            provide: L10N_PREFIX,
                            useValue: 'kendo.progressbar'
                        }
                    ]
                },] },
    ];
    /** @nocollapse */
    ProgressBarComponent.ctorParameters = function () { return [
        { type: LocalizationService },
        { type: NgZone },
        { type: Renderer2 }
    ]; };
    ProgressBarComponent.propDecorators = {
        label: [{ type: Input }],
        progressCssStyle: [{ type: Input }],
        progressCssClass: [{ type: Input }],
        emptyCssStyle: [{ type: Input }],
        emptyCssClass: [{ type: Input }],
        animation: [{ type: Input }],
        animationEnd: [{ type: Output }],
        progressStatusElement: [{ type: ViewChild, args: ['progressStatus',] }],
        progressStatusWrapperElement: [{ type: ViewChild, args: ['progressStatusWrap',] }]
    };
    return ProgressBarComponent;
}(ProgressBarBase));
export { ProgressBarComponent };
