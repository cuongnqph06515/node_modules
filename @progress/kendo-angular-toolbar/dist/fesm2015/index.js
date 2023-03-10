/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, HostBinding, HostListener, Injectable, Input, NgModule, NgZone, Output, Renderer2, ViewChild, ViewChildren, ViewContainerRef, forwardRef } from '@angular/core';
import { PopupModule, PopupService } from '@progress/kendo-angular-popup';
import { Keys, ResizeSensorModule, isChanged, isDocumentAvailable } from '@progress/kendo-angular-common';
import { L10N_PREFIX, LocalizationService } from '@progress/kendo-angular-l10n';
import { fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Button, ButtonsModule, DropDownButtonComponent } from '@progress/kendo-angular-buttons';
import { CommonModule } from '@angular/common';

/**
 * @hidden
 */
class RefreshService {
    constructor() {
        this.onRefresh = new EventEmitter();
    }
    refresh(tool) {
        this.onRefresh.emit(tool);
    }
}
RefreshService.decorators = [
    { type: Injectable },
];

/**
 * @hidden
 */
const focusableRegex = /^(?:a|input|select|textarea|button|object)$/i;
/**
 * @hidden
 */
function outerWidth(element) {
    var width = element.offsetWidth;
    var style = getComputedStyle(element);
    width += (parseFloat(style.marginLeft) || 0 + parseFloat(style.marginRight) || 0);
    return width;
}
/**
 * @hidden
 */
function innerWidth(element) {
    var width = element.offsetWidth;
    var style = getComputedStyle(element);
    width -= (parseFloat(style.paddingLeft) || 0 + parseFloat(style.borderLeftWidth) || 0);
    width -= (parseFloat(style.paddingRight) || 0 + parseFloat(style.borderRightWidth) || 0);
    return width;
}
/**
 * @hidden
 */

/**
 * @hidden
 */
const closest = (node, predicate) => {
    while (node && !predicate(node)) {
        node = node.parentNode;
    }
    return node;
};
/**
 * @hidden
 */
const isVisible = (element) => {
    const rect = element.getBoundingClientRect();
    const hasSize = rect.width > 0 && rect.height > 0;
    const hasPosition = rect.x !== 0 && rect.y !== 0;
    // Elements can have zero size due to styling, but they should still count as visible.
    // For example, the selection checkbox has no size, but is made visible through styling.
    return (hasSize || hasPosition) && window.getComputedStyle(element).visibility !== 'hidden';
};
/**
 * @hidden
 */
const findElement = (node, predicate, matchSelf = true) => {
    if (!node) {
        return;
    }
    if (matchSelf && predicate(node)) {
        return node;
    }
    node = node.firstChild;
    while (node) {
        if (node.nodeType === 1) {
            const element = findElement(node, predicate);
            if (element) {
                return element;
            }
        }
        node = node.nextSibling;
    }
};
/**
 * @hidden
 */
const isFocusable = (element, checkVisibility = true) => {
    if (element.tagName) {
        const tagName = element.tagName.toLowerCase();
        const tabIndex = element.getAttribute('tabIndex');
        let focusable = tabIndex !== null;
        if (focusableRegex.test(tagName)) {
            focusable = !element.disabled;
        }
        return focusable && (!checkVisibility || isVisible(element));
    }
    return false;
};
/**
 * @hidden
 */
const findFocusable = (element, checkVisibility = true) => {
    return findElement(element, (node) => isFocusable(node, checkVisibility));
};
/**
 * @hidden
 */
const findFocusableChild = (element, checkVisibility = true) => {
    return findElement(element, (node) => isFocusable(node, checkVisibility), false);
};
/**
 * @hidden
 */
const findFocusableSibling = (element, checkVisibility = true, reverse) => {
    let node = reverse ? element.prevSibling : element.nextSibling;
    while (node) {
        if (node.nodeType === 1) {
            const result = findElement(node, (el) => isFocusable(el, checkVisibility));
            if (result) {
                return result;
            }
        }
        node = reverse ? node.prevSibling : node.nextSibling;
    }
};
/**
 * @hidden
 */
const isPresent = (value) => value !== null && value !== undefined;
/**
 * @hidden
 */
const getValueForLocation = (property, displayMode, overflows) => {
    switch (displayMode) {
        case 'toolbar':
            return overflows ? undefined : property;
        case 'overflow':
            return overflows ? property : undefined;
        default:
            return property;
    }
};

/**
 * @hidden
 */
class NavigationService {
    constructor() {
        this.keydown = new EventEmitter();
        this.isPopupFocused = false;
        this.tools = [];
        this.isFocusLocked = false;
        this.isOverflowButtonFocused = false;
    }
    register(t) {
        this.tools.push(t);
    }
    unregister(t) {
        this.tools.splice(this.tools.indexOf(t), 1);
    }
    moveFocusToToolBar() {
        this.isPopupFocused = false;
        this.focusOverflowButton();
    }
    moveFocusToPopup() {
        this.isPopupFocused = true;
    }
    focus(tool, focusLast) {
        this.focused = tool;
        this.tools.filter(t => t !== this.focused).forEach(t => t.navigationService.defocus());
        this.isOverflowButtonFocused = false;
        tool.navigationService.focus(focusLast);
    }
    focusOverflowButton() {
        this.isOverflowButtonFocused = true;
        this.overflowButton.nativeElement.focus();
    }
    focusFirst() {
        if (this.isFocusLocked) {
            return;
        }
        const tool = this.tools.find((t) => {
            if (t.navigationService.canFocus()) {
                return true;
            }
            else {
                return false;
            }
        });
        if (tool) {
            this.focus(tool);
        }
    }
    focusPrev(index) {
        // if (this.focused && this.focused.hasNextFocusableSibling()) {
        //     this.focused.focusPrevSibling();
        //     return;
        // }
        if (!isPresent(index)) {
            if (this.isOverflowButtonFocused) {
                index = this.tools.length - 1;
            }
            else {
                index = this.tools.indexOf(this.focused) - 1;
            }
        }
        if (this.isFocusLocked || !this.tools.length || index < 0) {
            return;
        }
        const tool = this.tools[index];
        if (tool.navigationService.canFocus()) {
            this.focus(tool, true);
        }
        else {
            this.focusPrev(index - 1);
        }
    }
    focusNext(index) {
        // if (this.focused && this.focused.hasNextFocusableSibling()) {
        //     this.focused.focusNextSibling();
        //     return;
        // }
        const overflowButtonIsVisible = this.overflowButton && this.overflowButton.nativeElement.style.visibility === 'visible';
        if (!isPresent(index)) {
            index = this.tools.indexOf(this.focused) + 1;
        }
        if (index >= this.tools.length && overflowButtonIsVisible && !this.isOverflowButtonFocused) {
            this.focusOverflowButton();
        }
        if (this.isFocusLocked || !this.tools.length || index >= this.tools.length) {
            return;
        }
        const tool = this.tools[index];
        if (tool.navigationService.canFocus()) {
            this.focus(tool);
        }
        else {
            this.focusNext(index + 1);
        }
    }
    lock() {
        this.isFocusLocked = true;
    }
    unlock() {
        this.isFocusLocked = false;
    }
    focusEnter() {
        //TODO
        // if (this.focused.hasFocusableChild()) {
        //     this.isFocusLocked = true;
        //     this.focused.focusInside();
        // }
    }
    focusLeave() {
        //TODO
        // if (this.isFocusLocked) {
        //     this.isFocusLocked = false;
        //     this.focus(this.focused);
        // }
    }
    defocus(t) {
        t.navigationService.defocus();
    }
}
NavigationService.decorators = [
    { type: Injectable },
];

