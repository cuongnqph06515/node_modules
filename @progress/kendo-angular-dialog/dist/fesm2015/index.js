/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { EventEmitter, TemplateRef, Component, ElementRef, Input, Output, HostBinding, Optional, InjectionToken, Renderer2, ChangeDetectorRef, ContentChild, ViewChild, HostListener, Injectable, isDevMode, ComponentFactoryResolver, Inject, NgZone, Directive, Host, ViewChildren, ViewContainerRef, forwardRef, NgModule } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { LocalizationService, L10N_PREFIX, ComponentMessages } from '@progress/kendo-angular-l10n';
import { Subject, merge, Subscription, of } from 'rxjs';
import { filter, map, take, share, tap, switchMap, takeUntil } from 'rxjs/operators';
import { DraggableDirective, isChanged, isDocumentAvailable, DraggableModule } from '@progress/kendo-angular-common';
import { offset, scrollPosition, positionWithScroll, getDocumentElement, getWindowViewPort } from '@progress/kendo-popup-common';
import { Button } from '@progress/kendo-angular-buttons';
import { CommonModule } from '@angular/common';

/**
 * Specifies the action buttons of the Dialog
 * ([see example]({% slug actionbuttons_dialog %})).
 */
class DialogActionsComponent {
    constructor(el) {
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
    get className() {
        return this.layout === 'stretched';
    }
    /**
     * @hidden
     */
    actionTemplate() {
        return this.actions instanceof TemplateRef;
    }
    /**
     * @hidden
     */
    onButtonClick(action, _e) {
        this.action.emit(action);
    }
    /**
     * @hidden
     */
    buttonClass(action) {
        const classes = ['k-button'];
        if (action.primary) {
            classes.push('k-primary');
        }
        return classes.join(' ');
    }
}
DialogActionsComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-dialog-actions',
                template: `
        <ng-content *ngIf="!actions"></ng-content>
        <ng-container *ngIf="!actionTemplate()">
            <button
                type="button"
                [ngClass]="buttonClass(action)"
                (click)="onButtonClick(action, $event)"
                *ngFor="let action of actions"
                [attr.aria-label]="action.text"
            >
                {{ action.text }}
            </button>
        </ng-container>
        <ng-template [ngTemplateOutlet]="actions" *ngIf="actionTemplate()"></ng-template>
    `
            },] },
];
/** @nocollapse */
DialogActionsComponent.ctorParameters = () => [
    { type: ElementRef }
];
DialogActionsComponent.propDecorators = {
    actions: [{ type: Input }],
    layout: [{ type: Input }],
    action: [{ type: Output }],
    buttonGroupClassName: [{ type: HostBinding, args: ['class.k-dialog-buttongroup',] }],
    className: [{ type: HostBinding, args: ['class.k-dialog-button-layout-stretched',] }]
};

/**
 * @hidden
 */
class PreventableEvent {
    constructor() {
        this.prevented = false;
    }
    /**
     * Prevents the default action for a specified event.
     * In this way, the source component suppresses the built-in behavior that follows the event.
     */
    preventDefault() {
        this.prevented = true;
    }
    /**
     * If the event is prevented by any of its subscribers, returns `true`.
     *
     * @returns `true` if the default action was prevented. Otherwise, returns `false`.
     */
    isDefaultPrevented() {
        return this.prevented;
    }
}

/**
 * Represents the [Kendo UI DialogTitleBar component for Angular]({% slug api_dialog_dialogtitlebarcomponent %}).
 *
 * It is used as part of the Dialog content when the component is created dynamically by using an [Angular service]({% slug service_dialog %}).
 */
class DialogTitleBarComponent {
    constructor(hostElement, localizationService) {
        this.hostElement = hostElement;
        this.localizationService = localizationService;
        /**
         * Fires when the close button of the title-bar is clicked.
         */
        this.close = new EventEmitter();
    }
    get className() {
        return true;
    }
    get closeButtonTitle() {
        return this.localizationService.get('closeTitle');
    }
    ngAfterViewChecked() {
        const element = this.hostElement.nativeElement;
        element.setAttribute('id', this.id);
    }
    /**
     * @hidden
     */
    onCloseClick(e) {
        e.preventDefault();
        const eventArgs = new PreventableEvent();
        this.close.emit(eventArgs);
    }
}
DialogTitleBarComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-dialog-titlebar',
                template: `
        <div class="k-window-title k-dialog-title">
            <ng-content></ng-content>
        </div>

        <div class="k-window-actions k-dialog-actions">
            <a
                href="#"
                role="button"
                [attr.title]="closeButtonTitle"
                [attr.aria-label]="closeButtonTitle"
                class="k-button k-bare k-button-icon k-window-action k-dialog-action k-dialog-close"
                (click)="onCloseClick($event)"
            >
                <span class="k-icon k-i-x"></span>
            </a>
        </div>
    `
            },] },
];
/** @nocollapse */
DialogTitleBarComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: LocalizationService, decorators: [{ type: Optional }] }
];
DialogTitleBarComponent.propDecorators = {
    close: [{ type: Output }],
    id: [{ type: Input }],
    closeTitle: [{ type: Input }],
    className: [{ type: HostBinding, args: ['class.k-window-titlebar',] }, { type: HostBinding, args: ['class.k-dialog-titlebar',] }]
};

/**
 * @hidden
 */
const isPresent = (value) => value !== null && value !== undefined;
/**
 * @hidden
 */
const isTruthy = (value) => !!value;
const toClassList = (classNames) => String(classNames).trim().split(' ');
const focusableRegex = /^(?:a|input|select|textarea|button|object)$/i;
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
const DIALOG_ELEMENTS_HANDLING_ESC_KEY = 'k-dialog-wrapper k-dialog-buttongroup k-dialog-action';
/**
 * @hidden
 */
const DIALOG_ELEMENTS_HANDLING_ARROWS = 'k-dialog-buttongroup';
/**
 * @hidden
 */
const WINDOW_CLASSES = 'k-window';
/**
 * @hidden
 */
const hasClasses = (element, classNames) => {
    const namesList = toClassList(classNames);
    return Boolean(toClassList(element.className).find((className) => namesList.indexOf(className) >= 0));
};
/**
 * @hidden
 */
const isVisible = (element) => {
    const rect = element.getBoundingClientRect();
    return !!(rect.width && rect.height) && window.getComputedStyle(element).visibility !== 'hidden';
};
/**
 * @hidden
 */
