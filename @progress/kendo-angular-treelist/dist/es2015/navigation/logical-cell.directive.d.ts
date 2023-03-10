/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { DoCheck, ElementRef, NgZone, Renderer2, SimpleChanges } from '@angular/core';
import { OnChanges, OnDestroy, OnInit } from '@angular/core';
import { FocusGroup } from './focus-group';
import { LogicalCell } from './logical-cell.interface';
import { NavigationService } from './navigation.service';
import { ColumnInfoService } from '../common/column-info.service';
import { IdService } from '../common/id.service';
/**
 * @hidden
 */
export declare class LogicalCellDirective implements LogicalCell, OnInit, OnChanges, OnDestroy, DoCheck {
    focusGroup: FocusGroup;
    private element;
    private columnInfoService;
    private idService;
    private navigationService;
    private renderer;
    private zone;
    logicalColIndex: number;
    logicalRowIndex: number;
    logicalSlaveCell: boolean;
    colIndex: number;
    colSpan: number;
    rowSpan: number;
    dataRowIndex: number;
    dataItem: any;
    readonly uid: number;
    readonly id: string;
    readonly ariaColIndex: number;
    private navigationChange;
    constructor(focusGroup: FocusGroup, element: ElementRef, columnInfoService: ColumnInfoService, idService: IdService, navigationService: NavigationService, renderer: Renderer2, zone: NgZone);
    ngOnInit(): void;
    ngDoCheck(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    private onNavigationChange;
    private updateElement;
    private microtask;
    private registerChanges;
    private registerNoChanges;
    private isFocusable;
    private isFocused;
}
