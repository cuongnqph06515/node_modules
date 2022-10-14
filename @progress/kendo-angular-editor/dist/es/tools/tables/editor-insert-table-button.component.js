/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { Component, TemplateRef, ViewChild, ElementRef, forwardRef, Host, EventEmitter } from '@angular/core';
import { interval } from 'rxjs';
import { concatMap, take, takeUntil } from 'rxjs/operators';
import { ToolBarToolComponent } from '@progress/kendo-angular-toolbar';
import { PopupService } from '@progress/kendo-angular-popup';
import { outerWidth } from '../../util';
import { EditorComponent } from '../../editor.component';
import { EditorLocalizationService } from '../../localization/editor-localization.service';
import { DialogService } from '@progress/kendo-angular-dialog';
import { InsertTableDialogComponent } from '../../dialogs/insert-table-dialog.component';
import { Keys } from '@progress/kendo-angular-common';
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
        _this.buttonBlurred = new EventEmitter();
        _this.cellClicked = new EventEmitter();
        _this.subs = _this.editor.stateChange.subscribe(function (_a) {
            var insertTable = _a.insertTable;
            _this.disabled = insertTable.disabled;
        });
        _this.subs = _this.buttonBlurred.pipe(concatMap(function () { return interval(200).pipe(take(1), takeUntil(_this.cellClicked)); })).subscribe(function () {
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
                return outerWidth(this.element.nativeElement);
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
            content: InsertTableDialogComponent
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
        if (ev.keyCode === Keys.Space || ev.keyCode === Keys.Enter) {
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
        { type: Component, args: [{
                    // tslint:disable-next-line:no-forward-ref
                    providers: [{ provide: ToolBarToolComponent, useExisting: forwardRef(function () { return EditorInsertTableButtonComponent; }) }],
                    selector: 'kendo-editor-insert-table-button',
                    template: "\n        <ng-template #toolbarTemplate>\n            <button\n                type=\"button\"\n                kendoButton\n                #element\n                [attr.title]=\"title\"\n                [icon]=\"'table-insert'\"\n                [disabled]=\"disabled\"\n                (click)=\"toggle()\"\n                (blur)=\"onBlur()\"\n            ></button>\n        </ng-template>\n        <ng-template #popupTemplate>\n            <button kendoButton #overflowElement [attr.title]=\"title\" [icon]=\"'table-insert'\" [disabled]=\"disabled\" (click)=\"openDialog()\">\n                {{ title }}\n            </button>\n        </ng-template>\n        <ng-template #popupGridTemplate>\n            <kendo-popup-table-grid (cellClick)=\"onCellClick($event)\" (tableWizardClick)=\"onTableWizardClick()\"></kendo-popup-table-grid>\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    EditorInsertTableButtonComponent.ctorParameters = function () { return [
        { type: EditorComponent, decorators: [{ type: Host }] },
        { type: EditorLocalizationService },
        { type: PopupService },
        { type: DialogService }
    ]; };
    EditorInsertTableButtonComponent.propDecorators = {
        toolbarTemplate: [{ type: ViewChild, args: ['toolbarTemplate', { static: true },] }],
        popupTemplate: [{ type: ViewChild, args: ['popupTemplate', { static: true },] }],
        element: [{ type: ViewChild, args: ['element',] }],
        overflowElement: [{ type: ViewChild, args: ['overflowElement',] }],
        popupGridTemplate: [{ type: ViewChild, args: ['popupGridTemplate', { static: true },] }]
    };
    return EditorInsertTableButtonComponent;
}(ToolBarToolComponent));
export { EditorInsertTableButtonComponent };
