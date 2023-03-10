import { OnInit, OnDestroy, Renderer2, ElementRef, NgZone } from '@angular/core';
import { HighlightJS } from './highlight.service';
export declare class HighlightChildren implements OnInit, OnDestroy {
    private _zone;
    private _el;
    private _hljs;
    private _renderer;
    private _platformId;
    selector: string;
    private _observer;
    constructor(_zone: NgZone, _el: ElementRef, _hljs: HighlightJS, _renderer: Renderer2, _platformId: Object);
    ngOnInit(): void;
    /**
     * Highlight a code block
     * @param el Code block element
     */
    highlightElement(el: HTMLElement): void;
    /**
     * Highlight multiple code blocks
     * @param selector elements selector
     */
    highlightChildren(selector: string): void;
    ngOnDestroy(): void;
}
