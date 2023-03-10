/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentFactoryResolver, ContentChild, ContentChildren, Directive, ElementRef, EventEmitter, Host, HostBinding, HostListener, Inject, Injectable, InjectionToken, Input, NgModule, NgZone, Optional, Output, Pipe, QueryList, Renderer2, Sanitizer, SecurityContext, Self, SkipSelf, TemplateRef, ViewChild, ViewChildren, ViewContainerRef, ViewEncapsulation, forwardRef, isDevMode } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, Observable, Subject, Subscription, from, fromEvent, interval, isObservable, merge, of, zip } from 'rxjs';
import { auditTime, bufferCount, debounceTime, delay, distinctUntilChanged, filter, map, switchMap, switchMapTo, take, takeUntil, tap, throttleTime } from 'rxjs/operators';
import { DraggableDirective, DraggableModule, EventsModule, Keys, ResizeSensorComponent, ResizeSensorModule, anyChanged, guid, hasObservers, isChanged, isDocumentAvailable } from '@progress/kendo-angular-common';
import { aggregateBy, isCompositeFilterDescriptor, orderBy, process } from '@progress/kendo-data-query';
import { ComponentMessages, L10N_PREFIX, LocalizationService } from '@progress/kendo-angular-l10n';
import { PopupModule, PopupService } from '@progress/kendo-angular-popup';
import { getter, setter } from '@progress/kendo-common';
import { AutoCompleteModule, DropDownListModule } from '@progress/kendo-angular-dropdowns';
import { InputsModule, NumericTextBoxComponent, NumericTextBoxModule } from '@progress/kendo-angular-inputs';
import { DatePickerModule } from '@progress/kendo-angular-dateinputs';
import { IntlService } from '@progress/kendo-angular-intl';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Button } from '@progress/kendo-angular-buttons';
import { PDFExportComponent, PDFMarginComponent, PDFTemplateDirective } from '@progress/kendo-angular-pdf-export';
import { saveAs } from '@progress/kendo-file-saver';
import { ColumnBase, ExcelExportModule, toDataURL, workbookOptions } from '@progress/kendo-angular-excel-export';

/**
 * Represents the column cell template of the TreeList ([more information and example]({% slug templates_columns_treelist %}#toc-cell-template)).
 * Helps to customize the content of the cells. To define the cell template, nest an `<ng-template>` tag
 * with the `kendoTreeListCellTemplate` directive inside a `<kendo-treelist-column>` tag.
 *
 * The template context is set to the current data item and the following additional fields are passed:
 * - `columnIndex`&mdash;The current column index. Use it as an alias for a template variable by utilizing the `let-columnIndex="columnIndex"` syntax.
 * - `rowIndex`&mdash;The current row index. Use it as an alias for a template variable by utilizing the `let-rowIndex="rowIndex"` syntax.
 * - `dataItem`&mdash;The current data item. Represents the default context that will be assigned to any template variable which utilizes the `let-x` syntax&mdash;for example, `let-dataItem`.
 * - `column`&mdash;The current column instance. Use it as an alias for a template variable by utilizing the `let-column="column"` syntax.
 *
 * {% meta height:470 %}
 * {% embed_file data-binding/hierarchy/app.component.ts preview %}
 * {% embed_file shared/app.module.ts %}
 * {% embed_file shared/main.ts %}
 * {% embed_file shared/filesystem.ts %}
 * {% endmeta %}
 */
class CellTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
CellTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoTreeListCellTemplate]'
            },] },
];
/** @nocollapse */
CellTemplateDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] }
];

/**
 * Represents the column edit-cell template of the TreeList ([see example]({% slug editing_template_forms_treelist %})).
 * Helps to customize the content of the edited cells. To define the cell template, nest an `<ng-template>`
 * tag with the `kendoTreeListEditTemplate` directive inside a `<kendo-treelist-column>` tag.
 *
 * The template context contains the following fields:
 * - `formGroup`&mdash;The current [`FormGroup`]({{ site.data.urls.angular['formgroupapi'] }}).
 * If you use the TreeList inside [Template-Driven Forms]({{ site.data.urls.angular['forms'] }}), it will be `undefined`.
 * - `rowIndex`&mdash;The current row index. If inside a new item row, `rowIndex` is `-1`.
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
                selector: '[kendoTreeListEditTemplate]'
            },] },
];
/** @nocollapse */
EditTemplateDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] }
];

/**
 * Represents the column header cell template of the TreeList
 * ([more information and example]({% slug templates_columns_treelist %}#toc-header-template)).
 * Helps to customize the table header cell for the column.
 * To define a header template, nest an `<ng-template>` tag with the
 * [`kendoTreeListHeaderTemplate`]({% slug api_treelist_headertemplatedirective %}) directive inside the `<kendo-treelist-column>` tag.
 *
 *  The template context is set to the current column and then the following additional fields are passed:
 * * `column`&mdash;Defines an instance of the [`ColumnComponent`]({% slug api_treelist_columncomponent %}) option.
 * * `columnIndex`&mdash;Defines the current column index.
 *
 * {% meta height:533 %}
 * {% embed_file configuration/header-template/app.component.ts preview %}
 * {% embed_file shared/app.module.ts %}
 * {% embed_file shared/main.ts %}
 * {% embed_file shared/employees.ts %}
 * {% endmeta %}
 */
class HeaderTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
HeaderTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoTreeListHeaderTemplate]'
            },] },
];
/** @nocollapse */
HeaderTemplateDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] }
];

/**
 * Represents the column footer cell template of the TreeList
 * ([more information and example]({% slug templates_columns_treelist %}#toc-footer-template)).
 * Helps to customize the table footer cell for the column.
 * To define a footer template, nest an `<ng-template>` tag with the
 * [`kendoTreeListFooterTemplate`]({% slug api_treelist_footertemplatedirective %}) directive inside the `<kendo-treelist-column>` tag.
 *
 * The template context is set to the current column and the following additional fields are passed:
 * * `column`&mdash;Defines an instance of the [`ColumnComponent`]({% slug api_treelist_columncomponent %}) option.
 * * `columnIndex`&mdash;Defines the current column index.
 * * `aggregates`&mdash;The aggregates for the level items.
 *
 *
 * {% meta height:500 %}
 * {% embed_file configuration/footer-template/app.component.ts preview %}
 * {% embed_file shared/app.module.ts %}
 * {% embed_file shared/main.ts %}
 * {% embed_file shared/employees.ts %}
 * {% endmeta %}
 */
class FooterTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
FooterTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoTreeListFooterTemplate]'
            },] },
];
/** @nocollapse */
FooterTemplateDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] }
];

/* tslint:disable:max-line-length */
/**
 * Represents the template for the column menu in the TreeList. Provides an option for
 * customizing the content of the column menu for all or for specific columns.
 * To define the content template, nest an `<ng-template>` tag with the
 * `kendoTreeListColumnMenuTemplate` directive inside the `kendo-treelist` or the `<kendo-treelist-column>` component.
 *
 * The template context is passes through the following fields:
 * - `service`&mdash;Represents the [ColumnMenuService]({% slug api_treelist_columnmenuservice %}).
 * - `column`&mdash;Represents the TreeList column.
 *
 * {% meta height:500 %}
 * {% embed_file column-menu/template/app.component.ts preview %}
 * {% embed_file column-menu/app.module.ts %}
 * {% embed_file column-menu/main.ts %}
 * {% embed_file shared/employees.ts %}
 * {% endmeta %}
 */
class ColumnMenuTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
ColumnMenuTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoTreeListColumnMenuTemplate]'
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

const isColumnContainer = column => column.isColumnGroup || isSpanColumn(column);
/**
 * The base class for the column components of the TreeList.
 */
