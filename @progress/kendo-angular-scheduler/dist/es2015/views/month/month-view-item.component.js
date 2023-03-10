import { Component, ElementRef, Renderer2 } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { MonthSlotService } from './month-slot.service';
import { BaseViewItem } from '../view-items/base-view-item';
import { FocusService } from '../../navigation';
/**
 * @hidden
 */
export class MonthViewItemComponent extends BaseViewItem {
    constructor(slotService, localization, focusService, element, renderer) {
        super(slotService, localization, focusService, element, renderer);
    }
    reflow() {
        if (this.item.data[this.resourceIndex].hidden) {
            this.toggle(false);
            return;
        }
        super.reflow();
    }
}
MonthViewItemComponent.decorators = [
    { type: Component, args: [{
                // tslint:disable-next-line:component-selector
                selector: '[monthViewItem]',
                template: `
        <span class="k-event-actions">
            <span class="k-icon k-i-arrow-60-left" *ngIf="item.tail"></span>
            <span class="k-icon k-i-reload" *ngIf="isRecurrence"></span>
            <span class="k-icon k-i-non-recurrence" *ngIf="isRecurrenceException"></span>
        </span>
        <ng-container *ngIf="eventTemplate" [ngTemplateOutlet]="eventTemplate"
            [ngTemplateOutletContext]="{ $implicit: item.event, event: item.event, resources: resources }">
        </ng-container>
        <div *ngIf="!eventTemplate" [attr.title]="eventTitle">
            <div class="k-event-template">{{ item.event.title }}</div>
        </div>

        <span class="k-event-actions">
            <a *ngIf="removable" href="#" class="k-link k-event-delete" tabindex="-1" [attr.title]="deleteMessage" [attr.aria-label]="deleteMessage">
                <span class="k-icon k-i-close"></span>
            </a>
            <span class="k-icon k-i-arrow-60-right" *ngIf="item.head"></span>
        </span>

        <ng-container *ngIf="resizable">
            <span class="k-resize-handle k-resize-w"></span>
            <span class="k-resize-handle k-resize-e"></span>
        </ng-container>
    `
            },] },
];
/** @nocollapse */
MonthViewItemComponent.ctorParameters = () => [
    { type: MonthSlotService },
    { type: LocalizationService },
    { type: FocusService },
    { type: ElementRef },
    { type: Renderer2 }
];
