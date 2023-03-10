/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input, ContentChild, ContentChildren, ElementRef, NgZone, QueryList } from '@angular/core';
import { take } from 'rxjs/operators';
import { SuspendService } from '../scrolling/suspend.service';
import { PDFService } from './pdf.service';
import { PDFMarginComponent } from './pdf-margin.component';
import { PDFTemplateDirective } from './pdf-template.directive';
import { exportElement, cloneNode } from './export-element';
import { GridQuery } from './grid-query';
import { ColumnBase } from '../columns/column-base';
import { PDFExportComponent } from '@progress/kendo-angular-pdf-export';
const createElement = (tagName, className) => {
    const element = document.createElement(tagName);
    if (className) {
        element.className = className;
    }
    return element;
};
const ɵ0 = createElement;
const createDiv = (className) => {
    return createElement('div', className);
};
const ɵ1 = createDiv;
/**
 * Configures the settings for the export of Grid in PDF ([see example]({% slug pdfexport_grid %})).
 */
export class PDFComponent extends PDFExportComponent {
    constructor(pdfService, suspendService, ngZone, element) {
        super(element);
        this.pdfService = pdfService;
        this.suspendService = suspendService;
        this.ngZone = ngZone;
        this.columns = new QueryList();
        this.saveSubscription = pdfService.savePDF.subscribe(this.savePDF.bind(this));
        this.drawSubscription = pdfService.drawPDF.subscribe(this.drawPDF.bind(this));
        this.reset = this.reset.bind(this);
        this.draw = this.draw.bind(this);
    }
    ngOnDestroy() {
        this.saveSubscription.unsubscribe();
        this.drawSubscription.unsubscribe();
        this.reset();
    }
    savePDF(component) {
        this.createPDF(component, this.draw);
    }
    drawPDF({ component, promise }) {
        this.createPDF(component, () => {
            this.createExportGroup(promise);
        });
    }
    createPDF(component, callback) {
        const pageSize = component.pageSize;
        const total = component.view.total;
        const columns = this.columns.toArray();
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
    }
    initProgress() {
        const wrapperElement = this.component.wrapper.nativeElement;
        const progress = this.progress = createDiv('k-loading-pdf-mask');
        const overlay = cloneNode(wrapperElement);
        progress.appendChild(overlay);
        progress.appendChild(createDiv('k-loading-color'));
        progress.appendChild(createElement('span', 'k-i-loading k-icon'));
        this.originalHeight = wrapperElement.style.height;
        this.originalOverflow = wrapperElement.style.overflow;
        wrapperElement.style.height = wrapperElement.offsetHeight + 'px';
        wrapperElement.style.overflow = 'hidden';
        wrapperElement.appendChild(progress);
        this.applyScroll(overlay);
    }
    applyScroll(overlay) {
        const query = new GridQuery(this.component.wrapper.nativeElement);
        const content = query.content();
        if (content) {
            const overlayQuery = new GridQuery(overlay);
            const overlayContent = overlayQuery.content();
            overlayContent.scrollTop = content.scrollTop;
            overlayContent.scrollLeft = content.scrollLeft;
            overlayQuery.header().scrollLeft = query.header().scrollLeft;
            const footer = query.footer();
            if (footer) {
                overlayQuery.footer().scrollLeft = footer.scrollLeft;
            }
            const lockedContent = query.content(true);
            if (lockedContent) {
                const overlayLockedContent = overlayQuery.content(true);
                overlayLockedContent.scrollTop = lockedContent.scrollTop;
                overlayLockedContent.scrollLeft = lockedContent.scrollLeft;
            }
        }
    }
    draw() {
        this.createExportElement((element) => {
            this.save(element, this.fileName);
        });
    }
    createExportGroup(promise) {
        this.createExportElement((element) => {
            this.exportElement(element).then(group => promise.resolve(group));
        });
    }
    createExportElement(callback) {
        this.ngZone.runOutsideAngular(() => {
            const container = this.container = createDiv('k-grid-pdf-export-element');
            const element = exportElement(this.component.wrapper.nativeElement);
            container.appendChild(element);
            document.body.appendChild(container);
            callback(element);
        });
    }
    drawOptions() {
        const options = super.drawOptions();
        options._destructive = true;
        return options;
    }
    cleanup() {
        super.cleanup();
        this.pdfService.exporting = false;
        if (this.component) {
            const originalColumns = this.originalColumns;
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
    }
    removeContainer() {
        if (this.container) {
            document.body.removeChild(this.container);
            delete this.container;
        }
    }
    changePage(skip, _take, callback, columns) {
        this.ngZone.run(() => {
            this.pdfService.dataChanged.pipe(take(1)).subscribe(() => {
                if ((columns && columns.length) || this.component.virtualColumns) {
                    this.changeColumns(columns, callback);
                }
                else {
                    this.onStable(callback);
                }
            });
            this.component.notifyPageChange('pdf', { skip: skip, take: _take });
        });
    }
    changeColumns(columns, callback) {
        this.ngZone.run(() => {
            this.onStable(callback);
            if (columns && columns.length) {
                this.component.columns.reset(columns);
            }
        });
    }
    reset() {
        this.suspendService.scroll = false;
        this.renderAllPages = false;
        if (!this.component) {
            return;
        }
        const wrapperElement = this.component.wrapper.nativeElement;
        wrapperElement.removeChild(this.progress);
        wrapperElement.style.height = this.originalHeight;
        wrapperElement.style.overflow = this.originalOverflow;
        delete this.progress;
        delete this.component;
    }
    onStable(callback) {
        // not sure if it is an actual scenario. occurs in the tests.
        // onStable is triggered in the same pass without the change detection.
        // thus, the callback is called before the changes are applied without the timeout.
        setTimeout(() => {
            this.ngZone.onStable.asObservable().pipe(take(1)).subscribe(callback);
        }, 0); // tslint:disable-line: align
    }
}
PDFComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-grid-pdf',
                template: ''
            },] },
];
/** @nocollapse */
PDFComponent.ctorParameters = () => [
    { type: PDFService },
    { type: SuspendService },
    { type: NgZone },
    { type: ElementRef }
];
PDFComponent.propDecorators = {
    allPages: [{ type: Input }],
    columns: [{ type: ContentChildren, args: [ColumnBase,] }],
    marginComponent: [{ type: ContentChild, args: [PDFMarginComponent,] }],
    pageTemplateDirective: [{ type: ContentChild, args: [PDFTemplateDirective,] }]
};
export { ɵ0, ɵ1 };
