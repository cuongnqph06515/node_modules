/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { EditorCommand, Command } from '../common/commands';
import { TableData } from '../common/table-data.interface';
/**
 * @hidden
 * exported for tests
 */
export declare const insertTable: (attrs: TableData) => Command;
/**
 * @hidden
 */
export declare const editorCommands: Partial<Record<EditorCommand, (attr?: any) => Command>>;
