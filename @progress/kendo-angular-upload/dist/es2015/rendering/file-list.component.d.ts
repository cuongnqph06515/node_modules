/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { OnDestroy, QueryList } from '@angular/core';
import { FileInfo } from '../types';
import { FileTemplateDirective } from '../templates/file-template.directive';
import { FileListItemDirective } from './file-list-item';
import { NavigationService } from '../navigation.service';
import { UploadService } from '../upload.service';
/**
 * @hidden
 */
export declare class FileListComponent implements OnDestroy {
    private uploadService;
    private navigation;
    disabled: boolean;
    fileList: Array<Array<FileInfo>>;
    fileTemplate: FileTemplateDirective;
    fileListItems: QueryList<FileListItemDirective>;
    private focusSubscription;
    private actionSubscription;
    constructor(uploadService: UploadService, navigation: NavigationService);
    onItemFocus(): void;
    onItemAction(): void;
    itemActionHandler(key: number): void;
    hasDelete(item: FileListItemDirective): boolean;
    ngOnDestroy(): void;
}
