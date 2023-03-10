/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var focus_group_1 = require("./focus-group");
var focus_root_1 = require("./focus-root");
var navigation_service_1 = require("./navigation.service");
var column_info_service_1 = require("../common/column-info.service");
var id_service_1 = require("../common/id.service");
var cell_context_1 = require("../rendering/common/cell-context");
var id = 0;
function nextId() {
    return id++;
}
/**
 * @hidden
 */
var LogicalCellDirective = /** @class */ (function () {
    function LogicalCellDirective(focusGroup, element, columnInfoService, idService, navigationService, renderer, zone, cellContext) {
        this.focusGroup = focusGroup;
        this.element = element;
        this.columnInfoService = columnInfoService;
        this.idService = idService;
        this.navigationService = navigationService;
        this.renderer = renderer;
        this.zone = zone;
        this.cellContext = cellContext;
        this.logicalSlaveCell = false;
        this.colSpan = 1;
        this.rowSpan = 1;
        this.dataRowIndex = -1;
        this.detailExpandCell = false;
        this.uid = nextId();
    }
    Object.defineProperty(LogicalCellDirective.prototype, "id", {
        get: function () {
            if (!this.logicalSlaveCell && this.columnInfoService.isLocked) {
                return this.idService.cellId(this.logicalRowIndex, this.logicalColIndex);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LogicalCellDirective.prototype, "ariaColIndex", {
        get: function () {
            if (this.logicalSlaveCell || this.logicalColIndex === -1) {
                return undefined;
            }
            return this.logicalColIndex + 1;
        },
        enumerable: true,
        configurable: true
    });
    LogicalCellDirective.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.navigationService.enabled) {
            return;
        }
        this.navigationChange = this.navigationService.changes.subscribe(function (e) { return _this.onNavigationChange(e); });
    };
    LogicalCellDirective.prototype.ngDoCheck = function () {
        if (!this.navigationService.enabled || this.logicalColIndex === -1) {
            return;
        }
        if (this.cellContext) {
            this.cellContext.focusGroup = this.focusGroup;
        }
        this.registerNoChanges();
    };
    LogicalCellDirective.prototype.ngOnChanges = function (changes) {
        if (!this.navigationService.enabled) {
            return;
        }
        var keys = Object.keys(changes);
        if ((keys.length === 1 && keys[0] === 'groupItem') || this.logicalColIndex === -1) {
            // Ignore groupItem changes as the reference is not stable
            return;
        }
        var indexChange = changes.logicalColIndex;
        var rowIndexChange = changes.logicalRowIndex;
        var index = indexChange && !indexChange.isFirstChange() ? indexChange.previousValue : this.logicalColIndex;
        var rowIndex = rowIndexChange && !rowIndexChange.isFirstChange() ? rowIndexChange.previousValue : this.logicalRowIndex;
        this.navigationService.unregisterCell(index, rowIndex, this);
        this.registerChanges();
        this.updateElement();
    };
    LogicalCellDirective.prototype.ngOnDestroy = function () {
        if (this.navigationChange) {
            this.navigationChange.unsubscribe();
        }
        this.navigationService.unregisterCell(this.logicalColIndex, this.logicalRowIndex, this);
    };
    LogicalCellDirective.prototype.onNavigationChange = function (e) {
        var active = this.logicalColIndex === e.colIndex && this.logicalRowIndex === e.rowIndex;
        var wasActive = this.logicalColIndex === e.prevColIndex && this.logicalRowIndex === e.prevRowIndex;
        if (active || wasActive) {
            this.updateElement();
        }
    };
    LogicalCellDirective.prototype.updateElement = function () {
        var _this = this;
        var el = this.element.nativeElement;
        this.renderer.setAttribute(el, 'tabIndex', this.isFocusable() && !this.logicalSlaveCell ? '0' : '-1');
        if (this.isFocused()) {
            if (this.focusGroup.isNavigable()) {
                this.focusGroup.focus();
            }
            else {
                if (!this.logicalSlaveCell && this.navigationService.autoFocusCell(this.logicalColIndex, this.logicalColIndex + this.colSpan - 1)) {
                    this.microtask(function () {
                        return _this.isFocused() && el.focus();
                    });
                }
                this.renderer.addClass(el, 'k-state-focused');
            }
        }
        else {
            this.renderer.removeClass(el, 'k-state-focused');
        }
    };
    LogicalCellDirective.prototype.microtask = function (callback) {
        this.zone.runOutsideAngular(function () {
            return Promise.resolve(null).then(callback);
        });
    };
    LogicalCellDirective.prototype.registerChanges = function () {
        if (!this.logicalSlaveCell) {
            this.navigationService.registerCell(this);
        }
    };
    LogicalCellDirective.prototype.registerNoChanges = function () {
        if (!this.logicalSlaveCell) {
            this.navigationService.registerCellOnCurrentRow(this);
        }
    };
    LogicalCellDirective.prototype.isFocusable = function () {
        return this.navigationService.isCellFocusable(this);
    };
    LogicalCellDirective.prototype.isFocused = function () {
        return this.navigationService.isCellFocused(this);
    };
    LogicalCellDirective.decorators = [
        { type: core_1.Directive, args: [{
                    providers: [{
                            provide: focus_group_1.FocusGroup,
                            deps: [focus_root_1.FocusRoot],
                            useClass: focus_group_1.FocusGroup
                        }],
                    selector: '[kendoGridLogicalCell]'
                },] },
    ];
    /** @nocollapse */
    LogicalCellDirective.ctorParameters = function () { return [
        { type: focus_group_1.FocusGroup },
        { type: core_1.ElementRef },
        { type: column_info_service_1.ColumnInfoService },
        { type: id_service_1.IdService },
        { type: navigation_service_1.NavigationService },
        { type: core_1.Renderer2 },
        { type: core_1.NgZone },
        { type: undefined, decorators: [{ type: core_1.Optional }, { type: core_1.Inject, args: [cell_context_1.CELL_CONTEXT,] }] }
    ]; };
    LogicalCellDirective.propDecorators = {
        logicalColIndex: [{ type: core_1.Input }],
        logicalRowIndex: [{ type: core_1.Input }],
        logicalSlaveCell: [{ type: core_1.Input }],
        colIndex: [{ type: core_1.Input }],
        colSpan: [{ type: core_1.Input }],
        rowSpan: [{ type: core_1.Input }],
        groupItem: [{ type: core_1.Input }],
        dataRowIndex: [{ type: core_1.Input }],
        dataItem: [{ type: core_1.Input }],
        detailExpandCell: [{ type: core_1.Input }],
        id: [{ type: core_1.HostBinding, args: ['attr.id',] }],
        ariaColIndex: [{ type: core_1.HostBinding, args: ['attr.aria-colindex',] }]
    };
    return LogicalCellDirective;
}());
exports.LogicalCellDirective = LogicalCellDirective;
