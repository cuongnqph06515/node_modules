/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { EditorColorPickerComponent } from './editor-colorpicker.component';
/**
 * A directive which configures an `EditorColorPickerComponent`
 * for manipulating the foreground color of the text
 * ([see example]({% slug toolbartools_editor %}#toc-built-in-tools)).
 */
export declare class EditorForeColorDirective {
    private colorPicker;
    constructor(colorPicker: EditorColorPickerComponent);
}
