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
var filter_menu_component_factory_1 = require("./filter-menu-component.factory");
var string_filter_menu_component_1 = require("./string-filter-menu.component");
var filter_service_1 = require("../filter.service");
/**
 * @hidden
 */
var FilterMenuHostDirective = /** @class */ (function (_super) {
    tslib_1.__extends(FilterMenuHostDirective, _super);
    function FilterMenuHostDirective(host, resolver) {
        return _super.call(this, host, resolver) || this;
    }
    FilterMenuHostDirective.prototype.componentType = function () {
        if (utils_1.isPresent(this.column) && !utils_1.isNullOrEmptyString(this.column.filter)) {
            return filter_menu_component_factory_1.filterMenuComponentFactory(this.column.filter);
        }
        return string_filter_menu_component_1.StringFilterMenuComponent;
    };
    FilterMenuHostDirective.prototype.initComponent = function (ctx) {
        _super.prototype.initComponent.call(this, ctx);
        this.component.instance.filterService = this.filterService;
    };
    FilterMenuHostDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[kendoFilterMenuHost]'
                },] },
    ];
    /** @nocollapse */
    FilterMenuHostDirective.ctorParameters = function () { return [
        { type: core_1.ViewContainerRef },
        { type: core_1.ComponentFactoryResolver }
    ]; };
    FilterMenuHostDirective.propDecorators = {
        filterService: [{ type: core_1.Input }]
    };
    return FilterMenuHostDirective;
}(filter_host_directive_1.FilterHostDirective));
exports.FilterMenuHostDirective = FilterMenuHostDirective;
