import { EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { IClipboardResponse } from './interface';
import { ClipboardService } from './ngx-clipboard.service';
export declare class ClipboardDirective implements OnInit, OnDestroy {
    private clipboardSrv;
    targetElm: HTMLInputElement | HTMLTextAreaElement;
    container: HTMLElement;
    cbContent: string;
    cbSuccessMsg: string;
    cbOnSuccess: EventEmitter<IClipboardResponse>;
    cbOnError: EventEmitter<any>;
    constructor(clipboardSrv: ClipboardService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    onClick(event: Event): void;
    /**
     * Fires an event based on the copy operation result.
     * @param succeeded
     */
    private handleResult;
}
