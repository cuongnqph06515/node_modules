/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var drag_resize_service_1 = require("../drag-resize.service");
var kendo_angular_buttons_1 = require("@progress/kendo-angular-buttons");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var WindowCloseActionDirective = /** @class */ (function (_super) {
    tslib_1.__extends(WindowCloseActionDirective, _super);
    function WindowCloseActionDirective(el, renderer, _service, localization, ngZone) {
        var _this = _super.call(this, el, renderer, null, localization, ngZone) || this;
        _this.buttonType = 'button';
        _this.window = _service;
        _this.look = 'bare';
        _this.icon = 'close';
        return _this;
    }
    /**
     * @hidden
     */
    WindowCloseActionDirective.prototype.onClick = function () {
        if (!this.isDisabled) {
            this.window.closeAction();
        }
    };
    WindowCloseActionDirective.decorators = [
        { type: core_1.Directive, args: [{
                    exportAs: 'kendoWindowCloseAction',
                    providers: [
                        kendo_angular_l10n_1.LocalizationService,
                        {
                            provide: kendo_angular_l10n_1.L10N_PREFIX,
                            useValue: 'kendo.button'
                        }
                    ],
                    selector: 'button[kendoWindowCloseAction]' // tslint:disable-line
                },] },
    ];
    /** @nocollapse */
    WindowCloseActionDirective.ctorParameters = function () { return [
        { type: core_1.ElementRef },
        { type: core_1.Renderer2 },
        { type: drag_resize_service_1.DragResizeService, decorators: [{ type: core_1.Optional }] },
        { type: kendo_angular_l10n_1.LocalizationService },
        { type: core_1.NgZone }
    ]; };
    WindowCloseActionDirective.propDecorators = {
        window: [{ type: core_1.Input }],
        buttonType: [{ type: core_1.HostBinding, args: ['attr.type',] }],
        onClick: [{ type: core_1.HostListener, args: ['click',] }]
    };
    return WindowCloseActionDirective;
}(kendo_angular_buttons_1.Button));
exports.WindowCloseActionDirective = WindowCloseActionDirective;
