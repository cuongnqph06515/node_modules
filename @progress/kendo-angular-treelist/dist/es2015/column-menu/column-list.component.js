/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, HostBinding, Input, ElementRef, NgZone, Renderer2, Output, EventEmitter } from '@angular/core';
import { hasClasses } from '../rendering/common/dom-queries';
/**
 * @hidden
 */
export class ColumnListComponent {
    constructor(element, ngZone, renderer) {
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
    get className() {
        return true;
    }
    set columns(value) {
        this._columns = value.filter(column => column.includeInChooser !== false);
        this.allColumns = value;
        this.updateColumnState();
    }
    get columns() {
        return this._columns;
    }
    isDisabled(column) {
        return !(this.allowHideAll || this.hasFiltered || column.hidden || this.columns.find(current => current !== column && !current.hidden)) ||
            (this.hasVisibleLocked && !this.hasUnlockedFiltered && this.unlockedCount === 1 && !column.locked && !column.hidden);
    }
    ngOnInit() {
        if (!this.element) {
            return;
        }
        this.ngZone.runOutsideAngular(() => {
            this.domSubscriptions = this.renderer.listen(this.element.nativeElement, 'click', (e) => {
                if (hasClasses(e.target, 'k-checkbox')) {
                    if (this.autoSync) {
                        const index = parseInt(e.target.getAttribute('data-index'), 10);
                        const column = this.columns[index];
                        const hidden = !e.target.checked;
                        if (Boolean(column.hidden) !== hidden) {
                            this.ngZone.run(() => {
                                column.hidden = hidden;
                                this.columnChange.emit([column]);
                            });
                        }
                    }
                    else {
                        this.updateDisabled();
                    }
                }
            });
        });
    }
    ngOnDestroy() {
        if (this.domSubscriptions) {
            this.domSubscriptions();
        }
    }
    cancelChanges() {
        this.forEachCheckBox((element, index) => {
            element.checked = !this.columns[index].hidden;
        });
        this.updateDisabled();
        this.reset.emit();
    }
    applyChanges() {
        const changed = [];
        this.forEachCheckBox((element, index) => {
            const column = this.columns[index];
            const hidden = !element.checked;
            if (Boolean(column.hidden) !== hidden) {
                column.hidden = hidden;
                changed.push(column);
            }
        });
        this.updateDisabled();
        this.apply.emit(changed);
    }
    forEachCheckBox(callback) {
        const checkboxes = this.element.nativeElement.getElementsByClassName('k-checkbox');
        const length = checkboxes.length;
        for (let idx = 0; idx < length; idx++) {
            callback(checkboxes[idx], idx);
        }
    }
    updateDisabled() {
        if (this.allowHideAll && !this.hasLocked) {
            return;
        }
        const checkedItems = [];
        this.forEachCheckBox((checkbox, index) => {
            if (checkbox.checked) {
                checkedItems.push({ checkbox, index });
            }
            checkbox.disabled = false;
        });
        if (!this.allowHideAll && checkedItems.length === 1 && !this.hasFiltered) {
            checkedItems[0].checkbox.disabled = true;
        }
        else if (this.hasLocked && !this.hasUnlockedFiltered) {
            const columns = this.columns;
            const checkedUnlocked = checkedItems.filter(item => !columns[item.index].locked);
            if (checkedUnlocked.length === 1) {
                checkedUnlocked[0].checkbox.disabled = true;
            }
        }
    }
    updateColumnState() {
        this.hasLocked = this.allColumns.filter(column => column.locked && (!column.hidden || column.includeInChooser !== false)).length > 0;
        this.hasVisibleLocked = this.allColumns.filter(column => column.locked && !column.hidden).length > 0;
        this.unlockedCount = this.columns.filter(column => !column.locked && !column.hidden).length;
        const filteredColumns = this.allColumns.filter(column => column.includeInChooser === false && !column.hidden);
        if (filteredColumns.length) {
            this.hasFiltered = filteredColumns.length > 0;
            this.hasUnlockedFiltered = filteredColumns.filter(column => !column.locked).length > 0;
        }
        else {
            this.hasFiltered = false;
            this.hasUnlockedFiltered = false;
        }
    }
}
ColumnListComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-treelist-columnlist',
                template: `
        <div class="k-column-list">
            <label *ngFor="let column of columns; let index = index;" class='k-column-list-item'>
                <input class="k-checkbox" type="checkbox" [attr.data-index]="index" [checked]="!column.hidden" [disabled]="isDisabled(column)" /><span class="k-checkbox-label">{{ column.displayTitle }}</span>
            </label>
        </div>
        <div [ngClass]="actionsClass" *ngIf="!autoSync">
            <button type="button" class="k-button" (click)="cancelChanges()">{{ resetText }}</button>
            <button type="button" class="k-button k-primary" (click)="applyChanges()">{{ applyText }}</button>
        </div>
    `
            },] },
];
/** @nocollapse */
ColumnListComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone },
    { type: Renderer2 }
];
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
