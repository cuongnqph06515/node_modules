/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
// tslint:disable:no-forward-ref
import * as tslib_1 from "tslib";
import { Component, Input, Host, forwardRef, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { ToolBarToolComponent } from '@progress/kendo-angular-toolbar';
import { ColorPickerComponent } from '@progress/kendo-angular-inputs';
import { EditorLocalizationService } from '../../localization/editor-localization.service';
import { outerWidth } from '../../util';
import { EditorComponent } from '../../editor.component';
import { DialogService } from '@progress/kendo-angular-dialog';
import { ColorPickerDialogComponent } from '../../dialogs/colorpicker-dialog.component';
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
                return outerWidth(this.element.nativeElement);
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
            content: ColorPickerDialogComponent
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
        { type: Component, args: [{
                    providers: [{ provide: ToolBarToolComponent, useExisting: forwardRef(function () { return EditorColorPickerComponent; }) }],
                    selector: 'kendo-toolbar-colorpicker',
                    template: "\n        <ng-template #toolbarTemplate>\n            <kendo-colorpicker\n                #colorpicker\n                [view]=\"'palette'\"\n                [format]=\"'hex'\"\n                [attr.title]=\"title\"\n                [icon]=\"icon\"\n                [value]=\"value\"\n                [paletteSettings]=\"paletteSettings\"\n                [disabled]=\"disabled\"\n                [tabindex]=\"tabindex\"\n                (valueChange)=\"handleValueChange($event)\"\n                (activeColorClick)=\"handleActiveColorClick($event)\"\n                (open)=\"onOpen(colorpicker)\"\n                (close)=\"onClose(colorpicker)\"\n            >\n            </kendo-colorpicker>\n        </ng-template>\n        <ng-template #popupTemplate>\n            <button\n                tabindex=\"-1\"\n                type=\"button\"\n                kendoButton\n                #colorPickerButton\n                class=\"k-overflow-button\"\n                [icon]=\"icon\"\n                [attr.title]=\"title\"\n                [disabled]=\"disabled\"\n                [tabindex]=\"tabindex\"\n                (click)=\"openDialog()\"\n            >\n                {{ title }}\n            </button>\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    EditorColorPickerComponent.ctorParameters = function () { return [
        { type: EditorComponent, decorators: [{ type: Host }] },
        { type: EditorLocalizationService },
        { type: DialogService }
    ]; };
    EditorColorPickerComponent.propDecorators = {
        value: [{ type: Input }],
        icon: [{ type: Input }],
        paletteSettings: [{ type: Input }],
        editorCommand: [{ type: Input }],
        disabled: [{ type: Input }],
        toolbarTemplate: [{ type: ViewChild, args: ['toolbarTemplate', { static: true },] }],
        popupTemplate: [{ type: ViewChild, args: ['popupTemplate', { static: true },] }],
        element: [{ type: ViewChild, args: ['colorpicker', { read: ElementRef },] }],
        colorPicker: [{ type: ViewChild, args: ['colorpicker', { read: ColorPickerComponent },] }],
        colorPickerButton: [{ type: ViewChild, args: ['colorPickerButton', { read: ElementRef },] }]
    };
    return EditorColorPickerComponent;
}(ToolBarToolComponent));
export { EditorColorPickerComponent };
