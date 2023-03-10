/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input, Output, EventEmitter, ViewChildren, QueryList, ElementRef, ViewChild, ChangeDetectorRef, NgZone, Renderer2 } from '@angular/core';
import { isChanged } from '@progress/kendo-angular-common';
import { ListItemDirective } from './list-item.directive';
import { ItemTemplateDirective } from './templates/item-template.directive';
import { GroupTemplateDirective } from './templates/group-template.directive';
import { FixedGroupTemplateDirective } from './templates/fixed-group-template.directive';
import { isPresent, getter } from './util';
import { SelectionService } from './selection/selection.service';
import { fromEvent, merge } from 'rxjs';
import { map, tap, auditTime, switchMap, take } from 'rxjs/operators';
import { DisabledItemsService } from './disabled-items/disabled-items.service';
import { DataService } from './data.service';
/**
 * @hidden
 */
var ListComponent = /** @class */ (function () {
    /* tslint:disable:member-ordering */
    function ListComponent(dataService, wrapper, selectionService, disabledItemsService, cdr, zone, renderer) {
        var _this = this;
        this.dataService = dataService;
        this.wrapper = wrapper;
        this.selectionService = selectionService;
        this.disabledItemsService = disabledItemsService;
        this.cdr = cdr;
        this.zone = zone;
        this.renderer = renderer;
        this.selected = [];
        this.focused = -1;
        this.show = true;
        this.multipleSelection = false;
        this.onClick = new EventEmitter();
        this.pageChange = new EventEmitter();
        this.startFrom = 0;
        this.lastLoaded = 0;
        this.lastScrollTop = 0;
        this.scrollToFocused = false;
        this.selectSubscription = merge(this.selectionService.onSelect.pipe(map(function (args) { return args.indices[0]; })), this.selectionService.onFocus)
            .pipe(
        // handle only the very last onSelect/onFocus emission
        switchMap(function (event) { return _this.zone.onStable.pipe(take(1), map(function () { return event; })); }))
            .subscribe(this.scrollToItem.bind(this));
    }
    Object.defineProperty(ListComponent.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (data) {
            this._data = data[0] && data[0].header ? data.slice(0) : data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListComponent.prototype, "items", {
        get: function () {
            return this._items;
        },
        set: function (items) {
            this._items = items;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListComponent.prototype, "pageSize", {
        get: function () {
            if (this.virtual.pageSize) {
                return this.virtual.pageSize;
            }
            var size = Math.round(this.height / this.virtual.itemHeight);
            return size;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListComponent.prototype, "scrollHeight", {
        get: function () {
            return (this.dataService.grouped ? this.virtual.total - 1 : this.virtual.total) * this.virtual.itemHeight;
        },
        enumerable: true,
        configurable: true
    });
    ListComponent.prototype.ngOnChanges = function (changes) {
        if (isChanged('data', changes, false)) {
            if (this.lastLoaded <= 0) {
                this.lastLoaded = this.data.length - 1;
                this.scrollToFocused = !changes.data.isFirstChange();
            }
        }
    };
    ListComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            _this.scrollSubscription = fromEvent(_this.content.nativeElement, "scroll").pipe(auditTime(100), tap(_this.prefetchData.bind(_this)), tap(_this.findCurrentGroup.bind(_this))).subscribe(function () {
                _this.lastScrollTop = _this.content.nativeElement.scrollTop;
            });
        });
    };
    ListComponent.prototype.ngAfterViewChecked = function () {
        if (this.virtual) {
            this.positionItems();
        }
        if (this.items && this.scrollToFocused) {
            this.scrollToFocused = false;
            var scrollTarget = this.items.length && this.selectionService.focused === -1 ? 0 : this.selectionService.focused;
            this.scrollToItem(scrollTarget);
        }
        if (this.dataService.grouped) {
            this.findCurrentGroup();
        }
    };
    ListComponent.prototype.ngOnDestroy = function () {
        this.selectSubscription.unsubscribe();
        if (this.scrollSubscription) {
            this.scrollSubscription.unsubscribe();
        }
    };
    ListComponent.prototype.firstVisibleItem = function () {
        var _this = this;
        var content = this.content.nativeElement;
        var rect = content.getBoundingClientRect();
        // IE9 hack
        var disabled = Array.prototype.slice.call(content.querySelectorAll(".k-state-disabled"));
        // This is a workaround for finding elements with pointer-events: none;
        disabled.forEach(function (el) { return _this.renderer.setStyle(el, "pointer-events", "auto"); });
        var item = document.elementFromPoint(rect.left + 1, rect.top + 1);
        disabled.forEach(function (el) { return _this.renderer.setStyle(el, "pointer-events", "none"); });
        return item;
    };
    ListComponent.prototype.findCurrentGroup = function () {
        if (!this.dataService.grouped) {
            this.currentGroup = undefined;
            return;
        }
        var item = this.firstVisibleItem();
        if (item) {
            var index = void 0;
            if (item.getAttribute("role") === "group") {
                index = parseInt(item.getAttribute("group-index"), 10);
                this.currentGroup = this.dataService.groupAt(index).value;
            }
            else {
                index = parseInt(item.getAttribute("index"), 10);
                this.currentGroup = this.dataService.itemGroup(this.dataService.itemAt(index));
            }
        }
        else {
            this.currentGroup = undefined;
        }
        this.cdr.detectChanges();
    };
    ListComponent.prototype.prefetchData = function () {
        if (!this.virtual) {
            return;
        }
        var visibleItems = Math.trunc(this.content.nativeElement.clientHeight / this.virtual.itemHeight);
        var offsetY = this.content.nativeElement.scrollTop;
        var start = Math.trunc(offsetY / this.virtual.itemHeight);
        var down = offsetY > this.lastScrollTop;
        var nextPage = (start + visibleItems >= this.lastLoaded) && this.lastLoaded < this.virtual.total - 1;
        var leftOver = this.pageSize - (this.lastLoaded - this.startFrom);
        var prevPage = this.lastLoaded - this.pageSize + visibleItems >= start - leftOver;
        if (down && nextPage) {
            this.changePage(start);
        }
        if (!down && prevPage) {
            this.changePage(start - this.pageSize + visibleItems + 1);
        }
    };
    ListComponent.prototype.changePage = function (start) {
        var _this = this;
        this.zone.run(function () {
            var end = _this.pageSize + start;
            if (end > _this.virtual.total) {
                start--;
                end = _this.virtual.total;
            }
            if (start < 0) {
                start = 0;
            }
            _this.startFrom = start;
            _this.lastLoaded = end;
            _this.pageChange.emit({ skip: start, take: _this.pageSize });
        });
    };
    ListComponent.prototype.index = function (groupIndex, itemIndex) {
        return groupIndex > 0 ? (this.dataService.groupIndices[groupIndex - 1] + itemIndex) : itemIndex;
    };
    ListComponent.prototype.getText = function (dataItem) {
        return getter(dataItem, this.textField);
    };
    ListComponent.prototype.getValue = function (dataItem) {
        return getter(dataItem, this.valueField);
    };
    ListComponent.prototype.isDisabled = function (index) {
        if (isPresent(this.virtual)) {
            index += this.virtual.skip;
        }
        return this.disabledItemsService.isIndexDisabled(index);
    };
    ListComponent.prototype.scrollToItem = function (index) {
        var flatIndex = index;
        if (this.dataService.grouped) {
            // takes into account the group header items
            flatIndex = this.dataService.flatIndex(index);
            /* The first group header item is not rendered in the list (see template), so subtract 1 when calulating the flat index.
               With virtualization enabled, the first group header could be in a previous page, in which case don't subtract anything. */
            var groupHeaderOffset = this.firstGroupHeaderInTargetedPage(flatIndex) ? -1 : 0;
            flatIndex += groupHeaderOffset;
        }
        if (this.virtual && flatIndex > -1) {
            this.scrollToIndex(flatIndex);
            return;
        }
        var items = this.items.toArray();
        if (isPresent(items[flatIndex]) && flatIndex !== -1) {
            this.scroll(items[flatIndex].element);
        }
    };
    ListComponent.prototype.scrollToIndex = function (index) {
        var content = this.content.nativeElement;
        var contentScrollTop = content.scrollTop;
        var itemOffsetTop = index * this.virtual.itemHeight;
        var itemOffsetHeight = this.virtual.itemHeight;
        var contentOffsetHeight = content.clientHeight;
        var bottomDistance = itemOffsetTop + itemOffsetHeight;
        if (contentScrollTop > itemOffsetTop) {
            contentScrollTop = itemOffsetTop;
        }
        else if (bottomDistance > (contentScrollTop + contentOffsetHeight)) {
            contentScrollTop = (bottomDistance - contentOffsetHeight);
        }
        content.scrollTop = contentScrollTop;
    };
    ListComponent.prototype.scroll = function (item) {
        if (!item) {
            return;
        }
        var nativeElement = item.nativeElement;
        var content = this.content.nativeElement, itemOffsetTop = nativeElement.offsetTop, itemOffsetHeight = nativeElement.offsetHeight, contentScrollTop = content.scrollTop, contentOffsetHeight = content.clientHeight, bottomDistance = itemOffsetTop + itemOffsetHeight;
        if (contentScrollTop > itemOffsetTop) {
            contentScrollTop = itemOffsetTop;
        }
        else if (bottomDistance > (contentScrollTop + contentOffsetHeight)) {
            contentScrollTop = (bottomDistance - contentOffsetHeight);
        }
        content.scrollTop = contentScrollTop;
    };
    ListComponent.prototype.positionItems = function () {
        var _this = this;
        this.items.forEach(function (item, index) {
            var offsetY = (index + _this.startFrom) * _this.virtual.itemHeight;
            _this.renderer.setStyle(item.element.nativeElement, "transform", "translateY(" + offsetY + "px");
        });
    };
    /**
     * Indicates whether the first group header from the data set is in the targeted virtual page.
     */
    ListComponent.prototype.firstGroupHeaderInTargetedPage = function (itemIndex) {
        if (!isPresent(this.virtual)) {
            return true;
        }
        return this.virtual.skip === 0 && (this.virtual.pageSize > itemIndex);
    };
    ListComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-list',
                    template: "\n    <div *ngIf=\"dataService.grouped\"\n        class='k-outer-group-header k-first'\n        [ngClass]=\"{'k-virtual-item': virtual}\"\n        [ngStyle]=\"{\n            'height.px': virtual?.itemHeight,\n            'minHeight.px' : virtual?.itemHeight,\n            'boxSizing' : virtual ? 'border-box' : 'inherit'}\"\n        >\n        <ng-template *ngIf=\"fixedGroupTemplate\"\n            [templateContext]=\"{\n                templateRef: fixedGroupTemplate.templateRef,\n                $implicit: currentGroup\n            }\">\n        </ng-template>\n        <ng-template [ngIf]=\"!fixedGroupTemplate\"><strong>{{ currentGroup }}</strong> </ng-template>\n    </div>\n    <div #content\n         [ngClass]=\"{ 'k-virtual-content': virtual, 'k-list-scroller': !virtual }\"\n         [style.maxHeight.px]=\"height\"\n         unselectable=\"on\">\n    <ul #list\n        role=\"listbox\"\n        class=\"k-list k-reset\"\n        [ngClass]=\"{ 'k-virtual-list': virtual }\"\n        [attr.id]=\"id\"\n        [attr.aria-hidden]=\"!show\">\n         <ng-template *ngIf=\"!dataService.grouped && show\" ngFor let-dataItem let-itemIndex=\"index\" [ngForOf]=\"data\">\n            <li\n                role=\"option\"\n                kendoDropDownsSelectable\n                [height]=\"virtual?.itemHeight\"\n                [index]=\"itemIndex + startFrom\"\n                [multipleSelection]=\"multipleSelection\"\n                [attr.id]=\"optionPrefix + '-' + getValue(dataItem)\"\n                [attr.tabIndex]=\"-1\"\n                class=\"k-item\"\n                [ngClass]=\"{ 'k-virtual-item': virtual, 'k-state-disabled': isDisabled(itemIndex) }\">\n                <ng-template *ngIf=\"template\"\n                    [templateContext]=\"{\n                        templateRef: template.templateRef,\n                        $implicit: dataItem\n                    }\">\n                </ng-template>\n                <ng-template [ngIf]=\"!template\">{{ getText(dataItem) }}</ng-template>\n            </li>\n         </ng-template>\n         <ng-template *ngIf=\"dataService.grouped\" ngFor let-dataItem let-itemIndex=\"index\" [ngForOf]=\"data\">\n            <li\n                *ngIf=\"dataItem.header && dataItem.index > 0\"\n                role=\"group\"\n                class='k-outer-group-header'\n                [ngClass]=\"{ 'k-virtual-item': virtual }\"\n                [ngStyle]=\"{\n                    'height.px': virtual?.itemHeight,\n                    'minHeight.px' : virtual?.itemHeight,\n                    'boxSizing' : virtual ? 'border-box' : 'inherit'}\"\n                [attr.group-index]=\"dataItem.index\"\n                [attr.id]=\"optionPrefix + '-' + getValue(dataItem.value)\"\n                [attr.tabIndex]=\"-1\">\n                    <ng-template *ngIf=\"groupTemplate\"\n                          [templateContext]=\"{\n                            templateRef: groupTemplate.templateRef,\n                            $implicit: dataItem.value\n                    }\">\n                    </ng-template>\n                    <ng-template [ngIf]=\"!groupTemplate\"><strong> {{ dataItem.value }}</strong> </ng-template>\n              </li>\n            <li\n                *ngIf=\"!dataItem.header\"\n                role=\"option\"\n                kendoDropDownsSelectable\n                [height]=\"virtual?.itemHeight\"\n                [index]=\"dataItem.offsetIndex\"\n                [multipleSelection]=\"multipleSelection\"\n                [attr.absolute-index]=\"dataItem.index\"\n                [attr.id]=\"optionPrefix + '-' + getValue(dataItem.value)\"\n                [attr.tabIndex]=\"-1\"\n                class=\"k-item\"\n                [ngClass]=\"{ 'k-virtual-item': virtual, 'k-state-disabled': isDisabled(dataItem.offsetIndex) }\">\n                <ng-template *ngIf=\"template\"\n                    [templateContext]=\"{\n                        templateRef: template.templateRef,\n                        $implicit: dataItem.value\n                    }\">\n                </ng-template>\n                <ng-template [ngIf]=\"!template\">{{ getText(dataItem.value) }}</ng-template>\n            </li>\n        </ng-template>\n    </ul>\n    <div *ngIf=\"virtual\" class=\"k-height-container\" role=\"presentation\">\n        <div [style.height.px]=\"scrollHeight\"></div>\n    </div>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    ListComponent.ctorParameters = function () { return [
        { type: DataService },
        { type: ElementRef },
        { type: SelectionService },
        { type: DisabledItemsService },
        { type: ChangeDetectorRef },
        { type: NgZone },
        { type: Renderer2 }
    ]; };
    ListComponent.propDecorators = {
        selected: [{ type: Input }],
        focused: [{ type: Input }],
        textField: [{ type: Input }],
        valueField: [{ type: Input }],
        height: [{ type: Input }],
        template: [{ type: Input }],
        groupTemplate: [{ type: Input }],
        fixedGroupTemplate: [{ type: Input }],
        show: [{ type: Input }],
        id: [{ type: Input }],
        optionPrefix: [{ type: Input }],
        multipleSelection: [{ type: Input }],
        virtual: [{ type: Input }],
        data: [{ type: Input }],
        onClick: [{ type: Output }],
        pageChange: [{ type: Output }],
        items: [{ type: ViewChildren, args: [ListItemDirective,] }],
        content: [{ type: ViewChild, args: ['content',] }],
        list: [{ type: ViewChild, args: ['list',] }]
    };
    return ListComponent;
}());
export { ListComponent };
