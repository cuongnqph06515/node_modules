/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/* tslint:disable:member-ordering */
import { Component, Renderer2, forwardRef, ElementRef, Input, Output, EventEmitter, ContentChild, ViewChild, ViewContainerRef, TemplateRef, HostBinding, isDevMode, ChangeDetectorRef, NgZone } from '@angular/core';
import { isDocumentAvailable, KendoInput, hasObservers } from '@progress/kendo-angular-common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { SearchBarComponent } from '../common/searchbar.component';
import { ItemTemplateDirective } from '../common/templates/item-template.directive';
import { HeaderTemplateDirective } from '../common/templates/header-template.directive';
import { FooterTemplateDirective } from '../common/templates/footer-template.directive';
import { GroupTemplateDirective } from '../common/templates/group-template.directive';
import { FixedGroupTemplateDirective } from '../common/templates/fixed-group-template.directive';
import { SelectionService } from '../common/selection/selection.service';
import { NavigationService } from '../common/navigation/navigation.service';
import { DisabledItemsService } from '../common/disabled-items/disabled-items.service';
import { Subject, merge } from 'rxjs';
import { isPresent, guid, getter, isUntouched, noop } from '../common/util';
import { NavigationAction } from '../common/navigation/navigation-action';
import { NoDataTemplateDirective } from '../common/templates/no-data-template.directive';
import { PreventableEvent } from '../common/models/preventable-event';
import { LocalizationService, L10N_PREFIX } from '@progress/kendo-angular-l10n';
import { PopupService } from '@progress/kendo-angular-popup';
import { FilterableDropDownComponentBase } from '../common/filtering/filterable-base.component';
import { DataService } from '../common/data.service';
import { ListComponent } from '../common/list.component';
import { normalizeVirtualizationSettings } from '../common/models/virtualization-settings';
const NO_VALUE = "";
/**
 * @hidden
 */
export const AUTOCOMPLETE_VALUE_ACCESSOR = {
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AutoCompleteComponent)
};
/**
 * Represents the [Kendo UI AutoComplete component for Angular]({% slug overview_autocomplete %}).
 *
 * @example
 * ```ts
 * _@Component({
 * selector: 'my-app',
 * template: `
 *  <kendo-autocomplete
 *      [data]="listItems"
 *      [placeholder]="placeholder"
 *  >
 * `
 * })
 * class AppComponent {
 *   public placeholder: string = 'Type "it" for suggestions';
 *   public listItems: Array<string> = ["Item 1", "Item 2", "Item 3", "Item 4"];
 * }
 * ```
 */