const isFocusable = (element, checkVisibility = true) => {
    if (element.tagName) {
        const tagName = element.tagName.toLowerCase();
        const tabIndex = element.getAttribute('tabIndex');
        const validTabIndex = tabIndex !== null && !isNaN(tabIndex) && tabIndex > -1;
        let focusable = false;
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
const focusableSelector = [
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
const preventDefault = ({ originalEvent: event }) => {
    event.stopPropagation();
    event.preventDefault();
};
/**
 * @hidden
 */
const RESIZE_DIRECTIONS = ['n', 'e', 's', 'w', 'se', 'sw', 'ne', 'nw'];
/**
 * @hidden
 */
const OFFSET_STYLES = ['top', 'left', 'width', 'height'];
/**
 * @hidden
 */
const isString = (value) => value instanceof String || typeof value === 'string';
/**
 * @hidden
 */
const isNumber = (value) => typeof value === 'number' && isFinite(value);
/**
 * @hidden
 */
const createValueWithUnit = (value) => value + (isNumber(value) ? 'px' : '');

/**
 * The settings for the Dialog actions when the Dialog is opened through `DialogService`
 * ([see example]({% slug api_dialog_dialogservice %}#toc-open)).
 */
class DialogAction {
}
/**
 * Indicates that the **Close** button is clicked. Used when the results from
 * the Dialogs that are opened through `DialogService` are filtered
 * ([see example]({% slug api_dialog_dialogservice %}#toc-open)).
 */
class DialogCloseResult {
}
/**
 * The settings that can be used when the Dialog is opened through `DialogService`.
 * ([see example]({% slug api_dialog_dialogservice %}#toc-open)).
 */
class DialogSettings {
}
/**
 * Holds references to the object instance and published events of the Dialog.
 * Controls the Dialogs that were opened through the `DialogService`
 * ([see example]({% slug api_dialog_dialogservice %}#toc-open)).
 */
class DialogRef {
}

/**
 * @hidden
 */
const DIALOG_LOCALIZATION_SERVICE = new InjectionToken('Dialog LocalizationService');

/**
 * Represents the [Kendo UI Dialog component for Angular]({% slug overview_dialog_dialogs %}).
 */
class DialogComponent {
    constructor(_elRef, _renderer, localization, cdr) {
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
        this.subscriptions.push(localization.changes.subscribe(({ rtl }) => (this.direction = rtl ? 'rtl' : 'ltr')));
        this.titleId = this.generateTitleId();
    }
    get dir() {
        return this.direction;
    }
    /**
     * @hidden
     */
    onComponentKeydown(event) {
        const target = event.target;
        const parent = target.parentElement;
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
    }
    ngAfterContentInit() {
        this.bubble('close', this.titlebarContent);
        if (this.titlebarContent) {
            this.titlebarContent.id = this.titleId;
        }
    }
    ngAfterViewInit() {
        this.handleInitialFocus();
        this.bubble('close', this.titlebarView);
        this.bubble('action', this.actionsView);
        if (this.titlebarView || this.titlebarContent) {
            //Needed for Dialogs created via service
            this._renderer.setAttribute(this._elRef.nativeElement.querySelector('.k-dialog'), 'aria-labelledby', this.titleId);
        }
    }
    ngOnInit() {
        this._renderer.removeAttribute(this._elRef.nativeElement, 'title');
        this.cdr.detectChanges();
    }
    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
        this.subscriptions = [];
    }
    /**
     * Focuses the wrapper of the Dialog component.
     */
    focus() {
        const wrapper = this._elRef.nativeElement;
        if (isPresent(wrapper)) {
            wrapper.focus();
        }
    }
    /**
     * @hidden
     */
    handleInitialFocus() {
        const wrapper = this._elRef.nativeElement;
        const primaryButton = wrapper.querySelector('.k-primary');
        if (this.autoFocusedElement) {
            const initiallyFocusedElement = wrapper.querySelector(this.autoFocusedElement);
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
    }
    /**
     * @hidden
     */
    handleActionButtonFocus(parent, key) {
        const focusableActionButtons = this.getAllFocusableChildren(parent);
        for (let i = 0; i < focusableActionButtons.length; i++) {
            const current = focusableActionButtons[i];
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
    }
    /**
     * @hidden
     */
    keepFocusWithinComponent(target, event) {
        const firstFocusable = this._elRef.nativeElement;
        const lastFocusable = this.getLastFocusableElement(firstFocusable);
        const tabBeforeFirstFocusable = target === firstFocusable && event.shiftKey;
        const tabAfterLastFocusable = !event.shiftKey && isPresent(lastFocusable) && target === lastFocusable;
        const tabWithNoFocusable = !isPresent(lastFocusable) && !event.shiftKey;
        if (tabBeforeFirstFocusable || tabWithNoFocusable) {
            event.preventDefault();
            firstFocusable.focus();
        }
        if (tabAfterLastFocusable) {
            event.preventDefault();
            lastFocusable.focus();
        }
    }
    /**
     * @hidden
     */
    shouldFocusPrimary(el) {
        return isPresent(el) && isFocusable(el);
    }
    /**
     * @hidden
     */
    getAllFocusableChildren(parent) {
        return parent.querySelectorAll(focusableSelector);
    }
    /**
     * @hidden
     */
    getLastFocusableElement(parent) {
        const all = this.getAllFocusableChildren(parent);
        return all.length > 0 ? all[all.length - 1] : null;
    }
    /**
     * @hidden
     */
    generateTitleId() {
        return 'kendo-dialog-title-' + Math.ceil(Math.random() * 1000000).toString();
    }
    get wrapperClass() {
        return true;
    }
    get styles() {
        const styles = {};
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
    }
    bubble(eventName, component) {
        if (component) {
            const emit = e => this[eventName].emit(e);
            const s = component[eventName].subscribe(emit);
            this.subscriptions.push(s);
        }
    }
}
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
                template: `
        <ng-container
            kendoDialogLocalizedMessages
            i18n-closeTitle="kendo.dialog.closeTitle|The title of the close button"
            closeTitle="Close"
        >
        <div class="k-overlay" @overlayAppear></div>

        <div class="k-widget k-window k-dialog" role="dialog" [ngStyle]="styles" @dialogSlideInAppear>
            <kendo-dialog-titlebar *ngIf="title" [closeTitle]="closeTitle" [id]="titleId">{{ title }}</kendo-dialog-titlebar>
            <ng-content select="kendo-dialog-titlebar" *ngIf="!title"></ng-content>

            <div class="k-content k-window-content k-dialog-content">
                <ng-content *ngIf="!contentTemplate"></ng-content>
                <ng-template [ngTemplateOutlet]="contentTemplate" *ngIf="contentTemplate"></ng-template>
            </div>

            <ng-content select="kendo-dialog-actions" *ngIf="!actions"></ng-content>
            <kendo-dialog-actions *ngIf="actions" [actions]="actions" [layout]="actionsLayout"> </kendo-dialog-actions>
        </div>
    </ng-container>
    `
            },] },
];
/** @nocollapse */
DialogComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: LocalizationService },
    { type: ChangeDetectorRef }
];
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

/**
 * The base class  which will be extended by a component that is provided as content through `content`
 * ([see example]({% slug service_dialog %}#toc-passing-title-content-and-actions-as-a-single-component)).
 */
class DialogContentBase {
    constructor(dialog) {
        this.dialog = dialog;
    }
    /**
     * @hidden
     */
    ngAfterViewInit() {
        if (this.dialogTitleBar) {
            // when opening component inside dialog with service AND the component has defined its own titlebar
            this.dialogTitleBar.close.pipe(filter((e) => !e.isDefaultPrevented())).subscribe(() => {
                this.dialog.close();
            });
        }
        if (this.dialogActions) {
            if (this.dialogActions.actions) {
                this.dialogActions.action.subscribe(action => this.dialog.dialog.instance.action.emit(action));
            }
        }
    }
}
DialogContentBase.propDecorators = {
    dialogTitleBar: [{ type: ViewChild, args: [DialogTitleBarComponent,] }],
    dialogActions: [{ type: ViewChild, args: [DialogActionsComponent,] }]
};