class ColumnBase$1 {
    /**
     * @hidden
     */
    constructor(parent, optionChanges) {
        this.parent = parent;
        this.optionChanges = optionChanges;
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
         * Toggles the locked (frozen) state of the columns ([more information and example]({% slug locked_columns_treelist %})).
         *
         * @default false
         *
         * @example
         * ```ts
         * _@Component({
         *    selector: 'my-app',
         *    template: `
         *        <kendo-treelist [data]="treelistData" [scrollable]="scrollable" style="height: 200px">
         *          <kendo-treelist-column field="ProductID" title="Product ID" width="120" [locked]="true">
         *          </kendo-treelist-column>
         *          <kendo-treelist-column field="ProductName" title="Product Name" width="200">
         *          </kendo-treelist-column>
         *          <kendo-treelist-column field="UnitPrice" title="Unit Price" width="230">
         *          </kendo-treelist-column>
         *        </kendo-treelist>
         *    `
         * })
         *
         * class AppComponent {
         *    public treelistData: any[];
         *
         *    constructor() {
         *        this.treelistData = products;
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
    /**
     * @hidden
     */
    get isEditable() {
        return false;
    }
    ngOnChanges(_changes) {
        if (this.optionChanges) {
            this.optionChanges.columnChanged();
        }
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
/** @hidden */
const isColumnEditable = (column, formGroup) => column.isEditable !== false &&
    (column.editTemplate || (formGroup && column.field && formGroup.get(column.field)));

/**
 * Represents the filter-cell template ([see example]({% slug builtinfiltertemplate_treelist %}#toc-customizing-filter-rows)).
 */
class FilterCellTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
FilterCellTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoTreeListFilterCellTemplate]'
            },] },
];
/** @nocollapse */
FilterCellTemplateDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] }
];

/**
 * Represents the filter-menu template
 * ([see example]({% slug builtinfiltertemplate_treelist %}#toc-customizing-filter-menus)).
 */
class FilterMenuTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
FilterMenuTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoTreeListFilterMenuTemplate]'
            },] },
];
/** @nocollapse */
FilterMenuTemplateDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] }
];

/**
 * @hidden
 */
class OptionChangesService {
    constructor() {
        this.columns = new EventEmitter();
        this.options = new EventEmitter();
    }
    optionChanged() {
        this.options.emit();
    }
    columnChanged() {
        this.columns.emit();
    }
}
OptionChangesService.decorators = [
    { type: Injectable },
];

/**
 * @hidden
 */
function isColumnComponent(column) {
    return isPresent(column.field);
}
/**
 * Represents the columns of the [Angular TreeList]({% slug getstarted_treelist %}).
 *
 * {% meta height:470 %}
 * {% embed_file basic-usage/app.component.ts preview %}
 * {% embed_file basic-usage/app.module.ts %}
 * {% embed_file basic-usage/main.ts %}
 * {% embed_file shared/employees.ts %}
 * {% endmeta %}
 */
class ColumnComponent extends ColumnBase$1 {
    constructor(parent, optionChanges) {
        super(parent, optionChanges);
        /**
         * Allows the column headers to be clicked and the `sortChange` event emitted.
         * You have to handle the `sortChange` event yourself and sort the data.
         */
        this.sortable = true;
        /**
         * Defines the editor type ([see example]({% slug editing_reactive_forms_treelist %}#toc-setup)).
         * Used when the column enters the edit mode. The default value is `text`.
         *
         * @example
         * ```html-no-run
         * <kendo-treelist>
         *    <kendo-treelist-column field="UnitPrice" editor="numeric">
         *    </kendo-treelist-column>
         * </kendo-treelist>
         * ```
         */
        this.editor = 'text';
        /**
         * Defines the filter type that is displayed inside the filter row. The default value is `text`.
         *
         * @example
         * ```html-no-run
         * <kendo-treelist>
         *    <kendo-treelist-column field="UnitPrice" filter="numeric">
         *    </kendo-treelist-column>
         * </kendo-treelist>
         * ```
         */
        this.filter = 'text';
        /**
         * Defines if a filter UI will be displayed for this column. The default value is `true`.
         *
         * @example
         * ```html-no-run
         * <kendo-treelist>
         *    <kendo-treelist-column field="UnitPrice" [filterable]="false">
         *    </kendo-treelist-column>
         * </kendo-treelist>
         * ```
         */
        this.filterable = true;
        /**
         * Defines whether the column is editable. The default value is `true`.
         *
         * @example
         * ```html-no-run
         * <kendo-treelist>
         *    <kendo-treelist-column field="UnitPrice" [editable]="false">
         *    </kendo-treelist-column>
         * </kendo-treelist>
         * ```
         */
        this.editable = true;
    }
    get templateRef() {
        return this.template ? this.template.templateRef : undefined;
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
    /**
     * @hidden
     */
    get isEditable() {
        return this.editable !== false;
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
                selector: 'kendo-treelist-column',
                template: ``
            },] },
];
/** @nocollapse */
ColumnComponent.ctorParameters = () => [
    { type: ColumnBase$1, decorators: [{ type: SkipSelf }, { type: Host }, { type: Optional }] },
    { type: OptionChangesService }
];
ColumnComponent.propDecorators = {
    expandable: [{ type: Input }],
    field: [{ type: Input }],
    format: [{ type: Input }],
    sortable: [{ type: Input }],
    editor: [{ type: Input }],
    filter: [{ type: Input }],
    filterable: [{ type: Input }],
    editable: [{ type: Input }],
    template: [{ type: ContentChild, args: [CellTemplateDirective,] }],
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
 * header and footer cells are retained ([see example]({% slug spanned_columns_treelist %})).
 * Enables you to achieve more flexible layout while keeping the built-in UI element for
 * [sorting]({% slug sorting_treelist %}) and [filtering]({% slug filtering_treelist %}). Wrap the columns that will be
 * merged inside the `<kendo-treelist-span-column>` tag.
 *
 * {% meta height:570 %}
 * {% embed_file configuration/span-column/app.component.ts preview %}
 * {% embed_file shared/app.module.ts %}
 * {% embed_file shared/main.ts %}
 * {% embed_file shared/employees.ts %}
 * {% endmeta %}
 *
 * By default, the data cell displays the data for the specified fields. To further customize
 * the span-column functionality, use a [cell template]({% slug api_treelist_celltemplatedirective %}).
 *
 * ```html-no-run
 * <kendo-treelist-span-column>
 *  <kendo-treelist-column field="field1" title="Field 1"></kendo-treelist-column>
 *  <kendo-treelist-column field="field2" title="Field 2"></kendo-treelist-column>
 *    <ng-template kendoTreeListCellTemplate let-dataItem>
 *        <h5>{{ dataItem.field1 }}</h5>
 *        <p>{{ dataItem.field2 }}</p>
 *    </ng-template>
 *  </kendo-treelist-span-column>
 * ```
 */
class SpanColumnComponent extends ColumnBase$1 {
    constructor(parent, optionChanges) {
        super(parent, optionChanges);
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
     * <kendo-treelist>
     *    <kendo-treelist-span-column [editable]="false">
     *      <kendo-treelist-column field="UnitPrice">
     *      </kendo-treelist-column>
     *      <kendo-treelist-column field="ProductName">
     *      </kendo-treelist-column>
     *      <ng-template kendoTreeListEditTemplate>
     *         .....
     *      </ng-template>
     *    </kendo-treelist-span-column>
     * </kendo-treelist>
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
     * at all times during the horizontal scrolling of the TreeList.
     *
     * For the option to work properly, make sure that:
     * - Scrolling is enabled.
     * - The `height` option of the TreeList is set.
     * - The widths of all TreeList columns are explicitly set in pixels. In this way,
     * the TreeList adjusts the layout of the locked and unlocked columns.
     *
     * @default false
     *
     * @example
     * ```ts
     * _@Component({
     *    selector: 'my-app',
     *    template: `
     *        <kendo-treelist [data]="treelistData" [scrollable]="scrollable" style="height: 200px">
     *          <kendo-treelist-span-column [locked]="true">
     *             <kendo-treelist-column field="ProductID" title="Product ID" width="120">
     *             </kendo-treelist-column>
     *             <kendo-treelist-column field="ProductName" title="Product Name" width="200">
     *             </kendo-treelist-column>
     *          </kendo-treelist-span-column>
     *          <kendo-treelist-column field="UnitPrice" title="Unit Price" width="230">
     *          </kendo-treelist-column>
     *        </kendo-treelist>
     *    `
     * })
     *
     * class AppComponent {
     *    public treelistData: any[];
     *
     *    constructor() {
     *        this.treelistData = products;
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
    get isEditable() {
        return Boolean(this.editTemplateRef);
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
                selector: 'kendo-treelist-span-column',
                template: ``
            },] },
];
/** @nocollapse */
SpanColumnComponent.ctorParameters = () => [
    { type: ColumnBase$1, decorators: [{ type: SkipSelf }, { type: Host }, { type: Optional }] },
    { type: OptionChangesService }
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
const expandColumns = (columns) => (columns.reduce((acc, column) => acc.concat(isSpanColumnComponent(column) ? column.childColumns.toArray() : [column]), []) // tslint:disable-line:align
);
/**
 * @hidden
 */
const expandColumnsWithSpan = (columns) => (columns.reduce((acc, column) => acc.concat(isSpanColumnComponent(column) ?
    [column].concat(column.childColumns.toArray()) :
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
            acc = acc.concat(column.childColumns.toArray());
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
const resizableColumns = columns => columns.filter(column => isTruthy(column.resizable));
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
 * Represents the column group header of the TreeList
 * ([more information and examples]({% slug multicolumnheaders_columns_treelist %})).
 *
 * {% meta height:533 %}
 * {% embed_file configuration/multi-column-headers/app.component.ts preview %}
 * {% embed_file shared/app.module.ts %}
 * {% embed_file shared/main.ts %}
 * {% embed_file shared/filesystem.ts %}
 * {% endmeta %}
 */
class ColumnGroupComponent extends ColumnBase$1 {
    constructor(parent, optionChanges) {
        super(parent, optionChanges);
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
        return this.children ? (this.children.toArray()[1] || {}).leafIndex : -1;
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
                selector: 'kendo-treelist-column-group',
                template: ``
            },] },
];
/** @nocollapse */
ColumnGroupComponent.ctorParameters = () => [
    { type: ColumnBase$1, decorators: [{ type: SkipSelf }, { type: Host }, { type: Optional }] },
    { type: OptionChangesService }
];
ColumnGroupComponent.propDecorators = {
    children: [{ type: ContentChildren, args: [ColumnBase$1,] }]
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
        if (typeof window !== 'undefined') {
            this.zone.runOutsideAngular(() => {
                fromEvent(window, 'resize').pipe(auditTime(100)).subscribe(() => {
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
const LOADING = 'loading';
/**
 * @hidden
 */
class ViewItemFactory {
    constructor(expandState, editState, loaded, fieldAccessor, rootItem) {
        this.expandState = expandState;
        this.editState = editState;
        this.loaded = loaded;
        this.fieldAccessor = fieldAccessor;
        this.observables = [];
        this.rowIndex = 0;
        const { data, fetchChildren, hasChildren, pageable, skip, pageSize, idGetter, hasFooter } = this.fieldAccessor();
        this.fetchChildren = fetchChildren;
        this.hasChildren = hasChildren;
        this.pageable = pageable && Boolean(pageSize);
        this.skip = skip;
        this.pageSize = pageSize;
        this.idGetter = idGetter;
        this.hasFooter = hasFooter;
        if (rootItem) {
            this.rootLevel = this.loadChildren(rootItem);
        }
        else {
            this.rootLevel = this.dataLevel({
                level: -1,
                id: null,
                expanded: true
            }, data);
        }
    }
    generate() {
        const result = [];
        const dataLevels = [this.rootLevel];
        let itemIndex = 0;
        let itemCount = 0;
        this.addNew(result);
        while (dataLevels.length) {
            while (dataLevels[0] && dataLevels[0].idx >= dataLevels[0].items.length) {
                const dataLevel = dataLevels.shift();
                if (this.hasFooter && dataLevel.expanded && dataLevel.items.length) {
                    if (dataLevel.inPage) {
                        result.push({
                            type: 'footer',
                            items: dataLevel.items,
                            aggregates: dataLevel.aggregates,
                            level: dataLevel.level,
                            parentIndex: dataLevel.parentIndex,
                            rowIndex: this.rowIndex
                        });
                    }
                    this.rowIndex++;
                }
            }
            if (!dataLevels.length) {
                break;
            }
            const currentLevel = dataLevels[0];
            const dataItem = currentLevel.items[currentLevel.idx++];
            const viewItem = {
                type: 'data',
                data: dataItem,
                id: this.idGetter(dataItem),
                rowIndex: this.rowIndex,
                index: itemIndex,
                level: currentLevel.level,
                hasChildren: this.hasChildren(dataItem),
                parent: currentLevel.parent
            };
            if (currentLevel.expanded) {
                this.rowIndex++;
                if (this.inPageRange(itemIndex)) {
                    result.push(viewItem);
                    viewItem.editContext = this.editState.context(viewItem.data);
                    this.addNew(result, dataItem);
                }
                itemIndex++;
            }
            itemCount++;
            const expanded = viewItem.hasChildren && this.expandState.isExpanded(viewItem.id);
            if (viewItem.hasChildren && (expanded || this.pageable)) {
                viewItem.expanded = expanded && currentLevel.expanded;
                const children = this.loadChildren(viewItem);
                if (children) {
                    dataLevels.unshift(children);
                    children.parentLevel = currentLevel;
                    if (this.pageable && children.inPage && viewItem.expanded) {
                        let parentLevel = currentLevel;
                        while (parentLevel && !parentLevel.inPage) {
                            parentLevel.inPage = true;
                            parentLevel = parentLevel.parentLevel;
                        }
                    }
                }
            }
        }
        return {
            items: result,
            observables: this.observables,
            total: itemCount,
            totalVisible: itemIndex
        };
    }
    loadChildren(parent) {
        const parentId = parent.id;
        if (this.loaded.has(parentId)) {
            const children = this.loaded.get(parentId);
            if (children === LOADING) {
                parent.loading = true;
            }
            else {
                return this.dataLevel(parent, children);
            }
        }
        else {
            const children = this.fetchChildren(parent.data);
            if (isObservable(children)) {
                this.observables.push({
                    observable: children,
                    parentId: parentId
                });
                parent.loading = true;
            }
            else if (children) {
                this.loaded.set(parentId, children);
                return this.dataLevel(parent, children);
            }
        }
    }
    inPageRange(index) {
        return !this.pageable || (this.skip <= index && index < this.skip + this.pageSize);
    }
    intersectsPageRange(start, end) {
        return !this.pageable || (this.skip <= end && start < this.skip + this.pageSize);
    }
    dataLevel(parent, children) {
        children = children || {};
        const data = children.data || children;
        const items = data && data.length ? data : [];
        return {
            idx: 0,
            level: parent.level + 1,
            items: items,
            aggregates: children.aggregates,
            expanded: parent.expanded,
            inPage: parent.level === -1 || this.intersectsPageRange(parent.index + 1, parent.index + items.length),
            parentIndex: parent.index,
            parent: parent
        };
    }
    addNew(result, parent) {
        if (this.editState.hasNew(parent)) {
            result.push({
                parent: parent,
                isNew: true,
                type: 'data',
                data: this.editState.newItem.dataItem,
                editContext: this.editState.newItem,
                rowIndex: this.rowIndex++
            });
        }
    }
}
/**
 * @hidden
 */
class ViewCollection {
    constructor(fieldAccessor, expandState, editState) {
        this.fieldAccessor = fieldAccessor;
        this.expandState = expandState;
        this.editState = editState;
        this.childrenLoaded = new EventEmitter();
        this.dataLoaded = new EventEmitter();
        this.total = 0;
        this.totalVisible = 0;
        this.loaded = new Map();
        this.loading = false;
        this.loadingCount = 0;
    }
    get data() {
        if (!this._data) {
            this.loadData();
        }
        return this._data;
    }
    get length() { return this.data.length; }
    get first() { return this.data[0]; }
    get last() { return this.data[this.data.length - 1]; }
    at(index) {
        return this.data[index];
    }
    itemIndex(item) {
        const idGetter = this.fieldAccessor().idGetter;
        return this.data.findIndex(i => i.id === idGetter(item));
    }
    map(fn) { return this.data.map(fn); }
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
    find(fn) {
        return this.data.find(fn);
    }
    toString() { return this.data.toString(); }
    reset() {
        this.loaded.clear();
        this.clear();
        this.unsubscribeChildren();
    }
    resetItem(item, resetChildren) {
        const idGetter = this.fieldAccessor().idGetter;
        const toReset = [item];
        while (toReset.length) {
            const current = toReset.shift();
            const id = idGetter(current);
            if (this.loaded.has(id)) {
                const children = this.loaded.get(id);
                this.loaded.delete(id);
                if (resetChildren) {
                    toReset.push.apply(toReset, children.data || children);
                }
            }
        }
        this.clear();
    }
    clear() {
        this._data = null;
    }
    loadData() {
        const itemFactory = new ViewItemFactory(this.expandState, this.editState, this.loaded, this.fieldAccessor);
        const result = itemFactory.generate();
        this._data = result.items;
        this.total = result.total;
        this.totalVisible = result.totalVisible;
        if (result.observables && result.observables.length) {
            this.loading = true;
            this.loadingCount += result.observables.length;
            if (!this.childrenSubscription) {
                this.childrenSubscription = new Subscription();
            }
            result.observables.forEach(o => {
                this.loaded.set(o.parentId, LOADING);
                this.childrenSubscription.add(o.observable.subscribe(children => {
                    this.clear();
                    this.loaded.set(o.parentId, children);
                    this.childrenLoaded.emit();
                    this.loadingCount--;
                    if (this.loadingCount === 0) {
                        this.loading = false;
                        this.unsubscribeChildren();
                        this.dataLoaded.emit();
                    }
                }));
            });
        }
        else {
            this.dataLoaded.emit();
        }
    }
    unsubscribeChildren() {
        if (this.childrenSubscription) {
            this.childrenSubscription.unsubscribe();
            this.childrenSubscription = null;
            this.loadingCount = 0;
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

const identity = item => item;
/**
 * @hidden
 */
class EditService {
    constructor(ngZone) {
        this.ngZone = ngZone;
        this.changes = new EventEmitter();
        this.idGetter = identity;
        this.edited = new Map(); // edited rows by id or referense
        this.keepEditCell = false;
        this.closingCell = false;
        this.changedSource = new Subject();
        this.changed = this.changedSource.asObservable().pipe(switchMap(() => this.ngZone.onStable.asObservable().pipe(take(1))));
    }
    get newItemGroup() {
        return this.newItem ? this.newItem.group : null;
    }
    editRow(item, group = undefined) {
        this.edited.set(this.idGetter(item), {
            group,
            item
        });
        this.onChanged();
    }
    addRow(parent, group) {
        this.newItem = { parent, group, dataItem: group ? group.value : null };
        this.onChanged();
    }
    editCell(item, column, group) {
        if (!isColumnEditable(column, group)) {
            return;
        }
        this.preventCellClose();
        if (!this.closeCell()) {
            this.editRow(item, group);
            this.column = column;
            this.onChanged();
        }
    }
    isEditing() {
        return this.edited.size > 0;
    }
    isEdited(item) {
        return this.edited.has(this.idGetter(item));
    }
    isEditingCell() {
        return isPresent(this.column);
    }
    isEditingColumn(column) {
        return this.column === column;
    }
    isEditedColumn(column) {
        return !this.column || this.column === column;
    }
    hasNew(parent) {
        return Boolean(this.newItem && ((!this.newItem.parent && !parent) ||
            this.idGetter(this.newItem.parent) === this.idGetter(parent)));
    }
    get newDataItem() {
        if (this.newItem) {
            return this.newItem.group.value;
        }
    }
    close(item, isNew) {
        if (isNew) { // parent
            this.newItem = undefined;
            return;
        }
        this.edited.delete(this.idGetter(item));
        delete this.column;
        this.onChanged();
    }
    closeCell(originalEvent) {
        if (this.column && !this.closingCell) {
            return this.ngZone.run(() => {
                const { item, group } = this.first;
                const args = new CellCloseEvent({
                    column: this.column,
                    formGroup: group,
                    originalEvent: originalEvent,
                    dataItem: item
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
            this.edited.clear();
            this.column = null;
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
    context(item) {
        return this.edited.get(this.idGetter(item));
    }
    beginEdit(item) {
        this.changes.emit({ action: 'edit', dataItem: item });
    }
    beginAdd(parent) {
        this.changes.emit({ action: 'add', parent });
    }
    endEdit(dataItem, isNew) {
        const formGroup = isNew ? this.newItemGroup : this.context(dataItem).group;
        this.changes.emit({ action: 'cancel', dataItem, formGroup, isNew });
    }
    save(item, isNew) {
        const args = { action: 'save', isNew: isNew };
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
    }
    remove(dataItem, parent) {
        this.changes.emit({ action: 'remove', dataItem, parent });
    }
    onChanged() {
        this.ngZone.runOutsideAngular(() => {
            this.changedSource.next();
        });
    }
    get first() {
        if (this.isEditing) {
            return this.edited.values().next().value;
        }
    }
}
EditService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
EditService.ctorParameters = () => [
    { type: NgZone }
];

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
 * Represents the no-records template of the TreeList. Provides an option to customize the
 * appearance of the item that is displayed when no data is present. To define the no-records template,
 * nest an `<ng-template>` tag with the `kendoTreeListNoRecordsTemplate` directive inside `<kendo-treelist>`.
 *
 * > When the locked columns of the TreeList are in use, the template is displayed in the non-locked part of the content.
 *
 * {% meta height:533 %}
 * {% embed_file configuration/no-records-template/app.component.ts preview %}
 * {% embed_file shared/app.module.ts %}
 * {% embed_file shared/main.ts %}
 * {% embed_file shared/employees.ts %}
 * {% endmeta %}
 */
class NoRecordsTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
NoRecordsTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoTreeListNoRecordsTemplate]'
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
 * ([see example]({% slug reusablecustomfilters_treelist %})).
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
 * Represents the pager template which helps to customize the pager appearance in the TreeList. To define a pager
 * template, nest an `<ng-template>` tag with the `kendoPagerTemplate` directive inside `<kendo-treelist>`.
 *
 * The template context provides the following fields:
 * * `currentPage`&mdash;The index of the displayed page.
 * * `pageSize`&mdash;The value of the current `pageSize`.
 * * `skip`&mdash;The current skip value.
 * * `total`&mdash;The total number of records.
 * * `totalPages`&mdash;The total number of available pages.
 *
 * {% meta height:470 %}
 * {% embed_file configuration/pager-template-all/app.component.ts preview %}
 * {% embed_file shared/app.module.ts %}
 * {% embed_file shared/main.ts %}
 * {% embed_file shared/filesystem.ts %}
 * {% endmeta %}
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
        this.allCount = changes.allCount;
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
        if (nextPage * this.pageSize <= this.total) {
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
                throw new Error('Creating PDF requires including the PDFModule and adding the <kendo-treelist-pdf> component.');
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
        this.loadingChange = new EventEmitter();
    }
    save(component) {
        if (this.saveToExcel.observers.length === 0) {
            if (isDevMode()) {
                throw new Error('Saving excel requires including the ExcelModule and adding the <kendo-treelist-excel> component.');
            }
        }
        else {
            this.saveToExcel.emit(component);
        }
    }
    toggleLoading(value) {
        this.loading = value;
        this.loadingChange.emit();
    }
}
ExcelService.decorators = [
    { type: Injectable },
];

const forEachColumn = (list, callback) => {
    list.forEach((column) => {
        callback(column);
        if (column.children && column.children.length > 1) {
            forEachColumn(column.children.toArray().slice(1), callback);
        }
    });
};
const forEachLevel = (list, callback) => {
    sortColumns(list)
        .forEach((column) => {
        callback(column);
        if (column.children && column.children.length > 1) {
            forEachLevel(column.children.toArray().slice(1), callback);
        }
    });
};
const filterHierarchy = (list, predicate) => {
    const result = [];
    sortColumns(list)
        .forEach((column) => {
        if (predicate(column)) {
            if (column.children) {
                const children$$1 = filterHierarchy(column.children.toArray().slice(1), predicate);
                if (children$$1.length) {
                    result.push(column, ...children$$1);
                }
            }
            else if (!column.childColumns || filterHierarchy(column.childColumns.toArray(), predicate).length) {
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
 * Represents the toolbar template of the TreeList.
 *
 * The template context has the following field:
 * - `position`&mdash;The position at which the toolbar template is rendered. The possible values are "top" and "bottom".
 *
 * @example
 * {% meta height:470 %}
 * {% embed_file configuration/toolbar-template/app.component.ts preview %}
 * {% embed_file shared/app.module.ts %}
 * {% embed_file shared/main.ts %}
 * {% embed_file shared/employees.ts %}
 * {% endmeta %}
 */
class ToolbarTemplateDirective {
    constructor(templateRef, optionChanges) {
        this.templateRef = templateRef;
        this.optionChanges = optionChanges;
        this._position = "top";
    }
    /**
     * The position of the toolbar ([see example]({% slug toolbartemplate_treelist %})).
     *
     * The possible values are:
     * - `top`&mdash;Positions the toolbar above the group panel or header.
     * - `bottom`&mdash;Positions the toolbar below the pager.
     * - `both`&mdash;Displays two toolbar instances. Positions the first one above
     * the group panel or header and the second one below the pager.
     */
    set position(position) {
        this._position = position;
        this.optionChanges.optionChanged();
    }
    get position() {
        return this._position;
    }
}
ToolbarTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoTreeListToolbarTemplate]'
            },] },
];
/** @nocollapse */
ToolbarTemplateDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] },
    { type: OptionChangesService }
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

/**
 * @hidden
 */
class DomEventsService {
    constructor() {
        this.cellClick = new EventEmitter();
        this.cellMousedown = new EventEmitter();
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
        this.tables = new Array();
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
    registerTable(fn) {
        this.tables.push(fn);
        return () => {
            this.tables.splice(this.tables.indexOf(fn), 1);
        };
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
        this.batch = [];
        this.resizedColumns = [];
        this.changes.emit({
            columns: columns,
            type: 'start'
        });
        this.changes.emit({
            columns,
            type: 'triggerAutoFit'
        });
        this.autoFitBatch(this.batch);
    }
    trackColumns(column) {
        this.resizedColumns = [];
        this.column = column;
    }
    autoFitBatch(info, onComplete) {
        const observables = this.tables.map(fn => fn(info));
        zip(...observables)
            .pipe(take(1))
            .subscribe(widths => {
            this.changes.emit({
                columns: info.map(i => i.column),
                type: 'autoFitComplete',
                widths
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
 * ([see example]({% slug reusablecustomfilters_treelist %}#toc-filter-menu-with-popup)).
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
    { type: Sanitizer }
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
 * A directive that controls the way focusable elements receive
 * [focus in a navigable TreeList]({% slug keyboard_navigation_treelist %}).
 *
 * @hidden Not functional yet.
 */
class FocusableDirective {
    constructor(hostElement, renderer) {
        // if (this.cellContext) {
        // this.group = this.cellContext.focusGroup;
        // }
        this.hostElement = hostElement;
        this.renderer = renderer;
        this.active = true;
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
                selector: '[kendoTreeListFocusable]' + `,
        [kendoTreeListEditCommand],
        [kendoTreeListRemoveCommand],
        [kendoTreeListSaveCommand],
        [kendoTreeListCancelCommand]
    `
            },] },
];
/** @nocollapse */
FocusableDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];

/**
 * @hidden
 */
class TreeListFocusableElement {
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
    lastCellIndex() {
        return this.metadata.columns.leafColumnsToRender.length - 1;
    }
    offsetCol(offset) {
        const prevRow = this.model.findRow(this.virtualRow);
        const lastIndex = this.lastCellIndex();
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
            dataItem: row.dataItem,
            dataRowIndex: row.dataRowIndex,
            focusGroup: cell.focusGroup
        };
        row.cells.setItem(colIndex, modelCell);
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

const isInSameTreeList = (element, treelistElement) => closest(element, matchesNodeName('kendo-treelist')) === treelistElement;
const matchHeaderCell = matchesNodeName('th');
const matchDataCell = matchesNodeName('td');
const matchCell = (element) => matchDataCell(element) || matchHeaderCell(element);
const treelistCell = (element, treelistElement) => {
    let target = closest(element, matchCell);
    while (target && !isInSameTreeList(target, treelistElement)) {
        target = closest(target.parentElement, matchCell);
    }
    return target;
};
const targetCell = (target, treelistElement) => {
    const cell = treelistCell(target, treelistElement);
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
    constructor(zone, domEvents, pagerContextService, scrollRequestService, focusRoot, editService, cd, localization, focusableParent) {
        this.zone = zone;
        this.domEvents = domEvents;
        this.pagerContextService = pagerContextService;
        this.scrollRequestService = scrollRequestService;
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
        const onStableSubscriber = (...operators$$1) => (args) => this.zone.isStable ?
            from([true]).pipe(map(() => args)) :
            this.zone.onStable.pipe(take(1), map(() => args), ...operators$$1);
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
            const element = new TreeListFocusableElement(this);
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
        const cell = targetCell(el, this.meta.treelistElement.nativeElement);
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
            const cell = targetCell(focusable, this.meta.treelistElement.nativeElement);
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
                const colIdx = fwd ? 0 : this.cursor.lastCellIndex();
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
                        this.cursor.reset(lastRowIndex, this.cursor.lastCellIndex(), false);
                    }
                    else {
                        this.cursor.reset(this.model.lastRow.index, this.cursor.lastCellIndex(), false);
                    }
                }
                else {
                    const lastIndex = this.cursor.lastCellIndex();
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
                this.enterCell();
                if (!this.cursor.cell.focusGroup.isNavigable()) {
                    preventDefault = true;
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
                this.scrollRequestService.scrollTo({ column: args.colIndex });
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
    { type: FocusRoot },
    { type: EditService },
    { type: ChangeDetectorRef },
    { type: LocalizationService },
    { type: FocusableDirective, decorators: [{ type: Optional }] }
];

/**
 * @hidden
 */
class NavigationMetadata {
    constructor(view, headerRows, isVirtual, hasPager, treelistElement, virtualColumns, columns) {
        this.view = view;
        this.headerRows = headerRows;
        this.isVirtual = isVirtual;
        this.hasPager = hasPager;
        this.treelistElement = treelistElement;
        this.virtualColumns = virtualColumns;
        this.columns = columns;
    }
    get maxLogicalRowIndex() {
        return this.headerRows + this.dataRows - 1;
    }
    get dataRows() {
        return this.isVirtual ? this.view.total : this.view.data.length;
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
function defaultTrackBy(index, item) {
    if (item.type === 'data' && item.isEditing) {
        return item.data;
    }
    return index;
}

/**
 * @hidden
 */
class ExpandStateService {
    constructor(isInitiallyCollapsed) {
        this.isInitiallyCollapsed = isInitiallyCollapsed;
        this.changes = new Subject();
        this.rowState = new Map();
    }
    toggleRow(id, dataItem) {
        const isExpanded = this.isExpanded(id);
        if (!this.emitEvent({ dataItem: dataItem, expand: !isExpanded })) {
            this.rowState.set(id, !isExpanded);
        }
    }
    isExpanded(id) {
        return this.rowState.has(id) ? this.rowState.get(id) : !this.isInitiallyCollapsed;
    }
    reset() {
        this.rowState.clear();
    }
    emitEvent(args) {
        this.changes.next(args);
        return false;
    }
}

/**
 * Arguments for the TreeList expand and collapse events.
 */
class ExpandEvent extends PreventableEvent {
    /**
     * @hidden
     */
    constructor(args) {
        super();
        this.expand = args.expand;
        this.dataItem = args.dataItem;
    }
}

/**
 * @hidden
 */
class ChildExpandStateService extends ExpandStateService {
    constructor() {
        super(true);
    }
    emitEvent(args) {
        const expandArgs = new ExpandEvent(args);
        this.changes.next(expandArgs);
        return expandArgs.isDefaultPrevented();
    }
}
ChildExpandStateService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ChildExpandStateService.ctorParameters = () => [];

/**
 * @hidden
 */
class LocalEditService {
    create(_item, _parent, _id) {
        this.throwUnsupportedError();
    }
    update(_item) {
        // noop
    }
    remove(_item) {
        this.throwUnsupportedError();
    }
    assignValues(target, source) {
        Object.assign(target, source);
    }
    throwUnsupportedError() {
        if (isDevMode()) {
            throw new Error('The default edit service of the editing directives can only update the items.' +
                'Please provide an editService.');
        }
    }
}

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

const createControl = (source) => (acc, key) => {
    acc[key] = new FormControl(source[key]);
    return acc;
};
const validateColumnsField = (columns) => expandColumns(columns.toArray())
    .filter(isColumnComponent)
    .filter(({ field }) => !isValidFieldName(field))
    .forEach(({ field }) => console.warn(`
                TreeList column field name '${field}' does not look like a valid JavaScript identifier.
                Identifiers can contain only alphanumeric characters (including "$" or "_"), and may not start with a digit.
                Please use only valid identifier names to ensure error-free operation.
            `));
const isInEditedCell = (element, treelistElement) => closest(element, matchesClasses('k-grid-edit-cell')) &&
    closest(element, matchesNodeName('kendo-treelist')) === treelistElement;
/**
 * Represents the Kendo UI TreeList component for Angular.
 *
 * {% meta height:470 %}
 * {% embed_file data-binding/flat/app.component.ts preview %}
 * {% embed_file shared/app.module.ts %}
 * {% embed_file shared/main.ts %}
 * {% embed_file shared/employees.ts %}
 * {% endmeta %}
 */
class TreeListComponent {
    constructor(supportService, wrapper, changeNotification, editService, filterService, pdfService, responsiveService, renderer, excelService, ngZone, scrollSyncService, domEvents, columnResizingService, changeDetectorRef, columnReorderService, columnInfoService, navigationService, sortService, scrollRequestService, childExpandStateService, optionChanges, localization) {
        this.supportService = supportService;
        this.wrapper = wrapper;
        this.changeNotification = changeNotification;
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
        this.childExpandStateService = childExpandStateService;
        this.optionChanges = optionChanges;
        /**
         * Defines the page size used by the TreeList when [paging]({% slug paging_treelist %}) is enabled.
         *
         * @default 10
         */
        this.pageSize = 10;
        /**
         * Defines the scroll mode used by the TreeList.
         *
         * The available options are:
         *  - `none`&mdash;Renders no scrollbar.
         *  - `scrollable`&mdash;The default scroll mode. It requires the setting of the `height` option.
         */
        this.scrollable = 'scrollable';
        /**
         * A function that defines how to track changes for the data rows.
         *
         * By default, the TreeList tracks changes by the index of the data item.
         * Edited rows are tracked by reference.
         * In some cases, you might need to override the default behavior,
         * for example, when you implement editing with immutable data items.
         *
         * The following example demonstrates how to track items only by index.
         *
         * @example
         * ```ts
         * import { Component } from '@angular/core';
         * import { TreeListItem } from '@progress/kendo-angular-treelist';
         *
         * _@Component({
         *    selector: 'my-app',
         *    template: `
         *        <kendo-treelist [data]="treelistData" [trackBy]="trackBy">
         *        </kendo-treelist>
         *    `
         * })
         * class AppComponent {
         *    public treelistData: any[] = products;
         *
         *    public trackBy(index: number, item: TreeListItem): any {
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
         * If set to `true`, the treelist will render only the columns in the current viewport.
         */
        this.virtualColumns = false;
        /**
         * Enables the [filtering]({% slug filtering_treelist %}) of the TreeList columns that have their `field` option set.
         */
        this.filterable = false;
        /**
         * Enables the [sorting]({% slug sorting_treelist %}) of the TreeList columns that have their `field` option set.
         */
        this.sortable = false;
        /**
         * Configures the pager of the TreeList ([see example]({% slug paging_treelist %})).
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
         * @hidden Not Implemented
         *
         * If set to `true`, the user can use dedicated shortcuts to interact with the TreeList.
         * By default, navigation is disabled and the TreeList content is accessible in the normal tab sequence.
         */
        this.navigable = false;
        /**
         * Indicates whether the TreeList columns will be resized during initialization so that
         * they fit their headers and row content. Defaults to `false`.
         * Columns with `autoSize` set to `false` are excluded.
         * To dynamically update the column width to match the new content,
         * refer to [this example]({% slug resizing_columns_treelist %}).
         */
        this.autoSize = false;
        /**
         * If set to `true`, the user can resize columns by dragging the edges (resize handles) of their header cells
         * ([see example]({% slug resizing_columns_treelist %})).
         *
         * @default false
         */
        this.resizable = false;
        /**
         * If set to `true`, the user can reorder columns by dragging their header cells
         * ([see example]({% slug reordering_columns_treelist %})).
         *
         * @default false
         */
        this.reorderable = false;
        /**
         * Specifies if the loading indicator of the TreeList will be displayed ([see example]({% slug databinding_treelist %})).
         *
         * @default false
         */
        this.loading = false;
        /**
         * Specifies if the column menu of the columns will be displayed ([see example]({% slug columnmenu_treelist %})).
         *
         * @default false
         */
        this.columnMenu = false;
        /**
         * Specifies if the header of the treelist will be hidden. The header is visible by default.
         *
         * > The header includes column headers and the [filter row]({% slug filtering_treelist %}#toc-filter-row).
         */
        this.hideHeader = false;
        /**
         * Fires when the TreeList filter is modified through the UI.
         * You have to handle the event yourself and filter the data.
         */
        this.filterChange = new EventEmitter();
        /**
         * Fires when the page of the TreeList is changed ([see example]({% slug paging_treelist %})).
         * You have to handle the event yourself and page the data.
         */
        this.pageChange = new EventEmitter();
        /**
         * Fires when the sorting of the TreeList is changed ([see example]({% slug sorting_treelist %})).
         * You have to handle the event yourself and sort the data.
         */
        this.sortChange = new EventEmitter();
        /**
         * Fires when the data state of the TreeList is changed.
         */
        this.dataStateChange = new EventEmitter();
        /**
         * Fires when the user clicks the **Edit** command button to edit a row
         * ([see example]({% slug editing_template_forms_treelist %}#toc-editing-records)).
         */
        this.edit = new EventEmitter();
        /**
         * Fires when the user clicks the **Cancel** command button to close a row
         * ([see example]({% slug editing_template_forms_treelist %}#toc-cancelling-editing)).
         */
        this.cancel = new EventEmitter();
        /**
         * Fires when the user clicks the **Save** command button to save changes in a row
         * ([see example]({% slug editing_template_forms_treelist %}#toc-saving-records)).
         */
        this.save = new EventEmitter();
        /**
         * Fires when the user clicks the **Remove** command button to remove a row
         * ([see example]({% slug editing_template_forms_treelist %}#toc-removing-records)).
         */
        this.remove = new EventEmitter();
        /**
         * Fires when the user clicks the **Add** command button to add a new row
         * ([see example]({% slug editing_template_forms_treelist %}#toc-adding-records)).
         */
        this.add = new EventEmitter();
        /**
         * Fires when the user leaves an edited cell ([see example]({% slug editing_incell_treelist %}#toc-basic-concepts)).
         */
        this.cellClose = new EventEmitter();
        /**
         * Fires when the user clicks a cell ([see example]({% slug editing_incell_treelist %}#toc-basic-concepts)).
         */
        this.cellClick = new EventEmitter();
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
        this.columnResize = new EventEmitter();
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
         * ([see example]({% slug scrollmmodes_treelist %}#toc-endless-scrolling)).
         * You have to handle the event yourself and page the data.
         */
        this.scrollBottom = new EventEmitter();
        /**
         * Fires when the treelist content is scrolled.
         * For performance reasons, the event is triggered outside the Angular zone. Enter the Angular zone if you make any changes that require change detection.
         */
        this.contentScroll = new EventEmitter();
        /**
         * Fires when an item is expanded.
         */
        this.expandEvent = new EventEmitter();
        /**
         * Fires when an item is collapsed.
         */
        this.collapseEvent = new EventEmitter();
        /**
         * A query list of all declared columns.
         */
        this.columns = new QueryList();
        this.footer = new QueryList();
        this.columnsContainer = new ColumnsContainer(() => this.columnList.filterHierarchy(column => {
            column.matchesMedia = this.matchesMedia(column);
            return column.isVisible;
        }));
        this.localEditService = new LocalEditService();
        this.view = new ViewCollection(this.viewFieldAccessor.bind(this), this.childExpandStateService, this.editService);
        this.dataChanged = false;
        this._hasChildren = (() => false);
        this.subscriptions = new Subscription();
        this.rtl = false;
        this.shouldGenerateColumns = true;
        this._data = [];
        this._sort = new Array();
        this._skip = 0;
        this.cachedWindowWidth = 0;
        this._rowSelected = null;
        this.idGetter = getter(undefined);
        this._rowClass = () => null;
        this.subscriptions.add(localization.changes.subscribe(({ rtl }) => {
            this.rtl = rtl;
            this.direction = this.rtl ? 'rtl' : 'ltr';
        }));
        this.columnInfoService.init(this.columnsContainer, () => this.columnList);
        this.subscriptions.add(this.columnInfoService.visibilityChange.subscribe((changed) => {
            this.columnVisibilityChange.emit(new ColumnVisibilityChangeEvent(changed));
            this.changeDetectorRef.markForCheck();
        }));
        this.subscriptions.add(this.columnInfoService.lockedChange.subscribe((changed) => {
            this.columnLockedChange.emit(new ColumnLockedChangeEvent(changed));
            this.changeDetectorRef.markForCheck();
        }));
        this.subscriptions.add(merge(this.optionChanges.columns, this.optionChanges.options).subscribe(() => {
            this.changeDetectorRef.markForCheck();
        }));
        this.subscriptions.add(this.filterService.changes.subscribe(x => {
            this.filterChange.emit(x);
        }));
        this.subscriptions.add(this.sortService.changes.subscribe(x => {
            this.sortChange.emit(x);
        }));
        this.attachStateChangesEmitter();
        this.attachEditHandlers();
        this.attachDomEventHandlers();
        this.subscriptions.add(this.pdfService.exportClick.subscribe(this.emitPDFExportEvent.bind(this)));
        this.subscriptions.add(this.excelService.exportClick.subscribe(this.saveAsExcel.bind(this)));
        this.subscriptions.add(this.excelService.loadingChange.subscribe(() => {
            this.changeDetectorRef.detectChanges();
        }));
        this.columnsContainerChange();
        this.subscriptions.add(this.columnResizingService
            .changes
            .pipe(tap(e => {
            if (e.type === 'start') {
                this.renderer.addClass(this.wrapper.nativeElement, 'k-grid-column-resizing');
            }
            else if (e.type === 'end' || e.type === 'autoFitComplete') {
                this.renderer.removeClass(this.wrapper.nativeElement, 'k-grid-column-resizing');
            }
        }), filter(e => e.type === 'end'))
            .subscribe(this.notifyResize.bind(this)));
        this.columnList = new ColumnList(this.columns);
        this.subscriptions.add(this.columnReorderService
            .changes.subscribe(this.reorder.bind(this)));
        this.subscriptions.add(this.columnInfoService.columnRangeChange.subscribe(this.onColumnRangeChange.bind(this)));
        this.subscriptions.add(this.childExpandStateService.changes.subscribe((args) => {
            if (args.expand) {
                this.expandEvent.emit(args);
            }
            else {
                this.collapseEvent.emit(args);
            }
            if (!args.isDefaultPrevented()) {
                this.changeDetectorRef.markForCheck();
                this.view.clear();
            }
        }));
        this.subscriptions.add(this.view.childrenLoaded.subscribe(() => {
            this.changeDetectorRef.detectChanges();
        }));
        this.dataLoaded = this.dataLoaded.bind(this);
        this.editService.idGetter = this.idGetter;
    }
    /**
     * Sets the data of the TreeList. If an array is provided, the TreeList automatically gets the total count
     * ([more information and example]({% slug databinding_treelist %})).
     */
    set data(value) {
        this.view.reset();
        this._data = value;
        this.loadedData = null;
        this.unsubscribeDataLoaded();
        if (isObservable(value)) {
            this.dataLoadedSubscription = value.subscribe(this.dataLoaded); // handle error
        }
        else {
            this.dataLoaded(value);
        }
    }
    get data() {
        return this.loadedData;
    }
    /**
     * Defines the number of records to be skipped by the pager.
     * Required by the [paging]({% slug paging_treelist %}) functionality.
     */
    get skip() {
        return this._skip;
    }
    set skip(value) {
        if (value >= 0) {
            this._skip = value;
            this.view.clear();
        }
    }
    /**
     * The descriptors by which the data will be sorted ([see example]({% slug sorting_treelist %})).
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
     * import { RowClassArgs } from '@progress/kendo-angular-treelist';
     *
     * _@Component({
     *    selector: 'my-app',
     *    encapsulation: ViewEncapsulation.None,
     *    styles: [`
     *        .k-treelist tr.even { background-color: #f45c42; }
     *        .k-treelist tr.odd { background-color: #41f4df; }
     *    `],
     *    template: `
     *        <kendo-treelist [data]="treelistData" [rowClass]="rowCallback">
     *        </kendo-treelist>
     *    `
     * })
     * class AppComponent {
     *    public treelistData: any[] = products;
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
        if (typeof fn !== 'function') {
            throw new Error(`rowClass must be a function, but received ${JSON.stringify(fn)}.`);
        }
        this._rowClass = fn;
    }
    get rowClass() {
        return this._rowClass;
    }
    get rowSelected() {
        return this._rowSelected;
    }
    /**
     * @hidden Not Implemented
     * Returns the currently focused cell (if any).
     */
    get activeCell() {
        return this.navigationService.activeCell;
    }
    /**
     * @hidden Not Implemented
     * Returns the currently focused row (if any).
     */
    get activeRow() {
        return this.navigationService.activeRow;
    }
    /**
     * The name of the field which contains the unique identifier of the node.
     *
     * @default "id"
     */
    set idField(value) {
        if (typeof value === "function") {
            this.idGetter = value;
        }
        else {
            this.idGetter = getter(value);
        }
        this.editService.idGetter = this.idGetter;
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
    get showLoading() {
        return this.loading || (isObservable(this._data) && !this.loadedData) || this.excelService.loading;
    }
    get showFooter() {
        return this.columnsContainer.hasFooter;
    }
    get ariaRowCount() {
        return this.totalColumnLevels + 1 + this.view.total;
    }
    get ariaColCount() {
        return this.columnsContainer.leafColumnsToRender.length;
    }
    get isVirtual() {
        return false; // this.scrollable === 'virtual';
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
        return expandColumns(this.lockedLeafColumns.toArray()).reduce((prev, curr) => prev + (curr.width || 0), 0);
    }
    get nonLockedWidth() {
        if (!this.rtl && this.lockedLeafColumns.length) {
            return !this.virtualColumns ? this.columnsContainer.unlockedWidth :
                this.leafViewportColumns.reduce((acc, column) => acc + (column.width || 0), 0);
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
     * Gets or sets the callback function that retrieves the child nodes for a particular node.
     */
    set fetchChildren(value) {
        this._fetchChildren = value;
    }
    get fetchChildren() {
        return this._fetchChildren;
    }
    /**
     * Gets or sets the callback function that indicates if a particular node has child nodes.
     */
    set hasChildren(value) {
        this._hasChildren = value;
    }
    get hasChildren() {
        return this._hasChildren;
    }
    /**
     * @hidden
     */
    viewFieldAccessor() {
        return {
            fetchChildren: this.fetchChildren,
            hasChildren: this.hasChildren,
            idGetter: this.idGetter,
            skip: this.skip,
            pageSize: this.pageSize,
            pageable: this.pageable,
            data: this.loadedData,
            hasFooter: this.columnsContainer.hasFooter
        };
    }
    /**
     * @hidden
     */
    onDataChange() {
        this.autoGenerateColumns();
        this.changeNotification.notify();
        this.pdfService.dataChanged.emit();
        this.updateNavigationMetadata();
    }
    ngOnChanges(changes) {
        if (this.lockedLeafColumns.length && anyChanged(["pageSize", "skip", "sort"], changes)) {
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
    }
    ngAfterViewInit() {
        this.attachScrollSync();
        this.attachElementEventHandlers();
        this.updateNavigationMetadata();
        this.applyAutoSize();
    }
    ngAfterContentChecked() {
        if (this.dataChanged) {
            this.dataChanged = false;
            this.onDataChange();
        }
        this.columnsContainer.refresh();
        this.verifySettings();
    }
    ngAfterContentInit() {
        this.shouldGenerateColumns = !this.columns.length;
        this.autoGenerateColumns();
        this.columnList = new ColumnList(this.columns);
        // is this needed? after content checked already does this
        this.subscriptions.add(this.columns.changes.subscribe(() => {
            this.verifySettings();
            this.optionChanges.columnChanged();
        }));
    }
    ngOnInit() {
        if (this.navigable) {
            this.navigationService.init(this.navigationMetadata());
        }
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
        if (this.detachElementEventHandlers) {
            this.detachElementEventHandlers();
        }
        if (this.focusElementSubscription) {
            this.focusElementSubscription.unsubscribe();
        }
        this.unsubscribeDataLoaded();
        this.ngZone = null;
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
            this.subscriptions.add(observe(this.footer)
                .subscribe(footers => footers
                .map(footer => footer.nativeElement)
                .filter(isPresent)
                .forEach(element => this.scrollSyncService.registerEmitter(element, "footer"))));
        }
    }
    /**
     * Switches the specified table row in the edit mode ([see example]({% slug editing_template_forms_treelist %}#toc-editing-records)).
     *
     * @param index - The row index that will be switched in the edit mode.
     * @param group - The [`FormGroup`]({{ site.data.urls.angular['formgroupapi'] }})
     * that describes the edit form.
     * @param options - Additional options. Use skipFocus to determine if the row's edit element should be focused. Defaults to `false`.
     */
    editRow(item, group, options) {
        this.changeDetectorRef.markForCheck();
        this.view.clear();
        this.editService.editRow(item, group);
        if (options && options.skipFocus) {
            return;
        }
        this.focusEditElement(() => {
            return `tr[data-treelist-view-index="${this.view.itemIndex(item)}"]`;
        });
    }
    /**
     * Closes the editor for a given row ([see example]({% slug editing_template_forms_treelist %}#toc-cancelling-editing)).
     *
     * @param {number} index - The row index that will be switched out of the edit mode. If no index is provided, it is assumed
     * that the new item editor will be closed.
     */
    closeRow(item, isNew) {
        this.changeDetectorRef.markForCheck();
        this.view.clear();
        this.editService.close(item, isNew);
    }
    /**
     * Creates a new row editor ([see example]({% slug editing_template_forms_treelist %}#toc-adding-records)).
     *
     * @param {FormGroup} group - The [`FormGroup`]({{ site.data.urls.angular['formgroupapi'] }}) that describes
     * the edit form. If called with a data item, it will build the `FormGroup` from the data item fields.
     */
    addRow(group, parent) {
        const isFormGroup = group instanceof FormGroup;
        if (!isFormGroup) {
            const fields = Object.keys(group).reduce(createControl(group), {}); // FormBuilder?
            group = new FormGroup(fields);
        }
        this.editService.addRow(parent, group);
        this.changeDetectorRef.markForCheck();
        this.view.clear();
        this.focusEditElement(() => {
            return parent ? `tr[data-treelist-view-index="${this.view.itemIndex(parent) + 1}"]` : '.k-grid-add-row';
        });
    }
    /**
     * Puts the cell that is specified by the table row and column in edit mode.
     *
     * @param {number} rowIndex - The row index that will be switched in the edit mode.
     * @param {number|string|any} column - The leaf column index, or the field name or the column instance that should be edited.
     * @param {FormGroup} group - The [`FormGroup`]({{ site.data.urls.angular['formgroupapi'] }})
     * that describes the edit form.
     */
    editCell(dataItem, column, group) {
        const instance = this.columnInstance(column);
        this.editService.editCell(dataItem, instance, group);
        this.changeDetectorRef.markForCheck();
        this.view.clear();
        this.focusEditElement(() => '.k-grid-edit-cell');
    }
    /**
     * Closes the current cell in edit mode and fires
     * the [`cellClose`]({% slug api_treelist_treelistcomponent %}#toc-cellclose) event.
     *
     * @return {boolean} Indicates whether the edited cell was closed.
     * A `false` value indicates that the
     * [`cellClose`]({% slug api_treelist_treelistcomponent %}#toc-cellclose) event was prevented.
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
        return this.editService.isEditing() && this.editService.isEditingCell();
    }
    /**
     * Initiates the PDF export ([see example]({% slug pdfexport_treelist %})).
     */
    saveAsPDF() {
        this.pdfService.save(this);
    }
    /**
     * Exports the TreeList element to a Drawing [`Group`]({% slug api_kendo-drawing_group %}) by using the `kendo-treelist-pdf` component options.
     * ([see example]({% slug pdfexport_treelist %}#toc-exporting-multiple-treelists-to-the-same-pdf)).
     *
     * @return {Promise} - A promise that will be resolved with the Drawing `Group`.
     */
    drawPDF() {
        const promise = createPromise();
        this.pdfService.draw(this, promise);
        return promise;
    }
    /**
     * Initiates the Excel export ([see example]({% slug excelexport_treelist %})).
     */
    saveAsExcel() {
        this.excelService.save(this);
    }
    /**
     * Applies the minimum possible width for the specified column,
     * so that the whole text fits without wrapping. This method expects the TreeList
     * to be resizable (set `resizable` to `true`).
     * Makes sense to execute this method only
     * after the TreeList is already populated with data.
     *
     * @example
     * ```ts
     * _@Component({
     *    selector: 'my-app',
     *    template: `
     *        <kendo-treelist
     *            #treelist
     *            [data]="treelistData"
     *            [resizable]="true"
     *            style="height: 300px">
     *            <ng-template kendoTreeListToolbarTemplate>
     *                 <button class="k-button" (click)="treelist.autoFitColumn(groupColumn)">
     *                     Auto-fit the group column
     *                 </button>
     *            </ng-template>
     *            <kendo-treelist-column-group #groupColumn title="Product Info">
     *                <kendo-treelist-column
     *                    field="ProductID"
     *                    [width]="50"
     *                    [minResizableWidth]="30"
     *                    title="ID">
     *                </kendo-treelist-column>
     *
     *                <kendo-treelist-column
     *                    field="ProductName"
     *                    title="Product Name">
     *                </kendo-treelist-column>
     *            </kendo-treelist-column-group>
     *
     *            <kendo-treelist-column
     *                field="UnitPrice"
     *                title="Unit Price"
     *                [width]="180"
     *                filter="numeric"
     *                format="{0:c}">
     *            </kendo-treelist-column>
     *        </kendo-treelist>
     *    `
     * })
     * class AppComponent {
     *    public treelistData: any[] = products;
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
     * Applies the minimum possible width for the specified columns,
     * so that the whole text fits without wrapping.
     * If no argument is supplied, `autoFitColumns` auto-fits
     * the content of current TreeList columns. This method expects the TreeList
     * to be resizable (set `resizable` to `true`).
     * Makes sense to execute this method only
     * after the TreeList is already populated with data.
     *
     * @example
     * ```ts
     * _@Component({
     *    selector: 'my-app',
     *    template: `
     *      <kendo-treelist
     *          #treelist
     *          [data]="treelistData"
     *          [resizable]="true"
     *          style="height: 300px">
     *          <ng-template kendoTreeListToolbarTemplate>
     *              <button class="k-button" (click)="treelist.autoFitColumns([firstColumn, lastColumn])">
     *                  Auto-fit the first and last column
     *              </button>
     *              <button class="k-button" (click)="treelist.autoFitColumns()">
     *                  Auto-fit all columns
     *              </button>
     *          </ng-template>
     *          <kendo-treelist-column-group title="Product Info">
     *              <kendo-treelist-column
     *                  #firstColumn
     *                  field="ProductID"
     *                  [width]="50"
     *                  [minResizableWidth]="30"
     *                  title="ID">
     *              </kendo-treelist-column>
     *
     *              <kendo-treelist-column
     *                  field="ProductName"
     *                  title="Product Name"
     *                  >
     *              </kendo-treelist-column>
     *          </kendo-treelist-column-group>
     *
     *          <kendo-treelist-column
     *              #lastColumn
     *              field="UnitPrice"
     *              title="Unit Price"
     *              [width]="180"
     *              filter="numeric"
     *              format="{0:c}">
     *          </kendo-treelist-column>
     *      </kendo-treelist>
     *    `
     * })
     * class AppComponent {
     *    public treelistData: any[] = products;
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
        this.skip = event.skip;
        this.pageSize = event.take;
        this.closeCell();
        this.cancelCell();
        this.changeDetectorRef.markForCheck();
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
                const selector = containerSelector();
                if (!this.setEditFocus(wrapper.querySelector(selector)) && this.isLocked) {
                    this.setEditFocus(wrapper.querySelector(`.k-grid-content ${selector}`));
                }
                this.focusElementSubscription = null;
            });
        });
    }
    /**
     * @hidden Not Implemented
     * Focuses the last active or the first cell of the TreeList.
     *
     * @returns {NavigationCell} The focused cell.
     */
    focus() {
        this.assertNavigable();
        return this.navigationService.focusCell();
    }
    /**
     * @hidden Not Implemented
     * Focuses the cell with the specified row and column index.
     *
     * The row index is based on the logical structure of the TreeList and does not correspond to the data item index:
     * * Header rows are indexed and start at row `#0`.
     * * Group headers and footers are indexed.
     *
     * If the TreeList is configured for scrolling, including virtual scrolling, the scroll position will be updated.
     * If the row is not present on the current page, the method will have no effect.
     *
     * @param rowIndex - The row index to focus.
     * @param colIndex - The column index to focus.
     * @returns {NavigationCell} The focused cell.
     *
     */
    focusCell(rowIndex, colIndex) {
        this.assertNavigable();
        return this.navigationService.focusCell(rowIndex, colIndex);
    }
    /**
     * @hidden Not Implemented
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
     * @hidden Not Implemented
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
     *        <kendo-treelist
     *            #treelist
     *            [data]="treelistData"
     *            [reorderable]="true"
     *            style="height: 300px">
     *            <ng-template kendoTreeListToolbarTemplate>
     *                 <button class="k-button"
     *                     (click)="treelist.reorderColumn(groupColumn, 2, { before: true })">
     *                     Move the group column before the last one.
     *                 </button>
     *            </ng-template>
     *            <kendo-treelist-column-group #groupColumn title="Product Info">
     *                <kendo-treelist-column
     *                    field="ProductID"
     *                    [width]="50"
     *                    title="ID">
     *                </kendo-treelist-column>
     *
     *                <kendo-treelist-column
     *                    field="ProductName"
     *                    title="Product Name">
     *                </kendo-treelist-column>
     *            </kendo-treelist-column-group>
     *
     *            <kendo-treelist-column
     *                field="UnitPrice"
     *                title="Unit Price"
     *                [width]="180"
     *                format="{0:c}">
     *            </kendo-treelist-column>
     *
     *            <kendo-treelist-column
     *                field="Discontinued"
     *                title="Discontinued"
     *                [width]="100">
     *            </kendo-treelist-column>
     *        </kendo-treelist>
     *    `
     * })
     * class AppComponent {
     *    public treelistData: any[] = products;
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
    reload(item, reloadChildren) {
        if (item) {
            this.view.resetItem(item, reloadChildren);
            this.changeDetectorRef.markForCheck();
        }
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
            if (c.children) {
                colsForLevel.push(...c.children.toArray().splice(1, c.children.length - 1).sort((a, b) => a.orderIndex - b.orderIndex));
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
            if (this.lockedLeafColumns.length && !this.nonLockedLeafColumns.length) {
                throw new Error('There should be at least one non-locked column');
            }
            if ((locked || this.virtualColumns) && expandColumns(this.columnList.toArray()).filter(column => !column.width && !isColumnGroupComponent(column)).length) {
                throw new Error((locked ? 'Locked' : 'Virtual') + ' columns feature requires all columns to have set width.');
            }
            if (locked && !this.isScrollable) {
                throw new Error('Locked columns are only supported when scrolling is enabled.');
            }
            if (this.columnList.filter(isColumnGroupComponent).filter((x) => x.children.length < 2).length) {
                throw new Error('ColumnGroupComponent should contain ColumnComponent or CommandColumnComponent.');
            }
            if (this.columnList.filter(x => x.locked && x.parent && !x.parent.isLocked).length) {
                throw new Error('Locked child columns require their parent columns to be locked.');
            }
            if ((this.rowHeight) && !this.isVirtual) {
                throw new Error('Row height setting requires virtual scrolling mode to be enabled.');
            }
            validateColumnsField(this.columnList);
        }
    }
    autoGenerateColumns() {
        if (this.shouldGenerateColumns && !this.columns.length && this.view.length) {
            const columns = Object.keys(this.view.at(0).data).map(field => {
                let column = new ColumnComponent();
                column.field = field;
                return column;
            });
            columns[0].expandable = true;
            this.columns.reset(columns);
        }
    }
    attachStateChangesEmitter() {
        this.subscriptions.add(merge(this.sortChange.pipe(map(sort => ({ filter: this.filter, skip: this.skip, sort: sort, take: this.pageSize }))), this.filterChange.pipe(map(filter$$1 => ({
            filter: filter$$1, skip: 0, sort: this.sort, take: this.pageSize
        }))))
            .subscribe(x => {
            this.closeCell();
            this.cancelCell();
            this.dataStateChange.emit(x);
        }));
    }
    attachEditHandlers() {
        if (!this.editService) {
            return;
        }
        this.subscriptions.add(this.editService
            .changes.subscribe(this.emitCRUDEvent.bind(this)));
    }
    emitCRUDEvent(args) {
        let { action, formGroup, dataItem, parent } = args;
        if (action !== 'add' && !dataItem) {
            dataItem = formGroup.value;
        }
        // remove automatic expand. leave it to the user once the expand state is moved outside the grid
        if (action === 'add' && parent && !this.childExpandStateService.isExpanded(this.idGetter(parent))) { // has children???
            this.childExpandStateService.toggleRow(this.idGetter(parent), parent);
        }
        this.view.clear();
        this.changeDetectorRef.markForCheck();
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
        this.subscriptions.add(this.domEvents.cellClick.subscribe((args) => {
            if (hasObservers(this.cellClick)) {
                this.ngZone.run(() => {
                    this.cellClick.emit(Object.assign({ sender: this }, args));
                });
            }
        }));
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
                    !closest(args.target, matchesClasses('k-animation-container k-treelist-ignore-click')) &&
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
        this.subscriptions.add(this.syncHeaderHeight(this.columnsContainer.changes.pipe(filter(() => this.lockedColumns.length > 0), switchMap(() => this.ngZone.onStable.asObservable().pipe(take(1))))));
    }
    notifyResize(e) {
        const args = e.resizedColumns
            .filter(item => isTruthy(item.column.resizable) && !item.column.isColumnGroup)
            .map(item => ({
            column: item.column,
            newWidth: item.column.width,
            oldWidth: item.oldWidth
        }));
        if (hasObservers(this.columnResize)) {
            this.ngZone.run(() => {
                this.columnResize.emit(args);
            });
        }
    }
    assertNavigable() {
        if (isDevMode() && !this.navigable) {
            throw new Error('The TreeList should be configured as [navigable]="true" to control focus');
        }
    }
    navigationMetadata() {
        const isVirtual = this.isVirtual;
        const filterRowOffset = hasFilterRow(this.filterable) ? 1 : 0;
        const headerRows = this.totalColumnLevels + 1 + filterRowOffset;
        return new NavigationMetadata(this.view, headerRows, isVirtual, this.showPager, this.wrapper, this.virtualColumns, this.columnsContainer);
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
                if (column.children) {
                    toAdd.unshift.apply(toAdd, column.children.toArray().slice(1));
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
    dataLoaded(result) {
        this.loadedData = result || [];
        this.view.reset();
        this.dataChanged = true;
        this.changeDetectorRef.markForCheck();
    }
    unsubscribeDataLoaded() {
        if (this.dataLoadedSubscription) {
            this.dataLoadedSubscription.unsubscribe();
            this.dataLoadedSubscription = null;
        }
    }
}
TreeListComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                exportAs: 'kendoTreeList',
                providers: [
                    BrowserSupportService,
                    LocalizationService,
                    ColumnInfoService,
                    ChangeNotificationService,
                    EditService,
                    PDFService,
                    SuspendService,
                    {
                        provide: L10N_PREFIX,
                        useValue: 'kendo.treelist'
                    },
                    FilterService,
                    ResponsiveService,
                    PagerContextService,
                    ExcelService,
                    ScrollSyncService,
                    ResizeService,
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
                    SortService,
                    ChildExpandStateService,
                    LocalDataChangesService,
                    OptionChangesService
                ],
                selector: 'kendo-treelist',
                template: `
        <ng-container kendoTreeListLocalizedMessages

            i18n-noRecords="kendo.treelist.noRecords|The label visible in the TreeList when there are no records"
            noRecords="No records available."

            i18n-pagerFirstPage="kendo.treelist.pagerFirstPage|The label for the first page button in TreeList pager"
            pagerFirstPage="Go to the first page"

            i18n-pagerPreviousPage="kendo.treelist.pagerPreviousPage|The label for the previous page button in TreeList pager"
            pagerPreviousPage="Go to the previous page"

            i18n-pagerNextPage="kendo.treelist.pagerNextPage|The label for the next page button in TreeList pager"
            pagerNextPage="Go to the next page"

            i18n-pagerLastPage="kendo.treelist.pagerLastPage|The label for the last page button in TreeList pager"
            pagerLastPage="Go to the last page"

            i18n-pagerPage="kendo.treelist.pagerPage|The label before the current page number in the TreeList pager"
            pagerPage="Page"

            i18n-pagerOf="kendo.treelist.pagerOf|The label before the total pages number in the TreeList pager"
            pagerOf="of"

            i18n-pagerItems="kendo.treelist.pagerItems|The label after the total pages number in the TreeList pager"
            pagerItems="items"

            i18n-pagerItemsPerPage="kendo.treelist.pagerItemsPerPage|The label for the page size chooser in the TreeList pager"
            pagerItemsPerPage="items per page"

            i18n-filter="kendo.treelist.filter|The label of the filter cell or icon"
            filter="Filter"

            i18n-filterEqOperator="kendo.treelist.filterEqOperator|The text of the equal filter operator"
            filterEqOperator="Is equal to"

            i18n-filterNotEqOperator="kendo.treelist.filterNotEqOperator|The text of the not equal filter operator"
            filterNotEqOperator="Is not equal to"

            i18n-filterIsNullOperator="kendo.treelist.filterIsNullOperator|The text of the is null filter operator"
            filterIsNullOperator="Is null"

            i18n-filterIsNotNullOperator="kendo.treelist.filterIsNotNullOperator|The text of the is not null filter operator"
            filterIsNotNullOperator="Is not null"

            i18n-filterIsEmptyOperator="kendo.treelist.filterIsEmptyOperator|The text of the is empty filter operator"
            filterIsEmptyOperator="Is empty"

            i18n-filterIsNotEmptyOperator="kendo.treelist.filterIsNotEmptyOperator|The text of the is not empty filter operator"
            filterIsNotEmptyOperator="Is not empty"

            i18n-filterStartsWithOperator="kendo.treelist.filterStartsWithOperator|The text of the starts with filter operator"
            filterStartsWithOperator="Starts with"

            i18n-filterContainsOperator="kendo.treelist.filterContainsOperator|The text of the contains filter operator"
            filterContainsOperator="Contains"

            i18n-filterNotContainsOperator="kendo.treelist.filterNotContainsOperator|The text of the does not contain filter operator"
            filterNotContainsOperator="Does not contain"

            i18n-filterEndsWithOperator="kendo.treelist.filterEndsWithOperator|The text of the ends with filter operator"
            filterEndsWithOperator="Ends with"

            i18n-filterGteOperator="kendo.treelist.filterGteOperator|The text of the greater than or equal filter operator"
            filterGteOperator="Is greater than or equal to"

            i18n-filterGtOperator="kendo.treelist.filterGtOperator|The text of the greater than filter operator"
            filterGtOperator="Is greater than"

            i18n-filterLteOperator="kendo.treelist.filterLteOperator|The text of the less than or equal filter operator"
            filterLteOperator="Is less than or equal to"

            i18n-filterLtOperator="kendo.treelist.filterLtOperator|The text of the less than filter operator"
            filterLtOperator="Is less than"

            i18n-filterIsTrue="kendo.treelist.filterIsTrue|The text of the IsTrue boolean filter option"
            filterIsTrue="Is True"

            i18n-filterIsFalse="kendo.treelist.filterIsFalse|The text of the IsFalse boolean filter option"
            filterIsFalse="Is False"

            i18n-filterBooleanAll="kendo.treelist.filterBooleanAll|The text of the (All) boolean filter option"
            filterBooleanAll="(All)"

            i18n-filterAfterOrEqualOperator="kendo.treelist.filterAfterOrEqualOperator|The text of the after or equal date filter operator"
            filterAfterOrEqualOperator="Is after or equal to"

            i18n-filterAfterOperator="kendo.treelist.filterAfterOperator|The text of the after date filter operator"
            filterAfterOperator="Is after"

            i18n-filterBeforeOperator="kendo.treelist.filterBeforeOperator|The text of the before date filter operator"
            filterBeforeOperator="Is before"

            i18n-filterBeforeOrEqualOperator="kendo.treelist.filterBeforeOrEqualOperator|The text of the before or equal date filter operator"
            filterBeforeOrEqualOperator="Is before or equal to"

            i18n-filterFilterButton="kendo.treelist.filterFilterButton|The text of the filter button"
            filterFilterButton="Filter"

            i18n-filterClearButton="kendo.treelist.filterClearButton|The text of the clear filter button"
            filterClearButton="Clear"

            i18n-filterAndLogic="kendo.treelist.filterAndLogic|The text of the And filter logic"
            filterAndLogic="And"

            i18n-filterOrLogic="kendo.treelist.filterOrLogic|The text of the Or filter logic"
            filterOrLogic="Or"

            i18n-loading="kendo.treelist.loading|The loading text"
            loading="Loading"

            i18n-columnMenu="kendo.treelist.columnMenu|The title of the column menu icon"
            columnMenu="Column Menu"

            i18n-columns="kendo.treelist.columns|The text shown in the column menu for the columns item"
            columns="Columns"

            i18n-lock="kendo.treelist.lock|The text shown in the column menu for the lock item"
            lock="Lock"

            i18n-unlock="kendo.treelist.unlock|The text shown in the column menu for the unlock item"
            unlock="Unlock"

            i18n-sortable="kendo.treelist.sortable|The label of the sort icon"
            sortable="Sortable"

            i18n-sortAscending="kendo.treelist.sortAscending|The text shown in the column menu for the sort ascending item"
            sortAscending="Sort Ascending"

            i18n-sortDescending="kendo.treelist.sortDescending|The text shown in the column menu for the sort descending item"
            sortDescending="Sort Descending"

            i18n-sortedAscending="kendo.treelist.sortedAscending|The status announcement when a column is sorted ascending"
            sortedAscending="Sorted Ascending"

            i18n-sortedDescending="kendo.treelist.sortedDescending|The status announcement when a column is sorted descending"
            sortedDescending="Sorted Descending"

            i18n-sortedDefault="kendo.treelist.sortedDefault|The status announcement when a column is no longer sorted"
            sortedDefault="Not Sorted"

            i18n-columnsApply="kendo.treelist.columnsApply|The text shown in the column menu or column chooser for the columns apply button"
            columnsApply="Apply"

            i18n-columnsReset="kendo.treelist.columnsReset|The text shown in the column menu or column chooser for the columns reset button"
            columnsReset="Reset"
         >
        </ng-container>
        <kendo-treelist-toolbar *ngIf="showTopToolbar" position="top"></kendo-treelist-toolbar>
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
                        <colgroup kendoTreeListColGroup
                            role="presentation"
                            [columns]="lockedLeafColumns">
                        </colgroup>
                        <thead kendoTreeListHeader
                            [resizable]="resizable"
                            [scrollable]="true"
                            [columns]="lockedColumns"
                            [totalColumnLevels]="totalColumnLevels"
                            [sort]="sort"
                            [filter]="filter"
                            [filterable]="filterable"
                            [reorderable]="reorderable"
                            [sortable]="sortable"
                            [columnMenu]="columnMenuOptions"
                            [columnMenuTemplate]="columnMenuTemplate"
                            [totalColumnsCount]="leafColumns.length">
                        </thead>
                    </table>
                </div><div #header class="k-grid-header-wrap" role="presentation" data-scrollable
                    [kendoTreeListResizableContainer]="lockedLeafColumns.length"
                    [lockedWidth]="lockedWidth + scrollbarWidth + 2">
                    <table role="presentation" [style.width.px]="nonLockedWidth">
                        <colgroup kendoTreeListColGroup
                            role="presentation"
                            [columns]="headerLeafColumns">
                        </colgroup>
                        <thead kendoTreeListHeader
                            [resizable]="resizable"
                            role="presentation"
                            [scrollable]="true"
                            [columns]="headerColumns"
                            [totalColumnLevels]="totalColumnLevels"
                            [sort]="sort"
                            [filter]="filter"
                            [filterable]="filterable"
                            [reorderable]="reorderable"
                            [sortable]="sortable"
                            [columnMenu]="columnMenuOptions"
                            [columnMenuTemplate]="columnMenuTemplate"
                            [lockedColumnsCount]="lockedLeafColumns.length"
                            [totalColumnsCount]="leafColumns.length">
                        </thead>
                    </table>
                    <div *ngIf="virtualColumns" class="k-width-container" role="presentation">
                        <div [style.width.px]="columnsContainer.unlockedWidth"></div>
                    </div>
                </div>
            </div>
            <kendo-treelist-list
                [view]="view"
                [loading]="showLoading"
                [rowHeight]="rowHeight"
                [total]="totalCount"
                [take]="pageSize"
                [skip]="skip"
                [trackBy]="trackBy"
                [columns]="columnsContainer"
                [filterable]="filterable"
                [noRecordsTemplate]="noRecordsTemplate"
                (pageChange)="notifyPageChange('list', $event)"
                [rowClass]="rowClass"
                [isVirtual]="isVirtual"
                [virtualColumns]="virtualColumns"
                (scrollBottom)="notifyScrollBottom()"
                (contentScroll)="contentScroll.emit($event)"
                >
            </kendo-treelist-list>
        </ng-template>
        <ng-template [ngIf]="!isScrollable">
            <table [style.table-layout]="resizable ? 'fixed' : null">
                <colgroup kendoTreeListColGroup
                    [columns]="leafColumns">
                </colgroup>
                <thead kendoTreeListHeader
                    *ngIf="!hideHeader"
                    [resizable]="resizable"
                    [scrollable]="false"
                    [columns]="visibleColumns"
                    [totalColumnLevels]="totalColumnLevels"
                    [reorderable]="reorderable"
                    [sort]="sort"
                    [sortable]="sortable"
                    [filter]="filter"
                    [filterable]="filterable"
                    [columnMenu]="columnMenuOptions"
                    [columnMenuTemplate]="columnMenuTemplate">
                </thead>
                <tbody kendoTreeListTableBody
                    [view]="view"
                    [skip]="skip"
                    [columns]="leafColumns"
                    [filterable]="filterable"
                    [noRecordsTemplate]="noRecordsTemplate"
                    [trackBy]="trackBy"
                    [rowClass]="rowClass">
                </tbody>
            </table>
            <div *ngIf="showLoading" kendoTreeListLoading>
            </div>
        </ng-template>
        </div>
        <kendo-pager
            *ngIf="showPager"
            [template]="pagerTemplate"
            [pageSize]="pageSize"
            [total]="view.totalVisible"
            [allCount]="view.total"
            [skip]="skip"
            [options]="pageable"
            (pageChange)="notifyPageChange('pager', $event)">
        </kendo-pager>
        <kendo-treelist-toolbar *ngIf="showBottomToolbar" position="bottom"></kendo-treelist-toolbar>
    `
            },] },
];
/** @nocollapse */
TreeListComponent.ctorParameters = () => [
    { type: BrowserSupportService },
    { type: ElementRef },
    { type: ChangeNotificationService },
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
    { type: ChildExpandStateService },
    { type: OptionChangesService },
    { type: LocalizationService }
];
TreeListComponent.propDecorators = {
    data: [{ type: Input }],
    pageSize: [{ type: Input }],
    height: [{ type: Input }],
    rowHeight: [{ type: Input }],
    skip: [{ type: Input }],
    scrollable: [{ type: Input }],
    sort: [{ type: Input }],
    trackBy: [{ type: Input }],
    filter: [{ type: Input }],
    virtualColumns: [{ type: Input }],
    filterable: [{ type: Input }],
    sortable: [{ type: Input }],
    pageable: [{ type: Input }],
    navigable: [{ type: Input }],
    navigatable: [{ type: Input }],
    autoSize: [{ type: Input }],
    rowClass: [{ type: Input }],
    resizable: [{ type: Input }],
    reorderable: [{ type: Input }],
    loading: [{ type: Input }],
    columnMenu: [{ type: Input }],
    hideHeader: [{ type: Input }],
    idField: [{ type: Input }],
    filterChange: [{ type: Output }],
    pageChange: [{ type: Output }],
    sortChange: [{ type: Output }],
    dataStateChange: [{ type: Output }],
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
    expandEvent: [{ type: Output, args: ['expand',] }],
    collapseEvent: [{ type: Output, args: ['collapse',] }],
    columns: [{ type: ContentChildren, args: [ColumnBase$1,] }],
    dir: [{ type: HostBinding, args: ['attr.dir',] }],
    hostClasses: [{ type: HostBinding, args: ['class.k-widget',] }, { type: HostBinding, args: ['class.k-grid',] }, { type: HostBinding, args: ['class.k-treelist',] }],
    lockedClasses: [{ type: HostBinding, args: ['class.k-grid-lockedcolumns',] }],
    virtualClasses: [{ type: HostBinding, args: ['class.k-grid-virtual',] }],
    noScrollbarClass: [{ type: HostBinding, args: ['class.k-grid-no-scrollbar',] }],
    noRecordsTemplateChildren: [{ type: ContentChildren, args: [NoRecordsTemplateDirective,] }],
    pagerTemplateChildren: [{ type: ContentChildren, args: [PagerTemplateDirective,] }],
    toolbarTemplateChildren: [{ type: ContentChildren, args: [ToolbarTemplateDirective,] }],
    columnMenuTemplates: [{ type: ContentChildren, args: [ColumnMenuTemplateDirective,] }],
    lockedHeader: [{ type: ViewChild, args: ["lockedHeader",] }],
    header: [{ type: ViewChild, args: ["header",] }],
    footer: [{ type: ViewChildren, args: ["footer",] }],
    ariaRoot: [{ type: ViewChild, args: ['ariaRoot',] }],
    fetchChildren: [{ type: Input }],
    hasChildren: [{ type: Input }]
};

/**
 * @hidden
 */
class RowHeightService {
    constructor(total = 0, rowHeight) {
        this.total = total;
        this.rowHeight = rowHeight;
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
const SCROLL_BOTTOM_THRESHOLD = 1;
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
const IGNORE_CONTAINER_CLASSES = 'k-widget k-treelist-ignore-click';

const elementAt = (index, elements, elementOffset) => {
    for (let idx = 0, elementIdx = 0; idx < elements.length; idx++) {
        const offset = elementOffset(elements[idx]);
        if (elementIdx <= index && index <= elementIdx + offset - 1) {
            return elements[idx];
        }
        elementIdx += offset;
    }
};
const rowAt = (index, rows) => elementAt(index, rows, row => row.hasAttribute('data-kendo-treelist-item-index') ? 1 : 0);
const cellAt = (index, cells) => elementAt(index, cells, cell => !hasClasses(cell, NON_DATA_CELL_CLASSES) ? parseInt(cell.getAttribute('colSpan'), 10) || 1 : 0);
const EMPTY_OBJECT = {};
/**
 * @hidden
 */
const SCROLLER_FACTORY_TOKEN = new InjectionToken('treelist-scroll-service-factory');
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
const preventLockedScroll = el => event => {
    const delta = wheelDeltaY(event);
    const scrollTop = el.scrollTop;
    const allowScroll = (scrollTop === 0 && 0 < delta) || (el.scrollHeight <= el.offsetHeight + scrollTop && delta < 0);
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
    constructor(scrollerFactory, changeNotification, suspendService, ngZone, renderer, scrollSyncService, resizeService, editService, supportService, navigationService, scrollRequestService, localization, columnResizingService, changeDetector, pdfService, columnInfo) {
        this.changeNotification = changeNotification;
        this.suspendService = suspendService;
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
        this.skip = 0;
        this.columns = new ColumnsContainer(() => []);
        this.trackBy = defaultTrackBy;
        this.contentScroll = new EventEmitter();
        this.pageChange = new EventEmitter();
        this.scrollBottom = new EventEmitter();
        this.columnsStartIdx = 0;
        this.resizeSensors = new QueryList();
        this.subscriptions = new Subscription();
        this.dispatcher = new Subject();
        this.containerScrollTop = 0;
        this.scrollLeft = 0;
        this.rtl = false;
        this.scroller = scrollerFactory(this.dispatcher);
        this.subscriptions = scrollRequestService.requests.subscribe(x => this.scrollTo(x));
    }
    get hostClass() {
        return true;
    }
    get hostRole() {
        return 'presentation';
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
        return expandColumns(this.lockedLeafColumns.toArray()).reduce((prev, curr) => prev + (curr.width || 0), 0);
    }
    get nonLockedWidth() {
        if (!this.rtl && this.lockedLeafColumns.length) {
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
        this.rowHeightService = new RowHeightService(this.total, this.rowHeight);
        this.totalHeight = this.rowHeightService.totalHeight();
        if (!isUniversal()) {
            this.ngZone.runOutsideAngular(this.createScroller.bind(this));
        }
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
        if (this.lockedContainer) {
            this.ngZone.runOutsideAngular(() => {
                this.subscriptions.add(merge(fromEvent(this.lockedContainer.nativeElement, 'mousewheel'), fromEvent(this.lockedContainer.nativeElement, 'DOMMouseScroll')).pipe(filter((event) => !event.ctrlKey), tap(preventLockedScroll(this.container.nativeElement)), map(wheelDeltaY))
                    .subscribe(x => this.container.nativeElement.scrollTop -= x));
                this.subscriptions.add(fromEvent(this.lockedContainer.nativeElement, 'scroll').pipe(filter(() => !this.suspendService.scroll))
                    .subscribe(() => {
                    const lockedScrollTop = this.lockedContainer.nativeElement.scrollTop;
                    if (lockedScrollTop !== this.containerScrollTop) {
                        this.container.nativeElement.scrollTop = this.containerScrollTop = lockedScrollTop;
                    }
                }));
                this.subscriptions.add(fromEvent(this.lockedContainer.nativeElement, 'keydown').pipe(filter((event) => event.keyCode === Keys.PageDown || event.keyCode === Keys.PageUp)).subscribe((event) => {
                    const dir = event.keyCode === Keys.PageDown ? 1 : -1;
                    const element = this.container.nativeElement;
                    element.scrollTop += element.offsetHeight * dir * 0.8;
                    event.preventDefault();
                }));
            });
            this.syncRowsHeight();
        }
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
    handleRowSync() {
        const isLocked = () => isPresent(this.lockedContainer);
        return merge(this.changeNotification.changes, this.editService.changed, this.resizeService.changes, this.columnResizingService.changes, this.supportService.changes).pipe(tap(() => this.resetNavigationViewport()), filter(isLocked))
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
                this.container.nativeElement.scrollLeft = this.normalizeScrollLeft(offset);
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
            !this.navigationService.needsViewport() || this.view.length === 0) {
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
        this.navigationService.setViewport(firstItemIndex, lastItemIndex);
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
        const viewportStart = lockedCount + startIdx;
        let viewportEnd = lockedCount + endIdx;
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
                selector: 'kendo-treelist-list',
                template: `
    <div #lockedContainer class="k-grid-content-locked" role="presentation"
        *ngIf="isLocked" [style.width.px]="lockedWidth">
        <div role="presentation" class="k-grid-table-wrap">
            <table [locked]="true" #lockedTable class="k-grid-table" role="presentation" [style.width.px]="lockedWidth">
                <colgroup kendoTreeListColGroup
                    role="presentation"
                    [columns]="lockedLeafColumns">
                </colgroup>
                <tbody kendoTreeListTableBody
                    role="presentation"
                    [isLocked]="true"
                    [view]="view"
                    [noRecordsText]="''"
                    [columns]="lockedLeafColumns"
                    [totalColumnsCount]="leafColumns.length"
                    [skip]="skip"
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
               [kendoTreeListResizableContainer]="lockedLeafColumns.length"
               [lockedWidth]="lockedWidth + 1">
        <div role="presentation" class="k-grid-table-wrap">
            <table [style.width.px]="nonLockedWidth" #table
              class="k-grid-table" role="presentation">
                <colgroup kendoTreeListColGroup
                    role="presentation"
                    [columns]="nonLockedColumnsToRender">
                </colgroup>
                <tbody kendoTreeListTableBody
                    role="presentation"
                    [view]="view"
                    [columns]="nonLockedColumnsToRender"
                    [allColumns]="nonLockedLeafColumns"
                    [noRecordsTemplate]="noRecordsTemplate"
                    [lockedColumnsCount]="lockedLeafColumns.length"
                    [totalColumnsCount]="leafColumns.length"
                    [skip]="skip"
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
    <div *ngIf="loading" kendoTreeListLoading>
    </div>
    `
            },] },
];
/** @nocollapse */
ListComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [SCROLLER_FACTORY_TOKEN,] }] },
    { type: ChangeNotificationService },
    { type: SuspendService },
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
    view: [{ type: Input }],
    total: [{ type: Input }],
    rowHeight: [{ type: Input }],
    take: [{ type: Input }],
    skip: [{ type: Input }],
    columns: [{ type: Input }],
    noRecordsTemplate: [{ type: Input }],
    filterable: [{ type: Input }],
    rowClass: [{ type: Input }],
    loading: [{ type: Input }],
    trackBy: [{ type: Input }],
    virtualColumns: [{ type: Input }],
    isVirtual: [{ type: Input }],
    contentScroll: [{ type: Output }],
    pageChange: [{ type: Output }],
    scrollBottom: [{ type: Output }],
    container: [{ type: ViewChild, args: ["container",] }],
    lockedContainer: [{ type: ViewChild, args: ["lockedContainer",] }],
    lockedTable: [{ type: ViewChild, args: ["lockedTable",] }],
    table: [{ type: ViewChild, args: ["table",] }],
    resizeSensors: [{ type: ViewChildren, args: [ResizeSensorComponent,] }]
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
    columnsReset: [{ type: Input }]
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
                selector: '[kendoTreeListLocalizedMessages]'
            },] },
];
/** @nocollapse */
LocalizedMessagesDirective.ctorParameters = () => [
    { type: LocalizationService }
];

/**
 * Custom component messages override default component messages
 * ([see example]({% slug globalization_treelist %}#toc-localization)).
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
                selector: 'kendo-treelist-messages',
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
        this.filterRowClass = true;
        this.filterLabel = this.localization.get('filter');
    }
}
FilterRowComponent.decorators = [
    { type: Component, args: [{
                selector: '[kendoTreeListFilterRow]',
                template: `
      <td *ngFor="let column of columns; let columnIndex = index"
          [attr.aria-label]="filterLabel"
          kendoTreeListFilterCell
            [column]="column"
            [filter]="filter"
          kendoTreeListLogicalCell
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
    logicalRowIndex: [{ type: Input }],
    lockedColumnsCount: [{ type: Input }],
    filterRowClass: [{ type: HostBinding, args: ['class.k-filter-row',] }]
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
                selector: '[kendoTreeListFilterCell]',
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

const localizeOperators = operators$$1 => localization => Object.keys(operators$$1).reduce((acc, key) => {
    acc[operators$$1[key]] = localization.get(key);
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
const localizeOperators$1 = operators$$1 => localization => Object.keys(operators$$1).map(key => ({
    text: localization.get(key),
    value: operators$$1[key]
}));
/**
 * An abstract base class for the filter-cell component ([see example]({% slug reusablecustomfilters_treelist %}#toc-filter-row)).
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
 *      <kendo-treelist-column field="ProductName" title="Product Name">
 *          <ng-template kendoTreeListFilterCellTemplate let-filter let-column="column">
 *          <kendo-treelist-numeric-filter-cell
 *              [column]="column"
 *              [filter]="filter">
 *          </kendo-treelist-numeric-filter-cell>
 *          </ng-template>
 *      </kendo-treelist-column>
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
}
NumericFilterCellComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-treelist-numeric-filter-cell',
                template: `
        <kendo-treelist-filter-wrapper-cell
            [column]="column"
            [filter]="filter"
            [operators]="operators"
            [defaultOperator]="operator"
            [showOperators]="showOperators">
            <kendo-numerictextbox
                kendoTreeListFocusable
                kendoFilterInput
                [filterDelay]="filterDelay"
                [autoCorrect]="true"
                [value]="currentFilter?.value"
                [format]="format"
                [decimals]="decimals"
                [spinners]="spinners"
                [min]="min"
                [max]="max"
                [step]="step">
            </kendo-numerictextbox>
        </kendo-treelist-filter-wrapper-cell>
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
    ngOnInit() {
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
                selector: 'kendo-treelist-filter-wrapper-cell',
                template: `
        <ng-content></ng-content>
        <kendo-treelist-filter-cell-operators
            [showOperators]="showOperators"
            [operators]="operators"
            (clear)="onClear()"
            [showButton]="showButton"
            [(value)]="currentOperator">
        </kendo-treelist-filter-cell-operators>
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
 * ([see example]({% slug builtinfiltertemplate_treelist %}#toc-configuration-components-for-filter-templates)).
 *
 * @example
 *
 *  ```html-no-run
 *      <kendo-treelist-column field="ProductName" title="Product Name">
 *          <ng-template kendoTreeListFilterCellTemplate let-filter let-column="column">
 *          <kendo-treelist-string-filter-cell
 *              [showOperators]="false"
 *              [column]="column"
 *              [filter]="filter">
 *          </kendo-treelist-string-filter-cell>
 *          </ng-template>
 *      </kendo-treelist-column>
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
                selector: 'kendo-treelist-string-filter-cell',
                template: `
        <kendo-treelist-filter-wrapper-cell
            [column]="column"
            [filter]="filter"
            [operators]="operators"
            [defaultOperator]="operator"
            [showOperators]="showOperators">
            <input
                class="k-textbox"
                kendoTreeListFocusable
                kendoFilterInput
                [filterDelay]="filterDelay"
                [ngModel]="currentFilter?.value" />
        </kendo-treelist-filter-wrapper-cell>
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
                selector: 'kendo-treelist-filter-cell-operators',
                template: `
        <kendo-dropdownlist
            #dropdown
            *ngIf="showOperators"
            kendoTreeListFocusable
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
            kendoTreeListFocusable
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
                selector: 'kendo-treelist-autocomplete-filter-cell',
                template: `
        <kendo-treelist-filter-wrapper-cell
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
        </kendo-treelist-filter-wrapper-cell>
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
 *      <kendo-treelist-column field="ProductName" title="Product Name">
 *          <ng-template kendoTreeListFilterCellTemplate let-filter let-column="column">
 *          <kendo-treelist-boolean-filter-cell
 *              [column]="column"
 *              [filter]="filter">
 *          </kendo-treelist-boolean-filter-cell>
 *          </ng-template>
 *      </kendo-treelist-column>
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
                selector: 'kendo-treelist-boolean-filter-cell',
                template: `
        <kendo-treelist-filter-wrapper-cell
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
        </kendo-treelist-filter-wrapper-cell>
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
 *      <kendo-treelist-column field="OrderDate" title="Order Date">
 *          <ng-template kendoTreeListFilterCellTemplate let-filter let-column="column">
 *          <kendo-treelist-date-filter-cell
 *              [showOperators]="false"
 *              [column]="column"
 *              [filter]="filter">
 *          </kendo-treelist-date-filter-cell>
 *          </ng-template>
 *      </kendo-treelist-column>
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
}
DateFilterCellComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-treelist-date-filter-cell',
                template: `
        <kendo-treelist-filter-wrapper-cell
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
            </kendo-datepicker>
        </kendo-treelist-filter-wrapper-cell>
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
                selector: '[kendoTreeListColGroup]',
                template: `
        <col *ngFor="let column of columnsToRender; trackBy: trackBy;" [style.width.px]="column.width"/>
    `
            },] },
];
ColGroupComponent.propDecorators = {
    columns: [{ type: Input }]
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
                selector: '[kendoTreeListLoading]',
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
    constructor(el, renderer, resizeService, treelist) {
        this.el = el;
        this.renderer = renderer;
        this.resizeService = resizeService;
        this.treelist = treelist;
        this.enabled = false;
    }
    set lockedWidth(value) {
        this._lockedWidth = value;
        if (this.enabled) {
            this.attachResize();
            this.resize();
        }
    }
    set kendoTreeListResizableContainer(enabled) {
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
        if (this.treelist && this.treelist.wrapper) {
            const containerElement = this.treelist.wrapper.nativeElement;
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
                selector: '[kendoTreeListResizableContainer]'
            },] },
];
/** @nocollapse */
ResizableContainerDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: ResizeService },
    { type: TreeListComponent, decorators: [{ type: Optional }] }
];
ResizableContainerDirective.propDecorators = {
    lockedWidth: [{ type: Input, args: ['lockedWidth',] }],
    kendoTreeListResizableContainer: [{ type: Input }]
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
    constructor(focusGroup, element, columnInfoService, idService, navigationService, renderer, zone) {
        this.focusGroup = focusGroup;
        this.element = element;
        this.columnInfoService = columnInfoService;
        this.idService = idService;
        this.navigationService = navigationService;
        this.renderer = renderer;
        this.zone = zone;
        this.logicalSlaveCell = false;
        this.colSpan = 1;
        this.rowSpan = 1;
        this.dataRowIndex = -1;
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
        // if (this.cellContext) {
        // this.cellContext.focusGroup = this.focusGroup;
        // }
        this.registerNoChanges();
    }
    ngOnChanges(changes) {
        if (!this.navigationService.enabled) {
            return;
        }
        if (this.logicalColIndex === -1) {
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
                selector: '[kendoTreeListLogicalCell]'
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
    { type: NgZone }
];
LogicalCellDirective.propDecorators = {
    logicalColIndex: [{ type: Input }],
    logicalRowIndex: [{ type: Input }],
    logicalSlaveCell: [{ type: Input }],
    colIndex: [{ type: Input }],
    colSpan: [{ type: Input }],
    rowSpan: [{ type: Input }],
    dataRowIndex: [{ type: Input }],
    dataItem: [{ type: Input }],
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
                selector: '[kendoTreeListLogicalRow]'
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
const columnsToResize = ({ columns }) => Math.max(1, resizableColumns(columns).length - 1);
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
            .registerTable(this.autoFitObservable.bind(this));
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
        this.originalWidth = offsetWidth(this.element.nativeElement);
    }
    resize(deltas) {
        const delta = deltas.reduce((sum, item) => sum + item, 0);
        this.updateWidth(this.originalWidth + delta);
    }
    updateWidth(width) {
        this.renderer.setStyle(this.element.nativeElement, 'width', width + 'px');
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
        return Math.max(header, data);
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
    minWidth: [{ type: HostBinding, args: ['style.min-width',] }]
};

const exportedModules = [
    ColumnComponent,
    ColumnGroupComponent,
    LogicalCellDirective,
    LogicalRowDirective,
    FocusableDirective,
    ColGroupComponent,
    ResizableContainerDirective,
    TemplateContextDirective,
    FieldAccessorPipe,
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
            FocusableDirective
        ];
    }
}
SharedModule.decorators = [
    { type: NgModule, args: [{
                declarations: [exportedModules],
                exports: [exportedModules, DraggableModule],
                imports: [CommonModule]
            },] },
];

/**
 * Represents the `Contains` (**Contains**) filter operator.
 *
 * For more information and examples, refer to:
 * * [Setting the default filter operators]({% slug builtinfiltertemplate_treelist %}#toc-setting-the-default-filter-operator)
 * * [Setting the order of the filter operators]({% slug builtinfiltertemplate_treelist %}#toc-setting-the-order-of-the-filter-operators)
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
 * * [Setting the default filter operators]({% slug builtinfiltertemplate_treelist %}#toc-setting-the-default-filter-operator)
 * * [Setting the order of the filter operators]({% slug builtinfiltertemplate_treelist %}#toc-setting-the-order-of-the-filter-operators)
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
 * * [Setting the default filter operators]({% slug builtinfiltertemplate_treelist %}#toc-setting-the-default-filter-operator)
 * * [Setting the order of the filter operators]({% slug builtinfiltertemplate_treelist %}#toc-setting-the-order-of-the-filter-operators)
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
 * * [Setting the default filter operators]({% slug builtinfiltertemplate_treelist %}#toc-setting-the-default-filter-operator)
 * * [Setting the order of the filter operators]({% slug builtinfiltertemplate_treelist %}#toc-setting-the-order-of-the-filter-operators)
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
 * * [Setting the default filter operators]({% slug builtinfiltertemplate_treelist %}#toc-setting-the-default-filter-operator)
 * * [Setting the order of the filter operators]({% slug builtinfiltertemplate_treelist %}#toc-setting-the-order-of-the-filter-operators)
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
 * * [Setting the default filter operators]({% slug builtinfiltertemplate_treelist %}#toc-setting-the-default-filter-operator)
 * * [Setting the order of the filter operators]({% slug builtinfiltertemplate_treelist %}#toc-setting-the-order-of-the-filter-operators)
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
 * * [Setting the default filter operators]({% slug builtinfiltertemplate_treelist %}#toc-setting-the-default-filter-operator)
 * * [Setting the order of the filter operators]({% slug builtinfiltertemplate_treelist %}#toc-setting-the-order-of-the-filter-operators)
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
 * * [Setting the default filter operators]({% slug builtinfiltertemplate_treelist %}#toc-setting-the-default-filter-operator)
 * * [Setting the order of the filter operators]({% slug builtinfiltertemplate_treelist %}#toc-setting-the-order-of-the-filter-operators)
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
 * * [Setting the default filter operators]({% slug builtinfiltertemplate_treelist %}#toc-setting-the-default-filter-operator)
 * * [Setting the order of the filter operators]({% slug builtinfiltertemplate_treelist %}#toc-setting-the-order-of-the-filter-operators)
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
 * * [Setting the default filter operators]({% slug builtinfiltertemplate_treelist %}#toc-setting-the-default-filter-operator)
 * * [Setting the order of the filter operators]({% slug builtinfiltertemplate_treelist %}#toc-setting-the-order-of-the-filter-operators)
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
 * * [Setting the default filter operators]({% slug builtinfiltertemplate_treelist %}#toc-setting-the-default-filter-operator)
 * * [Setting the order of the filter operators]({% slug builtinfiltertemplate_treelist %}#toc-setting-the-order-of-the-filter-operators)
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
 * * [Setting the default filter operators]({% slug builtinfiltertemplate_treelist %}#toc-setting-the-default-filter-operator)
 * * [Setting the order of the filter operators]({% slug builtinfiltertemplate_treelist %}#toc-setting-the-order-of-the-filter-operators)
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
 * * [Setting the default filter operators]({% slug builtinfiltertemplate_treelist %}#toc-setting-the-default-filter-operator)
 * * [Setting the order of the filter operators]({% slug builtinfiltertemplate_treelist %}#toc-setting-the-order-of-the-filter-operators)
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
 * * [Setting the default filter operators]({% slug builtinfiltertemplate_treelist %}#toc-setting-the-default-filter-operator)
 * * [Setting the order of the filter operators]({% slug builtinfiltertemplate_treelist %}#toc-setting-the-order-of-the-filter-operators)
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
 * * [Setting the default filter operators]({% slug builtinfiltertemplate_treelist %}#toc-setting-the-default-filter-operator)
 * * [Setting the order of the filter operators]({% slug builtinfiltertemplate_treelist %}#toc-setting-the-order-of-the-filter-operators)
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
 * * [Setting the default filter operators]({% slug builtinfiltertemplate_treelist %}#toc-setting-the-default-filter-operator)
 * * [Setting the order of the filter operators]({% slug builtinfiltertemplate_treelist %}#toc-setting-the-order-of-the-filter-operators)
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
 * * [Setting the default filter operators]({% slug builtinfiltertemplate_treelist %}#toc-setting-the-default-filter-operator)
 * * [Setting the order of the filter operators]({% slug builtinfiltertemplate_treelist %}#toc-setting-the-order-of-the-filter-operators)
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
 * * [Setting the default filter operators]({% slug builtinfiltertemplate_treelist %}#toc-setting-the-default-filter-operator)
 * * [Setting the order of the filter operators]({% slug builtinfiltertemplate_treelist %}#toc-setting-the-order-of-the-filter-operators)
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
 * > List the following components in the TreeListModule as `entryComponents`.
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
        this.allCount = 0;
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
    get treelistPagerClass() {
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
        context.allCount = this.allCount || this.total;
        context.skip = this.skip;
        context.pageSize = this.pageSize;
        context.currentPage = this.currentPage;
        return context;
    }
    ngOnInit() {
        this.pageChangeSubscription = this.pagerContext.pageChange.subscribe(this.changePage.bind(this));
    }
    ngOnChanges(changes) {
        if (anyChanged(["pageSize", "skip", "total", "allCount"], changes, false)) {
            this.pagerContext.notifyChanges({
                pageSize: this.pageSize,
                skip: this.skip,
                total: this.total,
                allCount: this.allCount || this.total
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
    allCount: [{ type: Input }],
    total: [{ type: Input }],
    skip: [{ type: Input }],
    pageSize: [{ type: Input }],
    options: [{ type: Input }],
    template: [{ type: Input }],
    pageChange: [{ type: Output }],
    pagerWrapClass: [{ type: HostBinding, args: ['class.k-pager-wrap',] }],
    treelistPagerClass: [{ type: HostBinding, args: ['class.k-grid-pager',] }],
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
        this.allCount = this.pagerContext.allCount;
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
 * Displays buttons for navigating to the first and to the previous page ([see example]({% slug paging_treelist %}#toc-pager-templates)).
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
 * Displays buttons for navigating to the next and to the last page ([see example]({% slug paging_treelist %}#toc-pager-templates)).
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

// tslint:disable:no-access-missing-member
/**
 * Displays an input element which allows the typing and rendering of page numbers.
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
            [style.margin]="'0 1ex'"
            [style.width]="'3em'"
            [spinners]="false"
            [decimals]="0"
            format="n0"
            [disabled]="!hasPages"
            [value]="current"
            [min]="hasPages ? 1 : 0"
            [max]="totalPages"
            [autoCorrect]="true"
            [kendoEventsOutsideAngular]="{
                keydown: handleKeyDown,
                focusout: handleBlur
            }"></kendo-numerictextbox>
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
 * Displays information about the current page and the total number of records ([see example]({% slug paging_treelist %}#toc-pager-templates)).
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
    onChanges({ allCount, total, skip, pageSize }) {
        this.total = total;
        this.skip = skip;
        this.pageSize = pageSize;
        this.allCount = allCount;
        this.cd.markForCheck();
    }
}
PagerInfoComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-pager-info',
                template: `{{currentPageText}} - {{maxItems}} {{textFor('pagerOf')}} {{allCount}} {{textFor('pagerItems')}}`
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
 * Displays a drop-down list for the page size selection ([see example]({% slug paging_treelist %}#toc-pager-templates)).
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
     * {% meta height:500 %}
     * {% embed_file configuration/pager-template-page-sizes/app.component.ts preview %}
     * {% embed_file shared/app.module.ts %}
     * {% embed_file shared/filesystem.ts %}
     * {% embed_file shared/main.ts %}
     * {% endmeta %}
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
    classes: [{ type: HostBinding, args: ["class.k-pager-sizes",] }, { type: HostBinding, args: ["class.k-label",] }]
};

const importedModules$1 = [
    CommonModule,
    InputsModule,
    SharedModule,
    EventsModule
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
const preventOnDblClick = release => mouseDown => of(mouseDown).pipe(delay(150), takeUntil(release));
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
        this.subscriptions.add(this.zone.runOutsideAngular(() => this.draggable.kendoPress.pipe(tap(stopPropagation), tap(() => this.service.start(this.column)), switchMap(preventOnDblClick(this.draggable.kendoRelease)), switchMap(createMoveStream(this.service, this.draggable)))
            .subscribe(({ pageX, originalX }) => {
            const delta = pageX - originalX;
            const percent = toPercentage(delta, this.originalWidth);
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
        this.originalWidth = headerWidth(this.element);
        this.service.resizedColumn({
            column: this.column,
            oldWidth: this.originalWidth
        });
    }
    resize({ deltaPercent }) {
        let delta = fromPercentage(this.originalWidth, deltaPercent);
        if (isTruthy(this.rtl)) {
            delta *= -1;
        }
        const newWidth = Math.max(this.originalWidth + delta, this.column.minResizableWidth);
        const tableDelta = newWidth > this.column.minResizableWidth ?
            delta : this.column.minResizableWidth - this.originalWidth;
        this.updateWidth(this.column, newWidth);
        this.service.resizeTable(this.column, tableDelta);
    }
    sizeToFit({ columns, widths }) {
        const index = columns.indexOf(this.column);
        const width = Math.max(...widths.map(w => w[index])) + 1; //add 1px for IE
        const tableDelta = width - this.originalWidth;
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
                selector: '[kendoTreeListColumnHandle]'
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
                selector: 'kendo-treelist-filter-menu',
                template: `
        <a #anchor
            [ngClass]="{'k-grid-filter':true, 'k-state-active': hasFilters}"
            (click)="toggle(anchor, template)"
            href="#"
            [attr.title]="filterLabel">
            <span class="k-icon k-i-filter"></span>
        </a>
        <ng-template #template>
            <kendo-treelist-filter-menu-container
                [column]="column"
                [filter]="filter"
                (close)="close()"
                >
            </kendo-treelist-filter-menu-container>
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
                selector: 'kendo-treelist-filter-menu-container',
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
                selector: 'kendo-treelist-filter-menu-input-wrapper',
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
                selector: 'kendo-treelist-string-filter-menu-input',
                template: `
        <kendo-treelist-filter-menu-input-wrapper
            [column]="column"
            [filter]="filter"
            [operators]="operators"
            [defaultOperator]="operator"
            [currentFilter]="currentFilter"
            [filterService]="filterService"
            >
            <input class="k-textbox" kendoFilterInput [filterDelay]="0" [ngModel]="currentFilter?.value" />
        </kendo-treelist-filter-menu-input-wrapper>
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
 * ([see example]({% slug builtinfiltertemplate_treelist %}#toc-configuration-components-for-filter-templates)).
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
                selector: 'kendo-treelist-string-filter-menu',
                template: `
        <kendo-treelist-string-filter-menu-input
            [currentFilter]="firstFilter"
            [operators]="operators"
            [filterService]="filterService"
            [column]="column"
            [filter]="filter">
        </kendo-treelist-string-filter-menu-input>
        <kendo-dropdownlist
            *ngIf="extra"
            class="k-filter-and"
            [data]="logicOperators"
            [valuePrimitive]="true" (valueChange)="logicChange($event)"
            [value]="filter?.logic"
            textField="text"
            valueField="value">
        </kendo-dropdownlist>
        <kendo-treelist-string-filter-menu-input
            *ngIf="extra"
            [operators]="operators"
            [currentFilter]="secondFilter"
            [filterService]="filterService"
            [column]="column"
            [filter]="filter">
        </kendo-treelist-string-filter-menu-input>
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
 *      <kendo-treelist-column field="UnitPrice" title="Unit Price">
 *          <ng-template kendoTreeListFilterMenuTemplate let-filter let-column="column" let-filterService="filterService">
 *          <kendo-treelist-numeric-filter-menu
 *              [column]="column"
 *              [filter]="filter"
 *              [filterService]="filterService"
 *              >
 *          </kendo-treelist-numeric-filter-menu>
 *          </ng-template>
 *      </kendo-treelist-column>
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
                selector: 'kendo-treelist-numeric-filter-menu',
                template: `
        <kendo-treelist-numeric-filter-menu-input
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
        </kendo-treelist-numeric-filter-menu-input>
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
        <kendo-treelist-numeric-filter-menu-input
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
        </kendo-treelist-numeric-filter-menu-input>
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
    constructor() {
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
}
NumericFilterMenuInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-treelist-numeric-filter-menu-input',
                template: `
        <kendo-treelist-filter-menu-input-wrapper
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
                [step]="step">
            </kendo-numerictextbox>
        </kendo-treelist-filter-menu-input-wrapper>
    `
            },] },
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
 *      <kendo-treelist-column field="OrderDate" title="Order Date">
 *          <ng-template kendoTreeListFilterMenuTemplate let-filter let-column="column" let-filterService="filterService">
 *            <kendo-treelist-date-filter-menu
 *                [column]="column"
 *                [filter]="filter"
 *                [filterService]="filterService"
 *                >
 *            </kendo-treelist-date-filter-menu>
 *          </ng-template>
 *      </kendo-treelist-column>
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
                selector: 'kendo-treelist-date-filter-menu',
                template: `
        <kendo-treelist-date-filter-menu-input
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
        </kendo-treelist-date-filter-menu-input>
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
        <kendo-treelist-date-filter-menu-input
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
        </kendo-treelist-date-filter-menu-input>
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
 *      <kendo-treelist-column field="Discontinued" title="Discontinued">
 *          <ng-template kendoTreeListFilterMenuTemplate let-filter let-column="column" let-filterService="filterService">
 *            <kendo-treelist-boolean-filter-menu
 *                [column]="column"
 *                [filter]="filter"
 *                [filterService]="filterService"
 *                >
 *            </kendo-treelist-boolean-filter-menu>
 *          </ng-template>
 *      </kendo-treelist-column>
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
                selector: 'kendo-treelist-boolean-filter-menu',
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
 * > List the following components as `entryComponents` in the TreeListModule.
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
    constructor(popupService) {
        this.popupService = popupService;
        this.operators = [];
    }
    open(picker) {
        this.subscription = this.popupService.onClose
            .pipe(filter(() => picker.isActive))
            .subscribe(e => e.preventDefault());
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
DateFilterMenuInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-treelist-date-filter-menu-input',
                template: `
        <kendo-treelist-filter-menu-input-wrapper
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
            </kendo-datepicker>
        </kendo-treelist-filter-menu-input-wrapper>
    `
            },] },
];
/** @nocollapse */
DateFilterMenuInputComponent.ctorParameters = () => [
    { type: SinglePopupService }
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

// TODO
// tslint:disable:rxjs-no-unsafe-takeuntil
/**
 * @hidden
 */
const preventOnDblClick$1 = release => mouseDown => of(mouseDown).pipe(delay(150), takeUntil(release));
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
        }), switchMap(preventOnDblClick$1(this.draggable.kendoRelease)), tap(down => {
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

/**
 * Represents the component for selecting columns in the TreeList. To enable the user to show or hide columns,
 * add the component inside a [`ToolbarTemplate`]({% slug api_treelist_toolbartemplatedirective %}) directive.
 *
 * {% meta height:500 %}
 * {% embed_file column-menu/chooser-toolbar/app.component.ts preview %}
 * {% embed_file column-menu/app.module.ts %}
 * {% embed_file column-menu/main.ts %}
 * {% embed_file shared/employees.ts %}
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
                selector: 'kendo-treelist-column-chooser',
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
            <kendo-treelist-columnlist
                [columns]="columns"
                [applyText]="localization.get('columnsApply')"
                [resetText]="localization.get('columnsReset')"
                [autoSync]="autoSync"
                [allowHideAll]="allowHideAll"
                (apply)="onApply($event)"
                (columnChange)="onChange($event)">
            </kendo-treelist-columnlist>
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
 * [`ColumnMenuTemplate`]({% slug api_treelist_columnmenutemplatedirective %}) directive.
 *
 * {% meta height:500 %}
 * {% embed_file column-menu/template-item/app.component.ts preview %}
 * {% embed_file column-menu/app.module.ts %}
 * {% embed_file column-menu/main.ts %}
 * {% embed_file shared/employees.ts %}
 * {% endmeta %}
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
 * Represents the component for selecting columns in the TreeList that can be placed
 * inside a [`ColumnMenuTemplate`]({% slug api_treelist_columnmenutemplatedirective %}) directive.
 *
 * > You have to set the [ColumnMenuService]({% slug api_treelist_columnmenuservice %}) that is passed by
 * > the template to the service input of the `kendo-treelist-columnmenu-chooser` component.
 *
 * {% meta height:500 %}
 * {% embed_file column-menu/template-chooser/app.component.ts preview %}
 * {% embed_file column-menu/app.module.ts %}
 * {% embed_file column-menu/main.ts %}
 * {% embed_file shared/employees.ts %}
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
                selector: 'kendo-treelist-columnmenu-chooser',
                template: `
        <kendo-treelist-columnmenu-item [text]="localization.get('columns')"
            icon="columns" [expanded]="expanded" (collapse)="collapse.emit()" (expand)="expand.emit()">
            <ng-template kendoTreeListColumnMenuItemContentTemplate>
                <kendo-treelist-columnlist
                    [applyText]="localization.get('columnsApply')"
                    [resetText]="localization.get('columnsReset')"
                    [columns]="columns"
                    [autoSync]="false"
                    [allowHideAll]="false"
                    [actionsClass]="actionsClass"
                    (apply)="onApply($event)">
                </kendo-treelist-columnlist>
            </ng-template>
        </kendo-treelist-columnmenu-item>
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
 * Represents the component for editing column filters in the TreeList that can be placed
 * inside a [`ColumnMenuTemplate`]({% slug api_treelist_columnmenutemplatedirective %}) directive.
 *
 * > You have to set the [ColumnMenuService]({% slug api_treelist_columnmenuservice %}) that is passed by
 * > the template to the service input of the `kendo-treelist-columnmenu-filter` component.
 *
 * {% meta height:500 %}
 * {% embed_file column-menu/template-filter/app.component.ts preview %}
 * {% embed_file column-menu/app.module.ts %}
 * {% embed_file column-menu/main.ts %}
 * {% embed_file shared/employees.ts %}
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
                selector: 'kendo-treelist-columnmenu-filter',
                template: `
        <kendo-treelist-columnmenu-item [text]="localization.get('filter')" icon="filter"
            [expanded]="expanded" (collapse)="collapse.emit()" (expand)="expand.emit()">
            <ng-template kendoTreeListColumnMenuItemContentTemplate>
                    <kendo-treelist-filter-menu-container
                        [column]="service.column"
                        [filter]="service.filter"
                        [actionsClass]="actionsClass"
                        (close)="close()">
                    </kendo-treelist-filter-menu-container>
                </ng-template>
        </kendo-treelist-columnmenu-item>
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
 * [`kendo-treelist-columnmenu-item`]({% slug api_treelist_columnmenuitemcomponent %}) component.
 * Provides an option for specifying the content of a column item.
 * To define the content template, nest an `<ng-template>` tag with the
 * `kendoTreeListColumnMenuItemContentTemplate` directive inside a `<kendo-treelist-columnmenu-item>`.
 *
 * {% meta height:500 %}
 * {% embed_file column-menu/template-item-content/app.component.ts preview %}
 * {% embed_file column-menu/app.module.ts %}
 * {% embed_file column-menu/main.ts %}
 * {% embed_file shared/employees.ts %}
 * {% endmeta %}
 */
class ColumnMenuItemContentTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
ColumnMenuItemContentTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoTreeListColumnMenuItemContentTemplate]'
            },] },
];
/** @nocollapse */
ColumnMenuItemContentTemplateDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Optional }] }
];

/**
 * Represents an item that can be placed inside a
 * [`ColumnMenuTemplate`]({% slug api_treelist_columnmenutemplatedirective %}) directive.
 *
 * {% meta height:500 %}
 * {% embed_file column-menu/template-item/app.component.ts preview %}
 * {% embed_file column-menu/app.module.ts %}
 * {% embed_file column-menu/main.ts %}
 * {% embed_file shared/employees.ts %}
 * {% endmeta %}
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
                selector: 'kendo-treelist-columnmenu-item',
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
 * Represents a column-menu item for sorting TreeList columns that can be placed inside a
 * [`ColumnMenuTemplate`]({% slug api_treelist_columnmenutemplatedirective %}) directive.
 * Allows the user to sort the column.
 *
 * > You have to set the [ColumnMenuService]({% slug api_treelist_columnmenuservice %}) that is passed by
 * > the template to the service input of the `kendo-treelist-columnmenu-sort` component.
 *
 * {% meta height:500 %}
 * {% embed_file column-menu/template-sort/app.component.ts preview %}
 * {% embed_file column-menu/app.module.ts %}
 * {% embed_file column-menu/main.ts %}
 * {% embed_file shared/employees.ts %}
 * {% endmeta %}
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
                selector: 'kendo-treelist-columnmenu-sort',
                template: `
        <kendo-treelist-columnmenu-item [text]="localization.get('sortAscending')"
            icon="sort-asc-sm" (itemClick)="toggleSort('asc')" [selected]="sortedAsc">
        </kendo-treelist-columnmenu-item>
        <kendo-treelist-columnmenu-item [text]="localization.get('sortDescending')"
            icon="sort-desc-sm" (itemClick)="toggleSort('desc')" [selected]="sortedDesc">
        </kendo-treelist-columnmenu-item>
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
 * Represents the [column menu]({% slug columnmenu_treelist %}) component.
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
                selector: 'kendo-treelist-column-menu',
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
            <kendo-treelist-columnmenu-sort *ngIf="hasSort" [service]="service">
            </kendo-treelist-columnmenu-sort>
            <kendo-treelist-columnmenu-lock *ngIf="hasLock" [service]="service">
            </kendo-treelist-columnmenu-lock>
            <kendo-treelist-columnmenu-chooser *ngIf="hasColumnChooser" [service]="service"
                [expanded]="expandedColumns" (expand)="onColumnsExpand()">
            </kendo-treelist-columnmenu-chooser>
            <kendo-treelist-columnmenu-filter *ngIf="hasFilter" [service]="service"
                [expanded]="expandedFilter" (expand)="onFilterExpand()">
            </kendo-treelist-columnmenu-filter>
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
 * [`ColumnMenuTemplate`]({% slug api_treelist_columnmenutemplatedirective %}) directive.
 * Allows the user to lock or unlock the columns.
 *
 * > You have to set the [ColumnMenuService]({% slug api_treelist_columnmenuservice %}) that is passed by
 * > the template to the service input of the `kendo-treelist-columnmenu-lock` component.
 *
 * {% meta height:500 %}
 * {% embed_file column-menu/template-item-lock/app.component.ts preview %}
 * {% embed_file column-menu/app.module.ts %}
 * {% embed_file column-menu/main.ts %}
 * {% embed_file shared/employees.ts %}
 * {% endmeta %}
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
            if (column.children) {
                columns.push(...column.children.toArray().slice(1));
            }
            if (column.childColumns) {
                columns.push(...column.childColumns.toArray());
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
                selector: 'kendo-treelist-columnmenu-lock',
                template: `
       <kendo-treelist-columnmenu-item [text]="text" [icon]="icon" (itemClick)="toggleColumn()" [disabled]="disabled">
       </kendo-treelist-columnmenu-item>
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

const exportedModules$1 = [
    HeaderComponent,
    HeaderTemplateDirective,
    ColumnHandleDirective
];
const importedModules$2 = [
    CommonModule,
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
            HeaderTemplateDirective
        ];
    }
}
HeaderModule.decorators = [
    { type: NgModule, args: [{
                declarations: [exportedModules$1],
                exports: [exportedModules$1],
                imports: [...importedModules$2]
            },] },
];

/**
 * Represents the command columns of the TreeList. You have to define the content of the
 * column inside an `<ng-template>` tag. The template context is set to the current
 * data item. For more information and examples on using the passed fields
 * and the command directives, refer to the article on
 * [editing the TreeList in Angular Reactive Forms]({% slug editing_reactive_forms_treelist %}).
 *
 * The following additional fields are passed:
 * - `columnIndex`&mdash;The current column index.
 * - `rowIndex`&mdash;The current row index. If inside a new item row, `rowIndex`is `-1`.
 * - `dataItem`&mdash;The current data item.
 * - `column`&mdash;The current column instance.
 * - `isNew`&mdash;The state of the current item.
 *
 * Usually, the template contains CRUD command directives such as:
 * - [`EditCommandDirective`]({% slug api_treelist_editcommanddirective %})
 * - [`RemoveCommandDirective`]({% slug api_treelist_removecommanddirective %})
 * - [`CancelCommandDirective`]({% slug api_treelist_cancelcommanddirective %})
 * - [`SaveCommandDirective`]({% slug api_treelist_savecommanddirective %})
 *
 * {% meta height:590 %}
 * {% embed_file editing/editing-directives/reactive-editing/app.component.ts preview %}
 * {% embed_file shared/employees.ts %}
 * {% embed_file editing/editing-directives/reactive-editing/app.module.ts %}
 * {% embed_file shared/main.ts %}
 * {% endmeta %}
 */
class CommandColumnComponent extends ColumnBase$1 {
    constructor(parent, optionChanges) {
        super(parent, optionChanges);
        this.parent = parent;
        this.isCommand = true;
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
                selector: 'kendo-treelist-command-column',
                template: ``
            },] },
];
/** @nocollapse */
CommandColumnComponent.ctorParameters = () => [
    { type: ColumnBase$1, decorators: [{ type: SkipSelf }, { type: Host }, { type: Optional }] },
    { type: OptionChangesService }
];
CommandColumnComponent.propDecorators = {
    template: [{ type: ContentChild, args: [CellTemplateDirective,] }]
};

const columnCellIndex = (cell, cells) => {
    for (let idx = 0; idx < cells.length; idx++) {
        if (cells[idx] === cell) {
            return idx;
        }
    }
};
/**
 * @hidden
 */
class TableBodyComponent {
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

/**
 * @hidden
 */
class CellComponent {
    constructor(editService) {
        this.editService = editService;
        this.isNew = false;
        this.level = 0;
        this.cellContext = {};
        this._templateContext = {};
        this._editTemplateContext = {};
        this.templateContext.cellContext = this.cellContext;
    }
    get commandCellClass() {
        return this.column.isCommand;
    }
    set viewItem(value) {
        this._viewItem = value;
        this.cellContext.viewItem = this.viewItem;
    }
    get viewItem() {
        return this._viewItem;
    }
    get formGroup() {
        return this.viewItem.editContext ? this.viewItem.editContext.group : null;
    }
    get isEdited() {
        return Boolean(this.viewItem.editContext && this.editService.isEditedColumn(this.column) && isColumnEditable(this.column, this.formGroup));
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
    get isSpanColumn() {
        return isSpanColumn(this.column) && !this.column.templateRef;
    }
    get childColumns() {
        return columnsToRender([this.column]);
    }
    ngDoCheck() {
        if (this.column.templateRef) {
            this.updateTemplateContext();
        }
    }
    updateTemplateContext() {
        const context = this._templateContext;
        context.isNew = this.isNew;
        context.column = this.column;
        context.dataItem = this.dataItem;
        context.columnIndex = this.columnIndex;
        context.rowIndex = this.viewItem.rowIndex;
        context.$implicit = this.dataItem;
    }
}
CellComponent.decorators = [
    { type: Component, args: [{
                selector: '[kendoTreeListCell]',
                template: `
        <ng-container [ngSwitch]="isEdited">
            <ng-container *ngSwitchCase="false">
                <ng-container *ngIf="column.expandable">
                    <span class="k-icon k-i-none" *ngFor="let item of level | levelItems : hasChildren"></span>
                    <span class="k-icon" *ngIf="hasChildren" [ngClass]="{ 'k-i-collapse': isExpanded, 'k-i-expand': !isExpanded, 'k-i-loading': loading }"></span>
                </ng-container>
                <ng-container *ngIf="column.templateRef"
                    [ngTemplateOutlet]="column.templateRef"
                    [ngTemplateOutletContext]="templateContext">
                </ng-container>
                <ng-container *ngIf="isSpanColumn">
                    <ng-container *ngFor="let childColumn of childColumns">
                        {{ dataItem | valueOf: childColumn.field: childColumn.format}}
                    </ng-container>
                </ng-container>
                <ng-container *ngIf="isBoundColumn">{{ dataItem | valueOf: column.field: column.format}}</ng-container>
            </ng-container>
            <ng-container *ngSwitchCase="true">
                <ng-container
                    *ngIf="column.editTemplateRef"
                    [ngTemplateOutlet]="column.editTemplateRef"
                    [ngTemplateOutletContext]="editTemplateContext">
                </ng-container>
                <ng-container [ngSwitch]="column.editor" *ngIf="!column.editTemplateRef">
                    <kendo-numerictextbox
                        *ngSwitchCase="'numeric'"
                        [format]="format"
                        [formControl]="formGroup.get(column.field)"
                        kendoTreeListFocusable
                    ></kendo-numerictextbox>

                    <kendo-datepicker
                        *ngSwitchCase="'date'"
                        [format]="format"
                        [formControl]="formGroup.get(column.field)"
                        kendoTreeListFocusable
                    ></kendo-datepicker>

                    <input
                        *ngSwitchCase="'boolean'"
                        type="checkbox"
                        [formControl]="formGroup.get(column.field)"
                        kendoTreeListFocusable
                    />

                    <input
                        *ngSwitchDefault
                        type="text"
                        class="k-textbox"
                        [formControl]="formGroup.get(column.field)"
                        kendoTreeListFocusable
                    />
                </ng-container>
            </ng-container>
        </ng-container>
    `
            },] },
];
/** @nocollapse */
CellComponent.ctorParameters = () => [
    { type: EditService }
];
CellComponent.propDecorators = {
    commandCellClass: [{ type: HostBinding, args: ['class.k-command-cell',] }],
    column: [{ type: Input }],
    columnIndex: [{ type: Input }],
    isNew: [{ type: Input }],
    level: [{ type: Input }],
    hasChildren: [{ type: Input }],
    isExpanded: [{ type: Input }],
    loading: [{ type: Input }],
    dataItem: [{ type: Input }],
    viewItem: [{ type: Input }]
};

/**
 * @hidden
 */
class BaseCommandDirective extends Button {
    constructor(editService, element, renderer, localization, ngZone) {
        super(element, renderer, null, localization, ngZone);
        this.editService = editService;
    }
    /**
     * @hidden
     */
    get visible() {
        if (this.cellContext) {
            return this.isEdited !== this.readVisible ? '' : 'none';
        }
    }
    get isEdited() {
        return Boolean(this.cellContext && this.cellContext.viewItem.editContext && !this.editService.isEditingCell());
    }
    get dataItem() {
        if (this.cellContext) {
            return this.cellContext.viewItem.data;
        }
    }
    /**
     * @hidden
     */
    clickHandler(e) {
        e.preventDefault();
        this.onClick();
    }
}
BaseCommandDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoTreeListBaseCommand]'
            },] },
];
/** @nocollapse */
BaseCommandDirective.ctorParameters = () => [
    { type: EditService },
    { type: ElementRef },
    { type: Renderer2 },
    { type: LocalizationService },
    { type: NgZone }
];
BaseCommandDirective.propDecorators = {
    visible: [{ type: HostBinding, args: ['style.display',] }],
    clickHandler: [{ type: HostListener, args: ['click', ['$event'],] }]
};

/**
 * Represents the `edit` command of the TreeList. You can apply this directive to any `button`
 * element inside a [`CommandColumnComponent`]({% slug api_treelist_commandcolumncomponent %}).
 * When an associated button with the directive is clicked, the
 * [`edit`]({% slug api_treelist_treelistcomponent %}#toc-edit) event
 * is triggered ([see example]({% slug editing_treelist %})).
 *
 * > When the row is in the edit mode, the button with `kendoTreeListEditCommand` is automatically hidden.
 *
 * @example
 * ```html-no-run
 * <kendo-treelist>
 *   <kendo-treelist-command-column title="command">
 *     <ng-template kendoTreeListCellTemplate>
 *       <button kendoTreeListEditCommand class="k-primary">Edit</button>
 *     </ng-template>
 *   </kendo-treelist-command-column>
 * </kendo-treelist>
 * ```
 *
 */
class EditCommandDirective extends BaseCommandDirective {
    constructor(editService, element, renderer, localization, ngZone) {
        super(editService, element, renderer, localization, ngZone);
        this.commandClass = true;
        this.readVisible = true;
    }
    onClick() {
        if (this.cellContext) {
            this.editService.beginEdit(this.dataItem);
        }
    }
}
EditCommandDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoTreeListEditCommand]'
            },] },
];
/** @nocollapse */
EditCommandDirective.ctorParameters = () => [
    { type: EditService },
    { type: ElementRef },
    { type: Renderer2 },
    { type: LocalizationService },
    { type: NgZone }
];
EditCommandDirective.propDecorators = {
    cellContext: [{ type: Input, args: ['kendoTreeListEditCommand',] }],
    commandClass: [{ type: HostBinding, args: ['class.k-grid-edit-command',] }]
};

/**
 * Represents the `cancel` command of the TreeList. You can apply this directive to any `button`
 * element inside a [`CommandColumnComponent`]({% slug api_treelist_commandcolumncomponent %}).
 * When an associated button with the directive is clicked, the
 * [`cancel`]({% slug api_treelist_treelistcomponent %}#toc-cancel) event
 * is triggered ([see example]({% slug editing_treelist %})).
 *
 * > When the row is not in the edit mode, the button with the `kendoTreeListCancelCommand` is automatically hidden.
 *
 * @example
 * ```html-no-run
 * <kendo-treelist>
 *   <kendo-treelist-command-column title="command">
 *     <ng-template kendoTreeListCellTemplate>
 *       <button kendoTreeListCancelCommand>Cancel changes</button>
 *     </ng-template>
 *   </kendo-treelist-command-column>
 * </kendo-treelist>
 * ```
 *
 * You can control the content of the button based on the state of the row.
 *
 * @example
 * ```html-no-run
 * <kendo-treelist>
 *   <kendo-treelist-command-column title="command">
 *     <ng-template kendoTreeListCellTemplate let-isNew="isNew">
 *       <button kendoTreeListCancelCommand>{{isNew ? 'Discard' : 'Cancel changes'}}</button>
 *     </ng-template>
 *   </kendo-treelist-command-column>
 * </kendo-treelist>
 * ```
 */
class CancelCommandDirective extends BaseCommandDirective {
    constructor(editService, element, renderer, localization, ngZone) {
        super(editService, element, renderer, localization, ngZone);
        this.commandClass = true;
        this.readVisible = false;
    }
    onClick() {
        if (this.cellContext) {
            const viewItem = this.cellContext.viewItem;
            this.editService.endEdit(viewItem.data, viewItem.isNew);
        }
    }
}
CancelCommandDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoTreeListCancelCommand]'
            },] },
];
/** @nocollapse */
CancelCommandDirective.ctorParameters = () => [
    { type: EditService },
    { type: ElementRef },
    { type: Renderer2 },
    { type: LocalizationService },
    { type: NgZone }
];
CancelCommandDirective.propDecorators = {
    cellContext: [{ type: Input, args: ['kendoTreeListCancelCommand',] }],
    commandClass: [{ type: HostBinding, args: ['class.k-grid-cancel-command',] }]
};

