/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var column_component_1 = require("../../columns/column.component");
var filter_service_1 = require("../filter.service");
var base_filter_cell_component_1 = require("../base-filter-cell.component");
var utils_1 = require("../../utils");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var filter_descriptor_differ_1 = require("../../common/filter-descriptor-differ");
var isNoValueOperator = function (operator) { return (operator === "isnull"
    || operator === "isnotnull"
    || operator === "isempty"
    || operator === "isnotempty"); };
var ɵ0 = isNoValueOperator;
exports.ɵ0 = ɵ0;
var validFilters = function (_a) {
    var value = _a.value, operator = _a.operator;
    return !utils_1.isNullOrEmptyString(value) || isNoValueOperator(operator);
};
var ɵ1 = validFilters;
exports.ɵ1 = ɵ1;
var trimFilters = function (filter) {
    filter.filters = filter.filters.filter(validFilters);
    return filter;
};
var ɵ2 = trimFilters;
exports.ɵ2 = ɵ2;
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
exports.ɵ3 = ɵ3;
var parentLogicOfDefault = function (filter, field, def) {
    if (def === void 0) { def = "and"; }
    var parent = findParent(((filter || {}).filters || []), field);
    return utils_1.isPresent(parent) ? parent.logic : def;
};
var ɵ4 = parentLogicOfDefault;
exports.ɵ4 = ɵ4;
/**
 * @hidden
 */
var FilterMenuContainerComponent = /** @class */ (function () {
    function FilterMenuContainerComponent(parentService, childService, localization, cd) {
        this.parentService = parentService;
        this.childService = childService;
        this.localization = localization;
        this.cd = cd;
        this.close = new core_1.EventEmitter();
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
            this._filter = filter_descriptor_differ_1.cloneFilters(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterMenuContainerComponent.prototype, "childFilter", {
        get: function () {
            if (!utils_1.isPresent(this._childFilter)) {
                this._childFilter = {
                    filters: base_filter_cell_component_1.filtersByField(this.filter, (this.column || {}).field),
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
            return utils_1.isPresent(this.column) && utils_1.isPresent(this.column.filterMenuTemplateRef);
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
            base_filter_cell_component_1.removeFilter(root, this.column.field);
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
        base_filter_cell_component_1.removeFilter(root, this.column.field);
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
        { type: core_1.Component, args: [{
                    providers: [filter_service_1.FilterService],
                    selector: 'kendo-treelist-filter-menu-container',
                    template: "\n        <form (submit)=\"submit()\" (reset)=\"reset()\"\n            class=\"k-filter-menu k-group k-reset k-state-border-up\">\n            <div class=\"k-filter-menu-container\">\n                <ng-container [ngSwitch]=\"hasTemplate\">\n                    <ng-container *ngSwitchCase=\"false\">\n                        <ng-container\n                            kendoFilterMenuHost\n                            [filterService]=\"childService\"\n                            [column]=\"column\"\n                            [filter]=\"childFilter\">\n                        </ng-container>\n                    </ng-container>\n                    <ng-container *ngSwitchCase=\"true\">\n                        <ng-template\n                            *ngIf=\"column.filterMenuTemplateRef\"\n                            [ngTemplateOutlet]=\"column.filterMenuTemplateRef\"\n                            [ngTemplateOutletContext]=\"templateContext\"\n                            >\n                        </ng-template>\n                    </ng-container>\n                </ng-container>\n                <div [ngClass]=\"actionsClass\">\n                    <button type=\"reset\" class=\"k-button\">{{clearText}}</button>\n                    <button type=\"submit\" class=\"k-button k-primary\" [disabled]=\"disabled\">{{filterText}}</button>\n                </div>\n            </div>\n        </form>\n    "
                },] },
    ];
    /** @nocollapse */
    FilterMenuContainerComponent.ctorParameters = function () { return [
        { type: filter_service_1.FilterService, decorators: [{ type: core_1.SkipSelf }] },
        { type: filter_service_1.FilterService },
        { type: kendo_angular_l10n_1.LocalizationService },
        { type: core_1.ChangeDetectorRef }
    ]; };
    FilterMenuContainerComponent.propDecorators = {
        close: [{ type: core_1.Output }],
        column: [{ type: core_1.Input }],
        filter: [{ type: core_1.Input }],
        actionsClass: [{ type: core_1.Input }]
    };
    return FilterMenuContainerComponent;
}());
exports.FilterMenuContainerComponent = FilterMenuContainerComponent;
