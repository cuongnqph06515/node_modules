/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/* tslint:disable:no-bitwise */
import { isDocumentAvailable } from '@progress/kendo-angular-common';
/**
 * @hidden
 */
export const isPresent = (value) => value !== null && value !== undefined;
/**
 * @hidden
 */
export const isNumber = (value) => !isNaN(value);
/**
 * @hidden
 */
export const guid = () => {
    let id = "";
    let i;
    let random;
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
export const combineStr = (begin, end) => {
    return begin.concat(end.substr(end.toLowerCase().indexOf(begin.toLowerCase()) + begin.length));
};
/**
 * @hidden
 */
export const isWindowAvailable = () => typeof window !== 'undefined';
/**
 * @hidden
 */
export const isArray = (value) => Array.isArray(value);
/**
 * @hidden
 */
export const isObject = (value) => isPresent(value) && typeof value === 'object';
/**
 * @hidden
 */
export const isEmptyString = (value) => typeof value === 'string' && value.length === 0;
/**
 * @hidden
 */
export const resolveValuesInArray = (values, data = [], valueField) => values
    .map(value => {
    return data.find(item => item[valueField] === value);
})
    .filter(value => value !== undefined);
/**
 * @hidden
 */
export const validateComplexValues = (values, valueField) => isArray(values) && values.filter(item => {
    return isObject(item) && item[valueField];
});
/**
 * @hidden
 */
export const resolveAllValues = (value, data, valueField) => {
    const customValues = validateComplexValues(value, valueField) || [];
    const resolvedValues = resolveValuesInArray(value, data, valueField) || [];
    return resolvedValues.concat(customValues);
};
/**
 * @hidden
 */
export const isObjectArray = (values) => {
    return isArray(values) && values.every(item => isObject(item));
};
/**
 * @hidden
 */
export const selectedIndices = (values, data, valueField) => {
    const extractedValues = data.map(item => {
        return isPresent(item) && isPresent(item[valueField]) ? item[valueField] : item;
    });
    return values.reduce((arr, item) => {
        const value = isPresent(item) && isPresent(item[valueField]) ? item[valueField] : item;
        const index = extractedValues.indexOf(value);
        if (index !== -1) {
            arr.push(index);
        }
        return arr;
    }, []);
};
/**
 * @hidden
 */
export const getter = (dataItem, field, usePrimitive = false) => {
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
export const resolveValue = (args) => {
    let dataItem;
    if (isPresent(args.value)) {
        const data = [args.defaultItem, ...args.data];
        dataItem = data.find(element => getter(element, args.valueField) === args.value);
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
export const sameCharsOnly = (word, character) => {
    for (let idx = 0; idx < word.length; idx++) {
        if (word.charAt(idx) !== character) {
            return false;
        }
    }
    return true;
};
/**
 * @hidden
 */
export const shuffleData = (data, splitIndex, defaultItem) => {
    let result = data;
    if (defaultItem) {
        result = [defaultItem].concat(result);
    }
    return result.slice(splitIndex).concat(result.slice(0, splitIndex));
};
/**
 * @hidden
 */
export const matchText = (text, word, ignoreCase) => {
    if (!isPresent(text)) {
        return false;
    }
    let temp = String(text);
    if (ignoreCase) {
        temp = temp.toLowerCase();
    }
    return temp.indexOf(word) === 0;
};
/**
 * @hidden
 */
export const elementFromPoint = (x, y) => {
    let el;
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
export const hasProps = (obj, props) => {
    if (!isPresent(obj)) {
        return false;
    }
    return props.every(prop => obj.hasOwnProperty(prop));
};
/**
 * @hidden
 *
 * Checks whether an element is untouched by looking for the ng-untouched css class
 */
export const isUntouched = (element) => element.className.includes('ng-untouched');
/**
 * @hidden
 */
export const noop = (_) => { };
