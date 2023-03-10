/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, ChangeDetectorRef, HostBinding, Input, QueryList, ViewChildren, TemplateRef } from '@angular/core';
import { Subscription, of, merge } from "rxjs";
import { filter, map, switchMap, tap, takeUntil } from 'rxjs/operators';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { isColumnComponent } from '../../columns/column.component';
import { isColumnGroupComponent } from '../../columns/column-group.component';
import { isCheckboxColumn } from '../../columns/column-base';
import { DetailTemplateDirective } from '../details/detail-template.directive';
import { normalize } from '../../columns/sort-settings';
import { and, isNullOrEmptyString, isPresent, isTruthy, not, observe } from '../../utils';
import { columnsToRender, sortColumns, isInSpanColumn } from "../../columns/column-common";
import { SinglePopupService } from '../../common/single-popup.service';
import { hasFilterMenu, hasFilterRow } from '../../filtering/filterable';
import { IdService } from '../../common/id.service';
import { Keys } from '@progress/kendo-angular-common';
import { DropTargetDirective } from '../../dragdrop/drop-target.directive';
import { DragHintService } from '../../dragdrop/drag-hint.service';
import { DropCueService } from '../../dragdrop/drop-cue.service';
import { ColumnReorderService } from '../../dragdrop/column-reorder.service';
import { position, isTargetBefore, offset } from '../../dragdrop/common';
import { SortService } from '../../common/sort.service';
import { hasItems } from '../../column-menu/utils';
import { closestInScope, isFocusable } from '../common/dom-queries';
var mergeObjects = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return Object.assign.apply(null, [{}].concat(args));
};
var ɵ0 = mergeObjects;
var directions = function (initialDirection) { return initialDirection === "asc" ? ["asc", "desc"] : ["desc", "asc"]; };
var ɵ1 = directions;
/**
 * @hidden
 */
var isRootLevel = function (_a) {
    var parent = _a.parent;
    return !isTruthy(parent);
};
var ɵ2 = isRootLevel;
var ofColumnType = function (_a) {
    var draggable = _a.draggable;
    return ['column', 'columnGroup']
        .indexOf(draggable.context.type) >= 0;
};
var ɵ3 = ofColumnType;
var notSameElement = function (_a) {
    var draggable = _a.draggable, target = _a.target;
    return draggable.element.nativeElement !== target.element.nativeElement;
};
var ɵ4 = notSameElement;
var inSameParent = function (x, y) { return x.parent === y.parent ||
    (isInSpanColumn(y) && inSameParent(x, y.parent)); };
