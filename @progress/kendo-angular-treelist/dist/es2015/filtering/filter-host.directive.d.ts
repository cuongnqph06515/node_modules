/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Type, ViewContainerRef, OnInit, OnDestroy, OnChanges, ComponentRef, ComponentFactoryResolver, SimpleChange } from '@angular/core';
import { ColumnComponent } from '../columns/column.component';
import { CompositeFilterDescriptor } from '@progress/kendo-data-query';
import { FilterComponent } from './filter-component.interface';
/**
 * @hidden
 */
export declare type Context = {
    filter: CompositeFilterDescriptor;
    column: ColumnComponent;
};
/**
 * @hidden
 */
export declare abstract class FilterHostDirective implements OnInit, OnDestroy, OnChanges {
    private host;
    private resolver;
    column: ColumnComponent;
    filter: CompositeFilterDescriptor;
    protected component: ComponentRef<FilterComponent>;
    constructor(host: ViewContainerRef, resolver: ComponentFactoryResolver);
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: {
        [propertyName: string]: SimpleChange;
    }): void;
    protected abstract componentType(): Type<FilterComponent>;
    protected initComponent({ column, filter }: Context): void;
}
