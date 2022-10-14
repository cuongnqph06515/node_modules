/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var editor_command_base_1 = require("./editor-command-base");
/**
 * @hidden
 */
var EditorCommandDialog = /** @class */ (function (_super) {
    tslib_1.__extends(EditorCommandDialog, _super);
    function EditorCommandDialog(dialog, button, editor, localization) {
        var _this = _super.call(this, dialog, button, editor, localization) || this;
        _this.dialog = dialog;
        _this.button = button;
        _this.editor = editor;
        _this.localization = localization;
        return _this;
    }
    EditorCommandDialog.prototype.clickHandler = function () {
        this.editor.openDialog(this.dialog);
    };
    EditorCommandDialog.prototype.onStateChange = function (toolBarState) {
        this.button.selected = toolBarState[this.command].selected;
        this.button.disabled = toolBarState[this.command].disabled;
    };
    return EditorCommandDialog;
}(editor_command_base_1.EditorCommandBase));
exports.EditorCommandDialog = EditorCommandDialog;