/**
 * @hidden
 */
class DialogContainerService {
    set container(container) {
        DialogContainerService.container = container;
    }
    get container() {
        return DialogContainerService.container;
    }
}
DialogContainerService.container = null;
DialogContainerService.decorators = [
    { type: Injectable },
];

// tslint:disable:max-line-length
const isNotComponent = (component) => isString(component) || component instanceof TemplateRef;
class DialogInjector {
    constructor(getDialogRef, parentInjector) {
        this.getDialogRef = getDialogRef;
        this.parentInjector = parentInjector;
    }
    get(token, notFoundValue) {
        if (token === DialogRef) {
            return this.getDialogRef();
        }
        return this.parentInjector.get(token, notFoundValue);
    }
}
/**
 * A service for opening Dialog windows dynamically
 * ([see example]({% slug service_dialog %})).
 */
class DialogService {
    constructor(
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
    open(options) {
        const factory = this.resolver.resolveComponentFactory(DialogComponent);
        const container = options.appendTo || this.containerService.container;
        if (!container) {
            throw new Error(`
Cannot attach dialog to the page.
Add an element that uses the kendoDialogContainer directive, or set the 'appendTo' property.
See https://www.telerik.com/kendo-angular-ui/components/dialogs/dialog/service/.
          `);
        }
        // create DialogRef to (1) pass as result, (2) provide through injector
        const dialogRef = {
            close: () => {
                /* noop */
            },
            content: null,
            dialog: null,
            result: null
        };
        return this.initializeDialog(options.content, factory, container, dialogRef, options);
    }
    initializeDialog(component, factory, container, dialogRef, options) {
        const content = this.contentFrom(component, container, dialogRef);
        const dialog = container.createComponent(factory, undefined, undefined, content.nodes);
        dialogRef.dialog = dialog;
        dialog.changeDetectorRef.markForCheck();
        // copy @Input options to dialog instance
        this.applyOptions(dialog.instance, options);
        // create close handler and result stream
        const apiClose = new Subject();
        const close = (e) => {
            if (e instanceof PreventableEvent) {
                e = new DialogCloseResult();
            }
            apiClose.next(e || new DialogCloseResult());
            if (content.componentRef) {
                content.componentRef.destroy();
            }
            dialog.destroy();
        };
        const result = merge(apiClose, 
        // triggered when the titlebar or actions are defined in DialogSettings
        merge(dialog.instance.close, dialog.instance.action).pipe(map(e => (e instanceof PreventableEvent ? new DialogCloseResult() : e)), filter(e => {
            if (options.preventAction) {
                // add dialogRef only when using component
                const dialogRefParameter = isNotComponent(component) ? undefined : dialogRef;
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
            const hasContentTitle = content.nodes[0] && content.nodes[0].length > 0;
            const hasContentActions = content.nodes[2] && content.nodes[2].length > 0;
            const multipleTitles = options.title && hasContentTitle;
            const multipleActions = options.actions && hasContentActions;
            if (component.prototype instanceof DialogContentBase) {
                // content component extends DialogContentBase
                if (multipleTitles || multipleActions) {
                    console.warn(`
                    Multiple Title and/or Actions configurations detected.
                    When using a component as content, provide the title and actions either in the component's markup
                    or via the title and actions properties of the DialogSettings object, but not both.
                    See https://www.telerik.com/kendo-angular-ui/components/dialogs/dialog/service/#toc-passing-title-content-and-actions-as-a-single-component'`);
                }
            }
            else {
                if (hasContentTitle || hasContentActions) {
                    console.warn(`
                    When Title and/or Actions markup is provided in content component's template,
                    the component needs to inherit the DialogContentBase class to ensure that close and result events are properly hooked.
                    See https://www.telerik.com/kendo-angular-ui/components/dialogs/dialog/service/#toc-passing-title-content-and-actions-as-a-single-component'`);
                }
            }
        }
        return dialogRef;
    }
    applyOptions(instance, options) {
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
    }
    contentFrom(content, container, dialogRef) {
        const renderer = container.injector.get(Renderer2);
        let nodes = [];
        let titleNodes = [];
        let actionNodes = [];
        let componentRef = null;
        if (typeof content === 'string') {
            nodes = [renderer.createText(content)];
        }
        else if (content && !(content instanceof TemplateRef)) {
            // Component
            const injector = new DialogInjector(() => dialogRef, container.injector);
            const factory = this.resolver.resolveComponentFactory(content);
            componentRef = container.createComponent(factory, undefined, injector);
            titleNodes = Array.from(componentRef.location.nativeElement.querySelectorAll('kendo-dialog-titlebar'));
            nodes = [componentRef.location.nativeElement];
            actionNodes = Array.from(componentRef.location.nativeElement.querySelectorAll('kendo-dialog-actions'));
            dialogRef.content = componentRef;
        }
        return {
            componentRef,
            nodes: [
                titleNodes,
                nodes,
                actionNodes // <ng-content select="kendo-dialog-actions">
            ]
        };
    }
}
DialogService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
DialogService.ctorParameters = () => [
    { type: ComponentFactoryResolver },
    { type: DialogContainerService, decorators: [{ type: Inject, args: [DialogContainerService,] }] }
];

/**
 * @hidden
 */
let newZIndex = 10002;
/**
 * @hidden
 */
const DEFAULT_OPTIONS = {
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
const createMoveStream = (el, ev) => mouseDown => {
    return el.kendoDrag
        .pipe(takeUntil(el.kendoRelease.pipe(tap(() => { ev.emit(); }))), map(({ pageX, pageY }) => ({
        originalX: mouseDown.pageX,
        originalY: mouseDown.pageY,
        pageX,
        pageY
    })));
};
/**
 * @hidden
 */
class DragResizeService {
    constructor(ngZone) {
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
    ngOnDestroy() {
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
        }
        if (this.dragSubscription) {
            this.dragSubscription.unsubscribe();
        }
    }
    init(el) {
        const state$$1 = this.options.state;
        let options = this.options;
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
    }
    onDrag(el) {
        this.subscriptions.add(this.ngZone.runOutsideAngular(() => {
            let startPosition;
            let dragStarted;
            this.dragSubscription = el.kendoPress
                .pipe(tap((ev) => {
                if (!ev.isTouch) {
                    preventDefault(ev);
                }
                this.focus.emit();
                startPosition = this.currentPosition();
                dragStarted = false;
            }), switchMap(createMoveStream(el, this.dragEnd)))
                .subscribe(({ pageX, pageY, originalX, originalY }) => {
                if (!dragStarted) {
                    this.ensureWidth();
                    this.dragStart.emit();
                    dragStarted = true;
                }
                this.handleDrag({
                    originalX, originalY,
                    pageX, pageY, startPosition
                });
            });
        }));
    }
    handleDrag({ originalX, originalY, pageX, pageY, startPosition }) {
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
    }
    onResize(handle, direction) {
        this.subscriptions.add(this.ngZone.runOutsideAngular(() => {
            let startOffsetAndPosition;
            let resizeStarted = false;
            handle.kendoPress.pipe(tap((ev) => {
                preventDefault(ev);
                this.focus.emit();
                startOffsetAndPosition = this.currentOffsetAndPosition();
                resizeStarted = false;
            }), switchMap(createMoveStream(handle, this.resizeEnd)))
                .subscribe(({ pageX, pageY, originalX, originalY }) => {
                if (!resizeStarted) {
                    this.resizeStart.emit(direction);
                    resizeStarted = true;
                }
                let deltaX = pageX - originalX;
                let deltaY = pageY - originalY;
                this.handleResize(startOffsetAndPosition, direction, deltaX, deltaY);
            });
        }));
    }
    handleResize(initial, dir, deltaX, deltaY) {
        const old = this.options;
        let ev = {};
        if (dir.indexOf('e') >= 0) {
            const newWidth = initial.width + deltaX;
            if (newWidth !== old.width && newWidth >= old.minWidth) {
                ev.width = newWidth;
            }
        }
        if (dir.indexOf('n') >= 0) {
            const newHeight = initial.height - deltaY;
            const newTop = initial.y + deltaY;
            if (newHeight !== old.height && newHeight >= old.minHeight && newTop !== old.top) {
                ev.height = newHeight;
                ev.top = newTop;
            }
        }
        if (dir.indexOf('s') >= 0) {
            const newHeight = initial.height + deltaY;
            if (newHeight !== old.height && newHeight >= old.minHeight) {
                ev.height = newHeight;
            }
        }
        if (dir.indexOf('w') >= 0) {
            const newLeft = initial.x + deltaX;
            const newWidth = initial.width - deltaX;
            if (newWidth !== old.width && newWidth >= old.minWidth && newLeft !== old.left) {
                ev.width = newWidth;
                ev.left = newLeft;
            }
        }
        if (isPresent(ev.width) || isPresent(ev.height)) {
            OFFSET_STYLES.forEach((style$$1) => {
                if (isPresent(ev[style$$1])) {
                    this.options[style$$1] = ev[style$$1];
                }
            });
            this.change.emit(ev);
        }
    }
    restoreAction() {
        this.lastAction = 'restore';
        this.defaultState();
    }
    defaultState() {
        if (isPresent(this.restoreOptions)) {
            this.options = Object.assign({}, this.restoreOptions);
        }
        this.options.state = 'default';
        this.stateChange.emit('default');
    }
    storeOptions() {
        this.restoreOptions = Object.assign({}, this.options);
    }
    maximizeAction() {
        this.lastAction = 'maximize';
        this.maximizeState();
    }
    maximizeState() {
        this.storeOptions();
        const wnd = this.windowViewPort;
        this.options = Object.assign({}, this.options, {
            height: wnd.height,
            left: 0,
            position: 'fixed',
            state: 'maximized',
            top: 0,
            width: wnd.width
        });
        this.stateChange.emit('maximized');
    }
    minimizeAction() {
        this.lastAction = 'minimize';
        this.minimizeState();
    }
    minimizeState() {
        this.storeOptions();
        this.options = Object.assign({}, this.options, {
            height: null,
            minHeight: 0,
            state: 'minimized'
        });
        this.stateChange.emit('minimized');
    }
    /**
     * Handles manual changes of the 'state' property.
     * Required to distinguish them from action clicks.
     */
    applyManualState() {
        const state$$1 = this.options.state;
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
    }
    closeAction() {
        this.close.emit();
    }
    ensureWidth() {
        const windowOffset = offset(this.window.nativeElement);
        if (!isPresent(this.options.width)) {
            this.options.width = windowOffset.width;
            this.change.emit({ width: windowOffset.width });
        }
    }
    clearHeight() {
        if (this.options.height === 0) {
            delete this.options.height;
        }
        if (this.options.minHeight === 0) {
            delete this.options.minHeight;
        }
    }
    center() {
        if (this.options.state === 'maximized') {
            return;
        }
        let scroll = scrollPosition(this.window.nativeElement);
        let wnd = this.windowViewPort;
        let wrapper = offset(this.window.nativeElement);
        let ev = {};
        if (!isPresent(this.options.left)) {
            this.options.left = scroll.x + Math.max(0, (wnd.width - wrapper.width) / 2);
            ev.left = this.options.left;
        }
        if (!isPresent(this.options.top)) {
            this.options.top = scroll.y + Math.max(0, (wnd.height - wrapper.height) / 2);
            ev.top = this.options.top;
        }
        this.change.emit(ev);
    }
    currentOffsetAndPosition() {
        const o = this.options;
        const off = offset(this.window.nativeElement);
        return Object.assign({}, this.currentPosition(), {
            height: o.height ? o.height : off.height,
            width: o.width ? o.width : off.width
        });
    }
    currentPosition() {
        const o = this.options;
        if (!o.top || !o.left) {
            this.setPosition();
        }
        return {
            x: this.options.left,
            y: this.options.top
        };
    }
    setPosition() {
        const wrapper = positionWithScroll(this.window.nativeElement, getDocumentElement(this.window.nativeElement));
        this.options.left = wrapper.left;
        this.options.top = wrapper.top;
    }
    setRestoreOption(style$$1, value) {
        if (isPresent(this.restoreOptions)) {
            this.restoreOptions[style$$1] = value;
        }
    }
    get nextPossibleZIndex() {
        return newZIndex;
    }
    get nextZIndex() {
        return newZIndex++;
    }
    get windowViewPort() {
        return getWindowViewPort(this.window.nativeElement);
    }
}
DragResizeService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
DragResizeService.ctorParameters = () => [
    { type: NgZone }
];

/**
 * @hidden
 */
class ResizeHandleDirective {
    constructor(draggable, el, renderer, service) {
        this.draggable = draggable;
        this.el = el;
        this.renderer = renderer;
        this.service = service;
        this.subscriptions = new Subscription();
    }
    get hostClass() {
        return true;
    }
    ngOnInit() {
        this.setDisplay();
        this.renderer.addClass(this.el.nativeElement, 'k-resize-' + this.direction);
        this.subscriptions.add(of(this.draggable).subscribe(handle => {
            this.service.onResize(handle, this.direction);
        }));
        this.subscriptions.add(this.service.resizeStart.subscribe((dir) => {
            if (dir !== this.direction) {
                this.setDisplay('none');
            }
        }));
        this.subscriptions.add(this.service.dragStart.subscribe(() => {
            this.setDisplay('none');
        }));
        this.subscriptions.add(merge(this.service.resizeEnd, this.service.dragEnd).subscribe(() => {
            this.setDisplay('block');
        }));
        this.subscriptions.add(this.service.stateChange.subscribe((state$$1) => {
            this.setDisplay(state$$1 === 'default' ? 'block' : 'none');
        }));
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
    setDisplay(value = 'block') {
        this.renderer.setStyle(this.el.nativeElement, 'display', this.service.options.state === 'default' ? value : 'none');
    }
}
ResizeHandleDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoWindowResizeHandle]'
            },] },
];
/** @nocollapse */
ResizeHandleDirective.ctorParameters = () => [
    { type: DraggableDirective, decorators: [{ type: Host }] },
    { type: ElementRef },
    { type: Renderer2 },
    { type: DragResizeService }
];
ResizeHandleDirective.propDecorators = {
    direction: [{ type: Input }],
    hostClass: [{ type: HostBinding, args: ['class.k-resize-handle',] }]
};

class WindowTitleBarComponent {
    constructor(el, service, ngZone) {
        this.el = el;
        this.ngZone = ngZone;
        this.service = service;
    }
    ngOnInit() {
        this.dragDirective = new DraggableDirective(this.el, this.ngZone);
        this.dragDirective.ngOnInit();
        if (this.isDraggable) {
            this.subscribeDrag();
        }
        this.subscribeStateChange();
    }
    ngOnDestroy() {
        this.dragDirective.ngOnDestroy();
        this.unsubscribeDrag();
        this.unsubscribeState();
    }
    /**
     * @hidden
     */
    subscribeDrag() {
        this.unsubscribeDrag();
        this.dragSubscription = of(this.dragDirective).subscribe(titleBar => {
            this.service.onDrag(titleBar);
        });
    }
    /**
     * @hidden
     */
    subscribeStateChange() {
        this.stateSubscription = this.service.stateChange.subscribe((state$$1) => {
            if (this.service.options.draggable) {
                if (state$$1 === 'maximized') {
                    this.unsubscribeDrag();
                }
                else {
                    this.subscribeDrag();
                }
            }
        });
    }
    /**
     * @hidden
     */
    unsubscribeDrag() {
        if (this.dragSubscription) {
            this.service.dragSubscription.unsubscribe();
            this.dragSubscription.unsubscribe();
            this.dragSubscription = null;
        }
    }
    /**
     * @hidden
     */
    unsubscribeState() {
        if (this.stateSubscription) {
            this.stateSubscription.unsubscribe();
            this.stateSubscription = null;
        }
    }
    get className() {
        return true;
    }
    get touchAction() {
        if (this.isDraggable) {
            return 'none';
        }
    }
    /**
     * @hidden
     */
    handle(ev) {
        const target = ev.target;
        const state$$1 = this.service.options.state;
        if (!hasClasses(target, 'k-icon') && !isFocusable(target, false) && this.service.options.resizable) {
            if (state$$1 === 'default') {
                this.service.maximizeAction();
            }
            else if (state$$1 === 'maximized') {
                this.service.restoreAction();
            }
        }
    }
    get isDraggable() {
        const options = this.service.options;
        return options.draggable && options.state !== 'maximized';
    }
}
WindowTitleBarComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-window-titlebar',
                template: `
    <ng-content *ngIf="!template"></ng-content>
    <ng-template
      [ngTemplateOutlet]="template"
      [ngTemplateOutletContext]="{'$implicit': service}" *ngIf="template">
    </ng-template>
  `
            },] },
];
/** @nocollapse */
WindowTitleBarComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: DragResizeService },
    { type: NgZone }
];
WindowTitleBarComponent.propDecorators = {
    template: [{ type: Input }],
    className: [{ type: HostBinding, args: ['class.k-window-titlebar',] }, { type: HostBinding, args: ['class.k-dialog-titlebar',] }],
    touchAction: [{ type: HostBinding, args: ['style.touch-action',] }],
    handle: [{ type: HostListener, args: ['dblclick', ['$event'],] }]
};