/**
 * Represents the `save` command of the TreeList. You can apply this directive to any `button`
 * element inside a [`CommandColumnComponent`]({% slug api_treelist_commandcolumncomponent %}).
 * When an associated button with the directive is clicked, the
 * [`save`]({% slug api_treelist_treelistcomponent %}#toc-save) event
 * is triggered ([see example]({% slug editing_treelist %})).
 *
 * > When the row is not in the edit mode, the button with `kendoTreeListSaveCommand` is automatically hidden.
 *
 * @example
 * ```html-no-run
 * <kendo-treelist>
 *   <kendo-treelist-command-column title="command">
 *     <ng-template kendoTreeListCellTemplate>
 *       <button kendoTreeListSaveCommand>Save changes</button>
 *     </ng-template>
 *   </kendo-treelist-command-column>
 * </kendo-treelist>
 * ```
 *
 * You can control the content of the button based on the state of the row.
 *
 * @example
 * ```html-no-run
 * <kendo-treelist>
 *   <kendo-treelist-command-column title="command">
 *     <ng-template kendoTreeListCellTemplate let-isNew="isNew">
 *       <button kendoTreeListSaveCommand>{{isNew ? 'Add' : 'Update'}}</button>
 *     </ng-template>
 *   </kendo-treelist-command-column>
 * </kendo-treelist>
 * ```
 */
