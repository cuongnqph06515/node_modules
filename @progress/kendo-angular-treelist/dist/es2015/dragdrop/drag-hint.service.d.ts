/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Sanitizer } from '@angular/core';
/**
 * @hidden
 */
export declare class DragHintService {
    private santizer;
    private dom;
    private initialTop;
    private initialLeft;
    constructor(santizer: Sanitizer);
    create(down: any, target: Element, title: string): void;
    attach(): Function;
    remove(): void;
    show(): void;
    hide(): void;
    enable(): void;
    disable(): void;
    removeLock(): void;
    toggleLock(locked: boolean): void;
    move(move: any): void;
    private initCoords;
}
