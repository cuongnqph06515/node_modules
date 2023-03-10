/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { HttpHeaders } from '@angular/common/http';
import { Component, ContentChild, ElementRef, EventEmitter, forwardRef, HostBinding, HostListener, Input, NgZone, Output, Renderer2, ViewChild, isDevMode, ChangeDetectorRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { guid, isDocumentAvailable, KendoInput, Keys, isChanged } from '@progress/kendo-angular-common';
import { L10N_PREFIX, LocalizationService } from '@progress/kendo-angular-l10n';
import { fromEvent, merge } from 'rxjs';
import { filter } from 'rxjs/operators';
import { FileState } from './types';
import { NavigationService } from './navigation.service';
import { FileTemplateDirective } from './templates/file-template.directive';
import { UploadService } from './upload.service';
import { hasClasses, IGNORE_TARGET_CLASSES, isFocusable, UPLOAD_CLASSES, validateInitialFileInfo } from './common/util';
import { DropZoneService } from './dropzone.service';
/* tslint:disable: no-use-before-declare */
/**
 * @hidden
 */
export const UPLOAD_VALUE_ACCESSOR = {
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => UploadComponent) // tslint:disable-line:no-forward-ref
};
/**
 * Represents the [Kendo UI Upload component for Angular]({% slug overview_upload %}).
 */
