/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var animations_1 = require("@angular/animations");
var panelbar_service_1 = require("./panelbar.service");
var panelbar_content_directive_1 = require("./panelbar-content.directive");
var panelbar_item_title_directive_1 = require("./panelbar-item-title.directive");
var dom_queries_1 = require("../common/dom-queries");
var rxjs_1 = require("rxjs");
var panelbar_expand_mode_1 = require("./panelbar-expand-mode");
/**
 * @hidden
 */
var nextId = 0;
/**
 * Represents the items of the PanelBar.
 */
var PanelBarItemComponent = /** @class */ (function () {
    function PanelBarItemComponent(parent, eventService, element) {
        var _this = this;
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
        this.id = "default-" + nextId++;
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
        this.subscriptions = new rxjs_1.Subscription(function () { });
        this._expanded = false;
        this.subscriptions.add(eventService.parent$.subscribe(function (focused) { return _this.onWrapperFocusChange(focused); }));
        this.subscriptions.add(eventService.keepContent$.subscribe(function (keepContent) { return _this.keepContent = keepContent; }));
        this.wrapperFocused = parent ? parent.focused : false;
    }
    Object.defineProperty(PanelBarItemComponent.prototype, "expanded", {
        get: function () {
            return this._expanded;
        },
        /**
         * When set to `true`, expands the PanelBar item ([see example]({% slug items_panelbar %}#toc-expanded-state)).
         */
        set: function (value) {
            var activeState = this.animate ? "active" : "activeWithoutAnimation";
            this.state = value ? activeState : "inactive";
            if (!this.keepContent) {
                this.toggleExpandedChildAnimations(value);
            }
            this._expanded = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PanelBarItemComponent.prototype, "animate", {
        get: function () {
            return this.eventService.animate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PanelBarItemComponent.prototype, "kItemClass", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PanelBarItemComponent.prototype, "kStateDefaultClass", {
        get: function () {
            return !this.disabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PanelBarItemComponent.prototype, "kStateDisabledClass", {
        get: function () {
            return this.disabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PanelBarItemComponent.prototype, "kStateExpandedClass", {
        get: function () {
            return !this.disabled && this.expanded && (this.hasChildItems || this.hasContent);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PanelBarItemComponent.prototype, "itemId", {
        get: function () {
            return 'k-panelbar-' + this.eventService.pbId + '-item-' + this.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PanelBarItemComponent.prototype, "ariaExpanded", {
        get: function () {
            return (this.hasChildItems || this.hasContent) ? !this.disabled && this.expanded : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PanelBarItemComponent.prototype, "ariaSelected", {
        get: function () {
            return !this.disabled && this.selected;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PanelBarItemComponent.prototype, "ariaDisabled", {
        get: function () {
            return this.disabled ? true : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PanelBarItemComponent.prototype, "titleTemplate", {
        /**
         * @hidden
         */
        get: function () {
            return this.titleTemplates.length > 0 ? this.titleTemplates.toArray()[0].templateRef : undefined;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    PanelBarItemComponent.prototype.headerHeight = function () {
        return this.element.nativeElement.offsetHeight - (this.contentWrapper ? this.contentWrapper.nativeElement.offsetHeight : 0);
    };
    /**
     * @hidden
     */
    PanelBarItemComponent.prototype.ngAfterContentChecked = function () {
        var _this = this;
        this.hasItems = this.items && this.items.filter(function (item) { return !item.hidden; }).length > 0;
        this.hasChildItems = this.contentItems.filter(function (item) { return item !== _this; }).length > 0 || this.hasItems;
        this.hasContent = (this.contentTemplate !== undefined && this.contentTemplate.length > 0) ||
            this.content !== undefined;
        this.validateConfiguration();
    };
    /**
     * @hidden
     */
    PanelBarItemComponent.prototype.ngAfterViewChecked = function () {
        var _this = this;
        if (this.items) {
            this.childrenItems = this.viewChildItems.toArray();
        }
        else {
            this.childrenItems = this.contentItems.filter(function (item) { return item !== _this; });
        }
    };
    /**
     * @hidden
     */
    PanelBarItemComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.unsubscribe();
    };
    /**
     * @hidden
     */
    PanelBarItemComponent.prototype.onItemAction = function () {
        if (!this.disabled) {
            this.eventService.onSelect(this);
        }
    };
    /**
     * @hidden
     */
    PanelBarItemComponent.prototype.onItemClick = function (e) {
        if (!dom_queries_1.isFocusable(e.target)) {
            this.onItemAction();
        }
    };
    Object.defineProperty(PanelBarItemComponent.prototype, "iconClasses", {
        /**
         * @hidden
         */
        get: function () {
            var _a;
            var icon = this.icon ? 'k-i-' + this.icon : null;
            return _a = {},
                _a[icon || this.iconClass] = true,
                _a;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    PanelBarItemComponent.prototype.serialize = function () {
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
    };
    /**
     * @hidden
     */
    PanelBarItemComponent.prototype.subTreeViewItems = function () {
        var subTree = [];
        this.viewChildItems.forEach(function (item) {
            subTree = subTree.concat(item.subTreeViewItems());
            subTree.push(item);
        });
        return subTree;
    };
    /**
     * @hidden
     */
    PanelBarItemComponent.prototype.validateConfiguration = function () {
        if (core_1.isDevMode()) {
            if (this.content && (this.contentTemplate !== undefined && this.contentTemplate.length > 0)) {
                throw new Error("Invalid configuration: mixed template components and component property.");
            }
        }
    };
    /**
     * @hidden
     */
    PanelBarItemComponent.prototype.toggleAnimationState = function (value) {
        if (!this.animate) {
            return;
        }
        this.state = value && this.eventService.expandMode !== panelbar_expand_mode_1.PanelBarExpandMode.Single ? 'active' : 'activeWithoutAnimation';
    };
    /**
     * @hidden
     */
    PanelBarItemComponent.prototype.toggleExpandedChildAnimations = function (value) {
        if (this.childrenItems) {
            this.childrenItems.forEach(function (child) {
                if (child.expanded) {
                    child.toggleAnimationState(value);
                    child.toggleExpandedChildAnimations(value);
                }
            });
        }
    };
    PanelBarItemComponent.prototype.onWrapperFocusChange = function (focused) {
        this.wrapperFocused = focused;
    };
    PanelBarItemComponent.decorators = [
        { type: core_1.Component, args: [{
                    animations: [
                        animations_1.trigger('toggle', [
                            animations_1.state('inactive', animations_1.style({ display: 'none' })),
                            animations_1.transition('* => active', [
                                animations_1.style({ overflow: 'hidden', display: 'block', height: 0 }),
                                animations_1.animate(200, animations_1.style({ height: animations_1.AUTO_STYLE }))
                            ]),
                            animations_1.transition('active => *', [
                                animations_1.style({ overflow: 'hidden', height: animations_1.AUTO_STYLE }),
                                animations_1.animate(200, animations_1.style({ height: 0, display: 'none' }))
                            ])
                        ])
                    ],
                    exportAs: 'kendoPanelbarItem',
                    selector: "kendo-panelbar-item",
                    template: "<span\n                #header\n                [class.k-link]=\"true\"\n                [class.k-header]=\"!parent\"\n                [class.k-state-selected]=\"!disabled && selected\"\n                [class.k-state-focused]=\"!disabled && focused && wrapperFocused\"\n                (click)=\"onItemClick($event)\">\n            <span\n                *ngIf=\"icon || iconClass\"\n                class=\"k-icon\"\n                [ngClass]=\"iconClasses\">\n            </span>\n            <img\n                *ngIf=\"imageUrl\"\n                class=\"k-image\"\n                [src]=\"imageUrl\"\n                alt=\"\">\n            {{title}}\n            <ng-template [ngTemplateOutlet]=\"titleTemplate\"></ng-template>\n            <span *ngIf=\"hasChildItems || hasContent\"\n                [class.k-icon]=\"true\"\n                [class.k-i-arrow-n]=\"expanded\"\n                [class.k-panelbar-collapse]=\"expanded\"\n                [class.k-i-arrow-s]=\"!expanded\"\n                [class.k-panelbar-expand]=\"!expanded\">\n            </span>\n        </span>\n        <div #contentWrapper\n            *ngIf=\"keepContent || (!disabled && expanded && (hasChildItems || hasContent))\"\n            [@toggle]=\"state\"\n            [attr.role]=\"'group'\"\n            [attr.aria-hidden]=\"!disabled && !expanded\">\n            <div\n                *ngIf=\"hasChildItems && !items?.length\"\n                [style.overflow]=\"contentOverflow\"\n                [style.height]=\"contentHeight\"\n                class=\"k-panel k-group\">\n                    <ng-content select=\"kendo-panelbar-item\"></ng-content>\n            </div>\n            <div\n                *ngIf=\"hasContent && !content\"\n                [style.overflow]=\"contentOverflow\"\n                [style.height]=\"contentHeight\"\n                class=\"k-content\">\n                <ng-template\n                    [ngTemplateOutlet]=\"contentTemplate.first.templateRef\"\n                    [ngTemplateOutletContext]=\"{\n                        $implicit: {\n                            title: title,\n                            id: id,\n                            icon: icon,\n                            imageUrl: imageUrl,\n                            disabled: disabled,\n                            content: content\n                        }\n                    }\">\n                </ng-template>\n            </div>\n            <div *ngIf=\"hasItems\"\n                [style.overflow]=\"contentOverflow\"\n                [style.height]=\"contentHeight\"\n                class=\"k-panel k-group\">\n                <ng-container *ngFor=\"let item of items\">\n                    <kendo-panelbar-item *ngIf=\"!item.hidden\"\n                        [title]=\"item.title\"\n                        [id]=\"item.id\"\n                        [icon]=\"item.icon\"\n                        [iconClass]=\"item.iconClass\"\n                        [imageUrl]=\"item.imageUrl\"\n                        [selected]=\"!!item.selected\"\n                        [expanded]=\"!!item.expanded\"\n                        [disabled]=\"!!item.disabled\"\n                        [template]=\"template\"\n                        [items]=\"item.children\"\n                        [content]=\"item.content\">\n                    </kendo-panelbar-item>\n                </ng-container>\n            </div>\n            <div\n                *ngIf=\"content\"\n                [style.overflow]=\"contentOverflow\"\n                [style.height]=\"contentHeight\"\n                class=\"k-content\">\n                <ng-template\n                    [ngTemplateOutlet]=\"template\"\n                    [ngTemplateOutletContext]=\"{\n                        $implicit: {\n                            title: title,\n                            id: id,\n                            icon: icon,\n                            imageUrl: imageUrl,\n                            disabled: disabled,\n                            content: content\n                        }\n                    }\">\n                </ng-template>\n                <ng-template [ngIf]=\"!template\">{{content}}</ng-template>\n            </div>\n        </div>"
                },] },
    ];
    /** @nocollapse */
    PanelBarItemComponent.ctorParameters = function () { return [
        { type: PanelBarItemComponent, decorators: [{ type: core_1.SkipSelf }, { type: core_1.Host }, { type: core_1.Optional }] },
        { type: panelbar_service_1.PanelBarService },
        { type: core_1.ElementRef }
    ]; };
    PanelBarItemComponent.propDecorators = {
        title: [{ type: core_1.Input }],
        id: [{ type: core_1.Input }],
        icon: [{ type: core_1.Input }],
        iconClass: [{ type: core_1.Input }],
        imageUrl: [{ type: core_1.Input }],
        disabled: [{ type: core_1.Input }],
        expanded: [{ type: core_1.Input }],
        selected: [{ type: core_1.Input }],
        content: [{ type: core_1.Input }],
        items: [{ type: core_1.Input }],
        template: [{ type: core_1.Input }],
        header: [{ type: core_1.ViewChild, args: ['header', {},] }],
        contentWrapper: [{ type: core_1.ViewChild, args: ['contentWrapper', {},] }],
        role: [{ type: core_1.HostBinding, args: ['attr.role',] }],
        titleAttribute: [{ type: core_1.HostBinding, args: ['attr.title',] }],
        kItemClass: [{ type: core_1.HostBinding, args: ['class.k-item',] }],
        kStateDefaultClass: [{ type: core_1.HostBinding, args: ['class.k-state-default',] }],
        kStateDisabledClass: [{ type: core_1.HostBinding, args: ['class.k-state-disabled',] }],
        kStateExpandedClass: [{ type: core_1.HostBinding, args: ['class.k-state-expanded',] }],
        itemId: [{ type: core_1.HostBinding, args: ['id',] }],
        ariaExpanded: [{ type: core_1.HostBinding, args: ['attr.aria-expanded',] }],
        ariaSelected: [{ type: core_1.HostBinding, args: ['attr.aria-selected',] }],
        ariaDisabled: [{ type: core_1.HostBinding, args: ['attr.aria-disabled',] }],
        viewChildItems: [{ type: core_1.ViewChildren, args: [PanelBarItemComponent,] }],
        contentItems: [{ type: core_1.ContentChildren, args: [PanelBarItemComponent,] }],
        contentTemplate: [{ type: core_1.ContentChildren, args: [panelbar_content_directive_1.PanelBarContentDirective, { descendants: false },] }],
        titleTemplates: [{ type: core_1.ContentChildren, args: [panelbar_item_title_directive_1.PanelBarItemTitleDirective, { descendants: false },] }]
    };
    return PanelBarItemComponent;
}());
exports.PanelBarItemComponent = PanelBarItemComponent;
