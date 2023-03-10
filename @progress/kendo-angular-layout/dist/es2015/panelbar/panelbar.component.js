/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, ContentChild, ContentChildren, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output, QueryList, ViewChildren, isDevMode } from '@angular/core';
import { LocalizationService, L10N_PREFIX } from '@progress/kendo-angular-l10n';
import { Keys } from '@progress/kendo-angular-common';
import { PanelBarExpandMode } from './panelbar-expand-mode';
import { PanelBarItemComponent } from './panelbar-item.component';
import { PanelBarService } from "./panelbar.service";
import { PanelBarItemTemplateDirective } from "./panelbar-item-template.directive";
import util from "../common/util";
/**
 * Represents the [Kendo UI PanelBar component for Angular]({% slug overview_panelbar %}).
 */
// TODO: add styles as input prop
export class PanelBarComponent {
    constructor(elementRef, eventService, localization) {
        this.localization = localization;
        /**
         * Sets the expand mode of the PanelBar through the `PanelBarExpandMode` enum ([see example]({% slug expandmodes_panelbar %})).
         *
         * The available modes are:
         * - `"single"`&mdash;Expands only one item at a time. Expanding an item collapses the item that was previously expanded.
         * - `"multiple"`&mdash;The default mode of the PanelBar.
         * Expands more than one item at a time. Items can also be toggled.
         * - `"full"`&mdash;Expands only one item at a time.
         * The expanded area occupies the entire height of the PanelBar. Requires you to set the `height` property.
         */
        this.expandMode = PanelBarExpandMode.Default;
        /**
         * Allows the PanelBar to modify the selected state of the items.
         */
        this.selectable = true;
        /**
         * Sets the animate state of the PanelBar ([see example]({% slug animations_panelbar %})).
         */
        this.animate = true;
        /**
         * Sets the height of the component when the `"full"` expand mode is used.
         * This option is ignored in the `"multiple"` and `"single"` expand modes.
         */
        this.height = "400px";
        /**
         * Fires each time the user interacts with a PanelBar item
         * ([see example]({% slug routing_panelbar %}#toc-getting-the-selected-item)).
         * The event data contains all items that are modified.
         */
        this.stateChange = new EventEmitter();
        this.tabIndex = 0;
        this.role = "tree";
        this.activeDescendant = "";
        this.isViewInit = true;
        this.focused = false;
        this._keepItemContent = false;
        this.updateChildrenHeight = () => {
            let childrenHeight = 0;
            const panelbarHeight = this.elementRef.nativeElement.offsetHeight;
            const contentOverflow = this.expandMode === PanelBarExpandMode.Full ? 'auto' : 'visible';
            this.childrenItems.forEach(item => {
                childrenHeight += item.headerHeight();
            });
            this.childrenItems.forEach(item => {
                item.contentHeight = PanelBarExpandMode.Full === this.expandMode ? (panelbarHeight - childrenHeight) + "px" : 'auto';
                item.contentOverflow = contentOverflow;
            });
        };
        this.keyBindings = this.computedKeys;
        this.elementRef = elementRef;
        this.eventService = eventService;
        this.eventService.children$.subscribe(event => this.onItemAction(event));
    }
    /**
     * When set to `true`, the PanelBar renders the content of all items and they are persisted in the DOM
     * ([see example]({% slug templates_panelbar %}#toc-collections)).
     * By default, this option is set to `false`.
     */
    get keepItemContent() {
        return this._keepItemContent;
    }
    set keepItemContent(keepItemContent) {
        this._keepItemContent = keepItemContent;
        this.eventService.onKeepContent(keepItemContent);
    }
    /**
     * Sets the items of the PanelBar as an array of `PanelBarItemModel` instances
     * ([see example]({% slug items_panelbar %})).
     */
    set items(data) {
        if (data) {
            this._items = util.parsePanelBarItems(data);
        }
    }
    get items() {
        return this._items;
    }
    get hostHeight() {
        return this.expandMode === PanelBarExpandMode.Full ? this.height : 'auto';
    }
    get overflow() {
        return this.expandMode === PanelBarExpandMode.Full ? "hidden" : "visible";
    }
    get dir() {
        return this.localization.rtl ? 'rtl' : 'ltr';
    }
    /**
     * @hidden
     */
    invertKeys(original, inverted) {
        return this.localization.rtl ? inverted : original;
    }
    get computedKeys() {
        return {
            [Keys.Space]: () => this.selectFocusedItem(),
            [Keys.Enter]: () => this.selectFocusedItem(),
            [Keys.ArrowUp]: () => this.focusPreviousItem(),
            [this.invertKeys(Keys.ArrowLeft, Keys.ArrowRight)]: () => this.collapseItem(),
            [Keys.ArrowDown]: () => this.focusNextItem(),
            [this.invertKeys(Keys.ArrowRight, Keys.ArrowLeft)]: () => this.expandItem(),
            [Keys.End]: () => this.focusLastItem(),
            [Keys.Home]: () => this.focusFirstItem()
        };
    }
    ngOnDestroy() {
        if (this.localizationChangeSubscription) {
            this.localizationChangeSubscription.unsubscribe();
        }
    }
    ngOnInit() {
        this.localizationChangeSubscription = this.localization
            .changes.subscribe(() => this.keyBindings = this.computedKeys);
        this.eventService.animate = this.animate;
        this.eventService.expandMode = this.expandMode;
    }
    ngAfterViewChecked() {
        if (this.items) {
            this.childrenItems = this.viewChildItems.toArray();
            this.allItems = this.viewItems;
        }
        else {
            this.childrenItems = this.contentChildItems.toArray();
            this.allItems = this.contentItems.toArray();
        }
        if (this.isViewInit && this.childrenItems.length) {
            this.isViewInit = false;
            setTimeout(() => this.updateChildrenHeight());
        }
        this.validateConfiguration();
    }
    ngOnChanges(changes) {
        if (changes['height'] || changes['expandMode'] || changes["items"]) { // tslint:disable-line
            if (this.childrenItems) {
                setTimeout(this.updateChildrenHeight);
            }
        }
        if (changes.animate) {
            this.eventService.animate = this.animate;
        }
        if (changes.expandMode) {
            this.eventService.expandMode = this.expandMode;
        }
    }
    get templateRef() {
        return this.template ? this.template.templateRef : undefined;
    }
    /**
     * @hidden
     */
    onComponentClick(event) {
        const itemClicked = this.visibleItems().some((item) => {
            return item.header.nativeElement.contains(event.target);
        });
        if (!this.focused && itemClicked) {
            this.elementRef.nativeElement.focus();
        }
    }
    /**
     * @hidden
     */
    onComponentFocus() {
        this.eventService.onFocus();
        this.focused = true;
        if (this.allItems.length > 0) {
            const visibleItems = this.visibleItems();
            const focusedItems = visibleItems.filter(item => item.focused);
            if (!focusedItems.length && visibleItems.length > 0) {
                visibleItems[0].focused = true;
                this.activeDescendant = visibleItems[0].itemId;
            }
        }
    }
    /**
     * @hidden
     */
    onComponentBlur() {
        this.eventService.onBlur();
        this.focused = false;
        this.activeDescendant = "";
    }
    /**
     * @hidden
     */
    onComponentKeyDown(event) {
        if (event.target === this.elementRef.nativeElement) {
            if (event.keyCode === Keys.Space || event.keyCode === Keys.ArrowUp || event.keyCode === Keys.ArrowDown ||
                event.keyCode === Keys.ArrowLeft || event.keyCode === Keys.ArrowRight || event.keyCode === Keys.Home ||
                event.keyCode === Keys.End || event.keyCode === Keys.PageUp || event.keyCode === Keys.PageDown) {
                event.preventDefault();
            }
            const handler = this.keyBindings[event.keyCode];
            //TODO: check if next item is disabled and skip operation?
            if (handler) {
                handler();
            }
        }
    }
    get viewItems() {
        let treeItems = [];
        this.viewChildItems.toArray().forEach(item => {
            treeItems.push(item);
            treeItems = treeItems.concat(item.subTreeViewItems());
        });
        return treeItems;
    }
    validateConfiguration() {
        if (isDevMode()) {
            if (this.items && (this.contentItems && this.contentItems.length > 0)) {
                throw new Error("Invalid configuration: mixed template components and items property.");
            }
        }
    }
    onItemAction(item) {
        if (!item) {
            return;
        }
        let modifiedItems = new Array();
        this.allItems
            .forEach((currentItem) => {
            let selectedState = currentItem === item;
            let focusedState = selectedState;
            selectedState = this.selectable ? selectedState : currentItem.selected;
            if (currentItem.selected !== selectedState || currentItem.focused !== focusedState) {
                currentItem.selected = selectedState;
                currentItem.focused = focusedState;
                this.activeDescendant = focusedState ? currentItem.itemId : "";
                modifiedItems.push(currentItem);
            }
        });
        if (this.expandMode === PanelBarExpandMode.Multiple) {
            if (item.hasChildItems || item.hasContent) {
                item.expanded = !item.expanded;
            }
            if (modifiedItems.indexOf(item) < 0) {
                modifiedItems.push(item);
            }
        }
        else {
            let siblings = item.parent ? item.parent.childrenItems : this.childrenItems;
            if (item.hasChildItems || item.hasContent) {
                siblings
                    .forEach((currentItem) => {
                    let expandedState = currentItem === item;
                    if (currentItem.expanded !== expandedState) {
                        currentItem.expanded = expandedState;
                        if (modifiedItems.indexOf(currentItem) < 0) {
                            modifiedItems.push(currentItem);
                        }
                    }
                });
            }
        }
        if (modifiedItems.length > 0) {
            this.stateChange.emit(modifiedItems.map(currentItem => currentItem.serialize()));
        }
    }
    get hostClasses() {
        return true;
    }
    isVisible(item) {
        const visibleItems = this.visibleItems();
        return visibleItems.some(i => i === item);
    }
    getVisibleParent(item) {
        const visibleItems = this.visibleItems();
        if (!item.parent) {
            return item;
        }
        return visibleItems.some(i => i === item.parent) ? item.parent : this.getVisibleParent(item.parent);
    }
    focusItem(action) {
        const visibleItems = this.visibleItems();
        let currentIndex = visibleItems.findIndex(item => item.focused);
        let currentItem = visibleItems[currentIndex];
        let nextItem;
        if (currentIndex === -1) {
            let focusedItem = this.allItems.find(item => item.focused);
            focusedItem.focused = false;
            currentItem = this.getVisibleParent(focusedItem);
            currentIndex = visibleItems.findIndex(item => item === currentItem);
        }
        switch (action) {
            case "lastItem":
                nextItem = visibleItems[visibleItems.length - 1];
                break;
            case "firstItem":
                nextItem = visibleItems[0];
                break;
            case "nextItem":
                nextItem = visibleItems[currentIndex < visibleItems.length - 1 ? currentIndex + 1 : 0];
                break;
            case "previousItem":
                nextItem = visibleItems[currentIndex > 0 ? currentIndex - 1 : visibleItems.length - 1];
                break;
            default:
        }
        if (currentItem && nextItem && currentItem !== nextItem) {
            this.moveFocus(currentItem, nextItem);
        }
    }
    moveFocus(from, to) {
        from.focused = false;
        to.focused = true;
        this.activeDescendant = to.itemId;
        const modifiedItems = new Array(from.serialize(), to.serialize());
        this.stateChange.emit(modifiedItems);
    }
    focusLastItem() {
        this.focusItem("lastItem");
    }
    focusFirstItem() {
        this.focusItem("firstItem");
    }
    focusNextItem() {
        this.focusItem("nextItem");
    }
    focusPreviousItem() {
        this.focusItem("previousItem");
    }
    expandItem() {
        let currentItem = this.allItems.filter(item => item.focused)[0];
        if (!this.isVisible(currentItem)) {
            currentItem.focused = false;
            currentItem = this.getVisibleParent(currentItem);
        }
        if (currentItem.hasChildItems || currentItem.hasContent) {
            if (!currentItem.expanded) {
                this.onItemAction(currentItem);
            }
            else if (currentItem.hasChildItems) {
                const firstChildIndex = currentItem.childrenItems.findIndex(item => !item.disabled);
                if (firstChildIndex > -1) {
                    this.moveFocus(currentItem, currentItem.childrenItems[firstChildIndex]);
                }
            }
        }
    }
    collapseItem() {
        const currentItem = this.allItems.filter(item => item.focused)[0];
        if (currentItem.expanded) {
            this.onItemAction(currentItem);
        }
        else if (currentItem.parent) {
            this.moveFocus(currentItem, currentItem.parent);
        }
    }
    selectFocusedItem() {
        let focusedItem = this.allItems.filter(item => item.focused)[0];
        if (!this.isVisible(focusedItem)) {
            focusedItem.focused = false;
            focusedItem = this.getVisibleParent(focusedItem);
        }
        if (focusedItem) {
            focusedItem.onItemAction();
        }
    }
    visibleItems() {
        return this.flatVisibleItems(this.childrenItems);
    }
    flatVisibleItems(listOfItems = new Array(), flattedItems = new Array()) {
        listOfItems.forEach(item => {
            if (!item.disabled) {
                flattedItems.push(item);
                if (item.expanded && item.hasChildItems) {
                    this.flatVisibleItems(item.childrenItems, flattedItems);
                }
            }
        });
        return flattedItems;
    }
}
PanelBarComponent.decorators = [
    { type: Component, args: [{
                exportAs: 'kendoPanelbar',
                providers: [
                    PanelBarService,
                    LocalizationService,
                    {
                        provide: L10N_PREFIX,
                        useValue: 'kendo.panelbar'
                    }
                ],
                selector: 'kendo-panelbar',
                template: `
        <ng-content *ngIf="contentChildItems && !items" select="kendo-panelbar-item"></ng-content>
        <ng-template [ngIf]="items?.length">
            <ng-container *ngFor="let item of items">
                <kendo-panelbar-item *ngIf="!item.hidden"
                     [title]="item.title"
                     [id]="item.id"
                     [icon]="item.icon"
                     [iconClass]="item.iconClass"
                     [imageUrl]="item.imageUrl"
                     [selected]="!!item.selected"
                     [expanded]="!!item.expanded"
                     [disabled]="!!item.disabled"
                     [template]="templateRef"
                     [items]="item.children"
                     [content]="item.content"
                >
                </kendo-panelbar-item>
            </ng-container>
        </ng-template>
    `
            },] },
];
/** @nocollapse */
PanelBarComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: PanelBarService },
    { type: LocalizationService }
];
PanelBarComponent.propDecorators = {
    expandMode: [{ type: Input }],
    selectable: [{ type: Input }],
    animate: [{ type: Input }],
    height: [{ type: Input }],
    keepItemContent: [{ type: Input }],
    items: [{ type: Input }],
    stateChange: [{ type: Output }],
    tabIndex: [{ type: HostBinding, args: ['attr.tabIndex',] }],
    role: [{ type: HostBinding, args: ['attr.role',] }],
    activeDescendant: [{ type: HostBinding, args: ['attr.aria-activedescendant',] }],
    hostHeight: [{ type: HostBinding, args: ['style.height',] }],
    overflow: [{ type: HostBinding, args: ['style.overflow',] }],
    dir: [{ type: HostBinding, args: ['attr.dir',] }],
    template: [{ type: ContentChild, args: [PanelBarItemTemplateDirective,] }],
    contentItems: [{ type: ContentChildren, args: [PanelBarItemComponent, { descendants: true },] }],
    contentChildItems: [{ type: ContentChildren, args: [PanelBarItemComponent,] }],
    viewChildItems: [{ type: ViewChildren, args: [PanelBarItemComponent,] }],
    onComponentClick: [{ type: HostListener, args: ['click', ['$event'],] }],
    onComponentFocus: [{ type: HostListener, args: ['focus',] }],
    onComponentBlur: [{ type: HostListener, args: ['blur',] }],
    onComponentKeyDown: [{ type: HostListener, args: ['keydown', ['$event'],] }],
    hostClasses: [{ type: HostBinding, args: ['class.k-widget',] }, { type: HostBinding, args: ['class.k-panelbar',] }]
};
