/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Action } from './navigation-action.enum';
import { CellContext } from './cell-context.interface';
/**
 * @hidden
 */
export interface ViewService {
    addToDate(min: Date, skip: number): Date;
    datesList(start: Date, count: number): Date[];
    data(options: any): CellContext[][];
    isEqual(candidate: Date, expected: Date): boolean;
    isInArray(date: Date, dates: Date[]): boolean;
    isInRange(candidate: Date, min: Date, max: Date): boolean;
    isRangeStart(date: Date): boolean;
    move(date: Date, action: Action): Date;
    cellTitle(current: Date): string;
    navigationTitle(current: Date): string;
    title(current: Date): string;
    rowLength(prependCell?: boolean): number;
    skip(value: Date, min: Date): number;
    total(min: Date, max: Date): number;
    value(current: Date): string;
    viewDate(date: Date, max: Date, viewsCount: number): Date;
    beginningOfPeriod(date: Date): Date;
}
