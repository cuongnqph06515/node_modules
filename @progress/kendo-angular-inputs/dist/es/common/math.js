/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/**
 * @hidden
 */
var MAX_PRECISION = 20;
/**
 * @hidden
 */
export var limitPrecision = function (precision) { return Math.min(precision, MAX_PRECISION); };
/**
 * @hidden
 */
export var fractionLength = function (value) {
    return (String(value).split('.')[1] || "").length;
};
var maxFractionLength = function (value1, value2) {
    return Math.max(fractionLength(value1), fractionLength(value2));
};
var ɵ0 = maxFractionLength;
/**
 * @hidden
 */
export var toFixedPrecision = function (value, precision) {
    var maxPrecision = limitPrecision(precision);
    return parseFloat(value.toFixed(maxPrecision));
};
/**
 * @hidden
 */
export var add = function (value1, value2) {
    var maxPrecision = maxFractionLength(value1, value2);
    return toFixedPrecision(value1 + value2, maxPrecision);
};
/**
 * @hidden
 */
export var subtract = function (value1, value2) {
    return add(value1, -value2);
};
/**
 * @hidden
 */
export var multiply = function (value1, value2) {
    var maxPrecision = fractionLength(value1) + fractionLength(value2);
    return toFixedPrecision(value1 * value2, maxPrecision);
};
/**
 * @hidden
 */
export var divide = function (dividend, divisor) {
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
export var remainder = function (dividend, divisor) {
    return Math.abs(subtract(dividend, multiply(divisor, Math.floor(divide(dividend, divisor)))));
};
export { ɵ0 };
