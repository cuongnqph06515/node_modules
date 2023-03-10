/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { TemplateRef } from '@angular/core';
/**
 * Renders the grouped tag values in the MultiSelect
 * ([see example]({% slug summarytagmode_multiselect %})).
 * The template context is set to the current component.
 * To get a reference to the current grouped
 * data items collection, use the `let-dataItems` directive.
 *
 * > The `GroupTagTemplate` directive can only be used with the MultiSelect component.
 *
 * @example
 * ```ts
 * _@Component({
 * selector: 'my-app',
 * template: `
 *  <kendo-multiselect kendoMultiSelectSummaryTag [data]="items">
 *    <ng-template kendoMultiSelectGroupTagTemplate let-dataItems>
 *      <span>{{dataItems.length}} item(s) selected</span>
 *    </ng-template>
 *  </kendo-multiselect>
 * `
 * })
 * class AppComponent {
 *   public items: Array<string> = ["Item 1", "Item 2", "Item 3", "Item 4"];
 * }
 * ```
 */
export declare class GroupTagTemplateDirective {
    templateRef: TemplateRef<any>;
    constructor(templateRef: TemplateRef<any>);
}
