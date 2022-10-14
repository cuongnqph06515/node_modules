/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var kendo_angular_toolbar_1 = require("@progress/kendo-angular-toolbar");
var kendo_angular_popup_1 = require("@progress/kendo-angular-popup");
var util_1 = require("../../util");
var editor_component_1 = require("../../editor.component");
var editor_localization_service_1 = require("../../localization/editor-localization.service");
var kendo_angular_dialog_1 = require("@progress/kendo-angular-dialog");
var insert_table_dialog_component_1 = require("../../dialogs/insert-table-dialog.component");
var kendo_angular_common_1 = require("@progress/kendo-angular-common");
var popupWrapperWidth = '190px';
var popupWrapperHeight = '164px'; // Set to '192px' when TableWizard button is added;
/**
 * A toolbar component which allows the user to create and insert a table in the Editor's content.
 *
 * @example
 * ```ts-no-run
 * <kendo-editor-insert-table-button></kendo-editor-insert-table-button>
 * ```
 */
var EditorInsertTableButtonComponent = /** @class */ (function (_super) {
    tslib_1.__extends(EditorInsertTableButtonComponent, _super);
    function EditorInsertTableButtonComponent(editor, localization, popupService, dialogService) {
        var _this = _super.call(this) || this;
        _this.editor = editor;
        _this.localization = localization;
        _this.popupService = popupService;
        _this.dialogService = dialogService;
        _this.open = false;
        _this.buttonBlurred = new core_1.EventEmitter();
        _this.cellClicked = new core_1.EventEmitter();
        _this.subs = _this.editor.stateChange.subscribe(function (_a) {
            var insertTable = _a.insertTable;
            _this.disabled = insertTable.disabled;
        });
        _this.subs = _this.buttonBlurred.pipe(operators_1.concatMap(function () { return rxjs_1.interval(200).pipe(operators_1.take(1), operators_1.takeUntil(_this.cellClicked)); })).subscribe(function () {
            _this.toggle(false);
        });
        return _this;
    }
    EditorInsertTableButtonComponent.prototype.ngAfterViewInit = function () {
        this.getButton().tabIndex = -1;
    };
    EditorInsertTableButtonComponent.prototype.ngOnDestroy = function () {
        this.destroyPopup();
        this.subs.unsubscribe();
    };
    Object.defineProperty(EditorInsertTableButtonComponent.prototype, "outerWidth", {
        get: function () {
            if (this.element) {
                return util_1.outerWidth(this.element.nativeElement);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditorInsertTableButtonComponent.prototype, "title", {
        get: function () {
            return this.localization.get('insertTable');
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    EditorInsertTableButtonComponent.prototype.toggle = function (open) {
        this.open = open === undefined ? !this.open : open;
        this.destroyPopup();
        if (this.open) {
            this.createPopup();
        }
    };
    /**
     * @hidden
     */
    EditorInsertTableButtonComponent.prototype.openDialog = function () {
        var dialogSettings = {
            appendTo: this.editor.dialogContainer,
            content: insert_table_dialog_component_1.InsertTableDialogComponent
        };
        this.editor.toolbar.toggle(false);
        var dialogContent = this.dialogService.open(dialogSettings).content.instance;
        dialogContent.setData({
            editor: this.editor
        });
    };
    /**
     * @hidden
     */
    EditorInsertTableButtonComponent.prototype.onBlur = function () {
        this.getButton().tabIndex = -1;
        this.buttonBlurred.emit();
    };
    /**
     * @hidden
     */
    EditorInsertTableButtonComponent.prototype.onCellClick = function (args) {
        this.cellClicked.emit();
        this.toggle(false);
        this.editor.exec('insertTable', args);
    };
    /**
     * @hidden
     */
    EditorInsertTableButtonComponent.prototype.canFocus = function () {
        return !this.disabled;
    };
    /**
     * @hidden
     */
    EditorInsertTableButtonComponent.prototype.focus = function () {
        this.getButton().focus();
        this.getButton().tabIndex = 0;
    };
    /**
     * @hidden
     */
    EditorInsertTableButtonComponent.prototype.handleKey = function (ev) {
        if (ev.keyCode === kendo_angular_common_1.Keys.Space || ev.keyCode === kendo_angular_common_1.Keys.Enter) {
            return true;
        }
        this.getButton().tabIndex = -1;
        return false;
    };
    /**
     * @hidden
     */
    EditorInsertTableButtonComponent.prototype.onTableWizardClick = function () {
        // this.toggle(false);
        // this.editor.openDialog("tableWizard");
    };
    EditorInsertTableButtonComponent.prototype.createPopup = function () {
        var horizontalAlign = this.editor.direction === 'rtl' ? 'right' : 'left';
        var anchorPosition = { horizontal: horizontalAlign, vertical: 'bottom' };
        var popupPosition = { horizontal: horizontalAlign, vertical: 'top' };
        this.popupRef = this.popupService.open({
            anchor: this.element,
            anchorAlign: anchorPosition,
            animate: true,
            content: this.popupGridTemplate,
            popupAlign: popupPosition,
            popupClass: 'k-ct-popup k-group k-reset k-state-border-up',
            positionMode: 'absolute'
        });
        var popupWrapper = this.popupRef.popupElement;
        popupWrapper.style.width = popupWrapperWidth;
        popupWrapper.style.height = popupWrapperHeight;
        popupWrapper.setAttribute('dir', this.editor.direction);
    };
    EditorInsertTableButtonComponent.prototype.destroyPopup = function () {
        if (this.popupRef) {
            this.popupRef.close();
            this.popupRef = null;
        }
    };
    EditorInsertTableButtonComponent.prototype.getButton = function () {
        return (this.overflows ? this.overflowElement : this.element).nativeElement;
    };
    EditorInsertTableButtonComponent.decorators = [
        { type: core_1.Component, args: [{
                    // tslint:disable-next-line:no-forward-ref
                    providers: [{ provide: kendo_angular_toolbar_1.ToolBarToolComponent, useExisting: core_1.forwardRef(function () { return EditorInsertTableButtonComponent; }) }],
                    selector: 'kendo-editor-insert-table-button',
                    template: "\n        <ng-template #toolbarTemplate>\n            <button\n                type=\"button\"\n                kendoButton\n                #element\n                [attr.title]=\"title\"\n                [icon]=\"'table-insert'\"\n                [disabled]=\"disabled\"\n                (click)=\"toggle()\"\n                (blur)=\"onBlur()\"\n            ></button>\n        </ng-template>\n        <ng-template #popupTemplate>\n            <button kendoButton #overflowElement [attr.title]=\"title\" [icon]=\"'table-insert'\" [disabled]=\"disabled\" (click)=\"openDialog()\">\n                {{ title }}\n            </button>\n        </ng-template>\n        <ng-template #popupGridTemplate>\n            <kendo-popup-table-grid (cellClick)=\"onCellClick($event)\" (tableWizardClick)=\"onTableWizardClick()\"></kendo-popup-table-grid>\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    EditorInsertTableButtonComponent.ctorParameters = function () { return [
        { type: editor_component_1.EditorComponent, decorators: [{ type: core_1.Host }] },
        { type: editor_localization_service_1.EditorLocalizationService },
        { type: kendo_angular_popup_1.PopupService },
        { type: kendo_angular_dialog_1.DialogService }
    ]; };
    EditorInsertTableButtonComponent.propDecorators = {
        toolbarTemplate: [{ type: core_1.ViewChild, args: ['toolbarTemplate', { static: true },] }],
        popupTemplate: [{ type: core_1.ViewChild, args: ['popupTemplate', { static: true },] }],
        element: [{ type: core_1.ViewChild, args: ['element',] }],
        overflowElement: [{ type: core_1.ViewChild, args: ['overflowElement',] }],
        popupGridTemplate: [{ type: core_1.ViewChild, args: ['popupGridTemplate', { static: true },] }]
    };
    return EditorInsertTableButtonComponent;
}(kendo_angular_toolbar_1.ToolBarToolComponent));
exports.EditorInsertTableButtonComponent = EditorInsertTableButtonComponent;
