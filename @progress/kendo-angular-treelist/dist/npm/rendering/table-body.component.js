/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var change_notification_service_1 = require("../data/change-notification.service");
var utils_1 = require("../utils");
var no_records_template_directive_1 = require("./no-records-template.directive");
var edit_service_1 = require("../editing/edit.service");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var column_common_1 = require("../columns/column-common");
var dom_queries_1 = require("./common/dom-queries");
var dom_events_service_1 = require("../common/dom-events.service");
var column_info_service_1 = require("../common/column-info.service");
var filterable_1 = require("../filtering/filterable");
var navigation_service_1 = require("../navigation/navigation.service");
var kendo_angular_common_1 = require("@progress/kendo-angular-common");
var default_track_by_1 = require("../common/default-track-by");
var child_expand_state_service_1 = require("../expand-state/child-expand-state.service");
var constants_1 = require("./constants");
var columnCellIndex = function (cell, cells) {
    for (var idx = 0; idx < cells.length; idx++) {
        if (cells[idx] === cell) {
            return idx;
        }
    }
};
var ɵ0 = columnCellIndex;
exports.ɵ0 = ɵ0;
/**
 * @hidden
 */
var TableBodyComponent = /** @class */ (function () {
    function TableBodyComponent(changeNotification, editService, localization, ngZone, renderer, element, domEvents, columnInfoService, navigationService, childState) {
        var _this = this;
        this.changeNotification = changeNotification;
        this.editService = editService;
        this.localization = localization;
        this.ngZone = ngZone;
        this.renderer = renderer;
        this.element = element;
        this.domEvents = domEvents;
        this.columnInfoService = columnInfoService;
        this.navigationService = navigationService;
        this.childState = childState;
        this.columns = [];
        this.skip = 0;
        this.noRecordsText = this.localization.get('noRecords');
        this.isLocked = false;
        this.lockedColumnsCount = 0;
        this.totalColumnsCount = 0;
        this.trackBy = default_track_by_1.defaultTrackBy;
        this.rowClass = function () { return null; };
        this.cellKeydownSubscription = this.navigationService.cellKeydown.subscribe(function (args) { return _this.cellKeydownHandler(args); });
        this.trackByWrapper = this.trackByWrapper.bind(this);
        this.trackByColumns = this.trackByColumns.bind(this);
    }
    Object.defineProperty(TableBodyComponent.prototype, "newDataItem", {
        get: function () {
            return this.editService.newDataItem;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableBodyComponent.prototype, "unlockedColumnsCount", {
        // Number of unlocked columns in the next table, if any
        get: function () {
            return this.totalColumnsCount - this.lockedColumnsCount - (this.allColumns || this.columns).length;
        },
        enumerable: true,
        configurable: true
    });
    TableBodyComponent.prototype.isOdd = function (item) {
        return item.index % 2 !== 0;
    };
    TableBodyComponent.prototype.trackByWrapper = function (index, item) {
        if (item.type === 'data') {
            item.isEditing = this.editService.isEdited(item.data);
        }
        return this.trackBy(index, item);
    };
    TableBodyComponent.prototype.trackByColumns = function (index, item) {
        return this.virtualColumns ? index : item;
    };
    TableBodyComponent.prototype.ngOnChanges = function (changes) {
        if (utils_1.isChanged("columns", changes, false)) {
            this.changeNotification.notify();
        }
    };
    TableBodyComponent.prototype.addRowLogicalIndex = function () {
        return this.columnInfoService.totalLevels + 1;
    };
    TableBodyComponent.prototype.logicalColIndex = function (column) {
        if (!utils_1.isPresent(column.leafIndex)) {
            return -1;
        }
        return column.leafIndex;
    };
    TableBodyComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.ngZone.runOutsideAngular(function () {
            var clickHandler = _this.clickHandler.bind(_this);
            var mousedownSubscription = _this.renderer.listen(_this.element.nativeElement, 'mousedown', clickHandler);
            var clickSubscription = _this.renderer.listen(_this.element.nativeElement, 'click', clickHandler);
            var contextmenuSubscription = _this.renderer.listen(_this.element.nativeElement, 'contextmenu', clickHandler);
            _this.clickSubscription = function () {
                mousedownSubscription();
                clickSubscription();
                contextmenuSubscription();
            };
        });
        var originalNoRecordText = this.localization.get('noRecords');
        this.localization.changes.subscribe(function () {
            if (_this.noRecordsText === originalNoRecordText) {
                _this.noRecordsText = _this.localization.get('noRecords');
                originalNoRecordText = _this.noRecordsText;
            }
        });
    };
    TableBodyComponent.prototype.ngDoCheck = function () {
        this.headerOffset = this.columnInfoService.totalLevels + (filterable_1.hasFilterRow(this.filterable) ? 1 : 0);
    };
    TableBodyComponent.prototype.ngOnDestroy = function () {
        if (this.clickSubscription) {
            this.clickSubscription();
        }
        this.cellKeydownSubscription.unsubscribe();
        clearTimeout(this.clickTimeout);
    };
    TableBodyComponent.prototype.isEditingCell = function (item, column) {
        return Boolean(item.editContext && this.editService.isEditingColumn(column));
    };
    TableBodyComponent.prototype.isEditingRow = function (item) {
        return Boolean(item.editContext);
    };
    Object.defineProperty(TableBodyComponent.prototype, "columnsContainer", {
        get: function () {
            return this.columnInfoService.columnsContainer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableBodyComponent.prototype, "hasFooter", {
        get: function () {
            return this.columnsContainer.hasFooter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableBodyComponent.prototype, "columnsSpan", {
        get: function () {
            return column_common_1.columnsSpan(this.columns);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableBodyComponent.prototype, "allColumnsSpan", {
        get: function () {
            return column_common_1.columnsSpan(this.allColumns || this.columns);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableBodyComponent.prototype, "colSpan", {
        get: function () {
            return this.columnsSpan;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableBodyComponent.prototype, "footerColumns", {
        get: function () {
            return this.isLocked ? this.columnsContainer.lockedColumnsToRender : this.columnsContainer.nonLockedColumnsToRender;
        },
        enumerable: true,
        configurable: true
    });
    TableBodyComponent.prototype.logicalRowIndex = function (rowIndex) {
        return rowIndex + this.headerOffset;
    };
    TableBodyComponent.prototype.clickHandler = function (eventArg) {
        var _this = this;
        var element = this.element.nativeElement;
        var target = eventArg.target;
        var cell, row, body, treelistElement;
        var currentTarget = target;
        do {
            cell = dom_queries_1.closest(currentTarget, dom_queries_1.matchesNodeName('td'));
            row = dom_queries_1.closest(cell, dom_queries_1.matchesNodeName('tr'));
            body = dom_queries_1.closest(row, dom_queries_1.matchesNodeName('tbody'));
            currentTarget = body;
            treelistElement = dom_queries_1.closestInScope(currentTarget, dom_queries_1.matchesClasses('k-grid'), element);
        } while (body && body !== element && !treelistElement);
        if (cell && !dom_queries_1.hasClasses(cell, constants_1.NON_DATA_CELL_CLASSES) &&
            !dom_queries_1.hasClasses(row, constants_1.NON_DATA_ROW_CLASSES) &&
            body === element && !treelistElement) {
            if (this.expandClick(eventArg, row)) {
                return;
            }
            this.editService.preventCellClose();
            var focusable = target !== cell && dom_queries_1.isFocusableWithTabKey(target, false);
            if (!focusable && !dom_queries_1.matchesNodeName('label')(target) && !dom_queries_1.hasClasses(target, constants_1.IGNORE_TARGET_CLASSSES) &&
                !dom_queries_1.closestInScope(target, dom_queries_1.matchesClasses(constants_1.IGNORE_CONTAINER_CLASSES), cell)) {
                var args_1 = this.cellClickArgs(cell, row, eventArg);
                if (!args_1) {
                    return;
                }
                if (eventArg.type === 'mousedown') {
                    this.domEvents.cellMousedown.emit(args_1);
                }
                else {
                    if (args_1.isEditedColumn || !this.editService.closeCell(eventArg)) {
                        if (eventArg.type === 'click') {
                            this.clickTimeout = setTimeout(function () {
                                _this.emitCellClick(args_1);
                            }, 0);
                        }
                        else {
                            this.emitCellClick(args_1);
                        }
                    }
                }
            }
        }
    };
    TableBodyComponent.prototype.emitCellClick = function (args) {
        this.domEvents.cellClick.emit(args);
    };
    TableBodyComponent.prototype.cellKeydownHandler = function (args) {
        if (args.keyCode === kendo_angular_common_1.Keys.Enter) {
            this.clickHandler(args);
        }
    };
    TableBodyComponent.prototype.cellClickArgs = function (cell, row, eventArg) {
        var index = columnCellIndex(cell, row.cells);
        var column = this.columns.toArray()[index];
        var columnIndex = this.lockedColumnsCount + index;
        var viewItem = this.rowItem(row);
        if (viewItem.type !== 'data') {
            return;
        }
        var type = eventArg.type === 'keydown' ? 'click' : eventArg.type;
        return {
            column: column,
            columnIndex: columnIndex,
            dataItem: viewItem.data,
            index: viewItem.index,
            isEditedColumn: (viewItem.editContext && this.editService.isEditingColumn(column)),
            isEdited: viewItem.isNew || (viewItem.editContext && this.editService.isEditedColumn(column)),
            originalEvent: eventArg,
            type: type
        };
    };
    TableBodyComponent.prototype.expandClick = function (eventArg, row) {
        var _this = this;
        if (eventArg.type === 'click' && dom_queries_1.hasClasses(eventArg.target, 'k-i-expand k-i-collapse')) {
            eventArg.preventDefault();
            var viewItem_1 = this.rowItem(row);
            if (viewItem_1.type === 'data') {
                this.ngZone.run(function () {
                    _this.childState.toggleRow(viewItem_1.id, viewItem_1.data); // pass just item. id should be retrieved in service
                });
                return true;
            }
        }
    };
    TableBodyComponent.prototype.rowItem = function (row) {
        var viewIndex = row.getAttribute('data-treelist-view-index');
        viewIndex = viewIndex ? parseInt(viewIndex, 10) : -1;
        var viewItem = this.view.at(viewIndex);
        return viewItem;
    };
    TableBodyComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: '[kendoTreeListTableBody]',
                    template: "\n    <tr *ngIf=\"!view || view.data?.length === 0 || view.data == null\" class=\"k-grid-norecords\">\n        <td [attr.colspan]=\"colSpan\">\n            <ng-container *ngIf=\"noRecordsTemplate?.templateRef\" [ngTemplateOutlet]=\"noRecordsTemplate.templateRef\">\n            </ng-container>\n            <ng-container *ngIf=\"!noRecordsTemplate?.templateRef\">\n                {{noRecordsText}}\n            </ng-container>\n        </td>\n    </tr>\n    <ng-container *ngFor=\"let item of view?.data;let rowIndex = index;trackBy: trackByWrapper;\">\n        <tr *ngIf=\"item.type === 'data'\"\n            kendoTreeListLogicalRow\n                [dataRowIndex]=\"item.index\"\n                [dataItem]=\"item.data\"\n                [logicalRowIndex]=\"item.index\"\n                [logicalSlaveRow]=\"lockedColumnsCount > 0\"\n                [logicalCellsCount]=\"columns.length\"\n                [logicalSlaveCellsCount]=\"unlockedColumnsCount\"\n            [ngClass]=\"rowClass({ dataItem: item.data, index: item.index })\"\n            [class.k-alt]=\"isOdd(item)\"\n            [class.k-grid-edit-row]=\"isEditingRow(item)\"\n            [class.k-grid-add-row]=\"item.isNew\"\n            [attr.data-treelist-view-index]=\"rowIndex\">\n\n            <td kendoTreeListCell\n                    [columnIndex]=\"lockedColumnsCount + columnIndex\"\n                    [column]=\"column\"\n                    [viewItem]=\"item\"\n                    [dataItem]=\"item.data\"\n                    [level]=\"item.level\"\n                    [hasChildren]=\"item.hasChildren\"\n                    [isExpanded]=\"item.expanded\"\n                    [loading]=\"item.loading\"\n                    [isNew]=\"item.isNew\"\n                kendoTreeListLogicalCell\n                    [logicalRowIndex]=\"logicalRowIndex(item.rowIndex)\"\n                    [logicalColIndex]=\"logicalColIndex(column)\"\n                    [dataRowIndex]=\"item.index\"\n                    [colIndex]=\"columnIndex\"\n                    [colSpan]=\"column.colspan\"\n                    role=\"gridcell\" aria-selected=\"false\"\n                [ngClass]=\"column.cssClass\"\n                [class.k-grid-edit-cell]=\"isEditingCell(item, column)\"\n                [ngStyle]=\"column.style\"\n                [attr.colspan]=\"column.colspan\"\n                *ngFor=\"let column of columns; let columnIndex = index; trackBy: trackByColumns;\">\n            </td>\n        </tr>\n        <tr *ngIf=\"item.type === 'footer' && hasFooter\"\n            class=\"k-footer\"\n            [attr.data-treelist-view-index]=\"rowIndex\"\n            kendoTreeListLogicalRow\n                [logicalRowIndex]=\"logicalRowIndex(item.rowIndex)\"\n                [logicalSlaveRow]=\"lockedColumnsCount > 0\"\n                [logicalCellsCount]=\"columns.length\"\n                [logicalSlaveCellsCount]=\"unlockedColumnsCount\">\n\n            <td kendoTreeListLogicalCell\n                [logicalRowIndex]=\"logicalRowIndex(item.rowIndex)\"\n                [logicalColIndex]=\"logicalColIndex(column)\"\n                [ngClass]=\"column.footerClass\"\n                [ngStyle]=\"column.footerStyle\"\n                *ngFor=\"let column of footerColumns; let columnIndex = index; trackBy: trackByColumns;\">\n                <ng-container *ngIf=\"column.expandable\">\n                    <span class=\"k-icon k-i-none\" *ngFor=\"let item of item.level | levelItems\"></span>\n                </ng-container>\n                <ng-container [ngTemplateOutlet]=\"column.footerTemplateRef\"\n                    [ngTemplateOutletContext]=\"{\n                        items: item.items,\n                        field: column.field,\n                        column: column,\n                        aggregates: item.aggregates,\n                        $implicit: item.aggregates\n                    }\">\n                </ng-container>\n           </td>\n        </tr>\n    </ng-container>\n    "
                },] },
    ];
    /** @nocollapse */
    TableBodyComponent.ctorParameters = function () { return [
        { type: change_notification_service_1.ChangeNotificationService },
        { type: edit_service_1.EditService },
        { type: kendo_angular_l10n_1.LocalizationService },
        { type: core_1.NgZone },
        { type: core_1.Renderer2 },
        { type: core_1.ElementRef },
        { type: dom_events_service_1.DomEventsService },
        { type: column_info_service_1.ColumnInfoService },
        { type: navigation_service_1.NavigationService },
        { type: child_expand_state_service_1.ChildExpandStateService }
    ]; };
    TableBodyComponent.propDecorators = {
        columns: [{ type: core_1.Input }],
        allColumns: [{ type: core_1.Input }],
        noRecordsTemplate: [{ type: core_1.Input }],
        view: [{ type: core_1.Input }],
        skip: [{ type: core_1.Input }],
        filterable: [{ type: core_1.Input }],
        noRecordsText: [{ type: core_1.Input }],
        isLocked: [{ type: core_1.Input }],
        lockedColumnsCount: [{ type: core_1.Input }],
        totalColumnsCount: [{ type: core_1.Input }],
        virtualColumns: [{ type: core_1.Input }],
        trackBy: [{ type: core_1.Input }],
        rowClass: [{ type: core_1.Input }]
    };
    return TableBodyComponent;
}());
exports.TableBodyComponent = TableBodyComponent;
