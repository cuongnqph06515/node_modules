/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ColumnInfoService } from '../common/column-info.service';
import { LocalizationService } from "@progress/kendo-angular-l10n";
import { ColumnMenuItemBase } from './column-menu-item-base';
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
        { type: Component, args: [{
                    selector: 'kendo-grid-columnmenu-chooser',
                    template: "\n        <kendo-grid-columnmenu-item [text]=\"localization.get('columns')\"\n            icon=\"columns\" [expanded]=\"expanded\" (collapse)=\"collapse.emit()\" (expand)=\"expand.emit()\">\n            <ng-template kendoGridColumnMenuItemContentTemplate>\n                <kendo-grid-columnlist\n                    [applyText]=\"localization.get('columnsApply')\"\n                    [resetText]=\"localization.get('columnsReset')\"\n                    [columns]=\"columns\"\n                    [autoSync]=\"false\"\n                    [allowHideAll]=\"false\"\n                    [actionsClass]=\"actionsClass\"\n                    (apply)=\"onApply($event)\">\n                </kendo-grid-columnlist>\n            </ng-template>\n        </kendo-grid-columnmenu-item>\n    "
                },] },
    ];
    /** @nocollapse */
    ColumnMenuChooserComponent.ctorParameters = function () { return [
        { type: LocalizationService },
        { type: ColumnInfoService },
        { type: ChangeDetectorRef }
    ]; };
    ColumnMenuChooserComponent.propDecorators = {
        expand: [{ type: Output }],
        collapse: [{ type: Output }],
        expanded: [{ type: Input }]
    };
    return ColumnMenuChooserComponent;
}(ColumnMenuItemBase));
export { ColumnMenuChooserComponent };
