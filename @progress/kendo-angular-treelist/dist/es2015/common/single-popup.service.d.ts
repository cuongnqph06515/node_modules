/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { PopupService, PopupRef } from '@progress/kendo-angular-popup';
import { Renderer2, NgZone, OnDestroy } from '@angular/core';
import { PreventableEvent } from './preventable-event';
import { Subject } from 'rxjs';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { ScrollSyncService } from '../scrolling/scroll-sync.service';
/**
 * Arguments for the `close` event of the filter and column-menu popup.
 */
export declare class PopupCloseEvent extends PreventableEvent {
    /**
     * The original DOM event that causes the popup to close.
     */
    originalEvent: any;
    constructor(e: any);
}
/**
 * The service that is used for the popups of the filter and column menus
 * ([see example]({% slug reusablecustomfilters_treelist %}#toc-filter-menu-with-popup)).
 */
export declare class SinglePopupService implements OnDestroy {
    private popupService;
    private renderer;
    private ngZone;
    private localization;
    /**
     * Fires when the filter or column menus are about to close because the user clicked outside their popups.
     * Used to prevent the popup from closing.
     */
    readonly onClose: Subject<PopupCloseEvent>;
    private removeClick;
    private popupRef;
    private scrollSubscription;
    constructor(popupService: PopupService, renderer: Renderer2, ngZone: NgZone, scrollSyncService: ScrollSyncService, localization: LocalizationService);
    /**
     * @hidden
     */
    open(anchor: any, template: any, popupRef: PopupRef, popupClass?: string): PopupRef;
    /**
     * @hidden
     */
    destroy(): void;
    ngOnDestroy(): void;
    private detachClose;
    private attachClose;
}
