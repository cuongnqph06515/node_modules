/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/* tslint:disable:member-ordering */
import { guid, isPresent, isArray, isObjectArray, resolveAllValues, selectedIndices, getter, isNumber, isObject, isUntouched } from '../common/util';
import { SearchBarComponent } from '../common/searchbar.component';
import { ViewChild, Renderer2, ViewContainerRef, Component, HostBinding, Input, ElementRef, TemplateRef, Output, EventEmitter, isDevMode, forwardRef, ContentChild, ChangeDetectorRef, KeyValueDiffers, NgZone, Optional, Inject } from '@angular/core';
import { Subscription, Subject, of } from 'rxjs';
import { catchError, filter, map, tap } from 'rxjs/operators';
import { isChanged, isDocumentAvailable, KendoInput, hasObservers, anyChanged } from '@progress/kendo-angular-common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectionService } from '../common/selection/selection.service';
import { NavigationService } from '../common/navigation/navigation.service';
import { NavigationAction } from '../common/navigation/navigation-action';
import { DisabledItemsService } from '../common/disabled-items/disabled-items.service';
import { Keys } from '@progress/kendo-angular-common';
import { ItemTemplateDirective } from '../common/templates/item-template.directive';
import { CustomItemTemplateDirective } from '../common/templates/custom-item-template.directive';
import { GroupTemplateDirective } from '../common/templates/group-template.directive';
import { FixedGroupTemplateDirective } from '../common/templates/fixed-group-template.directive';
import { HeaderTemplateDirective } from '../common/templates/header-template.directive';
import { FooterTemplateDirective } from '../common/templates/footer-template.directive';
import { TagTemplateDirective } from '../common/templates/tag-template.directive';
import { GroupTagTemplateDirective } from '../common/templates/group-tag-template.directive';
import { NoDataTemplateDirective } from '../common/templates/no-data-template.directive';
import { MultiselectMessages } from '../common/constants/error-messages';
import { PreventableEvent } from '../common/models/preventable-event';
import { RemoveTagEvent } from '../common/models/remove-tag-event';
import { LocalizationService, L10N_PREFIX } from '@progress/kendo-angular-l10n';
import { PopupService } from '@progress/kendo-angular-popup';
import { FilterableDropDownComponentBase } from '../common/filtering/filterable-base.component';
import { TOUCH_ENABLED } from '../common/constants/touch-enabled';
import { DataService } from '../common/data.service';
import { ListComponent } from '../common/list.component';
import { normalizeVirtualizationSettings } from '../common/models/virtualization-settings';
const MULTISELECT_VALUE_ACCESSOR = {
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    // tslint:disable-next-line:no-use-before-declare
    useExisting: forwardRef(() => MultiSelectComponent)
};
/**
 * Represents the [Kendo UI MultiSelect component for Angular]({% slug overview_multiselect %}).
 *
 * @example
 * ```ts
 * _@Component({
 * selector: 'my-app',
 * template: `
 *  <kendo-multiselect [data]="listItems">
 *  </kendo-multiselect>
 * `
 * })
 * class AppComponent {
 *   public listItems: Array<string> = ["Item 1", "Item 2", "Item 3", "Item 4"];
 * }
 * ```
 */
