"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
/**
 * @hidden
 */
exports.insertImage = function (attrs) { return function (state, dispatch) {
    var image = state.schema.nodes.image;
    var commandName = 'insertImage';
    var newImage = image.createAndFill(attrs);
    utils_1.insertNode(newImage)(state, function (tr) { return dispatch(tr.setMeta('commandName', commandName).setMeta('args', attrs)); });
}; };