class SaveCommandDirective extends BaseCommandDirective {
    constructor(editService, element, renderer, localization, ngZone) {
        super(editService, element, renderer, localization, ngZone);
        this.commandClass = true;
        this.readVisible = false;
    }
    onClick() {
        if (this.cellContext) {
            this.editService.save(this.dataItem, this.cellContext.viewItem.isNew);
        }
    }
}
SaveCommandDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoTreeListSaveCommand]'
            },] },
];
/** @nocollapse */
SaveCommandDirective.ctorParameters = () => [
    { type: EditService },
    { type: ElementRef },
    { type: Renderer2 },
    { type: LocalizationService },
    { type: NgZone }
];
SaveCommandDirective.propDecorators = {
    cellContext: [{ type: Input, args: ['kendoTreeListSaveCommand',] }],
    commandClass: [{ type: HostBinding, args: ['class.k-grid-save-command',] }]
};

/**
 * Represents the `remove` command of the TreeList. You can apply this directive to any `button` element
 * inside a [`CommandColumnComponent`]({% slug api_treelist_commandcolumncomponent %}).
 * When an associated button with the directive is clicked, the
 * [`remove` event]({% slug api_treelist_treelistcomponent %}#toc-remove)
 * is triggered ([see example]({% slug editing_reactive_forms_treelist %})).
 *
 * > When the row is in the edit mode, the button with the `kendoTreeListRemoveCommand` is automatically hidden.
 *
 * @example
 * ```html-no-run
 * <kendo-treelist>
 *   <kendo-treelist-command-column title="command">
 *     <ng-template kendoTreeListCellTemplate>
 *       <button kendoTreeListRemoveCommand>Remove row</button>
 *     </ng-template>
 *   </kendo-treelist-command-column>
 * </kendo-treelist>
 * ```
 */
