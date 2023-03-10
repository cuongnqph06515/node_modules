/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { EventEmitter } from '@angular/core';
/* tslint:disable:deprecation */
import { fromEvent, merge } from "rxjs";
import { filter } from 'rxjs/operators';
import { KeyEvents } from './../navigation/key-events';
import { NavigationAction } from './../navigation/navigation-action';
import { isDocumentAvailable, guid } from '@progress/kendo-angular-common';
import { isPresent } from './../util';
/**
 * @hidden
 */
export class ListButton {
    constructor(focusService, navigationService, wrapperRef, _zone, localization) {
        this.focusService = focusService;
        this.navigationService = navigationService;
        this.wrapperRef = wrapperRef;
        this._zone = _zone;
        this._open = false;
        this._disabled = false;
        this._active = false;
        this._popupSettings = { animate: true, popupClass: '' };
        this.listId = guid();
        this._isFocused = false;
        this.wrapperBlurred = new EventEmitter();
        this.focusService = focusService;
        this.navigationService = navigationService;
        this.wrapper = wrapperRef.nativeElement;
        this.localizationChangeSubscription = localization.changes.subscribe(({ rtl }) => this.direction = rtl ? 'rtl' : 'ltr');
        this.subscribeEvents();
    }
    get popupClasses() {
        var popupClasses = [
            'k-list-container',
            'k-reset',
            'k-group'
        ];
        if (this._popupSettings.popupClass) {
            popupClasses.push(this._popupSettings.popupClass);
        }
        return popupClasses.join(' ');
    }
    get openState() {
        return this._open;
    }
    set openState(open) {
        this._open = open;
    }
    /**
     * @hidden
     */
    togglePopupVisibility() {
        if (this._disabled) {
            return;
        }
        this.openState = !this.openState;
        if (!this.openState) {
            this.focusService.focus(-1);
        }
    }
    /**
     * @hidden
     */
    onItemClick(index) {
        this.emitItemClickHandler(index);
        setTimeout(() => { this.focusWrapper(); }, 1);
    }
    ngOnDestroy() {
        this.openState = false;
        this.unsubscribeEvents();
        clearTimeout(this.focusFirstTimeout);
        clearTimeout(this.blurTimeout);
        if (this.localizationChangeSubscription) {
            this.localizationChangeSubscription.unsubscribe();
        }
    }
    subscribeEvents() {
        if (!isDocumentAvailable()) {
            return;
        }
        this.subscribeListItemFocusEvent();
        this.subscribeComponentBlurredEvent();
        this.subscribeNavigationEvents();
    }
    subscribeListItemFocusEvent() {
        this.focusSubscription = this.focusService.onFocus.subscribe(() => {
            this._isFocused = true;
        });
    }
    subscribeComponentBlurredEvent() {
        this._zone.runOutsideAngular(() => {
            this.documentClick = fromEvent(document, 'click').pipe(filter((event) => {
                return !this.wrapperContains(event.target);
            }));
            this.tabSubscription = this.navigationService.tab.pipe(filter(() => this._isFocused)).subscribe(this.handleTab.bind(this));
            this.componentBlurredSubscription = merge(this.documentClick, this.wrapperBlurred).pipe(filter(() => this._isFocused)).subscribe(() => this._zone.run(() => this.blurWrapper()));
        });
    }
    subscribeNavigationEvents() {
        this.navigationSubscription = this.navigationService.navigate
            .subscribe(this.focusService.focus.bind(this.focusService));
        this.enterPressSubscription = this.navigationService.enterpress.subscribe(() => {
            if (!this._disabled && !this._open) {
                this._active = true;
            }
        });
        this.enterUpSubscription = this.navigationService.enterup.subscribe(() => {
            if (!this._open) {
                this._active = false;
            }
            this.enterHandler();
            this.focusWrapper();
        });
        this.openSubscription = this.navigationService.open.subscribe(() => {
            if (!this._open) {
                this.togglePopupVisibility();
                this.focusFirstItem();
            }
            else {
                this.focusWrapper();
            }
        });
        this.closeSubscription = merge(this.navigationService.close, this.navigationService.esc).subscribe(() => this.focusWrapper());
    }
    enterHandler() { } // tslint:disable-line
    unsubscribeEvents() {
        if (!isDocumentAvailable()) {
            return;
        }
        this.unsubscribe(this.componentBlurredSubscription);
        this.unsubscribe(this.focusSubscription);
        this.unsubscribe(this.navigationSubscription);
        this.unsubscribe(this.enterPressSubscription);
        this.unsubscribe(this.enterUpSubscription);
        this.unsubscribe(this.openSubscription);
        this.unsubscribe(this.closeSubscription);
        this.unsubscribe(this.tabSubscription);
    }
    unsubscribe(subscription) {
        if (subscription) {
            subscription.unsubscribe();
        }
    }
    /**
     * @hidden
     */
    keyDownHandler(event) {
        this.keyHandler(event);
    }
    /**
     * @hidden
     */
    keyPressHandler(event) {
        this.keyHandler(event, KeyEvents.keypress);
    }
    /**
     * @hidden
     */
    keyUpHandler(event) {
        this.keyHandler(event, KeyEvents.keyup);
    }
    /**
     * @hidden
     */
    keyHandler(event, keyEvent) {
        if (this._disabled) {
            return;
        }
        let focused = this.focusService.focused || 0;
        const eventData = event;
        const action = this.navigationService.process({
            altKey: eventData.altKey,
            current: focused,
            keyCode: eventData.keyCode,
            keyEvent: keyEvent,
            max: this._data ? this._data.length - 1 : 0,
            min: 0
        });
        if (action !== NavigationAction.Undefined &&
            action !== NavigationAction.Tab &&
            (action !== NavigationAction.Enter || (action === NavigationAction.Enter && this._open))) {
            eventData.preventDefault();
        }
    }
    emitItemClickHandler(index) {
        const dataItem = this._data[index];
        if (this._itemClick) {
            this._itemClick.emit(dataItem);
        }
        if (dataItem && dataItem.click && !dataItem.disabled) {
            dataItem.click(dataItem);
        }
    }
    focusFirstItem() {
        if (this._data && isPresent(this._data[0])) {
            this.focusFirstTimeout = setTimeout(() => { this.focusService.focus(0); }, 1);
        }
    }
    focusWrapper() {
        if (this._open) {
            this.togglePopupVisibility();
            this.focusButton();
        }
    }
    /**
     * @hidden
     */
    blurHandler() {
        if (!isDocumentAvailable()) {
            return;
        }
        this.blurTimeout = setTimeout(() => {
            if (!this.wrapperContains(document.activeElement)) {
                this.blurWrapper();
            }
        });
    }
    wrapperContains(element) {
        return this.wrapper === element || this.wrapper.contains(element);
    }
    blurWrapper() {
        if (this._open) {
            this.togglePopupVisibility();
        }
        this._isFocused = false;
        this._blur.emit();
    }
    focusButton() {
        if (this.button) {
            this.button.nativeElement.focus();
        }
    }
    handleTab() {
        this.focusButton();
        this.blurWrapper();
    }
}
