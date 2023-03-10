import { ChangeDetectorRef, Directive, Input } from '@angular/core';
import { OCCURRENCE_ID } from './common/constants';
import { SchedulerComponent } from './scheduler.component';
import { parseRule, expand } from '@progress/kendo-recurrence';
import { toUTCDateTime } from './views/utils';
import { ZonedDate } from '@progress/kendo-date-math';
import { LocalDataChangesService } from './editing/local-data-changes.service';
import { clone, setField, getField } from './common/util';
import { IntlService } from '@progress/kendo-angular-intl';
// TODO
// Extract as public method
const occurrences = (item, fields, range, timezone, weekStart) => {
    const rrule = parseRule({
        recurrenceRule: getField(item, fields.recurrenceRule),
        weekStart: weekStart
    });
    if (!rrule.start) {
        const start = getField(item, fields.start);
        rrule.start = ZonedDate.fromLocalDate(start, timezone);
    }
    if (!rrule.end) {
        const end = getField(item, fields.end);
        rrule.end = ZonedDate.fromLocalDate(end, timezone);
    }
    const exceptions = getField(item, fields.recurrenceExceptions);
    if (exceptions) {
        rrule.exceptionDates = exceptions
            .map(exDate => ZonedDate.fromLocalDate(exDate, timezone));
        // TODO: Merge exceptions from recurrence rule with event.recurrenceException
    }
    const utcRangeStart = toUTCDateTime(range.start);
    const utcRangeEnd = toUTCDateTime(range.end);
    const series = expand(rrule, {
        rangeStart: ZonedDate.fromUTCDate(utcRangeStart, timezone),
        rangeEnd: ZonedDate.fromUTCDate(utcRangeEnd, timezone)
    });
    if (!series.events.length) {
        return [];
    }
    const expanded = series.events.map(occ => {
        const event = clone(item);
        setField(event, fields.id, OCCURRENCE_ID);
        setField(event, fields.recurrenceId, getField(item, fields.id));
        setField(event, fields.start, occ.start.toLocalDate());
        setField(event, fields.end, occ.end.toLocalDate());
        return event;
    });
    return [item, ...expanded];
};
const ??0 = occurrences;
/**
 * A directive that processes Scheduler events in-memory.
 *
 * Processing includes the expanding of recurring events and the filtering of data for
 * the currently active period.
 *
 * {% meta height:650 %}
 * {% embed_file basic-usage/app.component.ts preview %}
 * {% embed_file shared/app.module.ts %}
 * {% embed_file shared/main.ts %}
 * {% embed_file shared/events-utc.ts %}
 * {% endmeta %}
 */
export class DataBindingDirective {
    constructor(scheduler, changeDetector, intl, localDataChangesService) {
        this.scheduler = scheduler;
        this.changeDetector = changeDetector;
        this.intl = intl;
        this.localDataChangesService = localDataChangesService;
        this.originalData = [];
        if (localDataChangesService) {
            this.dataChangedSubscription = this.localDataChangesService.changes.subscribe(this.rebind.bind(this));
        }
    }
    /**
     * The array of data which will populate the Scheduler.
     */
    set data(value) {
        this.originalData = value || [];
        if (this.localDataChangesService) {
            this.localDataChangesService.data = value;
        }
        this.scheduler.events = this.process();
    }
    /**
     * @hidden
     */
    ngOnInit() {
        this.subscription = this.scheduler
            .dateChange
            .subscribe(e => this.onDateChange(e));
    }
    /**
     * @hidden
     */
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        if (this.dataChangedSubscription) {
            this.dataChangedSubscription.unsubscribe();
        }
    }
    /**
     * @hidden
     */
    rebind() {
        this.data = this.originalData;
        this.changeDetector.markForCheck();
    }
    process() {
        if (!this.dateRange) {
            // No processing until a date range is set
            return [];
        }
        const data = [];
        const fields = this.scheduler.modelFields;
        this.originalData
            .forEach(item => {
            if (getField(item, fields.recurrenceRule)) {
                const series = occurrences(item, fields, this.dateRange, this.scheduler.timezone, this.intl.firstDay());
                data.push(...series);
            }
            else {
                data.push(item);
            }
        });
        return data;
    }
    onDateChange(e) {
        this.dateRange = e.dateRange;
        this.rebind();
    }
}
DataBindingDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoSchedulerBinding]'
            },] },
];
/** @nocollapse */
DataBindingDirective.ctorParameters = () => [
    { type: SchedulerComponent },
    { type: ChangeDetectorRef },
    { type: IntlService },
    { type: LocalDataChangesService }
];
DataBindingDirective.propDecorators = {
    data: [{ type: Input, args: ['kendoSchedulerBinding',] }]
};
export { ??0 };
