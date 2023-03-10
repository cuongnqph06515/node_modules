/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
// tslint:disable: no-access-missing-member
import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { PagerContextService } from "./pager-context.service";
import { PagerElementComponent } from './pager-element.component';
import { LocalizationService } from '@progress/kendo-angular-l10n';
/**
 * Displays buttons for navigating to the next and to the last page ([see example]({% slug paging_grid %}#toc-pager-template)).
 */
export class PagerNextButtonsComponent extends PagerElementComponent {
    constructor(localization, pagerContext, cd) {
        super(localization, pagerContext, cd);
    }
    /**
     * @hidden
     *
     * @readonly
     * @type {boolean}
     * @memberOf PagerNextButtonsComponent
     */
    get disabled() {
        return this.currentPage === this.totalPages || !this.total;
    }
    onChanges({ total, skip, pageSize }) {
        this.total = total;
        this.skip = skip;
        this.pageSize = pageSize;
        this.cd.markForCheck();
    }
}
PagerNextButtonsComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-pager-next-buttons',
                template: `
        <a  href="#"
            tabindex="-1"
            [title]="textFor('pagerNextPage')"
            (click)="currentPage !== totalPages ? changePage(currentPage) : false"
            [ngClass]="{
                'k-link': true,
                'k-pager-nav': true,
                'k-state-disabled': disabled,
                '': true
            }">
            <span [attr.aria-label]="textFor('pagerNextPage')"
                [ngClass]="{
                    'k-icon':true,
                    'k-i-arrow-e': true
                }">
            </span>
        </a>
        <a  href="#"
            tabindex="-1"
            [title]="textFor('pagerLastPage')"
            (click)="currentPage !== totalPages ? changePage(totalPages-1) : false"
            [ngClass]="{
                'k-link': true,
                'k-pager-nav': true,
                'k-state-disabled': disabled,
                'k-pager-last': true
            }">
            <span [attr.aria-label]="textFor('pagerLastPage')"
                [ngClass]="{
                    'k-icon':true,
                    'k-i-seek-e': true
                }">
            </span>
        </a>
    `
            },] },
];
/** @nocollapse */
PagerNextButtonsComponent.ctorParameters = () => [
    { type: LocalizationService },
    { type: PagerContextService },
    { type: ChangeDetectorRef }
];
