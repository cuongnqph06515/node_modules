import { SchedulerView } from './scheduler-view';
/**
 * An action which indicates that the current view will switch to the next period
 * ([more information and examples]({% slug toolbar_scheduler %})).
 *
 * ```ts-no-run
 * const action = {
 *  type: 'next'
 * }
 * ```
 */
export interface Next {
    /** @hidden */
    type: 'next';
}
/**
 * An action which indicates that the current view will switch to the previous period
 * ([more information]({% slug api_scheduler_navigationaction %})).
 *
 * ```ts-no-run
 * const action = {
 *  type: 'prev'
 * }
 * ```
 */
export interface Prev {
    /** @hidden */
    type: 'prev';
}
/**
 * An action which indicates that the current view will switch to today's date
 * ([more information]({% slug api_scheduler_navigationaction %})).
 *
 * ```ts-no-run
 * const action = {
 *  type: 'today'
 * }
 * ```
 */
export interface Today {
    /** @hidden */
    type: 'today';
}
/**
 * An action which indicates that the current view will switch to the specified date
 * ([more information]({% slug api_scheduler_navigationaction %})).
 *
 * ```ts-no-run
 * const action = {
 *  type: 'select-date',
 *  date: new Date('2018-10-22')
 * }
 * ```
 */
export interface SelectDate {
    /** @hidden */
    type: 'select-date';
    /**
     * The date that will be selected by the Scheduler.
     */
    date: Date;
}
/**
 * An action which indicates that the selected view will be changed to the specified instance
 * ([more information and examples]({% slug toolbar_scheduler %})).
 *
 * ```ts-no-run
 * const action = {
 *  type: 'view-change',
 *  view: schedulerView
 * }
 * ```
 */
export interface ViewChange {
    /** @hidden */
    type: 'view-change';
    /**
     * The next view entry that will be displayed.
     */
    view: SchedulerView;
}
/**
 * An action which specifies that the view will scroll to the specified time.
 */
export interface ScrollTime {
    /** @hidden */
    type: 'scroll-time';
    /**
     * The time to which the view will scroll.
     */
    time: string | Date;
}
/**
 * An action which indicates that the previous event will be focused.
 */
export interface FocusPrev {
    /** @hidden */
    type: 'focus-prev';
}
/**
 * An action which indicates that the next event will be focused.
 */
export interface FocusNext {
    /** @hidden */
    type: 'focus-next';
}
/**
 * A discriminated union of supported navigation actions
 * ([more information and examples]({% slug toolbar_scheduler %})).
 *
 * The available types are:
 * * [`Next`]({% slug api_scheduler_next %})
 * * [`Prev`]({% slug api_scheduler_prev %})
 * * [`SelectDate`]({% slug api_scheduler_selectdate %})
 * * [`Today`]({% slug api_scheduler_today %})
 * * [`ViewChange`]({% slug api_scheduler_viewchange %})
 */
export declare type NavigationAction = Next | Prev | SelectDate | Today | ViewChange | ScrollTime | FocusPrev | FocusNext;
