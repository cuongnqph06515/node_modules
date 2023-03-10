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
export class AgendaViewComponent extends ConfigurationViewBase {
    constructor(localization, changeDetector, viewContext, viewState) {
        super(localization, changeDetector, viewContext, viewState);
        /**
         * The long-date format for displaying the
         * selected date in the Scheduler toolbar.
         * Defaults to `{0:D} - {1:D}`,
         * where `0` is the start and `1` is the end date
         * ([more information]({% slug parsingandformatting_intl %}#toc-date-formatting)).
         */
        this.selectedDateFormat = '{0:D} - {1:D}';
        /**
         * The short-date format for displaying the
         * selected date in the Scheduler toolbar.
         * Defaults to `{0:d} - {1:d}`,
         * where `0` is the start and `1` is the end date
         * ([more information]({% slug parsingandformatting_intl %}#toc-date-formatting)).
         */
        this.selectedShortDateFormat = '{0:d} - {1:d}';
        /**
         * The invariant name for this view (`agenda`).
         */
        this.name = 'agenda';
    }
    /**
     * @hidden
     */
    get title() {
        return this.localization.get('agendaViewTitle');
    }
}
AgendaViewComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-scheduler-agenda-view',
                providers: [{
                        provide: SchedulerView,
                        // tslint:disable-next-line:no-forward-ref
                        useExisting: forwardRef(() => AgendaViewComponent)
                    }],
                template: `
        <ng-template #content>
            <agenda-view-internal
                [eventTemplate]="eventTemplate?.templateRef"
                [slotClass]="viewSlotClass"
                [eventClass]="viewEventClass"
                [eventStyles]="viewEventStyles"
                [agendaTimeTemplate]="agendaTimeTemplate?.templateRef"
                [agendaDateTemplate]="agendaDateTemplate?.templateRef"
                [selectedDateFormat]="selectedDateFormat"
                [selectedShortDateFormat]="selectedShortDateFormat">
            </agenda-view-internal>
        </ng-template>
    `
            },] },
];
/** @nocollapse */
AgendaViewComponent.ctorParameters = () => [
    { type: LocalizationService },
    { type: ChangeDetectorRef },
    { type: ViewContextService },
    { type: ViewStateService }
];
AgendaViewComponent.propDecorators = {
    selectedDateFormat: [{ type: Input }],
    selectedShortDateFormat: [{ type: Input }],
    eventTemplate: [{ type: ContentChild, args: [EventTemplateDirective,] }],
    agendaTimeTemplate: [{ type: ContentChild, args: [AgendaTimeTemplateDirective,] }],
    agendaDateTemplate: [{ type: ContentChild, args: [AgendaDateTemplateDirective,] }]
};
