/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { NgModule } from '@angular/core';
import { UploadComponent } from './upload.component';
import { UploadActionButtonsComponent } from './rendering/upload-action-buttons.component';
import { UploadStatusTotalComponent } from './rendering/upload-status-total.component';
import { SharedModule, PUBLIC_DIRECTIVES } from './shared.module';
const UPLOAD_DECLARATIONS = [
    UploadComponent,
    UploadActionButtonsComponent,
    UploadStatusTotalComponent
];
/**
 * Represents the [NgModule](https://angular.io/api/core/NgModule) definition for the Upload component.
 */
export class UploadModule {
}
UploadModule.decorators = [
    { type: NgModule, args: [{
                declarations: [UPLOAD_DECLARATIONS],
                exports: [
                    PUBLIC_DIRECTIVES,
                    UPLOAD_DECLARATIONS
                ],
                imports: [SharedModule]
            },] },
];
