/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Renderer2, ElementRef, EventEmitter, ViewContainerRef, TemplateRef, OnDestroy, SimpleChanges, OnChanges, ChangeDetectorRef, NgZone } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { SearchBarComponent } from '../common/searchbar.component';
import { ItemTemplateDirective } from '../common/templates/item-template.directive';
import { HeaderTemplateDirective } from '../common/templates/header-template.directive';
import { FooterTemplateDirective } from '../common/templates/footer-template.directive';
import { GroupTemplateDirective } from '../common/templates/group-template.directive';
import { FixedGroupTemplateDirective } from '../common/templates/fixed-group-template.directive';
import { PopupSettings } from '../common/models/popup-settings';
import { SelectionService } from '../common/selection/selection.service';
import { NavigationService, NavigationEvent } from '../common/navigation/navigation.service';
import { DisabledItemsService } from '../common/disabled-items/disabled-items.service';
import { ItemDisabledFn } from '../common/disabled-items/item-disabled';
import { NoDataTemplateDirective } from '../common/templates/no-data-template.directive';
import { PreventableEvent } from '../common/models/preventable-event';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { PopupService, PopupRef } from '@progress/kendo-angular-popup';
import { FilterableDropDownComponentBase } from '../common/filtering/filterable-base.component';
import { DataService } from '../common/data.service';
import { ListComponent } from '../common/list.component';
import { VirtualizationSettings } from '../common/models/virtualization-settings';
import { PageChangeEvent } from '../common/models/page-change-event';
/**
 * @hidden
 */
