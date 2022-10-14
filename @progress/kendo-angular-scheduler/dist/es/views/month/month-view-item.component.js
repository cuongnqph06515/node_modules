import * as tslib_1 from "tslib";
import { Component, ElementRef, Renderer2 } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { MonthSlotService } from './month-slot.service';
import { BaseViewItem } from '../view-items/base-view-item';
import { FocusService } from '../../navigation';
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
        { type: Component, args: [{
                    // tslint:disable-next-line:component-selector
                    selector: '[monthViewItem]',
                    template: "\n        <span class=\"k-event-actions\">\n            <span class=\"k-icon k-i-arrow-60-left\" *ngIf=\"item.tail\"></span>\n            <span class=\"k-icon k-i-reload\" *ngIf=\"isRecurrence\"></span>\n            <span class=\"k-icon k-i-non-recurrence\" *ngIf=\"isRecurrenceException\"></span>\n        </span>\n        <ng-container *ngIf=\"eventTemplate\" [ngTemplateOutlet]=\"eventTemplate\"\n            [ngTemplateOutletContext]=\"{ $implicit: item.event, event: item.event, resources: resources }\">\n        </ng-container>\n        <div *ngIf=\"!eventTemplate\" [attr.title]=\"eventTitle\">\n            <div class=\"k-event-template\">{{ item.event.title }}</div>\n        </div>\n\n        <span class=\"k-event-actions\">\n            <a *ngIf=\"removable\" href=\"#\" class=\"k-link k-event-delete\" tabindex=\"-1\" [attr.title]=\"deleteMessage\" [attr.aria-label]=\"deleteMessage\">\n                <span class=\"k-icon k-i-close\"></span>\n            </a>\n            <span class=\"k-icon k-i-arrow-60-right\" *ngIf=\"item.head\"></span>\n        </span>\n\n        <ng-container *ngIf=\"resizable\">\n            <span class=\"k-resize-handle k-resize-w\"></span>\n            <span class=\"k-resize-handle k-resize-e\"></span>\n        </ng-container>\n    "
                },] },
    ];
    /** @nocollapse */
    MonthViewItemComponent.ctorParameters = function () { return [
        { type: MonthSlotService },
        { type: LocalizationService },
        { type: FocusService },
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    return MonthViewItemComponent;
}(BaseViewItem));
export { MonthViewItemComponent };
