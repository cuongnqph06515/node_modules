/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { TemplateRef, Component, ElementRef, Input, Output, HostBinding, EventEmitter, Optional, InjectionToken, Renderer2, ChangeDetectorRef, ContentChild, ViewChild, HostListener, Injectable, isDevMode, ComponentFactoryResolver, Inject, NgZone, Directive, Host, ViewChildren, ViewContainerRef, forwardRef, NgModule } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { LocalizationService, L10N_PREFIX, ComponentMessages } from '@progress/kendo-angular-l10n';
import { Subject, merge, Subscription, of } from 'rxjs';
import { filter, map, take, share, tap, switchMap, takeUntil } from 'rxjs/operators';
import { DraggableDirective, isChanged, isDocumentAvailable, DraggableModule } from '@progress/kendo-angular-common';
import { offset, scrollPosition, positionWithScroll, getDocumentElement, getWindowViewPort } from '@progress/kendo-popup-common';
import { __extends } from 'tslib';
import { Button } from '@progress/kendo-angular-buttons';
import { CommonModule } from '@angular/common';

/**
 * Specifies the action buttons of the Dialog
 * ([see example]({% slug actionbuttons_dialog %})).
 */
var DialogActionsComponent = /** @class */ (function () {
    function DialogActionsComponent(el) {
        this.el = el;
        /**
         * Specifies the possible layout of the action buttons.
         */
        this.layout = 'stretched';
        /**
         * Fires when the user clicks an action button.
         */
        this.action = new EventEmitter();
        this.buttonGroupClassName = true;
    }
    Object.defineProperty(DialogActionsComponent.prototype, "className", {
        get: function () {
            return this.layout === 'stretched';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    DialogActionsComponent.prototype.actionTemplate = function () {
        return this.actions instanceof TemplateRef;
    };
    /**
     * @hidden
     */
    DialogActionsComponent.prototype.onButtonClick = function (action, _e) {
        this.action.emit(action);
    };
    /**
     * @hidden
     */
    DialogActionsComponent.prototype.buttonClass = function (action) {
        var classes = ['k-button'];
        if (action.primary) {
            classes.push('k-primary');
        }
        return classes.join(' ');
    };
    DialogActionsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-dialog-actions',
                    template: "\n        <ng-content *ngIf=\"!actions\"></ng-content>\n        <ng-container *ngIf=\"!actionTemplate()\">\n            <button\n                type=\"button\"\n                [ngClass]=\"buttonClass(action)\"\n                (click)=\"onButtonClick(action, $event)\"\n                *ngFor=\"let action of actions\"\n                [attr.aria-label]=\"action.text\"\n            >\n                {{ action.text }}\n            </button>\n        </ng-container>\n        <ng-template [ngTemplateOutlet]=\"actions\" *ngIf=\"actionTemplate()\"></ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    DialogActionsComponent.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    DialogActionsComponent.propDecorators = {
        actions: [{ type: Input }],
        layout: [{ type: Input }],
        action: [{ type: Output }],
        buttonGroupClassName: [{ type: HostBinding, args: ['class.k-dialog-buttongroup',] }],
        className: [{ type: HostBinding, args: ['class.k-dialog-button-layout-stretched',] }]
    };
    return DialogActionsComponent;
}());

/**
 * @hidden
 */
var PreventableEvent = /** @class */ (function () {
    function PreventableEvent() {
        this.prevented = false;
    }
    /**
     * Prevents the default action for a specified event.
     * In this way, the source component suppresses the built-in behavior that follows the event.
     */
    PreventableEvent.prototype.preventDefault = function () {
        this.prevented = true;
    };
    /**
     * If the event is prevented by any of its subscribers, returns `true`.
     *
     * @returns `true` if the default action was prevented. Otherwise, returns `false`.
     */
    PreventableEvent.prototype.isDefaultPrevented = function () {
        return this.prevented;
    };
    return PreventableEvent;
}());

/**
 * Represents the [Kendo UI DialogTitleBar component for Angular]({% slug api_dialog_dialogtitlebarcomponent %}).
 *
 * It is used as part of the Dialog content when the component is created dynamically by using an [Angular service]({% slug service_dialog %}).
 */
var DialogTitleBarComponent = /** @class */ (function () {
    function DialogTitleBarComponent(hostElement, localizationService) {
        this.hostElement = hostElement;
        this.localizationService = localizationService;
        /**
         * Fires when the close button of the title-bar is clicked.
         */
        this.close = new EventEmitter();
    }
    Object.defineProperty(DialogTitleBarComponent.prototype, "className", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DialogTitleBarComponent.prototype, "closeButtonTitle", {
        get: function () {
            return this.localizationService.get('closeTitle');
        },
        enumerable: true,
        configurable: true
    });
    DialogTitleBarComponent.prototype.ngAfterViewChecked = function () {
        var element = this.hostElement.nativeElement;
        element.setAttribute('id', this.id);
    };
    /**
     * @hidden
     */
    DialogTitleBarComponent.prototype.onCloseClick = function (e) {
        e.preventDefault();
        var eventArgs = new PreventableEvent();
        this.close.emit(eventArgs);
    };
    DialogTitleBarComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-dialog-titlebar',
                    template: "\n        <div class=\"k-window-title k-dialog-title\">\n            <ng-content></ng-content>\n        </div>\n\n        <div class=\"k-window-actions k-dialog-actions\">\n            <a\n                href=\"#\"\n                role=\"button\"\n                [attr.title]=\"closeButtonTitle\"\n                [attr.aria-label]=\"closeButtonTitle\"\n                class=\"k-button k-bare k-button-icon k-window-action k-dialog-action k-dialog-close\"\n                (click)=\"onCloseClick($event)\"\n            >\n                <span class=\"k-icon k-i-x\"></span>\n            </a>\n        </div>\n    "
                },] },
    ];
    /** @nocollapse */
    DialogTitleBarComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: LocalizationService, decorators: [{ type: Optional }] }
    ]; };
    DialogTitleBarComponent.propDecorators = {
        close: [{ type: Output }],
        id: [{ type: Input }],
        closeTitle: [{ type: Input }],
        className: [{ type: HostBinding, args: ['class.k-window-titlebar',] }, { type: HostBinding, args: ['class.k-dialog-titlebar',] }]
    };
    return DialogTitleBarComponent;
}());

/**
 * @hidden
 */
var isPresent = function (value) { return value !== null && value !== undefined; };
/**
 * @hidden
 */
var isTruthy = function (value) { return !!value; };
var toClassList = function (classNames) { return String(classNames).trim().split(' '); };
var focusableRegex = /^(?:a|input|select|textarea|button|object)$/i;
/**
 * @hidden
 */
var Keys;
(function (Keys) {
    Keys[Keys["esc"] = 27] = "esc";
    Keys[Keys["tab"] = 9] = "tab";
    Keys[Keys["enter"] = 13] = "enter";
    Keys[Keys["space"] = 32] = "space";
    Keys[Keys["ctrl"] = 17] = "ctrl";
    Keys[Keys["shift"] = 16] = "shift";
    Keys[Keys["left"] = 37] = "left";
    Keys[Keys["up"] = 38] = "up";
    Keys[Keys["right"] = 39] = "right";
    Keys[Keys["down"] = 40] = "down";
})(Keys || (Keys = {}));
/**
 * @hidden
 */
var DIALOG_ELEMENTS_HANDLING_ESC_KEY = 'k-dialog-wrapper k-dialog-buttongroup k-dialog-action';
/**
 * @hidden
 */
var DIALOG_ELEMENTS_HANDLING_ARROWS = 'k-dialog-buttongroup';
/**
 * @hidden
 */
var WINDOW_CLASSES = 'k-window';
/**
 * @hidden
 */
var hasClasses = function (element, classNames) {
    var namesList = toClassList(classNames);
    return Boolean(toClassList(element.className).find(function (className) { return namesList.indexOf(className) >= 0; }));
};
/**
 * @hidden
 */
var isVisible = function (element) {
    var rect = element.getBoundingClientRect();
    return !!(rect.width && rect.height) && window.getComputedStyle(element).visibility !== 'hidden';
};
/**
 * @hidden
 */
var isFocusable = function (element, checkVisibility) {
    if (checkVisibility === void 0) { checkVisibility = true; }
    if (element.tagName) {
        var tagName = element.tagName.toLowerCase();
        var tabIndex = element.getAttribute('tabIndex');
        var validTabIndex = tabIndex !== null && !isNaN(tabIndex) && tabIndex > -1;
        var focusable = false;
        if (focusableRegex.test(tagName)) {
            focusable = !element.disabled;
        }
        else {
            focusable = validTabIndex;
        }
        return focusable && (!checkVisibility || isVisible(element));
    }
    return false;
};
/**
 * @hidden
 */
var focusableSelector = [
    'a[href]',
    'area[href]',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'button:not([disabled])',
    'iframe',
    'object',
    'embed',
    '*[tabindex]',
    '*[contenteditable]'
].join(',');
/**
 * @hidden
 */
var preventDefault = function (_a) {
    var event = _a.originalEvent;
    event.stopPropagation();
    event.preventDefault();
};
/**
 * @hidden
 */
var RESIZE_DIRECTIONS = ['n', 'e', 's', 'w', 'se', 'sw', 'ne', 'nw'];
/**
 * @hidden
 */
var OFFSET_STYLES = ['top', 'left', 'width', 'height'];
/**
 * @hidden
 */
var isString = function (value) { return value instanceof String || typeof value === 'string'; };
/**
 * @hidden
 */
var isNumber = function (value) { return typeof value === 'number' && isFinite(value); };
/**
 * @hidden
 */
var createValueWithUnit = function (value) { return value + (isNumber(value) ? 'px' : ''); };

/**
 * The settings for the Dialog actions when the Dialog is opened through `DialogService`
 * ([see example]({% slug api_dialog_dialogservice %}#toc-open)).
 */
var DialogAction = /** @class */ (function () {
    function DialogAction() {
    }
    return DialogAction;
}());
/**
 * Indicates that the **Close** button is clicked. Used when the results from
 * the Dialogs that are opened through `DialogService` are filtered
 * ([see example]({% slug api_dialog_dialogservice %}#toc-open)).
 */
var DialogCloseResult = /** @class */ (function () {
    function DialogCloseResult() {
    }
    return DialogCloseResult;
}());
/**
 * The settings that can be used when the Dialog is opened through `DialogService`.
 * ([see example]({% slug api_dialog_dialogservice %}#toc-open)).
 */
var DialogSettings = /** @class */ (function () {
    function DialogSettings() {
    }
    return DialogSettings;
}());
/**
 * Holds references to the object instance and published events of the Dialog.
 * Controls the Dialogs that were opened through the `DialogService`
 * ([see example]({% slug api_dialog_dialogservice %}#toc-open)).
 */
var DialogRef = /** @class */ (function () {
    function DialogRef() {
    }
    return DialogRef;
}());

