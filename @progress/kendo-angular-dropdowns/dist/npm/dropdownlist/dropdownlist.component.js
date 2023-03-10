/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
/* tslint:disable:member-ordering */
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var kendo_angular_common_1 = require("@progress/kendo-angular-common");
var kendo_angular_common_2 = require("@progress/kendo-angular-common");
var util_1 = require("../common/util");
var selection_service_1 = require("../common/selection/selection.service");
var navigation_service_1 = require("../common/navigation/navigation.service");
var item_template_directive_1 = require("../common/templates/item-template.directive");
var group_template_directive_1 = require("../common/templates/group-template.directive");
var fixed_group_template_directive_1 = require("../common/templates/fixed-group-template.directive");
var value_template_directive_1 = require("../common/templates/value-template.directive");
var header_template_directive_1 = require("../common/templates/header-template.directive");
var footer_template_directive_1 = require("../common/templates/footer-template.directive");
var no_data_template_directive_1 = require("../common/templates/no-data-template.directive");
var navigation_action_1 = require("../common/navigation/navigation-action");
var preventable_event_1 = require("../common/models/preventable-event");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var kendo_angular_popup_1 = require("@progress/kendo-angular-popup");
var touch_enabled_1 = require("../common/constants/touch-enabled");
var error_messages_1 = require("../common/constants/error-messages");
var disabled_items_service_1 = require("../common/disabled-items/disabled-items.service");
var data_service_1 = require("../common/data.service");
var filterable_base_component_1 = require("../common/filtering/filterable-base.component");
var list_component_1 = require("../common/list.component");
var virtualization_settings_1 = require("../common/models/virtualization-settings");
/**
 * @hidden
 */
