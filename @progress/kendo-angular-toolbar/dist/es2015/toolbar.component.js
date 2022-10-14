/**-----------------------------------------------------------------------------------------
* Copyright © 2019 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, HostBinding, ViewChild, TemplateRef, ElementRef, QueryList, ContentChildren, Input, ChangeDetectorRef, ViewChildren, HostListener, Output, EventEmitter, ViewContainerRef, NgZone } from '@angular/core';
import { PopupService } from '@progress/kendo-angular-popup';
import { ResizeSensorComponent } from '@progress/kendo-angular-common';
import { LocalizationService, L10N_PREFIX } from '@progress/kendo-angular-l10n';
import { RefreshService } from './refresh.service';
import { NavigationService } from './navigation.service';
import { ToolBarToolComponent } from './tools/toolbar-tool.component';
import { outerWidth, innerWidth } from './util';
import { Keys } from '@progress/kendo-angular-common';
import { PreventableEvent } from './common/preventable-event';
import { ToolBarRendererComponent } from './renderer.component';
import { fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';
import { isDocumentAvailable } from '@progress/kendo-angular-common';
const getInitialPopupSettings = (isRtl) => ({
    animate: true,
    anchorAlign: { horizontal: isRtl ? 'left' : 'right', vertical: 'bottom' },
    popupAlign: { horizontal: isRtl ? 'left' : 'right', vertical: 'top' }
});
const ɵ0 = getInitialPopupSettings;
/**
 * Represents the [Kendo UI ToolBar component for Angular]({% slug overview_toolbar %}).
 */
export class ToolBarComponent {
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
export { ɵ0 };
