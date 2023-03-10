/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var filter_service_1 = require("../filter.service");
var column_component_1 = require("../../columns/column.component");
var single_popup_service_1 = require("../../common/single-popup.service");
var base_filter_cell_component_1 = require("../base-filter-cell.component");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
/**
 * @hidden
 */
var FilterMenuComponent = /** @class */ (function () {
    function FilterMenuComponent(filterService, popupService, localization) {
        this.filterService = filterService;
        this.popupService = popupService;
        this.localization = localization;
        /**
         * @hidden
         */
        this.filterLabel = this.localization.get('filter');
    }
    Object.defineProperty(FilterMenuComponent.prototype, "hasFilters", {
        get: function () {
            return base_filter_cell_component_1.filtersByField(this.filter, (this.column || {}).field).length > 0;
        },
        enumerable: true,
        configurable: true
    });
    FilterMenuComponent.prototype.toggle = function (anchor, template) {
        this.popupRef = this.popupService.open(anchor, template, this.popupRef);
        return false;
    };
    FilterMenuComponent.prototype.close = function () {
        this.popupService.destroy();
    };
    FilterMenuComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'kendo-grid-filter-menu',
                    template: "\n        <a #anchor\n            [ngClass]=\"{'k-grid-filter':true, 'k-state-active': hasFilters}\"\n            (click)=\"toggle(anchor, template)\"\n            href=\"#\"\n            [attr.title]=\"filterLabel\">\n            <span class=\"k-icon k-i-filter\"></span>\n        </a>\n        <ng-template #template>\n            <kendo-grid-filter-menu-container\n                [column]=\"column\"\n                [filter]=\"filter\"\n                (close)=\"close()\"\n                >\n            </kendo-grid-filter-menu-container>\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    FilterMenuComponent.ctorParameters = function () { return [
        { type: filter_service_1.FilterService },
        { type: single_popup_service_1.SinglePopupService },
        { type: kendo_angular_l10n_1.LocalizationService }
    ]; };
    FilterMenuComponent.propDecorators = {
        column: [{ type: core_1.Input }],
        filter: [{ type: core_1.Input }]
    };
    return FilterMenuComponent;
}());
exports.FilterMenuComponent = FilterMenuComponent;
