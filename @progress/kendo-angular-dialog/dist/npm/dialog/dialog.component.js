/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var animations_1 = require("@angular/animations");
var dialog_actions_component_1 = require("./dialog-actions.component");
var dialog_titlebar_component_1 = require("./dialog-titlebar.component");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var util_1 = require("../common/util");
var dialog_settings_1 = require("./dialog-settings");
var dialog_localization_service_1 = require("./../localization/dialog-localization.service");
/**
 * Represents the [Kendo UI Dialog component for Angular]({% slug overview_dialog_dialogs %}).
 */
var DialogComponent = /** @class */ (function () {
    function DialogComponent(_elRef, _renderer, localization, cdr) {
        var _this = this;
        this._elRef = _elRef;
        this._renderer = _renderer;
        this.cdr = cdr;
        /**
         * Specifies the layout of the action buttons in the Dialog.
         * This option is only applicable if the action buttons are specified through the `actions` options.
         *
         * @default 'stretched'
         */
        this.actionsLayout = 'stretched';
        /**
         * @hidden
         */
        this.titleId = null;
        /**
         * Fires when the user clicks an action button of the Dialog.
         * The event is fired only when the action buttons are specified through the `actions` options.
         */
        this.action = new core_1.EventEmitter();
        /**
         * Fires when the user clicks the **Close** button of the Dialog.
         */
        this.close = new core_1.EventEmitter();
        this.tabIndex = 0;
        this.subscriptions = [];
        this.direction = localization.rtl ? 'rtl' : 'ltr';
        this.subscriptions.push(localization.changes.subscribe(function (_a) {
            var rtl = _a.rtl;
            return (_this.direction = rtl ? 'rtl' : 'ltr');
        }));
        this.titleId = this.generateTitleId();
    }
    Object.defineProperty(DialogComponent.prototype, "dir", {
        get: function () {
            return this.direction;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    DialogComponent.prototype.onComponentKeydown = function (event) {
        var target = event.target;
        var parent = target.parentElement;
        if (util_1.hasClasses(target, util_1.DIALOG_ELEMENTS_HANDLING_ESC_KEY) || util_1.hasClasses(parent, util_1.DIALOG_ELEMENTS_HANDLING_ESC_KEY)) {
            if (event.keyCode === util_1.Keys.esc) {
                this.close.emit(new dialog_settings_1.DialogCloseResult());
            }
        }
        if (util_1.hasClasses(target, 'k-button') &&
            util_1.hasClasses(parent, util_1.DIALOG_ELEMENTS_HANDLING_ARROWS) &&
            (event.keyCode === util_1.Keys.left || event.keyCode === util_1.Keys.right)) {
            this.handleActionButtonFocus(parent, event.keyCode);
        }
        if (event.keyCode === util_1.Keys.tab) {
            this.keepFocusWithinComponent(target, event);
        }
    };
    DialogComponent.prototype.ngAfterContentInit = function () {
        this.bubble('close', this.titlebarContent);
        if (this.titlebarContent) {
            this.titlebarContent.id = this.titleId;
        }
    };
    DialogComponent.prototype.ngAfterViewInit = function () {
        this.handleInitialFocus();
        this.bubble('close', this.titlebarView);
        this.bubble('action', this.actionsView);
        if (this.titlebarView || this.titlebarContent) {
            //Needed for Dialogs created via service
            this._renderer.setAttribute(this._elRef.nativeElement.querySelector('.k-dialog'), 'aria-labelledby', this.titleId);
        }
    };
    DialogComponent.prototype.ngOnInit = function () {
        this._renderer.removeAttribute(this._elRef.nativeElement, 'title');
        this.cdr.detectChanges();
    };
    DialogComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (s) { return s.unsubscribe(); });
        this.subscriptions = [];
    };
    /**
     * Focuses the wrapper of the Dialog component.
     */
    DialogComponent.prototype.focus = function () {
        var wrapper = this._elRef.nativeElement;
        if (util_1.isPresent(wrapper)) {
            wrapper.focus();
        }
    };
    /**
     * @hidden
     */
    DialogComponent.prototype.handleInitialFocus = function () {
        var wrapper = this._elRef.nativeElement;
        var primaryButton = wrapper.querySelector('.k-primary');
        if (this.autoFocusedElement) {
            var initiallyFocusedElement = wrapper.querySelector(this.autoFocusedElement);
            if (initiallyFocusedElement) {
                initiallyFocusedElement.focus();
            }
        }
        else if (this.shouldFocusPrimary(primaryButton)) {
            primaryButton.focus();
        }
        else {
            wrapper.focus();
        }
    };
    /**
     * @hidden
     */
    DialogComponent.prototype.handleActionButtonFocus = function (parent, key) {
        var focusableActionButtons = this.getAllFocusableChildren(parent);
        for (var i = 0; i < focusableActionButtons.length; i++) {
            var current = focusableActionButtons[i];
            if (current === document.activeElement) {
                if (key === util_1.Keys.left && i > 0) {
                    focusableActionButtons[i - 1].focus();
                    break;
                }
                if (key === util_1.Keys.right && i < focusableActionButtons.length - 1) {
                    focusableActionButtons[i + 1].focus();
                    break;
                }
            }
        }
    };
    /**
     * @hidden
     */
    DialogComponent.prototype.keepFocusWithinComponent = function (target, event) {
        var firstFocusable = this._elRef.nativeElement;
        var lastFocusable = this.getLastFocusableElement(firstFocusable);
        var tabBeforeFirstFocusable = target === firstFocusable && event.shiftKey;
        var tabAfterLastFocusable = !event.shiftKey && util_1.isPresent(lastFocusable) && target === lastFocusable;
        var tabWithNoFocusable = !util_1.isPresent(lastFocusable) && !event.shiftKey;
        if (tabBeforeFirstFocusable || tabWithNoFocusable) {
            event.preventDefault();
            firstFocusable.focus();
        }
        if (tabAfterLastFocusable) {
            event.preventDefault();
            lastFocusable.focus();
        }
    };
    /**
     * @hidden
     */
    DialogComponent.prototype.shouldFocusPrimary = function (el) {
        return util_1.isPresent(el) && util_1.isFocusable(el);
    };
    /**
     * @hidden
     */
    DialogComponent.prototype.getAllFocusableChildren = function (parent) {
        return parent.querySelectorAll(util_1.focusableSelector);
    };
    /**
     * @hidden
     */
    DialogComponent.prototype.getLastFocusableElement = function (parent) {
        var all = this.getAllFocusableChildren(parent);
        return all.length > 0 ? all[all.length - 1] : null;
    };
    /**
     * @hidden
     */
    DialogComponent.prototype.generateTitleId = function () {
        return 'kendo-dialog-title-' + Math.ceil(Math.random() * 1000000).toString();
    };
    Object.defineProperty(DialogComponent.prototype, "wrapperClass", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DialogComponent.prototype, "styles", {
        get: function () {
            var styles = {};
            if (this.width) {
                styles.width = util_1.createValueWithUnit(this.width);
            }
            if (this.height) {
                styles.height = util_1.createValueWithUnit(this.height);
            }
            if (this.minWidth) {
                styles.minWidth = util_1.createValueWithUnit(this.minWidth);
            }
            if (this.maxWidth) {
                styles.maxWidth = util_1.createValueWithUnit(this.maxWidth);
            }
            if (this.minHeight) {
                styles.minHeight = util_1.createValueWithUnit(this.minHeight);
            }
            if (this.maxHeight) {
                styles.maxHeight = util_1.createValueWithUnit(this.maxHeight);
            }
            return styles;
        },
        enumerable: true,
        configurable: true
    });
    DialogComponent.prototype.bubble = function (eventName, component) {
        var _this = this;
        if (component) {
            var emit = function (e) { return _this[eventName].emit(e); };
            var s = component[eventName].subscribe(emit);
            this.subscriptions.push(s);
        }
    };
    DialogComponent.decorators = [
        { type: core_1.Component, args: [{
                    animations: [
                        animations_1.trigger('overlayAppear', [
                            animations_1.state('in', animations_1.style({ opacity: 1 })),
                            animations_1.transition('void => *', [animations_1.style({ opacity: 0.1 }), animations_1.animate('.3s cubic-bezier(.2, .6, .4, 1)')])
                        ]),
                        animations_1.trigger('dialogSlideInAppear', [
                            animations_1.state('in', animations_1.style({ transform: 'translate(0, 0)' })),
                            animations_1.transition('void => *', [animations_1.style({ transform: 'translate(0, -10%)' }), animations_1.animate('.3s cubic-bezier(.2, 1, .2, 1)')])
                        ])
                    ],
                    exportAs: 'kendoDialog',
                    providers: [
                        kendo_angular_l10n_1.LocalizationService,
                        {
                            provide: dialog_localization_service_1.DIALOG_LOCALIZATION_SERVICE,
                            useExisting: kendo_angular_l10n_1.LocalizationService
                        },
                        {
                            provide: kendo_angular_l10n_1.L10N_PREFIX,
                            useValue: 'kendo.dialog'
                        }
                    ],
                    selector: 'kendo-dialog',
                    template: "\n        <ng-container\n            kendoDialogLocalizedMessages\n            i18n-closeTitle=\"kendo.dialog.closeTitle|The title of the close button\"\n            closeTitle=\"Close\"\n        >\n        <div class=\"k-overlay\" @overlayAppear></div>\n\n        <div class=\"k-widget k-window k-dialog\" role=\"dialog\" [ngStyle]=\"styles\" @dialogSlideInAppear>\n            <kendo-dialog-titlebar *ngIf=\"title\" [closeTitle]=\"closeTitle\" [id]=\"titleId\">{{ title }}</kendo-dialog-titlebar>\n            <ng-content select=\"kendo-dialog-titlebar\" *ngIf=\"!title\"></ng-content>\n\n            <div class=\"k-content k-window-content k-dialog-content\">\n                <ng-content *ngIf=\"!contentTemplate\"></ng-content>\n                <ng-template [ngTemplateOutlet]=\"contentTemplate\" *ngIf=\"contentTemplate\"></ng-template>\n            </div>\n\n            <ng-content select=\"kendo-dialog-actions\" *ngIf=\"!actions\"></ng-content>\n            <kendo-dialog-actions *ngIf=\"actions\" [actions]=\"actions\" [layout]=\"actionsLayout\"> </kendo-dialog-actions>\n        </div>\n    </ng-container>\n    "
                },] },
    ];
    /** @nocollapse */
    DialogComponent.ctorParameters = function () { return [
        { type: core_1.ElementRef },
        { type: core_1.Renderer2 },
        { type: kendo_angular_l10n_1.LocalizationService },
        { type: core_1.ChangeDetectorRef }
    ]; };
    DialogComponent.propDecorators = {
        actions: [{ type: core_1.Input }],
        actionsLayout: [{ type: core_1.Input }],
        autoFocusedElement: [{ type: core_1.Input }],
        title: [{ type: core_1.Input }],
        width: [{ type: core_1.Input }],
        minWidth: [{ type: core_1.Input }],
        maxWidth: [{ type: core_1.Input }],
        height: [{ type: core_1.Input }],
        minHeight: [{ type: core_1.Input }],
        maxHeight: [{ type: core_1.Input }],
        action: [{ type: core_1.Output }],
        close: [{ type: core_1.Output }],
        dir: [{ type: core_1.HostBinding, args: ['attr.dir',] }],
        tabIndex: [{ type: core_1.HostBinding, args: ['attr.tabIndex',] }],
        titlebarContent: [{ type: core_1.ContentChild, args: [dialog_titlebar_component_1.DialogTitleBarComponent,] }],
        titlebarView: [{ type: core_1.ViewChild, args: [dialog_titlebar_component_1.DialogTitleBarComponent,] }],
        actionsView: [{ type: core_1.ViewChild, args: [dialog_actions_component_1.DialogActionsComponent,] }],
        onComponentKeydown: [{ type: core_1.HostListener, args: ['keydown', ['$event'],] }],
        wrapperClass: [{ type: core_1.HostBinding, args: ['class.k-dialog-wrapper',] }]
    };
    return DialogComponent;
}());
exports.DialogComponent = DialogComponent;
