/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { NumericTextBoxComponent } from '@progress/kendo-angular-inputs';
// tslint:disable:no-access-missing-member
import { Component, ChangeDetectorRef, ViewChild, NgZone } from '@angular/core';
import { PagerElementComponent } from './pager-element.component';
import { LocalizationService } from "@progress/kendo-angular-l10n";
import { PagerContextService } from "./pager-context.service";
import { Keys } from '@progress/kendo-angular-common';
/**
 * Displays an input element which allows the typing and rendering of page numbers.
 */
export class PagerInputComponent extends PagerElementComponent {
    constructor(localization, pagerContext, zone, cd) {
        super(localization, pagerContext, cd);
        this.pagerContext = pagerContext;
        this.zone = zone;
        /**
         * @hidden
         *
         * @param {string} value
         *
         * @memberOf PagerInputComponent
         */
        this.handleKeyDown = (event) => {
            let incomingValue = this.numericInput.value || this.current;
            if (event.keyCode === Keys.Enter) {
                event.preventDefault();
                if (incomingValue !== this.current) {
                    this.zone.run(() => {
                        this.changePage(incomingValue - 1);
                    });
                }
            }
        };
        /**
         * @hidden
         *
         * @param {string} value
         *
         * @memberOf PagerInputComponent
         */
        this.handleBlur = () => {
            const inputValue = this.numericInput.value;
            if (!inputValue) {
                this.numericInput.writeValue(this.current);
                return;
            }
            if (inputValue !== this.current) {
                this.zone.run(() => {
                    this.changePage(inputValue - 1);
                });
            }
        };
    }
    /**
     * @hidden
     */
    get current() {
        return this.hasPages ? this.currentPage : 0;
    }
    get hasPages() {
        return this.totalPages !== 0;
    }
    onChanges({ total, skip, pageSize }) {
        this.total = total;
        this.skip = skip;
        this.pageSize = pageSize;
        this.cd.markForCheck();
    }
}
PagerInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-pager-input',
                template: `
     <span [ngClass]="{'k-pager-input': true, 'k-label': true}">
        {{textFor('pagerPage')}}
        <kendo-numerictextbox
            [style.margin]="'0 1ex'"
            [style.width]="'3em'"
            [spinners]="false"
            [decimals]="0"
            format="n0"
            [disabled]="!hasPages"
            [value]="current"
            [min]="hasPages ? 1 : 0"
            [max]="totalPages"
            [autoCorrect]="true"
            [kendoEventsOutsideAngular]="{
                keydown: handleKeyDown,
                focusout: handleBlur
            }"></kendo-numerictextbox>
        {{textFor('pagerOf')}} {{totalPages}}
     </span>
    `
            },] },
];
/** @nocollapse */
PagerInputComponent.ctorParameters = () => [
    { type: LocalizationService },
    { type: PagerContextService },
    { type: NgZone },
    { type: ChangeDetectorRef }
];
PagerInputComponent.propDecorators = {
    numericInput: [{ type: ViewChild, args: [NumericTextBoxComponent,] }]
};