/**
 * @hidden
 */
class ToolNavigationService {
    register(rendererService, location) {
        if (location === 'toolbar') {
            this.toolbarRenderer = rendererService;
        }
        else {
            this.overflowRenderer = rendererService;
        }
    }
    canFocus() {
        return false;
    }
    focus() { }
    defocus() { }
    hasFocus() {
        return false;
    }
}
ToolNavigationService.decorators = [
    { type: Injectable },
];

/**
 * Represents the Base ToolBar Tool component for Angular.
 * Extend this class to create custom tools.
 */
class ToolBarToolComponent {
    constructor() {
        this.tabIndex = -1; //Focus movement inside the toolbar is managed using roving tabindex.
        this.overflows = true;
        // this should be replaced with showTool: DisplayMode = 'both';
        /**
         * @hidden
         */
        this.responsive = true;
        if (!this.navigationService) {
            this.navigationService = new ToolNavigationService();
        }
    }
    get toolbarDisplay() {
        return this.overflows ? 'none' : 'inline-block';
    }
    get overflowDisplay() {
        return this.overflows ? 'block' : 'none';
    }
}
ToolBarToolComponent.decorators = [
    { type: Component, args: [{
                // tslint:disable-next-line:component-selector
                selector: 'toolbar-tool',
                template: ``
            },] },
];
/** @nocollapse */
ToolBarToolComponent.ctorParameters = () => [];
ToolBarToolComponent.propDecorators = {
    responsive: [{ type: Input }]
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
 * @hidden
 */
class RendererService {
    getElement() {
        return this.element.nativeElement;
    }
    querySelector(selector) {
        return this.element.nativeElement.querySelector(selector);
    }
    querySelectorAll(selector) {
        return this.element.nativeElement.querySelectorAll(selector);
    }
    findFocusable() {
        return findFocusable(this.element.nativeElement, false);
    }
    findFocusableChild(element) {
        if (!element) {
            element = this.findFocusable();
        }
        return findFocusableChild(element, false);
    }
    findNextFocusableSibling(element) {
        if (!element) {
            element = this.findFocusable();
        }
        return findFocusableSibling(element, false);
    }
    findPrevFocusableSibling(element) {
        if (!element) {
            element = this.findFocusable();
        }
        return findFocusableSibling(element, false, true);
    }
    setAttribute(element, attr, value) {
        this.renderer.setAttribute(element, attr, value);
    }
}
RendererService.decorators = [
    { type: Injectable },
];

/**
 * @hidden
 */
class ToolBarRendererComponent {
    constructor(element, renderer, rendererService, refreshService, navigationService) {
        this.element = element;
        this.renderer = renderer;
        this.rendererService = rendererService;
        this.refreshService = refreshService;
        this.navigationService = navigationService;
        this.rendererService.element = element;
        this.rendererService.renderer = this;
        this.refreshSubscription = this.refreshService.onRefresh.subscribe((tool) => {
            if (this.tool === tool) {
                this.refresh();
            }
        });
    }
    onFocus() {
        this.navigationService.focused = this.tool;
    }
    ngOnInit() {
        if (this.resizable) {
            if (this.location === 'toolbar') {
                this.template = this.tool.toolbarTemplate;
                this.renderer.setStyle(this.element.nativeElement, 'visibility', 'hidden');
                this.renderer.setStyle(this.element.nativeElement, 'display', 'none');
            }
            else {
                this.template = this.tool.popupTemplate;
                this.renderer.setStyle(this.element.nativeElement, 'display', 'none');
            }
        }
        else {
            this.tool.overflows = false;
            this.template = this.tool.toolbarTemplate;
            this.renderer.setStyle(this.element.nativeElement, 'visibility', 'display');
            this.renderer.setStyle(this.element.nativeElement, 'display', 'inline-block');
        }
        this.navigationService.register(this.tool);
        this.tool.navigationService.register(this.rendererService, this.location);
        this.tool.navigationService.toolbarNavigation = this.navigationService;
    }
    ngOnDestroy() {
        this.navigationService.unregister(this.tool);
        this.refreshSubscription.unsubscribe();
    }
    ngAfterViewInit() {
        // this.focusableElement = this.rendererService.findFocusable();
        if (this.resizable) {
            this.refresh();
        }
    }
    /**
     * @hidden
     */
    get width() {
        return this.tool.overflows ? 0 : outerWidth(this.element.nativeElement);
    }
    /**
     * @hidden
     */
    isDisplayed() {
        return this.element.nativeElement.style.display !== 'none';
    }
    /**
     * @hidden
     */
    refresh() {
        if (this.resizable) {
            if (this.location === 'toolbar') {
                this.renderer.setStyle(this.element.nativeElement, 'visibility', this.tool.visibility);
                this.renderer.setStyle(this.element.nativeElement, 'display', this.tool.toolbarDisplay);
            }
            else {
                this.renderer.setStyle(this.element.nativeElement, 'display', this.tool.overflowDisplay);
            }
        }
    }
    /**
     * @hidden
     */
    setAttribute(element, attr, value) {
        this.renderer.setAttribute(element, attr, value);
    }
}
ToolBarRendererComponent.decorators = [
    { type: Component, args: [{
                exportAs: 'kendoToolBarRenderer',
                providers: [RendererService],
                selector: 'kendo-toolbar-renderer',
                template: `
        <ng-container *ngIf="location === 'toolbar'">
            <ng-template [ngTemplateOutlet]="template"></ng-template>
        </ng-container>
        <ng-container *ngIf="location === 'overflow' && tool.responsive">
            <ng-template [ngTemplateOutlet]="template"></ng-template>
        </ng-container>
    `
            },] },
];
/** @nocollapse */
ToolBarRendererComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: RendererService },
    { type: RefreshService },
    { type: NavigationService }
];
ToolBarRendererComponent.propDecorators = {
    tool: [{ type: Input }],
    location: [{ type: Input }],
    resizable: [{ type: Input }],
    onFocus: [{ type: HostListener, args: ['focusin',] }]
};

const getInitialPopupSettings = (isRtl) => ({
    animate: true,
    anchorAlign: { horizontal: isRtl ? 'left' : 'right', vertical: 'bottom' },
    popupAlign: { horizontal: isRtl ? 'left' : 'right', vertical: 'top' }
});
/**
 * Represents the [Kendo UI ToolBar component for Angular]({% slug overview_toolbar %}).
 */
