/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { EditorCommandBase } from './editor-command-base';
/**
 * @hidden
 */
export class EditorCommandDialog extends EditorCommandBase {
    constructor(dialog, button, editor, localization) {
        super(dialog, button, editor, localization);
        this.dialog = dialog;
        this.button = button;
        this.editor = editor;
        this.localization = localization;
    }
    clickHandler() {
        this.editor.openDialog(this.dialog);
    }
    onStateChange(toolBarState) {
        this.button.selected = toolBarState[this.command].selected;
        this.button.disabled = toolBarState[this.command].disabled;
    }
}
