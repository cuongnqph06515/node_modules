import { __assign, __decorate, __metadata, __extends, __read } from 'tslib';
import { CdkOverlayOrigin, CdkConnectedOverlay, OverlayModule } from '@angular/cdk/overlay';
import { DOCUMENT, CommonModule } from '@angular/common';
import { EventEmitter, Component, ViewEncapsulation, ChangeDetectionStrategy, Input, Output, Injectable, ChangeDetectorRef, ElementRef, Inject, ViewChild, ViewChildren, ContentChild, forwardRef, Renderer2, Host, Optional, Directive, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzNoAnimationDirective, NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzOverlayModule } from 'ng-zorro-antd/core/overlay';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { CandyDate, normalizeRangeValue, cloneDate, sortRangeValue } from 'ng-zorro-antd/core/time';
import { isTemplateRef, isNonEmptyString, toBoolean, valueFunctionProp, InputBoolean } from 'ng-zorro-antd/core/util';
import { DateHelperService, NzI18nService, NzI18nModule } from 'ng-zorro-antd/i18n';
import { warnDeprecation } from 'ng-zorro-antd/core/logger';
import { ReplaySubject, Subject, fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { slideMotion } from 'ng-zorro-antd/core/animation';

/**
 * @fileoverview added by tsickle
 * Generated from: standard-types.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
/**
 * @record
 */
function DisabledTimeConfig() { }
if (false) {
    /**
     * @return {?}
     */
    DisabledTimeConfig.prototype.nzDisabledHours = function () { };
    /**
     * @param {?} hour
     * @return {?}
     */
    DisabledTimeConfig.prototype.nzDisabledMinutes = function (hour) { };
    /**
     * @param {?} hour
     * @param {?} minute
     * @return {?}
     */
    DisabledTimeConfig.prototype.nzDisabledSeconds = function (hour, minute) { };
}
/**
 * @record
 */
function SupportTimeOptions() { }
if (false) {
    /** @type {?|undefined} */
    SupportTimeOptions.prototype.nzFormat;
    /** @type {?|undefined} */
    SupportTimeOptions.prototype.nzHourStep;
    /** @type {?|undefined} */
    SupportTimeOptions.prototype.nzMinuteStep;
    /** @type {?|undefined} */
    SupportTimeOptions.prototype.nzSecondStep;
    /** @type {?|undefined} */
    SupportTimeOptions.prototype.nzHideDisabledOptions;
    /** @type {?|undefined} */
    SupportTimeOptions.prototype.nzDefaultOpenValue;
    /** @type {?|undefined} */
    SupportTimeOptions.prototype.nzAddOn;
    /** @type {?|undefined} */
    SupportTimeOptions.prototype.nzUse12Hours;
    /**
     * @return {?}
     */
    SupportTimeOptions.prototype.nzDisabledHours = function () { };
    /**
     * @param {?} hour
     * @return {?}
     */
    SupportTimeOptions.prototype.nzDisabledMinutes = function (hour) { };
    /**
     * @param {?} hour
     * @param {?} minute
     * @return {?}
     */
    SupportTimeOptions.prototype.nzDisabledSeconds = function (hour, minute) { };
}
/**
 * @record
 */
function PresetRanges() { }

/**
 * @fileoverview added by tsickle
 * Generated from: util.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
/** @type {?} */
var PREFIX_CLASS = 'ant-picker';
/** @type {?} */
var defaultDisabledTime = {
    nzDisabledHours: /**
     * @return {?}
     */
    function () {
        return [];
    },
    nzDisabledMinutes: /**
     * @return {?}
     */
    function () {
        return [];
    },
    nzDisabledSeconds: /**
     * @return {?}
     */
    function () {
        return [];
    }
};
/**
 * @param {?} value
 * @param {?=} disabledTime
 * @return {?}
 */
function getTimeConfig(value, disabledTime) {
    /** @type {?} */
    var disabledTimeConfig = disabledTime ? disabledTime(value && value.nativeDate) : ((/** @type {?} */ ({})));
    disabledTimeConfig = __assign(__assign({}, defaultDisabledTime), disabledTimeConfig);
    return disabledTimeConfig;
}
/**
 * @param {?} value
 * @param {?} disabledTimeConfig
 * @return {?}
 */
function isTimeValidByConfig(value, disabledTimeConfig) {
    /** @type {?} */
    var invalidTime = false;
    if (value) {
        /** @type {?} */
        var hour = value.getHours();
        /** @type {?} */
        var minutes = value.getMinutes();
        /** @type {?} */
        var seconds = value.getSeconds();
        /** @type {?} */
        var disabledHours = disabledTimeConfig.nzDisabledHours();
        if (disabledHours.indexOf(hour) === -1) {
            /** @type {?} */
            var disabledMinutes = disabledTimeConfig.nzDisabledMinutes(hour);
            if (disabledMinutes.indexOf(minutes) === -1) {
                /** @type {?} */
                var disabledSeconds = disabledTimeConfig.nzDisabledSeconds(hour, minutes);
                invalidTime = disabledSeconds.indexOf(seconds) !== -1;
            }
            else {
                invalidTime = true;
            }
        }
        else {
            invalidTime = true;
        }
    }
    return !invalidTime;
}
/**
 * @param {?} value
 * @param {?} disabledTime
 * @return {?}
 */
function isTimeValid(value, disabledTime) {
    /** @type {?} */
    var disabledTimeConfig = getTimeConfig(value, disabledTime);
    return isTimeValidByConfig(value, disabledTimeConfig);
}
/**
 * @param {?} value
 * @param {?=} disabledDate
 * @param {?=} disabledTime
 * @return {?}
 */
function isAllowedDate(value, disabledDate, disabledTime) {
    if (!value) {
        return false;
    }
    if (disabledDate) {
        if (disabledDate(value.nativeDate)) {
            return false;
        }
    }
    if (disabledTime) {
        if (!isTimeValid(value, disabledTime)) {
            return false;
        }
    }
    return true;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/util.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
/**
 * Compatible translate the moment-like format pattern to angular's pattern
 * Why? For now, we need to support the existing language formats in AntD, and AntD uses the default temporal syntax.
 *
 * TODO: compare and complete all format patterns
 * Each format docs as below:
 * @link https://momentjs.com/docs/#/displaying/format/ / https://angular.io/api/common/DatePipe#description
 * @param {?} format input format pattern
 * @return {?}
 */
function transCompatFormat(format) {
    return (format &&
        format
            .replace(/Y/g, 'y') // only support y, yy, yyy, yyyy
            .replace(/D/g, 'd')); // d, dd represent of D, DD for momentjs, others are not support
}

/**
 * @fileoverview added by tsickle
 * Generated from: calendar-footer.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var CalendarFooterComponent = /** @class */ (function () {
    function CalendarFooterComponent(dateHelper) {
        this.dateHelper = dateHelper;
        this.showToday = false;
        this.hasTimePicker = false;
        this.isRange = false;
        this.okDisabled = false;
        this.rangeQuickSelector = null;
        this.clickOk = new EventEmitter();
        this.clickToday = new EventEmitter();
        this.prefixCls = PREFIX_CLASS;
        this.isTemplateRef = isTemplateRef;
        this.isNonEmptyString = isNonEmptyString;
        this.isTodayDisabled = false;
        this.todayTitle = '';
        this.now = new CandyDate();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    CalendarFooterComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.disabledDate) {
            this.isTodayDisabled = !!(this.disabledDate && this.disabledDate(this.now.nativeDate));
        }
        if (changes.locale) {
            // NOTE: Compat for DatePipe formatting rules
            /** @type {?} */
            var dateFormat = transCompatFormat(this.locale.dateFormat);
            this.todayTitle = this.dateHelper.format(this.now.nativeDate, dateFormat);
        }
    };
    /**
     * @return {?}
     */
    CalendarFooterComponent.prototype.onClickToday = /**
     * @return {?}
     */
    function () {
        this.clickToday.emit(this.now.clone()); // To prevent the "now" being modified from outside, we use clone
    };
    CalendarFooterComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    // tslint:disable-next-line:component-selector
                    selector: 'calendar-footer',
                    exportAs: 'calendarFooter',
                    template: "\n    <div class=\"{{ prefixCls }}-footer\">\n      <div *ngIf=\"extraFooter\" class=\"{{ prefixCls }}-footer-extra\">\n        <ng-container [ngSwitch]=\"true\">\n          <ng-container *ngSwitchCase=\"isTemplateRef(extraFooter)\">\n            <ng-container *ngTemplateOutlet=\"$any(extraFooter)\"></ng-container>\n          </ng-container>\n          <ng-container *ngSwitchCase=\"isNonEmptyString(extraFooter)\">\n            <span [innerHTML]=\"extraFooter\"></span>\n          </ng-container>\n        </ng-container>\n      </div>\n      <a\n        *ngIf=\"showToday && !hasTimePicker\"\n        class=\"{{ prefixCls }}-today-btn {{ isTodayDisabled ? prefixCls + '-today-btn-disabled' : '' }}\"\n        role=\"button\"\n        (click)=\"isTodayDisabled ? null : onClickToday()\"\n        title=\"{{ todayTitle }}\"\n      >\n        {{ locale.today }}\n      </a>\n      <ul *ngIf=\"hasTimePicker || rangeQuickSelector\" class=\"{{ prefixCls }}-ranges\">\n        <ng-container *ngTemplateOutlet=\"rangeQuickSelector\"></ng-container>\n        <li *ngIf=\"hasTimePicker && !isRange\" class=\"{{ prefixCls }}-now\">\n          <a class=\"{{ prefixCls }}-now-btn\" (click)=\"isTodayDisabled ? null : onClickToday()\">\n            {{ locale.now }}\n          </a>\n        </li>\n        <li *ngIf=\"hasTimePicker\" class=\"{{ prefixCls }}-ok\">\n          <button\n            nz-button\n            type=\"button\"\n            nzType=\"primary\"\n            nzSize=\"small\"\n            [disabled]=\"okDisabled\"\n            (click)=\"okDisabled ? null : clickOk.emit()\"\n          >\n            {{ locale.ok }}\n          </button>\n        </li>\n      </ul>\n    </div>\n  "
                }] }
    ];
    /** @nocollapse */
    CalendarFooterComponent.ctorParameters = function () { return [
        { type: DateHelperService }
    ]; };
    CalendarFooterComponent.propDecorators = {
        locale: [{ type: Input }],
        showToday: [{ type: Input }],
        hasTimePicker: [{ type: Input }],
        isRange: [{ type: Input }],
        okDisabled: [{ type: Input }],
        disabledDate: [{ type: Input }],
        extraFooter: [{ type: Input }],
        rangeQuickSelector: [{ type: Input }],
        clickOk: [{ type: Output }],
        clickToday: [{ type: Output }]
    };
    return CalendarFooterComponent;
}());
if (false) {
    /** @type {?} */
    CalendarFooterComponent.prototype.locale;
    /** @type {?} */
    CalendarFooterComponent.prototype.showToday;
    /** @type {?} */
    CalendarFooterComponent.prototype.hasTimePicker;
    /** @type {?} */
    CalendarFooterComponent.prototype.isRange;
    /** @type {?} */
    CalendarFooterComponent.prototype.okDisabled;
    /** @type {?} */
    CalendarFooterComponent.prototype.disabledDate;
    /** @type {?} */
    CalendarFooterComponent.prototype.extraFooter;
    /** @type {?} */
    CalendarFooterComponent.prototype.rangeQuickSelector;
    /** @type {?} */
    CalendarFooterComponent.prototype.clickOk;
    /** @type {?} */
    CalendarFooterComponent.prototype.clickToday;
    /** @type {?} */
    CalendarFooterComponent.prototype.prefixCls;
    /** @type {?} */
    CalendarFooterComponent.prototype.isTemplateRef;
    /** @type {?} */
    CalendarFooterComponent.prototype.isNonEmptyString;
    /** @type {?} */
    CalendarFooterComponent.prototype.isTodayDisabled;
    /** @type {?} */
    CalendarFooterComponent.prototype.todayTitle;
    /**
     * @type {?}
     * @private
     */
    CalendarFooterComponent.prototype.now;
    /**
     * @type {?}
     * @private
     */
    CalendarFooterComponent.prototype.dateHelper;
}

/**
 * @fileoverview added by tsickle
 * Generated from: date-picker.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DatePickerService = /** @class */ (function () {
    function DatePickerService() {
        this.activeInput = 'left';
        this.arrowPositionStyle = {};
        this.isRange = false;
        this.valueChange$ = new ReplaySubject(1);
        this.emitValue$ = new Subject();
        this.inputPartChange$ = new Subject();
    }
    /**
     * @return {?}
     */
    DatePickerService.prototype.initValue = /**
     * @return {?}
     */
    function () {
        if (this.isRange) {
            this.setActiveDate([]);
            this.value = this.initialValue = [];
        }
        else {
            this.value = this.initialValue = null;
        }
    };
    /**
     * @param {?=} value
     * @return {?}
     */
    DatePickerService.prototype.hasValue = /**
     * @param {?=} value
     * @return {?}
     */
    function (value) {
        if (value === void 0) { value = this.value; }
        if (Array.isArray(value)) {
            return !!value[0] && !!value[1];
        }
        else {
            return !!value;
        }
    };
    /**
     * @param {?=} value
     * @return {?}
     */
    DatePickerService.prototype.makeValue = /**
     * @param {?=} value
     * @return {?}
     */
    function (value) {
        if (this.isRange) {
            return value ? ((/** @type {?} */ (value))).map((/**
             * @param {?} val
             * @return {?}
             */
            function (val) { return new CandyDate(val); })) : [];
        }
        else {
            return value ? new CandyDate((/** @type {?} */ (value))) : null;
        }
    };
    /**
     * @param {?} value
     * @param {?=} normalize
     * @return {?}
     */
    DatePickerService.prototype.setActiveDate = /**
     * @param {?} value
     * @param {?=} normalize
     * @return {?}
     */
    function (value, normalize) {
        if (normalize === void 0) { normalize = false; }
        if (this.isRange) {
            this.activeDate = normalize ? normalizeRangeValue((/** @type {?} */ (value))) : value;
        }
        else {
            this.activeDate = cloneDate(value);
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    DatePickerService.prototype.setValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.value = value;
        this.valueChange$.next(this.value);
    };
    /**
     * @param {?=} part
     * @return {?}
     */
    DatePickerService.prototype.getActiveIndex = /**
     * @param {?=} part
     * @return {?}
     */
    function (part) {
        if (part === void 0) { part = this.activeInput; }
        return { left: 0, right: 1 }[part];
    };
    /**
     * @return {?}
     */
    DatePickerService.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.valueChange$.complete();
        this.emitValue$.complete();
        this.inputPartChange$.complete();
    };
    DatePickerService.decorators = [
        { type: Injectable }
    ];
    return DatePickerService;
}());
if (false) {
    /** @type {?} */
    DatePickerService.prototype.initialValue;
    /** @type {?} */
    DatePickerService.prototype.value;
    /** @type {?} */
    DatePickerService.prototype.activeDate;
    /** @type {?} */
    DatePickerService.prototype.activeInput;
    /** @type {?} */
    DatePickerService.prototype.arrowPositionStyle;
    /** @type {?} */
    DatePickerService.prototype.isRange;
    /** @type {?} */
    DatePickerService.prototype.valueChange$;
    /** @type {?} */
    DatePickerService.prototype.emitValue$;
    /** @type {?} */
    DatePickerService.prototype.inputPartChange$;
}

