import { Component, Input, Output, QueryList, ContentChild, ViewChild, ViewChildren, TemplateRef, ElementRef, EventEmitter, HostBinding, NgZone, ChangeDetectorRef } from '@angular/core';
import { Subject, merge } from 'rxjs';
import { isDocumentAvailable } from '@progress/kendo-angular-common';
import { relativeContextElement } from './util';
import { filter, take } from 'rxjs/operators';
import { LocalizationService, L10N_PREFIX } from '@progress/kendo-angular-l10n';
import { SortableService } from './sortable.service';
import { DraggableDirective } from './draggable.directive';
import { ItemTemplateDirective, PlaceholderTemplateDirective } from './item-template.directive';
import { NavigateEvent } from './navigate-event';
import { DraggableEvent } from './draggable-event';
import { DragStartEvent, DragOverEvent, DragEndEvent } from './sortable-events';
import Draggable from '@telerik/kendo-draggable';
/**
 * Represents the [Kendo UI Sortable component for Angular]({% slug overview_sortable %}).
 *
 * {% embed_file sortable-api/app.component.ts %}
 * {% embed_file shared/app.module.ts preview %}
 * {% embed_file shared/main.ts hidden %}
 */
/**
 * Represents the Kendo UI Sortable component for Angular.
 */
export class SortableComponent {
    constructor(ngZone, localization, changeDetector, wrapper, sortableService) {
        this.ngZone = ngZone;
        this.localization = localization;
        this.changeDetector = changeDetector;
        /**
         * Specifies the tab index of the Sortable component.
         */
        this.tabIndex = null;
        /**
         * Enables or disables the [keyboard navigation]({% slug keyboard_navigation_sortable %}).
         * The default value is `false`.
         */
        this.navigatable = false;
        /**
         * Enables or disables the built-in animations.
         * The default value is `false`.
         */
        this.animation = false;
        /**
         * Sets an array of integers, which represent the indexes of the disabled items from the data array
         * ([see example]({% slug items_sortable %}#toc-disabled-items)).
         */
        this.disabledIndexes = [];
        /**
         * Sets a string that represents the name of the zone to which the Sortable belongs
         * ([see example]({% slug items_sortable %}#toc-transfer-of-items)). Items can be transferred
         * between Sortables which belong to the same zone.
         */
        this.zone = undefined;
        /**
         * Defines the zones from which items can be transferred onto the current Sortable component
         * ([see example]({% slug items_sortable %}#toc-transfer-of-items)). If the `acceptZones` property
         * of the target Sortable is set, allows you to transfer items between Sortables which belong
         * to different zones.
         */
        this.acceptZones = undefined;
        /**
         * Represents the CSS styles which are applied to each Sortable item.
         *
         * @example
         * ```ts
         * import { Component } from '@angular/core';
         * import { SortableModule } from '@progress/kendo-angular-sortable';
         *
         * _@Component({
         *  selector: 'my-app',
         *  template: `
         *   <kendo-sortable
         *      [data]="['1','2','3','4','5','6','7']"
         *      [itemStyle] ="{
         *          'display': 'inline-block',
         *          'background-color': '#51A0ED',
         *          'height':'50px',
         *          'width':'50px',
         *          'margin':'3px',
         *          'cursor':'move'
         *          }"
         *      >
         *   </kendo-sortable>
         *    `
         * })
         * export class AppComponent {
         * }
         * ```
         */
        this.itemStyle = {};
        /**
         * Defines the CSS styles applied to an empty item ([see example]({% slug templates_sortable %})).
         */
        this.emptyItemStyle = undefined;
        /**
         * Defines the CSS styles which are applied to the currently dragged item ([see example]({% slug templates_sortable %})).
         */
        this.activeItemStyle = undefined;
        /**
         * Defines the CSS styles which are applied to all disabled items.
         */
        this.disabledItemStyle = undefined;
        /**
         * Defines the class which is applied to each Sortable item.
         */
        this.itemClass = "";
        /**
         * Defines the class which is applied to the active Sortable item.
         */
        this.activeItemClass = null;
        /**
         * Defines the class which is applied to the empty item when the Sortable has empty data.
         */
        this.emptyItemClass = null;
        /**
         * Defines the class which is applied to each disabled Sortable item.
         */
        this.disabledItemClass = null;
        /**
         * Sets the text message that will be displayed when the Sortable has no items.
         *
         * @example
         * ```ts
         * import { Component } from '@angular/core';
         * import { SortableModule } from '@progress/kendo-angular-sortable';
         *
         * _@Component({
         *  selector: 'my-app',
         *  template: `
         *    <kendo-sortable [data]="[]"
         *      [emptyText]="'No items - custom message and styles'"
         *      [emptyItemStyle] = "{'height': '40px', 'width':'400px', 'border': '2px dashed black'}" >
         *    </kendo-sortable>
         *    `
         * })
         * export class AppComponent { }
         * ```
         */
        this.emptyText = "Empty";
        /**
         * @hidden
         */
        this.defaultTemplateRef = null;
        /**
         * Defines the template that will be used for rendering the items.
         */
        this.itemTemplateRef = null;
        /**
         * Defines the template that will be used for rendering the placeholder.
         */
        this.placeholderTemplateRef = null;
        this.itemWrappers = null;
        /**
         * Fires when the dragging of an item is started.
         */
        this.dragStart = new EventEmitter();
        /**
         * Fires when the dragging of an item is completed.
         */
        this.dragEnd = new EventEmitter();
        /**
         * Fires while the dragging of an item is in progress.
         */
        this.dragOver = new EventEmitter();
        /**
         * Fires when dragging an item outside of the component.
         */
        this.dragLeave = new EventEmitter();
        /**
         * Fires while the moving an item from one position to another.
         */
        this.dataMove = new EventEmitter();
        /**
         * Fires when a new item is added to the Sortable.
         */
        this.dataAdd = new EventEmitter();
        /**
         * Fires when an item is removed from the Sortable.
         */
        this.dataRemove = new EventEmitter();
        /**
         * Fires when navigating using the keyboard.
         */
        this.navigate = new EventEmitter();
        /**
         * The index of the currently focused item.
         * If no item is focused, set to `-1`.
         */
        this.activeIndex = -1;
        /**
         * Flag indicating if the component is currently playing animations.
         * @hidden
         */
        this.animating = false;
        /**
         * The index of the currently dragged item.
         */
        this.dragIndex = -1;
        /**
         * The index of the item above which the dragged item is.
         */
        this.dragOverIndex = -1;
        this.onDragStartSubject = new Subject();
        this.onDragOverSubject = new Subject();
        this.onDragLeaveSubject = new Subject();
        this.onDragEndSubject = new Subject();
        /**
         * The location of the hint indicator when dragging on mobile devices.
         */
        this.hintLocation = null;
        this._localData = [];
        this.animationDuration = 300;
        this.afterKeyPress = false;
        this.sortableService = null;
        this._hideActiveItem = false;
        this.wrapper = wrapper.nativeElement;
        this.direction = localization.rtl ? 'rtl' : 'ltr';
        this.sortableService = sortableService;
        this.subscribeEvents();
    }
    /**
     * Sets an array of any data that is used as a data source for the Sortable.
     *
     * {% embed_file sortable-palettes/app.component.ts %}
     * {% embed_file shared/app.module.ts %}
     * {% embed_file shared/main.ts hidden %}
     */
    set data(data) {
        this._data = data;
        //Cache each _data item instance locally to avoid repaint due to the ngTemplateOutletContext (generated by itemData)
        //This prevents destroying the kendoDraggable instance, which otherwise leads to losing the dragEnd event
        //due to non-exisitng HTML element
        this.cacheData();
    }
    get data() {
        return this._data;
    }
    get touchAction() {
        return "none";
    }
    get dir() {
        return this.direction;
    }
    setItemData(data, i) {
        this._localData[i].item = data.item;
        this._localData[i].index = data.index;
        this._localData[i].hidden = data.hidden;
    }
    /**
     * @hidden
     */
    itemTemplate(index) {
        let template = this.itemTemplateRef;
        if (index === this.dragOverIndex) {
            template = this.placeholderTemplateRef;
        }
        else if (index === this.dragIndex) {
            template = this.itemTemplateRef;
        }
        return template;
    }
    ngOnInit() {
        if (!this.data) {
            this.data = [];
        }
        this.id = this.sortableService.registerComponent(this);
        this.dragIndex = -1;
        const display = "display";
        if (this.activeItemStyle && !this.activeItemStyle[display]) {
            this.activeItemStyle[display] = "";
        }
        if (!this.itemStyle[display]) {
            this.itemStyle[display] = "";
        }
        if (this.wrapper) {
            this.draggable = new Draggable({
                press: (e) => this.sortableService.onPress(e),
                drag: (e) => this.sortableService.onDrag(e),
                release: (e) => this.sortableService.onRelease(e)
            });
            this.ngZone.runOutsideAngular(() => {
                this.draggable.bindTo(this.wrapper);
            });
        }
    }
    ngOnDestroy() {
        this.unsubscribeEvents();
        this.sortableService.unregisterComponent(this.id);
        if (this.draggable) {
            this.draggable.destroy();
        }
    }
    ngAfterContentInit() {
        this.itemTemplateRef = this.itemTemplateRef || this.defaultTemplateRef;
        this.placeholderTemplateRef = this.placeholderTemplateRef || this.defaultTemplateRef;
    }
    ngAfterViewChecked() {
        if (this.afterKeyPress) {
            if (this.itemWrappers) {
                const elems = this.itemWrappers.toArray();
                if (elems && elems.length > 0 && this.activeIndex > -1) {
                    elems[this.activeIndex].nativeElement.focus();
                }
            }
            this.afterKeyPress = false;
        }
    }
    /**
     * @hidden
     */
    updateCacheIndices() {
        this._localData.forEach((item, index) => {
            item.index = index;
        });
    }
    /**
     * @hidden
     */
    cacheData() {
        this._localData = [];
        this._data.forEach((item, index) => {
            this._localData.push({ item: item, active: false, disabled: false, index: index, hidden: false });
        });
    }
    /**
     * @hidden
     */
    startDrag(event) {
        const startEvent = new DraggableEvent(event);
        this.onDragStartSubject.next(startEvent);
        const prevented = startEvent.isDefaultPrevented();
        if (!prevented) {
            this.offsetParent = relativeContextElement(this.wrapper);
        }
        return prevented;
    }
    /**
     * @hidden
     */
    drag(event) {
        const dragEvent = new DraggableEvent(event);
        this.onDragOverSubject.next(dragEvent);
        return dragEvent.isDefaultPrevented();
    }
    /**
     * @hidden
     */
    leave(event) {
        const leaveEvent = new DraggableEvent(event);
        this.onDragLeaveSubject.next(leaveEvent);
        return leaveEvent.isDefaultPrevented();
    }
    /**
     * @hidden
     */
    endDrag(event) {
        const endEvent = new DraggableEvent(event);
        this.onDragEndSubject.next(endEvent);
        return endEvent.isDefaultPrevented();
    }
    /**
     * @hidden
     */
    hintVisible() {
        return this.dragIndex >= 0 && this.hintLocation && this === this.sortableService.getSource();
    }
    /**
     * @hidden
     */
    currentItemStyle(index) {
        if (index === -1) {
            return this.emptyItemStyle ? this.emptyItemStyle : this.itemStyle;
        }
        if (!this.itemEnabled(index) && this.disabledItemStyle) {
            return this.disabledItemStyle;
        }
        if (index === this.dragIndex || (this.dragIndex === -1 && index === this.activeIndex)) {
            if (this.hideActiveItem) {
                return { "display": "none" };
            }
            if (this.activeItemStyle) {
                return this.activeItemStyle;
            }
        }
        return this.itemStyle;
    }
    /**
     * @hidden
     */
    currentItemClass(index) {
        if (index === -1) {
            return this.emptyItemClass ? this.emptyItemClass : this.itemClass;
        }
        if (!this.itemEnabled(index) && this.disabledItemClass) {
            return this.disabledItemClass;
        }
        if ((index === this.dragIndex || this.dragIndex === -1 && index === this.activeIndex) && this.activeItemClass) {
            return this.activeItemClass;
        }
        return this.itemClass;
    }
    /**
     * @hidden
     */
    hintStyle() {
        const position = {
            "left": this.hintLocation.x + 10 + "px",
            "position": "fixed",
            "top": this.hintLocation.y + 10 + "px"
        };
        let style = {};
        Object.assign(style, this.currentItemStyle(this.dragIndex), position);
        return style;
    }
    /**
     * @hidden
     */
    itemEnabled(index) {
        return this.disabledIndexes.indexOf(index) === -1;
    }
    /**
     * @hidden
     */
    acceptDragFrom(sortableComponent) {
        if (this.acceptZones === undefined) {
            return (this.zone === sortableComponent.zone);
        }
        else if (sortableComponent.zone !== undefined) {
            return (this.acceptZones.indexOf(sortableComponent.zone) !== -1);
        }
        return false;
    }
    /**
     * @hidden
     */
    ariaDropEffect(index) {
        return this.itemEnabled(index) ? "move" : "none";
    }
    /**
     * @hidden
     */
    focusHandler(index) {
        if (this.navigatable) {
            this.activeIndex = index;
        }
    }
    /**
     * @hidden
     */
    blurHandler() {
        if (this.navigatable && !this.afterKeyPress) {
            this.activeIndex = -1;
        }
    }
    /**
     * @hidden
     */
    keydownHandler(event) {
        const code = event.keyCode;
        const navigate = this.navigatable && code >= 37 && code <= 40;
        const hasFocus = this.activeIndex !== -1;
        if (!navigate || !hasFocus) {
            return;
        }
        const leftKey = this.direction === 'rtl' ? 39 : 37;
        const dir = code === 38 || code === leftKey ? -1 : 1;
        const limit = this.data.length - 1;
        let targetIndex = this.activeIndex + dir;
        while (!this.itemEnabled(targetIndex) && targetIndex <= limit) {
            targetIndex += dir;
        }
        targetIndex = Math.min(Math.max(targetIndex, 0), limit);
        if (!this.itemEnabled(targetIndex)) {
            return;
        }
        if (navigate) {
            const ctrl = event.ctrlKey || event.metaKey;
            let navigateEvent = new NavigateEvent({ index: targetIndex, oldIndex: this.activeIndex, ctrlKey: ctrl });
            this.navigate.emit(navigateEvent);
            if (!navigateEvent.isDefaultPrevented()) {
                this.activeIndex = targetIndex;
            }
            this.dragIndex = -1;
            this.dragOverIndex = -1;
        }
        event.stopPropagation();
        event.preventDefault();
        this.afterKeyPress = true;
    }
    /**
     * Removes the currently active item from the Data collection that the Sortable uses.
     */
    removeDataItem(index) {
        this.dragIndex = -1;
        this.dragOverIndex = -1;
        this._localData.splice(index, 1);
        this.data.splice(index, 1);
        this.updateCacheIndices();
    }
    /**
     * Sets a Boolean value that indicates whether the item will be hidden or not.
     * @hidden
     */
    hideItem(index, hidden = true) {
        this._localData[index].hidden = hidden;
    }
    /**
     * Sets a Boolean value that indicates whether the currently dragged item will be hidden.
     */
    set hideActiveItem(value) {
        this.activeIndex = -1;
        this._hideActiveItem = value;
    }
    /**
     * If the currently dragged item is hidden, returns `true`.
     * If the currently dragged item is visible, returns `false`.
     */
    get hideActiveItem() {
        return this._hideActiveItem;
    }
    /**
     * Clears the active item.
     * An active item is the item which becomes focused when the user navigates with the keyboard.
     */
    clearActiveItem() {
        if (this.navigatable) {
            this.fixFocus();
        }
        this.dragIndex = -1;
    }
    /**
     * Returns the currently active item when the user navigates with the keyboard.
     * @return - The data item which is currently active.
     */
    getActiveItem() {
        if (this.data && this.dragIndex >= 0 && this.dragIndex < this.data.length) {
            return this.data[this.dragIndex];
        }
    }
    /**
     * Adds a new data item to a particular index.
     * @param dataItem - The data item.
     * @param index - The index at which the data item is inserted.
     */
    addDataItem(dataItem, index) {
        const originDraggable = this.sortableService.originDraggable;
        if (originDraggable && originDraggable.parent === this) {
            const animation = this.animation;
            this.hideItem(originDraggable.index, false);
            this.animation = false;
            this.moveItem(originDraggable.index, index);
            this.animation = animation;
        }
        else {
            if (index + 1 === this.data.length) {
                index++;
            }
            this.data.splice(index, 0, dataItem);
            this._localData.splice(index, 0, { item: dataItem, active: false, disabled: false, index: index, hidden: false });
            this.updateCacheIndices();
        }
        this.dragIndex = index;
        this.dragOverIndex = index;
        this.ngZone.onStable.pipe(take(1)).subscribe(() => {
            this.sortableService.target = this;
            this.sortableService.setSource(this);
            this.sortableService.activeDraggable = this.draggables.toArray()[index];
            this.sortableService.lastDraggable = null;
        });
    }
    /**
     * Moves data item to a particular index.
     * @param fromIndex - The data item's index.
     * @param toIndex - The index which the data item should be moved to. Item currently sitting at that index is pushed back one position.
     */
    moveItem(fromIndex, toIndex) {
        if (toIndex === fromIndex) {
            return;
        }
        let dragIndex = fromIndex;
        const d = toIndex > dragIndex ? 1 : -1;
        const originalIndexAnimate = dragIndex;
        const toAnimate = [];
        let prevIndex = dragIndex;
        let tmp;
        while (dragIndex !== toIndex) {
            dragIndex += d;
            if (this.itemEnabled(dragIndex) || dragIndex === toIndex) {
                if (this.animation) {
                    toAnimate.push({ next: dragIndex, prev: prevIndex });
                }
                tmp = this._localData[prevIndex].index;
                this._localData[prevIndex].index = this._localData[dragIndex].index;
                this._localData[dragIndex].index = tmp;
                tmp = this._localData[prevIndex];
                this._localData[prevIndex] = this._localData[dragIndex];
                this._localData[dragIndex] = tmp;
                tmp = this.data[prevIndex];
                this.data[prevIndex] = this.data[dragIndex];
                this.data[dragIndex] = tmp;
                prevIndex = dragIndex;
            }
        }
        this.dragIndex = dragIndex;
        this.dragOverIndex = dragIndex;
        this.activeIndex = dragIndex;
        if (this.animation) {
            setTimeout(() => {
                toAnimate.push({ next: originalIndexAnimate, prev: dragIndex });
                this.animating = true;
                this.animate(toAnimate);
            });
        }
        this.ngZone.onStable.pipe(take(1)).subscribe(() => {
            this.sortableService.activeDraggable = this.draggables.toArray()[dragIndex];
            this.sortableService.lastDraggable = null;
        });
    }
    /**
     * @hidden
     */
    animate(draggables) {
        const itemArray = this.itemWrappers.toArray();
        const prevClientRect = [];
        const nextClientRect = [];
        const that = this;
        clearTimeout(this._animating);
        for (let i = 0; i < draggables.length; i++) {
            prevClientRect.push(itemArray[draggables[i].prev].nativeElement.getBoundingClientRect());
            nextClientRect.push(itemArray[draggables[i].next].nativeElement.getBoundingClientRect());
        }
        for (let i = 0; i < draggables.length; i++) {
            const nextIndex = draggables[i].prev;
            const targetRect = nextClientRect[i];
            const currentRect = prevClientRect[i];
            const target = itemArray[nextIndex].nativeElement;
            this.applyAnimationStyle(target, 'transition', 'none');
            this.applyAnimationStyle(target, 'transform', 'translate3d('
                + (targetRect.left - currentRect.left).toString() + 'px,'
                + (targetRect.top - currentRect.top).toString() + 'px,0)');
            this.reflow(target);
        }
        for (let i = 0; i < draggables.length; i++) {
            const nextIndex = draggables[i].prev;
            const target = itemArray[nextIndex].nativeElement;
            this.applyAnimationStyle(target, 'transition', 'all ' + this.animationDuration + 'ms');
            this.applyAnimationStyle(target, 'transform', 'translate3d(0,0,0)');
            clearTimeout(target.animated);
            target.animated = setTimeout(function () {
                that.applyAnimationStyle(target, 'transition', '');
                that.applyAnimationStyle(target, 'transform', '');
                target.animated = false;
            }, this.animationDuration);
        }
        this._animating = setTimeout(() => {
            this.animating = false;
        }, this.animationDuration);
    }
    /**
     * @hidden
     */
    positionHintFromEvent(event) {
        const offset = this.parentOffset();
        this.hintLocation = event ? { x: event.clientX - offset.left, y: event.clientY - offset.top } : null;
    }
    /**
     * @hidden
     */
    parentOffset() {
        const offsetParent = this.offsetParent;
        if (offsetParent) {
            const rect = offsetParent.getBoundingClientRect();
            return {
                left: rect.left - offsetParent.scrollLeft,
                top: rect.top - offsetParent.scrollTop
            };
        }
        return { left: 0, top: 0 };
    }
    /**
     * @hidden
     */
    markForCheck() {
        this.changeDetector.markForCheck();
    }
    /**
     * @hidden
     */
    reflow(element) {
        return element.offsetWidth;
    }
    /**
     * @hidden
     */
    applyAnimationStyle(el, prop, val) {
        const style = el && el.style;
        if (style) {
            if (!(prop in style)) {
                prop = '-webkit-' + prop;
            }
            style[prop] = val;
        }
    }
    subscribeEvents() {
        this.localizationChangeSubscription = this.localization
            .changes
            .subscribe(({ rtl }) => this.direction = rtl ? 'rtl' : 'ltr');
        this.dragStartSubscription = this.onDragStartSubject
            .subscribe((event) => {
            this.sortableService.originDraggable = event.target;
            this.sortableService.originIndex = event.target.index;
            this.sortableService.activeDraggable = event.target;
            this.sortableService.lastDraggable = event.target;
            this.sortableService.target = this;
            this.sortableService.setSource(this);
            let dragStartEvent = new DragStartEvent({ index: event.target.index });
            this.dragStart.emit(dragStartEvent);
            if (dragStartEvent.isDefaultPrevented()) {
                event.preventDefault();
            }
            else {
                if (!event.target.disabled) {
                    if (this.sortableService.target) {
                        this.sortableService.target.dragOverIndex = -1;
                        this.sortableService.target.dragIndex = -1;
                    }
                    this.dragOverIndex = event.target.index;
                    this.dragIndex = event.target.index;
                }
            }
        });
        this.dragOverSubscription = this.onDragOverSubject.pipe(filter(event => event.target && event.target.el.nativeElement.style.transition.length === 0), filter(() => {
            // Drag started from a disabled item
            return this.sortableService.originDraggable && !this.sortableService.originDraggable.disabled;
        }), filter(() => {
            return this.sortableService && this.acceptDragFrom(this.sortableService.getSource());
        }), filter((event) => {
            return event.target !== this.sortableService.lastDraggable;
        }))
            .subscribe((event) => {
            this.sortableService.lastDraggable = event.target;
            const originDraggable = this.sortableService.originDraggable;
            let targetIndex = event.target.index;
            if (originDraggable.hidden && originDraggable.parent === this) {
                if (originDraggable.index < event.target.index) {
                    targetIndex = event.target.index - 1;
                }
            }
            this.sortableService.target = this;
            const oldIndex = this.sortableService.activeDraggable ? this.sortableService.activeDraggable.index : 0;
            let dragOverEvent = new DragOverEvent({ index: targetIndex, oldIndex: oldIndex });
            this.dragOver.emit(dragOverEvent);
            if (!dragOverEvent.isDefaultPrevented() && event.target && event.target.index >= 0) {
                this.dragOverIndex = event.target.index;
                this.placeHolderItemData(event.target);
            }
        });
        this.dragEndSubscription = this.onDragEndSubject
            .subscribe((event) => {
            const source = this.sortableService.getSource();
            if (!source) {
                return;
            }
            const target = this.sortableService.target;
            const index = event.target ? event.target.index : -1;
            const oldIndex = this.sortableService.originDraggable ? this.sortableService.originIndex : -1;
            this.hintLocation = null;
            let dragEndEvent = new DragEndEvent({ index: index, oldIndex: oldIndex });
            this.dragEnd.emit(dragEndEvent);
            if (!dragEndEvent.isDefaultPrevented()) {
                source.dragIndex = -1;
                source.dragOverIndex = -1;
                if (target && target !== source) {
                    target.dragIndex = -1;
                    target.dragOverIndex = -1;
                }
                setTimeout(() => {
                    this.sortableService.activeDraggable = null;
                    this.sortableService.lastDraggable = null;
                    this.sortableService.originDraggable = null;
                    this.sortableService.target = null;
                    this.sortableService.setSource(null);
                });
            }
        });
        this.dragLeaveSubscription = this.onDragLeaveSubject.pipe(filter((e) => {
            if (!isDocumentAvailable()) {
                return false;
            }
            return this.wrapper !== document.elementFromPoint(e.originalEvent.pageX, e.originalEvent.pageY);
        }), filter((_e) => {
            return !this.animating;
        }), filter(_ => this.sortableService.target && this.sortableService.target.dragOverIndex > -1))
            .subscribe(() => {
            this.dragLeave.emit({ index: this.sortableService.originDraggable.index });
            this.sortableService.lastDraggable = null;
            this.dragOverIndex = -1;
            this.sortableService.target = null;
        });
    }
    unsubscribeEvents() {
        if (this.localizationChangeSubscription) {
            this.localizationChangeSubscription.unsubscribe();
        }
        this.dragStartSubscription.unsubscribe();
        this.dragOverSubscription.unsubscribe();
        this.dragEndSubscription.unsubscribe();
        this.dragLeaveSubscription.unsubscribe();
    }
    placeHolderItemData(draggable) {
        if (draggable.disabled) {
            return;
        }
        const target = this.sortableService.target;
        const source = this.sortableService.getSource();
        const originalData = Object.assign({}, this._localData[draggable.index]);
        const newData = source._localData[source.dragIndex];
        this.setItemData(newData, draggable.index);
        const endSub = source.onDragEndSubject.pipe(take(1)).subscribe(() => {
            this.setItemData(originalData, draggable.index);
        });
        const leaveSub = target.onDragLeaveSubject.pipe(take(1)).subscribe(() => {
            this.setItemData(originalData, draggable.index);
        });
        const overSub = merge(this.onDragOverSubject.pipe(filter(() => {
            return draggable.index !== this.dragOverIndex;
        })), this.onDragLeaveSubject).subscribe(() => {
            this.setItemData(originalData, draggable.index);
            endSub.unsubscribe();
            overSub.unsubscribe();
            leaveSub.unsubscribe();
        });
    }
    fixFocus() {
        if (this.itemWrappers) {
            const itemArray = this.itemWrappers.toArray();
            if (this.dragIndex > -1 && itemArray && itemArray.length > 0) {
                itemArray[this.dragIndex].nativeElement.focus();
                this.activeIndex = this.dragIndex;
            }
        }
    }
}
SortableComponent.decorators = [
    { type: Component, args: [{
                exportAs: 'kendoSortable',
                providers: [
                    LocalizationService,
                    {
                        provide: L10N_PREFIX,
                        useValue: 'kendo.sortable'
                    }
                ],
                selector: 'kendo-sortable',
                template: `
  <div #itemWrapper *ngFor="let item of _localData;let i=index"
      kendoDraggable
      [attr.tabIndex]="itemEnabled(i)?(navigatable?tabIndex||0:tabIndex):null"
      [attr.aria-grabbed]="i===dragIndex"
      [attr.aria-dropeffect]="ariaDropEffect(i)"
      [attr.data-sortable-item] = "true"
      [attr.data-sortable-index]="i"
      [attr.data-sortable-id]="id"
      [index]="i"
      [hidden]="item.hidden"
      [disabled]="!itemEnabled(i)"
      [ngClass]="currentItemClass(i)"
      [ngStyle]="currentItemStyle(i)"

      (focus)="focusHandler(i)"
      (blur)="blurHandler()"
      (keydown)="keydownHandler($event)"
  >
          <ng-template [ngIf]="itemTemplateRef"
            [ngTemplateOutlet]="itemTemplate(i)"
            [ngTemplateOutletContext]="item">
          </ng-template>
      <ng-template [ngIf]="!itemTemplateRef">{{item.item}}</ng-template>
    </div>

    <ng-template #noDataRef [ngIf]="!_data.length || _localData.length === 1 && _localData[0].hidden">
        <div
        kendoDraggable
        [index]="0"
        [disabled]="true"
        [attr.data-sortable-id]="id"
        [attr.data-sortable-index]="0"
        [ngStyle]="currentItemStyle(-1)"
        [ngClass]="currentItemClass(-1)"
        >{{emptyText}}</div>
    </ng-template>
     <div *ngIf="hintVisible()" [ngStyle]="hintStyle()" [ngClass]="currentItemClass(dragIndex)">
         <ng-template [ngIf]="itemTemplateRef"
             [ngTemplateOutlet]="itemTemplateRef"
             [ngTemplateOutletContext]="{item: _localData[dragIndex].item}">
         </ng-template>
         <ng-template [ngIf]="!itemTemplateRef">{{_localData[dragIndex].item}}</ng-template>
     </div>
  `
            },] },
];
/** @nocollapse */
SortableComponent.ctorParameters = () => [
    { type: NgZone },
    { type: LocalizationService },
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: SortableService }
];
SortableComponent.propDecorators = {
    tabIndex: [{ type: Input }],
    data: [{ type: Input }],
    navigatable: [{ type: Input }],
    animation: [{ type: Input }],
    disabledIndexes: [{ type: Input }],
    zone: [{ type: Input }],
    acceptZones: [{ type: Input }],
    itemStyle: [{ type: Input }],
    emptyItemStyle: [{ type: Input }],
    activeItemStyle: [{ type: Input }],
    disabledItemStyle: [{ type: Input }],
    itemClass: [{ type: Input }],
    activeItemClass: [{ type: Input }],
    emptyItemClass: [{ type: Input }],
    disabledItemClass: [{ type: Input }],
    emptyText: [{ type: Input }],
    defaultTemplateRef: [{ type: ContentChild, args: [TemplateRef,] }],
    itemTemplateRef: [{ type: ContentChild, args: [ItemTemplateDirective, { read: TemplateRef },] }],
    placeholderTemplateRef: [{ type: ContentChild, args: [PlaceholderTemplateDirective, { read: TemplateRef },] }],
    itemWrappers: [{ type: ViewChildren, args: ['itemWrapper',] }],
    draggables: [{ type: ViewChildren, args: [DraggableDirective,] }],
    hint: [{ type: ViewChild, args: ['hint',] }],
    dragStart: [{ type: Output }],
    dragEnd: [{ type: Output }],
    dragOver: [{ type: Output }],
    dragLeave: [{ type: Output }],
    dataMove: [{ type: Output }],
    dataAdd: [{ type: Output }],
    dataRemove: [{ type: Output }],
    navigate: [{ type: Output }],
    activeIndex: [{ type: Input }],
    touchAction: [{ type: HostBinding, args: ['style.touch-action',] }],
    dir: [{ type: HostBinding, args: ['attr.dir',] }]
};
