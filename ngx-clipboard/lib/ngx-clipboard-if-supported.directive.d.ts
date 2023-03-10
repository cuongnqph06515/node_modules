import { OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { ClipboardService } from './ngx-clipboard.service';
export declare class ClipboardIfSupportedDirective implements OnInit {
    private _clipboardService;
    private _viewContainerRef;
    private _templateRef;
    constructor(_clipboardService: ClipboardService, _viewContainerRef: ViewContainerRef, _templateRef: TemplateRef<any>);
    ngOnInit(): void;
}
