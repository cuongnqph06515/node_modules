import { Component, Input, ChangeDetectionStrategy, TemplateRef, HostBinding } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { toLocalDate } from '@progress/kendo-date-math';
import { isRecurrence, isRecurrenceException, formatEventTime } from '../utils';
/**
 * @hidden
 */
var AgendaTaskItemComponent = /** @class */ (function () {
    function AgendaTaskItemComponent(localization) {
        this.localization = localization;
    }
    Object.defineProperty(AgendaTaskItemComponent.prototype, "eventTitle", {
        get: function () {
            var start = toLocalDate(this.item.start);
            var end = toLocalDate(this.item.end);
            var time = formatEventTime(start, end, this.item.isAllDay);
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
            return isRecurrence(this.item);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AgendaTaskItemComponent.prototype, "isRecurrenceException", {
        get: function () {
            return isRecurrenceException(this.item);
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
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    // tslint:disable-next-line:component-selector
                    selector: '[kendoSchedulerAgendaTaskItem]',
                    template: "\n        <div class=\"k-task\" [title]=\"item.title\">\n            <span class=\"k-scheduler-mark\" *ngIf=\"eventColor\" [style.background-color]=\"eventColor\"></span>\n            <span class=\"k-icon k-i-reload\" *ngIf=\"isRecurrence\"></span>\n            <span class=\"k-icon k-i-non-recurrence\" *ngIf=\"isRecurrenceException\"></span>\n            <ng-container *ngIf=\"!eventTemplate\">\n                {{item?.title }}\n            </ng-container>\n            <ng-container *ngIf=\"eventTemplate\" [ngTemplateOutlet]=\"eventTemplate\"\n                [ngTemplateOutletContext]=\"{ $implicit: item.event, event: item.event, resources: item.resources }\">\n            </ng-container>\n\n            <a href=\"#\" *ngIf=\"removable\" class=\"k-link k-event-delete\" tabindex=\"-1\" [attr.title]=\"deleteMessage\" [attr.aria-label]=\"deleteMessage\">\n                <span class=\"k-icon k-i-close\"></span>\n            </a>\n        </div>\n    "
                },] },
    ];
    /** @nocollapse */
    AgendaTaskItemComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    AgendaTaskItemComponent.propDecorators = {
        item: [{ type: Input, args: ["kendoSchedulerAgendaTaskItem",] }],
        color: [{ type: Input }],
        eventTemplate: [{ type: Input }],
        editable: [{ type: Input }],
        eventTitle: [{ type: HostBinding, args: ['attr.aria-label',] }]
    };
    return AgendaTaskItemComponent;
}());
export { AgendaTaskItemComponent };
