"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var constants_1 = require("./common/constants");
var scheduler_component_1 = require("./scheduler.component");
var kendo_recurrence_1 = require("@progress/kendo-recurrence");
var utils_1 = require("./views/utils");
var kendo_date_math_1 = require("@progress/kendo-date-math");
var local_data_changes_service_1 = require("./editing/local-data-changes.service");
var util_1 = require("./common/util");
var kendo_angular_intl_1 = require("@progress/kendo-angular-intl");
// TODO
// Extract as public method
var occurrences = function (item, fields, range, timezone, weekStart) {
    var rrule = kendo_recurrence_1.parseRule({
        recurrenceRule: util_1.getField(item, fields.recurrenceRule),
        weekStart: weekStart
    });
    if (!rrule.start) {
        var start = util_1.getField(item, fields.start);
        rrule.start = kendo_date_math_1.ZonedDate.fromLocalDate(start, timezone);
    }
    if (!rrule.end) {
        var end = util_1.getField(item, fields.end);
        rrule.end = kendo_date_math_1.ZonedDate.fromLocalDate(end, timezone);
    }
    var exceptions = util_1.getField(item, fields.recurrenceExceptions);
    if (exceptions) {
        rrule.exceptionDates = exceptions
            .map(function (exDate) {
            return kendo_date_math_1.ZonedDate.fromLocalDate(exDate, timezone);
        });
        // TODO: Merge exceptions from recurrence rule with event.recurrenceException
    }
    var utcRangeStart = utils_1.toUTCDateTime(range.start);
    var utcRangeEnd = utils_1.toUTCDateTime(range.end);
    var series = kendo_recurrence_1.expand(rrule, {
        rangeStart: kendo_date_math_1.ZonedDate.fromUTCDate(utcRangeStart, timezone),
        rangeEnd: kendo_date_math_1.ZonedDate.fromUTCDate(utcRangeEnd, timezone)
    });
    if (!series.events.length) {
        return [];
    }
    var expanded = series.events.map(function (occ) {
        var event = util_1.clone(item);
        util_1.setField(event, fields.id, constants_1.OCCURRENCE_ID);
        util_1.setField(event, fields.recurrenceId, util_1.getField(item, fields.id));
        util_1.setField(event, fields.start, occ.start.toLocalDate());
        util_1.setField(event, fields.end, occ.end.toLocalDate());
        return event;
    });
    return [item].concat(expanded);
};
var ??0 = occurrences;
exports.??0 = ??0;
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
            if (util_1.getField(item, fields.recurrenceRule)) {
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
        { type: core_1.Directive, args: [{
                    selector: '[kendoSchedulerBinding]'
                },] },
    ];
    /** @nocollapse */
    DataBindingDirective.ctorParameters = function () { return [
        { type: scheduler_component_1.SchedulerComponent },
        { type: core_1.ChangeDetectorRef },
        { type: kendo_angular_intl_1.IntlService },
        { type: local_data_changes_service_1.LocalDataChangesService }
    ]; };
    DataBindingDirective.propDecorators = {
        data: [{ type: core_1.Input, args: ['kendoSchedulerBinding',] }]
    };
    return DataBindingDirective;
}());
exports.DataBindingDirective = DataBindingDirective;
