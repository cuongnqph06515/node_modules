"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var month_slot_service_1 = require("./month-slot.service");
var base_view_item_1 = require("../view-items/base-view-item");
var navigation_1 = require("../../navigation");
/**
 * @hidden
 */
var MonthViewItemComponent = /** @class */ (function (_super) {
    tslib_1.__extends(MonthViewItemComponent, _super);
    function MonthViewItemComponent(slotService, localization, focusService, element, renderer) {
        return _super.call(this, slotService, localization, focusService, element, renderer) || this;
    }
    MonthViewItemComponent.prototype.reflow = function () {
        if (this.item.data[this.resourceIndex].hidden) {
            this.toggle(false);
            return;
        }
        _super.prototype.reflow.call(this);
    };
    MonthViewItemComponent.decorators = [
        { type: core_1.Component, args: [{
                    // tslint:disable-next-line:component-selector
                    selector: '[monthViewItem]',
                    template: "\n        <span class=\"k-event-actions\">\n            <span class=\"k-icon k-i-arrow-60-left\" *ngIf=\"item.tail\"></span>\n            <span class=\"k-icon k-i-reload\" *ngIf=\"isRecurrence\"></span>\n            <span class=\"k-icon k-i-non-recurrence\" *ngIf=\"isRecurrenceException\"></span>\n        </span>\n        <ng-container *ngIf=\"eventTemplate\" [ngTemplateOutlet]=\"eventTemplate\"\n            [ngTemplateOutletContext]=\"{ $implicit: item.event, event: item.event, resources: resources }\">\n        </ng-container>\n        <div *ngIf=\"!eventTemplate\" [attr.title]=\"eventTitle\">\n            <div class=\"k-event-template\">{{ item.event.title }}</div>\n        </div>\n\n        <span class=\"k-event-actions\">\n            <a *ngIf=\"removable\" href=\"#\" class=\"k-link k-event-delete\" tabindex=\"-1\" [attr.title]=\"deleteMessage\" [attr.aria-label]=\"deleteMessage\">\n                <span class=\"k-icon k-i-close\"></span>\n            </a>\n            <span class=\"k-icon k-i-arrow-60-right\" *ngIf=\"item.head\"></span>\n        </span>\n\n        <ng-container *ngIf=\"resizable\">\n            <span class=\"k-resize-handle k-resize-w\"></span>\n            <span class=\"k-resize-handle k-resize-e\"></span>\n        </ng-container>\n    "
                },] },
    ];
    /** @nocollapse */
    MonthViewItemComponent.ctorParameters = function () { return [
        { type: month_slot_service_1.MonthSlotService },
        { type: kendo_angular_l10n_1.LocalizationService },
        { type: navigation_1.FocusService },
        { type: core_1.ElementRef },
        { type: core_1.Renderer2 }
    ]; };
    return MonthViewItemComponent;
}(base_view_item_1.BaseViewItem));
exports.MonthViewItemComponent = MonthViewItemComponent;
