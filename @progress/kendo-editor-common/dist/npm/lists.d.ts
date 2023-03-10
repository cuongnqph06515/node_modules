import { ResolvedPos, NodeType, Schema } from 'prosemirror-model';
import { EditorState, Transaction } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { Command } from './types/command';
/**
 * @hidden
 */
export declare type ListNodeNames = {
    listType: string;
    orderedList: string;
    bulletList: string;
    listItem: string;
};
/**
 * @hidden
 */
export declare const rootListDepth: (pos: ResolvedPos<any>, nodes: any) => any;
/**
 * @hidden
 */
export declare const getListLiftTarget: (schema: any, resPos: any, listNodeNames: ListNodeNames) => number;
/**
 * @hidden
 */
export declare function liftSelectionList(state: EditorState, tr: Transaction, listNodeNames: ListNodeNames): Transaction;
/**
 * @hidden
 */
export declare const toggleList: (state: EditorState<any>, dispatch: (tr: Transaction<any>) => void, view: EditorView<any>, listNodeNames: ListNodeNames, command?: string) => boolean;
/**
 * @hidden
 */
export declare function toggleListCommand(listNodeNames: ListNodeNames): (state: EditorState, dispatch: (tr: Transaction) => void, view: EditorView) => any;
/**
 * @hidden
 */
export declare function liftFollowingList(state: EditorState, from: number, to: number, rootListDepthNum: number, tr: Transaction, listItem: NodeType): Transaction;
/**
 * @hidden
 */
export declare function isRangeOfType(doc: any, $from: ResolvedPos, $to: ResolvedPos, nodeType: any): boolean;
/**
 * @hidden
 */
export declare function getAncestorNodesBetween(doc: any, $from: ResolvedPos, $to: ResolvedPos): Node[];
/**
 * @hidden
 */
export declare function findAncestorPosition(doc: any, pos: any): any;
/**
 * @hidden
 */
export declare function liftListItems(listNodeNames: ListNodeNames): any;
/**
 * @hidden
 */
export declare function wrapInList(nodeType: any): any;
/**
 * @hidden
 */
export declare function toggleUnorderedList(state: EditorState, dispatch: (tr: Transaction) => void, view: EditorView): any;
/**
 * @hidden
 */
export declare function toggleOrderedList(state: EditorState, dispatch: (tr: Transaction) => void, view: EditorView): any;
/**
 * @hidden
 */
export declare const splitListItemKeepMarks: (itemType: NodeType<Schema<any, any>>) => Command;
