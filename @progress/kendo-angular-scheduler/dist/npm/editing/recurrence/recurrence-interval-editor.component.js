"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var recurrence_service_1 = require("./recurrence.service");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var util_1 = require("../../common/util");
/**
 * @hidden
 */
var RecurrenceIntervalEditorComponent = /** @class */ (function () {
    function RecurrenceIntervalEditorComponent(recurrence, localization) {
        this.recurrence = recurrence;
        this.localization = localization;
        this.intervalValue = this.recurrence.rrule.interval || 1;
    }
    Object.defineProperty(RecurrenceIntervalEditorComponent.prototype, "currentFreq", {
        get: function () {
            return this.recurrence.frequency;
        },
        enumerable: true,
        configurable: true
    });
    RecurrenceIntervalEditorComponent.prototype.onIntervalChange = function (newInterval) {
        if (util_1.isPresent(newInterval)) {
            this.recurrence.interval = newInterval;
        }
    };
    RecurrenceIntervalEditorComponent.prototype.onIntervalBlur = function () {
        if (!util_1.isPresent(this.intervalValue)) {
            this.recurrence.interval = this.intervalValue = 1;
        }
    };
    RecurrenceIntervalEditorComponent.prototype.textForRepeatEvery = function () {
        var freq = this.currentFreq;
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
    };
    RecurrenceIntervalEditorComponent.prototype.textForFrequency = function () {
        var freq = this.currentFreq;
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
    };
    RecurrenceIntervalEditorComponent.prototype.textFor = function (key) {
        return this.localization.get(key);
    };
    RecurrenceIntervalEditorComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'kendo-recurrence-interval-editor',
                    template: "\n        <div class='k-edit-label'>\n            <label (click)=\"intervalNumeric.focus()\">{{ textForRepeatEvery() }}</label>\n        </div>\n\n        <div class='k-edit-field'>\n            <kendo-numerictextbox\n                #intervalNumeric\n                [style.width.px]='70'\n                [min]='1'\n                [decimals]='0'\n                [format]=\"'#'\"\n                [autoCorrect]='true'\n                [(value)]='intervalValue'\n                (blur)=\"onIntervalBlur()\"\n                (valueChange)='onIntervalChange($event)'>\n            </kendo-numerictextbox>\n\n            <span>{{ textForFrequency() }}</span>\n        </div>\n    "
                },] },
    ];
    /** @nocollapse */
    RecurrenceIntervalEditorComponent.ctorParameters = function () { return [
        { type: recurrence_service_1.RecurrenceService },
        { type: kendo_angular_l10n_1.LocalizationService }
    ]; };
    return RecurrenceIntervalEditorComponent;
}());
exports.RecurrenceIntervalEditorComponent = RecurrenceIntervalEditorComponent;