/**
 * @fileoverview added by tsickle
 * Generated from: date-range-popup.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DateRangePopupComponent = /** @class */ (function () {
    function DateRangePopupComponent(datePickerService, cdr) {
        var _this = this;
        this.datePickerService = datePickerService;
        this.cdr = cdr;
        this.panelModeChange = new EventEmitter();
        this.calendarChange = new EventEmitter();
        this.resultOk = new EventEmitter(); // Emitted when done with date selecting
        // Emitted when done with date selecting
        this.prefixCls = PREFIX_CLASS;
        this.endPanelMode = 'date';
        this.timeOptions = null;
        this.hoverValue = []; // Range ONLY
        // Range ONLY
        this.destroy$ = new Subject();
        this.disabledStartTime = (/**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            return _this.disabledTime && _this.disabledTime(value, 'start');
        });
        this.disabledEndTime = (/**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            return _this.disabledTime && _this.disabledTime(value, 'end');
        });
    }
    Object.defineProperty(DateRangePopupComponent.prototype, "hasTimePicker", {
        get: /**
         * @return {?}
         */
        function () {
            return !!this.showTime;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateRangePopupComponent.prototype, "hasFooter", {
        get: /**
         * @return {?}
         */
        function () {
            return this.showToday || this.hasTimePicker || !!this.extraFooter || !!this.ranges;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DateRangePopupComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.datePickerService.valueChange$.pipe(takeUntil(this.destroy$)).subscribe((/**
         * @return {?}
         */
        function () {
            _this.initActiveDate();
            _this.cdr.markForCheck();
        }));
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    DateRangePopupComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        // Parse showTime options
        if (changes.showTime || changes.disabledTime) {
            if (this.showTime) {
                this.buildTimeOptions();
            }
        }
        if (changes.panelMode) {
            this.endPanelMode = this.panelMode;
        }
    };
    /**
     * @return {?}
     */
    DateRangePopupComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.destroy$.next();
        this.destroy$.complete();
    };
    /**
     * @return {?}
     */
    DateRangePopupComponent.prototype.initActiveDate = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var activeDate = this.datePickerService.hasValue()
            ? this.datePickerService.value
            : this.datePickerService.makeValue((/** @type {?} */ (this.defaultPickerValue)));
        this.datePickerService.setActiveDate(activeDate, !this.showTime);
    };
    /**
     * @return {?}
     */
    DateRangePopupComponent.prototype.onClickOk = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var otherPart = this.datePickerService.activeInput === 'left' ? 'right' : 'left';
        /** @type {?} */
        var selectedValue = this.datePickerService.value;
        if (this.isAllowed(selectedValue, true)) {
            this.resultOk.emit();
        }
        else {
            if (this.isRange && this.isOneAllowed((/** @type {?} */ (selectedValue)))) {
                this.datePickerService.inputPartChange$.next(otherPart);
            }
            else {
                this.datePickerService.inputPartChange$.next();
            }
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    DateRangePopupComponent.prototype.onClickToday = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.changeValueFromSelect(value, !this.showTime);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    DateRangePopupComponent.prototype.onDayHover = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (!this.isRange) {
            return;
        }
        /** @type {?} */
        var otherInputIndex = { left: 1, right: 0 }[this.datePickerService.activeInput];
        /** @type {?} */
        var base = (/** @type {?} */ (((/** @type {?} */ (this.datePickerService.value)))[otherInputIndex]));
        if (base) {
            if (base.isBeforeDay(value)) {
                this.hoverValue = [base, value];
            }
            else {
                this.hoverValue = [value, base];
            }
        }
    };
    /**
     * @param {?} mode
     * @param {?=} partType
     * @return {?}
     */
    DateRangePopupComponent.prototype.onPanelModeChange = /**
     * @param {?} mode
     * @param {?=} partType
     * @return {?}
     */
    function (mode, partType) {
        if (this.isRange) {
            /** @type {?} */
            var index = this.datePickerService.getActiveIndex(partType);
            if (index === 0) {
                this.panelMode = (/** @type {?} */ ([mode, this.panelMode[1]]));
            }
            else {
                this.panelMode = (/** @type {?} */ ([this.panelMode[0], mode]));
            }
        }
        else {
            this.panelMode = mode;
        }
        // this.cdr.markForCheck();
        this.panelModeChange.emit(this.panelMode);
    };
    /**
     * @param {?} value
     * @param {?} partType
     * @return {?}
     */
    DateRangePopupComponent.prototype.onActiveDateChange = /**
     * @param {?} value
     * @param {?} partType
     * @return {?}
     */
    function (value, partType) {
        if (this.isRange) {
            if (partType === 'left') {
                this.datePickerService.activeDate = [value, value.addMonths(1)];
            }
            else {
                this.datePickerService.activeDate = [value.addMonths(-1), value];
            }
        }
        else {
            this.datePickerService.activeDate = value;
        }
    };
    /**
     * @param {?} value
     * @param {?=} partType
     * @return {?}
     */
    DateRangePopupComponent.prototype.onSelectTime = /**
     * @param {?} value
     * @param {?=} partType
     * @return {?}
     */
    function (value, partType) {
        if (this.isRange) {
            /** @type {?} */
            var newValue = (/** @type {?} */ (cloneDate(this.datePickerService.value)));
            /** @type {?} */
            var index = this.datePickerService.getActiveIndex(partType);
            newValue[index] = this.overrideHms(value, newValue[index]);
            this.datePickerService.setValue(newValue);
        }
        else {
            /** @type {?} */
            var newValue = this.overrideHms(value, (/** @type {?} */ (this.datePickerService.value)));
            this.datePickerService.setValue(newValue); // If not select a date currently, use today
        }
        this.datePickerService.inputPartChange$.next();
        this.buildTimeOptions();
    };
    /**
     * @param {?} value
     * @param {?=} emitValue
     * @return {?}
     */
    DateRangePopupComponent.prototype.changeValueFromSelect = /**
     * @param {?} value
     * @param {?=} emitValue
     * @return {?}
     */
    function (value, emitValue) {
        if (emitValue === void 0) { emitValue = true; }
        if (this.isRange) {
            /** @type {?} */
            var selectedValue = (/** @type {?} */ (cloneDate(this.datePickerService.value)));
            /** @type {?} */
            var otherPart = void 0;
            if (this.datePickerService.activeInput === 'left') {
                otherPart = 'right';
                selectedValue[0] = value;
            }
            else {
                otherPart = 'left';
                selectedValue[1] = value;
            }
            selectedValue = sortRangeValue(selectedValue);
            this.hoverValue = selectedValue;
            this.datePickerService.setValue(selectedValue);
            this.datePickerService.setActiveDate(selectedValue, !this.showTime);
            this.datePickerService.inputPartChange$.next();
            if (!this.isAllowed(selectedValue)) {
                return;
            }
            if (emitValue) {
                // If the other input has value
                if (this.isBothAllowed(selectedValue)) {
                    this.calendarChange.emit(selectedValue);
                    this.clearHoverValue();
                    this.datePickerService.emitValue$.next();
                }
                else {
                    this.calendarChange.emit([value.clone()]);
                    this.datePickerService.inputPartChange$.next((/** @type {?} */ (otherPart)));
                }
            }
        }
        else {
            this.datePickerService.setValue(value);
            this.datePickerService.setActiveDate(value, !this.showTime);
            this.datePickerService.inputPartChange$.next();
            if (!this.isAllowed(value)) {
                return;
            }
            if (emitValue) {
                this.datePickerService.emitValue$.next();
            }
        }
    };
    /**
     * @param {?} panelMode
     * @param {?=} partType
     * @return {?}
     */
    DateRangePopupComponent.prototype.getPanelMode = /**
     * @param {?} panelMode
     * @param {?=} partType
     * @return {?}
     */
    function (panelMode, partType) {
        if (this.isRange) {
            return (/** @type {?} */ (panelMode[this.datePickerService.getActiveIndex(partType)]));
        }
        else {
            return (/** @type {?} */ (panelMode));
        }
    };
    // Get single value or part value of a range
    // Get single value or part value of a range
    /**
     * @param {?=} partType
     * @return {?}
     */
    DateRangePopupComponent.prototype.getValue = 
    // Get single value or part value of a range
    /**
     * @param {?=} partType
     * @return {?}
     */
    function (partType) {
        if (this.isRange) {
            return (((/** @type {?} */ (this.datePickerService.value))) || [])[this.datePickerService.getActiveIndex(partType)];
        }
        else {
            return (/** @type {?} */ (this.datePickerService.value));
        }
    };
    /**
     * @param {?=} partType
     * @return {?}
     */
    DateRangePopupComponent.prototype.getActiveDate = /**
     * @param {?=} partType
     * @return {?}
     */
    function (partType) {
        if (this.isRange) {
            return ((/** @type {?} */ (this.datePickerService.activeDate)))[this.datePickerService.getActiveIndex(partType)];
        }
        else {
            return (/** @type {?} */ (this.datePickerService.activeDate));
        }
    };
    /**
     * @param {?} selectedValue
     * @return {?}
     */
    DateRangePopupComponent.prototype.isOneAllowed = /**
     * @param {?} selectedValue
     * @return {?}
     */
    function (selectedValue) {
        /** @type {?} */
        var index = this.datePickerService.getActiveIndex();
        /** @type {?} */
        var disabledTimeArr = [this.disabledStartTime, this.disabledEndTime];
        return isAllowedDate((/** @type {?} */ (selectedValue[index])), this.disabledDate, disabledTimeArr[index]);
    };
    /**
     * @param {?} selectedValue
     * @return {?}
     */
    DateRangePopupComponent.prototype.isBothAllowed = /**
     * @param {?} selectedValue
     * @return {?}
     */
    function (selectedValue) {
        return (isAllowedDate((/** @type {?} */ (selectedValue[0])), this.disabledDate, this.disabledStartTime) &&
            isAllowedDate((/** @type {?} */ (selectedValue[1])), this.disabledDate, this.disabledEndTime));
    };
    /**
     * @param {?} value
     * @param {?=} isBoth
     * @return {?}
     */
    DateRangePopupComponent.prototype.isAllowed = /**
     * @param {?} value
     * @param {?=} isBoth
     * @return {?}
     */
    function (value, isBoth) {
        if (isBoth === void 0) { isBoth = false; }
        if (this.isRange) {
            return isBoth ? this.isBothAllowed((/** @type {?} */ (value))) : this.isOneAllowed((/** @type {?} */ (value)));
        }
        else {
            return isAllowedDate((/** @type {?} */ (value)), this.disabledDate, this.disabledTime);
        }
    };
    /**
     * @param {?=} partType
     * @return {?}
     */
    DateRangePopupComponent.prototype.getTimeOptions = /**
     * @param {?=} partType
     * @return {?}
     */
    function (partType) {
        if (this.showTime && this.timeOptions) {
            return this.timeOptions instanceof Array ? this.timeOptions[this.datePickerService.getActiveIndex(partType)] : this.timeOptions;
        }
        return null;
    };
    /**
     * @param {?} val
     * @return {?}
     */
    DateRangePopupComponent.prototype.onClickPresetRange = /**
     * @param {?} val
     * @return {?}
     */
    function (val) {
        /** @type {?} */
        var value = typeof val === 'function' ? val() : val;
        if (value) {
            this.datePickerService.setValue([new CandyDate(value[0]), new CandyDate(value[1])]);
            this.resultOk.emit();
        }
    };
    /**
     * @return {?}
     */
    DateRangePopupComponent.prototype.onPresetRangeMouseLeave = /**
     * @return {?}
     */
    function () {
        this.clearHoverValue();
    };
    /**
     * @param {?} val
     * @return {?}
     */
    DateRangePopupComponent.prototype.onHoverPresetRange = /**
     * @param {?} val
     * @return {?}
     */
    function (val) {
        if (typeof val !== 'function') {
            this.hoverValue = [new CandyDate(val[0]), new CandyDate(val[1])];
        }
    };
    /**
     * @param {?=} obj
     * @return {?}
     */
    DateRangePopupComponent.prototype.getObjectKeys = /**
     * @param {?=} obj
     * @return {?}
     */
    function (obj) {
        return obj ? Object.keys(obj) : [];
    };
    /**
     * @param {?} partType
     * @return {?}
     */
    DateRangePopupComponent.prototype.show = /**
     * @param {?} partType
     * @return {?}
     */
    function (partType) {
        /** @type {?} */
        var hide = this.showTime && this.isRange && this.datePickerService.activeInput !== partType;
        return !hide;
    };
    /**
     * @private
     * @return {?}
     */
    DateRangePopupComponent.prototype.clearHoverValue = /**
     * @private
     * @return {?}
     */
    function () {
        this.hoverValue = [];
    };
    /**
     * @private
     * @return {?}
     */
    DateRangePopupComponent.prototype.buildTimeOptions = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.showTime) {
            /** @type {?} */
            var showTime = typeof this.showTime === 'object' ? this.showTime : {};
            if (this.isRange) {
                /** @type {?} */
                var value = (/** @type {?} */ (this.datePickerService.value));
                this.timeOptions = [this.overrideTimeOptions(showTime, value[0], 'start'), this.overrideTimeOptions(showTime, value[1], 'end')];
            }
            else {
                this.timeOptions = this.overrideTimeOptions(showTime, (/** @type {?} */ (this.datePickerService.value)));
            }
        }
        else {
            this.timeOptions = null;
        }
    };
    /**
     * @private
     * @param {?} origin
     * @param {?} value
     * @param {?=} partial
     * @return {?}
     */
    DateRangePopupComponent.prototype.overrideTimeOptions = /**
     * @private
     * @param {?} origin
     * @param {?} value
     * @param {?=} partial
     * @return {?}
     */
    function (origin, value, partial) {
        /** @type {?} */
        var disabledTimeFn;
        if (partial) {
            disabledTimeFn = partial === 'start' ? this.disabledStartTime : this.disabledEndTime;
        }
        else {
            disabledTimeFn = this.disabledTime;
        }
        return __assign(__assign({}, origin), getTimeConfig(value, disabledTimeFn));
    };
    /**
     * @private
     * @param {?} newValue
     * @param {?} oldValue
     * @return {?}
     */
    DateRangePopupComponent.prototype.overrideHms = /**
     * @private
     * @param {?} newValue
     * @param {?} oldValue
     * @return {?}
     */
    function (newValue, oldValue) {
        // tslint:disable-next-line:no-parameter-reassignment
        newValue = newValue || new CandyDate();
        // tslint:disable-next-line:no-parameter-reassignment
        oldValue = oldValue || new CandyDate();
        return oldValue.setHms(newValue.getHours(), newValue.getMinutes(), newValue.getSeconds());
    };
    DateRangePopupComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    // tslint:disable-next-line:component-selector
                    selector: 'date-range-popup',
                    exportAs: 'dateRangePopup',
                    template: "\n    <ng-container *ngIf=\"isRange; else singlePanel\">\n      <div class=\"{{ prefixCls }}-range-wrapper {{ prefixCls }}-date-range-wrapper\">\n        <div class=\"{{ prefixCls }}-range-arrow\" [ngStyle]=\"datePickerService?.arrowPositionStyle!\"></div>\n        <div class=\"{{ prefixCls }}-panel-container\">\n          <div class=\"{{ prefixCls }}-panels\">\n            <ng-container *ngTemplateOutlet=\"tplRangePart; context: { partType: 'left' }\"></ng-container>\n            <ng-container *ngTemplateOutlet=\"tplRangePart; context: { partType: 'right' }\"></ng-container>\n          </div>\n          <ng-container *ngTemplateOutlet=\"tplFooter\"></ng-container>\n        </div>\n      </div>\n    </ng-container>\n    <ng-template #singlePanel>\n      <div\n        class=\"{{ prefixCls }}-panel-container {{ showWeek ? prefixCls + '-week-number' : '' }} {{\n          hasTimePicker ? prefixCls + '-time' : ''\n        }} {{ isRange ? prefixCls + '-range' : '' }}\"\n      >\n        <div class=\"{{ prefixCls }}-panel\" tabindex=\"-1\">\n          <!-- Single ONLY -->\n          <ng-container *ngTemplateOutlet=\"tplInnerPopup\"></ng-container>\n          <ng-container *ngTemplateOutlet=\"tplFooter\"></ng-container>\n        </div>\n      </div>\n    </ng-template>\n\n    <ng-template #tplInnerPopup let-partType=\"partType\">\n      <!-- TODO(@wenqi73) [selectedValue] [hoverValue] types-->\n      <inner-popup\n        *ngIf=\"show(partType)\"\n        [showWeek]=\"showWeek\"\n        [endPanelMode]=\"getPanelMode(endPanelMode, partType)\"\n        [partType]=\"partType\"\n        [locale]=\"locale!\"\n        [showTimePicker]=\"hasTimePicker\"\n        [timeOptions]=\"getTimeOptions(partType)\"\n        [panelMode]=\"getPanelMode(panelMode, partType)\"\n        (panelModeChange)=\"onPanelModeChange($event, partType)\"\n        [activeDate]=\"getActiveDate(partType)\"\n        [value]=\"getValue(partType)\"\n        [disabledDate]=\"disabledDate\"\n        [dateRender]=\"dateRender\"\n        [selectedValue]=\"$any(datePickerService?.value)\"\n        [hoverValue]=\"$any(hoverValue)\"\n        (dayHover)=\"onDayHover($event)\"\n        (selectDate)=\"changeValueFromSelect($event, !showTime)\"\n        (selectTime)=\"onSelectTime($event, partType)\"\n        (headerChange)=\"onActiveDateChange($event, partType)\"\n      ></inner-popup>\n    </ng-template>\n\n    <ng-template #tplFooter>\n      <calendar-footer\n        *ngIf=\"hasFooter\"\n        [locale]=\"locale!\"\n        [isRange]=\"isRange\"\n        [showToday]=\"showToday\"\n        [hasTimePicker]=\"hasTimePicker\"\n        [okDisabled]=\"!isAllowed($any(datePickerService?.value))\"\n        [extraFooter]=\"extraFooter\"\n        [rangeQuickSelector]=\"ranges ? tplRangeQuickSelector : null\"\n        (clickOk)=\"onClickOk()\"\n        (clickToday)=\"onClickToday($event)\"\n      ></calendar-footer>\n    </ng-template>\n\n    <ng-template #tplRangePart let-partType=\"partType\">\n      <div class=\"{{ prefixCls }}-panel\">\n        <ng-container *ngTemplateOutlet=\"tplInnerPopup; context: { partType: partType }\"></ng-container>\n      </div>\n    </ng-template>\n\n    <!-- Range ONLY: Range Quick Selector -->\n    <ng-template #tplRangeQuickSelector>\n      <li\n        *ngFor=\"let name of getObjectKeys(ranges)\"\n        class=\"{{ prefixCls }}-preset\"\n        (click)=\"onClickPresetRange(ranges![name])\"\n        (mouseenter)=\"onHoverPresetRange(ranges![name])\"\n        (mouseleave)=\"onPresetRangeMouseLeave()\"\n      >\n        <span class=\"ant-tag ant-tag-blue\">{{ name }}</span>\n      </li>\n    </ng-template>\n  "
                }] }
    ];
    /** @nocollapse */
    DateRangePopupComponent.ctorParameters = function () { return [
        { type: DatePickerService },
        { type: ChangeDetectorRef }
    ]; };
    DateRangePopupComponent.propDecorators = {
        isRange: [{ type: Input }],
        showWeek: [{ type: Input }],
        locale: [{ type: Input }],
        format: [{ type: Input }],
        placeholder: [{ type: Input }],
        disabledDate: [{ type: Input }],
        disabledTime: [{ type: Input }],
        showToday: [{ type: Input }],
        showTime: [{ type: Input }],
        extraFooter: [{ type: Input }],
        ranges: [{ type: Input }],
        dateRender: [{ type: Input }],
        panelMode: [{ type: Input }],
        defaultPickerValue: [{ type: Input }],
        panelModeChange: [{ type: Output }],
        calendarChange: [{ type: Output }],
        resultOk: [{ type: Output }]
    };
    return DateRangePopupComponent;
}());
if (false) {
    /** @type {?} */
    DateRangePopupComponent.prototype.isRange;
    /** @type {?} */
    DateRangePopupComponent.prototype.showWeek;
    /** @type {?} */
    DateRangePopupComponent.prototype.locale;
    /** @type {?} */
    DateRangePopupComponent.prototype.format;
    /** @type {?} */
    DateRangePopupComponent.prototype.placeholder;
    /** @type {?} */
    DateRangePopupComponent.prototype.disabledDate;
    /** @type {?} */
    DateRangePopupComponent.prototype.disabledTime;
    /** @type {?} */
    DateRangePopupComponent.prototype.showToday;
    /** @type {?} */
    DateRangePopupComponent.prototype.showTime;
    /** @type {?} */
    DateRangePopupComponent.prototype.extraFooter;
    /** @type {?} */
    DateRangePopupComponent.prototype.ranges;
    /** @type {?} */
    DateRangePopupComponent.prototype.dateRender;
    /** @type {?} */
    DateRangePopupComponent.prototype.panelMode;
    /** @type {?} */
    DateRangePopupComponent.prototype.defaultPickerValue;
    /** @type {?} */
    DateRangePopupComponent.prototype.panelModeChange;
    /** @type {?} */
    DateRangePopupComponent.prototype.calendarChange;
    /** @type {?} */
    DateRangePopupComponent.prototype.resultOk;
    /** @type {?} */
    DateRangePopupComponent.prototype.prefixCls;
    /** @type {?} */
    DateRangePopupComponent.prototype.endPanelMode;
    /** @type {?} */
    DateRangePopupComponent.prototype.timeOptions;
    /** @type {?} */
    DateRangePopupComponent.prototype.hoverValue;
    /** @type {?} */
    DateRangePopupComponent.prototype.destroy$;
    /** @type {?} */
    DateRangePopupComponent.prototype.disabledStartTime;
    /** @type {?} */
    DateRangePopupComponent.prototype.disabledEndTime;
    /** @type {?} */
    DateRangePopupComponent.prototype.datePickerService;
    /** @type {?} */
    DateRangePopupComponent.prototype.cdr;
}