class ToolBarComponent {
    constructor(localization, popupService, refreshService, navigationService, element, cdr, zone) {
        this.localization = localization;
        this.popupService = popupService;
        this.refreshService = refreshService;
        this.navigationService = navigationService;
        this.element = element;
        this.cdr = cdr;
        this.zone = zone;
        /**
         * Hides the overflowing tools in a popup.
         */
        this.overflow = false;
        /**
         * Specifies the [`tabindex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) of the ToolBar.
         */
        this.tabindex = 0;
        /**
         * Fires when the overflow popup of the ToolBar is opened.
         */
        this.open = new EventEmitter();
        /**
         * Fires when the overflow popup of the ToolBar is closed.
         */
        this.close = new EventEmitter();
        this.hostClasses = true;
        this.direction = localization.rtl ? 'rtl' : 'ltr';
    }
    /**
     * @hidden
     */
    set resizable(value) {
        this.overflow = value;
    }
    get resizable() {
        return this.overflow;
    }
    /**
     * Configures the popup of the ToolBar drop-down list.
     *
     * The available options are:
     * - `animate: Boolean`&mdash;Controls the popup animation. By default, the open and close animations are enabled.
     * - `popupClass: String`&mdash;Specifies a list of CSS classes that are used to style the popup.
     */
    set popupSettings(settings) {
        this._popupSettings = Object.assign({}, getInitialPopupSettings(this.localization.rtl), settings);
    }
    get popupSettings() {
        return this._popupSettings || getInitialPopupSettings(this.localization.rtl);
    }
    /**
     * @hidden
     */
    set tabIndex(tabIndex) {
        this.tabindex = tabIndex;
    }
    get tabIndex() {
        return this.tabindex;
    }
    get appendTo() {
        const { appendTo } = this.popupSettings;
        if (!appendTo || appendTo === 'root') {
            return undefined;
        }
        return appendTo === 'component' ? this.container : appendTo;
    }
    set popupOpen(open) {
        if (this.popupOpen === open) {
            return;
        }
        const eventArgs = new PreventableEvent();
        if (open) {
            this.open.emit(eventArgs);
        }
        else {
            this.close.emit(eventArgs);
        }
        if (eventArgs.isDefaultPrevented()) {
            return;
        }
        this.toggle(open);
    }
    get popupOpen() {
        return this._open;
    }
    /**
     * @hidden
     */
    onFocus() {
        let focused = this.navigationService.focused;
        focused ? this.navigationService.focus(focused) : this.navigationService.focusFirst();
    }
    /**
     * @hidden
     */
    onKeyDown(event) {
        const prev = this.direction === 'ltr' ? event.keyCode === Keys.ArrowLeft : event.keyCode === Keys.ArrowRight;
        const next = this.direction === 'ltr' ? event.keyCode === Keys.ArrowRight : event.keyCode === Keys.ArrowLeft;
        if (prev) {
            event.preventDefault();
            this.navigationService.focusPrev();
        }
        if (next) {
            event.preventDefault();
            this.navigationService.focusNext();
        }
        if (event.keyCode === Keys.Tab) {
            this.element.nativeElement.blur();
        }
        this.navigationService.keydown.emit(event);
    }
    get getTabIndex() {
        return this.tabindex;
    }
    get getRole() {
        return 'toolbar';
    }
    get getDir() {
        return this.direction;
    }
    get resizableClass() {
        return this.overflow;
    }
    ngAfterViewInit() {
        if (this.overflow) {
            this.resizeSubscription = this.resizeSensor.resize.pipe(filter(() => this.overflow)).subscribe(() => {
                this.onResize();
            });
            // because of https://github.com/telerik/kendo-angular-buttons/pull/276
            this.zone.runOutsideAngular(() => setTimeout(() => this.onResize()));
            this.navigationService.overflowButton = this.overflowButton;
        }
    }
    ngOnInit() {
        this.localizationChangesSubscription = this.localization.changes.subscribe(({ rtl }) => (this.direction = rtl ? 'rtl' : 'ltr'));
        if (isDocumentAvailable()) {
            this.zone.runOutsideAngular(() => (this.closeOverflowSubscription = fromEvent(document, 'click')
                .pipe(filter(() => !!this.popupRef), filter((ev) => !this.popupRef.popup.instance.container.nativeElement.contains(ev.target)), filter((ev) => !this.overflowButton.nativeElement.contains(ev.target)))
                .subscribe(() => {
                this.zone.run(() => {
                    this.popupOpen = false;
                });
            })));
        }
    }
    ngOnDestroy() {
        if (this.resizeSubscription) {
            this.resizeSubscription.unsubscribe();
        }
        if (this.localizationChangesSubscription) {
            this.localizationChangesSubscription.unsubscribe();
        }
        if (this.closeOverflowSubscription) {
            this.closeOverflowSubscription.unsubscribe();
        }
        if (this.popupRef) {
            this.popupRef.close();
        }
    }
    /**
     * @hidden
     */
    showPopup() {
        this.popupOpen = !this.popupOpen;
    }
    /**
     * Toggles the visibility of the overflow popup.
     */
    toggle(popupOpen) {
        this._open = popupOpen !== undefined ? popupOpen : !this.popupOpen;
        if (this.popupRef) {
            this.popupRef.close();
            this.popupRef = null;
        }
        if (this.popupOpen) {
            this.popupRef = this.popupService.open({
                anchor: this.overflowButton,
                anchorAlign: this.popupSettings.anchorAlign,
                popupAlign: this.popupSettings.popupAlign,
                content: this.popupTemplate,
                appendTo: this.appendTo,
                animate: this.popupSettings.animate,
                popupClass: this.popupSettings.popupClass,
                positionMode: 'absolute'
            });
            this.popupRef.popupOpen.subscribe(this.onPopupOpen.bind(this));
            this.popupRef.popupClose.subscribe(this.onPopupClose.bind(this));
            this.popupRef.popupAnchorViewportLeave.subscribe(() => (this.popupOpen = false));
        }
    }
    /**
     * @hidden
     */
    onResize() {
        this.toggle(false);
        const containerWidth = innerWidth(this.element.nativeElement) - this.overflowAnchorWidth;
        this.shrink(containerWidth, this.childrenWidth);
        this.stretch(containerWidth, this.childrenWidth);
        this.cdr.detectChanges();
        this.resizeSensor.acceptSize();
    }
    /**
     * @hidden
     */
    onPopupOpen() {
        this.navigationService.moveFocusToPopup();
        this.navigationService.focusFirst();
    }
    /**
     * @hidden
     */
    onPopupClose() {
        this.navigationService.moveFocusToToolBar();
    }
    get displayAnchor() {
        return this.allTools.filter(t => t.overflows && t.responsive).length > 0 ? 'visible' : 'hidden';
    }
    get overflowAnchorWidth() {
        if (!this.overflow) {
            return 0;
        }
        if (!this.cachedOverflowAnchorWidth) {
            this.cachedOverflowAnchorWidth = outerWidth(this.overflowButton.nativeElement);
        }
        return this.cachedOverflowAnchorWidth;
    }
    get childrenWidth() {
        const width = this.renderedTools.reduce((totalWidth, tool) => tool.width + totalWidth, 0);
        return Math.ceil(width);
    }
    get visibleTools() {
        return this.allTools.filter((tool) => {
            return tool.overflows === false;
        });
    }
    get overflowTools() {
        return this.allTools.filter((tool) => {
            return tool.overflows === true;
        });
    }
    shrink(containerWidth, childrenWidth) {
        let width;
        if (containerWidth < childrenWidth) {
            for (var i = this.visibleTools.length - 1; i >= 0; i--) {
                if (containerWidth > childrenWidth) {
                    break;
                }
                else {
                    width = this.hideLastVisibleTool();
                    childrenWidth -= width;
                }
            }
        }
    }
    stretch(containerWidth, childrenWidth) {
        let width;
        if (containerWidth > childrenWidth) {
            for (var i = this.overflowTools.length - 1; i >= 0; i--) {
                width = this.showFirstHiddenTool(containerWidth, childrenWidth);
                if (width) {
                    childrenWidth += width;
                }
                else {
                    break;
                }
            }
        }
    }
    hideLastVisibleTool() {
        const tool = this.visibleTools[this.visibleTools.length - 1];
        const renderedElement = this.renderedTools.find((r) => {
            return r.tool === tool;
        });
        const width = renderedElement.width;
        tool.overflows = true;
        this.refreshService.refresh(tool);
        return width;
    }
    showFirstHiddenTool(containerWidth, childrenWidth) {
        const tool = this.overflowTools[0];
        const renderedElement = this.renderedTools.find(r => r.tool === tool);
        tool.overflows = false;
        tool.visibility = 'hidden';
        this.refreshService.refresh(tool);
        if (containerWidth > childrenWidth + renderedElement.width) {
            tool.visibility = 'visible';
            this.refreshService.refresh(tool);
        }
        else {
            tool.overflows = true;
            this.refreshService.refresh(tool);
        }
        return renderedElement.width; // returns 0 if `overflows` is true
    }
}
ToolBarComponent.decorators = [
    { type: Component, args: [{
                exportAs: 'kendoToolBar',
                providers: [
                    RefreshService,
                    NavigationService,
                    LocalizationService,
                    {
                        provide: L10N_PREFIX,
                        useValue: 'kendo.toolbar'
                    }
                ],
                selector: 'kendo-toolbar',
                template: `
        <ng-container *ngFor="let tool of allTools; let index = index">
            <kendo-toolbar-renderer [location]="'toolbar'" [resizable]="overflow" [tool]="tool"></kendo-toolbar-renderer>
        </ng-container>
        <button
            #overflowButton
            tabindex="-1"
            *ngIf="overflow"
            [style.visibility]="displayAnchor"
            class="k-overflow-anchor k-button"
            (click)="showPopup()"
        >
            <span class="k-icon k-i-more-vertical"></span>
        </button>
        <ng-template #popupTemplate>
            <ul class="k-overflow-container k-list-container k-reset">
                <ng-container *ngFor="let tool of allTools; let index = index">
                    <li class="k-item">
                        <kendo-toolbar-renderer [location]="'overflow'" [resizable]="overflow" [tool]="tool"></kendo-toolbar-renderer>
                    </li>
                </ng-container>
            </ul>
        </ng-template>
        <ng-container #container></ng-container>
        <kendo-resize-sensor *ngIf="overflow" [rateLimit]="1000" #resizeSensor></kendo-resize-sensor>
    `
            },] },
];
/** @nocollapse */
ToolBarComponent.ctorParameters = () => [
    { type: LocalizationService },
    { type: PopupService },
    { type: RefreshService },
    { type: NavigationService },
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: NgZone }
];
ToolBarComponent.propDecorators = {
    overflow: [{ type: Input }],
    resizable: [{ type: Input }],
    popupSettings: [{ type: Input }],
    tabindex: [{ type: Input }],
    tabIndex: [{ type: Input, args: ['tabIndex',] }],
    open: [{ type: Output }],
    close: [{ type: Output }],
    allTools: [{ type: ContentChildren, args: [ToolBarToolComponent,] }],
    overflowButton: [{ type: ViewChild, args: ['overflowButton',] }],
    popupTemplate: [{ type: ViewChild, args: ['popupTemplate', { static: true },] }],
    resizeSensor: [{ type: ViewChild, args: ['resizeSensor',] }],
    container: [{ type: ViewChild, args: ['container', { read: ViewContainerRef },] }],
    renderedTools: [{ type: ViewChildren, args: [ToolBarRendererComponent,] }],
    hostClasses: [{ type: HostBinding, args: ['class.k-widget',] }, { type: HostBinding, args: ['class.k-toolbar',] }],
    onFocus: [{ type: HostListener, args: ['focus',] }],
    onKeyDown: [{ type: HostListener, args: ['keydown', ['$event'],] }],
    getTabIndex: [{ type: HostBinding, args: ['attr.tabindex',] }],
    getRole: [{ type: HostBinding, args: ['attr.role',] }],
    getDir: [{ type: HostBinding, args: ['attr.dir',] }],
    resizableClass: [{ type: HostBinding, args: ['class.k-toolbar-resizable',] }]
};

