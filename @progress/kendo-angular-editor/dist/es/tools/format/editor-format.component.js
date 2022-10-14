/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { Component, TemplateRef, ViewChild, Input, forwardRef, Output, Host, EventEmitter, ElementRef } from '@angular/core';
import { ToolBarToolComponent } from '@progress/kendo-angular-toolbar';
import { DialogService } from '@progress/kendo-angular-dialog';
import { outerWidth, isPresent } from '../../util';
import { EditorComponent } from '../../editor.component';
import { EditorLocalizationService } from '../../localization/editor-localization.service';
import { FormatDialogComponent } from '../../dialogs/format-dialog.component';
import { FormatDropDownListComponent } from './editor-format-dropdownlist.component';
/**
 * A component which configures an existing `DropDownListComponent` as an Editor tool
 * ([see example]({% slug toolbartools_editor %}#toc-built-in-tools)).
 * The component associates a `kendo-dropdownlist` with an Editor command that changes the format of a content block and
 * automatically defines the options of the drop-down list and sets its values.
 *
 * @example
 * ```ts-no-run
 * <kendo-toolbar-dropdownlist kendoEditorFormat></kendo-toolbar-dropdownlist>
 * ```
 */
var EditorFormatComponent = /** @class */ (function (_super) {
    tslib_1.__extends(EditorFormatComponent, _super);
    function EditorFormatComponent(editor, dialogService, localization) {
        var _this = _super.call(this) || this;
        _this.editor = editor;
        _this.dialogService = dialogService;
        _this.localization = localization;
        _this.disabled = false;
        _this.tabindex = -1;
        /**
         * Fires when the user updates the value of the drop-down list.
         */
        _this.valueChange = new EventEmitter();
        _this._data = [
            { text: 'Paragraph', tag: 'p' },
            { text: 'Quotation', tag: 'blockquote' },
            { text: 'Heading 1', tag: 'h1' },
            { text: 'Heading 2', tag: 'h2' },
            { text: 'Heading 3', tag: 'h3' },
            { text: 'Heading 4', tag: 'h4' },
            { text: 'Heading 5', tag: 'h5' },
            { text: 'Heading 6', tag: 'h6' }
        ];
        return _this;
    }
    Object.defineProperty(EditorFormatComponent.prototype, "data", {
        get: function () {
            return this._data;
        },
        /**
         * Overrides the default format items list.
         */
        set: function (formatItems) {
            this._data = formatItems || this._data;
        },
        enumerable: true,
        configurable: true
    });
    EditorFormatComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.itemDisabled = function (itemArgs) {
            if (!_this.overflows && _this.formatDropDownList && !_this.formatDropDownList.dropDownList.isOpen) {
                return true; //disable all items in order to prevent navigation when DDL is closed
            }
            else {
                return itemArgs.dataItem.tag === null;
            }
        };
        setTimeout(function () { return (_this.defaultItem = { text: _this.title, tag: null }); });
        this.subs = this.editor.stateChange.subscribe(function (_a) {
            var format = _a.format;
            var index = _this.data.findIndex(function (item) { return item.tag === format.selected.tag; });
            _this.value = index !== -1 ? format.selected.tag : null;
            _this.disabled = format.disabled;
        });
    };
    /**
     * @hidden
     */
    EditorFormatComponent.prototype.onValueChange = function (ev) {
        if (isPresent(ev)) {
            this.editor.exec('format', { tag: ev });
            this.editor.focus();
            this.valueChange.emit(this.data.find(function (d) { return d.tag === ev; }));
        }
    };
    EditorFormatComponent.prototype.ngOnDestroy = function () {
        this.subs.unsubscribe();
    };
    Object.defineProperty(EditorFormatComponent.prototype, "outerWidth", {
        get: function () {
            var element = this.formatDropDownList.element;
            if (element) {
                return outerWidth(element.nativeElement);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditorFormatComponent.prototype, "title", {
        get: function () {
            return this.localization.get('format');
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    EditorFormatComponent.prototype.openDialog = function () {
        var dialogSettings = {
            appendTo: this.editor.dialogContainer,
            content: FormatDialogComponent
        };
        this.editor.toolbar.toggle(false);
        var dialogContent = this.dialogService.open(dialogSettings).content.instance;
        dialogContent.setData({
            editor: this.editor,
            data: this.data,
            defaultItem: this.defaultItem,
            value: this.value,
            itemDisabled: this.itemDisabled
        });
    };
    /**
     * @hidden
     */
    EditorFormatComponent.prototype.canFocus = function () {
        return !this.disabled;
    };
    /**
     * @hidden
     */
    EditorFormatComponent.prototype.focus = function () {
        this.tabindex = 0;
        if (this.overflows) {
            this.formatButton.nativeElement.focus();
        }
        else {
            this.formatDropDownList.focus();
        }
    };
    /**
     * @hidden
     */
    EditorFormatComponent.prototype.handleKey = function () {
        this.tabindex = -1;
        return false;
    };
    EditorFormatComponent.decorators = [
        { type: Component, args: [{
                    // tslint:disable-next-line:no-forward-ref
                    providers: [{ provide: ToolBarToolComponent, useExisting: forwardRef(function () { return EditorFormatComponent; }) }],
                    selector: 'kendo-toolbar-dropdownlist[kendoEditorFormat]',
                    template: "\n        <ng-template #toolbarTemplate>\n            <kendo-editor-format-dropdownlist\n                #formatDropDownList\n                [defaultItem]=\"defaultItem\"\n                [data]=\"data\"\n                [(value)]=\"value\"\n                [itemDisabled]=\"itemDisabled\"\n                [title]=\"title\"\n                [disabled]=\"disabled\"\n                [tabindex]=\"tabindex\"\n                (valueChange)=\"onValueChange($event)\"\n            >\n            </kendo-editor-format-dropdownlist>\n        </ng-template>\n        <ng-template #popupTemplate>\n            <button\n                #formatButton\n                [tabindex]=\"tabindex\"\n                type=\"button\"\n                kendoButton\n                class=\"k-overflow-button\"\n                [icon]=\"'apply-format'\"\n                [attr.title]=\"title\"\n                [disabled]=\"disabled\"\n                [tabindex]=\"tabindex\"\n                (click)=\"openDialog()\"\n            >\n                {{ title }}\n            </button>\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    EditorFormatComponent.ctorParameters = function () { return [
        { type: EditorComponent, decorators: [{ type: Host }] },
        { type: DialogService },
        { type: EditorLocalizationService }
    ]; };
    EditorFormatComponent.propDecorators = {
        data: [{ type: Input }],
        valueChange: [{ type: Output }],
        toolbarTemplate: [{ type: ViewChild, args: ['toolbarTemplate', { static: true },] }],
        popupTemplate: [{ type: ViewChild, args: ['popupTemplate', { static: true },] }],
        formatDropDownList: [{ type: ViewChild, args: ['formatDropDownList',] }],
        formatButton: [{ type: ViewChild, args: ['formatButton',] }]
    };
    return EditorFormatComponent;
}(ToolBarToolComponent));
export { EditorFormatComponent };
