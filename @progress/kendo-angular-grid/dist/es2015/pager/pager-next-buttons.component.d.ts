/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ChangeDetectorRef } from '@angular/core';
import { PagerContextService, PagerContextChanges } from "./pager-context.service";
import { PagerElementComponent } from './pager-element.component';
import { LocalizationService } from '@progress/kendo-angular-l10n';
/**
 * Displays buttons for navigating to the next and to the last page ([see example]({% slug paging_grid %}#toc-pager-template)).
 */
export declare class PagerNextButtonsComponent extends PagerElementComponent {
    /**
     * @hidden
     *
     * @readonly
     * @type {boolean}
     * @memberOf PagerNextButtonsComponent
     */
    readonly disabled: boolean;
    constructor(localization: LocalizationService, pagerContext: PagerContextService, cd: ChangeDetectorRef);
    protected onChanges({ total, skip, pageSize }: PagerContextChanges): void;
}
