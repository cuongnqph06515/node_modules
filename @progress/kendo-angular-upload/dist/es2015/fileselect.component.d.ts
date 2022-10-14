/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { OnDestroy, Renderer2, ElementRef, EventEmitter, NgZone, OnInit, ChangeDetectorRef } from "@angular/core";
import { FileRestrictions, FileInfo } from './types';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { UploadService } from './upload.service';
import { FileMap } from './types/file-map';
import { Direction } from './types/direction';
import { RemoveEvent, SelectEvent } from './events';
import { NavigationService } from './navigation.service';
import { FileTemplateDirective } from './templates/file-template.directive';
import { DropZoneService } from './dropzone.service';
/**
 * @hidden
 */
export declare const FILESELECT_VALUE_ACCESSOR: any;
export declare class FileSelectComponent implements OnInit, OnDestroy {
    private uploadService;
    private localization;
    private navigation;
    private dropZoneService;
    private ngZone;
    private renderer;
    private cdr;
    /**
     * Sets the `accept` attribute of the `input` element of the FileSelect.
     */
    accept: string;
    /**
     * Disables the FileSelect.
     * The default value is `false`.
     */
    disabled: boolean;
    /**
     * Enables the selection of multiple files
     * ([see example]({% slug fileprocessing_upload %}#toc-upload-of-sinlge-or-multiple-files)).
     * If set to `false`, only one file can be selected at a time.
     */
    multiple: boolean;
    /**
     * Sets the `name` attribute of the `input` element of the FileSelect.
     */
    name: string;
    /**
     * Toggles the visibility of the file list.
     */
    showFileList: boolean;
    /**
     * Specifies the [`tabindex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) of the FileSelect.
     */
    tabindex: number;
    /**
     * Sets the restrictions for selected files.
     */
    restrictions: FileRestrictions;
    /**
     * Specifies the id of the external drop zone to associate with the FileSelect.
     */
    zoneId: string;
    /**
     * @hidden
     */
    focusableId: string;
    fileTemplate: FileTemplateDirective;
    fileSelect: ElementRef;
    fileSelectButton: ElementRef;
    /**
     * Fires when the user navigates outside the component.
     */
    onBlur: EventEmitter<any>;
    /**
     * Fires when the component is focused.
     */
    onFocus: EventEmitter<any>;
    /**
     * Fires when files are selected. If prevented, the selected files will not be added to the list.
     */
    select: EventEmitter<SelectEvent>;
    /**
     * Fires when a file is about to be removed. If prevented, the file will remain in the list.
     */
    remove: EventEmitter<RemoveEvent>;
    /**
     * Fires when the value of the component has changed as a result of a successful `select` or `remove` operation.
     */
    valueChange: EventEmitter<Array<File>>;
    hostDefaultClasses: boolean;
    readonly hostDisabledClass: boolean;
    readonly dir: string;
    /**
     * @hidden
     */
    _restrictions: FileRestrictions;
    /**
     * @hidden
     */
    fileList: FileMap;
    direction: Direction;
    private wrapper;
    private documentClick;
    private blurSubscription;
    private wrapperFocusSubscription;
    private selectButtonFocusSubscription;
    private localizationChangeSubscription;
    private subs;
    constructor(uploadService: UploadService, localization: LocalizationService, navigation: NavigationService, dropZoneService: DropZoneService, ngZone: NgZone, renderer: Renderer2, cdr: ChangeDetectorRef, wrapper: ElementRef);
    ngOnInit(): void;
    /**
     * @hidden
     */
    textFor(key: string): string;
    /**
     * Focuses the underlying input element.
     */
    focus(): void;
    ngOnDestroy(): void;
    /**
     * @hidden
     */
    handleKeydown(event: any): void;
    /**
     * @hidden
     */
    writeValue(newValue: any): void;
    protected onTouchedCallback: Function;
    protected onChangeCallback: Function;
    /**
     * @hidden
     */
    registerOnChange(fn: any): void;
    /**
     * @hidden
     */
    registerOnTouched(fn: any): void;
    /**
     * @hidden
     */
    setDisabledState(isDisabled: boolean): void;
    /**
     * Removes specific file from the file list.
     */
    removeFileByUid(uid: string): void;
    /**
     * Visually clears all files from the UI.
     */
    clearFiles(): void;
    /**
     * @hidden
     * Used to determine if the component is empty.
     */
    isEmpty(): boolean;
    /**
     * @hidden
     * Used by the external dropzone to add files to the FileSelect
     */
    addFiles(files: FileInfo[]): void;
    /**
     * @hidden
     */
    readonly selectButtonTabIndex: number;
    /**
     * @hidden
     */
    onFileSelectButtonFocus(_event?: any): void;
    /**
     * @hidden
     */
    onFileSelectButtonBlur(_event?: any): void;
    private subscribeBlur;
    private subscribeFocus;
    private attachEventHandlers;
    private setDefaultSettings;
}
