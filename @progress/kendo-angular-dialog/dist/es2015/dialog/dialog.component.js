/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, ContentChild, EventEmitter, HostBinding, Input, ViewChild, Output, ElementRef, Renderer2, HostListener, ChangeDetectorRef } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { DialogActionsComponent } from './dialog-actions.component';
import { DialogTitleBarComponent } from './dialog-titlebar.component';
import { LocalizationService, L10N_PREFIX } from '@progress/kendo-angular-l10n';
import { hasClasses, Keys, isPresent, focusableSelector, isFocusable, DIALOG_ELEMENTS_HANDLING_ARROWS, DIALOG_ELEMENTS_HANDLING_ESC_KEY, createValueWithUnit } from '../common/util';
import { DialogCloseResult } from './dialog-settings';
import { DIALOG_LOCALIZATION_SERVICE } from './../localization/dialog-localization.service';
/**
 * Represents the [Kendo UI Dialog component for Angular]({% slug overview_dialog_dialogs %}).
 */
export class DialogComponent {
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
