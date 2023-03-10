/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { IntlService } from '@progress/kendo-angular-intl';
import { ListServiceSettings } from '../models/list-service-settings';
import { ListService } from '../models/list-service.interface';
import { ListItem } from '../models/list-item.interface';
/**
 * @hidden
 */
export declare class HoursService implements ListService {
    private intl;
    private boundRange;
    private insertUndividedMax;
    private min;
    private max;
    private step;
    private toListItem;
    constructor(intl: IntlService);
    apply(value: Date, candidate: Date): Date;
    configure(settings: ListServiceSettings): void;
    data(selectedValue?: Date): ListItem[];
    isRangeChanged(min: Date, max: Date): boolean;
    limitRange(min: Date, max: Date, value?: Date): Date[];
    total(value?: Date): number;
    selectedIndex(value: Date): number;
    valueInList(value: Date): boolean;
    private addLast;
    private addMissing;
    private countFromMin;
    private isMissing;
    private isLastMissing;
    private divideByStep;
    private lastHour;
    private range;
}
