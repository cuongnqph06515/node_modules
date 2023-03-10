/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var focus_root_1 = require("./focus-root");
var focusable_directive_1 = require("./focusable.directive");
var grid_focusable_element_1 = require("./grid-focusable-element");
var navigation_cursor_1 = require("./navigation-cursor");
var navigation_model_1 = require("./navigation-model");
var dom_events_service_1 = require("../common/dom-events.service");
var kendo_angular_common_1 = require("@progress/kendo-angular-common");
var edit_service_1 = require("../editing/edit.service");
var groups_service_1 = require("../grouping/groups.service");
var pager_context_service_1 = require("../pager/pager-context.service");
var dom_queries_1 = require("../rendering/common/dom-queries");
var details_service_1 = require("../rendering/details/details.service");
var scroll_request_service_1 = require("../scrolling/scroll-request.service");
var isInSameGrid = function (element, gridElement) {
    return dom_queries_1.closest(element, dom_queries_1.matchesNodeName('kendo-grid')) === gridElement;
};
var ɵ0 = isInSameGrid;
exports.ɵ0 = ɵ0;
var matchHeaderCell = dom_queries_1.matchesNodeName('th');
var matchDataCell = dom_queries_1.matchesNodeName('td');
var matchFooterCell = dom_queries_1.matchesNodeName('.k-grid-footer td');
var matchCell = function (element) { return matchDataCell(element) || matchHeaderCell(element) || matchFooterCell(element); };
var ɵ1 = matchCell;
exports.ɵ1 = ɵ1;
var gridCell = function (element, gridElement) {
    var target = dom_queries_1.closest(element, matchCell);
    while (target && !isInSameGrid(target, gridElement)) {
        target = dom_queries_1.closest(target.parentElement, matchCell);
    }
    return target;
};
var ɵ2 = gridCell;
exports.ɵ2 = ɵ2;
var targetCell = function (target, gridElement) {
    var cell = gridCell(target, gridElement);
    var row = dom_queries_1.closest(cell, dom_queries_1.matchesNodeName('tr'));
    if (cell && row) {
        var rowIndex = row.getAttribute('aria-rowindex');
        rowIndex = rowIndex ? parseInt(rowIndex, 10) - 1 : null;
        var colIndex = cell.getAttribute('aria-colindex');
        colIndex = colIndex ? parseInt(colIndex, 10) - 1 : null;
        if (rowIndex !== null && colIndex !== null) {
            return { colIndex: colIndex, rowIndex: rowIndex, element: cell };
        }
    }
};
var ɵ3 = targetCell;
exports.ɵ3 = ɵ3;
var isArrowKey = function (keyCode) {
    return keyCode === kendo_angular_common_1.Keys.ArrowLeft || keyCode === kendo_angular_common_1.Keys.ArrowRight ||
        keyCode === kendo_angular_common_1.Keys.ArrowUp || keyCode === kendo_angular_common_1.Keys.ArrowDown;
};
var ɵ4 = isArrowKey;
exports.ɵ4 = ɵ4;
var isNavigationKey = function (keyCode) {
    return isArrowKey(keyCode) ||
        keyCode === kendo_angular_common_1.Keys.PageUp || keyCode === kendo_angular_common_1.Keys.PageDown ||
        keyCode === kendo_angular_common_1.Keys.Home || keyCode === kendo_angular_common_1.Keys.End;
};
var ɵ5 = isNavigationKey;
exports.ɵ5 = ɵ5;
var isInput = dom_queries_1.matchesNodeName('input');
var isTextInput = function (element) {
    return element && isInput(element) && element.type.toLowerCase() === 'text';
};
var ɵ6 = isTextInput;
exports.ɵ6 = ɵ6;
var isPrintableCharacter = function (str) {
    return str.length === 1 && str.match(/\S/);
};
var ɵ7 = isPrintableCharacter;
exports.ɵ7 = ɵ7;
/**
 * @hidden
 */
