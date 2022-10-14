/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { Component, TemplateRef, ViewChild, ElementRef, forwardRef, Input, Output, Host, EventEmitter } from '@angular/core';
import { ToolBarToolComponent } from '@progress/kendo-angular-toolbar';
import { outerWidth, isPresent, getUniqueStyleValues } from '../../util';
import { EditorComponent } from '../../editor.component';
import { EditorLocalizationService } from '../../localization/editor-localization.service';
import { DialogService } from '@progress/kendo-angular-dialog';
import { FontFamilyDialogComponent } from '../../dialogs/font-family-dialog.component';
import { FontFamilyDropDownListComponent } from './editor-fontfamily-dropdownlist.component';
/**
 * A component which configures an existing `DropDownListComponent` as an Editor tool
 * ([see example]({% slug toolbartools_editor %}#toc-built-in-tools)).
 * The component associates a `kendo-toolbar-dropdownlist` with an Editor command that changes the font family of a content block and
 * automatically defines the options of the drop-down list and sets its values.
 *
 * @example
 * ```ts-no-run
 * <kendo-toolbar-dropdownlist kendoEditorFontFamily></kendo-toolbar-dropdownlist>
 * ```
 */
var EditorFontFamilyComponent = /** @class */ (function (_super) {
    tslib_1.__extends(EditorFontFamilyComponent, _super);
    function EditorFontFamilyComponent(editor, dialogService, localization) {
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
            { text: 'Arial', fontName: 'Arial,"Helvetica Neue",Helvetica,sans-serif' },
            { text: 'Courier New', fontName: '"Courier New",Courier,"Lucida Sans Typewriter","Lucida Typewriter",monospace' },
            { text: 'Georgia', fontName: 'Georgia,Times,"Times New Roman",serif' },
            {
                fontName: 
                // tslint:disable-next-line:max-line-length
                'Impact,Haettenschweiler,"Franklin Gothic Bold",Charcoal,"Helvetica Inserat","Bitstream Vera Sans Bold","Arial Black","sans serif"',
                text: 'Impact'
            },
            { text: 'Lucida Console', fontName: '"Lucida Console","Lucida Sans Typewriter",monaco,"Bitstream Vera Sans Mono",monospace' },
            { text: 'Tahoma', fontName: 'Tahoma,Verdana,Segoe,sans-serif' },
            { text: 'Times New Roman', fontName: 'TimesNewRoman,"Times New Roman",Times,Baskerville,Georgia,serif' },
            { text: 'Trebuchet MS', fontName: '"Trebuchet MS","Lucida Grande","Lucida Sans Unicode","Lucida Sans",Tahoma,sans-serif' },
            { text: 'Verdana', fontName: 'Verdana,Geneva,sans-serif' }
        ];
        return _this;
    }
    Object.defineProperty(EditorFontFamilyComponent.prototype, "data", {
        get: function () {
            return this._data;
        },
        /**
         * Overrides the default font list.
         */
        set: function (fonts) {
            this._data = fonts || this._data;
        },
        enumerable: true,
        configurable: true
    });
    EditorFontFamilyComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.itemDisabled = function (itemArgs) {
            if (!_this.overflows && _this.fontFamilyDropDownList && !_this.fontFamilyDropDownList.dropDownList.isOpen) {
                return true; //disable all items in order to prevent navigation when DDL is closed
            }
            else {
                return itemArgs.dataItem.fontName === null;
            }
        };
        setTimeout(function () { return (_this.defaultItem = { text: _this.title, fontName: null }); });
        this.subs = this.editor.stateChange.subscribe(function (_a) {
            var style = _a.style;
            _this.value = getUniqueStyleValues(style.selected, 'font-family') || null;
            _this.disabled = style.disabled;
        });
    };
    /**
     * @hidden
     */
    EditorFontFamilyComponent.prototype.onValueChange = function (ev) {
        if (isPresent(ev)) {
            this.editor.exec('fontFamily', ev);
            this.editor.focus();
            this.valueChange.emit(this.data.find(function (f) { return f.fontName === ev; }));
        }
    };
    EditorFontFamilyComponent.prototype.ngOnDestroy = function () {
        this.subs.unsubscribe();
    };
    Object.defineProperty(EditorFontFamilyComponent.prototype, "outerWidth", {
        get: function () {
            if (this.element) {
                return outerWidth(this.element.nativeElement);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditorFontFamilyComponent.prototype, "title", {
        get: function () {
            return this.localization.get('fontFamily');
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    EditorFontFamilyComponent.prototype.openDialog = function () {
        var dialogSettings = {
            appendTo: this.editor.dialogContainer,
            content: FontFamilyDialogComponent
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
    EditorFontFamilyComponent.prototype.canFocus = function () {
        return !this.disabled;
    };
    /**
     * @hidden
     */
    EditorFontFamilyComponent.prototype.focus = function () {
        this.tabindex = 0;
        if (this.overflows) {
            this.fontFamilyButton.nativeElement.focus();
        }
        else {
            this.fontFamilyDropDownList.focus();
        }
    };
    /**
     * @hidden
     */
    EditorFontFamilyComponent.prototype.handleKey = function () {
        this.tabindex = -1;
        return false;
    };
    EditorFontFamilyComponent.decorators = [
        { type: Component, args: [{
                    // tslint:disable-next-line:no-forward-ref
                    providers: [{ provide: ToolBarToolComponent, useExisting: forwardRef(function () { return EditorFontFamilyComponent; }) }],
                    selector: 'kendo-toolbar-dropdownlist[kendoEditorFontFamily]',
                    template: "\n        <ng-template #toolbarTemplate>\n            <kendo-editor-fontfamily-dropdownlist\n                #element\n                [defaultItem]=\"defaultItem\"\n                [data]=\"data\"\n                [(value)]=\"value\"\n                [itemDisabled]=\"itemDisabled\"\n                [title]=\"title\"\n                [disabled]=\"disabled\"\n                [tabindex]=\"tabindex\"\n                (valueChange)=\"onValueChange($event)\"\n            >\n            </kendo-editor-fontfamily-dropdownlist>\n        </ng-template>\n        <ng-template #popupTemplate>\n            <button\n                tabindex=\"-1\"\n                type=\"button\"\n                kendoButton\n                #fontFamilyButton\n                class=\"k-overflow-button\"\n                [icon]=\"'font-family'\"\n                [attr.title]=\"title\"\n                [disabled]=\"disabled\"\n                [tabindex]=\"tabindex\"\n                (click)=\"openDialog()\"\n            >\n                {{ title }}\n            </button>\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    EditorFontFamilyComponent.ctorParameters = function () { return [
        { type: EditorComponent, decorators: [{ type: Host }] },
        { type: DialogService },
        { type: EditorLocalizationService }
    ]; };
    EditorFontFamilyComponent.propDecorators = {
        data: [{ type: Input }],
        valueChange: [{ type: Output }],
        toolbarTemplate: [{ type: ViewChild, args: ['toolbarTemplate', { static: true },] }],
        popupTemplate: [{ type: ViewChild, args: ['popupTemplate', { static: true },] }],
        element: [{ type: ViewChild, args: ['element',] }],
        fontFamilyDropDownList: [{ type: ViewChild, args: ['element', { read: FontFamilyDropDownListComponent },] }],
        fontFamilyButton: [{ type: ViewChild, args: ['fontFamilyButton',] }]
    };
    return EditorFontFamilyComponent;
}(ToolBarToolComponent));
export { EditorFontFamilyComponent };
