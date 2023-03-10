/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
// tslint:disable:no-access-missing-member
import { Component, ChangeDetectorRef, ChangeDetectionStrategy, HostBinding } from '@angular/core';
import { PagerElementComponent } from './pager-element.component';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { PagerContextService } from "./pager-context.service";
/**
 * Displays information about the current page and the total number of records ([see example]({% slug paging_treelist %}#toc-pager-templates)).
 */
export class PagerInfoComponent extends PagerElementComponent {
    constructor(localization, cd, pagerContext) {
        super(localization, pagerContext, cd);
        this.pagerContext = pagerContext;
    }
    /**
     * @hidden
     *
     * @readonly
     * @type {number}
     * @memberOf PagerInfoComponent
     */
    get maxItems() {
        return Math.min(this.currentPage * this.pageSize, this.total);
    }
    /**
     * @hidden
     *
     * @readonly
     * @type {number}
     * @memberOf PagerInfoComponent
     */
    get currentPageText() {
        return this.total ?
            (this.currentPage - 1) * this.pageSize + 1 :
            0;
    }
    /**
     * @hidden
     *
     * @readonly
     * @type {boolean}
     * @memberOf PagerInfoComponent
     */
    get classes() {
        return true;
    }
    onChanges({ allCount, total, skip, pageSize }) {
        this.total = total;
        this.skip = skip;
        this.pageSize = pageSize;
        this.allCount = allCount;
        this.cd.markForCheck();
    }
}
PagerInfoComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-pager-info',
                template: `{{currentPageText}} - {{maxItems}} {{textFor('pagerOf')}} {{allCount}} {{textFor('pagerItems')}}`
            },] },
];
/** @nocollapse */
PagerInfoComponent.ctorParameters = () => [
    { type: LocalizationService },
    { type: ChangeDetectorRef },
    { type: PagerContextService }
];
PagerInfoComponent.propDecorators = {
    classes: [{ type: HostBinding, args: ["class.k-pager-info",] }, { type: HostBinding, args: ["class.k-label",] }]
};
