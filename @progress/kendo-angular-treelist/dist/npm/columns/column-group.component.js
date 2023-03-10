/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var column_base_1 = require("./column-base");
var column_common_1 = require("./column-common");
var option_changes_service_1 = require("../common/option-changes.service");
/**
 * @hidden
 */
function isColumnGroupComponent(column) {
    return column.isColumnGroup;
}
exports.isColumnGroupComponent = isColumnGroupComponent;
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
            return column_common_1.columnsSpan(this.children
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
        { type: core_1.Component, args: [{
                    providers: [
                        {
                            provide: column_base_1.ColumnBase,
                            useExisting: core_1.forwardRef(function () { return ColumnGroupComponent; })
                        }
                    ],
                    selector: 'kendo-treelist-column-group',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    ColumnGroupComponent.ctorParameters = function () { return [
        { type: column_base_1.ColumnBase, decorators: [{ type: core_1.SkipSelf }, { type: core_1.Host }, { type: core_1.Optional }] },
        { type: option_changes_service_1.OptionChangesService }
    ]; };
    ColumnGroupComponent.propDecorators = {
        children: [{ type: core_1.ContentChildren, args: [column_base_1.ColumnBase,] }]
    };
    return ColumnGroupComponent;
}(column_base_1.ColumnBase));
exports.ColumnGroupComponent = ColumnGroupComponent;
