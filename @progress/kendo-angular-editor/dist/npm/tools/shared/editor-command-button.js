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
var EditorCommandButton = /** @class */ (function (_super) {
    tslib_1.__extends(EditorCommandButton, _super);
    function EditorCommandButton(command, button, editor, localization) {
        var _this = _super.call(this, command, button, editor, localization) || this;
        _this.command = command;
        _this.button = button;
        _this.editor = editor;
        _this.localization = localization;
        return _this;
    }
    EditorCommandButton.prototype.clickHandler = function () {
        this.editor.exec(this.command);
        this.editor.focus();
    };
    EditorCommandButton.prototype.onStateChange = function (toolBarState) {
        this.button.selected = toolBarState[this.command].selected;
        this.button.disabled = toolBarState[this.command].disabled;
    };
    return EditorCommandButton;
}(editor_command_base_1.EditorCommandBase));
exports.EditorCommandButton = EditorCommandButton;