/**
 * @hidden
 */
var DIALOG_LOCALIZATION_SERVICE = new InjectionToken('Dialog LocalizationService');

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
        this.action = new EventEmitter();
        /**
         * Fires when the user clicks the **Close** button of the Dialog.
         */
        this.close = new EventEmitter();
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
        if (hasClasses(target, DIALOG_ELEMENTS_HANDLING_ESC_KEY) || hasClasses(parent, DIALOG_ELEMENTS_HANDLING_ESC_KEY)) {
            if (event.keyCode === Keys.esc) {
                this.close.emit(new DialogCloseResult());
            }
        }
        if (hasClasses(target, 'k-button') &&
            hasClasses(parent, DIALOG_ELEMENTS_HANDLING_ARROWS) &&
            (event.keyCode === Keys.left || event.keyCode === Keys.right)) {
            this.handleActionButtonFocus(parent, event.keyCode);
        }
        if (event.keyCode === Keys.tab) {
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
        if (isPresent(wrapper)) {
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
                if (key === Keys.left && i > 0) {
                    focusableActionButtons[i - 1].focus();
                    break;
                }
                if (key === Keys.right && i < focusableActionButtons.length - 1) {
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
        var tabAfterLastFocusable = !event.shiftKey && isPresent(lastFocusable) && target === lastFocusable;
        var tabWithNoFocusable = !isPresent(lastFocusable) && !event.shiftKey;
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
        return isPresent(el) && isFocusable(el);
    };
    /**
     * @hidden
     */
    DialogComponent.prototype.getAllFocusableChildren = function (parent) {
        return parent.querySelectorAll(focusableSelector);
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
                styles.width = createValueWithUnit(this.width);
            }
            if (this.height) {
                styles.height = createValueWithUnit(this.height);
            }
            if (this.minWidth) {
                styles.minWidth = createValueWithUnit(this.minWidth);
            }
            if (this.maxWidth) {
                styles.maxWidth = createValueWithUnit(this.maxWidth);
            }
            if (this.minHeight) {
                styles.minHeight = createValueWithUnit(this.minHeight);
            }
            if (this.maxHeight) {
                styles.maxHeight = createValueWithUnit(this.maxHeight);
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
        { type: Component, args: [{
                    animations: [
                        trigger('overlayAppear', [
                            state('in', style({ opacity: 1 })),
                            transition('void => *', [style({ opacity: 0.1 }), animate('.3s cubic-bezier(.2, .6, .4, 1)')])
                        ]),
                        trigger('dialogSlideInAppear', [
                            state('in', style({ transform: 'translate(0, 0)' })),
                            transition('void => *', [style({ transform: 'translate(0, -10%)' }), animate('.3s cubic-bezier(.2, 1, .2, 1)')])
                        ])
                    ],
                    exportAs: 'kendoDialog',
                    providers: [
                        LocalizationService,
                        {
                            provide: DIALOG_LOCALIZATION_SERVICE,
                            useExisting: LocalizationService
                        },
                        {
                            provide: L10N_PREFIX,
                            useValue: 'kendo.dialog'
                        }
                    ],
                    selector: 'kendo-dialog',
                    template: "\n        <ng-container\n            kendoDialogLocalizedMessages\n            i18n-closeTitle=\"kendo.dialog.closeTitle|The title of the close button\"\n            closeTitle=\"Close\"\n        >\n        <div class=\"k-overlay\" @overlayAppear></div>\n\n        <div class=\"k-widget k-window k-dialog\" role=\"dialog\" [ngStyle]=\"styles\" @dialogSlideInAppear>\n            <kendo-dialog-titlebar *ngIf=\"title\" [closeTitle]=\"closeTitle\" [id]=\"titleId\">{{ title }}</kendo-dialog-titlebar>\n            <ng-content select=\"kendo-dialog-titlebar\" *ngIf=\"!title\"></ng-content>\n\n            <div class=\"k-content k-window-content k-dialog-content\">\n                <ng-content *ngIf=\"!contentTemplate\"></ng-content>\n                <ng-template [ngTemplateOutlet]=\"contentTemplate\" *ngIf=\"contentTemplate\"></ng-template>\n            </div>\n\n            <ng-content select=\"kendo-dialog-actions\" *ngIf=\"!actions\"></ng-content>\n            <kendo-dialog-actions *ngIf=\"actions\" [actions]=\"actions\" [layout]=\"actionsLayout\"> </kendo-dialog-actions>\n        </div>\n    </ng-container>\n    "
                },] },
    ];
    /** @nocollapse */
    DialogComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: LocalizationService },
        { type: ChangeDetectorRef }
    ]; };
    DialogComponent.propDecorators = {
        actions: [{ type: Input }],
        actionsLayout: [{ type: Input }],
        autoFocusedElement: [{ type: Input }],
        title: [{ type: Input }],
        width: [{ type: Input }],
        minWidth: [{ type: Input }],
        maxWidth: [{ type: Input }],
        height: [{ type: Input }],
        minHeight: [{ type: Input }],
        maxHeight: [{ type: Input }],
        action: [{ type: Output }],
        close: [{ type: Output }],
        dir: [{ type: HostBinding, args: ['attr.dir',] }],
        tabIndex: [{ type: HostBinding, args: ['attr.tabIndex',] }],
        titlebarContent: [{ type: ContentChild, args: [DialogTitleBarComponent,] }],
        titlebarView: [{ type: ViewChild, args: [DialogTitleBarComponent,] }],
        actionsView: [{ type: ViewChild, args: [DialogActionsComponent,] }],
        onComponentKeydown: [{ type: HostListener, args: ['keydown', ['$event'],] }],
        wrapperClass: [{ type: HostBinding, args: ['class.k-dialog-wrapper',] }]
    };
    return DialogComponent;
}());

/**
 * The base class  which will be extended by a component that is provided as content through `content`
 * ([see example]({% slug service_dialog %}#toc-passing-title-content-and-actions-as-a-single-component)).
 */
var DialogContentBase = /** @class */ (function () {
    function DialogContentBase(dialog) {
        this.dialog = dialog;
    }
    /**
     * @hidden
     */
    DialogContentBase.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (this.dialogTitleBar) {
            // when opening component inside dialog with service AND the component has defined its own titlebar
            this.dialogTitleBar.close.pipe(filter(function (e) { return !e.isDefaultPrevented(); })).subscribe(function () {
                _this.dialog.close();
            });
        }
        if (this.dialogActions) {
            if (this.dialogActions.actions) {
                this.dialogActions.action.subscribe(function (action) { return _this.dialog.dialog.instance.action.emit(action); });
            }
        }
    };
    DialogContentBase.propDecorators = {
        dialogTitleBar: [{ type: ViewChild, args: [DialogTitleBarComponent,] }],
        dialogActions: [{ type: ViewChild, args: [DialogActionsComponent,] }]
    };
    return DialogContentBase;
}());

/**
 * @hidden
 */
var DialogContainerService = /** @class */ (function () {
    function DialogContainerService() {
    }
    Object.defineProperty(DialogContainerService.prototype, "container", {
        get: function () {
            return DialogContainerService.container;
        },
        set: function (container) {
            DialogContainerService.container = container;
        },
        enumerable: true,
        configurable: true
    });
    DialogContainerService.container = null;
    DialogContainerService.decorators = [
        { type: Injectable },
    ];
    return DialogContainerService;
}());

// tslint:disable:max-line-length
var isNotComponent = function (component) { return isString(component) || component instanceof TemplateRef; };
var DialogInjector = /** @class */ (function () {
    function DialogInjector(getDialogRef, parentInjector) {
        this.getDialogRef = getDialogRef;
        this.parentInjector = parentInjector;
    }
    DialogInjector.prototype.get = function (token, notFoundValue) {
        if (token === DialogRef) {
            return this.getDialogRef();
        }
        return this.parentInjector.get(token, notFoundValue);
    };
    return DialogInjector;
}());
/**
 * A service for opening Dialog windows dynamically
 * ([see example]({% slug service_dialog %})).
 */
