/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ElementRef } from '@angular/core';
import { Direction } from './types/direction';
import { FileRestrictions } from './types';
import { NavigationService } from './navigation.service';
import { UploadService } from './upload.service';
/**
 * @hidden
 */
export declare class FileSelectDirective {
    private uploadService;
    private navigation;
    dir: Direction;
    disabled: boolean;
    multiple: boolean;
    restrictions: FileRestrictions;
    type: string;
    autocomplete: string;
    tabIndex: number;
    element: ElementRef;
    constructor(uploadService: UploadService, navigation: NavigationService, el: ElementRef);
    readonly nameAttribute: string;
    readonly multipleAttribute: string;
    readonly dirAttribute: string;
    readonly disabledAttribute: string;
    onInputChange(event: any): void;
}
