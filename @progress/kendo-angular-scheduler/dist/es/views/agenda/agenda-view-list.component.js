import { Component, HostBinding, Input, TemplateRef } from '@angular/core';
import { IntlService } from '@progress/kendo-angular-intl';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { toLocalDate } from '@progress/kendo-date-math';
import { convertNgClassBindings } from '../utils';
/**
 * @hidden
 */
var AgendaListComponent = /** @class */ (function () {
    function AgendaListComponent(intlService, localization) {
        this.intlService = intlService;
        this.localization = localization;
        this.classes = true;
    }
    AgendaListComponent.prototype.extractDataItem = function (item) {
        return item.type === "group" ? item.dataItem.items[0] : item.dataItem;
    };
    AgendaListComponent.prototype.formatTime = function (dataItem) {
        if (dataItem.isAllDay) {
            return this.localization.get('allDay');
        }
        var format = "{0:t}-{1:t}";
        if (dataItem.head) {
            format = "{0:t}";
        }
        else if (dataItem.tail) {
            format = "{1:t}";
        }
        return this.intlService.format(format, toLocalDate(dataItem.start), toLocalDate(dataItem.end));
    };
    AgendaListComponent.prototype.trackByFn = function (_, item) {
        return item.dataItem;
    };
    AgendaListComponent.prototype.cellClasses = function (item) {
        var task = this.extractDataItem(item);
        var result = [];
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
    };
    AgendaListComponent.prototype.getEventStyles = function (item) {
        if (this.eventStyles) {
            var task = this.extractDataItem(item);
            return this.eventStyles({
                event: task.event,
                resources: task.resources
            });
        }
    };
    AgendaListComponent.decorators = [
        { type: Component, args: [{
                    // tslint:disable-next-line:component-selector
                    selector: '[kendoSchedulerAgendaList]',
                    template: "\n        <table class=\"k-scheduler-table\" role=\"presentation\">\n            <tbody>\n                <ng-container *ngFor=\"let group of tasks; let groupIndex = index;\">\n                    <tr *ngFor=\"let item of group.tasks;let index = index; trackBy: trackByFn\">\n                        <ng-container *ngFor=\"let resource of group.resources;let resourceIndex = index\">\n                            <td *ngIf=\"group.spans[resourceIndex] && index === 0\" class=\"k-scheduler-groupcolumn\" [attr.rowspan]=\"group.spans[resourceIndex]\">\n                                {{ resource }}\n                            </td>\n                        </ng-container>\n                        <td *ngIf=\"item.type === 'group'\"\n                            [kendoSchedulerAgendaHeaderItem]=\"item\"\n                            [agendaDateTemplate]=\"agendaDateTemplate\">\n                        </td>\n                        <td class=\"k-scheduler-timecolumn\">\n                            <div *ngIf=\"!agendaTimeTemplate\">\n                                <span class=\"k-icon k-i-arrow-60-left\" *ngIf=\"extractDataItem(item).tail\"></span>\n                                {{formatTime(extractDataItem(item)) }}\n                                <span class=\"k-icon k-i-arrow-60-right\" *ngIf=\"extractDataItem(item).head\"></span>\n                            </div>\n                            <ng-container *ngIf=\"agendaTimeTemplate\" [ngTemplateOutlet]=\"agendaTimeTemplate\"\n                                [ngTemplateOutletContext]=\"extractDataItem(item)\">\n                            </ng-container>\n                        </td>\n                        <td [attr.data-group-index]=\"groupIndex\" [attr.data-task-index]=\"index\"\n                            [ngClass]=\"cellClasses(item)\" [ngStyle]=\"getEventStyles(item)\"\n                            [kendoSchedulerFocusIndex]=\"groupIndex\"\n                            [kendoSchedulerAgendaTaskItem]=\"extractDataItem(item)\"\n                                [editable]=\"editable\"\n                                [eventTemplate]=\"eventTemplate\"\n                        ></td>\n                    </tr>\n                </ng-container>\n            </tbody>\n        </table>\n    "
                },] },
    ];
    /** @nocollapse */
    AgendaListComponent.ctorParameters = function () { return [
        { type: IntlService },
        { type: LocalizationService }
    ]; };
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
    return AgendaListComponent;
}());
export { AgendaListComponent };
