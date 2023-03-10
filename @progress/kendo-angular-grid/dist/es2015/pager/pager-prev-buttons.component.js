/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
// tslint:disable:no-access-missing-member
import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { PagerContextService } from "./pager-context.service";
import { PagerElementComponent } from './pager-element.component';
import { LocalizationService } from '@progress/kendo-angular-l10n';
/**
 * Displays buttons for navigating to the first and to the previous page ([see example]({% slug paging_grid %}#toc-pager-templates)).
 */
export class PagerPrevButtonsComponent extends PagerElementComponent {
    constructor(localization, pagerContext, cd) {
        super(localization, pagerContext, cd);
    }
    /**
     * @hidden
     *
     * @readonly
     * @type {boolean}
     * @memberOf PagerPrevButtonsComponent
     */
    get disabled() {
        return this.currentPage === 1 || !this.total;
    }
    onChanges({ total, skip, pageSize }) {
        this.total = total;
        this.skip = skip;
        this.pageSize = pageSize;
        this.cd.markForCheck();
    }
}
PagerPrevButtonsComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-pager-prev-buttons',
                template: `
        <a  href="#"
            tabindex="-1"
            [title]="textFor('pagerFirstPage')"
            (click)="currentPage !== 1 ? changePage(0) : false"
            [ngClass]="{
                'k-link': true,
                'k-pager-nav': true,
                'k-state-disabled': disabled,
                'k-pager-first': true
            }">
            <span [attr.aria-label]="textFor('pagerFirstPage')"
                [ngClass]="{
                    'k-icon':true,
                    'k-i-seek-w': true
                }">
            </span>
        </a>
        <a  href="#"
            tabindex="-1"
            [title]="textFor('pagerPreviousPage')"
            (click)="currentPage !== 1 ? changePage(currentPage-2) : false"
            [ngClass]="{
                'k-link': true,
                'k-pager-nav': true,
                'k-state-disabled': disabled,
                '': true
            }">
            <span [attr.aria-label]="textFor('pagerPreviousPage')"
                [ngClass]="{
                    'k-icon':true,
                    'k-i-arrow-w': true
                }">
            </span>
        </a>
    `
            },] },
];
/** @nocollapse */
PagerPrevButtonsComponent.ctorParameters = () => [
    { type: LocalizationService },
    { type: PagerContextService },
    { type: ChangeDetectorRef }
];
