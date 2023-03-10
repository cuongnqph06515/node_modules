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
 * A directive which configures an existing `ToolBarButtonComponent` as an Editor AddColumnBefore tool
 * ([see example]({% slug toolbartools_editor %}#toc-built-in-tools)).
 * The directive will predefine the `icon` and `click` event handlers of the button.
 * In addition, the directive updates the `disabled` state of the button according to the cursor position in the editing area.
 *
 * @example
 * ```ts-no-run
 * <kendo-toolbar-button kendoEditorAddColumnBeforeButton></kendo-toolbar-button>
 * ```
 */
export class EditorAddColumnBeforeButtonDirective extends EditorCommandButton {
    constructor(button, editor, localization) {
        super('addColumnBefore', button, editor, localization);
    }
}
EditorAddColumnBeforeButtonDirective.decorators = [
    { type: Directive, args: [{
                selector: 'kendo-toolbar-button[kendoEditorAddColumnBeforeButton]'
            },] },
];
/** @nocollapse */
EditorAddColumnBeforeButtonDirective.ctorParameters = () => [
    { type: ToolBarButtonComponent },
    { type: EditorComponent, decorators: [{ type: Host }] },
    { type: EditorLocalizationService }
];
