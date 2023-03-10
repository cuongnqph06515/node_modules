/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @hidden
 */
var MAX_PRECISION = 20;
/**
 * @hidden
 */
exports.limitPrecision = function (precision) { return Math.min(precision, MAX_PRECISION); };
/**
 * @hidden
 */
exports.fractionLength = function (value) {
    return (String(value).split('.')[1] || "").length;
};
var maxFractionLength = function (value1, value2) {
    return Math.max(exports.fractionLength(value1), exports.fractionLength(value2));
};
var ɵ0 = maxFractionLength;
exports.ɵ0 = ɵ0;
/**
 * @hidden
 */
exports.toFixedPrecision = function (value, precision) {
    var maxPrecision = exports.limitPrecision(precision);
    return parseFloat(value.toFixed(maxPrecision));
};
/**
 * @hidden
 */
exports.add = function (value1, value2) {
    var maxPrecision = maxFractionLength(value1, value2);
    return exports.toFixedPrecision(value1 + value2, maxPrecision);
};
/**
 * @hidden
 */
exports.subtract = function (value1, value2) {
    return exports.add(value1, -value2);
};
/**
 * @hidden
 */
exports.multiply = function (value1, value2) {
    var maxPrecision = exports.fractionLength(value1) + exports.fractionLength(value2);
    return exports.toFixedPrecision(value1 * value2, maxPrecision);
};
/**
 * @hidden
 */
exports.divide = function (dividend, divisor) {
    if (divisor === 0) {
        return NaN;
    }
    var power = maxFractionLength(dividend, divisor);
    var correctionValue = Math.pow(10, power);
    return ((correctionValue * dividend) / (correctionValue * divisor));
};
/**
 * @hidden
 */
exports.remainder = function (dividend, divisor) {
    return Math.abs(exports.subtract(dividend, exports.multiply(divisor, Math.floor(exports.divide(dividend, divisor)))));
};
