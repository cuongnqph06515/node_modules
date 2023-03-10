/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ChangeDetectorRef, Directive, ElementRef, HostBinding, Input, NgZone, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs';
import { resizableColumns } from '../columns/column-common';
import { ColumnResizingService } from './column-resizing.service';
import { filter, tap, map, switchMap, bufferCount } from 'rxjs/operators';
/**
 * @hidden
 */
const columnsToResize = ({ columns }) => Math.max(1, resizableColumns(columns).length);
const ɵ0 = columnsToResize;
/**
 * @hidden
 */
const row = selector => element => element.querySelector(selector);
const ɵ1 = row;
/**
 * @hidden
 */
const headerRow = index => element => element.querySelectorAll('thead>tr')[index];
const ɵ2 = headerRow;
/**
 * @hidden
 */
const cell = (index, selector = 'td') => element => element.querySelectorAll(`${selector}:not(.k-group-cell):not(.k-hierarchy-cell)`)[index];
const ɵ3 = cell;
/**
 * @hidden
 */
const offsetWidth = element => element.offsetWidth;
const ɵ4 = offsetWidth;
/**
 * @hidden
 */
const pipe = (...fns) => data => fns.reduce((state, fn) => state ? fn(state) : 0, data);
const ɵ5 = pipe;
/**
 * @hidden
 */
export class TableDirective {
    constructor(element, renderer, service, zone, cdr) {
        this.element = element;
        this.renderer = renderer;
        this.service = service;
        this.zone = zone;
        this.cdr = cdr;
        this.locked = false;
        this.firstResize = false;
    }
    get minWidth() {
        return this.firstResize ? 0 : null;
    }
    ngOnInit() {
        const obs = this.service
            .changes.pipe(filter(e => this.locked === e.locked));
        this.subscription = obs.pipe(filter(e => e.type === 'start'), tap(this.initState.bind(this)), map(columnsToResize), switchMap((take) => obs.pipe(filter(e => e.type === 'resizeTable'), map(e => e.delta), bufferCount(take)))).subscribe(this.resize.bind(this));
        this.autoFitSubscription = this.service
            .registerTable({
            autoFit: this.autoFitObservable.bind(this),
            locked: this.locked
        });
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        if (this.autoFitSubscription) {
            this.autoFitSubscription();
            this.autoFitSubscription = null;
        }
    }
    initState() {
        this.firstResize = true;
        if (!this.virtualColumns || this.locked) {
            this.originalWidth = offsetWidth(this.element.nativeElement);
        }
    }
    resize(deltas) {
        if (!this.virtualColumns || this.locked) {
            const delta = deltas.reduce((sum, item) => sum + item, 0);
            const width = this.originalWidth + delta;
            this.renderer.setStyle(this.element.nativeElement, 'width', width + 'px');
        }
        this.cdr.detectChanges();
    }
    autoFitObservable(columnInfo) {
        return Observable.create(observer => {
            this.zone.runOutsideAngular(() => {
                this.renderer.addClass(this.element.nativeElement, 'k-autofitting');
                this.cdr.detectChanges();
                const widths = columnInfo.map(this.measureColumn.bind(this));
                this.renderer.removeClass(this.element.nativeElement, 'k-autofitting');
                observer.next(widths);
            });
        });
    }
    measureColumn(info) {
        const dom = this.element.nativeElement;
        const header = pipe(headerRow(info.level), cell(info.headerIndex, 'th'), offsetWidth)(dom);
        let data = 0;
        if (!info.isParentSpan || (info.isParentSpan && info.isLastInSpan)) {
            data = pipe(row('tbody>tr:not(.k-grouping-row):not(.k-grid-norecords)'), cell(info.index), offsetWidth)(dom);
        }
        const footer = pipe(row('tfoot>tr'), cell(info.index), offsetWidth)(dom);
        return Math.max(header, data, footer);
    }
}
TableDirective.decorators = [
    { type: Directive, args: [{
                selector: 'table' // tslint:disable-line:directive-selector
            },] },
];
/** @nocollapse */
TableDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: ColumnResizingService },
    { type: NgZone },
    { type: ChangeDetectorRef }
];
TableDirective.propDecorators = {
    locked: [{ type: Input }],
    virtualColumns: [{ type: Input }],
    minWidth: [{ type: HostBinding, args: ['style.min-width',] }]
};
export { ɵ0, ɵ1, ɵ2, ɵ3, ɵ4, ɵ5 };
