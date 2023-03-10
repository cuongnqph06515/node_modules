/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input, Output, EventEmitter, HostBinding, ViewChild, ElementRef, Inject, InjectionToken, QueryList, NgZone, Renderer2, ViewChildren, ChangeDetectorRef } from '@angular/core';
import { Subscription, Subject, fromEvent, merge } from 'rxjs';
import { delay, map, filter, tap } from 'rxjs/operators';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { RowHeightService } from '../scrolling/row-height.service';
import { ScrollerService, PageAction, ScrollAction, ScrollBottomAction } from '../scrolling/scroller.service';
import { ScrollRequestService } from '../scrolling/scroll-request.service';
import { ColumnBase } from '../columns/column-base';
import { isChanged, isPresent, isUniversal, anyChanged, isNumber, requestAnimationFrame, cancelAnimationFrame } from '../utils';
import { ColumnsContainer } from '../columns/columns-container';
import { ChangeNotificationService } from '../data/change-notification.service';
import { syncRowsHeight } from '../layout/row-sync';
import { NoRecordsTemplateDirective } from './no-records-template.directive';
import { SuspendService } from '../scrolling/suspend.service';
import { expandColumns, sumColumnWidths } from "../columns/column-common";
import { ScrollSyncService } from "../scrolling/scroll-sync.service";
import { ResizeService } from "../layout/resize.service";
import { ResizeSensorComponent } from "@progress/kendo-angular-common";
import { BrowserSupportService } from "../layout/browser-support.service";
import { EditService } from '../editing/edit.service';
import { NavigationService } from '../navigation/navigation.service';
import { Keys } from '@progress/kendo-angular-common';
import { ColumnResizingService } from "../column-resizing/column-resizing.service";
import { defaultTrackBy } from '../common/default-track-by';
import { hasClasses, rtlScrollPosition } from './common/dom-queries';
import { PDFService } from '../pdf/pdf.service';
import { ColumnInfoService } from '../common/column-info.service';
import { NON_DATA_CELL_CLASSES } from './constants';
var elementAt = function (index, elements, elementOffset) {
    for (var idx = 0, elementIdx = 0; idx < elements.length; idx++) {
        var offset = elementOffset(elements[idx]);
        if (elementIdx <= index && index <= elementIdx + offset - 1) {
            return elements[idx];
        }
        elementIdx += offset;
    }
};
var ɵ0 = elementAt;
var rowAt = function (index, rows) {
    return elementAt(index, rows, function (row) { return row.hasAttribute('data-kendo-treelist-item-index') ? 1 : 0; });
};
var ɵ1 = rowAt;
var cellAt = function (index, cells) {
    return elementAt(index, cells, function (cell) { return !hasClasses(cell, NON_DATA_CELL_CLASSES) ? parseInt(cell.getAttribute('colSpan'), 10) || 1 : 0; });
};
var ɵ2 = cellAt;
var EMPTY_OBJECT = {};
/**
 * @hidden
 */
export var SCROLLER_FACTORY_TOKEN = new InjectionToken('treelist-scroll-service-factory');
/**
 * @hidden
 */
export function DEFAULT_SCROLLER_FACTORY(observable) {
    return new ScrollerService(observable);
}
var wheelDeltaY = function (e) {
    var deltaY = e.wheelDeltaY;
    if (e.wheelDelta && (deltaY === undefined || deltaY)) {
        return e.wheelDelta;
    }
    else if (e.detail && e.axis === e.VERTICAL_AXIS) {
        return (-e.detail) * 10;
    }
    return 0;
};
var ɵ3 = wheelDeltaY;
var preventLockedScroll = function (el) { return function (event) {
    var delta = wheelDeltaY(event);
    var scrollTop = el.scrollTop;
    var allowScroll = (scrollTop === 0 && 0 < delta) || (el.scrollHeight <= el.offsetHeight + scrollTop && delta < 0);
    if (!allowScroll) {
        event.preventDefault();
    }
}; };
var ɵ4 = preventLockedScroll;
var translateY = function (renderer, value) { return function (el) { return renderer.setStyle(el, "transform", "translateY(" + value + "px)"); }; };
var ɵ5 = translateY;
var maybeNativeElement = function (el) { return el ? el.nativeElement : null; };
var ɵ6 = maybeNativeElement;
var hasScrollbar = function (el, parent) { return el.nativeElement.offsetWidth > parent.nativeElement.clientWidth; };
var ɵ7 = hasScrollbar;
var setHeight = function (renderer) { return function (_a) {
    var el = _a.el, height = _a.height;
    return renderer.setStyle(el, "height", height + "px");
}; };
var ɵ8 = setHeight;
var bufferSize = 1;
/**
 * @hidden
 */