/**
 * @fileoverview added by tsickle
 * Generated from: picker.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NzPickerComponent = /** @class */ (function () {
    function NzPickerComponent(elementRef, dateHelper, changeDetector, datePickerService, doc) {
        this.elementRef = elementRef;
        this.dateHelper = dateHelper;
        this.changeDetector = changeDetector;
        this.datePickerService = datePickerService;
        this.noAnimation = false;
        this.isRange = false;
        this.open = undefined;
        this.disabled = false;
        this.inputReadOnly = false;
        this.popupStyle = null;
        this.focusChange = new EventEmitter();
        this.valueChange = new EventEmitter();
        this.openChange = new EventEmitter(); // Emitted when overlay's open state change
        this.destroy$ = new Subject();
        this.prefixCls = PREFIX_CLASS;
        this.activeBarStyle = { position: 'absolute' };
        this.animationOpenState = false;
        this.overlayOpen = false; // Available when "open"=undefined
        // Available when "open"=undefined
        this.overlayPositions = (/** @type {?} */ ([
            {
                offsetX: -12,
                offsetY: 8,
                originX: 'start',
                originY: 'bottom',
                overlayX: 'start',
                overlayY: 'top'
            },
            {
                offsetX: -12,
                offsetY: -8,
                originX: 'start',
                originY: 'top',
                overlayX: 'start',
                overlayY: 'bottom'
            },
            {
                offsetX: 12,
                offsetY: 8,
                originX: 'end',
                originY: 'bottom',
                overlayX: 'end',
                overlayY: 'top'
            },
            {
                offsetX: 12,
                offsetY: -8,
                originX: 'end',
                originY: 'top',
                overlayX: 'end',
                overlayY: 'bottom'
            }
        ]));
        this.currentPositionX = 'start';
        this.currentPositionY = 'bottom';
        this.document = doc;
        this.origin = new CdkOverlayOrigin(this.elementRef);
        this.updateInputValue();
    }
    Object.defineProperty(NzPickerComponent.prototype, "realOpenState", {
        get: /**
         * @return {?}
         */
        function () {
            // The value that really decide the open state of overlay
            return this.isOpenHandledByUser() ? !!this.open : this.overlayOpen;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NzPickerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.inputSize = Math.max(10, this.format.length) + 2;
        this.datePickerService.valueChange$.pipe(takeUntil(this.destroy$)).subscribe((/**
         * @return {?}
         */
        function () {
            _this.updateInputValue();
            _this.changeDetector.markForCheck();
        }));
    };
    /**
     * @return {?}
     */
    NzPickerComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.autoFocus) {
            this.focus();
        }
        if (this.isRange) {
            fromEvent(window, 'resize')
                .pipe(takeUntil(this.destroy$))
                .subscribe((/**
             * @return {?}
             */
            function () {
                _this.resetInputWidthAndArrowLeft();
            }));
        }
        this.datePickerService.inputPartChange$.pipe(takeUntil(this.destroy$)).subscribe((/**
         * @param {?} partType
         * @return {?}
         */
        function (partType) {
            var _a;
            if (partType) {
                _this.datePickerService.activeInput = partType;
            }
            _this.datePickerService.arrowPositionStyle = {
                left: _this.datePickerService.activeInput === 'left' ? '0px' : _this.arrowLeft + "px"
            };
            _this.activeBarStyle = __assign(__assign(__assign({}, _this.activeBarStyle), _this.datePickerService.arrowPositionStyle), { width: _this.inputWidth + "px" });
            if (_this.document.activeElement !== _this.getInput(_this.datePickerService.activeInput)) {
                _this.focus();
            }
            (_a = _this.panel) === null || _a === void 0 ? void 0 : _a.cdr.markForCheck();
            _this.changeDetector.markForCheck();
        }));
    };
    /**
     * @return {?}
     */
    NzPickerComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.destroy$.next();
        this.destroy$.complete();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    NzPickerComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.open) {
            this.animationStart();
        }
    };
    /**
     * @return {?}
     */
    NzPickerComponent.prototype.resetInputWidthAndArrowLeft = /**
     * @return {?}
     */
    function () {
        var _a, _b, _c;
        this.inputWidth = ((_b = (_a = this.rangePickerInputs) === null || _a === void 0 ? void 0 : _a.first) === null || _b === void 0 ? void 0 : _b.nativeElement.offsetWidth) || 0;
        this.arrowLeft = this.inputWidth + ((_c = this.separatorElement) === null || _c === void 0 ? void 0 : _c.nativeElement.offsetWidth) || 0;
    };
    /**
     * @param {?=} partType
     * @return {?}
     */
    NzPickerComponent.prototype.getInput = /**
     * @param {?=} partType
     * @return {?}
     */
    function (partType) {
        return this.isRange
            ? partType === 'left'
                ? this.rangePickerInputs.first.nativeElement
                : this.rangePickerInputs.last.nativeElement
            : (/** @type {?} */ (this.pickerInput)).nativeElement;
    };
    /**
     * @return {?}
     */
    NzPickerComponent.prototype.focus = /**
     * @return {?}
     */
    function () {
        this.getInput(this.datePickerService.activeInput).focus(); // Focus on the first input
    };
    /**
     * @param {?=} partType
     * @return {?}
     */
    NzPickerComponent.prototype.onFocus = /**
     * @param {?=} partType
     * @return {?}
     */
    function (partType) {
        if (partType) {
            this.datePickerService.inputPartChange$.next(partType);
        }
        this.focusChange.emit(true);
    };
    /**
     * @return {?}
     */
    NzPickerComponent.prototype.onBlur = /**
     * @return {?}
     */
    function () {
        this.focusChange.emit(false);
    };
    // Show overlay content
    // Show overlay content
    /**
     * @return {?}
     */
    NzPickerComponent.prototype.showOverlay = 
    // Show overlay content
    /**
     * @return {?}
     */
    function () {
        if (!this.realOpenState) {
            this.resetInputWidthAndArrowLeft();
            this.overlayOpen = true;
            this.animationStart();
            this.focus();
            this.openChange.emit(true);
        }
    };
    /**
     * @return {?}
     */
    NzPickerComponent.prototype.hideOverlay = /**
     * @return {?}
     */
    function () {
        if (this.realOpenState) {
            this.overlayOpen = false;
            this.openChange.emit(false);
            this.focus();
        }
    };
    /**
     * @return {?}
     */
    NzPickerComponent.prototype.showClear = /**
     * @return {?}
     */
    function () {
        return !this.disabled && !this.isEmptyValue(this.datePickerService.value) && !!this.allowClear;
    };
    /**
     * @param {?} event
     * @param {?=} partType
     * @return {?}
     */
    NzPickerComponent.prototype.onClickInputBox = /**
     * @param {?} event
     * @param {?=} partType
     * @return {?}
     */
    function (event, partType) {
        event.stopPropagation();
        if (!this.disabled && !this.isOpenHandledByUser()) {
            this.showOverlay();
        }
        this.onFocus(partType);
    };
    /**
     * @return {?}
     */
    NzPickerComponent.prototype.onClickBackdrop = /**
     * @return {?}
     */
    function () {
        if (this.panel.isAllowed((/** @type {?} */ (this.datePickerService.value)), true)) {
            this.updateInputValue();
            this.datePickerService.emitValue$.next();
        }
        else {
            this.datePickerService.setValue((/** @type {?} */ (this.datePickerService.initialValue)));
            this.hideOverlay();
        }
    };
    /**
     * @return {?}
     */
    NzPickerComponent.prototype.onOverlayDetach = /**
     * @return {?}
     */
    function () {
        this.hideOverlay();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NzPickerComponent.prototype.onOverlayKeydown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event.key === 'Escape') {
            this.datePickerService.setValue((/** @type {?} */ (this.datePickerService.initialValue)));
        }
    };
    // NOTE: A issue here, the first time position change, the animation will not be triggered.
    // Because the overlay's "positionChange" event is emitted after the content's full shown up.
    // All other components like "nz-dropdown" which depends on overlay also has the same issue.
    // See: https://github.com/NG-ZORRO/ng-zorro-antd/issues/1429
    // NOTE: A issue here, the first time position change, the animation will not be triggered.
    // Because the overlay's "positionChange" event is emitted after the content's full shown up.
    // All other components like "nz-dropdown" which depends on overlay also has the same issue.
    // See: https://github.com/NG-ZORRO/ng-zorro-antd/issues/1429
    /**
     * @param {?} position
     * @return {?}
     */
    NzPickerComponent.prototype.onPositionChange = 
    // NOTE: A issue here, the first time position change, the animation will not be triggered.
    // Because the overlay's "positionChange" event is emitted after the content's full shown up.
    // All other components like "nz-dropdown" which depends on overlay also has the same issue.
    // See: https://github.com/NG-ZORRO/ng-zorro-antd/issues/1429
    /**
     * @param {?} position
     * @return {?}
     */
    function (position) {
        this.currentPositionX = position.connectionPair.originX;
        this.currentPositionY = position.connectionPair.originY;
        this.changeDetector.detectChanges(); // Take side-effects to position styles
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NzPickerComponent.prototype.onClickClear = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.preventDefault();
        event.stopPropagation();
        this.datePickerService.setValue(this.isRange ? [] : null);
        this.datePickerService.emitValue$.next();
    };
    /**
     * @return {?}
     */
    NzPickerComponent.prototype.updateInputValue = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var newValue = this.datePickerService.value;
        if (this.isRange) {
            this.inputValue = newValue ? ((/** @type {?} */ (newValue))).map((/**
             * @param {?} v
             * @return {?}
             */
            function (v) { return _this.formatValue(v); })) : ['', ''];
        }
        else {
            this.inputValue = this.formatValue((/** @type {?} */ (newValue)));
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    NzPickerComponent.prototype.formatValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return this.dateHelper.format(value && ((/** @type {?} */ (value))).nativeDate, this.format);
    };
    /**
     * @param {?} event
     * @param {?=} emitValue
     * @return {?}
     */
    NzPickerComponent.prototype.onInputKeyup = /**
     * @param {?} event
     * @param {?=} emitValue
     * @return {?}
     */
    function (event, emitValue) {
        if (emitValue === void 0) { emitValue = false; }
        if (!this.realOpenState) {
            this.showOverlay();
            return;
        }
        /** @type {?} */
        var date = this.checkValidInputDate((/** @type {?} */ (((/** @type {?} */ (event))).target)));
        if (this.panel && date) {
            this.panel.changeValueFromSelect(date, emitValue);
        }
    };
    /**
     * @private
     * @param {?} inputTarget
     * @return {?}
     */
    NzPickerComponent.prototype.checkValidInputDate = /**
     * @private
     * @param {?} inputTarget
     * @return {?}
     */
    function (inputTarget) {
        /** @type {?} */
        var input = ((/** @type {?} */ (inputTarget))).value;
        /** @type {?} */
        var date = new CandyDate(this.dateHelper.parseDate(input, this.format));
        if (!date.isValid() || input !== this.dateHelper.format(date.nativeDate, this.format)) {
            return null;
        }
        return date;
    };
    /**
     * @param {?=} partType
     * @return {?}
     */
    NzPickerComponent.prototype.getPlaceholder = /**
     * @param {?=} partType
     * @return {?}
     */
    function (partType) {
        return this.isRange ? this.placeholder[this.datePickerService.getActiveIndex((/** @type {?} */ (partType)))] : ((/** @type {?} */ (this.placeholder)));
    };
    /**
     * @param {?} value
     * @return {?}
     */
    NzPickerComponent.prototype.isEmptyValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (value === null) {
            return true;
        }
        else if (this.isRange) {
            return !value || !Array.isArray(value) || value.every((/**
             * @param {?} val
             * @return {?}
             */
            function (val) { return !val; }));
        }
        else {
            return !value;
        }
    };
    // Whether open state is permanently controlled by user himself
    // Whether open state is permanently controlled by user himself
    /**
     * @return {?}
     */
    NzPickerComponent.prototype.isOpenHandledByUser = 
    // Whether open state is permanently controlled by user himself
    /**
     * @return {?}
     */
    function () {
        return this.open !== undefined;
    };
    /**
     * @return {?}
     */
    NzPickerComponent.prototype.animationStart = /**
     * @return {?}
     */
    function () {
        if (this.realOpenState) {
            this.animationOpenState = true;
        }
    };
    /**
     * @return {?}
     */
    NzPickerComponent.prototype.animationDone = /**
     * @return {?}
     */
    function () {
        if (!this.realOpenState) {
            this.animationOpenState = false;
            this.changeDetector.markForCheck();
        }
    };
    NzPickerComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: '[nz-picker]',
                    exportAs: 'nzPicker',
                    template: "\n    <!-- Content of single picker -->\n    <div *ngIf=\"!isRange\" class=\"{{ prefixCls }}-input\">\n      <input\n        #pickerInput\n        [class.ant-input-disabled]=\"disabled\"\n        [disabled]=\"disabled\"\n        [readOnly]=\"inputReadOnly\"\n        [(ngModel)]=\"inputValue\"\n        placeholder=\"{{ getPlaceholder() }}\"\n        [size]=\"inputSize\"\n        (focus)=\"onFocus()\"\n        (blur)=\"onBlur()\"\n        (input)=\"onInputKeyup($event)\"\n        (keyup.enter)=\"onInputKeyup($event, true)\"\n      />\n      <ng-container *ngTemplateOutlet=\"tplRightRest\"></ng-container>\n    </div>\n\n    <!-- Content of range picker -->\n    <ng-container *ngIf=\"isRange\">\n      <div class=\"{{ prefixCls }}-input\">\n        <ng-container *ngTemplateOutlet=\"tplRangeInput; context: { partType: 'left' }\"></ng-container>\n      </div>\n      <div #separatorElement class=\"{{ prefixCls }}-range-separator\">\n        <span class=\"{{ prefixCls }}-separator\">\n          <ng-container *ngIf=\"separator; else defaultSeparator\">{{ separator }}</ng-container>\n        </span>\n        <ng-template #defaultSeparator>\n          <i nz-icon nzType=\"swap-right\" nzTheme=\"outline\"></i>\n        </ng-template>\n      </div>\n      <div class=\"{{ prefixCls }}-input\">\n        <ng-container *ngTemplateOutlet=\"tplRangeInput; context: { partType: 'right' }\"></ng-container>\n      </div>\n      <ng-container *ngTemplateOutlet=\"tplRightRest\"></ng-container>\n    </ng-container>\n    <!-- Input for Range ONLY -->\n    <ng-template #tplRangeInput let-partType=\"partType\">\n      <input\n        #rangePickerInput\n        [disabled]=\"disabled\"\n        [readOnly]=\"inputReadOnly\"\n        [size]=\"inputSize\"\n        (click)=\"onClickInputBox($event, partType)\"\n        (blur)=\"onBlur()\"\n        (input)=\"onInputKeyup($event)\"\n        (focus)=\"onFocus(partType)\"\n        (keyup.enter)=\"onInputKeyup($event, true)\"\n        [(ngModel)]=\"inputValue[datePickerService.getActiveIndex(partType)]\"\n        placeholder=\"{{ getPlaceholder(partType) }}\"\n      />\n    </ng-template>\n\n    <!-- Right operator icons -->\n    <ng-template #tplRightRest>\n      <div class=\"{{ prefixCls }}-active-bar\" [ngStyle]=\"activeBarStyle\"></div>\n      <span *ngIf=\"showClear()\" class=\"{{ prefixCls }}-clear\" (click)=\"onClickClear($event)\">\n        <i nz-icon nzType=\"close-circle\" nzTheme=\"fill\"></i>\n      </span>\n      <span class=\"{{ prefixCls }}-suffix\">\n        <ng-container *nzStringTemplateOutlet=\"suffixIcon; let suffixIcon\">\n          <i nz-icon [nzType]=\"suffixIcon\"></i>\n        </ng-container>\n      </span>\n    </ng-template>\n\n    <!-- Overlay -->\n    <ng-template\n      cdkConnectedOverlay\n      nzConnectedOverlay\n      [cdkConnectedOverlayOrigin]=\"origin\"\n      [cdkConnectedOverlayOpen]=\"realOpenState\"\n      [cdkConnectedOverlayHasBackdrop]=\"!isOpenHandledByUser()\"\n      [cdkConnectedOverlayPositions]=\"overlayPositions\"\n      [cdkConnectedOverlayTransformOriginOn]=\"'.ant-picker-wrapper'\"\n      (positionChange)=\"onPositionChange($event)\"\n      (backdropClick)=\"onClickBackdrop()\"\n      (detach)=\"onOverlayDetach()\"\n      (overlayKeydown)=\"onOverlayKeydown($event)\"\n    >\n      <div\n        class=\"ant-picker-wrapper\"\n        [nzNoAnimation]=\"noAnimation\"\n        [@slideMotion]=\"'enter'\"\n        (@slideMotion.done)=\"animationDone()\"\n        style=\"position: relative;\"\n      >\n        <div\n          class=\"{{ prefixCls }}-dropdown {{ dropdownClassName }}\"\n          [class.ant-picker-dropdown-placement-bottomLeft]=\"currentPositionY === 'bottom' && currentPositionX === 'start'\"\n          [class.ant-picker-dropdown-placement-topLeft]=\"currentPositionY === 'top' && currentPositionX === 'start'\"\n          [class.ant-picker-dropdown-placement-bottomRight]=\"currentPositionY === 'bottom' && currentPositionX === 'end'\"\n          [class.ant-picker-dropdown-placement-topRight]=\"currentPositionY === 'top' && currentPositionX === 'end'\"\n          [class.ant-picker-dropdown-range]=\"isRange\"\n          [ngStyle]=\"popupStyle\"\n        >\n          <!-- Compatible for overlay that not support offset dynamically and immediately -->\n          <ng-content></ng-content>\n        </div>\n      </div>\n    </ng-template>\n  ",
                    animations: [slideMotion],
                    changeDetection: ChangeDetectionStrategy.OnPush
                }] }
    ];
    /** @nocollapse */
    NzPickerComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: DateHelperService },
        { type: ChangeDetectorRef },
        { type: DatePickerService },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
    ]; };
    NzPickerComponent.propDecorators = {
        noAnimation: [{ type: Input }],
        isRange: [{ type: Input }],
        open: [{ type: Input }],
        disabled: [{ type: Input }],
        inputReadOnly: [{ type: Input }],
        placeholder: [{ type: Input }],
        allowClear: [{ type: Input }],
        autoFocus: [{ type: Input }],
        format: [{ type: Input }],
        separator: [{ type: Input }],
        popupStyle: [{ type: Input }],
        dropdownClassName: [{ type: Input }],
        suffixIcon: [{ type: Input }],
        focusChange: [{ type: Output }],
        valueChange: [{ type: Output }],
        openChange: [{ type: Output }],
        cdkConnectedOverlay: [{ type: ViewChild, args: [CdkConnectedOverlay, { static: false },] }],
        separatorElement: [{ type: ViewChild, args: ['separatorElement', { static: false },] }],
        pickerInput: [{ type: ViewChild, args: ['pickerInput', { static: false },] }],
        rangePickerInputs: [{ type: ViewChildren, args: ['rangePickerInput',] }],
        panel: [{ type: ContentChild, args: [DateRangePopupComponent,] }]
    };
    return NzPickerComponent;
}());
if (false) {
    /** @type {?} */
    NzPickerComponent.prototype.noAnimation;
    /** @type {?} */
    NzPickerComponent.prototype.isRange;
    /** @type {?} */
    NzPickerComponent.prototype.open;
    /** @type {?} */
    NzPickerComponent.prototype.disabled;
    /** @type {?} */
    NzPickerComponent.prototype.inputReadOnly;
    /** @type {?} */
    NzPickerComponent.prototype.placeholder;
    /** @type {?} */
    NzPickerComponent.prototype.allowClear;
    /** @type {?} */
    NzPickerComponent.prototype.autoFocus;
    /** @type {?} */
    NzPickerComponent.prototype.format;
    /** @type {?} */
    NzPickerComponent.prototype.separator;
    /** @type {?} */
    NzPickerComponent.prototype.popupStyle;
    /** @type {?} */
    NzPickerComponent.prototype.dropdownClassName;
    /** @type {?} */
    NzPickerComponent.prototype.suffixIcon;
    /** @type {?} */
    NzPickerComponent.prototype.focusChange;
    /** @type {?} */
    NzPickerComponent.prototype.valueChange;
    /** @type {?} */
    NzPickerComponent.prototype.openChange;
    /** @type {?} */
    NzPickerComponent.prototype.cdkConnectedOverlay;
    /** @type {?} */
    NzPickerComponent.prototype.separatorElement;
    /** @type {?} */
    NzPickerComponent.prototype.pickerInput;
    /** @type {?} */
    NzPickerComponent.prototype.rangePickerInputs;
    /** @type {?} */
    NzPickerComponent.prototype.panel;
    /** @type {?} */
    NzPickerComponent.prototype.origin;
    /** @type {?} */
    NzPickerComponent.prototype.document;
    /** @type {?} */
    NzPickerComponent.prototype.inputSize;
    /** @type {?} */
    NzPickerComponent.prototype.inputWidth;
    /** @type {?} */
    NzPickerComponent.prototype.arrowLeft;
    /** @type {?} */
    NzPickerComponent.prototype.destroy$;
    /** @type {?} */
    NzPickerComponent.prototype.prefixCls;
    /** @type {?} */
    NzPickerComponent.prototype.inputValue;
    /** @type {?} */
    NzPickerComponent.prototype.activeBarStyle;
    /** @type {?} */
    NzPickerComponent.prototype.animationOpenState;
    /** @type {?} */
    NzPickerComponent.prototype.overlayOpen;
    /** @type {?} */
    NzPickerComponent.prototype.overlayPositions;
    /** @type {?} */
    NzPickerComponent.prototype.currentPositionX;
    /** @type {?} */
    NzPickerComponent.prototype.currentPositionY;
    /**
     * @type {?}
     * @private
     */
    NzPickerComponent.prototype.elementRef;
    /**
     * @type {?}
     * @private
     */
    NzPickerComponent.prototype.dateHelper;
    /**
     * @type {?}
     * @private
     */
    NzPickerComponent.prototype.changeDetector;
    /** @type {?} */
    NzPickerComponent.prototype.datePickerService;
}

