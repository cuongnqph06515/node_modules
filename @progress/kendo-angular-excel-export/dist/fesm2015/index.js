/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { __decorate, __metadata, __param } from 'tslib';
import { Input, ContentChildren, QueryList, Component, NgZone, Directive, Optional, TemplateRef, ContentChild, forwardRef, SkipSelf, Host, NgModule } from '@angular/core';
import { saveAs } from '@progress/kendo-file-saver';
import { IntlService, ExcelExporter, Workbook } from '@progress/kendo-ooxml';
export * from '@progress/kendo-ooxml';
import { toString } from '@telerik/kendo-intl';
import { LocalizationService, L10N_PREFIX } from '@progress/kendo-angular-l10n';
import { validatePackage } from '@progress/kendo-licensing';

/* tslint:disable align */
/* tslint:disable:no-use-before-declare */
const compileTemplate = (templateRef, context, updateContext) => {
    let embeddedView = templateRef.createEmbeddedView(context);
    const result = (data) => {
        updateContext(context, data);
        embeddedView.detectChanges();
        return embeddedView.rootNodes.reduce((content, rootNode) => {
            return content + rootNode.textContent;
        }, '').trim();
    };
    result.destroy = () => {
        embeddedView.destroy();
        embeddedView = null;
    };
    return result;
};
const updateGroupHeaderContext = (context, data) => {
    context.$implicit = context.group = data;
    context.field = data.field;
    context.value = data.value;
    context.aggregates = data.aggregates;
};
const updateGroupFooterContext = (context, data) => {
    context.group = data.group;
    context.$implicit = context.aggregates = data;
};
const updateFooterContext = (context, data) => {
    context.aggregates = data.aggregates;
};
/**
 * @hidden
 */
const toExporterColumns = (sourceColumns) => {
    const exporterColumns = [];
    let columnIndex = 0;
    const addColumns = (columns, result, level) => {
        columns.forEach((column) => {
            if (column.level === level) {
                const exporterColumn = new ExporterColumn(column, columnIndex);
                result.push(exporterColumn);
                if (column.children && column.children.some(c => c !== column)) {
                    const children = exporterColumn.columns = [];
                    addColumns(column.children, children, level + 1);
                }
                else {
                    columnIndex++;
                }
            }
        });
    };
    addColumns(sourceColumns, exporterColumns, 0);
    return exporterColumns;
};
/**
 * @hidden
 */
const destroyColumns = (columns) => {
    if (columns) {
        columns.forEach(column => {
            column.destroy();
        });
    }
};
/**
 * @hidden
 */
class ExporterColumn {
    constructor(column, columnIndex) {
        this.title = column.title;
        this.field = column.field;
        this.hidden = column.hidden;
        this.locked = column.locked;
        this.width = column.width;
        this.headerCellOptions = column.headerCellOptions;
        this.cellOptions = column.cellOptions;
        this.groupHeaderCellOptions = column.groupHeaderCellOptions;
        this.groupFooterCellOptions = column.groupFooterCellOptions;
        this.footerCellOptions = column.footerCellOptions;
        if (column.footerTemplate) {
            this.footerTemplate = compileTemplate(column.footerTemplate.templateRef, {
                $implicit: column,
                column: column,
                columnIndex: columnIndex
            }, updateFooterContext);
        }
        if (column.groupFooterTemplate) {
            this.groupFooterTemplate = compileTemplate(column.groupFooterTemplate.templateRef, {
                column: column,
                field: column.field
            }, updateGroupFooterContext);
        }
        if (column.groupHeaderTemplate) {
            this.groupHeaderTemplate = compileTemplate(column.groupHeaderTemplate.templateRef, {}, updateGroupHeaderContext);
        }
        if (column.groupHeaderColumnTemplate) {
            this.groupHeaderColumnTemplate = compileTemplate(column.groupHeaderColumnTemplate.templateRef, {}, updateGroupHeaderContext);
        }
    }
    destroy() {
        if (this.footerTemplate) {
            this.footerTemplate.destroy();
        }
        if (this.groupFooterTemplate) {
            this.groupFooterTemplate.destroy();
        }
        if (this.groupHeaderTemplate) {
            this.groupHeaderTemplate.destroy();
        }
        if (this.groupHeaderColumnTemplate) {
            this.groupHeaderColumnTemplate.destroy();
        }
        destroyColumns(this.columns);
    }
}