var DialogService = /** @class */ (function () {
    function DialogService(
    /**
     * @hidden
     */
    resolver, containerService) {
        this.resolver = resolver;
        this.containerService = containerService;
    }
    /**
     * Opens a Dialog window. Requires an element in the application that uses the
     * [`kendoDialogContainer`]({% slug api_dialog_dialogcontainerdirective %}) directive.
     * Created Dialogs will be mounted in the DOM directly after that element.
     *
     * @param {DialogAction} options - The options that define the Dialog.
     * @returns {DialogRef} - A reference to the Dialog object and the convenience properties.
     *
     * @example
     *
     * ```ts-no-run
     * _@Component({
     *   selector: 'my-app',
     *   template: `
     *     <button kendoButton (click)="open()">Harmless button</button>
     *     <div kendoDialogContainer></div>
     *   `
     * })
     * export class AppComponent {
     *     constructor( private dialogService: DialogService ) {}
     *
     *     public open() {
     *         var dialog = this.dialogService.open({
     *           title: "Please confirm",
     *           content: "Are you sure?",
     *           actions: [
     *             { text: "No" },
     *             { text: "Yes", primary: true }
     *           ]
     *         });
     *
     *         dialog.result.subscribe((result) => {
     *           if (result instanceof DialogCloseResult) {
     *             console.log("close");
     *           } else {
     *             console.log("action", result);
     *           }
     *         });
     *     }
     * }
     * ```
     *
     */
    DialogService.prototype.open = function (options) {
        var factory = this.resolver.resolveComponentFactory(DialogComponent);
        var container = options.appendTo || this.containerService.container;
        if (!container) {
            throw new Error("\nCannot attach dialog to the page.\nAdd an element that uses the kendoDialogContainer directive, or set the 'appendTo' property.\nSee https://www.telerik.com/kendo-angular-ui/components/dialogs/dialog/service/.\n          ");
        }
        // create DialogRef to (1) pass as result, (2) provide through injector
        var dialogRef = {
            close: function () {
                /* noop */
            },
            content: null,
            dialog: null,
            result: null
        };
        return this.initializeDialog(options.content, factory, container, dialogRef, options);
    };
    DialogService.prototype.initializeDialog = function (component, factory, container, dialogRef, options) {
        var content = this.contentFrom(component, container, dialogRef);
        var dialog = container.createComponent(factory, undefined, undefined, content.nodes);
        dialogRef.dialog = dialog;
        dialog.changeDetectorRef.markForCheck();
        // copy @Input options to dialog instance
        this.applyOptions(dialog.instance, options);
        // create close handler and result stream
        var apiClose = new Subject();
        var close = function (e) {
            if (e instanceof PreventableEvent) {
                e = new DialogCloseResult();
            }
            apiClose.next(e || new DialogCloseResult());
            if (content.componentRef) {
                content.componentRef.destroy();
            }
            dialog.destroy();
        };
        var result = merge(apiClose, 
        // triggered when the titlebar or actions are defined in DialogSettings
        merge(dialog.instance.close, dialog.instance.action).pipe(map(function (e) { return (e instanceof PreventableEvent ? new DialogCloseResult() : e); }), filter(function (e) {
            if (options.preventAction) {
                // add dialogRef only when using component
                var dialogRefParameter = isNotComponent(component) ? undefined : dialogRef;
                return !options.preventAction(e, dialogRefParameter);
            }
            return true;
        }))).pipe(take(1), 
        // Takes care for multiple subscriptions:
        // We subscribe internaly and the user may subscribe to get a close result - dialog.result.subscribe().
        // This causes multiple subscriptions to the same source and thus multiple emissions. share() solves that.
        share());
        result.subscribe(close);
        dialogRef.close = close;
        dialogRef.result = result;
        if (component && isDevMode()) {
            var hasContentTitle = content.nodes[0] && content.nodes[0].length > 0;
            var hasContentActions = content.nodes[2] && content.nodes[2].length > 0;
            var multipleTitles = options.title && hasContentTitle;
            var multipleActions = options.actions && hasContentActions;
            if (component.prototype instanceof DialogContentBase) {
                // content component extends DialogContentBase
                if (multipleTitles || multipleActions) {
                    console.warn("\n                    Multiple Title and/or Actions configurations detected.\n                    When using a component as content, provide the title and actions either in the component's markup\n                    or via the title and actions properties of the DialogSettings object, but not both.\n                    See https://www.telerik.com/kendo-angular-ui/components/dialogs/dialog/service/#toc-passing-title-content-and-actions-as-a-single-component'");
                }
            }
            else {
                if (hasContentTitle || hasContentActions) {
                    console.warn("\n                    When Title and/or Actions markup is provided in content component's template,\n                    the component needs to inherit the DialogContentBase class to ensure that close and result events are properly hooked.\n                    See https://www.telerik.com/kendo-angular-ui/components/dialogs/dialog/service/#toc-passing-title-content-and-actions-as-a-single-component'");
                }
            }
        }
        return dialogRef;
    };
    DialogService.prototype.applyOptions = function (instance, options) {
        instance.title = options.title;
        instance.actions = options.actions;
        instance.actionsLayout = options.actionsLayout || 'stretched';
        instance.width = options.width;
        instance.minWidth = options.minWidth;
        instance.maxWidth = options.maxWidth;
        instance.height = options.height;
        instance.minHeight = options.minHeight;
        instance.maxHeight = options.maxHeight;
        instance.autoFocusedElement = options.autoFocusedElement;
        instance.closeTitle = options.closeTitle;
        if (options.content instanceof TemplateRef) {
            instance.contentTemplate = options.content;
        }
    };
    DialogService.prototype.contentFrom = function (content, container, dialogRef) {
        var renderer = container.injector.get(Renderer2);
        var nodes = [];
        var titleNodes = [];
        var actionNodes = [];
        var componentRef = null;
        if (typeof content === 'string') {
            nodes = [renderer.createText(content)];
        }
        else if (content && !(content instanceof TemplateRef)) {
            // Component
            var injector = new DialogInjector(function () { return dialogRef; }, container.injector);
            var factory = this.resolver.resolveComponentFactory(content);
            componentRef = container.createComponent(factory, undefined, injector);
            titleNodes = Array.from(componentRef.location.nativeElement.querySelectorAll('kendo-dialog-titlebar'));
            nodes = [componentRef.location.nativeElement];
            actionNodes = Array.from(componentRef.location.nativeElement.querySelectorAll('kendo-dialog-actions'));
            dialogRef.content = componentRef;
        }
        return {
            componentRef: componentRef,
            nodes: [
                titleNodes,
                nodes,
                actionNodes // <ng-content select="kendo-dialog-actions">
            ]
        };
    };
    DialogService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DialogService.ctorParameters = function () { return [
        { type: ComponentFactoryResolver },
        { type: DialogContainerService, decorators: [{ type: Inject, args: [DialogContainerService,] }] }
    ]; };
    return DialogService;
}());

/**
 * @hidden
 */
var newZIndex = 10002;
/**
 * @hidden
 */
var DEFAULT_OPTIONS = {
    draggable: true,
    height: null,
    left: null,
    minHeight: 100,
    minWidth: 120,
    position: 'absolute',
    resizable: true,
    state: 'default',
    top: null,
    width: null
};
/**
 * @hidden
 */
var createMoveStream = function (el, ev) { return function (mouseDown) {
    return el.kendoDrag
        .pipe(takeUntil(el.kendoRelease.pipe(tap(function () { ev.emit(); }))), map(function (_a) {
        var pageX = _a.pageX, pageY = _a.pageY;
        return ({
            originalX: mouseDown.pageX,
            originalY: mouseDown.pageY,
            pageX: pageX,
            pageY: pageY
        });
    }));
}; };
/**
 * @hidden
 */
var DragResizeService = /** @class */ (function () {
    function DragResizeService(ngZone) {
        this.ngZone = ngZone;
        this.close = new EventEmitter();
        this.focus = new EventEmitter();
        this.change = new EventEmitter();
        this.stateChange = new EventEmitter();
        this.dragStart = new EventEmitter();
        this.dragEnd = new EventEmitter();
        this.resizeStart = new EventEmitter();
        this.resizeEnd = new EventEmitter();
        this.options = Object.assign({}, DEFAULT_OPTIONS);
        this.lastAction = null;
        this.subscriptions = new Subscription();
        this.dragSubscription = new Subscription();
    }
    DragResizeService.prototype.ngOnDestroy = function () {
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
        }
        if (this.dragSubscription) {
            this.dragSubscription.unsubscribe();
        }
    };
    DragResizeService.prototype.init = function (el) {
        var state$$1 = this.options.state;
        var options = this.options;
        this.window = el;
        if (state$$1 !== 'default') {
            this.restoreOptions = Object.assign({}, options);
        }
        if (state$$1 === 'minimized') {
            options.height = 0;
            options.minHeight = 0;
        }
        if (state$$1 === 'maximized') {
            options.position = 'fixed';
        }
    };
    DragResizeService.prototype.onDrag = function (el) {
        var _this = this;
        this.subscriptions.add(this.ngZone.runOutsideAngular(function () {
            var startPosition;
            var dragStarted;
            _this.dragSubscription = el.kendoPress
                .pipe(tap(function (ev) {
                if (!ev.isTouch) {
                    preventDefault(ev);
                }
                _this.focus.emit();
                startPosition = _this.currentPosition();
                dragStarted = false;
            }), switchMap(createMoveStream(el, _this.dragEnd)))
                .subscribe(function (_a) {
                var pageX = _a.pageX, pageY = _a.pageY, originalX = _a.originalX, originalY = _a.originalY;
                if (!dragStarted) {
                    _this.ensureWidth();
                    _this.dragStart.emit();
                    dragStarted = true;
                }
                _this.handleDrag({
                    originalX: originalX, originalY: originalY,
                    pageX: pageX, pageY: pageY, startPosition: startPosition
                });
            });
        }));
    };
    DragResizeService.prototype.handleDrag = function (_a) {
        var originalX = _a.originalX, originalY = _a.originalY, pageX = _a.pageX, pageY = _a.pageY, startPosition = _a.startPosition;
        this.options.left = startPosition.x + pageX - originalX;
        this.options.top = startPosition.y + pageY - originalY;
        if (this.options.state === 'minimized' && isPresent(this.restoreOptions)) {
            this.restoreOptions.left = this.options.left;
            this.restoreOptions.top = this.options.top;
        }
        this.change.emit({
            left: startPosition.x + pageX - originalX,
            top: startPosition.y + pageY - originalY
        });
    };
    DragResizeService.prototype.onResize = function (handle, direction) {
        var _this = this;
        this.subscriptions.add(this.ngZone.runOutsideAngular(function () {
            var startOffsetAndPosition;
            var resizeStarted = false;
            handle.kendoPress.pipe(tap(function (ev) {
                preventDefault(ev);
                _this.focus.emit();
                startOffsetAndPosition = _this.currentOffsetAndPosition();
                resizeStarted = false;
            }), switchMap(createMoveStream(handle, _this.resizeEnd)))
                .subscribe(function (_a) {
                var pageX = _a.pageX, pageY = _a.pageY, originalX = _a.originalX, originalY = _a.originalY;
                if (!resizeStarted) {
                    _this.resizeStart.emit(direction);
                    resizeStarted = true;
                }
                var deltaX = pageX - originalX;
                var deltaY = pageY - originalY;
                _this.handleResize(startOffsetAndPosition, direction, deltaX, deltaY);
            });
        }));
    };
    DragResizeService.prototype.handleResize = function (initial, dir, deltaX, deltaY) {
        var _this = this;
        var old = this.options;
        var ev = {};
        if (dir.indexOf('e') >= 0) {
            var newWidth = initial.width + deltaX;
            if (newWidth !== old.width && newWidth >= old.minWidth) {
                ev.width = newWidth;
            }
        }
        if (dir.indexOf('n') >= 0) {
            var newHeight = initial.height - deltaY;
            var newTop = initial.y + deltaY;
            if (newHeight !== old.height && newHeight >= old.minHeight && newTop !== old.top) {
                ev.height = newHeight;
                ev.top = newTop;
            }
        }
        if (dir.indexOf('s') >= 0) {
            var newHeight = initial.height + deltaY;
            if (newHeight !== old.height && newHeight >= old.minHeight) {
                ev.height = newHeight;
            }
        }
        if (dir.indexOf('w') >= 0) {
            var newLeft = initial.x + deltaX;
            var newWidth = initial.width - deltaX;
            if (newWidth !== old.width && newWidth >= old.minWidth && newLeft !== old.left) {
                ev.width = newWidth;
                ev.left = newLeft;
            }
        }
        if (isPresent(ev.width) || isPresent(ev.height)) {
            OFFSET_STYLES.forEach(function (style$$1) {
                if (isPresent(ev[style$$1])) {
                    _this.options[style$$1] = ev[style$$1];
                }
            });
            this.change.emit(ev);
        }
    };
    DragResizeService.prototype.restoreAction = function () {
        this.lastAction = 'restore';
        this.defaultState();
    };
    DragResizeService.prototype.defaultState = function () {
        if (isPresent(this.restoreOptions)) {
            this.options = Object.assign({}, this.restoreOptions);
        }
        this.options.state = 'default';
        this.stateChange.emit('default');
    };
    DragResizeService.prototype.storeOptions = function () {
        this.restoreOptions = Object.assign({}, this.options);
    };
    DragResizeService.prototype.maximizeAction = function () {
        this.lastAction = 'maximize';
        this.maximizeState();
    };
    DragResizeService.prototype.maximizeState = function () {
        this.storeOptions();
        var wnd = this.windowViewPort;
        this.options = Object.assign({}, this.options, {
            height: wnd.height,
            left: 0,
            position: 'fixed',
            state: 'maximized',
            top: 0,
            width: wnd.width
        });
        this.stateChange.emit('maximized');
    };
    DragResizeService.prototype.minimizeAction = function () {
        this.lastAction = 'minimize';
        this.minimizeState();
    };
    DragResizeService.prototype.minimizeState = function () {
        this.storeOptions();
        this.options = Object.assign({}, this.options, {
            height: null,
            minHeight: 0,
            state: 'minimized'
        });
        this.stateChange.emit('minimized');
    };
    /**
     * Handles manual changes of the 'state' property.
     * Required to distinguish them from action clicks.
     */
    DragResizeService.prototype.applyManualState = function () {
        var state$$1 = this.options.state;
        switch (state$$1) {
            case 'default':
                this.clearHeight();
                this.defaultState();
                break;
            case 'maximized':
                this.clearHeight();
                this.maximizeState();
                break;
            case 'minimized':
                this.minimizeState();
                break;
            default:
                break;
        }
    };
    DragResizeService.prototype.closeAction = function () {
        this.close.emit();
    };
    DragResizeService.prototype.ensureWidth = function () {
        var windowOffset = offset(this.window.nativeElement);
        if (!isPresent(this.options.width)) {
            this.options.width = windowOffset.width;
            this.change.emit({ width: windowOffset.width });
        }
    };
    DragResizeService.prototype.clearHeight = function () {
        if (this.options.height === 0) {
            delete this.options.height;
        }
        if (this.options.minHeight === 0) {
            delete this.options.minHeight;
        }
    };
    DragResizeService.prototype.center = function () {
        if (this.options.state === 'maximized') {
            return;
        }
        var scroll = scrollPosition(this.window.nativeElement);
        var wnd = this.windowViewPort;
        var wrapper = offset(this.window.nativeElement);
        var ev = {};
        if (!isPresent(this.options.left)) {
            this.options.left = scroll.x + Math.max(0, (wnd.width - wrapper.width) / 2);
            ev.left = this.options.left;
        }
        if (!isPresent(this.options.top)) {
            this.options.top = scroll.y + Math.max(0, (wnd.height - wrapper.height) / 2);
            ev.top = this.options.top;
        }
        this.change.emit(ev);
    };
    DragResizeService.prototype.currentOffsetAndPosition = function () {
        var o = this.options;
        var off = offset(this.window.nativeElement);
        return Object.assign({}, this.currentPosition(), {
            height: o.height ? o.height : off.height,
            width: o.width ? o.width : off.width
        });
    };
    DragResizeService.prototype.currentPosition = function () {
        var o = this.options;
        if (!o.top || !o.left) {
            this.setPosition();
        }
        return {
            x: this.options.left,
            y: this.options.top
        };
    };
    DragResizeService.prototype.setPosition = function () {
        var wrapper = positionWithScroll(this.window.nativeElement, getDocumentElement(this.window.nativeElement));
        this.options.left = wrapper.left;
        this.options.top = wrapper.top;
    };
    DragResizeService.prototype.setRestoreOption = function (style$$1, value) {
        if (isPresent(this.restoreOptions)) {
            this.restoreOptions[style$$1] = value;
        }
    };
    Object.defineProperty(DragResizeService.prototype, "nextPossibleZIndex", {
        get: function () {
            return newZIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DragResizeService.prototype, "nextZIndex", {
        get: function () {
            return newZIndex++;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DragResizeService.prototype, "windowViewPort", {
        get: function () {
            return getWindowViewPort(this.window.nativeElement);
        },
        enumerable: true,
        configurable: true
    });
    DragResizeService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DragResizeService.ctorParameters = function () { return [
        { type: NgZone }
    ]; };
    return DragResizeService;
}());

/**
 * @hidden
 */
var ResizeHandleDirective = /** @class */ (function () {
    function ResizeHandleDirective(draggable, el, renderer, service) {
        this.draggable = draggable;
        this.el = el;
        this.renderer = renderer;
        this.service = service;
        this.subscriptions = new Subscription();
    }
    Object.defineProperty(ResizeHandleDirective.prototype, "hostClass", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    ResizeHandleDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.setDisplay();
        this.renderer.addClass(this.el.nativeElement, 'k-resize-' + this.direction);
        this.subscriptions.add(of(this.draggable).subscribe(function (handle) {
            _this.service.onResize(handle, _this.direction);
        }));
        this.subscriptions.add(this.service.resizeStart.subscribe(function (dir) {
            if (dir !== _this.direction) {
                _this.setDisplay('none');
            }
        }));
        this.subscriptions.add(this.service.dragStart.subscribe(function () {
            _this.setDisplay('none');
        }));
        this.subscriptions.add(merge(this.service.resizeEnd, this.service.dragEnd).subscribe(function () {
            _this.setDisplay('block');
        }));
        this.subscriptions.add(this.service.stateChange.subscribe(function (state$$1) {
            _this.setDisplay(state$$1 === 'default' ? 'block' : 'none');
        }));
    };
    ResizeHandleDirective.prototype.ngOnDestroy = function () {
        this.subscriptions.unsubscribe();
    };
    ResizeHandleDirective.prototype.setDisplay = function (value) {
        if (value === void 0) { value = 'block'; }
        this.renderer.setStyle(this.el.nativeElement, 'display', this.service.options.state === 'default' ? value : 'none');
    };
    ResizeHandleDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoWindowResizeHandle]'
                },] },
    ];
    /** @nocollapse */
    ResizeHandleDirective.ctorParameters = function () { return [
        { type: DraggableDirective, decorators: [{ type: Host }] },
        { type: ElementRef },
        { type: Renderer2 },
        { type: DragResizeService }
    ]; };
    ResizeHandleDirective.propDecorators = {
        direction: [{ type: Input }],
        hostClass: [{ type: HostBinding, args: ['class.k-resize-handle',] }]
    };
    return ResizeHandleDirective;
}());

