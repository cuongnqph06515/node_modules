"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var list_settings_1 = require("./list-settings");
/**
 * The object of the Indent tool settings.
 */
exports.indentRules = {
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
    listsTypes: tslib_1.__assign({}, list_settings_1.listsTypes)
};
/**
 * The object of the Outdent tool settings.
 */
exports.outdentRules = {
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
    listsTypes: tslib_1.__assign({}, list_settings_1.listsTypes)
};