export class AutoCompleteComponent {
    constructor(localization, dataService, popupService, selectionService, navigationService, disabledItemsService, _zone, cdr, renderer, wrapper) {
        this.localization = localization;
        this.dataService = dataService;
        this.popupService = popupService;
        this.selectionService = selectionService;
        this.navigationService = navigationService;
        this.disabledItemsService = disabledItemsService;
        this._zone = _zone;
        this.cdr = cdr;
        this.renderer = renderer;
        /**
         * Defines whether the first match from the suggestions list will be automatically focused.
         * By default, `highlightFirst` is set to `true`.
         */
        this.highlightFirst = true;
        /**
         * @hidden
         */
        this.focusableId = `k-${guid()}`;
        /**
         * The hint which is displayed when the component is empty.
         */
        this.placeholder = "";
        /**
         * Sets the height of the suggestions list. By default, `listHeight` is 200px.
         *
         * > The `listHeight` property affects only the list of suggestions and not the whole popup container.
         * > To set the height of the popup container, use `popupSettings.height`.
         */
        this.listHeight = 200;
        /**
         * @hidden
         *
         * If set to `true`, renders a button on hovering over the component.
         * Clicking this button resets the value of the component to `undefined` and triggers the `change` event.
         */
        this.clearButton = true;
        /**
         * Sets the disabled state of the component.
         */
        this.disabled = false;
        /**
         * Sets the read-only state of the component.
         */
        this.readonly = false;
        /**
         * Specifies the [`tabindex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) of the component.
         */
        this.tabindex = 0;
        /**
         * Enables the [filtering]({% slug filtering_autocomplete %}) functionality.
         * If set to `true`, the component emits the `filterChange` event.
         */
        this.filterable = false;
        /**
         * Fires each time the value is changed&mdash;
         * when the component is blurred or the value is cleared through the **Clear** button
         * ([see example]({% slug overview_autocomplete %}#toc-events)).
         * When the value of the component is programmatically changed to `ngModel` or `formControl`
         * through its API or form binding, the `valueChange` event is not triggered because it
         * might cause a mix-up with the built-in `valueChange` mechanisms of the `ngModel` or `formControl` bindings.
         */
        this.valueChange = new EventEmitter();
        /**
         * Fires each time the user types in the input field.
         * You can filter the source based on the passed filtration value
         * ([see example]({% slug overview_autocomplete %}#toc-events)).
         */
        this.filterChange = new EventEmitter();
        /**
         * Fires each time the popup is about to open.
         * This event is preventable. If you cancel it, the popup will remain closed.
         */
        this.open = new EventEmitter();
        /**
         * Fires each time the popup is about to close.
         * This event is preventable. If you cancel it, the popup will remain open.
         */
        this.close = new EventEmitter();
        /**
         * Fires each time the user focuses the AutoComplete.
         */
        this.onFocus = new EventEmitter();
        /**
         * Fires each time the AutoComplete gets blurred.
         */
        this.onBlur = new EventEmitter();
        this.widgetClasses = true;
        this.listBoxId = guid();
        this.optionPrefix = guid();
        this.onChangeCallback = noop;
        this.onTouchedCallback = noop;
        this.popupMouseDownHandler = (event) => event.preventDefault();
        this._popupSettings = { animate: true };
        this._open = false;
        this._value = "";
        this.valueChangeSubject = new Subject();
        this._isFocused = false;
        this.direction = localization.rtl ? 'rtl' : 'ltr';
        this.wrapper = wrapper.nativeElement;
        this.data = [];
        this.subscribeEvents();
        this.selectionService.resetSelection([-1]);
    }
    get width() {
        let wrapperOffsetWidth = 0;
        if (isDocumentAvailable()) {
            wrapperOffsetWidth = this.wrapper.offsetWidth;
        }
        const width = this.popupSettings.width || wrapperOffsetWidth;
        const minWidth = isNaN(wrapperOffsetWidth) ? wrapperOffsetWidth : `${wrapperOffsetWidth}px`;
        const maxWidth = isNaN(width) ? width : `${width}px`;
        return { min: minWidth, max: maxWidth };
    }
    get height() {
        const popupHeight = this.popupSettings.height;
        return isPresent(popupHeight) ? `${popupHeight}px` : 'auto';
    }
    get listContainerClasses() {
        const containerClasses = ['k-list-container', 'k-reset'];
        if (this.popupSettings.popupClass) {
            containerClasses.push(this.popupSettings.popupClass);
        }
        return containerClasses;
    }
    get suggestion() {
        if (!this.text || !this.suggestedText) {
            this.suggestedText = undefined;
            return;
        }
        const hasMatch = this.suggestedText.toLowerCase().startsWith(this.text.toLowerCase());
        const shouldSuggest = this.suggest && !this.backspacePressed;
        if (shouldSuggest && hasMatch) {
            return this.suggestedText;
        }
    }
    get appendTo() {
        const { appendTo } = this.popupSettings;
        if (!appendTo || appendTo === 'root') {
            return undefined;
        }
        return appendTo === 'component' ? this.container : appendTo;
    }
    /**
     * Toggles the visibility of the popup.
     * If you use the `toggle` method to open or close the popup, the `open` and `close` events will not be fired.
     *
     * @param open - The state of the popup.
     */
    toggle(open) {
        Promise.resolve(null).then(() => {
            const shouldOpen = isPresent(open) ? open : !this._open;
            this._toggle(shouldOpen);
        });
    }
    /**
     * Returns the current open state of the popup.
     */
    get isOpen() {
        return this._open;
    }
    /**
     * @hidden
     */
    togglePopup(open) {
        const isDisabled = this.disabled || this.readonly;
        const sameState = this.isOpen === open;
        if (isDisabled || sameState) {
            return;
        }
        const isDefaultPrevented = this.triggerPopupEvents(open);
        if (!isDefaultPrevented) {
            this._toggle(open);
        }
    }
    get activeDescendant() {
        if (!this.isOpen || !isPresent(this.selectionService.focused) || this.selectionService.focused === -1) {
            return null;
        }
        const dataItem = this.dataService.itemAt(this.selectionService.focused);
        return this.optionPrefix + "-" + getter(dataItem, this.valueField);
    }
    get noDataLabel() {
        if (this.data.length === 0) {
            return this.noDataText;
        }
    }
    get clearTitle() {
        return this.localization.get('clearTitle');
    }
    /**
     * Sets the data of the AutoComplete.
     *
     * > The data has to be provided in an array-like list.
     */
    set data(data) {
        this.dataService.data = data || [];
        if (this.virtual) {
            this.virtual.skip = 0;
        }
        if (this.filterable) {
            this.selectionService.focused = this.isOpen && this.data.length && this.highlightFirst ? this.firstFocusableIndex(0) : -1;
        }
        if (this.suggest && this.dataService.itemsCount > 0) {
            this.suggestedText = getter(this.dataService.itemAt(0), this.valueField);
        }
    }
    get data() {
        const virtual = this.virtual;
        if (virtual) {
            const start = virtual.skip || 0;
            const end = start + virtual.pageSize;
            // Use length instead of itemsCount because of the grouping.
            virtual.total = this.dataService.data.length;
            return this.dataService.data.slice(start, end);
        }
        return this.dataService.data;
    }
    /**
     * Sets the value of the AutoComplete.
     */
    set value(newValue) {
        this.verifySettings(newValue);
        this._value = newValue || NO_VALUE;
        this.text = this.value;
        this.cdr.markForCheck();
    }
    get value() {
        return this._value || NO_VALUE;
    }
    /**
     * Configures the popup of the AutoComplete.
     *
     * The available options are:
     * - `animate: Boolean`&mdash;Controls the popup animation. By default, the open and close animations are enabled.
     * - `width: Number | String`&mdash;Sets the width of the popup container. By default, the width of the host element is used. If set to `auto`, the component automatically adjusts the width of the popup and no item labels are wrapped. The `auto` mode is not supported when virtual scrolling is enabled.
     * - `height: Number`&mdash;Sets the height of the popup container.
     * - `popupClass: String`&mdash;Specifies a list of CSS classes that are used to style the popup.
     * - `appendTo: "root" | "component" | ViewContainerRef`&mdash;Specifies the component to which the popup will be appended.
     */
    set popupSettings(settings) {
        this._popupSettings = Object.assign({ animate: true }, settings);
    }
    get popupSettings() {
        return this._popupSettings;
    }
    /**
     * Defines a Boolean function that is executed for each data item in the component
     * ([see examples]({% slug disableditems_autocomplete %})).
     * Determines whether the item will be disabled.
     */
    set itemDisabled(fn) {
        if (typeof fn !== 'function') {
            throw new Error(`itemDisabled must be a function, but received ${JSON.stringify(fn)}.`);
        }
        this.disabledItemsService.itemDisabled = fn;
    }
    /**
     * @hidden
     */
    set tabIndex(tabIndex) {
        this.tabindex = tabIndex;
    }
    get tabIndex() {
        return this.tabindex;
    }
    /**
     * Enables the [virtualization]({% slug virtualization_autocomplete %}) functionality.
     */
    set virtual(settings) {
        this._virtualSettings = normalizeVirtualizationSettings(settings);
    }
    get virtual() {
        return this._virtualSettings;
    }
    get isFocused() {
        return this._isFocused;
    }
    set isFocused(isFocused) {
        this.renderer[isFocused ? 'addClass' : 'removeClass'](this.wrapper, "k-state-focused");
        this._isFocused = isFocused;
    }
    get isDisabled() {
        return this.disabled;
    }
    get dir() {
        return this.direction;
    }
    ngOnInit() {
        this.renderer.removeAttribute(this.wrapper, "tabindex");
        this.localizationChangeSubscription = this.localization
            .changes
            .subscribe(({ rtl }) => {
            this.direction = rtl ? 'rtl' : 'ltr';
            this.setMessages();
        });
        this.setMessages();
    }
    ngOnDestroy() {
        this.destroyPopup();
        this.unsubscribeEvents();
        clearTimeout(this.messagesTimeout);
        if (this.localizationChangeSubscription) {
            this.localizationChangeSubscription.unsubscribe();
        }
    }
    ngOnChanges(changes) {
        const virtual = this.virtual;
        const requestInitialData = virtual && changes.data && changes.data.isFirstChange();
        if (requestInitialData) {
            this.pageChange({ skip: 0, take: virtual.pageSize });
        }
    }
    /**
     * Resets the value of the AutoComplete.
     * If you use the `reset` method to clear the value of the component,
     * the model will not update automatically and the `selectionChange` and `valueChange` events will not be fired.
     */
    reset() {
        this.value = NO_VALUE;
    }
    /**
     * @hidden
     */
    clearValue(event) {
        event.stopImmediatePropagation();
        this.focus();
        this.change(NO_VALUE);
        if (this.filterable) {
            this.filterChange.emit('');
        }
        this.selectionService.resetSelection([]);
    }
    /**
     * @hidden
     */
    writeValue(value) {
        this.value = value;
    }
    /**
     * @hidden
     */
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    /**
     * @hidden
     */
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
    /**
     * @hidden
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    /**
     * Focuses the AutoComplete.
     */
    focus() {
        if (!this.disabled) {
            this.searchbar.focus();
        }
    }
    /**
     * Blurs the AutoComplete.
     */
    blur() {
        if (!this.disabled) {
            this.searchbar.blur();
        }
    }
    /**
     * @hidden
     */
    onResize() {
        if (this._open) {
            const popupWrapper = this.popupRef.popupElement;
            const { min, max } = this.width;
            popupWrapper.style.minWidth = min;
            popupWrapper.style.width = max;
        }
    }
    emitChange(value) {
        this.onChangeCallback(value);
        this.valueChange.emit(value);
    }
    verifySettings(newValue) {
        if (!isDevMode()) {
            return;
        }
        if (isPresent(newValue) && typeof newValue !== "string") {
            throw new Error("Expected value of type string. See https://www.telerik.com/kendo-angular-ui/components/dropdowns/autocomplete/value-binding/");
        }
    }
    search(text, startFrom = 0) {
        let index;
        if (text.length && this.dataService.itemsCount) {
            index = this.dataService.findIndex(this.findIndexPredicate(text), startFrom);
        }
        else {
            index = -1;
        }
        if (this.disabledItemsService.isIndexDisabled(index)) {
            if (index + 1 < this.dataService.itemsCount) {
                this.search(text, index + 1);
            }
            else {
                this.selectionService.focus(-1);
            }
        }
        else {
            this.selectionService.focus(index);
            if (this.suggest) {
                this.suggestedText = getter(this.dataService.itemAt(index), this.valueField);
            }
        }
    }
    navigate(index) {
        if (!this.isOpen) {
            return;
        }
        this.selectionService.focus(index);
    }
    /**
     * @hidden
     */
    handleNavigate(event) {
        const focused = isNaN(this.selectionService.focused) ? this.firstFocusableIndex(0) : this.selectionService.focused;
        if (this.disabled || this.readonly || isNaN(focused)) {
            return;
        }
        const action = this.navigationService.process({
            current: focused,
            max: this.dataService.itemsCount - 1,
            min: 0,
            originalEvent: event
        });
        if (action !== NavigationAction.Undefined &&
            action !== NavigationAction.Backspace &&
            action !== NavigationAction.Delete &&
            action !== NavigationAction.Home &&
            action !== NavigationAction.End &&
            action !== NavigationAction.Left &&
            action !== NavigationAction.Right &&
            ((action === NavigationAction.Enter && this.isOpen) || action !== NavigationAction.Enter)) {
            event.preventDefault();
        }
    }
    handleEnter(event) {
        const focused = this.selectionService.focused;
        let value;
        if (this.isOpen) {
            event.originalEvent.preventDefault();
        }
        if (focused >= 0) {
            value = getter(this.dataService.itemAt(focused), this.valueField);
        }
        else {
            const match = this.suggest && this.suggestedText && this.data.length &&
                getter(this.dataService.itemAt(0), this.valueField, true).toLowerCase() === this.searchbar.value.toLowerCase();
            if (this.isOpen && match) {
                value = this.suggestedText;
            }
            else {
                value = this.searchbar.value;
            }
        }
        this.change(value);
    }
    handleEscape() {
        this.togglePopup(false);
        this.selectionService.focused = -1;
        this.suggestedText = null;
    }
    /**
     * @hidden
     */
    searchBarChange(text) {
        const currentTextLength = isPresent(this.text) ? this.text.length : 0;
        this.backspacePressed = (text.length < currentTextLength) ? true : false;
        this.text = text;
        this.togglePopup(text.length > 0);
        if (!this.highlightFirst) {
            this.selectionService.focused = -1;
        }
        if (this.filterable) {
            this.filterChange.emit(text);
        }
        else if (this.highlightFirst) {
            this.search(text);
        }
    }
    /**
     * @hidden
     */
    handleFocus() {
        this.isFocused = true;
        if (hasObservers(this.onFocus)) {
            this._zone.run(() => {
                this.onFocus.emit();
            });
        }
    }
    /**
     * @hidden
     */
    handleBlur() {
        const focused = this.filterable ? this.selectionService.focused : -1;
        this.searchbar.input.nativeElement.scrollLeft = 0; // Firefox doesn't auto-scroll to the left on blur like other browsers
        let dataItem;
        let text;
        if (focused !== -1) {
            dataItem = this.dataService.itemAt(focused);
            text = getter(dataItem, this.valueField, true) || "";
        }
        else {
            text = this.searchbar.value;
        }
        const exactMatch = text === this.searchbar.value;
        const insensitiveMatch = text.toLowerCase() === this.searchbar.value.toLowerCase();
        if (!exactMatch && insensitiveMatch) {
            this.selectionService.resetSelection([]);
        }
        this.isFocused = false;
        const valueHasChanged = this.value !== this.text;
        const runInZone = hasObservers(this.onBlur) || hasObservers(this.close) || isUntouched(this.wrapper) || valueHasChanged;
        if (runInZone) {
            this._zone.run(() => {
                if (valueHasChanged) {
                    this.change(this.searchbar.value);
                }
                this.onBlur.emit();
                this.onTouchedCallback();
                this.togglePopup(false);
            });
        }
        else {
            this.togglePopup(false);
        }
    }
    /**
     * @hidden
     */
    pageChange(event) {
        const virtual = this.virtual;
        virtual.skip = event.skip;
    }
    change(value) {
        this.togglePopup(false);
        this.valueChangeSubject.next(value);
    }
    subscribeEvents() {
        if (!isDocumentAvailable()) {
            return;
        }
        this.valueChangeSubscription = this.valueChangeSubject
            .subscribe(value => {
            const hasChange = this.value !== value;
            this.value = value;
            this.text = value;
            // emit change after assigning `this.value` => allows the user to modify the component value on `valueChange`
            if (hasChange) {
                this.emitChange(value);
            }
        });
        this.changeSubscription = this.selectionService.onChange.subscribe(this.handleItemChange.bind(this));
        this.focusSubscription = this.selectionService.onFocus.subscribe(this.handleItemFocus.bind(this));
        this.navigationSubscription = merge(this.navigationService.up, this.navigationService.down).subscribe((event) => this.navigate(event.index));
        this.closeSubscription = this.navigationService.close.subscribe(() => this.togglePopup(false));
        this.enterSubscription = this.navigationService.enter.subscribe(this.handleEnter.bind(this));
        this.escSubscription = this.navigationService.esc.subscribe(this.handleEscape.bind(this));
    }
    unsubscribeEvents() {
        if (!isDocumentAvailable()) {
            return;
        }
        this.changeSubscription.unsubscribe();
        this.navigationSubscription.unsubscribe();
        this.closeSubscription.unsubscribe();
        this.enterSubscription.unsubscribe();
        this.escSubscription.unsubscribe();
        this.valueChangeSubscription.unsubscribe();
        this.focusSubscription.unsubscribe();
    }
    handleItemChange(event) {
        const index = event.indices.length ? event.indices[0] : undefined;
        this.selectionService.resetSelection([-1]);
        if (!isPresent(index)) {
            return;
        }
        let text = getter(this.dataService.itemAt(index), this.valueField);
        this.change(text);
    }
    handleItemFocus(_event) {
        const focused = this.selectionService.focused;
        const shouldSuggest = Boolean(this.suggest && this.data && this.data.length && focused >= 0);
        if (shouldSuggest) {
            this.suggestedText = getter(this.dataService.itemAt(focused), this.valueField);
        }
    }
    createPopup() {
        if (this.virtual) {
            this.virtual.skip = 0;
        }
        const horizontalAlign = this.direction === "rtl" ? "right" : "left";
        const anchorPosition = { horizontal: horizontalAlign, vertical: "bottom" };
        const popupPosition = { horizontal: horizontalAlign, vertical: "top" };
        this.popupRef = this.popupService.open({
            anchor: this.wrapper,
            animate: this.popupSettings.animate,
            appendTo: this.appendTo,
            content: this.popupTemplate,
            popupClass: this.listContainerClasses,
            positionMode: 'absolute',
            popupAlign: popupPosition,
            anchorAlign: anchorPosition
        });
        const popupWrapper = this.popupRef.popupElement;
        const { min, max } = this.width;
        popupWrapper.addEventListener('mousedown', this.popupMouseDownHandler);
        popupWrapper.style.minWidth = min;
        popupWrapper.style.width = max;
        popupWrapper.style.height = this.height;
        popupWrapper.setAttribute("dir", this.direction);
        this.popupRef.popupOpen.subscribe(() => {
            this.cdr.detectChanges();
            this.optionsList.scrollToItem(this.selectionService.focused);
        });
        this.popupRef.popupAnchorViewportLeave.subscribe(() => this.togglePopup(false));
    }
    destroyPopup() {
        if (this.popupRef) {
            this.popupRef.popupElement
                .removeEventListener('mousedown', this.popupMouseDownHandler);
            this.popupRef.close();
            this.popupRef = null;
        }
    }
    _toggle(open) {
        this._open = open;
        this.destroyPopup();
        if (this._open) {
            this.createPopup();
        }
    }
    triggerPopupEvents(open) {
        const eventArgs = new PreventableEvent();
        if (open) {
            this.open.emit(eventArgs);
        }
        else {
            this.close.emit(eventArgs);
        }
        return eventArgs.isDefaultPrevented();
    }
    firstFocusableIndex(index) {
        const maxIndex = this.data.length - 1;
        if (this.disabledItemsService.isIndexDisabled(index)) {
            return (index < maxIndex) ? this.firstFocusableIndex(index + 1) : undefined;
        }
        else {
            return index;
        }
    }
    findIndexPredicate(text) {
        if (this.dataService.grouped) {
            return (item) => {
                let itemText = getter(item.value, this.valueField);
                itemText = !isPresent(itemText) ? "" : itemText.toString().toLowerCase();
                return itemText.startsWith(text.toLowerCase());
            };
        }
        else {
            return (item) => {
                let itemText = getter(item, this.valueField);
                itemText = !isPresent(itemText) ? "" : itemText.toString().toLowerCase();
                return itemText.startsWith(text.toLowerCase());
            };
        }
    }
    setMessages() {
        this._zone.runOutsideAngular(() => {
            clearTimeout(this.messagesTimeout);
            this.messagesTimeout = setTimeout(() => {
                this.noDataText = this.localization.get('noDataText');
                this.cdr.detectChanges();
            });
        });
    }
}
AutoCompleteComponent.decorators = [
    { type: Component, args: [{
                exportAs: 'kendoAutoComplete',
                providers: [
                    AUTOCOMPLETE_VALUE_ACCESSOR,
                    DataService,
                    SelectionService,
                    NavigationService,
                    DisabledItemsService,
                    LocalizationService,
                    {
                        provide: L10N_PREFIX,
                        useValue: 'kendo.autocomplete'
                    },
                    {
                        provide: FilterableDropDownComponentBase,
                        useExisting: forwardRef(() => AutoCompleteComponent)
                    },
                    {
                        provide: KendoInput,
                        useExisting: forwardRef(() => AutoCompleteComponent)
                    }
                ],
                selector: 'kendo-autocomplete',
                template: `
        <ng-container kendoAutoCompleteLocalizedMessages
            i18n-noDataText="kendo.autocomplete.noDataText|The text displayed in the popup when there are no items"
            noDataText="NO DATA FOUND"

            i18n-clearTitle="kendo.autocomplete.clearTitle|The title of the clear button"
            clearTitle="clear"
        >
        </ng-container>
        <kendo-searchbar #searchbar
            [role]="'combobox'"
            [id]="focusableId"
            [listId]="listBoxId"
            [activeDescendant]="activeDescendant"
            [noDataLabel]="noDataLabel"
            [userInput]="text"
            [suggestedText]="suggestion"
            [disabled]="disabled"
            [readonly]="readonly"
            [tabIndex]="tabIndex"
            [popupOpen]="isOpen"
            [placeholder]="placeholder"
            (onNavigate)="handleNavigate($event)"
            (valueChange)="searchBarChange($event)"
            (onBlur)="handleBlur()"
            (onFocus)="handleFocus()"
        ></kendo-searchbar>
        <span *ngIf="!loading && !readonly && (clearButton && text?.length)" class="k-icon k-clear-value k-i-close" [attr.title]="clearTitle" role="button" tabindex="-1" (click)="clearValue($event)" (mousedown)="$event.preventDefault()">
</span>
        <span *ngIf="loading" class="k-icon k-i-loading"></span>
        <ng-template #popupTemplate>
            <!--header template-->
            <ng-template *ngIf="headerTemplate"
                [templateContext]="{
                    templateRef: headerTemplate.templateRef
                }">
            </ng-template>
            <!--list-->
            <kendo-list
                #optionsList
                [id]="listBoxId"
                [optionPrefix]="optionPrefix"
                [data]="data"
                [textField]="valueField"
                [valueField]="valueField"
                [template]="template"
                [groupTemplate]="groupTemplate"
                [fixedGroupTemplate]="fixedGroupTemplate"
                [height]="listHeight"
                [show]="isOpen"
                [virtual]="virtual"
                (pageChange)="pageChange($event)"
            >
            </kendo-list>
            <!--no-data template-->
            <div class="k-nodata" *ngIf="data.length === 0">
                <ng-template [ngIf]="noDataTemplate"
                    [templateContext]="{
                        templateRef: noDataTemplate?.templateRef
                    }">
                </ng-template>
                <ng-template [ngIf]="!noDataTemplate">
                    <div>{{ noDataText }}</div>
                </ng-template>
            </div>
            <!--footer template-->
            <ng-template *ngIf="footerTemplate"
                [templateContext]="{
                    templateRef: footerTemplate.templateRef
                }">
            </ng-template>
        </ng-template>
        <ng-template [ngIf]="isOpen">
            <kendo-resize-sensor (resize)="onResize()"></kendo-resize-sensor>
        </ng-template>
        <ng-container #container></ng-container>
  `
            },] },
];
/** @nocollapse */
AutoCompleteComponent.ctorParameters = () => [
    { type: LocalizationService },
    { type: DataService },
    { type: PopupService },
    { type: SelectionService },
    { type: NavigationService },
    { type: DisabledItemsService },
    { type: NgZone },
    { type: ChangeDetectorRef },
    { type: Renderer2 },
    { type: ElementRef }
];
AutoCompleteComponent.propDecorators = {
    highlightFirst: [{ type: Input }],
    focusableId: [{ type: Input }],
    data: [{ type: Input }],
    value: [{ type: Input }],
    valueField: [{ type: Input }],
    placeholder: [{ type: Input }],
    popupSettings: [{ type: Input }],
    listHeight: [{ type: Input }],
    loading: [{ type: Input }],
    clearButton: [{ type: Input }],
    suggest: [{ type: Input }],
    disabled: [{ type: Input }],
    itemDisabled: [{ type: Input }],
    readonly: [{ type: Input }],
    tabindex: [{ type: Input }],
    tabIndex: [{ type: Input, args: ["tabIndex",] }],
    filterable: [{ type: Input }],
    virtual: [{ type: Input }],
    valueChange: [{ type: Output }],
    filterChange: [{ type: Output }],
    open: [{ type: Output }],
    close: [{ type: Output }],
    onFocus: [{ type: Output, args: ['focus',] }],
    onBlur: [{ type: Output, args: ['blur',] }],
    template: [{ type: ContentChild, args: [ItemTemplateDirective,] }],
    headerTemplate: [{ type: ContentChild, args: [HeaderTemplateDirective,] }],
    footerTemplate: [{ type: ContentChild, args: [FooterTemplateDirective,] }],
    noDataTemplate: [{ type: ContentChild, args: [NoDataTemplateDirective,] }],
    groupTemplate: [{ type: ContentChild, args: [GroupTemplateDirective,] }],
    fixedGroupTemplate: [{ type: ContentChild, args: [FixedGroupTemplateDirective,] }],
    container: [{ type: ViewChild, args: ['container', { read: ViewContainerRef },] }],
    popupTemplate: [{ type: ViewChild, args: ['popupTemplate',] }],
    searchbar: [{ type: ViewChild, args: [SearchBarComponent,] }],
    optionsList: [{ type: ViewChild, args: ['optionsList',] }],
    widgetClasses: [{ type: HostBinding, args: ['class.k-widget',] }, { type: HostBinding, args: ['class.k-autocomplete',] }, { type: HostBinding, args: ['class.k-header',] }],
    isDisabled: [{ type: HostBinding, args: ['class.k-state-disabled',] }],
    dir: [{ type: HostBinding, args: ['attr.dir',] }]
};
