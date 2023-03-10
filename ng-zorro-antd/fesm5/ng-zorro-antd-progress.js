import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input, NgModule } from '@angular/core';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { __rest, __decorate, __metadata } from 'tslib';
import { NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { isNotNil, InputNumber } from 'ng-zorro-antd/core/util';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/**
 * @fileoverview added by tsickle
 * Generated from: utils.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
/**
 * @param {?} percent
 * @return {?}
 */
function stripPercentToNumber(percent) {
    return +percent.replace('%', '');
}
/** @type {?} */
var sortGradient = (/**
 * @param {?} gradients
 * @return {?}
 */
function (gradients) {
    /** @type {?} */
    var tempArr = [];
    Object.keys(gradients).forEach((/**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        /** @type {?} */
        var value = gradients[key];
        /** @type {?} */
        var formatKey = stripPercentToNumber(key);
        if (!isNaN(formatKey)) {
            tempArr.push({
                key: formatKey,
                value: value
            });
        }
    }));
    tempArr = tempArr.sort((/**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    function (a, b) { return a.key - b.key; }));
    return tempArr;
});
/** @type {?} */
var handleCircleGradient = (/**
 * @param {?} strokeColor
 * @return {?}
 */
function (strokeColor) {
    return sortGradient(strokeColor).map((/**
     * @param {?} __0
     * @return {?}
     */
    function (_a) {
        var key = _a.key, value = _a.value;
        return ({ offset: key + "%", color: value });
    }));
});
/** @type {?} */
var handleLinearGradient = (/**
 * @param {?} strokeColor
 * @return {?}
 */
function (strokeColor) {
    var _a = strokeColor.from, from = _a === void 0 ? '#1890ff' : _a, _b = strokeColor.to, to = _b === void 0 ? '#1890ff' : _b, _c = strokeColor.direction, direction = _c === void 0 ? 'to right' : _c, rest = __rest(strokeColor, ["from", "to", "direction"]);
    if (Object.keys(rest).length !== 0) {
        /** @type {?} */
        var sortedGradients = sortGradient((/** @type {?} */ (rest)))
            .map((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var key = _a.key, value = _a.value;
            return value + " " + key + "%";
        }))
            .join(', ');
        return "linear-gradient(" + direction + ", " + sortedGradients + ")";
    }
    return "linear-gradient(" + direction + ", " + from + ", " + to + ")";
});

/**
 * @fileoverview added by tsickle
 * Generated from: progress.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var gradientIdSeed = 0;
/** @type {?} */
var NZ_CONFIG_COMPONENT_NAME = 'progress';
/** @type {?} */
var statusIconNameMap = new Map([
    ['success', 'check'],
    ['exception', 'close']
]);
/** @type {?} */
var statusColorMap = new Map([
    ['normal', '#108ee9'],
    ['exception', '#ff5500'],
    ['success', '#87d068']
]);
/** @type {?} */
var defaultFormatter = (/**
 * @param {?} p
 * @return {?}
 */
function (p) { return p + "%"; });
var ??0 = defaultFormatter;
var NzProgressComponent = /** @class */ (function () {
    function NzProgressComponent(nzConfigService) {
        this.nzConfigService = nzConfigService;
        this.nzShowInfo = true;
        this.nzWidth = 132;
        this.nzStrokeColor = undefined;
        this.nzSize = 'default';
        this.nzPercent = 0;
        this.nzStrokeWidth = undefined;
        this.nzGapDegree = undefined;
        this.nzType = 'line';
        this.nzGapPosition = 'top';
        this.nzStrokeLinecap = 'round';
        this.steps = [];
        /**
         * Gradient style when `nzType` is `line`.
         */
        this.lineGradient = null;
        /**
         * If user uses gradient color.
         */
        this.isGradient = false;
        /**
         * If the linear progress is a step progress.
         */
        this.isSteps = false;
        /**
         * Each progress whose `nzType` is circle or dashboard should have unique id to
         * define `<linearGradient>`.
         */
        this.gradientId = gradientIdSeed++;
        /**
         * Paths to rendered in the template.
         */
        this.progressCirclePath = [];
        this.trailPathStyle = null;
        this.trackByFn = (/**
         * @param {?} index
         * @return {?}
         */
        function (index) { return "" + index; });
        this.cachedStatus = 'normal';
        this.inferredStatus = 'normal';
        this.destroy$ = new Subject();
    }
    Object.defineProperty(NzProgressComponent.prototype, "formatter", {
        get: /**
         * @return {?}
         */
        function () {
            return this.nzFormat || defaultFormatter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzProgressComponent.prototype, "status", {
        get: /**
         * @return {?}
         */
        function () {
            return this.nzStatus || this.inferredStatus;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzProgressComponent.prototype, "strokeWidth", {
        get: /**
         * @return {?}
         */
        function () {
            return this.nzStrokeWidth || (this.nzType === 'line' && this.nzSize !== 'small' ? 8 : 6);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzProgressComponent.prototype, "isCircleStyle", {
        get: /**
         * @return {?}
         */
        function () {
            return this.nzType === 'circle' || this.nzType === 'dashboard';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} changes
     * @return {?}
     */
    NzProgressComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var nzSteps = changes.nzSteps, nzGapPosition = changes.nzGapPosition, nzStrokeLinecap = changes.nzStrokeLinecap, nzStrokeColor = changes.nzStrokeColor, nzGapDegree = changes.nzGapDegree, nzType = changes.nzType, nzStatus = changes.nzStatus, nzPercent = changes.nzPercent, nzSuccessPercent = changes.nzSuccessPercent;
        if (nzStatus) {
            this.cachedStatus = this.nzStatus || this.cachedStatus;
        }
        if (nzPercent || nzSuccessPercent) {
            /** @type {?} */
            var fillAll = parseInt(this.nzPercent.toString(), 10) >= 100;
            if (fillAll) {
                if ((isNotNil(this.nzSuccessPercent) && (/** @type {?} */ (this.nzSuccessPercent)) >= 100) || this.nzSuccessPercent === undefined) {
                    this.inferredStatus = 'success';
                }
            }
            else {
                this.inferredStatus = this.cachedStatus;
            }
        }
        if (nzStatus || nzPercent || nzSuccessPercent) {
            this.updateIcon();
        }
        if (nzStrokeColor) {
            this.setStrokeColor();
        }
        if (nzGapPosition || nzStrokeLinecap || nzGapDegree || nzType || nzPercent || nzStrokeColor) {
            this.getCirclePaths();
        }
        if (nzSteps) {
            this.isSteps = isNotNil(nzSteps.currentValue);
            this.getSteps();
        }
    };
    /**
     * @return {?}
     */
    NzProgressComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.nzConfigService
            .getConfigChangeEventForComponent(NZ_CONFIG_COMPONENT_NAME)
            .pipe(takeUntil(this.destroy$))
            .subscribe((/**
         * @return {?}
         */
        function () {
            _this.updateIcon();
            _this.setStrokeColor();
            _this.getCirclePaths();
        }));
    };
    /**
     * @return {?}
     */
    NzProgressComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.destroy$.next();
        this.destroy$.complete();
    };
    /**
     * @private
     * @return {?}
     */
    NzProgressComponent.prototype.updateIcon = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var ret = statusIconNameMap.get(this.status);
        this.icon = ret ? ret + (this.isCircleStyle ? '-o' : '-circle-fill') : '';
    };
    /**
     * Calculate step render configs.
     */
    /**
     * Calculate step render configs.
     * @private
     * @return {?}
     */
    NzProgressComponent.prototype.getSteps = /**
     * Calculate step render configs.
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var current = Math.floor((/** @type {?} */ (this.nzSteps)) * (this.nzPercent / 100));
        /** @type {?} */
        var stepWidth = this.nzSize === 'small' ? 2 : 14;
        for (var i = 0; i < (/** @type {?} */ (this.nzSteps)); i++) {
            /** @type {?} */
            var color = void 0;
            if (i <= current - 1) {
                color = this.nzStrokeColor;
            }
            /** @type {?} */
            var stepStyle = {
                backgroundColor: "" + color,
                width: stepWidth + "px",
                height: this.strokeWidth + "px"
            };
            this.steps.push(stepStyle);
        }
    };
    /**
     * Calculate paths when the type is circle or dashboard.
     */
    /**
     * Calculate paths when the type is circle or dashboard.
     * @private
     * @return {?}
     */
    NzProgressComponent.prototype.getCirclePaths = /**
     * Calculate paths when the type is circle or dashboard.
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.isCircleStyle) {
            return;
        }
        /** @type {?} */
        var values = isNotNil(this.nzSuccessPercent) ? [(/** @type {?} */ (this.nzSuccessPercent)), this.nzPercent] : [this.nzPercent];
        // Calculate shared styles.
        /** @type {?} */
        var radius = 50 - this.strokeWidth / 2;
        /** @type {?} */
        var gapPosition = this.nzGapPosition || (this.nzType === 'circle' ? 'top' : 'bottom');
        /** @type {?} */
        var len = Math.PI * 2 * radius;
        /** @type {?} */
        var gapDegree = this.nzGapDegree || (this.nzType === 'circle' ? 0 : 75);
        /** @type {?} */
        var beginPositionX = 0;
        /** @type {?} */
        var beginPositionY = -radius;
        /** @type {?} */
        var endPositionX = 0;
        /** @type {?} */
        var endPositionY = radius * -2;
        switch (gapPosition) {
            case 'left':
                beginPositionX = -radius;
                beginPositionY = 0;
                endPositionX = radius * 2;
                endPositionY = 0;
                break;
            case 'right':
                beginPositionX = radius;
                beginPositionY = 0;
                endPositionX = radius * -2;
                endPositionY = 0;
                break;
            case 'bottom':
                beginPositionY = radius;
                endPositionY = radius * 2;
                break;
            default:
        }
        this.pathString = "M 50,50 m " + beginPositionX + "," + beginPositionY + "\n       a " + radius + "," + radius + " 0 1 1 " + endPositionX + "," + -endPositionY + "\n       a " + radius + "," + radius + " 0 1 1 " + -endPositionX + "," + endPositionY;
        this.trailPathStyle = {
            strokeDasharray: len - gapDegree + "px " + len + "px",
            strokeDashoffset: "-" + gapDegree / 2 + "px",
            transition: 'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s'
        };
        // Calculate styles for each path.
        this.progressCirclePath = values
            .map((/**
         * @param {?} value
         * @param {?} index
         * @return {?}
         */
        function (value, index) {
            /** @type {?} */
            var isSuccessPercent = values.length === 2 && index === 0;
            return {
                stroke: _this.isGradient && !isSuccessPercent ? "url(#gradient-" + _this.gradientId + ")" : null,
                strokePathStyle: {
                    stroke: !_this.isGradient ? (isSuccessPercent ? statusColorMap.get('success') : ((/** @type {?} */ (_this.nzStrokeColor)))) : null,
                    transition: 'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s, stroke-width .06s ease .3s',
                    strokeDasharray: ((value || 0) / 100) * (len - gapDegree) + "px " + len + "px",
                    strokeDashoffset: "-" + gapDegree / 2 + "px"
                }
            };
        }))
            .reverse();
    };
    /**
     * @private
     * @return {?}
     */
    NzProgressComponent.prototype.setStrokeColor = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var color = this.nzStrokeColor;
        /** @type {?} */
        var isGradient = (this.isGradient = !!color && typeof color !== 'string');
        if (isGradient && !this.isCircleStyle) {
            this.lineGradient = handleLinearGradient((/** @type {?} */ (color)));
        }
        else if (isGradient && this.isCircleStyle) {
            this.circleGradient = handleCircleGradient((/** @type {?} */ (this.nzStrokeColor)));
        }
        else {
            this.lineGradient = null;
            this.circleGradient = [];
        }
    };
    NzProgressComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    selector: 'nz-progress',
                    exportAs: 'nzProgress',
                    preserveWhitespaces: false,
                    template: "\n    <ng-template #progressInfoTemplate>\n      <span class=\"ant-progress-text\" *ngIf=\"nzShowInfo\">\n        <ng-container *ngIf=\"(status === 'exception' || status === 'success') && !nzFormat; else formatTemplate\">\n          <i nz-icon [nzType]=\"icon\"></i>\n        </ng-container>\n        <ng-template #formatTemplate>\n          <ng-container *nzStringTemplateOutlet=\"formatter; context: { $implicit: nzPercent }; let formatter\">\n            {{ formatter(nzPercent) }}\n          </ng-container>\n        </ng-template>\n      </span>\n    </ng-template>\n\n    <div\n      [ngClass]=\"'ant-progress ant-progress-status-' + status\"\n      [class.ant-progress-line]=\"nzType == 'line'\"\n      [class.ant-progress-small]=\"nzSize == 'small'\"\n      [class.ant-progress-show-info]=\"nzShowInfo\"\n      [class.ant-progress-circle]=\"isCircleStyle\"\n      [class.ant-progress-steps]=\"isSteps\"\n    >\n      <!-- line progress -->\n      <div *ngIf=\"nzType === 'line'\">\n        <ng-container *ngIf=\"!isSteps\">\n          <div class=\"ant-progress-outer\" *ngIf=\"!isSteps\">\n            <div class=\"ant-progress-inner\">\n              <div\n                class=\"ant-progress-bg\"\n                [style.width.%]=\"nzPercent\"\n                [style.border-radius]=\"nzStrokeLinecap === 'round' ? '100px' : '0'\"\n                [style.background]=\"!isGradient ? nzStrokeColor : null\"\n                [style.background-image]=\"isGradient ? lineGradient : null\"\n                [style.height.px]=\"strokeWidth\"\n              ></div>\n              <div\n                *ngIf=\"nzSuccessPercent || nzSuccessPercent === 0\"\n                class=\"ant-progress-success-bg\"\n                [style.width.%]=\"nzSuccessPercent\"\n                [style.border-radius]=\"nzStrokeLinecap === 'round' ? '100px' : '0'\"\n                [style.height.px]=\"strokeWidth\"\n              ></div>\n            </div>\n          </div>\n          <ng-template [ngTemplateOutlet]=\"progressInfoTemplate\"></ng-template>\n        </ng-container>\n        <!-- Step style progress -->\n        <div class=\"ant-progress-steps-outer\" *ngIf=\"isSteps\">\n          <div *ngFor=\"let step of steps; let i = index\" class=\"ant-progress-steps-item\" [ngStyle]=\"step\"></div>\n          <ng-template [ngTemplateOutlet]=\"progressInfoTemplate\"></ng-template>\n        </div>\n      </div>\n\n      <!-- circle / dashboard progress -->\n      <div\n        [style.width.px]=\"this.nzWidth\"\n        [style.height.px]=\"this.nzWidth\"\n        [style.fontSize.px]=\"this.nzWidth * 0.15 + 6\"\n        class=\"ant-progress-inner\"\n        [class.ant-progress-circle-gradient]=\"isGradient\"\n        *ngIf=\"isCircleStyle\"\n      >\n        <svg class=\"ant-progress-circle \" viewBox=\"0 0 100 100\">\n          <defs *ngIf=\"isGradient\">\n            <linearGradient [id]=\"'gradient-' + gradientId\" x1=\"100%\" y1=\"0%\" x2=\"0%\" y2=\"0%\">\n              <stop *ngFor=\"let i of circleGradient\" [attr.offset]=\"i.offset\" [attr.stop-color]=\"i.color\"></stop>\n            </linearGradient>\n          </defs>\n          <path\n            class=\"ant-progress-circle-trail\"\n            stroke=\"#f3f3f3\"\n            fill-opacity=\"0\"\n            [attr.stroke-width]=\"strokeWidth\"\n            [attr.d]=\"pathString\"\n            [ngStyle]=\"trailPathStyle\"\n          ></path>\n          <path\n            *ngFor=\"let p of progressCirclePath; trackBy: trackByFn\"\n            class=\"ant-progress-circle-path\"\n            fill-opacity=\"0\"\n            [attr.d]=\"pathString\"\n            [attr.stroke-linecap]=\"nzStrokeLinecap\"\n            [attr.stroke]=\"p.stroke\"\n            [attr.stroke-width]=\"nzPercent ? strokeWidth : 0\"\n            [ngStyle]=\"p.strokePathStyle\"\n          ></path>\n        </svg>\n        <ng-template [ngTemplateOutlet]=\"progressInfoTemplate\"></ng-template>\n      </div>\n    </div>\n  "
                }] }
    ];
    /** @nocollapse */
    NzProgressComponent.ctorParameters = function () { return [
        { type: NzConfigService }
    ]; };
    NzProgressComponent.propDecorators = {
        nzShowInfo: [{ type: Input }],
        nzWidth: [{ type: Input }],
        nzStrokeColor: [{ type: Input }],
        nzSize: [{ type: Input }],
        nzFormat: [{ type: Input }],
        nzSuccessPercent: [{ type: Input }],
        nzPercent: [{ type: Input }],
        nzStrokeWidth: [{ type: Input }],
        nzGapDegree: [{ type: Input }],
        nzStatus: [{ type: Input }],
        nzType: [{ type: Input }],
        nzGapPosition: [{ type: Input }],
        nzStrokeLinecap: [{ type: Input }],
        nzSteps: [{ type: Input }]
    };
    __decorate([
        WithConfig(NZ_CONFIG_COMPONENT_NAME),
        __metadata("design:type", Boolean)
    ], NzProgressComponent.prototype, "nzShowInfo", void 0);
    __decorate([
        WithConfig(NZ_CONFIG_COMPONENT_NAME),
        __metadata("design:type", Object)
    ], NzProgressComponent.prototype, "nzStrokeColor", void 0);
    __decorate([
        WithConfig(NZ_CONFIG_COMPONENT_NAME),
        __metadata("design:type", String)
    ], NzProgressComponent.prototype, "nzSize", void 0);
    __decorate([
        InputNumber(),
        __metadata("design:type", Number)
    ], NzProgressComponent.prototype, "nzSuccessPercent", void 0);
    __decorate([
        InputNumber(),
        __metadata("design:type", Number)
    ], NzProgressComponent.prototype, "nzPercent", void 0);
    __decorate([
        WithConfig(NZ_CONFIG_COMPONENT_NAME), InputNumber(),
        __metadata("design:type", Number)
    ], NzProgressComponent.prototype, "nzStrokeWidth", void 0);
    __decorate([
        WithConfig(NZ_CONFIG_COMPONENT_NAME), InputNumber(),
        __metadata("design:type", Number)
    ], NzProgressComponent.prototype, "nzGapDegree", void 0);
    __decorate([
        WithConfig(NZ_CONFIG_COMPONENT_NAME),
        __metadata("design:type", String)
    ], NzProgressComponent.prototype, "nzGapPosition", void 0);
    __decorate([
        WithConfig(NZ_CONFIG_COMPONENT_NAME),
        __metadata("design:type", String)
    ], NzProgressComponent.prototype, "nzStrokeLinecap", void 0);
    __decorate([
        InputNumber(),
        __metadata("design:type", Number)
    ], NzProgressComponent.prototype, "nzSteps", void 0);
    return NzProgressComponent;
}());
if (false) {
    /** @type {?} */
    NzProgressComponent.ngAcceptInputType_nzSuccessPercent;
    /** @type {?} */
    NzProgressComponent.ngAcceptInputType_nzPercent;
    /** @type {?} */
    NzProgressComponent.ngAcceptInputType_nzStrokeWidth;
    /** @type {?} */
    NzProgressComponent.ngAcceptInputType_nzGapDegree;
    /** @type {?} */
    NzProgressComponent.ngAcceptInputType_nzSteps;
    /** @type {?} */
    NzProgressComponent.prototype.nzShowInfo;
    /** @type {?} */
    NzProgressComponent.prototype.nzWidth;
    /** @type {?} */
    NzProgressComponent.prototype.nzStrokeColor;
    /** @type {?} */
    NzProgressComponent.prototype.nzSize;
    /** @type {?} */
    NzProgressComponent.prototype.nzFormat;
    /** @type {?} */
    NzProgressComponent.prototype.nzSuccessPercent;
    /** @type {?} */
    NzProgressComponent.prototype.nzPercent;
    /** @type {?} */
    NzProgressComponent.prototype.nzStrokeWidth;
    /** @type {?} */
    NzProgressComponent.prototype.nzGapDegree;
    /** @type {?} */
    NzProgressComponent.prototype.nzStatus;
    /** @type {?} */
    NzProgressComponent.prototype.nzType;
    /** @type {?} */
    NzProgressComponent.prototype.nzGapPosition;
    /** @type {?} */
    NzProgressComponent.prototype.nzStrokeLinecap;
    /** @type {?} */
    NzProgressComponent.prototype.nzSteps;
    /** @type {?} */
    NzProgressComponent.prototype.steps;
    /**
     * Gradient style when `nzType` is `line`.
     * @type {?}
     */
    NzProgressComponent.prototype.lineGradient;
    /**
     * If user uses gradient color.
     * @type {?}
     */
    NzProgressComponent.prototype.isGradient;
    /**
     * If the linear progress is a step progress.
     * @type {?}
     */
    NzProgressComponent.prototype.isSteps;
    /**
     * Each progress whose `nzType` is circle or dashboard should have unique id to
     * define `<linearGradient>`.
     * @type {?}
     */
    NzProgressComponent.prototype.gradientId;
    /**
     * Paths to rendered in the template.
     * @type {?}
     */
    NzProgressComponent.prototype.progressCirclePath;
    /** @type {?} */
    NzProgressComponent.prototype.circleGradient;
    /** @type {?} */
    NzProgressComponent.prototype.trailPathStyle;
    /** @type {?} */
    NzProgressComponent.prototype.pathString;
    /** @type {?} */
    NzProgressComponent.prototype.icon;
    /** @type {?} */
    NzProgressComponent.prototype.trackByFn;
    /**
     * @type {?}
     * @private
     */
    NzProgressComponent.prototype.cachedStatus;
    /**
     * @type {?}
     * @private
     */
    NzProgressComponent.prototype.inferredStatus;
    /**
     * @type {?}
     * @private
     */
    NzProgressComponent.prototype.destroy$;
    /** @type {?} */
    NzProgressComponent.prototype.nzConfigService;
}

