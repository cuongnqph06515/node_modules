/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Action } from '../models/navigation-action.enum';
import { CellContext } from '../models/cell-context.interface';
import { ViewService } from '../models/view-service.interface';
/**
 * @hidden
 */
export declare class CenturyViewService implements ViewService {
    addToDate(min: Date, skip: number): Date;
    datesList(start: Date, count: number): Date[];
    data(options: any): CellContext[][];
    isEqual(candidate: Date, expected: Date): boolean;
    isInArray(date: Date, dates: Date[]): boolean;
    isInRange(candidate: Date, min: Date, max: Date): boolean;
    beginningOfPeriod(date: Date): Date;
    isRangeStart(value: Date): boolean;
    move(value: Date, action: Action): Date;
    cellTitle(value: Date): string;
    navigationTitle(value?: Date): string;
    title(value?: Date): string;
    rowLength(_?: boolean): number;
    skip(value: Date, min: Date): number;
    total(min: Date, max: Date): number;
    value(current: Date): string;
    viewDate(date: Date, max: Date, viewsCount?: number): Date;
    private normalize;
}
