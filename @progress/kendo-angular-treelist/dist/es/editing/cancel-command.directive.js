/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { Directive, ElementRef, Renderer2, NgZone, HostBinding, Input } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { EditService } from './edit.service';
import { BaseCommandDirective } from './base-command.directive';
/**
 * Represents the `cancel` command of the TreeList. You can apply this directive to any `button`
 * element inside a [`CommandColumnComponent`]({% slug api_treelist_commandcolumncomponent %}).
 * When an associated button with the directive is clicked, the
 * [`cancel`]({% slug api_treelist_treelistcomponent %}#toc-cancel) event
 * is triggered ([see example]({% slug editing_treelist %})).
 *
 * > When the row is not in the edit mode, the button with the `kendoTreeListCancelCommand` is automatically hidden.
 *
 * @example
 * ```html-no-run
 * <kendo-treelist>
 *   <kendo-treelist-command-column title="command">
 *     <ng-template kendoTreeListCellTemplate>
 *       <button kendoTreeListCancelCommand>Cancel changes</button>
 *     </ng-template>
 *   </kendo-treelist-command-column>
 * </kendo-treelist>
 * ```
 *
 * You can control the content of the button based on the state of the row.
 *
 * @example
 * ```html-no-run
 * <kendo-treelist>
 *   <kendo-treelist-command-column title="command">
 *     <ng-template kendoTreeListCellTemplate let-isNew="isNew">
 *       <button kendoTreeListCancelCommand>{{isNew ? 'Discard' : 'Cancel changes'}}</button>
 *     </ng-template>
 *   </kendo-treelist-command-column>
 * </kendo-treelist>
 * ```
 */
var CancelCommandDirective = /** @class */ (function (_super) {
    tslib_1.__extends(CancelCommandDirective, _super);
    function CancelCommandDirective(editService, element, renderer, localization, ngZone) {
        var _this = _super.call(this, editService, element, renderer, localization, ngZone) || this;
        _this.commandClass = true;
        _this.readVisible = false;
        return _this;
    }
    CancelCommandDirective.prototype.onClick = function () {
        if (this.cellContext) {
            var viewItem = this.cellContext.viewItem;
            this.editService.endEdit(viewItem.data, viewItem.isNew);
        }
    };
    CancelCommandDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoTreeListCancelCommand]'
                },] },
    ];
    /** @nocollapse */
    CancelCommandDirective.ctorParameters = function () { return [
        { type: EditService },
        { type: ElementRef },
        { type: Renderer2 },
        { type: LocalizationService },
        { type: NgZone }
    ]; };
    CancelCommandDirective.propDecorators = {
        cellContext: [{ type: Input, args: ['kendoTreeListCancelCommand',] }],
        commandClass: [{ type: HostBinding, args: ['class.k-grid-cancel-command',] }]
    };
    return CancelCommandDirective;
}(BaseCommandDirective));
export { CancelCommandDirective };
