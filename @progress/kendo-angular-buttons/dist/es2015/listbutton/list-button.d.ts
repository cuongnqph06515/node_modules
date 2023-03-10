/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { EventEmitter, ElementRef, OnDestroy, NgZone } from '@angular/core';
import { Observable, Subscription } from "rxjs";
import { PopupSettings } from './popup-settings';
import { FocusService } from './../focusable/focus.service';
import { KeyEvents } from './../navigation/key-events';
import { NavigationService } from './../navigation/navigation.service';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { Direction } from '../direction';
/**
 * @hidden
 */
export declare class ListButton implements OnDestroy {
    protected focusService: FocusService;
    protected navigationService: NavigationService;
    protected wrapperRef: ElementRef;
    private _zone;
    protected _data: any;
    protected _open: boolean;
    protected _disabled: boolean;
    protected _active: boolean;
    protected _popupSettings: PopupSettings;
    protected listId: string;
    protected _isFocused: boolean;
    protected _itemClick: EventEmitter<any>;
    protected _blur: EventEmitter<any>;
    protected wrapper: HTMLElement;
    protected button: ElementRef;
    protected focusSubscription: Subscription;
    protected navigationSubscription: Subscription;
    protected enterPressSubscription: Subscription;
    protected enterUpSubscription: Subscription;
    protected openSubscription: Subscription;
    protected closeSubscription: Subscription;
    protected componentBlurredSubscription: Subscription;
    protected tabSubscription: Subscription;
    protected documentClick: Observable<{}>;
    protected wrapperBlurred: EventEmitter<any>;
    protected direction: Direction;
    protected focusFirstTimeout: any;
    protected blurTimeout: any;
    private localizationChangeSubscription;
    constructor(focusService: FocusService, navigationService: NavigationService, wrapperRef: ElementRef, _zone: NgZone, localization: LocalizationService);
    readonly popupClasses: string;
    openState: boolean;
    /**
     * @hidden
     */
    togglePopupVisibility(): void;
    /**
     * @hidden
     */
    onItemClick(index: number): void;
    ngOnDestroy(): void;
    protected subscribeEvents(): void;
    protected subscribeListItemFocusEvent(): void;
    protected subscribeComponentBlurredEvent(): void;
    protected subscribeNavigationEvents(): void;
    protected enterHandler(): void;
    protected unsubscribeEvents(): void;
    protected unsubscribe(subscription: Subscription): void;
    /**
     * @hidden
     */
    keyDownHandler(event: any): void;
    /**
     * @hidden
     */
    keyPressHandler(event: any): void;
    /**
     * @hidden
     */
    keyUpHandler(event: any): void;
    /**
     * @hidden
     */
    keyHandler(event: any, keyEvent?: KeyEvents): void;
    protected emitItemClickHandler(index: number): void;
    protected focusFirstItem(): void;
    protected focusWrapper(): void;
    /**
     * @hidden
     */
    blurHandler(): void;
    protected wrapperContains(element: any): boolean;
    protected blurWrapper(): void;
    protected focusButton(): void;
    protected handleTab(): void;
}
