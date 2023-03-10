/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var column_info_service_1 = require("../common/column-info.service");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var column_menu_item_base_1 = require("./column-menu-item-base");
/* tslint:disable:max-line-length */
/**
 * Represents the component for selecting columns in the Grid that can be placed
 * inside a [`ColumnMenuTemplate`]({% slug api_grid_columnmenutemplatedirective %}) directive.
 *
 * > You have to set the [ColumnMenuService]({% slug api_grid_columnmenuservice %}) that is passed by
 * > the template to the service input of the `kendo-grid-columnmenu-chooser` component.
 *
 * @example
 * {% meta height:300 %}
 * ```ts-preview
 *
 * _@Component({
 *     selector: 'my-app',
 *     template: `
 *       <kendo-grid [data]="data" [columnMenu]="true">
 *          <ng-template kendoGridColumnMenuTemplate let-service="service">
 *              <kendo-grid-columnmenu-chooser [service]="service">
 *              </kendo-grid-columnmenu-chooser>
 *          </ng-template>
 *          <kendo-grid-column field="Field1"></kendo-grid-column>
 *          <kendo-grid-column field="Field2" [hidden]="true"></kendo-grid-column>
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
var ColumnMenuChooserComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ColumnMenuChooserComponent, _super);
    function ColumnMenuChooserComponent(localization, columnInfoService, changeDetector) {
        var _this = _super.call(this) || this;
        _this.localization = localization;
        _this.columnInfoService = columnInfoService;
        _this.changeDetector = changeDetector;
        /**
         * Fires when the content is expanded.
         */
        _this.expand = new core_1.EventEmitter();
        /**
         * Fires when the content is collapsed.
         */
        _this.collapse = new core_1.EventEmitter();
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
    Object.defineProperty(ColumnMenuChooserComponent.prototype, "columns", {
        get: function () {
            return this.columnInfoService.leafNamedColumns;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    ColumnMenuChooserComponent.prototype.onApply = function (changed) {
        this.close();
        if (changed.length) {
            this.changeDetector.markForCheck();
            this.columnInfoService.changeVisibility(changed);
        }
    };
    ColumnMenuChooserComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'kendo-grid-columnmenu-chooser',
                    template: "\n        <kendo-grid-columnmenu-item [text]=\"localization.get('columns')\"\n            icon=\"columns\" [expanded]=\"expanded\" (collapse)=\"collapse.emit()\" (expand)=\"expand.emit()\">\n            <ng-template kendoGridColumnMenuItemContentTemplate>\n                <kendo-grid-columnlist\n                    [applyText]=\"localization.get('columnsApply')\"\n                    [resetText]=\"localization.get('columnsReset')\"\n                    [columns]=\"columns\"\n                    [autoSync]=\"false\"\n                    [allowHideAll]=\"false\"\n                    [actionsClass]=\"actionsClass\"\n                    (apply)=\"onApply($event)\">\n                </kendo-grid-columnlist>\n            </ng-template>\n        </kendo-grid-columnmenu-item>\n    "
                },] },
    ];
    /** @nocollapse */
    ColumnMenuChooserComponent.ctorParameters = function () { return [
        { type: kendo_angular_l10n_1.LocalizationService },
        { type: column_info_service_1.ColumnInfoService },
        { type: core_1.ChangeDetectorRef }
    ]; };
    ColumnMenuChooserComponent.propDecorators = {
        expand: [{ type: core_1.Output }],
        collapse: [{ type: core_1.Output }],
        expanded: [{ type: core_1.Input }]
    };
    return ColumnMenuChooserComponent;
}(column_menu_item_base_1.ColumnMenuItemBase));
exports.ColumnMenuChooserComponent = ColumnMenuChooserComponent;
