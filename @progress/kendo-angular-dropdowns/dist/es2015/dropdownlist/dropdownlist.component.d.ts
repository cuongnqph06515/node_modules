/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Renderer2, ElementRef, EventEmitter, ViewContainerRef, OnDestroy, OnChanges, NgZone, TemplateRef, ChangeDetectorRef, OnInit, SimpleChanges, AfterContentChecked } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { PopupSettings } from '../common/models/popup-settings';
import { SelectionService } from '../common/selection/selection.service';
import { NavigationService } from '../common/navigation/navigation.service';
import { ItemTemplateDirective } from '../common/templates/item-template.directive';
import { GroupTemplateDirective } from '../common/templates/group-template.directive';
import { FixedGroupTemplateDirective } from '../common/templates/fixed-group-template.directive';
import { ValueTemplateDirective } from '../common/templates/value-template.directive';
import { HeaderTemplateDirective } from '../common/templates/header-template.directive';
import { FooterTemplateDirective } from '../common/templates/footer-template.directive';
import { NoDataTemplateDirective } from '../common/templates/no-data-template.directive';
import { Direction } from '../common/models/direction';
import { PreventableEvent } from '../common/models/preventable-event';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { PopupService, PopupRef } from '@progress/kendo-angular-popup';
import { ItemDisabledFn } from '../common/disabled-items/item-disabled';
import { DisabledItemsService } from '../common/disabled-items/disabled-items.service';
import { DataService } from '../common/data.service';
import { FilterableDropDownComponentBase } from '../common/filtering/filterable-base.component';
import { ListComponent } from '../common/list.component';
import { VirtualizationSettings } from '../common/models/virtualization-settings';
import { PageChangeEvent } from '../common/models/page-change-event';
/**
 * @hidden
 */
export declare const DROPDOWNLIST_VALUE_ACCESSOR: any;
/**
 * Represents the [Kendo UI DropDownList component for Angular]({% slug overview_ddl %}).
 *
 * @example
 * ```ts
 * _@Component({
 * selector: 'my-app',
 * template: `
 *  <kendo-dropdownlist [data]="listItems">
 *  </kendo-dropdownlist>
 * `
 * })
 * class AppComponent {
 *   public listItems: Array<string> = ["Item 1", "Item 2", "Item 3", "Item 4"];
 * }
 * ```
 */
