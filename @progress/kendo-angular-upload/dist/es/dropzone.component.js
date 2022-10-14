/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
import { Component, ElementRef, HostBinding, Input, Renderer2 } from '@angular/core';
import { L10N_PREFIX, LocalizationService } from '@progress/kendo-angular-l10n';
import { DropZoneBase } from './dropzone-base';
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
        { type: Component, args: [{
                    exportAs: 'kendoUploadDropZone',
                    providers: [
                        LocalizationService,
                        {
                            provide: L10N_PREFIX,
                            useValue: 'kendo.uploaddropzone'
                        }
                    ],
                    selector: 'kendo-uploaddropzone',
                    template: "\n    <ng-container kendoUploadDropZoneLocalizedMessages\n      i18n-externalDropFilesHere='kendo.uploaddropzone.externalDropFilesHere|Sets the external drop-zone hint'\n      externalDropFilesHere='Drag and drop files here to upload'\n    >\n    </ng-container>\n    <div class='k-dropzone-inner' [kendoUploadDropZone]=\"zoneId\">\n      <span [ngClass]=\"iconClasses\"></span>\n      <span class=\"k-dropzone-hint\">{{ textFor('externalDropFilesHere') }}</span>\n      <span class=\"k-dropzone-note\">\n        <ng-content></ng-content>\n      </span>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    UploadDropZoneComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: LocalizationService }
    ]; };
    UploadDropZoneComponent.propDecorators = {
        hostClass: [{ type: HostBinding, args: ['class.k-external-dropzone',] }],
        dirAttribute: [{ type: HostBinding, args: ['attr.dir',] }],
        zoneId: [{ type: Input }],
        icon: [{ type: Input }],
        iconClass: [{ type: Input }]
    };
    return UploadDropZoneComponent;
}(DropZoneBase));
export { UploadDropZoneComponent };