/**
 * @hidden
 */
class SingleFocusableNavigationService {
    register(rendererService, location) {
        if (location === 'toolbar') {
            this.toolbarRenderer = rendererService;
        }
        else {
            this.overflowRenderer = rendererService;
        }
    }
    canFocus() {
        const element = this.findFocusable();
        return element && element.offsetParent && !this.hasFocus(element) && !element.disabled;
    }
    focus() {
        if (this.canFocus()) {
            const element = this.findFocusable();
            this.setAttribute(element, 'tabindex', '0');
            element.focus();
        }
    }
    defocus() {
        const element = this.findFocusable();
        if (element) {
            this.setAttribute(element, 'tabindex', '-1');
            if (this.hasFocus(element)) {
                element.blur();
            }
        }
    }
    hasFocus(element) {
        return document.activeElement !== element && closest(document.activeElement, e => e === element);
    }
    findFocusable() {
        return this.toolbarNavigation.isPopupFocused ? this.overflowRenderer.findFocusable() : this.toolbarRenderer.findFocusable();
    }
    setAttribute(element, attr, value) {
        if (this.toolbarNavigation.isPopupFocused) {
            this.overflowRenderer.setAttribute(element, attr, value);
        }
        else {
            this.toolbarRenderer.setAttribute(element, attr, value);
        }
    }
}
SingleFocusableNavigationService.decorators = [
    { type: Injectable },
];

/**
 * Represents the [Kendo UI ToolBar Button tool for Angular]({% slug controltypes_toolbar %}#toc-buttons).
 */
