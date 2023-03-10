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
var RecurrenceEndRuleEditorComponent = /** @class */ (function () {
    function RecurrenceEndRuleEditorComponent(recurrence, localization) {
        this.recurrence = recurrence;
        this.localization = localization;
        this.setInitialValues();
        this.subscribeChanges();
    }
    RecurrenceEndRuleEditorComponent.prototype.ngOnDestroy = function () {
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
        }
    };
    RecurrenceEndRuleEditorComponent.prototype.setEndRule = function (endRule) {
        if (endRule === 'count') {
            this.recurrence.rrule.count = this.countValue;
        }
        else if (endRule === 'until') {
            this.recurrence.until = this.untilValue;
        }
    };
    Object.defineProperty(RecurrenceEndRuleEditorComponent.prototype, "rrule", {
        get: function () {
            return this.recurrence.rrule;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecurrenceEndRuleEditorComponent.prototype, "isCountDisabled", {
        get: function () {
            return this.recurrence.endRule !== 'count';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecurrenceEndRuleEditorComponent.prototype, "isUntilDisabled", {
        get: function () {
            return this.recurrence.endRule !== 'until';
        },
        enumerable: true,
        configurable: true
    });
    RecurrenceEndRuleEditorComponent.prototype.onCountChange = function (value) {
        if (isPresent(value)) {
            this.recurrence.count = value;
        }
    };
    RecurrenceEndRuleEditorComponent.prototype.onCountBlur = function () {
        if (!isPresent(this.countValue)) {
            this.recurrence.count = this.countValue = 1;
        }
    };
    RecurrenceEndRuleEditorComponent.prototype.onUntilChange = function (value) {
        if (isPresent(value)) {
            this.recurrence.until = this.createUntil(value);
        }
    };
    RecurrenceEndRuleEditorComponent.prototype.onUntilBlur = function () {
        if (!isPresent(this.untilValue)) {
            this.recurrence.until = this.untilValue = this.createUntil(this.recurrence.start);
        }
    };
    RecurrenceEndRuleEditorComponent.prototype.textFor = function (key) {
        return this.localization.get(key);
    };
    RecurrenceEndRuleEditorComponent.prototype.onEndLabelClick = function () {
        var selected = this.endRuleRadioButtons.toArray().find(function (r) { return r.elem.checked; });
        if (selected) {
            selected.elem.focus();
        }
    };
    RecurrenceEndRuleEditorComponent.prototype.setInitialValues = function () {
        this.countValue = this.rrule.count || 1;
        var currentUntil = this.recurrence.until;
        var currentStart = this.recurrence.start;
        this.untilValue = isPresent(currentUntil) ? currentUntil : this.createUntil(currentStart);
    };
    RecurrenceEndRuleEditorComponent.prototype.subscribeChanges = function () {
        var _this = this;
        this.subscriptions = this.recurrence.endRuleChange.subscribe(function (endRule) {
            _this.setEndRule(endRule);
        });
        this.subscriptions.add(this.recurrence.frequencyChange.subscribe(function () {
            _this.setInitialValues();
        }));
    };
    RecurrenceEndRuleEditorComponent.prototype.createUntil = function (until) {
        // Read the until date as UTC date parts to avoid interfering with the local time zone.
        var untilDate = toUTCDate(until);
        untilDate.setUTCDate(untilDate.getUTCDate() + 1);
        // Convert to the scheduler time zone.
        return ZonedDate.fromUTCDate(untilDate, this.recurrence.timezone).toLocalDate();
    };
    RecurrenceEndRuleEditorComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-recurrence-end-rule-editor',
                    template: "\n        <div class='k-edit-label'>\n            <label (click)=\"onEndLabelClick()\">{{ textFor('endLabel') }}</label>\n        </div>\n        <div class='k-edit-field'>\n            <ul class='k-reset'>\n                <li>\n                    <input [kendoRecurrenceEndRuleRadioButton]=\"'k-endrule-never'\" />\n                    <label class='k-radio-label' for='k-endrule-never'>{{ textFor('endNever') }}</label>\n                </li>\n                <li>\n                    <input [kendoRecurrenceEndRuleRadioButton]=\"'k-endrule-count'\" />\n                    <label class='k-radio-label' for='k-endrule-count'>{{ textFor('endAfter') }}</label>\n\n                    <kendo-numerictextbox\n                        [style.width.px]='70'\n                        [autoCorrect]='true'\n                        [decimals]='0'\n                        [disabled]='isCountDisabled'\n                        [format]=\"'#'\"\n                        [min]='1'\n                        [(value)]='countValue'\n                        (blur)=\"onCountBlur()\"\n                        (valueChange)='onCountChange($event)'>\n                    </kendo-numerictextbox>\n                    <span>{{ textFor('endOccurrence') }}</span>\n                </li>\n                <li>\n                    <input [kendoRecurrenceEndRuleRadioButton]=\"'k-endrule-until'\" />\n                    <label class='k-radio-label' for='k-endrule-until'>{{ textFor('endOn') }}</label>\n\n                    <kendo-datepicker\n                        [style.width.px]='150'\n                        [disabled]='isUntilDisabled'\n                        [(value)]='untilValue'\n                        (blur)=\"onUntilBlur()\"\n                        (valueChange)='onUntilChange($event)'>\n                    </kendo-datepicker>\n                </li>\n            </ul>\n        </div>\n    "
                },] },
    ];
    /** @nocollapse */
    RecurrenceEndRuleEditorComponent.ctorParameters = function () { return [
        { type: RecurrenceService },
        { type: LocalizationService }
    ]; };
    RecurrenceEndRuleEditorComponent.propDecorators = {
        endRuleRadioButtons: [{ type: ViewChildren, args: [EndRuleRadioButtonDirective,] }]
    };
    return RecurrenceEndRuleEditorComponent;
}());
export { RecurrenceEndRuleEditorComponent };
