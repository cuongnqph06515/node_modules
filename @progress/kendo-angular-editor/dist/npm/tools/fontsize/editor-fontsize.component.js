/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var kendo_angular_toolbar_1 = require("@progress/kendo-angular-toolbar");
var util_1 = require("../../util");
var editor_component_1 = require("../../editor.component");
var editor_localization_service_1 = require("../../localization/editor-localization.service");
var kendo_angular_dialog_1 = require("@progress/kendo-angular-dialog");
var font_size_dialog_component_1 = require("../../dialogs/font-size-dialog.component");
var editor_fontsize_dropdownlist_component_1 = require("./editor-fontsize-dropdownlist.component");
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
        _this.valueChange = new core_1.EventEmitter();
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
            _this.value = (util_1.getUniqueStyleValues(style.selected, 'font-size').match(/\d+/g) || [null])[0];
            _this.disabled = style.disabled;
        });
    };
    /**
     * @hidden
     */
    EditorFontSizeComponent.prototype.onValueChange = function (ev) {
        if (util_1.isPresent(ev)) {
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
                return util_1.outerWidth(this.element.nativeElement);
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
            content: font_size_dialog_component_1.FontSizeDialogComponent
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
        { type: core_1.Component, args: [{
                    // tslint:disable-next-line:no-forward-ref
                    providers: [{ provide: kendo_angular_toolbar_1.ToolBarToolComponent, useExisting: core_1.forwardRef(function () { return EditorFontSizeComponent; }) }],
                    selector: 'kendo-toolbar-dropdownlist[kendoEditorFontSize]',
                    template: "\n        <ng-template #toolbarTemplate>\n            <kendo-editor-fontsize-dropdownlist\n                #element\n                [defaultItem]=\"defaultItem\"\n                [data]=\"data\"\n                [(value)]=\"value\"\n                [itemDisabled]=\"itemDisabled\"\n                [title]=\"title\"\n                [disabled]=\"disabled\"\n                [tabindex]=\"tabindex\"\n                (valueChange)=\"onValueChange($event)\"\n            >\n            </kendo-editor-fontsize-dropdownlist>\n        </ng-template>\n        <ng-template #popupTemplate>\n            <button\n                tabindex=\"-1\"\n                type=\"button\"\n                kendoButton\n                #fontSizeButton\n                class=\"k-overflow-button\"\n                [icon]=\"'font-size'\"\n                [attr.title]=\"title\"\n                [disabled]=\"disabled\"\n                [tabindex]=\"tabindex\"\n                (click)=\"openDialog()\"\n            >\n                {{ title }}\n            </button>\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    EditorFontSizeComponent.ctorParameters = function () { return [
        { type: editor_component_1.EditorComponent, decorators: [{ type: core_1.Host }] },
        { type: kendo_angular_dialog_1.DialogService },
        { type: editor_localization_service_1.EditorLocalizationService }
    ]; };
    EditorFontSizeComponent.propDecorators = {
        data: [{ type: core_1.Input }],
        valueChange: [{ type: core_1.Output }],
        toolbarTemplate: [{ type: core_1.ViewChild, args: ['toolbarTemplate', { static: true },] }],
        popupTemplate: [{ type: core_1.ViewChild, args: ['popupTemplate', { static: true },] }],
        element: [{ type: core_1.ViewChild, args: ['element',] }],
        fontSizeDropDownList: [{ type: core_1.ViewChild, args: ['element', { read: editor_fontsize_dropdownlist_component_1.FontSizeDropDownListComponent },] }],
        fontSizeButton: [{ type: core_1.ViewChild, args: ['fontSizeButton',] }]
    };
    return EditorFontSizeComponent;
}(kendo_angular_toolbar_1.ToolBarToolComponent));
exports.EditorFontSizeComponent = EditorFontSizeComponent;
