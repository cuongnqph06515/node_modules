/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, ContentChildren, ElementRef, EventEmitter, HostBinding, Input, Output, QueryList, ViewChild, ViewChildren, Renderer2 } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { LocalizationService, L10N_PREFIX } from '@progress/kendo-angular-l10n';
import { TabStripTabComponent } from './tabstrip-tab.component';
import { Keys } from '@progress/kendo-angular-common';
import { SelectEvent } from './tabstrip-events';
import { isFocusable } from '../common/dom-queries';
/**
 * Represents the [Kendo UI TabStrip component for Angular]({% slug overview_tabstrip %}).
 */
export class TabStripComponent {
    constructor(localization, renderer, wrapper) {
        this.localization = localization;
        this.renderer = renderer;
        this.wrapper = wrapper;
        /**
         * Enables the tab animation.
         */
        this.animate = true;
        /**
         * Sets the position of the tabs. Defaults to `top`.
         */
        this.tabPosition = 'top';
        /**
         * When set to `true`, the component renders all tabs and they are persisted in the DOM.
         * By default, `keepTabContent` is `false`.
         */
        this.keepTabContent = false;
        /**
         * Fires each time the user selects a tab ([see example]({% slug overview_tabstrip %}#toc-basic-usage)).
         * The event data contains the index of the selected tab and its title.
         */
        this.tabSelect = new EventEmitter();
        this.hostClasses = true;
        /**
         * @hidden
         */
        this._animate = false;
        this.keyBindings = this.computedKeys;
    }
    /**
     * Sets the height of the TabStrip.
     */
    set height(value) {
        this._height = value;
        this.renderer.setStyle(this.wrapper.nativeElement, 'height', value);
    }
    get height() {
        return this._height;
    }
    get tabsAtTop() {
        return this.tabPosition === 'top';
    }
    get tabsAtRight() {
        return this.tabPosition === 'right';
    }
    get tabsAtBottom() {
        return this.tabPosition === 'bottom';
    }
    get tabsAtLeft() {
        return this.tabPosition === 'left';
    }
    get dir() {
        return this.localization.rtl ? 'rtl' : 'ltr';
    }
    /**
     * @hidden
     */
    contentClass(active) {
        const visible = !this.keepTabContent || active;
        return visible ? 'k-content k-state-active' : 'k-content';
    }
    get computedKeys() {
        return {
            [this.invertKeys(Keys.ArrowLeft, Keys.ArrowRight)]: (selectedIndex) => this.prevNavigatableIndex(selectedIndex),
            [this.invertKeys(Keys.ArrowRight, Keys.ArrowLeft)]: (selectedIndex) => this.nextNavigatableIndex(selectedIndex),
            [this.invertKeys(Keys.ArrowDown, Keys.ArrowUp)]: (selectedIndex) => this.nextNavigatableIndex(selectedIndex),
            [this.invertKeys(Keys.ArrowUp, Keys.ArrowDown)]: (selectedIndex) => this.prevNavigatableIndex(selectedIndex),
            [Keys.Home]: () => this.firstNavigatableIndex(),
            [Keys.End]: () => this.lastNavigatableIndex()
        };
    }
    /**
     * @hidden
     */
    get tabsAlignment() {
        return {
            start: 'flex-start',
            end: 'flex-end',
            center: 'center',
            justify: 'space-between'
        }[this.tabAlignment];
    }
    /**
     * @hidden
     */
    invertKeys(original, inverted) {
        return this.localization.rtl ? inverted : original;
    }
    /**
     * @hidden
     */
    onKeyDown(event) {
        if (event.currentTarget !== this.tablist.nativeElement) {
            return;
        }
        const isHorizontal = this.tabPosition === 'top' || this.tabPosition === 'bottom';
        const isArrowUp = event.keyCode === Keys.ArrowUp;
        const isArrowDown = event.keyCode === Keys.ArrowDown;
        const isArrowLeft = event.keyCode === Keys.ArrowLeft;
        const isArrowRight = event.keyCode === Keys.ArrowRight;
        if (isHorizontal && (isArrowUp || isArrowDown)) {
            return;
        }
        if (!isHorizontal && (isArrowLeft || isArrowRight)) {
            return;
        }
        if (event.keyCode === Keys.Space || isArrowUp || isArrowDown || isArrowLeft || isArrowRight || event.keyCode === Keys.Home ||
            event.keyCode === Keys.End || event.keyCode === Keys.PageUp || event.keyCode === Keys.PageDown) {
            event.preventDefault();
        }
        const selectedIndex = this.tabs.toArray().findIndex(tab => tab.active && !tab.disabled);
        if (selectedIndex === -1) {
            this.selectTab(this.firstNavigatableIndex());
        }
        else {
            const getTabIndex = this.keyBindings[event.keyCode];
            if (getTabIndex) {
                const nextIndex = getTabIndex(selectedIndex);
                if (selectedIndex !== nextIndex) {
                    this.selectTab(getTabIndex(selectedIndex));
                }
            }
        }
    }
    /**
     * @hidden
     */
    tabPanelId(id) {
        return 'k-tabstrip-tabpanel-' + id;
    }
    /**
     * @hidden
     */
    tabId(id) {
        return 'k-tabstrip-tab-' + id;
    }
    /**
     * Allows the user to select a tab programmatically.
     * @param {number} index - The index of the tab that will be selected.
     */
    selectTab(index) {
        const tab = this.tabs.toArray()[index];
        if (!tab || Boolean(tab.disabled)) {
            return;
        }
        this.tabHeadingContainers.toArray()[index].nativeElement.focus();
        this.emitEvent(tab, index);
    }
    /**
     * @hidden
     */
    onTabClick(originalEvent, tabIndex) {
        if (isFocusable(originalEvent.target)) {
            return;
        }
        this.selectTab(tabIndex);
    }
    ngOnInit() {
        this.localizationChangeSubscription = this.localization
            .changes.subscribe(() => this.keyBindings = this.computedKeys);
    }
    ngOnDestroy() {
        if (this.localizationChangeSubscription) {
            this.localizationChangeSubscription.unsubscribe();
        }
    }
    firstNavigatableIndex() {
        const tabs = this.tabs.toArray();
        for (let i = 0; i < tabs.length; i++) {
            if (!tabs[i].disabled) {
                return i;
            }
        }
    }
    lastNavigatableIndex() {
        const tabs = this.tabs.toArray();
        for (let i = tabs.length - 1; i > 0; i--) {
            if (!tabs[i].disabled) {
                return i;
            }
        }
    }
    prevNavigatableIndex(selectedIndex) {
        if (selectedIndex - 1 < 0) {
            return this.lastNavigatableIndex();
        }
        const tabs = this.tabs.toArray();
        for (let i = selectedIndex - 1; i > -1; i--) {
            if (!tabs[i].disabled) {
                return i;
            }
            if (i === 0) {
                return this.lastNavigatableIndex();
            }
        }
        return selectedIndex;
    }
    nextNavigatableIndex(selectedIndex) {
        if (selectedIndex + 1 >= this.tabs.length) {
            return this.firstNavigatableIndex();
        }
        const tabs = this.tabs.toArray();
        for (let i = selectedIndex + 1; i < tabs.length; i++) {
            if (!tabs[i].disabled) {
                return i;
            }
            if (i + 1 === tabs.length) {
                return this.firstNavigatableIndex();
            }
        }
    }
    emitEvent(tab, selectedIndex) {
        const selectArgs = new SelectEvent(selectedIndex, tab.title);
        this.tabSelect.emit(selectArgs);
        if (!selectArgs.isDefaultPrevented() && !tab.active) {
            this._animate = this.animate;
            this.deactivateAll();
            tab.active = true;
        }
    }
    deactivateAll() {
        this.tabs.forEach((tab) => {
            tab.active = false;
        });
    }
}
TabStripComponent.decorators = [
    { type: Component, args: [{
                animations: [
                    trigger('state', [
                        state('active', style({ opacity: 1 })),
                        transition('* => active', [
                            style({ opacity: 0 }),
                            animate('400ms ease-in')
                        ])
                    ])
                ],
                providers: [
                    LocalizationService,
                    {
                        provide: L10N_PREFIX,
                        useValue: 'kendo.tabstrip'
                    }
                ],
                exportAs: 'kendoTabStrip',
                selector: 'kendo-tabstrip',
                template: `
        <ng-container *ngIf="!tabsAtBottom">
            <ng-container *ngTemplateOutlet="heading">
            </ng-container>
            <ng-container *ngTemplateOutlet="content">
            </ng-container>
        </ng-container>

        <ng-container *ngIf="tabsAtBottom">
            <ng-container *ngTemplateOutlet="content">
            </ng-container>
            <ng-container *ngTemplateOutlet="heading">
            </ng-container>
        </ng-container>

        <ng-template #heading>
            <ul
                class="k-reset k-tabstrip-items"
                [style.justifyContent]="tabsAlignment"
                role="tablist"
                (keydown)="onKeyDown($event)"
                #tablist
            >
                <li *ngFor="let tab of tabs; let i = index;" (click)="onTabClick($event, i)"
                    #tabHeadingContainer
                    role="tab"
                    [id]="tabId(i)"
                    [tabIndex]="tab.active ? 0 : -1"
                    [ngClass]="tab.cssClass"
                    [class.k-item]="true"
                    [class.k-state-default]="true"
                    [class.k-state-active]="tab.active"
                    [class.k-state-disabled]="tab.disabled"
                    [attr.aria-selected]="tab.active"
                    [attr.aria-controls]="tabPanelId(i)"
                    [attr.aria-disabled]="tab.disabled"
                ><span class="k-link">{{ tab.title }}<ng-template [ngTemplateOutlet]="tab.tabTitle?.templateRef"></ng-template></span></li>
            </ul>
        </ng-template>
        <ng-template #content>
            <ng-template ngFor let-tab [ngForOf]="tabs" let-i="index">
                <div
                    [@state]="tab.active && _animate ? 'active' : 'inactive'"
                    *ngIf="tab.active || keepTabContent"
                    [ngClass]="contentClass(tab.active)"
                    [tabIndex]="0"
                    role="tabpanel"
                    [id]="tabPanelId(i)"
                    [attr.aria-hidden]="!tab.active"
                    [attr.aria-expanded]="tab.active"
                    [attr.aria-labelledby]="tabId(i)"
                    [attr.aria-disabled]="tab.disabled"
                >
                    <ng-template [ngTemplateOutlet]="tab.tabContent?.templateRef"></ng-template>
                </div>
            </ng-template>
        </ng-template>
    `
            },] },
];
/** @nocollapse */
TabStripComponent.ctorParameters = () => [
    { type: LocalizationService },
    { type: Renderer2 },
    { type: ElementRef }
];
TabStripComponent.propDecorators = {
    height: [{ type: Input }],
    animate: [{ type: Input }],
    tabAlignment: [{ type: Input }],
    tabPosition: [{ type: Input }],
    keepTabContent: [{ type: Input }],
    tablist: [{ type: ViewChild, args: ['tablist',] }],
    tabSelect: [{ type: Output }],
    hostClasses: [{ type: HostBinding, args: ['class.k-widget',] }, { type: HostBinding, args: ['class.k-tabstrip',] }, { type: HostBinding, args: ['class.k-floatwrap',] }, { type: HostBinding, args: ['class.k-header',] }],
    tabsAtTop: [{ type: HostBinding, args: ['class.k-tabstrip-top',] }],
    tabsAtRight: [{ type: HostBinding, args: ['class.k-tabstrip-right',] }],
    tabsAtBottom: [{ type: HostBinding, args: ['class.k-tabstrip-bottom',] }],
    tabsAtLeft: [{ type: HostBinding, args: ['class.k-tabstrip-left',] }],
    dir: [{ type: HostBinding, args: ['attr.dir',] }],
    tabs: [{ type: ContentChildren, args: [TabStripTabComponent,] }],
    tabHeadingContainers: [{ type: ViewChildren, args: ['tabHeadingContainer',] }]
};