IntlService.register({ toString });
/**
 *
 * @hidden
 */
const workbookOptions = (options) => {
    const columns = toExporterColumns(options.columns);
    const exporter = new ExcelExporter({
        columns: columns,
        data: options.data,
        filterable: options.filterable,
        groups: options.group,
        paddingCellOptions: options.paddingCellOptions,
        headerPaddingCellOptions: options.headerPaddingCellOptions,
        collapsible: options.collapsible,
        hierarchy: options.hierarchy,
        aggregates: options.aggregates
    });
    const result = exporter.workbook();
    result.creator = options.creator;
    result.date = options.date;
    result.rtl = options.rtl;
    destroyColumns(columns);
    return result;
};
/**
 * @hidden
 */
const toDataURL = (options) => {
    const workbook = new Workbook(options);
    return workbook.toDataURL();
};
/**
 * @hidden
 */
const isWorkbookOptions = (value) => {
    return value && value.sheets;
};

/**
 * @hidden
 */
class ColumnBase {
    constructor(parent) {
        this.parent = parent;
    }
    /**
     * @hidden
     */
    get level() {
        return this.parent ? this.parent.level + 1 : 0;
    }
}
__decorate([
    Input(),
    __metadata("design:type", String)
], ColumnBase.prototype, "title", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], ColumnBase.prototype, "width", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], ColumnBase.prototype, "locked", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], ColumnBase.prototype, "hidden", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ColumnBase.prototype, "headerCellOptions", void 0);
__decorate([
    ContentChildren(ColumnBase),
    __metadata("design:type", QueryList)
], ColumnBase.prototype, "children", void 0);

/**
 * @hidden
 */
const packageMetadata = {
    name: '@progress/kendo-angular-excel-export',
    productName: 'Kendo UI for Angular',
    productCodes: ['KENDOUIANGULAR', 'KENDOUICOMPLETE'],
    publishDate: 1619693987,
    version: '',
    licensingDocsUrl: 'https://www.telerik.com/kendo-angular-ui/my-license/?utm_medium=product&utm_source=kendoangular&utm_campaign=kendo-ui-angular-purchase-license-keys-warning'
};

/**
 * Represents the [Kendo UI Excel Export component for Angular]({% slug overview_excelexport %}).
 * Configures the settings for the Excel export of the Kendo UI Grid.
 */
