"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var kendo_angular_intl_1 = require("@progress/kendo-angular-intl");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var kendo_date_math_1 = require("@progress/kendo-date-math");
var navigation_1 = require("../../navigation");
var day_time_slot_service_1 = require("../day-time/day-time-slot.service");
var base_view_item_1 = require("../view-items/base-view-item");
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
            return this.intlService.format('{0:t}–{1:t}', kendo_date_math_1.toLocalDate(this.item.startTime), kendo_date_math_1.toLocalDate(this.item.endTime));
        },
        enumerable: true,
        configurable: true
    });
    DayTimeViewItemComponent.decorators = [
        { type: core_1.Component, args: [{
                    // tslint:disable-next-line:component-selector
                    selector: '[dayTimeViewItem]',
                    template: "\n        <span class=\"k-event-actions\">\n            <span class=\"k-icon k-i-arrow-60-left\" *ngIf=\"item.tail && !vertical\"></span>\n            <span class=\"k-icon k-i-reload\" *ngIf=\"isRecurrence\"></span>\n            <span class=\"k-icon k-i-non-recurrence\" *ngIf=\"isRecurrenceException\"></span>\n        </span>\n        <ng-container *ngIf=\"eventTemplate\" [ngTemplateOutlet]=\"eventTemplate\"\n            [ngTemplateOutletContext]=\"{ $implicit: item.event, event: item.event, resources: resources }\">\n        </ng-container>\n        <div *ngIf=\"!eventTemplate\" [attr.title]=\"eventTitle\">\n            <div class=\"k-event-template k-event-time\" *ngIf=\"!isAllDay\">{{ eventTime }}</div>\n            <div class=\"k-event-template\" aria-hidden=\"true\">{{ item.event.title }}</div>\n        </div>\n\n        <span class=\"k-event-actions\">\n            <a href=\"#\" *ngIf=\"removable\" class=\"k-link k-event-delete\"\n               tabindex=\"-1\" aria-hidden=\"true\"\n               [attr.title]=\"deleteMessage\" [attr.aria-label]=\"deleteMessage\">\n                <span class=\"k-icon k-i-close\"></span>\n            </a>\n            <span class=\"k-icon k-i-arrow-60-right\" *ngIf=\"item.head && !vertical\"></span>\n        </span>\n\n        <span class=\"k-event-top-actions\" *ngIf=\"item.tail && vertical\">\n            <span class=\"k-icon k-i-arrow-60-up\"></span>\n        </span>\n\n        <span class=\"k-event-bottom-actions\" *ngIf=\"item.head && vertical\">\n            <span class=\"k-icon k-i-arrow-60-down\"></span>\n        </span>\n\n        <ng-container *ngIf=\"resizable && vertical\">\n            <span class=\"k-resize-handle k-resize-n\" *ngIf=\"!item.tail\"></span>\n            <span class=\"k-resize-handle k-resize-s\" *ngIf=\"!item.head\"></span>\n        </ng-container>\n\n        <ng-container *ngIf=\"resizable && !vertical\">\n            <span class=\"k-resize-handle k-resize-w\"></span>\n            <span class=\"k-resize-handle k-resize-e\"></span>\n        </ng-container>\n    "
                },] },
    ];
    /** @nocollapse */
    DayTimeViewItemComponent.ctorParameters = function () { return [
        { type: kendo_angular_intl_1.IntlService },
        { type: day_time_slot_service_1.DayTimeSlotService },
        { type: kendo_angular_l10n_1.LocalizationService },
        { type: navigation_1.FocusService },
        { type: core_1.ElementRef },
        { type: core_1.Renderer2 }
    ]; };
    DayTimeViewItemComponent.propDecorators = {
        vertical: [{ type: core_1.Input }],
        isAllDay: [{ type: core_1.Input }]
    };
    return DayTimeViewItemComponent;
}(base_view_item_1.BaseViewItem));
exports.DayTimeViewItemComponent = DayTimeViewItemComponent;
