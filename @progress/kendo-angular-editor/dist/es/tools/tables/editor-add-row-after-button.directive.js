/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { Directive, Host } from '@angular/core';
import { ToolBarButtonComponent } from '@progress/kendo-angular-toolbar';
import { EditorComponent } from '../../editor.component';
import { EditorCommandButton } from '../shared/editor-command-button';
import { EditorLocalizationService } from '../../localization/editor-localization.service';
/**
 * A directive which configures an existing `ToolBarButtonComponent` as an Editor AddRowAfter tool
 * ([see example]({% slug toolbartools_editor %}#toc-built-in-tools)).
 * The directive will predefine the `icon` and `click` event handlers of the button.
 * In addition, the directive updates the `disabled` state of the button according to the cursor position in the editing area.
 *
 * @example
 * ```ts-no-run
 * <kendo-toolbar-button kendoEditorAddRowAfterButton></kendo-toolbar-button>
 * ```
 */
var EditorAddRowAfterButtonDirective = /** @class */ (function (_super) {
    tslib_1.__extends(EditorAddRowAfterButtonDirective, _super);
    function EditorAddRowAfterButtonDirective(button, editor, localization) {
        return _super.call(this, 'addRowAfter', button, editor, localization) || this;
    }
    EditorAddRowAfterButtonDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'kendo-toolbar-button[kendoEditorAddRowAfterButton]'
                },] },
    ];
    /** @nocollapse */
    EditorAddRowAfterButtonDirective.ctorParameters = function () { return [
        { type: ToolBarButtonComponent },
        { type: EditorComponent, decorators: [{ type: Host }] },
        { type: EditorLocalizationService }
    ]; };
    return EditorAddRowAfterButtonDirective;
}(EditorCommandButton));
export { EditorAddRowAfterButtonDirective };
