/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, ElementRef, HostBinding, Inject, Input, NgZone, Optional, Renderer2 } from '@angular/core';
import { FocusGroup } from './focus-group';
import { FocusRoot } from './focus-root';
import { NavigationService } from './navigation.service';
import { ColumnInfoService } from '../common/column-info.service';
import { IdService } from '../common/id.service';
import { CELL_CONTEXT } from '../rendering/common/cell-context';
let id = 0;
function nextId() {
    return id++;
}
/**
 * @hidden
 */
export class LogicalCellDirective {
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
