/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { Directive, Host } from '@angular/core';
import { ToolBarButtonComponent } from '@progress/kendo-angular-toolbar';
import { EditorComponent } from '../editor.component';
import { EditorCommandButton } from './shared/editor-command-button';
import { EditorLocalizationService } from '../localization/editor-localization.service';
/**
 * A directive which configures an existing `ToolBarButtonComponent` as an Editor Clean Formatting tool
 * ([see example]({% slug toolbartools_editor %}#toc-built-in-tools)).
 * The directive will predefine the `icon` and `click` event handlers of the button.
 *
 * @example
 * ```ts-no-run
 * <kendo-toolbar-button kendoEditorCleanFormattingButton></kendo-toolbar-button>
 * ```
 *
 * The following example demonstrates how to change the default icon applied by the directive.
 *
 * @example
 * ```ts-no-run
 * <kendo-toolbar-button kendoEditorCleanFormattingButton [icon]="'blogger'"></kendo-toolbar-button>
 * ```
 */
var EditorCleanFormattingButtonDirective = /** @class */ (function (_super) {
    tslib_1.__extends(EditorCleanFormattingButtonDirective, _super);
    function EditorCleanFormattingButtonDirective(button, editor, localization) {
        return _super.call(this, 'cleanFormatting', button, editor, localization) || this;
    }
    EditorCleanFormattingButtonDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'kendo-toolbar-button[kendoEditorCleanFormattingButton]'
                },] },
    ];
    /** @nocollapse */
    EditorCleanFormattingButtonDirective.ctorParameters = function () { return [
        { type: ToolBarButtonComponent },
        { type: EditorComponent, decorators: [{ type: Host }] },
        { type: EditorLocalizationService }
    ]; };
    return EditorCleanFormattingButtonDirective;
}(EditorCommandButton));
export { EditorCleanFormattingButtonDirective };