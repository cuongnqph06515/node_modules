import { ZonedDate } from '@progress/kendo-date-math';
import { FormGroup } from '@angular/forms';
/** @hidden */
export declare const intersects: (startTime: Date, endTime: Date, periodStart: Date, periodEnd: Date) => boolean;
/** @hidden */
export declare const dateInRange: (date: Date, start: Date, end: Date) => boolean;
/** @hidden */
export declare const roundAllDayEnd: ({ start, end }: {
    start: any;
    end: any;
}) => ZonedDate;
/** @hidden */
export declare function toInvariantTime(date: Date): Date;
/**
 * @hidden
 * TODO Move to date-math
 */
export declare const addUTCDays: (date: Date, offset: number) => Date;
/**
 * @hidden
 */
export declare function timeOnDate(date: Date, hours?: number, minutes?: number, seconds?: number, ms?: number): Date;
/** @hidden */
export declare function toUTCTime(localDate: Date, localTime: Date): Date;
/** @hidden */
export declare function toUTCDate(localDate: Date): Date;
/** @hidden */
export declare function getUTCDate(utcDate: Date): Date;
/** @hidden */
export declare function toUTCDateTime(localDate: Date): Date;
/** @hidden */
export declare function dateWithTime(target: Date, time: Date): Date;
/** @hidden */
export declare function resourceItemByValue(event: any, resource: any): any;
/** @hidden */
export declare function eventResources(event: any, { taskResources, hasGroups, spans, allResources }: any): any[];
/** @hidden */
export declare function assignTasksResources(tasks: any[], options: any): void;
/** @hidden */
export declare function findRowIndex(events: any[], data: any): number;
/** @hidden */
export declare function isRecurrence(task: any): boolean;
/** @hidden */
export declare function isRecurrenceException(task: any): boolean;
/** @hidden */
export declare const rectContains: (rect: any, left: number, top: number) => boolean;
/** @hidden */
export declare const rectContainsX: (rect: any, left: number) => boolean;
/** @hidden */
export declare const toPx: (value: any) => string;
/** @hidden */
export declare const elementOffset: (element: any) => any;
/** @hidden */
export declare const pointDistance: (x1: number, y1: number, x2: number, y2: number) => number;
/** @hidden */
export declare const ignoreContentChild: (child: any) => boolean;
/** @hidden */
export declare const setCoordinates: (element: any, coordinates: any) => void;
/** @hidden */
export declare const convertNgClassBindings: (bindingValues: any) => string[];
/**
 * @hidden
 */
export declare function formatEventTime(start: Date, end: Date, isAllDay: boolean): string;
/**
 * @hidden
 */
export declare function formValueOrDefault(group: FormGroup, field: string, defaultValue: any): any;
/**
 * @hidden
 */
export declare const isWorkWeekDay: (day: number, start: number, end: number) => boolean;
