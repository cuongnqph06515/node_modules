/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { DoCheck } from '@angular/core';
import { EditService } from '../editing/edit.service';
import { ColumnBase } from '../columns/column-base';
import { FormGroup } from '@angular/forms';
/**
 * @hidden
 */
export declare class CellComponent implements DoCheck {
    private editService;
    readonly commandCellClass: boolean;
    column: any;
    columnIndex: number;
    isNew: boolean;
    level: number;
    hasChildren: boolean;
    isExpanded: boolean;
    loading: boolean;
    dataItem: any;
    viewItem: any;
    readonly formGroup: FormGroup;
    readonly isEdited: boolean;
    readonly templateContext: any;
    readonly editTemplateContext: any;
    readonly format: any;
    readonly isBoundColumn: boolean;
    readonly isSpanColumn: boolean;
    readonly childColumns: ColumnBase[];
    private cellContext;
    private _templateContext;
    private _editTemplateContext;
    private _viewItem;
    constructor(editService: EditService);
    ngDoCheck(): void;
    private updateTemplateContext;
}
