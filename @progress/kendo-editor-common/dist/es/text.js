/**
 * @hidden
 */
export var insertText = function (attrs) { return function (state, dispatch) {
    dispatch(state.tr.insertText(attrs.text, attrs.from, attrs.to));
}; };
