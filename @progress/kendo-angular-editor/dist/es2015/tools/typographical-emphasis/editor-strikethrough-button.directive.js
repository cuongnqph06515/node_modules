/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, Host } from '@angular/core';
import { ToolBarButtonComponent } from '@progress/kendo-angular-toolbar';
import { EditorComponent } from '../../editor.component';
import { EditorCommandButton } from '../shared/editor-command-button';
import { EditorLocalizationService } from '../../localization/editor-localization.service';
/**
 * A directive which configures an existing `ToolBarButtonComponent` as an Editor Strikethrough tool
 * ([see example]({% slug toolbartools_editor %}#toc-built-in-tools)).
 * The directive will predefine the `icon` and `click` event handlers of the button.
 * In addition, the directive updates the `selected` state of the button according to the cursor position in the editing area.
 *
 * @example
 * ```ts-no-run
 * <kendo-toolbar-button kendoEditorStrikethroughButton></kendo-toolbar-button>
 * ```
 *
 * The following example demonstrates how to change the default icon that is applied by the directive.
 *
 * @example
 * ```ts-no-run
 * <kendo-toolbar-button kendoEditorStrikethroughButton [icon]="'blogger'"></kendo-toolbar-button>
 * ```
 */
export class EditorStrikethroughButtonDirective extends EditorCommandButton {
    constructor(button, editor, localization) {
        super('strikethrough', button, editor, localization);
    }
}
EditorStrikethroughButtonDirective.decorators = [
    { type: Directive, args: [{
                selector: 'kendo-toolbar-button[kendoEditorStrikethroughButton]'
            },] },
];
/** @nocollapse */
EditorStrikethroughButtonDirective.ctorParameters = () => [
    { type: ToolBarButtonComponent },
    { type: EditorComponent, decorators: [{ type: Host }] },
    { type: EditorLocalizationService }
];
