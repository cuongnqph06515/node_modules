import { NgZone, OnDestroy } from '@angular/core';
import { SortableComponent } from './sortable.component';
import { DraggableDirective } from './draggable.directive';
import { Subject } from 'rxjs';
/**
 * The service that provides the drag-and-drop functionality for
 * transferring items between Sortable components within the same page.
 *
 */
export declare class SortableService implements OnDestroy {
    private ngZone;
    /**
     * Specifies the Draggable item that is currently being moved.
     */
    activeDraggable: DraggableDirective;
    /**
     * Specifies the Draggable item from which the dragging started.
     */
    originDraggable: DraggableDirective;
    /**
     * @hidden
     */
    originIndex: number;
    /**
     * @hidden
     */
    targetSortable: {
        component: SortableComponent;
        index: number;
    };
    /**
     * Specifies the Draggable item that last emitted an event.
     */
    lastDraggable: DraggableDirective;
    /**
     * @hidden
     */
    onPressSubject: Subject<any>;
    /**
     * @hidden
     */
    onDragSubject: Subject<any>;
    /**
     * @hidden
     */
    onReleaseSubject: Subject<any>;
    private subscriptions;
    private source;
    private _target;
    private sortableCounter;
    private sortableRegister;
    private pressArgs;
    /**
     * Specifies the `SortableComponent` instance under the currently dragged item.
     */
    target: SortableComponent;
    constructor(ngZone: NgZone);
    /**
     * @hidden
     */
    onPress(e: any): void;
    /**
     * @hidden
     */
    onDrag(e: any): void;
    /**
     * @hidden
     */
    onRelease(e: any): void;
    /**
     * @hidden
     */
    ngOnDestroy(): void;
    /**
     * Registers a `SortableComponent` with which the service operates.
     *
     * @param sortableComponent - The `SortableComponent`.
     * @return - The unique key that the current `SortableComponent` gets when registered.
     */
    registerComponent(sortableComponent: SortableComponent): string;
    /**
     * Removes a `SortableComponent` from the registered `SortableComponents` with which the service operates.
     *
     * @param key - The key of the `SortableComponent` which will be removed from the register.
     * Obtained when `registerComponent` is called.
     */
    unregisterComponent(key: string): void;
    /**
     * Sets the `SortableComponent` as a source component. When dragging an item from one Sortable to another,
     * the source component is the one from which the item originates.
     *
     * @param sortable - The `SortableComponent`.
     */
    setSource(sortable: SortableComponent): void;
    /**
     * Returns the source `SortableComponent` from which
     * an item is dragged to other Sortable components.
     *
     * @return - The `SourceComponent`.
     */
    getSource(): SortableComponent;
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
    getSortableComponentFromTouch(touch: any): {
        component: SortableComponent;
        index: number;
    };
    private start;
    private release;
    private drag;
}
