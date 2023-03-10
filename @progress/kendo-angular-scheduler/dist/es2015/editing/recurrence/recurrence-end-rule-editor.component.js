import { Component, ViewChildren, QueryList } from '@angular/core';
import { RecurrenceService } from './recurrence.service';
import { isPresent } from '../../common/util';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { EndRuleRadioButtonDirective } from './end-rule-radio-button.directive';
import { ZonedDate } from '@progress/kendo-date-math';
import { toUTCDate } from '../../views/utils';
/**
 * @hidden
 */
export class RecurrenceEndRuleEditorComponent {
    constructor(recurrence, localization) {
        this.recurrence = recurrence;
        this.localization = localization;
        this.setInitialValues();
        this.subscribeChanges();
    }
    ngOnDestroy() {
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
        }
    }
    setEndRule(endRule) {
        if (endRule === 'count') {
            this.recurrence.rrule.count = this.countValue;
        }
        else if (endRule === 'until') {
            this.recurrence.until = this.untilValue;
        }
    }
    get rrule() {
        return this.recurrence.rrule;
    }
    get isCountDisabled() {
        return this.recurrence.endRule !== 'count';
    }
    get isUntilDisabled() {
        return this.recurrence.endRule !== 'until';
    }
    onCountChange(value) {
        if (isPresent(value)) {
            this.recurrence.count = value;
        }
    }
    onCountBlur() {
        if (!isPresent(this.countValue)) {
            this.recurrence.count = this.countValue = 1;
        }
    }
    onUntilChange(value) {
        if (isPresent(value)) {
            this.recurrence.until = this.createUntil(value);
        }
    }
    onUntilBlur() {
        if (!isPresent(this.untilValue)) {
            this.recurrence.until = this.untilValue = this.createUntil(this.recurrence.start);
        }
    }
    textFor(key) {
        return this.localization.get(key);
    }
    onEndLabelClick() {
        const selected = this.endRuleRadioButtons.toArray().find(r => r.elem.checked);
        if (selected) {
            selected.elem.focus();
        }
    }
    setInitialValues() {
        this.countValue = this.rrule.count || 1;
        const currentUntil = this.recurrence.until;
        const currentStart = this.recurrence.start;
        this.untilValue = isPresent(currentUntil) ? currentUntil : this.createUntil(currentStart);
    }
    subscribeChanges() {
        this.subscriptions = this.recurrence.endRuleChange.subscribe((endRule) => {
            this.setEndRule(endRule);
        });
        this.subscriptions.add(this.recurrence.frequencyChange.subscribe(() => {
            this.setInitialValues();
        }));
    }
    createUntil(until) {
        // Read the until date as UTC date parts to avoid interfering with the local time zone.
        const untilDate = toUTCDate(until);
        untilDate.setUTCDate(untilDate.getUTCDate() + 1);
        // Convert to the scheduler time zone.
        return ZonedDate.fromUTCDate(untilDate, this.recurrence.timezone).toLocalDate();
    }
}
RecurrenceEndRuleEditorComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-recurrence-end-rule-editor',
                template: `
        <div class='k-edit-label'>
            <label (click)="onEndLabelClick()">{{ textFor('endLabel') }}</label>
        </div>
        <div class='k-edit-field'>
            <ul class='k-reset'>
                <li>
                    <input [kendoRecurrenceEndRuleRadioButton]="'k-endrule-never'" />
                    <label class='k-radio-label' for='k-endrule-never'>{{ textFor('endNever') }}</label>
                </li>
                <li>
                    <input [kendoRecurrenceEndRuleRadioButton]="'k-endrule-count'" />
                    <label class='k-radio-label' for='k-endrule-count'>{{ textFor('endAfter') }}</label>

                    <kendo-numerictextbox
                        [style.width.px]='70'
                        [autoCorrect]='true'
                        [decimals]='0'
                        [disabled]='isCountDisabled'
                        [format]="'#'"
                        [min]='1'
                        [(value)]='countValue'
                        (blur)="onCountBlur()"
                        (valueChange)='onCountChange($event)'>
                    </kendo-numerictextbox>
                    <span>{{ textFor('endOccurrence') }}</span>
                </li>
                <li>
                    <input [kendoRecurrenceEndRuleRadioButton]="'k-endrule-until'" />
                    <label class='k-radio-label' for='k-endrule-until'>{{ textFor('endOn') }}</label>

                    <kendo-datepicker
                        [style.width.px]='150'
                        [disabled]='isUntilDisabled'
                        [(value)]='untilValue'
                        (blur)="onUntilBlur()"
                        (valueChange)='onUntilChange($event)'>
                    </kendo-datepicker>
                </li>
            </ul>
        </div>
    `
            },] },
];
/** @nocollapse */
RecurrenceEndRuleEditorComponent.ctorParameters = () => [
    { type: RecurrenceService },
    { type: LocalizationService }
];
RecurrenceEndRuleEditorComponent.propDecorators = {
    endRuleRadioButtons: [{ type: ViewChildren, args: [EndRuleRadioButtonDirective,] }]
};
