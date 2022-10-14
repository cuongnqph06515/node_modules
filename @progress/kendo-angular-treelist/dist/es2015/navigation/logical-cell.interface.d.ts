/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { FocusGroup } from './focus-group';
/**
 * @hidden
 */
export interface LogicalCell {
    uid: number;
    logicalColIndex: number;
    logicalRowIndex: number;
    rowSpan?: number;
    colSpan?: number;
    colIndex?: number;
    focusGroup: FocusGroup;
}
