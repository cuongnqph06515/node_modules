/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var kendo_angular_popup_1 = require("@progress/kendo-angular-popup");
var column_info_service_1 = require("../common/column-info.service");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var dom_queries_1 = require("../rendering/common/dom-queries");
/**
 * Represents the component for selecting columns in the Grid. To enable the user to show or hide columns,
 * add the component inside a [`ToolbarTemplate`]({% slug api_grid_toolbartemplatedirective %}) directive.
 *
 * @example
 * {% meta height:300 %}
 * ```ts-preview
 *
 * _@Component({
 *     selector: 'my-app',
 *     template: `
 *       <kendo-grid [data]="data">
 *          <ng-template kendoGridToolbarTemplate>
 *             <kendo-grid-column-chooser></kendo-grid-column-chooser>
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
var ColumnChooserComponent = /** @class */ (function () {
    function ColumnChooserComponent(localization, columnInfoService, popupService, ngZone, renderer, changeDetector) {
        this.localization = localization;
        this.columnInfoService = columnInfoService;
        this.popupService = popupService;
        this.ngZone = ngZone;
        this.renderer = renderer;
        this.changeDetector = changeDetector;
        /**
         * Specifies if the changes in the visibility of the column will be immediately applied.
         */
        this.autoSync = false;
        /**
         * Specifies if all columns can be hidden.
         */
        this.allowHideAll = true;
    }
    Object.defineProperty(ColumnChooserComponent.prototype, "columns", {
        get: function () {
            return this.columnInfoService.leafNamedColumns;
        },
        enumerable: true,
        configurable: true
    });
    ColumnChooserComponent.prototype.ngOnDestroy = function () {
        this.close();
    };
    /**
     * @hidden
     */
    ColumnChooserComponent.prototype.toggle = function (anchor, template) {
        var _this = this;
        if (!this.popupRef) {
            var direction = this.localization.rtl ? 'right' : 'left';
            this.popupRef = this.popupService.open({
                anchor: anchor,
                content: template,
                positionMode: 'absolute',
                anchorAlign: { vertical: 'bottom', horizontal: direction },
                popupAlign: { vertical: 'top', horizontal: direction }
            });
            this.renderer.setAttribute(this.popupRef.popupElement, 'dir', this.localization.rtl ? 'rtl' : 'ltr');
            this.ngZone.runOutsideAngular(function () {
                return _this.closeClick = _this.renderer.listen("document", "click", function (_a) {
                    var target = _a.target;
                    if (!dom_queries_1.closest(target, function (node) { return node === _this.popupRef.popupElement || node === anchor; })) {
                        _this.close();
                    }
                });
            });
        }
        else {
            this.close();
        }
    };
    /**
     * @hidden
     */
    ColumnChooserComponent.prototype.onApply = function (changed) {
        this.close();
        if (changed.length) {
            this.changeDetector.markForCheck();
            this.columnInfoService.changeVisibility(changed);
        }
    };
    /**
     * @hidden
     */
    ColumnChooserComponent.prototype.onChange = function (changed) {
        this.changeDetector.markForCheck();
        this.columnInfoService.changeVisibility(changed);
    };
    ColumnChooserComponent.prototype.close = function () {
        if (this.popupRef) {
            this.popupRef.close();
            this.popupRef = null;
        }
        this.detachClose();
    };
    ColumnChooserComponent.prototype.detachClose = function () {
        if (this.closeClick) {
            this.closeClick();
            this.closeClick = null;
        }
    };
    ColumnChooserComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'kendo-grid-column-chooser',
                    template: "\n        <button #anchor\n            type=\"button\"\n            (click)=\"toggle(anchor, template)\"\n            class=\"k-button k-bare k-button-icon\"\n            [attr.title]=\"localization.get('columns')\">\n            <span class=\"k-icon k-i-columns\"></span>\n        </button>\n        <ng-template #template>\n            <span class='k-column-chooser-title'>{{ localization.get('columns') }}</span>\n            <kendo-grid-columnlist\n                [columns]=\"columns\"\n                [applyText]=\"localization.get('columnsApply')\"\n                [resetText]=\"localization.get('columnsReset')\"\n                [autoSync]=\"autoSync\"\n                [allowHideAll]=\"allowHideAll\"\n                (apply)=\"onApply($event)\"\n                (columnChange)=\"onChange($event)\">\n            </kendo-grid-columnlist>\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    ColumnChooserComponent.ctorParameters = function () { return [
        { type: kendo_angular_l10n_1.LocalizationService },
        { type: column_info_service_1.ColumnInfoService },
        { type: kendo_angular_popup_1.PopupService },
        { type: core_1.NgZone },
        { type: core_1.Renderer2 },
        { type: core_1.ChangeDetectorRef }
    ]; };
    ColumnChooserComponent.propDecorators = {
        autoSync: [{ type: core_1.Input }],
        allowHideAll: [{ type: core_1.Input }]
    };
    return ColumnChooserComponent;
}());
exports.ColumnChooserComponent = ColumnChooserComponent;
