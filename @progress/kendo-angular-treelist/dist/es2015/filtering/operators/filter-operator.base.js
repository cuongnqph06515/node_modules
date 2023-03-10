/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Input } from '@angular/core';
import { isNullOrEmptyString } from '../../utils';
const localizeOperators = operators => localization => Object.keys(operators).reduce((acc, key) => {
    acc[operators[key]] = localization.get(key);
    return acc;
}, {}); // tslint:disable-line:align
const ɵ0 = localizeOperators;
const operatorTexts = localizeOperators({
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
export const toJSON = (xs) => xs.map(x => x.toJSON());
/**
 * @hidden
 */
export class FilterOperatorBase {
    constructor(operator, localization) {
        this.operator = operator;
        this.localization = localization;
        this.messages = operatorTexts(this.localization);
        this._text = this.messages[this.operator];
        this.localization.changes.subscribe(this.refreshText.bind(this));
    }
    /**
     * The text that will be displayed in the drop-down list.
     * @readonly
     * @type {string}
     * @memberOf FilterOperatorBase
     */
    get text() {
        return this._text;
    }
    /**
     *
     */
    set text(value) {
        this._text = isNullOrEmptyString(value) ? this.messages[this.operator] : value;
    }
    /**
     * @hidden
     */
    toJSON() {
        return {
            text: this.text,
            value: this.operator
        };
    }
    refreshText() {
        const update = this._text === this.messages[this.operator];
        this.messages = operatorTexts(this.localization);
        if (update) {
            this._text = this.messages[this.operator];
        }
    }
}
FilterOperatorBase.propDecorators = {
    text: [{ type: Input }]
};
export { ɵ0 };
