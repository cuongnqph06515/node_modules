/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, HostListener, HostBinding, Inject, ElementRef, Renderer2 as Renderer, NgZone } from '@angular/core';
import { Button } from '@progress/kendo-angular-buttons';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { EditService } from './edit.service';
import { CELL_CONTEXT } from '../rendering/common/cell-context';
/**
 * Represents the `save` command of the Grid. You can apply this directive to any `button`
 * element inside a [`CommandColumnComponent`]({% slug api_grid_commandcolumncomponent %}).
 * When an associated button with the directive is clicked, the
 * [`save`]({% slug api_grid_gridcomponent %}#toc-save) event
 * is triggered ([see example]({% slug editing_grid %})).
 *
 * > When the row is not in the edit mode, the button with `kendoGridSaveCommand` is automatically hidden.
 *
 * @example
 * ```html-no-run
 * <kendo-grid>
 *   <kendo-grid-command-column title="command">
 *     <ng-template kendoGridCellTemplate>
 *       <button kendoGridSaveCommand>Save changes</button>
 *     </ng-template>
 *   </kendo-grid-command-column>
 * </kendo-grid>
 * ```
 *
 * You can control the content of the button based on the state of the row.
 *
 * @example
 * ```html-no-run
 * <kendo-grid>
 *   <kendo-grid-command-column title="command">
 *     <ng-template kendoGridCellTemplate let-isNew="isNew">
 *       <button kendoGridSaveCommand>{{isNew ? 'Add' : 'Update'}}</button>
 *     </ng-template>
 *   </kendo-grid-command-column>
 * </kendo-grid>
 * ```
 */
export class SaveCommandDirective extends Button {
    constructor(editService, cellContext, element, renderer, localization, ngZone) {
        super(element, renderer, null, localization, ngZone);
        this.editService = editService;
        this.cellContext = cellContext;
        /**
         * @hidden
         */
        this.commandClass = true;
    }
    /**
     * @hidden
     */
    get visible() {
        return !this.isEdited ? 'none' : '';
    }
    /**
     * @hidden
     */
    onClick(e) {
        e.preventDefault();
        if (this.isEdited) {
            this.editService.save(this.rowIndex);
        }
    }
    ngDoCheck() {
        if (this.cellContext) {
            this.rowIndex = this.cellContext.rowIndex;
            this.isEdited = this.editService.isEdited(this.rowIndex);
        }
    }
}
SaveCommandDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoGridSaveCommand]'
            },] },
];
/** @nocollapse */
SaveCommandDirective.ctorParameters = () => [
    { type: EditService },
    { type: undefined, decorators: [{ type: Inject, args: [CELL_CONTEXT,] }] },
    { type: ElementRef },
    { type: Renderer },
    { type: LocalizationService },
    { type: NgZone }
];
SaveCommandDirective.propDecorators = {
    visible: [{ type: HostBinding, args: ['style.display',] }],
    commandClass: [{ type: HostBinding, args: ['class.k-grid-save-command',] }],
    onClick: [{ type: HostListener, args: ['click', ['$event'],] }]
};
