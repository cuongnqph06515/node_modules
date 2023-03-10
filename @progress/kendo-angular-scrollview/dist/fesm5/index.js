import { ApplicationRef, Component, ContentChild, ElementRef, EventEmitter, HostBinding, HostListener, Input, NgModule, NgZone, Output, TemplateRef } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { DraggableModule, Keys } from '@progress/kendo-angular-common';
import { L10N_PREFIX, LocalizationService } from '@progress/kendo-angular-l10n';
import { CommonModule } from '@angular/common';

/**
 * @hidden
 */
var Dir;
(function (Dir) {
    Dir[Dir["Next"] = 1] = "Next";
    Dir[Dir["Prev"] = -1] = "Prev";
})(Dir || (Dir = {}));

/* tslint:disable:use-life-cycle-interface */
/** @hidden */
var iterator = getIterator();
// TODO: Move to kendo-common
function getIterator() {
    if (typeof Symbol === 'function' && Symbol.iterator) {
        return Symbol.iterator;
    }
    var keys = Object.getOwnPropertyNames(Map.prototype);
    var proto = Map.prototype;
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        if (key !== 'entries' && key !== 'size' && proto[key] === proto.entries) {
            return key;
        }
    }
}
var EMPTY_OBJ = {};
/**
 * @hidden
 */
