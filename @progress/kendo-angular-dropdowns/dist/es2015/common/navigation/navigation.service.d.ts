/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { EventEmitter } from '@angular/core';
import { NavigationAction } from './navigation-action';
import { DisabledItemsService } from '../disabled-items/disabled-items.service';
import { SelectionService } from '../selection/selection.service';
/**
 * @hidden
 */
export declare class NavigationEvent {
    index: number;
    originalEvent: KeyboardEvent;
    /**
     * The index of the item to which the user navigated.
     */
    constructor(index: number, originalEvent: KeyboardEvent);
}
/**
 * @hidden
 */
export declare class NavigationService {
    private disabledItemsService;
    private selectionService;
    open: EventEmitter<NavigationEvent>;
    close: EventEmitter<NavigationEvent>;
    enter: EventEmitter<NavigationEvent>;
    tab: EventEmitter<NavigationEvent>;
    esc: EventEmitter<NavigationEvent>;
    up: EventEmitter<NavigationEvent>;
    right: EventEmitter<NavigationEvent>;
    down: EventEmitter<NavigationEvent>;
    left: EventEmitter<NavigationEvent>;
    delete: EventEmitter<NavigationEvent>;
    backspace: EventEmitter<NavigationEvent>;
    home: EventEmitter<NavigationEvent>;
    end: EventEmitter<NavigationEvent>;
    constructor(disabledItemsService: DisabledItemsService, selectionService: SelectionService);
    process(args: any): NavigationAction;
    private next;
    private clampIndex;
    private firstFocusableIndex;
    private isDisabled;
}
