"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var kendo_date_math_1 = require("@progress/kendo-date-math");
var utils_1 = require("../utils");
/**
 * @hidden
 */
var AgendaTaskItemComponent = /** @class */ (function () {
    function AgendaTaskItemComponent(localization) {
        this.localization = localization;
    }
    Object.defineProperty(AgendaTaskItemComponent.prototype, "eventTitle", {
        get: function () {
            var start = kendo_date_math_1.toLocalDate(this.item.start);
            var end = kendo_date_math_1.toLocalDate(this.item.end);
            var time = utils_1.formatEventTime(start, end, this.item.isAllDay);
            return time + ", " + this.item.event.title;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AgendaTaskItemComponent.prototype, "eventColor", {
        get: function () {
            return this.item.color;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AgendaTaskItemComponent.prototype, "deleteMessage", {
        get: function () {
            return this.localization.get('deleteTitle');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AgendaTaskItemComponent.prototype, "isRecurrence", {
        get: function () {
            return utils_1.isRecurrence(this.item);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AgendaTaskItemComponent.prototype, "isRecurrenceException", {
        get: function () {
            return utils_1.isRecurrenceException(this.item);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AgendaTaskItemComponent.prototype, "removable", {
        get: function () {
            return this.editable && this.editable.remove !== false;
        },
        enumerable: true,
        configurable: true
    });
    AgendaTaskItemComponent.decorators = [
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    // tslint:disable-next-line:component-selector
                    selector: '[kendoSchedulerAgendaTaskItem]',
                    template: "\n        <div class=\"k-task\" [title]=\"item.title\">\n            <span class=\"k-scheduler-mark\" *ngIf=\"eventColor\" [style.background-color]=\"eventColor\"></span>\n            <span class=\"k-icon k-i-reload\" *ngIf=\"isRecurrence\"></span>\n            <span class=\"k-icon k-i-non-recurrence\" *ngIf=\"isRecurrenceException\"></span>\n            <ng-container *ngIf=\"!eventTemplate\">\n                {{item?.title }}\n            </ng-container>\n            <ng-container *ngIf=\"eventTemplate\" [ngTemplateOutlet]=\"eventTemplate\"\n                [ngTemplateOutletContext]=\"{ $implicit: item.event, event: item.event, resources: item.resources }\">\n            </ng-container>\n\n            <a href=\"#\" *ngIf=\"removable\" class=\"k-link k-event-delete\" tabindex=\"-1\" [attr.title]=\"deleteMessage\" [attr.aria-label]=\"deleteMessage\">\n                <span class=\"k-icon k-i-close\"></span>\n            </a>\n        </div>\n    "
                },] },
    ];
    /** @nocollapse */
    AgendaTaskItemComponent.ctorParameters = function () { return [
        { type: kendo_angular_l10n_1.LocalizationService }
    ]; };
    AgendaTaskItemComponent.propDecorators = {
        item: [{ type: core_1.Input, args: ["kendoSchedulerAgendaTaskItem",] }],
        color: [{ type: core_1.Input }],
        eventTemplate: [{ type: core_1.Input }],
        editable: [{ type: core_1.Input }],
        eventTitle: [{ type: core_1.HostBinding, args: ['attr.aria-label',] }]
    };
    return AgendaTaskItemComponent;
}());
exports.AgendaTaskItemComponent = AgendaTaskItemComponent;
