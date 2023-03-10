/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/* tslint:disable:component-selector */
import { Input, Component, ViewChildren, QueryList } from '@angular/core';
import { Keys } from '@progress/kendo-angular-common';
import { FileState } from '../types';
import { FileTemplateDirective } from '../templates/file-template.directive';
import { FileListItemDirective } from './file-list-item';
import { NavigationService } from '../navigation.service';
import { UploadService } from '../upload.service';
/**
 * @hidden
 */
export class FileListComponent {
    constructor(uploadService, navigation) {
        this.uploadService = uploadService;
        this.navigation = navigation;
        this.onItemFocus();
        this.onItemAction();
    }
    onItemFocus() {
        this.focusSubscription = this.navigation.onFileFocus.subscribe((index) => {
            this.fileListItems.toArray()[index].focus();
        });
    }
    onItemAction() {
        this.actionSubscription = this.navigation.onFileAction.subscribe((key) => {
            this.itemActionHandler(key);
        });
    }
    itemActionHandler(key) {
        let index = this.navigation.focusedIndex;
        let item = this.fileListItems.toArray()[index];
        let uid = item.uidAttribute;
        let files = this.uploadService.files.get(uid);
        if (key === Keys.Escape && files[0].state === FileState.Uploading) {
            this.uploadService.cancelFiles(uid);
            this.navigation.focusSelectButton();
            return;
        }
        if (key === Keys.Enter && files[0].state === FileState.Failed) {
            this.uploadService.retryFiles(uid);
            return;
        }
        if (key === Keys.Delete) {
            if (files[0].state === FileState.Uploading) {
                this.uploadService.cancelFiles(uid);
            }
            else if (this.hasDelete(item)) {
                this.uploadService.removeFiles(uid);
            }
            this.navigation.focusSelectButton();
        }
    }
    hasDelete(item) {
        return item.element.nativeElement.getElementsByClassName('k-delete').length > 0;
    }
    ngOnDestroy() {
        this.focusSubscription.unsubscribe();
        this.actionSubscription.unsubscribe();
    }
}
FileListComponent.decorators = [
    { type: Component, args: [{
                selector: '[kendo-upload-file-list]',
                template: `
    <ng-template ngFor
      [ngForOf]="fileList"
      let-files
      let-index="index">
      <li kendoUploadFileListItem [files]='files' [index]='index'>
          <kendo-upload-file-list-single-item
            class='k-file-single'
            *ngIf='files.length === 1 && !fileTemplate'
            [disabled]='disabled'
            [file]='files[0]'>
          </kendo-upload-file-list-single-item>
          <kendo-upload-file-list-multiple-items
            class='k-file-multiple'
            *ngIf='files.length > 1 && !fileTemplate'
            [disabled]='disabled'
            [files]='files'>
          </kendo-upload-file-list-multiple-items>
          <ng-template *ngIf="fileTemplate"
              [templateContext]="{
                templateRef: fileTemplate.templateRef,
                state: files[0].state,
                $implicit: files
              }"></ng-template>
      </li>
    </ng-template>
    `
            },] },
];
/** @nocollapse */
FileListComponent.ctorParameters = () => [
    { type: UploadService },
    { type: NavigationService }
];
FileListComponent.propDecorators = {
    disabled: [{ type: Input }],
    fileList: [{ type: Input }],
    fileTemplate: [{ type: Input }],
    fileListItems: [{ type: ViewChildren, args: [FileListItemDirective,] }]
};
