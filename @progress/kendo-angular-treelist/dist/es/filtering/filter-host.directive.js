/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Input } from '@angular/core';
import { ColumnComponent } from '../columns/column.component';
import { anyChanged } from '../utils';
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
        if (anyChanged(["column", "filter"], changes)) {
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
        column: [{ type: Input }],
        filter: [{ type: Input }]
    };
    return FilterHostDirective;
}());
export { FilterHostDirective };
