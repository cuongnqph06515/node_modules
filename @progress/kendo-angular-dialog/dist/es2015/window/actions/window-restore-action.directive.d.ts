/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ElementRef, NgZone, Renderer2 } from "@angular/core";
import { DragResizeService } from './../drag-resize.service';
import { Button } from '@progress/kendo-angular-buttons';
import { LocalizationService } from '@progress/kendo-angular-l10n';
export declare class WindowRestoreActionDirective extends Button {
    /**
     * @hidden
     */
    window: any;
    buttonType: string;
    constructor(el: ElementRef, renderer: Renderer2, _service: DragResizeService, localization: LocalizationService, ngZone: NgZone);
    /**
     * @hidden
     */
    onClick(): void;
    readonly visible: string;
}
