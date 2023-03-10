/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, ElementRef, Renderer2, NgZone, HostBinding, Input } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { EditService } from './edit.service';
import { BaseCommandDirective } from './base-command.directive';
/**
 * Represents the `remove` command of the TreeList. You can apply this directive to any `button` element
 * inside a [`CommandColumnComponent`]({% slug api_treelist_commandcolumncomponent %}).
 * When an associated button with the directive is clicked, the
 * [`remove` event]({% slug api_treelist_treelistcomponent %}#toc-remove)
 * is triggered ([see example]({% slug editing_reactive_forms_treelist %})).
 *
 * > When the row is in the edit mode, the button with the `kendoTreeListRemoveCommand` is automatically hidden.
 *
 * @example
 * ```html-no-run
 * <kendo-treelist>
 *   <kendo-treelist-command-column title="command">
 *     <ng-template kendoTreeListCellTemplate>
 *       <button kendoTreeListRemoveCommand>Remove row</button>
 *     </ng-template>
 *   </kendo-treelist-command-column>
 * </kendo-treelist>
 * ```
 */
export class RemoveCommandDirective extends BaseCommandDirective {
    constructor(editService, element, renderer, localization, ngZone) {
        super(editService, element, renderer, localization, ngZone);
        this.commandClass = true;
        this.readVisible = true;
    }
    onClick() {
        if (this.cellContext) {
            this.editService.remove(this.dataItem, (this.cellContext.viewItem.parent || {}).data);
        }
    }
}
RemoveCommandDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoTreeListRemoveCommand]'
            },] },
];
/** @nocollapse */
RemoveCommandDirective.ctorParameters = () => [
    { type: EditService },
    { type: ElementRef },
    { type: Renderer2 },
    { type: LocalizationService },
    { type: NgZone }
];
RemoveCommandDirective.propDecorators = {
    cellContext: [{ type: Input, args: ['kendoTreeListRemoveCommand',] }],
    commandClass: [{ type: HostBinding, args: ['class.k-grid-remove-command',] }]
};