/**
 * @fileoverview added by tsickle
 * Generated from: date-picker.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var POPUP_STYLE_PATCH = { position: 'relative' };
// Aim to override antd's style to support overlay's position strategy (position:absolute will cause it not working beacuse the overlay can't get the height/width of it's content)
/** @type {?} */
var NZ_CONFIG_COMPONENT_NAME = 'datePicker';
/**
 * The base picker for all common APIs
 */
var NzDatePickerComponent = /** @class */ (function () {
    function NzDatePickerComponent(nzConfigService, datePickerService, i18n, cdr, renderer, elementRef, dateHelper, noAnimation) {
        this.nzConfigService = nzConfigService;
        this.datePickerService = datePickerService;
        this.i18n = i18n;
        this.cdr = cdr;
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.dateHelper = dateHelper;
        this.noAnimation = noAnimation;
        this.isRange = false; // Indicate whether the value is a range value
        // Indicate whether the value is a range value
        this.showWeek = false; // Should show as week picker
        // Should show as week picker
        this.focused = false;
        this.destroyed$ = new Subject();
        this.isCustomPlaceHolder = false;
        this.showTime = false;
        // --- Common API
        this.nzAllowClear = true;
        this.nzAutoFocus = false;
        this.nzDisabled = false;
        this.nzInputReadOnly = false;
        /**
         * @deprecated 10.0.0. This is deprecated and going to be removed in 10.0.0.
         */
        this.nzClassName = '';
        this.nzPlaceHolder = '';
        this.nzPopupStyle = POPUP_STYLE_PATCH;
        this.nzSize = 'default';
        /**
         * @deprecated 10.0.0. This is deprecated and going to be removed in 10.0.0.
         */
        this.nzStyle = null;
        this.nzShowToday = true;
        this.nzMode = 'date';
        this.nzDefaultPickerValue = null;
        this.nzSeparator = undefined;
        this.nzSuffixIcon = 'calendar';
        // TODO(@wenqi73) The PanelMode need named for each pickers and export
        this.nzOnPanelChange = new EventEmitter();
        this.nzOnCalendarChange = new EventEmitter();
        this.nzOnOk = new EventEmitter();
        this.nzOnOpenChange = new EventEmitter();
        // ------------------------------------------------------------------------
        // | Control value accessor implements
        // ------------------------------------------------------------------------
        // NOTE: onChangeFn/onTouchedFn will not be assigned if user not use as ngModel
        this.onChangeFn = (/**
         * @return {?}
         */
        function () { return void 0; });
        this.onTouchedFn = (/**
         * @return {?}
         */
        function () { return void 0; });
    }
    Object.defineProperty(NzDatePickerComponent.prototype, "nzShowTime", {
        get: /**
         * @return {?}
         */
        function () {
            return this.showTime;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.showTime = typeof value === 'object' ? value : toBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzDatePickerComponent.prototype, "realOpenState", {
        get: /**
         * @return {?}
         */
        function () {
            return this.picker.animationOpenState;
        } // Use picker's real open state to let re-render the picker's content when shown up
        ,
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NzDatePickerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // Subscribe the every locale change if the nzLocale is not handled by user
        if (!this.nzLocale) {
            this.i18n.localeChange.pipe(takeUntil(this.destroyed$)).subscribe((/**
             * @return {?}
             */
            function () { return _this.setLocale(); }));
        }
        // Default value
        this.datePickerService.isRange = this.isRange;
        this.datePickerService.initValue();
        this.datePickerService.emitValue$.pipe(takeUntil(this.destroyed$)).subscribe((/**
         * @param {?} _
         * @return {?}
         */
        function (_) {
            /** @type {?} */
            var value = _this.datePickerService.value;
            _this.datePickerService.initialValue = cloneDate(value);
            if (_this.isRange) {
                /** @type {?} */
                var vAsRange = (/** @type {?} */ (value));
                if (vAsRange.length) {
                    _this.onChangeFn([vAsRange[0].nativeDate, vAsRange[1].nativeDate]);
                }
                else {
                    _this.onChangeFn([]);
                }
            }
            else {
                if (value) {
                    _this.onChangeFn(((/** @type {?} */ (value))).nativeDate);
                }
                else {
                    _this.onChangeFn(null);
                }
            }
            _this.onTouchedFn();
            // When value emitted, overlay will be closed
            _this.picker.hideOverlay();
        }));
        // Default format when it's empty
        if (!this.nzFormat) {
            if (this.showWeek) {
                this.nzFormat = 'yyyy-ww'; // Format for week
            }
            else {
                this.nzFormat = this.nzShowTime ? 'yyyy-MM-dd HH:mm:ss' : 'yyyy-MM-dd';
            }
        }
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    NzDatePickerComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.nzPopupStyle) {
            // Always assign the popup style patch
            this.nzPopupStyle = this.nzPopupStyle ? __assign(__assign({}, this.nzPopupStyle), POPUP_STYLE_PATCH) : POPUP_STYLE_PATCH;
        }
        // Mark as customized placeholder by user once nzPlaceHolder assigned at the first time
        if (changes.nzPlaceHolder && changes.nzPlaceHolder.firstChange && typeof this.nzPlaceHolder !== 'undefined') {
            this.isCustomPlaceHolder = true;
        }
        if (changes.nzLocale) {
            // The nzLocale is currently handled by user
            this.setDefaultPlaceHolder();
        }
        if (changes.nzRenderExtraFooter) {
            this.extraFooter = valueFunctionProp((/** @type {?} */ (this.nzRenderExtraFooter)));
        }
        if (changes.nzStyle) {
            warnDeprecation("'nzStyle' in DatePicker is going to be removed in 10.0.0. Please use CSS style attribute like <nz-date-picker style=\"...\"></nz-date-picker> instead.");
        }
        if (changes.nzClassName) {
            warnDeprecation("'nzClassName' in DatePicker is going to be removed in 10.0.0. Please use CSS class attribute like <nz-date-picker class=\"...\"></nz-date-picker> instead.");
        }
        if (changes.nzMode) {
            this.setPanelMode();
        }
    };
    /**
     * @return {?}
     */
    NzDatePickerComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.destroyed$.next();
        this.destroyed$.complete();
    };
    /**
     * @return {?}
     */
    NzDatePickerComponent.prototype.setPanelMode = /**
     * @return {?}
     */
    function () {
        if (!this.nzMode) {
            this.nzMode = this.isRange ? ['date', 'date'] : 'date';
        }
    };
    /**
     * Triggered when overlayOpen changes (different with realOpenState)
     * @param open The overlayOpen in picker component
     */
    /**
     * Triggered when overlayOpen changes (different with realOpenState)
     * @param {?} open The overlayOpen in picker component
     * @return {?}
     */
    NzDatePickerComponent.prototype.onOpenChange = /**
     * Triggered when overlayOpen changes (different with realOpenState)
     * @param {?} open The overlayOpen in picker component
     * @return {?}
     */
    function (open) {
        this.nzOnOpenChange.emit(open);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    NzDatePickerComponent.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.setValue(value);
        this.cdr.markForCheck();
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    NzDatePickerComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChangeFn = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    NzDatePickerComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouchedFn = fn;
    };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    NzDatePickerComponent.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.nzDisabled = isDisabled;
        this.cdr.markForCheck();
    };
    // ------------------------------------------------------------------------
    // | Internal methods
    // ------------------------------------------------------------------------
    // Reload locale from i18n with side effects
    // ------------------------------------------------------------------------
    // | Internal methods
    // ------------------------------------------------------------------------
    // Reload locale from i18n with side effects
    /**
     * @private
     * @return {?}
     */
    NzDatePickerComponent.prototype.setLocale = 
    // ------------------------------------------------------------------------
    // | Internal methods
    // ------------------------------------------------------------------------
    // Reload locale from i18n with side effects
    /**
     * @private
     * @return {?}
     */
    function () {
        this.nzLocale = this.i18n.getLocaleData('DatePicker', {});
        this.setDefaultPlaceHolder();
        this.cdr.markForCheck();
    };
    /**
     * @private
     * @return {?}
     */
    NzDatePickerComponent.prototype.setDefaultPlaceHolder = /**
     * @private
     * @return {?}
     */
    function () {
        if (!this.isCustomPlaceHolder && this.nzLocale) {
            this.nzPlaceHolder = this.isRange ? ((/** @type {?} */ (this.nzLocale.lang.rangePlaceholder))) : (/** @type {?} */ (this.nzLocale.lang.placeholder));
        }
    };
    // Safe way of setting value with default
    // Safe way of setting value with default
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    NzDatePickerComponent.prototype.setValue = 
    // Safe way of setting value with default
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        /** @type {?} */
        var newValue = this.datePickerService.makeValue(value);
        this.datePickerService.setValue(newValue);
        this.datePickerService.initialValue = newValue;
    };
    Object.defineProperty(NzDatePickerComponent.prototype, "realShowToday", {
        get: /**
         * @return {?}
         */
        function () {
            // Range only support in single date picker
            return this.nzMode === 'date' && this.nzShowToday;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} value
     * @return {?}
     */
    NzDatePickerComponent.prototype.onFocusChange = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.focused = value;
        // TODO: avoid autoFocus cause change after checked error
        if (this.focused) {
            this.renderer.addClass(this.elementRef.nativeElement, 'ant-picker-focused');
        }
        else {
            this.renderer.removeClass(this.elementRef.nativeElement, 'ant-picker-focused');
        }
    };
    /**
     * @param {?} panelMode
     * @return {?}
     */
    NzDatePickerComponent.prototype.onPanelModeChange = /**
     * @param {?} panelMode
     * @return {?}
     */
    function (panelMode) {
        // this.nzMode = panelMode;
        this.nzOnPanelChange.emit(panelMode);
    };
    // Emit nzOnCalendarChange when select date by nz-range-picker
    // Emit nzOnCalendarChange when select date by nz-range-picker
    /**
     * @param {?} value
     * @return {?}
     */
    NzDatePickerComponent.prototype.onCalendarChange = 
    // Emit nzOnCalendarChange when select date by nz-range-picker
    /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (this.isRange && Array.isArray(value)) {
            /** @type {?} */
            var rangeValue = value.filter((/**
             * @param {?} x
             * @return {?}
             */
            function (x) { return x instanceof CandyDate; })).map((/**
             * @param {?} x
             * @return {?}
             */
            function (x) { return (/** @type {?} */ (x)).nativeDate; }));
            this.nzOnCalendarChange.emit(rangeValue);
        }
    };
    // Emitted when done with date selecting
    // Emitted when done with date selecting
    /**
     * @return {?}
     */
    NzDatePickerComponent.prototype.onResultOk = 
    // Emitted when done with date selecting
    /**
     * @return {?}
     */
    function () {
        if (this.isRange) {
            /** @type {?} */
            var value = (/** @type {?} */ (this.datePickerService.value));
            if (value.length) {
                this.nzOnOk.emit([value[0].nativeDate, value[1].nativeDate]);
            }
            else {
                this.nzOnOk.emit([]);
            }
        }
        else {
            if (this.datePickerService.value) {
                this.nzOnOk.emit(((/** @type {?} */ (this.datePickerService.value))).nativeDate);
            }
            else {
                this.nzOnOk.emit(null);
            }
        }
        this.datePickerService.emitValue$.next();
    };
    NzDatePickerComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'nz-date-picker,nz-week-picker,nz-month-picker,nz-year-picker,nz-range-picker',
                    exportAs: 'nzDatePicker',
                    template: "\n    <div\n      nz-picker\n      [isRange]=\"isRange\"\n      [open]=\"nzOpen\"\n      [separator]=\"nzSeparator\"\n      [disabled]=\"nzDisabled\"\n      [inputReadOnly]=\"nzInputReadOnly\"\n      [format]=\"nzFormat\"\n      [allowClear]=\"nzAllowClear\"\n      [autoFocus]=\"nzAutoFocus\"\n      [placeholder]=\"nzPlaceHolder\"\n      [ngClass]=\"nzClassName\"\n      style=\"display: inherit; align-items: center; width: 100%;\"\n      [ngStyle]=\"nzStyle\"\n      [dropdownClassName]=\"nzDropdownClassName\"\n      [popupStyle]=\"nzPopupStyle\"\n      [noAnimation]=\"!!noAnimation?.nzNoAnimation\"\n      [suffixIcon]=\"nzSuffixIcon\"\n      (openChange)=\"onOpenChange($event)\"\n      (focusChange)=\"onFocusChange($event)\"\n    >\n      <date-range-popup\n        *ngIf=\"realOpenState\"\n        [isRange]=\"isRange\"\n        [defaultPickerValue]=\"nzDefaultPickerValue\"\n        [showWeek]=\"showWeek\"\n        [panelMode]=\"nzMode\"\n        (panelModeChange)=\"onPanelModeChange($event)\"\n        (calendarChange)=\"onCalendarChange($event)\"\n        [locale]=\"nzLocale?.lang!\"\n        [showToday]=\"realShowToday\"\n        [showTime]=\"nzShowTime\"\n        [format]=\"nzFormat\"\n        [dateRender]=\"nzDateRender\"\n        [disabledDate]=\"nzDisabledDate\"\n        [disabledTime]=\"nzDisabledTime\"\n        [placeholder]=\"nzPlaceHolder\"\n        [extraFooter]=\"extraFooter\"\n        [ranges]=\"nzRanges\"\n        (resultOk)=\"onResultOk()\"\n      ></date-range-popup>\n    </div>\n  ",
                    host: {
                        '[class.ant-picker]': "true",
                        '[class.ant-picker-range]': "isRange",
                        '[class.ant-picker-large]': "nzSize === 'large'",
                        '[class.ant-picker-small]': "nzSize === 'small'",
                        '[class.ant-picker-disabled]': "nzDisabled",
                        '(click)': 'picker.onClickInputBox($event)'
                    },
                    providers: [
                        DatePickerService,
                        {
                            provide: NG_VALUE_ACCESSOR,
                            multi: true,
                            useExisting: forwardRef((/**
                             * @return {?}
                             */
                            function () { return NzDatePickerComponent; }))
                        }
                    ]
                }] }
    ];
    /** @nocollapse */
    NzDatePickerComponent.ctorParameters = function () { return [
        { type: NzConfigService },
        { type: DatePickerService },
        { type: NzI18nService },
        { type: ChangeDetectorRef },
        { type: Renderer2 },
        { type: ElementRef },
        { type: DateHelperService },
        { type: NzNoAnimationDirective, decorators: [{ type: Host }, { type: Optional }] }
    ]; };
    NzDatePickerComponent.propDecorators = {
        nzAllowClear: [{ type: Input }],
        nzAutoFocus: [{ type: Input }],
        nzDisabled: [{ type: Input }],
        nzInputReadOnly: [{ type: Input }],
        nzOpen: [{ type: Input }],
        nzClassName: [{ type: Input }],
        nzDisabledDate: [{ type: Input }],
        nzLocale: [{ type: Input }],
        nzPlaceHolder: [{ type: Input }],
        nzPopupStyle: [{ type: Input }],
        nzDropdownClassName: [{ type: Input }],
        nzSize: [{ type: Input }],
        nzStyle: [{ type: Input }],
        nzFormat: [{ type: Input }],
        nzDateRender: [{ type: Input }],
        nzDisabledTime: [{ type: Input }],
        nzRenderExtraFooter: [{ type: Input }],
        nzShowToday: [{ type: Input }],
        nzMode: [{ type: Input }],
        nzRanges: [{ type: Input }],
        nzDefaultPickerValue: [{ type: Input }],
        nzSeparator: [{ type: Input }],
        nzSuffixIcon: [{ type: Input }],
        nzOnPanelChange: [{ type: Output }],
        nzOnCalendarChange: [{ type: Output }],
        nzOnOk: [{ type: Output }],
        nzOnOpenChange: [{ type: Output }],
        picker: [{ type: ViewChild, args: [NzPickerComponent, { static: true },] }],
        nzShowTime: [{ type: Input }]
    };
    __decorate([
        InputBoolean(),
        __metadata("design:type", Boolean)
    ], NzDatePickerComponent.prototype, "nzAllowClear", void 0);
    __decorate([
        InputBoolean(),
        __metadata("design:type", Boolean)
    ], NzDatePickerComponent.prototype, "nzAutoFocus", void 0);
    __decorate([
        InputBoolean(),
        __metadata("design:type", Boolean)
    ], NzDatePickerComponent.prototype, "nzDisabled", void 0);
    __decorate([
        InputBoolean(),
        __metadata("design:type", Boolean)
    ], NzDatePickerComponent.prototype, "nzInputReadOnly", void 0);
    __decorate([
        InputBoolean(),
        __metadata("design:type", Boolean)
    ], NzDatePickerComponent.prototype, "nzOpen", void 0);
    __decorate([
        InputBoolean(),
        __metadata("design:type", Boolean)
    ], NzDatePickerComponent.prototype, "nzShowToday", void 0);
    __decorate([
        WithConfig(NZ_CONFIG_COMPONENT_NAME),
        __metadata("design:type", String)
    ], NzDatePickerComponent.prototype, "nzSeparator", void 0);
    __decorate([
        WithConfig(NZ_CONFIG_COMPONENT_NAME),
        __metadata("design:type", Object)
    ], NzDatePickerComponent.prototype, "nzSuffixIcon", void 0);
    return NzDatePickerComponent;
}());
if (false) {
    /** @type {?} */
    NzDatePickerComponent.ngAcceptInputType_nzAllowClear;
    /** @type {?} */
    NzDatePickerComponent.ngAcceptInputType_nzAutoFocus;
    /** @type {?} */
    NzDatePickerComponent.ngAcceptInputType_nzDisabled;
    /** @type {?} */
    NzDatePickerComponent.ngAcceptInputType_nzInputReadOnly;
    /** @type {?} */
    NzDatePickerComponent.ngAcceptInputType_nzOpen;
    /** @type {?} */
    NzDatePickerComponent.ngAcceptInputType_nzShowToday;
    /** @type {?} */
    NzDatePickerComponent.ngAcceptInputType_nzMode;
    /** @type {?} */
    NzDatePickerComponent.ngAcceptInputType_nzShowTime;
    /** @type {?} */
    NzDatePickerComponent.prototype.isRange;
    /** @type {?} */
    NzDatePickerComponent.prototype.showWeek;
    /** @type {?} */
    NzDatePickerComponent.prototype.focused;
    /** @type {?} */
    NzDatePickerComponent.prototype.extraFooter;
    /**
     * @type {?}
     * @protected
     */
    NzDatePickerComponent.prototype.destroyed$;
    /**
     * @type {?}
     * @protected
     */
    NzDatePickerComponent.prototype.isCustomPlaceHolder;
    /**
     * @type {?}
     * @private
     */
    NzDatePickerComponent.prototype.showTime;
    /** @type {?} */
    NzDatePickerComponent.prototype.nzAllowClear;
    /** @type {?} */
    NzDatePickerComponent.prototype.nzAutoFocus;
    /** @type {?} */
    NzDatePickerComponent.prototype.nzDisabled;
    /** @type {?} */
    NzDatePickerComponent.prototype.nzInputReadOnly;
    /** @type {?} */
    NzDatePickerComponent.prototype.nzOpen;
    /**
     * @deprecated 10.0.0. This is deprecated and going to be removed in 10.0.0.
     * @type {?}
     */
    NzDatePickerComponent.prototype.nzClassName;
    /** @type {?} */
    NzDatePickerComponent.prototype.nzDisabledDate;
    /** @type {?} */
    NzDatePickerComponent.prototype.nzLocale;
    /** @type {?} */
    NzDatePickerComponent.prototype.nzPlaceHolder;
    /** @type {?} */
    NzDatePickerComponent.prototype.nzPopupStyle;
    /** @type {?} */
    NzDatePickerComponent.prototype.nzDropdownClassName;
    /** @type {?} */
    NzDatePickerComponent.prototype.nzSize;
    /**
     * @deprecated 10.0.0. This is deprecated and going to be removed in 10.0.0.
     * @type {?}
     */
    NzDatePickerComponent.prototype.nzStyle;
    /** @type {?} */
    NzDatePickerComponent.prototype.nzFormat;
    /** @type {?} */
    NzDatePickerComponent.prototype.nzDateRender;
    /** @type {?} */
    NzDatePickerComponent.prototype.nzDisabledTime;
    /** @type {?} */
    NzDatePickerComponent.prototype.nzRenderExtraFooter;
    /** @type {?} */
    NzDatePickerComponent.prototype.nzShowToday;
    /** @type {?} */
    NzDatePickerComponent.prototype.nzMode;
    /** @type {?} */
    NzDatePickerComponent.prototype.nzRanges;
    /** @type {?} */
    NzDatePickerComponent.prototype.nzDefaultPickerValue;
    /** @type {?} */
    NzDatePickerComponent.prototype.nzSeparator;
    /** @type {?} */
    NzDatePickerComponent.prototype.nzSuffixIcon;
    /** @type {?} */
    NzDatePickerComponent.prototype.nzOnPanelChange;
    /** @type {?} */
    NzDatePickerComponent.prototype.nzOnCalendarChange;
    /** @type {?} */
    NzDatePickerComponent.prototype.nzOnOk;
    /** @type {?} */
    NzDatePickerComponent.prototype.nzOnOpenChange;
    /** @type {?} */
    NzDatePickerComponent.prototype.picker;
    /** @type {?} */
    NzDatePickerComponent.prototype.onChangeFn;
    /** @type {?} */
    NzDatePickerComponent.prototype.onTouchedFn;
    /** @type {?} */
    NzDatePickerComponent.prototype.nzConfigService;
    /** @type {?} */
    NzDatePickerComponent.prototype.datePickerService;
    /**
     * @type {?}
     * @protected
     */
    NzDatePickerComponent.prototype.i18n;
    /**
     * @type {?}
     * @protected
     */
    NzDatePickerComponent.prototype.cdr;
    /**
     * @type {?}
     * @private
     */
    NzDatePickerComponent.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    NzDatePickerComponent.prototype.elementRef;
    /**
     * @type {?}
     * @protected
     */
    NzDatePickerComponent.prototype.dateHelper;
    /** @type {?} */
    NzDatePickerComponent.prototype.noAnimation;
}

