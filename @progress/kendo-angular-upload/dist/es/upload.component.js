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
export var UPLOAD_VALUE_ACCESSOR = {
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return UploadComponent; }) // tslint:disable-line:no-forward-ref
};
/**
 * Represents the [Kendo UI Upload component for Angular]({% slug overview_upload %}).
 */
var UploadComponent = /** @class */ (function () {
    function UploadComponent(uploadService, localization, navigation, dropZoneService, _ngZone, renderer, cdr, wrapper) {
        var _this = this;
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
        this.focusableId = "k-" + guid();
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
        this.onTouchedCallback = function (_) { };
        this.onChangeCallback = function (_) { };
        this.fileList = this.uploadService.files;
        this.localizationChangeSubscription = localization.changes.subscribe(function (_a) {
            var rtl = _a.rtl;
            _this.direction = rtl ? 'rtl' : 'ltr';
            _this.navigation.computeKeys(_this.direction);
        });
        this.direction = localization.rtl ? 'rtl' : 'ltr';
        this.navigation.computeKeys(this.direction);
        this.wrapper = wrapper.nativeElement;
        this.subscribeBlur();
        this.subscribeFocus();
        this.attachEventHandlers();
    }
    Object.defineProperty(UploadComponent.prototype, "autoUpload", {
        get: function () {
            return this.uploadService.async.autoUpload;
        },
        /**
         * By default, the selected files are immediately uploaded
         * ([see example]({% slug fileprocessing_upload %}#toc-automatic-upload-of-files)).
         * To change this behavior, set `autoUpload` to `false`.
         */
        set: function (autoUpload) {
            this.uploadService.async.autoUpload = autoUpload;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UploadComponent.prototype, "batch", {
        get: function () {
            return this.uploadService.async.batch;
        },
        /**
         * When enabled, all files in the selection are uploaded in one request
         * ([see example]({% slug fileprocessing_upload %}#toc-upload-of-batches-of-files)).
         * Any files that are selected one after the other are uploaded in separate requests.
         */
        set: function (batch) {
            this.uploadService.async.batch = batch;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UploadComponent.prototype, "withCredentials", {
        get: function () {
            return this.uploadService.async.withCredentials;
        },
        /**
         * Configures whether credentials (cookies, headers) will be sent for cross-site requests
         * ([see example]({% slug credentials_upload %}#toc-attaching-credentials-to-requests)).
         * The default values is `true`. Setting `withCredentials` has no effect on same-site requests.
         * To add credentials to the request, use the `saveHeaders` or `removeHeaders` property,
         * or the [`upload`]({% slug api_upload_uploadevent %}) event.
         */
        set: function (withCredentials) {
            this.uploadService.async.withCredentials = withCredentials;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UploadComponent.prototype, "saveField", {
        get: function () {
            return this.uploadService.async.saveField;
        },
        /**
         * Sets the [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData) key which contains the files submitted to `saveUrl`.
         * The default value is `files`.
         */
        set: function (saveField) {
            this.uploadService.async.saveField = saveField;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UploadComponent.prototype, "saveHeaders", {
        get: function () {
            return this.uploadService.async.saveHeaders;
        },
        /**
         * Configures the [`HttpHeaders`](https://angular.io/api/common/http/HttpHeaders)
         * that are attached to each upload request.
         */
        set: function (saveHeaders) {
            this.uploadService.async.saveHeaders = saveHeaders;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UploadComponent.prototype, "saveMethod", {
        get: function () {
            return this.uploadService.async.saveMethod;
        },
        /**
         * Sets the [`RequestMethod`](https://angular.io/api/http/RequestMethod) of the upload request.
         * The default value is `POST`.
         */
        set: function (saveMethod) {
            this.uploadService.async.saveMethod = saveMethod;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UploadComponent.prototype, "saveUrl", {
        get: function () {
            return this.uploadService.async.saveUrl;
        },
        /**
         * Sets the URL of the endpoint for the upload request.
         * The request [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData) key is named after the `saveField` property.
         * It contains the list of files to be uploaded.
         */
        set: function (saveUrl) {
            this.uploadService.async.saveUrl = saveUrl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UploadComponent.prototype, "responseType", {
        get: function () {
            return this.uploadService.async.responseType;
        },
        /**
         * Sets the expected [`response type`](https://angular.io/api/common/http/HttpRequest#responseType) of the server.
         * It is used to parse the response appropriately.
         * The default value is `json`.
         */
        set: function (responseType) {
            this.uploadService.async.responseType = responseType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UploadComponent.prototype, "removeField", {
        get: function () { return this.uploadService.async.removeField; },
        /**
         * Sets the [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData) key
         * which contains the list of file names that are submitted to `removeUrl`.
         * The default value is `fileNames`.
         */
        set: function (removeField) { this.uploadService.async.removeField = removeField; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UploadComponent.prototype, "removeHeaders", {
        get: function () {
            return this.uploadService.async.removeHeaders;
        },
        /**
         * Configures the [`HttpHeaders`](https://angular.io/api/common/http/HttpHeaders)
         * that are attached to each `remove` request.
         */
        set: function (removeHeaders) {
            this.uploadService.async.removeHeaders = removeHeaders;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UploadComponent.prototype, "removeMethod", {
        get: function () {
            return this.uploadService.async.removeMethod;
        },
        /**
         * Sets the [`RequestMethod`](https://angular.io/api/http/RequestMethod) of the `remove` request.
         * The default value is `POST`.
         */
        set: function (removeMethod) {
            this.uploadService.async.removeMethod = removeMethod;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UploadComponent.prototype, "removeUrl", {
        get: function () {
            return this.uploadService.async.removeUrl;
        },
        /**
         * Sets the URL of the endpoint for the `remove` request.
         * The [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData) request key is named after the `removeField` property.
         * It contains the list of file names which will be removed.
         */
        set: function (removeUrl) {
            this.uploadService.async.removeUrl = removeUrl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UploadComponent.prototype, "concurrent", {
        get: function () {
            return this.uploadService.async.concurrent;
        },
        /**
         * Specifies if the selected files are uploaded simultaneously or one by one.
         *
         * The default value is `true`.
         */
        set: function (concurrent) {
            this.uploadService.async.concurrent = concurrent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UploadComponent.prototype, "tabIndex", {
        get: function () {
            return this.tabindex;
        },
        /**
         * @hidden
         */
        set: function (tabIndex) {
            this.tabindex = tabIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UploadComponent.prototype, "restrictions", {
        get: function () {
            return this._restrictions;
        },
        /**
         * Sets the restrictions for selected files ([see example]({% slug api_upload_filerestrictions %})).
         */
        set: function (restrictions) {
            var parsedRestrictions = Object.assign({}, this._restrictions, restrictions);
            this._restrictions = parsedRestrictions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UploadComponent.prototype, "hostDisabledClass", {
        get: function () {
            return this.disabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UploadComponent.prototype, "dir", {
        get: function () {
            return this.direction;
        },
        enumerable: true,
        configurable: true
    });
    UploadComponent.prototype.ngOnInit = function () {
        this.verifySettings();
        this.renderer.removeAttribute(this.wrapper, "tabindex");
        this.uploadService.setChunkSettings(this.chunkable);
        if (this.zoneId) {
            this.dropZoneService.addComponent(this, this.zoneId);
        }
    };
    UploadComponent.prototype.ngOnChanges = function (changes) {
        if (isChanged("chunkable", changes)) {
            var newChunkable = changes.chunkable.currentValue;
            if (typeof newChunkable === 'boolean') {
                this.uploadService.async.chunk = newChunkable;
            }
            if (typeof newChunkable === "object" && newChunkable !== null) {
                this.uploadService.async.chunk = true;
                this.uploadService.chunk = Object.assign({}, this.uploadService.chunk, newChunkable);
            }
        }
    };
    UploadComponent.prototype.ngOnDestroy = function () {
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
    };
    /**
     * @hidden
     */
    UploadComponent.prototype.handleKeydown = function (event) {
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
    };
    /**
     * @hidden
     */
    UploadComponent.prototype.writeValue = function (newValue) {
        var isValid = true;
        if (newValue instanceof Array) {
            newValue.forEach(function (file) {
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
    };
    /**
     * @hidden
     */
    UploadComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    /**
     * @hidden
     */
    UploadComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    /**
     * @hidden
     */
    UploadComponent.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    Object.defineProperty(UploadComponent.prototype, "selectButtonTabIndex", {
        /**
         * @hidden
         */
        get: function () {
            return this.disabled ? undefined : this.tabIndex;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    UploadComponent.prototype.onFileSelectButtonFocus = function (_event) {
        this.renderer.addClass(this.fileSelectButton.nativeElement, 'k-state-focused');
        if (!this.navigation.focused) {
            this.navigation.focusedIndex = -1;
        }
    };
    /**
     * @hidden
     */
    UploadComponent.prototype.onFileSelectButtonBlur = function (_event) {
        this.renderer.removeClass(this.fileSelectButton.nativeElement, 'k-state-focused');
    };
    Object.defineProperty(UploadComponent.prototype, "showActionButtons", {
        /**
         * @hidden
         */
        get: function () {
            var areVisible = false;
            if (!this.autoUpload) {
                var hasFilesToUpload = this.fileList.filesToUpload.length > 0;
                var uploadingFiles = this.fileList.hasFileWithState([FileState.Uploading]);
                if (this.concurrent && hasFilesToUpload) {
                    areVisible = true;
                }
                if (!this.concurrent && hasFilesToUpload && !uploadingFiles) {
                    areVisible = true;
                }
            }
            this.navigation.actionButtonsVisible = areVisible;
            return areVisible;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UploadComponent.prototype, "showTotalStatus", {
        /**
         * @hidden
         */
        get: function () {
            var states = [
                FileState.Uploaded,
                FileState.Uploading,
                FileState.Failed,
                FileState.Paused
            ];
            if (this.fileList.hasFileWithState(states)) {
                return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    UploadComponent.prototype.textFor = function (key) {
        return this.localization.get(key);
    };
    /**
     * Focuses the underlying input element.
     */
    UploadComponent.prototype.focus = function () {
        var _this = this;
        setTimeout(function () {
            _this.fileSelectButton.nativeElement.focus();
        });
    };
    /**
     * @hidden
     * @deprecated
     */
    UploadComponent.prototype.focusComponent = function () {
        this.focus();
    };
    /**
     * Blurs the Upload if it was previously focused.
     */
    UploadComponent.prototype.blur = function () {
        if (this.navigation.focused) {
            this.navigation.focused = false;
            document.activeElement.blur();
            this.onBlur.emit();
        }
    };
    /**
     * @hidden
     * @deprecated
     */
    UploadComponent.prototype.blurComponent = function () {
        this.blur();
    };
    /**
     * Pauses the upload process of a file that is currently uploading.
     * The `pauseFileByUid` method requires the `chunkable` option of the Upload to be enabled.
     *
     * @param uid - The `uid` of the file that will be paused.
     */
    UploadComponent.prototype.pauseFileByUid = function (uid) {
        this.uploadService.pauseFile(uid);
    };
    /**
     * Resumes the upload process for a file that has been previously paused.
     * The `resumeFileByUid` method requires the `chunkable` option of the Upload to be enabled.
     *
     * @param uid - The `uid` of the file that will be resumed.
     */
    UploadComponent.prototype.resumeFileByUid = function (uid) {
        this.uploadService.resumeFile(uid);
    };
    /**
     * Triggers the removal of a file or a batch of files.
     * @param uid - The `uid` of the file or a batch of files that will be removed.
     */
    UploadComponent.prototype.removeFilesByUid = function (uid) {
        this.uploadService.removeFiles(uid);
    };
    /**
     * Triggers another upload attempt of an unsuccessfully uploaded file or a batch of files.
     * @param uid - The `uid` of the file or a batch of files to be retried.
     */
    UploadComponent.prototype.retryUploadByUid = function (uid) {
        this.uploadService.retryFiles(uid);
    };
    /**
     * Cancels the upload of a file or a batch of files.
     * @param uid - The `uid` of the file or a batch of files that will be canceled.
     */
    UploadComponent.prototype.cancelUploadByUid = function (uid) {
        this.uploadService.cancelFiles(uid);
    };
    /**
     * Uploads the currently selected files which pass the set restrictions.
     */
    UploadComponent.prototype.uploadFiles = function () {
        if (this.fileList.filesToUpload.length) {
            this.uploadService.uploadFiles();
        }
    };
    /**
     * Visually clears all files from the UI without issuing requests to the remove handler.
     */
    UploadComponent.prototype.clearFiles = function () {
        this.uploadService.clearFiles();
    };
    /**
     * @hidden
     * Used by the external dropzone to add files to the Upload
     */
    UploadComponent.prototype.addFiles = function (files) {
        this.uploadService.addFiles(files);
    };
    /**
     * @hidden
     * Used to determine if the component is empty.
     */
    UploadComponent.prototype.isEmpty = function () {
        return false;
    };
    UploadComponent.prototype.verifySettings = function () {
        if (isDevMode()) {
            if (this.batch && this.chunkable !== false) {
                throw new Error('The file chunking functionality requires the batch setting to be disabled.');
            }
        }
    };
    UploadComponent.prototype.subscribeBlur = function () {
        var _this = this;
        if (!isDocumentAvailable()) {
            return;
        }
        this._ngZone.runOutsideAngular(function () {
            _this.documentClick = fromEvent(document, 'click').pipe(filter(function (event) {
                return !(_this.wrapper !== event.target && _this.wrapper.contains(event.target));
            }));
            _this.blurSubscription = merge(_this.documentClick, _this.navigation.onTab).subscribe(function () {
                if (_this.navigation.focused) {
                    _this._ngZone.run(function () {
                        _this.navigation.focused = false;
                        _this.onTouchedCallback();
                        _this.onBlur.emit();
                    });
                }
            });
        });
    };
    UploadComponent.prototype.subscribeFocus = function () {
        var _this = this;
        this.wrapperFocusSubscription = this.navigation.onWrapperFocus.subscribe(function () {
            _this.onFocus.emit();
        });
        this.selectButtonFocusSubscription = this.navigation.onSelectButtonFocus.subscribe(function () {
            _this.fileSelectButton.nativeElement.focus();
        });
    };
    UploadComponent.prototype.attachEventHandlers = function () {
        var _this = this;
        this.subs = this.uploadService.cancelEvent.subscribe(function (args) {
            _this.cancel.emit(args);
        });
        this.subs.add(this.uploadService.changeEvent.subscribe(function (files) {
            _this.onChangeCallback(files);
            _this.valueChange.emit(files);
        }));
        this.subs.add(this.uploadService.clearEvent.subscribe(function (args) {
            _this.clear.emit(args);
        }));
        this.subs.add(this.uploadService.completeEvent.subscribe(function () {
            _this.complete.emit();
        }));
        this.subs.add(this.uploadService.errorEvent.subscribe(function (args) {
            _this.error.emit(args);
        }));
        this.subs.add(this.uploadService.pauseEvent.subscribe(function (args) {
            _this.pause.emit(args);
        }));
        this.subs.add(this.uploadService.removeEvent.subscribe(function (args) {
            _this.remove.emit(args);
        }));
        this.subs.add(this.uploadService.resumeEvent.subscribe(function (args) {
            _this.resume.emit(args);
        }));
        this.subs.add(this.uploadService.selectEvent.subscribe(function (args) {
            _this.select.emit(args);
        }));
        this.subs.add(this.uploadService.successEvent.subscribe(function (args) {
            _this.success.emit(args);
        }));
        this.subs.add(this.uploadService.uploadEvent.subscribe(function (args) {
            _this.upload.emit(args);
        }));
        this.subs.add(this.uploadService.uploadProgressEvent.subscribe(function (args) {
            _this.uploadProgress.emit(args);
        }));
    };
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
                            useExisting: forwardRef(function () { return UploadComponent; })
                        }
                    ],
                    selector: 'kendo-upload',
                    template: "\n    <ng-container kendoUploadLocalizedMessages\n      i18n-cancel=\"kendo.upload.cancel|The text for the Cancel button\"\n      cancel=\"Cancel\"\n\n      i18n-clearSelectedFiles=\"kendo.upload.clearSelectedFiles|The text for the Clear button\"\n      clearSelectedFiles=\"Clear\"\n\n      i18n-dropFilesHere=\"kendo.upload.dropFilesHere|The drop zone hint\"\n      dropFilesHere=\"Drop files here to upload\"\n\n      i18n-filesBatchStatus=\"kendo.upload.filesBatchStatus|The status message for a batch of files\"\n      filesBatchStatus=\"files\"\n\n      i18n-filesBatchStatusFailed=\"kendo.upload.filesBatchStatusFailed|The status message for a batch of files after failed upload\"\n      filesBatchStatusFailed=\"files failed to upload.\"\n\n      i18n-filesBatchStatusUploaded=\"kendo.upload.filesBatchStatusUploaded|The status message for a batch of files after successful upload\"\n      filesBatchStatusUploaded=\"files successfully uploaded.\"\n\n      i18n-fileStatusFailed=\"kendo.upload.fileStatusFailed|The file status message after failed upload\"\n      fileStatusFailed=\"File failed to upload.\"\n\n      i18n-fileStatusUploaded=\"kendo.upload.fileStatusUploaded|The file status message after successful upload\"\n      fileStatusUploaded=\"File successfully uploaded.\"\n\n      i18n-headerStatusPaused=\"kendo.upload.headerStatusPaused|The header status message when the file upload is paused\"\n      headerStatusPaused=\"Paused\"\n\n      i18n-headerStatusUploaded=\"kendo.upload.headerStatusUploaded|The header status message after file upload completion\"\n      headerStatusUploaded=\"Done\"\n\n      i18n-headerStatusUploading=\"kendo.upload.headerStatusUploading|The header status message during file upload\"\n      headerStatusUploading=\"Uploading...\"\n\n      i18n-invalidFileExtension=\"kendo.upload.invalidFileExtension|The text for the invalid allowed extensions restriction message\"\n      invalidFileExtension=\"File type not allowed.\"\n\n      i18n-invalidMaxFileSize=\"kendo.upload.invalidMaxFileSize|The text for the invalid max file size restriction message\"\n      invalidMaxFileSize=\"File size too large.\"\n\n      i18n-invalidMinFileSize=\"kendo.upload.invalidMinFileSize|The text for the invalid min file size restriction message\"\n      invalidMinFileSize=\"File size too small.\"\n\n      i18n-pause=\"kendo.upload.pause|The text for the Pause button\"\n      pause=\"Pause\"\n\n      i18n-remove=\"kendo.upload.remove|The text for the Remove button\"\n      remove=\"Remove\"\n\n      i18n-resume=\"kendo.upload.resume|The text for the Resume button\"\n      resume=\"Resume\"\n\n      i18n-retry=\"kendo.upload.retry|The text for the Retry button\"\n      retry=\"Retry\"\n\n      i18n-select=\"kendo.upload.select|The text for the Select button\"\n      select=\"Select files...\"\n\n      i18n-uploadSelectedFiles=\"kendo.upload.uploadSelectedFiles|The text for the Upload files button\"\n      uploadSelectedFiles=\"Upload\"\n    >\n    </ng-container>\n    <div kendoUploadInternalDropZone\n      [restrictions]=\"restrictions\"\n      [multiple]=\"multiple\"\n      [disabled]=\"disabled\">\n        <div role=\"button\" #fileSelectButton\n             [id]=\"focusableId\"\n             [attr.aria-label]=\"textFor('select')\"\n             [attr.tabindex]=\"selectButtonTabIndex\"\n             (focus)=\"onFileSelectButtonFocus($event)\"\n             (blur)=\"onFileSelectButtonBlur($event)\"\n             class=\"k-button k-upload-button\">\n          <input #fileSelect kendoFileSelect\n            [attr.accept]=\"accept ? accept : null\"\n            [dir]=\"direction\"\n            [restrictions]=\"restrictions\"\n            [multiple]=\"multiple\"\n            [disabled]=\"disabled\" />\n          <span>{{textFor('select')}}</span>\n        </div>\n        <kendo-upload-status-total *ngIf=\"showTotalStatus\"\n          class=\"k-upload-status k-upload-status-total\"\n          [fileList]=\"fileList\">\n        </kendo-upload-status-total>\n        <div class=\"k-dropzone-hint\">{{textFor('dropFilesHere')}}</div>\n    </div>\n    <ul kendo-upload-file-list *ngIf=\"showFileList && fileList.count > 0\"\n        class=\"k-upload-files k-reset\"\n        [disabled]=\"disabled\"\n        [fileList]=\"fileList.files\"\n        [fileTemplate]=\"fileTemplate\">\n    </ul>\n    <kendo-upload-action-buttons\n      *ngIf=\"showActionButtons\"\n      [disabled]=\"disabled\"\n      [actionsLayout]=\"actionsLayout\">\n    </kendo-upload-action-buttons>\n  "
                },] },
    ];
    /** @nocollapse */
    UploadComponent.ctorParameters = function () { return [
        { type: UploadService },
        { type: LocalizationService },
        { type: NavigationService },
        { type: DropZoneService },
        { type: NgZone },
        { type: Renderer2 },
        { type: ChangeDetectorRef },
        { type: ElementRef }
    ]; };
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
    return UploadComponent;
}());
export { UploadComponent };