/**
 * @hidden
 */
class NavigationService {
    constructor(window) {
        this.window = window;
    }
    process(ev) {
        const key = ev.keyCode;
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
    }
    handleArrow(key, ev) {
        const options = this.window.options;
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
    }
    handleEscape() {
        this.window.closeAction();
    }
    handleDrag(key) {
        let options = this.window.options;
        if (!options.draggable) {
            return;
        }
        const offset$$1 = this.window.currentOffsetAndPosition();
        let restoreOptions = this.window.restoreOptions;
        let ev = {};
        let delta = 10;
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
    }
    handleResize(key) {
        const options = this.window.options;
        if (!options.resizable) {
            return;
        }
        const offset$$1 = this.window.currentOffsetAndPosition();
        let newWidth;
        let newHeight;
        let ev = {};
        let delta = 10;
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
            OFFSET_STYLES.forEach((style$$1) => {
                if (isPresent(ev[style$$1])) {
                    this.window.options[style$$1] = ev[style$$1];
                }
            });
            this.window.change.emit(ev);
        }
    }
    handleStateChange(key, state$$1) {
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
    }
}
NavigationService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
NavigationService.ctorParameters = () => [
    { type: DragResizeService }
];

/**
 * Represents the [Kendo UI Window component for Angular]({% slug overview_window_dialogs %}).
 */
