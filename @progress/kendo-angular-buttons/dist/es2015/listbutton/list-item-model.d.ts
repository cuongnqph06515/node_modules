/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/**
 * Represents the item models of the Kendo UI DropDownButton and SplitButton components. These are the interface fields that the items use.
 *
 * @example
 * ```ts
 * import { ListItemModel } from '@progress/kendo-angular-buttons';
 *
 * _@Component({
 * selector: 'my-app',
 * template: `
 *  <kendo-splitbutton [data]="listItems">SplitButton</kendo-splitbutton>
 * `
 * })
 * class AppComponent {
 *   public listItems: ListItemModel[] = [{
 *      text: 'item1',
 *      icon: 'refresh',
 *      click: (dataItem: any) => {
 *          //action
 *      }
 *  }, {
 *      text: 'item2',
 *      iconClass: 'test icon class',
 *      click: (dataItem: any) => {
 *          //action
 *      }
 *  }, {
 *      text: 'item3',
 *      imageUrl: 'https://demos.telerik.com/kendo-ui/content/web/toolbar/upload.png',
 *      click: (dataItem: any) => {
 *          //action
 *      }
 *  }, {
 *      text: 'item4',
 *      disabled: true,
 *      click: (dataItem: any) => {
 *          //action
 *      }
 *  }]
 * }
 * ```
 */
export interface ListItemModel {
    /**
     * Sets the text of the item.
     */
    text?: string;
    /**
     * Defines an icon to be rendered next to the title.
     */
    icon?: string;
    /**
     * Defines an icon with a custom CSS class to be rendered next to the title.
     */
    iconClass?: string;
    /**
     * Defines the location of an image to be displayed next to the title.
     */
    imageUrl?: string;
    /**
     * When set to `true`, disables a button list item.
     */
    disabled?: boolean;
    /**
     * An event handler that is emitted when an item is clicked.
     */
    click?: (dataItem?: any) => void;
}
