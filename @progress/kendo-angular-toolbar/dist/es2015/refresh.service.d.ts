/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { EventEmitter } from '@angular/core';
import { ToolBarToolComponent } from './tools/toolbar-tool.component';
/**
 * @hidden
 */
export declare class RefreshService {
    onRefresh: EventEmitter<any>;
    refresh(tool: ToolBarToolComponent): void;
}