class ToolBarButtonComponent extends ToolBarToolComponent {
    constructor() {
        super();
        // showText and showIcon showIcon should be declared first
        /**
         * Specifies where button text should be displayed
         */
        this.showText = 'both';
        /**
         * Specifies where button icon should be displayed
         */
        this.showIcon = 'both';
        /**
         * Provides visual styling that indicates if the Button is active
         * ([see example]({% slug controltypes_toolbar %}#toc-toggle-buttons)).
         * By default, `toggleable` is set to `false`.
         */
        this.toggleable = false;
        /**
         * Adds visual weight to the Button and makes it primary
         * ([see example]({% slug controltypes_toolbar %}#toc-buttons)).
         */
        this.primary = false;
        /**
         * Changes the visual appearance by using alternative styling options
         * ([see example]({% slug controltypes_toolbar %}#toc-buttons)).
         *
         * The available values are:
         * * `bare`
         * * `flat`
         * * `outline`
         */
        this.look = 'default';
        /**
         * Sets the selected state of the Button.
         */
        this.selected = false;
        /**
         * Fires each time the Button is clicked.
         */
        this.click = new EventEmitter();
        /**
         * Fires each time the selected state of a Toggle Button is changed.
         * The event argument is the new selected state (Boolean).
         */
        this.selectedChange = new EventEmitter();
        this.internalState = { selected: undefined };
        this.toolbarOptions = {
            text: '',
            icon: '',
            iconClass: '',
            imageUrl: ''
        };
        this.overflowOptions = {
            text: '',
            icon: '',
            iconClass: '',
            imageUrl: ''
        };
        this.navigationService = new SingleFocusableNavigationService();
    }
    /**
     * Specifies the text of the Button ([see example]({% slug controltypes_toolbar %}#toc-buttons)).
     */
    set text(text) {
        this.toolbarOptions.text = getValueForLocation(text, this.showText, false);
        this.overflowOptions.text = getValueForLocation(text, this.showText, true);
    }
    /**
     * @hidden
     */
    get togglable() {
        return this.toggleable;
    }
    set togglable(value) {
        this.toggleable = value;
    }
    /**
     * Defines the name for an existing icon in a Kendo UI theme
     * ([see example]({% slug controltypes_toolbar %}#toc-buttons)).
     * The icon is rendered inside the Button by a `span.k-icon` element.
     */
    set icon(icon) {
        this.toolbarOptions.icon = getValueForLocation(icon, this.showIcon, false);
        this.overflowOptions.icon = getValueForLocation(icon, this.showIcon, true);
    }
    /**
     * Defines a CSS class&mdash;or multiple classes separated by spaces&mdash;
     * which are applied to a `span` element inside the Button. Allows the usage of custom icons.
     */
    set iconClass(iconClass) {
        this.toolbarOptions.iconClass = getValueForLocation(iconClass, this.showIcon, false);
        this.overflowOptions.iconClass = getValueForLocation(iconClass, this.showIcon, true);
    }
    /**
     * Defines a URL which is used for an `img` element inside the Button.
     * The URL can be relative or absolute. If relative, it is evaluated with relation to the web page URL.
     */
    set imageUrl(imageUrl) {
        this.toolbarOptions.imageUrl = getValueForLocation(imageUrl, this.showIcon, false);
        this.overflowOptions.imageUrl = getValueForLocation(imageUrl, this.showIcon, true);
    }
    ngOnChanges(changes) {
        if (isChanged('selected', changes)) {
            this.internalState.selected = this.selected;
        }
    }
    selectedChangeHandler(state) {
        this.internalState.selected = state;
        this.selectedChange.emit(state);
    }
}
ToolBarButtonComponent.decorators = [
    { type: Component, args: [{
                exportAs: 'kendoToolBarButton',
                // tslint:disable-next-line:no-forward-ref
                providers: [{ provide: ToolBarToolComponent, useExisting: forwardRef(() => ToolBarButtonComponent) }],
                selector: 'kendo-toolbar-button',
                template: `
        <ng-template #toolbarTemplate>
            <button
                #toolbarButton
                tabindex="-1"
                type="button"
                kendoButton
                [ngStyle]="style"
                [ngClass]="className"
                [attr.title]="title"
                [disabled]="disabled"
                [toggleable]="toggleable"
                [primary]="primary"
                [selected]="internalState.selected"
                [icon]="toolbarOptions.icon"
                [iconClass]="toolbarOptions.iconClass"
                [imageUrl]="toolbarOptions.imageUrl"
                [look]="look"
                (click)="click.emit($event)"
                (selectedChange)="selectedChangeHandler($event)"
            >
                {{ toolbarOptions.text }}
            </button>
        </ng-template>
        <ng-template #popupTemplate>
            <button
                #overflowButton
                tabindex="-1"
                type="button"
                kendoButton
                class="k-overflow-button"
                [ngStyle]="style"
                [ngClass]="className"
                [attr.title]="title"
                [disabled]="disabled"
                [toggleable]="toggleable"
                [primary]="primary"
                [selected]="internalState.selected"
                [icon]="overflowOptions.icon"
                [iconClass]="overflowOptions.iconClass"
                [imageUrl]="overflowOptions.imageUrl"
                [look]="look"
                (click)="click.emit($event)"
                (selectedChange)="selectedChangeHandler($event)"
            >
                {{ overflowOptions.text }}
            </button>
        </ng-template>
    `
            },] },
];
/** @nocollapse */
ToolBarButtonComponent.ctorParameters = () => [];
ToolBarButtonComponent.propDecorators = {
    showText: [{ type: Input }],
    showIcon: [{ type: Input }],
    text: [{ type: Input }],
    style: [{ type: Input }],
    className: [{ type: Input }],
    title: [{ type: Input }],
    disabled: [{ type: Input }],
    toggleable: [{ type: Input }],
    togglable: [{ type: Input }],
    primary: [{ type: Input }],
    look: [{ type: Input }],
    selected: [{ type: Input }],
    icon: [{ type: Input }],
    iconClass: [{ type: Input }],
    imageUrl: [{ type: Input }],
    click: [{ type: Output }],
    selectedChange: [{ type: Output }],
    toolbarTemplate: [{ type: ViewChild, args: ['toolbarTemplate', { static: true },] }],
    popupTemplate: [{ type: ViewChild, args: ['popupTemplate', { static: true },] }],
    button: [{ type: ViewChild, args: ['toolbarButton', { read: Button },] }]
};

/**
 * @hidden
 */
class ButtonGroupNavigationService {
    set toolbarNavigation(service) {
        this._navigationService = service;
        if (this.keydownSubscription) {
            this.keydownSubscription.unsubscribe();
        }
        this.keydownSubscription = this._navigationService.keydown.subscribe(this.onKeydown.bind(this));
    }
    get toolbarNavigation() {
        return this._navigationService;
    }
    ngOnDestroy() {
        if (this.keydownSubscription) {
            this.keydownSubscription.unsubscribe();
        }
    }
    register(rendererService, location) {
        if (location === 'toolbar') {
            this.toolbarRenderer = rendererService;
        }
        else {
            this.overflowRenderer = rendererService;
        }
    }
    canFocus() {
        return true;
    }
    focus(focusPrev) {
        const buttons = this.buttons();
        const button = focusPrev ? buttons[buttons.length - 1] : buttons[0];
        this.toolbarNavigation.lock();
        this.renderer().setAttribute(button, 'tabindex', '0');
        button.focus();
        this.current = button;
        this.isActive = true;
    }
    defocus() {
        const buttons = this.buttons();
        buttons.forEach((button) => {
            this.renderer().setAttribute(button, 'tabindex', '-1');
            if (this.hasFocus(button)) {
                button.blur();
            }
        });
        this.current = undefined;
        this.isActive = false;
    }
    hasFocus(element) {
        return document.activeElement !== element;
    }
    buttons() {
        return Array.prototype.slice.call(this.renderer().querySelectorAll('.k-button'));
    }
    renderer() {
        return this.toolbarNavigation.isPopupFocused ? this.overflowRenderer : this.toolbarRenderer;
    }
    onKeydown(event) {
        if (!this.isActive) {
            return;
        }
        if (event.keyCode === Keys.ArrowLeft) {
            if (this.buttons().indexOf(this.current) === 0) {
                this.toolbarNavigation.unlock();
                this.toolbarNavigation.focusPrev();
            }
        }
        if (event.keyCode === Keys.ArrowRight) {
            if (this.buttons().indexOf(this.current) === this.buttons().length - 1) {
                this.toolbarNavigation.unlock();
                this.toolbarNavigation.focusNext();
            }
        }
        this.current = this.buttons().find((button) => {
            return button.tabIndex === 0;
        });
    }
}
ButtonGroupNavigationService.decorators = [
    { type: Injectable },
];

