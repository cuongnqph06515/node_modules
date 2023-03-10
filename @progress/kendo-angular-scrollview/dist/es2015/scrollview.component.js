import { ApplicationRef, Component, ContentChild, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output, TemplateRef, NgZone } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Dir } from './enums';
import { Keys } from '@progress/kendo-angular-common';
import { DataCollection, DataResultIterator } from './data.collection';
import { LocalizationService, L10N_PREFIX } from '@progress/kendo-angular-l10n';
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
export class ScrollViewComponent {
    constructor(element, application, localization, ngZone) {
        this.element = element;
        this.application = application;
        this.localization = localization;
        this.ngZone = ngZone;
        /**
         * Provides the data source for the ScrollView ([see example]({% slug datasources_scrollview %})).
         */
        this.data = [];
        /**
         * Enables or disables the endless scrolling mode in which the data source items are endlessly looped
         * ([see example]({% slug endlessscrolling_scrollview %})). By default, `endless` is set to `false`
         * and the endless scrolling mode is disabled.
         */
        this.endless = false;
        /**
         * Enables or disables the built-in animations ([see example]({% slug animations_scrollview %})).
         * By default, `animate` is set to `true` and animations are enabled.
         */
        this.animate = true;
        /**
         * Enables or disables the built-in pager ([see example]({% slug paging_scrollview %})).
         * By default, `pageable` is set to `false` and paging is disabled.
         */
        this.pageable = false;
        /**
         * Enables or disables the built-in navigation arrows ([see example]({% slug arrows_scrollview %})).
         * By default, `arrows` is set to `false` and arrows are disabled.
         */
        this.arrows = false;
        /**
         * Fires after the current item is changed.
         */
        this.itemChanged = new EventEmitter();
        this.touchAction = 'pan-y pinch-zoom';
        this.animationState = null;
        this.transitionStyle = {};
        this.view = new DataCollection(() => new DataResultIterator(this.data, this.activeIndex, this.endless, this.pageIndex, this.isRTL));
        this.isDataSourceEmpty = false;
        this._activeIndex = 0;
        this.index = 0;
        this.pageIndex = null;
        this.transforms = ["translateX(-100%)", "translateX(0%)", "translateX(100%)"];
    }
    /**
     * Represents the current item index ([see example]({% slug activeitems_scrollview %})).
     */
    set activeIndex(value) {
        this.index = this._activeIndex = value;
    }
    get activeIndex() {
        return this._activeIndex;
    }
    get widgetClass() {
        return true;
    }
    get scrollViewClass() {
        return true;
    }
    get hostWidth() { return this.width; }
    get hostHeight() { return this.height; }
    get tabIndex() { return 1; }
    get ariaLive() { return "assertive"; }
    get dir() {
        return this.direction;
    }
    get direction() {
        return this.localization.rtl ? 'rtl' : 'ltr';
    }
    /**
     * @hidden
     */
    keyDown(e) {
        if (e.keyCode === Keys.ArrowLeft) {
            if (this.isRTL) {
                this.next();
            }
            else {
                this.prev();
            }
        }
        if (e.keyCode === Keys.ArrowRight) {
            if (this.isRTL) {
                this.prev();
            }
            else {
                this.next();
            }
        }
    }
    /**
     * @hidden
     */
    ngOnChanges(_) {
        this.activeIndex = Math.max(Math.min(this.activeIndex, this.view.total - 1), 0);
    }
    /**
     * Navigates the ScrollView to the previous item.
     */
    prev() {
        this.navigate(Dir.Prev);
    }
    /**
     * Navigates the ScrollView to the next item.
     */
    next() {
        this.navigate(Dir.Next);
    }
    /**
     * @hidden
     */
    transitionEndHandler(e) {
        this.animationState = null;
        if (e.toState === "left" || e.toState === "right") {
            if (this.pageIndex !== null) {
                this.activeIndex = this.pageIndex;
                this.pageIndex = null;
            }
            this.activeIndex = this.index;
            this.itemChanged.emit({ index: this.activeIndex, item: this.view.item(1) });
            this.application.tick();
        }
    }
    /**
     * @hidden
     */
    handlePress(e) {
        this.initialTouchCoordinate = e.pageX;
    }
    /**
     * @hidden
     */
    handleDrag(e) {
        const deltaX = e.pageX - this.initialTouchCoordinate;
        if (!this.animationState && !this.isDragForbidden(deltaX) && this.draggedInsideBounds(deltaX)) {
            // TO DO: refactor to apply style without triggering the change detection
            this.ngZone.run(() => {
                this.transitionStyle = { transform: `translateX(${deltaX}px)` };
            });
        }
    }
    /**
     * @hidden
     */
    handleRelease(e) {
        const deltaX = e.pageX - this.initialTouchCoordinate;
        if (this.isDragForbidden(deltaX)) {
            return;
        }
        this.ngZone.run(() => {
            if (this.draggedEnoughToNavigate(deltaX)) {
                if (this.isRTL) {
                    this.changeIndex(deltaX < 0 ? Dir.Prev : Dir.Next);
                }
                else {
                    this.changeIndex(deltaX > 0 ? Dir.Prev : Dir.Next);
                }
                if (!this.animate) {
                    this.transitionStyle = null;
                    this.itemChanged.emit({ index: this.activeIndex, item: this.view.item(1) });
                }
            }
            else if (Math.abs(deltaX) > 0) {
                if (this.animate) {
                    this.animationState = "center";
                }
                else {
                    this.transitionStyle = null;
                }
            }
        });
    }
    /**
     * @hidden
     */
    pageChange(idx) {
        if (!this.animationState && this.activeIndex !== idx) {
            if (this.animate) {
                this.pageIndex = idx;
                if (this.isRTL) {
                    this.animationState = (this.pageIndex > this.index ? "right" : "left");
                }
                else {
                    this.animationState = (this.pageIndex > this.index ? "left" : "right");
                }
            }
            else {
                this.activeIndex = idx;
            }
        }
    }
    /**
     * @hidden
     */
    inlineStyles(idx) {
        return {
            "height": this.height,
            "transform": this.transforms[idx],
            "width": this.width
        };
    }
    /**
     * @hidden
     */
    displayLeftArrow() {
        let isNotBorderItem;
        if (this.isRTL) {
            isNotBorderItem = this.activeIndex + 1 < this.view.total;
        }
        else {
            isNotBorderItem = this.activeIndex > 0;
        }
        return (this.endless || isNotBorderItem) && this.view.total > 0;
    }
    /**
     * @hidden
     */
    leftArrowClick() {
        if (this.isRTL) {
            this.next();
        }
        else {
            this.prev();
        }
    }
    /**
     * @hidden
     */
    displayRightArrow() {
        let isNotBorderItem;
        if (this.isRTL) {
            isNotBorderItem = this.activeIndex > 0;
        }
        else {
            isNotBorderItem = this.activeIndex + 1 < this.view.total;
        }
        return (this.endless || isNotBorderItem) && this.view.total > 0;
    }
    /**
     * @hidden
     */
    rightArrowClick() {
        if (this.isRTL) {
            this.prev();
        }
        else {
            this.next();
        }
    }
    draggedInsideBounds(deltaX) {
        return Math.abs(deltaX) <= this.element.nativeElement.offsetWidth;
    }
    draggedEnoughToNavigate(deltaX) {
        return Math.abs(deltaX) > (this.element.nativeElement.offsetWidth / 2);
    }
    isDragForbidden(deltaX) {
        let pastEnd;
        let isEndReached;
        if (this.isRTL) {
            pastEnd = deltaX < 0 && deltaX !== 0;
        }
        else {
            pastEnd = deltaX > 0 && deltaX !== 0;
        }
        isEndReached = ((this.activeIndex === 0 && pastEnd) || (this.activeIndex === this.view.total - 1 && !pastEnd));
        return !this.endless && isEndReached;
    }
    navigate(direction) {
        if (this.isDataSourceEmpty || this.animationState) {
            return;
        }
        this.changeIndex(direction);
        if (!this.animate) {
            this.itemChanged.emit({ index: this.activeIndex, item: this.view.item(1) });
        }
    }
    changeIndex(direction) {
        if (direction === Dir.Next && this.view.canMoveNext()) {
            this.index = (this.index + 1) % this.view.total;
            if (this.animate) {
                this.animationState = this.isRTL ? "right" : "left";
            }
            else {
                this.activeIndex = this.index;
            }
        }
        else if (direction === Dir.Prev && this.view.canMovePrev()) {
            this.index = this.index === 0 ? this.view.total - 1 : this.index - 1;
            if (this.animate) {
                this.animationState = this.isRTL ? "left" : "right";
            }
            else {
                this.activeIndex = this.index;
            }
        }
    }
    get isRTL() {
        return this.direction === "rtl";
    }
}
ScrollViewComponent.decorators = [
    { type: Component, args: [{
                animations: [
                    trigger('animateTo', [
                        state('center, left, right', style({ transform: 'translateX(0)' })),
                        transition('* => right', [
                            animate('300ms ease-out', style({ transform: 'translateX(100%)' }))
                        ]),
                        transition('* => left', [
                            animate('300ms ease-out', style({ transform: 'translateX(-100%)' }))
                        ]),
                        transition('* => center', [
                            animate('300ms ease-out')
                        ])
                    ])
                ],
                exportAs: 'kendoScrollView',
                providers: [
                    LocalizationService,
                    {
                        provide: L10N_PREFIX,
                        useValue: 'kendo.scrollview'
                    }
                ],
                selector: 'kendo-scrollview',
                template: `
      <ul class='k-scrollview'
        [ngStyle]="transitionStyle"
        [@animateTo]="animationState" (@animateTo.done)= "transitionEndHandler($event)"
        kendoDraggable
        (kendoDrag) = "handleDrag($event)" (kendoPress) = "handlePress($event)" (kendoRelease) = "handleRelease($event)">
        <li *ngFor="let item of view;let i=index"
          [ngStyle]="inlineStyles(i)"
          [attr.aria-hidden]="i !== 1">
            <ng-template
              [ngTemplateOutlet]="itemTemplateRef"
              [ngTemplateOutletContext]="{ item: item }">
            </ng-template>
        </li>
      </ul>
      <div class='k-scrollview-elements'
        [ngStyle]="{'height': height}"
        *ngIf="!isDataSourceEmpty && (pageable||arrows)">
        <a class="k-scrollview-prev"
          aria-label="previous"
          *ngIf="arrows && displayLeftArrow()"
          (click)="leftArrowClick()">
          <span class="k-icon k-i-arrowhead-w"></span>
        </a>
        <a class="k-scrollview-next"
          aria-label="next"
          *ngIf="arrows && displayRightArrow()"
          (click)="rightArrowClick()">
            <span class="k-icon k-i-arrowhead-e"></span>
        </a>
        <kendo-scrollview-pager *ngIf="pageable"
          (pagerIndexChange)="pageChange($event)"
          [data]="data"
          [activeIndex]="activeIndex">
        </kendo-scrollview-pager>
      </div>
    `
            },] },
];
/** @nocollapse */
ScrollViewComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: ApplicationRef },
    { type: LocalizationService },
    { type: NgZone }
];
ScrollViewComponent.propDecorators = {
    data: [{ type: Input }],
    activeIndex: [{ type: Input }],
    width: [{ type: Input }],
    height: [{ type: Input }],
    endless: [{ type: Input }],
    animate: [{ type: Input }],
    pageable: [{ type: Input }],
    arrows: [{ type: Input }],
    itemChanged: [{ type: Output }],
    itemTemplateRef: [{ type: ContentChild, args: [TemplateRef,] }],
    widgetClass: [{ type: HostBinding, args: ['class.k-widget',] }],
    scrollViewClass: [{ type: HostBinding, args: ['class.k-scrollview-wrap',] }],
    hostWidth: [{ type: HostBinding, args: ['style.width',] }],
    hostHeight: [{ type: HostBinding, args: ['style.height',] }],
    tabIndex: [{ type: HostBinding, args: ['attr.tabindex',] }],
    ariaLive: [{ type: HostBinding, args: ['attr.aria-live',] }],
    dir: [{ type: HostBinding, args: ['attr.dir',] }],
    touchAction: [{ type: HostBinding, args: ['style.touch-action',] }],
    keyDown: [{ type: HostListener, args: ['keydown', ['$event'],] }]
};
