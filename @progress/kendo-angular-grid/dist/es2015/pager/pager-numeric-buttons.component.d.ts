/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ChangeDetectorRef } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { PagerContextChanges, PagerContextService } from './pager-context.service';
import { PagerElementComponent } from './pager-element.component';
/**
 * Displays numeric buttons to enable navigation between the pages.
 */
export declare class PagerNumericButtonsComponent extends PagerElementComponent {
    protected pagerContext: PagerContextService;
    /**
     * The count of the displayed buttons.
     *
     * @type {number}
     * @memberOf PagerNumericButtonsComponent
     */
    buttonCount: number;
    /**
     * @hidden
     *
     * @readonly
     * @type {number[]}
     * @memberOf PagerNumericButtonsComponent
     */
    readonly buttons: number[];
    /**
     * @hidden
     */
    readonly end: number;
    /**
     * @hidden
     */
    readonly start: number;
    constructor(localization: LocalizationService, cd: ChangeDetectorRef, pagerContext: PagerContextService);
    /**
     * @hidden
     */
    pageLabel(num: number): string;
    protected onChanges({ total, skip, pageSize }: PagerContextChanges): void;
}
