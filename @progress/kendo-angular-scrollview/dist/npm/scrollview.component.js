"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var animations_1 = require("@angular/animations");
var enums_1 = require("./enums");
var kendo_angular_common_1 = require("@progress/kendo-angular-common");
var data_collection_1 = require("./data.collection");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
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
        this.itemChanged = new core_1.EventEmitter();
        this.touchAction = 'pan-y pinch-zoom';
        this.animationState = null;
        this.transitionStyle = {};
        this.view = new data_collection_1.DataCollection(function () {
            return new data_collection_1.DataResultIterator(_this.data, _this.activeIndex, _this.endless, _this.pageIndex, _this.isRTL);
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
        if (e.keyCode === kendo_angular_common_1.Keys.ArrowLeft) {
            if (this.isRTL) {
                this.next();
            }
            else {
                this.prev();
            }
        }
        if (e.keyCode === kendo_angular_common_1.Keys.ArrowRight) {
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
        this.navigate(enums_1.Dir.Prev);
    };
    /**
     * Navigates the ScrollView to the next item.
     */
    ScrollViewComponent.prototype.next = function () {
        this.navigate(enums_1.Dir.Next);
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
                    _this.changeIndex(deltaX < 0 ? enums_1.Dir.Prev : enums_1.Dir.Next);
                }
                else {
                    _this.changeIndex(deltaX > 0 ? enums_1.Dir.Prev : enums_1.Dir.Next);
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
        if (direction === enums_1.Dir.Next && this.view.canMoveNext()) {
            this.index = (this.index + 1) % this.view.total;
            if (this.animate) {
                this.animationState = this.isRTL ? "right" : "left";
            }
            else {
                this.activeIndex = this.index;
            }
        }
        else if (direction === enums_1.Dir.Prev && this.view.canMovePrev()) {
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
        { type: core_1.Component, args: [{
                    animations: [
                        animations_1.trigger('animateTo', [
                            animations_1.state('center, left, right', animations_1.style({ transform: 'translateX(0)' })),
                            animations_1.transition('* => right', [
                                animations_1.animate('300ms ease-out', animations_1.style({ transform: 'translateX(100%)' }))
                            ]),
                            animations_1.transition('* => left', [
                                animations_1.animate('300ms ease-out', animations_1.style({ transform: 'translateX(-100%)' }))
                            ]),
                            animations_1.transition('* => center', [
                                animations_1.animate('300ms ease-out')
                            ])
                        ])
                    ],
                    exportAs: 'kendoScrollView',
                    providers: [
                        kendo_angular_l10n_1.LocalizationService,
                        {
                            provide: kendo_angular_l10n_1.L10N_PREFIX,
                            useValue: 'kendo.scrollview'
                        }
                    ],
                    selector: 'kendo-scrollview',
                    template: "\n      <ul class='k-scrollview'\n        [ngStyle]=\"transitionStyle\"\n        [@animateTo]=\"animationState\" (@animateTo.done)= \"transitionEndHandler($event)\"\n        kendoDraggable\n        (kendoDrag) = \"handleDrag($event)\" (kendoPress) = \"handlePress($event)\" (kendoRelease) = \"handleRelease($event)\">\n        <li *ngFor=\"let item of view;let i=index\"\n          [ngStyle]=\"inlineStyles(i)\"\n          [attr.aria-hidden]=\"i !== 1\">\n            <ng-template\n              [ngTemplateOutlet]=\"itemTemplateRef\"\n              [ngTemplateOutletContext]=\"{ item: item }\">\n            </ng-template>\n        </li>\n      </ul>\n      <div class='k-scrollview-elements'\n        [ngStyle]=\"{'height': height}\"\n        *ngIf=\"!isDataSourceEmpty && (pageable||arrows)\">\n        <a class=\"k-scrollview-prev\"\n          aria-label=\"previous\"\n          *ngIf=\"arrows && displayLeftArrow()\"\n          (click)=\"leftArrowClick()\">\n          <span class=\"k-icon k-i-arrowhead-w\"></span>\n        </a>\n        <a class=\"k-scrollview-next\"\n          aria-label=\"next\"\n          *ngIf=\"arrows && displayRightArrow()\"\n          (click)=\"rightArrowClick()\">\n            <span class=\"k-icon k-i-arrowhead-e\"></span>\n        </a>\n        <kendo-scrollview-pager *ngIf=\"pageable\"\n          (pagerIndexChange)=\"pageChange($event)\"\n          [data]=\"data\"\n          [activeIndex]=\"activeIndex\">\n        </kendo-scrollview-pager>\n      </div>\n    "
                },] },
    ];
    /** @nocollapse */
    ScrollViewComponent.ctorParameters = function () { return [
        { type: core_1.ElementRef },
        { type: core_1.ApplicationRef },
        { type: kendo_angular_l10n_1.LocalizationService },
        { type: core_1.NgZone }
    ]; };
    ScrollViewComponent.propDecorators = {
        data: [{ type: core_1.Input }],
        activeIndex: [{ type: core_1.Input }],
        width: [{ type: core_1.Input }],
        height: [{ type: core_1.Input }],
        endless: [{ type: core_1.Input }],
        animate: [{ type: core_1.Input }],
        pageable: [{ type: core_1.Input }],
        arrows: [{ type: core_1.Input }],
        itemChanged: [{ type: core_1.Output }],
        itemTemplateRef: [{ type: core_1.ContentChild, args: [core_1.TemplateRef,] }],
        widgetClass: [{ type: core_1.HostBinding, args: ['class.k-widget',] }],
        scrollViewClass: [{ type: core_1.HostBinding, args: ['class.k-scrollview-wrap',] }],
        hostWidth: [{ type: core_1.HostBinding, args: ['style.width',] }],
        hostHeight: [{ type: core_1.HostBinding, args: ['style.height',] }],
        tabIndex: [{ type: core_1.HostBinding, args: ['attr.tabindex',] }],
        ariaLive: [{ type: core_1.HostBinding, args: ['attr.aria-live',] }],
        dir: [{ type: core_1.HostBinding, args: ['attr.dir',] }],
        touchAction: [{ type: core_1.HostBinding, args: ['style.touch-action',] }],
        keyDown: [{ type: core_1.HostListener, args: ['keydown', ['$event'],] }]
    };
    return ScrollViewComponent;
}());
exports.ScrollViewComponent = ScrollViewComponent;
