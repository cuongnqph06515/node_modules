/* tslint:disable:use-life-cycle-interface */
/** @hidden */
const iterator = getIterator();
// TODO: Move to kendo-common
function getIterator() {
    if (typeof Symbol === 'function' && Symbol.iterator) {
        return Symbol.iterator;
    }
    const keys = Object.getOwnPropertyNames(Map.prototype);
    const proto = Map.prototype;
    for (let i = 0; i < keys.length; ++i) {
        const key = keys[i];
        if (key !== 'entries' && key !== 'size' && proto[key] === proto.entries) {
            return key;
        }
    }
}
const EMPTY_OBJ = {};
/**
 * @hidden
 */
export class DataResultIterator {
    constructor(source, index, endless, pageIndex, rtl) {
        this.rtl = false;
        this.source = source ? source : [];
        this.index = index ? index : 0;
        this.endless = endless;
        this.pageIndex = pageIndex;
        this.rtl = rtl;
    }
    get data() {
        let itemCount = this.total;
        let result;
        if (this.endless) {
            result = [
                this.source[(this.index - 1 + itemCount) % itemCount],
                this.source[this.index % itemCount],
                this.source[(this.index + 1 + itemCount) % itemCount]
            ];
        }
        else {
            const data = [EMPTY_OBJ, ...this.source, EMPTY_OBJ];
            result = data.slice(this.index, this.index + 3);
        }
        if (this.pageIndex !== null) {
            let isForward = this.pageIndex > this.index;
            result[isForward ? 2 : 0] = this.source[this.pageIndex];
        }
        return this.rtl ? result.reverse() : result;
    }
    get total() {
        return this.source.length;
    }
    canMoveNext() {
        return (this.endless || (this.index < this.total - 1));
    }
    canMovePrev() {
        return (this.endless || this.index > 0);
    }
    [iterator]() {
        return this.data[iterator]();
    }
}
/**
 * @hidden
 */
export class DataCollection {
    constructor(accessor) {
        this.accessor = accessor;
    }
    get length() { return this.accessor().data.length; }
    get total() { return this.accessor().total; }
    item(index) {
        return this.accessor().data[index];
    }
    canMoveNext() {
        return this.accessor().canMoveNext();
    }
    canMovePrev() {
        return this.accessor().canMovePrev();
    }
    [Symbol.iterator]() {
        return this.accessor()[Symbol.iterator]();
    }
}
