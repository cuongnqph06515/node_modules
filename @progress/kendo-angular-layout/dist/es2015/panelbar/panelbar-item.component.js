/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input, ContentChildren, ViewChildren, Optional, Host, HostBinding, SkipSelf, isDevMode, TemplateRef, QueryList, ViewChild, ElementRef } from '@angular/core';
import { animate, trigger, style, state, transition, AUTO_STYLE } from '@angular/animations';
import { PanelBarService } from "./panelbar.service";
import { PanelBarContentDirective } from "./panelbar-content.directive";
import { PanelBarItemTitleDirective } from "./panelbar-item-title.directive";
import { isFocusable } from '../common/dom-queries';
import { Subscription } from 'rxjs';
import { PanelBarExpandMode } from './panelbar-expand-mode';
/**
 * @hidden
 */
let nextId = 0;
/**
 * Represents the items of the PanelBar.
 */
export class PanelBarItemComponent {
    constructor(parent, eventService, element) {
        this.parent = parent;
        this.eventService = eventService;
        this.element = element;
        /**
         * Sets the title of the PanelBar item ([see example]({% slug items_panelbar %}#toc-titles)).
         */
        this.title = 'Untitled';
        /**
         * Allows the component to set the `"id"` property to each item.
         * Used to set the `id` attributes of the nested elements and to enable the WAI-ARIA support.
         */
        this.id = `default-${nextId++}`;
        /**
         * Defines the icon that will be rendered next to the title ([see example]({% slug items_panelbar %}#toc-title-icons)).
         */
        this.icon = '';
        /**
         * Defines  the icon that will be rendered next to the title by using a custom CSS class
         * ([see example]({% slug items_panelbar %}#toc-title-icons)).
         */
        this.iconClass = '';
        /**
         * Defines the location of the image that will be displayed next to the title
         * ([see example]({% slug items_panelbar %}#toc-title-images)).
         */
        this.imageUrl = '';
        /**
         * When set to `true`, disables a PanelBar item ([see example]({% slug items_panelbar %}#toc-disabled-state)).
         */
        this.disabled = false;
        /**
         * Sets the selected state of a PanelBar item ([see example]({% slug items_panelbar %}#toc-selected-state)).
         */
        this.selected = false;
        this.keepContent = false;
        this.hasChildItems = false;
        this.hasItems = false;
        this.hasContent = false;
        this.state = "inactive";
        this.role = "treeitem";
        this.titleAttribute = null; // tslint:disable-line
        this.focused = false;
        this.wrapperFocused = false;
        this.subscriptions = new Subscription(() => { });
        this._expanded = false;
        this.subscriptions.add(eventService.parent$.subscribe(focused => this.onWrapperFocusChange(focused)));
        this.subscriptions.add(eventService.keepContent$.subscribe(keepContent => this.keepContent = keepContent));
        this.wrapperFocused = parent ? parent.focused : false;
    }
    /**
     * When set to `true`, expands the PanelBar item ([see example]({% slug items_panelbar %}#toc-expanded-state)).
     */
    set expanded(value) {
        const activeState = this.animate ? "active" : "activeWithoutAnimation";
        this.state = value ? activeState : "inactive";
        if (!this.keepContent) {
            this.toggleExpandedChildAnimations(value);
        }
        this._expanded = value;
    }
    get expanded() {
        return this._expanded;
    }
    get animate() {
        return this.eventService.animate;
    }
    get kItemClass() {
        return true;
    }
    get kStateDefaultClass() {
        return !this.disabled;
    }
    get kStateDisabledClass() {
        return this.disabled;
    }
    get kStateExpandedClass() {
        return !this.disabled && this.expanded && (this.hasChildItems || this.hasContent);
    }
    get itemId() {
        return 'k-panelbar-' + this.eventService.pbId + '-item-' + this.id;
    }
    get ariaExpanded() {
        return (this.hasChildItems || this.hasContent) ? !this.disabled && this.expanded : null;
    }
    get ariaSelected() {
        return !this.disabled && this.selected;
    }
    get ariaDisabled() {
        return this.disabled ? true : null;
    }
    /**
     * @hidden
     */
    get titleTemplate() {
        return this.titleTemplates.length > 0 ? this.titleTemplates.toArray()[0].templateRef : undefined;
    }
    /**
     * @hidden
     */
    headerHeight() {
        return this.element.nativeElement.offsetHeight - (this.contentWrapper ? this.contentWrapper.nativeElement.offsetHeight : 0);
    }
    /**
     * @hidden
     */
    ngAfterContentChecked() {
        this.hasItems = this.items && this.items.filter(item => !item.hidden).length > 0;
        this.hasChildItems = this.contentItems.filter(item => item !== this).length > 0 || this.hasItems;
        this.hasContent = (this.contentTemplate !== undefined && this.contentTemplate.length > 0) ||
            this.content !== undefined;
        this.validateConfiguration();
    }
    /**
     * @hidden
     */
    ngAfterViewChecked() {
        if (this.items) {
            this.childrenItems = this.viewChildItems.toArray();
        }
        else {
            this.childrenItems = this.contentItems.filter(item => item !== this);
        }
    }
    /**
     * @hidden
     */
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
    /**
     * @hidden
     */
    onItemAction() {
        if (!this.disabled) {
            this.eventService.onSelect(this);
        }
    }
    /**
     * @hidden
     */
    onItemClick(e) {
        if (!isFocusable(e.target)) {
            this.onItemAction();
        }
    }
    /**
     * @hidden
     */
    get iconClasses() {
        let icon = this.icon ? 'k-i-' + this.icon : null;
        return {
            [icon || this.iconClass]: true
        };
    }
    /**
     * @hidden
     */
    serialize() {
        return {
            content: this.content,
            disabled: this.disabled,
            expanded: this.expanded,
            focused: this.focused,
            icon: this.icon,
            iconClass: this.iconClass,
            id: this.id,
            imageUrl: this.imageUrl,
            selected: this.selected,
            title: this.title
        };
    }
    /**
     * @hidden
     */
    subTreeViewItems() {
        let subTree = [];
        this.viewChildItems.forEach(item => {
            subTree = subTree.concat(item.subTreeViewItems());
            subTree.push(item);
        });
        return subTree;
    }
    /**
     * @hidden
     */
    validateConfiguration() {
        if (isDevMode()) {
            if (this.content && (this.contentTemplate !== undefined && this.contentTemplate.length > 0)) {
                throw new Error("Invalid configuration: mixed template components and component property.");
            }
        }
    }
    /**
     * @hidden
     */
    toggleAnimationState(value) {
        if (!this.animate) {
            return;
        }
        this.state = value && this.eventService.expandMode !== PanelBarExpandMode.Single ? 'active' : 'activeWithoutAnimation';
    }
    /**
     * @hidden
     */
    toggleExpandedChildAnimations(value) {
        if (this.childrenItems) {
            this.childrenItems.forEach(child => {
                if (child.expanded) {
                    child.toggleAnimationState(value);
                    child.toggleExpandedChildAnimations(value);
                }
            });
        }
    }
    onWrapperFocusChange(focused) {
        this.wrapperFocused = focused;
    }
}
PanelBarItemComponent.decorators = [
    { type: Component, args: [{
                animations: [
                    trigger('toggle', [
                        state('inactive', style({ display: 'none' })),
                        transition('* => active', [
                            style({ overflow: 'hidden', display: 'block', height: 0 }),
                            animate(200, style({ height: AUTO_STYLE }))
                        ]),
                        transition('active => *', [
                            style({ overflow: 'hidden', height: AUTO_STYLE }),
                            animate(200, style({ height: 0, display: 'none' }))
                        ])
                    ])
                ],
                exportAs: 'kendoPanelbarItem',
                selector: "kendo-panelbar-item",
                template: `<span
                #header
                [class.k-link]="true"
                [class.k-header]="!parent"
                [class.k-state-selected]="!disabled && selected"
                [class.k-state-focused]="!disabled && focused && wrapperFocused"
                (click)="onItemClick($event)">
            <span
                *ngIf="icon || iconClass"
                class="k-icon"
                [ngClass]="iconClasses">
            </span>
            <img
                *ngIf="imageUrl"
                class="k-image"
                [src]="imageUrl"
                alt="">
            {{title}}
            <ng-template [ngTemplateOutlet]="titleTemplate"></ng-template>
            <span *ngIf="hasChildItems || hasContent"
                [class.k-icon]="true"
                [class.k-i-arrow-n]="expanded"
                [class.k-panelbar-collapse]="expanded"
                [class.k-i-arrow-s]="!expanded"
                [class.k-panelbar-expand]="!expanded">
            </span>
        </span>
        <div #contentWrapper
            *ngIf="keepContent || (!disabled && expanded && (hasChildItems || hasContent))"
            [@toggle]="state"
            [attr.role]="'group'"
            [attr.aria-hidden]="!disabled && !expanded">
            <div
                *ngIf="hasChildItems && !items?.length"
                [style.overflow]="contentOverflow"
                [style.height]="contentHeight"
                class="k-panel k-group">
                    <ng-content select="kendo-panelbar-item"></ng-content>
            </div>
            <div
                *ngIf="hasContent && !content"
                [style.overflow]="contentOverflow"
                [style.height]="contentHeight"
                class="k-content">
                <ng-template
                    [ngTemplateOutlet]="contentTemplate.first.templateRef"
                    [ngTemplateOutletContext]="{
                        $implicit: {
                            title: title,
                            id: id,
                            icon: icon,
                            imageUrl: imageUrl,
                            disabled: disabled,
                            content: content
                        }
                    }">
                </ng-template>
            </div>
            <div *ngIf="hasItems"
                [style.overflow]="contentOverflow"
                [style.height]="contentHeight"
                class="k-panel k-group">
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
                        [template]="template"
                        [items]="item.children"
                        [content]="item.content">
                    </kendo-panelbar-item>
                </ng-container>
            </div>
            <div
                *ngIf="content"
                [style.overflow]="contentOverflow"
                [style.height]="contentHeight"
                class="k-content">
                <ng-template
                    [ngTemplateOutlet]="template"
                    [ngTemplateOutletContext]="{
                        $implicit: {
                            title: title,
                            id: id,
                            icon: icon,
                            imageUrl: imageUrl,
                            disabled: disabled,
                            content: content
                        }
                    }">
                </ng-template>
                <ng-template [ngIf]="!template">{{content}}</ng-template>
            </div>
        </div>`
            },] },
];
/** @nocollapse */
PanelBarItemComponent.ctorParameters = () => [
    { type: PanelBarItemComponent, decorators: [{ type: SkipSelf }, { type: Host }, { type: Optional }] },
    { type: PanelBarService },
    { type: ElementRef }
];
PanelBarItemComponent.propDecorators = {
    title: [{ type: Input }],
    id: [{ type: Input }],
    icon: [{ type: Input }],
    iconClass: [{ type: Input }],
    imageUrl: [{ type: Input }],
    disabled: [{ type: Input }],
    expanded: [{ type: Input }],
    selected: [{ type: Input }],
    content: [{ type: Input }],
    items: [{ type: Input }],
    template: [{ type: Input }],
    header: [{ type: ViewChild, args: ['header', {},] }],
    contentWrapper: [{ type: ViewChild, args: ['contentWrapper', {},] }],
    role: [{ type: HostBinding, args: ['attr.role',] }],
    titleAttribute: [{ type: HostBinding, args: ['attr.title',] }],
    kItemClass: [{ type: HostBinding, args: ['class.k-item',] }],
    kStateDefaultClass: [{ type: HostBinding, args: ['class.k-state-default',] }],
    kStateDisabledClass: [{ type: HostBinding, args: ['class.k-state-disabled',] }],
    kStateExpandedClass: [{ type: HostBinding, args: ['class.k-state-expanded',] }],
    itemId: [{ type: HostBinding, args: ['id',] }],
    ariaExpanded: [{ type: HostBinding, args: ['attr.aria-expanded',] }],
    ariaSelected: [{ type: HostBinding, args: ['attr.aria-selected',] }],
    ariaDisabled: [{ type: HostBinding, args: ['attr.aria-disabled',] }],
    viewChildItems: [{ type: ViewChildren, args: [PanelBarItemComponent,] }],
    contentItems: [{ type: ContentChildren, args: [PanelBarItemComponent,] }],
    contentTemplate: [{ type: ContentChildren, args: [PanelBarContentDirective, { descendants: false },] }],
    titleTemplates: [{ type: ContentChildren, args: [PanelBarItemTitleDirective, { descendants: false },] }]
};
