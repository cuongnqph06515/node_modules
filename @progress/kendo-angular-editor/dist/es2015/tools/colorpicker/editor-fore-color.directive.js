/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive } from '@angular/core';
import { EditorColorPickerComponent } from './editor-colorpicker.component';
import { commandIcons } from '../../config/command-icons';
/**
 * A directive which configures an `EditorColorPickerComponent`
 * for manipulating the foreground color of the text
 * ([see example]({% slug toolbartools_editor %}#toc-built-in-tools)).
 */
export class EditorForeColorDirective {
    constructor(colorPicker) {
        this.colorPicker = colorPicker;
        this.colorPicker.icon = commandIcons.foreColor;
        this.colorPicker.editorCommand = 'foreColor';
    }
}
EditorForeColorDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoEditorForeColor]'
            },] },
];
/** @nocollapse */
EditorForeColorDirective.ctorParameters = () => [
    { type: EditorColorPickerComponent }
];
