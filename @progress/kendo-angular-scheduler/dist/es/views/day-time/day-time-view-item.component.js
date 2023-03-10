import * as tslib_1 from "tslib";
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
var DayTimeViewItemComponent = /** @class */ (function (_super) {
    tslib_1.__extends(DayTimeViewItemComponent, _super);
    function DayTimeViewItemComponent(intlService, slotService, localization, focusService, element, renderer) {
        var _this = _super.call(this, slotService, localization, focusService, element, renderer) || this;
        _this.intlService = intlService;
        return _this;
    }
    Object.defineProperty(DayTimeViewItemComponent.prototype, "eventTime", {
        get: function () {
            return this.intlService.format('{0:t}–{1:t}', toLocalDate(this.item.startTime), toLocalDate(this.item.endTime));
        },
        enumerable: true,
        configurable: true
    });
    DayTimeViewItemComponent.decorators = [
        { type: Component, args: [{
                    // tslint:disable-next-line:component-selector
                    selector: '[dayTimeViewItem]',
                    template: "\n        <span class=\"k-event-actions\">\n            <span class=\"k-icon k-i-arrow-60-left\" *ngIf=\"item.tail && !vertical\"></span>\n            <span class=\"k-icon k-i-reload\" *ngIf=\"isRecurrence\"></span>\n            <span class=\"k-icon k-i-non-recurrence\" *ngIf=\"isRecurrenceException\"></span>\n        </span>\n        <ng-container *ngIf=\"eventTemplate\" [ngTemplateOutlet]=\"eventTemplate\"\n            [ngTemplateOutletContext]=\"{ $implicit: item.event, event: item.event, resources: resources }\">\n        </ng-container>\n        <div *ngIf=\"!eventTemplate\" [attr.title]=\"eventTitle\">\n            <div class=\"k-event-template k-event-time\" *ngIf=\"!isAllDay\">{{ eventTime }}</div>\n            <div class=\"k-event-template\" aria-hidden=\"true\">{{ item.event.title }}</div>\n        </div>\n\n        <span class=\"k-event-actions\">\n            <a href=\"#\" *ngIf=\"removable\" class=\"k-link k-event-delete\"\n               tabindex=\"-1\" aria-hidden=\"true\"\n               [attr.title]=\"deleteMessage\" [attr.aria-label]=\"deleteMessage\">\n                <span class=\"k-icon k-i-close\"></span>\n            </a>\n            <span class=\"k-icon k-i-arrow-60-right\" *ngIf=\"item.head && !vertical\"></span>\n        </span>\n\n        <span class=\"k-event-top-actions\" *ngIf=\"item.tail && vertical\">\n            <span class=\"k-icon k-i-arrow-60-up\"></span>\n        </span>\n\n        <span class=\"k-event-bottom-actions\" *ngIf=\"item.head && vertical\">\n            <span class=\"k-icon k-i-arrow-60-down\"></span>\n        </span>\n\n        <ng-container *ngIf=\"resizable && vertical\">\n            <span class=\"k-resize-handle k-resize-n\" *ngIf=\"!item.tail\"></span>\n            <span class=\"k-resize-handle k-resize-s\" *ngIf=\"!item.head\"></span>\n        </ng-container>\n\n        <ng-container *ngIf=\"resizable && !vertical\">\n            <span class=\"k-resize-handle k-resize-w\"></span>\n            <span class=\"k-resize-handle k-resize-e\"></span>\n        </ng-container>\n    "
                },] },
    ];
    /** @nocollapse */
    DayTimeViewItemComponent.ctorParameters = function () { return [
        { type: IntlService },
        { type: DayTimeSlotService },
        { type: LocalizationService },
        { type: FocusService },
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    DayTimeViewItemComponent.propDecorators = {
        vertical: [{ type: Input }],
        isAllDay: [{ type: Input }]
    };
    return DayTimeViewItemComponent;
}(BaseViewItem));
export { DayTimeViewItemComponent };
