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
var SortableComponent = /** @class */ (function () {
    function SortableComponent(ngZone, localization, changeDetector, wrapper, sortableService) {
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
    Object.defineProperty(SortableComponent.prototype, "data", {
        get: function () {
            return this._data;
        },
        /**
         * Sets an array of any data that is used as a data source for the Sortable.
         *
         * {% embed_file sortable-palettes/app.component.ts %}
         * {% embed_file shared/app.module.ts %}
         * {% embed_file shared/main.ts hidden %}
         */
        set: function (data) {
            this._data = data;
            //Cache each _data item instance locally to avoid repaint due to the ngTemplateOutletContext (generated by itemData)
            //This prevents destroying the kendoDraggable instance, which otherwise leads to losing the dragEnd event
            //due to non-exisitng HTML element
            this.cacheData();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SortableComponent.prototype, "touchAction", {
        get: function () {
            return "none";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SortableComponent.prototype, "dir", {
        get: function () {
            return this.direction;
        },
        enumerable: true,
        configurable: true
    });
    SortableComponent.prototype.setItemData = function (data, i) {
        this._localData[i].item = data.item;
        this._localData[i].index = data.index;
        this._localData[i].hidden = data.hidden;
    };
    /**
     * @hidden
     */
    SortableComponent.prototype.itemTemplate = function (index) {
        var template = this.itemTemplateRef;
        if (index === this.dragOverIndex) {
            template = this.placeholderTemplateRef;
        }
        else if (index === this.dragIndex) {
            template = this.itemTemplateRef;
        }
        return template;
    };
    SortableComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.data) {
            this.data = [];
        }
        this.id = this.sortableService.registerComponent(this);
        this.dragIndex = -1;
        var display = "display";
        if (this.activeItemStyle && !this.activeItemStyle[display]) {
            this.activeItemStyle[display] = "";
        }
        if (!this.itemStyle[display]) {
            this.itemStyle[display] = "";
        }
        if (this.wrapper) {
            this.draggable = new Draggable({
                press: function (e) { return _this.sortableService.onPress(e); },
                drag: function (e) { return _this.sortableService.onDrag(e); },
                release: function (e) { return _this.sortableService.onRelease(e); }
            });
            this.ngZone.runOutsideAngular(function () {
                _this.draggable.bindTo(_this.wrapper);
            });
        }
    };
    SortableComponent.prototype.ngOnDestroy = function () {
        this.unsubscribeEvents();
        this.sortableService.unregisterComponent(this.id);
        if (this.draggable) {
            this.draggable.destroy();
        }
    };
    SortableComponent.prototype.ngAfterContentInit = function () {
        this.itemTemplateRef = this.itemTemplateRef || this.defaultTemplateRef;
        this.placeholderTemplateRef = this.placeholderTemplateRef || this.defaultTemplateRef;
    };
    SortableComponent.prototype.ngAfterViewChecked = function () {
        if (this.afterKeyPress) {
            if (this.itemWrappers) {
                var elems = this.itemWrappers.toArray();
                if (elems && elems.length > 0 && this.activeIndex > -1) {
                    elems[this.activeIndex].nativeElement.focus();
                }
            }
            this.afterKeyPress = false;
        }
    };
    /**
     * @hidden
     */
    SortableComponent.prototype.updateCacheIndices = function () {
        this._localData.forEach(function (item, index) {
            item.index = index;
        });
    };
    /**
     * @hidden
     */
    SortableComponent.prototype.cacheData = function () {
        var _this = this;
        this._localData = [];
        this._data.forEach(function (item, index) {
            _this._localData.push({ item: item, active: false, disabled: false, index: index, hidden: false });
        });
    };
    /**
     * @hidden
     */
    SortableComponent.prototype.startDrag = function (event) {
        var startEvent = new DraggableEvent(event);
        this.onDragStartSubject.next(startEvent);
        var prevented = startEvent.isDefaultPrevented();
        if (!prevented) {
            this.offsetParent = relativeContextElement(this.wrapper);
        }
        return prevented;
    };
    /**
     * @hidden
     */
    SortableComponent.prototype.drag = function (event) {
        var dragEvent = new DraggableEvent(event);
        this.onDragOverSubject.next(dragEvent);
        return dragEvent.isDefaultPrevented();
    };
    /**
     * @hidden
     */
    SortableComponent.prototype.leave = function (event) {
        var leaveEvent = new DraggableEvent(event);
        this.onDragLeaveSubject.next(leaveEvent);
        return leaveEvent.isDefaultPrevented();
    };
    /**
     * @hidden
     */
    SortableComponent.prototype.endDrag = function (event) {
        var endEvent = new DraggableEvent(event);
        this.onDragEndSubject.next(endEvent);
        return endEvent.isDefaultPrevented();
    };
    /**
     * @hidden
     */
    SortableComponent.prototype.hintVisible = function () {
        return this.dragIndex >= 0 && this.hintLocation && this === this.sortableService.getSource();
    };
    /**
     * @hidden
     */
    SortableComponent.prototype.currentItemStyle = function (index) {
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
    };
    /**
     * @hidden
     */
    SortableComponent.prototype.currentItemClass = function (index) {
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
    };
    /**
     * @hidden
     */
    SortableComponent.prototype.hintStyle = function () {
        var position = {
            "left": this.hintLocation.x + 10 + "px",
            "position": "fixed",
            "top": this.hintLocation.y + 10 + "px"
        };
        var style = {};
        Object.assign(style, this.currentItemStyle(this.dragIndex), position);
        return style;
    };
    /**
     * @hidden
     */
    SortableComponent.prototype.itemEnabled = function (index) {
        return this.disabledIndexes.indexOf(index) === -1;
    };
    /**
     * @hidden
     */
    SortableComponent.prototype.acceptDragFrom = function (sortableComponent) {
        if (this.acceptZones === undefined) {
            return (this.zone === sortableComponent.zone);
        }
        else if (sortableComponent.zone !== undefined) {
            return (this.acceptZones.indexOf(sortableComponent.zone) !== -1);
        }
        return false;
    };
    /**
     * @hidden
     */
    SortableComponent.prototype.ariaDropEffect = function (index) {
        return this.itemEnabled(index) ? "move" : "none";
    };
    /**
     * @hidden
     */
    SortableComponent.prototype.focusHandler = function (index) {
        if (this.navigatable) {
            this.activeIndex = index;
        }
    };
    /**
     * @hidden
     */
    SortableComponent.prototype.blurHandler = function () {
        if (this.navigatable && !this.afterKeyPress) {
            this.activeIndex = -1;
        }
    };
    /**
     * @hidden
     */
    SortableComponent.prototype.keydownHandler = function (event) {
        var code = event.keyCode;
        var navigate = this.navigatable && code >= 37 && code <= 40;
        var hasFocus = this.activeIndex !== -1;
        if (!navigate || !hasFocus) {
            return;
        }
        var leftKey = this.direction === 'rtl' ? 39 : 37;
        var dir = code === 38 || code === leftKey ? -1 : 1;
        var limit = this.data.length - 1;
        var targetIndex = this.activeIndex + dir;
        while (!this.itemEnabled(targetIndex) && targetIndex <= limit) {
            targetIndex += dir;
        }
        targetIndex = Math.min(Math.max(targetIndex, 0), limit);
        if (!this.itemEnabled(targetIndex)) {
            return;
        }
        if (navigate) {
            var ctrl = event.ctrlKey || event.metaKey;
            var navigateEvent = new NavigateEvent({ index: targetIndex, oldIndex: this.activeIndex, ctrlKey: ctrl });
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
    };
    /**
     * Removes the currently active item from the Data collection that the Sortable uses.
     */
    SortableComponent.prototype.removeDataItem = function (index) {
        this.dragIndex = -1;
        this.dragOverIndex = -1;
        this._localData.splice(index, 1);
        this.data.splice(index, 1);
        this.updateCacheIndices();
    };
    /**
     * Sets a Boolean value that indicates whether the item will be hidden or not.
     * @hidden
     */
    SortableComponent.prototype.hideItem = function (index, hidden) {
        if (hidden === void 0) { hidden = true; }
        this._localData[index].hidden = hidden;
    };
    Object.defineProperty(SortableComponent.prototype, "hideActiveItem", {
        /**
         * If the currently dragged item is hidden, returns `true`.
         * If the currently dragged item is visible, returns `false`.
         */
        get: function () {
            return this._hideActiveItem;
        },
        /**
         * Sets a Boolean value that indicates whether the currently dragged item will be hidden.
         */
        set: function (value) {
            this.activeIndex = -1;
            this._hideActiveItem = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Clears the active item.
     * An active item is the item which becomes focused when the user navigates with the keyboard.
     */
    SortableComponent.prototype.clearActiveItem = function () {
        if (this.navigatable) {
            this.fixFocus();
        }
        this.dragIndex = -1;
    };
    /**
     * Returns the currently active item when the user navigates with the keyboard.
     * @return - The data item which is currently active.
     */
    SortableComponent.prototype.getActiveItem = function () {
        if (this.data && this.dragIndex >= 0 && this.dragIndex < this.data.length) {
            return this.data[this.dragIndex];
        }
    };
    /**
     * Adds a new data item to a particular index.
     * @param dataItem - The data item.
     * @param index - The index at which the data item is inserted.
     */
    SortableComponent.prototype.addDataItem = function (dataItem, index) {
        var _this = this;
        var originDraggable = this.sortableService.originDraggable;
        if (originDraggable && originDraggable.parent === this) {
            var animation = this.animation;
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
        this.ngZone.onStable.pipe(take(1)).subscribe(function () {
            _this.sortableService.target = _this;
            _this.sortableService.setSource(_this);
            _this.sortableService.activeDraggable = _this.draggables.toArray()[index];
            _this.sortableService.lastDraggable = null;
        });
    };
    /**
     * Moves data item to a particular index.
     * @param fromIndex - The data item's index.
     * @param toIndex - The index which the data item should be moved to. Item currently sitting at that index is pushed back one position.
     */
    SortableComponent.prototype.moveItem = function (fromIndex, toIndex) {
        var _this = this;
        if (toIndex === fromIndex) {
            return;
        }
        var dragIndex = fromIndex;
        var d = toIndex > dragIndex ? 1 : -1;
        var originalIndexAnimate = dragIndex;
        var toAnimate = [];
        var prevIndex = dragIndex;
        var tmp;
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
            setTimeout(function () {
                toAnimate.push({ next: originalIndexAnimate, prev: dragIndex });
                _this.animating = true;
                _this.animate(toAnimate);
            });
        }
        this.ngZone.onStable.pipe(take(1)).subscribe(function () {
            _this.sortableService.activeDraggable = _this.draggables.toArray()[dragIndex];
            _this.sortableService.lastDraggable = null;
        });
    };
    /**
     * @hidden
     */
    SortableComponent.prototype.animate = function (draggables) {
        var _this = this;
        var itemArray = this.itemWrappers.toArray();
        var prevClientRect = [];
        var nextClientRect = [];
        var that = this;
        clearTimeout(this._animating);
        for (var i = 0; i < draggables.length; i++) {
            prevClientRect.push(itemArray[draggables[i].prev].nativeElement.getBoundingClientRect());
            nextClientRect.push(itemArray[draggables[i].next].nativeElement.getBoundingClientRect());
        }
        for (var i = 0; i < draggables.length; i++) {
            var nextIndex = draggables[i].prev;
            var targetRect = nextClientRect[i];
            var currentRect = prevClientRect[i];
            var target = itemArray[nextIndex].nativeElement;
            this.applyAnimationStyle(target, 'transition', 'none');
            this.applyAnimationStyle(target, 'transform', 'translate3d('
                + (targetRect.left - currentRect.left).toString() + 'px,'
                + (targetRect.top - currentRect.top).toString() + 'px,0)');
            this.reflow(target);
        }
        var _loop_1 = function (i) {
            var nextIndex = draggables[i].prev;
            var target = itemArray[nextIndex].nativeElement;
            this_1.applyAnimationStyle(target, 'transition', 'all ' + this_1.animationDuration + 'ms');
            this_1.applyAnimationStyle(target, 'transform', 'translate3d(0,0,0)');
            clearTimeout(target.animated);
            target.animated = setTimeout(function () {
                that.applyAnimationStyle(target, 'transition', '');
                that.applyAnimationStyle(target, 'transform', '');
                target.animated = false;
            }, this_1.animationDuration);
        };
        var this_1 = this;
        for (var i = 0; i < draggables.length; i++) {
            _loop_1(i);
        }
        this._animating = setTimeout(function () {
            _this.animating = false;
        }, this.animationDuration);
    };
    /**
     * @hidden
     */
    SortableComponent.prototype.positionHintFromEvent = function (event) {
        var offset = this.parentOffset();
        this.hintLocation = event ? { x: event.clientX - offset.left, y: event.clientY - offset.top } : null;
    };
    /**
     * @hidden
     */
    SortableComponent.prototype.parentOffset = function () {
        var offsetParent = this.offsetParent;
        if (offsetParent) {
            var rect = offsetParent.getBoundingClientRect();
            return {
                left: rect.left - offsetParent.scrollLeft,
                top: rect.top - offsetParent.scrollTop
            };
        }
        return { left: 0, top: 0 };
    };
    /**
     * @hidden
     */
    SortableComponent.prototype.markForCheck = function () {
        this.changeDetector.markForCheck();
    };
    /**
     * @hidden
     */
    SortableComponent.prototype.reflow = function (element) {
        return element.offsetWidth;
    };
    /**
     * @hidden
     */
    SortableComponent.prototype.applyAnimationStyle = function (el, prop, val) {
        var style = el && el.style;
        if (style) {
            if (!(prop in style)) {
                prop = '-webkit-' + prop;
            }
            style[prop] = val;
        }
    };
    SortableComponent.prototype.subscribeEvents = function () {
        var _this = this;
        this.localizationChangeSubscription = this.localization
            .changes
            .subscribe(function (_a) {
            var rtl = _a.rtl;
            return _this.direction = rtl ? 'rtl' : 'ltr';
        });
        this.dragStartSubscription = this.onDragStartSubject
            .subscribe(function (event) {
            _this.sortableService.originDraggable = event.target;
            _this.sortableService.originIndex = event.target.index;
            _this.sortableService.activeDraggable = event.target;
            _this.sortableService.lastDraggable = event.target;
            _this.sortableService.target = _this;
            _this.sortableService.setSource(_this);
            var dragStartEvent = new DragStartEvent({ index: event.target.index });
            _this.dragStart.emit(dragStartEvent);
            if (dragStartEvent.isDefaultPrevented()) {
                event.preventDefault();
            }
            else {
                if (!event.target.disabled) {
                    if (_this.sortableService.target) {
                        _this.sortableService.target.dragOverIndex = -1;
                        _this.sortableService.target.dragIndex = -1;
                    }
                    _this.dragOverIndex = event.target.index;
                    _this.dragIndex = event.target.index;
                }
            }
        });
        this.dragOverSubscription = this.onDragOverSubject.pipe(filter(function (event) { return event.target && event.target.el.nativeElement.style.transition.length === 0; }), filter(function () {
            // Drag started from a disabled item
            return _this.sortableService.originDraggable && !_this.sortableService.originDraggable.disabled;
        }), filter(function () {
            return _this.sortableService && _this.acceptDragFrom(_this.sortableService.getSource());
        }), filter(function (event) {
            return event.target !== _this.sortableService.lastDraggable;
        }))
            .subscribe(function (event) {
            _this.sortableService.lastDraggable = event.target;
            var originDraggable = _this.sortableService.originDraggable;
            var targetIndex = event.target.index;
            if (originDraggable.hidden && originDraggable.parent === _this) {
                if (originDraggable.index < event.target.index) {
                    targetIndex = event.target.index - 1;
                }
            }
            _this.sortableService.target = _this;
            var oldIndex = _this.sortableService.activeDraggable ? _this.sortableService.activeDraggable.index : 0;
            var dragOverEvent = new DragOverEvent({ index: targetIndex, oldIndex: oldIndex });
            _this.dragOver.emit(dragOverEvent);
            if (!dragOverEvent.isDefaultPrevented() && event.target && event.target.index >= 0) {
                _this.dragOverIndex = event.target.index;
                _this.placeHolderItemData(event.target);
            }
        });
        this.dragEndSubscription = this.onDragEndSubject
            .subscribe(function (event) {
            var source = _this.sortableService.getSource();
            if (!source) {
                return;
            }
            var target = _this.sortableService.target;
            var index = event.target ? event.target.index : -1;
            var oldIndex = _this.sortableService.originDraggable ? _this.sortableService.originIndex : -1;
            _this.hintLocation = null;
            var dragEndEvent = new DragEndEvent({ index: index, oldIndex: oldIndex });
            _this.dragEnd.emit(dragEndEvent);
            if (!dragEndEvent.isDefaultPrevented()) {
                source.dragIndex = -1;
                source.dragOverIndex = -1;
                if (target && target !== source) {
                    target.dragIndex = -1;
                    target.dragOverIndex = -1;
                }
                setTimeout(function () {
                    _this.sortableService.activeDraggable = null;
                    _this.sortableService.lastDraggable = null;
                    _this.sortableService.originDraggable = null;
                    _this.sortableService.target = null;
                    _this.sortableService.setSource(null);
                });
            }
        });
        this.dragLeaveSubscription = this.onDragLeaveSubject.pipe(filter(function (e) {
            if (!isDocumentAvailable()) {
                return false;
            }
            return _this.wrapper !== document.elementFromPoint(e.originalEvent.pageX, e.originalEvent.pageY);
        }), filter(function (_e) {
            return !_this.animating;
        }), filter(function (_) { return _this.sortableService.target && _this.sortableService.target.dragOverIndex > -1; }))
            .subscribe(function () {
            _this.dragLeave.emit({ index: _this.sortableService.originDraggable.index });
            _this.sortableService.lastDraggable = null;
            _this.dragOverIndex = -1;
            _this.sortableService.target = null;
        });
    };
    SortableComponent.prototype.unsubscribeEvents = function () {
        if (this.localizationChangeSubscription) {
            this.localizationChangeSubscription.unsubscribe();
        }
        this.dragStartSubscription.unsubscribe();
        this.dragOverSubscription.unsubscribe();
        this.dragEndSubscription.unsubscribe();
        this.dragLeaveSubscription.unsubscribe();
    };
    SortableComponent.prototype.placeHolderItemData = function (draggable) {
        var _this = this;
        if (draggable.disabled) {
            return;
        }
        var target = this.sortableService.target;
        var source = this.sortableService.getSource();
        var originalData = Object.assign({}, this._localData[draggable.index]);
        var newData = source._localData[source.dragIndex];
        this.setItemData(newData, draggable.index);
        var endSub = source.onDragEndSubject.pipe(take(1)).subscribe(function () {
            _this.setItemData(originalData, draggable.index);
        });
        var leaveSub = target.onDragLeaveSubject.pipe(take(1)).subscribe(function () {
            _this.setItemData(originalData, draggable.index);
        });
        var overSub = merge(this.onDragOverSubject.pipe(filter(function () {
            return draggable.index !== _this.dragOverIndex;
        })), this.onDragLeaveSubject).subscribe(function () {
            _this.setItemData(originalData, draggable.index);
            endSub.unsubscribe();
            overSub.unsubscribe();
            leaveSub.unsubscribe();
        });
    };
    SortableComponent.prototype.fixFocus = function () {
        if (this.itemWrappers) {
            var itemArray = this.itemWrappers.toArray();
            if (this.dragIndex > -1 && itemArray && itemArray.length > 0) {
                itemArray[this.dragIndex].nativeElement.focus();
                this.activeIndex = this.dragIndex;
            }
        }
    };
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
                    template: "\n  <div #itemWrapper *ngFor=\"let item of _localData;let i=index\"\n      kendoDraggable\n      [attr.tabIndex]=\"itemEnabled(i)?(navigatable?tabIndex||0:tabIndex):null\"\n      [attr.aria-grabbed]=\"i===dragIndex\"\n      [attr.aria-dropeffect]=\"ariaDropEffect(i)\"\n      [attr.data-sortable-item] = \"true\"\n      [attr.data-sortable-index]=\"i\"\n      [attr.data-sortable-id]=\"id\"\n      [index]=\"i\"\n      [hidden]=\"item.hidden\"\n      [disabled]=\"!itemEnabled(i)\"\n      [ngClass]=\"currentItemClass(i)\"\n      [ngStyle]=\"currentItemStyle(i)\"\n\n      (focus)=\"focusHandler(i)\"\n      (blur)=\"blurHandler()\"\n      (keydown)=\"keydownHandler($event)\"\n  >\n          <ng-template [ngIf]=\"itemTemplateRef\"\n            [ngTemplateOutlet]=\"itemTemplate(i)\"\n            [ngTemplateOutletContext]=\"item\">\n          </ng-template>\n      <ng-template [ngIf]=\"!itemTemplateRef\">{{item.item}}</ng-template>\n    </div>\n\n    <ng-template #noDataRef [ngIf]=\"!_data.length || _localData.length === 1 && _localData[0].hidden\">\n        <div\n        kendoDraggable\n        [index]=\"0\"\n        [disabled]=\"true\"\n        [attr.data-sortable-id]=\"id\"\n        [attr.data-sortable-index]=\"0\"\n        [ngStyle]=\"currentItemStyle(-1)\"\n        [ngClass]=\"currentItemClass(-1)\"\n        >{{emptyText}}</div>\n    </ng-template>\n     <div *ngIf=\"hintVisible()\" [ngStyle]=\"hintStyle()\" [ngClass]=\"currentItemClass(dragIndex)\">\n         <ng-template [ngIf]=\"itemTemplateRef\"\n             [ngTemplateOutlet]=\"itemTemplateRef\"\n             [ngTemplateOutletContext]=\"{item: _localData[dragIndex].item}\">\n         </ng-template>\n         <ng-template [ngIf]=\"!itemTemplateRef\">{{_localData[dragIndex].item}}</ng-template>\n     </div>\n  "
                },] },
    ];
    /** @nocollapse */
    SortableComponent.ctorParameters = function () { return [
        { type: NgZone },
        { type: LocalizationService },
        { type: ChangeDetectorRef },
        { type: ElementRef },
        { type: SortableService }
    ]; };
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
    return SortableComponent;
}());
export { SortableComponent };
