"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/**
 * @hidden
 */
exports.listsTypes = {
    orderedList: 'ordered_list',
    bulletList: 'bullet_list',
    listItem: 'list_item'
};
/**
 * The object of the OrderedList tool settings.
 */
exports.orderedList = {
    listType: exports.listsTypes.orderedList,
    types: tslib_1.__assign({}, exports.listsTypes)
};
/**
 * The object of the UnorderedList tool settings.
 */
exports.bulletList = {
    listType: exports.listsTypes.bulletList,
    types: tslib_1.__assign({}, exports.listsTypes)
};