var WindowTitleBarComponent = /** @class */ (function () {
    function WindowTitleBarComponent(el, service, ngZone) {
        this.el = el;
        this.ngZone = ngZone;
        this.service = service;
    }
    WindowTitleBarComponent.prototype.ngOnInit = function () {
        this.dragDirective = new DraggableDirective(this.el, this.ngZone);
        this.dragDirective.ngOnInit();
        if (this.isDraggable) {
            this.subscribeDrag();
        }
        this.subscribeStateChange();
    };
    WindowTitleBarComponent.prototype.ngOnDestroy = function () {
        this.dragDirective.ngOnDestroy();
        this.unsubscribeDrag();
        this.unsubscribeState();
    };
    /**
     * @hidden
     */
    WindowTitleBarComponent.prototype.subscribeDrag = function () {
        var _this = this;
        this.unsubscribeDrag();
        this.dragSubscription = of(this.dragDirective).subscribe(function (titleBar) {
            _this.service.onDrag(titleBar);
        });
    };
    /**
     * @hidden
     */
    WindowTitleBarComponent.prototype.subscribeStateChange = function () {
        var _this = this;
        this.stateSubscription = this.service.stateChange.subscribe(function (state$$1) {
            if (_this.service.options.draggable) {
                if (state$$1 === 'maximized') {
                    _this.unsubscribeDrag();
                }
                else {
                    _this.subscribeDrag();
                }
            }
        });
    };
    /**
     * @hidden
     */
    WindowTitleBarComponent.prototype.unsubscribeDrag = function () {
        if (this.dragSubscription) {
            this.service.dragSubscription.unsubscribe();
            this.dragSubscription.unsubscribe();
            this.dragSubscription = null;
        }
    };
    /**
     * @hidden
     */
    WindowTitleBarComponent.prototype.unsubscribeState = function () {
        if (this.stateSubscription) {
            this.stateSubscription.unsubscribe();
            this.stateSubscription = null;
        }
    };
    Object.defineProperty(WindowTitleBarComponent.prototype, "className", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowTitleBarComponent.prototype, "touchAction", {
        get: function () {
            if (this.isDraggable) {
                return 'none';
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    WindowTitleBarComponent.prototype.handle = function (ev) {
        var target = ev.target;
        var state$$1 = this.service.options.state;
        if (!hasClasses(target, 'k-icon') && !isFocusable(target, false) && this.service.options.resizable) {
            if (state$$1 === 'default') {
                this.service.maximizeAction();
            }
            else if (state$$1 === 'maximized') {
                this.service.restoreAction();
            }
        }
    };
    Object.defineProperty(WindowTitleBarComponent.prototype, "isDraggable", {
        get: function () {
            var options = this.service.options;
            return options.draggable && options.state !== 'maximized';
        },
        enumerable: true,
        configurable: true
    });
    WindowTitleBarComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-window-titlebar',
                    template: "\n    <ng-content *ngIf=\"!template\"></ng-content>\n    <ng-template\n      [ngTemplateOutlet]=\"template\"\n      [ngTemplateOutletContext]=\"{'$implicit': service}\" *ngIf=\"template\">\n    </ng-template>\n  "
                },] },
    ];
    /** @nocollapse */
    WindowTitleBarComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: DragResizeService },
        { type: NgZone }
    ]; };
    WindowTitleBarComponent.propDecorators = {
        template: [{ type: Input }],
        className: [{ type: HostBinding, args: ['class.k-window-titlebar',] }, { type: HostBinding, args: ['class.k-dialog-titlebar',] }],
        touchAction: [{ type: HostBinding, args: ['style.touch-action',] }],
        handle: [{ type: HostListener, args: ['dblclick', ['$event'],] }]
    };
    return WindowTitleBarComponent;
}());

/**
 * @hidden
 */
