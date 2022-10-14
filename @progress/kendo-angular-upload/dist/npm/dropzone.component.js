/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var dropzone_base_1 = require("./dropzone-base");
/* tslint:disable: no-use-before-declare */
/**
 * Represents the [Kendo UI UploadDropZone component for Angular]({% slug overview_upload %}).
 */
var UploadDropZoneComponent = /** @class */ (function (_super) {
    tslib_1.__extends(UploadDropZoneComponent, _super);
    function UploadDropZoneComponent(element, renderer, localization) {
        var _this = _super.call(this, element, renderer, 'k-external-dropzone-hover') || this;
        _this.localization = localization;
        _this.hostClass = true;
        _this.localizationChangeSubscription = _this.localization.changes.subscribe(function (_a) {
            var rtl = _a.rtl;
            _this.direction = rtl ? 'rtl' : 'ltr';
        });
        return _this;
    }
    Object.defineProperty(UploadDropZoneComponent.prototype, "dirAttribute", {
        get: function () {
            return this.direction;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    UploadDropZoneComponent.prototype.textFor = function (key) {
        return this.localization.get(key);
    };
    Object.defineProperty(UploadDropZoneComponent.prototype, "iconClasses", {
        /**
         * @hidden
         */
        get: function () {
            if (this.icon) {
                return "k-icon k-i-" + this.icon;
            }
            if (this.iconClass) {
                return "" + this.iconClass;
            }
            return 'k-icon k-i-upload';
        },
        enumerable: true,
        configurable: true
    });
    UploadDropZoneComponent.prototype.ngOnDestroy = function () {
        if (this.localizationChangeSubscription) {
            this.localizationChangeSubscription.unsubscribe();
        }
    };
    UploadDropZoneComponent.decorators = [
        { type: core_1.Component, args: [{
                    exportAs: 'kendoUploadDropZone',
                    providers: [
                        kendo_angular_l10n_1.LocalizationService,
                        {
                            provide: kendo_angular_l10n_1.L10N_PREFIX,
                            useValue: 'kendo.uploaddropzone'
                        }
                    ],
                    selector: 'kendo-uploaddropzone',
                    template: "\n    <ng-container kendoUploadDropZoneLocalizedMessages\n      i18n-externalDropFilesHere='kendo.uploaddropzone.externalDropFilesHere|Sets the external drop-zone hint'\n      externalDropFilesHere='Drag and drop files here to upload'\n    >\n    </ng-container>\n    <div class='k-dropzone-inner' [kendoUploadDropZone]=\"zoneId\">\n      <span [ngClass]=\"iconClasses\"></span>\n      <span class=\"k-dropzone-hint\">{{ textFor('externalDropFilesHere') }}</span>\n      <span class=\"k-dropzone-note\">\n        <ng-content></ng-content>\n      </span>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    UploadDropZoneComponent.ctorParameters = function () { return [
        { type: core_1.ElementRef },
        { type: core_1.Renderer2 },
        { type: kendo_angular_l10n_1.LocalizationService }
    ]; };
    UploadDropZoneComponent.propDecorators = {
        hostClass: [{ type: core_1.HostBinding, args: ['class.k-external-dropzone',] }],
        dirAttribute: [{ type: core_1.HostBinding, args: ['attr.dir',] }],
        zoneId: [{ type: core_1.Input }],
        icon: [{ type: core_1.Input }],
        iconClass: [{ type: core_1.Input }]
    };
    return UploadDropZoneComponent;
}(dropzone_base_1.DropZoneBase));
exports.UploadDropZoneComponent = UploadDropZoneComponent;
