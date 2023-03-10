/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
/**
 * @hidden
 */
var LoadingComponent = /** @class */ (function () {
    function LoadingComponent(localization) {
        this.localization = localization;
        this.hostClass = true;
    }
    Object.defineProperty(LoadingComponent.prototype, "loadingText", {
        get: function () {
            return this.localization.get('loading');
        },
        enumerable: true,
        configurable: true
    });
    LoadingComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: '[kendoGridLoading]',
                    template: "\n        <span class=\"k-loading-text\">{{ loadingText }}</span>\n        <div class=\"k-loading-image\"></div>\n        <div class=\"k-loading-color\"></div>\n    "
                },] },
    ];
    /** @nocollapse */
    LoadingComponent.ctorParameters = function () { return [
        { type: kendo_angular_l10n_1.LocalizationService }
    ]; };
    LoadingComponent.propDecorators = {
        hostClass: [{ type: core_1.HostBinding, args: ['class.k-loading-mask',] }]
    };
    return LoadingComponent;
}());
exports.LoadingComponent = LoadingComponent;
