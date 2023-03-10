import { Component, HostBinding, Input, TemplateRef } from '@angular/core';
import { IntlService } from '@progress/kendo-angular-intl';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { toLocalDate } from '@progress/kendo-date-math';
import { convertNgClassBindings } from '../utils';
/**
 * @hidden
 */
export class AgendaListComponent {
    constructor(intlService, localization) {
        this.intlService = intlService;
        this.localization = localization;
        this.classes = true;
    }
    extractDataItem(item) {
        return item.type === "group" ? item.dataItem.items[0] : item.dataItem;
    }
    formatTime(dataItem) {
        if (dataItem.isAllDay) {
            return this.localization.get('allDay');
        }
        let format = "{0:t}-{1:t}";
        if (dataItem.head) {
            format = "{0:t}";
        }
        else if (dataItem.tail) {
            format = "{1:t}";
        }
        return this.intlService.format(format, toLocalDate(dataItem.start), toLocalDate(dataItem.end));
    }
    trackByFn(_, item) {
        return item.dataItem;
    }
    cellClasses(item) {
        const task = this.extractDataItem(item);
        let result = [];
        if (this.slotClass) {
            result = result.concat(convertNgClassBindings(this.slotClass({
                start: task.start,
                end: task.end,
                resources: task.resources,
                event: task.event
            })));
        }
        if (this.eventClass) {
            result = result.concat(convertNgClassBindings(this.eventClass({
                event: task.event,
                resources: task.resources
            })));
        }
        return result;
    }
    getEventStyles(item) {
        if (this.eventStyles) {
            const task = this.extractDataItem(item);
            return this.eventStyles({
                event: task.event,
                resources: task.resources
            });
        }
    }
}
AgendaListComponent.decorators = [
    { type: Component, args: [{
                // tslint:disable-next-line:component-selector
                selector: '[kendoSchedulerAgendaList]',
                template: `
        <table class="k-scheduler-table" role="presentation">
            <tbody>
                <ng-container *ngFor="let group of tasks; let groupIndex = index;">
                    <tr *ngFor="let item of group.tasks;let index = index; trackBy: trackByFn">
                        <ng-container *ngFor="let resource of group.resources;let resourceIndex = index">
                            <td *ngIf="group.spans[resourceIndex] && index === 0" class="k-scheduler-groupcolumn" [attr.rowspan]="group.spans[resourceIndex]">
                                {{ resource }}
                            </td>
                        </ng-container>
                        <td *ngIf="item.type === 'group'"
                            [kendoSchedulerAgendaHeaderItem]="item"
                            [agendaDateTemplate]="agendaDateTemplate">
                        </td>
                        <td class="k-scheduler-timecolumn">
                            <div *ngIf="!agendaTimeTemplate">
                                <span class="k-icon k-i-arrow-60-left" *ngIf="extractDataItem(item).tail"></span>
                                {{formatTime(extractDataItem(item)) }}
                                <span class="k-icon k-i-arrow-60-right" *ngIf="extractDataItem(item).head"></span>
                            </div>
                            <ng-container *ngIf="agendaTimeTemplate" [ngTemplateOutlet]="agendaTimeTemplate"
                                [ngTemplateOutletContext]="extractDataItem(item)">
                            </ng-container>
                        </td>
                        <td [attr.data-group-index]="groupIndex" [attr.data-task-index]="index"
                            [ngClass]="cellClasses(item)" [ngStyle]="getEventStyles(item)"
                            [kendoSchedulerFocusIndex]="groupIndex"
                            [kendoSchedulerAgendaTaskItem]="extractDataItem(item)"
                                [editable]="editable"
                                [eventTemplate]="eventTemplate"
                        ></td>
                    </tr>
                </ng-container>
            </tbody>
        </table>
    `
            },] },
];
/** @nocollapse */
AgendaListComponent.ctorParameters = () => [
    { type: IntlService },
    { type: LocalizationService }
];
AgendaListComponent.propDecorators = {
    classes: [{ type: HostBinding, args: ['class.k-scheduler-content',] }],
    tasks: [{ type: Input }],
    eventTemplate: [{ type: Input }],
    slotClass: [{ type: Input }],
    eventClass: [{ type: Input }],
    eventStyles: [{ type: Input }],
    agendaTimeTemplate: [{ type: Input }],
    agendaDateTemplate: [{ type: Input }],
    editable: [{ type: Input }]
};