/**
 * @fileoverview added by tsickle
 * Generated from: progress.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NzProgressModule = /** @class */ (function () {
    function NzProgressModule() {
    }
    NzProgressModule.decorators = [
        { type: NgModule, args: [{
                    exports: [NzProgressComponent],
                    declarations: [NzProgressComponent],
                    imports: [CommonModule, NzIconModule, NzOutletModule]
                },] }
    ];
    return NzProgressModule;
}());

/**
 * @fileoverview added by tsickle
 * Generated from: typings.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
/**
 * @record
 */
function NzProgressGradientProgress() { }
/**
 * @record
 */
function NzProgressGradientFromTo() { }
if (false) {
    /** @type {?} */
    NzProgressGradientFromTo.prototype.from;
    /** @type {?} */
    NzProgressGradientFromTo.prototype.to;
}
/**
 * @record
 */
function NzProgressCirclePath() { }
if (false) {
    /** @type {?} */
    NzProgressCirclePath.prototype.stroke;
    /** @type {?} */
    NzProgressCirclePath.prototype.strokePathStyle;
}
/**
 * @record
 */
function NzProgressStepItem() { }
if (false) {
    /** @type {?} */
    NzProgressStepItem.prototype.backgroundColor;
    /** @type {?} */
    NzProgressStepItem.prototype.width;
    /** @type {?} */
    NzProgressStepItem.prototype.height;
}

/**
 * @fileoverview added by tsickle
 * Generated from: public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: ng-zorro-antd-progress.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { NzProgressComponent, NzProgressModule };
//# sourceMappingURL=ng-zorro-antd-progress.js.map
