import { EditorState, Transaction } from 'prosemirror-state';
import { DispatchFn } from './types/dispatchFn';
import { InlineFormatOptions } from './types/commands';
/**
 * @hidden
 */
export declare const changeStyleFromMark: (marks: any, toChange: any) => {
    changed: boolean;
    styleMatches: string[];
    style: string;
};
/**
 * @hidden
 */
export declare const changeStyleMark: (tr: any, from: any, to: any, attrs: any, markType: any) => boolean;
/**
 * @hidden
 */
export declare const hasStyle: (state: any, style: any) => boolean;
/**
 * @hidden
 */
export declare const getInlineStyles: (state: EditorState<any>, style: {
    name: string;
    value: RegExp;
}) => string[];
/**
 * @hidden
 */
export declare const changeStyle: (markType: any, attrs: any) => (state: EditorState<any>, dispatch: DispatchFn, tr?: Transaction<any>) => boolean;
/**
 * @hidden
 */
export declare const toggleInlineFormat: (options: InlineFormatOptions, tr?: Transaction<any>, markAttrs?: any) => (state: any, dispatch: any) => boolean;
/**
 * @hidden
 */
export declare const applyInlineStyle: (options: {
    style: string;
    value: string;
}, command?: string) => (state: any, dispatch: any) => boolean;
