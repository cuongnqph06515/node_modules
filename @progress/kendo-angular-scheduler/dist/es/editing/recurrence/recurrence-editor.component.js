import { Component, EventEmitter, Input, Output, forwardRef, HostBinding } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { RecurrenceService } from './recurrence.service';
import { L10N_PREFIX, LocalizationService } from '@progress/kendo-angular-l10n';
import { isPresent } from '../../common/util';
import { getDate } from '@progress/kendo-date-math';
import { RecurrenceLocalizationService } from './localization/recurrence-localization.service';
import { isChanged } from '@progress/kendo-angular-common';
/* tslint:disable: no-use-before-declare */
/* tslint:disable: no-forward-ref */
/**
 * @hidden
 */
export var RECURRENCE_VALUE_ACCESSOR = {
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return RecurrenceEditorComponent; })
};
/**
 * Represents the Kendo UI Recurrence Editor component for Angular.
 */
var RecurrenceEditorComponent = /** @class */ (function () {
    function RecurrenceEditorComponent(recurrenceService) {
        var _this = this;
        this.recurrenceService = recurrenceService;
        this.cssClass = true;
        /**
         * Specifies the id of the timezone that will be used.
         */
        this.timezone = 'Etc/UTC';
        /**
         * Fires when the value of the component has changed.
         */
        this.valueChange = new EventEmitter();
        this.onTouchedCallback = function (_) { };
        this.onChangeCallback = function (_) { };
        this.subscriptions = this.recurrenceService.change.subscribe(function (rrule) {
            _this.emitChange(rrule);
        });
    }
    Object.defineProperty(RecurrenceEditorComponent.prototype, "start", {
        get: function () {
            return isPresent(this._start) ? this._start : getDate(new Date());
        },
        /**
         * Specifies the start date of the event.
         */
        set: function (value) {
            this._start = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecurrenceEditorComponent.prototype, "currentFreq", {
        /**
         * @hidden
         */
        get: function () {
            return this.recurrenceService.frequency;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    RecurrenceEditorComponent.prototype.ngOnInit = function () {
        this.recurrenceService.init('', this.start, this.timezone);
    };
    RecurrenceEditorComponent.prototype.ngOnChanges = function (changes) {
        if (isChanged('start', changes)) {
            this.recurrenceService.start = this.start;
        }
    };
    /**
     * @hidden
     */
    RecurrenceEditorComponent.prototype.ngOnDestroy = function () {
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
        }
    };
    /**
     * @hidden
     */
    RecurrenceEditorComponent.prototype.writeValue = function (rrule) {
        this.recurrenceService.init(typeof rrule === 'string' ? rrule : '', this.start, this.timezone);
    };
    /**
     * @hidden
     */
    RecurrenceEditorComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    /**
     * @hidden
     */
    RecurrenceEditorComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    RecurrenceEditorComponent.prototype.emitChange = function (rrule) {
        this.onChangeCallback(rrule);
        this.valueChange.emit(rrule);
    };
    RecurrenceEditorComponent.decorators = [
        { type: Component, args: [{
                    exportAs: 'kendoRecurrenceEditor',
                    providers: [
                        RecurrenceLocalizationService,
                        {
                            provide: LocalizationService,
                            useExisting: RecurrenceLocalizationService
                        },
                        {
                            provide: L10N_PREFIX,
                            useValue: 'kendo.recurrenceeditor'
                        },
                        RECURRENCE_VALUE_ACCESSOR,
                        RecurrenceService
                    ],
                    selector: 'kendo-recurrence-editor',
                    template: "\n        <ng-container kendoRecurrenceEditorLocalizedMessages\n            i18n-repeat=\"kendo.recurrenceeditor.repeat|The text similar to 'Repeat' displayed in the recurrence editor.\"\n            repeat='Repeat'\n\n            i18n-dailyInterval=\"kendo.recurrenceeditor.dailyInterval|The text similar to 'day(s)' displayed in the recurrence editor.\"\n            dailyInterval='day(s)'\n\n            i18n-dailyRepeatEvery=\"kendo.recurrenceeditor.dailyRepeatEvery|The text similar to 'Repeat every' displayed in the recurrence editor.\"\n            dailyRepeatEvery='Repeat every'\n\n            i18n-weeklyInterval=\"kendo.recurrenceeditor.weeklyInterval|The text similar to 'week(s)' displayed in the recurrence editor.\"\n            weeklyInterval='week(s)'\n\n            i18n-weeklyRepeatEvery=\"kendo.recurrenceeditor.weeklyRepeatEvery|The text similar to 'Repeat every' displayed in the recurrence editor.\"\n            weeklyRepeatEvery='Repeat every'\n\n            i18n-weeklyRepeatOn=\"kendo.recurrenceeditor.weeklyRepeatOn|The text similar to 'Repeat on' displayed in the recurrence editor.\"\n            weeklyRepeatOn='Repeat on'\n\n            i18n-monthlyDay=\"kendo.recurrenceeditor.monthlyDay|The text similar to 'Day' displayed in the recurrence editor.\"\n            monthlyDay='Day'\n\n            i18n-monthlyInterval=\"kendo.recurrenceeditor.monthlyInterval|The text similar to 'month(s)' displayed in the recurrence editor.\"\n            monthlyInterval='month(s)'\n\n            i18n-monthlyRepeatEvery=\"kendo.recurrenceeditor.monthlyRepeatEvery|The text similar to 'Repeat every' displayed in the recurrence editor.\"\n            monthlyRepeatEvery='Repeat every'\n\n            i18n-monthlyRepeatOn=\"kendo.recurrenceeditor.monthlyRepeatOn|The text similar to 'Repeat on' displayed in the recurrence editor.\"\n            monthlyRepeatOn='Repeat on'\n\n            i18n-yearlyOf=\"kendo.recurrenceeditor.yearlyOf|The text similar to 'of' displayed in the recurrence editor.\"\n            yearlyOf='of'\n\n            i18n-yearlyRepeatEvery=\"kendo.recurrenceeditor.yearlyRepeatEvery|The text similar to 'Repeat every' displayed in the recurrence editor.\"\n            yearlyRepeatEvery='Repeat every'\n\n            i18n-yearlyRepeatOn=\"kendo.recurrenceeditor.yearlyRepeatOn|The text similar to 'Repeat on' displayed in the recurrence editor.\"\n            yearlyRepeatOn='Repeat on'\n\n            i18n-yearlyInterval=\"kendo.recurrenceeditor.yearlyInterval|The text similar to 'year(s)' displayed in the recurrence editor.\"\n            yearlyInterval='year(s)'\n\n            i18n-frequenciesDaily=\"kendo.recurrenceeditor.frequenciesDaily|The text similar to 'Daily' displayed in the recurrence editor.\"\n            frequenciesDaily='Daily'\n\n            i18n-frequenciesMonthly=\"kendo.recurrenceeditor.frequenciesMonthly|The text similar to 'Monthly' displayed in the recurrence editor.\"\n            frequenciesMonthly='Monthly'\n\n            i18n-frequenciesNever=\"kendo.recurrenceeditor.frequenciesNever|The text similar to 'Never' displayed in the recurrence editor.\"\n            frequenciesNever='Never'\n\n            i18n-frequenciesWeekly=\"kendo.recurrenceeditor.frequenciesWeekly|The text similar to 'Weekly' displayed in the recurrence editor.\"\n            frequenciesWeekly='Weekly'\n\n            i18n-frequenciesYearly=\"kendo.recurrenceeditor.frequenciesYearly|The text similar to 'Yearly' displayed in the recurrence editor.\"\n            frequenciesYearly='Yearly'\n\n            i18n-fffsetPositionsFirst=\"kendo.recurrenceeditor.fffsetPositionsFirst|The text similar to 'First' displayed in the recurrence editor.\"\n            offsetPositionsFirst='First'\n\n            i18n-offsetPositionsSecond=\"kendo.recurrenceeditor.offsetPositionsSecond|The text similar to 'Second' displayed in the recurrence editor.\"\n            offsetPositionsSecond='Second'\n\n            i18n-offsetPositionsThird=\"kendo.recurrenceeditor.offsetPositionsThird|The text similar to 'Third' displayed in the recurrence editor.\"\n            offsetPositionsThird='Third'\n\n            i18n-offsetPositionsFourth=\"kendo.recurrenceeditor.offsetPositionsFourth|The text similar to 'Fourth' displayed in the recurrence editor.\"\n            offsetPositionsFourth='Fourth'\n\n            i18n-offsetPositionsLast=\"kendo.recurrenceeditor.offsetPositionsLast|The text similar to 'Last' displayed in the recurrence editor.\"\n            offsetPositionsLast='Last'\n\n            i18n-weekdaysDay=\"kendo.recurrenceeditor.weekdaysDay|The text similar to 'Day' displayed in the repeat by section of the monthly recurrence pattern.\"\n            weekdaysDay='Day'\n\n            i18n-weekdaysWeekday=\"kendo.recurrenceeditor.weekdaysWeekday|The text similar to 'Weekday' displayed in the repeat by section of the monthly recurrence pattern.\"\n            weekdaysWeekday='Weekday'\n\n            i18n-weekdaysWeekendday=\"kendo.recurrenceeditor.weekdaysWeekendday|The text similar to 'Weekend Day' displayed in the repeat by section of the monthly recurrence pattern.\"\n            weekdaysWeekendday='Weekend Day'\n\n            i18n-endAfter=\"kendo.recurrenceeditor.endAfter|The text similar to 'After' displayed in the recurrence editor.\"\n            endAfter='After'\n\n            i18n-endOccurrence=\"kendo.recurrenceeditor.endOccurrence|The text similar to 'occurrence(s)' displayed in the recurrence editor.\"\n            endOccurrence='occurrence(s)'\n\n            i18n-endLabel=\"kendo.recurrenceeditor.endLabel|The text similar to 'End' displayed in the recurrence editor.\"\n            endLabel='End'\n\n            i18n-endNever=\"kendo.recurrenceeditor.endNever|The text similar to 'Never' displayed in the recurrence editor.\"\n            endNever='Never'\n\n            i18n-endOn=\"kendo.recurrenceeditor.endOn|The text similar to 'On' displayed in the recurrence editor.\"\n            endOn='On'\n        >\n        </ng-container>\n\n        <kendo-recurrence-frequency-editor>\n        </kendo-recurrence-frequency-editor>\n\n        <div class='k-recur-view'>\n            <kendo-recurrence-interval-editor *ngIf=\"currentFreq !== 'never'\">\n            </kendo-recurrence-interval-editor>\n\n            <kendo-recurrence-weekday-rule-editor *ngIf=\"currentFreq === 'weekly'\">\n            </kendo-recurrence-weekday-rule-editor>\n\n            <kendo-recurrence-monthly-yearly-editor *ngIf=\"currentFreq === 'monthly' || currentFreq === 'yearly'\">\n            </kendo-recurrence-monthly-yearly-editor>\n\n            <kendo-recurrence-end-rule-editor *ngIf=\"currentFreq !== 'never'\">\n            </kendo-recurrence-end-rule-editor>\n        </div>\n    "
                },] },
    ];
    /** @nocollapse */
    RecurrenceEditorComponent.ctorParameters = function () { return [
        { type: RecurrenceService }
    ]; };
    RecurrenceEditorComponent.propDecorators = {
        cssClass: [{ type: HostBinding, args: ['class.k-recurrence-editor',] }],
        start: [{ type: Input }],
        timezone: [{ type: Input }],
        valueChange: [{ type: Output }]
    };
    return RecurrenceEditorComponent;
}());
export { RecurrenceEditorComponent };
