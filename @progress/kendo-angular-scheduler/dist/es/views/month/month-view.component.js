import * as tslib_1 from "tslib";
import { Component, ContentChild, forwardRef, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { SchedulerView } from '../../types';
import { ConfigurationViewBase } from '../common/configuration-view-base';
import { ViewContextService } from '../view-context.service';
import { ViewStateService } from '../view-state.service';
import { MonthDaySlotTemplateDirective } from '../templates';
import { DEFAULT_EVENT_HEIGHT } from '../constants';
import { isPresent } from '../../common/util';
/**
 * The component for rendering the **Month** view.
 */
var MonthViewComponent = /** @class */ (function (_super) {
    tslib_1.__extends(MonthViewComponent, _super);
    function MonthViewComponent(localization, changeDetector, viewContext, viewState) {
        var _this = _super.call(this, localization, changeDetector, viewContext, viewState) || this;
        /**
         * The long-date format for displaying the
         * selected date in the Scheduler toolbar.
         * Defaults to `{0:Y}`
         * ([more information]({% slug parsingandformatting_intl %}#toc-date-formatting)).
         */
        _this.selectedDateFormat = '{0:Y}';
        /**
         * The short-date format for displaying the
         * selected date in the Scheduler toolbar.
         * Defaults to `{0:y}`
         * ([more information]({% slug parsingandformatting_intl %}#toc-date-formatting.
         */
        _this.selectedShortDateFormat = '{0:y}';
        /**
         * The invariant name for this view (`month`).
         */
        _this.name = 'month';
        return _this;
    }
    Object.defineProperty(MonthViewComponent.prototype, "title", {
        /**
         * @hidden
         */
        get: function () {
            return this.localization.get('monthViewTitle');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MonthViewComponent.prototype, "viewEventHeight", {
        get: function () {
            return isPresent(this.eventHeight) ? this.eventHeight : (this.schedulerOptions.eventHeight || DEFAULT_EVENT_HEIGHT);
        },
        enumerable: true,
        configurable: true
    });
    MonthViewComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-scheduler-month-view',
                    providers: [{
                            provide: SchedulerView,
                            // tslint:disable-next-line:no-forward-ref
                            useExisting: forwardRef(function () { return MonthViewComponent; })
                        }],
                    template: "\n        <ng-template #content>\n            <month-view\n                [eventHeight]=\"viewEventHeight\"\n                [\u0435ventTemplate]=\"eventTemplate?.templateRef\"\n                [slotClass]=\"viewSlotClass\"\n                [eventClass]=\"viewEventClass\"\n                [eventStyles]=\"viewEventStyles\"\n                [groupHeaderTemplate]=\"groupHeaderTemplate?.templateRef\"\n                [monthDaySlotTemplate]=\"monthDaySlotTemplate?.templateRef\"\n                [selectedDateFormat]=\"selectedDateFormat\"\n                [selectedShortDateFormat]=\"selectedShortDateFormat\">\n            </month-view>\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    MonthViewComponent.ctorParameters = function () { return [
        { type: LocalizationService },
        { type: ChangeDetectorRef },
        { type: ViewContextService },
        { type: ViewStateService }
    ]; };
    MonthViewComponent.propDecorators = {
        eventHeight: [{ type: Input }],
        selectedDateFormat: [{ type: Input }],
        selectedShortDateFormat: [{ type: Input }],
        monthDaySlotTemplate: [{ type: ContentChild, args: [MonthDaySlotTemplateDirective,] }]
    };
    return MonthViewComponent;
}(ConfigurationViewBase));
export { MonthViewComponent };
