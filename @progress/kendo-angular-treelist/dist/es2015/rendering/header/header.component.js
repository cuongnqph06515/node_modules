/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, ChangeDetectorRef, HostBinding, Input, QueryList, ViewChildren, TemplateRef } from '@angular/core';
import { Subscription, of, merge } from "rxjs";
import { filter, map, switchMap, tap, takeUntil } from 'rxjs/operators';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { isColumnGroupComponent } from '../../columns/column-group.component';
import { normalize } from '../../columns/sort-settings';
import { and, isNullOrEmptyString, isPresent, isTruthy, not, observe } from '../../utils';
import { columnsToRender, sortColumns, isInSpanColumn } from "../../columns/column-common";
import { SinglePopupService } from '../../common/single-popup.service';
import { hasFilterMenu, hasFilterRow } from '../../filtering/filterable';
import { Keys } from '@progress/kendo-angular-common';
import { DropTargetDirective } from '../../dragdrop/drop-target.directive';
import { DragHintService } from '../../dragdrop/drag-hint.service';
import { DropCueService } from '../../dragdrop/drop-cue.service';
import { ColumnReorderService } from '../../dragdrop/column-reorder.service';
import { position, isTargetBefore, offset } from '../../dragdrop/common';
import { SortService } from '../../common/sort.service';
import { hasItems } from '../../column-menu/utils';
import { closestInScope, isFocusable } from '../common/dom-queries';
const mergeObjects = (...args) => Object.assign.apply(null, [{}].concat(args));
const ɵ0 = mergeObjects;
const directions = initialDirection => initialDirection === "asc" ? ["asc", "desc"] : ["desc", "asc"];
const ɵ1 = directions;
/**
 * @hidden
 */
const isRootLevel = ({ parent }) => !isTruthy(parent);
const ɵ2 = isRootLevel;
const ofColumnType = ({ draggable }) => ['column', 'columnGroup']
    .indexOf(draggable.context.type) >= 0;
const ɵ3 = ofColumnType;
const notSameElement = ({ draggable, target }) => draggable.element.nativeElement !== target.element.nativeElement;
const ɵ4 = notSameElement;
const inSameParent = (x, y) => x.parent === y.parent ||
    (isInSpanColumn(y) && inSameParent(x, y.parent));
const ɵ5 = inSameParent;
const sameParent = ({ draggable, target }) => inSameParent(draggable.context.column, target.context.column);
const ɵ6 = sameParent;
const lastNonLocked = ({ draggable }) => !isTruthy(draggable.context.column.locked) &&
    isRootLevel(draggable.context.column) &&
    draggable.context.lastColumn;
const ɵ7 = lastNonLocked;
const notInSpanColumn = ({ draggable }) => !isInSpanColumn(draggable.context.column);
const ɵ8 = notInSpanColumn;
const reorderable = ({ draggable }) => draggable.context.column.reorderable;
const ɵ9 = reorderable;
const lockable = ({ draggable, target }) => draggable.context.column.lockable !== false ||
    draggable.context.column.isLocked === target.context.column.isLocked;
const ɵ10 = lockable;
const rules = and(ofColumnType, reorderable, notInSpanColumn, notSameElement, sameParent, not(lastNonLocked), lockable);
/**
 * @hidden
 */