export declare class DropDownListComponent implements ControlValueAccessor, OnDestroy, OnChanges, AfterContentChecked, OnInit, FilterableDropDownComponentBase {
    private localization;
    private popupService;
    private selectionService;
    private navigationService;
    private disabledItemsService;
    private dataService;
    private _zone;
    private renderer;
    private hostElement;
    private cdr;
    touchEnabled: boolean;
    readonly width: any;
    readonly height: any;
    readonly widgetTabIndex: number;
    readonly ariaExpanded: boolean;
    readonly ariaOwns: string;
    readonly ariaActivedescendant: string;
    readonly noDataLabel: string;
    readonly appendTo: ViewContainerRef;
    /**
     * @hidden
     */
    focusableId: string;
    /**
     * @hidden
     */
    iconClass: string;
    /**
     * Sets and gets the loading state of the DropDownList.
     */
    loading: boolean;
    /**
     * Sets the data of the DropDownList.
     *
     * > The data has to be provided in an array-like list.
     */
    data: any;
    /**
     * Sets the value of the DropDownList.
     * It can either be of the primitive (string, numbers) or of the complex (objects) type.
     * To define the type, use the `valuePrimitive` option.
     *
     * > All selected values which are not present in the source are ignored.
     */
    value: any;
    /**
     * Sets the data item field that represents the item text.
     * If the data contains only primitive values, do not define it.
     */
    textField: string;
    /**
     * Sets the data item field that represents the item value.
     * If the data contains only primitive values, do not define it.
     */
    valueField: string;
    /**
     * Configures the popup of the DropDownList.
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
     * Sets the height of the options list. By default, `listHeight` is 200px.
     *
     * > The `listHeight` property affects only the list of options and not the whole popup container.
     * > To set the height of the popup container, use `popupSettings.height`.
     */
    listHeight: number;
    /**
     * Sets the text of the default empty item. The type of the defined value has to match the data type.
     */
    defaultItem: any;
    /**
     * Sets the disabled state of the component.
     */
    disabled: boolean;
    /**
     * Defines a Boolean function that is executed for each data item in the component
     * ([see examples]({% slug disableditems_ddl %})). Determines whether the item will be disabled.
     */
    itemDisabled: ItemDisabledFn;
    /**
     * Sets the read-only state of the component.
     */
    readonly: boolean;
    /**
     * Enables the [filtering]({% slug filtering_ddl %}) functionality of the DropDownList.
     */
    filterable: boolean;
    /**
     * Enables the [virtualization]({% slug virtualization_ddl %}) functionality.
     */
    virtual: boolean | VirtualizationSettings;
    /**
     * Enables a case-insensitive search. When filtration is disabled, use this option.
     */
    ignoreCase: boolean;
    /**
     * Sets the delay before an item search is performed. When filtration is disabled, use this option.
     */
    delay: number;
    /**
     * Specifies the type of the selected value
     * ([more information and example]({% slug valuebinding_ddl %}#toc-primitive-values-from-object-fields)).
     * If set to `true`, the selected value has to be of a primitive value.
     */
    valuePrimitive: boolean;
    /**
     * Specifies the [`tabindex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) of the component.
     */
    tabindex: number;
    /**
     * @hidden
     */
    tabIndex: number;
    /**
     * Fires each time the value is changed ([see example]({% slug overview_ddl %}#toc-events)).
     */
    valueChange: EventEmitter<any>;
    /**
     * Fires each time the user types in the input field
     * ([see example]({% slug overview_ddl %}#toc-events)).
     * You can filter the source based on the passed filtration value.
     * When the value of the component is programmatically changed to `ngModel` or `formControl`
     * through its API or form binding, the `valueChange` event is not triggered because it
     * might cause a mix-up with the built-in `valueChange` mechanisms of the `ngModel` or `formControl` bindings.
     */
    filterChange: EventEmitter<any>;
    /**
     * Fires each time the item selection is changed
     * ([see example]({% slug overview_ddl %}#toc-events)).
     */
    selectionChange: EventEmitter<any>;
    /**
     * Fires each time the popup is about to open
     * ([see example]({% slug openstate_ddl %}#toc-preventing-opening-and-closing)).
     * This event is preventable. If you cancel it, the popup will remain closed.
     */
    open: EventEmitter<PreventableEvent>;
    /**
     * Fires each time the popup is about to close
     * ([see example]({% slug openstate_ddl %}#toc-preventing-opening-and-closing)).
     * This event is preventable. If you cancel it, the popup will remain open.
     */
    close: EventEmitter<PreventableEvent>;
    /**
     * Fires each time the user focuses the DropDownList.
     */
    onFocus: EventEmitter<any>;
    /**
     * Fires each time the DropDownList gets blurred.
     */
    onBlur: EventEmitter<any>;
    itemTemplate: ItemTemplateDirective;
    groupTemplate: GroupTemplateDirective;
    fixedGroupTemplate: FixedGroupTemplateDirective;
    valueTemplate: ValueTemplateDirective;
    headerTemplate: HeaderTemplateDirective;
    footerTemplate: FooterTemplateDirective;
    noDataTemplate: NoDataTemplateDirective;
    container: ViewContainerRef;
    popupTemplate: TemplateRef<any>;
    wrapper: ElementRef<HTMLSpanElement>;
    optionsList: ListComponent;
    /**
     * @hidden
     */
    blurComponent(): void;
    /**
     * @hidden
     */
    blurFilterInput(): void;
    /**
     * @hidden
     */
    focusComponent(): void;
    /**
     * @hidden
     */
    keydown(event: any): void;
    /**
     * @hidden
     */
    keypress(event: any): void;
    /**
     * @hidden
     */
    click(event: MouseEvent): void;
    /**
     * @hidden
     */
    onResize(): void;
    widgetClasses: boolean;
    readonly dir: string;
    groupIndices: any[];
    listBoxId: string;
    optionPrefix: string;
    valueLabelId: string;
    filterText: string;
    private _isFocused;
    isFocused: boolean;
    direction: Direction;
    dataItem: any;
    popupRef: PopupRef;
    noDataText: string;
    protected onTouchedCallback: Function;
    protected onChangeCallback: Function;
    private popupMouseDownHandler;
    private word;
    private last;
    private typingTimeout;
    private navigationSubscription;
    private enterSubscription;
    private escSubscription;
    private openSubscription;
    private closeSubscription;
    private filterFocused;
    private filterBlurred;
    private wrapperFocused;
    private wrapperBlurred;
    private componentBlurredSubscription;
    private filterBlurredSubscription;
    private selectionSubscription;
    private _value;
    private _open;
    private _previousDataItem;
    private _valuePrimitive;
    private text;
    private _popupSettings;
    private _virtualSettings;
    private localizationChangesSubscription;
    private messagesTimeout;
    constructor(localization: LocalizationService, popupService: PopupService, selectionService: SelectionService, navigationService: NavigationService, disabledItemsService: DisabledItemsService, dataService: DataService, _zone: NgZone, renderer: Renderer2, hostElement: ElementRef, cdr: ChangeDetectorRef, touchEnabled: boolean);
    ngOnInit(): void;
    /**
     * @hidden
     * Used by the TextBoxContainer to determine if the component is empty.
     */
    isEmpty(): boolean;
    /**
     * @hidden
     */
    onFilterFocus(): void;
    /**
     * @hidden
     */
    ngOnDestroy(): void;
    /**
     * @hidden
     */
    ngOnChanges(changes: SimpleChanges): void;
    /**
     * @hidden
     */
    ngAfterContentChecked(): void;
    /**
     * Focuses the DropDownList.
     */
    focus(): void;
    /**
     * Blurs the DropDownList.
     */
    blur(): void;
    /**
     * Toggles the visibility of the popup
     * ([see example]({% slug openstate_ddl %}#toc-setting-the-initially-opened-component)).
     * If you use the `toggle` method to open or close the popup, the `open` and `close` events will not be fired.
     *
     * @param open - The state of the popup.
     */
    toggle(open?: boolean): void;
    private _toggle;
    private triggerPopupEvents;
    /**
     * @hidden
     */
    togglePopup(open: boolean): void;
    /**
     * Returns the current open state of the popup.
     */
    readonly isOpen: boolean;
    /**
     * Resets the value of the DropDownList.
     * If you use the `reset` method to clear the value of the component,
     * the model will not update automatically and the `selectionChange` and `valueChange` events will not be fired.
     */
    reset(): void;
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
     * @hidden
     */
    readonly buttonClasses: any;
    /**
     * @hidden
     */
    readonly listContainerClasses: Object;
    /**
     * @hidden
     */
    readonly isDisabledDefaultItem: boolean;
    /**
     * @hidden
     */
    getText(): any;
    /**
     * @hidden
     */
    getDefaultItemText(): any;
    private createPopup;
    private destroyPopup;
    private updateState;
    private clearState;
    private resetSelection;
    private onSelectionChange;
    private subscribeEvents;
    private unsubscribeEvents;
    private itemFromEvent;
    private currentOrDefault;
    private firstFocusableIndex;
    private handleEnter;
    private handleEscape;
    private clearFilter;
    protected verifySettings(): void;
    protected componentBlur(): void;
    /**
     * @hidden
     */
    onMouseDown(event: any): void;
    protected onKeyPress(event: any): void;
    protected search(): void;
    protected selectNext(): void;
    private emitChange;
    protected navigate(index: number): void;
    protected prop(field: string, usePrimitive: boolean): any;
    protected findDataItem({ primitive, valueField, value }: {
        primitive: boolean;
        valueField: string;
        value: any;
    }): {
        dataItem: any;
        index: number;
    };
    protected setState(): void;
    /**
     * @hidden
     */
    handleFilter(event: any): void;
    /**
     * @hidden
     */
    pageChange(event: PageChangeEvent): void;
    private setMessages;
    private assignAriaDescribedBy;
}