exports.DROPDOWNLIST_VALUE_ACCESSOR = {
    multi: true,
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return DropDownListComponent; })
};
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
var DropDownListComponent = /** @class */ (function () {
    function DropDownListComponent(localization, popupService, selectionService, navigationService, disabledItemsService, dataService, _zone, renderer, hostElement, cdr, touchEnabled) {
        this.localization = localization;
        this.popupService = popupService;
        this.selectionService = selectionService;
        this.navigationService = navigationService;
        this.disabledItemsService = disabledItemsService;
        this.dataService = dataService;
        this._zone = _zone;
        this.renderer = renderer;
        this.hostElement = hostElement;
        this.cdr = cdr;
        this.touchEnabled = touchEnabled;
        /**
         * @hidden
         */
        this.focusableId = "k-" + util_1.guid();
        /**
         * Sets the height of the options list. By default, `listHeight` is 200px.
         *
         * > The `listHeight` property affects only the list of options and not the whole popup container.
         * > To set the height of the popup container, use `popupSettings.height`.
         */
        this.listHeight = 200;
        /**
         * Sets the disabled state of the component.
         */
        this.disabled = false;
        /**
         * Sets the read-only state of the component.
         */
        this.readonly = false;
        /**
         * Enables the [filtering]({% slug filtering_ddl %}) functionality of the DropDownList.
         */
        this.filterable = false;
        /**
         * Enables a case-insensitive search. When filtration is disabled, use this option.
         */
        this.ignoreCase = true;
        /**
         * Sets the delay before an item search is performed. When filtration is disabled, use this option.
         */
        this.delay = 500;
        /**
         * Specifies the [`tabindex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) of the component.
         */
        this.tabindex = 0;
        /**
         * Fires each time the value is changed ([see example]({% slug overview_ddl %}#toc-events)).
         */
        this.valueChange = new core_1.EventEmitter();
        /**
         * Fires each time the user types in the input field
         * ([see example]({% slug overview_ddl %}#toc-events)).
         * You can filter the source based on the passed filtration value.
         * When the value of the component is programmatically changed to `ngModel` or `formControl`
         * through its API or form binding, the `valueChange` event is not triggered because it
         * might cause a mix-up with the built-in `valueChange` mechanisms of the `ngModel` or `formControl` bindings.
         */
        this.filterChange = new core_1.EventEmitter();
        /**
         * Fires each time the item selection is changed
         * ([see example]({% slug overview_ddl %}#toc-events)).
         */
        this.selectionChange = new core_1.EventEmitter();
        /**
         * Fires each time the popup is about to open
         * ([see example]({% slug openstate_ddl %}#toc-preventing-opening-and-closing)).
         * This event is preventable. If you cancel it, the popup will remain closed.
         */
        this.open = new core_1.EventEmitter();
        /**
         * Fires each time the popup is about to close
         * ([see example]({% slug openstate_ddl %}#toc-preventing-opening-and-closing)).
         * This event is preventable. If you cancel it, the popup will remain open.
         */
        this.close = new core_1.EventEmitter();
        /**
         * Fires each time the user focuses the DropDownList.
         */
        this.onFocus = new core_1.EventEmitter();
        /**
         * Fires each time the DropDownList gets blurred.
         */
        this.onBlur = new core_1.EventEmitter();
        this.widgetClasses = true;
        this.groupIndices = [];
        this.listBoxId = util_1.guid();
        this.optionPrefix = util_1.guid();
        this.filterText = "";
        this._isFocused = false;
        this.onTouchedCallback = function (_) { };
        this.onChangeCallback = function (_) { };
        this.word = "";
        this.last = "";
        this.filterFocused = new core_1.EventEmitter();
        this.filterBlurred = new core_1.EventEmitter();
        this.wrapperFocused = new core_1.EventEmitter();
        this.wrapperBlurred = new core_1.EventEmitter();
        this.selectionSubscription = new rxjs_1.Subscription();
        this._open = false;
        this._popupSettings = { animate: true };
        this.direction = localization.rtl ? 'rtl' : 'ltr';
        this.data = [];
        this.subscribeEvents();
        this.popupMouseDownHandler = this.onMouseDown.bind(this);
    }
    Object.defineProperty(DropDownListComponent.prototype, "width", {
        get: function () {
            var wrapperWidth = kendo_angular_common_1.isDocumentAvailable() ? this.wrapper.nativeElement.offsetWidth : 0;
            var width = this.popupSettings.width || wrapperWidth;
            var minWidth = isNaN(wrapperWidth) ? wrapperWidth : wrapperWidth + "px";
            var maxWidth = isNaN(width) ? width : width + "px";
            return { min: minWidth, max: maxWidth };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownListComponent.prototype, "height", {
        get: function () {
            var popupHeight = this.popupSettings.height;
            return util_1.isPresent(popupHeight) ? popupHeight + "px" : 'auto';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownListComponent.prototype, "widgetTabIndex", {
        get: function () {
            if (this.disabled) {
                return undefined;
            }
            var providedTabIndex = Number(this.tabIndex);
            var defaultTabIndex = 0;
            return !isNaN(providedTabIndex) ? providedTabIndex : defaultTabIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownListComponent.prototype, "ariaExpanded", {
        get: function () {
            return this.isOpen;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownListComponent.prototype, "ariaOwns", {
        get: function () {
            if (!this.isOpen) {
                return;
            }
            return this.listBoxId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownListComponent.prototype, "ariaActivedescendant", {
        get: function () {
            if (!util_1.isPresent(this.dataItem)) {
                return;
            }
            return this.optionPrefix + "-" + util_1.getter(this.dataItem, this.valueField);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownListComponent.prototype, "noDataLabel", {
        get: function () {
            if (this.dataService.itemsCount === 0) {
                return this.noDataText;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownListComponent.prototype, "appendTo", {
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
    Object.defineProperty(DropDownListComponent.prototype, "data", {
        get: function () {
            var virtual = this.virtual;
            if (virtual) {
                var start = virtual.skip || 0;
                var end = start + virtual.pageSize;
                // Use length instead of itemsCount because of the grouping.
                virtual.total = this.dataService.data.length;
                return this.dataService.data.slice(start, end);
            }
            return this.dataService.data;
        },
        /**
         * Sets the data of the DropDownList.
         *
         * > The data has to be provided in an array-like list.
         */
        set: function (data) {
            this.dataService.data = data || [];
            if (this.virtual) {
                this.virtual.skip = 0;
            }
            this.setState();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownListComponent.prototype, "value", {
        get: function () {
            return this._value;
        },
        /**
         * Sets the value of the DropDownList.
         * It can either be of the primitive (string, numbers) or of the complex (objects) type.
         * To define the type, use the `valuePrimitive` option.
         *
         * > All selected values which are not present in the source are ignored.
         */
        set: function (newValue) {
            if (!util_1.isPresent(newValue)) {
                this._previousDataItem = undefined;
            }
            this._value = newValue;
            this.setState();
            this.cdr.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownListComponent.prototype, "popupSettings", {
        get: function () {
            return this._popupSettings;
        },
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
        set: function (settings) {
            this._popupSettings = Object.assign({ animate: true }, settings);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownListComponent.prototype, "itemDisabled", {
        /**
         * Defines a Boolean function that is executed for each data item in the component
         * ([see examples]({% slug disableditems_ddl %})). Determines whether the item will be disabled.
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
    Object.defineProperty(DropDownListComponent.prototype, "virtual", {
        get: function () {
            return this._virtualSettings;
        },
        /**
         * Enables the [virtualization]({% slug virtualization_ddl %}) functionality.
         */
        set: function (settings) {
            this._virtualSettings = virtualization_settings_1.normalizeVirtualizationSettings(settings);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownListComponent.prototype, "valuePrimitive", {
        get: function () {
            if (!util_1.isPresent(this._valuePrimitive)) {
                return !util_1.isPresent(this.valueField);
            }
            return this._valuePrimitive;
        },
        /**
         * Specifies the type of the selected value
         * ([more information and example]({% slug valuebinding_ddl %}#toc-primitive-values-from-object-fields)).
         * If set to `true`, the selected value has to be of a primitive value.
         */
        set: function (isPrimitive) {
            this._valuePrimitive = isPrimitive;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownListComponent.prototype, "tabIndex", {
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
    /**
     * @hidden
     */
    DropDownListComponent.prototype.blurComponent = function () {
        this.wrapperBlurred.emit();
    };
    /**
     * @hidden
     */
    DropDownListComponent.prototype.blurFilterInput = function () {
        this.filterBlurred.emit();
    };
    /**
     * @hidden
     */
    DropDownListComponent.prototype.focusComponent = function () {
        var _this = this;
        this.wrapperFocused.emit();
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
     * @hidden
     */
    DropDownListComponent.prototype.keydown = function (event) {
        var firstIndex = util_1.isPresent(this.defaultItem) ? -1 : 0;
        var focused = isNaN(this.selectionService.focused) ? this.firstFocusableIndex(firstIndex) : this.selectionService.focused;
        var offset = 0;
        if (this.disabled || this.readonly) {
            return;
        }
        var isHomeEnd = event.keyCode === kendo_angular_common_2.Keys.Home || event.keyCode === kendo_angular_common_2.Keys.End;
        var isFilterFocused = this.filterable && this.isFocused && this.isOpen;
        if (isFilterFocused && isHomeEnd) {
            return;
        }
        var hasSelected = util_1.isPresent(this.selectionService.selected[0]);
        var focusedItemNotSelected = util_1.isPresent(this.selectionService.focused) && !this.selectionService.isSelected(this.selectionService.focused);
        if (!hasSelected || focusedItemNotSelected) {
            if (event.keyCode === kendo_angular_common_2.Keys.ArrowDown || event.keyCode === kendo_angular_common_2.Keys.ArrowRight) {
                offset = -1;
            }
            else if (event.keyCode === kendo_angular_common_2.Keys.ArrowUp || event.keyCode === kendo_angular_common_2.Keys.ArrowLeft) {
                offset = 1;
            }
        }
        var eventData = event;
        var action = this.navigationService.process({
            current: focused + offset,
            max: this.dataService.itemsCount - 1,
            min: this.defaultItem ? -1 : 0,
            originalEvent: eventData
        });
        var leftRightKeys = (action === navigation_action_1.NavigationAction.Left) || (action === navigation_action_1.NavigationAction.Right);
        if (action !== navigation_action_1.NavigationAction.Undefined &&
            action !== navigation_action_1.NavigationAction.Tab &&
            action !== navigation_action_1.NavigationAction.Backspace &&
            action !== navigation_action_1.NavigationAction.Delete &&
            !(leftRightKeys && this.filterable) &&
            action !== navigation_action_1.NavigationAction.Enter //enter when popup is opened is handled before `handleEnter`
        ) {
            eventData.preventDefault();
        }
    };
    /**
     * @hidden
     */
    DropDownListComponent.prototype.keypress = function (event) {
        if (this.disabled || this.readonly || this.filterable) {
            return;
        }
        this.onKeyPress(event);
    };
    /**
     * @hidden
     */
    DropDownListComponent.prototype.click = function (event) {
        event.preventDefault();
        this.focus();
        this.togglePopup(!this.isOpen);
    };
    /**
     * @hidden
     */
    DropDownListComponent.prototype.onResize = function () {
        if (this._open) {
            var popupWrapper = this.popupRef.popupElement;
            var _a = this.width, min = _a.min, max = _a.max;
            popupWrapper.style.minWidth = min;
            popupWrapper.style.width = max;
        }
    };
    Object.defineProperty(DropDownListComponent.prototype, "dir", {
        get: function () {
            return this.direction;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownListComponent.prototype, "isFocused", {
        get: function () {
            return this._isFocused;
        },
        set: function (isFocused) {
            this.renderer[isFocused ? 'addClass' : 'removeClass'](this.wrapper.nativeElement, 'k-state-focused');
            this._isFocused = isFocused;
        },
        enumerable: true,
        configurable: true
    });
    DropDownListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.renderer.removeAttribute(this.hostElement.nativeElement, "tabindex");
        this.localizationChangesSubscription = this.localization
            .changes.subscribe(function (_a) {
            var rtl = _a.rtl;
            _this.direction = rtl ? 'rtl' : 'ltr';
            _this.setMessages();
        });
        this.setMessages();
        this.assignAriaDescribedBy();
    };
    /**
     * @hidden
     * Used by the TextBoxContainer to determine if the component is empty.
     */
    DropDownListComponent.prototype.isEmpty = function () {
        var value = this.value;
        return !(value === 0 || value === false || value || this.defaultItem);
    };
    /**
     * @hidden
     */
    DropDownListComponent.prototype.onFilterFocus = function () {
        this.filterFocused.emit();
    };
    /**
     * @hidden
     */
    DropDownListComponent.prototype.ngOnDestroy = function () {
        this.destroyPopup();
        this.unsubscribeEvents();
        clearTimeout(this.messagesTimeout);
        if (this.localizationChangesSubscription) {
            this.localizationChangesSubscription.unsubscribe();
        }
    };
    /**
     * @hidden
     */
    DropDownListComponent.prototype.ngOnChanges = function (changes) {
        var virtual = this.virtual;
        var requestInitialData = virtual && changes.data && changes.data.isFirstChange();
        if (requestInitialData) {
            this.pageChange({ skip: 0, take: virtual.pageSize });
        }
        if (kendo_angular_common_1.isChanged('defaultItem', changes, false)) {
            this.disabledItemsService.defaultItem = this.defaultItem;
        }
        if (kendo_angular_common_1.anyChanged(['textField', 'valueField', 'valuePrimitive', 'defaultItem', 'itemDisabled'], changes, false)) {
            this.setState();
        }
    };
    /**
     * @hidden
     */
    DropDownListComponent.prototype.ngAfterContentChecked = function () {
        this.verifySettings();
    };
    /**
     * Focuses the DropDownList.
     */
    DropDownListComponent.prototype.focus = function () {
        if (!this.disabled) {
            this.wrapper.nativeElement.focus();
        }
    };
    /**
     * Blurs the DropDownList.
     */
    DropDownListComponent.prototype.blur = function () {
        if (!this.disabled) {
            this.wrapper.nativeElement.blur();
        }
    };
    /**
     * Toggles the visibility of the popup
     * ([see example]({% slug openstate_ddl %}#toc-setting-the-initially-opened-component)).
     * If you use the `toggle` method to open or close the popup, the `open` and `close` events will not be fired.
     *
     * @param open - The state of the popup.
     */
    DropDownListComponent.prototype.toggle = function (open) {
        var _this = this;
        // The Promise is required to open the popup on load.
        // Otherwise, the "Expression has changed..." type error will be thrown.
        Promise.resolve(null).then(function () {
            var shouldOpen = util_1.isPresent(open) ? open : !_this._open;
            _this._toggle(shouldOpen);
        });
    };
    DropDownListComponent.prototype._toggle = function (open) {
        this._open = open;
        this.destroyPopup();
        if (this._open) {
            this.createPopup();
        }
    };
    DropDownListComponent.prototype.triggerPopupEvents = function (open) {
        var eventArgs = new preventable_event_1.PreventableEvent();
        if (open) {
            this.open.emit(eventArgs);
        }
        else {
            this.close.emit(eventArgs);
        }
        return eventArgs.isDefaultPrevented();
    };
    /**
     * @hidden
     */
    DropDownListComponent.prototype.togglePopup = function (open) {
        var isDisabled = this.disabled || this.readonly;
        var sameState = this.isOpen === open;
        if (isDisabled || sameState) {
            return;
        }
        var isDefaultPrevented = this.triggerPopupEvents(open);
        if (!isDefaultPrevented) {
            if (!open && this.filterable && this.isFocused) {
                this.focus();
            }
            this._toggle(open);
        }
    };
    Object.defineProperty(DropDownListComponent.prototype, "isOpen", {
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
     * Resets the value of the DropDownList.
     * If you use the `reset` method to clear the value of the component,
     * the model will not update automatically and the `selectionChange` and `valueChange` events will not be fired.
     */
    DropDownListComponent.prototype.reset = function () {
        this.value = undefined;
    };
    /**
     * @hidden
     */
    DropDownListComponent.prototype.writeValue = function (value) {
        this.value = value === null ? undefined : value;
    };
    /**
     * @hidden
     */
    DropDownListComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    /**
     * @hidden
     */
    DropDownListComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    /**
     * @hidden
     */
    DropDownListComponent.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    Object.defineProperty(DropDownListComponent.prototype, "buttonClasses", {
        /**
         * @hidden
         */
        get: function () {
            return this.loading ? 'k-i-loading' : this.iconClass || 'k-i-arrow-s';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownListComponent.prototype, "listContainerClasses", {
        /**
         * @hidden
         */
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
    Object.defineProperty(DropDownListComponent.prototype, "isDisabledDefaultItem", {
        /**
         * @hidden
         */
        get: function () {
            return this.disabledItemsService.isItemDisabled(this.defaultItem);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    DropDownListComponent.prototype.getText = function () {
        return this.text;
    };
    /**
     * @hidden
     */
    DropDownListComponent.prototype.getDefaultItemText = function () {
        return util_1.getter(this.defaultItem, this.textField);
    };
    DropDownListComponent.prototype.createPopup = function () {
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
        if (!this.filterable) {
            this.popupRef.popupAnchorViewportLeave.subscribe(function () { return _this.togglePopup(false); });
        }
    };
    DropDownListComponent.prototype.destroyPopup = function () {
        if (this.popupRef) {
            this.popupRef.popupElement
                .removeEventListener('mousedown', this.popupMouseDownHandler);
            this.popupRef.close();
            this.popupRef = null;
        }
    };
    DropDownListComponent.prototype.updateState = function (_a) {
        var dataItem = _a.dataItem, _b = _a.confirm, confirm = _b === void 0 ? false : _b;
        this.dataItem = dataItem;
        this.text = this.prop(this.textField, this.valuePrimitive)(dataItem);
        if (confirm) {
            this._previousDataItem = dataItem;
        }
    };
    DropDownListComponent.prototype.clearState = function () {
        this.text = undefined;
        this.dataItem = undefined;
    };
    DropDownListComponent.prototype.resetSelection = function (index) {
        var clear = !util_1.isPresent(index);
        this.selectionService.resetSelection(clear ? [] : [index]);
        this.selectionService.focused = clear ? this.firstFocusableIndex(0) : index;
    };
    DropDownListComponent.prototype.onSelectionChange = function (_a) {
        var dataItem = _a.dataItem;
        this.updateState({ dataItem: dataItem });
        this.selectionChange.emit(dataItem);
        // reassigning the value label ID as aria-deascibedby forces firefox/nvda, forefox/jaws to read
        // the new value when the popup is closed and the value is changed with the arrow keys (up/down)
        this.assignAriaDescribedBy();
    };
    DropDownListComponent.prototype.subscribeEvents = function () {
        var _this = this;
        if (!kendo_angular_common_1.isDocumentAvailable()) {
            return;
        }
        // Item selection when the popup is open.
        this.selectionSubscription.add(this.selectionService.onSelect.pipe(operators_1.filter(function (_) { return _this.isOpen; }), operators_1.map(this.itemFromEvent.bind(this)))
            .subscribe(this.onSelectionChange.bind(this)));
        // Item selection when the popup is closed | clicked | enter, and so on.
        this.selectionSubscription.add(rxjs_1.merge(this.selectionService.onSelect.pipe(operators_1.filter(function (_) { return !_this.isOpen; })), this.selectionService.onChange).pipe(operators_1.map(this.itemFromEvent.bind(this)), operators_1.tap(function (_) { return _this.togglePopup(false); }))
            .subscribe(function (_a) {
            var dataItem = _a.dataItem, newValue = _a.value, newSelection = _a.newSelection;
            if (newSelection) {
                _this.onSelectionChange({ dataItem: dataItem });
            }
            var shouldUsePrevious = !util_1.isPresent(dataItem) && _this._previousDataItem;
            var shouldUseNewValue = newValue !== _this.prop(_this.valueField, _this.valuePrimitive)(_this.value);
            if (shouldUsePrevious) {
                _this.updateState({ dataItem: _this._previousDataItem });
                _this.resetSelection();
            }
            else if (shouldUseNewValue) {
                _this.value = _this.valuePrimitive ? newValue : dataItem;
                _this._previousDataItem = dataItem;
                _this.emitChange(_this.value);
            }
            _this.clearFilter();
        }));
        this.navigationSubscription = rxjs_1.merge(this.navigationService.up, this.navigationService.down, this.navigationService.left.pipe(operators_1.skipWhile(function () { return _this.filterable; })), this.navigationService.right.pipe(operators_1.skipWhile(function () { return _this.filterable; })), this.navigationService.home, this.navigationService.end)
            .pipe(operators_1.filter(function (event) { return !isNaN(event.index); }))
            .subscribe(function (event) { return _this.selectionService.select(event.index); });
        this.openSubscription = this.navigationService.open.subscribe(function () { return _this.togglePopup(true); });
        this.closeSubscription = this.navigationService.close.subscribe(function () {
            _this.togglePopup(false);
            _this.focus();
        });
        this.enterSubscription = this.navigationService.enter
            .pipe(operators_1.tap(function (event) { return event.originalEvent.preventDefault(); }))
            .subscribe(this.handleEnter.bind(this));
        this.escSubscription = this.navigationService.esc
            .subscribe(this.handleEscape.bind(this));
        this.filterBlurredSubscription = this.filterBlurred.pipe(operators_1.concatMap(function () { return rxjs_1.interval(10).pipe(operators_1.take(1), operators_1.takeUntil(_this.wrapperFocused)); }))
            .subscribe(function () {
            _this.wrapperBlurred.emit();
        });
        this._zone.runOutsideAngular(function () {
            _this.componentBlurredSubscription =
                rxjs_1.merge(_this.wrapperBlurred.pipe(operators_1.concatMap(function () { return rxjs_1.interval(10).pipe(operators_1.take(1), operators_1.takeUntil(_this.filterFocused)); })), _this.navigationService.tab).pipe(operators_1.tap(function (event) { return event instanceof navigation_service_1.NavigationEvent && _this.focus(); }), operators_1.filter(function () { return _this.isFocused; }))
                    .subscribe(function () { return _this.componentBlur(); });
        });
    };
    DropDownListComponent.prototype.unsubscribeEvents = function () {
        if (!kendo_angular_common_1.isDocumentAvailable()) {
            return;
        }
        this.navigationSubscription.unsubscribe();
        this.openSubscription.unsubscribe();
        this.closeSubscription.unsubscribe();
        this.enterSubscription.unsubscribe();
        this.escSubscription.unsubscribe();
        this.componentBlurredSubscription.unsubscribe();
        this.filterBlurredSubscription.unsubscribe();
        if (this.selectionSubscription) {
            this.selectionSubscription.unsubscribe();
        }
    };
    DropDownListComponent.prototype.itemFromEvent = function (event) {
        var index = event.indices[0];
        var dataItem = this.dataService.itemAt(index);
        dataItem = util_1.isPresent(dataItem) ? dataItem : this.currentOrDefault(index);
        var value = this.prop(this.valueField, this.valuePrimitive)(dataItem);
        var newSelection = event.newSelection;
        return {
            dataItem: dataItem,
            index: index,
            newSelection: newSelection,
            value: value
        };
    };
    DropDownListComponent.prototype.currentOrDefault = function (selectedIndex) {
        var defaultItemIndex = -1;
        if (util_1.isPresent(this.dataItem) && selectedIndex !== defaultItemIndex) {
            return this.dataItem;
        }
        else {
            return this.defaultItem;
        }
    };
    DropDownListComponent.prototype.firstFocusableIndex = function (index) {
        var maxIndex = this.dataService.itemsCount - 1;
        if (this.disabledItemsService.isIndexDisabled(index)) {
            return (index < maxIndex) ? this.firstFocusableIndex(index + 1) : undefined;
        }
        else {
            return index;
        }
    };
    DropDownListComponent.prototype.handleEnter = function () {
        if (this.isOpen) {
            this.selectionService.change(this.selectionService.focused);
            this.focus();
        }
        else {
            this.togglePopup(true);
        }
    };
    DropDownListComponent.prototype.handleEscape = function () {
        if (util_1.isPresent(this.selectionService.selected[0])) {
            this.selectionService.change(this.selectionService.selected[0]);
        }
        else {
            this.togglePopup(false);
            this.clearFilter();
        }
        this.focus();
    };
    DropDownListComponent.prototype.clearFilter = function () {
        if (!(this.filterable && this.filterText)) {
            return;
        }
        this.filterText = "";
        this.cdr.markForCheck();
        this.filterChange.emit(this.filterText);
    };
    DropDownListComponent.prototype.verifySettings = function () {
        if (!core_1.isDevMode()) {
            return;
        }
        if (this.defaultItem && this.valueField && typeof this.defaultItem !== "object") {
            throw new Error(error_messages_1.DropDownListMessages.defaultItem);
        }
        if (this.valuePrimitive === true && util_1.isPresent(this.value) && typeof this.value === "object") {
            throw new Error(error_messages_1.DropDownListMessages.primitive);
        }
        if (this.valuePrimitive === false && util_1.isPresent(this.value) && typeof this.value !== "object") {
            throw new Error(error_messages_1.DropDownListMessages.object);
        }
        var valueOrText = !util_1.isPresent(this.valueField) !== !util_1.isPresent(this.textField);
        if (valueOrText) {
            throw new Error(error_messages_1.DropDownListMessages.textAndValue);
        }
    };
    DropDownListComponent.prototype.componentBlur = function () {
        var _this = this;
        this.isFocused = false;
        var valueFrom = this.prop(this.valueField, this.valuePrimitive);
        var selectionPresent = util_1.isPresent(this.selectionService.selected[0]);
        var valueHasChanged = selectionPresent && valueFrom(this.value) !== valueFrom(this.dataService.itemAt(this.selectionService.selected[0]));
        if (valueHasChanged ||
            kendo_angular_common_1.hasObservers(this.close) ||
            kendo_angular_common_1.hasObservers(this.onBlur) ||
            kendo_angular_common_1.hasObservers(this.filterChange) ||
            util_1.isUntouched(this.hostElement.nativeElement)) {
            this._zone.run(function () {
                if (valueHasChanged) {
                    _this.selectionService.change(_this.selectionService.selected[0]);
                }
                _this.togglePopup(false);
                _this.clearFilter();
                _this.onBlur.emit();
                _this.onTouchedCallback();
            });
        }
        else {
            this.togglePopup(false);
        }
    };
    /**
     * @hidden
     */
    DropDownListComponent.prototype.onMouseDown = function (event) {
        var tagName = event.target.tagName.toLowerCase();
        if (tagName !== "input") {
            event.preventDefault();
        }
    };
    DropDownListComponent.prototype.onKeyPress = function (event) {
        if (event.which === 0 || event.keyCode === kendo_angular_common_2.Keys.Enter) {
            return;
        }
        var character = String.fromCharCode(event.charCode || event.keyCode);
        if (this.ignoreCase) {
            character = character.toLowerCase();
        }
        if (character === " ") {
            event.preventDefault();
        }
        this.word += character;
        this.last = character;
        this.search();
    };
    DropDownListComponent.prototype.search = function () {
        var _this = this;
        clearTimeout(this.typingTimeout);
        if (!this.filterable) {
            this.typingTimeout = setTimeout(function () { _this.word = ""; }, this.delay);
            this.selectNext();
        }
    };
    DropDownListComponent.prototype.selectNext = function () {
        var _this = this;
        var data = this.dataService
            .filter(function (item) { return util_1.isPresent(item) && !item.header && !_this.disabledItemsService.isItemDisabled(item); })
            .map(function (item) {
            if (_this.dataService.grouped) {
                return { item: item.value, itemIndex: item.offsetIndex };
            }
            return { item: item, itemIndex: _this.dataService.indexOf(item) };
        });
        var isInLoop = util_1.sameCharsOnly(this.word, this.last);
        var dataLength = data.length;
        var hasSelected = !isNaN(this.selectionService.selected[0]);
        var startIndex = !hasSelected ? 0 : this.selectionService.selected[0];
        var text, index, defaultItem;
        if (this.defaultItem && !this.disabledItemsService.isItemDisabled(this.defaultItem)) {
            defaultItem = { item: this.defaultItem, itemIndex: -1 };
            dataLength += 1;
            startIndex += 1;
        }
        startIndex += isInLoop && hasSelected ? 1 : 0;
        data = util_1.shuffleData(data, startIndex, defaultItem);
        index = 0;
        for (; index < dataLength; index++) {
            text = util_1.getter(data[index].item, this.textField);
            var loopMatch = Boolean(isInLoop && util_1.matchText(text, this.last, this.ignoreCase));
            var nextMatch = Boolean(util_1.matchText(text, this.word, this.ignoreCase));
            if (loopMatch || nextMatch) {
                index = data[index].itemIndex;
                break;
            }
        }
        if (index !== dataLength) {
            this.navigate(index);
        }
    };
    DropDownListComponent.prototype.emitChange = function (value) {
        this.onChangeCallback(value);
        this.valueChange.emit(value);
    };
    DropDownListComponent.prototype.navigate = function (index) {
        this.selectionService.select(index);
    };
    DropDownListComponent.prototype.prop = function (field, usePrimitive) {
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
    DropDownListComponent.prototype.findDataItem = function (_a) {
        var primitive = _a.primitive, valueField = _a.valueField, value = _a.value;
        var result = {
            dataItem: null,
            index: -1
        };
        var prop = this.prop(valueField, primitive);
        var comparer;
        if (this.dataService.grouped) {
            comparer = function (element) {
                return prop(element.value) === prop(value);
            };
        }
        else {
            comparer = function (element) {
                return prop(element) === prop(value);
            };
        }
        var index = this.dataService.findIndex(comparer);
        result.dataItem = this.dataService.itemAt(index);
        result.index = index;
        return result;
    };
    DropDownListComponent.prototype.setState = function () {
        var value = this.value;
        var valueField = this.valueField;
        var textField = this.textField;
        var primitive = this.valuePrimitive;
        if (this.defaultItem) {
            var defaultValue = this.prop(valueField, primitive)(this.defaultItem);
            var currentValue = this.prop(valueField, primitive)(value);
            if (!util_1.isPresent(value) || (currentValue === defaultValue)) {
                this.updateState({ dataItem: this.defaultItem, confirm: true });
                this.resetSelection(-1);
                if (this.filterable && this.filterText && this.dataService.itemsCount) {
                    this.selectionService.focused = this.firstFocusableIndex(0);
                }
                return;
            }
        }
        var resolved = this.findDataItem({ primitive: primitive, valueField: valueField, value: value });
        // The data and value are of same shape,
        // for example, value: 'foo', data: ['foo', 'bar']
        // or value: { value: 1, text: 'foo' }, data: [{ value: 1, text: 'foo' }].
        var ofSameType = !(primitive && textField);
        if (resolved.dataItem) {
            this.updateState({ dataItem: resolved.dataItem, confirm: true });
            this.resetSelection(resolved.index);
        }
        else if (util_1.isPresent(value) && ofSameType) {
            this.updateState({ dataItem: value });
            this.resetSelection();
        }
        else if (this._previousDataItem) {
            this.updateState({ dataItem: this._previousDataItem });
            this.resetSelection();
        }
        else {
            this.clearState();
            this.resetSelection();
        }
    };
    /**
     * @hidden
     */
    DropDownListComponent.prototype.handleFilter = function (event) {
        this.filterChange.emit(event.target.value);
    };
    /**
     * @hidden
     */
    DropDownListComponent.prototype.pageChange = function (event) {
        var virtual = this.virtual;
        virtual.skip = event.skip;
    };
    DropDownListComponent.prototype.setMessages = function () {
        var _this = this;
        this._zone.runOutsideAngular(function () {
            clearTimeout(_this.messagesTimeout);
            _this.messagesTimeout = setTimeout(function () {
                _this.noDataText = _this.localization.get('noDataText');
                _this.cdr.detectChanges();
            });
        });
    };
    DropDownListComponent.prototype.assignAriaDescribedBy = function () {
        var currentValue = this.wrapper.nativeElement.getAttribute('aria-describedby') || '';
        var trimmed = currentValue.replace(this.valueLabelId, '').trim();
        // reset the value label ID to force readers to read the new value
        this.valueLabelId = util_1.guid();
        // add to the current value - don't replace it
        var newValue = (this.valueLabelId + " " + trimmed).trim();
        this.renderer.setAttribute(this.wrapper.nativeElement, 'aria-describedby', newValue);
    };
    DropDownListComponent.decorators = [
        { type: core_1.Component, args: [{
                    exportAs: 'kendoDropDownList',
                    providers: [
                        exports.DROPDOWNLIST_VALUE_ACCESSOR,
                        data_service_1.DataService,
                        selection_service_1.SelectionService,
                        navigation_service_1.NavigationService,
                        disabled_items_service_1.DisabledItemsService,
                        kendo_angular_l10n_1.LocalizationService,
                        {
                            provide: kendo_angular_l10n_1.L10N_PREFIX,
                            useValue: 'kendo.dropdownlist'
                        },
                        {
                            provide: filterable_base_component_1.FilterableDropDownComponentBase, useExisting: core_1.forwardRef(function () { return DropDownListComponent; })
                        },
                        {
                            provide: kendo_angular_common_1.KendoInput, useExisting: core_1.forwardRef(function () { return DropDownListComponent; })
                        }
                    ],
                    selector: 'kendo-dropdownlist',
                    template: "\n        <ng-container kendoDropDownListLocalizedMessages\n            i18n-noDataText=\"kendo.dropdownlist.noDataText|The text displayed in the popup when there are no items\"\n            noDataText=\"NO DATA FOUND\"\n        >\n        </ng-container>\n        <span #wrapper unselectable=\"on\"\n          role=\"listbox\"\n          [id]=\"focusableId\"\n          [ngClass]=\"{\n            'k-dropdown-wrap': true,\n            'k-state-default': !this.disabled,\n            'k-state-disabled': this.disabled\n          }\"\n          [attr.dir]=\"direction\"\n          [attr.readonly]=\"readonly\"\n          [attr.tabindex]=\"widgetTabIndex\"\n          [attr.aria-disabled]=\"disabled\"\n          [attr.aria-readonly]=\"readonly\"\n          aria-haspopup=\"listbox\"\n          [attr.aria-expanded]=\"ariaExpanded\"\n          [attr.aria-owns]=\"ariaOwns\"\n          [attr.aria-activedescendant]=\"ariaActivedescendant\"\n          [attr.aria-label]=\"noDataLabel\"\n          (keydown)=\"keydown($event)\"\n          (keypress)=\"keypress($event)\"\n          (click)=\"click($event)\"\n          [kendoEventsOutsideAngular]=\"{\n            focus: focusComponent,\n            blur: blurComponent\n            }\"\n          [scope]=\"this\"\n        >\n            <span class=\"k-input\" unselectable=\"on\" [id]=\"valueLabelId\">\n               <ng-template *ngIf=\"valueTemplate\"\n                   [templateContext]=\"{\n                       templateRef: valueTemplate.templateRef,\n                       $implicit: dataItem\n                   }\">\n               </ng-template>\n               <ng-template [ngIf]=\"!valueTemplate\">{{ getText() }}</ng-template>\n           </span>\n           <span class=\"k-select\" unselectable=\"on\">\n               <span\n                    class=\"k-icon\"\n                    unselectable=\"on\"\n                    [ngClass]=\"buttonClasses\"\n                >\n                </span>\n           </span>\n           <ng-template #popupTemplate>\n               <!--filterable-->\n\n               <ng-template [ngIf]=\"filterable\">\n                   <span class=\"k-list-filter\" (click)=\"$event.stopImmediatePropagation()\">\n                       <input\n                           [attr.aria-owns]=\"ariaOwns\"\n                           [attr.aria-activedescendant]=\"ariaActivedescendant\"\n                           [attr.aria-label]=\"noDataLabel\"\n                           tabindex=\"-1\"\n                           [filterInput]=\"isFocused && !touchEnabled\"\n                           [dir]=\"direction\"\n                           [(ngModel)]=\"filterText\"\n                           class=\"k-textbox\"\n                           (keydown)=\"keydown($event)\"\n                           (input)=\"handleFilter($event)\"\n                           (focus)=\"onFilterFocus()\"\n                           (blur)=\"blurFilterInput()\" />\n                       <span class=\"k-icon k-i-search\" unselectable=\"on\"></span>\n                   </span>\n               </ng-template>\n               <!--default item-->\n               <ng-template [ngIf]=\"defaultItem && !itemTemplate\">\n                   <div class=\"k-list-optionlabel\" [ngClass]=\"{ 'k-state-disabled': isDisabledDefaultItem }\" kendoDropDownsSelectable [index]=\"-1\">\n                       {{ getDefaultItemText() }}\n                   </div>\n               </ng-template>\n               <ng-template [ngIf]=\"defaultItem && itemTemplate\">\n                   <div class=\"k-list-optionlabel\" [ngClass]=\"{ 'k-state-disabled': isDisabledDefaultItem }\" kendoDropDownsSelectable [index]=\"-1\">\n                       <ng-template\n                           [templateContext]=\"{\n                               templateRef: itemTemplate.templateRef,\n                               $implicit: defaultItem\n                           }\">\n                       </ng-template>\n                   </div>\n               </ng-template>\n               <!--header template-->\n               <ng-template *ngIf=\"headerTemplate\"\n                   [templateContext]=\"{\n                       templateRef: headerTemplate.templateRef\n                   }\">\n               </ng-template>\n               <!--list-->\n               <kendo-list\n                   #optionsList\n                   [id]=\"listBoxId\"\n                   [optionPrefix]=\"optionPrefix\"\n                   [data]=\"data\"\n                   [textField]=\"textField\"\n                   [valueField]=\"valueField\"\n                   [template]=\"itemTemplate\"\n                   [groupTemplate]=\"groupTemplate\"\n                   [fixedGroupTemplate]=\"fixedGroupTemplate\"\n                   [height]=\"listHeight\"\n                   [show]=\"isOpen\"\n                   [virtual]=\"virtual\"\n                   (pageChange)=\"pageChange($event)\"\n                   >\n               </kendo-list>\n               <!--no-data template-->\n               <div class=\"k-nodata\" *ngIf=\"data.length === 0\">\n                   <ng-template [ngIf]=\"noDataTemplate\"\n                       [templateContext]=\"{\n                           templateRef: noDataTemplate ? noDataTemplate.templateRef : undefined\n                       }\">\n                   </ng-template>\n                   <ng-template [ngIf]=\"!noDataTemplate\">\n                       <div>{{ noDataText }}</div>\n                   </ng-template>\n               </div>\n               <!--footer template-->\n               <ng-template *ngIf=\"footerTemplate\"\n                   [templateContext]=\"{\n                       templateRef: footerTemplate.templateRef\n                   }\">\n               </ng-template>\n            </ng-template>\n        </span>\n        <ng-template [ngIf]=\"isOpen\">\n            <kendo-resize-sensor (resize)=\"onResize()\"></kendo-resize-sensor>\n        </ng-template>\n        <ng-container #container></ng-container>\n  "
                },] },
    ];
    /** @nocollapse */
    DropDownListComponent.ctorParameters = function () { return [
        { type: kendo_angular_l10n_1.LocalizationService },
        { type: kendo_angular_popup_1.PopupService },
        { type: selection_service_1.SelectionService },
        { type: navigation_service_1.NavigationService },
        { type: disabled_items_service_1.DisabledItemsService },
        { type: data_service_1.DataService },
        { type: core_1.NgZone },
        { type: core_1.Renderer2 },
        { type: core_1.ElementRef },
        { type: core_1.ChangeDetectorRef },
        { type: Boolean, decorators: [{ type: core_1.Optional }, { type: core_1.Inject, args: [touch_enabled_1.TOUCH_ENABLED,] }] }
    ]; };
    DropDownListComponent.propDecorators = {
        focusableId: [{ type: core_1.Input }],
        iconClass: [{ type: core_1.Input }],
        loading: [{ type: core_1.Input }],
        data: [{ type: core_1.Input }],
        value: [{ type: core_1.Input }],
        textField: [{ type: core_1.Input }],
        valueField: [{ type: core_1.Input }],
        popupSettings: [{ type: core_1.Input }],
        listHeight: [{ type: core_1.Input }],
        defaultItem: [{ type: core_1.Input }],
        disabled: [{ type: core_1.Input }],
        itemDisabled: [{ type: core_1.Input }],
        readonly: [{ type: core_1.Input }],
        filterable: [{ type: core_1.Input }],
        virtual: [{ type: core_1.Input }],
        ignoreCase: [{ type: core_1.Input }],
        delay: [{ type: core_1.Input }],
        valuePrimitive: [{ type: core_1.Input }],
        tabindex: [{ type: core_1.Input }],
        tabIndex: [{ type: core_1.Input, args: ["tabIndex",] }],
        valueChange: [{ type: core_1.Output }],
        filterChange: [{ type: core_1.Output }],
        selectionChange: [{ type: core_1.Output }],
        open: [{ type: core_1.Output }],
        close: [{ type: core_1.Output }],
        onFocus: [{ type: core_1.Output, args: ['focus',] }],
        onBlur: [{ type: core_1.Output, args: ['blur',] }],
        itemTemplate: [{ type: core_1.ContentChild, args: [item_template_directive_1.ItemTemplateDirective,] }],
        groupTemplate: [{ type: core_1.ContentChild, args: [group_template_directive_1.GroupTemplateDirective,] }],
        fixedGroupTemplate: [{ type: core_1.ContentChild, args: [fixed_group_template_directive_1.FixedGroupTemplateDirective,] }],
        valueTemplate: [{ type: core_1.ContentChild, args: [value_template_directive_1.ValueTemplateDirective,] }],
        headerTemplate: [{ type: core_1.ContentChild, args: [header_template_directive_1.HeaderTemplateDirective,] }],
        footerTemplate: [{ type: core_1.ContentChild, args: [footer_template_directive_1.FooterTemplateDirective,] }],
        noDataTemplate: [{ type: core_1.ContentChild, args: [no_data_template_directive_1.NoDataTemplateDirective,] }],
        container: [{ type: core_1.ViewChild, args: ['container', { read: core_1.ViewContainerRef },] }],
        popupTemplate: [{ type: core_1.ViewChild, args: ['popupTemplate',] }],
        wrapper: [{ type: core_1.ViewChild, args: ['wrapper', { static: true },] }],
        optionsList: [{ type: core_1.ViewChild, args: ['optionsList',] }],
        widgetClasses: [{ type: core_1.HostBinding, args: ['class.k-widget',] }, { type: core_1.HostBinding, args: ['class.k-dropdown',] }, { type: core_1.HostBinding, args: ['class.k-header',] }],
        dir: [{ type: core_1.HostBinding, args: ['attr.dir',] }]
    };
    return DropDownListComponent;
}());
exports.DropDownListComponent = DropDownListComponent;
