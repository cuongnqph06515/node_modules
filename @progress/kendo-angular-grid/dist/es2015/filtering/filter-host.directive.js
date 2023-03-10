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
export class FilterHostDirective {
    constructor(host, resolver) {
        this.host = host;
        this.resolver = resolver;
    }
    ngOnInit() {
        this.component = this.host.createComponent(this.resolver.resolveComponentFactory(this.componentType()));
        this.initComponent({
            column: this.column,
            filter: this.filter
        });
    }
    ngOnDestroy() {
        if (this.component) {
            this.component.destroy();
            this.component = null;
        }
    }
    ngOnChanges(changes) {
        if (anyChanged(["column", "filter"], changes)) {
            this.initComponent({
                column: this.column,
                filter: this.filter
            });
        }
    }
    initComponent({ column, filter }) {
        const instance = this.component.instance;
        instance.column = column;
        instance.filter = filter;
    }
}
FilterHostDirective.propDecorators = {
    column: [{ type: Input }],
    filter: [{ type: Input }]
};