class RemoveCommandDirective extends BaseCommandDirective {
    constructor(editService, element, renderer, localization, ngZone) {
        super(editService, element, renderer, localization, ngZone);
        this.commandClass = true;
        this.readVisible = true;
    }
    onClick() {
        if (this.cellContext) {
            this.editService.remove(this.dataItem, (this.cellContext.viewItem.parent || {}).data);
        }
    }
}
RemoveCommandDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoTreeListRemoveCommand]'
            },] },
];
/** @nocollapse */
RemoveCommandDirective.ctorParameters = () => [
    { type: EditService },
    { type: ElementRef },
    { type: Renderer2 },
    { type: LocalizationService },
    { type: NgZone }
];
RemoveCommandDirective.propDecorators = {
    cellContext: [{ type: Input, args: ['kendoTreeListRemoveCommand',] }],
    commandClass: [{ type: HostBinding, args: ['class.k-grid-remove-command',] }]
};

/**
 * Represents the command for adding a new item to the TreeList. You can apply this directive to any
 * `button` element inside a [`ToolbarTemplate`]({% slug api_treelist_commandcolumncomponent %}).
 * When an associated button with the directive is clicked, the
 * [`add`]({% slug api_treelist_treelistcomponent %}#toc-add) event is triggered
 * ([see example]({% slug editing_treelist %})).
 *
 * @example
 * ```html-no-run
 * <kendo-treelist>
 *    <ng-template kendoTreeListToolbarTemplate>
 *       <button kendoTreeListAddCommand>Add new</button>
 *    </ng-template>
 * </kendo-treelist>
 * ```
 */
