/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, HostBinding, Input, ElementRef, NgZone, Renderer2, Output, EventEmitter } from '@angular/core';
import { hasClasses } from '../rendering/common/dom-queries';
/**
 * @hidden
 */
var ColumnListComponent = /** @class */ (function () {
    function ColumnListComponent(element, ngZone, renderer) {
        this.element = element;
        this.ngZone = ngZone;
        this.renderer = renderer;
        this.reset = new EventEmitter();
        this.apply = new EventEmitter();
        this.columnChange = new EventEmitter();
        this.autoSync = true;
        this.allowHideAll = false;
        this.actionsClass = 'k-action-buttons';
        this.unlockedCount = 0;
    }
    Object.defineProperty(ColumnListComponent.prototype, "className", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnListComponent.prototype, "columns", {
        get: function () {
            return this._columns;
        },
        set: function (value) {
            this._columns = value.filter(function (column) { return column.includeInChooser !== false; });
            this.allColumns = value;
            this.updateColumnState();
        },
        enumerable: true,
        configurable: true
    });
    ColumnListComponent.prototype.isDisabled = function (column) {
        return !(this.allowHideAll || this.hasFiltered || column.hidden || this.columns.find(function (current) { return current !== column && !current.hidden; })) ||
            (this.hasVisibleLocked && !this.hasUnlockedFiltered && this.unlockedCount === 1 && !column.locked && !column.hidden);
    };
    ColumnListComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.element) {
            return;
        }
        this.ngZone.runOutsideAngular(function () {
            _this.domSubscriptions = _this.renderer.listen(_this.element.nativeElement, 'click', function (e) {
                if (hasClasses(e.target, 'k-checkbox')) {
                    if (_this.autoSync) {
                        var index = parseInt(e.target.getAttribute('data-index'), 10);
                        var column_1 = _this.columns[index];
                        var hidden_1 = !e.target.checked;
                        if (Boolean(column_1.hidden) !== hidden_1) {
                            _this.ngZone.run(function () {
                                column_1.hidden = hidden_1;
                                _this.columnChange.emit([column_1]);
                            });
                        }
                    }
                    else {
                        _this.updateDisabled();
                    }
                }
            });
        });
    };
    ColumnListComponent.prototype.ngOnDestroy = function () {
        if (this.domSubscriptions) {
            this.domSubscriptions();
        }
    };
    ColumnListComponent.prototype.cancelChanges = function () {
        var _this = this;
        this.forEachCheckBox(function (element, index) {
            element.checked = !_this.columns[index].hidden;
        });
        this.updateDisabled();
        this.reset.emit();
    };
    ColumnListComponent.prototype.applyChanges = function () {
        var _this = this;
        var changed = [];
        this.forEachCheckBox(function (element, index) {
            var column = _this.columns[index];
            var hidden = !element.checked;
            if (Boolean(column.hidden) !== hidden) {
                column.hidden = hidden;
                changed.push(column);
            }
        });
        this.updateDisabled();
        this.apply.emit(changed);
    };
    ColumnListComponent.prototype.forEachCheckBox = function (callback) {
        var checkboxes = this.element.nativeElement.getElementsByClassName('k-checkbox');
        var length = checkboxes.length;
        for (var idx = 0; idx < length; idx++) {
            callback(checkboxes[idx], idx);
        }
    };
    ColumnListComponent.prototype.updateDisabled = function () {
        if (this.allowHideAll && !this.hasLocked) {
            return;
        }
        var checkedItems = [];
        this.forEachCheckBox(function (checkbox, index) {
            if (checkbox.checked) {
                checkedItems.push({ checkbox: checkbox, index: index });
            }
            checkbox.disabled = false;
        });
        if (!this.allowHideAll && checkedItems.length === 1 && !this.hasFiltered) {
            checkedItems[0].checkbox.disabled = true;
        }
        else if (this.hasLocked && !this.hasUnlockedFiltered) {
            var columns_1 = this.columns;
            var checkedUnlocked = checkedItems.filter(function (item) { return !columns_1[item.index].locked; });
            if (checkedUnlocked.length === 1) {
                checkedUnlocked[0].checkbox.disabled = true;
            }
        }
    };
    ColumnListComponent.prototype.updateColumnState = function () {
        this.hasLocked = this.allColumns.filter(function (column) { return column.locked && (!column.hidden || column.includeInChooser !== false); }).length > 0;
        this.hasVisibleLocked = this.allColumns.filter(function (column) { return column.locked && !column.hidden; }).length > 0;
        this.unlockedCount = this.columns.filter(function (column) { return !column.locked && !column.hidden; }).length;
        var filteredColumns = this.allColumns.filter(function (column) { return column.includeInChooser === false && !column.hidden; });
        if (filteredColumns.length) {
            this.hasFiltered = filteredColumns.length > 0;
            this.hasUnlockedFiltered = filteredColumns.filter(function (column) { return !column.locked; }).length > 0;
        }
        else {
            this.hasFiltered = false;
            this.hasUnlockedFiltered = false;
        }
    };
    ColumnListComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-treelist-columnlist',
                    template: "\n        <div class=\"k-column-list\">\n            <label *ngFor=\"let column of columns; let index = index;\" class='k-column-list-item'>\n                <input class=\"k-checkbox\" type=\"checkbox\" [attr.data-index]=\"index\" [checked]=\"!column.hidden\" [disabled]=\"isDisabled(column)\" /><span class=\"k-checkbox-label\">{{ column.displayTitle }}</span>\n            </label>\n        </div>\n        <div [ngClass]=\"actionsClass\" *ngIf=\"!autoSync\">\n            <button type=\"button\" class=\"k-button\" (click)=\"cancelChanges()\">{{ resetText }}</button>\n            <button type=\"button\" class=\"k-button k-primary\" (click)=\"applyChanges()\">{{ applyText }}</button>\n        </div>\n    "
                },] },
    ];
    /** @nocollapse */
    ColumnListComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgZone },
        { type: Renderer2 }
    ]; };
    ColumnListComponent.propDecorators = {
        className: [{ type: HostBinding, args: ["class.k-column-list-wrapper",] }],
        reset: [{ type: Output }],
        apply: [{ type: Output }],
        columnChange: [{ type: Output }],
        columns: [{ type: Input }],
        autoSync: [{ type: Input }],
        allowHideAll: [{ type: Input }],
        applyText: [{ type: Input }],
        resetText: [{ type: Input }],
        actionsClass: [{ type: Input }]
    };
    return ColumnListComponent;
}());
export { ColumnListComponent };
