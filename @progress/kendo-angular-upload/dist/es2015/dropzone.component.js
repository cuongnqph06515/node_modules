/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, ElementRef, HostBinding, Input, Renderer2 } from '@angular/core';
import { L10N_PREFIX, LocalizationService } from '@progress/kendo-angular-l10n';
import { DropZoneBase } from './dropzone-base';
/* tslint:disable: no-use-before-declare */
/**
 * Represents the [Kendo UI UploadDropZone component for Angular]({% slug overview_upload %}).
 */
export class UploadDropZoneComponent extends DropZoneBase {
    constructor(element, renderer, localization) {
        super(element, renderer, 'k-external-dropzone-hover');
        this.localization = localization;
        this.hostClass = true;
        this.localizationChangeSubscription = this.localization.changes.subscribe(({ rtl }) => {
            this.direction = rtl ? 'rtl' : 'ltr';
        });
    }
    get dirAttribute() {
        return this.direction;
    }
    /**
     * @hidden
     */
    textFor(key) {
        return this.localization.get(key);
    }
    /**
     * @hidden
     */
    get iconClasses() {
        if (this.icon) {
            return `k-icon k-i-${this.icon}`;
        }
        if (this.iconClass) {
            return `${this.iconClass}`;
        }
        return 'k-icon k-i-upload';
    }
    ngOnDestroy() {
        if (this.localizationChangeSubscription) {
            this.localizationChangeSubscription.unsubscribe();
        }
    }
}
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
                template: `
    <ng-container kendoUploadDropZoneLocalizedMessages
      i18n-externalDropFilesHere='kendo.uploaddropzone.externalDropFilesHere|Sets the external drop-zone hint'
      externalDropFilesHere='Drag and drop files here to upload'
    >
    </ng-container>
    <div class='k-dropzone-inner' [kendoUploadDropZone]="zoneId">
      <span [ngClass]="iconClasses"></span>
      <span class="k-dropzone-hint">{{ textFor('externalDropFilesHere') }}</span>
      <span class="k-dropzone-note">
        <ng-content></ng-content>
      </span>
    </div>
  `
            },] },
];
/** @nocollapse */
UploadDropZoneComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: LocalizationService }
];
UploadDropZoneComponent.propDecorators = {
    hostClass: [{ type: HostBinding, args: ['class.k-external-dropzone',] }],
    dirAttribute: [{ type: HostBinding, args: ['attr.dir',] }],
    zoneId: [{ type: Input }],
    icon: [{ type: Input }],
    iconClass: [{ type: Input }]
};