var NavigationViewport = /** @class */ (function () {
    function NavigationViewport(firstItemIndex, lastItemIndex) {
        this.firstItemIndex = firstItemIndex;
        this.lastItemIndex = lastItemIndex;
    }
    NavigationViewport.prototype.containsRow = function (dataRowIndex) {
        var headerRow = dataRowIndex < 0;
        return headerRow || (dataRowIndex >= this.firstItemIndex && dataRowIndex <= this.lastItemIndex);
    };
    NavigationViewport.prototype.intersects = function (start, end) {
        return (start <= this.firstItemIndex && this.lastItemIndex <= end) ||
            (this.firstItemIndex <= start && start <= this.lastItemIndex) ||
            (this.firstItemIndex <= end && end <= this.lastItemIndex);
    };
    return NavigationViewport;
}());
exports.NavigationViewport = NavigationViewport;
/**
 * @hidden
 */
var NavigationService = /** @class */ (function () {
    function NavigationService(zone, domEvents, pagerContextService, scrollRequestService, groupsService, detailsService, focusRoot, editService, cd, localization, focusableParent) {
        this.zone = zone;
        this.domEvents = domEvents;
        this.pagerContextService = pagerContextService;
        this.scrollRequestService = scrollRequestService;
        this.groupsService = groupsService;
        this.detailsService = detailsService;
        this.focusRoot = focusRoot;
        this.editService = editService;
        this.cd = cd;
        this.localization = localization;
        this.focusableParent = focusableParent;
        this.cellKeydown = new core_1.EventEmitter();
        this.activeRowIndex = 0;
        this.alive = false;
        this.active = true;
        this.mode = 0 /* Standby */;
        this.model = new navigation_model_1.NavigationModel();
        this.cursor = new navigation_cursor_1.NavigationCursor(this.model);
        this.changes = this.cursor.changes;
    }
    Object.defineProperty(NavigationService.prototype, "metadata", {
        get: function () {
            return this.meta;
        },
        set: function (value) {
            this.meta = value;
            this.cursor.metadata = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavigationService.prototype, "enabled", {
        get: function () {
            return this.alive;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavigationService.prototype, "activeCell", {
        get: function () {
            if (this.mode !== 0 /* Standby */) {
                return this.cursor.cell;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavigationService.prototype, "activeRow", {
        get: function () {
            if (this.mode !== 0 /* Standby */) {
                return Object.assign({}, this.cursor.row, {
                    cells: this.cursor.row.cells.toArray()
                });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavigationService.prototype, "activeDataRow", {
        get: function () {
            return Math.max(0, this.activeRowIndex - this.meta.headerRows);
        },
        enumerable: true,
        configurable: true
    });
    NavigationService.prototype.init = function (meta) {
        var _this = this;
        this.alive = true;
        this.focusRoot.alive = true;
        this.metadata = meta;
        var onStableSubscriber = function () {
            var operators = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                operators[_i] = arguments[_i];
            }
            return function (args) {
                var _a;
                return _this.zone.isStable ?
                    rxjs_1.from([true]).pipe(operators_1.map(function () { return args; })) : (_a = _this.zone.onStable).pipe.apply(_a, [operators_1.take(1), operators_1.map(function () { return args; })].concat(operators));
            };
        };
        var onStable = onStableSubscriber();
        this.subs = new rxjs_1.Subscription();
        this.subs.add(this.cursor.changes
            .subscribe(function (args) { return _this.onCursorChanges(args); }));
        this.subs.add(this.domEvents.focus.pipe(operators_1.switchMap(onStable))
            .subscribe(function (args) { return _this.navigateTo(args.target); }));
        this.subs.add(this.domEvents.focusOut.pipe(operators_1.filter(function () { return _this.mode !== 0 /* Standby */; }), operators_1.switchMap(onStableSubscriber(operators_1.takeUntil(this.domEvents.focus))))
            .subscribe(function (args) { return _this.onFocusOut(args); }));
        this.subs.add(this.domEvents.windowBlur.pipe(operators_1.filter(function () { return _this.mode !== 0 /* Standby */; }))
            .subscribe(function () { return _this.onWindowBlur(); }));
        this.subs.add(
        // Closing the editor will not always trigger focusout in Firefox.
        // To get around this, we ensure that the cell is closed after editing.
        this.editService.changes.pipe(operators_1.filter(function (e) { return e.action !== 'edit' && _this.mode === 2 /* Content */; }), operators_1.filter(function (e) { return e.action === 'cellClose' && !e.prevented; }), operators_1.switchMap(onStable))
            .subscribe(function () { return _this.leaveCell(); }));
        this.subs.add(this.pagerContextService.pageChange
            .subscribe(function () { return _this.cursor.reset(0, 0); }));
        this.subs.add(this.domEvents.keydown
            .subscribe(function (args) { return _this.onKeydown(args); }));
        this.subs.add(this.domEvents.keydown.pipe(operators_1.filter(function (args) {
            return args.keyCode === kendo_angular_common_1.Keys.Tab && _this.mode === 2 /* Content */;
        }), operators_1.switchMapTo(this.domEvents.focusOut.pipe(operators_1.takeUntil(
        // Timeout if focusOut doesn't fire very soon
        rxjs_1.interval(0).pipe(operators_1.take(1))))))
            .subscribe(function () { return _this.onTabout(); }));
        if (this.focusableParent) {
            var element = new grid_focusable_element_1.GridFocusableElement(this);
            this.focusableParent.registerElement(element);
        }
        this.deactivateElements();
    };
    NavigationService.prototype.ngOnDestroy = function () {
        if (this.subs) {
            this.subs.unsubscribe();
        }
        this.alive = false;
    };
    NavigationService.prototype.registerCell = function (cell) {
        if (cell.logicalRowIndex !== this.pendingRowIndex) {
            var modelCell = this.model.registerCell(cell);
            if (this.virtualCell && this.cursor.activateVirtualCell(modelCell)) {
                this.virtualCell = false;
            }
        }
    };
    NavigationService.prototype.registerCellOnCurrentRow = function (cell) {
        if (cell.logicalRowIndex === this.pendingRowIndex) {
            this.model.registerCell(cell);
        }
    };
    NavigationService.prototype.unregisterCell = function (index, rowIndex, cell) {
        this.model.unregisterCell(index, rowIndex, cell);
    };
    NavigationService.prototype.registerRow = function (row) {
        this.model.registerRow(row);
        this.pendingRowIndex = row.logicalRowIndex;
    };
    NavigationService.prototype.updateRow = function (row) {
        this.model.updateRow(row);
    };
    NavigationService.prototype.unregisterRow = function (index, row) {
        this.model.unregisterRow(index, row);
    };
    NavigationService.prototype.isCellFocusable = function (cell) {
        return this.alive &&
            this.active &&
            this.mode !== 2 /* Content */ &&
            this.cursor.isActive(cell.logicalRowIndex, cell.logicalColIndex);
    };
    NavigationService.prototype.isCellFocused = function (cell) {
        return this.mode === 1 /* Cursor */ && this.isCellFocusable(cell);
    };
    NavigationService.prototype.navigateTo = function (el) {
        if (!this.alive) {
            return;
        }
        var cell = targetCell(el, this.meta.gridElement.nativeElement);
        if (!cell) {
            return;
        }
        var oldMode = this.mode;
        var focusInCell = dom_queries_1.contains(cell.element, document.activeElement);
        var focusInActiveRowContent = this.mode === 2 /* Content */ &&
            this.activeRowIndex === cell.rowIndex &&
            el !== cell.element;
        if (focusInCell) {
            this.mode = 2 /* Content */;
            this.cursor.reset(cell.rowIndex, cell.colIndex);
            this.activateRow();
        }
        else if (!focusInActiveRowContent) {
            this.mode = 1 /* Cursor */;
            this.deactivateElements();
            var alreadyActive = this.cursor.isActive(cell.rowIndex, cell.colIndex);
            var isCursor = oldMode === 1 /* Cursor */ && alreadyActive;
            if (!isCursor) {
                this.cursor.reset(cell.rowIndex, cell.colIndex);
            }
        }
    };
    NavigationService.prototype.tryFocus = function (el) {
        this.activateElements();
        var focusable = dom_queries_1.findFocusableChild(el);
        if (focusable) {
            var cell = targetCell(focusable, this.meta.gridElement.nativeElement);
            if (cell) {
                this.cursor.reset(cell.rowIndex, cell.colIndex);
                this.deactivateElements();
                this.enterCell();
            }
            focusable.focus();
        }
        else {
            this.deactivateElements();
        }
        return !!focusable;
    };
    NavigationService.prototype.needsViewport = function () {
        return this.meta && this.meta.isVirtual;
    };
    NavigationService.prototype.setViewport = function (firstItemIndex, lastItemIndex) {
        this.viewport = new NavigationViewport(firstItemIndex, lastItemIndex);
        if (this.meta && this.meta.isVirtual && this.activeDataRow > -1) {
            var dataRowIndex = this.activeDataRow;
            var ahead = firstItemIndex - dataRowIndex;
            var behind = dataRowIndex - lastItemIndex;
            if (ahead > 0) {
                this.cursor.reset(firstItemIndex + this.meta.headerRows);
            }
            else if (behind > 0) {
                this.cursor.reset(lastItemIndex - this.meta.headerRows);
            }
        }
    };
    NavigationService.prototype.setColumnViewport = function (firstItemIndex, lastItemIndex) {
        this.columnViewport = new NavigationViewport(firstItemIndex, lastItemIndex);
    };
    NavigationService.prototype.focusCell = function (rowIndex, colIndex) {
        if (rowIndex === void 0) { rowIndex = undefined; }
        if (colIndex === void 0) { colIndex = undefined; }
        this.mode = 1 /* Cursor */;
        this.cursor.reset(rowIndex, colIndex);
        return this.activeCell;
    };
    NavigationService.prototype.focusCellByElement = function (el) {
        var cell = targetCell(el, this.meta.gridElement.nativeElement);
        if (cell) {
            return this.focusCell(cell.rowIndex, cell.colIndex);
        }
    };
    NavigationService.prototype.focusNextCell = function (wrap) {
        if (wrap === void 0) { wrap = true; }
        return this.focusAdjacentCell(true, wrap);
    };
    NavigationService.prototype.focusPrevCell = function (wrap) {
        if (wrap === void 0) { wrap = true; }
        return this.focusAdjacentCell(false, wrap);
    };
    NavigationService.prototype.toggle = function (active) {
        this.active = active;
        this.cursor.announce();
    };
    NavigationService.prototype.hasFocus = function () {
        return this.mode === 1 /* Cursor */ || this.mode === 2 /* Content */;
    };
    NavigationService.prototype.autoFocusCell = function (start, end) {
        return !this.meta.virtualColumns || end < this.meta.columns.lockedLeafColumns.length || this.columnViewport.intersects(start, end);
    };
    NavigationService.prototype.focusAdjacentCell = function (fwd, wrap) {
        this.focusCell();
        var success = fwd ? this.moveCursorFwd() : this.moveCursorBwd();
        if (wrap && !success) {
            success = fwd ? this.cursor.moveDown(1) : this.cursor.moveUp(1);
            if (success) {
                var row = this.cursor.row;
                var colIdx = fwd ? 0 : this.cursor.lastCellIndex(row);
                this.cursor.reset(row.index, colIdx);
            }
        }
        if (success) {
            return this.activeCell;
        }
        else {
            this.mode = 0 /* Standby */;
            this.cursor.announce();
        }
        return null;
    };
    NavigationService.prototype.enterCell = function () {
        var cell = this.cursor.cell;
        if (!cell) {
            return;
        }
        var group = cell.focusGroup;
        var focusable = group && group.canFocus();
        this.mode = focusable ? 2 /* Content */ : 1 /* Cursor */;
        this.cursor.announce();
        if (focusable) {
            this.activateRow();
            group.focus();
        }
    };
    NavigationService.prototype.leaveCell = function () {
        var cell = this.cursor.cell;
        if (!cell) {
            return;
        }
        var group = cell.focusGroup;
        var focusable = group && group.canFocus();
        if (!focusable) {
            this.deactivateElements();
        }
        this.mode = 1 /* Cursor */;
        this.cursor.announce();
    };
    NavigationService.prototype.activateElements = function () {
        this.focusRoot.activate();
    };
    NavigationService.prototype.deactivateElements = function () {
        this.focusRoot.deactivate();
    };
    NavigationService.prototype.activateRow = function () {
        this.cursor.row.cells
            .forEach(function (cell) { return cell.focusGroup && cell.focusGroup.activate(); });
    };
    NavigationService.prototype.moveCursorFwd = function () {
        return this.localization.rtl ? this.cursor.moveLeft() : this.cursor.moveRight();
    };
    NavigationService.prototype.moveCursorBwd = function () {
        return this.localization.rtl ? this.cursor.moveRight() : this.cursor.moveLeft();
    };
    NavigationService.prototype.onCursorKeydown = function (args) {
        var _this = this;
        var preventDefault = false;
        var modifier = args.ctrlKey || args.metaKey;
        var step = modifier ? 5 : 1;
        if (!this.onCellKeydown(args)) {
            return;
        }
        var row = this.cursor.row;
        switch (args.keyCode) {
            case kendo_angular_common_1.Keys.ArrowDown:
                preventDefault = this.cursor.moveDown(step);
                break;
            case kendo_angular_common_1.Keys.ArrowUp:
                preventDefault = this.cursor.moveUp(step);
                break;
            case kendo_angular_common_1.Keys.ArrowRight:
                preventDefault = this.moveCursorFwd();
                break;
            case kendo_angular_common_1.Keys.ArrowLeft:
                preventDefault = this.moveCursorBwd();
                break;
            case kendo_angular_common_1.Keys.PageDown:
                if (this.metadata.isVirtual && this.viewport) {
                    var nextItemIndex = this.meta.headerRows + this.viewport.lastItemIndex + 1;
                    if (this.metadata.hasDetailTemplate) {
                        nextItemIndex++;
                    }
                    nextItemIndex = Math.min(this.meta.maxLogicalRowIndex, nextItemIndex);
                    this.cursor.reset(nextItemIndex);
                    preventDefault = true;
                }
                else if (this.metadata.hasPager) {
                    this.zone.run(function () { return _this.pagerContextService.nextPage(); });
                    preventDefault = true;
                }
                break;
            case kendo_angular_common_1.Keys.PageUp:
                if (this.metadata.isVirtual && this.viewport) {
                    var viewportSize = this.viewport.lastItemIndex - this.viewport.firstItemIndex;
                    var firstItemIndex = this.viewport.firstItemIndex;
                    var nextItemIndex = Math.max(this.meta.headerRows, firstItemIndex - viewportSize - 1);
                    this.cursor.reset(nextItemIndex);
                    preventDefault = true;
                }
                else if (this.metadata.hasPager) {
                    this.zone.run(function () { return _this.pagerContextService.prevPage(); });
                    preventDefault = true;
                }
                break;
            case kendo_angular_common_1.Keys.Home:
                if (modifier) {
                    if (this.meta.isVirtual) {
                        this.cursor.reset(this.meta.headerRows, 0, false);
                    }
                    else {
                        this.cursor.reset(this.model.firstRow.index, 0, false);
                    }
                }
                else {
                    this.cursor.reset(row.index, 0, false);
                }
                preventDefault = true;
                break;
            case kendo_angular_common_1.Keys.End:
                if (modifier) {
                    if (this.meta.isVirtual) {
                        var lastRowIndex = this.meta.maxLogicalRowIndex;
                        if (this.meta.hasDetailTemplate) {
                            lastRowIndex--;
                        }
                        this.cursor.reset(lastRowIndex, this.cursor.lastCellIndex(), false);
                    }
                    else {
                        this.cursor.reset(this.model.lastRow.index, this.cursor.lastCellIndex(this.model.lastRow), false);
                    }
                }
                else {
                    var lastIndex = this.cursor.lastCellIndex(row);
                    var cell = this.model.findCell(lastIndex, row);
                    if (cell) {
                        this.cursor.reset(cell.rowIndex, cell.colIndex);
                    }
                    else {
                        this.cursor.reset(row.index, lastIndex);
                    }
                }
                preventDefault = true;
                break;
            case kendo_angular_common_1.Keys.Enter:
            case kendo_angular_common_1.Keys.F2:
                var groupItem_1 = row.groupItem;
                if (groupItem_1) {
                    this.zone.run(function () {
                        return _this.groupsService.toggleRow(groupItem_1.index, groupItem_1.data);
                    });
                }
                else if (this.cursor.cell.detailExpandCell) {
                    this.zone.run(function () {
                        return _this.detailsService.toggleRow(row.dataRowIndex, row.dataItem);
                    });
                }
                else {
                    this.enterCell();
                    if (!this.cursor.cell.focusGroup.isNavigable()) {
                        preventDefault = true;
                    }
                }
                break;
            default:
                if (!args.ctrlKey && !args.altKey && isPrintableCharacter(args.key)) {
                    this.enterCell();
                }
        }
        if (preventDefault) {
            args.preventDefault();
        }
    };
    NavigationService.prototype.onContentKeydown = function (args) {
        if (!this.onCellKeydown(args)) {
            return;
        }
        var confirm = !args.defaultPrevented && args.keyCode === kendo_angular_common_1.Keys.Enter && isTextInput(args.srcElement);
        if (args.keyCode === kendo_angular_common_1.Keys.Escape || args.keyCode === kendo_angular_common_1.Keys.F2 || confirm) {
            this.leaveCell();
            this.cursor.reset();
            args.stopPropagation();
        }
        else if (isNavigationKey(args.keyCode) && this.cursor.cell.focusGroup.isNavigable()) {
            this.onCursorKeydown(args);
            if (args.defaultPrevented) {
                this.leaveCell();
            }
        }
    };
    NavigationService.prototype.onCellKeydown = function (args) {
        if (this.editService.isEditingCell()) {
            var confirm_1 = args.keyCode === kendo_angular_common_1.Keys.Enter;
            var cancel = args.keyCode === kendo_angular_common_1.Keys.Escape;
            var navigate = isNavigationKey(args.keyCode);
            if (confirm_1) {
                this.editService.closeCell(args);
            }
            else if (cancel) {
                this.editService.cancelCell();
                this.cd.detectChanges();
            }
            else if (navigate) {
                return false;
            }
        }
        this.cellKeydown.emit(args);
        return true;
    };
    NavigationService.prototype.onCursorChanges = function (args) {
        this.activeRowIndex = args.rowIndex;
        var dataRowIndex = this.activeDataRow;
        if (this.meta && (this.meta.isVirtual && this.viewport &&
            !this.viewport.containsRow(dataRowIndex) && dataRowIndex > -1)) {
            this.scrollRequestService.scrollTo({ row: dataRowIndex });
        }
        if (this.meta.virtualColumns && args.colIndex >= this.meta.columns.lockedLeafColumns.length) {
            var cell = this.activeCell;
            var _a = this.model.cellRange(cell), start = _a.start, end = _a.end;
            if (!cell) {
                this.virtualCell = true;
            }
            if ((!cell && this.mode !== 0 /* Standby */) || (cell && !this.columnViewport.intersects(start, end))) {
                this.scrollRequestService.scrollTo({ column: args.colIndex - (this.metadata.hasDetailTemplate ? 1 : 0) });
            }
        }
    };
    NavigationService.prototype.onFocusOut = function (args) {
        if (dom_queries_1.isVisible(args.target)) {
            this.mode = 0 /* Standby */;
        }
        else {
            // Focused target is no longer visible,
            // reset to cursor mode and recapture focus.
            this.mode = 1 /* Cursor */;
        }
        this.deactivateElements();
        this.cursor.announce();
    };
    NavigationService.prototype.onWindowBlur = function () {
        this.mode = 0 /* Standby */;
        this.deactivateElements();
        this.cursor.announce();
    };
    NavigationService.prototype.onKeydown = function (args) {
        if (this.mode === 1 /* Cursor */) {
            this.onCursorKeydown(args);
        }
        else if (this.mode === 2 /* Content */) {
            this.onContentKeydown(args);
        }
    };
    NavigationService.prototype.onTabout = function () {
        // Tabbed out of the last focusable content element
        // reset to cursor mode and recapture focus.
        if (this.cursor.cell.focusGroup.isNavigable()) {
            // Unless the cell has a single focusable element,
            // otherwise we'd return to Content mode and enter an endless loop
            return;
        }
        this.leaveCell();
        this.cursor.reset();
    };
    NavigationService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    NavigationService.ctorParameters = function () { return [
        { type: core_1.NgZone },
        { type: dom_events_service_1.DomEventsService },
        { type: pager_context_service_1.PagerContextService },
        { type: scroll_request_service_1.ScrollRequestService },
        { type: groups_service_1.GroupsService },
        { type: details_service_1.DetailsService },
        { type: focus_root_1.FocusRoot },
        { type: edit_service_1.EditService },
        { type: core_1.ChangeDetectorRef },
        { type: kendo_angular_l10n_1.LocalizationService },
        { type: focusable_directive_1.FocusableDirective, decorators: [{ type: core_1.Optional }] }
    ]; };
    return NavigationService;
}());
exports.NavigationService = NavigationService;