class AddCommandDirective extends BaseCommandDirective {
    constructor(editService, element, renderer, localization, ngZone) {
        super(editService, element, renderer, localization, ngZone);
        this.commandClass = true;
        this.readVisible = true;
    }
    onClick() {
        this.editService.beginAdd(this.dataItem);
    }
}
AddCommandDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoTreeListAddCommand]'
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
    cellContext: [{ type: Input, args: ['kendoTreeListAddCommand',] }],
    commandClass: [{ type: HostBinding, args: ['class.k-grid-add-command',] }]
};

/* tslint:disable:pipe-naming */
/**
 * @hidden
 */
class LevelItemsPipe {
    transform(level, hasChildren) {
        const result = [];
        const count = level + 1 - (hasChildren ? 1 : 0);
        for (let idx = 0; idx < count; idx++) {
            result.push(idx);
        }
        return result;
    }
}
LevelItemsPipe.decorators = [
    { type: Pipe, args: [{
                name: 'levelItems',
                pure: true
            },] },
];

const exported$1 = [
    CommandColumnComponent,
    CellTemplateDirective,
    EditTemplateDirective,
    TableBodyComponent,
    NoRecordsTemplateDirective,
    CellComponent,
    BaseCommandDirective,
    EditCommandDirective,
    CancelCommandDirective,
    SaveCommandDirective,
    RemoveCommandDirective,
    AddCommandDirective,
    LevelItemsPipe,
    FooterTemplateDirective
];
const importedModules$3 = [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
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
            CellTemplateDirective,
            NoRecordsTemplateDirective,
            EditTemplateDirective,
            EditCommandDirective,
            CancelCommandDirective,
            SaveCommandDirective,
            RemoveCommandDirective,
            AddCommandDirective,
            FooterTemplateDirective
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
class ToolbarComponent {
    constructor(treelist) {
        this.treelist = treelist;
        this.context = {};
    }
    get classNames() {
        return 'k-header k-grid-toolbar';
    }
    set position(value) {
        this.context.position = value;
    }
    get toolbarTemplateRef() {
        return this.treelist.toolbarTemplate ? this.treelist.toolbarTemplate.templateRef : undefined;
    }
}
ToolbarComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-treelist-toolbar',
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
    { type: TreeListComponent }
];
ToolbarComponent.propDecorators = {
    classNames: [{ type: HostBinding, args: ['class',] }],
    position: [{ type: Input }]
};

