/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
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
const popupWrapperWidth = '190px';
const popupWrapperHeight = '164px'; // Set to '192px' when TableWizard button is added;
/**
 * A toolbar component which allows the user to create and insert a table in the Editor's content.
 *
 * @example
 * ```ts-no-run
 * <kendo-editor-insert-table-button></kendo-editor-insert-table-button>
 * ```
 */
export class EditorInsertTableButtonComponent extends ToolBarToolComponent {
    constructor(editor, localization, popupService, dialogService) {
        super();
        this.editor = editor;
        this.localization = localization;
        this.popupService = popupService;
        this.dialogService = dialogService;
        this.open = false;
        this.buttonBlurred = new EventEmitter();
        this.cellClicked = new EventEmitter();
        this.subs = this.editor.stateChange.subscribe(({ insertTable }) => {
            this.disabled = insertTable.disabled;
        });
        this.subs = this.buttonBlurred.pipe(concatMap(() => interval(200).pipe(take(1), takeUntil(this.cellClicked)))).subscribe(() => {
            this.toggle(false);
        });
    }
    ngAfterViewInit() {
        this.getButton().tabIndex = -1;
    }
    ngOnDestroy() {
        this.destroyPopup();
        this.subs.unsubscribe();
    }
    get outerWidth() {
        if (this.element) {
            return outerWidth(this.element.nativeElement);
        }
    }
    get title() {
        return this.localization.get('insertTable');
    }
    /**
     * @hidden
     */
    toggle(open) {
        this.open = open === undefined ? !this.open : open;
        this.destroyPopup();
        if (this.open) {
            this.createPopup();
        }
    }
    /**
     * @hidden
     */
    openDialog() {
        const dialogSettings = {
            appendTo: this.editor.dialogContainer,
            content: InsertTableDialogComponent
        };
        this.editor.toolbar.toggle(false);
        const dialogContent = this.dialogService.open(dialogSettings).content.instance;
        dialogContent.setData({
            editor: this.editor
        });
    }
    /**
     * @hidden
     */
    onBlur() {
        this.getButton().tabIndex = -1;
        this.buttonBlurred.emit();
    }
    /**
     * @hidden
     */
    onCellClick(args) {
        this.cellClicked.emit();
        this.toggle(false);
        this.editor.exec('insertTable', args);
    }
    /**
     * @hidden
     */
    canFocus() {
        return !this.disabled;
    }
    /**
     * @hidden
     */
    focus() {
        this.getButton().focus();
        this.getButton().tabIndex = 0;
    }
    /**
     * @hidden
     */
    handleKey(ev) {
        if (ev.keyCode === Keys.Space || ev.keyCode === Keys.Enter) {
            return true;
        }
        this.getButton().tabIndex = -1;
        return false;
    }
    /**
     * @hidden
     */
    onTableWizardClick() {
        // this.toggle(false);
        // this.editor.openDialog("tableWizard");
    }
    createPopup() {
        const horizontalAlign = this.editor.direction === 'rtl' ? 'right' : 'left';
        const anchorPosition = { horizontal: horizontalAlign, vertical: 'bottom' };
        const popupPosition = { horizontal: horizontalAlign, vertical: 'top' };
        this.popupRef = this.popupService.open({
            anchor: this.element,
            anchorAlign: anchorPosition,
            animate: true,
            content: this.popupGridTemplate,
            popupAlign: popupPosition,
            popupClass: 'k-ct-popup k-group k-reset k-state-border-up',
            positionMode: 'absolute'
        });
        const popupWrapper = this.popupRef.popupElement;
        popupWrapper.style.width = popupWrapperWidth;
        popupWrapper.style.height = popupWrapperHeight;
        popupWrapper.setAttribute('dir', this.editor.direction);
    }
    destroyPopup() {
        if (this.popupRef) {
            this.popupRef.close();
            this.popupRef = null;
        }
    }
    getButton() {
        return (this.overflows ? this.overflowElement : this.element).nativeElement;
    }
}
EditorInsertTableButtonComponent.decorators = [
    { type: Component, args: [{
                // tslint:disable-next-line:no-forward-ref
                providers: [{ provide: ToolBarToolComponent, useExisting: forwardRef(() => EditorInsertTableButtonComponent) }],
                selector: 'kendo-editor-insert-table-button',
                template: `
        <ng-template #toolbarTemplate>
            <button
                type="button"
                kendoButton
                #element
                [attr.title]="title"
                [icon]="'table-insert'"
                [disabled]="disabled"
                (click)="toggle()"
                (blur)="onBlur()"
            ></button>
        </ng-template>
        <ng-template #popupTemplate>
            <button kendoButton #overflowElement [attr.title]="title" [icon]="'table-insert'" [disabled]="disabled" (click)="openDialog()">
                {{ title }}
            </button>
        </ng-template>
        <ng-template #popupGridTemplate>
            <kendo-popup-table-grid (cellClick)="onCellClick($event)" (tableWizardClick)="onTableWizardClick()"></kendo-popup-table-grid>
        </ng-template>
    `
            },] },
];
/** @nocollapse */
EditorInsertTableButtonComponent.ctorParameters = () => [
    { type: EditorComponent, decorators: [{ type: Host }] },
    { type: EditorLocalizationService },
    { type: PopupService },
    { type: DialogService }
];
EditorInsertTableButtonComponent.propDecorators = {
    toolbarTemplate: [{ type: ViewChild, args: ['toolbarTemplate', { static: true },] }],
    popupTemplate: [{ type: ViewChild, args: ['popupTemplate', { static: true },] }],
    element: [{ type: ViewChild, args: ['element',] }],
    overflowElement: [{ type: ViewChild, args: ['overflowElement',] }],
    popupGridTemplate: [{ type: ViewChild, args: ['popupGridTemplate', { static: true },] }]
};
