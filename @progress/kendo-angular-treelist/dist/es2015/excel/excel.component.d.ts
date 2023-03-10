/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { OnDestroy, QueryList, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { ColumnBase, CellOptions } from '@progress/kendo-angular-excel-export';
import { TreeListComponent } from '../treelist.component';
import { ExcelService } from './excel.service';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { ViewCollection } from '../data/data.collection';
/**
 * The expected type of result for the treelist excel export fetchData function.
 */
export interface ExcelExportData {
    /**
     * The root data that should be exported.
     */
    data: any[] | Observable<any[]>;
    /**
     * A function that returns the children for an item.
     */
    fetchChildren: any;
    /**
     * A function that indicates if a particular item has children.
     */
    hasChildren: any;
}
/**
 * Configures the settings for the export of TreeList in Excel ([see example]({% slug excelexport_treelist %})).
 */
export declare class ExcelComponent implements OnDestroy {
    private excelService;
    private localization;
    private zone;
    /**
     * Specifies the file name of the exported Excel file.
     * @default "Export.xlsx"
     */
    fileName: string;
    /**
     * Enables or disables column filtering in the Excel file. This behavior is different from the filtering feature of the TreeList.
     */
    filterable: boolean;
    /**
     * The author of the workbook.
     */
    creator?: string;
    /**
     * The date on which the workbook was created. Defaults to `new Date()`.
     */
    date?: Date;
    /**
     * If set to `true`, the content is forwarded to `proxyURL` even if the browser supports the saving of files locally.
     */
    forceProxy: boolean;
    /**
     * The URL of the server-side proxy which streams the file to the end user.
     * You need to use a proxy if the browser is not capable of saving files locally&mdash;for example,
     * Internet Explorer 9 and Safari. The responsibility for implementing the server-side proxy is yours.
     *
     * In the request body, the proxy receives a POST request with the following parameters:
     * - `contentType`&mdash;The MIME type of the file.
     * - `base64`&mdash;The base-64 encoded file content.
     * - `fileName`&mdash;The file name, as requested by the caller.
     *
     * The proxy returns the decoded file with the `"Content-Disposition"` header set to `attachment; filename="<fileName.xslx>"`.
     */
    proxyURL: string;
    /**
     * The function that is used to get the exported data options. By default, uses the current data of the TreeList.
     * To export data that is different from the current TreeList data, provide a custom function.
     */
    fetchData: (component: TreeListComponent) => ExcelExportData;
    /**
     * Specifies if the item levels in the Excel file are collapsible.
     * > Applicable only if the treelist has footers.
     */
    collapsible: boolean;
    /**
     * Specifies if export should include all pages
     * @default true
     */
    allPages: boolean;
    /**
     * Specifies if the export should expand all items or should use the current TreeList state.
     * @default true
     */
    expandAll: boolean;
    /**
     * The options of the cells that are inserted before the data to indicate the hierarchy.
     */
    paddingCellOptions: CellOptions;
    /**
     * @hidden
     */
    columns: QueryList<ColumnBase>;
    private saveSubscription;
    private dataSubscription;
    constructor(excelService: ExcelService, localization: LocalizationService, zone: NgZone);
    ngOnDestroy(): void;
    protected save(component: TreeListComponent): void;
    protected exportData(component: any, result?: ExcelExportData): void;
    protected saveFile(options: any): void;
    protected componentView(component: any): ViewCollection;
}
