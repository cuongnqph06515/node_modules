/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { Component, forwardRef, SkipSelf, Host, Optional, QueryList, ContentChildren } from '@angular/core';
import { ColumnBase } from './column-base';
import { columnsSpan } from './column-common';
import { OptionChangesService } from '../common/option-changes.service';
/**
 * @hidden
 */
export function isColumnGroupComponent(column) {
    return column.isColumnGroup;
}
/**
 * Represents the column group header of the TreeList
 * ([more information and examples]({% slug multicolumnheaders_columns_treelist %})).
 *
 * {% meta height:533 %}
 * {% embed_file configuration/multi-column-headers/app.component.ts preview %}
 * {% embed_file shared/app.module.ts %}
 * {% embed_file shared/main.ts %}
 * {% embed_file shared/filesystem.ts %}
 * {% endmeta %}
 */
var ColumnGroupComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ColumnGroupComponent, _super);
    function ColumnGroupComponent(parent, optionChanges) {
        var _this = _super.call(this, parent, optionChanges) || this;
        /**
         * @hidden
         */
        _this.includeInChooser = false;
        /**
         * @hidden
         */
        _this.isColumnGroup = true;
        /**
         * @hidden
         */
        _this.minResizableWidth = 10;
        if (parent && parent.isSpanColumn) {
            throw new Error('ColumnGroupComponent cannot be nested inside SpanColumnComponent');
        }
        return _this;
    }
    /**
     * @hidden
     */
    ColumnGroupComponent.prototype.rowspan = function () {
        return 1;
    };
    Object.defineProperty(ColumnGroupComponent.prototype, "colspan", {
        /**
         * @hidden
         */
        get: function () {
            var _this = this;
            if (!this.children || this.children.length === 1) {
                return 1;
            }
            return columnsSpan(this.children
                .filter(function (child) { return child !== _this && child.isVisible; }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnGroupComponent.prototype, "leafIndex", {
        /**
         * @hidden
         */
        get: function () {
            return this.children ? (this.children.toArray()[1] || {}).leafIndex : -1;
        },
        enumerable: true,
        configurable: true
    });
    ColumnGroupComponent.decorators = [
        { type: Component, args: [{
                    providers: [
                        {
                            provide: ColumnBase,
                            useExisting: forwardRef(function () { return ColumnGroupComponent; })
                        }
                    ],
                    selector: 'kendo-treelist-column-group',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    ColumnGroupComponent.ctorParameters = function () { return [
        { type: ColumnBase, decorators: [{ type: SkipSelf }, { type: Host }, { type: Optional }] },
        { type: OptionChangesService }
    ]; };
    ColumnGroupComponent.propDecorators = {
        children: [{ type: ContentChildren, args: [ColumnBase,] }]
    };
    return ColumnGroupComponent;
}(ColumnBase));
export { ColumnGroupComponent };