var NavigationService = /** @class */ (function () {
    function NavigationService(window) {
        this.window = window;
    }
    NavigationService.prototype.process = function (ev) {
        var key = ev.keyCode;
        switch (key) {
            case Keys.up:
            case Keys.down:
            case Keys.left:
            case Keys.right: {
                ev.preventDefault();
                this.handleArrow(key, ev);
                break;
            }
            case Keys.esc:
                this.handleEscape();
                break;
            default:
                break;
        }
    };
    NavigationService.prototype.handleArrow = function (key, ev) {
        var options = this.window.options;
        if (ev.altKey) {
            this.handleStateChange(key, options.state);
            return;
        }
        if ((ev.ctrlKey || ev.metaKey) && options.state === 'default') {
            this.handleResize(key);
        }
        else {
            this.handleDrag(key);
        }
    };
    NavigationService.prototype.handleEscape = function () {
        this.window.closeAction();
    };
    NavigationService.prototype.handleDrag = function (key) {
        var options = this.window.options;
        if (!options.draggable) {
            return;
        }
        var offset$$1 = this.window.currentOffsetAndPosition();
        var restoreOptions = this.window.restoreOptions;
        var ev = {};
        var delta = 10;
        if (key === Keys.left || key === Keys.up) {
            delta *= -1;
        }
        switch (key) {
            case Keys.left:
            case Keys.right: {
                ev.left = offset$$1.x + delta;
                options.left = ev.left;
                break;
            }
            case Keys.up:
            case Keys.down: {
                ev.top = offset$$1.y + delta;
                options.top = ev.top;
                break;
            }
            default:
                break;
        }
        if (options.state === 'minimized' && isPresent(restoreOptions)) {
            restoreOptions.left = options.left;
            restoreOptions.top = options.top;
        }
        this.window.change.emit(ev);
    };
    NavigationService.prototype.handleResize = function (key) {
        var _this = this;
        var options = this.window.options;
        if (!options.resizable) {
            return;
        }
        var offset$$1 = this.window.currentOffsetAndPosition();
        var newWidth;
        var newHeight;
        var ev = {};
        var delta = 10;
        if (key === Keys.left || key === Keys.up) {
            delta *= -1;
        }
        switch (key) {
            case Keys.left:
            case Keys.right: {
                newWidth = offset$$1.width + delta;
                if (newWidth !== options.width && newWidth >= options.minWidth) {
                    ev.width = newWidth;
                }
                break;
            }
            case Keys.up:
            case Keys.down: {
                newHeight = offset$$1.height + delta;
                if (newHeight !== options.height && newHeight >= options.minHeight) {
                    ev.height = newHeight;
                }
                break;
            }
            default:
                break;
        }
        if (isPresent(ev.width) || isPresent(ev.height)) {
            OFFSET_STYLES.forEach(function (style$$1) {
                if (isPresent(ev[style$$1])) {
                    _this.window.options[style$$1] = ev[style$$1];
                }
            });
            this.window.change.emit(ev);
        }
    };
    NavigationService.prototype.handleStateChange = function (key, state$$1) {
        if ((state$$1 === 'minimized' && key === Keys.up) ||
            (state$$1 === 'maximized' && key === Keys.down)) {
            this.window.restoreAction();
            return;
        }
        if (state$$1 === 'default') {
            if (key === Keys.up) {
                this.window.maximizeAction();
            }
            else if (key === Keys.down) {
                this.window.minimizeAction();
            }
        }
    };
    NavigationService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    NavigationService.ctorParameters = function () { return [
        { type: DragResizeService }
    ]; };
    return NavigationService;
}());

/**
 * Represents the [Kendo UI Window component for Angular]({% slug overview_window_dialogs %}).
 */
