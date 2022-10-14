/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Mark } from '@progress/kendo-editor-common';
/**
 * @hidden
 */
export interface ActiveMarks {
    marks: Mark[];
    hasNodesWithoutMarks: boolean;
}
