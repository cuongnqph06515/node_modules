/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive } from '@angular/core';
import { EditorColorPickerComponent } from './editor-colorpicker.component';
import { commandIcons } from '../../config/command-icons';
/**
 * A directive which configures an `EditorColorPickerComponent`
 * for manipulating the background color of the text
 * ([see example]({% slug toolbartools_editor %}#toc-built-in-tools)).
 */
export class EditorBackColorDirective {
    constructor(colorPicker) {
        this.colorPicker = colorPicker;
        this.colorPicker.icon = commandIcons.backColor;
        this.colorPicker.editorCommand = 'backColor';
    }
}
EditorBackColorDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoEditorBackColor]'
            },] },
];
/** @nocollapse */
EditorBackColorDirective.ctorParameters = () => [
    { type: EditorColorPickerComponent }
];
