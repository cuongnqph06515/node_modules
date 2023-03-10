/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { TemplateRef, QueryList, AfterContentChecked, AfterViewChecked, OnDestroy, ElementRef } from '@angular/core';
import { PanelBarService } from "./panelbar.service";
import { PanelBarContentDirective } from "./panelbar-content.directive";
import { PanelBarItemTitleDirective } from "./panelbar-item-title.directive";
import { PanelBarItemModel } from './panelbar-item-model';
import { Subscription } from 'rxjs';
/**
 * Represents the items of the PanelBar.
 */
export declare class PanelBarItemComponent implements AfterContentChecked, AfterViewChecked, OnDestroy {
    parent: PanelBarItemComponent;
    private eventService;
    private element;
    /**
     * Sets the title of the PanelBar item ([see example]({% slug items_panelbar %}#toc-titles)).
     */
    title: string;
    /**
     * Allows the component to set the `"id"` property to each item.
     * Used to set the `id` attributes of the nested elements and to enable the WAI-ARIA support.
     */
    id: string;
    /**
     * Defines the icon that will be rendered next to the title ([see example]({% slug items_panelbar %}#toc-title-icons)).
     */
    icon: string;
    /**
     * Defines  the icon that will be rendered next to the title by using a custom CSS class
     * ([see example]({% slug items_panelbar %}#toc-title-icons)).
     */
    iconClass: string;
    /**
     * Defines the location of the image that will be displayed next to the title
     * ([see example]({% slug items_panelbar %}#toc-title-images)).
     */
    imageUrl: string;
    /**
     * When set to `true`, disables a PanelBar item ([see example]({% slug items_panelbar %}#toc-disabled-state)).
     */
    disabled: boolean;
    /**
     * When set to `true`, expands the PanelBar item ([see example]({% slug items_panelbar %}#toc-expanded-state)).
     */
    expanded: boolean;
    /**
     * Sets the selected state of a PanelBar item ([see example]({% slug items_panelbar %}#toc-selected-state)).
     */
    selected: boolean;
    /**
     * Sets the content of the PanelBar item.
     * By design, it is used when the
     * [`items`]({% slug api_layout_panelbarcomponent %}#toc-items)
     * property of the PanelBar is set.
     */
    content: any;
    /**
     * @hidden
     */
    items: Array<PanelBarItemModel>;
    /**
     * @hidden
     */
    template: TemplateRef<any>;
    header: ElementRef;
    contentWrapper: ElementRef;
    contentHeight: string;
    contentOverflow: string;
    keepContent: boolean;
    childrenItems: Array<PanelBarItemComponent>;
    hasChildItems: boolean;
    hasItems: boolean;
    hasContent: boolean;
    state: string;
    readonly animate: boolean;
    role: string;
    titleAttribute: string;
    readonly kItemClass: boolean;
    readonly kStateDefaultClass: boolean;
    readonly kStateDisabledClass: boolean;
    readonly kStateExpandedClass: boolean;
    readonly itemId: string;
    readonly ariaExpanded: boolean;
    readonly ariaSelected: boolean;
    readonly ariaDisabled: boolean;
    /**
     * @hidden
     */
    readonly titleTemplate: TemplateRef<any>;
    viewChildItems: QueryList<PanelBarItemComponent>;
    contentItems: QueryList<PanelBarItemComponent>;
    contentTemplate: QueryList<PanelBarContentDirective>;
    titleTemplates: QueryList<PanelBarItemTitleDirective>;
    focused: boolean;
    wrapperFocused: boolean;
    protected subscriptions: Subscription;
    private _expanded;
    constructor(parent: PanelBarItemComponent, eventService: PanelBarService, element: ElementRef);
    /**
     * @hidden
     */
    headerHeight(): number;
    /**
     * @hidden
     */
    ngAfterContentChecked(): void;
    /**
     * @hidden
     */
    ngAfterViewChecked(): void;
    /**
     * @hidden
     */
    ngOnDestroy(): void;
    /**
     * @hidden
     */
    onItemAction(): void;
    /**
     * @hidden
     */
    onItemClick(e: any): void;
    /**
     * @hidden
     */
    readonly iconClasses: any;
    /**
     * @hidden
     */
    serialize(): PanelBarItemModel;
    /**
     * @hidden
     */
    subTreeViewItems(): Array<PanelBarItemComponent>;
    /**
     * @hidden
     */
    validateConfiguration(): void;
    /**
     * @hidden
     */
    toggleAnimationState(value: boolean): void;
    /**
     * @hidden
     */
    toggleExpandedChildAnimations(value: boolean): void;
    private onWrapperFocusChange;
}
