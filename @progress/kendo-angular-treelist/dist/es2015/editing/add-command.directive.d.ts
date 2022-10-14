/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ElementRef, Renderer2, NgZone } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { EditService } from './edit.service';
import { BaseCommandDirective } from './base-command.directive';
/**
 * Represents the command for adding a new item to the TreeList. You can apply this directive to any
 * `button` element inside a [`ToolbarTemplate`]({% slug api_treelist_commandcolumncomponent %}).
 * When an associated button with the directive is clicked, the
 * [`add`]({% slug api_treelist_treelistcomponent %}#toc-add) event is triggered
 * ([see example]({% slug editing_treelist %})).
 *
 * @example
 * ```html-no-run
 * <kendo-treelist>
 *    <ng-template kendoTreeListToolbarTemplate>
 *       <button kendoTreeListAddCommand>Add new</button>
 *    </ng-template>
 * </kendo-treelist>
 * ```
 */
export declare class AddCommandDirective extends BaseCommandDirective {
    /**
     * The `cellContext` provided to the template.
     */
    cellContext: any;
    commandClass: boolean;
    protected readVisible: boolean;
    constructor(editService: EditService, element: ElementRef, renderer: Renderer2, localization: LocalizationService, ngZone: NgZone);
    protected onClick(): void;
}
