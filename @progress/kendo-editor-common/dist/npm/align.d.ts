import { EditorState } from 'prosemirror-state';
import { AlignRule } from './types/align-rules';
import { Command } from './types/command';
/**
 * @hidden
 * Aligning block elements in the selection.
 *
 * @returns {boolean} - Returns true if any alignment is applied.
 */
export declare const alignBlocks: (actions: AlignRule[], commandName?: string) => Command;
/**
 * @hidden
 */
export declare const isAligned: (state: EditorState<any>, actions: AlignRule[]) => boolean;
