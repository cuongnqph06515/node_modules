/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { Directive, ElementRef, HostBinding, HostListener, Input, Optional, NgZone, Renderer2 } from "@angular/core";
import { DragResizeService } from './../drag-resize.service';
import { Button } from '@progress/kendo-angular-buttons';
import { L10N_PREFIX, LocalizationService } from '@progress/kendo-angular-l10n';
var WindowRestoreActionDirective = /** @class */ (function (_super) {
    tslib_1.__extends(WindowRestoreActionDirective, _super);
    function WindowRestoreActionDirective(el, renderer, _service, localization, ngZone) {
        var _this = _super.call(this, el, renderer, null, localization, ngZone) || this;
        _this.buttonType = 'button';
        _this.window = _service;
        _this.look = 'bare';
        _this.icon = 'window-restore';
        return _this;
    }
    /**
     * @hidden
     */
    WindowRestoreActionDirective.prototype.onClick = function () {
        if (!this.isDisabled) {
            this.window.restoreAction();
        }
    };
    Object.defineProperty(WindowRestoreActionDirective.prototype, "visible", {
        get: function () {
            return this.window.options.state === 'default' ? 'none' : 'inline-flex';
        },
        enumerable: true,
        configurable: true
    });
    WindowRestoreActionDirective.decorators = [
        { type: Directive, args: [{
                    exportAs: 'kendoWindowRestoreAction',
                    providers: [
                        LocalizationService,
                        {
                            provide: L10N_PREFIX,
                            useValue: 'kendo.button'
                        }
                    ],
                    selector: 'button[kendoWindowRestoreAction]' // tslint:disable-line
                },] },
    ];
    /** @nocollapse */
    WindowRestoreActionDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: DragResizeService, decorators: [{ type: Optional }] },
        { type: LocalizationService },
        { type: NgZone }
    ]; };
    WindowRestoreActionDirective.propDecorators = {
        window: [{ type: Input }],
        buttonType: [{ type: HostBinding, args: ['attr.type',] }],
        onClick: [{ type: HostListener, args: ['click',] }],
        visible: [{ type: HostBinding, args: ['style.display',] }]
    };
    return WindowRestoreActionDirective;
}(Button));
export { WindowRestoreActionDirective };
