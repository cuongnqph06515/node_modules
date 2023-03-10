/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/**
 * Configures the `kendoDropDownFilter` directive.
 *
 * For more information, refer to the articles on using the built-in
 * `kendoDropDownFilter` directive with each DropDowns component:
 * * [AutoComplete]({% slug filtering_autocomplete %}#toc-built-in-directive)
 * * [ComboBox]({% slug filtering_combobox %}#toc-built-in-directive)
 * * [DropDownList]({% slug filtering_ddl %}#toc-built-in-directive)
 * * [MultiSelect]({% slug filtering_multiselect %}#toc-built-in-directive)
 *
 * @example
 * ```ts
 * _@Component({
 * selector: 'my-app',
 * template: `
 *  <kendo-autocomplete
 *      [data]="data"
 *      [kendoDropDownFilter]="filterSettings">
 *  </kendo-autocomplete>
 * `
 * })
 * class AppComponent {
 *     public data: Array<string> = ["Item 1", "Item 2", "Item 3", "Item 4"];
 *     public filterSettings: DropDownFilterSettings = {
 *         caseSensitive: false,
 *         operator: 'contains'
 *     };
 * }
 * ```
 */
export interface DropDownFilterSettings {
    /**
     * Determines whether the performed search will be case-sensitive or case-insensitive.
     * By default, the performed search is case-insensitive.
     */
    caseSensitive?: boolean;
    /**
     * Determines the operator for the search.
     *
     * The available options are:
     * * (Default) `startsWith`
     * * `contains`
     */
    operator?: 'startsWith' | 'contains';
}
