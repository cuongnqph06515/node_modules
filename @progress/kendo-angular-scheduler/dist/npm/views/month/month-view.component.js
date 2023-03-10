"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var types_1 = require("../../types");
var configuration_view_base_1 = require("../common/configuration-view-base");
var view_context_service_1 = require("../view-context.service");
var view_state_service_1 = require("../view-state.service");
var templates_1 = require("../templates");
var constants_1 = require("../constants");
var util_1 = require("../../common/util");
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
            return util_1.isPresent(this.eventHeight) ? this.eventHeight : (this.schedulerOptions.eventHeight || constants_1.DEFAULT_EVENT_HEIGHT);
        },
        enumerable: true,
        configurable: true
    });
    MonthViewComponent.decorators = [
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-scheduler-month-view',
                    providers: [{
                            provide: types_1.SchedulerView,
                            // tslint:disable-next-line:no-forward-ref
                            useExisting: core_1.forwardRef(function () { return MonthViewComponent; })
                        }],
                    template: "\n        <ng-template #content>\n            <month-view\n                [eventHeight]=\"viewEventHeight\"\n                [\u0435ventTemplate]=\"eventTemplate?.templateRef\"\n                [slotClass]=\"viewSlotClass\"\n                [eventClass]=\"viewEventClass\"\n                [eventStyles]=\"viewEventStyles\"\n                [groupHeaderTemplate]=\"groupHeaderTemplate?.templateRef\"\n                [monthDaySlotTemplate]=\"monthDaySlotTemplate?.templateRef\"\n                [selectedDateFormat]=\"selectedDateFormat\"\n                [selectedShortDateFormat]=\"selectedShortDateFormat\">\n            </month-view>\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    MonthViewComponent.ctorParameters = function () { return [
        { type: kendo_angular_l10n_1.LocalizationService },
        { type: core_1.ChangeDetectorRef },
        { type: view_context_service_1.ViewContextService },
        { type: view_state_service_1.ViewStateService }
    ]; };
    MonthViewComponent.propDecorators = {
        eventHeight: [{ type: core_1.Input }],
        selectedDateFormat: [{ type: core_1.Input }],
        selectedShortDateFormat: [{ type: core_1.Input }],
        monthDaySlotTemplate: [{ type: core_1.ContentChild, args: [templates_1.MonthDaySlotTemplateDirective,] }]
    };
    return MonthViewComponent;
}(configuration_view_base_1.ConfigurationViewBase));
exports.MonthViewComponent = MonthViewComponent;