export class HeaderComponent {
    constructor(popupService, hint, cue, reorderService, sortService, localization, cd) {
        this.popupService = popupService;
        this.hint = hint;
        this.cue = cue;
        this.reorderService = reorderService;
        this.sortService = sortService;
        this.localization = localization;
        this.cd = cd;
        this.columns = [];
        this.sort = new Array();
        this.sortable = false;
        this.lockedColumnsCount = 0;
        this.resizable = false;
        this.reorderable = false;
        this.columnMenu = false;
        this.totalColumnsCount = 0;
        this.sortedFields = {};
        this.dropTargets = new QueryList();
        this.subscription = new Subscription();
    }
    get headerClass() {
        return !this.scrollable;
    }
    get sortableLabel() {
        return this.localization.get('sortable');
    }
    // Number of unlocked columns in the next table, if any
    get unlockedColumnsCount() {
        return this.totalColumnsCount - this.lockedColumnsCount - this.columns.length;
    }
    sortColumn(column, event, link) {
        const target = event ? event.target : null;
        if (column.headerTemplateRef && target !== link) {
            const hasFocusableParent = Boolean(closestInScope(target, isFocusable, link));
            if (hasFocusableParent) {
                return target.type === 'checkbox'; // prevent navigation only if the element is not checkbox
            }
        }
        this.sortService.sort(this.toggleSort(column));
        // Prevent navigation
        return false;
    }
    onHeaderKeydown(column, args) {
        if (!this.sortable || args.defaultPrevented || column.sortable === false) {
            return;
        }
        if (args.keyCode === Keys.Enter) {
            this.sortService.sort(this.toggleSort(column));
        }
    }
    showSortNumbering(column) {
        const { showIndexes } = normalize(this.sortable);
        return showIndexes
            && this.sort
            && this.sort.filter(({ dir }) => isPresent(dir)).length > 1
            && this.sortOrder(column.field) > 0;
    }
    sortOrder(field) {
        return this.sort
            .filter(({ dir }) => isPresent(dir))
            .findIndex(x => x.field === field)
            + 1;
    }
    sortIcon(field) {
        const state = this.sortDescriptor(field);
        return {
            'k-icon': isPresent(state.dir),
            'k-i-sort-desc-sm': state.dir === "desc",
            'k-i-sort-asc-sm': state.dir === "asc"
        };
    }
    sortState(column) {
        if (!this.isSortable(column)) {
            return;
        }
        const state = this.sortDescriptor(column.field);
        if (state.dir === 'asc') {
            return 'ascending';
        }
        if (state.dir === 'desc') {
            return 'descending';
        }
    }
    sortStatus(column) {
        if (!this.sortedFields[column.field] || !this.isSortable(column)) {
            return;
        }
        let msg = 'sortedDefault';
        const state = this.sortDescriptor(column.field);
        if (state.dir === 'asc') {
            msg = 'sortedAscending';
        }
        else if (state.dir === 'desc') {
            msg = 'sortedDescending';
        }
        return this.localization.get(msg);
    }
    toggleSort(column) {
        const { allowUnsort, mode, initialDirection } = normalize(this.sortable, column.sortable);
        const descriptor = this.toggleDirection(column.field, allowUnsort, initialDirection);
        if (mode === 'single') {
            return [descriptor];
        }
        return [...this.sort.filter(desc => desc.field !== column.field), descriptor];
    }
    ngAfterViewInit() {
        this.subscription.add(observe(this.dropTargets)
            .subscribe(this.attachTargets.bind(this)));
    }
    ngDoCheck() {
        this._leafColumns = columnsToRender(this.columns || []).filter(x => !isColumnGroupComponent(x));
    }
    ngOnChanges(changes) {
        const sortChange = changes.sort;
        if (sortChange && !sortChange.isFirstChange()) {
            sortChange.currentValue.forEach(change => {
                this.sortedFields[change.field] = true;
            });
        }
    }
    ngOnInit() {
        this.subscription.add(this.localization.changes
            .subscribe(() => this.cd.markForCheck()));
    }
    ngOnDestroy() {
        if (this.targetSubscription) {
            this.targetSubscription.unsubscribe();
        }
        if (this.popupService) {
            this.popupService.destroy();
        }
        this.subscription.unsubscribe();
    }
    isFirstOnRow(column, index) {
        const isTailing = (c) => c &&
            (this.columnsForLevel(c.level).indexOf(c) > 0 || isTailing(c.parent));
        return index === 0 && isTailing(column.parent);
    }
    logicalColumnIndex(column) {
        const index = column.leafIndex;
        if (isPresent(index)) {
            return index;
        }
        return -1;
    }
    get showFilterMenu() {
        return !this.columnMenu && hasFilterMenu(this.filterable);
    }
    get showFilterRow() {
        return hasFilterRow(this.filterable);
    }
    showColumnMenu(column) {
        return this.columnMenu && column.columnMenu &&
            (this.columnMenuTemplate || column.columnMenuTemplates.length || hasItems(this.columnMenu, column));
    }
    isFilterable(column) {
        return !isNullOrEmptyString(column.field) && column.filterable === true;
    }
    canDrop(draggable, target) {
        return this.reorderable && rules({ draggable, target });
    }
    shouldActivate(column) {
        return this.reorderable && column.reorderable;
    }
    isSortable(column) {
        return !isNullOrEmptyString(column.field)
            && isTruthy(this.sortable) && isTruthy(column.sortable);
    }
    trackByIndex(index, _item) {
        return index;
    }
    toggleDirection(field, allowUnsort, initialDirection) {
        const descriptor = this.sortDescriptor(field);
        const [first, second] = directions(initialDirection);
        let dir = first;
        if (descriptor.dir === first) {
            dir = second;
        }
        else if (descriptor.dir === second && allowUnsort) {
            dir = undefined;
        }
        return { dir, field };
    }
    columnsForLevel(level) {
        const columns = this.columns ? this.columns.filter(column => column.level === level) : [];
        return sortColumns(columnsToRender(columns));
    }
    isColumnGroupComponent(column) {
        return isColumnGroupComponent(column);
    }
    get columnLevels() {
        return new Array((this.totalColumnLevels || 0) + 1);
    }
    sortDescriptor(field) {
        return this.sort.find(item => item.field === field) || { field };
    }
    get leafColumns() {
        return this._leafColumns;
    }
    attachTargets() {
        if (this.targetSubscription) {
            this.targetSubscription.unsubscribe();
        }
        this.targetSubscription = new Subscription();
        const enterStream = merge(...this.dropTargets.map(target => target.enter));
        const leaveStream = merge(...this.dropTargets.map(target => target.leave));
        const dropStream = merge(...this.dropTargets.map(target => target.drop));
        this.targetSubscription.add(enterStream.pipe(tap(({ target, draggable }) => {
            const targetLocked = isTruthy(target.context.column.isLocked);
            const draggableLocked = isTruthy(draggable.context.column.isLocked);
            if (this.lockedColumnsCount > 0 || targetLocked || draggableLocked) {
                this.hint.toggleLock(targetLocked);
            }
        }), filter(({ draggable, target }) => this.canDrop(draggable, target)), switchMap(this.trackMove.bind(this, leaveStream, dropStream)), map((e) => mergeObjects(e, { before: this.calculateBefore(e), changeContainer: e.changeContainer })), map(this.normalizeTarget.bind(this)), tap(this.enter.bind(this)), switchMap((args) => dropStream.pipe(map(() => args), takeUntil(leaveStream.pipe(tap(this.leave.bind(this)))))))
            .subscribe(this.drop.bind(this)));
    }
    normalizeTarget(e) {
        let target = e.target;
        const parent = target.context.column.parent;
        if (parent && parent.isSpanColumn) {
            const arr = this.dropTargets.toArray();
            const firstSpan = arr.find(t => t.context.column.parent === parent);
            const index = arr.indexOf(firstSpan);
            const adjust = e.before ? 0 : parent.childColumns.length - 1;
            target = arr[index + adjust];
        }
        return mergeObjects(e, { target });
    }
    trackMove(leaveStream, dropStream, e) {
        const column = e.target.context.column;
        const levelColumns = this.columnsForLevel(column.level);
        const index = levelColumns.indexOf(column);
        const isFirst = (column.locked ? index === levelColumns.length - 1 : index === 0);
        const changed = e.draggable.context.column.isLocked !== column.isLocked;
        if (changed && isFirst) {
            return e.draggable.drag
                .pipe(takeUntil(leaveStream), takeUntil(dropStream), map(({ mouseEvent }) => mergeObjects({ changeContainer: true }, e, { mouseEvent })));
        }
        return of(mergeObjects({ changeContainer: changed }, e));
    }
    calculateBefore({ draggable, target, mouseEvent, changeContainer = false }) {
        const targetElement = target.element.nativeElement;
        let before = false;
        if (changeContainer) {
            const { left } = offset(targetElement);
            const halfWidth = targetElement.offsetWidth / 2;
            const middle = left + halfWidth;
            before = middle > mouseEvent.pageX;
            if (this.localization.rtl) {
                before = !before;
            }
        }
        else {
            before = isTargetBefore(draggable.element.nativeElement, targetElement);
        }
        return before;
    }
    enter({ target, before }) {
        this.hint.enable();
        if (this.localization.rtl) {
            before = !before;
        }
        this.cue.position(position(target.element.nativeElement, before));
    }
    leave() {
        this.hint.disable();
        this.cue.hide();
    }
    drop({ draggable, target, before, changeContainer }) {
        this.reorderService.reorder({
            before,
            changeContainer,
            source: draggable.context.column,
            target: target.context.column
        });
    }
}
HeaderComponent.decorators = [
    { type: Component, args: [{
                selector: '[kendoTreeListHeader]',
                template: `
        <tr *ngFor="let i of columnLevels; let levelIndex = index"
            kendoTreeListLogicalRow
                [logicalRowIndex]="levelIndex"
                [logicalSlaveRow]="lockedColumnsCount > 0"
                [logicalCellsCount]="columns.length"
                [logicalSlaveCellsCount]="unlockedColumnsCount">
            <ng-template ngFor let-column [ngForOf]="columnsForLevel(levelIndex)" [ngForTrackBy]="trackByIndex" let-columnIndex="index" let-last="last">
                <th *ngIf="!isColumnGroupComponent(column)"
                    kendoTreeListLogicalCell [logicalRowIndex]="levelIndex"
                                         [logicalColIndex]="logicalColumnIndex(column)"
                                         [colSpan]="column.colspan"
                                         [rowSpan]="column.rowspan(totalColumnLevels)"
                                         role="columnheader"
                                         aria-selected="false"
                                         [attr.aria-sort]="sortState(column)"
                                         (keydown)="onHeaderKeydown(column, $event)"
                    kendoDropTarget
                    kendoDraggable
                    kendoDraggableColumn
                    [enableDrag]="shouldActivate(column)"
                    [context]="{
                        field: column.field,
                        type: 'column',
                        column: column,
                        hint: column.title || column.field,
                        lastColumn: last && columnIndex === 0
                    }"
                    class="k-header"
                    [class.k-filterable]="(showFilterMenu && isFilterable(column)) || showColumnMenu(column)"
                    [class.k-first]="isFirstOnRow(column, columnIndex)"
                    [ngClass]="column.headerClass"
                    [ngStyle]="column.headerStyle"
                    [attr.rowspan]="column.rowspan(totalColumnLevels)"
                    [attr.colspan]="column.colspan">
                    <kendo-treelist-filter-menu
                        *ngIf="showFilterMenu && isFilterable(column)"
                        [column]="column"
                        [filter]="filter">
                    </kendo-treelist-filter-menu>
                    <kendo-treelist-column-menu *ngIf="showColumnMenu(column)"
                        [standalone]="false"
                        [settings]="columnMenu"
                        [column]="column"
                        [columnMenuTemplate]="columnMenuTemplate"
                        [sort]="sort"
                        [filter]="filter"
                        [sortable]="sortable">
                    </kendo-treelist-column-menu>
                    <ng-template [ngIf]="!isSortable(column)">
                        <ng-template
                            [templateContext]="{
                                templateRef: column.headerTemplateRef,
                                columnIndex: column.leafIndex,
                                column: column,
                                $implicit: column
                            }">
                        </ng-template>
                        <ng-template [ngIf]="!column.headerTemplateRef">{{column.displayTitle}}</ng-template>
                    </ng-template>
                    <ng-template [ngIf]="isSortable(column)">
                        <a #link href="#" tabindex="-1" class="k-link" (click)="sortColumn(column, $event, link)">
                            <ng-template
                                [templateContext]="{
                                    templateRef: column.headerTemplateRef,
                                    columnIndex: column.leafIndex,
                                    column: column,
                                    $implicit: column
                                }">
                            </ng-template>
                            <ng-template [ngIf]="!column.headerTemplateRef">{{column.displayTitle}}</ng-template>
                            <span [attr.aria-label]="sortableLabel" [ngClass]="sortIcon(column.field)"></span>
                            <span *ngIf="showSortNumbering(column)" class="k-sort-order">{{sortOrder(column.field)}}</span>
                        </a>
                        <span role="status"
                              class="k-sort-status"
                              style="position: absolute; left: -10000px;"
                              [innerHtml]="sortStatus(column)">
                        </span>
                    </ng-template>
                    <span kendoTreeListColumnHandle
                        kendoDraggable
                        class="k-column-resizer"
                        *ngIf="resizable"
                        [column]="column"
                        [columns]="columns">
                    </span>
                </th>
                <th *ngIf="isColumnGroupComponent(column)"
                    kendoTreeListLogicalCell [logicalRowIndex]="levelIndex"
                                         [logicalColIndex]="logicalColumnIndex(column)"
                                         [rowSpan]="column.rowspan(totalColumnLevels)"
                                         [colSpan]="column.colspan"
                    kendoDropTarget
                    kendoDraggable
                    kendoDraggableColumn
                    [enableDrag]="shouldActivate(column)"
                    [context]="{
                        type: 'columnGroup',
                        column: column,
                        hint: column.title,
                        lastColumn: last && columnIndex === 0
                    }"
                    class="k-header"
                    [class.k-first]="isFirstOnRow(column, columnIndex)"
                    [class.k-filterable]="showColumnMenu(column)"
                    [ngClass]="column.headerClass"
                    [ngStyle]="column.headerStyle"
                    [attr.rowspan]="column.rowspan(totalColumnLevels)"
                    [attr.colspan]="column.colspan">
                        <kendo-treelist-column-menu *ngIf="showColumnMenu(column)"
                            [standalone]="false"
                            [settings]="columnMenu"
                            [column]="column"
                            [columnMenuTemplate]="columnMenuTemplate">
                        </kendo-treelist-column-menu>
                        <ng-template
                            [templateContext]="{
                                templateRef: column.headerTemplateRef,
                                columnIndex: lockedColumnsCount + columnIndex,
                                column: column,
                                $implicit: column
                            }">
                        </ng-template>
                        <ng-template [ngIf]="!column.headerTemplateRef">{{column.displayTitle}}</ng-template>
                        <span kendoTreeListColumnHandle
                            kendoDraggable
                            class="k-column-resizer"
                            *ngIf="resizable"
                            [column]="column"
                            [columns]="columns">
                        </span>
                </th>
            </ng-template>
        </tr>
        <tr *ngIf="showFilterRow"
            kendoTreeListFilterRow
                [columns]="leafColumns"
                [filter]="filter"
                [lockedColumnsCount]="lockedColumnsCount"
            kendoTreeListLogicalRow
                [logicalRowIndex]="totalColumnLevels + 1"
                [logicalSlaveRow]="lockedColumnsCount > 0"
                [logicalCellsCount]="columns.length"
                [logicalSlaveCellsCount]="unlockedColumnsCount"
        ></tr>
    `
            },] },
];
/** @nocollapse */
HeaderComponent.ctorParameters = () => [
    { type: SinglePopupService },
    { type: DragHintService },
    { type: DropCueService },
    { type: ColumnReorderService },
    { type: SortService },
    { type: LocalizationService },
    { type: ChangeDetectorRef }
];
HeaderComponent.propDecorators = {
    totalColumnLevels: [{ type: Input }],
    columns: [{ type: Input }],
    scrollable: [{ type: Input }],
    filterable: [{ type: Input }],
    sort: [{ type: Input }],
    filter: [{ type: Input }],
    sortable: [{ type: Input }],
    lockedColumnsCount: [{ type: Input }],
    resizable: [{ type: Input }],
    reorderable: [{ type: Input }],
    columnMenu: [{ type: Input }],
    columnMenuTemplate: [{ type: Input }],
    totalColumnsCount: [{ type: Input }],
    headerClass: [{ type: HostBinding, args: ['class.k-grid-header',] }],
    dropTargets: [{ type: ViewChildren, args: [DropTargetDirective,] }]
};
export { ɵ0, ɵ1, ɵ2, ɵ3, ɵ4, ɵ5, ɵ6, ɵ7, ɵ8, ɵ9, ɵ10 };
