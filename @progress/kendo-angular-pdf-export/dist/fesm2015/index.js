/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, TemplateRef, Optional, Component, Input, ElementRef, ContentChild, NgModule } from '@angular/core';
import { drawDOM, exportPDF } from '@progress/kendo-drawing';
import { saveAs } from '@progress/kendo-file-saver';

class PDFTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
PDFTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoPDFTemplate]'
            },] },
];
/** @nocollapse */
PDFTemplateDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] }
];

const FIELDS = ['bottom', 'left', 'right', 'top'];
/**
 * Represents the Kendo UI PDFMargin component for Angular.
 */
class PDFMarginComponent {
    /**
     * @hidden
     */
    get options() {
        const options = {};
        for (let idx = 0; idx < FIELDS.length; idx++) {
            const field = FIELDS[idx];
            const value = this[field];
            if (typeof value !== 'undefined') {
                options[field] = value;
            }
        }
        return options;
    }
}
PDFMarginComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-pdf-export-margin',
                template: ``
            },] },
];
PDFMarginComponent.propDecorators = {
    left: [{ type: Input }],
    top: [{ type: Input }],
    right: [{ type: Input }],
    bottom: [{ type: Input }]
};

/**
 * @hidden
 */
const compileTemplate = (templateRef) => {
    const context = {};
    let embeddedView = templateRef.createEmbeddedView(context);
    const result = (data) => {
        Object.assign(context, data);
        embeddedView.detectChanges();
        const templateWrap = document.createElement('span');
        embeddedView.rootNodes.forEach((rootNode) => {
            templateWrap.appendChild(rootNode.cloneNode(true));
        });
        return templateWrap;
    };
    result.destroy = () => {
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
class PDFExportComponent {
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

const COMPONENT_DIRECTIVES = [
    PDFExportComponent,
    PDFMarginComponent,
    PDFTemplateDirective
];
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }}) definition for the PDF Export directive.
 */
class PDFExportModule {
}
PDFExportModule.decorators = [
    { type: NgModule, args: [{
                declarations: [COMPONENT_DIRECTIVES],
                exports: [COMPONENT_DIRECTIVES]
            },] },
];

/**
 * Generated bundle index. Do not edit.
 */

export { PDFExportComponent, PDFExportModule, PDFMarginComponent, PDFTemplateDirective, compileTemplate };
