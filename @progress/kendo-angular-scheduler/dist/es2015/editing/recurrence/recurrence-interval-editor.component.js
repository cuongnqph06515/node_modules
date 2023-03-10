import { Component } from '@angular/core';
import { RecurrenceService } from './recurrence.service';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { isPresent } from '../../common/util';
/**
 * @hidden
 */
export class RecurrenceIntervalEditorComponent {
    constructor(recurrence, localization) {
        this.recurrence = recurrence;
        this.localization = localization;
        this.intervalValue = this.recurrence.rrule.interval || 1;
    }
    get currentFreq() {
        return this.recurrence.frequency;
    }
    onIntervalChange(newInterval) {
        if (isPresent(newInterval)) {
            this.recurrence.interval = newInterval;
        }
    }
    onIntervalBlur() {
        if (!isPresent(this.intervalValue)) {
            this.recurrence.interval = this.intervalValue = 1;
        }
    }
    textForRepeatEvery() {
        const freq = this.currentFreq;
        switch (freq) {
            case 'daily':
                return this.textFor('dailyRepeatEvery');
            case 'weekly':
                return this.textFor('weeklyRepeatEvery');
            case 'monthly':
                return this.textFor('monthlyRepeatEvery');
            case 'yearly':
                return this.textFor('yearlyRepeatEvery');
            default:
                break;
        }
    }
    textForFrequency() {
        const freq = this.currentFreq;
        switch (freq) {
            case 'daily':
                return this.textFor('dailyInterval');
            case 'weekly':
                return this.textFor('weeklyInterval');
            case 'monthly':
                return this.textFor('monthlyInterval');
            case 'yearly':
                return this.textFor('yearlyInterval');
            default:
                break;
        }
    }
    textFor(key) {
        return this.localization.get(key);
    }
}
RecurrenceIntervalEditorComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-recurrence-interval-editor',
                template: `
        <div class='k-edit-label'>
            <label (click)="intervalNumeric.focus()">{{ textForRepeatEvery() }}</label>
        </div>

        <div class='k-edit-field'>
            <kendo-numerictextbox
                #intervalNumeric
                [style.width.px]='70'
                [min]='1'
                [decimals]='0'
                [format]="'#'"
                [autoCorrect]='true'
                [(value)]='intervalValue'
                (blur)="onIntervalBlur()"
                (valueChange)='onIntervalChange($event)'>
            </kendo-numerictextbox>

            <span>{{ textForFrequency() }}</span>
        </div>
    `
            },] },
];
/** @nocollapse */
RecurrenceIntervalEditorComponent.ctorParameters = () => [
    { type: RecurrenceService },
    { type: LocalizationService }
];
