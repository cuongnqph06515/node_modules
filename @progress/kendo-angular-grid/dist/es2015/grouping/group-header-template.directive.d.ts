/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { TemplateRef } from '@angular/core';
/**
 * Represents the group-header cell template of the Grid which helps to customize the content of the group header item.
 * To define the group header template, nest an `<ng-template>` tag with the `kendoGridGroupHeaderTemplate`
 * directive inside `<kendo-grid-column>`.
 *
 * The template context is set to the current data item and the following additional fields are passed:
 * - `group`&mdash;The current group item.
 * - `field`&mdash;The name of the field by which data is grouped.
 * - `value`&mdash;The current group value.
 * - `aggregates`&mdash;All aggregate values for the current group.
 * - `index`&mdash;The index of the current group.
 * - `expanded`&mdash;A boolean value indicating if the group is currently expanded.
 * ([see example]({% slug groupable_grid_with_aggregates %})).
 *
 * @example
 * ```ts
 * import { process } from '@progress/kendo-data-query';
 *
 * _@Component({
 *     selector: 'my-app',
 *     template: `
 *         <kendo-grid [data]="gridData" [group]="groups">
 *             <kendo-grid-column field="ProductName">
 *                 <ng-template kendoGridGroupHeaderTemplate let-group let-field="field" let-value="value">
 *                    <strong>{{field}}</strong>: {{value}}
 *                 </ng-template>
 *             </kendo-grid-column>
 *         </kendo-grid>
 *     `
 * })
 *
 * class AppComponent {
 *     public groups = [{ field: "ProductName" }];
 *
 *     public gridData = process([{
 *         "ProductID": 1,
 *         "ProductName": "Chai",
 *         "UnitPrice": 18.0000,
 *         "Discontinued": false
 *       }, {
 *         "ProductID": 2,
 *         "ProductName": "Chang",
 *         "UnitPrice": 19.0000,
 *         "Discontinued": true
 *       }
 *     ], {
 *      group: this.groups
 *     });
 * }
 *
 * ```
 */
export declare class GroupHeaderTemplateDirective {
    templateRef: TemplateRef<any>;
    constructor(templateRef: TemplateRef<any>);
}