export class MultiSelectComponent {
    constructor(localization, popupService, dataService, selectionService, navigationService, disabledItemsService, cdr, differs, renderer, hostElement, _zone, touchEnabled) {
        this.localization = localization;
        this.popupService = popupService;
        this.dataService = dataService;
        this.selectionService = selectionService;
        this.navigationService = navigationService;
        this.disabledItemsService = disabledItemsService;
        this.cdr = cdr;
        this.differs = differs;
        this.renderer = renderer;
        this.hostElement = hostElement;
        this._zone = _zone;
        this.touchEnabled = touchEnabled;
        this.listBoxId = guid();
        this.tagListId = guid();
        this.tagPrefix = "tag-" + guid();
        this.optionPrefix = "option-" + guid();
        this.focusedTagIndex = undefined;
        /**
         * @hidden
         */
        this.focusableId = `k-${guid()}`;
        /**
         * Determines whether to close the options list of the MultiSelect after the item selection is finished
         * ([see example]({% slug openstate_multiselect %}#toc-keeping-the-options-list-open-while-on-focus)).
         * @default true
         */
        this.autoClose = true;
        /**
         * Specifies the [`tabindex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) of the component.
         */
        this.tabindex = 0;
        /**
         * Sets the disabled state of the component.
         */
        this.disabled = false;
        /**
         * Sets the read-only state of the component.
         */
        this.readonly = false;
        /**
         * Enables the [filtering]({% slug filtering_multiselect %}) functionality of the MultiSelect.
         */
        this.filterable = false;
        /**
         * Sets the height of the suggestions list. By default, `listHeight` is 200px.
         *
         * > The `listHeight` property affects only the list of suggestions and not the whole popup container.
         * > To set the height of the popup container, use `popupSettings.height`.
         */
        this.listHeight = 200;
        /**
         * If set to `true`, renders a button on hovering over the component.
         * Clicking this button resets the value of the component to an empty array and triggers the `change` event.
         */
        this.clearButton = true;
        /**
         * A user-defined callback function which receives an array of selected data items and maps them to an array of tags.
         *
         * @param { Any[] } dataItems - The selected data items from the list.
         * @returns { Any[] } - The tags that will be rendered by the component.
         */
        this.tagMapper = (tags) => tags || [];
        /**
         * Specifies whether the MultiSelect allows user-defined values that are not present in the dataset
         * ([more information and examples]({% slug custom_values_multiselect %})).
         * Defaults to `false`.
         */
        this.allowCustom = false;
        /**
         * A user-defined callback function which returns normalized custom values.
         * Typically used when the data items are different from type `string`.
         *
         * @param { Any } value - The custom value that is defined by the user.
         * @returns { Any }
         *
         * @example
         * ```ts
         * import { map } from 'rxjs/operators';
         *
         * _@Component({
         * selector: 'my-app',
         * template: `
         *   <kendo-multiselect
         *       [allowCustom]="true"
         *       [data]="listItems"
         *       [textField]="'text'"
         *       [valueField]="'value'"
         *       [valueNormalizer]="valueNormalizer"
         *       (valueChange)="onValueChange($event)"
         *   >
         *   </kendo-multiselect>
         * `
         * })
         *
         * class AppComponent {
         *   public listItems: Array<{ text: string, value: number }> = [
         *       { text: "Small", value: 1 },
         *       { text: "Medium", value: 2 },
         *       { text: "Large", value: 3 }
         *   ];
         *
         *   public onValueChange(value) {
         *       console.log("valueChange : ", value);
         *   }
         *
         *   public valueNormalizer = (text$: Observable<string>) => text$.pipe(map((text: string) => {
         *      return {
         *         value: Math.floor(Math.random() * (1000 - 100) + 1000), //generate unique valueField
         *         text: text };
         *   }));
         *
         * }
         * ```
         */
        this.valueNormalizer = (text) => text.pipe(map((userInput) => {
            const comparer = (item) => typeof item === 'string' && userInput.toLowerCase() === item.toLowerCase();
            const matchingValue = this.value.find(comparer);
            if (matchingValue) {
                return matchingValue;
            }
            const matchingItem = this.dataService.find(comparer);
            return matchingItem ? matchingItem : userInput;
        }));
        /**
         * Fires each time the user types in the input field.
         * You can filter the source based on the passed filtration value.
         */
        this.filterChange = new EventEmitter();
        /**
         * Fires each time the value is changed&mdash;
         * when the component is blurred or the value is cleared through the **Clear** button
         * ([see example]({% slug overview_multiselect %}#toc-events)).
         * When the value of the component is programmatically changed to `ngModel` or `formControl`
         * through its API or form binding, the `valueChange` event is not triggered because it
         * might cause a mix-up with the built-in `valueChange` mechanisms of the `ngModel` or `formControl` bindings.
         */
        this.valueChange = new EventEmitter();
        /**
         * Fires each time the popup is about to open
         * ([see example]({% slug openstate_multiselect %}#toc-preventing-opening-and-closing)).
         * This event is preventable. If you cancel it, the popup will remain closed.
         */
        this.open = new EventEmitter();
        /**
         * Fires each time the popup is about to close
         * ([see example]({% slug openstate_multiselect %}#toc-preventing-opening-and-closing)).
         * This event is preventable. If you cancel it, the popup will remain open.
         */
        this.close = new EventEmitter();
        /**
         * Fires each time the user focuses the MultiSelect.
         */
        this.onFocus = new EventEmitter(); //tslint:disable-line:no-output-rename
        /**
         * Fires each time the MultiSelect gets blurred.
         */
        this.onBlur = new EventEmitter(); //tslint:disable-line:no-output-rename
        /**
         * Fires each time a tag is about to be removed.
         * This event is preventable. If you cancel it, the tag will not be removed.
         */
        this.removeTag = new EventEmitter();
        this.widgetClasses = true;
        this.initialized = false;
        this.onChangeCallback = (_) => { };
        this.onTouchedCallback = (_) => { };
        this._placeholder = '';
        this._open = false;
        this._value = [];
        this._popupSettings = { animate: true };
        this._isFocused = false;
        this.selectedDataItems = [];
        this.customValueSubject = new Subject();
        this.observableSubscriptions = new Subscription();
        this.popupMouseDownHandler = this.onMouseDown.bind(this);
        this.data = [];
        this.direction = this.localization.rtl ? 'rtl' : 'ltr';
        this.subscribeEvents();
    }
    /**
     * Focuses the MultiSelect.
     */
    focus() {
        if (!this.disabled) {
            this.searchbar.focus();
        }
    }
    /**
     * @hidden
     */
    onSearchBarFocus() {
        if (!this.isFocused) {
            this.isFocused = true;
            if (hasObservers(this.onFocus)) {
                this._zone.run(() => {
                    this.onFocus.emit();
                });
            }
        }
    }
    /**
     * Blurs the MultiSelect.
     */
    blur() {
        if (!this.disabled) {
            this.searchbar.blur();
        }
    }
    /**
     * @hidden
     */
    onSearchBarBlur() {
        if (!this.isFocused) {
            return;
        }
        this.isFocused = false;
        if (hasObservers(this.onBlur) ||
            hasObservers(this.filterChange) ||
            hasObservers(this.close) ||
            isUntouched(this.hostElement.nativeElement)) {
            this._zone.run(() => {
                this.closePopup();
                if (!(this.isOpen && this.allowCustom)) {
                    this.clearFilter();
                }
                this.onBlur.emit();
                this.onTouchedCallback();
            });
        }
        else {
            if (!this.allowCustom) {
                this.clearFilter();
            }
            this.closePopup();
        }
    }
    /**
     * @hidden
     */
    wrapperMousedown(event) {
        const inputElement = this.searchbar.input.nativeElement;
        if (event.button === 0) {
            if (this.isFocused && this.isOpen && event.target === inputElement) {
                return;
            }
            if (!this.touchEnabled || (this.touchEnabled && event.target.tagName !== 'SPAN')) {
                this.searchbar.focus();
            }
            this.togglePopup(!this.isOpen);
            event.preventDefault();
        }
    }
    /**
     * @hidden
     */
    onMouseDown(event) {
        event.preventDefault();
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
    get appendTo() {
        const { appendTo } = this.popupSettings;
        if (!appendTo || appendTo === 'root') {
            return undefined;
        }
        return appendTo === 'component' ? this.container : appendTo;
    }
    /**
     * Sets the data of the MultiSelect.
     *
     * > The data has to be provided in an array-like list of items.
     */
    set data(data) {
        this.dataService.data = data || [];
        if (this.virtual) {
            this.virtual.skip = 0;
        }
        if (this.initialized) {
            this.setState(this.value);
        }
    }
    get data() {
        const virtual = this.virtual;
        if (virtual) {
            const start = virtual.skip || 0;
            const end = start + virtual.pageSize;
            //Use length instead of itemsCount because of grouping
            virtual.total = this.dataService.data.length;
            return this.dataService.data.slice(start, end);
        }
        return this.dataService.data;
    }
    /**
     * Sets the value of the MultiSelect. It can be either of the primitive (string, numbers) or of the complex (objects) type.
     * To define the type, use the `valuePrimitive` option.
     *
     * > All selected values which are not present in the source are ignored.
     */
    set value(values) {
        this._value = values ? values : [];
        if (!this.differ && this.value) {
            this.differ = this.differs.find(this.value).create();
        }
        this.valueChangeDetected = true;
        if (this.initialized) {
            this.setState(this.value);
        }
    }
    get value() {
        return this._value;
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
     * The hint which is displayed when the component is empty.
     * When the values are selected, it disappears.
     */
    set placeholder(text) {
        this._placeholder = text || '';
    }
    get placeholder() {
        return this.selectedDataItems.length ? '' : this._placeholder;
    }
    /**
     * Defines a Boolean function that is executed for each data item in the component
     * ([see examples]({% slug disableditems_multiselect %})). Determines whether the item will be disabled.
     */
    set itemDisabled(fn) {
        if (typeof fn !== 'function') {
            throw new Error(`itemDisabled must be a function, but received ${JSON.stringify(fn)}.`);
        }
        this.disabledItemsService.itemDisabled = fn;
    }
    /**
     * Enables the [virtualization]({% slug virtualization_multiselect %}) functionality.
     */
    set virtual(settings) {
        this._virtualSettings = normalizeVirtualizationSettings(settings);
    }
    get virtual() {
        return this._virtualSettings;
    }
    /**
     * Configures the popup of the MultiSelect.
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
     * Specifies the type of the selected value.
     * If set to `true`, the selected value has to be of the primitive type
     * ([more information and example]({% slug valuebinding_multiselect %}#toc-primitive-values-from-object-fields)).
     */
    set valuePrimitive(isPrimitive) {
        this._valuePrimitive = isPrimitive;
    }
    get valuePrimitive() {
        if (!isPresent(this._valuePrimitive)) {
            return !isPresent(this.valueField);
        }
        return this._valuePrimitive;
    }
    get dir() {
        return this.direction;
    }
    get disabledClass() {
        return this.disabled;
    }
    get listContainerClasses() {
        const containerClasses = ['k-list-container', 'k-reset'];
        if (this.popupSettings.popupClass) {
            containerClasses.push(this.popupSettings.popupClass);
        }
        return containerClasses;
    }
    get width() {
        let wrapperOffsetWidth = 0;
        if (isDocumentAvailable()) {
            wrapperOffsetWidth = this.wrapper.nativeElement.offsetWidth;
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
    get activeDescendant() {
        const focusedTagIndex = this.focusedTagIndex;
        const focusedListIndex = this.selectionService.focused;
        let prefix;
        let item;
        if (isPresent(focusedTagIndex) && !this.isOpen) {
            item = this.tags[focusedTagIndex];
            prefix = this.tagPrefix;
        }
        else if (isPresent(focusedListIndex) && focusedListIndex !== -1 && this.isOpen) {
            item = this.dataService.itemAt(focusedListIndex);
            prefix = this.optionPrefix;
        }
        else {
            return null;
        }
        return prefix + "-" + this.prop(this.valueField, this.valuePrimitive)(item);
    }
    get noDataLabel() {
        if (this.dataService.itemsCount === 0) {
            return this.noDataText;
        }
    }
    get clearTitle() {
        return this.localization.get('clearTitle');
    }
    /**
     * @hidden
     */
    verifySettings() {
        if (!isDevMode() || this.value.length === 0) {
            return;
        }
        if (!isArray(this.value)) {
            throw new Error(MultiselectMessages.array);
        }
        if (this.valuePrimitive === true && isObjectArray(this.value)) {
            throw new Error(MultiselectMessages.primitive);
        }
        if (this.valuePrimitive === false && !isObjectArray(this.value)) {
            throw new Error(MultiselectMessages.object);
        }
        const valueOrText = !isPresent(this.valueField) !== !isPresent(this.textField);
        if (valueOrText) {
            throw new Error(MultiselectMessages.textAndValue);
        }
    }
    /**
     * @hidden
     */
    change(event) {
        const isCustomItem = (isPresent(event.added) || isPresent(event.removed)) && (event.added === -1 || event.removed === -1);
        if (isCustomItem) {
            this.addCustomValue(this.text);
            return; // The change is emited asynchronosly.
        }
        // Existing items.
        if (isPresent(event.added)) {
            const dataItem = this.dataService.itemAt(event.added);
            const newItem = (this.valuePrimitive && isPresent(dataItem) && isPresent(dataItem[this.valueField])) ? dataItem[this.valueField] : dataItem;
            this.value = [...this.value, newItem];
        }
        if (isPresent(event.removed)) {
            const dataItem = this.dataService.itemAt(event.removed);
            const prop = this.prop(this.valueField, this.valuePrimitive);
            const filter = (item) => prop(item) !== prop(dataItem);
            this.value = this.value.filter(filter);
            this.selectionService.focused = event.removed;
            this.cdr.detectChanges();
        }
        this.emitValueChange();
    }
    /**
     * @hidden
     */
    setState(value) {
        let data = this.dataService.data;
        if (this.dataService.grouped) {
            data = data.filter(item => !item.header).map(item => item.value);
        }
        const selection = selectedIndices(this.value, data, this.valueField);
        this.selectionService.resetSelection(selection);
        if (this.isOpen && this.selectionService.focused === undefined) {
            if (this.dataService.itemsCount > 0) {
                this.selectionService.focused = this.firstFocusableIndex(0);
            }
            else if (this.allowCustom) {
                this.selectionService.focused = -1;
            }
        }
        if (this.valuePrimitive && !this.valueField) {
            this.selectedDataItems = value.slice();
        }
        if (isObjectArray(value) || this.valuePrimitive && this.valueField) {
            this.selectedDataItems = resolveAllValues(value, data, this.valueField);
        }
        if (this.selectedDataItems.length < value.length) {
            const prop = this.prop(this.valueField, this.valuePrimitive);
            this.selectedDataItems = value
                .map(current => {
                const dataItem = this.selectedDataItems.find(item => prop(item) === prop(current));
                return isPresent(dataItem) ? dataItem : this.resolveDataItemFromTags(current);
            })
                .filter(dataItem => isPresent(dataItem));
        }
        this.tags = this.tagMapper(this.selectedDataItems.slice(0));
        this.cdr.markForCheck();
    }
    /**
     * @hidden
     */
    handleFilter(text) {
        this.text = text;
        if (text && !this.isOpen) {
            this.openPopup();
        }
        if (this.filterable) {
            this.filterChange.emit(text);
        }
        else {
            this.searchTextAndFocus(text);
        }
        this.searchbar.setInputSize();
    }
    /**
     * @hidden
     */
    pageChange(event) {
        const virtual = this.virtual;
        virtual.skip = event.skip;
    }
    /**
     * @hidden
     */
    clearFilter() {
        if (this.filterable && this.text) {
            this.filterChange.emit("");
        }
        this.text = "";
        /* Clearing the value from the input as the setInputSize calculation will be incorrect otherwise.
         Calling cdr.detectChanges to clear the input value as a result of property binding
         causes JAWS to read outdated tag values in IE upon tag selection for some reason. */
        this.searchbar.input.nativeElement.value = "";
        this.searchbar.setInputSize();
    }
    /**
     * @hidden
     */
    handleNavigate(event) {
        const navigateInput = this.text && event.keyCode !== Keys.ArrowDown && event.keyCode !== Keys.ArrowUp;
        const selectValue = this.text && event.keyCode === Keys.Enter || event.keyCode === Keys.Escape;
        const deleteTag = !this.text && event.keyCode === Keys.Backspace && this.tags.length > 0;
        if (deleteTag) {
            this.handleBackspace();
            return;
        }
        if (this.disabled || navigateInput && !selectValue) {
            return;
        }
        const eventData = event;
        const focused = isNaN(this.selectionService.focused) ? -1 : this.selectionService.focused;
        const action = this.navigationService.process({
            current: focused,
            max: this.dataService.itemsCount - 1,
            min: this.allowCustom && this.text ? -1 : 0,
            open: this.isOpen,
            originalEvent: eventData
        });
        if (action !== NavigationAction.Undefined &&
            ((action === NavigationAction.Enter && this.isOpen) || action !== NavigationAction.Enter)) {
            event.preventDefault();
        }
    }
    /**
     * @hidden
     */
    handleRemoveTag(tagData) {
        const eventArgs = new RemoveTagEvent(tagData);
        if (this.disabled || this.readonly) {
            return;
        }
        this.focus();
        this.removeTag.emit(eventArgs);
        if (eventArgs.isDefaultPrevented()) {
            return;
        }
        if (tagData instanceof Array) {
            this.removeGroupTag(tagData);
        }
        else {
            this.removeSingleTag(tagData);
        }
        this.cdr.detectChanges();
    }
    /**
     * @hidden
     */
    clearAll(event) {
        event.stopImmediatePropagation();
        event.preventDefault();
        this.focus();
        this.clearFilter();
        this.reset();
        this.emitValueChange();
    }
    /**
     * @hidden
     */
    addCustomValue(text) {
        this.customValueSubject.next(text);
    }
    ngAfterContentChecked() {
        this.verifySettings();
    }
    ngDoCheck() {
        const valueChanges = this.differ && this.differ.diff(this.value);
        if (valueChanges && !this.valueChangeDetected) {
            this.setState(this.value);
        }
        this.valueChangeDetected = false;
    }
    ngOnInit() {
        this.renderer.removeAttribute(this.hostElement.nativeElement, "tabindex");
        this.createCustomValueStream();
        this.localizationChangeSubscription = this.localization
            .changes.subscribe(({ rtl }) => {
            this.direction = rtl ? 'rtl' : 'ltr';
            this.setMessages();
        });
        this.setMessages();
        this.setState(this.value);
        this.initialized = true;
    }
    ngOnChanges(changes) {
        const virtual = this.virtual;
        const requestInitialData = virtual && changes.data && changes.data.isFirstChange();
        if (requestInitialData) {
            this.pageChange({ skip: 0, take: virtual.pageSize });
        }
        if (isChanged('valueNormalizer', changes)) {
            this.createCustomValueStream();
        }
        if (anyChanged(['textField', 'valueField', 'valuePrimitive'], changes)) {
            this.setState(this.value);
        }
    }
    ngAfterViewInit() {
        this.searchbar.setInputSize();
    }
    ngOnDestroy() {
        this._toggle(false);
        this.unsubscribeEvents();
        clearTimeout(this.messagesTimeout);
        if (this.localizationChangeSubscription) {
            this.localizationChangeSubscription.unsubscribe();
        }
    }
    /**
     * Toggles the visibility of the popup
     * ([see example]({% slug openstate_multiselect %}#toc-setting-the-initially-opened-component)).
     * If you use the `toggle` method to open or close the popup, the respective `open` and `close` events will not be fired.
     *
     * @param open - The state of the popup.
     */
    toggle(open) {
        // The Promise is required for opening the popup on load.
        // Otherwise, the "Expression has changed..." type error will be thrown.
        Promise.resolve(null).then(() => {
            const shouldOpen = isPresent(open) ? open : !this._open;
            this._toggle(shouldOpen);
            this.cdr.markForCheck();
        });
    }
    /**
     * Returns the current open state of the popup.
     */
    get isOpen() {
        return this._open;
    }
    /**
     * Resets the value of the MultiSelect.
     * If you use the `reset` method to clear the value of the component,
     * the model will not update automatically and the `selectionChange` and `valueChange` events will not be fired.
     */
    reset() {
        this.text = "";
        this.value = [];
    }
    // NG MODEL BINDINGS
    /**
     * @hidden
     */
    writeValue(value) {
        this.value = value || [];
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
     * @hidden
     */
    onTagMapperChange() {
        this.tags = this.tagMapper(this.selectedDataItems.slice(0));
        this.cdr.markForCheck();
    }
    prop(field, usePrimitive) {
        return (dataItem) => {
            if (isPresent(dataItem)) {
                if (usePrimitive) {
                    return field && isObject(dataItem) ? dataItem[field] : dataItem;
                }
                else {
                    return dataItem[field];
                }
            }
            return null;
        };
    }
    set isFocused(isFocused) {
        this.renderer[isFocused ? 'addClass' : 'removeClass'](this.hostElement.nativeElement, 'k-state-focused');
        this._isFocused = isFocused;
    }
    get isFocused() {
        return this._isFocused;
    }
    subscribeEvents() {
        if (!isDocumentAvailable()) {
            return;
        }
        const isOpen = () => this.isOpen;
        const isClosed = () => !this.isOpen;
        const isTagFocused = () => !this.isOpen && this.focusedTagIndex !== undefined;
        [
            this.selectionService.onChange.subscribe(this.handleItemChange.bind(this)),
            this.navigationService.esc.subscribe(this.closePopup.bind(this)),
            this.navigationService.enter.pipe(filter(isOpen)).subscribe(this.handleEnter.bind(this)),
            this.navigationService.open.subscribe(this.openPopup.bind(this)),
            this.navigationService.close.subscribe(this.handleClose.bind(this)),
            this.navigationService.up.pipe(filter(isOpen)).subscribe((event) => this.handleUp(event.index)),
            this.navigationService.home.pipe(filter(() => isClosed)).subscribe(this.handleHome.bind(this)),
            this.navigationService.end.pipe(filter(() => isClosed)).subscribe(this.handleEnd.bind(this)),
            this.navigationService.backspace.pipe(filter(isTagFocused)).subscribe(this.handleBackspace.bind(this)),
            this.navigationService.delete.pipe(filter(isTagFocused)).subscribe(this.handleDelete.bind(this)),
            this.navigationService.left.subscribe(this.direction === 'rtl' ? this.handleRightKey.bind(this) : this.handleLeftKey.bind(this)),
            this.navigationService.right.subscribe(this.direction === 'rtl' ? this.handleLeftKey.bind(this) : this.handleRightKey.bind(this)),
            this.navigationService.down.subscribe((event) => this.handleDownKey(event.index))
        ].forEach(s => this.observableSubscriptions.add(s));
    }
    unsubscribeEvents() {
        if (!isDocumentAvailable()) {
            return;
        }
        this.observableSubscriptions.unsubscribe();
        if (this.customValueSubscription) {
            this.customValueSubscription.unsubscribe();
        }
    }
    removeGroupTag(dataItems) {
        const prop = this.prop(this.valueField, this.valuePrimitive);
        let data = this.dataService.data;
        if (this.dataService.grouped) {
            data = data.filter(item => !item.header).map(item => item.value);
        }
        const dataItemValues = new Set(dataItems.map(item => prop(item)));
        this.value = this.value.filter(value => !dataItemValues.has(prop(value)));
        this.emitValueChange();
    }
    removeSingleTag(dataItem) {
        const prop = this.prop(this.valueField, this.valuePrimitive);
        let data = this.dataService.data;
        if (this.dataService.grouped) {
            data = data.filter(item => !item.header).map(item => item.value);
        }
        const index = selectedIndices([dataItem], data, this.valueField)[0];
        if (isNumber(index)) {
            this.selectionService.unselect(index);
            this.selectionService.focused = index;
            this.togglePopup(false);
        }
        else { // the deleted item is not present in the source
            const filter = item => prop(item) !== prop(dataItem);
            this.value = this.value.filter(filter);
            this.emitValueChange();
        }
    }
    createCustomValueStream() {
        if (this.customValueSubscription) {
            this.customValueSubscription.unsubscribe();
        }
        this.customValueSubscription = this.customValueSubject.pipe(tap(() => {
            this.loading = true;
            this.disabled = true;
            this.cdr.detectChanges();
        }), this.valueNormalizer, catchError(() => {
            this.loading = false;
            this.disabled = false;
            if (this.autoClose) {
                this.togglePopup(false);
            }
            if (this.autoClose || !this.filterable) {
                this.clearFilter();
            }
            this.nextTick(() => {
                this.searchbar.focus();
            });
            this.createCustomValueStream();
            return of(null);
        }))
            .subscribe((normalizedValue) => {
            this.loading = false;
            this.disabled = false;
            if (isPresent(normalizedValue)) { // if valueNormalizer returns `null` or `undefined` custom value is discarded
                const newValue = this.valuePrimitive ? getter(normalizedValue, this.valueField) : normalizedValue;
                const itemIndex = this.dataService.indexOf(newValue);
                const customItem = itemIndex === -1;
                if (this.value.indexOf(newValue) === -1) {
                    this.tags = this.tagMapper([...this.selectedDataItems, normalizedValue]);
                    if (!customItem) {
                        this.selectionService.add(itemIndex);
                    }
                    else {
                        this.value = [...this.value, newValue];
                    }
                }
                else {
                    if (!customItem && this.selectionService.isSelected(itemIndex)) {
                        this.selectionService.unselect(itemIndex);
                        this.selectionService.focused = itemIndex;
                    }
                    else {
                        this.value = this.value.filter(item => getter(item, this.valueField) !== newValue);
                    }
                }
                this.emitValueChange();
            }
            if (this.autoClose) {
                this.togglePopup(false);
            }
            if (this.autoClose || !this.filterable) {
                this.clearFilter();
            }
            this.nextTick(() => {
                this.searchbar.focus();
            });
        });
    }
    handleItemChange(event) {
        this.change(event);
        if (this.autoClose) {
            this.togglePopup(false);
        }
        if (this.autoClose || !this.filterable) {
            this.clearFilter();
        }
    }
    handleEnter(event) {
        const service = this.selectionService;
        const focusedIndex = this.selectionService.focused;
        if (this.isOpen) {
            event.originalEvent.preventDefault();
        }
        if (focusedIndex === -1) {
            if (this.allowCustom && this.text) {
                this.addCustomValue(this.text);
            }
            return; // Clear filter & close are done at customValueSubscription due to race conditions.
        }
        if (service.isSelected(focusedIndex)) {
            service.unselect(focusedIndex);
            service.focused = focusedIndex;
        }
        else {
            service.add(focusedIndex);
        }
        if (this.autoClose) {
            this.togglePopup(false);
        }
        if (this.autoClose || !this.filterable) {
            this.clearFilter();
        }
    }
    handleClose() {
        this.closePopup();
        this.searchbar.focus();
    }
    handleEnd() {
        this.focusedTagIndex = this.tags.length - 1;
    }
    handleHome() {
        this.focusedTagIndex = 0;
    }
    handleUp(index) {
        this.selectionService.focused = index;
    }
    handleBackspace() {
        if (this.focusedTagIndex !== undefined) {
            this.handleDelete();
        }
        else {
            this.handleRemoveTag(this.tags[this.tags.length - 1]);
            this.searchbar.focus();
        }
    }
    handleDelete() {
        this.handleRemoveTag(this.tags[this.focusedTagIndex]);
        if (this.focusedTagIndex === this.tags.length) {
            this.focusedTagIndex = undefined;
        }
    }
    handleLeftKey() {
        if (this.focusedTagIndex === undefined || this.focusedTagIndex < 0) {
            this.focusedTagIndex = this.tags.length - 1;
        }
        else if (this.focusedTagIndex !== 0) {
            this.focusedTagIndex--;
        }
    }
    handleDownKey(index) {
        if (this.isOpen) {
            this.selectionService.focused = index || this.firstFocusableIndex(0);
        }
        else {
            this.openPopup();
        }
    }
    handleRightKey() {
        const last = this.tags.length - 1;
        if (this.focusedTagIndex === last) {
            this.focusedTagIndex = undefined;
        }
        else if (this.focusedTagIndex < last) {
            this.focusedTagIndex++;
        }
    }
    findIndex(text, startsFrom = 0) {
        let itemText;
        text = text.toLowerCase();
        let index = this.dataService.findIndex(item => {
            if (this.dataService.grouped) {
                itemText = this.prop(this.textField, this.valuePrimitive)(item.value);
            }
            else {
                itemText = this.prop(this.textField, this.valuePrimitive)(item);
            }
            itemText = !isPresent(itemText) ? "" : itemText.toString().toLowerCase();
            return text && itemText.startsWith(text);
        }, startsFrom);
        if (this.disabledItemsService.isIndexDisabled(index)) {
            return (index + 1 > this.dataService.itemsCount) ? -1 : this.findIndex(text, index + 1);
        }
        else {
            return index;
        }
    }
    searchTextAndFocus(text) {
        const index = this.findIndex(text);
        this.selectionService.focused = index;
    }
    closePopup() {
        this.togglePopup(false);
        this.focusedTagIndex = undefined;
    }
    openPopup() {
        this.togglePopup(true);
        this.focusedTagIndex = undefined;
    }
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
    _toggle(open) {
        this._open = open;
        this.destroyPopup();
        if (this._open) {
            this.createPopup();
        }
    }
    destroyPopup() {
        if (this.popupRef) {
            this.popupRef.popupElement
                .removeEventListener('mousedown', this.popupMouseDownHandler);
            this.popupRef.close();
            this.popupRef = null;
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
            anchorAlign: anchorPosition,
            animate: this.popupSettings.animate,
            appendTo: this.appendTo,
            content: this.popupTemplate,
            popupAlign: popupPosition,
            popupClass: this.listContainerClasses,
            positionMode: 'absolute'
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
        this.popupRef.popupAnchorViewportLeave.subscribe(() => {
            this.togglePopup(false);
        });
    }
    emitValueChange() {
        this.onChangeCallback(this.value);
        this.valueChange.emit(this.value);
    }
    resolveDataItemFromTags(value) {
        if (!(this.tags && this.tags.length && isPresent(value))) {
            return undefined;
        }
        // Flattening the tags array in case of a summary tag occurrence.
        const tags = this.tags.reduce((acc, tag) => {
            const items = isArray(tag) ? tag : [tag];
            acc.push(...items);
            return acc;
        }, []);
        const prop = this.prop(this.valueField, this.valuePrimitive);
        return tags.find(tag => prop(tag) === prop(value));
    }
    firstFocusableIndex(index) {
        const maxIndex = this.dataService.itemsCount;
        if (this.disabledItemsService.isIndexDisabled(index)) {
            const nextIndex = index + 1;
            return (nextIndex < maxIndex) ? this.firstFocusableIndex(nextIndex) : undefined;
        }
        else {
            return index;
        }
    }
    nextTick(f) {
        this._zone.runOutsideAngular(() => {
            // Use `setTimeout` instead of a resolved promise
            // because the latter does not wait long enough.
            setTimeout(() => this._zone.run(f));
        });
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
MultiSelectComponent.decorators = [
    { type: Component, args: [{
                exportAs: 'kendoMultiSelect',
                providers: [
                    MULTISELECT_VALUE_ACCESSOR,
                    DataService,
                    SelectionService,
                    NavigationService,
                    DisabledItemsService,
                    LocalizationService,
                    {
                        provide: L10N_PREFIX,
                        useValue: 'kendo.multiselect'
                    },
                    {
                        provide: FilterableDropDownComponentBase, useExisting: forwardRef(() => MultiSelectComponent)
                    },
                    {
                        provide: KendoInput, useExisting: forwardRef(() => MultiSelectComponent)
                    }
                ],
                selector: 'kendo-multiselect',
                template: `
        <ng-container kendoMultiSelectLocalizedMessages
            i18n-noDataText="kendo.multiselect.noDataText|The text displayed in the popup when there are no items"
            noDataText="NO DATA FOUND"

            i18n-clearTitle="kendo.combobox.clearTitle|The title of the clear button"
            clearTitle="clear"
        >
        </ng-container>
        <div class="k-multiselect-wrap k-floatwrap"
            #wrapper
            (mousedown)="wrapperMousedown($event)"
        >
            <kendo-taglist
                [id]="tagListId"
                [tags]="tags"
                [textField]="textField"
                [valueField]="valueField"
                [focused]="focusedTagIndex"
                [disabled]="disabled"
                [template]="tagTemplate"
                [groupTemplate]="groupTagTemplate"
                [tagPrefix]="tagPrefix"
                (removeTag)="handleRemoveTag($event)"
            >
            </kendo-taglist>
            <kendo-searchbar
                #searchbar
                [id]="focusableId"
                [role]="'listbox'"
                [tagListId]="tagListId"
                [activeDescendant]="activeDescendant"
                [noDataLabel]="noDataLabel"
                [userInput]="text"
                [disabled]="disabled"
                [readonly]="readonly"
                [tabIndex]="tabIndex"
                [popupOpen]="isOpen"
                [placeholder]="placeholder"
                (onNavigate)="handleNavigate($event)"
                (valueChange)="handleFilter($event)"
                (onBlur)="onSearchBarBlur()"
                (onFocus)="onSearchBarFocus()"
            >
            </kendo-searchbar>
            <span
                *ngIf="!loading && !readonly && clearButton && (tags?.length || text?.length)"
                class="k-icon k-clear-value k-i-close"
                [attr.title]="clearTitle"
                role="button"
                tabindex="-1"
                (mousedown)="clearAll($event)"
            >
            </span>
            <span
                *ngIf="loading"
                class="k-icon k-i-loading"
            >
            </span>
        </div>
        <ng-template #popupTemplate>
            <!--header template-->
            <ng-template *ngIf="headerTemplate"
                [templateContext]="{
                    templateRef: headerTemplate.templateRef
                }">
            </ng-template>
            <!--custom item template-->
            <div class="k-list" *ngIf="allowCustom && text">
                <div class="k-item k-custom-item" kendoDropDownsSelectable [multipleSelection]="true" [index]="-1">
                    <ng-template *ngIf="customItemTemplate;else default_custom_item_template"
                        [templateContext]="{
                            templateRef: customItemTemplate.templateRef,
                            $implicit: text
                        }">
                    </ng-template>
                    <ng-template #default_custom_item_template>{{ text }}</ng-template>
                    <span class="k-icon k-i-plus" style="float: right"></span>
                </div>
            </div>
            <!--list-->
            <kendo-list
                #optionsList
                [id]="listBoxId"
                [optionPrefix]="optionPrefix"
                [data]="data"
                [textField]="textField"
                [valueField]="valueField"
                [height]="listHeight"
                [template]="template"
                [groupTemplate]="groupTemplate"
                [fixedGroupTemplate]="fixedGroupTemplate"
                [show]="isOpen"
                [multipleSelection]="true"
                [virtual]="virtual"
                (pageChange)="pageChange($event)"
                >
            </kendo-list>
            <!--no data template-->
            <div class="k-nodata" *ngIf="data.length === 0">
                <ng-template [ngIf]="noDataTemplate"
                    [templateContext]="{
                        templateRef: noDataTemplate ? noDataTemplate.templateRef : undefined
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
MultiSelectComponent.ctorParameters = () => [
    { type: LocalizationService },
    { type: PopupService },
    { type: DataService },
    { type: SelectionService },
    { type: NavigationService },
    { type: DisabledItemsService },
    { type: ChangeDetectorRef },
    { type: KeyValueDiffers },
    { type: Renderer2 },
    { type: ElementRef },
    { type: NgZone },
    { type: Boolean, decorators: [{ type: Optional }, { type: Inject, args: [TOUCH_ENABLED,] }] }
];
MultiSelectComponent.propDecorators = {
    focusableId: [{ type: Input }],
    autoClose: [{ type: Input }],
    loading: [{ type: Input }],
    data: [{ type: Input }],
    value: [{ type: Input }],
    valueField: [{ type: Input }],
    textField: [{ type: Input }],
    tabindex: [{ type: Input }],
    tabIndex: [{ type: Input, args: ["tabIndex",] }],
    placeholder: [{ type: Input }],
    disabled: [{ type: Input }],
    itemDisabled: [{ type: Input }],
    readonly: [{ type: Input }],
    filterable: [{ type: Input }],
    virtual: [{ type: Input }],
    popupSettings: [{ type: Input }],
    listHeight: [{ type: Input }],
    valuePrimitive: [{ type: Input }],
    clearButton: [{ type: Input }],
    tagMapper: [{ type: Input }],
    allowCustom: [{ type: Input }],
    valueNormalizer: [{ type: Input }],
    filterChange: [{ type: Output }],
    valueChange: [{ type: Output }],
    open: [{ type: Output }],
    close: [{ type: Output }],
    onFocus: [{ type: Output, args: ['focus',] }],
    onBlur: [{ type: Output, args: ['blur',] }],
    removeTag: [{ type: Output }],
    container: [{ type: ViewChild, args: ['container', { read: ViewContainerRef },] }],
    searchbar: [{ type: ViewChild, args: [SearchBarComponent,] }],
    popupTemplate: [{ type: ViewChild, args: ['popupTemplate',] }],
    wrapper: [{ type: ViewChild, args: ['wrapper',] }],
    optionsList: [{ type: ViewChild, args: ['optionsList',] }],
    template: [{ type: ContentChild, args: [ItemTemplateDirective,] }],
    customItemTemplate: [{ type: ContentChild, args: [CustomItemTemplateDirective,] }],
    groupTemplate: [{ type: ContentChild, args: [GroupTemplateDirective,] }],
    fixedGroupTemplate: [{ type: ContentChild, args: [FixedGroupTemplateDirective,] }],
    headerTemplate: [{ type: ContentChild, args: [HeaderTemplateDirective,] }],
    footerTemplate: [{ type: ContentChild, args: [FooterTemplateDirective,] }],
    tagTemplate: [{ type: ContentChild, args: [TagTemplateDirective,] }],
    groupTagTemplate: [{ type: ContentChild, args: [GroupTagTemplateDirective,] }],
    noDataTemplate: [{ type: ContentChild, args: [NoDataTemplateDirective,] }],
    widgetClasses: [{ type: HostBinding, args: ['class.k-widget',] }, { type: HostBinding, args: ['class.k-multiselect',] }, { type: HostBinding, args: ['class.k-header',] }],
    dir: [{ type: HostBinding, args: ['attr.dir',] }],
    disabledClass: [{ type: HostBinding, args: ['class.k-state-disabled',] }]
};
