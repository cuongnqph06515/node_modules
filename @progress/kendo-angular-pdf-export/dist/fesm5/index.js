/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, TemplateRef, Optional, Component, Input, ElementRef, ContentChild, NgModule } from '@angular/core';
import { drawDOM, exportPDF } from '@progress/kendo-drawing';
import { saveAs } from '@progress/kendo-file-saver';

var PDFTemplateDirective = /** @class */ (function () {
    function PDFTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    PDFTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoPDFTemplate]'
                },] },
    ];
    /** @nocollapse */
    PDFTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef, decorators: [{ type: Optional }] }
    ]; };
    return PDFTemplateDirective;
}());

var FIELDS = ['bottom', 'left', 'right', 'top'];
/**
 * Represents the Kendo UI PDFMargin component for Angular.
 */
var PDFMarginComponent = /** @class */ (function () {
    function PDFMarginComponent() {
    }
    Object.defineProperty(PDFMarginComponent.prototype, "options", {
        /**
         * @hidden
         */
        get: function () {
            var options = {};
            for (var idx = 0; idx < FIELDS.length; idx++) {
                var field = FIELDS[idx];
                var value = this[field];
                if (typeof value !== 'undefined') {
                    options[field] = value;
                }
            }
            return options;
        },
        enumerable: true,
        configurable: true
    });
    PDFMarginComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-pdf-export-margin',
                    template: ""
                },] },
    ];
    PDFMarginComponent.propDecorators = {
        left: [{ type: Input }],
        top: [{ type: Input }],
        right: [{ type: Input }],
        bottom: [{ type: Input }]
    };
    return PDFMarginComponent;
}());

/**
 * @hidden
 */
var compileTemplate = function (templateRef) {
    var context = {};
    var embeddedView = templateRef.createEmbeddedView(context);
    var result = function (data) {
        Object.assign(context, data);
        embeddedView.detectChanges();
        var templateWrap = document.createElement('span');
        embeddedView.rootNodes.forEach(function (rootNode) {
            templateWrap.appendChild(rootNode.cloneNode(true));
        });
        return templateWrap;
    };
    result.destroy = function () {
        embeddedView.destroy();
        embeddedView = null;
    };
    return result;
};

/**
 * Represents the [Kendo UI PDF Export component for Angular]({% slug overview_pdfexport %}).
 *
 * @example
 * ```ts-preview
 * _@Component({
 *   selector: 'my-app',
 *   template: `
 *     <div class="example-config">
 *       <button class="k-button" (click)="pdf.saveAs('document.pdf')">
 *         Save As PDF...
 *       </button>
 *     </div>
 *
 *     <kendo-pdf-export #pdf paperSize="A4" margin="2cm">
 *       Content goes here
 *     </kendo-pdf-export>
 *   `
 * })
 * export class AppComponent {
 * }
 * ```
 */
