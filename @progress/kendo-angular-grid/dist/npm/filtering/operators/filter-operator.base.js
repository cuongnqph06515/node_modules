/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var utils_1 = require("../../utils");
var localizeOperators = function (operators) { return function (localization) {
    return Object.keys(operators).reduce(function (acc, key) {
        acc[operators[key]] = localization.get(key);
        return acc;
    }, {});
}; }; // tslint:disable-line:align
var ɵ0 = localizeOperators;
exports.ɵ0 = ɵ0;
var operatorTexts = localizeOperators({
    "filterEqOperator": "eq",
    "filterNotEqOperator": "neq",
    // tslint:disable-next-line:object-literal-sort-keys
    "filterGteOperator": "gte",
    "filterGtOperator": "gt",
    "filterLteOperator": "lte",
    "filterLtOperator": "lt",
    "filterIsNullOperator": "isnull",
    "filterIsNotNullOperator": "isnotnull",
    "filterIsEmptyOperator": "isempty",
    "filterIsNotEmptyOperator": "isnotempty",
    "filterContainsOperator": "contains",
    "filterNotContainsOperator": "doesnotcontain",
    "filterStartsWithOperator": "startswith",
    "filterEndsWithOperator": "endswith",
    "filterAfterOrEqualOperator": "after-eq",
    "filterAfterOperator": "after",
    "filterBeforeOrEqualOperator": "before-eq",
    "filterBeforeOperator": "before"
});
/**
 * @hidden
 */
exports.toJSON = function (xs) { return xs.map(function (x) { return x.toJSON(); }); };
/**
 * @hidden
 */
var FilterOperatorBase = /** @class */ (function () {
    function FilterOperatorBase(operator, localization) {
        this.operator = operator;
        this.localization = localization;
        this.messages = operatorTexts(this.localization);
        this._text = this.messages[this.operator];
        this.localization.changes.subscribe(this.refreshText.bind(this));
    }
    Object.defineProperty(FilterOperatorBase.prototype, "text", {
        /**
         * The text that will be displayed in the drop-down list.
         * @readonly
         * @type {string}
         * @memberOf FilterOperatorBase
         */
        get: function () {
            return this._text;
        },
        /**
         *
         */
        set: function (value) {
            this._text = utils_1.isNullOrEmptyString(value) ? this.messages[this.operator] : value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    FilterOperatorBase.prototype.toJSON = function () {
        return {
            text: this.text,
            value: this.operator
        };
    };
    FilterOperatorBase.prototype.refreshText = function () {
        var update = this._text === this.messages[this.operator];
        this.messages = operatorTexts(this.localization);
        if (update) {
            this._text = this.messages[this.operator];
        }
    };
    FilterOperatorBase.propDecorators = {
        text: [{ type: core_1.Input }]
    };
    return FilterOperatorBase;
}());
exports.FilterOperatorBase = FilterOperatorBase;
