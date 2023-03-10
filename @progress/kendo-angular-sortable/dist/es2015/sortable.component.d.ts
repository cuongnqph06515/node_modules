import { QueryList, TemplateRef, ElementRef, EventEmitter, OnInit, OnDestroy, AfterViewChecked, AfterContentInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { SortableService } from './sortable.service';
import { DraggableDirective } from './draggable.directive';
import { DataAddEvent, DataMoveEvent, DataRemoveEvent } from './data-events';
/**
 * Represents the [Kendo UI Sortable component for Angular]({% slug overview_sortable %}).
 *
 * {% embed_file sortable-api/app.component.ts %}
 * {% embed_file shared/app.module.ts preview %}
 * {% embed_file shared/main.ts hidden %}
 */
export declare class SortableComponent implements OnInit, OnDestroy, AfterViewChecked, AfterContentInit {
    private ngZone;
    private localization;
    private changeDetector;
    /**
     * Specifies the tab index of the Sortable component.
     */
    tabIndex: number;
    /**
     * Sets an array of any data that is used as a data source for the Sortable.
     *
     * {% embed_file sortable-palettes/app.component.ts %}
     * {% embed_file shared/app.module.ts %}
     * {% embed_file shared/main.ts hidden %}
     */
    data: Array<any>;
    /**
     * Enables or disables the [keyboard navigation]({% slug keyboard_navigation_sortable %}).
     * The default value is `false`.
     */
    navigatable: boolean;
    /**
     * Enables or disables the built-in animations.
     * The default value is `false`.
     */
    animation: boolean;
    /**
     * Sets an array of integers, which represent the indexes of the disabled items from the data array
     * ([see example]({% slug items_sortable %}#toc-disabled-items)).
     */
    disabledIndexes: number[];
    /**
     * Sets a string that represents the name of the zone to which the Sortable belongs
     * ([see example]({% slug items_sortable %}#toc-transfer-of-items)). Items can be transferred
     * between Sortables which belong to the same zone.
     */
    zone: string;
    /**
     * Defines the zones from which items can be transferred onto the current Sortable component
     * ([see example]({% slug items_sortable %}#toc-transfer-of-items)). If the `acceptZones` property
     * of the target Sortable is set, allows you to transfer items between Sortables which belong
     * to different zones.
     */
    acceptZones: string[];
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
    itemStyle: {
        [key: string]: string;
    };
    /**
     * Defines the CSS styles applied to an empty item ([see example]({% slug templates_sortable %})).
     */
    emptyItemStyle: {
        [key: string]: string;
    };
    /**
     * Defines the CSS styles which are applied to the currently dragged item ([see example]({% slug templates_sortable %})).
     */
    activeItemStyle: {
        [key: string]: string;
    };
    /**
     * Defines the CSS styles which are applied to all disabled items.
     */
    disabledItemStyle: {
        [key: string]: string;
    };
    /**
     * Defines the class which is applied to each Sortable item.
     */
    itemClass: string | string[] | Set<string>;
    /**
     * Defines the class which is applied to the active Sortable item.
     */
    activeItemClass: string | string[] | Set<string>;
    /**
     * Defines the class which is applied to the empty item when the Sortable has empty data.
     */
    emptyItemClass: string | string[] | Set<string>;
    /**
     * Defines the class which is applied to each disabled Sortable item.
     */
    disabledItemClass: string | string[] | Set<string>;
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
    emptyText: string;
    /**
     * @hidden
     */
    defaultTemplateRef: TemplateRef<any>;
    /**
     * Defines the template that will be used for rendering the items.
     */
    itemTemplateRef: TemplateRef<any>;
    /**
     * Defines the template that will be used for rendering the placeholder.
     */
    placeholderTemplateRef: TemplateRef<any>;
    itemWrappers: QueryList<any>;
    draggables: QueryList<DraggableDirective>;
    hint: ElementRef;
    /**
     * Fires when the dragging of an item is started.
     */
    dragStart: EventEmitter<any>;
    /**
     * Fires when the dragging of an item is completed.
     */
    dragEnd: EventEmitter<any>;
    /**
     * Fires while the dragging of an item is in progress.
     */
    dragOver: EventEmitter<any>;
    /**
     * Fires when dragging an item outside of the component.
     */
    dragLeave: EventEmitter<any>;
    /**
     * Fires while the moving an item from one position to another.
     */
    dataMove: EventEmitter<DataMoveEvent>;
    /**
     * Fires when a new item is added to the Sortable.
     */
    dataAdd: EventEmitter<DataAddEvent>;
    /**
     * Fires when an item is removed from the Sortable.
     */
    dataRemove: EventEmitter<DataRemoveEvent>;
    /**
     * Fires when navigating using the keyboard.
     */
    navigate: EventEmitter<any>;
    /**
     * The index of the currently focused item.
     * If no item is focused, set to `-1`.
     */
    activeIndex: number;
    readonly touchAction: string;
    readonly dir: string;
    /**
     * Flag indicating if the component is currently playing animations.
     * @hidden
     */
    animating: boolean;
    /**
     * The index of the currently dragged item.
     */
    dragIndex: number;
    /**
     * The index of the item above which the dragged item is.
     */
    dragOverIndex: number;
    onDragStartSubject: Subject<any>;
    onDragOverSubject: Subject<any>;
    onDragLeaveSubject: Subject<any>;
    onDragEndSubject: Subject<any>;
    /**
     * The SortableComponent's HTMLElement.
     */
    wrapper: HTMLElement;
    /**
     * The location of the hint indicator when dragging on mobile devices.
     */
    hintLocation: {
        x: number;
        y: number;
    };
    id: string;
    _data: Array<any>;
    _localData: Array<any>;
    private localizationChangeSubscription;
    private dragStartSubscription;
    private dragOverSubscription;
    private dragLeaveSubscription;
    private dragEndSubscription;
    private animationDuration;
    private afterKeyPress;
    private sortableService;
    private _hideActiveItem;
    private direction;
    private _animating;
    private draggable;
    private offsetParent;
    protected setItemData(data: any, i: number): any;
    /**
     * @hidden
     */
    itemTemplate(index: number): TemplateRef<any>;
    constructor(ngZone: NgZone, localization: LocalizationService, changeDetector: ChangeDetectorRef, wrapper: ElementRef, sortableService: SortableService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngAfterContentInit(): void;
    ngAfterViewChecked(): void;
    /**
     * @hidden
     */
    updateCacheIndices(): void;
    /**
     * @hidden
     */
    cacheData(): void;
    /**
     * @hidden
     */
    startDrag(event: any): boolean;
    /**
     * @hidden
     */
    drag(event: any): boolean;
    /**
     * @hidden
     */
    leave(event: any): boolean;
    /**
     * @hidden
     */
    endDrag(event: any): boolean;
    /**
     * @hidden
     */
    hintVisible(): boolean;
    /**
     * @hidden
     */
    currentItemStyle(index: number): {
        [key: string]: string;
    };
    /**
     * @hidden
     */
    currentItemClass(index: number): string | string[] | Set<string>;
    /**
     * @hidden
     */
    hintStyle(): {
        [key: string]: string;
    };
    /**
     * @hidden
     */
    itemEnabled(index: number): boolean;
    /**
     * @hidden
     */
    acceptDragFrom(sortableComponent: SortableComponent): boolean;
    /**
     * @hidden
     */
    ariaDropEffect(index: number): string;
    /**
     * @hidden
     */
    focusHandler(index: number): void;
    /**
     * @hidden
     */
    blurHandler(): void;
    /**
     * @hidden
     */
    keydownHandler(event: any): void;
    /**
     * Removes the currently active item from the Data collection that the Sortable uses.
     */
    removeDataItem(index: number): void;
    /**
     * Sets a Boolean value that indicates whether the item will be hidden or not.
     * @hidden
     */
    hideItem(index: number, hidden?: boolean): void;
    /**
     * Sets a Boolean value that indicates whether the currently dragged item will be hidden.
     */
    /**
    * If the currently dragged item is hidden, returns `true`.
    * If the currently dragged item is visible, returns `false`.
    */
    hideActiveItem: boolean;
    /**
     * Clears the active item.
     * An active item is the item which becomes focused when the user navigates with the keyboard.
     */
    clearActiveItem(): void;
    /**
     * Returns the currently active item when the user navigates with the keyboard.
     * @return - The data item which is currently active.
     */
    getActiveItem(): any;
    /**
     * Adds a new data item to a particular index.
     * @param dataItem - The data item.
     * @param index - The index at which the data item is inserted.
     */
    addDataItem(dataItem: any, index: number): void;
    /**
     * Moves data item to a particular index.
     * @param fromIndex - The data item's index.
     * @param toIndex - The index which the data item should be moved to. Item currently sitting at that index is pushed back one position.
     */
    moveItem(fromIndex: number, toIndex: number): void;
    /**
     * @hidden
     */
    animate(draggables: any[]): void;
    /**
     * @hidden
     */
    positionHintFromEvent(event: any): void;
    /**
     * @hidden
     */
    parentOffset(): any;
    /**
     * @hidden
     */
    markForCheck(): void;
    /**
     * @hidden
     */
    reflow(element: any): void;
    /**
     * @hidden
     */
    applyAnimationStyle(el: any, prop: any, val: string): void;
    private subscribeEvents;
    private unsubscribeEvents;
    private placeHolderItemData;
    private fixFocus;
}