/**
 * @hidden
 */
class EditingDirectiveBase {
    constructor(treelist) {
        this.treelist = treelist;
    }
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
     * Gets or sets a function that will be called to determine the unique identifier
     * for new items. The function receives the `item` and its `parent` as parameters
     * and must return an ID.
     */
    set newItemId(callback) {
        this.idCallback = callback;
    }
    get newItemId() {
        return this.idCallback;
    }
    /**
     * @hidden
     */
    ngOnInit() {
        this.subscriptions = this.treelist.add.subscribe(this.addHandler.bind(this));
        this.subscriptions.add(this.treelist.remove.subscribe(this.removeHandler.bind(this)));
        this.subscriptions.add(this.treelist.cancel.subscribe(this.cancelHandler.bind(this)));
        this.subscriptions.add(this.treelist.save.subscribe(this.saveHandler.bind(this)));
        this.subscriptions.add(merge(this.treelist.dataStateChange, this.treelist.pageChange).subscribe(this.onStateChange.bind(this)));
    }
    /**
     * @hidden
     */
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
    get defaultEditService() {
        return this.treelist.localEditService;
    }
    addHandler({ parent }) {
        this.parent = parent;
        this.isNew = true;
        this.treelist.addRow(this.createModel({ isNew: true }), parent);
    }
    saveHandler(args) {
        const item = this.saveModel(args);
        if (item) {
            if (args.isNew) {
                this.editService.create(item, args.parent, this.idCallback ? this.idCallback(item, args.parent) : null);
            }
            else {
                this.editService.update(item);
            }
        }
        this.treelist.closeRow(args.dataItem, args.isNew);
    }
    cancelHandler(args) {
        this.closeEditor(args);
    }
    removeHandler({ dataItem, parent }) {
        const removeItem = (shouldRemove) => {
            if (shouldRemove) {
                this.editService.remove(dataItem, parent);
            }
        };
        if (this.removeConfirmation) {
            const result = this.removeConfirmation(dataItem, parent);
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
    closeEditor(args = { dataItem: this.dataItem, isNew: this.isNew }) {
        this.treelist.closeRow(args.dataItem, args.isNew);
        this.clean();
    }
    clean() {
        this.isNew = false;
        this.dataItem = null;
        this.parent = null;
    }
    onStateChange() {
        this.closeEditor();
    }
}
EditingDirectiveBase.propDecorators = {
    editService: [{ type: Input }],
    newItemId: [{ type: Input }],
    removeConfirmation: [{ type: Input }]
};

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
            .add(this.treelist.edit.subscribe(this.editHandler.bind(this)));
    }
    addHandler(args) {
        this.closeEditor();
        super.addHandler(args);
    }
    editHandler(args) {
        this.closeEditor();
        this.dataItem = args.dataItem;
        this.treelist.editRow(args.dataItem, this.createModel(args));
    }
    saveHandler(args) {
        super.saveHandler(args);
        this.clean();
    }
}

/**
 * A directive which encapsulates the editing operations of the TreeList when using
 * the Template-Driven Angular Forms ([see example]({% slug editing_directives_treelist %}#toc-the-template-directive)).
 */
class TemplateEditingDirective extends RowEditingDirectiveBase {
    constructor(treelist) {
        super(treelist);
        this.treelist = treelist;
    }
    editHandler(args) {
        super.editHandler(args);
        this.dataItem = args.dataItem;
        this.originalValues = {};
        this.editService.assignValues(this.originalValues, this.dataItem);
    }
    closeEditor(args) {
        if (this.dataItem) {
            this.editService.assignValues(this.dataItem, this.originalValues);
        }
        super.closeEditor(args);
    }
    createModel(args) {
        if (args.isNew) {
            return this.createNewItem();
        }
    }
    saveModel(args) {
        return args.dataItem;
    }
}
TemplateEditingDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoTreeListTemplateEditing]'
            },] },
];
/** @nocollapse */
TemplateEditingDirective.ctorParameters = () => [
    { type: TreeListComponent }
];
TemplateEditingDirective.propDecorators = {
    createNewItem: [{ type: Input, args: ['kendoTreeListTemplateEditing',] }]
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
 * @hidden
 */
const insertNewItem = (newItem, originalData, treelist, parent) => {
    let insertAt = 0;
    if (!parent && treelist.skip) {
        let firstItem = treelist.view.find(item => item.type === 'data' && !item.isNew);
        let firstRootItem = firstItem;
        let firstOffset = 0;
        if (firstItem.level > 0) {
            while (firstItem.level > 0) {
                firstItem = firstItem.parent;
            }
            firstRootItem = firstItem;
            firstOffset = 1;
        }
        const firstIndex = originalData.indexOf(firstRootItem.data);
        if (firstIndex > 0) {
            insertAt = firstIndex + firstOffset;
        }
    }
    originalData.splice(insertAt, 0, newItem);
};

/**
 * A directive which encapsulates the editing operations of the TreeList when using the
 * Reactive Forms ([see example]({% slug editing_directives_treelist %}#toc-the-reactive-directive)).
 */
class ReactiveEditingDirective extends RowEditingDirectiveBase {
    constructor(treelist) {
        super(treelist);
        this.treelist = treelist;
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
                selector: '[kendoTreeListReactiveEditing]'
            },] },
];
/** @nocollapse */
ReactiveEditingDirective.ctorParameters = () => [
    { type: TreeListComponent }
];
ReactiveEditingDirective.propDecorators = {
    createFormGroup: [{ type: Input, args: ['kendoTreeListReactiveEditing',] }]
};

/**
 * A directive which encapsulates the editing operations of the TreeList when using the in-cell
 * editing with Reactive Forms ([see example]({% slug editing_directives_treelist %}#toc-the-incell-directive)).
 */
class InCellEditingDirective extends EditingDirectiveBase {
    constructor(treelist) {
        super(treelist);
        this.treelist = treelist;
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
        this.subscriptions.add(this.treelist.cellClick.subscribe(this.cellClickHandler.bind(this)));
        this.subscriptions.add(this.treelist.cellClose.subscribe(this.cellCloseHandler.bind(this)));
    }
    removeHandler(args) {
        super.removeHandler(args);
        this.treelist.cancelCell();
    }
    cellClickHandler(args) {
        if (!args.isEdited && args.type === 'click') {
            this.treelist.editCell(args.dataItem, args.columnIndex, this.createFormGroup(args));
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
                selector: '[kendoTreeListInCellEditing]'
            },] },
];
/** @nocollapse */
InCellEditingDirective.ctorParameters = () => [
    { type: TreeListComponent }
];
InCellEditingDirective.propDecorators = {
    createFormGroup: [{ type: Input, args: ['kendoTreeListInCellEditing',] }]
};

class BaseBindingDirective {
    constructor(treelist) {
        this.treelist = treelist;
        this.state = {};
        this.cache = new Map();
        this.originalData = [];
        this.subscriptions = new Subscription();
        this.treelist.fetchChildren = this.fetchChildren.bind(this);
        this.treelist.hasChildren = this.hasChildren.bind(this);
    }
    /**
     * Defines the descriptors by which the data will be sorted.
     */
    set sort(value) {
        this.treelist.sort = this.state.sort = value;
    }
    /**
     * Defines the descriptor by which the data will be filtered.
     */
    set filter(value) {
        this.treelist.filter = this.state.filter = value;
    }
    /**
     * Defines the descriptor by which the data will be filtered.
     */
    set aggregate(value) {
        this._aggregate = value;
    }
    /**
     * @hidden
     */
    ngOnInit() {
        this.applyState(this.state);
        this.subscriptions.add(this.treelist.dataStateChange
            .subscribe(this.onStateChange.bind(this)));
    }
    /**
     * @hidden
     */
    ngOnDestroy() {
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
        }
    }
    ngDoCheck() {
        if (this.dataChanged) {
            this.dataChanged = false;
            this.rebind();
        }
    }
    /**
     * @hidden
     */
    ngOnChanges(changes) {
        if (anyChanged(['sort', 'filter', 'aggregate'], changes)) {
            this.rebind();
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
        this.cache.clear();
        this.treelist.data = this.fetchChildren();
    }
    applyState({ sort, filter: filter$$1 }) {
        this.sort = sort;
        this.filter = filter$$1;
    }
    fetchChildren(item) {
        const key = this.itemKey(item);
        if (this.cache.has(key)) {
            return this.cache.get(key);
        }
        const children = this.getChildren(item);
        let items = this.filterItems(children);
        let aggregates;
        if (items.length) {
            if (this.state.sort) {
                items = process(items, { sort: this.state.sort }).data;
            }
            if (this._aggregate) {
                aggregates = this.calculateAggregates(items);
            }
        }
        const result = {
            data: items,
            aggregates: aggregates
        };
        this.cache.set(key, result);
        return result;
    }
    hasChildren(item) {
        const items = this.fetchChildren(item).data;
        return items && items.length > 0;
    }
    filterItems(items) {
        if (this.state.filter) {
            const filter$$1 = {
                logic: 'or',
                filters: [this.state.filter, {
                        operator: (item) => {
                            const children = this.fetchChildren(item);
                            return Boolean(children.data && children.data.length);
                        }
                    }]
            };
            return process(items, {
                filter: filter$$1
            }).data;
        }
        return items;
    }
    calculateAggregates(items) {
        const list = [];
        const toAdd = items.slice(0);
        while (toAdd.length) {
            const current = toAdd.shift();
            list.push(current);
            if (this.hasChildren(current)) {
                toAdd.push.apply(toAdd, this.fetchChildren(current).data);
            }
        }
        // can accumulate from children aggregates except for average
        // for average we need the children count that have numeric value
        // maybe move the aggregates implementation here ???
        return aggregateBy(list, this._aggregate);
    }
}
BaseBindingDirective.propDecorators = {
    sort: [{ type: Input }],
    filter: [{ type: Input }],
    aggregate: [{ type: Input }]
};

/**
 * @hidden
 */
