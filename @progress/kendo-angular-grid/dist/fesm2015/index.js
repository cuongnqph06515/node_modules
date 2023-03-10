/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { EventEmitter, Injectable, InjectionToken, Directive, Optional, Inject, SkipSelf, ElementRef, Renderer2, NgZone, ChangeDetectorRef, HostBinding, TemplateRef, QueryList, Input, ContentChildren, ContentChild, Component, forwardRef, Host, Output, isDevMode, SecurityContext, ViewEncapsulation, ViewChild, ViewChildren, Self, ViewContainerRef, Pipe, NgModule, ComponentFactoryResolver, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { isDocumentAvailable, Keys, DraggableDirective, isChanged, anyChanged, hasObservers, ResizeSensorComponent, DraggableModule, EventsModule, guid, ResizeSensorModule } from '@progress/kendo-angular-common';
import { merge, of, Subject, Subscription, from, interval, fromEvent, zip, BehaviorSubject, Observable } from 'rxjs';
import { LocalizationService, L10N_PREFIX, ComponentMessages } from '@progress/kendo-angular-l10n';
import { switchMap, take, filter, takeUntil, map, switchMapTo, delay, auditTime, distinctUntilChanged, tap, throttleTime, debounceTime, bufferCount } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { orderBy, process, isCompositeFilterDescriptor, filterBy } from '@progress/kendo-data-query';
import { PopupService, PopupModule } from '@progress/kendo-angular-popup';
import { DomSanitizer } from '@angular/platform-browser';
import { getter } from '@progress/kendo-common';
import { DropDownListModule, AutoCompleteModule } from '@progress/kendo-angular-dropdowns';
import { InputsModule, NumericTextBoxComponent, NumericTextBoxModule } from '@progress/kendo-angular-inputs';
import { DatePickerModule } from '@progress/kendo-angular-dateinputs';
import { IntlService } from '@progress/kendo-angular-intl';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Button } from '@progress/kendo-angular-buttons';
import { PDFMarginComponent, PDFTemplateDirective, PDFExportComponent } from '@progress/kendo-angular-pdf-export';
import { saveAs } from '@progress/kendo-file-saver';
import { workbookOptions, toDataURL, ColumnBase, ExcelExportModule } from '@progress/kendo-angular-excel-export';

/**
 * @hidden
 */
class DomEventsService {
    constructor() {
        this.cellClick = new EventEmitter();
        this.cellMousedown = new EventEmitter();
        this.cellMouseup = new EventEmitter();
        this.click = new EventEmitter();
        this.keydown = new EventEmitter();
        this.focus = new EventEmitter();
        this.focusIn = new EventEmitter();
        this.focusOut = new EventEmitter();
        this.windowBlur = new EventEmitter();
    }
}
DomEventsService.decorators = [
    { type: Injectable },
];

const EMPTY_REGEX = /^\s*$/;
/**
 * @hidden
 */
const isPresent = (value) => value !== null && value !== undefined;
/**
 * @hidden
 */
const isBlank = (value) => value === null || value === undefined;
/**
 * @hidden
 */
const isArray = (value) => Array.isArray(value);
/**
 * @hidden
 */
const isTruthy = (value) => !!value;
/**
 * @hidden
 */
const isNullOrEmptyString = (value) => isBlank(value) || EMPTY_REGEX.test(value);
/**
 * @hidden
 */
const observe = (list) => merge(of(list), list.changes);
/**
 * @hidden
 */
const isUniversal = () => typeof document === 'undefined';
/**
 * @hidden
 */
const isString = (value) => typeof value === 'string';
/**
 * @hidden
 */
const isNumber = (value) => typeof value === "number" && !isNaN(value);
/**
 * @hidden
 */
const extractFormat = (format) => {
    if (isString(format) && !isNullOrEmptyString(format) && format.startsWith('{0:')) {
        return format.slice(3, format.length - 1);
    }
    return format;
};
/**
 * @hidden
 */
const not = (fn) => (...args) => !fn.apply(null, args);
/**
 * @hidden
 */
const or = (...conditions) => (value) => conditions.reduce((acc, x) => acc || x(value), false);
/**
 * @hidden
 */
const and = (...conditions) => (value) => conditions.reduce((acc, x) => acc && x(value), true);
/**
 * @hidden
 */
const Skip = new InjectionToken("Skip"); // tslint:disable-line:variable-name
/**
 * @hidden
 */
const createPromise = () => {
    let resolveFn, rejectFn;
    const promise = new Promise((resolve, reject) => {
        resolveFn = (data) => {
            resolve(data);
            return promise;
        };
        rejectFn = (data) => {
            reject(data);
            return promise;
        };
    });
    promise.resolve = resolveFn;
    promise.reject = rejectFn;
    return promise;
};
/** @hidden */
const iterator = getIterator();
// TODO: Move to kendo-common
function getIterator() {
    if (typeof Symbol === 'function' && Symbol.iterator) {
        return Symbol.iterator;
    }
    const keys = Object.getOwnPropertyNames(Map.prototype);
    const proto = Map.prototype;
    for (let i = 0; i < keys.length; ++i) {
        const key = keys[i];
        if (key !== 'entries' && key !== 'size' && proto[key] === proto.entries) {
            return key;
        }
    }
}
const FRAME_DURATION = 1000 / 60;
const wnd = typeof window !== 'undefined' ? window : {};
/** @hidden */
const requestAnimationFrame = wnd.requestAnimationFrame || wnd.msRequestAnimationFrame || (callback => setTimeout(callback, FRAME_DURATION));
/** @hidden */
const cancelAnimationFrame = wnd.cancelAnimationFrame || wnd.msCancelRequestAnimationFrame || clearTimeout;
/**
 * @hidden
 */
const detectIE = () => {
    if (!isDocumentAvailable()) {
        return;
    }
    const ua = window.navigator.userAgent;
    const msie = ua.indexOf('MSIE ');
    const trident = ua.indexOf('Trident/');
    return msie > 0 || trident > 0;
};

/**
 * @hidden
 */
class LocalDataChangesService {
    constructor() {
        this.changes = new EventEmitter();
    }
}
LocalDataChangesService.decorators = [
    { type: Injectable },
];

/**
 * @hidden
 */
class FocusRoot {
    constructor() {
        this.groups = new Set();
    }
    registerGroup(group) {
        if (this.alive) {
            this.groups.add(group);
        }
    }
    unregisterGroup(group) {
        if (this.alive) {
            this.groups.delete(group);
        }
    }
    activate() {
        if (this.alive) {
            this.groups.forEach(f => f.activate());
        }
    }
    deactivate() {
        if (this.alive) {
            this.groups.forEach(f => f.deactivate());
        }
    }
}
FocusRoot.decorators = [
    { type: Injectable },
];

const focusableRegex = /^(?:a|input|select|option|textarea|button|object)$/i;
const NODE_NAME_PREDICATES = {};
const toClassList = (classNames) => String(classNames).trim().split(' ');
/**
 * @hidden
 */
const hasClasses = (element, classNames) => {
    const namesList = toClassList(classNames);
    return Boolean(toClassList(element.className).find((className) => namesList.indexOf(className) >= 0));
};
/**
 * @hidden
 */
const matchesClasses = (classNames) => (element) => hasClasses(element, classNames);
/**
 * @hidden
 */
const matchesNodeName = (nodeName) => {
    if (!NODE_NAME_PREDICATES[nodeName]) {
        NODE_NAME_PREDICATES[nodeName] = (element) => String(element.nodeName).toLowerCase() === nodeName.toLowerCase();
    }
    return NODE_NAME_PREDICATES[nodeName];
};
/**
 * @hidden
 */
const closest = (node, predicate) => {
    while (node && !predicate(node)) {
        node = node.parentNode;
    }
    return node;
};
/**
 * @hidden
 */
const closestInScope = (node, predicate, scope) => {
    while (node && node !== scope && !predicate(node)) {
        node = node.parentNode;
    }
    if (node !== scope) {
        return node;
    }
};
/**
 * @hidden
 */
const contains = (parent, node, matchSelf = false) => {
    const outside = !closest(node, (child) => child === parent);
    if (outside) {
        return false;
    }
    const el = closest(node, (child) => child === node);
    return el && (matchSelf || el !== parent);
};
/**
 * @hidden
 */
const isVisible = (element) => {
    const rect = element.getBoundingClientRect();
    const hasSize = rect.width > 0 && rect.height > 0;
    const hasPosition = rect.x !== 0 && rect.y !== 0;
    // Elements can have zero size due to styling, but they will still count as visible.
    // For example, the selection checkbox has no size, but is made visible through styling.
    return (hasSize || hasPosition) && window.getComputedStyle(element).visibility !== 'hidden';
};
/**
 * @hidden
 */
const isFocusable = (element) => {
    if (!element.tagName) {
        return false;
    }
    const tagName = element.tagName.toLowerCase();
    const hasTabIndex = Boolean(element.getAttribute('tabIndex'));
    const focusable = !element.disabled && focusableRegex.test(tagName);
    return focusable || hasTabIndex;
};
/**
 * @hidden
 */
const isFocusableWithTabKey = (element, checkVisibility = true) => {
    if (!isFocusable(element)) {
        return false;
    }
    const tabIndex = element.getAttribute('tabIndex');
    const visible = !checkVisibility || isVisible(element);
    return visible && tabIndex !== '-1';
};
/**
 * @hidden
 */
const findElement = (node, predicate, matchSelf = true) => {
    if (!node) {
        return;
    }
    if (matchSelf && predicate(node)) {
        return node;
    }
    node = node.firstChild;
    while (node) {
        if (node.nodeType === 1) {
            const element = findElement(node, predicate);
            if (element) {
                return element;
            }
        }
        node = node.nextSibling;
    }
};
/**
 * @hidden
 */
const findFocusable = (element, checkVisibility = true) => {
    return findElement(element, (node) => isFocusableWithTabKey(node, checkVisibility));
};
/**
 * @hidden
 */
const findFocusableChild = (element, checkVisibility = true) => {
    return findElement(element, (node) => isFocusableWithTabKey(node, checkVisibility), false);
};
/**
 * @hidden
 */
function rtlScrollPosition(position, element, initial) {
    let result = position;
    if (initial < 0) {
        result = -position;
    }
    else if (initial > 0) {
        result = element.scrollWidth - element.offsetWidth - position;
    }
    return result;
}

const isButton = matchesNodeName('button');
const isInputTag = matchesNodeName('input');
const navigableRegex = /(button|checkbox|color|file|radio|reset|submit)/i;
const isNavigableInput = element => isInputTag(element) && navigableRegex.test(element.type);
const isNavigable = element => !element.disabled && (isButton(element) || isNavigableInput(element));
/**
 * @hidden
 */
class DefaultFocusableElement {
    constructor(host, renderer) {
        this.renderer = renderer;
        this.element = host.nativeElement;
        this.focusable = findFocusable(this.element, false) || this.element;
    }
    get enabled() {
        return this.focusable && !this.focusable.disabled;
    }
    get visible() {
        return this.focusable && isVisible(this.focusable);
    }
    isNavigable() {
        return this.canFocus() && isNavigable(this.element);
    }
    toggle(active) {
        this.renderer.setAttribute(this.focusable, 'tabIndex', active ? '0' : '-1');
    }
    focus() {
        if (this.focusable) {
            this.focusable.focus();
        }
    }
    canFocus() {
        return this.visible && this.enabled;
    }
    hasFocus() {
        return document.activeElement !== this.element && closest(document.activeElement, e => e === this.element);
    }
}

/**
 * @hidden
 */
const CELL_CONTEXT = new InjectionToken('grid-cell-context');
/**
 * @hidden
 */
const EMPTY_CELL_CONTEXT = {};

/**
 * A directive that controls the way focusable elements receive
 * [focus in a navigable Grid]({% slug keyboard_navigation_grid %}).
 *
 * @example
 * ```ts-preview
 * _@Component({
 *    selector: 'my-app',
 *    template: `
 *      <input type="text" class="k-textbox" placeholder="Tab stop #0" style="margin-bottom: 8px;" />
 *      <kendo-grid [data]="data" [navigable]="true">
 *          <kendo-grid-column field="ProductID" title="Product ID" width="100">
 *          </kendo-grid-column>
 *          <kendo-grid-column field="ProductName" title="Product Name" width="150">
 *          </kendo-grid-column>
 *          <kendo-grid-column>
 *              <ng-template kendoGridCellTemplate let-dataItem>
 *                  <!-- The first focusable element will be focused when pressing Enter on the cell -->
 *                  <input type="text" class="k-textbox" kendoGridFocusable [value]="dataItem.ProductName" style="margin-right: 8px;" />
 *                  <button class="k-button" kendoGridFocusable>Update</button>
 *              </ng-template>
 *          </kendo-grid-column>
 *          <kendo-grid-column width="100">
 *              <ng-template kendoGridCellTemplate>
 *                  <!-- A single focusable element will be focused during navigation -->
 *                  <button class="k-button" kendoGridFocusable>Delete</button>
 *              </ng-template>
 *          </kendo-grid-column>
 *      </kendo-grid>
 *      <input type="text" class="k-textbox" placeholder="Tab stop #2" style="margin-top: 8px;" />
 *    `
 * })
 *
 * class AppComponent {
 *     public readonly data: any = [{
 *         "ProductID": 1,
 *         "ProductName": "Chai",
 *         "UnitPrice": 18.0000,
 *         "Discontinued": true
 *     }, {
 *         "ProductID": 2,
 *         "ProductName": "Chang",
 *         "UnitPrice": 19.0000,
 *         "Discontinued": false
 *     }];
 * }
 * ```
 */
class FocusableDirective {
    constructor(cellContext, hostElement, renderer) {
        this.cellContext = cellContext;
        this.hostElement = hostElement;
        this.renderer = renderer;
        this.active = true;
        if (this.cellContext) {
            this.group = this.cellContext.focusGroup;
        }
        if (this.group) {
            this.group.registerElement(this);
        }
    }
    ngAfterViewInit() {
        if (!this.element) {
            this.element = new DefaultFocusableElement(this.hostElement, this.renderer);
        }
        if (this.group) {
            const isActive = this.group.isActive;
            this.toggle(isActive);
        }
    }
    ngOnDestroy() {
        if (this.group) {
            this.group.unregisterElement(this);
        }
    }
    /**
     * @hidden
     */
    toggle(active) {
        if (this.element && active !== this.active) {
            this.active = active;
            this.element.toggle(active);
        }
    }
    /**
     * @hidden
     */
    canFocus() {
        return this.element && this.element.canFocus();
    }
    /**
     * @hidden
     */
    isNavigable() {
        return this.element && this.element.isNavigable();
    }
    /**
     * @hidden
     */
    focus() {
        if (this.element) {
            this.element.focus();
        }
    }
    /**
     * @hidden
     */
    hasFocus() {
        return this.element && this.element.hasFocus();
    }
    /**
     * @hidden
     */
    registerElement(element) {
        this.element = element;
    }
}
FocusableDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoGridFocusable]' + `,
        [kendoGridEditCommand],
        [kendoGridRemoveCommand],
        [kendoGridSaveCommand],
        [kendoGridCancelCommand],
        [kendoGridSelectionCheckbox]
    `
            },] },
];
/** @nocollapse */
FocusableDirective.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [CELL_CONTEXT,] }, { type: SkipSelf }] },
    { type: ElementRef },
    { type: Renderer2 }
];

/**
 * @hidden
 */
class GridFocusableElement {
    constructor(navigationService) {
        this.navigationService = navigationService;
    }
    focus() {
        this.navigationService.focusCell();
    }
    toggle(active) {
        this.navigationService.toggle(active);
    }
    canFocus() {
        return true;
    }
    hasFocus() {
        return this.navigationService.hasFocus();
    }
    isNavigable() {
        return false;
    }
}

/**
 * @hidden
 */
class NavigationCursor {
    constructor(model) {
        this.model = model;
        this.changes = new Subject();
        this.activeRow = 0;
        this.activeCol = 0;
        this.virtualCol = 0;
        this.virtualRow = 0;
    }
    get row() {
        return this.model.findRow(this.activeRow);
    }
    get cell() {
        const row = this.row;
        if (row) {
            return this.model.findCell(this.activeCol, row);
        }
    }
    get dataRowIndex() {
        const row = this.row;
        if (row) {
            return row.dataRowIndex;
        }
        return -1;
    }
    /**
     * Assumes and announces a new cursor position.
     */
    reset(rowIndex = this.activeRow, colIndex = this.activeCol, force = true) {
        if (this.activate(rowIndex, colIndex, force)) {
            this.virtualRow = rowIndex;
            this.virtualCol = colIndex;
        }
    }
    activate(rowIndex, colIndex, force) {
        if (!force && this.isActiveRange(rowIndex, colIndex)) {
            return false;
        }
        const prevColIndex = this.activeCol;
        const prevRowIndex = this.activeRow;
        this.activeCol = colIndex;
        this.activeRow = rowIndex;
        this.changes.next({
            colIndex,
            prevColIndex,
            prevRowIndex,
            rowIndex
        });
        return true;
    }
    isActiveRange(rowIndex, colIndex) {
        if (this.activeRow !== rowIndex) {
            return false;
        }
        const cell = this.cell;
        const { start, end } = this.model.cellRange(cell);
        return !Boolean(cell) || (start <= colIndex && colIndex <= end);
    }
    /**
     * Assumes a new cursor position without announcing it.
     */
    assume(rowIndex = this.activeRow, colIndex = this.activeCol) {
        this.virtualRow = rowIndex;
        this.virtualCol = colIndex;
        this.activeCol = colIndex;
        this.activeRow = rowIndex;
    }
    /**
     * Announces a current cursor position to subscribers.
     */
    announce() {
        this.changes.next({
            colIndex: this.activeCol,
            prevColIndex: this.activeCol,
            prevRowIndex: this.activeRow,
            rowIndex: this.activeRow
        });
    }
    activateVirtualCell(cell) {
        const rowRange = this.model.rowRange(cell);
        const cellRange = this.model.cellRange(cell);
        const activeCol = this.activeCol;
        const activeRow = this.activeRow;
        if (rowRange.start <= activeRow && activeRow <= rowRange.end &&
            cellRange.start <= activeCol && activeCol <= cellRange.end) {
            this.activeRow = cell.rowIndex;
            this.activeCol = cell.colIndex;
            return true;
        }
    }
    isActive(rowIndex, colIndex) {
        return this.activeCol === colIndex && this.activeRow === rowIndex;
    }
    moveUp(offset = 1) {
        return this.offsetRow(-offset);
    }
    moveDown(offset = 1) {
        return this.offsetRow(offset);
    }
    moveLeft(offset = 1) {
        return this.offsetCol(-offset);
    }
    moveRight(offset = 1) {
        return this.offsetCol(offset);
    }
    lastCellIndex(row) {
        return this.metadata.columns.leafColumnsToRender.length - 1 +
            (this.metadata.hasDetailTemplate && (!row || !row.groupItem) ? 1 : 0);
    }
    offsetCol(offset) {
        const prevRow = this.model.findRow(this.virtualRow);
        const lastIndex = this.lastCellIndex(prevRow);
        const virtualCol = this.virtualCol;
        this.virtualCol = Math.max(0, Math.min(virtualCol + offset, lastIndex));
        let nextColIndex = this.virtualCol;
        let nextRowIndex = this.virtualRow;
        let cell = this.model.findCell(this.virtualCol, prevRow);
        if (!cell && this.metadata.virtualColumns) {
            return this.activate(nextRowIndex, nextColIndex);
        }
        if (cell.colSpan > 1 && cell.colIndex <= virtualCol && virtualCol < cell.colIndex + cell.colSpan) {
            nextColIndex = offset > 0 ? Math.min(cell.colIndex + cell.colSpan, lastIndex) : Math.max(0, cell.colIndex + offset);
            const nextCell = this.model.findCell(nextColIndex, prevRow);
            if (cell !== nextCell) {
                cell = nextCell;
                this.virtualCol = cell.colIndex;
            }
            else {
                this.virtualCol = virtualCol;
            }
        }
        return this.activate(cell.rowIndex, cell.colIndex);
    }
    offsetRow(offset) {
        let nextColIndex = this.virtualCol;
        if (this.metadata && this.metadata.isVirtual) {
            const maxIndex = this.metadata.maxLogicalRowIndex;
            let nextIndex = Math.max(0, Math.min(this.activeRow + offset, maxIndex));
            if (this.metadata.hasDetailTemplate && !this.model.findRow(nextIndex)) {
                nextIndex = offset > 0 ? nextIndex + 1 : nextIndex - 1;
                nextIndex = Math.max(0, Math.min(nextIndex, maxIndex));
            }
            if (this.metadata.hasDetailTemplate && nextIndex === maxIndex) {
                if (this.model.lastRow.index !== maxIndex) {
                    // Don't attempt to navigate past the last collapsed row.
                    nextIndex--;
                }
            }
            const nextRow = this.model.findRow(nextIndex);
            if (nextRow) {
                // remove duplication
                let cell = this.model.findCell(this.virtualCol, nextRow);
                if (cell.rowIndex <= this.virtualRow && offset > 0 && cell.rowSpan > 1) {
                    cell = this.model.findCell(this.virtualCol, this.model.findRow(cell.rowIndex + cell.rowSpan - 1 + offset));
                }
                nextIndex = cell.rowIndex;
                nextColIndex = cell.colIndex;
            }
            this.virtualRow = nextIndex;
            return this.activate(nextIndex, nextColIndex);
        }
        const nextRow = this.model.findRow(this.virtualRow + offset) || this.model.nextRow(this.virtualRow, offset);
        if (!nextRow) {
            return false;
        }
        let cell = this.model.findCell(this.virtualCol, nextRow);
        if (cell && cell.rowIndex <= this.virtualRow && offset > 0 && cell.rowSpan > 1) { // spanned cell go to next
            const nextPos = cell.rowIndex + cell.rowSpan - 1 + offset;
            cell = this.model.findCell(this.virtualCol, this.model.findRow(nextPos));
        }
        if (!cell && this.metadata.virtualColumns) {
            return this.activate(this.virtualRow + offset, this.virtualCol);
        }
        this.virtualRow = cell.rowIndex;
        return this.activate(this.virtualRow, cell.colIndex);
    }
}

/**
 * @hidden
 */
class ItemMap {
    constructor() {
        this.count = 0;
        this.items = {};
    }
    get first() {
        if (this.count > 0) {
            let result;
            this.forEach(item => {
                result = item;
                return true;
            });
            return result;
        }
    }
    get last() {
        if (this.count > 0) {
            const keys = Object.keys(this.items);
            return this.items[keys[keys.length - 1]];
        }
    }
    removeItem(key) {
        if (this.items[key]) {
            delete this.items[key];
            this.count--;
        }
    }
    setItem(key, item) {
        if (!this.items[key]) {
            this.count++;
        }
        this.items[key] = item;
    }
    getItem(key) {
        return this.items[key];
    }
    toArray() {
        const result = [];
        this.forEach(item => {
            result.push(item);
        });
        return result;
    }
    forEach(callback) {
        for (let key in this.items) {
            if (this.items.hasOwnProperty(key) && callback(this.items[key])) {
                return this.items[key];
            }
        }
    }
    find(callback) {
        return this.forEach(callback);
    }
}

/**
 * @hidden
 *
 * Contains information for the currently rendered rows and cells.
 */
class NavigationModel {
    constructor() {
        this.rows = new ItemMap();
    }
    get firstRow() {
        return this.rows.first;
    }
    get lastRow() {
        return this.rows.last;
    }
    registerCell(cell) {
        const row = this.rows.getItem(cell.logicalRowIndex);
        if (!row) {
            return;
        }
        const colIndex = cell.logicalColIndex;
        const modelCell = {
            uid: cell.uid,
            colIndex,
            rowIndex: row.index,
            colSpan: cell.colSpan,
            rowSpan: cell.rowSpan,
            detailExpandCell: cell.detailExpandCell,
            dataItem: row.dataItem,
            dataRowIndex: row.dataRowIndex,
            focusGroup: cell.focusGroup
        };
        row.cells.setItem(colIndex, modelCell);
        if (cell.groupItem) {
            row.groupItem = cell.groupItem;
        }
        return modelCell;
    }
    unregisterCell(index, rowIndex, cell) {
        const row = this.rows.getItem(rowIndex);
        if (row) {
            const match = row.cells.getItem(index);
            if (match && match.uid === cell.uid) {
                row.cells.removeItem(index);
            }
        }
    }
    registerRow(row) {
        const modelRow = {
            uid: row.uid,
            index: row.logicalRowIndex,
            dataItem: row.dataItem,
            dataRowIndex: row.dataRowIndex,
            cells: new ItemMap()
        };
        this.rows.setItem(row.logicalRowIndex, modelRow);
    }
    updateRow(row) {
        const current = this.rows.getItem(row.logicalRowIndex);
        if (current) {
            Object.assign(current, {
                dataItem: row.dataItem,
                dataRowIndex: row.dataRowIndex
            });
        }
    }
    unregisterRow(index, row) {
        const match = this.rows.getItem(index);
        if (match && match.uid === row.uid) {
            this.rows.removeItem(index);
        }
    }
    cellRange(cell) {
        if (cell) {
            const start = cell.colIndex;
            const end = cell.colIndex + (cell.colSpan || 1) - 1;
            return {
                start,
                end
            };
        }
        return {};
    }
    rowRange(cell) {
        if (cell) {
            const start = cell.rowIndex;
            const end = cell.rowIndex + (cell.rowSpan || 1) - 1;
            return {
                start,
                end
            };
        }
        return {};
    }
    nextRow(rowIndex, offset) {
        const rows = this.rows.toArray();
        const row = this.rows.getItem(rowIndex);
        const position = rows.indexOf(row);
        const next = rows[position + offset];
        return next;
    }
    findRow(index) {
        return this.rows.getItem(index);
    }
    findCell(index, row) {
        if (!row) {
            return;
        }
        const rowIndex = row.index;
        let cell = row.cells.getItem(index);
        let currentIndex = rowIndex;
        while (!cell && row) {
            row = this.rows.getItem(currentIndex);
            cell = this.rowCell(index, row);
            currentIndex--;
        }
        if (cell && rowIndex <= row.index + (cell.rowSpan || 1) - 1) {
            return cell;
        }
    }
    rowCell(index, row) {
        if (!row || !row.cells.count) {
            return;
        }
        const firstCell = row.cells.first;
        let cell, currentIndex = index;
        while (!cell && currentIndex >= firstCell.colIndex) {
            cell = row.cells.getItem(currentIndex);
            currentIndex--;
        }
        if (cell && index <= cell.colIndex + (cell.colSpan || 1) - 1) {
            return cell;
        }
    }
}

/**
 * @hidden
 */
class PreventableEvent {
    constructor() {
        this.prevented = false;
    }
    /**
     * Prevents the default action for a specified event.
     * In this way, the source component suppresses
     * the built-in behavior that follows the event.
     */
    preventDefault() {
        this.prevented = true;
    }
    /**
     * Returns `true` if the event was prevented
     * by any of its subscribers.
     *
     * @returns `true` if the default action was prevented.
     * Otherwise, returns `false`.
     */
    isDefaultPrevented() {
        return this.prevented;
    }
}

/**
 * Arguments for the `cellClose` event.
 */
class CellCloseEvent extends PreventableEvent {
    constructor(options) {
        super();
        /**
         * @hidden
         */
        this.action = 'cellClose';
        Object.assign(this, options);
    }
}

/**
 * @hidden
 */
const isEqual = (index) => (item) => item.index === index;
/**
 * @hidden
 */
const isNotEqual = (index) => (item) => item.index !== index;
/**
 * @hidden
 */
const isNewRow = (index) => index === -1 || index === undefined;
/**
 * @hidden
 */
class EditService {
    constructor(ngZone) {
        this.ngZone = ngZone;
        this.changes = new EventEmitter();
        this.editedIndices = [];
        this.keepEditCell = false;
        this.closingCell = false;
        this.changedSource = new Subject();
        this.changed = this.changedSource.asObservable().pipe(switchMap(() => this.ngZone.onStable.asObservable().pipe(take(1))));
    }
    editRow(index, group = undefined) {
        this.editedIndices.push({ index, group });
        this.onChanged();
    }
    addRow(group) {
        this.newItemGroup = { group };
        this.onChanged();
    }
    editCell(rowIndex, column, group) {
        if (isNewRow(rowIndex) || column.editable === false || !(column.editTemplate || column.field)) {
            return;
        }
        this.preventCellClose();
        if (!this.closeCell()) {
            this.editRow(rowIndex, group);
            this.column = column;
            this.onChanged();
        }
    }
    isEditing() {
        return this.editedIndices.length > 0;
    }
    isEditingCell() {
        return this.isEditing() && this.column !== undefined;
    }
    get hasNewItem() {
        return isPresent(this.newItemGroup);
    }
    get newDataItem() {
        if (this.hasNewItem) {
            return this.newItemGroup.group.value;
        }
        return {};
    }
    close(index) {
        if (isNewRow(index)) {
            this.newItemGroup = undefined;
            return;
        }
        this.editedIndices = this.editedIndices.filter(isNotEqual(index));
        delete this.column;
        this.onChanged();
    }
    closeCell(originalEvent) {
        if (this.column && !this.closingCell) {
            return this.ngZone.run(() => {
                const { index, group } = this.editedIndices[0];
                const args = new CellCloseEvent({
                    column: this.column,
                    formGroup: group,
                    originalEvent: originalEvent,
                    rowIndex: index
                });
                this.closingCell = true;
                this.changes.emit(args);
                this.closingCell = false;
                if (!args.isDefaultPrevented()) {
                    this.cancelCell();
                }
                return args.isDefaultPrevented();
            });
        }
    }
    cancelCell() {
        if (this.column) {
            this.editedIndices = [];
            delete this.column;
            this.onChanged();
        }
    }
    shouldCloseCell() {
        return this.column && !this.keepEditCell;
    }
    preventCellClose() {
        this.ngZone.runOutsideAngular(() => {
            window.clearTimeout(this.keepCellTimeout);
            this.keepEditCell = true;
            this.keepCellTimeout = window.setTimeout(() => {
                this.keepEditCell = false;
            }, 0); // tslint:disable-line:align
        });
    }
    context(index) {
        if (isNewRow(index)) {
            return this.newItemGroup;
        }
        return this.findByIndex(index);
    }
    columnContext(index, column) {
        if (isNewRow(index)) {
            return this.newItemGroup;
        }
        if (!this.column || column === this.column) {
            return this.findByIndex(index);
        }
    }
    isEdited(index) {
        if (isNewRow(index) && isPresent(this.newItemGroup)) {
            return true;
        }
        return !this.column && isPresent(this.findByIndex(index));
    }
    hasEdited(index) {
        return isPresent(this.context(index));
    }
    isEditedColumn(index, column) {
        if (this.column && this.column === column) {
            return isPresent(this.findByIndex(index));
        }
        return false;
    }
    beginEdit(rowIndex) {
        this.changes.emit({ action: 'edit', rowIndex });
    }
    beginAdd() {
        this.changes.emit({ action: 'add' });
    }
    endEdit(rowIndex) {
        const { group: formGroup } = this.context(rowIndex);
        this.changes.emit({ action: 'cancel', rowIndex, formGroup, isNew: isNewRow(rowIndex) });
    }
    save(rowIndex) {
        const { group: formGroup } = this.context(rowIndex);
        this.changes.emit({ action: 'save', rowIndex, formGroup, isNew: isNewRow(rowIndex) });
    }
    remove(rowIndex) {
        this.changes.emit({ action: 'remove', rowIndex });
    }
    findByIndex(index) {
        return this.editedIndices.find(isEqual(index));
    }
    onChanged() {
        this.ngZone.runOutsideAngular(() => {
            this.changedSource.next();
        });
    }
}
EditService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
EditService.ctorParameters = () => [
    { type: NgZone }
];

/**
 * @hidden
 */
class ExpandStateService {
    constructor(isInitiallyCollapsed) {
        this.isInitiallyCollapsed = isInitiallyCollapsed;
        this.changes = new Subject();
        this.rowState = new Set();
    }
    toggleRow(index, dataItem) {
        const found = this.rowState.has(index);
        const expand = !this.isInitiallyCollapsed ? found : !found;
        const prevented = this.emitEvent({ dataItem, expand, index });
        if (prevented) {
            return;
        }
        if (found) {
            this.rowState.delete(index);
        }
        else {
            this.rowState.add(index);
        }
    }
    isExpanded(index) {
        const found = this.rowState.has(index);
        return this.isInitiallyCollapsed ? found : !found;
    }
    reset() {
        this.rowState.clear();
    }
    emitEvent(args) {
        this.changes.next(args);
        return false;
    }
}

const removeLast = groupIndex => groupIndex.lastIndexOf("_") > -1
    ? groupIndex.slice(0, groupIndex.lastIndexOf("_"))
    : "";
const isChildIndex = (targetIndex, parentIndex) => parentIndex !== targetIndex && targetIndex.startsWith(parentIndex);
/**
 * @hidden
 */
class GroupsService extends ExpandStateService {
    constructor(isCollapsed = false) {
        super(isCollapsed);
    }
    isInExpandedGroup(groupIndex, skipSelf = true) {
        if (skipSelf) {
            groupIndex = removeLast(groupIndex);
        }
        let expanded = true;
        while (groupIndex && expanded) {
            expanded = this.isExpanded(groupIndex);
            groupIndex = removeLast(groupIndex);
        }
        return expanded;
    }
    expandChildren(parentIndex) {
        this.rowState.forEach(index => isChildIndex(index, parentIndex) && this.rowState.delete(index));
    }
}
GroupsService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
GroupsService.ctorParameters = () => [
    { type: Boolean, decorators: [{ type: Optional }, { type: Inject, args: [Skip,] }] }
];

/**
 * @hidden
 */
class PagerContextService {
    constructor() {
        this.changes = new Subject();
        this.pageChange = new Subject();
    }
    get currentPage() {
        return this.skip / this.pageSize;
    }
    notifyChanges(changes) {
        this.total = changes.total;
        this.pageSize = changes.pageSize;
        this.skip = changes.skip;
        this.changes.next(changes);
    }
    changePage(page) {
        this.pageChange.next({ skip: page * this.pageSize, take: this.pageSize });
    }
    changePageSize(value) {
        this.pageChange.next({ skip: 0, take: value });
    }
    nextPage() {
        const nextPage = this.currentPage + 1;
        if (nextPage * this.pageSize < this.total) {
            this.changePage(nextPage);
        }
    }
    prevPage() {
        const prevPage = this.currentPage - 1;
        if (prevPage * this.pageSize >= 0) {
            this.changePage(prevPage);
        }
    }
}

/**
 * Arguments for the `detailCollapse` event.
 */
class DetailCollapseEvent extends PreventableEvent {
    constructor(args) {
        super();
        Object.assign(this, args);
    }
}

/**
 * Arguments for the `detailExpand` event.
 */
class DetailExpandEvent extends PreventableEvent {
    constructor(args) {
        super();
        Object.assign(this, args);
    }
}

/**
 * @hidden
 */
class DetailsService {
    constructor() {
        this.changes = new Subject();
        this.rowState = new Set();
    }
    ngOnDestroy() {
        this.rowState.clear();
    }
    isExpanded(index, dataItem) {
        if (this.userCallback) {
            return this.userCallback({ index, dataItem });
        }
        return this.rowState.has(index);
    }
    toggleRow(index, dataItem) {
        if (this.isExpanded(index, dataItem)) {
            this.collapseRow(index, dataItem);
        }
        else {
            this.expandRow(index, dataItem);
        }
    }
    expandRow(index, dataItem) {
        const prevented = this.emitEvent({ dataItem, index, expand: true });
        if (!prevented && !this.userCallback) {
            this.rowState.add(index);
        }
    }
    collapseRow(index, dataItem) {
        const prevented = this.emitEvent({ dataItem, index, expand: false });
        if (!prevented && !this.userCallback) {
            this.rowState.delete(index);
        }
    }
    emitEvent(args) {
        const eventArg = new (args.expand ? DetailExpandEvent : DetailCollapseEvent)(args);
        this.changes.next(eventArg);
        return eventArg.isDefaultPrevented();
    }
}
DetailsService.decorators = [
    { type: Injectable },
];

/**
 * @hidden
 */
class ScrollRequestService {
    constructor() {
        this.requests = new Subject();
    }
    scrollTo(request) {
        this.requests.next(request);
    }
}
ScrollRequestService.decorators = [
    { type: Injectable },
];

const isInSameGrid = (element, gridElement) => closest(element, matchesNodeName('kendo-grid')) === gridElement;
const matchHeaderCell = matchesNodeName('th');
const matchDataCell = matchesNodeName('td');
const matchFooterCell = matchesNodeName('.k-grid-footer td');
const matchCell = (element) => matchDataCell(element) || matchHeaderCell(element) || matchFooterCell(element);
const gridCell = (element, gridElement) => {
    let target = closest(element, matchCell);
    while (target && !isInSameGrid(target, gridElement)) {
        target = closest(target.parentElement, matchCell);
    }
    return target;
};
const targetCell = (target, gridElement) => {
    const cell = gridCell(target, gridElement);
    const row = closest(cell, matchesNodeName('tr'));
    if (cell && row) {
        let rowIndex = row.getAttribute('aria-rowindex');
        rowIndex = rowIndex ? parseInt(rowIndex, 10) - 1 : null;
        let colIndex = cell.getAttribute('aria-colindex');
        colIndex = colIndex ? parseInt(colIndex, 10) - 1 : null;
        if (rowIndex !== null && colIndex !== null) {
            return { colIndex, rowIndex, element: cell };
        }
    }
};
const isArrowKey = keyCode => keyCode === Keys.ArrowLeft || keyCode === Keys.ArrowRight ||
    keyCode === Keys.ArrowUp || keyCode === Keys.ArrowDown;
const isNavigationKey = keyCode => isArrowKey(keyCode) ||
    keyCode === Keys.PageUp || keyCode === Keys.PageDown ||
    keyCode === Keys.Home || keyCode === Keys.End;
const isInput = matchesNodeName('input');
const isTextInput = element => element && isInput(element) && element.type.toLowerCase() === 'text';
const isPrintableCharacter = (str) => str.length === 1 && str.match(/\S/);
/**
 * @hidden
 */
class NavigationViewport {
    constructor(firstItemIndex, lastItemIndex) {
        this.firstItemIndex = firstItemIndex;
        this.lastItemIndex = lastItemIndex;
    }
    containsRow(dataRowIndex) {
        const headerRow = dataRowIndex < 0;
        return headerRow || (dataRowIndex >= this.firstItemIndex && dataRowIndex <= this.lastItemIndex);
    }
    intersects(start, end) {
        return (start <= this.firstItemIndex && this.lastItemIndex <= end) ||
            (this.firstItemIndex <= start && start <= this.lastItemIndex) ||
            (this.firstItemIndex <= end && end <= this.lastItemIndex);
    }
}
/**
 * @hidden
 */
class NavigationService {
    constructor(zone, domEvents, pagerContextService, scrollRequestService, groupsService, detailsService, focusRoot, editService, cd, localization, focusableParent) {
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
        this.cellKeydown = new EventEmitter();
        this.activeRowIndex = 0;
        this.alive = false;
        this.active = true;
        this.mode = 0 /* Standby */;
        this.model = new NavigationModel();
        this.cursor = new NavigationCursor(this.model);
        this.changes = this.cursor.changes;
    }
    set metadata(value) {
        this.meta = value;
        this.cursor.metadata = value;
    }
    get metadata() {
        return this.meta;
    }
    get enabled() {
        return this.alive;
    }
    get activeCell() {
        if (this.mode !== 0 /* Standby */) {
            return this.cursor.cell;
        }
    }
    get activeRow() {
        if (this.mode !== 0 /* Standby */) {
            return Object.assign({}, this.cursor.row, {
                cells: this.cursor.row.cells.toArray()
            });
        }
    }
    get activeDataRow() {
        return Math.max(0, this.activeRowIndex - this.meta.headerRows);
    }
    init(meta) {
        this.alive = true;
        this.focusRoot.alive = true;
        this.metadata = meta;
        const onStableSubscriber = (...operators) => (args) => this.zone.isStable ?
            from([true]).pipe(map(() => args)) :
            this.zone.onStable.pipe(take(1), map(() => args), ...operators);
        const onStable = onStableSubscriber();
        this.subs = new Subscription();
        this.subs.add(this.cursor.changes
            .subscribe(args => this.onCursorChanges(args)));
        this.subs.add(this.domEvents.focus.pipe(switchMap(onStable))
            .subscribe((args) => this.navigateTo(args.target)));
        this.subs.add(this.domEvents.focusOut.pipe(filter(() => this.mode !== 0 /* Standby */), switchMap(onStableSubscriber(takeUntil(this.domEvents.focus))))
            .subscribe(args => this.onFocusOut(args)));
        this.subs.add(this.domEvents.windowBlur.pipe(filter(() => this.mode !== 0 /* Standby */))
            .subscribe(() => this.onWindowBlur()));
        this.subs.add(
        // Closing the editor will not always trigger focusout in Firefox.
        // To get around this, we ensure that the cell is closed after editing.
        this.editService.changes.pipe(filter(e => e.action !== 'edit' && this.mode === 2 /* Content */), filter((e) => e.action === 'cellClose' && !e.prevented), switchMap(onStable))
            .subscribe(() => this.leaveCell()));
        this.subs.add(this.pagerContextService.pageChange
            .subscribe(() => this.cursor.reset(0, 0)));
        this.subs.add(this.domEvents.keydown
            .subscribe(args => this.onKeydown(args)));
        this.subs.add(this.domEvents.keydown.pipe(filter(args => args.keyCode === Keys.Tab && this.mode === 2 /* Content */), switchMapTo(this.domEvents.focusOut.pipe(takeUntil(
        // Timeout if focusOut doesn't fire very soon
        interval(0).pipe(take(1))))))
            .subscribe(() => this.onTabout()));
        if (this.focusableParent) {
            const element = new GridFocusableElement(this);
            this.focusableParent.registerElement(element);
        }
        this.deactivateElements();
    }
    ngOnDestroy() {
        if (this.subs) {
            this.subs.unsubscribe();
        }
        this.alive = false;
    }
    registerCell(cell) {
        if (cell.logicalRowIndex !== this.pendingRowIndex) {
            const modelCell = this.model.registerCell(cell);
            if (this.virtualCell && this.cursor.activateVirtualCell(modelCell)) {
                this.virtualCell = false;
            }
        }
    }
    registerCellOnCurrentRow(cell) {
        if (cell.logicalRowIndex === this.pendingRowIndex) {
            this.model.registerCell(cell);
        }
    }
    unregisterCell(index, rowIndex, cell) {
        this.model.unregisterCell(index, rowIndex, cell);
    }
    registerRow(row) {
        this.model.registerRow(row);
        this.pendingRowIndex = row.logicalRowIndex;
    }
    updateRow(row) {
        this.model.updateRow(row);
    }
    unregisterRow(index, row) {
        this.model.unregisterRow(index, row);
    }
    isCellFocusable(cell) {
        return this.alive &&
            this.active &&
            this.mode !== 2 /* Content */ &&
            this.cursor.isActive(cell.logicalRowIndex, cell.logicalColIndex);
    }
    isCellFocused(cell) {
        return this.mode === 1 /* Cursor */ && this.isCellFocusable(cell);
    }
    navigateTo(el) {
        if (!this.alive) {
            return;
        }
        const cell = targetCell(el, this.meta.gridElement.nativeElement);
        if (!cell) {
            return;
        }
        const oldMode = this.mode;
        const focusInCell = contains(cell.element, document.activeElement);
        const focusInActiveRowContent = this.mode === 2 /* Content */ &&
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
            const alreadyActive = this.cursor.isActive(cell.rowIndex, cell.colIndex);
            const isCursor = oldMode === 1 /* Cursor */ && alreadyActive;
            if (!isCursor) {
                this.cursor.reset(cell.rowIndex, cell.colIndex);
            }
        }
    }
    tryFocus(el) {
        this.activateElements();
        const focusable = findFocusableChild(el);
        if (focusable) {
            const cell = targetCell(focusable, this.meta.gridElement.nativeElement);
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
    }
    needsViewport() {
        return this.meta && this.meta.isVirtual;
    }
    setViewport(firstItemIndex, lastItemIndex) {
        this.viewport = new NavigationViewport(firstItemIndex, lastItemIndex);
        if (this.meta && this.meta.isVirtual && this.activeDataRow > -1) {
            const dataRowIndex = this.activeDataRow;
            const ahead = firstItemIndex - dataRowIndex;
            const behind = dataRowIndex - lastItemIndex;
            if (ahead > 0) {
                this.cursor.reset(firstItemIndex + this.meta.headerRows);
            }
            else if (behind > 0) {
                this.cursor.reset(lastItemIndex - this.meta.headerRows);
            }
        }
    }
    setColumnViewport(firstItemIndex, lastItemIndex) {
        this.columnViewport = new NavigationViewport(firstItemIndex, lastItemIndex);
    }
    focusCell(rowIndex = undefined, colIndex = undefined) {
        this.mode = 1 /* Cursor */;
        this.cursor.reset(rowIndex, colIndex);
        return this.activeCell;
    }
    focusCellByElement(el) {
        const cell = targetCell(el, this.meta.gridElement.nativeElement);
        if (cell) {
            return this.focusCell(cell.rowIndex, cell.colIndex);
        }
    }
    focusNextCell(wrap = true) {
        return this.focusAdjacentCell(true, wrap);
    }
    focusPrevCell(wrap = true) {
        return this.focusAdjacentCell(false, wrap);
    }
    toggle(active) {
        this.active = active;
        this.cursor.announce();
    }
    hasFocus() {
        return this.mode === 1 /* Cursor */ || this.mode === 2 /* Content */;
    }
    autoFocusCell(start, end) {
        return !this.meta.virtualColumns || end < this.meta.columns.lockedLeafColumns.length || this.columnViewport.intersects(start, end);
    }
    focusAdjacentCell(fwd, wrap) {
        this.focusCell();
        let success = fwd ? this.moveCursorFwd() : this.moveCursorBwd();
        if (wrap && !success) {
            success = fwd ? this.cursor.moveDown(1) : this.cursor.moveUp(1);
            if (success) {
                const row = this.cursor.row;
                const colIdx = fwd ? 0 : this.cursor.lastCellIndex(row);
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
    }
    enterCell() {
        const cell = this.cursor.cell;
        if (!cell) {
            return;
        }
        const group = cell.focusGroup;
        const focusable = group && group.canFocus();
        this.mode = focusable ? 2 /* Content */ : 1 /* Cursor */;
        this.cursor.announce();
        if (focusable) {
            this.activateRow();
            group.focus();
        }
    }
    leaveCell() {
        const cell = this.cursor.cell;
        if (!cell) {
            return;
        }
        const group = cell.focusGroup;
        const focusable = group && group.canFocus();
        if (!focusable) {
            this.deactivateElements();
        }
        this.mode = 1 /* Cursor */;
        this.cursor.announce();
    }
    activateElements() {
        this.focusRoot.activate();
    }
    deactivateElements() {
        this.focusRoot.deactivate();
    }
    activateRow() {
        this.cursor.row.cells
            .forEach(cell => cell.focusGroup && cell.focusGroup.activate());
    }
    moveCursorFwd() {
        return this.localization.rtl ? this.cursor.moveLeft() : this.cursor.moveRight();
    }
    moveCursorBwd() {
        return this.localization.rtl ? this.cursor.moveRight() : this.cursor.moveLeft();
    }
    onCursorKeydown(args) {
        let preventDefault = false;
        const modifier = args.ctrlKey || args.metaKey;
        const step = modifier ? 5 : 1;
        if (!this.onCellKeydown(args)) {
            return;
        }
        const row = this.cursor.row;
        switch (args.keyCode) {
            case Keys.ArrowDown:
                preventDefault = this.cursor.moveDown(step);
                break;
            case Keys.ArrowUp:
                preventDefault = this.cursor.moveUp(step);
                break;
            case Keys.ArrowRight:
                preventDefault = this.moveCursorFwd();
                break;
            case Keys.ArrowLeft:
                preventDefault = this.moveCursorBwd();
                break;
            case Keys.PageDown:
                if (this.metadata.isVirtual && this.viewport) {
                    let nextItemIndex = this.meta.headerRows + this.viewport.lastItemIndex + 1;
                    if (this.metadata.hasDetailTemplate) {
                        nextItemIndex++;
                    }
                    nextItemIndex = Math.min(this.meta.maxLogicalRowIndex, nextItemIndex);
                    this.cursor.reset(nextItemIndex);
                    preventDefault = true;
                }
                else if (this.metadata.hasPager) {
                    this.zone.run(() => this.pagerContextService.nextPage());
                    preventDefault = true;
                }
                break;
            case Keys.PageUp:
                if (this.metadata.isVirtual && this.viewport) {
                    let viewportSize = this.viewport.lastItemIndex - this.viewport.firstItemIndex;
                    let firstItemIndex = this.viewport.firstItemIndex;
                    let nextItemIndex = Math.max(this.meta.headerRows, firstItemIndex - viewportSize - 1);
                    this.cursor.reset(nextItemIndex);
                    preventDefault = true;
                }
                else if (this.metadata.hasPager) {
                    this.zone.run(() => this.pagerContextService.prevPage());
                    preventDefault = true;
                }
                break;
            case Keys.Home:
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
            case Keys.End:
                if (modifier) {
                    if (this.meta.isVirtual) {
                        let lastRowIndex = this.meta.maxLogicalRowIndex;
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
                    const lastIndex = this.cursor.lastCellIndex(row);
                    const cell = this.model.findCell(lastIndex, row);
                    if (cell) {
                        this.cursor.reset(cell.rowIndex, cell.colIndex);
                    }
                    else {
                        this.cursor.reset(row.index, lastIndex);
                    }
                }
                preventDefault = true;
                break;
            case Keys.Enter:
            case Keys.F2:
                const groupItem = row.groupItem;
                if (groupItem) {
                    this.zone.run(() => this.groupsService.toggleRow(groupItem.index, groupItem.data));
                }
                else if (this.cursor.cell.detailExpandCell) {
                    this.zone.run(() => this.detailsService.toggleRow(row.dataRowIndex, row.dataItem));
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
    }
    onContentKeydown(args) {
        if (!this.onCellKeydown(args)) {
            return;
        }
        const confirm = !args.defaultPrevented && args.keyCode === Keys.Enter && isTextInput(args.srcElement);
        if (args.keyCode === Keys.Escape || args.keyCode === Keys.F2 || confirm) {
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
    }
    onCellKeydown(args) {
        if (this.editService.isEditingCell()) {
            const confirm = args.keyCode === Keys.Enter;
            const cancel = args.keyCode === Keys.Escape;
            const navigate = isNavigationKey(args.keyCode);
            if (confirm) {
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
    }
    onCursorChanges(args) {
        this.activeRowIndex = args.rowIndex;
        const dataRowIndex = this.activeDataRow;
        if (this.meta && (this.meta.isVirtual && this.viewport &&
            !this.viewport.containsRow(dataRowIndex) && dataRowIndex > -1)) {
            this.scrollRequestService.scrollTo({ row: dataRowIndex });
        }
        if (this.meta.virtualColumns && args.colIndex >= this.meta.columns.lockedLeafColumns.length) {
            const cell = this.activeCell;
            const { start, end } = this.model.cellRange(cell);
            if (!cell) {
                this.virtualCell = true;
            }
            if ((!cell && this.mode !== 0 /* Standby */) || (cell && !this.columnViewport.intersects(start, end))) {
                this.scrollRequestService.scrollTo({ column: args.colIndex - (this.metadata.hasDetailTemplate ? 1 : 0) });
            }
        }
    }
    onFocusOut(args) {
        if (isVisible(args.target)) {
            this.mode = 0 /* Standby */;
        }
        else {
            // Focused target is no longer visible,
            // reset to cursor mode and recapture focus.
            this.mode = 1 /* Cursor */;
        }
        this.deactivateElements();
        this.cursor.announce();
    }
    onWindowBlur() {
        this.mode = 0 /* Standby */;
        this.deactivateElements();
        this.cursor.announce();
    }
    onKeydown(args) {
        if (this.mode === 1 /* Cursor */) {
            this.onCursorKeydown(args);
        }
        else if (this.mode === 2 /* Content */) {
            this.onContentKeydown(args);
        }
    }
    onTabout() {
        // Tabbed out of the last focusable content element
        // reset to cursor mode and recapture focus.
        if (this.cursor.cell.focusGroup.isNavigable()) {
            // Unless the cell has a single focusable element,
            // otherwise we'd return to Content mode and enter an endless loop
            return;
        }
        this.leaveCell();
        this.cursor.reset();
    }
}
NavigationService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
NavigationService.ctorParameters = () => [
    { type: NgZone },
    { type: DomEventsService },
    { type: PagerContextService },
    { type: ScrollRequestService },
    { type: GroupsService },
    { type: DetailsService },
    { type: FocusRoot },
    { type: EditService },
    { type: ChangeDetectorRef },
    { type: LocalizationService },
    { type: FocusableDirective, decorators: [{ type: Optional }] }
];

/**
 * @hidden
 */
class SelectionService {
    constructor(domEvents, localDataChangesService, navigationService) {
        this.domEvents = domEvents;
        this.localDataChangesService = localDataChangesService;
        this.navigationService = navigationService;
        this.changes = new EventEmitter();
        this.lastSelectionStartIndex = 0;
        this.currentSelection = [];
        this.selectAllChecked = false;
        this.active = false;
        this.dragging = false;
        this.addSubscriptions();
    }
    get enableMarquee() {
        const checkboxOnly = this.settings && typeof this.settings === 'object' && this.settings.checkboxOnly;
        if (!this.settings || checkboxOnly) {
            return false;
        }
        const selectableSettings = this.settings.selectable;
        const dragAndMultiple = typeof (selectableSettings) === 'object' &&
            isPresent(selectableSettings) &&
            selectableSettings.mode === 'multiple' &&
            selectableSettings.enabled !== false &&
            !selectableSettings.checkboxOnly &&
            selectableSettings.drag;
        return this.active && dragAndMultiple;
    }
    init(settings) {
        this.settings = settings;
        this.currentSelection = [];
        if (settings.selectable && settings.selectable.enabled !== false) {
            const iterator$$1 = this.getIterator();
            this._selectAllState = true;
            let item = iterator$$1.next();
            while (!item.done) {
                if (item.value && item.value.type === "data") {
                    const rowArgs = {
                        dataItem: item.value.data,
                        index: item.value.index
                    };
                    if (settings.rowSelected(rowArgs)) {
                        this.currentSelection[item.value.index] = rowArgs;
                    }
                    else {
                        this._selectAllState = undefined;
                    }
                }
                item = iterator$$1.next();
            }
            if (this.currentSelection.length === 0) {
                this._selectAllState = false;
            }
        }
    }
    isSelected(index) {
        if (this.settings && this.active) {
            return this.options.enabled && isPresent(this.currentSelection[index]);
        }
    }
    handleClick(item, event) {
        if (this.dragging) {
            this.dragging = false;
            return;
        }
        let ev;
        const ctrlKey = event.ctrlKey || event.metaKey;
        if (this.options.mode === "single" && ctrlKey && this.isSelected(item.index)) {
            ev = this.toggle(item);
        }
        else if (this.options.mode === "multiple") {
            if (ctrlKey && !event.shiftKey) {
                ev = this.toggle(item);
            }
            else if (event.shiftKey) {
                ev = this.addAllTo(item, ctrlKey);
            }
        }
        if (!isPresent(ev)) {
            ev = this.select(item);
            this.currentSelection[item.index] = {
                dataItem: item.data,
                index: item.index
            };
        }
        if (!ev.selectedRows.length && !ev.deselectedRows.length) {
            return;
        }
        ev.ctrlKey = ctrlKey;
        ev.shiftKey = event.shiftKey;
        this.changes.emit(ev);
    }
    toggle(item) {
        let selectedRows = [];
        let deselectedRows = [];
        this.lastSelectionStartIndex = item.index;
        const rowArgs = { dataItem: item.data, index: item.index };
        if (this.isSelected(item.index)) {
            deselectedRows.push(rowArgs);
        }
        else {
            selectedRows.push(rowArgs);
        }
        return {
            deselectedRows: deselectedRows,
            selectedRows: selectedRows
        };
    }
    toggleByIndex(index) {
        const iterator$$1 = this.getIterator();
        if (this.selectAllChecked && this.isSelected(index)) {
            this.selectAllChecked = false;
        }
        let item = iterator$$1.next();
        while (!item.done) {
            if (item.value && item.value.type === "data" && item.value.index === index) {
                const itemToToggle = {
                    data: item.value.data,
                    index: item.value.index
                };
                if (this.isSelected(index) || this.options.mode === "multiple") {
                    return this.toggle(itemToToggle);
                }
                else {
                    return this.select(itemToToggle);
                }
            }
            item = iterator$$1.next();
        }
    }
    select(item) {
        let deselectedRows = [];
        let selectedRows = [];
        this.lastSelectionStartIndex = item.index;
        if (!this.isSelected(item.index)) {
            selectedRows.push({ dataItem: item.data, index: item.index });
        }
        this.currentSelection.forEach((row) => {
            if (row.index !== item.index) {
                deselectedRows.push(row);
            }
        });
        return {
            deselectedRows: deselectedRows,
            selectedRows: selectedRows
        };
    }
    //Used to manually deselect removed items
    deselect(removedItem) {
        const iterator$$1 = this.getIterator();
        let item = iterator$$1.next();
        while (!item.done) {
            if (item.value && item.value.type === "data" && item.value.data === removedItem) {
                const rowArgs = {
                    dataItem: item.value.data,
                    index: item.value.index
                };
                if (this.isSelected(rowArgs.index)) {
                    let ev = {
                        ctrlKey: false,
                        deselectedRows: [rowArgs],
                        selectedRows: []
                    };
                    this.changes.emit(ev);
                }
            }
            item = iterator$$1.next();
        }
    }
    addAllTo(item, ctrlKey) {
        let selectedRows = [];
        let deselectedRows = [];
        const start = Math.min(this.lastSelectionStartIndex, item.index);
        const end = Math.max(this.lastSelectionStartIndex, item.index);
        const iterator$$1 = this.getIterator();
        let next = iterator$$1.next();
        while (!next.done) {
            if (next.value && next.value.type === "data") {
                const idx = next.value.index;
                const rowArgs = { dataItem: next.value.data, index: idx };
                if ((idx < start || idx > end) && this.isSelected(idx) && !ctrlKey) {
                    deselectedRows.push(rowArgs);
                }
                if ((idx >= start && idx <= end) && !this.isSelected(idx)) {
                    selectedRows.push(rowArgs);
                }
            }
            next = iterator$$1.next();
        }
        return {
            deselectedRows: deselectedRows,
            selectedRows: selectedRows
        };
    }
    updateAll(selectAllChecked) {
        this.selectAllChecked = selectAllChecked;
        let selectedRows = [];
        let deselectedRows = [];
        const iterator$$1 = this.getIterator();
        let next = iterator$$1.next();
        while (!next.done) {
            if (next.value && next.value.type === "data") {
                const idx = next.value.index;
                const rowArgs = { dataItem: next.value.data, index: idx };
                if (this.isSelected(idx) && !selectAllChecked) {
                    deselectedRows.push(rowArgs);
                }
                if (!this.isSelected(idx) && selectAllChecked) {
                    selectedRows.push(rowArgs);
                }
            }
            next = iterator$$1.next();
        }
        if (!selectedRows.length && !deselectedRows.length) {
            return;
        }
        let ev = {
            ctrlKey: true,
            deselectedRows: deselectedRows,
            selectedRows: selectedRows,
            shiftKey: true
        };
        this.changes.emit(ev);
    }
    selectRange(startIndex, endIndex) {
        let selectedRows = [];
        let deselectedRows = [];
        const start = Math.min(startIndex, endIndex);
        const end = Math.max(startIndex, endIndex);
        const iterator$$1 = this.getIterator();
        let next = iterator$$1.next();
        while (!next.done) {
            if (next.value && next.value.type === "data") {
                const idx = next.value.index;
                const rowArgs = { dataItem: next.value.data, index: idx };
                if ((idx < start || idx > end) && this.isSelected(idx)) {
                    deselectedRows.push(rowArgs);
                }
                if ((idx >= start && idx <= end) && !this.isSelected(idx)) {
                    selectedRows.push(rowArgs);
                }
            }
            next = iterator$$1.next();
        }
        return {
            deselectedRows: deselectedRows,
            selectedRows: selectedRows
        };
    }
    get selectAllState() {
        return this._selectAllState;
    }
    get selected() {
        return this.currentSelection.map((item) => {
            return item.index;
        }).filter((n) => typeof n === "number");
    }
    get options() {
        const defaultOptions = {
            checkboxOnly: false,
            enabled: true,
            mode: "multiple"
        };
        if (!isPresent(this.settings)) {
            return defaultOptions;
        }
        if (typeof this.settings.selectable === 'boolean') {
            return {
                checkboxOnly: false,
                enabled: this.settings.selectable,
                mode: "multiple"
            };
        }
        else {
            return Object.assign(defaultOptions, this.settings.selectable);
        }
    }
    ngOnDestroy() {
        this.removeSubscriptions();
    }
    targetArgs() {
        return {
            index: this.mouseDownEventArgs.rowIndex,
            dataItem: this.mouseDownEventArgs.dataItem
        };
    }
    addSubscriptions() {
        if (!this.cellClickSubscription) {
            this.cellClickSubscription = this.domEvents.cellClick.subscribe((args) => {
                if (this.options.enabled && !this.options.checkboxOnly && args.type !== 'contextmenu') {
                    if (this.active) {
                        this.handleClick({ index: args.rowIndex, data: args.dataItem }, args.originalEvent);
                    }
                }
            });
        }
        if (!this.mousedownSubscription) {
            this.mousedownSubscription = this.domEvents.cellMousedown.subscribe((args) => {
                this.mouseDownEventArgs = args;
                if ((this.options.enabled && (!this.options.mode || this.options.mode === "multiple") &&
                    !this.options.checkboxOnly && args.originalEvent.shiftKey)) {
                    if (this.active) {
                        args.originalEvent.preventDefault();
                        this.navigationService.focusCellByElement(args.originalEvent.target);
                    }
                }
            });
        }
        if (this.localDataChangesService && !this.dataChangedSubscription) {
            this.dataChangedSubscription = this.localDataChangesService.changes.subscribe((args) => {
                if (this.active) {
                    if (isPresent(args.action) && args.action === 'remove') {
                        this.deselect(args.item);
                    }
                }
            });
        }
    }
    getIterator() {
        const accessor = this.settings.view.accessor();
        if (!accessor) {
            return;
        }
        return accessor[iterator]();
    }
    removeSubscriptions() {
        if (this.cellClickSubscription) {
            this.cellClickSubscription.unsubscribe();
            this.cellClickSubscription = null;
        }
        if (this.mousedownSubscription) {
            this.mousedownSubscription.unsubscribe();
            this.mousedownSubscription = null;
        }
        if (this.dataChangedSubscription) {
            this.dataChangedSubscription.unsubscribe();
            this.dataChangedSubscription = null;
        }
    }
}
SelectionService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
SelectionService.ctorParameters = () => [
    { type: DomEventsService },
    { type: LocalDataChangesService },
    { type: NavigationService }
];

/**
 * @hidden
 */
class CellSelectionService {
    constructor(domEvents, localDataChangesService, navigationService) {
        this.domEvents = domEvents;
        this.localDataChangesService = localDataChangesService;
        this.navigationService = navigationService;
        this.changes = new EventEmitter();
        this.mouseUpEvent = new EventEmitter();
        this.currentSelection = [];
        this.active = false;
        this.dragging = false;
        this.dragSelectDeselect = false;
        this.lastSelectionItem = { itemKey: 0, columnKey: 0 };
        this.lastSelectionItemRowIndex = 0;
        this.lastSelectionItemColIndex = 0;
        this.addSubscriptions();
    }
    get enableMarquee() {
        const checkboxOnly = this.settings && typeof this.settings === 'object' && this.settings.checkboxOnly;
        if (!this.settings || checkboxOnly) {
            return false;
        }
        const selectableSettings = this.settings.selectable;
        const dragAndMultiple = typeof (selectableSettings) === 'object' &&
            isPresent(selectableSettings) &&
            selectableSettings.mode === 'multiple' &&
            selectableSettings.cell &&
            selectableSettings.enabled !== false &&
            selectableSettings.drag;
        return this.active && dragAndMultiple;
    }
    init(settings) {
        this.settings = settings;
        this.currentSelection = [];
        if (settings.selectable && settings.selectable.enabled !== false) {
            const iterator$$1 = this.getIterator();
            let item = iterator$$1.next();
            while (!item.done) {
                if (item.value && item.value.type === "data") {
                    const rowArgs = {
                        dataItem: item.value.data,
                        index: item.value.index
                    };
                    settings.columns.forEach(col => {
                        const selectedCellArgs = settings.cellSelected(rowArgs, col, col.leafIndex);
                        if (selectedCellArgs.selected) {
                            this.currentSelection.push(selectedCellArgs.item);
                        }
                    });
                }
                item = iterator$$1.next();
            }
        }
    }
    isCellSelected(item, col) {
        if (this.settings && this.active) {
            const selectedCellArgs = this.settings.cellSelected({ dataItem: item.data, index: item.index }, col, col.leafIndex);
            return this.options.enabled && selectedCellArgs.selected;
        }
        return false;
    }
    handleClick(item, event) {
        if (this.dragging) {
            this.dragging = false;
            return;
        }
        let ev;
        const ctrlKey = event.ctrlKey || event.metaKey;
        if (this.options.mode === "single" && ctrlKey && this.isCellSelected(item, item.column)) {
            ev = this.toggle(item);
        }
        else if (this.options.mode === "multiple") {
            if (ctrlKey && !event.shiftKey) {
                ev = this.toggle(item);
            }
            else if (event.shiftKey) {
                const startRowIndex = Math.min(this.lastSelectionItemRowIndex, item.index);
                const startColIndex = Math.min(this.lastSelectionItemColIndex, item.column.leafIndex);
                const endRowIndex = Math.max(this.lastSelectionItemRowIndex, item.index);
                const endColIndex = Math.max(this.lastSelectionItemColIndex, item.column.leafIndex);
                ev = this.selectRange(startRowIndex, startColIndex, endRowIndex, endColIndex);
            }
        }
        if (!isPresent(ev)) {
            ev = this.select(item);
            this.currentSelection = [this.lastSelectionItem];
        }
        if (!ev.selectedCells.length && !ev.deselectedCells.length) {
            return;
        }
        ev.ctrlKey = ctrlKey;
        ev.shiftKey = event.shiftKey;
        this.changes.emit(ev);
    }
    toggle(item) {
        let selectedCells = [];
        let deselectedCells = [];
        this.lastSelectionItem =
            this.settings.cellSelected({ dataItem: item.data, index: item.index }, item.column, item.column.leafIndex).item;
        this.lastSelectionItemRowIndex = item.index;
        this.lastSelectionItemColIndex = item.column.leafIndex;
        if (this.isCellSelected(item, item.column)) {
            deselectedCells.push(this.lastSelectionItem);
        }
        else {
            selectedCells.push(this.lastSelectionItem);
        }
        return {
            deselectedCells,
            selectedCells
        };
    }
    select(item) {
        const selectedCells = [];
        const deselectedCells = [];
        this.lastSelectionItem =
            this.settings.cellSelected({ dataItem: item.data, index: item.index }, item.column, item.column.leafIndex).item;
        this.lastSelectionItemRowIndex = item.index;
        this.lastSelectionItemColIndex = item.column.leafIndex;
        if (!this.isCellSelected(item, item.column)) {
            selectedCells.push(this.lastSelectionItem);
        }
        this.currentSelection.forEach((selectedItem) => {
            if (selectedItem.itemKey !== this.lastSelectionItem.itemKey || selectedItem.columnKey !== this.lastSelectionItem.columnKey) {
                deselectedCells.push(selectedItem);
            }
        });
        return {
            deselectedCells,
            selectedCells
        };
    }
    //Used to manually deselect removed items
    deselect(removedItem) {
        const iterator$$1 = this.getIterator();
        let item = iterator$$1.next();
        let rowArgs;
        while (!item.done) {
            if (item.value && item.value.type === "data" && item.value.data === removedItem) {
                rowArgs = {
                    dataItem: item.value.data,
                    index: item.value.index
                };
                break;
            }
            item = iterator$$1.next();
        }
        if (rowArgs) {
            const cellsToRemove = this.currentSelection.filter(selectedItem => {
                const contender = this.settings.cellSelected(rowArgs, null, null).item;
                return selectedItem.itemKey === contender.itemKey;
            });
            if (cellsToRemove.length) {
                let ev = {
                    ctrlKey: false,
                    deselectedCells: cellsToRemove,
                    selectedCells: []
                };
                this.changes.emit(ev);
            }
        }
    }
    selectRange(startRowIndex, startColIndex, endRowIndex, endColIndex) {
        const selectedCells = [];
        const deselectedCells = [];
        const selectionStartRow = Math.min(startRowIndex, endRowIndex);
        const selectionStartCol = Math.min(startColIndex, endColIndex);
        const selectionEndRow = Math.max(startRowIndex, endRowIndex);
        const selectionEndCol = Math.max(startColIndex, endColIndex);
        const iterator$$1 = this.getIterator();
        let next = iterator$$1.next();
        while (!next.done) {
            if (next.value && next.value.type === "data") {
                const idx = next.value.index;
                const data = next.value.data;
                const rowArgs = {
                    dataItem: data,
                    index: idx
                };
                this.settings.columns.forEach(col => {
                    const { item } = this.settings.cellSelected(rowArgs, col, col.leafIndex);
                    const selected = this.isCellSelected(next.value, col);
                    const isInRowRange = selectionStartRow <= idx && idx <= selectionEndRow;
                    const isInColRange = selectionStartCol <= col.leafIndex && col.leafIndex <= selectionEndCol;
                    const isInSelectionRect = isInRowRange && isInColRange;
                    if (!isInSelectionRect && selected) {
                        deselectedCells.push(item);
                    }
                    if (isInSelectionRect && !selected) {
                        selectedCells.push(item);
                    }
                });
            }
            next = iterator$$1.next();
        }
        return {
            deselectedCells,
            selectedCells
        };
    }
    get options() {
        const defaultOptions = {
            checkboxOnly: false,
            enabled: true,
            mode: "multiple"
        };
        if (!isPresent(this.settings)) {
            return defaultOptions;
        }
        if (typeof this.settings.selectable === 'boolean') {
            return {
                checkboxOnly: false,
                enabled: this.settings.selectable,
                mode: "multiple"
            };
        }
        else {
            return Object.assign(defaultOptions, this.settings.selectable);
        }
    }
    ngOnDestroy() {
        this.removeSubscriptions();
    }
    addSubscriptions() {
        if (!this.cellClickSubscription) {
            this.cellClickSubscription = this.domEvents.cellClick.subscribe((args) => {
                if (this.options.enabled && !this.options.checkboxOnly && args.type !== 'contextmenu') {
                    if (this.active) {
                        this.handleClick({ index: args.rowIndex, data: args.dataItem, column: args.column }, args.originalEvent);
                    }
                }
            });
        }
        if (!this.mousedownSubscription) {
            this.mousedownSubscription = this.domEvents.cellMousedown.subscribe((args) => {
                this.mouseDownEventArgs = args;
                if (this.options.enabled && (!this.options.mode || this.options.mode === "multiple") &&
                    !this.options.checkboxOnly && args.originalEvent.shiftKey) {
                    if (this.active) {
                        args.originalEvent.preventDefault();
                        this.navigationService.focusCellByElement(args.originalEvent.target);
                    }
                }
            });
        }
        if (this.localDataChangesService && !this.dataChangedSubscription) {
            this.dataChangedSubscription = this.localDataChangesService.changes.subscribe((args) => {
                if (this.active) {
                    if (isPresent(args.action) && args.action === 'remove') {
                        this.deselect(args.item);
                    }
                }
            });
        }
    }
    getIterator() {
        const accessor = this.settings.view.accessor();
        if (!accessor) {
            return;
        }
        return accessor[iterator]();
    }
    removeSubscriptions() {
        if (this.cellClickSubscription) {
            this.cellClickSubscription.unsubscribe();
            this.cellClickSubscription = null;
        }
        if (this.mousedownSubscription) {
            this.mousedownSubscription.unsubscribe();
            this.mousedownSubscription = null;
        }
        if (this.dataChangedSubscription) {
            this.dataChangedSubscription.unsubscribe();
            this.dataChangedSubscription = null;
        }
    }
}
CellSelectionService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
CellSelectionService.ctorParameters = () => [
    { type: DomEventsService },
    { type: LocalDataChangesService },
    { type: NavigationService }
];

const createElement = () => {
    const marquee = document.createElement("div");
    marquee.className = "k-marquee";
    const marqueeColor = document.createElement("div");
    marqueeColor.className = "k-marquee-color";
    marquee.appendChild(marqueeColor);
    return marquee;
};
const POINTER_OFFSET = 2;
const MINIMAL_DRAG_DISTANCE = 5;
const offsets = {
    topLeft: { x: POINTER_OFFSET, y: POINTER_OFFSET },
    topRight: { x: -POINTER_OFFSET, y: POINTER_OFFSET },
    bottomLeft: { x: POINTER_OFFSET, y: -POINTER_OFFSET },
    bottomRight: { x: -POINTER_OFFSET, y: -POINTER_OFFSET }
};
/**
 * @hidden
 */
class GridMarqueeDirective {
    constructor(draggable, selection, cellSelection, domEvents) {
        this.draggable = draggable;
        this.selection = selection;
        this.cellSelection = cellSelection;
        this.domEvents = domEvents;
        this.selectionStarted = false;
    }
    get userSelection() {
        return (this.cellSelection.enableMarquee || this.selection.enableMarquee) ? 'none' : null;
    }
    ngOnInit() {
        this.subscriptions = (this.draggable.kendoPress.subscribe(this.start.bind(this)));
        this.subscriptions.add(this.draggable.kendoDrag.subscribe(this.moveMarquee.bind(this)));
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
        this.clean();
    }
    start(args) {
        if (args.originalEvent.target.classList.contains('k-checkbox')) {
            this.pressArgs = null;
            return;
        }
        this.pressArgs = args;
        this.pressTarget = null;
    }
    moveMarquee(args) {
        if (!this.pressTarget) {
            this.pressTarget = this.cellSelection.active ? this.cellSelection.mouseDownEventArgs : this.selection.mouseDownEventArgs;
        }
        const press = this.pressArgs;
        if (!press) {
            return;
        }
        if (!this.selectionStarted) {
            const distance = Math.sqrt(Math.pow((args.pageX - press.pageX), 2) + Math.pow((args.pageY - press.pageY), 2));
            if (distance > MINIMAL_DRAG_DISTANCE) {
                this.selectionStarted = true;
                this.dragEndSubscription = merge(this.domEvents.cellMouseup.pipe(take(1)), this.draggable.kendoRelease.pipe(delay(1), take(1)))
                    .subscribe(this.endSelection.bind(this));
            }
            else {
                return;
            }
        }
        this.initMarquee();
        const element = this.marqueeElement;
        const marqueeQuadrant = this.getMarqueeQuadrant(args.pageX, args.pageY, press.pageX, press.pageY);
        let left = Math.min(args.pageX, press.pageX);
        let top = Math.min(args.pageY, press.pageY);
        const width = Math.abs(args.pageX - press.pageX);
        const height = Math.abs(args.pageY - press.pageY);
        if (marqueeQuadrant) {
            left += offsets[marqueeQuadrant].x;
            top += offsets[marqueeQuadrant].y;
        }
        element.style.left = `${left}px`;
        element.style.top = `${top}px`;
        element.style.width = `${width}px`;
        element.style.height = `${height}px`;
    }
    endSelection(args) {
        if (args.type === 'mouseup' || args.type === 'touchend') {
            if (this.cellSelection.active) {
                this.cellSelection.dragging = true;
                this.cellSelection.changes.emit(this.cellSelection.selectRange(this.pressTarget.rowIndex, this.pressTarget.column.leafIndex, args.rowIndex, args.column.leafIndex));
            }
            else if (this.selection.active) {
                this.selection.dragging = true;
                this.selection.changes.emit(this.selection.selectRange(this.pressTarget.rowIndex, args.rowIndex));
            }
        }
        this.clean();
    }
    clean() {
        if (this.marqueeElement) {
            document.body.removeChild(this.marqueeElement);
            this.marqueeElement = null;
        }
        if (this.dragEndSubscription) {
            this.dragEndSubscription.unsubscribe();
        }
        this.dragEndSubscription = null;
        this.pressTarget = null;
        this.pressArgs = null;
        this.selectionStarted = false;
        this.cellSelection.active ? this.cellSelection.dragging = false : this.selection.dragging = false;
    }
    initMarquee() {
        if (!this.marqueeElement) {
            this.marqueeElement = createElement();
            document.body.appendChild(this.marqueeElement);
        }
    }
    getMarqueeQuadrant(pointerX, pointerY, startX, startY) {
        const leftHalf = pointerX < startX;
        const rightHalf = pointerX > startX;
        const topHalf = pointerY < startY;
        const bottomHalf = pointerY > startY;
        if (leftHalf && topHalf) {
            return 'topLeft';
        }
        if (leftHalf && bottomHalf) {
            return 'bottomLeft';
        }
        if (rightHalf && topHalf) {
            return 'topRight';
        }
        if (rightHalf && bottomHalf) {
            return 'bottomRight';
        }
        return null;
    }
}
GridMarqueeDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoGridSelectionMarquee]'
            },] },
];
/** @nocollapse */
GridMarqueeDirective.ctorParameters = () => [
    { type: DraggableDirective },
    { type: SelectionService },
    { type: CellSelectionService },
    { type: DomEventsService }
];
GridMarqueeDirective.propDecorators = {
    userSelection: [{ type: HostBinding, args: ['style.user-select',] }, { type: HostBinding, args: ['style.-webkit-user-select',] }]
};

/**
 * @hidden
 */
class ZoneAwareEventEmitter extends EventEmitter {
    constructor(ngZone, isAsync = false) {
        super(isAsync);
        this.ngZone = ngZone;
    }
    subscribe(generatorOrNext, error, complete) {
        let schedulerFn;
        let errorFn = (_) => null;
        let completeFn = () => null;
        if (generatorOrNext && typeof generatorOrNext === 'object') {
            schedulerFn = (value) => { this.ngZone.run(() => generatorOrNext.next(value)); };
            if (generatorOrNext.error) {
                errorFn = (err) => { this.ngZone.run(() => generatorOrNext.error(err)); };
            }
            if (generatorOrNext.complete) {
                completeFn = () => { this.ngZone.run(() => generatorOrNext.complete()); };
            }
        }
        else {
            schedulerFn = (value) => { this.ngZone.run(() => generatorOrNext(value)); };
            if (error) {
                errorFn = (err) => { this.ngZone.run(() => error(err)); };
            }
            if (complete) {
                completeFn = () => { this.ngZone.run(() => complete()); };
            }
        }
        return super.subscribe(schedulerFn, errorFn, completeFn);
    }
}

/**
 * Represents the column cell template of the Grid ([more information and example]({% slug templates_columns_grid %}#toc-cell-template)).
 * Helps to customize the content of the cells. To define the cell template, nest an `<ng-template>` tag
 * with the `kendoGridCellTemplate` directive inside a `<kendo-grid-column>` tag.
 *
 * The template context is set to the current data item and the following additional fields are passed:
 * - `columnIndex`&mdash;The current column index. Use it as an alias for a template variable by utilizing the `let-columnIndex="columnIndex"` syntax.
 * - `rowIndex`&mdash;The current data row index. Use it as an alias for a template variable by utilizing the `let-rowIndex="rowIndex"` syntax.
 * - `dataItem`&mdash;The current data item. Represents the default context that will be assigned to any template variable which utilizes the `let-x` syntax&mdash;for example, `let-dataItem`.
 * - `column`&mdash;The current column instance. Use it as an alias for a template variable by utilizing the `let-column="column"` syntax.
 *
 * @example
 * ```ts-preview
 *
 * _@Component({
 *     selector: 'my-app',
 *     template: `
 *         <kendo-grid [data]="gridData">
 *             <kendo-grid-column field="ProductName">
 *                 <ng-template kendoGridCellTemplate let-dataItem let-rowIndex="rowIndex">
 *                     Data Row #: {{rowIndex}} /
 *                     <strong>{{dataItem.ProductName}}</strong>
 *                     ({{dataItem.Discontinued ? "discontinued" : "active"}})
 *                 </ng-template>
 *             </kendo-grid-column>
 *         </kendo-grid>
 *     `
 * })
 *
 * class AppComponent {
 *     public gridData = [{
 *         "ProductID": 1,
 *         "ProductName": "Chai",
 *         "UnitPrice": 18.0000,
 *         "Discontinued": false
 *       }, {
 *         "ProductID": 2,
 *         "ProductName": "Chang",
 *         "UnitPrice": 19.0000,
 *         "Discontinued": true
 *       }
 *     ];
 * }
 *
 * ```
 */
class CellTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
CellTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoGridCellTemplate]'
            },] },
];
/** @nocollapse */
CellTemplateDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] }
];

/**
 * Represents the group-header cell template of the Grid which helps to customize the content of the group header item.
 * To define the group header template, nest an `<ng-template>` tag with the `kendoGridGroupHeaderTemplate`
 * directive inside `<kendo-grid-column>`.
 *
 * The template context is set to the current data item and the following additional fields are passed:
 * - `group`&mdash;The current group item.
 * - `field`&mdash;The name of the field by which data is grouped.
 * - `value`&mdash;The current group value.
 * - `aggregates`&mdash;All aggregate values for the current group.
 * - `index`&mdash;The index of the current group.
 * - `expanded`&mdash;A boolean value indicating if the group is currently expanded.
 * ([see example]({% slug groupable_grid_with_aggregates %})).
 *
 * @example
 * ```ts
 * import { process } from '@progress/kendo-data-query';
 *
 * _@Component({
 *     selector: 'my-app',
 *     template: `
 *         <kendo-grid [data]="gridData" [group]="groups">
 *             <kendo-grid-column field="ProductName">
 *                 <ng-template kendoGridGroupHeaderTemplate let-group let-field="field" let-value="value">
 *                    <strong>{{field}}</strong>: {{value}}
 *                 </ng-template>
 *             </kendo-grid-column>
 *         </kendo-grid>
 *     `
 * })
 *
 * class AppComponent {
 *     public groups = [{ field: "ProductName" }];
 *
 *     public gridData = process([{
 *         "ProductID": 1,
 *         "ProductName": "Chai",
 *         "UnitPrice": 18.0000,
 *         "Discontinued": false
 *       }, {
 *         "ProductID": 2,
 *         "ProductName": "Chang",
 *         "UnitPrice": 19.0000,
 *         "Discontinued": true
 *       }
 *     ], {
 *      group: this.groups
 *     });
 * }
 *
 * ```
 */
class GroupHeaderTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
GroupHeaderTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoGridGroupHeaderTemplate]'
            },] },
];
/** @nocollapse */
GroupHeaderTemplateDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] }
];

/**
 * Represents the group-header column template of the Grid which helps to customize the content of the group headers.
 * To define the group header template, nest an `<ng-template>` tag with the `kendoGridGroupHeaderColumnTemplate`
 * directive inside `<kendo-grid-column>`. ([See example]({% slug groupable_grid_with_aggregates %})).
 *
 * The template context is set to the current data item and the following additional fields are passed:
 * - `group`&mdash;The current group item.
 * - `field`&mdash;The name of the field by which data is grouped.
 * - `value`&mdash;The current group value.
 * - `aggregates`&mdash;All aggregate values for the current group.
 *
 * @example
 * ```ts
 * <kendo-grid-column field="ProductName" title="Product Name">
 *     <ng-template kendoGridGroupHeaderColumnTemplate let-group="group" let-aggregates="aggregates">
 *         <span title="Group Header Column Template for ProductName">
 *             Count: {{ aggregates.Discontinued.count }}
 *         </span>
 *     </ng-template>
 * </kendo-grid-column>
 * ```
 */
class GroupHeaderColumnTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
GroupHeaderColumnTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoGridGroupHeaderColumnTemplate]'
            },] },
];
/** @nocollapse */
GroupHeaderColumnTemplateDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] }
];

/**
 * Represents the column edit-cell template of the Grid ([see example]({% slug editing_template_forms_grid %})).
 * Helps to customize the content of the edited cells. To define the cell template, nest an `<ng-template>`
 * tag with the `kendoGridEditTemplate` directive inside a `<kendo-grid-column>` tag.
 *
 * The template context contains the following fields:
 * - `formGroup`&mdash;The current [`FormGroup`]({{ site.data.urls.angular['formgroupapi'] }}).
 * If you use the Grid inside [Template-Driven Forms]({{ site.data.urls.angular['forms'] }}), it will be `undefined`.
 * - `rowIndex`&mdash;The current data row index. If inside a new item row, `rowIndex` is `-1`.
 * - `dataItem`&mdash;The current data item.
 * - `column`&mdash;The current column instance.
 * - `isNew`&mdash;The state of the current item.
 */
class EditTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
EditTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoGridEditTemplate]'
            },] },
];
/** @nocollapse */
EditTemplateDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] }
];

/**
 * Represents the column group footer cell template of the Grid which helps to customize the group footer cell for the column.
 * To define the group footer template, nest an `<ng-template>` tag with the `kendoGridGroupFooterTemplate` directive
 * inside `<kendo-grid-column>`.
 *
 * The template context is set to the current aggregates and the following additional fields are passed:
 * - `column`&mdash;Defines an instance of the `ColumnComponent` option.
 * - `field`&mdash;The current column field name.
 * - `group`&mdash;The current group data item.
 * - `aggregates`&mdash;All aggregate values for the current group.
 *
 * @example
 * ```ts-preview
 * import { process } from '@progress/kendo-data-query';
 *
 * _@Component({
 *     selector: 'my-app',
 *     template: `
 *         <kendo-grid [data]="gridData" [group]="groups">
 *             <kendo-grid-column field="ProductName">
 *                 <ng-template kendoGridGroupFooterTemplate let-aggregates let-field="field">
 *                    Count: {{aggregates[field].count}}
 *                 </ng-template>
 *             </kendo-grid-column>
 *         </kendo-grid>
 *     `
 * })
 *
 * class AppComponent {
 *     public groups = [{ field: "ProductName", aggregates: [{ field: "ProductName", aggregate: "count" }] }];
 *
 *     public gridData = process([{
 *         "ProductID": 1,
 *         "ProductName": "Chai",
 *         "UnitPrice": 18.0000,
 *         "Discontinued": false
 *       }, {
 *         "ProductID": 2,
 *         "ProductName": "Chang",
 *         "UnitPrice": 19.0000,
 *         "Discontinued": true
 *       }
 *     ], {
 *      group: this.groups
 *     });
 * }
 * ```
 */
class GroupFooterTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
GroupFooterTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoGridGroupFooterTemplate]'
            },] },
];
/** @nocollapse */
GroupFooterTemplateDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] }
];

/**
 * Represents the column header cell template of the Grid
 * ([more information and example]({% slug templates_columns_grid %}#toc-header-template)).
 * Helps to customize the table header cell for the column.
 * To define a header template, nest an `<ng-template>` tag with the
 * [`kendoGridHeaderTemplate`]({% slug api_grid_headertemplatedirective %}) directive inside the `<kendo-grid-column>` tag.
 *
 *  The template context is set to the current column and then the following additional fields are passed:
 * * `column`&mdash;Defines an instance of the [`ColumnComponent`]({% slug api_grid_columncomponent %}) option.
 * * `columnIndex`&mdash;Defines the current column index.
 *
 * @example
 * ```ts-preview
 *
 * _@Component({
 *     selector: 'my-app',
 *     template: `
 *         <kendo-grid [data]="gridData">
 *             <kendo-grid-column field="ProductName">
 *                 <ng-template kendoGridHeaderTemplate let-column let-columnIndex="columnIndex">
 *                   {{column.field}}({{columnIndex}})
 *                 </ng-template>
 *             </kendo-grid-column>
 *              <kendo-grid-column field="UnitPrice">
 *                 <ng-template kendoGridHeaderTemplate let-column let-columnIndex="columnIndex">
 *                   {{column.field}}({{columnIndex}})
 *                 </ng-template>
 *             </kendo-grid-column>
 *         </kendo-grid>
 *     `
 * })
 *
 * class AppComponent {
 *     public gridData = [{
 *         "ProductID": 1,
 *         "ProductName": "Chai",
 *         "UnitPrice": 18.0000,
 *         "Discontinued": false
 *       }, {
 *         "ProductID": 2,
 *         "ProductName": "Chang",
 *         "UnitPrice": 19.0000,
 *         "Discontinued": true
 *       }
 *     ];
 * }
 *
 * ```
 */
class HeaderTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
HeaderTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoGridHeaderTemplate]'
            },] },
];
/** @nocollapse */
HeaderTemplateDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] }
];

/**
 * Represents the column footer cell template of the Grid
 * ([more information and example]({% slug templates_columns_grid %}#toc-footer-template)).
 * Helps to customize the table footer cell for the column.
 * To define a footer template, nest an `<ng-template>` tag with the
 * [`kendoGridFooterTemplate`]({% slug api_grid_footertemplatedirective %}) directive inside the `<kendo-grid-column>` tag.
 *
 * The template context is set to the current column and the following additional fields are passed:
 * * `column`&mdash;Defines an instance of the [`ColumnComponent`]({% slug api_grid_columncomponent %}) option.
 * * `columnIndex`&mdash;Defines the current column index.
 *
 * For more information on how to display aggregates in the footer of the Grid,
 * refer to the article on [aggregates]({% slug groupable_grid_with_aggregates %}).
 *
 * @example
 * ```ts-preview
 *
 * _@Component({
 *     selector: 'my-app',
 *     template: `
 *         <kendo-grid [data]="gridData" scrollable="none">
 *             <kendo-grid-column field="ProductName">
 *                 <ng-template kendoGridFooterTemplate let-column let-columnIndex="columnIndex">
 *                   {{column.field}}({{columnIndex}})
 *                 </ng-template>
 *             </kendo-grid-column>
 *              <kendo-grid-column field="UnitPrice">
 *                 <ng-template kendoGridFooterTemplate let-column let-columnIndex="columnIndex">
 *                   {{column.field}}({{columnIndex}})
 *                 </ng-template>
 *             </kendo-grid-column>
 *         </kendo-grid>
 *     `
 * })
 *
 * class AppComponent {
 *     public gridData = [{
 *         "ProductID": 1,
 *         "ProductName": "Chai",
 *         "UnitPrice": 18.0000,
 *         "Discontinued": false
 *       }, {
 *         "ProductID": 2,
 *         "ProductName": "Chang",
 *         "UnitPrice": 19.0000,
 *         "Discontinued": true
 *       }
 *     ];
 * }
 *
 * ```
 */
class FooterTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
FooterTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoGridFooterTemplate]'
            },] },
];
/** @nocollapse */
FooterTemplateDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] }
];

/* tslint:disable:max-line-length */
/**
 * Represents the template for the column menu in the Grid. Provides an option for
 * customizing the content of the column menu for all or for specific columns.
 * To define the content template, nest an `<ng-template>` tag with the
 * `kendoGridColumnMenuTemplate` directive inside the `kendo-grid` or the `<kendo-grid-column>` component.
 *
 * The template context is passes through the following fields:
 * - `service`&mdash;Represents the [ColumnMenuService]({% slug api_grid_columnmenuservice %}).
 * - `column`&mdash;Represents the Grid column.
 *
 * @example
 * ```ts-preview
 *
 * _@Component({
 *     selector: 'my-app',
 *     template: `
 *       <kendo-grid [kendoGridBinding]="data" [sortable]="true" [columnMenu]="true">
 *          <ng-template kendoGridColumnMenuTemplate let-service="service">
 *              <kendo-grid-columnmenu-sort [service]="service">
 *              </kendo-grid-columnmenu-sort>
 *          </ng-template>
 *          <kendo-grid-column field="Field1" [width]="100">
 *              <ng-template kendoGridColumnMenuTemplate let-service="service">
 *                  <kendo-grid-columnmenu-lock [service]="service">
 *                  </kendo-grid-columnmenu-lock>
 *                  <kendo-grid-columnmenu-sort [service]="service">
 *                  </kendo-grid-columnmenu-sort>
 *              </ng-template>
 *          </kendo-grid-column>
 *          <kendo-grid-column field="Field2" [width]="100"></kendo-grid-column>
 *       </kendo-grid>
 *     `
 * })
 *
 * class AppComponent {
 *   public data: any[] = [{ Field1: 'Foo', Field2: 'Bar' }, { Field1: 'Foo1', Field2: 'Bar1' }];
 * }
 *
 * ```
 */
class ColumnMenuTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
ColumnMenuTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoGridColumnMenuTemplate]'
            },] },
];
/** @nocollapse */
ColumnMenuTemplateDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] }
];

/**
 * @hidden
 */
const isSpanColumn = column => column.isSpanColumn;
/**
 * @hidden
 */
const isCheckboxColumn = column => column.isCheckboxColumn;
const isColumnContainer = column => column.isColumnGroup || isSpanColumn(column);
/**
 * The base class for the column components of the Grid.
 */
class ColumnBase$1 {
    constructor(parent) {
        this.parent = parent;
        /**
         * @hidden
         */
        this.matchesMedia = true;
        /**
         * The column index after reordering.
         *
         * > `orderIndex` is a read-only property. Setting this field does not affect column order.
         */
        this.orderIndex = 0;
        /**
         * @hidden
         */
        this.isColumnGroup = false;
        /**
         * @hidden
         */
        this.isSpanColumn = false;
        /**
         * Indicates whether the column is resizable.
         * @default true
         */
        this.resizable = true;
        /**
         * Indicates whether the column is reorderable.
         * @default true
         */
        this.reorderable = true;
        /**
         * The width (in pixels) below which the user is not able to resize the column by using the UI.
         */
        this.minResizableWidth = 10;
        /**
         * Toggles the locked (frozen) state of the columns ([more information and example]({% slug locked_columns_grid %})).
         *
         * @default false
         *
         * @example
         * ```ts
         * _@Component({
         *    selector: 'my-app',
         *    template: `
         *        <kendo-grid [data]="gridData" [scrollable]="scrollable" style="height: 200px">
         *          <kendo-grid-column field="ProductID" title="Product ID" width="120" [locked]="true">
         *          </kendo-grid-column>
         *          <kendo-grid-column field="ProductName" title="Product Name" width="200">
         *          </kendo-grid-column>
         *          <kendo-grid-column field="UnitPrice" title="Unit Price" width="230">
         *          </kendo-grid-column>
         *        </kendo-grid>
         *    `
         * })
         *
         * class AppComponent {
         *    public gridData: any[];
         *
         *    constructor() {
         *        this.gridData = products;
         *    }
         * }
         *
         * const products = [{
         *    "ProductID": 1,
         *    "ProductName": "Chai",
         *    "UnitPrice": 18.0000,
         *    "Discontinued": true
         *  }, {
         *    "ProductID": 2,
         *    "ProductName": "Chang",
         *    "UnitPrice": 19.0000,
         *    "Discontinued": false
         *  }
         * ];
         *
         * ```
         */
        this.locked = false;
        /**
         * Specifies if the column can be locked or unlocked from the column menu or by reordering the columns.
         */
        this.lockable = true;
        /**
         * Specifies if the column menu will be shown for the column.
         */
        this.columnMenu = true;
        /**
         * Specifies if the column will be included in the column-chooser list.
         */
        this.includeInChooser = true;
        /**
         * @hidden
         */
        this.headerTemplates = new QueryList();
        /**
         * @hidden
         */
        this.columnMenuTemplates = new QueryList();
        if (parent && !isColumnContainer(parent)) {
            throw new Error('Columns can be nested only inside ColumnGroupComponent');
        }
    }
    /**
     * The width of the column (in pixels).
     */
    set width(value) {
        this._width = parseInt(value, 10);
    }
    get width() { return this._width; }
    /**
     * @hidden
     */
    get level() {
        if (this.parent && isSpanColumn(this.parent)) {
            return this.parent.level;
        }
        return this.parent ? this.parent.level + 1 : 0;
    }
    /**
     * @hidden
     */
    get isLocked() {
        return this.parent ? this.parent.isLocked : this.locked;
    }
    /**
     * @hidden
     */
    get colspan() {
        return 1;
    }
    /**
     * @hidden
     */
    rowspan(totalColumnLevels) {
        return this.level < totalColumnLevels ? (totalColumnLevels - this.level) + 1 : 1;
    }
    /**
     * @hidden
     */
    get headerTemplateRef() {
        const template = this.headerTemplates.first;
        return template ? template.templateRef : undefined;
    }
    /**
     * @hidden
     */
    get footerTemplateRef() {
        return this.footerTemplate ? this.footerTemplate.templateRef : undefined;
    }
    /**
     * @hidden
     */
    get columnMenuTemplateRef() {
        const template = this.columnMenuTemplates.first;
        return template ? template.templateRef : null;
    }
    /**
     * @hidden
     */
    get displayTitle() {
        return this.title;
    }
    /**
     * @hidden
     */
    get isVisible() {
        return !this.hidden && this.matchesMedia;
    }
}
ColumnBase$1.propDecorators = {
    resizable: [{ type: Input }],
    reorderable: [{ type: Input }],
    minResizableWidth: [{ type: Input }],
    title: [{ type: Input }],
    width: [{ type: Input }],
    autoSize: [{ type: Input }],
    locked: [{ type: Input }],
    hidden: [{ type: Input }],
    media: [{ type: Input }],
    lockable: [{ type: Input }],
    columnMenu: [{ type: Input }],
    includeInChooser: [{ type: Input }],
    style: [{ type: Input }],
    headerStyle: [{ type: Input }],
    footerStyle: [{ type: Input }],
    cssClass: [{ type: Input, args: ['class',] }],
    headerClass: [{ type: Input }],
    footerClass: [{ type: Input }],
    headerTemplates: [{ type: ContentChildren, args: [HeaderTemplateDirective, { descendants: false },] }],
    footerTemplate: [{ type: ContentChild, args: [FooterTemplateDirective,] }],
    columnMenuTemplates: [{ type: ContentChildren, args: [ColumnMenuTemplateDirective,] }]
};

/**
 * Represents the filter-cell template ([see example]({% slug builtinfiltertemplate_grid %}#toc-customizing-filter-rows)).
 */
class FilterCellTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
FilterCellTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoGridFilterCellTemplate]'
            },] },
];
/** @nocollapse */
FilterCellTemplateDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] }
];

/**
 * Represents the filter-menu template
 * ([see example]({% slug builtinfiltertemplate_grid %}#toc-customizing-filter-menus)).
 */
class FilterMenuTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
FilterMenuTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoGridFilterMenuTemplate]'
            },] },
];
/** @nocollapse */
FilterMenuTemplateDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] }
];

/**
 * @hidden
 */
function isColumnComponent(column) {
    return isPresent(column.field);
}
/**
 * Represents the columns of the [Angular Data Grid]({% slug overview_grid %}).
 *
 * @example
 * ```ts-preview
 *
 * _@Component({
 *    selector: 'my-app',
 *    template: `
 *        <kendo-grid [data]="gridData">
 *          <kendo-grid-column field="ProductID" title="Product ID" width="120">
 *          </kendo-grid-column>
 *          <kendo-grid-column field="ProductName" title="Product Name">
 *          </kendo-grid-column>
 *          <kendo-grid-column field="UnitPrice" title="Unit Price" width="230">
 *          </kendo-grid-column>
 *          <kendo-grid-column field="Discontinued" width="120">
 *              <ng-template kendoGridCellTemplate let-dataItem>
 *                  <input type="checkbox" [checked]="dataItem.Discontinued" disabled/>
 *              </ng-template>
 *          </kendo-grid-column>
 *        </kendo-grid>
 *    `
 * })
 *
 * class AppComponent {
 *    public gridData: any[];
 *
 *    constructor() {
 *        this.gridData = products;
 *    }
 * }
 *
 * const products = [{
 *    "ProductID": 1,
 *    "ProductName": "Chai",
 *    "UnitPrice": 18.0000,
 *    "Discontinued": true
 *  }, {
 *    "ProductID": 2,
 *    "ProductName": "Chang",
 *    "UnitPrice": 19.0000,
 *    "Discontinued": false
 *  }
 * ];
 *
 * ```
 */
class ColumnComponent extends ColumnBase$1 {
    constructor(parent) {
        super(parent);
        /**
         * Allows the column headers to be clicked and the `sortChange` event emitted.
         * You have to handle the `sortChange` event yourself and sort the data.
         */
        this.sortable = true;
        /**
         * Determines if the column can be dragged to the group panel. The default value is `true`.
         * If set to `false`, you can group the columns by the column field by using the API of the Grid.
         */
        this.groupable = true;
        /**
         * Defines the editor type ([see example]({% slug editing_reactive_forms_grid %}#toc-setup)).
         * Used when the column enters the edit mode. The default value is `text`.
         *
         * @example
         * ```html-no-run
         * <kendo-grid>
         *    <kendo-grid-column field="UnitPrice" editor="numeric">
         *    </kendo-grid-column>
         * </kendo-grid>
         * ```
         */
        this.editor = 'text';
        /**
         * Defines the filter type that is displayed inside the filter row. The default value is `text`.
         *
         * @example
         * ```html-no-run
         * <kendo-grid>
         *    <kendo-grid-column field="UnitPrice" filter="numeric">
         *    </kendo-grid-column>
         * </kendo-grid>
         * ```
         */
        this.filter = 'text';
        /**
         * Defines if a filter UI will be displayed for this column. The default value is `true`.
         *
         * @example
         * ```html-no-run
         * <kendo-grid>
         *    <kendo-grid-column field="UnitPrice" [filterable]="false">
         *    </kendo-grid-column>
         * </kendo-grid>
         * ```
         */
        this.filterable = true;
        /**
         * Defines whether the column is editable. The default value is `true`.
         *
         * @example
         * ```html-no-run
         * <kendo-grid>
         *    <kendo-grid-column field="UnitPrice" [editable]="false">
         *    </kendo-grid-column>
         * </kendo-grid>
         * ```
         */
        this.editable = true;
    }
    get templateRef() {
        return this.template ? this.template.templateRef : undefined;
    }
    get groupHeaderTemplateRef() {
        return this.groupHeaderTemplate ? this.groupHeaderTemplate.templateRef : undefined;
    }
    get groupHeaderColumnTemplateRef() {
        return this.groupHeaderColumnTemplate ? this.groupHeaderColumnTemplate.templateRef : undefined;
    }
    get groupFooterTemplateRef() {
        return this.groupFooterTemplate ? this.groupFooterTemplate.templateRef : undefined;
    }
    get editTemplateRef() {
        return this.editTemplate ? this.editTemplate.templateRef : undefined;
    }
    get filterCellTemplateRef() {
        return this.filterCellTemplate ? this.filterCellTemplate.templateRef : undefined;
    }
    get filterMenuTemplateRef() {
        return this.filterMenuTemplate ? this.filterMenuTemplate.templateRef : undefined;
    }
    get displayTitle() {
        return this.title === undefined ? this.field : this.title;
    }
}
ColumnComponent.decorators = [
    { type: Component, args: [{
                providers: [
                    {
                        provide: ColumnBase$1,
                        useExisting: forwardRef(() => ColumnComponent)
                    }
                ],
                selector: 'kendo-grid-column',
                template: ``
            },] },
];
/** @nocollapse */
ColumnComponent.ctorParameters = () => [
    { type: ColumnBase$1, decorators: [{ type: SkipSelf }, { type: Host }, { type: Optional }] }
];
ColumnComponent.propDecorators = {
    field: [{ type: Input }],
    format: [{ type: Input }],
    sortable: [{ type: Input }],
    groupable: [{ type: Input }],
    editor: [{ type: Input }],
    filter: [{ type: Input }],
    filterable: [{ type: Input }],
    editable: [{ type: Input }],
    template: [{ type: ContentChild, args: [CellTemplateDirective,] }],
    groupHeaderTemplate: [{ type: ContentChild, args: [GroupHeaderTemplateDirective,] }],
    groupHeaderColumnTemplate: [{ type: ContentChild, args: [GroupHeaderColumnTemplateDirective,] }],
    groupFooterTemplate: [{ type: ContentChild, args: [GroupFooterTemplateDirective,] }],
    editTemplate: [{ type: ContentChild, args: [EditTemplateDirective,] }],
    filterCellTemplate: [{ type: ContentChild, args: [FilterCellTemplateDirective,] }],
    filterMenuTemplate: [{ type: ContentChild, args: [FilterMenuTemplateDirective,] }]
};

/**
 * @hidden
 */
function isSpanColumnComponent(column) {
    return column.isSpanColumn;
}
/**
 * Represents a column which can be spanned over multiple data cells while the individual
 * header and footer cells are retained ([see example]({% slug spanned_columns_grid %})).
 * Enables you to achieve more flexible layout while keeping the built-in UI element for
 * [sorting]({% slug sorting_grid %}), [filtering]({% slug filtering_grid %}), and
 * [grouping]({% slug groupingbasics_grid %}). Wrap the columns that will be
 * merged inside the `<kendo-grid-span-column>` tag.
 *
 * @example
 * ```ts-preview
 *
 * _@Component({
 *    selector: 'my-app',
 *    template: `
 *        <kendo-grid
 *              [sortable]="true"
 *              [filterable]="true"
 *              [kendoGridBinding]="products">
 *          <kendo-grid-column field="ProductID" title="Product ID" width="120">
 *          </kendo-grid-column>
 *          <kendo-grid-span-column>
 *              <kendo-grid-column field="ProductName" title="Product Name">
 *              </kendo-grid-column>
 *              <kendo-grid-column field="UnitPrice" title="Unit Price" filter="numeric" width="180" format="{0:c}">
 *              </kendo-grid-column>
 *          </kendo-grid-span-column>
 *          <kendo-grid-column field="Discontinued" width="120" filter="boolean">
 *              <ng-template kendoGridCellTemplate let-dataItem>
 *                  <input type="checkbox" [checked]="dataItem.Discontinued" disabled/>
 *              </ng-template>
 *          </kendo-grid-column>
 *        </kendo-grid>
 *    `
 * })
 *
 * class AppComponent {
 *   public products = [{
 *      "ProductID": 1,
 *      "ProductName": "Chai",
 *      "UnitPrice": 18.0000,
 *      "Discontinued": true
 *    }, {
 *      "ProductID": 2,
 *      "ProductName": "Chang",
 *      "UnitPrice": 19.0000,
 *      "Discontinued": false
 *    }
 *   ];
 * }
 *
 * ```
 *
 * By default, the data cell displays the data for the specified fields. To further customize
 * the span-column functionality, use a [cell template]({% slug api_grid_celltemplatedirective %}).
 *
 * ```html-no-run
 * <kendo-grid-span-column>
 *  <kendo-grid-column field="field1" title="Field 1"></kendo-grid-column>
 *  <kendo-grid-column field="field2" title="Field 2"></kendo-grid-column>
 *    <ng-template kendoGridCellTemplate let-dataItem>
 *        <h5>{{ dataItem.field1 }}</h5>
 *        <p>{{ dataItem.field2 }}</p>
 *    </ng-template>
 *  </kendo-grid-span-column>
 * ```
 */
class SpanColumnComponent extends ColumnBase$1 {
    constructor(parent) {
        super(parent);
        /*
         * @hidden
         */
        this.isSpanColumn = true;
        this.template = new QueryList();
        this.editTemplate = new QueryList();
        /**
         * @hidden
         */
        this.childColumns = new QueryList();
        /**
         * @hidden
         */
        this.includeInChooser = false;
        this._editable = true;
        this._locked = false;
        if (parent && parent.isSpanColumn) {
            throw new Error('SpanColumn cannot be nested inside another SpanColumn');
        }
    }
    /**
     * Defines whether the edit template of the column will be rendered. The default value is `false`.
     *
     * > To enable the editing functionality for a spanned column, set an edit template for it.
     *
     * @example
     * ```html-no-run
     * <kendo-grid>
     *    <kendo-grid-span-column [editable]="false">
     *      <kendo-grid-column field="UnitPrice">
     *      </kendo-grid-column>
     *      <kendo-grid-column field="ProductName">
     *      </kendo-grid-column>
     *      <ng-template kendoGridEditTemplate>
     *         .....
     *      </ng-template>
     *    </kendo-grid-span-column>
     * </kendo-grid>
     * ```
     */
    set editable(value) {
        this._editable = value;
    }
    get editable() {
        return isPresent(this.editTemplateRef) && this._editable;
    }
    /**
     * @hidden
     * added for backwards compitability
     */
    set width(_value) {
    }
    get width() {
        return this.childColumns.reduce((total, column) => total + column.width, 0);
    }
    /**
     * @hidden
     */
    get leafIndex() {
        return this.childColumns.first.leafIndex;
    }
    /**
     * @hidden
     */
    get templateRef() {
        const template = this.template.first;
        return template ? template.templateRef : undefined;
    }
    /**
     * @hidden
     */
    get editTemplateRef() {
        const editTemplate = this.editTemplate.first;
        return editTemplate ? editTemplate.templateRef : undefined;
    }
    /**
     * @hidden
     */
    get colspan() {
        return this.childColumns.filter(c => c.isVisible).length;
    }
    /**
     * Toggles the locked (frozen) state of the columns. Locked columns are visible
     * at all times during the horizontal scrolling of the Grid.
     *
     * For the option to work properly, make sure that:
     * - Scrolling is enabled.
     * - The `height` option of the Grid is set.
     * - The widths of all Grid columns are explicitly set in pixels. In this way,
     * the Grid adjusts the layout of the locked and unlocked columns.
     *
     * @default false
     *
     * @example
     * ```ts
     * _@Component({
     *    selector: 'my-app',
     *    template: `
     *        <kendo-grid [data]="gridData" [scrollable]="scrollable" style="height: 200px">
     *          <kendo-grid-span-column [locked]="true">
     *             <kendo-grid-column field="ProductID" title="Product ID" width="120">
     *             </kendo-grid-column>
     *             <kendo-grid-column field="ProductName" title="Product Name" width="200">
     *             </kendo-grid-column>
     *          </kendo-grid-span-column>
     *          <kendo-grid-column field="UnitPrice" title="Unit Price" width="230">
     *          </kendo-grid-column>
     *        </kendo-grid>
     *    `
     * })
     *
     * class AppComponent {
     *    public gridData: any[];
     *
     *    constructor() {
     *        this.gridData = products;
     *    }
     * }
     *
     * const products = [{
     *    "ProductID": 1,
     *    "ProductName": "Chai",
     *    "UnitPrice": 18.0000,
     *    "Discontinued": true
     *  }, {
     *    "ProductID": 2,
     *    "ProductName": "Chang",
     *    "UnitPrice": 19.0000,
     *    "Discontinued": false
     *  }
     * ];
     *
     * ```
     */
    set locked(value) {
        this._locked = value;
    }
    get locked() {
        return this._locked || this.childColumns.some(c => c.locked);
    }
    get childrenArray() {
        return this.childColumns.toArray();
    }
    get hasChildren() {
        return this.childColumns.length > 0;
    }
}
SpanColumnComponent.decorators = [
    { type: Component, args: [{
                providers: [
                    {
                        provide: ColumnBase$1,
                        useExisting: forwardRef(() => SpanColumnComponent)
                    }
                ],
                selector: 'kendo-grid-span-column',
                template: ``
            },] },
];
/** @nocollapse */
SpanColumnComponent.ctorParameters = () => [
    { type: ColumnBase$1, decorators: [{ type: SkipSelf }, { type: Host }, { type: Optional }] }
];
SpanColumnComponent.propDecorators = {
    template: [{ type: ContentChildren, args: [CellTemplateDirective, { descendants: false },] }],
    editTemplate: [{ type: ContentChildren, args: [EditTemplateDirective, { descendants: false },] }],
    childColumns: [{ type: ContentChildren, args: [ColumnComponent,] }],
    editable: [{ type: Input }],
    locked: [{ type: Input }]
};

/**
 * @hidden
 */
const expandColumns = (columns) => (columns.reduce((acc, column) => acc.concat(isSpanColumnComponent(column) ? column.childrenArray : [column]), []) // tslint:disable-line:align
);
/**
 * @hidden
 */
const expandColumnsWithSpan = (columns) => (columns.reduce((acc, column) => acc.concat(isSpanColumnComponent(column) ?
    [column].concat(column.childrenArray) :
    [column]), []) // tslint:disable-line:align
);
/**
 * @hidden
 */
const columnsToRender = (columns) => (expandColumns(columns).filter(x => x.isVisible));
const sumProp = (prop) => (array) => (array || []).reduce((prev, curr) => prev + (curr[prop] || 0), 0);
/**
 * @hidden
 */
const sumColumnWidths = sumProp('width');
/**
 * @hidden
 */
const columnsSpan = sumProp('colspan');
// tslint:disable-next-line:max-line-length
const validField = new RegExp(`^[$A-Z\_a-z][$A-Z\_a-z0-9\\.]*$`);
/**
 * @hidden
 */
const isValidFieldName = (fieldName) => !isNullOrEmptyString(fieldName) && validField.test(fieldName) &&
    fieldName[0] !== "." && fieldName[fieldName.length - 1] !== ".";
/**
 * @hidden
 */
const children = column => column.children.filter(child => child !== column);
/**
 * @hidden
 */
const leafColumns = columns => {
    return columns.reduce((acc, column) => {
        if (column.isColumnGroup) {
            acc = acc.concat(leafColumns(children(column)));
        }
        else if (column.isSpanColumn) {
            acc = acc.concat(column.childrenArray);
        }
        else {
            acc.push(column);
        }
        return acc;
    }, []).filter(x => x.isVisible); // tslint:disable-line:align
};
/**
 * @hidden
 */
const someLeafColumn = (callback, ...columns) => leafColumns(columns).some(callback);
/**
 * @hidden
 */
const resizableColumns = columns => columns.filter(column => isTruthy(column.resizable) && column.isVisible);
/**
 * @hidden
 */
const sortColumns = (columns) => orderBy(columns, [{ field: 'orderIndex', dir: 'asc' }]);
/**
 * @hidden
 */
const isInSpanColumn = (column) => isTruthy(column.parent) && isSpanColumnComponent(column.parent);

/**
 * @hidden
 */
function isColumnGroupComponent(column) {
    return column.isColumnGroup;
}
/**
 * Represents the column group header of the Grid
 * ([more information and examples]({% slug multicolumnheaders_columns_grid %})).
 *
 * @example
 * ```ts-preview
 *
 * _@Component({
 *    selector: 'my-app',
 *    template: `
 *     <kendo-grid [data]="gridData">
 *       <kendo-grid-column-group title="Product Info">
 *         <ng-template kendoGridHeaderTemplate let-columnIndex="columnIndex" let-column="column">
 *               Column index: {{columnIndex}} / column title: {{column.title}}
 *         </ng-template>
 *         <kendo-grid-column field="ProductID" title="Product ID" width="120">
 *         </kendo-grid-column>
 *         <kendo-grid-column field="ProductName" title="Product Name">
 *         </kendo-grid-column>
 *       </kendo-grid-column-group>
 *       <kendo-grid-column field="UnitPrice" title="Unit Price" width="230">
 *       </kendo-grid-column>
 *       <kendo-grid-column field="Discontinued" width="120">
 *           <ng-template kendoGridCellTemplate let-dataItem>
 *               <input type="checkbox" [checked]="dataItem.Discontinued" disabled/>
 *           </ng-template>
 *       </kendo-grid-column>
 *     </kendo-grid>
 *    `
 * })
 *
 * class AppComponent {
 *    public gridData: any[];
 *
 *    constructor() {
 *        this.gridData = products;
 *    }
 * }
 *
 * const products = [{
 *    "ProductID": 1,
 *    "ProductName": "Chai",
 *    "UnitPrice": 18.0000,
 *    "Discontinued": true
 *  }, {
 *    "ProductID": 2,
 *    "ProductName": "Chang",
 *    "UnitPrice": 19.0000,
 *    "Discontinued": false
 *  }
 * ];
 *
 * ```
 */
class ColumnGroupComponent extends ColumnBase$1 {
    constructor(parent) {
        super(parent);
        this.parent = parent;
        /**
         * @hidden
         */
        this.includeInChooser = false;
        /**
         * @hidden
         */
        this.isColumnGroup = true;
        /**
         * @hidden
         */
        this.minResizableWidth = 10;
        if (parent && parent.isSpanColumn) {
            throw new Error('ColumnGroupComponent cannot be nested inside SpanColumnComponent');
        }
    }
    /**
     * @hidden
     */
    rowspan() {
        return 1;
    }
    /**
     * @hidden
     */
    get colspan() {
        if (!this.children || this.children.length === 1) {
            return 1;
        }
        return columnsSpan(this.children
            .filter(child => child !== this && child.isVisible));
    }
    /**
     * @hidden
     */
    get leafIndex() {
        return this.children ? (this.firstChild || {}).leafIndex : -1;
    }
    get childrenArray() {
        return this.children.filter(c => c !== this);
    }
    get hasChildren() {
        return Boolean(this.firstChild);
    }
    get firstChild() {
        return this.children.find(column => column !== this);
    }
}
ColumnGroupComponent.decorators = [
    { type: Component, args: [{
                providers: [
                    {
                        provide: ColumnBase$1,
                        useExisting: forwardRef(() => ColumnGroupComponent)
                    }
                ],
                selector: 'kendo-grid-column-group',
                template: ``
            },] },
];
/** @nocollapse */
ColumnGroupComponent.ctorParameters = () => [
    { type: ColumnBase$1, decorators: [{ type: SkipSelf }, { type: Host }, { type: Optional }] }
];
ColumnGroupComponent.propDecorators = {
    children: [{ type: ContentChildren, args: [ColumnBase$1,] }]
};

/**
 * Represents the detail template of the Grid ([more information and examples]({% slug detailrowtemplate_grid %})).
 * To define the detail template, nest an `<ng-template>` tag with the `kendoGridDetailTemplate` directive inside a `<kendo-grid>` tag.
 *
 * @example
 * ```ts-preview
 *
 * _@Component({
 *   selector: 'my-app',
 *   template: `
 *       <kendo-grid
 *         [data]="data"
 *         selectable="true"
 *         style="height: 160px"
 *         >
 *         <kendo-grid-column field="ProductID"></kendo-grid-column>
 *         <kendo-grid-column field="ProductName"></kendo-grid-column>
 *         <kendo-grid-column field="UnitPrice"></kendo-grid-column>
 *         <ng-template kendoGridDetailTemplate let-dataItem>
 *           <div *ngIf="dataItem.Category">
 *             <header>{{dataItem.Category?.CategoryName}}</header>
 *             <span>{{dataItem.Category?.Description}}</span>
 *           </div>
 *         </ng-template>
 *       </kendo-grid>
 *   `
 * })
 *
 * class AppComponent {
 *     public data = [{
 *         "ProductID": 1,
 *         "ProductName": "Chai",
 *         "UnitPrice": 18.0000,
 *         "Discontinued": false,
 *         "Category": {
 *             "CategoryID": 1,
 *             "CategoryName": "Beverages",
 *             "Description": "Soft drinks, coffees, teas, beers, and ales"
 *         }
 *       }, {
 *         "ProductID": 2,
 *         "ProductName": "Chang",
 *         "UnitPrice": 19.0000,
 *         "Discontinued": false,
 *         "Category": {
 *             "CategoryID": 1,
 *             "CategoryName": "Beverages",
 *             "Description": "Soft drinks, coffees, teas, beers, and ales"
 *         }
 *       }, {
 *         "ProductID": 3,
 *         "ProductName": "Aniseed Syrup",
 *         "UnitPrice": 10.0000,
 *         "Discontinued": false,
 *         "Category": {
 *             "CategoryID": 2,
 *             "CategoryName": "Condiments",
 *             "Description": "Sweet and savory sauces, relishes, spreads, and seasonings"
 *         }
 *     }];
 *
 * }
 *
 * ```
 *
 */
class DetailTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
        this._condition = () => true;
    }
    /**
     * Defines the function that indicates if a given detail row and the associated **Expand** or **Collapse** button will be displayed.
     */
    set showIf(fn) {
        if (typeof fn !== 'function') {
            throw new Error(`showIf must be a function, but received ${JSON.stringify(fn)}.`);
        }
        this._condition = fn;
    }
    get showIf() {
        return this._condition;
    }
}
DetailTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoGridDetailTemplate]'
            },] },
];
/** @nocollapse */
DetailTemplateDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] }
];
DetailTemplateDirective.propDecorators = {
    showIf: [{ type: Input, args: ["kendoGridDetailTemplateShowIf",] }]
};

const canCreateElement = () => isDocumentAvailable() && document.createElement;
let cachedScrollbarWidth = null;
let cachedPixelRatio;
let cachedRtlScrollLeft = null;
function scrollbarWidth() {
    if (cachedScrollbarWidth === null && canCreateElement()) {
        cachedPixelRatio = window.devicePixelRatio || 1;
        const div = document.createElement("div");
        div.style.cssText = "overflow:scroll;overflow-x:hidden;zoom:1;clear:both;display:block";
        div.innerHTML = "&nbsp;";
        document.body.appendChild(div);
        cachedScrollbarWidth = div.offsetWidth - div.scrollWidth;
        document.body.removeChild(div);
    }
    return cachedScrollbarWidth;
}
function rtlScrollLeft() {
    if (cachedRtlScrollLeft === null && canCreateElement()) {
        const div = document.createElement("div");
        div.style.cssText = "overflow:scroll;zoom:1;clear:both;display:block;width:100px;visibility:hidden;position:absolute;left:-10000px;direction:rtl;";
        div.innerHTML = "<div style='width:200px;height:1px;'</div>";
        document.body.appendChild(div);
        const initial = div.scrollLeft;
        div.scrollLeft = -1;
        cachedRtlScrollLeft = div.scrollLeft < 0 ? div.scrollLeft : initial;
        document.body.removeChild(div);
    }
    return cachedRtlScrollLeft;
}
/**
 * @hidden
 * move to kendo-common
 */
class BrowserSupportService {
    constructor(zone, changeDetector) {
        this.zone = zone;
        this.changeDetector = changeDetector;
        this.changes = new EventEmitter();
        if (typeof window === 'undefined') {
            return;
        }
        this.zone.runOutsideAngular(() => {
            this.subscriptions = fromEvent(window, 'resize').pipe(auditTime(100)).subscribe(() => {
                if (cachedPixelRatio !== window.devicePixelRatio) {
                    zone.run(() => {
                        cachedScrollbarWidth = null;
                        this.changes.emit();
                        this.changeDetector.markForCheck();
                    });
                }
            });
        });
    }
    ngOnDestroy() {
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
            this.subscriptions = null;
        }
    }
    get scrollbarWidth() {
        return scrollbarWidth();
    }
    get rtlScrollLeft() {
        return rtlScrollLeft();
    }
}
BrowserSupportService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
BrowserSupportService.ctorParameters = () => [
    { type: NgZone },
    { type: ChangeDetectorRef }
];

/* tslint:disable:use-life-cycle-interface */
const isGroupItem = (source) => {
    return source.items !== undefined &&
        source.field !== undefined;
};
const isVirtualGroupItem = (source) => {
    return source.offset !== undefined &&
        source.skipHeader !== undefined;
};
const flattenGroups = (groups) => (groups.reduce((acc, curr) => {
    if (isGroupItem(curr)) {
        return acc.concat(flattenGroups(curr.items));
    }
    return acc.concat([curr]);
}, []) // tslint:disable-line:align
);
/**
 * @hidden
 */
const itemAt = (data, index) => {
    const first = data[0];
    if (isPresent(first) && isGroupItem(first)) {
        return flattenGroups(data)[index];
    }
    return data[index];
};
/**
 * @hidden
 */
const getIterator$1 = (data, { footers, level, dataIndex, parentGroupIndex, groupIndex }) => {
    const first = data[0];
    if (isPresent(first) && isGroupItem(first)) {
        if (isVirtualGroupItem(first)) {
            groupIndex = isPresent(first.offset) ? first.offset : groupIndex;
        }
        //tslint:disable-next-line:no-use-before-declare
        return new GroupIterator(data, footers, level, dataIndex, parentGroupIndex, groupIndex);
    }
    //tslint:disable-next-line:no-use-before-declare
    return new ItemIterator(data, dataIndex, parentGroupIndex);
};
class ArrayIterator {
    constructor(arr, idx = 0) {
        this.arr = arr;
        this.idx = idx;
        this.arr = arr || [];
    }
    [iterator]() {
        return this;
    }
    next() {
        return this.idx < this.arr.length ? {
            done: false,
            value: this.arr[this.idx++]
        } : { done: true, value: undefined };
    }
}
/**
 * @hidden
 */
class Iterator {
    constructor(arr, dataIndex = 0, resultMap = (x) => x) {
        this.dataIndex = dataIndex;
        this.resultMap = resultMap;
        const iter = arr[iterator];
        this._innerIterator = iter ? arr[iterator]() : new ArrayIterator(arr);
    }
    [iterator]() {
        return this;
    }
    next() {
        return this.resultMap(this._innerIterator.next(), this.dataIndex++);
    }
}
/**
 * @hidden
 */
class ItemIterator extends Iterator {
    constructor(arr, dataIndex, groupIndex) {
        super(arr, dataIndex, (x, idx) => ({
            done: x.done,
            value: {
                data: x.value,
                groupIndex: groupIndex,
                index: idx,
                type: 'data'
            }
        }));
    }
    /**
     * The index of the next record.
     * @readonly
     * @type {number}
     */
    get index() {
        return this.dataIndex;
    }
}
const prefix = (s, n) => {
    const p = s ? s + "_" : s;
    return `${p}${n}`;
};
/**
 * @hidden
 */
class GroupIterator {
    constructor(arr, outputFooters = false, level = 0, dataIndex = 0, parentIndex = "", groupIndex = 0) {
        this.arr = arr;
        this.outputFooters = outputFooters;
        this.level = level;
        this.dataIndex = dataIndex;
        this.parentIndex = parentIndex;
        this.groupIndex = groupIndex;
        this.currentGroupIndex = "";
        this.arr = arr || [];
        this._iterator = new Iterator(this.arr, this.dataIndex);
    }
    [iterator]() {
        return this;
    }
    nextGroupItem() {
        this.current = this._iterator.next().value;
        this._innerIterator = null;
        if (this.current) {
            this.currentGroupIndex = prefix(this.parentIndex, this.groupIndex++);
            return {
                done: false,
                value: {
                    data: this.current,
                    index: this.currentGroupIndex,
                    level: this.level,
                    type: 'group'
                }
            };
        }
        else {
            this.current = null;
            return { done: true, value: undefined };
        }
    }
    footerItem() {
        if (this.current) {
            const group = this.current;
            this.current = null;
            return {
                done: false,
                value: {
                    data: group,
                    groupIndex: this.currentGroupIndex,
                    level: this.level,
                    type: 'footer'
                }
            };
        }
        else {
            this.current = null;
            return { done: true, value: undefined };
        }
    }
    innerIterator(group) {
        if (!this._innerIterator) {
            this._innerIterator = getIterator$1(group.items, {
                dataIndex: this.dataIndex,
                footers: this.outputFooters,
                level: this.level + 1,
                parentGroupIndex: this.currentGroupIndex
            });
        }
        return this._innerIterator;
    }
    nextDataItem(group) {
        const iterator$$1 = this.innerIterator(group);
        const result = iterator$$1.next();
        if (isPresent(result.value) && !result.done && result.value.type === "data") {
            this.dataIndex = result.value.index + 1;
        }
        return !result.done ? result : undefined;
    }
    next() {
        if (!isPresent(this.current)) {
            return this.nextGroupItem();
        }
        const item = this.nextDataItem(this.current);
        return item ? item : (this.outputFooters ? this.footerItem() : this.nextGroupItem());
    }
    /**
     * The index of the last iterated data record.
     * @readonly
     * @type {number}
     */
    get index() {
        return this.dataIndex + 1;
    }
}

/**
 * @hidden
 */
class DataResultIterator {
    constructor(source, skip = 0, groupFooters = false) {
        this.source = source;
        this.skip = skip;
        this.groupFooters = groupFooters;
        this.source = this.source ? this.source : [];
        this.isObject = this.isGridDataResult(this.source);
    }
    isGridDataResult(source) {
        return source.total !== undefined && source.data !== undefined;
    }
    get total() {
        return this.isObject ? this.source.total : this.source.length;
    }
    get data() {
        return this.isObject ? this.source.data : this.source;
    }
    map(fn) {
        return this.data.map(fn);
    }
    filter(fn) {
        return this.data.filter(fn);
    }
    reduce(fn, init) {
        return this.data.reduce(fn, init);
    }
    forEach(fn) {
        this.data.forEach(fn);
    }
    some(fn) {
        return this.data.some(fn);
    }
    [iterator]() {
        return getIterator$1(this.data, {
            dataIndex: this.skip,
            footers: this.groupFooters,
            groupIndex: this.skip
        });
    }
    toString() { return this.data.toString(); }
}
/**
 * @hidden
 */
class DataCollection {
    constructor(accessor) {
        this.accessor = accessor;
    }
    get total() { return this.accessor().total; }
    get length() { return this.accessor().data.length; }
    get first() { return this.accessor().data[0]; }
    get last() { return this.accessor().data[this.length - 1]; }
    at(index) {
        return itemAt(this.accessor().data, index);
    }
    map(fn) { return this.accessor().map(fn); }
    filter(fn) {
        return this.accessor().filter(fn);
    }
    reduce(fn, init) {
        return this.accessor().reduce(fn, init);
    }
    forEach(fn) {
        this.accessor().forEach(fn);
    }
    some(fn) {
        return this.accessor().some(fn);
    }
    [iterator]() {
        return this.accessor()[iterator]();
    }
    toString() { return this.accessor().toString(); }
}

/* tslint:disable:no-input-rename */
/**
 * @hidden
 */
class Selection {
    constructor(grid, cd) {
        this.grid = grid;
        this.cd = cd;
        /**
         * Defines the collection that will store the selected item keys.
         */
        this.selectedKeys = [];
        /**
         * Fires when the `selectedKeys` collection has been updated.
         */
        this.selectedKeysChange = new EventEmitter();
        this.init();
    }
    init() {
        if (!isPresent(this.grid.rowSelected)) {
            this.grid.rowSelected = (row) => {
                return this.selectedKeys.indexOf(this.getItemKey(row)) >= 0;
            };
        }
        if (!isPresent(this.grid.cellSelected)) {
            this.grid.cellSelected = (row, column, colIndex) => {
                const contender = this.getSelectionItem(row, column, colIndex);
                return {
                    selected: this.selectedKeys.some(item => item.columnKey === contender.columnKey && item.itemKey === contender.itemKey),
                    item: contender
                };
            };
        }
        this.selectionChangeSubscription = this.grid
            .selectionChange
            .subscribe(this.onSelectionChange.bind(this));
    }
    /**
     * @hidden
     */
    destroy() {
        this.selectionChangeSubscription.unsubscribe();
    }
    /**
     * @hidden
     */
    reset() {
        this.selectedKeys = [];
    }
    getItemKey(row) {
        if (this.selectionKey) {
            if (typeof this.selectionKey === "string") {
                return row.dataItem[this.selectionKey];
            }
            if (typeof this.selectionKey === "function") {
                return this.selectionKey(row);
            }
        }
        return row.index;
    }
    getSelectionItem(row, col, colIndex) {
        const itemIdentifiers = {};
        itemIdentifiers.itemKey = this.getItemKey(row);
        if (!isPresent(col) && !isPresent(colIndex)) {
            return itemIdentifiers;
        }
        if (this.columnKey) {
            if (typeof this.columnKey === "string") {
                itemIdentifiers.columnKey = row.dataItem[this.columnKey];
            }
            if (typeof this.columnKey === "function") {
                itemIdentifiers.columnKey = this.columnKey(col, colIndex);
            }
        }
        return {
            itemKey: itemIdentifiers.itemKey,
            columnKey: itemIdentifiers.columnKey ? itemIdentifiers.columnKey : colIndex
        };
    }
    onSelectionChange(selection) {
        if (selection.selectedRows) {
            selection.deselectedRows.forEach((item) => {
                const itemKey = this.getItemKey(item);
                const itemIndex = this.selectedKeys.indexOf(itemKey);
                if (itemIndex >= 0) {
                    this.selectedKeys.splice(itemIndex, 1);
                }
            });
            if (this.grid.selectableSettings.mode === "single" && this.selectedKeys.length > 0) {
                this.reset();
            }
            selection.selectedRows.forEach((item) => {
                const itemKey = this.getItemKey(item);
                if (this.selectedKeys.indexOf(itemKey) < 0) {
                    this.selectedKeys.push(itemKey);
                }
            });
        }
        else {
            selection.deselectedCells.forEach((item) => {
                const itemIndex = this.getCellSelectionItemIndex(item);
                if (itemIndex >= 0) {
                    this.selectedKeys.splice(itemIndex, 1);
                }
            });
            if (this.grid.selectableSettings.mode === "single" && this.selectedKeys.length > 0) {
                this.reset();
            }
            selection.selectedCells.forEach((item) => {
                const itemIndex = this.getCellSelectionItemIndex(item);
                if (itemIndex < 0) {
                    this.selectedKeys.push(item);
                }
            });
        }
        this.cd.markForCheck();
        this.selectedKeysChange.emit(this.selectedKeys);
    }
    getCellSelectionItemIndex(item) {
        return this.selectedKeys.findIndex(selectedItem => selectedItem.itemKey === item.itemKey && selectedItem.columnKey === item.columnKey);
    }
}
Selection.propDecorators = {
    selectedKeys: [{ type: Input }],
    selectionKey: [{ type: Input, args: ["kendoGridSelectBy",] }],
    columnKey: [{ type: Input }],
    selectedKeysChange: [{ type: Output }]
};

const reset = (...lists) => {
    let diff = false;
    for (let idx = 0; idx < lists.length; idx++) {
        const [list, columns] = lists[idx];
        diff = diff || list.length !== columns.length;
        list.reset(columns);
    }
    return diff;
};
/**
 * @hidden
 */
class ColumnsContainer {
    constructor(columns) {
        this.columns = columns;
        this.allColumns = new QueryList();
        this.leafColumns = new QueryList();
        this.lockedColumns = new QueryList();
        this.nonLockedColumns = new QueryList();
        this.lockedLeafColumns = new QueryList();
        this.nonLockedLeafColumns = new QueryList();
        this.totalLevels = 0;
        this.changes = new EventEmitter();
        this.leafColumnsToRender = [];
        this.lockedColumnsToRender = [];
        this.nonLockedColumnsToRender = [];
        this.hasGroupHeaderColumn = false;
        this.hasGroupFooter = false;
        this.hasFooter = false;
        this.unlockedWidth = 0;
    }
    refresh() {
        const currentLevels = this.totalLevels;
        const leafColumns$$1 = new Array();
        const lockedLeafColumns = new Array();
        const nonLockedLeafColumns = new Array();
        const lockedColumns = new Array();
        const nonLockedColumns = new Array();
        const allColumns = new Array();
        const leafColumnsToRender = new Array();
        const lockedColumnsToRender = new Array();
        const nonLockedColumnsToRender = new Array();
        let hasGroupHeaderColumn = false;
        let hasGroupFooter = false;
        let hasFooter = false;
        let unlockedWidth = 0;
        let leafIndex = 0;
        this.totalLevels = 0;
        this.columns().forEach(column => {
            const containerLeafColumns = column.isLocked === true ? lockedLeafColumns : nonLockedLeafColumns;
            const containerColumns = column.isLocked === true ? lockedColumns : nonLockedColumns;
            const toRenderContainer = column.isLocked === true ? lockedColumnsToRender : nonLockedColumnsToRender;
            if (!isColumnGroupComponent(column)) {
                containerLeafColumns.push(column);
                leafColumns$$1.push(column);
                leafColumnsToRender.push.apply(leafColumnsToRender, columnsToRender([column]));
                toRenderContainer.push.apply(toRenderContainer, columnsToRender([column]));
                hasGroupHeaderColumn = hasGroupHeaderColumn || someLeafColumn(leaf => Boolean(leaf.groupHeaderColumnTemplateRef), column);
                hasGroupFooter = hasGroupFooter || someLeafColumn(leaf => Boolean(leaf.groupFooterTemplateRef), column);
                hasFooter = hasFooter || someLeafColumn(leaf => Boolean(leaf.footerTemplateRef), column);
                if (!column.isLocked) {
                    unlockedWidth += column.width || 0;
                }
                if (column.isSpanColumn) {
                    column.childColumns.forEach(c => {
                        c.leafIndex = leafIndex++;
                    });
                }
                else {
                    column.leafIndex = leafIndex++;
                }
            }
            containerColumns.push(column);
            allColumns.push(column);
            this.totalLevels = column.level > this.totalLevels ? column.level : this.totalLevels;
        });
        this.hasGroupHeaderColumn = hasGroupHeaderColumn;
        this.hasGroupFooter = hasGroupFooter;
        this.hasFooter = hasFooter;
        this.leafColumnsToRender = leafColumnsToRender;
        this.lockedColumnsToRender = lockedColumnsToRender;
        this.nonLockedColumnsToRender = nonLockedColumnsToRender;
        this.unlockedWidth = unlockedWidth;
        const changes = reset([this.leafColumns, leafColumns$$1], [this.lockedLeafColumns, lockedLeafColumns], [this.nonLockedLeafColumns, nonLockedLeafColumns], [this.lockedColumns, lockedColumns], [this.allColumns, allColumns], [this.nonLockedColumns, nonLockedColumns]) || currentLevels !== this.totalLevels;
        if (changes) {
            this.changes.emit();
        }
        return changes;
    }
}

const forEachColumn = (list, callback) => {
    list.forEach((column) => {
        callback(column);
        if (column.isColumnGroup && column.hasChildren) {
            forEachColumn(column.childrenArray, callback);
        }
    });
};
const forEachLevel = (list, callback) => {
    sortColumns(list)
        .forEach((column) => {
        callback(column);
        if (column.isColumnGroup && column.hasChildren) {
            forEachLevel(column.childrenArray, callback);
        }
    });
};
const filterHierarchy = (list, predicate) => {
    const result = [];
    sortColumns(list)
        .forEach((column) => {
        if (predicate(column)) {
            if (column.isColumnGroup) {
                const children$$1 = filterHierarchy(column.childrenArray, predicate);
                if (children$$1.length) {
                    result.push(column, ...children$$1);
                }
            }
            else if (!column.isSpanColumn || filterHierarchy(column.childrenArray, predicate).length) {
                result.push(column);
            }
        }
    });
    return result;
};
/**
 * @hidden
 */
class ColumnList {
    constructor(columns) {
        this.columns = columns;
    }
    static empty() {
        return new ColumnList(new QueryList());
    }
    forEach(callback) {
        forEachColumn(this.columns, callback);
    }
    filter(callback) {
        const result = [];
        forEachColumn(this.columns, (column) => {
            if (callback(column)) {
                result.push(column);
            }
        });
        return result;
    }
    filterHierarchy(predicate) {
        return filterHierarchy(this.columns.toArray(), predicate);
    }
    filterSort(callback) {
        const result = [];
        forEachLevel(this.columns.toArray(), (column) => {
            if (callback(column)) {
                result.push(column);
            }
        });
        return result;
    }
    toArray() {
        const result = [];
        forEachColumn(this.columns, (column) => {
            result.push(column);
        });
        return result;
    }
    rootColumns() {
        return this.columns.toArray();
    }
}

/**
 * @hidden
 */
class GroupInfoService {
    constructor() {
        this._columnList = ColumnList.empty;
    }
    get columns() {
        return expandColumns(this._columnList().toArray()).filter(isColumnComponent);
    }
    registerColumnsContainer(columns) {
        this._columnList = columns;
    }
    formatForGroup(item) {
        const column = this.columnForGroup(item);
        return column ? column.format : "";
    }
    isGroupable(groupField) {
        const [column] = this.columns.filter(x => x.field === groupField);
        return column ? column.groupable : true;
    }
    groupTitle(item) {
        const column = this.columnForGroup(item);
        return column ? (column.title || column.field) : this.groupField(item);
    }
    groupHeaderTemplate(item) {
        const column = this.columnForGroup(item);
        return column ? column.groupHeaderTemplateRef || column.groupHeaderColumnTemplateRef : undefined;
    }
    groupField(group) {
        return group.data ? group.data.field : group.field;
    }
    columnForGroup(group) {
        const field = this.groupField(group);
        const [column] = this.columns.filter(x => x.field === field);
        return column;
    }
}

/**
 * @hidden
 */
class ChangeNotificationService {
    constructor(ngZone) {
        this.ngZone = ngZone;
        this.changes = new EventEmitter();
    }
    notify() {
        if (!this.subscription || this.subscription.closed) {
            this.subscription = this.ngZone.onStable
                .asObservable().pipe(take(1))
                .subscribe(() => this.changes.emit());
        }
    }
}
ChangeNotificationService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ChangeNotificationService.ctorParameters = () => [
    { type: NgZone }
];

/**
 * Represents the no-records template of the Grid. Provides an option to customize the
 * appearance of the item that is displayed when no data is present. To define the no-records template,
 * nest an `<ng-template>` tag with the `kendoGridNoRecordsTemplate` directive inside `<kendo-grid>`.
 *
 * > When the locked columns of the Grid are in use, the template is displayed in the non-locked part of the content.
 *
 * @example
 * ```ts-preview
 *
 * _@Component({
 *   selector: 'my-app',
 *   template: `
 *       <kendo-grid [data]="data">
 *         <kendo-grid-column field="ProductID"></kendo-grid-column>
 *         <kendo-grid-column field="ProductName"></kendo-grid-column>
 *         <kendo-grid-column field="UnitPrice"></kendo-grid-column>
 *         <ng-template kendoGridNoRecordsTemplate>
 *            There are not products. <a href="#" (click)="refresh()">Click here to refresh</a>.
 *         </ng-template>
 *       </kendo-grid>
 *   `
 * })
 *
 * class AppComponent {
 *     public data = [];
 *     public refresh() {
 *       this.data = [{
 *            "ProductID": 1,
 *            "ProductName": "Chai",
 *            "UnitPrice": 18.0000,
 *            "Discontinued": false,
 *            "Category": {
 *                "CategoryID": 1,
 *                "CategoryName": "Beverages",
 *                "Description": "Soft drinks, coffees, teas, beers, and ales"
 *            }
 *          }, {
 *            "ProductID": 2,
 *            "ProductName": "Chang",
 *            "UnitPrice": 19.0000,
 *            "Discontinued": false,
 *            "Category": {
 *                "CategoryID": 1,
 *                "CategoryName": "Beverages",
 *                "Description": "Soft drinks, coffees, teas, beers, and ales"
 *            }
 *          }, {
 *            "ProductID": 3,
 *            "ProductName": "Aniseed Syrup",
 *            "UnitPrice": 10.0000,
 *            "Discontinued": false,
 *            "Category": {
 *                "CategoryID": 2,
 *                "CategoryName": "Condiments",
 *                "Description": "Sweet and savory sauces, relishes, spreads, and seasonings"
 *            }
 *        }];
 *
 *     }
 * }
 *
 * ```
 */
class NoRecordsTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
NoRecordsTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoGridNoRecordsTemplate]'
            },] },
];
/** @nocollapse */
NoRecordsTemplateDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] }
];

const set = value => pair => pair.forEach(x => x.style.height = value);
const clearHeight = pairs => pairs
    .filter(([left, right]) => left.style.height || right.style.height)
    .forEach(set(""));
const zip$1 = (arr1, arr2) => {
    const result = [];
    for (let idx = 0, len = arr1.length; idx < len; idx++) {
        if (!arr2[idx]) {
            break;
        }
        result.push([arr1[idx], arr2[idx]]);
    }
    return result;
};
const setHeight = heights => (row, idx) => set(`${heights[idx] + 1}px`)(row);
const getHeights = rows => rows.map(([left, right]) => {
    const height = left.offsetHeight;
    const offsetHeight2 = right.offsetHeight;
    if (height < offsetHeight2) {
        return offsetHeight2;
    }
    return height;
});
/**
 * @hidden
 */
const syncRowsHeight = (table1, table2) => {
    const activeElement = document.activeElement;
    const rows = zip$1(table1.rows, table2.rows);
    clearHeight(rows);
    const heights = getHeights(rows);
    [table1, table2].forEach(x => x.style.display = 'none');
    rows.forEach(setHeight(heights));
    [table1, table2].forEach(x => x.style.display = '');
    if (document.activeElement !== activeElement &&
        (table1.contains(activeElement) || table2.contains(activeElement))) {
        activeElement.focus();
    }
};

/**
 * Represents a service to set the filter descriptor
 * ([see example]({% slug reusablecustomfilters_grid %})).
 */
class FilterService {
    constructor() {
        /**
         * Fires when the filter descriptors is set.
         */
        this.changes = new Subject();
    }
    /**
     * Sets the filter descriptor.
     *
     * @param {CompositeFilterDescriptor} value - The filter descriptor that will be set.
     */
    filter(value) {
        this.changes.next(value);
    }
}

/**
 * Represents the pager template which helps to customize the pager appearance in the Grid. To define a pager
 * template, nest an `<ng-template>` tag with the `kendoPagerTemplate` directive inside `<kendo-grid>`.
 *
 * The template context provides the following fields:
 * * `currentPage`&mdash;The index of the displayed page.
 * * `pageSize`&mdash;The value of the current `pageSize`.
 * * `skip`&mdash;The current skip value.
 * * `total`&mdash;The total number of records.
 * * `totalPages`&mdash;The total number of available pages.
 *
 * @example
 * ```ts-preview
 *
 * _@Component({
 *     selector: 'my-app',
 *     template: `
 *      <kendo-grid
 *        [kendoGridBinding]="gridData"
 *        [pageSize]="1"
 *        [pageable]="true"
 *      >
 *       <kendo-grid-column field="ProductID" title="ID" width="40">
 *       </kendo-grid-column>
 *       <kendo-grid-column field="ProductName" title="Name" width="250">
 *       </kendo-grid-column>
 *       <kendo-grid-column field="UnitPrice" title="Price" width="80" format="{0:c}">
 *       </kendo-grid-column>
 *
 *       <ng-template kendoPagerTemplate let-totalPages="totalPages" let-currentPage="currentPage">
 *          <kendo-pager-prev-buttons></kendo-pager-prev-buttons>
 *          <kendo-pager-numeric-buttons [buttonCount]="10"></kendo-pager-numeric-buttons>
 *          <kendo-pager-next-buttons></kendo-pager-next-buttons>
 *          <kendo-pager-info></kendo-pager-info>
 *          Current page: {{currentPage}}
 *       </ng-template>
 *
 *    </kendo-grid>
 *     `
 * })
 *
 * class AppComponent {
 *     public gridData = [{
 *         "ProductID": 1,
 *         "ProductName": "Chai",
 *         "UnitPrice": 18.0000,
 *         "Discontinued": false
 *       }, {
 *         "ProductID": 2,
 *         "ProductName": "Chang",
 *         "UnitPrice": 19.0000,
 *         "Discontinued": true
 *       }
 *     ];
 * }
 *
 * ```
 */
class PagerTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
PagerTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoPagerTemplate]'
            },] },
];
/** @nocollapse */
PagerTemplateDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] }
];

/**
 * @hidden
 */
class PDFService {
    constructor() {
        this.savePDF = new EventEmitter();
        this.drawPDF = new EventEmitter();
        this.exportClick = new EventEmitter();
        this.dataChanged = new EventEmitter();
    }
    save(component) {
        this.emitEvent(this.savePDF, component);
    }
    draw(component, promise) {
        this.emitEvent(this.drawPDF, { component, promise });
    }
    emitEvent(emitter, args) {
        if (emitter.observers.length === 0) {
            if (isDevMode()) {
                throw new Error('Creating PDF requires including the PDFModule and adding the <kendo-grid-pdf> component.');
            }
        }
        else {
            emitter.emit(args);
        }
    }
}
PDFService.decorators = [
    { type: Injectable },
];

/**
 * Arguments for the `pdfExport` event.
 */
class PDFExportEvent extends PreventableEvent {
}

/**
 * @hidden
 */
class SuspendService {
    constructor() {
        this.scroll = false;
    }
}
SuspendService.decorators = [
    { type: Injectable },
];

/* tslint:disable: object-literal-sort-keys */
const bootstrapToMedia = (media) => (({
    "xs": "(max-width: 576px)",
    "sm": "(min-width: 576px)",
    "md": "(min-width: 768px)",
    "lg": "(min-width: 992px)",
    "xl": "(min-width: 1200px)"
})[media] || media);
/* tslint:enable: object-literal-sort-keys */
const browserMatchMedia = (media) => window.matchMedia(media).matches;
/**
 * @hidden
 */
class ResponsiveService {
    constructor() {
        /**
         * @hidden
         */
        this.matchMedia = browserMatchMedia;
    }
    /**
     * @hidden
     */
    matchesMedia(media) {
        return !media || this.matchMedia(bootstrapToMedia(media));
    }
}
ResponsiveService.decorators = [
    { type: Injectable },
];

/**
 * @hidden
 */
class ExcelService {
    constructor() {
        this.saveToExcel = new EventEmitter();
        this.exportClick = new EventEmitter();
    }
    save(component) {
        if (this.saveToExcel.observers.length === 0) {
            if (isDevMode()) {
                throw new Error('Saving excel requires including the ExcelModule and adding the <kendo-grid-excel> component.');
            }
        }
        else {
            this.saveToExcel.emit(component);
        }
    }
}
ExcelService.decorators = [
    { type: Injectable },
];

/**
 * Represents the toolbar template of the Grid.
 *
 * The template context has the following field:
 * - `position`&mdash;The position at which the toolbar template is rendered. The possible values are "top" and "bottom".
 *
 * @example
 * ```ts-preview
 *
 * _@Component({
 *     selector: 'my-app',
 *     template: `
 *       <div class="example-config">
 *         <input type="radio" id="top" name="position" class="k-radio" value="top" checked (click)="positionChange($event)"/>
 *         <label class="k-radio-label" for="top">Top</label><br/>
 *         <input type="radio" id="bottom" name="position" class="k-radio" value="bottom" (click)="positionChange($event)"/>
 *         <label class="k-radio-label" for="bottom">Bottom</label><br/>
 *         <input type="radio" id="both" name="position" value="both" class="k-radio" (click)="positionChange($event)"/>
 *         <label class="k-radio-label" for="both">Both</label><br/>
 *       </div>
 *       <kendo-grid [data]="gridData" style="height: 200px">
 *            <ng-template kendoGridToolbarTemplate [position]="position" let-position="position">
 *                <button (click)="onClick()" class="k-button">Custom action</button>
 *            </ng-template>
 *            <kendo-grid-column field="ProductName">
 *            </kendo-grid-column>
 *            <kendo-grid-column field="UnitPrice">
 *            </kendo-grid-column>
 *        </kendo-grid>
 *     `
 * })
 *
 * class AppComponent {
 *     public position: 'top' | 'bottom' | 'both' = 'top';
 *
 *     public gridData = [{
 *         "ProductID": 1,
 *         "ProductName": "Chai",
 *         "UnitPrice": 18.0000,
 *         "Discontinued": false
 *       }, {
 *         "ProductID": 2,
 *         "ProductName": "Chang",
 *         "UnitPrice": 19.0000,
 *         "Discontinued": true
 *       }
 *     ];
 *
 *     public onClick(): void {
 *         console.log("button was clicked");
 *     }
 *
 *     public positionChange({ target }): void {
 *        this.position = target.value;
 *     }
 * }
 *
 * ```
 */
class ToolbarTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
        this._position = "top";
    }
    /**
     * The position of the toolbar ([see example]({% slug toolbartemplate_grid %})).
     *
     * The possible values are:
     * - `top`&mdash;Positions the toolbar above the group panel or header.
     * - `bottom`&mdash;Positions the toolbar below the pager.
     * - `both`&mdash;Displays two toolbar instances. Positions the first one above
     * the group panel or header and the second one below the pager.
     */
    set position(position) {
        this._position = position;
    }
    get position() {
        return this._position;
    }
}
ToolbarTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoGridToolbarTemplate]'
            },] },
];
/** @nocollapse */
ToolbarTemplateDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] }
];
ToolbarTemplateDirective.propDecorators = {
    position: [{ type: Input, args: ["position",] }]
};

/**
 * @hidden
 */
class ScrollSyncService {
    constructor(ngZone) {
        this.ngZone = ngZone;
        this.changes = new Subject();
        this.elements = [];
        this.subscriptions = new Subscription();
        this.headerSubscription = new Subscription();
        this.bodySubscription = new Subscription();
        this.subscriptions.add(this.changes.subscribe(args => this.scrollLeft(args)));
    }
    registerEmitter(el, sourceType) {
        this.unregister(sourceType);
        this.elements.push({ element: el, sourceType });
        if (sourceType === "body" || sourceType === "header") {
            this.ngZone.runOutsideAngular(() => {
                const obs = fromEvent(el, "scroll").pipe(map(({ target: { scrollLeft } }) => ({
                    scrollLeft,
                    sourceType
                })));
                const subscription = obs.pipe(distinctUntilChanged((x, y) => (x.scrollLeft === y.scrollLeft)), filter(x => !this.source || this.source === x.sourceType), tap(x => this.source = x.sourceType))
                    .subscribe((x) => this.changes.next(x));
                subscription.add(obs.pipe(filter(x => this.source && this.source !== x.sourceType))
                    .subscribe(() => this.source = undefined));
                if (sourceType === "body") {
                    this.bodySubscription.add(subscription);
                }
                else {
                    this.headerSubscription.add(subscription);
                }
            });
        }
    }
    /**
     * destroy
     */
    destroy() {
        this.subscriptions.unsubscribe();
        this.headerSubscription.unsubscribe();
        this.bodySubscription.unsubscribe();
    }
    scrollLeft({ scrollLeft, sourceType }) {
        this.ngZone.runOutsideAngular(() => {
            this.elements
                .filter(x => sourceType !== x.sourceType)
                .forEach(({ element }) => element.scrollLeft = scrollLeft);
        });
    }
    unregister(sourceType) {
        const index = this.elements.findIndex(x => x.sourceType === sourceType);
        if (index > -1) {
            if (sourceType === "header") {
                this.headerSubscription.unsubscribe();
                this.headerSubscription = new Subscription();
            }
            else if (sourceType === "body") {
                this.bodySubscription.unsubscribe();
                this.bodySubscription = new Subscription();
            }
            this.elements.splice(index, 1);
        }
    }
}
ScrollSyncService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ScrollSyncService.ctorParameters = () => [
    { type: NgZone }
];

/**
 * @hidden
 */
class ResizeService {
    constructor() {
        this.resizeSubscription = new Subscription(() => { });
        this.dispatcher = new Subject();
        // tslint:disable-next-line:member-ordering
        this.changes = this.dispatcher.asObservable().pipe(throttleTime(100));
    }
    connect(resizes) {
        this.resizeSubscription.add(resizes.subscribe(this.dispatcher));
    }
    destroy() {
        if (this.resizeSubscription) {
            this.resizeSubscription.unsubscribe();
        }
    }
}
ResizeService.decorators = [
    { type: Injectable },
];

/**
 * @hidden
 */
const isLocked = column => column.parent ? isLocked(column.parent) : !!column.locked;
/**
 * @hidden
 */
const resizeArgs = (column, extra) => Object.assign({
    columns: leafColumns([column]),
    locked: isLocked(column)
}, extra); // tslint:disable-line:align
/**
 * @hidden
 */
class ColumnResizingService {
    constructor() {
        this.changes = new EventEmitter();
        this.tables = [];
        this.batch = null;
    }
    start(column) {
        this.trackColumns(column);
        const columns = (this.column.isColumnGroup ? [column] : [])
            .concat(leafColumns([column]));
        this.changes.emit({
            columns: columns,
            locked: isLocked(this.column),
            type: 'start'
        });
    }
    resizeColumns(deltaPercent) {
        const action = resizeArgs(this.column, {
            deltaPercent,
            type: 'resizeColumn'
        });
        this.changes.emit(action);
    }
    resizeTable(column, delta) {
        const action = resizeArgs(column, {
            delta,
            type: 'resizeTable'
        });
        this.changes.emit(action);
    }
    resizedColumn(state$$1) {
        this.resizedColumns.push(state$$1);
    }
    end() {
        this.changes.emit({
            columns: [],
            resizedColumns: this.resizedColumns,
            type: 'end'
        });
    }
    registerTable(tableMetadata) {
        this.tables.push(tableMetadata);
        const unregisterTable = () => {
            this.tables.splice(this.tables.indexOf(tableMetadata), 1);
        };
        return unregisterTable;
    }
    measureColumns(info) {
        if (this.batch !== null) {
            this.batch.push(...info);
        }
        else {
            this.autoFitBatch(info, () => this.end());
        }
    }
    autoFit(...columns) {
        const nonLockedColumns = columns.filter(column => !column.isLocked);
        this.autoFitStart(nonLockedColumns);
        this.autoFitBatch(this.batch, () => {
            if (nonLockedColumns.length < columns.length) {
                const lockedColumns = columns.filter(column => column.isLocked);
                this.autoFitStart(lockedColumns);
                this.autoFitBatch(this.batch, () => this.end());
            }
            else {
                this.end();
            }
        });
    }
    trackColumns(column) {
        this.resizedColumns = [];
        this.column = column;
    }
    autoFitStart(columns) {
        this.batch = [];
        this.resizedColumns = [];
        if (columns.length === 0) {
            return;
        }
        const locked = columns[0].isLocked;
        this.changes.emit({
            type: 'start',
            columns,
            locked
        });
        this.changes.emit({
            type: 'triggerAutoFit',
            columns,
            locked
        });
    }
    autoFitBatch(info, onComplete) {
        const locked = info.length > 0 ? info[0].column.isLocked : false;
        const observables = this.tables
            .filter(table => table.locked === locked)
            .map(table => table.autoFit(info));
        zip(...observables)
            .pipe(take(1))
            .subscribe(widths => {
            this.changes.emit({
                columns: info.map(i => i.column),
                type: 'autoFitComplete',
                widths,
                locked
            });
            if (onComplete) {
                onComplete();
            }
        });
        this.batch = null;
    }
}
ColumnResizingService.decorators = [
    { type: Injectable },
];

/**
 * @hidden
 */
/**
 * @hidden
 */
const hasFilterMenu = (settings) => typeof settings === 'string' && settings.indexOf('menu') > -1;
/**
 * @hidden
 */
const hasFilterRow = (settings) => settings === true || (typeof settings === 'string' && settings.indexOf('row') > -1);

const contains$1 = (node, predicate) => {
    while (node) {
        if (predicate(node)) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
};
/**
 * Arguments for the `close` event of the filter and column-menu popup.
 */
class PopupCloseEvent extends PreventableEvent {
    constructor(e) {
        super();
        this.originalEvent = e;
    }
}
const DEFAULT_POPUP_CLASS = 'k-grid-filter-popup';
/**
 * The service that is used for the popups of the filter and column menus
 * ([see example]({% slug reusablecustomfilters_grid %}#toc-filter-menu-with-popup)).
 */
class SinglePopupService {
    constructor(popupService, renderer, ngZone, scrollSyncService, localization) {
        this.popupService = popupService;
        this.renderer = renderer;
        this.ngZone = ngZone;
        this.localization = localization;
        /**
         * Fires when the filter or column menus are about to close because the user clicked outside their popups.
         * Used to prevent the popup from closing.
         */
        this.onClose = new Subject();
        this.scrollSubscription = scrollSyncService.changes.subscribe(() => this.destroy());
    }
    /**
     * @hidden
     */
    open(anchor, template, popupRef, popupClass = DEFAULT_POPUP_CLASS) {
        const toggle = isPresent(popupRef) && this.popupRef === popupRef;
        this.destroy();
        if (!toggle) {
            const direction = this.localization.rtl ? 'right' : 'left';
            this.popupRef = this.popupService.open({
                anchorAlign: { vertical: 'bottom', horizontal: direction },
                popupAlign: { vertical: 'top', horizontal: direction },
                anchor: anchor,
                popupClass: popupClass,
                content: template,
                positionMode: "absolute"
            });
            this.renderer.setAttribute(this.popupRef.popupElement, 'dir', this.localization.rtl ? 'rtl' : 'ltr');
            this.attachClose(anchor);
        }
        return this.popupRef;
    }
    /**
     * @hidden
     */
    destroy() {
        if (this.popupRef) {
            this.detachClose();
            this.popupRef.close();
            this.popupRef = null;
        }
    }
    ngOnDestroy() {
        this.destroy();
        this.scrollSubscription.unsubscribe();
    }
    detachClose() {
        if (this.removeClick) {
            this.removeClick();
        }
    }
    attachClose(skipElement) {
        this.detachClose();
        this.ngZone.runOutsideAngular(() => this.removeClick = this.renderer.listen("document", "click", (e) => {
            if (!contains$1(e.target, x => this.popupRef.popupElement === x || x === skipElement)) {
                const args = new PopupCloseEvent(e);
                this.onClose.next(args);
                if (!args.isDefaultPrevented()) {
                    this.destroy();
                }
            }
        }));
    }
}
SinglePopupService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
SinglePopupService.ctorParameters = () => [
    { type: PopupService },
    { type: Renderer2 },
    { type: NgZone },
    { type: ScrollSyncService },
    { type: LocalizationService }
];

/* tslint:disable: no-bitwise */
/**
 * @hidden
 */
const append = (element) => {
    let appended = false;
    return () => {
        if (!appended) {
            document.body.appendChild(element);
            appended = true;
        }
        return element;
    };
};
/**
 * @hidden
 */
const getDocument = element => element.ownerDocument.documentElement;
/**
 * @hidden
 */
const getWindow = element => element.ownerDocument.defaultView;
/**
 * @hidden
 */
const offset = element => {
    const { clientTop, clientLeft } = getDocument(element);
    const { pageYOffset, pageXOffset } = getWindow(element);
    const { top, left } = element.getBoundingClientRect();
    return {
        top: top + pageYOffset - clientTop,
        left: left + pageXOffset - clientLeft
    };
};
/**
 * @hidden
 * If the target is before the draggable element, returns `true`.
 *
 * DOCUMENT_POSITION_FOLLOWING = 4
 */
const isTargetBefore = (draggable, target) => (target.compareDocumentPosition(draggable) & 4) !== 0;
/**
 * @hidden
 * If the container and the element are the same
 * or if the container holds (contains) the element, returns `true`.
 *
 * DOCUMENT_POSITION_CONTAINED_BY = 16
 */
const contains$2 = (element, container) => element === container ||
    (container.compareDocumentPosition(element) & 16) !== 0;
/**
 * @hidden
 */
const position = (target, before) => {
    const targetRect = offset(target);
    const { offsetWidth, offsetHeight } = target;
    const left = targetRect.left + (before ? 0 : offsetWidth);
    const top = targetRect.top;
    const height = offsetHeight;
    return { left, top, height };
};

/**
 * @hidden
 */
class DragAndDropService {
    constructor() {
        this.changes = new EventEmitter();
        this.register = [];
        this.lastTarget = null;
    }
    add(target) {
        this.register.push(target);
    }
    remove(target) {
        this.register = this.register.filter(current => current !== target);
    }
    notifyDrag(draggable, element, mouseEvent) {
        const target = this.targetFor(element);
        if (this.lastTarget === target) {
            return;
        }
        this.changes.next({
            draggable,
            mouseEvent,
            target: this.lastTarget,
            type: 'leave'
        });
        if (target) {
            this.changes.next({
                draggable,
                mouseEvent,
                target,
                type: 'enter'
            });
        }
        this.lastTarget = target;
    }
    notifyDrop(draggable, mouseEvent) {
        this.changes.next({
            draggable,
            mouseEvent,
            target: this.lastTarget,
            type: 'drop'
        });
        this.lastTarget = null;
    }
    targetFor(element) {
        const comparer = contains$2.bind(null, element);
        return this.register.find(({ element: { nativeElement } }) => comparer(nativeElement));
    }
}
DragAndDropService.decorators = [
    { type: Injectable },
];

const updateClass = (element, valid) => {
    const icon = element.querySelector('.k-icon');
    icon.className = icon.className
        .replace(/(plus|cancel)/, valid ? 'plus' : 'cancel');
};
const updateLock = (element, locked = null) => {
    const icon = element.querySelectorAll('.k-icon')[1];
    const value = locked == null ? '' : (locked ? 'k-i-lock' : 'k-i-unlock');
    icon.className = icon.className
        .replace(/(k-i-unlock|k-i-lock)/, '') + ` ${value}`;
};
const decorate = (element, target) => {
    const targetStyles = getComputedStyle(target);
    element.className = 'k-header k-drag-clue';
    element.style.position = 'absolute';
    element.style.zIndex = '20000';
    element.style.paddingLeft = targetStyles.paddingLeft;
    element.style.paddingTop = targetStyles.paddingTop;
    element.style.paddingBottom = targetStyles.paddingBottom;
    element.style.paddingRight = targetStyles.paddingRight;
    element.style.width = targetStyles.width;
    element.style.height = targetStyles.height;
};
/**
 * @hidden
 */
class DragHintService {
    constructor(santizer) {
        this.santizer = santizer;
    }
    create(down, target, title) {
        this.initCoords(down);
        this.dom = document.createElement("div");
        decorate(this.dom, target);
        const safeTitle = this.santizer.sanitize(SecurityContext.HTML, title);
        this.dom.innerHTML = `
            <span class="k-icon k-drag-status k-i-cancel k-icon-with-modifier">
                <span class="k-icon k-icon-modifier"></span>
            </span>
            ${safeTitle}
        `;
    }
    attach() {
        return append(this.dom);
    }
    remove() {
        if (this.dom && this.dom.parentNode) {
            (function (el) {
                setTimeout(() => document.body.removeChild(el));
            })(this.dom); // hack for IE + pointer events!
            this.dom = null;
        }
    }
    show() {
        this.dom.style.display = "";
    }
    hide() {
        this.dom.style.display = "none";
    }
    enable() {
        updateClass(this.dom, true);
    }
    disable() {
        updateClass(this.dom, false);
    }
    removeLock() {
        updateLock(this.dom);
    }
    toggleLock(locked) {
        updateLock(this.dom, locked);
    }
    move(move) {
        this.dom.style.top = this.initialTop + move.pageY + 'px';
        this.dom.style.left = this.initialLeft + move.pageX + 'px';
    }
    initCoords(down) {
        const { top, left } = offset(down.originalEvent.target);
        this.initialTop = top - down.pageY;
        this.initialLeft = left - down.pageX;
    }
}
DragHintService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
DragHintService.ctorParameters = () => [
    { type: DomSanitizer }
];

/**
 * @hidden
 */
class DropCueService {
    create() {
        this.dom = document.createElement("div");
        this.dom.className = 'k-grouping-dropclue';
        this.hide();
    }
    attach() {
        return append(this.dom);
    }
    remove() {
        if (this.dom && this.dom.parentElement) {
            document.body.removeChild(this.dom);
            this.dom = null;
        }
    }
    hide() {
        this.dom.style.display = "none";
    }
    position({ left, top, height }) {
        this.dom.style.display = 'block';
        this.dom.style.height = height + 'px';
        this.dom.style.top = top + 'px';
        const width = this.dom.offsetWidth / 2;
        this.dom.style.left = left - width + 'px';
    }
}
DropCueService.decorators = [
    { type: Injectable },
];

/**
 * @hidden
 */
class ColumnReorderService {
    constructor() {
        this.changes = new EventEmitter();
    }
    reorder(e) {
        this.changes.emit(e);
    }
}
ColumnReorderService.decorators = [
    { type: Injectable },
];

/**
 * Arguments for the `columnReorder` event.
 */
class ColumnReorderEvent extends PreventableEvent {
    /**
     * @hidden
     */
    constructor({ column, newIndex, oldIndex }) {
        super();
        this.column = column;
        this.newIndex = newIndex;
        this.oldIndex = oldIndex;
    }
}

/**
 * @hidden
 */
class NavigationMetadata {
    constructor(dataRows, headerRows, isVirtual, hasPager, hasDetailTemplate, gridElement, virtualColumns, columns) {
        this.dataRows = dataRows;
        this.headerRows = headerRows;
        this.isVirtual = isVirtual;
        this.hasPager = hasPager;
        this.hasDetailTemplate = hasDetailTemplate;
        this.gridElement = gridElement;
        this.virtualColumns = virtualColumns;
        this.columns = columns;
    }
    get maxLogicalRowIndex() {
        const dataRows = this.hasDetailTemplate ? this.dataRows * 2 : this.dataRows;
        return this.headerRows + dataRows - 1;
    }
}

// Incremented each time the service is instantiated.
let sequence = 0;
/**
 * @hidden
 */
class IdService {
    constructor() {
        this.prefix = `k-grid${sequence++}`;
    }
    cellId(rowIndex, colIndex) {
        return `${this.prefix}-r${rowIndex}c${colIndex}`;
    }
    selectionCheckboxId(itemIndex) {
        return `${this.prefix}-checkbox${itemIndex}`;
    }
    selectAllCheckboxId() {
        return `${this.prefix}-select-all`;
    }
}
IdService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
IdService.ctorParameters = () => [];

/**
 * @hidden
 */
class ColumnInfoService {
    constructor() {
        this.visibilityChange = new EventEmitter();
        this.lockedChange = new EventEmitter();
        this.columnRangeChange = new EventEmitter();
        this.columnsContainer = new ColumnsContainer(() => []);
    }
    get lockedLeafColumns() {
        return this.columnsContainer.lockedLeafColumns;
    }
    get nonLockedLeafColumns() {
        return this.columnsContainer.nonLockedLeafColumns;
    }
    get isLocked() {
        return this.lockedLeafColumns.length > 0;
    }
    get totalLevels() {
        return this.columnsContainer.totalLevels;
    }
    get leafNamedColumns() {
        const columns = expandColumns(this.list().filterSort(column => !column.isColumnGroup))
            .filter(column => column.matchesMedia && column.displayTitle);
        return orderBy(columns, [{ field: 'locked', dir: 'desc' }]);
    }
    get unlockedRootCount() {
        return this.list().rootColumns().filter(column => !column.locked && column.isVisible).length;
    }
    init(columns, list) {
        this.columnsContainer = columns;
        this.list = list;
    }
    changeVisibility(columns) {
        this.visibilityChange.emit(columns);
    }
    changeLocked(columns) {
        this.lockedChange.emit(columns);
    }
}
ColumnInfoService.decorators = [
    { type: Injectable },
];

/**
 * @hidden
 */
class SortService {
    constructor() {
        this.changes = new Subject();
    }
    sort(value) {
        this.changes.next(value);
    }
}

/**
 * Arguments for the `columnVisibilityChange` event.
 */
class ColumnVisibilityChangeEvent {
    /**
     * @hidden
     */
    constructor(columns) {
        this.columns = columns;
    }
}

/**
 * Arguments for the `columnLockedChange` event.
 */
class ColumnLockedChangeEvent {
    /**
     * @hidden
     */
    constructor(columns) {
        this.columns = columns;
    }
}

/**
 * @hidden
 */
const GROUP_CELL_WIDTH = 32; // this should be the value of group-cell inside the theme!

/**
 * @hidden
 */
function defaultTrackBy(index, item) {
    if (item.type === 'data' && item.isEditing) {
        return item.data;
    }
    return index;
}

const createControl = (source) => (acc, key) => {
    acc[key] = new FormControl(source[key]);
    return acc;
};
const validateColumnsField = (columns) => expandColumns(columns.toArray())
    .filter(isColumnComponent)
    .filter(({ field }) => !isValidFieldName(field))
    .forEach(({ field }) => console.warn(`
                Grid column field name '${field}' does not look like a valid JavaScript identifier.
                Identifiers can contain only alphanumeric characters (including "$" or "_"), and may not start with a digit.
                Please use only valid identifier names to ensure error-free operation.
            `));
const handleExpandCollapseService = (service, expandEmitter, collapseEmitter, map$$1) => (service.changes.pipe(filter(({ dataItem }) => isPresent(dataItem)))
    .subscribe((x) => x.expand ? expandEmitter.emit(map$$1(x)) : collapseEmitter.emit(map$$1(x))));
const isInEditedCell = (element, gridElement) => closest(element, matchesClasses('k-grid-edit-cell')) &&
    closest(element, matchesNodeName('kendo-grid')) === gridElement;
const ɵ4$2 = EMPTY_CELL_CONTEXT;
/**
 * Represents the Kendo UI Grid component for Angular.
 *
 * @example
 * ```ts-preview
 * _@Component({
 *    selector: 'my-app',
 *    template: `
 *        <kendo-grid [data]="gridData">
 *        </kendo-grid>
 *    `
 * })
 * class AppComponent {
 *    public gridData: any[] = products;
 * }
 *
 * const products = [{
 *    "ProductID": 1,
 *    "ProductName": "Chai",
 *    "UnitPrice": 18.0000,
 *    "Discontinued": true
 *  }, {
 *    "ProductID": 2,
 *    "ProductName": "Chang",
 *    "UnitPrice": 19.0000,
 *    "Discontinued": false
 *  }
 * ];
 * ```
 */
class GridComponent {
    constructor(supportService, selectionService, cellSelectionService, wrapper, groupInfoService, groupsService, changeNotification, detailsService, editService, filterService, pdfService, responsiveService, renderer, excelService, ngZone, scrollSyncService, domEvents, columnResizingService, changeDetectorRef, columnReorderService, columnInfoService, navigationService, sortService, scrollRequestService, localization) {
        this.supportService = supportService;
        this.selectionService = selectionService;
        this.cellSelectionService = cellSelectionService;
        this.wrapper = wrapper;
        this.groupInfoService = groupInfoService;
        this.groupsService = groupsService;
        this.changeNotification = changeNotification;
        this.detailsService = detailsService;
        this.editService = editService;
        this.filterService = filterService;
        this.pdfService = pdfService;
        this.responsiveService = responsiveService;
        this.renderer = renderer;
        this.excelService = excelService;
        this.ngZone = ngZone;
        this.scrollSyncService = scrollSyncService;
        this.domEvents = domEvents;
        this.columnResizingService = columnResizingService;
        this.changeDetectorRef = changeDetectorRef;
        this.columnReorderService = columnReorderService;
        this.columnInfoService = columnInfoService;
        this.navigationService = navigationService;
        this.sortService = sortService;
        this.scrollRequestService = scrollRequestService;
        /**
         * Sets the data of the Grid. If an array is provided, the Grid automatically gets the total count
         * ([more information and example]({% slug databinding_grid %})).
         */
        this.data = [];
        /**
         * Defines the scroll mode used by the Grid.
         *
         * The available options are:
         *  - `none`&mdash;Renders no scrollbar.
         *  - `scrollable`&mdash;The default scroll mode. It requires the setting of the `height` option.
         *  - `virtual`&mdash;Displays no pager and renders a portion of the data (optimized rendering) while the user is scrolling the content.
         */
        this.scrollable = 'scrollable';
        /**
         * Enables the single-row [selection]({% slug selection_grid %}) of the Grid.
         */
        this.selectable = false;
        /**
         * A function that defines how to track changes for the data rows.
         *
         * By default, the Grid tracks changes by the index of the data item.
         * Edited rows are tracked by reference.
         * In some cases, you might need to override the default behavior,
         * for example, when you implement editing with immutable data items.
         *
         * The following example demonstrates how to track items only by index.
         *
         * @example
         * ```ts
         * import { Component } from '@angular/core';
         * import { GridItem } from '@progress/kendo-angular-grid';
         *
         * _@Component({
         *    selector: 'my-app',
         *    template: `
         *        <kendo-grid [data]="gridData" [trackBy]="trackBy">
         *        </kendo-grid>
         *    `
         * })
         * class AppComponent {
         *    public gridData: any[] = products;
         *
         *    public trackBy(index: number, item: GridItem): any {
         *        console.log(item);
         *        return index;
         *    }
         * }
         *
         * const products = [{
         *    "ProductID": 1,
         *    "ProductName": "Chai",
         *    "UnitPrice": 18.0000,
         *    "Discontinued": true
         *  }, {
         *    "ProductID": 2,
         *    "ProductName": "Chang",
         *    "UnitPrice": 19.0000,
         *    "Discontinued": false
         *  }
         * ];
         * ```
         */
        this.trackBy = defaultTrackBy;
        /**
         * If set to `true`, the grid will render only the columns in the current viewport.
         */
        this.virtualColumns = false;
        /**
         * Enables the [filtering]({% slug filtering_grid %}) of the Grid columns that have their `field` option set.
         */
        this.filterable = false;
        /**
         * Enables the [sorting]({% slug sorting_grid %}) of the Grid columns that have their `field` option set.
         */
        this.sortable = false;
        /**
         * Configures the pager of the Grid ([see example]({% slug paging_grid %})).
         *
         * The available options are:
         * - `buttonCount: Number`&mdash;Sets the maximum numeric buttons count before the buttons are collapsed.
         * - `info: Boolean`&mdash;Toggles the information about the current page and the total number of records.
         * - `type: PagerType`&mdash;Accepts the `numeric` (buttons with numbers) and `input` (input for typing the page number) values.
         * - `pageSizes: Boolean` or `Array<number>`&mdash;Shows a menu for selecting the page size.
         * - `previousNext: Boolean`&mdash;Toggles the **Previous** and **Next** buttons.
         */
        this.pageable = false;
        /**
         * If set to `true`, the user can group the Grid by dragging the column header cells.
         * By default, grouping is disabled ([see example]({% slug groupingbasics_grid %})).
         */
        this.groupable = false;
        /**
         * If set to `true`, the user can use dedicated shortcuts to interact with the Grid.
         * By default, navigation is disabled and the Grid content is accessible in the normal tab sequence.
         */
        this.navigable = false;
        /**
         * Indicates whether the Grid columns will be resized during initialization so that
         * they fit their headers and row content. Defaults to `false`.
         * Columns with `autoSize` set to `false` are excluded.
         * To dynamically update the column width to match the new content,
         * refer to [this example]({% slug resizing_columns_grid %}).
         */
        this.autoSize = false;
        /**
         * If set to `true`, the user can resize columns by dragging the edges (resize handles) of their header cells
         * ([see example]({% slug resizing_columns_grid %})).
         *
         * @default false
         */
        this.resizable = false;
        /**
         * If set to `true`, the user can reorder columns by dragging their header cells
         * ([see example]({% slug reordering_columns_grid %})).
         *
         * @default false
         */
        this.reorderable = false;
        /**
         * Specifies if the loading indicator of the Grid will be displayed ([see example]({% slug databinding_grid %})).
         *
         * @default false
         */
        this.loading = false;
        /**
         * Specifies if the column menu of the columns will be displayed ([see example]({% slug columnmenu_grid %})).
         *
         * @default false
         */
        this.columnMenu = false;
        /**
         * Specifies if the header of the grid will be hidden. The header is visible by default.
         *
         * > The header includes column headers and the [filter row]({% slug filtering_grid %}#toc-filter-row).
         */
        this.hideHeader = false;
        /**
         * Fires when the Grid filter is modified through the UI.
         * You have to handle the event yourself and filter the data.
         */
        this.filterChange = new EventEmitter();
        /**
         * Fires when the page of the Grid is changed ([see example]({% slug paging_grid %})).
         * You have to handle the event yourself and page the data.
         */
        this.pageChange = new EventEmitter();
        /**
         * Fires when the grouping of the Grid is changed.
         * You have to handle the event yourself and group the data ([see example]({% slug groupingbasics_grid %})).
         */
        this.groupChange = new ZoneAwareEventEmitter(this.ngZone);
        /**
         * Fires when the sorting of the Grid is changed ([see example]({% slug sorting_grid %})).
         * You have to handle the event yourself and sort the data.
         */
        this.sortChange = new EventEmitter();
        /**
         * Fires when the user selects a Grid row.
         * Emits the [`SelectionEvent`]({% slug api_grid_selectionevent %}#toc-selectionchange).
         */
        this.selectionChange = new EventEmitter();
        /**
         * Fires when the data state of the Grid is changed.
         */
        this.dataStateChange = new EventEmitter();
        /**
         * Fires when the user expands a group header.
         */
        this.groupExpand = new EventEmitter();
        /**
         * Fires when the user collapses a group header.
         */
        this.groupCollapse = new EventEmitter();
        /**
         * Fires when the user expands a master row.
         */
        this.detailExpand = new EventEmitter();
        /**
         * Fires when the user collapses a master row.
         */
        this.detailCollapse = new EventEmitter();
        /**
         * Fires when the user clicks the **Edit** command button to edit a row
         * ([see example]({% slug editing_template_forms_grid %}#toc-editing-records)).
         */
        this.edit = new EventEmitter();
        /**
         * Fires when the user clicks the **Cancel** command button to close a row
         * ([see example]({% slug editing_template_forms_grid %}#toc-cancelling-editing)).
         */
        this.cancel = new EventEmitter();
        /**
         * Fires when the user clicks the **Save** command button to save changes in a row
         * ([see example]({% slug editing_template_forms_grid %}#toc-saving-records)).
         */
        this.save = new EventEmitter();
        /**
         * Fires when the user clicks the **Remove** command button to remove a row
         * ([see example]({% slug editing_template_forms_grid %}#toc-removing-records)).
         */
        this.remove = new EventEmitter();
        /**
         * Fires when the user clicks the **Add** command button to add a new row
         * ([see example]({% slug editing_template_forms_grid %}#toc-adding-records)).
         */
        this.add = new EventEmitter();
        /**
         * Fires when the user leaves an edited cell ([see example]({% slug editing_incell_grid %}#toc-basic-concepts)).
         */
        this.cellClose = new EventEmitter();
        /**
         * Fires when the user clicks a cell ([see example]({% slug editing_incell_grid %}#toc-basic-concepts)).
         */
        this.cellClick = new ZoneAwareEventEmitter(this.ngZone);
        /**
         * Fires when the user clicks the **Export to PDF** command button.
         */
        this.pdfExport = new EventEmitter();
        /**
         * Fires when the user clicks the **Export to Excel** command button.
         */
        this.excelExport = new EventEmitter();
        /**
         * Fires when the user completes the resizing of the column.
         */
        this.columnResize = new ZoneAwareEventEmitter(this.ngZone);
        /**
         * Fires when the user completes the reordering of the column.
         */
        this.columnReorder = new EventEmitter();
        /**
         * Fires when the user changes the visibility of the columns from the column menu or column chooser.
         */
        this.columnVisibilityChange = new EventEmitter();
        /**
         * Fires when the user changes the locked state of the columns from the column menu or by reordering the columns.
         */
        this.columnLockedChange = new EventEmitter();
        /**
         * Fires when the user scrolls to the last record on the page and enables endless scrolling
         * ([see example]({% slug scrollmmodes_grid %}#toc-endless-scrolling)).
         * You have to handle the event yourself and page the data.
         */
        this.scrollBottom = new EventEmitter();
        /**
         * Fires when the grid content is scrolled.
         * For performance reasons, the event is triggered outside the Angular zone. Enter the Angular zone if you make any changes that require change detection.
         */
        this.contentScroll = new EventEmitter();
        /**
         * A query list of all declared columns.
         */
        this.columns = new QueryList();
        this.footer = new QueryList();
        this.selectionDirective = false;
        this.columnsContainer = new ColumnsContainer(() => this.columnList.filterHierarchy(column => {
            column.matchesMedia = this.matchesMedia(column);
            return column.isVisible;
        }));
        this.view = new DataCollection(() => new DataResultIterator(this.data, this.skip, this.hasGroupFooters));
        this.shouldGenerateColumns = true;
        this._sort = new Array();
        this._group = new Array();
        this._skip = 0;
        this.cachedWindowWidth = 0;
        this._rowSelected = null;
        this._cellSelected = null;
        this.rtl = false;
        this._rowClass = () => null;
        this.localizationSubscription = localization.changes.subscribe(({ rtl }) => {
            this.rtl = rtl;
            this.direction = this.rtl ? 'rtl' : 'ltr';
        });
        this.groupInfoService.registerColumnsContainer(() => this.columnList);
        this.columnInfoService.init(this.columnsContainer, () => this.columnList);
        this.columnVisibilityChangeSubscription = this.columnInfoService.visibilityChange.subscribe((changed) => {
            this.columnVisibilityChange.emit(new ColumnVisibilityChangeEvent(changed));
        });
        this.columnLockedChangeSubscription = this.columnInfoService.lockedChange.subscribe((changed) => {
            this.columnLockedChange.emit(new ColumnLockedChangeEvent(changed));
        });
        this.groupExpandCollapseSubscription = handleExpandCollapseService(groupsService, this.groupExpand, this.groupCollapse, ({ dataItem: group, index }) => ({ group, groupIndex: index }));
        this.detailsServiceSubscription = handleExpandCollapseService(detailsService, this.detailExpand, this.detailCollapse, args => args);
        this.filterSubscription = this.filterService.changes.subscribe(x => {
            this.filterChange.emit(x);
        });
        this.sortSubscription = this.sortService.changes.subscribe(x => {
            this.sortChange.emit(x);
        });
        this.attachStateChangesEmitter();
        this.attachEditHandlers();
        this.attachDomEventHandlers();
        this.pdfSubscription = this.pdfService.exportClick.subscribe(this.emitPDFExportEvent.bind(this));
        this.excelSubscription = this.excelService.exportClick.subscribe(this.saveAsExcel.bind(this));
        this.columnsContainerChange();
        this.handleColumnResize();
        this.columnList = new ColumnList(this.columns);
        this.columnReorderSubscription = this.columnReorderService
            .changes.subscribe(this.reorder.bind(this));
        this.columnRangeChangeSubscription = this.columnInfoService.columnRangeChange.subscribe(this.onColumnRangeChange.bind(this));
    }
    /**
     * Defines the number of records to be skipped by the pager.
     * Required by the [paging]({% slug paging_grid %}) functionality.
     */
    get skip() {
        return this._skip;
    }
    set skip(value) {
        if (value >= 0) {
            this._skip = value;
        }
    }
    /**
     * The descriptors by which the data will be sorted ([see example]({% slug sorting_grid %})).
     */
    set sort(value) {
        if (isArray(value)) {
            this._sort = value;
        }
    }
    get sort() {
        return this._sort;
    }
    /**
     * The descriptors by which the data will be grouped ([see example]({% slug groupingbasics_grid %})).
     */
    set group(value) {
        if (isArray(value)) {
            this._group = value;
        }
    }
    /**
     */
    get group() {
        return this._group;
    }
    /**
     * @hidden
     */
    get showTopToolbar() {
        return this.toolbarTemplate && ['top', 'both'].indexOf(this.toolbarTemplate.position) > -1;
    }
    /**
     * @hidden
     */
    get showBottomToolbar() {
        return this.toolbarTemplate && ['bottom', 'both'].indexOf(this.toolbarTemplate.position) > -1;
    }
    /**
     * @hidden
     */
    get isLocked() {
        return this.lockedLeafColumns.length > 0;
    }
    /**
     * @hidden
     */
    get showPager() {
        return !this.isVirtual && this.pageable !== false;
    }
    /**
     * @hidden
     */
    get showGroupPanel() {
        return this.groupable && this.groupable.enabled !== false;
    }
    /**
     * @hidden
     */
    get groupableEmptyText() {
        return this.groupable.emptyText;
    }
    /**
     * @hidden
     */
    get marqueeSelection() {
        return this.selectionService.enableMarquee || this.cellSelectionService.enableMarquee;
    }
    /**
     * @hidden
     *
     * An alias for `navigable` for users who migrate from Kendo UI for jQuery.
     */
    set navigatable(value) {
        this.navigable = value;
    }
    /**
     * @hidden
     */
    get navigatable() {
        return this.navigable;
    }
    /**
     * Defines a function that is executed for every data row in the component.
     *
     * @example
     * ```ts
     * import { Component, ViewEncapsulation } from '@angular/core';
     * import { RowClassArgs } from '@progress/kendo-angular-grid';
     *
     * _@Component({
     *    selector: 'my-app',
     *    encapsulation: ViewEncapsulation.None,
     *    styles: [`
     *        .k-grid tr.even { background-color: #f45c42; }
     *        .k-grid tr.odd { background-color: #41f4df; }
     *    `],
     *    template: `
     *        <kendo-grid [data]="gridData" [rowClass]="rowCallback">
     *        </kendo-grid>
     *    `
     * })
     * class AppComponent {
     *    public gridData: any[] = products;
     *
     *    public rowCallback(context: RowClassArgs) {
     *        const isEven = context.index % 2 == 0;
     *        return {
     *            even: isEven,
     *            odd: !isEven
     *        };
     *    }
     * }
     *
     * const products = [{
     *    "ProductID": 1,
     *    "ProductName": "Chai",
     *    "UnitPrice": 18.0000,
     *    "Discontinued": true
     *  }, {
     *    "ProductID": 2,
     *    "ProductName": "Chang",
     *    "UnitPrice": 19.0000,
     *    "Discontinued": false
     *  }
     * ];
     * ```
     */
    set rowClass(fn) {
        if (isDevMode && typeof fn !== 'function') {
            throw new Error(`rowClass must be a function, but received ${JSON.stringify(fn)}.`);
        }
        this._rowClass = fn;
    }
    get rowClass() {
        return this._rowClass;
    }
    /**
     * Defines a Boolean function that is executed for each data row in the component
     * ([see example]({% slug selection_grid %}#toc-setting-the-selected-rows)).
     * Determines whether the row will be selected.
     */
    set rowSelected(fn) {
        if (isDevMode && typeof fn !== 'function') {
            throw new Error(`rowSelected must be a function, but received ${JSON.stringify(fn)}.`);
        }
        this._rowSelected = fn;
    }
    get rowSelected() {
        return this._rowSelected;
    }
    /**
     * Defines a function that determines the selected state of a data cell.
     * Returns an object with `selected` and `item` properties.
     * The cell is marked as selected only if the `selected` property equals `true`.
     *
     * The function is executed for each data cell and may be called more than once
     * as part of a change detection cycle. ([see example]({% slug grid_selection_custom %}toc-setting-the-selected-cells))
     */
    set cellSelected(fn) {
        if (isDevMode && typeof fn !== 'function') {
            throw new Error(`cellSelected must be a function, but received ${JSON.stringify(fn)}.`);
        }
        this._cellSelected = fn;
    }
    get cellSelected() {
        return this._cellSelected;
    }
    /**
     * Returns the currently focused cell (if any).
     */
    get activeCell() {
        return this.navigationService.activeCell;
    }
    /**
     * Returns the currently focused row (if any).
     */
    get activeRow() {
        return this.navigationService.activeRow;
    }
    get dir() {
        return this.direction;
    }
    get hostClasses() {
        return true;
    }
    get lockedClasses() {
        return this.lockedLeafColumns.length > 0;
    }
    get virtualClasses() {
        return this.isVirtual;
    }
    get noScrollbarClass() {
        return this.scrollbarWidth === 0;
    }
    get detailTemplate() {
        if (this._customDetailTemplate) {
            return this._customDetailTemplate;
        }
        return this.detailTemplateChildren ? this.detailTemplateChildren.first : undefined;
    }
    set detailTemplate(detailTemplate) {
        this._customDetailTemplate = detailTemplate;
    }
    get noRecordsTemplate() {
        if (this._customNoRecordsTemplate) {
            return this._customNoRecordsTemplate;
        }
        return this.noRecordsTemplateChildren ? this.noRecordsTemplateChildren.first : undefined;
    }
    set noRecordsTemplate(customNoRecordsTemplate) {
        this._customNoRecordsTemplate = customNoRecordsTemplate;
    }
    get pagerTemplate() {
        if (this._customPagerTemplate) {
            return this._customPagerTemplate;
        }
        return this.pagerTemplateChildren ? this.pagerTemplateChildren.first : undefined;
    }
    set pagerTemplate(customPagerTemplate) {
        this._customPagerTemplate = customPagerTemplate;
    }
    get toolbarTemplate() {
        if (this._customToolbarTemplate) {
            return this._customToolbarTemplate;
        }
        return this.toolbarTemplateChildren ? this.toolbarTemplateChildren.first : undefined;
    }
    set toolbarTemplate(customToolbarTemplate) {
        this._customToolbarTemplate = customToolbarTemplate;
    }
    get scrollbarWidth() {
        return this.supportService.scrollbarWidth;
    }
    get headerPadding() {
        if (isUniversal()) {
            return "";
        }
        const padding = Math.max(0, this.scrollbarWidth - 1) + 'px';
        const right = this.rtl ? 0 : padding;
        const left = this.rtl ? padding : 0;
        return `0 ${right} 0 ${left}`;
    }
    get hasGroupFooters() {
        return this.columnsContainer.hasGroupFooter;
    }
    get showFooter() {
        return this.columnsContainer.hasFooter;
    }
    get showGroupFooters() {
        return this.groupable && this.groupable.showFooter;
    }
    get ariaRowCount() {
        return this.totalColumnLevels + 1 + this.view.total;
    }
    get ariaColCount() {
        return this.columnsContainer.leafColumnsToRender.length;
    }
    get isVirtual() {
        return this.scrollable === 'virtual';
    }
    get isScrollable() {
        return this.scrollable !== 'none';
    }
    get visibleColumns() {
        return this.columnsContainer.allColumns;
    }
    get lockedColumns() {
        return this.columnsContainer.lockedColumns;
    }
    get nonLockedColumns() {
        return this.columnsContainer.nonLockedColumns;
    }
    get lockedLeafColumns() {
        return this.columnsContainer.lockedLeafColumns;
    }
    get nonLockedLeafColumns() {
        return this.columnsContainer.nonLockedLeafColumns;
    }
    get leafColumns() {
        return this.columnsContainer.leafColumns;
    }
    get totalColumnLevels() {
        return this.columnsContainer.totalLevels;
    }
    get headerColumns() {
        if (this.virtualColumns && !this.pdfService.exporting) {
            return this.viewportColumns;
        }
        return this.nonLockedColumns;
    }
    get headerLeafColumns() {
        if (this.virtualColumns && !this.pdfService.exporting) {
            return this.leafViewportColumns;
        }
        return this.nonLockedLeafColumns;
    }
    get lockedWidth() {
        const groupCellsWidth = this.group.length * GROUP_CELL_WIDTH;
        return expandColumns(this.lockedLeafColumns.toArray()).reduce((prev, curr) => prev + (curr.width || 0), groupCellsWidth);
    }
    get nonLockedWidth() {
        if ((!this.rtl && this.lockedLeafColumns.length) || this.virtualColumns) {
            return !this.virtualColumns ? this.columnsContainer.unlockedWidth :
                this.leafViewportColumns.reduce((acc, column) => acc + (column.width || 0), 0);
        }
        return undefined;
    }
    get selectableSettings() {
        if (this.selectionService) {
            return this.selectionService.options;
        }
        return undefined;
    }
    get columnMenuTemplate() {
        const template = this.columnMenuTemplates.first;
        return template ? template.templateRef : null;
    }
    get totalCount() {
        if (this.isVirtual || !isPresent(this.pageSize)) {
            return this.view.total;
        }
        return this.pageSize;
    }
    /**
     * Expands the specified master row ([see example]({% slug hierarchy_grid %})).
     *
     * This method is provided only for backwards-compatibility with legacy versions.
     * These versions tracked the expanded state internally using the data row index.
     *
     * For new development, use the [`kendoGridDetailsExpandBy` directive]({% slug api_grid_expanddetailsdirective %})
     * or provide an isDetailExpanded callback. See [Controlling the Expanded State]({% slug master_detail_expanded_state_grid %})
     * for examples on how to control the expanded state.
     *
     * @param index - The data row index of the master row.
     */
    expandRow(index) {
        this.toggleDetailRowLegacy(index, true);
    }
    /**
     * Collapses the specified master row ([see example]({% slug hierarchy_grid %})).
     *
     * This method is provided only for backwards-compatibility with legacy versions.
     * These versions tracked the expanded state internally using the data row index.
     *
     * For new development, use the [`kendoGridDetailsExpandBy` directive]({% slug api_grid_expanddetailsdirective %})
     * or provide an isDetailExpanded callback. See [Controlling the Expanded State]({% slug master_detail_expanded_state_grid %})
     * for examples on how to control the expanded state.
     *
     * @param index - The data row index of the master row.
     */
    collapseRow(index) {
        this.toggleDetailRowLegacy(index, false);
    }
    /**
     * Expands a group header item for the given index. For example,
     * `0_1` expands the second inner group of the first master group.
     *
     * > * When you use the [`kendoGridGroupBinding`]({% slug api_grid_groupbindingdirective %}) directive,
     * > the `expandGroup` method is not supported.
     * > * When a Grid is pageable, the indexes of the groups are offset by the current Grid [`skip`]({% slug api_grid_gridcomponent %}#toc-skip).
     *
     * @param {string} index - The underscore separated hierarchical index of the group.
     */
    expandGroup(index) {
        if (!this.groupsService.isExpanded(index)) {
            this.groupsService.toggleRow(index, null);
        }
    }
    /**
     * Collapses a group header item for the given index. For example,
     * `0_1` collapses the second inner group of the first master group.
     *
     * > * When you use the [`kendoGridGroupBinding`]({% slug api_grid_groupbindingdirective %}) directive,
     * > the `collapseGroup` method is not supported.
     * > * When a Grid is pageable, the indexes of the groups are offset by the current Grid [`skip`]({% slug api_grid_gridcomponent %}#toc-skip).
     *
     * @param {string} index - The underscore separated hierarchical index of the group.
     */
    collapseGroup(index) {
        if (this.groupsService.isExpanded(index)) {
            this.groupsService.toggleRow(index, null);
        }
    }
    /**
     * @hidden
     */
    resetGroupsState() {
        this.groupsService.reset();
    }
    /**
     * @hidden
     */
    expandGroupChildren(groupIndex) {
        this.groupsService.expandChildren(groupIndex);
    }
    /**
     * @hidden
     */
    onDataChange() {
        this.autoGenerateColumns();
        this.changeNotification.notify();
        this.pdfService.dataChanged.emit();
        if (isPresent(this.defaultSelection)) {
            this.defaultSelection.reset();
        }
        this.initSelectionService();
        this.updateNavigationMetadata();
    }
    ngOnChanges(changes) {
        if (isChanged("data", changes)) {
            this.onDataChange();
        }
        if (this.lockedLeafColumns.length && anyChanged(["pageSize", "skip", "sort", "group"], changes)) {
            this.changeNotification.notify();
        }
        if (anyChanged(["pageSize", "scrollable", 'virtualColumns'], changes)) {
            this.updateNavigationMetadata();
        }
        if (isChanged("virtualColumns", changes)) {
            this.viewportColumns = this.leafViewportColumns = null;
        }
        if (isChanged("height", changes, false)) {
            this.renderer.setStyle(this.wrapper.nativeElement, 'height', `${this.height}px`);
        }
        if (isChanged("filterable", changes) && this.lockedColumns.length) {
            this.syncHeaderHeight(this.ngZone.onStable.asObservable().pipe(take(1)));
        }
        if (anyChanged(["columnMenu", "sortable", "filterable"], changes, false)) {
            this.columnMenuOptions = this.columnMenu && Object.assign({
                filter: Boolean(this.filterable),
                sort: Boolean(this.sortable)
            }, this.columnMenu); // tslint:disable-line:align
        }
        if (isChanged("scrollable", changes) && this.isScrollable) {
            this.ngZone.onStable.pipe(take(1)).subscribe(() => this.attachScrollSync());
        }
        if (isChanged("selectable", changes) && this.shouldResetSelection(changes.selectable)) {
            if (this.defaultSelection) {
                this.defaultSelection.reset();
            }
            else if (this.selectionDirective) {
                this.selectionDirective.reset();
            }
        }
    }
    ngAfterViewInit() {
        this.attachScrollSync();
        this.attachElementEventHandlers();
        this.updateNavigationMetadata();
        this.applyAutoSize();
    }
    ngAfterContentChecked() {
        this.columnsContainer.refresh();
        this.verifySettings();
        this.initSelectionService();
    }
    ngAfterContentInit() {
        this.shouldGenerateColumns = !this.columns.length;
        this.autoGenerateColumns();
        this.columnList = new ColumnList(this.columns);
        this.columnsChangeSubscription = this.columns.changes.subscribe(() => this.verifySettings());
    }
    ngOnInit() {
        if (this.navigable) {
            this.navigationService.init(this.navigationMetadata());
        }
    }
    ngOnDestroy() {
        if (this.selectionSubscription) {
            this.selectionSubscription.unsubscribe();
        }
        if (this.stateChangeSubscription) {
            this.stateChangeSubscription.unsubscribe();
        }
        if (this.groupExpandCollapseSubscription) {
            this.groupExpandCollapseSubscription.unsubscribe();
        }
        if (this.detailsServiceSubscription) {
            this.detailsServiceSubscription.unsubscribe();
        }
        if (this.editServiceSubscription) {
            this.editServiceSubscription.unsubscribe();
        }
        if (this.pdfSubscription) {
            this.pdfSubscription.unsubscribe();
        }
        if (this.filterSubscription) {
            this.filterSubscription.unsubscribe();
        }
        if (this.sortSubscription) {
            this.sortSubscription.unsubscribe();
        }
        if (this.columnsChangeSubscription) {
            this.columnsChangeSubscription.unsubscribe();
        }
        if (this.excelSubscription) {
            this.excelSubscription.unsubscribe();
        }
        if (this.columnsContainerChangeSubscription) {
            this.columnsContainerChangeSubscription.unsubscribe();
        }
        if (this.scrollSyncService) {
            this.scrollSyncService.destroy();
        }
        if (this.detachElementEventHandlers) {
            this.detachElementEventHandlers();
        }
        if (this.defaultSelection) {
            this.defaultSelection.destroy();
        }
        if (this.cellClickSubscription) {
            this.cellClickSubscription.unsubscribe();
        }
        if (this.footerChangeSubscription) {
            this.footerChangeSubscription.unsubscribe();
        }
        this.ngZone = null;
        if (this.columnResizingSubscription) {
            this.columnResizingSubscription.unsubscribe();
        }
        if (this.columnReorderSubscription) {
            this.columnReorderSubscription.unsubscribe();
        }
        if (this.localizationSubscription) {
            this.localizationSubscription.unsubscribe();
        }
        if (this.columnVisibilityChangeSubscription) {
            this.columnVisibilityChangeSubscription.unsubscribe();
        }
        if (this.columnLockedChangeSubscription) {
            this.columnLockedChangeSubscription.unsubscribe();
        }
        if (this.focusElementSubscription) {
            this.focusElementSubscription.unsubscribe();
        }
        this.columnRangeChangeSubscription.unsubscribe();
    }
    /**
     * @hidden
     */
    attachScrollSync() {
        if (isUniversal()) {
            return;
        }
        if (this.header) {
            this.scrollSyncService.registerEmitter(this.header.nativeElement, "header");
        }
        if (this.footer) {
            this.footerChangeSubscription = observe(this.footer)
                .subscribe(footers => footers
                .map(footer => footer.nativeElement)
                .filter(isPresent)
                .forEach(element => this.scrollSyncService.registerEmitter(element, "footer")));
        }
    }
    /**
     * Switches the specified table row in the edit mode ([see example]({% slug editing_template_forms_grid %}#toc-editing-records)).
     *
     * @param rowIndex - The data row index that will be switched in the edit mode.
     * @param group - The [`FormGroup`]({{ site.data.urls.angular['formgroupapi'] }})
     * that describes the edit form.
     * @param options - Additional options configuring the focus target once the editor opens.
     */
    editRow(rowIndex, group, options) {
        this.editService.editRow(rowIndex, group);
        if (isPresent(options) && options.skipFocus) {
            return;
        }
        const row = `tr[data-kendo-grid-item-index="${rowIndex}"]`;
        const columnIndex = options && options.columnIndex;
        const target = isNaN(columnIndex) ? row : `${row} td[data-kendo-grid-column-index="${columnIndex}"]`;
        this.focusEditElement(target);
    }
    /**
     * Closes the editor for a given row ([see example]({% slug editing_template_forms_grid %}#toc-cancelling-editing)).
     *
     * @param {number} index - The row index that will be switched out of the edit mode. If no index is provided, it is assumed
     * that the new item editor will be closed.
     */
    closeRow(index) {
        this.editService.close(index);
    }
    /**
     * Creates a new row editor ([see example]({% slug editing_template_forms_grid %}#toc-adding-records)).
     *
     * @param {FormGroup} group - The [`FormGroup`]({{ site.data.urls.angular['formgroupapi'] }}) that describes
     * the edit form. If called with a data item, it will build the `FormGroup` from the data item fields.
     */
    addRow(group) {
        const isFormGroup = group instanceof FormGroup;
        if (!isFormGroup) {
            const fields = Object.keys(group).reduce(createControl(group), {}); // FormBuilder?
            group = new FormGroup(fields);
        }
        this.editService.addRow(group);
        this.focusEditElement('.k-grid-add-row');
    }
    /**
     * Puts the cell that is specified by the table row and column in edit mode.
     *
     * @param {number} rowIndex - The data row index that will be switched in the edit mode.
     * @param {number|string|any} column - The leaf column index, or the field name or the column instance that should be edited.
     * @param {FormGroup} group - The [`FormGroup`]({{ site.data.urls.angular['formgroupapi'] }})
     * that describes the edit form.
     */
    editCell(rowIndex, column, group) {
        const instance = this.columnInstance(column);
        this.editService.editCell(rowIndex, instance, group);
        this.focusEditElement('.k-grid-edit-cell');
    }
    /**
     * Closes the current cell in edit mode and fires
     * the [`cellClose`]({% slug api_grid_gridcomponent %}#toc-cellclose) event.
     *
     * @return {boolean} Indicates whether the edited cell was closed.
     * A `false` value indicates that the
     * [`cellClose`]({% slug api_grid_gridcomponent %}#toc-cellclose) event was prevented.
     */
    closeCell() {
        return !this.editService.closeCell();
    }
    /**
     * Closes the current cell in edit mode.
     */
    cancelCell() {
        this.editService.cancelCell();
    }
    /**
     * Returns a flag which indicates if a row or a cell is currently edited.
     *
     * @return {boolean} A flag which indicates if a row or a cell is currently edited.
     */
    isEditing() {
        return this.editService.isEditing();
    }
    /**
     * Returns a flag which indicates if a cell is currently edited.
     *
     * @return {boolean} A flag which indicates if a cell is currently being edited.
     */
    isEditingCell() {
        return this.editService.isEditingCell();
    }
    /**
     * Initiates the PDF export ([see example]({% slug pdfexport_grid %})).
     */
    saveAsPDF() {
        this.pdfService.save(this);
    }
    /**
     * Exports the Grid element to a Drawing [`Group`]({% slug api_kendo-drawing_group %}) by using the `kendo-grid-pdf` component options.
     * ([see example]({% slug pdfexport_grid %}#toc-exporting-multiple-grids-to-the-same-pdf)).
     *
     * @return {Promise} - A promise that will be resolved with the Drawing `Group`.
     */
    drawPDF() {
        const promise = createPromise();
        this.pdfService.draw(this, promise);
        return promise;
    }
    /**
     * Initiates the Excel export ([see example]({% slug excelexport_grid %})).
     */
    saveAsExcel() {
        this.excelService.save(this);
    }
    /**
     * Applies the minimum possible width for the specified column,
     * so that the whole text fits without wrapping. This method expects the Grid
     * to be resizable (set `resizable` to `true`).
     * Makes sense to execute this method only
     * after the Grid is already populated with data.
     *
     * @example
     * ```ts
     * _@Component({
     *    selector: 'my-app',
     *    template: `
     *        <kendo-grid
     *            #grid
     *            [data]="gridData"
     *            [resizable]="true"
     *            style="height: 300px">
     *            <ng-template kendoGridToolbarTemplate>
     *                 <button class="k-button" (click)="grid.autoFitColumn(groupColumn)">
     *                     Auto-fit the group column
     *                 </button>
     *            </ng-template>
     *            <kendo-grid-column-group #groupColumn title="Product Info">
     *                <kendo-grid-column
     *                    field="ProductID"
     *                    [width]="50"
     *                    [minResizableWidth]="30"
     *                    title="ID">
     *                </kendo-grid-column>
     *
     *                <kendo-grid-column
     *                    field="ProductName"
     *                    title="Product Name">
     *                </kendo-grid-column>
     *            </kendo-grid-column-group>
     *
     *            <kendo-grid-column
     *                field="UnitPrice"
     *                title="Unit Price"
     *                [width]="180"
     *                filter="numeric"
     *                format="{0:c}">
     *            </kendo-grid-column>
     *        </kendo-grid>
     *    `
     * })
     * class AppComponent {
     *    public gridData: any[] = products;
     * }
     *
     * const products = [{
     *    "ProductID": 1,
     *    "ProductName": "Chai",
     *    "UnitPrice": 18.0000,
     *    "Discontinued": true
     *  }, {
     *    "ProductID": 2,
     *    "ProductName": "Chang",
     *    "UnitPrice": 19.0000,
     *    "Discontinued": false
     *  }
     * ];
     * ```
     */
    autoFitColumn(column) {
        this.columnResizingService.autoFit(column);
    }
    /**
     * Adjusts the width of the specified columns to fit the entire content, including headers, without wrapping.
     * If no columns are specified, `autoFitColumns` is applied to all columns.
     *
     * This method requires the Grid to be resizable (set `resizable` to `true`).
     *
     * @example
     * ```ts
     * _@Component({
     *    selector: 'my-app',
     *    template: `
     *      <kendo-grid
     *          #grid
     *          [data]="gridData"
     *          [resizable]="true"
     *          style="height: 300px">
     *          <ng-template kendoGridToolbarTemplate>
     *              <button class="k-button" (click)="grid.autoFitColumns([firstColumn, lastColumn])">
     *                  Auto-fit the first and last column
     *              </button>
     *              <button class="k-button" (click)="grid.autoFitColumns()">
     *                  Auto-fit all columns
     *              </button>
     *          </ng-template>
     *          <kendo-grid-column-group title="Product Info">
     *              <kendo-grid-column
     *                  #firstColumn
     *                  field="ProductID"
     *                  [width]="50"
     *                  [minResizableWidth]="30"
     *                  title="ID">
     *              </kendo-grid-column>
     *
     *              <kendo-grid-column
     *                  field="ProductName"
     *                  title="Product Name"
     *                  >
     *              </kendo-grid-column>
     *          </kendo-grid-column-group>
     *
     *          <kendo-grid-column
     *              #lastColumn
     *              field="UnitPrice"
     *              title="Unit Price"
     *              [width]="180"
     *              filter="numeric"
     *              format="{0:c}">
     *          </kendo-grid-column>
     *      </kendo-grid>
     *    `
     * })
     * class AppComponent {
     *    public gridData: any[] = products;
     * }
     *
     * const products = [{
     *    "ProductID": 1,
     *    "ProductName": "Chai",
     *    "UnitPrice": 18.0000,
     *    "Discontinued": true
     *  }, {
     *    "ProductID": 2,
     *    "ProductName": "Chang",
     *    "UnitPrice": 19.0000,
     *    "Discontinued": false
     *  }
     * ];
     * ```
     */
    autoFitColumns(columns = this.columns) {
        let cols;
        if (columns instanceof QueryList) {
            cols = columns.toArray();
        }
        else {
            cols = columns;
        }
        this.columnResizingService.autoFit(...cols);
    }
    /**
     * @hidden
     */
    notifyPageChange(source, event) {
        if (source === "list" && !this.isVirtual) {
            return;
        }
        this.pageChange.emit(event);
    }
    /**
     * @hidden
     */
    notifyScrollBottom() {
        if (this.scrollable === 'none') {
            return;
        }
        if (hasObservers(this.scrollBottom)) {
            this.ngZone.run(() => this.scrollBottom.emit({ sender: this }));
        }
    }
    /**
     * @hidden
     */
    focusEditElement(containerSelector) {
        if (this.focusElementSubscription) {
            this.focusElementSubscription.unsubscribe();
        }
        this.ngZone.runOutsideAngular(() => {
            this.focusElementSubscription = this.ngZone.onStable.asObservable().pipe(take(1)).subscribe(() => {
                const wrapper = this.wrapper.nativeElement;
                if (!this.setEditFocus(wrapper.querySelector(containerSelector)) && this.isLocked) {
                    this.setEditFocus(wrapper.querySelector(`.k-grid-content ${containerSelector}`));
                }
                this.focusElementSubscription = null;
            });
        });
    }
    /**
     * Focuses the last active or the first cell of the Grid.
     *
     * @returns {NavigationCell} The focused cell.
     */
    focus() {
        this.assertNavigable();
        return this.navigationService.focusCell();
    }
    /**
     * Focuses the cell with the specified row and column index.
     *
     * The row index is based on the logical structure of the Grid and does not correspond to the data item index:
     * * Header rows are included, starting at index 0.
     * * Group headers and footers are included.
     * * The row indexing is absolute and does not change with paging.
     *
     * If the Grid is configured for scrolling, including virtual scrolling, the scroll position will be updated.
     * If the row is not present on the current page, the method will have no effect.
     *
     * @param rowIndex - The logical row index to focus. The top header row has an index 0.
     * @param colIndex - The column index to focus.
     * @returns {NavigationCell} The focused cell.
     *
     */
    focusCell(rowIndex, colIndex) {
        this.assertNavigable();
        return this.navigationService.focusCell(rowIndex, colIndex);
    }
    /**
     * Focuses the next cell, optionally wrapping to the next row.
     *
     * @param wrap - A Boolean value which indicates if the focus will move to the next row. Defaults to `true`.
     * @returns {NavigationCell} The focused cell. If the focus is already on the last cell, returns `null`.
     */
    focusNextCell(wrap = true) {
        this.assertNavigable();
        return this.navigationService.focusNextCell(wrap);
    }
    /**
     * Focuses the previous cell. Optionally wraps to the previous row.
     *
     * @param wrap - A Boolean value which indicates if the focus will move to the next row. Defaults to `true`.
     * @returns {NavigationCell} The focused cell. If the focus is already on the first cell, returns `null`.
     */
    focusPrevCell(wrap = true) {
        this.assertNavigable();
        return this.navigationService.focusPrevCell(wrap);
    }
    /**
     * Scrolls to the specified row and column
     */
    scrollTo(request) {
        this.scrollRequestService.scrollTo(request);
    }
    /**
     * Changes the position of the specified column.
     * The reordering of columns operates only on the level
     * which is inferred by the source column.
     * For the `reorderColumn` method to work properly,
     * the `source` column has to be visible.
     *
     * @param {ColumnBase} source - The column whose position will be changed.
     * @param {number} destIndex - The new position of the column.
     * @param {ColumnReorderConfig} options - Additional options.
     *
     * @example
     * ```ts
     * _@Component({
     *    selector: 'my-app',
     *    template: `
     *        <kendo-grid
     *            #grid
     *            [data]="gridData"
     *            [reorderable]="true"
     *            style="height: 300px">
     *            <ng-template kendoGridToolbarTemplate>
     *                 <button class="k-button"
     *                     (click)="grid.reorderColumn(groupColumn, 2, { before: true })">
     *                     Move the group column before the last one.
     *                 </button>
     *            </ng-template>
     *            <kendo-grid-column-group #groupColumn title="Product Info">
     *                <kendo-grid-column
     *                    field="ProductID"
     *                    [width]="50"
     *                    title="ID">
     *                </kendo-grid-column>
     *
     *                <kendo-grid-column
     *                    field="ProductName"
     *                    title="Product Name">
     *                </kendo-grid-column>
     *            </kendo-grid-column-group>
     *
     *            <kendo-grid-column
     *                field="UnitPrice"
     *                title="Unit Price"
     *                [width]="180"
     *                format="{0:c}">
     *            </kendo-grid-column>
     *
     *            <kendo-grid-column
     *                field="Discontinued"
     *                title="Discontinued"
     *                [width]="100">
     *            </kendo-grid-column>
     *        </kendo-grid>
     *    `
     * })
     * class AppComponent {
     *    public gridData: any[] = products;
     * }
     *
     * const products = [{
     *    "ProductID": 1,
     *    "ProductName": "Chai",
     *    "UnitPrice": 18.0000,
     *    "Discontinued": true
     *  }, {
     *    "ProductID": 2,
     *    "ProductName": "Chang",
     *    "UnitPrice": 19.0000,
     *    "Discontinued": false
     *  }
     * ];
     * ```
     */
    reorderColumn(source, destIndex, options = { before: false }) {
        const columnsForLevel = this.columnsForLevel(source.level);
        let target = columnsForLevel[destIndex];
        if (!target) {
            return;
        }
        const lastNonLocked = target.isLocked &&
            !source.isLocked &&
            this.columnsContainer.nonLockedColumns.length === 1;
        if (lastNonLocked) {
            return;
        }
        if (isSpanColumnComponent(target) && !options.before) {
            target = target.childColumns.last;
        }
        this.reorder({
            before: options.before,
            source: source,
            target: target
        });
    }
    /**
     * A function which determines if a specific row is expanded.
     */
    set isDetailExpanded(callback) {
        this.detailsService.userCallback = callback;
    }
    get isDetailExpanded() {
        return this.detailsService.userCallback;
    }
    /**
     * @hidden
     */
    reorder({ target, source, before, changeContainer }) {
        this.ngZone.run(() => {
            const columnsForLevel = this.columnsForLevel(source.level);
            let newIndex = columnsForLevel.indexOf(target);
            if (target.parent && target.parent.isSpanColumn) {
                newIndex = columnsForLevel.indexOf(target.parent);
                if (before) {
                    target = target.parent;
                }
            }
            let oldIndex = columnsForLevel.indexOf(source);
            if (changeContainer) {
                if (before && 0 < newIndex && oldIndex < newIndex) { // dropped before the first not locked column
                    newIndex--;
                }
                else if (!before && oldIndex > newIndex) { // dropped after the last locked column
                    newIndex++;
                }
            }
            const args = new ColumnReorderEvent({
                column: source,
                oldIndex: oldIndex,
                newIndex: newIndex
            });
            this.columnReorder.emit(args);
            if (args.isDefaultPrevented()) {
                return;
            }
            if (changeContainer) {
                this.columnLockedChange.emit(new ColumnLockedChangeEvent([source]));
            }
            this.updateColumnIndices({ source, target, before });
            if (source.locked !== target.locked) {
                source.locked = target.locked;
            }
            this.columnsContainer.refresh();
            this.changeDetectorRef.markForCheck();
        });
    }
    updateColumnIndices({ source, target, before }) {
        const expandedColumns = expandColumnsWithSpan(this.columnsForLevel(source.level));
        const sourceColumnIndex = expandedColumns.indexOf(source);
        let nextSourceIndex = 0;
        let nextIndex = 0;
        let toSkip = 1;
        // Possible only when called from the API.
        if (source.isSpanColumn) {
            toSkip += source.childColumns.length;
        }
        let i = 0;
        while (i < expandedColumns.length) {
            let column = expandedColumns[i];
            if (column === target) {
                nextSourceIndex = before ? nextIndex : nextIndex + 1;
                nextIndex = before ? nextIndex + toSkip : nextIndex;
                column.orderIndex = nextIndex;
                if (nextSourceIndex === nextIndex + 1) {
                    nextIndex += toSkip;
                }
            }
            else if (column === source) {
                i += toSkip;
                continue;
            }
            else {
                column.orderIndex = nextIndex;
            }
            nextIndex++;
            i++;
        }
        for (i = sourceColumnIndex; i < sourceColumnIndex + toSkip; i++) {
            expandedColumns[i].orderIndex = nextSourceIndex++;
        }
        this.updateIndicesForLevel(source.level + 1);
    }
    updateIndicesForLevel(level) {
        const colsForParentLevel = this.columnsForLevel(level - 1);
        const colsForLevel = [];
        sortColumns(colsForParentLevel).forEach((c) => {
            if (c.isColumnGroup) {
                colsForLevel.push(...c.childrenArray.sort((a, b) => a.orderIndex - b.orderIndex));
            }
        });
        expandColumnsWithSpan(colsForLevel).map((c, i) => c.orderIndex = i);
        if (level < this.columnsContainer.totalLevels) {
            this.updateIndicesForLevel(level + 1);
        }
    }
    columnsForLevel(level) {
        return this.columnsContainer
            .allColumns.filter(column => column.level === level);
    }
    initSelectionService() {
        if (!this.selectable) {
            this.selectionService.ngOnDestroy();
            this.cellSelectionService.ngOnDestroy();
            return;
        }
        if (!this.selectionDirective && !isPresent(this.defaultSelection)) {
            this.defaultSelection = new Selection(this, this.changeDetectorRef);
        }
        const cellSelectionMode = this.selectable['cell'];
        const activeService = cellSelectionMode ? this.cellSelectionService : this.selectionService;
        const inactiveService = cellSelectionMode ? this.selectionService : this.cellSelectionService;
        if (inactiveService.active) {
            inactiveService.ngOnDestroy();
            activeService.addSubscriptions();
            inactiveService.active = false;
        }
        activeService.active = true;
        activeService.init({
            cellSelected: cellSelectionMode ? this.cellSelected : undefined,
            rowSelected: cellSelectionMode ? undefined : this.rowSelected,
            selectable: this.selectable,
            view: this.view,
            columns: cellSelectionMode ? this.columnList.toArray() : undefined
        });
        if (!this.selectionDirective && !this.selectableSettings.enabled) {
            this.defaultSelection.reset();
        }
        if (this.selectionSubscription) {
            this.selectionSubscription.unsubscribe();
        }
        if (cellSelectionMode) {
            this.selectionSubscription = this.cellSelectionService.changes.subscribe((event) => {
                this.ngZone.run(() => this.selectionChange.emit(event));
            });
        }
        else {
            this.selectionSubscription = this.selectionService.changes.subscribe((event) => {
                this.ngZone.run(() => this.selectionChange.emit(event));
            });
        }
    }
    setEditFocus(element) {
        if (element) {
            return this.navigationService.tryFocus(element);
        }
    }
    columnInstance(column) {
        let instance;
        if (typeof column === 'number') {
            instance = this.columnsContainer.lockedLeafColumns.toArray()
                .concat(this.columnsContainer.nonLockedLeafColumns.toArray())[column];
        }
        else if (typeof column === 'string') {
            instance = this.columnList.filter((item) => item.field === column)[0];
        }
        else {
            instance = column;
        }
        if (!instance && isDevMode()) {
            throw new Error(`Invalid column ${column}`);
        }
        return instance;
    }
    verifySettings() {
        if (isDevMode()) {
            const locked = this.lockedLeafColumns.length || (this.columnMenu && this.columnMenu.lock);
            if (locked && this.detailTemplate) {
                throw new Error('Having both detail template and locked columns is not supported.');
            }
            if (this.lockedLeafColumns.length && !this.nonLockedLeafColumns.length) {
                throw new Error('There should be at least one non-locked column');
            }
            if ((locked || this.virtualColumns) && expandColumns(this.columnList.toArray()).filter(column => !column.width && !isColumnGroupComponent(column)).length) {
                throw new Error((locked ? 'Locked' : 'Virtual') + ' columns feature requires all columns to have set width.');
            }
            if (locked && !this.isScrollable) {
                throw new Error('Locked columns are only supported when scrolling is enabled.');
            }
            if (this.columnList.filter(isColumnGroupComponent).filter((x) => !x.hasChildren).length) {
                throw new Error('ColumnGroupComponent should contain ColumnComponent or CommandColumnComponent.');
            }
            if (this.columnList.filter(x => x.locked && x.parent && !x.parent.isLocked).length) {
                throw new Error('Locked child columns require their parent columns to be locked.');
            }
            if ((this.rowHeight || this.detailRowHeight) && !this.isVirtual) {
                throw new Error('Row height and detail row height settings require virtual scrolling mode to be enabled.');
            }
            validateColumnsField(this.columnList);
        }
    }
    autoGenerateColumns() {
        if (this.shouldGenerateColumns && !this.columns.length && this.view.length) {
            this.columns.reset(Object.keys(this.view.at(0)).map(field => {
                let column = new ColumnComponent();
                column.field = field;
                return column;
            }));
        }
    }
    attachStateChangesEmitter() {
        this.stateChangeSubscription =
            merge(this.pageChange.pipe(map(x => ({
                filter: this.filter, group: this.group, skip: x.skip, sort: this.sort, take: x.take
            }))), this.sortChange.pipe(map(sort => ({ filter: this.filter, group: this.group, skip: this.skip, sort: sort, take: this.pageSize }))), this.groupChange.pipe(map(group => ({
                filter: this.filter, group: group, skip: this.skip, sort: this.sort, take: this.pageSize
            }))), this.filterChange.pipe(map(filter$$1 => ({
                filter: filter$$1, group: this.group, skip: 0, sort: this.sort, take: this.pageSize
            }))))
                .subscribe(x => {
                this.closeCell();
                this.cancelCell();
                this.dataStateChange.emit(x);
            });
    }
    attachEditHandlers() {
        if (!this.editService) {
            return;
        }
        this.editServiceSubscription = this.editService
            .changes.subscribe(this.emitCRUDEvent.bind(this));
    }
    emitCRUDEvent(args) {
        const { action, rowIndex, formGroup } = args;
        let dataItem = this.view.at(rowIndex - this.skip);
        if (action !== 'add' && !dataItem) {
            dataItem = formGroup.value;
        }
        this.closeCell();
        Object.assign(args, {
            dataItem: dataItem,
            sender: this
        });
        switch (action) {
            case 'add':
                this.add.emit(args);
                break;
            case 'cancel':
                this.cancel.emit(args);
                break;
            case 'edit':
                this.edit.emit(args);
                break;
            case 'remove':
                this.remove.emit(args);
                break;
            case 'save':
                this.save.emit(args);
                break;
            case 'cellClose':
                this.cellClose.emit(args);
                break;
            default: break;
        }
    }
    attachDomEventHandlers() {
        this.cellClickSubscription = this.domEvents.cellClick.subscribe((args) => {
            this.cellClick.emit(Object.assign({ sender: this }, args));
        });
    }
    attachElementEventHandlers() {
        if (isUniversal()) {
            return;
        }
        const wrapper = this.wrapper.nativeElement;
        const ariaRoot = this.ariaRoot.nativeElement;
        this.ngZone.runOutsideAngular(() => {
            const resizeCheck = this.resizeCheck.bind(this);
            const resizeSubscription = this.renderer.listen('window', 'resize', resizeCheck);
            const orientationSubscription = this.renderer.listen('window', 'orientationchange', resizeCheck);
            const documentClickSubscription = this.renderer.listen('document', 'click', (args) => {
                const activeElement = document.activeElement;
                if (this.editService.shouldCloseCell() &&
                    !closest(args.target, matchesClasses('k-animation-container k-grid-ignore-click')) &&
                    !(activeElement &&
                        (closest(activeElement, matchesClasses('k-animation-container')) ||
                            isInEditedCell(activeElement, this.wrapper.nativeElement)))) {
                    this.editService.closeCell(args);
                }
            });
            const windowBlurSubscription = this.renderer.listen('window', 'blur', (args) => {
                const activeElement = document.activeElement;
                if (activeElement && !(matchesNodeName('input')(activeElement) && activeElement.type === 'file' &&
                    isInEditedCell(activeElement, this.wrapper.nativeElement))) {
                    this.editService.closeCell(args);
                }
                this.domEvents.windowBlur.emit(args);
            });
            const clickSubscription = this.renderer.listen(wrapper, 'click', (args) => {
                this.domEvents.click.emit(args);
            });
            const keydownSubscription = this.renderer.listen(wrapper, 'keydown', (args) => {
                this.domEvents.keydown.emit(args);
            });
            // focusIn and focusOut are relative to the element with ARIA role "grid"
            let focused = false;
            const focusInSubscription = this.renderer.listen(ariaRoot, 'focusin', (args) => {
                this.domEvents.focus.emit(args);
                if (!focused) {
                    this.domEvents.focusIn.emit(args);
                    focused = true;
                }
            });
            const focusOutSubscription = this.renderer.listen(ariaRoot, 'focusout', (args) => {
                const next = args.relatedTarget || document.activeElement;
                const outside = !closest(next, (node) => node === ariaRoot);
                if (outside) {
                    this.domEvents.focusOut.emit(args);
                    focused = false;
                }
            });
            this.detachElementEventHandlers = () => {
                resizeSubscription();
                orientationSubscription();
                documentClickSubscription();
                windowBlurSubscription();
                clickSubscription();
                keydownSubscription();
                focusInSubscription();
                focusOutSubscription();
            };
        });
    }
    matchesMedia(c) {
        return this.responsiveService.matchesMedia(c.media);
    }
    resizeCheck() {
        if (window.innerWidth !== this.cachedWindowWidth) {
            this.cachedWindowWidth = window.innerWidth;
            let hasChanges = false;
            this.columnList.filterHierarchy(column => {
                const matchesMedia = this.matchesMedia(column);
                if (column.matchesMedia !== matchesMedia) {
                    hasChanges = true;
                    column.matchesMedia = matchesMedia;
                }
                return column.isVisible;
            });
            if (hasChanges) {
                this.ngZone.run(() => {
                    this.changeDetectorRef.markForCheck();
                });
            }
        }
    }
    emitPDFExportEvent() {
        const args = new PDFExportEvent();
        this.pdfExport.emit(args);
        if (!args.isDefaultPrevented()) {
            this.saveAsPDF();
        }
    }
    syncHeaderHeight(observable) {
        return observable
            .pipe(filter(() => isPresent(this.lockedHeader)))
            .subscribe(() => syncRowsHeight(this.lockedHeader.nativeElement.children[0], this.header.nativeElement.children[0]));
    }
    columnsContainerChange() {
        this.columnsContainerChangeSubscription =
            this.syncHeaderHeight(this.columnsContainer.changes.pipe(filter(() => this.lockedColumns.length > 0), switchMap(() => this.ngZone.onStable.asObservable().pipe(take(1)))));
    }
    handleColumnResize() {
        const resizes = this.columnResizingService.changes;
        this.columnResizingSubscription = resizes.pipe(tap(e => {
            if (e.type === 'start') {
                this.renderer.addClass(this.wrapper.nativeElement, 'k-grid-column-resizing');
            }
            else if (e.type === 'end') {
                this.renderer.removeClass(this.wrapper.nativeElement, 'k-grid-column-resizing');
            }
        }), filter(e => e.type === 'start'), switchMap(() => resizes.pipe(
        // tslint:disable-next-line: rxjs-no-unsafe-takeuntil
        takeUntil(resizes.pipe(filter(e => e.type === 'triggerAutoFit'))), filter(e => e.type === 'end'))))
            .subscribe(this.notifyResize.bind(this));
    }
    notifyResize(e) {
        const args = e.resizedColumns
            .filter(item => isTruthy(item.column.resizable) && !item.column.isColumnGroup)
            .map(item => ({
            column: item.column,
            newWidth: item.column.width,
            oldWidth: item.oldWidth
        }));
        this.columnResize.emit(args);
    }
    assertNavigable() {
        if (isDevMode() && !this.navigable) {
            throw new Error('The Grid should be configured as [navigable]="true" to control focus');
        }
    }
    navigationMetadata() {
        const isVirtual = this.isVirtual;
        const pageSize = this.pageSize;
        const dataRows = isVirtual ? this.view.total : pageSize;
        const addRowOffset = this.editService.hasNewItem ? 1 : 0;
        const filterRowOffset = hasFilterRow(this.filterable) ? 1 : 0;
        const headerRows = this.totalColumnLevels + 1 + filterRowOffset + addRowOffset;
        return new NavigationMetadata(dataRows, headerRows, isVirtual, this.showPager, isPresent(this.detailTemplate), this.wrapper, this.virtualColumns, this.columnsContainer);
    }
    updateNavigationMetadata() {
        this.navigationService.metadata = this.navigationMetadata();
    }
    applyAutoSize() {
        const cols = this.columns.filter((c) => this.autoSize ? c.autoSize !== false : c.autoSize);
        if (cols.length > 0) {
            this.ngZone.onStable.pipe(take(1)).subscribe(_ => this.autoFitColumns(cols));
        }
    }
    onColumnRangeChange(range) {
        const viewportColumns = this.viewportColumns = [];
        const leafViewportColumns = this.columnsContainer
            .nonLockedLeafColumns.toArray().slice(range.start, range.end + 1);
        for (let idx = 0; idx < leafViewportColumns.length; idx++) {
            let column = leafViewportColumns[idx];
            while (column.parent) {
                column = column.parent;
            }
            const toAdd = [column];
            while (toAdd.length) {
                column = toAdd.shift();
                viewportColumns.push(column);
                if (column.isColumnGroup) {
                    toAdd.unshift.apply(toAdd, column.childrenArray);
                }
            }
            const lastFromGroup = viewportColumns[viewportColumns.length - 1];
            column = leafViewportColumns[idx];
            while (column !== lastFromGroup && idx < leafViewportColumns.length) {
                idx++;
                column = leafViewportColumns[idx];
            }
        }
        if (range.start > 0) {
            const first = leafViewportColumns[0];
            let offset = range.offset;
            let current = viewportColumns[0];
            let index = 0;
            while (current !== first) {
                offset -= current.isColumnGroup ? 0 : current.width;
                index++;
                current = viewportColumns[index];
            }
            if (offset > 0) {
                const totalLevels = this.columnsContainer.totalLevels;
                let previous;
                for (let idx = 0; idx <= totalLevels; idx++) {
                    const offsetColumn = idx < totalLevels ? new ColumnGroupComponent(previous) : new ColumnBase$1(previous);
                    previous = offsetColumn;
                    offsetColumn.title = "\u00A0";
                    offsetColumn.width = offset;
                    viewportColumns.unshift(offsetColumn);
                }
            }
        }
        this.leafViewportColumns = viewportColumns.filter(c => !c.isColumnGroup);
    }
    toggleDetailRowLegacy(index, expand) {
        const hasCallback = typeof this.isDetailExpanded === 'function';
        if (isDevMode() && hasCallback) {
            throw new Error('The expandRow and collapseRow methods should not be called when using the ' +
                'kendoGridDetailsExpandBy directive or the isDetailExpanded callback. ' +
                'These methods are provided only for backwards compatibility with legacy versions.');
        }
        if (!isDevMode() && hasCallback) {
            return;
        }
        if (this.detailsService.isExpanded(index, null) !== expand) {
            this.detailsService.toggleRow(index, null);
        }
    }
    shouldResetSelection(selectableChanges) {
        const previousValue = selectableChanges.previousValue;
        if (!previousValue) {
            // Selection was disabled, no need to reset.
            return false;
        }
        const currentValue = selectableChanges.currentValue;
        if (!currentValue || currentValue.enabled === false) {
            // Selection disabled, reset.
            return true;
        }
        return previousValue.cell !== currentValue.cell;
    }
}
GridComponent.decorators = [
    { type: Component, args: [{
                encapsulation: ViewEncapsulation.None,
                exportAs: 'kendoGrid',
                providers: [
                    BrowserSupportService,
                    LocalizationService,
                    ColumnInfoService,
                    SelectionService,
                    CellSelectionService,
                    DetailsService,
                    GroupsService,
                    GroupInfoService,
                    ChangeNotificationService,
                    EditService,
                    PDFService,
                    SuspendService,
                    {
                        provide: CELL_CONTEXT,
                        useValue: ɵ4$2
                    },
                    {
                        provide: L10N_PREFIX,
                        useValue: 'kendo.grid'
                    },
                    FilterService,
                    ResponsiveService,
                    PagerContextService,
                    ExcelService,
                    ScrollSyncService,
                    ResizeService,
                    LocalDataChangesService,
                    DomEventsService,
                    ColumnResizingService,
                    SinglePopupService,
                    DragAndDropService,
                    DragHintService,
                    DropCueService,
                    ColumnReorderService,
                    NavigationService,
                    FocusRoot,
                    IdService,
                    ScrollRequestService,
                    SortService
                ],
                selector: 'kendo-grid',
                styles: [
                    // Styles for backwards compatibility with kendo-theme-default@v2.46.0 and earlier.
                    `   .k-grid .k-grid-aria-root {
            display: flex;
            flex-direction: column;
            flex: 1 1 auto;
            overflow: hidden;
        }

        .k-grid .k-filter-row td {
            white-space: nowrap;
        }`
                ],
                template: `
        <ng-container kendoGridLocalizedMessages
            i18n-groupPanelEmpty="kendo.grid.groupPanelEmpty|The label visible in the Grid group panel when it is empty"
            groupPanelEmpty="Drag a column header and drop it here to group by that column"

            i18n-noRecords="kendo.grid.noRecords|The label visible in the Grid when there are no records"
            noRecords="No records available."

            i18n-pagerFirstPage="kendo.grid.pagerFirstPage|The label for the first page button in Grid pager"
            pagerFirstPage="Go to the first page"

            i18n-pagerPreviousPage="kendo.grid.pagerPreviousPage|The label for the previous page button in Grid pager"
            pagerPreviousPage="Go to the previous page"

            i18n-pagerNextPage="kendo.grid.pagerNextPage|The label for the next page button in Grid pager"
            pagerNextPage="Go to the next page"

            i18n-pagerLastPage="kendo.grid.pagerLastPage|The label for the last page button in Grid pager"
            pagerLastPage="Go to the last page"

            i18n-pagerPage="kendo.grid.pagerPage|The label before the current page number in the Grid pager"
            pagerPage="Page"

            i18n-pagerOf="kendo.grid.pagerOf|The label before the total pages number in the Grid pager"
            pagerOf="of"

            i18n-pagerItems="kendo.grid.pagerItems|The label after the total pages number in the Grid pager"
            pagerItems="items"

            i18n-pagerPageNumberInputTitle="kendo.grid.pagerPageNumberInputTitle|The label for the pager input in the Grid pager"
            pagerPageNumberInputTitle="Page Number"

            i18n-pagerItemsPerPage="kendo.grid.pagerItemsPerPage|The label for the page size chooser in the Grid pager"
            pagerItemsPerPage="items per page"

            i18n-filter="kendo.grid.filter|The label of the filter cell or icon"
            filter="Filter"

            i18n-filterEqOperator="kendo.grid.filterEqOperator|The text of the equal filter operator"
            filterEqOperator="Is equal to"

            i18n-filterNotEqOperator="kendo.grid.filterNotEqOperator|The text of the not equal filter operator"
            filterNotEqOperator="Is not equal to"

            i18n-filterIsNullOperator="kendo.grid.filterIsNullOperator|The text of the is null filter operator"
            filterIsNullOperator="Is null"

            i18n-filterIsNotNullOperator="kendo.grid.filterIsNotNullOperator|The text of the is not null filter operator"
            filterIsNotNullOperator="Is not null"

            i18n-filterIsEmptyOperator="kendo.grid.filterIsEmptyOperator|The text of the is empty filter operator"
            filterIsEmptyOperator="Is empty"

            i18n-filterIsNotEmptyOperator="kendo.grid.filterIsNotEmptyOperator|The text of the is not empty filter operator"
            filterIsNotEmptyOperator="Is not empty"

            i18n-filterStartsWithOperator="kendo.grid.filterStartsWithOperator|The text of the starts with filter operator"
            filterStartsWithOperator="Starts with"

            i18n-filterContainsOperator="kendo.grid.filterContainsOperator|The text of the contains filter operator"
            filterContainsOperator="Contains"

            i18n-filterNotContainsOperator="kendo.grid.filterNotContainsOperator|The text of the does not contain filter operator"
            filterNotContainsOperator="Does not contain"

            i18n-filterEndsWithOperator="kendo.grid.filterEndsWithOperator|The text of the ends with filter operator"
            filterEndsWithOperator="Ends with"

            i18n-filterGteOperator="kendo.grid.filterGteOperator|The text of the greater than or equal filter operator"
            filterGteOperator="Is greater than or equal to"

            i18n-filterGtOperator="kendo.grid.filterGtOperator|The text of the greater than filter operator"
            filterGtOperator="Is greater than"

            i18n-filterLteOperator="kendo.grid.filterLteOperator|The text of the less than or equal filter operator"
            filterLteOperator="Is less than or equal to"

            i18n-filterLtOperator="kendo.grid.filterLtOperator|The text of the less than filter operator"
            filterLtOperator="Is less than"

            i18n-filterIsTrue="kendo.grid.filterIsTrue|The text of the IsTrue boolean filter option"
            filterIsTrue="Is True"

            i18n-filterIsFalse="kendo.grid.filterIsFalse|The text of the IsFalse boolean filter option"
            filterIsFalse="Is False"

            i18n-filterBooleanAll="kendo.grid.filterBooleanAll|The text of the (All) boolean filter option"
            filterBooleanAll="(All)"

            i18n-filterAfterOrEqualOperator="kendo.grid.filterAfterOrEqualOperator|The text of the after or equal date filter operator"
            filterAfterOrEqualOperator="Is after or equal to"

            i18n-filterAfterOperator="kendo.grid.filterAfterOperator|The text of the after date filter operator"
            filterAfterOperator="Is after"

            i18n-filterBeforeOperator="kendo.grid.filterBeforeOperator|The text of the before date filter operator"
            filterBeforeOperator="Is before"

            i18n-filterBeforeOrEqualOperator="kendo.grid.filterBeforeOrEqualOperator|The text of the before or equal date filter operator"
            filterBeforeOrEqualOperator="Is before or equal to"

            i18n-filterFilterButton="kendo.grid.filterFilterButton|The text of the filter button"
            filterFilterButton="Filter"

            i18n-filterClearButton="kendo.grid.filterClearButton|The text of the clear filter button"
            filterClearButton="Clear"

            i18n-filterAndLogic="kendo.grid.filterAndLogic|The text of the And filter logic"
            filterAndLogic="And"

            i18n-filterOrLogic="kendo.grid.filterOrLogic|The text of the Or filter logic"
            filterOrLogic="Or"

            i18n-loading="kendo.grid.loading|The loading text"
            loading="Loading"

            i18n-columnMenu="kendo.grid.columnMenu|The title of the column menu icon"
            columnMenu="Column Menu"

            i18n-columns="kendo.grid.columns|The text shown in the column menu for the columns item"
            columns="Columns"

            i18n-lock="kendo.grid.lock|The text shown in the column menu for the lock item"
            lock="Lock"

            i18n-unlock="kendo.grid.unlock|The text shown in the column menu for the unlock item"
            unlock="Unlock"

            i18n-sortable="kendo.grid.sortable|The label of the sort icon"
            sortable="Sortable"

            i18n-sortAscending="kendo.grid.sortAscending|The text shown in the column menu for the sort ascending item"
            sortAscending="Sort Ascending"

            i18n-sortDescending="kendo.grid.sortDescending|The text shown in the column menu for the sort descending item"
            sortDescending="Sort Descending"

            i18n-sortedAscending="kendo.grid.sortedAscending|The status announcement when a column is sorted ascending"
            sortedAscending="Sorted Ascending"

            i18n-sortedDescending="kendo.grid.sortedDescending|The status announcement when a column is sorted descending"
            sortedDescending="Sorted Descending"

            i18n-sortedDefault="kendo.grid.sortedDefault|The status announcement when a column is no longer sorted"
            sortedDefault="Not Sorted"

            i18n-columnsApply="kendo.grid.columnsApply|The text shown in the column menu or column chooser for the columns apply button"
            columnsApply="Apply"

            i18n-columnsReset="kendo.grid.columnsReset|The text shown in the column menu or column chooser for the columns reset button"
            columnsReset="Reset"

            i18n-detailExpand="kendo.grid.detailExpand|The title of the expand icon of detail rows."
            detailExpand="Expand Details"

            i18n-detailCollapse="kendo.grid.detailCollapse|The title of the collapse icon of detail rows."
            detailCollapse="Collapse Details"

            i18n-filterDateToday="kendo.grid.filterDateToday|The text of the Today button of the Date filter."
            filterDateToday="TODAY"

            i18n-filterDateToggle="kendo.grid.filterDateToggle|The title of the Toggle button of the Date filter."
            filterDateToggle="Toggle Calendar"

            i18n-filterNumericDecrement="kendo.grid.filterNumericDecrement|The title of the Decrement button of the Numeric filter."
            filterNumericDecrement="Decrement"

            i18n-filterNumericIncrement="kendo.grid.filterNumericIncrement|The title of the Increment button of the Numeric filter."
            filterNumericIncrement="Increment"
        >
        </ng-container>
        <kendo-grid-toolbar *ngIf="showTopToolbar" position="top"></kendo-grid-toolbar>
        <kendo-grid-group-panel
            *ngIf="showGroupPanel"
            [text]="groupableEmptyText"
            [groups]="group"
            (change)="groupChange.emit($event)">
        </kendo-grid-group-panel>
        <div #ariaRoot
            class="k-grid-aria-root"
            role="grid"
            [attr.aria-rowcount]="ariaRowCount"
            [attr.aria-colcount]="ariaColCount">
        <ng-template [ngIf]="isScrollable">
            <div *ngIf="!hideHeader"
                class="k-grid-header"
                role="presentation"
                [style.padding]="headerPadding">
                <div *ngIf="isLocked"
                     #lockedHeader
                     role="presentation"
                     class="k-grid-header-locked"
                     [style.width.px]="lockedWidth">
                    <table [locked]="true" role="presentation" [style.width.px]="lockedWidth">
                        <colgroup kendoGridColGroup
                            role="presentation"
                            [columns]="lockedLeafColumns"
                            [groups]="group"
                            [detailTemplate]="detailTemplate">
                        </colgroup>
                        <thead kendoGridHeader
                            [resizable]="resizable"
                            [scrollable]="true"
                            [columns]="lockedColumns"
                            [totalColumnLevels]="totalColumnLevels"
                            [sort]="sort"
                            [groups]="group"
                            [filter]="filter"
                            [filterable]="filterable"
                            [groupable]="showGroupPanel"
                            [reorderable]="reorderable"
                            [sortable]="sortable"
                            [columnMenu]="columnMenuOptions"
                            [columnMenuTemplate]="columnMenuTemplate"
                            [totalColumnsCount]="leafColumns.length"
                            [detailTemplate]="detailTemplate">
                        </thead>
                    </table>
                </div><div #header class="k-grid-header-wrap" role="presentation" data-scrollable
                    [kendoGridResizableContainer]="lockedLeafColumns.length"
                    [lockedWidth]="lockedWidth + scrollbarWidth + 2">
                    <table role="presentation" [style.width.px]="nonLockedWidth" [virtualColumns]="virtualColumns">
                        <colgroup kendoGridColGroup
                            role="presentation"
                            [columns]="headerLeafColumns"
                            [groups]="isLocked ? [] : group"
                            [detailTemplate]="detailTemplate">
                        </colgroup>
                        <thead kendoGridHeader
                            [resizable]="resizable"
                            role="presentation"
                            [scrollable]="true"
                            [columns]="headerColumns"
                            [totalColumnLevels]="totalColumnLevels"
                            [sort]="sort"
                            [filter]="filter"
                            [filterable]="filterable"
                            [groupable]="showGroupPanel"
                            [reorderable]="reorderable"
                            [groups]="isLocked ? [] : group"
                            [sortable]="sortable"
                            [columnMenu]="columnMenuOptions"
                            [columnMenuTemplate]="columnMenuTemplate"
                            [lockedColumnsCount]="lockedLeafColumns.length"
                            [totalColumnsCount]="leafColumns.length"
                            [detailTemplate]="detailTemplate">
                        </thead>
                    </table>
                    <div *ngIf="virtualColumns" class="k-width-container" role="presentation">
                        <div [style.width.px]="columnsContainer.unlockedWidth"></div>
                    </div>
                </div>
            </div>
            <kendo-grid-list
                [data]="view"
                [rowHeight]="rowHeight"
                [detailRowHeight]="detailRowHeight"
                [total]="totalCount"
                [take]="pageSize"
                [groups]="group"
                [groupable]="groupable"
                [skip]="skip"
                [trackBy]="trackBy"
                [columns]="columnsContainer"
                [selectable]="selectable"
                [filterable]="filterable"
                [detailTemplate]="detailTemplate"
                [noRecordsTemplate]="noRecordsTemplate"
                (pageChange)="notifyPageChange('list', $event)"
                [rowClass]="rowClass"
                [loading]="loading"
                [isVirtual]="isVirtual"
                [virtualColumns]="virtualColumns"
                (scrollBottom)="notifyScrollBottom()"
                (contentScroll)="contentScroll.emit($event)"
                kendoDraggable
                kendoGridSelectionMarquee
                [enableDrag]="marqueeSelection"
                >
            </kendo-grid-list>
            <div
                *ngIf="showFooter"
                class="k-grid-footer"
                [style.padding]="headerPadding">
                <div
                    *ngIf="lockedLeafColumns.length"
                    class="k-grid-footer-locked"
                    [style.width.px]="lockedWidth">
                    <table role="presentation" [locked]="true" [style.width.px]="lockedWidth">
                        <colgroup kendoGridColGroup
                            [columns]="lockedLeafColumns"
                            [groups]="group"
                            [detailTemplate]="detailTemplate">
                        </colgroup>
                        <tfoot kendoGridFooter
                            [scrollable]="true"
                            [groups]="group"
                            [columns]="lockedLeafColumns"
                            [detailTemplate]="detailTemplate"
                            [logicalRowIndex]="ariaRowCount">
                        </tfoot>
                    </table>
                </div><div #footer
                    class="k-grid-footer-wrap" data-scrollable
                    [kendoGridResizableContainer]="lockedLeafColumns.length"
                    [lockedWidth]="lockedWidth + scrollbarWidth + 3">
                    <table role="presentation" [style.width.px]="nonLockedWidth">
                        <colgroup kendoGridColGroup
                            [columns]="nonLockedLeafColumns"
                            [groups]="isLocked ? [] : group"
                            [detailTemplate]="detailTemplate">
                        </colgroup>
                        <tfoot kendoGridFooter
                            [logicalRowIndex]="ariaRowCount"
                            [scrollable]="true"
                            [groups]="isLocked ? [] : group"
                            [columns]="nonLockedLeafColumns"
                            [lockedColumnsCount]="lockedLeafColumns.length"
                            [detailTemplate]="detailTemplate">
                        </tfoot>
                    </table>
                </div>
            </div>
        </ng-template>
        <ng-template [ngIf]="!isScrollable">
            <table [style.table-layout]="resizable ? 'fixed' : null">
                <colgroup kendoGridColGroup
                    [columns]="leafColumns"
                    [groups]="group"
                    [detailTemplate]="detailTemplate">
                </colgroup>
                <thead kendoGridHeader
                    *ngIf="!hideHeader"
                    [resizable]="resizable"
                    [scrollable]="false"
                    [columns]="visibleColumns"
                    [totalColumnLevels]="totalColumnLevels"
                    [groups]="group"
                    [groupable]="showGroupPanel"
                    [reorderable]="reorderable"
                    [sort]="sort"
                    [sortable]="sortable"
                    [filter]="filter"
                    [filterable]="filterable"
                    [columnMenu]="columnMenuOptions"
                    [columnMenuTemplate]="columnMenuTemplate"
                    [detailTemplate]="detailTemplate">
                </thead>
                <tbody kendoGridTableBody
                    [groups]="group"
                    [data]="view"
                    [skip]="skip"
                    [columns]="leafColumns"
                    [selectable]="selectable"
                    [filterable]="filterable"
                    [noRecordsTemplate]="noRecordsTemplate"
                    [detailTemplate]="detailTemplate"
                    [showGroupFooters]="showGroupFooters"
                    [trackBy]="trackBy"
                    [rowClass]="rowClass"
                    kendoDraggable
                    kendoGridSelectionMarquee
                    [enableDrag]="marqueeSelection">
                </tbody>
                <tfoot kendoGridFooter
                    *ngIf="showFooter"
                    [scrollable]="false"
                    [logicalRowIndex]="ariaRowCount"
                    [groups]="group"
                    [columns]="leafColumns"
                    [detailTemplate]="detailTemplate">
                </tfoot>
            </table>
            <div *ngIf="loading" kendoGridLoading>
            </div>
        </ng-template>
        </div>
        <kendo-pager
            *ngIf="showPager"
            [template]="pagerTemplate"
            [pageSize]="pageSize"
            [total]="view.total"
            [skip]="skip"
            [options]="pageable"
            (pageChange)="notifyPageChange('pager', $event)">
        </kendo-pager>
        <kendo-grid-toolbar *ngIf="showBottomToolbar" position="bottom"></kendo-grid-toolbar>
    `
            },] },
];
/** @nocollapse */
GridComponent.ctorParameters = () => [
    { type: BrowserSupportService },
    { type: SelectionService },
    { type: CellSelectionService },
    { type: ElementRef },
    { type: GroupInfoService },
    { type: GroupsService },
    { type: ChangeNotificationService },
    { type: DetailsService },
    { type: EditService },
    { type: FilterService },
    { type: PDFService },
    { type: ResponsiveService },
    { type: Renderer2 },
    { type: ExcelService },
    { type: NgZone },
    { type: ScrollSyncService },
    { type: DomEventsService },
    { type: ColumnResizingService },
    { type: ChangeDetectorRef },
    { type: ColumnReorderService },
    { type: ColumnInfoService },
    { type: NavigationService },
    { type: SortService },
    { type: ScrollRequestService },
    { type: LocalizationService }
];
GridComponent.propDecorators = {
    data: [{ type: Input }],
    pageSize: [{ type: Input }],
    height: [{ type: Input }],
    rowHeight: [{ type: Input }],
    detailRowHeight: [{ type: Input }],
    skip: [{ type: Input }],
    scrollable: [{ type: Input }],
    selectable: [{ type: Input }],
    sort: [{ type: Input }],
    trackBy: [{ type: Input }],
    filter: [{ type: Input }],
    group: [{ type: Input }],
    virtualColumns: [{ type: Input }],
    filterable: [{ type: Input }],
    sortable: [{ type: Input }],
    pageable: [{ type: Input }],
    groupable: [{ type: Input }],
    navigable: [{ type: Input }],
    navigatable: [{ type: Input }],
    autoSize: [{ type: Input }],
    rowClass: [{ type: Input }],
    rowSelected: [{ type: Input }],
    cellSelected: [{ type: Input }],
    resizable: [{ type: Input }],
    reorderable: [{ type: Input }],
    loading: [{ type: Input }],
    columnMenu: [{ type: Input }],
    hideHeader: [{ type: Input }],
    filterChange: [{ type: Output }],
    pageChange: [{ type: Output }],
    groupChange: [{ type: Output }],
    sortChange: [{ type: Output }],
    selectionChange: [{ type: Output }],
    dataStateChange: [{ type: Output }],
    groupExpand: [{ type: Output }],
    groupCollapse: [{ type: Output }],
    detailExpand: [{ type: Output }],
    detailCollapse: [{ type: Output }],
    edit: [{ type: Output }],
    cancel: [{ type: Output }],
    save: [{ type: Output }],
    remove: [{ type: Output }],
    add: [{ type: Output }],
    cellClose: [{ type: Output }],
    cellClick: [{ type: Output }],
    pdfExport: [{ type: Output }],
    excelExport: [{ type: Output }],
    columnResize: [{ type: Output }],
    columnReorder: [{ type: Output }],
    columnVisibilityChange: [{ type: Output }],
    columnLockedChange: [{ type: Output }],
    scrollBottom: [{ type: Output }],
    contentScroll: [{ type: Output }],
    columns: [{ type: ContentChildren, args: [ColumnBase$1,] }],
    dir: [{ type: HostBinding, args: ['attr.dir',] }],
    hostClasses: [{ type: HostBinding, args: ['class.k-widget',] }, { type: HostBinding, args: ['class.k-grid',] }],
    lockedClasses: [{ type: HostBinding, args: ['class.k-grid-lockedcolumns',] }],
    virtualClasses: [{ type: HostBinding, args: ['class.k-grid-virtual',] }],
    noScrollbarClass: [{ type: HostBinding, args: ['class.k-grid-no-scrollbar',] }],
    detailTemplateChildren: [{ type: ContentChildren, args: [DetailTemplateDirective,] }],
    noRecordsTemplateChildren: [{ type: ContentChildren, args: [NoRecordsTemplateDirective,] }],
    pagerTemplateChildren: [{ type: ContentChildren, args: [PagerTemplateDirective,] }],
    toolbarTemplateChildren: [{ type: ContentChildren, args: [ToolbarTemplateDirective,] }],
    columnMenuTemplates: [{ type: ContentChildren, args: [ColumnMenuTemplateDirective,] }],
    lockedHeader: [{ type: ViewChild, args: ["lockedHeader",] }],
    header: [{ type: ViewChild, args: ["header",] }],
    footer: [{ type: ViewChildren, args: ["footer",] }],
    ariaRoot: [{ type: ViewChild, args: ['ariaRoot',] }],
    isDetailExpanded: [{ type: Input }]
};

/**
 * @hidden
 */
const update = (arr, idx, value) => ([
    ...arr.slice(0, idx + 1),
    ...(arr.slice(idx + 1).map(x => x + value))
]);
/**
 * @hidden
 */
class RowHeightService {
    constructor(total = 0, rowHeight, detailRowHeight) {
        this.total = total;
        this.rowHeight = rowHeight;
        this.detailRowHeight = detailRowHeight;
        this.offsets = [];
        this.heights = [];
        let agg = 0;
        for (let idx = 0; idx < total; idx++) {
            this.offsets.push(agg);
            agg += rowHeight;
            this.heights.push(rowHeight);
        }
    }
    height(rowIndex) {
        return this.heights[rowIndex];
    }
    expandDetail(rowIndex) {
        if (this.height(rowIndex) === this.rowHeight) {
            this.updateRowHeight(rowIndex, this.detailRowHeight);
        }
    }
    collapseDetail(rowIndex) {
        if (this.height(rowIndex) > this.rowHeight) {
            this.updateRowHeight(rowIndex, this.detailRowHeight * -1);
        }
    }
    isExpanded(rowIndex) {
        return this.height(rowIndex) > this.rowHeight;
    }
    index(position) {
        if (position < 0) {
            return undefined;
        }
        const result = this.offsets.reduce((prev, current, idx) => {
            if (prev !== undefined) {
                return prev;
            }
            else if (current === position) {
                return idx;
            }
            else if (current > position) {
                return idx - 1;
            }
            return undefined;
        }, undefined); // tslint:disable-line:align
        return result === undefined ? this.total - 1 : result;
    }
    offset(rowIndex) {
        return this.offsets[rowIndex];
    }
    totalHeight() {
        return this.heights.reduce((prev, curr) => prev + curr, 0);
    }
    updateRowHeight(rowIndex, value) {
        if (this.total > 0) {
            this.heights[rowIndex] += value;
            this.offsets = update(this.offsets, rowIndex, value);
        }
    }
}

/**
 * @hidden
 */
class ScrollAction {
    constructor(offset) {
        this.offset = offset;
    }
}
/**
 * @hidden
 */
class PageAction {
    constructor(skip, take$$1) {
        this.skip = skip;
        this.take = take$$1;
    }
}
/**
 * @hidden
 */
class ScrollBottomAction {
}
const SCROLL_BOTTOM_THRESHOLD = 2;
/**
 * @hidden
 */
class ScrollerService {
    constructor(scrollObservable) {
        this.scrollObservable = scrollObservable;
        this.firstLoaded = 0;
    }
    create(rowHeightService, skip, take$$1, total) {
        this.rowHeightService = rowHeightService;
        this.firstLoaded = skip;
        this.lastLoaded = skip + take$$1;
        this.take = take$$1;
        this.total = total;
        this.lastScrollTop = 0;
        const subject = new BehaviorSubject(new ScrollAction(this.rowHeightService.offset(skip)));
        this.subscription = Observable.create(observer => {
            this.unsubscribe();
            this.scrollSubscription = this.scrollObservable.subscribe(x => this.onScroll(x, observer));
        }).subscribe(x => subject.next(x));
        return subject;
    }
    destroy() {
        this.unsubscribe();
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    onScroll({ scrollTop, offsetHeight, scrollHeight, clientHeight }, observer) {
        if (this.lastScrollTop === scrollTop) {
            return;
        }
        const up = this.lastScrollTop >= scrollTop;
        this.lastScrollTop = scrollTop;
        let firstItemIndex = this.rowHeightService.index(scrollTop);
        let firstItemOffset = this.rowHeightService.offset(firstItemIndex);
        const lastItemIndex = this.rowHeightService.index(scrollTop + offsetHeight);
        if (!up) {
            if (lastItemIndex >= this.lastLoaded && this.lastLoaded < this.total) {
                const overflow = (firstItemIndex + this.take) - this.total;
                if (overflow > 0) {
                    firstItemIndex = firstItemIndex - overflow;
                    firstItemOffset = this.rowHeightService.offset(firstItemIndex);
                }
                this.firstLoaded = firstItemIndex;
                observer.next(new ScrollAction(firstItemOffset));
                let nextTake = this.firstLoaded + this.take;
                this.lastLoaded = Math.min(nextTake, this.total);
                nextTake = nextTake > this.total ? this.total - this.firstLoaded : this.take;
                observer.next(new PageAction(this.firstLoaded, this.take));
            }
            else {
                const atBottom = scrollHeight - clientHeight - scrollTop < SCROLL_BOTTOM_THRESHOLD;
                if (atBottom) {
                    observer.next(new ScrollBottomAction());
                }
            }
        }
        if (up && firstItemIndex < this.firstLoaded) {
            const nonVisibleBuffer = Math.floor(this.take * 0.3);
            this.firstLoaded = Math.max(firstItemIndex - nonVisibleBuffer, 0);
            observer.next(new ScrollAction(this.rowHeightService.offset(this.firstLoaded)));
            this.lastLoaded = Math.min(this.firstLoaded + this.take, this.total);
            observer.next(new PageAction(this.firstLoaded, this.take));
        }
    }
    unsubscribe() {
        if (this.scrollSubscription) {
            this.scrollSubscription.unsubscribe();
            this.scrollSubscription = undefined;
        }
    }
}

/**
 * @hidden
 */
const NON_DATA_CELL_CLASSES = 'k-hierarchy-cell k-detail-cell k-group-cell';
/**
 * @hidden
 */
const NON_DATA_ROW_CLASSES = 'k-grouping-row k-group-footer k-detail-row k-grid-norecords';
/**
 * @hidden
 */
const IGNORE_TARGET_CLASSSES = 'k-icon';
/**
 * @hidden
 */
const IGNORE_CONTAINER_CLASSES = 'k-widget k-grid-ignore-click';

const elementAt = (index, elements, elementOffset) => {
    for (let idx = 0, elementIdx = 0; idx < elements.length; idx++) {
        const offset = elementOffset(elements[idx]);
        if (elementIdx <= index && index <= elementIdx + offset - 1) {
            return elements[idx];
        }
        elementIdx += offset;
    }
};
const rowAt = (index, rows) => elementAt(index, rows, row => row.hasAttribute('data-kendo-grid-item-index') ? 1 : 0);
const cellAt = (index, cells) => elementAt(index, cells, cell => !hasClasses(cell, NON_DATA_CELL_CLASSES) ? parseInt(cell.getAttribute('colSpan'), 10) || 1 : 0);
const EMPTY_OBJECT = {};
/**
 * @hidden
 */
const SCROLLER_FACTORY_TOKEN = new InjectionToken('grid-scroll-service-factory');
/**
 * @hidden
 */
function DEFAULT_SCROLLER_FACTORY(observable) {
    return new ScrollerService(observable);
}
const wheelDeltaY = (e) => {
    const deltaY = e.wheelDeltaY;
    if (e.wheelDelta && (deltaY === undefined || deltaY)) {
        return e.wheelDelta;
    }
    else if (e.detail && e.axis === e.VERTICAL_AXIS) {
        return (-e.detail) * 10;
    }
    return 0;
};
const preventLockedScroll = (args, element) => {
    const delta = wheelDeltaY(args);
    const scrollTop = element.scrollTop;
    const allowScroll = (scrollTop === 0 && 0 < delta) || (element.scrollHeight <= element.offsetHeight + scrollTop && delta < 0);
    if (!allowScroll) {
        event.preventDefault();
    }
};
const translateY = (renderer, value) => el => renderer.setStyle(el, "transform", `translateY(${value}px)`);
const maybeNativeElement = el => el ? el.nativeElement : null;
const hasScrollbar = (el, parent) => el.nativeElement.offsetWidth > parent.nativeElement.clientWidth;
const setHeight$1 = renderer => ({ el, height }) => renderer.setStyle(el, "height", `${height}px`);
const bufferSize = 1;
/**
 * @hidden
 */
class ListComponent {
    constructor(scrollerFactory, detailsService, changeNotification, suspendService, groupsService, ngZone, renderer, scrollSyncService, resizeService, editService, supportService, navigationService, scrollRequestService, localization, columnResizingService, changeDetector, pdfService, columnInfo) {
        this.changeNotification = changeNotification;
        this.suspendService = suspendService;
        this.groupsService = groupsService;
        this.ngZone = ngZone;
        this.renderer = renderer;
        this.scrollSyncService = scrollSyncService;
        this.resizeService = resizeService;
        this.editService = editService;
        this.supportService = supportService;
        this.navigationService = navigationService;
        this.localization = localization;
        this.columnResizingService = columnResizingService;
        this.changeDetector = changeDetector;
        this.pdfService = pdfService;
        this.columnInfo = columnInfo;
        this.groups = [];
        this.skip = 0;
        this.columns = new ColumnsContainer(() => []);
        this.selectable = false;
        this.groupable = false;
        this.trackBy = defaultTrackBy;
        this.contentScroll = new EventEmitter();
        this.pageChange = new EventEmitter();
        this.scrollBottom = new EventEmitter();
        this.columnsStartIdx = 0;
        this.resizeSensors = new QueryList();
        this.dispatcher = new Subject();
        this.containerScrollTop = 0;
        this.scrollLeft = 0;
        this.rtl = false;
        this.scroller = scrollerFactory(this.dispatcher);
        this.subscriptions =
            detailsService.changes.subscribe(x => this.detailExpand(x)).add(scrollRequestService.requests.subscribe(x => this.scrollTo(x)));
    }
    get hostClass() {
        return true;
    }
    get hostRole() {
        return 'presentation';
    }
    get showFooter() {
        return this.groupable && this.groupable.showFooter;
    }
    get totalWidth() {
        if (this.virtualColumns && this.columns.unlockedWidth) {
            return this.columns.unlockedWidth;
        }
    }
    get lockedLeafColumns() {
        return this.columns.lockedLeafColumns;
    }
    get nonLockedLeafColumns() {
        return this.columns.nonLockedLeafColumns;
    }
    get nonLockedColumnsToRender() {
        if (this.virtualColumns && !this.pdfService.exporting) {
            return this.viewportColumns;
        }
        return this.nonLockedLeafColumns;
    }
    get leafColumns() {
        return this.columns.leafColumnsToRender;
    }
    get lockedWidth() {
        const groupCellsWidth = this.groups.length * GROUP_CELL_WIDTH;
        return expandColumns(this.lockedLeafColumns.toArray()).reduce((prev, curr) => prev + (curr.width || 0), groupCellsWidth);
    }
    get nonLockedWidth() {
        if ((!this.rtl && this.lockedLeafColumns.length) || this.virtualColumns) {
            return sumColumnWidths(expandColumns(this.nonLockedColumnsToRender.toArray()));
        }
        return undefined;
    }
    get isLocked() {
        return this.lockedLeafColumns.length > 0;
    }
    ngOnInit() {
        this.init();
        this.subscriptions.add(this.ngZone.runOutsideAngular(this.handleRowSync.bind(this)));
        this.subscriptions.add(this.ngZone.runOutsideAngular(this.handleRowNavigationLocked.bind(this)));
        this.subscriptions.add(merge(this.columns.changes, this.resizeService.changes).subscribe(() => {
            if (this.virtualColumns) {
                this.ngZone.run(() => {
                    this.updateViewportColumns();
                    this.changeDetector.markForCheck();
                });
            }
        }));
        this.subscriptions.add(this.localization.changes.subscribe(({ rtl }) => this.rtl = rtl));
    }
    ngOnChanges(changes) {
        const hasInitialSkip = changes.skip && changes.skip.firstChange && changes.skip.currentValue > 0;
        if (hasInitialSkip) {
            this.handleInitialScrollToSkip();
        }
        if (isChanged("skip", changes) && !this.rebind) {
            this.skipScroll = true;
            this.container.nativeElement.scrollTop = this.rowHeightService.offset(this.skip);
        }
        if (anyChanged(["total", "take"], changes)) {
            this.init();
        }
        this.rebind = false;
    }
    ngDoCheck() {
        if (this.virtualColumns && (!this.viewportColumns || this.viewportWidthChange())) {
            this.updateViewportColumns();
        }
    }
    ngAfterViewInit() {
        if (this.skip && this.isVirtual) {
            this.container.nativeElement.scrollTop = this.rowHeightService.offset(this.skip);
        }
        this.resetNavigationViewport();
        this.attachContainerScroll();
        this.initResizeService();
    }
    ngAfterViewChecked() {
        const isLocked = this.isLocked;
        if (isLocked && !this.hasLockedContainer) {
            this.syncRowsHeight();
        }
        this.hasLockedContainer = isLocked;
    }
    syncRowsHeight() {
        if (this.lockedContainer) {
            syncRowsHeight(this.lockedTable.nativeElement, this.table.nativeElement);
        }
    }
    ngOnDestroy() {
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
        }
        if (this.resizeService) {
            this.resizeService.destroy();
        }
        this.cleanupScroller();
    }
    init() {
        if (this.suspendService.scroll) {
            return;
        }
        this.rowHeightService = new RowHeightService(this.total, this.rowHeight, this.detailRowHeight);
        this.totalHeight = this.rowHeightService.totalHeight();
        if (!isUniversal()) {
            this.ngZone.runOutsideAngular(this.createScroller.bind(this));
        }
    }
    lockedScroll() {
        if (!this.suspendService.scroll) {
            const lockedScrollTop = this.lockedContainer.nativeElement.scrollTop;
            if (lockedScrollTop !== this.containerScrollTop) {
                this.container.nativeElement.scrollTop = this.containerScrollTop = lockedScrollTop;
            }
        }
    }
    lockedMousewheel(args) {
        if (!args.ctrlKey) {
            preventLockedScroll(args, this.container.nativeElement);
            const scrollDelta = wheelDeltaY(args);
            this.container.nativeElement.scrollTop -= scrollDelta;
        }
    }
    lockedKeydown(args) {
        if (args.keyCode === Keys.PageDown || args.keyCode === Keys.PageUp) {
            const dir = args.keyCode === Keys.PageDown ? 1 : -1;
            const element = this.container.nativeElement;
            element.scrollTop += element.offsetHeight * dir * 0.8;
            args.preventDefault();
        }
    }
    detailExpand({ index, expand }) {
        if (expand) {
            this.rowHeightService.expandDetail(index);
        }
        else {
            this.rowHeightService.collapseDetail(index);
        }
        this.totalHeight = this.rowHeightService.totalHeight();
        this.resetNavigationViewport();
    }
    attachContainerScroll() {
        if (isUniversal()) {
            return;
        }
        this.ngZone.runOutsideAngular(() => {
            this.subscriptions.add(fromEvent(this.container.nativeElement, 'scroll').pipe(map((event) => event.target), filter(() => !this.suspendService.scroll), tap((target) => {
                this.onContainerScroll(target);
                this.resetNavigationViewport();
                if (this.virtualColumns) {
                    this.handleColumnScroll();
                }
                const rowViewport = this.navigationService.viewport || EMPTY_OBJECT;
                const columnViewport = this.navigationService.columnViewport || EMPTY_OBJECT;
                this.contentScroll.emit({
                    scrollLeft: target.scrollLeft,
                    scrollTop: target.scrollTop,
                    startRow: rowViewport.firstItemIndex,
                    endRow: rowViewport.lastItemIndex,
                    startColumn: columnViewport.firstItemIndex,
                    endColumn: columnViewport.lastItemIndex
                });
            })).subscribe(this.dispatcher));
        });
        this.scrollSyncService.registerEmitter(this.container.nativeElement, "body");
    }
    createScroller() {
        this.cleanupScroller();
        const observable = this.scroller
            .create(this.rowHeightService, this.skip, this.take, this.total);
        this.skipScroll = false;
        this.scrollerSubscription = observable.pipe(filter((x) => x instanceof PageAction), filter(() => {
            const temp = this.skipScroll;
            this.skipScroll = false;
            return !temp;
        }), tap(() => this.rebind = true))
            .subscribe((x) => this.ngZone.run(() => this.pageChange.emit(x)));
        this.scrollerSubscription.add(observable.pipe(filter((x) => x instanceof ScrollAction))
            .subscribe(this.scroll.bind(this)));
        this.scrollerSubscription.add(observable.pipe(filter((x) => x instanceof ScrollBottomAction))
            .subscribe(() => this.scrollBottom.emit()));
    }
    scroll({ offset = 0 }) {
        if (this.isVirtual) {
            [
                maybeNativeElement(this.table),
                maybeNativeElement(this.lockedTable)
            ].filter(isPresent).forEach(translateY(this.renderer, offset));
        }
        this.resetNavigationViewport();
    }
    onContainerScroll({ scrollTop }) {
        this.containerScrollTop = scrollTop;
        if (this.lockedContainer) {
            this.lockedContainer.nativeElement.scrollTop = scrollTop;
        }
    }
    handleInitialScrollToSkip() {
        const shouldScroll = () => this.isVirtual && this.skip > 0 && this.total > 0;
        const sub = this.changeNotification.changes
            .pipe(filter(shouldScroll))
            .subscribe(_ => {
            this.scrollTo({ row: this.skip });
            sub.unsubscribe();
        });
    }
    handleRowSync() {
        const isLocked = () => isPresent(this.lockedContainer);
        const onStable = () => this.ngZone.onStable.asObservable().pipe(take(1));
        return merge(this.changeNotification.changes, this.groupsService.changes
            .pipe(filter(isLocked), switchMapTo(onStable())), this.editService.changed, this.resizeService.changes, this.columnResizingService.changes
            .pipe(filter(change => change.type === 'end')), this.supportService.changes)
            .pipe(tap(() => this.resetNavigationViewport()), filter(isLocked))
            .subscribe(() => {
            const scrollTop = this.container.nativeElement.scrollTop;
            const scrollLeft = this.container.nativeElement.scrollLeft;
            this.syncRowsHeight();
            this.syncContainerHeight();
            this.lockedContainer.nativeElement.scrollTop = this.container.nativeElement.scrollTop = scrollTop;
            // fixes scroll left position in IE when editing
            this.container.nativeElement.scrollLeft = scrollLeft;
            this.resizeSensors.forEach(sensor => sensor.acceptSize());
        });
    }
    handleRowNavigationLocked() {
        return this.navigationService.changes.pipe(filter(() => isPresent(this.lockedContainer)), delay(10)).subscribe((args) => {
            if (this.lockedLeafColumns.length <= args.prevColIndex && args.colIndex < this.lockedLeafColumns.length) {
                const cell = this.navigationService.activeCell;
                if (cell && cell.colIndex + cell.colSpan < args.prevColIndex) {
                    this.container.nativeElement.scrollLeft = 0;
                }
            }
        });
    }
    scrollToVirtualRow(itemIndex) {
        if (isPresent(this.detailTemplate)) {
            itemIndex = Math.floor(itemIndex / 2);
        }
        const offset = this.rowHeightService.offset(itemIndex);
        this.container.nativeElement.scrollTop = offset;
        this.resetNavigationViewport();
    }
    scrollTo({ row, column }) {
        if (isNumber(row)) {
            if (this.isVirtual) {
                this.scrollToVirtualRow(row);
            }
            else {
                const element = rowAt(row, this.table.nativeElement.rows);
                if (element) {
                    this.container.nativeElement.scrollTop = element.offsetTop;
                }
            }
        }
        if (isNumber(column)) {
            column -= this.lockedLeafColumns.length;
            if (this.virtualColumns) {
                const columns = this.columns.leafColumnsToRender;
                let offset = 0;
                for (let idx = 0; idx < column; idx++) {
                    offset += columns[idx].width || 0;
                }
                const startOffset = this.lockedLeafColumns.length ? 0 : this.groups.length * GROUP_CELL_WIDTH + (this.detailTemplate && column > 0 ? GROUP_CELL_WIDTH : 0);
                this.container.nativeElement.scrollLeft = this.normalizeScrollLeft(offset + startOffset);
            }
            else if (column === 0 && this.detailTemplate) {
                this.container.nativeElement.scrollLeft = this.normalizeScrollLeft(0);
            }
            else {
                const firstRow = rowAt(0, this.table.nativeElement.rows);
                if (firstRow) {
                    const element = cellAt(column, firstRow.cells);
                    if (element) {
                        this.container.nativeElement.scrollLeft = this.elementScrollLeft(element);
                    }
                }
            }
        }
    }
    resetNavigationViewport() {
        if (!this.container || !this.navigationService.enabled ||
            !this.navigationService.needsViewport() || this.data.length === 0) {
            return;
        }
        const { scrollTop, offsetHeight } = this.container.nativeElement;
        const scrollBottom = scrollTop + offsetHeight;
        const firstItemIndex = this.rowHeightService.index(scrollTop);
        let lastItemIndex = this.rowHeightService.index(scrollBottom);
        const lastItemOffset = this.rowHeightService.offset(lastItemIndex);
        const lastItemOverflows = lastItemOffset + this.rowHeight > scrollBottom;
        if (lastItemIndex > 0 && lastItemOverflows) {
            lastItemIndex--;
        }
        let viewportStart = firstItemIndex;
        let viewportEnd = lastItemIndex;
        if (isPresent(this.detailTemplate)) {
            viewportStart *= 2;
            viewportEnd *= 2;
            const firstItemHeight = this.rowHeightService.offset(firstItemIndex);
            if (firstItemHeight + this.rowHeight < scrollTop) {
                viewportStart++;
            }
            const lastItemHeight = this.rowHeightService.height(lastItemIndex);
            const lastItemExpanded = this.rowHeightService.isExpanded(lastItemIndex);
            const lastItemDetailOverflows = lastItemOffset + lastItemHeight > scrollBottom;
            if (lastItemExpanded && !lastItemDetailOverflows) {
                viewportEnd++;
            }
        }
        this.navigationService.setViewport(viewportStart, viewportEnd);
    }
    cleanupScroller() {
        if (this.scrollerSubscription) {
            this.scrollerSubscription.unsubscribe();
        }
        if (this.scroller) {
            this.scroller.destroy();
        }
    }
    initResizeService() {
        this.resizeService.connect(merge(...this.resizeSensors.map(sensor => sensor.resize)));
    }
    syncContainerHeight() {
        [maybeNativeElement(this.lockedContainer)]
            .filter(isPresent)
            .map(el => {
            el.style.height = '';
            let height = this.container.nativeElement.offsetHeight;
            if (hasScrollbar(this.table, this.container)) {
                height -= this.supportService.scrollbarWidth;
            }
            return { el, height };
        })
            .forEach(setHeight$1(this.renderer));
    }
    updateViewportColumns(range) {
        const columns = this.columns.nonLockedLeafColumns.toArray();
        let { startIdx, endIdx, offset } = range || this.calculateViewportColumns();
        const start = Math.max(0, startIdx - bufferSize);
        const end = Math.min(endIdx + bufferSize, columns.length - 1);
        if (start < startIdx) {
            for (let idx = startIdx - 1; idx >= start; idx--) {
                offset -= columns[idx].width;
            }
        }
        let currentColumns = columns.slice(start, end + 1);
        this.viewportColumnsWidth = currentColumns.reduce((total, column) => total + column.width, 0);
        if (start > 0) {
            const offsetColumn = new ColumnBase$1();
            offsetColumn.width = offset;
            currentColumns.unshift(offsetColumn);
        }
        this.viewportColumns = new QueryList();
        this.viewportColumns.reset(currentColumns);
        this.columnsStartIdx = start;
        this.columnsEndIdx = end;
        this.columnInfo.columnRangeChange.emit({ start, end, offset });
        if (!range) {
            this.updateColumnViewport(startIdx, endIdx);
        }
    }
    handleColumnScroll() {
        const container = this.container.nativeElement;
        const scrollLeft = container.scrollLeft;
        if (this.scrollLeft !== scrollLeft) {
            this.scrollLeft = scrollLeft;
            const range = this.calculateViewportColumns();
            this.updateColumnViewport(range.startIdx, range.endIdx);
            if (range.startIdx < this.columnsStartIdx || this.columnsEndIdx < range.endIdx) {
                cancelAnimationFrame(this.columnUpdateFrame);
                this.columnUpdateFrame = requestAnimationFrame(() => {
                    this.ngZone.run(() => {
                        this.updateViewportColumns(range);
                        this.changeDetector.markForCheck();
                    });
                });
            }
        }
    }
    updateColumnViewport(startIdx, endIdx) {
        const lockedCount = this.lockedLeafColumns.length;
        const leafColumns$$1 = this.nonLockedLeafColumns.toArray();
        const viewportStart = lockedCount + startIdx + (this.detailTemplate && startIdx > 0 ? 1 : 0);
        let viewportEnd = lockedCount + endIdx + (this.detailTemplate ? 1 : 0);
        for (let idx = 0; idx < leafColumns$$1.length; idx++) {
            const column = leafColumns$$1[idx];
            if (column.isSpanColumn) {
                viewportEnd += column.childColumns.length;
            }
        }
        this.navigationService.setColumnViewport(viewportStart, viewportEnd);
    }
    calculateViewportColumns() {
        const { scrollLeft, clientWidth } = this.container.nativeElement;
        const columns = this.columns.nonLockedLeafColumns.toArray();
        const normalizedScrollLeft = this.normalizeScrollLeft(scrollLeft);
        const viewportEnd = normalizedScrollLeft + clientWidth;
        let startIdx;
        let endIdx = 0;
        let current = 0;
        let offset = 0;
        let idx;
        for (idx = 0; idx < columns.length; idx++) {
            const column = columns[idx];
            current += column.width || 0;
            if (startIdx === undefined && current > normalizedScrollLeft) {
                startIdx = idx;
                offset = current - (column.width || 0);
            }
            if (current >= viewportEnd) {
                endIdx = idx;
                break;
            }
        }
        if (!endIdx && idx > 0) {
            endIdx = columns.length - 1;
        }
        return { startIdx, endIdx, offset };
    }
    viewportWidthChange() {
        const currentWidth = this.viewportColumns.toArray().reduce((total, column) => total + column.width, 0);
        return currentWidth !== this.viewportColumnsWidth;
    }
    normalizeScrollLeft(position) {
        return this.rtl ? rtlScrollPosition(position, this.container.nativeElement, this.supportService.rtlScrollLeft) : position;
    }
    elementScrollLeft(element) {
        if (this.rtl) {
            return this.normalizeScrollLeft(this.container.nativeElement.scrollWidth - element.offsetLeft - element.offsetWidth);
        }
        return element.offsetLeft;
    }
}
ListComponent.decorators = [
    { type: Component, args: [{
                providers: [
                    {
                        provide: SCROLLER_FACTORY_TOKEN,
                        useValue: DEFAULT_SCROLLER_FACTORY
                    }
                ],
                selector: 'kendo-grid-list',
                template: `
    <div #lockedContainer class="k-grid-content-locked" role="presentation"
        *ngIf="isLocked" [style.width.px]="lockedWidth"
        [kendoEventsOutsideAngular]="{
            keydown: lockedKeydown,
            scroll: lockedScroll,
            mousewheel: lockedMousewheel,
            DOMMouseScroll: lockedMousewheel
        }"
        [scope]="this"
        >
        <div role="presentation" class="k-grid-table-wrap">
            <table [locked]="true" #lockedTable class="k-grid-table" role="presentation" [style.width.px]="lockedWidth">
                <colgroup kendoGridColGroup
                    role="presentation"
                    [groups]="groups"
                    [columns]="lockedLeafColumns"
                    [detailTemplate]="detailTemplate">
                </colgroup>
                <tbody kendoGridTableBody
                    role="presentation"
                    [groups]="groups"
                    [isLocked]="true"
                    [data]="data"
                    [noRecordsText]="''"
                    [columns]="lockedLeafColumns"
                    [totalColumnsCount]="leafColumns.length"
                    [detailTemplate]="detailTemplate"
                    [showGroupFooters]="showFooter"
                    [skip]="skip"
                    [selectable]="selectable"
                    [trackBy]="trackBy"
                    [filterable]="filterable"
                    [rowClass]="rowClass">
                </tbody>
            </table>
            <kendo-resize-sensor></kendo-resize-sensor>
        </div>
        <div class="k-height-container" role="presentation">
            <div [style.height.px]="totalHeight"></div>
        </div>
    </div><div #container
               class="k-grid-content k-virtual-content"
               role="presentation" tabindex="-1"
               [kendoGridResizableContainer]="lockedLeafColumns.length"
               [lockedWidth]="lockedWidth + 1">
        <div role="presentation" class="k-grid-table-wrap">
            <table [style.width.px]="nonLockedWidth" #table [virtualColumns]="virtualColumns"
              class="k-grid-table" role="presentation">
                <colgroup kendoGridColGroup
                    role="presentation"
                    [groups]="isLocked ? [] : groups"
                    [columns]="nonLockedColumnsToRender"
                    [detailTemplate]="detailTemplate">
                </colgroup>
                <tbody kendoGridTableBody
                    role="presentation"
                    [skipGroupDecoration]="isLocked"
                    [data]="data"
                    [groups]="groups"
                    [showGroupFooters]="showFooter"
                    [columns]="nonLockedColumnsToRender"
                    [allColumns]="nonLockedLeafColumns"
                    [detailTemplate]="detailTemplate"
                    [noRecordsTemplate]="noRecordsTemplate"
                    [lockedColumnsCount]="lockedLeafColumns.length"
                    [totalColumnsCount]="leafColumns.length"
                    [skip]="skip"
                    [selectable]="selectable"
                    [trackBy]="trackBy"
                    [filterable]="filterable"
                    [rowClass]="rowClass"
                    [virtualColumns]="virtualColumns">
                </tbody>
            </table>
            <kendo-resize-sensor *ngIf="isLocked"></kendo-resize-sensor>
        </div>
        <kendo-resize-sensor *ngIf="isLocked || virtualColumns"></kendo-resize-sensor>
        <div class="k-height-container" role="presentation">
            <div [style.height.px]="totalHeight"></div>
        </div>
        <div *ngIf="virtualColumns" class="k-width-container" role="presentation">
            <div [style.width.px]="totalWidth"></div>
        </div>
    </div>
    <div *ngIf="loading" kendoGridLoading>
    </div>
    `
            },] },
];
/** @nocollapse */
ListComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [SCROLLER_FACTORY_TOKEN,] }] },
    { type: DetailsService },
    { type: ChangeNotificationService },
    { type: SuspendService },
    { type: GroupsService },
    { type: NgZone },
    { type: Renderer2 },
    { type: ScrollSyncService },
    { type: ResizeService },
    { type: EditService },
    { type: BrowserSupportService },
    { type: NavigationService },
    { type: ScrollRequestService },
    { type: LocalizationService },
    { type: ColumnResizingService },
    { type: ChangeDetectorRef },
    { type: PDFService },
    { type: ColumnInfoService }
];
ListComponent.propDecorators = {
    hostClass: [{ type: HostBinding, args: ["class.k-grid-container",] }],
    hostRole: [{ type: HostBinding, args: ["attr.role",] }],
    data: [{ type: Input }],
    groups: [{ type: Input }],
    total: [{ type: Input }],
    rowHeight: [{ type: Input }],
    detailRowHeight: [{ type: Input }],
    take: [{ type: Input }],
    skip: [{ type: Input }],
    columns: [{ type: Input }],
    detailTemplate: [{ type: Input }],
    noRecordsTemplate: [{ type: Input }],
    selectable: [{ type: Input }],
    groupable: [{ type: Input }],
    filterable: [{ type: Input }],
    rowClass: [{ type: Input }],
    loading: [{ type: Input }],
    trackBy: [{ type: Input }],
    virtualColumns: [{ type: Input }],
    isVirtual: [{ type: Input }],
    contentScroll: [{ type: Output }],
    pageChange: [{ type: Output }],
    scrollBottom: [{ type: Output }],
    container: [{ type: ViewChild, args: ["container", { static: true },] }],
    lockedContainer: [{ type: ViewChild, args: ["lockedContainer",] }],
    lockedTable: [{ type: ViewChild, args: ["lockedTable",] }],
    table: [{ type: ViewChild, args: ["table",] }],
    resizeSensors: [{ type: ViewChildren, args: [ResizeSensorComponent,] }]
};

/**
 * A directive which encapsulates the in-memory handling of data operations such as [paging]({% slug paging_grid %}),
 * [sorting]({% slug sorting_grid %}), and [grouping]({% slug groupingbasics_grid %})
 * ([more information and examples]({% slug automaticoperations_grid %})).
 */
class DataBindingDirective {
    constructor(grid, changeDetector, localDataChangesService) {
        this.grid = grid;
        this.changeDetector = changeDetector;
        this.localDataChangesService = localDataChangesService;
        this.state = {
            skip: 0
        };
        this.originalData = [];
        if (localDataChangesService) {
            this.dataChangedSubscription = this.localDataChangesService.changes.subscribe(this.rebind.bind(this));
        }
    }
    /**
     * Defines the number of records that will be skipped by the pager.
     */
    set skip(value) {
        if (!isPresent(value)) {
            value = 0;
        }
        this.grid.skip = this.state.skip = value;
    }
    /**
     * Defines the descriptors by which the data will be sorted.
     */
    set sort(value) {
        this.grid.sort = this.state.sort = value;
    }
    /**
     * Defines the descriptor by which the data will be filtered.
     */
    set filter(value) {
        this.grid.filter = this.state.filter = value;
    }
    /**
     * Defines the page size used by the Grid pager.
     */
    set pageSize(value) {
        this.grid.pageSize = this.state.take = value;
    }
    /**
     * The descriptors by which the data will be grouped.
     */
    set group(value) {
        this.grid.group = this.state.group = value;
    }
    /**
     * The array of data which will be used to populate the Grid.
     */
    set data(value) {
        this.originalData = value || [];
        if (this.localDataChangesService) {
            this.localDataChangesService.data = value;
        }
        this.dataChanged = true;
    }
    /**
     * @hidden
     */
    ngOnInit() {
        this.applyState(this.state);
        this.stateChangeSubscription = this.grid
            .dataStateChange
            .subscribe(this.onStateChange.bind(this));
    }
    /**
     * @hidden
     */
    ngOnDestroy() {
        if (this.stateChangeSubscription) {
            this.stateChangeSubscription.unsubscribe();
        }
        if (this.dataChangedSubscription) {
            this.dataChangedSubscription.unsubscribe();
        }
    }
    /**
     * @hidden
     */
    ngOnChanges(changes) {
        if (anyChanged(["pageSize", "skip", "sort", "group", "filter"], changes)) {
            this.rebind();
        }
    }
    ngDoCheck() {
        if (this.dataChanged) {
            this.updateGridData();
        }
    }
    /**
     * @hidden
     */
    onStateChange(state$$1) {
        this.applyState(state$$1);
        this.rebind();
    }
    /**
     * @hidden
     */
    rebind() {
        this.data = this.originalData;
        this.updateGridData();
        this.notifyDataChange();
    }
    /**
     * Notifies the Grid that its data has changed.
     */
    notifyDataChange() {
        this.grid.onDataChange();
        if (this.changeDetector) {
            this.changeDetector.markForCheck();
        }
    }
    process(state$$1) {
        return process(this.originalData, state$$1);
    }
    applyState({ skip, take: take$$1, sort, group, filter: filter$$1 }) {
        this.skip = skip;
        this.pageSize = take$$1;
        this.sort = sort;
        this.group = group;
        this.filter = filter$$1;
    }
    updateGridData() {
        this.grid.data = this.process(this.state);
        this.dataChanged = false;
    }
}
DataBindingDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoGridBinding]'
            },] },
];
/** @nocollapse */
DataBindingDirective.ctorParameters = () => [
    { type: GridComponent },
    { type: ChangeDetectorRef },
    { type: LocalDataChangesService }
];
DataBindingDirective.propDecorators = {
    skip: [{ type: Input }],
    sort: [{ type: Input }],
    filter: [{ type: Input }],
    pageSize: [{ type: Input }],
    group: [{ type: Input }],
    data: [{ type: Input, args: ["kendoGridBinding",] }]
};

/**
 * A directive which stores the row selection state of the Grid in memory
 * ([see example]({% slug selection_grid %}#toc-during-data-operations)).
 */
class SelectionDirective extends Selection {
    constructor(grid, cd) {
        super(grid, cd);
        this.grid = grid;
    }
    /**
     * @hidden
     */
    ngOnInit() {
        if (this.grid.selectable === false) {
            this.grid.selectable = true;
        }
        this.grid.selectionDirective = this;
    }
    /**
     * @hidden
     */
    ngOnDestroy() {
        super.destroy();
    }
}
SelectionDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoGridSelectBy]'
            },] },
];
/** @nocollapse */
SelectionDirective.ctorParameters = () => [
    { type: GridComponent },
    { type: ChangeDetectorRef }
];

/**
 * A directive which controls the expanded state of the master detail rows.
 */
class ExpandDetailsDirective {
    constructor(grid) {
        this.grid = grid;
        /**
         * Fires when the expandedDetailKeys are changed.
         */
        this.expandedDetailKeysChange = new EventEmitter();
        /**
         * Defines the collection that will store the expanded keys.
         */
        this.expandedDetailKeys = [];
        /**
         * Specifies if the items should be initially expanded.
         * @default false
         */
        this.initiallyExpanded = false;
        this.subscriptions = new Subscription();
        this.grid.isDetailExpanded = this.isExpanded.bind(this);
        this.subscriptions.add(merge(this.grid.detailExpand.pipe(map(e => (Object.assign({ expand: true }, e)))), this.grid.detailCollapse.pipe(map(e => (Object.assign({ expand: false }, e))))).subscribe(this.toggleState.bind(this)));
    }
    /**
     * Defines the item key that will be stored in the `expandedDetailKeys` collection ([see example]({% slug master_detail_expanded_state_grid %}#toc-built-in-directive)).
     */
    get expandDetailsKey() {
        return this._expandBy;
    }
    set expandDetailsKey(key) {
        if (isString(key)) {
            this._expandBy = getter(key);
        }
        else {
            this._expandBy = key;
        }
    }
    /**
     *
     * @hidden
     * A deprecated alias for setting the `expandDetailsKey` property.
     */
    get expandDetailBy() {
        return this.expandDetailsKey;
    }
    set expandDetailBy(key) {
        this.expandDetailsKey = key;
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
    get keyGetter() {
        return this._expandBy || getter(undefined);
    }
    /**
     * @hidden
     */
    isExpanded(args) {
        const key = this.keyGetter(args.dataItem);
        return this.expandedDetailKeys.indexOf(key) > -1 ? !this.initiallyExpanded : this.initiallyExpanded;
    }
    toggleState(args) {
        const key = this.keyGetter(args.dataItem);
        if (Boolean(this.initiallyExpanded) !== args.expand) {
            this.expandedDetailKeys.push(key);
        }
        else {
            const index = this.expandedDetailKeys.indexOf(key);
            this.expandedDetailKeys.splice(index, 1);
        }
        this.expandedDetailKeysChange.emit(this.expandedDetailKeys);
    }
}
ExpandDetailsDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoGridExpandDetailsBy]',
                exportAs: 'kendoGridExpandDetailsBy'
            },] },
];
/** @nocollapse */
ExpandDetailsDirective.ctorParameters = () => [
    { type: GridComponent }
];
ExpandDetailsDirective.propDecorators = {
    expandedDetailKeysChange: [{ type: Output }],
    expandDetailsKey: [{ type: Input, args: ['kendoGridExpandDetailsBy',] }],
    expandDetailBy: [{ type: Input }],
    expandedDetailKeys: [{ type: Input }],
    initiallyExpanded: [{ type: Input }]
};

/**
 * @hidden
 */
class Messages extends ComponentMessages {
}
Messages.propDecorators = {
    groupPanelEmpty: [{ type: Input }],
    noRecords: [{ type: Input }],
    pagerFirstPage: [{ type: Input }],
    pagerLastPage: [{ type: Input }],
    pagerPreviousPage: [{ type: Input }],
    pagerNextPage: [{ type: Input }],
    pagerPage: [{ type: Input }],
    pagerItemsPerPage: [{ type: Input }],
    pagerOf: [{ type: Input }],
    pagerItems: [{ type: Input }],
    pagerPageNumberInputTitle: [{ type: Input }],
    filter: [{ type: Input }],
    filterEqOperator: [{ type: Input }],
    filterNotEqOperator: [{ type: Input }],
    filterIsNullOperator: [{ type: Input }],
    filterIsNotNullOperator: [{ type: Input }],
    filterIsEmptyOperator: [{ type: Input }],
    filterIsNotEmptyOperator: [{ type: Input }],
    filterStartsWithOperator: [{ type: Input }],
    filterContainsOperator: [{ type: Input }],
    filterNotContainsOperator: [{ type: Input }],
    filterEndsWithOperator: [{ type: Input }],
    filterGteOperator: [{ type: Input }],
    filterGtOperator: [{ type: Input }],
    filterLteOperator: [{ type: Input }],
    filterLtOperator: [{ type: Input }],
    filterIsTrue: [{ type: Input }],
    filterIsFalse: [{ type: Input }],
    filterBooleanAll: [{ type: Input }],
    filterAfterOrEqualOperator: [{ type: Input }],
    filterAfterOperator: [{ type: Input }],
    filterBeforeOperator: [{ type: Input }],
    filterBeforeOrEqualOperator: [{ type: Input }],
    filterFilterButton: [{ type: Input }],
    filterClearButton: [{ type: Input }],
    filterAndLogic: [{ type: Input }],
    filterOrLogic: [{ type: Input }],
    loading: [{ type: Input }],
    columnMenu: [{ type: Input }],
    columns: [{ type: Input }],
    lock: [{ type: Input }],
    unlock: [{ type: Input }],
    sortable: [{ type: Input }],
    sortAscending: [{ type: Input }],
    sortDescending: [{ type: Input }],
    sortedAscending: [{ type: Input }],
    sortedDescending: [{ type: Input }],
    sortedDefault: [{ type: Input }],
    columnsApply: [{ type: Input }],
    columnsReset: [{ type: Input }],
    detailExpand: [{ type: Input }],
    detailCollapse: [{ type: Input }],
    filterDateToday: [{ type: Input }],
    filterDateToggle: [{ type: Input }],
    filterNumericDecrement: [{ type: Input }],
    filterNumericIncrement: [{ type: Input }]
};

/**
 * @hidden
 */
class LocalizedMessagesDirective extends Messages {
    constructor(service) {
        super();
        this.service = service;
    }
}
LocalizedMessagesDirective.decorators = [
    { type: Directive, args: [{
                providers: [
                    {
                        provide: Messages,
                        useExisting: forwardRef(() => LocalizedMessagesDirective)
                    }
                ],
                selector: '[kendoGridLocalizedMessages]'
            },] },
];
/** @nocollapse */
LocalizedMessagesDirective.ctorParameters = () => [
    { type: LocalizationService }
];

/**
 * Custom component messages override default component messages
 * ([see example]({% slug globalization_grid %}#toc-localization)).
 */
class CustomMessagesComponent extends Messages {
    constructor(service) {
        super();
        this.service = service;
    }
    get override() {
        return true;
    }
}
CustomMessagesComponent.decorators = [
    { type: Component, args: [{
                providers: [
                    {
                        provide: Messages,
                        useExisting: forwardRef(() => CustomMessagesComponent)
                    }
                ],
                selector: 'kendo-grid-messages',
                template: ``
            },] },
];
/** @nocollapse */
CustomMessagesComponent.ctorParameters = () => [
    { type: LocalizationService }
];

/**
 * @hidden
 */
class FilterRowComponent {
    constructor(localization) {
        this.localization = localization;
        this.columns = [];
        this.groups = [];
        this.filterRowClass = true;
        this.filterLabel = this.localization.get('filter');
    }
}
FilterRowComponent.decorators = [
    { type: Component, args: [{
                selector: '[kendoGridFilterRow]',
                template: `
      <td
         [class.k-group-cell]="true"
         *ngFor="let g of groups"
         role="presentation">
      </td>
      <td
         [class.k-hierarchy-cell]="true"
         *ngIf="detailTemplate?.templateRef"
         role="presentation">
      </td>
      <td *ngFor="let column of columns; let columnIndex = index"
          [attr.aria-label]="filterLabel"
          kendoGridFilterCell
            [column]="column"
            [filter]="filter"
          kendoGridLogicalCell
            [logicalRowIndex]="logicalRowIndex"
            [logicalColIndex]="lockedColumnsCount + columnIndex"
      ></td>
    `
            },] },
];
/** @nocollapse */
FilterRowComponent.ctorParameters = () => [
    { type: LocalizationService }
];
FilterRowComponent.propDecorators = {
    columns: [{ type: Input }],
    filter: [{ type: Input }],
    groups: [{ type: Input }],
    detailTemplate: [{ type: Input }],
    logicalRowIndex: [{ type: Input }],
    lockedColumnsCount: [{ type: Input }],
    filterRowClass: [{ type: HostBinding, args: ['class.k-filter-row',] }]
};

const areDifferent = (a, b) => a.field !== b.field || a.operator !== b.operator || a.value !== b.value;
const isChanged$1 = (a, b) => {
    if (a.length !== b.length) {
        return true;
    }
    for (let idx = 0, len = a.length; idx < len; idx++) {
        const prev = a[idx];
        const curr = b[idx];
        if (isCompositeFilterDescriptor(prev)) {
            // tslint:disable-next-line:no-use-before-declare
            if (diffFilters(prev, curr[idx])) {
                return true;
            }
        }
        else if (areDifferent(prev, curr)) {
            return true;
        }
    }
    return false;
};
const copyObject = (obj) => {
    const result = {};
    Object.assign(result, obj);
    if (obj.constructor !== Object) {
        const proto = obj.constructor.prototype;
        Object.getOwnPropertyNames(proto).forEach((property) => {
            if (property !== 'constructor' && proto.hasOwnProperty(property)) {
                result[property] = obj[property];
            }
        });
    }
    return result;
};
const cloneFilter = (filter$$1) => copyObject(filter$$1);
/**
 * @hidden
 */
const cloneFilters = (filter$$1) => {
    if (!filter$$1) {
        return;
    }
    if (isCompositeFilterDescriptor(filter$$1)) {
        return {
            filters: cloneFilters(filter$$1.filters),
            logic: filter$$1.logic
        };
    }
    else if (Array.isArray(filter$$1)) {
        return filter$$1.map(cloneFilters);
    }
    return cloneFilter(filter$$1);
};
/**
 * @hidden
 */
const diffFilters = (a, b) => {
    if (isPresent(a) && !isPresent(b)) {
        return true;
    }
    if (!isPresent(a) && isPresent(b)) {
        return true;
    }
    return isPresent(a) && isPresent(b) && isChanged$1(a.filters, b.filters);
};

/**
 * @hidden
 */
class FilterCellComponent {
    constructor() {
        this._templateContext = {};
    }
    get filter() {
        return this._filter;
    }
    set filter(value) {
        this._filter = cloneFilters(value);
    }
    get templateContext() {
        this._templateContext.column = this.column;
        this._templateContext.filter = this.filter;
        // tslint:disable-next-line:no-string-literal
        this._templateContext["$implicit"] = this.filter;
        return this._templateContext;
    }
    get hasTemplate() {
        return isPresent(this.column.filterCellTemplateRef);
    }
    get isFilterable() {
        return isPresent(this.column) && !isNullOrEmptyString(this.column.field) && this.column.filterable;
    }
}
FilterCellComponent.decorators = [
    { type: Component, args: [{
                selector: '[kendoGridFilterCell]',
                template: `
        <ng-template [ngIf]="isFilterable">
            <ng-container [ngSwitch]="hasTemplate">
                <ng-container *ngSwitchCase="false">
                    <ng-container kendoFilterCellHost [column]="column" [filter]="filter"></ng-container>
                </ng-container>
                <ng-container *ngSwitchCase="true">
                    <ng-template
                        *ngIf="column.filterCellTemplateRef"
                        [ngTemplateOutlet]="column.filterCellTemplateRef"
                        [ngTemplateOutletContext]="templateContext">
                    </ng-template>
                </ng-container>
            </ng-container>
        </ng-template>
    `
            },] },
];
FilterCellComponent.propDecorators = {
    column: [{ type: Input }],
    filter: [{ type: Input }]
};

const localizeOperators = operators => localization => Object.keys(operators).reduce((acc, key) => {
    acc[operators[key]] = localization.get(key);
    return acc;
}, {}); // tslint:disable-line:align
const operatorTexts = localizeOperators({
    "filterEqOperator": "eq",
    "filterNotEqOperator": "neq",
    // tslint:disable-next-line:object-literal-sort-keys
    "filterGteOperator": "gte",
    "filterGtOperator": "gt",
    "filterLteOperator": "lte",
    "filterLtOperator": "lt",
    "filterIsNullOperator": "isnull",
    "filterIsNotNullOperator": "isnotnull",
    "filterIsEmptyOperator": "isempty",
    "filterIsNotEmptyOperator": "isnotempty",
    "filterContainsOperator": "contains",
    "filterNotContainsOperator": "doesnotcontain",
    "filterStartsWithOperator": "startswith",
    "filterEndsWithOperator": "endswith",
    "filterAfterOrEqualOperator": "after-eq",
    "filterAfterOperator": "after",
    "filterBeforeOrEqualOperator": "before-eq",
    "filterBeforeOperator": "before"
});
/**
 * @hidden
 */
const toJSON = (xs) => xs.map(x => x.toJSON());
/**
 * @hidden
 */
class FilterOperatorBase {
    constructor(operator, localization) {
        this.operator = operator;
        this.localization = localization;
        this.messages = operatorTexts(this.localization);
        this._text = this.messages[this.operator];
        this.localization.changes.subscribe(this.refreshText.bind(this));
    }
    /**
     * The text that will be displayed in the drop-down list.
     * @readonly
     * @type {string}
     * @memberOf FilterOperatorBase
     */
    get text() {
        return this._text;
    }
    /**
     *
     */
    set text(value) {
        this._text = isNullOrEmptyString(value) ? this.messages[this.operator] : value;
    }
    /**
     * @hidden
     */
    toJSON() {
        return {
            text: this.text,
            value: this.operator
        };
    }
    refreshText() {
        const update = this._text === this.messages[this.operator];
        this.messages = operatorTexts(this.localization);
        if (update) {
            this._text = this.messages[this.operator];
        }
    }
}
FilterOperatorBase.propDecorators = {
    text: [{ type: Input }]
};

const insertDefaultFilter = (index, rootFilter, filter$$1) => {
    rootFilter = (rootFilter || { filters: [], logic: "and" });
    rootFilter.filters[index] = filter$$1;
    return filter$$1;
};
/**
 * @hidden
 */
const setFilter = (index, filter$$1, field, defaultOperator) => {
    if (isPresent(filter$$1) && isPresent(filter$$1.filters) && filter$$1.filters.length > index) {
        return filter$$1.filters[index];
    }
    else {
        return insertDefaultFilter(index, filter$$1, {
            field,
            operator: defaultOperator
        });
    }
};
/**
 * @hidden
 */
const logicOperators = (localization) => [
    { text: localization.get("filterAndLogic"), value: "and" },
    { text: localization.get("filterOrLogic"), value: "or" }
];
/**
 * @hidden
 */
const flatten = (filter$$1) => {
    if (isPresent(filter$$1.filters)) {
        return filter$$1.filters.reduce((acc, curr) => acc.concat(isCompositeFilterDescriptor(curr) ? flatten(curr) : [curr]), []);
    }
    return [];
};
const trimFilterByField = (filter$$1, field) => {
    if (isPresent(filter$$1) && isPresent(filter$$1.filters)) {
        filter$$1.filters = filter$$1.filters.filter(x => {
            if (isCompositeFilterDescriptor(x)) {
                trimFilterByField(x, field);
                return x.filters.length;
            }
            else {
                return x.field !== field;
            }
        });
    }
};
/**
 * @hidden
 */
const filtersByField = (filter$$1, field) => flatten(filter$$1 || {}).filter(x => x.field === field);
/**
 * @hidden
 */
const filterByField = (filter$$1, field) => {
    let [currentFilter] = filtersByField(filter$$1, field);
    return currentFilter;
};
/**
 * @hidden
 */
const removeFilter = (filter$$1, field) => {
    trimFilterByField(filter$$1, field);
    return filter$$1;
};
/**
 * @hidden
 */
const localizeOperators$1 = operators => localization => Object.keys(operators).map(key => ({
    text: localization.get(key),
    value: operators[key]
}));
/**
 * An abstract base class for the filter-cell component ([see example]({% slug reusablecustomfilters_grid %}#toc-filter-row)).
 */
class BaseFilterCellComponent {
    constructor(filterService) {
        this.filterService = filterService;
        this.operatorList = new QueryList();
    }
    /**
     * @hidden
     */
    get hostClasses() {
        return true;
    }
    get operators() {
        return this._operators.length ? this._operators : this.defaultOperators;
    }
    set operators(values) {
        this._operators = values;
    }
    /**
     * @hidden
     */
    ngAfterContentInit() {
        this.operationListSubscription = observe(this.operatorList)
            .pipe(map(q => q.toArray()), map(toJSON))
            .subscribe(x => {
            this.operators = x;
        });
    }
    ngOnDestroy() {
        if (this.operationListSubscription) {
            this.operationListSubscription.unsubscribe();
        }
    }
    filterByField(field) {
        return filterByField(this.filter, field);
    }
    filtersByField(field) {
        return filtersByField(this.filter, field);
    }
    removeFilter(field) {
        return removeFilter(this.filter, field);
    }
    updateFilter(filter$$1) {
        const root = this.filter || {
            filters: [],
            logic: "and"
        };
        let [currentFilter] = flatten(root).filter(x => x.field === filter$$1.field);
        if (!isPresent(currentFilter)) {
            root.filters.push(filter$$1);
        }
        else {
            Object.assign(currentFilter, filter$$1);
        }
        return root;
    }
    applyFilter(filter$$1) {
        this.filterService.filter(filter$$1);
    }
}
BaseFilterCellComponent.propDecorators = {
    hostClasses: [{ type: HostBinding, args: ['class.k-filtercell',] }],
    operatorList: [{ type: ContentChildren, args: [FilterOperatorBase,] }]
};

// tslint:disable:no-access-missing-member
const numericOperators = localizeOperators$1({
    "filterEqOperator": "eq",
    "filterNotEqOperator": "neq",
    // tslint:disable-next-line:object-literal-sort-keys
    "filterGteOperator": "gte",
    "filterGtOperator": "gt",
    "filterLteOperator": "lte",
    "filterLtOperator": "lt",
    "filterIsNullOperator": "isnull",
    "filterIsNotNullOperator": "isnotnull"
});
/**
 * Represents a base numeric filter component.
 */
class NumericFilterComponent extends BaseFilterCellComponent {
    constructor(filterService, localization) {
        super(filterService);
        this.localization = localization;
        /**
         * The default filter operator. Defaults to `eq`.
         * @type {string}
         */
        this.operator = "eq";
        /**
         * Specifies the value that is used to increment or decrement the component value.
         * @type {numeric}
         */
        this.step = 1;
        /**
         * Specifies whether the **Up** and **Down** spin buttons will be rendered.
         * @type {boolean}
         */
        this.spinners = true;
        this.defaultOperators = numericOperators(this.localization);
    }
    /**
     * Specifies the number format used when the component is not focused.
     * By default, the `column.format` value is used (if set).
     */
    set format(value) {
        this._format = value;
    }
    /**
     * Specifies the number format used when the component is not focused.
     * By default, the `column.format` value is used (if set).
     *
     * @readonly
     * @type {string}
     */
    get format() {
        return !isNullOrEmptyString(this._format) ? this._format : this.columnFormat;
    }
    /**
     * The current filter for the associated column field.
     * @readonly
     * @type {FilterDescriptor}
     */
    get currentFilter() {
        return this.filterByField(this.column.field);
    }
    /**
     * The current filter operator for the associated column field.
     * @readonly
     * @type {string}
     */
    get currentOperator() {
        return this.currentFilter ? this.currentFilter.operator : this.operator;
    }
    get columnFormat() {
        return this.column && !isNullOrEmptyString(this.column.format) ?
            extractFormat(this.column.format) : "n2";
    }
    ngOnInit() {
        this.subscription = this.localization.changes.subscribe(this.localizationChange.bind(this));
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        super.ngOnDestroy();
    }
    localizationChange() {
        this.defaultOperators = numericOperators(this.localization);
        if (this.operatorList.length) {
            this.operators = toJSON(this.operatorList.toArray());
        }
    }
}
NumericFilterComponent.propDecorators = {
    column: [{ type: Input }],
    filter: [{ type: Input }],
    operator: [{ type: Input }],
    step: [{ type: Input }],
    min: [{ type: Input }],
    max: [{ type: Input }],
    spinners: [{ type: Input }],
    decimals: [{ type: Input }],
    format: [{ type: Input }]
};

/**
 * Represents a numeric filter cell.
 *
 * @example
 *  ```html-no-run
 *      <kendo-grid-column field="ProductName" title="Product Name">
 *          <ng-template kendoGridFilterCellTemplate let-filter let-column="column">
 *          <kendo-grid-numeric-filter-cell
 *              [column]="column"
 *              [filter]="filter">
 *          </kendo-grid-numeric-filter-cell>
 *          </ng-template>
 *      </kendo-grid-column>
 *   ```
 */
class NumericFilterCellComponent extends NumericFilterComponent {
    constructor(filterService, localization) {
        super(filterService, localization);
        this.localization = localization;
        /**
         * Determines the delay time (in milliseconds) before the filter value is submitted.
         * A value of `0` indicates no delay. The default value is `500`.
         * @type {boolean}
         */
        this.filterDelay = 500;
        /**
         * Determines if the drop-down filter operators will be displayed.
         * The default value is `true`.
         * @type {boolean}
         */
        this.showOperators = true;
    }
    /**
     * @hidden
     */
    messageFor(key) {
        return this.localization.get(key);
    }
}
NumericFilterCellComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-grid-numeric-filter-cell',
                template: `
        <kendo-grid-filter-wrapper-cell
            [column]="column"
            [filter]="filter"
            [operators]="operators"
            [defaultOperator]="operator"
            [showOperators]="showOperators"
        >
            <kendo-numerictextbox
                kendoGridFocusable
                kendoFilterInput
                [filterDelay]="filterDelay"
                [autoCorrect]="true"
                [value]="currentFilter?.value"
                [format]="format"
                [decimals]="decimals"
                [spinners]="spinners"
                [min]="min"
                [max]="max"
                [step]="step"
            >
                <kendo-numerictextbox-messages
                    [increment]="messageFor('filterNumericIncrement')"
                    [decrement]="messageFor('filterNumericDecrement')"
                >
                </kendo-numerictextbox-messages>
            </kendo-numerictextbox>
        </kendo-grid-filter-wrapper-cell>
    `
            },] },
];
/** @nocollapse */
NumericFilterCellComponent.ctorParameters = () => [
    { type: FilterService },
    { type: LocalizationService }
];
NumericFilterCellComponent.propDecorators = {
    filterDelay: [{ type: Input }],
    showOperators: [{ type: Input }]
};

/**
 * @hidden
 */
class FilterInputDirective {
    constructor(valueAccessors, ngZone, element, renderer) {
        this.change = new EventEmitter();
        this.composing = false;
        this.filterDelay = 500;
        this.changeRequests = new Subject();
        this.accessor = valueAccessors[0];
        ngZone.runOutsideAngular(() => {
            const unsubscribeStart = renderer.listen(element.nativeElement, 'compositionstart', () => this.composing = true);
            const unsubscribeEnd = renderer.listen(element.nativeElement, 'compositionend', () => this.composing = false);
            this.unsubscribeEvents = () => {
                unsubscribeStart();
                unsubscribeEnd();
            };
        });
    }
    set value(value) {
        this.accessor.writeValue(value);
    }
    set disabled(value) {
        this.accessor.setDisabledState(value);
    }
    ngAfterViewInit() {
        this.accessor.registerOnChange(x => this.filterDelay > 0 ?
            this.changeRequests.next(x) :
            this.change.emit(x));
        this.subscribeChanges();
    }
    ngOnChanges(changes) {
        if (isChanged('filterDelay', changes)) {
            this.unsubscribeChanges();
            this.subscribeChanges();
        }
    }
    ngOnDestroy() {
        this.unsubscribeChanges();
        this.unsubscribeEvents();
    }
    subscribeChanges() {
        this.changeRequestsSubscription = this.changeRequests
            .pipe(debounceTime(this.filterDelay), filter(() => !this.composing))
            .subscribe(x => this.change.emit(x));
    }
    unsubscribeChanges() {
        if (this.changeRequestsSubscription) {
            this.changeRequestsSubscription.unsubscribe();
        }
    }
}
FilterInputDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoFilterInput]'
            },] },
];
/** @nocollapse */
FilterInputDirective.ctorParameters = () => [
    { type: Array, decorators: [{ type: Self }, { type: Inject, args: [NG_VALUE_ACCESSOR,] }] },
    { type: NgZone },
    { type: ElementRef },
    { type: Renderer2 }
];
FilterInputDirective.propDecorators = {
    filterDelay: [{ type: Input }],
    value: [{ type: Input }]
};

const EMPTY_VALUE_OPERATORS = new Set(['isnull', 'isnotnull', 'isempty', 'isnotempty']);
const isEmptyValueOperator = (operator) => EMPTY_VALUE_OPERATORS.has(operator);
/**
 * @hidden
 */
class FilterInputWrapperComponent extends BaseFilterCellComponent {
    constructor(filterService) {
        super(filterService);
        this.operators = [];
    }
    get currentFilter() {
        return this.filterByField(this.column.field);
    }
    get currentOperator() {
        const filter$$1 = this.currentFilter;
        if (!this._operator) {
            this._operator = filter$$1 ? filter$$1.operator : this.defaultOperator;
        }
        return this._operator;
    }
    set currentOperator(value) {
        this._operator = value;
        const emptyValueOperator = isEmptyValueOperator(value);
        this.filterInputDisabled = emptyValueOperator;
        if (emptyValueOperator) {
            this.applyNoValueFilter(value);
        }
        else if (!isBlank(value) && isPresent(this.currentFilter)) {
            this.onChange(this.currentFilter.value);
        }
    }
    get defaultOperator() {
        if (!isNullOrEmptyString(this._defaultOperator)) {
            return this._defaultOperator;
        }
        else if (this.operators && this.operators.length) {
            return this.operators[0].value;
        }
        return "eq";
    }
    set defaultOperator(value) {
        this._defaultOperator = value;
    }
    set filterInputDisabled(disabled) {
        if (!this.input) {
            return;
        }
        this.input.disabled = disabled;
    }
    ngAfterContentInit() {
        if (isPresent(this.input)) {
            this.changeSubscription = this.input.change.subscribe(this.onChange.bind(this));
            this.filterInputDisabled = isEmptyValueOperator(this.currentOperator);
        }
    }
    ngOnDestroy() {
        super.ngOnDestroy();
        if (this.changeSubscription) {
            this.changeSubscription.unsubscribe();
        }
    }
    onChange(value) {
        if (!isNullOrEmptyString(value) || this.filterByField(this.column.field)) {
            this.filterChange(isNullOrEmptyString(value) ?
                this.removeFilter(this.column.field) :
                this.updateFilter({
                    field: this.column.field,
                    operator: this.currentOperator,
                    value: value
                }));
        }
    }
    onClear() {
        this.onChange(null);
        this.filterInputDisabled = isEmptyValueOperator(this.defaultOperator);
    }
    applyNoValueFilter(operator) {
        this.filterChange(this.updateFilter({
            field: this.column.field,
            operator: operator,
            value: null
        }));
    }
    ngOnChanges(changes) {
        if (isChanged("filter", changes, false)) {
            this._operator = null;
            this.filterInputDisabled = isEmptyValueOperator(this.currentOperator);
        }
    }
}
FilterInputWrapperComponent.propDecorators = {
    operators: [{ type: Input }],
    column: [{ type: Input }],
    filter: [{ type: Input }],
    input: [{ type: ContentChild, args: [FilterInputDirective,] }],
    defaultOperator: [{ type: Input }]
};

const EMPTY_FILTER_OPERATORS = ['isnull', 'isnotnull', 'isempty', 'isnotempty'];
/**
 * @hidden
 */
class FilterCellWrapperComponent extends FilterInputWrapperComponent {
    constructor(filterService) {
        super(filterService);
        this.showOperators = true;
    }
    get hostClasses() {
        return true;
    }
    get overrideBaseClasses() {
        return false;
    }
    get showButton() {
        const filter$$1 = this.currentFilter;
        return isPresent(filter$$1) && (!isNullOrEmptyString(filter$$1.value) ||
            EMPTY_FILTER_OPERATORS.indexOf(String(filter$$1.operator)) >= 0);
    }
    filterChange(filter$$1) {
        this.applyFilter(filter$$1);
    }
}
FilterCellWrapperComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-grid-filter-wrapper-cell',
                template: `
        <ng-content></ng-content>
        <kendo-grid-filter-cell-operators
            [showOperators]="showOperators"
            [operators]="operators"
            (clear)="onClear()"
            [showButton]="showButton"
            [(value)]="currentOperator">
        </kendo-grid-filter-cell-operators>
    `
            },] },
];
/** @nocollapse */
FilterCellWrapperComponent.ctorParameters = () => [
    { type: FilterService }
];
FilterCellWrapperComponent.propDecorators = {
    hostClasses: [{ type: HostBinding, args: ['class.k-filtercell-wrapper',] }],
    overrideBaseClasses: [{ type: HostBinding, args: ['class.k-filtercell',] }],
    showOperators: [{ type: Input }]
};

// tslint:disable:no-access-missing-member
const stringOperators = localizeOperators$1({
    "filterEqOperator": "eq",
    "filterNotEqOperator": "neq",
    // tslint:disable-next-line:object-literal-sort-keys
    "filterContainsOperator": "contains",
    "filterNotContainsOperator": "doesnotcontain",
    "filterStartsWithOperator": "startswith",
    "filterEndsWithOperator": "endswith",
    "filterIsNullOperator": "isnull",
    "filterIsNotNullOperator": "isnotnull",
    "filterIsEmptyOperator": "isempty",
    "filterIsNotEmptyOperator": "isnotempty"
});
/**
 * Represents a base string filter component.
 */
class StringFilterComponent extends BaseFilterCellComponent {
    constructor(filterService, localization) {
        super(filterService);
        this.localization = localization;
        /**
         * The default filter operator. Defaults to `contains`.
         * @type {string}
         */
        this.operator = "contains";
    }
    /**
     * The current filter for the associated column field.
     * @readonly
     * @type {FilterDescriptor}
     */
    get currentFilter() {
        return this.filterByField((this.column || {}).field);
    }
    /**
     * The current filter operator for the associated column field.
     * @readonly
     * @type {string}
     */
    get currentOperator() {
        return this.currentFilter ? this.currentFilter.operator : this.operator;
    }
    ngOnInit() {
        this.subscription = this.localization.changes.subscribe(this.localizationChange.bind(this));
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        super.ngOnDestroy();
    }
    localizationChange() {
        this.defaultOperators = stringOperators(this.localization);
        if (this.operatorList.length) {
            this.operators = toJSON(this.operatorList.toArray());
        }
    }
}
StringFilterComponent.propDecorators = {
    column: [{ type: Input }],
    filter: [{ type: Input }],
    operator: [{ type: Input }]
};

/**
 * Represents a string-filter cell component
 * ([see example]({% slug builtinfiltertemplate_grid %}#toc-configuration-components-for-filter-templates)).
 *
 * @example
 *
 *  ```html-no-run
 *      <kendo-grid-column field="ProductName" title="Product Name">
 *          <ng-template kendoGridFilterCellTemplate let-filter let-column="column">
 *          <kendo-grid-string-filter-cell
 *              [showOperators]="false"
 *              [column]="column"
 *              [filter]="filter">
 *          </kendo-grid-string-filter-cell>
 *          </ng-template>
 *      </kendo-grid-column>
 *   ```
 */
class StringFilterCellComponent extends StringFilterComponent {
    constructor(filterService, localization) {
        super(filterService, localization);
        /**
         * Determines the delay time (in milliseconds) before the filter value is submitted.
         * A value of `0` indicates no delay. The default value is `500`.
         * @type {boolean}
         */
        this.filterDelay = 500;
        /**
         * Determines if the drop-down filter operators will be displayed.
         * The default value is `true`.
         * @type {boolean}
         */
        this.showOperators = true;
    }
}
StringFilterCellComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-grid-string-filter-cell',
                template: `
        <kendo-grid-filter-wrapper-cell
            [column]="column"
            [filter]="filter"
            [operators]="operators"
            [defaultOperator]="operator"
            [showOperators]="showOperators">
            <input
                class="k-textbox"
                kendoGridFocusable
                kendoFilterInput
                [filterDelay]="filterDelay"
                [ngModel]="currentFilter?.value" />
        </kendo-grid-filter-wrapper-cell>
    `
            },] },
];
/** @nocollapse */
StringFilterCellComponent.ctorParameters = () => [
    { type: FilterService },
    { type: LocalizationService }
];
StringFilterCellComponent.propDecorators = {
    filterDelay: [{ type: Input }],
    showOperators: [{ type: Input }]
};

/**
 * Represents a component which accommodates the filter operators.
 */
class FilterCellOperatorsComponent {
    constructor(localization) {
        this.localization = localization;
        this.clearText = 'Clear';
        /**
         * The filter operators that will be displayed.
         */
        this.operators = [];
        /**
         * Determines if the list of operators will be displayed.
         * @type {boolean}
         */
        this.showOperators = true;
        /**
         * Fires when the operator is selected.
         * @type {EventEmitter<string>}
         */
        this.valueChange = new EventEmitter();
        /**
         * Fires when the **Clear** button is clicked.
         * @type {EventEmitter<{}>}
         */
        this.clear = new EventEmitter();
    }
    /**
     * @hidden
     */
    get hostClasses() {
        return true;
    }
    /**
     * @hidden
     */
    onChange(dataItem) {
        this.valueChange.emit(dataItem);
    }
    /**
     * @hidden
     */
    clearClick() {
        this.clear.emit();
        return false;
    }
    /**
     * @hidden
     */
    clearKeydown(args) {
        if (args.keyCode === Keys.Enter || args.keyCode === Keys.Space) {
            this.clear.emit();
        }
    }
    /**
     * @hidden
     */
    dropdownKeydown(args) {
        if (args.defaultPrevented) {
            return;
        }
        if (args.keyCode === Keys.Enter && !this.dropdown.isOpen) {
            this.dropdown.toggle(true);
            args.preventDefault();
        }
    }
    ngOnInit() {
        this.localization.changes.subscribe(() => this.clearText = this.localization.get("filterClearButton"));
    }
}
FilterCellOperatorsComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-grid-filter-cell-operators',
                template: `
        <kendo-dropdownlist
            #dropdown
            *ngIf="showOperators"
            kendoGridFocusable
            [data]="operators"
            class="k-dropdown-operator"
            (valueChange)="onChange($event)"
            [value]="value"
            iconClass="k-i-filter"
            [valuePrimitive]="true"
            textField="text"
            [popupSettings]="{ width: 'auto' }"
            valueField="value"
            (keydown)="dropdownKeydown($event)">
        </kendo-dropdownlist>
        <button type="button"
            kendoGridFocusable
            [ngClass]="{'k-clear-button-visible': showButton}"
            class="k-button k-button-icon"
            [title]="clearText"
            (click)="clearClick()"
            (keydown)="clearKeydown($event)">
                <span class="k-icon k-i-filter-clear"></span>
        </button>
    `
            },] },
];
/** @nocollapse */
FilterCellOperatorsComponent.ctorParameters = () => [
    { type: LocalizationService }
];
FilterCellOperatorsComponent.propDecorators = {
    hostClasses: [{ type: HostBinding, args: ['class.k-filtercell-operator',] }],
    dropdown: [{ type: ViewChild, args: ['dropdown',] }],
    operators: [{ type: Input }],
    showButton: [{ type: Input }],
    showOperators: [{ type: Input }],
    value: [{ type: Input }],
    valueChange: [{ type: Output }],
    clear: [{ type: Output }]
};

// tslint:disable:no-access-missing-member
const stringOperators$1 = localizeOperators$1({
    "filterContainsOperator": "contains",
    "filterNotContainsOperator": "doesnotcontain",
    // tslint:disable-next-line:object-literal-sort-keys
    "filterEqOperator": "eq",
    "filterNotEqOperator": "neq",
    "filterStartsWithOperator": "startswith",
    "filterEndsWithOperator": "endswith",
    "filterIsNullOperator": "isnull",
    "filterIsNotNullOperator": "isnotnull",
    "filterIsEmptyOperator": "isempty",
    "filterIsNotEmptyOperator": "isnotempty"
});
/**
 * @hidden
 */
class AutoCompleteFilterCellComponent extends BaseFilterCellComponent {
    constructor(filterService, column, localization) {
        super(filterService);
        this.localization = localization;
        this.showOperators = true;
        this.defaultOperators = stringOperators$1(this.localization);
        this.column = column;
    }
    set valueField(value) {
        this._valueField = value;
    }
    get valueField() {
        return this._valueField ? this._valueField : this.column.field;
    }
    get currentFilter() {
        return this.filterByField(this.column.field);
    }
    get currentOperator() {
        return this.currentFilter ? this.currentFilter.operator : "contains";
    }
}
AutoCompleteFilterCellComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-grid-autocomplete-filter-cell',
                template: `
        <kendo-grid-filter-wrapper-cell
            [column]="column"
            [filter]="filter"
            [operators]="operators"
            [showOperators]="showOperators">
            <kendo-autocomplete
                kendoFilterInput
                [data]="data"
                [valueField]="valueField"
                [value]="currentFilter?.value">
            </kendo-autocomplete>
        </kendo-grid-filter-wrapper-cell>
    `
            },] },
];
/** @nocollapse */
AutoCompleteFilterCellComponent.ctorParameters = () => [
    { type: FilterService },
    { type: ColumnComponent },
    { type: LocalizationService }
];
AutoCompleteFilterCellComponent.propDecorators = {
    showOperators: [{ type: Input }],
    column: [{ type: Input }],
    filter: [{ type: Input }],
    data: [{ type: Input }],
    valueField: [{ type: Input }]
};

// tslint:disable:no-access-missing-member
/**
 * @hidden
 */
class BooleanFilterComponent extends BaseFilterCellComponent {
    constructor(filterService, localization) {
        super(filterService);
        this.localization = localization;
        /**
         * @hidden
         */
        this.operator = "eq";
        /**
         * @hidden
         */
        this.items = [
            { text: this.localization.get("filterIsTrue"), value: true },
            { text: this.localization.get("filterIsFalse"), value: false }
        ];
        /**
         * @hidden
         */
        this.defaultItem = { text: this.localization.get("filterBooleanAll"), value: null };
    }
    /**
     * @hidden
     */
    get hostClasses() {
        return true;
    }
    /**
     * The current filter for the associated column field.
     * @readonly
     * @type {FilterDescriptor}
     */
    get currentFilter() {
        return this.filterByField(this.column.field);
    }
    /**
     * The current filter operator for the associated column field.
     * @readonly
     * @type {string}
     */
    get currentOperator() {
        return this.currentFilter ? this.currentFilter.operator : this.operator;
    }
    ngOnInit() {
        this.subscription = this.localization.changes.subscribe(this.localizationChange.bind(this));
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        super.ngOnDestroy();
    }
    localizationChange() {
        this.items = [
            { text: this.localization.get("filterIsTrue"), value: true },
            { text: this.localization.get("filterIsFalse"), value: false }
        ];
        this.defaultItem = { text: this.localization.get("filterBooleanAll"), value: null };
    }
}
BooleanFilterComponent.propDecorators = {
    hostClasses: [{ type: HostBinding, args: ['class.k-filtercell-boolean',] }],
    column: [{ type: Input }],
    filter: [{ type: Input }]
};

/**
 * Represents a Boolean filter-cell component.
 *
 * @example
 *
 *  ```html-no-run
 *      <kendo-grid-column field="ProductName" title="Product Name">
 *          <ng-template kendoGridFilterCellTemplate let-filter let-column="column">
 *          <kendo-grid-boolean-filter-cell
 *              [column]="column"
 *              [filter]="filter">
 *          </kendo-grid-boolean-filter-cell>
 *          </ng-template>
 *      </kendo-grid-column>
 *   ```
 */
class BooleanFilterCellComponent extends BooleanFilterComponent {
    constructor(filterService, localization, cd) {
        super(filterService, localization);
        this.cd = cd;
    }
    localizationChange() {
        super.localizationChange();
        this.cd.markForCheck();
    }
}
BooleanFilterCellComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-grid-boolean-filter-cell',
                template: `
        <kendo-grid-filter-wrapper-cell
            [column]="column"
            [filter]="filter"
            [showOperators]="false"
            [defaultOperator]="operator">
            <kendo-dropdownlist
                kendoFilterInput
                [defaultItem]="defaultItem"
                [data]="items"
                textField="text"
                valueField="value"
                [popupSettings]="{ width: 'auto' }"
                [valuePrimitive]="true"
                [value]="currentFilter?.value">
            </kendo-dropdownlist>
        </kendo-grid-filter-wrapper-cell>
    `
            },] },
];
/** @nocollapse */
BooleanFilterCellComponent.ctorParameters = () => [
    { type: FilterService },
    { type: LocalizationService },
    { type: ChangeDetectorRef }
];

// tslint:disable:no-access-missing-member
const dateOperators = localizeOperators$1({
    "filterEqOperator": "eq",
    "filterNotEqOperator": "neq",
    // tslint:disable-next-line:object-literal-sort-keys
    "filterAfterOrEqualOperator": "gte",
    "filterAfterOperator": "gt",
    "filterBeforeOrEqualOperator": "lte",
    "filterBeforeOperator": "lt",
    "filterIsNullOperator": "isnull",
    "filterIsNotNullOperator": "isnotnull"
});
/**
 * @hidden
 */
class DateFilterComponent extends BaseFilterCellComponent {
    constructor(filterService, localization) {
        super(filterService);
        this.localization = localization;
        /**
         * The default filter operator. Defaults to `contains`.
         * @type {string}
         */
        this.operator = "gte";
        /**
         * Defines the active view that the calendar initially renders.
         * By default, the active view is `month`.
         *
         * > You have to set `activeView` within the `topView`-`bottomView` range.
         */
        this.activeView = "month";
        /**
         * Defines the bottommost calendar view, to which the user can navigate.
         */
        this.bottomView = "month";
        /**
         * Defines the topmost calendar view, to which the user can navigate.
         */
        this.topView = "century";
        /**
         * Determines whether to display a week number column in the `month` view of the Calendar.
         */
        this.weekNumber = false;
        this.defaultOperators = dateOperators(this.localization);
    }
    /**
     * The current filter for the associated column field.
     * @readonly
     * @type {FilterDescriptor}
     */
    get currentFilter() {
        return this.filterByField(this.column.field);
    }
    /**
     * Specifies the date format that is used when the component is not focused.
     * By default, the `column.format` value is used (if set).
     */
    set format(value) {
        this._format = value;
    }
    /**
     * Specifies the date format that is used when the component is not focused.
     * By default, the `column.format` value is used (if set).
     *
     * @readonly
     * @type {string}
     */
    get format() {
        return !isNullOrEmptyString(this._format) ? this._format : this.columnFormat;
    }
    get columnFormat() {
        return this.column && !isNullOrEmptyString(this.column.format) ?
            extractFormat(this.column.format) : "d";
    }
    /**
     * The current filter operator for the associated column field.
     * @readonly
     * @type {string}
     */
    get currentOperator() {
        return this.currentFilter ? this.currentFilter.operator : this.operator;
    }
    ngOnInit() {
        this.subscription = this.localization.changes.subscribe(this.localizationChange.bind(this));
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        super.ngOnDestroy();
    }
    localizationChange() {
        this.defaultOperators = dateOperators(this.localization);
        if (this.operatorList.length) {
            this.operators = toJSON(this.operatorList.toArray());
        }
    }
}
DateFilterComponent.propDecorators = {
    column: [{ type: Input }],
    filter: [{ type: Input }],
    operator: [{ type: Input }],
    format: [{ type: Input }],
    min: [{ type: Input }],
    max: [{ type: Input }],
    formatPlaceholder: [{ type: Input }],
    placeholder: [{ type: Input }],
    activeView: [{ type: Input }],
    bottomView: [{ type: Input }],
    topView: [{ type: Input }],
    weekNumber: [{ type: Input }]
};

/**
 * Represents a date-filter cell component.
 *
 * @example
 *
 *  ```html-no-run
 *      <kendo-grid-column field="OrderDate" title="Order Date">
 *          <ng-template kendoGridFilterCellTemplate let-filter let-column="column">
 *          <kendo-grid-date-filter-cell
 *              [showOperators]="false"
 *              [column]="column"
 *              [filter]="filter">
 *          </kendo-grid-date-filter-cell>
 *          </ng-template>
 *      </kendo-grid-column>
 *   ```
 */
class DateFilterCellComponent extends DateFilterComponent {
    constructor(filterService, localization) {
        super(filterService, localization);
        this.localization = localization;
        /**
         * Determines if the drop-down filter operators will be displayed. The default value is `true`.
         * @type {boolean}
         */
        this.showOperators = true;
    }
    /**
     * @hidden
     */
    messageFor(key) {
        return this.localization.get(key);
    }
}
DateFilterCellComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-grid-date-filter-cell',
                template: `
        <kendo-grid-filter-wrapper-cell
            [column]="column"
            [filter]="filter"
            [operators]="operators"
            [defaultOperator]="operator"
            [showOperators]="showOperators"
        >
            <kendo-datepicker
                kendoFilterInput
                [value]="currentFilter?.value"
                [format]="format"
                [formatPlaceholder]="formatPlaceholder"
                [placeholder]="placeholder"
                [activeView]="activeView"
                [bottomView]="bottomView"
                [topView]="topView"
                [min]="min"
                [max]="max"
                [weekNumber]="weekNumber"
            >
                <kendo-datepicker-messages
                    [toggle]="messageFor('filterDateToggle')"
                    [today]="messageFor('filterDateToday')"
                >
                </kendo-datepicker-messages>
            </kendo-datepicker>
        </kendo-grid-filter-wrapper-cell>
    `
            },] },
];
/** @nocollapse */
DateFilterCellComponent.ctorParameters = () => [
    { type: FilterService },
    { type: LocalizationService }
];
DateFilterCellComponent.propDecorators = {
    showOperators: [{ type: Input }]
};

/**
 * @hidden
 */
class ColGroupComponent {
    constructor() {
        this.columns = [];
        this.groups = [];
    }
    get columnsToRender() {
        return columnsToRender(this.columns);
    }
    trackBy(index, _item) {
        return index;
    }
}
ColGroupComponent.decorators = [
    { type: Component, args: [{
                selector: '[kendoGridColGroup]',
                template: `
    <ng-template [ngIf]="true">
        <col [class.k-group-col]="true" *ngFor="let g of groups" />
        <col [class.k-hierarchy-col]="true" *ngIf="detailTemplate?.templateRef"/>
        <col *ngFor="let column of columnsToRender; trackBy: trackBy;" [style.width.px]="column.width"/>
    </ng-template>
    `
            },] },
];
ColGroupComponent.propDecorators = {
    columns: [{ type: Input }],
    groups: [{ type: Input }],
    detailTemplate: [{ type: Input }]
};

/**
 * @hidden
 */
class LoadingComponent {
    constructor(localization) {
        this.localization = localization;
        this.hostClass = true;
    }
    get loadingText() {
        return this.localization.get('loading');
    }
}
LoadingComponent.decorators = [
    { type: Component, args: [{
                selector: '[kendoGridLoading]',
                template: `
        <span class="k-loading-text">{{ loadingText }}</span>
        <div class="k-loading-image"></div>
        <div class="k-loading-color"></div>
    `
            },] },
];
/** @nocollapse */
LoadingComponent.ctorParameters = () => [
    { type: LocalizationService }
];
LoadingComponent.propDecorators = {
    hostClass: [{ type: HostBinding, args: ['class.k-loading-mask',] }]
};

/**
 * @hidden
 */
class ResizableContainerDirective {
    constructor(el, renderer, resizeService, grid) {
        this.el = el;
        this.renderer = renderer;
        this.resizeService = resizeService;
        this.grid = grid;
        this.enabled = false;
    }
    set lockedWidth(value) {
        this._lockedWidth = value;
        if (this.enabled) {
            this.attachResize();
            this.resize();
        }
    }
    set kendoGridResizableContainer(enabled) {
        const refresh = enabled !== this.enabled;
        this.enabled = enabled;
        if (refresh) {
            this.attachResize();
            this.resize();
        }
    }
    ngOnDestroy() {
        if (this.resizeSubscription) {
            this.resizeSubscription.unsubscribe();
        }
    }
    attachResize() {
        if (this.resizeSubscription && !this.enabled) {
            this.resizeSubscription.unsubscribe();
            this.resizeSubscription = null;
        }
        if (!this.resizeSubscription && this.enabled) {
            this.resizeSubscription = this.resizeService.changes.subscribe(this.resize.bind(this));
        }
    }
    resize() {
        if (this.grid && this.grid.wrapper) {
            const containerElement = this.grid.wrapper.nativeElement;
            const width = Math.max(containerElement.clientWidth - this._lockedWidth, 0);
            if (this.enabled && width > 0) {
                this.renderer.setStyle(this.el.nativeElement, "width", width + "px");
            }
            else {
                this.renderer.setStyle(this.el.nativeElement, "width", "");
            }
        }
    }
}
ResizableContainerDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoGridResizableContainer]'
            },] },
];
/** @nocollapse */
ResizableContainerDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: ResizeService },
    { type: GridComponent, decorators: [{ type: Optional }] }
];
ResizableContainerDirective.propDecorators = {
    lockedWidth: [{ type: Input, args: ['lockedWidth',] }],
    kendoGridResizableContainer: [{ type: Input }]
};

/**
 * @hidden
 */
class TemplateContextDirective {
    constructor(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
    set templateContext(context) {
        this.removeView();
        if (context.templateRef) {
            this.insertedViewRef = this.viewContainerRef.createEmbeddedView(context.templateRef, context);
        }
    }
    ngOnDestroy() {
        this.removeView();
    }
    removeView() {
        if (this.insertedViewRef) {
            this.viewContainerRef.remove(this.viewContainerRef.indexOf(this.insertedViewRef));
            this.insertedViewRef = undefined;
        }
    }
}
TemplateContextDirective.decorators = [
    { type: Directive, args: [{
                selector: '[templateContext]' // tslint:disable-line:directive-selector
            },] },
];
/** @nocollapse */
TemplateContextDirective.ctorParameters = () => [
    { type: ViewContainerRef }
];
TemplateContextDirective.propDecorators = {
    templateContext: [{ type: Input }]
};

/**
 * @hidden
 */
class FocusGroup {
    constructor(root) {
        this.root = root;
        this.active = true;
        this.children = [];
        this.root.registerGroup(this);
    }
    get focusableChildren() {
        return this.children.filter(el => el.canFocus());
    }
    get isActive() {
        return this.active;
    }
    ngOnDestroy() {
        this.root.unregisterGroup(this);
    }
    registerElement(element) {
        this.unregisterElement(element);
        this.children.push(element);
    }
    unregisterElement(element) {
        this.children = this.children.filter(f => f !== element);
    }
    /**
     * Returns a Boolean value which indicates if the group will receive focus when the cell is focused.
     * Requires a single "simple" focusable element such as a button or a checkbox.
     */
    isNavigable() {
        const focusable = this.focusableChildren;
        return focusable.length === 1 && focusable[0].isNavigable();
    }
    canFocus() {
        return this.focusableChildren.length > 0;
    }
    focus() {
        if (this.canFocus() && !this.hasFocus()) {
            this.focusableChildren[0].focus();
        }
    }
    activate() {
        this.toggleState(true);
    }
    deactivate() {
        this.toggleState(false);
    }
    hasFocus() {
        return this.children.reduce((focused, element) => focused || element.hasFocus(), false);
    }
    toggleState(active) {
        if (this.active !== active) {
            this.active = active;
            this.children.forEach(f => f.toggle(active));
        }
    }
}
FocusGroup.decorators = [
    { type: Injectable },
];
/** @nocollapse */
FocusGroup.ctorParameters = () => [
    { type: FocusRoot }
];

let id = 0;
function nextId() {
    return id++;
}
/**
 * @hidden
 */
class LogicalCellDirective {
    constructor(focusGroup, element, columnInfoService, idService, navigationService, renderer, zone, cellContext) {
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
    get id() {
        if (!this.logicalSlaveCell && this.columnInfoService.isLocked) {
            return this.idService.cellId(this.logicalRowIndex, this.logicalColIndex);
        }
    }
    get ariaColIndex() {
        if (this.logicalSlaveCell || this.logicalColIndex === -1) {
            return undefined;
        }
        return this.logicalColIndex + 1;
    }
    ngOnInit() {
        if (!this.navigationService.enabled) {
            return;
        }
        this.navigationChange = this.navigationService.changes.subscribe((e) => this.onNavigationChange(e));
    }
    ngDoCheck() {
        if (!this.navigationService.enabled || this.logicalColIndex === -1) {
            return;
        }
        if (this.cellContext) {
            this.cellContext.focusGroup = this.focusGroup;
        }
        this.registerNoChanges();
    }
    ngOnChanges(changes) {
        if (!this.navigationService.enabled) {
            return;
        }
        const keys = Object.keys(changes);
        if ((keys.length === 1 && keys[0] === 'groupItem') || this.logicalColIndex === -1) {
            // Ignore groupItem changes as the reference is not stable
            return;
        }
        const indexChange = changes.logicalColIndex;
        const rowIndexChange = changes.logicalRowIndex;
        const index = indexChange && !indexChange.isFirstChange() ? indexChange.previousValue : this.logicalColIndex;
        const rowIndex = rowIndexChange && !rowIndexChange.isFirstChange() ? rowIndexChange.previousValue : this.logicalRowIndex;
        this.navigationService.unregisterCell(index, rowIndex, this);
        this.registerChanges();
        this.updateElement();
    }
    ngOnDestroy() {
        if (this.navigationChange) {
            this.navigationChange.unsubscribe();
        }
        this.navigationService.unregisterCell(this.logicalColIndex, this.logicalRowIndex, this);
    }
    onNavigationChange(e) {
        const active = this.logicalColIndex === e.colIndex && this.logicalRowIndex === e.rowIndex;
        const wasActive = this.logicalColIndex === e.prevColIndex && this.logicalRowIndex === e.prevRowIndex;
        if (active || wasActive) {
            this.updateElement();
        }
    }
    updateElement() {
        const el = this.element.nativeElement;
        this.renderer.setAttribute(el, 'tabIndex', this.isFocusable() && !this.logicalSlaveCell ? '0' : '-1');
        if (this.isFocused()) {
            if (this.focusGroup.isNavigable()) {
                this.focusGroup.focus();
            }
            else {
                if (!this.logicalSlaveCell && this.navigationService.autoFocusCell(this.logicalColIndex, this.logicalColIndex + this.colSpan - 1)) {
                    this.microtask(() => this.isFocused() && el.focus());
                }
                this.renderer.addClass(el, 'k-state-focused');
            }
        }
        else {
            this.renderer.removeClass(el, 'k-state-focused');
        }
    }
    microtask(callback) {
        this.zone.runOutsideAngular(() => Promise.resolve(null).then(callback));
    }
    registerChanges() {
        if (!this.logicalSlaveCell) {
            this.navigationService.registerCell(this);
        }
    }
    registerNoChanges() {
        if (!this.logicalSlaveCell) {
            this.navigationService.registerCellOnCurrentRow(this);
        }
    }
    isFocusable() {
        return this.navigationService.isCellFocusable(this);
    }
    isFocused() {
        return this.navigationService.isCellFocused(this);
    }
}
LogicalCellDirective.decorators = [
    { type: Directive, args: [{
                providers: [{
                        provide: FocusGroup,
                        deps: [FocusRoot],
                        useClass: FocusGroup
                    }],
                selector: '[kendoGridLogicalCell]'
            },] },
];
/** @nocollapse */
LogicalCellDirective.ctorParameters = () => [
    { type: FocusGroup },
    { type: ElementRef },
    { type: ColumnInfoService },
    { type: IdService },
    { type: NavigationService },
    { type: Renderer2 },
    { type: NgZone },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [CELL_CONTEXT,] }] }
];
LogicalCellDirective.propDecorators = {
    logicalColIndex: [{ type: Input }],
    logicalRowIndex: [{ type: Input }],
    logicalSlaveCell: [{ type: Input }],
    colIndex: [{ type: Input }],
    colSpan: [{ type: Input }],
    rowSpan: [{ type: Input }],
    groupItem: [{ type: Input }],
    dataRowIndex: [{ type: Input }],
    dataItem: [{ type: Input }],
    detailExpandCell: [{ type: Input }],
    id: [{ type: HostBinding, args: ['attr.id',] }],
    ariaColIndex: [{ type: HostBinding, args: ['attr.aria-colindex',] }]
};

let id$1 = 0;
function nextId$1() {
    return id$1++;
}
/**
 * @hidden
 */
class LogicalRowDirective {
    constructor(idService, navigation) {
        this.idService = idService;
        this.navigation = navigation;
        this.logicalSlaveRow = false;
        this.logicalSlaveCellsCount = 0;
        this.dataRowIndex = -1;
        this.uid = nextId$1();
    }
    get hostRole() {
        return this.logicalSlaveRow ? 'presentation' : 'row';
    }
    get ariaRowIndex() {
        if (this.navigation.enabled) {
            return this.logicalRowIndex + 1;
        }
    }
    get ariaOwns() {
        if (!this.navigation.enabled || this.logicalSlaveRow || this.logicalSlaveCellsCount === 0) {
            return undefined;
        }
        const ids = [];
        const total = this.logicalCellsCount + this.logicalSlaveCellsCount;
        for (let cellIndex = this.logicalCellsCount; cellIndex < total; cellIndex++) {
            ids.push(this.idService.cellId(this.logicalRowIndex, cellIndex));
        }
        return ids.join(' ');
    }
    ngOnChanges(changes) {
        if (!this.navigation.enabled || this.logicalSlaveRow) {
            return;
        }
        const indexChange = changes.logicalRowIndex;
        const logicalSlaveRowChange = changes.logicalSlaveRow;
        if (indexChange || logicalSlaveRowChange) {
            const index = indexChange && !indexChange.isFirstChange() ? indexChange.previousValue : this.logicalRowIndex;
            this.navigation.unregisterRow(index, this);
            this.navigation.registerRow(this);
        }
        else if (anyChanged(['dataRowIndex', 'dataItem'], changes)) {
            this.navigation.updateRow(this);
        }
    }
    ngOnDestroy() {
        this.navigation.unregisterRow(this.logicalRowIndex, this);
    }
}
LogicalRowDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoGridLogicalRow]'
            },] },
];
/** @nocollapse */
LogicalRowDirective.ctorParameters = () => [
    { type: IdService },
    { type: NavigationService }
];
LogicalRowDirective.propDecorators = {
    logicalRowIndex: [{ type: Input }],
    logicalSlaveRow: [{ type: Input }],
    logicalCellsCount: [{ type: Input }],
    logicalSlaveCellsCount: [{ type: Input }],
    dataRowIndex: [{ type: Input }],
    dataItem: [{ type: Input }],
    hostRole: [{ type: HostBinding, args: ['attr.role',] }],
    ariaRowIndex: [{ type: HostBinding, args: ['attr.aria-rowindex',] }],
    ariaOwns: [{ type: HostBinding, args: ['attr.aria-owns',] }]
};

/* tslint:disable:pipe-naming */
const FORMAT_REGEX = /\{\d+:?/;
/**
 * @hidden
 */
class FieldAccessorPipe {
    constructor(intlService) {
        this.intlService = intlService;
    }
    transform(dataItem, fieldName, format) {
        if (!isNullOrEmptyString(fieldName)) {
            const value = getter(fieldName)(dataItem);
            if (!isNullOrEmptyString(format)) {
                return this.formatValue(format, value);
            }
            return value;
        }
        return dataItem;
    }
    formatValue(format, value) {
        const intl = this.intlService;
        if (isString(format) && format.match(FORMAT_REGEX)) {
            return intl.format(format, value);
        }
        return intl.toString(value, format);
    }
}
FieldAccessorPipe.decorators = [
    { type: Pipe, args: [{
                name: 'valueOf',
                pure: false
            },] },
];
/** @nocollapse */
FieldAccessorPipe.ctorParameters = () => [
    { type: IntlService }
];

/**
 * @hidden
 */
const columnsToResize = ({ columns }) => Math.max(1, resizableColumns(columns).length);
/**
 * @hidden
 */
const row = selector => element => element.querySelector(selector);
/**
 * @hidden
 */
const headerRow = index => element => element.querySelectorAll('thead>tr')[index];
/**
 * @hidden
 */
const cell = (index, selector = 'td') => element => element.querySelectorAll(`${selector}:not(.k-group-cell):not(.k-hierarchy-cell)`)[index];
/**
 * @hidden
 */
const offsetWidth = element => element.offsetWidth;
/**
 * @hidden
 */
const pipe = (...fns) => data => fns.reduce((state$$1, fn) => state$$1 ? fn(state$$1) : 0, data);
/**
 * @hidden
 */
class TableDirective {
    constructor(element, renderer, service, zone, cdr) {
        this.element = element;
        this.renderer = renderer;
        this.service = service;
        this.zone = zone;
        this.cdr = cdr;
        this.locked = false;
        this.firstResize = false;
    }
    get minWidth() {
        return this.firstResize ? 0 : null;
    }
    ngOnInit() {
        const obs = this.service
            .changes.pipe(filter(e => this.locked === e.locked));
        this.subscription = obs.pipe(filter(e => e.type === 'start'), tap(this.initState.bind(this)), map(columnsToResize), switchMap((take$$1) => obs.pipe(filter(e => e.type === 'resizeTable'), map(e => e.delta), bufferCount(take$$1)))).subscribe(this.resize.bind(this));
        this.autoFitSubscription = this.service
            .registerTable({
            autoFit: this.autoFitObservable.bind(this),
            locked: this.locked
        });
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        if (this.autoFitSubscription) {
            this.autoFitSubscription();
            this.autoFitSubscription = null;
        }
    }
    initState() {
        this.firstResize = true;
        if (!this.virtualColumns || this.locked) {
            this.originalWidth = offsetWidth(this.element.nativeElement);
        }
    }
    resize(deltas) {
        if (!this.virtualColumns || this.locked) {
            const delta = deltas.reduce((sum, item) => sum + item, 0);
            const width = this.originalWidth + delta;
            this.renderer.setStyle(this.element.nativeElement, 'width', width + 'px');
        }
        this.cdr.detectChanges();
    }
    autoFitObservable(columnInfo) {
        return Observable.create(observer => {
            this.zone.runOutsideAngular(() => {
                this.renderer.addClass(this.element.nativeElement, 'k-autofitting');
                this.cdr.detectChanges();
                const widths = columnInfo.map(this.measureColumn.bind(this));
                this.renderer.removeClass(this.element.nativeElement, 'k-autofitting');
                observer.next(widths);
            });
        });
    }
    measureColumn(info) {
        const dom = this.element.nativeElement;
        const header = pipe(headerRow(info.level), cell(info.headerIndex, 'th'), offsetWidth)(dom);
        let data = 0;
        if (!info.isParentSpan || (info.isParentSpan && info.isLastInSpan)) {
            data = pipe(row('tbody>tr:not(.k-grouping-row):not(.k-grid-norecords)'), cell(info.index), offsetWidth)(dom);
        }
        const footer = pipe(row('tfoot>tr'), cell(info.index), offsetWidth)(dom);
        return Math.max(header, data, footer);
    }
}
TableDirective.decorators = [
    { type: Directive, args: [{
                selector: 'table' // tslint:disable-line:directive-selector
            },] },
];
/** @nocollapse */
TableDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: ColumnResizingService },
    { type: NgZone },
    { type: ChangeDetectorRef }
];
TableDirective.propDecorators = {
    locked: [{ type: Input }],
    virtualColumns: [{ type: Input }],
    minWidth: [{ type: HostBinding, args: ['style.min-width',] }]
};

const exportedModules = [
    ColumnComponent,
    ColumnGroupComponent,
    LogicalCellDirective,
    LogicalRowDirective,
    FocusableDirective,
    FooterTemplateDirective,
    ColGroupComponent,
    ResizableContainerDirective,
    TemplateContextDirective,
    FieldAccessorPipe,
    DetailTemplateDirective,
    SpanColumnComponent,
    TableDirective,
    LoadingComponent
];
/**
 * @hidden
 */
class SharedModule {
    static exports() {
        return [
            ColumnComponent,
            SpanColumnComponent,
            ColumnGroupComponent,
            FooterTemplateDirective,
            DetailTemplateDirective,
            FocusableDirective
        ];
    }
}
SharedModule.decorators = [
    { type: NgModule, args: [{
                declarations: [exportedModules],
                exports: [exportedModules, DraggableModule, EventsModule],
                imports: [CommonModule]
            },] },
];

/**
 * Represents the `Contains` (**Contains**) filter operator.
 *
 * For more information and examples, refer to:
 * * [Setting the default filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-default-filter-operator)
 * * [Setting the order of the filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-order-of-the-filter-operators)
 */
class ContainsFilterOperatorComponent extends FilterOperatorBase {
    constructor(localization) { super("contains", localization); }
}
ContainsFilterOperatorComponent.decorators = [
    { type: Component, args: [{
                providers: [
                    {
                        provide: FilterOperatorBase,
                        useExisting: forwardRef(() => ContainsFilterOperatorComponent)
                    }
                ],
                selector: 'kendo-filter-contains-operator',
                template: ``
            },] },
];
/** @nocollapse */
ContainsFilterOperatorComponent.ctorParameters = () => [
    { type: LocalizationService }
];

/**
 * Represents the `DoesNotContain` (**Does not contain**) filter operator.
 *
 * For more information and examples, refer to:
 * * [Setting the default filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-default-filter-operator)
 * * [Setting the order of the filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-order-of-the-filter-operators)
 */
class DoesNotContainFilterOperatorComponent extends FilterOperatorBase {
    constructor(localization) { super("doesnotcontain", localization); }
}
DoesNotContainFilterOperatorComponent.decorators = [
    { type: Component, args: [{
                providers: [
                    {
                        provide: FilterOperatorBase,
                        useExisting: forwardRef(() => DoesNotContainFilterOperatorComponent)
                    }
                ],
                selector: 'kendo-filter-not-contains-operator',
                template: ``
            },] },
];
/** @nocollapse */
DoesNotContainFilterOperatorComponent.ctorParameters = () => [
    { type: LocalizationService }
];

/**
 * Represents the `EndsWith` (**Ends with**) string filter operator.
 *
 * For more information and examples, refer to:
 * * [Setting the default filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-default-filter-operator)
 * * [Setting the order of the filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-order-of-the-filter-operators)
 */
class EndsWithFilterOperatorComponent extends FilterOperatorBase {
    constructor(localization) { super("endswith", localization); }
}
EndsWithFilterOperatorComponent.decorators = [
    { type: Component, args: [{
                providers: [
                    {
                        provide: FilterOperatorBase,
                        useExisting: forwardRef(() => EndsWithFilterOperatorComponent)
                    }
                ],
                selector: 'kendo-filter-endswith-operator',
                template: ``
            },] },
];
/** @nocollapse */
EndsWithFilterOperatorComponent.ctorParameters = () => [
    { type: LocalizationService }
];

/**
 * Represents the `Equal` (**Is equal to**) filter operator.
 *
 * For more information and examples, refer to:
 * * [Setting the default filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-default-filter-operator)
 * * [Setting the order of the filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-order-of-the-filter-operators)
 */
class EqualFilterOperatorComponent extends FilterOperatorBase {
    constructor(localization) { super("eq", localization); }
}
EqualFilterOperatorComponent.decorators = [
    { type: Component, args: [{
                providers: [
                    {
                        provide: FilterOperatorBase,
                        useExisting: forwardRef(() => EqualFilterOperatorComponent)
                    }
                ],
                selector: 'kendo-filter-eq-operator',
                template: ``
            },] },
];
/** @nocollapse */
EqualFilterOperatorComponent.ctorParameters = () => [
    { type: LocalizationService }
];

/**
 * Represents the `IsEmpty` (**Is empty**) filter operator.
 *
 * For more information and examples, refer to:
 * * [Setting the default filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-default-filter-operator)
 * * [Setting the order of the filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-order-of-the-filter-operators)
 */
class IsEmptyFilterOperatorComponent extends FilterOperatorBase {
    constructor(localization) { super("isempty", localization); }
}
IsEmptyFilterOperatorComponent.decorators = [
    { type: Component, args: [{
                providers: [
                    {
                        provide: FilterOperatorBase,
                        useExisting: forwardRef(() => IsEmptyFilterOperatorComponent)
                    }
                ],
                selector: 'kendo-filter-isempty-operator',
                template: ``
            },] },
];
/** @nocollapse */
IsEmptyFilterOperatorComponent.ctorParameters = () => [
    { type: LocalizationService }
];

/**
 * Represents the `IsNotEmpty` (**Is not empty**) filter operator.
 *
 * For more information and examples, refer to:
 * * [Setting the default filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-default-filter-operator)
 * * [Setting the order of the filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-order-of-the-filter-operators)
 */
class IsNotEmptyFilterOperatorComponent extends FilterOperatorBase {
    constructor(localization) { super("isnotempty", localization); }
}
IsNotEmptyFilterOperatorComponent.decorators = [
    { type: Component, args: [{
                providers: [
                    {
                        provide: FilterOperatorBase,
                        useExisting: forwardRef(() => IsNotEmptyFilterOperatorComponent)
                    }
                ],
                selector: 'kendo-filter-isnotempty-operator',
                template: ``
            },] },
];
/** @nocollapse */
IsNotEmptyFilterOperatorComponent.ctorParameters = () => [
    { type: LocalizationService }
];

/**
 * Represents the `IsNotNull` (**Is not null**) filter operator.
 *
 * For more information and examples, refer to:
 * * [Setting the default filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-default-filter-operator)
 * * [Setting the order of the filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-order-of-the-filter-operators)
 */
class IsNotNullFilterOperatorComponent extends FilterOperatorBase {
    constructor(localization) { super("isnotnull", localization); }
}
IsNotNullFilterOperatorComponent.decorators = [
    { type: Component, args: [{
                providers: [
                    {
                        provide: FilterOperatorBase,
                        useExisting: forwardRef(() => IsNotNullFilterOperatorComponent)
                    }
                ],
                selector: 'kendo-filter-isnotnull-operator',
                template: ``
            },] },
];
/** @nocollapse */
IsNotNullFilterOperatorComponent.ctorParameters = () => [
    { type: LocalizationService }
];

/**
 * Represents the `IsNull` (**Is null**) filter operator.
 *
 * For more information and examples, refer to:
 * * [Setting the default filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-default-filter-operator)
 * * [Setting the order of the filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-order-of-the-filter-operators)
 */
class IsNullFilterOperatorComponent extends FilterOperatorBase {
    constructor(localization) { super("isnull", localization); }
}
IsNullFilterOperatorComponent.decorators = [
    { type: Component, args: [{
                providers: [
                    {
                        provide: FilterOperatorBase,
                        useExisting: forwardRef(() => IsNullFilterOperatorComponent)
                    }
                ],
                selector: 'kendo-filter-isnull-operator',
                template: ``
            },] },
];
/** @nocollapse */
IsNullFilterOperatorComponent.ctorParameters = () => [
    { type: LocalizationService }
];

/**
 * Represents the `NotEqual` (**Is not equal to**) filter operator.
 *
 * For more information and examples, refer to:
 * * [Setting the default filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-default-filter-operator)
 * * [Setting the order of the filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-order-of-the-filter-operators)
 */
class NotEqualFilterOperatorComponent extends FilterOperatorBase {
    constructor(localization) { super("neq", localization); }
}
NotEqualFilterOperatorComponent.decorators = [
    { type: Component, args: [{
                providers: [
                    {
                        provide: FilterOperatorBase,
                        useExisting: forwardRef(() => NotEqualFilterOperatorComponent)
                    }
                ],
                selector: 'kendo-filter-neq-operator',
                template: ``
            },] },
];
/** @nocollapse */
NotEqualFilterOperatorComponent.ctorParameters = () => [
    { type: LocalizationService }
];

/**
 * Represents the `StartsWith` (**Starts with**) filter operator.
 *
 * For more information and examples, refer to:
 * * [Setting the default filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-default-filter-operator)
 * * [Setting the order of the filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-order-of-the-filter-operators)
 */
class StartsWithFilterOperatorComponent extends FilterOperatorBase {
    constructor(localization) { super("startswith", localization); }
}
StartsWithFilterOperatorComponent.decorators = [
    { type: Component, args: [{
                providers: [
                    {
                        provide: FilterOperatorBase,
                        useExisting: forwardRef(() => StartsWithFilterOperatorComponent)
                    }
                ],
                selector: 'kendo-filter-startswith-operator',
                template: ``
            },] },
];
/** @nocollapse */
StartsWithFilterOperatorComponent.ctorParameters = () => [
    { type: LocalizationService }
];

/*
 * Represents the `Greater` (**Is greater than**) numeric filter operator.
 *
 * For more information and examples, refer to:
 * * [Setting the default filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-default-filter-operator)
 * * [Setting the order of the filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-order-of-the-filter-operators)
 */
class GreaterFilterOperatorComponent extends FilterOperatorBase {
    constructor(localization) { super("gt", localization); }
}
GreaterFilterOperatorComponent.decorators = [
    { type: Component, args: [{
                providers: [
                    {
                        provide: FilterOperatorBase,
                        useExisting: forwardRef(() => GreaterFilterOperatorComponent)
                    }
                ],
                selector: 'kendo-filter-gt-operator',
                template: ``
            },] },
];
/** @nocollapse */
GreaterFilterOperatorComponent.ctorParameters = () => [
    { type: LocalizationService }
];

/**
 * Represents the `GreaterOrEqualTo` (**Is greater than or equal to**) numeric filter operator.
 *
 * For more information and examples, refer to:
 * * [Setting the default filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-default-filter-operator)
 * * [Setting the order of the filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-order-of-the-filter-operators)
 */
class GreaterOrEqualToFilterOperatorComponent extends FilterOperatorBase {
    constructor(localization) { super("gte", localization); }
}
GreaterOrEqualToFilterOperatorComponent.decorators = [
    { type: Component, args: [{
                providers: [
                    {
                        provide: FilterOperatorBase,
                        useExisting: forwardRef(() => GreaterOrEqualToFilterOperatorComponent)
                    }
                ],
                selector: 'kendo-filter-gte-operator',
                template: ``
            },] },
];
/** @nocollapse */
GreaterOrEqualToFilterOperatorComponent.ctorParameters = () => [
    { type: LocalizationService }
];

/*
 * Represents the `Less` (**Is less than**) numeric filter operator.
 *
 * For more information and examples, refer to:
 * * [Setting the default filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-default-filter-operator)
 * * [Setting the order of the filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-order-of-the-filter-operators)
 */
class LessFilterOperatorComponent extends FilterOperatorBase {
    constructor(localization) { super("lt", localization); }
}
LessFilterOperatorComponent.decorators = [
    { type: Component, args: [{
                providers: [
                    {
                        provide: FilterOperatorBase,
                        useExisting: forwardRef(() => LessFilterOperatorComponent)
                    }
                ],
                selector: 'kendo-filter-lt-operator',
                template: ``
            },] },
];
/** @nocollapse */
LessFilterOperatorComponent.ctorParameters = () => [
    { type: LocalizationService }
];

/*
 * Represents the `LessOrEqualTo` (**Is less than or equal to**) numeric filter operator.
 *
 * For more information and examples, refer to:
 * * [Setting the default filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-default-filter-operator)
 * * [Setting the order of the filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-order-of-the-filter-operators)
 */
class LessOrEqualToFilterOperatorComponent extends FilterOperatorBase {
    constructor(localization) { super("lte", localization); }
}
LessOrEqualToFilterOperatorComponent.decorators = [
    { type: Component, args: [{
                providers: [
                    {
                        provide: FilterOperatorBase,
                        useExisting: forwardRef(() => LessOrEqualToFilterOperatorComponent)
                    }
                ],
                selector: 'kendo-filter-lte-operator',
                template: ``
            },] },
];
/** @nocollapse */
LessOrEqualToFilterOperatorComponent.ctorParameters = () => [
    { type: LocalizationService }
];

/*
 * Represents the `Greater` (**Is after**) date filter operator.
 *
 * For more information and examples, refer to:
 * * [Setting the default filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-default-filter-operator)
 * * [Setting the order of the filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-order-of-the-filter-operators)
 */
class AfterFilterOperatorComponent extends FilterOperatorBase {
    constructor(localization) { super("after", localization); }
    /**
     * @hidden
     */
    toJSON() {
        return {
            text: this.text,
            value: "gt"
        };
    }
}
AfterFilterOperatorComponent.decorators = [
    { type: Component, args: [{
                providers: [
                    {
                        provide: FilterOperatorBase,
                        useExisting: forwardRef(() => AfterFilterOperatorComponent)
                    }
                ],
                selector: 'kendo-filter-after-operator',
                template: ``
            },] },
];
/** @nocollapse */
AfterFilterOperatorComponent.ctorParameters = () => [
    { type: LocalizationService }
];

/*
 * Represents the `GreaterOrEqualTo` (**Is after or equal to**) date filter operator.
 *
 * For more information and examples, refer to:
 * * [Setting the default filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-default-filter-operator)
 * * [Setting the order of the filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-order-of-the-filter-operators)
 */
class AfterEqFilterOperatorComponent extends FilterOperatorBase {
    constructor(localization) { super("after-eq", localization); }
    /**
     * @hidden
     */
    toJSON() {
        return {
            text: this.text,
            value: "gte"
        };
    }
}
AfterEqFilterOperatorComponent.decorators = [
    { type: Component, args: [{
                providers: [
                    {
                        provide: FilterOperatorBase,
                        useExisting: forwardRef(() => AfterEqFilterOperatorComponent)
                    }
                ],
                selector: 'kendo-filter-after-eq-operator',
                template: ``
            },] },
];
/** @nocollapse */
AfterEqFilterOperatorComponent.ctorParameters = () => [
    { type: LocalizationService }
];

/*
 * Represents the `LessOrEqualTo` (**Is before or equal to**) date filter operator.
 *
 * For more information and examples, refer to:
 * * [Setting the default filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-default-filter-operator)
 * * [Setting the order of the filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-order-of-the-filter-operators)
 */
class BeforeEqFilterOperatorComponent extends FilterOperatorBase {
    constructor(localization) { super("before-eq", localization); }
    /**
     * @hidden
     */
    toJSON() {
        return {
            text: this.text,
            value: "lte"
        };
    }
}
BeforeEqFilterOperatorComponent.decorators = [
    { type: Component, args: [{
                providers: [
                    {
                        provide: FilterOperatorBase,
                        useExisting: forwardRef(() => BeforeEqFilterOperatorComponent)
                    }
                ],
                selector: 'kendo-filter-before-eq-operator',
                template: ``
            },] },
];
/** @nocollapse */
BeforeEqFilterOperatorComponent.ctorParameters = () => [
    { type: LocalizationService }
];

/*
 * Represents the `Less then` (**Is before**) date filter operator.
 *
 * For more information and examples, refer to:
 * * [Setting the default filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-default-filter-operator)
 * * [Setting the order of the filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-order-of-the-filter-operators)
 */
class BeforeFilterOperatorComponent extends FilterOperatorBase {
    constructor(localization) { super("before", localization); }
    /**
     * @hidden
     */
    toJSON() {
        return {
            text: this.text,
            value: "lt"
        };
    }
}
BeforeFilterOperatorComponent.decorators = [
    { type: Component, args: [{
                providers: [
                    {
                        provide: FilterOperatorBase,
                        useExisting: forwardRef(() => BeforeFilterOperatorComponent)
                    }
                ],
                selector: 'kendo-filter-before-operator',
                template: ``
            },] },
];
/** @nocollapse */
BeforeFilterOperatorComponent.ctorParameters = () => [
    { type: LocalizationService }
];

const FILTER_OPERATORS = [
    FilterCellOperatorsComponent,
    ContainsFilterOperatorComponent,
    DoesNotContainFilterOperatorComponent,
    EndsWithFilterOperatorComponent,
    EqualFilterOperatorComponent,
    IsEmptyFilterOperatorComponent,
    IsNotEmptyFilterOperatorComponent,
    IsNotNullFilterOperatorComponent,
    IsNullFilterOperatorComponent,
    NotEqualFilterOperatorComponent,
    StartsWithFilterOperatorComponent,
    GreaterFilterOperatorComponent,
    GreaterOrEqualToFilterOperatorComponent,
    LessFilterOperatorComponent,
    LessOrEqualToFilterOperatorComponent,
    AfterFilterOperatorComponent,
    AfterEqFilterOperatorComponent,
    BeforeEqFilterOperatorComponent,
    BeforeFilterOperatorComponent
];
const importedModules = [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DropDownListModule,
    AutoCompleteModule,
    InputsModule,
    DatePickerModule,
    PopupModule,
    SharedModule
];
const COMPONENTS = [
    FilterInputDirective
];
/**
 * @hidden
 */
class SharedFilterModule {
    static exports() {
        return [
            ...FILTER_OPERATORS
        ];
    }
}
SharedFilterModule.decorators = [
    { type: NgModule, args: [{
                declarations: [FILTER_OPERATORS, COMPONENTS],
                exports: [FILTER_OPERATORS, importedModules, COMPONENTS],
                imports: [...importedModules]
            },] },
];

/**
 * @hidden
 */
class FilterHostDirective {
    constructor(host, resolver) {
        this.host = host;
        this.resolver = resolver;
    }
    ngOnInit() {
        this.component = this.host.createComponent(this.resolver.resolveComponentFactory(this.componentType()));
        this.initComponent({
            column: this.column,
            filter: this.filter
        });
    }
    ngOnDestroy() {
        if (this.component) {
            this.component.destroy();
            this.component = null;
        }
    }
    ngOnChanges(changes) {
        if (anyChanged(["column", "filter"], changes)) {
            this.initComponent({
                column: this.column,
                filter: this.filter
            });
        }
    }
    initComponent({ column, filter: filter$$1 }) {
        const instance = this.component.instance;
        instance.column = column;
        instance.filter = filter$$1;
    }
}
FilterHostDirective.propDecorators = {
    column: [{ type: Input }],
    filter: [{ type: Input }]
};

/**
 * @hidden
 *
 * > List the following components in the GridModule as `entryComponents`.
 */
const filterComponentFactory = (type) => ({
    "boolean": BooleanFilterCellComponent,
    "date": DateFilterCellComponent,
    "numeric": NumericFilterCellComponent,
    "text": StringFilterCellComponent
}[type]);

/**
 * @hidden
 */
class FilterCellHostDirective extends FilterHostDirective {
    constructor(host, resolver) {
        super(host, resolver);
    }
    componentType() {
        if (!isNullOrEmptyString(this.column.filter)) {
            return filterComponentFactory(this.column.filter);
        }
        return StringFilterCellComponent;
    }
}
FilterCellHostDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoFilterCellHost]'
            },] },
];
/** @nocollapse */
FilterCellHostDirective.ctorParameters = () => [
    { type: ViewContainerRef },
    { type: ComponentFactoryResolver }
];

const INTERNAL_COMPONENTS = [
    FilterRowComponent,
    FilterCellComponent,
    FilterCellTemplateDirective,
    StringFilterCellComponent,
    NumericFilterCellComponent,
    AutoCompleteFilterCellComponent,
    BooleanFilterCellComponent,
    FilterCellHostDirective,
    FilterCellWrapperComponent,
    DateFilterCellComponent
];
const ENTRY_COMPONENTS = [
    StringFilterCellComponent,
    NumericFilterCellComponent,
    BooleanFilterCellComponent,
    DateFilterCellComponent
];
/**
 * @hidden
 */
class RowFilterModule {
    static exports() {
        return [
            FilterRowComponent,
            FilterCellComponent,
            FilterCellTemplateDirective,
            FilterCellOperatorsComponent,
            StringFilterCellComponent,
            NumericFilterCellComponent,
            AutoCompleteFilterCellComponent,
            BooleanFilterCellComponent,
            DateFilterCellComponent,
            SharedFilterModule.exports()
        ];
    }
}
RowFilterModule.decorators = [
    { type: NgModule, args: [{
                declarations: [INTERNAL_COMPONENTS],
                entryComponents: ENTRY_COMPONENTS,
                exports: [INTERNAL_COMPONENTS, SharedFilterModule],
                imports: [SharedFilterModule]
            },] },
];

/**
 * @hidden
 */
const normalizeSettings = ({ buttonCount = 10, info = true, type = 'numeric', pageSizes = false, previousNext = true }) => ({
    buttonCount,
    info,
    pageSizes: pageSizes === true ? [5, 10, 20] : pageSizes,
    previousNext,
    type
});
/**
 * @hidden
 */
const normalize = (settings) => normalizeSettings(settings === true ? {} : settings);

/**
 * @hidden
 */
class PagerComponent {
    constructor(pagerContext) {
        this.pagerContext = pagerContext;
        this.total = 0;
        this.skip = 1;
        this.pageChange = new EventEmitter();
        this.settings = normalize({});
        this._templateContext = {};
    }
    set options(value) {
        this.settings = normalize(value);
    }
    get pagerWrapClass() {
        return true;
    }
    get gridPagerClass() {
        return true;
    }
    get widgetClass() {
        return true;
    }
    get totalPages() {
        return Math.ceil((this.total || 0) / this.pageSize);
    }
    get currentPage() {
        return Math.floor((this.skip || 0) / this.pageSize) + 1;
    }
    get templateContext() {
        const context = this._templateContext;
        context.totalPages = this.totalPages;
        context.total = this.total;
        context.skip = this.skip;
        context.pageSize = this.pageSize;
        context.currentPage = this.currentPage;
        return context;
    }
    ngOnInit() {
        this.pageChangeSubscription = this.pagerContext.pageChange.subscribe(this.changePage.bind(this));
    }
    ngOnChanges(changes) {
        if (anyChanged(['pageSize', 'skip', 'total'], changes, false)) {
            this.pagerContext.notifyChanges({
                pageSize: this.pageSize,
                skip: this.skip,
                total: this.total
            });
        }
    }
    ngOnDestroy() {
        if (this.pageChangeSubscription) {
            this.pageChangeSubscription.unsubscribe();
        }
    }
    changePage(event) {
        this.pageChange.emit(event);
    }
}
PagerComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-pager',
                template: `
        <ng-container
            *ngIf="template?.templateRef"
            [ngTemplateOutlet]="template.templateRef"
            [ngTemplateOutletContext]="templateContext">
        </ng-container>
        <ng-container *ngIf="!template?.templateRef">
            <kendo-pager-prev-buttons *ngIf="settings.previousNext"></kendo-pager-prev-buttons>
            <kendo-pager-numeric-buttons
                *ngIf="settings.type === 'numeric'"
                [buttonCount]="settings.buttonCount">
            </kendo-pager-numeric-buttons>
            <kendo-pager-input *ngIf="settings.type === 'input'"></kendo-pager-input>
            <kendo-pager-next-buttons *ngIf="settings.previousNext"></kendo-pager-next-buttons>
            <kendo-pager-info *ngIf='settings.info'></kendo-pager-info>
            <kendo-pager-page-sizes *ngIf="settings.pageSizes" [pageSizes]="settings.pageSizes"></kendo-pager-page-sizes>
        </ng-container>
  `
            },] },
];
/** @nocollapse */
PagerComponent.ctorParameters = () => [
    { type: PagerContextService }
];
PagerComponent.propDecorators = {
    total: [{ type: Input }],
    skip: [{ type: Input }],
    pageSize: [{ type: Input }],
    options: [{ type: Input }],
    template: [{ type: Input }],
    pageChange: [{ type: Output }],
    pagerWrapClass: [{ type: HostBinding, args: ['class.k-pager-wrap',] }],
    gridPagerClass: [{ type: HostBinding, args: ['class.k-grid-pager',] }],
    widgetClass: [{ type: HostBinding, args: ['class.k-widget',] }]
};

/**
 * @hidden
 */
class PagerElementComponent {
    constructor(localization, pagerContext, cd) {
        this.localization = localization;
        this.pagerContext = pagerContext;
        this.cd = cd;
        this.total = this.pagerContext.total;
        this.skip = this.pagerContext.skip;
        this.pageSize = this.pagerContext.pageSize;
    }
    /**
     * @hidden
     *
     * @readonly
     * @type {number}
     * @memberOf PagerElementComponent
     */
    get currentPage() {
        return Math.floor((this.skip || 0) / this.pageSize) + 1;
    }
    /**
     * @hidden
     *
     * @readonly
     * @type {number}
     * @memberOf PagerElementComponent
     */
    get totalPages() {
        return Math.ceil((this.total || 0) / this.pageSize);
    }
    /**
     * @hidden
     *
     * @param {string} key
     * @returns {string}
     *
     * @memberOf PagerElementComponent
     */
    textFor(key) {
        return this.localization.get(key);
    }
    /**
     * @hidden
     *
     * @param {number} page
     *
     * @memberOf PagerElementComponent
     */
    changePage(page) {
        this.pagerContext.changePage(page);
        return false;
    }
    /**
     * @hidden
     *
     * @memberOf PagerElementComponent
     */
    ngOnInit() {
        this.subscriptions = this.pagerContext.changes.subscribe(this.onChanges.bind(this));
        this.subscriptions.add(this.localization.changes.subscribe(() => this.cd.markForCheck()));
    }
    ngOnDestroy() {
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
        }
    }
}

// tslint:disable:no-access-missing-member
/**
 * Displays buttons for navigating to the first and to the previous page ([see example]({% slug paging_grid %}#toc-pager-templates)).
 */
class PagerPrevButtonsComponent extends PagerElementComponent {
    constructor(localization, pagerContext, cd) {
        super(localization, pagerContext, cd);
    }
    /**
     * @hidden
     *
     * @readonly
     * @type {boolean}
     * @memberOf PagerPrevButtonsComponent
     */
    get disabled() {
        return this.currentPage === 1 || !this.total;
    }
    onChanges({ total, skip, pageSize }) {
        this.total = total;
        this.skip = skip;
        this.pageSize = pageSize;
        this.cd.markForCheck();
    }
}
PagerPrevButtonsComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-pager-prev-buttons',
                template: `
        <a  href="#"
            tabindex="-1"
            [title]="textFor('pagerFirstPage')"
            (click)="currentPage !== 1 ? changePage(0) : false"
            [ngClass]="{
                'k-link': true,
                'k-pager-nav': true,
                'k-state-disabled': disabled,
                'k-pager-first': true
            }">
            <span [attr.aria-label]="textFor('pagerFirstPage')"
                [ngClass]="{
                    'k-icon':true,
                    'k-i-seek-w': true
                }">
            </span>
        </a>
        <a  href="#"
            tabindex="-1"
            [title]="textFor('pagerPreviousPage')"
            (click)="currentPage !== 1 ? changePage(currentPage-2) : false"
            [ngClass]="{
                'k-link': true,
                'k-pager-nav': true,
                'k-state-disabled': disabled,
                '': true
            }">
            <span [attr.aria-label]="textFor('pagerPreviousPage')"
                [ngClass]="{
                    'k-icon':true,
                    'k-i-arrow-w': true
                }">
            </span>
        </a>
    `
            },] },
];
/** @nocollapse */
PagerPrevButtonsComponent.ctorParameters = () => [
    { type: LocalizationService },
    { type: PagerContextService },
    { type: ChangeDetectorRef }
];

// tslint:disable: no-access-missing-member
/**
 * Displays buttons for navigating to the next and to the last page ([see example]({% slug paging_grid %}#toc-pager-template)).
 */
class PagerNextButtonsComponent extends PagerElementComponent {
    constructor(localization, pagerContext, cd) {
        super(localization, pagerContext, cd);
    }
    /**
     * @hidden
     *
     * @readonly
     * @type {boolean}
     * @memberOf PagerNextButtonsComponent
     */
    get disabled() {
        return this.currentPage === this.totalPages || !this.total;
    }
    onChanges({ total, skip, pageSize }) {
        this.total = total;
        this.skip = skip;
        this.pageSize = pageSize;
        this.cd.markForCheck();
    }
}
PagerNextButtonsComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-pager-next-buttons',
                template: `
        <a  href="#"
            tabindex="-1"
            [title]="textFor('pagerNextPage')"
            (click)="currentPage !== totalPages ? changePage(currentPage) : false"
            [ngClass]="{
                'k-link': true,
                'k-pager-nav': true,
                'k-state-disabled': disabled,
                '': true
            }">
            <span [attr.aria-label]="textFor('pagerNextPage')"
                [ngClass]="{
                    'k-icon':true,
                    'k-i-arrow-e': true
                }">
            </span>
        </a>
        <a  href="#"
            tabindex="-1"
            [title]="textFor('pagerLastPage')"
            (click)="currentPage !== totalPages ? changePage(totalPages-1) : false"
            [ngClass]="{
                'k-link': true,
                'k-pager-nav': true,
                'k-state-disabled': disabled,
                'k-pager-last': true
            }">
            <span [attr.aria-label]="textFor('pagerLastPage')"
                [ngClass]="{
                    'k-icon':true,
                    'k-i-seek-e': true
                }">
            </span>
        </a>
    `
            },] },
];
/** @nocollapse */
PagerNextButtonsComponent.ctorParameters = () => [
    { type: LocalizationService },
    { type: PagerContextService },
    { type: ChangeDetectorRef }
];

/**
 * Displays numeric buttons to enable navigation between the pages.
 */
class PagerNumericButtonsComponent extends PagerElementComponent {
    constructor(localization, cd, pagerContext) {
        super(localization, pagerContext, cd);
        this.pagerContext = pagerContext;
    }
    /**
     * @hidden
     *
     * @readonly
     * @type {number[]}
     * @memberOf PagerNumericButtonsComponent
     */
    get buttons() {
        let result = [];
        for (let idx = this.start; idx <= this.end; idx++) {
            result.push(idx);
        }
        return result;
    }
    /**
     * @hidden
     */
    get end() {
        return Math.min((this.start + this.buttonCount) - 1, this.totalPages);
    }
    /**
     * @hidden
     */
    get start() {
        const page = this.currentPage;
        const buttonCount = this.buttonCount;
        if (page > buttonCount) {
            const reminder = (page % buttonCount);
            return (reminder === 0) ? (page - buttonCount) + 1 : (page - reminder) + 1;
        }
        return 1;
    }
    /**
     * @hidden
     */
    pageLabel(num) {
        const pageText = this.textFor('pagerPage');
        if (pageText) {
            return pageText + ' ' + num;
        }
        return num.toString();
    }
    onChanges({ total, skip, pageSize }) {
        this.total = total;
        this.skip = skip;
        this.pageSize = pageSize;
        this.cd.markForCheck();
    }
}
PagerNumericButtonsComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-pager-numeric-buttons',
                template: `
       <ul [ngClass]="{'k-pager-numbers': true, 'k-reset': true}">
            <li *ngIf="start > 1">
                <a  class="k-link"
                    [attr.aria-label]="pageLabel(start - 1)"
                    href="#"
                    tabindex="-1"
                    (click)="changePage(start - 2)">...</a>
            </li>
            <li *ngFor="let num of buttons">
                <a  href="#"
                    [attr.aria-label]="pageLabel(num)"
                    tabindex="-1"
                    [ngClass]="{'k-link': true, 'k-state-selected':currentPage == num}"
                    (click)="changePage(num - 1)">
                    {{num}}
                </a>
            </li>
            <li *ngIf="end < totalPages">
                <a  class="k-link"
                    [attr.aria-label]="pageLabel(end + 1)"
                    href="#"
                    tabindex="-1"
                    (click)="changePage(end)">...</a>
            </li>
        </ul>
    `
            },] },
];
/** @nocollapse */
PagerNumericButtonsComponent.ctorParameters = () => [
    { type: LocalizationService },
    { type: ChangeDetectorRef },
    { type: PagerContextService }
];
PagerNumericButtonsComponent.propDecorators = {
    buttonCount: [{ type: Input }]
};

/**
 * Displays an input element which allows the typing and rendering of page numbers.
 *
 * @example
 * ```ts-preview
 *
 * _@Component({
 *     selector: 'my-app',
 *     template: `
 *      <kendo-grid
 *        [kendoGridBinding]="gridData"
 *        [pageSize]="1"
 *        [pageable]="true"
 *      >
 *       <kendo-grid-column field="ProductID" title="ID" width="40">
 *       </kendo-grid-column>
 *       <kendo-grid-column field="ProductName" title="Name" width="250">
 *       </kendo-grid-column>
 *       <kendo-grid-column field="UnitPrice" title="Price" width="80" format="{0:c}">
 *       </kendo-grid-column>
 *
 *       <ng-template kendoPagerTemplate let-totalPages="totalPages" let-currentPage="currentPage">
 *          <kendo-pager-prev-buttons></kendo-pager-prev-buttons>
 *          <kendo-pager-numeric-buttons [buttonCount]="10"></kendo-pager-numeric-buttons>
 *          <kendo-pager-next-buttons></kendo-pager-next-buttons>
 *          <kendo-pager-input></kendo-pager-input>
 *          <kendo-pager-info></kendo-pager-info>
 *       </ng-template>
 *
 *    </kendo-grid>
 *     `
 * })
 *
 * class AppComponent {
 *     public gridData = [{
 *         "ProductID": 1,
 *         "ProductName": "Chai",
 *         "UnitPrice": 18.0000,
 *         "Discontinued": false
 *       }, {
 *         "ProductID": 2,
 *         "ProductName": "Chang",
 *         "UnitPrice": 19.0000,
 *         "Discontinued": true
 *       }
 *     ];
 * }
 *
 * ```
 */
class PagerInputComponent extends PagerElementComponent {
    constructor(localization, pagerContext, zone, cd) {
        super(localization, pagerContext, cd);
        this.pagerContext = pagerContext;
        this.zone = zone;
        /**
         * @hidden
         *
         * @param {string} value
         *
         * @memberOf PagerInputComponent
         */
        this.handleKeyDown = (event) => {
            let incomingValue = this.numericInput.value || this.current;
            if (event.keyCode === Keys.Enter) {
                event.preventDefault();
                if (incomingValue !== this.current) {
                    this.zone.run(() => {
                        this.changePage(incomingValue - 1);
                    });
                }
            }
        };
        /**
         * @hidden
         *
         * @param {string} value
         *
         * @memberOf PagerInputComponent
         */
        this.handleBlur = () => {
            const inputValue = this.numericInput.value;
            if (!inputValue) {
                this.numericInput.writeValue(this.current);
                return;
            }
            if (inputValue !== this.current) {
                this.zone.run(() => {
                    this.changePage(inputValue - 1);
                });
            }
        };
    }
    /**
     * @hidden
     */
    get current() {
        return this.hasPages ? this.currentPage : 0;
    }
    get hasPages() {
        return this.totalPages !== 0;
    }
    onChanges({ total, skip, pageSize }) {
        this.total = total;
        this.skip = skip;
        this.pageSize = pageSize;
        this.cd.markForCheck();
    }
}
PagerInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-pager-input',
                template: `
     <span [ngClass]="{'k-pager-input': true, 'k-label': true}">
        {{textFor('pagerPage')}}
        <kendo-numerictextbox
            [spinners]="false"
            [decimals]="0"
            format="n0"
            [disabled]="!hasPages"
            [value]="current"
            [min]="hasPages ? 1 : 0"
            [max]="totalPages"
            [autoCorrect]="true"
            [title]="textFor('pagerPageNumberInputTitle')"
            [kendoEventsOutsideAngular]="{
                keydown: handleKeyDown,
                focusout: handleBlur
            }"
        >
        </kendo-numerictextbox>
        {{textFor('pagerOf')}} {{totalPages}}
     </span>
    `
            },] },
];
/** @nocollapse */
PagerInputComponent.ctorParameters = () => [
    { type: LocalizationService },
    { type: PagerContextService },
    { type: NgZone },
    { type: ChangeDetectorRef }
];
PagerInputComponent.propDecorators = {
    numericInput: [{ type: ViewChild, args: [NumericTextBoxComponent,] }]
};

// tslint:disable:no-access-missing-member
/**
 * Displays information about the current page and the total number of records ([see example]({% slug paging_grid %}#toc-pager-templates)).
 */
class PagerInfoComponent extends PagerElementComponent {
    constructor(localization, cd, pagerContext) {
        super(localization, pagerContext, cd);
        this.pagerContext = pagerContext;
    }
    /**
     * @hidden
     *
     * @readonly
     * @type {number}
     * @memberOf PagerInfoComponent
     */
    get maxItems() {
        return Math.min(this.currentPage * this.pageSize, this.total);
    }
    /**
     * @hidden
     *
     * @readonly
     * @type {number}
     * @memberOf PagerInfoComponent
     */
    get currentPageText() {
        return this.total ?
            (this.currentPage - 1) * this.pageSize + 1 :
            0;
    }
    /**
     * @hidden
     *
     * @readonly
     * @type {boolean}
     * @memberOf PagerInfoComponent
     */
    get classes() {
        return true;
    }
    onChanges({ total, skip, pageSize }) {
        this.total = total;
        this.skip = skip;
        this.pageSize = pageSize;
        this.cd.markForCheck();
    }
}
PagerInfoComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-pager-info',
                template: `{{currentPageText}} - {{maxItems}} {{textFor('pagerOf')}} {{total}} {{textFor('pagerItems')}}`
            },] },
];
/** @nocollapse */
PagerInfoComponent.ctorParameters = () => [
    { type: LocalizationService },
    { type: ChangeDetectorRef },
    { type: PagerContextService }
];
PagerInfoComponent.propDecorators = {
    classes: [{ type: HostBinding, args: ["class.k-pager-info",] }, { type: HostBinding, args: ["class.k-label",] }]
};

// tslint:disable:no-access-missing-member
/**
 * Displays a drop-down list for the page size selection ([see example]({% slug paging_grid %}#toc-pager-templates)).
 */
class PagerPageSizesComponent extends PagerElementComponent {
    constructor(localization, cd, pagerContext) {
        super(localization, pagerContext, cd);
        this.pagerContext = pagerContext;
        this._pageSizes = [];
    }
    get pageSizes() {
        return this._pageSizes;
    }
    /**
     * The page sizes collection. Can be an Array of numbers and/or PageSizeItem objects.
     *
     * @example
     * ```ts-preview
     * _@Component({
     *    selector: 'my-app',
     *    template: `
     *        <kendo-grid [kendoGridBinding]="gridData" [height]="200"
     *           [pageable]="true"
     *            [pageSize]="pageSize">
     *            <ng-template kendoPagerTemplate let-totalPages="totalPages" let-currentPage="currentPage">
     *                <kendo-pager-page-sizes [pageSizes]="pagesizes"></kendo-pager-page-sizes>
     *            </ng-template>
     *        </kendo-grid>
     *    `
     * })
     * class AppComponent {
     *    public gridData: any[] = products;
     *    public pageSize = 2;
     *    public pagesizes = [{text: 'One', value: 1}, {text: 'Two', value: 2}, {text: 'All', value : 'all'}];
     * }
     *
     * const products = [{
     *   'ProductID' : 1,
     *   'ProductName' : "Chai",
     *   'SupplierID' : 1,
     *   'CategoryID' : 1,
     *   'QuantityPerUnit' : "10 boxes x 20 bags",
     *   'UnitPrice' : 18.0000,
     *   'UnitsInStock' : 39,
     *   'UnitsOnOrder' : 0,
     *   'ReorderLevel' : 10,
     *   'Discontinued' : false
     *
     * }, {
     *   'ProductID' : 2,
     *   'ProductName' : "Chang",
     *   'SupplierID' : 1,
     *   'CategoryID' : 1,
     *   'QuantityPerUnit' : "24 - 12 oz bottles",
     *   'UnitPrice' : 19.0000,
     *   'UnitsInStock' : 17,
     *   'UnitsOnOrder' : 40,
     *   'ReorderLevel' : 25,
     *   'Discontinued' : false
     * }, {
     *   'ProductID' : 3,
     *   'ProductName' : "Aniseed Syrup",
     *   'SupplierID' : 1,
     *   'CategoryID' : 2,
     *   'QuantityPerUnit' : "12 - 550 ml bottles",
     *   'UnitPrice' : 10.0000,
     *   'UnitsInStock' : 13,
     *   'UnitsOnOrder' : 70,
     *   'ReorderLevel' : 25,
     *   'Discontinued' : false
     * }, {
     *   'ProductID' : 4,
     *   'ProductName' : "Chef Anton\'s Cajun Seasoning",
     *   'SupplierID' : 2,
     *  'CategoryID' : 2,
     *   'QuantityPerUnit' : "48 - 6 oz jars",
     *   'UnitPrice' : 22.0000,
     *   'UnitsInStock' : 53,
     *   'UnitsOnOrder' : 0,
     *   'ReorderLevel' : 0,
     *   'Discontinued' : false
     * }, {
     *   'ProductID' : 5,
     *   'ProductName' : "Chef Anton\'s Gumbo Mix",
     *   'SupplierID' : 2,
     *   'CategoryID' : 2,
     *   'QuantityPerUnit' : "36 boxes",
     *   'UnitPrice' : 21.3500,
     *   'UnitsInStock' : 0,
     *   'UnitsOnOrder' : 0,
     *   'ReorderLevel' : 0,
     *   'Discontinued' : true
     * }, {
     *   'ProductID' : 6,
     *   'ProductName' : "Grandma\'s Boysenberry Spread",
     *   'SupplierID' : 3,
     *   'CategoryID' : 2,
     *   'QuantityPerUnit' : "12 - 8 oz jars",
     *   'UnitPrice' : 25.0000,
     *   'UnitsInStock' : 120,
     *   'UnitsOnOrder' : 0,
     *   'ReorderLevel' : 25,
     *   'Discontinued' : false
     * }];
     * ```
     */
    set pageSizes(pageSizes) {
        const normalizedItems = [];
        pageSizes.forEach(item => {
            if (typeof item === 'number') {
                normalizedItems.push({
                    text: item.toString(),
                    value: item
                });
            }
            else {
                normalizedItems.push(item);
            }
        });
        this._pageSizes = normalizedItems;
    }
    /**
     * @hidden
     *
     * @readonly
     */
    get classes() {
        return true;
    }
    /**
     * @hidden
     *
     * @readonly
     */
    get showInitialPageSize() {
        return this.pageSizes
            .filter(item => {
            if (typeof item.value === 'number') {
                return item.value === Number(this.pageSize);
            }
            return this.total === Number(this.pageSize);
        })
            .length === 0;
    }
    /**
     * @hidden
     */
    pageSizeChange(value) {
        this.pageSize = parseInt(value, 10);
        this.pagerContext.changePageSize(this.pageSize);
    }
    /**
     * @hidden
     */
    getValue(page) {
        return typeof page.value === 'number' ? page.value : this.total;
    }
    /**
     * @hidden
     */
    getSelectedState(page) {
        if (typeof page.value === 'number') {
            return page.value === this.pageSize ? true : undefined;
        }
        return this.pageSize === this.total;
    }
    onChanges({ total, skip, pageSize }) {
        this.total = total;
        this.skip = skip;
        this.pageSize = typeof pageSize === 'number' ? pageSize : this.total;
        this.cd.markForCheck();
    }
}
PagerPageSizesComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-pager-page-sizes',
                template: `
        <select #select
            (change)="pageSizeChange(select.value)"
            [attr.aria-label]="textFor('pagerItemsPerPage')">
            <option *ngIf="showInitialPageSize" [value]="pageSize">{{pageSize}}</option>
            <option *ngFor="let page of pageSizes" [value]="getValue(page)" [selected]="getSelectedState(page)">
                {{page['text']}}
            </option>
        </select>
        {{ textFor('pagerItemsPerPage') }}
    `
            },] },
];
/** @nocollapse */
PagerPageSizesComponent.ctorParameters = () => [
    { type: LocalizationService },
    { type: ChangeDetectorRef },
    { type: PagerContextService }
];
PagerPageSizesComponent.propDecorators = {
    pageSizes: [{ type: Input }],
    classes: [{ type: HostBinding, args: ['class.k-pager-sizes',] }, { type: HostBinding, args: ['class.k-label',] }]
};

const importedModules$1 = [
    CommonModule,
    InputsModule,
    SharedModule
];
const INTERNAL_COMPONENTS$1 = [
    PagerComponent,
    PagerPrevButtonsComponent,
    PagerNextButtonsComponent,
    PagerNumericButtonsComponent,
    PagerInputComponent,
    PagerInfoComponent,
    PagerPageSizesComponent,
    PagerTemplateDirective
];
/**
 * @hidden
 */
class PagerModule {
    static exports() {
        return [
            PagerComponent,
            PagerPrevButtonsComponent,
            PagerNextButtonsComponent,
            PagerNumericButtonsComponent,
            PagerInputComponent,
            PagerInfoComponent,
            PagerPageSizesComponent,
            PagerTemplateDirective
        ];
    }
}
PagerModule.decorators = [
    { type: NgModule, args: [{
                declarations: [INTERNAL_COMPONENTS$1],
                exports: [INTERNAL_COMPONENTS$1],
                imports: [...importedModules$1]
            },] },
];

/**
 * @hidden
 */
class GroupHeaderComponent {
    constructor(groupsService, groupInfoService) {
        this.groupsService = groupsService;
        this.groupInfoService = groupInfoService;
        this.skipGroupDecoration = false;
        this.hasDetails = false;
        this.totalColumnsCount = 0;
        this.groups = [];
        this.isExpanded = false;
    }
    get groupItemClass() {
        return true;
    }
    ngDoCheck() {
        this.isExpanded = this.groupsService.isExpanded(this.item.index);
    }
    prefixGroupCell(item) {
        return new Array(item.level);
    }
    toggleGroup(item) {
        this.groupsService.toggleRow(item.index, item.data);
        return false;
    }
    groupSpan(item) {
        const groupCount = (this.groups || []).length;
        const detailOffset = this.hasDetails ? 1 : 0;
        if (this.hasGroupHeaderColumn) {
            return groupCount + 1 + detailOffset - item.level;
        }
        let columnCount = columnsSpan(this.columns);
        if (this.skipGroupDecoration) {
            return columnCount;
        }
        return groupCount + columnCount + detailOffset - item.level;
    }
    logicalColSpan() {
        return this.skipGroupDecoration ? 1 : this.totalColumnsCount;
    }
    ariaRole() {
        if (this.skipGroupDecoration) {
            return 'presentation';
        }
        return 'gridcell';
    }
    formatForGroup(item) {
        return this.groupInfoService.formatForGroup(item);
    }
    groupTitle(item) {
        return this.groupInfoService.groupTitle(item);
    }
    groupHeaderTemplate(item) {
        return this.groupInfoService.groupHeaderTemplate(item);
    }
}
GroupHeaderComponent.decorators = [
    { type: Component, args: [{
                selector: '[kendoGridGroupHeader]',
                template: `
        <ng-template [ngIf]="!skipGroupDecoration">
            <td class="k-group-cell"
                role="presentation"
                *ngFor="let g of prefixGroupCell(item)"></td>
        </ng-template>
        <td [attr.colspan]="groupSpan(item)" *ngIf="!(skipGroupDecoration && hasGroupHeaderColumn)"
            [attr.role]="ariaRole()"
            aria-selected="false"
            [attr.aria-expanded]="isExpanded"
            kendoGridLogicalCell
            [logicalRowIndex]="logicalRowIndex"
            [logicalColIndex]="0"
            [logicalSlaveCell]="skipGroupDecoration"
            [groupItem]="item"
            [colSpan]="logicalColSpan()">
            <p class="k-reset">
                <ng-template [ngIf]="!skipGroupDecoration">
                    <a href="#" tabindex="-1" (click)="toggleGroup(item)"
                        class="k-icon"
                        [ngClass]="{ 'k-i-collapse': isExpanded, 'k-i-expand': !isExpanded }" role="presentation">
                    </a>
                    <ng-template [ngIf]="!groupHeaderTemplate(item)">
                    {{groupTitle(item)}}: {{item.data | valueOf:"value": formatForGroup(item)}}
                    </ng-template>
                    <ng-template
                        [templateContext]="{
                            templateRef: groupHeaderTemplate(item),
                            group: item.data,
                            aggregates: item.data?.aggregates,
                            value: item.data?.value,
                            field: item.data?.field,
                            index: item.index,
                            expanded: isExpanded,
                            $implicit: item.data
                            }">
                    </ng-template>
                </ng-template>
            </p>
        </td>
        <ng-container *ngIf="hasGroupHeaderColumn">
            <td *ngFor="let column of groupHeaderColumns; let index = index"
                role="gridcell"
                aria-selected="false"
                kendoGridLogicalCell
                [logicalRowIndex]="logicalRowIndex"
                [logicalColIndex]="index + 1"
                [logicalSlaveCell]="false"
                [groupItem]="item"
                [colSpan]="1"
            >
                <ng-container *ngIf="column.groupHeaderColumnTemplateRef" [ngTemplateOutlet]="column.groupHeaderColumnTemplateRef"
                    [ngTemplateOutletContext]="{
                        group: item.data,
                        aggregates: item.data?.aggregates,
                        value: item.data?.value,
                        field: item.data?.field,
                        index: item.index,
                        $implicit: item.data
                        }">
                </ng-container>
            </td>
        </ng-container>
    `
            },] },
];
/** @nocollapse */
GroupHeaderComponent.ctorParameters = () => [
    { type: GroupsService },
    { type: GroupInfoService }
];
GroupHeaderComponent.propDecorators = {
    rowIndex: [{ type: Input }],
    logicalRowIndex: [{ type: Input }],
    item: [{ type: Input }],
    skipGroupDecoration: [{ type: Input }],
    hasDetails: [{ type: Input }],
    totalColumnsCount: [{ type: Input }],
    hasGroupHeaderColumn: [{ type: Input }],
    groupHeaderColumns: [{ type: Input }],
    columns: [{ type: Input }],
    groups: [{ type: Input }],
    groupItemClass: [{ type: HostBinding, args: ['class.k-grouping-row',] }]
};

/**
 * @hidden
 */
class DropTargetDirective {
    constructor(element, service) {
        this.element = element;
        this.service = service;
        this.context = {};
        this.enter = new EventEmitter();
        this.leave = new EventEmitter();
        this.drop = new EventEmitter();
        this.subscriptions = new Subscription();
    }
    ngOnInit() {
        this.service.add(this);
        const changes = this.service.changes.pipe(filter(({ target }) => target === this));
        this.subscriptions.add(changes.pipe(filter(({ type }) => type === 'leave'))
            .subscribe(e => {
            this.leave.next(this.eventArgs(e));
        }));
        this.subscriptions.add(changes.pipe(filter(({ type }) => type === 'enter'))
            .subscribe(e => {
            this.enter.next(this.eventArgs(e));
        }));
        this.subscriptions.add(changes.pipe(filter(({ type }) => type === 'drop'))
            .subscribe(e => {
            this.drop.next(this.eventArgs(e));
        }));
    }
    ngOnDestroy() {
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
        }
    }
    eventArgs(e) {
        return {
            target: this,
            mouseEvent: e.mouseEvent,
            draggable: e.draggable
        };
    }
}
DropTargetDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoDropTarget]'
            },] },
];
/** @nocollapse */
DropTargetDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: DragAndDropService }
];
DropTargetDirective.propDecorators = {
    context: [{ type: Input }],
    enter: [{ type: Output }],
    leave: [{ type: Output }],
    drop: [{ type: Output }]
};

const withoutField = ({ field }) => isNullOrEmptyString(field);
const alreadyGrouped = ({ groups, field }) => groups.some(group => group.field === field);
const overSameTarget = ({ target, field }) => target.field === field;
const overLastTarget = ({ target }) => target.lastTarget;
const isLastGroup = ({ groups, field }) => groups.map(group => group.field).indexOf(field) === groups.length - 1;
const isNotGroupable = (groupsService) => ({ field }) => !groupsService.isGroupable(field);
const columnRules = (groupService) => or(withoutField, alreadyGrouped, isNotGroupable(groupService));
const indicatorRules = or(overSameTarget, and(overLastTarget, isLastGroup));
/**
 * @hidden
 */
class GroupPanelComponent {
    constructor(hint, cue, groupInfoService, localization, cd) {
        this.hint = hint;
        this.cue = cue;
        this.groupInfoService = groupInfoService;
        this.localization = localization;
        this.cd = cd;
        this.change = new EventEmitter();
        this.groups = [];
        this.dropTargets = new QueryList();
        this.groupTitles = [];
        this.subscription = new Subscription();
    }
    get groupHeaderClass() {
        return true;
    }
    set text(value) {
        this.emptyText = value;
    }
    get text() {
        return this.emptyText ? this.emptyText : this.localization.get('groupPanelEmpty');
    }
    ngAfterViewInit() {
        this.subscription.add(observe(this.dropTargets)
            .subscribe(this.attachTargets.bind(this)));
    }
    ngOnInit() {
        this.subscription.add(this.localization.changes.subscribe(() => this.cd.markForCheck()));
    }
    ngDoCheck() {
        const currentTitles = this.groups.map(group => this.groupInfoService.groupTitle(group));
        if (currentTitles.length !== this.groupTitles.length || currentTitles.some((current, idx) => current !== this.groupTitles[idx])) {
            this.groupTitles = currentTitles;
            this.cd.markForCheck();
        }
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        if (this.targetSubscription) {
            this.targetSubscription.unsubscribe();
        }
    }
    directionChange(group) {
        const index = this.groups.findIndex(x => x.field === group.field);
        const groups = [...this.groups.slice(0, index), group, ...this.groups.slice(index + 1)];
        this.change.emit(groups);
    }
    insert(field, index) {
        const groups = this.groups.filter(x => x.field !== field);
        if (groups.length || this.groups.length === 0) {
            this.change.emit([...groups.slice(0, index), { field: field }, ...groups.slice(index)]);
        }
    }
    remove(group) {
        this.change.emit(this.groups.filter(x => x.field !== group.field));
    }
    canDrop(draggable, target) {
        const isIndicator = draggable.type === 'groupIndicator';
        const rules = isIndicator
            ? indicatorRules
            : columnRules(this.groupInfoService);
        return !rules({
            field: draggable.field,
            groups: this.groups,
            target
        });
    }
    attachTargets() {
        if (this.targetSubscription) {
            this.targetSubscription.unsubscribe();
        }
        this.targetSubscription = new Subscription();
        const enterStream = this.dropTargets
            .reduce((acc, target) => merge(acc, target.enter), from([]));
        const leaveStream = this.dropTargets
            .reduce((acc, target) => merge(acc, target.leave), from([]));
        const dropStream = this.dropTargets
            .reduce((acc, target) => merge(acc, target.drop), from([]));
        this.targetSubscription.add(enterStream.pipe(tap(_ => this.hint.removeLock()), filter(({ draggable, target }) => this.canDrop(draggable.context, target.context)), tap(this.enter.bind(this)), switchMapTo(dropStream.pipe(takeUntil(leaveStream.pipe(tap(this.leave.bind(this))))))).subscribe(this.drop.bind(this)));
    }
    enter({ draggable, target }) {
        this.hint.enable();
        let before = target.context.lastTarget || isTargetBefore(draggable.element.nativeElement, target.element.nativeElement);
        if (this.localization.rtl) {
            before = !before;
        }
        this.cue.position(position(target.element.nativeElement, before));
    }
    leave() {
        this.hint.disable();
        this.cue.hide();
    }
    drop({ target, draggable }) {
        const field = draggable.context.field;
        const index = this.dropTargets.toArray().indexOf(target);
        this.insert(field, index);
    }
}
GroupPanelComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-grid-group-panel',
                template: `
        <ng-template [ngIf]="groups.length === 0">
            <div
                class="k-indicator-container"
                [context]="{
                    lastTarget: true
                }"
                kendoDropTarget>
                {{ text }}
            </div>
        </ng-template>
        <div *ngFor="let group of groups; let index = index;"
            class="k-indicator-container"
            [context]="{
                field: group.field
            }"
            kendoDropTarget>
            <div
                kendoDraggableColumn
                [enableDrag]="true"
                [context]="{
                    field: group.field,
                    type: 'groupIndicator',
                    hint:  groupTitles[index]
                }"
                kendoGroupIndicator
                kendoDraggable
                [group]="group"
                [groupTitle]="groupTitles[index]"
                (directionChange)="directionChange($event)"
                (remove)="remove($event)">
            </div>
        </div>
        <div class="k-indicator-container"
            *ngIf="groups.length !== 0"
            [context]="{
                lastTarget: true
            }"
            kendoDropTarget>&nbsp;</div>
    `
            },] },
];
/** @nocollapse */
GroupPanelComponent.ctorParameters = () => [
    { type: DragHintService },
    { type: DropCueService },
    { type: GroupInfoService },
    { type: LocalizationService },
    { type: ChangeDetectorRef }
];
GroupPanelComponent.propDecorators = {
    change: [{ type: Output }],
    groupHeaderClass: [{ type: HostBinding, args: ["class.k-grouping-header",] }, { type: HostBinding, args: ["class.k-grouping-header-flex",] }],
    text: [{ type: Input }],
    groups: [{ type: Input }],
    dropTargets: [{ type: ViewChildren, args: [DropTargetDirective,] }]
};

/**
 * @hidden
 */
class GroupIndicatorComponent {
    constructor() {
        this.directionChange = new EventEmitter();
        this.remove = new EventEmitter();
    }
    get groupIndicatorClass() {
        return true;
    }
    get dir() {
        return this.group.dir ? this.group.dir : "asc";
    }
    toggleDirection() {
        this.directionChange.emit({
            dir: this.dir === "asc" ? "desc" : "asc",
            field: this.group.field
        });
        return false;
    }
    removeDescriptor() {
        this.remove.emit({
            dir: this.group.dir,
            field: this.group.field
        });
        return false;
    }
}
GroupIndicatorComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: '[kendoGroupIndicator]',
                template: `
        <a href="#" class="k-link" tabindex="-1" (click)="toggleDirection()">
            <span class="k-icon"
                [class.k-i-sort-asc-sm]="dir === 'asc'"
                [class.k-i-sort-desc-sm]="dir === 'desc'"></span>
            {{groupTitle}}</a>
        <a class="k-button k-button-icon k-bare" tabindex="-1" (click)="removeDescriptor()">
            <span class="k-icon k-i-group-delete"></span>
        </a>
    `
            },] },
];
GroupIndicatorComponent.propDecorators = {
    directionChange: [{ type: Output }],
    remove: [{ type: Output }],
    group: [{ type: Input }],
    groupTitle: [{ type: Input }],
    groupIndicatorClass: [{ type: HostBinding, args: ["class.k-group-indicator",] }]
};

// TODO
// tslint:disable:rxjs-no-unsafe-takeuntil
/**
 * @hidden
 */
const preventOnDblClick = release => mouseDown => of(mouseDown).pipe(delay(150), takeUntil(release));
const hasClass = className => el => new RegExp(`(^| )${className}( |$)`).test(el.className);
const isDeleteButton = or(hasClass("k-i-group-delete"), hasClass("k-button-icon"));
const isSortIcon = or(hasClass("k-i-sort-asc-sm"), hasClass("k-i-sort-desc-sm"));
const skipButtons = and(not(isDeleteButton), not(isSortIcon), not(isFocusableWithTabKey), not(matchesNodeName("label")));
const elementUnderCursor = ({ clientX, clientY }) => document.elementFromPoint(clientX, clientY);
const hideThenShow = (element, cont) => {
    element.style.display = 'none';
    const result = cont();
    element.style.display = 'block';
    return result;
};
/**
 * @hidden
 */
class DraggableColumnDirective {
    constructor(draggable, element, zone, service, hint, cue, nav, renderer) {
        this.draggable = draggable;
        this.element = element;
        this.zone = zone;
        this.service = service;
        this.hint = hint;
        this.cue = cue;
        this.nav = nav;
        this.renderer = renderer;
        this.context = {};
        this.drag = new EventEmitter();
        this.subscriptions = new Subscription();
    }
    set enableDrag(enabled) {
        this.enabled = enabled;
        this.updateTouchAction();
    }
    get hostClass() {
        return this.enabled;
    }
    ngOnInit() {
        this.subscriptions.add(this.zone.runOutsideAngular(() => this.draggable.kendoPress.pipe(filter(_ => this.enabled), filter(({ originalEvent: { target } }) => target === this.element.nativeElement || skipButtons(target)), tap((e) => {
            const originalEvent = e.originalEvent;
            if (!e.isTouch) {
                originalEvent.preventDefault();
            }
            this.nav.navigateTo(originalEvent.target);
        }), switchMap(preventOnDblClick(this.draggable.kendoRelease)), tap(down => {
            this.hint.create(down, this.element.nativeElement, this.context.hint);
            this.cue.create();
        }), switchMap(down => this.draggable.kendoDrag.pipe(tap((e) => {
            if (e.isTouch) {
                e.originalEvent.preventDefault();
            }
        }), tap(this.hint.attach()), tap(this.cue.attach()), takeUntil(this.draggable.kendoRelease), map(move => ({ move, down })))), tap(this.performDrag.bind(this)), switchMapTo(this.draggable.kendoRelease)).subscribe(this.drop.bind(this))));
    }
    ngOnDestroy() {
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
        }
    }
    drop(upEvent) {
        this.hint.remove();
        this.cue.remove();
        this.service.notifyDrop(this, upEvent);
    }
    performDrag({ move }) {
        this.hint.move(move);
        const cursorElement = this.elementUnderCursor(move);
        if (cursorElement) {
            this.service.notifyDrag(this, cursorElement, move);
        }
        this.drag.emit({
            draggable: this,
            mouseEvent: move
        });
    }
    elementUnderCursor(mouseEvent) {
        this.hint.hide();
        let target = elementUnderCursor(mouseEvent);
        if (target && /k-grouping-dropclue/.test(target.className)) {
            target = hideThenShow(target, elementUnderCursor.bind(this, mouseEvent));
        }
        this.hint.show();
        return target;
    }
    updateTouchAction() {
        if (!this.element) {
            return;
        }
        this.renderer.setStyle(this.element.nativeElement, 'touch-action', this.enabled ? 'none' : '');
    }
}
DraggableColumnDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoDraggableColumn]'
            },] },
];
/** @nocollapse */
DraggableColumnDirective.ctorParameters = () => [
    { type: DraggableDirective, decorators: [{ type: Host }] },
    { type: ElementRef },
    { type: NgZone },
    { type: DragAndDropService },
    { type: DragHintService },
    { type: DropCueService },
    { type: NavigationService },
    { type: Renderer2 }
];
DraggableColumnDirective.propDecorators = {
    context: [{ type: Input }],
    enableDrag: [{ type: Input }],
    drag: [{ type: Output }],
    hostClass: [{ type: HostBinding, args: ['class.k-grid-draggable-header',] }]
};

const exported = [
    DraggableColumnDirective,
    DropTargetDirective
];
/**
 * @hidden
 */
class DragAndDropModule {
}
DragAndDropModule.decorators = [
    { type: NgModule, args: [{
                declarations: [exported],
                exports: [exported]
            },] },
];

const exportedModules$1 = [
    GroupHeaderTemplateDirective,
    GroupHeaderColumnTemplateDirective,
    GroupFooterTemplateDirective,
    GroupHeaderComponent,
    GroupPanelComponent,
    GroupIndicatorComponent
];
/**
 * @hidden
 */
class GroupModule {
    static exports() {
        return [
            GroupHeaderTemplateDirective,
            GroupHeaderColumnTemplateDirective,
            GroupFooterTemplateDirective
        ];
    }
}
GroupModule.decorators = [
    { type: NgModule, args: [{
                declarations: [exportedModules$1],
                exports: [exportedModules$1],
                imports: [CommonModule, SharedModule, DragAndDropModule]
            },] },
];

/**
 * @hidden
 */
const DEFAULTS = {
    allowUnsort: true,
    mode: 'single',
    showIndexes: true,
    initialDirection: 'asc'
};
/**
 * @hidden
 */
const normalize$1 = (...settings) => Object.assign({}, DEFAULTS, ...settings);

/**
 * @hidden
 */
const hasFilter = (settings, column) => settings.filter !== false && column.field && column.filterable;
/**
 * @hidden
 */
const hasSort = (settings, column) => settings.sort !== false && column.field && column.sortable;
/**
 * @hidden
 */
const hasLock = (settings, column) => settings.lock && column.lockable && !(column.parent && !column.parent.isSpanColumn);
/**
 * @hidden
 */
const hasColumnChooser = (settings) => settings.columnChooser !== false;
/**
 * @hidden
 */
const hasItems = (settings, column) => hasColumnChooser(settings) || hasLock(settings, column) || hasSort(settings, column) || hasFilter(settings, column);

const mergeObjects = (...args) => Object.assign.apply(null, [{}].concat(args));
const directions = initialDirection => initialDirection === "asc" ? ["asc", "desc"] : ["desc", "asc"];
/**
 * @hidden
 */
const isRootLevel = ({ parent }) => !isTruthy(parent);
const ofColumnType = ({ draggable }) => ['column', 'columnGroup']
    .indexOf(draggable.context.type) >= 0;
const notSameElement = ({ draggable, target }) => draggable.element.nativeElement !== target.element.nativeElement;
const inSameParent = (x, y) => x.parent === y.parent ||
    (isInSpanColumn(y) && inSameParent(x, y.parent));
const sameParent = ({ draggable, target }) => inSameParent(draggable.context.column, target.context.column);
const lastNonLocked = ({ draggable }) => !isTruthy(draggable.context.column.locked) &&
    isRootLevel(draggable.context.column) &&
    draggable.context.lastColumn;
const notInSpanColumn = ({ draggable }) => !isInSpanColumn(draggable.context.column);
const reorderable = ({ draggable }) => draggable.context.column.reorderable;
const lockable = ({ draggable, target }) => draggable.context.column.lockable !== false ||
    draggable.context.column.isLocked === target.context.column.isLocked;
const rules = and(ofColumnType, reorderable, notInSpanColumn, notSameElement, sameParent, not(lastNonLocked), lockable);
/**
 * @hidden
 */
class HeaderComponent {
    constructor(popupService, hint, cue, reorderService, idService, sortService, localization, cd) {
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
    sortColumn(column) {
        this.sortService.sort(this.toggleSort(column));
    }
    onSortClick(column, event, link) {
        const target = event.target;
        if (column.headerTemplateRef && target !== link) {
            const hasFocusableParent = Boolean(closestInScope(target, isFocusable, link));
            if (hasFocusableParent) {
                // Do not sort when clicking focusable template elements.
                return;
            }
        }
        this.sortColumn(column);
    }
    onHeaderKeydown(column, args) {
        if (!this.sortable || args.defaultPrevented || column.sortable === false) {
            return;
        }
        if (args.keyCode === Keys.Enter && isPresent(column.field)) {
            this.sortService.sort(this.toggleSort(column));
        }
    }
    showSortNumbering(column) {
        const { showIndexes } = normalize$1(this.sortable);
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
        const state$$1 = this.sortDescriptor(field);
        return {
            'k-icon': isPresent(state$$1.dir),
            'k-i-sort-desc-sm': state$$1.dir === "desc",
            'k-i-sort-asc-sm': state$$1.dir === "asc"
        };
    }
    sortState(column) {
        if (!this.isSortable(column)) {
            return;
        }
        const state$$1 = this.sortDescriptor(column.field);
        if (state$$1.dir === 'asc') {
            return 'ascending';
        }
        if (state$$1.dir === 'desc') {
            return 'descending';
        }
    }
    sortStatus(column) {
        if (!this.sortedFields[column.field] || !this.isSortable(column)) {
            return;
        }
        let msg = 'sortedDefault';
        const state$$1 = this.sortDescriptor(column.field);
        if (state$$1.dir === 'asc') {
            msg = 'sortedAscending';
        }
        else if (state$$1.dir === 'desc') {
            msg = 'sortedDescending';
        }
        return this.localization.get(msg);
    }
    toggleSort(column) {
        const { allowUnsort, mode, initialDirection } = normalize$1(this.sortable, column.sortable);
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
    selectAllCheckboxId() {
        return this.idService.selectAllCheckboxId();
    }
    isFirstOnRow(column, index) {
        const isTailing = (c) => c &&
            (this.columnsForLevel(c.level).indexOf(c) > 0 || isTailing(c.parent));
        return index === 0 && !this.groups.length && !this.detailTemplate && isTailing(column.parent);
    }
    logicalColumnIndex(column) {
        const index = column.leafIndex;
        if (isPresent(index)) {
            return index + (isPresent(this.detailTemplate) ? 1 : 0);
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
        const canReorder = this.reorderable && column.reorderable;
        if (!canReorder && !isColumnComponent(column)) {
            return false;
        }
        const groupable = this.groupable && isColumnComponent(column) && column.groupable !== false;
        return groupable || canReorder;
    }
    isSortable(column) {
        return !isNullOrEmptyString(column.field)
            && isTruthy(this.sortable) && isTruthy(column.sortable);
    }
    isCheckboxColumn(column) {
        return isCheckboxColumn(column) && !column.templateRef;
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
            if (draggable.context.type === 'groupIndicator') {
                return;
            }
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
                selector: '[kendoGridHeader]',
                styles: [`
        .k-column-resizer {
            cursor: col-resize;
            display: block;
            height: 1000%;
            position: absolute;
            top: 0;
            width: .5em;
        }
    `],
                template: `
    <ng-template [ngIf]="true">
        <tr *ngFor="let i of columnLevels; let levelIndex = index"
            kendoGridLogicalRow
                [logicalRowIndex]="levelIndex"
                [logicalSlaveRow]="lockedColumnsCount > 0"
                [logicalCellsCount]="columns.length"
                [logicalSlaveCellsCount]="unlockedColumnsCount">
            <th
                class="k-group-cell k-header"
                role="presentation"
                *ngFor="let g of groups">
            </th>
            <th class="k-hierarchy-cell k-header"
                role="presentation"
                *ngIf="detailTemplate?.templateRef"
                kendoGridLogicalCell
                    [logicalRowIndex]="levelIndex"
                    [logicalColIndex]="0"
                    aria-selected="false"
            >
            </th>
            <ng-template ngFor let-column [ngForOf]="columnsForLevel(levelIndex)" [ngForTrackBy]="trackByIndex" let-columnIndex="index" let-last="last">
                <th *ngIf="!isColumnGroupComponent(column)"
                    kendoGridLogicalCell [logicalRowIndex]="levelIndex"
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
                    <kendo-grid-filter-menu
                        *ngIf="showFilterMenu && isFilterable(column)"
                        [column]="column"
                        [filter]="filter">
                    </kendo-grid-filter-menu>
                    <kendo-grid-column-menu *ngIf="showColumnMenu(column)"
                        [standalone]="false"
                        [settings]="columnMenu"
                        [column]="column"
                        [columnMenuTemplate]="columnMenuTemplate"
                        [sort]="sort"
                        [filter]="filter"
                        [sortable]="sortable">
                    </kendo-grid-column-menu>
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
                        <span #link class="k-link" (click)="onSortClick(column, $event, link)">
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
                        </span>
                        <span role="status"
                              class="k-sort-status"
                              style="position: absolute; left: -10000px;"
                              [innerHtml]="sortStatus(column)">
                        </span>
                    </ng-template>
                    <ng-template [ngIf]="isCheckboxColumn(column) && !column.headerTemplateRef && column.showSelectAll">
                        <input
                            class="k-checkbox"
                            [attr.id]="selectAllCheckboxId()"
                            kendoGridSelectAllCheckbox
                            kendoGridFocusable>
                        <label class="k-checkbox-label" [attr.for]="selectAllCheckboxId()"></label>
                    </ng-template>
                    <span kendoGridColumnHandle
                        kendoDraggable
                        class="k-column-resizer"
                        *ngIf="resizable"
                        [column]="column"
                        [columns]="columns">
                    </span>
                </th>
                <th *ngIf="isColumnGroupComponent(column)"
                    kendoGridLogicalCell [logicalRowIndex]="levelIndex"
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
                        <kendo-grid-column-menu *ngIf="showColumnMenu(column)"
                            [standalone]="false"
                            [settings]="columnMenu"
                            [column]="column"
                            [columnMenuTemplate]="columnMenuTemplate">
                        </kendo-grid-column-menu>
                        <ng-template
                            [templateContext]="{
                                templateRef: column.headerTemplateRef,
                                columnIndex: lockedColumnsCount + columnIndex,
                                column: column,
                                $implicit: column
                            }">
                        </ng-template>
                        <ng-template [ngIf]="!column.headerTemplateRef">{{column.displayTitle}}</ng-template>
                        <span kendoGridColumnHandle
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
            kendoGridFilterRow
                [columns]="leafColumns"
                [filter]="filter"
                [groups]="groups"
                [detailTemplate]="detailTemplate"
                [lockedColumnsCount]="lockedColumnsCount"
            kendoGridLogicalRow
                [logicalRowIndex]="totalColumnLevels + 1"
                [logicalSlaveRow]="lockedColumnsCount > 0"
                [logicalCellsCount]="columns.length"
                [logicalSlaveCellsCount]="unlockedColumnsCount"
        ></tr>
    </ng-template>
    `
            },] },
];
/** @nocollapse */
HeaderComponent.ctorParameters = () => [
    { type: SinglePopupService },
    { type: DragHintService },
    { type: DropCueService },
    { type: ColumnReorderService },
    { type: IdService },
    { type: SortService },
    { type: LocalizationService },
    { type: ChangeDetectorRef }
];
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

// TODO
// tslint:disable:rxjs-no-unsafe-takeuntil
/**
 * @hidden
 */
const fromPercentage = (value, percent) => {
    const sign = percent < 0 ? -1 : 1;
    return Math.ceil((Math.abs(percent) / 100) * value) * sign;
};
/**
 * @hidden
 */
const toPercentage = (value, whole) => (value / whole) * 100;
/**
 * @hidden
 */
const headerWidth = (handle) => handle.nativeElement.parentElement.offsetWidth;
/**
 * @hidden
 */
const allLeafColumns = columns => expandColumns(columns)
    .filter(c => !c.isColumnGroup);
/**
 * @hidden
 */
const stopPropagation = ({ originalEvent: event }) => {
    event.stopPropagation();
    event.preventDefault();
};
/**
 * @hidden
 */
const createMoveStream = (service, draggable) => mouseDown => draggable.kendoDrag.pipe(takeUntil(draggable.kendoRelease.pipe(tap(() => service.end()))), map(({ pageX }) => ({
    originalX: mouseDown.pageX,
    pageX
})));
/**
 * @hidden
 */
const preventOnDblClick$1 = release => mouseDown => of(mouseDown).pipe(delay(150), takeUntil(release));
/**
 * @hidden
 */
const isInSpanColumn$1 = column => !!(column.parent && column.parent.isSpanColumn);
/**
 * @hidden
 *
 * Calculates the column index. If the column is stated in `SpanColumn`,
 * the index for all child columns equals the index of the first child.
 */
const indexOf = (target, list) => {
    let index = 0;
    let ignore = 0;
    let skip = 0;
    while (index < list.length) {
        const current = list[index];
        const isParentSpanColumn = isInSpanColumn$1(current);
        if (current === target) {
            break;
        }
        if ((ignore-- <= 0) && isParentSpanColumn) {
            ignore = current.parent.childColumns.length - 1;
            skip += ignore;
        }
        index++;
    }
    return index - skip;
};
/**
 * @hidden
 */
class ColumnHandleDirective {
    constructor(draggable, element, service, zone, cdr, localization) {
        this.draggable = draggable;
        this.element = element;
        this.service = service;
        this.zone = zone;
        this.cdr = cdr;
        this.localization = localization;
        this.columns = [];
        this.subscriptions = new Subscription();
        this.rtl = false;
    }
    get visible() {
        return this.column.resizable ? 'block' : 'none';
    }
    get leftStyle() {
        return isTruthy(this.rtl) ? 0 : null;
    }
    get rightStyle() {
        return isTruthy(this.rtl) ? null : 0;
    }
    autoFit() {
        const allLeafs = allLeafColumns(this.columns);
        const currentLeafs = leafColumns([this.column]).filter(column => isTruthy(column.resizable));
        const columnInfo = currentLeafs.map(column => {
            const isParentSpan = isInSpanColumn$1(column);
            const isLastInSpan = isParentSpan ? column.parent.childColumns.last === column : false;
            const index = indexOf(column, allLeafs);
            return {
                column,
                headerIndex: this.columnsForLevel(column.level).indexOf(column),
                index,
                isLastInSpan,
                isParentSpan,
                level: column.level
            };
        });
        currentLeafs.forEach(column => column.width = 0);
        this.service.measureColumns(columnInfo);
    }
    ngOnInit() {
        const service = this.service.changes.pipe(filter(() => this.column.resizable), filter(e => isPresent(e.columns.find(column => column === this.column))));
        this.subscriptions.add(service.pipe(filter(e => e.type === 'start'))
            .subscribe(this.initState.bind(this)));
        this.subscriptions.add(service.pipe(filter(e => e.type === 'resizeColumn'))
            .subscribe(this.resize.bind(this)));
        this.subscriptions.add(this.service.changes.pipe(filter(e => e.type === 'start'), filter(this.shouldUpdate.bind(this)), take(1) //on first resize only
        ).subscribe(this.initColumnWidth.bind(this)));
        this.subscriptions.add(this.zone.runOutsideAngular(() => this.draggable.kendoPress.pipe(tap(stopPropagation), tap(() => this.service.start(this.column)), switchMap(preventOnDblClick$1(this.draggable.kendoRelease)), switchMap(createMoveStream(this.service, this.draggable)))
            .subscribe(({ pageX, originalX }) => {
            const delta = pageX - originalX;
            const percent = toPercentage(delta, this.column.resizeStartWidth || this.column.width);
            this.service.resizeColumns(percent);
        })));
        this.subscriptions.add(service.pipe(filter(e => e.type === 'autoFitComplete'))
            .subscribe(this.sizeToFit.bind(this)));
        this.subscriptions.add(service.pipe(filter(e => e.type === 'triggerAutoFit'))
            .subscribe(this.autoFit.bind(this)));
        this.subscriptions.add(this.localization.changes.subscribe(({ rtl }) => this.rtl = rtl));
    }
    ngOnDestroy() {
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
        }
    }
    shouldUpdate() {
        return !allLeafColumns(this.columns)
            .map(column => column.width)
            .some(isBlank);
    }
    initColumnWidth() {
        this.column.width = headerWidth(this.element);
    }
    initState() {
        this.column.resizeStartWidth = headerWidth(this.element);
        this.service.resizedColumn({
            column: this.column,
            oldWidth: this.column.resizeStartWidth
        });
    }
    resize({ deltaPercent }) {
        let delta = fromPercentage(this.column.resizeStartWidth, deltaPercent);
        if (isTruthy(this.rtl)) {
            delta *= -1;
        }
        const newWidth = Math.max(this.column.resizeStartWidth + delta, this.column.minResizableWidth);
        const tableDelta = newWidth > this.column.minResizableWidth ?
            delta : this.column.minResizableWidth - this.column.resizeStartWidth;
        this.updateWidth(this.column, newWidth);
        this.service.resizeTable(this.column, tableDelta);
    }
    sizeToFit({ columns, widths }) {
        const index = columns.indexOf(this.column);
        const width = Math.max(...widths.map(w => w[index])) + 1; //add 1px for IE
        const tableDelta = width - this.column.resizeStartWidth;
        this.updateWidth(this.column, width);
        this.service.resizeTable(this.column, tableDelta);
    }
    updateWidth(column, width) {
        column.width = width;
        this.cdr.markForCheck(); //force CD cycle
    }
    columnsForLevel(level) {
        return columnsToRender(this.columns ? this.columns.filter(column => column.level === level) : []);
    }
}
ColumnHandleDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoGridColumnHandle]'
            },] },
];
/** @nocollapse */
ColumnHandleDirective.ctorParameters = () => [
    { type: DraggableDirective, decorators: [{ type: Host }] },
    { type: ElementRef },
    { type: ColumnResizingService },
    { type: NgZone },
    { type: ChangeDetectorRef },
    { type: LocalizationService }
];
ColumnHandleDirective.propDecorators = {
    columns: [{ type: Input }],
    column: [{ type: Input }],
    visible: [{ type: HostBinding, args: ['style.display',] }],
    leftStyle: [{ type: HostBinding, args: ['style.left',] }],
    rightStyle: [{ type: HostBinding, args: ['style.right',] }],
    autoFit: [{ type: HostListener, args: ['dblclick',] }]
};

/**
 * Represents the select-all checkbox feature of the Grid ([see example]({% slug selection_grid %}#toc-select-all-feature)).
 */
class SelectAllCheckboxDirective {
    constructor(selectionService, el, renderer, ngZone) {
        this.selectionService = selectionService;
        this.el = el;
        this.renderer = renderer;
        this.ngZone = ngZone;
        /**
         * Fires when the user clicks the `kendoGridSelectAllCheckbox` select-all checkbox
         * ([see example]({% slug selection_grid %}#toc-select-all-feature)).
         */
        this.selectAllChange = new EventEmitter();
        this.type = "checkbox";
        this.stateSet = false;
        this.ngZone.runOutsideAngular(() => {
            this.destroyClick = this.renderer.listen(this.el.nativeElement, "click", this.onClick.bind(this));
        });
    }
    ngAfterContentChecked() {
        this.setState();
    }
    ngOnChanges() {
        this.stateSet = true;
    }
    ngOnDestroy() {
        if (this.destroyClick) {
            this.destroyClick();
        }
    }
    /**
     * @hidden
     */
    onClick() {
        // yields consistent cross-browser behavior when clicking an "indeterminate" checkbox
        const undefinedCheckedStateInIE = detectIE() && this.selectionService.selectAllState === undefined;
        const isChecked = undefinedCheckedStateInIE ? true : this.el.nativeElement.checked;
        const options = this.selectionService.options;
        this.selectAllChange.emit(isChecked ? "checked" : "unchecked");
        if (options.enabled && options.mode === "multiple") {
            this.ngZone.run(() => {
                this.selectionService.updateAll(isChecked);
            });
        }
    }
    /**
     * @hidden
     */
    setState() {
        const state$$1 = this.stateSet ? this.stateToBool() : this.selectionService.selectAllState;
        const elem = this.el.nativeElement;
        this.renderer.setProperty(elem, "indeterminate", !isPresent(state$$1));
        this.renderer.setProperty(elem, "checked", isPresent(state$$1) ? state$$1 : false);
    }
    /**
     * @hidden
     */
    stateToBool() {
        switch (this.state) {
            case "checked":
                return true;
            case "unchecked":
                return false;
            default:
                return undefined;
        }
    }
}
SelectAllCheckboxDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoGridSelectAllCheckbox]'
            },] },
];
/** @nocollapse */
SelectAllCheckboxDirective.ctorParameters = () => [
    { type: SelectionService },
    { type: ElementRef },
    { type: Renderer2 },
    { type: NgZone }
];
SelectAllCheckboxDirective.propDecorators = {
    state: [{ type: Input }],
    selectAllChange: [{ type: Output }],
    type: [{ type: HostBinding, args: ['attr.type',] }]
};

/**
 * @hidden
 */
class FilterMenuComponent {
    constructor(filterService, popupService, localization) {
        this.filterService = filterService;
        this.popupService = popupService;
        this.localization = localization;
        /**
         * @hidden
         */
        this.filterLabel = this.localization.get('filter');
    }
    get hasFilters() {
        return filtersByField(this.filter, (this.column || {}).field).length > 0;
    }
    toggle(anchor, template) {
        this.popupRef = this.popupService.open(anchor, template, this.popupRef);
        return false;
    }
    close() {
        this.popupService.destroy();
    }
}
FilterMenuComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-grid-filter-menu',
                template: `
        <a #anchor
            [ngClass]="{'k-grid-filter':true, 'k-state-active': hasFilters}"
            (click)="toggle(anchor, template)"
            href="#"
            [attr.title]="filterLabel">
            <span class="k-icon k-i-filter"></span>
        </a>
        <ng-template #template>
            <kendo-grid-filter-menu-container
                [column]="column"
                [filter]="filter"
                (close)="close()"
                >
            </kendo-grid-filter-menu-container>
        </ng-template>
    `
            },] },
];
/** @nocollapse */
FilterMenuComponent.ctorParameters = () => [
    { type: FilterService },
    { type: SinglePopupService },
    { type: LocalizationService }
];
FilterMenuComponent.propDecorators = {
    column: [{ type: Input }],
    filter: [{ type: Input }]
};

const isNoValueOperator = operator => (operator === "isnull"
    || operator === "isnotnull"
    || operator === "isempty"
    || operator === "isnotempty");
const validFilters = ({ value, operator }) => !isNullOrEmptyString(value) || isNoValueOperator(operator);
const trimFilters = filter$$1 => {
    filter$$1.filters = filter$$1.filters.filter(validFilters);
    return filter$$1;
};
const findParent = (filters, field, parent) => {
    return filters.reduce((acc, filter$$1) => {
        if (acc) {
            return acc;
        }
        if (filter$$1.filters) {
            return findParent(filter$$1.filters, field, filter$$1);
        }
        else if (filter$$1.field === field) {
            return parent;
        }
        return acc;
    }, undefined); // tslint:disable-line:align
};
const parentLogicOfDefault = (filter$$1, field, def = "and") => {
    const parent = findParent(((filter$$1 || {}).filters || []), field);
    return isPresent(parent) ? parent.logic : def;
};
/**
 * @hidden
 */
class FilterMenuContainerComponent {
    constructor(parentService, childService, localization, cd) {
        this.parentService = parentService;
        this.childService = childService;
        this.localization = localization;
        this.cd = cd;
        this.close = new EventEmitter();
        /**
         * @hidden
         */
        this.actionsClass = 'k-action-buttons k-button-group';
        this._templateContext = {};
    }
    get filter() {
        return this._filter;
    }
    /**
     * The current root filter.
     * @type {CompositeFilterDescriptor}
     */
    set filter(value) {
        this._filter = cloneFilters(value);
    }
    get childFilter() {
        if (!isPresent(this._childFilter)) {
            this._childFilter = {
                filters: filtersByField(this.filter, (this.column || {}).field),
                logic: parentLogicOfDefault(this.filter, (this.column || {}).field)
            };
        }
        return this._childFilter;
    }
    ngOnInit() {
        this.subscription = this.childService.changes.subscribe(filter$$1 => this._childFilter = filter$$1);
        this.subscription.add(this.localization.changes.subscribe(() => this.cd.markForCheck()));
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    get disabled() {
        return !this.childFilter.filters.some(validFilters);
    }
    get templateContext() {
        this._templateContext.column = this.column;
        this._templateContext.filter = this.childFilter;
        this._templateContext.filterService = this.childService;
        // tslint:disable-next-line:no-string-literal
        this._templateContext["$implicit"] = this.childFilter;
        return this._templateContext;
    }
    get hasTemplate() {
        return isPresent(this.column) && isPresent(this.column.filterMenuTemplateRef);
    }
    submit() {
        const filter$$1 = trimFilters(this.childFilter);
        if (filter$$1.filters.length) {
            const root = this.filter || {
                filters: [],
                logic: "and"
            };
            removeFilter(root, this.column.field);
            root.filters.push(filter$$1);
            this.parentService.filter(root);
        }
        this.close.emit();
        return false;
    }
    reset() {
        const root = this.filter || {
            filters: [],
            logic: "and"
        };
        removeFilter(root, this.column.field);
        this.parentService.filter(root);
        this.close.emit();
    }
    get clearText() {
        return this.localization.get("filterClearButton");
    }
    get filterText() {
        return this.localization.get("filterFilterButton");
    }
}
FilterMenuContainerComponent.decorators = [
    { type: Component, args: [{
                providers: [FilterService],
                selector: 'kendo-grid-filter-menu-container',
                template: `
        <form (submit)="submit()" (reset)="reset()"
            class="k-filter-menu k-group k-reset k-state-border-up">
            <div class="k-filter-menu-container">
                <ng-container [ngSwitch]="hasTemplate">
                    <ng-container *ngSwitchCase="false">
                        <ng-container
                            kendoFilterMenuHost
                            [filterService]="childService"
                            [column]="column"
                            [filter]="childFilter">
                        </ng-container>
                    </ng-container>
                    <ng-container *ngSwitchCase="true">
                        <ng-template
                            *ngIf="column.filterMenuTemplateRef"
                            [ngTemplateOutlet]="column.filterMenuTemplateRef"
                            [ngTemplateOutletContext]="templateContext"
                            >
                        </ng-template>
                    </ng-container>
                </ng-container>
                <div [ngClass]="actionsClass">
                    <button type="reset" class="k-button">{{clearText}}</button>
                    <button type="submit" class="k-button k-primary" [disabled]="disabled">{{filterText}}</button>
                </div>
            </div>
        </form>
    `
            },] },
];
/** @nocollapse */
FilterMenuContainerComponent.ctorParameters = () => [
    { type: FilterService, decorators: [{ type: SkipSelf }] },
    { type: FilterService },
    { type: LocalizationService },
    { type: ChangeDetectorRef }
];
FilterMenuContainerComponent.propDecorators = {
    close: [{ type: Output }],
    column: [{ type: Input }],
    filter: [{ type: Input }],
    actionsClass: [{ type: Input }]
};

/**
 * @hidden
 */
class FilterMenuInputWrapperComponent extends FilterInputWrapperComponent {
    constructor() {
        super(null);
    }
    /**
     * @hidden
     */
    get hostClasses() {
        return false;
    }
    operatorChange(dataItem) {
        this.currentOperator = dataItem;
    }
    filterChange(filter$$1) {
        this.applyFilter(filter$$1);
    }
    /**
     * The current filter for the associated column field.
     * @readonly
     * @type {FilterDescriptor}
     */
    get currentFilter() {
        return this._currentFilter;
    }
    /**
     * The current filter for the associated column field.
     * @readonly
     * @type {FilterDescriptor}
     */
    set currentFilter(value) {
        this._currentFilter = value;
    }
    updateFilter(filter$$1) {
        Object.assign(this.currentFilter, filter$$1);
        return this.filter;
    }
    onChange(value) {
        this.filterChange(this.updateFilter({
            field: this.column.field,
            operator: this.currentOperator,
            value: value
        }));
    }
}
FilterMenuInputWrapperComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-grid-filter-menu-input-wrapper',
                template: `
        <kendo-dropdownlist
            [data]="operators"
            (valueChange)="operatorChange($event)"
            [value]="currentOperator"
            [valuePrimitive]="true"
            textField="text"
            valueField="value">
        </kendo-dropdownlist>
        <ng-content></ng-content>
    `
            },] },
];
/** @nocollapse */
FilterMenuInputWrapperComponent.ctorParameters = () => [];
FilterMenuInputWrapperComponent.propDecorators = {
    filterService: [{ type: Input }],
    currentFilter: [{ type: Input }]
};

/**
 * @hidden
 */
class StringFilterMenuInputComponent {
    constructor() {
        this.operators = [];
    }
}
StringFilterMenuInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-grid-string-filter-menu-input',
                template: `
        <kendo-grid-filter-menu-input-wrapper
            [column]="column"
            [filter]="filter"
            [operators]="operators"
            [defaultOperator]="operator"
            [currentFilter]="currentFilter"
            [filterService]="filterService"
            >
            <input class="k-textbox" kendoFilterInput [filterDelay]="0" [ngModel]="currentFilter?.value" />
        </kendo-grid-filter-menu-input-wrapper>
    `
            },] },
];
StringFilterMenuInputComponent.propDecorators = {
    operators: [{ type: Input }],
    column: [{ type: Input }],
    filter: [{ type: Input }],
    operator: [{ type: Input }],
    currentFilter: [{ type: Input }],
    filterService: [{ type: Input }]
};

/**
 * Represents a string-filter menu component.
 * ([see example]({% slug builtinfiltertemplate_grid %}#toc-configuration-components-for-filter-templates)).
 */
class StringFilterMenuComponent extends StringFilterComponent {
    constructor(localization) {
        super(null, localization);
        this.logicOperators = logicOperators(this.localization);
        /**
         * The current menu filter.
         * @type {CompositeFilterDescriptor}
         */
        this.filter = { filters: [], logic: "and" };
        /**
         * Determines if the inputs of second criteria will displayed.
         */
        this.extra = true;
    }
    /**
     * @hidden
     */
    get hostClasses() {
        return false;
    }
    get firstFilter() {
        return setFilter(0, this.filter, (this.column || {}).field, this.operator);
    }
    get secondFilter() {
        return setFilter(1, this.filter, (this.column || {}).field, this.operator);
    }
    logicChange(value) {
        this.filter.logic = value;
    }
    localizationChange() {
        this.logicOperators = logicOperators(this.localization);
        super.localizationChange();
    }
}
StringFilterMenuComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-grid-string-filter-menu',
                template: `
        <kendo-grid-string-filter-menu-input
            [currentFilter]="firstFilter"
            [operators]="operators"
            [filterService]="filterService"
            [column]="column"
            [filter]="filter">
        </kendo-grid-string-filter-menu-input>
        <kendo-dropdownlist
            *ngIf="extra"
            class="k-filter-and"
            [data]="logicOperators"
            [valuePrimitive]="true" (valueChange)="logicChange($event)"
            [value]="filter?.logic"
            textField="text"
            valueField="value">
        </kendo-dropdownlist>
        <kendo-grid-string-filter-menu-input
            *ngIf="extra"
            [operators]="operators"
            [currentFilter]="secondFilter"
            [filterService]="filterService"
            [column]="column"
            [filter]="filter">
        </kendo-grid-string-filter-menu-input>
    `
            },] },
];
/** @nocollapse */
StringFilterMenuComponent.ctorParameters = () => [
    { type: LocalizationService }
];
StringFilterMenuComponent.propDecorators = {
    hostClasses: [{ type: HostBinding, args: ['class.k-filtercell',] }],
    column: [{ type: Input }],
    filter: [{ type: Input }],
    extra: [{ type: Input }],
    filterService: [{ type: Input }]
};

/**
 * Represents a numeric-filter menu component.
 *
 * @example
 *  ```html-no-run
 *      <kendo-grid-column field="UnitPrice" title="Unit Price">
 *          <ng-template kendoGridFilterMenuTemplate let-filter let-column="column" let-filterService="filterService">
 *          <kendo-grid-numeric-filter-menu
 *              [column]="column"
 *              [filter]="filter"
 *              [filterService]="filterService"
 *              >
 *          </kendo-grid-numeric-filter-menu>
 *          </ng-template>
 *      </kendo-grid-column>
 *   ```
 */
class NumericFilterMenuComponent extends NumericFilterComponent {
    constructor(localization) {
        super(null, localization);
        this.logicOperators = logicOperators(this.localization);
        /**
         * The current menu filter.
         * @type {CompositeFilterDescriptor}
         */
        this.filter = { filters: [], logic: "and" };
        /**
         * Determines if the inputs of second criteria will displayed.
         */
        this.extra = true;
    }
    /**
     * @hidden
     */
    get hostClasses() {
        return false;
    }
    get firstFilter() {
        return setFilter(0, this.filter, (this.column || {}).field, this.operator);
    }
    get secondFilter() {
        return setFilter(1, this.filter, (this.column || {}).field, this.operator);
    }
    logicChange(value) {
        this.filter.logic = value;
    }
    localizationChange() {
        this.logicOperators = logicOperators(this.localization);
        super.localizationChange();
    }
}
NumericFilterMenuComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-grid-numeric-filter-menu',
                template: `
        <kendo-grid-numeric-filter-menu-input
            [currentFilter]="firstFilter"
            [operators]="operators"
            [filterService]="filterService"
            [column]="column"
            [filter]="filter"
            [format]="format"
            [decimals]="decimals"
            [spinners]="spinners"
            [min]="min"
            [max]="max"
            [step]="step"
            >
        </kendo-grid-numeric-filter-menu-input>
        <kendo-dropdownlist
            *ngIf="extra"
            class="k-filter-and"
            [data]="logicOperators"
            [valuePrimitive]="true"
            (valueChange)="logicChange($event)"
            [value]="filter?.logic"
            textField="text"
            valueField="value">
        </kendo-dropdownlist>
        <kendo-grid-numeric-filter-menu-input
            *ngIf="extra"
            [operators]="operators"
            [currentFilter]="secondFilter"
            [filterService]="filterService"
            [column]="column"
            [filter]="filter"
            [format]="format"
            [decimals]="decimals"
            [spinners]="spinners"
            [min]="min"
            [max]="max"
            [step]="step"
            >
        </kendo-grid-numeric-filter-menu-input>
    `
            },] },
];
/** @nocollapse */
NumericFilterMenuComponent.ctorParameters = () => [
    { type: LocalizationService }
];
NumericFilterMenuComponent.propDecorators = {
    hostClasses: [{ type: HostBinding, args: ['class.k-filtercell',] }],
    column: [{ type: Input }],
    filter: [{ type: Input }],
    extra: [{ type: Input }],
    filterService: [{ type: Input }]
};

/**
 * @hidden
 */
class NumericFilterMenuInputComponent {
    constructor(localization) {
        this.localization = localization;
        this.operators = [];
        /**
         * Specifies the value which is used to increment or decrement the component value.
         * @type {numeric}
         */
        this.step = 1;
        /**
         * Specifies whether the **Up** and **Down** spin buttons will be rendered.
         * @type {boolean}
         */
        this.spinners = true;
    }
    messageFor(key) {
        return this.localization.get(key);
    }
}
NumericFilterMenuInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-grid-numeric-filter-menu-input',
                template: `
        <kendo-grid-filter-menu-input-wrapper
            [column]="column"
            [filter]="filter"
            [operators]="operators"
            [defaultOperator]="operator"
            [currentFilter]="currentFilter"
            [filterService]="filterService"
        >
            <kendo-numerictextbox
                kendoFilterInput
                [filterDelay]="0"
                [autoCorrect]="true"
                [value]="currentFilter?.value"
                [format]="format"
                [decimals]="decimals"
                [spinners]="spinners"
                [min]="min"
                [max]="max"
                [step]="step"
            >
                <kendo-numerictextbox-messages
                    [increment]="messageFor('filterNumericIncrement')"
                    [decrement]="messageFor('filterNumericDecrement')"
                >
                </kendo-numerictextbox-messages>
            </kendo-numerictextbox>
        </kendo-grid-filter-menu-input-wrapper>
    `
            },] },
];
/** @nocollapse */
NumericFilterMenuInputComponent.ctorParameters = () => [
    { type: LocalizationService }
];
NumericFilterMenuInputComponent.propDecorators = {
    operators: [{ type: Input }],
    column: [{ type: Input }],
    filter: [{ type: Input }],
    operator: [{ type: Input }],
    currentFilter: [{ type: Input }],
    filterService: [{ type: Input }],
    step: [{ type: Input }],
    min: [{ type: Input }],
    max: [{ type: Input }],
    spinners: [{ type: Input }],
    decimals: [{ type: Input }],
    format: [{ type: Input }]
};

/**
 * Represents a date-filter menu component.
 *
 * @example
 *  ```html-no-run
 *      <kendo-grid-column field="OrderDate" title="Order Date">
 *          <ng-template kendoGridFilterMenuTemplate let-filter let-column="column" let-filterService="filterService">
 *            <kendo-grid-date-filter-menu
 *                [column]="column"
 *                [filter]="filter"
 *                [filterService]="filterService"
 *                >
 *            </kendo-grid-date-filter-menu>
 *          </ng-template>
 *      </kendo-grid-column>
 *   ```
 */
class DateFilterMenuComponent extends DateFilterComponent {
    constructor(localization) {
        super(null, localization);
        this.logicOperators = logicOperators(this.localization);
        /**
         * The current menu filter.
         * @type {CompositeFilterDescriptor}
         */
        this.filter = { filters: [], logic: "and" };
        /**
         * Determines if the inputs of second criteria will be displayed.
         */
        this.extra = true;
    }
    /**
     * @hidden
     */
    get hostClasses() {
        return false;
    }
    get firstFilter() {
        return setFilter(0, this.filter, (this.column || {}).field, this.operator);
    }
    get secondFilter() {
        return setFilter(1, this.filter, (this.column || {}).field, this.operator);
    }
    logicChange(value) {
        this.filter.logic = value;
    }
    localizationChange() {
        this.logicOperators = logicOperators(this.localization);
        super.localizationChange();
    }
}
DateFilterMenuComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-grid-date-filter-menu',
                template: `
        <kendo-grid-date-filter-menu-input
            [currentFilter]="firstFilter"
            [operators]="operators"
            [filterService]="filterService"
            [column]="column"
            [filter]="filter"
            [activeView]="activeView"
            [bottomView]="bottomView"
            [topView]="topView"
            [format]="format"
            [formatPlaceholder]="formatPlaceholder"
            [placeholder]="placeholder"
            [min]="min"
            [max]="max"
            [weekNumber]="weekNumber"
            >
        </kendo-grid-date-filter-menu-input>
        <kendo-dropdownlist
            *ngIf="extra"
            class="k-filter-and"
            [data]="logicOperators"
            [valuePrimitive]="true"
            (valueChange)="logicChange($event)"
            [value]="filter?.logic"
            textField="text"
            valueField="value">
        </kendo-dropdownlist>
        <kendo-grid-date-filter-menu-input
            *ngIf="extra"
            [operators]="operators"
            [currentFilter]="secondFilter"
            [filterService]="filterService"
            [column]="column"
            [filter]="filter"
            [activeView]="activeView"
            [bottomView]="bottomView"
            [topView]="topView"
            [format]="format"
            [formatPlaceholder]="formatPlaceholder"
            [placeholder]="placeholder"
            [min]="min"
            [max]="max"
            [weekNumber]="weekNumber"
            >
        </kendo-grid-date-filter-menu-input>
    `
            },] },
];
/** @nocollapse */
DateFilterMenuComponent.ctorParameters = () => [
    { type: LocalizationService }
];
DateFilterMenuComponent.propDecorators = {
    hostClasses: [{ type: HostBinding, args: ['class.k-filtercell',] }],
    column: [{ type: Input }],
    filter: [{ type: Input }],
    extra: [{ type: Input }],
    filterService: [{ type: Input }]
};

/**
 * Represents a Boolean-filter menu component.
 *
 * @example
 *  ```html-no-run
 *      <kendo-grid-column field="Discontinued" title="Discontinued">
 *          <ng-template kendoGridFilterMenuTemplate let-filter let-column="column" let-filterService="filterService">
 *            <kendo-grid-boolean-filter-menu
 *                [column]="column"
 *                [filter]="filter"
 *                [filterService]="filterService"
 *                >
 *            </kendo-grid-boolean-filter-menu>
 *          </ng-template>
 *      </kendo-grid-column>
 *   ```
 */
class BooleanFilterMenuComponent extends BooleanFilterComponent {
    constructor(localization) {
        super(null, localization);
        /**
         * The current menu filter.
         * @type {CompositeFilterDescriptor}
         */
        this.filter = { filters: [], logic: "and" };
        this.idPrefix = guid();
    }
    /**
     * @hidden
     */
    get hostClasses() {
        return false;
    }
    /**
     * @hidden
     */
    radioId(value) {
        return `${this.idPrefix}_${value}`;
    }
    /**
     * @hidden
     */
    onChange(value) {
        this.applyFilter(this.updateFilter({
            field: this.column.field,
            operator: "eq",
            value: value
        }));
    }
    /**
     * @hidden
     */
    isSelected(radioValue) {
        return this.filtersByField(this.column.field).some(({ value }) => value === radioValue);
    }
}
BooleanFilterMenuComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-grid-boolean-filter-menu',
                template: `
        <ul class="k-radio-list k-reset">
            <li *ngFor="let item of items">
                <input type="radio"
                    [name]="idPrefix"
                    class="k-radio"
                    [checked]="isSelected(item.value)"
                    [attr.id]="radioId(item.value)"
                    (change)="onChange(item.value)"
                />
                <label class="k-radio-label" [attr.for]="radioId(item.value)">{{item.text}}</label>
            </li>
        </ul>
    `
            },] },
];
/** @nocollapse */
BooleanFilterMenuComponent.ctorParameters = () => [
    { type: LocalizationService }
];
BooleanFilterMenuComponent.propDecorators = {
    hostClasses: [{ type: HostBinding, args: ['class.k-filtercell',] }],
    filter: [{ type: Input }],
    filterService: [{ type: Input }]
};

/**
 * @hidden
 *
 * > List the following components as `entryComponents` in the GridModule.
 */
const filterMenuComponentFactory = (type) => ({
    "boolean": BooleanFilterMenuComponent,
    "date": DateFilterMenuComponent,
    "numeric": NumericFilterMenuComponent,
    "text": StringFilterMenuComponent
}[type]);

/**
 * @hidden
 */
class FilterMenuHostDirective extends FilterHostDirective {
    constructor(host, resolver) {
        super(host, resolver);
    }
    componentType() {
        if (isPresent(this.column) && !isNullOrEmptyString(this.column.filter)) {
            return filterMenuComponentFactory(this.column.filter);
        }
        return StringFilterMenuComponent;
    }
    initComponent(ctx) {
        super.initComponent(ctx);
        this.component.instance.filterService = this.filterService;
    }
}
FilterMenuHostDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoFilterMenuHost]'
            },] },
];
/** @nocollapse */
FilterMenuHostDirective.ctorParameters = () => [
    { type: ViewContainerRef },
    { type: ComponentFactoryResolver }
];
FilterMenuHostDirective.propDecorators = {
    filterService: [{ type: Input }]
};

/**
 * @hidden
 */
class DateFilterMenuInputComponent {
    constructor(popupService, localizationService) {
        this.popupService = popupService;
        this.localizationService = localizationService;
        this.operators = [];
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    open(picker) {
        this.subscription = this.popupService.onClose
            .pipe(filter(() => picker.isActive))
            .subscribe(e => e.preventDefault());
    }
    messageFor(key) {
        return this.localizationService.get(key);
    }
}
DateFilterMenuInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-grid-date-filter-menu-input',
                template: `
        <kendo-grid-filter-menu-input-wrapper
            [column]="column"
            [filter]="filter"
            [operators]="operators"
            [defaultOperator]="operator"
            [currentFilter]="currentFilter"
            [filterService]="filterService"
        >
            <kendo-datepicker
                #picker
                kendoFilterInput
                [filterDelay]="0"
                (open)="open(picker)"
                [value]="currentFilter?.value"
                [placeholder]="placeholder"
                [formatPlaceholder]="formatPlaceholder"
                [format]="format"
                [min]="min"
                [max]="max"
                [activeView]="activeView"
                [bottomView]="bottomView"
                [topView]="topView"
                [weekNumber]="weekNumber"
            >
                <kendo-datepicker-messages
                    [toggle]="messageFor('filterDateToggle')"
                    [today]="messageFor('filterDateToday')"
                >
                </kendo-datepicker-messages>
            </kendo-datepicker>
        </kendo-grid-filter-menu-input-wrapper>
    `
            },] },
];
/** @nocollapse */
DateFilterMenuInputComponent.ctorParameters = () => [
    { type: SinglePopupService },
    { type: LocalizationService }
];
DateFilterMenuInputComponent.propDecorators = {
    operators: [{ type: Input }],
    column: [{ type: Input }],
    filter: [{ type: Input }],
    operator: [{ type: Input }],
    currentFilter: [{ type: Input }],
    filterService: [{ type: Input }],
    format: [{ type: Input }],
    formatPlaceholder: [{ type: Input }],
    placeholder: [{ type: Input }],
    min: [{ type: Input }],
    max: [{ type: Input }],
    activeView: [{ type: Input }],
    bottomView: [{ type: Input }],
    topView: [{ type: Input }],
    weekNumber: [{ type: Input }]
};

const INTERNAL_COMPONENTS$2 = [
    FilterMenuComponent,
    FilterMenuContainerComponent,
    FilterMenuInputWrapperComponent,
    StringFilterMenuInputComponent,
    StringFilterMenuComponent,
    FilterMenuTemplateDirective,
    NumericFilterMenuComponent,
    NumericFilterMenuInputComponent,
    DateFilterMenuInputComponent,
    DateFilterMenuComponent,
    FilterMenuHostDirective,
    BooleanFilterMenuComponent
];
const ENTRY_COMPONENTS$1 = [
    StringFilterMenuComponent,
    NumericFilterMenuComponent,
    DateFilterMenuComponent,
    BooleanFilterMenuComponent
];
/**
 * @hidden
 */
class FilterMenuModule {
    static exports() {
        return [
            StringFilterMenuComponent,
            FilterMenuTemplateDirective,
            NumericFilterMenuComponent,
            DateFilterMenuComponent,
            BooleanFilterMenuComponent,
            SharedFilterModule.exports()
        ];
    }
}
FilterMenuModule.decorators = [
    { type: NgModule, args: [{
                declarations: [INTERNAL_COMPONENTS$2],
                entryComponents: ENTRY_COMPONENTS$1,
                exports: [INTERNAL_COMPONENTS$2, SharedFilterModule],
                imports: [SharedFilterModule]
            },] },
];

/**
 * @hidden
 */
class ColumnListComponent {
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
                selector: 'kendo-grid-columnlist',
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

/**
 * Represents the component for selecting columns in the Grid. To enable the user to show or hide columns,
 * add the component inside a [`ToolbarTemplate`]({% slug api_grid_toolbartemplatedirective %}) directive.
 *
 * @example
 * {% meta height:300 %}
 * ```ts-preview
 *
 * _@Component({
 *     selector: 'my-app',
 *     template: `
 *       <kendo-grid [data]="data">
 *          <ng-template kendoGridToolbarTemplate>
 *             <kendo-grid-column-chooser></kendo-grid-column-chooser>
 *          </ng-template>
 *          <kendo-grid-column field="Field1"></kendo-grid-column>
 *          <kendo-grid-column field="Field2" [hidden]="true"></kendo-grid-column>
 *       </kendo-grid>
 *     `
 * })
 *
 * class AppComponent {
 *   public data: any[] = [{ Field1: 'Foo', Field2: 'Bar' }];
 * }
 *
 * ```
 * {% endmeta %}
 */
class ColumnChooserComponent {
    constructor(localization, columnInfoService, popupService, ngZone, renderer, changeDetector) {
        this.localization = localization;
        this.columnInfoService = columnInfoService;
        this.popupService = popupService;
        this.ngZone = ngZone;
        this.renderer = renderer;
        this.changeDetector = changeDetector;
        /**
         * Specifies if the changes in the visibility of the column will be immediately applied.
         */
        this.autoSync = false;
        /**
         * Specifies if all columns can be hidden.
         */
        this.allowHideAll = true;
    }
    get columns() {
        return this.columnInfoService.leafNamedColumns;
    }
    ngOnDestroy() {
        this.close();
    }
    /**
     * @hidden
     */
    toggle(anchor, template) {
        if (!this.popupRef) {
            const direction = this.localization.rtl ? 'right' : 'left';
            this.popupRef = this.popupService.open({
                anchor: anchor,
                content: template,
                positionMode: 'absolute',
                anchorAlign: { vertical: 'bottom', horizontal: direction },
                popupAlign: { vertical: 'top', horizontal: direction }
            });
            this.renderer.setAttribute(this.popupRef.popupElement, 'dir', this.localization.rtl ? 'rtl' : 'ltr');
            this.ngZone.runOutsideAngular(() => this.closeClick = this.renderer.listen("document", "click", ({ target }) => {
                if (!closest(target, node => node === this.popupRef.popupElement || node === anchor)) {
                    this.close();
                }
            }));
        }
        else {
            this.close();
        }
    }
    /**
     * @hidden
     */
    onApply(changed) {
        this.close();
        if (changed.length) {
            this.changeDetector.markForCheck();
            this.columnInfoService.changeVisibility(changed);
        }
    }
    /**
     * @hidden
     */
    onChange(changed) {
        this.changeDetector.markForCheck();
        this.columnInfoService.changeVisibility(changed);
    }
    close() {
        if (this.popupRef) {
            this.popupRef.close();
            this.popupRef = null;
        }
        this.detachClose();
    }
    detachClose() {
        if (this.closeClick) {
            this.closeClick();
            this.closeClick = null;
        }
    }
}
ColumnChooserComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-grid-column-chooser',
                template: `
        <button #anchor
            type="button"
            (click)="toggle(anchor, template)"
            class="k-button k-bare k-button-icon"
            [attr.title]="localization.get('columns')">
            <span class="k-icon k-i-columns"></span>
        </button>
        <ng-template #template>
            <span class='k-column-chooser-title'>{{ localization.get('columns') }}</span>
            <kendo-grid-columnlist
                [columns]="columns"
                [applyText]="localization.get('columnsApply')"
                [resetText]="localization.get('columnsReset')"
                [autoSync]="autoSync"
                [allowHideAll]="allowHideAll"
                (apply)="onApply($event)"
                (columnChange)="onChange($event)">
            </kendo-grid-columnlist>
        </ng-template>
    `
            },] },
];
/** @nocollapse */
ColumnChooserComponent.ctorParameters = () => [
    { type: LocalizationService },
    { type: ColumnInfoService },
    { type: PopupService },
    { type: NgZone },
    { type: Renderer2 },
    { type: ChangeDetectorRef }
];
ColumnChooserComponent.propDecorators = {
    autoSync: [{ type: Input }],
    allowHideAll: [{ type: Input }]
};

/**
 * Represents the service that is passed to the
 * [`ColumnMenuTemplate`]({% slug api_grid_columnmenutemplatedirective %}) directive.
 *
 * @example
 * ```ts-preview
 *
 * _@Component({
 *     selector: 'my-app',
 *     template: `
 *       <kendo-grid [data]="data" [columnMenu]="true">
 *          <ng-template kendoGridColumnMenuTemplate let-service="service">
 *              <span class="k-icon k-i-close" (click)="service.close()"
 *                  style="position: absolute; right: 5px; top: 5px;cursor: pointer;"></span>
 *              <kendo-grid-columnmenu-sort [service]="service">
 *              </kendo-grid-columnmenu-sort>
 *          </ng-template>
 *          <kendo-grid-column field="Field1"></kendo-grid-column>
 *          <kendo-grid-column field="Field2"></kendo-grid-column>
 *       </kendo-grid>
 *     `
 * })
 *
 * class AppComponent {
 *   public data: any[] = [{ Field1: 'Foo', Field2: 'Bar' }];
 * }
 *
 * ```
 */
class ColumnMenuService {
    constructor() {
        /**
         * @hidden
         */
        this.closeMenu = new EventEmitter();
    }
    /**
     * Closes the column menu.
     */
    close() {
        this.closeMenu.emit();
    }
}
ColumnMenuService.decorators = [
    { type: Injectable },
];

/**
 * @hidden
 */
class ColumnMenuItemBase {
    constructor() {
        this.hostClass = true;
    }
    ngOnInit() {
        if (isDevMode() && !this.service) {
            throw new Error('The service input of the predefined column menu components is mandatory.');
        }
    }
    /**
     * @hidden
     */
    close() {
        this.service.close();
    }
}
ColumnMenuItemBase.propDecorators = {
    service: [{ type: Input }],
    hostClass: [{ type: HostBinding, args: ['class.k-columnmenu-item-wrapper',] }]
};

/* tslint:disable:max-line-length */
/**
 * Represents the component for selecting columns in the Grid that can be placed
 * inside a [`ColumnMenuTemplate`]({% slug api_grid_columnmenutemplatedirective %}) directive.
 *
 * > You have to set the [ColumnMenuService]({% slug api_grid_columnmenuservice %}) that is passed by
 * > the template to the service input of the `kendo-grid-columnmenu-chooser` component.
 *
 * @example
 * {% meta height:300 %}
 * ```ts-preview
 *
 * _@Component({
 *     selector: 'my-app',
 *     template: `
 *       <kendo-grid [data]="data" [columnMenu]="true">
 *          <ng-template kendoGridColumnMenuTemplate let-service="service">
 *              <kendo-grid-columnmenu-chooser [service]="service">
 *              </kendo-grid-columnmenu-chooser>
 *          </ng-template>
 *          <kendo-grid-column field="Field1"></kendo-grid-column>
 *          <kendo-grid-column field="Field2" [hidden]="true"></kendo-grid-column>
 *       </kendo-grid>
 *     `
 * })
 *
 * class AppComponent {
 *   public data: any[] = [{ Field1: 'Foo', Field2: 'Bar' }];
 * }
 *
 * ```
 * {% endmeta %}
 */
class ColumnMenuChooserComponent extends ColumnMenuItemBase {
    constructor(localization, columnInfoService, changeDetector) {
        super();
        this.localization = localization;
        this.columnInfoService = columnInfoService;
        this.changeDetector = changeDetector;
        /**
         * Fires when the content is expanded.
         */
        this.expand = new EventEmitter();
        /**
         * Fires when the content is collapsed.
         */
        this.collapse = new EventEmitter();
        /**
         * Specifies if the content is expanded.
         */
        this.expanded = false;
        /**
         * @hidden
         */
        this.actionsClass = 'k-columnmenu-actions';
    }
    get columns() {
        return this.columnInfoService.leafNamedColumns;
    }
    /**
     * @hidden
     */
    onApply(changed) {
        this.close();
        if (changed.length) {
            this.changeDetector.markForCheck();
            this.columnInfoService.changeVisibility(changed);
        }
    }
}
ColumnMenuChooserComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-grid-columnmenu-chooser',
                template: `
        <kendo-grid-columnmenu-item [text]="localization.get('columns')"
            icon="columns" [expanded]="expanded" (collapse)="collapse.emit()" (expand)="expand.emit()">
            <ng-template kendoGridColumnMenuItemContentTemplate>
                <kendo-grid-columnlist
                    [applyText]="localization.get('columnsApply')"
                    [resetText]="localization.get('columnsReset')"
                    [columns]="columns"
                    [autoSync]="false"
                    [allowHideAll]="false"
                    [actionsClass]="actionsClass"
                    (apply)="onApply($event)">
                </kendo-grid-columnlist>
            </ng-template>
        </kendo-grid-columnmenu-item>
    `
            },] },
];
/** @nocollapse */
ColumnMenuChooserComponent.ctorParameters = () => [
    { type: LocalizationService },
    { type: ColumnInfoService },
    { type: ChangeDetectorRef }
];
ColumnMenuChooserComponent.propDecorators = {
    expand: [{ type: Output }],
    collapse: [{ type: Output }],
    expanded: [{ type: Input }]
};

/* tslint:disable:max-line-length */
/**
 * Represents the component for editing column filters in the Grid that can be placed
 * inside a [`ColumnMenuTemplate`]({% slug api_grid_columnmenutemplatedirective %}) directive.
 *
 * > You have to set the [ColumnMenuService]({% slug api_grid_columnmenuservice %}) that is passed by
 * > the template to the service input of the `kendo-grid-columnmenu-filter` component.
 *
 * @example
 * {% meta height:400 %}
 * ```ts-preview
 *
 * _@Component({
 *     selector: 'my-app',
 *     template: `
 *       <kendo-grid [kendoGridBinding]="data" [columnMenu]="true">
 *          <ng-template kendoGridColumnMenuTemplate let-service="service">
 *              <kendo-grid-columnmenu-filter [service]="service">
 *              </kendo-grid-columnmenu-filter>
 *          </ng-template>
 *          <kendo-grid-column field="Field1"></kendo-grid-column>
 *          <kendo-grid-column field="Field2"></kendo-grid-column>
 *       </kendo-grid>
 *     `
 * })
 *
 * class AppComponent {
 *   public data: any[] = [{ Field1: 'Foo', Field2: 'Bar' }];
 * }
 *
 * ```
 * {% endmeta %}
 */
class ColumnMenuFilterComponent extends ColumnMenuItemBase {
    constructor(localization) {
        super();
        this.localization = localization;
        /**
         * Fires when the content is expanded.
         */
        this.expand = new EventEmitter();
        /**
         * Fires when the content is collapsed.
         */
        this.collapse = new EventEmitter();
        /**
         * Specifies if the content is expanded.
         */
        this.expanded = false;
        /**
         * @hidden
         */
        this.actionsClass = 'k-columnmenu-actions';
    }
}
ColumnMenuFilterComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-grid-columnmenu-filter',
                template: `
        <kendo-grid-columnmenu-item [text]="localization.get('filter')" icon="filter"
            [expanded]="expanded" (collapse)="collapse.emit()" (expand)="expand.emit()">
            <ng-template kendoGridColumnMenuItemContentTemplate>
                    <kendo-grid-filter-menu-container
                        [column]="service.column"
                        [filter]="service.filter"
                        [actionsClass]="actionsClass"
                        (close)="close()">
                    </kendo-grid-filter-menu-container>
                </ng-template>
        </kendo-grid-columnmenu-item>
    `
            },] },
];
/** @nocollapse */
ColumnMenuFilterComponent.ctorParameters = () => [
    { type: LocalizationService }
];
ColumnMenuFilterComponent.propDecorators = {
    expand: [{ type: Output }],
    collapse: [{ type: Output }],
    expanded: [{ type: Input }]
};

/* tslint:disable:max-line-length */
/**
 * Represents the content template of the
 * [`kendo-grid-columnmenu-item`]({% slug api_grid_columnmenuitemcomponent %}) component.
 * Provides an option for specifying the content of a column item.
 * To define the content template, nest an `<ng-template>` tag with the
 * `kendoGridColumnMenuItemContentTemplate` directive inside a `<kendo-grid-columnmenu-item>`.
 *
 * @example
 * ```ts-preview
 *
 * _@Component({
 *     selector: 'my-app',
 *     template: `
 *       <kendo-grid [data]="data" [columnMenu]="true">
 *          <ng-template kendoGridColumnMenuTemplate>
 *              <kendo-grid-columnmenu-item text="Item Text" [expanded]="true">
 *                  <ng-template kendoGridColumnMenuItemContentTemplate>
 *                      Item Content
 *                  </ng-template>
 *              </kendo-grid-columnmenu-item>
 *          </ng-template>
 *          <kendo-grid-column field="Field1"></kendo-grid-column>
 *          <kendo-grid-column field="Field2"></kendo-grid-column>
 *       </kendo-grid>
 *     `
 * })
 *
 * class AppComponent {
 *   public data: any[] = [{ Field1: 'Foo', Field2: 'Bar' }];
 * }
 *
 * ```
 */
class ColumnMenuItemContentTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
ColumnMenuItemContentTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoGridColumnMenuItemContentTemplate]'
            },] },
];
/** @nocollapse */
ColumnMenuItemContentTemplateDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] }
];

/**
 * Represents an item that can be placed inside a
 * [`ColumnMenuTemplate`]({% slug api_grid_columnmenutemplatedirective %}) directive.
 *
 * @example
 * ```ts-preview
 *
 * _@Component({
 *     selector: 'my-app',
 *     template: `
 *       <kendo-grid [data]="data" [columnMenu]="true" [resizable]="true" #grid>
 *          <ng-template kendoGridColumnMenuTemplate let-service="service" let-column="column">
 *              <kendo-grid-columnmenu-item icon="arrows-resizing" text="Fit column"
 *                  (itemClick)="grid.autoFitColumn(column); service.close()">
 *              </kendo-grid-columnmenu-item>
 *          </ng-template>
 *          <kendo-grid-column field="Field1"></kendo-grid-column>
 *          <kendo-grid-column field="Field2"></kendo-grid-column>
 *       </kendo-grid>
 *     `
 * })
 *
 * class AppComponent {
 *   public data: any[] = [{ Field1: 'Foo', Field2: 'Bar' }];
 * }
 *
 * ```
 */
class ColumnMenuItemComponent {
    constructor() {
        /**
         * Fires when the item is clicked.
         */
        this.itemClick = new EventEmitter();
        /**
         * Fires when the content is expanded.
         */
        this.expand = new EventEmitter();
        /**
         * Fires when the content is collapsed.
         */
        this.collapse = new EventEmitter();
        this.contentState = 'collapsed';
    }
    get iconClass() {
        return `k-i-${this.icon}`;
    }
    ngOnChanges(changes) {
        if (changes.expanded) {
            this.updateContentState();
        }
    }
    /**
     * @hidden
     */
    onClick(e) {
        this.itemClick.emit(e);
        if (this.contentTemplate) {
            this.expanded = !this.expanded;
            this.updateContentState();
            if (this.expanded) {
                this.expand.emit();
            }
            else {
                this.collapse.emit();
            }
        }
    }
    updateContentState() {
        this.contentState = this.expanded ? 'expanded' : 'collapsed';
    }
}
ColumnMenuItemComponent.decorators = [
    { type: Component, args: [{
                animations: [
                    trigger('state', [
                        state('collapsed', style({ display: 'none' })),
                        state('expanded', style({ display: 'block' })),
                        transition('collapsed => expanded', [
                            style({
                                height: '0px',
                                display: 'block'
                            }),
                            animate('100ms ease-in', style({
                                height: '*'
                            }))
                        ]),
                        transition('expanded => collapsed', [
                            style({
                                height: '*'
                            }),
                            animate('100ms ease-in', style({
                                height: '0px'
                            }))
                        ])
                    ])
                ],
                selector: 'kendo-grid-columnmenu-item',
                template: `
        <div class="k-columnmenu-item" (click)="onClick($event)" [class.k-state-selected]="selected" [class.k-state-disabled]="disabled">
           <span *ngIf="icon" class="k-icon" [ngClass]="iconClass">
           </span>
           {{ text }}
        </div>
        <div *ngIf="contentTemplate" [@state]="contentState" style="overflow:hidden;" class="k-columnmenu-item-content">
            <ng-container [ngTemplateOutlet]="contentTemplate.templateRef">
            </ng-container>
        <div>
    `
            },] },
];
ColumnMenuItemComponent.propDecorators = {
    itemClick: [{ type: Output }],
    expand: [{ type: Output }],
    collapse: [{ type: Output }],
    icon: [{ type: Input }],
    text: [{ type: Input }],
    selected: [{ type: Input }],
    disabled: [{ type: Input }],
    expanded: [{ type: Input }],
    contentTemplate: [{ type: ContentChild, args: [ColumnMenuItemContentTemplateDirective,] }]
};

/* tslint:disable:max-line-length */
/**
 * Represents a column-menu item for sorting Grid columns that can be placed inside a
 * [`ColumnMenuTemplate`]({% slug api_grid_columnmenutemplatedirective %}) directive.
 * Allows the user to sort the column.
 *
 * > You have to set the [ColumnMenuService]({% slug api_grid_columnmenuservice %}) that is passed by
 * > the template to the service input of the `kendo-grid-columnmenu-sort` component.
 *
 * @example
 * ```ts-preview
 *
 * _@Component({
 *     selector: 'my-app',
 *     template: `
 *       <kendo-grid [kendoGridBinding]="data" [sortable]="true" [columnMenu]="true">
 *          <ng-template kendoGridColumnMenuTemplate let-service="service">
 *              <kendo-grid-columnmenu-sort [service]="service">
 *              </kendo-grid-columnmenu-sort>
 *          </ng-template>
 *          <kendo-grid-column field="Field1" [width]="100"></kendo-grid-column>
 *          <kendo-grid-column field="Field2" [width]="100"></kendo-grid-column>
 *       </kendo-grid>
 *     `
 * })
 *
 * class AppComponent {
 *   public data: any[] = [{ Field1: 'Foo', Field2: 'Bar' }, { Field1: 'Foo1', Field2: 'Bar1' }];
 * }
 *
 * ```
 */
class ColumnMenuSortComponent extends ColumnMenuItemBase {
    constructor(localization, sortService) {
        super();
        this.localization = localization;
        this.sortService = sortService;
    }
    get sortedAsc() {
        const descriptor = this.descriptor;
        return descriptor && (!descriptor.dir || descriptor.dir === 'asc');
    }
    get sortedDesc() {
        const descriptor = this.descriptor;
        return descriptor && descriptor.dir === 'desc';
    }
    /**
     * @hidden
     */
    toggleSort(dir) {
        const field = this.service.column.field;
        const { mode, allowUnsort } = normalize$1(this.service.sortable);
        const descriptor = this.descriptor;
        const sort = mode === 'multiple' ? this.service.sort.filter(s => s.field !== field) : [];
        if (descriptor && descriptor.dir === dir) {
            if (!allowUnsort) {
                return;
            }
        }
        else {
            sort.push({ field, dir });
        }
        this.sortService.sort(sort);
        this.close();
    }
    get descriptor() {
        return [].concat(this.service.sort || []).find(s => s.field === this.service.column.field);
    }
}
ColumnMenuSortComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-grid-columnmenu-sort',
                template: `
        <kendo-grid-columnmenu-item [text]="localization.get('sortAscending')"
            icon="sort-asc-sm" (itemClick)="toggleSort('asc')" [selected]="sortedAsc">
        </kendo-grid-columnmenu-item>
        <kendo-grid-columnmenu-item [text]="localization.get('sortDescending')"
            icon="sort-desc-sm" (itemClick)="toggleSort('desc')" [selected]="sortedDesc">
        </kendo-grid-columnmenu-item>
    `
            },] },
];
/** @nocollapse */
ColumnMenuSortComponent.ctorParameters = () => [
    { type: LocalizationService },
    { type: SortService }
];

const POPUP_CLASS = 'k-grid-columnmenu-popup';
/**
 * Represents the [column menu]({% slug columnmenu_grid %}) component.
 */
class ColumnMenuComponent {
    constructor(popupService, localization, service) {
        this.popupService = popupService;
        this.localization = localization;
        this.service = service;
        /**
         * @hidden
         */
        this.standalone = true;
        /**
         * The settings for the Column Menu.
         */
        this.settings = {};
        /**
         * @hidden
         */
        this.sortable = true;
        /**
         * @hidden
         */
        this.expandedFilter = false;
        /**
         * @hidden
         */
        this.expandedColumns = false;
        this.closeSubscription = service.closeMenu.subscribe(this.close.bind(this));
    }
    /**
     * @hidden
     */
    get isActive() {
        return (this.hasFilter && filtersByField(this.filter, this.column.field).length > 0) ||
            (!this.sortable && this.hasSort && this.sort.find(descriptor => descriptor.field === this.column.field));
    }
    /**
     * @hidden
     */
    get hasFilter() {
        return hasFilter(this.settings, this.column);
    }
    /**
     * @hidden
     */
    get hasSort() {
        return hasSort(this.settings, this.column);
    }
    /**
     * @hidden
     */
    get hasColumnChooser() {
        return hasColumnChooser(this.settings);
    }
    /**
     * @hidden
     */
    get hasLock() {
        return hasLock(this.settings, this.column);
    }
    ngOnChanges() {
        this.service.column = this.column;
        this.service.sort = this.sort;
        this.service.filter = this.filter;
        this.service.sortable = this.sortable;
    }
    ngOnDestroy() {
        this.close();
        this.closeSubscription.unsubscribe();
    }
    /**
     * @hidden
     */
    toggle(e, anchor, template) {
        e.preventDefault();
        this.expandedFilter = !this.hasColumnChooser;
        this.expandedColumns = !this.hasFilter;
        this.popupRef = this.popupService.open(anchor, template, this.popupRef, POPUP_CLASS);
    }
    /**
     * @hidden
     */
    close() {
        this.popupService.destroy();
        this.popupRef = null;
    }
    /**
     * @hidden
     */
    onColumnsExpand() {
        this.expandedColumns = true;
        this.expandedFilter = false;
    }
    /**
     * @hidden
     */
    onFilterExpand() {
        this.expandedFilter = true;
        this.expandedColumns = false;
    }
}
ColumnMenuComponent.decorators = [
    { type: Component, args: [{
                providers: [ColumnMenuService],
                selector: 'kendo-grid-column-menu',
                template: `
        <a #anchor
            class="k-grid-column-menu k-grid-filter"
            [ngClass]="{ 'k-state-active': isActive }"
            (click)="toggle($event, anchor, template)"
            href="#"
            tabindex="-1"
            [attr.title]="localization.get('columnMenu')">
            <span class="k-icon k-i-more-vertical"></span>
        </a>
        <ng-template #template>
            <ng-container [ngTemplateOutlet]="column.columnMenuTemplateRef || columnMenuTemplate || defaultTemplate"
                          [ngTemplateOutletContext]="{ service: service, column: column }">
            </ng-container>
        </ng-template>
        <ng-template #defaultTemplate>
            <kendo-grid-columnmenu-sort *ngIf="hasSort" [service]="service">
            </kendo-grid-columnmenu-sort>
            <kendo-grid-columnmenu-lock *ngIf="hasLock" [service]="service">
            </kendo-grid-columnmenu-lock>
            <kendo-grid-columnmenu-chooser *ngIf="hasColumnChooser" [service]="service"
                [expanded]="expandedColumns" (expand)="onColumnsExpand()">
            </kendo-grid-columnmenu-chooser>
            <kendo-grid-columnmenu-filter *ngIf="hasFilter" [service]="service"
                [expanded]="expandedFilter" (expand)="onFilterExpand()">
            </kendo-grid-columnmenu-filter>
        </ng-template>
    `
            },] },
];
/** @nocollapse */
ColumnMenuComponent.ctorParameters = () => [
    { type: SinglePopupService },
    { type: LocalizationService },
    { type: ColumnMenuService }
];
ColumnMenuComponent.propDecorators = {
    standalone: [{ type: HostBinding, args: ['class.k-grid-column-menu-standalone',] }, { type: Input }],
    column: [{ type: Input }],
    settings: [{ type: Input }],
    sort: [{ type: Input }],
    filter: [{ type: Input }],
    sortable: [{ type: Input }],
    columnMenuTemplate: [{ type: Input }]
};

/* tslint:disable:max-line-length */
/**
 * Represents a column-menu item that can be placed inside a
 * [`ColumnMenuTemplate`]({% slug api_grid_columnmenutemplatedirective %}) directive.
 * Allows the user to lock or unlock the columns.
 *
 * > You have to set the [ColumnMenuService]({% slug api_grid_columnmenuservice %}) that is passed by
 * > the template to the service input of the `kendo-grid-columnmenu-lock` component.
 *
 * @example
 * ```ts-preview
 *
 * _@Component({
 *     selector: 'my-app',
 *     template: `
 *       <kendo-grid [data]="data" [columnMenu]="true">
 *          <ng-template kendoGridColumnMenuTemplate let-service="service">
 *              <kendo-grid-columnmenu-lock [service]="service">
 *              </kendo-grid-columnmenu-lock>
 *          </ng-template>
 *          <kendo-grid-column field="Field1" [width]="100"></kendo-grid-column>
 *          <kendo-grid-column field="Field2" [width]="100"></kendo-grid-column>
 *       </kendo-grid>
 *     `
 * })
 *
 * class AppComponent {
 *   public data: any[] = [{ Field1: 'Foo', Field2: 'Bar' }];
 * }
 *
 * ```
 */
class ColumnMenuLockComponent extends ColumnMenuItemBase {
    constructor(localization, columnInfoService, changeDetector) {
        super();
        this.localization = localization;
        this.columnInfoService = columnInfoService;
        this.changeDetector = changeDetector;
    }
    get text() {
        return this.localization.get(this.locked ? 'unlock' : 'lock');
    }
    get icon() {
        return this.locked ? 'unlock' : 'lock';
    }
    get disabled() {
        return !this.locked && this.columnInfoService.unlockedRootCount < 2;
    }
    /**
     * @hidden
     */
    toggleColumn() {
        this.toggleHierarchy(!this.locked);
        this.close();
        this.changeDetector.markForCheck();
    }
    toggleHierarchy(locked) {
        let root = this.service.column;
        while (root.parent) {
            root = root.parent;
        }
        const columns = [root];
        const allChanged = [];
        while (columns.length) {
            const column = columns.shift();
            column.locked = locked;
            allChanged.push(column);
            if (column.hasChildren) {
                columns.push(...column.childrenArray);
            }
        }
        this.columnInfoService.changeLocked(allChanged);
    }
    get locked() {
        return this.service.column.locked;
    }
}
ColumnMenuLockComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-grid-columnmenu-lock',
                template: `
       <kendo-grid-columnmenu-item [text]="text" [icon]="icon" (itemClick)="toggleColumn()" [disabled]="disabled">
       </kendo-grid-columnmenu-item>
    `
            },] },
];
/** @nocollapse */
ColumnMenuLockComponent.ctorParameters = () => [
    { type: LocalizationService },
    { type: ColumnInfoService },
    { type: ChangeDetectorRef }
];

const COMPONENTS$1 = [
    ColumnListComponent,
    ColumnChooserComponent,
    ColumnMenuChooserComponent,
    ColumnMenuFilterComponent,
    ColumnMenuItemComponent,
    ColumnMenuItemContentTemplateDirective,
    ColumnMenuSortComponent,
    ColumnMenuComponent,
    ColumnMenuLockComponent,
    ColumnMenuTemplateDirective
];
/**
 * @hidden
 */
class ColumnMenuModule {
    static exports() {
        return [
            ColumnChooserComponent,
            ColumnMenuFilterComponent,
            ColumnMenuItemComponent,
            ColumnMenuItemContentTemplateDirective,
            ColumnMenuSortComponent,
            ColumnMenuLockComponent,
            ColumnMenuChooserComponent,
            ColumnMenuTemplateDirective,
            ColumnMenuComponent
        ];
    }
}
ColumnMenuModule.decorators = [
    { type: NgModule, args: [{
                declarations: [COMPONENTS$1],
                imports: [CommonModule, FilterMenuModule],
                exports: [COMPONENTS$1]
            },] },
];

const exportedModules$2 = [
    HeaderComponent,
    HeaderTemplateDirective,
    ColumnHandleDirective,
    SelectAllCheckboxDirective
];
const importedModules$2 = [
    CommonModule,
    GroupModule,
    RowFilterModule,
    FilterMenuModule,
    SharedModule,
    DragAndDropModule,
    ColumnMenuModule
];
/**
 * @hidden
 */
class HeaderModule {
    static exports() {
        return [
            HeaderTemplateDirective,
            SelectAllCheckboxDirective
        ];
    }
}
HeaderModule.decorators = [
    { type: NgModule, args: [{
                declarations: [exportedModules$2],
                exports: [exportedModules$2],
                imports: [...importedModules$2]
            },] },
];

/**
 * Represents the command columns of the Grid. You have to define the content of the
 * column inside an `<ng-template>` tag. The template context is set to the current
 * data item. For more information and examples on using the passed fields
 * and the command directives, refer to the article on
 * [editing the Grid in Angular Reactive Forms]({% slug editing_reactive_forms_grid %}).
 *
 * The following additional fields are passed:
 * - `columnIndex`&mdash;The current column index.
 * - `rowIndex`&mdash;The current data row index. If inside a new item row, `rowIndex`is `-1`.
 * - `dataItem`&mdash;The current data item.
 * - `column`&mdash;The current column instance.
 * - `isNew`&mdash;The state of the current item.
 *
 * Usually, the template contains CRUD command directives such as:
 * - [`EditCommandDirective`]({% slug api_grid_editcommanddirective %})
 * - [`RemoveCommandDirective`]({% slug api_grid_removecommanddirective %})
 * - [`CancelCommandDirective`]({% slug api_grid_cancelcommanddirective %})
 * - [`SaveCommandDirective`]({% slug api_grid_savecommanddirective %})
 *
 * @example
 * ```ts-preview
 *
 * _@Component({
 *    selector: 'my-app',
 *    template: `
 *        <kendo-grid [data]="gridData">
 *          <kendo-grid-column field="ProductID" title="Product ID" width="120">
 *          </kendo-grid-column>
 *          <kendo-grid-column field="ProductName" title="Product Name">
 *          </kendo-grid-column>
 *          <kendo-grid-column field="UnitPrice" title="Unit Price" width="230">
 *          </kendo-grid-column>
 *          <kendo-grid-command-column title="command" width="220">
 *               <ng-template kendoGridCellTemplate>
 *                   <button kendoGridEditCommand class="k-primary">Edit</button>
 *                   <button kendoGridRemoveCommand>Remove</button>
 *               </ng-template>
 *           </kendo-grid-command-column>
 *        </kendo-grid>
 *    `
 * })
 *
 * class AppComponent {
 *    public gridData: any[];
 *
 *    constructor() {
 *        this.gridData = products;
 *    }
 * }
 *
 * const products = [{
 *    "ProductID": 1,
 *    "ProductName": "Chai",
 *    "UnitPrice": 18.0000,
 *    "Discontinued": true
 *  }, {
 *    "ProductID": 2,
 *    "ProductName": "Chang",
 *    "UnitPrice": 19.0000,
 *    "Discontinued": false
 *  }
 * ];
 *
 * ```
 */
class CommandColumnComponent extends ColumnBase$1 {
    constructor(parent) {
        super(parent);
        this.parent = parent;
    }
    get templateRef() {
        return this.template ? this.template.templateRef : undefined;
    }
}
CommandColumnComponent.decorators = [
    { type: Component, args: [{
                providers: [
                    {
                        provide: ColumnBase$1,
                        useExisting: forwardRef(() => CommandColumnComponent)
                    }
                ],
                selector: 'kendo-grid-command-column',
                template: ``
            },] },
];
/** @nocollapse */
CommandColumnComponent.ctorParameters = () => [
    { type: ColumnBase$1, decorators: [{ type: SkipSelf }, { type: Host }, { type: Optional }] }
];
CommandColumnComponent.propDecorators = {
    template: [{ type: ContentChild, args: [CellTemplateDirective,] }]
};

/**
 * Represents the checkbox for selecting columns in the Grid. If the column is
 * defined as empty, it renders a default checkbox for row selection.
 * You can also define the content of the column inside an `<ng-template>` tag.
 * The input requires you to include the `SelectionCheckbox` option.
 *
 * The template context is set to the current data item and the following additional fields are passed:
 * - `columnIndex`&mdash;The current column index.
 * - `rowIndex`&mdash;The current data row index. If inside a new item row, it will be `-1`.
 * - `dataItem`&mdash;The current data item.
 * - `column`&mdash;The current column instance.
 * - `isNew`&mdash;The state of the current item.
 *
 * For more examples, refer to:
 * - [Selecting or deselecting all items on a page]({% slug selection_grid %}#toc-select-all-feature)
 * - [Persisting the selection]({% slug selection_grid %}#toc-in-combination-with-the-select-all-feature)
 *
 * @example
 * ```ts-preview
 *
 * _@Component({
 *    selector: 'my-app',
 *    template: `
 *        <kendo-grid [data]="gridData" [selectable]="{enabled: true, checkboxOnly: true}">
 *          <kendo-grid-column field="ProductID" title="Product ID" width="120">
 *          </kendo-grid-column>
 *          <kendo-grid-column field="ProductName" title="Product Name">
 *          </kendo-grid-column>
 *          <kendo-grid-checkbox-column title="Default checkbox">
 *          </kendo-grid-checkbox-column>
 *          <kendo-grid-checkbox-column title="Custom checkbox">
 *            <ng-template kendoGridCellTemplate let-idx="rowIndex">
 *              Select row <input [kendoGridSelectionCheckbox]="idx" />
 *            </ng-template>
 *          </kendo-grid-checkbox-column>
 *        </kendo-grid>
 *    `
 * })
 *
 * class AppComponent {
 *    public gridData: any[];
 *
 *    constructor() {
 *        this.gridData = products;
 *    }
 * }
 *
 * const products = [{
 *    "ProductID": 1,
 *    "ProductName": "Chai",
 *    "UnitPrice": 18.0000,
 *    "Discontinued": true
 *  }, {
 *    "ProductID": 2,
 *    "ProductName": "Chang",
 *    "UnitPrice": 19.0000,
 *    "Discontinued": false
 *  }
 * ];
 *
 * ```
 */
class CheckboxColumnComponent extends ColumnBase$1 {
    constructor(parent) {
        super(parent);
        this.parent = parent;
        /*
         * @hidden
         */
        this.isCheckboxColumn = true;
    }
    get templateRef() {
        return this.template ? this.template.templateRef : undefined;
    }
}
CheckboxColumnComponent.decorators = [
    { type: Component, args: [{
                providers: [
                    {
                        provide: ColumnBase$1,
                        useExisting: forwardRef(() => CheckboxColumnComponent)
                    }
                ],
                selector: 'kendo-grid-checkbox-column',
                template: ``
            },] },
];
/** @nocollapse */
CheckboxColumnComponent.ctorParameters = () => [
    { type: ColumnBase$1, decorators: [{ type: SkipSelf }, { type: Host }, { type: Optional }] }
];
CheckboxColumnComponent.propDecorators = {
    showSelectAll: [{ type: Input }],
    template: [{ type: ContentChild, args: [CellTemplateDirective,] }]
};

/* tslint:disable:no-input-rename */
/**
 * Represents the row-selection checkbox of the Grid. The directive expects the
 * index of the current row as an input parameter. Inside the
 * [`CheckboxColumnComponent`]({% slug api_grid_checkboxcolumncomponent %}), apply the
 * directive to an `input` element. When the user clicks the checkbox that is associated
 * with the directive, a [`selectionChange`]({% slug api_grid_gridcomponent %}#toc-selectionChange)
 * event is triggered.
 *
 * @example
 * ```ts-preview
 *
 * _@Component({
 *    selector: 'my-app',
 *    template: `
 *        <kendo-grid [data]="gridData" [selectable]="{enabled: true, checkboxOnly: true}">
 *          <kendo-grid-checkbox-column title="Custom checkbox">
 *            <ng-template kendoGridCellTemplate let-idx="rowIndex">
 *              Select row <input [kendoGridSelectionCheckbox]="idx" />
 *            </ng-template>
 *          </kendo-grid-checkbox-column>
 *          <kendo-grid-column field="ProductID" title="Product ID" width="120">
 *          </kendo-grid-column>
 *          <kendo-grid-column field="ProductName" title="Product Name">
 *          </kendo-grid-column>
 *        </kendo-grid>
 *    `
 * })
 *
 * class AppComponent {
 *    public gridData: any[];
 *
 *    constructor() {
 *        this.gridData = products;
 *    }
 * }
 *
 * const products = [{
 *    "ProductID": 1,
 *    "ProductName": "Chai",
 *    "UnitPrice": 18.0000,
 *    "Discontinued": true
 *  }, {
 *    "ProductID": 2,
 *    "ProductName": "Chang",
 *    "UnitPrice": 19.0000,
 *    "Discontinued": false
 *  }
 * ];
 *
 * ```
 */
class SelectionCheckboxDirective {
    constructor(selectionService, el, renderer, ngZone) {
        this.selectionService = selectionService;
        this.el = el;
        this.renderer = renderer;
        this.ngZone = ngZone;
        this.type = "checkbox";
        this.ngZone.runOutsideAngular(() => {
            this.destroyClick = this.renderer.listen(this.el.nativeElement, "click", this.onClick.bind(this));
            this.destroyKeyDown = this.renderer.listen(this.el.nativeElement, "keydown", this.onKeyDown.bind(this));
        });
    }
    ngAfterContentChecked() {
        this.setCheckedState();
    }
    ngOnDestroy() {
        if (this.destroyClick) {
            this.destroyClick();
        }
        if (this.destroyKeyDown) {
            this.destroyKeyDown();
        }
    }
    onClick() {
        if (this.selectionService.options.enabled) {
            this.ngZone.run(() => {
                const ev = this.selectionService.toggleByIndex(this.itemIndex);
                ev.ctrlKey = true;
                ev.shiftKey = false;
                this.selectionService.changes.emit(ev);
            });
        }
    }
    onKeyDown(e) {
        if (e.keyCode === Keys.Enter) {
            this.onClick();
        }
    }
    /*
     * @hidden
     */
    setCheckedState() {
        this.renderer.setProperty(this.el.nativeElement, "checked", this.selectionService.isSelected(this.itemIndex));
    }
}
SelectionCheckboxDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoGridSelectionCheckbox]'
            },] },
];
/** @nocollapse */
SelectionCheckboxDirective.ctorParameters = () => [
    { type: SelectionService },
    { type: ElementRef },
    { type: Renderer2 },
    { type: NgZone }
];
SelectionCheckboxDirective.propDecorators = {
    itemIndex: [{ type: Input, args: ["kendoGridSelectionCheckbox",] }],
    type: [{ type: HostBinding, args: ['attr.type',] }]
};

const columnCellIndex = (cell, cells) => {
    let cellIndex = 0;
    for (let idx = 0; idx < cells.length; idx++) {
        if (cells[idx] === cell) {
            return cellIndex;
        }
        if (!hasClasses(cells[idx], 'k-hierarchy-cell k-group-cell')) {
            cellIndex++;
        }
    }
};
/**
 * @hidden
 */
class TableBodyComponent {
    constructor(detailsService, groupsService, changeNotification, editService, localization, ngZone, renderer, element, domEvents, selectionService, cellSelectionService, columnInfoService, navigationService) {
        this.detailsService = detailsService;
        this.groupsService = groupsService;
        this.changeNotification = changeNotification;
        this.editService = editService;
        this.localization = localization;
        this.ngZone = ngZone;
        this.renderer = renderer;
        this.element = element;
        this.domEvents = domEvents;
        this.selectionService = selectionService;
        this.cellSelectionService = cellSelectionService;
        this.columnInfoService = columnInfoService;
        this.navigationService = navigationService;
        this.columns = [];
        this.groups = [];
        this.skip = 0;
        this.noRecordsText = this.localization.get('noRecords');
        this.isLocked = false;
        this.skipGroupDecoration = false;
        this.showGroupFooters = false;
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
    isAriaSelected(item, column) {
        return this.cellSelectionService.isCellSelected(item, column) ||
            this.isRowSelected(item) ? 'true' : 'false';
    }
    toggleRow(index, dataItem) {
        this.detailsService.toggleRow(index, dataItem);
        return false;
    }
    isExpanded(viewItem) {
        return this.detailsService.isExpanded(viewItem.index, viewItem.data);
    }
    detailButtonStyles(viewItem) {
        const expanded = this.isExpanded(viewItem);
        return expanded ? 'k-minus' : 'k-plus';
    }
    detailButtonTitle(viewItem) {
        const messageKey = this.isExpanded(viewItem) ? 'detailCollapse' : 'detailExpand';
        return this.localization.get(messageKey);
    }
    isGroup(item) {
        return item.type === 'group';
    }
    isDataItem(item) {
        return !this.isGroup(item) && !this.isFooter(item);
    }
    isFooter(item) {
        return item.type === 'footer';
    }
    isInExpandedGroup(item) {
        return this.groupsService.isInExpandedGroup(item.groupIndex, false);
    }
    isParentGroupExpanded(item) {
        return this.groupsService.isInExpandedGroup(item.index || item.groupIndex);
    }
    isOdd(item) {
        return item.index % 2 !== 0;
    }
    isSelectable() {
        return this.selectable && this.selectable.enabled !== false;
    }
    isRowSelected(item) {
        return this.selectionService.isSelected(item.index);
    }
    trackByWrapper(index, item) {
        if (item.type === 'data') {
            item.isEditing = this.editService.hasEdited(item.index);
        }
        return this.trackBy(index, item);
    }
    trackByColumns(index, item) {
        return this.virtualColumns ? index : item;
    }
    ngDoCheck() {
        if (this.hasGroupHeaderColumn) {
            this.groupHeaderColumns = columnsToRender(this.skipGroupDecoration ? this.columns : this.columns.toArray().slice(1));
        }
        else {
            this.groupHeaderColumns = [];
        }
        if (this.isLocked) {
            this.groupHeaderSlaveCellsCount =
                this.hasGroupHeaderColumn ? this.columnsContainer.nonLockedColumnsToRender.length : 1;
        }
        else {
            this.groupHeaderSlaveCellsCount = 0;
        }
    }
    ngOnChanges(changes) {
        if (isChanged("columns", changes, false)) {
            this.changeNotification.notify();
        }
    }
    logicalRowIndex(rowIndex) {
        let pos = this.skip + rowIndex;
        if (this.hasDetailTemplate) {
            pos *= 2;
        }
        const absoluteRowIndex = 1 + pos;
        const addRowOffset = this.editService.hasNewItem ? 1 : 0;
        const filterRowOffset = hasFilterRow(this.filterable) ? 1 : 0;
        const headerRowCount = this.columnInfoService.totalLevels + filterRowOffset + addRowOffset;
        return absoluteRowIndex + headerRowCount;
    }
    addRowLogicalIndex() {
        return this.columnInfoService.totalLevels + 1 +
            (hasFilterRow(this.filterable) ? 1 : 0);
    }
    logicalColIndex(column) {
        if (!isPresent(column.leafIndex)) {
            return -1;
        }
        return column.leafIndex + (this.hasDetailTemplate ? 1 : 0);
    }
    ngOnInit() {
        this.ngZone.runOutsideAngular(() => {
            const clickHandler = this.clickHandler.bind(this);
            const mousedownSubscription = this.renderer.listen(this.element.nativeElement, 'mousedown', clickHandler);
            const mouseupSubscription = this.renderer.listen(this.element.nativeElement, 'mouseup', clickHandler);
            const clickSubscription = this.renderer.listen(this.element.nativeElement, 'click', clickHandler);
            const contextmenuSubscription = this.renderer.listen(this.element.nativeElement, 'contextmenu', clickHandler);
            const touchstartSubscription = this.renderer.listen(this.element.nativeElement, 'touchstart', clickHandler);
            const touchendSubscription = this.renderer.listen(this.element.nativeElement, 'touchend', clickHandler);
            this.clickSubscription = () => {
                mousedownSubscription();
                mouseupSubscription();
                clickSubscription();
                contextmenuSubscription();
            };
            this.touchSubscription = () => {
                touchstartSubscription();
                touchendSubscription();
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
    ngOnDestroy() {
        if (this.clickSubscription) {
            this.clickSubscription();
        }
        if (this.touchSubscription) {
            this.touchSubscription();
        }
        this.cellKeydownSubscription.unsubscribe();
        clearTimeout(this.clickTimeout);
    }
    isEditingCell(index, column) {
        return this.editService.isEditing() && this.editService.isEditedColumn(index, column);
    }
    isEditingRow(index) {
        return this.editService.isEditing() && this.editService.hasEdited(index);
    }
    get hasGroupHeaderColumn() {
        return this.columnsContainer.hasGroupHeaderColumn;
    }
    get columnsContainer() {
        return this.columnInfoService.columnsContainer;
    }
    get columnsSpan() {
        return columnsSpan(this.columns);
    }
    get allColumnsSpan() {
        return columnsSpan(this.allColumns || this.columns);
    }
    get colSpan() {
        return this.columnsSpan + this.groups.length + (this.hasDetailTemplate ? 1 : 0);
    }
    get footerColumns() {
        return this.isLocked ? this.columnsContainer.lockedColumnsToRender : this.columnsContainer.nonLockedColumnsToRender;
    }
    showGroupHeader(item) {
        return !item.data.skipHeader;
    }
    get hasDetailTemplate() {
        return isPresent(this.detailTemplate);
    }
    clickHandler(eventArg) {
        const element = this.element.nativeElement;
        const target = this.eventTarget(eventArg);
        let cell, row, body, gridElement;
        let currentTarget = target;
        do {
            cell = closest(currentTarget, matchesNodeName('td'));
            row = closest(cell, matchesNodeName('tr'));
            body = closest(row, matchesNodeName('tbody'));
            currentTarget = body;
            gridElement = closestInScope(currentTarget, matchesClasses('k-grid'), element);
        } while (body && body !== element && !gridElement);
        if (cell && !hasClasses(cell, NON_DATA_CELL_CLASSES) &&
            !hasClasses(row, NON_DATA_ROW_CLASSES) &&
            body === element && !gridElement) {
            this.editService.preventCellClose();
            const focusable = target !== cell && isFocusableWithTabKey(target, false);
            if (!focusable && !matchesNodeName('label')(target) && !hasClasses(target, IGNORE_TARGET_CLASSSES) &&
                !closestInScope(target, matchesClasses(IGNORE_CONTAINER_CLASSES), cell)) {
                const args = this.cellClickArgs(cell, row, eventArg);
                if (eventArg.type === 'mousedown' || eventArg.type === 'touchstart') {
                    this.domEvents.cellMousedown.emit(args);
                }
                else if (eventArg.type === 'mouseup' || eventArg.type === 'touchend') {
                    this.domEvents.cellMouseup.emit(args);
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
        this.domEvents.cellClick.emit(Object.assign(args, {
            isEdited: args.isEditedRow || args.isEditedColumn
        }));
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
        let rowIndex = row.getAttribute('data-kendo-grid-item-index');
        rowIndex = rowIndex ? parseInt(rowIndex, 10) : -1;
        const dataItem = rowIndex === -1 ? this.editService.newDataItem : this.data.at(rowIndex - this.skip);
        const isEditedColumn = this.editService.isEditedColumn(rowIndex, column);
        const isEditedRow = this.editService.isEdited(rowIndex);
        const type = eventArg.type === 'keydown' ? 'click' : eventArg.type;
        return {
            column: column,
            columnIndex: columnIndex,
            dataItem: dataItem,
            isEditedColumn: isEditedColumn,
            isEditedRow: isEditedRow,
            originalEvent: eventArg,
            rowIndex: rowIndex,
            type: type
        };
    }
    eventTarget(args) {
        if (args.type === 'touchend') {
            const touch = args.changedTouches[0];
            return document.elementFromPoint(touch.clientX, touch.clientY);
        }
        return args.target;
    }
}
TableBodyComponent.decorators = [
    { type: Component, args: [{
                selector: '[kendoGridTableBody]',
                template: `
    <ng-template [ngIf]="editService.hasNewItem">
        <tr class="k-grid-add-row k-grid-edit-row"
            kendoGridLogicalRow
                [logicalRowIndex]="addRowLogicalIndex()"
                [logicalSlaveRow]="lockedColumnsCount > 0"
                [logicalCellsCount]="columns.length"
                [logicalSlaveCellsCount]="unlockedColumnsCount">
            <ng-template [ngIf]="!skipGroupDecoration">
                <td class="k-group-cell" *ngFor="let g of groups" role="presentation"></td>
            </ng-template>
            <td class="k-hierarchy-cell"
                *ngIf="detailTemplate?.templateRef"
                kendoGridLogicalCell
                    [logicalRowIndex]="addRowLogicalIndex()"
                    [logicalColIndex]="0"
                    aria-selected="false"
                >
            </td>
            <td *ngFor="let column of columns; let columnIndex = index; trackBy: trackByColumns;"
                kendoGridCell
                    [rowIndex]="-1"
                    [columnIndex]="lockedColumnsCount + columnIndex"
                    [isNew]="true"
                    [column]="column"
                    [dataItem]="newDataItem"
                [ngClass]="column.cssClass"
                [ngStyle]="column.style"
                [attr.colspan]="column.colspan"
                kendoGridLogicalCell
                    [logicalRowIndex]="addRowLogicalIndex()"
                    [logicalColIndex]="logicalColIndex(column)"
                    [colSpan]="column.colspan"
                role="gridcell">
            </td>
        </tr>
    </ng-template>
    <tr *ngIf="data?.length === 0 || data == null" class="k-grid-norecords">
        <td [attr.colspan]="colSpan">
            <ng-template
                [ngIf]="noRecordsTemplate?.templateRef"
                [templateContext]="{
                    templateRef: noRecordsTemplate?.templateRef
                 }">
            </ng-template>
            <ng-container *ngIf="!noRecordsTemplate?.templateRef">
                {{noRecordsText}}
            </ng-container>
        </td>
    </tr>
    <ng-template ngFor
        [ngForOf]="data"
        [ngForTrackBy]="trackByWrapper"
        let-item
        let-rowIndex="index">
        <tr *ngIf="isGroup(item) && isParentGroupExpanded(item) && showGroupHeader(item)"
            kendoGridGroupHeader
                [columns]="columns"
                [groups]="groups"
                [item]="item"
                [hasDetails]="detailTemplate?.templateRef"
                [skipGroupDecoration]="skipGroupDecoration"
                [hasGroupHeaderColumn]="hasGroupHeaderColumn"
                [groupHeaderColumns]="groupHeaderColumns"
                [rowIndex]="rowIndex + 1"
                [totalColumnsCount]="totalColumnsCount"
            kendoGridLogicalRow
                [logicalRowIndex]="logicalRowIndex(rowIndex)"
                [logicalSlaveRow]="lockedColumnsCount > 0"
                [logicalCellsCount]="columns.length"
                [logicalSlaveCellsCount]="groupHeaderSlaveCellsCount">
        </tr>
        <tr
            *ngIf="isDataItem(item) && isInExpandedGroup(item)"
            kendoGridLogicalRow
                [dataRowIndex]="item.index"
                [dataItem]="item.data"
                [logicalRowIndex]="logicalRowIndex(rowIndex)"
                [logicalSlaveRow]="lockedColumnsCount > 0"
                [logicalCellsCount]="columns.length"
                [logicalSlaveCellsCount]="unlockedColumnsCount"
            [ngClass]="rowClass({ dataItem: item.data, index: item.index })"
            [class.k-alt]="isOdd(item)"
            [class.k-master-row]="detailTemplate?.templateRef"
            [class.k-grid-edit-row]="isEditingRow(item.index)"
            [attr.data-kendo-grid-item-index]="item.index"
            [class.k-state-selected]="isSelectable() && isRowSelected(item)">
            <ng-template [ngIf]="!skipGroupDecoration">
                <td class="k-group-cell" *ngFor="let g of groups" role="presentation"></td>
            </ng-template>
            <td class="k-hierarchy-cell"
                *ngIf="detailTemplate?.templateRef"
                kendoGridLogicalCell
                    [logicalRowIndex]="logicalRowIndex(rowIndex)"
                    [logicalColIndex]="0"
                    [dataRowIndex]="item.index"
                    [dataItem]="item.data"
                    [detailExpandCell]="true"
                    aria-selected="false"
                >
                <a class="k-icon"
                    *ngIf="detailTemplate.showIf(item.data, item.index)"
                    [ngClass]="detailButtonStyles(item)"
                    [attr.title]="detailButtonTitle(item)"
                    href="#" tabindex="-1" (click)="toggleRow(item.index, item.data)"></a>
            </td>
            <td
                kendoGridCell
                    [rowIndex]="item.index"
                    [columnIndex]="lockedColumnsCount + columnIndex"
                    [attr.data-kendo-grid-column-index]="lockedColumnsCount + columnIndex"
                    [column]="column"
                    [dataItem]="item.data"
                kendoGridLogicalCell
                    [logicalRowIndex]="logicalRowIndex(rowIndex)"
                    [logicalColIndex]="logicalColIndex(column)"
                    [dataRowIndex]="item.index"
                    [dataItem]="item.data"
                    [colIndex]="columnIndex"
                    [colSpan]="column.colspan"
                    role="gridcell"
                    [attr.aria-selected]="isSelectable() ? isAriaSelected(item, column) : undefined"
                    [style.touch-action]="isSelectable() && $any(selectable).drag ? 'none' : 'auto'"
                [ngClass]="column.cssClass"
                [class.k-grid-edit-cell]="isEditingCell(item.index, column)"
                [ngStyle]="column.style"
                [attr.colspan]="column.colspan"
                [class.k-state-selected]="isSelectable && cellSelectionService.isCellSelected(item, column)"
                *ngFor="let column of columns; let columnIndex = index; trackBy: trackByColumns;">
            </td>
        </tr>
        <tr *ngIf="isDataItem(item) && isInExpandedGroup(item) && detailTemplate?.templateRef &&
            detailTemplate.showIf(item.data, item.index) && isExpanded(item)"
            class="k-detail-row"
            [class.k-alt]="isOdd(item)"
            kendoGridLogicalRow
                [dataRowIndex]="item.index"
                [dataItem]="item.data"
                [logicalRowIndex]="logicalRowIndex(rowIndex) + 1"
                [logicalSlaveRow]="false"
                [logicalCellsCount]="1"
            >
            <td class="k-group-cell" *ngFor="let g of groups"></td>
            <td class="k-hierarchy-cell"></td>
            <td class="k-detail-cell"
                [attr.colspan]="columnsSpan"
                kendoGridLogicalCell
                    [logicalRowIndex]="logicalRowIndex(rowIndex) + 1"
                    [logicalColIndex]="0"
                    [dataRowIndex]="item.index"
                    [dataItem]="item.data"
                    [colIndex]="0"
                    [colSpan]="allColumnsSpan + 1"
                    role="gridcell" aria-selected="false"
                >
                <ng-template
                    [ngTemplateOutlet]="detailTemplate.templateRef"
                    [ngTemplateOutletContext]="{
                        dataItem: item.data,
                        rowIndex: item.index,
                        $implicit: item.data
                    }">
                </ng-template>
            </td>
        </tr>
        <tr *ngIf="isFooter(item) && (isInExpandedGroup(item) || (showGroupFooters && isParentGroupExpanded(item)))
            && !item.data.hideFooter"
            class="k-group-footer"
            kendoGridLogicalRow
                [logicalRowIndex]="logicalRowIndex(rowIndex)"
                [logicalSlaveRow]="lockedColumnsCount > 0"
                [logicalCellsCount]="columns.length"
                [logicalSlaveCellsCount]="unlockedColumnsCount">
            <ng-template [ngIf]="!skipGroupDecoration">
                <td class="k-group-cell" *ngFor="let g of groups"></td>
            </ng-template>
            <td class="k-hierarchy-cell"
                *ngIf="detailTemplate?.templateRef"
                kendoGridLogicalCell
                    [logicalRowIndex]="logicalRowIndex(rowIndex)"
                    [logicalColIndex]="0"
                    aria-selected="false"
                >
            </td>
            <td kendoGridLogicalCell
                    [logicalRowIndex]="logicalRowIndex(rowIndex)"
                    [logicalColIndex]="logicalColIndex(column)"
                [attr.data-skip]="skipGroupDecoration"
                *ngFor="let column of footerColumns; let columnIndex = index; trackBy: trackByColumns;">
                <ng-template
                    [templateContext]="{
                        templateRef: column.groupFooterTemplateRef,
                        group: item.data,
                        field: column.field,
                        column: column,
                        aggregates: item.data?.aggregates,
                        $implicit: item.data?.aggregates
                    }">
                </ng-template>
           </td>
        </tr>
    </ng-template>
    `
            },] },
];
/** @nocollapse */
TableBodyComponent.ctorParameters = () => [
    { type: DetailsService },
    { type: GroupsService },
    { type: ChangeNotificationService },
    { type: EditService },
    { type: LocalizationService },
    { type: NgZone },
    { type: Renderer2 },
    { type: ElementRef },
    { type: DomEventsService },
    { type: SelectionService },
    { type: CellSelectionService },
    { type: ColumnInfoService },
    { type: NavigationService }
];
TableBodyComponent.propDecorators = {
    columns: [{ type: Input }],
    allColumns: [{ type: Input }],
    groups: [{ type: Input }],
    detailTemplate: [{ type: Input }],
    noRecordsTemplate: [{ type: Input }],
    data: [{ type: Input }],
    skip: [{ type: Input }],
    selectable: [{ type: Input }],
    filterable: [{ type: Input }],
    noRecordsText: [{ type: Input }],
    isLocked: [{ type: Input }],
    skipGroupDecoration: [{ type: Input }],
    showGroupFooters: [{ type: Input }],
    lockedColumnsCount: [{ type: Input }],
    totalColumnsCount: [{ type: Input }],
    virtualColumns: [{ type: Input }],
    trackBy: [{ type: Input }],
    rowClass: [{ type: Input }]
};

/**
 * @hidden
 */
class CellComponent {
    constructor(editService, idService, cellContext) {
        this.editService = editService;
        this.idService = idService;
        this.cellContext = cellContext;
        this.isNew = false;
        this._templateContext = {};
        this._editTemplateContext = {};
    }
    get commandCellClass() {
        return this.isCommand(this.column);
    }
    set rowIndex(index) {
        this._rowIndex = index;
        this.updateCellContext();
    }
    get rowIndex() {
        return this._rowIndex;
    }
    get isEdited() {
        if (!(this.editService.isEditing() || this.isNew) || !this.isColumnEditable) {
            return false;
        }
        const editContext = this.editService.columnContext(this.rowIndex, this.column);
        return this.isFieldEditable(editContext, this.column);
    }
    get formGroup() {
        return this.editService.context(this.rowIndex).group;
    }
    get templateContext() {
        return this._templateContext;
    }
    get editTemplateContext() {
        this._editTemplateContext.$implicit = this.formGroup;
        this._editTemplateContext.isNew = this.isNew;
        this._editTemplateContext.column = this.column;
        this._editTemplateContext.dataItem = this.dataItem;
        this._editTemplateContext.formGroup = this.formGroup;
        this._editTemplateContext.rowIndex = this.rowIndex;
        return this._editTemplateContext;
    }
    get format() {
        if (isColumnComponent(this.column) && !isNullOrEmptyString(this.column.format)) {
            return extractFormat(this.column.format);
        }
        return undefined;
    }
    get isBoundColumn() {
        return this.column.field && !this.column.templateRef;
    }
    get isCheckboxColumn() {
        return isCheckboxColumn(this.column) && !this.column.templateRef;
    }
    get selectionCheckboxId() {
        return this.idService.selectionCheckboxId(this.rowIndex);
    }
    get isSpanColumn() {
        return isSpanColumn(this.column) && !this.column.templateRef;
    }
    get childColumns() {
        return columnsToRender([this.column]);
    }
    get isColumnEditable() {
        if (!this.column || this.isCommand(this.column)) {
            return false;
        }
        return this.column.editable !== false;
    }
    ngDoCheck() {
        this.updateCellContext();
    }
    ngOnChanges(_changes) {
        this.updateTemplateContext();
    }
    isCommand(column) {
        return column instanceof CommandColumnComponent;
    }
    isFieldEditable(editContext, column) {
        if (!isPresent(editContext)) {
            return false;
        }
        if (isPresent(column.editTemplate)) {
            return true;
        }
        return isPresent(editContext.group) && isPresent(editContext.group.get(column.field));
    }
    updateCellContext() {
        if (this.cellContext) {
            this.cellContext.rowIndex = this._rowIndex;
        }
    }
    updateTemplateContext() {
        if (!this.column.templateRef) {
            return;
        }
        const context = this._templateContext;
        context.isNew = this.isNew;
        context.column = this.column;
        context.dataItem = this.dataItem;
        context.rowIndex = this.rowIndex;
        context.columnIndex = this.columnIndex;
        context.$implicit = this.dataItem;
    }
}
CellComponent.decorators = [
    { type: Component, args: [{
                selector: '[kendoGridCell]',
                template: `
        <ng-container [ngSwitch]="isEdited">
            <ng-container *ngSwitchCase="false">
                <ng-template [ngIf]="column.templateRef"
                    [ngTemplateOutlet]="column.templateRef"
                    [ngTemplateOutletContext]="templateContext">
                </ng-template>
                <ng-template [ngIf]="isSpanColumn">
                    <ng-template ngFor let-childColumn [ngForOf]="childColumns">
                        {{ dataItem | valueOf: childColumn.field: childColumn.format}}
                    </ng-template>
                </ng-template>
                <ng-template [ngIf]="isBoundColumn">{{ dataItem | valueOf: column.field: column.format}}</ng-template>
                <ng-template [ngIf]="isCheckboxColumn && !isNew">
                    <input class="k-checkbox" [kendoGridSelectionCheckbox]="rowIndex" [attr.id]="selectionCheckboxId"><label class="k-checkbox-label" [attr.for]="selectionCheckboxId"></label>
                </ng-template>
            </ng-container>
            <ng-container *ngSwitchCase="true">
                <ng-template
                    *ngIf="column.editTemplateRef"
                    [ngTemplateOutlet]="column.editTemplateRef"
                    [ngTemplateOutletContext]="editTemplateContext">
                </ng-template>
                <ng-container [ngSwitch]="column.editor" *ngIf="!column.editTemplateRef">
                    <kendo-numerictextbox
                        *ngSwitchCase="'numeric'"
                        [format]="format"
                        [formControl]="formGroup.get(column.field)"
                        kendoGridFocusable
                    ></kendo-numerictextbox>

                    <kendo-datepicker
                        *ngSwitchCase="'date'"
                        [format]="format"
                        [formControl]="formGroup.get(column.field)"
                        kendoGridFocusable
                    ></kendo-datepicker>

                    <input
                        *ngSwitchCase="'boolean'"
                        type="checkbox"
                        class="k-checkbox"
                        [formControl]="formGroup.get(column.field)"
                        kendoGridFocusable
                    />

                    <input
                        *ngSwitchDefault
                        type="text"
                        class="k-textbox"
                        [formControl]="formGroup.get(column.field)"
                        kendoGridFocusable
                    />
                </ng-container>
            </ng-container>
        </ng-container>
    `
            },] },
];
/** @nocollapse */
CellComponent.ctorParameters = () => [
    { type: EditService },
    { type: IdService },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [CELL_CONTEXT,] }] }
];
CellComponent.propDecorators = {
    commandCellClass: [{ type: HostBinding, args: ['class.k-command-cell',] }],
    column: [{ type: Input }],
    columnIndex: [{ type: Input }],
    isNew: [{ type: Input }],
    rowIndex: [{ type: Input }],
    dataItem: [{ type: Input }]
};

/**
 * Represents the `edit` command of the Grid. You can apply this directive to any `button`
 * element inside a [`CommandColumnComponent`]({% slug api_grid_commandcolumncomponent %}).
 * When an associated button with the directive is clicked, the
 * [`edit`]({% slug api_grid_gridcomponent %}#toc-edit) event
 * is triggered ([see example]({% slug editing_grid %})).
 *
 * > When the row is in the edit mode, the button with `kendoGridEditCommand` is automatically hidden.
 *
 * @example
 * ```html-no-run
 * <kendo-grid>
 *   <kendo-grid-command-column title="command">
 *     <ng-template kendoGridCellTemplate>
 *       <button kendoGridEditCommand class="k-primary">Edit</button>
 *     </ng-template>
 *   </kendo-grid-command-column>
 * </kendo-grid>
 * ```
 *
 */
class EditCommandDirective extends Button {
    constructor(editService, cellContext, element, renderer, localization, ngZone) {
        super(element, renderer, null, localization, ngZone);
        this.editService = editService;
        this.cellContext = cellContext;
        /**
         * @hidden
         */
        this.commandClass = true;
    }
    /**
     * @hidden
     */
    get visible() {
        return this.isEdited ? 'none' : '';
    }
    /**
     * @hidden
     */
    onClick(e) {
        e.preventDefault();
        this.editService.beginEdit(this.rowIndex);
    }
    ngDoCheck() {
        if (this.cellContext) {
            this.rowIndex = this.cellContext.rowIndex;
            this.isEdited = this.editService.isEdited(this.rowIndex);
        }
    }
}
EditCommandDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoGridEditCommand]'
            },] },
];
/** @nocollapse */
EditCommandDirective.ctorParameters = () => [
    { type: EditService },
    { type: undefined, decorators: [{ type: Inject, args: [CELL_CONTEXT,] }] },
    { type: ElementRef },
    { type: Renderer2 },
    { type: LocalizationService },
    { type: NgZone }
];
EditCommandDirective.propDecorators = {
    visible: [{ type: HostBinding, args: ['style.display',] }],
    commandClass: [{ type: HostBinding, args: ['class.k-grid-edit-command',] }],
    onClick: [{ type: HostListener, args: ['click', ['$event'],] }]
};

/**
 * Represents the `cancel` command of the Grid. You can apply this directive to any `button`
 * element inside a [`CommandColumnComponent`]({% slug api_grid_commandcolumncomponent %}).
 * When an associated button with the directive is clicked, the
 * [`cancel`]({% slug api_grid_gridcomponent %}#toc-cancel) event
 * is triggered ([see example]({% slug editing_grid %})).
 *
 * > When the row is not in the edit mode, the button with the `kendoGridCancelCommand` is automatically hidden.
 *
 * @example
 * ```html-no-run
 * <kendo-grid>
 *   <kendo-grid-command-column title="command">
 *     <ng-template kendoGridCellTemplate>
 *       <button kendoGridCancelCommand>Cancel changes</button>
 *     </ng-template>
 *   </kendo-grid-command-column>
 * </kendo-grid>
 * ```
 *
 * You can control the content of the button based on the state of the row.
 *
 * @example
 * ```html-no-run
 * <kendo-grid>
 *   <kendo-grid-command-column title="command">
 *     <ng-template kendoGridCellTemplate let-isNew="isNew">
 *       <button kendoGridCancelCommand>{{isNew ? 'Discard' : 'Cancel changes'}}</button>
 *     </ng-template>
 *   </kendo-grid-command-column>
 * </kendo-grid>
 * ```
 */
class CancelCommandDirective extends Button {
    constructor(editService, cellContext, element, renderer, localization, ngZone) {
        super(element, renderer, null, localization, ngZone);
        this.editService = editService;
        this.cellContext = cellContext;
        /**
         * @hidden
         */
        this.commandClass = true;
    }
    /**
     * @hidden
     */
    get visible() {
        return !this.isEdited ? 'none' : '';
    }
    /**
     * @hidden
     */
    onClick(e) {
        e.preventDefault();
        if (this.isEdited) {
            this.editService.endEdit(this.rowIndex);
        }
    }
    ngDoCheck() {
        if (this.cellContext) {
            this.rowIndex = this.cellContext.rowIndex;
            this.isEdited = this.editService.isEdited(this.rowIndex);
        }
    }
}
CancelCommandDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoGridCancelCommand]'
            },] },
];
/** @nocollapse */
CancelCommandDirective.ctorParameters = () => [
    { type: EditService },
    { type: undefined, decorators: [{ type: Inject, args: [CELL_CONTEXT,] }] },
    { type: ElementRef },
    { type: Renderer2 },
    { type: LocalizationService },
    { type: NgZone }
];
CancelCommandDirective.propDecorators = {
    visible: [{ type: HostBinding, args: ['style.display',] }],
    commandClass: [{ type: HostBinding, args: ['class.k-grid-cancel-command',] }],
    onClick: [{ type: HostListener, args: ['click', ['$event'],] }]
};

/**
 * Represents the `save` command of the Grid. You can apply this directive to any `button`
 * element inside a [`CommandColumnComponent`]({% slug api_grid_commandcolumncomponent %}).
 * When an associated button with the directive is clicked, the
 * [`save`]({% slug api_grid_gridcomponent %}#toc-save) event
 * is triggered ([see example]({% slug editing_grid %})).
 *
 * > When the row is not in the edit mode, the button with `kendoGridSaveCommand` is automatically hidden.
 *
 * @example
 * ```html-no-run
 * <kendo-grid>
 *   <kendo-grid-command-column title="command">
 *     <ng-template kendoGridCellTemplate>
 *       <button kendoGridSaveCommand>Save changes</button>
 *     </ng-template>
 *   </kendo-grid-command-column>
 * </kendo-grid>
 * ```
 *
 * You can control the content of the button based on the state of the row.
 *
 * @example
 * ```html-no-run
 * <kendo-grid>
 *   <kendo-grid-command-column title="command">
 *     <ng-template kendoGridCellTemplate let-isNew="isNew">
 *       <button kendoGridSaveCommand>{{isNew ? 'Add' : 'Update'}}</button>
 *     </ng-template>
 *   </kendo-grid-command-column>
 * </kendo-grid>
 * ```
 */
class SaveCommandDirective extends Button {
    constructor(editService, cellContext, element, renderer, localization, ngZone) {
        super(element, renderer, null, localization, ngZone);
        this.editService = editService;
        this.cellContext = cellContext;
        /**
         * @hidden
         */
        this.commandClass = true;
    }
    /**
     * @hidden
     */
    get visible() {
        return !this.isEdited ? 'none' : '';
    }
    /**
     * @hidden
     */
    onClick(e) {
        e.preventDefault();
        if (this.isEdited) {
            this.editService.save(this.rowIndex);
        }
    }
    ngDoCheck() {
        if (this.cellContext) {
            this.rowIndex = this.cellContext.rowIndex;
            this.isEdited = this.editService.isEdited(this.rowIndex);
        }
    }
}
SaveCommandDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoGridSaveCommand]'
            },] },
];
/** @nocollapse */
SaveCommandDirective.ctorParameters = () => [
    { type: EditService },
    { type: undefined, decorators: [{ type: Inject, args: [CELL_CONTEXT,] }] },
    { type: ElementRef },
    { type: Renderer2 },
    { type: LocalizationService },
    { type: NgZone }
];
SaveCommandDirective.propDecorators = {
    visible: [{ type: HostBinding, args: ['style.display',] }],
    commandClass: [{ type: HostBinding, args: ['class.k-grid-save-command',] }],
    onClick: [{ type: HostListener, args: ['click', ['$event'],] }]
};

/**
 * Represents the `remove` command of the Grid. You can apply this directive to any `button` element
 * inside a [`CommandColumnComponent`]({% slug api_grid_commandcolumncomponent %}).
 * When an associated button with the directive is clicked, the
 * [`remove` event]({% slug api_grid_gridcomponent %}#toc-remove)
 * is triggered ([see example]({% slug editing_reactive_forms_grid %})).
 *
 * > When the row is in the edit mode, the button with the `kendoGridRemoveCommand` is automatically hidden.
 *
 * @example
 * ```html-no-run
 * <kendo-grid>
 *   <kendo-grid-command-column title="command">
 *     <ng-template kendoGridCellTemplate>
 *       <button kendoGridRemoveCommand>Remove row</button>
 *     </ng-template>
 *   </kendo-grid-command-column>
 * </kendo-grid>
 * ```
 */
class RemoveCommandDirective extends Button {
    constructor(editService, cellContext, element, renderer, localization, ngZone) {
        super(element, renderer, null, localization, ngZone);
        this.editService = editService;
        this.cellContext = cellContext;
        /**
         * @hidden
         */
        this.commandClass = true;
    }
    /**
     * @hidden
     */
    get visible() {
        return this.isEdited ? 'none' : '';
    }
    /**
     * @hidden
     */
    onClick(e) {
        e.preventDefault();
        this.editService.remove(this.rowIndex);
    }
    ngDoCheck() {
        if (this.cellContext) {
            this.rowIndex = this.cellContext.rowIndex;
            this.isEdited = this.editService.isEdited(this.rowIndex);
        }
    }
}
RemoveCommandDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoGridRemoveCommand]'
            },] },
];
/** @nocollapse */
RemoveCommandDirective.ctorParameters = () => [
    { type: EditService },
    { type: undefined, decorators: [{ type: Inject, args: [CELL_CONTEXT,] }] },
    { type: ElementRef },
    { type: Renderer2 },
    { type: LocalizationService },
    { type: NgZone }
];
RemoveCommandDirective.propDecorators = {
    visible: [{ type: HostBinding, args: ['style.display',] }],
    commandClass: [{ type: HostBinding, args: ['class.k-grid-remove-command',] }],
    onClick: [{ type: HostListener, args: ['click', ['$event'],] }]
};

/**
 * Represents the command for adding a new item to the Grid. You can apply this directive to any
 * `button` element inside a [`ToolbarTemplate`]({% slug api_grid_commandcolumncomponent %}).
 * When an associated button with the directive is clicked, the
 * [`add`]({% slug api_grid_gridcomponent %}#toc-add) event is triggered
 * ([see example]({% slug editing_grid %})).
 *
 * @example
 * ```html-no-run
 * <kendo-grid>
 *    <ng-template kendoGridToolbarTemplate>
 *       <button kendoGridAddCommand>Add new</button>
 *    </ng-template>
 * </kendo-grid>
 * ```
 */
class AddCommandDirective extends Button {
    constructor(editService, element, renderer, localization, ngZone) {
        super(element, renderer, null, localization, ngZone);
        this.editService = editService;
    }
    /**
     * @hidden
     */
    onClick(e) {
        e.preventDefault();
        this.editService.beginAdd();
    }
    /**
     * @hidden
     */
    get commandClass() {
        return true;
    }
}
AddCommandDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoGridAddCommand]'
            },] },
];
/** @nocollapse */
AddCommandDirective.ctorParameters = () => [
    { type: EditService },
    { type: ElementRef },
    { type: Renderer2 },
    { type: LocalizationService },
    { type: NgZone }
];
AddCommandDirective.propDecorators = {
    onClick: [{ type: HostListener, args: ['click', ['$event'],] }],
    commandClass: [{ type: HostBinding, args: ['class.k-grid-add-command',] }]
};

const exported$1 = [
    CommandColumnComponent,
    CheckboxColumnComponent,
    SelectionCheckboxDirective,
    CellTemplateDirective,
    EditTemplateDirective,
    TableBodyComponent,
    NoRecordsTemplateDirective,
    CellComponent,
    EditCommandDirective,
    CancelCommandDirective,
    SaveCommandDirective,
    RemoveCommandDirective,
    AddCommandDirective
];
const importedModules$3 = [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    GroupModule,
    NumericTextBoxModule,
    DatePickerModule
];
/**
 * @hidden
 */
class BodyModule {
    static exports() {
        return [
            CommandColumnComponent,
            CheckboxColumnComponent,
            SelectionCheckboxDirective,
            CellTemplateDirective,
            NoRecordsTemplateDirective,
            EditTemplateDirective,
            EditCommandDirective,
            CancelCommandDirective,
            SaveCommandDirective,
            RemoveCommandDirective,
            AddCommandDirective
        ];
    }
}
BodyModule.decorators = [
    { type: NgModule, args: [{
                declarations: [exported$1],
                exports: [exported$1],
                imports: [...importedModules$3]
            },] },
];

/**
 * @hidden
 */
class FooterComponent {
    constructor() {
        this.columns = [];
        this.groups = [];
        this.lockedColumnsCount = 0;
        this.logicalRowIndex = 0;
    }
    get footerClass() {
        return !this.scrollable;
    }
    get columnsToRender() {
        return columnsToRender(this.columns || []);
    }
    logicalColumnIndex(column) {
        const index = column.leafIndex;
        if (isPresent(index)) {
            return index + (isPresent(this.detailTemplate) ? 1 : 0);
        }
        return -1;
    }
}
FooterComponent.decorators = [
    { type: Component, args: [{
                selector: '[kendoGridFooter]',
                template: `
    <ng-template [ngIf]="true">
        <tr
            [class.k-footer-template]="true"
            kendoGridLogicalRow
                [logicalRowIndex]="logicalRowIndex"
                [logicalSlaveRow]="lockedColumnsCount > 0"
                [logicalCellsCount]="columns.length"
                [logicalSlaveCellsCount]="columns.length - lockedColumnsCount"
            >
            <td
                [class.k-group-cell]="true"
                role="presentation"
                *ngFor="let g of groups">
            </td>
            <td
                [class.k-hierarchy-cell]="true"
                role="presentation"
                *ngIf="detailTemplate?.templateRef">
            </td>
            <td
                *ngFor="let column of columnsToRender; let columnIndex = index"
                kendoGridLogicalCell
                    [logicalRowIndex]="logicalRowIndex"
                    [logicalColIndex]="logicalColumnIndex(column)"
                    role="columnfooter"
                    aria-selected="false"
                [ngClass]="column.footerClass"
                [ngStyle]="column.footerStyle">
                <ng-template
                    [templateContext]="{
                        templateRef: column.footerTemplateRef,
                        columnIndex: lockedColumnsCount + columnIndex,
                        column: column,
                        $implicit: column
                    }">
                </ng-template>
            </td>
        </tr>
    </ng-template>
    `
            },] },
];
FooterComponent.propDecorators = {
    columns: [{ type: Input }],
    groups: [{ type: Input }],
    detailTemplate: [{ type: Input }],
    scrollable: [{ type: Input }],
    lockedColumnsCount: [{ type: Input }],
    logicalRowIndex: [{ type: Input }],
    footerClass: [{ type: HostBinding, args: ['class.k-grid-footer',] }]
};

const exportedModules$3 = [
    FooterComponent
];
const importedModules$4 = [
    CommonModule,
    SharedModule
];
/**
 * @hidden
 */
class FooterModule {
    static exports() {
        return [];
    }
}
FooterModule.decorators = [
    { type: NgModule, args: [{
                declarations: [exportedModules$3],
                exports: [exportedModules$3],
                imports: [...importedModules$4]
            },] },
];

/**
 * @hidden
 */
class ToolbarComponent {
    constructor(grid) {
        this.grid = grid;
        this.context = {};
    }
    get classNames() {
        return 'k-header k-grid-toolbar';
    }
    set position(value) {
        this.context.position = value;
    }
    get toolbarTemplateRef() {
        return this.grid.toolbarTemplate ? this.grid.toolbarTemplate.templateRef : undefined;
    }
}
ToolbarComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-grid-toolbar',
                template: `
        <ng-template
            *ngIf="toolbarTemplateRef"
            [ngTemplateOutlet]="toolbarTemplateRef"
            [ngTemplateOutletContext]="context"
            >
        </ng-template>
    `
            },] },
];
/** @nocollapse */
ToolbarComponent.ctorParameters = () => [
    { type: GridComponent }
];
ToolbarComponent.propDecorators = {
    classNames: [{ type: HostBinding, args: ['class',] }],
    position: [{ type: Input }]
};

/**
 * @hidden
 */
class LocalEditService {
    constructor(grid, localDataChangesService) {
        this.grid = grid;
        this.localDataChangesService = localDataChangesService;
    }
    create(item) {
        if (this.hasLocalData && this.grid.skip) {
            this.localDataChangesService.data.splice(this.grid.skip, 0, item);
        }
        else {
            this.data.unshift(item);
        }
        this.dataChanged();
    }
    update(_item) { } // tslint:disable-line:no-empty
    remove(item) {
        const data = this.data;
        for (let idx = 0; idx < data.length; idx++) {
            if (item === data[idx]) {
                data.splice(idx, 1);
                this.dataChanged({ action: 'remove', item: item });
                break;
            }
        }
    }
    assignValues(target, source) {
        Object.assign(target, source);
    }
    dataChanged(args = {}) {
        if (this.hasLocalData) {
            this.localDataChangesService.changes.emit(args);
        }
    }
    get hasLocalData() {
        return Array.isArray(this.localDataChangesService.data);
    }
    get data() {
        if (this.hasLocalData) {
            return this.localDataChangesService.data;
        }
        const data = this.grid.data;
        if (Array.isArray(data)) {
            return data;
        }
        if (isDevMode()) {
            throw new Error('The default edit service of the editing directives works only when binding to plain array.' +
                'Please provide an editService.');
        }
        return [];
    }
}

/**
 * @hidden
 */
class EditingDirectiveBase {
    constructor(grid, localDataChangesService) {
        this.grid = grid;
        this.localDataChangesService = localDataChangesService;
        this.defaultEditService = this.createDefaultService();
    }
    // Consider adding support for the dependency injection of the service to allow for specifying a generic service without code.
    // The Input should still be kept.
    /**
     * The edit service that will handle the operations.
     */
    set editService(value) {
        this.userEditService = value;
    }
    get editService() {
        return this.userEditService || this.defaultEditService;
    }
    /**
     * @hidden
     */
    ngOnInit() {
        this.subscriptions = this.grid.add.subscribe(this.addHandler.bind(this));
        this.subscriptions.add(this.grid.remove.subscribe(this.removeHandler.bind(this)));
        this.subscriptions.add(this.grid.cancel.subscribe(this.cancelHandler.bind(this)));
        this.subscriptions.add(this.grid.save.subscribe(this.saveHandler.bind(this)));
        this.subscriptions.add(this.grid.dataStateChange.subscribe(this.onStateChange.bind(this)));
    }
    /**
     * @hidden
     */
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
    createDefaultService() {
        return new LocalEditService(this.grid, this.localDataChangesService);
    }
    addHandler() {
        this.grid.addRow(this.createModel({ isNew: true }));
    }
    saveHandler(args) {
        const item = this.saveModel(args);
        if (item) {
            if (args.isNew) {
                this.editService.create(item);
            }
            else {
                this.editService.update(item);
            }
        }
        this.grid.closeRow(args.rowIndex);
    }
    cancelHandler({ rowIndex }) {
        this.closeEditor(rowIndex);
    }
    removeHandler({ dataItem }) {
        const removeItem = (shouldRemove) => {
            if (shouldRemove) {
                this.editService.remove(dataItem);
            }
        };
        if (this.removeConfirmation) {
            const result = this.removeConfirmation(dataItem);
            if (result instanceof Promise) {
                result.then(removeItem);
            }
            else if (result instanceof Observable) {
                result.pipe(take(1)).subscribe(removeItem);
            }
            else {
                removeItem(result);
            }
        }
        else {
            removeItem(true);
        }
    }
    onStateChange() {
        this.closeEditor();
    }
    closeEditor(rowIndex) {
        this.grid.closeRow(rowIndex);
    }
}
EditingDirectiveBase.propDecorators = {
    editService: [{ type: Input }],
    removeConfirmation: [{ type: Input }]
};

/**
 * @hidden
 */
class LocalRowEditService extends LocalEditService {
    update(_item) {
        this.dataChanged();
    }
}

/**
 * @hidden
 */
class RowEditingDirectiveBase extends EditingDirectiveBase {
    /**
     * @hidden
     */
    ngOnInit() {
        super.ngOnInit();
        this.subscriptions
            .add(this.grid.edit.subscribe(this.editHandler.bind(this)));
    }
    createDefaultService() {
        return new LocalRowEditService(this.grid, this.localDataChangesService);
    }
    addHandler() {
        this.closeEditor();
        super.addHandler();
    }
    editHandler(args) {
        this.closeEditor();
        this.rowIndex = args.rowIndex;
        this.grid.editRow(args.rowIndex, this.createModel(args));
    }
    saveHandler(args) {
        super.saveHandler(args);
        this.clean();
    }
    closeEditor(rowIndex = this.rowIndex) {
        super.closeEditor(rowIndex);
        this.clean();
    }
    clean() {
        delete this.rowIndex;
    }
}

/**
 * A directive which encapsulates the editing operations of the Grid when using
 * the Template-Driven Angular Forms ([see example]({% slug editing_directives_grid %}#toc-the-template-directive)).
 */
class TemplateEditingDirective extends RowEditingDirectiveBase {
    constructor(grid, localDataChangesService) {
        super(grid, localDataChangesService);
        this.grid = grid;
        this.localDataChangesService = localDataChangesService;
    }
    editHandler(args) {
        super.editHandler(args);
        this.dataItem = args.dataItem;
        this.originalValues = {};
        this.editService.assignValues(this.originalValues, this.dataItem);
    }
    closeEditor(rowIndex) {
        if (this.dataItem) {
            this.editService.assignValues(this.dataItem, this.originalValues);
        }
        super.closeEditor(rowIndex);
    }
    createModel(args) {
        if (args.isNew) {
            return this.createNewItem();
        }
    }
    saveModel(args) {
        return args.dataItem;
    }
    clean() {
        super.clean();
        delete this.dataItem;
    }
}
TemplateEditingDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoGridTemplateEditing]'
            },] },
];
/** @nocollapse */
TemplateEditingDirective.ctorParameters = () => [
    { type: GridComponent },
    { type: LocalDataChangesService }
];
TemplateEditingDirective.propDecorators = {
    createNewItem: [{ type: Input, args: ['kendoGridTemplateEditing',] }]
};

/**
 * @hidden
 */
const markAllAsTouched = (control) => {
    control.markAsTouched();
    if (control.hasOwnProperty('controls')) {
        let controls = control.controls;
        for (let inner in controls) {
            if (controls.hasOwnProperty(inner)) {
                markAllAsTouched(controls[inner]);
            }
        }
    }
};

/**
 * A directive which encapsulates the editing operations of the Grid when using the
 * Reactive Forms ([see example]({% slug editing_directives_grid %}#toc-the-reactive-directive)).
 */
class ReactiveEditingDirective extends RowEditingDirectiveBase {
    constructor(grid, localDataChangesService) {
        super(grid, localDataChangesService);
        this.grid = grid;
        this.localDataChangesService = localDataChangesService;
    }
    createModel(args) {
        return this.createFormGroup(args);
    }
    saveModel({ dataItem, formGroup, isNew }) {
        if (!formGroup.dirty && !isNew) {
            return;
        }
        if (formGroup.valid) {
            this.editService.assignValues(dataItem, formGroup.value);
            return dataItem;
        }
        markAllAsTouched(formGroup);
    }
}
ReactiveEditingDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoGridReactiveEditing]'
            },] },
];
/** @nocollapse */
ReactiveEditingDirective.ctorParameters = () => [
    { type: GridComponent },
    { type: LocalDataChangesService }
];
ReactiveEditingDirective.propDecorators = {
    createFormGroup: [{ type: Input, args: ['kendoGridReactiveEditing',] }]
};

/**
 * A directive which encapsulates the editing operations of the Grid when using the in-cell
 * editing with Reactive Forms ([see example]({% slug editing_directives_grid %}#toc-the-incell-directive)).
 */
class InCellEditingDirective extends EditingDirectiveBase {
    constructor(grid, localDataChangesService) {
        super(grid, localDataChangesService);
        this.grid = grid;
        this.localDataChangesService = localDataChangesService;
    }
    // Need mixin
    createModel(args) {
        return this.createFormGroup(args);
    }
    saveModel({ dataItem, formGroup, isNew }) {
        if (!formGroup.dirty && !isNew) {
            return;
        }
        if (formGroup.valid) {
            this.editService.assignValues(dataItem, formGroup.value);
            return dataItem;
        }
        markAllAsTouched(formGroup);
    }
    /**
     * @hidden
     */
    ngOnInit() {
        super.ngOnInit();
        this.subscriptions.add(this.grid.cellClick.subscribe(this.cellClickHandler.bind(this)));
        this.subscriptions.add(this.grid.cellClose.subscribe(this.cellCloseHandler.bind(this)));
    }
    removeHandler(args) {
        super.removeHandler(args);
        this.grid.cancelCell();
    }
    cellClickHandler(args) {
        if (!args.isEdited && args.type !== 'contextmenu') {
            this.grid.editCell(args.rowIndex, args.columnIndex, this.createFormGroup(args));
        }
    }
    cellCloseHandler(args) {
        const { formGroup, dataItem } = args;
        if (!formGroup.valid) {
            args.preventDefault();
        }
        else if (formGroup.dirty) {
            this.editService.assignValues(dataItem, formGroup.value);
            this.editService.update(dataItem);
        }
    }
}
InCellEditingDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoGridInCellEditing]'
            },] },
];
/** @nocollapse */
InCellEditingDirective.ctorParameters = () => [
    { type: GridComponent },
    { type: LocalDataChangesService }
];
InCellEditingDirective.propDecorators = {
    createFormGroup: [{ type: Input, args: ['kendoGridInCellEditing',] }]
};

const hasGroups = (items) => items && items.length && items[0].field && items[0].items;
const groupDescriptorsPresent = (descriptors) => isPresent(descriptors) && descriptors.length > 0;
const processGroups = (data, state$$1) => process(data, state$$1).data;
const removeParentDescriptors = (parents, owner) => g => g.field !== owner.field && !parents.some(y => y.field === g.field);
const findGroup = (groupIndex, groups) => {
    const parents = [];
    return {
        group: groupIndex.split("_").reduce((acc, x) => {
            const idx = parseInt(x, 10);
            if (acc.items) {
                parents.push(acc);
                return acc.items[idx];
            }
            return isArray(acc) ? acc[idx] : acc;
        }, groups),
        parents
    };
};
const findChildren = (data, parents) => {
    const filters = parents.map(p => ({ field: p.field, operator: "eq", value: p.value }));
    return filterBy(data, {
        filters: filters,
        logic: "and"
    });
};
/**
 * @hidden
 */
const count = (groups, includeFooters = false) => (groups.reduce((acc, group) => {
    if (!group.skipHeader) {
        acc++;
    }
    if (group.items) {
        const children = count(group.items, includeFooters);
        if (includeFooters && children && !group.hideFooter) {
            acc++;
        }
        acc += children;
    }
    return acc;
}, 0) // tslint:disable-line:align
);
/**
 * @hidden
 */
const slice = (groups, skip, take$$1, includeFooters = false) => {
    if (!isPresent(take$$1)) {
        return groups;
    }
    const result = [];
    for (let idx = 0, length = groups.length; idx < length; idx++) {
        if (take$$1 <= 0) {
            break;
        }
        const group = groups[idx];
        const groupItems = group.items;
        let itemCount = count(groupItems, includeFooters);
        if (includeFooters && groupItems.length) {
            itemCount++;
        }
        const skipHeader = skip > 0;
        if (skip) {
            skip--;
            if (itemCount && skip >= itemCount) {
                skip -= itemCount;
                continue;
            }
        }
        if (!skipHeader || itemCount) {
            const items = [];
            let hideFooter = true;
            if (!skipHeader) {
                take$$1--;
            }
            if (take$$1) {
                if (hasGroups(groupItems)) {
                    const children = slice(groupItems, skip, take$$1, includeFooters);
                    items.push(...children);
                    take$$1 -= count(children, includeFooters);
                }
                else {
                    items.push(...groupItems.slice(skip, Math.min(skip + take$$1, groupItems.length)));
                    take$$1 -= items.length;
                }
                if (take$$1 && includeFooters) {
                    hideFooter = false;
                    take$$1--;
                }
                skip = 0;
            }
            result.push({
                aggregates: group.aggregates,
                field: group.field,
                hideFooter,
                items,
                offset: idx,
                skipHeader,
                value: group.value
            });
        }
    }
    return result;
};
const skippedHeaders = (groupItem) => {
    let total = 0;
    while (groupItem) {
        if (groupItem.skipHeader) {
            total++;
        }
        groupItem = groupItem.items && groupItem.items[0] || null;
    }
    return total;
};
/**
 * A directive which encapsulates the in-memory handling of grouping with virtual scrolling.
 */
class GroupBindingDirective extends DataBindingDirective {
    constructor(grid, changeDetector, localDataChangesService) {
        super(grid, changeDetector, localDataChangesService);
    }
    /**
     * The array of data which will be used to populate the Grid.
     */
    set kendoGridGroupBinding(value) {
        this.groups = null;
        this.grid.resetGroupsState();
        this.data = value;
    }
    /**
     * @hidden
     */
    set data(value) {
        this.originalData = value || [];
        this.dataChanged = true;
    }
    /**
     * Defines the descriptors by which the data will be sorted.
     */
    set sort(value) {
        const clear = this.state.sort !== value;
        this.grid.sort = this.state.sort = value;
        if (clear) {
            this.groups = null;
            this.grid.resetGroupsState();
        }
    }
    /**
     * Defines the descriptor by which the data will be filtered.
     */
    set filter(value) {
        const clear = diffFilters(this.state.filter, value);
        if (clear) {
            this.state.filter = value;
            this.grid.filter = cloneFilters(value);
            this.groups = null;
            this.grid.resetGroupsState();
        }
    }
    /**
     * Defines the descriptors by which the data will be grouped.
     */
    set group(value) {
        // don't clear if no groups are present in previous and current value
        const groupsPresent = groupDescriptorsPresent(this.state.group) || groupDescriptorsPresent(value);
        const clear = this.state.group !== value && groupsPresent;
        this.grid.group = this.state.group = value;
        if (clear) {
            this.groups = null;
            this.grid.resetGroupsState();
            this.skip = 0;
        }
    }
    /**
     * @hidden
     */
    ngOnInit() {
        super.ngOnInit();
        this.grid.groupExpand.subscribe(this.groupExpand.bind(this));
        this.grid.groupCollapse.subscribe(this.groupCollapse.bind(this));
    }
    groupExpand({ groupIndex }) {
        this.grid.expandGroupChildren(groupIndex);
        const { group, parents } = findGroup(groupIndex, this.groups);
        if (!group.items.length) {
            const descriptors = this.state.group.filter(removeParentDescriptors(parents, group));
            const children = findChildren(this.originalData, parents.concat(group));
            group.items = processGroups(children, {
                filter: this.state.filter,
                group: descriptors,
                sort: this.state.sort
            });
        }
        this.grid.data = this.dataResult(this.state.skip, this.state.take);
    }
    groupCollapse({ groupIndex }) {
        const { group } = findGroup(groupIndex, this.groups);
        if (group) {
            group.items = [];
        }
        this.grid.data = this.dataResult(this.state.skip, this.state.take);
    }
    process(state$$1) {
        if (state$$1.group && state$$1.group.length) {
            const groups = this.processGroups(state$$1);
            this.grid.skip -= skippedHeaders(groups.data[0]);
            return groups;
        }
        else {
            this.groups = null;
        }
        return super.process(state$$1);
    }
    processGroups(state$$1) {
        if (!this.groups || !this.groups.length) {
            this.groups = processGroups(this.originalData, {
                filter: state$$1.filter,
                group: state$$1.group,
                sort: state$$1.sort
            });
        }
        return this.dataResult(state$$1.skip, state$$1.take);
    }
    dataResult(skip, take$$1) {
        const includeFooters = this.grid.showGroupFooters;
        return {
            data: slice(this.groups, skip, take$$1, includeFooters),
            total: count(this.groups, includeFooters)
        };
    }
    applyState({ skip, take: take$$1, sort, group, filter: filter$$1 }) {
        this.skip = skip;
        this.state.take = take$$1;
        // this.pageSize = take; // do need to update take as the process with slice correctly
        this.sort = sort;
        this.group = group;
        this.filter = filter$$1;
    }
}
GroupBindingDirective.decorators = [
    { type: Directive, args: [{ selector: '[kendoGridGroupBinding]' },] },
];
/** @nocollapse */
GroupBindingDirective.ctorParameters = () => [
    { type: GridComponent },
    { type: ChangeDetectorRef },
    { type: LocalDataChangesService }
];
GroupBindingDirective.propDecorators = {
    kendoGridGroupBinding: [{ type: Input, args: ["kendoGridGroupBinding",] }],
    sort: [{ type: Input }],
    filter: [{ type: Input }],
    group: [{ type: Input }]
};

const exportedModules$4 = [
    GridComponent,
    ToolbarTemplateDirective,
    ToolbarComponent,
    DataBindingDirective,
    SelectionDirective,
    CustomMessagesComponent,
    GroupBindingDirective,
    TemplateEditingDirective,
    ReactiveEditingDirective,
    InCellEditingDirective,
    ExpandDetailsDirective,
    ...GroupModule.exports(),
    ...SharedModule.exports(),
    ...BodyModule.exports(),
    ...HeaderModule.exports(),
    ...FooterModule.exports(),
    ...PagerModule.exports(),
    ...RowFilterModule.exports(),
    ...FilterMenuModule.exports(),
    ...ColumnMenuModule.exports()
];
const declarations = [
    GridComponent,
    ListComponent,
    ToolbarComponent,
    LocalizedMessagesDirective,
    CustomMessagesComponent,
    DataBindingDirective,
    ToolbarTemplateDirective,
    SelectionDirective,
    TemplateEditingDirective,
    ReactiveEditingDirective,
    InCellEditingDirective,
    ExpandDetailsDirective,
    GroupBindingDirective,
    GridMarqueeDirective
];
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the Grid component.
 *
 * @example
 *
 * ```ts-no-run
 * // Import the Grid module
 * import { GridModule } from '@progress/kendo-angular-grid';
 *
 * // The browser platform with a compiler
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 *
 * import { NgModule } from '@angular/core';
 *
 * // Import the app component
 * import { AppComponent } from './app.component';
 *
 * // Define the app module
 * _@NgModule({
 *     declarations: [AppComponent], // declare app component
 *     imports:      [BrowserModule, GridModule], // import Grid module
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 *
 * ```
 */
class GridModule {
}
GridModule.decorators = [
    { type: NgModule, args: [{
                declarations: [declarations],
                exports: [exportedModules$4],
                imports: [
                    CommonModule,
                    GroupModule,
                    SharedModule,
                    BodyModule,
                    HeaderModule,
                    FooterModule,
                    PagerModule,
                    RowFilterModule,
                    FilterMenuModule,
                    ResizeSensorModule,
                    ColumnMenuModule
                ]
            },] },
];

class PDFMarginComponent$1 extends PDFMarginComponent {
}
PDFMarginComponent$1.decorators = [
    { type: Component, args: [{
                selector: 'kendo-grid-pdf-margin',
                template: ''
            },] },
];

/**
 * Represents the PDF page template of the Grid that helps to customize the PDF pages. To define a page template,
 * nest an `<ng-template>` tag with the `kendoGridPDFTemplate` directive inside `<kendo-grid-pdf>`.
 *
 * The template context provides the following fields:
 * - `pageNumber`&mdash;Defines PDF page number.
 * - `totalPages`&mdash;Defines the total number of PDF pages.
 *
 * @example
 * ```ts-preview
 *
 * _@Component({
 *     selector: 'my-app',
 *     template: `
 *         <kendo-grid [data]="gridData">
 *             <ng-template kendoGridToolbarTemplate>
 *                 <button kendoGridPDFCommand icon="file-pdf">Export to PDF</button>
 *             </ng-template>
 *             <kendo-grid-column field="ProductName">
 *             </kendo-grid-column>
 *              <kendo-grid-column field="UnitPrice">
 *             </kendo-grid-column>
 *             <kendo-grid-pdf fileName="Products.pdf" paperSize="A4" [margin]="{ top: '1cm', left: '1cm', right: '1cm', bottom: '1cm' }">
 *                 <ng-template kendoGridPDFTemplate let-pageNum="pageNum" let-totalPages="totalPages">
 *                     <div style="position: absolute;top: 5px; left: 5px;">
 *                         Page {{ pageNum }} of {{ totalPages }}
 *                     </div>
 *                 </ng-template>
 *             </kendo-grid-pdf>
 *         </kendo-grid>
 *     `
 * })
 *
 * class AppComponent {
 *     public gridData = [{
 *         "ProductID": 1,
 *         "ProductName": "Chai",
 *         "UnitPrice": 18.0000
 *       }, {
 *         "ProductID": 2,
 *         "ProductName": "Chang",
 *         "UnitPrice": 19.0000
 *       }
 *     ];
 * }
 *
 * ```
 */
class PDFTemplateDirective$1 extends PDFTemplateDirective {
    constructor(templateRef) {
        super(templateRef);
    }
}
PDFTemplateDirective$1.decorators = [
    { type: Directive, args: [{
                selector: '[kendoGridPDFTemplate]'
            },] },
];
/** @nocollapse */
PDFTemplateDirective$1.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] }
];

/**
 * @hidden
 */
const HEADER_CLASS = 'k-grid-header';
/**
 * @hidden
 */
const FOOTER_CLASS = 'k-grid-footer';
const GRID_LIST = 'KENDO-GRID-LIST';
const TABLE = 'TABLE';
const matchesList = matchesNodeName(GRID_LIST);
const matchesTable = matchesNodeName(TABLE);
const suffix = (locked) => locked ? 'locked' : 'wrap';
/**
 * @hidden
 */
class GridQuery {
    constructor(element) {
        this.element = element;
        this.list = findElement(element, matchesList);
    }
    content(locked) {
        return findElement(this.list, matchesClasses(`k-grid-content${locked ? '-locked' : ''}`));
    }
    header(locked) {
        this.headerWrap = this.headerWrap || findElement(this.element, matchesClasses(HEADER_CLASS));
        return findElement(this.headerWrap, matchesClasses(`${HEADER_CLASS}-${suffix(locked)}`));
    }
    footer(locked) {
        this.footerWrap = this.footerWrap || findElement(this.element, matchesClasses(FOOTER_CLASS));
        return findElement(this.footerWrap, matchesClasses(`${FOOTER_CLASS}-${suffix(locked)}`));
    }
    table() {
        return findElement(this.element, matchesTable);
    }
}

const FIRST_CLASS = 'k-first';
const INPUTS = ['input', 'select', 'textarea', 'option'];
/** @hidden */
const cloneNode = (node) => {
    const clone = node.cloneNode(false);
    if (node._kendoExportVisual) {
        clone._kendoExportVisual = node._kendoExportVisual;
    }
    if (INPUTS.indexOf(String(node.nodeName).toLowerCase()) >= 0) {
        clone.removeAttribute("id");
        clone.removeAttribute("name");
        clone.value = node.value;
        clone.checked = node.checked;
        clone.selected = node.selected;
    }
    let child = node.firstChild;
    while (child) {
        clone.appendChild(cloneNode(child));
        child = child.nextSibling;
    }
    return clone;
};
const appendNodes = (element, nodes) => {
    const length = nodes.length;
    for (let idx = 0; idx < length; idx++) {
        element.appendChild(cloneNode(nodes[idx]));
    }
};
const wrapTable = (table) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'k-widget k-grid';
    wrapper.appendChild(table);
    return wrapper;
};
const createTableElement = (sources) => {
    const sourceCount = sources.length;
    const element = cloneNode(sources[0]);
    const rowsCount = element.rows.length;
    if (sourceCount > 1) {
        for (let rowIdx = 0; rowIdx < rowsCount; rowIdx++) {
            for (let sourceIdx = 1; sourceIdx < sourceCount; sourceIdx++) {
                appendNodes(element.rows[rowIdx], sources[sourceIdx].rows[rowIdx].cells);
            }
        }
    }
    return element;
};
const setFirstCellClass = (header, headers) => {
    if (headers.length > 1 && header.rows.length > 1) {
        for (let idx = 1; idx < header.rows.length; idx++) {
            const firstCellIndex = headers[0].rows[idx].cells.length;
            const cell = header.rows[idx].cells[firstCellIndex];
            if (String(cell.className).indexOf(FIRST_CLASS) === -1) {
                cell.className += ` ${FIRST_CLASS}`;
            }
        }
    }
};
const createTable = (colGroups, headers, bodies, footers) => {
    const table = document.createElement('table');
    const colGroup = colGroups[0].cloneNode(true);
    for (let idx = 1; idx < colGroups.length; idx++) {
        appendNodes(colGroup, colGroups[idx].querySelectorAll('col'));
    }
    const header = createTableElement(headers);
    const body = createTableElement(bodies);
    header.className = HEADER_CLASS;
    setFirstCellClass(header, headers);
    table.appendChild(colGroup);
    table.appendChild(header);
    table.appendChild(body);
    if (footers.length) {
        const footer = createTableElement(footers);
        footer.className = FOOTER_CLASS;
        table.appendChild(footer);
    }
    return wrapTable(table);
};
/**
 * @hidden
 */
const exportElement = (wrapper) => {
    const query = new GridQuery(wrapper);
    const content = query.content();
    let result;
    if (content) {
        const colGroups = [content.querySelector('colgroup')];
        const headers = [query.header().querySelector('thead')];
        const bodies = [content.querySelector('tbody')];
        const footer = query.footer();
        const footers = [];
        if (footer) {
            footers.push(footer.querySelector('tfoot'));
        }
        const lockedContent = query.content(true);
        if (lockedContent) {
            colGroups.unshift(lockedContent.querySelector('colgroup'));
            headers.unshift(query.header(true).querySelector('thead'));
            bodies.unshift(lockedContent.querySelector('tbody'));
            if (footer) {
                footers.unshift(query.footer(true).querySelector('tfoot'));
            }
        }
        result = createTable(colGroups, headers, bodies, footers);
    }
    else {
        result = wrapTable(query.table().cloneNode(true));
    }
    return result;
};

const createElement$1 = (tagName, className) => {
    const element = document.createElement(tagName);
    if (className) {
        element.className = className;
    }
    return element;
};
const createDiv = (className) => {
    return createElement$1('div', className);
};
/**
 * Configures the settings for the export of Grid in PDF ([see example]({% slug pdfexport_grid %})).
 */
class PDFComponent extends PDFExportComponent {
    constructor(pdfService, suspendService, ngZone, element) {
        super(element);
        this.pdfService = pdfService;
        this.suspendService = suspendService;
        this.ngZone = ngZone;
        this.columns = new QueryList();
        this.saveSubscription = pdfService.savePDF.subscribe(this.savePDF.bind(this));
        this.drawSubscription = pdfService.drawPDF.subscribe(this.drawPDF.bind(this));
        this.reset = this.reset.bind(this);
        this.draw = this.draw.bind(this);
    }
    ngOnDestroy() {
        this.saveSubscription.unsubscribe();
        this.drawSubscription.unsubscribe();
        this.reset();
    }
    savePDF(component) {
        this.createPDF(component, this.draw);
    }
    drawPDF({ component, promise }) {
        this.createPDF(component, () => {
            this.createExportGroup(promise);
        });
    }
    createPDF(component, callback) {
        const pageSize = component.pageSize;
        const total = component.view.total;
        const columns = this.columns.toArray();
        if (columns.length) {
            this.originalColumns = component.columns.toArray();
        }
        this.component = component;
        this.suspendService.scroll = true;
        this.pdfService.exporting = true;
        this.initProgress();
        this.renderAllPages = this.allPages && pageSize < total;
        if (this.renderAllPages) {
            this.skip = component.skip;
            this.pageSize = pageSize;
            this.changePage(0, total, callback, columns);
        }
        else if (columns.length || component.virtualColumns) {
            this.changeColumns(columns, callback);
        }
        else {
            callback();
        }
    }
    initProgress() {
        const wrapperElement = this.component.wrapper.nativeElement;
        const progress = this.progress = createDiv('k-loading-pdf-mask');
        const overlay = cloneNode(wrapperElement);
        progress.appendChild(overlay);
        progress.appendChild(createDiv('k-loading-color'));
        progress.appendChild(createElement$1('span', 'k-i-loading k-icon'));
        this.originalHeight = wrapperElement.style.height;
        this.originalOverflow = wrapperElement.style.overflow;
        wrapperElement.style.height = wrapperElement.offsetHeight + 'px';
        wrapperElement.style.overflow = 'hidden';
        wrapperElement.appendChild(progress);
        this.applyScroll(overlay);
    }
    applyScroll(overlay) {
        const query = new GridQuery(this.component.wrapper.nativeElement);
        const content = query.content();
        if (content) {
            const overlayQuery = new GridQuery(overlay);
            const overlayContent = overlayQuery.content();
            overlayContent.scrollTop = content.scrollTop;
            overlayContent.scrollLeft = content.scrollLeft;
            overlayQuery.header().scrollLeft = query.header().scrollLeft;
            const footer = query.footer();
            if (footer) {
                overlayQuery.footer().scrollLeft = footer.scrollLeft;
            }
            const lockedContent = query.content(true);
            if (lockedContent) {
                const overlayLockedContent = overlayQuery.content(true);
                overlayLockedContent.scrollTop = lockedContent.scrollTop;
                overlayLockedContent.scrollLeft = lockedContent.scrollLeft;
            }
        }
    }
    draw() {
        this.createExportElement((element) => {
            this.save(element, this.fileName);
        });
    }
    createExportGroup(promise) {
        this.createExportElement((element) => {
            this.exportElement(element).then(group => promise.resolve(group));
        });
    }
    createExportElement(callback) {
        this.ngZone.runOutsideAngular(() => {
            const container = this.container = createDiv('k-grid-pdf-export-element');
            const element = exportElement(this.component.wrapper.nativeElement);
            container.appendChild(element);
            document.body.appendChild(container);
            callback(element);
        });
    }
    drawOptions() {
        const options = super.drawOptions();
        options._destructive = true;
        return options;
    }
    cleanup() {
        super.cleanup();
        this.pdfService.exporting = false;
        if (this.component) {
            const originalColumns = this.originalColumns;
            delete this.originalColumns;
            if (this.renderAllPages) {
                this.changePage(this.skip, this.pageSize, this.reset, originalColumns);
            }
            else if (originalColumns || this.component.virtualColumns) {
                this.changeColumns(originalColumns, this.reset);
            }
            else {
                this.reset();
            }
        }
        else {
            this.reset();
        }
        this.removeContainer();
    }
    removeContainer() {
        if (this.container) {
            document.body.removeChild(this.container);
            delete this.container;
        }
    }
    changePage(skip, _take, callback, columns) {
        this.ngZone.run(() => {
            this.pdfService.dataChanged.pipe(take(1)).subscribe(() => {
                if ((columns && columns.length) || this.component.virtualColumns) {
                    this.changeColumns(columns, callback);
                }
                else {
                    this.onStable(callback);
                }
            });
            this.component.notifyPageChange('pdf', { skip: skip, take: _take });
        });
    }
    changeColumns(columns, callback) {
        this.ngZone.run(() => {
            this.onStable(callback);
            if (columns && columns.length) {
                this.component.columns.reset(columns);
            }
        });
    }
    reset() {
        this.suspendService.scroll = false;
        this.renderAllPages = false;
        if (!this.component) {
            return;
        }
        const wrapperElement = this.component.wrapper.nativeElement;
        wrapperElement.removeChild(this.progress);
        wrapperElement.style.height = this.originalHeight;
        wrapperElement.style.overflow = this.originalOverflow;
        delete this.progress;
        delete this.component;
    }
    onStable(callback) {
        // not sure if it is an actual scenario. occurs in the tests.
        // onStable is triggered in the same pass without the change detection.
        // thus, the callback is called before the changes are applied without the timeout.
        setTimeout(() => {
            this.ngZone.onStable.asObservable().pipe(take(1)).subscribe(callback);
        }, 0); // tslint:disable-line: align
    }
}
PDFComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-grid-pdf',
                template: ''
            },] },
];
/** @nocollapse */
PDFComponent.ctorParameters = () => [
    { type: PDFService },
    { type: SuspendService },
    { type: NgZone },
    { type: ElementRef }
];
PDFComponent.propDecorators = {
    allPages: [{ type: Input }],
    columns: [{ type: ContentChildren, args: [ColumnBase$1,] }],
    marginComponent: [{ type: ContentChild, args: [PDFMarginComponent$1,] }],
    pageTemplateDirective: [{ type: ContentChild, args: [PDFTemplateDirective$1,] }]
};

/**
 * Represents the `export-to-PDF` command of the Grid.
 * You can apply this directive to any `button` element inside a
 * [`ToolbarTemplate`]({% slug api_grid_commandcolumncomponent %}).
 * When the user clicks a button that is associated with the directive, the
 * [`pdfExport`]({% slug api_grid_gridcomponent %}#toc-pdfexport) event
 * fires ([see example]({% slug pdfexport_grid %})).
 *
 * @example
 * ```html-no-run
 * <kendo-grid>
 *      <ng-template kendoGridToolbarTemplate>
 *          <button kendoGridPDFCommand>Export to PDF</button>
 *      </ng-template>
 *      <kendo-grid-pdf fileName="Grid.pdf">
 *      </kendo-grid-pdf>
 * </kendo-grid>
 * ```
 */
class PDFCommandDirective extends Button {
    constructor(pdfService, element, renderer, localization, ngZone) {
        super(element, renderer, null, localization, ngZone);
        this.pdfService = pdfService;
        this.ngZone = ngZone;
    }
    /**
     * @hidden
     */
    onClick(e) {
        e.preventDefault();
        this.pdfService.exportClick.emit();
    }
    /**
     * @hidden
     */
    get pdfClass() {
        return true;
    }
}
PDFCommandDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoGridPDFCommand]'
            },] },
];
/** @nocollapse */
PDFCommandDirective.ctorParameters = () => [
    { type: PDFService },
    { type: ElementRef },
    { type: Renderer2 },
    { type: LocalizationService },
    { type: NgZone }
];
PDFCommandDirective.propDecorators = {
    onClick: [{ type: HostListener, args: ['click', ['$event'],] }],
    pdfClass: [{ type: HostBinding, args: ['class.k-grid-pdf',] }]
};

const exportedModules$5 = [
    PDFComponent,
    PDFMarginComponent$1,
    PDFCommandDirective,
    PDFTemplateDirective$1
];
const declarations$1 = [
    PDFComponent,
    PDFMarginComponent$1,
    PDFCommandDirective,
    PDFTemplateDirective$1
];
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the Grid PDF component.
 *
 * @example
 *
 * ```ts-no-run
 * // Import the Grid and PDF modules
 * import { GridModule, PDFModule } from '@progress/kendo-angular-grid';
 *
 * // The browser platform with a compiler
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 *
 * import { NgModule } from '@angular/core';
 *
 * // Import the app component
 * import { AppComponent } from './app.component';
 *
 * // Define the app module
 * _@NgModule({
 *     declarations: [AppComponent], // declare app component
 *     imports:      [BrowserModule, GridModule, PDFModule], // import Grid and PDF modules
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 *
 * ```
 */
class PDFModule {
}
PDFModule.decorators = [
    { type: NgModule, args: [{
                declarations: [declarations$1],
                exports: [exportedModules$5]
            },] },
];

/**
 * Arguments for the `excelExport` event.
 */
class ExcelExportEvent extends PreventableEvent {
    constructor(workbook) {
        super();
        this.workbook = workbook;
    }
}

/* tslint:disable object-literal-sort-keys */
const fetchComponentData = (component) => {
    return {
        data: component.view.map(item => item),
        group: component.group
    };
};
const toExcelColumn = (column) => {
    return {
        title: column.title,
        field: column.field,
        locked: Boolean(column.locked),
        width: column.width,
        level: column.level,
        hidden: !column.isVisible,
        groupHeaderTemplate: column.groupHeaderTemplate,
        groupHeaderColumnTemplate: column.groupHeaderColumnTemplate,
        groupFooterTemplate: column.groupFooterTemplate,
        footerTemplate: column.footerTemplate
    };
};
const toExcelColumns = (columns) => {
    const result = [];
    sortColumns(columns)
        .forEach((column) => {
        if (column.isSpanColumn) {
            result.push(...toExcelColumns(column.childrenArray));
        }
        else {
            const excelColumn = toExcelColumn(column);
            if (column.isColumnGroup) {
                excelColumn.children = [excelColumn].concat(toExcelColumns(column.childrenArray));
            }
            result.push(excelColumn);
        }
    });
    return result;
};
const componentColumns = (component) => {
    const columns = toExcelColumns(component.columns.toArray());
    return orderBy(columns, [{ field: 'locked', dir: 'desc' }]);
};
/**
 * Configures the settings for the export of Grid in Excel ([see example]({% slug excelexport_grid %})).
 */
class ExcelComponent {
    constructor(excelService, localization, zone) {
        this.localization = localization;
        this.zone = zone;
        /**
         * Specifies the file name of the exported Excel file.
         * @default "Export.xlsx"
         */
        this.fileName = 'Export.xlsx';
        /**
         * @hidden
         */
        this.columns = new QueryList();
        this.saveSubscription = excelService.saveToExcel.subscribe(this.save.bind(this));
    }
    ngOnDestroy() {
        this.saveSubscription.unsubscribe();
        if (this.dataSubscription) {
            this.dataSubscription.unsubscribe();
        }
    }
    save(component) {
        const data = (this.fetchData || fetchComponentData)(component);
        const exportData = (result) => {
            delete this.dataSubscription;
            this.exportData(component, result);
        };
        if (data instanceof Promise) {
            data.then(exportData);
        }
        else if (data instanceof Observable) {
            this.dataSubscription = data.pipe(take(1)).subscribe(exportData);
        }
        else {
            exportData(data);
        }
    }
    exportData(component, result) {
        const options = workbookOptions({
            columns: this.columns.length ? this.columns : componentColumns(component),
            data: result.data,
            group: result.group,
            filterable: this.filterable,
            creator: this.creator,
            date: this.date,
            paddingCellOptions: this.paddingCellOptions,
            headerPaddingCellOptions: this.headerPaddingCellOptions,
            rtl: this.localization.rtl,
            collapsible: this.collapsible
        });
        const args = new ExcelExportEvent(options);
        component.excelExport.emit(args);
        if (!args.isDefaultPrevented()) {
            this.zone.runOutsideAngular(() => this.saveFile(options));
        }
    }
    saveFile(options) {
        toDataURL(options).then((dataURL) => {
            saveAs(dataURL, this.fileName, {
                forceProxy: this.forceProxy,
                proxyURL: this.proxyURL
            });
        });
    }
}
ExcelComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-grid-excel',
                template: ``
            },] },
];
/** @nocollapse */
ExcelComponent.ctorParameters = () => [
    { type: ExcelService },
    { type: LocalizationService },
    { type: NgZone }
];
ExcelComponent.propDecorators = {
    fileName: [{ type: Input }],
    filterable: [{ type: Input }],
    creator: [{ type: Input }],
    date: [{ type: Input }],
    forceProxy: [{ type: Input }],
    proxyURL: [{ type: Input }],
    fetchData: [{ type: Input }],
    paddingCellOptions: [{ type: Input }],
    headerPaddingCellOptions: [{ type: Input }],
    collapsible: [{ type: Input }],
    columns: [{ type: ContentChildren, args: [ColumnBase, { descendants: true },] }]
};

/**
 * Represents the `export-to-Excel` command of the Grid. You can apply this
 * directive to any `button` element inside a
 * [`ToolbarTemplate`]({% slug api_grid_commandcolumncomponent %}).
 * When the user clicks a button associated with the directive, the
 * [`excelExport`]({% slug api_grid_gridcomponent %}#toc-excelexport) event
 * fires ([see example]({% slug excelexport_grid %})).
 *
 * @example
 * ```html-no-run
 * <kendo-grid>
 *      <ng-template kendoGridToolbarTemplate>
 *          <button kendoGridExcelCommand>Export to PDF</button>
 *      </ng-template>
 *      <kendo-grid-excel fileName="Grid.xlsx">
 *      </kendo-grid-excel>
 * </kendo-grid>
 * ```
 */
class ExcelCommandDirective extends Button {
    constructor(excelService, element, renderer, localization, ngZone) {
        super(element, renderer, null, localization, ngZone);
        this.excelService = excelService;
        this.ngZone = ngZone;
    }
    /**
     * @hidden
     */
    onClick(e) {
        e.preventDefault();
        this.excelService.exportClick.emit();
    }
    /**
     * @hidden
     */
    get excelClass() {
        return true;
    }
}
ExcelCommandDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoGridExcelCommand]'
            },] },
];
/** @nocollapse */
ExcelCommandDirective.ctorParameters = () => [
    { type: ExcelService },
    { type: ElementRef },
    { type: Renderer2 },
    { type: LocalizationService },
    { type: NgZone }
];
ExcelCommandDirective.propDecorators = {
    onClick: [{ type: HostListener, args: ['click', ['$event'],] }],
    excelClass: [{ type: HostBinding, args: ['class.k-grid-excel',] }]
};

const declarations$2 = [ExcelComponent, ExcelCommandDirective];
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the Excel component of the Grid.
 *
 * @example
 *
 * ```ts-no-run
 * // Import the Grid and Excel modules
 * import { GridModule, ExcelModule } from '@progress/kendo-angular-grid';
 *
 * // The browser platform with a compiler
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 *
 * import { NgModule } from '@angular/core';
 *
 * // Import the app component
 * import { AppComponent } from './app.component';
 *
 * // Define the app module
 * _@NgModule({
 *     declarations: [AppComponent], // declare app component
 *     imports:      [BrowserModule, GridModule, ExcelModule], // import Grid and Excel modules
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 *
 * ```
 */
class ExcelModule {
}
ExcelModule.decorators = [
    { type: NgModule, args: [{
                declarations: [declarations$2],
                exports: [declarations$2, ExcelExportModule]
            },] },
];

/**
 * Generated bundle index. Do not edit.
 */

export { ColumnChooserComponent, ColumnListComponent, ColumnMenuChooserComponent, ColumnMenuFilterComponent, ColumnMenuItemBase, ColumnMenuItemContentTemplateDirective, ColumnMenuItemComponent, ColumnMenuLockComponent, ColumnMenuSortComponent, ColumnMenuTemplateDirective, ColumnMenuModule, ColumnMenuService, ColumnHandleDirective, ColumnResizingService, TableDirective, ColumnInfoService, DomEventsService, ExpandStateService, IdService, PreventableEvent, SortService, ChangeNotificationService, ColumnReorderService, DragAndDropModule, DragAndDropService, DragHintService, DraggableColumnDirective, DropCueService, DropTargetDirective, EditingDirectiveBase, RowEditingDirectiveBase, AddCommandDirective, CancelCommandDirective, EditCommandDirective, EditService as EditService$1, LocalDataChangesService, RemoveCommandDirective, SaveCommandDirective, ExcelCommandDirective, BooleanFilterComponent, BooleanFilterCellComponent, FilterCellHostDirective, FilterCellOperatorsComponent, FilterCellWrapperComponent, DateFilterComponent, FilterHostDirective, FilterInputWrapperComponent, FilterInputDirective, FilterRowComponent, DateFilterMenuInputComponent, FilterMenuContainerComponent, FilterMenuHostDirective, FilterMenuInputWrapperComponent, FilterMenuComponent, NumericFilterMenuInputComponent, StringFilterMenuInputComponent, NumericFilterComponent, FilterOperatorBase, SharedFilterModule, StringFilterComponent, GroupHeaderComponent, GroupIndicatorComponent, GroupInfoService, GroupPanelComponent, GroupsService, BrowserSupportService, ResizeService, ResponsiveService, LocalizedMessagesDirective, Messages, FocusGroup, FocusRoot, LogicalCellDirective, LogicalRowDirective, NavigationService, PagerContextService, PagerElementComponent, PDFCommandDirective, PDFTemplateDirective$1 as PDFTemplateDirective, CellComponent, CELL_CONTEXT, EMPTY_CELL_CONTEXT, FieldAccessorPipe, DetailsService, DEFAULT_SCROLLER_FACTORY, SCROLLER_FACTORY_TOKEN, ScrollRequestService, ScrollSyncService, ScrollerService, CellSelectionService, GridMarqueeDirective, SelectAllCheckboxDirective, SelectionCheckboxDirective, Selection, SelectionService, GridModule, SharedModule, GridComponent, ColumnBase$1 as ColumnBase, ColumnComponent, CommandColumnComponent, SpanColumnComponent, ColumnGroupComponent, CheckboxColumnComponent, ToolbarComponent, ToolbarTemplateDirective, CellTemplateDirective, HeaderTemplateDirective, FooterTemplateDirective, PagerTemplateDirective, ExpandDetailsDirective, DetailTemplateDirective, DetailExpandEvent, DetailCollapseEvent, GroupHeaderTemplateDirective, GroupHeaderColumnTemplateDirective, GroupFooterTemplateDirective, ResizableContainerDirective, TemplateContextDirective, NoRecordsTemplateDirective, DataBindingDirective, SelectionDirective, FilterService, FilterCellTemplateDirective, FilterCellComponent, StringFilterCellComponent, DateFilterCellComponent, BaseFilterCellComponent, FilterMenuTemplateDirective, NumericFilterMenuComponent, StringFilterMenuComponent, DateFilterMenuComponent, BooleanFilterMenuComponent, BeforeEqFilterOperatorComponent, BeforeFilterOperatorComponent, AfterEqFilterOperatorComponent, AfterFilterOperatorComponent, ContainsFilterOperatorComponent, DoesNotContainFilterOperatorComponent, EndsWithFilterOperatorComponent, EqualFilterOperatorComponent, IsEmptyFilterOperatorComponent, IsNotEmptyFilterOperatorComponent, IsNotNullFilterOperatorComponent, IsNullFilterOperatorComponent, NotEqualFilterOperatorComponent, StartsWithFilterOperatorComponent, NumericFilterCellComponent, AutoCompleteFilterCellComponent, GreaterFilterOperatorComponent, GreaterOrEqualToFilterOperatorComponent, LessOrEqualToFilterOperatorComponent, LessFilterOperatorComponent, PagerPrevButtonsComponent, PagerNextButtonsComponent, PagerNumericButtonsComponent, PagerInputComponent, PagerInfoComponent, PagerPageSizesComponent, RowFilterModule, FilterMenuModule, BodyModule, GroupModule, HeaderModule, FooterModule, PagerModule, TemplateEditingDirective, ReactiveEditingDirective, InCellEditingDirective, EditTemplateDirective, ColGroupComponent, HeaderComponent, ListComponent, FooterComponent, TableBodyComponent, PagerComponent, CustomMessagesComponent, LoadingComponent, PDFModule, PDFComponent, PDFMarginComponent$1 as PDFMarginComponent, PDFService, ExcelModule, ExcelComponent, ExcelService, ExcelExportEvent, CellCloseEvent, SuspendService, GroupBindingDirective, slice, count, Skip, ColumnReorderEvent, FocusableDirective, ColumnVisibilityChangeEvent, ColumnMenuComponent, SinglePopupService, PopupCloseEvent };
