/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var column_component_1 = require("../columns/column.component");
var utils_1 = require("../utils");
/**
 * @hidden
 */
var FilterHostDirective = /** @class */ (function () {
    function FilterHostDirective(host, resolver) {
        this.host = host;
        this.resolver = resolver;
    }
    FilterHostDirective.prototype.ngOnInit = function () {
        this.component = this.host.createComponent(this.resolver.resolveComponentFactory(this.componentType()));
        this.initComponent({
            column: this.column,
            filter: this.filter
        });
    };
    FilterHostDirective.prototype.ngOnDestroy = function () {
        if (this.component) {
            this.component.destroy();
            this.component = null;
        }
    };
    FilterHostDirective.prototype.ngOnChanges = function (changes) {
        if (utils_1.anyChanged(["column", "filter"], changes)) {
            this.initComponent({
                column: this.column,
                filter: this.filter
            });
        }
    };
    FilterHostDirective.prototype.initComponent = function (_a) {
        var column = _a.column, filter = _a.filter;
        var instance = this.component.instance;
        instance.column = column;
        instance.filter = filter;
    };
    FilterHostDirective.propDecorators = {
        column: [{ type: core_1.Input }],
        filter: [{ type: core_1.Input }]
    };
    return FilterHostDirective;
}());
exports.FilterHostDirective = FilterHostDirective;
