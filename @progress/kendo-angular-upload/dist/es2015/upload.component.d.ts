/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { HttpHeaders } from '@angular/common/http';
import { ElementRef, EventEmitter, NgZone, OnDestroy, OnInit, Renderer2, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { LocalizationService } from '@progress/kendo-angular-l10n';
import { Direction } from './types/direction';
import { FileInfo, FileRestrictions } from './types';
import { FileMap } from './types/file-map';
import { NavigationService } from './navigation.service';
import { FileTemplateDirective } from './templates/file-template.directive';
import { CancelEvent, ClearEvent, ErrorEvent, RemoveEvent, SelectEvent, SuccessEvent, UploadEvent, UploadProgressEvent } from './events';
import { UploadService } from './upload.service';
import { ChunkSettings } from './types/chunk-settings';
import { DropZoneService } from './dropzone.service';
import { ActionsLayout } from './common/action-buttons-layout';
/**
 * @hidden
 */
export declare const UPLOAD_VALUE_ACCESSOR: any;
/**
 * Represents the [Kendo UI Upload component for Angular]({% slug overview_upload %}).
 */
export declare class UploadComponent implements OnInit, OnDestroy, ControlValueAccessor {
    private uploadService;
    private localization;
    private navigation;
    private dropZoneService;
    private _ngZone;
    private renderer;
    private cdr;
    /**
     * By default, the selected files are immediately uploaded
     * ([see example]({% slug fileprocessing_upload %}#toc-automatic-upload-of-files)).
     * To change this behavior, set `autoUpload` to `false`.
     */
    autoUpload: boolean;
    /**
     * When enabled, all files in the selection are uploaded in one request
     * ([see example]({% slug fileprocessing_upload %}#toc-upload-of-batches-of-files)).
     * Any files that are selected one after the other are uploaded in separate requests.
     */
    batch: boolean;
    /**
     * Configures whether credentials (cookies, headers) will be sent for cross-site requests
     * ([see example]({% slug credentials_upload %}#toc-attaching-credentials-to-requests)).
     * The default values is `true`. Setting `withCredentials` has no effect on same-site requests.
     * To add credentials to the request, use the `saveHeaders` or `removeHeaders` property,
     * or the [`upload`]({% slug api_upload_uploadevent %}) event.
     */
    withCredentials: boolean;
    /**
     * Sets the [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData) key which contains the files submitted to `saveUrl`.
     * The default value is `files`.
     */
    saveField: string;
    /**
     * Configures the [`HttpHeaders`](https://angular.io/api/common/http/HttpHeaders)
     * that are attached to each upload request.
     */
    saveHeaders: HttpHeaders;
    /**
     * Sets the [`RequestMethod`](https://angular.io/api/http/RequestMethod) of the upload request.
     * The default value is `POST`.
     */
    saveMethod: string;
    /**
     * Sets the URL of the endpoint for the upload request.
     * The request [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData) key is named after the `saveField` property.
     * It contains the list of files to be uploaded.
     */
    saveUrl: string;
    /**
     * Sets the expected [`response type`](https://angular.io/api/common/http/HttpRequest#responseType) of the server.
     * It is used to parse the response appropriately.
     * The default value is `json`.
     */
    responseType: 'arraybuffer' | 'blob' | 'json' | 'text';
    /**
     * Sets the [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData) key
     * which contains the list of file names that are submitted to `removeUrl`.
     * The default value is `fileNames`.
     */
    removeField: string;
    /**
     * Configures the [`HttpHeaders`](https://angular.io/api/common/http/HttpHeaders)
     * that are attached to each `remove` request.
     */
    removeHeaders: HttpHeaders;
    /**
     * Sets the [`RequestMethod`](https://angular.io/api/http/RequestMethod) of the `remove` request.
     * The default value is `POST`.
     */
    removeMethod: string;
    /**
     * Sets the URL of the endpoint for the `remove` request.
     * The [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData) request key is named after the `removeField` property.
     * It contains the list of file names which will be removed.
     */
    removeUrl: string;
    /**
     * Enables the chunk functionality of the Upload.
     *
     * The default value is `false`.
     */
    chunkable: ChunkSettings | boolean;
    /**
     * Specifies if the selected files are uploaded simultaneously or one by one.
     *
     * The default value is `true`.
     */
    concurrent: boolean;
    /**
     * Enables the selection of multiple files
     * ([see example]({% slug fileprocessing_upload %}#toc-upload-of-sinlge-or-multiple-files)).
     * If set to `false`, only one file can be selected at a time.
     */
    multiple: boolean;
    /**
     * Disables the Upload ([see example]({% slug disabledstate_upload %})).
     * The default value is `false`.
     */
    disabled: boolean;
    /**
     * Toggles the visibility of the file list.
     */
    showFileList: boolean;
    /**
     * Specifies the [`tabindex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) of the component.
     */
    tabindex: number;
    /**
     * Specifies the id of the external drop zone to associate with the Upload.
     */
    zoneId: string;
    /**
     * @hidden
     */
    tabIndex: number;
    /**
     * Sets the `accept` attribute of the `input` element of the Upload.
     */
    accept: string;
    /**
     * Sets the restrictions for selected files ([see example]({% slug api_upload_filerestrictions %})).
     */
    restrictions: FileRestrictions;
    /**
     * @hidden
     */
    focusableId: string;
    /**
     * Specifies the possible layout of the action buttons.
     */
    actionsLayout: ActionsLayout;
    fileTemplate: FileTemplateDirective;
    fileSelect: ElementRef;
    fileSelectButton: ElementRef;
    /**
     * Fires when the user navigates outside the component.
     */
    onBlur: EventEmitter<any>;
    /**
     * Fires when the upload is canceled while in progress.
     */
    cancel: EventEmitter<CancelEvent>;
    /**
     * Fires when the file list is about to be cleared. If prevented, the files will not be cleared.
     */
    clear: EventEmitter<ClearEvent>;
    /**
     * Fires when all active uploads are completed either successfully or with errors.
     */
    complete: EventEmitter<any>;
    /**
     * Fires when an `upload` or `remove` operation has failed.
     */
    error: EventEmitter<ErrorEvent>;
    /**
     * Fires when the component is focused.
     */
    onFocus: EventEmitter<any>;
    /**
     * Fires when the upload of a file has been paused.
     */
    pause: EventEmitter<any>;
    /**
     * Fires when an uploaded file is about to be removed. If prevented, the files will remain in the list.
     */
    remove: EventEmitter<RemoveEvent>;
    /**
     * Fires when the upload of a file has been resumed.
     */
    resume: EventEmitter<any>;
    /**
     * Fires when files are selected. If prevented, the selected files will not be added to the list.
     */
    select: EventEmitter<SelectEvent>;
    /**
     * Fires when an `upload` or `remove` operation is successfully completed.
     */
    success: EventEmitter<SuccessEvent>;
    /**
     * Fires when one or more files are about to be uploaded. If prevented, the files will neither be uploaded, nor added to the file list.
     */
    upload: EventEmitter<UploadEvent>;
    /**
     * Fires when one or more files are being uploaded.
     */
    uploadProgress: EventEmitter<UploadProgressEvent>;
    /**
     * Fires when the value of the component has changed as a result of a successful `upload`, `remove` or `clear` operation.
     */
    valueChange: EventEmitter<Array<FileInfo>>;
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
    constructor(uploadService: UploadService, localization: LocalizationService, navigation: NavigationService, dropZoneService: DropZoneService, _ngZone: NgZone, renderer: Renderer2, cdr: ChangeDetectorRef, wrapper: ElementRef);
    ngOnInit(): void;
    ngOnChanges(changes: any): void;
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
    /**
     * @hidden
     */
    readonly showActionButtons: boolean;
    /**
     * @hidden
     */
    readonly showTotalStatus: boolean;
    /**
     * @hidden
     */
    textFor(key: string): string;
    /**
     * Focuses the underlying input element.
     */
    focus(): void;
    /**
     * @hidden
     * @deprecated
     */
    focusComponent(): void;
    /**
     * Blurs the Upload if it was previously focused.
     */
    blur(): void;
    /**
     * @hidden
     * @deprecated
     */
    blurComponent(): void;
    /**
     * Pauses the upload process of a file that is currently uploading.
     * The `pauseFileByUid` method requires the `chunkable` option of the Upload to be enabled.
     *
     * @param uid - The `uid` of the file that will be paused.
     */
    pauseFileByUid(uid: string): void;
    /**
     * Resumes the upload process for a file that has been previously paused.
     * The `resumeFileByUid` method requires the `chunkable` option of the Upload to be enabled.
     *
     * @param uid - The `uid` of the file that will be resumed.
     */
    resumeFileByUid(uid: string): void;
    /**
     * Triggers the removal of a file or a batch of files.
     * @param uid - The `uid` of the file or a batch of files that will be removed.
     */
    removeFilesByUid(uid: string): void;
    /**
     * Triggers another upload attempt of an unsuccessfully uploaded file or a batch of files.
     * @param uid - The `uid` of the file or a batch of files to be retried.
     */
    retryUploadByUid(uid: string): void;
    /**
     * Cancels the upload of a file or a batch of files.
     * @param uid - The `uid` of the file or a batch of files that will be canceled.
     */
    cancelUploadByUid(uid: string): void;
    /**
     * Uploads the currently selected files which pass the set restrictions.
     */
    uploadFiles(): void;
    /**
     * Visually clears all files from the UI without issuing requests to the remove handler.
     */
    clearFiles(): void;
    /**
     * @hidden
     * Used by the external dropzone to add files to the Upload
     */
    addFiles(files: FileInfo[]): void;
    /**
     * @hidden
     * Used to determine if the component is empty.
     */
    isEmpty(): boolean;
    private verifySettings;
    private subscribeBlur;
    private subscribeFocus;
    private attachEventHandlers;
}
