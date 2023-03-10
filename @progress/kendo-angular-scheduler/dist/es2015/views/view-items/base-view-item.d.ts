import { ElementRef, OnInit, OnChanges, OnDestroy, Renderer2, TemplateRef } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { BaseSlotService } from './base-slot.service';
import { Rect, ViewItem } from './types';
import { FocusService } from '../../navigation';
/**
 * @hidden
 */
export declare class BaseViewItem implements OnInit, OnChanges, OnDestroy, ViewItem {
    protected slotService: BaseSlotService;
    protected localization: LocalizationService;
    protected focusService: FocusService;
    protected element: ElementRef;
    protected renderer: Renderer2;
    item: any;
    resourceIndex: number;
    index: number;
    eventTemplate: TemplateRef<any>;
    editable: any;
    dragHint: boolean;
    resources: any[];
    className: boolean;
    readonly taskIndex: string;
    readonly touchAction: string;
    readonly eventTitle: string;
    readonly deleteMessage: string;
    readonly resizable: boolean;
    readonly removable: boolean;
    rect: Rect;
    private subs;
    constructor(slotService: BaseSlotService, localization: LocalizationService, focusService: FocusService, element: ElementRef, renderer: Renderer2);
    readonly isRecurrence: boolean;
    readonly isRecurrenceException: boolean;
    readonly nativeElement: any;
    setStyles(styles: any): void;
    toggle(visible: boolean): void;
    reflow(): void;
    ngOnInit(): void;
    ngOnChanges(changes: any): void;
    ngOnDestroy(): void;
}
