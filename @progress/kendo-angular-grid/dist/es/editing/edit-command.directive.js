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
 * Represents the `edit` command of the Grid. You can apply this directive to any `button`
 * element inside a [`CommandColumnComponent`]({% slug api_grid_commandcolumncomponent %}).
 * When an associated button with the directive is clicked, the
 * [`edit`]({% slug api_grid_gridcomponent %}#toc-edit) event
 * is triggered ([see example]({% slug editing_grid %})).
 *
 * > When the row is in the edit mode, the button with `kendoGridEditCommand` is automatically hidden.
 *
 * @example
 * ```html-no-run
 * <kendo-grid>
 *   <kendo-grid-command-column title="command">
 *     <ng-template kendoGridCellTemplate>
 *       <button kendoGridEditCommand class="k-primary">Edit</button>
 *     </ng-template>
 *   </kendo-grid-command-column>
 * </kendo-grid>
 * ```
 *
 */
var EditCommandDirective = /** @class */ (function (_super) {
    tslib_1.__extends(EditCommandDirective, _super);
    function EditCommandDirective(editService, cellContext, element, renderer, localization, ngZone) {
        var _this = _super.call(this, element, renderer, null, localization, ngZone) || this;
        _this.editService = editService;
        _this.cellContext = cellContext;
        /**
         * @hidden
         */
        _this.commandClass = true;
        return _this;
    }
    Object.defineProperty(EditCommandDirective.prototype, "visible", {
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
    EditCommandDirective.prototype.onClick = function (e) {
        e.preventDefault();
        this.editService.beginEdit(this.rowIndex);
    };
    EditCommandDirective.prototype.ngDoCheck = function () {
        if (this.cellContext) {
            this.rowIndex = this.cellContext.rowIndex;
            this.isEdited = this.editService.isEdited(this.rowIndex);
        }
    };
    EditCommandDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoGridEditCommand]'
                },] },
    ];
    /** @nocollapse */
    EditCommandDirective.ctorParameters = function () { return [
        { type: EditService },
        { type: undefined, decorators: [{ type: Inject, args: [CELL_CONTEXT,] }] },
        { type: ElementRef },
        { type: Renderer },
        { type: LocalizationService },
        { type: NgZone }
    ]; };
    EditCommandDirective.propDecorators = {
        visible: [{ type: HostBinding, args: ['style.display',] }],
        commandClass: [{ type: HostBinding, args: ['class.k-grid-edit-command',] }],
        onClick: [{ type: HostListener, args: ['click', ['$event'],] }]
    };
    return EditCommandDirective;
}(Button));
export { EditCommandDirective };
