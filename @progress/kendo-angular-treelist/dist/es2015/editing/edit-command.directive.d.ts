/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ElementRef, Renderer2, NgZone } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { EditService } from './edit.service';
import { BaseCommandDirective } from './base-command.directive';
/**
 * Represents the `edit` command of the TreeList. You can apply this directive to any `button`
 * element inside a [`CommandColumnComponent`]({% slug api_treelist_commandcolumncomponent %}).
 * When an associated button with the directive is clicked, the
 * [`edit`]({% slug api_treelist_treelistcomponent %}#toc-edit) event
 * is triggered ([see example]({% slug editing_treelist %})).
 *
 * > When the row is in the edit mode, the button with `kendoTreeListEditCommand` is automatically hidden.
 *
 * @example
 * ```html-no-run
 * <kendo-treelist>
 *   <kendo-treelist-command-column title="command">
 *     <ng-template kendoTreeListCellTemplate>
 *       <button kendoTreeListEditCommand class="k-primary">Edit</button>
 *     </ng-template>
 *   </kendo-treelist-command-column>
 * </kendo-treelist>
 * ```
 *
 */
export declare class EditCommandDirective extends BaseCommandDirective {
    /**
     * The `cellContext` provided to the template.
     */
    cellContext: any;
    commandClass: boolean;
    protected readVisible: boolean;
    constructor(editService: EditService, element: ElementRef, renderer: Renderer2, localization: LocalizationService, ngZone: NgZone);
    protected onClick(): void;
}
