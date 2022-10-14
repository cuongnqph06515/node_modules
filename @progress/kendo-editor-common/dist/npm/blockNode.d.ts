import { NodeType, Node, Schema } from 'prosemirror-model';
import { EditorState, Transaction } from 'prosemirror-state';
import { DispatchFn } from './types/dispatchFn';
/**
 * @hidden
 */
export declare const changeBlockNode: (state: EditorState<any>, dispatch: DispatchFn, tr: Transaction<any>, node: Node<any>, nodeType: NodeType<any>, attrs?: any) => boolean;
/**
 * @hidden
 */
export declare const blockNodes: (state: EditorState<any>) => Node<any>[];
/**
 * @hidden
 */
export declare const formatBlockElements: (value: "blockquote" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p", commandName?: string) => (state: any, dispatch: any) => boolean;
/**
 * @hidden
 */
export declare const getBlockFormats: (state: EditorState<any>) => string[];
/**
 * @hidden
 */
export declare const addStyles: (node: Node<any>, stylesToApply: {
    name: string;
    value: string;
}[]) => {};
/**
 * @hidden
 */
export declare const hasNode: (state: EditorState<any>, nodeType: NodeType<any>) => boolean;
/**
 * @hidden
 */
export declare const getNodeTagName: (node: Node<any>, schema: Schema<any, any>) => string;
/**
 * @hidden
 */
export declare const activeNode: (state: EditorState<any>) => {
    name: string;
    tag: string;
};
