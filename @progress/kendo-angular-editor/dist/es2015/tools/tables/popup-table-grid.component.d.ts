/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { EventEmitter } from '@angular/core';
/**
 * @hidden
 */
export declare class PopupTableGridComponent {
    cellClick: EventEmitter<{
        rows: number;
        cels: number;
    }>;
    tableWizardClick: EventEmitter<any>;
    private state;
    private rows;
    private cols;
    readonly message: string;
    readonly cells: any[];
    selected(index: number): boolean;
    setState(index: number): void;
    resetState(): void;
    insertTable(): void;
    openTableWizard(): void;
}
