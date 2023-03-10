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
 * for manipulating the background color of the text
 * ([see example]({% slug toolbartools_editor %}#toc-built-in-tools)).
 */
var EditorBackColorDirective = /** @class */ (function () {
    function EditorBackColorDirective(colorPicker) {
        this.colorPicker = colorPicker;
        this.colorPicker.icon = command_icons_1.commandIcons.backColor;
        this.colorPicker.editorCommand = 'backColor';
    }
    EditorBackColorDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[kendoEditorBackColor]'
                },] },
    ];
    /** @nocollapse */
    EditorBackColorDirective.ctorParameters = function () { return [
        { type: editor_colorpicker_component_1.EditorColorPickerComponent }
    ]; };
    return EditorBackColorDirective;
}());
exports.EditorBackColorDirective = EditorBackColorDirective;
