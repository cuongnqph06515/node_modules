/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var editor_component_1 = require("../../editor.component");
var editor_command_dialog_1 = require("../shared/editor-command-dialog");
var kendo_angular_toolbar_1 = require("@progress/kendo-angular-toolbar");
var editor_localization_service_1 = require("../../localization/editor-localization.service");
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
var EditorInsertFileButtonDirective = /** @class */ (function (_super) {
    tslib_1.__extends(EditorInsertFileButtonDirective, _super);
    function EditorInsertFileButtonDirective(button, editor, localization) {
        return _super.call(this, 'insertFile', button, editor, localization) || this;
    }
    EditorInsertFileButtonDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: 'kendo-toolbar-button[kendoEditorInsertFileButton]'
                },] },
    ];
    /** @nocollapse */
    EditorInsertFileButtonDirective.ctorParameters = function () { return [
        { type: kendo_angular_toolbar_1.ToolBarButtonComponent },
        { type: editor_component_1.EditorComponent, decorators: [{ type: core_1.Host }] },
        { type: editor_localization_service_1.EditorLocalizationService }
    ]; };
    return EditorInsertFileButtonDirective;
}(editor_command_dialog_1.EditorCommandDialog));
exports.EditorInsertFileButtonDirective = EditorInsertFileButtonDirective;
