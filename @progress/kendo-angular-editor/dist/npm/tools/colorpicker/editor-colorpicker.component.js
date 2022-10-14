/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
// tslint:disable:no-forward-ref
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var kendo_angular_toolbar_1 = require("@progress/kendo-angular-toolbar");
var kendo_angular_inputs_1 = require("@progress/kendo-angular-inputs");
var editor_localization_service_1 = require("../../localization/editor-localization.service");
var util_1 = require("../../util");
var editor_component_1 = require("../../editor.component");
var kendo_angular_dialog_1 = require("@progress/kendo-angular-dialog");
var colorpicker_dialog_component_1 = require("../../dialogs/colorpicker-dialog.component");
/**
 * A component which configures an existing ColorPickerComponent as a ToolBar tool.
 * To associate a `kendo-toolbar-colorpicker` with an Editor command that changes the
 * foreground or the background color of the text, use the `kendoEditorForeColor` or `kendoEditorBackColor` directive.
 */
var EditorColorPickerComponent = /** @class */ (function (_super) {
    tslib_1.__extends(EditorColorPickerComponent, _super);
    function EditorColorPickerComponent(editor, localization, dialogService) {
        var _this = _super.call(this) || this;
        _this.editor = editor;
        _this.localization = localization;
        _this.dialogService = dialogService;
        _this.tabindex = -1;
        /**
         * Specifies if the component should be disabled.
         */
        _this.disabled = false;
        return _this;
    }
    Object.defineProperty(EditorColorPickerComponent.prototype, "title", {
        /**
         * @hidden
         */
        get: function () {
            return this.localization.get(this.editorCommand);
        },
        enumerable: true,
        configurable: true
    });
    EditorColorPickerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subs = this.editor.stateChange.subscribe(function (_a) {
            var style = _a.style;
            _this.disabled = style.disabled;
        });
    };
    EditorColorPickerComponent.prototype.ngOnDestroy = function () {
        this.subs.unsubscribe();
    };
    /**
     * @hidden
     */
    EditorColorPickerComponent.prototype.handleValueChange = function (color) {
        this.editor.exec(this.editorCommand, color);
        this.editor.focus();
    };
    /**
     * @hidden
     */
    EditorColorPickerComponent.prototype.handleActiveColorClick = function (event) {
        event.preventOpen();
        this.handleValueChange(event.color);
    };
    /**
     * @hidden
     */
    EditorColorPickerComponent.prototype.onOpen = function (picker) {
        this.valueCache = picker.value;
        picker.reset();
    };
    /**
     * @hidden
     */
    EditorColorPickerComponent.prototype.onClose = function (picker) {
        if (!picker.value) {
            picker.value = this.valueCache;
        }
    };
    Object.defineProperty(EditorColorPickerComponent.prototype, "outerWidth", {
        /**
         * @hidden
         */
        get: function () {
            if (this.element) {
                return util_1.outerWidth(this.element.nativeElement);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    EditorColorPickerComponent.prototype.openDialog = function () {
        var dialogSettings = {
            appendTo: this.editor.dialogContainer,
            content: colorpicker_dialog_component_1.ColorPickerDialogComponent
        };
        this.editor.toolbar.toggle(false);
        var dialogContent = this.dialogService.open(dialogSettings).content.instance;
        dialogContent.setData({
            editor: this.editor,
            value: this.value,
            title: this.title,
            editorCommand: this.editorCommand,
            paletteSettings: this.paletteSettings,
            icon: this.icon
        });
    };
    /**
     * @hidden
     */
    EditorColorPickerComponent.prototype.canFocus = function () {
        return !this.disabled;
    };
    /**
     * @hidden
     */
    EditorColorPickerComponent.prototype.focus = function () {
        this.tabindex = 0;
        if (this.overflows) {
            this.colorPickerButton.nativeElement.focus();
        }
        else {
            this.colorPicker.focus();
        }
    };
    /**
     * @hidden
     */
    EditorColorPickerComponent.prototype.handleKey = function () {
        this.tabindex = -1;
        return false;
    };
    EditorColorPickerComponent.decorators = [
        { type: core_1.Component, args: [{
                    providers: [{ provide: kendo_angular_toolbar_1.ToolBarToolComponent, useExisting: core_1.forwardRef(function () { return EditorColorPickerComponent; }) }],
                    selector: 'kendo-toolbar-colorpicker',
                    template: "\n        <ng-template #toolbarTemplate>\n            <kendo-colorpicker\n                #colorpicker\n                [view]=\"'palette'\"\n                [format]=\"'hex'\"\n                [attr.title]=\"title\"\n                [icon]=\"icon\"\n                [value]=\"value\"\n                [paletteSettings]=\"paletteSettings\"\n                [disabled]=\"disabled\"\n                [tabindex]=\"tabindex\"\n                (valueChange)=\"handleValueChange($event)\"\n                (activeColorClick)=\"handleActiveColorClick($event)\"\n                (open)=\"onOpen(colorpicker)\"\n                (close)=\"onClose(colorpicker)\"\n            >\n            </kendo-colorpicker>\n        </ng-template>\n        <ng-template #popupTemplate>\n            <button\n                tabindex=\"-1\"\n                type=\"button\"\n                kendoButton\n                #colorPickerButton\n                class=\"k-overflow-button\"\n                [icon]=\"icon\"\n                [attr.title]=\"title\"\n                [disabled]=\"disabled\"\n                [tabindex]=\"tabindex\"\n                (click)=\"openDialog()\"\n            >\n                {{ title }}\n            </button>\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    EditorColorPickerComponent.ctorParameters = function () { return [
        { type: editor_component_1.EditorComponent, decorators: [{ type: core_1.Host }] },
        { type: editor_localization_service_1.EditorLocalizationService },
        { type: kendo_angular_dialog_1.DialogService }
    ]; };
    EditorColorPickerComponent.propDecorators = {
        value: [{ type: core_1.Input }],
        icon: [{ type: core_1.Input }],
        paletteSettings: [{ type: core_1.Input }],
        editorCommand: [{ type: core_1.Input }],
        disabled: [{ type: core_1.Input }],
        toolbarTemplate: [{ type: core_1.ViewChild, args: ['toolbarTemplate', { static: true },] }],
        popupTemplate: [{ type: core_1.ViewChild, args: ['popupTemplate', { static: true },] }],
        element: [{ type: core_1.ViewChild, args: ['colorpicker', { read: core_1.ElementRef },] }],
        colorPicker: [{ type: core_1.ViewChild, args: ['colorpicker', { read: kendo_angular_inputs_1.ColorPickerComponent },] }],
        colorPickerButton: [{ type: core_1.ViewChild, args: ['colorPickerButton', { read: core_1.ElementRef },] }]
    };
    return EditorColorPickerComponent;
}(kendo_angular_toolbar_1.ToolBarToolComponent));
exports.EditorColorPickerComponent = EditorColorPickerComponent;