/**
 * @fileoverview added by tsickle
 * Generated from: inner-popup.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var InnerPopupComponent = /** @class */ (function () {
    function InnerPopupComponent() {
        this.panelModeChange = new EventEmitter();
        // TODO: name is not proper
        this.headerChange = new EventEmitter(); // Emitted when user changed the header's value
        // Emitted when user changed the header's value
        this.selectDate = new EventEmitter(); // Emitted when the date is selected by click the date panel
        // Emitted when the date is selected by click the date panel
        this.selectTime = new EventEmitter();
        this.dayHover = new EventEmitter(); // Emitted when hover on a day by mouse enter
        // Emitted when hover on a day by mouse enter
        this.prefixCls = PREFIX_CLASS;
    }
    /**
     * Hide "next" arrow in left panel,
     * hide "prev" arrow in right panel
     * @param direction
     * @param panelMode
     */
    /**
     * Hide "next" arrow in left panel,
     * hide "prev" arrow in right panel
     * @param {?} direction
     * @param {?} panelMode
     * @return {?}
     */
    InnerPopupComponent.prototype.enablePrevNext = /**
     * Hide "next" arrow in left panel,
     * hide "prev" arrow in right panel
     * @param {?} direction
     * @param {?} panelMode
     * @return {?}
     */
    function (direction, panelMode) {
        if (!this.showTimePicker &&
            panelMode === this.endPanelMode &&
            ((this.partType === 'left' && direction === 'next') || (this.partType === 'right' && direction === 'prev'))) {
            return false;
        }
        return true;
    };
    /**
     * @param {?} date
     * @return {?}
     */
    InnerPopupComponent.prototype.onSelectTime = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        this.selectTime.emit(new CandyDate(date));
    };
    // The value real changed to outside
    // The value real changed to outside
    /**
     * @param {?} date
     * @return {?}
     */
    InnerPopupComponent.prototype.onSelectDate = 
    // The value real changed to outside
    /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        /** @type {?} */
        var value = date instanceof CandyDate ? date : new CandyDate(date);
        /** @type {?} */
        var timeValue = this.timeOptions && this.timeOptions.nzDefaultOpenValue;
        // Display timeValue when value is null
        if (!this.value && timeValue) {
            value.setHms(timeValue.getHours(), timeValue.getMinutes(), timeValue.getSeconds());
        }
        this.selectDate.emit(value);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    InnerPopupComponent.prototype.onChooseMonth = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.activeDate = this.activeDate.setMonth(value.getMonth());
        if (this.endPanelMode === 'month') {
            this.value = value;
            this.selectDate.emit(value);
        }
        else {
            this.headerChange.emit(value);
            this.panelModeChange.emit(this.endPanelMode);
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    InnerPopupComponent.prototype.onChooseYear = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.activeDate = this.activeDate.setYear(value.getYear());
        if (this.endPanelMode === 'year') {
            this.value = value;
            this.selectDate.emit(value);
        }
        else {
            this.headerChange.emit(value);
            this.panelModeChange.emit(this.endPanelMode);
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    InnerPopupComponent.prototype.onChooseDecade = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.activeDate = this.activeDate.setYear(value.getYear());
        if (this.endPanelMode === 'decade') {
            this.value = value;
            this.selectDate.emit(value);
        }
        else {
            this.headerChange.emit(value);
            this.panelModeChange.emit('year');
        }
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    InnerPopupComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.activeDate && !changes.activeDate.currentValue) {
            this.activeDate = new CandyDate();
        }
        // New Antd vesion has merged 'date' ant 'time' to one panel,
        // So there is not 'time' panel
        if (changes.panelMode && changes.panelMode.currentValue === 'time') {
            this.panelMode = 'date';
        }
    };
    InnerPopupComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    // tslint:disable-next-line:component-selector
                    selector: 'inner-popup',
                    exportAs: 'innerPopup',
                    template: "\n    <div [class.ant-picker-datetime-panel]=\"showTimePicker\">\n      <div class=\"{{ prefixCls }}-{{ panelMode }}-panel\">\n        <ng-container [ngSwitch]=\"panelMode\">\n          <ng-container *ngSwitchCase=\"'decade'\">\n            <decade-header\n              [(value)]=\"activeDate\"\n              [locale]=\"locale!\"\n              [showSuperPreBtn]=\"enablePrevNext('prev', 'decade')\"\n              [showSuperNextBtn]=\"enablePrevNext('next', 'decade')\"\n              [showNextBtn]=\"false\"\n              [showPreBtn]=\"false\"\n              (panelModeChange)=\"panelModeChange.emit($event)\"\n              (valueChange)=\"headerChange.emit($event)\"\n            >\n            </decade-header>\n            <div class=\"{{ prefixCls }}-body\">\n              <decade-table\n                [showWeek]=\"showWeek\"\n                [activeDate]=\"activeDate\"\n                [value]=\"value\"\n                (valueChange)=\"onChooseDecade($event)\"\n                [disabledDate]=\"disabledDate\"\n              ></decade-table>\n            </div>\n          </ng-container>\n          <ng-container *ngSwitchCase=\"'year'\">\n            <year-header\n              [(value)]=\"activeDate\"\n              [locale]=\"locale!\"\n              [showSuperPreBtn]=\"enablePrevNext('prev', 'year')\"\n              [showSuperNextBtn]=\"enablePrevNext('next', 'year')\"\n              [showNextBtn]=\"false\"\n              [showPreBtn]=\"false\"\n              (panelModeChange)=\"panelModeChange.emit($event)\"\n              (valueChange)=\"headerChange.emit($event)\"\n            >\n            </year-header>\n            <div class=\"{{ prefixCls }}-body\">\n              <year-table\n                [showWeek]=\"showWeek\"\n                [activeDate]=\"activeDate\"\n                [value]=\"value\"\n                (valueChange)=\"onChooseYear($event)\"\n                [disabledDate]=\"disabledDate\"\n              ></year-table>\n            </div>\n          </ng-container>\n          <ng-container *ngSwitchCase=\"'month'\">\n            <month-header\n              [(value)]=\"activeDate\"\n              [locale]=\"locale!\"\n              [showNextBtn]=\"false\"\n              [showPreBtn]=\"false\"\n              (panelModeChange)=\"panelModeChange.emit($event)\"\n              (valueChange)=\"headerChange.emit($event)\"\n            >\n            </month-header>\n            <div class=\"{{ prefixCls }}-body\">\n              <month-table\n                [showWeek]=\"showWeek\"\n                [value]=\"value\"\n                [activeDate]=\"activeDate\"\n                [disabledDate]=\"disabledDate\"\n                (valueChange)=\"onChooseMonth($event)\"\n              ></month-table>\n            </div>\n          </ng-container>\n\n          <ng-container *ngSwitchDefault>\n            <date-header\n              [(value)]=\"activeDate\"\n              [locale]=\"locale!\"\n              [showSuperPreBtn]=\"enablePrevNext('prev', 'date')\"\n              [showSuperNextBtn]=\"enablePrevNext('next', 'date')\"\n              [showPreBtn]=\"enablePrevNext('prev', 'date')\"\n              [showNextBtn]=\"enablePrevNext('next', 'date')\"\n              (panelModeChange)=\"panelModeChange.emit($event)\"\n              (valueChange)=\"headerChange.emit($event)\"\n            >\n            </date-header>\n            <div class=\"{{ prefixCls }}-body\">\n              <date-table\n                [locale]=\"locale!\"\n                [showWeek]=\"showWeek\"\n                [value]=\"value\"\n                [activeDate]=\"activeDate\"\n                (valueChange)=\"onSelectDate($event)\"\n                [disabledDate]=\"disabledDate\"\n                [cellRender]=\"dateRender\"\n                [selectedValue]=\"selectedValue\"\n                [hoverValue]=\"hoverValue\"\n                (dayHover)=\"dayHover.emit($event)\"\n              ></date-table>\n            </div>\n          </ng-container>\n        </ng-container>\n      </div>\n      <ng-container *ngIf=\"showTimePicker && timeOptions\">\n        <nz-time-picker-panel\n          [nzInDatePicker]=\"true\"\n          [ngModel]=\"value?.nativeDate\"\n          (ngModelChange)=\"onSelectTime($event)\"\n          [format]=\"$any(timeOptions.nzFormat)\"\n          [nzHourStep]=\"$any(timeOptions.nzHourStep)\"\n          [nzMinuteStep]=\"$any(timeOptions.nzMinuteStep)\"\n          [nzSecondStep]=\"$any(timeOptions.nzSecondStep)\"\n          [nzDisabledHours]=\"$any(timeOptions.nzDisabledHours)\"\n          [nzDisabledMinutes]=\"$any(timeOptions.nzDisabledMinutes)\"\n          [nzDisabledSeconds]=\"$any(timeOptions.nzDisabledSeconds)\"\n          [nzHideDisabledOptions]=\"!!timeOptions.nzHideDisabledOptions\"\n          [nzDefaultOpenValue]=\"$any(timeOptions.nzDefaultOpenValue)\"\n          [nzUse12Hours]=\"!!timeOptions.nzUse12Hours\"\n          [nzAddOn]=\"$any(timeOptions.nzAddOn)\"\n        ></nz-time-picker-panel>\n        <!-- use [opened] to trigger time panel `initPosition()` -->\n      </ng-container>\n    </div>\n  "
                }] }
    ];
    InnerPopupComponent.propDecorators = {
        activeDate: [{ type: Input }],
        endPanelMode: [{ type: Input }],
        panelMode: [{ type: Input }],
        showWeek: [{ type: Input }],
        locale: [{ type: Input }],
        showTimePicker: [{ type: Input }],
        timeOptions: [{ type: Input }],
        disabledDate: [{ type: Input }],
        dateRender: [{ type: Input }],
        selectedValue: [{ type: Input }],
        hoverValue: [{ type: Input }],
        value: [{ type: Input }],
        partType: [{ type: Input }],
        panelModeChange: [{ type: Output }],
        headerChange: [{ type: Output }],
        selectDate: [{ type: Output }],
        selectTime: [{ type: Output }],
        dayHover: [{ type: Output }]
    };
    return InnerPopupComponent;
}());
if (false) {
    /** @type {?} */
    InnerPopupComponent.prototype.activeDate;
    /** @type {?} */
    InnerPopupComponent.prototype.endPanelMode;
    /** @type {?} */
    InnerPopupComponent.prototype.panelMode;
    /** @type {?} */
    InnerPopupComponent.prototype.showWeek;
    /** @type {?} */
    InnerPopupComponent.prototype.locale;
    /** @type {?} */
    InnerPopupComponent.prototype.showTimePicker;
    /** @type {?} */
    InnerPopupComponent.prototype.timeOptions;
    /** @type {?} */
    InnerPopupComponent.prototype.disabledDate;
    /** @type {?} */
    InnerPopupComponent.prototype.dateRender;
    /** @type {?} */
    InnerPopupComponent.prototype.selectedValue;
    /** @type {?} */
    InnerPopupComponent.prototype.hoverValue;
    /** @type {?} */
    InnerPopupComponent.prototype.value;
    /** @type {?} */
    InnerPopupComponent.prototype.partType;
    /** @type {?} */
    InnerPopupComponent.prototype.panelModeChange;
    /** @type {?} */
    InnerPopupComponent.prototype.headerChange;
    /** @type {?} */
    InnerPopupComponent.prototype.selectDate;
    /** @type {?} */
    InnerPopupComponent.prototype.selectTime;
    /** @type {?} */
    InnerPopupComponent.prototype.dayHover;
    /** @type {?} */
    InnerPopupComponent.prototype.prefixCls;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/abstract-panel-header.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
var AbstractPanelHeader = /** @class */ (function () {
    function AbstractPanelHeader() {
        this.prefixCls = "ant-picker-header";
        this.selectors = [];
        this.showSuperPreBtn = true;
        this.showSuperNextBtn = true;
        this.showPreBtn = true;
        this.showNextBtn = true;
        this.panelModeChange = new EventEmitter();
        this.valueChange = new EventEmitter();
    }
    /**
     * @return {?}
     */
    AbstractPanelHeader.prototype.superPreviousTitle = /**
     * @return {?}
     */
    function () {
        return this.locale.previousYear;
    };
    /**
     * @return {?}
     */
    AbstractPanelHeader.prototype.previousTitle = /**
     * @return {?}
     */
    function () {
        return this.locale.previousMonth;
    };
    /**
     * @return {?}
     */
    AbstractPanelHeader.prototype.superNextTitle = /**
     * @return {?}
     */
    function () {
        return this.locale.nextYear;
    };
    /**
     * @return {?}
     */
    AbstractPanelHeader.prototype.nextTitle = /**
     * @return {?}
     */
    function () {
        return this.locale.nextMonth;
    };
    /**
     * @return {?}
     */
    AbstractPanelHeader.prototype.superPrevious = /**
     * @return {?}
     */
    function () {
        this.changeValue(this.value.addYears(-1));
    };
    /**
     * @return {?}
     */
    AbstractPanelHeader.prototype.superNext = /**
     * @return {?}
     */
    function () {
        this.changeValue(this.value.addYears(1));
    };
    /**
     * @return {?}
     */
    AbstractPanelHeader.prototype.previous = /**
     * @return {?}
     */
    function () {
        this.changeValue(this.value.addMonths(-1));
    };
    /**
     * @return {?}
     */
    AbstractPanelHeader.prototype.next = /**
     * @return {?}
     */
    function () {
        this.changeValue(this.value.addMonths(1));
    };
    /**
     * @param {?} value
     * @return {?}
     */
    AbstractPanelHeader.prototype.changeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (this.value !== value) {
            this.value = value;
            this.valueChange.emit(this.value);
            this.render();
        }
    };
    /**
     * @param {?} mode
     * @return {?}
     */
    AbstractPanelHeader.prototype.changeMode = /**
     * @param {?} mode
     * @return {?}
     */
    function (mode) {
        this.panelModeChange.emit(mode);
    };
    /**
     * @private
     * @return {?}
     */
    AbstractPanelHeader.prototype.render = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.value) {
            this.selectors = this.getSelectors();
        }
    };
    /**
     * @return {?}
     */
    AbstractPanelHeader.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (!this.value) {
            this.value = new CandyDate(); // Show today by default
        }
        this.selectors = this.getSelectors();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    AbstractPanelHeader.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.value || changes.locale) {
            this.render();
        }
    };
    AbstractPanelHeader.decorators = [
        { type: Directive }
    ];
    AbstractPanelHeader.propDecorators = {
        value: [{ type: Input }],
        locale: [{ type: Input }],
        showSuperPreBtn: [{ type: Input }],
        showSuperNextBtn: [{ type: Input }],
        showPreBtn: [{ type: Input }],
        showNextBtn: [{ type: Input }],
        panelModeChange: [{ type: Output }],
        valueChange: [{ type: Output }]
    };
    return AbstractPanelHeader;
}());
if (false) {
    /** @type {?} */
    AbstractPanelHeader.prototype.prefixCls;
    /** @type {?} */
    AbstractPanelHeader.prototype.selectors;
    /** @type {?} */
    AbstractPanelHeader.prototype.value;
    /** @type {?} */
    AbstractPanelHeader.prototype.locale;
    /** @type {?} */
    AbstractPanelHeader.prototype.showSuperPreBtn;
    /** @type {?} */
    AbstractPanelHeader.prototype.showSuperNextBtn;
    /** @type {?} */
    AbstractPanelHeader.prototype.showPreBtn;
    /** @type {?} */
    AbstractPanelHeader.prototype.showNextBtn;
    /** @type {?} */
    AbstractPanelHeader.prototype.panelModeChange;
    /** @type {?} */
    AbstractPanelHeader.prototype.valueChange;
    /**
     * @abstract
     * @return {?}
     */
    AbstractPanelHeader.prototype.getSelectors = function () { };
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/date-header.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DateHeaderComponent = /** @class */ (function (_super) {
    __extends(DateHeaderComponent, _super);
    function DateHeaderComponent(dateHelper) {
        var _this = _super.call(this) || this;
        _this.dateHelper = dateHelper;
        return _this;
    }
    /**
     * @return {?}
     */
    DateHeaderComponent.prototype.getSelectors = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return [
            {
                className: this.prefixCls + "-year-btn",
                title: this.locale.yearSelect,
                onClick: (/**
                 * @return {?}
                 */
                function () { return _this.changeMode('year'); }),
                label: this.dateHelper.format(this.value.nativeDate, transCompatFormat(this.locale.yearFormat))
            },
            {
                className: this.prefixCls + "-month-btn",
                title: this.locale.monthSelect,
                onClick: (/**
                 * @return {?}
                 */
                function () { return _this.changeMode('month'); }),
                label: this.dateHelper.format(this.value.nativeDate, this.locale.monthFormat || 'MMM')
            }
        ];
    };
    DateHeaderComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'date-header',
                    // tslint:disable-line:component-selector
                    exportAs: 'dateHeader',
                    template: "<div class=\"{{ prefixCls }}\">\n  <button\n    [style.visibility]=\"showSuperPreBtn ? 'visible' : 'hidden'\"\n    class=\"{{ prefixCls }}-super-prev-btn\"\n    role=\"button\"\n    tabindex=\"-1\"\n    title=\"{{ superPreviousTitle() }}\"\n    (click)=\"superPrevious()\"\n  >\n    <span class=\"ant-picker-super-prev-icon\"></span>\n  </button>\n  <button\n    [style.visibility]=\"showPreBtn ? 'visible' : 'hidden'\"\n    class=\"{{ prefixCls }}-prev-btn\"\n    role=\"button\"\n    title=\"{{ previousTitle() }}\"\n    tabindex=\"-1\"\n    (click)=\"previous()\"\n  >\n    <span class=\"ant-picker-prev-icon\"></span>\n  </button>\n\n  <div class=\"{{ prefixCls }}-view\">\n    <ng-container *ngFor=\"let selector of selectors\">\n      <button\n        class=\"{{ selector.className }}\"\n        role=\"button\"\n        type=\"button\"\n        title=\"{{ selector.title || null }}\"\n        (click)=\"selector.onClick()\"\n      >\n        {{ selector.label }}\n      </button>\n    </ng-container>\n  </div>\n  <button\n    [style.visibility]=\"showNextBtn ? 'visible' : 'hidden'\"\n    class=\"{{ prefixCls }}-next-btn\"\n    role=\"button\"\n    tabindex=\"-1\"\n    title=\"{{ nextTitle() }}\"\n    (click)=\"next()\"\n  >\n    <span class=\"ant-picker-next-icon\"></span>\n  </button>\n  <button\n    [style.visibility]=\"showSuperNextBtn ? 'visible' : 'hidden'\"\n    class=\"{{ prefixCls }}-super-next-btn\"\n    role=\"button\"\n    tabindex=\"-1\"\n    title=\"{{ superNextTitle() }}\"\n    (click)=\"superNext()\"\n  >\n    <span class=\"ant-picker-super-next-icon\"></span>\n  </button>\n</div>\n"
                }] }
    ];
    /** @nocollapse */
    DateHeaderComponent.ctorParameters = function () { return [
        { type: DateHelperService }
    ]; };
    return DateHeaderComponent;
}(AbstractPanelHeader));
if (false) {
    /**
     * @type {?}
     * @private
     */
    DateHeaderComponent.prototype.dateHelper;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/abstract-table.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
var AbstractTable = /** @class */ (function () {
    function AbstractTable() {
        this.isTemplateRef = isTemplateRef;
        this.isNonEmptyString = isNonEmptyString;
        this.headRow = [];
        this.bodyRows = [];
        this.MAX_ROW = 6;
        this.MAX_COL = 7;
        this.prefixCls = 'ant-picker';
        this.activeDate = new CandyDate();
        this.showWeek = false;
        this.valueChange = new EventEmitter();
    }
    /**
     * @protected
     * @return {?}
     */
    AbstractTable.prototype.render = /**
     * @protected
     * @return {?}
     */
    function () {
        if (this.activeDate) {
            this.headRow = this.makeHeadRow();
            this.bodyRows = this.makeBodyRows();
        }
    };
    /**
     * @param {?} _index
     * @param {?} item
     * @return {?}
     */
    AbstractTable.prototype.trackByBodyRow = /**
     * @param {?} _index
     * @param {?} item
     * @return {?}
     */
    function (_index, item) {
        return item;
    };
    // Item usually is an object, so trackby has no use by default.
    // Item usually is an object, so trackby has no use by default.
    /**
     * @param {?} _index
     * @param {?} item
     * @return {?}
     */
    AbstractTable.prototype.trackByBodyColumn = 
    // Item usually is an object, so trackby has no use by default.
    /**
     * @param {?} _index
     * @param {?} item
     * @return {?}
     */
    function (_index, item) {
        return item;
    };
    /**
     * @return {?}
     */
    AbstractTable.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.render();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    AbstractTable.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.activeDate && !changes.activeDate.currentValue) {
            this.activeDate = new CandyDate();
        }
    };
    AbstractTable.decorators = [
        { type: Directive }
    ];
    AbstractTable.propDecorators = {
        prefixCls: [{ type: Input }],
        value: [{ type: Input }],
        activeDate: [{ type: Input }],
        showWeek: [{ type: Input }],
        disabledDate: [{ type: Input }],
        cellRender: [{ type: Input }],
        fullCellRender: [{ type: Input }],
        valueChange: [{ type: Output }]
    };
    return AbstractTable;
}());
if (false) {
    /** @type {?} */
    AbstractTable.prototype.isTemplateRef;
    /** @type {?} */
    AbstractTable.prototype.isNonEmptyString;
    /** @type {?} */
    AbstractTable.prototype.headRow;
    /** @type {?} */
    AbstractTable.prototype.bodyRows;
    /** @type {?} */
    AbstractTable.prototype.MAX_ROW;
    /** @type {?} */
    AbstractTable.prototype.MAX_COL;
    /** @type {?} */
    AbstractTable.prototype.prefixCls;
    /** @type {?} */
    AbstractTable.prototype.value;
    /** @type {?} */
    AbstractTable.prototype.activeDate;
    /** @type {?} */
    AbstractTable.prototype.showWeek;
    /** @type {?} */
    AbstractTable.prototype.disabledDate;
    /** @type {?} */
    AbstractTable.prototype.cellRender;
    /** @type {?} */
    AbstractTable.prototype.fullCellRender;
    /** @type {?} */
    AbstractTable.prototype.valueChange;
    /**
     * @abstract
     * @return {?}
     */
    AbstractTable.prototype.makeHeadRow = function () { };
    /**
     * @abstract
     * @return {?}
     */
    AbstractTable.prototype.makeBodyRows = function () { };
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/date-table.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DateTableComponent = /** @class */ (function (_super) {
    __extends(DateTableComponent, _super);
    function DateTableComponent(i18n, dateHelper) {
        var _this = _super.call(this) || this;
        _this.i18n = i18n;
        _this.dateHelper = dateHelper;
        _this.selectedValue = []; // Range ONLY
        // Range ONLY
        _this.hoverValue = []; // Range ONLY
        // Range ONLY
        _this.dayHover = new EventEmitter(); // Emitted when hover on a day by mouse enter
        return _this;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    DateTableComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        _super.prototype.ngOnChanges.call(this, changes);
        if (this.isDateRealChange(changes.activeDate) ||
            this.isDateRealChange(changes.value) ||
            this.isDateRealChange(changes.selectedValue) ||
            this.isDateRealChange(changes.hoverValue)) {
            this.render();
        }
    };
    /**
     * @private
     * @param {?} change
     * @return {?}
     */
    DateTableComponent.prototype.isDateRealChange = /**
     * @private
     * @param {?} change
     * @return {?}
     */
    function (change) {
        if (change) {
            /** @type {?} */
            var previousValue_1 = change.previousValue;
            /** @type {?} */
            var currentValue = change.currentValue;
            if (Array.isArray(currentValue)) {
                return (!Array.isArray(previousValue_1) ||
                    currentValue.length !== previousValue_1.length ||
                    currentValue.some((/**
                     * @param {?} value
                     * @param {?} index
                     * @return {?}
                     */
                    function (value, index) {
                        /** @type {?} */
                        var previousCandyDate = previousValue_1[index];
                        return previousCandyDate instanceof CandyDate ? previousCandyDate.isSameDay(value) : previousCandyDate !== value;
                    })));
            }
            else {
                return !this.isSameDate((/** @type {?} */ (previousValue_1)), currentValue);
            }
        }
        return false;
    };
    /**
     * @private
     * @param {?} left
     * @param {?} right
     * @return {?}
     */
    DateTableComponent.prototype.isSameDate = /**
     * @private
     * @param {?} left
     * @param {?} right
     * @return {?}
     */
    function (left, right) {
        return (!left && !right) || (left && right && right.isSameDay(left));
    };
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    DateTableComponent.prototype.changeValueFromInside = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        // Only change date not change time
        this.activeDate = this.activeDate.setYear(value.getYear()).setMonth(value.getMonth()).setDate(value.getDate());
        this.valueChange.emit(this.activeDate);
        if (!this.activeDate.isSameMonth(this.value)) {
            this.render();
        }
    };
    /**
     * @return {?}
     */
    DateTableComponent.prototype.makeHeadRow = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var weekDays = [];
        /** @type {?} */
        var start = this.activeDate.calendarStart({ weekStartsOn: this.dateHelper.getFirstDayOfWeek() });
        for (var colIndex = 0; colIndex < this.MAX_COL; colIndex++) {
            /** @type {?} */
            var day = start.addDays(colIndex);
            weekDays.push({
                value: day.nativeDate,
                title: this.dateHelper.format(day.nativeDate, 'E'),
                // eg. Tue
                content: this.dateHelper.format(day.nativeDate, this.getVeryShortWeekFormat()),
                // eg. Tu,
                isSelected: false,
                isDisabled: false,
                onClick: /**
                 * @return {?}
                 */
                function () { },
                onMouseEnter: /**
                 * @return {?}
                 */
                function () { }
            });
        }
        return weekDays;
    };
    /**
     * @private
     * @return {?}
     */
    DateTableComponent.prototype.getVeryShortWeekFormat = /**
     * @private
     * @return {?}
     */
    function () {
        return this.i18n.getLocaleId().toLowerCase().indexOf('zh') === 0 ? 'EEEEE' : 'EEEEEE'; // Use extreme short for chinese
    };
    /**
     * @return {?}
     */
    DateTableComponent.prototype.makeBodyRows = /**
     * @return {?}
     */
    function () {
        var _a;
        var _this = this;
        var _b;
        /** @type {?} */
        var weekRows = [];
        /** @type {?} */
        var firstDayOfMonth = this.activeDate.calendarStart({ weekStartsOn: this.dateHelper.getFirstDayOfWeek() });
        for (var week = 0; week < this.MAX_ROW; week++) {
            /** @type {?} */
            var weekStart = firstDayOfMonth.addDays(week * 7);
            /** @type {?} */
            var row = {
                isActive: false,
                isCurrent: false,
                dateCells: [],
                year: weekStart.getYear()
            };
            var _loop_1 = function (day) {
                /** @type {?} */
                var date = weekStart.addDays(day);
                /** @type {?} */
                var dateFormat = transCompatFormat(this_1.i18n.getLocaleData('DatePicker.lang.dateFormat', 'YYYY-MM-DD'));
                /** @type {?} */
                var title = this_1.dateHelper.format(date.nativeDate, dateFormat);
                /** @type {?} */
                var label = this_1.dateHelper.format(date.nativeDate, 'dd');
                /** @type {?} */
                var cell = {
                    value: date.nativeDate,
                    label: label,
                    isSelected: false,
                    isDisabled: false,
                    isToday: false,
                    title: title,
                    cellRender: valueFunctionProp((/** @type {?} */ (this_1.cellRender)), date),
                    // Customized content
                    fullCellRender: valueFunctionProp((/** @type {?} */ (this_1.fullCellRender)), date),
                    content: "" + date.getDate(),
                    onClick: (/**
                     * @return {?}
                     */
                    function () { return _this.changeValueFromInside(date); }),
                    onMouseEnter: (/**
                     * @return {?}
                     */
                    function () { return _this.dayHover.emit(date); })
                };
                if (this_1.showWeek && !row.weekNum) {
                    row.weekNum = this_1.dateHelper.getISOWeek(date.nativeDate);
                }
                if (date.isToday()) {
                    cell.isToday = true;
                    row.isCurrent = true;
                }
                if (((Array.isArray(this_1.selectedValue) && this_1.selectedValue.length > 0) || (this_1.hoverValue && this_1.hoverValue.length > 0)) &&
                    date.isSameMonth(this_1.activeDate)) {
                    var _a = __read(this_1.hoverValue, 2), startHover = _a[0], endHover = _a[1];
                    var _b = __read(this_1.selectedValue, 2), startSelected = _b[0], endSelected = _b[1];
                    // Selected
                    if (startSelected && startSelected.isSameDay(date)) {
                        cell.isSelectedStartDate = true;
                        cell.isSelected = true;
                        row.isActive = true;
                    }
                    if (endSelected && endSelected.isSameDay(date)) {
                        cell.isSelectedEndDate = true;
                        cell.isSelected = true;
                        row.isActive = true;
                    }
                    else if (date.isAfterDay(startSelected) && date.isBeforeDay(endSelected)) {
                        cell.isInSelectedRange = true;
                    }
                    if (startHover && endHover) {
                        // Hover
                        if (startHover.isSameDay(date)) {
                            cell.isHoverStartDate = true;
                        }
                        if (endHover.isSameDay(date)) {
                            cell.isHoverEndDate = true;
                        }
                        if (date.isLastDayOfMonth()) {
                            cell.isLastDayOfMonth = true;
                        }
                        if (date.isFirstDayOfMonth()) {
                            cell.isFirstDayOfMonth = true;
                        }
                    }
                    if (startSelected && !endSelected) {
                        cell.isStartSingle = true;
                    }
                    if (!startSelected && endSelected) {
                        cell.isEndSingle = true;
                    }
                    if (date.isAfterDay(startHover) && date.isBeforeDay(endHover)) {
                        cell.isInHoverRange = true;
                    }
                }
                else if (date.isSameDay(this_1.value)) {
                    cell.isSelected = true;
                    row.isActive = true;
                }
                if ((_b = this_1.disabledDate) === null || _b === void 0 ? void 0 : _b.call(this_1, date.nativeDate)) {
                    cell.isDisabled = true;
                }
                cell.classMap = this_1.getClassMap(cell);
                row.dateCells.push(cell);
            };
            var this_1 = this;
            for (var day = 0; day < 7; day++) {
                _loop_1(day);
            }
            row.classMap = (_a = {},
                _a[this.prefixCls + "-week-panel-row"] = this.showWeek,
                _a[this.prefixCls + "-week-panel-row-selected"] = this.showWeek && row.isActive,
                _a);
            weekRows.push(row);
        }
        return weekRows;
    };
    /**
     * @param {?} cell
     * @return {?}
     */
    DateTableComponent.prototype.getClassMap = /**
     * @param {?} cell
     * @return {?}
     */
    function (cell) {
        var _a;
        /** @type {?} */
        var date = new CandyDate(cell.value);
        return _a = {},
            _a["ant-picker-cell"] = true,
            _a["ant-picker-cell-today"] = !!cell.isToday,
            _a["ant-picker-cell-in-view"] = date.isSameMonth(this.activeDate),
            _a["ant-picker-cell-selected"] = cell.isSelected,
            _a["ant-picker-cell-disabled"] = cell.isDisabled,
            _a["ant-picker-cell-in-range"] = !!cell.isInSelectedRange,
            _a["ant-picker-cell-range-start"] = !!cell.isSelectedStartDate,
            _a["ant-picker-cell-range-end"] = !!cell.isSelectedEndDate,
            _a["ant-picker-cell-range-start-single"] = !!cell.isStartSingle,
            _a["ant-picker-cell-range-end-single"] = !!cell.isEndSingle,
            _a["ant-picker-cell-range-hover"] = !!cell.isInHoverRange,
            _a["ant-picker-cell-range-hover-start"] = !!cell.isHoverStartDate,
            _a["ant-picker-cell-range-hover-end"] = !!cell.isHoverEndDate,
            _a["ant-picker-cell-range-hover-edge-start"] = !!cell.isFirstDayOfMonth,
            _a["ant-picker-cell-range-hover-edge-end"] = !!cell.isLastDayOfMonth,
            _a;
    };
    /**
     * @param {?} _index
     * @param {?} item
     * @return {?}
     */
    DateTableComponent.prototype.trackByBodyRow = /**
     * @param {?} _index
     * @param {?} item
     * @return {?}
     */
    function (_index, item) {
        return item.year + "-" + item.weekNum;
    };
    /**
     * @param {?} _index
     * @param {?} item
     * @return {?}
     */
    DateTableComponent.prototype.trackByBodyColumn = /**
     * @param {?} _index
     * @param {?} item
     * @return {?}
     */
    function (_index, item) {
        return (/** @type {?} */ (item.title));
    };
    DateTableComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    // tslint:disable-next-line:component-selector
                    selector: 'date-table',
                    exportAs: 'dateTable',
                    template: "<table class=\"ant-picker-content\" cellspacing=\"0\" role=\"grid\">\n  <thead *ngIf=\"headRow && headRow.length > 0\">\n    <tr role=\"row\">\n      <th *ngIf=\"showWeek\" role=\"columnheader\"></th>\n      <th *ngFor=\"let cell of headRow\" role=\"columnheader\" title=\"{{ cell.title }}\">\n        {{ cell.content }}\n      </th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr *ngFor=\"let row of bodyRows; trackBy: trackByBodyRow\" [ngClass]=\"row.classMap!\" role=\"row\">\n      <td *ngIf=\"row.weekNum\" role=\"gridcell\" class=\"{{ prefixCls }}-cell-week\">\n        {{ row.weekNum }}\n      </td>\n      <td\n        *ngFor=\"let cell of row.dateCells; trackBy: trackByBodyColumn\"\n        title=\"{{ cell.title }}\"\n        role=\"gridcell\"\n        [ngClass]=\"cell.classMap!\"\n        (click)=\"cell.isDisabled ? null : cell.onClick()\"\n        (mouseenter)=\"cell.onMouseEnter()\"\n      >\n        <ng-container [ngSwitch]=\"prefixCls\">\n          <ng-container *ngSwitchCase=\"'ant-picker'\">\n            <ng-container [ngSwitch]=\"true\">\n              <ng-container *ngSwitchCase=\"isTemplateRef(cell.cellRender)\">\n                <!--           *ngSwitchCase not has type assertion support, the cellRender type here is TemplateRef -->\n                <ng-container\n                  *ngTemplateOutlet=\"$any(cell.cellRender); context: { $implicit: cell.value }\"\n                ></ng-container>\n              </ng-container>\n              <ng-container *ngSwitchCase=\"isNonEmptyString(cell.cellRender)\">\n                <span [innerHTML]=\"cell.cellRender\"></span>\n              </ng-container>\n              <ng-container *ngSwitchDefault>\n                <div\n                  class=\"{{ prefixCls }}-cell-inner\"\n                  [attr.aria-selected]=\"cell.isSelected\"\n                  [attr.aria-disabled]=\"cell.isDisabled\"\n                >\n                  {{ cell.content }}\n                </div>\n              </ng-container>\n            </ng-container>\n          </ng-container>\n          <ng-container *ngSwitchCase=\"'ant-picker-calendar'\">\n            <div\n              class=\"{{ prefixCls }}-date ant-picker-cell-inner\"\n              [class.ant-picker-calendar-date-today]=\"cell.isToday\"\n            >\n              <ng-container *ngIf=\"cell.fullCellRender; else defaultCell\">\n                <ng-container\n                  *ngTemplateOutlet=\"$any(cell.fullCellRender); context: { $implicit: cell.value }\"\n                >\n                </ng-container>\n              </ng-container>\n              <ng-template #defaultCell>\n                <div class=\"{{ prefixCls }}-date-value\">{{ cell.content }}</div>\n                <div class=\"{{ prefixCls }}-date-content\">\n                  <ng-container\n                    *ngTemplateOutlet=\"$any(cell.cellRender); context: { $implicit: cell.value }\"\n                  >\n                  </ng-container>\n                </div>\n              </ng-template>\n            </div>\n          </ng-container>\n        </ng-container>\n      </td>\n    </tr>\n  </tbody>\n</table>\n"
                }] }
    ];
    /** @nocollapse */
    DateTableComponent.ctorParameters = function () { return [
        { type: NzI18nService },
        { type: DateHelperService }
    ]; };
    DateTableComponent.propDecorators = {
        locale: [{ type: Input }],
        selectedValue: [{ type: Input }],
        hoverValue: [{ type: Input }],
        dayHover: [{ type: Output }]
    };
    return DateTableComponent;
}(AbstractTable));
if (false) {
    /** @type {?} */
    DateTableComponent.prototype.locale;
    /** @type {?} */
    DateTableComponent.prototype.selectedValue;
    /** @type {?} */
    DateTableComponent.prototype.hoverValue;
    /** @type {?} */
    DateTableComponent.prototype.dayHover;
    /**
     * @type {?}
     * @private
     */
    DateTableComponent.prototype.i18n;
    /**
     * @type {?}
     * @private
     */
    DateTableComponent.prototype.dateHelper;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/decade-header.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DecadeHeaderComponent = /** @class */ (function (_super) {
    __extends(DecadeHeaderComponent, _super);
    function DecadeHeaderComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @return {?}
     */
    DecadeHeaderComponent.prototype.previous = /**
     * @return {?}
     */
    function () { };
    /**
     * @return {?}
     */
    DecadeHeaderComponent.prototype.next = /**
     * @return {?}
     */
    function () { };
    Object.defineProperty(DecadeHeaderComponent.prototype, "startYear", {
        get: /**
         * @return {?}
         */
        function () {
            return parseInt("" + this.value.getYear() / 100, 10) * 100;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DecadeHeaderComponent.prototype, "endYear", {
        get: /**
         * @return {?}
         */
        function () {
            return this.startYear + 99;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DecadeHeaderComponent.prototype.superPrevious = /**
     * @return {?}
     */
    function () {
        this.changeValue(this.value.addYears(-100));
    };
    /**
     * @return {?}
     */
    DecadeHeaderComponent.prototype.superNext = /**
     * @return {?}
     */
    function () {
        this.changeValue(this.value.addYears(100));
    };
    /**
     * @return {?}
     */
    DecadeHeaderComponent.prototype.getSelectors = /**
     * @return {?}
     */
    function () {
        return [
            {
                className: this.prefixCls + "-decade-btn",
                title: '',
                onClick: (/**
                 * @return {?}
                 */
                function () {
                    // noop
                }),
                label: this.startYear + "-" + this.endYear
            }
        ];
    };
    DecadeHeaderComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'decade-header',
                    // tslint:disable-line:component-selector
                    exportAs: 'decadeHeader',
                    template: "<div class=\"{{ prefixCls }}\">\n  <button\n    [style.visibility]=\"showSuperPreBtn ? 'visible' : 'hidden'\"\n    class=\"{{ prefixCls }}-super-prev-btn\"\n    role=\"button\"\n    tabindex=\"-1\"\n    title=\"{{ superPreviousTitle() }}\"\n    (click)=\"superPrevious()\"\n  >\n    <span class=\"ant-picker-super-prev-icon\"></span>\n  </button>\n  <button\n    [style.visibility]=\"showPreBtn ? 'visible' : 'hidden'\"\n    class=\"{{ prefixCls }}-prev-btn\"\n    role=\"button\"\n    title=\"{{ previousTitle() }}\"\n    tabindex=\"-1\"\n    (click)=\"previous()\"\n  >\n    <span class=\"ant-picker-prev-icon\"></span>\n  </button>\n\n  <div class=\"{{ prefixCls }}-view\">\n    <ng-container *ngFor=\"let selector of selectors\">\n      <button\n        class=\"{{ selector.className }}\"\n        role=\"button\"\n        type=\"button\"\n        title=\"{{ selector.title || null }}\"\n        (click)=\"selector.onClick()\"\n      >\n        {{ selector.label }}\n      </button>\n    </ng-container>\n  </div>\n  <button\n    [style.visibility]=\"showNextBtn ? 'visible' : 'hidden'\"\n    class=\"{{ prefixCls }}-next-btn\"\n    role=\"button\"\n    tabindex=\"-1\"\n    title=\"{{ nextTitle() }}\"\n    (click)=\"next()\"\n  >\n    <span class=\"ant-picker-next-icon\"></span>\n  </button>\n  <button\n    [style.visibility]=\"showSuperNextBtn ? 'visible' : 'hidden'\"\n    class=\"{{ prefixCls }}-super-next-btn\"\n    role=\"button\"\n    tabindex=\"-1\"\n    title=\"{{ superNextTitle() }}\"\n    (click)=\"superNext()\"\n  >\n    <span class=\"ant-picker-super-next-icon\"></span>\n  </button>\n</div>\n"
                }] }
    ];
    return DecadeHeaderComponent;
}(AbstractPanelHeader));

/**
 * @fileoverview added by tsickle
 * Generated from: lib/decade-table.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var MAX_ROW = 4;
/** @type {?} */
var MAX_COL = 3;
var DecadeTableComponent = /** @class */ (function (_super) {
    __extends(DecadeTableComponent, _super);
    function DecadeTableComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    DecadeTableComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.value || changes.disabledDate || changes.activeDate) {
            this.render();
        }
    };
    Object.defineProperty(DecadeTableComponent.prototype, "startYear", {
        get: /**
         * @return {?}
         */
        function () {
            return parseInt("" + this.activeDate.getYear() / 100, 10) * 100;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DecadeTableComponent.prototype, "endYear", {
        get: /**
         * @return {?}
         */
        function () {
            return this.startYear + 99;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DecadeTableComponent.prototype.makeHeadRow = /**
     * @return {?}
     */
    function () {
        return [];
    };
    /**
     * @return {?}
     */
    DecadeTableComponent.prototype.makeBodyRows = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var decades = [];
        /** @type {?} */
        var currentYear = this.value && this.value.getYear();
        /** @type {?} */
        var startYear = this.startYear;
        /** @type {?} */
        var endYear = this.endYear;
        /** @type {?} */
        var previousYear = startYear - 10;
        /** @type {?} */
        var index = 0;
        for (var rowIndex = 0; rowIndex < MAX_ROW; rowIndex++) {
            /** @type {?} */
            var row = [];
            var _loop_1 = function (colIndex) {
                /** @type {?} */
                var start = previousYear + index * 10;
                /** @type {?} */
                var end = previousYear + index * 10 + 9;
                /** @type {?} */
                var content = start + "-" + end;
                /** @type {?} */
                var cell = {
                    value: this_1.activeDate.setYear(start).nativeDate,
                    content: content,
                    title: content,
                    isDisabled: false,
                    isSelected: currentYear >= start && currentYear <= end,
                    isLowerThanStart: end < startYear,
                    isBiggerThanEnd: start > endYear,
                    classMap: {},
                    onClick: /**
                     * @return {?}
                     */
                    function () { },
                    onMouseEnter: /**
                     * @return {?}
                     */
                    function () { }
                };
                cell.classMap = this_1.getClassMap(cell);
                cell.onClick = (/**
                 * @return {?}
                 */
                function () { return _this.chooseDecade(start); });
                index++;
                row.push(cell);
            };
            var this_1 = this;
            for (var colIndex = 0; colIndex < MAX_COL; colIndex++) {
                _loop_1(colIndex);
            }
            decades.push({ dateCells: row });
        }
        return decades;
    };
    /**
     * @param {?} cell
     * @return {?}
     */
    DecadeTableComponent.prototype.getClassMap = /**
     * @param {?} cell
     * @return {?}
     */
    function (cell) {
        var _a;
        return _a = {},
            _a[this.prefixCls + "-cell"] = true,
            _a[this.prefixCls + "-cell-in-view"] = !cell.isBiggerThanEnd && !cell.isLowerThanStart,
            _a[this.prefixCls + "-cell-selected"] = cell.isSelected,
            _a[this.prefixCls + "-cell-disabled"] = cell.isDisabled,
            _a;
    };
    /**
     * @private
     * @param {?} year
     * @return {?}
     */
    DecadeTableComponent.prototype.chooseDecade = /**
     * @private
     * @param {?} year
     * @return {?}
     */
    function (year) {
        this.value = this.activeDate.setYear(year);
        this.valueChange.emit(this.value);
    };
    DecadeTableComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    // tslint:disable-next-line:component-selector
                    selector: 'decade-table',
                    exportAs: 'decadeTable',
                    template: "<table class=\"ant-picker-content\" cellspacing=\"0\" role=\"grid\">\n  <thead *ngIf=\"headRow && headRow.length > 0\">\n    <tr role=\"row\">\n      <th *ngIf=\"showWeek\" role=\"columnheader\"></th>\n      <th *ngFor=\"let cell of headRow\" role=\"columnheader\" title=\"{{ cell.title }}\">\n        {{ cell.content }}\n      </th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr *ngFor=\"let row of bodyRows; trackBy: trackByBodyRow\" [ngClass]=\"row.classMap!\" role=\"row\">\n      <td *ngIf=\"row.weekNum\" role=\"gridcell\" class=\"{{ prefixCls }}-cell-week\">\n        {{ row.weekNum }}\n      </td>\n      <td\n        *ngFor=\"let cell of row.dateCells; trackBy: trackByBodyColumn\"\n        title=\"{{ cell.title }}\"\n        role=\"gridcell\"\n        [ngClass]=\"cell.classMap!\"\n        (click)=\"cell.isDisabled ? null : cell.onClick()\"\n        (mouseenter)=\"cell.onMouseEnter()\"\n      >\n        <ng-container [ngSwitch]=\"prefixCls\">\n          <ng-container *ngSwitchCase=\"'ant-picker'\">\n            <ng-container [ngSwitch]=\"true\">\n              <ng-container *ngSwitchCase=\"isTemplateRef(cell.cellRender)\">\n                <!--           *ngSwitchCase not has type assertion support, the cellRender type here is TemplateRef -->\n                <ng-container\n                  *ngTemplateOutlet=\"$any(cell.cellRender); context: { $implicit: cell.value }\"\n                ></ng-container>\n              </ng-container>\n              <ng-container *ngSwitchCase=\"isNonEmptyString(cell.cellRender)\">\n                <span [innerHTML]=\"cell.cellRender\"></span>\n              </ng-container>\n              <ng-container *ngSwitchDefault>\n                <div\n                  class=\"{{ prefixCls }}-cell-inner\"\n                  [attr.aria-selected]=\"cell.isSelected\"\n                  [attr.aria-disabled]=\"cell.isDisabled\"\n                >\n                  {{ cell.content }}\n                </div>\n              </ng-container>\n            </ng-container>\n          </ng-container>\n          <ng-container *ngSwitchCase=\"'ant-picker-calendar'\">\n            <div\n              class=\"{{ prefixCls }}-date ant-picker-cell-inner\"\n              [class.ant-picker-calendar-date-today]=\"cell.isToday\"\n            >\n              <ng-container *ngIf=\"cell.fullCellRender; else defaultCell\">\n                <ng-container\n                  *ngTemplateOutlet=\"$any(cell.fullCellRender); context: { $implicit: cell.value }\"\n                >\n                </ng-container>\n              </ng-container>\n              <ng-template #defaultCell>\n                <div class=\"{{ prefixCls }}-date-value\">{{ cell.content }}</div>\n                <div class=\"{{ prefixCls }}-date-content\">\n                  <ng-container\n                    *ngTemplateOutlet=\"$any(cell.cellRender); context: { $implicit: cell.value }\"\n                  >\n                  </ng-container>\n                </div>\n              </ng-template>\n            </div>\n          </ng-container>\n        </ng-container>\n      </td>\n    </tr>\n  </tbody>\n</table>\n"
                }] }
    ];
    return DecadeTableComponent;
}(AbstractTable));