export class UploadComponent {
    constructor(uploadService, localization, navigation, dropZoneService, _ngZone, renderer, cdr, wrapper) {
        this.uploadService = uploadService;
        this.localization = localization;
        this.navigation = navigation;
        this.dropZoneService = dropZoneService;
        this._ngZone = _ngZone;
        this.renderer = renderer;
        this.cdr = cdr;
        /**
         * Enables the chunk functionality of the Upload.
         *
         * The default value is `false`.
         */
        this.chunkable = false;
        /**
         * Enables the selection of multiple files
         * ([see example]({% slug fileprocessing_upload %}#toc-upload-of-sinlge-or-multiple-files)).
         * If set to `false`, only one file can be selected at a time.
         */
        this.multiple = true;
        /**
         * Disables the Upload ([see example]({% slug disabledstate_upload %})).
         * The default value is `false`.
         */
        this.disabled = false;
        /**
         * Toggles the visibility of the file list.
         */
        this.showFileList = true;
        /**
         * Specifies the [`tabindex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) of the component.
         */
        this.tabindex = 0;
        /**
         * @hidden
         */
        this.focusableId = `k-${guid()}`;
        /**
         * Specifies the possible layout of the action buttons.
         */
        this.actionsLayout = 'end';
        /**
         * Fires when the user navigates outside the component.
         */
        this.onBlur = new EventEmitter();
        /**
         * Fires when the upload is canceled while in progress.
         */
        this.cancel = new EventEmitter();
        /**
         * Fires when the file list is about to be cleared. If prevented, the files will not be cleared.
         */
        this.clear = new EventEmitter();
        /**
         * Fires when all active uploads are completed either successfully or with errors.
         */
        this.complete = new EventEmitter();
        /**
         * Fires when an `upload` or `remove` operation has failed.
         */
        this.error = new EventEmitter();
        /**
         * Fires when the component is focused.
         */
        this.onFocus = new EventEmitter();
        /**
         * Fires when the upload of a file has been paused.
         */
        this.pause = new EventEmitter();
        /**
         * Fires when an uploaded file is about to be removed. If prevented, the files will remain in the list.
         */
        this.remove = new EventEmitter();
        /**
         * Fires when the upload of a file has been resumed.
         */
        this.resume = new EventEmitter();
        /**
         * Fires when files are selected. If prevented, the selected files will not be added to the list.
         */
        this.select = new EventEmitter();
        /**
         * Fires when an `upload` or `remove` operation is successfully completed.
         */
        this.success = new EventEmitter();
        /**
         * Fires when one or more files are about to be uploaded. If prevented, the files will neither be uploaded, nor added to the file list.
         */
        this.upload = new EventEmitter();
        /**
         * Fires when one or more files are being uploaded.
         */
        this.uploadProgress = new EventEmitter();
        /**
         * Fires when the value of the component has changed as a result of a successful `upload`, `remove` or `clear` operation.
         */
        this.valueChange = new EventEmitter();
        this.hostDefaultClasses = true;
        /**
         * @hidden
         */
        this._restrictions = {
            allowedExtensions: [],
            maxFileSize: 0,
            minFileSize: 0
        };
        this.onTouchedCallback = (_) => { };
        this.onChangeCallback = (_) => { };
        this.fileList = this.uploadService.files;
        this.localizationChangeSubscription = localization.changes.subscribe(({ rtl }) => {
            this.direction = rtl ? 'rtl' : 'ltr';
            this.navigation.computeKeys(this.direction);
        });
        this.direction = localization.rtl ? 'rtl' : 'ltr';
        this.navigation.computeKeys(this.direction);
        this.wrapper = wrapper.nativeElement;
        this.subscribeBlur();
        this.subscribeFocus();
        this.attachEventHandlers();
    }
    /**
     * By default, the selected files are immediately uploaded
     * ([see example]({% slug fileprocessing_upload %}#toc-automatic-upload-of-files)).
     * To change this behavior, set `autoUpload` to `false`.
     */
    set autoUpload(autoUpload) {
        this.uploadService.async.autoUpload = autoUpload;
    }
    get autoUpload() {
        return this.uploadService.async.autoUpload;
    }
    /**
     * When enabled, all files in the selection are uploaded in one request
     * ([see example]({% slug fileprocessing_upload %}#toc-upload-of-batches-of-files)).
     * Any files that are selected one after the other are uploaded in separate requests.
     */
    set batch(batch) {
        this.uploadService.async.batch = batch;
    }
    get batch() {
        return this.uploadService.async.batch;
    }
    /**
     * Configures whether credentials (cookies, headers) will be sent for cross-site requests
     * ([see example]({% slug credentials_upload %}#toc-attaching-credentials-to-requests)).
     * The default values is `true`. Setting `withCredentials` has no effect on same-site requests.
     * To add credentials to the request, use the `saveHeaders` or `removeHeaders` property,
     * or the [`upload`]({% slug api_upload_uploadevent %}) event.
     */
    set withCredentials(withCredentials) {
        this.uploadService.async.withCredentials = withCredentials;
    }
    get withCredentials() {
        return this.uploadService.async.withCredentials;
    }
    /**
     * Sets the [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData) key which contains the files submitted to `saveUrl`.
     * The default value is `files`.
     */
    set saveField(saveField) {
        this.uploadService.async.saveField = saveField;
    }
    get saveField() {
        return this.uploadService.async.saveField;
    }
    /**
     * Configures the [`HttpHeaders`](https://angular.io/api/common/http/HttpHeaders)
     * that are attached to each upload request.
     */
    set saveHeaders(saveHeaders) {
        this.uploadService.async.saveHeaders = saveHeaders;
    }
    get saveHeaders() {
        return this.uploadService.async.saveHeaders;
    }
    /**
     * Sets the [`RequestMethod`](https://angular.io/api/http/RequestMethod) of the upload request.
     * The default value is `POST`.
     */
    set saveMethod(saveMethod) {
        this.uploadService.async.saveMethod = saveMethod;
    }
    get saveMethod() {
        return this.uploadService.async.saveMethod;
    }
    /**
     * Sets the URL of the endpoint for the upload request.
     * The request [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData) key is named after the `saveField` property.
     * It contains the list of files to be uploaded.
     */
    set saveUrl(saveUrl) {
        this.uploadService.async.saveUrl = saveUrl;
    }
    get saveUrl() {
        return this.uploadService.async.saveUrl;
    }
    /**
     * Sets the expected [`response type`](https://angular.io/api/common/http/HttpRequest#responseType) of the server.
     * It is used to parse the response appropriately.
     * The default value is `json`.
     */
    set responseType(responseType) {
        this.uploadService.async.responseType = responseType;
    }
    get responseType() {
        return this.uploadService.async.responseType;
    }
    /**
     * Sets the [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData) key
     * which contains the list of file names that are submitted to `removeUrl`.
     * The default value is `fileNames`.
     */
    set removeField(removeField) { this.uploadService.async.removeField = removeField; }
    get removeField() { return this.uploadService.async.removeField; }
    /**
     * Configures the [`HttpHeaders`](https://angular.io/api/common/http/HttpHeaders)
     * that are attached to each `remove` request.
     */
    set removeHeaders(removeHeaders) {
        this.uploadService.async.removeHeaders = removeHeaders;
    }
    get removeHeaders() {
        return this.uploadService.async.removeHeaders;
    }
    /**
     * Sets the [`RequestMethod`](https://angular.io/api/http/RequestMethod) of the `remove` request.
     * The default value is `POST`.
     */
    set removeMethod(removeMethod) {
        this.uploadService.async.removeMethod = removeMethod;
    }
    get removeMethod() {
        return this.uploadService.async.removeMethod;
    }
    /**
     * Sets the URL of the endpoint for the `remove` request.
     * The [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData) request key is named after the `removeField` property.
     * It contains the list of file names which will be removed.
     */
    set removeUrl(removeUrl) {
        this.uploadService.async.removeUrl = removeUrl;
    }
    get removeUrl() {
        return this.uploadService.async.removeUrl;
    }
    /**
     * Specifies if the selected files are uploaded simultaneously or one by one.
     *
     * The default value is `true`.
     */
    set concurrent(concurrent) {
        this.uploadService.async.concurrent = concurrent;
    }
    get concurrent() {
        return this.uploadService.async.concurrent;
    }
    /**
     * @hidden
     */
    set tabIndex(tabIndex) {
        this.tabindex = tabIndex;
    }
    get tabIndex() {
        return this.tabindex;
    }
    /**
     * Sets the restrictions for selected files ([see example]({% slug api_upload_filerestrictions %})).
     */
    set restrictions(restrictions) {
        let parsedRestrictions = Object.assign({}, this._restrictions, restrictions);
        this._restrictions = parsedRestrictions;
    }
    get restrictions() {
        return this._restrictions;
    }
    get hostDisabledClass() {
        return this.disabled;
    }
    get dir() {
        return this.direction;
    }
    ngOnInit() {
        this.verifySettings();
        this.renderer.removeAttribute(this.wrapper, "tabindex");
        this.uploadService.setChunkSettings(this.chunkable);
        if (this.zoneId) {
            this.dropZoneService.addComponent(this, this.zoneId);
        }
    }
    ngOnChanges(changes) {
        if (isChanged("chunkable", changes)) {
            const newChunkable = changes.chunkable.currentValue;
            if (typeof newChunkable === 'boolean') {
                this.uploadService.async.chunk = newChunkable;
            }
            if (typeof newChunkable === "object" && newChunkable !== null) {
                this.uploadService.async.chunk = true;
                this.uploadService.chunk = Object.assign({}, this.uploadService.chunk, newChunkable);
            }
        }
    }
    ngOnDestroy() {
        this.fileList.clear();
        if (this.blurSubscription) {
            this.blurSubscription.unsubscribe();
        }
        if (this.wrapperFocusSubscription) {
            this.wrapperFocusSubscription.unsubscribe();
        }
        if (this.selectButtonFocusSubscription) {
            this.selectButtonFocusSubscription.unsubscribe();
        }
        if (this.localizationChangeSubscription) {
            this.localizationChangeSubscription.unsubscribe();
        }
        if (this.subs) {
            this.subs.unsubscribe();
        }
    }
    /**
     * @hidden
     */
    handleKeydown(event) {
        if (this.disabled) {
            return;
        }
        if ((event.keyCode === Keys.Enter || event.keyCode === Keys.Space) &&
            event.target === this.fileSelectButton.nativeElement) {
            event.preventDefault();
            this.fileSelect.nativeElement.click();
            return;
        }
        if (hasClasses(event.target, UPLOAD_CLASSES) ||
            (!isFocusable(event.target) && !hasClasses(event.target, IGNORE_TARGET_CLASSES))) {
            this.navigation.process(event);
        }
    }
    /**
     * @hidden
     */
    writeValue(newValue) {
        let isValid = true;
        if (newValue instanceof Array) {
            newValue.forEach((file) => {
                if (!validateInitialFileInfo(file)) {
                    isValid = false;
                }
            });
            if (isValid) {
                this.uploadService.addInitialFiles(newValue);
            }
        }
        if (newValue === null) {
            this.fileList.clear();
        }
        this.cdr.markForCheck();
    }
    /**
     * @hidden
     */
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    /**
     * @hidden
     */
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
    /**
     * @hidden
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    /**
     * @hidden
     */
    get selectButtonTabIndex() {
        return this.disabled ? undefined : this.tabIndex;
    }
    /**
     * @hidden
     */
    onFileSelectButtonFocus(_event) {
        this.renderer.addClass(this.fileSelectButton.nativeElement, 'k-state-focused');
        if (!this.navigation.focused) {
            this.navigation.focusedIndex = -1;
        }
    }
    /**
     * @hidden
     */
    onFileSelectButtonBlur(_event) {
        this.renderer.removeClass(this.fileSelectButton.nativeElement, 'k-state-focused');
    }
    /**
     * @hidden
     */
    get showActionButtons() {
        let areVisible = false;
        if (!this.autoUpload) {
            const hasFilesToUpload = this.fileList.filesToUpload.length > 0;
            const uploadingFiles = this.fileList.hasFileWithState([FileState.Uploading]);
            if (this.concurrent && hasFilesToUpload) {
                areVisible = true;
            }
            if (!this.concurrent && hasFilesToUpload && !uploadingFiles) {
                areVisible = true;
            }
        }
        this.navigation.actionButtonsVisible = areVisible;
        return areVisible;
    }
    /**
     * @hidden
     */
    get showTotalStatus() {
        const states = [
            FileState.Uploaded,
            FileState.Uploading,
            FileState.Failed,
            FileState.Paused
        ];
        if (this.fileList.hasFileWithState(states)) {
            return true;
        }
        return false;
    }
    /**
     * @hidden
     */
    textFor(key) {
        return this.localization.get(key);
    }
    /**
     * Focuses the underlying input element.
     */
    focus() {
        setTimeout(() => {
            this.fileSelectButton.nativeElement.focus();
        });
    }
    /**
     * @hidden
     * @deprecated
     */
    focusComponent() {
        this.focus();
    }
    /**
     * Blurs the Upload if it was previously focused.
     */
    blur() {
        if (this.navigation.focused) {
            this.navigation.focused = false;
            document.activeElement.blur();
            this.onBlur.emit();
        }
    }
    /**
     * @hidden
     * @deprecated
     */
    blurComponent() {
        this.blur();
    }
    /**
     * Pauses the upload process of a file that is currently uploading.
     * The `pauseFileByUid` method requires the `chunkable` option of the Upload to be enabled.
     *
     * @param uid - The `uid` of the file that will be paused.
     */
    pauseFileByUid(uid) {
        this.uploadService.pauseFile(uid);
    }
    /**
     * Resumes the upload process for a file that has been previously paused.
     * The `resumeFileByUid` method requires the `chunkable` option of the Upload to be enabled.
     *
     * @param uid - The `uid` of the file that will be resumed.
     */
    resumeFileByUid(uid) {
        this.uploadService.resumeFile(uid);
    }
    /**
     * Triggers the removal of a file or a batch of files.
     * @param uid - The `uid` of the file or a batch of files that will be removed.
     */
    removeFilesByUid(uid) {
        this.uploadService.removeFiles(uid);
    }
    /**
     * Triggers another upload attempt of an unsuccessfully uploaded file or a batch of files.
     * @param uid - The `uid` of the file or a batch of files to be retried.
     */
    retryUploadByUid(uid) {
        this.uploadService.retryFiles(uid);
    }
    /**
     * Cancels the upload of a file or a batch of files.
     * @param uid - The `uid` of the file or a batch of files that will be canceled.
     */
    cancelUploadByUid(uid) {
        this.uploadService.cancelFiles(uid);
    }
    /**
     * Uploads the currently selected files which pass the set restrictions.
     */
    uploadFiles() {
        if (this.fileList.filesToUpload.length) {
            this.uploadService.uploadFiles();
        }
    }
    /**
     * Visually clears all files from the UI without issuing requests to the remove handler.
     */
    clearFiles() {
        this.uploadService.clearFiles();
    }
    /**
     * @hidden
     * Used by the external dropzone to add files to the Upload
     */
    addFiles(files) {
        this.uploadService.addFiles(files);
    }
    /**
     * @hidden
     * Used to determine if the component is empty.
     */
    isEmpty() {
        return false;
    }
    verifySettings() {
        if (isDevMode()) {
            if (this.batch && this.chunkable !== false) {
                throw new Error('The file chunking functionality requires the batch setting to be disabled.');
            }
        }
    }
    subscribeBlur() {
        if (!isDocumentAvailable()) {
            return;
        }
        this._ngZone.runOutsideAngular(() => {
            this.documentClick = fromEvent(document, 'click').pipe(filter((event) => {
                return !(this.wrapper !== event.target && this.wrapper.contains(event.target));
            }));
            this.blurSubscription = merge(this.documentClick, this.navigation.onTab).subscribe(() => {
                if (this.navigation.focused) {
                    this._ngZone.run(() => {
                        this.navigation.focused = false;
                        this.onTouchedCallback();
                        this.onBlur.emit();
                    });
                }
            });
        });
    }
    subscribeFocus() {
        this.wrapperFocusSubscription = this.navigation.onWrapperFocus.subscribe(() => {
            this.onFocus.emit();
        });
        this.selectButtonFocusSubscription = this.navigation.onSelectButtonFocus.subscribe(() => {
            this.fileSelectButton.nativeElement.focus();
        });
    }
    attachEventHandlers() {
        this.subs = this.uploadService.cancelEvent.subscribe((args) => {
            this.cancel.emit(args);
        });
        this.subs.add(this.uploadService.changeEvent.subscribe((files) => {
            this.onChangeCallback(files);
            this.valueChange.emit(files);
        }));
        this.subs.add(this.uploadService.clearEvent.subscribe((args) => {
            this.clear.emit(args);
        }));
        this.subs.add(this.uploadService.completeEvent.subscribe(() => {
            this.complete.emit();
        }));
        this.subs.add(this.uploadService.errorEvent.subscribe((args) => {
            this.error.emit(args);
        }));
        this.subs.add(this.uploadService.pauseEvent.subscribe((args) => {
            this.pause.emit(args);
        }));
        this.subs.add(this.uploadService.removeEvent.subscribe((args) => {
            this.remove.emit(args);
        }));
        this.subs.add(this.uploadService.resumeEvent.subscribe((args) => {
            this.resume.emit(args);
        }));
        this.subs.add(this.uploadService.selectEvent.subscribe((args) => {
            this.select.emit(args);
        }));
        this.subs.add(this.uploadService.successEvent.subscribe((args) => {
            this.success.emit(args);
        }));
        this.subs.add(this.uploadService.uploadEvent.subscribe((args) => {
            this.upload.emit(args);
        }));
        this.subs.add(this.uploadService.uploadProgressEvent.subscribe((args) => {
            this.uploadProgress.emit(args);
        }));
    }
}
UploadComponent.decorators = [
    { type: Component, args: [{
                exportAs: 'kendoUpload',
                providers: [
                    LocalizationService,
                    NavigationService,
                    UploadService,
                    DropZoneService,
                    UPLOAD_VALUE_ACCESSOR,
                    {
                        provide: L10N_PREFIX,
                        useValue: 'kendo.upload'
                    },
                    {
                        provide: KendoInput,
                        useExisting: forwardRef(() => UploadComponent)
                    }
                ],
                selector: 'kendo-upload',
                template: `
    <ng-container kendoUploadLocalizedMessages
      i18n-cancel="kendo.upload.cancel|The text for the Cancel button"
      cancel="Cancel"

      i18n-clearSelectedFiles="kendo.upload.clearSelectedFiles|The text for the Clear button"
      clearSelectedFiles="Clear"

      i18n-dropFilesHere="kendo.upload.dropFilesHere|The drop zone hint"
      dropFilesHere="Drop files here to upload"

      i18n-filesBatchStatus="kendo.upload.filesBatchStatus|The status message for a batch of files"
      filesBatchStatus="files"

      i18n-filesBatchStatusFailed="kendo.upload.filesBatchStatusFailed|The status message for a batch of files after failed upload"
      filesBatchStatusFailed="files failed to upload."

      i18n-filesBatchStatusUploaded="kendo.upload.filesBatchStatusUploaded|The status message for a batch of files after successful upload"
      filesBatchStatusUploaded="files successfully uploaded."

      i18n-fileStatusFailed="kendo.upload.fileStatusFailed|The file status message after failed upload"
      fileStatusFailed="File failed to upload."

      i18n-fileStatusUploaded="kendo.upload.fileStatusUploaded|The file status message after successful upload"
      fileStatusUploaded="File successfully uploaded."

      i18n-headerStatusPaused="kendo.upload.headerStatusPaused|The header status message when the file upload is paused"
      headerStatusPaused="Paused"

      i18n-headerStatusUploaded="kendo.upload.headerStatusUploaded|The header status message after file upload completion"
      headerStatusUploaded="Done"

      i18n-headerStatusUploading="kendo.upload.headerStatusUploading|The header status message during file upload"
      headerStatusUploading="Uploading..."

      i18n-invalidFileExtension="kendo.upload.invalidFileExtension|The text for the invalid allowed extensions restriction message"
      invalidFileExtension="File type not allowed."

      i18n-invalidMaxFileSize="kendo.upload.invalidMaxFileSize|The text for the invalid max file size restriction message"
      invalidMaxFileSize="File size too large."

      i18n-invalidMinFileSize="kendo.upload.invalidMinFileSize|The text for the invalid min file size restriction message"
      invalidMinFileSize="File size too small."

      i18n-pause="kendo.upload.pause|The text for the Pause button"
      pause="Pause"

      i18n-remove="kendo.upload.remove|The text for the Remove button"
      remove="Remove"

      i18n-resume="kendo.upload.resume|The text for the Resume button"
      resume="Resume"

      i18n-retry="kendo.upload.retry|The text for the Retry button"
      retry="Retry"

      i18n-select="kendo.upload.select|The text for the Select button"
      select="Select files..."

      i18n-uploadSelectedFiles="kendo.upload.uploadSelectedFiles|The text for the Upload files button"
      uploadSelectedFiles="Upload"
    >
    </ng-container>
    <div kendoUploadInternalDropZone
      [restrictions]="restrictions"
      [multiple]="multiple"
      [disabled]="disabled">
        <div role="button" #fileSelectButton
             [id]="focusableId"
             [attr.aria-label]="textFor('select')"
             [attr.tabindex]="selectButtonTabIndex"
             (focus)="onFileSelectButtonFocus($event)"
             (blur)="onFileSelectButtonBlur($event)"
             class="k-button k-upload-button">
          <input #fileSelect kendoFileSelect
            [attr.accept]="accept ? accept : null"
            [dir]="direction"
            [restrictions]="restrictions"
            [multiple]="multiple"
            [disabled]="disabled" />
          <span>{{textFor('select')}}</span>
        </div>
        <kendo-upload-status-total *ngIf="showTotalStatus"
          class="k-upload-status k-upload-status-total"
          [fileList]="fileList">
        </kendo-upload-status-total>
        <div class="k-dropzone-hint">{{textFor('dropFilesHere')}}</div>
    </div>
    <ul kendo-upload-file-list *ngIf="showFileList && fileList.count > 0"
        class="k-upload-files k-reset"
        [disabled]="disabled"
        [fileList]="fileList.files"
        [fileTemplate]="fileTemplate">
    </ul>
    <kendo-upload-action-buttons
      *ngIf="showActionButtons"
      [disabled]="disabled"
      [actionsLayout]="actionsLayout">
    </kendo-upload-action-buttons>
  `
            },] },
];
/** @nocollapse */
UploadComponent.ctorParameters = () => [
    { type: UploadService },
    { type: LocalizationService },
    { type: NavigationService },
    { type: DropZoneService },
    { type: NgZone },
    { type: Renderer2 },
    { type: ChangeDetectorRef },
    { type: ElementRef }
];
UploadComponent.propDecorators = {
    autoUpload: [{ type: Input }],
    batch: [{ type: Input }],
    withCredentials: [{ type: Input }],
    saveField: [{ type: Input }],
    saveHeaders: [{ type: Input }],
    saveMethod: [{ type: Input }],
    saveUrl: [{ type: Input }],
    responseType: [{ type: Input }],
    removeField: [{ type: Input }],
    removeHeaders: [{ type: Input }],
    removeMethod: [{ type: Input }],
    removeUrl: [{ type: Input }],
    chunkable: [{ type: Input }],
    concurrent: [{ type: Input }],
    multiple: [{ type: Input }],
    disabled: [{ type: Input }],
    showFileList: [{ type: Input }],
    tabindex: [{ type: Input }],
    zoneId: [{ type: Input }],
    tabIndex: [{ type: Input, args: ['tabIndex',] }],
    accept: [{ type: Input }],
    restrictions: [{ type: Input }],
    focusableId: [{ type: Input }],
    actionsLayout: [{ type: Input }],
    fileTemplate: [{ type: ContentChild, args: [FileTemplateDirective,] }],
    fileSelect: [{ type: ViewChild, args: ['fileSelect',] }],
    fileSelectButton: [{ type: ViewChild, args: ['fileSelectButton',] }],
    onBlur: [{ type: Output, args: ['blur',] }],
    cancel: [{ type: Output }],
    clear: [{ type: Output }],
    complete: [{ type: Output }],
    error: [{ type: Output }],
    onFocus: [{ type: Output, args: ['focus',] }],
    pause: [{ type: Output }],
    remove: [{ type: Output }],
    resume: [{ type: Output }],
    select: [{ type: Output }],
    success: [{ type: Output }],
    upload: [{ type: Output }],
    uploadProgress: [{ type: Output }],
    valueChange: [{ type: Output }],
    hostDefaultClasses: [{ type: HostBinding, args: ['class.k-widget',] }, { type: HostBinding, args: ['class.k-upload',] }],
    hostDisabledClass: [{ type: HostBinding, args: ['class.k-state-disabled',] }],
    dir: [{ type: HostBinding, args: ['attr.dir',] }],
    handleKeydown: [{ type: HostListener, args: ['keydown', ['$event'],] }]
};
