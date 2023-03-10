/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var column_info_service_1 = require("../common/column-info.service");
var column_menu_item_base_1 = require("./column-menu-item-base");
/* tslint:disable:max-line-length */
/**
 * Represents a column-menu item that can be placed inside a
 * [`ColumnMenuTemplate`]({% slug api_treelist_columnmenutemplatedirective %}) directive.
 * Allows the user to lock or unlock the columns.
 *
 * > You have to set the [ColumnMenuService]({% slug api_treelist_columnmenuservice %}) that is passed by
 * > the template to the service input of the `kendo-treelist-columnmenu-lock` component.
 *
 * {% meta height:500 %}
 * {% embed_file column-menu/template-item-lock/app.component.ts preview %}
 * {% embed_file column-menu/app.module.ts %}
 * {% embed_file column-menu/main.ts %}
 * {% embed_file shared/employees.ts %}
 * {% endmeta %}
 */
var ColumnMenuLockComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ColumnMenuLockComponent, _super);
    function ColumnMenuLockComponent(localization, columnInfoService, changeDetector) {
        var _this = _super.call(this) || this;
        _this.localization = localization;
        _this.columnInfoService = columnInfoService;
        _this.changeDetector = changeDetector;
        return _this;
    }
    Object.defineProperty(ColumnMenuLockComponent.prototype, "text", {
        get: function () {
            return this.localization.get(this.locked ? 'unlock' : 'lock');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnMenuLockComponent.prototype, "icon", {
        get: function () {
            return this.locked ? 'unlock' : 'lock';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnMenuLockComponent.prototype, "disabled", {
        get: function () {
            return !this.locked && this.columnInfoService.unlockedRootCount < 2;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    ColumnMenuLockComponent.prototype.toggleColumn = function () {
        this.toggleHierarchy(!this.locked);
        this.close();
        this.changeDetector.markForCheck();
    };
    ColumnMenuLockComponent.prototype.toggleHierarchy = function (locked) {
        var root = this.service.column;
        while (root.parent) {
            root = root.parent;
        }
        var columns = [root];
        var allChanged = [];
        while (columns.length) {
            var column = columns.shift();
            column.locked = locked;
            allChanged.push(column);
            if (column.children) {
                columns.push.apply(columns, column.children.toArray().slice(1));
            }
            if (column.childColumns) {
                columns.push.apply(columns, column.childColumns.toArray());
            }
        }
        this.columnInfoService.changeLocked(allChanged);
    };
    Object.defineProperty(ColumnMenuLockComponent.prototype, "locked", {
        get: function () {
            return this.service.column.locked;
        },
        enumerable: true,
        configurable: true
    });
    ColumnMenuLockComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'kendo-treelist-columnmenu-lock',
                    template: "\n       <kendo-treelist-columnmenu-item [text]=\"text\" [icon]=\"icon\" (itemClick)=\"toggleColumn()\" [disabled]=\"disabled\">\n       </kendo-treelist-columnmenu-item>\n    "
                },] },
    ];
    /** @nocollapse */
    ColumnMenuLockComponent.ctorParameters = function () { return [
        { type: kendo_angular_l10n_1.LocalizationService },
        { type: column_info_service_1.ColumnInfoService },
        { type: core_1.ChangeDetectorRef }
    ]; };
    return ColumnMenuLockComponent;
}(column_menu_item_base_1.ColumnMenuItemBase));
exports.ColumnMenuLockComponent = ColumnMenuLockComponent;