/**
 * @fileoverview added by tsickle
 * Generated from: lib/month-header.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var MonthHeaderComponent = /** @class */ (function (_super) {
    __extends(MonthHeaderComponent, _super);
    function MonthHeaderComponent(dateHelper) {
        var _this = _super.call(this) || this;
        _this.dateHelper = dateHelper;
        return _this;
    }
    /**
     * @return {?}
     */
    MonthHeaderComponent.prototype.getSelectors = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return [
            {
                className: this.prefixCls + "-month-btn",
                title: this.locale.yearSelect,
                onClick: (/**
                 * @return {?}
                 */
                function () { return _this.changeMode('year'); }),
                label: this.dateHelper.format(this.value.nativeDate, transCompatFormat(this.locale.yearFormat))
            }
        ];
    };
    MonthHeaderComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'month-header',
                    // tslint:disable-line:component-selector
                    exportAs: 'monthHeader',
                    template: "<div class=\"{{ prefixCls }}\">\n  <button\n    [style.visibility]=\"showSuperPreBtn ? 'visible' : 'hidden'\"\n    class=\"{{ prefixCls }}-super-prev-btn\"\n    role=\"button\"\n    tabindex=\"-1\"\n    title=\"{{ superPreviousTitle() }}\"\n    (click)=\"superPrevious()\"\n  >\n    <span class=\"ant-picker-super-prev-icon\"></span>\n  </button>\n  <button\n    [style.visibility]=\"showPreBtn ? 'visible' : 'hidden'\"\n    class=\"{{ prefixCls }}-prev-btn\"\n    role=\"button\"\n    title=\"{{ previousTitle() }}\"\n    tabindex=\"-1\"\n    (click)=\"previous()\"\n  >\n    <span class=\"ant-picker-prev-icon\"></span>\n  </button>\n\n  <div class=\"{{ prefixCls }}-view\">\n    <ng-container *ngFor=\"let selector of selectors\">\n      <button\n        class=\"{{ selector.className }}\"\n        role=\"button\"\n        type=\"button\"\n        title=\"{{ selector.title || null }}\"\n        (click)=\"selector.onClick()\"\n      >\n        {{ selector.label }}\n      </button>\n    </ng-container>\n  </div>\n  <button\n    [style.visibility]=\"showNextBtn ? 'visible' : 'hidden'\"\n    class=\"{{ prefixCls }}-next-btn\"\n    role=\"button\"\n    tabindex=\"-1\"\n    title=\"{{ nextTitle() }}\"\n    (click)=\"next()\"\n  >\n    <span class=\"ant-picker-next-icon\"></span>\n  </button>\n  <button\n    [style.visibility]=\"showSuperNextBtn ? 'visible' : 'hidden'\"\n    class=\"{{ prefixCls }}-super-next-btn\"\n    role=\"button\"\n    tabindex=\"-1\"\n    title=\"{{ superNextTitle() }}\"\n    (click)=\"superNext()\"\n  >\n    <span class=\"ant-picker-super-next-icon\"></span>\n  </button>\n</div>\n"
                }] }
    ];
    /** @nocollapse */
    MonthHeaderComponent.ctorParameters = function () { return [
        { type: DateHelperService }
    ]; };
    return MonthHeaderComponent;
}(AbstractPanelHeader));
if (false) {
    /**
     * @type {?}
     * @private
     */
    MonthHeaderComponent.prototype.dateHelper;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/month-table.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var MonthTableComponent = /** @class */ (function (_super) {
    __extends(MonthTableComponent, _super);
    function MonthTableComponent(dateHelper) {
        var _this = _super.call(this) || this;
        _this.dateHelper = dateHelper;
        _this.MAX_ROW = 4;
        _this.MAX_COL = 3;
        return _this;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    MonthTableComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        _super.prototype.ngOnChanges.call(this, changes);
        if (changes.value || changes.disabledDate || changes.activeDate) {
            this.render();
        }
    };
    /**
     * @return {?}
     */
    MonthTableComponent.prototype.makeHeadRow = /**
     * @return {?}
     */
    function () {
        return [];
    };
    /**
     * @return {?}
     */
    MonthTableComponent.prototype.makeBodyRows = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var months = [];
        /** @type {?} */
        var currentMonth = this.value && this.value.getMonth();
        /** @type {?} */
        var monthValue = 0;
        for (var rowIndex = 0; rowIndex < this.MAX_ROW; rowIndex++) {
            /** @type {?} */
            var row = [];
            var _loop_1 = function (colIndex) {
                /** @type {?} */
                var month = this_1.activeDate.setMonth(monthValue);
                /** @type {?} */
                var isDisabled = this_1.disabledDate ? this_1.disabledDate(month.nativeDate) : false;
                /** @type {?} */
                var content = this_1.dateHelper.format(month.nativeDate, 'MMM');
                /** @type {?} */
                var cell = {
                    value: month.nativeDate,
                    isDisabled: isDisabled,
                    isSelected: monthValue === currentMonth,
                    content: content,
                    title: content,
                    classMap: {},
                    cellRender: valueFunctionProp((/** @type {?} */ (this_1.cellRender)), month),
                    // Customized content
                    fullCellRender: valueFunctionProp((/** @type {?} */ (this_1.fullCellRender)), month),
                    onClick: (/**
                     * @return {?}
                     */
                    function () { return _this.chooseMonth(cell.value.getMonth()); }),
                    // don't use monthValue here,
                    onMouseEnter: (/**
                     * @return {?}
                     */
                    function () { return null; })
                };
                cell.classMap = this_1.getClassMap(cell);
                row.push(cell);
                monthValue++;
            };
            var this_1 = this;
            for (var colIndex = 0; colIndex < this.MAX_COL; colIndex++) {
                _loop_1(colIndex);
            }
            months.push({ dateCells: row });
        }
        return months;
    };
    /**
     * @param {?} cell
     * @return {?}
     */
    MonthTableComponent.prototype.getClassMap = /**
     * @param {?} cell
     * @return {?}
     */
    function (cell) {
        var _a;
        return _a = {},
            _a["ant-picker-cell"] = true,
            _a["ant-picker-cell-in-view"] = true,
            _a["ant-picker-cell-selected"] = cell.isSelected,
            _a["ant-picker-cell-disabled"] = cell.isDisabled,
            _a;
    };
    /**
     * @private
     * @param {?} month
     * @return {?}
     */
    MonthTableComponent.prototype.chooseMonth = /**
     * @private
     * @param {?} month
     * @return {?}
     */
    function (month) {
        this.value = this.activeDate.setMonth(month);
        this.valueChange.emit(this.value);
    };
    MonthTableComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    // tslint:disable-next-line:component-selector
                    selector: 'month-table',
                    exportAs: 'monthTable',
                    template: "<table class=\"ant-picker-content\" cellspacing=\"0\" role=\"grid\">\n  <thead *ngIf=\"headRow && headRow.length > 0\">\n    <tr role=\"row\">\n      <th *ngIf=\"showWeek\" role=\"columnheader\"></th>\n      <th *ngFor=\"let cell of headRow\" role=\"columnheader\" title=\"{{ cell.title }}\">\n        {{ cell.content }}\n      </th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr *ngFor=\"let row of bodyRows; trackBy: trackByBodyRow\" [ngClass]=\"row.classMap!\" role=\"row\">\n      <td *ngIf=\"row.weekNum\" role=\"gridcell\" class=\"{{ prefixCls }}-cell-week\">\n        {{ row.weekNum }}\n      </td>\n      <td\n        *ngFor=\"let cell of row.dateCells; trackBy: trackByBodyColumn\"\n        title=\"{{ cell.title }}\"\n        role=\"gridcell\"\n        [ngClass]=\"cell.classMap!\"\n        (click)=\"cell.isDisabled ? null : cell.onClick()\"\n        (mouseenter)=\"cell.onMouseEnter()\"\n      >\n        <ng-container [ngSwitch]=\"prefixCls\">\n          <ng-container *ngSwitchCase=\"'ant-picker'\">\n            <ng-container [ngSwitch]=\"true\">\n              <ng-container *ngSwitchCase=\"isTemplateRef(cell.cellRender)\">\n                <!--           *ngSwitchCase not has type assertion support, the cellRender type here is TemplateRef -->\n                <ng-container\n                  *ngTemplateOutlet=\"$any(cell.cellRender); context: { $implicit: cell.value }\"\n                ></ng-container>\n              </ng-container>\n              <ng-container *ngSwitchCase=\"isNonEmptyString(cell.cellRender)\">\n                <span [innerHTML]=\"cell.cellRender\"></span>\n              </ng-container>\n              <ng-container *ngSwitchDefault>\n                <div\n                  class=\"{{ prefixCls }}-cell-inner\"\n                  [attr.aria-selected]=\"cell.isSelected\"\n                  [attr.aria-disabled]=\"cell.isDisabled\"\n                >\n                  {{ cell.content }}\n                </div>\n              </ng-container>\n            </ng-container>\n          </ng-container>\n          <ng-container *ngSwitchCase=\"'ant-picker-calendar'\">\n            <div\n              class=\"{{ prefixCls }}-date ant-picker-cell-inner\"\n              [class.ant-picker-calendar-date-today]=\"cell.isToday\"\n            >\n              <ng-container *ngIf=\"cell.fullCellRender; else defaultCell\">\n                <ng-container\n                  *ngTemplateOutlet=\"$any(cell.fullCellRender); context: { $implicit: cell.value }\"\n                >\n                </ng-container>\n              </ng-container>\n              <ng-template #defaultCell>\n                <div class=\"{{ prefixCls }}-date-value\">{{ cell.content }}</div>\n                <div class=\"{{ prefixCls }}-date-content\">\n                  <ng-container\n                    *ngTemplateOutlet=\"$any(cell.cellRender); context: { $implicit: cell.value }\"\n                  >\n                  </ng-container>\n                </div>\n              </ng-template>\n            </div>\n          </ng-container>\n        </ng-container>\n      </td>\n    </tr>\n  </tbody>\n</table>\n"
                }] }
    ];
    /** @nocollapse */
    MonthTableComponent.ctorParameters = function () { return [
        { type: DateHelperService }
    ]; };
    return MonthTableComponent;
}(AbstractTable));
if (false) {
    /** @type {?} */
    MonthTableComponent.prototype.MAX_ROW;
    /** @type {?} */
    MonthTableComponent.prototype.MAX_COL;
    /**
     * @type {?}
     * @private
     */
    MonthTableComponent.prototype.dateHelper;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/year-header.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var YearHeaderComponent = /** @class */ (function (_super) {
    __extends(YearHeaderComponent, _super);
    function YearHeaderComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(YearHeaderComponent.prototype, "startYear", {
        get: /**
         * @return {?}
         */
        function () {
            return parseInt("" + this.value.getYear() / 10, 10) * 10;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(YearHeaderComponent.prototype, "endYear", {
        get: /**
         * @return {?}
         */
        function () {
            return this.startYear + 9;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    YearHeaderComponent.prototype.superPrevious = /**
     * @return {?}
     */
    function () {
        this.changeValue(this.value.addYears(-10));
    };
    /**
     * @return {?}
     */
    YearHeaderComponent.prototype.superNext = /**
     * @return {?}
     */
    function () {
        this.changeValue(this.value.addYears(10));
    };
    /**
     * @return {?}
     */
    YearHeaderComponent.prototype.getSelectors = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return [
            {
                className: this.prefixCls + "-year-btn",
                title: '',
                onClick: (/**
                 * @return {?}
                 */
                function () { return _this.changeMode('decade'); }),
                label: this.startYear + "-" + this.endYear
            }
        ];
    };
    YearHeaderComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'year-header',
                    // tslint:disable-line:component-selector
                    exportAs: 'yearHeader',
                    template: "<div class=\"{{ prefixCls }}\">\n  <button\n    [style.visibility]=\"showSuperPreBtn ? 'visible' : 'hidden'\"\n    class=\"{{ prefixCls }}-super-prev-btn\"\n    role=\"button\"\n    tabindex=\"-1\"\n    title=\"{{ superPreviousTitle() }}\"\n    (click)=\"superPrevious()\"\n  >\n    <span class=\"ant-picker-super-prev-icon\"></span>\n  </button>\n  <button\n    [style.visibility]=\"showPreBtn ? 'visible' : 'hidden'\"\n    class=\"{{ prefixCls }}-prev-btn\"\n    role=\"button\"\n    title=\"{{ previousTitle() }}\"\n    tabindex=\"-1\"\n    (click)=\"previous()\"\n  >\n    <span class=\"ant-picker-prev-icon\"></span>\n  </button>\n\n  <div class=\"{{ prefixCls }}-view\">\n    <ng-container *ngFor=\"let selector of selectors\">\n      <button\n        class=\"{{ selector.className }}\"\n        role=\"button\"\n        type=\"button\"\n        title=\"{{ selector.title || null }}\"\n        (click)=\"selector.onClick()\"\n      >\n        {{ selector.label }}\n      </button>\n    </ng-container>\n  </div>\n  <button\n    [style.visibility]=\"showNextBtn ? 'visible' : 'hidden'\"\n    class=\"{{ prefixCls }}-next-btn\"\n    role=\"button\"\n    tabindex=\"-1\"\n    title=\"{{ nextTitle() }}\"\n    (click)=\"next()\"\n  >\n    <span class=\"ant-picker-next-icon\"></span>\n  </button>\n  <button\n    [style.visibility]=\"showSuperNextBtn ? 'visible' : 'hidden'\"\n    class=\"{{ prefixCls }}-super-next-btn\"\n    role=\"button\"\n    tabindex=\"-1\"\n    title=\"{{ superNextTitle() }}\"\n    (click)=\"superNext()\"\n  >\n    <span class=\"ant-picker-super-next-icon\"></span>\n  </button>\n</div>\n"
                }] }
    ];
    return YearHeaderComponent;
}(AbstractPanelHeader));

/**
 * @fileoverview added by tsickle
 * Generated from: lib/year-table.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var YearTableComponent = /** @class */ (function (_super) {
    __extends(YearTableComponent, _super);
    function YearTableComponent(dateHelper) {
        var _this = _super.call(this) || this;
        _this.dateHelper = dateHelper;
        _this.MAX_ROW = 4;
        _this.MAX_COL = 3;
        return _this;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    YearTableComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        _super.prototype.ngOnChanges.call(this, changes);
        if (changes.value || changes.disabledDate || changes.activeDate) {
            this.render();
        }
    };
    /**
     * @return {?}
     */
    YearTableComponent.prototype.makeHeadRow = /**
     * @return {?}
     */
    function () {
        return [];
    };
    /**
     * @return {?}
     */
    YearTableComponent.prototype.makeBodyRows = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var currentYear = this.activeDate && this.activeDate.getYear();
        /** @type {?} */
        var startYear = parseInt("" + currentYear / 10, 10) * 10;
        /** @type {?} */
        var endYear = startYear + 9;
        /** @type {?} */
        var previousYear = startYear - 1;
        /** @type {?} */
        var years = [];
        /** @type {?} */
        var yearValue = 0;
        for (var rowIndex = 0; rowIndex < this.MAX_ROW; rowIndex++) {
            /** @type {?} */
            var row = [];
            var _loop_1 = function (colIndex) {
                /** @type {?} */
                var yearNum = previousYear + yearValue;
                /** @type {?} */
                var year = this_1.activeDate.setYear(yearNum);
                /** @type {?} */
                var content = this_1.dateHelper.format(year.nativeDate, 'yyyy');
                /** @type {?} */
                var isDisabled = this_1.disabledDate ? this_1.disabledDate(year.nativeDate) : false;
                /** @type {?} */
                var cell = {
                    value: year.nativeDate,
                    isDisabled: isDisabled,
                    isSameDecade: yearNum >= startYear && yearNum <= endYear,
                    isSelected: yearNum === (this_1.value && this_1.value.getYear()),
                    content: content,
                    title: content,
                    classMap: {},
                    cellRender: valueFunctionProp((/** @type {?} */ (this_1.cellRender)), year),
                    // Customized content
                    fullCellRender: valueFunctionProp((/** @type {?} */ (this_1.fullCellRender)), year),
                    onClick: (/**
                     * @return {?}
                     */
                    function () { return _this.chooseYear(cell.value.getFullYear()); }),
                    // don't use yearValue here,
                    onMouseEnter: (/**
                     * @return {?}
                     */
                    function () { return null; })
                };
                cell.classMap = this_1.getClassMap(cell);
                row.push(cell);
                yearValue++;
            };
            var this_1 = this;
            for (var colIndex = 0; colIndex < this.MAX_COL; colIndex++) {
                _loop_1(colIndex);
            }
            years.push({ dateCells: row });
        }
        return years;
    };
    /**
     * @param {?} cell
     * @return {?}
     */
    YearTableComponent.prototype.getClassMap = /**
     * @param {?} cell
     * @return {?}
     */
    function (cell) {
        var _a;
        return _a = {},
            _a[this.prefixCls + "-cell"] = true,
            _a[this.prefixCls + "-cell-in-view"] = !!cell.isSameDecade,
            _a[this.prefixCls + "-cell-selected"] = cell.isSelected,
            _a[this.prefixCls + "-cell-disabled"] = cell.isDisabled,
            _a;
    };
    /**
     * @private
     * @param {?} year
     * @return {?}
     */
    YearTableComponent.prototype.chooseYear = /**
     * @private
     * @param {?} year
     * @return {?}
     */
    function (year) {
        this.value = this.activeDate.setYear(year);
        this.valueChange.emit(this.value);
        this.render();
    };
    YearTableComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    // tslint:disable-next-line:component-selector
                    selector: 'year-table',
                    exportAs: 'yearTable',
                    template: "<table class=\"ant-picker-content\" cellspacing=\"0\" role=\"grid\">\n  <thead *ngIf=\"headRow && headRow.length > 0\">\n    <tr role=\"row\">\n      <th *ngIf=\"showWeek\" role=\"columnheader\"></th>\n      <th *ngFor=\"let cell of headRow\" role=\"columnheader\" title=\"{{ cell.title }}\">\n        {{ cell.content }}\n      </th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr *ngFor=\"let row of bodyRows; trackBy: trackByBodyRow\" [ngClass]=\"row.classMap!\" role=\"row\">\n      <td *ngIf=\"row.weekNum\" role=\"gridcell\" class=\"{{ prefixCls }}-cell-week\">\n        {{ row.weekNum }}\n      </td>\n      <td\n        *ngFor=\"let cell of row.dateCells; trackBy: trackByBodyColumn\"\n        title=\"{{ cell.title }}\"\n        role=\"gridcell\"\n        [ngClass]=\"cell.classMap!\"\n        (click)=\"cell.isDisabled ? null : cell.onClick()\"\n        (mouseenter)=\"cell.onMouseEnter()\"\n      >\n        <ng-container [ngSwitch]=\"prefixCls\">\n          <ng-container *ngSwitchCase=\"'ant-picker'\">\n            <ng-container [ngSwitch]=\"true\">\n              <ng-container *ngSwitchCase=\"isTemplateRef(cell.cellRender)\">\n                <!--           *ngSwitchCase not has type assertion support, the cellRender type here is TemplateRef -->\n                <ng-container\n                  *ngTemplateOutlet=\"$any(cell.cellRender); context: { $implicit: cell.value }\"\n                ></ng-container>\n              </ng-container>\n              <ng-container *ngSwitchCase=\"isNonEmptyString(cell.cellRender)\">\n                <span [innerHTML]=\"cell.cellRender\"></span>\n              </ng-container>\n              <ng-container *ngSwitchDefault>\n                <div\n                  class=\"{{ prefixCls }}-cell-inner\"\n                  [attr.aria-selected]=\"cell.isSelected\"\n                  [attr.aria-disabled]=\"cell.isDisabled\"\n                >\n                  {{ cell.content }}\n                </div>\n              </ng-container>\n            </ng-container>\n          </ng-container>\n          <ng-container *ngSwitchCase=\"'ant-picker-calendar'\">\n            <div\n              class=\"{{ prefixCls }}-date ant-picker-cell-inner\"\n              [class.ant-picker-calendar-date-today]=\"cell.isToday\"\n            >\n              <ng-container *ngIf=\"cell.fullCellRender; else defaultCell\">\n                <ng-container\n                  *ngTemplateOutlet=\"$any(cell.fullCellRender); context: { $implicit: cell.value }\"\n                >\n                </ng-container>\n              </ng-container>\n              <ng-template #defaultCell>\n                <div class=\"{{ prefixCls }}-date-value\">{{ cell.content }}</div>\n                <div class=\"{{ prefixCls }}-date-content\">\n                  <ng-container\n                    *ngTemplateOutlet=\"$any(cell.cellRender); context: { $implicit: cell.value }\"\n                  >\n                  </ng-container>\n                </div>\n              </ng-template>\n            </div>\n          </ng-container>\n        </ng-container>\n      </td>\n    </tr>\n  </tbody>\n</table>\n"
                }] }
    ];
    /** @nocollapse */
    YearTableComponent.ctorParameters = function () { return [
        { type: DateHelperService }
    ]; };
    return YearTableComponent;
}(AbstractTable));
if (false) {
    /** @type {?} */
    YearTableComponent.prototype.MAX_ROW;
    /** @type {?} */
    YearTableComponent.prototype.MAX_COL;
    /**
     * @type {?}
     * @private
     */
    YearTableComponent.prototype.dateHelper;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/lib-packer.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var LibPackerModule = /** @class */ (function () {
    function LibPackerModule() {
    }
    LibPackerModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, FormsModule, NzI18nModule, NzTimePickerModule, NzOutletModule],
                    exports: [
                        DateHeaderComponent,
                        DateTableComponent,
                        DecadeHeaderComponent,
                        DecadeTableComponent,
                        MonthHeaderComponent,
                        MonthTableComponent,
                        YearHeaderComponent,
                        YearTableComponent
                    ],
                    declarations: [
                        DateHeaderComponent,
                        DateTableComponent,
                        DecadeHeaderComponent,
                        DecadeTableComponent,
                        MonthHeaderComponent,
                        MonthTableComponent,
                        YearHeaderComponent,
                        YearTableComponent
                    ]
                },] }
    ];
    return LibPackerModule;
}());

