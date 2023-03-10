/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/* tslint:disable:no-bitwise */
import { isDocumentAvailable } from '@progress/kendo-angular-common';
/**
 * @hidden
 */
export var isPresent = function (value) { return value !== null && value !== undefined; };
/**
 * @hidden
 */
export var isNumber = function (value) { return !isNaN(value); };
/**
 * @hidden
 */
export var guid = function () {
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
export var combineStr = function (begin, end) {
    return begin.concat(end.substr(end.toLowerCase().indexOf(begin.toLowerCase()) + begin.length));
};
/**
 * @hidden
 */
export var isWindowAvailable = function () { return typeof window !== 'undefined'; };
/**
 * @hidden
 */
export var isArray = function (value) { return Array.isArray(value); };
/**
 * @hidden
 */
export var isObject = function (value) { return isPresent(value) && typeof value === 'object'; };
/**
 * @hidden
 */
export var isEmptyString = function (value) { return typeof value === 'string' && value.length === 0; };
/**
 * @hidden
 */
export var resolveValuesInArray = function (values, data, valueField) {
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
export var validateComplexValues = function (values, valueField) {
    return isArray(values) && values.filter(function (item) {
        return isObject(item) && item[valueField];
    });
};
/**
 * @hidden
 */
export var resolveAllValues = function (value, data, valueField) {
    var customValues = validateComplexValues(value, valueField) || [];
    var resolvedValues = resolveValuesInArray(value, data, valueField) || [];
    return resolvedValues.concat(customValues);
};
/**
 * @hidden
 */
export var isObjectArray = function (values) {
    return isArray(values) && values.every(function (item) { return isObject(item); });
};
/**
 * @hidden
 */
export var selectedIndices = function (values, data, valueField) {
    var extractedValues = data.map(function (item) {
        return isPresent(item) && isPresent(item[valueField]) ? item[valueField] : item;
    });
    return values.reduce(function (arr, item) {
        var value = isPresent(item) && isPresent(item[valueField]) ? item[valueField] : item;
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
export var getter = function (dataItem, field, usePrimitive) {
    if (usePrimitive === void 0) { usePrimitive = false; }
    if (isPresent(dataItem)) {
        if (usePrimitive) {
            return field && isPresent(dataItem[field]) ? dataItem[field] : dataItem;
        }
        else {
            return field ? dataItem[field] : dataItem;
        }
    }
};
/**
 * @hidden
 */
export var resolveValue = function (args) {
    var dataItem;
    if (isPresent(args.value)) {
        var data = [args.defaultItem].concat(args.data);
        dataItem = data.find(function (element) { return getter(element, args.valueField) === args.value; });
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
export var sameCharsOnly = function (word, character) {
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
export var shuffleData = function (data, splitIndex, defaultItem) {
    var result = data;
    if (defaultItem) {
        result = [defaultItem].concat(result);
    }
    return result.slice(splitIndex).concat(result.slice(0, splitIndex));
};
/**
 * @hidden
 */
export var matchText = function (text, word, ignoreCase) {
    if (!isPresent(text)) {
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
export var elementFromPoint = function (x, y) {
    var el;
    if (!isDocumentAvailable()) {
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
export var hasProps = function (obj, props) {
    if (!isPresent(obj)) {
        return false;
    }
    return props.every(function (prop) { return obj.hasOwnProperty(prop); });
};
/**
 * @hidden
 *
 * Checks whether an element is untouched by looking for the ng-untouched css class
 */
export var isUntouched = function (element) { return element.className.includes('ng-untouched'); };
/**
 * @hidden
 */
export var noop = function (_) { };
