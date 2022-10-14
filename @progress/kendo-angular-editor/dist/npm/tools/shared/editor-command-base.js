/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var command_icons_1 = require("../../config/command-icons");
/**
 * @hidden
 */
var EditorCommandBase = /** @class */ (function () {
    function EditorCommandBase(command, button, editor, localization) {
        this.command = command;
        this.button = button;
        this.editor = editor;
        this.localization = localization;
    }
    EditorCommandBase.prototype.ngOnInit = function () {
        var _this = this;
        this.subs = this.editor.stateChange.subscribe(this.onStateChange.bind(this));
        this.subs.add(this.button.click.subscribe((this.clickHandler.bind(this))));
        Promise.resolve(null).then(function () {
            var text = _this.localization.get(_this.command);
            if (text) {
                _this.button.showText = "overflow";
                _this.button.showIcon = "both";
                _this.button.text = text;
            }
            if (!_this.button.icon) {
                _this.button.icon = command_icons_1.commandIcons[_this.command];
            }
            _this.button.title = text;
        });
    };
    EditorCommandBase.prototype.ngOnDestroy = function () {
        this.subs.unsubscribe();
    };
    // tslint:disable-next-line
    EditorCommandBase.prototype.clickHandler = function () { };
    // tslint:disable-next-line
    EditorCommandBase.prototype.onStateChange = function (_toolBarState) { };
    return EditorCommandBase;
}());
exports.EditorCommandBase = EditorCommandBase;
