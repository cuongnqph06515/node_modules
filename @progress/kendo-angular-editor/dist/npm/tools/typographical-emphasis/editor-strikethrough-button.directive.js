/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var kendo_angular_toolbar_1 = require("@progress/kendo-angular-toolbar");
var editor_component_1 = require("../../editor.component");
var editor_command_button_1 = require("../shared/editor-command-button");
var editor_localization_service_1 = require("../../localization/editor-localization.service");
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
var EditorStrikethroughButtonDirective = /** @class */ (function (_super) {
    tslib_1.__extends(EditorStrikethroughButtonDirective, _super);
    function EditorStrikethroughButtonDirective(button, editor, localization) {
        return _super.call(this, 'strikethrough', button, editor, localization) || this;
    }
    EditorStrikethroughButtonDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: 'kendo-toolbar-button[kendoEditorStrikethroughButton]'
                },] },
    ];
    /** @nocollapse */
    EditorStrikethroughButtonDirective.ctorParameters = function () { return [
        { type: kendo_angular_toolbar_1.ToolBarButtonComponent },
        { type: editor_component_1.EditorComponent, decorators: [{ type: core_1.Host }] },
        { type: editor_localization_service_1.EditorLocalizationService }
    ]; };
    return EditorStrikethroughButtonDirective;
}(editor_command_button_1.EditorCommandButton));
exports.EditorStrikethroughButtonDirective = EditorStrikethroughButtonDirective;
