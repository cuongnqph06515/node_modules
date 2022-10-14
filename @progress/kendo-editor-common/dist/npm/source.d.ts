import { ParseOptions, Node, Schema } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';
import { Command } from './types/command';
/**
 * Creates a Node from the given content.
 *
 * @param content - The new HTML content.
 * @param schema - The document schema.
 * @param parseOptions - ProseMirror parse options recognized by the `parse` and `parseSlice` methods.
 * @returns - New Node instance.
 */
export declare const parseContent: (content: string, schema: Schema<any, any>, parseOptions?: ParseOptions<any>) => Node<any>;
/**
 * A function that serializes the Editor State content as HTML string.
 *
 * @param state - The Editor State
 * @returns - The serialized content
 */
export declare const getHtml: (state: EditorState<any>) => string;
/**
 * Replaces the content of the editor with a new one.
 *
 * @param content - The new HTML content.
 * @param commandName - The name of the command.
 * @param parseOptions - ProseMirror parse options recognized by the `parse` and `parseSlice` methods.
 * @returns - Command function that takes an editor `state` and `dispatch` function.
 */
export declare const setHtml: (content: string, command?: string, parseOptions?: ParseOptions<any>) => Command;
