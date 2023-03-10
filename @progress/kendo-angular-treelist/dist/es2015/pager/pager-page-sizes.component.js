/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
// tslint:disable:no-access-missing-member
import { Component, ChangeDetectorRef, ChangeDetectionStrategy, HostBinding, Input } from '@angular/core';
import { PagerElementComponent } from './pager-element.component';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { PagerContextService } from "./pager-context.service";
/**
 * Displays a drop-down list for the page size selection ([see example]({% slug paging_treelist %}#toc-pager-templates)).
 */
export class PagerPageSizesComponent extends PagerElementComponent {
    constructor(localization, cd, pagerContext) {
        super(localization, pagerContext, cd);
        this.pagerContext = pagerContext;
        this._pageSizes = [];
    }
    get pageSizes() {
        return this._pageSizes;
    }
    /**
     * The page sizes collection. Can be an Array of numbers and/or PageSizeItem objects.
     *
     * {% meta height:500 %}
     * {% embed_file configuration/pager-template-page-sizes/app.component.ts preview %}
     * {% embed_file shared/app.module.ts %}
     * {% embed_file shared/filesystem.ts %}
     * {% embed_file shared/main.ts %}
     * {% endmeta %}
     */
    set pageSizes(pageSizes) {
        const normalizedItems = [];
        pageSizes.forEach(item => {
            if (typeof item === 'number') {
                normalizedItems.push({
                    text: item.toString(),
                    value: item
                });
            }
            else {
                normalizedItems.push(item);
            }
        });
        this._pageSizes = normalizedItems;
    }
    /**
     * @hidden
     *
     * @readonly
     */
    get classes() {
        return true;
    }
    /**
     * @hidden
     *
     * @readonly
     */
    get showInitialPageSize() {
        return this.pageSizes
            .filter(item => {
            if (typeof item.value === 'number') {
                return item.value === Number(this.pageSize);
            }
            return this.total === Number(this.pageSize);
        })
            .length === 0;
    }
    /**
     * @hidden
     */
    pageSizeChange(value) {
        this.pageSize = parseInt(value, 10);
        this.pagerContext.changePageSize(this.pageSize);
    }
    /**
     * @hidden
     */
    getValue(page) {
        return typeof page.value === 'number' ? page.value : this.total;
    }
    /**
     * @hidden
     */
    getSelectedState(page) {
        if (typeof page.value === 'number') {
            return page.value === this.pageSize ? true : undefined;
        }
        return this.pageSize === this.total;
    }
    onChanges({ total, skip, pageSize }) {
        this.total = total;
        this.skip = skip;
        this.pageSize = typeof pageSize === 'number' ? pageSize : this.total;
        this.cd.markForCheck();
    }
}
PagerPageSizesComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-pager-page-sizes',
                template: `
        <select #select
            (change)="pageSizeChange(select.value)"
            [attr.aria-label]="textFor('pagerItemsPerPage')">
            <option *ngIf="showInitialPageSize" [value]="pageSize">{{pageSize}}</option>
            <option *ngFor="let page of pageSizes" [value]="getValue(page)" [selected]="getSelectedState(page)">
                {{page['text']}}
            </option>
        </select>
        {{ textFor('pagerItemsPerPage') }}
    `
            },] },
];
/** @nocollapse */
PagerPageSizesComponent.ctorParameters = () => [
    { type: LocalizationService },
    { type: ChangeDetectorRef },
    { type: PagerContextService }
];
PagerPageSizesComponent.propDecorators = {
    pageSizes: [{ type: Input }],
    classes: [{ type: HostBinding, args: ["class.k-pager-sizes",] }, { type: HostBinding, args: ["class.k-label",] }]
};