/**
 * @fileoverview added by tsickle
 * Generated from: month-picker.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NzMonthPickerComponent = /** @class */ (function () {
    function NzMonthPickerComponent(datePicker) {
        this.datePicker = datePicker;
        this.datePicker.nzMode = 'month';
        this.datePicker.nzFormat = 'yyyy-MM';
    }
    NzMonthPickerComponent.decorators = [
        { type: Directive, args: [{
                    selector: 'nz-month-picker',
                    exportAs: 'nzMonthPicker'
                },] }
    ];
    /** @nocollapse */
    NzMonthPickerComponent.ctorParameters = function () { return [
        { type: NzDatePickerComponent, decorators: [{ type: Optional }, { type: Host }] }
    ]; };
    return NzMonthPickerComponent;
}());
if (false) {
    /** @type {?} */
    NzMonthPickerComponent.prototype.datePicker;
}

/**
 * @fileoverview added by tsickle
 * Generated from: range-picker.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NzRangePickerComponent = /** @class */ (function () {
    function NzRangePickerComponent(datePicker) {
        this.datePicker = datePicker;
        this.datePicker.isRange = true;
        this.datePicker.nzMode = ['date', 'date'];
    }
    NzRangePickerComponent.decorators = [
        { type: Directive, args: [{
                    selector: 'nz-range-picker',
                    exportAs: 'nzRangePicker'
                },] }
    ];
    /** @nocollapse */
    NzRangePickerComponent.ctorParameters = function () { return [
        { type: NzDatePickerComponent, decorators: [{ type: Optional }, { type: Host }] }
    ]; };
    return NzRangePickerComponent;
}());
if (false) {
    /** @type {?} */
    NzRangePickerComponent.prototype.datePicker;
}

