"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var configuration_view_base_1 = require("../common/configuration-view-base");
var types_1 = require("../../types");
var view_context_service_1 = require("../view-context.service");
var view_state_service_1 = require("../view-state.service");
var templates_1 = require("../templates");
/**
 * The component for rendering the **Agenda** view.
 */
var AgendaViewComponent = /** @class */ (function (_super) {
    tslib_1.__extends(AgendaViewComponent, _super);
    function AgendaViewComponent(localization, changeDetector, viewContext, viewState) {
        var _this = _super.call(this, localization, changeDetector, viewContext, viewState) || this;
        /**
         * The long-date format for displaying the
         * selected date in the Scheduler toolbar.
         * Defaults to `{0:D} - {1:D}`,
         * where `0` is the start and `1` is the end date
         * ([more information]({% slug parsingandformatting_intl %}#toc-date-formatting)).
         */
        _this.selectedDateFormat = '{0:D} - {1:D}';
        /**
         * The short-date format for displaying the
         * selected date in the Scheduler toolbar.
         * Defaults to `{0:d} - {1:d}`,
         * where `0` is the start and `1` is the end date
         * ([more information]({% slug parsingandformatting_intl %}#toc-date-formatting)).
         */
        _this.selectedShortDateFormat = '{0:d} - {1:d}';
        /**
         * The invariant name for this view (`agenda`).
         */
        _this.name = 'agenda';
        return _this;
    }
    Object.defineProperty(AgendaViewComponent.prototype, "title", {
        /**
         * @hidden
         */
        get: function () {
            return this.localization.get('agendaViewTitle');
        },
        enumerable: true,
        configurable: true
    });
    AgendaViewComponent.decorators = [
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-scheduler-agenda-view',
                    providers: [{
                            provide: types_1.SchedulerView,
                            // tslint:disable-next-line:no-forward-ref
                            useExisting: core_1.forwardRef(function () { return AgendaViewComponent; })
                        }],
                    template: "\n        <ng-template #content>\n            <agenda-view-internal\n                [eventTemplate]=\"eventTemplate?.templateRef\"\n                [slotClass]=\"viewSlotClass\"\n                [eventClass]=\"viewEventClass\"\n                [eventStyles]=\"viewEventStyles\"\n                [agendaTimeTemplate]=\"agendaTimeTemplate?.templateRef\"\n                [agendaDateTemplate]=\"agendaDateTemplate?.templateRef\"\n                [selectedDateFormat]=\"selectedDateFormat\"\n                [selectedShortDateFormat]=\"selectedShortDateFormat\">\n            </agenda-view-internal>\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    AgendaViewComponent.ctorParameters = function () { return [
        { type: kendo_angular_l10n_1.LocalizationService },
        { type: core_1.ChangeDetectorRef },
        { type: view_context_service_1.ViewContextService },
        { type: view_state_service_1.ViewStateService }
    ]; };
    AgendaViewComponent.propDecorators = {
        selectedDateFormat: [{ type: core_1.Input }],
        selectedShortDateFormat: [{ type: core_1.Input }],
        eventTemplate: [{ type: core_1.ContentChild, args: [templates_1.EventTemplateDirective,] }],
        agendaTimeTemplate: [{ type: core_1.ContentChild, args: [templates_1.AgendaTimeTemplateDirective,] }],
        agendaDateTemplate: [{ type: core_1.ContentChild, args: [templates_1.AgendaDateTemplateDirective,] }]
    };
    return AgendaViewComponent;
}(configuration_view_base_1.ConfigurationViewBase));
exports.AgendaViewComponent = AgendaViewComponent;
