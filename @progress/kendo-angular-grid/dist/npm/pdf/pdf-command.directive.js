/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var kendo_angular_buttons_1 = require("@progress/kendo-angular-buttons");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var pdf_service_1 = require("./pdf.service");
/**
 * Represents the `export-to-PDF` command of the Grid.
 * You can apply this directive to any `button` element inside a
 * [`ToolbarTemplate`]({% slug api_grid_commandcolumncomponent %}).
 * When the user clicks a button that is associated with the directive, the
 * [`pdfExport`]({% slug api_grid_gridcomponent %}#toc-pdfexport) event
 * fires ([see example]({% slug pdfexport_grid %})).
 *
 * @example
 * ```html-no-run
 * <kendo-grid>
 *      <ng-template kendoGridToolbarTemplate>
 *          <button kendoGridPDFCommand>Export to PDF</button>
 *      </ng-template>
 *      <kendo-grid-pdf fileName="Grid.pdf">
 *      </kendo-grid-pdf>
 * </kendo-grid>
 * ```
 */
var PDFCommandDirective = /** @class */ (function (_super) {
    tslib_1.__extends(PDFCommandDirective, _super);
    function PDFCommandDirective(pdfService, element, renderer, localization, ngZone) {
        var _this = _super.call(this, element, renderer, null, localization, ngZone) || this;
        _this.pdfService = pdfService;
        _this.ngZone = ngZone;
        return _this;
    }
    /**
     * @hidden
     */
    PDFCommandDirective.prototype.onClick = function (e) {
        e.preventDefault();
        this.pdfService.exportClick.emit();
    };
    Object.defineProperty(PDFCommandDirective.prototype, "pdfClass", {
        /**
         * @hidden
         */
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    PDFCommandDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[kendoGridPDFCommand]'
                },] },
    ];
    /** @nocollapse */
    PDFCommandDirective.ctorParameters = function () { return [
        { type: pdf_service_1.PDFService },
        { type: core_1.ElementRef },
        { type: core_1.Renderer2 },
        { type: kendo_angular_l10n_1.LocalizationService },
        { type: core_1.NgZone }
    ]; };
    PDFCommandDirective.propDecorators = {
        onClick: [{ type: core_1.HostListener, args: ['click', ['$event'],] }],
        pdfClass: [{ type: core_1.HostBinding, args: ['class.k-grid-pdf',] }]
    };
    return PDFCommandDirective;
}(kendo_angular_buttons_1.Button));
exports.PDFCommandDirective = PDFCommandDirective;
