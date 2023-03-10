import { ApplicationRef, ElementRef, EventEmitter, OnChanges, TemplateRef, NgZone } from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import { AnimationState } from './enums';
import { ItemChangedEvent } from './change-event-args';
import { DataCollection } from './data.collection';
import { Direction } from './direction';
import { LocalizationService } from '@progress/kendo-angular-l10n';
/**
 * Represents the [Kendo UI ScrollView component for Angular]({% slug overview_scrollview %}).
 *
 * @example
 * ```ts
 *
 * _@Component({
 *     selector: 'my-app',
 *     template: `
 *       <kendo-scrollview
 *          [data]="items"
 *          [width]="width"
 *          [height]="height"
 *          [endless]="endless"
 *          [pageable]="pageable">
 *         <ng-template let-item="item">
 *           <h2 class="demo-title">{{item.title}}</h2>
 *           <img src='{{item.url}}' alt='{{item.title}}' [ngStyle]="{minWidth: width}" draggable="false" />
 *         </ng-template>
 *       </kendo-scrollview>
 *     `,
 *     styles: [`
 *       .k-scrollview-wrap {
 *         margin: 0 auto;
 *       }
 *       .demo-title {
 *         position: absolute;
 *         top: 0;
 *         left: 0;
 *         right: 0;
 *         margin: 0;
 *         padding: 15px;
 *         color: #fff;
 *         background-color: rgba(0,0,0,.4);
 *         text-align: center;
 *         font-size: 24px;
 *       }
 *     `]
 * })
 *
 * class AppComponent {
 *  public width: string = "600px";
 *  public height: string = "400px";
 *  public endless: boolean = false;
 *  public pageable: boolean = false;
 *  public items: any[] = [
 *       { title: 'Flower', url: 'https://bit.ly/2cJjYuB' },
 *       { title: 'Mountain', url: 'https://bit.ly/2cTBNaL' },
 *       { title: 'Sky', url: 'https://bit.ly/2cJl3Cx' }
 *  ];
 * }
 * ```
 */
export declare class ScrollViewComponent implements OnChanges {
    protected element: ElementRef;
    protected application: ApplicationRef;
    private localization;
    private ngZone;
    /**
     * Provides the data source for the ScrollView ([see example]({% slug datasources_scrollview %})).
     */
    data: Array<any>;
    /**
     * Represents the current item index ([see example]({% slug activeitems_scrollview %})).
     */
    activeIndex: number;
    /**
     * Sets the width of the ScrollView ([see example]({% slug dimensions_scrollview %})).
     * By default, the width is not set and you have to explicitly define the `width` value.
     */
    width: string;
    /**
     * Sets the height of the ScrollView ([see example]({% slug dimensions_scrollview %})).
     * By default, the height is not set and you have to explicitly define the `height` value.
     */
    height: string;
    /**
     * Enables or disables the endless scrolling mode in which the data source items are endlessly looped
     * ([see example]({% slug endlessscrolling_scrollview %})). By default, `endless` is set to `false`
     * and the endless scrolling mode is disabled.
     */
    endless: boolean;
    /**
     * Enables or disables the built-in animations ([see example]({% slug animations_scrollview %})).
     * By default, `animate` is set to `true` and animations are enabled.
     */
    animate: boolean;
    /**
     * Enables or disables the built-in pager ([see example]({% slug paging_scrollview %})).
     * By default, `pageable` is set to `false` and paging is disabled.
     */
    pageable: boolean;
    /**
     * Enables or disables the built-in navigation arrows ([see example]({% slug arrows_scrollview %})).
     * By default, `arrows` is set to `false` and arrows are disabled.
     */
    arrows: boolean;
    /**
     * Fires after the current item is changed.
     */
    itemChanged: EventEmitter<ItemChangedEvent>;
    itemTemplateRef: TemplateRef<any>;
    readonly widgetClass: boolean;
    readonly scrollViewClass: boolean;
    readonly hostWidth: string;
    readonly hostHeight: string;
    readonly tabIndex: number;
    readonly ariaLive: string;
    readonly dir: Direction;
    touchAction: string;
    animationState: AnimationState;
    transitionStyle: {
        [key: string]: string;
    };
    view: DataCollection;
    isDataSourceEmpty: boolean;
    private _activeIndex;
    private index;
    private initialTouchCoordinate;
    private pageIndex;
    private transforms;
    private readonly direction;
    constructor(element: ElementRef, application: ApplicationRef, localization: LocalizationService, ngZone: NgZone);
    /**
     * @hidden
     */
    keyDown(e: any): void;
    /**
     * @hidden
     */
    ngOnChanges(_: any): void;
    /**
     * Navigates the ScrollView to the previous item.
     */
    prev(): void;
    /**
     * Navigates the ScrollView to the next item.
     */
    next(): void;
    /**
     * @hidden
     */
    transitionEndHandler(e: AnimationEvent): void;
    /**
     * @hidden
     */
    handlePress(e: any): void;
    /**
     * @hidden
     */
    handleDrag(e: any): void;
    /**
     * @hidden
     */
    handleRelease(e: any): void;
    /**
     * @hidden
     */
    pageChange(idx: number): void;
    /**
     * @hidden
     */
    inlineStyles(idx: number): {
        [key: string]: string;
    };
    /**
     * @hidden
     */
    displayLeftArrow(): boolean;
    /**
     * @hidden
     */
    leftArrowClick(): void;
    /**
     * @hidden
     */
    displayRightArrow(): boolean;
    /**
     * @hidden
     */
    rightArrowClick(): void;
    protected draggedInsideBounds(deltaX: number): boolean;
    protected draggedEnoughToNavigate(deltaX: number): boolean;
    protected isDragForbidden(deltaX: number): boolean;
    private navigate;
    private changeIndex;
    private readonly isRTL;
}