class WindowComponent {
    constructor(el, renderer, service, navigation, ngZone, localization) {
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
            .subscribe(({ rtl }) => this.direction = rtl ? 'rtl' : 'ltr');
        this.resizeDirections = RESIZE_DIRECTIONS;
        this.subscribeEvents();
    }
    /**
     * Specifies whether the user will be able to drag the component.
     * @default true
     */
    set draggable(value) {
        this.options.draggable = value;
    }
    get draggable() {
        return this.options.draggable;
    }
    /**
     * Specifies whether the user will be able to resize the component.
     * @default true
     */
    set resizable(value) {
        this.options.resizable = value;
    }
    get resizable() {
        return this.options.resizable;
    }
    /**
     * Specifies the initial state of the component.
     * If not specified, the value is set to `default`.
     *
     * The possible values are:
     * * `minimized`
     * * `maximized`
     * * `default`
     */
    set state(value) {
        this.options.state = value;
    }
    get state() {
        return this.options.state;
    }
    /**
     * Specifies the minimum width of the component.
     * The `minWidth` property has to be set in pixels.
     * @default 120
     */
    set minWidth(value) {
        this.setOption('minWidth', value);
    }
    get minWidth() {
        return this.options.minWidth;
    }
    /**
     * Specifies the minimum height of the Window.
     * The `minHeight` property has to be set in pixels.
     * @default 100
     */
    set minHeight(value) {
        this.setOption('minHeight', value);
    }
    get minHeight() {
        return this.options.minHeight;
    }
    /**
     * Specifies the width of the Window.
     * The `width` property has to be set in pixels.
     */
    set width(value) {
        this.setOption('width', value);
    }
    get width() {
        return this.options.width;
    }
    /**
     * Specifies the height of the Window.
     * The `height` property has to be set in pixels.
     */
    set height(value) {
        this.setOption('height', value);
    }
    get height() {
        return this.options.height;
    }
    /**
     * Specifies the initial top offset of the Window.
     * The `top` property has to be set in pixels.
     */
    set top(value) {
        this.setOption('top', value);
    }
    get top() {
        return this.options.top;
    }
    /**
     * Specifies the initial left offset of the Window.
     * Numeric values are treated as pixels.
     */
    set left(value) {
        this.setOption('left', value);
    }
    get left() {
        return this.options.left;
    }
    get closeButtonTitle() {
        if (this.messages && this.messages.closeTitle) {
            return this.messages.closeTitle;
        }
        return this.localization.get('closeTitle');
    }
    get restoreButtonTitle() {
        if (this.messages && this.messages.restoreTitle) {
            return this.messages.restoreTitle;
        }
        return this.localization.get('restoreTitle');
    }
    get maximizeButtonTitle() {
        if (this.messages && this.messages.maximizeTitle) {
            return this.messages.maximizeTitle;
        }
        return this.localization.get('maximizeTitle');
    }
    get minimizeButtonTitle() {
        if (this.messages && this.messages.minimizeTitle) {
            return this.messages.minimizeTitle;
        }
        return this.localization.get('minimizeTitle');
    }
    get hostClasses() {
        return true;
    }
    get dir() {
        return this.direction;
    }
    ngAfterViewInit() {
        this.setNextZIndex();
        this.handleInitialFocus();
        this.ngZone.runOutsideAngular(() => Promise.resolve(null).then(() => this.setInitialOffset()));
    }
    ngOnInit() {
        this.renderer.removeAttribute(this.el.nativeElement, 'title');
        this.service.init(this.el);
    }
    ngOnChanges(changes) {
        OFFSET_STYLES.forEach((style$$1) => {
            if (isChanged(style$$1, changes)) {
                this.setStyle(style$$1, this.options[style$$1]);
            }
        });
        if (isChanged('draggable', changes)) {
            const titleBar = isPresent(this.titleBarContent) ? this.titleBarContent : this.titleBarView;
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
    }
    ngOnDestroy() {
        if (this.windowSubscription) {
            this.windowSubscription.unsubscribe();
        }
        this.localizationChangeSubscription.unsubscribe();
    }
    /**
     * Focuses the wrapper of the Window component.
     */
    focus() {
        const wrapper = this.el.nativeElement;
        if (isPresent(wrapper)) {
            wrapper.focus();
        }
    }
    /**
     * Brings the current Window component on top of other Window components on the page.
     */
    bringToFront() {
        this.setNextZIndex();
    }
    /**
     * Manually updates the `width` or `height` option of the Window.
     * The required style will be applied to the Window wrapper element and the
     * corresponding property of the component instance will be updated.
     * This method is intended to be used for sizing dynamically created components using the
     * [`WindowService`]({% slug api_dialog_windowservice %})
     * @param {WindowDimensionSetting} dimension - The option that will be updated
     * @param {number} value - The value set in pixels
     */
    setDimension(dimension, value) {
        this.setOption(dimension, value);
        this.setStyle(dimension, value);
    }
    /**
     * Manually updates the `top` or `left` offset of the Window.
     * The required style will be applied to the Window wrapper element and the
     * corresponding property of the component instance will be updated.
     * This method is intended to be used for positioning dynamically created components using the
     * [`WindowService`]({% slug api_dialog_windowservice %})
     * @param {WindowOffsetSetting} offset - The option that will be updated
     * @param {number} value - The value set in pixels
     */
    setOffset(offset$$1, value) {
        this.setOption(offset$$1, value);
        this.setStyle(offset$$1, value);
    }
    get showDefaultTitleBar() {
        return !isPresent(this.titleBarContent);
    }
    get styleMinWidth() {
        return this.minWidth + 'px';
    }
    get styleMinHeight() {
        return this.minHeight + 'px';
    }
    get stylePosition() {
        return this.options.position;
    }
    get wrapperMaximizedClass() {
        return this.state === 'maximized';
    }
    get wrapperMinimizedClass() {
        return this.state === 'minimized';
    }
    /**
     * @hidden
     */
    onComponentKeydown(event) {
        if (hasClasses(event.target, WINDOW_CLASSES)) {
            this.navigation.process(event);
        }
    }
    /**
     * @hidden
     */
    onComponentFocus() {
        this.renderer.addClass(this.el.nativeElement, 'k-state-focused');
        this.setNextZIndex();
    }
    /**
     * @hidden
     */
    onComponentBlur() {
        this.renderer.removeClass(this.el.nativeElement, 'k-state-focused');
    }
    subscribeEvents() {
        if (!isDocumentAvailable()) {
            return;
        }
        this.windowSubscription.add(this.service.focus.subscribe(() => {
            this.el.nativeElement.focus();
        }));
        this.windowSubscription.add(this.service.dragStart.subscribe(() => {
            this.draged = true;
            this.ngZone.run(() => {
                this.dragStart.emit();
            });
        }));
        this.windowSubscription.add(this.service.dragEnd.subscribe(() => {
            if (this.draged) {
                this.draged = false;
                this.ngZone.run(() => {
                    this.dragEnd.emit();
                });
            }
        }));
        this.windowSubscription.add(this.service.close.subscribe(() => {
            this.close.emit();
        }));
        this.windowSubscription.add(this.service.resizeStart.subscribe(() => {
            this.resized = true;
            this.ngZone.run(() => {
                this.resizeStart.emit();
            });
        }));
        this.windowSubscription.add(this.service.resizeEnd.subscribe(() => {
            if (this.resized) {
                this.resized = false;
                this.ngZone.run(() => {
                    this.resizeEnd.emit();
                });
            }
        }));
        this.windowSubscription.add(this.service.change.subscribe((ev) => {
            OFFSET_STYLES.forEach((style$$1) => {
                if (isPresent(ev[style$$1])) {
                    this.setStyle(style$$1, ev[style$$1]);
                    if (this.state !== 'maximized') {
                        const emitter = this[style$$1 + 'Change'];
                        if (emitter.observers.length) {
                            this.ngZone.run(() => {
                                emitter.emit(ev[style$$1]);
                            });
                        }
                    }
                }
            });
        }));
        this.windowSubscription.add(this.service.stateChange.subscribe((state$$1) => {
            if (isPresent(this.service.lastAction)) {
                this.updateAllOffset();
                this.stateChange.emit(state$$1);
            }
        }));
    }
    setNextZIndex() {
        const currentZIndex = this.el.nativeElement.style['z-index'];
        const nextPossibleZIndex = this.service.nextPossibleZIndex;
        if (!currentZIndex || (nextPossibleZIndex - currentZIndex > 1)) {
            this.renderer.setStyle(this.el.nativeElement, "z-index", this.service.nextZIndex);
        }
    }
    setInitialOffset() {
        if (this.state !== 'maximized') {
            this.updateAllOffset();
            if (!isPresent(this.left) || !isPresent(this.top)) {
                this.service.center();
            }
        }
        else {
            const viewPort = this.service.windowViewPort;
            this.setStyle('width', viewPort.width);
            this.setStyle('height', viewPort.height);
            this.setStyle('top', 0);
            this.setStyle('left', 0);
        }
    }
    updateAllOffset() {
        OFFSET_STYLES.forEach((style$$1) => {
            if (isPresent(this[style$$1])) {
                this.setStyle(style$$1, this[style$$1]);
            }
            else {
                this.removeStyle(style$$1);
            }
        });
    }
    setStyle(style$$1, value) {
        this.renderer.setStyle(this.el.nativeElement, style$$1, value + 'px');
    }
    removeStyle(style$$1) {
        this.renderer.removeStyle(this.el.nativeElement, style$$1);
    }
    get options() {
        return this.service.options;
    }
    setOption(style$$1, value) {
        if (typeof value !== 'number' && typeof value !== 'string') {
            return;
        }
        const parsedValue = (typeof value === 'number') ? value : parseInt(value, 10);
        this.options[style$$1] = parsedValue;
        this.service.setRestoreOption(style$$1, parsedValue);
    }
    handleInitialFocus() {
        const wrapper = this.el.nativeElement;
        if (this.autoFocusedElement) {
            const initiallyFocusedElement = wrapper.querySelector(this.autoFocusedElement);
            if (initiallyFocusedElement) {
                initiallyFocusedElement.focus();
            }
        }
        else {
            this.focus();
        }
    }
}
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
                template: `
        <ng-container kendoWindowLocalizedMessages
            i18n-closeTitle="kendo.window.closeTitle|The title of the close button"
            closeTitle="Close"

            i18n-restoreTitle="kendo.window.restoreTitle|The title of the restore button"
            restoreTitle="Restore"

            i18n-maximizeTitle="kendo.window.maximizeTitle|The title of the maximize button"
            maximizeTitle="Maximize"

            i18n-minimizeTitle="kendo.window.minimizeTitle|The title of the minimize button"
            minimizeTitle="Minimize"
        >
        <ng-container>

        <kendo-window-titlebar *ngIf="showDefaultTitleBar" [template]="titleBarTemplate">
            <div class="k-window-title">{{ title }}</div>
            <div class="k-window-actions">
                <button kendoWindowMinimizeAction  [attr.title]="minimizeButtonTitle" [attr.aria-label]="minimizeButtonTitle"></button>
                <button kendoWindowMaximizeAction [attr.title]="maximizeButtonTitle" [attr.aria-label]="maximizeButtonTitle"></button>
                <button kendoWindowRestoreAction [attr.title]="restoreButtonTitle" [attr.aria-label]="restoreButtonTitle"></button>
                <button kendoWindowCloseAction [attr.title]="closeButtonTitle" [attr.aria-label]="closeButtonTitle"></button>
            </div>
        </kendo-window-titlebar>
        <ng-content select="kendo-window-titlebar" *ngIf="!showDefaultTitleBar"></ng-content>

        <div *ngIf="state !== 'minimized' || keepContent"
            [hidden]="state === 'minimized' && keepContent"
            class="k-content k-window-content"
        >
            <ng-content *ngIf="!contentTemplate"></ng-content>
            <ng-template [ngTemplateOutlet]="contentTemplate" *ngIf="contentTemplate"></ng-template>
        </div>

        <ng-template [ngIf]='resizable'>
            <div *ngFor='let dir of resizeDirections'
                [direction]="dir"
                kendoWindowResizeHandle
                kendoDraggable>
            </div>
        </ng-template>
    `
            },] },
];
/** @nocollapse */
WindowComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: DragResizeService },
    { type: NavigationService },
    { type: NgZone },
    { type: LocalizationService }
];
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

