import { Injectable, NgZone } from '@angular/core';
import { isDocumentAvailable } from '@progress/kendo-angular-common';
import { draggableFromEvent, isFocusable, widgetTarget } from './util';
import { Subject } from 'rxjs';
import { switchMap, filter, take, tap } from 'rxjs/operators';
const allowDrag = (e) => {
    const target = e.originalEvent.target;
    return target.hasAttribute('data-sortable-item') || !(isFocusable(target) || widgetTarget(target));
};
const ɵ0 = allowDrag;
/**
 * The service that provides the drag-and-drop functionality for
 * transferring items between Sortable components within the same page.
 *
 */
export class SortableService {
    constructor(ngZone) {
        this.ngZone = ngZone;
        /**
         * Specifies the Draggable item that is currently being moved.
         */
        this.activeDraggable = null;
        /**
         * Specifies the Draggable item from which the dragging started.
         */
        this.originDraggable = null;
        /**
         * @hidden
         */
        this.targetSortable = null;
        /**
         * Specifies the Draggable item that last emitted an event.
         */
        this.lastDraggable = null;
        /**
         * @hidden
         */
        this.onPressSubject = new Subject();
        /**
         * @hidden
         */
        this.onDragSubject = new Subject();
        /**
         * @hidden
         */
        this.onReleaseSubject = new Subject();
        this.source = null;
        this._target = null;
        this.sortableCounter = 0;
        this.sortableRegister = {};
        if (!isDocumentAvailable()) {
            return;
        }
        this.subscriptions = this.onPressSubject.pipe(filter(allowDrag), tap(press => {
            this.targetSortable = this.getSortableComponentFromTouch(press);
        }), filter(_ => Boolean(this.targetSortable)), tap(press => {
            this.onReleaseSubject.pipe(take(1)).subscribe(event => this.release(event));
            this.pressArgs = press;
            if (press.isTouch) {
                press.originalEvent.preventDefault();
            }
        }), switchMap(_drag => this.onDragSubject.pipe(filter(_ => Boolean(this.targetSortable)), //stop further events if dragStart is prevented
        tap((e) => this.drag(e))))).subscribe();
    }
    /**
     * Specifies the `SortableComponent` instance under the currently dragged item.
     */
    set target(target) {
        this._target = target;
    }
    get target() {
        return this._target;
    }
    /**
     * @hidden
     */
    onPress(e) {
        this.onPressSubject.next(e);
    }
    /**
     * @hidden
     */
    onDrag(e) {
        this.onDragSubject.next(e);
    }
    /**
     * @hidden
     */
    onRelease(e) {
        this.onReleaseSubject.next(e);
    }
    /**
     * @hidden
     */
    ngOnDestroy() {
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
        }
    }
    /**
     * Registers a `SortableComponent` with which the service operates.
     *
     * @param sortableComponent - The `SortableComponent`.
     * @return - The unique key that the current `SortableComponent` gets when registered.
     */
    registerComponent(sortableComponent) {
        const id = this.sortableCounter.toString();
        this.sortableRegister[id] = sortableComponent;
        this.sortableCounter++;
        return id;
    }
    /**
     * Removes a `SortableComponent` from the registered `SortableComponents` with which the service operates.
     *
     * @param key - The key of the `SortableComponent` which will be removed from the register.
     * Obtained when `registerComponent` is called.
     */
    unregisterComponent(key) {
        this.sortableRegister[key] = null;
    }
    /**
     * Sets the `SortableComponent` as a source component. When dragging an item from one Sortable to another,
     * the source component is the one from which the item originates.
     *
     * @param sortable - The `SortableComponent`.
     */
    setSource(sortable) {
        this.source = sortable;
    }
    /**
     * Returns the source `SortableComponent` from which
     * an item is dragged to other Sortable components.
     *
     * @return - The `SourceComponent`.
     */
    getSource() {
        return this.source;
    }
    /**
     * The method that finds the `SortableComponent` which is registered to
     * the `SortableService` by using the arguments of the `touch` event.
     *
     * @param touch - A Touch-Object of the `Touch` type interface.
     * Represents a single contact point (finger or stylus)
     * on a touch-sensitive device (touchscreen or trackpad).
     *
     * @return { component: SortableComponent, index: number } - An object
     * where the component is the `SortableComponent` that owns the item
     * and the index is the index of the touched item.
     */
    getSortableComponentFromTouch(touch) {
        if (!isDocumentAvailable()) {
            return { component: undefined, index: undefined };
        }
        let realTarget = document.elementFromPoint(touch.clientX, touch.clientY);
        while (realTarget) {
            const id = realTarget.getAttribute('data-sortable-id');
            const index = realTarget.getAttribute('data-sortable-index');
            if (id) {
                const targetSortable = this.sortableRegister[id];
                if (targetSortable) {
                    return { component: targetSortable, index: parseInt(index, 10) };
                }
            }
            realTarget = realTarget.parentElement;
        }
    }
    start() {
        const pressArgs = this.pressArgs;
        if (pressArgs) {
            this.pressArgs = null;
            const startTarget = draggableFromEvent(pressArgs, this.targetSortable.component);
            if (this.targetSortable.component.startDrag({ target: startTarget, originalEvent: pressArgs })) {
                this.targetSortable = null;
                return true;
            }
        }
    }
    release(event) {
        if (this.source) {
            this.ngZone.run(() => {
                if (this.targetSortable) {
                    const dropTarget = draggableFromEvent(event, this.targetSortable.component);
                    this.source.endDrag({ target: dropTarget, originalEvent: event });
                }
                this.source.positionHintFromEvent(null);
                this.source.markForCheck();
            });
        }
        this.targetSortable = null;
        this.pressArgs = null;
    }
    drag(event) {
        this.ngZone.run(() => {
            if (this.start()) {
                return;
            }
            this.source.positionHintFromEvent(event);
            const sortable = this.getSortableComponentFromTouch(event);
            if (!sortable || sortable && sortable.component !== this.target) {
                if (this.target) {
                    this.target.leave({ target: undefined, originalEvent: event });
                }
                else if (this.source !== this.target) {
                    this.source.leave({ target: undefined, originalEvent: event });
                }
            }
            if (sortable && sortable.component) {
                const draggable = draggableFromEvent(event, sortable.component);
                sortable.component.drag({ target: draggable, originalEvent: event });
            }
            this.source.markForCheck();
        });
    }
}
SortableService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
SortableService.ctorParameters = () => [
    { type: NgZone }
];
export { ɵ0 };
