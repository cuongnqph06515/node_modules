import { Observable } from 'rxjs';
import { SchedulerEvent } from '../types/scheduler-event';
import { SchedulerModelFields } from '../types';
/**
 * @hidden
 *
 * TODO: Move to @progress/kendo-common
 */
export declare const capitalize: (value: string) => string;
/**
 * @hidden
 *
 * TODO: Move to @progress/kendo-common
 */
export declare const isPresent: (value: any) => boolean;
/**
 * @hidden
 *
 * TODO: Move to @progress/kendo-common
 */
export declare const isBlank: (value: any) => boolean;
/**
 * @hidden
 *
 * TODO: Move to @progress/kendo-common
 */
export declare const isArray: (value: any) => boolean;
/**
 * @hidden
 *
 * TODO: Move to @progress/kendo-common
 */
export declare const isTruthy: (value: any) => boolean;
/**
 * @hidden
 *
 * TODO: Move to @progress/kendo-common
 */
export declare const isNullOrEmptyString: (value: string) => boolean;
/**
 * @hidden
 *
 * TODO: Move to @progress/kendo-common
 */
export declare const isNumber: (value: any) => boolean;
/**
 * @hidden
 *
 * TODO: Move to @progress/kendo-common
 */
export declare const isString: (value: any) => boolean;
/**
 * @hidden
 *
 * TODO: Move to @progress/kendo-common
 */
export declare const isObject: (value: any) => boolean;
/**
 * @hidden
 */
export declare const isRecurring: (event: SchedulerEvent, fields: SchedulerModelFields) => boolean;
/**
 * @hidden
 */
export declare const isException: (event: any, fields: SchedulerModelFields) => boolean;
/**
 * @hidden
 */
export declare const copyResources: (event: any, resources?: any[]) => void;
/**
 * @hidden
 */
export declare const readEvent: (dataItem: any, fields: SchedulerModelFields, resources?: any[]) => any;
/**
 * @hidden
 */
export declare const isRecurrenceMaster: (event: SchedulerEvent) => boolean;
/**
 * @hidden
 */
export declare function groupResources(group: any, resources: any[]): any[];
/**
 * @hidden
 */
export declare const getField: (obj: any, field: any) => any;
/**
 * @hidden
 */
export declare const setField: (obj: any, field: any, value: any) => any;
/**
 * @hidden
 */
export declare function assignField(target: any, source: any, field: string): any;
/**
 * @hidden
 */
export declare function assignFields(target: any, source: any, ...fields: string[]): any;
/**
 * @hidden
 */
export declare function assignValues(target: any, source: any): any;
/**
 * @hidden
 */
export declare function cloneTo(obj: any, result: any): void;
/**
 * @hidden
 */
export declare function clone(obj: any): any;
/** @hidden */
export declare const iterator: any;
/**
 * @hidden
 */
export declare function fromClick(element: any): Observable<any>;
/**
 * @hidden
 */
export declare function fromDoubleClick(element: any): Observable<any>;
/**
 * @hidden
 */
export declare function sortTasksByTime(tasks: any[]): any[];
