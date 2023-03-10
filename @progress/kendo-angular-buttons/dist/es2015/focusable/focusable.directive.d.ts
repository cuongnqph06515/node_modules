/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ElementRef, OnDestroy } from '@angular/core';
import { FocusService } from './focus.service';
/**
 * @hidden
 */
export declare class FocusableDirective implements OnDestroy {
    private focusService;
    index: number;
    private element;
    private focusSubscription;
    constructor(focusService: FocusService, elementRef: ElementRef);
    readonly focusedClassName: boolean;
    /**
     * @hidden
     */
    ngOnDestroy(): void;
    private subscribeEvents;
    private unsubscribeEvents;
}
