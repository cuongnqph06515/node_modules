import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { DispatchFn } from './dispatchFn';
/**
 * @hidden
 */
export declare type Command = (state: EditorState, dispatch: DispatchFn, view?: EditorView) => boolean | void;
