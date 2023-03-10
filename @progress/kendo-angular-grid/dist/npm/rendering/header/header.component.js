/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var column_component_1 = require("../../columns/column.component");
var column_group_component_1 = require("../../columns/column-group.component");
var column_base_1 = require("../../columns/column-base");
var detail_template_directive_1 = require("../details/detail-template.directive");
var sort_settings_1 = require("../../columns/sort-settings");
var utils_1 = require("../../utils");
var column_common_1 = require("../../columns/column-common");
var single_popup_service_1 = require("../../common/single-popup.service");
var filterable_1 = require("../../filtering/filterable");
var id_service_1 = require("../../common/id.service");
var kendo_angular_common_1 = require("@progress/kendo-angular-common");
var drop_target_directive_1 = require("../../dragdrop/drop-target.directive");
var drag_hint_service_1 = require("../../dragdrop/drag-hint.service");
var drop_cue_service_1 = require("../../dragdrop/drop-cue.service");
var column_reorder_service_1 = require("../../dragdrop/column-reorder.service");
var common_1 = require("../../dragdrop/common");
var sort_service_1 = require("../../common/sort.service");
var utils_2 = require("../../column-menu/utils");
var dom_queries_1 = require("../common/dom-queries");
var mergeObjects = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return Object.assign.apply(null, [{}].concat(args));
};
var ɵ0 = mergeObjects;
exports.ɵ0 = ɵ0;
var directions = function (initialDirection) { return initialDirection === "asc" ? ["asc", "desc"] : ["desc", "asc"]; };
var ɵ1 = directions;
exports.ɵ1 = ɵ1;
/**
 * @hidden
 */
var isRootLevel = function (_a) {
    var parent = _a.parent;
    return !utils_1.isTruthy(parent);
};
var ɵ2 = isRootLevel;
exports.ɵ2 = ɵ2;
var ofColumnType = function (_a) {
    var draggable = _a.draggable;
    return ['column', 'columnGroup']
        .indexOf(draggable.context.type) >= 0;
};
var ɵ3 = ofColumnType;
exports.ɵ3 = ɵ3;
var notSameElement = function (_a) {
    var draggable = _a.draggable, target = _a.target;
    return draggable.element.nativeElement !== target.element.nativeElement;
};
var ɵ4 = notSameElement;
exports.ɵ4 = ɵ4;
var inSameParent = function (x, y) { return x.parent === y.parent ||
    (column_common_1.isInSpanColumn(y) && inSameParent(x, y.parent)); };
