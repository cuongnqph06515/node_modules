/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var sort_service_1 = require("../common/sort.service");
var sort_settings_1 = require("../columns/sort-settings");
var column_menu_item_base_1 = require("./column-menu-item-base");
/* tslint:disable:max-line-length */
/**
 * Represents a column-menu item for sorting Grid columns that can be placed inside a
 * [`ColumnMenuTemplate`]({% slug api_grid_columnmenutemplatedirective %}) directive.
 * Allows the user to sort the column.
 *
 * > You have to set the [ColumnMenuService]({% slug api_grid_columnmenuservice %}) that is passed by
 * > the template to the service input of the `kendo-grid-columnmenu-sort` component.
 *
 * @example
 * ```ts-preview
 *
 * _@Component({
 *     selector: 'my-app',
 *     template: `
 *       <kendo-grid [kendoGridBinding]="data" [sortable]="true" [columnMenu]="true">
 *          <ng-template kendoGridColumnMenuTemplate let-service="service">
 *              <kendo-grid-columnmenu-sort [service]="service">
 *              </kendo-grid-columnmenu-sort>
 *          </ng-template>
 *          <kendo-grid-column field="Field1" [width]="100"></kendo-grid-column>
 *          <kendo-grid-column field="Field2" [width]="100"></kendo-grid-column>
 *       </kendo-grid>
 *     `
 * })
 *
 * class AppComponent {
 *   public data: any[] = [{ Field1: 'Foo', Field2: 'Bar' }, { Field1: 'Foo1', Field2: 'Bar1' }];
 * }
 *
 * ```
 */
var ColumnMenuSortComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ColumnMenuSortComponent, _super);
    function ColumnMenuSortComponent(localization, sortService) {
        var _this = _super.call(this) || this;
        _this.localization = localization;
        _this.sortService = sortService;
        return _this;
    }
    Object.defineProperty(ColumnMenuSortComponent.prototype, "sortedAsc", {
        get: function () {
            var descriptor = this.descriptor;
            return descriptor && (!descriptor.dir || descriptor.dir === 'asc');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnMenuSortComponent.prototype, "sortedDesc", {
        get: function () {
            var descriptor = this.descriptor;
            return descriptor && descriptor.dir === 'desc';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    ColumnMenuSortComponent.prototype.toggleSort = function (dir) {
        var field = this.service.column.field;
        var _a = sort_settings_1.normalize(this.service.sortable), mode = _a.mode, allowUnsort = _a.allowUnsort;
        var descriptor = this.descriptor;
        var sort = mode === 'multiple' ? this.service.sort.filter(function (s) { return s.field !== field; }) : [];
        if (descriptor && descriptor.dir === dir) {
            if (!allowUnsort) {
                return;
            }
        }
        else {
            sort.push({ field: field, dir: dir });
        }
        this.sortService.sort(sort);
        this.close();
    };
    Object.defineProperty(ColumnMenuSortComponent.prototype, "descriptor", {
        get: function () {
            var _this = this;
            return [].concat(this.service.sort || []).find(function (s) { return s.field === _this.service.column.field; });
        },
        enumerable: true,
        configurable: true
    });
    ColumnMenuSortComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'kendo-grid-columnmenu-sort',
                    template: "\n        <kendo-grid-columnmenu-item [text]=\"localization.get('sortAscending')\"\n            icon=\"sort-asc-sm\" (itemClick)=\"toggleSort('asc')\" [selected]=\"sortedAsc\">\n        </kendo-grid-columnmenu-item>\n        <kendo-grid-columnmenu-item [text]=\"localization.get('sortDescending')\"\n            icon=\"sort-desc-sm\" (itemClick)=\"toggleSort('desc')\" [selected]=\"sortedDesc\">\n        </kendo-grid-columnmenu-item>\n    "
                },] },
    ];
    /** @nocollapse */
    ColumnMenuSortComponent.ctorParameters = function () { return [
        { type: kendo_angular_l10n_1.LocalizationService },
        { type: sort_service_1.SortService }
    ]; };
    return ColumnMenuSortComponent;
}(column_menu_item_base_1.ColumnMenuItemBase));
exports.ColumnMenuSortComponent = ColumnMenuSortComponent;
