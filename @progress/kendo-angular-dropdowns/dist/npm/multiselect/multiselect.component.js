/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
/* tslint:disable:member-ordering */
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../common/util");
var searchbar_component_1 = require("../common/searchbar.component");
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var kendo_angular_common_1 = require("@progress/kendo-angular-common");
var forms_1 = require("@angular/forms");
var selection_service_1 = require("../common/selection/selection.service");
var navigation_service_1 = require("../common/navigation/navigation.service");
var navigation_action_1 = require("../common/navigation/navigation-action");
var disabled_items_service_1 = require("../common/disabled-items/disabled-items.service");
var kendo_angular_common_2 = require("@progress/kendo-angular-common");
var item_template_directive_1 = require("../common/templates/item-template.directive");
var custom_item_template_directive_1 = require("../common/templates/custom-item-template.directive");
var group_template_directive_1 = require("../common/templates/group-template.directive");
var fixed_group_template_directive_1 = require("../common/templates/fixed-group-template.directive");
var header_template_directive_1 = require("../common/templates/header-template.directive");
var footer_template_directive_1 = require("../common/templates/footer-template.directive");
var tag_template_directive_1 = require("../common/templates/tag-template.directive");
var group_tag_template_directive_1 = require("../common/templates/group-tag-template.directive");
var no_data_template_directive_1 = require("../common/templates/no-data-template.directive");
var error_messages_1 = require("../common/constants/error-messages");
var preventable_event_1 = require("../common/models/preventable-event");
var remove_tag_event_1 = require("../common/models/remove-tag-event");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var kendo_angular_popup_1 = require("@progress/kendo-angular-popup");
var filterable_base_component_1 = require("../common/filtering/filterable-base.component");
var touch_enabled_1 = require("../common/constants/touch-enabled");
var data_service_1 = require("../common/data.service");
var list_component_1 = require("../common/list.component");
var virtualization_settings_1 = require("../common/models/virtualization-settings");
var MULTISELECT_VALUE_ACCESSOR = {
    multi: true,
    provide: forms_1.NG_VALUE_ACCESSOR,
    // tslint:disable-next-line:no-use-before-declare
    useExisting: core_1.forwardRef(function () { return MultiSelectComponent; })
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
var MultiSelectComponent = /** @class */ (function () {
    function MultiSelectComponent(localization, popupService, dataService, selectionService, navigationService, disabledItemsService, cdr, differs, renderer, hostElement, _zone, touchEnabled) {
        var _this = this;
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
        this.listBoxId = util_1.guid();
        this.tagListId = util_1.guid();
        this.tagPrefix = "tag-" + util_1.guid();
        this.optionPrefix = "option-" + util_1.guid();
        this.focusedTagIndex = undefined;
        /**
         * @hidden
         */
        this.focusableId = "k-" + util_1.guid();
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
        this.tagMapper = function (tags) { return tags || []; };
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
        this.valueNormalizer = function (text) { return text.pipe(operators_1.map(function (userInput) {
            var comparer = function (item) { return typeof item === 'string' && userInput.toLowerCase() === item.toLowerCase(); };
            var matchingValue = _this.value.find(comparer);
            if (matchingValue) {
                return matchingValue;
            }
            var matchingItem = _this.dataService.find(comparer);
            return matchingItem ? matchingItem : userInput;
        })); };
        /**
         * Fires each time the user types in the input field.
         * You can filter the source based on the passed filtration value.
         */
        this.filterChange = new core_1.EventEmitter();
        /**
         * Fires each time the value is changed&mdash;
         * when the component is blurred or the value is cleared through the **Clear** button
         * ([see example]({% slug overview_multiselect %}#toc-events)).
         * When the value of the component is programmatically changed to `ngModel` or `formControl`
         * through its API or form binding, the `valueChange` event is not triggered because it
         * might cause a mix-up with the built-in `valueChange` mechanisms of the `ngModel` or `formControl` bindings.
         */
        this.valueChange = new core_1.EventEmitter();
        /**
         * Fires each time the popup is about to open
         * ([see example]({% slug openstate_multiselect %}#toc-preventing-opening-and-closing)).
         * This event is preventable. If you cancel it, the popup will remain closed.
         */
        this.open = new core_1.EventEmitter();
        /**
         * Fires each time the popup is about to close
         * ([see example]({% slug openstate_multiselect %}#toc-preventing-opening-and-closing)).
         * This event is preventable. If you cancel it, the popup will remain open.
         */
        this.close = new core_1.EventEmitter();
        /**
         * Fires each time the user focuses the MultiSelect.
         */
        this.onFocus = new core_1.EventEmitter(); //tslint:disable-line:no-output-rename
        /**
         * Fires each time the MultiSelect gets blurred.
         */
        this.onBlur = new core_1.EventEmitter(); //tslint:disable-line:no-output-rename
        /**
         * Fires each time a tag is about to be removed.
         * This event is preventable. If you cancel it, the tag will not be removed.
         */
        this.removeTag = new core_1.EventEmitter();
        this.widgetClasses = true;
        this.initialized = false;
        this.onChangeCallback = function (_) { };
        this.onTouchedCallback = function (_) { };
        this._placeholder = '';
        this._open = false;
        this._value = [];
        this._popupSettings = { animate: true };
        this._isFocused = false;
        this.selectedDataItems = [];
        this.customValueSubject = new rxjs_1.Subject();
        this.observableSubscriptions = new rxjs_1.Subscription();
        this.popupMouseDownHandler = this.onMouseDown.bind(this);
        this.data = [];
        this.direction = this.localization.rtl ? 'rtl' : 'ltr';
        this.subscribeEvents();
    }
    /**
     * Focuses the MultiSelect.
     */
    MultiSelectComponent.prototype.focus = function () {
        if (!this.disabled) {
            this.searchbar.focus();
        }
    };
    /**
     * @hidden
     */
    MultiSelectComponent.prototype.onSearchBarFocus = function () {
        var _this = this;
        if (!this.isFocused) {
            this.isFocused = true;
            if (kendo_angular_common_1.hasObservers(this.onFocus)) {
                this._zone.run(function () {
                    _this.onFocus.emit();
                });
            }
        }
    };
    /**
     * Blurs the MultiSelect.
     */
    MultiSelectComponent.prototype.blur = function () {
        if (!this.disabled) {
            this.searchbar.blur();
        }
    };
    /**
     * @hidden
     */
    MultiSelectComponent.prototype.onSearchBarBlur = function () {
        var _this = this;
        if (!this.isFocused) {
            return;
        }
        this.isFocused = false;
        if (kendo_angular_common_1.hasObservers(this.onBlur) ||
            kendo_angular_common_1.hasObservers(this.filterChange) ||
            kendo_angular_common_1.hasObservers(this.close) ||
            util_1.isUntouched(this.hostElement.nativeElement)) {
            this._zone.run(function () {
                _this.closePopup();
                if (!(_this.isOpen && _this.allowCustom)) {
                    _this.clearFilter();
                }
                _this.onBlur.emit();
                _this.onTouchedCallback();
            });
        }
        else {
            if (!this.allowCustom) {
                this.clearFilter();
            }
            this.closePopup();
        }
    };
    /**
     * @hidden
     */
    MultiSelectComponent.prototype.wrapperMousedown = function (event) {
        var inputElement = this.searchbar.input.nativeElement;
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
    };
    /**
     * @hidden
     */
    MultiSelectComponent.prototype.onMouseDown = function (event) {
        event.preventDefault();
    };
    /**
     * @hidden
     */
    MultiSelectComponent.prototype.onResize = function () {
        if (this._open) {
            var popupWrapper = this.popupRef.popupElement;
            var _a = this.width, min = _a.min, max = _a.max;
            popupWrapper.style.minWidth = min;
            popupWrapper.style.width = max;
        }
    };
    Object.defineProperty(MultiSelectComponent.prototype, "appendTo", {
        get: function () {
            var appendTo = this.popupSettings.appendTo;
            if (!appendTo || appendTo === 'root') {
                return undefined;
            }
            return appendTo === 'component' ? this.container : appendTo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiSelectComponent.prototype, "data", {
        get: function () {
            var virtual = this.virtual;
            if (virtual) {
                var start = virtual.skip || 0;
                var end = start + virtual.pageSize;
                //Use length instead of itemsCount because of grouping
                virtual.total = this.dataService.data.length;
                return this.dataService.data.slice(start, end);
            }
            return this.dataService.data;
        },
        /**
         * Sets the data of the MultiSelect.
         *
         * > The data has to be provided in an array-like list of items.
         */
        set: function (data) {
            this.dataService.data = data || [];
            if (this.virtual) {
                this.virtual.skip = 0;
            }
            if (this.initialized) {
                this.setState(this.value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiSelectComponent.prototype, "value", {
        get: function () {
            return this._value;
        },
        /**
         * Sets the value of the MultiSelect. It can be either of the primitive (string, numbers) or of the complex (objects) type.
         * To define the type, use the `valuePrimitive` option.
         *
         * > All selected values which are not present in the source are ignored.
         */
        set: function (values) {
            this._value = values ? values : [];
            if (!this.differ && this.value) {
                this.differ = this.differs.find(this.value).create();
            }
            this.valueChangeDetected = true;
            if (this.initialized) {
                this.setState(this.value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiSelectComponent.prototype, "tabIndex", {
        get: function () {
            return this.tabindex;
        },
        /**
         * @hidden
         */
        set: function (tabIndex) {
            this.tabindex = tabIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiSelectComponent.prototype, "placeholder", {
        get: function () {
            return this.selectedDataItems.length ? '' : this._placeholder;
        },
        /**
         * The hint which is displayed when the component is empty.
         * When the values are selected, it disappears.
         */
        set: function (text) {
            this._placeholder = text || '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiSelectComponent.prototype, "itemDisabled", {
        /**
         * Defines a Boolean function that is executed for each data item in the component
         * ([see examples]({% slug disableditems_multiselect %})). Determines whether the item will be disabled.
         */
        set: function (fn) {
            if (typeof fn !== 'function') {
                throw new Error("itemDisabled must be a function, but received " + JSON.stringify(fn) + ".");
            }
            this.disabledItemsService.itemDisabled = fn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiSelectComponent.prototype, "virtual", {
        get: function () {
            return this._virtualSettings;
        },
        /**
         * Enables the [virtualization]({% slug virtualization_multiselect %}) functionality.
         */
        set: function (settings) {
            this._virtualSettings = virtualization_settings_1.normalizeVirtualizationSettings(settings);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiSelectComponent.prototype, "popupSettings", {
        get: function () {
            return this._popupSettings;
        },
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
        set: function (settings) {
            this._popupSettings = Object.assign({ animate: true }, settings);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiSelectComponent.prototype, "valuePrimitive", {
        get: function () {
            if (!util_1.isPresent(this._valuePrimitive)) {
                return !util_1.isPresent(this.valueField);
            }
            return this._valuePrimitive;
        },
        /**
         * Specifies the type of the selected value.
         * If set to `true`, the selected value has to be of the primitive type
         * ([more information and example]({% slug valuebinding_multiselect %}#toc-primitive-values-from-object-fields)).
         */
        set: function (isPrimitive) {
            this._valuePrimitive = isPrimitive;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiSelectComponent.prototype, "dir", {
        get: function () {
            return this.direction;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiSelectComponent.prototype, "disabledClass", {
        get: function () {
            return this.disabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiSelectComponent.prototype, "listContainerClasses", {
        get: function () {
            var containerClasses = ['k-list-container', 'k-reset'];
            if (this.popupSettings.popupClass) {
                containerClasses.push(this.popupSettings.popupClass);
            }
            return containerClasses;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiSelectComponent.prototype, "width", {
        get: function () {
            var wrapperOffsetWidth = 0;
            if (kendo_angular_common_1.isDocumentAvailable()) {
                wrapperOffsetWidth = this.wrapper.nativeElement.offsetWidth;
            }
            var width = this.popupSettings.width || wrapperOffsetWidth;
            var minWidth = isNaN(wrapperOffsetWidth) ? wrapperOffsetWidth : wrapperOffsetWidth + "px";
            var maxWidth = isNaN(width) ? width : width + "px";
            return { min: minWidth, max: maxWidth };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiSelectComponent.prototype, "height", {
        get: function () {
            var popupHeight = this.popupSettings.height;
            return util_1.isPresent(popupHeight) ? popupHeight + "px" : 'auto';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiSelectComponent.prototype, "activeDescendant", {
        get: function () {
            var focusedTagIndex = this.focusedTagIndex;
            var focusedListIndex = this.selectionService.focused;
            var prefix;
            var item;
            if (util_1.isPresent(focusedTagIndex) && !this.isOpen) {
                item = this.tags[focusedTagIndex];
                prefix = this.tagPrefix;
            }
            else if (util_1.isPresent(focusedListIndex) && focusedListIndex !== -1 && this.isOpen) {
                item = this.dataService.itemAt(focusedListIndex);
                prefix = this.optionPrefix;
            }
            else {
                return null;
            }
            return prefix + "-" + this.prop(this.valueField, this.valuePrimitive)(item);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiSelectComponent.prototype, "noDataLabel", {
        get: function () {
            if (this.dataService.itemsCount === 0) {
                return this.noDataText;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiSelectComponent.prototype, "clearTitle", {
        get: function () {
            return this.localization.get('clearTitle');
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    MultiSelectComponent.prototype.verifySettings = function () {
        if (!core_1.isDevMode() || this.value.length === 0) {
            return;
        }
        if (!util_1.isArray(this.value)) {
            throw new Error(error_messages_1.MultiselectMessages.array);
        }
        if (this.valuePrimitive === true && util_1.isObjectArray(this.value)) {
            throw new Error(error_messages_1.MultiselectMessages.primitive);
        }
        if (this.valuePrimitive === false && !util_1.isObjectArray(this.value)) {
            throw new Error(error_messages_1.MultiselectMessages.object);
        }
        var valueOrText = !util_1.isPresent(this.valueField) !== !util_1.isPresent(this.textField);
        if (valueOrText) {
            throw new Error(error_messages_1.MultiselectMessages.textAndValue);
        }
    };
    /**
     * @hidden
     */
    MultiSelectComponent.prototype.change = function (event) {
        var isCustomItem = (util_1.isPresent(event.added) || util_1.isPresent(event.removed)) && (event.added === -1 || event.removed === -1);
        if (isCustomItem) {
            this.addCustomValue(this.text);
            return; // The change is emited asynchronosly.
        }
        // Existing items.
        if (util_1.isPresent(event.added)) {
            var dataItem = this.dataService.itemAt(event.added);
            var newItem = (this.valuePrimitive && util_1.isPresent(dataItem) && util_1.isPresent(dataItem[this.valueField])) ? dataItem[this.valueField] : dataItem;
            this.value = this.value.concat([newItem]);
        }
        if (util_1.isPresent(event.removed)) {
            var dataItem_1 = this.dataService.itemAt(event.removed);
            var prop_1 = this.prop(this.valueField, this.valuePrimitive);
            var filter_1 = function (item) { return prop_1(item) !== prop_1(dataItem_1); };
            this.value = this.value.filter(filter_1);
            this.selectionService.focused = event.removed;
            this.cdr.detectChanges();
        }
        this.emitValueChange();
    };
    /**
     * @hidden
     */
    MultiSelectComponent.prototype.setState = function (value) {
        var _this = this;
        var data = this.dataService.data;
        if (this.dataService.grouped) {
            data = data.filter(function (item) { return !item.header; }).map(function (item) { return item.value; });
        }
        var selection = util_1.selectedIndices(this.value, data, this.valueField);
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
        if (util_1.isObjectArray(value) || this.valuePrimitive && this.valueField) {
            this.selectedDataItems = util_1.resolveAllValues(value, data, this.valueField);
        }
        if (this.selectedDataItems.length < value.length) {
            var prop_2 = this.prop(this.valueField, this.valuePrimitive);
            this.selectedDataItems = value
                .map(function (current) {
                var dataItem = _this.selectedDataItems.find(function (item) { return prop_2(item) === prop_2(current); });
                return util_1.isPresent(dataItem) ? dataItem : _this.resolveDataItemFromTags(current);
            })
                .filter(function (dataItem) { return util_1.isPresent(dataItem); });
        }
        this.tags = this.tagMapper(this.selectedDataItems.slice(0));
        this.cdr.markForCheck();
    };
    /**
     * @hidden
     */
    MultiSelectComponent.prototype.handleFilter = function (text) {
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
    };
    /**
     * @hidden
     */
    MultiSelectComponent.prototype.pageChange = function (event) {
        var virtual = this.virtual;
        virtual.skip = event.skip;
    };
    /**
     * @hidden
     */
    MultiSelectComponent.prototype.clearFilter = function () {
        if (this.filterable && this.text) {
            this.filterChange.emit("");
        }
        this.text = "";
        /* Clearing the value from the input as the setInputSize calculation will be incorrect otherwise.
         Calling cdr.detectChanges to clear the input value as a result of property binding
         causes JAWS to read outdated tag values in IE upon tag selection for some reason. */
        this.searchbar.input.nativeElement.value = "";
        this.searchbar.setInputSize();
    };
    /**
     * @hidden
     */
    MultiSelectComponent.prototype.handleNavigate = function (event) {
        var navigateInput = this.text && event.keyCode !== kendo_angular_common_2.Keys.ArrowDown && event.keyCode !== kendo_angular_common_2.Keys.ArrowUp;
        var selectValue = this.text && event.keyCode === kendo_angular_common_2.Keys.Enter || event.keyCode === kendo_angular_common_2.Keys.Escape;
        var deleteTag = !this.text && event.keyCode === kendo_angular_common_2.Keys.Backspace && this.tags.length > 0;
        if (deleteTag) {
            this.handleBackspace();
            return;
        }
        if (this.disabled || navigateInput && !selectValue) {
            return;
        }
        var eventData = event;
        var focused = isNaN(this.selectionService.focused) ? -1 : this.selectionService.focused;
        var action = this.navigationService.process({
            current: focused,
            max: this.dataService.itemsCount - 1,
            min: this.allowCustom && this.text ? -1 : 0,
            open: this.isOpen,
            originalEvent: eventData
        });
        if (action !== navigation_action_1.NavigationAction.Undefined &&
            ((action === navigation_action_1.NavigationAction.Enter && this.isOpen) || action !== navigation_action_1.NavigationAction.Enter)) {
            event.preventDefault();
        }
    };
    /**
     * @hidden
     */
    MultiSelectComponent.prototype.handleRemoveTag = function (tagData) {
        var eventArgs = new remove_tag_event_1.RemoveTagEvent(tagData);
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
    };
    /**
     * @hidden
     */
    MultiSelectComponent.prototype.clearAll = function (event) {
        event.stopImmediatePropagation();
        event.preventDefault();
        this.focus();
        this.clearFilter();
        this.reset();
        this.emitValueChange();
    };
    /**
     * @hidden
     */
    MultiSelectComponent.prototype.addCustomValue = function (text) {
        this.customValueSubject.next(text);
    };
    MultiSelectComponent.prototype.ngAfterContentChecked = function () {
        this.verifySettings();
    };
    MultiSelectComponent.prototype.ngDoCheck = function () {
        var valueChanges = this.differ && this.differ.diff(this.value);
        if (valueChanges && !this.valueChangeDetected) {
            this.setState(this.value);
        }
        this.valueChangeDetected = false;
    };
    MultiSelectComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.renderer.removeAttribute(this.hostElement.nativeElement, "tabindex");
        this.createCustomValueStream();
        this.localizationChangeSubscription = this.localization
            .changes.subscribe(function (_a) {
            var rtl = _a.rtl;
            _this.direction = rtl ? 'rtl' : 'ltr';
            _this.setMessages();
        });
        this.setMessages();
        this.setState(this.value);
        this.initialized = true;
    };
    MultiSelectComponent.prototype.ngOnChanges = function (changes) {
        var virtual = this.virtual;
        var requestInitialData = virtual && changes.data && changes.data.isFirstChange();
        if (requestInitialData) {
            this.pageChange({ skip: 0, take: virtual.pageSize });
        }
        if (kendo_angular_common_1.isChanged('valueNormalizer', changes)) {
            this.createCustomValueStream();
        }
        if (kendo_angular_common_1.anyChanged(['textField', 'valueField', 'valuePrimitive'], changes)) {
            this.setState(this.value);
        }
    };
    MultiSelectComponent.prototype.ngAfterViewInit = function () {
        this.searchbar.setInputSize();
    };
    MultiSelectComponent.prototype.ngOnDestroy = function () {
        this._toggle(false);
        this.unsubscribeEvents();
        clearTimeout(this.messagesTimeout);
        if (this.localizationChangeSubscription) {
            this.localizationChangeSubscription.unsubscribe();
        }
    };
    /**
     * Toggles the visibility of the popup
     * ([see example]({% slug openstate_multiselect %}#toc-setting-the-initially-opened-component)).
     * If you use the `toggle` method to open or close the popup, the respective `open` and `close` events will not be fired.
     *
     * @param open - The state of the popup.
     */
    MultiSelectComponent.prototype.toggle = function (open) {
        var _this = this;
        // The Promise is required for opening the popup on load.
        // Otherwise, the "Expression has changed..." type error will be thrown.
        Promise.resolve(null).then(function () {
            var shouldOpen = util_1.isPresent(open) ? open : !_this._open;
            _this._toggle(shouldOpen);
            _this.cdr.markForCheck();
        });
    };
    Object.defineProperty(MultiSelectComponent.prototype, "isOpen", {
        /**
         * Returns the current open state of the popup.
         */
        get: function () {
            return this._open;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Resets the value of the MultiSelect.
     * If you use the `reset` method to clear the value of the component,
     * the model will not update automatically and the `selectionChange` and `valueChange` events will not be fired.
     */
    MultiSelectComponent.prototype.reset = function () {
        this.text = "";
        this.value = [];
    };
    // NG MODEL BINDINGS
    /**
     * @hidden
     */
    MultiSelectComponent.prototype.writeValue = function (value) {
        this.value = value || [];
    };
    /**
     * @hidden
     */
    MultiSelectComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    /**
     * @hidden
     */
    MultiSelectComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    /**
     * @hidden
     */
    MultiSelectComponent.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    /**
     * @hidden
     */
    MultiSelectComponent.prototype.onTagMapperChange = function () {
        this.tags = this.tagMapper(this.selectedDataItems.slice(0));
        this.cdr.markForCheck();
    };
    MultiSelectComponent.prototype.prop = function (field, usePrimitive) {
        return function (dataItem) {
            if (util_1.isPresent(dataItem)) {
                if (usePrimitive) {
                    return field && util_1.isObject(dataItem) ? dataItem[field] : dataItem;
                }
                else {
                    return dataItem[field];
                }
            }
            return null;
        };
    };
    Object.defineProperty(MultiSelectComponent.prototype, "isFocused", {
        get: function () {
            return this._isFocused;
        },
        set: function (isFocused) {
            this.renderer[isFocused ? 'addClass' : 'removeClass'](this.hostElement.nativeElement, 'k-state-focused');
            this._isFocused = isFocused;
        },
        enumerable: true,
        configurable: true
    });
    MultiSelectComponent.prototype.subscribeEvents = function () {
        var _this = this;
        if (!kendo_angular_common_1.isDocumentAvailable()) {
            return;
        }
        var isOpen = function () { return _this.isOpen; };
        var isClosed = function () { return !_this.isOpen; };
        var isTagFocused = function () { return !_this.isOpen && _this.focusedTagIndex !== undefined; };
        [
            this.selectionService.onChange.subscribe(this.handleItemChange.bind(this)),
            this.navigationService.esc.subscribe(this.closePopup.bind(this)),
            this.navigationService.enter.pipe(operators_1.filter(isOpen)).subscribe(this.handleEnter.bind(this)),
            this.navigationService.open.subscribe(this.openPopup.bind(this)),
            this.navigationService.close.subscribe(this.handleClose.bind(this)),
            this.navigationService.up.pipe(operators_1.filter(isOpen)).subscribe(function (event) { return _this.handleUp(event.index); }),
            this.navigationService.home.pipe(operators_1.filter(function () { return isClosed; })).subscribe(this.handleHome.bind(this)),
            this.navigationService.end.pipe(operators_1.filter(function () { return isClosed; })).subscribe(this.handleEnd.bind(this)),
            this.navigationService.backspace.pipe(operators_1.filter(isTagFocused)).subscribe(this.handleBackspace.bind(this)),
            this.navigationService.delete.pipe(operators_1.filter(isTagFocused)).subscribe(this.handleDelete.bind(this)),
            this.navigationService.left.subscribe(this.direction === 'rtl' ? this.handleRightKey.bind(this) : this.handleLeftKey.bind(this)),
            this.navigationService.right.subscribe(this.direction === 'rtl' ? this.handleLeftKey.bind(this) : this.handleRightKey.bind(this)),
            this.navigationService.down.subscribe(function (event) { return _this.handleDownKey(event.index); })
        ].forEach(function (s) { return _this.observableSubscriptions.add(s); });
    };
    MultiSelectComponent.prototype.unsubscribeEvents = function () {
        if (!kendo_angular_common_1.isDocumentAvailable()) {
            return;
        }
        this.observableSubscriptions.unsubscribe();
        if (this.customValueSubscription) {
            this.customValueSubscription.unsubscribe();
        }
    };
    MultiSelectComponent.prototype.removeGroupTag = function (dataItems) {
        var prop = this.prop(this.valueField, this.valuePrimitive);
        var data = this.dataService.data;
        if (this.dataService.grouped) {
            data = data.filter(function (item) { return !item.header; }).map(function (item) { return item.value; });
        }
        var dataItemValues = new Set(dataItems.map(function (item) { return prop(item); }));
        this.value = this.value.filter(function (value) { return !dataItemValues.has(prop(value)); });
        this.emitValueChange();
    };
    MultiSelectComponent.prototype.removeSingleTag = function (dataItem) {
        var prop = this.prop(this.valueField, this.valuePrimitive);
        var data = this.dataService.data;
        if (this.dataService.grouped) {
            data = data.filter(function (item) { return !item.header; }).map(function (item) { return item.value; });
        }
        var index = util_1.selectedIndices([dataItem], data, this.valueField)[0];
        if (util_1.isNumber(index)) {
            this.selectionService.unselect(index);
            this.selectionService.focused = index;
            this.togglePopup(false);
        }
        else { // the deleted item is not present in the source
            var filter_2 = function (item) { return prop(item) !== prop(dataItem); };
            this.value = this.value.filter(filter_2);
            this.emitValueChange();
        }
    };
    MultiSelectComponent.prototype.createCustomValueStream = function () {
        var _this = this;
        if (this.customValueSubscription) {
            this.customValueSubscription.unsubscribe();
        }
        this.customValueSubscription = this.customValueSubject.pipe(operators_1.tap(function () {
            _this.loading = true;
            _this.disabled = true;
            _this.cdr.detectChanges();
        }), this.valueNormalizer, operators_1.catchError(function () {
            _this.loading = false;
            _this.disabled = false;
            if (_this.autoClose) {
                _this.togglePopup(false);
            }
            if (_this.autoClose || !_this.filterable) {
                _this.clearFilter();
            }
            _this.nextTick(function () {
                _this.searchbar.focus();
            });
            _this.createCustomValueStream();
            return rxjs_1.of(null);
        }))
            .subscribe(function (normalizedValue) {
            _this.loading = false;
            _this.disabled = false;
            if (util_1.isPresent(normalizedValue)) { // if valueNormalizer returns `null` or `undefined` custom value is discarded
                var newValue_1 = _this.valuePrimitive ? util_1.getter(normalizedValue, _this.valueField) : normalizedValue;
                var itemIndex = _this.dataService.indexOf(newValue_1);
                var customItem = itemIndex === -1;
                if (_this.value.indexOf(newValue_1) === -1) {
                    _this.tags = _this.tagMapper(_this.selectedDataItems.concat([normalizedValue]));
                    if (!customItem) {
                        _this.selectionService.add(itemIndex);
                    }
                    else {
                        _this.value = _this.value.concat([newValue_1]);
                    }
                }
                else {
                    if (!customItem && _this.selectionService.isSelected(itemIndex)) {
                        _this.selectionService.unselect(itemIndex);
                        _this.selectionService.focused = itemIndex;
                    }
                    else {
                        _this.value = _this.value.filter(function (item) { return util_1.getter(item, _this.valueField) !== newValue_1; });
                    }
                }
                _this.emitValueChange();
            }
            if (_this.autoClose) {
                _this.togglePopup(false);
            }
            if (_this.autoClose || !_this.filterable) {
                _this.clearFilter();
            }
            _this.nextTick(function () {
                _this.searchbar.focus();
            });
        });
    };
    MultiSelectComponent.prototype.handleItemChange = function (event) {
        this.change(event);
        if (this.autoClose) {
            this.togglePopup(false);
        }
        if (this.autoClose || !this.filterable) {
            this.clearFilter();
        }
    };
    MultiSelectComponent.prototype.handleEnter = function (event) {
        var service = this.selectionService;
        var focusedIndex = this.selectionService.focused;
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
    };
    MultiSelectComponent.prototype.handleClose = function () {
        this.closePopup();
        this.searchbar.focus();
    };
    MultiSelectComponent.prototype.handleEnd = function () {
        this.focusedTagIndex = this.tags.length - 1;
    };
    MultiSelectComponent.prototype.handleHome = function () {
        this.focusedTagIndex = 0;
    };
    MultiSelectComponent.prototype.handleUp = function (index) {
        this.selectionService.focused = index;
    };
    MultiSelectComponent.prototype.handleBackspace = function () {
        if (this.focusedTagIndex !== undefined) {
            this.handleDelete();
        }
        else {
            this.handleRemoveTag(this.tags[this.tags.length - 1]);
            this.searchbar.focus();
        }
    };
    MultiSelectComponent.prototype.handleDelete = function () {
        this.handleRemoveTag(this.tags[this.focusedTagIndex]);
        if (this.focusedTagIndex === this.tags.length) {
            this.focusedTagIndex = undefined;
        }
    };
    MultiSelectComponent.prototype.handleLeftKey = function () {
        if (this.focusedTagIndex === undefined || this.focusedTagIndex < 0) {
            this.focusedTagIndex = this.tags.length - 1;
        }
        else if (this.focusedTagIndex !== 0) {
            this.focusedTagIndex--;
        }
    };
    MultiSelectComponent.prototype.handleDownKey = function (index) {
        if (this.isOpen) {
            this.selectionService.focused = index || this.firstFocusableIndex(0);
        }
        else {
            this.openPopup();
        }
    };
    MultiSelectComponent.prototype.handleRightKey = function () {
        var last = this.tags.length - 1;
        if (this.focusedTagIndex === last) {
            this.focusedTagIndex = undefined;
        }
        else if (this.focusedTagIndex < last) {
            this.focusedTagIndex++;
        }
    };
    MultiSelectComponent.prototype.findIndex = function (text, startsFrom) {
        var _this = this;
        if (startsFrom === void 0) { startsFrom = 0; }
        var itemText;
        text = text.toLowerCase();
        var index = this.dataService.findIndex(function (item) {
            if (_this.dataService.grouped) {
                itemText = _this.prop(_this.textField, _this.valuePrimitive)(item.value);
            }
            else {
                itemText = _this.prop(_this.textField, _this.valuePrimitive)(item);
            }
            itemText = !util_1.isPresent(itemText) ? "" : itemText.toString().toLowerCase();
            return text && itemText.startsWith(text);
        }, startsFrom);
        if (this.disabledItemsService.isIndexDisabled(index)) {
            return (index + 1 > this.dataService.itemsCount) ? -1 : this.findIndex(text, index + 1);
        }
        else {
            return index;
        }
    };
    MultiSelectComponent.prototype.searchTextAndFocus = function (text) {
        var index = this.findIndex(text);
        this.selectionService.focused = index;
    };
    MultiSelectComponent.prototype.closePopup = function () {
        this.togglePopup(false);
        this.focusedTagIndex = undefined;
    };
    MultiSelectComponent.prototype.openPopup = function () {
        this.togglePopup(true);
        this.focusedTagIndex = undefined;
    };
    MultiSelectComponent.prototype.togglePopup = function (open) {
        var isDisabled = this.disabled || this.readonly;
        var sameState = this.isOpen === open;
        if (isDisabled || sameState) {
            return;
        }
        var isDefaultPrevented = this.triggerPopupEvents(open);
        if (!isDefaultPrevented) {
            this._toggle(open);
        }
    };
    MultiSelectComponent.prototype.triggerPopupEvents = function (open) {
        var eventArgs = new preventable_event_1.PreventableEvent();
        if (open) {
            this.open.emit(eventArgs);
        }
        else {
            this.close.emit(eventArgs);
        }
        return eventArgs.isDefaultPrevented();
    };
    MultiSelectComponent.prototype._toggle = function (open) {
        this._open = open;
        this.destroyPopup();
        if (this._open) {
            this.createPopup();
        }
    };
    MultiSelectComponent.prototype.destroyPopup = function () {
        if (this.popupRef) {
            this.popupRef.popupElement
                .removeEventListener('mousedown', this.popupMouseDownHandler);
            this.popupRef.close();
            this.popupRef = null;
        }
    };
    MultiSelectComponent.prototype.createPopup = function () {
        var _this = this;
        if (this.virtual) {
            this.virtual.skip = 0;
        }
        var horizontalAlign = this.direction === "rtl" ? "right" : "left";
        var anchorPosition = { horizontal: horizontalAlign, vertical: "bottom" };
        var popupPosition = { horizontal: horizontalAlign, vertical: "top" };
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
        var popupWrapper = this.popupRef.popupElement;
        var _a = this.width, min = _a.min, max = _a.max;
        popupWrapper.addEventListener('mousedown', this.popupMouseDownHandler);
        popupWrapper.style.minWidth = min;
        popupWrapper.style.width = max;
        popupWrapper.style.height = this.height;
        popupWrapper.setAttribute("dir", this.direction);
        this.popupRef.popupOpen.subscribe(function () {
            _this.cdr.detectChanges();
            _this.optionsList.scrollToItem(_this.selectionService.focused);
        });
        this.popupRef.popupAnchorViewportLeave.subscribe(function () {
            _this.togglePopup(false);
        });
    };
    MultiSelectComponent.prototype.emitValueChange = function () {
        this.onChangeCallback(this.value);
        this.valueChange.emit(this.value);
    };
    MultiSelectComponent.prototype.resolveDataItemFromTags = function (value) {
        if (!(this.tags && this.tags.length && util_1.isPresent(value))) {
            return undefined;
        }
        // Flattening the tags array in case of a summary tag occurrence.
        var tags = this.tags.reduce(function (acc, tag) {
            var items = util_1.isArray(tag) ? tag : [tag];
            acc.push.apply(acc, items);
            return acc;
        }, []);
        var prop = this.prop(this.valueField, this.valuePrimitive);
        return tags.find(function (tag) { return prop(tag) === prop(value); });
    };
    MultiSelectComponent.prototype.firstFocusableIndex = function (index) {
        var maxIndex = this.dataService.itemsCount;
        if (this.disabledItemsService.isIndexDisabled(index)) {
            var nextIndex = index + 1;
            return (nextIndex < maxIndex) ? this.firstFocusableIndex(nextIndex) : undefined;
        }
        else {
            return index;
        }
    };
    MultiSelectComponent.prototype.nextTick = function (f) {
        var _this = this;
        this._zone.runOutsideAngular(function () {
            // Use `setTimeout` instead of a resolved promise
            // because the latter does not wait long enough.
            setTimeout(function () { return _this._zone.run(f); });
        });
    };
    MultiSelectComponent.prototype.setMessages = function () {
        var _this = this;
        this._zone.runOutsideAngular(function () {
            clearTimeout(_this.messagesTimeout);
            _this.messagesTimeout = setTimeout(function () {
                _this.noDataText = _this.localization.get('noDataText');
                _this.cdr.detectChanges();
            });
        });
    };
    MultiSelectComponent.decorators = [
        { type: core_1.Component, args: [{
                    exportAs: 'kendoMultiSelect',
                    providers: [
                        MULTISELECT_VALUE_ACCESSOR,
                        data_service_1.DataService,
                        selection_service_1.SelectionService,
                        navigation_service_1.NavigationService,
                        disabled_items_service_1.DisabledItemsService,
                        kendo_angular_l10n_1.LocalizationService,
                        {
                            provide: kendo_angular_l10n_1.L10N_PREFIX,
                            useValue: 'kendo.multiselect'
                        },
                        {
                            provide: filterable_base_component_1.FilterableDropDownComponentBase, useExisting: core_1.forwardRef(function () { return MultiSelectComponent; })
                        },
                        {
                            provide: kendo_angular_common_1.KendoInput, useExisting: core_1.forwardRef(function () { return MultiSelectComponent; })
                        }
                    ],
                    selector: 'kendo-multiselect',
                    template: "\n        <ng-container kendoMultiSelectLocalizedMessages\n            i18n-noDataText=\"kendo.multiselect.noDataText|The text displayed in the popup when there are no items\"\n            noDataText=\"NO DATA FOUND\"\n\n            i18n-clearTitle=\"kendo.combobox.clearTitle|The title of the clear button\"\n            clearTitle=\"clear\"\n        >\n        </ng-container>\n        <div class=\"k-multiselect-wrap k-floatwrap\"\n            #wrapper\n            (mousedown)=\"wrapperMousedown($event)\"\n        >\n            <kendo-taglist\n                [id]=\"tagListId\"\n                [tags]=\"tags\"\n                [textField]=\"textField\"\n                [valueField]=\"valueField\"\n                [focused]=\"focusedTagIndex\"\n                [disabled]=\"disabled\"\n                [template]=\"tagTemplate\"\n                [groupTemplate]=\"groupTagTemplate\"\n                [tagPrefix]=\"tagPrefix\"\n                (removeTag)=\"handleRemoveTag($event)\"\n            >\n            </kendo-taglist>\n            <kendo-searchbar\n                #searchbar\n                [id]=\"focusableId\"\n                [role]=\"'listbox'\"\n                [tagListId]=\"tagListId\"\n                [activeDescendant]=\"activeDescendant\"\n                [noDataLabel]=\"noDataLabel\"\n                [userInput]=\"text\"\n                [disabled]=\"disabled\"\n                [readonly]=\"readonly\"\n                [tabIndex]=\"tabIndex\"\n                [popupOpen]=\"isOpen\"\n                [placeholder]=\"placeholder\"\n                (onNavigate)=\"handleNavigate($event)\"\n                (valueChange)=\"handleFilter($event)\"\n                (onBlur)=\"onSearchBarBlur()\"\n                (onFocus)=\"onSearchBarFocus()\"\n            >\n            </kendo-searchbar>\n            <span\n                *ngIf=\"!loading && !readonly && clearButton && (tags?.length || text?.length)\"\n                class=\"k-icon k-clear-value k-i-close\"\n                [attr.title]=\"clearTitle\"\n                role=\"button\"\n                tabindex=\"-1\"\n                (mousedown)=\"clearAll($event)\"\n            >\n            </span>\n            <span\n                *ngIf=\"loading\"\n                class=\"k-icon k-i-loading\"\n            >\n            </span>\n        </div>\n        <ng-template #popupTemplate>\n            <!--header template-->\n            <ng-template *ngIf=\"headerTemplate\"\n                [templateContext]=\"{\n                    templateRef: headerTemplate.templateRef\n                }\">\n            </ng-template>\n            <!--custom item template-->\n            <div class=\"k-list\" *ngIf=\"allowCustom && text\">\n                <div class=\"k-item k-custom-item\" kendoDropDownsSelectable [multipleSelection]=\"true\" [index]=\"-1\">\n                    <ng-template *ngIf=\"customItemTemplate;else default_custom_item_template\"\n                        [templateContext]=\"{\n                            templateRef: customItemTemplate.templateRef,\n                            $implicit: text\n                        }\">\n                    </ng-template>\n                    <ng-template #default_custom_item_template>{{ text }}</ng-template>\n                    <span class=\"k-icon k-i-plus\" style=\"float: right\"></span>\n                </div>\n            </div>\n            <!--list-->\n            <kendo-list\n                #optionsList\n                [id]=\"listBoxId\"\n                [optionPrefix]=\"optionPrefix\"\n                [data]=\"data\"\n                [textField]=\"textField\"\n                [valueField]=\"valueField\"\n                [height]=\"listHeight\"\n                [template]=\"template\"\n                [groupTemplate]=\"groupTemplate\"\n                [fixedGroupTemplate]=\"fixedGroupTemplate\"\n                [show]=\"isOpen\"\n                [multipleSelection]=\"true\"\n                [virtual]=\"virtual\"\n                (pageChange)=\"pageChange($event)\"\n                >\n            </kendo-list>\n            <!--no data template-->\n            <div class=\"k-nodata\" *ngIf=\"data.length === 0\">\n                <ng-template [ngIf]=\"noDataTemplate\"\n                    [templateContext]=\"{\n                        templateRef: noDataTemplate ? noDataTemplate.templateRef : undefined\n                    }\">\n                </ng-template>\n                <ng-template [ngIf]=\"!noDataTemplate\">\n                    <div>{{ noDataText }}</div>\n                </ng-template>\n            </div>\n            <!--footer template-->\n            <ng-template *ngIf=\"footerTemplate\"\n                [templateContext]=\"{\n                    templateRef: footerTemplate.templateRef\n                }\">\n            </ng-template>\n        </ng-template>\n        <ng-template [ngIf]=\"isOpen\">\n            <kendo-resize-sensor (resize)=\"onResize()\"></kendo-resize-sensor>\n        </ng-template>\n        <ng-container #container></ng-container>\n  "
                },] },
    ];
    /** @nocollapse */
    MultiSelectComponent.ctorParameters = function () { return [
        { type: kendo_angular_l10n_1.LocalizationService },
        { type: kendo_angular_popup_1.PopupService },
        { type: data_service_1.DataService },
        { type: selection_service_1.SelectionService },
        { type: navigation_service_1.NavigationService },
        { type: disabled_items_service_1.DisabledItemsService },
        { type: core_1.ChangeDetectorRef },
        { type: core_1.KeyValueDiffers },
        { type: core_1.Renderer2 },
        { type: core_1.ElementRef },
        { type: core_1.NgZone },
        { type: Boolean, decorators: [{ type: core_1.Optional }, { type: core_1.Inject, args: [touch_enabled_1.TOUCH_ENABLED,] }] }
    ]; };
    MultiSelectComponent.propDecorators = {
        focusableId: [{ type: core_1.Input }],
        autoClose: [{ type: core_1.Input }],
        loading: [{ type: core_1.Input }],
        data: [{ type: core_1.Input }],
        value: [{ type: core_1.Input }],
        valueField: [{ type: core_1.Input }],
        textField: [{ type: core_1.Input }],
        tabindex: [{ type: core_1.Input }],
        tabIndex: [{ type: core_1.Input, args: ["tabIndex",] }],
        placeholder: [{ type: core_1.Input }],
        disabled: [{ type: core_1.Input }],
        itemDisabled: [{ type: core_1.Input }],
        readonly: [{ type: core_1.Input }],
        filterable: [{ type: core_1.Input }],
        virtual: [{ type: core_1.Input }],
        popupSettings: [{ type: core_1.Input }],
        listHeight: [{ type: core_1.Input }],
        valuePrimitive: [{ type: core_1.Input }],
        clearButton: [{ type: core_1.Input }],
        tagMapper: [{ type: core_1.Input }],
        allowCustom: [{ type: core_1.Input }],
        valueNormalizer: [{ type: core_1.Input }],
        filterChange: [{ type: core_1.Output }],
        valueChange: [{ type: core_1.Output }],
        open: [{ type: core_1.Output }],
        close: [{ type: core_1.Output }],
        onFocus: [{ type: core_1.Output, args: ['focus',] }],
        onBlur: [{ type: core_1.Output, args: ['blur',] }],
        removeTag: [{ type: core_1.Output }],
        container: [{ type: core_1.ViewChild, args: ['container', { read: core_1.ViewContainerRef },] }],
        searchbar: [{ type: core_1.ViewChild, args: [searchbar_component_1.SearchBarComponent,] }],
        popupTemplate: [{ type: core_1.ViewChild, args: ['popupTemplate',] }],
        wrapper: [{ type: core_1.ViewChild, args: ['wrapper',] }],
        optionsList: [{ type: core_1.ViewChild, args: ['optionsList',] }],
        template: [{ type: core_1.ContentChild, args: [item_template_directive_1.ItemTemplateDirective,] }],
        customItemTemplate: [{ type: core_1.ContentChild, args: [custom_item_template_directive_1.CustomItemTemplateDirective,] }],
        groupTemplate: [{ type: core_1.ContentChild, args: [group_template_directive_1.GroupTemplateDirective,] }],
        fixedGroupTemplate: [{ type: core_1.ContentChild, args: [fixed_group_template_directive_1.FixedGroupTemplateDirective,] }],
        headerTemplate: [{ type: core_1.ContentChild, args: [header_template_directive_1.HeaderTemplateDirective,] }],
        footerTemplate: [{ type: core_1.ContentChild, args: [footer_template_directive_1.FooterTemplateDirective,] }],
        tagTemplate: [{ type: core_1.ContentChild, args: [tag_template_directive_1.TagTemplateDirective,] }],
        groupTagTemplate: [{ type: core_1.ContentChild, args: [group_tag_template_directive_1.GroupTagTemplateDirective,] }],
        noDataTemplate: [{ type: core_1.ContentChild, args: [no_data_template_directive_1.NoDataTemplateDirective,] }],
        widgetClasses: [{ type: core_1.HostBinding, args: ['class.k-widget',] }, { type: core_1.HostBinding, args: ['class.k-multiselect',] }, { type: core_1.HostBinding, args: ['class.k-header',] }],
        dir: [{ type: core_1.HostBinding, args: ['attr.dir',] }],
        disabledClass: [{ type: core_1.HostBinding, args: ['class.k-state-disabled',] }]
    };
    return MultiSelectComponent;
}());
exports.MultiSelectComponent = MultiSelectComponent;