/**
 * Represents the Kendo UI Toolbar ButtonGroup for Angular.
 */
class ToolBarButtonGroupComponent extends ToolBarToolComponent {
    constructor() {
        super();
        /**
         * By default, the selection mode of the ButtonGroup is set to `multiple`.
         */
        this.selection = 'multiple';
        /**
         * Changes the visual appearance by using alternative styling options.
         * The `look` property of the ButtonGroup takes precedence over the `look` property
         * of the individual buttons that are part of the group.
         *
         * The available values are:
         * * `bare`
         * * `flat`
         * * `outline`
         */
        this.look = 'default';
        this.navigationService = new ButtonGroupNavigationService();
    }
    selectedChangeHandler(state, button) {
        button.selected = state;
        button.selectedChange.emit(state);
    }
}
ToolBarButtonGroupComponent.decorators = [
    { type: Component, args: [{
                exportAs: 'kendoToolBarButtonGroup',
                // tslint:disable-next-line:no-forward-ref
                providers: [{ provide: ToolBarToolComponent, useExisting: forwardRef(() => ToolBarButtonGroupComponent) }],
                selector: 'kendo-toolbar-buttongroup',
                template: `
        <ng-template #toolbarTemplate>
            <kendo-buttongroup [tabIndex]="tabIndex" [selection]="selection" [disabled]="disabled" [look]="look" [width]="width">
                <button
                    type="button"
                    kendoButton
                    *ngFor="let button of buttons"
                    [ngStyle]="button.style"
                    [ngClass]="button.className"
                    [attr.title]="button.title"
                    [disabled]="button.disabled"
                    [togglable]="button.togglable"
                    [primary]="button.primary"
                    [selected]="button.selected"
                    [icon]="button.toolbarOptions.icon"
                    [iconClass]="button.toolbarOptions.iconClass"
                    [imageUrl]="button.toolbarOptions.imageUrl"
                    (click)="button.click.emit($event)"
                    (selectedChange)="selectedChangeHandler($event, button)"
                >
                    {{ button.toolbarOptions.text }}
                </button>
            </kendo-buttongroup>
        </ng-template>
        <ng-template #popupTemplate>
            <kendo-buttongroup
                class="k-overflow-button"
                [tabIndex]="tabIndex"
                [selection]="selection"
                [disabled]="disabled"
                [look]="look"
                [width]="width"
            >
                <button
                    type="button"
                    kendoButton
                    class="k-overflow-button"
                    *ngFor="let button of buttons"
                    [ngStyle]="button.style"
                    [ngClass]="button.className"
                    [attr.title]="button.title"
                    [disabled]="button.disabled"
                    [togglable]="button.togglable"
                    [primary]="button.primary"
                    [selected]="button.selected"
                    [icon]="button.overflowOptions.icon"
                    [iconClass]="button.overflowOptions.iconClass"
                    [imageUrl]="button.overflowOptions.imageUrl"
                    (click)="button.click.emit($event)"
                    (selectedChange)="selectedChangeHandler($event, button)"
                >
                    {{ button.overflowOptions.text }}
                </button>
            </kendo-buttongroup>
        </ng-template>
    `
            },] },
];
/** @nocollapse */
ToolBarButtonGroupComponent.ctorParameters = () => [];
ToolBarButtonGroupComponent.propDecorators = {
    disabled: [{ type: Input }],
    selection: [{ type: Input }],
    width: [{ type: Input }],
    look: [{ type: Input }],
    toolbarTemplate: [{ type: ViewChild, args: ['toolbarTemplate', { static: true },] }],
    popupTemplate: [{ type: ViewChild, args: ['popupTemplate', { static: true },] }],
    buttons: [{ type: ContentChildren, args: [forwardRef(() => ToolBarButtonComponent),] }]
};

/**
 * @hidden
 */
class DropdownButtonNavigationService {
    constructor(component) {
        this.component = component;
    }
    register(rendererService, location) {
        if (location === 'toolbar') {
            this.toolbarRenderer = rendererService;
        }
        else {
            this.overflowRenderer = rendererService;
        }
    }
    canFocus() {
        return !this.component.disabled;
    }
    hasFocus() {
        return this.component.focused;
    }
    focus() {
        if (this.canFocus()) {
            this.component.focus();
        }
    }
    defocus() {
        this.component.blur();
    }
}

/**
 * Represents the [Kendo UI ToolBar DropDownButton for Angular]({% slug controltypes_toolbar %}#toc-dropdownbuttons).
 */
