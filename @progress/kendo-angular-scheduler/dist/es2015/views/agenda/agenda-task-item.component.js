import { Component, Input, ChangeDetectionStrategy, TemplateRef, HostBinding } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { toLocalDate } from '@progress/kendo-date-math';
import { isRecurrence, isRecurrenceException, formatEventTime } from '../utils';
/**
 * @hidden
 */
export class AgendaTaskItemComponent {
    constructor(localization) {
        this.localization = localization;
    }
    get eventTitle() {
        const start = toLocalDate(this.item.start);
        const end = toLocalDate(this.item.end);
        const time = formatEventTime(start, end, this.item.isAllDay);
        return `${time}, ${this.item.event.title}`;
    }
    get eventColor() {
        return this.item.color;
    }
    get deleteMessage() {
        return this.localization.get('deleteTitle');
    }
    get isRecurrence() {
        return isRecurrence(this.item);
    }
    get isRecurrenceException() {
        return isRecurrenceException(this.item);
    }
    get removable() {
        return this.editable && this.editable.remove !== false;
    }
}
AgendaTaskItemComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                // tslint:disable-next-line:component-selector
                selector: '[kendoSchedulerAgendaTaskItem]',
                template: `
        <div class="k-task" [title]="item.title">
            <span class="k-scheduler-mark" *ngIf="eventColor" [style.background-color]="eventColor"></span>
            <span class="k-icon k-i-reload" *ngIf="isRecurrence"></span>
            <span class="k-icon k-i-non-recurrence" *ngIf="isRecurrenceException"></span>
            <ng-container *ngIf="!eventTemplate">
                {{item?.title }}
            </ng-container>
            <ng-container *ngIf="eventTemplate" [ngTemplateOutlet]="eventTemplate"
                [ngTemplateOutletContext]="{ $implicit: item.event, event: item.event, resources: item.resources }">
            </ng-container>

            <a href="#" *ngIf="removable" class="k-link k-event-delete" tabindex="-1" [attr.title]="deleteMessage" [attr.aria-label]="deleteMessage">
                <span class="k-icon k-i-close"></span>
            </a>
        </div>
    `
            },] },
];
/** @nocollapse */
AgendaTaskItemComponent.ctorParameters = () => [
    { type: LocalizationService }
];
AgendaTaskItemComponent.propDecorators = {
    item: [{ type: Input, args: ["kendoSchedulerAgendaTaskItem",] }],
    color: [{ type: Input }],
    eventTemplate: [{ type: Input }],
    editable: [{ type: Input }],
    eventTitle: [{ type: HostBinding, args: ['attr.aria-label',] }]
};
