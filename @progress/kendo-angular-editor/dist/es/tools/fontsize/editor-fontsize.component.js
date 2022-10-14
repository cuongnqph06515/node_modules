/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { Component, Input, TemplateRef, ViewChild, ElementRef, forwardRef, Output, Host, EventEmitter } from '@angular/core';
import { ToolBarToolComponent } from '@progress/kendo-angular-toolbar';
import { outerWidth, isPresent, getUniqueStyleValues } from '../../util';
import { EditorComponent } from '../../editor.component';
import { EditorLocalizationService } from '../../localization/editor-localization.service';
import { DialogService } from '@progress/kendo-angular-dialog';
import { FontSizeDialogComponent } from '../../dialogs/font-size-dialog.component';
import { FontSizeDropDownListComponent } from './editor-fontsize-dropdownlist.component';
/**
 * A component which configures an existing `DropDownListComponent` as an Editor tool
 * ([see example]({% slug toolbartools_editor %}#toc-built-in-tools)).
 * The component associates a `kendo-dropdownlist` with an Editor command that changes the font size of a content block and
 * automatically defines the options of the drop-down list and sets its values.
 *
 * @example
 * ```ts-no-run
 * <kendo-toolbar-dropdownlist kendoEditorFontSize></kendo-toolbar-dropdownlist>
 * ```
 */
var EditorFontSizeComponent = /** @class */ (function (_super) {
    tslib_1.__extends(EditorFontSizeComponent, _super);
    function EditorFontSizeComponent(editor, dialogService, localization) {
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
            { text: '8px', size: 8 },
            { text: '10px', size: 10 },
            { text: '12px', size: 12 },
            { text: '14px', size: 14 },
            { text: '18px', size: 18 },
            { text: '24px', size: 24 },
            { text: '36px', size: 36 }
        ];
        return _this;
    }
    Object.defineProperty(EditorFontSizeComponent.prototype, "data", {
        get: function () {
            return this._data;
        },
        /**
         * Overrides the default font size list.
         */
        set: function (sizes) {
            this._data = sizes || this._data;
        },
        enumerable: true,
        configurable: true
    });
    EditorFontSizeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.itemDisabled = function (itemArgs) {
            if (!_this.overflows && _this.fontSizeDropDownList && !_this.fontSizeDropDownList.dropDownList.isOpen) {
                return true; //disable all items in order to prevent navigation when DDL is closed
            }
            else {
                return itemArgs.dataItem.size === null;
            }
        };
        setTimeout(function () { return (_this.defaultItem = { text: _this.title, size: null }); });
        this.subs = this.editor.stateChange.subscribe(function (_a) {
            // remove units(px, em, rem...)
            // string#match returns array
            var style = _a.style;
            _this.value = (getUniqueStyleValues(style.selected, 'font-size').match(/\d+/g) || [null])[0];
            _this.disabled = style.disabled;
        });
    };
    /**
     * @hidden
     */
    EditorFontSizeComponent.prototype.onValueChange = function (ev) {
        if (isPresent(ev)) {
            this.editor.exec('fontSize', ev);
            this.editor.focus();
            this.valueChange.emit(this.data.find(function (d) { return d.size === parseInt(ev, 10); }));
        }
    };
    EditorFontSizeComponent.prototype.ngOnDestroy = function () {
        this.subs.unsubscribe();
    };
    Object.defineProperty(EditorFontSizeComponent.prototype, "outerWidth", {
        get: function () {
            if (this.element) {
                return outerWidth(this.element.nativeElement);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditorFontSizeComponent.prototype, "title", {
        get: function () {
            return this.localization.get('fontSize');
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    EditorFontSizeComponent.prototype.openDialog = function () {
        var dialogSettings = {
            appendTo: this.editor.dialogContainer,
            content: FontSizeDialogComponent
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
    EditorFontSizeComponent.prototype.canFocus = function () {
        return !this.disabled;
    };
    /**
     * @hidden
     */
    EditorFontSizeComponent.prototype.focus = function () {
        this.tabindex = 0;
        if (this.overflows) {
            this.fontSizeButton.nativeElement.focus();
        }
        else {
            this.fontSizeDropDownList.focus();
        }
    };
    /**
     * @hidden
     */
    EditorFontSizeComponent.prototype.handleKey = function () {
        this.tabindex = -1;
        return false;
    };
    EditorFontSizeComponent.decorators = [
        { type: Component, args: [{
                    // tslint:disable-next-line:no-forward-ref
                    providers: [{ provide: ToolBarToolComponent, useExisting: forwardRef(function () { return EditorFontSizeComponent; }) }],
                    selector: 'kendo-toolbar-dropdownlist[kendoEditorFontSize]',
                    template: "\n        <ng-template #toolbarTemplate>\n            <kendo-editor-fontsize-dropdownlist\n                #element\n                [defaultItem]=\"defaultItem\"\n                [data]=\"data\"\n                [(value)]=\"value\"\n                [itemDisabled]=\"itemDisabled\"\n                [title]=\"title\"\n                [disabled]=\"disabled\"\n                [tabindex]=\"tabindex\"\n                (valueChange)=\"onValueChange($event)\"\n            >\n            </kendo-editor-fontsize-dropdownlist>\n        </ng-template>\n        <ng-template #popupTemplate>\n            <button\n                tabindex=\"-1\"\n                type=\"button\"\n                kendoButton\n                #fontSizeButton\n                class=\"k-overflow-button\"\n                [icon]=\"'font-size'\"\n                [attr.title]=\"title\"\n                [disabled]=\"disabled\"\n                [tabindex]=\"tabindex\"\n                (click)=\"openDialog()\"\n            >\n                {{ title }}\n            </button>\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    EditorFontSizeComponent.ctorParameters = function () { return [
        { type: EditorComponent, decorators: [{ type: Host }] },
        { type: DialogService },
        { type: EditorLocalizationService }
    ]; };
    EditorFontSizeComponent.propDecorators = {
        data: [{ type: Input }],
        valueChange: [{ type: Output }],
        toolbarTemplate: [{ type: ViewChild, args: ['toolbarTemplate', { static: true },] }],
        popupTemplate: [{ type: ViewChild, args: ['popupTemplate', { static: true },] }],
        element: [{ type: ViewChild, args: ['element',] }],
        fontSizeDropDownList: [{ type: ViewChild, args: ['element', { read: FontSizeDropDownListComponent },] }],
        fontSizeButton: [{ type: ViewChild, args: ['fontSizeButton',] }]
    };
    return EditorFontSizeComponent;
}(ToolBarToolComponent));
export { EditorFontSizeComponent };
