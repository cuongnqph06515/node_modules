import { Platform, PlatformModule } from '@angular/cdk/platform';
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { EventEmitter, Component, ChangeDetectionStrategy, ViewEncapsulation, ChangeDetectorRef, Input, Output, Directive, Renderer2, ElementRef, Injectable, Optional, ViewChild, NgZone, TemplateRef, ContentChild, ContentChildren, ViewChildren, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzResizeObserver, NzResizeObserversModule } from 'ng-zorro-antd/core/resize-observers';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzI18nService, NzI18nModule } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { __assign, __read, __decorate, __metadata, __spread, __values } from 'tslib';
import { Subject, ReplaySubject, BehaviorSubject, combineLatest, merge, fromEvent, EMPTY, of } from 'rxjs';
import { takeUntil, map, filter, startWith, delay, distinctUntilChanged, debounceTime, skip, switchMap, flatMap } from 'rxjs/operators';
import { InputBoolean, isNil, measureScrollbar } from 'ng-zorro-antd/core/util';
import { warnDeprecation } from 'ng-zorro-antd/core/logger';
import { NzResizeService } from 'ng-zorro-antd/core/services';
import { NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';

/**
 * @fileoverview added by tsickle
 * Generated from: src/addon/filter-trigger.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NzFilterTriggerComponent = /** @class */ (function () {
    function NzFilterTriggerComponent(cdr) {
        this.cdr = cdr;
        this.nzActive = false;
        this.nzVisible = false;
        this.nzVisibleChange = new EventEmitter();
    }
    /**
     * @param {?} visible
     * @return {?}
     */
    NzFilterTriggerComponent.prototype.onVisibleChange = /**
     * @param {?} visible
     * @return {?}
     */
    function (visible) {
        this.nzVisible = visible;
        this.nzVisibleChange.next(visible);
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    NzFilterTriggerComponent.prototype.onFilterClick = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        $event.stopPropagation();
    };
    /**
     * @return {?}
     */
    NzFilterTriggerComponent.prototype.hide = /**
     * @return {?}
     */
    function () {
        this.nzVisible = false;
        this.cdr.markForCheck();
    };
    /**
     * @return {?}
     */
    NzFilterTriggerComponent.prototype.show = /**
     * @return {?}
     */
    function () {
        this.nzVisible = true;
        this.cdr.markForCheck();
    };
    NzFilterTriggerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nz-filter-trigger',
                    exportAs: "nzFilterTrigger",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    preserveWhitespaces: false,
                    encapsulation: ViewEncapsulation.None,
                    template: "\n    <span\n      nz-dropdown\n      class=\"ant-table-filter-trigger\"\n      nzTrigger=\"click\"\n      nzPlacement=\"bottomRight\"\n      [nzClickHide]=\"false\"\n      [nzDropdownMenu]=\"nzDropdownMenu\"\n      [class.active]=\"nzActive\"\n      [class.ant-table-filter-open]=\"nzVisible\"\n      [nzVisible]=\"nzVisible\"\n      (nzVisibleChange)=\"onVisibleChange($event)\"\n      (click)=\"onFilterClick($event)\"\n    >\n      <ng-content></ng-content>\n    </span>\n  ",
                    host: {
                        '[class.ant-table-filter-trigger-container]': 'true',
                        '[class.ant-table-filter-trigger-container-open]': 'nzVisible'
                    }
                }] }
    ];
    /** @nocollapse */
    NzFilterTriggerComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
    NzFilterTriggerComponent.propDecorators = {
        nzActive: [{ type: Input }],
        nzDropdownMenu: [{ type: Input }],
        nzVisible: [{ type: Input }],
        nzVisibleChange: [{ type: Output }]
    };
    return NzFilterTriggerComponent;
}());
if (false) {
    /** @type {?} */
    NzFilterTriggerComponent.prototype.nzActive;
    /** @type {?} */
    NzFilterTriggerComponent.prototype.nzDropdownMenu;
    /** @type {?} */
    NzFilterTriggerComponent.prototype.nzVisible;
    /** @type {?} */
    NzFilterTriggerComponent.prototype.nzVisibleChange;
    /**
     * @type {?}
     * @private
     */
    NzFilterTriggerComponent.prototype.cdr;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/addon/filter.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function NzThItemInterface() { }
if (false) {
    /** @type {?} */
    NzThItemInterface.prototype.text;
    /** @type {?} */
    NzThItemInterface.prototype.value;
    /** @type {?} */
    NzThItemInterface.prototype.checked;
}
var NzTableFilterComponent = /** @class */ (function () {
    function NzTableFilterComponent(cdr, i18n) {
        this.cdr = cdr;
        this.i18n = i18n;
        this.contentTemplate = null;
        this.customFilter = false;
        this.extraTemplate = null;
        this.filterMultiple = true;
        this.listOfFilter = [];
        this.filterChange = new EventEmitter();
        this.destroy$ = new Subject();
        this.isChanged = false;
        this.isChecked = false;
        this.isVisible = false;
        this.listOfParsedFilter = [];
    }
    /**
     * @param {?} _
     * @param {?} item
     * @return {?}
     */
    NzTableFilterComponent.prototype.trackByValue = /**
     * @param {?} _
     * @param {?} item
     * @return {?}
     */
    function (_, item) {
        return item.value;
    };
    /**
     * @param {?} filter
     * @return {?}
     */
    NzTableFilterComponent.prototype.check = /**
     * @param {?} filter
     * @return {?}
     */
    function (filter) {
        this.isChanged = true;
        if (this.filterMultiple) {
            this.listOfParsedFilter = this.listOfParsedFilter.map((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                if (item === filter) {
                    return __assign(__assign({}, item), { checked: !filter.checked });
                }
                else {
                    return item;
                }
            }));
            filter.checked = !filter.checked;
        }
        else {
            this.listOfParsedFilter = this.listOfParsedFilter.map((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                return __assign(__assign({}, item), { checked: item === filter });
            }));
        }
        this.isChecked = this.getCheckedStatus(this.listOfParsedFilter);
    };
    /**
     * @return {?}
     */
    NzTableFilterComponent.prototype.confirm = /**
     * @return {?}
     */
    function () {
        this.isVisible = false;
        this.emitFilterData();
    };
    /**
     * @return {?}
     */
    NzTableFilterComponent.prototype.reset = /**
     * @return {?}
     */
    function () {
        this.isChanged = true;
        this.isVisible = false;
        this.listOfParsedFilter = this.parseListOfFilter(this.listOfFilter, true);
        this.isChecked = this.getCheckedStatus(this.listOfParsedFilter);
        this.emitFilterData();
    };
    /**
     * @param {?} value
     * @return {?}
     */
    NzTableFilterComponent.prototype.onVisibleChange = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.isVisible = value;
        if (!value) {
            this.emitFilterData();
        }
    };
    /**
     * @return {?}
     */
    NzTableFilterComponent.prototype.emitFilterData = /**
     * @return {?}
     */
    function () {
        if (this.isChanged) {
            /** @type {?} */
            var listOfChecked = this.listOfParsedFilter.filter((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return item.checked; })).map((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return item.value; }));
            if (this.filterMultiple) {
                this.filterChange.emit(listOfChecked);
            }
            else {
                this.filterChange.emit(listOfChecked.length > 0 ? listOfChecked[0] : null);
            }
            this.isChanged = false;
        }
    };
    /**
     * @param {?} listOfFilter
     * @param {?=} reset
     * @return {?}
     */
    NzTableFilterComponent.prototype.parseListOfFilter = /**
     * @param {?} listOfFilter
     * @param {?=} reset
     * @return {?}
     */
    function (listOfFilter, reset) {
        return listOfFilter.map((/**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            /** @type {?} */
            var checked = reset ? false : !!item.byDefault;
            return { text: item.text, value: item.value, checked: checked };
        }));
    };
    /**
     * @param {?} listOfParsedFilter
     * @return {?}
     */
    NzTableFilterComponent.prototype.getCheckedStatus = /**
     * @param {?} listOfParsedFilter
     * @return {?}
     */
    function (listOfParsedFilter) {
        return listOfParsedFilter.some((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return item.checked; }));
    };
    /**
     * @return {?}
     */
    NzTableFilterComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.i18n.localeChange.pipe(takeUntil(this.destroy$)).subscribe((/**
         * @return {?}
         */
        function () {
            _this.locale = _this.i18n.getLocaleData('Table');
            _this.cdr.markForCheck();
        }));
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    NzTableFilterComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var listOfFilter = changes.listOfFilter;
        if (listOfFilter && this.listOfFilter && this.listOfFilter.length) {
            this.listOfParsedFilter = this.parseListOfFilter(this.listOfFilter);
            this.isChecked = this.getCheckedStatus(this.listOfParsedFilter);
        }
    };
    /**
     * @return {?}
     */
    NzTableFilterComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.destroy$.next();
        this.destroy$.complete();
    };
    NzTableFilterComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nz-table-filter',
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    template: "\n    <span class=\"ant-table-filter-column-title\">\n      <ng-template [ngTemplateOutlet]=\"contentTemplate\"></ng-template>\n    </span>\n    <ng-container *ngIf=\"!customFilter; else extraTemplate\">\n      <nz-filter-trigger\n        [nzVisible]=\"isVisible\"\n        [nzActive]=\"isChecked\"\n        [nzDropdownMenu]=\"filterMenu\"\n        (nzVisibleChange)=\"onVisibleChange($event)\"\n      >\n        <i nz-icon nzType=\"filter\" nzTheme=\"fill\"></i>\n      </nz-filter-trigger>\n      <nz-dropdown-menu #filterMenu=\"nzDropdownMenu\">\n        <div class=\"ant-table-filter-dropdown\">\n          <ul nz-menu>\n            <li nz-menu-item [nzSelected]=\"f.checked\" *ngFor=\"let f of listOfParsedFilter; trackBy: trackByValue\" (click)=\"check(f)\">\n              <label nz-radio *ngIf=\"!filterMultiple\" [ngModel]=\"f.checked\" (ngModelChange)=\"check(f)\"></label>\n              <label nz-checkbox *ngIf=\"filterMultiple\" [ngModel]=\"f.checked\" (ngModelChange)=\"check(f)\"></label>\n              <span>{{ f.text }}</span>\n            </li>\n          </ul>\n          <div class=\"ant-table-filter-dropdown-btns\">\n            <button nz-button nzType=\"link\" nzSize=\"small\" (click)=\"reset()\" [disabled]=\"!isChecked\">{{ locale.filterReset }}</button>\n            <button nz-button nzType=\"primary\" nzSize=\"small\" (click)=\"confirm()\">{{ locale.filterConfirm }}</button>\n          </div>\n        </div>\n      </nz-dropdown-menu>\n    </ng-container>\n  ",
                    host: {
                        '[class.ant-table-filter-column]': 'true'
                    }
                }] }
    ];
    /** @nocollapse */
    NzTableFilterComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: NzI18nService }
    ]; };
    NzTableFilterComponent.propDecorators = {
        contentTemplate: [{ type: Input }],
        customFilter: [{ type: Input }],
        extraTemplate: [{ type: Input }],
        filterMultiple: [{ type: Input }],
        listOfFilter: [{ type: Input }],
        filterChange: [{ type: Output }]
    };
    return NzTableFilterComponent;
}());
if (false) {
    /** @type {?} */
    NzTableFilterComponent.prototype.contentTemplate;
    /** @type {?} */
    NzTableFilterComponent.prototype.customFilter;
    /** @type {?} */
    NzTableFilterComponent.prototype.extraTemplate;
    /** @type {?} */
    NzTableFilterComponent.prototype.filterMultiple;
    /** @type {?} */
    NzTableFilterComponent.prototype.listOfFilter;
    /** @type {?} */
    NzTableFilterComponent.prototype.filterChange;
    /**
     * @type {?}
     * @private
     */
    NzTableFilterComponent.prototype.destroy$;
    /** @type {?} */
    NzTableFilterComponent.prototype.locale;
    /** @type {?} */
    NzTableFilterComponent.prototype.isChanged;
    /** @type {?} */
    NzTableFilterComponent.prototype.isChecked;
    /** @type {?} */
    NzTableFilterComponent.prototype.isVisible;
    /** @type {?} */
    NzTableFilterComponent.prototype.listOfParsedFilter;
    /**
     * @type {?}
     * @private
     */
    NzTableFilterComponent.prototype.cdr;
    /**
     * @type {?}
     * @private
     */
    NzTableFilterComponent.prototype.i18n;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/addon/row-expand-button.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NzRowExpandButtonDirective = /** @class */ (function () {
    function NzRowExpandButtonDirective() {
        this.expand = false;
        this.spaceMode = false;
        this.expandChange = new EventEmitter();
    }
    /**
     * @return {?}
     */
    NzRowExpandButtonDirective.prototype.onHostClick = /**
     * @return {?}
     */
    function () {
        if (!this.spaceMode) {
            this.expand = !this.expand;
            this.expandChange.next(this.expand);
        }
    };
    NzRowExpandButtonDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'button[nz-row-expand-button]',
                    host: {
                        '[type]': "'button'",
                        '[class.ant-table-row-expand-icon]': 'true',
                        '[class.ant-table-row-expand-icon-expanded]': "!spaceMode && expand === true",
                        '[class.ant-table-row-expand-icon-collapsed]': "!spaceMode && expand === false",
                        '[class.ant-table-row-expand-icon-spaced]': 'spaceMode',
                        '(click)': 'onHostClick()'
                    }
                },] }
    ];
    NzRowExpandButtonDirective.propDecorators = {
        expand: [{ type: Input }],
        spaceMode: [{ type: Input }],
        expandChange: [{ type: Output }]
    };
    return NzRowExpandButtonDirective;
}());
if (false) {
    /** @type {?} */
    NzRowExpandButtonDirective.prototype.expand;
    /** @type {?} */
    NzRowExpandButtonDirective.prototype.spaceMode;
    /** @type {?} */
    NzRowExpandButtonDirective.prototype.expandChange;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/addon/row-indent.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NzRowIndentDirective = /** @class */ (function () {
    function NzRowIndentDirective() {
        this.indentSize = 0;
    }
    NzRowIndentDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'nz-row-indent',
                    host: {
                        '[class.ant-table-row-indent]': 'true',
                        '[style.padding-left.px]': 'indentSize'
                    }
                },] }
    ];
    NzRowIndentDirective.propDecorators = {
        indentSize: [{ type: Input }]
    };
    return NzRowIndentDirective;
}());
if (false) {
    /** @type {?} */
    NzRowIndentDirective.prototype.indentSize;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/addon/selection.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NzTableSelectionComponent = /** @class */ (function () {
    function NzTableSelectionComponent() {
        this.listOfSelections = [];
        this.checked = false;
        this.disabled = false;
        this.indeterminate = false;
        this.showCheckbox = false;
        this.showRowSelection = false;
        this.checkedChange = new EventEmitter();
    }
    /**
     * @param {?} checked
     * @return {?}
     */
    NzTableSelectionComponent.prototype.onCheckedChange = /**
     * @param {?} checked
     * @return {?}
     */
    function (checked) {
        this.checked = checked;
        this.checkedChange.emit(checked);
    };
    NzTableSelectionComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nz-table-selection',
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    template: "\n    <label\n      *ngIf=\"showCheckbox\"\n      nz-checkbox\n      [class.ant-table-selection-select-all-custom]=\"showRowSelection\"\n      [ngModel]=\"checked\"\n      [nzDisabled]=\"disabled\"\n      [nzIndeterminate]=\"indeterminate\"\n      (ngModelChange)=\"onCheckedChange($event)\"\n    >\n    </label>\n    <div class=\"ant-table-selection-extra\" *ngIf=\"showRowSelection\">\n      <span nz-dropdown class=\"ant-table-selection-down\" nzPlacement=\"bottomLeft\" [nzDropdownMenu]=\"selectionMenu\">\n        <i nz-icon nzType=\"down\"></i>\n      </span>\n      <nz-dropdown-menu #selectionMenu=\"nzDropdownMenu\">\n        <ul nz-menu class=\"ant-table-selection-menu\">\n          <li nz-menu-item *ngFor=\"let selection of listOfSelections\" (click)=\"selection.onSelect()\">\n            {{ selection.text }}\n          </li>\n        </ul>\n      </nz-dropdown-menu>\n    </div>\n  ",
                    host: {
                        '[class.ant-table-selection]': 'true'
                    }
                }] }
    ];
    NzTableSelectionComponent.propDecorators = {
        listOfSelections: [{ type: Input }],
        checked: [{ type: Input }],
        disabled: [{ type: Input }],
        indeterminate: [{ type: Input }],
        showCheckbox: [{ type: Input }],
        showRowSelection: [{ type: Input }],
        checkedChange: [{ type: Output }]
    };
    return NzTableSelectionComponent;
}());
if (false) {
    /** @type {?} */
    NzTableSelectionComponent.prototype.listOfSelections;
    /** @type {?} */
    NzTableSelectionComponent.prototype.checked;
    /** @type {?} */
    NzTableSelectionComponent.prototype.disabled;
    /** @type {?} */
    NzTableSelectionComponent.prototype.indeterminate;
    /** @type {?} */
    NzTableSelectionComponent.prototype.showCheckbox;
    /** @type {?} */
    NzTableSelectionComponent.prototype.showRowSelection;
    /** @type {?} */
    NzTableSelectionComponent.prototype.checkedChange;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/addon/sorters.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NzTableSortersComponent = /** @class */ (function () {
    function NzTableSortersComponent() {
        this.sortDirections = ['ascend', 'descend', null];
        this.sortOrder = null;
        this.contentTemplate = null;
        this.isUp = false;
        this.isDown = false;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    NzTableSortersComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var sortDirections = changes.sortDirections;
        if (sortDirections) {
            this.isUp = this.sortDirections.indexOf('ascend') !== -1;
            this.isDown = this.sortDirections.indexOf('descend') !== -1;
        }
    };
    NzTableSortersComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nz-table-sorters',
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    template: "\n    <span><ng-template [ngTemplateOutlet]=\"contentTemplate\"></ng-template></span>\n    <span class=\"ant-table-column-sorter\" [class.ant-table-column-sorter-full]=\"isDown && isUp\">\n      <span class=\"ant-table-column-sorter-inner\">\n        <i nz-icon nzType=\"caret-up\" *ngIf=\"isUp\" class=\"ant-table-column-sorter-up\" [class.active]=\"sortOrder == 'ascend'\"></i>\n        <i nz-icon nzType=\"caret-down\" *ngIf=\"isDown\" class=\"ant-table-column-sorter-down\" [class.active]=\"sortOrder == 'descend'\"></i>\n      </span>\n    </span>\n  ",
                    host: {
                        '[class.ant-table-column-sorters]': 'true'
                    }
                }] }
    ];
    NzTableSortersComponent.propDecorators = {
        sortDirections: [{ type: Input }],
        sortOrder: [{ type: Input }],
        contentTemplate: [{ type: Input }]
    };
    return NzTableSortersComponent;
}());
if (false) {
    /** @type {?} */
    NzTableSortersComponent.prototype.sortDirections;
    /** @type {?} */
    NzTableSortersComponent.prototype.sortOrder;
    /** @type {?} */
    NzTableSortersComponent.prototype.contentTemplate;
    /** @type {?} */
    NzTableSortersComponent.prototype.isUp;
    /** @type {?} */
    NzTableSortersComponent.prototype.isDown;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/cell/cell-fixed.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NzCellFixedDirective = /** @class */ (function () {
    function NzCellFixedDirective(renderer, elementRef) {
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.nzRight = false;
        this.nzLeft = false;
        this.colspan = null;
        this.colSpan = null;
        this.changes$ = new Subject();
        this.isAutoLeft = false;
        this.isAutoRight = false;
        this.isFixedLeft = false;
        this.isFixedRight = false;
        this.isFixed = false;
    }
    /**
     * @param {?} autoLeft
     * @return {?}
     */
    NzCellFixedDirective.prototype.setAutoLeftWidth = /**
     * @param {?} autoLeft
     * @return {?}
     */
    function (autoLeft) {
        this.renderer.setStyle(this.elementRef.nativeElement, 'left', autoLeft);
    };
    /**
     * @param {?} autoRight
     * @return {?}
     */
    NzCellFixedDirective.prototype.setAutoRightWidth = /**
     * @param {?} autoRight
     * @return {?}
     */
    function (autoRight) {
        this.renderer.setStyle(this.elementRef.nativeElement, 'right', autoRight);
    };
    /**
     * @param {?} isFirstRight
     * @return {?}
     */
    NzCellFixedDirective.prototype.setIsFirstRight = /**
     * @param {?} isFirstRight
     * @return {?}
     */
    function (isFirstRight) {
        this.setFixClass(isFirstRight, 'ant-table-cell-fix-right-first');
    };
    /**
     * @param {?} isLastLeft
     * @return {?}
     */
    NzCellFixedDirective.prototype.setIsLastLeft = /**
     * @param {?} isLastLeft
     * @return {?}
     */
    function (isLastLeft) {
        this.setFixClass(isLastLeft, 'ant-table-cell-fix-left-last');
    };
    /**
     * @private
     * @param {?} flag
     * @param {?} className
     * @return {?}
     */
    NzCellFixedDirective.prototype.setFixClass = /**
     * @private
     * @param {?} flag
     * @param {?} className
     * @return {?}
     */
    function (flag, className) {
        // the setFixClass function may call many times, so remove it first.
        this.renderer.removeClass(this.elementRef.nativeElement, className);
        if (flag) {
            this.renderer.addClass(this.elementRef.nativeElement, className);
        }
    };
    /**
     * @return {?}
     */
    NzCellFixedDirective.prototype.ngOnChanges = /**
     * @return {?}
     */
    function () {
        this.setIsFirstRight(false);
        this.setIsLastLeft(false);
        this.isAutoLeft = this.nzLeft === '' || this.nzLeft === true;
        this.isAutoRight = this.nzRight === '' || this.nzRight === true;
        this.isFixedLeft = this.nzLeft !== false;
        this.isFixedRight = this.nzRight !== false;
        this.isFixed = this.isFixedLeft || this.isFixedRight;
        /** @type {?} */
        var validatePx = (/**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (typeof value === 'string' && value !== '') {
                return value;
            }
            else {
                return null;
            }
        });
        this.setAutoLeftWidth(validatePx(this.nzLeft));
        this.setAutoRightWidth(validatePx(this.nzRight));
        this.changes$.next();
    };
    NzCellFixedDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'td[nzRight],th[nzRight],td[nzLeft],th[nzLeft]',
                    host: {
                        '[class.ant-table-cell-fix-right]': "isFixedRight",
                        '[class.ant-table-cell-fix-left]': "isFixedLeft",
                        '[style.position]': "isFixed? 'sticky' : null"
                    }
                },] }
    ];
    /** @nocollapse */
    NzCellFixedDirective.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ElementRef }
    ]; };
    NzCellFixedDirective.propDecorators = {
        nzRight: [{ type: Input }],
        nzLeft: [{ type: Input }],
        colspan: [{ type: Input }],
        colSpan: [{ type: Input }]
    };
    return NzCellFixedDirective;
}());
if (false) {
    /** @type {?} */
    NzCellFixedDirective.prototype.nzRight;
    /** @type {?} */
    NzCellFixedDirective.prototype.nzLeft;
    /** @type {?} */
    NzCellFixedDirective.prototype.colspan;
    /** @type {?} */
    NzCellFixedDirective.prototype.colSpan;
    /** @type {?} */
    NzCellFixedDirective.prototype.changes$;
    /** @type {?} */
    NzCellFixedDirective.prototype.isAutoLeft;
    /** @type {?} */
    NzCellFixedDirective.prototype.isAutoRight;
    /** @type {?} */
    NzCellFixedDirective.prototype.isFixedLeft;
    /** @type {?} */
    NzCellFixedDirective.prototype.isFixedRight;
    /** @type {?} */
    NzCellFixedDirective.prototype.isFixed;
    /**
     * @type {?}
     * @private
     */
    NzCellFixedDirective.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    NzCellFixedDirective.prototype.elementRef;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/table-style.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NzTableStyleService = /** @class */ (function () {
    function NzTableStyleService() {
        this.theadTemplate$ = new ReplaySubject(1);
        this.hasFixLeft$ = new ReplaySubject(1);
        this.hasFixRight$ = new ReplaySubject(1);
        this.hostWidth$ = new ReplaySubject(1);
        this.columnCount$ = new ReplaySubject(1);
        this.showEmpty$ = new ReplaySubject(1);
        this.noResult$ = new ReplaySubject(1);
        this.listOfThWidthConfigPx$ = new BehaviorSubject([]);
        this.tableWidthConfigPx$ = new BehaviorSubject([]);
        this.manualWidthConfigPx$ = combineLatest([this.tableWidthConfigPx$, this.listOfThWidthConfigPx$]).pipe(map((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = __read(_a, 2), widthConfig = _b[0], listOfWidth = _b[1];
            return (widthConfig.length ? widthConfig : listOfWidth);
        })));
        this.listOfAutoWidthPx$ = new ReplaySubject(1);
        this.listOfListOfThWidthPx$ = merge(
        /** init with manual width **/
        this.manualWidthConfigPx$, combineLatest([this.listOfAutoWidthPx$, this.manualWidthConfigPx$]).pipe(map((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = __read(_a, 2), autoWidth = _b[0], manualWidth = _b[1];
            /** use autoWidth until column length match **/
            if (autoWidth.length === manualWidth.length) {
                return autoWidth.map((/**
                 * @param {?} width
                 * @param {?} index
                 * @return {?}
                 */
                function (width, index) {
                    if (width === '0px') {
                        return manualWidth[index] || null;
                    }
                    else {
                        return manualWidth[index] || width;
                    }
                }));
            }
            else {
                return manualWidth;
            }
        }))));
        this.listOfMeasureColumn$ = new ReplaySubject(1);
        this.listOfListOfThWidth$ = this.listOfAutoWidthPx$.pipe(map((/**
         * @param {?} list
         * @return {?}
         */
        function (list) { return list.map((/**
         * @param {?} width
         * @return {?}
         */
        function (width) { return parseInt(width, 10); })); })));
        this.enableAutoMeasure$ = new ReplaySubject(1);
    }
    /**
     * @param {?} template
     * @return {?}
     */
    NzTableStyleService.prototype.setTheadTemplate = /**
     * @param {?} template
     * @return {?}
     */
    function (template) {
        this.theadTemplate$.next(template);
    };
    /**
     * @param {?} hasFixLeft
     * @return {?}
     */
    NzTableStyleService.prototype.setHasFixLeft = /**
     * @param {?} hasFixLeft
     * @return {?}
     */
    function (hasFixLeft) {
        this.hasFixLeft$.next(hasFixLeft);
    };
    /**
     * @param {?} hasFixRight
     * @return {?}
     */
    NzTableStyleService.prototype.setHasFixRight = /**
     * @param {?} hasFixRight
     * @return {?}
     */
    function (hasFixRight) {
        this.hasFixRight$.next(hasFixRight);
    };
    /**
     * @param {?} widthConfig
     * @return {?}
     */
    NzTableStyleService.prototype.setTableWidthConfig = /**
     * @param {?} widthConfig
     * @return {?}
     */
    function (widthConfig) {
        this.tableWidthConfigPx$.next(widthConfig);
    };
    /**
     * @param {?} listOfTh
     * @return {?}
     */
    NzTableStyleService.prototype.setListOfTh = /**
     * @param {?} listOfTh
     * @return {?}
     */
    function (listOfTh) {
        /** @type {?} */
        var columnCount = 0;
        listOfTh.forEach((/**
         * @param {?} th
         * @return {?}
         */
        function (th) {
            columnCount += (th.colspan && +th.colspan) || (th.colSpan && +th.colSpan) || 1;
        }));
        /** @type {?} */
        var listOfThPx = listOfTh.map((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return item.nzWidth; }));
        this.columnCount$.next(columnCount);
        this.listOfThWidthConfigPx$.next(listOfThPx);
    };
    /**
     * @param {?} listOfTh
     * @return {?}
     */
    NzTableStyleService.prototype.setListOfMeasureColumn = /**
     * @param {?} listOfTh
     * @return {?}
     */
    function (listOfTh) {
        /** @type {?} */
        var listOfKeys = [];
        listOfTh.forEach((/**
         * @param {?} th
         * @return {?}
         */
        function (th) {
            /** @type {?} */
            var length = (th.colspan && +th.colspan) || (th.colSpan && +th.colSpan) || 1;
            for (var i = 0; i < length; i++) {
                listOfKeys.push("measure_key_" + i);
            }
        }));
        this.listOfMeasureColumn$.next(listOfKeys);
    };
    /**
     * @param {?} listOfAutoWidth
     * @return {?}
     */
    NzTableStyleService.prototype.setListOfAutoWidth = /**
     * @param {?} listOfAutoWidth
     * @return {?}
     */
    function (listOfAutoWidth) {
        this.listOfAutoWidthPx$.next(listOfAutoWidth.map((/**
         * @param {?} width
         * @return {?}
         */
        function (width) { return width + "px"; })));
    };
    /**
     * @param {?} showEmpty
     * @return {?}
     */
    NzTableStyleService.prototype.setShowEmpty = /**
     * @param {?} showEmpty
     * @return {?}
     */
    function (showEmpty) {
        this.showEmpty$.next(showEmpty);
    };
    /**
     * @param {?} noResult
     * @return {?}
     */
    NzTableStyleService.prototype.setNoResult = /**
     * @param {?} noResult
     * @return {?}
     */
    function (noResult) {
        this.noResult$.next(noResult);
    };
    /**
     * @param {?} scrollX
     * @param {?} scrollY
     * @return {?}
     */
    NzTableStyleService.prototype.setScroll = /**
     * @param {?} scrollX
     * @param {?} scrollY
     * @return {?}
     */
    function (scrollX, scrollY) {
        /** @type {?} */
        var enableAutoMeasure = !!(scrollX || scrollY);
        if (!enableAutoMeasure) {
            this.setListOfAutoWidth([]);
        }
        this.enableAutoMeasure$.next(enableAutoMeasure);
    };
    NzTableStyleService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    NzTableStyleService.ctorParameters = function () { return []; };
    return NzTableStyleService;
}());
if (false) {
    /** @type {?} */
    NzTableStyleService.prototype.theadTemplate$;
    /** @type {?} */
    NzTableStyleService.prototype.hasFixLeft$;
    /** @type {?} */
    NzTableStyleService.prototype.hasFixRight$;
    /** @type {?} */
    NzTableStyleService.prototype.hostWidth$;
    /** @type {?} */
    NzTableStyleService.prototype.columnCount$;
    /** @type {?} */
    NzTableStyleService.prototype.showEmpty$;
    /** @type {?} */
    NzTableStyleService.prototype.noResult$;
    /**
     * @type {?}
     * @private
     */
    NzTableStyleService.prototype.listOfThWidthConfigPx$;
    /**
     * @type {?}
     * @private
     */
    NzTableStyleService.prototype.tableWidthConfigPx$;
    /** @type {?} */
    NzTableStyleService.prototype.manualWidthConfigPx$;
    /**
     * @type {?}
     * @private
     */
    NzTableStyleService.prototype.listOfAutoWidthPx$;
    /** @type {?} */
    NzTableStyleService.prototype.listOfListOfThWidthPx$;
    /** @type {?} */
    NzTableStyleService.prototype.listOfMeasureColumn$;
    /** @type {?} */
    NzTableStyleService.prototype.listOfListOfThWidth$;
    /** @type {?} */
    NzTableStyleService.prototype.enableAutoMeasure$;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/cell/cell.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NzTableCellDirective = /** @class */ (function () {
    function NzTableCellDirective(nzTableStyleService) {
        this.isInsideTable = false;
        this.isInsideTable = !!nzTableStyleService;
    }
    NzTableCellDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'th:not(.nz-disable-th):not([mat-cell]), td:not(.nz-disable-td):not([mat-cell])',
                    host: {
                        '[class.ant-table-cell]': 'isInsideTable'
                    }
                },] }
    ];
    /** @nocollapse */
    NzTableCellDirective.ctorParameters = function () { return [
        { type: NzTableStyleService, decorators: [{ type: Optional }] }
    ]; };
    return NzTableCellDirective;
}());
if (false) {
    /** @type {?} */
    NzTableCellDirective.prototype.isInsideTable;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/cell/td-addon.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NzTdAddOnComponent = /** @class */ (function () {
    function NzTdAddOnComponent() {
        this.nzChecked = false;
        this.nzDisabled = false;
        this.nzIndeterminate = false;
        this.nzIndentSize = 0;
        this.nzShowExpand = false;
        this.nzShowCheckbox = false;
        this.nzExpand = false;
        this.nzCheckedChange = new EventEmitter();
        this.nzExpandChange = new EventEmitter();
        this.isNzShowExpandChanged = false;
        this.isNzShowCheckboxChanged = false;
    }
    /**
     * @param {?} checked
     * @return {?}
     */
    NzTdAddOnComponent.prototype.onCheckedChange = /**
     * @param {?} checked
     * @return {?}
     */
    function (checked) {
        this.nzChecked = checked;
        this.nzCheckedChange.emit(checked);
    };
    /**
     * @param {?} expand
     * @return {?}
     */
    NzTdAddOnComponent.prototype.onExpandChange = /**
     * @param {?} expand
     * @return {?}
     */
    function (expand) {
        this.nzExpand = expand;
        this.nzExpandChange.emit(expand);
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    NzTdAddOnComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        /** @type {?} */
        var isFirstChange = (/**
         * @param {?} value
         * @return {?}
         */
        function (value) { return value && value.firstChange && value.currentValue !== undefined; });
        var nzExpand = changes.nzExpand, nzChecked = changes.nzChecked, nzShowExpand = changes.nzShowExpand, nzShowCheckbox = changes.nzShowCheckbox;
        if (nzShowExpand) {
            this.isNzShowExpandChanged = true;
        }
        if (nzShowCheckbox) {
            this.isNzShowCheckboxChanged = true;
        }
        if (isFirstChange(nzExpand) && !this.isNzShowExpandChanged) {
            this.nzShowExpand = true;
        }
        if (isFirstChange(nzChecked) && !this.isNzShowCheckboxChanged) {
            this.nzShowCheckbox = true;
        }
    };
    NzTdAddOnComponent.decorators = [
        { type: Component, args: [{
                    selector: 'td[nzChecked], td[nzDisabled], td[nzIndeterminate], td[nzIndentSize], td[nzExpand], td[nzShowExpand], td[nzShowCheckbox]',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    preserveWhitespaces: false,
                    encapsulation: ViewEncapsulation.None,
                    template: "\n    <ng-container *ngIf=\"nzShowExpand || nzIndentSize > 0\">\n      <nz-row-indent [indentSize]=\"nzIndentSize\"></nz-row-indent>\n      <button nz-row-expand-button [expand]=\"nzExpand\" (expandChange)=\"onExpandChange($event)\" [spaceMode]=\"!nzShowExpand\"></button>\n    </ng-container>\n    <label\n      nz-checkbox\n      *ngIf=\"nzShowCheckbox\"\n      [nzDisabled]=\"nzDisabled\"\n      [ngModel]=\"nzChecked\"\n      [nzIndeterminate]=\"nzIndeterminate\"\n      (ngModelChange)=\"onCheckedChange($event)\"\n    >\n    </label>\n    <ng-content></ng-content>\n  ",
                    host: {
                        '[class.ant-table-cell-with-append]': "nzShowExpand || nzIndentSize > 0",
                        '[class.ant-table-selection-column]': "nzShowCheckbox"
                    }
                }] }
    ];
    NzTdAddOnComponent.propDecorators = {
        nzChecked: [{ type: Input }],
        nzDisabled: [{ type: Input }],
        nzIndeterminate: [{ type: Input }],
        nzIndentSize: [{ type: Input }],
        nzShowExpand: [{ type: Input }],
        nzShowCheckbox: [{ type: Input }],
        nzExpand: [{ type: Input }],
        nzCheckedChange: [{ type: Output }],
        nzExpandChange: [{ type: Output }]
    };
    __decorate([
        InputBoolean(),
        __metadata("design:type", Object)
    ], NzTdAddOnComponent.prototype, "nzShowExpand", void 0);
    __decorate([
        InputBoolean(),
        __metadata("design:type", Object)
    ], NzTdAddOnComponent.prototype, "nzShowCheckbox", void 0);
    __decorate([
        InputBoolean(),
        __metadata("design:type", Object)
    ], NzTdAddOnComponent.prototype, "nzExpand", void 0);
    return NzTdAddOnComponent;
}());
if (false) {
    /** @type {?} */
    NzTdAddOnComponent.ngAcceptInputType_nzShowExpand;
    /** @type {?} */
    NzTdAddOnComponent.ngAcceptInputType_nzShowCheckbox;
    /** @type {?} */
    NzTdAddOnComponent.ngAcceptInputType_nzExpand;
    /** @type {?} */
    NzTdAddOnComponent.prototype.nzChecked;
    /** @type {?} */
    NzTdAddOnComponent.prototype.nzDisabled;
    /** @type {?} */
    NzTdAddOnComponent.prototype.nzIndeterminate;
    /** @type {?} */
    NzTdAddOnComponent.prototype.nzIndentSize;
    /** @type {?} */
    NzTdAddOnComponent.prototype.nzShowExpand;
    /** @type {?} */
    NzTdAddOnComponent.prototype.nzShowCheckbox;
    /** @type {?} */
    NzTdAddOnComponent.prototype.nzExpand;
    /** @type {?} */
    NzTdAddOnComponent.prototype.nzCheckedChange;
    /** @type {?} */
    NzTdAddOnComponent.prototype.nzExpandChange;
    /**
     * @type {?}
     * @private
     */
    NzTdAddOnComponent.prototype.isNzShowExpandChanged;
    /**
     * @type {?}
     * @private
     */
    NzTdAddOnComponent.prototype.isNzShowCheckboxChanged;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/cell/th-addon.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NzThAddOnComponent = /** @class */ (function () {
    function NzThAddOnComponent(cdr) {
        this.cdr = cdr;
        this.manualClickOrder$ = new Subject();
        this.calcOperatorChange$ = new Subject();
        this.nzFilterValue = null;
        this.sortOrder = null;
        this.sortDirections = ['ascend', 'descend', null];
        this.sortOrderChange$ = new Subject();
        this.destroy$ = new Subject();
        this.isNzShowSortChanged = false;
        this.isNzShowFilterChanged = false;
        this.nzFilterMultiple = true;
        this.nzSortOrder = null;
        this.nzSortPriority = false;
        this.nzSortDirections = ['ascend', 'descend', null];
        this.nzFilters = [];
        this.nzSortFn = null;
        this.nzFilterFn = null;
        this.nzShowSort = false;
        this.nzShowFilter = false;
        this.nzCustomFilter = false;
        this.nzCheckedChange = new EventEmitter();
        this.nzSortOrderChange = new EventEmitter();
        this.nzFilterChange = new EventEmitter();
        /**
         * @deprecated use nzSortOrder instead *
         */
        this.nzSort = null;
        /**
         * @deprecated use nzSortOrderChange instead *
         */
        this.nzSortChange = new EventEmitter();
    }
    /**
     * @param {?} sortDirections
     * @param {?} current
     * @return {?}
     */
    NzThAddOnComponent.prototype.getNextSortDirection = /**
     * @param {?} sortDirections
     * @param {?} current
     * @return {?}
     */
    function (sortDirections, current) {
        /** @type {?} */
        var index = sortDirections.indexOf(current);
        if (index === sortDirections.length - 1) {
            return sortDirections[0];
        }
        else {
            return sortDirections[index + 1];
        }
    };
    /**
     * @return {?}
     */
    NzThAddOnComponent.prototype.emitNextSortValue = /**
     * @return {?}
     */
    function () {
        if (this.nzShowSort) {
            /** @type {?} */
            var nextOrder = this.getNextSortDirection(this.sortDirections, (/** @type {?} */ (this.sortOrder)));
            this.setSortOrder(nextOrder);
            this.manualClickOrder$.next(this);
        }
    };
    /**
     * @param {?} order
     * @return {?}
     */
    NzThAddOnComponent.prototype.setSortOrder = /**
     * @param {?} order
     * @return {?}
     */
    function (order) {
        this.sortOrderChange$.next(order);
    };
    /**
     * @return {?}
     */
    NzThAddOnComponent.prototype.clearSortOrder = /**
     * @return {?}
     */
    function () {
        if (this.sortOrder !== null) {
            this.setSortOrder(null);
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    NzThAddOnComponent.prototype.onFilterValueChange = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.nzFilterChange.emit(value);
        this.nzFilterValue = value;
        this.updateCalcOperator();
    };
    /**
     * @return {?}
     */
    NzThAddOnComponent.prototype.updateCalcOperator = /**
     * @return {?}
     */
    function () {
        this.calcOperatorChange$.next();
    };
    /**
     * @return {?}
     */
    NzThAddOnComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.sortOrderChange$.pipe(takeUntil(this.destroy$)).subscribe((/**
         * @param {?} order
         * @return {?}
         */
        function (order) {
            if (_this.sortOrder !== order) {
                _this.sortOrder = order;
                _this.nzSortChange.emit(order);
                _this.nzSortOrderChange.emit(order);
            }
            _this.updateCalcOperator();
            _this.cdr.markForCheck();
        }));
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    NzThAddOnComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var nzSortKey = changes.nzSortKey, nzSort = changes.nzSort, nzSortDirections = changes.nzSortDirections, nzFilters = changes.nzFilters, nzSortOrder = changes.nzSortOrder, nzSortFn = changes.nzSortFn, nzFilterFn = changes.nzFilterFn, nzSortPriority = changes.nzSortPriority, nzFilterMultiple = changes.nzFilterMultiple, nzShowSort = changes.nzShowSort, nzShowFilter = changes.nzShowFilter;
        if (nzSortDirections) {
            if (this.nzSortDirections && this.nzSortDirections.length) {
                this.sortDirections = this.nzSortDirections;
            }
        }
        if (nzSort) {
            this.sortOrder = this.nzSort;
            this.setSortOrder(this.nzSort);
            warnDeprecation("'nzSort' and 'nzSortChange' is deprecated and will be removed in 10.0.0. Please use 'nzSortOrder' and 'nzSortOrderChange' instead.");
        }
        if (nzSortKey) {
            this.nzColumnKey = this.nzSortKey;
            warnDeprecation("'nzSortKey' is deprecated and will be removed in 10.0.0. Please use 'nzColumnKey' instead.");
        }
        if (nzSortOrder) {
            this.sortOrder = this.nzSortOrder;
            this.setSortOrder(this.nzSortOrder);
        }
        if (nzShowSort) {
            this.isNzShowSortChanged = true;
        }
        if (nzShowFilter) {
            this.isNzShowFilterChanged = true;
        }
        /** @type {?} */
        var isFirstChange = (/**
         * @param {?} value
         * @return {?}
         */
        function (value) { return value && value.firstChange && value.currentValue !== undefined; });
        if ((isFirstChange(nzSortKey) || isFirstChange(nzSort) || isFirstChange(nzSortOrder) || isFirstChange(nzSortFn)) &&
            !this.isNzShowSortChanged) {
            this.nzShowSort = true;
        }
        if (isFirstChange(nzFilters) && !this.isNzShowFilterChanged) {
            this.nzShowFilter = true;
        }
        if ((nzFilters || nzFilterMultiple) && this.nzShowFilter) {
            /** @type {?} */
            var listOfValue = this.nzFilters.filter((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return item.byDefault; })).map((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return item.value; }));
            this.nzFilterValue = this.nzFilterMultiple ? listOfValue : listOfValue[0] || null;
        }
        if (nzSortFn || nzFilterFn || nzSortPriority || nzFilters) {
            this.updateCalcOperator();
        }
    };
    /**
     * @return {?}
     */
    NzThAddOnComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.destroy$.next();
        this.destroy$.complete();
    };
    NzThAddOnComponent.decorators = [
        { type: Component, args: [{
                    selector: 'th[nzSortKey], th[nzColumnKey], th[nzSort], th[nzSortFn], th[nzSortOrder], th[nzFilters], th[nzShowSort], th[nzShowFilter], th[nzCustomFilter]',
                    preserveWhitespaces: false,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: "\n    <nz-table-filter\n      *ngIf=\"nzShowFilter || nzCustomFilter; else notFilterTemplate\"\n      [contentTemplate]=\"notFilterTemplate\"\n      [extraTemplate]=\"extraTemplate\"\n      [customFilter]=\"nzCustomFilter\"\n      [filterMultiple]=\"nzFilterMultiple\"\n      [listOfFilter]=\"nzFilters\"\n      (filterChange)=\"onFilterValueChange($event)\"\n    ></nz-table-filter>\n    <ng-template #notFilterTemplate>\n      <ng-template [ngTemplateOutlet]=\"nzShowSort ? sortTemplate : contentTemplate\"></ng-template>\n    </ng-template>\n    <ng-template #extraTemplate>\n      <ng-content select=\"[nz-th-extra]\"></ng-content>\n      <ng-content select=\"nz-filter-trigger\"></ng-content>\n    </ng-template>\n    <ng-template #sortTemplate>\n      <nz-table-sorters [sortOrder]=\"sortOrder\" [sortDirections]=\"sortDirections\" [contentTemplate]=\"contentTemplate\"></nz-table-sorters>\n    </ng-template>\n    <ng-template #contentTemplate>\n      <ng-content></ng-content>\n    </ng-template>\n  ",
                    host: {
                        '[class.ant-table-column-has-sorters]': 'nzShowSort',
                        '[class.ant-table-column-sort]': "sortOrder === 'descend' || sortOrder === 'ascend'",
                        '(click)': 'emitNextSortValue()'
                    }
                }] }
    ];
    /** @nocollapse */
    NzThAddOnComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
    NzThAddOnComponent.propDecorators = {
        nzColumnKey: [{ type: Input }],
        nzFilterMultiple: [{ type: Input }],
        nzSortOrder: [{ type: Input }],
        nzSortPriority: [{ type: Input }],
        nzSortDirections: [{ type: Input }],
        nzFilters: [{ type: Input }],
        nzSortFn: [{ type: Input }],
        nzFilterFn: [{ type: Input }],
        nzShowSort: [{ type: Input }],
        nzShowFilter: [{ type: Input }],
        nzCustomFilter: [{ type: Input }],
        nzCheckedChange: [{ type: Output }],
        nzSortOrderChange: [{ type: Output }],
        nzFilterChange: [{ type: Output }],
        nzSortKey: [{ type: Input }],
        nzSort: [{ type: Input }],
        nzSortChange: [{ type: Output }]
    };
    __decorate([
        InputBoolean(),
        __metadata("design:type", Object)
    ], NzThAddOnComponent.prototype, "nzShowSort", void 0);
    __decorate([
        InputBoolean(),
        __metadata("design:type", Object)
    ], NzThAddOnComponent.prototype, "nzShowFilter", void 0);
    __decorate([
        InputBoolean(),
        __metadata("design:type", Object)
    ], NzThAddOnComponent.prototype, "nzCustomFilter", void 0);
    return NzThAddOnComponent;
}());
if (false) {
    /** @type {?} */
    NzThAddOnComponent.ngAcceptInputType_nzShowSort;
    /** @type {?} */
    NzThAddOnComponent.ngAcceptInputType_nzShowFilter;
    /** @type {?} */
    NzThAddOnComponent.ngAcceptInputType_nzCustomFilter;
    /** @type {?} */
    NzThAddOnComponent.prototype.manualClickOrder$;
    /** @type {?} */
    NzThAddOnComponent.prototype.calcOperatorChange$;
    /** @type {?} */
    NzThAddOnComponent.prototype.nzFilterValue;
    /** @type {?} */
    NzThAddOnComponent.prototype.sortOrder;
    /** @type {?} */
    NzThAddOnComponent.prototype.sortDirections;
    /**
     * @type {?}
     * @private
     */
    NzThAddOnComponent.prototype.sortOrderChange$;
    /**
     * @type {?}
     * @private
     */
    NzThAddOnComponent.prototype.destroy$;
    /**
     * @type {?}
     * @private
     */
    NzThAddOnComponent.prototype.isNzShowSortChanged;
    /**
     * @type {?}
     * @private
     */
    NzThAddOnComponent.prototype.isNzShowFilterChanged;
    /** @type {?} */
    NzThAddOnComponent.prototype.nzColumnKey;
    /** @type {?} */
    NzThAddOnComponent.prototype.nzFilterMultiple;
    /** @type {?} */
    NzThAddOnComponent.prototype.nzSortOrder;
    /** @type {?} */
    NzThAddOnComponent.prototype.nzSortPriority;
    /** @type {?} */
    NzThAddOnComponent.prototype.nzSortDirections;
    /** @type {?} */
    NzThAddOnComponent.prototype.nzFilters;
    /** @type {?} */
    NzThAddOnComponent.prototype.nzSortFn;
    /** @type {?} */
    NzThAddOnComponent.prototype.nzFilterFn;
    /** @type {?} */
    NzThAddOnComponent.prototype.nzShowSort;
    /** @type {?} */
    NzThAddOnComponent.prototype.nzShowFilter;
    /** @type {?} */
    NzThAddOnComponent.prototype.nzCustomFilter;
    /** @type {?} */
    NzThAddOnComponent.prototype.nzCheckedChange;
    /** @type {?} */
    NzThAddOnComponent.prototype.nzSortOrderChange;
    /** @type {?} */
    NzThAddOnComponent.prototype.nzFilterChange;
    /**
     * @deprecated use nzColumnKey instead *
     * @type {?}
     */
    NzThAddOnComponent.prototype.nzSortKey;
    /**
     * @deprecated use nzSortOrder instead *
     * @type {?}
     */
    NzThAddOnComponent.prototype.nzSort;
    /**
     * @deprecated use nzSortOrderChange instead *
     * @type {?}
     */
    NzThAddOnComponent.prototype.nzSortChange;
    /**
     * @type {?}
     * @private
     */
    NzThAddOnComponent.prototype.cdr;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/cell/th-measure.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NzThMeasureDirective = /** @class */ (function () {
    function NzThMeasureDirective(renderer, elementRef) {
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.changes$ = new Subject();
        this.nzWidth = null;
        this.colspan = null;
        this.colSpan = null;
        this.rowspan = null;
        this.rowSpan = null;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    NzThMeasureDirective.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var nzWidth = changes.nzWidth, colspan = changes.colspan, rowspan = changes.rowspan, colSpan = changes.colSpan, rowSpan = changes.rowSpan;
        if (colspan || colSpan) {
            /** @type {?} */
            var col = this.colspan || this.colSpan;
            if (!isNil(col)) {
                this.renderer.setAttribute(this.elementRef.nativeElement, 'colspan', "" + col);
            }
            else {
                this.renderer.removeAttribute(this.elementRef.nativeElement, 'colspan');
            }
        }
        if (rowspan || rowSpan) {
            /** @type {?} */
            var row = this.rowspan || this.rowSpan;
            if (!isNil(row)) {
                this.renderer.setAttribute(this.elementRef.nativeElement, 'rowspan', "" + row);
            }
            else {
                this.renderer.removeAttribute(this.elementRef.nativeElement, 'rowspan');
            }
        }
        if (nzWidth || colspan) {
            this.changes$.next();
        }
    };
    NzThMeasureDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'th'
                },] }
    ];
    /** @nocollapse */
    NzThMeasureDirective.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ElementRef }
    ]; };
    NzThMeasureDirective.propDecorators = {
        nzWidth: [{ type: Input }],
        colspan: [{ type: Input }],
        colSpan: [{ type: Input }],
        rowspan: [{ type: Input }],
        rowSpan: [{ type: Input }]
    };
    return NzThMeasureDirective;
}());
if (false) {
    /** @type {?} */
    NzThMeasureDirective.prototype.changes$;
    /** @type {?} */
    NzThMeasureDirective.prototype.nzWidth;
    /** @type {?} */
    NzThMeasureDirective.prototype.colspan;
    /** @type {?} */
    NzThMeasureDirective.prototype.colSpan;
    /** @type {?} */
    NzThMeasureDirective.prototype.rowspan;
    /** @type {?} */
    NzThMeasureDirective.prototype.rowSpan;
    /**
     * @type {?}
     * @private
     */
    NzThMeasureDirective.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    NzThMeasureDirective.prototype.elementRef;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/cell/th-selection.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NzThSelectionComponent = /** @class */ (function () {
    function NzThSelectionComponent() {
        this.nzSelections = [];
        this.nzChecked = false;
        this.nzDisabled = false;
        this.nzIndeterminate = false;
        this.nzShowCheckbox = false;
        this.nzShowRowSelection = false;
        this.nzCheckedChange = new EventEmitter();
        this.nzSortChangeWithKey = new EventEmitter();
        this.isNzShowExpandChanged = false;
        this.isNzShowCheckboxChanged = false;
    }
    /**
     * @param {?} checked
     * @return {?}
     */
    NzThSelectionComponent.prototype.onCheckedChange = /**
     * @param {?} checked
     * @return {?}
     */
    function (checked) {
        this.nzChecked = checked;
        this.nzCheckedChange.emit(checked);
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    NzThSelectionComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        /** @type {?} */
        var isFirstChange = (/**
         * @param {?} value
         * @return {?}
         */
        function (value) { return value && value.firstChange && value.currentValue !== undefined; });
        var nzChecked = changes.nzChecked, nzSelections = changes.nzSelections, nzShowExpand = changes.nzShowExpand, nzShowCheckbox = changes.nzShowCheckbox;
        if (nzShowExpand) {
            this.isNzShowExpandChanged = true;
        }
        if (nzShowCheckbox) {
            this.isNzShowCheckboxChanged = true;
        }
        if (isFirstChange(nzSelections) && !this.isNzShowExpandChanged) {
            this.nzShowRowSelection = true;
        }
        if (isFirstChange(nzChecked) && !this.isNzShowCheckboxChanged) {
            this.nzShowCheckbox = true;
        }
    };
    NzThSelectionComponent.decorators = [
        { type: Component, args: [{
                    selector: 'th[nzSelections],th[nzChecked],th[nzShowCheckbox],th[nzShowRowSelection]',
                    preserveWhitespaces: false,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: "\n    <nz-table-selection\n      [checked]=\"nzChecked\"\n      [disabled]=\"nzDisabled\"\n      [indeterminate]=\"nzIndeterminate\"\n      [listOfSelections]=\"nzSelections\"\n      [showCheckbox]=\"nzShowCheckbox\"\n      [showRowSelection]=\"nzShowRowSelection\"\n      (checkedChange)=\"onCheckedChange($event)\"\n    ></nz-table-selection>\n    <ng-content></ng-content>\n  ",
                    host: {
                        '[class.ant-table-selection-column]': 'true'
                    }
                }] }
    ];
    NzThSelectionComponent.propDecorators = {
        nzSelections: [{ type: Input }],
        nzChecked: [{ type: Input }],
        nzDisabled: [{ type: Input }],
        nzIndeterminate: [{ type: Input }],
        nzShowCheckbox: [{ type: Input }],
        nzShowRowSelection: [{ type: Input }],
        nzCheckedChange: [{ type: Output }],
        nzSortChangeWithKey: [{ type: Output }]
    };
    __decorate([
        InputBoolean(),
        __metadata("design:type", Object)
    ], NzThSelectionComponent.prototype, "nzShowCheckbox", void 0);
    __decorate([
        InputBoolean(),
        __metadata("design:type", Object)
    ], NzThSelectionComponent.prototype, "nzShowRowSelection", void 0);
    return NzThSelectionComponent;
}());
if (false) {
    /** @type {?} */
    NzThSelectionComponent.ngAcceptInputType_nzShowCheckbox;
    /** @type {?} */
    NzThSelectionComponent.ngAcceptInputType_nzShowRowSelection;
    /** @type {?} */
    NzThSelectionComponent.prototype.nzSelections;
    /** @type {?} */
    NzThSelectionComponent.prototype.nzChecked;
    /** @type {?} */
    NzThSelectionComponent.prototype.nzDisabled;
    /** @type {?} */
    NzThSelectionComponent.prototype.nzIndeterminate;
    /** @type {?} */
    NzThSelectionComponent.prototype.nzShowCheckbox;
    /** @type {?} */
    NzThSelectionComponent.prototype.nzShowRowSelection;
    /** @type {?} */
    NzThSelectionComponent.prototype.nzCheckedChange;
    /** @type {?} */
    NzThSelectionComponent.prototype.nzSortChangeWithKey;
    /**
     * @type {?}
     * @private
     */
    NzThSelectionComponent.prototype.isNzShowExpandChanged;
    /**
     * @type {?}
     * @private
     */
    NzThSelectionComponent.prototype.isNzShowCheckboxChanged;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/styled/align.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NzCellAlignDirective = /** @class */ (function () {
    function NzCellAlignDirective() {
        this.nzAlign = null;
    }
    NzCellAlignDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'th[nzAlign],td[nzAlign]',
                    host: {
                        '[style.text-align]': 'nzAlign'
                    }
                },] }
    ];
    NzCellAlignDirective.propDecorators = {
        nzAlign: [{ type: Input }]
    };
    return NzCellAlignDirective;
}());
if (false) {
    /** @type {?} */
    NzCellAlignDirective.prototype.nzAlign;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/styled/ellipsis.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NzCellEllipsisDirective = /** @class */ (function () {
    function NzCellEllipsisDirective() {
        this.nzEllipsis = true;
    }
    NzCellEllipsisDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'th[nzEllipsis],td[nzEllipsis]',
                    host: {
                        '[class.ant-table-cell-ellipsis]': 'nzEllipsis'
                    }
                },] }
    ];
    NzCellEllipsisDirective.propDecorators = {
        nzEllipsis: [{ type: Input }]
    };
    __decorate([
        InputBoolean(),
        __metadata("design:type", Object)
    ], NzCellEllipsisDirective.prototype, "nzEllipsis", void 0);
    return NzCellEllipsisDirective;
}());
if (false) {
    /** @type {?} */
    NzCellEllipsisDirective.ngAcceptInputType_nzEllipsis;
    /** @type {?} */
    NzCellEllipsisDirective.prototype.nzEllipsis;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/styled/word-break.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NzCellBreakWordDirective = /** @class */ (function () {
    function NzCellBreakWordDirective() {
        this.nzBreakWord = true;
    }
    NzCellBreakWordDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'th[nzBreakWord],td[nzBreakWord]',
                    host: {
                        '[style.word-break]': "nzBreakWord ? 'break-all' : ''"
                    }
                },] }
    ];
    NzCellBreakWordDirective.propDecorators = {
        nzBreakWord: [{ type: Input }]
    };
    __decorate([
        InputBoolean(),
        __metadata("design:type", Object)
    ], NzCellBreakWordDirective.prototype, "nzBreakWord", void 0);
    return NzCellBreakWordDirective;
}());
if (false) {
    /** @type {?} */
    NzCellBreakWordDirective.ngAcceptInputType_nzBreakWord;
    /** @type {?} */
    NzCellBreakWordDirective.prototype.nzBreakWord;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/table/table-content.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NzTableContentComponent = /** @class */ (function () {
    function NzTableContentComponent() {
        this.tableLayout = 'auto';
        this.theadTemplate = null;
        this.contentTemplate = null;
        this.listOfColWidth = [];
        this.scrollX = null;
    }
    NzTableContentComponent.decorators = [
        { type: Component, args: [{
                    selector: 'table[nz-table-content]',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    template: "\n    <col [style.width]=\"width\" [style.minWidth]=\"width\" *ngFor=\"let width of listOfColWidth\" />\n    <thead class=\"ant-table-thead\" *ngIf=\"theadTemplate\">\n      <ng-template [ngTemplateOutlet]=\"theadTemplate\"></ng-template>\n    </thead>\n    <ng-template [ngTemplateOutlet]=\"contentTemplate\"></ng-template>\n    <ng-content></ng-content>\n  ",
                    host: {
                        '[style.table-layout]': 'tableLayout',
                        '[class.ant-table-fixed]': 'scrollX',
                        '[style.width]': 'scrollX',
                        '[style.min-width]': "scrollX ? '100%': null"
                    }
                }] }
    ];
    NzTableContentComponent.propDecorators = {
        tableLayout: [{ type: Input }],
        theadTemplate: [{ type: Input }],
        contentTemplate: [{ type: Input }],
        listOfColWidth: [{ type: Input }],
        scrollX: [{ type: Input }]
    };
    return NzTableContentComponent;
}());
if (false) {
    /** @type {?} */
    NzTableContentComponent.prototype.tableLayout;
    /** @type {?} */
    NzTableContentComponent.prototype.theadTemplate;
    /** @type {?} */
    NzTableContentComponent.prototype.contentTemplate;
    /** @type {?} */
    NzTableContentComponent.prototype.listOfColWidth;
    /** @type {?} */
    NzTableContentComponent.prototype.scrollX;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/table/table-fixed-row.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NzTableFixedRowComponent = /** @class */ (function () {
    function NzTableFixedRowComponent(nzTableStyleService, renderer) {
        this.nzTableStyleService = nzTableStyleService;
        this.renderer = renderer;
        this.hostWidth$ = new BehaviorSubject(null);
        this.enableAutoMeasure$ = new BehaviorSubject(false);
        this.destroy$ = new Subject();
    }
    /**
     * @return {?}
     */
    NzTableFixedRowComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (this.nzTableStyleService) {
            var _a = this.nzTableStyleService, enableAutoMeasure$ = _a.enableAutoMeasure$, hostWidth$ = _a.hostWidth$;
            enableAutoMeasure$.subscribe(this.enableAutoMeasure$);
            hostWidth$.subscribe(this.hostWidth$);
        }
    };
    /**
     * @return {?}
     */
    NzTableFixedRowComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.nzTableStyleService.columnCount$.pipe(takeUntil(this.destroy$)).subscribe((/**
         * @param {?} count
         * @return {?}
         */
        function (count) {
            _this.renderer.setAttribute(_this.tdElement.nativeElement, 'colspan', "" + count);
        }));
    };
    /**
     * @return {?}
     */
    NzTableFixedRowComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.destroy$.next();
        this.destroy$.complete();
    };
    NzTableFixedRowComponent.decorators = [
        { type: Component, args: [{
                    selector: 'tr[nz-table-fixed-row], tr[nzExpand]',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    template: "\n    <td class=\"nz-disable-td ant-table-cell\" #tdElement>\n      <div\n        class=\"ant-table-expanded-row-fixed\"\n        *ngIf=\"enableAutoMeasure$ | async; else contentTemplate\"\n        style=\"position: sticky; left: 0px; overflow: hidden;\"\n        [style.width.px]=\"hostWidth$ | async\"\n      >\n        <ng-template [ngTemplateOutlet]=\"contentTemplate\"></ng-template>\n      </div>\n    </td>\n    <ng-template #contentTemplate><ng-content></ng-content></ng-template>\n  "
                }] }
    ];
    /** @nocollapse */
    NzTableFixedRowComponent.ctorParameters = function () { return [
        { type: NzTableStyleService },
        { type: Renderer2 }
    ]; };
    NzTableFixedRowComponent.propDecorators = {
        tdElement: [{ type: ViewChild, args: ['tdElement',] }]
    };
    return NzTableFixedRowComponent;
}());
if (false) {
    /** @type {?} */
    NzTableFixedRowComponent.prototype.tdElement;
    /** @type {?} */
    NzTableFixedRowComponent.prototype.hostWidth$;
    /** @type {?} */
    NzTableFixedRowComponent.prototype.enableAutoMeasure$;
    /**
     * @type {?}
     * @private
     */
    NzTableFixedRowComponent.prototype.destroy$;
    /**
     * @type {?}
     * @private
     */
    NzTableFixedRowComponent.prototype.nzTableStyleService;
    /**
     * @type {?}
     * @private
     */
    NzTableFixedRowComponent.prototype.renderer;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/table/table-inner-default.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NzTableInnerDefaultComponent = /** @class */ (function () {
    function NzTableInnerDefaultComponent() {
        this.tableLayout = 'auto';
        this.listOfColWidth = [];
        this.theadTemplate = null;
        this.contentTemplate = null;
    }
    NzTableInnerDefaultComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nz-table-inner-default',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    template: "\n    <div class=\"ant-table-content\">\n      <table\n        nz-table-content\n        [contentTemplate]=\"contentTemplate\"\n        [tableLayout]=\"tableLayout\"\n        [listOfColWidth]=\"listOfColWidth\"\n        [theadTemplate]=\"theadTemplate\"\n      ></table>\n    </div>\n  ",
                    host: {
                        '[class.ant-table-container]': 'true'
                    }
                }] }
    ];
    NzTableInnerDefaultComponent.propDecorators = {
        tableLayout: [{ type: Input }],
        listOfColWidth: [{ type: Input }],
        theadTemplate: [{ type: Input }],
        contentTemplate: [{ type: Input }]
    };
    return NzTableInnerDefaultComponent;
}());
if (false) {
    /** @type {?} */
    NzTableInnerDefaultComponent.prototype.tableLayout;
    /** @type {?} */
    NzTableInnerDefaultComponent.prototype.listOfColWidth;
    /** @type {?} */
    NzTableInnerDefaultComponent.prototype.theadTemplate;
    /** @type {?} */
    NzTableInnerDefaultComponent.prototype.contentTemplate;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/table/table-inner-scroll.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NzTableInnerScrollComponent = /** @class */ (function () {
    function NzTableInnerScrollComponent(renderer, ngZone, platform, resizeService) {
        this.renderer = renderer;
        this.ngZone = ngZone;
        this.platform = platform;
        this.resizeService = resizeService;
        this.data = [];
        this.scrollX = null;
        this.scrollY = null;
        this.contentTemplate = null;
        this.widthConfig = [];
        this.listOfColWidth = [];
        this.theadTemplate = null;
        this.virtualTemplate = null;
        this.virtualItemSize = 0;
        this.virtualMaxBufferPx = 200;
        this.virtualMinBufferPx = 100;
        this.virtualForTrackBy = (/**
         * @param {?} index
         * @return {?}
         */
        function (index) { return index; });
        this.headerStyleMap = {};
        this.bodyStyleMap = {};
        this.verticalScrollBarWidth = 0;
        this.noDateVirtualHeight = '182px';
        this.data$ = new Subject();
        this.scroll$ = new Subject();
        this.destroy$ = new Subject();
    }
    /**
     * @param {?=} clear
     * @return {?}
     */
    NzTableInnerScrollComponent.prototype.setScrollPositionClassName = /**
     * @param {?=} clear
     * @return {?}
     */
    function (clear) {
        if (clear === void 0) { clear = false; }
        var _a = this.tableBodyElement.nativeElement, scrollWidth = _a.scrollWidth, scrollLeft = _a.scrollLeft, clientWidth = _a.clientWidth;
        /** @type {?} */
        var leftClassName = 'ant-table-ping-left';
        /** @type {?} */
        var rightClassName = 'ant-table-ping-right';
        if ((scrollWidth === clientWidth && scrollWidth !== 0) || clear) {
            this.renderer.removeClass(this.tableMainElement, leftClassName);
            this.renderer.removeClass(this.tableMainElement, rightClassName);
        }
        else if (scrollLeft === 0) {
            this.renderer.removeClass(this.tableMainElement, leftClassName);
            this.renderer.addClass(this.tableMainElement, rightClassName);
        }
        else if (scrollWidth === scrollLeft + clientWidth) {
            this.renderer.removeClass(this.tableMainElement, rightClassName);
            this.renderer.addClass(this.tableMainElement, leftClassName);
        }
        else {
            this.renderer.addClass(this.tableMainElement, leftClassName);
            this.renderer.addClass(this.tableMainElement, rightClassName);
        }
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    NzTableInnerScrollComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var scrollX = changes.scrollX, scrollY = changes.scrollY, data = changes.data;
        if (scrollX || scrollY) {
            /** @type {?} */
            var hasVerticalScrollBar = this.verticalScrollBarWidth !== 0;
            this.headerStyleMap = {
                overflowX: 'hidden',
                overflowY: this.scrollY && hasVerticalScrollBar ? 'scroll' : 'hidden'
            };
            this.bodyStyleMap = {
                overflowY: this.scrollY ? 'scroll' : null,
                overflowX: this.scrollX ? 'scroll' : null,
                maxHeight: this.scrollY
            };
            this.scroll$.next();
        }
        if (data) {
            this.data$.next();
        }
    };
    /**
     * @return {?}
     */
    NzTableInnerScrollComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.platform.isBrowser) {
            this.ngZone.runOutsideAngular((/**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var scrollEvent$ = fromEvent(_this.tableBodyElement.nativeElement, 'scroll').pipe(takeUntil(_this.destroy$));
                /** @type {?} */
                var scrollX$ = scrollEvent$.pipe(filter((/**
                 * @return {?}
                 */
                function () { return !!_this.scrollX; })));
                /** @type {?} */
                var scrollY$ = scrollEvent$.pipe(filter((/**
                 * @return {?}
                 */
                function () { return !!_this.scrollY; })));
                /** @type {?} */
                var resize$ = _this.resizeService.subscribe().pipe(takeUntil(_this.destroy$));
                /** @type {?} */
                var data$ = _this.data$.pipe(takeUntil(_this.destroy$));
                /** @type {?} */
                var setClassName$ = merge(scrollX$, resize$, data$, _this.scroll$).pipe(startWith(true), delay(0));
                setClassName$.subscribe((/**
                 * @return {?}
                 */
                function () { return _this.setScrollPositionClassName(); }));
                scrollY$.subscribe((/**
                 * @return {?}
                 */
                function () { return (_this.tableHeaderElement.nativeElement.scrollLeft = _this.tableBodyElement.nativeElement.scrollLeft); }));
            }));
        }
    };
    /**
     * @return {?}
     */
    NzTableInnerScrollComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.setScrollPositionClassName(true);
        this.destroy$.next();
        this.destroy$.complete();
    };
    NzTableInnerScrollComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nz-table-inner-scroll',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    template: "\n    <div class=\"ant-table-content\">\n      <div *ngIf=\"scrollY\" #tableHeaderElement [ngStyle]=\"headerStyleMap\" class=\"ant-table-header nz-table-hide-scrollbar\">\n        <table\n          nz-table-content\n          tableLayout=\"fixed\"\n          [scrollX]=\"scrollX\"\n          [listOfColWidth]=\"listOfColWidth\"\n          [theadTemplate]=\"theadTemplate\"\n        ></table>\n      </div>\n      <div #tableBodyElement *ngIf=\"!virtualTemplate\" class=\"ant-table-body\" [ngStyle]=\"bodyStyleMap\">\n        <table\n          nz-table-content\n          [scrollX]=\"scrollX\"\n          tableLayout=\"fixed\"\n          [listOfColWidth]=\"listOfColWidth\"\n          [theadTemplate]=\"scrollY ? null : theadTemplate\"\n          [contentTemplate]=\"contentTemplate\"\n        ></table>\n      </div>\n      <cdk-virtual-scroll-viewport\n        #tableBodyElement\n        *ngIf=\"virtualTemplate\"\n        [itemSize]=\"virtualItemSize\"\n        [maxBufferPx]=\"virtualMaxBufferPx\"\n        [minBufferPx]=\"virtualMinBufferPx\"\n        [style.height]=\"data.length ? scrollY : noDateVirtualHeight\"\n      >\n        <table nz-table-content tableLayout=\"fixed\" [scrollX]=\"scrollX\" [listOfColWidth]=\"listOfColWidth\">\n          <tbody>\n            <ng-container *cdkVirtualFor=\"let item of data; let i = index; trackBy: virtualForTrackBy\">\n              <ng-template [ngTemplateOutlet]=\"virtualTemplate\" [ngTemplateOutletContext]=\"{ $implicit: item, index: i }\"></ng-template>\n            </ng-container>\n          </tbody>\n        </table>\n      </cdk-virtual-scroll-viewport>\n    </div>\n  ",
                    host: {
                        '[class.ant-table-container]': 'true'
                    }
                }] }
    ];
    /** @nocollapse */
    NzTableInnerScrollComponent.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: NgZone },
        { type: Platform },
        { type: NzResizeService }
    ]; };
    NzTableInnerScrollComponent.propDecorators = {
        data: [{ type: Input }],
        scrollX: [{ type: Input }],
        scrollY: [{ type: Input }],
        contentTemplate: [{ type: Input }],
        widthConfig: [{ type: Input }],
        listOfColWidth: [{ type: Input }],
        theadTemplate: [{ type: Input }],
        virtualTemplate: [{ type: Input }],
        virtualItemSize: [{ type: Input }],
        virtualMaxBufferPx: [{ type: Input }],
        virtualMinBufferPx: [{ type: Input }],
        tableMainElement: [{ type: Input }],
        virtualForTrackBy: [{ type: Input }],
        tableHeaderElement: [{ type: ViewChild, args: ['tableHeaderElement', { read: ElementRef },] }],
        tableBodyElement: [{ type: ViewChild, args: ['tableBodyElement', { read: ElementRef },] }],
        cdkVirtualScrollViewport: [{ type: ViewChild, args: [CdkVirtualScrollViewport, { read: CdkVirtualScrollViewport },] }],
        verticalScrollBarWidth: [{ type: Input }]
    };
    return NzTableInnerScrollComponent;
}());
if (false) {
    /** @type {?} */
    NzTableInnerScrollComponent.prototype.data;
    /** @type {?} */
    NzTableInnerScrollComponent.prototype.scrollX;
    /** @type {?} */
    NzTableInnerScrollComponent.prototype.scrollY;
    /** @type {?} */
    NzTableInnerScrollComponent.prototype.contentTemplate;
    /** @type {?} */
    NzTableInnerScrollComponent.prototype.widthConfig;
    /** @type {?} */
    NzTableInnerScrollComponent.prototype.listOfColWidth;
    /** @type {?} */
    NzTableInnerScrollComponent.prototype.theadTemplate;
    /** @type {?} */
    NzTableInnerScrollComponent.prototype.virtualTemplate;
    /** @type {?} */
    NzTableInnerScrollComponent.prototype.virtualItemSize;
    /** @type {?} */
    NzTableInnerScrollComponent.prototype.virtualMaxBufferPx;
    /** @type {?} */
    NzTableInnerScrollComponent.prototype.virtualMinBufferPx;
    /** @type {?} */
    NzTableInnerScrollComponent.prototype.tableMainElement;
    /** @type {?} */
    NzTableInnerScrollComponent.prototype.virtualForTrackBy;
    /** @type {?} */
    NzTableInnerScrollComponent.prototype.tableHeaderElement;
    /** @type {?} */
    NzTableInnerScrollComponent.prototype.tableBodyElement;
    /** @type {?} */
    NzTableInnerScrollComponent.prototype.cdkVirtualScrollViewport;
    /** @type {?} */
    NzTableInnerScrollComponent.prototype.headerStyleMap;
    /** @type {?} */
    NzTableInnerScrollComponent.prototype.bodyStyleMap;
    /** @type {?} */
    NzTableInnerScrollComponent.prototype.verticalScrollBarWidth;
    /** @type {?} */
    NzTableInnerScrollComponent.prototype.noDateVirtualHeight;
    /**
     * @type {?}
     * @private
     */
    NzTableInnerScrollComponent.prototype.data$;
    /**
     * @type {?}
     * @private
     */
    NzTableInnerScrollComponent.prototype.scroll$;
    /**
     * @type {?}
     * @private
     */
    NzTableInnerScrollComponent.prototype.destroy$;
    /**
     * @type {?}
     * @private
     */
    NzTableInnerScrollComponent.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    NzTableInnerScrollComponent.prototype.ngZone;
    /**
     * @type {?}
     * @private
     */
    NzTableInnerScrollComponent.prototype.platform;
    /**
     * @type {?}
     * @private
     */
    NzTableInnerScrollComponent.prototype.resizeService;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/table/table-virtual-scroll.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NzTableVirtualScrollDirective = /** @class */ (function () {
    function NzTableVirtualScrollDirective(templateRef) {
        this.templateRef = templateRef;
    }
    NzTableVirtualScrollDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[nz-virtual-scroll]',
                    exportAs: 'nzVirtualScroll'
                },] }
    ];
    /** @nocollapse */
    NzTableVirtualScrollDirective.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    return NzTableVirtualScrollDirective;
}());
if (false) {
    /** @type {?} */
    NzTableVirtualScrollDirective.prototype.templateRef;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/table-data.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NzTableDataService = /** @class */ (function () {
    function NzTableDataService() {
        var _this = this;
        this.destroy$ = new Subject();
        this.pageIndex$ = new BehaviorSubject(1);
        this.frontPagination$ = new BehaviorSubject(true);
        this.pageSize$ = new BehaviorSubject(10);
        this.listOfData$ = new BehaviorSubject([]);
        this.pageIndexDistinct$ = this.pageIndex$.pipe(distinctUntilChanged());
        this.pageSizeDistinct$ = this.pageSize$.pipe(distinctUntilChanged());
        this.listOfCalcOperator$ = new BehaviorSubject([]);
        this.queryParams$ = combineLatest([
            this.pageIndexDistinct$,
            this.pageSizeDistinct$,
            this.listOfCalcOperator$
        ]).pipe(debounceTime(0), skip(1), map((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = __read(_a, 3), pageIndex = _b[0], pageSize = _b[1], listOfCalc = _b[2];
            return {
                pageIndex: pageIndex,
                pageSize: pageSize,
                sort: listOfCalc
                    .filter((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) { return item.sortFn; }))
                    .map((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) {
                    return {
                        key: (/** @type {?} */ (item.key)),
                        value: item.sortOrder
                    };
                })),
                filter: listOfCalc
                    .filter((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) { return item.filterFn; }))
                    .map((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) {
                    return {
                        key: (/** @type {?} */ (item.key)),
                        value: item.filterValue
                    };
                }))
            };
        })));
        this.listOfDataAfterCalc$ = combineLatest([this.listOfData$, this.listOfCalcOperator$]).pipe(map((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var e_1, _b;
            var _c = __read(_a, 2), listOfData = _c[0], listOfCalcOperator = _c[1];
            /** @type {?} */
            var listOfDataAfterCalc = __spread(listOfData);
            /** @type {?} */
            var listOfFilterOperator = listOfCalcOperator.filter((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                var filterValue = item.filterValue, filterFn = item.filterFn;
                /** @type {?} */
                var isReset = filterValue === null || filterValue === undefined || (Array.isArray(filterValue) && (/** @type {?} */ (filterValue)).length === 0);
                return !isReset && typeof filterFn === 'function';
            }));
            var _loop_1 = function (item) {
                var filterFn = item.filterFn, filterValue = item.filterValue;
                listOfDataAfterCalc = listOfDataAfterCalc.filter((/**
                 * @param {?} data
                 * @return {?}
                 */
                function (data) { return ((/** @type {?} */ (filterFn)))(filterValue, data); }));
            };
            try {
                for (var listOfFilterOperator_1 = __values(listOfFilterOperator), listOfFilterOperator_1_1 = listOfFilterOperator_1.next(); !listOfFilterOperator_1_1.done; listOfFilterOperator_1_1 = listOfFilterOperator_1.next()) {
                    var item = listOfFilterOperator_1_1.value;
                    _loop_1(item);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (listOfFilterOperator_1_1 && !listOfFilterOperator_1_1.done && (_b = listOfFilterOperator_1.return)) _b.call(listOfFilterOperator_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            /** @type {?} */
            var listOfSortOperator = listOfCalcOperator
                .filter((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return item.sortOrder !== null && typeof item.sortFn === 'function'; }))
                .sort((/**
             * @param {?} a
             * @param {?} b
             * @return {?}
             */
            function (a, b) { return +b.sortPriority - +a.sortPriority; }));
            if (listOfCalcOperator.length) {
                listOfDataAfterCalc.sort((/**
                 * @param {?} record1
                 * @param {?} record2
                 * @return {?}
                 */
                function (record1, record2) {
                    var e_2, _a;
                    try {
                        for (var listOfSortOperator_1 = __values(listOfSortOperator), listOfSortOperator_1_1 = listOfSortOperator_1.next(); !listOfSortOperator_1_1.done; listOfSortOperator_1_1 = listOfSortOperator_1.next()) {
                            var item = listOfSortOperator_1_1.value;
                            var sortFn = item.sortFn, sortOrder = item.sortOrder;
                            if (sortFn && sortOrder) {
                                /** @type {?} */
                                var compareResult = ((/** @type {?} */ (sortFn)))(record1, record2, sortOrder);
                                if (compareResult !== 0) {
                                    return sortOrder === 'ascend' ? compareResult : -compareResult;
                                }
                            }
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (listOfSortOperator_1_1 && !listOfSortOperator_1_1.done && (_a = listOfSortOperator_1.return)) _a.call(listOfSortOperator_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                    return 0;
                }));
            }
            return listOfDataAfterCalc;
        })));
        this.listOfFrontEndCurrentPageData$ = combineLatest([this.pageIndexDistinct$, this.pageSizeDistinct$, this.listOfDataAfterCalc$]).pipe(takeUntil(this.destroy$), filter((/**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var _a = __read(value, 3), pageIndex = _a[0], pageSize = _a[1], listOfData = _a[2];
            /** @type {?} */
            var maxPageIndex = Math.ceil(listOfData.length / pageSize) || 1;
            return pageIndex <= maxPageIndex;
        })), map((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = __read(_a, 3), pageIndex = _b[0], pageSize = _b[1], listOfData = _b[2];
            return listOfData.slice((pageIndex - 1) * pageSize, pageIndex * pageSize);
        })));
        this.listOfCurrentPageData$ = this.frontPagination$.pipe(switchMap((/**
         * @param {?} pagination
         * @return {?}
         */
        function (pagination) { return (pagination ? _this.listOfFrontEndCurrentPageData$ : _this.listOfData$); })));
        this.total$ = this.frontPagination$.pipe(switchMap((/**
         * @param {?} pagination
         * @return {?}
         */
        function (pagination) { return (pagination ? _this.listOfDataAfterCalc$ : _this.listOfData$); })), map((/**
         * @param {?} list
         * @return {?}
         */
        function (list) { return list.length; })), distinctUntilChanged());
    }
    /**
     * @param {?} size
     * @return {?}
     */
    NzTableDataService.prototype.updatePageSize = /**
     * @param {?} size
     * @return {?}
     */
    function (size) {
        this.pageSize$.next(size);
    };
    /**
     * @param {?} pagination
     * @return {?}
     */
    NzTableDataService.prototype.updateFrontPagination = /**
     * @param {?} pagination
     * @return {?}
     */
    function (pagination) {
        this.frontPagination$.next(pagination);
    };
    /**
     * @param {?} index
     * @return {?}
     */
    NzTableDataService.prototype.updatePageIndex = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        this.pageIndex$.next(index);
    };
    /**
     * @param {?} list
     * @return {?}
     */
    NzTableDataService.prototype.updateListOfData = /**
     * @param {?} list
     * @return {?}
     */
    function (list) {
        this.listOfData$.next(list);
    };
    /**
     * @return {?}
     */
    NzTableDataService.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.destroy$.next();
        this.destroy$.complete();
    };
    NzTableDataService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    NzTableDataService.ctorParameters = function () { return []; };
    return NzTableDataService;
}());
if (false) {
    /**
     * @type {?}
     * @private
     */
    NzTableDataService.prototype.destroy$;
    /**
     * @type {?}
     * @private
     */
    NzTableDataService.prototype.pageIndex$;
    /**
     * @type {?}
     * @private
     */
    NzTableDataService.prototype.frontPagination$;
    /**
     * @type {?}
     * @private
     */
    NzTableDataService.prototype.pageSize$;
    /**
     * @type {?}
     * @private
     */
    NzTableDataService.prototype.listOfData$;
    /** @type {?} */
    NzTableDataService.prototype.pageIndexDistinct$;
    /** @type {?} */
    NzTableDataService.prototype.pageSizeDistinct$;
    /** @type {?} */
    NzTableDataService.prototype.listOfCalcOperator$;
    /** @type {?} */
    NzTableDataService.prototype.queryParams$;
    /**
     * @type {?}
     * @private
     */
    NzTableDataService.prototype.listOfDataAfterCalc$;
    /**
     * @type {?}
     * @private
     */
    NzTableDataService.prototype.listOfFrontEndCurrentPageData$;
    /** @type {?} */
    NzTableDataService.prototype.listOfCurrentPageData$;
    /** @type {?} */
    NzTableDataService.prototype.total$;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/table/table.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var NZ_CONFIG_COMPONENT_NAME = 'table';
/**
 * @template T
 */
var NzTableComponent = /** @class */ (function () {
    function NzTableComponent(elementRef, nzResizeObserver, nzConfigService, cdr, nzTableStyleService, nzTableDataService) {
        var _this = this;
        this.elementRef = elementRef;
        this.nzResizeObserver = nzResizeObserver;
        this.nzConfigService = nzConfigService;
        this.cdr = cdr;
        this.nzTableStyleService = nzTableStyleService;
        this.nzTableDataService = nzTableDataService;
        this.nzTableLayout = 'auto';
        this.nzShowTotal = null;
        this.nzItemRender = null;
        this.nzTitle = null;
        this.nzFooter = null;
        this.nzNoResult = undefined;
        this.nzPageSizeOptions = [10, 20, 30, 40, 50];
        this.nzVirtualItemSize = 0;
        this.nzVirtualMaxBufferPx = 200;
        this.nzVirtualMinBufferPx = 100;
        this.nzVirtualForTrackBy = (/**
         * @param {?} index
         * @return {?}
         */
        function (index) { return index; });
        this.nzLoadingDelay = 0;
        this.nzPageIndex = 1;
        this.nzPageSize = 10;
        this.nzTotal = 0;
        this.nzWidthConfig = [];
        this.nzData = [];
        this.nzPaginationPosition = 'bottom';
        this.nzScroll = { x: null, y: null };
        this.nzFrontPagination = true;
        this.nzTemplateMode = false;
        this.nzShowPagination = true;
        this.nzLoading = false;
        this.nzLoadingIndicator = null;
        this.nzBordered = false;
        this.nzSize = 'default';
        this.nzShowSizeChanger = false;
        this.nzHideOnSinglePage = false;
        this.nzShowQuickJumper = false;
        this.nzSimple = false;
        this.nzPageSizeChange = new EventEmitter();
        this.nzPageIndexChange = new EventEmitter();
        this.nzQueryParams = new EventEmitter();
        this.nzCurrentPageDataChange = new EventEmitter();
        /**
         * public data for ngFor tr
         */
        this.data = [];
        this.scrollX = null;
        this.scrollY = null;
        this.theadTemplate = null;
        this.listOfAutoColWidth = [];
        this.listOfManualColWidth = [];
        this.hasFixLeft = false;
        this.hasFixRight = false;
        this.destroy$ = new Subject();
        this.loading$ = new BehaviorSubject(false);
        this.templateMode$ = new BehaviorSubject(false);
        this.verticalScrollBarWidth = 0;
        this.nzConfigService
            .getConfigChangeEventForComponent(NZ_CONFIG_COMPONENT_NAME)
            .pipe(takeUntil(this.destroy$))
            .subscribe((/**
         * @return {?}
         */
        function () {
            _this.cdr.markForCheck();
        }));
    }
    /**
     * @param {?} size
     * @return {?}
     */
    NzTableComponent.prototype.onPageSizeChange = /**
     * @param {?} size
     * @return {?}
     */
    function (size) {
        this.nzTableDataService.updatePageSize(size);
    };
    /**
     * @param {?} index
     * @return {?}
     */
    NzTableComponent.prototype.onPageIndexChange = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        this.nzTableDataService.updatePageIndex(index);
    };
    /**
     * @return {?}
     */
    NzTableComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        var _a = this.nzTableDataService, pageIndexDistinct$ = _a.pageIndexDistinct$, pageSizeDistinct$ = _a.pageSizeDistinct$, listOfCurrentPageData$ = _a.listOfCurrentPageData$, total$ = _a.total$, queryParams$ = _a.queryParams$;
        var _b = this.nzTableStyleService, theadTemplate$ = _b.theadTemplate$, hasFixLeft$ = _b.hasFixLeft$, hasFixRight$ = _b.hasFixRight$;
        queryParams$.pipe(takeUntil(this.destroy$)).subscribe(this.nzQueryParams);
        pageIndexDistinct$.pipe(takeUntil(this.destroy$)).subscribe((/**
         * @param {?} pageIndex
         * @return {?}
         */
        function (pageIndex) {
            if (pageIndex !== _this.nzPageIndex) {
                _this.nzPageIndex = pageIndex;
                _this.nzPageIndexChange.next(pageIndex);
            }
        }));
        pageSizeDistinct$.pipe(takeUntil(this.destroy$)).subscribe((/**
         * @param {?} pageSize
         * @return {?}
         */
        function (pageSize) {
            if (pageSize !== _this.nzPageSize) {
                _this.nzPageSize = pageSize;
                _this.nzPageSizeChange.next(pageSize);
            }
        }));
        total$
            .pipe(takeUntil(this.destroy$), filter((/**
         * @return {?}
         */
        function () { return _this.nzFrontPagination; })))
            .subscribe((/**
         * @param {?} total
         * @return {?}
         */
        function (total) {
            if (total !== _this.nzTotal) {
                _this.nzTotal = total;
                _this.cdr.markForCheck();
            }
        }));
        listOfCurrentPageData$.pipe(takeUntil(this.destroy$)).subscribe((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            _this.data = data;
            _this.nzCurrentPageDataChange.next(data);
            _this.cdr.markForCheck();
        }));
        theadTemplate$.pipe(takeUntil(this.destroy$)).subscribe((/**
         * @param {?} theadTemplate
         * @return {?}
         */
        function (theadTemplate) {
            _this.theadTemplate = theadTemplate;
            _this.cdr.markForCheck();
        }));
        hasFixLeft$.pipe(takeUntil(this.destroy$)).subscribe((/**
         * @param {?} hasFixLeft
         * @return {?}
         */
        function (hasFixLeft) {
            _this.hasFixLeft = hasFixLeft;
            _this.cdr.markForCheck();
        }));
        hasFixRight$.pipe(takeUntil(this.destroy$)).subscribe((/**
         * @param {?} hasFixRight
         * @return {?}
         */
        function (hasFixRight) {
            _this.hasFixRight = hasFixRight;
            _this.cdr.markForCheck();
        }));
        combineLatest([total$, this.loading$, this.templateMode$])
            .pipe(map((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = __read(_a, 3), total = _b[0], loading = _b[1], templateMode = _b[2];
            return total === 0 && !loading && !templateMode;
        })), takeUntil(this.destroy$))
            .subscribe((/**
         * @param {?} empty
         * @return {?}
         */
        function (empty) {
            _this.nzTableStyleService.setShowEmpty(empty);
        }));
        this.verticalScrollBarWidth = measureScrollbar('vertical');
        this.nzTableStyleService.listOfListOfThWidthPx$.pipe(takeUntil(this.destroy$)).subscribe((/**
         * @param {?} listOfWidth
         * @return {?}
         */
        function (listOfWidth) {
            _this.listOfAutoColWidth = listOfWidth;
            _this.cdr.markForCheck();
        }));
        this.nzTableStyleService.manualWidthConfigPx$.pipe(takeUntil(this.destroy$)).subscribe((/**
         * @param {?} listOfWidth
         * @return {?}
         */
        function (listOfWidth) {
            _this.listOfManualColWidth = listOfWidth;
            _this.cdr.markForCheck();
        }));
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    NzTableComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var nzScroll = changes.nzScroll, nzPageIndex = changes.nzPageIndex, nzPageSize = changes.nzPageSize, nzFrontPagination = changes.nzFrontPagination, nzData = changes.nzData, nzWidthConfig = changes.nzWidthConfig, nzNoResult = changes.nzNoResult, nzLoading = changes.nzLoading, nzTemplateMode = changes.nzTemplateMode;
        if (nzPageIndex) {
            this.nzTableDataService.updatePageIndex(this.nzPageIndex);
        }
        if (nzPageSize) {
            this.nzTableDataService.updatePageSize(this.nzPageSize);
        }
        if (nzData) {
            this.nzData = this.nzData || [];
            this.nzTableDataService.updateListOfData(this.nzData);
        }
        if (nzFrontPagination) {
            this.nzTableDataService.updateFrontPagination(this.nzFrontPagination);
        }
        if (nzScroll) {
            this.scrollX = (this.nzScroll && this.nzScroll.x) || null;
            this.scrollY = (this.nzScroll && this.nzScroll.y) || null;
            this.nzTableStyleService.setScroll(this.scrollX, this.scrollY);
        }
        if (nzWidthConfig) {
            this.nzTableStyleService.setTableWidthConfig(this.nzWidthConfig);
        }
        if (nzLoading) {
            this.loading$.next(this.nzLoading);
        }
        if (nzTemplateMode) {
            this.templateMode$.next(this.nzTemplateMode);
        }
        if (nzNoResult) {
            this.nzTableStyleService.setNoResult(this.nzNoResult);
        }
    };
    /**
     * @return {?}
     */
    NzTableComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.nzResizeObserver
            .observe(this.elementRef)
            .pipe(map((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = __read(_a, 1), entry = _b[0];
            var width = entry.target.getBoundingClientRect().width;
            /** @type {?} */
            var scrollBarWidth = _this.scrollY ? _this.verticalScrollBarWidth : 0;
            return Math.floor(width - scrollBarWidth);
        })), takeUntil(this.destroy$))
            .subscribe(this.nzTableStyleService.hostWidth$);
        if (this.nzTableInnerScrollComponent && this.nzTableInnerScrollComponent.cdkVirtualScrollViewport) {
            this.cdkVirtualScrollViewport = this.nzTableInnerScrollComponent.cdkVirtualScrollViewport;
        }
    };
    /**
     * @return {?}
     */
    NzTableComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.destroy$.next();
        this.destroy$.complete();
    };
    NzTableComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nz-table',
                    exportAs: 'nzTable',
                    providers: [NzTableStyleService, NzTableDataService],
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    template: "\n    <nz-spin [nzDelay]=\"nzLoadingDelay\" [nzSpinning]=\"nzLoading\" [nzIndicator]=\"nzLoadingIndicator\">\n      <ng-container *ngIf=\"nzPaginationPosition === 'both' || nzPaginationPosition === 'top'\">\n        <ng-template [ngTemplateOutlet]=\"paginationTemplate\"></ng-template>\n      </ng-container>\n      <div\n        #tableMainElement\n        class=\"ant-table\"\n        [class.ant-table-fixed-header]=\"nzData.length && scrollY\"\n        [class.ant-table-fixed-column]=\"scrollX\"\n        [class.ant-table-has-fix-left]=\"hasFixLeft\"\n        [class.ant-table-has-fix-right]=\"hasFixRight\"\n        [class.ant-table-bordered]=\"nzBordered\"\n        [class.ant-table-middle]=\"nzSize === 'middle'\"\n        [class.ant-table-small]=\"nzSize === 'small'\"\n      >\n        <nz-table-title-footer [title]=\"nzTitle\" *ngIf=\"nzTitle\"></nz-table-title-footer>\n        <nz-table-inner-scroll\n          *ngIf=\"scrollY || scrollX; else defaultTemplate\"\n          [data]=\"data\"\n          [scrollX]=\"scrollX\"\n          [scrollY]=\"scrollY\"\n          [contentTemplate]=\"contentTemplate\"\n          [listOfColWidth]=\"listOfAutoColWidth\"\n          [theadTemplate]=\"theadTemplate\"\n          [verticalScrollBarWidth]=\"verticalScrollBarWidth\"\n          [virtualTemplate]=\"nzVirtualScrollDirective ? nzVirtualScrollDirective.templateRef : null\"\n          [virtualItemSize]=\"nzVirtualItemSize\"\n          [virtualMaxBufferPx]=\"nzVirtualMaxBufferPx\"\n          [virtualMinBufferPx]=\"nzVirtualMinBufferPx\"\n          [tableMainElement]=\"tableMainElement\"\n          [virtualForTrackBy]=\"nzVirtualForTrackBy\"\n        ></nz-table-inner-scroll>\n        <ng-template #defaultTemplate>\n          <nz-table-inner-default\n            [tableLayout]=\"nzTableLayout\"\n            [listOfColWidth]=\"listOfManualColWidth\"\n            [theadTemplate]=\"theadTemplate\"\n            [contentTemplate]=\"contentTemplate\"\n          ></nz-table-inner-default>\n        </ng-template>\n        <nz-table-title-footer [footer]=\"nzFooter\" *ngIf=\"nzFooter\"></nz-table-title-footer>\n      </div>\n      <ng-container *ngIf=\"nzPaginationPosition === 'both' || nzPaginationPosition === 'bottom'\">\n        <ng-template [ngTemplateOutlet]=\"paginationTemplate\"></ng-template>\n      </ng-container>\n    </nz-spin>\n    <ng-template #paginationTemplate>\n      <nz-pagination\n        *ngIf=\"nzShowPagination && data.length\"\n        class=\"ant-table-pagination ant-table-pagination-right\"\n        [nzShowSizeChanger]=\"nzShowSizeChanger\"\n        [nzPageSizeOptions]=\"nzPageSizeOptions\"\n        [nzItemRender]=\"nzItemRender!\"\n        [nzShowQuickJumper]=\"nzShowQuickJumper\"\n        [nzHideOnSinglePage]=\"nzHideOnSinglePage\"\n        [nzShowTotal]=\"nzShowTotal\"\n        [nzSize]=\"nzSize === 'default' ? 'default' : 'small'\"\n        [nzPageSize]=\"nzPageSize\"\n        [nzTotal]=\"nzTotal\"\n        [nzSimple]=\"nzSimple\"\n        [nzPageIndex]=\"nzPageIndex\"\n        (nzPageSizeChange)=\"onPageSizeChange($event)\"\n        (nzPageIndexChange)=\"onPageIndexChange($event)\"\n      >\n      </nz-pagination>\n    </ng-template>\n    <ng-template #contentTemplate>\n      <ng-content></ng-content>\n    </ng-template>\n  ",
                    host: {
                        '[class.ant-table-wrapper]': 'true'
                    }
                }] }
    ];
    /** @nocollapse */
    NzTableComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NzResizeObserver },
        { type: NzConfigService },
        { type: ChangeDetectorRef },
        { type: NzTableStyleService },
        { type: NzTableDataService }
    ]; };
    NzTableComponent.propDecorators = {
        nzTableLayout: [{ type: Input }],
        nzShowTotal: [{ type: Input }],
        nzItemRender: [{ type: Input }],
        nzTitle: [{ type: Input }],
        nzFooter: [{ type: Input }],
        nzNoResult: [{ type: Input }],
        nzPageSizeOptions: [{ type: Input }],
        nzVirtualItemSize: [{ type: Input }],
        nzVirtualMaxBufferPx: [{ type: Input }],
        nzVirtualMinBufferPx: [{ type: Input }],
        nzVirtualForTrackBy: [{ type: Input }],
        nzLoadingDelay: [{ type: Input }],
        nzPageIndex: [{ type: Input }],
        nzPageSize: [{ type: Input }],
        nzTotal: [{ type: Input }],
        nzWidthConfig: [{ type: Input }],
        nzData: [{ type: Input }],
        nzPaginationPosition: [{ type: Input }],
        nzScroll: [{ type: Input }],
        nzFrontPagination: [{ type: Input }],
        nzTemplateMode: [{ type: Input }],
        nzShowPagination: [{ type: Input }],
        nzLoading: [{ type: Input }],
        nzLoadingIndicator: [{ type: Input }],
        nzBordered: [{ type: Input }],
        nzSize: [{ type: Input }],
        nzShowSizeChanger: [{ type: Input }],
        nzHideOnSinglePage: [{ type: Input }],
        nzShowQuickJumper: [{ type: Input }],
        nzSimple: [{ type: Input }],
        nzPageSizeChange: [{ type: Output }],
        nzPageIndexChange: [{ type: Output }],
        nzQueryParams: [{ type: Output }],
        nzCurrentPageDataChange: [{ type: Output }],
        nzVirtualScrollDirective: [{ type: ContentChild, args: [NzTableVirtualScrollDirective, { static: false },] }],
        nzTableInnerScrollComponent: [{ type: ViewChild, args: [NzTableInnerScrollComponent,] }]
    };
    __decorate([
        InputBoolean(),
        __metadata("design:type", Object)
    ], NzTableComponent.prototype, "nzFrontPagination", void 0);
    __decorate([
        InputBoolean(),
        __metadata("design:type", Object)
    ], NzTableComponent.prototype, "nzTemplateMode", void 0);
    __decorate([
        InputBoolean(),
        __metadata("design:type", Object)
    ], NzTableComponent.prototype, "nzShowPagination", void 0);
    __decorate([
        InputBoolean(),
        __metadata("design:type", Object)
    ], NzTableComponent.prototype, "nzLoading", void 0);
    __decorate([
        WithConfig(NZ_CONFIG_COMPONENT_NAME),
        __metadata("design:type", Object)
    ], NzTableComponent.prototype, "nzLoadingIndicator", void 0);
    __decorate([
        WithConfig(NZ_CONFIG_COMPONENT_NAME), InputBoolean(),
        __metadata("design:type", Boolean)
    ], NzTableComponent.prototype, "nzBordered", void 0);
    __decorate([
        WithConfig(NZ_CONFIG_COMPONENT_NAME),
        __metadata("design:type", String)
    ], NzTableComponent.prototype, "nzSize", void 0);
    __decorate([
        WithConfig(NZ_CONFIG_COMPONENT_NAME), InputBoolean(),
        __metadata("design:type", Boolean)
    ], NzTableComponent.prototype, "nzShowSizeChanger", void 0);
    __decorate([
        WithConfig(NZ_CONFIG_COMPONENT_NAME), InputBoolean(),
        __metadata("design:type", Boolean)
    ], NzTableComponent.prototype, "nzHideOnSinglePage", void 0);
    __decorate([
        WithConfig(NZ_CONFIG_COMPONENT_NAME), InputBoolean(),
        __metadata("design:type", Boolean)
    ], NzTableComponent.prototype, "nzShowQuickJumper", void 0);
    __decorate([
        WithConfig(NZ_CONFIG_COMPONENT_NAME), InputBoolean(),
        __metadata("design:type", Boolean)
    ], NzTableComponent.prototype, "nzSimple", void 0);
    return NzTableComponent;
}());
if (false) {
    /** @type {?} */
    NzTableComponent.ngAcceptInputType_nzFrontPagination;
    /** @type {?} */
    NzTableComponent.ngAcceptInputType_nzTemplateMode;
    /** @type {?} */
    NzTableComponent.ngAcceptInputType_nzShowPagination;
    /** @type {?} */
    NzTableComponent.ngAcceptInputType_nzLoading;
    /** @type {?} */
    NzTableComponent.ngAcceptInputType_nzBordered;
    /** @type {?} */
    NzTableComponent.ngAcceptInputType_nzShowSizeChanger;
    /** @type {?} */
    NzTableComponent.ngAcceptInputType_nzHideOnSinglePage;
    /** @type {?} */
    NzTableComponent.ngAcceptInputType_nzShowQuickJumper;
    /** @type {?} */
    NzTableComponent.ngAcceptInputType_nzSimple;
    /** @type {?} */
    NzTableComponent.prototype.nzTableLayout;
    /** @type {?} */
    NzTableComponent.prototype.nzShowTotal;
    /** @type {?} */
    NzTableComponent.prototype.nzItemRender;
    /** @type {?} */
    NzTableComponent.prototype.nzTitle;
    /** @type {?} */
    NzTableComponent.prototype.nzFooter;
    /** @type {?} */
    NzTableComponent.prototype.nzNoResult;
    /** @type {?} */
    NzTableComponent.prototype.nzPageSizeOptions;
    /** @type {?} */
    NzTableComponent.prototype.nzVirtualItemSize;
    /** @type {?} */
    NzTableComponent.prototype.nzVirtualMaxBufferPx;
    /** @type {?} */
    NzTableComponent.prototype.nzVirtualMinBufferPx;
    /** @type {?} */
    NzTableComponent.prototype.nzVirtualForTrackBy;
    /** @type {?} */
    NzTableComponent.prototype.nzLoadingDelay;
    /** @type {?} */
    NzTableComponent.prototype.nzPageIndex;
    /** @type {?} */
    NzTableComponent.prototype.nzPageSize;
    /** @type {?} */
    NzTableComponent.prototype.nzTotal;
    /** @type {?} */
    NzTableComponent.prototype.nzWidthConfig;
    /** @type {?} */
    NzTableComponent.prototype.nzData;
    /** @type {?} */
    NzTableComponent.prototype.nzPaginationPosition;
    /** @type {?} */
    NzTableComponent.prototype.nzScroll;
    /** @type {?} */
    NzTableComponent.prototype.nzFrontPagination;
    /** @type {?} */
    NzTableComponent.prototype.nzTemplateMode;
    /** @type {?} */
    NzTableComponent.prototype.nzShowPagination;
    /** @type {?} */
    NzTableComponent.prototype.nzLoading;
    /** @type {?} */
    NzTableComponent.prototype.nzLoadingIndicator;
    /** @type {?} */
    NzTableComponent.prototype.nzBordered;
    /** @type {?} */
    NzTableComponent.prototype.nzSize;
    /** @type {?} */
    NzTableComponent.prototype.nzShowSizeChanger;
    /** @type {?} */
    NzTableComponent.prototype.nzHideOnSinglePage;
    /** @type {?} */
    NzTableComponent.prototype.nzShowQuickJumper;
    /** @type {?} */
    NzTableComponent.prototype.nzSimple;
    /** @type {?} */
    NzTableComponent.prototype.nzPageSizeChange;
    /** @type {?} */
    NzTableComponent.prototype.nzPageIndexChange;
    /** @type {?} */
    NzTableComponent.prototype.nzQueryParams;
    /** @type {?} */
    NzTableComponent.prototype.nzCurrentPageDataChange;
    /**
     * public data for ngFor tr
     * @type {?}
     */
    NzTableComponent.prototype.data;
    /** @type {?} */
    NzTableComponent.prototype.cdkVirtualScrollViewport;
    /** @type {?} */
    NzTableComponent.prototype.scrollX;
    /** @type {?} */
    NzTableComponent.prototype.scrollY;
    /** @type {?} */
    NzTableComponent.prototype.theadTemplate;
    /** @type {?} */
    NzTableComponent.prototype.listOfAutoColWidth;
    /** @type {?} */
    NzTableComponent.prototype.listOfManualColWidth;
    /** @type {?} */
    NzTableComponent.prototype.hasFixLeft;
    /** @type {?} */
    NzTableComponent.prototype.hasFixRight;
    /**
     * @type {?}
     * @private
     */
    NzTableComponent.prototype.destroy$;
    /**
     * @type {?}
     * @private
     */
    NzTableComponent.prototype.loading$;
    /**
     * @type {?}
     * @private
     */
    NzTableComponent.prototype.templateMode$;
    /** @type {?} */
    NzTableComponent.prototype.nzVirtualScrollDirective;
    /** @type {?} */
    NzTableComponent.prototype.nzTableInnerScrollComponent;
    /** @type {?} */
    NzTableComponent.prototype.verticalScrollBarWidth;
    /**
     * @type {?}
     * @private
     */
    NzTableComponent.prototype.elementRef;
    /**
     * @type {?}
     * @private
     */
    NzTableComponent.prototype.nzResizeObserver;
    /**
     * @type {?}
     * @private
     */
    NzTableComponent.prototype.nzConfigService;
    /**
     * @type {?}
     * @private
     */
    NzTableComponent.prototype.cdr;
    /**
     * @type {?}
     * @private
     */
    NzTableComponent.prototype.nzTableStyleService;
    /**
     * @type {?}
     * @private
     */
    NzTableComponent.prototype.nzTableDataService;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/table/tbody.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NzTbodyComponent = /** @class */ (function () {
    function NzTbodyComponent(nzTableStyleService) {
        this.nzTableStyleService = nzTableStyleService;
        this.isInsideTable = false;
        this.showEmpty$ = new BehaviorSubject(false);
        this.noResult$ = new BehaviorSubject(undefined);
        this.listOfMeasureColumn$ = new BehaviorSubject([]);
        this.isInsideTable = !!this.nzTableStyleService;
        if (this.nzTableStyleService) {
            var _a = this.nzTableStyleService, showEmpty$ = _a.showEmpty$, noResult$ = _a.noResult$, listOfMeasureColumn$ = _a.listOfMeasureColumn$;
            noResult$.subscribe(this.noResult$);
            listOfMeasureColumn$.subscribe(this.listOfMeasureColumn$);
            showEmpty$.subscribe(this.showEmpty$);
        }
    }
    /**
     * @param {?} listOfAutoWidth
     * @return {?}
     */
    NzTbodyComponent.prototype.onListOfAutoWidthChange = /**
     * @param {?} listOfAutoWidth
     * @return {?}
     */
    function (listOfAutoWidth) {
        this.nzTableStyleService.setListOfAutoWidth(listOfAutoWidth);
    };
    NzTbodyComponent.decorators = [
        { type: Component, args: [{
                    selector: 'tbody',
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    template: "\n    <ng-container *ngIf=\"listOfMeasureColumn$ | async as listOfMeasureColumn\">\n      <tr\n        nz-table-measure-row\n        *ngIf=\"isInsideTable && listOfMeasureColumn.length\"\n        [listOfMeasureColumn]=\"listOfMeasureColumn\"\n        (listOfAutoWidth)=\"onListOfAutoWidthChange($event)\"\n      ></tr>\n    </ng-container>\n    <ng-content></ng-content>\n    <tr class=\"ant-table-placeholder\" nz-table-fixed-row *ngIf=\"showEmpty$ | async\">\n      <nz-embed-empty nzComponentName=\"table\" [specificContent]=\"(noResult$ | async)!\"></nz-embed-empty>\n    </tr>\n  ",
                    host: {
                        '[class.ant-table-tbody]': 'isInsideTable'
                    }
                }] }
    ];
    /** @nocollapse */
    NzTbodyComponent.ctorParameters = function () { return [
        { type: NzTableStyleService, decorators: [{ type: Optional }] }
    ]; };
    return NzTbodyComponent;
}());
if (false) {
    /** @type {?} */
    NzTbodyComponent.prototype.isInsideTable;
    /** @type {?} */
    NzTbodyComponent.prototype.showEmpty$;
    /** @type {?} */
    NzTbodyComponent.prototype.noResult$;
    /** @type {?} */
    NzTbodyComponent.prototype.listOfMeasureColumn$;
    /**
     * @type {?}
     * @private
     */
    NzTbodyComponent.prototype.nzTableStyleService;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/table/tr.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NzTrDirective = /** @class */ (function () {
    function NzTrDirective(nzTableStyleService) {
        var _this = this;
        this.nzTableStyleService = nzTableStyleService;
        this.destroy$ = new Subject();
        this.listOfFixedColumns$ = new ReplaySubject(1);
        this.listOfColumns$ = new ReplaySubject(1);
        this.listOfFixedColumnsChanges$ = this.listOfFixedColumns$.pipe(switchMap((/**
         * @param {?} list
         * @return {?}
         */
        function (list) {
            return merge.apply(void 0, __spread([_this.listOfFixedColumns$], list.map((/**
             * @param {?} c
             * @return {?}
             */
            function (c) { return c.changes$; })))).pipe(flatMap((/**
             * @return {?}
             */
            function () { return _this.listOfFixedColumns$; })));
        })), takeUntil(this.destroy$));
        this.listOfFixedLeftColumnChanges$ = this.listOfFixedColumnsChanges$.pipe(map((/**
         * @param {?} list
         * @return {?}
         */
        function (list) { return list.filter((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return item.nzLeft !== false; })); })));
        this.listOfFixedRightColumnChanges$ = this.listOfFixedColumnsChanges$.pipe(map((/**
         * @param {?} list
         * @return {?}
         */
        function (list) { return list.filter((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return item.nzRight !== false; })); })));
        this.listOfColumnsChanges$ = this.listOfColumns$.pipe(switchMap((/**
         * @param {?} list
         * @return {?}
         */
        function (list) {
            return merge.apply(void 0, __spread([_this.listOfColumns$], list.map((/**
             * @param {?} c
             * @return {?}
             */
            function (c) { return c.changes$; })))).pipe(flatMap((/**
             * @return {?}
             */
            function () { return _this.listOfColumns$; })));
        })), takeUntil(this.destroy$));
        this.isInsideTable = false;
        this.isInsideTable = !!nzTableStyleService;
    }
    /**
     * @return {?}
     */
    NzTrDirective.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        if (this.nzTableStyleService) {
            this.listOfCellFixedDirective.changes
                .pipe(startWith(this.listOfCellFixedDirective), takeUntil(this.destroy$))
                .subscribe(this.listOfFixedColumns$);
            this.listOfNzThDirective.changes.pipe(startWith(this.listOfNzThDirective), takeUntil(this.destroy$)).subscribe(this.listOfColumns$);
            /** set last left and first right **/
            this.listOfFixedLeftColumnChanges$.subscribe((/**
             * @param {?} listOfFixedLeft
             * @return {?}
             */
            function (listOfFixedLeft) {
                listOfFixedLeft.forEach((/**
                 * @param {?} cell
                 * @return {?}
                 */
                function (cell) { return cell.setIsLastLeft(cell === listOfFixedLeft[listOfFixedLeft.length - 1]); }));
            }));
            this.listOfFixedRightColumnChanges$.subscribe((/**
             * @param {?} listOfFixedRight
             * @return {?}
             */
            function (listOfFixedRight) {
                listOfFixedRight.forEach((/**
                 * @param {?} cell
                 * @return {?}
                 */
                function (cell) { return cell.setIsFirstRight(cell === listOfFixedRight[0]); }));
            }));
            /** calculate fixed nzLeft and nzRight **/
            combineLatest([this.nzTableStyleService.listOfListOfThWidth$, this.listOfFixedLeftColumnChanges$]).subscribe((/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var _b = __read(_a, 2), listOfAutoWidth = _b[0], listOfLeftCell = _b[1];
                listOfLeftCell.forEach((/**
                 * @param {?} cell
                 * @param {?} index
                 * @return {?}
                 */
                function (cell, index) {
                    if (cell.isAutoLeft) {
                        /** @type {?} */
                        var currentArray = listOfLeftCell.slice(0, index);
                        /** @type {?} */
                        var count = currentArray.reduce((/**
                         * @param {?} pre
                         * @param {?} cur
                         * @return {?}
                         */
                        function (pre, cur) { return pre + (cur.colspan || cur.colSpan || 1); }), 0);
                        /** @type {?} */
                        var width = listOfAutoWidth.slice(0, count).reduce((/**
                         * @param {?} pre
                         * @param {?} cur
                         * @return {?}
                         */
                        function (pre, cur) { return pre + cur; }), 0);
                        cell.setAutoLeftWidth(width + "px");
                    }
                }));
            }));
            combineLatest([this.nzTableStyleService.listOfListOfThWidth$, this.listOfFixedRightColumnChanges$]).subscribe((/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var _b = __read(_a, 2), listOfAutoWidth = _b[0], listOfRightCell = _b[1];
                listOfRightCell.forEach((/**
                 * @param {?} _
                 * @param {?} index
                 * @return {?}
                 */
                function (_, index) {
                    /** @type {?} */
                    var cell = listOfRightCell[listOfRightCell.length - index - 1];
                    if (cell.isAutoRight) {
                        /** @type {?} */
                        var currentArray = listOfRightCell.slice(listOfRightCell.length - index, listOfRightCell.length);
                        /** @type {?} */
                        var count = currentArray.reduce((/**
                         * @param {?} pre
                         * @param {?} cur
                         * @return {?}
                         */
                        function (pre, cur) { return pre + (cur.colspan || cur.colSpan || 1); }), 0);
                        /** @type {?} */
                        var width = listOfAutoWidth
                            .slice(listOfAutoWidth.length - count, listOfAutoWidth.length)
                            .reduce((/**
                         * @param {?} pre
                         * @param {?} cur
                         * @return {?}
                         */
                        function (pre, cur) { return pre + cur; }), 0);
                        cell.setAutoRightWidth(width + "px");
                    }
                }));
            }));
        }
    };
    /**
     * @return {?}
     */
    NzTrDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.destroy$.next();
        this.destroy$.complete();
    };
    NzTrDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'tr:not([mat-row]):not([mat-header-row]):not([nz-table-measure-row]):not([nzExpand]):not([nz-table-fixed-row])',
                    host: {
                        '[class.ant-table-row]': 'isInsideTable'
                    }
                },] }
    ];
    /** @nocollapse */
    NzTrDirective.ctorParameters = function () { return [
        { type: NzTableStyleService, decorators: [{ type: Optional }] }
    ]; };
    NzTrDirective.propDecorators = {
        listOfNzThDirective: [{ type: ContentChildren, args: [NzThMeasureDirective,] }],
        listOfCellFixedDirective: [{ type: ContentChildren, args: [NzCellFixedDirective,] }]
    };
    return NzTrDirective;
}());
if (false) {
    /** @type {?} */
    NzTrDirective.prototype.listOfNzThDirective;
    /** @type {?} */
    NzTrDirective.prototype.listOfCellFixedDirective;
    /**
     * @type {?}
     * @private
     */
    NzTrDirective.prototype.destroy$;
    /**
     * @type {?}
     * @private
     */
    NzTrDirective.prototype.listOfFixedColumns$;
    /**
     * @type {?}
     * @private
     */
    NzTrDirective.prototype.listOfColumns$;
    /** @type {?} */
    NzTrDirective.prototype.listOfFixedColumnsChanges$;
    /** @type {?} */
    NzTrDirective.prototype.listOfFixedLeftColumnChanges$;
    /** @type {?} */
    NzTrDirective.prototype.listOfFixedRightColumnChanges$;
    /** @type {?} */
    NzTrDirective.prototype.listOfColumnsChanges$;
    /** @type {?} */
    NzTrDirective.prototype.isInsideTable;
    /**
     * @type {?}
     * @private
     */
    NzTrDirective.prototype.nzTableStyleService;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/table/thead.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NzTheadComponent = /** @class */ (function () {
    function NzTheadComponent(elementRef, renderer, nzTableStyleService, nzTableDataService) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.nzTableStyleService = nzTableStyleService;
        this.nzTableDataService = nzTableDataService;
        this.destroy$ = new Subject();
        this.isInsideTable = false;
        /**
         * @deprecated use nzSortFn and nzSortPriority instead *
         */
        this.nzSingleSort = false;
        /**
         * @deprecated use nzSortOrderChange instead *
         */
        this.nzSortChange = new EventEmitter();
        this.nzSortOrderChange = new EventEmitter();
        this.isInsideTable = !!this.nzTableStyleService;
    }
    /**
     * @return {?}
     */
    NzTheadComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (this.nzTableStyleService) {
            this.nzTableStyleService.setTheadTemplate(this.templateRef);
        }
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    NzTheadComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var nzSingleSort = changes.nzSingleSort;
        if (nzSingleSort) {
            warnDeprecation("'nzSingleSort' is deprecated and will be removed in 10.0.0. Please use 'nzSortFn' and 'nzSortPriority' instead.");
        }
    };
    /**
     * @return {?}
     */
    NzTheadComponent.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.nzTableStyleService) {
            /** @type {?} */
            var firstTableRow$ = (/** @type {?} */ (this.listOfNzTrDirective.changes.pipe(startWith(this.listOfNzTrDirective), map((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return item && item.first; })))));
            /** @type {?} */
            var listOfColumnsChanges$_1 = firstTableRow$.pipe(switchMap((/**
             * @param {?} firstTableRow
             * @return {?}
             */
            function (firstTableRow) { return (firstTableRow ? firstTableRow.listOfColumnsChanges$ : EMPTY); })), takeUntil(this.destroy$));
            listOfColumnsChanges$_1.subscribe((/**
             * @param {?} data
             * @return {?}
             */
            function (data) { return _this.nzTableStyleService.setListOfTh(data); }));
            /** TODO: need reset the measure row when scrollX change **/
            this.nzTableStyleService.enableAutoMeasure$
                .pipe(switchMap((/**
             * @param {?} enable
             * @return {?}
             */
            function (enable) { return (enable ? listOfColumnsChanges$_1 : of([])); })))
                .pipe(takeUntil(this.destroy$))
                .subscribe((/**
             * @param {?} data
             * @return {?}
             */
            function (data) { return _this.nzTableStyleService.setListOfMeasureColumn(data); }));
            /** @type {?} */
            var listOfFixedLeftColumnChanges$ = firstTableRow$.pipe(switchMap((/**
             * @param {?} firstTr
             * @return {?}
             */
            function (firstTr) { return (firstTr ? firstTr.listOfFixedLeftColumnChanges$ : EMPTY); })), takeUntil(this.destroy$));
            /** @type {?} */
            var listOfFixedRightColumnChanges$ = firstTableRow$.pipe(switchMap((/**
             * @param {?} firstTr
             * @return {?}
             */
            function (firstTr) { return (firstTr ? firstTr.listOfFixedRightColumnChanges$ : EMPTY); })), takeUntil(this.destroy$));
            listOfFixedLeftColumnChanges$.subscribe((/**
             * @param {?} listOfFixedLeftColumn
             * @return {?}
             */
            function (listOfFixedLeftColumn) {
                _this.nzTableStyleService.setHasFixLeft(listOfFixedLeftColumn.length !== 0);
            }));
            listOfFixedRightColumnChanges$.subscribe((/**
             * @param {?} listOfFixedRightColumn
             * @return {?}
             */
            function (listOfFixedRightColumn) {
                _this.nzTableStyleService.setHasFixRight(listOfFixedRightColumn.length !== 0);
            }));
        }
        if (this.nzTableDataService) {
            /** @type {?} */
            var listOfColumn$_1 = (/** @type {?} */ (this.listOfNzThAddOnComponent.changes.pipe(startWith(this.listOfNzThAddOnComponent))));
            /** @type {?} */
            var manualSort$ = listOfColumn$_1.pipe(switchMap((/**
             * @return {?}
             */
            function () { return merge.apply(void 0, __spread(_this.listOfNzThAddOnComponent.map((/**
             * @param {?} th
             * @return {?}
             */
            function (th) { return th.manualClickOrder$; })))); })), takeUntil(this.destroy$));
            manualSort$.subscribe((/**
             * @param {?} data
             * @return {?}
             */
            function (data) {
                /** @type {?} */
                var emitValue = { key: data.nzColumnKey, value: data.sortOrder };
                _this.nzSortChange.emit(emitValue);
                _this.nzSortOrderChange.emit(emitValue);
                if (_this.nzSingleSort || (data.nzSortFn && data.nzSortPriority === false)) {
                    _this.listOfNzThAddOnComponent.filter((/**
                     * @param {?} th
                     * @return {?}
                     */
                    function (th) { return th !== data; })).forEach((/**
                     * @param {?} th
                     * @return {?}
                     */
                    function (th) { return th.clearSortOrder(); }));
                }
            }));
            /** @type {?} */
            var listOfCalcOperator$ = listOfColumn$_1.pipe(switchMap((/**
             * @param {?} list
             * @return {?}
             */
            function (list) {
                return merge.apply(void 0, __spread([listOfColumn$_1], list.map((/**
                 * @param {?} c
                 * @return {?}
                 */
                function (c) { return c.calcOperatorChange$; })))).pipe(flatMap((/**
                 * @return {?}
                 */
                function () { return listOfColumn$_1; })));
            })), map((/**
             * @param {?} list
             * @return {?}
             */
            function (list) {
                return list
                    .filter((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) { return !!item.nzSortFn || !!item.nzFilterFn; }))
                    .map((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) {
                    var nzSortFn = item.nzSortFn, sortOrder = item.sortOrder, nzFilterFn = item.nzFilterFn, nzFilterValue = item.nzFilterValue, nzSortPriority = item.nzSortPriority, nzColumnKey = item.nzColumnKey;
                    return {
                        key: nzColumnKey,
                        sortFn: nzSortFn,
                        sortPriority: nzSortPriority,
                        sortOrder: (/** @type {?} */ (sortOrder)),
                        filterFn: (/** @type {?} */ (nzFilterFn)),
                        filterValue: nzFilterValue
                    };
                }));
            })), 
            // TODO: after checked error here
            delay(0));
            listOfCalcOperator$.subscribe((/**
             * @param {?} list
             * @return {?}
             */
            function (list) {
                _this.nzTableDataService.listOfCalcOperator$.next(list);
            }));
        }
    };
    /**
     * @return {?}
     */
    NzTheadComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        if (this.nzTableStyleService) {
            this.renderer.removeChild(this.renderer.parentNode(this.elementRef.nativeElement), this.elementRef.nativeElement);
        }
    };
    /**
     * @return {?}
     */
    NzTheadComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.destroy$.next();
        this.destroy$.complete();
    };
    NzTheadComponent.decorators = [
        { type: Component, args: [{
                    selector: 'thead:not(.ant-table-thead)',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    template: "\n    <ng-template #contentTemplate>\n      <ng-content></ng-content>\n    </ng-template>\n    <ng-container *ngIf=\"!isInsideTable\">\n      <ng-template [ngTemplateOutlet]=\"contentTemplate\"></ng-template>\n    </ng-container>\n  "
                }] }
    ];
    /** @nocollapse */
    NzTheadComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: NzTableStyleService, decorators: [{ type: Optional }] },
        { type: NzTableDataService, decorators: [{ type: Optional }] }
    ]; };
    NzTheadComponent.propDecorators = {
        templateRef: [{ type: ViewChild, args: ['contentTemplate', { static: true },] }],
        listOfNzTrDirective: [{ type: ContentChildren, args: [NzTrDirective, { descendants: true },] }],
        listOfNzThAddOnComponent: [{ type: ContentChildren, args: [NzThAddOnComponent, { descendants: true },] }],
        nzSingleSort: [{ type: Input }],
        nzSortChange: [{ type: Output }],
        nzSortOrderChange: [{ type: Output }]
    };
    __decorate([
        InputBoolean(),
        __metadata("design:type", Object)
    ], NzTheadComponent.prototype, "nzSingleSort", void 0);
    return NzTheadComponent;
}());
if (false) {
    /** @type {?} */
    NzTheadComponent.ngAcceptInputType_nzSingleSort;
    /**
     * @type {?}
     * @private
     */
    NzTheadComponent.prototype.destroy$;
    /** @type {?} */
    NzTheadComponent.prototype.isInsideTable;
    /** @type {?} */
    NzTheadComponent.prototype.templateRef;
    /** @type {?} */
    NzTheadComponent.prototype.listOfNzTrDirective;
    /** @type {?} */
    NzTheadComponent.prototype.listOfNzThAddOnComponent;
    /**
     * @deprecated use nzSortFn and nzSortPriority instead *
     * @type {?}
     */
    NzTheadComponent.prototype.nzSingleSort;
    /**
     * @deprecated use nzSortOrderChange instead *
     * @type {?}
     */
    NzTheadComponent.prototype.nzSortChange;
    /** @type {?} */
    NzTheadComponent.prototype.nzSortOrderChange;
    /**
     * @type {?}
     * @private
     */
    NzTheadComponent.prototype.elementRef;
    /**
     * @type {?}
     * @private
     */
    NzTheadComponent.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    NzTheadComponent.prototype.nzTableStyleService;
    /**
     * @type {?}
     * @private
     */
    NzTheadComponent.prototype.nzTableDataService;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/table/title-footer.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NzTableTitleFooterComponent = /** @class */ (function () {
    function NzTableTitleFooterComponent() {
        this.title = null;
        this.footer = null;
    }
    NzTableTitleFooterComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nz-table-title-footer',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    template: "\n    <ng-container *nzStringTemplateOutlet=\"title\">{{ title }}</ng-container>\n    <ng-container *nzStringTemplateOutlet=\"footer\">{{ footer }}</ng-container>\n  ",
                    host: {
                        '[class.ant-table-title]': "title !== null",
                        '[class.ant-table-footer]': "footer !== null"
                    }
                }] }
    ];
    NzTableTitleFooterComponent.propDecorators = {
        title: [{ type: Input }],
        footer: [{ type: Input }]
    };
    return NzTableTitleFooterComponent;
}());
if (false) {
    /** @type {?} */
    NzTableTitleFooterComponent.prototype.title;
    /** @type {?} */
    NzTableTitleFooterComponent.prototype.footer;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/table/tr-expand.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NzTrExpandDirective = /** @class */ (function () {
    function NzTrExpandDirective() {
        this.nzExpand = true;
    }
    NzTrExpandDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'tr[nzExpand]',
                    host: {
                        '[class.ant-table-expanded-row]': 'true',
                        '[hidden]': "!nzExpand"
                    }
                },] }
    ];
    NzTrExpandDirective.propDecorators = {
        nzExpand: [{ type: Input }]
    };
    return NzTrExpandDirective;
}());
if (false) {
    /** @type {?} */
    NzTrExpandDirective.prototype.nzExpand;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/table/tr-measure.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NzTrMeasureComponent = /** @class */ (function () {
    function NzTrMeasureComponent(nzResizeObserver, ngZone) {
        this.nzResizeObserver = nzResizeObserver;
        this.ngZone = ngZone;
        this.listOfMeasureColumn = [];
        this.listOfAutoWidth = new EventEmitter();
        this.destroy$ = new Subject();
    }
    /**
     * @param {?} _
     * @param {?} key
     * @return {?}
     */
    NzTrMeasureComponent.prototype.trackByFunc = /**
     * @param {?} _
     * @param {?} key
     * @return {?}
     */
    function (_, key) {
        return key;
    };
    /**
     * @return {?}
     */
    NzTrMeasureComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.listOfTdElement.changes
            .pipe(startWith(this.listOfTdElement))
            .pipe(switchMap((/**
         * @param {?} list
         * @return {?}
         */
        function (list) {
            return (/** @type {?} */ (combineLatest(list.toArray().map((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                return _this.nzResizeObserver.observe(item).pipe(map((/**
                 * @param {?} __0
                 * @return {?}
                 */
                function (_a) {
                    var _b = __read(_a, 1), entry = _b[0];
                    var width = entry.target.getBoundingClientRect().width;
                    return Math.floor(width);
                })));
            })))));
        })), debounceTime(16), takeUntil(this.destroy$))
            .subscribe((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            _this.ngZone.run((/**
             * @return {?}
             */
            function () {
                _this.listOfAutoWidth.next(data);
            }));
        }));
    };
    /**
     * @return {?}
     */
    NzTrMeasureComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.destroy$.next();
        this.destroy$.complete();
    };
    NzTrMeasureComponent.decorators = [
        { type: Component, args: [{
                    selector: 'tr[nz-table-measure-row]',
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    template: "\n    <td\n      #tdElement\n      class=\"nz-disable-td\"\n      style=\"padding: 0px; border: 0px; height: 0px;\"\n      *ngFor=\"let th of listOfMeasureColumn; trackBy: trackByFunc\"\n    ></td>\n  ",
                    host: {
                        '[class.ant-table-measure-now]': 'true'
                    }
                }] }
    ];
    /** @nocollapse */
    NzTrMeasureComponent.ctorParameters = function () { return [
        { type: NzResizeObserver },
        { type: NgZone }
    ]; };
    NzTrMeasureComponent.propDecorators = {
        listOfMeasureColumn: [{ type: Input }],
        listOfAutoWidth: [{ type: Output }],
        listOfTdElement: [{ type: ViewChildren, args: ['tdElement',] }]
    };
    return NzTrMeasureComponent;
}());
if (false) {
    /** @type {?} */
    NzTrMeasureComponent.prototype.listOfMeasureColumn;
    /** @type {?} */
    NzTrMeasureComponent.prototype.listOfAutoWidth;
    /** @type {?} */
    NzTrMeasureComponent.prototype.listOfTdElement;
    /**
     * @type {?}
     * @private
     */
    NzTrMeasureComponent.prototype.destroy$;
    /**
     * @type {?}
     * @private
     */
    NzTrMeasureComponent.prototype.nzResizeObserver;
    /**
     * @type {?}
     * @private
     */
    NzTrMeasureComponent.prototype.ngZone;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/table.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NzTableModule = /** @class */ (function () {
    function NzTableModule() {
    }
    NzTableModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        NzTableComponent,
                        NzThAddOnComponent,
                        NzTableCellDirective,
                        NzThMeasureDirective,
                        NzTdAddOnComponent,
                        NzTheadComponent,
                        NzTbodyComponent,
                        NzTrDirective,
                        NzTrExpandDirective,
                        NzTableVirtualScrollDirective,
                        NzCellFixedDirective,
                        NzTableContentComponent,
                        NzTableTitleFooterComponent,
                        NzTableInnerDefaultComponent,
                        NzTableInnerScrollComponent,
                        NzTrMeasureComponent,
                        NzRowIndentDirective,
                        NzRowExpandButtonDirective,
                        NzCellBreakWordDirective,
                        NzCellAlignDirective,
                        NzTableSortersComponent,
                        NzTableFilterComponent,
                        NzTableSelectionComponent,
                        NzCellEllipsisDirective,
                        NzFilterTriggerComponent,
                        NzTableFixedRowComponent,
                        NzThSelectionComponent
                    ],
                    exports: [
                        NzTableComponent,
                        NzThAddOnComponent,
                        NzTableCellDirective,
                        NzThMeasureDirective,
                        NzTdAddOnComponent,
                        NzTheadComponent,
                        NzTbodyComponent,
                        NzTrDirective,
                        NzTableVirtualScrollDirective,
                        NzCellFixedDirective,
                        NzFilterTriggerComponent,
                        NzTrExpandDirective,
                        NzCellBreakWordDirective,
                        NzCellAlignDirective,
                        NzCellEllipsisDirective,
                        NzTableFixedRowComponent,
                        NzThSelectionComponent
                    ],
                    imports: [
                        NzMenuModule,
                        FormsModule,
                        NzOutletModule,
                        NzRadioModule,
                        NzCheckboxModule,
                        NzDropDownModule,
                        NzButtonModule,
                        CommonModule,
                        PlatformModule,
                        NzPaginationModule,
                        NzResizeObserversModule,
                        NzSpinModule,
                        NzI18nModule,
                        NzIconModule,
                        NzEmptyModule,
                        ScrollingModule
                    ]
                },] }
    ];
    return NzTableModule;
}());