class ToolBarDropDownButtonComponent extends ToolBarToolComponent {
    constructor() {
        super();
        // showText and showIcon showIcon should be declared first
        /**
         * Defines the location of the button text that will be displayed.
         */
        this.showText = 'both';
        /**
         * Defines the location of the button icon that will be displayed.
         */
        this.showIcon = 'both';
        /**
         * Fires each time the user clicks a DropDownButton item.
         * The event data contains the data item that is bound to the clicked list item.
         */
        this.itemClick = new EventEmitter();
        this.toolbarOptions = {
            text: '',
            icon: '',
            iconClass: '',
            imageUrl: ''
        };
        this.overflowOptions = {
            text: '',
            icon: '',
            iconClass: '',
            imageUrl: ''
        };
        this._popupSettings = { animate: true, popupClass: '' };
    }
    /**
     * Sets the text of the DropDownButton
     * ([see example]({% slug controltypes_toolbar %}#toc-dropdownbuttons).
     */
    set text(text) {
        this.toolbarOptions.text = getValueForLocation(text, this.showText, false);
        this.overflowOptions.text = getValueForLocation(text, this.showText, true);
    }
    /**
     * Defines an icon that will be rendered next to the button text.
     */
    set icon(icon) {
        this.toolbarOptions.icon = getValueForLocation(icon, this.showIcon, false);
        this.overflowOptions.icon = getValueForLocation(icon, this.showIcon, true);
    }
    /**
     * Defines an icon with a custom CSS class that will be rendered next to the button text.
     */
    set iconClass(iconClass) {
        this.toolbarOptions.iconClass = getValueForLocation(iconClass, this.showIcon, false);
        this.overflowOptions.iconClass = getValueForLocation(iconClass, this.showIcon, true);
    }
    /**
     * Defines the location of an image that will be displayed next to the button text.
     */
    set imageUrl(imageUrl) {
        this.toolbarOptions.imageUrl = getValueForLocation(imageUrl, this.showIcon, false);
        this.overflowOptions.imageUrl = getValueForLocation(imageUrl, this.showIcon, true);
    }
    /**
     * Configures the popup of the DropDownButton.
     *
     * The available options are:
     * - `animate:Boolean`&mdash;Controls the popup animation. By default, the open and close animations are enabled.
     * - `popupClass:String`&mdash;Specifies a list of CSS classes that are used to style the popup.
     */
    set popupSettings(settings) {
        this._popupSettings = Object.assign({ animate: true, popupClass: '' }, settings);
    }
    get popupSettings() {
        return this._popupSettings;
    }
    /**
     * Sets the data of the DropDownButton
     * ([see example]({% slug controltypes_toolbar %}#toc-dropdownbuttons)).
     *
     * > The data has to be provided in an array-like list.
     */
    set data(data) {
        this._data = data || [];
    }
    get data() {
        if (!this._data) {
            this.data = [];
        }
        return this._data;
    }
    ngAfterViewInit() {
        this.navigationService = new DropdownButtonNavigationService(this.dropdwonButtonComponent);
    }
}
ToolBarDropDownButtonComponent.decorators = [
    { type: Component, args: [{
                exportAs: 'kendoToolBarDropDownButton',
                // tslint:disable-next-line:no-forward-ref
                providers: [{ provide: ToolBarToolComponent, useExisting: forwardRef(() => ToolBarDropDownButtonComponent) }],
                selector: 'kendo-toolbar-dropdownbutton',
                template: `
        <ng-template #toolbarTemplate>
            <kendo-dropdownbutton
                [icon]="toolbarOptions.icon"
                [iconClass]="toolbarOptions.iconClass"
                [imageUrl]="toolbarOptions.imageUrl"
                [disabled]="disabled"
                [tabIndex]="tabIndex"
                [data]="data"
                [textField]="textField"
                [popupSettings]="popupSettings"
                (itemClick)="itemClick.emit($event)"
            >
                {{ toolbarOptions.text }}
            </kendo-dropdownbutton>
        </ng-template>
        <ng-template #popupTemplate>
            <button
                type="button"
                tabindex="-1"
                kendoButton
                class="k-overflow-button"
                [disabled]="true"
                [icon]="overflowOptions.icon"
                [iconClass]="overflowOptions.iconClass"
                [imageUrl]="overflowOptions.imageUrl"
                (click)="itemClick.emit($event)"
            >
                {{ overflowOptions.text }}
            </button>
            <kendo-toolbar-buttonlist [data]="data" [textField]="textField" (itemClick)="itemClick.emit($event)">
            </kendo-toolbar-buttonlist>
        </ng-template>
    `
            },] },
];
/** @nocollapse */
ToolBarDropDownButtonComponent.ctorParameters = () => [];
ToolBarDropDownButtonComponent.propDecorators = {
    showText: [{ type: Input }],
    showIcon: [{ type: Input }],
    text: [{ type: Input }],
    icon: [{ type: Input }],
    iconClass: [{ type: Input }],
    imageUrl: [{ type: Input }],
    popupSettings: [{ type: Input }],
    textField: [{ type: Input }],
    disabled: [{ type: Input }],
    data: [{ type: Input }],
    itemClick: [{ type: Output }],
    toolbarTemplate: [{ type: ViewChild, args: ['toolbarTemplate', { static: true },] }],
    popupTemplate: [{ type: ViewChild, args: ['popupTemplate', { static: true },] }],
    dropdownButton: [{ type: ViewChild, args: ['dropdownButton', { read: ElementRef },] }],
    dropdwonButtonComponent: [{ type: ViewChild, args: [DropDownButtonComponent,] }]
};

/**
 * Represents the [Kendo UI ToolBar SplitButton for Angular]({% slug controltypes_toolbar %}#toc-splitbuttons).
 */
class ToolBarSplitButtonComponent extends ToolBarToolComponent {
    constructor() {
        super();
        // showText and showIcon showIcon should be declared first
        /**
         * Specifies where button text should be displayed
         */
        this.showText = 'both';
        /**
         * Specifies where button icon should be displayed
         */
        this.showIcon = 'both';
        /**
         * Configures the text field of the button-list popup.
         */
        this.textField = 'text';
        /**
         * Fires each time the user clicks the main button.
         */
        this.buttonClick = new EventEmitter();
        /**
         * Fires each time the user clicks the drop-down list.
         * The event data contains the data item that is bound to the clicked list item.
         */
        this.itemClick = new EventEmitter();
        this.toolbarOptions = {
            text: '',
            icon: '',
            iconClass: '',
            imageUrl: ''
        };
        this.overflowOptions = {
            text: '',
            icon: '',
            iconClass: '',
            imageUrl: ''
        };
        this._popupSettings = { animate: true, popupClass: '' };
        this.navigationService = new SingleFocusableNavigationService();
    }
    /**
     * Sets the text of the SplitButton ([see example]({% slug controltypes_toolbar %}#toc-splitbuttons).
     */
    set text(text) {
        this.toolbarOptions.text = getValueForLocation(text, this.showText, false);
        this.overflowOptions.text = getValueForLocation(text, this.showText, true);
    }
    /**
     * Defines the icon that will be rendered next to the button text
     * ([see example]({% slug controltypes_toolbar %}#toc-splitbuttons)).
     */
    set icon(icon) {
        this.toolbarOptions.icon = getValueForLocation(icon, this.showIcon, false);
        this.overflowOptions.icon = getValueForLocation(icon, this.showIcon, true);
    }
    /**
     * Defines an icon with a custom CSS class that will be rendered next to the button text.
     */
    set iconClass(iconClass) {
        this.toolbarOptions.iconClass = getValueForLocation(iconClass, this.showIcon, false);
        this.overflowOptions.iconClass = getValueForLocation(iconClass, this.showIcon, true);
    }
    /**
     * Defines the location of an image that will be displayed next to the button text.
     */
    set imageUrl(imageUrl) {
        this.toolbarOptions.imageUrl = getValueForLocation(imageUrl, this.showIcon, false);
        this.overflowOptions.imageUrl = getValueForLocation(imageUrl, this.showIcon, true);
    }
    /**
     * Configures the popup of the SplitButton.
     *
     * The available options are:
     * - `animate:Boolean`&mdash;Controls the popup animation. By default, the open and close animations are enabled.
     * - `popupClass:String`&mdash;Specifies a list of CSS classes that are used to style the popup.
     */
    set popupSettings(value) {
        this._popupSettings = value;
    }
    get popupSettings() {
        if (!this._popupSettings) {
            this._popupSettings = { animate: true, popupClass: '' };
        }
        return this._popupSettings;
    }
    /**
     * Sets the data of the SplitButton ([see example]({% slug controltypes_toolbar %}#toc-splitbuttons)).
     *
     * > The data has to be provided in an array-like list.
     */
    set data(data) {
        this._data = data || [];
    }
    get data() {
        if (!this._data) {
            this.data = [];
        }
        return this._data;
    }
}
ToolBarSplitButtonComponent.decorators = [
    { type: Component, args: [{
                exportAs: 'kendoToolBarSplitButton',
                // tslint:disable-next-line:no-forward-ref
                providers: [{ provide: ToolBarToolComponent, useExisting: forwardRef(() => ToolBarSplitButtonComponent) }],
                selector: 'kendo-toolbar-splitbutton',
                template: `
        <ng-template #toolbarTemplate>
            <kendo-splitbutton
                [data]="data"
                [text]="toolbarOptions.text"
                [icon]="toolbarOptions.icon"
                [iconClass]="toolbarOptions.iconClass"
                [imageUrl]="toolbarOptions.imageUrl"
                [disabled]="disabled"
                [tabIndex]="tabIndex"
                [textField]="textField"
                [popupSettings]="popupSettings"
                (buttonClick)="buttonClick.emit($event)"
                (itemClick)="itemClick.emit($event)"
            >
            </kendo-splitbutton>
        </ng-template>
        <ng-template #popupTemplate>
            <button
                type="button"
                tabindex="-1"
                kendoButton
                class="k-overflow-button"
                [disabled]="disabled"
                [icon]="overflowOptions.icon"
                [iconClass]="overflowOptions.iconClass"
                [imageUrl]="overflowOptions.imageUrl"
            >
                {{ overflowOptions.text }}
            </button>
            <kendo-toolbar-buttonlist [data]="data" [textField]="textField" (itemClick)="itemClick.emit($event)">
            </kendo-toolbar-buttonlist>
        </ng-template>
    `
            },] },
];
/** @nocollapse */
ToolBarSplitButtonComponent.ctorParameters = () => [];
ToolBarSplitButtonComponent.propDecorators = {
    showText: [{ type: Input }],
    showIcon: [{ type: Input }],
    text: [{ type: Input }],
    icon: [{ type: Input }],
    iconClass: [{ type: Input }],
    imageUrl: [{ type: Input }],
    disabled: [{ type: Input }],
    popupSettings: [{ type: Input }],
    textField: [{ type: Input }],
    data: [{ type: Input }],
    buttonClick: [{ type: Output }],
    itemClick: [{ type: Output }],
    toolbarTemplate: [{ type: ViewChild, args: ['toolbarTemplate', { static: true },] }],
    popupTemplate: [{ type: ViewChild, args: ['popupTemplate', { static: true },] }],
    splitButton: [{ type: ViewChild, args: ['splitButton', { read: ElementRef },] }]
};

