/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var kendo_angular_pdf_export_1 = require("@progress/kendo-angular-pdf-export");
/**
 * Represents the PDF page template of the Grid that helps to customize the PDF pages. To define a page template,
 * nest an `<ng-template>` tag with the `kendoGridPDFTemplate` directive inside `<kendo-grid-pdf>`.
 *
 * The template context provides the following fields:
 * - `pageNumber`&mdash;Defines PDF page number.
 * - `totalPages`&mdash;Defines the total number of PDF pages.
 *
 * @example
 * ```ts-preview
 *
 * _@Component({
 *     selector: 'my-app',
 *     template: `
 *         <kendo-grid [data]="gridData">
 *             <ng-template kendoGridToolbarTemplate>
 *                 <button kendoGridPDFCommand icon="file-pdf">Export to PDF</button>
 *             </ng-template>
 *             <kendo-grid-column field="ProductName">
 *             </kendo-grid-column>
 *              <kendo-grid-column field="UnitPrice">
 *             </kendo-grid-column>
 *             <kendo-grid-pdf fileName="Products.pdf" paperSize="A4" [margin]="{ top: '1cm', left: '1cm', right: '1cm', bottom: '1cm' }">
 *                 <ng-template kendoGridPDFTemplate let-pageNum="pageNum" let-totalPages="totalPages">
 *                     <div style="position: absolute;top: 5px; left: 5px;">
 *                         Page {{ pageNum }} of {{ totalPages }}
 *                     </div>
 *                 </ng-template>
 *             </kendo-grid-pdf>
 *         </kendo-grid>
 *     `
 * })
 *
 * class AppComponent {
 *     public gridData = [{
 *         "ProductID": 1,
 *         "ProductName": "Chai",
 *         "UnitPrice": 18.0000
 *       }, {
 *         "ProductID": 2,
 *         "ProductName": "Chang",
 *         "UnitPrice": 19.0000
 *       }
 *     ];
 * }
 *
 * ```
 */
var PDFTemplateDirective = /** @class */ (function (_super) {
    tslib_1.__extends(PDFTemplateDirective, _super);
    function PDFTemplateDirective(templateRef) {
        return _super.call(this, templateRef) || this;
    }
    PDFTemplateDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[kendoGridPDFTemplate]'
                },] },
    ];
    /** @nocollapse */
    PDFTemplateDirective.ctorParameters = function () { return [
        { type: core_1.TemplateRef, decorators: [{ type: core_1.Optional }] }
    ]; };
    return PDFTemplateDirective;
}(kendo_angular_pdf_export_1.PDFTemplateDirective));
exports.PDFTemplateDirective = PDFTemplateDirective;
