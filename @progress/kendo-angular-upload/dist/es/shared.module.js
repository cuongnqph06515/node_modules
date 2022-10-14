/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomMessagesComponent } from './localization/custom-messages.component';
import { DropZoneInternalDirective } from './dropzone-internal.directive';
import { FileListComponent } from './rendering/file-list.component';
import { FileListItemDirective } from './rendering/file-list-item';
import { FileListItemActionButtonComponent } from './rendering/file-list-item-action-button.component';
import { FileListMultipleItemsComponent } from './rendering/file-list-multiple-items.component';
import { FileListSingleItemComponent } from './rendering/file-list-single-item.component';
import { FileSelectDirective } from './file-select.directive';
import { FileTemplateDirective } from './templates/file-template.directive';
import { LocalizedMessagesDirective } from './localization/localized-messages.directive';
import { TemplateContextDirective } from './templates/template-context.directive';
import { UploadDropZoneDirective } from './dropzone-external.directive';
import { UploadDropZoneComponent } from './dropzone.component';
/**
 * @hidden
 */
export var SHARED_DECLARATIONS = [
    DropZoneInternalDirective,
    FileListComponent,
    FileListItemDirective,
    FileListItemActionButtonComponent,
    FileListMultipleItemsComponent,
    FileListSingleItemComponent,
    FileSelectDirective,
    LocalizedMessagesDirective,
    TemplateContextDirective
];
/**
 * @hidden
 */
export var PUBLIC_DIRECTIVES = [
    FileTemplateDirective,
    CustomMessagesComponent,
    UploadDropZoneDirective,
    UploadDropZoneComponent
];
/**
 * @hidden
 */
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        PUBLIC_DIRECTIVES,
                        SHARED_DECLARATIONS
                    ],
                    exports: [
                        PUBLIC_DIRECTIVES,
                        SHARED_DECLARATIONS,
                        CommonModule
                    ],
                    imports: [CommonModule]
                },] },
    ];
    return SharedModule;
}());
export { SharedModule };
