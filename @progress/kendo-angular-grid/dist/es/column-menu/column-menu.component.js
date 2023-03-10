/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input, TemplateRef, HostBinding } from '@angular/core';
import { LocalizationService } from "@progress/kendo-angular-l10n";
import { SinglePopupService } from '../common/single-popup.service';
import { ColumnMenuService } from './column-menu.service';
import { filtersByField } from '../filtering/base-filter-cell.component';
import { hasFilter, hasSort, hasLock, hasColumnChooser } from './utils';
var POPUP_CLASS = 'k-grid-columnmenu-popup';
/**
 * Represents the [column menu]({% slug columnmenu_grid %}) component.
 */
var ColumnMenuComponent = /** @class */ (function () {
    function ColumnMenuComponent(popupService, localization, service) {
        this.popupService = popupService;
        this.localization = localization;
        this.service = service;
        /**
         * @hidden
         */
        this.standalone = true;
        /**
         * The settings for the Column Menu.
         */
        this.settings = {};
        /**
         * @hidden
         */
        this.sortable = true;
        /**
         * @hidden
         */
        this.expandedFilter = false;
        /**
         * @hidden
         */
        this.expandedColumns = false;
        this.closeSubscription = service.closeMenu.subscribe(this.close.bind(this));
    }
    Object.defineProperty(ColumnMenuComponent.prototype, "isActive", {
        /**
         * @hidden
         */
        get: function () {
            var _this = this;
            return (this.hasFilter && filtersByField(this.filter, this.column.field).length > 0) ||
                (!this.sortable && this.hasSort && this.sort.find(function (descriptor) { return descriptor.field === _this.column.field; }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnMenuComponent.prototype, "hasFilter", {
        /**
         * @hidden
         */
        get: function () {
            return hasFilter(this.settings, this.column);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnMenuComponent.prototype, "hasSort", {
        /**
         * @hidden
         */
        get: function () {
            return hasSort(this.settings, this.column);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnMenuComponent.prototype, "hasColumnChooser", {
        /**
         * @hidden
         */
        get: function () {
            return hasColumnChooser(this.settings);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnMenuComponent.prototype, "hasLock", {
        /**
         * @hidden
         */
        get: function () {
            return hasLock(this.settings, this.column);
        },
        enumerable: true,
        configurable: true
    });
    ColumnMenuComponent.prototype.ngOnChanges = function () {
        this.service.column = this.column;
        this.service.sort = this.sort;
        this.service.filter = this.filter;
        this.service.sortable = this.sortable;
    };
    ColumnMenuComponent.prototype.ngOnDestroy = function () {
        this.close();
        this.closeSubscription.unsubscribe();
    };
    /**
     * @hidden
     */
    ColumnMenuComponent.prototype.toggle = function (e, anchor, template) {
        e.preventDefault();
        this.expandedFilter = !this.hasColumnChooser;
        this.expandedColumns = !this.hasFilter;
        this.popupRef = this.popupService.open(anchor, template, this.popupRef, POPUP_CLASS);
    };
    /**
     * @hidden
     */
    ColumnMenuComponent.prototype.close = function () {
        this.popupService.destroy();
        this.popupRef = null;
    };
    /**
     * @hidden
     */
    ColumnMenuComponent.prototype.onColumnsExpand = function () {
        this.expandedColumns = true;
        this.expandedFilter = false;
    };
    /**
     * @hidden
     */
    ColumnMenuComponent.prototype.onFilterExpand = function () {
        this.expandedFilter = true;
        this.expandedColumns = false;
    };
    ColumnMenuComponent.decorators = [
        { type: Component, args: [{
                    providers: [ColumnMenuService],
                    selector: 'kendo-grid-column-menu',
                    template: "\n        <a #anchor\n            class=\"k-grid-column-menu k-grid-filter\"\n            [ngClass]=\"{ 'k-state-active': isActive }\"\n            (click)=\"toggle($event, anchor, template)\"\n            href=\"#\"\n            tabindex=\"-1\"\n            [attr.title]=\"localization.get('columnMenu')\">\n            <span class=\"k-icon k-i-more-vertical\"></span>\n        </a>\n        <ng-template #template>\n            <ng-container [ngTemplateOutlet]=\"column.columnMenuTemplateRef || columnMenuTemplate || defaultTemplate\"\n                          [ngTemplateOutletContext]=\"{ service: service, column: column }\">\n            </ng-container>\n        </ng-template>\n        <ng-template #defaultTemplate>\n            <kendo-grid-columnmenu-sort *ngIf=\"hasSort\" [service]=\"service\">\n            </kendo-grid-columnmenu-sort>\n            <kendo-grid-columnmenu-lock *ngIf=\"hasLock\" [service]=\"service\">\n            </kendo-grid-columnmenu-lock>\n            <kendo-grid-columnmenu-chooser *ngIf=\"hasColumnChooser\" [service]=\"service\"\n                [expanded]=\"expandedColumns\" (expand)=\"onColumnsExpand()\">\n            </kendo-grid-columnmenu-chooser>\n            <kendo-grid-columnmenu-filter *ngIf=\"hasFilter\" [service]=\"service\"\n                [expanded]=\"expandedFilter\" (expand)=\"onFilterExpand()\">\n            </kendo-grid-columnmenu-filter>\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    ColumnMenuComponent.ctorParameters = function () { return [
        { type: SinglePopupService },
        { type: LocalizationService },
        { type: ColumnMenuService }
    ]; };
    ColumnMenuComponent.propDecorators = {
        standalone: [{ type: HostBinding, args: ['class.k-grid-column-menu-standalone',] }, { type: Input }],
        column: [{ type: Input }],
        settings: [{ type: Input }],
        sort: [{ type: Input }],
        filter: [{ type: Input }],
        sortable: [{ type: Input }],
        columnMenuTemplate: [{ type: Input }]
    };
    return ColumnMenuComponent;
}());
export { ColumnMenuComponent };
