/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, Host } from '@angular/core';
import { ToolBarButtonComponent } from '@progress/kendo-angular-toolbar';
import { EditorComponent } from '../../editor.component';
import { EditorCommandDialog } from '../shared/editor-command-dialog';
import { EditorLocalizationService } from '../../localization/editor-localization.service';
/**
 * A directive which configures an existing `ToolBarButtonComponent` as an Editor ViewSource tool
 * ([see example]({% slug toolbartools_editor %}#toc-built-in-tools)).
 * The directive will predefine the `icon` and `click` event handlers of the button.
 *
 * @example
 * ```ts-no-run
 * <kendo-toolbar-button kendoEditorViewSourceButton></kendo-toolbar-button>
 * ```
 *
 * The following example demonstrates how to change the default icon that is applied by the directive.
 *
 * @example
 * ```ts-no-run
 * <kendo-toolbar-button kendoEditorViewSourceButton [icon]="'blogger'"></kendo-toolbar-button>
 * ```
 */
export class EditorViewSourceButtonDirective extends EditorCommandDialog {
    constructor(button, editor, localization) {
        super('viewSource', button, editor, localization);
    }
}
EditorViewSourceButtonDirective.decorators = [
    { type: Directive, args: [{
                selector: 'kendo-toolbar-button[kendoEditorViewSourceButton]'
            },] },
];
/** @nocollapse */
EditorViewSourceButtonDirective.ctorParameters = () => [
    { type: ToolBarButtonComponent },
    { type: EditorComponent, decorators: [{ type: Host }] },
    { type: EditorLocalizationService }
];
