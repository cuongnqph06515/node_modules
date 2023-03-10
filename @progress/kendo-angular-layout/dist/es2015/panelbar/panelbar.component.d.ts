/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { AfterViewChecked, ElementRef, EventEmitter, OnChanges, QueryList, SimpleChange, TemplateRef, OnInit, OnDestroy } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { PanelBarExpandMode } from './panelbar-expand-mode';
import { PanelBarItemComponent } from './panelbar-item.component';
import { PanelBarItemModel } from './panelbar-item-model';
import { PanelBarService } from "./panelbar.service";
import { PanelBarItemTemplateDirective } from "./panelbar-item-template.directive";
/**
 * Represents the [Kendo UI PanelBar component for Angular]({% slug overview_panelbar %}).
 */
export declare class PanelBarComponent implements AfterViewChecked, OnChanges, OnInit, OnDestroy {
    private localization;
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
    expandMode: PanelBarExpandMode;
    /**
     * Allows the PanelBar to modify the selected state of the items.
     */
    selectable: boolean;
    /**
     * Sets the animate state of the PanelBar ([see example]({% slug animations_panelbar %})).
     */
    animate: boolean;
    /**
     * Sets the height of the component when the `"full"` expand mode is used.
     * This option is ignored in the `"multiple"` and `"single"` expand modes.
     */
    height: any;
    /**
     * When set to `true`, the PanelBar renders the content of all items and they are persisted in the DOM
     * ([see example]({% slug templates_panelbar %}#toc-collections)).
     * By default, this option is set to `false`.
     */
    keepItemContent: boolean;
    /**
     * Sets the items of the PanelBar as an array of `PanelBarItemModel` instances
     * ([see example]({% slug items_panelbar %})).
     */
    items: Array<PanelBarItemModel>;
    /**
     * Fires each time the user interacts with a PanelBar item
     * ([see example]({% slug routing_panelbar %}#toc-getting-the-selected-item)).
     * The event data contains all items that are modified.
     */
    stateChange: EventEmitter<any>;
    tabIndex: number;
    role: string;
    activeDescendant: string;
    readonly hostHeight: string;
    readonly overflow: string;
    readonly dir: string;
    template: PanelBarItemTemplateDirective;
    contentItems: QueryList<PanelBarItemComponent>;
    contentChildItems: QueryList<PanelBarItemComponent>;
    viewChildItems: QueryList<PanelBarItemComponent>;
    private localizationChangeSubscription;
    private allItems;
    private childrenItems;
    private isViewInit;
    private focused;
    private _items;
    private _keepItemContent;
    private elementRef;
    private eventService;
    private keyBindings;
    constructor(elementRef: ElementRef, eventService: PanelBarService, localization: LocalizationService);
    /**
     * @hidden
     */
    invertKeys(original: any, inverted: any): any;
    readonly computedKeys: Object;
    ngOnDestroy(): void;
    ngOnInit(): void;
    ngAfterViewChecked(): void;
    ngOnChanges(changes: {
        [propertyName: string]: SimpleChange;
    }): void;
    readonly templateRef: TemplateRef<any>;
    /**
     * @hidden
     */
    onComponentClick(event: any): void;
    /**
     * @hidden
     */
    onComponentFocus(): void;
    /**
     * @hidden
     */
    onComponentBlur(): void;
    /**
     * @hidden
     */
    onComponentKeyDown(event: any): void;
    private readonly viewItems;
    private validateConfiguration;
    private updateChildrenHeight;
    private onItemAction;
    readonly hostClasses: boolean;
    private isVisible;
    private getVisibleParent;
    private focusItem;
    private moveFocus;
    private focusLastItem;
    private focusFirstItem;
    private focusNextItem;
    private focusPreviousItem;
    private expandItem;
    private collapseItem;
    private selectFocusedItem;
    private visibleItems;
    private flatVisibleItems;
}
