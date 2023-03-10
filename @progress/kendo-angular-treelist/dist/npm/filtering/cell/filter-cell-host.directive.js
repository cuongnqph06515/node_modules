/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var filter_host_directive_1 = require("../filter-host.directive");
var utils_1 = require("../../utils");
var filter_cell_component_factory_1 = require("./filter-cell-component.factory");
var string_filter_cell_component_1 = require("./string-filter-cell.component");
/**
 * @hidden
 */
var FilterCellHostDirective = /** @class */ (function (_super) {
    tslib_1.__extends(FilterCellHostDirective, _super);
    function FilterCellHostDirective(host, resolver) {
        return _super.call(this, host, resolver) || this;
    }
    FilterCellHostDirective.prototype.componentType = function () {
        if (!utils_1.isNullOrEmptyString(this.column.filter)) {
            return filter_cell_component_factory_1.filterComponentFactory(this.column.filter);
        }
        return string_filter_cell_component_1.StringFilterCellComponent;
    };
    FilterCellHostDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[kendoFilterCellHost]'
                },] },
    ];
    /** @nocollapse */
    FilterCellHostDirective.ctorParameters = function () { return [
        { type: core_1.ViewContainerRef },
        { type: core_1.ComponentFactoryResolver }
    ]; };
    return FilterCellHostDirective;
}(filter_host_directive_1.FilterHostDirective));
exports.FilterCellHostDirective = FilterCellHostDirective;
