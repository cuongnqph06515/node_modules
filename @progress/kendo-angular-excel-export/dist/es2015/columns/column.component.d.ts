/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { GroupHeaderTemplateDirective } from './group-header-template.directive';
import { GroupHeaderColumnTemplateDirective } from './group-header-column-template.directive';
import { GroupFooterTemplateDirective } from './group-footer-template.directive';
import { FooterTemplateDirective } from './footer-template.directive';
import { ColumnBase } from './column-base';
import { CellOptions } from '../ooxml/cell-options.interface';
/**
 * Represents the columns of the Kendo UI Excel Export component for Angular.
 */
export declare class ColumnComponent extends ColumnBase {
    /**
     * The field to which the column is bound.
     */
    field: string;
    /**
     * The options of the column data cells
     * ([see example]({% slug cells_excelexport %}#toc-data-cells)).
     */
    cellOptions: CellOptions;
    /**
     * The options of the column group header cells
     * ([see example]({% slug cells_excelexport %}#toc-header-cells)).
     */
    groupHeaderCellOptions: CellOptions;
    /**
     * The options of the column group footer cells
     * ([see example]({% slug cells_excelexport %}#toc-group-footer-cells)).
     */
    groupFooterCellOptions: CellOptions;
    /**
     * The options of the column footer cell
     * ([see example]({% slug cells_excelexport %}#toc-footer-cells)).
     */
    footerCellOptions: CellOptions;
    /**
     * @hidden
     */
    groupHeaderTemplate: GroupHeaderTemplateDirective;
    /**
     * @hidden
     */
    groupHeaderColumnTemplate: GroupHeaderColumnTemplateDirective;
    /**
     * @hidden
     */
    groupFooterTemplate: GroupFooterTemplateDirective;
    /**
     * @hidden
     */
    footerTemplate: FooterTemplateDirective;
    constructor(parent?: ColumnBase);
}
