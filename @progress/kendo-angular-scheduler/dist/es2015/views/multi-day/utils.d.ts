import { ViewItem } from '../../types';
/** @hidden */
export declare const isMultiDay: ({ start, end }: {
    start: any;
    end: any;
}) => boolean;
/** @hidden */
export declare const createTasks: (periodStart: Date, periodEnd: Date, items: ViewItem[], ranges: any[]) => any[];
