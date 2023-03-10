/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { QueryList } from '@angular/core';
import { ColumnBase } from './column-base';
import { OptionChangesService } from '../common/option-changes.service';
/**
 * @hidden
 */
export declare function isColumnGroupComponent(column: any): column is ColumnGroupComponent;
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
export declare class ColumnGroupComponent extends ColumnBase {
    /**
     * @hidden
     */
    includeInChooser: boolean;
    /**
     * @hidden
     */
    isColumnGroup: boolean;
    /**
     * @hidden
     */
    minResizableWidth: number;
    /**
     * @hidden
     */
    children: QueryList<ColumnBase>;
    constructor(parent?: ColumnBase, optionChanges?: OptionChangesService);
    /**
     * @hidden
     */
    rowspan(): number;
    /**
     * @hidden
     */
    readonly colspan: number;
    /**
     * @hidden
     */
    readonly leafIndex: number;
}
