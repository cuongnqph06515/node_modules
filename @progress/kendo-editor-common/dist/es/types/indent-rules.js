import * as tslib_1 from "tslib";
import { listsTypes } from './list-settings';
/**
 * The object of the Indent tool settings.
 */
export var indentRules = {
    nodes: [{
            node: 'paragraph',
            style: 'margin-left',
            rtlStyle: 'margin-right',
            step: 30,
            unit: 'px'
        }, {
            node: 'heading',
            style: 'margin-left',
            rtlStyle: 'margin-right',
            step: 30,
            unit: 'px'
        }],
    listsTypes: tslib_1.__assign({}, listsTypes)
};
/**
 * The object of the Outdent tool settings.
 */
export var outdentRules = {
    nodes: [{
            node: 'paragraph',
            style: 'margin-left',
            rtlStyle: 'margin-right',
            step: -30,
            unit: 'px'
        }, {
            node: 'heading',
            style: 'margin-left',
            rtlStyle: 'margin-right',
            step: -30,
            unit: 'px'
        }],
    listsTypes: tslib_1.__assign({}, listsTypes)
};
