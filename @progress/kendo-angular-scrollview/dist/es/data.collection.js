/* tslint:disable:use-life-cycle-interface */
/** @hidden */
var iterator = getIterator();
// TODO: Move to kendo-common
function getIterator() {
    if (typeof Symbol === 'function' && Symbol.iterator) {
        return Symbol.iterator;
    }
    var keys = Object.getOwnPropertyNames(Map.prototype);
    var proto = Map.prototype;
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        if (key !== 'entries' && key !== 'size' && proto[key] === proto.entries) {
            return key;
        }
    }
}
var EMPTY_OBJ = {};
/**
 * @hidden
 */
var DataResultIterator = /** @class */ (function () {
    function DataResultIterator(source, index, endless, pageIndex, rtl) {
        this.rtl = false;
        this.source = source ? source : [];
        this.index = index ? index : 0;
        this.endless = endless;
        this.pageIndex = pageIndex;
        this.rtl = rtl;
    }
    Object.defineProperty(DataResultIterator.prototype, "data", {
        get: function () {
            var itemCount = this.total;
            var result;
            if (this.endless) {
                result = [
                    this.source[(this.index - 1 + itemCount) % itemCount],
                    this.source[this.index % itemCount],
                    this.source[(this.index + 1 + itemCount) % itemCount]
                ];
            }
            else {
                var data = [EMPTY_OBJ].concat(this.source, [EMPTY_OBJ]);
                result = data.slice(this.index, this.index + 3);
            }
            if (this.pageIndex !== null) {
                var isForward = this.pageIndex > this.index;
                result[isForward ? 2 : 0] = this.source[this.pageIndex];
            }
            return this.rtl ? result.reverse() : result;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataResultIterator.prototype, "total", {
        get: function () {
            return this.source.length;
        },
        enumerable: true,
        configurable: true
    });
    DataResultIterator.prototype.canMoveNext = function () {
        return (this.endless || (this.index < this.total - 1));
    };
    DataResultIterator.prototype.canMovePrev = function () {
        return (this.endless || this.index > 0);
    };
    DataResultIterator.prototype[iterator] = function () {
        return this.data[iterator]();
    };
    return DataResultIterator;
}());
export { DataResultIterator };
/**
 * @hidden
 */
var DataCollection = /** @class */ (function () {
    function DataCollection(accessor) {
        this.accessor = accessor;
    }
    Object.defineProperty(DataCollection.prototype, "length", {
        get: function () { return this.accessor().data.length; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataCollection.prototype, "total", {
        get: function () { return this.accessor().total; },
        enumerable: true,
        configurable: true
    });
    DataCollection.prototype.item = function (index) {
        return this.accessor().data[index];
    };
    DataCollection.prototype.canMoveNext = function () {
        return this.accessor().canMoveNext();
    };
    DataCollection.prototype.canMovePrev = function () {
        return this.accessor().canMovePrev();
    };
    DataCollection.prototype[Symbol.iterator] = function () {
        return this.accessor()[Symbol.iterator]();
    };
    return DataCollection;
}());
export { DataCollection };
