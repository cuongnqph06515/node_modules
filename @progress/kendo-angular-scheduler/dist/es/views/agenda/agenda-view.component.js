import * as tslib_1 from "tslib";
import { Component, forwardRef, Input, ContentChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { ConfigurationViewBase } from '../common/configuration-view-base';
import { SchedulerView } from '../../types';
import { ViewContextService } from '../view-context.service';
import { ViewStateService } from '../view-state.service';
import { EventTemplateDirective, AgendaTimeTemplateDirective, AgendaDateTemplateDirective } from '../templates';
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
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-scheduler-agenda-view',
                    providers: [{
                            provide: SchedulerView,
                            // tslint:disable-next-line:no-forward-ref
                            useExisting: forwardRef(function () { return AgendaViewComponent; })
                        }],
                    template: "\n        <ng-template #content>\n            <agenda-view-internal\n                [eventTemplate]=\"eventTemplate?.templateRef\"\n                [slotClass]=\"viewSlotClass\"\n                [eventClass]=\"viewEventClass\"\n                [eventStyles]=\"viewEventStyles\"\n                [agendaTimeTemplate]=\"agendaTimeTemplate?.templateRef\"\n                [agendaDateTemplate]=\"agendaDateTemplate?.templateRef\"\n                [selectedDateFormat]=\"selectedDateFormat\"\n                [selectedShortDateFormat]=\"selectedShortDateFormat\">\n            </agenda-view-internal>\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    AgendaViewComponent.ctorParameters = function () { return [
        { type: LocalizationService },
        { type: ChangeDetectorRef },
        { type: ViewContextService },
        { type: ViewStateService }
    ]; };
    AgendaViewComponent.propDecorators = {
        selectedDateFormat: [{ type: Input }],
        selectedShortDateFormat: [{ type: Input }],
        eventTemplate: [{ type: ContentChild, args: [EventTemplateDirective,] }],
        agendaTimeTemplate: [{ type: ContentChild, args: [AgendaTimeTemplateDirective,] }],
        agendaDateTemplate: [{ type: ContentChild, args: [AgendaDateTemplateDirective,] }]
    };
    return AgendaViewComponent;
}(ConfigurationViewBase));
export { AgendaViewComponent };
