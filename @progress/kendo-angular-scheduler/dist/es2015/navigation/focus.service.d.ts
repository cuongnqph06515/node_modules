import { ElementRef, Renderer2, OnDestroy } from '@angular/core';
import { FocusableElement } from './focusable-element.interface';
import { DomEventsService } from '../views/common/dom-events.service';
import { FocusPosition } from './focus-position.interface';
/**
 * @hidden
 */
export declare class FocusService implements OnDestroy {
    private renderer;
    private wrapper;
    private domEvents;
    readonly activeElement: ElementRef;
    private activeItem;
    private focusedItem;
    private items;
    private elementMap;
    private subs;
    constructor(renderer: Renderer2, wrapper: ElementRef, domEvents: DomEventsService);
    ngOnDestroy(): void;
    register(item: FocusableElement): void;
    unregister(item: FocusableElement): void;
    focus(): void;
    focusNext(options?: FocusPosition): boolean;
    private activate;
    private activateNext;
    private findNext;
    private toggleWrapper;
    private onFocusIn;
    private onFocusOut;
}
