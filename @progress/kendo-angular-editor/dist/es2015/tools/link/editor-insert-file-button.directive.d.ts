/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { EditorComponent } from '../../editor.component';
import { EditorCommandDialog } from '../shared/editor-command-dialog';
import { ToolBarButtonComponent } from '@progress/kendo-angular-toolbar';
import { EditorLocalizationService } from '../../localization/editor-localization.service';
/**
 * A directive which configures an existing `ToolBarButtonComponent` as an Editor 'Insert File' tool
 * ([see example]({% slug toolbartools_editor %}#toc-built-in-tools)).
 * The directive will predefine the `icon` and `click` event handlers of the button.
 *
 * @example
 * ```ts-no-run
 * <kendo-toolbar-button kendoEditorInsertFileButton></kendo-toolbar-button>
 * ```
 */
export declare class EditorInsertFileButtonDirective extends EditorCommandDialog {
    constructor(button: ToolBarButtonComponent, editor: EditorComponent, localization: EditorLocalizationService);
}