let ExcelExportComponent = class ExcelExportComponent {
    constructor(localization, zone) {
        this.localization = localization;
        this.zone = zone;
        /**
         * Specifies the name of the file that is exported to Excel.
         * @default "Export.xlsx"
         */
        this.fileName = 'Export.xlsx';
        /**
         * @hidden
         */
        this.columns = new QueryList();
        validatePackage(packageMetadata);
        this.saveFile = this.saveFile.bind(this);
    }
    /**
     * Saves the data to Excel.
     *
     * @param exportData - An optional parameter. Can be the data that will be exported or [`WorkbookOptions`]({% slug api_excel-export_workbookoptions %}).
     */
    save(exportData) {
        this.toDataURL(exportData).then(this.saveFile);
    }
    /**
     * Based on the specified columns and data, returns
     * [`WorkbookOptions`]({% slug api_excel-export_workbookoptions %})
     * ([see example]({% slug customrowsandcells_excelexport %})).
     *
     * @param exportData - The optional data to be exported.
     * @returns {WorkbookOptions} - The workbook options.
     */
    workbookOptions(exportData) {
        const currentData = this.getExportData(exportData);
        const options = workbookOptions({
            columns: this.columns,
            data: currentData.data,
            group: currentData.group,
            filterable: this.filterable,
            creator: this.creator,
            date: this.date,
            rtl: this.localization.rtl,
            paddingCellOptions: this.paddingCellOptions,
            headerPaddingCellOptions: this.headerPaddingCellOptions,
            collapsible: this.collapsible
        });
        return options;
    }
    /**
     * Returns a promise which will be resolved with the file data URI
     * ([see example]({% slug filesaving_excelexport %})).
     *
     * @param exportData - The optional data or [`WorkbookOptions`]({% slug api_excel-export_workbookoptions %}) that will be used to generate the data URI.
     * @returns {Promise<string>} - The promise that will be resolved by the file data URI.
     */
    toDataURL(exportData) {
        const options = isWorkbookOptions(exportData) ?
            exportData :
            this.workbookOptions(exportData);
        return this.zone.runOutsideAngular(() => toDataURL(options));
    }
    getExportData(exportData) {
        let result;
        if (exportData) {
            if (Array.isArray(exportData)) {
                result = {
                    data: exportData
                };
            }
            else {
                result = exportData;
            }
        }
        else {
            result = {
                data: this.data,
                group: this.group
            };
        }
        return result;
    }
    saveFile(dataURL) {
        saveAs(dataURL, this.fileName, {
            forceProxy: this.forceProxy,
            proxyURL: this.proxyURL
        });
    }
};
__decorate([
    Input(),
    __metadata("design:type", String)
], ExcelExportComponent.prototype, "fileName", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], ExcelExportComponent.prototype, "filterable", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], ExcelExportComponent.prototype, "collapsible", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], ExcelExportComponent.prototype, "creator", void 0);
__decorate([
    Input(),
    __metadata("design:type", Date)
], ExcelExportComponent.prototype, "date", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], ExcelExportComponent.prototype, "forceProxy", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], ExcelExportComponent.prototype, "proxyURL", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], ExcelExportComponent.prototype, "data", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], ExcelExportComponent.prototype, "group", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ExcelExportComponent.prototype, "paddingCellOptions", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ExcelExportComponent.prototype, "headerPaddingCellOptions", void 0);
__decorate([
    ContentChildren(ColumnBase, { descendants: true }),
    __metadata("design:type", QueryList)
], ExcelExportComponent.prototype, "columns", void 0);
ExcelExportComponent = __decorate([
    Component({
        exportAs: 'kendoExcelExport',
        selector: 'kendo-excelexport',
        providers: [
            LocalizationService,
            {
                provide: L10N_PREFIX,
                useValue: 'kendo.excelexport'
            }
        ],
        template: ``
    }),
    __metadata("design:paramtypes", [LocalizationService, NgZone])
], ExcelExportComponent);

/**
 * Represents the group header cell template of the Excel Export column component
 * ([see example]({% slug columns_excel-export %}#toc-group-header-template)).
 * Enables you to customize the content of the group header item.
 */
let GroupHeaderTemplateDirective = class GroupHeaderTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
};
GroupHeaderTemplateDirective = __decorate([
    Directive({
        selector: '[kendoExcelExportGroupHeaderTemplate]'
    }),
    __param(0, Optional()),
    __metadata("design:paramtypes", [TemplateRef])
], GroupHeaderTemplateDirective);

/**
 * Represents the group header column template of the Excel Export column component
 * ([see example]({% slug columns_excel-export %}#toc-group-header-column-template)).
 */
let GroupHeaderColumnTemplateDirective = class GroupHeaderColumnTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
};
GroupHeaderColumnTemplateDirective = __decorate([
    Directive({
        selector: '[kendoExcelExportGroupHeaderColumnTemplate]'
    }),
    __param(0, Optional()),
    __metadata("design:paramtypes", [TemplateRef])
], GroupHeaderColumnTemplateDirective);

/**
 * Represents the group footer cell template of the Excel Export column component
 * ([see example]({% slug columns_excel-export %}#toc-group-footer-template)).
 * Enables you to customize the group footer cell of the column.
 */
let GroupFooterTemplateDirective = class GroupFooterTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
};
GroupFooterTemplateDirective = __decorate([
    Directive({
        selector: '[kendoExcelExportGroupFooterTemplate]'
    }),
    __param(0, Optional()),
    __metadata("design:paramtypes", [TemplateRef])
], GroupFooterTemplateDirective);

/**
 * Represents the footer cell template of the Excel Export column component
 * ([see example]({% slug columns_excel-export %}#toc-footer-template)).
 * Enables you to customize the footer cell of the column.
 */
let FooterTemplateDirective = class FooterTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
};
FooterTemplateDirective = __decorate([
    Directive({
        selector: '[kendoExcelExportFooterTemplate]'
    }),
    __param(0, Optional()),
    __metadata("design:paramtypes", [TemplateRef])
], FooterTemplateDirective);

