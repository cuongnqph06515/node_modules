/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectorRef, ComponentFactory, ComponentFactoryResolver, ElementRef, EventEmitter, Renderer2, ViewContainerRef } from '@angular/core';
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';
import { NgStyleInterface, NzTSType } from 'ng-zorro-antd/core/types';
import { NzTooltipBaseDirective, NzToolTipComponent, NzTooltipTrigger } from 'ng-zorro-antd/tooltip';
export declare class NzPopoverDirective extends NzTooltipBaseDirective {
    noAnimation?: NzNoAnimationDirective | undefined;
    specificTitle?: NzTSType;
    specificContent?: NzTSType;
    directiveNameTitle?: NzTSType | null;
    specificTrigger?: NzTooltipTrigger;
    specificPlacement?: string;
    specificOrigin?: ElementRef<HTMLElement>;
    specificVisible?: boolean;
    specificMouseEnterDelay?: number;
    specificMouseLeaveDelay?: number;
    specificOverlayClassName?: string;
    specificOverlayStyle?: NgStyleInterface;
    readonly specificVisibleChange: EventEmitter<boolean>;
    componentFactory: ComponentFactory<NzPopoverComponent>;
    constructor(elementRef: ElementRef, hostView: ViewContainerRef, resolver: ComponentFactoryResolver, renderer: Renderer2, noAnimation?: NzNoAnimationDirective | undefined);
}
export declare class NzPopoverComponent extends NzToolTipComponent {
    noAnimation?: NzNoAnimationDirective | undefined;
    _prefix: string;
    constructor(cdr: ChangeDetectorRef, noAnimation?: NzNoAnimationDirective | undefined);
    protected isEmpty(): boolean;
}