/**
 * @fileoverview added by tsickle
 * Generated from: week-picker.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NzWeekPickerComponent = /** @class */ (function () {
    function NzWeekPickerComponent(datePicker) {
        this.datePicker = datePicker;
        this.datePicker.showWeek = true;
        this.datePicker.nzMode = 'week';
        this.datePicker.nzFormat = 'yyyy-ww';
    }
    NzWeekPickerComponent.decorators = [
        { type: Directive, args: [{
                    selector: 'nz-week-picker',
                    exportAs: 'nzWeekPicker'
                },] }
    ];
    /** @nocollapse */
    NzWeekPickerComponent.ctorParameters = function () { return [
        { type: NzDatePickerComponent, decorators: [{ type: Optional }, { type: Host }] }
    ]; };
    return NzWeekPickerComponent;
}());
if (false) {
    /** @type {?} */
    NzWeekPickerComponent.prototype.datePicker;
}

/**
 * @fileoverview added by tsickle
 * Generated from: year-picker.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NzYearPickerComponent = /** @class */ (function () {
    function NzYearPickerComponent(datePicker) {
        this.datePicker = datePicker;
        this.datePicker.nzMode = 'year';
        this.datePicker.nzFormat = 'yyyy';
    }
    NzYearPickerComponent.decorators = [
        { type: Directive, args: [{
                    selector: 'nz-year-picker',
                    exportAs: 'nzYearPicker'
                },] }
    ];
    /** @nocollapse */
    NzYearPickerComponent.ctorParameters = function () { return [
        { type: NzDatePickerComponent, decorators: [{ type: Optional }, { type: Host }] }
    ]; };
    return NzYearPickerComponent;
}());
if (false) {
    /** @type {?} */
    NzYearPickerComponent.prototype.datePicker;
}

/**
 * @fileoverview added by tsickle
 * Generated from: date-picker.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NzDatePickerModule = /** @class */ (function () {
    function NzDatePickerModule() {
    }
    NzDatePickerModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        OverlayModule,
                        LibPackerModule,
                        NzIconModule,
                        NzOverlayModule,
                        NzNoAnimationModule,
                        NzOutletModule,
                        NzTimePickerModule,
                        NzButtonModule,
                        LibPackerModule
                    ],
                    exports: [NzDatePickerComponent, NzRangePickerComponent, NzMonthPickerComponent, NzYearPickerComponent, NzWeekPickerComponent],
                    declarations: [
                        NzPickerComponent,
                        NzDatePickerComponent,
                        NzMonthPickerComponent,
                        NzYearPickerComponent,
                        NzWeekPickerComponent,
                        NzRangePickerComponent,
                        CalendarFooterComponent,
                        InnerPopupComponent,
                        DateRangePopupComponent
                    ]
                },] }
    ];
    return NzDatePickerModule;
}());

/**
 * @fileoverview added by tsickle
 * Generated from: lib/public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: ng-zorro-antd-date-picker.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { LibPackerModule, NzDatePickerComponent, NzDatePickerModule, NzMonthPickerComponent, NzRangePickerComponent, NzWeekPickerComponent, NzYearPickerComponent, PREFIX_CLASS, getTimeConfig, isAllowedDate, isTimeValid, isTimeValidByConfig, transCompatFormat, AbstractPanelHeader as ??AbstractPanelHeader, AbstractTable as ??AbstractTable, CalendarFooterComponent as ??CalendarFooterComponent, DateHeaderComponent as ??DateHeaderComponent, DatePickerService as ??DatePickerService, DateRangePopupComponent as ??DateRangePopupComponent, DateTableComponent as ??DateTableComponent, DecadeHeaderComponent as ??DecadeHeaderComponent, DecadeTableComponent as ??DecadeTableComponent, InnerPopupComponent as ??InnerPopupComponent, MonthHeaderComponent as ??MonthHeaderComponent, MonthTableComponent as ??MonthTableComponent, NzPickerComponent as ??NzPickerComponent, YearHeaderComponent as ??YearHeaderComponent, YearTableComponent as ??YearTableComponent };
//# sourceMappingURL=ng-zorro-antd-date-picker.js.map
