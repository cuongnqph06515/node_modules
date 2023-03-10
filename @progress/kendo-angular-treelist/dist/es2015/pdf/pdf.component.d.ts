/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ElementRef, OnDestroy, NgZone, QueryList } from '@angular/core';
import { Subscription } from 'rxjs';
import { SuspendService } from '../scrolling/suspend.service';
import { PDFService } from './pdf.service';
import { PDFMarginComponent } from './pdf-margin.component';
import { PDFTemplateDirective } from './pdf-template.directive';
import { ColumnBase } from '../columns/column-base';
import { DrawOptions } from '@progress/kendo-drawing';
import { PDFExportComponent } from '@progress/kendo-angular-pdf-export';
/**
 * Configures the settings for the export of TreeList in PDF ([see example]({% slug pdfexport_treelist %})).
 */
export declare class PDFComponent extends PDFExportComponent implements OnDestroy {
    protected pdfService: PDFService;
    protected suspendService: SuspendService;
    protected ngZone: NgZone;
    /**
     * Exports all TreeList pages, starting from the first one.
     */
    allPages: boolean;
    columns: QueryList<ColumnBase>;
    /**
     * @hidden
     */
    marginComponent: PDFMarginComponent;
    /**
     * @hidden
     */
    pageTemplateDirective: PDFTemplateDirective;
    protected progress: HTMLElement;
    protected component: any;
    protected container: HTMLElement;
    protected skip: number;
    protected pageSize: number;
    protected originalHeight: string;
    protected originalOverflow: string;
    protected saveSubscription: Subscription;
    protected drawSubscription: Subscription;
    protected renderAllPages: boolean;
    protected originalColumns: ColumnBase[];
    constructor(pdfService: PDFService, suspendService: SuspendService, ngZone: NgZone, element: ElementRef);
    ngOnDestroy(): void;
    protected savePDF(component: any): void;
    protected drawPDF({ component, promise }: any): void;
    protected createPDF(component: any, callback: any): void;
    protected initProgress(): void;
    protected applyScroll(overlay: HTMLElement): void;
    protected draw(): void;
    protected createExportGroup(promise: any): void;
    protected createExportElement(callback: any): void;
    protected drawOptions(): DrawOptions;
    protected cleanup(): void;
    protected removeContainer(): void;
    protected changePage(skip: number, _take: number, callback: () => void, columns?: any[]): void;
    protected changeColumns(columns: any[], callback: () => void): void;
    protected reset(): void;
    protected onStable(callback: () => void): void;
}
