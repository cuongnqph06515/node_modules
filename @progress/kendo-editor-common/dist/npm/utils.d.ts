import { Node, NodeType, ParseOptions, Schema } from 'prosemirror-model';
import { EditorState, Transaction } from 'prosemirror-state';
import { Command } from './types/command';
import { DispatchFn } from './types/dispatchFn';
import { Predicate } from './types/predicate';
import { ActiveMarks } from './types/active-marks';
/**
 * @hidden
 */
export declare const changeStyles: (elementStyle: string, newStyle: {
    style: string;
    value: RegExp;
    newValue: string;
}) => {
    changed: boolean;
    styleMatches: string[];
    style: string;
};
/**
 * @hidden
 */
export declare const changeStyle: (markType: any, attrs: any) => (state: EditorState<any>, dispatch: DispatchFn, tr?: Transaction<any>) => boolean;
/**
 * Determines if a given node type can be inserted at the current cursor position.
 *
 * @param state - The Editor state.
 * @param nodeType - The Prosemirror node type.
 * @returns - Boolean value that indicates whether the node can be inserted or not.
 */
export declare const canInsert: (state: EditorState<any>, nodeType: NodeType<any>) => boolean;
/**
 * @hidden
 */
export declare const getTypeName: (n: NodeType<any> | Node<any>) => string;
/**
 * @hidden
 */
export declare const findParentNode: (predicate: Predicate<Node<any>>) => Function;
/**
 * @hidden
 */
export declare const findNthParentNode: (predicate: Predicate<Node<any>>, depth?: number) => Function;
/**
 * @hidden
 */
export declare const findNthParentNodeOfType: (nodeType: NodeType<any>, depth?: number) => Function;
/**
 * Inserts the given node at the place of current selection.
 *
 * @param node - The node to insert.
 * @param scrollIntoView - Indicate that the editor should scroll the inserted node into view.
 * @returns - Command function that takes an editor `state` and `dispatch` function.
 */
export declare const insertNode: (node: Node<any>, scrollIntoView?: boolean) => Command;
/**
 * @hidden
 */
export declare const hasSameMarkup: (dom1: string, dom2: string, schema: Schema<any, any>, parseOptions?: ParseOptions<any>) => boolean;
/**
 * @hidden
 */
export declare const first: (arr: any[]) => any;
/**
 * @hidden
 */
export declare const last: (arr: any[]) => any;
/**
 * @hidden
 */
export declare const split: (splitter: string) => (value: string) => string[];
/**
 * @hidden
 */
export declare const trim: (value: string) => string;
/**
 * @hidden
 */
export declare const filter: (predicate: (value: any) => boolean) => (arr: any[]) => any[];
/**
 * @hidden
 */
export declare const getUniqueStyleValues: (style: ActiveMarks, cssStyle: string) => string;
/**
 * @hidden
 */
export declare const getSelectionText: (state: EditorState<any>) => String;
/**
 * @hidden
 */
export declare const getNodeFromSelection: (state: EditorState<any>) => Node<any>;
/**
 * @hidden
 */
export declare const indentHtml: (content: string) => string;