class HierarchyEditService extends LocalEditService {
    constructor(bindingDirective, localDataChanges) {
        super();
        this.bindingDirective = bindingDirective;
        this.localDataChanges = localDataChanges;
    }
    create(item, parent, _id) {
        const { childrenGetter, childrenSetter, originalData, treelist } = this.bindingDirective;
        if (parent) {
            const children = childrenGetter(parent);
            if (children) {
                children.unshift(item);
            }
            else {
                childrenSetter(parent, [item]);
            }
        }
        else {
            insertNewItem(item, originalData, treelist);
        }
        this.bindingDirective.rebind();
    }
    update(_item) {
        this.bindingDirective.rebind();
    }
    remove(item, parent) {
        const idGetter = this.bindingDirective.treelist.idGetter; // refactor provide idGetter via context service
        const { childrenGetter, originalData } = this.bindingDirective;
        const children = parent ? childrenGetter(parent) : originalData;
        if (children && children.length) {
            const id = idGetter(item);
            const index = children.findIndex(i => idGetter(i) === id);
            if (index >= 0) {
                children.splice(index, 1);
                this.bindingDirective.rebind();
                this.notifyRemove(item);
            }
        }
    }
    notifyRemove(item) {
        if (this.localDataChanges && hasObservers(this.localDataChanges.changes)) {
            const childrenGetter = this.bindingDirective.childrenGetter;
            const toNotify = [item];
            while (toNotify.length) {
                const current = toNotify.shift();
                this.localDataChanges.changes.emit({ action: 'remove', item: current });
                const children = childrenGetter(current);
                if (children && children.length) {
                    toNotify.push.apply(toNotify, children);
                }
            }
        }
    }
}

/**
 * A directive which encapsulates the in-memory handling of data operations such as [paging]({% slug paging_treelist %}),
 * [sorting]({% slug sorting_treelist %}), and [filtering]({% slug filtering_treelist %})
 * ([more information and examples]({% slug databinding_treelist %})).
 */
class HierarchyBindingDirective extends BaseBindingDirective {
    constructor(treelist, localDataChanges) {
        super(treelist);
        this.treelist = treelist;
        this.childrenGetter = getter('items');
        this.childrenSetter = setter('items');
        treelist.localEditService = new HierarchyEditService(this, localDataChanges);
    }
    /**
     *  The name of the field which holds the child data items of the node.
     */
    set childrenField(value) {
        this.childrenGetter = getter(value);
        this.childrenSetter = setter(value);
    }
    /**
     * The array of data which will be used to populate the TreeList.
     */
    set data(value) {
        this.originalData = value || [];
        this.dataChanged = true;
    }
    getChildren(item) {
        return item ? this.childrenGetter(item) || [] : this.originalData;
    }
    itemKey(item) {
        return item;
    }
}
HierarchyBindingDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoTreeListHierarchyBinding]'
            },] },
];
/** @nocollapse */
HierarchyBindingDirective.ctorParameters = () => [
    { type: TreeListComponent },
    { type: LocalDataChangesService }
];
HierarchyBindingDirective.propDecorators = {
    childrenField: [{ type: Input }],
    data: [{ type: Input, args: ["kendoTreeListHierarchyBinding",] }]
};

/**
 * @hidden
 */
class FlatEditService extends LocalEditService {
    constructor(bindingDirective, localDataChanges) {
        super();
        this.bindingDirective = bindingDirective;
        this.localDataChanges = localDataChanges;
    }
    create(item, parent, id) {
        const { idGetter, idSetter, parentIdSetter, originalData, treelist } = this.bindingDirective;
        idSetter(item, isPresent(id) ? id : guid());
        if (parent) {
            parentIdSetter(item, idGetter(parent));
        }
        insertNewItem(item, originalData, treelist, parent);
        this.bindingDirective.rebind();
    }
    update(_item) {
        this.bindingDirective.rebind();
    }
    remove(item, _parent) {
        const { idGetter, parentIdGetter, originalData } = this.bindingDirective;
        const toRemove = [item];
        while (toRemove.length) {
            const current = toRemove.shift();
            const id = idGetter(current);
            let itemIndex = -1;
            for (let idx = 0; idx < originalData.length; idx++) {
                const dataItem = originalData[idx];
                if (itemIndex === -1 && idGetter(dataItem) === id) {
                    itemIndex = idx;
                }
                if (parentIdGetter(dataItem) === id) {
                    toRemove.push(dataItem);
                }
            }
            if (itemIndex >= 0) {
                originalData.splice(itemIndex, 1);
                this.notifyRemove(current);
            }
        }
        this.bindingDirective.rebind();
    }
    notifyRemove(item) {
        if (this.localDataChanges) {
            this.localDataChanges.changes.emit({ action: 'remove', item });
        }
    }
}

const ROOT_ID = null;
/**
 * A directive which encapsulates the in-memory handling of data operations such as [paging]({% slug paging_treelist %}),
 * [sorting]({% slug sorting_treelist %}), and [filtering]({% slug filtering_treelist %})
 * ([more information and examples]({% slug databinding_treelist %})).
 */
class FlatBindingDirective extends BaseBindingDirective {
    constructor(treelist, localDataChanges) {
        super(treelist);
        this.treelist = treelist;
        this.idGetter = getter('id');
        this.idSetter = setter('id');
        this.parentIdGetter = getter('parentId');
        this.parentIdSetter = setter('parentId');
        treelist.localEditService = new FlatEditService(this, localDataChanges);
    }
    /**
     * The name of the field which contains the identifier of the parent node.
     */
    set parentIdField(value) {
        this.parentIdGetter = getter(value);
        this.parentIdSetter = setter(value);
    }
    /**
     * The name of the field which contains the unique identifier of the node.
     */
    set idField(value) {
        this.idGetter = getter(value);
        this.idSetter = setter(value);
    }
    /**
     * The array of data which will be used to populate the TreeList.
     */
    set data(value) {
        this.originalData = value || [];
        this.dataChanged = true;
    }
    getChildren(item) {
        const id = this.itemKey(item);
        const children = id === ROOT_ID ?
            this.originalData.filter(o => !isPresent(this.parentIdGetter(o))) :
            this.originalData.filter(o => this.parentIdGetter(o) === id);
        return children;
    }
    itemKey(item) {
        return item ? this.idGetter(item) : ROOT_ID;
    }
}
FlatBindingDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoTreeListFlatBinding]'
            },] },
];
/** @nocollapse */
FlatBindingDirective.ctorParameters = () => [
    { type: TreeListComponent },
    { type: LocalDataChangesService }
];
FlatBindingDirective.propDecorators = {
    parentIdField: [{ type: Input }],
    idField: [{ type: Input }],
    data: [{ type: Input, args: ["kendoTreeListFlatBinding",] }]
};

const exportedModules$2 = [
    TreeListComponent,
    ToolbarTemplateDirective,
    ToolbarComponent,
    CustomMessagesComponent,
    TemplateEditingDirective,
    ReactiveEditingDirective,
    InCellEditingDirective,
    HierarchyBindingDirective,
    FlatBindingDirective,
    ...SharedModule.exports(),
    ...BodyModule.exports(),
    ...HeaderModule.exports(),
    ...PagerModule.exports(),
    ...RowFilterModule.exports(),
    ...FilterMenuModule.exports(),
    ...ColumnMenuModule.exports()
];
const declarations = [
    TreeListComponent,
    ListComponent,
    ToolbarComponent,
    LocalizedMessagesDirective,
    CustomMessagesComponent,
    ToolbarTemplateDirective,
    TemplateEditingDirective,
    ReactiveEditingDirective,
    InCellEditingDirective,
    HierarchyBindingDirective,
    FlatBindingDirective
];
/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the TreeList component.
 *
 * @example
 *
 * ```ts-no-run
 * // Import the TreeList module
 * import { TreeListModule } from '@progress/kendo-angular-treelist';
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
 *     imports:      [BrowserModule, TreeListModule], // import TreeList module
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 *
 * ```
 */
class TreeListModule {
}
TreeListModule.decorators = [
    { type: NgModule, args: [{
                declarations: [declarations],
                exports: [exportedModules$2],
                imports: [
                    CommonModule,
                    SharedModule,
                    BodyModule,
                    HeaderModule,
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
                selector: 'kendo-treelist-pdf-margin',
                template: ''
            },] },
];

/**
 * Represents the PDF page template of the TreeList that helps to customize the PDF pages. To define a page template,
 * nest an `<ng-template>` tag with the `kendoTreeListPDFTemplate` directive inside `<kendo-treelist-pdf>`.
 *
 * The template context provides the following fields:
 * - `pageNumber`&mdash;Defines PDF page number.
 * - `totalPages`&mdash;Defines the total number of PDF pages.
 *
 * {% meta height:550 %}
 * {% embed_file pdf-export/page-template-inline/app.component.ts preview %}
 * {% embed_file pdf-export/app.module.ts %}
 * {% embed_file shared/filesystem.ts %}
 * {% embed_file pdf-export/main.ts %}
 * {% endmeta %}
 */
class PDFTemplateDirective$1 extends PDFTemplateDirective {
    constructor(templateRef) {
        super(templateRef);
    }
}
PDFTemplateDirective$1.decorators = [
    { type: Directive, args: [{
                selector: '[kendoTreeListPDFTemplate]'
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
const GRID_LIST = 'KENDO-TREELIST-LIST';
const TABLE = 'TABLE';
const matchesList = matchesNodeName(GRID_LIST);
const matchesTable = matchesNodeName(TABLE);
const suffix = (locked) => locked ? 'locked' : 'wrap';
/**
 * @hidden
 */
class TreeListQuery {
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
    const query = new TreeListQuery(wrapper);
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

const createElement = (tagName, className) => {
    const element = document.createElement(tagName);
    if (className) {
        element.className = className;
    }
    return element;
};
const createDiv = (className) => {
    return createElement('div', className);
};
/**
 * Configures the settings for the export of TreeList in PDF ([see example]({% slug pdfexport_treelist %})).
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
        const total = component.view.totalVisible;
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
        progress.appendChild(createElement('span', 'k-i-loading k-icon'));
        this.originalHeight = wrapperElement.style.height;
        this.originalOverflow = wrapperElement.style.overflow;
        wrapperElement.style.height = wrapperElement.offsetHeight + 'px';
        wrapperElement.style.overflow = 'hidden';
        wrapperElement.appendChild(progress);
        this.applyScroll(overlay);
    }
    applyScroll(overlay) {
        const query = new TreeListQuery(this.component.wrapper.nativeElement);
        const content = query.content();
        if (content) {
            const overlayQuery = new TreeListQuery(overlay);
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
            const onPageChanged = () => {
                if ((columns && columns.length) || this.component.virtualColumns) {
                    this.changeColumns(columns, callback);
                }
                else {
                    this.onStable(callback);
                }
            };
            this.component.notifyPageChange('pdf', { skip: skip, take: _take });
            if (this.component.view.loading) {
                this.component.vida.dataLoaded.pipe(take(1)).subscribe(onPageChanged);
            }
            else {
                onPageChanged();
            }
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
        this.ngZone.onStable.asObservable().pipe(take(1)).subscribe(callback);
    }
}
PDFComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-treelist-pdf',
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
 * Represents the `export-to-PDF` command of the TreeList.
 * You can apply this directive to any `button` element inside a
 * [`ToolbarTemplate`]({% slug api_treelist_commandcolumncomponent %}).
 * When the user clicks a button that is associated with the directive, the
 * [`pdfExport`]({% slug api_treelist_treelistcomponent %}#toc-pdfexport) event
 * fires ([see example]({% slug pdfexport_treelist %})).
 *
 * @example
 * ```html-no-run
 * <kendo-treelist>
 *      <ng-template kendoTreeListToolbarTemplate>
 *          <button kendoTreeListPDFCommand>Export to PDF</button>
 *      </ng-template>
 *      <kendo-treelist-pdf fileName="TreeList.pdf">
 *      </kendo-treelist-pdf>
 * </kendo-treelist>
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
                selector: '[kendoTreeListPDFCommand]'
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

const exportedModules$3 = [
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
 * definition for the TreeList PDF component.
 *
 * @example
 *
 * ```ts-no-run
 * // Import the TreeList and PDF modules
 * import { TreeListModule, PDFModule } from '@progress/kendo-angular-treelist';
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
 *     imports:      [BrowserModule, TreeListModule, PDFModule], // import TreeList and PDF modules
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
                exports: [exportedModules$3]
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

const ɵ0$31 = (_item) => true;
const expandAllState = {
    isExpanded: ɵ0$31
};
const ɵ1$19 = (_item) => null;
const ɵ2$13 = (_item) => false;
const editState = {
    context: ɵ1$19,
    hasNew: ɵ2$13,
    newItem: null
};
function loadView(view, subject) {
    view.loadData();
    if (view.loading) {
        view.dataLoaded.pipe(take(1)).subscribe(() => {
            loadView(view, subject);
        });
    }
    else {
        subject.next();
    }
}
const hierarchyData = (view) => {
    const data = view.data;
    const levels = {};
    const aggregates = {};
    const items = [];
    let depth = 0;
    for (let idx = 0, dataIndex = 0; idx < data.length; idx++) {
        const item = data[idx];
        if (item.type === 'data') {
            items.push(item.data);
            levels[dataIndex] = item.level;
            depth = Math.max(depth, item.level);
            dataIndex++;
        }
        else {
            aggregates[item.parentIndex] = item.aggregates;
        }
    }
    return {
        itemId: (_item, idx) => idx,
        itemLevel: (_item, idx) => levels[idx],
        depth: depth + 1,
        aggregates,
        data: items
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
        footerTemplate: column.footerTemplate
    };
};
const toExcelColumns = (columns) => {
    const result = [];
    sortColumns(columns)
        .forEach((column) => {
        if (column.childColumns) {
            result.push(...toExcelColumns(column.childColumns.toArray()));
        }
        else {
            const excelColumn = toExcelColumn(column);
            if (column.children) {
                excelColumn.children = [excelColumn].concat(toExcelColumns(column.children.toArray().slice(1)));
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
 * Configures the settings for the export of TreeList in Excel ([see example]({% slug excelexport_treelist %})).
 */
class ExcelComponent {
    constructor(excelService, localization, zone) {
        this.excelService = excelService;
        this.localization = localization;
        this.zone = zone;
        /**
         * Specifies the file name of the exported Excel file.
         * @default "Export.xlsx"
         */
        this.fileName = 'Export.xlsx';
        /**
         * Specifies if export should include all pages
         * @default true
         */
        this.allPages = true;
        /**
         * Specifies if the export should expand all items or should use the current TreeList state.
         * @default true
         */
        this.expandAll = true;
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
        const result = this.fetchData ? this.fetchData(component) : null;
        this.excelService.toggleLoading(true);
        this.zone.runOutsideAngular(() => {
            if (result && isObservable(result.data)) {
                this.dataSubscription = result.data.pipe(take(1)).subscribe((data) => {
                    this.dataSubscription = null;
                    this.exportData(component, {
                        data: data,
                        fetchChildren: result.fetchChildren,
                        hasChildren: result.hasChildren
                    });
                });
            }
            else {
                // allow the loading to be shown
                setTimeout(() => {
                    this.exportData(component, result);
                });
            }
        });
    }
    exportData(component, result) {
        const expandState = this.expandAll ? expandAllState : component.childExpandStateService;
        const view = result ? new ViewCollection(() => Object.assign({
            idGetter: item => item
        }, result), expandState, editState) : this.componentView(component);
        const loaded = new Subject();
        loaded.subscribe(() => {
            const hierarchy = hierarchyData(view);
            const options = workbookOptions({
                columns: this.columns.length ? this.columns : componentColumns(component),
                data: hierarchy.data,
                aggregates: hierarchy.aggregates,
                filterable: this.filterable,
                creator: this.creator,
                date: this.date,
                rtl: this.localization.rtl,
                collapsible: this.collapsible,
                hierarchy: hierarchy,
                paddingCellOptions: this.paddingCellOptions
            });
            const args = new ExcelExportEvent(options);
            if (hasObservers(component.excelExport)) {
                this.zone.run(() => {
                    component.excelExport.emit(args);
                });
            }
            this.excelService.toggleLoading(false);
            if (!args.isDefaultPrevented()) {
                this.saveFile(options);
            }
        });
        loadView(view, loaded);
    }
    saveFile(options) {
        toDataURL(options).then((dataURL) => {
            saveAs(dataURL, this.fileName, {
                forceProxy: this.forceProxy,
                proxyURL: this.proxyURL
            });
        });
    }
    componentView(component) {
        const expandState = !this.expandAll || (!this.allPages && component.pageable) ? component.childExpandStateService : expandAllState;
        const excelView = new ViewCollection(() => Object.assign(component.viewFieldAccessor(), {
            pageable: !this.allPages,
            skip: this.allPages ? 0 : component.skip
        }), expandState, editState);
        excelView.loaded = new Map(component.view.loaded);
        return excelView;
    }
}
ExcelComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-treelist-excel',
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
    collapsible: [{ type: Input }],
    allPages: [{ type: Input }],
    expandAll: [{ type: Input }],
    paddingCellOptions: [{ type: Input }],
    columns: [{ type: ContentChildren, args: [ColumnBase, { descendants: true },] }]
};

/**
 * Represents the `export-to-Excel` command of the TreeList. You can apply this
 * directive to any `button` element inside a
 * [`ToolbarTemplate`]({% slug api_treelist_commandcolumncomponent %}).
 * When the user clicks a button associated with the directive, the
 * [`excelExport`]({% slug api_treelist_treelistcomponent %}#toc-excelexport) event
 * fires ([see example]({% slug excelexport_treelist %})).
 *
 * @example
 * ```html-no-run
 * <kendo-treelist>
 *      <ng-template kendoTreeListToolbarTemplate>
 *          <button kendoTreeListExcelCommand>Export to PDF</button>
 *      </ng-template>
 *      <kendo-treelist-excel fileName="TreeList.xlsx">
 *      </kendo-treelist-excel>
 * </kendo-treelist>
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
                selector: '[kendoTreeListExcelCommand]'
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
 * definition for the Excel component of the TreeList.
 *
 * @example
 *
 * ```ts-no-run
 * // Import the TreeList and Excel modules
 * import { TreeListModule, ExcelModule } from '@progress/kendo-angular-treelist';
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
 *     imports:      [BrowserModule, TreeListModule, ExcelModule], // import TreeList and Excel modules
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

export { BaseBindingDirective, ColumnChooserComponent, ColumnListComponent, ColumnMenuChooserComponent, ColumnMenuFilterComponent, ColumnMenuItemBase, ColumnMenuItemContentTemplateDirective, ColumnMenuItemComponent, ColumnMenuLockComponent, ColumnMenuSortComponent, ColumnMenuTemplateDirective, ColumnMenuModule, ColumnMenuService, ColumnHandleDirective, ColumnResizingService, TableDirective, ColumnInfoService, DomEventsService, ExpandStateService, IdService, OptionChangesService, PreventableEvent, SortService, ChangeNotificationService, ColumnReorderService, DragAndDropModule, DragAndDropService, DragHintService, DraggableColumnDirective, DropCueService, DropTargetDirective, EditingDirectiveBase, RowEditingDirectiveBase, AddCommandDirective, BaseCommandDirective, CancelCommandDirective, EditCommandDirective, EditService as EditService$1, LocalDataChangesService, RemoveCommandDirective, SaveCommandDirective, ExcelCommandDirective, ChildExpandStateService, BooleanFilterComponent, BooleanFilterCellComponent, FilterCellHostDirective, FilterCellOperatorsComponent, FilterCellWrapperComponent, DateFilterComponent, FilterHostDirective, FilterInputWrapperComponent, FilterInputDirective, FilterRowComponent, DateFilterMenuInputComponent, FilterMenuContainerComponent, FilterMenuHostDirective, FilterMenuInputWrapperComponent, FilterMenuComponent, NumericFilterMenuInputComponent, StringFilterMenuInputComponent, NumericFilterComponent, FilterOperatorBase, SharedFilterModule, StringFilterComponent, BrowserSupportService, ResizeService, ResponsiveService, LocalizedMessagesDirective, Messages, FocusGroup, FocusRoot, LogicalCellDirective, LogicalRowDirective, NavigationService, PagerContextService, PagerElementComponent, PDFCommandDirective, PDFTemplateDirective$1 as PDFTemplateDirective, CellComponent, FieldAccessorPipe, LevelItemsPipe, DEFAULT_SCROLLER_FACTORY, SCROLLER_FACTORY_TOKEN, ScrollRequestService, ScrollSyncService, ScrollerService, TreeListModule, SharedModule, TreeListComponent, HierarchyBindingDirective, FlatBindingDirective, ColumnBase$1 as ColumnBase, ColumnComponent, CommandColumnComponent, SpanColumnComponent, ColumnGroupComponent, ToolbarComponent, ToolbarTemplateDirective, CellTemplateDirective, HeaderTemplateDirective, FooterTemplateDirective, PagerTemplateDirective, ResizableContainerDirective, TemplateContextDirective, NoRecordsTemplateDirective, FilterService, FilterCellTemplateDirective, FilterCellComponent, StringFilterCellComponent, DateFilterCellComponent, BaseFilterCellComponent, FilterMenuTemplateDirective, NumericFilterMenuComponent, StringFilterMenuComponent, DateFilterMenuComponent, BooleanFilterMenuComponent, BeforeEqFilterOperatorComponent, BeforeFilterOperatorComponent, AfterEqFilterOperatorComponent, AfterFilterOperatorComponent, ContainsFilterOperatorComponent, DoesNotContainFilterOperatorComponent, EndsWithFilterOperatorComponent, EqualFilterOperatorComponent, IsEmptyFilterOperatorComponent, IsNotEmptyFilterOperatorComponent, IsNotNullFilterOperatorComponent, IsNullFilterOperatorComponent, NotEqualFilterOperatorComponent, StartsWithFilterOperatorComponent, NumericFilterCellComponent, AutoCompleteFilterCellComponent, GreaterFilterOperatorComponent, GreaterOrEqualToFilterOperatorComponent, LessOrEqualToFilterOperatorComponent, LessFilterOperatorComponent, PagerPrevButtonsComponent, PagerNextButtonsComponent, PagerNumericButtonsComponent, PagerInputComponent, PagerInfoComponent, PagerPageSizesComponent, RowFilterModule, FilterMenuModule, BodyModule, HeaderModule, PagerModule, TemplateEditingDirective, ReactiveEditingDirective, InCellEditingDirective, EditTemplateDirective, ColGroupComponent, HeaderComponent, ListComponent, TableBodyComponent, PagerComponent, CustomMessagesComponent, LoadingComponent, PDFModule, PDFComponent, PDFMarginComponent$1 as PDFMarginComponent, PDFService, ExcelModule, ExcelComponent, ExcelService, CellCloseEvent, SuspendService, Skip, ColumnReorderEvent, FocusableDirective, ColumnVisibilityChangeEvent, ColumnMenuComponent, SinglePopupService, PopupCloseEvent, ExpandEvent };
