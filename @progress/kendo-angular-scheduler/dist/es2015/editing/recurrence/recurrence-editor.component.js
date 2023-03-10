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
export const RECURRENCE_VALUE_ACCESSOR = {
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RecurrenceEditorComponent)
};
/**
 * Represents the Kendo UI Recurrence Editor component for Angular.
 */
export class RecurrenceEditorComponent {
    constructor(recurrenceService) {
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
        this.onTouchedCallback = (_) => { };
        this.onChangeCallback = (_) => { };
        this.subscriptions = this.recurrenceService.change.subscribe((rrule) => {
            this.emitChange(rrule);
        });
    }
    /**
     * Specifies the start date of the event.
     */
    set start(value) {
        this._start = value;
    }
    get start() {
        return isPresent(this._start) ? this._start : getDate(new Date());
    }
    /**
     * @hidden
     */
    get currentFreq() {
        return this.recurrenceService.frequency;
    }
    /**
     * @hidden
     */
    ngOnInit() {
        this.recurrenceService.init('', this.start, this.timezone);
    }
    ngOnChanges(changes) {
        if (isChanged('start', changes)) {
            this.recurrenceService.start = this.start;
        }
    }
    /**
     * @hidden
     */
    ngOnDestroy() {
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
        }
    }
    /**
     * @hidden
     */
    writeValue(rrule) {
        this.recurrenceService.init(typeof rrule === 'string' ? rrule : '', this.start, this.timezone);
    }
    /**
     * @hidden
     */
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    /**
     * @hidden
     */
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
    emitChange(rrule) {
        this.onChangeCallback(rrule);
        this.valueChange.emit(rrule);
    }
}
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
                template: `
        <ng-container kendoRecurrenceEditorLocalizedMessages
            i18n-repeat="kendo.recurrenceeditor.repeat|The text similar to 'Repeat' displayed in the recurrence editor."
            repeat='Repeat'

            i18n-dailyInterval="kendo.recurrenceeditor.dailyInterval|The text similar to 'day(s)' displayed in the recurrence editor."
            dailyInterval='day(s)'

            i18n-dailyRepeatEvery="kendo.recurrenceeditor.dailyRepeatEvery|The text similar to 'Repeat every' displayed in the recurrence editor."
            dailyRepeatEvery='Repeat every'

            i18n-weeklyInterval="kendo.recurrenceeditor.weeklyInterval|The text similar to 'week(s)' displayed in the recurrence editor."
            weeklyInterval='week(s)'

            i18n-weeklyRepeatEvery="kendo.recurrenceeditor.weeklyRepeatEvery|The text similar to 'Repeat every' displayed in the recurrence editor."
            weeklyRepeatEvery='Repeat every'

            i18n-weeklyRepeatOn="kendo.recurrenceeditor.weeklyRepeatOn|The text similar to 'Repeat on' displayed in the recurrence editor."
            weeklyRepeatOn='Repeat on'

            i18n-monthlyDay="kendo.recurrenceeditor.monthlyDay|The text similar to 'Day' displayed in the recurrence editor."
            monthlyDay='Day'

            i18n-monthlyInterval="kendo.recurrenceeditor.monthlyInterval|The text similar to 'month(s)' displayed in the recurrence editor."
            monthlyInterval='month(s)'

            i18n-monthlyRepeatEvery="kendo.recurrenceeditor.monthlyRepeatEvery|The text similar to 'Repeat every' displayed in the recurrence editor."
            monthlyRepeatEvery='Repeat every'

            i18n-monthlyRepeatOn="kendo.recurrenceeditor.monthlyRepeatOn|The text similar to 'Repeat on' displayed in the recurrence editor."
            monthlyRepeatOn='Repeat on'

            i18n-yearlyOf="kendo.recurrenceeditor.yearlyOf|The text similar to 'of' displayed in the recurrence editor."
            yearlyOf='of'

            i18n-yearlyRepeatEvery="kendo.recurrenceeditor.yearlyRepeatEvery|The text similar to 'Repeat every' displayed in the recurrence editor."
            yearlyRepeatEvery='Repeat every'

            i18n-yearlyRepeatOn="kendo.recurrenceeditor.yearlyRepeatOn|The text similar to 'Repeat on' displayed in the recurrence editor."
            yearlyRepeatOn='Repeat on'

            i18n-yearlyInterval="kendo.recurrenceeditor.yearlyInterval|The text similar to 'year(s)' displayed in the recurrence editor."
            yearlyInterval='year(s)'

            i18n-frequenciesDaily="kendo.recurrenceeditor.frequenciesDaily|The text similar to 'Daily' displayed in the recurrence editor."
            frequenciesDaily='Daily'

            i18n-frequenciesMonthly="kendo.recurrenceeditor.frequenciesMonthly|The text similar to 'Monthly' displayed in the recurrence editor."
            frequenciesMonthly='Monthly'

            i18n-frequenciesNever="kendo.recurrenceeditor.frequenciesNever|The text similar to 'Never' displayed in the recurrence editor."
            frequenciesNever='Never'

            i18n-frequenciesWeekly="kendo.recurrenceeditor.frequenciesWeekly|The text similar to 'Weekly' displayed in the recurrence editor."
            frequenciesWeekly='Weekly'

            i18n-frequenciesYearly="kendo.recurrenceeditor.frequenciesYearly|The text similar to 'Yearly' displayed in the recurrence editor."
            frequenciesYearly='Yearly'

            i18n-fffsetPositionsFirst="kendo.recurrenceeditor.fffsetPositionsFirst|The text similar to 'First' displayed in the recurrence editor."
            offsetPositionsFirst='First'

            i18n-offsetPositionsSecond="kendo.recurrenceeditor.offsetPositionsSecond|The text similar to 'Second' displayed in the recurrence editor."
            offsetPositionsSecond='Second'

            i18n-offsetPositionsThird="kendo.recurrenceeditor.offsetPositionsThird|The text similar to 'Third' displayed in the recurrence editor."
            offsetPositionsThird='Third'

            i18n-offsetPositionsFourth="kendo.recurrenceeditor.offsetPositionsFourth|The text similar to 'Fourth' displayed in the recurrence editor."
            offsetPositionsFourth='Fourth'

            i18n-offsetPositionsLast="kendo.recurrenceeditor.offsetPositionsLast|The text similar to 'Last' displayed in the recurrence editor."
            offsetPositionsLast='Last'

            i18n-weekdaysDay="kendo.recurrenceeditor.weekdaysDay|The text similar to 'Day' displayed in the repeat by section of the monthly recurrence pattern."
            weekdaysDay='Day'

            i18n-weekdaysWeekday="kendo.recurrenceeditor.weekdaysWeekday|The text similar to 'Weekday' displayed in the repeat by section of the monthly recurrence pattern."
            weekdaysWeekday='Weekday'

            i18n-weekdaysWeekendday="kendo.recurrenceeditor.weekdaysWeekendday|The text similar to 'Weekend Day' displayed in the repeat by section of the monthly recurrence pattern."
            weekdaysWeekendday='Weekend Day'

            i18n-endAfter="kendo.recurrenceeditor.endAfter|The text similar to 'After' displayed in the recurrence editor."
            endAfter='After'

            i18n-endOccurrence="kendo.recurrenceeditor.endOccurrence|The text similar to 'occurrence(s)' displayed in the recurrence editor."
            endOccurrence='occurrence(s)'

            i18n-endLabel="kendo.recurrenceeditor.endLabel|The text similar to 'End' displayed in the recurrence editor."
            endLabel='End'

            i18n-endNever="kendo.recurrenceeditor.endNever|The text similar to 'Never' displayed in the recurrence editor."
            endNever='Never'

            i18n-endOn="kendo.recurrenceeditor.endOn|The text similar to 'On' displayed in the recurrence editor."
            endOn='On'
        >
        </ng-container>

        <kendo-recurrence-frequency-editor>
        </kendo-recurrence-frequency-editor>

        <div class='k-recur-view'>
            <kendo-recurrence-interval-editor *ngIf="currentFreq !== 'never'">
            </kendo-recurrence-interval-editor>

            <kendo-recurrence-weekday-rule-editor *ngIf="currentFreq === 'weekly'">
            </kendo-recurrence-weekday-rule-editor>

            <kendo-recurrence-monthly-yearly-editor *ngIf="currentFreq === 'monthly' || currentFreq === 'yearly'">
            </kendo-recurrence-monthly-yearly-editor>

            <kendo-recurrence-end-rule-editor *ngIf="currentFreq !== 'never'">
            </kendo-recurrence-end-rule-editor>
        </div>
    `
            },] },
];
/** @nocollapse */
RecurrenceEditorComponent.ctorParameters = () => [
    { type: RecurrenceService }
];
RecurrenceEditorComponent.propDecorators = {
    cssClass: [{ type: HostBinding, args: ['class.k-recurrence-editor',] }],
    start: [{ type: Input }],
    timezone: [{ type: Input }],
    valueChange: [{ type: Output }]
};
