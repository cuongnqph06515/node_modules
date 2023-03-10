/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { Directive, HostListener, HostBinding, Inject, ElementRef, Renderer2 as Renderer, NgZone } from '@angular/core';
import { Button } from '@progress/kendo-angular-buttons';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { EditService } from './edit.service';
import { CELL_CONTEXT } from '../rendering/common/cell-context';
/**
 * Represents the `remove` command of the Grid. You can apply this directive to any `button` element
 * inside a [`CommandColumnComponent`]({% slug api_grid_commandcolumncomponent %}).
 * When an associated button with the directive is clicked, the
 * [`remove` event]({% slug api_grid_gridcomponent %}#toc-remove)
 * is triggered ([see example]({% slug editing_reactive_forms_grid %})).
 *
 * > When the row is in the edit mode, the button with the `kendoGridRemoveCommand` is automatically hidden.
 *
 * @example
 * ```html-no-run
 * <kendo-grid>
 *   <kendo-grid-command-column title="command">
 *     <ng-template kendoGridCellTemplate>
 *       <button kendoGridRemoveCommand>Remove row</button>
 *     </ng-template>
 *   </kendo-grid-command-column>
 * </kendo-grid>
 * ```
 */
var RemoveCommandDirective = /** @class */ (function (_super) {
    tslib_1.__extends(RemoveCommandDirective, _super);
    function RemoveCommandDirective(editService, cellContext, element, renderer, localization, ngZone) {
        var _this = _super.call(this, element, renderer, null, localization, ngZone) || this;
        _this.editService = editService;
        _this.cellContext = cellContext;
        /**
         * @hidden
         */
        _this.commandClass = true;
        return _this;
    }
    Object.defineProperty(RemoveCommandDirective.prototype, "visible", {
        /**
         * @hidden
         */
        get: function () {
            return this.isEdited ? 'none' : '';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    RemoveCommandDirective.prototype.onClick = function (e) {
        e.preventDefault();
        this.editService.remove(this.rowIndex);
    };
    RemoveCommandDirective.prototype.ngDoCheck = function () {
        if (this.cellContext) {
            this.rowIndex = this.cellContext.rowIndex;
            this.isEdited = this.editService.isEdited(this.rowIndex);
        }
    };
    RemoveCommandDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoGridRemoveCommand]'
                },] },
    ];
    /** @nocollapse */
    RemoveCommandDirective.ctorParameters = function () { return [
        { type: EditService },
        { type: undefined, decorators: [{ type: Inject, args: [CELL_CONTEXT,] }] },
        { type: ElementRef },
        { type: Renderer },
        { type: LocalizationService },
        { type: NgZone }
    ]; };
    RemoveCommandDirective.propDecorators = {
        visible: [{ type: HostBinding, args: ['style.display',] }],
        commandClass: [{ type: HostBinding, args: ['class.k-grid-remove-command',] }],
        onClick: [{ type: HostListener, args: ['click', ['$event'],] }]
    };
    return RemoveCommandDirective;
}(Button));
export { RemoveCommandDirective };