export declare const AUTOCOMPLETE_VALUE_ACCESSOR: any;
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
export declare class AutoCompleteComponent implements ControlValueAccessor, OnDestroy, OnChanges, FilterableDropDownComponentBase {
    private localization;
    private dataService;
    private popupService;
    private selectionService;
    private navigationService;
    private disabledItemsService;
    private _zone;
    private cdr;
    private renderer;
    readonly width: any;
    readonly height: any;
    readonly listContainerClasses: Object;
    readonly suggestion: string;
    readonly appendTo: ViewContainerRef;
    dataItem: any;
    /**
     * Toggles the visibility of the popup.
     * If you use the `toggle` method to open or close the popup, the `open` and `close` events will not be fired.
     *
     * @param open - The state of the popup.
     */
    toggle(open?: boolean): void;
    /**
     * Returns the current open state of the popup.
     */
    readonly isOpen: boolean;
    /**
     * @hidden
     */
    togglePopup(open: boolean): void;
    readonly activeDescendant: string;
    readonly noDataLabel: string;
    readonly clearTitle: string;
    /**
     * Defines whether the first match from the suggestions list will be automatically focused.
     * By default, `highlightFirst` is set to `true`.
     */
    highlightFirst: boolean;
    /**
     * @hidden
     */
    focusableId: string;
    /**
     * Sets the data of the AutoComplete.
     *
     * > The data has to be provided in an array-like list.
     */
    data: any;
    /**
     * Sets the value of the AutoComplete.
     */
    value: string;
    /**
     * Specifies the `string` property of the data item that represents the item value.
     * If the data contains only primitive values, do not define it.
     */
    valueField: string;
    /**
     * The hint which is displayed when the component is empty.
     */
    placeholder: string;
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
    popupSettings: PopupSettings;
    /**
     * Sets the height of the suggestions list. By default, `listHeight` is 200px.
     *
     * > The `listHeight` property affects only the list of suggestions and not the whole popup container.
     * > To set the height of the popup container, use `popupSettings.height`.
     */
    listHeight: number;
    /**
     * Sets and gets the loading state of the AutoComplete.
     */
    loading: boolean;
    /**
     * @hidden
     *
     * If set to `true`, renders a button on hovering over the component.
     * Clicking this button resets the value of the component to `undefined` and triggers the `change` event.
     */
    clearButton: boolean;
    /**
     * Enables the auto-completion of the text based on the first data item.
     */
    suggest: boolean;
    /**
     * Sets the disabled state of the component.
     */
    disabled: boolean;
    /**
     * Defines a Boolean function that is executed for each data item in the component
     * ([see examples]({% slug disableditems_autocomplete %})).
     * Determines whether the item will be disabled.
     */
    itemDisabled: ItemDisabledFn;
    /**
     * Sets the read-only state of the component.
     */
    readonly: boolean;
    /**
     * Specifies the [`tabindex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) of the component.
     */
    tabindex: number;
    /**
     * @hidden
     */
    tabIndex: number;
    /**
     * Enables the [filtering]({% slug filtering_autocomplete %}) functionality.
     * If set to `true`, the component emits the `filterChange` event.
     */
    filterable: boolean;
    /**
     * Enables the [virtualization]({% slug virtualization_autocomplete %}) functionality.
     */
    virtual: boolean | VirtualizationSettings;
    /**
     * Fires each time the value is changed&mdash;
     * when the component is blurred or the value is cleared through the **Clear** button
     * ([see example]({% slug overview_autocomplete %}#toc-events)).
     * When the value of the component is programmatically changed to `ngModel` or `formControl`
     * through its API or form binding, the `valueChange` event is not triggered because it
     * might cause a mix-up with the built-in `valueChange` mechanisms of the `ngModel` or `formControl` bindings.
     */
    valueChange: EventEmitter<string>;
    /**
     * Fires each time the user types in the input field.
     * You can filter the source based on the passed filtration value
     * ([see example]({% slug overview_autocomplete %}#toc-events)).
     */
    filterChange: EventEmitter<string>;
    /**
     * Fires each time the popup is about to open.
     * This event is preventable. If you cancel it, the popup will remain closed.
     */
    open: EventEmitter<PreventableEvent>;
    /**
     * Fires each time the popup is about to close.
     * This event is preventable. If you cancel it, the popup will remain open.
     */
    close: EventEmitter<PreventableEvent>;
    /**
     * Fires each time the user focuses the AutoComplete.
     */
    onFocus: EventEmitter<any>;
    /**
     * Fires each time the AutoComplete gets blurred.
     */
    onBlur: EventEmitter<any>;
    template: ItemTemplateDirective;
    headerTemplate: HeaderTemplateDirective;
    footerTemplate: FooterTemplateDirective;
    noDataTemplate: NoDataTemplateDirective;
    groupTemplate: GroupTemplateDirective;
    fixedGroupTemplate: FixedGroupTemplateDirective;
    container: ViewContainerRef;
    popupTemplate: TemplateRef<any>;
    searchbar: SearchBarComponent;
    optionsList: ListComponent;
    widgetClasses: boolean;
    isFocused: boolean;
    readonly isDisabled: boolean;
    readonly dir: any;
    text: string;
    listBoxId: string;
    optionPrefix: string;
    popupRef: PopupRef;
    noDataText: string;
    protected onChangeCallback: Function;
    protected onTouchedCallback: Function;
    constructor(localization: LocalizationService, dataService: DataService, popupService: PopupService, selectionService: SelectionService, navigationService: NavigationService, disabledItemsService: DisabledItemsService, _zone: NgZone, cdr: ChangeDetectorRef, renderer: Renderer2, wrapper: ElementRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: SimpleChanges): void;
    /**
     * Resets the value of the AutoComplete.
     * If you use the `reset` method to clear the value of the component,
     * the model will not update automatically and the `selectionChange` and `valueChange` events will not be fired.
     */
    reset(): void;
    /**
     * @hidden
     */
    clearValue(event: any): void;
    /**
     * @hidden
     */
    writeValue(value: any): void;
    /**
     * @hidden
     */
    registerOnChange(fn: any): void;
    /**
     * @hidden
     */
    registerOnTouched(fn: any): void;
    /**
     * @hidden
     */
    setDisabledState(isDisabled: boolean): void;
    /**
     * Focuses the AutoComplete.
     */
    focus(): void;
    /**
     * Blurs the AutoComplete.
     */
    blur(): void;
    /**
     * @hidden
     */
    onResize(): void;
    protected emitChange(value: string): void;
    protected verifySettings(newValue: any): void;
    protected search(text: any, startFrom?: number): void;
    protected navigate(index: number): void;
    /**
     * @hidden
     */
    handleNavigate(event: any): void;
    protected handleEnter(event: NavigationEvent): void;
    protected handleEscape(): void;
    /**
     * @hidden
     */
    searchBarChange(text: string): void;
    /**
     * @hidden
     */
    handleFocus(): void;
    /**
     * @hidden
     */
    handleBlur(): void;
    /**
     * @hidden
     */
    pageChange(event: PageChangeEvent): void;
    protected change(value: string): void;
    private popupMouseDownHandler;
    private _popupSettings;
    private _virtualSettings;
    private _open;
    private _value;
    private suggestedText;
    private backspacePressed;
    private valueChangeSubscription;
    private valueChangeSubject;
    private changeSubscription;
    private focusSubscription;
    private navigationSubscription;
    private enterSubscription;
    private escSubscription;
    private closeSubscription;
    private localizationChangeSubscription;
    private messagesTimeout;
    private wrapper;
    private _isFocused;
    private direction;
    private subscribeEvents;
    private unsubscribeEvents;
    private handleItemChange;
    private handleItemFocus;
    private createPopup;
    private destroyPopup;
    private _toggle;
    private triggerPopupEvents;
    private firstFocusableIndex;
    private findIndexPredicate;
    private setMessages;
}