class WindowMaximizeActionDirective extends Button {
    constructor(el, renderer, _service, localization, ngZone) {
        super(el, renderer, null, localization, ngZone);
        this.buttonType = 'button';
        this.window = _service;
        this.look = 'bare';
        this.icon = 'window-maximize';
    }
    /**
     * @hidden
     */
    onClick() {
        if (!this.isDisabled) {
            this.window.maximizeAction();
        }
    }
    get visible() {
        return this.window.options.state === 'default' ? 'inline-flex' : 'none';
    }
}
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
WindowMaximizeActionDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: DragResizeService, decorators: [{ type: Optional }] },
    { type: LocalizationService },
    { type: NgZone }
];
WindowMaximizeActionDirective.propDecorators = {
    window: [{ type: Input }],
    buttonType: [{ type: HostBinding, args: ['attr.type',] }],
    onClick: [{ type: HostListener, args: ['click',] }],
    visible: [{ type: HostBinding, args: ['style.display',] }]
};

class WindowMinimizeActionDirective extends Button {
    constructor(el, renderer, _service, localization, ngZone) {
        super(el, renderer, null, localization, ngZone);
        this.buttonType = 'button';
        this.window = _service;
        this.look = 'bare';
        this.icon = 'window-minimize';
    }
    /**
     * @hidden
     */
    onClick() {
        if (!this.isDisabled) {
            this.window.minimizeAction();
        }
    }
    get visible() {
        return this.window.options.state === 'default' ? 'inline-flex' : 'none';
    }
}
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
WindowMinimizeActionDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: DragResizeService, decorators: [{ type: Optional }] },
    { type: LocalizationService },
    { type: NgZone }
];
WindowMinimizeActionDirective.propDecorators = {
    window: [{ type: Input }],
    buttonType: [{ type: HostBinding, args: ['attr.type',] }],
    onClick: [{ type: HostListener, args: ['click',] }],
    visible: [{ type: HostBinding, args: ['style.display',] }]
};

