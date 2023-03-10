/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, ContentChild, ElementRef, Input } from '@angular/core';
import { drawDOM, exportPDF } from '@progress/kendo-drawing';
import { saveAs } from '@progress/kendo-file-saver';
import { PDFTemplateDirective } from './pdf-template.directive';
import { PDFMarginComponent } from './pdf-margin.component';
import { compileTemplate } from './compile-template';
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
export class PDFExportComponent {
    constructor(element) {
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
    get drawMargin() {
        const marginComponent = this.marginComponent;
        let margin = this.margin;
        if (marginComponent) {
            margin = Object.assign(margin || {}, marginComponent.options);
        }
        return margin;
    }
    /**
     * Saves the content as a PDF file with the specified name.
     * @param fileName - The name of the exported file.
     */
    saveAs(fileName = this.fileName) {
        this.save(this.element.nativeElement, fileName);
    }
    /**
     * Exports the content as a `Group` for further processing.
     *
     * @return - The root group of the exported scene.
     */
    export() {
        return this.exportElement(this.element.nativeElement);
    }
    save(element, fileName) {
        this.exportElement(element)
            .then(group => this.exportGroup(group, this.pdfOptions()))
            .then(dataUri => this.saveDataUri(dataUri, fileName, this.saveOptions()));
    }
    exportElement(element) {
        const promise = this.drawElement(element, this.drawOptions());
        const cleanup = this.cleanup.bind(this);
        promise.then(cleanup, cleanup);
        return promise;
    }
    cleanup() {
        if (this.pageTemplate) {
            this.pageTemplate.destroy();
            delete this.pageTemplate;
        }
    }
    drawOptions() {
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
    }
    pdfOptions() {
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
    }
    saveOptions() {
        return {
            forceProxy: this.forceProxy,
            proxyData: this.proxyData,
            proxyTarget: this.proxyTarget,
            proxyURL: this.proxyURL
        };
    }
    drawElement(element, options) {
        return drawDOM(element, options);
    }
    exportGroup(group, options) {
        return exportPDF(group, options);
    }
    saveDataUri(dataUri, fileName, options) {
        saveAs(dataUri, fileName, options);
    }
}
PDFExportComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-pdf-export',
                template: `<div><ng-content></ng-content></div>`
            },] },
];
/** @nocollapse */
PDFExportComponent.ctorParameters = () => [
    { type: ElementRef }
];
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
