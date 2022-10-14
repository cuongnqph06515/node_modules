import { MarkType, Mark } from 'prosemirror-model';
import { EditorState, Transaction } from 'prosemirror-state';
import { InlineFormatOptions } from './types/commands';
import { Command } from './types/command';
import { ActiveMarks } from './types/active-marks';
/**
 * @hidden
 */
export declare const markApplies: (doc: any, ranges: any, type: any) => boolean;
/**
 * @hidden
 */
export declare const toggleMark: (markType: MarkType<any>, attrs: any, tr?: Transaction<any>) => (state: any, dispatch: any) => boolean;
/**
 * @hidden
 */
export declare const removeMark: (tr: any, from: any, to: any, mark: any) => any;
/**
 * @hidden
 */
export declare const removeMarks: (marks: any, state: any, dispatch: any, tr: any) => boolean;
/**
 * @hidden
 */
export declare const removeAllMarks: ({ except }?: {
    except?: MarkType<any> | MarkType<any>[];
}) => Command;
/**
 * @hidden
 */
/**
 * @hidden
 */
export declare const getParentMark: (state: EditorState<any>, markType: MarkType<any>) => Mark<any>;
/**
 * @hidden
 */
export declare const hasMark: (state: EditorState<any>, options: InlineFormatOptions) => boolean;
/**
 * @hidden
 */
export declare const getMark: (state: EditorState<any>, markType: MarkType<any>) => Mark<any>;
/**
 * @hidden
 */
export declare const getActiveMarks: ({ selection }: EditorState<any>, markType?: MarkType<any>) => ActiveMarks;
