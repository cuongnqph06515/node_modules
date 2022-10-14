import { Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { IntlService } from '@progress/kendo-angular-intl';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { toLocalDate } from '@progress/kendo-date-math';
import { FocusService } from '../../navigation';
import { DayTimeSlotService } from '../day-time/day-time-slot.service';
import { BaseViewItem } from '../view-items/base-view-item';
/**
 * @hidden
 */
export class DayTimeViewItemComponent extends BaseViewItem {
    constructor(intlService, slotService, localization, focusService, element, renderer) {
        super(slotService, localization, focusService, element, renderer);
        this.intlService = intlService;
    }
    get eventTime() {
        return this.intlService.format('{0:t}–{1:t}', toLocalDate(this.item.startTime), toLocalDate(this.item.endTime));
    }
}
DayTimeViewItemComponent.decorators = [
    { type: Component, args: [{
                // tslint:disable-next-line:component-selector
                selector: '[dayTimeViewItem]',
                template: `
        <span class="k-event-actions">
            <span class="k-icon k-i-arrow-60-left" *ngIf="item.tail && !vertical"></span>
            <span class="k-icon k-i-reload" *ngIf="isRecurrence"></span>
            <span class="k-icon k-i-non-recurrence" *ngIf="isRecurrenceException"></span>
        </span>
        <ng-container *ngIf="eventTemplate" [ngTemplateOutlet]="eventTemplate"
            [ngTemplateOutletContext]="{ $implicit: item.event, event: item.event, resources: resources }">
        </ng-container>
        <div *ngIf="!eventTemplate" [attr.title]="eventTitle">
            <div class="k-event-template k-event-time" *ngIf="!isAllDay">{{ eventTime }}</div>
            <div class="k-event-template" aria-hidden="true">{{ item.event.title }}</div>
        </div>

        <span class="k-event-actions">
            <a href="#" *ngIf="removable" class="k-link k-event-delete"
               tabindex="-1" aria-hidden="true"
               [attr.title]="deleteMessage" [attr.aria-label]="deleteMessage">
                <span class="k-icon k-i-close"></span>
            </a>
            <span class="k-icon k-i-arrow-60-right" *ngIf="item.head && !vertical"></span>
        </span>

        <span class="k-event-top-actions" *ngIf="item.tail && vertical">
            <span class="k-icon k-i-arrow-60-up"></span>
        </span>

        <span class="k-event-bottom-actions" *ngIf="item.head && vertical">
            <span class="k-icon k-i-arrow-60-down"></span>
        </span>

        <ng-container *ngIf="resizable && vertical">
            <span class="k-resize-handle k-resize-n" *ngIf="!item.tail"></span>
            <span class="k-resize-handle k-resize-s" *ngIf="!item.head"></span>
        </ng-container>

        <ng-container *ngIf="resizable && !vertical">
            <span class="k-resize-handle k-resize-w"></span>
            <span class="k-resize-handle k-resize-e"></span>
        </ng-container>
    `
            },] },
];
/** @nocollapse */
DayTimeViewItemComponent.ctorParameters = () => [
    { type: IntlService },
    { type: DayTimeSlotService },
    { type: LocalizationService },
    { type: FocusService },
    { type: ElementRef },
    { type: Renderer2 }
];
DayTimeViewItemComponent.propDecorators = {
    vertical: [{ type: Input }],
    isAllDay: [{ type: Input }]
};
