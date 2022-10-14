/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { NgModule } from '@angular/core';
import { FileSelectComponent } from './fileselect.component';
import { SharedModule, PUBLIC_DIRECTIVES } from './shared.module';
const FILESELECT_DECLARATIONS = [
    FileSelectComponent
];
/**
 * Represents the [NgModule](https://angular.io/api/core/NgModule) definition for the FileSelect component.
 */
export class FileSelectModule {
}
FileSelectModule.decorators = [
    { type: NgModule, args: [{
                declarations: [FILESELECT_DECLARATIONS],
                exports: [
                    PUBLIC_DIRECTIVES,
                    FILESELECT_DECLARATIONS
                ],
                imports: [SharedModule]
            },] },
];
