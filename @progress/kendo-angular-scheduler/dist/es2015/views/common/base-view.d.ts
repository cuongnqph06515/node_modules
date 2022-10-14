import { OnInit, AfterViewInit, OnDestroy, OnChanges, NgZone, ElementRef, Renderer2, TemplateRef } from '@angular/core';
import { IntlService } from '@progress/kendo-angular-intl';
import { Subscription, Subject, BehaviorSubject } from 'rxjs';
import { DateRange, NavigationAction, ViewItem } from '../../types';
import { BaseSlotService } from '../view-items/base-slot.service';
import { ViewContextService } from '../view-context.service';
import { ViewStateService } from '../view-state.service';
import { HintContainerComponent } from '../common/hint-container.component';
import { PDFService } from '../../pdf/pdf.service';
import { LocalizationService } from '@progress/kendo-angular-l10n';
/** @hidden */
export declare abstract class BaseView implements OnInit, OnChanges, AfterViewInit, OnDestroy {
    protected viewContext: ViewContextService;
    protected viewState: ViewStateService;
    protected intl: IntlService;
    protected slotService: BaseSlotService;
    protected zone: NgZone;
    protected renderer: Renderer2;
    protected element: ElementRef;
    protected pdfService: PDFService;
    protected localization: LocalizationService;
    еventTemplate: TemplateRef<any>;
    groupHeaderTemplate: TemplateRef<any>;
    selectedDateFormat: string;
    selectedShortDateFormat: string;
    eventHeight: number;
    slotClass: (args: any) => any;
    eventClass: (args: any) => any;
    eventStyles: (args: any) => any;
    content: ElementRef;
    header: ElementRef;
    contentTable: ElementRef;
    times: ElementRef;
    timesHeader: ElementRef;
    timesTable: ElementRef;
    headerWrap: ElementRef;
    hintContainer: HintContainerComponent;
    readonly eventTemplateRef: TemplateRef<any>;
    readonly groupHeaderTemplateRef: TemplateRef<any>;
    items: Subject<any[]>;
    horizontalResources: any[];
    verticalResources: any[];
    dragHints: any[];
    resizeHints: any[];
    editable: any;
    getField: any;
    protected changes: BehaviorSubject<any>;
    protected subs: Subscription;
    protected groupedResources: any[];
    protected spans: any[];
    protected contentHeight: any;
    protected tasks: any[];
    protected group: any;
    protected resources: any[];
    protected domEvents: any[];
    protected schedulerEventTemplate: any;
    protected schedulerGroupHeaderTemplate: any;
    protected min: any;
    protected max: any;
    protected selectedDate: Date;
    protected resourcesCache: any;
    protected timezone: string;
    protected draggable: any;
    protected resizing: any;
    protected dragging: any;
    protected dragArgs: any;
    protected container: any;
    protected containerOffset: any;
    protected pressLocation: any;
    protected pressTarget: any;
    protected scrollInterval: any;
    protected autoHeight: boolean;
    protected rtl: boolean;
    constructor(viewContext: ViewContextService, viewState: ViewStateService, intl: IntlService, slotService: BaseSlotService, zone: NgZone, renderer: Renderer2, element: ElementRef, pdfService: PDFService, localization: LocalizationService);
    protected abstract onSelectDate(date: Date): void;
    protected abstract onAction(action: NavigationAction): void;
    protected abstract onTasksChange(): void;
    protected abstract createTasks(items: ViewItem[], dateRange: DateRange): any[];
    protected abstract reflow(): void;
    protected abstract slotByIndex(slotIndex: string, args: any): any;
    protected abstract dateRange(date: Date): DateRange;
    protected abstract dragHintSize(startSlot: any, endSlot: any): any;
    protected abstract dragRanges(slot: any): any;
    protected abstract slotByPosition(x: number, y: number, container?: any): any;
    ngOnInit(): void;
    ngOnChanges(changes: any): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    itemIndex(index: number, _: any): any;
    resourcesByIndex(index: number): any[];
    dragResourcesByIndex(index: number): any[];
    getEventClasses(item: any, resources: any, isAllDay?: boolean): any;
    getEventStyles(item: any, itemResource: any, isAllDay?: boolean): any;
    protected optionsChange(options: any): void;
    protected toggleElement(visible: boolean): void;
    protected onStable(): any;
    protected updateView(): void;
    protected assignResources(): void;
    protected bindEvents(): void;
    protected onPress(args: any): void;
    protected onDrag(args: any): void;
    protected onRelease(): void;
    protected setHintClass(className: string): void;
    protected updateHintClass(): void;
    protected removeHintClass(): void;
    protected setSlotClass(className: string): void;
    protected removeSlotClass(): void;
    protected readonly hints: any;
    protected initDrag(args: any): void;
    protected updateDragContainer(args: any): void;
    protected drag(args: any): void;
    protected dragHintClasses(): any;
    protected dragHintEventStyleArgs(): any;
    protected draggedIsAllDay(task: any, _slot: any): boolean;
    protected dragResourceColor(task: any, slotResources: any[]): string;
    protected resourceValues(task: any, currentResources: any[]): any;
    protected initResize(args: any): void;
    protected resize(args: any): void;
    protected updateResizeHints(ranges: any[], start: Date, end: Date): void;
    protected coordinatesOffset(x: number, y: number, container?: any, offset?: any): any;
    protected scrollContainer(callback: any, args: any): void;
    protected emitEvent(name: string, args: any): boolean;
    protected targetTask(target: any): any;
    protected updateHintContainer(): void;
    /**
     * Converts a "view date" (date stored in the UTC parts of a Date object) to a local date.
     */
    protected convertDate(date: Date): Date;
    protected onClick(e: any, eventType?: string): void;
    protected emitSlotEvent(e: any, eventType: string): void;
    protected emitTaskEvent(e: any, eventType: string): void;
    protected onKeydown(e: any): void;
    protected syncTables(): void;
    protected updateContentHeight(): void;
    protected groupResources(): void;
    protected readonly taskResources: any[];
    protected resourceSpans(): number[];
    protected isInRange(date: Date): boolean;
    protected createPDFElement(): void;
    protected pdfWidth(): number;
    protected containerByPosition({ x, y }: any): any;
    protected execute(e: any): void;
    protected slotFields(slot: any): any;
}