var ColumnComponent_1;
/**
 * Represents the columns of the Kendo UI Excel Export component for Angular.
 */
let ColumnComponent = ColumnComponent_1 = class ColumnComponent extends ColumnBase {
    constructor(parent) {
        super(parent);
    }
};
__decorate([
    Input(),
    __metadata("design:type", String)
], ColumnComponent.prototype, "field", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ColumnComponent.prototype, "cellOptions", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ColumnComponent.prototype, "groupHeaderCellOptions", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ColumnComponent.prototype, "groupFooterCellOptions", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ColumnComponent.prototype, "footerCellOptions", void 0);
__decorate([
    ContentChild(GroupHeaderTemplateDirective, { static: false }),
    __metadata("design:type", GroupHeaderTemplateDirective)
], ColumnComponent.prototype, "groupHeaderTemplate", void 0);
__decorate([
    ContentChild(GroupHeaderColumnTemplateDirective, { static: false }),
    __metadata("design:type", GroupHeaderColumnTemplateDirective)
], ColumnComponent.prototype, "groupHeaderColumnTemplate", void 0);
__decorate([
    ContentChild(GroupFooterTemplateDirective, { static: false }),
    __metadata("design:type", GroupFooterTemplateDirective)
], ColumnComponent.prototype, "groupFooterTemplate", void 0);
__decorate([
    ContentChild(FooterTemplateDirective, { static: false }),
    __metadata("design:type", FooterTemplateDirective)
], ColumnComponent.prototype, "footerTemplate", void 0);
ColumnComponent = ColumnComponent_1 = __decorate([
    Component({
        providers: [
            {
                provide: ColumnBase,
                useExisting: forwardRef(() => ColumnComponent_1) // tslint:disable-line:no-forward-ref
            }
        ],
        selector: 'kendo-excelexport-column',
        template: ``
    }),
    __param(0, SkipSelf()), __param(0, Host()), __param(0, Optional()),
    __metadata("design:paramtypes", [ColumnBase])
], ColumnComponent);

var ColumnGroupComponent_1;
/**
 * Represents the column group component of the Kendo UI Excel Export component.
 */
let ColumnGroupComponent = ColumnGroupComponent_1 = class ColumnGroupComponent extends ColumnBase {
    constructor(parent) {
        super(parent);
        this.parent = parent;
    }
};
ColumnGroupComponent = ColumnGroupComponent_1 = __decorate([
    Component({
        providers: [
            {
                provide: ColumnBase,
                useExisting: forwardRef(() => ColumnGroupComponent_1) // tslint:disable-line:no-forward-ref
            }
        ],
        selector: 'kendo-excelexport-column-group',
        template: ``
    }),
    __param(0, SkipSelf()), __param(0, Host()), __param(0, Optional()),
    __metadata("design:paramtypes", [ColumnBase])
], ColumnGroupComponent);

const declarations = [
    ExcelExportComponent,
    ColumnComponent,
    ColumnGroupComponent,
    FooterTemplateDirective,
    GroupFooterTemplateDirective,
    GroupHeaderTemplateDirective,
    GroupHeaderColumnTemplateDirective
];
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the Excel Export component.
 *
 * @example
 *
 * ```ts-no-run
 * // Import the ExcelExportModule module
 * import { ExcelExportModule } from '@progress/kendo-angular-excel-export';
 *
 * // The browser platform with a compiler
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 *
 * import { NgModule } from '@angular/core';
 *
 * // Import the app component
 * import { AppComponent } from './app.component';
 *
 * // Define the app module
 * _@NgModule({
 *     declarations: [AppComponent], // declare app component
 *     imports:      [BrowserModule, ExcelExportModule], // import ExcelExportModule module
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 *
 * ```
 */
let ExcelExportModule = class ExcelExportModule {
};
ExcelExportModule = __decorate([
    NgModule({
        declarations: [declarations],
        exports: [declarations]
    })
], ExcelExportModule);

/**
 * Generated bundle index. Do not edit.
 */

export { GroupHeaderColumnTemplateDirective, ExcelExportComponent, ExcelExportModule, ColumnBase, ColumnComponent, ColumnGroupComponent, FooterTemplateDirective, GroupFooterTemplateDirective, GroupHeaderTemplateDirective, workbookOptions, toDataURL, isWorkbookOptions };
