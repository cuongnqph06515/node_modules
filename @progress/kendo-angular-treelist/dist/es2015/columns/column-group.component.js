/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
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
export class ColumnGroupComponent extends ColumnBase {
    constructor(parent, optionChanges) {
        super(parent, optionChanges);
        /**
         * @hidden
         */
        this.includeInChooser = false;
        /**
         * @hidden
         */
        this.isColumnGroup = true;
        /**
         * @hidden
         */
        this.minResizableWidth = 10;
        if (parent && parent.isSpanColumn) {
            throw new Error('ColumnGroupComponent cannot be nested inside SpanColumnComponent');
        }
    }
    /**
     * @hidden
     */
    rowspan() {
        return 1;
    }
    /**
     * @hidden
     */
    get colspan() {
        if (!this.children || this.children.length === 1) {
            return 1;
        }
        return columnsSpan(this.children
            .filter(child => child !== this && child.isVisible));
    }
    /**
     * @hidden
     */
    get leafIndex() {
        return this.children ? (this.children.toArray()[1] || {}).leafIndex : -1;
    }
}
ColumnGroupComponent.decorators = [
    { type: Component, args: [{
                providers: [
                    {
                        provide: ColumnBase,
                        useExisting: forwardRef(() => ColumnGroupComponent)
                    }
                ],
                selector: 'kendo-treelist-column-group',
                template: ``
            },] },
];
/** @nocollapse */
ColumnGroupComponent.ctorParameters = () => [
    { type: ColumnBase, decorators: [{ type: SkipSelf }, { type: Host }, { type: Optional }] },
    { type: OptionChangesService }
];
ColumnGroupComponent.propDecorators = {
    children: [{ type: ContentChildren, args: [ColumnBase,] }]
};
