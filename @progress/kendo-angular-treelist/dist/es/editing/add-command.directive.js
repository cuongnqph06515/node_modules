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
var AddCommandDirective = /** @class */ (function (_super) {
    tslib_1.__extends(AddCommandDirective, _super);
    function AddCommandDirective(editService, element, renderer, localization, ngZone) {
        var _this = _super.call(this, editService, element, renderer, localization, ngZone) || this;
        _this.commandClass = true;
        _this.readVisible = true;
        return _this;
    }
    AddCommandDirective.prototype.onClick = function () {
        this.editService.beginAdd(this.dataItem);
    };
    AddCommandDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoTreeListAddCommand]'
                },] },
    ];
    /** @nocollapse */
    AddCommandDirective.ctorParameters = function () { return [
        { type: EditService },
        { type: ElementRef },
        { type: Renderer2 },
        { type: LocalizationService },
        { type: NgZone }
    ]; };
    AddCommandDirective.propDecorators = {
        cellContext: [{ type: Input, args: ['kendoTreeListAddCommand',] }],
        commandClass: [{ type: HostBinding, args: ['class.k-grid-add-command',] }]
    };
    return AddCommandDirective;
}(BaseCommandDirective));
export { AddCommandDirective };
