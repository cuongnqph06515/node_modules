/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/**
 * @hidden
 */
const MAX_PRECISION = 20;
/**
 * @hidden
 */
export const limitPrecision = (precision) => Math.min(precision, MAX_PRECISION);
/**
 * @hidden
 */
export const fractionLength = (value) => {
    return (String(value).split('.')[1] || "").length;
};
const maxFractionLength = (value1, value2) => {
    return Math.max(fractionLength(value1), fractionLength(value2));
};
const ɵ0 = maxFractionLength;
/**
 * @hidden
 */
export const toFixedPrecision = (value, precision) => {
    const maxPrecision = limitPrecision(precision);
    return parseFloat(value.toFixed(maxPrecision));
};
/**
 * @hidden
 */
export const add = (value1, value2) => {
    const maxPrecision = maxFractionLength(value1, value2);
    return toFixedPrecision(value1 + value2, maxPrecision);
};
/**
 * @hidden
 */
export const subtract = (value1, value2) => {
    return add(value1, -value2);
};
/**
 * @hidden
 */
export const multiply = (value1, value2) => {
    const maxPrecision = fractionLength(value1) + fractionLength(value2);
    return toFixedPrecision(value1 * value2, maxPrecision);
};
/**
 * @hidden
 */
export const divide = (dividend, divisor) => {
    if (divisor === 0) {
        return NaN;
    }
    const power = maxFractionLength(dividend, divisor);
    const correctionValue = Math.pow(10, power);
    return ((correctionValue * dividend) / (correctionValue * divisor));
};
/**
 * @hidden
 */
export const remainder = (dividend, divisor) => {
    return Math.abs(subtract(dividend, multiply(divisor, Math.floor(divide(dividend, divisor)))));
};
export { ɵ0 };
