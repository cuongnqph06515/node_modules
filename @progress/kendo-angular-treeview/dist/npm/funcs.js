"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @hidden
 * Performs the right-to-left function composition. Functions must have a unary.
 */
exports.compose = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return function (data) { return args.reduceRight(function (acc, curr) { return curr(acc); }, data); };
};
