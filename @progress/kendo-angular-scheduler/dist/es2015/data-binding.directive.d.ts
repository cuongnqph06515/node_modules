import { ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { SchedulerComponent } from './scheduler.component';
import { DateRange, SchedulerEvent } from './types';
import { LocalDataChangesService } from './editing/local-data-changes.service';
import { IntlService } from '@progress/kendo-angular-intl';
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
export declare class DataBindingDirective implements OnInit, OnDestroy {
    protected scheduler: SchedulerComponent;
    protected changeDetector: ChangeDetectorRef;
    protected intl: IntlService;
    protected localDataChangesService?: LocalDataChangesService;
    /**
     * The array of data which will populate the Scheduler.
     */
    data: any[];
    protected dateRange: DateRange;
    protected originalData: any[];
    private subscription;
    private dataChangedSubscription;
    constructor(scheduler: SchedulerComponent, changeDetector: ChangeDetectorRef, intl: IntlService, localDataChangesService?: LocalDataChangesService);
    /**
     * @hidden
     */
    ngOnInit(): void;
    /**
     * @hidden
     */
    ngOnDestroy(): void;
    /**
     * @hidden
     */
    rebind(): void;
    protected process(): SchedulerEvent[];
    private onDateChange;
}
