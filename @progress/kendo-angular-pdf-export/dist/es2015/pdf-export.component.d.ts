/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ElementRef } from '@angular/core';
import { pdf, DrawOptions, Group } from '@progress/kendo-drawing';
import { SaveOptions } from '@progress/kendo-file-saver';
import { PDFTemplateDirective } from './pdf-template.directive';
import { PDFMarginComponent } from './pdf-margin.component';
/**
 * @hidden
 *
 * Re-export PaperSize to work around a bug in the the API reference generator.
 *
 * The type will be linked to the kendo-drawing documentation
 * by using the slug provided in api-type-links.json
 */
export declare type PaperSize = pdf.PaperSize;
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
export declare class PDFExportComponent implements pdf.PDFOptions {
    protected element: ElementRef;
    /**
     * Specifies if the Print dialog should be opened immediately after loading the document.
     *
     * The default value is `false`.
     *
     * > Requires `@progress/kendo-drawing` v1.9.0 or later.
     */
    autoPrint?: boolean;
    /**
     * The author (metadata) of the PDF document.
     */
    author: string;
    /**
     * A flag that indicates whether to produce actual hyperlinks in the exported PDF file.
     * It is also possible to set a CSS selector. All matching links will be ignored.
     */
    avoidLinks: boolean | string;
    /**
     * An optional CSS selector that specifies the elements which cause the page breaks
     * ([see example]({% slug multipagecontent_pdfexport %}#toc-manual-page-breaking)).
     */
    forcePageBreak: string;
    /**
     * An optional CSS selector that specifies the elements which should not be split across the pages
     * ([see example]({% slug multipagecontent_pdfexport %}#toc-preventing-page-breaking-in-elements)).
     */
    keepTogether: string;
    /**
     * The creator of the PDF document.
     * @default "Kendo UI PDF Generator"
     */
    creator: string;
    /**
     * The date when the PDF document is created. Defaults to `new Date()`.
     */
    date: Date;
    /**
     * The forced resolution of the images in the exported PDF document
     * ([see example]({% slug embeddedimages_pdfexport %})).
     * By default, the images are exported at their full resolution.
     */
    imageResolution: number;
    /**
     * Specifies the name of the exported PDF file.
     * @default "Export.pdf"
     */
    fileName: string;
    /**
     * If set to `true`, the content is forwarded to `proxyURL` even if the
     * browser supports local saving of files.
     */
    forceProxy: boolean;
    /**
     * The keywords (metadata) of the PDF document.
     */
    keywords: string;
    /**
     * A flag that indicates if the page will be in a landscape orientation
     * ([see example]({% slug hyperlinks_pdfexport %})).
     * By default, the page is in a portrait orientation.
     *
     * @default false
     */
    landscape: boolean;
    /**
     * Specifies the margins of the page.
     *
     * > Numbers are treated as points (`"pt"`).
     *
     * The supported units are:
     * * `"mm"`
     * * `"cm"`
     * * `"in"`
     * * `"pt"` (default).
     *
     */
    margin: string | number | pdf.PageMargin;
    /**
     * Specifies the paper size of the PDF document ([see example]({% slug multipagecontent_pdfexport %}#toc-automatic-page-breaking)).
     * Defaults to `"auto"` which means that the paper size is determined by the content.
     * The size of the content in pixels matches the size of the output in points (1 pixel = 1/72 inch).
     * If `paperSize` is set, the content is split across multiple pages. This enables the `repeatHeaders` and
     * `scale` options, and allows you to specify a template.
     *
     * The supported values are:
     * * A predefined size. The supported paper sizes are: `A0-A10`, `B0-B10`, `C0-C10`, `Executive`, `Folio`, `Legal`, `Letter`, `Tabloid`.
     * * An array of two numbers which specify the width and height in points (1pt = 1/72in).
     * * An array of two strings which specify the width and height in units. The supported units are `"mm"`, `"cm"`, `"in"`, and `"pt"`.
     */
    paperSize: PaperSize;
    /**
     * Specifies if the `<thead>` elements of the tables will be repeated on each page
     * ([see example]({% slug recurrenttableheaders_pdfexport %})).
     */
    repeatHeaders: boolean;
    /**
     * A scale factor ([see example]({% slug scalingofcontent_pdfexport %})).
     * The text size on the screen might be too big for printing.
     * To scale down the output in PDF, use this option.
     *
     * @default 1
     */
    scale: number;
    /**
     * A key/value dictionary of form values which will be sent to the proxy.
     * Can be used to submit Anti-Forgery tokens and other metadata.
     */
    proxyData?: {
        [key: string]: string;
    };
    /**
     * The URL of the server-side proxy which streams the file to the end user. You need to use a proxy if
     * the browser is not capable of saving files locally&mdash;for example, Internet Explorer 9 and Safari.
     * It is your responsibility to implement the server-side proxy. The proxy returns the decoded file with
     * the `"Content-Disposition"` header set to `attachment; filename="<fileName.pdf>"`.
     *
     * In the request body, the proxy receives a POST request with the following parameters:
     * - `"contentType"`&mdash;The MIME type of the file.
     * - `"base64"`&mdash;The base-64 encoded file content.
     * - `"fileName"`&mdash;The file name, as requested by the caller.
     *
     */
    proxyURL: string;
    /**
     * A name or keyword which indicates where to display the document that is returned from the proxy.
     * To display the document in a new window or iframe,
     * the proxy has to have the `"Content-Disposition"` header set to `inline; filename="<fileName.pdf>"`.
     * @default "_self"
     */
    proxyTarget: string;
    /**
     * The producer (metadata) of the PDF document.
     */
    producer: string;
    /**
     * The subject (metadata) of the PDF document.
     */
    subject: string;
    /**
     * The title (metadata) of the PDF document.
     */
    title: string;
    /**
     * @hidden
     */
    pageTemplateDirective: PDFTemplateDirective;
    /**
     * @hidden
     */
    marginComponent: PDFMarginComponent;
    protected readonly drawMargin: any;
    protected pageTemplate: any;
    constructor(element: ElementRef);
    /**
     * Saves the content as a PDF file with the specified name.
     * @param fileName - The name of the exported file.
     */
    saveAs(fileName?: string): void;
    /**
     * Exports the content as a `Group` for further processing.
     *
     * @return - The root group of the exported scene.
     */
    export(): Promise<Group>;
    protected save(element: HTMLElement, fileName: string): void;
    protected exportElement(element: HTMLElement): Promise<Group>;
    protected cleanup(): void;
    protected drawOptions(): DrawOptions;
    protected pdfOptions(): any;
    protected saveOptions(): SaveOptions;
    protected drawElement(element: HTMLElement, options: DrawOptions): Promise<Group>;
    protected exportGroup(group: Group, options: pdf.PDFOptions): Promise<string>;
    private saveDataUri;
}
