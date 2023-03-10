/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { OnDestroy, OnInit } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { Orientation } from '../common/orientation';
import { DraggableDirective } from '@progress/kendo-angular-common';
import { SplitterService } from './splitter.service';
/**
 * @hidden
 */
export declare class SplitterBarComponent implements OnInit, OnDestroy {
    draggable: DraggableDirective;
    private splitter;
    private localization;
    orientation: Orientation;
    readonly direction: string;
    index: number;
    ariaRole: string;
    focused: boolean;
    private subscriptions;
    readonly tabIndex: number;
    readonly hostClasses: string;
    readonly touchAction: string;
    readonly order: number;
    collapseAny(): void;
    onFocusIn(): void;
    onFocusOut(): void;
    onKeyDown(event: any): void;
    private readonly expandLast;
    constructor(draggable: DraggableDirective, splitter: SplitterService, localization: LocalizationService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    togglePrevious(): void;
    toggleNext(): void;
    previousArrowClass(): string;
    nextArrowClass(): string;
    private tryToggleNearest;
}