/**
 * Represents the [Kendo UI ToolBar Separator for Angular]({% slug controltypes_toolbar %}#toc-separators).
 */
class ToolBarSeparatorComponent extends ToolBarToolComponent {
    constructor() {
        super();
        this.navigationService = new ToolNavigationService();
    }
    ngAfterViewInit() {
        if (!this.popupTemplate) {
            this.popupTemplate = this.toolbarTemplate;
        }
    }
}
ToolBarSeparatorComponent.decorators = [
    { type: Component, args: [{
                exportAs: 'kendoToolBarSeparator',
                // tslint:disable-next-line:no-forward-ref
                providers: [{ provide: ToolBarToolComponent, useExisting: forwardRef(() => ToolBarSeparatorComponent) }],
                selector: 'kendo-toolbar-separator',
                template: `
        <ng-template #toolbarTemplate>
            <div class="k-separator"></div>
        </ng-template>
    `
            },] },
];
/** @nocollapse */
ToolBarSeparatorComponent.ctorParameters = () => [];
ToolBarSeparatorComponent.propDecorators = {
    toolbarTemplate: [{ type: ViewChild, args: ['toolbarTemplate', { static: true },] }],
    popupTemplate: [{ type: ViewChild, args: ['popupTemplate', { static: true },] }],
    separator: [{ type: ViewChild, args: ['separator',] }]
};

/**
 * @hidden
 */
class ToolBarButtonListComponent extends ToolBarToolComponent {
    constructor() {
        super(...arguments);
        this.itemClick = new EventEmitter();
    }
    getText(dataItem) {
        if (dataItem) {
            return this.textField ? dataItem[this.textField] : dataItem.text || dataItem;
        }
        return undefined;
    }
    onClick(item) {
        const dataItem = this.data[this.data.indexOf(item)];
        if (item.click) {
            item.click(dataItem);
        }
        this.itemClick.emit(dataItem);
    }
}
ToolBarButtonListComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-toolbar-buttonlist',
                template: `
        <button
            type="button"
            tabindex="-1"
            kendoButton
            style="padding-left: 16px"
            class="k-overflow-button"
            *ngFor="let item of data"
            [disabled]="item.disabled"
            [icon]="item.icon"
            [iconClass]="item.iconClass"
            [imageUrl]="item.imageUrl"
            (click)="onClick(item)"
        >
            {{ getText(item) }}
        </button>
    `
            },] },
];
ToolBarButtonListComponent.propDecorators = {
    data: [{ type: Input }],
    textField: [{ type: Input }],
    itemClick: [{ type: Output }]
};

const TOOLBAR_TOOLS = [
    ToolBarToolComponent,
    ToolBarButtonComponent,
    ToolBarButtonGroupComponent,
    ToolBarDropDownButtonComponent,
    ToolBarSplitButtonComponent,
    ToolBarSeparatorComponent
];
const TOOLBAR_COMMON = [
    ToolBarRendererComponent,
    ToolBarButtonListComponent
];
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }}) definition for the ToolBar component.
 *
 * The package exports:
 * - `ToolBarComponent`&mdash;The ToolBarComponent class.
 * - `ToolBarToolComponent`&mdash;The base Tool component class.
 * - `ToolBarButtonComponent`&mdash;The Button Tool component class.
 * - `ToolBarButtonGroupComponent`&mdash;The ButtonGroup Tool component class.
 * - `ToolBarDropDownButtonComponent`&mdash;The DropDownButton Tool component class.
 * - `ToolBarSplitButtonComponent`&mdash;The SplitButton Tool component class.
 * - `ToolBarSeparatorComponent`&mdash;The Separator Tool component class.
 */
class ToolBarModule {
}
ToolBarModule.decorators = [
    { type: NgModule, args: [{
                declarations: [ToolBarComponent, TOOLBAR_TOOLS, TOOLBAR_COMMON],
                exports: [ToolBarComponent, TOOLBAR_TOOLS],
                imports: [CommonModule, ButtonsModule, PopupModule, ResizeSensorModule]
            },] },
];

/**
 * Generated bundle index. Do not edit.
 */

export { NavigationService, RefreshService, ToolBarRendererComponent, RendererService, ToolBarButtonListComponent, ToolBarComponent, ToolBarToolComponent, ToolBarButtonComponent, ToolBarButtonGroupComponent, ToolBarDropDownButtonComponent, ToolBarSplitButtonComponent, ToolBarSeparatorComponent, ToolBarModule };
