/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input, NgZone, Renderer2, ElementRef } from '@angular/core';
import { ChangeNotificationService } from '../data/change-notification.service';
import { isChanged, isPresent } from '../utils';
import { NoRecordsTemplateDirective } from './no-records-template.directive';
import { EditService } from '../editing/edit.service';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { columnsSpan } from "../columns/column-common";
import { closest, closestInScope, hasClasses, isFocusableWithTabKey, matchesClasses, matchesNodeName } from './common/dom-queries';
import { DomEventsService } from '../common/dom-events.service';
import { ColumnInfoService } from "../common/column-info.service";
import { hasFilterRow } from '../filtering/filterable';
import { NavigationService } from '../navigation/navigation.service';
import { Keys } from '@progress/kendo-angular-common';
import { defaultTrackBy } from '../common/default-track-by';
import { ChildExpandStateService } from '../expand-state/child-expand-state.service';
import { NON_DATA_CELL_CLASSES, NON_DATA_ROW_CLASSES, IGNORE_TARGET_CLASSSES, IGNORE_CONTAINER_CLASSES } from './constants';
const columnCellIndex = (cell, cells) => {
    for (let idx = 0; idx < cells.length; idx++) {
        if (cells[idx] === cell) {
            return idx;
        }
    }
};
const ɵ0 = columnCellIndex;
/**
 * @hidden
 */
