/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { EventEmitter, Injectable, InjectionToken, Directive, Optional, Inject, SkipSelf, ElementRef, Renderer2, NgZone, ChangeDetectorRef, HostBinding, TemplateRef, Input, ContentChildren, ContentChild, QueryList, Component, forwardRef, Host, Output, isDevMode, SecurityContext, ViewEncapsulation, ViewChild, ViewChildren, Self, ViewContainerRef, Pipe, NgModule, ComponentFactoryResolver, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { isDocumentAvailable, Keys, DraggableDirective, isChanged, anyChanged, hasObservers, ResizeSensorComponent, DraggableModule, EventsModule, guid, ResizeSensorModule } from '@progress/kendo-angular-common';
import { merge, of, Subject, from, Subscription, interval, fromEvent, zip, BehaviorSubject, Observable } from 'rxjs';
import { LocalizationService, L10N_PREFIX, ComponentMessages } from '@progress/kendo-angular-l10n';
import { switchMap, take, map, filter, takeUntil, switchMapTo, delay, auditTime, distinctUntilChanged, tap, throttleTime, debounceTime, bufferCount } from 'rxjs/operators';
import { __extends, __assign } from 'tslib';
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
var DomEventsService = /** @class */ (function () {
    function DomEventsService() {
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
    DomEventsService.decorators = [
        { type: Injectable },
    ];
    return DomEventsService;
}());

var EMPTY_REGEX = /^\s*$/;
/**
 * @hidden
 */
var isPresent = function (value) { return value !== null && value !== undefined; };
/**
 * @hidden
 */
var isBlank = function (value) { return value === null || value === undefined; };
/**
 * @hidden
 */
var isArray = function (value) { return Array.isArray(value); };
/**
 * @hidden
 */
var isTruthy = function (value) { return !!value; };
/**
 * @hidden
 */
var isNullOrEmptyString = function (value) { return isBlank(value) || EMPTY_REGEX.test(value); };
/**
 * @hidden
 */
var observe = function (list) {
    return merge(of(list), list.changes);
};
/**
 * @hidden
 */
var isUniversal = function () { return typeof document === 'undefined'; };
/**
 * @hidden
 */
var isString = function (value) {
    return typeof value === 'string';
};
/**
 * @hidden
 */
var isNumber = function (value) { return typeof value === "number" && !isNaN(value); };
/**
 * @hidden
 */
var extractFormat = function (format) {
    if (isString(format) && !isNullOrEmptyString(format) && format.startsWith('{0:')) {
        return format.slice(3, format.length - 1);
    }
    return format;
};
/**
 * @hidden
 */
var not = function (fn) { return function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return !fn.apply(null, args);
}; };
/**
 * @hidden
 */
var or = function () {
    var conditions = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        conditions[_i] = arguments[_i];
    }
    return function (value) { return conditions.reduce(function (acc, x) { return acc || x(value); }, false); };
};
/**
 * @hidden
 */
var and = function () {
    var conditions = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        conditions[_i] = arguments[_i];
    }
    return function (value) { return conditions.reduce(function (acc, x) { return acc && x(value); }, true); };
};
/**
 * @hidden
 */
var Skip = new InjectionToken("Skip"); // tslint:disable-line:variable-name
/**
 * @hidden
 */
var createPromise = function () {
    var resolveFn, rejectFn;
    var promise = new Promise(function (resolve, reject) {
        resolveFn = function (data) {
            resolve(data);
            return promise;
        };
        rejectFn = function (data) {
            reject(data);
            return promise;
        };
    });
    promise.resolve = resolveFn;
    promise.reject = rejectFn;
    return promise;
};
/** @hidden */
var iterator = getIterator();
// TODO: Move to kendo-common
function getIterator() {
    if (typeof Symbol === 'function' && Symbol.iterator) {
        return Symbol.iterator;
    }
    var keys = Object.getOwnPropertyNames(Map.prototype);
    var proto = Map.prototype;
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        if (key !== 'entries' && key !== 'size' && proto[key] === proto.entries) {
            return key;
        }
    }
}
var FRAME_DURATION = 1000 / 60;
var wnd = typeof window !== 'undefined' ? window : {};
/** @hidden */
var requestAnimationFrame = wnd.requestAnimationFrame || wnd.msRequestAnimationFrame || (function (callback) { return setTimeout(callback, FRAME_DURATION); });
/** @hidden */
var cancelAnimationFrame = wnd.cancelAnimationFrame || wnd.msCancelRequestAnimationFrame || clearTimeout;
/**
 * @hidden
 */
var detectIE = function () {
    if (!isDocumentAvailable()) {
        return;
    }
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf('MSIE ');
    var trident = ua.indexOf('Trident/');
    return msie > 0 || trident > 0;
};

/**
 * @hidden
 */
var LocalDataChangesService = /** @class */ (function () {
    function LocalDataChangesService() {
        this.changes = new EventEmitter();
    }
    LocalDataChangesService.decorators = [
        { type: Injectable },
    ];
    return LocalDataChangesService;
}());

/**
 * @hidden
 */
var FocusRoot = /** @class */ (function () {
    function FocusRoot() {
        this.groups = new Set();
    }
    FocusRoot.prototype.registerGroup = function (group) {
        if (this.alive) {
            this.groups.add(group);
        }
    };
    FocusRoot.prototype.unregisterGroup = function (group) {
        if (this.alive) {
            this.groups.delete(group);
        }
    };
    FocusRoot.prototype.activate = function () {
        if (this.alive) {
            this.groups.forEach(function (f) { return f.activate(); });
        }
    };
    FocusRoot.prototype.deactivate = function () {
        if (this.alive) {
            this.groups.forEach(function (f) { return f.deactivate(); });
        }
    };
    FocusRoot.decorators = [
        { type: Injectable },
    ];
    return FocusRoot;
}());

var focusableRegex = /^(?:a|input|select|option|textarea|button|object)$/i;
var NODE_NAME_PREDICATES = {};
var toClassList = function (classNames) { return String(classNames).trim().split(' '); };
/**
 * @hidden
 */
var hasClasses = function (element, classNames) {
    var namesList = toClassList(classNames);
    return Boolean(toClassList(element.className).find(function (className) { return namesList.indexOf(className) >= 0; }));
};
/**
 * @hidden
 */
var matchesClasses = function (classNames) {
    return function (element) { return hasClasses(element, classNames); };
};
/**
 * @hidden
 */
var matchesNodeName = function (nodeName) {
    if (!NODE_NAME_PREDICATES[nodeName]) {
        NODE_NAME_PREDICATES[nodeName] = function (element) {
            return String(element.nodeName).toLowerCase() === nodeName.toLowerCase();
        };
    }
    return NODE_NAME_PREDICATES[nodeName];
};
/**
 * @hidden
 */
var closest = function (node, predicate) {
    while (node && !predicate(node)) {
        node = node.parentNode;
    }
    return node;
};
/**
 * @hidden
 */
var closestInScope = function (node, predicate, scope) {
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
var contains = function (parent, node, matchSelf) {
    if (matchSelf === void 0) { matchSelf = false; }
    var outside = !closest(node, function (child) { return child === parent; });
    if (outside) {
        return false;
    }
    var el = closest(node, function (child) { return child === node; });
    return el && (matchSelf || el !== parent);
};
/**
 * @hidden
 */
var isVisible = function (element) {
    var rect = element.getBoundingClientRect();
    var hasSize = rect.width > 0 && rect.height > 0;
    var hasPosition = rect.x !== 0 && rect.y !== 0;
    // Elements can have zero size due to styling, but they will still count as visible.
    // For example, the selection checkbox has no size, but is made visible through styling.
    return (hasSize || hasPosition) && window.getComputedStyle(element).visibility !== 'hidden';
};
/**
 * @hidden
 */
var isFocusable = function (element) {
    if (!element.tagName) {
        return false;
    }
    var tagName = element.tagName.toLowerCase();
    var hasTabIndex = Boolean(element.getAttribute('tabIndex'));
    var focusable = !element.disabled && focusableRegex.test(tagName);
    return focusable || hasTabIndex;
};
/**
 * @hidden
 */
var isFocusableWithTabKey = function (element, checkVisibility) {
    if (checkVisibility === void 0) { checkVisibility = true; }
    if (!isFocusable(element)) {
        return false;
    }
    var tabIndex = element.getAttribute('tabIndex');
    var visible = !checkVisibility || isVisible(element);
    return visible && tabIndex !== '-1';
};
/**
 * @hidden
 */
var findElement = function (node, predicate, matchSelf) {
    if (matchSelf === void 0) { matchSelf = true; }
    if (!node) {
        return;
    }
    if (matchSelf && predicate(node)) {
        return node;
    }
    node = node.firstChild;
    while (node) {
        if (node.nodeType === 1) {
            var element = findElement(node, predicate);
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
var findFocusable = function (element, checkVisibility) {
    if (checkVisibility === void 0) { checkVisibility = true; }
    return findElement(element, function (node) { return isFocusableWithTabKey(node, checkVisibility); });
};
/**
 * @hidden
 */
var findFocusableChild = function (element, checkVisibility) {
    if (checkVisibility === void 0) { checkVisibility = true; }
    return findElement(element, function (node) { return isFocusableWithTabKey(node, checkVisibility); }, false);
};
/**
 * @hidden
 */
function rtlScrollPosition(position, element, initial) {
    var result = position;
    if (initial < 0) {
        result = -position;
    }
    else if (initial > 0) {
        result = element.scrollWidth - element.offsetWidth - position;
    }
    return result;
}

var isButton = matchesNodeName('button');
var isInputTag = matchesNodeName('input');
var navigableRegex = /(button|checkbox|color|file|radio|reset|submit)/i;
var isNavigableInput = function (element) { return isInputTag(element) && navigableRegex.test(element.type); };
var isNavigable = function (element) { return !element.disabled && (isButton(element) || isNavigableInput(element)); };
/**
 * @hidden
 */
var DefaultFocusableElement = /** @class */ (function () {
    function DefaultFocusableElement(host, renderer) {
        this.renderer = renderer;
        this.element = host.nativeElement;
        this.focusable = findFocusable(this.element, false) || this.element;
    }
    Object.defineProperty(DefaultFocusableElement.prototype, "enabled", {
        get: function () {
            return this.focusable && !this.focusable.disabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DefaultFocusableElement.prototype, "visible", {
        get: function () {
            return this.focusable && isVisible(this.focusable);
        },
        enumerable: true,
        configurable: true
    });
    DefaultFocusableElement.prototype.isNavigable = function () {
        return this.canFocus() && isNavigable(this.element);
    };
    DefaultFocusableElement.prototype.toggle = function (active) {
        this.renderer.setAttribute(this.focusable, 'tabIndex', active ? '0' : '-1');
    };
    DefaultFocusableElement.prototype.focus = function () {
        if (this.focusable) {
            this.focusable.focus();
        }
    };
    DefaultFocusableElement.prototype.canFocus = function () {
        return this.visible && this.enabled;
    };
    DefaultFocusableElement.prototype.hasFocus = function () {
        var _this = this;
        return document.activeElement !== this.element && closest(document.activeElement, function (e) { return e === _this.element; });
    };
    return DefaultFocusableElement;
}());

/**
 * @hidden
 */
var CELL_CONTEXT = new InjectionToken('grid-cell-context');
/**
 * @hidden
 */
var EMPTY_CELL_CONTEXT = {};

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
var FocusableDirective = /** @class */ (function () {
    function FocusableDirective(cellContext, hostElement, renderer) {
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
    FocusableDirective.prototype.ngAfterViewInit = function () {
        if (!this.element) {
            this.element = new DefaultFocusableElement(this.hostElement, this.renderer);
        }
        if (this.group) {
            var isActive = this.group.isActive;
            this.toggle(isActive);
        }
    };
    FocusableDirective.prototype.ngOnDestroy = function () {
        if (this.group) {
            this.group.unregisterElement(this);
        }
    };
    /**
     * @hidden
     */
    FocusableDirective.prototype.toggle = function (active) {
        if (this.element && active !== this.active) {
            this.active = active;
            this.element.toggle(active);
        }
    };
    /**
     * @hidden
     */
    FocusableDirective.prototype.canFocus = function () {
        return this.element && this.element.canFocus();
    };
    /**
     * @hidden
     */
    FocusableDirective.prototype.isNavigable = function () {
        return this.element && this.element.isNavigable();
    };
    /**
     * @hidden
     */
    FocusableDirective.prototype.focus = function () {
        if (this.element) {
            this.element.focus();
        }
    };
    /**
     * @hidden
     */
    FocusableDirective.prototype.hasFocus = function () {
        return this.element && this.element.hasFocus();
    };
    /**
     * @hidden
     */
    FocusableDirective.prototype.registerElement = function (element) {
        this.element = element;
    };
    FocusableDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoGridFocusable]' + ",\n        [kendoGridEditCommand],\n        [kendoGridRemoveCommand],\n        [kendoGridSaveCommand],\n        [kendoGridCancelCommand],\n        [kendoGridSelectionCheckbox]\n    "
                },] },
    ];
    /** @nocollapse */
    FocusableDirective.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [CELL_CONTEXT,] }, { type: SkipSelf }] },
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    return FocusableDirective;
}());

/**
 * @hidden
 */
var GridFocusableElement = /** @class */ (function () {
    function GridFocusableElement(navigationService) {
        this.navigationService = navigationService;
    }
    GridFocusableElement.prototype.focus = function () {
        this.navigationService.focusCell();
    };
    GridFocusableElement.prototype.toggle = function (active) {
        this.navigationService.toggle(active);
    };
    GridFocusableElement.prototype.canFocus = function () {
        return true;
    };
    GridFocusableElement.prototype.hasFocus = function () {
        return this.navigationService.hasFocus();
    };
    GridFocusableElement.prototype.isNavigable = function () {
        return false;
    };
    return GridFocusableElement;
}());

/**
 * @hidden
 */
var NavigationCursor = /** @class */ (function () {
    function NavigationCursor(model) {
        this.model = model;
        this.changes = new Subject();
        this.activeRow = 0;
        this.activeCol = 0;
        this.virtualCol = 0;
        this.virtualRow = 0;
    }
    Object.defineProperty(NavigationCursor.prototype, "row", {
        get: function () {
            return this.model.findRow(this.activeRow);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavigationCursor.prototype, "cell", {
        get: function () {
            var row = this.row;
            if (row) {
                return this.model.findCell(this.activeCol, row);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavigationCursor.prototype, "dataRowIndex", {
        get: function () {
            var row = this.row;
            if (row) {
                return row.dataRowIndex;
            }
            return -1;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Assumes and announces a new cursor position.
     */
    NavigationCursor.prototype.reset = function (rowIndex, colIndex, force) {
        if (rowIndex === void 0) { rowIndex = this.activeRow; }
        if (colIndex === void 0) { colIndex = this.activeCol; }
        if (force === void 0) { force = true; }
        if (this.activate(rowIndex, colIndex, force)) {
            this.virtualRow = rowIndex;
            this.virtualCol = colIndex;
        }
    };
    NavigationCursor.prototype.activate = function (rowIndex, colIndex, force) {
        if (!force && this.isActiveRange(rowIndex, colIndex)) {
            return false;
        }
        var prevColIndex = this.activeCol;
        var prevRowIndex = this.activeRow;
        this.activeCol = colIndex;
        this.activeRow = rowIndex;
        this.changes.next({
            colIndex: colIndex,
            prevColIndex: prevColIndex,
            prevRowIndex: prevRowIndex,
            rowIndex: rowIndex
        });
        return true;
    };
    NavigationCursor.prototype.isActiveRange = function (rowIndex, colIndex) {
        if (this.activeRow !== rowIndex) {
            return false;
        }
        var cell = this.cell;
        var _a = this.model.cellRange(cell), start = _a.start, end = _a.end;
        return !Boolean(cell) || (start <= colIndex && colIndex <= end);
    };
    /**
     * Assumes a new cursor position without announcing it.
     */
    NavigationCursor.prototype.assume = function (rowIndex, colIndex) {
        if (rowIndex === void 0) { rowIndex = this.activeRow; }
        if (colIndex === void 0) { colIndex = this.activeCol; }
        this.virtualRow = rowIndex;
        this.virtualCol = colIndex;
        this.activeCol = colIndex;
        this.activeRow = rowIndex;
    };
    /**
     * Announces a current cursor position to subscribers.
     */
    NavigationCursor.prototype.announce = function () {
        this.changes.next({
            colIndex: this.activeCol,
            prevColIndex: this.activeCol,
            prevRowIndex: this.activeRow,
            rowIndex: this.activeRow
        });
    };
    NavigationCursor.prototype.activateVirtualCell = function (cell) {
        var rowRange = this.model.rowRange(cell);
        var cellRange = this.model.cellRange(cell);
        var activeCol = this.activeCol;
        var activeRow = this.activeRow;
        if (rowRange.start <= activeRow && activeRow <= rowRange.end &&
            cellRange.start <= activeCol && activeCol <= cellRange.end) {
            this.activeRow = cell.rowIndex;
            this.activeCol = cell.colIndex;
            return true;
        }
    };
    NavigationCursor.prototype.isActive = function (rowIndex, colIndex) {
        return this.activeCol === colIndex && this.activeRow === rowIndex;
    };
    NavigationCursor.prototype.moveUp = function (offset) {
        if (offset === void 0) { offset = 1; }
        return this.offsetRow(-offset);
    };
    NavigationCursor.prototype.moveDown = function (offset) {
        if (offset === void 0) { offset = 1; }
        return this.offsetRow(offset);
    };
    NavigationCursor.prototype.moveLeft = function (offset) {
        if (offset === void 0) { offset = 1; }
        return this.offsetCol(-offset);
    };
    NavigationCursor.prototype.moveRight = function (offset) {
        if (offset === void 0) { offset = 1; }
        return this.offsetCol(offset);
    };
    NavigationCursor.prototype.lastCellIndex = function (row) {
        return this.metadata.columns.leafColumnsToRender.length - 1 +
            (this.metadata.hasDetailTemplate && (!row || !row.groupItem) ? 1 : 0);
    };
    NavigationCursor.prototype.offsetCol = function (offset) {
        var prevRow = this.model.findRow(this.virtualRow);
        var lastIndex = this.lastCellIndex(prevRow);
        var virtualCol = this.virtualCol;
        this.virtualCol = Math.max(0, Math.min(virtualCol + offset, lastIndex));
        var nextColIndex = this.virtualCol;
        var nextRowIndex = this.virtualRow;
        var cell = this.model.findCell(this.virtualCol, prevRow);
        if (!cell && this.metadata.virtualColumns) {
            return this.activate(nextRowIndex, nextColIndex);
        }
        if (cell.colSpan > 1 && cell.colIndex <= virtualCol && virtualCol < cell.colIndex + cell.colSpan) {
            nextColIndex = offset > 0 ? Math.min(cell.colIndex + cell.colSpan, lastIndex) : Math.max(0, cell.colIndex + offset);
            var nextCell = this.model.findCell(nextColIndex, prevRow);
            if (cell !== nextCell) {
                cell = nextCell;
                this.virtualCol = cell.colIndex;
            }
            else {
                this.virtualCol = virtualCol;
            }
        }
        return this.activate(cell.rowIndex, cell.colIndex);
    };
    NavigationCursor.prototype.offsetRow = function (offset) {
        var nextColIndex = this.virtualCol;
        if (this.metadata && this.metadata.isVirtual) {
            var maxIndex = this.metadata.maxLogicalRowIndex;
            var nextIndex = Math.max(0, Math.min(this.activeRow + offset, maxIndex));
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
            var nextRow_1 = this.model.findRow(nextIndex);
            if (nextRow_1) {
                // remove duplication
                var cell_1 = this.model.findCell(this.virtualCol, nextRow_1);
                if (cell_1.rowIndex <= this.virtualRow && offset > 0 && cell_1.rowSpan > 1) {
                    cell_1 = this.model.findCell(this.virtualCol, this.model.findRow(cell_1.rowIndex + cell_1.rowSpan - 1 + offset));
                }
                nextIndex = cell_1.rowIndex;
                nextColIndex = cell_1.colIndex;
            }
            this.virtualRow = nextIndex;
            return this.activate(nextIndex, nextColIndex);
        }
        var nextRow = this.model.findRow(this.virtualRow + offset) || this.model.nextRow(this.virtualRow, offset);
        if (!nextRow) {
            return false;
        }
        var cell = this.model.findCell(this.virtualCol, nextRow);
        if (cell && cell.rowIndex <= this.virtualRow && offset > 0 && cell.rowSpan > 1) { // spanned cell go to next
            var nextPos = cell.rowIndex + cell.rowSpan - 1 + offset;
            cell = this.model.findCell(this.virtualCol, this.model.findRow(nextPos));
        }
        if (!cell && this.metadata.virtualColumns) {
            return this.activate(this.virtualRow + offset, this.virtualCol);
        }
        this.virtualRow = cell.rowIndex;
        return this.activate(this.virtualRow, cell.colIndex);
    };
    return NavigationCursor;
}());

/**
 * @hidden
 */
var ItemMap = /** @class */ (function () {
    function ItemMap() {
        this.count = 0;
        this.items = {};
    }
    Object.defineProperty(ItemMap.prototype, "first", {
        get: function () {
            if (this.count > 0) {
                var result_1;
                this.forEach(function (item) {
                    result_1 = item;
                    return true;
                });
                return result_1;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemMap.prototype, "last", {
        get: function () {
            if (this.count > 0) {
                var keys = Object.keys(this.items);
                return this.items[keys[keys.length - 1]];
            }
        },
        enumerable: true,
        configurable: true
    });
    ItemMap.prototype.removeItem = function (key) {
        if (this.items[key]) {
            delete this.items[key];
            this.count--;
        }
    };
    ItemMap.prototype.setItem = function (key, item) {
        if (!this.items[key]) {
            this.count++;
        }
        this.items[key] = item;
    };
    ItemMap.prototype.getItem = function (key) {
        return this.items[key];
    };
    ItemMap.prototype.toArray = function () {
        var result = [];
        this.forEach(function (item) {
            result.push(item);
        });
        return result;
    };
    ItemMap.prototype.forEach = function (callback) {
        for (var key in this.items) {
            if (this.items.hasOwnProperty(key) && callback(this.items[key])) {
                return this.items[key];
            }
        }
    };
    ItemMap.prototype.find = function (callback) {
        return this.forEach(callback);
    };
    return ItemMap;
}());

/**
 * @hidden
 *
 * Contains information for the currently rendered rows and cells.
 */
var NavigationModel = /** @class */ (function () {
    function NavigationModel() {
        this.rows = new ItemMap();
    }
    Object.defineProperty(NavigationModel.prototype, "firstRow", {
        get: function () {
            return this.rows.first;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavigationModel.prototype, "lastRow", {
        get: function () {
            return this.rows.last;
        },
        enumerable: true,
        configurable: true
    });
    NavigationModel.prototype.registerCell = function (cell) {
        var row = this.rows.getItem(cell.logicalRowIndex);
        if (!row) {
            return;
        }
        var colIndex = cell.logicalColIndex;
        var modelCell = {
            uid: cell.uid,
            colIndex: colIndex,
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
    };
    NavigationModel.prototype.unregisterCell = function (index, rowIndex, cell) {
        var row = this.rows.getItem(rowIndex);
        if (row) {
            var match = row.cells.getItem(index);
            if (match && match.uid === cell.uid) {
                row.cells.removeItem(index);
            }
        }
    };
    NavigationModel.prototype.registerRow = function (row) {
        var modelRow = {
            uid: row.uid,
            index: row.logicalRowIndex,
            dataItem: row.dataItem,
            dataRowIndex: row.dataRowIndex,
            cells: new ItemMap()
        };
        this.rows.setItem(row.logicalRowIndex, modelRow);
    };
    NavigationModel.prototype.updateRow = function (row) {
        var current = this.rows.getItem(row.logicalRowIndex);
        if (current) {
            Object.assign(current, {
                dataItem: row.dataItem,
                dataRowIndex: row.dataRowIndex
            });
        }
    };
    NavigationModel.prototype.unregisterRow = function (index, row) {
        var match = this.rows.getItem(index);
        if (match && match.uid === row.uid) {
            this.rows.removeItem(index);
        }
    };
    NavigationModel.prototype.cellRange = function (cell) {
        if (cell) {
            var start = cell.colIndex;
            var end = cell.colIndex + (cell.colSpan || 1) - 1;
            return {
                start: start,
                end: end
            };
        }
        return {};
    };
    NavigationModel.prototype.rowRange = function (cell) {
        if (cell) {
            var start = cell.rowIndex;
            var end = cell.rowIndex + (cell.rowSpan || 1) - 1;
            return {
                start: start,
                end: end
            };
        }
        return {};
    };
    NavigationModel.prototype.nextRow = function (rowIndex, offset) {
        var rows = this.rows.toArray();
        var row = this.rows.getItem(rowIndex);
        var position = rows.indexOf(row);
        var next = rows[position + offset];
        return next;
    };
    NavigationModel.prototype.findRow = function (index) {
        return this.rows.getItem(index);
    };
    NavigationModel.prototype.findCell = function (index, row) {
        if (!row) {
            return;
        }
        var rowIndex = row.index;
        var cell = row.cells.getItem(index);
        var currentIndex = rowIndex;
        while (!cell && row) {
            row = this.rows.getItem(currentIndex);
            cell = this.rowCell(index, row);
            currentIndex--;
        }
        if (cell && rowIndex <= row.index + (cell.rowSpan || 1) - 1) {
            return cell;
        }
    };
    NavigationModel.prototype.rowCell = function (index, row) {
        if (!row || !row.cells.count) {
            return;
        }
        var firstCell = row.cells.first;
        var cell, currentIndex = index;
        while (!cell && currentIndex >= firstCell.colIndex) {
            cell = row.cells.getItem(currentIndex);
            currentIndex--;
        }
        if (cell && index <= cell.colIndex + (cell.colSpan || 1) - 1) {
            return cell;
        }
    };
    return NavigationModel;
}());

/**
 * @hidden
 */
var PreventableEvent = /** @class */ (function () {
    function PreventableEvent() {
        this.prevented = false;
    }
    /**
     * Prevents the default action for a specified event.
     * In this way, the source component suppresses
     * the built-in behavior that follows the event.
     */
    PreventableEvent.prototype.preventDefault = function () {
        this.prevented = true;
    };
    /**
     * Returns `true` if the event was prevented
     * by any of its subscribers.
     *
     * @returns `true` if the default action was prevented.
     * Otherwise, returns `false`.
     */
    PreventableEvent.prototype.isDefaultPrevented = function () {
        return this.prevented;
    };
    return PreventableEvent;
}());

/**
 * Arguments for the `cellClose` event.
 */
var CellCloseEvent = /** @class */ (function (_super) {
    __extends(CellCloseEvent, _super);
    function CellCloseEvent(options) {
        var _this = _super.call(this) || this;
        /**
         * @hidden
         */
        _this.action = 'cellClose';
        Object.assign(_this, options);
        return _this;
    }
    return CellCloseEvent;
}(PreventableEvent));

/**
 * @hidden
 */
var isEqual = function (index) { return function (item) { return item.index === index; }; };
/**
 * @hidden
 */
var isNotEqual = function (index) { return function (item) { return item.index !== index; }; };
/**
 * @hidden
 */
var isNewRow = function (index) { return index === -1 || index === undefined; };
/**
 * @hidden
 */
var EditService = /** @class */ (function () {
    function EditService(ngZone) {
        var _this = this;
        this.ngZone = ngZone;
        this.changes = new EventEmitter();
        this.editedIndices = [];
        this.keepEditCell = false;
        this.closingCell = false;
        this.changedSource = new Subject();
        this.changed = this.changedSource.asObservable().pipe(switchMap(function () { return _this.ngZone.onStable.asObservable().pipe(take(1)); }));
    }
    EditService.prototype.editRow = function (index, group) {
        if (group === void 0) { group = undefined; }
        this.editedIndices.push({ index: index, group: group });
        this.onChanged();
    };
    EditService.prototype.addRow = function (group) {
        this.newItemGroup = { group: group };
        this.onChanged();
    };
    EditService.prototype.editCell = function (rowIndex, column, group) {
        if (isNewRow(rowIndex) || column.editable === false || !(column.editTemplate || column.field)) {
            return;
        }
        this.preventCellClose();
        if (!this.closeCell()) {
            this.editRow(rowIndex, group);
            this.column = column;
            this.onChanged();
        }
    };
    EditService.prototype.isEditing = function () {
        return this.editedIndices.length > 0;
    };
    EditService.prototype.isEditingCell = function () {
        return this.isEditing() && this.column !== undefined;
    };
    Object.defineProperty(EditService.prototype, "hasNewItem", {
        get: function () {
            return isPresent(this.newItemGroup);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditService.prototype, "newDataItem", {
        get: function () {
            if (this.hasNewItem) {
                return this.newItemGroup.group.value;
            }
            return {};
        },
        enumerable: true,
        configurable: true
    });
    EditService.prototype.close = function (index) {
        if (isNewRow(index)) {
            this.newItemGroup = undefined;
            return;
        }
        this.editedIndices = this.editedIndices.filter(isNotEqual(index));
        delete this.column;
        this.onChanged();
    };
    EditService.prototype.closeCell = function (originalEvent) {
        var _this = this;
        if (this.column && !this.closingCell) {
            return this.ngZone.run(function () {
                var _a = _this.editedIndices[0], index = _a.index, group = _a.group;
                var args = new CellCloseEvent({
                    column: _this.column,
                    formGroup: group,
                    originalEvent: originalEvent,
                    rowIndex: index
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
            this.editedIndices = [];
            delete this.column;
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
    EditService.prototype.context = function (index) {
        if (isNewRow(index)) {
            return this.newItemGroup;
        }
        return this.findByIndex(index);
    };
    EditService.prototype.columnContext = function (index, column) {
        if (isNewRow(index)) {
            return this.newItemGroup;
        }
        if (!this.column || column === this.column) {
            return this.findByIndex(index);
        }
    };
    EditService.prototype.isEdited = function (index) {
        if (isNewRow(index) && isPresent(this.newItemGroup)) {
            return true;
        }
        return !this.column && isPresent(this.findByIndex(index));
    };
    EditService.prototype.hasEdited = function (index) {
        return isPresent(this.context(index));
    };
    EditService.prototype.isEditedColumn = function (index, column) {
        if (this.column && this.column === column) {
            return isPresent(this.findByIndex(index));
        }
        return false;
    };
    EditService.prototype.beginEdit = function (rowIndex) {
        this.changes.emit({ action: 'edit', rowIndex: rowIndex });
    };
    EditService.prototype.beginAdd = function () {
        this.changes.emit({ action: 'add' });
    };
    EditService.prototype.endEdit = function (rowIndex) {
        var formGroup = this.context(rowIndex).group;
        this.changes.emit({ action: 'cancel', rowIndex: rowIndex, formGroup: formGroup, isNew: isNewRow(rowIndex) });
    };
    EditService.prototype.save = function (rowIndex) {
        var formGroup = this.context(rowIndex).group;
        this.changes.emit({ action: 'save', rowIndex: rowIndex, formGroup: formGroup, isNew: isNewRow(rowIndex) });
    };
    EditService.prototype.remove = function (rowIndex) {
        this.changes.emit({ action: 'remove', rowIndex: rowIndex });
    };
    EditService.prototype.findByIndex = function (index) {
        return this.editedIndices.find(isEqual(index));
    };
    EditService.prototype.onChanged = function () {
        var _this = this;
        this.ngZone.runOutsideAngular(function () {
            _this.changedSource.next();
        });
    };
    EditService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    EditService.ctorParameters = function () { return [
        { type: NgZone }
    ]; };
    return EditService;
}());

/**
 * @hidden
 */
var ExpandStateService = /** @class */ (function () {
    function ExpandStateService(isInitiallyCollapsed) {
        this.isInitiallyCollapsed = isInitiallyCollapsed;
        this.changes = new Subject();
        this.rowState = new Set();
    }
    ExpandStateService.prototype.toggleRow = function (index, dataItem) {
        var found = this.rowState.has(index);
        var expand = !this.isInitiallyCollapsed ? found : !found;
        var prevented = this.emitEvent({ dataItem: dataItem, expand: expand, index: index });
        if (prevented) {
            return;
        }
        if (found) {
            this.rowState.delete(index);
        }
        else {
            this.rowState.add(index);
        }
    };
    ExpandStateService.prototype.isExpanded = function (index) {
        var found = this.rowState.has(index);
        return this.isInitiallyCollapsed ? found : !found;
    };
    ExpandStateService.prototype.reset = function () {
        this.rowState.clear();
    };
    ExpandStateService.prototype.emitEvent = function (args) {
        this.changes.next(args);
        return false;
    };
    return ExpandStateService;
}());

var removeLast = function (groupIndex) { return groupIndex.lastIndexOf("_") > -1
    ? groupIndex.slice(0, groupIndex.lastIndexOf("_"))
    : ""; };
var isChildIndex = function (targetIndex, parentIndex) { return parentIndex !== targetIndex && targetIndex.startsWith(parentIndex); };
/**
 * @hidden
 */
var GroupsService = /** @class */ (function (_super) {
    __extends(GroupsService, _super);
    function GroupsService(isCollapsed) {
        if (isCollapsed === void 0) { isCollapsed = false; }
        return _super.call(this, isCollapsed) || this;
    }
    GroupsService.prototype.isInExpandedGroup = function (groupIndex, skipSelf) {
        if (skipSelf === void 0) { skipSelf = true; }
        if (skipSelf) {
            groupIndex = removeLast(groupIndex);
        }
        var expanded = true;
        while (groupIndex && expanded) {
            expanded = this.isExpanded(groupIndex);
            groupIndex = removeLast(groupIndex);
        }
        return expanded;
    };
    GroupsService.prototype.expandChildren = function (parentIndex) {
        var _this = this;
        this.rowState.forEach(function (index) { return isChildIndex(index, parentIndex) && _this.rowState.delete(index); });
    };
    GroupsService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    GroupsService.ctorParameters = function () { return [
        { type: Boolean, decorators: [{ type: Optional }, { type: Inject, args: [Skip,] }] }
    ]; };
    return GroupsService;
}(ExpandStateService));

/**
 * @hidden
 */
var PagerContextService = /** @class */ (function () {
    function PagerContextService() {
        this.changes = new Subject();
        this.pageChange = new Subject();
    }
    Object.defineProperty(PagerContextService.prototype, "currentPage", {
        get: function () {
            return this.skip / this.pageSize;
        },
        enumerable: true,
        configurable: true
    });
    PagerContextService.prototype.notifyChanges = function (changes) {
        this.total = changes.total;
        this.pageSize = changes.pageSize;
        this.skip = changes.skip;
        this.changes.next(changes);
    };
    PagerContextService.prototype.changePage = function (page) {
        this.pageChange.next({ skip: page * this.pageSize, take: this.pageSize });
    };
    PagerContextService.prototype.changePageSize = function (value) {
        this.pageChange.next({ skip: 0, take: value });
    };
    PagerContextService.prototype.nextPage = function () {
        var nextPage = this.currentPage + 1;
        if (nextPage * this.pageSize < this.total) {
            this.changePage(nextPage);
        }
    };
    PagerContextService.prototype.prevPage = function () {
        var prevPage = this.currentPage - 1;
        if (prevPage * this.pageSize >= 0) {
            this.changePage(prevPage);
        }
    };
    return PagerContextService;
}());

/**
 * Arguments for the `detailCollapse` event.
 */
var DetailCollapseEvent = /** @class */ (function (_super) {
    __extends(DetailCollapseEvent, _super);
    function DetailCollapseEvent(args) {
        var _this = _super.call(this) || this;
        Object.assign(_this, args);
        return _this;
    }
    return DetailCollapseEvent;
}(PreventableEvent));

/**
 * Arguments for the `detailExpand` event.
 */
var DetailExpandEvent = /** @class */ (function (_super) {
    __extends(DetailExpandEvent, _super);
    function DetailExpandEvent(args) {
        var _this = _super.call(this) || this;
        Object.assign(_this, args);
        return _this;
    }
    return DetailExpandEvent;
}(PreventableEvent));

/**
 * @hidden
 */
var DetailsService = /** @class */ (function () {
    function DetailsService() {
        this.changes = new Subject();
        this.rowState = new Set();
    }
    DetailsService.prototype.ngOnDestroy = function () {
        this.rowState.clear();
    };
    DetailsService.prototype.isExpanded = function (index, dataItem) {
        if (this.userCallback) {
            return this.userCallback({ index: index, dataItem: dataItem });
        }
        return this.rowState.has(index);
    };
    DetailsService.prototype.toggleRow = function (index, dataItem) {
        if (this.isExpanded(index, dataItem)) {
            this.collapseRow(index, dataItem);
        }
        else {
            this.expandRow(index, dataItem);
        }
    };
    DetailsService.prototype.expandRow = function (index, dataItem) {
        var prevented = this.emitEvent({ dataItem: dataItem, index: index, expand: true });
        if (!prevented && !this.userCallback) {
            this.rowState.add(index);
        }
    };
    DetailsService.prototype.collapseRow = function (index, dataItem) {
        var prevented = this.emitEvent({ dataItem: dataItem, index: index, expand: false });
        if (!prevented && !this.userCallback) {
            this.rowState.delete(index);
        }
    };
    DetailsService.prototype.emitEvent = function (args) {
        var eventArg = new (args.expand ? DetailExpandEvent : DetailCollapseEvent)(args);
        this.changes.next(eventArg);
        return eventArg.isDefaultPrevented();
    };
    DetailsService.decorators = [
        { type: Injectable },
    ];
    return DetailsService;
}());

/**
 * @hidden
 */
var ScrollRequestService = /** @class */ (function () {
    function ScrollRequestService() {
        this.requests = new Subject();
    }
    ScrollRequestService.prototype.scrollTo = function (request) {
        this.requests.next(request);
    };
    ScrollRequestService.decorators = [
        { type: Injectable },
    ];
    return ScrollRequestService;
}());

var isInSameGrid = function (element, gridElement) {
    return closest(element, matchesNodeName('kendo-grid')) === gridElement;
};
var matchHeaderCell = matchesNodeName('th');
var matchDataCell = matchesNodeName('td');
var matchFooterCell = matchesNodeName('.k-grid-footer td');
var matchCell = function (element) { return matchDataCell(element) || matchHeaderCell(element) || matchFooterCell(element); };
var gridCell = function (element, gridElement) {
    var target = closest(element, matchCell);
    while (target && !isInSameGrid(target, gridElement)) {
        target = closest(target.parentElement, matchCell);
    }
    return target;
};
var targetCell = function (target, gridElement) {
    var cell = gridCell(target, gridElement);
    var row = closest(cell, matchesNodeName('tr'));
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
var isArrowKey = function (keyCode) {
    return keyCode === Keys.ArrowLeft || keyCode === Keys.ArrowRight ||
        keyCode === Keys.ArrowUp || keyCode === Keys.ArrowDown;
};
var isNavigationKey = function (keyCode) {
    return isArrowKey(keyCode) ||
        keyCode === Keys.PageUp || keyCode === Keys.PageDown ||
        keyCode === Keys.Home || keyCode === Keys.End;
};
var isInput = matchesNodeName('input');
var isTextInput = function (element) {
    return element && isInput(element) && element.type.toLowerCase() === 'text';
};
var isPrintableCharacter = function (str) {
    return str.length === 1 && str.match(/\S/);
};
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
        this.cellKeydown = new EventEmitter();
        this.activeRowIndex = 0;
        this.alive = false;
        this.active = true;
        this.mode = 0 /* Standby */;
        this.model = new NavigationModel();
        this.cursor = new NavigationCursor(this.model);
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
                    from([true]).pipe(map(function () { return args; })) : (_a = _this.zone.onStable).pipe.apply(_a, [take(1), map(function () { return args; })].concat(operators));
            };
        };
        var onStable = onStableSubscriber();
        this.subs = new Subscription();
        this.subs.add(this.cursor.changes
            .subscribe(function (args) { return _this.onCursorChanges(args); }));
        this.subs.add(this.domEvents.focus.pipe(switchMap(onStable))
            .subscribe(function (args) { return _this.navigateTo(args.target); }));
        this.subs.add(this.domEvents.focusOut.pipe(filter(function () { return _this.mode !== 0 /* Standby */; }), switchMap(onStableSubscriber(takeUntil(this.domEvents.focus))))
            .subscribe(function (args) { return _this.onFocusOut(args); }));
        this.subs.add(this.domEvents.windowBlur.pipe(filter(function () { return _this.mode !== 0 /* Standby */; }))
            .subscribe(function () { return _this.onWindowBlur(); }));
        this.subs.add(
        // Closing the editor will not always trigger focusout in Firefox.
        // To get around this, we ensure that the cell is closed after editing.
        this.editService.changes.pipe(filter(function (e) { return e.action !== 'edit' && _this.mode === 2 /* Content */; }), filter(function (e) { return e.action === 'cellClose' && !e.prevented; }), switchMap(onStable))
            .subscribe(function () { return _this.leaveCell(); }));
        this.subs.add(this.pagerContextService.pageChange
            .subscribe(function () { return _this.cursor.reset(0, 0); }));
        this.subs.add(this.domEvents.keydown
            .subscribe(function (args) { return _this.onKeydown(args); }));
        this.subs.add(this.domEvents.keydown.pipe(filter(function (args) {
            return args.keyCode === Keys.Tab && _this.mode === 2 /* Content */;
        }), switchMapTo(this.domEvents.focusOut.pipe(takeUntil(
        // Timeout if focusOut doesn't fire very soon
        interval(0).pipe(take(1))))))
            .subscribe(function () { return _this.onTabout(); }));
        if (this.focusableParent) {
            var element = new GridFocusableElement(this);
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
        var focusInCell = contains(cell.element, document.activeElement);
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
        var focusable = findFocusableChild(el);
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
            case Keys.PageUp:
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
            case Keys.Enter:
            case Keys.F2:
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
        var confirm = !args.defaultPrevented && args.keyCode === Keys.Enter && isTextInput(args.srcElement);
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
    };
    NavigationService.prototype.onCellKeydown = function (args) {
        if (this.editService.isEditingCell()) {
            var confirm_1 = args.keyCode === Keys.Enter;
            var cancel = args.keyCode === Keys.Escape;
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
        { type: Injectable },
    ];
    /** @nocollapse */
    NavigationService.ctorParameters = function () { return [
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
    ]; };
    return NavigationService;
}());

/**
 * @hidden
 */
var SelectionService = /** @class */ (function () {
    function SelectionService(domEvents, localDataChangesService, navigationService) {
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
    Object.defineProperty(SelectionService.prototype, "enableMarquee", {
        get: function () {
            var checkboxOnly = this.settings && typeof this.settings === 'object' && this.settings.checkboxOnly;
            if (!this.settings || checkboxOnly) {
                return false;
            }
            var selectableSettings = this.settings.selectable;
            var dragAndMultiple = typeof (selectableSettings) === 'object' &&
                isPresent(selectableSettings) &&
                selectableSettings.mode === 'multiple' &&
                selectableSettings.enabled !== false &&
                !selectableSettings.checkboxOnly &&
                selectableSettings.drag;
            return this.active && dragAndMultiple;
        },
        enumerable: true,
        configurable: true
    });
    SelectionService.prototype.init = function (settings) {
        this.settings = settings;
        this.currentSelection = [];
        if (settings.selectable && settings.selectable.enabled !== false) {
            var iterator_1 = this.getIterator();
            this._selectAllState = true;
            var item = iterator_1.next();
            while (!item.done) {
                if (item.value && item.value.type === "data") {
                    var rowArgs = {
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
                item = iterator_1.next();
            }
            if (this.currentSelection.length === 0) {
                this._selectAllState = false;
            }
        }
    };
    SelectionService.prototype.isSelected = function (index) {
        if (this.settings && this.active) {
            return this.options.enabled && isPresent(this.currentSelection[index]);
        }
    };
    SelectionService.prototype.handleClick = function (item, event) {
        if (this.dragging) {
            this.dragging = false;
            return;
        }
        var ev;
        var ctrlKey = event.ctrlKey || event.metaKey;
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
    };
    SelectionService.prototype.toggle = function (item) {
        var selectedRows = [];
        var deselectedRows = [];
        this.lastSelectionStartIndex = item.index;
        var rowArgs = { dataItem: item.data, index: item.index };
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
    };
    SelectionService.prototype.toggleByIndex = function (index) {
        var iterator$$1 = this.getIterator();
        if (this.selectAllChecked && this.isSelected(index)) {
            this.selectAllChecked = false;
        }
        var item = iterator$$1.next();
        while (!item.done) {
            if (item.value && item.value.type === "data" && item.value.index === index) {
                var itemToToggle = {
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
    };
    SelectionService.prototype.select = function (item) {
        var deselectedRows = [];
        var selectedRows = [];
        this.lastSelectionStartIndex = item.index;
        if (!this.isSelected(item.index)) {
            selectedRows.push({ dataItem: item.data, index: item.index });
        }
        this.currentSelection.forEach(function (row) {
            if (row.index !== item.index) {
                deselectedRows.push(row);
            }
        });
        return {
            deselectedRows: deselectedRows,
            selectedRows: selectedRows
        };
    };
    //Used to manually deselect removed items
    SelectionService.prototype.deselect = function (removedItem) {
        var iterator$$1 = this.getIterator();
        var item = iterator$$1.next();
        while (!item.done) {
            if (item.value && item.value.type === "data" && item.value.data === removedItem) {
                var rowArgs = {
                    dataItem: item.value.data,
                    index: item.value.index
                };
                if (this.isSelected(rowArgs.index)) {
                    var ev = {
                        ctrlKey: false,
                        deselectedRows: [rowArgs],
                        selectedRows: []
                    };
                    this.changes.emit(ev);
                }
            }
            item = iterator$$1.next();
        }
    };
    SelectionService.prototype.addAllTo = function (item, ctrlKey) {
        var selectedRows = [];
        var deselectedRows = [];
        var start = Math.min(this.lastSelectionStartIndex, item.index);
        var end = Math.max(this.lastSelectionStartIndex, item.index);
        var iterator$$1 = this.getIterator();
        var next = iterator$$1.next();
        while (!next.done) {
            if (next.value && next.value.type === "data") {
                var idx = next.value.index;
                var rowArgs = { dataItem: next.value.data, index: idx };
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
    };
    SelectionService.prototype.updateAll = function (selectAllChecked) {
        this.selectAllChecked = selectAllChecked;
        var selectedRows = [];
        var deselectedRows = [];
        var iterator$$1 = this.getIterator();
        var next = iterator$$1.next();
        while (!next.done) {
            if (next.value && next.value.type === "data") {
                var idx = next.value.index;
                var rowArgs = { dataItem: next.value.data, index: idx };
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
        var ev = {
            ctrlKey: true,
            deselectedRows: deselectedRows,
            selectedRows: selectedRows,
            shiftKey: true
        };
        this.changes.emit(ev);
    };
    SelectionService.prototype.selectRange = function (startIndex, endIndex) {
        var selectedRows = [];
        var deselectedRows = [];
        var start = Math.min(startIndex, endIndex);
        var end = Math.max(startIndex, endIndex);
        var iterator$$1 = this.getIterator();
        var next = iterator$$1.next();
        while (!next.done) {
            if (next.value && next.value.type === "data") {
                var idx = next.value.index;
                var rowArgs = { dataItem: next.value.data, index: idx };
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
    };
    Object.defineProperty(SelectionService.prototype, "selectAllState", {
        get: function () {
            return this._selectAllState;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionService.prototype, "selected", {
        get: function () {
            return this.currentSelection.map(function (item) {
                return item.index;
            }).filter(function (n) { return typeof n === "number"; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionService.prototype, "options", {
        get: function () {
            var defaultOptions = {
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
        },
        enumerable: true,
        configurable: true
    });
    SelectionService.prototype.ngOnDestroy = function () {
        this.removeSubscriptions();
    };
    SelectionService.prototype.targetArgs = function () {
        return {
            index: this.mouseDownEventArgs.rowIndex,
            dataItem: this.mouseDownEventArgs.dataItem
        };
    };
    SelectionService.prototype.addSubscriptions = function () {
        var _this = this;
        if (!this.cellClickSubscription) {
            this.cellClickSubscription = this.domEvents.cellClick.subscribe(function (args) {
                if (_this.options.enabled && !_this.options.checkboxOnly && args.type !== 'contextmenu') {
                    if (_this.active) {
                        _this.handleClick({ index: args.rowIndex, data: args.dataItem }, args.originalEvent);
                    }
                }
            });
        }
        if (!this.mousedownSubscription) {
            this.mousedownSubscription = this.domEvents.cellMousedown.subscribe(function (args) {
                _this.mouseDownEventArgs = args;
                if ((_this.options.enabled && (!_this.options.mode || _this.options.mode === "multiple") &&
                    !_this.options.checkboxOnly && args.originalEvent.shiftKey)) {
                    if (_this.active) {
                        args.originalEvent.preventDefault();
                        _this.navigationService.focusCellByElement(args.originalEvent.target);
                    }
                }
            });
        }
        if (this.localDataChangesService && !this.dataChangedSubscription) {
            this.dataChangedSubscription = this.localDataChangesService.changes.subscribe(function (args) {
                if (_this.active) {
                    if (isPresent(args.action) && args.action === 'remove') {
                        _this.deselect(args.item);
                    }
                }
            });
        }
    };
    SelectionService.prototype.getIterator = function () {
        var accessor = this.settings.view.accessor();
        if (!accessor) {
            return;
        }
        return accessor[iterator]();
    };
    SelectionService.prototype.removeSubscriptions = function () {
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
    };
    SelectionService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    SelectionService.ctorParameters = function () { return [
        { type: DomEventsService },
        { type: LocalDataChangesService },
        { type: NavigationService }
    ]; };
    return SelectionService;
}());

/**
 * @hidden
 */
var CellSelectionService = /** @class */ (function () {
    function CellSelectionService(domEvents, localDataChangesService, navigationService) {
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
    Object.defineProperty(CellSelectionService.prototype, "enableMarquee", {
        get: function () {
            var checkboxOnly = this.settings && typeof this.settings === 'object' && this.settings.checkboxOnly;
            if (!this.settings || checkboxOnly) {
                return false;
            }
            var selectableSettings = this.settings.selectable;
            var dragAndMultiple = typeof (selectableSettings) === 'object' &&
                isPresent(selectableSettings) &&
                selectableSettings.mode === 'multiple' &&
                selectableSettings.cell &&
                selectableSettings.enabled !== false &&
                selectableSettings.drag;
            return this.active && dragAndMultiple;
        },
        enumerable: true,
        configurable: true
    });
    CellSelectionService.prototype.init = function (settings) {
        var _this = this;
        this.settings = settings;
        this.currentSelection = [];
        if (settings.selectable && settings.selectable.enabled !== false) {
            var iterator_1 = this.getIterator();
            var item = iterator_1.next();
            var _loop_1 = function () {
                if (item.value && item.value.type === "data") {
                    var rowArgs_1 = {
                        dataItem: item.value.data,
                        index: item.value.index
                    };
                    settings.columns.forEach(function (col) {
                        var selectedCellArgs = settings.cellSelected(rowArgs_1, col, col.leafIndex);
                        if (selectedCellArgs.selected) {
                            _this.currentSelection.push(selectedCellArgs.item);
                        }
                    });
                }
                item = iterator_1.next();
            };
            while (!item.done) {
                _loop_1();
            }
        }
    };
    CellSelectionService.prototype.isCellSelected = function (item, col) {
        if (this.settings && this.active) {
            var selectedCellArgs = this.settings.cellSelected({ dataItem: item.data, index: item.index }, col, col.leafIndex);
            return this.options.enabled && selectedCellArgs.selected;
        }
        return false;
    };
    CellSelectionService.prototype.handleClick = function (item, event) {
        if (this.dragging) {
            this.dragging = false;
            return;
        }
        var ev;
        var ctrlKey = event.ctrlKey || event.metaKey;
        if (this.options.mode === "single" && ctrlKey && this.isCellSelected(item, item.column)) {
            ev = this.toggle(item);
        }
        else if (this.options.mode === "multiple") {
            if (ctrlKey && !event.shiftKey) {
                ev = this.toggle(item);
            }
            else if (event.shiftKey) {
                var startRowIndex = Math.min(this.lastSelectionItemRowIndex, item.index);
                var startColIndex = Math.min(this.lastSelectionItemColIndex, item.column.leafIndex);
                var endRowIndex = Math.max(this.lastSelectionItemRowIndex, item.index);
                var endColIndex = Math.max(this.lastSelectionItemColIndex, item.column.leafIndex);
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
    };
    CellSelectionService.prototype.toggle = function (item) {
        var selectedCells = [];
        var deselectedCells = [];
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
            deselectedCells: deselectedCells,
            selectedCells: selectedCells
        };
    };
    CellSelectionService.prototype.select = function (item) {
        var _this = this;
        var selectedCells = [];
        var deselectedCells = [];
        this.lastSelectionItem =
            this.settings.cellSelected({ dataItem: item.data, index: item.index }, item.column, item.column.leafIndex).item;
        this.lastSelectionItemRowIndex = item.index;
        this.lastSelectionItemColIndex = item.column.leafIndex;
        if (!this.isCellSelected(item, item.column)) {
            selectedCells.push(this.lastSelectionItem);
        }
        this.currentSelection.forEach(function (selectedItem) {
            if (selectedItem.itemKey !== _this.lastSelectionItem.itemKey || selectedItem.columnKey !== _this.lastSelectionItem.columnKey) {
                deselectedCells.push(selectedItem);
            }
        });
        return {
            deselectedCells: deselectedCells,
            selectedCells: selectedCells
        };
    };
    //Used to manually deselect removed items
    CellSelectionService.prototype.deselect = function (removedItem) {
        var _this = this;
        var iterator$$1 = this.getIterator();
        var item = iterator$$1.next();
        var rowArgs;
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
            var cellsToRemove = this.currentSelection.filter(function (selectedItem) {
                var contender = _this.settings.cellSelected(rowArgs, null, null).item;
                return selectedItem.itemKey === contender.itemKey;
            });
            if (cellsToRemove.length) {
                var ev = {
                    ctrlKey: false,
                    deselectedCells: cellsToRemove,
                    selectedCells: []
                };
                this.changes.emit(ev);
            }
        }
    };
    CellSelectionService.prototype.selectRange = function (startRowIndex, startColIndex, endRowIndex, endColIndex) {
        var _this = this;
        var selectedCells = [];
        var deselectedCells = [];
        var selectionStartRow = Math.min(startRowIndex, endRowIndex);
        var selectionStartCol = Math.min(startColIndex, endColIndex);
        var selectionEndRow = Math.max(startRowIndex, endRowIndex);
        var selectionEndCol = Math.max(startColIndex, endColIndex);
        var iterator$$1 = this.getIterator();
        var next = iterator$$1.next();
        var _loop_2 = function () {
            if (next.value && next.value.type === "data") {
                var idx_1 = next.value.index;
                var data = next.value.data;
                var rowArgs_2 = {
                    dataItem: data,
                    index: idx_1
                };
                this_1.settings.columns.forEach(function (col) {
                    var item = _this.settings.cellSelected(rowArgs_2, col, col.leafIndex).item;
                    var selected = _this.isCellSelected(next.value, col);
                    var isInRowRange = selectionStartRow <= idx_1 && idx_1 <= selectionEndRow;
                    var isInColRange = selectionStartCol <= col.leafIndex && col.leafIndex <= selectionEndCol;
                    var isInSelectionRect = isInRowRange && isInColRange;
                    if (!isInSelectionRect && selected) {
                        deselectedCells.push(item);
                    }
                    if (isInSelectionRect && !selected) {
                        selectedCells.push(item);
                    }
                });
            }
            next = iterator$$1.next();
        };
        var this_1 = this;
        while (!next.done) {
            _loop_2();
        }
        return {
            deselectedCells: deselectedCells,
            selectedCells: selectedCells
        };
    };
    Object.defineProperty(CellSelectionService.prototype, "options", {
        get: function () {
            var defaultOptions = {
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
        },
        enumerable: true,
        configurable: true
    });
    CellSelectionService.prototype.ngOnDestroy = function () {
        this.removeSubscriptions();
    };
    CellSelectionService.prototype.addSubscriptions = function () {
        var _this = this;
        if (!this.cellClickSubscription) {
            this.cellClickSubscription = this.domEvents.cellClick.subscribe(function (args) {
                if (_this.options.enabled && !_this.options.checkboxOnly && args.type !== 'contextmenu') {
                    if (_this.active) {
                        _this.handleClick({ index: args.rowIndex, data: args.dataItem, column: args.column }, args.originalEvent);
                    }
                }
            });
        }
        if (!this.mousedownSubscription) {
            this.mousedownSubscription = this.domEvents.cellMousedown.subscribe(function (args) {
                _this.mouseDownEventArgs = args;
                if (_this.options.enabled && (!_this.options.mode || _this.options.mode === "multiple") &&
                    !_this.options.checkboxOnly && args.originalEvent.shiftKey) {
                    if (_this.active) {
                        args.originalEvent.preventDefault();
                        _this.navigationService.focusCellByElement(args.originalEvent.target);
                    }
                }
            });
        }
        if (this.localDataChangesService && !this.dataChangedSubscription) {
            this.dataChangedSubscription = this.localDataChangesService.changes.subscribe(function (args) {
                if (_this.active) {
                    if (isPresent(args.action) && args.action === 'remove') {
                        _this.deselect(args.item);
                    }
                }
            });
        }
    };
    CellSelectionService.prototype.getIterator = function () {
        var accessor = this.settings.view.accessor();
        if (!accessor) {
            return;
        }
        return accessor[iterator]();
    };
    CellSelectionService.prototype.removeSubscriptions = function () {
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
    };
    CellSelectionService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    CellSelectionService.ctorParameters = function () { return [
        { type: DomEventsService },
        { type: LocalDataChangesService },
        { type: NavigationService }
    ]; };
    return CellSelectionService;
}());

var createElement = function () {
    var marquee = document.createElement("div");
    marquee.className = "k-marquee";
    var marqueeColor = document.createElement("div");
    marqueeColor.className = "k-marquee-color";
    marquee.appendChild(marqueeColor);
    return marquee;
};
var POINTER_OFFSET = 2;
var MINIMAL_DRAG_DISTANCE = 5;
var offsets = {
    topLeft: { x: POINTER_OFFSET, y: POINTER_OFFSET },
    topRight: { x: -POINTER_OFFSET, y: POINTER_OFFSET },
    bottomLeft: { x: POINTER_OFFSET, y: -POINTER_OFFSET },
    bottomRight: { x: -POINTER_OFFSET, y: -POINTER_OFFSET }
};
/**
 * @hidden
 */
var GridMarqueeDirective = /** @class */ (function () {
    function GridMarqueeDirective(draggable, selection, cellSelection, domEvents) {
        this.draggable = draggable;
        this.selection = selection;
        this.cellSelection = cellSelection;
        this.domEvents = domEvents;
        this.selectionStarted = false;
    }
    Object.defineProperty(GridMarqueeDirective.prototype, "userSelection", {
        get: function () {
            return (this.cellSelection.enableMarquee || this.selection.enableMarquee) ? 'none' : null;
        },
        enumerable: true,
        configurable: true
    });
    GridMarqueeDirective.prototype.ngOnInit = function () {
        this.subscriptions = (this.draggable.kendoPress.subscribe(this.start.bind(this)));
        this.subscriptions.add(this.draggable.kendoDrag.subscribe(this.moveMarquee.bind(this)));
    };
    GridMarqueeDirective.prototype.ngOnDestroy = function () {
        this.subscriptions.unsubscribe();
        this.clean();
    };
    GridMarqueeDirective.prototype.start = function (args) {
        if (args.originalEvent.target.classList.contains('k-checkbox')) {
            this.pressArgs = null;
            return;
        }
        this.pressArgs = args;
        this.pressTarget = null;
    };
    GridMarqueeDirective.prototype.moveMarquee = function (args) {
        if (!this.pressTarget) {
            this.pressTarget = this.cellSelection.active ? this.cellSelection.mouseDownEventArgs : this.selection.mouseDownEventArgs;
        }
        var press = this.pressArgs;
        if (!press) {
            return;
        }
        if (!this.selectionStarted) {
            var distance = Math.sqrt(Math.pow((args.pageX - press.pageX), 2) + Math.pow((args.pageY - press.pageY), 2));
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
        var element = this.marqueeElement;
        var marqueeQuadrant = this.getMarqueeQuadrant(args.pageX, args.pageY, press.pageX, press.pageY);
        var left = Math.min(args.pageX, press.pageX);
        var top = Math.min(args.pageY, press.pageY);
        var width = Math.abs(args.pageX - press.pageX);
        var height = Math.abs(args.pageY - press.pageY);
        if (marqueeQuadrant) {
            left += offsets[marqueeQuadrant].x;
            top += offsets[marqueeQuadrant].y;
        }
        element.style.left = left + "px";
        element.style.top = top + "px";
        element.style.width = width + "px";
        element.style.height = height + "px";
    };
    GridMarqueeDirective.prototype.endSelection = function (args) {
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
    };
    GridMarqueeDirective.prototype.clean = function () {
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
    };
    GridMarqueeDirective.prototype.initMarquee = function () {
        if (!this.marqueeElement) {
            this.marqueeElement = createElement();
            document.body.appendChild(this.marqueeElement);
        }
    };
    GridMarqueeDirective.prototype.getMarqueeQuadrant = function (pointerX, pointerY, startX, startY) {
        var leftHalf = pointerX < startX;
        var rightHalf = pointerX > startX;
        var topHalf = pointerY < startY;
        var bottomHalf = pointerY > startY;
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
    };
    GridMarqueeDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoGridSelectionMarquee]'
                },] },
    ];
    /** @nocollapse */
    GridMarqueeDirective.ctorParameters = function () { return [
        { type: DraggableDirective },
        { type: SelectionService },
        { type: CellSelectionService },
        { type: DomEventsService }
    ]; };
    GridMarqueeDirective.propDecorators = {
        userSelection: [{ type: HostBinding, args: ['style.user-select',] }, { type: HostBinding, args: ['style.-webkit-user-select',] }]
    };
    return GridMarqueeDirective;
}());

/**
 * @hidden
 */
var ZoneAwareEventEmitter = /** @class */ (function (_super) {
    __extends(ZoneAwareEventEmitter, _super);
    function ZoneAwareEventEmitter(ngZone, isAsync) {
        if (isAsync === void 0) { isAsync = false; }
        var _this = _super.call(this, isAsync) || this;
        _this.ngZone = ngZone;
        return _this;
    }
    ZoneAwareEventEmitter.prototype.subscribe = function (generatorOrNext, error, complete) {
        var _this = this;
        var schedulerFn;
        var errorFn = function (_) { return null; };
        var completeFn = function () { return null; };
        if (generatorOrNext && typeof generatorOrNext === 'object') {
            schedulerFn = function (value) { _this.ngZone.run(function () { return generatorOrNext.next(value); }); };
            if (generatorOrNext.error) {
                errorFn = function (err) { _this.ngZone.run(function () { return generatorOrNext.error(err); }); };
            }
            if (generatorOrNext.complete) {
                completeFn = function () { _this.ngZone.run(function () { return generatorOrNext.complete(); }); };
            }
        }
        else {
            schedulerFn = function (value) { _this.ngZone.run(function () { return generatorOrNext(value); }); };
            if (error) {
                errorFn = function (err) { _this.ngZone.run(function () { return error(err); }); };
            }
            if (complete) {
                completeFn = function () { _this.ngZone.run(function () { return complete(); }); };
            }
        }
        return _super.prototype.subscribe.call(this, schedulerFn, errorFn, completeFn);
    };
    return ZoneAwareEventEmitter;
}(EventEmitter));

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
var CellTemplateDirective = /** @class */ (function () {
    function CellTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    CellTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoGridCellTemplate]'
                },] },
    ];
    /** @nocollapse */
    CellTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef, decorators: [{ type: Optional }] }
    ]; };
    return CellTemplateDirective;
}());

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
var GroupHeaderTemplateDirective = /** @class */ (function () {
    function GroupHeaderTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    GroupHeaderTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoGridGroupHeaderTemplate]'
                },] },
    ];
    /** @nocollapse */
    GroupHeaderTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef, decorators: [{ type: Optional }] }
    ]; };
    return GroupHeaderTemplateDirective;
}());

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
var GroupHeaderColumnTemplateDirective = /** @class */ (function () {
    function GroupHeaderColumnTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    GroupHeaderColumnTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoGridGroupHeaderColumnTemplate]'
                },] },
    ];
    /** @nocollapse */
    GroupHeaderColumnTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef, decorators: [{ type: Optional }] }
    ]; };
    return GroupHeaderColumnTemplateDirective;
}());

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
var EditTemplateDirective = /** @class */ (function () {
    function EditTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    EditTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoGridEditTemplate]'
                },] },
    ];
    /** @nocollapse */
    EditTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef, decorators: [{ type: Optional }] }
    ]; };
    return EditTemplateDirective;
}());

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
var GroupFooterTemplateDirective = /** @class */ (function () {
    function GroupFooterTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    GroupFooterTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoGridGroupFooterTemplate]'
                },] },
    ];
    /** @nocollapse */
    GroupFooterTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef, decorators: [{ type: Optional }] }
    ]; };
    return GroupFooterTemplateDirective;
}());

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
var HeaderTemplateDirective = /** @class */ (function () {
    function HeaderTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    HeaderTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoGridHeaderTemplate]'
                },] },
    ];
    /** @nocollapse */
    HeaderTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef, decorators: [{ type: Optional }] }
    ]; };
    return HeaderTemplateDirective;
}());

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
var FooterTemplateDirective = /** @class */ (function () {
    function FooterTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    FooterTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoGridFooterTemplate]'
                },] },
    ];
    /** @nocollapse */
    FooterTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef, decorators: [{ type: Optional }] }
    ]; };
    return FooterTemplateDirective;
}());

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
var ColumnMenuTemplateDirective = /** @class */ (function () {
    function ColumnMenuTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    ColumnMenuTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoGridColumnMenuTemplate]'
                },] },
    ];
    /** @nocollapse */
    ColumnMenuTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef, decorators: [{ type: Optional }] }
    ]; };
    return ColumnMenuTemplateDirective;
}());

/**
 * @hidden
 */
var isSpanColumn = function (column) { return column.isSpanColumn; };
/**
 * @hidden
 */
var isCheckboxColumn = function (column) { return column.isCheckboxColumn; };
var isColumnContainer = function (column) { return column.isColumnGroup || isSpanColumn(column); };
/**
 * The base class for the column components of the Grid.
 */
var ColumnBase$1 = /** @class */ (function () {
    function ColumnBase$$1(parent) {
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
    Object.defineProperty(ColumnBase$$1.prototype, "width", {
        get: function () { return this._width; },
        /**
         * The width of the column (in pixels).
         */
        set: function (value) {
            this._width = parseInt(value, 10);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnBase$$1.prototype, "level", {
        /**
         * @hidden
         */
        get: function () {
            if (this.parent && isSpanColumn(this.parent)) {
                return this.parent.level;
            }
            return this.parent ? this.parent.level + 1 : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnBase$$1.prototype, "isLocked", {
        /**
         * @hidden
         */
        get: function () {
            return this.parent ? this.parent.isLocked : this.locked;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnBase$$1.prototype, "colspan", {
        /**
         * @hidden
         */
        get: function () {
            return 1;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    ColumnBase$$1.prototype.rowspan = function (totalColumnLevels) {
        return this.level < totalColumnLevels ? (totalColumnLevels - this.level) + 1 : 1;
    };
    Object.defineProperty(ColumnBase$$1.prototype, "headerTemplateRef", {
        /**
         * @hidden
         */
        get: function () {
            var template = this.headerTemplates.first;
            return template ? template.templateRef : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnBase$$1.prototype, "footerTemplateRef", {
        /**
         * @hidden
         */
        get: function () {
            return this.footerTemplate ? this.footerTemplate.templateRef : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnBase$$1.prototype, "columnMenuTemplateRef", {
        /**
         * @hidden
         */
        get: function () {
            var template = this.columnMenuTemplates.first;
            return template ? template.templateRef : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnBase$$1.prototype, "displayTitle", {
        /**
         * @hidden
         */
        get: function () {
            return this.title;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnBase$$1.prototype, "isVisible", {
        /**
         * @hidden
         */
        get: function () {
            return !this.hidden && this.matchesMedia;
        },
        enumerable: true,
        configurable: true
    });
    ColumnBase$$1.propDecorators = {
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
    return ColumnBase$$1;
}());

/**
 * Represents the filter-cell template ([see example]({% slug builtinfiltertemplate_grid %}#toc-customizing-filter-rows)).
 */
var FilterCellTemplateDirective = /** @class */ (function () {
    function FilterCellTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    FilterCellTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoGridFilterCellTemplate]'
                },] },
    ];
    /** @nocollapse */
    FilterCellTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef, decorators: [{ type: Optional }] }
    ]; };
    return FilterCellTemplateDirective;
}());

/**
 * Represents the filter-menu template
 * ([see example]({% slug builtinfiltertemplate_grid %}#toc-customizing-filter-menus)).
 */
var FilterMenuTemplateDirective = /** @class */ (function () {
    function FilterMenuTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    FilterMenuTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoGridFilterMenuTemplate]'
                },] },
    ];
    /** @nocollapse */
    FilterMenuTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef, decorators: [{ type: Optional }] }
    ]; };
    return FilterMenuTemplateDirective;
}());

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
var ColumnComponent = /** @class */ (function (_super) {
    __extends(ColumnComponent, _super);
    function ColumnComponent(parent) {
        var _this = _super.call(this, parent) || this;
        /**
         * Allows the column headers to be clicked and the `sortChange` event emitted.
         * You have to handle the `sortChange` event yourself and sort the data.
         */
        _this.sortable = true;
        /**
         * Determines if the column can be dragged to the group panel. The default value is `true`.
         * If set to `false`, you can group the columns by the column field by using the API of the Grid.
         */
        _this.groupable = true;
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
        _this.editor = 'text';
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
        _this.filter = 'text';
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
        _this.filterable = true;
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
        _this.editable = true;
        return _this;
    }
    Object.defineProperty(ColumnComponent.prototype, "templateRef", {
        get: function () {
            return this.template ? this.template.templateRef : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnComponent.prototype, "groupHeaderTemplateRef", {
        get: function () {
            return this.groupHeaderTemplate ? this.groupHeaderTemplate.templateRef : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnComponent.prototype, "groupHeaderColumnTemplateRef", {
        get: function () {
            return this.groupHeaderColumnTemplate ? this.groupHeaderColumnTemplate.templateRef : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnComponent.prototype, "groupFooterTemplateRef", {
        get: function () {
            return this.groupFooterTemplate ? this.groupFooterTemplate.templateRef : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnComponent.prototype, "editTemplateRef", {
        get: function () {
            return this.editTemplate ? this.editTemplate.templateRef : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnComponent.prototype, "filterCellTemplateRef", {
        get: function () {
            return this.filterCellTemplate ? this.filterCellTemplate.templateRef : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnComponent.prototype, "filterMenuTemplateRef", {
        get: function () {
            return this.filterMenuTemplate ? this.filterMenuTemplate.templateRef : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnComponent.prototype, "displayTitle", {
        get: function () {
            return this.title === undefined ? this.field : this.title;
        },
        enumerable: true,
        configurable: true
    });
    ColumnComponent.decorators = [
        { type: Component, args: [{
                    providers: [
                        {
                            provide: ColumnBase$1,
                            useExisting: forwardRef(function () { return ColumnComponent; })
                        }
                    ],
                    selector: 'kendo-grid-column',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    ColumnComponent.ctorParameters = function () { return [
        { type: ColumnBase$1, decorators: [{ type: SkipSelf }, { type: Host }, { type: Optional }] }
    ]; };
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
    return ColumnComponent;
}(ColumnBase$1));

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
var SpanColumnComponent = /** @class */ (function (_super) {
    __extends(SpanColumnComponent, _super);
    function SpanColumnComponent(parent) {
        var _this = _super.call(this, parent) || this;
        /*
         * @hidden
         */
        _this.isSpanColumn = true;
        _this.template = new QueryList();
        _this.editTemplate = new QueryList();
        /**
         * @hidden
         */
        _this.childColumns = new QueryList();
        /**
         * @hidden
         */
        _this.includeInChooser = false;
        _this._editable = true;
        _this._locked = false;
        if (parent && parent.isSpanColumn) {
            throw new Error('SpanColumn cannot be nested inside another SpanColumn');
        }
        return _this;
    }
    Object.defineProperty(SpanColumnComponent.prototype, "editable", {
        get: function () {
            return isPresent(this.editTemplateRef) && this._editable;
        },
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
        set: function (value) {
            this._editable = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SpanColumnComponent.prototype, "width", {
        get: function () {
            return this.childColumns.reduce(function (total, column) { return total + column.width; }, 0);
        },
        /**
         * @hidden
         * added for backwards compitability
         */
        set: function (_value) {
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SpanColumnComponent.prototype, "leafIndex", {
        /**
         * @hidden
         */
        get: function () {
            return this.childColumns.first.leafIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SpanColumnComponent.prototype, "templateRef", {
        /**
         * @hidden
         */
        get: function () {
            var template = this.template.first;
            return template ? template.templateRef : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SpanColumnComponent.prototype, "editTemplateRef", {
        /**
         * @hidden
         */
        get: function () {
            var editTemplate = this.editTemplate.first;
            return editTemplate ? editTemplate.templateRef : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SpanColumnComponent.prototype, "colspan", {
        /**
         * @hidden
         */
        get: function () {
            return this.childColumns.filter(function (c) { return c.isVisible; }).length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SpanColumnComponent.prototype, "locked", {
        get: function () {
            return this._locked || this.childColumns.some(function (c) { return c.locked; });
        },
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
        set: function (value) {
            this._locked = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SpanColumnComponent.prototype, "childrenArray", {
        get: function () {
            return this.childColumns.toArray();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SpanColumnComponent.prototype, "hasChildren", {
        get: function () {
            return this.childColumns.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    SpanColumnComponent.decorators = [
        { type: Component, args: [{
                    providers: [
                        {
                            provide: ColumnBase$1,
                            useExisting: forwardRef(function () { return SpanColumnComponent; })
                        }
                    ],
                    selector: 'kendo-grid-span-column',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    SpanColumnComponent.ctorParameters = function () { return [
        { type: ColumnBase$1, decorators: [{ type: SkipSelf }, { type: Host }, { type: Optional }] }
    ]; };
    SpanColumnComponent.propDecorators = {
        template: [{ type: ContentChildren, args: [CellTemplateDirective, { descendants: false },] }],
        editTemplate: [{ type: ContentChildren, args: [EditTemplateDirective, { descendants: false },] }],
        childColumns: [{ type: ContentChildren, args: [ColumnComponent,] }],
        editable: [{ type: Input }],
        locked: [{ type: Input }]
    };
    return SpanColumnComponent;
}(ColumnBase$1));

/**
 * @hidden
 */
var expandColumns = function (columns) { return (columns.reduce(function (acc, column) { return acc.concat(isSpanColumnComponent(column) ? column.childrenArray : [column]); }, []) // tslint:disable-line:align
); };
/**
 * @hidden
 */
var expandColumnsWithSpan = function (columns) { return (columns.reduce(function (acc, column) { return acc.concat(isSpanColumnComponent(column) ?
    [column].concat(column.childrenArray) :
    [column]); }, []) // tslint:disable-line:align
); };
/**
 * @hidden
 */
var columnsToRender = function (columns) { return (expandColumns(columns).filter(function (x) { return x.isVisible; })); };
var sumProp = function (prop) { return function (array) {
    return (array || []).reduce(function (prev, curr) { return prev + (curr[prop] || 0); }, 0);
}; };
/**
 * @hidden
 */
var sumColumnWidths = sumProp('width');
/**
 * @hidden
 */
var columnsSpan = sumProp('colspan');
// tslint:disable-next-line:max-line-length
var validField = new RegExp("^[$A-Z_a-z][$A-Z_a-z0-9\\.]*$");
/**
 * @hidden
 */
var isValidFieldName = function (fieldName) {
    return !isNullOrEmptyString(fieldName) && validField.test(fieldName) &&
        fieldName[0] !== "." && fieldName[fieldName.length - 1] !== ".";
};
/**
 * @hidden
 */
var children = function (column) { return column.children.filter(function (child) { return child !== column; }); };
/**
 * @hidden
 */
var leafColumns = function (columns) {
    return columns.reduce(function (acc, column) {
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
    }, []).filter(function (x) { return x.isVisible; }); // tslint:disable-line:align
};
/**
 * @hidden
 */
var someLeafColumn = function (callback) {
    var columns = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        columns[_i - 1] = arguments[_i];
    }
    return leafColumns(columns).some(callback);
};
/**
 * @hidden
 */
var resizableColumns = function (columns) { return columns.filter(function (column) { return isTruthy(column.resizable) && column.isVisible; }); };
/**
 * @hidden
 */
var sortColumns = function (columns) {
    return orderBy(columns, [{ field: 'orderIndex', dir: 'asc' }]);
};
/**
 * @hidden
 */
var isInSpanColumn = function (column) {
    return isTruthy(column.parent) && isSpanColumnComponent(column.parent);
};

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
var ColumnGroupComponent = /** @class */ (function (_super) {
    __extends(ColumnGroupComponent, _super);
    function ColumnGroupComponent(parent) {
        var _this = _super.call(this, parent) || this;
        _this.parent = parent;
        /**
         * @hidden
         */
        _this.includeInChooser = false;
        /**
         * @hidden
         */
        _this.isColumnGroup = true;
        /**
         * @hidden
         */
        _this.minResizableWidth = 10;
        if (parent && parent.isSpanColumn) {
            throw new Error('ColumnGroupComponent cannot be nested inside SpanColumnComponent');
        }
        return _this;
    }
    /**
     * @hidden
     */
    ColumnGroupComponent.prototype.rowspan = function () {
        return 1;
    };
    Object.defineProperty(ColumnGroupComponent.prototype, "colspan", {
        /**
         * @hidden
         */
        get: function () {
            var _this = this;
            if (!this.children || this.children.length === 1) {
                return 1;
            }
            return columnsSpan(this.children
                .filter(function (child) { return child !== _this && child.isVisible; }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnGroupComponent.prototype, "leafIndex", {
        /**
         * @hidden
         */
        get: function () {
            return this.children ? (this.firstChild || {}).leafIndex : -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnGroupComponent.prototype, "childrenArray", {
        get: function () {
            var _this = this;
            return this.children.filter(function (c) { return c !== _this; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnGroupComponent.prototype, "hasChildren", {
        get: function () {
            return Boolean(this.firstChild);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnGroupComponent.prototype, "firstChild", {
        get: function () {
            var _this = this;
            return this.children.find(function (column) { return column !== _this; });
        },
        enumerable: true,
        configurable: true
    });
    ColumnGroupComponent.decorators = [
        { type: Component, args: [{
                    providers: [
                        {
                            provide: ColumnBase$1,
                            useExisting: forwardRef(function () { return ColumnGroupComponent; })
                        }
                    ],
                    selector: 'kendo-grid-column-group',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    ColumnGroupComponent.ctorParameters = function () { return [
        { type: ColumnBase$1, decorators: [{ type: SkipSelf }, { type: Host }, { type: Optional }] }
    ]; };
    ColumnGroupComponent.propDecorators = {
        children: [{ type: ContentChildren, args: [ColumnBase$1,] }]
    };
    return ColumnGroupComponent;
}(ColumnBase$1));

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
var DetailTemplateDirective = /** @class */ (function () {
    function DetailTemplateDirective(templateRef) {
        this.templateRef = templateRef;
        this._condition = function () { return true; };
    }
    Object.defineProperty(DetailTemplateDirective.prototype, "showIf", {
        get: function () {
            return this._condition;
        },
        /**
         * Defines the function that indicates if a given detail row and the associated **Expand** or **Collapse** button will be displayed.
         */
        set: function (fn) {
            if (typeof fn !== 'function') {
                throw new Error("showIf must be a function, but received " + JSON.stringify(fn) + ".");
            }
            this._condition = fn;
        },
        enumerable: true,
        configurable: true
    });
    DetailTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoGridDetailTemplate]'
                },] },
    ];
    /** @nocollapse */
    DetailTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef, decorators: [{ type: Optional }] }
    ]; };
    DetailTemplateDirective.propDecorators = {
        showIf: [{ type: Input, args: ["kendoGridDetailTemplateShowIf",] }]
    };
    return DetailTemplateDirective;
}());

var canCreateElement = function () { return isDocumentAvailable() && document.createElement; };
var cachedScrollbarWidth = null;
var cachedPixelRatio;
var cachedRtlScrollLeft = null;
function scrollbarWidth() {
    if (cachedScrollbarWidth === null && canCreateElement()) {
        cachedPixelRatio = window.devicePixelRatio || 1;
        var div = document.createElement("div");
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
        var div = document.createElement("div");
        div.style.cssText = "overflow:scroll;zoom:1;clear:both;display:block;width:100px;visibility:hidden;position:absolute;left:-10000px;direction:rtl;";
        div.innerHTML = "<div style='width:200px;height:1px;'</div>";
        document.body.appendChild(div);
        var initial = div.scrollLeft;
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
var BrowserSupportService = /** @class */ (function () {
    function BrowserSupportService(zone, changeDetector) {
        var _this = this;
        this.zone = zone;
        this.changeDetector = changeDetector;
        this.changes = new EventEmitter();
        if (typeof window === 'undefined') {
            return;
        }
        this.zone.runOutsideAngular(function () {
            _this.subscriptions = fromEvent(window, 'resize').pipe(auditTime(100)).subscribe(function () {
                if (cachedPixelRatio !== window.devicePixelRatio) {
                    zone.run(function () {
                        cachedScrollbarWidth = null;
                        _this.changes.emit();
                        _this.changeDetector.markForCheck();
                    });
                }
            });
        });
    }
    BrowserSupportService.prototype.ngOnDestroy = function () {
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
            this.subscriptions = null;
        }
    };
    Object.defineProperty(BrowserSupportService.prototype, "scrollbarWidth", {
        get: function () {
            return scrollbarWidth();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BrowserSupportService.prototype, "rtlScrollLeft", {
        get: function () {
            return rtlScrollLeft();
        },
        enumerable: true,
        configurable: true
    });
    BrowserSupportService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    BrowserSupportService.ctorParameters = function () { return [
        { type: NgZone },
        { type: ChangeDetectorRef }
    ]; };
    return BrowserSupportService;
}());

/* tslint:disable:use-life-cycle-interface */
var isGroupItem = function (source) {
    return source.items !== undefined &&
        source.field !== undefined;
};
var isVirtualGroupItem = function (source) {
    return source.offset !== undefined &&
        source.skipHeader !== undefined;
};
var flattenGroups = function (groups) { return (groups.reduce(function (acc, curr) {
    if (isGroupItem(curr)) {
        return acc.concat(flattenGroups(curr.items));
    }
    return acc.concat([curr]);
}, []) // tslint:disable-line:align
); };
/**
 * @hidden
 */
var itemAt = function (data, index) {
    var first = data[0];
    if (isPresent(first) && isGroupItem(first)) {
        return flattenGroups(data)[index];
    }
    return data[index];
};
/**
 * @hidden
 */
var getIterator$1 = function (data, _a) {
    var footers = _a.footers, level = _a.level, dataIndex = _a.dataIndex, parentGroupIndex = _a.parentGroupIndex, groupIndex = _a.groupIndex;
    var first = data[0];
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
var ArrayIterator = /** @class */ (function () {
    function ArrayIterator(arr, idx) {
        if (idx === void 0) { idx = 0; }
        this.arr = arr;
        this.idx = idx;
        this.arr = arr || [];
    }
    ArrayIterator.prototype[iterator] = function () {
        return this;
    };
    ArrayIterator.prototype.next = function () {
        return this.idx < this.arr.length ? {
            done: false,
            value: this.arr[this.idx++]
        } : { done: true, value: undefined };
    };
    return ArrayIterator;
}());
/**
 * @hidden
 */
var Iterator = /** @class */ (function () {
    function Iterator(arr, dataIndex, resultMap) {
        if (dataIndex === void 0) { dataIndex = 0; }
        if (resultMap === void 0) { resultMap = function (x) { return x; }; }
        this.dataIndex = dataIndex;
        this.resultMap = resultMap;
        var iter = arr[iterator];
        this._innerIterator = iter ? arr[iterator]() : new ArrayIterator(arr);
    }
    Iterator.prototype[iterator] = function () {
        return this;
    };
    Iterator.prototype.next = function () {
        return this.resultMap(this._innerIterator.next(), this.dataIndex++);
    };
    return Iterator;
}());
/**
 * @hidden
 */
var ItemIterator = /** @class */ (function (_super) {
    __extends(ItemIterator, _super);
    function ItemIterator(arr, dataIndex, groupIndex) {
        return _super.call(this, arr, dataIndex, function (x, idx) { return ({
            done: x.done,
            value: {
                data: x.value,
                groupIndex: groupIndex,
                index: idx,
                type: 'data'
            }
        }); }) || this;
    }
    Object.defineProperty(ItemIterator.prototype, "index", {
        /**
         * The index of the next record.
         * @readonly
         * @type {number}
         */
        get: function () {
            return this.dataIndex;
        },
        enumerable: true,
        configurable: true
    });
    return ItemIterator;
}(Iterator));
var prefix = function (s, n) {
    var p = s ? s + "_" : s;
    return "" + p + n;
};
/**
 * @hidden
 */
var GroupIterator = /** @class */ (function () {
    function GroupIterator(arr, outputFooters, level, dataIndex, parentIndex, groupIndex) {
        if (outputFooters === void 0) { outputFooters = false; }
        if (level === void 0) { level = 0; }
        if (dataIndex === void 0) { dataIndex = 0; }
        if (parentIndex === void 0) { parentIndex = ""; }
        if (groupIndex === void 0) { groupIndex = 0; }
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
    GroupIterator.prototype[iterator] = function () {
        return this;
    };
    GroupIterator.prototype.nextGroupItem = function () {
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
    };
    GroupIterator.prototype.footerItem = function () {
        if (this.current) {
            var group = this.current;
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
    };
    GroupIterator.prototype.innerIterator = function (group) {
        if (!this._innerIterator) {
            this._innerIterator = getIterator$1(group.items, {
                dataIndex: this.dataIndex,
                footers: this.outputFooters,
                level: this.level + 1,
                parentGroupIndex: this.currentGroupIndex
            });
        }
        return this._innerIterator;
    };
    GroupIterator.prototype.nextDataItem = function (group) {
        var iterator$$1 = this.innerIterator(group);
        var result = iterator$$1.next();
        if (isPresent(result.value) && !result.done && result.value.type === "data") {
            this.dataIndex = result.value.index + 1;
        }
        return !result.done ? result : undefined;
    };
    GroupIterator.prototype.next = function () {
        if (!isPresent(this.current)) {
            return this.nextGroupItem();
        }
        var item = this.nextDataItem(this.current);
        return item ? item : (this.outputFooters ? this.footerItem() : this.nextGroupItem());
    };
    Object.defineProperty(GroupIterator.prototype, "index", {
        /**
         * The index of the last iterated data record.
         * @readonly
         * @type {number}
         */
        get: function () {
            return this.dataIndex + 1;
        },
        enumerable: true,
        configurable: true
    });
    return GroupIterator;
}());

/**
 * @hidden
 */
var DataResultIterator = /** @class */ (function () {
    function DataResultIterator(source, skip, groupFooters) {
        if (skip === void 0) { skip = 0; }
        if (groupFooters === void 0) { groupFooters = false; }
        this.source = source;
        this.skip = skip;
        this.groupFooters = groupFooters;
        this.source = this.source ? this.source : [];
        this.isObject = this.isGridDataResult(this.source);
    }
    DataResultIterator.prototype.isGridDataResult = function (source) {
        return source.total !== undefined && source.data !== undefined;
    };
    Object.defineProperty(DataResultIterator.prototype, "total", {
        get: function () {
            return this.isObject ? this.source.total : this.source.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataResultIterator.prototype, "data", {
        get: function () {
            return this.isObject ? this.source.data : this.source;
        },
        enumerable: true,
        configurable: true
    });
    DataResultIterator.prototype.map = function (fn) {
        return this.data.map(fn);
    };
    DataResultIterator.prototype.filter = function (fn) {
        return this.data.filter(fn);
    };
    DataResultIterator.prototype.reduce = function (fn, init) {
        return this.data.reduce(fn, init);
    };
    DataResultIterator.prototype.forEach = function (fn) {
        this.data.forEach(fn);
    };
    DataResultIterator.prototype.some = function (fn) {
        return this.data.some(fn);
    };
    DataResultIterator.prototype[iterator] = function () {
        return getIterator$1(this.data, {
            dataIndex: this.skip,
            footers: this.groupFooters,
            groupIndex: this.skip
        });
    };
    DataResultIterator.prototype.toString = function () { return this.data.toString(); };
    return DataResultIterator;
}());
/**
 * @hidden
 */
var DataCollection = /** @class */ (function () {
    function DataCollection(accessor) {
        this.accessor = accessor;
    }
    Object.defineProperty(DataCollection.prototype, "total", {
        get: function () { return this.accessor().total; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataCollection.prototype, "length", {
        get: function () { return this.accessor().data.length; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataCollection.prototype, "first", {
        get: function () { return this.accessor().data[0]; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataCollection.prototype, "last", {
        get: function () { return this.accessor().data[this.length - 1]; },
        enumerable: true,
        configurable: true
    });
    DataCollection.prototype.at = function (index) {
        return itemAt(this.accessor().data, index);
    };
    DataCollection.prototype.map = function (fn) { return this.accessor().map(fn); };
    DataCollection.prototype.filter = function (fn) {
        return this.accessor().filter(fn);
    };
    DataCollection.prototype.reduce = function (fn, init) {
        return this.accessor().reduce(fn, init);
    };
    DataCollection.prototype.forEach = function (fn) {
        this.accessor().forEach(fn);
    };
    DataCollection.prototype.some = function (fn) {
        return this.accessor().some(fn);
    };
    DataCollection.prototype[iterator] = function () {
        return this.accessor()[iterator]();
    };
    DataCollection.prototype.toString = function () { return this.accessor().toString(); };
    return DataCollection;
}());

/* tslint:disable:no-input-rename */
/**
 * @hidden
 */
var Selection = /** @class */ (function () {
    function Selection(grid, cd) {
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
    Selection.prototype.init = function () {
        var _this = this;
        if (!isPresent(this.grid.rowSelected)) {
            this.grid.rowSelected = function (row) {
                return _this.selectedKeys.indexOf(_this.getItemKey(row)) >= 0;
            };
        }
        if (!isPresent(this.grid.cellSelected)) {
            this.grid.cellSelected = function (row, column, colIndex) {
                var contender = _this.getSelectionItem(row, column, colIndex);
                return {
                    selected: _this.selectedKeys.some(function (item) { return item.columnKey === contender.columnKey && item.itemKey === contender.itemKey; }),
                    item: contender
                };
            };
        }
        this.selectionChangeSubscription = this.grid
            .selectionChange
            .subscribe(this.onSelectionChange.bind(this));
    };
    /**
     * @hidden
     */
    Selection.prototype.destroy = function () {
        this.selectionChangeSubscription.unsubscribe();
    };
    /**
     * @hidden
     */
    Selection.prototype.reset = function () {
        this.selectedKeys = [];
    };
    Selection.prototype.getItemKey = function (row) {
        if (this.selectionKey) {
            if (typeof this.selectionKey === "string") {
                return row.dataItem[this.selectionKey];
            }
            if (typeof this.selectionKey === "function") {
                return this.selectionKey(row);
            }
        }
        return row.index;
    };
    Selection.prototype.getSelectionItem = function (row, col, colIndex) {
        var itemIdentifiers = {};
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
    };
    Selection.prototype.onSelectionChange = function (selection) {
        var _this = this;
        if (selection.selectedRows) {
            selection.deselectedRows.forEach(function (item) {
                var itemKey = _this.getItemKey(item);
                var itemIndex = _this.selectedKeys.indexOf(itemKey);
                if (itemIndex >= 0) {
                    _this.selectedKeys.splice(itemIndex, 1);
                }
            });
            if (this.grid.selectableSettings.mode === "single" && this.selectedKeys.length > 0) {
                this.reset();
            }
            selection.selectedRows.forEach(function (item) {
                var itemKey = _this.getItemKey(item);
                if (_this.selectedKeys.indexOf(itemKey) < 0) {
                    _this.selectedKeys.push(itemKey);
                }
            });
        }
        else {
            selection.deselectedCells.forEach(function (item) {
                var itemIndex = _this.getCellSelectionItemIndex(item);
                if (itemIndex >= 0) {
                    _this.selectedKeys.splice(itemIndex, 1);
                }
            });
            if (this.grid.selectableSettings.mode === "single" && this.selectedKeys.length > 0) {
                this.reset();
            }
            selection.selectedCells.forEach(function (item) {
                var itemIndex = _this.getCellSelectionItemIndex(item);
                if (itemIndex < 0) {
                    _this.selectedKeys.push(item);
                }
            });
        }
        this.cd.markForCheck();
        this.selectedKeysChange.emit(this.selectedKeys);
    };
    Selection.prototype.getCellSelectionItemIndex = function (item) {
        return this.selectedKeys.findIndex(function (selectedItem) {
            return selectedItem.itemKey === item.itemKey && selectedItem.columnKey === item.columnKey;
        });
    };
    Selection.propDecorators = {
        selectedKeys: [{ type: Input }],
        selectionKey: [{ type: Input, args: ["kendoGridSelectBy",] }],
        columnKey: [{ type: Input }],
        selectedKeysChange: [{ type: Output }]
    };
    return Selection;
}());

var reset = function () {
    var lists = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        lists[_i] = arguments[_i];
    }
    var diff = false;
    for (var idx = 0; idx < lists.length; idx++) {
        var _a = lists[idx], list = _a[0], columns = _a[1];
        diff = diff || list.length !== columns.length;
        list.reset(columns);
    }
    return diff;
};
/**
 * @hidden
 */
var ColumnsContainer = /** @class */ (function () {
    function ColumnsContainer(columns) {
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
    ColumnsContainer.prototype.refresh = function () {
        var _this = this;
        var currentLevels = this.totalLevels;
        var leafColumns$$1 = new Array();
        var lockedLeafColumns = new Array();
        var nonLockedLeafColumns = new Array();
        var lockedColumns = new Array();
        var nonLockedColumns = new Array();
        var allColumns = new Array();
        var leafColumnsToRender = new Array();
        var lockedColumnsToRender = new Array();
        var nonLockedColumnsToRender = new Array();
        var hasGroupHeaderColumn = false;
        var hasGroupFooter = false;
        var hasFooter = false;
        var unlockedWidth = 0;
        var leafIndex = 0;
        this.totalLevels = 0;
        this.columns().forEach(function (column) {
            var containerLeafColumns = column.isLocked === true ? lockedLeafColumns : nonLockedLeafColumns;
            var containerColumns = column.isLocked === true ? lockedColumns : nonLockedColumns;
            var toRenderContainer = column.isLocked === true ? lockedColumnsToRender : nonLockedColumnsToRender;
            if (!isColumnGroupComponent(column)) {
                containerLeafColumns.push(column);
                leafColumns$$1.push(column);
                leafColumnsToRender.push.apply(leafColumnsToRender, columnsToRender([column]));
                toRenderContainer.push.apply(toRenderContainer, columnsToRender([column]));
                hasGroupHeaderColumn = hasGroupHeaderColumn || someLeafColumn(function (leaf) { return Boolean(leaf.groupHeaderColumnTemplateRef); }, column);
                hasGroupFooter = hasGroupFooter || someLeafColumn(function (leaf) { return Boolean(leaf.groupFooterTemplateRef); }, column);
                hasFooter = hasFooter || someLeafColumn(function (leaf) { return Boolean(leaf.footerTemplateRef); }, column);
                if (!column.isLocked) {
                    unlockedWidth += column.width || 0;
                }
                if (column.isSpanColumn) {
                    column.childColumns.forEach(function (c) {
                        c.leafIndex = leafIndex++;
                    });
                }
                else {
                    column.leafIndex = leafIndex++;
                }
            }
            containerColumns.push(column);
            allColumns.push(column);
            _this.totalLevels = column.level > _this.totalLevels ? column.level : _this.totalLevels;
        });
        this.hasGroupHeaderColumn = hasGroupHeaderColumn;
        this.hasGroupFooter = hasGroupFooter;
        this.hasFooter = hasFooter;
        this.leafColumnsToRender = leafColumnsToRender;
        this.lockedColumnsToRender = lockedColumnsToRender;
        this.nonLockedColumnsToRender = nonLockedColumnsToRender;
        this.unlockedWidth = unlockedWidth;
        var changes = reset([this.leafColumns, leafColumns$$1], [this.lockedLeafColumns, lockedLeafColumns], [this.nonLockedLeafColumns, nonLockedLeafColumns], [this.lockedColumns, lockedColumns], [this.allColumns, allColumns], [this.nonLockedColumns, nonLockedColumns]) || currentLevels !== this.totalLevels;
        if (changes) {
            this.changes.emit();
        }
        return changes;
    };
    return ColumnsContainer;
}());

var forEachColumn = function (list, callback) {
    list.forEach(function (column) {
        callback(column);
        if (column.isColumnGroup && column.hasChildren) {
            forEachColumn(column.childrenArray, callback);
        }
    });
};
var forEachLevel = function (list, callback) {
    sortColumns(list)
        .forEach(function (column) {
        callback(column);
        if (column.isColumnGroup && column.hasChildren) {
            forEachLevel(column.childrenArray, callback);
        }
    });
};
var filterHierarchy = function (list, predicate) {
    var result = [];
    sortColumns(list)
        .forEach(function (column) {
        if (predicate(column)) {
            if (column.isColumnGroup) {
                var children$$1 = filterHierarchy(column.childrenArray, predicate);
                if (children$$1.length) {
                    result.push.apply(result, [column].concat(children$$1));
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
var ColumnList = /** @class */ (function () {
    function ColumnList(columns) {
        this.columns = columns;
    }
    ColumnList.empty = function () {
        return new ColumnList(new QueryList());
    };
    ColumnList.prototype.forEach = function (callback) {
        forEachColumn(this.columns, callback);
    };
    ColumnList.prototype.filter = function (callback) {
        var result = [];
        forEachColumn(this.columns, function (column) {
            if (callback(column)) {
                result.push(column);
            }
        });
        return result;
    };
    ColumnList.prototype.filterHierarchy = function (predicate) {
        return filterHierarchy(this.columns.toArray(), predicate);
    };
    ColumnList.prototype.filterSort = function (callback) {
        var result = [];
        forEachLevel(this.columns.toArray(), function (column) {
            if (callback(column)) {
                result.push(column);
            }
        });
        return result;
    };
    ColumnList.prototype.toArray = function () {
        var result = [];
        forEachColumn(this.columns, function (column) {
            result.push(column);
        });
        return result;
    };
    ColumnList.prototype.rootColumns = function () {
        return this.columns.toArray();
    };
    return ColumnList;
}());

/**
 * @hidden
 */
var GroupInfoService = /** @class */ (function () {
    function GroupInfoService() {
        this._columnList = ColumnList.empty;
    }
    Object.defineProperty(GroupInfoService.prototype, "columns", {
        get: function () {
            return expandColumns(this._columnList().toArray()).filter(isColumnComponent);
        },
        enumerable: true,
        configurable: true
    });
    GroupInfoService.prototype.registerColumnsContainer = function (columns) {
        this._columnList = columns;
    };
    GroupInfoService.prototype.formatForGroup = function (item) {
        var column = this.columnForGroup(item);
        return column ? column.format : "";
    };
    GroupInfoService.prototype.isGroupable = function (groupField) {
        var column = this.columns.filter(function (x) { return x.field === groupField; })[0];
        return column ? column.groupable : true;
    };
    GroupInfoService.prototype.groupTitle = function (item) {
        var column = this.columnForGroup(item);
        return column ? (column.title || column.field) : this.groupField(item);
    };
    GroupInfoService.prototype.groupHeaderTemplate = function (item) {
        var column = this.columnForGroup(item);
        return column ? column.groupHeaderTemplateRef || column.groupHeaderColumnTemplateRef : undefined;
    };
    GroupInfoService.prototype.groupField = function (group) {
        return group.data ? group.data.field : group.field;
    };
    GroupInfoService.prototype.columnForGroup = function (group) {
        var field = this.groupField(group);
        var column = this.columns.filter(function (x) { return x.field === field; })[0];
        return column;
    };
    return GroupInfoService;
}());

/**
 * @hidden
 */
var ChangeNotificationService = /** @class */ (function () {
    function ChangeNotificationService(ngZone) {
        this.ngZone = ngZone;
        this.changes = new EventEmitter();
    }
    ChangeNotificationService.prototype.notify = function () {
        var _this = this;
        if (!this.subscription || this.subscription.closed) {
            this.subscription = this.ngZone.onStable
                .asObservable().pipe(take(1))
                .subscribe(function () { return _this.changes.emit(); });
        }
    };
    ChangeNotificationService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ChangeNotificationService.ctorParameters = function () { return [
        { type: NgZone }
    ]; };
    return ChangeNotificationService;
}());

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
var NoRecordsTemplateDirective = /** @class */ (function () {
    function NoRecordsTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    NoRecordsTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoGridNoRecordsTemplate]'
                },] },
    ];
    /** @nocollapse */
    NoRecordsTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef, decorators: [{ type: Optional }] }
    ]; };
    return NoRecordsTemplateDirective;
}());

var set = function (value) { return function (pair) { return pair.forEach(function (x) { return x.style.height = value; }); }; };
var clearHeight = function (pairs) { return pairs
    .filter(function (_a) {
    var left = _a[0], right = _a[1];
    return left.style.height || right.style.height;
})
    .forEach(set("")); };
var zip$1 = function (arr1, arr2) {
    var result = [];
    for (var idx = 0, len = arr1.length; idx < len; idx++) {
        if (!arr2[idx]) {
            break;
        }
        result.push([arr1[idx], arr2[idx]]);
    }
    return result;
};
var setHeight = function (heights) { return function (row, idx) { return set(heights[idx] + 1 + "px")(row); }; };
var getHeights = function (rows) { return rows.map(function (_a) {
    var left = _a[0], right = _a[1];
    var height = left.offsetHeight;
    var offsetHeight2 = right.offsetHeight;
    if (height < offsetHeight2) {
        return offsetHeight2;
    }
    return height;
}); };
/**
 * @hidden
 */
var syncRowsHeight = function (table1, table2) {
    var activeElement = document.activeElement;
    var rows = zip$1(table1.rows, table2.rows);
    clearHeight(rows);
    var heights = getHeights(rows);
    [table1, table2].forEach(function (x) { return x.style.display = 'none'; });
    rows.forEach(setHeight(heights));
    [table1, table2].forEach(function (x) { return x.style.display = ''; });
    if (document.activeElement !== activeElement &&
        (table1.contains(activeElement) || table2.contains(activeElement))) {
        activeElement.focus();
    }
};

/**
 * Represents a service to set the filter descriptor
 * ([see example]({% slug reusablecustomfilters_grid %})).
 */
var FilterService = /** @class */ (function () {
    function FilterService() {
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
    FilterService.prototype.filter = function (value) {
        this.changes.next(value);
    };
    return FilterService;
}());

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
var PagerTemplateDirective = /** @class */ (function () {
    function PagerTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    PagerTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoPagerTemplate]'
                },] },
    ];
    /** @nocollapse */
    PagerTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef, decorators: [{ type: Optional }] }
    ]; };
    return PagerTemplateDirective;
}());

/**
 * @hidden
 */
var PDFService = /** @class */ (function () {
    function PDFService() {
        this.savePDF = new EventEmitter();
        this.drawPDF = new EventEmitter();
        this.exportClick = new EventEmitter();
        this.dataChanged = new EventEmitter();
    }
    PDFService.prototype.save = function (component) {
        this.emitEvent(this.savePDF, component);
    };
    PDFService.prototype.draw = function (component, promise) {
        this.emitEvent(this.drawPDF, { component: component, promise: promise });
    };
    PDFService.prototype.emitEvent = function (emitter, args) {
        if (emitter.observers.length === 0) {
            if (isDevMode()) {
                throw new Error('Creating PDF requires including the PDFModule and adding the <kendo-grid-pdf> component.');
            }
        }
        else {
            emitter.emit(args);
        }
    };
    PDFService.decorators = [
        { type: Injectable },
    ];
    return PDFService;
}());

/**
 * Arguments for the `pdfExport` event.
 */
var PDFExportEvent = /** @class */ (function (_super) {
    __extends(PDFExportEvent, _super);
    function PDFExportEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return PDFExportEvent;
}(PreventableEvent));

/**
 * @hidden
 */
var SuspendService = /** @class */ (function () {
    function SuspendService() {
        this.scroll = false;
    }
    SuspendService.decorators = [
        { type: Injectable },
    ];
    return SuspendService;
}());

/* tslint:disable: object-literal-sort-keys */
var bootstrapToMedia = function (media) { return (({
    "xs": "(max-width: 576px)",
    "sm": "(min-width: 576px)",
    "md": "(min-width: 768px)",
    "lg": "(min-width: 992px)",
    "xl": "(min-width: 1200px)"
})[media] || media); };
/* tslint:enable: object-literal-sort-keys */
var browserMatchMedia = function (media) { return window.matchMedia(media).matches; };
/**
 * @hidden
 */
var ResponsiveService = /** @class */ (function () {
    function ResponsiveService() {
        /**
         * @hidden
         */
        this.matchMedia = browserMatchMedia;
    }
    /**
     * @hidden
     */
    ResponsiveService.prototype.matchesMedia = function (media) {
        return !media || this.matchMedia(bootstrapToMedia(media));
    };
    ResponsiveService.decorators = [
        { type: Injectable },
    ];
    return ResponsiveService;
}());

/**
 * @hidden
 */
var ExcelService = /** @class */ (function () {
    function ExcelService() {
        this.saveToExcel = new EventEmitter();
        this.exportClick = new EventEmitter();
    }
    ExcelService.prototype.save = function (component) {
        if (this.saveToExcel.observers.length === 0) {
            if (isDevMode()) {
                throw new Error('Saving excel requires including the ExcelModule and adding the <kendo-grid-excel> component.');
            }
        }
        else {
            this.saveToExcel.emit(component);
        }
    };
    ExcelService.decorators = [
        { type: Injectable },
    ];
    return ExcelService;
}());

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
var ToolbarTemplateDirective = /** @class */ (function () {
    function ToolbarTemplateDirective(templateRef) {
        this.templateRef = templateRef;
        this._position = "top";
    }
    Object.defineProperty(ToolbarTemplateDirective.prototype, "position", {
        get: function () {
            return this._position;
        },
        /**
         * The position of the toolbar ([see example]({% slug toolbartemplate_grid %})).
         *
         * The possible values are:
         * - `top`&mdash;Positions the toolbar above the group panel or header.
         * - `bottom`&mdash;Positions the toolbar below the pager.
         * - `both`&mdash;Displays two toolbar instances. Positions the first one above
         * the group panel or header and the second one below the pager.
         */
        set: function (position) {
            this._position = position;
        },
        enumerable: true,
        configurable: true
    });
    ToolbarTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoGridToolbarTemplate]'
                },] },
    ];
    /** @nocollapse */
    ToolbarTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef, decorators: [{ type: Optional }] }
    ]; };
    ToolbarTemplateDirective.propDecorators = {
        position: [{ type: Input, args: ["position",] }]
    };
    return ToolbarTemplateDirective;
}());

/**
 * @hidden
 */
var ScrollSyncService = /** @class */ (function () {
    function ScrollSyncService(ngZone) {
        var _this = this;
        this.ngZone = ngZone;
        this.changes = new Subject();
        this.elements = [];
        this.subscriptions = new Subscription();
        this.headerSubscription = new Subscription();
        this.bodySubscription = new Subscription();
        this.subscriptions.add(this.changes.subscribe(function (args) { return _this.scrollLeft(args); }));
    }
    ScrollSyncService.prototype.registerEmitter = function (el, sourceType) {
        var _this = this;
        this.unregister(sourceType);
        this.elements.push({ element: el, sourceType: sourceType });
        if (sourceType === "body" || sourceType === "header") {
            this.ngZone.runOutsideAngular(function () {
                var obs = fromEvent(el, "scroll").pipe(map(function (_a) {
                    var scrollLeft = _a.target.scrollLeft;
                    return ({
                        scrollLeft: scrollLeft,
                        sourceType: sourceType
                    });
                }));
                var subscription = obs.pipe(distinctUntilChanged(function (x, y) { return (x.scrollLeft === y.scrollLeft); }), filter(function (x) { return !_this.source || _this.source === x.sourceType; }), tap(function (x) { return _this.source = x.sourceType; }))
                    .subscribe(function (x) { return _this.changes.next(x); });
                subscription.add(obs.pipe(filter(function (x) { return _this.source && _this.source !== x.sourceType; }))
                    .subscribe(function () { return _this.source = undefined; }));
                if (sourceType === "body") {
                    _this.bodySubscription.add(subscription);
                }
                else {
                    _this.headerSubscription.add(subscription);
                }
            });
        }
    };
    /**
     * destroy
     */
    ScrollSyncService.prototype.destroy = function () {
        this.subscriptions.unsubscribe();
        this.headerSubscription.unsubscribe();
        this.bodySubscription.unsubscribe();
    };
    ScrollSyncService.prototype.scrollLeft = function (_a) {
        var _this = this;
        var scrollLeft = _a.scrollLeft, sourceType = _a.sourceType;
        this.ngZone.runOutsideAngular(function () {
            _this.elements
                .filter(function (x) { return sourceType !== x.sourceType; })
                .forEach(function (_a) {
                var element = _a.element;
                return element.scrollLeft = scrollLeft;
            });
        });
    };
    ScrollSyncService.prototype.unregister = function (sourceType) {
        var index = this.elements.findIndex(function (x) { return x.sourceType === sourceType; });
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
    };
    ScrollSyncService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ScrollSyncService.ctorParameters = function () { return [
        { type: NgZone }
    ]; };
    return ScrollSyncService;
}());

/**
 * @hidden
 */
var ResizeService = /** @class */ (function () {
    function ResizeService() {
        this.resizeSubscription = new Subscription(function () { });
        this.dispatcher = new Subject();
        // tslint:disable-next-line:member-ordering
        this.changes = this.dispatcher.asObservable().pipe(throttleTime(100));
    }
    ResizeService.prototype.connect = function (resizes) {
        this.resizeSubscription.add(resizes.subscribe(this.dispatcher));
    };
    ResizeService.prototype.destroy = function () {
        if (this.resizeSubscription) {
            this.resizeSubscription.unsubscribe();
        }
    };
    ResizeService.decorators = [
        { type: Injectable },
    ];
    return ResizeService;
}());

/**
 * @hidden
 */
var isLocked = function (column) { return column.parent ? isLocked(column.parent) : !!column.locked; };
/**
 * @hidden
 */
var resizeArgs = function (column, extra) { return Object.assign({
    columns: leafColumns([column]),
    locked: isLocked(column)
}, extra); }; // tslint:disable-line:align
/**
 * @hidden
 */
var ColumnResizingService = /** @class */ (function () {
    function ColumnResizingService() {
        this.changes = new EventEmitter();
        this.tables = [];
        this.batch = null;
    }
    ColumnResizingService.prototype.start = function (column) {
        this.trackColumns(column);
        var columns = (this.column.isColumnGroup ? [column] : [])
            .concat(leafColumns([column]));
        this.changes.emit({
            columns: columns,
            locked: isLocked(this.column),
            type: 'start'
        });
    };
    ColumnResizingService.prototype.resizeColumns = function (deltaPercent) {
        var action = resizeArgs(this.column, {
            deltaPercent: deltaPercent,
            type: 'resizeColumn'
        });
        this.changes.emit(action);
    };
    ColumnResizingService.prototype.resizeTable = function (column, delta) {
        var action = resizeArgs(column, {
            delta: delta,
            type: 'resizeTable'
        });
        this.changes.emit(action);
    };
    ColumnResizingService.prototype.resizedColumn = function (state$$1) {
        this.resizedColumns.push(state$$1);
    };
    ColumnResizingService.prototype.end = function () {
        this.changes.emit({
            columns: [],
            resizedColumns: this.resizedColumns,
            type: 'end'
        });
    };
    ColumnResizingService.prototype.registerTable = function (tableMetadata) {
        var _this = this;
        this.tables.push(tableMetadata);
        var unregisterTable = function () {
            _this.tables.splice(_this.tables.indexOf(tableMetadata), 1);
        };
        return unregisterTable;
    };
    ColumnResizingService.prototype.measureColumns = function (info) {
        var _this = this;
        var _a;
        if (this.batch !== null) {
            (_a = this.batch).push.apply(_a, info);
        }
        else {
            this.autoFitBatch(info, function () { return _this.end(); });
        }
    };
    ColumnResizingService.prototype.autoFit = function () {
        var _this = this;
        var columns = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            columns[_i] = arguments[_i];
        }
        var nonLockedColumns = columns.filter(function (column) { return !column.isLocked; });
        this.autoFitStart(nonLockedColumns);
        this.autoFitBatch(this.batch, function () {
            if (nonLockedColumns.length < columns.length) {
                var lockedColumns = columns.filter(function (column) { return column.isLocked; });
                _this.autoFitStart(lockedColumns);
                _this.autoFitBatch(_this.batch, function () { return _this.end(); });
            }
            else {
                _this.end();
            }
        });
    };
    ColumnResizingService.prototype.trackColumns = function (column) {
        this.resizedColumns = [];
        this.column = column;
    };
    ColumnResizingService.prototype.autoFitStart = function (columns) {
        this.batch = [];
        this.resizedColumns = [];
        if (columns.length === 0) {
            return;
        }
        var locked = columns[0].isLocked;
        this.changes.emit({
            type: 'start',
            columns: columns,
            locked: locked
        });
        this.changes.emit({
            type: 'triggerAutoFit',
            columns: columns,
            locked: locked
        });
    };
    ColumnResizingService.prototype.autoFitBatch = function (info, onComplete) {
        var _this = this;
        var locked = info.length > 0 ? info[0].column.isLocked : false;
        var observables = this.tables
            .filter(function (table) { return table.locked === locked; })
            .map(function (table) { return table.autoFit(info); });
        zip.apply(void 0, observables).pipe(take(1))
            .subscribe(function (widths) {
            _this.changes.emit({
                columns: info.map(function (i) { return i.column; }),
                type: 'autoFitComplete',
                widths: widths,
                locked: locked
            });
            if (onComplete) {
                onComplete();
            }
        });
        this.batch = null;
    };
    ColumnResizingService.decorators = [
        { type: Injectable },
    ];
    return ColumnResizingService;
}());

/**
 * @hidden
 */
/**
 * @hidden
 */
var hasFilterMenu = function (settings) {
    return typeof settings === 'string' && settings.indexOf('menu') > -1;
};
/**
 * @hidden
 */
var hasFilterRow = function (settings) {
    return settings === true || (typeof settings === 'string' && settings.indexOf('row') > -1);
};

var contains$1 = function (node, predicate) {
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
var PopupCloseEvent = /** @class */ (function (_super) {
    __extends(PopupCloseEvent, _super);
    function PopupCloseEvent(e) {
        var _this = _super.call(this) || this;
        _this.originalEvent = e;
        return _this;
    }
    return PopupCloseEvent;
}(PreventableEvent));
var DEFAULT_POPUP_CLASS = 'k-grid-filter-popup';
/**
 * The service that is used for the popups of the filter and column menus
 * ([see example]({% slug reusablecustomfilters_grid %}#toc-filter-menu-with-popup)).
 */
var SinglePopupService = /** @class */ (function () {
    function SinglePopupService(popupService, renderer, ngZone, scrollSyncService, localization) {
        var _this = this;
        this.popupService = popupService;
        this.renderer = renderer;
        this.ngZone = ngZone;
        this.localization = localization;
        /**
         * Fires when the filter or column menus are about to close because the user clicked outside their popups.
         * Used to prevent the popup from closing.
         */
        this.onClose = new Subject();
        this.scrollSubscription = scrollSyncService.changes.subscribe(function () { return _this.destroy(); });
    }
    /**
     * @hidden
     */
    SinglePopupService.prototype.open = function (anchor, template, popupRef, popupClass) {
        if (popupClass === void 0) { popupClass = DEFAULT_POPUP_CLASS; }
        var toggle = isPresent(popupRef) && this.popupRef === popupRef;
        this.destroy();
        if (!toggle) {
            var direction = this.localization.rtl ? 'right' : 'left';
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
    };
    /**
     * @hidden
     */
    SinglePopupService.prototype.destroy = function () {
        if (this.popupRef) {
            this.detachClose();
            this.popupRef.close();
            this.popupRef = null;
        }
    };
    SinglePopupService.prototype.ngOnDestroy = function () {
        this.destroy();
        this.scrollSubscription.unsubscribe();
    };
    SinglePopupService.prototype.detachClose = function () {
        if (this.removeClick) {
            this.removeClick();
        }
    };
    SinglePopupService.prototype.attachClose = function (skipElement) {
        var _this = this;
        this.detachClose();
        this.ngZone.runOutsideAngular(function () {
            return _this.removeClick = _this.renderer.listen("document", "click", function (e) {
                if (!contains$1(e.target, function (x) { return _this.popupRef.popupElement === x || x === skipElement; })) {
                    var args = new PopupCloseEvent(e);
                    _this.onClose.next(args);
                    if (!args.isDefaultPrevented()) {
                        _this.destroy();
                    }
                }
            });
        });
    };
    SinglePopupService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    SinglePopupService.ctorParameters = function () { return [
        { type: PopupService },
        { type: Renderer2 },
        { type: NgZone },
        { type: ScrollSyncService },
        { type: LocalizationService }
    ]; };
    return SinglePopupService;
}());

/* tslint:disable: no-bitwise */
/**
 * @hidden
 */
var append = function (element) {
    var appended = false;
    return function () {
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
var getDocument = function (element) { return element.ownerDocument.documentElement; };
/**
 * @hidden
 */
var getWindow = function (element) { return element.ownerDocument.defaultView; };
/**
 * @hidden
 */
var offset = function (element) {
    var _a = getDocument(element), clientTop = _a.clientTop, clientLeft = _a.clientLeft;
    var _b = getWindow(element), pageYOffset = _b.pageYOffset, pageXOffset = _b.pageXOffset;
    var _c = element.getBoundingClientRect(), top = _c.top, left = _c.left;
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
var isTargetBefore = function (draggable, target) {
    return (target.compareDocumentPosition(draggable) & 4) !== 0;
};
/**
 * @hidden
 * If the container and the element are the same
 * or if the container holds (contains) the element, returns `true`.
 *
 * DOCUMENT_POSITION_CONTAINED_BY = 16
 */
var contains$2 = function (element, container) {
    return element === container ||
        (container.compareDocumentPosition(element) & 16) !== 0;
};
/**
 * @hidden
 */
var position = function (target, before) {
    var targetRect = offset(target);
    var offsetWidth = target.offsetWidth, offsetHeight = target.offsetHeight;
    var left = targetRect.left + (before ? 0 : offsetWidth);
    var top = targetRect.top;
    var height = offsetHeight;
    return { left: left, top: top, height: height };
};

/**
 * @hidden
 */
var DragAndDropService = /** @class */ (function () {
    function DragAndDropService() {
        this.changes = new EventEmitter();
        this.register = [];
        this.lastTarget = null;
    }
    DragAndDropService.prototype.add = function (target) {
        this.register.push(target);
    };
    DragAndDropService.prototype.remove = function (target) {
        this.register = this.register.filter(function (current) { return current !== target; });
    };
    DragAndDropService.prototype.notifyDrag = function (draggable, element, mouseEvent) {
        var target = this.targetFor(element);
        if (this.lastTarget === target) {
            return;
        }
        this.changes.next({
            draggable: draggable,
            mouseEvent: mouseEvent,
            target: this.lastTarget,
            type: 'leave'
        });
        if (target) {
            this.changes.next({
                draggable: draggable,
                mouseEvent: mouseEvent,
                target: target,
                type: 'enter'
            });
        }
        this.lastTarget = target;
    };
    DragAndDropService.prototype.notifyDrop = function (draggable, mouseEvent) {
        this.changes.next({
            draggable: draggable,
            mouseEvent: mouseEvent,
            target: this.lastTarget,
            type: 'drop'
        });
        this.lastTarget = null;
    };
    DragAndDropService.prototype.targetFor = function (element) {
        var comparer = contains$2.bind(null, element);
        return this.register.find(function (_a) {
            var nativeElement = _a.element.nativeElement;
            return comparer(nativeElement);
        });
    };
    DragAndDropService.decorators = [
        { type: Injectable },
    ];
    return DragAndDropService;
}());

var updateClass = function (element, valid) {
    var icon = element.querySelector('.k-icon');
    icon.className = icon.className
        .replace(/(plus|cancel)/, valid ? 'plus' : 'cancel');
};
var updateLock = function (element, locked) {
    if (locked === void 0) { locked = null; }
    var icon = element.querySelectorAll('.k-icon')[1];
    var value = locked == null ? '' : (locked ? 'k-i-lock' : 'k-i-unlock');
    icon.className = icon.className
        .replace(/(k-i-unlock|k-i-lock)/, '') + (" " + value);
};
var decorate = function (element, target) {
    var targetStyles = getComputedStyle(target);
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
var DragHintService = /** @class */ (function () {
    function DragHintService(santizer) {
        this.santizer = santizer;
    }
    DragHintService.prototype.create = function (down, target, title) {
        this.initCoords(down);
        this.dom = document.createElement("div");
        decorate(this.dom, target);
        var safeTitle = this.santizer.sanitize(SecurityContext.HTML, title);
        this.dom.innerHTML = "\n            <span class=\"k-icon k-drag-status k-i-cancel k-icon-with-modifier\">\n                <span class=\"k-icon k-icon-modifier\"></span>\n            </span>\n            " + safeTitle + "\n        ";
    };
    DragHintService.prototype.attach = function () {
        return append(this.dom);
    };
    DragHintService.prototype.remove = function () {
        if (this.dom && this.dom.parentNode) {
            (function (el) {
                setTimeout(function () { return document.body.removeChild(el); });
            })(this.dom); // hack for IE + pointer events!
            this.dom = null;
        }
    };
    DragHintService.prototype.show = function () {
        this.dom.style.display = "";
    };
    DragHintService.prototype.hide = function () {
        this.dom.style.display = "none";
    };
    DragHintService.prototype.enable = function () {
        updateClass(this.dom, true);
    };
    DragHintService.prototype.disable = function () {
        updateClass(this.dom, false);
    };
    DragHintService.prototype.removeLock = function () {
        updateLock(this.dom);
    };
    DragHintService.prototype.toggleLock = function (locked) {
        updateLock(this.dom, locked);
    };
    DragHintService.prototype.move = function (move) {
        this.dom.style.top = this.initialTop + move.pageY + 'px';
        this.dom.style.left = this.initialLeft + move.pageX + 'px';
    };
    DragHintService.prototype.initCoords = function (down) {
        var _a = offset(down.originalEvent.target), top = _a.top, left = _a.left;
        this.initialTop = top - down.pageY;
        this.initialLeft = left - down.pageX;
    };
    DragHintService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DragHintService.ctorParameters = function () { return [
        { type: DomSanitizer }
    ]; };
    return DragHintService;
}());

/**
 * @hidden
 */
var DropCueService = /** @class */ (function () {
    function DropCueService() {
    }
    DropCueService.prototype.create = function () {
        this.dom = document.createElement("div");
        this.dom.className = 'k-grouping-dropclue';
        this.hide();
    };
    DropCueService.prototype.attach = function () {
        return append(this.dom);
    };
    DropCueService.prototype.remove = function () {
        if (this.dom && this.dom.parentElement) {
            document.body.removeChild(this.dom);
            this.dom = null;
        }
    };
    DropCueService.prototype.hide = function () {
        this.dom.style.display = "none";
    };
    DropCueService.prototype.position = function (_a) {
        var left = _a.left, top = _a.top, height = _a.height;
        this.dom.style.display = 'block';
        this.dom.style.height = height + 'px';
        this.dom.style.top = top + 'px';
        var width = this.dom.offsetWidth / 2;
        this.dom.style.left = left - width + 'px';
    };
    DropCueService.decorators = [
        { type: Injectable },
    ];
    return DropCueService;
}());

/**
 * @hidden
 */
var ColumnReorderService = /** @class */ (function () {
    function ColumnReorderService() {
        this.changes = new EventEmitter();
    }
    ColumnReorderService.prototype.reorder = function (e) {
        this.changes.emit(e);
    };
    ColumnReorderService.decorators = [
        { type: Injectable },
    ];
    return ColumnReorderService;
}());

/**
 * Arguments for the `columnReorder` event.
 */
var ColumnReorderEvent = /** @class */ (function (_super) {
    __extends(ColumnReorderEvent, _super);
    /**
     * @hidden
     */
    function ColumnReorderEvent(_a) {
        var column = _a.column, newIndex = _a.newIndex, oldIndex = _a.oldIndex;
        var _this = _super.call(this) || this;
        _this.column = column;
        _this.newIndex = newIndex;
        _this.oldIndex = oldIndex;
        return _this;
    }
    return ColumnReorderEvent;
}(PreventableEvent));

/**
 * @hidden
 */
var NavigationMetadata = /** @class */ (function () {
    function NavigationMetadata(dataRows, headerRows, isVirtual, hasPager, hasDetailTemplate, gridElement, virtualColumns, columns) {
        this.dataRows = dataRows;
        this.headerRows = headerRows;
        this.isVirtual = isVirtual;
        this.hasPager = hasPager;
        this.hasDetailTemplate = hasDetailTemplate;
        this.gridElement = gridElement;
        this.virtualColumns = virtualColumns;
        this.columns = columns;
    }
    Object.defineProperty(NavigationMetadata.prototype, "maxLogicalRowIndex", {
        get: function () {
            var dataRows = this.hasDetailTemplate ? this.dataRows * 2 : this.dataRows;
            return this.headerRows + dataRows - 1;
        },
        enumerable: true,
        configurable: true
    });
    return NavigationMetadata;
}());

// Incremented each time the service is instantiated.
var sequence = 0;
/**
 * @hidden
 */
var IdService = /** @class */ (function () {
    function IdService() {
        this.prefix = "k-grid" + sequence++;
    }
    IdService.prototype.cellId = function (rowIndex, colIndex) {
        return this.prefix + "-r" + rowIndex + "c" + colIndex;
    };
    IdService.prototype.selectionCheckboxId = function (itemIndex) {
        return this.prefix + "-checkbox" + itemIndex;
    };
    IdService.prototype.selectAllCheckboxId = function () {
        return this.prefix + "-select-all";
    };
    IdService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    IdService.ctorParameters = function () { return []; };
    return IdService;
}());

/**
 * @hidden
 */
var ColumnInfoService = /** @class */ (function () {
    function ColumnInfoService() {
        this.visibilityChange = new EventEmitter();
        this.lockedChange = new EventEmitter();
        this.columnRangeChange = new EventEmitter();
        this.columnsContainer = new ColumnsContainer(function () { return []; });
    }
    Object.defineProperty(ColumnInfoService.prototype, "lockedLeafColumns", {
        get: function () {
            return this.columnsContainer.lockedLeafColumns;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnInfoService.prototype, "nonLockedLeafColumns", {
        get: function () {
            return this.columnsContainer.nonLockedLeafColumns;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnInfoService.prototype, "isLocked", {
        get: function () {
            return this.lockedLeafColumns.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnInfoService.prototype, "totalLevels", {
        get: function () {
            return this.columnsContainer.totalLevels;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnInfoService.prototype, "leafNamedColumns", {
        get: function () {
            var columns = expandColumns(this.list().filterSort(function (column) { return !column.isColumnGroup; }))
                .filter(function (column) { return column.matchesMedia && column.displayTitle; });
            return orderBy(columns, [{ field: 'locked', dir: 'desc' }]);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnInfoService.prototype, "unlockedRootCount", {
        get: function () {
            return this.list().rootColumns().filter(function (column) { return !column.locked && column.isVisible; }).length;
        },
        enumerable: true,
        configurable: true
    });
    ColumnInfoService.prototype.init = function (columns, list) {
        this.columnsContainer = columns;
        this.list = list;
    };
    ColumnInfoService.prototype.changeVisibility = function (columns) {
        this.visibilityChange.emit(columns);
    };
    ColumnInfoService.prototype.changeLocked = function (columns) {
        this.lockedChange.emit(columns);
    };
    ColumnInfoService.decorators = [
        { type: Injectable },
    ];
    return ColumnInfoService;
}());

/**
 * @hidden
 */
var SortService = /** @class */ (function () {
    function SortService() {
        this.changes = new Subject();
    }
    SortService.prototype.sort = function (value) {
        this.changes.next(value);
    };
    return SortService;
}());

/**
 * Arguments for the `columnVisibilityChange` event.
 */
var ColumnVisibilityChangeEvent = /** @class */ (function () {
    /**
     * @hidden
     */
    function ColumnVisibilityChangeEvent(columns) {
        this.columns = columns;
    }
    return ColumnVisibilityChangeEvent;
}());

/**
 * Arguments for the `columnLockedChange` event.
 */
var ColumnLockedChangeEvent = /** @class */ (function () {
    /**
     * @hidden
     */
    function ColumnLockedChangeEvent(columns) {
        this.columns = columns;
    }
    return ColumnLockedChangeEvent;
}());

/**
 * @hidden
 */
var GROUP_CELL_WIDTH = 32; // this should be the value of group-cell inside the theme!

/**
 * @hidden
 */
function defaultTrackBy(index, item) {
    if (item.type === 'data' && item.isEditing) {
        return item.data;
    }
    return index;
}

var createControl = function (source) { return function (acc, key) {
    acc[key] = new FormControl(source[key]);
    return acc;
}; };
var validateColumnsField = function (columns) {
    return expandColumns(columns.toArray())
        .filter(isColumnComponent)
        .filter(function (_a) {
        var field = _a.field;
        return !isValidFieldName(field);
    })
        .forEach(function (_a) {
        var field = _a.field;
        return console.warn("\n                Grid column field name '" + field + "' does not look like a valid JavaScript identifier.\n                Identifiers can contain only alphanumeric characters (including \"$\" or \"_\"), and may not start with a digit.\n                Please use only valid identifier names to ensure error-free operation.\n            ");
    });
};
var handleExpandCollapseService = function (service, expandEmitter, collapseEmitter, map$$1) { return (service.changes.pipe(filter(function (_a) {
    var dataItem = _a.dataItem;
    return isPresent(dataItem);
}))
    .subscribe(function (x) { return x.expand ? expandEmitter.emit(map$$1(x)) : collapseEmitter.emit(map$$1(x)); })); };
var isInEditedCell = function (element, gridElement) {
    return closest(element, matchesClasses('k-grid-edit-cell')) &&
        closest(element, matchesNodeName('kendo-grid')) === gridElement;
};
var ɵ4$2 = EMPTY_CELL_CONTEXT;
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
var GridComponent = /** @class */ (function () {
    function GridComponent(supportService, selectionService, cellSelectionService, wrapper, groupInfoService, groupsService, changeNotification, detailsService, editService, filterService, pdfService, responsiveService, renderer, excelService, ngZone, scrollSyncService, domEvents, columnResizingService, changeDetectorRef, columnReorderService, columnInfoService, navigationService, sortService, scrollRequestService, localization) {
        var _this = this;
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
        this.columnsContainer = new ColumnsContainer(function () { return _this.columnList.filterHierarchy(function (column) {
            column.matchesMedia = _this.matchesMedia(column);
            return column.isVisible;
        }); });
        this.view = new DataCollection(function () { return new DataResultIterator(_this.data, _this.skip, _this.hasGroupFooters); });
        this.shouldGenerateColumns = true;
        this._sort = new Array();
        this._group = new Array();
        this._skip = 0;
        this.cachedWindowWidth = 0;
        this._rowSelected = null;
        this._cellSelected = null;
        this.rtl = false;
        this._rowClass = function () { return null; };
        this.localizationSubscription = localization.changes.subscribe(function (_a) {
            var rtl = _a.rtl;
            _this.rtl = rtl;
            _this.direction = _this.rtl ? 'rtl' : 'ltr';
        });
        this.groupInfoService.registerColumnsContainer(function () { return _this.columnList; });
        this.columnInfoService.init(this.columnsContainer, function () { return _this.columnList; });
        this.columnVisibilityChangeSubscription = this.columnInfoService.visibilityChange.subscribe(function (changed) {
            _this.columnVisibilityChange.emit(new ColumnVisibilityChangeEvent(changed));
        });
        this.columnLockedChangeSubscription = this.columnInfoService.lockedChange.subscribe(function (changed) {
            _this.columnLockedChange.emit(new ColumnLockedChangeEvent(changed));
        });
        this.groupExpandCollapseSubscription = handleExpandCollapseService(groupsService, this.groupExpand, this.groupCollapse, function (_a) {
            var group = _a.dataItem, index = _a.index;
            return ({ group: group, groupIndex: index });
        });
        this.detailsServiceSubscription = handleExpandCollapseService(detailsService, this.detailExpand, this.detailCollapse, function (args) { return args; });
        this.filterSubscription = this.filterService.changes.subscribe(function (x) {
            _this.filterChange.emit(x);
        });
        this.sortSubscription = this.sortService.changes.subscribe(function (x) {
            _this.sortChange.emit(x);
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
    Object.defineProperty(GridComponent.prototype, "skip", {
        /**
         * Defines the number of records to be skipped by the pager.
         * Required by the [paging]({% slug paging_grid %}) functionality.
         */
        get: function () {
            return this._skip;
        },
        set: function (value) {
            if (value >= 0) {
                this._skip = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "sort", {
        get: function () {
            return this._sort;
        },
        /**
         * The descriptors by which the data will be sorted ([see example]({% slug sorting_grid %})).
         */
        set: function (value) {
            if (isArray(value)) {
                this._sort = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "group", {
        /**
         */
        get: function () {
            return this._group;
        },
        /**
         * The descriptors by which the data will be grouped ([see example]({% slug groupingbasics_grid %})).
         */
        set: function (value) {
            if (isArray(value)) {
                this._group = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "showTopToolbar", {
        /**
         * @hidden
         */
        get: function () {
            return this.toolbarTemplate && ['top', 'both'].indexOf(this.toolbarTemplate.position) > -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "showBottomToolbar", {
        /**
         * @hidden
         */
        get: function () {
            return this.toolbarTemplate && ['bottom', 'both'].indexOf(this.toolbarTemplate.position) > -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "isLocked", {
        /**
         * @hidden
         */
        get: function () {
            return this.lockedLeafColumns.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "showPager", {
        /**
         * @hidden
         */
        get: function () {
            return !this.isVirtual && this.pageable !== false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "showGroupPanel", {
        /**
         * @hidden
         */
        get: function () {
            return this.groupable && this.groupable.enabled !== false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "groupableEmptyText", {
        /**
         * @hidden
         */
        get: function () {
            return this.groupable.emptyText;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "marqueeSelection", {
        /**
         * @hidden
         */
        get: function () {
            return this.selectionService.enableMarquee || this.cellSelectionService.enableMarquee;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "navigatable", {
        /**
         * @hidden
         */
        get: function () {
            return this.navigable;
        },
        /**
         * @hidden
         *
         * An alias for `navigable` for users who migrate from Kendo UI for jQuery.
         */
        set: function (value) {
            this.navigable = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "rowClass", {
        get: function () {
            return this._rowClass;
        },
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
        set: function (fn) {
            if (isDevMode && typeof fn !== 'function') {
                throw new Error("rowClass must be a function, but received " + JSON.stringify(fn) + ".");
            }
            this._rowClass = fn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "rowSelected", {
        get: function () {
            return this._rowSelected;
        },
        /**
         * Defines a Boolean function that is executed for each data row in the component
         * ([see example]({% slug selection_grid %}#toc-setting-the-selected-rows)).
         * Determines whether the row will be selected.
         */
        set: function (fn) {
            if (isDevMode && typeof fn !== 'function') {
                throw new Error("rowSelected must be a function, but received " + JSON.stringify(fn) + ".");
            }
            this._rowSelected = fn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "cellSelected", {
        get: function () {
            return this._cellSelected;
        },
        /**
         * Defines a function that determines the selected state of a data cell.
         * Returns an object with `selected` and `item` properties.
         * The cell is marked as selected only if the `selected` property equals `true`.
         *
         * The function is executed for each data cell and may be called more than once
         * as part of a change detection cycle. ([see example]({% slug grid_selection_custom %}toc-setting-the-selected-cells))
         */
        set: function (fn) {
            if (isDevMode && typeof fn !== 'function') {
                throw new Error("cellSelected must be a function, but received " + JSON.stringify(fn) + ".");
            }
            this._cellSelected = fn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "activeCell", {
        /**
         * Returns the currently focused cell (if any).
         */
        get: function () {
            return this.navigationService.activeCell;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "activeRow", {
        /**
         * Returns the currently focused row (if any).
         */
        get: function () {
            return this.navigationService.activeRow;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "dir", {
        get: function () {
            return this.direction;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "hostClasses", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "lockedClasses", {
        get: function () {
            return this.lockedLeafColumns.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "virtualClasses", {
        get: function () {
            return this.isVirtual;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "noScrollbarClass", {
        get: function () {
            return this.scrollbarWidth === 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "detailTemplate", {
        get: function () {
            if (this._customDetailTemplate) {
                return this._customDetailTemplate;
            }
            return this.detailTemplateChildren ? this.detailTemplateChildren.first : undefined;
        },
        set: function (detailTemplate) {
            this._customDetailTemplate = detailTemplate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "noRecordsTemplate", {
        get: function () {
            if (this._customNoRecordsTemplate) {
                return this._customNoRecordsTemplate;
            }
            return this.noRecordsTemplateChildren ? this.noRecordsTemplateChildren.first : undefined;
        },
        set: function (customNoRecordsTemplate) {
            this._customNoRecordsTemplate = customNoRecordsTemplate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "pagerTemplate", {
        get: function () {
            if (this._customPagerTemplate) {
                return this._customPagerTemplate;
            }
            return this.pagerTemplateChildren ? this.pagerTemplateChildren.first : undefined;
        },
        set: function (customPagerTemplate) {
            this._customPagerTemplate = customPagerTemplate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "toolbarTemplate", {
        get: function () {
            if (this._customToolbarTemplate) {
                return this._customToolbarTemplate;
            }
            return this.toolbarTemplateChildren ? this.toolbarTemplateChildren.first : undefined;
        },
        set: function (customToolbarTemplate) {
            this._customToolbarTemplate = customToolbarTemplate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "scrollbarWidth", {
        get: function () {
            return this.supportService.scrollbarWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "headerPadding", {
        get: function () {
            if (isUniversal()) {
                return "";
            }
            var padding = Math.max(0, this.scrollbarWidth - 1) + 'px';
            var right = this.rtl ? 0 : padding;
            var left = this.rtl ? padding : 0;
            return "0 " + right + " 0 " + left;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "hasGroupFooters", {
        get: function () {
            return this.columnsContainer.hasGroupFooter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "showFooter", {
        get: function () {
            return this.columnsContainer.hasFooter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "showGroupFooters", {
        get: function () {
            return this.groupable && this.groupable.showFooter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "ariaRowCount", {
        get: function () {
            return this.totalColumnLevels + 1 + this.view.total;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "ariaColCount", {
        get: function () {
            return this.columnsContainer.leafColumnsToRender.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "isVirtual", {
        get: function () {
            return this.scrollable === 'virtual';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "isScrollable", {
        get: function () {
            return this.scrollable !== 'none';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "visibleColumns", {
        get: function () {
            return this.columnsContainer.allColumns;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "lockedColumns", {
        get: function () {
            return this.columnsContainer.lockedColumns;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "nonLockedColumns", {
        get: function () {
            return this.columnsContainer.nonLockedColumns;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "lockedLeafColumns", {
        get: function () {
            return this.columnsContainer.lockedLeafColumns;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "nonLockedLeafColumns", {
        get: function () {
            return this.columnsContainer.nonLockedLeafColumns;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "leafColumns", {
        get: function () {
            return this.columnsContainer.leafColumns;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "totalColumnLevels", {
        get: function () {
            return this.columnsContainer.totalLevels;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "headerColumns", {
        get: function () {
            if (this.virtualColumns && !this.pdfService.exporting) {
                return this.viewportColumns;
            }
            return this.nonLockedColumns;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "headerLeafColumns", {
        get: function () {
            if (this.virtualColumns && !this.pdfService.exporting) {
                return this.leafViewportColumns;
            }
            return this.nonLockedLeafColumns;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "lockedWidth", {
        get: function () {
            var groupCellsWidth = this.group.length * GROUP_CELL_WIDTH;
            return expandColumns(this.lockedLeafColumns.toArray()).reduce(function (prev, curr) { return prev + (curr.width || 0); }, groupCellsWidth);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "nonLockedWidth", {
        get: function () {
            if ((!this.rtl && this.lockedLeafColumns.length) || this.virtualColumns) {
                return !this.virtualColumns ? this.columnsContainer.unlockedWidth :
                    this.leafViewportColumns.reduce(function (acc, column) { return acc + (column.width || 0); }, 0);
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "selectableSettings", {
        get: function () {
            if (this.selectionService) {
                return this.selectionService.options;
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "columnMenuTemplate", {
        get: function () {
            var template = this.columnMenuTemplates.first;
            return template ? template.templateRef : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridComponent.prototype, "totalCount", {
        get: function () {
            if (this.isVirtual || !isPresent(this.pageSize)) {
                return this.view.total;
            }
            return this.pageSize;
        },
        enumerable: true,
        configurable: true
    });
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
    GridComponent.prototype.expandRow = function (index) {
        this.toggleDetailRowLegacy(index, true);
    };
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
    GridComponent.prototype.collapseRow = function (index) {
        this.toggleDetailRowLegacy(index, false);
    };
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
    GridComponent.prototype.expandGroup = function (index) {
        if (!this.groupsService.isExpanded(index)) {
            this.groupsService.toggleRow(index, null);
        }
    };
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
    GridComponent.prototype.collapseGroup = function (index) {
        if (this.groupsService.isExpanded(index)) {
            this.groupsService.toggleRow(index, null);
        }
    };
    /**
     * @hidden
     */
    GridComponent.prototype.resetGroupsState = function () {
        this.groupsService.reset();
    };
    /**
     * @hidden
     */
    GridComponent.prototype.expandGroupChildren = function (groupIndex) {
        this.groupsService.expandChildren(groupIndex);
    };
    /**
     * @hidden
     */
    GridComponent.prototype.onDataChange = function () {
        this.autoGenerateColumns();
        this.changeNotification.notify();
        this.pdfService.dataChanged.emit();
        if (isPresent(this.defaultSelection)) {
            this.defaultSelection.reset();
        }
        this.initSelectionService();
        this.updateNavigationMetadata();
    };
    GridComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
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
            this.renderer.setStyle(this.wrapper.nativeElement, 'height', this.height + "px");
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
            this.ngZone.onStable.pipe(take(1)).subscribe(function () { return _this.attachScrollSync(); });
        }
        if (isChanged("selectable", changes) && this.shouldResetSelection(changes.selectable)) {
            if (this.defaultSelection) {
                this.defaultSelection.reset();
            }
            else if (this.selectionDirective) {
                this.selectionDirective.reset();
            }
        }
    };
    GridComponent.prototype.ngAfterViewInit = function () {
        this.attachScrollSync();
        this.attachElementEventHandlers();
        this.updateNavigationMetadata();
        this.applyAutoSize();
    };
    GridComponent.prototype.ngAfterContentChecked = function () {
        this.columnsContainer.refresh();
        this.verifySettings();
        this.initSelectionService();
    };
    GridComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.shouldGenerateColumns = !this.columns.length;
        this.autoGenerateColumns();
        this.columnList = new ColumnList(this.columns);
        this.columnsChangeSubscription = this.columns.changes.subscribe(function () { return _this.verifySettings(); });
    };
    GridComponent.prototype.ngOnInit = function () {
        if (this.navigable) {
            this.navigationService.init(this.navigationMetadata());
        }
    };
    GridComponent.prototype.ngOnDestroy = function () {
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
    };
    /**
     * @hidden
     */
    GridComponent.prototype.attachScrollSync = function () {
        var _this = this;
        if (isUniversal()) {
            return;
        }
        if (this.header) {
            this.scrollSyncService.registerEmitter(this.header.nativeElement, "header");
        }
        if (this.footer) {
            this.footerChangeSubscription = observe(this.footer)
                .subscribe(function (footers) {
                return footers
                    .map(function (footer) { return footer.nativeElement; })
                    .filter(isPresent)
                    .forEach(function (element) {
                    return _this.scrollSyncService.registerEmitter(element, "footer");
                });
            });
        }
    };
    /**
     * Switches the specified table row in the edit mode ([see example]({% slug editing_template_forms_grid %}#toc-editing-records)).
     *
     * @param rowIndex - The data row index that will be switched in the edit mode.
     * @param group - The [`FormGroup`]({{ site.data.urls.angular['formgroupapi'] }})
     * that describes the edit form.
     * @param options - Additional options configuring the focus target once the editor opens.
     */
    GridComponent.prototype.editRow = function (rowIndex, group, options) {
        this.editService.editRow(rowIndex, group);
        if (isPresent(options) && options.skipFocus) {
            return;
        }
        var row = "tr[data-kendo-grid-item-index=\"" + rowIndex + "\"]";
        var columnIndex = options && options.columnIndex;
        var target = isNaN(columnIndex) ? row : row + " td[data-kendo-grid-column-index=\"" + columnIndex + "\"]";
        this.focusEditElement(target);
    };
    /**
     * Closes the editor for a given row ([see example]({% slug editing_template_forms_grid %}#toc-cancelling-editing)).
     *
     * @param {number} index - The row index that will be switched out of the edit mode. If no index is provided, it is assumed
     * that the new item editor will be closed.
     */
    GridComponent.prototype.closeRow = function (index) {
        this.editService.close(index);
    };
    /**
     * Creates a new row editor ([see example]({% slug editing_template_forms_grid %}#toc-adding-records)).
     *
     * @param {FormGroup} group - The [`FormGroup`]({{ site.data.urls.angular['formgroupapi'] }}) that describes
     * the edit form. If called with a data item, it will build the `FormGroup` from the data item fields.
     */
    GridComponent.prototype.addRow = function (group) {
        var isFormGroup = group instanceof FormGroup;
        if (!isFormGroup) {
            var fields = Object.keys(group).reduce(createControl(group), {}); // FormBuilder?
            group = new FormGroup(fields);
        }
        this.editService.addRow(group);
        this.focusEditElement('.k-grid-add-row');
    };
    /**
     * Puts the cell that is specified by the table row and column in edit mode.
     *
     * @param {number} rowIndex - The data row index that will be switched in the edit mode.
     * @param {number|string|any} column - The leaf column index, or the field name or the column instance that should be edited.
     * @param {FormGroup} group - The [`FormGroup`]({{ site.data.urls.angular['formgroupapi'] }})
     * that describes the edit form.
     */
    GridComponent.prototype.editCell = function (rowIndex, column, group) {
        var instance = this.columnInstance(column);
        this.editService.editCell(rowIndex, instance, group);
        this.focusEditElement('.k-grid-edit-cell');
    };
    /**
     * Closes the current cell in edit mode and fires
     * the [`cellClose`]({% slug api_grid_gridcomponent %}#toc-cellclose) event.
     *
     * @return {boolean} Indicates whether the edited cell was closed.
     * A `false` value indicates that the
     * [`cellClose`]({% slug api_grid_gridcomponent %}#toc-cellclose) event was prevented.
     */
    GridComponent.prototype.closeCell = function () {
        return !this.editService.closeCell();
    };
    /**
     * Closes the current cell in edit mode.
     */
    GridComponent.prototype.cancelCell = function () {
        this.editService.cancelCell();
    };
    /**
     * Returns a flag which indicates if a row or a cell is currently edited.
     *
     * @return {boolean} A flag which indicates if a row or a cell is currently edited.
     */
    GridComponent.prototype.isEditing = function () {
        return this.editService.isEditing();
    };
    /**
     * Returns a flag which indicates if a cell is currently edited.
     *
     * @return {boolean} A flag which indicates if a cell is currently being edited.
     */
    GridComponent.prototype.isEditingCell = function () {
        return this.editService.isEditingCell();
    };
    /**
     * Initiates the PDF export ([see example]({% slug pdfexport_grid %})).
     */
    GridComponent.prototype.saveAsPDF = function () {
        this.pdfService.save(this);
    };
    /**
     * Exports the Grid element to a Drawing [`Group`]({% slug api_kendo-drawing_group %}) by using the `kendo-grid-pdf` component options.
     * ([see example]({% slug pdfexport_grid %}#toc-exporting-multiple-grids-to-the-same-pdf)).
     *
     * @return {Promise} - A promise that will be resolved with the Drawing `Group`.
     */
    GridComponent.prototype.drawPDF = function () {
        var promise = createPromise();
        this.pdfService.draw(this, promise);
        return promise;
    };
    /**
     * Initiates the Excel export ([see example]({% slug excelexport_grid %})).
     */
    GridComponent.prototype.saveAsExcel = function () {
        this.excelService.save(this);
    };
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
    GridComponent.prototype.autoFitColumn = function (column) {
        this.columnResizingService.autoFit(column);
    };
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
    GridComponent.prototype.autoFitColumns = function (columns) {
        if (columns === void 0) { columns = this.columns; }
        var _a;
        var cols;
        if (columns instanceof QueryList) {
            cols = columns.toArray();
        }
        else {
            cols = columns;
        }
        (_a = this.columnResizingService).autoFit.apply(_a, cols);
    };
    /**
     * @hidden
     */
    GridComponent.prototype.notifyPageChange = function (source, event) {
        if (source === "list" && !this.isVirtual) {
            return;
        }
        this.pageChange.emit(event);
    };
    /**
     * @hidden
     */
    GridComponent.prototype.notifyScrollBottom = function () {
        var _this = this;
        if (this.scrollable === 'none') {
            return;
        }
        if (hasObservers(this.scrollBottom)) {
            this.ngZone.run(function () { return _this.scrollBottom.emit({ sender: _this }); });
        }
    };
    /**
     * @hidden
     */
    GridComponent.prototype.focusEditElement = function (containerSelector) {
        var _this = this;
        if (this.focusElementSubscription) {
            this.focusElementSubscription.unsubscribe();
        }
        this.ngZone.runOutsideAngular(function () {
            _this.focusElementSubscription = _this.ngZone.onStable.asObservable().pipe(take(1)).subscribe(function () {
                var wrapper = _this.wrapper.nativeElement;
                if (!_this.setEditFocus(wrapper.querySelector(containerSelector)) && _this.isLocked) {
                    _this.setEditFocus(wrapper.querySelector(".k-grid-content " + containerSelector));
                }
                _this.focusElementSubscription = null;
            });
        });
    };
    /**
     * Focuses the last active or the first cell of the Grid.
     *
     * @returns {NavigationCell} The focused cell.
     */
    GridComponent.prototype.focus = function () {
        this.assertNavigable();
        return this.navigationService.focusCell();
    };
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
    GridComponent.prototype.focusCell = function (rowIndex, colIndex) {
        this.assertNavigable();
        return this.navigationService.focusCell(rowIndex, colIndex);
    };
    /**
     * Focuses the next cell, optionally wrapping to the next row.
     *
     * @param wrap - A Boolean value which indicates if the focus will move to the next row. Defaults to `true`.
     * @returns {NavigationCell} The focused cell. If the focus is already on the last cell, returns `null`.
     */
    GridComponent.prototype.focusNextCell = function (wrap) {
        if (wrap === void 0) { wrap = true; }
        this.assertNavigable();
        return this.navigationService.focusNextCell(wrap);
    };
    /**
     * Focuses the previous cell. Optionally wraps to the previous row.
     *
     * @param wrap - A Boolean value which indicates if the focus will move to the next row. Defaults to `true`.
     * @returns {NavigationCell} The focused cell. If the focus is already on the first cell, returns `null`.
     */
    GridComponent.prototype.focusPrevCell = function (wrap) {
        if (wrap === void 0) { wrap = true; }
        this.assertNavigable();
        return this.navigationService.focusPrevCell(wrap);
    };
    /**
     * Scrolls to the specified row and column
     */
    GridComponent.prototype.scrollTo = function (request) {
        this.scrollRequestService.scrollTo(request);
    };
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
    GridComponent.prototype.reorderColumn = function (source, destIndex, options) {
        if (options === void 0) { options = { before: false }; }
        var columnsForLevel = this.columnsForLevel(source.level);
        var target = columnsForLevel[destIndex];
        if (!target) {
            return;
        }
        var lastNonLocked = target.isLocked &&
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
    };
    Object.defineProperty(GridComponent.prototype, "isDetailExpanded", {
        get: function () {
            return this.detailsService.userCallback;
        },
        /**
         * A function which determines if a specific row is expanded.
         */
        set: function (callback) {
            this.detailsService.userCallback = callback;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    GridComponent.prototype.reorder = function (_a) {
        var _this = this;
        var target = _a.target, source = _a.source, before = _a.before, changeContainer = _a.changeContainer;
        this.ngZone.run(function () {
            var columnsForLevel = _this.columnsForLevel(source.level);
            var newIndex = columnsForLevel.indexOf(target);
            if (target.parent && target.parent.isSpanColumn) {
                newIndex = columnsForLevel.indexOf(target.parent);
                if (before) {
                    target = target.parent;
                }
            }
            var oldIndex = columnsForLevel.indexOf(source);
            if (changeContainer) {
                if (before && 0 < newIndex && oldIndex < newIndex) { // dropped before the first not locked column
                    newIndex--;
                }
                else if (!before && oldIndex > newIndex) { // dropped after the last locked column
                    newIndex++;
                }
            }
            var args = new ColumnReorderEvent({
                column: source,
                oldIndex: oldIndex,
                newIndex: newIndex
            });
            _this.columnReorder.emit(args);
            if (args.isDefaultPrevented()) {
                return;
            }
            if (changeContainer) {
                _this.columnLockedChange.emit(new ColumnLockedChangeEvent([source]));
            }
            _this.updateColumnIndices({ source: source, target: target, before: before });
            if (source.locked !== target.locked) {
                source.locked = target.locked;
            }
            _this.columnsContainer.refresh();
            _this.changeDetectorRef.markForCheck();
        });
    };
    GridComponent.prototype.updateColumnIndices = function (_a) {
        var source = _a.source, target = _a.target, before = _a.before;
        var expandedColumns = expandColumnsWithSpan(this.columnsForLevel(source.level));
        var sourceColumnIndex = expandedColumns.indexOf(source);
        var nextSourceIndex = 0;
        var nextIndex = 0;
        var toSkip = 1;
        // Possible only when called from the API.
        if (source.isSpanColumn) {
            toSkip += source.childColumns.length;
        }
        var i = 0;
        while (i < expandedColumns.length) {
            var column = expandedColumns[i];
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
    };
    GridComponent.prototype.updateIndicesForLevel = function (level) {
        var colsForParentLevel = this.columnsForLevel(level - 1);
        var colsForLevel = [];
        sortColumns(colsForParentLevel).forEach(function (c) {
            if (c.isColumnGroup) {
                colsForLevel.push.apply(colsForLevel, c.childrenArray.sort(function (a, b) { return a.orderIndex - b.orderIndex; }));
            }
        });
        expandColumnsWithSpan(colsForLevel).map(function (c, i) { return c.orderIndex = i; });
        if (level < this.columnsContainer.totalLevels) {
            this.updateIndicesForLevel(level + 1);
        }
    };
    GridComponent.prototype.columnsForLevel = function (level) {
        return this.columnsContainer
            .allColumns.filter(function (column) { return column.level === level; });
    };
    GridComponent.prototype.initSelectionService = function () {
        var _this = this;
        if (!this.selectable) {
            this.selectionService.ngOnDestroy();
            this.cellSelectionService.ngOnDestroy();
            return;
        }
        if (!this.selectionDirective && !isPresent(this.defaultSelection)) {
            this.defaultSelection = new Selection(this, this.changeDetectorRef);
        }
        var cellSelectionMode = this.selectable['cell'];
        var activeService = cellSelectionMode ? this.cellSelectionService : this.selectionService;
        var inactiveService = cellSelectionMode ? this.selectionService : this.cellSelectionService;
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
            this.selectionSubscription = this.cellSelectionService.changes.subscribe(function (event) {
                _this.ngZone.run(function () { return _this.selectionChange.emit(event); });
            });
        }
        else {
            this.selectionSubscription = this.selectionService.changes.subscribe(function (event) {
                _this.ngZone.run(function () { return _this.selectionChange.emit(event); });
            });
        }
    };
    GridComponent.prototype.setEditFocus = function (element) {
        if (element) {
            return this.navigationService.tryFocus(element);
        }
    };
    GridComponent.prototype.columnInstance = function (column) {
        var instance;
        if (typeof column === 'number') {
            instance = this.columnsContainer.lockedLeafColumns.toArray()
                .concat(this.columnsContainer.nonLockedLeafColumns.toArray())[column];
        }
        else if (typeof column === 'string') {
            instance = this.columnList.filter(function (item) { return item.field === column; })[0];
        }
        else {
            instance = column;
        }
        if (!instance && isDevMode()) {
            throw new Error("Invalid column " + column);
        }
        return instance;
    };
    GridComponent.prototype.verifySettings = function () {
        if (isDevMode()) {
            var locked = this.lockedLeafColumns.length || (this.columnMenu && this.columnMenu.lock);
            if (locked && this.detailTemplate) {
                throw new Error('Having both detail template and locked columns is not supported.');
            }
            if (this.lockedLeafColumns.length && !this.nonLockedLeafColumns.length) {
                throw new Error('There should be at least one non-locked column');
            }
            if ((locked || this.virtualColumns) && expandColumns(this.columnList.toArray()).filter(function (column) { return !column.width && !isColumnGroupComponent(column); }).length) {
                throw new Error((locked ? 'Locked' : 'Virtual') + ' columns feature requires all columns to have set width.');
            }
            if (locked && !this.isScrollable) {
                throw new Error('Locked columns are only supported when scrolling is enabled.');
            }
            if (this.columnList.filter(isColumnGroupComponent).filter(function (x) { return !x.hasChildren; }).length) {
                throw new Error('ColumnGroupComponent should contain ColumnComponent or CommandColumnComponent.');
            }
            if (this.columnList.filter(function (x) { return x.locked && x.parent && !x.parent.isLocked; }).length) {
                throw new Error('Locked child columns require their parent columns to be locked.');
            }
            if ((this.rowHeight || this.detailRowHeight) && !this.isVirtual) {
                throw new Error('Row height and detail row height settings require virtual scrolling mode to be enabled.');
            }
            validateColumnsField(this.columnList);
        }
    };
    GridComponent.prototype.autoGenerateColumns = function () {
        if (this.shouldGenerateColumns && !this.columns.length && this.view.length) {
            this.columns.reset(Object.keys(this.view.at(0)).map(function (field) {
                var column = new ColumnComponent();
                column.field = field;
                return column;
            }));
        }
    };
    GridComponent.prototype.attachStateChangesEmitter = function () {
        var _this = this;
        this.stateChangeSubscription =
            merge(this.pageChange.pipe(map(function (x) { return ({
                filter: _this.filter, group: _this.group, skip: x.skip, sort: _this.sort, take: x.take
            }); })), this.sortChange.pipe(map(function (sort) { return ({ filter: _this.filter, group: _this.group, skip: _this.skip, sort: sort, take: _this.pageSize }); })), this.groupChange.pipe(map(function (group) { return ({
                filter: _this.filter, group: group, skip: _this.skip, sort: _this.sort, take: _this.pageSize
            }); })), this.filterChange.pipe(map(function (filter$$1) { return ({
                filter: filter$$1, group: _this.group, skip: 0, sort: _this.sort, take: _this.pageSize
            }); })))
                .subscribe(function (x) {
                _this.closeCell();
                _this.cancelCell();
                _this.dataStateChange.emit(x);
            });
    };
    GridComponent.prototype.attachEditHandlers = function () {
        if (!this.editService) {
            return;
        }
        this.editServiceSubscription = this.editService
            .changes.subscribe(this.emitCRUDEvent.bind(this));
    };
    GridComponent.prototype.emitCRUDEvent = function (args) {
        var action = args.action, rowIndex = args.rowIndex, formGroup = args.formGroup;
        var dataItem = this.view.at(rowIndex - this.skip);
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
    };
    GridComponent.prototype.attachDomEventHandlers = function () {
        var _this = this;
        this.cellClickSubscription = this.domEvents.cellClick.subscribe(function (args) {
            _this.cellClick.emit(Object.assign({ sender: _this }, args));
        });
    };
    GridComponent.prototype.attachElementEventHandlers = function () {
        var _this = this;
        if (isUniversal()) {
            return;
        }
        var wrapper = this.wrapper.nativeElement;
        var ariaRoot = this.ariaRoot.nativeElement;
        this.ngZone.runOutsideAngular(function () {
            var resizeCheck = _this.resizeCheck.bind(_this);
            var resizeSubscription = _this.renderer.listen('window', 'resize', resizeCheck);
            var orientationSubscription = _this.renderer.listen('window', 'orientationchange', resizeCheck);
            var documentClickSubscription = _this.renderer.listen('document', 'click', function (args) {
                var activeElement = document.activeElement;
                if (_this.editService.shouldCloseCell() &&
                    !closest(args.target, matchesClasses('k-animation-container k-grid-ignore-click')) &&
                    !(activeElement &&
                        (closest(activeElement, matchesClasses('k-animation-container')) ||
                            isInEditedCell(activeElement, _this.wrapper.nativeElement)))) {
                    _this.editService.closeCell(args);
                }
            });
            var windowBlurSubscription = _this.renderer.listen('window', 'blur', function (args) {
                var activeElement = document.activeElement;
                if (activeElement && !(matchesNodeName('input')(activeElement) && activeElement.type === 'file' &&
                    isInEditedCell(activeElement, _this.wrapper.nativeElement))) {
                    _this.editService.closeCell(args);
                }
                _this.domEvents.windowBlur.emit(args);
            });
            var clickSubscription = _this.renderer.listen(wrapper, 'click', function (args) {
                _this.domEvents.click.emit(args);
            });
            var keydownSubscription = _this.renderer.listen(wrapper, 'keydown', function (args) {
                _this.domEvents.keydown.emit(args);
            });
            // focusIn and focusOut are relative to the element with ARIA role "grid"
            var focused = false;
            var focusInSubscription = _this.renderer.listen(ariaRoot, 'focusin', function (args) {
                _this.domEvents.focus.emit(args);
                if (!focused) {
                    _this.domEvents.focusIn.emit(args);
                    focused = true;
                }
            });
            var focusOutSubscription = _this.renderer.listen(ariaRoot, 'focusout', function (args) {
                var next = args.relatedTarget || document.activeElement;
                var outside = !closest(next, function (node) { return node === ariaRoot; });
                if (outside) {
                    _this.domEvents.focusOut.emit(args);
                    focused = false;
                }
            });
            _this.detachElementEventHandlers = function () {
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
    };
    GridComponent.prototype.matchesMedia = function (c) {
        return this.responsiveService.matchesMedia(c.media);
    };
    GridComponent.prototype.resizeCheck = function () {
        var _this = this;
        if (window.innerWidth !== this.cachedWindowWidth) {
            this.cachedWindowWidth = window.innerWidth;
            var hasChanges_1 = false;
            this.columnList.filterHierarchy(function (column) {
                var matchesMedia = _this.matchesMedia(column);
                if (column.matchesMedia !== matchesMedia) {
                    hasChanges_1 = true;
                    column.matchesMedia = matchesMedia;
                }
                return column.isVisible;
            });
            if (hasChanges_1) {
                this.ngZone.run(function () {
                    _this.changeDetectorRef.markForCheck();
                });
            }
        }
    };
    GridComponent.prototype.emitPDFExportEvent = function () {
        var args = new PDFExportEvent();
        this.pdfExport.emit(args);
        if (!args.isDefaultPrevented()) {
            this.saveAsPDF();
        }
    };
    GridComponent.prototype.syncHeaderHeight = function (observable) {
        var _this = this;
        return observable
            .pipe(filter(function () { return isPresent(_this.lockedHeader); }))
            .subscribe(function () {
            return syncRowsHeight(_this.lockedHeader.nativeElement.children[0], _this.header.nativeElement.children[0]);
        });
    };
    GridComponent.prototype.columnsContainerChange = function () {
        var _this = this;
        this.columnsContainerChangeSubscription =
            this.syncHeaderHeight(this.columnsContainer.changes.pipe(filter(function () { return _this.lockedColumns.length > 0; }), switchMap(function () { return _this.ngZone.onStable.asObservable().pipe(take(1)); })));
    };
    GridComponent.prototype.handleColumnResize = function () {
        var _this = this;
        var resizes = this.columnResizingService.changes;
        this.columnResizingSubscription = resizes.pipe(tap(function (e) {
            if (e.type === 'start') {
                _this.renderer.addClass(_this.wrapper.nativeElement, 'k-grid-column-resizing');
            }
            else if (e.type === 'end') {
                _this.renderer.removeClass(_this.wrapper.nativeElement, 'k-grid-column-resizing');
            }
        }), filter(function (e) { return e.type === 'start'; }), switchMap(function () {
            return resizes.pipe(
            // tslint:disable-next-line: rxjs-no-unsafe-takeuntil
            takeUntil(resizes.pipe(filter(function (e) { return e.type === 'triggerAutoFit'; }))), filter(function (e) { return e.type === 'end'; }));
        }))
            .subscribe(this.notifyResize.bind(this));
    };
    GridComponent.prototype.notifyResize = function (e) {
        var args = e.resizedColumns
            .filter(function (item) { return isTruthy(item.column.resizable) && !item.column.isColumnGroup; })
            .map(function (item) { return ({
            column: item.column,
            newWidth: item.column.width,
            oldWidth: item.oldWidth
        }); });
        this.columnResize.emit(args);
    };
    GridComponent.prototype.assertNavigable = function () {
        if (isDevMode() && !this.navigable) {
            throw new Error('The Grid should be configured as [navigable]="true" to control focus');
        }
    };
    GridComponent.prototype.navigationMetadata = function () {
        var isVirtual = this.isVirtual;
        var pageSize = this.pageSize;
        var dataRows = isVirtual ? this.view.total : pageSize;
        var addRowOffset = this.editService.hasNewItem ? 1 : 0;
        var filterRowOffset = hasFilterRow(this.filterable) ? 1 : 0;
        var headerRows = this.totalColumnLevels + 1 + filterRowOffset + addRowOffset;
        return new NavigationMetadata(dataRows, headerRows, isVirtual, this.showPager, isPresent(this.detailTemplate), this.wrapper, this.virtualColumns, this.columnsContainer);
    };
    GridComponent.prototype.updateNavigationMetadata = function () {
        this.navigationService.metadata = this.navigationMetadata();
    };
    GridComponent.prototype.applyAutoSize = function () {
        var _this = this;
        var cols = this.columns.filter(function (c) { return _this.autoSize ? c.autoSize !== false : c.autoSize; });
        if (cols.length > 0) {
            this.ngZone.onStable.pipe(take(1)).subscribe(function (_) { return _this.autoFitColumns(cols); });
        }
    };
    GridComponent.prototype.onColumnRangeChange = function (range) {
        var viewportColumns = this.viewportColumns = [];
        var leafViewportColumns = this.columnsContainer
            .nonLockedLeafColumns.toArray().slice(range.start, range.end + 1);
        for (var idx = 0; idx < leafViewportColumns.length; idx++) {
            var column = leafViewportColumns[idx];
            while (column.parent) {
                column = column.parent;
            }
            var toAdd = [column];
            while (toAdd.length) {
                column = toAdd.shift();
                viewportColumns.push(column);
                if (column.isColumnGroup) {
                    toAdd.unshift.apply(toAdd, column.childrenArray);
                }
            }
            var lastFromGroup = viewportColumns[viewportColumns.length - 1];
            column = leafViewportColumns[idx];
            while (column !== lastFromGroup && idx < leafViewportColumns.length) {
                idx++;
                column = leafViewportColumns[idx];
            }
        }
        if (range.start > 0) {
            var first = leafViewportColumns[0];
            var offset = range.offset;
            var current = viewportColumns[0];
            var index = 0;
            while (current !== first) {
                offset -= current.isColumnGroup ? 0 : current.width;
                index++;
                current = viewportColumns[index];
            }
            if (offset > 0) {
                var totalLevels = this.columnsContainer.totalLevels;
                var previous = void 0;
                for (var idx = 0; idx <= totalLevels; idx++) {
                    var offsetColumn = idx < totalLevels ? new ColumnGroupComponent(previous) : new ColumnBase$1(previous);
                    previous = offsetColumn;
                    offsetColumn.title = "\u00A0";
                    offsetColumn.width = offset;
                    viewportColumns.unshift(offsetColumn);
                }
            }
        }
        this.leafViewportColumns = viewportColumns.filter(function (c) { return !c.isColumnGroup; });
    };
    GridComponent.prototype.toggleDetailRowLegacy = function (index, expand) {
        var hasCallback = typeof this.isDetailExpanded === 'function';
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
    };
    GridComponent.prototype.shouldResetSelection = function (selectableChanges) {
        var previousValue = selectableChanges.previousValue;
        if (!previousValue) {
            // Selection was disabled, no need to reset.
            return false;
        }
        var currentValue = selectableChanges.currentValue;
        if (!currentValue || currentValue.enabled === false) {
            // Selection disabled, reset.
            return true;
        }
        return previousValue.cell !== currentValue.cell;
    };
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
                        "   .k-grid .k-grid-aria-root {\n            display: flex;\n            flex-direction: column;\n            flex: 1 1 auto;\n            overflow: hidden;\n        }\n\n        .k-grid .k-filter-row td {\n            white-space: nowrap;\n        }"
                    ],
                    template: "\n        <ng-container kendoGridLocalizedMessages\n            i18n-groupPanelEmpty=\"kendo.grid.groupPanelEmpty|The label visible in the Grid group panel when it is empty\"\n            groupPanelEmpty=\"Drag a column header and drop it here to group by that column\"\n\n            i18n-noRecords=\"kendo.grid.noRecords|The label visible in the Grid when there are no records\"\n            noRecords=\"No records available.\"\n\n            i18n-pagerFirstPage=\"kendo.grid.pagerFirstPage|The label for the first page button in Grid pager\"\n            pagerFirstPage=\"Go to the first page\"\n\n            i18n-pagerPreviousPage=\"kendo.grid.pagerPreviousPage|The label for the previous page button in Grid pager\"\n            pagerPreviousPage=\"Go to the previous page\"\n\n            i18n-pagerNextPage=\"kendo.grid.pagerNextPage|The label for the next page button in Grid pager\"\n            pagerNextPage=\"Go to the next page\"\n\n            i18n-pagerLastPage=\"kendo.grid.pagerLastPage|The label for the last page button in Grid pager\"\n            pagerLastPage=\"Go to the last page\"\n\n            i18n-pagerPage=\"kendo.grid.pagerPage|The label before the current page number in the Grid pager\"\n            pagerPage=\"Page\"\n\n            i18n-pagerOf=\"kendo.grid.pagerOf|The label before the total pages number in the Grid pager\"\n            pagerOf=\"of\"\n\n            i18n-pagerItems=\"kendo.grid.pagerItems|The label after the total pages number in the Grid pager\"\n            pagerItems=\"items\"\n\n            i18n-pagerPageNumberInputTitle=\"kendo.grid.pagerPageNumberInputTitle|The label for the pager input in the Grid pager\"\n            pagerPageNumberInputTitle=\"Page Number\"\n\n            i18n-pagerItemsPerPage=\"kendo.grid.pagerItemsPerPage|The label for the page size chooser in the Grid pager\"\n            pagerItemsPerPage=\"items per page\"\n\n            i18n-filter=\"kendo.grid.filter|The label of the filter cell or icon\"\n            filter=\"Filter\"\n\n            i18n-filterEqOperator=\"kendo.grid.filterEqOperator|The text of the equal filter operator\"\n            filterEqOperator=\"Is equal to\"\n\n            i18n-filterNotEqOperator=\"kendo.grid.filterNotEqOperator|The text of the not equal filter operator\"\n            filterNotEqOperator=\"Is not equal to\"\n\n            i18n-filterIsNullOperator=\"kendo.grid.filterIsNullOperator|The text of the is null filter operator\"\n            filterIsNullOperator=\"Is null\"\n\n            i18n-filterIsNotNullOperator=\"kendo.grid.filterIsNotNullOperator|The text of the is not null filter operator\"\n            filterIsNotNullOperator=\"Is not null\"\n\n            i18n-filterIsEmptyOperator=\"kendo.grid.filterIsEmptyOperator|The text of the is empty filter operator\"\n            filterIsEmptyOperator=\"Is empty\"\n\n            i18n-filterIsNotEmptyOperator=\"kendo.grid.filterIsNotEmptyOperator|The text of the is not empty filter operator\"\n            filterIsNotEmptyOperator=\"Is not empty\"\n\n            i18n-filterStartsWithOperator=\"kendo.grid.filterStartsWithOperator|The text of the starts with filter operator\"\n            filterStartsWithOperator=\"Starts with\"\n\n            i18n-filterContainsOperator=\"kendo.grid.filterContainsOperator|The text of the contains filter operator\"\n            filterContainsOperator=\"Contains\"\n\n            i18n-filterNotContainsOperator=\"kendo.grid.filterNotContainsOperator|The text of the does not contain filter operator\"\n            filterNotContainsOperator=\"Does not contain\"\n\n            i18n-filterEndsWithOperator=\"kendo.grid.filterEndsWithOperator|The text of the ends with filter operator\"\n            filterEndsWithOperator=\"Ends with\"\n\n            i18n-filterGteOperator=\"kendo.grid.filterGteOperator|The text of the greater than or equal filter operator\"\n            filterGteOperator=\"Is greater than or equal to\"\n\n            i18n-filterGtOperator=\"kendo.grid.filterGtOperator|The text of the greater than filter operator\"\n            filterGtOperator=\"Is greater than\"\n\n            i18n-filterLteOperator=\"kendo.grid.filterLteOperator|The text of the less than or equal filter operator\"\n            filterLteOperator=\"Is less than or equal to\"\n\n            i18n-filterLtOperator=\"kendo.grid.filterLtOperator|The text of the less than filter operator\"\n            filterLtOperator=\"Is less than\"\n\n            i18n-filterIsTrue=\"kendo.grid.filterIsTrue|The text of the IsTrue boolean filter option\"\n            filterIsTrue=\"Is True\"\n\n            i18n-filterIsFalse=\"kendo.grid.filterIsFalse|The text of the IsFalse boolean filter option\"\n            filterIsFalse=\"Is False\"\n\n            i18n-filterBooleanAll=\"kendo.grid.filterBooleanAll|The text of the (All) boolean filter option\"\n            filterBooleanAll=\"(All)\"\n\n            i18n-filterAfterOrEqualOperator=\"kendo.grid.filterAfterOrEqualOperator|The text of the after or equal date filter operator\"\n            filterAfterOrEqualOperator=\"Is after or equal to\"\n\n            i18n-filterAfterOperator=\"kendo.grid.filterAfterOperator|The text of the after date filter operator\"\n            filterAfterOperator=\"Is after\"\n\n            i18n-filterBeforeOperator=\"kendo.grid.filterBeforeOperator|The text of the before date filter operator\"\n            filterBeforeOperator=\"Is before\"\n\n            i18n-filterBeforeOrEqualOperator=\"kendo.grid.filterBeforeOrEqualOperator|The text of the before or equal date filter operator\"\n            filterBeforeOrEqualOperator=\"Is before or equal to\"\n\n            i18n-filterFilterButton=\"kendo.grid.filterFilterButton|The text of the filter button\"\n            filterFilterButton=\"Filter\"\n\n            i18n-filterClearButton=\"kendo.grid.filterClearButton|The text of the clear filter button\"\n            filterClearButton=\"Clear\"\n\n            i18n-filterAndLogic=\"kendo.grid.filterAndLogic|The text of the And filter logic\"\n            filterAndLogic=\"And\"\n\n            i18n-filterOrLogic=\"kendo.grid.filterOrLogic|The text of the Or filter logic\"\n            filterOrLogic=\"Or\"\n\n            i18n-loading=\"kendo.grid.loading|The loading text\"\n            loading=\"Loading\"\n\n            i18n-columnMenu=\"kendo.grid.columnMenu|The title of the column menu icon\"\n            columnMenu=\"Column Menu\"\n\n            i18n-columns=\"kendo.grid.columns|The text shown in the column menu for the columns item\"\n            columns=\"Columns\"\n\n            i18n-lock=\"kendo.grid.lock|The text shown in the column menu for the lock item\"\n            lock=\"Lock\"\n\n            i18n-unlock=\"kendo.grid.unlock|The text shown in the column menu for the unlock item\"\n            unlock=\"Unlock\"\n\n            i18n-sortable=\"kendo.grid.sortable|The label of the sort icon\"\n            sortable=\"Sortable\"\n\n            i18n-sortAscending=\"kendo.grid.sortAscending|The text shown in the column menu for the sort ascending item\"\n            sortAscending=\"Sort Ascending\"\n\n            i18n-sortDescending=\"kendo.grid.sortDescending|The text shown in the column menu for the sort descending item\"\n            sortDescending=\"Sort Descending\"\n\n            i18n-sortedAscending=\"kendo.grid.sortedAscending|The status announcement when a column is sorted ascending\"\n            sortedAscending=\"Sorted Ascending\"\n\n            i18n-sortedDescending=\"kendo.grid.sortedDescending|The status announcement when a column is sorted descending\"\n            sortedDescending=\"Sorted Descending\"\n\n            i18n-sortedDefault=\"kendo.grid.sortedDefault|The status announcement when a column is no longer sorted\"\n            sortedDefault=\"Not Sorted\"\n\n            i18n-columnsApply=\"kendo.grid.columnsApply|The text shown in the column menu or column chooser for the columns apply button\"\n            columnsApply=\"Apply\"\n\n            i18n-columnsReset=\"kendo.grid.columnsReset|The text shown in the column menu or column chooser for the columns reset button\"\n            columnsReset=\"Reset\"\n\n            i18n-detailExpand=\"kendo.grid.detailExpand|The title of the expand icon of detail rows.\"\n            detailExpand=\"Expand Details\"\n\n            i18n-detailCollapse=\"kendo.grid.detailCollapse|The title of the collapse icon of detail rows.\"\n            detailCollapse=\"Collapse Details\"\n\n            i18n-filterDateToday=\"kendo.grid.filterDateToday|The text of the Today button of the Date filter.\"\n            filterDateToday=\"TODAY\"\n\n            i18n-filterDateToggle=\"kendo.grid.filterDateToggle|The title of the Toggle button of the Date filter.\"\n            filterDateToggle=\"Toggle Calendar\"\n\n            i18n-filterNumericDecrement=\"kendo.grid.filterNumericDecrement|The title of the Decrement button of the Numeric filter.\"\n            filterNumericDecrement=\"Decrement\"\n\n            i18n-filterNumericIncrement=\"kendo.grid.filterNumericIncrement|The title of the Increment button of the Numeric filter.\"\n            filterNumericIncrement=\"Increment\"\n        >\n        </ng-container>\n        <kendo-grid-toolbar *ngIf=\"showTopToolbar\" position=\"top\"></kendo-grid-toolbar>\n        <kendo-grid-group-panel\n            *ngIf=\"showGroupPanel\"\n            [text]=\"groupableEmptyText\"\n            [groups]=\"group\"\n            (change)=\"groupChange.emit($event)\">\n        </kendo-grid-group-panel>\n        <div #ariaRoot\n            class=\"k-grid-aria-root\"\n            role=\"grid\"\n            [attr.aria-rowcount]=\"ariaRowCount\"\n            [attr.aria-colcount]=\"ariaColCount\">\n        <ng-template [ngIf]=\"isScrollable\">\n            <div *ngIf=\"!hideHeader\"\n                class=\"k-grid-header\"\n                role=\"presentation\"\n                [style.padding]=\"headerPadding\">\n                <div *ngIf=\"isLocked\"\n                     #lockedHeader\n                     role=\"presentation\"\n                     class=\"k-grid-header-locked\"\n                     [style.width.px]=\"lockedWidth\">\n                    <table [locked]=\"true\" role=\"presentation\" [style.width.px]=\"lockedWidth\">\n                        <colgroup kendoGridColGroup\n                            role=\"presentation\"\n                            [columns]=\"lockedLeafColumns\"\n                            [groups]=\"group\"\n                            [detailTemplate]=\"detailTemplate\">\n                        </colgroup>\n                        <thead kendoGridHeader\n                            [resizable]=\"resizable\"\n                            [scrollable]=\"true\"\n                            [columns]=\"lockedColumns\"\n                            [totalColumnLevels]=\"totalColumnLevels\"\n                            [sort]=\"sort\"\n                            [groups]=\"group\"\n                            [filter]=\"filter\"\n                            [filterable]=\"filterable\"\n                            [groupable]=\"showGroupPanel\"\n                            [reorderable]=\"reorderable\"\n                            [sortable]=\"sortable\"\n                            [columnMenu]=\"columnMenuOptions\"\n                            [columnMenuTemplate]=\"columnMenuTemplate\"\n                            [totalColumnsCount]=\"leafColumns.length\"\n                            [detailTemplate]=\"detailTemplate\">\n                        </thead>\n                    </table>\n                </div><div #header class=\"k-grid-header-wrap\" role=\"presentation\" data-scrollable\n                    [kendoGridResizableContainer]=\"lockedLeafColumns.length\"\n                    [lockedWidth]=\"lockedWidth + scrollbarWidth + 2\">\n                    <table role=\"presentation\" [style.width.px]=\"nonLockedWidth\" [virtualColumns]=\"virtualColumns\">\n                        <colgroup kendoGridColGroup\n                            role=\"presentation\"\n                            [columns]=\"headerLeafColumns\"\n                            [groups]=\"isLocked ? [] : group\"\n                            [detailTemplate]=\"detailTemplate\">\n                        </colgroup>\n                        <thead kendoGridHeader\n                            [resizable]=\"resizable\"\n                            role=\"presentation\"\n                            [scrollable]=\"true\"\n                            [columns]=\"headerColumns\"\n                            [totalColumnLevels]=\"totalColumnLevels\"\n                            [sort]=\"sort\"\n                            [filter]=\"filter\"\n                            [filterable]=\"filterable\"\n                            [groupable]=\"showGroupPanel\"\n                            [reorderable]=\"reorderable\"\n                            [groups]=\"isLocked ? [] : group\"\n                            [sortable]=\"sortable\"\n                            [columnMenu]=\"columnMenuOptions\"\n                            [columnMenuTemplate]=\"columnMenuTemplate\"\n                            [lockedColumnsCount]=\"lockedLeafColumns.length\"\n                            [totalColumnsCount]=\"leafColumns.length\"\n                            [detailTemplate]=\"detailTemplate\">\n                        </thead>\n                    </table>\n                    <div *ngIf=\"virtualColumns\" class=\"k-width-container\" role=\"presentation\">\n                        <div [style.width.px]=\"columnsContainer.unlockedWidth\"></div>\n                    </div>\n                </div>\n            </div>\n            <kendo-grid-list\n                [data]=\"view\"\n                [rowHeight]=\"rowHeight\"\n                [detailRowHeight]=\"detailRowHeight\"\n                [total]=\"totalCount\"\n                [take]=\"pageSize\"\n                [groups]=\"group\"\n                [groupable]=\"groupable\"\n                [skip]=\"skip\"\n                [trackBy]=\"trackBy\"\n                [columns]=\"columnsContainer\"\n                [selectable]=\"selectable\"\n                [filterable]=\"filterable\"\n                [detailTemplate]=\"detailTemplate\"\n                [noRecordsTemplate]=\"noRecordsTemplate\"\n                (pageChange)=\"notifyPageChange('list', $event)\"\n                [rowClass]=\"rowClass\"\n                [loading]=\"loading\"\n                [isVirtual]=\"isVirtual\"\n                [virtualColumns]=\"virtualColumns\"\n                (scrollBottom)=\"notifyScrollBottom()\"\n                (contentScroll)=\"contentScroll.emit($event)\"\n                kendoDraggable\n                kendoGridSelectionMarquee\n                [enableDrag]=\"marqueeSelection\"\n                >\n            </kendo-grid-list>\n            <div\n                *ngIf=\"showFooter\"\n                class=\"k-grid-footer\"\n                [style.padding]=\"headerPadding\">\n                <div\n                    *ngIf=\"lockedLeafColumns.length\"\n                    class=\"k-grid-footer-locked\"\n                    [style.width.px]=\"lockedWidth\">\n                    <table role=\"presentation\" [locked]=\"true\" [style.width.px]=\"lockedWidth\">\n                        <colgroup kendoGridColGroup\n                            [columns]=\"lockedLeafColumns\"\n                            [groups]=\"group\"\n                            [detailTemplate]=\"detailTemplate\">\n                        </colgroup>\n                        <tfoot kendoGridFooter\n                            [scrollable]=\"true\"\n                            [groups]=\"group\"\n                            [columns]=\"lockedLeafColumns\"\n                            [detailTemplate]=\"detailTemplate\"\n                            [logicalRowIndex]=\"ariaRowCount\">\n                        </tfoot>\n                    </table>\n                </div><div #footer\n                    class=\"k-grid-footer-wrap\" data-scrollable\n                    [kendoGridResizableContainer]=\"lockedLeafColumns.length\"\n                    [lockedWidth]=\"lockedWidth + scrollbarWidth + 3\">\n                    <table role=\"presentation\" [style.width.px]=\"nonLockedWidth\">\n                        <colgroup kendoGridColGroup\n                            [columns]=\"nonLockedLeafColumns\"\n                            [groups]=\"isLocked ? [] : group\"\n                            [detailTemplate]=\"detailTemplate\">\n                        </colgroup>\n                        <tfoot kendoGridFooter\n                            [logicalRowIndex]=\"ariaRowCount\"\n                            [scrollable]=\"true\"\n                            [groups]=\"isLocked ? [] : group\"\n                            [columns]=\"nonLockedLeafColumns\"\n                            [lockedColumnsCount]=\"lockedLeafColumns.length\"\n                            [detailTemplate]=\"detailTemplate\">\n                        </tfoot>\n                    </table>\n                </div>\n            </div>\n        </ng-template>\n        <ng-template [ngIf]=\"!isScrollable\">\n            <table [style.table-layout]=\"resizable ? 'fixed' : null\">\n                <colgroup kendoGridColGroup\n                    [columns]=\"leafColumns\"\n                    [groups]=\"group\"\n                    [detailTemplate]=\"detailTemplate\">\n                </colgroup>\n                <thead kendoGridHeader\n                    *ngIf=\"!hideHeader\"\n                    [resizable]=\"resizable\"\n                    [scrollable]=\"false\"\n                    [columns]=\"visibleColumns\"\n                    [totalColumnLevels]=\"totalColumnLevels\"\n                    [groups]=\"group\"\n                    [groupable]=\"showGroupPanel\"\n                    [reorderable]=\"reorderable\"\n                    [sort]=\"sort\"\n                    [sortable]=\"sortable\"\n                    [filter]=\"filter\"\n                    [filterable]=\"filterable\"\n                    [columnMenu]=\"columnMenuOptions\"\n                    [columnMenuTemplate]=\"columnMenuTemplate\"\n                    [detailTemplate]=\"detailTemplate\">\n                </thead>\n                <tbody kendoGridTableBody\n                    [groups]=\"group\"\n                    [data]=\"view\"\n                    [skip]=\"skip\"\n                    [columns]=\"leafColumns\"\n                    [selectable]=\"selectable\"\n                    [filterable]=\"filterable\"\n                    [noRecordsTemplate]=\"noRecordsTemplate\"\n                    [detailTemplate]=\"detailTemplate\"\n                    [showGroupFooters]=\"showGroupFooters\"\n                    [trackBy]=\"trackBy\"\n                    [rowClass]=\"rowClass\"\n                    kendoDraggable\n                    kendoGridSelectionMarquee\n                    [enableDrag]=\"marqueeSelection\">\n                </tbody>\n                <tfoot kendoGridFooter\n                    *ngIf=\"showFooter\"\n                    [scrollable]=\"false\"\n                    [logicalRowIndex]=\"ariaRowCount\"\n                    [groups]=\"group\"\n                    [columns]=\"leafColumns\"\n                    [detailTemplate]=\"detailTemplate\">\n                </tfoot>\n            </table>\n            <div *ngIf=\"loading\" kendoGridLoading>\n            </div>\n        </ng-template>\n        </div>\n        <kendo-pager\n            *ngIf=\"showPager\"\n            [template]=\"pagerTemplate\"\n            [pageSize]=\"pageSize\"\n            [total]=\"view.total\"\n            [skip]=\"skip\"\n            [options]=\"pageable\"\n            (pageChange)=\"notifyPageChange('pager', $event)\">\n        </kendo-pager>\n        <kendo-grid-toolbar *ngIf=\"showBottomToolbar\" position=\"bottom\"></kendo-grid-toolbar>\n    "
                },] },
    ];
    /** @nocollapse */
    GridComponent.ctorParameters = function () { return [
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
    ]; };
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
    return GridComponent;
}());

/**
 * @hidden
 */
var update = function (arr, idx, value) { return (arr.slice(0, idx + 1).concat((arr.slice(idx + 1).map(function (x) { return x + value; })))); };
/**
 * @hidden
 */
var RowHeightService = /** @class */ (function () {
    function RowHeightService(total, rowHeight, detailRowHeight) {
        if (total === void 0) { total = 0; }
        this.total = total;
        this.rowHeight = rowHeight;
        this.detailRowHeight = detailRowHeight;
        this.offsets = [];
        this.heights = [];
        var agg = 0;
        for (var idx = 0; idx < total; idx++) {
            this.offsets.push(agg);
            agg += rowHeight;
            this.heights.push(rowHeight);
        }
    }
    RowHeightService.prototype.height = function (rowIndex) {
        return this.heights[rowIndex];
    };
    RowHeightService.prototype.expandDetail = function (rowIndex) {
        if (this.height(rowIndex) === this.rowHeight) {
            this.updateRowHeight(rowIndex, this.detailRowHeight);
        }
    };
    RowHeightService.prototype.collapseDetail = function (rowIndex) {
        if (this.height(rowIndex) > this.rowHeight) {
            this.updateRowHeight(rowIndex, this.detailRowHeight * -1);
        }
    };
    RowHeightService.prototype.isExpanded = function (rowIndex) {
        return this.height(rowIndex) > this.rowHeight;
    };
    RowHeightService.prototype.index = function (position) {
        if (position < 0) {
            return undefined;
        }
        var result = this.offsets.reduce(function (prev, current, idx) {
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
    };
    RowHeightService.prototype.offset = function (rowIndex) {
        return this.offsets[rowIndex];
    };
    RowHeightService.prototype.totalHeight = function () {
        return this.heights.reduce(function (prev, curr) { return prev + curr; }, 0);
    };
    RowHeightService.prototype.updateRowHeight = function (rowIndex, value) {
        if (this.total > 0) {
            this.heights[rowIndex] += value;
            this.offsets = update(this.offsets, rowIndex, value);
        }
    };
    return RowHeightService;
}());

/**
 * @hidden
 */
var ScrollAction = /** @class */ (function () {
    function ScrollAction(offset) {
        this.offset = offset;
    }
    return ScrollAction;
}());
/**
 * @hidden
 */
var PageAction = /** @class */ (function () {
    function PageAction(skip, take$$1) {
        this.skip = skip;
        this.take = take$$1;
    }
    return PageAction;
}());
/**
 * @hidden
 */
var ScrollBottomAction = /** @class */ (function () {
    function ScrollBottomAction() {
    }
    return ScrollBottomAction;
}());
var SCROLL_BOTTOM_THRESHOLD = 2;
/**
 * @hidden
 */
var ScrollerService = /** @class */ (function () {
    function ScrollerService(scrollObservable) {
        this.scrollObservable = scrollObservable;
        this.firstLoaded = 0;
    }
    ScrollerService.prototype.create = function (rowHeightService, skip, take$$1, total) {
        var _this = this;
        this.rowHeightService = rowHeightService;
        this.firstLoaded = skip;
        this.lastLoaded = skip + take$$1;
        this.take = take$$1;
        this.total = total;
        this.lastScrollTop = 0;
        var subject = new BehaviorSubject(new ScrollAction(this.rowHeightService.offset(skip)));
        this.subscription = Observable.create(function (observer) {
            _this.unsubscribe();
            _this.scrollSubscription = _this.scrollObservable.subscribe(function (x) { return _this.onScroll(x, observer); });
        }).subscribe(function (x) { return subject.next(x); });
        return subject;
    };
    ScrollerService.prototype.destroy = function () {
        this.unsubscribe();
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    ScrollerService.prototype.onScroll = function (_a, observer) {
        var scrollTop = _a.scrollTop, offsetHeight = _a.offsetHeight, scrollHeight = _a.scrollHeight, clientHeight = _a.clientHeight;
        if (this.lastScrollTop === scrollTop) {
            return;
        }
        var up = this.lastScrollTop >= scrollTop;
        this.lastScrollTop = scrollTop;
        var firstItemIndex = this.rowHeightService.index(scrollTop);
        var firstItemOffset = this.rowHeightService.offset(firstItemIndex);
        var lastItemIndex = this.rowHeightService.index(scrollTop + offsetHeight);
        if (!up) {
            if (lastItemIndex >= this.lastLoaded && this.lastLoaded < this.total) {
                var overflow = (firstItemIndex + this.take) - this.total;
                if (overflow > 0) {
                    firstItemIndex = firstItemIndex - overflow;
                    firstItemOffset = this.rowHeightService.offset(firstItemIndex);
                }
                this.firstLoaded = firstItemIndex;
                observer.next(new ScrollAction(firstItemOffset));
                var nextTake = this.firstLoaded + this.take;
                this.lastLoaded = Math.min(nextTake, this.total);
                nextTake = nextTake > this.total ? this.total - this.firstLoaded : this.take;
                observer.next(new PageAction(this.firstLoaded, this.take));
            }
            else {
                var atBottom = scrollHeight - clientHeight - scrollTop < SCROLL_BOTTOM_THRESHOLD;
                if (atBottom) {
                    observer.next(new ScrollBottomAction());
                }
            }
        }
        if (up && firstItemIndex < this.firstLoaded) {
            var nonVisibleBuffer = Math.floor(this.take * 0.3);
            this.firstLoaded = Math.max(firstItemIndex - nonVisibleBuffer, 0);
            observer.next(new ScrollAction(this.rowHeightService.offset(this.firstLoaded)));
            this.lastLoaded = Math.min(this.firstLoaded + this.take, this.total);
            observer.next(new PageAction(this.firstLoaded, this.take));
        }
    };
    ScrollerService.prototype.unsubscribe = function () {
        if (this.scrollSubscription) {
            this.scrollSubscription.unsubscribe();
            this.scrollSubscription = undefined;
        }
    };
    return ScrollerService;
}());

/**
 * @hidden
 */
var NON_DATA_CELL_CLASSES = 'k-hierarchy-cell k-detail-cell k-group-cell';
/**
 * @hidden
 */
var NON_DATA_ROW_CLASSES = 'k-grouping-row k-group-footer k-detail-row k-grid-norecords';
/**
 * @hidden
 */
var IGNORE_TARGET_CLASSSES = 'k-icon';
/**
 * @hidden
 */
var IGNORE_CONTAINER_CLASSES = 'k-widget k-grid-ignore-click';

var elementAt = function (index, elements, elementOffset) {
    for (var idx = 0, elementIdx = 0; idx < elements.length; idx++) {
        var offset = elementOffset(elements[idx]);
        if (elementIdx <= index && index <= elementIdx + offset - 1) {
            return elements[idx];
        }
        elementIdx += offset;
    }
};
var rowAt = function (index, rows) {
    return elementAt(index, rows, function (row) { return row.hasAttribute('data-kendo-grid-item-index') ? 1 : 0; });
};
var cellAt = function (index, cells) {
    return elementAt(index, cells, function (cell) { return !hasClasses(cell, NON_DATA_CELL_CLASSES) ? parseInt(cell.getAttribute('colSpan'), 10) || 1 : 0; });
};
var EMPTY_OBJECT = {};
/**
 * @hidden
 */
var SCROLLER_FACTORY_TOKEN = new InjectionToken('grid-scroll-service-factory');
/**
 * @hidden
 */
function DEFAULT_SCROLLER_FACTORY(observable) {
    return new ScrollerService(observable);
}
var wheelDeltaY = function (e) {
    var deltaY = e.wheelDeltaY;
    if (e.wheelDelta && (deltaY === undefined || deltaY)) {
        return e.wheelDelta;
    }
    else if (e.detail && e.axis === e.VERTICAL_AXIS) {
        return (-e.detail) * 10;
    }
    return 0;
};
var preventLockedScroll = function (args, element) {
    var delta = wheelDeltaY(args);
    var scrollTop = element.scrollTop;
    var allowScroll = (scrollTop === 0 && 0 < delta) || (element.scrollHeight <= element.offsetHeight + scrollTop && delta < 0);
    if (!allowScroll) {
        event.preventDefault();
    }
};
var translateY = function (renderer, value) { return function (el) { return renderer.setStyle(el, "transform", "translateY(" + value + "px)"); }; };
var maybeNativeElement = function (el) { return el ? el.nativeElement : null; };
var hasScrollbar = function (el, parent) { return el.nativeElement.offsetWidth > parent.nativeElement.clientWidth; };
var setHeight$1 = function (renderer) { return function (_a) {
    var el = _a.el, height = _a.height;
    return renderer.setStyle(el, "height", height + "px");
}; };
var bufferSize = 1;
/**
 * @hidden
 */
var ListComponent = /** @class */ (function () {
    function ListComponent(scrollerFactory, detailsService, changeNotification, suspendService, groupsService, ngZone, renderer, scrollSyncService, resizeService, editService, supportService, navigationService, scrollRequestService, localization, columnResizingService, changeDetector, pdfService, columnInfo) {
        var _this = this;
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
        this.columns = new ColumnsContainer(function () { return []; });
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
            detailsService.changes.subscribe(function (x) { return _this.detailExpand(x); }).add(scrollRequestService.requests.subscribe(function (x) { return _this.scrollTo(x); }));
    }
    Object.defineProperty(ListComponent.prototype, "hostClass", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListComponent.prototype, "hostRole", {
        get: function () {
            return 'presentation';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListComponent.prototype, "showFooter", {
        get: function () {
            return this.groupable && this.groupable.showFooter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListComponent.prototype, "totalWidth", {
        get: function () {
            if (this.virtualColumns && this.columns.unlockedWidth) {
                return this.columns.unlockedWidth;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListComponent.prototype, "lockedLeafColumns", {
        get: function () {
            return this.columns.lockedLeafColumns;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListComponent.prototype, "nonLockedLeafColumns", {
        get: function () {
            return this.columns.nonLockedLeafColumns;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListComponent.prototype, "nonLockedColumnsToRender", {
        get: function () {
            if (this.virtualColumns && !this.pdfService.exporting) {
                return this.viewportColumns;
            }
            return this.nonLockedLeafColumns;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListComponent.prototype, "leafColumns", {
        get: function () {
            return this.columns.leafColumnsToRender;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListComponent.prototype, "lockedWidth", {
        get: function () {
            var groupCellsWidth = this.groups.length * GROUP_CELL_WIDTH;
            return expandColumns(this.lockedLeafColumns.toArray()).reduce(function (prev, curr) { return prev + (curr.width || 0); }, groupCellsWidth);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListComponent.prototype, "nonLockedWidth", {
        get: function () {
            if ((!this.rtl && this.lockedLeafColumns.length) || this.virtualColumns) {
                return sumColumnWidths(expandColumns(this.nonLockedColumnsToRender.toArray()));
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListComponent.prototype, "isLocked", {
        get: function () {
            return this.lockedLeafColumns.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    ListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.init();
        this.subscriptions.add(this.ngZone.runOutsideAngular(this.handleRowSync.bind(this)));
        this.subscriptions.add(this.ngZone.runOutsideAngular(this.handleRowNavigationLocked.bind(this)));
        this.subscriptions.add(merge(this.columns.changes, this.resizeService.changes).subscribe(function () {
            if (_this.virtualColumns) {
                _this.ngZone.run(function () {
                    _this.updateViewportColumns();
                    _this.changeDetector.markForCheck();
                });
            }
        }));
        this.subscriptions.add(this.localization.changes.subscribe(function (_a) {
            var rtl = _a.rtl;
            return _this.rtl = rtl;
        }));
    };
    ListComponent.prototype.ngOnChanges = function (changes) {
        var hasInitialSkip = changes.skip && changes.skip.firstChange && changes.skip.currentValue > 0;
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
    };
    ListComponent.prototype.ngDoCheck = function () {
        if (this.virtualColumns && (!this.viewportColumns || this.viewportWidthChange())) {
            this.updateViewportColumns();
        }
    };
    ListComponent.prototype.ngAfterViewInit = function () {
        if (this.skip && this.isVirtual) {
            this.container.nativeElement.scrollTop = this.rowHeightService.offset(this.skip);
        }
        this.resetNavigationViewport();
        this.attachContainerScroll();
        this.initResizeService();
    };
    ListComponent.prototype.ngAfterViewChecked = function () {
        var isLocked = this.isLocked;
        if (isLocked && !this.hasLockedContainer) {
            this.syncRowsHeight();
        }
        this.hasLockedContainer = isLocked;
    };
    ListComponent.prototype.syncRowsHeight = function () {
        if (this.lockedContainer) {
            syncRowsHeight(this.lockedTable.nativeElement, this.table.nativeElement);
        }
    };
    ListComponent.prototype.ngOnDestroy = function () {
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
        }
        if (this.resizeService) {
            this.resizeService.destroy();
        }
        this.cleanupScroller();
    };
    ListComponent.prototype.init = function () {
        if (this.suspendService.scroll) {
            return;
        }
        this.rowHeightService = new RowHeightService(this.total, this.rowHeight, this.detailRowHeight);
        this.totalHeight = this.rowHeightService.totalHeight();
        if (!isUniversal()) {
            this.ngZone.runOutsideAngular(this.createScroller.bind(this));
        }
    };
    ListComponent.prototype.lockedScroll = function () {
        if (!this.suspendService.scroll) {
            var lockedScrollTop = this.lockedContainer.nativeElement.scrollTop;
            if (lockedScrollTop !== this.containerScrollTop) {
                this.container.nativeElement.scrollTop = this.containerScrollTop = lockedScrollTop;
            }
        }
    };
    ListComponent.prototype.lockedMousewheel = function (args) {
        if (!args.ctrlKey) {
            preventLockedScroll(args, this.container.nativeElement);
            var scrollDelta = wheelDeltaY(args);
            this.container.nativeElement.scrollTop -= scrollDelta;
        }
    };
    ListComponent.prototype.lockedKeydown = function (args) {
        if (args.keyCode === Keys.PageDown || args.keyCode === Keys.PageUp) {
            var dir = args.keyCode === Keys.PageDown ? 1 : -1;
            var element = this.container.nativeElement;
            element.scrollTop += element.offsetHeight * dir * 0.8;
            args.preventDefault();
        }
    };
    ListComponent.prototype.detailExpand = function (_a) {
        var index = _a.index, expand = _a.expand;
        if (expand) {
            this.rowHeightService.expandDetail(index);
        }
        else {
            this.rowHeightService.collapseDetail(index);
        }
        this.totalHeight = this.rowHeightService.totalHeight();
        this.resetNavigationViewport();
    };
    ListComponent.prototype.attachContainerScroll = function () {
        var _this = this;
        if (isUniversal()) {
            return;
        }
        this.ngZone.runOutsideAngular(function () {
            _this.subscriptions.add(fromEvent(_this.container.nativeElement, 'scroll').pipe(map(function (event) { return event.target; }), filter(function () { return !_this.suspendService.scroll; }), tap(function (target) {
                _this.onContainerScroll(target);
                _this.resetNavigationViewport();
                if (_this.virtualColumns) {
                    _this.handleColumnScroll();
                }
                var rowViewport = _this.navigationService.viewport || EMPTY_OBJECT;
                var columnViewport = _this.navigationService.columnViewport || EMPTY_OBJECT;
                _this.contentScroll.emit({
                    scrollLeft: target.scrollLeft,
                    scrollTop: target.scrollTop,
                    startRow: rowViewport.firstItemIndex,
                    endRow: rowViewport.lastItemIndex,
                    startColumn: columnViewport.firstItemIndex,
                    endColumn: columnViewport.lastItemIndex
                });
            })).subscribe(_this.dispatcher));
        });
        this.scrollSyncService.registerEmitter(this.container.nativeElement, "body");
    };
    ListComponent.prototype.createScroller = function () {
        var _this = this;
        this.cleanupScroller();
        var observable = this.scroller
            .create(this.rowHeightService, this.skip, this.take, this.total);
        this.skipScroll = false;
        this.scrollerSubscription = observable.pipe(filter(function (x) { return x instanceof PageAction; }), filter(function () {
            var temp = _this.skipScroll;
            _this.skipScroll = false;
            return !temp;
        }), tap(function () { return _this.rebind = true; }))
            .subscribe(function (x) { return _this.ngZone.run(function () { return _this.pageChange.emit(x); }); });
        this.scrollerSubscription.add(observable.pipe(filter(function (x) { return x instanceof ScrollAction; }))
            .subscribe(this.scroll.bind(this)));
        this.scrollerSubscription.add(observable.pipe(filter(function (x) { return x instanceof ScrollBottomAction; }))
            .subscribe(function () { return _this.scrollBottom.emit(); }));
    };
    ListComponent.prototype.scroll = function (_a) {
        var _b = _a.offset, offset = _b === void 0 ? 0 : _b;
        if (this.isVirtual) {
            [
                maybeNativeElement(this.table),
                maybeNativeElement(this.lockedTable)
            ].filter(isPresent).forEach(translateY(this.renderer, offset));
        }
        this.resetNavigationViewport();
    };
    ListComponent.prototype.onContainerScroll = function (_a) {
        var scrollTop = _a.scrollTop;
        this.containerScrollTop = scrollTop;
        if (this.lockedContainer) {
            this.lockedContainer.nativeElement.scrollTop = scrollTop;
        }
    };
    ListComponent.prototype.handleInitialScrollToSkip = function () {
        var _this = this;
        var shouldScroll = function () { return _this.isVirtual && _this.skip > 0 && _this.total > 0; };
        var sub = this.changeNotification.changes
            .pipe(filter(shouldScroll))
            .subscribe(function (_) {
            _this.scrollTo({ row: _this.skip });
            sub.unsubscribe();
        });
    };
    ListComponent.prototype.handleRowSync = function () {
        var _this = this;
        var isLocked = function () { return isPresent(_this.lockedContainer); };
        var onStable = function () { return _this.ngZone.onStable.asObservable().pipe(take(1)); };
        return merge(this.changeNotification.changes, this.groupsService.changes
            .pipe(filter(isLocked), switchMapTo(onStable())), this.editService.changed, this.resizeService.changes, this.columnResizingService.changes
            .pipe(filter(function (change) { return change.type === 'end'; })), this.supportService.changes)
            .pipe(tap(function () { return _this.resetNavigationViewport(); }), filter(isLocked))
            .subscribe(function () {
            var scrollTop = _this.container.nativeElement.scrollTop;
            var scrollLeft = _this.container.nativeElement.scrollLeft;
            _this.syncRowsHeight();
            _this.syncContainerHeight();
            _this.lockedContainer.nativeElement.scrollTop = _this.container.nativeElement.scrollTop = scrollTop;
            // fixes scroll left position in IE when editing
            _this.container.nativeElement.scrollLeft = scrollLeft;
            _this.resizeSensors.forEach(function (sensor) { return sensor.acceptSize(); });
        });
    };
    ListComponent.prototype.handleRowNavigationLocked = function () {
        var _this = this;
        return this.navigationService.changes.pipe(filter(function () { return isPresent(_this.lockedContainer); }), delay(10)).subscribe(function (args) {
            if (_this.lockedLeafColumns.length <= args.prevColIndex && args.colIndex < _this.lockedLeafColumns.length) {
                var cell = _this.navigationService.activeCell;
                if (cell && cell.colIndex + cell.colSpan < args.prevColIndex) {
                    _this.container.nativeElement.scrollLeft = 0;
                }
            }
        });
    };
    ListComponent.prototype.scrollToVirtualRow = function (itemIndex) {
        if (isPresent(this.detailTemplate)) {
            itemIndex = Math.floor(itemIndex / 2);
        }
        var offset = this.rowHeightService.offset(itemIndex);
        this.container.nativeElement.scrollTop = offset;
        this.resetNavigationViewport();
    };
    ListComponent.prototype.scrollTo = function (_a) {
        var row = _a.row, column = _a.column;
        if (isNumber(row)) {
            if (this.isVirtual) {
                this.scrollToVirtualRow(row);
            }
            else {
                var element = rowAt(row, this.table.nativeElement.rows);
                if (element) {
                    this.container.nativeElement.scrollTop = element.offsetTop;
                }
            }
        }
        if (isNumber(column)) {
            column -= this.lockedLeafColumns.length;
            if (this.virtualColumns) {
                var columns = this.columns.leafColumnsToRender;
                var offset = 0;
                for (var idx = 0; idx < column; idx++) {
                    offset += columns[idx].width || 0;
                }
                var startOffset = this.lockedLeafColumns.length ? 0 : this.groups.length * GROUP_CELL_WIDTH + (this.detailTemplate && column > 0 ? GROUP_CELL_WIDTH : 0);
                this.container.nativeElement.scrollLeft = this.normalizeScrollLeft(offset + startOffset);
            }
            else if (column === 0 && this.detailTemplate) {
                this.container.nativeElement.scrollLeft = this.normalizeScrollLeft(0);
            }
            else {
                var firstRow = rowAt(0, this.table.nativeElement.rows);
                if (firstRow) {
                    var element = cellAt(column, firstRow.cells);
                    if (element) {
                        this.container.nativeElement.scrollLeft = this.elementScrollLeft(element);
                    }
                }
            }
        }
    };
    ListComponent.prototype.resetNavigationViewport = function () {
        if (!this.container || !this.navigationService.enabled ||
            !this.navigationService.needsViewport() || this.data.length === 0) {
            return;
        }
        var _a = this.container.nativeElement, scrollTop = _a.scrollTop, offsetHeight = _a.offsetHeight;
        var scrollBottom = scrollTop + offsetHeight;
        var firstItemIndex = this.rowHeightService.index(scrollTop);
        var lastItemIndex = this.rowHeightService.index(scrollBottom);
        var lastItemOffset = this.rowHeightService.offset(lastItemIndex);
        var lastItemOverflows = lastItemOffset + this.rowHeight > scrollBottom;
        if (lastItemIndex > 0 && lastItemOverflows) {
            lastItemIndex--;
        }
        var viewportStart = firstItemIndex;
        var viewportEnd = lastItemIndex;
        if (isPresent(this.detailTemplate)) {
            viewportStart *= 2;
            viewportEnd *= 2;
            var firstItemHeight = this.rowHeightService.offset(firstItemIndex);
            if (firstItemHeight + this.rowHeight < scrollTop) {
                viewportStart++;
            }
            var lastItemHeight = this.rowHeightService.height(lastItemIndex);
            var lastItemExpanded = this.rowHeightService.isExpanded(lastItemIndex);
            var lastItemDetailOverflows = lastItemOffset + lastItemHeight > scrollBottom;
            if (lastItemExpanded && !lastItemDetailOverflows) {
                viewportEnd++;
            }
        }
        this.navigationService.setViewport(viewportStart, viewportEnd);
    };
    ListComponent.prototype.cleanupScroller = function () {
        if (this.scrollerSubscription) {
            this.scrollerSubscription.unsubscribe();
        }
        if (this.scroller) {
            this.scroller.destroy();
        }
    };
    ListComponent.prototype.initResizeService = function () {
        this.resizeService.connect(merge.apply(void 0, this.resizeSensors.map(function (sensor) { return sensor.resize; })));
    };
    ListComponent.prototype.syncContainerHeight = function () {
        var _this = this;
        [maybeNativeElement(this.lockedContainer)]
            .filter(isPresent)
            .map(function (el) {
            el.style.height = '';
            var height = _this.container.nativeElement.offsetHeight;
            if (hasScrollbar(_this.table, _this.container)) {
                height -= _this.supportService.scrollbarWidth;
            }
            return { el: el, height: height };
        })
            .forEach(setHeight$1(this.renderer));
    };
    ListComponent.prototype.updateViewportColumns = function (range) {
        var columns = this.columns.nonLockedLeafColumns.toArray();
        var _a = range || this.calculateViewportColumns(), startIdx = _a.startIdx, endIdx = _a.endIdx, offset = _a.offset;
        var start = Math.max(0, startIdx - bufferSize);
        var end = Math.min(endIdx + bufferSize, columns.length - 1);
        if (start < startIdx) {
            for (var idx = startIdx - 1; idx >= start; idx--) {
                offset -= columns[idx].width;
            }
        }
        var currentColumns = columns.slice(start, end + 1);
        this.viewportColumnsWidth = currentColumns.reduce(function (total, column) { return total + column.width; }, 0);
        if (start > 0) {
            var offsetColumn = new ColumnBase$1();
            offsetColumn.width = offset;
            currentColumns.unshift(offsetColumn);
        }
        this.viewportColumns = new QueryList();
        this.viewportColumns.reset(currentColumns);
        this.columnsStartIdx = start;
        this.columnsEndIdx = end;
        this.columnInfo.columnRangeChange.emit({ start: start, end: end, offset: offset });
        if (!range) {
            this.updateColumnViewport(startIdx, endIdx);
        }
    };
    ListComponent.prototype.handleColumnScroll = function () {
        var _this = this;
        var container = this.container.nativeElement;
        var scrollLeft = container.scrollLeft;
        if (this.scrollLeft !== scrollLeft) {
            this.scrollLeft = scrollLeft;
            var range_1 = this.calculateViewportColumns();
            this.updateColumnViewport(range_1.startIdx, range_1.endIdx);
            if (range_1.startIdx < this.columnsStartIdx || this.columnsEndIdx < range_1.endIdx) {
                cancelAnimationFrame(this.columnUpdateFrame);
                this.columnUpdateFrame = requestAnimationFrame(function () {
                    _this.ngZone.run(function () {
                        _this.updateViewportColumns(range_1);
                        _this.changeDetector.markForCheck();
                    });
                });
            }
        }
    };
    ListComponent.prototype.updateColumnViewport = function (startIdx, endIdx) {
        var lockedCount = this.lockedLeafColumns.length;
        var leafColumns$$1 = this.nonLockedLeafColumns.toArray();
        var viewportStart = lockedCount + startIdx + (this.detailTemplate && startIdx > 0 ? 1 : 0);
        var viewportEnd = lockedCount + endIdx + (this.detailTemplate ? 1 : 0);
        for (var idx = 0; idx < leafColumns$$1.length; idx++) {
            var column = leafColumns$$1[idx];
            if (column.isSpanColumn) {
                viewportEnd += column.childColumns.length;
            }
        }
        this.navigationService.setColumnViewport(viewportStart, viewportEnd);
    };
    ListComponent.prototype.calculateViewportColumns = function () {
        var _a = this.container.nativeElement, scrollLeft = _a.scrollLeft, clientWidth = _a.clientWidth;
        var columns = this.columns.nonLockedLeafColumns.toArray();
        var normalizedScrollLeft = this.normalizeScrollLeft(scrollLeft);
        var viewportEnd = normalizedScrollLeft + clientWidth;
        var startIdx;
        var endIdx = 0;
        var current = 0;
        var offset = 0;
        var idx;
        for (idx = 0; idx < columns.length; idx++) {
            var column = columns[idx];
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
        return { startIdx: startIdx, endIdx: endIdx, offset: offset };
    };
    ListComponent.prototype.viewportWidthChange = function () {
        var currentWidth = this.viewportColumns.toArray().reduce(function (total, column) { return total + column.width; }, 0);
        return currentWidth !== this.viewportColumnsWidth;
    };
    ListComponent.prototype.normalizeScrollLeft = function (position) {
        return this.rtl ? rtlScrollPosition(position, this.container.nativeElement, this.supportService.rtlScrollLeft) : position;
    };
    ListComponent.prototype.elementScrollLeft = function (element) {
        if (this.rtl) {
            return this.normalizeScrollLeft(this.container.nativeElement.scrollWidth - element.offsetLeft - element.offsetWidth);
        }
        return element.offsetLeft;
    };
    ListComponent.decorators = [
        { type: Component, args: [{
                    providers: [
                        {
                            provide: SCROLLER_FACTORY_TOKEN,
                            useValue: DEFAULT_SCROLLER_FACTORY
                        }
                    ],
                    selector: 'kendo-grid-list',
                    template: "\n    <div #lockedContainer class=\"k-grid-content-locked\" role=\"presentation\"\n        *ngIf=\"isLocked\" [style.width.px]=\"lockedWidth\"\n        [kendoEventsOutsideAngular]=\"{\n            keydown: lockedKeydown,\n            scroll: lockedScroll,\n            mousewheel: lockedMousewheel,\n            DOMMouseScroll: lockedMousewheel\n        }\"\n        [scope]=\"this\"\n        >\n        <div role=\"presentation\" class=\"k-grid-table-wrap\">\n            <table [locked]=\"true\" #lockedTable class=\"k-grid-table\" role=\"presentation\" [style.width.px]=\"lockedWidth\">\n                <colgroup kendoGridColGroup\n                    role=\"presentation\"\n                    [groups]=\"groups\"\n                    [columns]=\"lockedLeafColumns\"\n                    [detailTemplate]=\"detailTemplate\">\n                </colgroup>\n                <tbody kendoGridTableBody\n                    role=\"presentation\"\n                    [groups]=\"groups\"\n                    [isLocked]=\"true\"\n                    [data]=\"data\"\n                    [noRecordsText]=\"''\"\n                    [columns]=\"lockedLeafColumns\"\n                    [totalColumnsCount]=\"leafColumns.length\"\n                    [detailTemplate]=\"detailTemplate\"\n                    [showGroupFooters]=\"showFooter\"\n                    [skip]=\"skip\"\n                    [selectable]=\"selectable\"\n                    [trackBy]=\"trackBy\"\n                    [filterable]=\"filterable\"\n                    [rowClass]=\"rowClass\">\n                </tbody>\n            </table>\n            <kendo-resize-sensor></kendo-resize-sensor>\n        </div>\n        <div class=\"k-height-container\" role=\"presentation\">\n            <div [style.height.px]=\"totalHeight\"></div>\n        </div>\n    </div><div #container\n               class=\"k-grid-content k-virtual-content\"\n               role=\"presentation\" tabindex=\"-1\"\n               [kendoGridResizableContainer]=\"lockedLeafColumns.length\"\n               [lockedWidth]=\"lockedWidth + 1\">\n        <div role=\"presentation\" class=\"k-grid-table-wrap\">\n            <table [style.width.px]=\"nonLockedWidth\" #table [virtualColumns]=\"virtualColumns\"\n              class=\"k-grid-table\" role=\"presentation\">\n                <colgroup kendoGridColGroup\n                    role=\"presentation\"\n                    [groups]=\"isLocked ? [] : groups\"\n                    [columns]=\"nonLockedColumnsToRender\"\n                    [detailTemplate]=\"detailTemplate\">\n                </colgroup>\n                <tbody kendoGridTableBody\n                    role=\"presentation\"\n                    [skipGroupDecoration]=\"isLocked\"\n                    [data]=\"data\"\n                    [groups]=\"groups\"\n                    [showGroupFooters]=\"showFooter\"\n                    [columns]=\"nonLockedColumnsToRender\"\n                    [allColumns]=\"nonLockedLeafColumns\"\n                    [detailTemplate]=\"detailTemplate\"\n                    [noRecordsTemplate]=\"noRecordsTemplate\"\n                    [lockedColumnsCount]=\"lockedLeafColumns.length\"\n                    [totalColumnsCount]=\"leafColumns.length\"\n                    [skip]=\"skip\"\n                    [selectable]=\"selectable\"\n                    [trackBy]=\"trackBy\"\n                    [filterable]=\"filterable\"\n                    [rowClass]=\"rowClass\"\n                    [virtualColumns]=\"virtualColumns\">\n                </tbody>\n            </table>\n            <kendo-resize-sensor *ngIf=\"isLocked\"></kendo-resize-sensor>\n        </div>\n        <kendo-resize-sensor *ngIf=\"isLocked || virtualColumns\"></kendo-resize-sensor>\n        <div class=\"k-height-container\" role=\"presentation\">\n            <div [style.height.px]=\"totalHeight\"></div>\n        </div>\n        <div *ngIf=\"virtualColumns\" class=\"k-width-container\" role=\"presentation\">\n            <div [style.width.px]=\"totalWidth\"></div>\n        </div>\n    </div>\n    <div *ngIf=\"loading\" kendoGridLoading>\n    </div>\n    "
                },] },
    ];
    /** @nocollapse */
    ListComponent.ctorParameters = function () { return [
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
    ]; };
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
    return ListComponent;
}());

/**
 * A directive which encapsulates the in-memory handling of data operations such as [paging]({% slug paging_grid %}),
 * [sorting]({% slug sorting_grid %}), and [grouping]({% slug groupingbasics_grid %})
 * ([more information and examples]({% slug automaticoperations_grid %})).
 */
var DataBindingDirective = /** @class */ (function () {
    function DataBindingDirective(grid, changeDetector, localDataChangesService) {
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
    Object.defineProperty(DataBindingDirective.prototype, "skip", {
        /**
         * Defines the number of records that will be skipped by the pager.
         */
        set: function (value) {
            if (!isPresent(value)) {
                value = 0;
            }
            this.grid.skip = this.state.skip = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataBindingDirective.prototype, "sort", {
        /**
         * Defines the descriptors by which the data will be sorted.
         */
        set: function (value) {
            this.grid.sort = this.state.sort = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataBindingDirective.prototype, "filter", {
        /**
         * Defines the descriptor by which the data will be filtered.
         */
        set: function (value) {
            this.grid.filter = this.state.filter = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataBindingDirective.prototype, "pageSize", {
        /**
         * Defines the page size used by the Grid pager.
         */
        set: function (value) {
            this.grid.pageSize = this.state.take = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataBindingDirective.prototype, "group", {
        /**
         * The descriptors by which the data will be grouped.
         */
        set: function (value) {
            this.grid.group = this.state.group = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataBindingDirective.prototype, "data", {
        /**
         * The array of data which will be used to populate the Grid.
         */
        set: function (value) {
            this.originalData = value || [];
            if (this.localDataChangesService) {
                this.localDataChangesService.data = value;
            }
            this.dataChanged = true;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    DataBindingDirective.prototype.ngOnInit = function () {
        this.applyState(this.state);
        this.stateChangeSubscription = this.grid
            .dataStateChange
            .subscribe(this.onStateChange.bind(this));
    };
    /**
     * @hidden
     */
    DataBindingDirective.prototype.ngOnDestroy = function () {
        if (this.stateChangeSubscription) {
            this.stateChangeSubscription.unsubscribe();
        }
        if (this.dataChangedSubscription) {
            this.dataChangedSubscription.unsubscribe();
        }
    };
    /**
     * @hidden
     */
    DataBindingDirective.prototype.ngOnChanges = function (changes) {
        if (anyChanged(["pageSize", "skip", "sort", "group", "filter"], changes)) {
            this.rebind();
        }
    };
    DataBindingDirective.prototype.ngDoCheck = function () {
        if (this.dataChanged) {
            this.updateGridData();
        }
    };
    /**
     * @hidden
     */
    DataBindingDirective.prototype.onStateChange = function (state$$1) {
        this.applyState(state$$1);
        this.rebind();
    };
    /**
     * @hidden
     */
    DataBindingDirective.prototype.rebind = function () {
        this.data = this.originalData;
        this.updateGridData();
        this.notifyDataChange();
    };
    /**
     * Notifies the Grid that its data has changed.
     */
    DataBindingDirective.prototype.notifyDataChange = function () {
        this.grid.onDataChange();
        if (this.changeDetector) {
            this.changeDetector.markForCheck();
        }
    };
    DataBindingDirective.prototype.process = function (state$$1) {
        return process(this.originalData, state$$1);
    };
    DataBindingDirective.prototype.applyState = function (_a) {
        var skip = _a.skip, take$$1 = _a.take, sort = _a.sort, group = _a.group, filter$$1 = _a.filter;
        this.skip = skip;
        this.pageSize = take$$1;
        this.sort = sort;
        this.group = group;
        this.filter = filter$$1;
    };
    DataBindingDirective.prototype.updateGridData = function () {
        this.grid.data = this.process(this.state);
        this.dataChanged = false;
    };
    DataBindingDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoGridBinding]'
                },] },
    ];
    /** @nocollapse */
    DataBindingDirective.ctorParameters = function () { return [
        { type: GridComponent },
        { type: ChangeDetectorRef },
        { type: LocalDataChangesService }
    ]; };
    DataBindingDirective.propDecorators = {
        skip: [{ type: Input }],
        sort: [{ type: Input }],
        filter: [{ type: Input }],
        pageSize: [{ type: Input }],
        group: [{ type: Input }],
        data: [{ type: Input, args: ["kendoGridBinding",] }]
    };
    return DataBindingDirective;
}());

/**
 * A directive which stores the row selection state of the Grid in memory
 * ([see example]({% slug selection_grid %}#toc-during-data-operations)).
 */
var SelectionDirective = /** @class */ (function (_super) {
    __extends(SelectionDirective, _super);
    function SelectionDirective(grid, cd) {
        var _this = _super.call(this, grid, cd) || this;
        _this.grid = grid;
        return _this;
    }
    /**
     * @hidden
     */
    SelectionDirective.prototype.ngOnInit = function () {
        if (this.grid.selectable === false) {
            this.grid.selectable = true;
        }
        this.grid.selectionDirective = this;
    };
    /**
     * @hidden
     */
    SelectionDirective.prototype.ngOnDestroy = function () {
        _super.prototype.destroy.call(this);
    };
    SelectionDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoGridSelectBy]'
                },] },
    ];
    /** @nocollapse */
    SelectionDirective.ctorParameters = function () { return [
        { type: GridComponent },
        { type: ChangeDetectorRef }
    ]; };
    return SelectionDirective;
}(Selection));

/**
 * A directive which controls the expanded state of the master detail rows.
 */
var ExpandDetailsDirective = /** @class */ (function () {
    function ExpandDetailsDirective(grid) {
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
        this.subscriptions.add(merge(this.grid.detailExpand.pipe(map(function (e) { return (__assign({ expand: true }, e)); })), this.grid.detailCollapse.pipe(map(function (e) { return (__assign({ expand: false }, e)); }))).subscribe(this.toggleState.bind(this)));
    }
    Object.defineProperty(ExpandDetailsDirective.prototype, "expandDetailsKey", {
        /**
         * Defines the item key that will be stored in the `expandedDetailKeys` collection ([see example]({% slug master_detail_expanded_state_grid %}#toc-built-in-directive)).
         */
        get: function () {
            return this._expandBy;
        },
        set: function (key) {
            if (isString(key)) {
                this._expandBy = getter(key);
            }
            else {
                this._expandBy = key;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExpandDetailsDirective.prototype, "expandDetailBy", {
        /**
         *
         * @hidden
         * A deprecated alias for setting the `expandDetailsKey` property.
         */
        get: function () {
            return this.expandDetailsKey;
        },
        set: function (key) {
            this.expandDetailsKey = key;
        },
        enumerable: true,
        configurable: true
    });
    ExpandDetailsDirective.prototype.ngOnDestroy = function () {
        this.subscriptions.unsubscribe();
    };
    Object.defineProperty(ExpandDetailsDirective.prototype, "keyGetter", {
        get: function () {
            return this._expandBy || getter(undefined);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    ExpandDetailsDirective.prototype.isExpanded = function (args) {
        var key = this.keyGetter(args.dataItem);
        return this.expandedDetailKeys.indexOf(key) > -1 ? !this.initiallyExpanded : this.initiallyExpanded;
    };
    ExpandDetailsDirective.prototype.toggleState = function (args) {
        var key = this.keyGetter(args.dataItem);
        if (Boolean(this.initiallyExpanded) !== args.expand) {
            this.expandedDetailKeys.push(key);
        }
        else {
            var index = this.expandedDetailKeys.indexOf(key);
            this.expandedDetailKeys.splice(index, 1);
        }
        this.expandedDetailKeysChange.emit(this.expandedDetailKeys);
    };
    ExpandDetailsDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoGridExpandDetailsBy]',
                    exportAs: 'kendoGridExpandDetailsBy'
                },] },
    ];
    /** @nocollapse */
    ExpandDetailsDirective.ctorParameters = function () { return [
        { type: GridComponent }
    ]; };
    ExpandDetailsDirective.propDecorators = {
        expandedDetailKeysChange: [{ type: Output }],
        expandDetailsKey: [{ type: Input, args: ['kendoGridExpandDetailsBy',] }],
        expandDetailBy: [{ type: Input }],
        expandedDetailKeys: [{ type: Input }],
        initiallyExpanded: [{ type: Input }]
    };
    return ExpandDetailsDirective;
}());

/**
 * @hidden
 */
var Messages = /** @class */ (function (_super) {
    __extends(Messages, _super);
    function Messages() {
        return _super !== null && _super.apply(this, arguments) || this;
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
    return Messages;
}(ComponentMessages));

/**
 * @hidden
 */
var LocalizedMessagesDirective = /** @class */ (function (_super) {
    __extends(LocalizedMessagesDirective, _super);
    function LocalizedMessagesDirective(service) {
        var _this = _super.call(this) || this;
        _this.service = service;
        return _this;
    }
    LocalizedMessagesDirective.decorators = [
        { type: Directive, args: [{
                    providers: [
                        {
                            provide: Messages,
                            useExisting: forwardRef(function () { return LocalizedMessagesDirective; })
                        }
                    ],
                    selector: '[kendoGridLocalizedMessages]'
                },] },
    ];
    /** @nocollapse */
    LocalizedMessagesDirective.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    return LocalizedMessagesDirective;
}(Messages));

/**
 * Custom component messages override default component messages
 * ([see example]({% slug globalization_grid %}#toc-localization)).
 */
var CustomMessagesComponent = /** @class */ (function (_super) {
    __extends(CustomMessagesComponent, _super);
    function CustomMessagesComponent(service) {
        var _this = _super.call(this) || this;
        _this.service = service;
        return _this;
    }
    Object.defineProperty(CustomMessagesComponent.prototype, "override", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    CustomMessagesComponent.decorators = [
        { type: Component, args: [{
                    providers: [
                        {
                            provide: Messages,
                            useExisting: forwardRef(function () { return CustomMessagesComponent; })
                        }
                    ],
                    selector: 'kendo-grid-messages',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    CustomMessagesComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    return CustomMessagesComponent;
}(Messages));

/**
 * @hidden
 */
var FilterRowComponent = /** @class */ (function () {
    function FilterRowComponent(localization) {
        this.localization = localization;
        this.columns = [];
        this.groups = [];
        this.filterRowClass = true;
        this.filterLabel = this.localization.get('filter');
    }
    FilterRowComponent.decorators = [
        { type: Component, args: [{
                    selector: '[kendoGridFilterRow]',
                    template: "\n      <td\n         [class.k-group-cell]=\"true\"\n         *ngFor=\"let g of groups\"\n         role=\"presentation\">\n      </td>\n      <td\n         [class.k-hierarchy-cell]=\"true\"\n         *ngIf=\"detailTemplate?.templateRef\"\n         role=\"presentation\">\n      </td>\n      <td *ngFor=\"let column of columns; let columnIndex = index\"\n          [attr.aria-label]=\"filterLabel\"\n          kendoGridFilterCell\n            [column]=\"column\"\n            [filter]=\"filter\"\n          kendoGridLogicalCell\n            [logicalRowIndex]=\"logicalRowIndex\"\n            [logicalColIndex]=\"lockedColumnsCount + columnIndex\"\n      ></td>\n    "
                },] },
    ];
    /** @nocollapse */
    FilterRowComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    FilterRowComponent.propDecorators = {
        columns: [{ type: Input }],
        filter: [{ type: Input }],
        groups: [{ type: Input }],
        detailTemplate: [{ type: Input }],
        logicalRowIndex: [{ type: Input }],
        lockedColumnsCount: [{ type: Input }],
        filterRowClass: [{ type: HostBinding, args: ['class.k-filter-row',] }]
    };
    return FilterRowComponent;
}());

var areDifferent = function (a, b) {
    return a.field !== b.field || a.operator !== b.operator || a.value !== b.value;
};
var isChanged$1 = function (a, b) {
    if (a.length !== b.length) {
        return true;
    }
    for (var idx = 0, len = a.length; idx < len; idx++) {
        var prev = a[idx];
        var curr = b[idx];
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
var copyObject = function (obj) {
    var result = {};
    Object.assign(result, obj);
    if (obj.constructor !== Object) {
        var proto_1 = obj.constructor.prototype;
        Object.getOwnPropertyNames(proto_1).forEach(function (property) {
            if (property !== 'constructor' && proto_1.hasOwnProperty(property)) {
                result[property] = obj[property];
            }
        });
    }
    return result;
};
var cloneFilter = function (filter$$1) { return copyObject(filter$$1); };
/**
 * @hidden
 */
var cloneFilters = function (filter$$1) {
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
var diffFilters = function (a, b) {
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
var FilterCellComponent = /** @class */ (function () {
    function FilterCellComponent() {
        this._templateContext = {};
    }
    Object.defineProperty(FilterCellComponent.prototype, "filter", {
        get: function () {
            return this._filter;
        },
        set: function (value) {
            this._filter = cloneFilters(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterCellComponent.prototype, "templateContext", {
        get: function () {
            this._templateContext.column = this.column;
            this._templateContext.filter = this.filter;
            // tslint:disable-next-line:no-string-literal
            this._templateContext["$implicit"] = this.filter;
            return this._templateContext;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterCellComponent.prototype, "hasTemplate", {
        get: function () {
            return isPresent(this.column.filterCellTemplateRef);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterCellComponent.prototype, "isFilterable", {
        get: function () {
            return isPresent(this.column) && !isNullOrEmptyString(this.column.field) && this.column.filterable;
        },
        enumerable: true,
        configurable: true
    });
    FilterCellComponent.decorators = [
        { type: Component, args: [{
                    selector: '[kendoGridFilterCell]',
                    template: "\n        <ng-template [ngIf]=\"isFilterable\">\n            <ng-container [ngSwitch]=\"hasTemplate\">\n                <ng-container *ngSwitchCase=\"false\">\n                    <ng-container kendoFilterCellHost [column]=\"column\" [filter]=\"filter\"></ng-container>\n                </ng-container>\n                <ng-container *ngSwitchCase=\"true\">\n                    <ng-template\n                        *ngIf=\"column.filterCellTemplateRef\"\n                        [ngTemplateOutlet]=\"column.filterCellTemplateRef\"\n                        [ngTemplateOutletContext]=\"templateContext\">\n                    </ng-template>\n                </ng-container>\n            </ng-container>\n        </ng-template>\n    "
                },] },
    ];
    FilterCellComponent.propDecorators = {
        column: [{ type: Input }],
        filter: [{ type: Input }]
    };
    return FilterCellComponent;
}());

var localizeOperators = function (operators) { return function (localization) {
    return Object.keys(operators).reduce(function (acc, key) {
        acc[operators[key]] = localization.get(key);
        return acc;
    }, {});
}; }; // tslint:disable-line:align
var operatorTexts = localizeOperators({
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
var toJSON = function (xs) { return xs.map(function (x) { return x.toJSON(); }); };
/**
 * @hidden
 */
var FilterOperatorBase = /** @class */ (function () {
    function FilterOperatorBase(operator, localization) {
        this.operator = operator;
        this.localization = localization;
        this.messages = operatorTexts(this.localization);
        this._text = this.messages[this.operator];
        this.localization.changes.subscribe(this.refreshText.bind(this));
    }
    Object.defineProperty(FilterOperatorBase.prototype, "text", {
        /**
         * The text that will be displayed in the drop-down list.
         * @readonly
         * @type {string}
         * @memberOf FilterOperatorBase
         */
        get: function () {
            return this._text;
        },
        /**
         *
         */
        set: function (value) {
            this._text = isNullOrEmptyString(value) ? this.messages[this.operator] : value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    FilterOperatorBase.prototype.toJSON = function () {
        return {
            text: this.text,
            value: this.operator
        };
    };
    FilterOperatorBase.prototype.refreshText = function () {
        var update = this._text === this.messages[this.operator];
        this.messages = operatorTexts(this.localization);
        if (update) {
            this._text = this.messages[this.operator];
        }
    };
    FilterOperatorBase.propDecorators = {
        text: [{ type: Input }]
    };
    return FilterOperatorBase;
}());

var insertDefaultFilter = function (index, rootFilter, filter$$1) {
    rootFilter = (rootFilter || { filters: [], logic: "and" });
    rootFilter.filters[index] = filter$$1;
    return filter$$1;
};
/**
 * @hidden
 */
var setFilter = function (index, filter$$1, field, defaultOperator) {
    if (isPresent(filter$$1) && isPresent(filter$$1.filters) && filter$$1.filters.length > index) {
        return filter$$1.filters[index];
    }
    else {
        return insertDefaultFilter(index, filter$$1, {
            field: field,
            operator: defaultOperator
        });
    }
};
/**
 * @hidden
 */
var logicOperators = function (localization) { return [
    { text: localization.get("filterAndLogic"), value: "and" },
    { text: localization.get("filterOrLogic"), value: "or" }
]; };
/**
 * @hidden
 */
var flatten = function (filter$$1) {
    if (isPresent(filter$$1.filters)) {
        return filter$$1.filters.reduce(function (acc, curr) {
            return acc.concat(isCompositeFilterDescriptor(curr) ? flatten(curr) : [curr]);
        }, []);
    }
    return [];
};
var trimFilterByField = function (filter$$1, field) {
    if (isPresent(filter$$1) && isPresent(filter$$1.filters)) {
        filter$$1.filters = filter$$1.filters.filter(function (x) {
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
var filtersByField = function (filter$$1, field) {
    return flatten(filter$$1 || {}).filter(function (x) { return x.field === field; });
};
/**
 * @hidden
 */
var filterByField = function (filter$$1, field) {
    var currentFilter = filtersByField(filter$$1, field)[0];
    return currentFilter;
};
/**
 * @hidden
 */
var removeFilter = function (filter$$1, field) {
    trimFilterByField(filter$$1, field);
    return filter$$1;
};
/**
 * @hidden
 */
var localizeOperators$1 = function (operators) { return function (localization) { return Object.keys(operators).map(function (key) { return ({
    text: localization.get(key),
    value: operators[key]
}); }); }; };
/**
 * An abstract base class for the filter-cell component ([see example]({% slug reusablecustomfilters_grid %}#toc-filter-row)).
 */
var BaseFilterCellComponent = /** @class */ (function () {
    function BaseFilterCellComponent(filterService) {
        this.filterService = filterService;
        this.operatorList = new QueryList();
    }
    Object.defineProperty(BaseFilterCellComponent.prototype, "hostClasses", {
        /**
         * @hidden
         */
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseFilterCellComponent.prototype, "operators", {
        get: function () {
            return this._operators.length ? this._operators : this.defaultOperators;
        },
        set: function (values) {
            this._operators = values;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    BaseFilterCellComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.operationListSubscription = observe(this.operatorList)
            .pipe(map(function (q) { return q.toArray(); }), map(toJSON))
            .subscribe(function (x) {
            _this.operators = x;
        });
    };
    BaseFilterCellComponent.prototype.ngOnDestroy = function () {
        if (this.operationListSubscription) {
            this.operationListSubscription.unsubscribe();
        }
    };
    BaseFilterCellComponent.prototype.filterByField = function (field) {
        return filterByField(this.filter, field);
    };
    BaseFilterCellComponent.prototype.filtersByField = function (field) {
        return filtersByField(this.filter, field);
    };
    BaseFilterCellComponent.prototype.removeFilter = function (field) {
        return removeFilter(this.filter, field);
    };
    BaseFilterCellComponent.prototype.updateFilter = function (filter$$1) {
        var root = this.filter || {
            filters: [],
            logic: "and"
        };
        var currentFilter = flatten(root).filter(function (x) { return x.field === filter$$1.field; })[0];
        if (!isPresent(currentFilter)) {
            root.filters.push(filter$$1);
        }
        else {
            Object.assign(currentFilter, filter$$1);
        }
        return root;
    };
    BaseFilterCellComponent.prototype.applyFilter = function (filter$$1) {
        this.filterService.filter(filter$$1);
    };
    BaseFilterCellComponent.propDecorators = {
        hostClasses: [{ type: HostBinding, args: ['class.k-filtercell',] }],
        operatorList: [{ type: ContentChildren, args: [FilterOperatorBase,] }]
    };
    return BaseFilterCellComponent;
}());

var numericOperators = localizeOperators$1({
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
var NumericFilterComponent = /** @class */ (function (_super) {
    __extends(NumericFilterComponent, _super);
    function NumericFilterComponent(filterService, localization) {
        var _this = _super.call(this, filterService) || this;
        _this.localization = localization;
        /**
         * The default filter operator. Defaults to `eq`.
         * @type {string}
         */
        _this.operator = "eq";
        /**
         * Specifies the value that is used to increment or decrement the component value.
         * @type {numeric}
         */
        _this.step = 1;
        /**
         * Specifies whether the **Up** and **Down** spin buttons will be rendered.
         * @type {boolean}
         */
        _this.spinners = true;
        _this.defaultOperators = numericOperators(_this.localization);
        return _this;
    }
    Object.defineProperty(NumericFilterComponent.prototype, "format", {
        /**
         * Specifies the number format used when the component is not focused.
         * By default, the `column.format` value is used (if set).
         *
         * @readonly
         * @type {string}
         */
        get: function () {
            return !isNullOrEmptyString(this._format) ? this._format : this.columnFormat;
        },
        /**
         * Specifies the number format used when the component is not focused.
         * By default, the `column.format` value is used (if set).
         */
        set: function (value) {
            this._format = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumericFilterComponent.prototype, "currentFilter", {
        /**
         * The current filter for the associated column field.
         * @readonly
         * @type {FilterDescriptor}
         */
        get: function () {
            return this.filterByField(this.column.field);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumericFilterComponent.prototype, "currentOperator", {
        /**
         * The current filter operator for the associated column field.
         * @readonly
         * @type {string}
         */
        get: function () {
            return this.currentFilter ? this.currentFilter.operator : this.operator;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumericFilterComponent.prototype, "columnFormat", {
        get: function () {
            return this.column && !isNullOrEmptyString(this.column.format) ?
                extractFormat(this.column.format) : "n2";
        },
        enumerable: true,
        configurable: true
    });
    NumericFilterComponent.prototype.ngOnInit = function () {
        this.subscription = this.localization.changes.subscribe(this.localizationChange.bind(this));
    };
    NumericFilterComponent.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        _super.prototype.ngOnDestroy.call(this);
    };
    NumericFilterComponent.prototype.localizationChange = function () {
        this.defaultOperators = numericOperators(this.localization);
        if (this.operatorList.length) {
            this.operators = toJSON(this.operatorList.toArray());
        }
    };
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
    return NumericFilterComponent;
}(BaseFilterCellComponent));

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
var NumericFilterCellComponent = /** @class */ (function (_super) {
    __extends(NumericFilterCellComponent, _super);
    function NumericFilterCellComponent(filterService, localization) {
        var _this = _super.call(this, filterService, localization) || this;
        _this.localization = localization;
        /**
         * Determines the delay time (in milliseconds) before the filter value is submitted.
         * A value of `0` indicates no delay. The default value is `500`.
         * @type {boolean}
         */
        _this.filterDelay = 500;
        /**
         * Determines if the drop-down filter operators will be displayed.
         * The default value is `true`.
         * @type {boolean}
         */
        _this.showOperators = true;
        return _this;
    }
    /**
     * @hidden
     */
    NumericFilterCellComponent.prototype.messageFor = function (key) {
        return this.localization.get(key);
    };
    NumericFilterCellComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-grid-numeric-filter-cell',
                    template: "\n        <kendo-grid-filter-wrapper-cell\n            [column]=\"column\"\n            [filter]=\"filter\"\n            [operators]=\"operators\"\n            [defaultOperator]=\"operator\"\n            [showOperators]=\"showOperators\"\n        >\n            <kendo-numerictextbox\n                kendoGridFocusable\n                kendoFilterInput\n                [filterDelay]=\"filterDelay\"\n                [autoCorrect]=\"true\"\n                [value]=\"currentFilter?.value\"\n                [format]=\"format\"\n                [decimals]=\"decimals\"\n                [spinners]=\"spinners\"\n                [min]=\"min\"\n                [max]=\"max\"\n                [step]=\"step\"\n            >\n                <kendo-numerictextbox-messages\n                    [increment]=\"messageFor('filterNumericIncrement')\"\n                    [decrement]=\"messageFor('filterNumericDecrement')\"\n                >\n                </kendo-numerictextbox-messages>\n            </kendo-numerictextbox>\n        </kendo-grid-filter-wrapper-cell>\n    "
                },] },
    ];
    /** @nocollapse */
    NumericFilterCellComponent.ctorParameters = function () { return [
        { type: FilterService },
        { type: LocalizationService }
    ]; };
    NumericFilterCellComponent.propDecorators = {
        filterDelay: [{ type: Input }],
        showOperators: [{ type: Input }]
    };
    return NumericFilterCellComponent;
}(NumericFilterComponent));

/**
 * @hidden
 */
var FilterInputDirective = /** @class */ (function () {
    function FilterInputDirective(valueAccessors, ngZone, element, renderer) {
        var _this = this;
        this.change = new EventEmitter();
        this.composing = false;
        this.filterDelay = 500;
        this.changeRequests = new Subject();
        this.accessor = valueAccessors[0];
        ngZone.runOutsideAngular(function () {
            var unsubscribeStart = renderer.listen(element.nativeElement, 'compositionstart', function () { return _this.composing = true; });
            var unsubscribeEnd = renderer.listen(element.nativeElement, 'compositionend', function () { return _this.composing = false; });
            _this.unsubscribeEvents = function () {
                unsubscribeStart();
                unsubscribeEnd();
            };
        });
    }
    Object.defineProperty(FilterInputDirective.prototype, "value", {
        set: function (value) {
            this.accessor.writeValue(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterInputDirective.prototype, "disabled", {
        set: function (value) {
            this.accessor.setDisabledState(value);
        },
        enumerable: true,
        configurable: true
    });
    FilterInputDirective.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.accessor.registerOnChange(function (x) {
            return _this.filterDelay > 0 ?
                _this.changeRequests.next(x) :
                _this.change.emit(x);
        });
        this.subscribeChanges();
    };
    FilterInputDirective.prototype.ngOnChanges = function (changes) {
        if (isChanged('filterDelay', changes)) {
            this.unsubscribeChanges();
            this.subscribeChanges();
        }
    };
    FilterInputDirective.prototype.ngOnDestroy = function () {
        this.unsubscribeChanges();
        this.unsubscribeEvents();
    };
    FilterInputDirective.prototype.subscribeChanges = function () {
        var _this = this;
        this.changeRequestsSubscription = this.changeRequests
            .pipe(debounceTime(this.filterDelay), filter(function () { return !_this.composing; }))
            .subscribe(function (x) { return _this.change.emit(x); });
    };
    FilterInputDirective.prototype.unsubscribeChanges = function () {
        if (this.changeRequestsSubscription) {
            this.changeRequestsSubscription.unsubscribe();
        }
    };
    FilterInputDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoFilterInput]'
                },] },
    ];
    /** @nocollapse */
    FilterInputDirective.ctorParameters = function () { return [
        { type: Array, decorators: [{ type: Self }, { type: Inject, args: [NG_VALUE_ACCESSOR,] }] },
        { type: NgZone },
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    FilterInputDirective.propDecorators = {
        filterDelay: [{ type: Input }],
        value: [{ type: Input }]
    };
    return FilterInputDirective;
}());

var EMPTY_VALUE_OPERATORS = new Set(['isnull', 'isnotnull', 'isempty', 'isnotempty']);
var isEmptyValueOperator = function (operator) { return EMPTY_VALUE_OPERATORS.has(operator); };
/**
 * @hidden
 */
var FilterInputWrapperComponent = /** @class */ (function (_super) {
    __extends(FilterInputWrapperComponent, _super);
    function FilterInputWrapperComponent(filterService) {
        var _this = _super.call(this, filterService) || this;
        _this.operators = [];
        return _this;
    }
    Object.defineProperty(FilterInputWrapperComponent.prototype, "currentFilter", {
        get: function () {
            return this.filterByField(this.column.field);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterInputWrapperComponent.prototype, "currentOperator", {
        get: function () {
            var filter$$1 = this.currentFilter;
            if (!this._operator) {
                this._operator = filter$$1 ? filter$$1.operator : this.defaultOperator;
            }
            return this._operator;
        },
        set: function (value) {
            this._operator = value;
            var emptyValueOperator = isEmptyValueOperator(value);
            this.filterInputDisabled = emptyValueOperator;
            if (emptyValueOperator) {
                this.applyNoValueFilter(value);
            }
            else if (!isBlank(value) && isPresent(this.currentFilter)) {
                this.onChange(this.currentFilter.value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterInputWrapperComponent.prototype, "defaultOperator", {
        get: function () {
            if (!isNullOrEmptyString(this._defaultOperator)) {
                return this._defaultOperator;
            }
            else if (this.operators && this.operators.length) {
                return this.operators[0].value;
            }
            return "eq";
        },
        set: function (value) {
            this._defaultOperator = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterInputWrapperComponent.prototype, "filterInputDisabled", {
        set: function (disabled) {
            if (!this.input) {
                return;
            }
            this.input.disabled = disabled;
        },
        enumerable: true,
        configurable: true
    });
    FilterInputWrapperComponent.prototype.ngAfterContentInit = function () {
        if (isPresent(this.input)) {
            this.changeSubscription = this.input.change.subscribe(this.onChange.bind(this));
            this.filterInputDisabled = isEmptyValueOperator(this.currentOperator);
        }
    };
    FilterInputWrapperComponent.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
        if (this.changeSubscription) {
            this.changeSubscription.unsubscribe();
        }
    };
    FilterInputWrapperComponent.prototype.onChange = function (value) {
        if (!isNullOrEmptyString(value) || this.filterByField(this.column.field)) {
            this.filterChange(isNullOrEmptyString(value) ?
                this.removeFilter(this.column.field) :
                this.updateFilter({
                    field: this.column.field,
                    operator: this.currentOperator,
                    value: value
                }));
        }
    };
    FilterInputWrapperComponent.prototype.onClear = function () {
        this.onChange(null);
        this.filterInputDisabled = isEmptyValueOperator(this.defaultOperator);
    };
    FilterInputWrapperComponent.prototype.applyNoValueFilter = function (operator) {
        this.filterChange(this.updateFilter({
            field: this.column.field,
            operator: operator,
            value: null
        }));
    };
    FilterInputWrapperComponent.prototype.ngOnChanges = function (changes) {
        if (isChanged("filter", changes, false)) {
            this._operator = null;
            this.filterInputDisabled = isEmptyValueOperator(this.currentOperator);
        }
    };
    FilterInputWrapperComponent.propDecorators = {
        operators: [{ type: Input }],
        column: [{ type: Input }],
        filter: [{ type: Input }],
        input: [{ type: ContentChild, args: [FilterInputDirective,] }],
        defaultOperator: [{ type: Input }]
    };
    return FilterInputWrapperComponent;
}(BaseFilterCellComponent));

var EMPTY_FILTER_OPERATORS = ['isnull', 'isnotnull', 'isempty', 'isnotempty'];
/**
 * @hidden
 */
var FilterCellWrapperComponent = /** @class */ (function (_super) {
    __extends(FilterCellWrapperComponent, _super);
    function FilterCellWrapperComponent(filterService) {
        var _this = _super.call(this, filterService) || this;
        _this.showOperators = true;
        return _this;
    }
    Object.defineProperty(FilterCellWrapperComponent.prototype, "hostClasses", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterCellWrapperComponent.prototype, "overrideBaseClasses", {
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterCellWrapperComponent.prototype, "showButton", {
        get: function () {
            var filter$$1 = this.currentFilter;
            return isPresent(filter$$1) && (!isNullOrEmptyString(filter$$1.value) ||
                EMPTY_FILTER_OPERATORS.indexOf(String(filter$$1.operator)) >= 0);
        },
        enumerable: true,
        configurable: true
    });
    FilterCellWrapperComponent.prototype.filterChange = function (filter$$1) {
        this.applyFilter(filter$$1);
    };
    FilterCellWrapperComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-grid-filter-wrapper-cell',
                    template: "\n        <ng-content></ng-content>\n        <kendo-grid-filter-cell-operators\n            [showOperators]=\"showOperators\"\n            [operators]=\"operators\"\n            (clear)=\"onClear()\"\n            [showButton]=\"showButton\"\n            [(value)]=\"currentOperator\">\n        </kendo-grid-filter-cell-operators>\n    "
                },] },
    ];
    /** @nocollapse */
    FilterCellWrapperComponent.ctorParameters = function () { return [
        { type: FilterService }
    ]; };
    FilterCellWrapperComponent.propDecorators = {
        hostClasses: [{ type: HostBinding, args: ['class.k-filtercell-wrapper',] }],
        overrideBaseClasses: [{ type: HostBinding, args: ['class.k-filtercell',] }],
        showOperators: [{ type: Input }]
    };
    return FilterCellWrapperComponent;
}(FilterInputWrapperComponent));

// tslint:disable:no-access-missing-member
var stringOperators = localizeOperators$1({
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
var StringFilterComponent = /** @class */ (function (_super) {
    __extends(StringFilterComponent, _super);
    function StringFilterComponent(filterService, localization) {
        var _this = _super.call(this, filterService) || this;
        _this.localization = localization;
        /**
         * The default filter operator. Defaults to `contains`.
         * @type {string}
         */
        _this.operator = "contains";
        return _this;
    }
    Object.defineProperty(StringFilterComponent.prototype, "currentFilter", {
        /**
         * The current filter for the associated column field.
         * @readonly
         * @type {FilterDescriptor}
         */
        get: function () {
            return this.filterByField((this.column || {}).field);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StringFilterComponent.prototype, "currentOperator", {
        /**
         * The current filter operator for the associated column field.
         * @readonly
         * @type {string}
         */
        get: function () {
            return this.currentFilter ? this.currentFilter.operator : this.operator;
        },
        enumerable: true,
        configurable: true
    });
    StringFilterComponent.prototype.ngOnInit = function () {
        this.subscription = this.localization.changes.subscribe(this.localizationChange.bind(this));
    };
    StringFilterComponent.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        _super.prototype.ngOnDestroy.call(this);
    };
    StringFilterComponent.prototype.localizationChange = function () {
        this.defaultOperators = stringOperators(this.localization);
        if (this.operatorList.length) {
            this.operators = toJSON(this.operatorList.toArray());
        }
    };
    StringFilterComponent.propDecorators = {
        column: [{ type: Input }],
        filter: [{ type: Input }],
        operator: [{ type: Input }]
    };
    return StringFilterComponent;
}(BaseFilterCellComponent));

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
var StringFilterCellComponent = /** @class */ (function (_super) {
    __extends(StringFilterCellComponent, _super);
    function StringFilterCellComponent(filterService, localization) {
        var _this = _super.call(this, filterService, localization) || this;
        /**
         * Determines the delay time (in milliseconds) before the filter value is submitted.
         * A value of `0` indicates no delay. The default value is `500`.
         * @type {boolean}
         */
        _this.filterDelay = 500;
        /**
         * Determines if the drop-down filter operators will be displayed.
         * The default value is `true`.
         * @type {boolean}
         */
        _this.showOperators = true;
        return _this;
    }
    StringFilterCellComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-grid-string-filter-cell',
                    template: "\n        <kendo-grid-filter-wrapper-cell\n            [column]=\"column\"\n            [filter]=\"filter\"\n            [operators]=\"operators\"\n            [defaultOperator]=\"operator\"\n            [showOperators]=\"showOperators\">\n            <input\n                class=\"k-textbox\"\n                kendoGridFocusable\n                kendoFilterInput\n                [filterDelay]=\"filterDelay\"\n                [ngModel]=\"currentFilter?.value\" />\n        </kendo-grid-filter-wrapper-cell>\n    "
                },] },
    ];
    /** @nocollapse */
    StringFilterCellComponent.ctorParameters = function () { return [
        { type: FilterService },
        { type: LocalizationService }
    ]; };
    StringFilterCellComponent.propDecorators = {
        filterDelay: [{ type: Input }],
        showOperators: [{ type: Input }]
    };
    return StringFilterCellComponent;
}(StringFilterComponent));

/**
 * Represents a component which accommodates the filter operators.
 */
var FilterCellOperatorsComponent = /** @class */ (function () {
    function FilterCellOperatorsComponent(localization) {
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
    Object.defineProperty(FilterCellOperatorsComponent.prototype, "hostClasses", {
        /**
         * @hidden
         */
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    FilterCellOperatorsComponent.prototype.onChange = function (dataItem) {
        this.valueChange.emit(dataItem);
    };
    /**
     * @hidden
     */
    FilterCellOperatorsComponent.prototype.clearClick = function () {
        this.clear.emit();
        return false;
    };
    /**
     * @hidden
     */
    FilterCellOperatorsComponent.prototype.clearKeydown = function (args) {
        if (args.keyCode === Keys.Enter || args.keyCode === Keys.Space) {
            this.clear.emit();
        }
    };
    /**
     * @hidden
     */
    FilterCellOperatorsComponent.prototype.dropdownKeydown = function (args) {
        if (args.defaultPrevented) {
            return;
        }
        if (args.keyCode === Keys.Enter && !this.dropdown.isOpen) {
            this.dropdown.toggle(true);
            args.preventDefault();
        }
    };
    FilterCellOperatorsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.localization.changes.subscribe(function () { return _this.clearText = _this.localization.get("filterClearButton"); });
    };
    FilterCellOperatorsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-grid-filter-cell-operators',
                    template: "\n        <kendo-dropdownlist\n            #dropdown\n            *ngIf=\"showOperators\"\n            kendoGridFocusable\n            [data]=\"operators\"\n            class=\"k-dropdown-operator\"\n            (valueChange)=\"onChange($event)\"\n            [value]=\"value\"\n            iconClass=\"k-i-filter\"\n            [valuePrimitive]=\"true\"\n            textField=\"text\"\n            [popupSettings]=\"{ width: 'auto' }\"\n            valueField=\"value\"\n            (keydown)=\"dropdownKeydown($event)\">\n        </kendo-dropdownlist>\n        <button type=\"button\"\n            kendoGridFocusable\n            [ngClass]=\"{'k-clear-button-visible': showButton}\"\n            class=\"k-button k-button-icon\"\n            [title]=\"clearText\"\n            (click)=\"clearClick()\"\n            (keydown)=\"clearKeydown($event)\">\n                <span class=\"k-icon k-i-filter-clear\"></span>\n        </button>\n    "
                },] },
    ];
    /** @nocollapse */
    FilterCellOperatorsComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
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
    return FilterCellOperatorsComponent;
}());

// tslint:disable:no-access-missing-member
var stringOperators$1 = localizeOperators$1({
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
var AutoCompleteFilterCellComponent = /** @class */ (function (_super) {
    __extends(AutoCompleteFilterCellComponent, _super);
    function AutoCompleteFilterCellComponent(filterService, column, localization) {
        var _this = _super.call(this, filterService) || this;
        _this.localization = localization;
        _this.showOperators = true;
        _this.defaultOperators = stringOperators$1(_this.localization);
        _this.column = column;
        return _this;
    }
    Object.defineProperty(AutoCompleteFilterCellComponent.prototype, "valueField", {
        get: function () {
            return this._valueField ? this._valueField : this.column.field;
        },
        set: function (value) {
            this._valueField = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutoCompleteFilterCellComponent.prototype, "currentFilter", {
        get: function () {
            return this.filterByField(this.column.field);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutoCompleteFilterCellComponent.prototype, "currentOperator", {
        get: function () {
            return this.currentFilter ? this.currentFilter.operator : "contains";
        },
        enumerable: true,
        configurable: true
    });
    AutoCompleteFilterCellComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-grid-autocomplete-filter-cell',
                    template: "\n        <kendo-grid-filter-wrapper-cell\n            [column]=\"column\"\n            [filter]=\"filter\"\n            [operators]=\"operators\"\n            [showOperators]=\"showOperators\">\n            <kendo-autocomplete\n                kendoFilterInput\n                [data]=\"data\"\n                [valueField]=\"valueField\"\n                [value]=\"currentFilter?.value\">\n            </kendo-autocomplete>\n        </kendo-grid-filter-wrapper-cell>\n    "
                },] },
    ];
    /** @nocollapse */
    AutoCompleteFilterCellComponent.ctorParameters = function () { return [
        { type: FilterService },
        { type: ColumnComponent },
        { type: LocalizationService }
    ]; };
    AutoCompleteFilterCellComponent.propDecorators = {
        showOperators: [{ type: Input }],
        column: [{ type: Input }],
        filter: [{ type: Input }],
        data: [{ type: Input }],
        valueField: [{ type: Input }]
    };
    return AutoCompleteFilterCellComponent;
}(BaseFilterCellComponent));

// tslint:disable:no-access-missing-member
/**
 * @hidden
 */
var BooleanFilterComponent = /** @class */ (function (_super) {
    __extends(BooleanFilterComponent, _super);
    function BooleanFilterComponent(filterService, localization) {
        var _this = _super.call(this, filterService) || this;
        _this.localization = localization;
        /**
         * @hidden
         */
        _this.operator = "eq";
        /**
         * @hidden
         */
        _this.items = [
            { text: _this.localization.get("filterIsTrue"), value: true },
            { text: _this.localization.get("filterIsFalse"), value: false }
        ];
        /**
         * @hidden
         */
        _this.defaultItem = { text: _this.localization.get("filterBooleanAll"), value: null };
        return _this;
    }
    Object.defineProperty(BooleanFilterComponent.prototype, "hostClasses", {
        /**
         * @hidden
         */
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BooleanFilterComponent.prototype, "currentFilter", {
        /**
         * The current filter for the associated column field.
         * @readonly
         * @type {FilterDescriptor}
         */
        get: function () {
            return this.filterByField(this.column.field);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BooleanFilterComponent.prototype, "currentOperator", {
        /**
         * The current filter operator for the associated column field.
         * @readonly
         * @type {string}
         */
        get: function () {
            return this.currentFilter ? this.currentFilter.operator : this.operator;
        },
        enumerable: true,
        configurable: true
    });
    BooleanFilterComponent.prototype.ngOnInit = function () {
        this.subscription = this.localization.changes.subscribe(this.localizationChange.bind(this));
    };
    BooleanFilterComponent.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        _super.prototype.ngOnDestroy.call(this);
    };
    BooleanFilterComponent.prototype.localizationChange = function () {
        this.items = [
            { text: this.localization.get("filterIsTrue"), value: true },
            { text: this.localization.get("filterIsFalse"), value: false }
        ];
        this.defaultItem = { text: this.localization.get("filterBooleanAll"), value: null };
    };
    BooleanFilterComponent.propDecorators = {
        hostClasses: [{ type: HostBinding, args: ['class.k-filtercell-boolean',] }],
        column: [{ type: Input }],
        filter: [{ type: Input }]
    };
    return BooleanFilterComponent;
}(BaseFilterCellComponent));

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
var BooleanFilterCellComponent = /** @class */ (function (_super) {
    __extends(BooleanFilterCellComponent, _super);
    function BooleanFilterCellComponent(filterService, localization, cd) {
        var _this = _super.call(this, filterService, localization) || this;
        _this.cd = cd;
        return _this;
    }
    BooleanFilterCellComponent.prototype.localizationChange = function () {
        _super.prototype.localizationChange.call(this);
        this.cd.markForCheck();
    };
    BooleanFilterCellComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-grid-boolean-filter-cell',
                    template: "\n        <kendo-grid-filter-wrapper-cell\n            [column]=\"column\"\n            [filter]=\"filter\"\n            [showOperators]=\"false\"\n            [defaultOperator]=\"operator\">\n            <kendo-dropdownlist\n                kendoFilterInput\n                [defaultItem]=\"defaultItem\"\n                [data]=\"items\"\n                textField=\"text\"\n                valueField=\"value\"\n                [popupSettings]=\"{ width: 'auto' }\"\n                [valuePrimitive]=\"true\"\n                [value]=\"currentFilter?.value\">\n            </kendo-dropdownlist>\n        </kendo-grid-filter-wrapper-cell>\n    "
                },] },
    ];
    /** @nocollapse */
    BooleanFilterCellComponent.ctorParameters = function () { return [
        { type: FilterService },
        { type: LocalizationService },
        { type: ChangeDetectorRef }
    ]; };
    return BooleanFilterCellComponent;
}(BooleanFilterComponent));

// tslint:disable:no-access-missing-member
var dateOperators = localizeOperators$1({
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
var DateFilterComponent = /** @class */ (function (_super) {
    __extends(DateFilterComponent, _super);
    function DateFilterComponent(filterService, localization) {
        var _this = _super.call(this, filterService) || this;
        _this.localization = localization;
        /**
         * The default filter operator. Defaults to `contains`.
         * @type {string}
         */
        _this.operator = "gte";
        /**
         * Defines the active view that the calendar initially renders.
         * By default, the active view is `month`.
         *
         * > You have to set `activeView` within the `topView`-`bottomView` range.
         */
        _this.activeView = "month";
        /**
         * Defines the bottommost calendar view, to which the user can navigate.
         */
        _this.bottomView = "month";
        /**
         * Defines the topmost calendar view, to which the user can navigate.
         */
        _this.topView = "century";
        /**
         * Determines whether to display a week number column in the `month` view of the Calendar.
         */
        _this.weekNumber = false;
        _this.defaultOperators = dateOperators(_this.localization);
        return _this;
    }
    Object.defineProperty(DateFilterComponent.prototype, "currentFilter", {
        /**
         * The current filter for the associated column field.
         * @readonly
         * @type {FilterDescriptor}
         */
        get: function () {
            return this.filterByField(this.column.field);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateFilterComponent.prototype, "format", {
        /**
         * Specifies the date format that is used when the component is not focused.
         * By default, the `column.format` value is used (if set).
         *
         * @readonly
         * @type {string}
         */
        get: function () {
            return !isNullOrEmptyString(this._format) ? this._format : this.columnFormat;
        },
        /**
         * Specifies the date format that is used when the component is not focused.
         * By default, the `column.format` value is used (if set).
         */
        set: function (value) {
            this._format = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateFilterComponent.prototype, "columnFormat", {
        get: function () {
            return this.column && !isNullOrEmptyString(this.column.format) ?
                extractFormat(this.column.format) : "d";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateFilterComponent.prototype, "currentOperator", {
        /**
         * The current filter operator for the associated column field.
         * @readonly
         * @type {string}
         */
        get: function () {
            return this.currentFilter ? this.currentFilter.operator : this.operator;
        },
        enumerable: true,
        configurable: true
    });
    DateFilterComponent.prototype.ngOnInit = function () {
        this.subscription = this.localization.changes.subscribe(this.localizationChange.bind(this));
    };
    DateFilterComponent.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        _super.prototype.ngOnDestroy.call(this);
    };
    DateFilterComponent.prototype.localizationChange = function () {
        this.defaultOperators = dateOperators(this.localization);
        if (this.operatorList.length) {
            this.operators = toJSON(this.operatorList.toArray());
        }
    };
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
    return DateFilterComponent;
}(BaseFilterCellComponent));

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
var DateFilterCellComponent = /** @class */ (function (_super) {
    __extends(DateFilterCellComponent, _super);
    function DateFilterCellComponent(filterService, localization) {
        var _this = _super.call(this, filterService, localization) || this;
        _this.localization = localization;
        /**
         * Determines if the drop-down filter operators will be displayed. The default value is `true`.
         * @type {boolean}
         */
        _this.showOperators = true;
        return _this;
    }
    /**
     * @hidden
     */
    DateFilterCellComponent.prototype.messageFor = function (key) {
        return this.localization.get(key);
    };
    DateFilterCellComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-grid-date-filter-cell',
                    template: "\n        <kendo-grid-filter-wrapper-cell\n            [column]=\"column\"\n            [filter]=\"filter\"\n            [operators]=\"operators\"\n            [defaultOperator]=\"operator\"\n            [showOperators]=\"showOperators\"\n        >\n            <kendo-datepicker\n                kendoFilterInput\n                [value]=\"currentFilter?.value\"\n                [format]=\"format\"\n                [formatPlaceholder]=\"formatPlaceholder\"\n                [placeholder]=\"placeholder\"\n                [activeView]=\"activeView\"\n                [bottomView]=\"bottomView\"\n                [topView]=\"topView\"\n                [min]=\"min\"\n                [max]=\"max\"\n                [weekNumber]=\"weekNumber\"\n            >\n                <kendo-datepicker-messages\n                    [toggle]=\"messageFor('filterDateToggle')\"\n                    [today]=\"messageFor('filterDateToday')\"\n                >\n                </kendo-datepicker-messages>\n            </kendo-datepicker>\n        </kendo-grid-filter-wrapper-cell>\n    "
                },] },
    ];
    /** @nocollapse */
    DateFilterCellComponent.ctorParameters = function () { return [
        { type: FilterService },
        { type: LocalizationService }
    ]; };
    DateFilterCellComponent.propDecorators = {
        showOperators: [{ type: Input }]
    };
    return DateFilterCellComponent;
}(DateFilterComponent));

/**
 * @hidden
 */
var ColGroupComponent = /** @class */ (function () {
    function ColGroupComponent() {
        this.columns = [];
        this.groups = [];
    }
    Object.defineProperty(ColGroupComponent.prototype, "columnsToRender", {
        get: function () {
            return columnsToRender(this.columns);
        },
        enumerable: true,
        configurable: true
    });
    ColGroupComponent.prototype.trackBy = function (index, _item) {
        return index;
    };
    ColGroupComponent.decorators = [
        { type: Component, args: [{
                    selector: '[kendoGridColGroup]',
                    template: "\n    <ng-template [ngIf]=\"true\">\n        <col [class.k-group-col]=\"true\" *ngFor=\"let g of groups\" />\n        <col [class.k-hierarchy-col]=\"true\" *ngIf=\"detailTemplate?.templateRef\"/>\n        <col *ngFor=\"let column of columnsToRender; trackBy: trackBy;\" [style.width.px]=\"column.width\"/>\n    </ng-template>\n    "
                },] },
    ];
    ColGroupComponent.propDecorators = {
        columns: [{ type: Input }],
        groups: [{ type: Input }],
        detailTemplate: [{ type: Input }]
    };
    return ColGroupComponent;
}());

/**
 * @hidden
 */
var LoadingComponent = /** @class */ (function () {
    function LoadingComponent(localization) {
        this.localization = localization;
        this.hostClass = true;
    }
    Object.defineProperty(LoadingComponent.prototype, "loadingText", {
        get: function () {
            return this.localization.get('loading');
        },
        enumerable: true,
        configurable: true
    });
    LoadingComponent.decorators = [
        { type: Component, args: [{
                    selector: '[kendoGridLoading]',
                    template: "\n        <span class=\"k-loading-text\">{{ loadingText }}</span>\n        <div class=\"k-loading-image\"></div>\n        <div class=\"k-loading-color\"></div>\n    "
                },] },
    ];
    /** @nocollapse */
    LoadingComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    LoadingComponent.propDecorators = {
        hostClass: [{ type: HostBinding, args: ['class.k-loading-mask',] }]
    };
    return LoadingComponent;
}());

/**
 * @hidden
 */
var ResizableContainerDirective = /** @class */ (function () {
    function ResizableContainerDirective(el, renderer, resizeService, grid) {
        this.el = el;
        this.renderer = renderer;
        this.resizeService = resizeService;
        this.grid = grid;
        this.enabled = false;
    }
    Object.defineProperty(ResizableContainerDirective.prototype, "lockedWidth", {
        set: function (value) {
            this._lockedWidth = value;
            if (this.enabled) {
                this.attachResize();
                this.resize();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResizableContainerDirective.prototype, "kendoGridResizableContainer", {
        set: function (enabled) {
            var refresh = enabled !== this.enabled;
            this.enabled = enabled;
            if (refresh) {
                this.attachResize();
                this.resize();
            }
        },
        enumerable: true,
        configurable: true
    });
    ResizableContainerDirective.prototype.ngOnDestroy = function () {
        if (this.resizeSubscription) {
            this.resizeSubscription.unsubscribe();
        }
    };
    ResizableContainerDirective.prototype.attachResize = function () {
        if (this.resizeSubscription && !this.enabled) {
            this.resizeSubscription.unsubscribe();
            this.resizeSubscription = null;
        }
        if (!this.resizeSubscription && this.enabled) {
            this.resizeSubscription = this.resizeService.changes.subscribe(this.resize.bind(this));
        }
    };
    ResizableContainerDirective.prototype.resize = function () {
        if (this.grid && this.grid.wrapper) {
            var containerElement = this.grid.wrapper.nativeElement;
            var width = Math.max(containerElement.clientWidth - this._lockedWidth, 0);
            if (this.enabled && width > 0) {
                this.renderer.setStyle(this.el.nativeElement, "width", width + "px");
            }
            else {
                this.renderer.setStyle(this.el.nativeElement, "width", "");
            }
        }
    };
    ResizableContainerDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoGridResizableContainer]'
                },] },
    ];
    /** @nocollapse */
    ResizableContainerDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: ResizeService },
        { type: GridComponent, decorators: [{ type: Optional }] }
    ]; };
    ResizableContainerDirective.propDecorators = {
        lockedWidth: [{ type: Input, args: ['lockedWidth',] }],
        kendoGridResizableContainer: [{ type: Input }]
    };
    return ResizableContainerDirective;
}());

/**
 * @hidden
 */
var TemplateContextDirective = /** @class */ (function () {
    function TemplateContextDirective(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
    Object.defineProperty(TemplateContextDirective.prototype, "templateContext", {
        set: function (context) {
            this.removeView();
            if (context.templateRef) {
                this.insertedViewRef = this.viewContainerRef.createEmbeddedView(context.templateRef, context);
            }
        },
        enumerable: true,
        configurable: true
    });
    TemplateContextDirective.prototype.ngOnDestroy = function () {
        this.removeView();
    };
    TemplateContextDirective.prototype.removeView = function () {
        if (this.insertedViewRef) {
            this.viewContainerRef.remove(this.viewContainerRef.indexOf(this.insertedViewRef));
            this.insertedViewRef = undefined;
        }
    };
    TemplateContextDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[templateContext]' // tslint:disable-line:directive-selector
                },] },
    ];
    /** @nocollapse */
    TemplateContextDirective.ctorParameters = function () { return [
        { type: ViewContainerRef }
    ]; };
    TemplateContextDirective.propDecorators = {
        templateContext: [{ type: Input }]
    };
    return TemplateContextDirective;
}());

/**
 * @hidden
 */
var FocusGroup = /** @class */ (function () {
    function FocusGroup(root) {
        this.root = root;
        this.active = true;
        this.children = [];
        this.root.registerGroup(this);
    }
    Object.defineProperty(FocusGroup.prototype, "focusableChildren", {
        get: function () {
            return this.children.filter(function (el) { return el.canFocus(); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FocusGroup.prototype, "isActive", {
        get: function () {
            return this.active;
        },
        enumerable: true,
        configurable: true
    });
    FocusGroup.prototype.ngOnDestroy = function () {
        this.root.unregisterGroup(this);
    };
    FocusGroup.prototype.registerElement = function (element) {
        this.unregisterElement(element);
        this.children.push(element);
    };
    FocusGroup.prototype.unregisterElement = function (element) {
        this.children = this.children.filter(function (f) { return f !== element; });
    };
    /**
     * Returns a Boolean value which indicates if the group will receive focus when the cell is focused.
     * Requires a single "simple" focusable element such as a button or a checkbox.
     */
    FocusGroup.prototype.isNavigable = function () {
        var focusable = this.focusableChildren;
        return focusable.length === 1 && focusable[0].isNavigable();
    };
    FocusGroup.prototype.canFocus = function () {
        return this.focusableChildren.length > 0;
    };
    FocusGroup.prototype.focus = function () {
        if (this.canFocus() && !this.hasFocus()) {
            this.focusableChildren[0].focus();
        }
    };
    FocusGroup.prototype.activate = function () {
        this.toggleState(true);
    };
    FocusGroup.prototype.deactivate = function () {
        this.toggleState(false);
    };
    FocusGroup.prototype.hasFocus = function () {
        return this.children.reduce(function (focused, element) { return focused || element.hasFocus(); }, false);
    };
    FocusGroup.prototype.toggleState = function (active) {
        if (this.active !== active) {
            this.active = active;
            this.children.forEach(function (f) { return f.toggle(active); });
        }
    };
    FocusGroup.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    FocusGroup.ctorParameters = function () { return [
        { type: FocusRoot }
    ]; };
    return FocusGroup;
}());

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
    LogicalCellDirective.ctorParameters = function () { return [
        { type: FocusGroup },
        { type: ElementRef },
        { type: ColumnInfoService },
        { type: IdService },
        { type: NavigationService },
        { type: Renderer2 },
        { type: NgZone },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [CELL_CONTEXT,] }] }
    ]; };
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
    return LogicalCellDirective;
}());

var id$1 = 0;
function nextId$1() {
    return id$1++;
}
/**
 * @hidden
 */
var LogicalRowDirective = /** @class */ (function () {
    function LogicalRowDirective(idService, navigation) {
        this.idService = idService;
        this.navigation = navigation;
        this.logicalSlaveRow = false;
        this.logicalSlaveCellsCount = 0;
        this.dataRowIndex = -1;
        this.uid = nextId$1();
    }
    Object.defineProperty(LogicalRowDirective.prototype, "hostRole", {
        get: function () {
            return this.logicalSlaveRow ? 'presentation' : 'row';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LogicalRowDirective.prototype, "ariaRowIndex", {
        get: function () {
            if (this.navigation.enabled) {
                return this.logicalRowIndex + 1;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LogicalRowDirective.prototype, "ariaOwns", {
        get: function () {
            if (!this.navigation.enabled || this.logicalSlaveRow || this.logicalSlaveCellsCount === 0) {
                return undefined;
            }
            var ids = [];
            var total = this.logicalCellsCount + this.logicalSlaveCellsCount;
            for (var cellIndex = this.logicalCellsCount; cellIndex < total; cellIndex++) {
                ids.push(this.idService.cellId(this.logicalRowIndex, cellIndex));
            }
            return ids.join(' ');
        },
        enumerable: true,
        configurable: true
    });
    LogicalRowDirective.prototype.ngOnChanges = function (changes) {
        if (!this.navigation.enabled || this.logicalSlaveRow) {
            return;
        }
        var indexChange = changes.logicalRowIndex;
        var logicalSlaveRowChange = changes.logicalSlaveRow;
        if (indexChange || logicalSlaveRowChange) {
            var index = indexChange && !indexChange.isFirstChange() ? indexChange.previousValue : this.logicalRowIndex;
            this.navigation.unregisterRow(index, this);
            this.navigation.registerRow(this);
        }
        else if (anyChanged(['dataRowIndex', 'dataItem'], changes)) {
            this.navigation.updateRow(this);
        }
    };
    LogicalRowDirective.prototype.ngOnDestroy = function () {
        this.navigation.unregisterRow(this.logicalRowIndex, this);
    };
    LogicalRowDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoGridLogicalRow]'
                },] },
    ];
    /** @nocollapse */
    LogicalRowDirective.ctorParameters = function () { return [
        { type: IdService },
        { type: NavigationService }
    ]; };
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
    return LogicalRowDirective;
}());

/* tslint:disable:pipe-naming */
var FORMAT_REGEX = /\{\d+:?/;
/**
 * @hidden
 */
var FieldAccessorPipe = /** @class */ (function () {
    function FieldAccessorPipe(intlService) {
        this.intlService = intlService;
    }
    FieldAccessorPipe.prototype.transform = function (dataItem, fieldName, format) {
        if (!isNullOrEmptyString(fieldName)) {
            var value = getter(fieldName)(dataItem);
            if (!isNullOrEmptyString(format)) {
                return this.formatValue(format, value);
            }
            return value;
        }
        return dataItem;
    };
    FieldAccessorPipe.prototype.formatValue = function (format, value) {
        var intl = this.intlService;
        if (isString(format) && format.match(FORMAT_REGEX)) {
            return intl.format(format, value);
        }
        return intl.toString(value, format);
    };
    FieldAccessorPipe.decorators = [
        { type: Pipe, args: [{
                    name: 'valueOf',
                    pure: false
                },] },
    ];
    /** @nocollapse */
    FieldAccessorPipe.ctorParameters = function () { return [
        { type: IntlService }
    ]; };
    return FieldAccessorPipe;
}());

/**
 * @hidden
 */
var columnsToResize = function (_a) {
    var columns = _a.columns;
    return Math.max(1, resizableColumns(columns).length);
};
/**
 * @hidden
 */
var row = function (selector) { return function (element) { return element.querySelector(selector); }; };
/**
 * @hidden
 */
var headerRow = function (index) { return function (element) { return element.querySelectorAll('thead>tr')[index]; }; };
/**
 * @hidden
 */
var cell = function (index, selector) {
    if (selector === void 0) { selector = 'td'; }
    return function (element) {
        return element.querySelectorAll(selector + ":not(.k-group-cell):not(.k-hierarchy-cell)")[index];
    };
};
/**
 * @hidden
 */
var offsetWidth = function (element) { return element.offsetWidth; };
/**
 * @hidden
 */
var pipe = function () {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
    }
    return function (data) { return fns.reduce(function (state$$1, fn) { return state$$1 ? fn(state$$1) : 0; }, data); };
};
/**
 * @hidden
 */
var TableDirective = /** @class */ (function () {
    function TableDirective(element, renderer, service, zone, cdr) {
        this.element = element;
        this.renderer = renderer;
        this.service = service;
        this.zone = zone;
        this.cdr = cdr;
        this.locked = false;
        this.firstResize = false;
    }
    Object.defineProperty(TableDirective.prototype, "minWidth", {
        get: function () {
            return this.firstResize ? 0 : null;
        },
        enumerable: true,
        configurable: true
    });
    TableDirective.prototype.ngOnInit = function () {
        var _this = this;
        var obs = this.service
            .changes.pipe(filter(function (e) { return _this.locked === e.locked; }));
        this.subscription = obs.pipe(filter(function (e) { return e.type === 'start'; }), tap(this.initState.bind(this)), map(columnsToResize), switchMap(function (take$$1) {
            return obs.pipe(filter(function (e) { return e.type === 'resizeTable'; }), map(function (e) { return e.delta; }), bufferCount(take$$1));
        })).subscribe(this.resize.bind(this));
        this.autoFitSubscription = this.service
            .registerTable({
            autoFit: this.autoFitObservable.bind(this),
            locked: this.locked
        });
    };
    TableDirective.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        if (this.autoFitSubscription) {
            this.autoFitSubscription();
            this.autoFitSubscription = null;
        }
    };
    TableDirective.prototype.initState = function () {
        this.firstResize = true;
        if (!this.virtualColumns || this.locked) {
            this.originalWidth = offsetWidth(this.element.nativeElement);
        }
    };
    TableDirective.prototype.resize = function (deltas) {
        if (!this.virtualColumns || this.locked) {
            var delta = deltas.reduce(function (sum, item) { return sum + item; }, 0);
            var width = this.originalWidth + delta;
            this.renderer.setStyle(this.element.nativeElement, 'width', width + 'px');
        }
        this.cdr.detectChanges();
    };
    TableDirective.prototype.autoFitObservable = function (columnInfo) {
        var _this = this;
        return Observable.create(function (observer) {
            _this.zone.runOutsideAngular(function () {
                _this.renderer.addClass(_this.element.nativeElement, 'k-autofitting');
                _this.cdr.detectChanges();
                var widths = columnInfo.map(_this.measureColumn.bind(_this));
                _this.renderer.removeClass(_this.element.nativeElement, 'k-autofitting');
                observer.next(widths);
            });
        });
    };
    TableDirective.prototype.measureColumn = function (info) {
        var dom = this.element.nativeElement;
        var header = pipe(headerRow(info.level), cell(info.headerIndex, 'th'), offsetWidth)(dom);
        var data = 0;
        if (!info.isParentSpan || (info.isParentSpan && info.isLastInSpan)) {
            data = pipe(row('tbody>tr:not(.k-grouping-row):not(.k-grid-norecords)'), cell(info.index), offsetWidth)(dom);
        }
        var footer = pipe(row('tfoot>tr'), cell(info.index), offsetWidth)(dom);
        return Math.max(header, data, footer);
    };
    TableDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'table' // tslint:disable-line:directive-selector
                },] },
    ];
    /** @nocollapse */
    TableDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: ColumnResizingService },
        { type: NgZone },
        { type: ChangeDetectorRef }
    ]; };
    TableDirective.propDecorators = {
        locked: [{ type: Input }],
        virtualColumns: [{ type: Input }],
        minWidth: [{ type: HostBinding, args: ['style.min-width',] }]
    };
    return TableDirective;
}());

var exportedModules = [
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
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule.exports = function () {
        return [
            ColumnComponent,
            SpanColumnComponent,
            ColumnGroupComponent,
            FooterTemplateDirective,
            DetailTemplateDirective,
            FocusableDirective
        ];
    };
    SharedModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [exportedModules],
                    exports: [exportedModules, DraggableModule, EventsModule],
                    imports: [CommonModule]
                },] },
    ];
    return SharedModule;
}());

/**
 * Represents the `Contains` (**Contains**) filter operator.
 *
 * For more information and examples, refer to:
 * * [Setting the default filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-default-filter-operator)
 * * [Setting the order of the filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-order-of-the-filter-operators)
 */
var ContainsFilterOperatorComponent = /** @class */ (function (_super) {
    __extends(ContainsFilterOperatorComponent, _super);
    function ContainsFilterOperatorComponent(localization) {
        return _super.call(this, "contains", localization) || this;
    }
    ContainsFilterOperatorComponent.decorators = [
        { type: Component, args: [{
                    providers: [
                        {
                            provide: FilterOperatorBase,
                            useExisting: forwardRef(function () { return ContainsFilterOperatorComponent; })
                        }
                    ],
                    selector: 'kendo-filter-contains-operator',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    ContainsFilterOperatorComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    return ContainsFilterOperatorComponent;
}(FilterOperatorBase));

/**
 * Represents the `DoesNotContain` (**Does not contain**) filter operator.
 *
 * For more information and examples, refer to:
 * * [Setting the default filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-default-filter-operator)
 * * [Setting the order of the filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-order-of-the-filter-operators)
 */
var DoesNotContainFilterOperatorComponent = /** @class */ (function (_super) {
    __extends(DoesNotContainFilterOperatorComponent, _super);
    function DoesNotContainFilterOperatorComponent(localization) {
        return _super.call(this, "doesnotcontain", localization) || this;
    }
    DoesNotContainFilterOperatorComponent.decorators = [
        { type: Component, args: [{
                    providers: [
                        {
                            provide: FilterOperatorBase,
                            useExisting: forwardRef(function () { return DoesNotContainFilterOperatorComponent; })
                        }
                    ],
                    selector: 'kendo-filter-not-contains-operator',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    DoesNotContainFilterOperatorComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    return DoesNotContainFilterOperatorComponent;
}(FilterOperatorBase));

/**
 * Represents the `EndsWith` (**Ends with**) string filter operator.
 *
 * For more information and examples, refer to:
 * * [Setting the default filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-default-filter-operator)
 * * [Setting the order of the filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-order-of-the-filter-operators)
 */
var EndsWithFilterOperatorComponent = /** @class */ (function (_super) {
    __extends(EndsWithFilterOperatorComponent, _super);
    function EndsWithFilterOperatorComponent(localization) {
        return _super.call(this, "endswith", localization) || this;
    }
    EndsWithFilterOperatorComponent.decorators = [
        { type: Component, args: [{
                    providers: [
                        {
                            provide: FilterOperatorBase,
                            useExisting: forwardRef(function () { return EndsWithFilterOperatorComponent; })
                        }
                    ],
                    selector: 'kendo-filter-endswith-operator',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    EndsWithFilterOperatorComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    return EndsWithFilterOperatorComponent;
}(FilterOperatorBase));

/**
 * Represents the `Equal` (**Is equal to**) filter operator.
 *
 * For more information and examples, refer to:
 * * [Setting the default filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-default-filter-operator)
 * * [Setting the order of the filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-order-of-the-filter-operators)
 */
var EqualFilterOperatorComponent = /** @class */ (function (_super) {
    __extends(EqualFilterOperatorComponent, _super);
    function EqualFilterOperatorComponent(localization) {
        return _super.call(this, "eq", localization) || this;
    }
    EqualFilterOperatorComponent.decorators = [
        { type: Component, args: [{
                    providers: [
                        {
                            provide: FilterOperatorBase,
                            useExisting: forwardRef(function () { return EqualFilterOperatorComponent; })
                        }
                    ],
                    selector: 'kendo-filter-eq-operator',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    EqualFilterOperatorComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    return EqualFilterOperatorComponent;
}(FilterOperatorBase));

/**
 * Represents the `IsEmpty` (**Is empty**) filter operator.
 *
 * For more information and examples, refer to:
 * * [Setting the default filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-default-filter-operator)
 * * [Setting the order of the filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-order-of-the-filter-operators)
 */
var IsEmptyFilterOperatorComponent = /** @class */ (function (_super) {
    __extends(IsEmptyFilterOperatorComponent, _super);
    function IsEmptyFilterOperatorComponent(localization) {
        return _super.call(this, "isempty", localization) || this;
    }
    IsEmptyFilterOperatorComponent.decorators = [
        { type: Component, args: [{
                    providers: [
                        {
                            provide: FilterOperatorBase,
                            useExisting: forwardRef(function () { return IsEmptyFilterOperatorComponent; })
                        }
                    ],
                    selector: 'kendo-filter-isempty-operator',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    IsEmptyFilterOperatorComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    return IsEmptyFilterOperatorComponent;
}(FilterOperatorBase));

/**
 * Represents the `IsNotEmpty` (**Is not empty**) filter operator.
 *
 * For more information and examples, refer to:
 * * [Setting the default filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-default-filter-operator)
 * * [Setting the order of the filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-order-of-the-filter-operators)
 */
var IsNotEmptyFilterOperatorComponent = /** @class */ (function (_super) {
    __extends(IsNotEmptyFilterOperatorComponent, _super);
    function IsNotEmptyFilterOperatorComponent(localization) {
        return _super.call(this, "isnotempty", localization) || this;
    }
    IsNotEmptyFilterOperatorComponent.decorators = [
        { type: Component, args: [{
                    providers: [
                        {
                            provide: FilterOperatorBase,
                            useExisting: forwardRef(function () { return IsNotEmptyFilterOperatorComponent; })
                        }
                    ],
                    selector: 'kendo-filter-isnotempty-operator',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    IsNotEmptyFilterOperatorComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    return IsNotEmptyFilterOperatorComponent;
}(FilterOperatorBase));

/**
 * Represents the `IsNotNull` (**Is not null**) filter operator.
 *
 * For more information and examples, refer to:
 * * [Setting the default filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-default-filter-operator)
 * * [Setting the order of the filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-order-of-the-filter-operators)
 */
var IsNotNullFilterOperatorComponent = /** @class */ (function (_super) {
    __extends(IsNotNullFilterOperatorComponent, _super);
    function IsNotNullFilterOperatorComponent(localization) {
        return _super.call(this, "isnotnull", localization) || this;
    }
    IsNotNullFilterOperatorComponent.decorators = [
        { type: Component, args: [{
                    providers: [
                        {
                            provide: FilterOperatorBase,
                            useExisting: forwardRef(function () { return IsNotNullFilterOperatorComponent; })
                        }
                    ],
                    selector: 'kendo-filter-isnotnull-operator',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    IsNotNullFilterOperatorComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    return IsNotNullFilterOperatorComponent;
}(FilterOperatorBase));

/**
 * Represents the `IsNull` (**Is null**) filter operator.
 *
 * For more information and examples, refer to:
 * * [Setting the default filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-default-filter-operator)
 * * [Setting the order of the filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-order-of-the-filter-operators)
 */
var IsNullFilterOperatorComponent = /** @class */ (function (_super) {
    __extends(IsNullFilterOperatorComponent, _super);
    function IsNullFilterOperatorComponent(localization) {
        return _super.call(this, "isnull", localization) || this;
    }
    IsNullFilterOperatorComponent.decorators = [
        { type: Component, args: [{
                    providers: [
                        {
                            provide: FilterOperatorBase,
                            useExisting: forwardRef(function () { return IsNullFilterOperatorComponent; })
                        }
                    ],
                    selector: 'kendo-filter-isnull-operator',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    IsNullFilterOperatorComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    return IsNullFilterOperatorComponent;
}(FilterOperatorBase));

/**
 * Represents the `NotEqual` (**Is not equal to**) filter operator.
 *
 * For more information and examples, refer to:
 * * [Setting the default filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-default-filter-operator)
 * * [Setting the order of the filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-order-of-the-filter-operators)
 */
var NotEqualFilterOperatorComponent = /** @class */ (function (_super) {
    __extends(NotEqualFilterOperatorComponent, _super);
    function NotEqualFilterOperatorComponent(localization) {
        return _super.call(this, "neq", localization) || this;
    }
    NotEqualFilterOperatorComponent.decorators = [
        { type: Component, args: [{
                    providers: [
                        {
                            provide: FilterOperatorBase,
                            useExisting: forwardRef(function () { return NotEqualFilterOperatorComponent; })
                        }
                    ],
                    selector: 'kendo-filter-neq-operator',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    NotEqualFilterOperatorComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    return NotEqualFilterOperatorComponent;
}(FilterOperatorBase));

/**
 * Represents the `StartsWith` (**Starts with**) filter operator.
 *
 * For more information and examples, refer to:
 * * [Setting the default filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-default-filter-operator)
 * * [Setting the order of the filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-order-of-the-filter-operators)
 */
var StartsWithFilterOperatorComponent = /** @class */ (function (_super) {
    __extends(StartsWithFilterOperatorComponent, _super);
    function StartsWithFilterOperatorComponent(localization) {
        return _super.call(this, "startswith", localization) || this;
    }
    StartsWithFilterOperatorComponent.decorators = [
        { type: Component, args: [{
                    providers: [
                        {
                            provide: FilterOperatorBase,
                            useExisting: forwardRef(function () { return StartsWithFilterOperatorComponent; })
                        }
                    ],
                    selector: 'kendo-filter-startswith-operator',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    StartsWithFilterOperatorComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    return StartsWithFilterOperatorComponent;
}(FilterOperatorBase));

/*
 * Represents the `Greater` (**Is greater than**) numeric filter operator.
 *
 * For more information and examples, refer to:
 * * [Setting the default filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-default-filter-operator)
 * * [Setting the order of the filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-order-of-the-filter-operators)
 */
var GreaterFilterOperatorComponent = /** @class */ (function (_super) {
    __extends(GreaterFilterOperatorComponent, _super);
    function GreaterFilterOperatorComponent(localization) {
        return _super.call(this, "gt", localization) || this;
    }
    GreaterFilterOperatorComponent.decorators = [
        { type: Component, args: [{
                    providers: [
                        {
                            provide: FilterOperatorBase,
                            useExisting: forwardRef(function () { return GreaterFilterOperatorComponent; })
                        }
                    ],
                    selector: 'kendo-filter-gt-operator',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    GreaterFilterOperatorComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    return GreaterFilterOperatorComponent;
}(FilterOperatorBase));

/**
 * Represents the `GreaterOrEqualTo` (**Is greater than or equal to**) numeric filter operator.
 *
 * For more information and examples, refer to:
 * * [Setting the default filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-default-filter-operator)
 * * [Setting the order of the filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-order-of-the-filter-operators)
 */
var GreaterOrEqualToFilterOperatorComponent = /** @class */ (function (_super) {
    __extends(GreaterOrEqualToFilterOperatorComponent, _super);
    function GreaterOrEqualToFilterOperatorComponent(localization) {
        return _super.call(this, "gte", localization) || this;
    }
    GreaterOrEqualToFilterOperatorComponent.decorators = [
        { type: Component, args: [{
                    providers: [
                        {
                            provide: FilterOperatorBase,
                            useExisting: forwardRef(function () { return GreaterOrEqualToFilterOperatorComponent; })
                        }
                    ],
                    selector: 'kendo-filter-gte-operator',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    GreaterOrEqualToFilterOperatorComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    return GreaterOrEqualToFilterOperatorComponent;
}(FilterOperatorBase));

/*
 * Represents the `Less` (**Is less than**) numeric filter operator.
 *
 * For more information and examples, refer to:
 * * [Setting the default filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-default-filter-operator)
 * * [Setting the order of the filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-order-of-the-filter-operators)
 */
var LessFilterOperatorComponent = /** @class */ (function (_super) {
    __extends(LessFilterOperatorComponent, _super);
    function LessFilterOperatorComponent(localization) {
        return _super.call(this, "lt", localization) || this;
    }
    LessFilterOperatorComponent.decorators = [
        { type: Component, args: [{
                    providers: [
                        {
                            provide: FilterOperatorBase,
                            useExisting: forwardRef(function () { return LessFilterOperatorComponent; })
                        }
                    ],
                    selector: 'kendo-filter-lt-operator',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    LessFilterOperatorComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    return LessFilterOperatorComponent;
}(FilterOperatorBase));

/*
 * Represents the `LessOrEqualTo` (**Is less than or equal to**) numeric filter operator.
 *
 * For more information and examples, refer to:
 * * [Setting the default filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-default-filter-operator)
 * * [Setting the order of the filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-order-of-the-filter-operators)
 */
var LessOrEqualToFilterOperatorComponent = /** @class */ (function (_super) {
    __extends(LessOrEqualToFilterOperatorComponent, _super);
    function LessOrEqualToFilterOperatorComponent(localization) {
        return _super.call(this, "lte", localization) || this;
    }
    LessOrEqualToFilterOperatorComponent.decorators = [
        { type: Component, args: [{
                    providers: [
                        {
                            provide: FilterOperatorBase,
                            useExisting: forwardRef(function () { return LessOrEqualToFilterOperatorComponent; })
                        }
                    ],
                    selector: 'kendo-filter-lte-operator',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    LessOrEqualToFilterOperatorComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    return LessOrEqualToFilterOperatorComponent;
}(FilterOperatorBase));

/*
 * Represents the `Greater` (**Is after**) date filter operator.
 *
 * For more information and examples, refer to:
 * * [Setting the default filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-default-filter-operator)
 * * [Setting the order of the filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-order-of-the-filter-operators)
 */
var AfterFilterOperatorComponent = /** @class */ (function (_super) {
    __extends(AfterFilterOperatorComponent, _super);
    function AfterFilterOperatorComponent(localization) {
        return _super.call(this, "after", localization) || this;
    }
    /**
     * @hidden
     */
    AfterFilterOperatorComponent.prototype.toJSON = function () {
        return {
            text: this.text,
            value: "gt"
        };
    };
    AfterFilterOperatorComponent.decorators = [
        { type: Component, args: [{
                    providers: [
                        {
                            provide: FilterOperatorBase,
                            useExisting: forwardRef(function () { return AfterFilterOperatorComponent; })
                        }
                    ],
                    selector: 'kendo-filter-after-operator',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    AfterFilterOperatorComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    return AfterFilterOperatorComponent;
}(FilterOperatorBase));

/*
 * Represents the `GreaterOrEqualTo` (**Is after or equal to**) date filter operator.
 *
 * For more information and examples, refer to:
 * * [Setting the default filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-default-filter-operator)
 * * [Setting the order of the filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-order-of-the-filter-operators)
 */
var AfterEqFilterOperatorComponent = /** @class */ (function (_super) {
    __extends(AfterEqFilterOperatorComponent, _super);
    function AfterEqFilterOperatorComponent(localization) {
        return _super.call(this, "after-eq", localization) || this;
    }
    /**
     * @hidden
     */
    AfterEqFilterOperatorComponent.prototype.toJSON = function () {
        return {
            text: this.text,
            value: "gte"
        };
    };
    AfterEqFilterOperatorComponent.decorators = [
        { type: Component, args: [{
                    providers: [
                        {
                            provide: FilterOperatorBase,
                            useExisting: forwardRef(function () { return AfterEqFilterOperatorComponent; })
                        }
                    ],
                    selector: 'kendo-filter-after-eq-operator',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    AfterEqFilterOperatorComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    return AfterEqFilterOperatorComponent;
}(FilterOperatorBase));

/*
 * Represents the `LessOrEqualTo` (**Is before or equal to**) date filter operator.
 *
 * For more information and examples, refer to:
 * * [Setting the default filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-default-filter-operator)
 * * [Setting the order of the filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-order-of-the-filter-operators)
 */
var BeforeEqFilterOperatorComponent = /** @class */ (function (_super) {
    __extends(BeforeEqFilterOperatorComponent, _super);
    function BeforeEqFilterOperatorComponent(localization) {
        return _super.call(this, "before-eq", localization) || this;
    }
    /**
     * @hidden
     */
    BeforeEqFilterOperatorComponent.prototype.toJSON = function () {
        return {
            text: this.text,
            value: "lte"
        };
    };
    BeforeEqFilterOperatorComponent.decorators = [
        { type: Component, args: [{
                    providers: [
                        {
                            provide: FilterOperatorBase,
                            useExisting: forwardRef(function () { return BeforeEqFilterOperatorComponent; })
                        }
                    ],
                    selector: 'kendo-filter-before-eq-operator',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    BeforeEqFilterOperatorComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    return BeforeEqFilterOperatorComponent;
}(FilterOperatorBase));

/*
 * Represents the `Less then` (**Is before**) date filter operator.
 *
 * For more information and examples, refer to:
 * * [Setting the default filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-default-filter-operator)
 * * [Setting the order of the filter operators]({% slug builtinfiltertemplate_grid %}#toc-setting-the-order-of-the-filter-operators)
 */
var BeforeFilterOperatorComponent = /** @class */ (function (_super) {
    __extends(BeforeFilterOperatorComponent, _super);
    function BeforeFilterOperatorComponent(localization) {
        return _super.call(this, "before", localization) || this;
    }
    /**
     * @hidden
     */
    BeforeFilterOperatorComponent.prototype.toJSON = function () {
        return {
            text: this.text,
            value: "lt"
        };
    };
    BeforeFilterOperatorComponent.decorators = [
        { type: Component, args: [{
                    providers: [
                        {
                            provide: FilterOperatorBase,
                            useExisting: forwardRef(function () { return BeforeFilterOperatorComponent; })
                        }
                    ],
                    selector: 'kendo-filter-before-operator',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    BeforeFilterOperatorComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    return BeforeFilterOperatorComponent;
}(FilterOperatorBase));

var FILTER_OPERATORS = [
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
var importedModules = [
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
var COMPONENTS = [
    FilterInputDirective
];
/**
 * @hidden
 */
var SharedFilterModule = /** @class */ (function () {
    function SharedFilterModule() {
    }
    SharedFilterModule.exports = function () {
        return FILTER_OPERATORS.slice();
    };
    SharedFilterModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [FILTER_OPERATORS, COMPONENTS],
                    exports: [FILTER_OPERATORS, importedModules, COMPONENTS],
                    imports: importedModules.slice()
                },] },
    ];
    return SharedFilterModule;
}());

/**
 * @hidden
 */
var FilterHostDirective = /** @class */ (function () {
    function FilterHostDirective(host, resolver) {
        this.host = host;
        this.resolver = resolver;
    }
    FilterHostDirective.prototype.ngOnInit = function () {
        this.component = this.host.createComponent(this.resolver.resolveComponentFactory(this.componentType()));
        this.initComponent({
            column: this.column,
            filter: this.filter
        });
    };
    FilterHostDirective.prototype.ngOnDestroy = function () {
        if (this.component) {
            this.component.destroy();
            this.component = null;
        }
    };
    FilterHostDirective.prototype.ngOnChanges = function (changes) {
        if (anyChanged(["column", "filter"], changes)) {
            this.initComponent({
                column: this.column,
                filter: this.filter
            });
        }
    };
    FilterHostDirective.prototype.initComponent = function (_a) {
        var column = _a.column, filter$$1 = _a.filter;
        var instance = this.component.instance;
        instance.column = column;
        instance.filter = filter$$1;
    };
    FilterHostDirective.propDecorators = {
        column: [{ type: Input }],
        filter: [{ type: Input }]
    };
    return FilterHostDirective;
}());

/**
 * @hidden
 *
 * > List the following components in the GridModule as `entryComponents`.
 */
var filterComponentFactory = function (type) { return ({
    "boolean": BooleanFilterCellComponent,
    "date": DateFilterCellComponent,
    "numeric": NumericFilterCellComponent,
    "text": StringFilterCellComponent
}[type]); };

/**
 * @hidden
 */
var FilterCellHostDirective = /** @class */ (function (_super) {
    __extends(FilterCellHostDirective, _super);
    function FilterCellHostDirective(host, resolver) {
        return _super.call(this, host, resolver) || this;
    }
    FilterCellHostDirective.prototype.componentType = function () {
        if (!isNullOrEmptyString(this.column.filter)) {
            return filterComponentFactory(this.column.filter);
        }
        return StringFilterCellComponent;
    };
    FilterCellHostDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoFilterCellHost]'
                },] },
    ];
    /** @nocollapse */
    FilterCellHostDirective.ctorParameters = function () { return [
        { type: ViewContainerRef },
        { type: ComponentFactoryResolver }
    ]; };
    return FilterCellHostDirective;
}(FilterHostDirective));

var INTERNAL_COMPONENTS = [
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
var ENTRY_COMPONENTS = [
    StringFilterCellComponent,
    NumericFilterCellComponent,
    BooleanFilterCellComponent,
    DateFilterCellComponent
];
/**
 * @hidden
 */
var RowFilterModule = /** @class */ (function () {
    function RowFilterModule() {
    }
    RowFilterModule.exports = function () {
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
    };
    RowFilterModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [INTERNAL_COMPONENTS],
                    entryComponents: ENTRY_COMPONENTS,
                    exports: [INTERNAL_COMPONENTS, SharedFilterModule],
                    imports: [SharedFilterModule]
                },] },
    ];
    return RowFilterModule;
}());

/**
 * @hidden
 */
var normalizeSettings = function (_a) {
    var _b = _a.buttonCount, buttonCount = _b === void 0 ? 10 : _b, _c = _a.info, info = _c === void 0 ? true : _c, _d = _a.type, type = _d === void 0 ? 'numeric' : _d, _e = _a.pageSizes, pageSizes = _e === void 0 ? false : _e, _f = _a.previousNext, previousNext = _f === void 0 ? true : _f;
    return ({
        buttonCount: buttonCount,
        info: info,
        pageSizes: pageSizes === true ? [5, 10, 20] : pageSizes,
        previousNext: previousNext,
        type: type
    });
};
/**
 * @hidden
 */
var normalize = function (settings) {
    return normalizeSettings(settings === true ? {} : settings);
};

/**
 * @hidden
 */
var PagerComponent = /** @class */ (function () {
    function PagerComponent(pagerContext) {
        this.pagerContext = pagerContext;
        this.total = 0;
        this.skip = 1;
        this.pageChange = new EventEmitter();
        this.settings = normalize({});
        this._templateContext = {};
    }
    Object.defineProperty(PagerComponent.prototype, "options", {
        set: function (value) {
            this.settings = normalize(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PagerComponent.prototype, "pagerWrapClass", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PagerComponent.prototype, "gridPagerClass", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PagerComponent.prototype, "widgetClass", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PagerComponent.prototype, "totalPages", {
        get: function () {
            return Math.ceil((this.total || 0) / this.pageSize);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PagerComponent.prototype, "currentPage", {
        get: function () {
            return Math.floor((this.skip || 0) / this.pageSize) + 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PagerComponent.prototype, "templateContext", {
        get: function () {
            var context = this._templateContext;
            context.totalPages = this.totalPages;
            context.total = this.total;
            context.skip = this.skip;
            context.pageSize = this.pageSize;
            context.currentPage = this.currentPage;
            return context;
        },
        enumerable: true,
        configurable: true
    });
    PagerComponent.prototype.ngOnInit = function () {
        this.pageChangeSubscription = this.pagerContext.pageChange.subscribe(this.changePage.bind(this));
    };
    PagerComponent.prototype.ngOnChanges = function (changes) {
        if (anyChanged(['pageSize', 'skip', 'total'], changes, false)) {
            this.pagerContext.notifyChanges({
                pageSize: this.pageSize,
                skip: this.skip,
                total: this.total
            });
        }
    };
    PagerComponent.prototype.ngOnDestroy = function () {
        if (this.pageChangeSubscription) {
            this.pageChangeSubscription.unsubscribe();
        }
    };
    PagerComponent.prototype.changePage = function (event) {
        this.pageChange.emit(event);
    };
    PagerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-pager',
                    template: "\n        <ng-container\n            *ngIf=\"template?.templateRef\"\n            [ngTemplateOutlet]=\"template.templateRef\"\n            [ngTemplateOutletContext]=\"templateContext\">\n        </ng-container>\n        <ng-container *ngIf=\"!template?.templateRef\">\n            <kendo-pager-prev-buttons *ngIf=\"settings.previousNext\"></kendo-pager-prev-buttons>\n            <kendo-pager-numeric-buttons\n                *ngIf=\"settings.type === 'numeric'\"\n                [buttonCount]=\"settings.buttonCount\">\n            </kendo-pager-numeric-buttons>\n            <kendo-pager-input *ngIf=\"settings.type === 'input'\"></kendo-pager-input>\n            <kendo-pager-next-buttons *ngIf=\"settings.previousNext\"></kendo-pager-next-buttons>\n            <kendo-pager-info *ngIf='settings.info'></kendo-pager-info>\n            <kendo-pager-page-sizes *ngIf=\"settings.pageSizes\" [pageSizes]=\"settings.pageSizes\"></kendo-pager-page-sizes>\n        </ng-container>\n  "
                },] },
    ];
    /** @nocollapse */
    PagerComponent.ctorParameters = function () { return [
        { type: PagerContextService }
    ]; };
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
    return PagerComponent;
}());

/**
 * @hidden
 */
var PagerElementComponent = /** @class */ (function () {
    function PagerElementComponent(localization, pagerContext, cd) {
        this.localization = localization;
        this.pagerContext = pagerContext;
        this.cd = cd;
        this.total = this.pagerContext.total;
        this.skip = this.pagerContext.skip;
        this.pageSize = this.pagerContext.pageSize;
    }
    Object.defineProperty(PagerElementComponent.prototype, "currentPage", {
        /**
         * @hidden
         *
         * @readonly
         * @type {number}
         * @memberOf PagerElementComponent
         */
        get: function () {
            return Math.floor((this.skip || 0) / this.pageSize) + 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PagerElementComponent.prototype, "totalPages", {
        /**
         * @hidden
         *
         * @readonly
         * @type {number}
         * @memberOf PagerElementComponent
         */
        get: function () {
            return Math.ceil((this.total || 0) / this.pageSize);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     *
     * @param {string} key
     * @returns {string}
     *
     * @memberOf PagerElementComponent
     */
    PagerElementComponent.prototype.textFor = function (key) {
        return this.localization.get(key);
    };
    /**
     * @hidden
     *
     * @param {number} page
     *
     * @memberOf PagerElementComponent
     */
    PagerElementComponent.prototype.changePage = function (page) {
        this.pagerContext.changePage(page);
        return false;
    };
    /**
     * @hidden
     *
     * @memberOf PagerElementComponent
     */
    PagerElementComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscriptions = this.pagerContext.changes.subscribe(this.onChanges.bind(this));
        this.subscriptions.add(this.localization.changes.subscribe(function () { return _this.cd.markForCheck(); }));
    };
    PagerElementComponent.prototype.ngOnDestroy = function () {
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
        }
    };
    return PagerElementComponent;
}());

/**
 * Displays buttons for navigating to the first and to the previous page ([see example]({% slug paging_grid %}#toc-pager-templates)).
 */
var PagerPrevButtonsComponent = /** @class */ (function (_super) {
    __extends(PagerPrevButtonsComponent, _super);
    function PagerPrevButtonsComponent(localization, pagerContext, cd) {
        return _super.call(this, localization, pagerContext, cd) || this;
    }
    Object.defineProperty(PagerPrevButtonsComponent.prototype, "disabled", {
        /**
         * @hidden
         *
         * @readonly
         * @type {boolean}
         * @memberOf PagerPrevButtonsComponent
         */
        get: function () {
            return this.currentPage === 1 || !this.total;
        },
        enumerable: true,
        configurable: true
    });
    PagerPrevButtonsComponent.prototype.onChanges = function (_a) {
        var total = _a.total, skip = _a.skip, pageSize = _a.pageSize;
        this.total = total;
        this.skip = skip;
        this.pageSize = pageSize;
        this.cd.markForCheck();
    };
    PagerPrevButtonsComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-pager-prev-buttons',
                    template: "\n        <a  href=\"#\"\n            tabindex=\"-1\"\n            [title]=\"textFor('pagerFirstPage')\"\n            (click)=\"currentPage !== 1 ? changePage(0) : false\"\n            [ngClass]=\"{\n                'k-link': true,\n                'k-pager-nav': true,\n                'k-state-disabled': disabled,\n                'k-pager-first': true\n            }\">\n            <span [attr.aria-label]=\"textFor('pagerFirstPage')\"\n                [ngClass]=\"{\n                    'k-icon':true,\n                    'k-i-seek-w': true\n                }\">\n            </span>\n        </a>\n        <a  href=\"#\"\n            tabindex=\"-1\"\n            [title]=\"textFor('pagerPreviousPage')\"\n            (click)=\"currentPage !== 1 ? changePage(currentPage-2) : false\"\n            [ngClass]=\"{\n                'k-link': true,\n                'k-pager-nav': true,\n                'k-state-disabled': disabled,\n                '': true\n            }\">\n            <span [attr.aria-label]=\"textFor('pagerPreviousPage')\"\n                [ngClass]=\"{\n                    'k-icon':true,\n                    'k-i-arrow-w': true\n                }\">\n            </span>\n        </a>\n    "
                },] },
    ];
    /** @nocollapse */
    PagerPrevButtonsComponent.ctorParameters = function () { return [
        { type: LocalizationService },
        { type: PagerContextService },
        { type: ChangeDetectorRef }
    ]; };
    return PagerPrevButtonsComponent;
}(PagerElementComponent));

/**
 * Displays buttons for navigating to the next and to the last page ([see example]({% slug paging_grid %}#toc-pager-template)).
 */
var PagerNextButtonsComponent = /** @class */ (function (_super) {
    __extends(PagerNextButtonsComponent, _super);
    function PagerNextButtonsComponent(localization, pagerContext, cd) {
        return _super.call(this, localization, pagerContext, cd) || this;
    }
    Object.defineProperty(PagerNextButtonsComponent.prototype, "disabled", {
        /**
         * @hidden
         *
         * @readonly
         * @type {boolean}
         * @memberOf PagerNextButtonsComponent
         */
        get: function () {
            return this.currentPage === this.totalPages || !this.total;
        },
        enumerable: true,
        configurable: true
    });
    PagerNextButtonsComponent.prototype.onChanges = function (_a) {
        var total = _a.total, skip = _a.skip, pageSize = _a.pageSize;
        this.total = total;
        this.skip = skip;
        this.pageSize = pageSize;
        this.cd.markForCheck();
    };
    PagerNextButtonsComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-pager-next-buttons',
                    template: "\n        <a  href=\"#\"\n            tabindex=\"-1\"\n            [title]=\"textFor('pagerNextPage')\"\n            (click)=\"currentPage !== totalPages ? changePage(currentPage) : false\"\n            [ngClass]=\"{\n                'k-link': true,\n                'k-pager-nav': true,\n                'k-state-disabled': disabled,\n                '': true\n            }\">\n            <span [attr.aria-label]=\"textFor('pagerNextPage')\"\n                [ngClass]=\"{\n                    'k-icon':true,\n                    'k-i-arrow-e': true\n                }\">\n            </span>\n        </a>\n        <a  href=\"#\"\n            tabindex=\"-1\"\n            [title]=\"textFor('pagerLastPage')\"\n            (click)=\"currentPage !== totalPages ? changePage(totalPages-1) : false\"\n            [ngClass]=\"{\n                'k-link': true,\n                'k-pager-nav': true,\n                'k-state-disabled': disabled,\n                'k-pager-last': true\n            }\">\n            <span [attr.aria-label]=\"textFor('pagerLastPage')\"\n                [ngClass]=\"{\n                    'k-icon':true,\n                    'k-i-seek-e': true\n                }\">\n            </span>\n        </a>\n    "
                },] },
    ];
    /** @nocollapse */
    PagerNextButtonsComponent.ctorParameters = function () { return [
        { type: LocalizationService },
        { type: PagerContextService },
        { type: ChangeDetectorRef }
    ]; };
    return PagerNextButtonsComponent;
}(PagerElementComponent));

/**
 * Displays numeric buttons to enable navigation between the pages.
 */
var PagerNumericButtonsComponent = /** @class */ (function (_super) {
    __extends(PagerNumericButtonsComponent, _super);
    function PagerNumericButtonsComponent(localization, cd, pagerContext) {
        var _this = _super.call(this, localization, pagerContext, cd) || this;
        _this.pagerContext = pagerContext;
        return _this;
    }
    Object.defineProperty(PagerNumericButtonsComponent.prototype, "buttons", {
        /**
         * @hidden
         *
         * @readonly
         * @type {number[]}
         * @memberOf PagerNumericButtonsComponent
         */
        get: function () {
            var result = [];
            for (var idx = this.start; idx <= this.end; idx++) {
                result.push(idx);
            }
            return result;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PagerNumericButtonsComponent.prototype, "end", {
        /**
         * @hidden
         */
        get: function () {
            return Math.min((this.start + this.buttonCount) - 1, this.totalPages);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PagerNumericButtonsComponent.prototype, "start", {
        /**
         * @hidden
         */
        get: function () {
            var page = this.currentPage;
            var buttonCount = this.buttonCount;
            if (page > buttonCount) {
                var reminder = (page % buttonCount);
                return (reminder === 0) ? (page - buttonCount) + 1 : (page - reminder) + 1;
            }
            return 1;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    PagerNumericButtonsComponent.prototype.pageLabel = function (num) {
        var pageText = this.textFor('pagerPage');
        if (pageText) {
            return pageText + ' ' + num;
        }
        return num.toString();
    };
    PagerNumericButtonsComponent.prototype.onChanges = function (_a) {
        var total = _a.total, skip = _a.skip, pageSize = _a.pageSize;
        this.total = total;
        this.skip = skip;
        this.pageSize = pageSize;
        this.cd.markForCheck();
    };
    PagerNumericButtonsComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-pager-numeric-buttons',
                    template: "\n       <ul [ngClass]=\"{'k-pager-numbers': true, 'k-reset': true}\">\n            <li *ngIf=\"start > 1\">\n                <a  class=\"k-link\"\n                    [attr.aria-label]=\"pageLabel(start - 1)\"\n                    href=\"#\"\n                    tabindex=\"-1\"\n                    (click)=\"changePage(start - 2)\">...</a>\n            </li>\n            <li *ngFor=\"let num of buttons\">\n                <a  href=\"#\"\n                    [attr.aria-label]=\"pageLabel(num)\"\n                    tabindex=\"-1\"\n                    [ngClass]=\"{'k-link': true, 'k-state-selected':currentPage == num}\"\n                    (click)=\"changePage(num - 1)\">\n                    {{num}}\n                </a>\n            </li>\n            <li *ngIf=\"end < totalPages\">\n                <a  class=\"k-link\"\n                    [attr.aria-label]=\"pageLabel(end + 1)\"\n                    href=\"#\"\n                    tabindex=\"-1\"\n                    (click)=\"changePage(end)\">...</a>\n            </li>\n        </ul>\n    "
                },] },
    ];
    /** @nocollapse */
    PagerNumericButtonsComponent.ctorParameters = function () { return [
        { type: LocalizationService },
        { type: ChangeDetectorRef },
        { type: PagerContextService }
    ]; };
    PagerNumericButtonsComponent.propDecorators = {
        buttonCount: [{ type: Input }]
    };
    return PagerNumericButtonsComponent;
}(PagerElementComponent));

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
var PagerInputComponent = /** @class */ (function (_super) {
    __extends(PagerInputComponent, _super);
    function PagerInputComponent(localization, pagerContext, zone, cd) {
        var _this = _super.call(this, localization, pagerContext, cd) || this;
        _this.pagerContext = pagerContext;
        _this.zone = zone;
        /**
         * @hidden
         *
         * @param {string} value
         *
         * @memberOf PagerInputComponent
         */
        _this.handleKeyDown = function (event) {
            var incomingValue = _this.numericInput.value || _this.current;
            if (event.keyCode === Keys.Enter) {
                event.preventDefault();
                if (incomingValue !== _this.current) {
                    _this.zone.run(function () {
                        _this.changePage(incomingValue - 1);
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
        _this.handleBlur = function () {
            var inputValue = _this.numericInput.value;
            if (!inputValue) {
                _this.numericInput.writeValue(_this.current);
                return;
            }
            if (inputValue !== _this.current) {
                _this.zone.run(function () {
                    _this.changePage(inputValue - 1);
                });
            }
        };
        return _this;
    }
    Object.defineProperty(PagerInputComponent.prototype, "current", {
        /**
         * @hidden
         */
        get: function () {
            return this.hasPages ? this.currentPage : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PagerInputComponent.prototype, "hasPages", {
        get: function () {
            return this.totalPages !== 0;
        },
        enumerable: true,
        configurable: true
    });
    PagerInputComponent.prototype.onChanges = function (_a) {
        var total = _a.total, skip = _a.skip, pageSize = _a.pageSize;
        this.total = total;
        this.skip = skip;
        this.pageSize = pageSize;
        this.cd.markForCheck();
    };
    PagerInputComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-pager-input',
                    template: "\n     <span [ngClass]=\"{'k-pager-input': true, 'k-label': true}\">\n        {{textFor('pagerPage')}}\n        <kendo-numerictextbox\n            [spinners]=\"false\"\n            [decimals]=\"0\"\n            format=\"n0\"\n            [disabled]=\"!hasPages\"\n            [value]=\"current\"\n            [min]=\"hasPages ? 1 : 0\"\n            [max]=\"totalPages\"\n            [autoCorrect]=\"true\"\n            [title]=\"textFor('pagerPageNumberInputTitle')\"\n            [kendoEventsOutsideAngular]=\"{\n                keydown: handleKeyDown,\n                focusout: handleBlur\n            }\"\n        >\n        </kendo-numerictextbox>\n        {{textFor('pagerOf')}} {{totalPages}}\n     </span>\n    "
                },] },
    ];
    /** @nocollapse */
    PagerInputComponent.ctorParameters = function () { return [
        { type: LocalizationService },
        { type: PagerContextService },
        { type: NgZone },
        { type: ChangeDetectorRef }
    ]; };
    PagerInputComponent.propDecorators = {
        numericInput: [{ type: ViewChild, args: [NumericTextBoxComponent,] }]
    };
    return PagerInputComponent;
}(PagerElementComponent));

/**
 * Displays information about the current page and the total number of records ([see example]({% slug paging_grid %}#toc-pager-templates)).
 */
var PagerInfoComponent = /** @class */ (function (_super) {
    __extends(PagerInfoComponent, _super);
    function PagerInfoComponent(localization, cd, pagerContext) {
        var _this = _super.call(this, localization, pagerContext, cd) || this;
        _this.pagerContext = pagerContext;
        return _this;
    }
    Object.defineProperty(PagerInfoComponent.prototype, "maxItems", {
        /**
         * @hidden
         *
         * @readonly
         * @type {number}
         * @memberOf PagerInfoComponent
         */
        get: function () {
            return Math.min(this.currentPage * this.pageSize, this.total);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PagerInfoComponent.prototype, "currentPageText", {
        /**
         * @hidden
         *
         * @readonly
         * @type {number}
         * @memberOf PagerInfoComponent
         */
        get: function () {
            return this.total ?
                (this.currentPage - 1) * this.pageSize + 1 :
                0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PagerInfoComponent.prototype, "classes", {
        /**
         * @hidden
         *
         * @readonly
         * @type {boolean}
         * @memberOf PagerInfoComponent
         */
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    PagerInfoComponent.prototype.onChanges = function (_a) {
        var total = _a.total, skip = _a.skip, pageSize = _a.pageSize;
        this.total = total;
        this.skip = skip;
        this.pageSize = pageSize;
        this.cd.markForCheck();
    };
    PagerInfoComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-pager-info',
                    template: "{{currentPageText}} - {{maxItems}} {{textFor('pagerOf')}} {{total}} {{textFor('pagerItems')}}"
                },] },
    ];
    /** @nocollapse */
    PagerInfoComponent.ctorParameters = function () { return [
        { type: LocalizationService },
        { type: ChangeDetectorRef },
        { type: PagerContextService }
    ]; };
    PagerInfoComponent.propDecorators = {
        classes: [{ type: HostBinding, args: ["class.k-pager-info",] }, { type: HostBinding, args: ["class.k-label",] }]
    };
    return PagerInfoComponent;
}(PagerElementComponent));

/**
 * Displays a drop-down list for the page size selection ([see example]({% slug paging_grid %}#toc-pager-templates)).
 */
var PagerPageSizesComponent = /** @class */ (function (_super) {
    __extends(PagerPageSizesComponent, _super);
    function PagerPageSizesComponent(localization, cd, pagerContext) {
        var _this = _super.call(this, localization, pagerContext, cd) || this;
        _this.pagerContext = pagerContext;
        _this._pageSizes = [];
        return _this;
    }
    Object.defineProperty(PagerPageSizesComponent.prototype, "pageSizes", {
        get: function () {
            return this._pageSizes;
        },
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
        set: function (pageSizes) {
            var normalizedItems = [];
            pageSizes.forEach(function (item) {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PagerPageSizesComponent.prototype, "classes", {
        /**
         * @hidden
         *
         * @readonly
         */
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PagerPageSizesComponent.prototype, "showInitialPageSize", {
        /**
         * @hidden
         *
         * @readonly
         */
        get: function () {
            var _this = this;
            return this.pageSizes
                .filter(function (item) {
                if (typeof item.value === 'number') {
                    return item.value === Number(_this.pageSize);
                }
                return _this.total === Number(_this.pageSize);
            })
                .length === 0;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    PagerPageSizesComponent.prototype.pageSizeChange = function (value) {
        this.pageSize = parseInt(value, 10);
        this.pagerContext.changePageSize(this.pageSize);
    };
    /**
     * @hidden
     */
    PagerPageSizesComponent.prototype.getValue = function (page) {
        return typeof page.value === 'number' ? page.value : this.total;
    };
    /**
     * @hidden
     */
    PagerPageSizesComponent.prototype.getSelectedState = function (page) {
        if (typeof page.value === 'number') {
            return page.value === this.pageSize ? true : undefined;
        }
        return this.pageSize === this.total;
    };
    PagerPageSizesComponent.prototype.onChanges = function (_a) {
        var total = _a.total, skip = _a.skip, pageSize = _a.pageSize;
        this.total = total;
        this.skip = skip;
        this.pageSize = typeof pageSize === 'number' ? pageSize : this.total;
        this.cd.markForCheck();
    };
    PagerPageSizesComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-pager-page-sizes',
                    template: "\n        <select #select\n            (change)=\"pageSizeChange(select.value)\"\n            [attr.aria-label]=\"textFor('pagerItemsPerPage')\">\n            <option *ngIf=\"showInitialPageSize\" [value]=\"pageSize\">{{pageSize}}</option>\n            <option *ngFor=\"let page of pageSizes\" [value]=\"getValue(page)\" [selected]=\"getSelectedState(page)\">\n                {{page['text']}}\n            </option>\n        </select>\n        {{ textFor('pagerItemsPerPage') }}\n    "
                },] },
    ];
    /** @nocollapse */
    PagerPageSizesComponent.ctorParameters = function () { return [
        { type: LocalizationService },
        { type: ChangeDetectorRef },
        { type: PagerContextService }
    ]; };
    PagerPageSizesComponent.propDecorators = {
        pageSizes: [{ type: Input }],
        classes: [{ type: HostBinding, args: ['class.k-pager-sizes',] }, { type: HostBinding, args: ['class.k-label',] }]
    };
    return PagerPageSizesComponent;
}(PagerElementComponent));

var importedModules$1 = [
    CommonModule,
    InputsModule,
    SharedModule
];
var INTERNAL_COMPONENTS$1 = [
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
var PagerModule = /** @class */ (function () {
    function PagerModule() {
    }
    PagerModule.exports = function () {
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
    };
    PagerModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [INTERNAL_COMPONENTS$1],
                    exports: [INTERNAL_COMPONENTS$1],
                    imports: importedModules$1.slice()
                },] },
    ];
    return PagerModule;
}());

/**
 * @hidden
 */
var GroupHeaderComponent = /** @class */ (function () {
    function GroupHeaderComponent(groupsService, groupInfoService) {
        this.groupsService = groupsService;
        this.groupInfoService = groupInfoService;
        this.skipGroupDecoration = false;
        this.hasDetails = false;
        this.totalColumnsCount = 0;
        this.groups = [];
        this.isExpanded = false;
    }
    Object.defineProperty(GroupHeaderComponent.prototype, "groupItemClass", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    GroupHeaderComponent.prototype.ngDoCheck = function () {
        this.isExpanded = this.groupsService.isExpanded(this.item.index);
    };
    GroupHeaderComponent.prototype.prefixGroupCell = function (item) {
        return new Array(item.level);
    };
    GroupHeaderComponent.prototype.toggleGroup = function (item) {
        this.groupsService.toggleRow(item.index, item.data);
        return false;
    };
    GroupHeaderComponent.prototype.groupSpan = function (item) {
        var groupCount = (this.groups || []).length;
        var detailOffset = this.hasDetails ? 1 : 0;
        if (this.hasGroupHeaderColumn) {
            return groupCount + 1 + detailOffset - item.level;
        }
        var columnCount = columnsSpan(this.columns);
        if (this.skipGroupDecoration) {
            return columnCount;
        }
        return groupCount + columnCount + detailOffset - item.level;
    };
    GroupHeaderComponent.prototype.logicalColSpan = function () {
        return this.skipGroupDecoration ? 1 : this.totalColumnsCount;
    };
    GroupHeaderComponent.prototype.ariaRole = function () {
        if (this.skipGroupDecoration) {
            return 'presentation';
        }
        return 'gridcell';
    };
    GroupHeaderComponent.prototype.formatForGroup = function (item) {
        return this.groupInfoService.formatForGroup(item);
    };
    GroupHeaderComponent.prototype.groupTitle = function (item) {
        return this.groupInfoService.groupTitle(item);
    };
    GroupHeaderComponent.prototype.groupHeaderTemplate = function (item) {
        return this.groupInfoService.groupHeaderTemplate(item);
    };
    GroupHeaderComponent.decorators = [
        { type: Component, args: [{
                    selector: '[kendoGridGroupHeader]',
                    template: "\n        <ng-template [ngIf]=\"!skipGroupDecoration\">\n            <td class=\"k-group-cell\"\n                role=\"presentation\"\n                *ngFor=\"let g of prefixGroupCell(item)\"></td>\n        </ng-template>\n        <td [attr.colspan]=\"groupSpan(item)\" *ngIf=\"!(skipGroupDecoration && hasGroupHeaderColumn)\"\n            [attr.role]=\"ariaRole()\"\n            aria-selected=\"false\"\n            [attr.aria-expanded]=\"isExpanded\"\n            kendoGridLogicalCell\n            [logicalRowIndex]=\"logicalRowIndex\"\n            [logicalColIndex]=\"0\"\n            [logicalSlaveCell]=\"skipGroupDecoration\"\n            [groupItem]=\"item\"\n            [colSpan]=\"logicalColSpan()\">\n            <p class=\"k-reset\">\n                <ng-template [ngIf]=\"!skipGroupDecoration\">\n                    <a href=\"#\" tabindex=\"-1\" (click)=\"toggleGroup(item)\"\n                        class=\"k-icon\"\n                        [ngClass]=\"{ 'k-i-collapse': isExpanded, 'k-i-expand': !isExpanded }\" role=\"presentation\">\n                    </a>\n                    <ng-template [ngIf]=\"!groupHeaderTemplate(item)\">\n                    {{groupTitle(item)}}: {{item.data | valueOf:\"value\": formatForGroup(item)}}\n                    </ng-template>\n                    <ng-template\n                        [templateContext]=\"{\n                            templateRef: groupHeaderTemplate(item),\n                            group: item.data,\n                            aggregates: item.data?.aggregates,\n                            value: item.data?.value,\n                            field: item.data?.field,\n                            index: item.index,\n                            expanded: isExpanded,\n                            $implicit: item.data\n                            }\">\n                    </ng-template>\n                </ng-template>\n            </p>\n        </td>\n        <ng-container *ngIf=\"hasGroupHeaderColumn\">\n            <td *ngFor=\"let column of groupHeaderColumns; let index = index\"\n                role=\"gridcell\"\n                aria-selected=\"false\"\n                kendoGridLogicalCell\n                [logicalRowIndex]=\"logicalRowIndex\"\n                [logicalColIndex]=\"index + 1\"\n                [logicalSlaveCell]=\"false\"\n                [groupItem]=\"item\"\n                [colSpan]=\"1\"\n            >\n                <ng-container *ngIf=\"column.groupHeaderColumnTemplateRef\" [ngTemplateOutlet]=\"column.groupHeaderColumnTemplateRef\"\n                    [ngTemplateOutletContext]=\"{\n                        group: item.data,\n                        aggregates: item.data?.aggregates,\n                        value: item.data?.value,\n                        field: item.data?.field,\n                        index: item.index,\n                        $implicit: item.data\n                        }\">\n                </ng-container>\n            </td>\n        </ng-container>\n    "
                },] },
    ];
    /** @nocollapse */
    GroupHeaderComponent.ctorParameters = function () { return [
        { type: GroupsService },
        { type: GroupInfoService }
    ]; };
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
    return GroupHeaderComponent;
}());

/**
 * @hidden
 */
var DropTargetDirective = /** @class */ (function () {
    function DropTargetDirective(element, service) {
        this.element = element;
        this.service = service;
        this.context = {};
        this.enter = new EventEmitter();
        this.leave = new EventEmitter();
        this.drop = new EventEmitter();
        this.subscriptions = new Subscription();
    }
    DropTargetDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.service.add(this);
        var changes = this.service.changes.pipe(filter(function (_a) {
            var target = _a.target;
            return target === _this;
        }));
        this.subscriptions.add(changes.pipe(filter(function (_a) {
            var type = _a.type;
            return type === 'leave';
        }))
            .subscribe(function (e) {
            _this.leave.next(_this.eventArgs(e));
        }));
        this.subscriptions.add(changes.pipe(filter(function (_a) {
            var type = _a.type;
            return type === 'enter';
        }))
            .subscribe(function (e) {
            _this.enter.next(_this.eventArgs(e));
        }));
        this.subscriptions.add(changes.pipe(filter(function (_a) {
            var type = _a.type;
            return type === 'drop';
        }))
            .subscribe(function (e) {
            _this.drop.next(_this.eventArgs(e));
        }));
    };
    DropTargetDirective.prototype.ngOnDestroy = function () {
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
        }
    };
    DropTargetDirective.prototype.eventArgs = function (e) {
        return {
            target: this,
            mouseEvent: e.mouseEvent,
            draggable: e.draggable
        };
    };
    DropTargetDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoDropTarget]'
                },] },
    ];
    /** @nocollapse */
    DropTargetDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: DragAndDropService }
    ]; };
    DropTargetDirective.propDecorators = {
        context: [{ type: Input }],
        enter: [{ type: Output }],
        leave: [{ type: Output }],
        drop: [{ type: Output }]
    };
    return DropTargetDirective;
}());

var withoutField = function (_a) {
    var field = _a.field;
    return isNullOrEmptyString(field);
};
var alreadyGrouped = function (_a) {
    var groups = _a.groups, field = _a.field;
    return groups.some(function (group) { return group.field === field; });
};
var overSameTarget = function (_a) {
    var target = _a.target, field = _a.field;
    return target.field === field;
};
var overLastTarget = function (_a) {
    var target = _a.target;
    return target.lastTarget;
};
var isLastGroup = function (_a) {
    var groups = _a.groups, field = _a.field;
    return groups.map(function (group) { return group.field; }).indexOf(field) === groups.length - 1;
};
var isNotGroupable = function (groupsService) { return function (_a) {
    var field = _a.field;
    return !groupsService.isGroupable(field);
}; };
var columnRules = function (groupService) { return or(withoutField, alreadyGrouped, isNotGroupable(groupService)); };
var indicatorRules = or(overSameTarget, and(overLastTarget, isLastGroup));
/**
 * @hidden
 */
var GroupPanelComponent = /** @class */ (function () {
    function GroupPanelComponent(hint, cue, groupInfoService, localization, cd) {
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
    Object.defineProperty(GroupPanelComponent.prototype, "groupHeaderClass", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GroupPanelComponent.prototype, "text", {
        get: function () {
            return this.emptyText ? this.emptyText : this.localization.get('groupPanelEmpty');
        },
        set: function (value) {
            this.emptyText = value;
        },
        enumerable: true,
        configurable: true
    });
    GroupPanelComponent.prototype.ngAfterViewInit = function () {
        this.subscription.add(observe(this.dropTargets)
            .subscribe(this.attachTargets.bind(this)));
    };
    GroupPanelComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription.add(this.localization.changes.subscribe(function () { return _this.cd.markForCheck(); }));
    };
    GroupPanelComponent.prototype.ngDoCheck = function () {
        var _this = this;
        var currentTitles = this.groups.map(function (group) { return _this.groupInfoService.groupTitle(group); });
        if (currentTitles.length !== this.groupTitles.length || currentTitles.some(function (current, idx) { return current !== _this.groupTitles[idx]; })) {
            this.groupTitles = currentTitles;
            this.cd.markForCheck();
        }
    };
    GroupPanelComponent.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        if (this.targetSubscription) {
            this.targetSubscription.unsubscribe();
        }
    };
    GroupPanelComponent.prototype.directionChange = function (group) {
        var index = this.groups.findIndex(function (x) { return x.field === group.field; });
        var groups = this.groups.slice(0, index).concat([group], this.groups.slice(index + 1));
        this.change.emit(groups);
    };
    GroupPanelComponent.prototype.insert = function (field, index) {
        var groups = this.groups.filter(function (x) { return x.field !== field; });
        if (groups.length || this.groups.length === 0) {
            this.change.emit(groups.slice(0, index).concat([{ field: field }], groups.slice(index)));
        }
    };
    GroupPanelComponent.prototype.remove = function (group) {
        this.change.emit(this.groups.filter(function (x) { return x.field !== group.field; }));
    };
    GroupPanelComponent.prototype.canDrop = function (draggable, target) {
        var isIndicator = draggable.type === 'groupIndicator';
        var rules = isIndicator
            ? indicatorRules
            : columnRules(this.groupInfoService);
        return !rules({
            field: draggable.field,
            groups: this.groups,
            target: target
        });
    };
    GroupPanelComponent.prototype.attachTargets = function () {
        var _this = this;
        if (this.targetSubscription) {
            this.targetSubscription.unsubscribe();
        }
        this.targetSubscription = new Subscription();
        var enterStream = this.dropTargets
            .reduce(function (acc, target) { return merge(acc, target.enter); }, from([]));
        var leaveStream = this.dropTargets
            .reduce(function (acc, target) { return merge(acc, target.leave); }, from([]));
        var dropStream = this.dropTargets
            .reduce(function (acc, target) { return merge(acc, target.drop); }, from([]));
        this.targetSubscription.add(enterStream.pipe(tap(function (_) { return _this.hint.removeLock(); }), filter(function (_a) {
            var draggable = _a.draggable, target = _a.target;
            return _this.canDrop(draggable.context, target.context);
        }), tap(this.enter.bind(this)), switchMapTo(dropStream.pipe(takeUntil(leaveStream.pipe(tap(this.leave.bind(this))))))).subscribe(this.drop.bind(this)));
    };
    GroupPanelComponent.prototype.enter = function (_a) {
        var draggable = _a.draggable, target = _a.target;
        this.hint.enable();
        var before = target.context.lastTarget || isTargetBefore(draggable.element.nativeElement, target.element.nativeElement);
        if (this.localization.rtl) {
            before = !before;
        }
        this.cue.position(position(target.element.nativeElement, before));
    };
    GroupPanelComponent.prototype.leave = function () {
        this.hint.disable();
        this.cue.hide();
    };
    GroupPanelComponent.prototype.drop = function (_a) {
        var target = _a.target, draggable = _a.draggable;
        var field = draggable.context.field;
        var index = this.dropTargets.toArray().indexOf(target);
        this.insert(field, index);
    };
    GroupPanelComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-grid-group-panel',
                    template: "\n        <ng-template [ngIf]=\"groups.length === 0\">\n            <div\n                class=\"k-indicator-container\"\n                [context]=\"{\n                    lastTarget: true\n                }\"\n                kendoDropTarget>\n                {{ text }}\n            </div>\n        </ng-template>\n        <div *ngFor=\"let group of groups; let index = index;\"\n            class=\"k-indicator-container\"\n            [context]=\"{\n                field: group.field\n            }\"\n            kendoDropTarget>\n            <div\n                kendoDraggableColumn\n                [enableDrag]=\"true\"\n                [context]=\"{\n                    field: group.field,\n                    type: 'groupIndicator',\n                    hint:  groupTitles[index]\n                }\"\n                kendoGroupIndicator\n                kendoDraggable\n                [group]=\"group\"\n                [groupTitle]=\"groupTitles[index]\"\n                (directionChange)=\"directionChange($event)\"\n                (remove)=\"remove($event)\">\n            </div>\n        </div>\n        <div class=\"k-indicator-container\"\n            *ngIf=\"groups.length !== 0\"\n            [context]=\"{\n                lastTarget: true\n            }\"\n            kendoDropTarget>&nbsp;</div>\n    "
                },] },
    ];
    /** @nocollapse */
    GroupPanelComponent.ctorParameters = function () { return [
        { type: DragHintService },
        { type: DropCueService },
        { type: GroupInfoService },
        { type: LocalizationService },
        { type: ChangeDetectorRef }
    ]; };
    GroupPanelComponent.propDecorators = {
        change: [{ type: Output }],
        groupHeaderClass: [{ type: HostBinding, args: ["class.k-grouping-header",] }, { type: HostBinding, args: ["class.k-grouping-header-flex",] }],
        text: [{ type: Input }],
        groups: [{ type: Input }],
        dropTargets: [{ type: ViewChildren, args: [DropTargetDirective,] }]
    };
    return GroupPanelComponent;
}());

/**
 * @hidden
 */
var GroupIndicatorComponent = /** @class */ (function () {
    function GroupIndicatorComponent() {
        this.directionChange = new EventEmitter();
        this.remove = new EventEmitter();
    }
    Object.defineProperty(GroupIndicatorComponent.prototype, "groupIndicatorClass", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GroupIndicatorComponent.prototype, "dir", {
        get: function () {
            return this.group.dir ? this.group.dir : "asc";
        },
        enumerable: true,
        configurable: true
    });
    GroupIndicatorComponent.prototype.toggleDirection = function () {
        this.directionChange.emit({
            dir: this.dir === "asc" ? "desc" : "asc",
            field: this.group.field
        });
        return false;
    };
    GroupIndicatorComponent.prototype.removeDescriptor = function () {
        this.remove.emit({
            dir: this.group.dir,
            field: this.group.field
        });
        return false;
    };
    GroupIndicatorComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: '[kendoGroupIndicator]',
                    template: "\n        <a href=\"#\" class=\"k-link\" tabindex=\"-1\" (click)=\"toggleDirection()\">\n            <span class=\"k-icon\"\n                [class.k-i-sort-asc-sm]=\"dir === 'asc'\"\n                [class.k-i-sort-desc-sm]=\"dir === 'desc'\"></span>\n            {{groupTitle}}</a>\n        <a class=\"k-button k-button-icon k-bare\" tabindex=\"-1\" (click)=\"removeDescriptor()\">\n            <span class=\"k-icon k-i-group-delete\"></span>\n        </a>\n    "
                },] },
    ];
    GroupIndicatorComponent.propDecorators = {
        directionChange: [{ type: Output }],
        remove: [{ type: Output }],
        group: [{ type: Input }],
        groupTitle: [{ type: Input }],
        groupIndicatorClass: [{ type: HostBinding, args: ["class.k-group-indicator",] }]
    };
    return GroupIndicatorComponent;
}());

// TODO
// tslint:disable:rxjs-no-unsafe-takeuntil
/**
 * @hidden
 */
var preventOnDblClick = function (release) { return function (mouseDown) {
    return of(mouseDown).pipe(delay(150), takeUntil(release));
}; };
var hasClass = function (className) { return function (el) { return new RegExp("(^| )" + className + "( |$)").test(el.className); }; };
var isDeleteButton = or(hasClass("k-i-group-delete"), hasClass("k-button-icon"));
var isSortIcon = or(hasClass("k-i-sort-asc-sm"), hasClass("k-i-sort-desc-sm"));
var skipButtons = and(not(isDeleteButton), not(isSortIcon), not(isFocusableWithTabKey), not(matchesNodeName("label")));
var elementUnderCursor = function (_a) {
    var clientX = _a.clientX, clientY = _a.clientY;
    return document.elementFromPoint(clientX, clientY);
};
var hideThenShow = function (element, cont) {
    element.style.display = 'none';
    var result = cont();
    element.style.display = 'block';
    return result;
};
/**
 * @hidden
 */
var DraggableColumnDirective = /** @class */ (function () {
    function DraggableColumnDirective(draggable, element, zone, service, hint, cue, nav, renderer) {
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
    Object.defineProperty(DraggableColumnDirective.prototype, "enableDrag", {
        set: function (enabled) {
            this.enabled = enabled;
            this.updateTouchAction();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DraggableColumnDirective.prototype, "hostClass", {
        get: function () {
            return this.enabled;
        },
        enumerable: true,
        configurable: true
    });
    DraggableColumnDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.subscriptions.add(this.zone.runOutsideAngular(function () {
            return _this.draggable.kendoPress.pipe(filter(function (_) { return _this.enabled; }), filter(function (_a) {
                var target = _a.originalEvent.target;
                return target === _this.element.nativeElement || skipButtons(target);
            }), tap(function (e) {
                var originalEvent = e.originalEvent;
                if (!e.isTouch) {
                    originalEvent.preventDefault();
                }
                _this.nav.navigateTo(originalEvent.target);
            }), switchMap(preventOnDblClick(_this.draggable.kendoRelease)), tap(function (down) {
                _this.hint.create(down, _this.element.nativeElement, _this.context.hint);
                _this.cue.create();
            }), switchMap(function (down) {
                return _this.draggable.kendoDrag.pipe(tap(function (e) {
                    if (e.isTouch) {
                        e.originalEvent.preventDefault();
                    }
                }), tap(_this.hint.attach()), tap(_this.cue.attach()), takeUntil(_this.draggable.kendoRelease), map(function (move) { return ({ move: move, down: down }); }));
            }), tap(_this.performDrag.bind(_this)), switchMapTo(_this.draggable.kendoRelease)).subscribe(_this.drop.bind(_this));
        }));
    };
    DraggableColumnDirective.prototype.ngOnDestroy = function () {
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
        }
    };
    DraggableColumnDirective.prototype.drop = function (upEvent) {
        this.hint.remove();
        this.cue.remove();
        this.service.notifyDrop(this, upEvent);
    };
    DraggableColumnDirective.prototype.performDrag = function (_a) {
        var move = _a.move;
        this.hint.move(move);
        var cursorElement = this.elementUnderCursor(move);
        if (cursorElement) {
            this.service.notifyDrag(this, cursorElement, move);
        }
        this.drag.emit({
            draggable: this,
            mouseEvent: move
        });
    };
    DraggableColumnDirective.prototype.elementUnderCursor = function (mouseEvent) {
        this.hint.hide();
        var target = elementUnderCursor(mouseEvent);
        if (target && /k-grouping-dropclue/.test(target.className)) {
            target = hideThenShow(target, elementUnderCursor.bind(this, mouseEvent));
        }
        this.hint.show();
        return target;
    };
    DraggableColumnDirective.prototype.updateTouchAction = function () {
        if (!this.element) {
            return;
        }
        this.renderer.setStyle(this.element.nativeElement, 'touch-action', this.enabled ? 'none' : '');
    };
    DraggableColumnDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoDraggableColumn]'
                },] },
    ];
    /** @nocollapse */
    DraggableColumnDirective.ctorParameters = function () { return [
        { type: DraggableDirective, decorators: [{ type: Host }] },
        { type: ElementRef },
        { type: NgZone },
        { type: DragAndDropService },
        { type: DragHintService },
        { type: DropCueService },
        { type: NavigationService },
        { type: Renderer2 }
    ]; };
    DraggableColumnDirective.propDecorators = {
        context: [{ type: Input }],
        enableDrag: [{ type: Input }],
        drag: [{ type: Output }],
        hostClass: [{ type: HostBinding, args: ['class.k-grid-draggable-header',] }]
    };
    return DraggableColumnDirective;
}());

var exported = [
    DraggableColumnDirective,
    DropTargetDirective
];
/**
 * @hidden
 */
var DragAndDropModule = /** @class */ (function () {
    function DragAndDropModule() {
    }
    DragAndDropModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [exported],
                    exports: [exported]
                },] },
    ];
    return DragAndDropModule;
}());

var exportedModules$1 = [
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
var GroupModule = /** @class */ (function () {
    function GroupModule() {
    }
    GroupModule.exports = function () {
        return [
            GroupHeaderTemplateDirective,
            GroupHeaderColumnTemplateDirective,
            GroupFooterTemplateDirective
        ];
    };
    GroupModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [exportedModules$1],
                    exports: [exportedModules$1],
                    imports: [CommonModule, SharedModule, DragAndDropModule]
                },] },
    ];
    return GroupModule;
}());

/**
 * @hidden
 */
var DEFAULTS = {
    allowUnsort: true,
    mode: 'single',
    showIndexes: true,
    initialDirection: 'asc'
};
/**
 * @hidden
 */
var normalize$1 = function () {
    var settings = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        settings[_i] = arguments[_i];
    }
    return Object.assign.apply(Object, [{}, DEFAULTS].concat(settings));
};

/**
 * @hidden
 */
var hasFilter = function (settings, column) { return settings.filter !== false && column.field && column.filterable; };
/**
 * @hidden
 */
var hasSort = function (settings, column) { return settings.sort !== false && column.field && column.sortable; };
/**
 * @hidden
 */
var hasLock = function (settings, column) {
    return settings.lock && column.lockable && !(column.parent && !column.parent.isSpanColumn);
};
/**
 * @hidden
 */
var hasColumnChooser = function (settings) { return settings.columnChooser !== false; };
/**
 * @hidden
 */
var hasItems = function (settings, column) {
    return hasColumnChooser(settings) || hasLock(settings, column) || hasSort(settings, column) || hasFilter(settings, column);
};

var mergeObjects = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return Object.assign.apply(null, [{}].concat(args));
};
var directions = function (initialDirection) { return initialDirection === "asc" ? ["asc", "desc"] : ["desc", "asc"]; };
/**
 * @hidden
 */
var isRootLevel = function (_a) {
    var parent = _a.parent;
    return !isTruthy(parent);
};
var ofColumnType = function (_a) {
    var draggable = _a.draggable;
    return ['column', 'columnGroup']
        .indexOf(draggable.context.type) >= 0;
};
var notSameElement = function (_a) {
    var draggable = _a.draggable, target = _a.target;
    return draggable.element.nativeElement !== target.element.nativeElement;
};
var inSameParent = function (x, y) { return x.parent === y.parent ||
    (isInSpanColumn(y) && inSameParent(x, y.parent)); };
var sameParent = function (_a) {
    var draggable = _a.draggable, target = _a.target;
    return inSameParent(draggable.context.column, target.context.column);
};
var lastNonLocked = function (_a) {
    var draggable = _a.draggable;
    return !isTruthy(draggable.context.column.locked) &&
        isRootLevel(draggable.context.column) &&
        draggable.context.lastColumn;
};
var notInSpanColumn = function (_a) {
    var draggable = _a.draggable;
    return !isInSpanColumn(draggable.context.column);
};
var reorderable = function (_a) {
    var draggable = _a.draggable;
    return draggable.context.column.reorderable;
};
var lockable = function (_a) {
    var draggable = _a.draggable, target = _a.target;
    return draggable.context.column.lockable !== false ||
        draggable.context.column.isLocked === target.context.column.isLocked;
};
var rules = and(ofColumnType, reorderable, notInSpanColumn, notSameElement, sameParent, not(lastNonLocked), lockable);
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
        this.dropTargets = new QueryList();
        this.subscription = new Subscription();
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
            var hasFocusableParent = Boolean(closestInScope(target, isFocusable, link));
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
        if (args.keyCode === Keys.Enter && isPresent(column.field)) {
            this.sortService.sort(this.toggleSort(column));
        }
    };
    HeaderComponent.prototype.showSortNumbering = function (column) {
        var showIndexes = normalize$1(this.sortable).showIndexes;
        return showIndexes
            && this.sort
            && this.sort.filter(function (_a) {
                var dir = _a.dir;
                return isPresent(dir);
            }).length > 1
            && this.sortOrder(column.field) > 0;
    };
    HeaderComponent.prototype.sortOrder = function (field) {
        return this.sort
            .filter(function (_a) {
            var dir = _a.dir;
            return isPresent(dir);
        })
            .findIndex(function (x) { return x.field === field; })
            + 1;
    };
    HeaderComponent.prototype.sortIcon = function (field) {
        var state$$1 = this.sortDescriptor(field);
        return {
            'k-icon': isPresent(state$$1.dir),
            'k-i-sort-desc-sm': state$$1.dir === "desc",
            'k-i-sort-asc-sm': state$$1.dir === "asc"
        };
    };
    HeaderComponent.prototype.sortState = function (column) {
        if (!this.isSortable(column)) {
            return;
        }
        var state$$1 = this.sortDescriptor(column.field);
        if (state$$1.dir === 'asc') {
            return 'ascending';
        }
        if (state$$1.dir === 'desc') {
            return 'descending';
        }
    };
    HeaderComponent.prototype.sortStatus = function (column) {
        if (!this.sortedFields[column.field] || !this.isSortable(column)) {
            return;
        }
        var msg = 'sortedDefault';
        var state$$1 = this.sortDescriptor(column.field);
        if (state$$1.dir === 'asc') {
            msg = 'sortedAscending';
        }
        else if (state$$1.dir === 'desc') {
            msg = 'sortedDescending';
        }
        return this.localization.get(msg);
    };
    HeaderComponent.prototype.toggleSort = function (column) {
        var _a = normalize$1(this.sortable, column.sortable), allowUnsort = _a.allowUnsort, mode = _a.mode, initialDirection = _a.initialDirection;
        var descriptor = this.toggleDirection(column.field, allowUnsort, initialDirection);
        if (mode === 'single') {
            return [descriptor];
        }
        return this.sort.filter(function (desc) { return desc.field !== column.field; }).concat([descriptor]);
    };
    HeaderComponent.prototype.ngAfterViewInit = function () {
        this.subscription.add(observe(this.dropTargets)
            .subscribe(this.attachTargets.bind(this)));
    };
    HeaderComponent.prototype.ngDoCheck = function () {
        this._leafColumns = columnsToRender(this.columns || []).filter(function (x) { return !isColumnGroupComponent(x); });
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
        if (isPresent(index)) {
            return index + (isPresent(this.detailTemplate) ? 1 : 0);
        }
        return -1;
    };
    Object.defineProperty(HeaderComponent.prototype, "showFilterMenu", {
        get: function () {
            return !this.columnMenu && hasFilterMenu(this.filterable);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HeaderComponent.prototype, "showFilterRow", {
        get: function () {
            return hasFilterRow(this.filterable);
        },
        enumerable: true,
        configurable: true
    });
    HeaderComponent.prototype.showColumnMenu = function (column) {
        return this.columnMenu && column.columnMenu &&
            (this.columnMenuTemplate || column.columnMenuTemplates.length || hasItems(this.columnMenu, column));
    };
    HeaderComponent.prototype.isFilterable = function (column) {
        return !isNullOrEmptyString(column.field) && column.filterable === true;
    };
    HeaderComponent.prototype.canDrop = function (draggable, target) {
        return this.reorderable && rules({ draggable: draggable, target: target });
    };
    HeaderComponent.prototype.shouldActivate = function (column) {
        var canReorder = this.reorderable && column.reorderable;
        if (!canReorder && !isColumnComponent(column)) {
            return false;
        }
        var groupable = this.groupable && isColumnComponent(column) && column.groupable !== false;
        return groupable || canReorder;
    };
    HeaderComponent.prototype.isSortable = function (column) {
        return !isNullOrEmptyString(column.field)
            && isTruthy(this.sortable) && isTruthy(column.sortable);
    };
    HeaderComponent.prototype.isCheckboxColumn = function (column) {
        return isCheckboxColumn(column) && !column.templateRef;
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
        return sortColumns(columnsToRender(columns));
    };
    HeaderComponent.prototype.isColumnGroupComponent = function (column) {
        return isColumnGroupComponent(column);
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
        this.targetSubscription = new Subscription();
        var enterStream = merge.apply(void 0, this.dropTargets.map(function (target) { return target.enter; }));
        var leaveStream = merge.apply(void 0, this.dropTargets.map(function (target) { return target.leave; }));
        var dropStream = merge.apply(void 0, this.dropTargets.map(function (target) { return target.drop; }));
        this.targetSubscription.add(enterStream.pipe(tap(function (_a) {
            var target = _a.target, draggable = _a.draggable;
            if (draggable.context.type === 'groupIndicator') {
                return;
            }
            var targetLocked = isTruthy(target.context.column.isLocked);
            var draggableLocked = isTruthy(draggable.context.column.isLocked);
            if (_this.lockedColumnsCount > 0 || targetLocked || draggableLocked) {
                _this.hint.toggleLock(targetLocked);
            }
        }), filter(function (_a) {
            var draggable = _a.draggable, target = _a.target;
            return _this.canDrop(draggable, target);
        }), switchMap(this.trackMove.bind(this, leaveStream, dropStream)), map(function (e) { return mergeObjects(e, { before: _this.calculateBefore(e), changeContainer: e.changeContainer }); }), map(this.normalizeTarget.bind(this)), tap(this.enter.bind(this)), switchMap(function (args) {
            return dropStream.pipe(map(function () { return args; }), takeUntil(leaveStream.pipe(tap(_this.leave.bind(_this)))));
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
                .pipe(takeUntil(leaveStream), takeUntil(dropStream), map(function (_a) {
                var mouseEvent = _a.mouseEvent;
                return mergeObjects({ changeContainer: true }, e, { mouseEvent: mouseEvent });
            }));
        }
        return of(mergeObjects({ changeContainer: changed }, e));
    };
    HeaderComponent.prototype.calculateBefore = function (_a) {
        var draggable = _a.draggable, target = _a.target, mouseEvent = _a.mouseEvent, _b = _a.changeContainer, changeContainer = _b === void 0 ? false : _b;
        var targetElement = target.element.nativeElement;
        var before = false;
        if (changeContainer) {
            var left = offset(targetElement).left;
            var halfWidth = targetElement.offsetWidth / 2;
            var middle = left + halfWidth;
            before = middle > mouseEvent.pageX;
            if (this.localization.rtl) {
                before = !before;
            }
        }
        else {
            before = isTargetBefore(draggable.element.nativeElement, targetElement);
        }
        return before;
    };
    HeaderComponent.prototype.enter = function (_a) {
        var target = _a.target, before = _a.before;
        this.hint.enable();
        if (this.localization.rtl) {
            before = !before;
        }
        this.cue.position(position(target.element.nativeElement, before));
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
        { type: Component, args: [{
                    selector: '[kendoGridHeader]',
                    styles: ["\n        .k-column-resizer {\n            cursor: col-resize;\n            display: block;\n            height: 1000%;\n            position: absolute;\n            top: 0;\n            width: .5em;\n        }\n    "],
                    template: "\n    <ng-template [ngIf]=\"true\">\n        <tr *ngFor=\"let i of columnLevels; let levelIndex = index\"\n            kendoGridLogicalRow\n                [logicalRowIndex]=\"levelIndex\"\n                [logicalSlaveRow]=\"lockedColumnsCount > 0\"\n                [logicalCellsCount]=\"columns.length\"\n                [logicalSlaveCellsCount]=\"unlockedColumnsCount\">\n            <th\n                class=\"k-group-cell k-header\"\n                role=\"presentation\"\n                *ngFor=\"let g of groups\">\n            </th>\n            <th class=\"k-hierarchy-cell k-header\"\n                role=\"presentation\"\n                *ngIf=\"detailTemplate?.templateRef\"\n                kendoGridLogicalCell\n                    [logicalRowIndex]=\"levelIndex\"\n                    [logicalColIndex]=\"0\"\n                    aria-selected=\"false\"\n            >\n            </th>\n            <ng-template ngFor let-column [ngForOf]=\"columnsForLevel(levelIndex)\" [ngForTrackBy]=\"trackByIndex\" let-columnIndex=\"index\" let-last=\"last\">\n                <th *ngIf=\"!isColumnGroupComponent(column)\"\n                    kendoGridLogicalCell [logicalRowIndex]=\"levelIndex\"\n                                         [logicalColIndex]=\"logicalColumnIndex(column)\"\n                                         [colSpan]=\"column.colspan\"\n                                         [rowSpan]=\"column.rowspan(totalColumnLevels)\"\n                                         role=\"columnheader\"\n                                         aria-selected=\"false\"\n                                         [attr.aria-sort]=\"sortState(column)\"\n                                         (keydown)=\"onHeaderKeydown(column, $event)\"\n                    kendoDropTarget\n                    kendoDraggable\n                    kendoDraggableColumn\n                    [enableDrag]=\"shouldActivate(column)\"\n                    [context]=\"{\n                        field: column.field,\n                        type: 'column',\n                        column: column,\n                        hint: column.title || column.field,\n                        lastColumn: last && columnIndex === 0\n                    }\"\n                    class=\"k-header\"\n                    [class.k-filterable]=\"(showFilterMenu && isFilterable(column)) || showColumnMenu(column)\"\n                    [class.k-first]=\"isFirstOnRow(column, columnIndex)\"\n                    [ngClass]=\"column.headerClass\"\n                    [ngStyle]=\"column.headerStyle\"\n                    [attr.rowspan]=\"column.rowspan(totalColumnLevels)\"\n                    [attr.colspan]=\"column.colspan\">\n                    <kendo-grid-filter-menu\n                        *ngIf=\"showFilterMenu && isFilterable(column)\"\n                        [column]=\"column\"\n                        [filter]=\"filter\">\n                    </kendo-grid-filter-menu>\n                    <kendo-grid-column-menu *ngIf=\"showColumnMenu(column)\"\n                        [standalone]=\"false\"\n                        [settings]=\"columnMenu\"\n                        [column]=\"column\"\n                        [columnMenuTemplate]=\"columnMenuTemplate\"\n                        [sort]=\"sort\"\n                        [filter]=\"filter\"\n                        [sortable]=\"sortable\">\n                    </kendo-grid-column-menu>\n                    <ng-template [ngIf]=\"!isSortable(column)\">\n                        <ng-template\n                            [templateContext]=\"{\n                                templateRef: column.headerTemplateRef,\n                                columnIndex: column.leafIndex,\n                                column: column,\n                                $implicit: column\n                            }\">\n                        </ng-template>\n                        <ng-template [ngIf]=\"!column.headerTemplateRef\">{{column.displayTitle}}</ng-template>\n                    </ng-template>\n                    <ng-template [ngIf]=\"isSortable(column)\">\n                        <span #link class=\"k-link\" (click)=\"onSortClick(column, $event, link)\">\n                            <ng-template\n                                [templateContext]=\"{\n                                    templateRef: column.headerTemplateRef,\n                                    columnIndex: column.leafIndex,\n                                    column: column,\n                                    $implicit: column\n                                }\">\n                            </ng-template>\n                            <ng-template [ngIf]=\"!column.headerTemplateRef\">{{column.displayTitle}}</ng-template>\n                            <span [attr.aria-label]=\"sortableLabel\" [ngClass]=\"sortIcon(column.field)\"></span>\n                            <span *ngIf=\"showSortNumbering(column)\" class=\"k-sort-order\">{{sortOrder(column.field)}}</span>\n                        </span>\n                        <span role=\"status\"\n                              class=\"k-sort-status\"\n                              style=\"position: absolute; left: -10000px;\"\n                              [innerHtml]=\"sortStatus(column)\">\n                        </span>\n                    </ng-template>\n                    <ng-template [ngIf]=\"isCheckboxColumn(column) && !column.headerTemplateRef && column.showSelectAll\">\n                        <input\n                            class=\"k-checkbox\"\n                            [attr.id]=\"selectAllCheckboxId()\"\n                            kendoGridSelectAllCheckbox\n                            kendoGridFocusable>\n                        <label class=\"k-checkbox-label\" [attr.for]=\"selectAllCheckboxId()\"></label>\n                    </ng-template>\n                    <span kendoGridColumnHandle\n                        kendoDraggable\n                        class=\"k-column-resizer\"\n                        *ngIf=\"resizable\"\n                        [column]=\"column\"\n                        [columns]=\"columns\">\n                    </span>\n                </th>\n                <th *ngIf=\"isColumnGroupComponent(column)\"\n                    kendoGridLogicalCell [logicalRowIndex]=\"levelIndex\"\n                                         [logicalColIndex]=\"logicalColumnIndex(column)\"\n                                         [rowSpan]=\"column.rowspan(totalColumnLevels)\"\n                                         [colSpan]=\"column.colspan\"\n                    kendoDropTarget\n                    kendoDraggable\n                    kendoDraggableColumn\n                    [enableDrag]=\"shouldActivate(column)\"\n                    [context]=\"{\n                        type: 'columnGroup',\n                        column: column,\n                        hint: column.title,\n                        lastColumn: last && columnIndex === 0\n                    }\"\n                    class=\"k-header\"\n                    [class.k-first]=\"isFirstOnRow(column, columnIndex)\"\n                    [class.k-filterable]=\"showColumnMenu(column)\"\n                    [ngClass]=\"column.headerClass\"\n                    [ngStyle]=\"column.headerStyle\"\n                    [attr.rowspan]=\"column.rowspan(totalColumnLevels)\"\n                    [attr.colspan]=\"column.colspan\">\n                        <kendo-grid-column-menu *ngIf=\"showColumnMenu(column)\"\n                            [standalone]=\"false\"\n                            [settings]=\"columnMenu\"\n                            [column]=\"column\"\n                            [columnMenuTemplate]=\"columnMenuTemplate\">\n                        </kendo-grid-column-menu>\n                        <ng-template\n                            [templateContext]=\"{\n                                templateRef: column.headerTemplateRef,\n                                columnIndex: lockedColumnsCount + columnIndex,\n                                column: column,\n                                $implicit: column\n                            }\">\n                        </ng-template>\n                        <ng-template [ngIf]=\"!column.headerTemplateRef\">{{column.displayTitle}}</ng-template>\n                        <span kendoGridColumnHandle\n                            kendoDraggable\n                            class=\"k-column-resizer\"\n                            *ngIf=\"resizable\"\n                            [column]=\"column\"\n                            [columns]=\"columns\">\n                        </span>\n                </th>\n            </ng-template>\n        </tr>\n        <tr *ngIf=\"showFilterRow\"\n            kendoGridFilterRow\n                [columns]=\"leafColumns\"\n                [filter]=\"filter\"\n                [groups]=\"groups\"\n                [detailTemplate]=\"detailTemplate\"\n                [lockedColumnsCount]=\"lockedColumnsCount\"\n            kendoGridLogicalRow\n                [logicalRowIndex]=\"totalColumnLevels + 1\"\n                [logicalSlaveRow]=\"lockedColumnsCount > 0\"\n                [logicalCellsCount]=\"columns.length\"\n                [logicalSlaveCellsCount]=\"unlockedColumnsCount\"\n        ></tr>\n    </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    HeaderComponent.ctorParameters = function () { return [
        { type: SinglePopupService },
        { type: DragHintService },
        { type: DropCueService },
        { type: ColumnReorderService },
        { type: IdService },
        { type: SortService },
        { type: LocalizationService },
        { type: ChangeDetectorRef }
    ]; };
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
    return HeaderComponent;
}());

// TODO
// tslint:disable:rxjs-no-unsafe-takeuntil
/**
 * @hidden
 */
var fromPercentage = function (value, percent) {
    var sign = percent < 0 ? -1 : 1;
    return Math.ceil((Math.abs(percent) / 100) * value) * sign;
};
/**
 * @hidden
 */
var toPercentage = function (value, whole) { return (value / whole) * 100; };
/**
 * @hidden
 */
var headerWidth = function (handle) { return handle.nativeElement.parentElement.offsetWidth; };
/**
 * @hidden
 */
var allLeafColumns = function (columns) { return expandColumns(columns)
    .filter(function (c) { return !c.isColumnGroup; }); };
/**
 * @hidden
 */
var stopPropagation = function (_a) {
    var event = _a.originalEvent;
    event.stopPropagation();
    event.preventDefault();
};
/**
 * @hidden
 */
var createMoveStream = function (service, draggable) { return function (mouseDown) {
    return draggable.kendoDrag.pipe(takeUntil(draggable.kendoRelease.pipe(tap(function () { return service.end(); }))), map(function (_a) {
        var pageX = _a.pageX;
        return ({
            originalX: mouseDown.pageX,
            pageX: pageX
        });
    }));
}; };
/**
 * @hidden
 */
var preventOnDblClick$1 = function (release) { return function (mouseDown) {
    return of(mouseDown).pipe(delay(150), takeUntil(release));
}; };
/**
 * @hidden
 */
var isInSpanColumn$1 = function (column) { return !!(column.parent && column.parent.isSpanColumn); };
/**
 * @hidden
 *
 * Calculates the column index. If the column is stated in `SpanColumn`,
 * the index for all child columns equals the index of the first child.
 */
var indexOf = function (target, list) {
    var index = 0;
    var ignore = 0;
    var skip = 0;
    while (index < list.length) {
        var current = list[index];
        var isParentSpanColumn = isInSpanColumn$1(current);
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
var ColumnHandleDirective = /** @class */ (function () {
    function ColumnHandleDirective(draggable, element, service, zone, cdr, localization) {
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
    Object.defineProperty(ColumnHandleDirective.prototype, "visible", {
        get: function () {
            return this.column.resizable ? 'block' : 'none';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnHandleDirective.prototype, "leftStyle", {
        get: function () {
            return isTruthy(this.rtl) ? 0 : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnHandleDirective.prototype, "rightStyle", {
        get: function () {
            return isTruthy(this.rtl) ? null : 0;
        },
        enumerable: true,
        configurable: true
    });
    ColumnHandleDirective.prototype.autoFit = function () {
        var _this = this;
        var allLeafs = allLeafColumns(this.columns);
        var currentLeafs = leafColumns([this.column]).filter(function (column) { return isTruthy(column.resizable); });
        var columnInfo = currentLeafs.map(function (column) {
            var isParentSpan = isInSpanColumn$1(column);
            var isLastInSpan = isParentSpan ? column.parent.childColumns.last === column : false;
            var index = indexOf(column, allLeafs);
            return {
                column: column,
                headerIndex: _this.columnsForLevel(column.level).indexOf(column),
                index: index,
                isLastInSpan: isLastInSpan,
                isParentSpan: isParentSpan,
                level: column.level
            };
        });
        currentLeafs.forEach(function (column) { return column.width = 0; });
        this.service.measureColumns(columnInfo);
    };
    ColumnHandleDirective.prototype.ngOnInit = function () {
        var _this = this;
        var service = this.service.changes.pipe(filter(function () { return _this.column.resizable; }), filter(function (e) { return isPresent(e.columns.find(function (column) { return column === _this.column; })); }));
        this.subscriptions.add(service.pipe(filter(function (e) { return e.type === 'start'; }))
            .subscribe(this.initState.bind(this)));
        this.subscriptions.add(service.pipe(filter(function (e) { return e.type === 'resizeColumn'; }))
            .subscribe(this.resize.bind(this)));
        this.subscriptions.add(this.service.changes.pipe(filter(function (e) { return e.type === 'start'; }), filter(this.shouldUpdate.bind(this)), take(1) //on first resize only
        ).subscribe(this.initColumnWidth.bind(this)));
        this.subscriptions.add(this.zone.runOutsideAngular(function () {
            return _this.draggable.kendoPress.pipe(tap(stopPropagation), tap(function () { return _this.service.start(_this.column); }), switchMap(preventOnDblClick$1(_this.draggable.kendoRelease)), switchMap(createMoveStream(_this.service, _this.draggable)))
                .subscribe(function (_a) {
                var pageX = _a.pageX, originalX = _a.originalX;
                var delta = pageX - originalX;
                var percent = toPercentage(delta, _this.column.resizeStartWidth || _this.column.width);
                _this.service.resizeColumns(percent);
            });
        }));
        this.subscriptions.add(service.pipe(filter(function (e) { return e.type === 'autoFitComplete'; }))
            .subscribe(this.sizeToFit.bind(this)));
        this.subscriptions.add(service.pipe(filter(function (e) { return e.type === 'triggerAutoFit'; }))
            .subscribe(this.autoFit.bind(this)));
        this.subscriptions.add(this.localization.changes.subscribe(function (_a) {
            var rtl = _a.rtl;
            return _this.rtl = rtl;
        }));
    };
    ColumnHandleDirective.prototype.ngOnDestroy = function () {
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
        }
    };
    ColumnHandleDirective.prototype.shouldUpdate = function () {
        return !allLeafColumns(this.columns)
            .map(function (column) { return column.width; })
            .some(isBlank);
    };
    ColumnHandleDirective.prototype.initColumnWidth = function () {
        this.column.width = headerWidth(this.element);
    };
    ColumnHandleDirective.prototype.initState = function () {
        this.column.resizeStartWidth = headerWidth(this.element);
        this.service.resizedColumn({
            column: this.column,
            oldWidth: this.column.resizeStartWidth
        });
    };
    ColumnHandleDirective.prototype.resize = function (_a) {
        var deltaPercent = _a.deltaPercent;
        var delta = fromPercentage(this.column.resizeStartWidth, deltaPercent);
        if (isTruthy(this.rtl)) {
            delta *= -1;
        }
        var newWidth = Math.max(this.column.resizeStartWidth + delta, this.column.minResizableWidth);
        var tableDelta = newWidth > this.column.minResizableWidth ?
            delta : this.column.minResizableWidth - this.column.resizeStartWidth;
        this.updateWidth(this.column, newWidth);
        this.service.resizeTable(this.column, tableDelta);
    };
    ColumnHandleDirective.prototype.sizeToFit = function (_a) {
        var columns = _a.columns, widths = _a.widths;
        var index = columns.indexOf(this.column);
        var width = Math.max.apply(Math, widths.map(function (w) { return w[index]; })) + 1; //add 1px for IE
        var tableDelta = width - this.column.resizeStartWidth;
        this.updateWidth(this.column, width);
        this.service.resizeTable(this.column, tableDelta);
    };
    ColumnHandleDirective.prototype.updateWidth = function (column, width) {
        column.width = width;
        this.cdr.markForCheck(); //force CD cycle
    };
    ColumnHandleDirective.prototype.columnsForLevel = function (level) {
        return columnsToRender(this.columns ? this.columns.filter(function (column) { return column.level === level; }) : []);
    };
    ColumnHandleDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoGridColumnHandle]'
                },] },
    ];
    /** @nocollapse */
    ColumnHandleDirective.ctorParameters = function () { return [
        { type: DraggableDirective, decorators: [{ type: Host }] },
        { type: ElementRef },
        { type: ColumnResizingService },
        { type: NgZone },
        { type: ChangeDetectorRef },
        { type: LocalizationService }
    ]; };
    ColumnHandleDirective.propDecorators = {
        columns: [{ type: Input }],
        column: [{ type: Input }],
        visible: [{ type: HostBinding, args: ['style.display',] }],
        leftStyle: [{ type: HostBinding, args: ['style.left',] }],
        rightStyle: [{ type: HostBinding, args: ['style.right',] }],
        autoFit: [{ type: HostListener, args: ['dblclick',] }]
    };
    return ColumnHandleDirective;
}());

/**
 * Represents the select-all checkbox feature of the Grid ([see example]({% slug selection_grid %}#toc-select-all-feature)).
 */
var SelectAllCheckboxDirective = /** @class */ (function () {
    function SelectAllCheckboxDirective(selectionService, el, renderer, ngZone) {
        var _this = this;
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
        this.ngZone.runOutsideAngular(function () {
            _this.destroyClick = _this.renderer.listen(_this.el.nativeElement, "click", _this.onClick.bind(_this));
        });
    }
    SelectAllCheckboxDirective.prototype.ngAfterContentChecked = function () {
        this.setState();
    };
    SelectAllCheckboxDirective.prototype.ngOnChanges = function () {
        this.stateSet = true;
    };
    SelectAllCheckboxDirective.prototype.ngOnDestroy = function () {
        if (this.destroyClick) {
            this.destroyClick();
        }
    };
    /**
     * @hidden
     */
    SelectAllCheckboxDirective.prototype.onClick = function () {
        var _this = this;
        // yields consistent cross-browser behavior when clicking an "indeterminate" checkbox
        var undefinedCheckedStateInIE = detectIE() && this.selectionService.selectAllState === undefined;
        var isChecked = undefinedCheckedStateInIE ? true : this.el.nativeElement.checked;
        var options = this.selectionService.options;
        this.selectAllChange.emit(isChecked ? "checked" : "unchecked");
        if (options.enabled && options.mode === "multiple") {
            this.ngZone.run(function () {
                _this.selectionService.updateAll(isChecked);
            });
        }
    };
    /**
     * @hidden
     */
    SelectAllCheckboxDirective.prototype.setState = function () {
        var state$$1 = this.stateSet ? this.stateToBool() : this.selectionService.selectAllState;
        var elem = this.el.nativeElement;
        this.renderer.setProperty(elem, "indeterminate", !isPresent(state$$1));
        this.renderer.setProperty(elem, "checked", isPresent(state$$1) ? state$$1 : false);
    };
    /**
     * @hidden
     */
    SelectAllCheckboxDirective.prototype.stateToBool = function () {
        switch (this.state) {
            case "checked":
                return true;
            case "unchecked":
                return false;
            default:
                return undefined;
        }
    };
    SelectAllCheckboxDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoGridSelectAllCheckbox]'
                },] },
    ];
    /** @nocollapse */
    SelectAllCheckboxDirective.ctorParameters = function () { return [
        { type: SelectionService },
        { type: ElementRef },
        { type: Renderer2 },
        { type: NgZone }
    ]; };
    SelectAllCheckboxDirective.propDecorators = {
        state: [{ type: Input }],
        selectAllChange: [{ type: Output }],
        type: [{ type: HostBinding, args: ['attr.type',] }]
    };
    return SelectAllCheckboxDirective;
}());

/**
 * @hidden
 */
var FilterMenuComponent = /** @class */ (function () {
    function FilterMenuComponent(filterService, popupService, localization) {
        this.filterService = filterService;
        this.popupService = popupService;
        this.localization = localization;
        /**
         * @hidden
         */
        this.filterLabel = this.localization.get('filter');
    }
    Object.defineProperty(FilterMenuComponent.prototype, "hasFilters", {
        get: function () {
            return filtersByField(this.filter, (this.column || {}).field).length > 0;
        },
        enumerable: true,
        configurable: true
    });
    FilterMenuComponent.prototype.toggle = function (anchor, template) {
        this.popupRef = this.popupService.open(anchor, template, this.popupRef);
        return false;
    };
    FilterMenuComponent.prototype.close = function () {
        this.popupService.destroy();
    };
    FilterMenuComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-grid-filter-menu',
                    template: "\n        <a #anchor\n            [ngClass]=\"{'k-grid-filter':true, 'k-state-active': hasFilters}\"\n            (click)=\"toggle(anchor, template)\"\n            href=\"#\"\n            [attr.title]=\"filterLabel\">\n            <span class=\"k-icon k-i-filter\"></span>\n        </a>\n        <ng-template #template>\n            <kendo-grid-filter-menu-container\n                [column]=\"column\"\n                [filter]=\"filter\"\n                (close)=\"close()\"\n                >\n            </kendo-grid-filter-menu-container>\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    FilterMenuComponent.ctorParameters = function () { return [
        { type: FilterService },
        { type: SinglePopupService },
        { type: LocalizationService }
    ]; };
    FilterMenuComponent.propDecorators = {
        column: [{ type: Input }],
        filter: [{ type: Input }]
    };
    return FilterMenuComponent;
}());

var isNoValueOperator = function (operator) { return (operator === "isnull"
    || operator === "isnotnull"
    || operator === "isempty"
    || operator === "isnotempty"); };
var validFilters = function (_a) {
    var value = _a.value, operator = _a.operator;
    return !isNullOrEmptyString(value) || isNoValueOperator(operator);
};
var trimFilters = function (filter$$1) {
    filter$$1.filters = filter$$1.filters.filter(validFilters);
    return filter$$1;
};
var findParent = function (filters, field, parent) {
    return filters.reduce(function (acc, filter$$1) {
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
var parentLogicOfDefault = function (filter$$1, field, def) {
    if (def === void 0) { def = "and"; }
    var parent = findParent(((filter$$1 || {}).filters || []), field);
    return isPresent(parent) ? parent.logic : def;
};
/**
 * @hidden
 */
var FilterMenuContainerComponent = /** @class */ (function () {
    function FilterMenuContainerComponent(parentService, childService, localization, cd) {
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
    Object.defineProperty(FilterMenuContainerComponent.prototype, "filter", {
        get: function () {
            return this._filter;
        },
        /**
         * The current root filter.
         * @type {CompositeFilterDescriptor}
         */
        set: function (value) {
            this._filter = cloneFilters(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterMenuContainerComponent.prototype, "childFilter", {
        get: function () {
            if (!isPresent(this._childFilter)) {
                this._childFilter = {
                    filters: filtersByField(this.filter, (this.column || {}).field),
                    logic: parentLogicOfDefault(this.filter, (this.column || {}).field)
                };
            }
            return this._childFilter;
        },
        enumerable: true,
        configurable: true
    });
    FilterMenuContainerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.childService.changes.subscribe(function (filter$$1) { return _this._childFilter = filter$$1; });
        this.subscription.add(this.localization.changes.subscribe(function () { return _this.cd.markForCheck(); }));
    };
    FilterMenuContainerComponent.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    Object.defineProperty(FilterMenuContainerComponent.prototype, "disabled", {
        get: function () {
            return !this.childFilter.filters.some(validFilters);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterMenuContainerComponent.prototype, "templateContext", {
        get: function () {
            this._templateContext.column = this.column;
            this._templateContext.filter = this.childFilter;
            this._templateContext.filterService = this.childService;
            // tslint:disable-next-line:no-string-literal
            this._templateContext["$implicit"] = this.childFilter;
            return this._templateContext;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterMenuContainerComponent.prototype, "hasTemplate", {
        get: function () {
            return isPresent(this.column) && isPresent(this.column.filterMenuTemplateRef);
        },
        enumerable: true,
        configurable: true
    });
    FilterMenuContainerComponent.prototype.submit = function () {
        var filter$$1 = trimFilters(this.childFilter);
        if (filter$$1.filters.length) {
            var root = this.filter || {
                filters: [],
                logic: "and"
            };
            removeFilter(root, this.column.field);
            root.filters.push(filter$$1);
            this.parentService.filter(root);
        }
        this.close.emit();
        return false;
    };
    FilterMenuContainerComponent.prototype.reset = function () {
        var root = this.filter || {
            filters: [],
            logic: "and"
        };
        removeFilter(root, this.column.field);
        this.parentService.filter(root);
        this.close.emit();
    };
    Object.defineProperty(FilterMenuContainerComponent.prototype, "clearText", {
        get: function () {
            return this.localization.get("filterClearButton");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterMenuContainerComponent.prototype, "filterText", {
        get: function () {
            return this.localization.get("filterFilterButton");
        },
        enumerable: true,
        configurable: true
    });
    FilterMenuContainerComponent.decorators = [
        { type: Component, args: [{
                    providers: [FilterService],
                    selector: 'kendo-grid-filter-menu-container',
                    template: "\n        <form (submit)=\"submit()\" (reset)=\"reset()\"\n            class=\"k-filter-menu k-group k-reset k-state-border-up\">\n            <div class=\"k-filter-menu-container\">\n                <ng-container [ngSwitch]=\"hasTemplate\">\n                    <ng-container *ngSwitchCase=\"false\">\n                        <ng-container\n                            kendoFilterMenuHost\n                            [filterService]=\"childService\"\n                            [column]=\"column\"\n                            [filter]=\"childFilter\">\n                        </ng-container>\n                    </ng-container>\n                    <ng-container *ngSwitchCase=\"true\">\n                        <ng-template\n                            *ngIf=\"column.filterMenuTemplateRef\"\n                            [ngTemplateOutlet]=\"column.filterMenuTemplateRef\"\n                            [ngTemplateOutletContext]=\"templateContext\"\n                            >\n                        </ng-template>\n                    </ng-container>\n                </ng-container>\n                <div [ngClass]=\"actionsClass\">\n                    <button type=\"reset\" class=\"k-button\">{{clearText}}</button>\n                    <button type=\"submit\" class=\"k-button k-primary\" [disabled]=\"disabled\">{{filterText}}</button>\n                </div>\n            </div>\n        </form>\n    "
                },] },
    ];
    /** @nocollapse */
    FilterMenuContainerComponent.ctorParameters = function () { return [
        { type: FilterService, decorators: [{ type: SkipSelf }] },
        { type: FilterService },
        { type: LocalizationService },
        { type: ChangeDetectorRef }
    ]; };
    FilterMenuContainerComponent.propDecorators = {
        close: [{ type: Output }],
        column: [{ type: Input }],
        filter: [{ type: Input }],
        actionsClass: [{ type: Input }]
    };
    return FilterMenuContainerComponent;
}());

/**
 * @hidden
 */
var FilterMenuInputWrapperComponent = /** @class */ (function (_super) {
    __extends(FilterMenuInputWrapperComponent, _super);
    function FilterMenuInputWrapperComponent() {
        return _super.call(this, null) || this;
    }
    Object.defineProperty(FilterMenuInputWrapperComponent.prototype, "hostClasses", {
        /**
         * @hidden
         */
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    FilterMenuInputWrapperComponent.prototype.operatorChange = function (dataItem) {
        this.currentOperator = dataItem;
    };
    FilterMenuInputWrapperComponent.prototype.filterChange = function (filter$$1) {
        this.applyFilter(filter$$1);
    };
    Object.defineProperty(FilterMenuInputWrapperComponent.prototype, "currentFilter", {
        /**
         * The current filter for the associated column field.
         * @readonly
         * @type {FilterDescriptor}
         */
        get: function () {
            return this._currentFilter;
        },
        /**
         * The current filter for the associated column field.
         * @readonly
         * @type {FilterDescriptor}
         */
        set: function (value) {
            this._currentFilter = value;
        },
        enumerable: true,
        configurable: true
    });
    FilterMenuInputWrapperComponent.prototype.updateFilter = function (filter$$1) {
        Object.assign(this.currentFilter, filter$$1);
        return this.filter;
    };
    FilterMenuInputWrapperComponent.prototype.onChange = function (value) {
        this.filterChange(this.updateFilter({
            field: this.column.field,
            operator: this.currentOperator,
            value: value
        }));
    };
    FilterMenuInputWrapperComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-grid-filter-menu-input-wrapper',
                    template: "\n        <kendo-dropdownlist\n            [data]=\"operators\"\n            (valueChange)=\"operatorChange($event)\"\n            [value]=\"currentOperator\"\n            [valuePrimitive]=\"true\"\n            textField=\"text\"\n            valueField=\"value\">\n        </kendo-dropdownlist>\n        <ng-content></ng-content>\n    "
                },] },
    ];
    /** @nocollapse */
    FilterMenuInputWrapperComponent.ctorParameters = function () { return []; };
    FilterMenuInputWrapperComponent.propDecorators = {
        filterService: [{ type: Input }],
        currentFilter: [{ type: Input }]
    };
    return FilterMenuInputWrapperComponent;
}(FilterInputWrapperComponent));

/**
 * @hidden
 */
var StringFilterMenuInputComponent = /** @class */ (function () {
    function StringFilterMenuInputComponent() {
        this.operators = [];
    }
    StringFilterMenuInputComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-grid-string-filter-menu-input',
                    template: "\n        <kendo-grid-filter-menu-input-wrapper\n            [column]=\"column\"\n            [filter]=\"filter\"\n            [operators]=\"operators\"\n            [defaultOperator]=\"operator\"\n            [currentFilter]=\"currentFilter\"\n            [filterService]=\"filterService\"\n            >\n            <input class=\"k-textbox\" kendoFilterInput [filterDelay]=\"0\" [ngModel]=\"currentFilter?.value\" />\n        </kendo-grid-filter-menu-input-wrapper>\n    "
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
    return StringFilterMenuInputComponent;
}());

/**
 * Represents a string-filter menu component.
 * ([see example]({% slug builtinfiltertemplate_grid %}#toc-configuration-components-for-filter-templates)).
 */
var StringFilterMenuComponent = /** @class */ (function (_super) {
    __extends(StringFilterMenuComponent, _super);
    function StringFilterMenuComponent(localization) {
        var _this = _super.call(this, null, localization) || this;
        _this.logicOperators = logicOperators(_this.localization);
        /**
         * The current menu filter.
         * @type {CompositeFilterDescriptor}
         */
        _this.filter = { filters: [], logic: "and" };
        /**
         * Determines if the inputs of second criteria will displayed.
         */
        _this.extra = true;
        return _this;
    }
    Object.defineProperty(StringFilterMenuComponent.prototype, "hostClasses", {
        /**
         * @hidden
         */
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StringFilterMenuComponent.prototype, "firstFilter", {
        get: function () {
            return setFilter(0, this.filter, (this.column || {}).field, this.operator);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StringFilterMenuComponent.prototype, "secondFilter", {
        get: function () {
            return setFilter(1, this.filter, (this.column || {}).field, this.operator);
        },
        enumerable: true,
        configurable: true
    });
    StringFilterMenuComponent.prototype.logicChange = function (value) {
        this.filter.logic = value;
    };
    StringFilterMenuComponent.prototype.localizationChange = function () {
        this.logicOperators = logicOperators(this.localization);
        _super.prototype.localizationChange.call(this);
    };
    StringFilterMenuComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-grid-string-filter-menu',
                    template: "\n        <kendo-grid-string-filter-menu-input\n            [currentFilter]=\"firstFilter\"\n            [operators]=\"operators\"\n            [filterService]=\"filterService\"\n            [column]=\"column\"\n            [filter]=\"filter\">\n        </kendo-grid-string-filter-menu-input>\n        <kendo-dropdownlist\n            *ngIf=\"extra\"\n            class=\"k-filter-and\"\n            [data]=\"logicOperators\"\n            [valuePrimitive]=\"true\" (valueChange)=\"logicChange($event)\"\n            [value]=\"filter?.logic\"\n            textField=\"text\"\n            valueField=\"value\">\n        </kendo-dropdownlist>\n        <kendo-grid-string-filter-menu-input\n            *ngIf=\"extra\"\n            [operators]=\"operators\"\n            [currentFilter]=\"secondFilter\"\n            [filterService]=\"filterService\"\n            [column]=\"column\"\n            [filter]=\"filter\">\n        </kendo-grid-string-filter-menu-input>\n    "
                },] },
    ];
    /** @nocollapse */
    StringFilterMenuComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    StringFilterMenuComponent.propDecorators = {
        hostClasses: [{ type: HostBinding, args: ['class.k-filtercell',] }],
        column: [{ type: Input }],
        filter: [{ type: Input }],
        extra: [{ type: Input }],
        filterService: [{ type: Input }]
    };
    return StringFilterMenuComponent;
}(StringFilterComponent));

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
var NumericFilterMenuComponent = /** @class */ (function (_super) {
    __extends(NumericFilterMenuComponent, _super);
    function NumericFilterMenuComponent(localization) {
        var _this = _super.call(this, null, localization) || this;
        _this.logicOperators = logicOperators(_this.localization);
        /**
         * The current menu filter.
         * @type {CompositeFilterDescriptor}
         */
        _this.filter = { filters: [], logic: "and" };
        /**
         * Determines if the inputs of second criteria will displayed.
         */
        _this.extra = true;
        return _this;
    }
    Object.defineProperty(NumericFilterMenuComponent.prototype, "hostClasses", {
        /**
         * @hidden
         */
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumericFilterMenuComponent.prototype, "firstFilter", {
        get: function () {
            return setFilter(0, this.filter, (this.column || {}).field, this.operator);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumericFilterMenuComponent.prototype, "secondFilter", {
        get: function () {
            return setFilter(1, this.filter, (this.column || {}).field, this.operator);
        },
        enumerable: true,
        configurable: true
    });
    NumericFilterMenuComponent.prototype.logicChange = function (value) {
        this.filter.logic = value;
    };
    NumericFilterMenuComponent.prototype.localizationChange = function () {
        this.logicOperators = logicOperators(this.localization);
        _super.prototype.localizationChange.call(this);
    };
    NumericFilterMenuComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-grid-numeric-filter-menu',
                    template: "\n        <kendo-grid-numeric-filter-menu-input\n            [currentFilter]=\"firstFilter\"\n            [operators]=\"operators\"\n            [filterService]=\"filterService\"\n            [column]=\"column\"\n            [filter]=\"filter\"\n            [format]=\"format\"\n            [decimals]=\"decimals\"\n            [spinners]=\"spinners\"\n            [min]=\"min\"\n            [max]=\"max\"\n            [step]=\"step\"\n            >\n        </kendo-grid-numeric-filter-menu-input>\n        <kendo-dropdownlist\n            *ngIf=\"extra\"\n            class=\"k-filter-and\"\n            [data]=\"logicOperators\"\n            [valuePrimitive]=\"true\"\n            (valueChange)=\"logicChange($event)\"\n            [value]=\"filter?.logic\"\n            textField=\"text\"\n            valueField=\"value\">\n        </kendo-dropdownlist>\n        <kendo-grid-numeric-filter-menu-input\n            *ngIf=\"extra\"\n            [operators]=\"operators\"\n            [currentFilter]=\"secondFilter\"\n            [filterService]=\"filterService\"\n            [column]=\"column\"\n            [filter]=\"filter\"\n            [format]=\"format\"\n            [decimals]=\"decimals\"\n            [spinners]=\"spinners\"\n            [min]=\"min\"\n            [max]=\"max\"\n            [step]=\"step\"\n            >\n        </kendo-grid-numeric-filter-menu-input>\n    "
                },] },
    ];
    /** @nocollapse */
    NumericFilterMenuComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    NumericFilterMenuComponent.propDecorators = {
        hostClasses: [{ type: HostBinding, args: ['class.k-filtercell',] }],
        column: [{ type: Input }],
        filter: [{ type: Input }],
        extra: [{ type: Input }],
        filterService: [{ type: Input }]
    };
    return NumericFilterMenuComponent;
}(NumericFilterComponent));

/**
 * @hidden
 */
var NumericFilterMenuInputComponent = /** @class */ (function () {
    function NumericFilterMenuInputComponent(localization) {
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
    NumericFilterMenuInputComponent.prototype.messageFor = function (key) {
        return this.localization.get(key);
    };
    NumericFilterMenuInputComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-grid-numeric-filter-menu-input',
                    template: "\n        <kendo-grid-filter-menu-input-wrapper\n            [column]=\"column\"\n            [filter]=\"filter\"\n            [operators]=\"operators\"\n            [defaultOperator]=\"operator\"\n            [currentFilter]=\"currentFilter\"\n            [filterService]=\"filterService\"\n        >\n            <kendo-numerictextbox\n                kendoFilterInput\n                [filterDelay]=\"0\"\n                [autoCorrect]=\"true\"\n                [value]=\"currentFilter?.value\"\n                [format]=\"format\"\n                [decimals]=\"decimals\"\n                [spinners]=\"spinners\"\n                [min]=\"min\"\n                [max]=\"max\"\n                [step]=\"step\"\n            >\n                <kendo-numerictextbox-messages\n                    [increment]=\"messageFor('filterNumericIncrement')\"\n                    [decrement]=\"messageFor('filterNumericDecrement')\"\n                >\n                </kendo-numerictextbox-messages>\n            </kendo-numerictextbox>\n        </kendo-grid-filter-menu-input-wrapper>\n    "
                },] },
    ];
    /** @nocollapse */
    NumericFilterMenuInputComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
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
    return NumericFilterMenuInputComponent;
}());

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
var DateFilterMenuComponent = /** @class */ (function (_super) {
    __extends(DateFilterMenuComponent, _super);
    function DateFilterMenuComponent(localization) {
        var _this = _super.call(this, null, localization) || this;
        _this.logicOperators = logicOperators(_this.localization);
        /**
         * The current menu filter.
         * @type {CompositeFilterDescriptor}
         */
        _this.filter = { filters: [], logic: "and" };
        /**
         * Determines if the inputs of second criteria will be displayed.
         */
        _this.extra = true;
        return _this;
    }
    Object.defineProperty(DateFilterMenuComponent.prototype, "hostClasses", {
        /**
         * @hidden
         */
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateFilterMenuComponent.prototype, "firstFilter", {
        get: function () {
            return setFilter(0, this.filter, (this.column || {}).field, this.operator);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateFilterMenuComponent.prototype, "secondFilter", {
        get: function () {
            return setFilter(1, this.filter, (this.column || {}).field, this.operator);
        },
        enumerable: true,
        configurable: true
    });
    DateFilterMenuComponent.prototype.logicChange = function (value) {
        this.filter.logic = value;
    };
    DateFilterMenuComponent.prototype.localizationChange = function () {
        this.logicOperators = logicOperators(this.localization);
        _super.prototype.localizationChange.call(this);
    };
    DateFilterMenuComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-grid-date-filter-menu',
                    template: "\n        <kendo-grid-date-filter-menu-input\n            [currentFilter]=\"firstFilter\"\n            [operators]=\"operators\"\n            [filterService]=\"filterService\"\n            [column]=\"column\"\n            [filter]=\"filter\"\n            [activeView]=\"activeView\"\n            [bottomView]=\"bottomView\"\n            [topView]=\"topView\"\n            [format]=\"format\"\n            [formatPlaceholder]=\"formatPlaceholder\"\n            [placeholder]=\"placeholder\"\n            [min]=\"min\"\n            [max]=\"max\"\n            [weekNumber]=\"weekNumber\"\n            >\n        </kendo-grid-date-filter-menu-input>\n        <kendo-dropdownlist\n            *ngIf=\"extra\"\n            class=\"k-filter-and\"\n            [data]=\"logicOperators\"\n            [valuePrimitive]=\"true\"\n            (valueChange)=\"logicChange($event)\"\n            [value]=\"filter?.logic\"\n            textField=\"text\"\n            valueField=\"value\">\n        </kendo-dropdownlist>\n        <kendo-grid-date-filter-menu-input\n            *ngIf=\"extra\"\n            [operators]=\"operators\"\n            [currentFilter]=\"secondFilter\"\n            [filterService]=\"filterService\"\n            [column]=\"column\"\n            [filter]=\"filter\"\n            [activeView]=\"activeView\"\n            [bottomView]=\"bottomView\"\n            [topView]=\"topView\"\n            [format]=\"format\"\n            [formatPlaceholder]=\"formatPlaceholder\"\n            [placeholder]=\"placeholder\"\n            [min]=\"min\"\n            [max]=\"max\"\n            [weekNumber]=\"weekNumber\"\n            >\n        </kendo-grid-date-filter-menu-input>\n    "
                },] },
    ];
    /** @nocollapse */
    DateFilterMenuComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    DateFilterMenuComponent.propDecorators = {
        hostClasses: [{ type: HostBinding, args: ['class.k-filtercell',] }],
        column: [{ type: Input }],
        filter: [{ type: Input }],
        extra: [{ type: Input }],
        filterService: [{ type: Input }]
    };
    return DateFilterMenuComponent;
}(DateFilterComponent));

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
var BooleanFilterMenuComponent = /** @class */ (function (_super) {
    __extends(BooleanFilterMenuComponent, _super);
    function BooleanFilterMenuComponent(localization) {
        var _this = _super.call(this, null, localization) || this;
        /**
         * The current menu filter.
         * @type {CompositeFilterDescriptor}
         */
        _this.filter = { filters: [], logic: "and" };
        _this.idPrefix = guid();
        return _this;
    }
    Object.defineProperty(BooleanFilterMenuComponent.prototype, "hostClasses", {
        /**
         * @hidden
         */
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    BooleanFilterMenuComponent.prototype.radioId = function (value) {
        return this.idPrefix + "_" + value;
    };
    /**
     * @hidden
     */
    BooleanFilterMenuComponent.prototype.onChange = function (value) {
        this.applyFilter(this.updateFilter({
            field: this.column.field,
            operator: "eq",
            value: value
        }));
    };
    /**
     * @hidden
     */
    BooleanFilterMenuComponent.prototype.isSelected = function (radioValue) {
        return this.filtersByField(this.column.field).some(function (_a) {
            var value = _a.value;
            return value === radioValue;
        });
    };
    BooleanFilterMenuComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-grid-boolean-filter-menu',
                    template: "\n        <ul class=\"k-radio-list k-reset\">\n            <li *ngFor=\"let item of items\">\n                <input type=\"radio\"\n                    [name]=\"idPrefix\"\n                    class=\"k-radio\"\n                    [checked]=\"isSelected(item.value)\"\n                    [attr.id]=\"radioId(item.value)\"\n                    (change)=\"onChange(item.value)\"\n                />\n                <label class=\"k-radio-label\" [attr.for]=\"radioId(item.value)\">{{item.text}}</label>\n            </li>\n        </ul>\n    "
                },] },
    ];
    /** @nocollapse */
    BooleanFilterMenuComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    BooleanFilterMenuComponent.propDecorators = {
        hostClasses: [{ type: HostBinding, args: ['class.k-filtercell',] }],
        filter: [{ type: Input }],
        filterService: [{ type: Input }]
    };
    return BooleanFilterMenuComponent;
}(BooleanFilterComponent));

/**
 * @hidden
 *
 * > List the following components as `entryComponents` in the GridModule.
 */
var filterMenuComponentFactory = function (type) { return ({
    "boolean": BooleanFilterMenuComponent,
    "date": DateFilterMenuComponent,
    "numeric": NumericFilterMenuComponent,
    "text": StringFilterMenuComponent
}[type]); };

/**
 * @hidden
 */
var FilterMenuHostDirective = /** @class */ (function (_super) {
    __extends(FilterMenuHostDirective, _super);
    function FilterMenuHostDirective(host, resolver) {
        return _super.call(this, host, resolver) || this;
    }
    FilterMenuHostDirective.prototype.componentType = function () {
        if (isPresent(this.column) && !isNullOrEmptyString(this.column.filter)) {
            return filterMenuComponentFactory(this.column.filter);
        }
        return StringFilterMenuComponent;
    };
    FilterMenuHostDirective.prototype.initComponent = function (ctx) {
        _super.prototype.initComponent.call(this, ctx);
        this.component.instance.filterService = this.filterService;
    };
    FilterMenuHostDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoFilterMenuHost]'
                },] },
    ];
    /** @nocollapse */
    FilterMenuHostDirective.ctorParameters = function () { return [
        { type: ViewContainerRef },
        { type: ComponentFactoryResolver }
    ]; };
    FilterMenuHostDirective.propDecorators = {
        filterService: [{ type: Input }]
    };
    return FilterMenuHostDirective;
}(FilterHostDirective));

/**
 * @hidden
 */
var DateFilterMenuInputComponent = /** @class */ (function () {
    function DateFilterMenuInputComponent(popupService, localizationService) {
        this.popupService = popupService;
        this.localizationService = localizationService;
        this.operators = [];
    }
    DateFilterMenuInputComponent.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    DateFilterMenuInputComponent.prototype.open = function (picker) {
        this.subscription = this.popupService.onClose
            .pipe(filter(function () { return picker.isActive; }))
            .subscribe(function (e) { return e.preventDefault(); });
    };
    DateFilterMenuInputComponent.prototype.messageFor = function (key) {
        return this.localizationService.get(key);
    };
    DateFilterMenuInputComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-grid-date-filter-menu-input',
                    template: "\n        <kendo-grid-filter-menu-input-wrapper\n            [column]=\"column\"\n            [filter]=\"filter\"\n            [operators]=\"operators\"\n            [defaultOperator]=\"operator\"\n            [currentFilter]=\"currentFilter\"\n            [filterService]=\"filterService\"\n        >\n            <kendo-datepicker\n                #picker\n                kendoFilterInput\n                [filterDelay]=\"0\"\n                (open)=\"open(picker)\"\n                [value]=\"currentFilter?.value\"\n                [placeholder]=\"placeholder\"\n                [formatPlaceholder]=\"formatPlaceholder\"\n                [format]=\"format\"\n                [min]=\"min\"\n                [max]=\"max\"\n                [activeView]=\"activeView\"\n                [bottomView]=\"bottomView\"\n                [topView]=\"topView\"\n                [weekNumber]=\"weekNumber\"\n            >\n                <kendo-datepicker-messages\n                    [toggle]=\"messageFor('filterDateToggle')\"\n                    [today]=\"messageFor('filterDateToday')\"\n                >\n                </kendo-datepicker-messages>\n            </kendo-datepicker>\n        </kendo-grid-filter-menu-input-wrapper>\n    "
                },] },
    ];
    /** @nocollapse */
    DateFilterMenuInputComponent.ctorParameters = function () { return [
        { type: SinglePopupService },
        { type: LocalizationService }
    ]; };
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
    return DateFilterMenuInputComponent;
}());

var INTERNAL_COMPONENTS$2 = [
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
var ENTRY_COMPONENTS$1 = [
    StringFilterMenuComponent,
    NumericFilterMenuComponent,
    DateFilterMenuComponent,
    BooleanFilterMenuComponent
];
/**
 * @hidden
 */
var FilterMenuModule = /** @class */ (function () {
    function FilterMenuModule() {
    }
    FilterMenuModule.exports = function () {
        return [
            StringFilterMenuComponent,
            FilterMenuTemplateDirective,
            NumericFilterMenuComponent,
            DateFilterMenuComponent,
            BooleanFilterMenuComponent,
            SharedFilterModule.exports()
        ];
    };
    FilterMenuModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [INTERNAL_COMPONENTS$2],
                    entryComponents: ENTRY_COMPONENTS$1,
                    exports: [INTERNAL_COMPONENTS$2, SharedFilterModule],
                    imports: [SharedFilterModule]
                },] },
    ];
    return FilterMenuModule;
}());

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
                    selector: 'kendo-grid-columnlist',
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
var ColumnChooserComponent = /** @class */ (function () {
    function ColumnChooserComponent(localization, columnInfoService, popupService, ngZone, renderer, changeDetector) {
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
    Object.defineProperty(ColumnChooserComponent.prototype, "columns", {
        get: function () {
            return this.columnInfoService.leafNamedColumns;
        },
        enumerable: true,
        configurable: true
    });
    ColumnChooserComponent.prototype.ngOnDestroy = function () {
        this.close();
    };
    /**
     * @hidden
     */
    ColumnChooserComponent.prototype.toggle = function (anchor, template) {
        var _this = this;
        if (!this.popupRef) {
            var direction = this.localization.rtl ? 'right' : 'left';
            this.popupRef = this.popupService.open({
                anchor: anchor,
                content: template,
                positionMode: 'absolute',
                anchorAlign: { vertical: 'bottom', horizontal: direction },
                popupAlign: { vertical: 'top', horizontal: direction }
            });
            this.renderer.setAttribute(this.popupRef.popupElement, 'dir', this.localization.rtl ? 'rtl' : 'ltr');
            this.ngZone.runOutsideAngular(function () {
                return _this.closeClick = _this.renderer.listen("document", "click", function (_a) {
                    var target = _a.target;
                    if (!closest(target, function (node) { return node === _this.popupRef.popupElement || node === anchor; })) {
                        _this.close();
                    }
                });
            });
        }
        else {
            this.close();
        }
    };
    /**
     * @hidden
     */
    ColumnChooserComponent.prototype.onApply = function (changed) {
        this.close();
        if (changed.length) {
            this.changeDetector.markForCheck();
            this.columnInfoService.changeVisibility(changed);
        }
    };
    /**
     * @hidden
     */
    ColumnChooserComponent.prototype.onChange = function (changed) {
        this.changeDetector.markForCheck();
        this.columnInfoService.changeVisibility(changed);
    };
    ColumnChooserComponent.prototype.close = function () {
        if (this.popupRef) {
            this.popupRef.close();
            this.popupRef = null;
        }
        this.detachClose();
    };
    ColumnChooserComponent.prototype.detachClose = function () {
        if (this.closeClick) {
            this.closeClick();
            this.closeClick = null;
        }
    };
    ColumnChooserComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-grid-column-chooser',
                    template: "\n        <button #anchor\n            type=\"button\"\n            (click)=\"toggle(anchor, template)\"\n            class=\"k-button k-bare k-button-icon\"\n            [attr.title]=\"localization.get('columns')\">\n            <span class=\"k-icon k-i-columns\"></span>\n        </button>\n        <ng-template #template>\n            <span class='k-column-chooser-title'>{{ localization.get('columns') }}</span>\n            <kendo-grid-columnlist\n                [columns]=\"columns\"\n                [applyText]=\"localization.get('columnsApply')\"\n                [resetText]=\"localization.get('columnsReset')\"\n                [autoSync]=\"autoSync\"\n                [allowHideAll]=\"allowHideAll\"\n                (apply)=\"onApply($event)\"\n                (columnChange)=\"onChange($event)\">\n            </kendo-grid-columnlist>\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    ColumnChooserComponent.ctorParameters = function () { return [
        { type: LocalizationService },
        { type: ColumnInfoService },
        { type: PopupService },
        { type: NgZone },
        { type: Renderer2 },
        { type: ChangeDetectorRef }
    ]; };
    ColumnChooserComponent.propDecorators = {
        autoSync: [{ type: Input }],
        allowHideAll: [{ type: Input }]
    };
    return ColumnChooserComponent;
}());

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
var ColumnMenuService = /** @class */ (function () {
    function ColumnMenuService() {
        /**
         * @hidden
         */
        this.closeMenu = new EventEmitter();
    }
    /**
     * Closes the column menu.
     */
    ColumnMenuService.prototype.close = function () {
        this.closeMenu.emit();
    };
    ColumnMenuService.decorators = [
        { type: Injectable },
    ];
    return ColumnMenuService;
}());

/**
 * @hidden
 */
var ColumnMenuItemBase = /** @class */ (function () {
    function ColumnMenuItemBase() {
        this.hostClass = true;
    }
    ColumnMenuItemBase.prototype.ngOnInit = function () {
        if (isDevMode() && !this.service) {
            throw new Error('The service input of the predefined column menu components is mandatory.');
        }
    };
    /**
     * @hidden
     */
    ColumnMenuItemBase.prototype.close = function () {
        this.service.close();
    };
    ColumnMenuItemBase.propDecorators = {
        service: [{ type: Input }],
        hostClass: [{ type: HostBinding, args: ['class.k-columnmenu-item-wrapper',] }]
    };
    return ColumnMenuItemBase;
}());

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
var ColumnMenuChooserComponent = /** @class */ (function (_super) {
    __extends(ColumnMenuChooserComponent, _super);
    function ColumnMenuChooserComponent(localization, columnInfoService, changeDetector) {
        var _this = _super.call(this) || this;
        _this.localization = localization;
        _this.columnInfoService = columnInfoService;
        _this.changeDetector = changeDetector;
        /**
         * Fires when the content is expanded.
         */
        _this.expand = new EventEmitter();
        /**
         * Fires when the content is collapsed.
         */
        _this.collapse = new EventEmitter();
        /**
         * Specifies if the content is expanded.
         */
        _this.expanded = false;
        /**
         * @hidden
         */
        _this.actionsClass = 'k-columnmenu-actions';
        return _this;
    }
    Object.defineProperty(ColumnMenuChooserComponent.prototype, "columns", {
        get: function () {
            return this.columnInfoService.leafNamedColumns;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    ColumnMenuChooserComponent.prototype.onApply = function (changed) {
        this.close();
        if (changed.length) {
            this.changeDetector.markForCheck();
            this.columnInfoService.changeVisibility(changed);
        }
    };
    ColumnMenuChooserComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-grid-columnmenu-chooser',
                    template: "\n        <kendo-grid-columnmenu-item [text]=\"localization.get('columns')\"\n            icon=\"columns\" [expanded]=\"expanded\" (collapse)=\"collapse.emit()\" (expand)=\"expand.emit()\">\n            <ng-template kendoGridColumnMenuItemContentTemplate>\n                <kendo-grid-columnlist\n                    [applyText]=\"localization.get('columnsApply')\"\n                    [resetText]=\"localization.get('columnsReset')\"\n                    [columns]=\"columns\"\n                    [autoSync]=\"false\"\n                    [allowHideAll]=\"false\"\n                    [actionsClass]=\"actionsClass\"\n                    (apply)=\"onApply($event)\">\n                </kendo-grid-columnlist>\n            </ng-template>\n        </kendo-grid-columnmenu-item>\n    "
                },] },
    ];
    /** @nocollapse */
    ColumnMenuChooserComponent.ctorParameters = function () { return [
        { type: LocalizationService },
        { type: ColumnInfoService },
        { type: ChangeDetectorRef }
    ]; };
    ColumnMenuChooserComponent.propDecorators = {
        expand: [{ type: Output }],
        collapse: [{ type: Output }],
        expanded: [{ type: Input }]
    };
    return ColumnMenuChooserComponent;
}(ColumnMenuItemBase));

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
var ColumnMenuFilterComponent = /** @class */ (function (_super) {
    __extends(ColumnMenuFilterComponent, _super);
    function ColumnMenuFilterComponent(localization) {
        var _this = _super.call(this) || this;
        _this.localization = localization;
        /**
         * Fires when the content is expanded.
         */
        _this.expand = new EventEmitter();
        /**
         * Fires when the content is collapsed.
         */
        _this.collapse = new EventEmitter();
        /**
         * Specifies if the content is expanded.
         */
        _this.expanded = false;
        /**
         * @hidden
         */
        _this.actionsClass = 'k-columnmenu-actions';
        return _this;
    }
    ColumnMenuFilterComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-grid-columnmenu-filter',
                    template: "\n        <kendo-grid-columnmenu-item [text]=\"localization.get('filter')\" icon=\"filter\"\n            [expanded]=\"expanded\" (collapse)=\"collapse.emit()\" (expand)=\"expand.emit()\">\n            <ng-template kendoGridColumnMenuItemContentTemplate>\n                    <kendo-grid-filter-menu-container\n                        [column]=\"service.column\"\n                        [filter]=\"service.filter\"\n                        [actionsClass]=\"actionsClass\"\n                        (close)=\"close()\">\n                    </kendo-grid-filter-menu-container>\n                </ng-template>\n        </kendo-grid-columnmenu-item>\n    "
                },] },
    ];
    /** @nocollapse */
    ColumnMenuFilterComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    ColumnMenuFilterComponent.propDecorators = {
        expand: [{ type: Output }],
        collapse: [{ type: Output }],
        expanded: [{ type: Input }]
    };
    return ColumnMenuFilterComponent;
}(ColumnMenuItemBase));

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
var ColumnMenuItemContentTemplateDirective = /** @class */ (function () {
    function ColumnMenuItemContentTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    ColumnMenuItemContentTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoGridColumnMenuItemContentTemplate]'
                },] },
    ];
    /** @nocollapse */
    ColumnMenuItemContentTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef, decorators: [{ type: Optional }] }
    ]; };
    return ColumnMenuItemContentTemplateDirective;
}());

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
var ColumnMenuItemComponent = /** @class */ (function () {
    function ColumnMenuItemComponent() {
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
    Object.defineProperty(ColumnMenuItemComponent.prototype, "iconClass", {
        get: function () {
            return "k-i-" + this.icon;
        },
        enumerable: true,
        configurable: true
    });
    ColumnMenuItemComponent.prototype.ngOnChanges = function (changes) {
        if (changes.expanded) {
            this.updateContentState();
        }
    };
    /**
     * @hidden
     */
    ColumnMenuItemComponent.prototype.onClick = function (e) {
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
    };
    ColumnMenuItemComponent.prototype.updateContentState = function () {
        this.contentState = this.expanded ? 'expanded' : 'collapsed';
    };
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
                    template: "\n        <div class=\"k-columnmenu-item\" (click)=\"onClick($event)\" [class.k-state-selected]=\"selected\" [class.k-state-disabled]=\"disabled\">\n           <span *ngIf=\"icon\" class=\"k-icon\" [ngClass]=\"iconClass\">\n           </span>\n           {{ text }}\n        </div>\n        <div *ngIf=\"contentTemplate\" [@state]=\"contentState\" style=\"overflow:hidden;\" class=\"k-columnmenu-item-content\">\n            <ng-container [ngTemplateOutlet]=\"contentTemplate.templateRef\">\n            </ng-container>\n        <div>\n    "
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
    return ColumnMenuItemComponent;
}());

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
var ColumnMenuSortComponent = /** @class */ (function (_super) {
    __extends(ColumnMenuSortComponent, _super);
    function ColumnMenuSortComponent(localization, sortService) {
        var _this = _super.call(this) || this;
        _this.localization = localization;
        _this.sortService = sortService;
        return _this;
    }
    Object.defineProperty(ColumnMenuSortComponent.prototype, "sortedAsc", {
        get: function () {
            var descriptor = this.descriptor;
            return descriptor && (!descriptor.dir || descriptor.dir === 'asc');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnMenuSortComponent.prototype, "sortedDesc", {
        get: function () {
            var descriptor = this.descriptor;
            return descriptor && descriptor.dir === 'desc';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    ColumnMenuSortComponent.prototype.toggleSort = function (dir) {
        var field = this.service.column.field;
        var _a = normalize$1(this.service.sortable), mode = _a.mode, allowUnsort = _a.allowUnsort;
        var descriptor = this.descriptor;
        var sort = mode === 'multiple' ? this.service.sort.filter(function (s) { return s.field !== field; }) : [];
        if (descriptor && descriptor.dir === dir) {
            if (!allowUnsort) {
                return;
            }
        }
        else {
            sort.push({ field: field, dir: dir });
        }
        this.sortService.sort(sort);
        this.close();
    };
    Object.defineProperty(ColumnMenuSortComponent.prototype, "descriptor", {
        get: function () {
            var _this = this;
            return [].concat(this.service.sort || []).find(function (s) { return s.field === _this.service.column.field; });
        },
        enumerable: true,
        configurable: true
    });
    ColumnMenuSortComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-grid-columnmenu-sort',
                    template: "\n        <kendo-grid-columnmenu-item [text]=\"localization.get('sortAscending')\"\n            icon=\"sort-asc-sm\" (itemClick)=\"toggleSort('asc')\" [selected]=\"sortedAsc\">\n        </kendo-grid-columnmenu-item>\n        <kendo-grid-columnmenu-item [text]=\"localization.get('sortDescending')\"\n            icon=\"sort-desc-sm\" (itemClick)=\"toggleSort('desc')\" [selected]=\"sortedDesc\">\n        </kendo-grid-columnmenu-item>\n    "
                },] },
    ];
    /** @nocollapse */
    ColumnMenuSortComponent.ctorParameters = function () { return [
        { type: LocalizationService },
        { type: SortService }
    ]; };
    return ColumnMenuSortComponent;
}(ColumnMenuItemBase));

var POPUP_CLASS = 'k-grid-columnmenu-popup';
/**
 * Represents the [column menu]({% slug columnmenu_grid %}) component.
 */
var ColumnMenuComponent = /** @class */ (function () {
    function ColumnMenuComponent(popupService, localization, service) {
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
    Object.defineProperty(ColumnMenuComponent.prototype, "isActive", {
        /**
         * @hidden
         */
        get: function () {
            var _this = this;
            return (this.hasFilter && filtersByField(this.filter, this.column.field).length > 0) ||
                (!this.sortable && this.hasSort && this.sort.find(function (descriptor) { return descriptor.field === _this.column.field; }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnMenuComponent.prototype, "hasFilter", {
        /**
         * @hidden
         */
        get: function () {
            return hasFilter(this.settings, this.column);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnMenuComponent.prototype, "hasSort", {
        /**
         * @hidden
         */
        get: function () {
            return hasSort(this.settings, this.column);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnMenuComponent.prototype, "hasColumnChooser", {
        /**
         * @hidden
         */
        get: function () {
            return hasColumnChooser(this.settings);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnMenuComponent.prototype, "hasLock", {
        /**
         * @hidden
         */
        get: function () {
            return hasLock(this.settings, this.column);
        },
        enumerable: true,
        configurable: true
    });
    ColumnMenuComponent.prototype.ngOnChanges = function () {
        this.service.column = this.column;
        this.service.sort = this.sort;
        this.service.filter = this.filter;
        this.service.sortable = this.sortable;
    };
    ColumnMenuComponent.prototype.ngOnDestroy = function () {
        this.close();
        this.closeSubscription.unsubscribe();
    };
    /**
     * @hidden
     */
    ColumnMenuComponent.prototype.toggle = function (e, anchor, template) {
        e.preventDefault();
        this.expandedFilter = !this.hasColumnChooser;
        this.expandedColumns = !this.hasFilter;
        this.popupRef = this.popupService.open(anchor, template, this.popupRef, POPUP_CLASS);
    };
    /**
     * @hidden
     */
    ColumnMenuComponent.prototype.close = function () {
        this.popupService.destroy();
        this.popupRef = null;
    };
    /**
     * @hidden
     */
    ColumnMenuComponent.prototype.onColumnsExpand = function () {
        this.expandedColumns = true;
        this.expandedFilter = false;
    };
    /**
     * @hidden
     */
    ColumnMenuComponent.prototype.onFilterExpand = function () {
        this.expandedFilter = true;
        this.expandedColumns = false;
    };
    ColumnMenuComponent.decorators = [
        { type: Component, args: [{
                    providers: [ColumnMenuService],
                    selector: 'kendo-grid-column-menu',
                    template: "\n        <a #anchor\n            class=\"k-grid-column-menu k-grid-filter\"\n            [ngClass]=\"{ 'k-state-active': isActive }\"\n            (click)=\"toggle($event, anchor, template)\"\n            href=\"#\"\n            tabindex=\"-1\"\n            [attr.title]=\"localization.get('columnMenu')\">\n            <span class=\"k-icon k-i-more-vertical\"></span>\n        </a>\n        <ng-template #template>\n            <ng-container [ngTemplateOutlet]=\"column.columnMenuTemplateRef || columnMenuTemplate || defaultTemplate\"\n                          [ngTemplateOutletContext]=\"{ service: service, column: column }\">\n            </ng-container>\n        </ng-template>\n        <ng-template #defaultTemplate>\n            <kendo-grid-columnmenu-sort *ngIf=\"hasSort\" [service]=\"service\">\n            </kendo-grid-columnmenu-sort>\n            <kendo-grid-columnmenu-lock *ngIf=\"hasLock\" [service]=\"service\">\n            </kendo-grid-columnmenu-lock>\n            <kendo-grid-columnmenu-chooser *ngIf=\"hasColumnChooser\" [service]=\"service\"\n                [expanded]=\"expandedColumns\" (expand)=\"onColumnsExpand()\">\n            </kendo-grid-columnmenu-chooser>\n            <kendo-grid-columnmenu-filter *ngIf=\"hasFilter\" [service]=\"service\"\n                [expanded]=\"expandedFilter\" (expand)=\"onFilterExpand()\">\n            </kendo-grid-columnmenu-filter>\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    ColumnMenuComponent.ctorParameters = function () { return [
        { type: SinglePopupService },
        { type: LocalizationService },
        { type: ColumnMenuService }
    ]; };
    ColumnMenuComponent.propDecorators = {
        standalone: [{ type: HostBinding, args: ['class.k-grid-column-menu-standalone',] }, { type: Input }],
        column: [{ type: Input }],
        settings: [{ type: Input }],
        sort: [{ type: Input }],
        filter: [{ type: Input }],
        sortable: [{ type: Input }],
        columnMenuTemplate: [{ type: Input }]
    };
    return ColumnMenuComponent;
}());

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
var ColumnMenuLockComponent = /** @class */ (function (_super) {
    __extends(ColumnMenuLockComponent, _super);
    function ColumnMenuLockComponent(localization, columnInfoService, changeDetector) {
        var _this = _super.call(this) || this;
        _this.localization = localization;
        _this.columnInfoService = columnInfoService;
        _this.changeDetector = changeDetector;
        return _this;
    }
    Object.defineProperty(ColumnMenuLockComponent.prototype, "text", {
        get: function () {
            return this.localization.get(this.locked ? 'unlock' : 'lock');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnMenuLockComponent.prototype, "icon", {
        get: function () {
            return this.locked ? 'unlock' : 'lock';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnMenuLockComponent.prototype, "disabled", {
        get: function () {
            return !this.locked && this.columnInfoService.unlockedRootCount < 2;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    ColumnMenuLockComponent.prototype.toggleColumn = function () {
        this.toggleHierarchy(!this.locked);
        this.close();
        this.changeDetector.markForCheck();
    };
    ColumnMenuLockComponent.prototype.toggleHierarchy = function (locked) {
        var root = this.service.column;
        while (root.parent) {
            root = root.parent;
        }
        var columns = [root];
        var allChanged = [];
        while (columns.length) {
            var column = columns.shift();
            column.locked = locked;
            allChanged.push(column);
            if (column.hasChildren) {
                columns.push.apply(columns, column.childrenArray);
            }
        }
        this.columnInfoService.changeLocked(allChanged);
    };
    Object.defineProperty(ColumnMenuLockComponent.prototype, "locked", {
        get: function () {
            return this.service.column.locked;
        },
        enumerable: true,
        configurable: true
    });
    ColumnMenuLockComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-grid-columnmenu-lock',
                    template: "\n       <kendo-grid-columnmenu-item [text]=\"text\" [icon]=\"icon\" (itemClick)=\"toggleColumn()\" [disabled]=\"disabled\">\n       </kendo-grid-columnmenu-item>\n    "
                },] },
    ];
    /** @nocollapse */
    ColumnMenuLockComponent.ctorParameters = function () { return [
        { type: LocalizationService },
        { type: ColumnInfoService },
        { type: ChangeDetectorRef }
    ]; };
    return ColumnMenuLockComponent;
}(ColumnMenuItemBase));

var COMPONENTS$1 = [
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
var ColumnMenuModule = /** @class */ (function () {
    function ColumnMenuModule() {
    }
    ColumnMenuModule.exports = function () {
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
    };
    ColumnMenuModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [COMPONENTS$1],
                    imports: [CommonModule, FilterMenuModule],
                    exports: [COMPONENTS$1]
                },] },
    ];
    return ColumnMenuModule;
}());

var exportedModules$2 = [
    HeaderComponent,
    HeaderTemplateDirective,
    ColumnHandleDirective,
    SelectAllCheckboxDirective
];
var importedModules$2 = [
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
var HeaderModule = /** @class */ (function () {
    function HeaderModule() {
    }
    HeaderModule.exports = function () {
        return [
            HeaderTemplateDirective,
            SelectAllCheckboxDirective
        ];
    };
    HeaderModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [exportedModules$2],
                    exports: [exportedModules$2],
                    imports: importedModules$2.slice()
                },] },
    ];
    return HeaderModule;
}());

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
var CommandColumnComponent = /** @class */ (function (_super) {
    __extends(CommandColumnComponent, _super);
    function CommandColumnComponent(parent) {
        var _this = _super.call(this, parent) || this;
        _this.parent = parent;
        return _this;
    }
    Object.defineProperty(CommandColumnComponent.prototype, "templateRef", {
        get: function () {
            return this.template ? this.template.templateRef : undefined;
        },
        enumerable: true,
        configurable: true
    });
    CommandColumnComponent.decorators = [
        { type: Component, args: [{
                    providers: [
                        {
                            provide: ColumnBase$1,
                            useExisting: forwardRef(function () { return CommandColumnComponent; })
                        }
                    ],
                    selector: 'kendo-grid-command-column',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    CommandColumnComponent.ctorParameters = function () { return [
        { type: ColumnBase$1, decorators: [{ type: SkipSelf }, { type: Host }, { type: Optional }] }
    ]; };
    CommandColumnComponent.propDecorators = {
        template: [{ type: ContentChild, args: [CellTemplateDirective,] }]
    };
    return CommandColumnComponent;
}(ColumnBase$1));

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
var CheckboxColumnComponent = /** @class */ (function (_super) {
    __extends(CheckboxColumnComponent, _super);
    function CheckboxColumnComponent(parent) {
        var _this = _super.call(this, parent) || this;
        _this.parent = parent;
        /*
         * @hidden
         */
        _this.isCheckboxColumn = true;
        return _this;
    }
    Object.defineProperty(CheckboxColumnComponent.prototype, "templateRef", {
        get: function () {
            return this.template ? this.template.templateRef : undefined;
        },
        enumerable: true,
        configurable: true
    });
    CheckboxColumnComponent.decorators = [
        { type: Component, args: [{
                    providers: [
                        {
                            provide: ColumnBase$1,
                            useExisting: forwardRef(function () { return CheckboxColumnComponent; })
                        }
                    ],
                    selector: 'kendo-grid-checkbox-column',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    CheckboxColumnComponent.ctorParameters = function () { return [
        { type: ColumnBase$1, decorators: [{ type: SkipSelf }, { type: Host }, { type: Optional }] }
    ]; };
    CheckboxColumnComponent.propDecorators = {
        showSelectAll: [{ type: Input }],
        template: [{ type: ContentChild, args: [CellTemplateDirective,] }]
    };
    return CheckboxColumnComponent;
}(ColumnBase$1));

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
var SelectionCheckboxDirective = /** @class */ (function () {
    function SelectionCheckboxDirective(selectionService, el, renderer, ngZone) {
        var _this = this;
        this.selectionService = selectionService;
        this.el = el;
        this.renderer = renderer;
        this.ngZone = ngZone;
        this.type = "checkbox";
        this.ngZone.runOutsideAngular(function () {
            _this.destroyClick = _this.renderer.listen(_this.el.nativeElement, "click", _this.onClick.bind(_this));
            _this.destroyKeyDown = _this.renderer.listen(_this.el.nativeElement, "keydown", _this.onKeyDown.bind(_this));
        });
    }
    SelectionCheckboxDirective.prototype.ngAfterContentChecked = function () {
        this.setCheckedState();
    };
    SelectionCheckboxDirective.prototype.ngOnDestroy = function () {
        if (this.destroyClick) {
            this.destroyClick();
        }
        if (this.destroyKeyDown) {
            this.destroyKeyDown();
        }
    };
    SelectionCheckboxDirective.prototype.onClick = function () {
        var _this = this;
        if (this.selectionService.options.enabled) {
            this.ngZone.run(function () {
                var ev = _this.selectionService.toggleByIndex(_this.itemIndex);
                ev.ctrlKey = true;
                ev.shiftKey = false;
                _this.selectionService.changes.emit(ev);
            });
        }
    };
    SelectionCheckboxDirective.prototype.onKeyDown = function (e) {
        if (e.keyCode === Keys.Enter) {
            this.onClick();
        }
    };
    /*
     * @hidden
     */
    SelectionCheckboxDirective.prototype.setCheckedState = function () {
        this.renderer.setProperty(this.el.nativeElement, "checked", this.selectionService.isSelected(this.itemIndex));
    };
    SelectionCheckboxDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoGridSelectionCheckbox]'
                },] },
    ];
    /** @nocollapse */
    SelectionCheckboxDirective.ctorParameters = function () { return [
        { type: SelectionService },
        { type: ElementRef },
        { type: Renderer2 },
        { type: NgZone }
    ]; };
    SelectionCheckboxDirective.propDecorators = {
        itemIndex: [{ type: Input, args: ["kendoGridSelectionCheckbox",] }],
        type: [{ type: HostBinding, args: ['attr.type',] }]
    };
    return SelectionCheckboxDirective;
}());

var columnCellIndex = function (cell, cells) {
    var cellIndex = 0;
    for (var idx = 0; idx < cells.length; idx++) {
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
var TableBodyComponent = /** @class */ (function () {
    function TableBodyComponent(detailsService, groupsService, changeNotification, editService, localization, ngZone, renderer, element, domEvents, selectionService, cellSelectionService, columnInfoService, navigationService) {
        var _this = this;
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
    TableBodyComponent.prototype.isAriaSelected = function (item, column) {
        return this.cellSelectionService.isCellSelected(item, column) ||
            this.isRowSelected(item) ? 'true' : 'false';
    };
    TableBodyComponent.prototype.toggleRow = function (index, dataItem) {
        this.detailsService.toggleRow(index, dataItem);
        return false;
    };
    TableBodyComponent.prototype.isExpanded = function (viewItem) {
        return this.detailsService.isExpanded(viewItem.index, viewItem.data);
    };
    TableBodyComponent.prototype.detailButtonStyles = function (viewItem) {
        var expanded = this.isExpanded(viewItem);
        return expanded ? 'k-minus' : 'k-plus';
    };
    TableBodyComponent.prototype.detailButtonTitle = function (viewItem) {
        var messageKey = this.isExpanded(viewItem) ? 'detailCollapse' : 'detailExpand';
        return this.localization.get(messageKey);
    };
    TableBodyComponent.prototype.isGroup = function (item) {
        return item.type === 'group';
    };
    TableBodyComponent.prototype.isDataItem = function (item) {
        return !this.isGroup(item) && !this.isFooter(item);
    };
    TableBodyComponent.prototype.isFooter = function (item) {
        return item.type === 'footer';
    };
    TableBodyComponent.prototype.isInExpandedGroup = function (item) {
        return this.groupsService.isInExpandedGroup(item.groupIndex, false);
    };
    TableBodyComponent.prototype.isParentGroupExpanded = function (item) {
        return this.groupsService.isInExpandedGroup(item.index || item.groupIndex);
    };
    TableBodyComponent.prototype.isOdd = function (item) {
        return item.index % 2 !== 0;
    };
    TableBodyComponent.prototype.isSelectable = function () {
        return this.selectable && this.selectable.enabled !== false;
    };
    TableBodyComponent.prototype.isRowSelected = function (item) {
        return this.selectionService.isSelected(item.index);
    };
    TableBodyComponent.prototype.trackByWrapper = function (index, item) {
        if (item.type === 'data') {
            item.isEditing = this.editService.hasEdited(item.index);
        }
        return this.trackBy(index, item);
    };
    TableBodyComponent.prototype.trackByColumns = function (index, item) {
        return this.virtualColumns ? index : item;
    };
    TableBodyComponent.prototype.ngDoCheck = function () {
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
    };
    TableBodyComponent.prototype.ngOnChanges = function (changes) {
        if (isChanged("columns", changes, false)) {
            this.changeNotification.notify();
        }
    };
    TableBodyComponent.prototype.logicalRowIndex = function (rowIndex) {
        var pos = this.skip + rowIndex;
        if (this.hasDetailTemplate) {
            pos *= 2;
        }
        var absoluteRowIndex = 1 + pos;
        var addRowOffset = this.editService.hasNewItem ? 1 : 0;
        var filterRowOffset = hasFilterRow(this.filterable) ? 1 : 0;
        var headerRowCount = this.columnInfoService.totalLevels + filterRowOffset + addRowOffset;
        return absoluteRowIndex + headerRowCount;
    };
    TableBodyComponent.prototype.addRowLogicalIndex = function () {
        return this.columnInfoService.totalLevels + 1 +
            (hasFilterRow(this.filterable) ? 1 : 0);
    };
    TableBodyComponent.prototype.logicalColIndex = function (column) {
        if (!isPresent(column.leafIndex)) {
            return -1;
        }
        return column.leafIndex + (this.hasDetailTemplate ? 1 : 0);
    };
    TableBodyComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.ngZone.runOutsideAngular(function () {
            var clickHandler = _this.clickHandler.bind(_this);
            var mousedownSubscription = _this.renderer.listen(_this.element.nativeElement, 'mousedown', clickHandler);
            var mouseupSubscription = _this.renderer.listen(_this.element.nativeElement, 'mouseup', clickHandler);
            var clickSubscription = _this.renderer.listen(_this.element.nativeElement, 'click', clickHandler);
            var contextmenuSubscription = _this.renderer.listen(_this.element.nativeElement, 'contextmenu', clickHandler);
            var touchstartSubscription = _this.renderer.listen(_this.element.nativeElement, 'touchstart', clickHandler);
            var touchendSubscription = _this.renderer.listen(_this.element.nativeElement, 'touchend', clickHandler);
            _this.clickSubscription = function () {
                mousedownSubscription();
                mouseupSubscription();
                clickSubscription();
                contextmenuSubscription();
            };
            _this.touchSubscription = function () {
                touchstartSubscription();
                touchendSubscription();
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
    TableBodyComponent.prototype.ngOnDestroy = function () {
        if (this.clickSubscription) {
            this.clickSubscription();
        }
        if (this.touchSubscription) {
            this.touchSubscription();
        }
        this.cellKeydownSubscription.unsubscribe();
        clearTimeout(this.clickTimeout);
    };
    TableBodyComponent.prototype.isEditingCell = function (index, column) {
        return this.editService.isEditing() && this.editService.isEditedColumn(index, column);
    };
    TableBodyComponent.prototype.isEditingRow = function (index) {
        return this.editService.isEditing() && this.editService.hasEdited(index);
    };
    Object.defineProperty(TableBodyComponent.prototype, "hasGroupHeaderColumn", {
        get: function () {
            return this.columnsContainer.hasGroupHeaderColumn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableBodyComponent.prototype, "columnsContainer", {
        get: function () {
            return this.columnInfoService.columnsContainer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableBodyComponent.prototype, "columnsSpan", {
        get: function () {
            return columnsSpan(this.columns);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableBodyComponent.prototype, "allColumnsSpan", {
        get: function () {
            return columnsSpan(this.allColumns || this.columns);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableBodyComponent.prototype, "colSpan", {
        get: function () {
            return this.columnsSpan + this.groups.length + (this.hasDetailTemplate ? 1 : 0);
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
    TableBodyComponent.prototype.showGroupHeader = function (item) {
        return !item.data.skipHeader;
    };
    Object.defineProperty(TableBodyComponent.prototype, "hasDetailTemplate", {
        get: function () {
            return isPresent(this.detailTemplate);
        },
        enumerable: true,
        configurable: true
    });
    TableBodyComponent.prototype.clickHandler = function (eventArg) {
        var _this = this;
        var element = this.element.nativeElement;
        var target = this.eventTarget(eventArg);
        var cell, row, body, gridElement;
        var currentTarget = target;
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
            var focusable = target !== cell && isFocusableWithTabKey(target, false);
            if (!focusable && !matchesNodeName('label')(target) && !hasClasses(target, IGNORE_TARGET_CLASSSES) &&
                !closestInScope(target, matchesClasses(IGNORE_CONTAINER_CLASSES), cell)) {
                var args_1 = this.cellClickArgs(cell, row, eventArg);
                if (eventArg.type === 'mousedown' || eventArg.type === 'touchstart') {
                    this.domEvents.cellMousedown.emit(args_1);
                }
                else if (eventArg.type === 'mouseup' || eventArg.type === 'touchend') {
                    this.domEvents.cellMouseup.emit(args_1);
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
        this.domEvents.cellClick.emit(Object.assign(args, {
            isEdited: args.isEditedRow || args.isEditedColumn
        }));
    };
    TableBodyComponent.prototype.cellKeydownHandler = function (args) {
        if (args.keyCode === Keys.Enter) {
            this.clickHandler(args);
        }
    };
    TableBodyComponent.prototype.cellClickArgs = function (cell, row, eventArg) {
        var index = columnCellIndex(cell, row.cells);
        var column = this.columns.toArray()[index];
        var columnIndex = this.lockedColumnsCount + index;
        var rowIndex = row.getAttribute('data-kendo-grid-item-index');
        rowIndex = rowIndex ? parseInt(rowIndex, 10) : -1;
        var dataItem = rowIndex === -1 ? this.editService.newDataItem : this.data.at(rowIndex - this.skip);
        var isEditedColumn = this.editService.isEditedColumn(rowIndex, column);
        var isEditedRow = this.editService.isEdited(rowIndex);
        var type = eventArg.type === 'keydown' ? 'click' : eventArg.type;
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
    };
    TableBodyComponent.prototype.eventTarget = function (args) {
        if (args.type === 'touchend') {
            var touch = args.changedTouches[0];
            return document.elementFromPoint(touch.clientX, touch.clientY);
        }
        return args.target;
    };
    TableBodyComponent.decorators = [
        { type: Component, args: [{
                    selector: '[kendoGridTableBody]',
                    template: "\n    <ng-template [ngIf]=\"editService.hasNewItem\">\n        <tr class=\"k-grid-add-row k-grid-edit-row\"\n            kendoGridLogicalRow\n                [logicalRowIndex]=\"addRowLogicalIndex()\"\n                [logicalSlaveRow]=\"lockedColumnsCount > 0\"\n                [logicalCellsCount]=\"columns.length\"\n                [logicalSlaveCellsCount]=\"unlockedColumnsCount\">\n            <ng-template [ngIf]=\"!skipGroupDecoration\">\n                <td class=\"k-group-cell\" *ngFor=\"let g of groups\" role=\"presentation\"></td>\n            </ng-template>\n            <td class=\"k-hierarchy-cell\"\n                *ngIf=\"detailTemplate?.templateRef\"\n                kendoGridLogicalCell\n                    [logicalRowIndex]=\"addRowLogicalIndex()\"\n                    [logicalColIndex]=\"0\"\n                    aria-selected=\"false\"\n                >\n            </td>\n            <td *ngFor=\"let column of columns; let columnIndex = index; trackBy: trackByColumns;\"\n                kendoGridCell\n                    [rowIndex]=\"-1\"\n                    [columnIndex]=\"lockedColumnsCount + columnIndex\"\n                    [isNew]=\"true\"\n                    [column]=\"column\"\n                    [dataItem]=\"newDataItem\"\n                [ngClass]=\"column.cssClass\"\n                [ngStyle]=\"column.style\"\n                [attr.colspan]=\"column.colspan\"\n                kendoGridLogicalCell\n                    [logicalRowIndex]=\"addRowLogicalIndex()\"\n                    [logicalColIndex]=\"logicalColIndex(column)\"\n                    [colSpan]=\"column.colspan\"\n                role=\"gridcell\">\n            </td>\n        </tr>\n    </ng-template>\n    <tr *ngIf=\"data?.length === 0 || data == null\" class=\"k-grid-norecords\">\n        <td [attr.colspan]=\"colSpan\">\n            <ng-template\n                [ngIf]=\"noRecordsTemplate?.templateRef\"\n                [templateContext]=\"{\n                    templateRef: noRecordsTemplate?.templateRef\n                 }\">\n            </ng-template>\n            <ng-container *ngIf=\"!noRecordsTemplate?.templateRef\">\n                {{noRecordsText}}\n            </ng-container>\n        </td>\n    </tr>\n    <ng-template ngFor\n        [ngForOf]=\"data\"\n        [ngForTrackBy]=\"trackByWrapper\"\n        let-item\n        let-rowIndex=\"index\">\n        <tr *ngIf=\"isGroup(item) && isParentGroupExpanded(item) && showGroupHeader(item)\"\n            kendoGridGroupHeader\n                [columns]=\"columns\"\n                [groups]=\"groups\"\n                [item]=\"item\"\n                [hasDetails]=\"detailTemplate?.templateRef\"\n                [skipGroupDecoration]=\"skipGroupDecoration\"\n                [hasGroupHeaderColumn]=\"hasGroupHeaderColumn\"\n                [groupHeaderColumns]=\"groupHeaderColumns\"\n                [rowIndex]=\"rowIndex + 1\"\n                [totalColumnsCount]=\"totalColumnsCount\"\n            kendoGridLogicalRow\n                [logicalRowIndex]=\"logicalRowIndex(rowIndex)\"\n                [logicalSlaveRow]=\"lockedColumnsCount > 0\"\n                [logicalCellsCount]=\"columns.length\"\n                [logicalSlaveCellsCount]=\"groupHeaderSlaveCellsCount\">\n        </tr>\n        <tr\n            *ngIf=\"isDataItem(item) && isInExpandedGroup(item)\"\n            kendoGridLogicalRow\n                [dataRowIndex]=\"item.index\"\n                [dataItem]=\"item.data\"\n                [logicalRowIndex]=\"logicalRowIndex(rowIndex)\"\n                [logicalSlaveRow]=\"lockedColumnsCount > 0\"\n                [logicalCellsCount]=\"columns.length\"\n                [logicalSlaveCellsCount]=\"unlockedColumnsCount\"\n            [ngClass]=\"rowClass({ dataItem: item.data, index: item.index })\"\n            [class.k-alt]=\"isOdd(item)\"\n            [class.k-master-row]=\"detailTemplate?.templateRef\"\n            [class.k-grid-edit-row]=\"isEditingRow(item.index)\"\n            [attr.data-kendo-grid-item-index]=\"item.index\"\n            [class.k-state-selected]=\"isSelectable() && isRowSelected(item)\">\n            <ng-template [ngIf]=\"!skipGroupDecoration\">\n                <td class=\"k-group-cell\" *ngFor=\"let g of groups\" role=\"presentation\"></td>\n            </ng-template>\n            <td class=\"k-hierarchy-cell\"\n                *ngIf=\"detailTemplate?.templateRef\"\n                kendoGridLogicalCell\n                    [logicalRowIndex]=\"logicalRowIndex(rowIndex)\"\n                    [logicalColIndex]=\"0\"\n                    [dataRowIndex]=\"item.index\"\n                    [dataItem]=\"item.data\"\n                    [detailExpandCell]=\"true\"\n                    aria-selected=\"false\"\n                >\n                <a class=\"k-icon\"\n                    *ngIf=\"detailTemplate.showIf(item.data, item.index)\"\n                    [ngClass]=\"detailButtonStyles(item)\"\n                    [attr.title]=\"detailButtonTitle(item)\"\n                    href=\"#\" tabindex=\"-1\" (click)=\"toggleRow(item.index, item.data)\"></a>\n            </td>\n            <td\n                kendoGridCell\n                    [rowIndex]=\"item.index\"\n                    [columnIndex]=\"lockedColumnsCount + columnIndex\"\n                    [attr.data-kendo-grid-column-index]=\"lockedColumnsCount + columnIndex\"\n                    [column]=\"column\"\n                    [dataItem]=\"item.data\"\n                kendoGridLogicalCell\n                    [logicalRowIndex]=\"logicalRowIndex(rowIndex)\"\n                    [logicalColIndex]=\"logicalColIndex(column)\"\n                    [dataRowIndex]=\"item.index\"\n                    [dataItem]=\"item.data\"\n                    [colIndex]=\"columnIndex\"\n                    [colSpan]=\"column.colspan\"\n                    role=\"gridcell\"\n                    [attr.aria-selected]=\"isSelectable() ? isAriaSelected(item, column) : undefined\"\n                    [style.touch-action]=\"isSelectable() && $any(selectable).drag ? 'none' : 'auto'\"\n                [ngClass]=\"column.cssClass\"\n                [class.k-grid-edit-cell]=\"isEditingCell(item.index, column)\"\n                [ngStyle]=\"column.style\"\n                [attr.colspan]=\"column.colspan\"\n                [class.k-state-selected]=\"isSelectable && cellSelectionService.isCellSelected(item, column)\"\n                *ngFor=\"let column of columns; let columnIndex = index; trackBy: trackByColumns;\">\n            </td>\n        </tr>\n        <tr *ngIf=\"isDataItem(item) && isInExpandedGroup(item) && detailTemplate?.templateRef &&\n            detailTemplate.showIf(item.data, item.index) && isExpanded(item)\"\n            class=\"k-detail-row\"\n            [class.k-alt]=\"isOdd(item)\"\n            kendoGridLogicalRow\n                [dataRowIndex]=\"item.index\"\n                [dataItem]=\"item.data\"\n                [logicalRowIndex]=\"logicalRowIndex(rowIndex) + 1\"\n                [logicalSlaveRow]=\"false\"\n                [logicalCellsCount]=\"1\"\n            >\n            <td class=\"k-group-cell\" *ngFor=\"let g of groups\"></td>\n            <td class=\"k-hierarchy-cell\"></td>\n            <td class=\"k-detail-cell\"\n                [attr.colspan]=\"columnsSpan\"\n                kendoGridLogicalCell\n                    [logicalRowIndex]=\"logicalRowIndex(rowIndex) + 1\"\n                    [logicalColIndex]=\"0\"\n                    [dataRowIndex]=\"item.index\"\n                    [dataItem]=\"item.data\"\n                    [colIndex]=\"0\"\n                    [colSpan]=\"allColumnsSpan + 1\"\n                    role=\"gridcell\" aria-selected=\"false\"\n                >\n                <ng-template\n                    [ngTemplateOutlet]=\"detailTemplate.templateRef\"\n                    [ngTemplateOutletContext]=\"{\n                        dataItem: item.data,\n                        rowIndex: item.index,\n                        $implicit: item.data\n                    }\">\n                </ng-template>\n            </td>\n        </tr>\n        <tr *ngIf=\"isFooter(item) && (isInExpandedGroup(item) || (showGroupFooters && isParentGroupExpanded(item)))\n            && !item.data.hideFooter\"\n            class=\"k-group-footer\"\n            kendoGridLogicalRow\n                [logicalRowIndex]=\"logicalRowIndex(rowIndex)\"\n                [logicalSlaveRow]=\"lockedColumnsCount > 0\"\n                [logicalCellsCount]=\"columns.length\"\n                [logicalSlaveCellsCount]=\"unlockedColumnsCount\">\n            <ng-template [ngIf]=\"!skipGroupDecoration\">\n                <td class=\"k-group-cell\" *ngFor=\"let g of groups\"></td>\n            </ng-template>\n            <td class=\"k-hierarchy-cell\"\n                *ngIf=\"detailTemplate?.templateRef\"\n                kendoGridLogicalCell\n                    [logicalRowIndex]=\"logicalRowIndex(rowIndex)\"\n                    [logicalColIndex]=\"0\"\n                    aria-selected=\"false\"\n                >\n            </td>\n            <td kendoGridLogicalCell\n                    [logicalRowIndex]=\"logicalRowIndex(rowIndex)\"\n                    [logicalColIndex]=\"logicalColIndex(column)\"\n                [attr.data-skip]=\"skipGroupDecoration\"\n                *ngFor=\"let column of footerColumns; let columnIndex = index; trackBy: trackByColumns;\">\n                <ng-template\n                    [templateContext]=\"{\n                        templateRef: column.groupFooterTemplateRef,\n                        group: item.data,\n                        field: column.field,\n                        column: column,\n                        aggregates: item.data?.aggregates,\n                        $implicit: item.data?.aggregates\n                    }\">\n                </ng-template>\n           </td>\n        </tr>\n    </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    TableBodyComponent.ctorParameters = function () { return [
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
    ]; };
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
    return TableBodyComponent;
}());

/**
 * @hidden
 */
var CellComponent = /** @class */ (function () {
    function CellComponent(editService, idService, cellContext) {
        this.editService = editService;
        this.idService = idService;
        this.cellContext = cellContext;
        this.isNew = false;
        this._templateContext = {};
        this._editTemplateContext = {};
    }
    Object.defineProperty(CellComponent.prototype, "commandCellClass", {
        get: function () {
            return this.isCommand(this.column);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CellComponent.prototype, "rowIndex", {
        get: function () {
            return this._rowIndex;
        },
        set: function (index) {
            this._rowIndex = index;
            this.updateCellContext();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CellComponent.prototype, "isEdited", {
        get: function () {
            if (!(this.editService.isEditing() || this.isNew) || !this.isColumnEditable) {
                return false;
            }
            var editContext = this.editService.columnContext(this.rowIndex, this.column);
            return this.isFieldEditable(editContext, this.column);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CellComponent.prototype, "formGroup", {
        get: function () {
            return this.editService.context(this.rowIndex).group;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CellComponent.prototype, "templateContext", {
        get: function () {
            return this._templateContext;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CellComponent.prototype, "editTemplateContext", {
        get: function () {
            this._editTemplateContext.$implicit = this.formGroup;
            this._editTemplateContext.isNew = this.isNew;
            this._editTemplateContext.column = this.column;
            this._editTemplateContext.dataItem = this.dataItem;
            this._editTemplateContext.formGroup = this.formGroup;
            this._editTemplateContext.rowIndex = this.rowIndex;
            return this._editTemplateContext;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CellComponent.prototype, "format", {
        get: function () {
            if (isColumnComponent(this.column) && !isNullOrEmptyString(this.column.format)) {
                return extractFormat(this.column.format);
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CellComponent.prototype, "isBoundColumn", {
        get: function () {
            return this.column.field && !this.column.templateRef;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CellComponent.prototype, "isCheckboxColumn", {
        get: function () {
            return isCheckboxColumn(this.column) && !this.column.templateRef;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CellComponent.prototype, "selectionCheckboxId", {
        get: function () {
            return this.idService.selectionCheckboxId(this.rowIndex);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CellComponent.prototype, "isSpanColumn", {
        get: function () {
            return isSpanColumn(this.column) && !this.column.templateRef;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CellComponent.prototype, "childColumns", {
        get: function () {
            return columnsToRender([this.column]);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CellComponent.prototype, "isColumnEditable", {
        get: function () {
            if (!this.column || this.isCommand(this.column)) {
                return false;
            }
            return this.column.editable !== false;
        },
        enumerable: true,
        configurable: true
    });
    CellComponent.prototype.ngDoCheck = function () {
        this.updateCellContext();
    };
    CellComponent.prototype.ngOnChanges = function (_changes) {
        this.updateTemplateContext();
    };
    CellComponent.prototype.isCommand = function (column) {
        return column instanceof CommandColumnComponent;
    };
    CellComponent.prototype.isFieldEditable = function (editContext, column) {
        if (!isPresent(editContext)) {
            return false;
        }
        if (isPresent(column.editTemplate)) {
            return true;
        }
        return isPresent(editContext.group) && isPresent(editContext.group.get(column.field));
    };
    CellComponent.prototype.updateCellContext = function () {
        if (this.cellContext) {
            this.cellContext.rowIndex = this._rowIndex;
        }
    };
    CellComponent.prototype.updateTemplateContext = function () {
        if (!this.column.templateRef) {
            return;
        }
        var context = this._templateContext;
        context.isNew = this.isNew;
        context.column = this.column;
        context.dataItem = this.dataItem;
        context.rowIndex = this.rowIndex;
        context.columnIndex = this.columnIndex;
        context.$implicit = this.dataItem;
    };
    CellComponent.decorators = [
        { type: Component, args: [{
                    selector: '[kendoGridCell]',
                    template: "\n        <ng-container [ngSwitch]=\"isEdited\">\n            <ng-container *ngSwitchCase=\"false\">\n                <ng-template [ngIf]=\"column.templateRef\"\n                    [ngTemplateOutlet]=\"column.templateRef\"\n                    [ngTemplateOutletContext]=\"templateContext\">\n                </ng-template>\n                <ng-template [ngIf]=\"isSpanColumn\">\n                    <ng-template ngFor let-childColumn [ngForOf]=\"childColumns\">\n                        {{ dataItem | valueOf: childColumn.field: childColumn.format}}\n                    </ng-template>\n                </ng-template>\n                <ng-template [ngIf]=\"isBoundColumn\">{{ dataItem | valueOf: column.field: column.format}}</ng-template>\n                <ng-template [ngIf]=\"isCheckboxColumn && !isNew\">\n                    <input class=\"k-checkbox\" [kendoGridSelectionCheckbox]=\"rowIndex\" [attr.id]=\"selectionCheckboxId\"><label class=\"k-checkbox-label\" [attr.for]=\"selectionCheckboxId\"></label>\n                </ng-template>\n            </ng-container>\n            <ng-container *ngSwitchCase=\"true\">\n                <ng-template\n                    *ngIf=\"column.editTemplateRef\"\n                    [ngTemplateOutlet]=\"column.editTemplateRef\"\n                    [ngTemplateOutletContext]=\"editTemplateContext\">\n                </ng-template>\n                <ng-container [ngSwitch]=\"column.editor\" *ngIf=\"!column.editTemplateRef\">\n                    <kendo-numerictextbox\n                        *ngSwitchCase=\"'numeric'\"\n                        [format]=\"format\"\n                        [formControl]=\"formGroup.get(column.field)\"\n                        kendoGridFocusable\n                    ></kendo-numerictextbox>\n\n                    <kendo-datepicker\n                        *ngSwitchCase=\"'date'\"\n                        [format]=\"format\"\n                        [formControl]=\"formGroup.get(column.field)\"\n                        kendoGridFocusable\n                    ></kendo-datepicker>\n\n                    <input\n                        *ngSwitchCase=\"'boolean'\"\n                        type=\"checkbox\"\n                        class=\"k-checkbox\"\n                        [formControl]=\"formGroup.get(column.field)\"\n                        kendoGridFocusable\n                    />\n\n                    <input\n                        *ngSwitchDefault\n                        type=\"text\"\n                        class=\"k-textbox\"\n                        [formControl]=\"formGroup.get(column.field)\"\n                        kendoGridFocusable\n                    />\n                </ng-container>\n            </ng-container>\n        </ng-container>\n    "
                },] },
    ];
    /** @nocollapse */
    CellComponent.ctorParameters = function () { return [
        { type: EditService },
        { type: IdService },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [CELL_CONTEXT,] }] }
    ]; };
    CellComponent.propDecorators = {
        commandCellClass: [{ type: HostBinding, args: ['class.k-command-cell',] }],
        column: [{ type: Input }],
        columnIndex: [{ type: Input }],
        isNew: [{ type: Input }],
        rowIndex: [{ type: Input }],
        dataItem: [{ type: Input }]
    };
    return CellComponent;
}());

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
var EditCommandDirective = /** @class */ (function (_super) {
    __extends(EditCommandDirective, _super);
    function EditCommandDirective(editService, cellContext, element, renderer, localization, ngZone) {
        var _this = _super.call(this, element, renderer, null, localization, ngZone) || this;
        _this.editService = editService;
        _this.cellContext = cellContext;
        /**
         * @hidden
         */
        _this.commandClass = true;
        return _this;
    }
    Object.defineProperty(EditCommandDirective.prototype, "visible", {
        /**
         * @hidden
         */
        get: function () {
            return this.isEdited ? 'none' : '';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    EditCommandDirective.prototype.onClick = function (e) {
        e.preventDefault();
        this.editService.beginEdit(this.rowIndex);
    };
    EditCommandDirective.prototype.ngDoCheck = function () {
        if (this.cellContext) {
            this.rowIndex = this.cellContext.rowIndex;
            this.isEdited = this.editService.isEdited(this.rowIndex);
        }
    };
    EditCommandDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoGridEditCommand]'
                },] },
    ];
    /** @nocollapse */
    EditCommandDirective.ctorParameters = function () { return [
        { type: EditService },
        { type: undefined, decorators: [{ type: Inject, args: [CELL_CONTEXT,] }] },
        { type: ElementRef },
        { type: Renderer2 },
        { type: LocalizationService },
        { type: NgZone }
    ]; };
    EditCommandDirective.propDecorators = {
        visible: [{ type: HostBinding, args: ['style.display',] }],
        commandClass: [{ type: HostBinding, args: ['class.k-grid-edit-command',] }],
        onClick: [{ type: HostListener, args: ['click', ['$event'],] }]
    };
    return EditCommandDirective;
}(Button));

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
var CancelCommandDirective = /** @class */ (function (_super) {
    __extends(CancelCommandDirective, _super);
    function CancelCommandDirective(editService, cellContext, element, renderer, localization, ngZone) {
        var _this = _super.call(this, element, renderer, null, localization, ngZone) || this;
        _this.editService = editService;
        _this.cellContext = cellContext;
        /**
         * @hidden
         */
        _this.commandClass = true;
        return _this;
    }
    Object.defineProperty(CancelCommandDirective.prototype, "visible", {
        /**
         * @hidden
         */
        get: function () {
            return !this.isEdited ? 'none' : '';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    CancelCommandDirective.prototype.onClick = function (e) {
        e.preventDefault();
        if (this.isEdited) {
            this.editService.endEdit(this.rowIndex);
        }
    };
    CancelCommandDirective.prototype.ngDoCheck = function () {
        if (this.cellContext) {
            this.rowIndex = this.cellContext.rowIndex;
            this.isEdited = this.editService.isEdited(this.rowIndex);
        }
    };
    CancelCommandDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoGridCancelCommand]'
                },] },
    ];
    /** @nocollapse */
    CancelCommandDirective.ctorParameters = function () { return [
        { type: EditService },
        { type: undefined, decorators: [{ type: Inject, args: [CELL_CONTEXT,] }] },
        { type: ElementRef },
        { type: Renderer2 },
        { type: LocalizationService },
        { type: NgZone }
    ]; };
    CancelCommandDirective.propDecorators = {
        visible: [{ type: HostBinding, args: ['style.display',] }],
        commandClass: [{ type: HostBinding, args: ['class.k-grid-cancel-command',] }],
        onClick: [{ type: HostListener, args: ['click', ['$event'],] }]
    };
    return CancelCommandDirective;
}(Button));

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
var SaveCommandDirective = /** @class */ (function (_super) {
    __extends(SaveCommandDirective, _super);
    function SaveCommandDirective(editService, cellContext, element, renderer, localization, ngZone) {
        var _this = _super.call(this, element, renderer, null, localization, ngZone) || this;
        _this.editService = editService;
        _this.cellContext = cellContext;
        /**
         * @hidden
         */
        _this.commandClass = true;
        return _this;
    }
    Object.defineProperty(SaveCommandDirective.prototype, "visible", {
        /**
         * @hidden
         */
        get: function () {
            return !this.isEdited ? 'none' : '';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    SaveCommandDirective.prototype.onClick = function (e) {
        e.preventDefault();
        if (this.isEdited) {
            this.editService.save(this.rowIndex);
        }
    };
    SaveCommandDirective.prototype.ngDoCheck = function () {
        if (this.cellContext) {
            this.rowIndex = this.cellContext.rowIndex;
            this.isEdited = this.editService.isEdited(this.rowIndex);
        }
    };
    SaveCommandDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoGridSaveCommand]'
                },] },
    ];
    /** @nocollapse */
    SaveCommandDirective.ctorParameters = function () { return [
        { type: EditService },
        { type: undefined, decorators: [{ type: Inject, args: [CELL_CONTEXT,] }] },
        { type: ElementRef },
        { type: Renderer2 },
        { type: LocalizationService },
        { type: NgZone }
    ]; };
    SaveCommandDirective.propDecorators = {
        visible: [{ type: HostBinding, args: ['style.display',] }],
        commandClass: [{ type: HostBinding, args: ['class.k-grid-save-command',] }],
        onClick: [{ type: HostListener, args: ['click', ['$event'],] }]
    };
    return SaveCommandDirective;
}(Button));

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
var RemoveCommandDirective = /** @class */ (function (_super) {
    __extends(RemoveCommandDirective, _super);
    function RemoveCommandDirective(editService, cellContext, element, renderer, localization, ngZone) {
        var _this = _super.call(this, element, renderer, null, localization, ngZone) || this;
        _this.editService = editService;
        _this.cellContext = cellContext;
        /**
         * @hidden
         */
        _this.commandClass = true;
        return _this;
    }
    Object.defineProperty(RemoveCommandDirective.prototype, "visible", {
        /**
         * @hidden
         */
        get: function () {
            return this.isEdited ? 'none' : '';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    RemoveCommandDirective.prototype.onClick = function (e) {
        e.preventDefault();
        this.editService.remove(this.rowIndex);
    };
    RemoveCommandDirective.prototype.ngDoCheck = function () {
        if (this.cellContext) {
            this.rowIndex = this.cellContext.rowIndex;
            this.isEdited = this.editService.isEdited(this.rowIndex);
        }
    };
    RemoveCommandDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoGridRemoveCommand]'
                },] },
    ];
    /** @nocollapse */
    RemoveCommandDirective.ctorParameters = function () { return [
        { type: EditService },
        { type: undefined, decorators: [{ type: Inject, args: [CELL_CONTEXT,] }] },
        { type: ElementRef },
        { type: Renderer2 },
        { type: LocalizationService },
        { type: NgZone }
    ]; };
    RemoveCommandDirective.propDecorators = {
        visible: [{ type: HostBinding, args: ['style.display',] }],
        commandClass: [{ type: HostBinding, args: ['class.k-grid-remove-command',] }],
        onClick: [{ type: HostListener, args: ['click', ['$event'],] }]
    };
    return RemoveCommandDirective;
}(Button));

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
var AddCommandDirective = /** @class */ (function (_super) {
    __extends(AddCommandDirective, _super);
    function AddCommandDirective(editService, element, renderer, localization, ngZone) {
        var _this = _super.call(this, element, renderer, null, localization, ngZone) || this;
        _this.editService = editService;
        return _this;
    }
    /**
     * @hidden
     */
    AddCommandDirective.prototype.onClick = function (e) {
        e.preventDefault();
        this.editService.beginAdd();
    };
    Object.defineProperty(AddCommandDirective.prototype, "commandClass", {
        /**
         * @hidden
         */
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    AddCommandDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoGridAddCommand]'
                },] },
    ];
    /** @nocollapse */
    AddCommandDirective.ctorParameters = function () { return [
        { type: EditService },
        { type: ElementRef },
        { type: Renderer2 },
        { type: LocalizationService },
        { type: NgZone }
    ]; };
    AddCommandDirective.propDecorators = {
        onClick: [{ type: HostListener, args: ['click', ['$event'],] }],
        commandClass: [{ type: HostBinding, args: ['class.k-grid-add-command',] }]
    };
    return AddCommandDirective;
}(Button));

var exported$1 = [
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
var importedModules$3 = [
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
var BodyModule = /** @class */ (function () {
    function BodyModule() {
    }
    BodyModule.exports = function () {
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
    };
    BodyModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [exported$1],
                    exports: [exported$1],
                    imports: importedModules$3.slice()
                },] },
    ];
    return BodyModule;
}());

/**
 * @hidden
 */
var FooterComponent = /** @class */ (function () {
    function FooterComponent() {
        this.columns = [];
        this.groups = [];
        this.lockedColumnsCount = 0;
        this.logicalRowIndex = 0;
    }
    Object.defineProperty(FooterComponent.prototype, "footerClass", {
        get: function () {
            return !this.scrollable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FooterComponent.prototype, "columnsToRender", {
        get: function () {
            return columnsToRender(this.columns || []);
        },
        enumerable: true,
        configurable: true
    });
    FooterComponent.prototype.logicalColumnIndex = function (column) {
        var index = column.leafIndex;
        if (isPresent(index)) {
            return index + (isPresent(this.detailTemplate) ? 1 : 0);
        }
        return -1;
    };
    FooterComponent.decorators = [
        { type: Component, args: [{
                    selector: '[kendoGridFooter]',
                    template: "\n    <ng-template [ngIf]=\"true\">\n        <tr\n            [class.k-footer-template]=\"true\"\n            kendoGridLogicalRow\n                [logicalRowIndex]=\"logicalRowIndex\"\n                [logicalSlaveRow]=\"lockedColumnsCount > 0\"\n                [logicalCellsCount]=\"columns.length\"\n                [logicalSlaveCellsCount]=\"columns.length - lockedColumnsCount\"\n            >\n            <td\n                [class.k-group-cell]=\"true\"\n                role=\"presentation\"\n                *ngFor=\"let g of groups\">\n            </td>\n            <td\n                [class.k-hierarchy-cell]=\"true\"\n                role=\"presentation\"\n                *ngIf=\"detailTemplate?.templateRef\">\n            </td>\n            <td\n                *ngFor=\"let column of columnsToRender; let columnIndex = index\"\n                kendoGridLogicalCell\n                    [logicalRowIndex]=\"logicalRowIndex\"\n                    [logicalColIndex]=\"logicalColumnIndex(column)\"\n                    role=\"columnfooter\"\n                    aria-selected=\"false\"\n                [ngClass]=\"column.footerClass\"\n                [ngStyle]=\"column.footerStyle\">\n                <ng-template\n                    [templateContext]=\"{\n                        templateRef: column.footerTemplateRef,\n                        columnIndex: lockedColumnsCount + columnIndex,\n                        column: column,\n                        $implicit: column\n                    }\">\n                </ng-template>\n            </td>\n        </tr>\n    </ng-template>\n    "
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
    return FooterComponent;
}());

var exportedModules$3 = [
    FooterComponent
];
var importedModules$4 = [
    CommonModule,
    SharedModule
];
/**
 * @hidden
 */
var FooterModule = /** @class */ (function () {
    function FooterModule() {
    }
    FooterModule.exports = function () {
        return [];
    };
    FooterModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [exportedModules$3],
                    exports: [exportedModules$3],
                    imports: importedModules$4.slice()
                },] },
    ];
    return FooterModule;
}());

/**
 * @hidden
 */
var ToolbarComponent = /** @class */ (function () {
    function ToolbarComponent(grid) {
        this.grid = grid;
        this.context = {};
    }
    Object.defineProperty(ToolbarComponent.prototype, "classNames", {
        get: function () {
            return 'k-header k-grid-toolbar';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToolbarComponent.prototype, "position", {
        set: function (value) {
            this.context.position = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToolbarComponent.prototype, "toolbarTemplateRef", {
        get: function () {
            return this.grid.toolbarTemplate ? this.grid.toolbarTemplate.templateRef : undefined;
        },
        enumerable: true,
        configurable: true
    });
    ToolbarComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-grid-toolbar',
                    template: "\n        <ng-template\n            *ngIf=\"toolbarTemplateRef\"\n            [ngTemplateOutlet]=\"toolbarTemplateRef\"\n            [ngTemplateOutletContext]=\"context\"\n            >\n        </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    ToolbarComponent.ctorParameters = function () { return [
        { type: GridComponent }
    ]; };
    ToolbarComponent.propDecorators = {
        classNames: [{ type: HostBinding, args: ['class',] }],
        position: [{ type: Input }]
    };
    return ToolbarComponent;
}());

/**
 * @hidden
 */
var LocalEditService = /** @class */ (function () {
    function LocalEditService(grid, localDataChangesService) {
        this.grid = grid;
        this.localDataChangesService = localDataChangesService;
    }
    LocalEditService.prototype.create = function (item) {
        if (this.hasLocalData && this.grid.skip) {
            this.localDataChangesService.data.splice(this.grid.skip, 0, item);
        }
        else {
            this.data.unshift(item);
        }
        this.dataChanged();
    };
    LocalEditService.prototype.update = function (_item) { }; // tslint:disable-line:no-empty
    LocalEditService.prototype.remove = function (item) {
        var data = this.data;
        for (var idx = 0; idx < data.length; idx++) {
            if (item === data[idx]) {
                data.splice(idx, 1);
                this.dataChanged({ action: 'remove', item: item });
                break;
            }
        }
    };
    LocalEditService.prototype.assignValues = function (target, source) {
        Object.assign(target, source);
    };
    LocalEditService.prototype.dataChanged = function (args) {
        if (args === void 0) { args = {}; }
        if (this.hasLocalData) {
            this.localDataChangesService.changes.emit(args);
        }
    };
    Object.defineProperty(LocalEditService.prototype, "hasLocalData", {
        get: function () {
            return Array.isArray(this.localDataChangesService.data);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocalEditService.prototype, "data", {
        get: function () {
            if (this.hasLocalData) {
                return this.localDataChangesService.data;
            }
            var data = this.grid.data;
            if (Array.isArray(data)) {
                return data;
            }
            if (isDevMode()) {
                throw new Error('The default edit service of the editing directives works only when binding to plain array.' +
                    'Please provide an editService.');
            }
            return [];
        },
        enumerable: true,
        configurable: true
    });
    return LocalEditService;
}());

/**
 * @hidden
 */
var EditingDirectiveBase = /** @class */ (function () {
    function EditingDirectiveBase(grid, localDataChangesService) {
        this.grid = grid;
        this.localDataChangesService = localDataChangesService;
        this.defaultEditService = this.createDefaultService();
    }
    Object.defineProperty(EditingDirectiveBase.prototype, "editService", {
        get: function () {
            return this.userEditService || this.defaultEditService;
        },
        // Consider adding support for the dependency injection of the service to allow for specifying a generic service without code.
        // The Input should still be kept.
        /**
         * The edit service that will handle the operations.
         */
        set: function (value) {
            this.userEditService = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    EditingDirectiveBase.prototype.ngOnInit = function () {
        this.subscriptions = this.grid.add.subscribe(this.addHandler.bind(this));
        this.subscriptions.add(this.grid.remove.subscribe(this.removeHandler.bind(this)));
        this.subscriptions.add(this.grid.cancel.subscribe(this.cancelHandler.bind(this)));
        this.subscriptions.add(this.grid.save.subscribe(this.saveHandler.bind(this)));
        this.subscriptions.add(this.grid.dataStateChange.subscribe(this.onStateChange.bind(this)));
    };
    /**
     * @hidden
     */
    EditingDirectiveBase.prototype.ngOnDestroy = function () {
        this.subscriptions.unsubscribe();
    };
    EditingDirectiveBase.prototype.createDefaultService = function () {
        return new LocalEditService(this.grid, this.localDataChangesService);
    };
    EditingDirectiveBase.prototype.addHandler = function () {
        this.grid.addRow(this.createModel({ isNew: true }));
    };
    EditingDirectiveBase.prototype.saveHandler = function (args) {
        var item = this.saveModel(args);
        if (item) {
            if (args.isNew) {
                this.editService.create(item);
            }
            else {
                this.editService.update(item);
            }
        }
        this.grid.closeRow(args.rowIndex);
    };
    EditingDirectiveBase.prototype.cancelHandler = function (_a) {
        var rowIndex = _a.rowIndex;
        this.closeEditor(rowIndex);
    };
    EditingDirectiveBase.prototype.removeHandler = function (_a) {
        var _this = this;
        var dataItem = _a.dataItem;
        var removeItem = function (shouldRemove) {
            if (shouldRemove) {
                _this.editService.remove(dataItem);
            }
        };
        if (this.removeConfirmation) {
            var result = this.removeConfirmation(dataItem);
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
    };
    EditingDirectiveBase.prototype.onStateChange = function () {
        this.closeEditor();
    };
    EditingDirectiveBase.prototype.closeEditor = function (rowIndex) {
        this.grid.closeRow(rowIndex);
    };
    EditingDirectiveBase.propDecorators = {
        editService: [{ type: Input }],
        removeConfirmation: [{ type: Input }]
    };
    return EditingDirectiveBase;
}());

/**
 * @hidden
 */
var LocalRowEditService = /** @class */ (function (_super) {
    __extends(LocalRowEditService, _super);
    function LocalRowEditService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LocalRowEditService.prototype.update = function (_item) {
        this.dataChanged();
    };
    return LocalRowEditService;
}(LocalEditService));

/**
 * @hidden
 */
var RowEditingDirectiveBase = /** @class */ (function (_super) {
    __extends(RowEditingDirectiveBase, _super);
    function RowEditingDirectiveBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @hidden
     */
    RowEditingDirectiveBase.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        this.subscriptions
            .add(this.grid.edit.subscribe(this.editHandler.bind(this)));
    };
    RowEditingDirectiveBase.prototype.createDefaultService = function () {
        return new LocalRowEditService(this.grid, this.localDataChangesService);
    };
    RowEditingDirectiveBase.prototype.addHandler = function () {
        this.closeEditor();
        _super.prototype.addHandler.call(this);
    };
    RowEditingDirectiveBase.prototype.editHandler = function (args) {
        this.closeEditor();
        this.rowIndex = args.rowIndex;
        this.grid.editRow(args.rowIndex, this.createModel(args));
    };
    RowEditingDirectiveBase.prototype.saveHandler = function (args) {
        _super.prototype.saveHandler.call(this, args);
        this.clean();
    };
    RowEditingDirectiveBase.prototype.closeEditor = function (rowIndex) {
        if (rowIndex === void 0) { rowIndex = this.rowIndex; }
        _super.prototype.closeEditor.call(this, rowIndex);
        this.clean();
    };
    RowEditingDirectiveBase.prototype.clean = function () {
        delete this.rowIndex;
    };
    return RowEditingDirectiveBase;
}(EditingDirectiveBase));

/**
 * A directive which encapsulates the editing operations of the Grid when using
 * the Template-Driven Angular Forms ([see example]({% slug editing_directives_grid %}#toc-the-template-directive)).
 */
var TemplateEditingDirective = /** @class */ (function (_super) {
    __extends(TemplateEditingDirective, _super);
    function TemplateEditingDirective(grid, localDataChangesService) {
        var _this = _super.call(this, grid, localDataChangesService) || this;
        _this.grid = grid;
        _this.localDataChangesService = localDataChangesService;
        return _this;
    }
    TemplateEditingDirective.prototype.editHandler = function (args) {
        _super.prototype.editHandler.call(this, args);
        this.dataItem = args.dataItem;
        this.originalValues = {};
        this.editService.assignValues(this.originalValues, this.dataItem);
    };
    TemplateEditingDirective.prototype.closeEditor = function (rowIndex) {
        if (this.dataItem) {
            this.editService.assignValues(this.dataItem, this.originalValues);
        }
        _super.prototype.closeEditor.call(this, rowIndex);
    };
    TemplateEditingDirective.prototype.createModel = function (args) {
        if (args.isNew) {
            return this.createNewItem();
        }
    };
    TemplateEditingDirective.prototype.saveModel = function (args) {
        return args.dataItem;
    };
    TemplateEditingDirective.prototype.clean = function () {
        _super.prototype.clean.call(this);
        delete this.dataItem;
    };
    TemplateEditingDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoGridTemplateEditing]'
                },] },
    ];
    /** @nocollapse */
    TemplateEditingDirective.ctorParameters = function () { return [
        { type: GridComponent },
        { type: LocalDataChangesService }
    ]; };
    TemplateEditingDirective.propDecorators = {
        createNewItem: [{ type: Input, args: ['kendoGridTemplateEditing',] }]
    };
    return TemplateEditingDirective;
}(RowEditingDirectiveBase));

/**
 * @hidden
 */
var markAllAsTouched = function (control) {
    control.markAsTouched();
    if (control.hasOwnProperty('controls')) {
        var controls = control.controls;
        for (var inner in controls) {
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
var ReactiveEditingDirective = /** @class */ (function (_super) {
    __extends(ReactiveEditingDirective, _super);
    function ReactiveEditingDirective(grid, localDataChangesService) {
        var _this = _super.call(this, grid, localDataChangesService) || this;
        _this.grid = grid;
        _this.localDataChangesService = localDataChangesService;
        return _this;
    }
    ReactiveEditingDirective.prototype.createModel = function (args) {
        return this.createFormGroup(args);
    };
    ReactiveEditingDirective.prototype.saveModel = function (_a) {
        var dataItem = _a.dataItem, formGroup = _a.formGroup, isNew = _a.isNew;
        if (!formGroup.dirty && !isNew) {
            return;
        }
        if (formGroup.valid) {
            this.editService.assignValues(dataItem, formGroup.value);
            return dataItem;
        }
        markAllAsTouched(formGroup);
    };
    ReactiveEditingDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoGridReactiveEditing]'
                },] },
    ];
    /** @nocollapse */
    ReactiveEditingDirective.ctorParameters = function () { return [
        { type: GridComponent },
        { type: LocalDataChangesService }
    ]; };
    ReactiveEditingDirective.propDecorators = {
        createFormGroup: [{ type: Input, args: ['kendoGridReactiveEditing',] }]
    };
    return ReactiveEditingDirective;
}(RowEditingDirectiveBase));

/**
 * A directive which encapsulates the editing operations of the Grid when using the in-cell
 * editing with Reactive Forms ([see example]({% slug editing_directives_grid %}#toc-the-incell-directive)).
 */
var InCellEditingDirective = /** @class */ (function (_super) {
    __extends(InCellEditingDirective, _super);
    function InCellEditingDirective(grid, localDataChangesService) {
        var _this = _super.call(this, grid, localDataChangesService) || this;
        _this.grid = grid;
        _this.localDataChangesService = localDataChangesService;
        return _this;
    }
    // Need mixin
    InCellEditingDirective.prototype.createModel = function (args) {
        return this.createFormGroup(args);
    };
    InCellEditingDirective.prototype.saveModel = function (_a) {
        var dataItem = _a.dataItem, formGroup = _a.formGroup, isNew = _a.isNew;
        if (!formGroup.dirty && !isNew) {
            return;
        }
        if (formGroup.valid) {
            this.editService.assignValues(dataItem, formGroup.value);
            return dataItem;
        }
        markAllAsTouched(formGroup);
    };
    /**
     * @hidden
     */
    InCellEditingDirective.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        this.subscriptions.add(this.grid.cellClick.subscribe(this.cellClickHandler.bind(this)));
        this.subscriptions.add(this.grid.cellClose.subscribe(this.cellCloseHandler.bind(this)));
    };
    InCellEditingDirective.prototype.removeHandler = function (args) {
        _super.prototype.removeHandler.call(this, args);
        this.grid.cancelCell();
    };
    InCellEditingDirective.prototype.cellClickHandler = function (args) {
        if (!args.isEdited && args.type !== 'contextmenu') {
            this.grid.editCell(args.rowIndex, args.columnIndex, this.createFormGroup(args));
        }
    };
    InCellEditingDirective.prototype.cellCloseHandler = function (args) {
        var formGroup = args.formGroup, dataItem = args.dataItem;
        if (!formGroup.valid) {
            args.preventDefault();
        }
        else if (formGroup.dirty) {
            this.editService.assignValues(dataItem, formGroup.value);
            this.editService.update(dataItem);
        }
    };
    InCellEditingDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoGridInCellEditing]'
                },] },
    ];
    /** @nocollapse */
    InCellEditingDirective.ctorParameters = function () { return [
        { type: GridComponent },
        { type: LocalDataChangesService }
    ]; };
    InCellEditingDirective.propDecorators = {
        createFormGroup: [{ type: Input, args: ['kendoGridInCellEditing',] }]
    };
    return InCellEditingDirective;
}(EditingDirectiveBase));

var hasGroups = function (items) { return items && items.length && items[0].field && items[0].items; };
var groupDescriptorsPresent = function (descriptors) { return isPresent(descriptors) && descriptors.length > 0; };
var processGroups = function (data, state$$1) { return process(data, state$$1).data; };
var removeParentDescriptors = function (parents, owner) { return function (g) { return g.field !== owner.field && !parents.some(function (y) { return y.field === g.field; }); }; };
var findGroup = function (groupIndex, groups) {
    var parents = [];
    return {
        group: groupIndex.split("_").reduce(function (acc, x) {
            var idx = parseInt(x, 10);
            if (acc.items) {
                parents.push(acc);
                return acc.items[idx];
            }
            return isArray(acc) ? acc[idx] : acc;
        }, groups),
        parents: parents
    };
};
var findChildren = function (data, parents) {
    var filters = parents.map(function (p) { return ({ field: p.field, operator: "eq", value: p.value }); });
    return filterBy(data, {
        filters: filters,
        logic: "and"
    });
};
/**
 * @hidden
 */
var count = function (groups, includeFooters) {
    if (includeFooters === void 0) { includeFooters = false; }
    return (groups.reduce(function (acc, group) {
        if (!group.skipHeader) {
            acc++;
        }
        if (group.items) {
            var children = count(group.items, includeFooters);
            if (includeFooters && children && !group.hideFooter) {
                acc++;
            }
            acc += children;
        }
        return acc;
    }, 0) // tslint:disable-line:align
    );
};
/**
 * @hidden
 */
var slice = function (groups, skip, take$$1, includeFooters) {
    if (includeFooters === void 0) { includeFooters = false; }
    if (!isPresent(take$$1)) {
        return groups;
    }
    var result = [];
    for (var idx = 0, length_1 = groups.length; idx < length_1; idx++) {
        if (take$$1 <= 0) {
            break;
        }
        var group = groups[idx];
        var groupItems = group.items;
        var itemCount = count(groupItems, includeFooters);
        if (includeFooters && groupItems.length) {
            itemCount++;
        }
        var skipHeader = skip > 0;
        if (skip) {
            skip--;
            if (itemCount && skip >= itemCount) {
                skip -= itemCount;
                continue;
            }
        }
        if (!skipHeader || itemCount) {
            var items = [];
            var hideFooter = true;
            if (!skipHeader) {
                take$$1--;
            }
            if (take$$1) {
                if (hasGroups(groupItems)) {
                    var children = slice(groupItems, skip, take$$1, includeFooters);
                    items.push.apply(items, children);
                    take$$1 -= count(children, includeFooters);
                }
                else {
                    items.push.apply(items, groupItems.slice(skip, Math.min(skip + take$$1, groupItems.length)));
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
                hideFooter: hideFooter,
                items: items,
                offset: idx,
                skipHeader: skipHeader,
                value: group.value
            });
        }
    }
    return result;
};
var skippedHeaders = function (groupItem) {
    var total = 0;
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
var GroupBindingDirective = /** @class */ (function (_super) {
    __extends(GroupBindingDirective, _super);
    function GroupBindingDirective(grid, changeDetector, localDataChangesService) {
        return _super.call(this, grid, changeDetector, localDataChangesService) || this;
    }
    Object.defineProperty(GroupBindingDirective.prototype, "kendoGridGroupBinding", {
        /**
         * The array of data which will be used to populate the Grid.
         */
        set: function (value) {
            this.groups = null;
            this.grid.resetGroupsState();
            this.data = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GroupBindingDirective.prototype, "data", {
        /**
         * @hidden
         */
        set: function (value) {
            this.originalData = value || [];
            this.dataChanged = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GroupBindingDirective.prototype, "sort", {
        /**
         * Defines the descriptors by which the data will be sorted.
         */
        set: function (value) {
            var clear = this.state.sort !== value;
            this.grid.sort = this.state.sort = value;
            if (clear) {
                this.groups = null;
                this.grid.resetGroupsState();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GroupBindingDirective.prototype, "filter", {
        /**
         * Defines the descriptor by which the data will be filtered.
         */
        set: function (value) {
            var clear = diffFilters(this.state.filter, value);
            if (clear) {
                this.state.filter = value;
                this.grid.filter = cloneFilters(value);
                this.groups = null;
                this.grid.resetGroupsState();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GroupBindingDirective.prototype, "group", {
        /**
         * Defines the descriptors by which the data will be grouped.
         */
        set: function (value) {
            // don't clear if no groups are present in previous and current value
            var groupsPresent = groupDescriptorsPresent(this.state.group) || groupDescriptorsPresent(value);
            var clear = this.state.group !== value && groupsPresent;
            this.grid.group = this.state.group = value;
            if (clear) {
                this.groups = null;
                this.grid.resetGroupsState();
                this.skip = 0;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    GroupBindingDirective.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        this.grid.groupExpand.subscribe(this.groupExpand.bind(this));
        this.grid.groupCollapse.subscribe(this.groupCollapse.bind(this));
    };
    GroupBindingDirective.prototype.groupExpand = function (_a) {
        var groupIndex = _a.groupIndex;
        this.grid.expandGroupChildren(groupIndex);
        var _b = findGroup(groupIndex, this.groups), group = _b.group, parents = _b.parents;
        if (!group.items.length) {
            var descriptors = this.state.group.filter(removeParentDescriptors(parents, group));
            var children = findChildren(this.originalData, parents.concat(group));
            group.items = processGroups(children, {
                filter: this.state.filter,
                group: descriptors,
                sort: this.state.sort
            });
        }
        this.grid.data = this.dataResult(this.state.skip, this.state.take);
    };
    GroupBindingDirective.prototype.groupCollapse = function (_a) {
        var groupIndex = _a.groupIndex;
        var group = findGroup(groupIndex, this.groups).group;
        if (group) {
            group.items = [];
        }
        this.grid.data = this.dataResult(this.state.skip, this.state.take);
    };
    GroupBindingDirective.prototype.process = function (state$$1) {
        if (state$$1.group && state$$1.group.length) {
            var groups = this.processGroups(state$$1);
            this.grid.skip -= skippedHeaders(groups.data[0]);
            return groups;
        }
        else {
            this.groups = null;
        }
        return _super.prototype.process.call(this, state$$1);
    };
    GroupBindingDirective.prototype.processGroups = function (state$$1) {
        if (!this.groups || !this.groups.length) {
            this.groups = processGroups(this.originalData, {
                filter: state$$1.filter,
                group: state$$1.group,
                sort: state$$1.sort
            });
        }
        return this.dataResult(state$$1.skip, state$$1.take);
    };
    GroupBindingDirective.prototype.dataResult = function (skip, take$$1) {
        var includeFooters = this.grid.showGroupFooters;
        return {
            data: slice(this.groups, skip, take$$1, includeFooters),
            total: count(this.groups, includeFooters)
        };
    };
    GroupBindingDirective.prototype.applyState = function (_a) {
        var skip = _a.skip, take$$1 = _a.take, sort = _a.sort, group = _a.group, filter$$1 = _a.filter;
        this.skip = skip;
        this.state.take = take$$1;
        // this.pageSize = take; // do need to update take as the process with slice correctly
        this.sort = sort;
        this.group = group;
        this.filter = filter$$1;
    };
    GroupBindingDirective.decorators = [
        { type: Directive, args: [{ selector: '[kendoGridGroupBinding]' },] },
    ];
    /** @nocollapse */
    GroupBindingDirective.ctorParameters = function () { return [
        { type: GridComponent },
        { type: ChangeDetectorRef },
        { type: LocalDataChangesService }
    ]; };
    GroupBindingDirective.propDecorators = {
        kendoGridGroupBinding: [{ type: Input, args: ["kendoGridGroupBinding",] }],
        sort: [{ type: Input }],
        filter: [{ type: Input }],
        group: [{ type: Input }]
    };
    return GroupBindingDirective;
}(DataBindingDirective));

var exportedModules$4 = [
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
    ExpandDetailsDirective
].concat(GroupModule.exports(), SharedModule.exports(), BodyModule.exports(), HeaderModule.exports(), FooterModule.exports(), PagerModule.exports(), RowFilterModule.exports(), FilterMenuModule.exports(), ColumnMenuModule.exports());
var declarations = [
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
var GridModule = /** @class */ (function () {
    function GridModule() {
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
    return GridModule;
}());

var PDFMarginComponent$1 = /** @class */ (function (_super) {
    __extends(PDFMarginComponent$$1, _super);
    function PDFMarginComponent$$1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PDFMarginComponent$$1.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-grid-pdf-margin',
                    template: ''
                },] },
    ];
    return PDFMarginComponent$$1;
}(PDFMarginComponent));

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
var PDFTemplateDirective$1 = /** @class */ (function (_super) {
    __extends(PDFTemplateDirective$$1, _super);
    function PDFTemplateDirective$$1(templateRef) {
        return _super.call(this, templateRef) || this;
    }
    PDFTemplateDirective$$1.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoGridPDFTemplate]'
                },] },
    ];
    /** @nocollapse */
    PDFTemplateDirective$$1.ctorParameters = function () { return [
        { type: TemplateRef, decorators: [{ type: Optional }] }
    ]; };
    return PDFTemplateDirective$$1;
}(PDFTemplateDirective));

/**
 * @hidden
 */
var HEADER_CLASS = 'k-grid-header';
/**
 * @hidden
 */
var FOOTER_CLASS = 'k-grid-footer';
var GRID_LIST = 'KENDO-GRID-LIST';
var TABLE = 'TABLE';
var matchesList = matchesNodeName(GRID_LIST);
var matchesTable = matchesNodeName(TABLE);
var suffix = function (locked) { return locked ? 'locked' : 'wrap'; };
/**
 * @hidden
 */
var GridQuery = /** @class */ (function () {
    function GridQuery(element) {
        this.element = element;
        this.list = findElement(element, matchesList);
    }
    GridQuery.prototype.content = function (locked) {
        return findElement(this.list, matchesClasses("k-grid-content" + (locked ? '-locked' : '')));
    };
    GridQuery.prototype.header = function (locked) {
        this.headerWrap = this.headerWrap || findElement(this.element, matchesClasses(HEADER_CLASS));
        return findElement(this.headerWrap, matchesClasses(HEADER_CLASS + "-" + suffix(locked)));
    };
    GridQuery.prototype.footer = function (locked) {
        this.footerWrap = this.footerWrap || findElement(this.element, matchesClasses(FOOTER_CLASS));
        return findElement(this.footerWrap, matchesClasses(FOOTER_CLASS + "-" + suffix(locked)));
    };
    GridQuery.prototype.table = function () {
        return findElement(this.element, matchesTable);
    };
    return GridQuery;
}());

var FIRST_CLASS = 'k-first';
var INPUTS = ['input', 'select', 'textarea', 'option'];
/** @hidden */
var cloneNode = function (node) {
    var clone = node.cloneNode(false);
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
    var child = node.firstChild;
    while (child) {
        clone.appendChild(cloneNode(child));
        child = child.nextSibling;
    }
    return clone;
};
var appendNodes = function (element, nodes) {
    var length = nodes.length;
    for (var idx = 0; idx < length; idx++) {
        element.appendChild(cloneNode(nodes[idx]));
    }
};
var wrapTable = function (table) {
    var wrapper = document.createElement('div');
    wrapper.className = 'k-widget k-grid';
    wrapper.appendChild(table);
    return wrapper;
};
var createTableElement = function (sources) {
    var sourceCount = sources.length;
    var element = cloneNode(sources[0]);
    var rowsCount = element.rows.length;
    if (sourceCount > 1) {
        for (var rowIdx = 0; rowIdx < rowsCount; rowIdx++) {
            for (var sourceIdx = 1; sourceIdx < sourceCount; sourceIdx++) {
                appendNodes(element.rows[rowIdx], sources[sourceIdx].rows[rowIdx].cells);
            }
        }
    }
    return element;
};
var setFirstCellClass = function (header, headers) {
    if (headers.length > 1 && header.rows.length > 1) {
        for (var idx = 1; idx < header.rows.length; idx++) {
            var firstCellIndex = headers[0].rows[idx].cells.length;
            var cell = header.rows[idx].cells[firstCellIndex];
            if (String(cell.className).indexOf(FIRST_CLASS) === -1) {
                cell.className += " " + FIRST_CLASS;
            }
        }
    }
};
var createTable = function (colGroups, headers, bodies, footers) {
    var table = document.createElement('table');
    var colGroup = colGroups[0].cloneNode(true);
    for (var idx = 1; idx < colGroups.length; idx++) {
        appendNodes(colGroup, colGroups[idx].querySelectorAll('col'));
    }
    var header = createTableElement(headers);
    var body = createTableElement(bodies);
    header.className = HEADER_CLASS;
    setFirstCellClass(header, headers);
    table.appendChild(colGroup);
    table.appendChild(header);
    table.appendChild(body);
    if (footers.length) {
        var footer = createTableElement(footers);
        footer.className = FOOTER_CLASS;
        table.appendChild(footer);
    }
    return wrapTable(table);
};
/**
 * @hidden
 */
var exportElement = function (wrapper) {
    var query = new GridQuery(wrapper);
    var content = query.content();
    var result;
    if (content) {
        var colGroups = [content.querySelector('colgroup')];
        var headers = [query.header().querySelector('thead')];
        var bodies = [content.querySelector('tbody')];
        var footer = query.footer();
        var footers = [];
        if (footer) {
            footers.push(footer.querySelector('tfoot'));
        }
        var lockedContent = query.content(true);
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

var createElement$1 = function (tagName, className) {
    var element = document.createElement(tagName);
    if (className) {
        element.className = className;
    }
    return element;
};
var createDiv = function (className) {
    return createElement$1('div', className);
};
/**
 * Configures the settings for the export of Grid in PDF ([see example]({% slug pdfexport_grid %})).
 */
var PDFComponent = /** @class */ (function (_super) {
    __extends(PDFComponent, _super);
    function PDFComponent(pdfService, suspendService, ngZone, element) {
        var _this = _super.call(this, element) || this;
        _this.pdfService = pdfService;
        _this.suspendService = suspendService;
        _this.ngZone = ngZone;
        _this.columns = new QueryList();
        _this.saveSubscription = pdfService.savePDF.subscribe(_this.savePDF.bind(_this));
        _this.drawSubscription = pdfService.drawPDF.subscribe(_this.drawPDF.bind(_this));
        _this.reset = _this.reset.bind(_this);
        _this.draw = _this.draw.bind(_this);
        return _this;
    }
    PDFComponent.prototype.ngOnDestroy = function () {
        this.saveSubscription.unsubscribe();
        this.drawSubscription.unsubscribe();
        this.reset();
    };
    PDFComponent.prototype.savePDF = function (component) {
        this.createPDF(component, this.draw);
    };
    PDFComponent.prototype.drawPDF = function (_a) {
        var _this = this;
        var component = _a.component, promise = _a.promise;
        this.createPDF(component, function () {
            _this.createExportGroup(promise);
        });
    };
    PDFComponent.prototype.createPDF = function (component, callback) {
        var pageSize = component.pageSize;
        var total = component.view.total;
        var columns = this.columns.toArray();
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
    };
    PDFComponent.prototype.initProgress = function () {
        var wrapperElement = this.component.wrapper.nativeElement;
        var progress = this.progress = createDiv('k-loading-pdf-mask');
        var overlay = cloneNode(wrapperElement);
        progress.appendChild(overlay);
        progress.appendChild(createDiv('k-loading-color'));
        progress.appendChild(createElement$1('span', 'k-i-loading k-icon'));
        this.originalHeight = wrapperElement.style.height;
        this.originalOverflow = wrapperElement.style.overflow;
        wrapperElement.style.height = wrapperElement.offsetHeight + 'px';
        wrapperElement.style.overflow = 'hidden';
        wrapperElement.appendChild(progress);
        this.applyScroll(overlay);
    };
    PDFComponent.prototype.applyScroll = function (overlay) {
        var query = new GridQuery(this.component.wrapper.nativeElement);
        var content = query.content();
        if (content) {
            var overlayQuery = new GridQuery(overlay);
            var overlayContent = overlayQuery.content();
            overlayContent.scrollTop = content.scrollTop;
            overlayContent.scrollLeft = content.scrollLeft;
            overlayQuery.header().scrollLeft = query.header().scrollLeft;
            var footer = query.footer();
            if (footer) {
                overlayQuery.footer().scrollLeft = footer.scrollLeft;
            }
            var lockedContent = query.content(true);
            if (lockedContent) {
                var overlayLockedContent = overlayQuery.content(true);
                overlayLockedContent.scrollTop = lockedContent.scrollTop;
                overlayLockedContent.scrollLeft = lockedContent.scrollLeft;
            }
        }
    };
    PDFComponent.prototype.draw = function () {
        var _this = this;
        this.createExportElement(function (element) {
            _this.save(element, _this.fileName);
        });
    };
    PDFComponent.prototype.createExportGroup = function (promise) {
        var _this = this;
        this.createExportElement(function (element) {
            _this.exportElement(element).then(function (group) { return promise.resolve(group); });
        });
    };
    PDFComponent.prototype.createExportElement = function (callback) {
        var _this = this;
        this.ngZone.runOutsideAngular(function () {
            var container = _this.container = createDiv('k-grid-pdf-export-element');
            var element = exportElement(_this.component.wrapper.nativeElement);
            container.appendChild(element);
            document.body.appendChild(container);
            callback(element);
        });
    };
    PDFComponent.prototype.drawOptions = function () {
        var options = _super.prototype.drawOptions.call(this);
        options._destructive = true;
        return options;
    };
    PDFComponent.prototype.cleanup = function () {
        _super.prototype.cleanup.call(this);
        this.pdfService.exporting = false;
        if (this.component) {
            var originalColumns = this.originalColumns;
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
    };
    PDFComponent.prototype.removeContainer = function () {
        if (this.container) {
            document.body.removeChild(this.container);
            delete this.container;
        }
    };
    PDFComponent.prototype.changePage = function (skip, _take, callback, columns) {
        var _this = this;
        this.ngZone.run(function () {
            _this.pdfService.dataChanged.pipe(take(1)).subscribe(function () {
                if ((columns && columns.length) || _this.component.virtualColumns) {
                    _this.changeColumns(columns, callback);
                }
                else {
                    _this.onStable(callback);
                }
            });
            _this.component.notifyPageChange('pdf', { skip: skip, take: _take });
        });
    };
    PDFComponent.prototype.changeColumns = function (columns, callback) {
        var _this = this;
        this.ngZone.run(function () {
            _this.onStable(callback);
            if (columns && columns.length) {
                _this.component.columns.reset(columns);
            }
        });
    };
    PDFComponent.prototype.reset = function () {
        this.suspendService.scroll = false;
        this.renderAllPages = false;
        if (!this.component) {
            return;
        }
        var wrapperElement = this.component.wrapper.nativeElement;
        wrapperElement.removeChild(this.progress);
        wrapperElement.style.height = this.originalHeight;
        wrapperElement.style.overflow = this.originalOverflow;
        delete this.progress;
        delete this.component;
    };
    PDFComponent.prototype.onStable = function (callback) {
        var _this = this;
        // not sure if it is an actual scenario. occurs in the tests.
        // onStable is triggered in the same pass without the change detection.
        // thus, the callback is called before the changes are applied without the timeout.
        setTimeout(function () {
            _this.ngZone.onStable.asObservable().pipe(take(1)).subscribe(callback);
        }, 0); // tslint:disable-line: align
    };
    PDFComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-grid-pdf',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    PDFComponent.ctorParameters = function () { return [
        { type: PDFService },
        { type: SuspendService },
        { type: NgZone },
        { type: ElementRef }
    ]; };
    PDFComponent.propDecorators = {
        allPages: [{ type: Input }],
        columns: [{ type: ContentChildren, args: [ColumnBase$1,] }],
        marginComponent: [{ type: ContentChild, args: [PDFMarginComponent$1,] }],
        pageTemplateDirective: [{ type: ContentChild, args: [PDFTemplateDirective$1,] }]
    };
    return PDFComponent;
}(PDFExportComponent));

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
var PDFCommandDirective = /** @class */ (function (_super) {
    __extends(PDFCommandDirective, _super);
    function PDFCommandDirective(pdfService, element, renderer, localization, ngZone) {
        var _this = _super.call(this, element, renderer, null, localization, ngZone) || this;
        _this.pdfService = pdfService;
        _this.ngZone = ngZone;
        return _this;
    }
    /**
     * @hidden
     */
    PDFCommandDirective.prototype.onClick = function (e) {
        e.preventDefault();
        this.pdfService.exportClick.emit();
    };
    Object.defineProperty(PDFCommandDirective.prototype, "pdfClass", {
        /**
         * @hidden
         */
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    PDFCommandDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoGridPDFCommand]'
                },] },
    ];
    /** @nocollapse */
    PDFCommandDirective.ctorParameters = function () { return [
        { type: PDFService },
        { type: ElementRef },
        { type: Renderer2 },
        { type: LocalizationService },
        { type: NgZone }
    ]; };
    PDFCommandDirective.propDecorators = {
        onClick: [{ type: HostListener, args: ['click', ['$event'],] }],
        pdfClass: [{ type: HostBinding, args: ['class.k-grid-pdf',] }]
    };
    return PDFCommandDirective;
}(Button));

var exportedModules$5 = [
    PDFComponent,
    PDFMarginComponent$1,
    PDFCommandDirective,
    PDFTemplateDirective$1
];
var declarations$1 = [
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
var PDFModule = /** @class */ (function () {
    function PDFModule() {
    }
    PDFModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [declarations$1],
                    exports: [exportedModules$5]
                },] },
    ];
    return PDFModule;
}());

/**
 * Arguments for the `excelExport` event.
 */
var ExcelExportEvent = /** @class */ (function (_super) {
    __extends(ExcelExportEvent, _super);
    function ExcelExportEvent(workbook) {
        var _this = _super.call(this) || this;
        _this.workbook = workbook;
        return _this;
    }
    return ExcelExportEvent;
}(PreventableEvent));

/* tslint:disable object-literal-sort-keys */
var fetchComponentData = function (component) {
    return {
        data: component.view.map(function (item) { return item; }),
        group: component.group
    };
};
var toExcelColumn = function (column) {
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
var toExcelColumns = function (columns) {
    var result = [];
    sortColumns(columns)
        .forEach(function (column) {
        if (column.isSpanColumn) {
            result.push.apply(result, toExcelColumns(column.childrenArray));
        }
        else {
            var excelColumn = toExcelColumn(column);
            if (column.isColumnGroup) {
                excelColumn.children = [excelColumn].concat(toExcelColumns(column.childrenArray));
            }
            result.push(excelColumn);
        }
    });
    return result;
};
var componentColumns = function (component) {
    var columns = toExcelColumns(component.columns.toArray());
    return orderBy(columns, [{ field: 'locked', dir: 'desc' }]);
};
/**
 * Configures the settings for the export of Grid in Excel ([see example]({% slug excelexport_grid %})).
 */
var ExcelComponent = /** @class */ (function () {
    function ExcelComponent(excelService, localization, zone) {
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
    ExcelComponent.prototype.ngOnDestroy = function () {
        this.saveSubscription.unsubscribe();
        if (this.dataSubscription) {
            this.dataSubscription.unsubscribe();
        }
    };
    ExcelComponent.prototype.save = function (component) {
        var _this = this;
        var data = (this.fetchData || fetchComponentData)(component);
        var exportData = function (result) {
            delete _this.dataSubscription;
            _this.exportData(component, result);
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
    };
    ExcelComponent.prototype.exportData = function (component, result) {
        var _this = this;
        var options = workbookOptions({
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
        var args = new ExcelExportEvent(options);
        component.excelExport.emit(args);
        if (!args.isDefaultPrevented()) {
            this.zone.runOutsideAngular(function () { return _this.saveFile(options); });
        }
    };
    ExcelComponent.prototype.saveFile = function (options) {
        var _this = this;
        toDataURL(options).then(function (dataURL) {
            saveAs(dataURL, _this.fileName, {
                forceProxy: _this.forceProxy,
                proxyURL: _this.proxyURL
            });
        });
    };
    ExcelComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-grid-excel',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    ExcelComponent.ctorParameters = function () { return [
        { type: ExcelService },
        { type: LocalizationService },
        { type: NgZone }
    ]; };
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
    return ExcelComponent;
}());

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
var ExcelCommandDirective = /** @class */ (function (_super) {
    __extends(ExcelCommandDirective, _super);
    function ExcelCommandDirective(excelService, element, renderer, localization, ngZone) {
        var _this = _super.call(this, element, renderer, null, localization, ngZone) || this;
        _this.excelService = excelService;
        _this.ngZone = ngZone;
        return _this;
    }
    /**
     * @hidden
     */
    ExcelCommandDirective.prototype.onClick = function (e) {
        e.preventDefault();
        this.excelService.exportClick.emit();
    };
    Object.defineProperty(ExcelCommandDirective.prototype, "excelClass", {
        /**
         * @hidden
         */
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    ExcelCommandDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoGridExcelCommand]'
                },] },
    ];
    /** @nocollapse */
    ExcelCommandDirective.ctorParameters = function () { return [
        { type: ExcelService },
        { type: ElementRef },
        { type: Renderer2 },
        { type: LocalizationService },
        { type: NgZone }
    ]; };
    ExcelCommandDirective.propDecorators = {
        onClick: [{ type: HostListener, args: ['click', ['$event'],] }],
        excelClass: [{ type: HostBinding, args: ['class.k-grid-excel',] }]
    };
    return ExcelCommandDirective;
}(Button));

var declarations$2 = [ExcelComponent, ExcelCommandDirective];
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
var ExcelModule = /** @class */ (function () {
    function ExcelModule() {
    }
    ExcelModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [declarations$2],
                    exports: [declarations$2, ExcelExportModule]
                },] },
    ];
    return ExcelModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { ColumnChooserComponent, ColumnListComponent, ColumnMenuChooserComponent, ColumnMenuFilterComponent, ColumnMenuItemBase, ColumnMenuItemContentTemplateDirective, ColumnMenuItemComponent, ColumnMenuLockComponent, ColumnMenuSortComponent, ColumnMenuTemplateDirective, ColumnMenuModule, ColumnMenuService, ColumnHandleDirective, ColumnResizingService, TableDirective, ColumnInfoService, DomEventsService, ExpandStateService, IdService, PreventableEvent, SortService, ChangeNotificationService, ColumnReorderService, DragAndDropModule, DragAndDropService, DragHintService, DraggableColumnDirective, DropCueService, DropTargetDirective, EditingDirectiveBase, RowEditingDirectiveBase, AddCommandDirective, CancelCommandDirective, EditCommandDirective, EditService as EditService$1, LocalDataChangesService, RemoveCommandDirective, SaveCommandDirective, ExcelCommandDirective, BooleanFilterComponent, BooleanFilterCellComponent, FilterCellHostDirective, FilterCellOperatorsComponent, FilterCellWrapperComponent, DateFilterComponent, FilterHostDirective, FilterInputWrapperComponent, FilterInputDirective, FilterRowComponent, DateFilterMenuInputComponent, FilterMenuContainerComponent, FilterMenuHostDirective, FilterMenuInputWrapperComponent, FilterMenuComponent, NumericFilterMenuInputComponent, StringFilterMenuInputComponent, NumericFilterComponent, FilterOperatorBase, SharedFilterModule, StringFilterComponent, GroupHeaderComponent, GroupIndicatorComponent, GroupInfoService, GroupPanelComponent, GroupsService, BrowserSupportService, ResizeService, ResponsiveService, LocalizedMessagesDirective, Messages, FocusGroup, FocusRoot, LogicalCellDirective, LogicalRowDirective, NavigationService, PagerContextService, PagerElementComponent, PDFCommandDirective, PDFTemplateDirective$1 as PDFTemplateDirective, CellComponent, CELL_CONTEXT, EMPTY_CELL_CONTEXT, FieldAccessorPipe, DetailsService, DEFAULT_SCROLLER_FACTORY, SCROLLER_FACTORY_TOKEN, ScrollRequestService, ScrollSyncService, ScrollerService, CellSelectionService, GridMarqueeDirective, SelectAllCheckboxDirective, SelectionCheckboxDirective, Selection, SelectionService, GridModule, SharedModule, GridComponent, ColumnBase$1 as ColumnBase, ColumnComponent, CommandColumnComponent, SpanColumnComponent, ColumnGroupComponent, CheckboxColumnComponent, ToolbarComponent, ToolbarTemplateDirective, CellTemplateDirective, HeaderTemplateDirective, FooterTemplateDirective, PagerTemplateDirective, ExpandDetailsDirective, DetailTemplateDirective, DetailExpandEvent, DetailCollapseEvent, GroupHeaderTemplateDirective, GroupHeaderColumnTemplateDirective, GroupFooterTemplateDirective, ResizableContainerDirective, TemplateContextDirective, NoRecordsTemplateDirective, DataBindingDirective, SelectionDirective, FilterService, FilterCellTemplateDirective, FilterCellComponent, StringFilterCellComponent, DateFilterCellComponent, BaseFilterCellComponent, FilterMenuTemplateDirective, NumericFilterMenuComponent, StringFilterMenuComponent, DateFilterMenuComponent, BooleanFilterMenuComponent, BeforeEqFilterOperatorComponent, BeforeFilterOperatorComponent, AfterEqFilterOperatorComponent, AfterFilterOperatorComponent, ContainsFilterOperatorComponent, DoesNotContainFilterOperatorComponent, EndsWithFilterOperatorComponent, EqualFilterOperatorComponent, IsEmptyFilterOperatorComponent, IsNotEmptyFilterOperatorComponent, IsNotNullFilterOperatorComponent, IsNullFilterOperatorComponent, NotEqualFilterOperatorComponent, StartsWithFilterOperatorComponent, NumericFilterCellComponent, AutoCompleteFilterCellComponent, GreaterFilterOperatorComponent, GreaterOrEqualToFilterOperatorComponent, LessOrEqualToFilterOperatorComponent, LessFilterOperatorComponent, PagerPrevButtonsComponent, PagerNextButtonsComponent, PagerNumericButtonsComponent, PagerInputComponent, PagerInfoComponent, PagerPageSizesComponent, RowFilterModule, FilterMenuModule, BodyModule, GroupModule, HeaderModule, FooterModule, PagerModule, TemplateEditingDirective, ReactiveEditingDirective, InCellEditingDirective, EditTemplateDirective, ColGroupComponent, HeaderComponent, ListComponent, FooterComponent, TableBodyComponent, PagerComponent, CustomMessagesComponent, LoadingComponent, PDFModule, PDFComponent, PDFMarginComponent$1 as PDFMarginComponent, PDFService, ExcelModule, ExcelComponent, ExcelService, ExcelExportEvent, CellCloseEvent, SuspendService, GroupBindingDirective, slice, count, Skip, ColumnReorderEvent, FocusableDirective, ColumnVisibilityChangeEvent, ColumnMenuComponent, SinglePopupService, PopupCloseEvent };
