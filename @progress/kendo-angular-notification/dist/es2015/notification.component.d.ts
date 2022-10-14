/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { EventEmitter, TemplateRef, ChangeDetectorRef, ViewContainerRef, ElementRef, OnInit, ComponentRef, OnDestroy, Renderer2 } from '@angular/core';
import { AnimationBuilder } from '@angular/animations';
import { Subscription } from 'rxjs';
import { Type } from './models/type';
import { Animation } from './models/animation';
import { LocalizationService } from '@progress/kendo-angular-l10n';
/**
 * @hidden
 *
 */
export declare class NotificationComponent implements OnInit, OnDestroy {
    cdr: ChangeDetectorRef;
    private element;
    private renderer;
    private builder;
    private localizationService;
    container: ViewContainerRef;
    closeClickSubscription: Subscription;
    close: EventEmitter<any>;
    templateRef?: TemplateRef<any>;
    templateString?: string;
    width?: number;
    height?: number;
    cssClass?: string | Array<string> | Object;
    hideAfter?: number;
    closable?: boolean;
    type?: Type;
    animation?: Animation;
    closeTitle: string;
    /**
     * @hidden
     */
    direction: string;
    readonly containerClass: boolean;
    readonly closeButtonTitle: string;
    private defaultHideAfter;
    private hideTimeout;
    private animationEnd;
    private dynamicRTLSubscription;
    private rtl;
    constructor(cdr: ChangeDetectorRef, element: ElementRef, renderer: Renderer2, builder: AnimationBuilder, localizationService: LocalizationService);
    notificationClasses(): string;
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngAfterViewInit(): void;
    typeClass(): string;
    typeIconClass(): string;
    onCloseClick(): void;
    hide(customComponent?: ComponentRef<any>): void;
    private setHideTimeout;
    private emitClose;
    private play;
    private animate;
    private slideAnimation;
    private fadeAnimation;
}
