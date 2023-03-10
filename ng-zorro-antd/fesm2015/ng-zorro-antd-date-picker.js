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
import { __decorate, __metadata } from 'tslib';
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
const PREFIX_CLASS = 'ant-picker';
/** @type {?} */
const defaultDisabledTime = {
    /**
     * @return {?}
     */
    nzDisabledHours() {
        return [];
    },
    /**
     * @return {?}
     */
    nzDisabledMinutes() {
        return [];
    },
    /**
     * @return {?}
     */
    nzDisabledSeconds() {
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
    let disabledTimeConfig = disabledTime ? disabledTime(value && value.nativeDate) : ((/** @type {?} */ ({})));
    disabledTimeConfig = Object.assign(Object.assign({}, defaultDisabledTime), disabledTimeConfig);
    return disabledTimeConfig;
}
/**
 * @param {?} value
 * @param {?} disabledTimeConfig
 * @return {?}
 */
function isTimeValidByConfig(value, disabledTimeConfig) {
    /** @type {?} */
    let invalidTime = false;
    if (value) {
        /** @type {?} */
        const hour = value.getHours();
        /** @type {?} */
        const minutes = value.getMinutes();
        /** @type {?} */
        const seconds = value.getSeconds();
        /** @type {?} */
        const disabledHours = disabledTimeConfig.nzDisabledHours();
        if (disabledHours.indexOf(hour) === -1) {
            /** @type {?} */
            const disabledMinutes = disabledTimeConfig.nzDisabledMinutes(hour);
            if (disabledMinutes.indexOf(minutes) === -1) {
                /** @type {?} */
                const disabledSeconds = disabledTimeConfig.nzDisabledSeconds(hour, minutes);
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
    const disabledTimeConfig = getTimeConfig(value, disabledTime);
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
class CalendarFooterComponent {
    /**
     * @param {?} dateHelper
     */
    constructor(dateHelper) {
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
    ngOnChanges(changes) {
        if (changes.disabledDate) {
            this.isTodayDisabled = !!(this.disabledDate && this.disabledDate(this.now.nativeDate));
        }
        if (changes.locale) {
            // NOTE: Compat for DatePipe formatting rules
            /** @type {?} */
            const dateFormat = transCompatFormat(this.locale.dateFormat);
            this.todayTitle = this.dateHelper.format(this.now.nativeDate, dateFormat);
        }
    }
    /**
     * @return {?}
     */
    onClickToday() {
        this.clickToday.emit(this.now.clone()); // To prevent the "now" being modified from outside, we use clone
    }
}
CalendarFooterComponent.decorators = [
    { type: Component, args: [{
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                // tslint:disable-next-line:component-selector
                selector: 'calendar-footer',
                exportAs: 'calendarFooter',
                template: `
    <div class="{{ prefixCls }}-footer">
      <div *ngIf="extraFooter" class="{{ prefixCls }}-footer-extra">
        <ng-container [ngSwitch]="true">
          <ng-container *ngSwitchCase="isTemplateRef(extraFooter)">
            <ng-container *ngTemplateOutlet="$any(extraFooter)"></ng-container>
          </ng-container>
          <ng-container *ngSwitchCase="isNonEmptyString(extraFooter)">
            <span [innerHTML]="extraFooter"></span>
          </ng-container>
        </ng-container>
      </div>
      <a
        *ngIf="showToday && !hasTimePicker"
        class="{{ prefixCls }}-today-btn {{ isTodayDisabled ? prefixCls + '-today-btn-disabled' : '' }}"
        role="button"
        (click)="isTodayDisabled ? null : onClickToday()"
        title="{{ todayTitle }}"
      >
        {{ locale.today }}
      </a>
      <ul *ngIf="hasTimePicker || rangeQuickSelector" class="{{ prefixCls }}-ranges">
        <ng-container *ngTemplateOutlet="rangeQuickSelector"></ng-container>
        <li *ngIf="hasTimePicker && !isRange" class="{{ prefixCls }}-now">
          <a class="{{ prefixCls }}-now-btn" (click)="isTodayDisabled ? null : onClickToday()">
            {{ locale.now }}
          </a>
        </li>
        <li *ngIf="hasTimePicker" class="{{ prefixCls }}-ok">
          <button
            nz-button
            type="button"
            nzType="primary"
            nzSize="small"
            [disabled]="okDisabled"
            (click)="okDisabled ? null : clickOk.emit()"
          >
            {{ locale.ok }}
          </button>
        </li>
      </ul>
    </div>
  `
            }] }
];
/** @nocollapse */
CalendarFooterComponent.ctorParameters = () => [
    { type: DateHelperService }
];
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
class DatePickerService {
    constructor() {
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
    initValue() {
        if (this.isRange) {
            this.setActiveDate([]);
            this.value = this.initialValue = [];
        }
        else {
            this.value = this.initialValue = null;
        }
    }
    /**
     * @param {?=} value
     * @return {?}
     */
    hasValue(value = this.value) {
        if (Array.isArray(value)) {
            return !!value[0] && !!value[1];
        }
        else {
            return !!value;
        }
    }
    /**
     * @param {?=} value
     * @return {?}
     */
    makeValue(value) {
        if (this.isRange) {
            return value ? ((/** @type {?} */ (value))).map((/**
             * @param {?} val
             * @return {?}
             */
            val => new CandyDate(val))) : [];
        }
        else {
            return value ? new CandyDate((/** @type {?} */ (value))) : null;
        }
    }
    /**
     * @param {?} value
     * @param {?=} normalize
     * @return {?}
     */
    setActiveDate(value, normalize = false) {
        if (this.isRange) {
            this.activeDate = normalize ? normalizeRangeValue((/** @type {?} */ (value))) : value;
        }
        else {
            this.activeDate = cloneDate(value);
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setValue(value) {
        this.value = value;
        this.valueChange$.next(this.value);
    }
    /**
     * @param {?=} part
     * @return {?}
     */
    getActiveIndex(part = this.activeInput) {
        return { left: 0, right: 1 }[part];
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.valueChange$.complete();
        this.emitValue$.complete();
        this.inputPartChange$.complete();
    }
}
DatePickerService.decorators = [
    { type: Injectable }
];
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
class DateRangePopupComponent {
    /**
     * @param {?} datePickerService
     * @param {?} cdr
     */
    constructor(datePickerService, cdr) {
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
        (value) => {
            return this.disabledTime && this.disabledTime(value, 'start');
        });
        this.disabledEndTime = (/**
         * @param {?} value
         * @return {?}
         */
        (value) => {
            return this.disabledTime && this.disabledTime(value, 'end');
        });
    }
    /**
     * @return {?}
     */
    get hasTimePicker() {
        return !!this.showTime;
    }
    /**
     * @return {?}
     */
    get hasFooter() {
        return this.showToday || this.hasTimePicker || !!this.extraFooter || !!this.ranges;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.datePickerService.valueChange$.pipe(takeUntil(this.destroy$)).subscribe((/**
         * @return {?}
         */
        () => {
            this.initActiveDate();
            this.cdr.markForCheck();
        }));
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        // Parse showTime options
        if (changes.showTime || changes.disabledTime) {
            if (this.showTime) {
                this.buildTimeOptions();
            }
        }
        if (changes.panelMode) {
            this.endPanelMode = this.panelMode;
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    /**
     * @return {?}
     */
    initActiveDate() {
        /** @type {?} */
        const activeDate = this.datePickerService.hasValue()
            ? this.datePickerService.value
            : this.datePickerService.makeValue((/** @type {?} */ (this.defaultPickerValue)));
        this.datePickerService.setActiveDate(activeDate, !this.showTime);
    }
    /**
     * @return {?}
     */
    onClickOk() {
        /** @type {?} */
        const otherPart = this.datePickerService.activeInput === 'left' ? 'right' : 'left';
        /** @type {?} */
        const selectedValue = this.datePickerService.value;
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
    }
    /**
     * @param {?} value
     * @return {?}
     */
    onClickToday(value) {
        this.changeValueFromSelect(value, !this.showTime);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    onDayHover(value) {
        if (!this.isRange) {
            return;
        }
        /** @type {?} */
        const otherInputIndex = { left: 1, right: 0 }[this.datePickerService.activeInput];
        /** @type {?} */
        const base = (/** @type {?} */ (((/** @type {?} */ (this.datePickerService.value)))[otherInputIndex]));
        if (base) {
            if (base.isBeforeDay(value)) {
                this.hoverValue = [base, value];
            }
            else {
                this.hoverValue = [value, base];
            }
        }
    }
    /**
     * @param {?} mode
     * @param {?=} partType
     * @return {?}
     */
    onPanelModeChange(mode, partType) {
        if (this.isRange) {
            /** @type {?} */
            const index = this.datePickerService.getActiveIndex(partType);
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
    }
    /**
     * @param {?} value
     * @param {?} partType
     * @return {?}
     */
    onActiveDateChange(value, partType) {
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
    }
    /**
     * @param {?} value
     * @param {?=} partType
     * @return {?}
     */
    onSelectTime(value, partType) {
        if (this.isRange) {
            /** @type {?} */
            const newValue = (/** @type {?} */ (cloneDate(this.datePickerService.value)));
            /** @type {?} */
            const index = this.datePickerService.getActiveIndex(partType);
            newValue[index] = this.overrideHms(value, newValue[index]);
            this.datePickerService.setValue(newValue);
        }
        else {
            /** @type {?} */
            const newValue = this.overrideHms(value, (/** @type {?} */ (this.datePickerService.value)));
            this.datePickerService.setValue(newValue); // If not select a date currently, use today
        }
        this.datePickerService.inputPartChange$.next();
        this.buildTimeOptions();
    }
    /**
     * @param {?} value
     * @param {?=} emitValue
     * @return {?}
     */
    changeValueFromSelect(value, emitValue = true) {
        if (this.isRange) {
            /** @type {?} */
            let selectedValue = (/** @type {?} */ (cloneDate(this.datePickerService.value)));
            /** @type {?} */
            let otherPart;
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
    }
    /**
     * @param {?} panelMode
     * @param {?=} partType
     * @return {?}
     */
    getPanelMode(panelMode, partType) {
        if (this.isRange) {
            return (/** @type {?} */ (panelMode[this.datePickerService.getActiveIndex(partType)]));
        }
        else {
            return (/** @type {?} */ (panelMode));
        }
    }
    // Get single value or part value of a range
    /**
     * @param {?=} partType
     * @return {?}
     */
    getValue(partType) {
        if (this.isRange) {
            return (((/** @type {?} */ (this.datePickerService.value))) || [])[this.datePickerService.getActiveIndex(partType)];
        }
        else {
            return (/** @type {?} */ (this.datePickerService.value));
        }
    }
    /**
     * @param {?=} partType
     * @return {?}
     */
    getActiveDate(partType) {
        if (this.isRange) {
            return ((/** @type {?} */ (this.datePickerService.activeDate)))[this.datePickerService.getActiveIndex(partType)];
        }
        else {
            return (/** @type {?} */ (this.datePickerService.activeDate));
        }
    }
    /**
     * @param {?} selectedValue
     * @return {?}
     */
    isOneAllowed(selectedValue) {
        /** @type {?} */
        const index = this.datePickerService.getActiveIndex();
        /** @type {?} */
        const disabledTimeArr = [this.disabledStartTime, this.disabledEndTime];
        return isAllowedDate((/** @type {?} */ (selectedValue[index])), this.disabledDate, disabledTimeArr[index]);
    }
    /**
     * @param {?} selectedValue
     * @return {?}
     */
    isBothAllowed(selectedValue) {
        return (isAllowedDate((/** @type {?} */ (selectedValue[0])), this.disabledDate, this.disabledStartTime) &&
            isAllowedDate((/** @type {?} */ (selectedValue[1])), this.disabledDate, this.disabledEndTime));
    }
    /**
     * @param {?} value
     * @param {?=} isBoth
     * @return {?}
     */
    isAllowed(value, isBoth = false) {
        if (this.isRange) {
            return isBoth ? this.isBothAllowed((/** @type {?} */ (value))) : this.isOneAllowed((/** @type {?} */ (value)));
        }
        else {
            return isAllowedDate((/** @type {?} */ (value)), this.disabledDate, this.disabledTime);
        }
    }
    /**
     * @param {?=} partType
     * @return {?}
     */
    getTimeOptions(partType) {
        if (this.showTime && this.timeOptions) {
            return this.timeOptions instanceof Array ? this.timeOptions[this.datePickerService.getActiveIndex(partType)] : this.timeOptions;
        }
        return null;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    onClickPresetRange(val) {
        /** @type {?} */
        const value = typeof val === 'function' ? val() : val;
        if (value) {
            this.datePickerService.setValue([new CandyDate(value[0]), new CandyDate(value[1])]);
            this.resultOk.emit();
        }
    }
    /**
     * @return {?}
     */
    onPresetRangeMouseLeave() {
        this.clearHoverValue();
    }
    /**
     * @param {?} val
     * @return {?}
     */
    onHoverPresetRange(val) {
        if (typeof val !== 'function') {
            this.hoverValue = [new CandyDate(val[0]), new CandyDate(val[1])];
        }
    }
    /**
     * @param {?=} obj
     * @return {?}
     */
    getObjectKeys(obj) {
        return obj ? Object.keys(obj) : [];
    }
    /**
     * @param {?} partType
     * @return {?}
     */
    show(partType) {
        /** @type {?} */
        const hide = this.showTime && this.isRange && this.datePickerService.activeInput !== partType;
        return !hide;
    }
    /**
     * @private
     * @return {?}
     */
    clearHoverValue() {
        this.hoverValue = [];
    }
    /**
     * @private
     * @return {?}
     */
    buildTimeOptions() {
        if (this.showTime) {
            /** @type {?} */
            const showTime = typeof this.showTime === 'object' ? this.showTime : {};
            if (this.isRange) {
                /** @type {?} */
                const value = (/** @type {?} */ (this.datePickerService.value));
                this.timeOptions = [this.overrideTimeOptions(showTime, value[0], 'start'), this.overrideTimeOptions(showTime, value[1], 'end')];
            }
            else {
                this.timeOptions = this.overrideTimeOptions(showTime, (/** @type {?} */ (this.datePickerService.value)));
            }
        }
        else {
            this.timeOptions = null;
        }
    }
    /**
     * @private
     * @param {?} origin
     * @param {?} value
     * @param {?=} partial
     * @return {?}
     */
    overrideTimeOptions(origin, value, partial) {
        /** @type {?} */
        let disabledTimeFn;
        if (partial) {
            disabledTimeFn = partial === 'start' ? this.disabledStartTime : this.disabledEndTime;
        }
        else {
            disabledTimeFn = this.disabledTime;
        }
        return Object.assign(Object.assign({}, origin), getTimeConfig(value, disabledTimeFn));
    }
    /**
     * @private
     * @param {?} newValue
     * @param {?} oldValue
     * @return {?}
     */
    overrideHms(newValue, oldValue) {
        // tslint:disable-next-line:no-parameter-reassignment
        newValue = newValue || new CandyDate();
        // tslint:disable-next-line:no-parameter-reassignment
        oldValue = oldValue || new CandyDate();
        return oldValue.setHms(newValue.getHours(), newValue.getMinutes(), newValue.getSeconds());
    }
}
DateRangePopupComponent.decorators = [
    { type: Component, args: [{
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                // tslint:disable-next-line:component-selector
                selector: 'date-range-popup',
                exportAs: 'dateRangePopup',
                template: `
    <ng-container *ngIf="isRange; else singlePanel">
      <div class="{{ prefixCls }}-range-wrapper {{ prefixCls }}-date-range-wrapper">
        <div class="{{ prefixCls }}-range-arrow" [ngStyle]="datePickerService?.arrowPositionStyle!"></div>
        <div class="{{ prefixCls }}-panel-container">
          <div class="{{ prefixCls }}-panels">
            <ng-container *ngTemplateOutlet="tplRangePart; context: { partType: 'left' }"></ng-container>
            <ng-container *ngTemplateOutlet="tplRangePart; context: { partType: 'right' }"></ng-container>
          </div>
          <ng-container *ngTemplateOutlet="tplFooter"></ng-container>
        </div>
      </div>
    </ng-container>
    <ng-template #singlePanel>
      <div
        class="{{ prefixCls }}-panel-container {{ showWeek ? prefixCls + '-week-number' : '' }} {{
          hasTimePicker ? prefixCls + '-time' : ''
        }} {{ isRange ? prefixCls + '-range' : '' }}"
      >
        <div class="{{ prefixCls }}-panel" tabindex="-1">
          <!-- Single ONLY -->
          <ng-container *ngTemplateOutlet="tplInnerPopup"></ng-container>
          <ng-container *ngTemplateOutlet="tplFooter"></ng-container>
        </div>
      </div>
    </ng-template>

    <ng-template #tplInnerPopup let-partType="partType">
      <!-- TODO(@wenqi73) [selectedValue] [hoverValue] types-->
      <inner-popup
        *ngIf="show(partType)"
        [showWeek]="showWeek"
        [endPanelMode]="getPanelMode(endPanelMode, partType)"
        [partType]="partType"
        [locale]="locale!"
        [showTimePicker]="hasTimePicker"
        [timeOptions]="getTimeOptions(partType)"
        [panelMode]="getPanelMode(panelMode, partType)"
        (panelModeChange)="onPanelModeChange($event, partType)"
        [activeDate]="getActiveDate(partType)"
        [value]="getValue(partType)"
        [disabledDate]="disabledDate"
        [dateRender]="dateRender"
        [selectedValue]="$any(datePickerService?.value)"
        [hoverValue]="$any(hoverValue)"
        (dayHover)="onDayHover($event)"
        (selectDate)="changeValueFromSelect($event, !showTime)"
        (selectTime)="onSelectTime($event, partType)"
        (headerChange)="onActiveDateChange($event, partType)"
      ></inner-popup>
    </ng-template>

    <ng-template #tplFooter>
      <calendar-footer
        *ngIf="hasFooter"
        [locale]="locale!"
        [isRange]="isRange"
        [showToday]="showToday"
        [hasTimePicker]="hasTimePicker"
        [okDisabled]="!isAllowed($any(datePickerService?.value))"
        [extraFooter]="extraFooter"
        [rangeQuickSelector]="ranges ? tplRangeQuickSelector : null"
        (clickOk)="onClickOk()"
        (clickToday)="onClickToday($event)"
      ></calendar-footer>
    </ng-template>

    <ng-template #tplRangePart let-partType="partType">
      <div class="{{ prefixCls }}-panel">
        <ng-container *ngTemplateOutlet="tplInnerPopup; context: { partType: partType }"></ng-container>
      </div>
    </ng-template>

    <!-- Range ONLY: Range Quick Selector -->
    <ng-template #tplRangeQuickSelector>
      <li
        *ngFor="let name of getObjectKeys(ranges)"
        class="{{ prefixCls }}-preset"
        (click)="onClickPresetRange(ranges![name])"
        (mouseenter)="onHoverPresetRange(ranges![name])"
        (mouseleave)="onPresetRangeMouseLeave()"
      >
        <span class="ant-tag ant-tag-blue">{{ name }}</span>
      </li>
    </ng-template>
  `
            }] }
];
/** @nocollapse */
DateRangePopupComponent.ctorParameters = () => [
    { type: DatePickerService },
    { type: ChangeDetectorRef }
];
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
class NzPickerComponent {
    /**
     * @param {?} elementRef
     * @param {?} dateHelper
     * @param {?} changeDetector
     * @param {?} datePickerService
     * @param {?} doc
     */
    constructor(elementRef, dateHelper, changeDetector, datePickerService, doc) {
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
    /**
     * @return {?}
     */
    get realOpenState() {
        // The value that really decide the open state of overlay
        return this.isOpenHandledByUser() ? !!this.open : this.overlayOpen;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.inputSize = Math.max(10, this.format.length) + 2;
        this.datePickerService.valueChange$.pipe(takeUntil(this.destroy$)).subscribe((/**
         * @return {?}
         */
        () => {
            this.updateInputValue();
            this.changeDetector.markForCheck();
        }));
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        if (this.autoFocus) {
            this.focus();
        }
        if (this.isRange) {
            fromEvent(window, 'resize')
                .pipe(takeUntil(this.destroy$))
                .subscribe((/**
             * @return {?}
             */
            () => {
                this.resetInputWidthAndArrowLeft();
            }));
        }
        this.datePickerService.inputPartChange$.pipe(takeUntil(this.destroy$)).subscribe((/**
         * @param {?} partType
         * @return {?}
         */
        partType => {
            var _a;
            if (partType) {
                this.datePickerService.activeInput = partType;
            }
            this.datePickerService.arrowPositionStyle = {
                left: this.datePickerService.activeInput === 'left' ? '0px' : `${this.arrowLeft}px`
            };
            this.activeBarStyle = Object.assign(Object.assign(Object.assign({}, this.activeBarStyle), this.datePickerService.arrowPositionStyle), { width: `${this.inputWidth}px` });
            if (this.document.activeElement !== this.getInput(this.datePickerService.activeInput)) {
                this.focus();
            }
            (_a = this.panel) === null || _a === void 0 ? void 0 : _a.cdr.markForCheck();
            this.changeDetector.markForCheck();
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.open) {
            this.animationStart();
        }
    }
    /**
     * @return {?}
     */
    resetInputWidthAndArrowLeft() {
        var _a, _b, _c;
        this.inputWidth = ((_b = (_a = this.rangePickerInputs) === null || _a === void 0 ? void 0 : _a.first) === null || _b === void 0 ? void 0 : _b.nativeElement.offsetWidth) || 0;
        this.arrowLeft = this.inputWidth + ((_c = this.separatorElement) === null || _c === void 0 ? void 0 : _c.nativeElement.offsetWidth) || 0;
    }
    /**
     * @param {?=} partType
     * @return {?}
     */
    getInput(partType) {
        return this.isRange
            ? partType === 'left'
                ? this.rangePickerInputs.first.nativeElement
                : this.rangePickerInputs.last.nativeElement
            : (/** @type {?} */ (this.pickerInput)).nativeElement;
    }
    /**
     * @return {?}
     */
    focus() {
        this.getInput(this.datePickerService.activeInput).focus(); // Focus on the first input
    }
    /**
     * @param {?=} partType
     * @return {?}
     */
    onFocus(partType) {
        if (partType) {
            this.datePickerService.inputPartChange$.next(partType);
        }
        this.focusChange.emit(true);
    }
    /**
     * @return {?}
     */
    onBlur() {
        this.focusChange.emit(false);
    }
    // Show overlay content
    /**
     * @return {?}
     */
    showOverlay() {
        if (!this.realOpenState) {
            this.resetInputWidthAndArrowLeft();
            this.overlayOpen = true;
            this.animationStart();
            this.focus();
            this.openChange.emit(true);
        }
    }
    /**
     * @return {?}
     */
    hideOverlay() {
        if (this.realOpenState) {
            this.overlayOpen = false;
            this.openChange.emit(false);
            this.focus();
        }
    }
    /**
     * @return {?}
     */
    showClear() {
        return !this.disabled && !this.isEmptyValue(this.datePickerService.value) && !!this.allowClear;
    }
    /**
     * @param {?} event
     * @param {?=} partType
     * @return {?}
     */
    onClickInputBox(event, partType) {
        event.stopPropagation();
        if (!this.disabled && !this.isOpenHandledByUser()) {
            this.showOverlay();
        }
        this.onFocus(partType);
    }
    /**
     * @return {?}
     */
    onClickBackdrop() {
        if (this.panel.isAllowed((/** @type {?} */ (this.datePickerService.value)), true)) {
            this.updateInputValue();
            this.datePickerService.emitValue$.next();
        }
        else {
            this.datePickerService.setValue((/** @type {?} */ (this.datePickerService.initialValue)));
            this.hideOverlay();
        }
    }
    /**
     * @return {?}
     */
    onOverlayDetach() {
        this.hideOverlay();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onOverlayKeydown(event) {
        if (event.key === 'Escape') {
            this.datePickerService.setValue((/** @type {?} */ (this.datePickerService.initialValue)));
        }
    }
    // NOTE: A issue here, the first time position change, the animation will not be triggered.
    // Because the overlay's "positionChange" event is emitted after the content's full shown up.
    // All other components like "nz-dropdown" which depends on overlay also has the same issue.
    // See: https://github.com/NG-ZORRO/ng-zorro-antd/issues/1429
    /**
     * @param {?} position
     * @return {?}
     */
    onPositionChange(position) {
        this.currentPositionX = position.connectionPair.originX;
        this.currentPositionY = position.connectionPair.originY;
        this.changeDetector.detectChanges(); // Take side-effects to position styles
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onClickClear(event) {
        event.preventDefault();
        event.stopPropagation();
        this.datePickerService.setValue(this.isRange ? [] : null);
        this.datePickerService.emitValue$.next();
    }
    /**
     * @return {?}
     */
    updateInputValue() {
        /** @type {?} */
        const newValue = this.datePickerService.value;
        if (this.isRange) {
            this.inputValue = newValue ? ((/** @type {?} */ (newValue))).map((/**
             * @param {?} v
             * @return {?}
             */
            v => this.formatValue(v))) : ['', ''];
        }
        else {
            this.inputValue = this.formatValue((/** @type {?} */ (newValue)));
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    formatValue(value) {
        return this.dateHelper.format(value && ((/** @type {?} */ (value))).nativeDate, this.format);
    }
    /**
     * @param {?} event
     * @param {?=} emitValue
     * @return {?}
     */
    onInputKeyup(event, emitValue = false) {
        if (!this.realOpenState) {
            this.showOverlay();
            return;
        }
        /** @type {?} */
        const date = this.checkValidInputDate((/** @type {?} */ (((/** @type {?} */ (event))).target)));
        if (this.panel && date) {
            this.panel.changeValueFromSelect(date, emitValue);
        }
    }
    /**
     * @private
     * @param {?} inputTarget
     * @return {?}
     */
    checkValidInputDate(inputTarget) {
        /** @type {?} */
        const input = ((/** @type {?} */ (inputTarget))).value;
        /** @type {?} */
        const date = new CandyDate(this.dateHelper.parseDate(input, this.format));
        if (!date.isValid() || input !== this.dateHelper.format(date.nativeDate, this.format)) {
            return null;
        }
        return date;
    }
    /**
     * @param {?=} partType
     * @return {?}
     */
    getPlaceholder(partType) {
        return this.isRange ? this.placeholder[this.datePickerService.getActiveIndex((/** @type {?} */ (partType)))] : ((/** @type {?} */ (this.placeholder)));
    }
    /**
     * @param {?} value
     * @return {?}
     */
    isEmptyValue(value) {
        if (value === null) {
            return true;
        }
        else if (this.isRange) {
            return !value || !Array.isArray(value) || value.every((/**
             * @param {?} val
             * @return {?}
             */
            val => !val));
        }
        else {
            return !value;
        }
    }
    // Whether open state is permanently controlled by user himself
    /**
     * @return {?}
     */
    isOpenHandledByUser() {
        return this.open !== undefined;
    }
    /**
     * @return {?}
     */
    animationStart() {
        if (this.realOpenState) {
            this.animationOpenState = true;
        }
    }
    /**
     * @return {?}
     */
    animationDone() {
        if (!this.realOpenState) {
            this.animationOpenState = false;
            this.changeDetector.markForCheck();
        }
    }
}
NzPickerComponent.decorators = [
    { type: Component, args: [{
                encapsulation: ViewEncapsulation.None,
                selector: '[nz-picker]',
                exportAs: 'nzPicker',
                template: `
    <!-- Content of single picker -->
    <div *ngIf="!isRange" class="{{ prefixCls }}-input">
      <input
        #pickerInput
        [class.ant-input-disabled]="disabled"
        [disabled]="disabled"
        [readOnly]="inputReadOnly"
        [(ngModel)]="inputValue"
        placeholder="{{ getPlaceholder() }}"
        [size]="inputSize"
        (focus)="onFocus()"
        (blur)="onBlur()"
        (input)="onInputKeyup($event)"
        (keyup.enter)="onInputKeyup($event, true)"
      />
      <ng-container *ngTemplateOutlet="tplRightRest"></ng-container>
    </div>

    <!-- Content of range picker -->
    <ng-container *ngIf="isRange">
      <div class="{{ prefixCls }}-input">
        <ng-container *ngTemplateOutlet="tplRangeInput; context: { partType: 'left' }"></ng-container>
      </div>
      <div #separatorElement class="{{ prefixCls }}-range-separator">
        <span class="{{ prefixCls }}-separator">
          <ng-container *ngIf="separator; else defaultSeparator">{{ separator }}</ng-container>
        </span>
        <ng-template #defaultSeparator>
          <i nz-icon nzType="swap-right" nzTheme="outline"></i>
        </ng-template>
      </div>
      <div class="{{ prefixCls }}-input">
        <ng-container *ngTemplateOutlet="tplRangeInput; context: { partType: 'right' }"></ng-container>
      </div>
      <ng-container *ngTemplateOutlet="tplRightRest"></ng-container>
    </ng-container>
    <!-- Input for Range ONLY -->
    <ng-template #tplRangeInput let-partType="partType">
      <input
        #rangePickerInput
        [disabled]="disabled"
        [readOnly]="inputReadOnly"
        [size]="inputSize"
        (click)="onClickInputBox($event, partType)"
        (blur)="onBlur()"
        (input)="onInputKeyup($event)"
        (focus)="onFocus(partType)"
        (keyup.enter)="onInputKeyup($event, true)"
        [(ngModel)]="inputValue[datePickerService.getActiveIndex(partType)]"
        placeholder="{{ getPlaceholder(partType) }}"
      />
    </ng-template>

    <!-- Right operator icons -->
    <ng-template #tplRightRest>
      <div class="{{ prefixCls }}-active-bar" [ngStyle]="activeBarStyle"></div>
      <span *ngIf="showClear()" class="{{ prefixCls }}-clear" (click)="onClickClear($event)">
        <i nz-icon nzType="close-circle" nzTheme="fill"></i>
      </span>
      <span class="{{ prefixCls }}-suffix">
        <ng-container *nzStringTemplateOutlet="suffixIcon; let suffixIcon">
          <i nz-icon [nzType]="suffixIcon"></i>
        </ng-container>
      </span>
    </ng-template>

    <!-- Overlay -->
    <ng-template
      cdkConnectedOverlay
      nzConnectedOverlay
      [cdkConnectedOverlayOrigin]="origin"
      [cdkConnectedOverlayOpen]="realOpenState"
      [cdkConnectedOverlayHasBackdrop]="!isOpenHandledByUser()"
      [cdkConnectedOverlayPositions]="overlayPositions"
      [cdkConnectedOverlayTransformOriginOn]="'.ant-picker-wrapper'"
      (positionChange)="onPositionChange($event)"
      (backdropClick)="onClickBackdrop()"
      (detach)="onOverlayDetach()"
      (overlayKeydown)="onOverlayKeydown($event)"
    >
      <div
        class="ant-picker-wrapper"
        [nzNoAnimation]="noAnimation"
        [@slideMotion]="'enter'"
        (@slideMotion.done)="animationDone()"
        style="position: relative;"
      >
        <div
          class="{{ prefixCls }}-dropdown {{ dropdownClassName }}"
          [class.ant-picker-dropdown-placement-bottomLeft]="currentPositionY === 'bottom' && currentPositionX === 'start'"
          [class.ant-picker-dropdown-placement-topLeft]="currentPositionY === 'top' && currentPositionX === 'start'"
          [class.ant-picker-dropdown-placement-bottomRight]="currentPositionY === 'bottom' && currentPositionX === 'end'"
          [class.ant-picker-dropdown-placement-topRight]="currentPositionY === 'top' && currentPositionX === 'end'"
          [class.ant-picker-dropdown-range]="isRange"
          [ngStyle]="popupStyle"
        >
          <!-- Compatible for overlay that not support offset dynamically and immediately -->
          <ng-content></ng-content>
        </div>
      </div>
    </ng-template>
  `,
                animations: [slideMotion],
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
NzPickerComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: DateHelperService },
    { type: ChangeDetectorRef },
    { type: DatePickerService },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
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
const POPUP_STYLE_PATCH = { position: 'relative' };
// Aim to override antd's style to support overlay's position strategy (position:absolute will cause it not working beacuse the overlay can't get the height/width of it's content)
/** @type {?} */
const NZ_CONFIG_COMPONENT_NAME = 'datePicker';
/**
 * The base picker for all common APIs
 */
class NzDatePickerComponent {
    // Use picker's real open state to let re-render the picker's content when shown up
    /**
     * @param {?} nzConfigService
     * @param {?} datePickerService
     * @param {?} i18n
     * @param {?} cdr
     * @param {?} renderer
     * @param {?} elementRef
     * @param {?} dateHelper
     * @param {?=} noAnimation
     */
    constructor(nzConfigService, datePickerService, i18n, cdr, renderer, elementRef, dateHelper, noAnimation) {
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
        () => void 0);
        this.onTouchedFn = (/**
         * @return {?}
         */
        () => void 0);
    }
    /**
     * @return {?}
     */
    get nzShowTime() {
        return this.showTime;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set nzShowTime(value) {
        this.showTime = typeof value === 'object' ? value : toBoolean(value);
    }
    /**
     * @return {?}
     */
    get realOpenState() {
        return this.picker.animationOpenState;
    } // Use picker's real open state to let re-render the picker's content when shown up
    /**
     * @return {?}
     */
    ngOnInit() {
        // Subscribe the every locale change if the nzLocale is not handled by user
        if (!this.nzLocale) {
            this.i18n.localeChange.pipe(takeUntil(this.destroyed$)).subscribe((/**
             * @return {?}
             */
            () => this.setLocale()));
        }
        // Default value
        this.datePickerService.isRange = this.isRange;
        this.datePickerService.initValue();
        this.datePickerService.emitValue$.pipe(takeUntil(this.destroyed$)).subscribe((/**
         * @param {?} _
         * @return {?}
         */
        _ => {
            /** @type {?} */
            const value = this.datePickerService.value;
            this.datePickerService.initialValue = cloneDate(value);
            if (this.isRange) {
                /** @type {?} */
                const vAsRange = (/** @type {?} */ (value));
                if (vAsRange.length) {
                    this.onChangeFn([vAsRange[0].nativeDate, vAsRange[1].nativeDate]);
                }
                else {
                    this.onChangeFn([]);
                }
            }
            else {
                if (value) {
                    this.onChangeFn(((/** @type {?} */ (value))).nativeDate);
                }
                else {
                    this.onChangeFn(null);
                }
            }
            this.onTouchedFn();
            // When value emitted, overlay will be closed
            this.picker.hideOverlay();
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
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.nzPopupStyle) {
            // Always assign the popup style patch
            this.nzPopupStyle = this.nzPopupStyle ? Object.assign(Object.assign({}, this.nzPopupStyle), POPUP_STYLE_PATCH) : POPUP_STYLE_PATCH;
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
            warnDeprecation(`'nzStyle' in DatePicker is going to be removed in 10.0.0. Please use CSS style attribute like <nz-date-picker style="..."></nz-date-picker> instead.`);
        }
        if (changes.nzClassName) {
            warnDeprecation(`'nzClassName' in DatePicker is going to be removed in 10.0.0. Please use CSS class attribute like <nz-date-picker class="..."></nz-date-picker> instead.`);
        }
        if (changes.nzMode) {
            this.setPanelMode();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
    /**
     * @return {?}
     */
    setPanelMode() {
        if (!this.nzMode) {
            this.nzMode = this.isRange ? ['date', 'date'] : 'date';
        }
    }
    /**
     * Triggered when overlayOpen changes (different with realOpenState)
     * @param {?} open The overlayOpen in picker component
     * @return {?}
     */
    onOpenChange(open) {
        this.nzOnOpenChange.emit(open);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this.setValue(value);
        this.cdr.markForCheck();
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChangeFn = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouchedFn = fn;
    }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.nzDisabled = isDisabled;
        this.cdr.markForCheck();
    }
    // ------------------------------------------------------------------------
    // | Internal methods
    // ------------------------------------------------------------------------
    // Reload locale from i18n with side effects
    /**
     * @private
     * @return {?}
     */
    setLocale() {
        this.nzLocale = this.i18n.getLocaleData('DatePicker', {});
        this.setDefaultPlaceHolder();
        this.cdr.markForCheck();
    }
    /**
     * @private
     * @return {?}
     */
    setDefaultPlaceHolder() {
        if (!this.isCustomPlaceHolder && this.nzLocale) {
            this.nzPlaceHolder = this.isRange ? ((/** @type {?} */ (this.nzLocale.lang.rangePlaceholder))) : (/** @type {?} */ (this.nzLocale.lang.placeholder));
        }
    }
    // Safe way of setting value with default
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    setValue(value) {
        /** @type {?} */
        const newValue = this.datePickerService.makeValue(value);
        this.datePickerService.setValue(newValue);
        this.datePickerService.initialValue = newValue;
    }
    /**
     * @return {?}
     */
    get realShowToday() {
        // Range only support in single date picker
        return this.nzMode === 'date' && this.nzShowToday;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    onFocusChange(value) {
        this.focused = value;
        // TODO: avoid autoFocus cause change after checked error
        if (this.focused) {
            this.renderer.addClass(this.elementRef.nativeElement, 'ant-picker-focused');
        }
        else {
            this.renderer.removeClass(this.elementRef.nativeElement, 'ant-picker-focused');
        }
    }
    /**
     * @param {?} panelMode
     * @return {?}
     */
    onPanelModeChange(panelMode) {
        // this.nzMode = panelMode;
        this.nzOnPanelChange.emit(panelMode);
    }
    // Emit nzOnCalendarChange when select date by nz-range-picker
    /**
     * @param {?} value
     * @return {?}
     */
    onCalendarChange(value) {
        if (this.isRange && Array.isArray(value)) {
            /** @type {?} */
            const rangeValue = value.filter((/**
             * @param {?} x
             * @return {?}
             */
            x => x instanceof CandyDate)).map((/**
             * @param {?} x
             * @return {?}
             */
            x => (/** @type {?} */ (x)).nativeDate));
            this.nzOnCalendarChange.emit(rangeValue);
        }
    }
    // Emitted when done with date selecting
    /**
     * @return {?}
     */
    onResultOk() {
        if (this.isRange) {
            /** @type {?} */
            const value = (/** @type {?} */ (this.datePickerService.value));
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
    }
}
NzDatePickerComponent.decorators = [
    { type: Component, args: [{
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'nz-date-picker,nz-week-picker,nz-month-picker,nz-year-picker,nz-range-picker',
                exportAs: 'nzDatePicker',
                template: `
    <div
      nz-picker
      [isRange]="isRange"
      [open]="nzOpen"
      [separator]="nzSeparator"
      [disabled]="nzDisabled"
      [inputReadOnly]="nzInputReadOnly"
      [format]="nzFormat"
      [allowClear]="nzAllowClear"
      [autoFocus]="nzAutoFocus"
      [placeholder]="nzPlaceHolder"
      [ngClass]="nzClassName"
      style="display: inherit; align-items: center; width: 100%;"
      [ngStyle]="nzStyle"
      [dropdownClassName]="nzDropdownClassName"
      [popupStyle]="nzPopupStyle"
      [noAnimation]="!!noAnimation?.nzNoAnimation"
      [suffixIcon]="nzSuffixIcon"
      (openChange)="onOpenChange($event)"
      (focusChange)="onFocusChange($event)"
    >
      <date-range-popup
        *ngIf="realOpenState"
        [isRange]="isRange"
        [defaultPickerValue]="nzDefaultPickerValue"
        [showWeek]="showWeek"
        [panelMode]="nzMode"
        (panelModeChange)="onPanelModeChange($event)"
        (calendarChange)="onCalendarChange($event)"
        [locale]="nzLocale?.lang!"
        [showToday]="realShowToday"
        [showTime]="nzShowTime"
        [format]="nzFormat"
        [dateRender]="nzDateRender"
        [disabledDate]="nzDisabledDate"
        [disabledTime]="nzDisabledTime"
        [placeholder]="nzPlaceHolder"
        [extraFooter]="extraFooter"
        [ranges]="nzRanges"
        (resultOk)="onResultOk()"
      ></date-range-popup>
    </div>
  `,
                host: {
                    '[class.ant-picker]': `true`,
                    '[class.ant-picker-range]': `isRange`,
                    '[class.ant-picker-large]': `nzSize === 'large'`,
                    '[class.ant-picker-small]': `nzSize === 'small'`,
                    '[class.ant-picker-disabled]': `nzDisabled`,
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
                        () => NzDatePickerComponent))
                    }
                ]
            }] }
];
/** @nocollapse */
NzDatePickerComponent.ctorParameters = () => [
    { type: NzConfigService },
    { type: DatePickerService },
    { type: NzI18nService },
    { type: ChangeDetectorRef },
    { type: Renderer2 },
    { type: ElementRef },
    { type: DateHelperService },
    { type: NzNoAnimationDirective, decorators: [{ type: Host }, { type: Optional }] }
];
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
class InnerPopupComponent {
    constructor() {
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
     * @param {?} direction
     * @param {?} panelMode
     * @return {?}
     */
    enablePrevNext(direction, panelMode) {
        if (!this.showTimePicker &&
            panelMode === this.endPanelMode &&
            ((this.partType === 'left' && direction === 'next') || (this.partType === 'right' && direction === 'prev'))) {
            return false;
        }
        return true;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    onSelectTime(date) {
        this.selectTime.emit(new CandyDate(date));
    }
    // The value real changed to outside
    /**
     * @param {?} date
     * @return {?}
     */
    onSelectDate(date) {
        /** @type {?} */
        const value = date instanceof CandyDate ? date : new CandyDate(date);
        /** @type {?} */
        const timeValue = this.timeOptions && this.timeOptions.nzDefaultOpenValue;
        // Display timeValue when value is null
        if (!this.value && timeValue) {
            value.setHms(timeValue.getHours(), timeValue.getMinutes(), timeValue.getSeconds());
        }
        this.selectDate.emit(value);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    onChooseMonth(value) {
        this.activeDate = this.activeDate.setMonth(value.getMonth());
        if (this.endPanelMode === 'month') {
            this.value = value;
            this.selectDate.emit(value);
        }
        else {
            this.headerChange.emit(value);
            this.panelModeChange.emit(this.endPanelMode);
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    onChooseYear(value) {
        this.activeDate = this.activeDate.setYear(value.getYear());
        if (this.endPanelMode === 'year') {
            this.value = value;
            this.selectDate.emit(value);
        }
        else {
            this.headerChange.emit(value);
            this.panelModeChange.emit(this.endPanelMode);
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    onChooseDecade(value) {
        this.activeDate = this.activeDate.setYear(value.getYear());
        if (this.endPanelMode === 'decade') {
            this.value = value;
            this.selectDate.emit(value);
        }
        else {
            this.headerChange.emit(value);
            this.panelModeChange.emit('year');
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.activeDate && !changes.activeDate.currentValue) {
            this.activeDate = new CandyDate();
        }
        // New Antd vesion has merged 'date' ant 'time' to one panel,
        // So there is not 'time' panel
        if (changes.panelMode && changes.panelMode.currentValue === 'time') {
            this.panelMode = 'date';
        }
    }
}
InnerPopupComponent.decorators = [
    { type: Component, args: [{
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                // tslint:disable-next-line:component-selector
                selector: 'inner-popup',
                exportAs: 'innerPopup',
                template: `
    <div [class.ant-picker-datetime-panel]="showTimePicker">
      <div class="{{ prefixCls }}-{{ panelMode }}-panel">
        <ng-container [ngSwitch]="panelMode">
          <ng-container *ngSwitchCase="'decade'">
            <decade-header
              [(value)]="activeDate"
              [locale]="locale!"
              [showSuperPreBtn]="enablePrevNext('prev', 'decade')"
              [showSuperNextBtn]="enablePrevNext('next', 'decade')"
              [showNextBtn]="false"
              [showPreBtn]="false"
              (panelModeChange)="panelModeChange.emit($event)"
              (valueChange)="headerChange.emit($event)"
            >
            </decade-header>
            <div class="{{ prefixCls }}-body">
              <decade-table
                [showWeek]="showWeek"
                [activeDate]="activeDate"
                [value]="value"
                (valueChange)="onChooseDecade($event)"
                [disabledDate]="disabledDate"
              ></decade-table>
            </div>
          </ng-container>
          <ng-container *ngSwitchCase="'year'">
            <year-header
              [(value)]="activeDate"
              [locale]="locale!"
              [showSuperPreBtn]="enablePrevNext('prev', 'year')"
              [showSuperNextBtn]="enablePrevNext('next', 'year')"
              [showNextBtn]="false"
              [showPreBtn]="false"
              (panelModeChange)="panelModeChange.emit($event)"
              (valueChange)="headerChange.emit($event)"
            >
            </year-header>
            <div class="{{ prefixCls }}-body">
              <year-table
                [showWeek]="showWeek"
                [activeDate]="activeDate"
                [value]="value"
                (valueChange)="onChooseYear($event)"
                [disabledDate]="disabledDate"
              ></year-table>
            </div>
          </ng-container>
          <ng-container *ngSwitchCase="'month'">
            <month-header
              [(value)]="activeDate"
              [locale]="locale!"
              [showNextBtn]="false"
              [showPreBtn]="false"
              (panelModeChange)="panelModeChange.emit($event)"
              (valueChange)="headerChange.emit($event)"
            >
            </month-header>
            <div class="{{ prefixCls }}-body">
              <month-table
                [showWeek]="showWeek"
                [value]="value"
                [activeDate]="activeDate"
                [disabledDate]="disabledDate"
                (valueChange)="onChooseMonth($event)"
              ></month-table>
            </div>
          </ng-container>

          <ng-container *ngSwitchDefault>
            <date-header
              [(value)]="activeDate"
              [locale]="locale!"
              [showSuperPreBtn]="enablePrevNext('prev', 'date')"
              [showSuperNextBtn]="enablePrevNext('next', 'date')"
              [showPreBtn]="enablePrevNext('prev', 'date')"
              [showNextBtn]="enablePrevNext('next', 'date')"
              (panelModeChange)="panelModeChange.emit($event)"
              (valueChange)="headerChange.emit($event)"
            >
            </date-header>
            <div class="{{ prefixCls }}-body">
              <date-table
                [locale]="locale!"
                [showWeek]="showWeek"
                [value]="value"
                [activeDate]="activeDate"
                (valueChange)="onSelectDate($event)"
                [disabledDate]="disabledDate"
                [cellRender]="dateRender"
                [selectedValue]="selectedValue"
                [hoverValue]="hoverValue"
                (dayHover)="dayHover.emit($event)"
              ></date-table>
            </div>
          </ng-container>
        </ng-container>
      </div>
      <ng-container *ngIf="showTimePicker && timeOptions">
        <nz-time-picker-panel
          [nzInDatePicker]="true"
          [ngModel]="value?.nativeDate"
          (ngModelChange)="onSelectTime($event)"
          [format]="$any(timeOptions.nzFormat)"
          [nzHourStep]="$any(timeOptions.nzHourStep)"
          [nzMinuteStep]="$any(timeOptions.nzMinuteStep)"
          [nzSecondStep]="$any(timeOptions.nzSecondStep)"
          [nzDisabledHours]="$any(timeOptions.nzDisabledHours)"
          [nzDisabledMinutes]="$any(timeOptions.nzDisabledMinutes)"
          [nzDisabledSeconds]="$any(timeOptions.nzDisabledSeconds)"
          [nzHideDisabledOptions]="!!timeOptions.nzHideDisabledOptions"
          [nzDefaultOpenValue]="$any(timeOptions.nzDefaultOpenValue)"
          [nzUse12Hours]="!!timeOptions.nzUse12Hours"
          [nzAddOn]="$any(timeOptions.nzAddOn)"
        ></nz-time-picker-panel>
        <!-- use [opened] to trigger time panel \`initPosition()\` -->
      </ng-container>
    </div>
  `
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
// tslint:disable-next-line:directive-class-suffix
class AbstractPanelHeader {
    constructor() {
        this.prefixCls = `ant-picker-header`;
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
    superPreviousTitle() {
        return this.locale.previousYear;
    }
    /**
     * @return {?}
     */
    previousTitle() {
        return this.locale.previousMonth;
    }
    /**
     * @return {?}
     */
    superNextTitle() {
        return this.locale.nextYear;
    }
    /**
     * @return {?}
     */
    nextTitle() {
        return this.locale.nextMonth;
    }
    /**
     * @return {?}
     */
    superPrevious() {
        this.changeValue(this.value.addYears(-1));
    }
    /**
     * @return {?}
     */
    superNext() {
        this.changeValue(this.value.addYears(1));
    }
    /**
     * @return {?}
     */
    previous() {
        this.changeValue(this.value.addMonths(-1));
    }
    /**
     * @return {?}
     */
    next() {
        this.changeValue(this.value.addMonths(1));
    }
    /**
     * @param {?} value
     * @return {?}
     */
    changeValue(value) {
        if (this.value !== value) {
            this.value = value;
            this.valueChange.emit(this.value);
            this.render();
        }
    }
    /**
     * @param {?} mode
     * @return {?}
     */
    changeMode(mode) {
        this.panelModeChange.emit(mode);
    }
    /**
     * @private
     * @return {?}
     */
    render() {
        if (this.value) {
            this.selectors = this.getSelectors();
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (!this.value) {
            this.value = new CandyDate(); // Show today by default
        }
        this.selectors = this.getSelectors();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.value || changes.locale) {
            this.render();
        }
    }
}
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
class DateHeaderComponent extends AbstractPanelHeader {
    /**
     * @param {?} dateHelper
     */
    constructor(dateHelper) {
        super();
        this.dateHelper = dateHelper;
    }
    /**
     * @return {?}
     */
    getSelectors() {
        return [
            {
                className: `${this.prefixCls}-year-btn`,
                title: this.locale.yearSelect,
                onClick: (/**
                 * @return {?}
                 */
                () => this.changeMode('year')),
                label: this.dateHelper.format(this.value.nativeDate, transCompatFormat(this.locale.yearFormat))
            },
            {
                className: `${this.prefixCls}-month-btn`,
                title: this.locale.monthSelect,
                onClick: (/**
                 * @return {?}
                 */
                () => this.changeMode('month')),
                label: this.dateHelper.format(this.value.nativeDate, this.locale.monthFormat || 'MMM')
            }
        ];
    }
}
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
DateHeaderComponent.ctorParameters = () => [
    { type: DateHelperService }
];
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
// tslint:disable-next-line:directive-class-suffix
class AbstractTable {
    constructor() {
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
    render() {
        if (this.activeDate) {
            this.headRow = this.makeHeadRow();
            this.bodyRows = this.makeBodyRows();
        }
    }
    /**
     * @param {?} _index
     * @param {?} item
     * @return {?}
     */
    trackByBodyRow(_index, item) {
        return item;
    }
    // Item usually is an object, so trackby has no use by default.
    /**
     * @param {?} _index
     * @param {?} item
     * @return {?}
     */
    trackByBodyColumn(_index, item) {
        return item;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.render();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.activeDate && !changes.activeDate.currentValue) {
            this.activeDate = new CandyDate();
        }
    }
}
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
class DateTableComponent extends AbstractTable {
    // Emitted when hover on a day by mouse enter
    /**
     * @param {?} i18n
     * @param {?} dateHelper
     */
    constructor(i18n, dateHelper) {
        super();
        this.i18n = i18n;
        this.dateHelper = dateHelper;
        this.selectedValue = []; // Range ONLY
        // Range ONLY
        this.hoverValue = []; // Range ONLY
        // Range ONLY
        this.dayHover = new EventEmitter(); // Emitted when hover on a day by mouse enter
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        super.ngOnChanges(changes);
        if (this.isDateRealChange(changes.activeDate) ||
            this.isDateRealChange(changes.value) ||
            this.isDateRealChange(changes.selectedValue) ||
            this.isDateRealChange(changes.hoverValue)) {
            this.render();
        }
    }
    /**
     * @private
     * @param {?} change
     * @return {?}
     */
    isDateRealChange(change) {
        if (change) {
            /** @type {?} */
            const previousValue = change.previousValue;
            /** @type {?} */
            const currentValue = change.currentValue;
            if (Array.isArray(currentValue)) {
                return (!Array.isArray(previousValue) ||
                    currentValue.length !== previousValue.length ||
                    currentValue.some((/**
                     * @param {?} value
                     * @param {?} index
                     * @return {?}
                     */
                    (value, index) => {
                        /** @type {?} */
                        const previousCandyDate = previousValue[index];
                        return previousCandyDate instanceof CandyDate ? previousCandyDate.isSameDay(value) : previousCandyDate !== value;
                    })));
            }
            else {
                return !this.isSameDate((/** @type {?} */ (previousValue)), currentValue);
            }
        }
        return false;
    }
    /**
     * @private
     * @param {?} left
     * @param {?} right
     * @return {?}
     */
    isSameDate(left, right) {
        return (!left && !right) || (left && right && right.isSameDay(left));
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    changeValueFromInside(value) {
        // Only change date not change time
        this.activeDate = this.activeDate.setYear(value.getYear()).setMonth(value.getMonth()).setDate(value.getDate());
        this.valueChange.emit(this.activeDate);
        if (!this.activeDate.isSameMonth(this.value)) {
            this.render();
        }
    }
    /**
     * @return {?}
     */
    makeHeadRow() {
        /** @type {?} */
        const weekDays = [];
        /** @type {?} */
        const start = this.activeDate.calendarStart({ weekStartsOn: this.dateHelper.getFirstDayOfWeek() });
        for (let colIndex = 0; colIndex < this.MAX_COL; colIndex++) {
            /** @type {?} */
            const day = start.addDays(colIndex);
            weekDays.push({
                value: day.nativeDate,
                title: this.dateHelper.format(day.nativeDate, 'E'),
                // eg. Tue
                content: this.dateHelper.format(day.nativeDate, this.getVeryShortWeekFormat()),
                // eg. Tu,
                isSelected: false,
                isDisabled: false,
                /**
                 * @return {?}
                 */
                onClick() { },
                /**
                 * @return {?}
                 */
                onMouseEnter() { }
            });
        }
        return weekDays;
    }
    /**
     * @private
     * @return {?}
     */
    getVeryShortWeekFormat() {
        return this.i18n.getLocaleId().toLowerCase().indexOf('zh') === 0 ? 'EEEEE' : 'EEEEEE'; // Use extreme short for chinese
    }
    /**
     * @return {?}
     */
    makeBodyRows() {
        var _a;
        /** @type {?} */
        const weekRows = [];
        /** @type {?} */
        const firstDayOfMonth = this.activeDate.calendarStart({ weekStartsOn: this.dateHelper.getFirstDayOfWeek() });
        for (let week = 0; week < this.MAX_ROW; week++) {
            /** @type {?} */
            const weekStart = firstDayOfMonth.addDays(week * 7);
            /** @type {?} */
            const row = {
                isActive: false,
                isCurrent: false,
                dateCells: [],
                year: weekStart.getYear()
            };
            for (let day = 0; day < 7; day++) {
                /** @type {?} */
                const date = weekStart.addDays(day);
                /** @type {?} */
                const dateFormat = transCompatFormat(this.i18n.getLocaleData('DatePicker.lang.dateFormat', 'YYYY-MM-DD'));
                /** @type {?} */
                const title = this.dateHelper.format(date.nativeDate, dateFormat);
                /** @type {?} */
                const label = this.dateHelper.format(date.nativeDate, 'dd');
                /** @type {?} */
                const cell = {
                    value: date.nativeDate,
                    label: label,
                    isSelected: false,
                    isDisabled: false,
                    isToday: false,
                    title: title,
                    cellRender: valueFunctionProp((/** @type {?} */ (this.cellRender)), date),
                    // Customized content
                    fullCellRender: valueFunctionProp((/** @type {?} */ (this.fullCellRender)), date),
                    content: `${date.getDate()}`,
                    onClick: (/**
                     * @return {?}
                     */
                    () => this.changeValueFromInside(date)),
                    onMouseEnter: (/**
                     * @return {?}
                     */
                    () => this.dayHover.emit(date))
                };
                if (this.showWeek && !row.weekNum) {
                    row.weekNum = this.dateHelper.getISOWeek(date.nativeDate);
                }
                if (date.isToday()) {
                    cell.isToday = true;
                    row.isCurrent = true;
                }
                if (((Array.isArray(this.selectedValue) && this.selectedValue.length > 0) || (this.hoverValue && this.hoverValue.length > 0)) &&
                    date.isSameMonth(this.activeDate)) {
                    const [startHover, endHover] = this.hoverValue;
                    const [startSelected, endSelected] = this.selectedValue;
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
                else if (date.isSameDay(this.value)) {
                    cell.isSelected = true;
                    row.isActive = true;
                }
                if ((_a = this.disabledDate) === null || _a === void 0 ? void 0 : _a.call(this, date.nativeDate)) {
                    cell.isDisabled = true;
                }
                cell.classMap = this.getClassMap(cell);
                row.dateCells.push(cell);
            }
            row.classMap = {
                [`${this.prefixCls}-week-panel-row`]: this.showWeek,
                [`${this.prefixCls}-week-panel-row-selected`]: this.showWeek && row.isActive
            };
            weekRows.push(row);
        }
        return weekRows;
    }
    /**
     * @param {?} cell
     * @return {?}
     */
    getClassMap(cell) {
        /** @type {?} */
        const date = new CandyDate(cell.value);
        return {
            [`ant-picker-cell`]: true,
            [`ant-picker-cell-today`]: !!cell.isToday,
            [`ant-picker-cell-in-view`]: date.isSameMonth(this.activeDate),
            [`ant-picker-cell-selected`]: cell.isSelected,
            [`ant-picker-cell-disabled`]: cell.isDisabled,
            [`ant-picker-cell-in-range`]: !!cell.isInSelectedRange,
            [`ant-picker-cell-range-start`]: !!cell.isSelectedStartDate,
            [`ant-picker-cell-range-end`]: !!cell.isSelectedEndDate,
            [`ant-picker-cell-range-start-single`]: !!cell.isStartSingle,
            [`ant-picker-cell-range-end-single`]: !!cell.isEndSingle,
            [`ant-picker-cell-range-hover`]: !!cell.isInHoverRange,
            [`ant-picker-cell-range-hover-start`]: !!cell.isHoverStartDate,
            [`ant-picker-cell-range-hover-end`]: !!cell.isHoverEndDate,
            [`ant-picker-cell-range-hover-edge-start`]: !!cell.isFirstDayOfMonth,
            [`ant-picker-cell-range-hover-edge-end`]: !!cell.isLastDayOfMonth
        };
    }
    /**
     * @param {?} _index
     * @param {?} item
     * @return {?}
     */
    trackByBodyRow(_index, item) {
        return `${item.year}-${item.weekNum}`;
    }
    /**
     * @param {?} _index
     * @param {?} item
     * @return {?}
     */
    trackByBodyColumn(_index, item) {
        return (/** @type {?} */ (item.title));
    }
}
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
DateTableComponent.ctorParameters = () => [
    { type: NzI18nService },
    { type: DateHelperService }
];
DateTableComponent.propDecorators = {
    locale: [{ type: Input }],
    selectedValue: [{ type: Input }],
    hoverValue: [{ type: Input }],
    dayHover: [{ type: Output }]
};
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
class DecadeHeaderComponent extends AbstractPanelHeader {
    /**
     * @return {?}
     */
    previous() { }
    /**
     * @return {?}
     */
    next() { }
    /**
     * @return {?}
     */
    get startYear() {
        return parseInt(`${this.value.getYear() / 100}`, 10) * 100;
    }
    /**
     * @return {?}
     */
    get endYear() {
        return this.startYear + 99;
    }
    /**
     * @return {?}
     */
    superPrevious() {
        this.changeValue(this.value.addYears(-100));
    }
    /**
     * @return {?}
     */
    superNext() {
        this.changeValue(this.value.addYears(100));
    }
    /**
     * @return {?}
     */
    getSelectors() {
        return [
            {
                className: `${this.prefixCls}-decade-btn`,
                title: '',
                onClick: (/**
                 * @return {?}
                 */
                () => {
                    // noop
                }),
                label: `${this.startYear}-${this.endYear}`
            }
        ];
    }
}
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

/**
 * @fileoverview added by tsickle
 * Generated from: lib/decade-table.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const MAX_ROW = 4;
/** @type {?} */
const MAX_COL = 3;
class DecadeTableComponent extends AbstractTable {
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.value || changes.disabledDate || changes.activeDate) {
            this.render();
        }
    }
    /**
     * @return {?}
     */
    get startYear() {
        return parseInt(`${this.activeDate.getYear() / 100}`, 10) * 100;
    }
    /**
     * @return {?}
     */
    get endYear() {
        return this.startYear + 99;
    }
    /**
     * @return {?}
     */
    makeHeadRow() {
        return [];
    }
    /**
     * @return {?}
     */
    makeBodyRows() {
        /** @type {?} */
        const decades = [];
        /** @type {?} */
        const currentYear = this.value && this.value.getYear();
        /** @type {?} */
        const startYear = this.startYear;
        /** @type {?} */
        const endYear = this.endYear;
        /** @type {?} */
        const previousYear = startYear - 10;
        /** @type {?} */
        let index = 0;
        for (let rowIndex = 0; rowIndex < MAX_ROW; rowIndex++) {
            /** @type {?} */
            const row = [];
            for (let colIndex = 0; colIndex < MAX_COL; colIndex++) {
                /** @type {?} */
                const start = previousYear + index * 10;
                /** @type {?} */
                const end = previousYear + index * 10 + 9;
                /** @type {?} */
                const content = `${start}-${end}`;
                /** @type {?} */
                const cell = {
                    value: this.activeDate.setYear(start).nativeDate,
                    content,
                    title: content,
                    isDisabled: false,
                    isSelected: currentYear >= start && currentYear <= end,
                    isLowerThanStart: end < startYear,
                    isBiggerThanEnd: start > endYear,
                    classMap: {},
                    /**
                     * @return {?}
                     */
                    onClick() { },
                    /**
                     * @return {?}
                     */
                    onMouseEnter() { }
                };
                cell.classMap = this.getClassMap(cell);
                cell.onClick = (/**
                 * @return {?}
                 */
                () => this.chooseDecade(start));
                index++;
                row.push(cell);
            }
            decades.push({ dateCells: row });
        }
        return decades;
    }
    /**
     * @param {?} cell
     * @return {?}
     */
    getClassMap(cell) {
        return {
            [`${this.prefixCls}-cell`]: true,
            [`${this.prefixCls}-cell-in-view`]: !cell.isBiggerThanEnd && !cell.isLowerThanStart,
            [`${this.prefixCls}-cell-selected`]: cell.isSelected,
            [`${this.prefixCls}-cell-disabled`]: cell.isDisabled
        };
    }
    /**
     * @private
     * @param {?} year
     * @return {?}
     */
    chooseDecade(year) {
        this.value = this.activeDate.setYear(year);
        this.valueChange.emit(this.value);
    }
}
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

/**
 * @fileoverview added by tsickle
 * Generated from: lib/month-header.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class MonthHeaderComponent extends AbstractPanelHeader {
    /**
     * @param {?} dateHelper
     */
    constructor(dateHelper) {
        super();
        this.dateHelper = dateHelper;
    }
    /**
     * @return {?}
     */
    getSelectors() {
        return [
            {
                className: `${this.prefixCls}-month-btn`,
                title: this.locale.yearSelect,
                onClick: (/**
                 * @return {?}
                 */
                () => this.changeMode('year')),
                label: this.dateHelper.format(this.value.nativeDate, transCompatFormat(this.locale.yearFormat))
            }
        ];
    }
}
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
MonthHeaderComponent.ctorParameters = () => [
    { type: DateHelperService }
];
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
class MonthTableComponent extends AbstractTable {
    /**
     * @param {?} dateHelper
     */
    constructor(dateHelper) {
        super();
        this.dateHelper = dateHelper;
        this.MAX_ROW = 4;
        this.MAX_COL = 3;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        super.ngOnChanges(changes);
        if (changes.value || changes.disabledDate || changes.activeDate) {
            this.render();
        }
    }
    /**
     * @return {?}
     */
    makeHeadRow() {
        return [];
    }
    /**
     * @return {?}
     */
    makeBodyRows() {
        /** @type {?} */
        const months = [];
        /** @type {?} */
        const currentMonth = this.value && this.value.getMonth();
        /** @type {?} */
        let monthValue = 0;
        for (let rowIndex = 0; rowIndex < this.MAX_ROW; rowIndex++) {
            /** @type {?} */
            const row = [];
            for (let colIndex = 0; colIndex < this.MAX_COL; colIndex++) {
                /** @type {?} */
                const month = this.activeDate.setMonth(monthValue);
                /** @type {?} */
                const isDisabled = this.disabledDate ? this.disabledDate(month.nativeDate) : false;
                /** @type {?} */
                const content = this.dateHelper.format(month.nativeDate, 'MMM');
                /** @type {?} */
                const cell = {
                    value: month.nativeDate,
                    isDisabled,
                    isSelected: monthValue === currentMonth,
                    content,
                    title: content,
                    classMap: {},
                    cellRender: valueFunctionProp((/** @type {?} */ (this.cellRender)), month),
                    // Customized content
                    fullCellRender: valueFunctionProp((/** @type {?} */ (this.fullCellRender)), month),
                    onClick: (/**
                     * @return {?}
                     */
                    () => this.chooseMonth(cell.value.getMonth())),
                    // don't use monthValue here,
                    onMouseEnter: (/**
                     * @return {?}
                     */
                    () => null)
                };
                cell.classMap = this.getClassMap(cell);
                row.push(cell);
                monthValue++;
            }
            months.push({ dateCells: row });
        }
        return months;
    }
    /**
     * @param {?} cell
     * @return {?}
     */
    getClassMap(cell) {
        return {
            [`ant-picker-cell`]: true,
            [`ant-picker-cell-in-view`]: true,
            [`ant-picker-cell-selected`]: cell.isSelected,
            [`ant-picker-cell-disabled`]: cell.isDisabled
        };
    }
    /**
     * @private
     * @param {?} month
     * @return {?}
     */
    chooseMonth(month) {
        this.value = this.activeDate.setMonth(month);
        this.valueChange.emit(this.value);
    }
}
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
MonthTableComponent.ctorParameters = () => [
    { type: DateHelperService }
];
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
class YearHeaderComponent extends AbstractPanelHeader {
    /**
     * @return {?}
     */
    get startYear() {
        return parseInt(`${this.value.getYear() / 10}`, 10) * 10;
    }
    /**
     * @return {?}
     */
    get endYear() {
        return this.startYear + 9;
    }
    /**
     * @return {?}
     */
    superPrevious() {
        this.changeValue(this.value.addYears(-10));
    }
    /**
     * @return {?}
     */
    superNext() {
        this.changeValue(this.value.addYears(10));
    }
    /**
     * @return {?}
     */
    getSelectors() {
        return [
            {
                className: `${this.prefixCls}-year-btn`,
                title: '',
                onClick: (/**
                 * @return {?}
                 */
                () => this.changeMode('decade')),
                label: `${this.startYear}-${this.endYear}`
            }
        ];
    }
}
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

/**
 * @fileoverview added by tsickle
 * Generated from: lib/year-table.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class YearTableComponent extends AbstractTable {
    /**
     * @param {?} dateHelper
     */
    constructor(dateHelper) {
        super();
        this.dateHelper = dateHelper;
        this.MAX_ROW = 4;
        this.MAX_COL = 3;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        super.ngOnChanges(changes);
        if (changes.value || changes.disabledDate || changes.activeDate) {
            this.render();
        }
    }
    /**
     * @return {?}
     */
    makeHeadRow() {
        return [];
    }
    /**
     * @return {?}
     */
    makeBodyRows() {
        /** @type {?} */
        const currentYear = this.activeDate && this.activeDate.getYear();
        /** @type {?} */
        const startYear = parseInt(`${currentYear / 10}`, 10) * 10;
        /** @type {?} */
        const endYear = startYear + 9;
        /** @type {?} */
        const previousYear = startYear - 1;
        /** @type {?} */
        const years = [];
        /** @type {?} */
        let yearValue = 0;
        for (let rowIndex = 0; rowIndex < this.MAX_ROW; rowIndex++) {
            /** @type {?} */
            const row = [];
            for (let colIndex = 0; colIndex < this.MAX_COL; colIndex++) {
                /** @type {?} */
                const yearNum = previousYear + yearValue;
                /** @type {?} */
                const year = this.activeDate.setYear(yearNum);
                /** @type {?} */
                const content = this.dateHelper.format(year.nativeDate, 'yyyy');
                /** @type {?} */
                const isDisabled = this.disabledDate ? this.disabledDate(year.nativeDate) : false;
                /** @type {?} */
                const cell = {
                    value: year.nativeDate,
                    isDisabled,
                    isSameDecade: yearNum >= startYear && yearNum <= endYear,
                    isSelected: yearNum === (this.value && this.value.getYear()),
                    content,
                    title: content,
                    classMap: {},
                    cellRender: valueFunctionProp((/** @type {?} */ (this.cellRender)), year),
                    // Customized content
                    fullCellRender: valueFunctionProp((/** @type {?} */ (this.fullCellRender)), year),
                    onClick: (/**
                     * @return {?}
                     */
                    () => this.chooseYear(cell.value.getFullYear())),
                    // don't use yearValue here,
                    onMouseEnter: (/**
                     * @return {?}
                     */
                    () => null)
                };
                cell.classMap = this.getClassMap(cell);
                row.push(cell);
                yearValue++;
            }
            years.push({ dateCells: row });
        }
        return years;
    }
    /**
     * @param {?} cell
     * @return {?}
     */
    getClassMap(cell) {
        return {
            [`${this.prefixCls}-cell`]: true,
            [`${this.prefixCls}-cell-in-view`]: !!cell.isSameDecade,
            [`${this.prefixCls}-cell-selected`]: cell.isSelected,
            [`${this.prefixCls}-cell-disabled`]: cell.isDisabled
        };
    }
    /**
     * @private
     * @param {?} year
     * @return {?}
     */
    chooseYear(year) {
        this.value = this.activeDate.setYear(year);
        this.valueChange.emit(this.value);
        this.render();
    }
}
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
YearTableComponent.ctorParameters = () => [
    { type: DateHelperService }
];
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
class LibPackerModule {
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

/**
 * @fileoverview added by tsickle
 * Generated from: month-picker.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// tslint:disable-next-line:directive-class-suffix
class NzMonthPickerComponent {
    /**
     * @param {?} datePicker
     */
    constructor(datePicker) {
        this.datePicker = datePicker;
        this.datePicker.nzMode = 'month';
        this.datePicker.nzFormat = 'yyyy-MM';
    }
}
NzMonthPickerComponent.decorators = [
    { type: Directive, args: [{
                selector: 'nz-month-picker',
                exportAs: 'nzMonthPicker'
            },] }
];
/** @nocollapse */
NzMonthPickerComponent.ctorParameters = () => [
    { type: NzDatePickerComponent, decorators: [{ type: Optional }, { type: Host }] }
];
if (false) {
    /** @type {?} */
    NzMonthPickerComponent.prototype.datePicker;
}

/**
 * @fileoverview added by tsickle
 * Generated from: range-picker.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// tslint:disable-next-line:directive-class-suffix
class NzRangePickerComponent {
    /**
     * @param {?} datePicker
     */
    constructor(datePicker) {
        this.datePicker = datePicker;
        this.datePicker.isRange = true;
        this.datePicker.nzMode = ['date', 'date'];
    }
}
NzRangePickerComponent.decorators = [
    { type: Directive, args: [{
                selector: 'nz-range-picker',
                exportAs: 'nzRangePicker'
            },] }
];
/** @nocollapse */
NzRangePickerComponent.ctorParameters = () => [
    { type: NzDatePickerComponent, decorators: [{ type: Optional }, { type: Host }] }
];
if (false) {
    /** @type {?} */
    NzRangePickerComponent.prototype.datePicker;
}

/**
 * @fileoverview added by tsickle
 * Generated from: week-picker.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// tslint:disable-next-line:directive-class-suffix
class NzWeekPickerComponent {
    /**
     * @param {?} datePicker
     */
    constructor(datePicker) {
        this.datePicker = datePicker;
        this.datePicker.showWeek = true;
        this.datePicker.nzMode = 'week';
        this.datePicker.nzFormat = 'yyyy-ww';
    }
}
NzWeekPickerComponent.decorators = [
    { type: Directive, args: [{
                selector: 'nz-week-picker',
                exportAs: 'nzWeekPicker'
            },] }
];
/** @nocollapse */
NzWeekPickerComponent.ctorParameters = () => [
    { type: NzDatePickerComponent, decorators: [{ type: Optional }, { type: Host }] }
];
if (false) {
    /** @type {?} */
    NzWeekPickerComponent.prototype.datePicker;
}

/**
 * @fileoverview added by tsickle
 * Generated from: year-picker.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// tslint:disable-next-line:directive-class-suffix
class NzYearPickerComponent {
    /**
     * @param {?} datePicker
     */
    constructor(datePicker) {
        this.datePicker = datePicker;
        this.datePicker.nzMode = 'year';
        this.datePicker.nzFormat = 'yyyy';
    }
}
NzYearPickerComponent.decorators = [
    { type: Directive, args: [{
                selector: 'nz-year-picker',
                exportAs: 'nzYearPicker'
            },] }
];
/** @nocollapse */
NzYearPickerComponent.ctorParameters = () => [
    { type: NzDatePickerComponent, decorators: [{ type: Optional }, { type: Host }] }
];
if (false) {
    /** @type {?} */
    NzYearPickerComponent.prototype.datePicker;
}

/**
 * @fileoverview added by tsickle
 * Generated from: date-picker.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NzDatePickerModule {
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
