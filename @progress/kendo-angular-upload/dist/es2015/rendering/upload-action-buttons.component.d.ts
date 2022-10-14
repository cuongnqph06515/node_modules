/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { ElementRef, OnDestroy } from '@angular/core';
import { UploadService } from '../upload.service';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { NavigationService } from '../navigation.service';
import { ActionsLayout } from '../common/action-buttons-layout';
/**
 * @hidden
 */
export declare class UploadActionButtonsComponent implements OnDestroy {
    private uploadService;
    private localization;
    private navigation;
    disabled: boolean;
    actionsLayout: ActionsLayout;
    clearButton: ElementRef;
    uploadButton: ElementRef;
    hostDefaultClass: boolean;
    readonly actionButtonsEndClassName: boolean;
    readonly actionButtonsStretchedClassName: boolean;
    readonly actionButtonsStartClassName: boolean;
    readonly actionButtonsCenterClassName: boolean;
    private actionSubscription;
    private focusSubscription;
    constructor(uploadService: UploadService, localization: LocalizationService, navigation: NavigationService);
    onAction(): void;
    onFocus(): void;
    focusButton(button: string): void;
    ngOnDestroy(): void;
    performUpload(_event?: any): void;
    clearFiles(_event?: any): void;
    textFor(key: string): string;
}
