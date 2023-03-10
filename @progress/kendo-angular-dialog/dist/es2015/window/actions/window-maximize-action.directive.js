/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Directive, ElementRef, HostBinding, HostListener, Input, Optional, NgZone, Renderer2 } from "@angular/core";
import { DragResizeService } from './../drag-resize.service';
import { Button } from '@progress/kendo-angular-buttons';
import { L10N_PREFIX, LocalizationService } from '@progress/kendo-angular-l10n';
export class WindowMaximizeActionDirective extends Button {
    constructor(el, renderer, _service, localization, ngZone) {
        super(el, renderer, null, localization, ngZone);
        this.buttonType = 'button';
        this.window = _service;
        this.look = 'bare';
        this.icon = 'window-maximize';
    }
    /**
     * @hidden
     */
    onClick() {
        if (!this.isDisabled) {
            this.window.maximizeAction();
        }
    }
    get visible() {
        return this.window.options.state === 'default' ? 'inline-flex' : 'none';
    }
}
WindowMaximizeActionDirective.decorators = [
    { type: Directive, args: [{
                exportAs: 'kendoWindowMaximizeAction',
                providers: [
                    LocalizationService,
                    {
                        provide: L10N_PREFIX,
                        useValue: 'kendo.button'
                    }
                ],
                selector: 'button[kendoWindowMaximizeAction]' // tslint:disable-line
            },] },
];
/** @nocollapse */
WindowMaximizeActionDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: DragResizeService, decorators: [{ type: Optional }] },
    { type: LocalizationService },
    { type: NgZone }
];
WindowMaximizeActionDirective.propDecorators = {
    window: [{ type: Input }],
    buttonType: [{ type: HostBinding, args: ['attr.type',] }],
    onClick: [{ type: HostListener, args: ['click',] }],
    visible: [{ type: HostBinding, args: ['style.display',] }]
};
