/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Subject } from "rxjs";
/**
 * @hidden
 */
export declare abstract class ExpandStateService {
    protected isInitiallyCollapsed: boolean;
    changes: Subject<any>;
    protected rowState: any;
    constructor(isInitiallyCollapsed: boolean);
    toggleRow(id: any, dataItem: any): void;
    isExpanded(id: any): boolean;
    reset(): void;
    protected emitEvent(args: any): boolean;
}