var DataResultIterator = /** @class */ (function () {
    function DataResultIterator(source, index, endless, pageIndex, rtl) {
        this.rtl = false;
        this.source = source ? source : [];
        this.index = index ? index : 0;
        this.endless = endless;
        this.pageIndex = pageIndex;
        this.rtl = rtl;
    }
    Object.defineProperty(DataResultIterator.prototype, "data", {
        get: function () {
            var itemCount = this.total;
            var result;
            if (this.endless) {
                result = [
                    this.source[(this.index - 1 + itemCount) % itemCount],
                    this.source[this.index % itemCount],
                    this.source[(this.index + 1 + itemCount) % itemCount]
                ];
            }
            else {
                var data = [EMPTY_OBJ].concat(this.source, [EMPTY_OBJ]);
                result = data.slice(this.index, this.index + 3);
            }
            if (this.pageIndex !== null) {
                var isForward = this.pageIndex > this.index;
                result[isForward ? 2 : 0] = this.source[this.pageIndex];
            }
            return this.rtl ? result.reverse() : result;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataResultIterator.prototype, "total", {
        get: function () {
            return this.source.length;
        },
        enumerable: true,
        configurable: true
    });
    DataResultIterator.prototype.canMoveNext = function () {
        return (this.endless || (this.index < this.total - 1));
    };
    DataResultIterator.prototype.canMovePrev = function () {
        return (this.endless || this.index > 0);
    };
    DataResultIterator.prototype[iterator] = function () {
        return this.data[iterator]();
    };
    return DataResultIterator;
}());
/**
 * @hidden
 */
var DataCollection = /** @class */ (function () {
    function DataCollection(accessor) {
        this.accessor = accessor;
    }
    Object.defineProperty(DataCollection.prototype, "length", {
        get: function () { return this.accessor().data.length; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataCollection.prototype, "total", {
        get: function () { return this.accessor().total; },
        enumerable: true,
        configurable: true
    });
    DataCollection.prototype.item = function (index) {
        return this.accessor().data[index];
    };
    DataCollection.prototype.canMoveNext = function () {
        return this.accessor().canMoveNext();
    };
    DataCollection.prototype.canMovePrev = function () {
        return this.accessor().canMovePrev();
    };
    DataCollection.prototype[Symbol.iterator] = function () {
        return this.accessor()[Symbol.iterator]();
    };
    return DataCollection;
}());

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
var ScrollViewComponent = /** @class */ (function () {
    function ScrollViewComponent(element, application, localization, ngZone) {
        var _this = this;
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
        this.view = new DataCollection(function () {
            return new DataResultIterator(_this.data, _this.activeIndex, _this.endless, _this.pageIndex, _this.isRTL);
        });
        this.isDataSourceEmpty = false;
        this._activeIndex = 0;
        this.index = 0;
        this.pageIndex = null;
        this.transforms = ["translateX(-100%)", "translateX(0%)", "translateX(100%)"];
    }
    Object.defineProperty(ScrollViewComponent.prototype, "activeIndex", {
        get: function () {
            return this._activeIndex;
        },
        /**
         * Represents the current item index ([see example]({% slug activeitems_scrollview %})).
         */
        set: function (value) {
            this.index = this._activeIndex = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScrollViewComponent.prototype, "widgetClass", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScrollViewComponent.prototype, "scrollViewClass", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScrollViewComponent.prototype, "hostWidth", {
        get: function () { return this.width; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScrollViewComponent.prototype, "hostHeight", {
        get: function () { return this.height; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScrollViewComponent.prototype, "tabIndex", {
        get: function () { return 1; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScrollViewComponent.prototype, "ariaLive", {
        get: function () { return "assertive"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScrollViewComponent.prototype, "dir", {
        get: function () {
            return this.direction;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScrollViewComponent.prototype, "direction", {
        get: function () {
            return this.localization.rtl ? 'rtl' : 'ltr';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    ScrollViewComponent.prototype.keyDown = function (e) {
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
    };
    /**
     * @hidden
     */
    ScrollViewComponent.prototype.ngOnChanges = function (_) {
        this.activeIndex = Math.max(Math.min(this.activeIndex, this.view.total - 1), 0);
    };
    /**
     * Navigates the ScrollView to the previous item.
     */
    ScrollViewComponent.prototype.prev = function () {
        this.navigate(Dir.Prev);
    };
    /**
     * Navigates the ScrollView to the next item.
     */
    ScrollViewComponent.prototype.next = function () {
        this.navigate(Dir.Next);
    };
    /**
     * @hidden
     */
    ScrollViewComponent.prototype.transitionEndHandler = function (e) {
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
    };
    /**
     * @hidden
     */
    ScrollViewComponent.prototype.handlePress = function (e) {
        this.initialTouchCoordinate = e.pageX;
    };
    /**
     * @hidden
     */
    ScrollViewComponent.prototype.handleDrag = function (e) {
        var _this = this;
        var deltaX = e.pageX - this.initialTouchCoordinate;
        if (!this.animationState && !this.isDragForbidden(deltaX) && this.draggedInsideBounds(deltaX)) {
            // TO DO: refactor to apply style without triggering the change detection
            this.ngZone.run(function () {
                _this.transitionStyle = { transform: "translateX(" + deltaX + "px)" };
            });
        }
    };
    /**
     * @hidden
     */
    ScrollViewComponent.prototype.handleRelease = function (e) {
        var _this = this;
        var deltaX = e.pageX - this.initialTouchCoordinate;
        if (this.isDragForbidden(deltaX)) {
            return;
        }
        this.ngZone.run(function () {
            if (_this.draggedEnoughToNavigate(deltaX)) {
                if (_this.isRTL) {
                    _this.changeIndex(deltaX < 0 ? Dir.Prev : Dir.Next);
                }
                else {
                    _this.changeIndex(deltaX > 0 ? Dir.Prev : Dir.Next);
                }
                if (!_this.animate) {
                    _this.transitionStyle = null;
                    _this.itemChanged.emit({ index: _this.activeIndex, item: _this.view.item(1) });
                }
            }
            else if (Math.abs(deltaX) > 0) {
                if (_this.animate) {
                    _this.animationState = "center";
                }
                else {
                    _this.transitionStyle = null;
                }
            }
        });
    };
    /**
     * @hidden
     */
    ScrollViewComponent.prototype.pageChange = function (idx) {
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
    };
    /**
     * @hidden
     */
    ScrollViewComponent.prototype.inlineStyles = function (idx) {
        return {
            "height": this.height,
            "transform": this.transforms[idx],
            "width": this.width
        };
    };
    /**
     * @hidden
     */
    ScrollViewComponent.prototype.displayLeftArrow = function () {
        var isNotBorderItem;
        if (this.isRTL) {
            isNotBorderItem = this.activeIndex + 1 < this.view.total;
        }
        else {
            isNotBorderItem = this.activeIndex > 0;
        }
        return (this.endless || isNotBorderItem) && this.view.total > 0;
    };
    /**
     * @hidden
     */
    ScrollViewComponent.prototype.leftArrowClick = function () {
        if (this.isRTL) {
            this.next();
        }
        else {
            this.prev();
        }
    };
    /**
     * @hidden
     */
    ScrollViewComponent.prototype.displayRightArrow = function () {
        var isNotBorderItem;
        if (this.isRTL) {
            isNotBorderItem = this.activeIndex > 0;
        }
        else {
            isNotBorderItem = this.activeIndex + 1 < this.view.total;
        }
        return (this.endless || isNotBorderItem) && this.view.total > 0;
    };
    /**
     * @hidden
     */
    ScrollViewComponent.prototype.rightArrowClick = function () {
        if (this.isRTL) {
            this.prev();
        }
        else {
            this.next();
        }
    };
    ScrollViewComponent.prototype.draggedInsideBounds = function (deltaX) {
        return Math.abs(deltaX) <= this.element.nativeElement.offsetWidth;
    };
    ScrollViewComponent.prototype.draggedEnoughToNavigate = function (deltaX) {
        return Math.abs(deltaX) > (this.element.nativeElement.offsetWidth / 2);
    };
    ScrollViewComponent.prototype.isDragForbidden = function (deltaX) {
        var pastEnd;
        var isEndReached;
        if (this.isRTL) {
            pastEnd = deltaX < 0 && deltaX !== 0;
        }
        else {
            pastEnd = deltaX > 0 && deltaX !== 0;
        }
        isEndReached = ((this.activeIndex === 0 && pastEnd) || (this.activeIndex === this.view.total - 1 && !pastEnd));
        return !this.endless && isEndReached;
    };
    ScrollViewComponent.prototype.navigate = function (direction) {
        if (this.isDataSourceEmpty || this.animationState) {
            return;
        }
        this.changeIndex(direction);
        if (!this.animate) {
            this.itemChanged.emit({ index: this.activeIndex, item: this.view.item(1) });
        }
    };
    ScrollViewComponent.prototype.changeIndex = function (direction) {
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
    };
    Object.defineProperty(ScrollViewComponent.prototype, "isRTL", {
        get: function () {
            return this.direction === "rtl";
        },
        enumerable: true,
        configurable: true
    });
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
                    template: "\n      <ul class='k-scrollview'\n        [ngStyle]=\"transitionStyle\"\n        [@animateTo]=\"animationState\" (@animateTo.done)= \"transitionEndHandler($event)\"\n        kendoDraggable\n        (kendoDrag) = \"handleDrag($event)\" (kendoPress) = \"handlePress($event)\" (kendoRelease) = \"handleRelease($event)\">\n        <li *ngFor=\"let item of view;let i=index\"\n          [ngStyle]=\"inlineStyles(i)\"\n          [attr.aria-hidden]=\"i !== 1\">\n            <ng-template\n              [ngTemplateOutlet]=\"itemTemplateRef\"\n              [ngTemplateOutletContext]=\"{ item: item }\">\n            </ng-template>\n        </li>\n      </ul>\n      <div class='k-scrollview-elements'\n        [ngStyle]=\"{'height': height}\"\n        *ngIf=\"!isDataSourceEmpty && (pageable||arrows)\">\n        <a class=\"k-scrollview-prev\"\n          aria-label=\"previous\"\n          *ngIf=\"arrows && displayLeftArrow()\"\n          (click)=\"leftArrowClick()\">\n          <span class=\"k-icon k-i-arrowhead-w\"></span>\n        </a>\n        <a class=\"k-scrollview-next\"\n          aria-label=\"next\"\n          *ngIf=\"arrows && displayRightArrow()\"\n          (click)=\"rightArrowClick()\">\n            <span class=\"k-icon k-i-arrowhead-e\"></span>\n        </a>\n        <kendo-scrollview-pager *ngIf=\"pageable\"\n          (pagerIndexChange)=\"pageChange($event)\"\n          [data]=\"data\"\n          [activeIndex]=\"activeIndex\">\n        </kendo-scrollview-pager>\n      </div>\n    "
                },] },
    ];
    /** @nocollapse */
    ScrollViewComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ApplicationRef },
        { type: LocalizationService },
        { type: NgZone }
    ]; };
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
    return ScrollViewComponent;
}());

/**
 * @hidden
 */
var ScrollViewPagerComponent = /** @class */ (function () {
    function ScrollViewPagerComponent() {
        this.pagerIndexChange = new EventEmitter();
    }
    ScrollViewPagerComponent.prototype.itemClass = function (idx) {
        return {
            'k-primary': idx === this.activeIndex
        };
    };
    ScrollViewPagerComponent.prototype.indexChange = function (selectedIndex) {
        this.pagerIndexChange.emit(selectedIndex);
    };
    ScrollViewPagerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-scrollview-pager',
                    template: "\n      <ul class=\"k-scrollview-pageable\">\n        <li class=\"k-button\" *ngFor=\"let item of data; let i = index\"\n            [ngClass]=\"itemClass(i)\"\n            (click)=\"indexChange(i)\">\n        </li>\n      </ul>\n    "
                },] },
    ];
    ScrollViewPagerComponent.propDecorators = {
        activeIndex: [{ type: Input }],
        data: [{ type: Input }],
        pagerIndexChange: [{ type: Output }]
    };
    return ScrollViewPagerComponent;
}());

var DECLARATIONS = [
    ScrollViewComponent,
    ScrollViewPagerComponent
];
var EXPORTS = [
    ScrollViewComponent
];
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the ScrollView component.
 *
 * @example
 *
 * ```ts-no-run
 * // Import the ScrollView module
 * import { ScrollViewModule } from '@progress/kendo-angular-scrollview';
 *
 * // The browser platform with a compiler
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 *
 * import { NgModule } from '@angular/core';
 *
 * // Import the app component
 * import { AppComponent } from './app.component';
 *
 * // Define the app module
 * _@NgModule({
 *     declarations: [AppComponent], // declare app component
 *     imports:      [BrowserModule, ScrollViewModule], // import ScrollView module
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 *
 * ```
 */
var ScrollViewModule = /** @class */ (function () {
    function ScrollViewModule() {
    }
    ScrollViewModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [DECLARATIONS],
                    exports: [EXPORTS],
                    imports: [CommonModule, DraggableModule]
                },] },
    ];
    return ScrollViewModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { ScrollViewComponent, ScrollViewModule, ScrollViewPagerComponent };