var ListComponent = /** @class */ (function () {
    function ListComponent(scrollerFactory, changeNotification, suspendService, ngZone, renderer, scrollSyncService, resizeService, editService, supportService, navigationService, scrollRequestService, localization, columnResizingService, changeDetector, pdfService, columnInfo) {
        var _this = this;
        this.changeNotification = changeNotification;
        this.suspendService = suspendService;
        this.ngZone = ngZone;
        this.renderer = renderer;
        this.scrollSyncService = scrollSyncService;
        this.resizeService = resizeService;
        this.editService = editService;
        this.supportService = supportService;
        this.navigationService = navigationService;
        this.localization = localization;
        this.columnResizingService = columnResizingService;
        this.changeDetector = changeDetector;
        this.pdfService = pdfService;
        this.columnInfo = columnInfo;
        this.skip = 0;
        this.columns = new ColumnsContainer(function () { return []; });
        this.trackBy = defaultTrackBy;
        this.contentScroll = new EventEmitter();
        this.pageChange = new EventEmitter();
        this.scrollBottom = new EventEmitter();
        this.columnsStartIdx = 0;
        this.resizeSensors = new QueryList();
        this.subscriptions = new Subscription();
        this.dispatcher = new Subject();
        this.containerScrollTop = 0;
        this.scrollLeft = 0;
        this.rtl = false;
        this.scroller = scrollerFactory(this.dispatcher);
        this.subscriptions = scrollRequestService.requests.subscribe(function (x) { return _this.scrollTo(x); });
    }
    Object.defineProperty(ListComponent.prototype, "hostClass", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListComponent.prototype, "hostRole", {
        get: function () {
            return 'presentation';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListComponent.prototype, "totalWidth", {
        get: function () {
            if (this.virtualColumns && this.columns.unlockedWidth) {
                return this.columns.unlockedWidth;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListComponent.prototype, "lockedLeafColumns", {
        get: function () {
            return this.columns.lockedLeafColumns;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListComponent.prototype, "nonLockedLeafColumns", {
        get: function () {
            return this.columns.nonLockedLeafColumns;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListComponent.prototype, "nonLockedColumnsToRender", {
        get: function () {
            if (this.virtualColumns && !this.pdfService.exporting) {
                return this.viewportColumns;
            }
            return this.nonLockedLeafColumns;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListComponent.prototype, "leafColumns", {
        get: function () {
            return this.columns.leafColumnsToRender;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListComponent.prototype, "lockedWidth", {
        get: function () {
            return expandColumns(this.lockedLeafColumns.toArray()).reduce(function (prev, curr) { return prev + (curr.width || 0); }, 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListComponent.prototype, "nonLockedWidth", {
        get: function () {
            if (!this.rtl && this.lockedLeafColumns.length) {
                return sumColumnWidths(expandColumns(this.nonLockedColumnsToRender.toArray()));
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListComponent.prototype, "isLocked", {
        get: function () {
            return this.lockedLeafColumns.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    ListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.init();
        this.subscriptions.add(this.ngZone.runOutsideAngular(this.handleRowSync.bind(this)));
        this.subscriptions.add(this.ngZone.runOutsideAngular(this.handleRowNavigationLocked.bind(this)));
        this.subscriptions.add(merge(this.columns.changes, this.resizeService.changes).subscribe(function () {
            if (_this.virtualColumns) {
                _this.ngZone.run(function () {
                    _this.updateViewportColumns();
                    _this.changeDetector.markForCheck();
                });
            }
        }));
        this.subscriptions.add(this.localization.changes.subscribe(function (_a) {
            var rtl = _a.rtl;
            return _this.rtl = rtl;
        }));
    };
    ListComponent.prototype.ngOnChanges = function (changes) {
        if (isChanged("skip", changes) && !this.rebind) {
            this.skipScroll = true;
            this.container.nativeElement.scrollTop = this.rowHeightService.offset(this.skip);
        }
        if (anyChanged(["total", "take"], changes)) {
            this.init();
        }
        this.rebind = false;
    };
    ListComponent.prototype.ngDoCheck = function () {
        if (this.virtualColumns && (!this.viewportColumns || this.viewportWidthChange())) {
            this.updateViewportColumns();
        }
    };
    ListComponent.prototype.ngAfterViewInit = function () {
        if (this.skip && this.isVirtual) {
            this.container.nativeElement.scrollTop = this.rowHeightService.offset(this.skip);
        }
        this.resetNavigationViewport();
        this.attachContainerScroll();
        this.initResizeService();
    };
    ListComponent.prototype.syncRowsHeight = function () {
        if (this.lockedContainer) {
            syncRowsHeight(this.lockedTable.nativeElement, this.table.nativeElement);
        }
    };
    ListComponent.prototype.ngOnDestroy = function () {
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
        }
        if (this.resizeService) {
            this.resizeService.destroy();
        }
        this.cleanupScroller();
    };
    ListComponent.prototype.init = function () {
        if (this.suspendService.scroll) {
            return;
        }
        this.rowHeightService = new RowHeightService(this.total, this.rowHeight);
        this.totalHeight = this.rowHeightService.totalHeight();
        if (!isUniversal()) {
            this.ngZone.runOutsideAngular(this.createScroller.bind(this));
        }
    };
    ListComponent.prototype.attachContainerScroll = function () {
        var _this = this;
        if (isUniversal()) {
            return;
        }
        this.ngZone.runOutsideAngular(function () {
            _this.subscriptions.add(fromEvent(_this.container.nativeElement, 'scroll').pipe(map(function (event) { return event.target; }), filter(function () { return !_this.suspendService.scroll; }), tap(function (target) {
                _this.onContainerScroll(target);
                _this.resetNavigationViewport();
                if (_this.virtualColumns) {
                    _this.handleColumnScroll();
                }
                var rowViewport = _this.navigationService.viewport || EMPTY_OBJECT;
                var columnViewport = _this.navigationService.columnViewport || EMPTY_OBJECT;
                _this.contentScroll.emit({
                    scrollLeft: target.scrollLeft,
                    scrollTop: target.scrollTop,
                    startRow: rowViewport.firstItemIndex,
                    endRow: rowViewport.lastItemIndex,
                    startColumn: columnViewport.firstItemIndex,
                    endColumn: columnViewport.lastItemIndex
                });
            })).subscribe(_this.dispatcher));
        });
        this.scrollSyncService.registerEmitter(this.container.nativeElement, "body");
        if (this.lockedContainer) {
            this.ngZone.runOutsideAngular(function () {
                _this.subscriptions.add(merge(fromEvent(_this.lockedContainer.nativeElement, 'mousewheel'), fromEvent(_this.lockedContainer.nativeElement, 'DOMMouseScroll')).pipe(filter(function (event) { return !event.ctrlKey; }), tap(preventLockedScroll(_this.container.nativeElement)), map(wheelDeltaY))
                    .subscribe(function (x) { return _this.container.nativeElement.scrollTop -= x; }));
                _this.subscriptions.add(fromEvent(_this.lockedContainer.nativeElement, 'scroll').pipe(filter(function () { return !_this.suspendService.scroll; }))
                    .subscribe(function () {
                    var lockedScrollTop = _this.lockedContainer.nativeElement.scrollTop;
                    if (lockedScrollTop !== _this.containerScrollTop) {
                        _this.container.nativeElement.scrollTop = _this.containerScrollTop = lockedScrollTop;
                    }
                }));
                _this.subscriptions.add(fromEvent(_this.lockedContainer.nativeElement, 'keydown').pipe(filter(function (event) { return event.keyCode === Keys.PageDown || event.keyCode === Keys.PageUp; })).subscribe(function (event) {
                    var dir = event.keyCode === Keys.PageDown ? 1 : -1;
                    var element = _this.container.nativeElement;
                    element.scrollTop += element.offsetHeight * dir * 0.8;
                    event.preventDefault();
                }));
            });
            this.syncRowsHeight();
        }
    };
    ListComponent.prototype.createScroller = function () {
        var _this = this;
        this.cleanupScroller();
        var observable = this.scroller
            .create(this.rowHeightService, this.skip, this.take, this.total);
        this.skipScroll = false;
        this.scrollerSubscription = observable.pipe(filter(function (x) { return x instanceof PageAction; }), filter(function () {
            var temp = _this.skipScroll;
            _this.skipScroll = false;
            return !temp;
        }), tap(function () { return _this.rebind = true; }))
            .subscribe(function (x) { return _this.ngZone.run(function () { return _this.pageChange.emit(x); }); });
        this.scrollerSubscription.add(observable.pipe(filter(function (x) { return x instanceof ScrollAction; }))
            .subscribe(this.scroll.bind(this)));
        this.scrollerSubscription.add(observable.pipe(filter(function (x) { return x instanceof ScrollBottomAction; }))
            .subscribe(function () { return _this.scrollBottom.emit(); }));
    };
    ListComponent.prototype.scroll = function (_a) {
        var _b = _a.offset, offset = _b === void 0 ? 0 : _b;
        if (this.isVirtual) {
            [
                maybeNativeElement(this.table),
                maybeNativeElement(this.lockedTable)
            ].filter(isPresent).forEach(translateY(this.renderer, offset));
        }
        this.resetNavigationViewport();
    };
    ListComponent.prototype.onContainerScroll = function (_a) {
        var scrollTop = _a.scrollTop;
        this.containerScrollTop = scrollTop;
        if (this.lockedContainer) {
            this.lockedContainer.nativeElement.scrollTop = scrollTop;
        }
    };
    ListComponent.prototype.handleRowSync = function () {
        var _this = this;
        var isLocked = function () { return isPresent(_this.lockedContainer); };
        return merge(this.changeNotification.changes, this.editService.changed, this.resizeService.changes, this.columnResizingService.changes, this.supportService.changes).pipe(tap(function () { return _this.resetNavigationViewport(); }), filter(isLocked))
            .subscribe(function () {
            var scrollTop = _this.container.nativeElement.scrollTop;
            var scrollLeft = _this.container.nativeElement.scrollLeft;
            _this.syncRowsHeight();
            _this.syncContainerHeight();
            _this.lockedContainer.nativeElement.scrollTop = _this.container.nativeElement.scrollTop = scrollTop;
            // fixes scroll left position in IE when editing
            _this.container.nativeElement.scrollLeft = scrollLeft;
            _this.resizeSensors.forEach(function (sensor) { return sensor.acceptSize(); });
        });
    };
    ListComponent.prototype.handleRowNavigationLocked = function () {
        var _this = this;
        return this.navigationService.changes.pipe(filter(function () { return isPresent(_this.lockedContainer); }), delay(10)).subscribe(function (args) {
            if (_this.lockedLeafColumns.length <= args.prevColIndex && args.colIndex < _this.lockedLeafColumns.length) {
                var cell = _this.navigationService.activeCell;
                if (cell && cell.colIndex + cell.colSpan < args.prevColIndex) {
                    _this.container.nativeElement.scrollLeft = 0;
                }
            }
        });
    };
    ListComponent.prototype.scrollToVirtualRow = function (itemIndex) {
        var offset = this.rowHeightService.offset(itemIndex);
        this.container.nativeElement.scrollTop = offset;
        this.resetNavigationViewport();
    };
    ListComponent.prototype.scrollTo = function (_a) {
        var row = _a.row, column = _a.column;
        if (isNumber(row)) {
            if (this.isVirtual) {
                this.scrollToVirtualRow(row);
            }
            else {
                var element = rowAt(row, this.table.nativeElement.rows);
                if (element) {
                    this.container.nativeElement.scrollTop = element.offsetTop;
                }
            }
        }
        if (isNumber(column)) {
            column -= this.lockedLeafColumns.length;
            if (this.virtualColumns) {
                var columns = this.columns.leafColumnsToRender;
                var offset = 0;
                for (var idx = 0; idx < column; idx++) {
                    offset += columns[idx].width || 0;
                }
                this.container.nativeElement.scrollLeft = this.normalizeScrollLeft(offset);
            }
            else {
                var firstRow = rowAt(0, this.table.nativeElement.rows);
                if (firstRow) {
                    var element = cellAt(column, firstRow.cells);
                    if (element) {
                        this.container.nativeElement.scrollLeft = this.elementScrollLeft(element);
                    }
                }
            }
        }
    };
    ListComponent.prototype.resetNavigationViewport = function () {
        if (!this.container || !this.navigationService.enabled ||
            !this.navigationService.needsViewport() || this.view.length === 0) {
            return;
        }
        var _a = this.container.nativeElement, scrollTop = _a.scrollTop, offsetHeight = _a.offsetHeight;
        var scrollBottom = scrollTop + offsetHeight;
        var firstItemIndex = this.rowHeightService.index(scrollTop);
        var lastItemIndex = this.rowHeightService.index(scrollBottom);
        var lastItemOffset = this.rowHeightService.offset(lastItemIndex);
        var lastItemOverflows = lastItemOffset + this.rowHeight > scrollBottom;
        if (lastItemIndex > 0 && lastItemOverflows) {
            lastItemIndex--;
        }
        this.navigationService.setViewport(firstItemIndex, lastItemIndex);
    };
    ListComponent.prototype.cleanupScroller = function () {
        if (this.scrollerSubscription) {
            this.scrollerSubscription.unsubscribe();
        }
        if (this.scroller) {
            this.scroller.destroy();
        }
    };
    ListComponent.prototype.initResizeService = function () {
        this.resizeService.connect(merge.apply(void 0, this.resizeSensors.map(function (sensor) { return sensor.resize; })));
    };
    ListComponent.prototype.syncContainerHeight = function () {
        var _this = this;
        [maybeNativeElement(this.lockedContainer)]
            .filter(isPresent)
            .map(function (el) {
            el.style.height = '';
            var height = _this.container.nativeElement.offsetHeight;
            if (hasScrollbar(_this.table, _this.container)) {
                height -= _this.supportService.scrollbarWidth;
            }
            return { el: el, height: height };
        })
            .forEach(setHeight(this.renderer));
    };
    ListComponent.prototype.updateViewportColumns = function (range) {
        var columns = this.columns.nonLockedLeafColumns.toArray();
        var _a = range || this.calculateViewportColumns(), startIdx = _a.startIdx, endIdx = _a.endIdx, offset = _a.offset;
        var start = Math.max(0, startIdx - bufferSize);
        var end = Math.min(endIdx + bufferSize, columns.length - 1);
        if (start < startIdx) {
            for (var idx = startIdx - 1; idx >= start; idx--) {
                offset -= columns[idx].width;
            }
        }
        var currentColumns = columns.slice(start, end + 1);
        this.viewportColumnsWidth = currentColumns.reduce(function (total, column) { return total + column.width; }, 0);
        if (start > 0) {
            var offsetColumn = new ColumnBase();
            offsetColumn.width = offset;
            currentColumns.unshift(offsetColumn);
        }
        this.viewportColumns = new QueryList();
        this.viewportColumns.reset(currentColumns);
        this.columnsStartIdx = start;
        this.columnsEndIdx = end;
        this.columnInfo.columnRangeChange.emit({ start: start, end: end, offset: offset });
        if (!range) {
            this.updateColumnViewport(startIdx, endIdx);
        }
    };
    ListComponent.prototype.handleColumnScroll = function () {
        var _this = this;
        var container = this.container.nativeElement;
        var scrollLeft = container.scrollLeft;
        if (this.scrollLeft !== scrollLeft) {
            this.scrollLeft = scrollLeft;
            var range_1 = this.calculateViewportColumns();
            this.updateColumnViewport(range_1.startIdx, range_1.endIdx);
            if (range_1.startIdx < this.columnsStartIdx || this.columnsEndIdx < range_1.endIdx) {
                cancelAnimationFrame(this.columnUpdateFrame);
                this.columnUpdateFrame = requestAnimationFrame(function () {
                    _this.ngZone.run(function () {
                        _this.updateViewportColumns(range_1);
                        _this.changeDetector.markForCheck();
                    });
                });
            }
        }
    };
    ListComponent.prototype.updateColumnViewport = function (startIdx, endIdx) {
        var lockedCount = this.lockedLeafColumns.length;
        var leafColumns = this.nonLockedLeafColumns.toArray();
        var viewportStart = lockedCount + startIdx;
        var viewportEnd = lockedCount + endIdx;
        for (var idx = 0; idx < leafColumns.length; idx++) {
            var column = leafColumns[idx];
            if (column.isSpanColumn) {
                viewportEnd += column.childColumns.length;
            }
        }
        this.navigationService.setColumnViewport(viewportStart, viewportEnd);
    };
    ListComponent.prototype.calculateViewportColumns = function () {
        var _a = this.container.nativeElement, scrollLeft = _a.scrollLeft, clientWidth = _a.clientWidth;
        var columns = this.columns.nonLockedLeafColumns.toArray();
        var normalizedScrollLeft = this.normalizeScrollLeft(scrollLeft);
        var viewportEnd = normalizedScrollLeft + clientWidth;
        var startIdx;
        var endIdx = 0;
        var current = 0;
        var offset = 0;
        var idx;
        for (idx = 0; idx < columns.length; idx++) {
            var column = columns[idx];
            current += column.width || 0;
            if (startIdx === undefined && current > normalizedScrollLeft) {
                startIdx = idx;
                offset = current - (column.width || 0);
            }
            if (current >= viewportEnd) {
                endIdx = idx;
                break;
            }
        }
        if (!endIdx && idx > 0) {
            endIdx = columns.length - 1;
        }
        return { startIdx: startIdx, endIdx: endIdx, offset: offset };
    };
    ListComponent.prototype.viewportWidthChange = function () {
        var currentWidth = this.viewportColumns.toArray().reduce(function (total, column) { return total + column.width; }, 0);
        return currentWidth !== this.viewportColumnsWidth;
    };
    ListComponent.prototype.normalizeScrollLeft = function (position) {
        return this.rtl ? rtlScrollPosition(position, this.container.nativeElement, this.supportService.rtlScrollLeft) : position;
    };
    ListComponent.prototype.elementScrollLeft = function (element) {
        if (this.rtl) {
            return this.normalizeScrollLeft(this.container.nativeElement.scrollWidth - element.offsetLeft - element.offsetWidth);
        }
        return element.offsetLeft;
    };
    ListComponent.decorators = [
        { type: Component, args: [{
                    providers: [
                        {
                            provide: SCROLLER_FACTORY_TOKEN,
                            useValue: DEFAULT_SCROLLER_FACTORY
                        }
                    ],
                    selector: 'kendo-treelist-list',
                    template: "\n    <div #lockedContainer class=\"k-grid-content-locked\" role=\"presentation\"\n        *ngIf=\"isLocked\" [style.width.px]=\"lockedWidth\">\n        <div role=\"presentation\" class=\"k-grid-table-wrap\">\n            <table [locked]=\"true\" #lockedTable class=\"k-grid-table\" role=\"presentation\" [style.width.px]=\"lockedWidth\">\n                <colgroup kendoTreeListColGroup\n                    role=\"presentation\"\n                    [columns]=\"lockedLeafColumns\">\n                </colgroup>\n                <tbody kendoTreeListTableBody\n                    role=\"presentation\"\n                    [isLocked]=\"true\"\n                    [view]=\"view\"\n                    [noRecordsText]=\"''\"\n                    [columns]=\"lockedLeafColumns\"\n                    [totalColumnsCount]=\"leafColumns.length\"\n                    [skip]=\"skip\"\n                    [trackBy]=\"trackBy\"\n                    [filterable]=\"filterable\"\n                    [rowClass]=\"rowClass\">\n                </tbody>\n            </table>\n            <kendo-resize-sensor></kendo-resize-sensor>\n        </div>\n        <div class=\"k-height-container\" role=\"presentation\">\n            <div [style.height.px]=\"totalHeight\"></div>\n        </div>\n    </div><div #container\n               class=\"k-grid-content k-virtual-content\"\n               role=\"presentation\" tabindex=\"-1\"\n               [kendoTreeListResizableContainer]=\"lockedLeafColumns.length\"\n               [lockedWidth]=\"lockedWidth + 1\">\n        <div role=\"presentation\" class=\"k-grid-table-wrap\">\n            <table [style.width.px]=\"nonLockedWidth\" #table\n              class=\"k-grid-table\" role=\"presentation\">\n                <colgroup kendoTreeListColGroup\n                    role=\"presentation\"\n                    [columns]=\"nonLockedColumnsToRender\">\n                </colgroup>\n                <tbody kendoTreeListTableBody\n                    role=\"presentation\"\n                    [view]=\"view\"\n                    [columns]=\"nonLockedColumnsToRender\"\n                    [allColumns]=\"nonLockedLeafColumns\"\n                    [noRecordsTemplate]=\"noRecordsTemplate\"\n                    [lockedColumnsCount]=\"lockedLeafColumns.length\"\n                    [totalColumnsCount]=\"leafColumns.length\"\n                    [skip]=\"skip\"\n                    [trackBy]=\"trackBy\"\n                    [filterable]=\"filterable\"\n                    [rowClass]=\"rowClass\"\n                    [virtualColumns]=\"virtualColumns\">\n                </tbody>\n            </table>\n            <kendo-resize-sensor *ngIf=\"isLocked\"></kendo-resize-sensor>\n        </div>\n        <kendo-resize-sensor *ngIf=\"isLocked || virtualColumns\"></kendo-resize-sensor>\n        <div class=\"k-height-container\" role=\"presentation\">\n            <div [style.height.px]=\"totalHeight\"></div>\n        </div>\n        <div *ngIf=\"virtualColumns\" class=\"k-width-container\" role=\"presentation\">\n            <div [style.width.px]=\"totalWidth\"></div>\n        </div>\n    </div>\n    <div *ngIf=\"loading\" kendoTreeListLoading>\n    </div>\n    "
                },] },
    ];
    /** @nocollapse */
    ListComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [SCROLLER_FACTORY_TOKEN,] }] },
        { type: ChangeNotificationService },
        { type: SuspendService },
        { type: NgZone },
        { type: Renderer2 },
        { type: ScrollSyncService },
        { type: ResizeService },
        { type: EditService },
        { type: BrowserSupportService },
        { type: NavigationService },
        { type: ScrollRequestService },
        { type: LocalizationService },
        { type: ColumnResizingService },
        { type: ChangeDetectorRef },
        { type: PDFService },
        { type: ColumnInfoService }
    ]; };
    ListComponent.propDecorators = {
        hostClass: [{ type: HostBinding, args: ["class.k-grid-container",] }],
        hostRole: [{ type: HostBinding, args: ["attr.role",] }],
        view: [{ type: Input }],
        total: [{ type: Input }],
        rowHeight: [{ type: Input }],
        take: [{ type: Input }],
        skip: [{ type: Input }],
        columns: [{ type: Input }],
        noRecordsTemplate: [{ type: Input }],
        filterable: [{ type: Input }],
        rowClass: [{ type: Input }],
        loading: [{ type: Input }],
        trackBy: [{ type: Input }],
        virtualColumns: [{ type: Input }],
        isVirtual: [{ type: Input }],
        contentScroll: [{ type: Output }],
        pageChange: [{ type: Output }],
        scrollBottom: [{ type: Output }],
        container: [{ type: ViewChild, args: ["container",] }],
        lockedContainer: [{ type: ViewChild, args: ["lockedContainer",] }],
        lockedTable: [{ type: ViewChild, args: ["lockedTable",] }],
        table: [{ type: ViewChild, args: ["table",] }],
        resizeSensors: [{ type: ViewChildren, args: [ResizeSensorComponent,] }]
    };
    return ListComponent;
}());
export { ListComponent };
export { ɵ0, ɵ1, ɵ2, ɵ3, ɵ4, ɵ5, ɵ6, ɵ7, ɵ8 };
