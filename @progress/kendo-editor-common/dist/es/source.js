import { DOMSerializer, DOMParser as ProseMirrorDOMParser } from 'prosemirror-model';
import { AllSelection } from 'prosemirror-state';
/**
 * Creates a Node from the given content.
 *
 * @param content - The new HTML content.
 * @param schema - The document schema.
 * @param parseOptions - ProseMirror parse options recognized by the `parse` and `parseSlice` methods.
 * @returns - New Node instance.
 */
export var parseContent = function (content, schema, parseOptions) {
    // when using ngModel with name attr, content is null and errors, default params dont help
    var html = content || '';
    var template = document.createElement('template');
    var dom;
    if ('content' in template) {
        template.innerHTML = html;
        dom = template.content;
    }
    else {
        var parsedDocument = new DOMParser().parseFromString(html, 'text/html');
        dom = parsedDocument.body;
    }
    return ProseMirrorDOMParser.fromSchema(schema).parse(dom, parseOptions);
};
/**
 * A function that serializes the Editor State content as HTML string.
 *
 * @param state - The Editor State
 * @returns - The serialized content
 */
export var getHtml = function (state) {
    var fragment = DOMSerializer.fromSchema(state.schema).serializeFragment(state.doc.content);
    var container = document.createElement('div');
    container.appendChild(fragment);
    return container.innerHTML;
};
/**
 * Replaces the content of the editor with a new one.
 *
 * @param content - The new HTML content.
 * @param commandName - The name of the command.
 * @param parseOptions - ProseMirror parse options recognized by the `parse` and `parseSlice` methods.
 * @returns - Command function that takes an editor `state` and `dispatch` function.
 */
export var setHtml = function (content, command, parseOptions) {
    if (command === void 0) { command = 'setHTML'; }
    if (parseOptions === void 0) { parseOptions = { preserveWhitespace: 'full' }; }
    return function (state, dispatch) {
        return dispatch(state.tr
            .setSelection(new AllSelection(state.doc))
            .replaceSelectionWith(parseContent(content, state.schema, parseOptions))
            .setMeta('commandName', command));
    };
};
