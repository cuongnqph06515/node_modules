/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
/* tslint:disable:no-bitwise */
Object.defineProperty(exports, "__esModule", { value: true });
var kendo_angular_common_1 = require("@progress/kendo-angular-common");
/**
 * @hidden
 */
exports.isPresent = function (value) { return value !== null && value !== undefined; };
/**
 * @hidden
 */
exports.isNumber = function (value) { return !isNaN(value); };
/**
 * @hidden
 */
exports.guid = function () {
    var id = "";
    var i;
    var random;
    for (i = 0; i < 32; i++) {
        random = Math.random() * 16 | 0;
        if (i === 8 || i === 12 || i === 16 || i === 20) {
            id += "-";
        }
        id += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
    }
    return id;
};
/**
 * @hidden
 */
exports.combineStr = function (begin, end) {
    return begin.concat(end.substr(end.toLowerCase().indexOf(begin.toLowerCase()) + begin.length));
};
/**
 * @hidden
 */
exports.isWindowAvailable = function () { return typeof window !== 'undefined'; };
/**
 * @hidden
 */
exports.isArray = function (value) { return Array.isArray(value); };
/**
 * @hidden
 */
exports.isObject = function (value) { return exports.isPresent(value) && typeof value === 'object'; };
/**
 * @hidden
 */
exports.isEmptyString = function (value) { return typeof value === 'string' && value.length === 0; };
/**
 * @hidden
 */
exports.resolveValuesInArray = function (values, data, valueField) {
    if (data === void 0) { data = []; }
    return values
        .map(function (value) {
        return data.find(function (item) { return item[valueField] === value; });
    })
        .filter(function (value) { return value !== undefined; });
};
/**
 * @hidden
 */
exports.validateComplexValues = function (values, valueField) {
    return exports.isArray(values) && values.filter(function (item) {
        return exports.isObject(item) && item[valueField];
    });
};
/**
 * @hidden
 */
exports.resolveAllValues = function (value, data, valueField) {
    var customValues = exports.validateComplexValues(value, valueField) || [];
    var resolvedValues = exports.resolveValuesInArray(value, data, valueField) || [];
    return resolvedValues.concat(customValues);
};
/**
 * @hidden
 */
exports.isObjectArray = function (values) {
    return exports.isArray(values) && values.every(function (item) { return exports.isObject(item); });
};
/**
 * @hidden
 */
exports.selectedIndices = function (values, data, valueField) {
    var extractedValues = data.map(function (item) {
        return exports.isPresent(item) && exports.isPresent(item[valueField]) ? item[valueField] : item;
    });
    return values.reduce(function (arr, item) {
        var value = exports.isPresent(item) && exports.isPresent(item[valueField]) ? item[valueField] : item;
        var index = extractedValues.indexOf(value);
        if (index !== -1) {
            arr.push(index);
        }
        return arr;
    }, []);
};
/**
 * @hidden
 */
exports.getter = function (dataItem, field, usePrimitive) {
    if (usePrimitive === void 0) { usePrimitive = false; }
    if (exports.isPresent(dataItem)) {
        if (usePrimitive) {
            return field && exports.isPresent(dataItem[field]) ? dataItem[field] : dataItem;
        }
        else {
            return field ? dataItem[field] : dataItem;
        }
    }
};
/**
 * @hidden
 */
exports.resolveValue = function (args) {
    var dataItem;
    if (exports.isPresent(args.value)) {
        var data = [args.defaultItem].concat(args.data);
        dataItem = data.find(function (element) { return exports.getter(element, args.valueField) === args.value; });
        return {
            dataItem: dataItem,
            focused: args.data.indexOf(dataItem),
            selected: args.data.indexOf(dataItem)
        };
    }
    else if (args.index) {
        dataItem = args.data[args.index];
        return {
            dataItem: args.data[args.index],
            focused: args.index,
            selected: args.index
        };
    }
    return {
        dataItem: args.defaultItem,
        focused: -1,
        selected: -1
    };
};
/**
 * @hidden
 */
exports.sameCharsOnly = function (word, character) {
    for (var idx = 0; idx < word.length; idx++) {
        if (word.charAt(idx) !== character) {
            return false;
        }
    }
    return true;
};
/**
 * @hidden
 */
exports.shuffleData = function (data, splitIndex, defaultItem) {
    var result = data;
    if (defaultItem) {
        result = [defaultItem].concat(result);
    }
    return result.slice(splitIndex).concat(result.slice(0, splitIndex));
};
/**
 * @hidden
 */
exports.matchText = function (text, word, ignoreCase) {
    if (!exports.isPresent(text)) {
        return false;
    }
    var temp = String(text);
    if (ignoreCase) {
        temp = temp.toLowerCase();
    }
    return temp.indexOf(word) === 0;
};
/**
 * @hidden
 */
exports.elementFromPoint = function (x, y) {
    var el;
    if (!kendo_angular_common_1.isDocumentAvailable()) {
        return;
    }
    el = document.elementFromPoint(x, y);
    return el;
};
/**
 * @hidden
 *
 * Checks whether the passed object has all of the listed properties.
 */
exports.hasProps = function (obj, props) {
    if (!exports.isPresent(obj)) {
        return false;
    }
    return props.every(function (prop) { return obj.hasOwnProperty(prop); });
};
/**
 * @hidden
 *
 * Checks whether an element is untouched by looking for the ng-untouched css class
 */
exports.isUntouched = function (element) { return element.className.includes('ng-untouched'); };
/**
 * @hidden
 */
exports.noop = function (_) { };
