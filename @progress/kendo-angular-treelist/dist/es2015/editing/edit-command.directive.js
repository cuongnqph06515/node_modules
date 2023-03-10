/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, ElementRef, Renderer2, NgZone, HostBinding, Input } from '@angular/core';
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
export class EditCommandDirective extends BaseCommandDirective {
    constructor(editService, element, renderer, localization, ngZone) {
        super(editService, element, renderer, localization, ngZone);
        this.commandClass = true;
        this.readVisible = true;
    }
    onClick() {
        if (this.cellContext) {
            this.editService.beginEdit(this.dataItem);
        }
    }
}
EditCommandDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoTreeListEditCommand]'
            },] },
];
/** @nocollapse */
EditCommandDirective.ctorParameters = () => [
    { type: EditService },
    { type: ElementRef },
    { type: Renderer2 },
    { type: LocalizationService },
    { type: NgZone }
];
EditCommandDirective.propDecorators = {
    cellContext: [{ type: Input, args: ['kendoTreeListEditCommand',] }],
    commandClass: [{ type: HostBinding, args: ['class.k-grid-edit-command',] }]
};
