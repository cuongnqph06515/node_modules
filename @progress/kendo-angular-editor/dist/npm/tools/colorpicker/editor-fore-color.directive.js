/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var editor_colorpicker_component_1 = require("./editor-colorpicker.component");
var command_icons_1 = require("../../config/command-icons");
/**
 * A directive which configures an `EditorColorPickerComponent`
 * for manipulating the foreground color of the text
 * ([see example]({% slug toolbartools_editor %}#toc-built-in-tools)).
 */
var EditorForeColorDirective = /** @class */ (function () {
    function EditorForeColorDirective(colorPicker) {
        this.colorPicker = colorPicker;
        this.colorPicker.icon = command_icons_1.commandIcons.foreColor;
        this.colorPicker.editorCommand = 'foreColor';
    }
    EditorForeColorDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[kendoEditorForeColor]'
                },] },
    ];
    /** @nocollapse */
    EditorForeColorDirective.ctorParameters = function () { return [
        { type: editor_colorpicker_component_1.EditorColorPickerComponent }
    ]; };
    return EditorForeColorDirective;
}());
exports.EditorForeColorDirective = EditorForeColorDirective;
