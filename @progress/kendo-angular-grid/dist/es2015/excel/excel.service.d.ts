/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { EventEmitter } from '@angular/core';
/**
 * @hidden
 */
export declare class ExcelService {
    saveToExcel: EventEmitter<any>;
    exportClick: EventEmitter<any>;
    save(component: any): void;
}
