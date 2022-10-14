import * as tslib_1 from "tslib";
/**
 * @hidden
 */
export var listsTypes = {
    orderedList: 'ordered_list',
    bulletList: 'bullet_list',
    listItem: 'list_item'
};
/**
 * The object of the OrderedList tool settings.
 */
export var orderedList = {
    listType: listsTypes.orderedList,
    types: tslib_1.__assign({}, listsTypes)
};
/**
 * The object of the UnorderedList tool settings.
 */
export var bulletList = {
    listType: listsTypes.bulletList,
    types: tslib_1.__assign({}, listsTypes)
};
