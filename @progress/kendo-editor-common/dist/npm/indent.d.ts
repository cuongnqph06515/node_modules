import { EditorState } from 'prosemirror-state';
import { NodeType } from 'prosemirror-model';
import { IndentRule, IndentationRules } from './types/indent-rules';
import { Command } from './types/command';
/**
 * Indenting block elements in the selection.
 *
 * @returns {boolean} - Returns true if any indentation is applied.
 */
export declare const indentBlocks: (actions: IndentRule[], command?: string, dir?: string) => Command;
/**
 * @hidden
 */
export declare const isIndented: (state: EditorState<any>, rules: IndentRule[], dir?: string) => boolean;
/**
 * @hidden
 */
export declare const canIndentAsListItem: (state: EditorState<any>, nodeType: NodeType<any>) => boolean;
/**
 * @hidden
 */
export declare const canOutdentAsListItem: (state: EditorState<any>, rules: IndentationRules) => boolean;
/**
 * @hidden
 */
export declare const canBeIndented: (state: EditorState<any>, rules: IndentationRules) => boolean;
/**
 * @hidden
 */
export declare const indent: Command;
/**
 * @hidden
 */
export declare const outdent: Command;
