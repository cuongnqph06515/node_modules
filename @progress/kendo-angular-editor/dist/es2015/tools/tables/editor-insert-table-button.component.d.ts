/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { TemplateRef, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { ToolBarToolComponent } from '@progress/kendo-angular-toolbar';
import { PopupRef, PopupService } from '@progress/kendo-angular-popup';
import { EditorComponent } from '../../editor.component';
import { EditorLocalizationService } from '../../localization/editor-localization.service';
import { DialogService } from '@progress/kendo-angular-dialog';
/**
 * A toolbar component which allows the user to create and insert a table in the Editor's content.
 *
 * @example
 * ```ts-no-run
 * <kendo-editor-insert-table-button></kendo-editor-insert-table-button>
 * ```
 */
export declare class EditorInsertTableButtonComponent extends ToolBarToolComponent implements AfterViewInit, OnDestroy {
    private editor;
    private localization;
    private popupService;
    private dialogService;
    toolbarTemplate: TemplateRef<any>;
    popupTemplate: TemplateRef<any>;
    element: ElementRef;
    overflowElement: ElementRef;
    popupGridTemplate: TemplateRef<any>;
    /**
     * @hidden
     */
    popupRef: PopupRef;
    /**
     * @hidden
     */
    disabled: boolean;
    private open;
    private buttonBlurred;
    private cellClicked;
    private subs;
    constructor(editor: EditorComponent, localization: EditorLocalizationService, popupService: PopupService, dialogService: DialogService);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    readonly outerWidth: number;
    readonly title: string;
    /**
     * @hidden
     */
    toggle(open?: boolean): void;
    /**
     * @hidden
     */
    openDialog(): void;
    /**
     * @hidden
     */
    onBlur(): void;
    /**
     * @hidden
     */
    onCellClick(args: {
        rows: number;
        cells: number;
    }): void;
    /**
     * @hidden
     */
    canFocus(): boolean;
    /**
     * @hidden
     */
    focus(): void;
    /**
     * @hidden
     */
    handleKey(ev: any): boolean;
    /**
     * @hidden
     */
    onTableWizardClick(): void;
    private createPopup;
    private destroyPopup;
    private getButton;
}
