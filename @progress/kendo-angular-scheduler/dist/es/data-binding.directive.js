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
var occurrences = function (item, fields, range, timezone, weekStart) {
    var rrule = parseRule({
        recurrenceRule: getField(item, fields.recurrenceRule),
        weekStart: weekStart
    });
    if (!rrule.start) {
        var start = getField(item, fields.start);
        rrule.start = ZonedDate.fromLocalDate(start, timezone);
    }
    if (!rrule.end) {
        var end = getField(item, fields.end);
        rrule.end = ZonedDate.fromLocalDate(end, timezone);
    }
    var exceptions = getField(item, fields.recurrenceExceptions);
    if (exceptions) {
        rrule.exceptionDates = exceptions
            .map(function (exDate) {
            return ZonedDate.fromLocalDate(exDate, timezone);
        });
        // TODO: Merge exceptions from recurrence rule with event.recurrenceException
    }
    var utcRangeStart = toUTCDateTime(range.start);
    var utcRangeEnd = toUTCDateTime(range.end);
    var series = expand(rrule, {
        rangeStart: ZonedDate.fromUTCDate(utcRangeStart, timezone),
        rangeEnd: ZonedDate.fromUTCDate(utcRangeEnd, timezone)
    });
    if (!series.events.length) {
        return [];
    }
    var expanded = series.events.map(function (occ) {
        var event = clone(item);
        setField(event, fields.id, OCCURRENCE_ID);
        setField(event, fields.recurrenceId, getField(item, fields.id));
        setField(event, fields.start, occ.start.toLocalDate());
        setField(event, fields.end, occ.end.toLocalDate());
        return event;
    });
    return [item].concat(expanded);
};
var ??0 = occurrences;
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
var DataBindingDirective = /** @class */ (function () {
    function DataBindingDirective(scheduler, changeDetector, intl, localDataChangesService) {
        this.scheduler = scheduler;
        this.changeDetector = changeDetector;
        this.intl = intl;
        this.localDataChangesService = localDataChangesService;
        this.originalData = [];
        if (localDataChangesService) {
            this.dataChangedSubscription = this.localDataChangesService.changes.subscribe(this.rebind.bind(this));
        }
    }
    Object.defineProperty(DataBindingDirective.prototype, "data", {
        /**
         * The array of data which will populate the Scheduler.
         */
        set: function (value) {
            this.originalData = value || [];
            if (this.localDataChangesService) {
                this.localDataChangesService.data = value;
            }
            this.scheduler.events = this.process();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    DataBindingDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.scheduler
            .dateChange
            .subscribe(function (e) { return _this.onDateChange(e); });
    };
    /**
     * @hidden
     */
    DataBindingDirective.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        if (this.dataChangedSubscription) {
            this.dataChangedSubscription.unsubscribe();
        }
    };
    /**
     * @hidden
     */
    DataBindingDirective.prototype.rebind = function () {
        this.data = this.originalData;
        this.changeDetector.markForCheck();
    };
    DataBindingDirective.prototype.process = function () {
        var _this = this;
        if (!this.dateRange) {
            // No processing until a date range is set
            return [];
        }
        var data = [];
        var fields = this.scheduler.modelFields;
        this.originalData
            .forEach(function (item) {
            if (getField(item, fields.recurrenceRule)) {
                var series = occurrences(item, fields, _this.dateRange, _this.scheduler.timezone, _this.intl.firstDay());
                data.push.apply(data, series);
            }
            else {
                data.push(item);
            }
        });
        return data;
    };
    DataBindingDirective.prototype.onDateChange = function (e) {
        this.dateRange = e.dateRange;
        this.rebind();
    };
    DataBindingDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoSchedulerBinding]'
                },] },
    ];
    /** @nocollapse */
    DataBindingDirective.ctorParameters = function () { return [
        { type: SchedulerComponent },
        { type: ChangeDetectorRef },
        { type: IntlService },
        { type: LocalDataChangesService }
    ]; };
    DataBindingDirective.propDecorators = {
        data: [{ type: Input, args: ['kendoSchedulerBinding',] }]
    };
    return DataBindingDirective;
}());
export { DataBindingDirective };
export { ??0 };