export class TableBodyComponent {
    constructor(changeNotification, editService, localization, ngZone, renderer, element, domEvents, columnInfoService, navigationService, childState) {
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
        this.trackBy = defaultTrackBy;
        this.rowClass = () => null;
        this.cellKeydownSubscription = this.navigationService.cellKeydown.subscribe((args) => this.cellKeydownHandler(args));
        this.trackByWrapper = this.trackByWrapper.bind(this);
        this.trackByColumns = this.trackByColumns.bind(this);
    }
    get newDataItem() {
        return this.editService.newDataItem;
    }
    // Number of unlocked columns in the next table, if any
    get unlockedColumnsCount() {
        return this.totalColumnsCount - this.lockedColumnsCount - (this.allColumns || this.columns).length;
    }
    isOdd(item) {
        return item.index % 2 !== 0;
    }
    trackByWrapper(index, item) {
        if (item.type === 'data') {
            item.isEditing = this.editService.isEdited(item.data);
        }
        return this.trackBy(index, item);
    }
    trackByColumns(index, item) {
        return this.virtualColumns ? index : item;
    }
    ngOnChanges(changes) {
        if (isChanged("columns", changes, false)) {
            this.changeNotification.notify();
        }
    }
    addRowLogicalIndex() {
        return this.columnInfoService.totalLevels + 1;
    }
    logicalColIndex(column) {
        if (!isPresent(column.leafIndex)) {
            return -1;
        }
        return column.leafIndex;
    }
    ngOnInit() {
        this.ngZone.runOutsideAngular(() => {
            const clickHandler = this.clickHandler.bind(this);
            const mousedownSubscription = this.renderer.listen(this.element.nativeElement, 'mousedown', clickHandler);
            const clickSubscription = this.renderer.listen(this.element.nativeElement, 'click', clickHandler);
            const contextmenuSubscription = this.renderer.listen(this.element.nativeElement, 'contextmenu', clickHandler);
            this.clickSubscription = () => {
                mousedownSubscription();
                clickSubscription();
                contextmenuSubscription();
            };
        });
        let originalNoRecordText = this.localization.get('noRecords');
        this.localization.changes.subscribe(() => {
            if (this.noRecordsText === originalNoRecordText) {
                this.noRecordsText = this.localization.get('noRecords');
                originalNoRecordText = this.noRecordsText;
            }
        });
    }
    ngDoCheck() {
        this.headerOffset = this.columnInfoService.totalLevels + (hasFilterRow(this.filterable) ? 1 : 0);
    }
    ngOnDestroy() {
        if (this.clickSubscription) {
            this.clickSubscription();
        }
        this.cellKeydownSubscription.unsubscribe();
        clearTimeout(this.clickTimeout);
    }
    isEditingCell(item, column) {
        return Boolean(item.editContext && this.editService.isEditingColumn(column));
    }
    isEditingRow(item) {
        return Boolean(item.editContext);
    }
    get columnsContainer() {
        return this.columnInfoService.columnsContainer;
    }
    get hasFooter() {
        return this.columnsContainer.hasFooter;
    }
    get columnsSpan() {
        return columnsSpan(this.columns);
    }
    get allColumnsSpan() {
        return columnsSpan(this.allColumns || this.columns);
    }
    get colSpan() {
        return this.columnsSpan;
    }
    get footerColumns() {
        return this.isLocked ? this.columnsContainer.lockedColumnsToRender : this.columnsContainer.nonLockedColumnsToRender;
    }
    logicalRowIndex(rowIndex) {
        return rowIndex + this.headerOffset;
    }
    clickHandler(eventArg) {
        const element = this.element.nativeElement;
        const target = eventArg.target;
        let cell, row, body, treelistElement;
        let currentTarget = target;
        do {
            cell = closest(currentTarget, matchesNodeName('td'));
            row = closest(cell, matchesNodeName('tr'));
            body = closest(row, matchesNodeName('tbody'));
            currentTarget = body;
            treelistElement = closestInScope(currentTarget, matchesClasses('k-grid'), element);
        } while (body && body !== element && !treelistElement);
        if (cell && !hasClasses(cell, NON_DATA_CELL_CLASSES) &&
            !hasClasses(row, NON_DATA_ROW_CLASSES) &&
            body === element && !treelistElement) {
            if (this.expandClick(eventArg, row)) {
                return;
            }
            this.editService.preventCellClose();
            const focusable = target !== cell && isFocusableWithTabKey(target, false);
            if (!focusable && !matchesNodeName('label')(target) && !hasClasses(target, IGNORE_TARGET_CLASSSES) &&
                !closestInScope(target, matchesClasses(IGNORE_CONTAINER_CLASSES), cell)) {
                const args = this.cellClickArgs(cell, row, eventArg);
                if (!args) {
                    return;
                }
                if (eventArg.type === 'mousedown') {
                    this.domEvents.cellMousedown.emit(args);
                }
                else {
                    if (args.isEditedColumn || !this.editService.closeCell(eventArg)) {
                        if (eventArg.type === 'click') {
                            this.clickTimeout = setTimeout(() => {
                                this.emitCellClick(args);
                            }, 0);
                        }
                        else {
                            this.emitCellClick(args);
                        }
                    }
                }
            }
        }
    }
    emitCellClick(args) {
        this.domEvents.cellClick.emit(args);
    }
    cellKeydownHandler(args) {
        if (args.keyCode === Keys.Enter) {
            this.clickHandler(args);
        }
    }
    cellClickArgs(cell, row, eventArg) {
        const index = columnCellIndex(cell, row.cells);
        const column = this.columns.toArray()[index];
        const columnIndex = this.lockedColumnsCount + index;
        const viewItem = this.rowItem(row);
        if (viewItem.type !== 'data') {
            return;
        }
        const type = eventArg.type === 'keydown' ? 'click' : eventArg.type;
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
    }
    expandClick(eventArg, row) {
        if (eventArg.type === 'click' && hasClasses(eventArg.target, 'k-i-expand k-i-collapse')) {
            eventArg.preventDefault();
            const viewItem = this.rowItem(row);
            if (viewItem.type === 'data') {
                this.ngZone.run(() => {
                    this.childState.toggleRow(viewItem.id, viewItem.data); // pass just item. id should be retrieved in service
                });
                return true;
            }
        }
    }
    rowItem(row) {
        let viewIndex = row.getAttribute('data-treelist-view-index');
        viewIndex = viewIndex ? parseInt(viewIndex, 10) : -1;
        const viewItem = this.view.at(viewIndex);
        return viewItem;
    }
}
TableBodyComponent.decorators = [
    { type: Component, args: [{
                selector: '[kendoTreeListTableBody]',
                template: `
    <tr *ngIf="!view || view.data?.length === 0 || view.data == null" class="k-grid-norecords">
        <td [attr.colspan]="colSpan">
            <ng-container *ngIf="noRecordsTemplate?.templateRef" [ngTemplateOutlet]="noRecordsTemplate.templateRef">
            </ng-container>
            <ng-container *ngIf="!noRecordsTemplate?.templateRef">
                {{noRecordsText}}
            </ng-container>
        </td>
    </tr>
    <ng-container *ngFor="let item of view?.data;let rowIndex = index;trackBy: trackByWrapper;">
        <tr *ngIf="item.type === 'data'"
            kendoTreeListLogicalRow
                [dataRowIndex]="item.index"
                [dataItem]="item.data"
                [logicalRowIndex]="item.index"
                [logicalSlaveRow]="lockedColumnsCount > 0"
                [logicalCellsCount]="columns.length"
                [logicalSlaveCellsCount]="unlockedColumnsCount"
            [ngClass]="rowClass({ dataItem: item.data, index: item.index })"
            [class.k-alt]="isOdd(item)"
            [class.k-grid-edit-row]="isEditingRow(item)"
            [class.k-grid-add-row]="item.isNew"
            [attr.data-treelist-view-index]="rowIndex">

            <td kendoTreeListCell
                    [columnIndex]="lockedColumnsCount + columnIndex"
                    [column]="column"
                    [viewItem]="item"
                    [dataItem]="item.data"
                    [level]="item.level"
                    [hasChildren]="item.hasChildren"
                    [isExpanded]="item.expanded"
                    [loading]="item.loading"
                    [isNew]="item.isNew"
                kendoTreeListLogicalCell
                    [logicalRowIndex]="logicalRowIndex(item.rowIndex)"
                    [logicalColIndex]="logicalColIndex(column)"
                    [dataRowIndex]="item.index"
                    [colIndex]="columnIndex"
                    [colSpan]="column.colspan"
                    role="gridcell" aria-selected="false"
                [ngClass]="column.cssClass"
                [class.k-grid-edit-cell]="isEditingCell(item, column)"
                [ngStyle]="column.style"
                [attr.colspan]="column.colspan"
                *ngFor="let column of columns; let columnIndex = index; trackBy: trackByColumns;">
            </td>
        </tr>
        <tr *ngIf="item.type === 'footer' && hasFooter"
            class="k-footer"
            [attr.data-treelist-view-index]="rowIndex"
            kendoTreeListLogicalRow
                [logicalRowIndex]="logicalRowIndex(item.rowIndex)"
                [logicalSlaveRow]="lockedColumnsCount > 0"
                [logicalCellsCount]="columns.length"
                [logicalSlaveCellsCount]="unlockedColumnsCount">

            <td kendoTreeListLogicalCell
                [logicalRowIndex]="logicalRowIndex(item.rowIndex)"
                [logicalColIndex]="logicalColIndex(column)"
                [ngClass]="column.footerClass"
                [ngStyle]="column.footerStyle"
                *ngFor="let column of footerColumns; let columnIndex = index; trackBy: trackByColumns;">
                <ng-container *ngIf="column.expandable">
                    <span class="k-icon k-i-none" *ngFor="let item of item.level | levelItems"></span>
                </ng-container>
                <ng-container [ngTemplateOutlet]="column.footerTemplateRef"
                    [ngTemplateOutletContext]="{
                        items: item.items,
                        field: column.field,
                        column: column,
                        aggregates: item.aggregates,
                        $implicit: item.aggregates
                    }">
                </ng-container>
           </td>
        </tr>
    </ng-container>
    `
            },] },
];
/** @nocollapse */
TableBodyComponent.ctorParameters = () => [
    { type: ChangeNotificationService },
    { type: EditService },
    { type: LocalizationService },
    { type: NgZone },
    { type: Renderer2 },
    { type: ElementRef },
    { type: DomEventsService },
    { type: ColumnInfoService },
    { type: NavigationService },
    { type: ChildExpandStateService }
];
TableBodyComponent.propDecorators = {
    columns: [{ type: Input }],
    allColumns: [{ type: Input }],
    noRecordsTemplate: [{ type: Input }],
    view: [{ type: Input }],
    skip: [{ type: Input }],
    filterable: [{ type: Input }],
    noRecordsText: [{ type: Input }],
    isLocked: [{ type: Input }],
    lockedColumnsCount: [{ type: Input }],
    totalColumnsCount: [{ type: Input }],
    virtualColumns: [{ type: Input }],
    trackBy: [{ type: Input }],
    rowClass: [{ type: Input }]
};
export { ɵ0 };
