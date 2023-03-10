/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LocalizationService } from "@progress/kendo-angular-l10n";
import { ColumnMenuItemBase } from './column-menu-item-base';
/* tslint:disable:max-line-length */
/**
 * Represents the component for editing column filters in the Grid that can be placed
 * inside a [`ColumnMenuTemplate`]({% slug api_grid_columnmenutemplatedirective %}) directive.
 *
 * > You have to set the [ColumnMenuService]({% slug api_grid_columnmenuservice %}) that is passed by
 * > the template to the service input of the `kendo-grid-columnmenu-filter` component.
 *
 * @example
 * {% meta height:400 %}
 * ```ts-preview
 *
 * _@Component({
 *     selector: 'my-app',
 *     template: `
 *       <kendo-grid [kendoGridBinding]="data" [columnMenu]="true">
 *          <ng-template kendoGridColumnMenuTemplate let-service="service">
 *              <kendo-grid-columnmenu-filter [service]="service">
 *              </kendo-grid-columnmenu-filter>
 *          </ng-template>
 *          <kendo-grid-column field="Field1"></kendo-grid-column>
 *          <kendo-grid-column field="Field2"></kendo-grid-column>
 *       </kendo-grid>
 *     `
 * })
 *
 * class AppComponent {
 *   public data: any[] = [{ Field1: 'Foo', Field2: 'Bar' }];
 * }
 *
 * ```
 * {% endmeta %}
 */
var ColumnMenuFilterComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ColumnMenuFilterComponent, _super);
    function ColumnMenuFilterComponent(localization) {
        var _this = _super.call(this) || this;
        _this.localization = localization;
        /**
         * Fires when the content is expanded.
         */
        _this.expand = new EventEmitter();
        /**
         * Fires when the content is collapsed.
         */
        _this.collapse = new EventEmitter();
        /**
         * Specifies if the content is expanded.
         */
        _this.expanded = false;
        /**
         * @hidden
         */
        _this.actionsClass = 'k-columnmenu-actions';
        return _this;
    }
    ColumnMenuFilterComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-grid-columnmenu-filter',
                    template: "\n        <kendo-grid-columnmenu-item [text]=\"localization.get('filter')\" icon=\"filter\"\n            [expanded]=\"expanded\" (collapse)=\"collapse.emit()\" (expand)=\"expand.emit()\">\n            <ng-template kendoGridColumnMenuItemContentTemplate>\n                    <kendo-grid-filter-menu-container\n                        [column]=\"service.column\"\n                        [filter]=\"service.filter\"\n                        [actionsClass]=\"actionsClass\"\n                        (close)=\"close()\">\n                    </kendo-grid-filter-menu-container>\n                </ng-template>\n        </kendo-grid-columnmenu-item>\n    "
                },] },
    ];
    /** @nocollapse */
    ColumnMenuFilterComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    ColumnMenuFilterComponent.propDecorators = {
        expand: [{ type: Output }],
        collapse: [{ type: Output }],
        expanded: [{ type: Input }]
    };
    return ColumnMenuFilterComponent;
}(ColumnMenuItemBase));
export { ColumnMenuFilterComponent };
