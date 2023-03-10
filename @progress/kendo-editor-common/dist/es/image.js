import { insertNode } from './utils';
/**
 * @hidden
 */
export var insertImage = function (attrs) { return function (state, dispatch) {
    var image = state.schema.nodes.image;
    var commandName = 'insertImage';
    var newImage = image.createAndFill(attrs);
    insertNode(newImage)(state, function (tr) { return dispatch(tr.setMeta('commandName', commandName).setMeta('args', attrs)); });
}; };
