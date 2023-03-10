/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var kendo_angular_intl_1 = require("@progress/kendo-angular-intl");
var bus_view_service_1 = require("./services/bus-view.service");
var dom_service_1 = require("./services/dom.service");
var view_enum_1 = require("./models/view.enum");
var virtualization_component_1 = require("../virtualization/virtualization.component");
var defaults_1 = require("../defaults");
var kendo_date_math_1 = require("@progress/kendo-date-math");
var util_1 = require("../util");
var dom_queries_1 = require("../common/dom-queries");
var ITEMS_COUNT = 30;
/**
 * @hidden
 */
var NavigationComponent = /** @class */ (function () {
    function NavigationComponent(bus, dom, intl, cdr, renderer) {
        this.bus = bus;
        this.dom = dom;
        this.intl = intl;
        this.cdr = cdr;
        this.renderer = renderer;
        this.min = new Date(defaults_1.MIN_DATE);
        this.max = new Date(defaults_1.MAX_DATE);
        this.focusedDate = new Date();
        this.valueChange = new core_1.EventEmitter();
        this.pageChange = new core_1.EventEmitter();
        this.dates = [];
        this.take = ITEMS_COUNT;
        this.indexToScroll = -1;
    }
    Object.defineProperty(NavigationComponent.prototype, "getComponentClass", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    NavigationComponent.prototype.ngOnInit = function () {
        this.dom.ensureHeights();
        var calendarHeight = this.dom.calendarHeight;
        this.itemHeight = this.dom.navigationItemHeight;
        this.maxViewHeight = this.dom.monthViewHeight;
        this.topOffset = (calendarHeight - this.itemHeight) / 2;
        this.bottomOffset = calendarHeight - this.itemHeight;
        this.intlSubscription = this.intl.changes.subscribe(this.intlChange.bind(this));
    };
    NavigationComponent.prototype.ngOnChanges = function (changes) {
        this.service = this.bus.service(this.activeView);
        if (!this.service) {
            return;
        }
        this.activeViewValue = view_enum_1.CalendarViewEnum[this.activeView];
        var viewDate = util_1.dateInRange(this.focusedDate, this.min, this.max);
        var total = this.service.total(this.min, this.max);
        var totalChanged = this.total && this.total !== total;
        this.skip = this.service.skip(viewDate, this.min);
        this.total = total;
        if (totalChanged || !this.service.isInArray(viewDate, this.dates)) {
            this.dates = this.service.datesList(viewDate, this.getTake(this.skip));
        }
        if (!!changes.focusedDate || totalChanged) {
            this.indexToScroll = this.service.skip(this.focusedDate, this.min);
        }
    };
    NavigationComponent.prototype.ngOnDestroy = function () {
        if (this.intlSubscription) {
            this.intlSubscription.unsubscribe();
        }
    };
    NavigationComponent.prototype.ngAfterViewInit = function () {
        if (this.indexToScroll === -1) {
            return;
        }
        this.virtualization.scrollToIndex(this.indexToScroll);
        this.indexToScroll = -1;
    };
    NavigationComponent.prototype.ngAfterViewChecked = function () {
        if (this.indexToScroll === -1) {
            return;
        }
        this.virtualization.scrollToIndex(this.indexToScroll);
        this.indexToScroll = -1;
    };
    NavigationComponent.prototype.onPageChange = function (_a) {
        var skip = _a.skip;
        this.dates = this.service.datesList(this.service.addToDate(this.min, skip), this.getTake(skip));
        this.pageChange.emit();
    };
    NavigationComponent.prototype.scrollChange = function (_a) {
        var offset = _a.offset;
        var el = this.list.nativeElement;
        var translate = "translateY(" + offset + "px)";
        this.renderer.setStyle(el, 'transform', translate);
        this.renderer.setStyle(el, '-ms-transform', translate);
    };
    NavigationComponent.prototype.handleDateChange = function (args) {
        var item = dom_queries_1.closestInScope(args.target, function (node) { return node.hasAttribute('data-date-index'); }, this.list.nativeElement);
        if (item) {
            var index = parseInt(item.getAttribute('data-date-index'), 10);
            var candidate = this.dates[index];
            this.valueChange.emit(kendo_date_math_1.cloneDate(candidate));
        }
    };
    NavigationComponent.prototype.getTake = function (skip) {
        return Math.min(this.total - skip, this.take);
    };
    NavigationComponent.prototype.intlChange = function () {
        if (this.activeView === view_enum_1.CalendarViewEnum.month) {
            this.cdr.markForCheck();
        }
    };
    NavigationComponent.decorators = [
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-calendar-navigation',
                    template: "\n    <span class=\"k-calendar-navigation-highlight\"></span>\n    <kendo-virtualization\n        [skip]=\"skip\"\n        [take]=\"take\"\n        [total]=\"total\"\n        [itemHeight]=\"itemHeight\"\n        [topOffset]=\"topOffset\"\n        [bottomOffset]=\"bottomOffset\"\n        [maxScrollDifference]=\"maxViewHeight\"\n        (pageChange)=\"onPageChange($event)\"\n        (scrollChange)=\"scrollChange($event)\"\n    >\n        <ul #list class=\"k-reset\" [kendoEventsOutsideAngular]=\"{ click: handleDateChange }\" [scope]=\"this\">\n            <li *kFor=\"let date of dates; let index=index\" [attr.data-date-index]=\"index\">\n                <span [class.k-calendar-navigation-marker]=\"service.isRangeStart(date)\">\n                    <ng-template [ngIf]=\"!templateRef\">{{service.navigationTitle(date)}}</ng-template>\n                    <ng-template\n                        [ngIf]=\"templateRef\"\n                        [ngTemplateOutlet]=\"templateRef\"\n                        [ngTemplateOutletContext]=\"{ $implicit: service.navigationTitle(date), activeView: activeViewValue, date: date }\"\n                    ></ng-template>\n                </span>\n            </li>\n        </ul>\n    </kendo-virtualization>\n  "
                },] },
    ];
    /** @nocollapse */
    NavigationComponent.ctorParameters = function () { return [
        { type: bus_view_service_1.BusViewService },
        { type: dom_service_1.CalendarDOMService },
        { type: kendo_angular_intl_1.IntlService },
        { type: core_1.ChangeDetectorRef },
        { type: core_1.Renderer2 }
    ]; };
    NavigationComponent.propDecorators = {
        activeView: [{ type: core_1.Input }],
        min: [{ type: core_1.Input }],
        max: [{ type: core_1.Input }],
        focusedDate: [{ type: core_1.Input }],
        templateRef: [{ type: core_1.Input }],
        valueChange: [{ type: core_1.Output }],
        pageChange: [{ type: core_1.Output }],
        virtualization: [{ type: core_1.ViewChild, args: [virtualization_component_1.VirtualizationComponent,] }],
        list: [{ type: core_1.ViewChild, args: ['list', { static: true },] }],
        getComponentClass: [{ type: core_1.HostBinding, args: ["class.k-calendar-navigation",] }]
    };
    return NavigationComponent;
}());
exports.NavigationComponent = NavigationComponent;
