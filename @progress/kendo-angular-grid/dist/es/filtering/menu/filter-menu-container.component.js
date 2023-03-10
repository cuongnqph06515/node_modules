/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input, SkipSelf, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ColumnComponent } from "../../columns/column.component";
import { FilterService } from "../filter.service";
import { removeFilter, filtersByField } from "../base-filter-cell.component";
import { isPresent, isNullOrEmptyString } from "../../utils";
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { cloneFilters } from '../../common/filter-descriptor-differ';
var isNoValueOperator = function (operator) { return (operator === "isnull"
    || operator === "isnotnull"
    || operator === "isempty"
    || operator === "isnotempty"); };
var ɵ0 = isNoValueOperator;
var validFilters = function (_a) {
    var value = _a.value, operator = _a.operator;
    return !isNullOrEmptyString(value) || isNoValueOperator(operator);
};
var ɵ1 = validFilters;
var trimFilters = function (filter) {
    filter.filters = filter.filters.filter(validFilters);
    return filter;
};
var ɵ2 = trimFilters;
var findParent = function (filters, field, parent) {
    return filters.reduce(function (acc, filter) {
        if (acc) {
            return acc;
        }
        if (filter.filters) {
            return findParent(filter.filters, field, filter);
        }
        else if (filter.field === field) {
            return parent;
        }
        return acc;
    }, undefined); // tslint:disable-line:align
};
var ɵ3 = findParent;
var parentLogicOfDefault = function (filter, field, def) {
    if (def === void 0) { def = "and"; }
    var parent = findParent(((filter || {}).filters || []), field);
    return isPresent(parent) ? parent.logic : def;
};
var ɵ4 = parentLogicOfDefault;
/**
 * @hidden
 */
var FilterMenuContainerComponent = /** @class */ (function () {
    function FilterMenuContainerComponent(parentService, childService, localization, cd) {
        this.parentService = parentService;
        this.childService = childService;
        this.localization = localization;
        this.cd = cd;
        this.close = new EventEmitter();
        /**
         * @hidden
         */
        this.actionsClass = 'k-action-buttons k-button-group';
        this._templateContext = {};
    }
    Object.defineProperty(FilterMenuContainerComponent.prototype, "filter", {
        get: function () {
            return this._filter;
        },
        /**
         * The current root filter.
         * @type {CompositeFilterDescriptor}
         */
        set: function (value) {
            this._filter = cloneFilters(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterMenuContainerComponent.prototype, "childFilter", {
        get: function () {
            if (!isPresent(this._childFilter)) {
                this._childFilter = {
                    filters: filtersByField(this.filter, (this.column || {}).field),
                    logic: parentLogicOfDefault(this.filter, (this.column || {}).field)
                };
            }
            return this._childFilter;
        },
        enumerable: true,
        configurable: true
    });
    FilterMenuContainerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.childService.changes.subscribe(function (filter) { return _this._childFilter = filter; });
        this.subscription.add(this.localization.changes.subscribe(function () { return _this.cd.markForCheck(); }));
    };
    FilterMenuContainerComponent.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    Object.defineProperty(FilterMenuContainerComponent.prototype, "disabled", {
        get: function () {
            return !this.childFilter.filters.some(validFilters);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterMenuContainerComponent.prototype, "templateContext", {
        get: function () {
            this._templateContext.column = this.column;
            this._templateContext.filter = this.childFilter;
            this._templateContext.filterService = this.childService;
            // tslint:disable-next-line:no-string-literal
            this._templateContext["$implicit"] = this.childFilter;
            return this._templateContext;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterMenuContainerComponent.prototype, "hasTemplate", {
        get: function () {
            return isPresent(this.column) && isPresent(this.column.filterMenuTemplateRef);
        },
        enumerable: true,
        configurable: true
    });
    FilterMenuContainerComponent.prototype.submit = function () {
        var filter = trimFilters(this.childFilter);
        if (filter.filters.length) {
            var root = this.filter || {
                filters: [],
                logic: "and"
            };
            removeFilter(root, this.column.field);
            root.filters.push(filter);
            this.parentService.filter(root);
        }
        this.close.emit();
        return false;
    };
    FilterMenuContainerComponent.prototype.reset = function () {
        var root = this.filter || {
            filters: [],
            logic: "and"
        };
        removeFilter(root, this.column.field);
        this.parentService.filter(root);
        this.close.emit();
    };
    Object.defineProperty(FilterMenuContainerComponent.prototype, "clearText", {
        get: function () {
            return this.localization.get("filterClearButton");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterMenuContainerComponent.prototype, "filterText", {
        get: function () {
            return this.localization.get("filterFilterButton");
        },
        enumerable: true,
        configurable: true
    });
    FilterMenuContainerComponent.decorators = [
        { type: Component, args: [{
                    providers: [FilterService],
                    selector: 'kendo-grid-filter-menu-container',
                    template: "\n        <form (submit)=\"submit()\" (reset)=\"reset()\"\n            class=\"k-filter-menu k-group k-reset k-state-border-up\">\n            <div class=\"k-filter-menu-container\">\n                <ng-container [ngSwitch]=\"hasTemplate\">\n                    <ng-container *ngSwitchCase=\"false\">\n                        <ng-container\n                            kendoFilterMenuHost\n                            [filterService]=\"childService\"\n                            [column]=\"column\"\n                            [filter]=\"childFilter\">\n                        </ng-container>\n                    </ng-container>\n                    <ng-container *ngSwitchCase=\"true\">\n                        <ng-template\n                            *ngIf=\"column.filterMenuTemplateRef\"\n                            [ngTemplateOutlet]=\"column.filterMenuTemplateRef\"\n                            [ngTemplateOutletContext]=\"templateContext\"\n                            >\n                        </ng-template>\n                    </ng-container>\n                </ng-container>\n                <div [ngClass]=\"actionsClass\">\n                    <button type=\"reset\" class=\"k-button\">{{clearText}}</button>\n                    <button type=\"submit\" class=\"k-button k-primary\" [disabled]=\"disabled\">{{filterText}}</button>\n                </div>\n            </div>\n        </form>\n    "
                },] },
    ];
    /** @nocollapse */
    FilterMenuContainerComponent.ctorParameters = function () { return [
        { type: FilterService, decorators: [{ type: SkipSelf }] },
        { type: FilterService },
        { type: LocalizationService },
        { type: ChangeDetectorRef }
    ]; };
    FilterMenuContainerComponent.propDecorators = {
        close: [{ type: Output }],
        column: [{ type: Input }],
        filter: [{ type: Input }],
        actionsClass: [{ type: Input }]
    };
    return FilterMenuContainerComponent;
}());
export { FilterMenuContainerComponent };
export { ɵ0, ɵ1, ɵ2, ɵ3, ɵ4 };
