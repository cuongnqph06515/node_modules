/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var suspend_service_1 = require("../scrolling/suspend.service");
var pdf_service_1 = require("./pdf.service");
var pdf_margin_component_1 = require("./pdf-margin.component");
var pdf_template_directive_1 = require("./pdf-template.directive");
var export_element_1 = require("./export-element");
var treelist_query_1 = require("./treelist-query");
var column_base_1 = require("../columns/column-base");
var kendo_angular_pdf_export_1 = require("@progress/kendo-angular-pdf-export");
var createElement = function (tagName, className) {
    var element = document.createElement(tagName);
    if (className) {
        element.className = className;
    }
    return element;
};
var ɵ0 = createElement;
exports.ɵ0 = ɵ0;
var createDiv = function (className) {
    return createElement('div', className);
};
var ɵ1 = createDiv;
exports.ɵ1 = ɵ1;
/**
 * Configures the settings for the export of TreeList in PDF ([see example]({% slug pdfexport_treelist %})).
 */
var PDFComponent = /** @class */ (function (_super) {
    tslib_1.__extends(PDFComponent, _super);
    function PDFComponent(pdfService, suspendService, ngZone, element) {
        var _this = _super.call(this, element) || this;
        _this.pdfService = pdfService;
        _this.suspendService = suspendService;
        _this.ngZone = ngZone;
        _this.columns = new core_1.QueryList();
        _this.saveSubscription = pdfService.savePDF.subscribe(_this.savePDF.bind(_this));
        _this.drawSubscription = pdfService.drawPDF.subscribe(_this.drawPDF.bind(_this));
        _this.reset = _this.reset.bind(_this);
        _this.draw = _this.draw.bind(_this);
        return _this;
    }
    PDFComponent.prototype.ngOnDestroy = function () {
        this.saveSubscription.unsubscribe();
        this.drawSubscription.unsubscribe();
        this.reset();
    };
    PDFComponent.prototype.savePDF = function (component) {
        this.createPDF(component, this.draw);
    };
    PDFComponent.prototype.drawPDF = function (_a) {
        var _this = this;
        var component = _a.component, promise = _a.promise;
        this.createPDF(component, function () {
            _this.createExportGroup(promise);
        });
    };
    PDFComponent.prototype.createPDF = function (component, callback) {
        var pageSize = component.pageSize;
        var total = component.view.totalVisible;
        var columns = this.columns.toArray();
        if (columns.length) {
            this.originalColumns = component.columns.toArray();
        }
        this.component = component;
        this.suspendService.scroll = true;
        this.pdfService.exporting = true;
        this.initProgress();
        this.renderAllPages = this.allPages && pageSize < total;
        if (this.renderAllPages) {
            this.skip = component.skip;
            this.pageSize = pageSize;
            this.changePage(0, total, callback, columns);
        }
        else if (columns.length || component.virtualColumns) {
            this.changeColumns(columns, callback);
        }
        else {
            callback();
        }
    };
    PDFComponent.prototype.initProgress = function () {
        var wrapperElement = this.component.wrapper.nativeElement;
        var progress = this.progress = createDiv('k-loading-pdf-mask');
        var overlay = export_element_1.cloneNode(wrapperElement);
        progress.appendChild(overlay);
        progress.appendChild(createDiv('k-loading-color'));
        progress.appendChild(createElement('span', 'k-i-loading k-icon'));
        this.originalHeight = wrapperElement.style.height;
        this.originalOverflow = wrapperElement.style.overflow;
        wrapperElement.style.height = wrapperElement.offsetHeight + 'px';
        wrapperElement.style.overflow = 'hidden';
        wrapperElement.appendChild(progress);
        this.applyScroll(overlay);
    };
    PDFComponent.prototype.applyScroll = function (overlay) {
        var query = new treelist_query_1.TreeListQuery(this.component.wrapper.nativeElement);
        var content = query.content();
        if (content) {
            var overlayQuery = new treelist_query_1.TreeListQuery(overlay);
            var overlayContent = overlayQuery.content();
            overlayContent.scrollTop = content.scrollTop;
            overlayContent.scrollLeft = content.scrollLeft;
            overlayQuery.header().scrollLeft = query.header().scrollLeft;
            var footer = query.footer();
            if (footer) {
                overlayQuery.footer().scrollLeft = footer.scrollLeft;
            }
            var lockedContent = query.content(true);
            if (lockedContent) {
                var overlayLockedContent = overlayQuery.content(true);
                overlayLockedContent.scrollTop = lockedContent.scrollTop;
                overlayLockedContent.scrollLeft = lockedContent.scrollLeft;
            }
        }
    };
    PDFComponent.prototype.draw = function () {
        var _this = this;
        this.createExportElement(function (element) {
            _this.save(element, _this.fileName);
        });
    };
    PDFComponent.prototype.createExportGroup = function (promise) {
        var _this = this;
        this.createExportElement(function (element) {
            _this.exportElement(element).then(function (group) { return promise.resolve(group); });
        });
    };
    PDFComponent.prototype.createExportElement = function (callback) {
        var _this = this;
        this.ngZone.runOutsideAngular(function () {
            var container = _this.container = createDiv('k-grid-pdf-export-element');
            var element = export_element_1.exportElement(_this.component.wrapper.nativeElement);
            container.appendChild(element);
            document.body.appendChild(container);
            callback(element);
        });
    };
    PDFComponent.prototype.drawOptions = function () {
        var options = _super.prototype.drawOptions.call(this);
        options._destructive = true;
        return options;
    };
    PDFComponent.prototype.cleanup = function () {
        _super.prototype.cleanup.call(this);
        this.pdfService.exporting = false;
        if (this.component) {
            var originalColumns = this.originalColumns;
            delete this.originalColumns;
            if (this.renderAllPages) {
                this.changePage(this.skip, this.pageSize, this.reset, originalColumns);
            }
            else if (originalColumns || this.component.virtualColumns) {
                this.changeColumns(originalColumns, this.reset);
            }
            else {
                this.reset();
            }
        }
        else {
            this.reset();
        }
        this.removeContainer();
    };
    PDFComponent.prototype.removeContainer = function () {
        if (this.container) {
            document.body.removeChild(this.container);
            delete this.container;
        }
    };
    PDFComponent.prototype.changePage = function (skip, _take, callback, columns) {
        var _this = this;
        this.ngZone.run(function () {
            var onPageChanged = function () {
                if ((columns && columns.length) || _this.component.virtualColumns) {
                    _this.changeColumns(columns, callback);
                }
                else {
                    _this.onStable(callback);
                }
            };
            _this.component.notifyPageChange('pdf', { skip: skip, take: _take });
            if (_this.component.view.loading) {
                _this.component.vida.dataLoaded.pipe(operators_1.take(1)).subscribe(onPageChanged);
            }
            else {
                onPageChanged();
            }
        });
    };
    PDFComponent.prototype.changeColumns = function (columns, callback) {
        var _this = this;
        this.ngZone.run(function () {
            _this.onStable(callback);
            if (columns && columns.length) {
                _this.component.columns.reset(columns);
            }
        });
    };
    PDFComponent.prototype.reset = function () {
        this.suspendService.scroll = false;
        this.renderAllPages = false;
        if (!this.component) {
            return;
        }
        var wrapperElement = this.component.wrapper.nativeElement;
        wrapperElement.removeChild(this.progress);
        wrapperElement.style.height = this.originalHeight;
        wrapperElement.style.overflow = this.originalOverflow;
        delete this.progress;
        delete this.component;
    };
    PDFComponent.prototype.onStable = function (callback) {
        this.ngZone.onStable.asObservable().pipe(operators_1.take(1)).subscribe(callback);
    };
    PDFComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'kendo-treelist-pdf',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    PDFComponent.ctorParameters = function () { return [
        { type: pdf_service_1.PDFService },
        { type: suspend_service_1.SuspendService },
        { type: core_1.NgZone },
        { type: core_1.ElementRef }
    ]; };
    PDFComponent.propDecorators = {
        allPages: [{ type: core_1.Input }],
        columns: [{ type: core_1.ContentChildren, args: [column_base_1.ColumnBase,] }],
        marginComponent: [{ type: core_1.ContentChild, args: [pdf_margin_component_1.PDFMarginComponent,] }],
        pageTemplateDirective: [{ type: core_1.ContentChild, args: [pdf_template_directive_1.PDFTemplateDirective,] }]
    };
    return PDFComponent;
}(kendo_angular_pdf_export_1.PDFExportComponent));
exports.PDFComponent = PDFComponent;