var ɵ5 = inSameParent;
exports.ɵ5 = ɵ5;
var sameParent = function (_a) {
    var draggable = _a.draggable, target = _a.target;
    return inSameParent(draggable.context.column, target.context.column);
};
var ɵ6 = sameParent;
exports.ɵ6 = ɵ6;
var lastNonLocked = function (_a) {
    var draggable = _a.draggable;
    return !utils_1.isTruthy(draggable.context.column.locked) &&
        isRootLevel(draggable.context.column) &&
        draggable.context.lastColumn;
};
var ɵ7 = lastNonLocked;
exports.ɵ7 = ɵ7;
var notInSpanColumn = function (_a) {
    var draggable = _a.draggable;
    return !column_common_1.isInSpanColumn(draggable.context.column);
};
var ɵ8 = notInSpanColumn;
exports.ɵ8 = ɵ8;
var reorderable = function (_a) {
    var draggable = _a.draggable;
    return draggable.context.column.reorderable;
};
var ɵ9 = reorderable;
exports.ɵ9 = ɵ9;
var lockable = function (_a) {
    var draggable = _a.draggable, target = _a.target;
    return draggable.context.column.lockable !== false ||
        draggable.context.column.isLocked === target.context.column.isLocked;
};
var ɵ10 = lockable;
exports.ɵ10 = ɵ10;
var rules = utils_1.and(ofColumnType, reorderable, notInSpanColumn, notSameElement, sameParent, utils_1.not(lastNonLocked), lockable);
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
        this.dropTargets = new core_1.QueryList();
        this.subscription = new rxjs_1.Subscription();
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
            var hasFocusableParent = Boolean(dom_queries_1.closestInScope(target, dom_queries_1.isFocusable, link));
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
        if (args.keyCode === kendo_angular_common_1.Keys.Enter && utils_1.isPresent(column.field)) {
            this.sortService.sort(this.toggleSort(column));
        }
    };
    HeaderComponent.prototype.showSortNumbering = function (column) {
        var showIndexes = sort_settings_1.normalize(this.sortable).showIndexes;
        return showIndexes
            && this.sort
            && this.sort.filter(function (_a) {
                var dir = _a.dir;
                return utils_1.isPresent(dir);
            }).length > 1
            && this.sortOrder(column.field) > 0;
    };
    HeaderComponent.prototype.sortOrder = function (field) {
        return this.sort
            .filter(function (_a) {
            var dir = _a.dir;
            return utils_1.isPresent(dir);
        })
            .findIndex(function (x) { return x.field === field; })
            + 1;
    };
    HeaderComponent.prototype.sortIcon = function (field) {
        var state = this.sortDescriptor(field);
        return {
            'k-icon': utils_1.isPresent(state.dir),
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
        var _a = sort_settings_1.normalize(this.sortable, column.sortable), allowUnsort = _a.allowUnsort, mode = _a.mode, initialDirection = _a.initialDirection;
        var descriptor = this.toggleDirection(column.field, allowUnsort, initialDirection);
        if (mode === 'single') {
            return [descriptor];
        }
        return this.sort.filter(function (desc) { return desc.field !== column.field; }).concat([descriptor]);
    };
    HeaderComponent.prototype.ngAfterViewInit = function () {
        this.subscription.add(utils_1.observe(this.dropTargets)
            .subscribe(this.attachTargets.bind(this)));
    };
    HeaderComponent.prototype.ngDoCheck = function () {
        this._leafColumns = column_common_1.columnsToRender(this.columns || []).filter(function (x) { return !column_group_component_1.isColumnGroupComponent(x); });
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
        if (utils_1.isPresent(index)) {
            return index + (utils_1.isPresent(this.detailTemplate) ? 1 : 0);
        }
        return -1;
    };
    Object.defineProperty(HeaderComponent.prototype, "showFilterMenu", {
        get: function () {
            return !this.columnMenu && filterable_1.hasFilterMenu(this.filterable);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HeaderComponent.prototype, "showFilterRow", {
        get: function () {
            return filterable_1.hasFilterRow(this.filterable);
        },
        enumerable: true,
        configurable: true
    });
    HeaderComponent.prototype.showColumnMenu = function (column) {
        return this.columnMenu && column.columnMenu &&
            (this.columnMenuTemplate || column.columnMenuTemplates.length || utils_2.hasItems(this.columnMenu, column));
    };
    HeaderComponent.prototype.isFilterable = function (column) {
        return !utils_1.isNullOrEmptyString(column.field) && column.filterable === true;
    };
    HeaderComponent.prototype.canDrop = function (draggable, target) {
        return this.reorderable && rules({ draggable: draggable, target: target });
    };
    HeaderComponent.prototype.shouldActivate = function (column) {
        var canReorder = this.reorderable && column.reorderable;
        if (!canReorder && !column_component_1.isColumnComponent(column)) {
            return false;
        }
        var groupable = this.groupable && column_component_1.isColumnComponent(column) && column.groupable !== false;
        return groupable || canReorder;
    };
    HeaderComponent.prototype.isSortable = function (column) {
        return !utils_1.isNullOrEmptyString(column.field)
            && utils_1.isTruthy(this.sortable) && utils_1.isTruthy(column.sortable);
    };
    HeaderComponent.prototype.isCheckboxColumn = function (column) {
        return column_base_1.isCheckboxColumn(column) && !column.templateRef;
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
        return column_common_1.sortColumns(column_common_1.columnsToRender(columns));
    };
    HeaderComponent.prototype.isColumnGroupComponent = function (column) {
        return column_group_component_1.isColumnGroupComponent(column);
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
        this.targetSubscription = new rxjs_1.Subscription();
        var enterStream = rxjs_1.merge.apply(void 0, this.dropTargets.map(function (target) { return target.enter; }));
        var leaveStream = rxjs_1.merge.apply(void 0, this.dropTargets.map(function (target) { return target.leave; }));
        var dropStream = rxjs_1.merge.apply(void 0, this.dropTargets.map(function (target) { return target.drop; }));
        this.targetSubscription.add(enterStream.pipe(operators_1.tap(function (_a) {
            var target = _a.target, draggable = _a.draggable;
            if (draggable.context.type === 'groupIndicator') {
                return;
            }
            var targetLocked = utils_1.isTruthy(target.context.column.isLocked);
            var draggableLocked = utils_1.isTruthy(draggable.context.column.isLocked);
            if (_this.lockedColumnsCount > 0 || targetLocked || draggableLocked) {
                _this.hint.toggleLock(targetLocked);
            }
        }), operators_1.filter(function (_a) {
            var draggable = _a.draggable, target = _a.target;
            return _this.canDrop(draggable, target);
        }), operators_1.switchMap(this.trackMove.bind(this, leaveStream, dropStream)), operators_1.map(function (e) { return mergeObjects(e, { before: _this.calculateBefore(e), changeContainer: e.changeContainer }); }), operators_1.map(this.normalizeTarget.bind(this)), operators_1.tap(this.enter.bind(this)), operators_1.switchMap(function (args) {
            return dropStream.pipe(operators_1.map(function () { return args; }), operators_1.takeUntil(leaveStream.pipe(operators_1.tap(_this.leave.bind(_this)))));
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
                .pipe(operators_1.takeUntil(leaveStream), operators_1.takeUntil(dropStream), operators_1.map(function (_a) {
                var mouseEvent = _a.mouseEvent;
                return mergeObjects({ changeContainer: true }, e, { mouseEvent: mouseEvent });
            }));
        }
        return rxjs_1.of(mergeObjects({ changeContainer: changed }, e));
    };
    HeaderComponent.prototype.calculateBefore = function (_a) {
        var draggable = _a.draggable, target = _a.target, mouseEvent = _a.mouseEvent, _b = _a.changeContainer, changeContainer = _b === void 0 ? false : _b;
        var targetElement = target.element.nativeElement;
        var before = false;
        if (changeContainer) {
            var left = common_1.offset(targetElement).left;
            var halfWidth = targetElement.offsetWidth / 2;
            var middle = left + halfWidth;
            before = middle > mouseEvent.pageX;
            if (this.localization.rtl) {
                before = !before;
            }
        }
        else {
            before = common_1.isTargetBefore(draggable.element.nativeElement, targetElement);
        }
        return before;
    };
    HeaderComponent.prototype.enter = function (_a) {
        var target = _a.target, before = _a.before;
        this.hint.enable();
        if (this.localization.rtl) {
            before = !before;
        }
        this.cue.position(common_1.position(target.element.nativeElement, before));
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
        { type: core_1.Component, args: [{
                    selector: '[kendoGridHeader]',
                    styles: ["\n        .k-column-resizer {\n            cursor: col-resize;\n            display: block;\n            height: 1000%;\n            position: absolute;\n            top: 0;\n            width: .5em;\n        }\n    "],
                    template: "\n    <ng-template [ngIf]=\"true\">\n        <tr *ngFor=\"let i of columnLevels; let levelIndex = index\"\n            kendoGridLogicalRow\n                [logicalRowIndex]=\"levelIndex\"\n                [logicalSlaveRow]=\"lockedColumnsCount > 0\"\n                [logicalCellsCount]=\"columns.length\"\n                [logicalSlaveCellsCount]=\"unlockedColumnsCount\">\n            <th\n                class=\"k-group-cell k-header\"\n                role=\"presentation\"\n                *ngFor=\"let g of groups\">\n            </th>\n            <th class=\"k-hierarchy-cell k-header\"\n                role=\"presentation\"\n                *ngIf=\"detailTemplate?.templateRef\"\n                kendoGridLogicalCell\n                    [logicalRowIndex]=\"levelIndex\"\n                    [logicalColIndex]=\"0\"\n                    aria-selected=\"false\"\n            >\n            </th>\n            <ng-template ngFor let-column [ngForOf]=\"columnsForLevel(levelIndex)\" [ngForTrackBy]=\"trackByIndex\" let-columnIndex=\"index\" let-last=\"last\">\n                <th *ngIf=\"!isColumnGroupComponent(column)\"\n                    kendoGridLogicalCell [logicalRowIndex]=\"levelIndex\"\n                                         [logicalColIndex]=\"logicalColumnIndex(column)\"\n                                         [colSpan]=\"column.colspan\"\n                                         [rowSpan]=\"column.rowspan(totalColumnLevels)\"\n                                         role=\"columnheader\"\n                                         aria-selected=\"false\"\n                                         [attr.aria-sort]=\"sortState(column)\"\n                                         (keydown)=\"onHeaderKeydown(column, $event)\"\n                    kendoDropTarget\n                    kendoDraggable\n                    kendoDraggableColumn\n                    [enableDrag]=\"shouldActivate(column)\"\n                    [context]=\"{\n                        field: column.field,\n                        type: 'column',\n                        column: column,\n                        hint: column.title || column.field,\n                        lastColumn: last && columnIndex === 0\n                    }\"\n                    class=\"k-header\"\n                    [class.k-filterable]=\"(showFilterMenu && isFilterable(column)) || showColumnMenu(column)\"\n                    [class.k-first]=\"isFirstOnRow(column, columnIndex)\"\n                    [ngClass]=\"column.headerClass\"\n                    [ngStyle]=\"column.headerStyle\"\n                    [attr.rowspan]=\"column.rowspan(totalColumnLevels)\"\n                    [attr.colspan]=\"column.colspan\">\n                    <kendo-grid-filter-menu\n                        *ngIf=\"showFilterMenu && isFilterable(column)\"\n                        [column]=\"column\"\n                        [filter]=\"filter\">\n                    </kendo-grid-filter-menu>\n                    <kendo-grid-column-menu *ngIf=\"showColumnMenu(column)\"\n                        [standalone]=\"false\"\n                        [settings]=\"columnMenu\"\n                        [column]=\"column\"\n                        [columnMenuTemplate]=\"columnMenuTemplate\"\n                        [sort]=\"sort\"\n                        [filter]=\"filter\"\n                        [sortable]=\"sortable\">\n                    </kendo-grid-column-menu>\n                    <ng-template [ngIf]=\"!isSortable(column)\">\n                        <ng-template\n                            [templateContext]=\"{\n                                templateRef: column.headerTemplateRef,\n                                columnIndex: column.leafIndex,\n                                column: column,\n                                $implicit: column\n                            }\">\n                        </ng-template>\n                        <ng-template [ngIf]=\"!column.headerTemplateRef\">{{column.displayTitle}}</ng-template>\n                    </ng-template>\n                    <ng-template [ngIf]=\"isSortable(column)\">\n                        <span #link class=\"k-link\" (click)=\"onSortClick(column, $event, link)\">\n                            <ng-template\n                                [templateContext]=\"{\n                                    templateRef: column.headerTemplateRef,\n                                    columnIndex: column.leafIndex,\n                                    column: column,\n                                    $implicit: column\n                                }\">\n                            </ng-template>\n                            <ng-template [ngIf]=\"!column.headerTemplateRef\">{{column.displayTitle}}</ng-template>\n                            <span [attr.aria-label]=\"sortableLabel\" [ngClass]=\"sortIcon(column.field)\"></span>\n                            <span *ngIf=\"showSortNumbering(column)\" class=\"k-sort-order\">{{sortOrder(column.field)}}</span>\n                        </span>\n                        <span role=\"status\"\n                              class=\"k-sort-status\"\n                              style=\"position: absolute; left: -10000px;\"\n                              [innerHtml]=\"sortStatus(column)\">\n                        </span>\n                    </ng-template>\n                    <ng-template [ngIf]=\"isCheckboxColumn(column) && !column.headerTemplateRef && column.showSelectAll\">\n                        <input\n                            class=\"k-checkbox\"\n                            [attr.id]=\"selectAllCheckboxId()\"\n                            kendoGridSelectAllCheckbox\n                            kendoGridFocusable>\n                        <label class=\"k-checkbox-label\" [attr.for]=\"selectAllCheckboxId()\"></label>\n                    </ng-template>\n                    <span kendoGridColumnHandle\n                        kendoDraggable\n                        class=\"k-column-resizer\"\n                        *ngIf=\"resizable\"\n                        [column]=\"column\"\n                        [columns]=\"columns\">\n                    </span>\n                </th>\n                <th *ngIf=\"isColumnGroupComponent(column)\"\n                    kendoGridLogicalCell [logicalRowIndex]=\"levelIndex\"\n                                         [logicalColIndex]=\"logicalColumnIndex(column)\"\n                                         [rowSpan]=\"column.rowspan(totalColumnLevels)\"\n                                         [colSpan]=\"column.colspan\"\n                    kendoDropTarget\n                    kendoDraggable\n                    kendoDraggableColumn\n                    [enableDrag]=\"shouldActivate(column)\"\n                    [context]=\"{\n                        type: 'columnGroup',\n                        column: column,\n                        hint: column.title,\n                        lastColumn: last && columnIndex === 0\n                    }\"\n                    class=\"k-header\"\n                    [class.k-first]=\"isFirstOnRow(column, columnIndex)\"\n                    [class.k-filterable]=\"showColumnMenu(column)\"\n                    [ngClass]=\"column.headerClass\"\n                    [ngStyle]=\"column.headerStyle\"\n                    [attr.rowspan]=\"column.rowspan(totalColumnLevels)\"\n                    [attr.colspan]=\"column.colspan\">\n                        <kendo-grid-column-menu *ngIf=\"showColumnMenu(column)\"\n                            [standalone]=\"false\"\n                            [settings]=\"columnMenu\"\n                            [column]=\"column\"\n                            [columnMenuTemplate]=\"columnMenuTemplate\">\n                        </kendo-grid-column-menu>\n                        <ng-template\n                            [templateContext]=\"{\n                                templateRef: column.headerTemplateRef,\n                                columnIndex: lockedColumnsCount + columnIndex,\n                                column: column,\n                                $implicit: column\n                            }\">\n                        </ng-template>\n                        <ng-template [ngIf]=\"!column.headerTemplateRef\">{{column.displayTitle}}</ng-template>\n                        <span kendoGridColumnHandle\n                            kendoDraggable\n                            class=\"k-column-resizer\"\n                            *ngIf=\"resizable\"\n                            [column]=\"column\"\n                            [columns]=\"columns\">\n                        </span>\n                </th>\n            </ng-template>\n        </tr>\n        <tr *ngIf=\"showFilterRow\"\n            kendoGridFilterRow\n                [columns]=\"leafColumns\"\n                [filter]=\"filter\"\n                [groups]=\"groups\"\n                [detailTemplate]=\"detailTemplate\"\n                [lockedColumnsCount]=\"lockedColumnsCount\"\n            kendoGridLogicalRow\n                [logicalRowIndex]=\"totalColumnLevels + 1\"\n                [logicalSlaveRow]=\"lockedColumnsCount > 0\"\n                [logicalCellsCount]=\"columns.length\"\n                [logicalSlaveCellsCount]=\"unlockedColumnsCount\"\n        ></tr>\n    </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    HeaderComponent.ctorParameters = function () { return [
        { type: single_popup_service_1.SinglePopupService },
        { type: drag_hint_service_1.DragHintService },
        { type: drop_cue_service_1.DropCueService },
        { type: column_reorder_service_1.ColumnReorderService },
        { type: id_service_1.IdService },
        { type: sort_service_1.SortService },
        { type: kendo_angular_l10n_1.LocalizationService },
        { type: core_1.ChangeDetectorRef }
    ]; };
    HeaderComponent.propDecorators = {
        totalColumnLevels: [{ type: core_1.Input }],
        columns: [{ type: core_1.Input }],
        groups: [{ type: core_1.Input }],
        detailTemplate: [{ type: core_1.Input }],
        scrollable: [{ type: core_1.Input }],
        filterable: [{ type: core_1.Input }],
        sort: [{ type: core_1.Input }],
        filter: [{ type: core_1.Input }],
        sortable: [{ type: core_1.Input }],
        groupable: [{ type: core_1.Input }],
        lockedColumnsCount: [{ type: core_1.Input }],
        resizable: [{ type: core_1.Input }],
        reorderable: [{ type: core_1.Input }],
        columnMenu: [{ type: core_1.Input }],
        columnMenuTemplate: [{ type: core_1.Input }],
        totalColumnsCount: [{ type: core_1.Input }],
        headerClass: [{ type: core_1.HostBinding, args: ['class.k-grid-header',] }],
        dropTargets: [{ type: core_1.ViewChildren, args: [drop_target_directive_1.DropTargetDirective,] }]
    };
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