/**
 * @fileoverview added by tsickle
 * Generated from: src/table.types.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
/**
 * @record
 */
function NzTableQueryParams() { }
if (false) {
    /** @type {?} */
    NzTableQueryParams.prototype.pageIndex;
    /** @type {?} */
    NzTableQueryParams.prototype.pageSize;
    /** @type {?} */
    NzTableQueryParams.prototype.sort;
    /** @type {?} */
    NzTableQueryParams.prototype.filter;
}

/**
 * @fileoverview added by tsickle
 * Generated from: public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: ng-zorro-antd-table.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { NzCellAlignDirective, NzCellBreakWordDirective, NzCellEllipsisDirective, NzCellFixedDirective, NzFilterTriggerComponent, NzRowExpandButtonDirective, NzRowIndentDirective, NzTableCellDirective, NzTableComponent, NzTableContentComponent, NzTableDataService, NzTableFilterComponent, NzTableFixedRowComponent, NzTableInnerDefaultComponent, NzTableInnerScrollComponent, NzTableModule, NzTableSelectionComponent, NzTableSortersComponent, NzTableStyleService, NzTableTitleFooterComponent, NzTableVirtualScrollDirective, NzTbodyComponent, NzTdAddOnComponent, NzThAddOnComponent, NzThMeasureDirective, NzThSelectionComponent, NzTheadComponent, NzTrDirective, NzTrExpandDirective, NzTrMeasureComponent };
//# sourceMappingURL=ng-zorro-antd-table.js.map
