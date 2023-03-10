/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Host, HostBinding, HostListener, Input } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { DraggableDirective, Keys } from '@progress/kendo-angular-common';
import { SplitterService } from './splitter.service';
import { Subscription, of } from 'rxjs';
import { delay, filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';
const stopPropagation = ({ originalEvent: event }) => {
    event.stopPropagation();
    event.preventDefault();
};
const ɵ0 = stopPropagation;
const preventOnDblClick = release => mouseDown => of(mouseDown).pipe(delay(150), takeUntil(release));
const ɵ1 = preventOnDblClick;
const classFromObject = classes => Object.keys(classes).filter(c => classes[c]).join(' ');
const ɵ2 = classFromObject;
const createMoveStream = (draggable) => mouseDown => draggable.kendoDrag
    .pipe(takeUntil(draggable.kendoRelease), map(({ pageX, pageY }) => ({
    originalX: mouseDown.pageX,
    originalY: mouseDown.pageY,
    pageX,
    pageY
})));
const ɵ3 = createMoveStream;
/**
 * @hidden
 */
export class SplitterBarComponent {
    constructor(draggable, splitter, localization) {
        this.draggable = draggable;
        this.splitter = splitter;
        this.localization = localization;
        this.orientation = 'horizontal';
        this.index = 0;
        this.ariaRole = 'separator';
        this.focused = false;
        this.subscriptions = new Subscription();
    }
    get direction() {
        return this.localization.rtl ? 'rtl' : 'ltr';
    }
    get tabIndex() {
        return this.splitter.isStatic(this.index) ? -1 : 0;
    }
    get hostClasses() {
        const isHorizontal = this.orientation === 'horizontal';
        const isDraggable = this.splitter.isDraggable(this.index);
        const isStatic = this.splitter.isStatic(this.index);
        return classFromObject({
            'k-state-focused': this.focused,
            'k-splitbar': true,
            'k-splitbar-horizontal': isHorizontal,
            'k-splitbar-vertical': !isHorizontal,
            'k-splitbar-draggable-horizontal': isHorizontal && isDraggable,
            'k-splitbar-draggable-vertical': !isHorizontal && isDraggable,
            'k-splitbar-static-horizontal': isHorizontal && isStatic,
            'k-splitbar-static-vertical': !isHorizontal && isStatic
        });
    }
    get touchAction() {
        if (this.splitter.isDraggable(this.index)) {
            return 'none';
        }
    }
    get order() {
        return 2 * this.index + 1;
    }
    collapseAny() {
        if (this.expandLast) {
            this.toggleNext();
        }
        else {
            this.tryToggleNearest();
        }
    }
    onFocusIn() {
        this.focused = true;
    }
    onFocusOut() {
        this.focused = false;
    }
    onKeyDown(event) {
        const keyCode = event && event.keyCode;
        const isHorizontal = this.orientation === 'horizontal';
        const resize = delta => {
            event.preventDefault();
            const state = this.splitter.dragState(this.index);
            this.splitter.setSize(state, delta);
        };
        if (keyCode === Keys.Enter) {
            event.preventDefault();
            this.collapseAny();
        }
        else if (isHorizontal && keyCode === Keys.ArrowLeft) {
            resize(-10);
        }
        else if (isHorizontal && keyCode === Keys.ArrowRight) {
            resize(10);
        }
        else if (!isHorizontal && keyCode === Keys.ArrowUp) {
            resize(-10);
        }
        else if (!isHorizontal && keyCode === Keys.ArrowDown) {
            resize(10);
        }
    }
    get expandLast() {
        const panes = this.splitter.panes;
        return panes.length === 2 && panes[1].collapsed;
    }
    ngOnInit() {
        let state;
        const listener = this.draggable.kendoPress.pipe(tap(stopPropagation), filter(() => this.splitter.isDraggable(this.index)), tap(() => state = this.splitter.dragState(this.index)), tap(() => this.splitter.toggleContentOverlay(this.index, true)), switchMap(preventOnDblClick(this.draggable.kendoRelease)), switchMap(createMoveStream(this.draggable))).subscribe(({ pageX, pageY, originalX, originalY }) => {
            let delta;
            if (this.orientation === 'vertical') {
                delta = pageY - originalY;
            }
            else if (this.direction === 'rtl') {
                delta = originalX - pageX;
            }
            else {
                delta = pageX - originalX;
            }
            this.splitter.setSize(state, delta);
        });
        this.subscriptions.add(listener);
        this.subscriptions.add(this.draggable.kendoRelease.subscribe(() => this.splitter.toggleContentOverlay(this.index, false)));
    }
    ngOnDestroy() {
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
        }
    }
    togglePrevious() {
        this.splitter.tryToggle(this.index);
    }
    toggleNext() {
        this.splitter.tryToggle(this.index + 1);
    }
    previousArrowClass() {
        const pane = this.splitter.pane(this.index);
        const nextPane = this.splitter.pane(this.index + 1);
        const isCollapsible = pane.collapsible;
        const isCollapsed = pane.collapsed;
        const isHorizontal = this.orientation === 'horizontal';
        return classFromObject({
            'k-icon': true,
            'k-hidden': !isCollapsible || nextPane.isHidden,
            'k-collapse-prev': isCollapsible,
            'k-i-arrow-60-left': isCollapsible && isHorizontal && !isCollapsed,
            'k-i-arrow-60-right': isCollapsible && isHorizontal && isCollapsed,
            'k-i-arrow-60-up': isCollapsible && !isHorizontal && !isCollapsed,
            'k-i-arrow-60-down': isCollapsible && !isHorizontal && isCollapsed
        });
    }
    nextArrowClass() {
        const pane = this.splitter.pane(this.index + 1);
        const prevPane = this.splitter.pane(this.index);
        const isCollapsible = pane.collapsible;
        const isCollapsed = pane.collapsed;
        const isHorizontal = this.orientation === 'horizontal';
        return classFromObject({
            'k-icon': true,
            'k-hidden': !isCollapsible || prevPane.isHidden,
            'k-collapse-next': isCollapsible,
            'k-i-arrow-60-right': isCollapsible && isHorizontal && !isCollapsed,
            'k-i-arrow-60-left': isCollapsible && isHorizontal && isCollapsed,
            'k-i-arrow-60-down': isCollapsible && !isHorizontal && !isCollapsed,
            'k-i-arrow-60-up': isCollapsible && !isHorizontal && isCollapsed
        });
    }
    tryToggleNearest() {
        const prev = this.index;
        const next = this.index + 1;
        if (!this.splitter.tryToggle(prev)) {
            this.splitter.tryToggle(next);
        }
    }
}
SplitterBarComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-splitter-bar',
                template: `
      <div [class]="previousArrowClass()" (click)="togglePrevious()"></div>
      <div class="k-resize-handle"></div>
      <div [class]="nextArrowClass()" (click)="toggleNext()"></div>
    `
            },] },
];
/** @nocollapse */
SplitterBarComponent.ctorParameters = () => [
    { type: DraggableDirective, decorators: [{ type: Host }] },
    { type: SplitterService },
    { type: LocalizationService }
];
SplitterBarComponent.propDecorators = {
    orientation: [{ type: Input }, { type: HostBinding, args: ['attr.aria-orientation',] }],
    index: [{ type: Input }],
    ariaRole: [{ type: HostBinding, args: ['attr.role',] }],
    focused: [{ type: HostBinding, args: ['class.k-state-focused',] }],
    tabIndex: [{ type: HostBinding, args: ['attr.tabindex',] }],
    hostClasses: [{ type: HostBinding, args: ['class',] }],
    touchAction: [{ type: HostBinding, args: ['style.touch-action',] }],
    order: [{ type: HostBinding, args: ['style.-ms-flex-order',] }, { type: HostBinding, args: ['style.order',] }],
    collapseAny: [{ type: HostListener, args: ['dblclick',] }],
    onFocusIn: [{ type: HostListener, args: ['focusin',] }],
    onFocusOut: [{ type: HostListener, args: ['focusout',] }],
    onKeyDown: [{ type: HostListener, args: ['keydown', ['$event'],] }]
};
export { ɵ0, ɵ1, ɵ2, ɵ3 };
