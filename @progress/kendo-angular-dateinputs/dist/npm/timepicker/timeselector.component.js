/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var kendo_angular_intl_1 = require("@progress/kendo-angular-intl");
var kendo_date_math_1 = require("@progress/kendo-date-math");
var kendo_angular_common_1 = require("@progress/kendo-angular-common");
var defaults_1 = require("../defaults");
var timelist_component_1 = require("./timelist.component");
var dom_service_1 = require("./services/dom.service");
var util_1 = require("../util");
var util_2 = require("./util");
var picker_service_1 = require("../common/picker.service");
var dom_queries_1 = require("../common/dom-queries");
var utils_1 = require("../common/utils");
var listReducer = function (state, list, idx, all) {
    if (state.length || !list.isActive) {
        return state;
    }
    return [{
            next: all[idx + 1] || list,
            prev: all[idx - 1] || list
        }];
};
var ɵ0 = listReducer;
exports.ɵ0 = ɵ0;
var Direction;
(function (Direction) {
    Direction[Direction["Left"] = 0] = "Left";
    Direction[Direction["Right"] = 1] = "Right";
})(Direction || (Direction = {}));
/**
 * @hidden
 *
 * Represents the Kendo UI TimeSelector component for Angular.
 */
var TimeSelectorComponent = /** @class */ (function () {
    function TimeSelectorComponent(localization, cdr, element, intl, dom, zone, renderer, pickerService) {
        this.localization = localization;
        this.cdr = cdr;
        this.element = element;
        this.intl = intl;
        this.dom = dom;
        this.zone = zone;
        this.renderer = renderer;
        this.pickerService = pickerService;
        /**
         * @hidden
         */
        this.componentClass = true;
        /**
         * Specifies the time format used to display the time list columns.
         */
        this.format = 't';
        /**
         * Specifies the smallest valid time value.
         */
        this.min = kendo_date_math_1.cloneDate(defaults_1.MIN_TIME);
        /**
         * Specifies the biggest valid time value.
         */
        this.max = kendo_date_math_1.cloneDate(defaults_1.MAX_TIME);
        /**
         * Determines whether to display the **Cancel** button in the popup.
         */
        this.cancelButton = true;
        /**
         * Determines whether to display the **Set** button in the popup.
         */
        this.setButton = true;
        /**
         * Determines whether to display the **Now** button in the popup.
         *
         * > If the current time is out of range or the incremental step is greater than `1`, the **Now** button will be hidden.
         */
        this.nowButton = true;
        /**
         * Sets or gets the `disabled` property of the TimeSelector and determines whether the component is active.
         */
        this.disabled = false;
        /**
         * Specifies the value of the TimeSelector component.
         */
        this.value = null;
        /**
         * Fires each time the user selects a new value.
         */
        this.valueChange = new core_1.EventEmitter();
        /**
         * Fires each time the user cancels the selected value.
         */
        this.valueReject = new core_1.EventEmitter();
        this.isActive = false;
        this.showNowButton = true;
        this._activeListIndex = -1;
        this._steps = {};
        this.domEvents = [];
        if (this.pickerService) {
            this.pickerService.timeSelector = this;
        }
    }
    Object.defineProperty(TimeSelectorComponent.prototype, "disabledClass", {
        /**
         * @hidden
         */
        get: function () {
            return this.disabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeSelectorComponent.prototype, "steps", {
        get: function () {
            return this._steps;
        },
        /**
         * Configures the incremental steps of the TimeSelector.
         *
         * The available options are:
         * - `hour: Number`&mdash;Controls the incremental step of the hour value.
         * - `minute: Number`&mdash;Controls the incremental step of the minute value.
         * - `second: Number`&mdash;Controls the incremental step of the second value.
         *
         * @example
         * ```ts
         * _@Component({
         * selector: 'my-app',
         * template: `
         *  <kendo-timeselector format="HH:mm:ss" [steps]="steps"></kendo-timeselector>
         * `
         * })
         * export class AppComponent {
         *   public steps = { hour: 2, minute: 15, second: 15 };
         * }
         * ```
         *
         * > If the incremental step is greater than `1`, the **Now** button will be hidden.
         */
        set: function (steps) {
            this._steps = steps || {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeSelectorComponent.prototype, "current", {
        get: function () {
            return this._current;
        },
        set: function (value) {
            this._current = util_1.timeInRange(this.snapTime(kendo_date_math_1.cloneDate(value || defaults_1.MIDNIGHT_DATE), this.min), this.min, this.max);
            if (!core_1.NgZone.isInAngularZone()) {
                this.cdr.detectChanges();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeSelectorComponent.prototype, "activeListIndex", {
        get: function () {
            return this._activeListIndex;
        },
        set: function (value) {
            var _this = this;
            this._activeListIndex = value;
            if (!this.timeListWrappers || !this.timeListWrappers.length) {
                return;
            }
            this.timeListWrappers.forEach(function (listWrapper) {
                _this.renderer.removeClass(listWrapper.nativeElement, 'k-state-focused');
            });
            if (value >= 0) {
                var listIndex = this.listIndex(value);
                var focusedWrapper = this.timeListWrappers.toArray()[listIndex];
                if (focusedWrapper) {
                    this.renderer.addClass(focusedWrapper.nativeElement, 'k-state-focused');
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    TimeSelectorComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscriptions = this.intl.changes.subscribe(this.intlChange.bind(this));
        if (this.localization) {
            this.subscriptions.add(this.localization
                .changes
                .subscribe(function () { return _this.cdr.markForCheck(); }));
        }
        this.dom.calculateHeights(this.element.nativeElement);
        this.init();
        this.bindEvents();
    };
    /**
     * @hidden
     */
    TimeSelectorComponent.prototype.ngOnChanges = function (_) {
        this.init();
    };
    TimeSelectorComponent.prototype.ngOnDestroy = function () {
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
        }
        if (this.pickerService) {
            this.pickerService.timeSelector = null;
        }
        this.domEvents.forEach(function (unbindCallback) { return unbindCallback(); });
    };
    /**
     * Focuses the TimeSelector component.
     *
     * @example
     * ```ts
     * _@Component({
     * selector: 'my-app',
     * template: `
     *  <button (click)="timeselector.focus()">Focus time picker</button>
     *  <kendo-timeselector #timeselector></kendo-timeselector>
     * `
     * })
     * export class AppComponent { }
     * ```
     */
    TimeSelectorComponent.prototype.focus = function () {
        var list = this.timeLists.first;
        if (!list) {
            return;
        }
        list.focus();
    };
    /**
     * Blurs the TimeSelector component.
     */
    TimeSelectorComponent.prototype.blur = function () {
        var list = this.timeLists.first;
        if (!list) {
            return;
        }
        list.blur();
    };
    /**
     * @hidden
     */
    TimeSelectorComponent.prototype.handleAccept = function () {
        this.handleChange(this.mergeValue(kendo_date_math_1.cloneDate(this.value || kendo_date_math_1.getDate(util_1.getNow())), this.current));
    };
    /**
     * @hidden
     */
    TimeSelectorComponent.prototype.handleNow = function () {
        this.current = util_1.getNow();
        this.handleChange(this.current);
        this.cdr.markForCheck();
    };
    /**
     * @hidden
     */
    TimeSelectorComponent.prototype.handleReject = function () {
        this.current = this.value;
        this.valueReject.emit();
    };
    /**
     * @hidden
     */
    TimeSelectorComponent.prototype.handleFocus = function (args) {
        if (this.isActive) {
            return;
        }
        this.isActive = true;
        this.emitFocus(args);
    };
    /**
     * @hidden
     */
    TimeSelectorComponent.prototype.handleListFocus = function (args) {
        var index = parseInt(args.target.getAttribute('data-timelist-index'), 10);
        this.activeListIndex = index;
        this.handleFocus(args);
    };
    /**
     * @hidden
     */
    TimeSelectorComponent.prototype.handleBlur = function (args) {
        var currentTarget = utils_1.currentFocusTarget(args);
        if (currentTarget && this.containsElement(currentTarget)) {
            return;
        }
        this.activeListIndex = -1;
        this.isActive = false;
        this.emitBlur(args);
    };
    /**
     * @hidden
     */
    TimeSelectorComponent.prototype.containsElement = function (element) {
        var _this = this;
        return Boolean(dom_queries_1.closest(element, function (node) { return node === _this.element.nativeElement; }));
    };
    TimeSelectorComponent.prototype.partStep = function (part) {
        return this.steps[part.type] || 1;
    };
    TimeSelectorComponent.prototype.init = function (changes) {
        if (!changes || util_1.hasChange(changes, 'format')) {
            this.dateFormatParts = this.intl.splitDateFormat(this.format);
            this.mergeValue = util_2.valueMerger(util_2.generateGetters(this.dateFormatParts));
        }
        if (!changes || util_1.hasChange(changes, 'steps')) {
            this.snapTime = util_2.snapTime(util_2.generateSnappers(this.steps));
        }
        if (!changes || util_1.hasChange(changes, 'value')) {
            this.current = this.value;
        }
        this.showNowButton = !this.hasSteps() && this.nowButton && util_1.isInTimeRange(util_1.getNow(), this.min, this.max);
    };
    TimeSelectorComponent.prototype.focusList = function (dir) {
        if (!this.timeLists.length) {
            return;
        }
        this.timeLists.reduce(listReducer, [])
            .map(function (state) { return dir === Direction.Right ? state.next : state.prev; })
            .map(function (list) { return list && list.focus(); });
    };
    TimeSelectorComponent.prototype.handleChange = function (value) {
        this.value = value;
        this.valueChange.emit(kendo_date_math_1.cloneDate(value));
    };
    TimeSelectorComponent.prototype.hasActiveButton = function () {
        var _this = this;
        if (!this.accept) {
            return false;
        }
        return [this.accept, this.cancel, this.now].reduce(function (isActive, el) { return isActive || _this.dom.isActive(el); }, false);
    };
    TimeSelectorComponent.prototype.hasSteps = function () {
        var _this = this;
        var keys = Object.keys(this.steps);
        return keys.length !== keys.reduce(function (acc, k) { return acc + _this.steps[k]; }, 0);
    };
    TimeSelectorComponent.prototype.intlChange = function () {
        this.dateFormatParts = this.intl.splitDateFormat(this.format);
        this.mergeValue = util_2.valueMerger(util_2.generateGetters(this.dateFormatParts));
        this.cdr.markForCheck();
    };
    TimeSelectorComponent.prototype.bindEvents = function () {
        var _this = this;
        if (this.element) {
            this.zone.runOutsideAngular(function () {
                _this.domEvents.push(_this.renderer.listen(_this.element.nativeElement, 'keydown', _this.handleKeydown.bind(_this)));
            });
        }
    };
    TimeSelectorComponent.prototype.handleKeydown = function (args) {
        var keyCode = args.keyCode, altKey = args.altKey;
        // reserve the alt + arrow key commands for the picker
        var arrowKeyPressed = [kendo_angular_common_1.Keys.ArrowLeft, kendo_angular_common_1.Keys.ArrowRight].indexOf(keyCode) !== -1;
        if (utils_1.isPresent(this.pickerService) && arrowKeyPressed && altKey) {
            return;
        }
        if (keyCode === kendo_angular_common_1.Keys.Enter && !this.hasActiveButton()) {
            this.handleAccept();
        }
        else if (keyCode === kendo_angular_common_1.Keys.ArrowLeft || keyCode === kendo_angular_common_1.Keys.ArrowRight) {
            this.focusList(keyCode === kendo_angular_common_1.Keys.ArrowLeft ? Direction.Left : Direction.Right);
        }
    };
    TimeSelectorComponent.prototype.emitBlur = function (args) {
        if (this.pickerService) {
            this.pickerService.onBlur.emit(args);
        }
    };
    TimeSelectorComponent.prototype.emitFocus = function (args) {
        if (this.pickerService) {
            this.pickerService.onFocus.emit(args);
        }
    };
    TimeSelectorComponent.prototype.listIndex = function (partIndex) {
        var listIdx = 0;
        var partIdx = 0;
        while (partIdx < partIndex) {
            if (this.dateFormatParts[partIdx].type !== 'literal') {
                listIdx++;
            }
            partIdx++;
        }
        return listIdx;
    };
    TimeSelectorComponent.decorators = [
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    exportAs: 'kendo-timeselector',
                    providers: [
                        kendo_angular_l10n_1.LocalizationService,
                        {
                            provide: kendo_angular_l10n_1.L10N_PREFIX,
                            useValue: 'kendo.timeselector'
                        }
                    ],
                    selector: 'kendo-timeselector',
                    template: "\n        <ng-container kendoTimeSelectorLocalizedMessages\n            i18n-accept=\"kendo.timeselector.accept|The Accept button text in the timeselector component\"\n            accept=\"Set\"\n\n            i18n-acceptLabel=\"kendo.timeselector.acceptLabel|The label for the Accept button in the timeselector component\"\n            acceptLabel=\"Set time\"\n\n            i18n-cancel=\"kendo.timeselector.cancel|The Cancel button text in the timeselector component\"\n            cancel=\"Cancel\"\n\n            i18n-cancelLabel=\"kendo.timeselector.cancelLabel|The label for the Cancel button in the timeselector component\"\n            cancelLabel=\"Cancel changes\"\n\n            i18n-now=\"kendo.timeselector.now|The Now button text in the timeselector component\"\n            now=\"Now\"\n\n            i18n-nowLabel=\"kendo.timeselector.nowLabel|The label for the Now button in the timeselector component\"\n            nowLabel=\"Select now\"\n        >\n        </ng-container>\n        <div class=\"k-time-header\">\n            <span class=\"k-title\">\n                {{ intl.formatDate(current, format) }}\n            </span>\n            <button\n                #now\n                *ngIf=\"showNowButton\"\n                class=\"k-button k-bare k-time-now\" type=\"button\"\n                [attr.title]=\"localization.get('nowLabel')\"\n                [attr.aria-label]=\"localization.get('nowLabel')\"\n                [kendoEventsOutsideAngular]=\"{\n                    click: handleNow,\n                    focus: handleFocus,\n                    blur: handleBlur\n                }\"\n                [scope]=\"this\"\n                [disabled]=\"disabled\"\n            >{{localization.get('now')}}</button>\n        </div>\n        <div class=\"k-time-list-container\">\n            <span class=\"k-time-highlight\"></span>\n            <ng-template ngFor [ngForOf]=\"dateFormatParts\" let-part let-idx=\"index\">\n                <div\n                    #listWrapper\n                    class=\"k-time-list-wrapper\"\n                    role=\"presentation\" tabindex=\"-1\"\n                    *ngIf=\"part.type !== 'literal'\"\n                >\n                    <span class=\"k-title\">{{intl.dateFieldName(part)}}</span>\n                    <kendo-timelist\n                        [min]=\"min\"\n                        [max]=\"max\"\n                        [part]=\"part\"\n                        [step]=\"partStep(part)\"\n                        [disabled]=\"disabled\"\n                        [(value)]=\"current\"\n                        [kendoEventsOutsideAngular]=\"{\n                            focus: handleListFocus,\n                            blur: handleBlur\n                        }\"\n                        [scope]=\"this\"\n                        [attr.data-timelist-index]=\"idx\"\n                    ></kendo-timelist>\n                </div>\n                <div class=\"k-time-separator\" *ngIf=\"part.type === 'literal'\">\n                    {{part.pattern}}\n                </div>\n            </ng-template>\n        </div>\n        <div class=\"k-time-footer k-action-buttons\" *ngIf=\"setButton || cancelButton\">\n            <button\n                #cancel\n                *ngIf=\"cancelButton\"\n                class=\"k-button k-time-cancel\" type=\"button\"\n                [attr.title]=\"localization.get('cancelLabel')\"\n                [attr.aria-label]=\"localization.get('cancelLabel')\"\n                [kendoEventsOutsideAngular]=\"{\n                    click: handleReject,\n                    focus: handleFocus,\n                    blur: handleBlur\n                }\"\n                [scope]=\"this\"\n                [disabled]=\"disabled\"\n            >{{localization.get('cancel')}}</button>\n            <button\n                #accept\n                *ngIf=\"setButton\"\n                type=\"button\"\n                class=\"k-time-accept k-button k-primary\"\n                [attr.title]=\"localization.get('acceptLabel')\"\n                [attr.aria-label]=\"localization.get('acceptLabel')\"\n                [kendoEventsOutsideAngular]=\"{\n                    click: handleAccept,\n                    focus: handleFocus,\n                    blur: handleBlur\n                }\"\n                [scope]=\"this\"\n                [disabled]=\"disabled\"\n            >{{localization.get('accept')}}</button>\n        </div>\n    "
                },] },
    ];
    /** @nocollapse */
    TimeSelectorComponent.ctorParameters = function () { return [
        { type: kendo_angular_l10n_1.LocalizationService },
        { type: core_1.ChangeDetectorRef },
        { type: core_1.ElementRef },
        { type: kendo_angular_intl_1.IntlService },
        { type: dom_service_1.TimePickerDOMService },
        { type: core_1.NgZone },
        { type: core_1.Renderer2 },
        { type: picker_service_1.PickerService, decorators: [{ type: core_1.Optional }] }
    ]; };
    TimeSelectorComponent.propDecorators = {
        accept: [{ type: core_1.ViewChild, args: ['accept',] }],
        cancel: [{ type: core_1.ViewChild, args: ['cancel',] }],
        now: [{ type: core_1.ViewChild, args: ['now',] }],
        timeLists: [{ type: core_1.ViewChildren, args: [timelist_component_1.TimeListComponent,] }],
        timeListWrappers: [{ type: core_1.ViewChildren, args: ['listWrapper',] }],
        componentClass: [{ type: core_1.HostBinding, args: ['class.k-timeselector',] }],
        disabledClass: [{ type: core_1.HostBinding, args: ['class.k-state-disabled',] }],
        format: [{ type: core_1.Input }],
        min: [{ type: core_1.Input }],
        max: [{ type: core_1.Input }],
        cancelButton: [{ type: core_1.Input }],
        setButton: [{ type: core_1.Input }],
        nowButton: [{ type: core_1.Input }],
        disabled: [{ type: core_1.Input }],
        steps: [{ type: core_1.Input }],
        value: [{ type: core_1.Input }],
        valueChange: [{ type: core_1.Output }],
        valueReject: [{ type: core_1.Output }]
    };
    return TimeSelectorComponent;
}());
exports.TimeSelectorComponent = TimeSelectorComponent;
