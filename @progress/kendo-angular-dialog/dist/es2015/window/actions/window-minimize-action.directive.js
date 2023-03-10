/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, ElementRef, HostBinding, HostListener, Input, Optional, NgZone, Renderer2 } from "@angular/core";
import { DragResizeService } from './../drag-resize.service';
import { Button } from '@progress/kendo-angular-buttons';
import { L10N_PREFIX, LocalizationService } from '@progress/kendo-angular-l10n';
export class WindowMinimizeActionDirective extends Button {
    constructor(el, renderer, _service, localization, ngZone) {
        super(el, renderer, null, localization, ngZone);
        this.buttonType = 'button';
        this.window = _service;
        this.look = 'bare';
        this.icon = 'window-minimize';
    }
    /**
     * @hidden
     */
    onClick() {
        if (!this.isDisabled) {
            this.window.minimizeAction();
        }
    }
    get visible() {
        return this.window.options.state === 'default' ? 'inline-flex' : 'none';
    }
}
WindowMinimizeActionDirective.decorators = [
    { type: Directive, args: [{
                exportAs: 'kendoWindowMinimizeAction',
                providers: [
                    LocalizationService,
                    {
                        provide: L10N_PREFIX,
                        useValue: 'kendo.button'
                    }
                ],
                selector: 'button[kendoWindowMinimizeAction]' // tslint:disable-line
            },] },
];
/** @nocollapse */
WindowMinimizeActionDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: DragResizeService, decorators: [{ type: Optional }] },
    { type: LocalizationService },
    { type: NgZone }
];
WindowMinimizeActionDirective.propDecorators = {
    window: [{ type: Input }],
    buttonType: [{ type: HostBinding, args: ['attr.type',] }],
    onClick: [{ type: HostListener, args: ['click',] }],
    visible: [{ type: HostBinding, args: ['style.display',] }]
};