class WindowCloseActionDirective extends Button {
    constructor(el, renderer, _service, localization, ngZone) {
        super(el, renderer, null, localization, ngZone);
        this.buttonType = 'button';
        this.window = _service;
        this.look = 'bare';
        this.icon = 'close';
    }
    /**
     * @hidden
     */
    onClick() {
        if (!this.isDisabled) {
            this.window.closeAction();
        }
    }
}
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
WindowCloseActionDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: DragResizeService, decorators: [{ type: Optional }] },
    { type: LocalizationService },
    { type: NgZone }
];
WindowCloseActionDirective.propDecorators = {
    window: [{ type: Input }],
    buttonType: [{ type: HostBinding, args: ['attr.type',] }],
    onClick: [{ type: HostListener, args: ['click',] }]
};

class WindowRestoreActionDirective extends Button {
    constructor(el, renderer, _service, localization, ngZone) {
        super(el, renderer, null, localization, ngZone);
        this.buttonType = 'button';
        this.window = _service;
        this.look = 'bare';
        this.icon = 'window-restore';
    }
    /**
     * @hidden
     */
    onClick() {
        if (!this.isDisabled) {
            this.window.restoreAction();
        }
    }
    get visible() {
        return this.window.options.state === 'default' ? 'none' : 'inline-flex';
    }
}
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
WindowRestoreActionDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: DragResizeService, decorators: [{ type: Optional }] },
    { type: LocalizationService },
    { type: NgZone }
];
WindowRestoreActionDirective.propDecorators = {
    window: [{ type: Input }],
    buttonType: [{ type: HostBinding, args: ['attr.type',] }],
    onClick: [{ type: HostListener, args: ['click',] }],
    visible: [{ type: HostBinding, args: ['style.display',] }]
};

/**
 * The settings for the Window actions when the Window is opened through `WindowService`
 * ([see example]({% slug api_dialog_windowservice %}#toc-open)).
 */
class WindowSettings {
}
/**
 * Indicates that the **Close** button of a Window that is opened through `WindowService` is clicked.
 */
class WindowCloseResult {
}
/**
 * Holds references to the object instance of the Window.
 * Controls the Windows that were opened through `WindowService`
 * ([see example]({% slug api_dialog_windowservice %}#toc-open)).
 */
