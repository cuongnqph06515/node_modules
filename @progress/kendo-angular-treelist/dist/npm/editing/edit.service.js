/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var utils_1 = require("../utils");
var cell_close_event_1 = require("./cell-close-event");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var identity = function (item) { return item; };
var ɵ0 = identity;
exports.ɵ0 = ɵ0;
/**
 * @hidden
 */
var EditService = /** @class */ (function () {
    function EditService(ngZone) {
        var _this = this;
        this.ngZone = ngZone;
        this.changes = new core_1.EventEmitter();
        this.idGetter = identity;
        this.edited = new Map(); // edited rows by id or referense
        this.keepEditCell = false;
        this.closingCell = false;
        this.changedSource = new rxjs_1.Subject();
        this.changed = this.changedSource.asObservable().pipe(operators_1.switchMap(function () { return _this.ngZone.onStable.asObservable().pipe(operators_1.take(1)); }));
    }
    Object.defineProperty(EditService.prototype, "newItemGroup", {
        get: function () {
            return this.newItem ? this.newItem.group : null;
        },
        enumerable: true,
        configurable: true
    });
    EditService.prototype.editRow = function (item, group) {
        if (group === void 0) { group = undefined; }
        this.edited.set(this.idGetter(item), {
            group: group,
            item: item
        });
        this.onChanged();
    };
    EditService.prototype.addRow = function (parent, group) {
        this.newItem = { parent: parent, group: group, dataItem: group ? group.value : null };
        this.onChanged();
    };
    EditService.prototype.editCell = function (item, column, group) {
        if (!utils_1.isColumnEditable(column, group)) {
            return;
        }
        this.preventCellClose();
        if (!this.closeCell()) {
            this.editRow(item, group);
            this.column = column;
            this.onChanged();
        }
    };
    EditService.prototype.isEditing = function () {
        return this.edited.size > 0;
    };
    EditService.prototype.isEdited = function (item) {
        return this.edited.has(this.idGetter(item));
    };
    EditService.prototype.isEditingCell = function () {
        return utils_1.isPresent(this.column);
    };
    EditService.prototype.isEditingColumn = function (column) {
        return this.column === column;
    };
    EditService.prototype.isEditedColumn = function (column) {
        return !this.column || this.column === column;
    };
    EditService.prototype.hasNew = function (parent) {
        return Boolean(this.newItem && ((!this.newItem.parent && !parent) ||
            this.idGetter(this.newItem.parent) === this.idGetter(parent)));
    };
    Object.defineProperty(EditService.prototype, "newDataItem", {
        get: function () {
            if (this.newItem) {
                return this.newItem.group.value;
            }
        },
        enumerable: true,
        configurable: true
    });
    EditService.prototype.close = function (item, isNew) {
        if (isNew) { // parent
            this.newItem = undefined;
            return;
        }
        this.edited.delete(this.idGetter(item));
        delete this.column;
        this.onChanged();
    };
    EditService.prototype.closeCell = function (originalEvent) {
        var _this = this;
        if (this.column && !this.closingCell) {
            return this.ngZone.run(function () {
                var _a = _this.first, item = _a.item, group = _a.group;
                var args = new cell_close_event_1.CellCloseEvent({
                    column: _this.column,
                    formGroup: group,
                    originalEvent: originalEvent,
                    dataItem: item
                });
                _this.closingCell = true;
                _this.changes.emit(args);
                _this.closingCell = false;
                if (!args.isDefaultPrevented()) {
                    _this.cancelCell();
                }
                return args.isDefaultPrevented();
            });
        }
    };
    EditService.prototype.cancelCell = function () {
        if (this.column) {
            this.edited.clear();
            this.column = null;
            this.onChanged();
        }
    };
    EditService.prototype.shouldCloseCell = function () {
        return this.column && !this.keepEditCell;
    };
    EditService.prototype.preventCellClose = function () {
        var _this = this;
        this.ngZone.runOutsideAngular(function () {
            window.clearTimeout(_this.keepCellTimeout);
            _this.keepEditCell = true;
            _this.keepCellTimeout = window.setTimeout(function () {
                _this.keepEditCell = false;
            }, 0); // tslint:disable-line:align
        });
    };
    EditService.prototype.context = function (item) {
        return this.edited.get(this.idGetter(item));
    };
    EditService.prototype.beginEdit = function (item) {
        this.changes.emit({ action: 'edit', dataItem: item });
    };
    EditService.prototype.beginAdd = function (parent) {
        this.changes.emit({ action: 'add', parent: parent });
    };
    EditService.prototype.endEdit = function (dataItem, isNew) {
        var formGroup = isNew ? this.newItemGroup : this.context(dataItem).group;
        this.changes.emit({ action: 'cancel', dataItem: dataItem, formGroup: formGroup, isNew: isNew });
    };
    EditService.prototype.save = function (item, isNew) {
        var args = { action: 'save', isNew: isNew };
        if (isNew) {
            args.parent = this.newItem.parent;
            args.formGroup = this.newItem.group;
            args.dataItem = item;
        }
        else {
            args.dataItem = item;
            args.formGroup = this.context(item).group;
        }
        this.changes.emit(args);
    };
    EditService.prototype.remove = function (dataItem, parent) {
        this.changes.emit({ action: 'remove', dataItem: dataItem, parent: parent });
    };
    EditService.prototype.onChanged = function () {
        var _this = this;
        this.ngZone.runOutsideAngular(function () {
            _this.changedSource.next();
        });
    };
    Object.defineProperty(EditService.prototype, "first", {
        get: function () {
            if (this.isEditing) {
                return this.edited.values().next().value;
            }
        },
        enumerable: true,
        configurable: true
    });
    EditService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    EditService.ctorParameters = function () { return [
        { type: core_1.NgZone }
    ]; };
    return EditService;
}());
exports.EditService = EditService;
