/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { CdkConnectedOverlay, CdkOverlayOrigin, ConnectedOverlayPositionChange, ConnectionPositionPair } from '@angular/cdk/overlay';
import { AfterViewInit, ChangeDetectorRef, ComponentFactory, ComponentFactoryResolver, ElementRef, EventEmitter, OnChanges, OnDestroy, Renderer2, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';
import { BooleanInput, NgClassInterface, NgStyleInterface, NzTSType } from 'ng-zorro-antd/core/types';
import { Subject } from 'rxjs';
export declare type NzTooltipTrigger = 'click' | 'focus' | 'hover' | null;
export declare abstract class NzTooltipBaseDirective implements OnChanges, OnDestroy, AfterViewInit {
    elementRef: ElementRef;
    protected hostView: ViewContainerRef;
    protected resolver: ComponentFactoryResolver;
    protected renderer: Renderer2;
    protected noAnimation?: NzNoAnimationDirective | undefined;
    directiveNameTitle?: NzTSType | null;
    specificTitle?: NzTSType | null;
    directiveNameContent?: NzTSType | null;
    specificContent?: NzTSType | null;
    specificTrigger?: NzTooltipTrigger;
    specificPlacement?: string;
    specificOrigin?: ElementRef<HTMLElement>;
    specificVisible?: boolean;
    specificMouseEnterDelay?: number;
    specificMouseLeaveDelay?: number;
    specificOverlayClassName?: string;
    specificOverlayStyle?: NgStyleInterface;
    specificVisibleChange: EventEmitter<boolean>;
    /**
     * @deprecated 10.0.0. This is deprecated and going to be removed in 10.0.0.
     * Please use a more specific API. Like `nzTooltipTitle`.
     */
    nzTitle?: NzTSType | null;
    /**
     * @deprecated 10.0.0. This is deprecated and going to be removed in 10.0.0.
     * Please use a more specific API. Like `nzPopoverContent`.
     */
    nzContent?: NzTSType | null;
    /**
     * @deprecated 10.0.0. This is deprecated and going to be removed in 10.0.0.
     * Please use a more specific API. Like `nzTooltipTrigger`.
     */
    nzTrigger: NzTooltipTrigger;
    /**
     * @deprecated 10.0.0. This is deprecated and going to be removed in 10.0.0.
     * Please use a more specific API. Like `nzTooltipPlacement`.
     */
    nzPlacement: string;
    nzMouseEnterDelay?: number;
    nzMouseLeaveDelay?: number;
    nzOverlayClassName?: string;
    nzOverlayStyle?: NgStyleInterface;
    nzVisible?: boolean;
    /**
     * For create tooltip dynamically. This should be override for each different component.
     */
    protected componentFactory: ComponentFactory<NzTooltipBaseComponent>;
    /**
     * This true title that would be used in other parts on this component.
     */
    protected get title(): NzTSType | null;
    protected get content(): NzTSType | null;
    protected get placement(): string;
    protected get trigger(): NzTooltipTrigger;
    protected get isVisible(): boolean;
    protected get mouseEnterDelay(): number;
    protected get mouseLeaveDelay(): number;
    protected get overlayClassName(): string | null;
    protected get overlayStyle(): NgStyleInterface | null;
    visible: boolean;
    protected needProxyProperties: string[];
    readonly nzVisibleChange: EventEmitter<boolean>;
    component?: NzTooltipBaseComponent;
    protected readonly destroy$: Subject<void>;
    protected readonly triggerDisposables: Array<() => void>;
    private delayTimer?;
    constructor(elementRef: ElementRef, hostView: ViewContainerRef, resolver: ComponentFactoryResolver, renderer: Renderer2, noAnimation?: NzNoAnimationDirective | undefined);
    warnDeprecationIfNeeded(isNeeded: boolean, property: string, newProperty: string, comp?: string, shared?: boolean): void;
    warnDeprecationByChanges(changes: SimpleChanges): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    show(): void;
    hide(): void;
    /**
     * Force the component to update its position.
     */
    updatePosition(): void;
    /**
     * Create a dynamic tooltip component. This method can be override.
     */
    protected createComponent(): void;
    protected registerTriggers(): void;
    updatePropertiesByChanges(changes: SimpleChanges): void;
    updatePropertiesByArray(): void;
    /**
     * Sync changed properties to the component and trigger change detection in that component.
     */
    protected updateChangedProperties(propertiesOrChanges: string[] | SimpleChanges): void;
    private updateComponentValue;
    private delayEnterLeave;
    private removeTriggerListeners;
    private clearTogglingTimer;
}
export declare abstract class NzTooltipBaseComponent implements OnDestroy {
    cdr: ChangeDetectorRef;
    noAnimation?: NzNoAnimationDirective | undefined;
    static ngAcceptInputType_nzVisible: BooleanInput;
    overlay: CdkConnectedOverlay;
    nzVisibleChange: Subject<boolean>;
    nzTitle: NzTSType | null;
    nzContent: NzTSType | null;
    nzOverlayClassName: string;
    nzOverlayStyle: NgStyleInterface;
    nzMouseEnterDelay?: number;
    nzMouseLeaveDelay?: number;
    set nzVisible(value: boolean);
    get nzVisible(): boolean;
    _visible: boolean;
    set nzTrigger(value: NzTooltipTrigger);
    get nzTrigger(): NzTooltipTrigger;
    protected _trigger: NzTooltipTrigger;
    set nzPlacement(value: string);
    get nzPlacement(): string;
    origin?: CdkOverlayOrigin;
    preferredPlacement: string;
    _classMap: NgClassInterface;
    _hasBackdrop: boolean;
    _prefix: string;
    _positions: ConnectionPositionPair[];
    constructor(cdr: ChangeDetectorRef, noAnimation?: NzNoAnimationDirective | undefined);
    ngOnDestroy(): void;
    show(): void;
    hide(): void;
    updateByDirective(): void;
    /**
     * Force the component to update its position.
     */
    updatePosition(): void;
    onPositionChange(position: ConnectedOverlayPositionChange): void;
    setClassMap(): void;
    setOverlayOrigin(origin: CdkOverlayOrigin): void;
    /**
     * Hide the component while the content is empty.
     */
    private updateVisibilityByTitle;
    /**
     * Empty component cannot be opened.
     */
    protected abstract isEmpty(): boolean;
}
export declare function isTooltipEmpty(value: string | TemplateRef<void> | null): boolean;
