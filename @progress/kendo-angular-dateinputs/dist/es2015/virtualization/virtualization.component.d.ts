/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { EventEmitter, ElementRef, InjectionToken, OnChanges, OnDestroy, OnInit, AfterViewInit, Renderer2, NgZone } from '@angular/core';
import { Scrollable } from './models/scrollable.interface';
import { ScrollerService, PageAction, ScrollAction } from './services/scroller.service';
import { Observable } from 'rxjs';
/**
 * @hidden
 */
export declare const SCROLLER_FACTORY_TOKEN: InjectionToken<string>;
/**
 * @hidden
 */
export declare function DEFAULT_SCROLLER_FACTORY(observable: Observable<any>): ScrollerService;
/**
 * @hidden
 */
export declare enum ScrollDirection {
    Backward = 0,
    Forward = 1
}
/**
 * @hidden
 */
export declare class VirtualizationComponent implements OnChanges, OnInit, OnDestroy, AfterViewInit, Scrollable {
    container: ElementRef;
    renderer: Renderer2;
    zone: NgZone;
    direction: 'horizontal' | 'vertical';
    itemHeight: number;
    itemWidth: number;
    topOffset: number;
    bottomOffset: number;
    maxScrollDifference: number;
    scrollOffsetSize: number;
    scrollDuration: number;
    skip: number;
    take: number;
    total: number;
    activeIndexChange: EventEmitter<number>;
    pageChange: EventEmitter<PageAction>;
    scrollChange: EventEmitter<ScrollAction>;
    totalSize: number;
    readonly totalVertexLength: any;
    readonly containerOffsetSize: number;
    readonly containerScrollSize: number;
    readonly containerScrollPosition: number;
    private lastActiveIndex;
    private resolvedPromise;
    private scroller;
    private rowHeightService;
    private dispatcher;
    private scrollSubscription;
    private containerScrollSubscription;
    private animationSubscription;
    constructor(scrollerFactory: any, container: ElementRef, renderer: Renderer2, zone: NgZone);
    readonly wrapperClasses: boolean;
    readonly horizontalClass: boolean;
    ngOnChanges(changes: any): void;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    getContainerProperty(propertyName: string): number;
    activeIndex(): number;
    itemIndex(offset: number): number;
    itemOffset(index: number): number;
    isIndexVisible(index: number): boolean;
    isListScrolled(index: number): boolean;
    scrollTo(value: number): void;
    scrollToIndex(index: number): void;
    scrollToBottom(): void;
    animateToIndex(index: number): void;
    scrollRange(indexOffset: number, direction: ScrollDirection): any;
    scrollStep(start: number, end: number): number;
    scroll$(): Observable<any>;
    private initServices;
    private createRowHeightService;
    private emitActiveIndex;
    private containerMaxScroll;
    private getContainerScrollDirection;
}
