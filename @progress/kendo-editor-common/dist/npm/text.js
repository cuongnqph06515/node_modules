"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @hidden
 */
exports.insertText = function (attrs) { return function (state, dispatch) {
    dispatch(state.tr.insertText(attrs.text, attrs.from, attrs.to));
}; };
