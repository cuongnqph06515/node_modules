/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { EventEmitter } from '@angular/core';
import { ToolBarToolComponent } from './toolbar-tool.component';
/**
 * @hidden
 */
export declare class ToolBarButtonListComponent extends ToolBarToolComponent {
    data: any[];
    textField: string;
    itemClick: EventEmitter<any>;
    getText(dataItem: any): any;
    onClick(item: any): void;
}
