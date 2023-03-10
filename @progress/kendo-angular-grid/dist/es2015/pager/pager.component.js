/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input, EventEmitter, Output, HostBinding } from '@angular/core';
import { normalize } from './pager-settings';
import { PagerTemplateDirective } from './pager-template.directive';
import { anyChanged } from '../utils';
import { PagerContextService } from './pager-context.service';
/**
 * @hidden
 */
export class PagerComponent {
    constructor(pagerContext) {
        this.pagerContext = pagerContext;
        this.total = 0;
        this.skip = 1;
        this.pageChange = new EventEmitter();
        this.settings = normalize({});
        this._templateContext = {};
    }
    set options(value) {
        this.settings = normalize(value);
    }
    get pagerWrapClass() {
        return true;
    }
    get gridPagerClass() {
        return true;
    }
    get widgetClass() {
        return true;
    }
    get totalPages() {
        return Math.ceil((this.total || 0) / this.pageSize);
    }
    get currentPage() {
        return Math.floor((this.skip || 0) / this.pageSize) + 1;
    }
    get templateContext() {
        const context = this._templateContext;
        context.totalPages = this.totalPages;
        context.total = this.total;
        context.skip = this.skip;
        context.pageSize = this.pageSize;
        context.currentPage = this.currentPage;
        return context;
    }
    ngOnInit() {
        this.pageChangeSubscription = this.pagerContext.pageChange.subscribe(this.changePage.bind(this));
    }
    ngOnChanges(changes) {
        if (anyChanged(['pageSize', 'skip', 'total'], changes, false)) {
            this.pagerContext.notifyChanges({
                pageSize: this.pageSize,
                skip: this.skip,
                total: this.total
            });
        }
    }
    ngOnDestroy() {
        if (this.pageChangeSubscription) {
            this.pageChangeSubscription.unsubscribe();
        }
    }
    changePage(event) {
        this.pageChange.emit(event);
    }
}
PagerComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-pager',
                template: `
        <ng-container
            *ngIf="template?.templateRef"
            [ngTemplateOutlet]="template.templateRef"
            [ngTemplateOutletContext]="templateContext">
        </ng-container>
        <ng-container *ngIf="!template?.templateRef">
            <kendo-pager-prev-buttons *ngIf="settings.previousNext"></kendo-pager-prev-buttons>
            <kendo-pager-numeric-buttons
                *ngIf="settings.type === 'numeric'"
                [buttonCount]="settings.buttonCount">
            </kendo-pager-numeric-buttons>
            <kendo-pager-input *ngIf="settings.type === 'input'"></kendo-pager-input>
            <kendo-pager-next-buttons *ngIf="settings.previousNext"></kendo-pager-next-buttons>
            <kendo-pager-info *ngIf='settings.info'></kendo-pager-info>
            <kendo-pager-page-sizes *ngIf="settings.pageSizes" [pageSizes]="settings.pageSizes"></kendo-pager-page-sizes>
        </ng-container>
  `
            },] },
];
/** @nocollapse */
PagerComponent.ctorParameters = () => [
    { type: PagerContextService }
];
PagerComponent.propDecorators = {
    total: [{ type: Input }],
    skip: [{ type: Input }],
    pageSize: [{ type: Input }],
    options: [{ type: Input }],
    template: [{ type: Input }],
    pageChange: [{ type: Output }],
    pagerWrapClass: [{ type: HostBinding, args: ['class.k-pager-wrap',] }],
    gridPagerClass: [{ type: HostBinding, args: ['class.k-grid-pager',] }],
    widgetClass: [{ type: HostBinding, args: ['class.k-widget',] }]
};
