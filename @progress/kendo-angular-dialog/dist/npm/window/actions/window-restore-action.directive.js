/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var drag_resize_service_1 = require("./../drag-resize.service");
var kendo_angular_buttons_1 = require("@progress/kendo-angular-buttons");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
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
        { type: core_1.Directive, args: [{
                    exportAs: 'kendoWindowRestoreAction',
                    providers: [
                        kendo_angular_l10n_1.LocalizationService,
                        {
                            provide: kendo_angular_l10n_1.L10N_PREFIX,
                            useValue: 'kendo.button'
                        }
                    ],
                    selector: 'button[kendoWindowRestoreAction]' // tslint:disable-line
                },] },
    ];
    /** @nocollapse */
    WindowRestoreActionDirective.ctorParameters = function () { return [
        { type: core_1.ElementRef },
        { type: core_1.Renderer2 },
        { type: drag_resize_service_1.DragResizeService, decorators: [{ type: core_1.Optional }] },
        { type: kendo_angular_l10n_1.LocalizationService },
        { type: core_1.NgZone }
    ]; };
    WindowRestoreActionDirective.propDecorators = {
        window: [{ type: core_1.Input }],
        buttonType: [{ type: core_1.HostBinding, args: ['attr.type',] }],
        onClick: [{ type: core_1.HostListener, args: ['click',] }],
        visible: [{ type: core_1.HostBinding, args: ['style.display',] }]
    };
    return WindowRestoreActionDirective;
}(kendo_angular_buttons_1.Button));
exports.WindowRestoreActionDirective = WindowRestoreActionDirective;