var WindowComponent = /** @class */ (function () {
    function WindowComponent(el, renderer, service, navigation, ngZone, localization) {
        var _this = this;
        this.el = el;
        this.renderer = renderer;
        this.service = service;
        this.navigation = navigation;
        this.ngZone = ngZone;
        this.localization = localization;
        /**
         * Specifies if the content of the component is persisted in the DOM when minimized.
         * @default false
         */
        this.keepContent = false;
        /**
         * Fires when the user starts to move the Window.
         */
        this.dragStart = new EventEmitter();
        /**
         * Fires when the Window was moved by the user.
         */
        this.dragEnd = new EventEmitter();
        /**
         * Fires when the user starts to resize the Window.
         */
        this.resizeStart = new EventEmitter();
        /**
         * Fires when the Window was resized by the user.
         */
        this.resizeEnd = new EventEmitter();
        /**
         * Fires when the user closes the Window.
         */
        this.close = new EventEmitter();
        /**
         * Fires when the `width` property of the component was updated. The event is triggered only after the resizing
         * has ended. The event data contains the new width. Allows a two-way binding of the `width` property.
         */
        this.widthChange = new EventEmitter();
        /**
         * Fires when the `height` property of the component was updated. The event is triggered only after the resizing
         * has ended. The event data contains the new height. Allows a two-way binding of the `height` property.
         */
        this.heightChange = new EventEmitter();
        /**
         * Fires when the `top` property of the component was updated. The event is triggered only after the dragging
         * and resizing have ended. The event data contains the new top offset. Allows a two-way binding of the `top` property.
         */
        this.topChange = new EventEmitter();
        /**
         * Fires when the `left` property of the component was updated. The event is triggered only after the dragging
         * and resizing have ended. The event data contains the new left offset. Allows a two-way binding of the `left` property.
         */
        this.leftChange = new EventEmitter();
        /**
         * Fires when the `state` property of the component was updated. The event data contains the new state. Allows a
         * two-way binding of the `state` property.
         */
        this.stateChange = new EventEmitter();
        this.tabIndex = 0;
        this.draged = false;
        this.resized = false;
        this.windowSubscription = new Subscription();
        this.direction = this.localization.rtl ? 'rtl' : 'ltr';
        this.localizationChangeSubscription = this.localization.changes
            .subscribe(function (_a) {
            var rtl = _a.rtl;
            return _this.direction = rtl ? 'rtl' : 'ltr';
        });
        this.resizeDirections = RESIZE_DIRECTIONS;
        this.subscribeEvents();
    }
    Object.defineProperty(WindowComponent.prototype, "draggable", {
        get: function () {
            return this.options.draggable;
        },
        /**
         * Specifies whether the user will be able to drag the component.
         * @default true
         */
        set: function (value) {
            this.options.draggable = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowComponent.prototype, "resizable", {
        get: function () {
            return this.options.resizable;
        },
        /**
         * Specifies whether the user will be able to resize the component.
         * @default true
         */
        set: function (value) {
            this.options.resizable = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowComponent.prototype, "state", {
        get: function () {
            return this.options.state;
        },
        /**
         * Specifies the initial state of the component.
         * If not specified, the value is set to `default`.
         *
         * The possible values are:
         * * `minimized`
         * * `maximized`
         * * `default`
         */
        set: function (value) {
            this.options.state = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowComponent.prototype, "minWidth", {
        get: function () {
            return this.options.minWidth;
        },
        /**
         * Specifies the minimum width of the component.
         * The `minWidth` property has to be set in pixels.
         * @default 120
         */
        set: function (value) {
            this.setOption('minWidth', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowComponent.prototype, "minHeight", {
        get: function () {
            return this.options.minHeight;
        },
        /**
         * Specifies the minimum height of the Window.
         * The `minHeight` property has to be set in pixels.
         * @default 100
         */
        set: function (value) {
            this.setOption('minHeight', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowComponent.prototype, "width", {
        get: function () {
            return this.options.width;
        },
        /**
         * Specifies the width of the Window.
         * The `width` property has to be set in pixels.
         */
        set: function (value) {
            this.setOption('width', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowComponent.prototype, "height", {
        get: function () {
            return this.options.height;
        },
        /**
         * Specifies the height of the Window.
         * The `height` property has to be set in pixels.
         */
        set: function (value) {
            this.setOption('height', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowComponent.prototype, "top", {
        get: function () {
            return this.options.top;
        },
        /**
         * Specifies the initial top offset of the Window.
         * The `top` property has to be set in pixels.
         */
        set: function (value) {
            this.setOption('top', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowComponent.prototype, "left", {
        get: function () {
            return this.options.left;
        },
        /**
         * Specifies the initial left offset of the Window.
         * Numeric values are treated as pixels.
         */
        set: function (value) {
            this.setOption('left', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowComponent.prototype, "closeButtonTitle", {
        get: function () {
            if (this.messages && this.messages.closeTitle) {
                return this.messages.closeTitle;
            }
            return this.localization.get('closeTitle');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowComponent.prototype, "restoreButtonTitle", {
        get: function () {
            if (this.messages && this.messages.restoreTitle) {
                return this.messages.restoreTitle;
            }
            return this.localization.get('restoreTitle');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowComponent.prototype, "maximizeButtonTitle", {
        get: function () {
            if (this.messages && this.messages.maximizeTitle) {
                return this.messages.maximizeTitle;
            }
            return this.localization.get('maximizeTitle');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowComponent.prototype, "minimizeButtonTitle", {
        get: function () {
            if (this.messages && this.messages.minimizeTitle) {
                return this.messages.minimizeTitle;
            }
            return this.localization.get('minimizeTitle');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowComponent.prototype, "hostClasses", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowComponent.prototype, "dir", {
        get: function () {
            return this.direction;
        },
        enumerable: true,
        configurable: true
    });
    WindowComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.setNextZIndex();
        this.handleInitialFocus();
        this.ngZone.runOutsideAngular(function () {
            return Promise.resolve(null).then(function () { return _this.setInitialOffset(); });
        });
    };
    WindowComponent.prototype.ngOnInit = function () {
        this.renderer.removeAttribute(this.el.nativeElement, 'title');
        this.service.init(this.el);
    };
    WindowComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        OFFSET_STYLES.forEach(function (style$$1) {
            if (isChanged(style$$1, changes)) {
                _this.setStyle(style$$1, _this.options[style$$1]);
            }
        });
        if (isChanged('draggable', changes)) {
            var titleBar = isPresent(this.titleBarContent) ? this.titleBarContent : this.titleBarView;
            if (isTruthy(changes.draggable.currentValue)) {
                titleBar.subscribeDrag();
            }
            else {
                titleBar.unsubscribeDrag();
            }
        }
        if (isChanged('state', changes)) {
            if (isPresent(this.service.lastAction)) {
                this.service.lastAction = null;
            }
            else {
                this.service.applyManualState();
                this.updateAllOffset();
            }
        }
    };
    WindowComponent.prototype.ngOnDestroy = function () {
        if (this.windowSubscription) {
            this.windowSubscription.unsubscribe();
        }
        this.localizationChangeSubscription.unsubscribe();
    };
    /**
     * Focuses the wrapper of the Window component.
     */
    WindowComponent.prototype.focus = function () {
        var wrapper = this.el.nativeElement;
        if (isPresent(wrapper)) {
            wrapper.focus();
        }
    };
    /**
     * Brings the current Window component on top of other Window components on the page.
     */
    WindowComponent.prototype.bringToFront = function () {
        this.setNextZIndex();
    };
    /**
     * Manually updates the `width` or `height` option of the Window.
     * The required style will be applied to the Window wrapper element and the
     * corresponding property of the component instance will be updated.
     * This method is intended to be used for sizing dynamically created components using the
     * [`WindowService`]({% slug api_dialog_windowservice %})
     * @param {WindowDimensionSetting} dimension - The option that will be updated
     * @param {number} value - The value set in pixels
     */
    WindowComponent.prototype.setDimension = function (dimension, value) {
        this.setOption(dimension, value);
        this.setStyle(dimension, value);
    };
    /**
     * Manually updates the `top` or `left` offset of the Window.
     * The required style will be applied to the Window wrapper element and the
     * corresponding property of the component instance will be updated.
     * This method is intended to be used for positioning dynamically created components using the
     * [`WindowService`]({% slug api_dialog_windowservice %})
     * @param {WindowOffsetSetting} offset - The option that will be updated
     * @param {number} value - The value set in pixels
     */
    WindowComponent.prototype.setOffset = function (offset$$1, value) {
        this.setOption(offset$$1, value);
        this.setStyle(offset$$1, value);
    };
    Object.defineProperty(WindowComponent.prototype, "showDefaultTitleBar", {
        get: function () {
            return !isPresent(this.titleBarContent);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowComponent.prototype, "styleMinWidth", {
        get: function () {
            return this.minWidth + 'px';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowComponent.prototype, "styleMinHeight", {
        get: function () {
            return this.minHeight + 'px';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowComponent.prototype, "stylePosition", {
        get: function () {
            return this.options.position;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowComponent.prototype, "wrapperMaximizedClass", {
        get: function () {
            return this.state === 'maximized';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowComponent.prototype, "wrapperMinimizedClass", {
        get: function () {
            return this.state === 'minimized';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    WindowComponent.prototype.onComponentKeydown = function (event) {
        if (hasClasses(event.target, WINDOW_CLASSES)) {
            this.navigation.process(event);
        }
    };
    /**
     * @hidden
     */
    WindowComponent.prototype.onComponentFocus = function () {
        this.renderer.addClass(this.el.nativeElement, 'k-state-focused');
        this.setNextZIndex();
    };
    /**
     * @hidden
     */
    WindowComponent.prototype.onComponentBlur = function () {
        this.renderer.removeClass(this.el.nativeElement, 'k-state-focused');
    };
    WindowComponent.prototype.subscribeEvents = function () {
        var _this = this;
        if (!isDocumentAvailable()) {
            return;
        }
        this.windowSubscription.add(this.service.focus.subscribe(function () {
            _this.el.nativeElement.focus();
        }));
        this.windowSubscription.add(this.service.dragStart.subscribe(function () {
            _this.draged = true;
            _this.ngZone.run(function () {
                _this.dragStart.emit();
            });
        }));
        this.windowSubscription.add(this.service.dragEnd.subscribe(function () {
            if (_this.draged) {
                _this.draged = false;
                _this.ngZone.run(function () {
                    _this.dragEnd.emit();
                });
            }
        }));
        this.windowSubscription.add(this.service.close.subscribe(function () {
            _this.close.emit();
        }));
        this.windowSubscription.add(this.service.resizeStart.subscribe(function () {
            _this.resized = true;
            _this.ngZone.run(function () {
                _this.resizeStart.emit();
            });
        }));
        this.windowSubscription.add(this.service.resizeEnd.subscribe(function () {
            if (_this.resized) {
                _this.resized = false;
                _this.ngZone.run(function () {
                    _this.resizeEnd.emit();
                });
            }
        }));
        this.windowSubscription.add(this.service.change.subscribe(function (ev) {
            OFFSET_STYLES.forEach(function (style$$1) {
                if (isPresent(ev[style$$1])) {
                    _this.setStyle(style$$1, ev[style$$1]);
                    if (_this.state !== 'maximized') {
                        var emitter_1 = _this[style$$1 + 'Change'];
                        if (emitter_1.observers.length) {
                            _this.ngZone.run(function () {
                                emitter_1.emit(ev[style$$1]);
                            });
                        }
                    }
                }
            });
        }));
        this.windowSubscription.add(this.service.stateChange.subscribe(function (state$$1) {
            if (isPresent(_this.service.lastAction)) {
                _this.updateAllOffset();
                _this.stateChange.emit(state$$1);
            }
        }));
    };
    WindowComponent.prototype.setNextZIndex = function () {
        var currentZIndex = this.el.nativeElement.style['z-index'];
        var nextPossibleZIndex = this.service.nextPossibleZIndex;
        if (!currentZIndex || (nextPossibleZIndex - currentZIndex > 1)) {
            this.renderer.setStyle(this.el.nativeElement, "z-index", this.service.nextZIndex);
        }
    };
    WindowComponent.prototype.setInitialOffset = function () {
        if (this.state !== 'maximized') {
            this.updateAllOffset();
            if (!isPresent(this.left) || !isPresent(this.top)) {
                this.service.center();
            }
        }
        else {
            var viewPort = this.service.windowViewPort;
            this.setStyle('width', viewPort.width);
            this.setStyle('height', viewPort.height);
            this.setStyle('top', 0);
            this.setStyle('left', 0);
        }
    };
    WindowComponent.prototype.updateAllOffset = function () {
        var _this = this;
        OFFSET_STYLES.forEach(function (style$$1) {
            if (isPresent(_this[style$$1])) {
                _this.setStyle(style$$1, _this[style$$1]);
            }
            else {
                _this.removeStyle(style$$1);
            }
        });
    };
    WindowComponent.prototype.setStyle = function (style$$1, value) {
        this.renderer.setStyle(this.el.nativeElement, style$$1, value + 'px');
    };
    WindowComponent.prototype.removeStyle = function (style$$1) {
        this.renderer.removeStyle(this.el.nativeElement, style$$1);
    };
    Object.defineProperty(WindowComponent.prototype, "options", {
        get: function () {
            return this.service.options;
        },
        enumerable: true,
        configurable: true
    });
    WindowComponent.prototype.setOption = function (style$$1, value) {
        if (typeof value !== 'number' && typeof value !== 'string') {
            return;
        }
        var parsedValue = (typeof value === 'number') ? value : parseInt(value, 10);
        this.options[style$$1] = parsedValue;
        this.service.setRestoreOption(style$$1, parsedValue);
    };
    WindowComponent.prototype.handleInitialFocus = function () {
        var wrapper = this.el.nativeElement;
        if (this.autoFocusedElement) {
            var initiallyFocusedElement = wrapper.querySelector(this.autoFocusedElement);
            if (initiallyFocusedElement) {
                initiallyFocusedElement.focus();
            }
        }
        else {
            this.focus();
        }
    };
    WindowComponent.decorators = [
        { type: Component, args: [{
                    exportAs: 'kendoWindow',
                    providers: [
                        DragResizeService,
                        NavigationService,
                        LocalizationService,
                        {
                            provide: L10N_PREFIX,
                            useValue: 'kendo.window'
                        }
                    ],
                    selector: 'kendo-window',
                    template: "\n        <ng-container kendoWindowLocalizedMessages\n            i18n-closeTitle=\"kendo.window.closeTitle|The title of the close button\"\n            closeTitle=\"Close\"\n\n            i18n-restoreTitle=\"kendo.window.restoreTitle|The title of the restore button\"\n            restoreTitle=\"Restore\"\n\n            i18n-maximizeTitle=\"kendo.window.maximizeTitle|The title of the maximize button\"\n            maximizeTitle=\"Maximize\"\n\n            i18n-minimizeTitle=\"kendo.window.minimizeTitle|The title of the minimize button\"\n            minimizeTitle=\"Minimize\"\n        >\n        <ng-container>\n\n        <kendo-window-titlebar *ngIf=\"showDefaultTitleBar\" [template]=\"titleBarTemplate\">\n            <div class=\"k-window-title\">{{ title }}</div>\n            <div class=\"k-window-actions\">\n                <button kendoWindowMinimizeAction  [attr.title]=\"minimizeButtonTitle\" [attr.aria-label]=\"minimizeButtonTitle\"></button>\n                <button kendoWindowMaximizeAction [attr.title]=\"maximizeButtonTitle\" [attr.aria-label]=\"maximizeButtonTitle\"></button>\n                <button kendoWindowRestoreAction [attr.title]=\"restoreButtonTitle\" [attr.aria-label]=\"restoreButtonTitle\"></button>\n                <button kendoWindowCloseAction [attr.title]=\"closeButtonTitle\" [attr.aria-label]=\"closeButtonTitle\"></button>\n            </div>\n        </kendo-window-titlebar>\n        <ng-content select=\"kendo-window-titlebar\" *ngIf=\"!showDefaultTitleBar\"></ng-content>\n\n        <div *ngIf=\"state !== 'minimized' || keepContent\"\n            [hidden]=\"state === 'minimized' && keepContent\"\n            class=\"k-content k-window-content\"\n        >\n            <ng-content *ngIf=\"!contentTemplate\"></ng-content>\n            <ng-template [ngTemplateOutlet]=\"contentTemplate\" *ngIf=\"contentTemplate\"></ng-template>\n        </div>\n\n        <ng-template [ngIf]='resizable'>\n            <div *ngFor='let dir of resizeDirections'\n                [direction]=\"dir\"\n                kendoWindowResizeHandle\n                kendoDraggable>\n            </div>\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    WindowComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: DragResizeService },
        { type: NavigationService },
        { type: NgZone },
        { type: LocalizationService }
    ]; };
    WindowComponent.propDecorators = {
        autoFocusedElement: [{ type: Input }],
        title: [{ type: Input }],
        draggable: [{ type: Input }],
        resizable: [{ type: Input }],
        keepContent: [{ type: Input }],
        state: [{ type: Input }],
        minWidth: [{ type: Input }],
        minHeight: [{ type: Input }],
        width: [{ type: Input }],
        height: [{ type: Input }],
        top: [{ type: Input }],
        left: [{ type: Input }],
        dragStart: [{ type: Output }],
        dragEnd: [{ type: Output }],
        resizeStart: [{ type: Output }],
        resizeEnd: [{ type: Output }],
        close: [{ type: Output }],
        widthChange: [{ type: Output }],
        heightChange: [{ type: Output }],
        topChange: [{ type: Output }],
        leftChange: [{ type: Output }],
        stateChange: [{ type: Output }],
        tabIndex: [{ type: HostBinding, args: ['attr.tabIndex',] }],
        hostClasses: [{ type: HostBinding, args: ['class.k-widget',] }, { type: HostBinding, args: ['class.k-window',] }],
        dir: [{ type: HostBinding, args: ['attr.dir',] }],
        titleBarView: [{ type: ViewChild, args: [WindowTitleBarComponent,] }],
        titleBarContent: [{ type: ContentChild, args: [WindowTitleBarComponent,] }],
        resizeHandles: [{ type: ViewChildren, args: [ResizeHandleDirective,] }],
        styleMinWidth: [{ type: HostBinding, args: ['style.minWidth',] }],
        styleMinHeight: [{ type: HostBinding, args: ['style.minHeight',] }],
        stylePosition: [{ type: HostBinding, args: ['style.position',] }],
        wrapperMaximizedClass: [{ type: HostBinding, args: ['class.k-window-maximized',] }],
        wrapperMinimizedClass: [{ type: HostBinding, args: ['class.k-window-minimized',] }],
        onComponentKeydown: [{ type: HostListener, args: ['keydown', ['$event'],] }],
        onComponentFocus: [{ type: HostListener, args: ['focus',] }],
        onComponentBlur: [{ type: HostListener, args: ['blur',] }]
    };
    return WindowComponent;
}());

var WindowMaximizeActionDirective = /** @class */ (function (_super) {
    __extends(WindowMaximizeActionDirective, _super);
    function WindowMaximizeActionDirective(el, renderer, _service, localization, ngZone) {
        var _this = _super.call(this, el, renderer, null, localization, ngZone) || this;
        _this.buttonType = 'button';
        _this.window = _service;
        _this.look = 'bare';
        _this.icon = 'window-maximize';
        return _this;
    }
    /**
     * @hidden
     */
    WindowMaximizeActionDirective.prototype.onClick = function () {
        if (!this.isDisabled) {
            this.window.maximizeAction();
        }
    };
    Object.defineProperty(WindowMaximizeActionDirective.prototype, "visible", {
        get: function () {
            return this.window.options.state === 'default' ? 'inline-flex' : 'none';
        },
        enumerable: true,
        configurable: true
    });
    WindowMaximizeActionDirective.decorators = [
        { type: Directive, args: [{
                    exportAs: 'kendoWindowMaximizeAction',
                    providers: [
                        LocalizationService,
                        {
                            provide: L10N_PREFIX,
                            useValue: 'kendo.button'
                        }
                    ],
                    selector: 'button[kendoWindowMaximizeAction]' // tslint:disable-line
                },] },
    ];
    /** @nocollapse */
    WindowMaximizeActionDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: DragResizeService, decorators: [{ type: Optional }] },
        { type: LocalizationService },
        { type: NgZone }
    ]; };
    WindowMaximizeActionDirective.propDecorators = {
        window: [{ type: Input }],
        buttonType: [{ type: HostBinding, args: ['attr.type',] }],
        onClick: [{ type: HostListener, args: ['click',] }],
        visible: [{ type: HostBinding, args: ['style.display',] }]
    };
    return WindowMaximizeActionDirective;
}(Button));

var WindowMinimizeActionDirective = /** @class */ (function (_super) {
    __extends(WindowMinimizeActionDirective, _super);
    function WindowMinimizeActionDirective(el, renderer, _service, localization, ngZone) {
        var _this = _super.call(this, el, renderer, null, localization, ngZone) || this;
        _this.buttonType = 'button';
        _this.window = _service;
        _this.look = 'bare';
        _this.icon = 'window-minimize';
        return _this;
    }
    /**
     * @hidden
     */
    WindowMinimizeActionDirective.prototype.onClick = function () {
        if (!this.isDisabled) {
            this.window.minimizeAction();
        }
    };
    Object.defineProperty(WindowMinimizeActionDirective.prototype, "visible", {
        get: function () {
            return this.window.options.state === 'default' ? 'inline-flex' : 'none';
        },
        enumerable: true,
        configurable: true
    });
    WindowMinimizeActionDirective.decorators = [
        { type: Directive, args: [{
                    exportAs: 'kendoWindowMinimizeAction',
                    providers: [
                        LocalizationService,
                        {
                            provide: L10N_PREFIX,
                            useValue: 'kendo.button'
                        }
                    ],
                    selector: 'button[kendoWindowMinimizeAction]' // tslint:disable-line
                },] },
    ];
    /** @nocollapse */
    WindowMinimizeActionDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: DragResizeService, decorators: [{ type: Optional }] },
        { type: LocalizationService },
        { type: NgZone }
    ]; };
    WindowMinimizeActionDirective.propDecorators = {
        window: [{ type: Input }],
        buttonType: [{ type: HostBinding, args: ['attr.type',] }],
        onClick: [{ type: HostListener, args: ['click',] }],
        visible: [{ type: HostBinding, args: ['style.display',] }]
    };
    return WindowMinimizeActionDirective;
}(Button));

var WindowCloseActionDirective = /** @class */ (function (_super) {
    __extends(WindowCloseActionDirective, _super);
    function WindowCloseActionDirective(el, renderer, _service, localization, ngZone) {
        var _this = _super.call(this, el, renderer, null, localization, ngZone) || this;
        _this.buttonType = 'button';
        _this.window = _service;
        _this.look = 'bare';
        _this.icon = 'close';
        return _this;
    }
    /**
     * @hidden
     */
    WindowCloseActionDirective.prototype.onClick = function () {
        if (!this.isDisabled) {
            this.window.closeAction();
        }
    };
    WindowCloseActionDirective.decorators = [
        { type: Directive, args: [{
                    exportAs: 'kendoWindowCloseAction',
                    providers: [
                        LocalizationService,
                        {
                            provide: L10N_PREFIX,
                            useValue: 'kendo.button'
                        }
                    ],
                    selector: 'button[kendoWindowCloseAction]' // tslint:disable-line
                },] },
    ];
    /** @nocollapse */
    WindowCloseActionDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: DragResizeService, decorators: [{ type: Optional }] },
        { type: LocalizationService },
        { type: NgZone }
    ]; };
    WindowCloseActionDirective.propDecorators = {
        window: [{ type: Input }],
        buttonType: [{ type: HostBinding, args: ['attr.type',] }],
        onClick: [{ type: HostListener, args: ['click',] }]
    };
    return WindowCloseActionDirective;
}(Button));

var WindowRestoreActionDirective = /** @class */ (function (_super) {
    __extends(WindowRestoreActionDirective, _super);
    function WindowRestoreActionDirective(el, renderer, _service, localization, ngZone) {
        var _this = _super.call(this, el, renderer, null, localization, ngZone) || this;
        _this.buttonType = 'button';
        _this.window = _service;
        _this.look = 'bare';
        _this.icon = 'window-restore';
        return _this;
    }
    /**
     * @hidden
     */
    WindowRestoreActionDirective.prototype.onClick = function () {
        if (!this.isDisabled) {
            this.window.restoreAction();
        }
    };
    Object.defineProperty(WindowRestoreActionDirective.prototype, "visible", {
        get: function () {
            return this.window.options.state === 'default' ? 'none' : 'inline-flex';
        },
        enumerable: true,
        configurable: true
    });
    WindowRestoreActionDirective.decorators = [
        { type: Directive, args: [{
                    exportAs: 'kendoWindowRestoreAction',
                    providers: [
                        LocalizationService,
                        {
                            provide: L10N_PREFIX,
                            useValue: 'kendo.button'
                        }
                    ],
                    selector: 'button[kendoWindowRestoreAction]' // tslint:disable-line
                },] },
    ];
    /** @nocollapse */
    WindowRestoreActionDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: DragResizeService, decorators: [{ type: Optional }] },
        { type: LocalizationService },
        { type: NgZone }
    ]; };
    WindowRestoreActionDirective.propDecorators = {
        window: [{ type: Input }],
        buttonType: [{ type: HostBinding, args: ['attr.type',] }],
        onClick: [{ type: HostListener, args: ['click',] }],
        visible: [{ type: HostBinding, args: ['style.display',] }]
    };
    return WindowRestoreActionDirective;
}(Button));

/**
 * The settings for the Window actions when the Window is opened through `WindowService`
 * ([see example]({% slug api_dialog_windowservice %}#toc-open)).
 */
var WindowSettings = /** @class */ (function () {
    function WindowSettings() {
    }
    return WindowSettings;
}());
/**
 * Indicates that the **Close** button of a Window that is opened through `WindowService` is clicked.
 */
var WindowCloseResult = /** @class */ (function () {
    function WindowCloseResult() {
    }
    return WindowCloseResult;
}());
/**
 * Holds references to the object instance of the Window.
 * Controls the Windows that were opened through `WindowService`
 * ([see example]({% slug api_dialog_windowservice %}#toc-open)).
 */
var WindowRef = /** @class */ (function () {
    function WindowRef() {
    }
    return WindowRef;
}());

/**
 * @hidden
 */
var WindowContainerService = /** @class */ (function () {
    function WindowContainerService() {
    }
    Object.defineProperty(WindowContainerService.prototype, "container", {
        get: function () {
            return WindowContainerService.container;
        },
        set: function (container) {
            WindowContainerService.container = container;
        },
        enumerable: true,
        configurable: true
    });
    WindowContainerService.container = null;
    WindowContainerService.decorators = [
        { type: Injectable },
    ];
    return WindowContainerService;
}());

var WindowInjector = /** @class */ (function () {
    function WindowInjector(getWindowRef, parentInjector) {
        this.getWindowRef = getWindowRef;
        this.parentInjector = parentInjector;
    }
    WindowInjector.prototype.get = function (token, notFoundValue) {
        if (token === WindowRef) {
            return this.getWindowRef();
        }
        return this.parentInjector.get(token, notFoundValue);
    };
    return WindowInjector;
}());
/**
 * A service for opening Windows dynamically
 * ([see example]({% slug service_window %})).
 */
var WindowService = /** @class */ (function () {
    function WindowService(
    /**
     * @hidden
     */
    resolver, containerService) {
        this.resolver = resolver;
        this.containerService = containerService;
    }
    /**
     * Opens a Window component.
     *
     * @param {WindowSettings} settings - The settings that define the Window.
     * @returns {WindowRef} - A reference to the Window object.
     *
     * @example
     *
     * ```ts-no-run
     * _@Component({
     *   selector: 'my-app',
     *   template: `
     *     <button kendoButton (click)="open()">Open window</button>
     *     <div kendoWindowContainer></div>
     *   `
     * })
     * export class AppComponent {
     *     constructor( private windowService: WindowService ) {}
     *
     *     public open() {
     *         var window = this.windowService.open({
     *           title: "My window",
     *           content: "My content!"
     *         });
     *
     *         window.result.subscribe((result) => {
     *           if (result instanceof WindowCloseResult) {
     *             console.log("Window was closed");
     *           }
     *         });
     *     }
     * }
     * ```
     *
     */
    WindowService.prototype.open = function (settings) {
        var factory = this.resolver.resolveComponentFactory(WindowComponent);
        var container = settings.appendTo || this.containerService.container;
        if (!container) {
            throw new Error("Cannot attach window to the page.\n                Add an element that uses the kendoWindowContainer directive, or set the 'appendTo' property.\n                See https://www.telerik.com/kendo-angular-ui/components/dialogs/window/service/\n            ");
        }
        var windowRef = {
            close: function () { },
            content: null,
            result: null,
            window: null
        };
        var content = this.contentFrom(settings.content, container, windowRef);
        var window = container.createComponent(factory, undefined, undefined, content.nodes);
        windowRef.window = window;
        this.applyOptions(window.instance, settings);
        var apiClose = new Subject();
        var close = function (e) {
            apiClose.next(e || new WindowCloseResult());
            if (content.componentRef) {
                content.componentRef.destroy();
            }
            window.destroy();
        };
        var result = merge(apiClose, window.instance.close).pipe(take(1));
        result.subscribe(close);
        windowRef.close = close;
        windowRef.result = result;
        window.changeDetectorRef.markForCheck();
        return windowRef;
    };
    WindowService.prototype.applyOptions = function (instance, options) {
        if (isPresent(options.title)) {
            instance.title = options.title;
        }
        if (isPresent(options.keepContent)) {
            instance.keepContent = options.keepContent;
        }
        if (isPresent(options.width)) {
            instance.width = options.width;
        }
        if (isPresent(options.minWidth)) {
            instance.minWidth = options.minWidth;
        }
        if (isPresent(options.height)) {
            instance.height = options.height;
        }
        if (isPresent(options.minHeight)) {
            instance.minHeight = options.minHeight;
        }
        if (isPresent(options.left)) {
            instance.left = options.left;
        }
        if (isPresent(options.top)) {
            instance.top = options.top;
        }
        if (isPresent(options.draggable)) {
            instance.draggable = options.draggable;
        }
        if (isPresent(options.resizable)) {
            instance.resizable = options.resizable;
        }
        if (isPresent(options.messages && options.messages.closeTitle)) {
            instance.messages.closeTitle = options.messages.closeTitle;
        }
        if (isPresent(options.messages && options.messages.restoreTitle)) {
            instance.messages.restoreTitle = options.messages.restoreTitle;
        }
        if (isPresent(options.messages && options.messages.maximizeTitle)) {
            instance.messages.maximizeTitle = options.messages.maximizeTitle;
        }
        if (isPresent(options.messages && options.messages.minimizeTitle)) {
            instance.messages.minimizeTitle = options.messages.minimizeTitle;
        }
        if (isPresent(options.autoFocusedElement)) {
            instance.autoFocusedElement = options.autoFocusedElement;
        }
        if (isPresent(options.state)) {
            instance.state = options.state;
            if (options.state === 'minimized') {
                instance.keepContent = true;
            }
        }
        if (options.content instanceof TemplateRef) {
            instance.contentTemplate = options.content;
        }
        if (options.titleBarContent instanceof TemplateRef) {
            instance.titleBarTemplate = options.titleBarContent;
        }
    };
    WindowService.prototype.contentFrom = function (content, container, windowRef) {
        var renderer = container.injector.get(Renderer2);
        var nodes = [];
        var componentRef = null;
        if (typeof content === 'string') {
            nodes = [renderer.createText(content)];
        }
        else if (content && !(content instanceof TemplateRef)) {
            var injector = new WindowInjector(function () { return windowRef; }, container.injector);
            var factory = this.resolver.resolveComponentFactory(content);
            componentRef = container.createComponent(factory, undefined, injector);
            nodes = [componentRef.location.nativeElement];
            windowRef.content = componentRef;
        }
        return {
            componentRef: componentRef,
            nodes: [
                [],
                nodes // Content
            ]
        };
    };
    WindowService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    WindowService.ctorParameters = function () { return [
        { type: ComponentFactoryResolver },
        { type: WindowContainerService, decorators: [{ type: Inject, args: [WindowContainerService,] }] }
    ]; };
    return WindowService;
}());

/**
 * Provides an insertion point for the Dialogs which are created through the
 * Dialog service ([see example]({% slug api_dialog_dialogservice %}#toc-open)).
 * Created Dialogs will be mounted after that element.
 *
 * @example
 * ```html-no-run
 * <div kendoDialogContainer></div>
 * ```
 */
var DialogContainerDirective = /** @class */ (function () {
    function DialogContainerDirective(container, service) {
        service.container = container;
    }
    DialogContainerDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoDialogContainer]'
                },] },
    ];
    /** @nocollapse */
    DialogContainerDirective.ctorParameters = function () { return [
        { type: ViewContainerRef },
        { type: DialogContainerService }
    ]; };
    return DialogContainerDirective;
}());

/**
 * @hidden
 */
var Messages = /** @class */ (function (_super) {
    __extends(Messages, _super);
    function Messages() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Messages.propDecorators = {
        closeTitle: [{ type: Input }],
        restoreTitle: [{ type: Input }],
        maximizeTitle: [{ type: Input }],
        minimizeTitle: [{ type: Input }]
    };
    return Messages;
}(ComponentMessages));

/**
 * @hidden
 */
var LocalizedMessagesDirective = /** @class */ (function (_super) {
    __extends(LocalizedMessagesDirective, _super);
    function LocalizedMessagesDirective(service) {
        var _this = _super.call(this) || this;
        _this.service = service;
        return _this;
    }
    LocalizedMessagesDirective.decorators = [
        { type: Directive, args: [{
                    providers: [
                        {
                            provide: Messages,
                            useExisting: forwardRef(function () { return LocalizedMessagesDirective; })
                        }
                    ],
                    selector: "\n    [kendoDialogLocalizedMessages],\n    [kendoWindowLocalizedMessages]\n  "
                },] },
    ];
    /** @nocollapse */
    LocalizedMessagesDirective.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    return LocalizedMessagesDirective;
}(Messages));

/**
 * Custom component messages override default component messages
 * ([see example]({% slug globalization_dialogs %}#toc-localization)).
 */
var CustomMessagesComponent = /** @class */ (function (_super) {
    __extends(CustomMessagesComponent, _super);
    function CustomMessagesComponent(service) {
        var _this = _super.call(this) || this;
        _this.service = service;
        return _this;
    }
    Object.defineProperty(CustomMessagesComponent.prototype, "override", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    CustomMessagesComponent.decorators = [
        { type: Component, args: [{
                    providers: [
                        {
                            provide: Messages,
                            useExisting: forwardRef(function () { return CustomMessagesComponent; }) // tslint:disable-line:no-forward-ref
                        }
                    ],
                    selector: 'kendo-dialog-messages, kendo-window-messages',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    CustomMessagesComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    return CustomMessagesComponent;
}(Messages));

/**
 * @hidden
 */
var SHARED_DIRECTIVES = [
    DialogActionsComponent,
    CustomMessagesComponent,
    LocalizedMessagesDirective
];
/**
 * @hidden
 */
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [SHARED_DIRECTIVES],
                    exports: [SHARED_DIRECTIVES, CommonModule],
                    imports: [CommonModule]
                },] },
    ];
    return SharedModule;
}());

/**
 * @hidden
 */
var DIALOG_DIRECTIVES = [
    DialogComponent,
    DialogTitleBarComponent
];
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the Dialog component that includes all Dialog components and directives.
 * Imports `DialogModule` into the [root module]({{ site.data.urls.angular['ngmodules'] }}#angular-modularity)
 * of your application or into any other sub-module that will use the Dialog component.
 *
 * @example
 * ```ts-no-run
 * import { NgModule } from '@angular/core';
 * import { BrowserModule } from '@angular/platform-browser';
 * import { DialogModule } from '@progress/kendo-angular-dialog';
 * import { AppComponent } from './app.component';
 *
 * _@NgModule({
 *     bootstrap:    [AppComponent],
 *     declarations: [AppComponent],
 *     imports:      [BrowserModule, DialogModule]
 * })
 * export class AppModule {
 * }
 * ```
 */
var DialogModule = /** @class */ (function () {
    function DialogModule() {
    }
    DialogModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [DIALOG_DIRECTIVES, DialogContainerDirective],
                    entryComponents: [DIALOG_DIRECTIVES],
                    exports: [DIALOG_DIRECTIVES, SHARED_DIRECTIVES, DialogContainerDirective],
                    imports: [SharedModule],
                    providers: [DialogContainerService, DialogService]
                },] },
    ];
    return DialogModule;
}());

/**
 * Provides an insertion point for the Windows which are created through the
 * Window service ([see example]({% slug api_dialog_windowservice %}#toc-open)).
 * Created Windows will be mounted after that element.
 *
 * @example
 * ```html-no-run
 * <div kendoWindowContainer></div>
 * ```
 */
var WindowContainerDirective = /** @class */ (function () {
    function WindowContainerDirective(container, service) {
        service.container = container;
    }
    WindowContainerDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoWindowContainer]'
                },] },
    ];
    /** @nocollapse */
    WindowContainerDirective.ctorParameters = function () { return [
        { type: ViewContainerRef },
        { type: WindowContainerService }
    ]; };
    return WindowContainerDirective;
}());

var WINDOW_DIRECTIVES = [
    ResizeHandleDirective,
    WindowComponent,
    WindowTitleBarComponent,
    WindowCloseActionDirective,
    WindowMinimizeActionDirective,
    WindowMaximizeActionDirective,
    WindowRestoreActionDirective
];
var ENTRY_COMPONENTS = [
    WindowComponent,
    WindowTitleBarComponent
];
var exportedModules = [
    WindowComponent,
    WindowCloseActionDirective,
    WindowMinimizeActionDirective,
    WindowMaximizeActionDirective,
    WindowRestoreActionDirective,
    WindowTitleBarComponent
];
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the Window component. Imports `WindowModule` into the
 * [root module]({{ site.data.urls.angular['ngmodules'] }}#angular-modularity)
 * of your application or into any other sub-module that will use the Window component.
 *
 * @example
 * ```ts-no-run
 * import { NgModule } from '@angular/core';
 * import { BrowserModule } from '@angular/platform-browser';
 * import { WindowModule } from '@progress/kendo-angular-window';
 * import { AppComponent } from './app.component';
 *
 * _@NgModule({
 *     bootstrap:    [AppComponent],
 *     declarations: [AppComponent],
 *     imports:      [BrowserModule, WindowModule]
 * })
 * export class AppModule {
 * }
 * ```
 */
var WindowModule = /** @class */ (function () {
    function WindowModule() {
    }
    WindowModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [WINDOW_DIRECTIVES, WindowContainerDirective],
                    entryComponents: [ENTRY_COMPONENTS],
                    exports: [exportedModules, SHARED_DIRECTIVES, WindowContainerDirective],
                    imports: [SharedModule, DraggableModule],
                    providers: [WindowContainerService, WindowService]
                },] },
    ];
    return WindowModule;
}());

/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the Dialogs components.
 *
 * @example
 *
 * ```ts-no-run
 * import { DialogsModule } from '@progress/kendo-angular-dialog';
 *
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 * import { NgModule } from '@angular/core';
 *
 * import { AppComponent } from './app.component';
 *
 * _@NgModule({
 *     declarations: [AppComponent],
 *     imports:      [BrowserModule, DialogsModule],
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * platformBrowserDynamic().bootstrapModule(AppModule);
 *
 * ```
 */
var DialogsModule = /** @class */ (function () {
    function DialogsModule() {
    }
    DialogsModule.decorators = [
        { type: NgModule, args: [{
                    exports: [DialogModule, WindowModule]
                },] },
    ];
    return DialogsModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { DIALOG_DIRECTIVES, DialogContainerDirective, DialogContainerService, CustomMessagesComponent, DIALOG_LOCALIZATION_SERVICE, LocalizedMessagesDirective, Messages, SHARED_DIRECTIVES, SharedModule, DragResizeService, NavigationService, WindowContainerDirective, WindowContainerService, ResizeHandleDirective, DialogComponent, DialogTitleBarComponent, DialogContentBase, DialogActionsComponent, DialogService, DialogCloseResult, DialogRef, DialogSettings, DialogAction, WindowComponent, WindowTitleBarComponent, WindowMaximizeActionDirective, WindowMinimizeActionDirective, WindowCloseActionDirective, WindowRestoreActionDirective, WindowSettings, WindowRef, WindowCloseResult, WindowService, DialogModule, WindowModule, DialogsModule };