var ɵ5 = inSameParent;
var sameParent = function (_a) {
    var draggable = _a.draggable, target = _a.target;
    return inSameParent(draggable.context.column, target.context.column);
};
var ɵ6 = sameParent;
var lastNonLocked = function (_a) {
    var draggable = _a.draggable;
    return !isTruthy(draggable.context.column.locked) &&
        isRootLevel(draggable.context.column) &&
        draggable.context.lastColumn;
};
var ɵ7 = lastNonLocked;
var notInSpanColumn = function (_a) {
    var draggable = _a.draggable;
    return !isInSpanColumn(draggable.context.column);
};
var ɵ8 = notInSpanColumn;
var reorderable = function (_a) {
    var draggable = _a.draggable;
    return draggable.context.column.reorderable;
};
var ɵ9 = reorderable;
var lockable = function (_a) {
    var draggable = _a.draggable, target = _a.target;
    return draggable.context.column.lockable !== false ||
        draggable.context.column.isLocked === target.context.column.isLocked;
};
var ɵ10 = lockable;
var rules = and(ofColumnType, reorderable, notInSpanColumn, notSameElement, sameParent, not(lastNonLocked), lockable);
/**
 * @hidden
 */
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(popupService, hint, cue, reorderService, idService, sortService, localization, cd) {
        this.popupService = popupService;
        this.hint = hint;
        this.cue = cue;
        this.reorderService = reorderService;
        this.idService = idService;
        this.sortService = sortService;
        this.localization = localization;
        this.cd = cd;
        this.columns = [];
        this.groups = [];
        this.sort = new Array();
        this.sortable = false;
        this.groupable = false;
        this.lockedColumnsCount = 0;
        this.resizable = false;
        this.reorderable = false;
        this.columnMenu = false;
        this.totalColumnsCount = 0;
        this.sortedFields = {};
        this.dropTargets = new QueryList();
        this.subscription = new Subscription();
    }
    Object.defineProperty(HeaderComponent.prototype, "headerClass", {
        get: function () {
            return !this.scrollable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HeaderComponent.prototype, "sortableLabel", {
        get: function () {
            return this.localization.get('sortable');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HeaderComponent.prototype, "unlockedColumnsCount", {
        // Number of unlocked columns in the next table, if any
        get: function () {
            return this.totalColumnsCount - this.lockedColumnsCount - this.columns.length;
        },
        enumerable: true,
        configurable: true
    });
    HeaderComponent.prototype.sortColumn = function (column) {
        this.sortService.sort(this.toggleSort(column));
    };
    HeaderComponent.prototype.onSortClick = function (column, event, link) {
        var target = event.target;
        if (column.headerTemplateRef && target !== link) {
            var hasFocusableParent = Boolean(closestInScope(target, isFocusable, link));
            if (hasFocusableParent) {
                // Do not sort when clicking focusable template elements.
                return;
            }
        }
        this.sortColumn(column);
    };
    HeaderComponent.prototype.onHeaderKeydown = function (column, args) {
        if (!this.sortable || args.defaultPrevented || column.sortable === false) {
            return;
        }
        if (args.keyCode === Keys.Enter && isPresent(column.field)) {
            this.sortService.sort(this.toggleSort(column));
        }
    };
    HeaderComponent.prototype.showSortNumbering = function (column) {
        var showIndexes = normalize(this.sortable).showIndexes;
        return showIndexes
            && this.sort
            && this.sort.filter(function (_a) {
                var dir = _a.dir;
                return isPresent(dir);
            }).length > 1
            && this.sortOrder(column.field) > 0;
    };
    HeaderComponent.prototype.sortOrder = function (field) {
        return this.sort
            .filter(function (_a) {
            var dir = _a.dir;
            return isPresent(dir);
        })
            .findIndex(function (x) { return x.field === field; })
            + 1;
    };
    HeaderComponent.prototype.sortIcon = function (field) {
        var state = this.sortDescriptor(field);
        return {
            'k-icon': isPresent(state.dir),
            'k-i-sort-desc-sm': state.dir === "desc",
            'k-i-sort-asc-sm': state.dir === "asc"
        };
    };
    HeaderComponent.prototype.sortState = function (column) {
        if (!this.isSortable(column)) {
            return;
        }
        var state = this.sortDescriptor(column.field);
        if (state.dir === 'asc') {
            return 'ascending';
        }
        if (state.dir === 'desc') {
            return 'descending';
        }
    };
    HeaderComponent.prototype.sortStatus = function (column) {
        if (!this.sortedFields[column.field] || !this.isSortable(column)) {
            return;
        }
        var msg = 'sortedDefault';
        var state = this.sortDescriptor(column.field);
        if (state.dir === 'asc') {
            msg = 'sortedAscending';
        }
        else if (state.dir === 'desc') {
            msg = 'sortedDescending';
        }
        return this.localization.get(msg);
    };
    HeaderComponent.prototype.toggleSort = function (column) {
        var _a = normalize(this.sortable, column.sortable), allowUnsort = _a.allowUnsort, mode = _a.mode, initialDirection = _a.initialDirection;
        var descriptor = this.toggleDirection(column.field, allowUnsort, initialDirection);
        if (mode === 'single') {
            return [descriptor];
        }
        return this.sort.filter(function (desc) { return desc.field !== column.field; }).concat([descriptor]);
    };
    HeaderComponent.prototype.ngAfterViewInit = function () {
        this.subscription.add(observe(this.dropTargets)
            .subscribe(this.attachTargets.bind(this)));
    };
    HeaderComponent.prototype.ngDoCheck = function () {
        this._leafColumns = columnsToRender(this.columns || []).filter(function (x) { return !isColumnGroupComponent(x); });
    };
    HeaderComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        var sortChange = changes.sort;
        if (sortChange && !sortChange.isFirstChange()) {
            sortChange.currentValue.forEach(function (change) {
                _this.sortedFields[change.field] = true;
            });
        }
    };
    HeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription.add(this.localization.changes
            .subscribe(function () { return _this.cd.markForCheck(); }));
    };
    HeaderComponent.prototype.ngOnDestroy = function () {
        if (this.targetSubscription) {
            this.targetSubscription.unsubscribe();
        }
        if (this.popupService) {
            this.popupService.destroy();
        }
        this.subscription.unsubscribe();
    };
    HeaderComponent.prototype.selectAllCheckboxId = function () {
        return this.idService.selectAllCheckboxId();
    };
    HeaderComponent.prototype.isFirstOnRow = function (column, index) {
        var _this = this;
        var isTailing = function (c) { return c &&
            (_this.columnsForLevel(c.level).indexOf(c) > 0 || isTailing(c.parent)); };
        return index === 0 && !this.groups.length && !this.detailTemplate && isTailing(column.parent);
    };
    HeaderComponent.prototype.logicalColumnIndex = function (column) {
        var index = column.leafIndex;
        if (isPresent(index)) {
            return index + (isPresent(this.detailTemplate) ? 1 : 0);
        }
        return -1;
    };
    Object.defineProperty(HeaderComponent.prototype, "showFilterMenu", {
        get: function () {
            return !this.columnMenu && hasFilterMenu(this.filterable);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HeaderComponent.prototype, "showFilterRow", {
        get: function () {
            return hasFilterRow(this.filterable);
        },
        enumerable: true,
        configurable: true
    });
    HeaderComponent.prototype.showColumnMenu = function (column) {
        return this.columnMenu && column.columnMenu &&
            (this.columnMenuTemplate || column.columnMenuTemplates.length || hasItems(this.columnMenu, column));
    };
    HeaderComponent.prototype.isFilterable = function (column) {
        return !isNullOrEmptyString(column.field) && column.filterable === true;
    };
    HeaderComponent.prototype.canDrop = function (draggable, target) {
        return this.reorderable && rules({ draggable: draggable, target: target });
    };
    HeaderComponent.prototype.shouldActivate = function (column) {
        var canReorder = this.reorderable && column.reorderable;
        if (!canReorder && !isColumnComponent(column)) {
            return false;
        }
        var groupable = this.groupable && isColumnComponent(column) && column.groupable !== false;
        return groupable || canReorder;
    };
    HeaderComponent.prototype.isSortable = function (column) {
        return !isNullOrEmptyString(column.field)
            && isTruthy(this.sortable) && isTruthy(column.sortable);
    };
    HeaderComponent.prototype.isCheckboxColumn = function (column) {
        return isCheckboxColumn(column) && !column.templateRef;
    };
    HeaderComponent.prototype.trackByIndex = function (index, _item) {
        return index;
    };
    HeaderComponent.prototype.toggleDirection = function (field, allowUnsort, initialDirection) {
        var descriptor = this.sortDescriptor(field);
        var _a = directions(initialDirection), first = _a[0], second = _a[1];
        var dir = first;
        if (descriptor.dir === first) {
            dir = second;
        }
        else if (descriptor.dir === second && allowUnsort) {
            dir = undefined;
        }
        return { dir: dir, field: field };
    };
    HeaderComponent.prototype.columnsForLevel = function (level) {
        var columns = this.columns ? this.columns.filter(function (column) { return column.level === level; }) : [];
        return sortColumns(columnsToRender(columns));
    };
    HeaderComponent.prototype.isColumnGroupComponent = function (column) {
        return isColumnGroupComponent(column);
    };
    Object.defineProperty(HeaderComponent.prototype, "columnLevels", {
        get: function () {
            return new Array((this.totalColumnLevels || 0) + 1);
        },
        enumerable: true,
        configurable: true
    });
    HeaderComponent.prototype.sortDescriptor = function (field) {
        return this.sort.find(function (item) { return item.field === field; }) || { field: field };
    };
    Object.defineProperty(HeaderComponent.prototype, "leafColumns", {
        get: function () {
            return this._leafColumns;
        },
        enumerable: true,
        configurable: true
    });
    HeaderComponent.prototype.attachTargets = function () {
        var _this = this;
        if (this.targetSubscription) {
            this.targetSubscription.unsubscribe();
        }
        this.targetSubscription = new Subscription();
        var enterStream = merge.apply(void 0, this.dropTargets.map(function (target) { return target.enter; }));
        var leaveStream = merge.apply(void 0, this.dropTargets.map(function (target) { return target.leave; }));
        var dropStream = merge.apply(void 0, this.dropTargets.map(function (target) { return target.drop; }));
        this.targetSubscription.add(enterStream.pipe(tap(function (_a) {
            var target = _a.target, draggable = _a.draggable;
            if (draggable.context.type === 'groupIndicator') {
                return;
            }
            var targetLocked = isTruthy(target.context.column.isLocked);
            var draggableLocked = isTruthy(draggable.context.column.isLocked);
            if (_this.lockedColumnsCount > 0 || targetLocked || draggableLocked) {
                _this.hint.toggleLock(targetLocked);
            }
        }), filter(function (_a) {
            var draggable = _a.draggable, target = _a.target;
            return _this.canDrop(draggable, target);
        }), switchMap(this.trackMove.bind(this, leaveStream, dropStream)), map(function (e) { return mergeObjects(e, { before: _this.calculateBefore(e), changeContainer: e.changeContainer }); }), map(this.normalizeTarget.bind(this)), tap(this.enter.bind(this)), switchMap(function (args) {
            return dropStream.pipe(map(function () { return args; }), takeUntil(leaveStream.pipe(tap(_this.leave.bind(_this)))));
        }))
            .subscribe(this.drop.bind(this)));
    };
    HeaderComponent.prototype.normalizeTarget = function (e) {
        var target = e.target;
        var parent = target.context.column.parent;
        if (parent && parent.isSpanColumn) {
            var arr = this.dropTargets.toArray();
            var firstSpan = arr.find(function (t) { return t.context.column.parent === parent; });
            var index = arr.indexOf(firstSpan);
            var adjust = e.before ? 0 : parent.childColumns.length - 1;
            target = arr[index + adjust];
        }
        return mergeObjects(e, { target: target });
    };
    HeaderComponent.prototype.trackMove = function (leaveStream, dropStream, e) {
        var column = e.target.context.column;
        var levelColumns = this.columnsForLevel(column.level);
        var index = levelColumns.indexOf(column);
        var isFirst = (column.locked ? index === levelColumns.length - 1 : index === 0);
        var changed = e.draggable.context.column.isLocked !== column.isLocked;
        if (changed && isFirst) {
            return e.draggable.drag
                .pipe(takeUntil(leaveStream), takeUntil(dropStream), map(function (_a) {
                var mouseEvent = _a.mouseEvent;
                return mergeObjects({ changeContainer: true }, e, { mouseEvent: mouseEvent });
            }));
        }
        return of(mergeObjects({ changeContainer: changed }, e));
    };
    HeaderComponent.prototype.calculateBefore = function (_a) {
        var draggable = _a.draggable, target = _a.target, mouseEvent = _a.mouseEvent, _b = _a.changeContainer, changeContainer = _b === void 0 ? false : _b;
        var targetElement = target.element.nativeElement;
        var before = false;
        if (changeContainer) {
            var left = offset(targetElement).left;
            var halfWidth = targetElement.offsetWidth / 2;
            var middle = left + halfWidth;
            before = middle > mouseEvent.pageX;
            if (this.localization.rtl) {
                before = !before;
            }
        }
        else {
            before = isTargetBefore(draggable.element.nativeElement, targetElement);
        }
        return before;
    };
    HeaderComponent.prototype.enter = function (_a) {
        var target = _a.target, before = _a.before;
        this.hint.enable();
        if (this.localization.rtl) {
            before = !before;
        }
        this.cue.position(position(target.element.nativeElement, before));
    };
    HeaderComponent.prototype.leave = function () {
        this.hint.disable();
        this.cue.hide();
    };
    HeaderComponent.prototype.drop = function (_a) {
        var draggable = _a.draggable, target = _a.target, before = _a.before, changeContainer = _a.changeContainer;
        this.reorderService.reorder({
            before: before,
            changeContainer: changeContainer,
            source: draggable.context.column,
            target: target.context.column
        });
    };
    HeaderComponent.decorators = [
        { type: Component, args: [{
                    selector: '[kendoGridHeader]',
                    styles: ["\n        .k-column-resizer {\n            cursor: col-resize;\n            display: block;\n            height: 1000%;\n            position: absolute;\n            top: 0;\n            width: .5em;\n        }\n    "],
                    template: "\n    <ng-template [ngIf]=\"true\">\n        <tr *ngFor=\"let i of columnLevels; let levelIndex = index\"\n            kendoGridLogicalRow\n                [logicalRowIndex]=\"levelIndex\"\n                [logicalSlaveRow]=\"lockedColumnsCount > 0\"\n                [logicalCellsCount]=\"columns.length\"\n                [logicalSlaveCellsCount]=\"unlockedColumnsCount\">\n            <th\n                class=\"k-group-cell k-header\"\n                role=\"presentation\"\n                *ngFor=\"let g of groups\">\n            </th>\n            <th class=\"k-hierarchy-cell k-header\"\n                role=\"presentation\"\n                *ngIf=\"detailTemplate?.templateRef\"\n                kendoGridLogicalCell\n                    [logicalRowIndex]=\"levelIndex\"\n                    [logicalColIndex]=\"0\"\n                    aria-selected=\"false\"\n            >\n            </th>\n            <ng-template ngFor let-column [ngForOf]=\"columnsForLevel(levelIndex)\" [ngForTrackBy]=\"trackByIndex\" let-columnIndex=\"index\" let-last=\"last\">\n                <th *ngIf=\"!isColumnGroupComponent(column)\"\n                    kendoGridLogicalCell [logicalRowIndex]=\"levelIndex\"\n                                         [logicalColIndex]=\"logicalColumnIndex(column)\"\n                                         [colSpan]=\"column.colspan\"\n                                         [rowSpan]=\"column.rowspan(totalColumnLevels)\"\n                                         role=\"columnheader\"\n                                         aria-selected=\"false\"\n                                         [attr.aria-sort]=\"sortState(column)\"\n                                         (keydown)=\"onHeaderKeydown(column, $event)\"\n                    kendoDropTarget\n                    kendoDraggable\n                    kendoDraggableColumn\n                    [enableDrag]=\"shouldActivate(column)\"\n                    [context]=\"{\n                        field: column.field,\n                        type: 'column',\n                        column: column,\n                        hint: column.title || column.field,\n                        lastColumn: last && columnIndex === 0\n                    }\"\n                    class=\"k-header\"\n                    [class.k-filterable]=\"(showFilterMenu && isFilterable(column)) || showColumnMenu(column)\"\n                    [class.k-first]=\"isFirstOnRow(column, columnIndex)\"\n                    [ngClass]=\"column.headerClass\"\n                    [ngStyle]=\"column.headerStyle\"\n                    [attr.rowspan]=\"column.rowspan(totalColumnLevels)\"\n                    [attr.colspan]=\"column.colspan\">\n                    <kendo-grid-filter-menu\n                        *ngIf=\"showFilterMenu && isFilterable(column)\"\n                        [column]=\"column\"\n                        [filter]=\"filter\">\n                    </kendo-grid-filter-menu>\n                    <kendo-grid-column-menu *ngIf=\"showColumnMenu(column)\"\n                        [standalone]=\"false\"\n                        [settings]=\"columnMenu\"\n                        [column]=\"column\"\n                        [columnMenuTemplate]=\"columnMenuTemplate\"\n                        [sort]=\"sort\"\n                        [filter]=\"filter\"\n                        [sortable]=\"sortable\">\n                    </kendo-grid-column-menu>\n                    <ng-template [ngIf]=\"!isSortable(column)\">\n                        <ng-template\n                            [templateContext]=\"{\n                                templateRef: column.headerTemplateRef,\n                                columnIndex: column.leafIndex,\n                                column: column,\n                                $implicit: column\n                            }\">\n                        </ng-template>\n                        <ng-template [ngIf]=\"!column.headerTemplateRef\">{{column.displayTitle}}</ng-template>\n                    </ng-template>\n                    <ng-template [ngIf]=\"isSortable(column)\">\n                        <span #link class=\"k-link\" (click)=\"onSortClick(column, $event, link)\">\n                            <ng-template\n                                [templateContext]=\"{\n                                    templateRef: column.headerTemplateRef,\n                                    columnIndex: column.leafIndex,\n                                    column: column,\n                                    $implicit: column\n                                }\">\n                            </ng-template>\n                            <ng-template [ngIf]=\"!column.headerTemplateRef\">{{column.displayTitle}}</ng-template>\n                            <span [attr.aria-label]=\"sortableLabel\" [ngClass]=\"sortIcon(column.field)\"></span>\n                            <span *ngIf=\"showSortNumbering(column)\" class=\"k-sort-order\">{{sortOrder(column.field)}}</span>\n                        </span>\n                        <span role=\"status\"\n                              class=\"k-sort-status\"\n                              style=\"position: absolute; left: -10000px;\"\n                              [innerHtml]=\"sortStatus(column)\">\n                        </span>\n                    </ng-template>\n                    <ng-template [ngIf]=\"isCheckboxColumn(column) && !column.headerTemplateRef && column.showSelectAll\">\n                        <input\n                            class=\"k-checkbox\"\n                            [attr.id]=\"selectAllCheckboxId()\"\n                            kendoGridSelectAllCheckbox\n                            kendoGridFocusable>\n                        <label class=\"k-checkbox-label\" [attr.for]=\"selectAllCheckboxId()\"></label>\n                    </ng-template>\n                    <span kendoGridColumnHandle\n                        kendoDraggable\n                        class=\"k-column-resizer\"\n                        *ngIf=\"resizable\"\n                        [column]=\"column\"\n                        [columns]=\"columns\">\n                    </span>\n                </th>\n                <th *ngIf=\"isColumnGroupComponent(column)\"\n                    kendoGridLogicalCell [logicalRowIndex]=\"levelIndex\"\n                                         [logicalColIndex]=\"logicalColumnIndex(column)\"\n                                         [rowSpan]=\"column.rowspan(totalColumnLevels)\"\n                                         [colSpan]=\"column.colspan\"\n                    kendoDropTarget\n                    kendoDraggable\n                    kendoDraggableColumn\n                    [enableDrag]=\"shouldActivate(column)\"\n                    [context]=\"{\n                        type: 'columnGroup',\n                        column: column,\n                        hint: column.title,\n                        lastColumn: last && columnIndex === 0\n                    }\"\n                    class=\"k-header\"\n                    [class.k-first]=\"isFirstOnRow(column, columnIndex)\"\n                    [class.k-filterable]=\"showColumnMenu(column)\"\n                    [ngClass]=\"column.headerClass\"\n                    [ngStyle]=\"column.headerStyle\"\n                    [attr.rowspan]=\"column.rowspan(totalColumnLevels)\"\n                    [attr.colspan]=\"column.colspan\">\n                        <kendo-grid-column-menu *ngIf=\"showColumnMenu(column)\"\n                            [standalone]=\"false\"\n                            [settings]=\"columnMenu\"\n                            [column]=\"column\"\n                            [columnMenuTemplate]=\"columnMenuTemplate\">\n                        </kendo-grid-column-menu>\n                        <ng-template\n                            [templateContext]=\"{\n                                templateRef: column.headerTemplateRef,\n                                columnIndex: lockedColumnsCount + columnIndex,\n                                column: column,\n                                $implicit: column\n                            }\">\n                        </ng-template>\n                        <ng-template [ngIf]=\"!column.headerTemplateRef\">{{column.displayTitle}}</ng-template>\n                        <span kendoGridColumnHandle\n                            kendoDraggable\n                            class=\"k-column-resizer\"\n                            *ngIf=\"resizable\"\n                            [column]=\"column\"\n                            [columns]=\"columns\">\n                        </span>\n                </th>\n            </ng-template>\n        </tr>\n        <tr *ngIf=\"showFilterRow\"\n            kendoGridFilterRow\n                [columns]=\"leafColumns\"\n                [filter]=\"filter\"\n                [groups]=\"groups\"\n                [detailTemplate]=\"detailTemplate\"\n                [lockedColumnsCount]=\"lockedColumnsCount\"\n            kendoGridLogicalRow\n                [logicalRowIndex]=\"totalColumnLevels + 1\"\n                [logicalSlaveRow]=\"lockedColumnsCount > 0\"\n                [logicalCellsCount]=\"columns.length\"\n                [logicalSlaveCellsCount]=\"unlockedColumnsCount\"\n        ></tr>\n    </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    HeaderComponent.ctorParameters = function () { return [
        { type: SinglePopupService },
        { type: DragHintService },
        { type: DropCueService },
        { type: ColumnReorderService },
        { type: IdService },
        { type: SortService },
        { type: LocalizationService },
        { type: ChangeDetectorRef }
    ]; };
    HeaderComponent.propDecorators = {
        totalColumnLevels: [{ type: Input }],
        columns: [{ type: Input }],
        groups: [{ type: Input }],
        detailTemplate: [{ type: Input }],
        scrollable: [{ type: Input }],
        filterable: [{ type: Input }],
        sort: [{ type: Input }],
        filter: [{ type: Input }],
        sortable: [{ type: Input }],
        groupable: [{ type: Input }],
        lockedColumnsCount: [{ type: Input }],
        resizable: [{ type: Input }],
        reorderable: [{ type: Input }],
        columnMenu: [{ type: Input }],
        columnMenuTemplate: [{ type: Input }],
        totalColumnsCount: [{ type: Input }],
        headerClass: [{ type: HostBinding, args: ['class.k-grid-header',] }],
        dropTargets: [{ type: ViewChildren, args: [DropTargetDirective,] }]
    };
    return HeaderComponent;
}());
export { HeaderComponent };
export { ɵ0, ɵ1, ɵ2, ɵ3, ɵ4, ɵ5, ɵ6, ɵ7, ɵ8, ɵ9, ɵ10 };
