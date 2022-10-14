/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { EditorCommandBase } from './editor-command-base';
/**
 * @hidden
 */
export class EditorCommandButton extends EditorCommandBase {
    constructor(command, button, editor, localization) {
        super(command, button, editor, localization);
        this.command = command;
        this.button = button;
        this.editor = editor;
        this.localization = localization;
    }
    clickHandler() {
        this.editor.exec(this.command);
        this.editor.focus();
    }
    onStateChange(toolBarState) {
        this.button.selected = toolBarState[this.command].selected;
        this.button.disabled = toolBarState[this.command].disabled;
    }
}
