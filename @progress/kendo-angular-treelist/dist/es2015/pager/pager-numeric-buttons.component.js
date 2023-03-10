/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { PagerContextService } from './pager-context.service';
import { PagerElementComponent } from './pager-element.component';
/**
 * Displays numeric buttons to enable navigation between the pages.
 */
export class PagerNumericButtonsComponent extends PagerElementComponent {
    constructor(localization, cd, pagerContext) {
        super(localization, pagerContext, cd);
        this.pagerContext = pagerContext;
    }
    /**
     * @hidden
     *
     * @readonly
     * @type {number[]}
     * @memberOf PagerNumericButtonsComponent
     */
    get buttons() {
        let result = [];
        for (let idx = this.start; idx <= this.end; idx++) {
            result.push(idx);
        }
        return result;
    }
    /**
     * @hidden
     */
    get end() {
        return Math.min((this.start + this.buttonCount) - 1, this.totalPages);
    }
    /**
     * @hidden
     */
    get start() {
        const page = this.currentPage;
        const buttonCount = this.buttonCount;
        if (page > buttonCount) {
            const reminder = (page % buttonCount);
            return (reminder === 0) ? (page - buttonCount) + 1 : (page - reminder) + 1;
        }
        return 1;
    }
    /**
     * @hidden
     */
    pageLabel(num) {
        const pageText = this.textFor('pagerPage');
        if (pageText) {
            return pageText + ' ' + num;
        }
        return num.toString();
    }
    onChanges({ total, skip, pageSize }) {
        this.total = total;
        this.skip = skip;
        this.pageSize = pageSize;
        this.cd.markForCheck();
    }
}
PagerNumericButtonsComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-pager-numeric-buttons',
                template: `
       <ul [ngClass]="{'k-pager-numbers': true, 'k-reset': true}">
            <li *ngIf="start > 1">
                <a  class="k-link"
                    [attr.aria-label]="pageLabel(start - 1)"
                    href="#"
                    tabindex="-1"
                    (click)="changePage(start - 2)">...</a>
            </li>
            <li *ngFor="let num of buttons">
                <a  href="#"
                    [attr.aria-label]="pageLabel(num)"
                    tabindex="-1"
                    [ngClass]="{'k-link': true, 'k-state-selected':currentPage == num}"
                    (click)="changePage(num - 1)">
                    {{num}}
                </a>
            </li>
            <li *ngIf="end < totalPages">
                <a  class="k-link"
                    [attr.aria-label]="pageLabel(end + 1)"
                    href="#"
                    tabindex="-1"
                    (click)="changePage(end)">...</a>
            </li>
        </ul>
    `
            },] },
];
/** @nocollapse */
PagerNumericButtonsComponent.ctorParameters = () => [
    { type: LocalizationService },
    { type: ChangeDetectorRef },
    { type: PagerContextService }
];
PagerNumericButtonsComponent.propDecorators = {
    buttonCount: [{ type: Input }]
};
