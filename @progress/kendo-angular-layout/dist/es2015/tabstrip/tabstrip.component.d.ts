/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ElementRef, EventEmitter, QueryList, Renderer2, OnInit, OnDestroy } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { TabStripTabComponent } from './tabstrip-tab.component';
import { SelectEvent } from './tabstrip-events';
import { TabPosition } from './tab-position';
import { TabAlignment } from './tab-alignment';
/**
 * Represents the [Kendo UI TabStrip component for Angular]({% slug overview_tabstrip %}).
 */
export declare class TabStripComponent implements OnInit, OnDestroy {
    private localization;
    private renderer;
    private wrapper;
    /**
     * Sets the height of the TabStrip.
     */
    height: string | null | undefined;
    /**
     * Enables the tab animation.
     */
    animate: boolean;
    /**
     * Sets the alignment of the tabs.
     */
    tabAlignment: TabAlignment;
    /**
     * Sets the position of the tabs. Defaults to `top`.
     */
    tabPosition: TabPosition;
    /**
     * When set to `true`, the component renders all tabs and they are persisted in the DOM.
     * By default, `keepTabContent` is `false`.
     */
    keepTabContent: boolean;
    /**
     * @hidden
     */
    tablist: ElementRef;
    /**
     * Fires each time the user selects a tab ([see example]({% slug overview_tabstrip %}#toc-basic-usage)).
     * The event data contains the index of the selected tab and its title.
     */
    tabSelect: EventEmitter<SelectEvent>;
    hostClasses: boolean;
    readonly tabsAtTop: boolean;
    readonly tabsAtRight: boolean;
    readonly tabsAtBottom: boolean;
    readonly tabsAtLeft: boolean;
    readonly dir: string;
    /**
     * @hidden
     */
    tabs: QueryList<TabStripTabComponent>;
    tabHeadingContainers: QueryList<ElementRef<HTMLLIElement>>;
    /**
     * @hidden
     */
    _animate: boolean;
    private localizationChangeSubscription;
    private keyBindings;
    private _height;
    constructor(localization: LocalizationService, renderer: Renderer2, wrapper: ElementRef);
    /**
     * @hidden
     */
    contentClass(active: boolean): string;
    readonly computedKeys: Object;
    /**
     * @hidden
     */
    readonly tabsAlignment: string;
    /**
     * @hidden
     */
    invertKeys(original: any, inverted: any): any;
    /**
     * @hidden
     */
    onKeyDown(event: any): void;
    /**
     * @hidden
     */
    tabPanelId(id: number): string;
    /**
     * @hidden
     */
    tabId(id: number): string;
    /**
     * Allows the user to select a tab programmatically.
     * @param {number} index - The index of the tab that will be selected.
     */
    selectTab(index: number): void;
    /**
     * @hidden
     */
    onTabClick(originalEvent: MouseEvent, tabIndex: number): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    private firstNavigatableIndex;
    private lastNavigatableIndex;
    private prevNavigatableIndex;
    private nextNavigatableIndex;
    private emitEvent;
    private deactivateAll;
}