class WindowRef {
}

/**
 * @hidden
 */
class WindowContainerService {
    set container(container) {
        WindowContainerService.container = container;
    }
    get container() {
        return WindowContainerService.container;
    }
}
WindowContainerService.container = null;
WindowContainerService.decorators = [
    { type: Injectable },
];

class WindowInjector {
    constructor(getWindowRef, parentInjector) {
        this.getWindowRef = getWindowRef;
        this.parentInjector = parentInjector;
    }
    get(token, notFoundValue) {
        if (token === WindowRef) {
            return this.getWindowRef();
        }
        return this.parentInjector.get(token, notFoundValue);
    }
}
/**
 * A service for opening Windows dynamically
 * ([see example]({% slug service_window %})).
 */
class WindowService {
    constructor(
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
    open(settings) {
        const factory = this.resolver.resolveComponentFactory(WindowComponent);
        const container = settings.appendTo || this.containerService.container;
        if (!container) {
            throw new Error(`Cannot attach window to the page.
                Add an element that uses the kendoWindowContainer directive, or set the 'appendTo' property.
                See https://www.telerik.com/kendo-angular-ui/components/dialogs/window/service/
            `);
        }
        const windowRef = {
            close: () => { },
            content: null,
            result: null,
            window: null
        };
        const content = this.contentFrom(settings.content, container, windowRef);
        const window = container.createComponent(factory, undefined, undefined, content.nodes);
        windowRef.window = window;
        this.applyOptions(window.instance, settings);
        const apiClose = new Subject();
        const close = (e) => {
            apiClose.next(e || new WindowCloseResult());
            if (content.componentRef) {
                content.componentRef.destroy();
            }
            window.destroy();
        };
        const result = merge(apiClose, window.instance.close).pipe(take(1));
        result.subscribe(close);
        windowRef.close = close;
        windowRef.result = result;
        window.changeDetectorRef.markForCheck();
        return windowRef;
    }
    applyOptions(instance, options) {
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
    }
    contentFrom(content, container, windowRef) {
        const renderer = container.injector.get(Renderer2);
        let nodes = [];
        let componentRef = null;
        if (typeof content === 'string') {
            nodes = [renderer.createText(content)];
        }
        else if (content && !(content instanceof TemplateRef)) {
            const injector = new WindowInjector(() => windowRef, container.injector);
            const factory = this.resolver.resolveComponentFactory(content);
            componentRef = container.createComponent(factory, undefined, injector);
            nodes = [componentRef.location.nativeElement];
            windowRef.content = componentRef;
        }
        return {
            componentRef,
            nodes: [
                [],
                nodes // Content
            ]
        };
    }
}
WindowService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
WindowService.ctorParameters = () => [
    { type: ComponentFactoryResolver },
    { type: WindowContainerService, decorators: [{ type: Inject, args: [WindowContainerService,] }] }
];

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
class DialogContainerDirective {
    constructor(container, service) {
        service.container = container;
    }
}
DialogContainerDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoDialogContainer]'
            },] },
];
/** @nocollapse */
DialogContainerDirective.ctorParameters = () => [
    { type: ViewContainerRef },
    { type: DialogContainerService }
];

/**
 * @hidden
 */
class Messages extends ComponentMessages {
}
Messages.propDecorators = {
    closeTitle: [{ type: Input }],
    restoreTitle: [{ type: Input }],
    maximizeTitle: [{ type: Input }],
    minimizeTitle: [{ type: Input }]
};

/**
 * @hidden
 */
class LocalizedMessagesDirective extends Messages {
    constructor(service) {
        super();
        this.service = service;
    }
}
LocalizedMessagesDirective.decorators = [
    { type: Directive, args: [{
                providers: [
                    {
                        provide: Messages,
                        useExisting: forwardRef(() => LocalizedMessagesDirective)
                    }
                ],
                selector: `
    [kendoDialogLocalizedMessages],
    [kendoWindowLocalizedMessages]
  `
            },] },
];
/** @nocollapse */
LocalizedMessagesDirective.ctorParameters = () => [
    { type: LocalizationService }
];

/**
 * Custom component messages override default component messages
 * ([see example]({% slug globalization_dialogs %}#toc-localization)).
 */
class CustomMessagesComponent extends Messages {
    constructor(service) {
        super();
        this.service = service;
    }
    get override() {
        return true;
    }
}
CustomMessagesComponent.decorators = [
    { type: Component, args: [{
                providers: [
                    {
                        provide: Messages,
                        useExisting: forwardRef(() => CustomMessagesComponent) // tslint:disable-line:no-forward-ref
                    }
                ],
                selector: 'kendo-dialog-messages, kendo-window-messages',
                template: ``
            },] },
];
/** @nocollapse */
CustomMessagesComponent.ctorParameters = () => [
    { type: LocalizationService }
];

/**
 * @hidden
 */
const SHARED_DIRECTIVES = [
    DialogActionsComponent,
    CustomMessagesComponent,
    LocalizedMessagesDirective
];
/**
 * @hidden
 */
class SharedModule {
}
SharedModule.decorators = [
    { type: NgModule, args: [{
                declarations: [SHARED_DIRECTIVES],
                exports: [SHARED_DIRECTIVES, CommonModule],
                imports: [CommonModule]
            },] },
];

/**
 * @hidden
 */
const DIALOG_DIRECTIVES = [
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
class DialogModule {
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
class WindowContainerDirective {
    constructor(container, service) {
        service.container = container;
    }
}
WindowContainerDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoWindowContainer]'
            },] },
];
/** @nocollapse */
WindowContainerDirective.ctorParameters = () => [
    { type: ViewContainerRef },
    { type: WindowContainerService }
];

const WINDOW_DIRECTIVES = [
    ResizeHandleDirective,
    WindowComponent,
    WindowTitleBarComponent,
    WindowCloseActionDirective,
    WindowMinimizeActionDirective,
    WindowMaximizeActionDirective,
    WindowRestoreActionDirective
];
const ENTRY_COMPONENTS = [
    WindowComponent,
    WindowTitleBarComponent
];
const exportedModules = [
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
class WindowModule {
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
class DialogsModule {
}
DialogsModule.decorators = [
    { type: NgModule, args: [{
                exports: [DialogModule, WindowModule]
            },] },
];

/**
 * Generated bundle index. Do not edit.
 */

export { DIALOG_DIRECTIVES, DialogContainerDirective, DialogContainerService, CustomMessagesComponent, DIALOG_LOCALIZATION_SERVICE, LocalizedMessagesDirective, Messages, SHARED_DIRECTIVES, SharedModule, DragResizeService, NavigationService, WindowContainerDirective, WindowContainerService, ResizeHandleDirective, DialogComponent, DialogTitleBarComponent, DialogContentBase, DialogActionsComponent, DialogService, DialogCloseResult, DialogRef, DialogSettings, DialogAction, WindowComponent, WindowTitleBarComponent, WindowMaximizeActionDirective, WindowMinimizeActionDirective, WindowCloseActionDirective, WindowRestoreActionDirective, WindowSettings, WindowRef, WindowCloseResult, WindowService, DialogModule, WindowModule, DialogsModule };