var PDFExportComponent = /** @class */ (function () {
    function PDFExportComponent(element) {
        this.element = element;
        /**
         * The creator of the PDF document.
         * @default "Kendo UI PDF Generator"
         */
        this.creator = 'Kendo UI PDF Generator';
        /**
         * Specifies the name of the exported PDF file.
         * @default "Export.pdf"
         */
        this.fileName = 'export.pdf';
    }
    Object.defineProperty(PDFExportComponent.prototype, "drawMargin", {
        get: function () {
            var marginComponent = this.marginComponent;
            var margin = this.margin;
            if (marginComponent) {
                margin = Object.assign(margin || {}, marginComponent.options);
            }
            return margin;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Saves the content as a PDF file with the specified name.
     * @param fileName - The name of the exported file.
     */
    PDFExportComponent.prototype.saveAs = function (fileName) {
        if (fileName === void 0) { fileName = this.fileName; }
        this.save(this.element.nativeElement, fileName);
    };
    /**
     * Exports the content as a `Group` for further processing.
     *
     * @return - The root group of the exported scene.
     */
    PDFExportComponent.prototype.export = function () {
        return this.exportElement(this.element.nativeElement);
    };
    PDFExportComponent.prototype.save = function (element, fileName) {
        var _this = this;
        this.exportElement(element)
            .then(function (group) { return _this.exportGroup(group, _this.pdfOptions()); })
            .then(function (dataUri) { return _this.saveDataUri(dataUri, fileName, _this.saveOptions()); });
    };
    PDFExportComponent.prototype.exportElement = function (element) {
        var promise = this.drawElement(element, this.drawOptions());
        var cleanup = this.cleanup.bind(this);
        promise.then(cleanup, cleanup);
        return promise;
    };
    PDFExportComponent.prototype.cleanup = function () {
        if (this.pageTemplate) {
            this.pageTemplate.destroy();
            delete this.pageTemplate;
        }
    };
    PDFExportComponent.prototype.drawOptions = function () {
        if (this.pageTemplateDirective) {
            this.pageTemplate = compileTemplate(this.pageTemplateDirective.templateRef);
        }
        return {
            avoidLinks: this.avoidLinks,
            forcePageBreak: this.forcePageBreak,
            keepTogether: this.keepTogether,
            margin: this.drawMargin,
            paperSize: this.paperSize,
            landscape: this.landscape,
            repeatHeaders: this.repeatHeaders,
            scale: this.scale,
            template: this.pageTemplate
        };
    };
    PDFExportComponent.prototype.pdfOptions = function () {
        return {
            autoPrint: this.autoPrint,
            author: this.author,
            creator: this.creator,
            date: this.date,
            imgDPI: this.imageResolution,
            keywords: this.keywords,
            landscape: this.landscape,
            margin: this.drawMargin,
            multiPage: true,
            paperSize: this.paperSize,
            producer: this.producer,
            subject: this.subject,
            title: this.title
        };
    };
    PDFExportComponent.prototype.saveOptions = function () {
        return {
            forceProxy: this.forceProxy,
            proxyData: this.proxyData,
            proxyTarget: this.proxyTarget,
            proxyURL: this.proxyURL
        };
    };
    PDFExportComponent.prototype.drawElement = function (element, options) {
        return drawDOM(element, options);
    };
    PDFExportComponent.prototype.exportGroup = function (group, options) {
        return exportPDF(group, options);
    };
    PDFExportComponent.prototype.saveDataUri = function (dataUri, fileName, options) {
        saveAs(dataUri, fileName, options);
    };
    PDFExportComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-pdf-export',
                    template: "<div><ng-content></ng-content></div>"
                },] },
    ];
    /** @nocollapse */
    PDFExportComponent.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    PDFExportComponent.propDecorators = {
        autoPrint: [{ type: Input }],
        author: [{ type: Input }],
        avoidLinks: [{ type: Input }],
        forcePageBreak: [{ type: Input }],
        keepTogether: [{ type: Input }],
        creator: [{ type: Input }],
        date: [{ type: Input }],
        imageResolution: [{ type: Input }],
        fileName: [{ type: Input }],
        forceProxy: [{ type: Input }],
        keywords: [{ type: Input }],
        landscape: [{ type: Input }],
        margin: [{ type: Input }],
        paperSize: [{ type: Input }],
        repeatHeaders: [{ type: Input }],
        scale: [{ type: Input }],
        proxyData: [{ type: Input }],
        proxyURL: [{ type: Input }],
        proxyTarget: [{ type: Input }],
        producer: [{ type: Input }],
        subject: [{ type: Input }],
        title: [{ type: Input }],
        pageTemplateDirective: [{ type: ContentChild, args: [PDFTemplateDirective,] }],
        marginComponent: [{ type: ContentChild, args: [PDFMarginComponent,] }]
    };
    return PDFExportComponent;
}());

var COMPONENT_DIRECTIVES = [
    PDFExportComponent,
    PDFMarginComponent,
    PDFTemplateDirective
];
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }}) definition for the PDF Export directive.
 */
var PDFExportModule = /** @class */ (function () {
    function PDFExportModule() {
    }
    PDFExportModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [COMPONENT_DIRECTIVES],
                    exports: [COMPONENT_DIRECTIVES]
                },] },
    ];
    return PDFExportModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { PDFExportComponent, PDFExportModule, PDFMarginComponent, PDFTemplateDirective, compileTemplate };
