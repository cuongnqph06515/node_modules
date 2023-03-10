/**
 * @hidden
 */
export declare class DataResultIterator {
    private source;
    private index;
    private endless;
    private pageIndex;
    private rtl;
    constructor(source: any[], index: number, endless: boolean, pageIndex: number, rtl: boolean);
    readonly data: any[];
    readonly total: number;
    canMoveNext(): boolean;
    canMovePrev(): boolean;
}
/**
 * @hidden
 */
export declare class DataCollection {
    private accessor;
    constructor(accessor: () => DataResultIterator);
    readonly length: number;
    readonly total: number;
    item(index: number): any;
    canMoveNext(): boolean;
    canMovePrev(): boolean;
    [Symbol.iterator](): any;
}
