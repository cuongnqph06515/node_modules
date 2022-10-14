/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { EventEmitter, Injectable, Directive, TemplateRef, forwardRef, Component, NgZone, Renderer2, ChangeDetectorRef, ElementRef, Input, ContentChild, ViewChild, Output, HostBinding, HostListener, ViewChildren, ViewContainerRef, isDevMode, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { LocalizationService, L10N_PREFIX, ComponentMessages } from '@progress/kendo-angular-l10n';
import { guid, Keys, isDocumentAvailable, KendoInput, isChanged } from '@progress/kendo-angular-common';
import { fromEvent, merge } from 'rxjs';
import { filter } from 'rxjs/operators';
import { HttpHeaders, HttpRequest, HttpEventType, HttpResponse, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';

/**
 * Lists the possible states of a file.
 */
var FileState;
(function (FileState) {
    /**
     * The file upload process has failed.
     */
    FileState[FileState["Failed"] = 0] = "Failed";
    /**
     * An initially selected fake file without a set state.
     */
    FileState[FileState["Initial"] = 1] = "Initial";
    /**
     * The file is selected.
     */
    FileState[FileState["Selected"] = 2] = "Selected";
    /**
     * The file is successfully uploaded.
     */
    FileState[FileState["Uploaded"] = 3] = "Uploaded";
    /**
     * The file is in the process of uploading.
     */
    FileState[FileState["Uploading"] = 4] = "Uploading";
    /**
     * The file upload process has been paused.
     */
    FileState[FileState["Paused"] = 5] = "Paused";
})(FileState || (FileState = {}));

/**
 * @hidden
 */
class FileMap {
    constructor() {
        this._files = {};
    }
    add(file) {
        let uid = file.uid;
        if (this.has(uid)) {
            if (file.validationErrors && file.validationErrors.length > 0) {
                this._files[uid].unshift(file);
            }
            else {
                this._files[uid].push(file);
            }
        }
        else {
            this._files[uid] = [file];
        }
    }
    remove(uid) {
        if (this.has(uid)) {
            this._files[uid] = null;
            delete this._files[uid];
        }
    }
    clear() {
        let allFiles = this._files;
        for (let uid in allFiles) {
            if (allFiles.hasOwnProperty(uid)) {
                for (let file of allFiles[uid]) {
                    if (file.httpSubscription) {
                        file.httpSubscription.unsubscribe();
                    }
                }
                allFiles[uid] = null;
                delete allFiles[uid];
            }
        }
    }
    has(uid) {
        return uid in this._files;
    }
    get(uid) {
        return this._files[uid];
    }
    setFilesState(files, state$$1) {
        for (let file of files) {
            this.setFilesStateByUid(file.uid, state$$1);
        }
    }
    setFilesStateByUid(uid, state$$1) {
        this.get(uid).forEach((f) => {
            f.state = state$$1;
        });
    }
    get count() {
        return Object.getOwnPropertyNames(this._files).length;
    }
    get files() {
        let initial = this._files;
        let transformed = [];
        for (let uid in initial) {
            if (initial.hasOwnProperty(uid)) {
                transformed.push(initial[uid]);
            }
        }
        return transformed;
    }
    get filesFlat() {
        let initial = this._files;
        let transformed = [];
        for (let uid in initial) {
            if (initial.hasOwnProperty(uid)) {
                let current = initial[uid];
                current.forEach((file) => {
                    transformed.push(file);
                });
            }
        }
        return transformed;
    }
    get filesToUpload() {
        let files = this._files;
        let notUploaded = [];
        for (let uid in files) {
            if (files.hasOwnProperty(uid)) {
                let currentFiles = files[uid];
                let currentFilesValid = true;
                for (let file of currentFiles) {
                    if (file.state !== FileState.Selected || (file.validationErrors && file.validationErrors.length > 0)) {
                        currentFilesValid = false;
                    }
                }
                if (currentFilesValid) {
                    notUploaded.push(currentFiles);
                }
            }
        }
        return notUploaded;
    }
    get firstFileToUpload() {
        let files = this._files;
        for (let uid in files) {
            if (files.hasOwnProperty(uid)) {
                let currentFiles = files[uid];
                let currentFilesValid = true;
                for (let file of currentFiles) {
                    if (file.state !== FileState.Selected || (file.validationErrors && file.validationErrors.length > 0)) {
                        currentFilesValid = false;
                    }
                }
                if (currentFilesValid) {
                    return currentFiles;
                }
            }
        }
        return null;
    }
    hasFileWithState(fileStates) {
        let files = this._files;
        for (let uid in files) {
            if (files.hasOwnProperty(uid)) {
                let currentFiles = files[uid];
                for (let file of currentFiles) {
                    if (fileStates.indexOf(file.state) >= 0) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
}

/**
 * Arguments for the `cancel` event. The `cancel` event fires when
 * the user cancels the process of uploading a file or a batch of files.
 *
 * ```ts-no-run
 *  @Component({
 *    selector: 'my-upload',
 *    template: `
 *    <p>Click the <span class='k-icon k-i-cancel'></span> icon during upload to trigger the event</p>
 *    <kendo-upload
 *      [saveUrl]="uploadSaveUrl"
 *      [removeUrl]="uploadRemoveUrl"
 *      (cancel)="cancelEventHandler($event)">
 *    </kendo-upload>
 *    `
 *  })
 *  export class UploadComponent {
 *    uploadSaveUrl = 'saveUrl'; // should represent an actual API endpoint
 *    uploadRemoveUrl = 'removeUrl'; // should represent an actual API endpoint
 *
 *    cancelEventHandler(e: CancelEvent) {
 *      console.log('Canceling file upload', e.files);
 *    }
 *  }
 * ```
 */
class CancelEvent {
    /**
     * Constructs the event arguments for the `cancel` event.
     * @param files - The list of the files that were going to be uploaded.
     */
    constructor(files) {
        this.files = files;
    }
}

/**
 * @hidden
 */
class PreventableEvent {
    constructor() {
        this.prevented = false;
    }
    /**
     * Prevents the default action for a specified event.
     * In this way, the source component suppresses the built-in behavior that follows the event.
     */
    preventDefault() {
        this.prevented = true;
    }
    /**
     * If the event is prevented by any of its subscribers, returns `true`.
     *
     * @returns `true` if the default action was prevented. Otherwise, returns `false`.
     */
    isDefaultPrevented() {
        return this.prevented;
    }
}

/**
 * Arguments for the `clear` event. The `clear` event fires when
 * the **Clear** button is clicked. At this point, the selected files are about to be cleared.
 *
 * ```ts-no-run
 *  @Component({
 *    selector: 'my-upload',
 *    template: `
 *    <kendo-upload
 *      [autoUpload]="false"
 *      [saveUrl]="uploadSaveUrl"
 *      [removeUrl]="uploadRemoveUrl"
 *      (clear)="clearEventHandler($event)">
 *    </kendo-upload>
 *    `
 *  })
 *  export class UploadComponent {
 *    uploadSaveUrl = 'saveUrl'; // should represent an actual API endpoint
 *    uploadRemoveUrl = 'removeUrl'; // should represent an actual API endpoint
 *
 *    clearEventHandler(e: ClearEvent) {
 *      console.log('Clearing the file upload');
 *    }
 *  }
 * ```
 */
class ClearEvent extends PreventableEvent {
    /**
     * Constructs the event arguments for the `clear` event.
     */
    constructor() { super(); }
}

/**
 * Arguments for the `error` event. The `error` event fires when
 * an `upload` or `remove` operation fails.
 *
 * ```ts-no-run
 *  @Component({
 *    selector: 'my-upload',
 *    template: `
 *    <kendo-upload
 *      [saveUrl]="uploadSaveUrl"
 *      [removeUrl]="uploadRemoveUrl"
 *      (error)="errorEventHandler($event)">
 *    </kendo-upload>
 *    `
 *  })
 *  export class UploadComponent {
 *    uploadSaveUrl = 'saveUrl'; // should represent an actual API endpoint
 *    uploadRemoveUrl = 'removeUrl'; // should represent an actual API endpoint
 *
 *    errorEventHandler(e: ErrorEvent) {
 *      console.log('An error occurred');
 *    }
 *  }
 * ```
 */
class ErrorEvent {
    /**
     * Constructs the event arguments for the `error` event.
     *
     * @param files - The list of the files that failed to be uploaded or removed.
     * @param operation - The operation type (`upload` or `remove`).
     * @param response - The response object returned by the server.
     */
    constructor(files, operation, response) {
        this.files = files;
        this.operation = operation;
        this.response = response;
    }
}

/**
 * Arguments for the `pause` event. The `pause` event fires when the user
 * pauses a file that is currently uploading.
 *
 * ```ts-no-run
 *  @Component({
 *    selector: 'my-upload',
 *    template: `
 *    <kendo-upload
 *      [chunkable]="true"
 *      [saveUrl]="uploadSaveUrl"
 *      [removeUrl]="uploadRemoveUrl"
 *      (pause)="pauseEventHandler($event)">
 *    </kendo-upload>
 *    `
 *  })
 *  export class UploadComponent {
 *    uploadSaveUrl = 'saveUrl'; // should represent an actual API endpoint
 *    uploadRemoveUrl = 'removeUrl'; // should represent an actual API endpoint
 *
 *    pauseEventHandler(ev: PauseEvent) {
 *      console.log('File paused');
 *    }
 *  }
 * ```
 *
 */
class PauseEvent {
    /**
     * Constructs the event arguments for the `pause` event.
     * @param file - The file that is going to be paused.
     */
    constructor(file) {
        this.file = file;
    }
}

/**
 * Arguments for the `remove` event. The `remove` event fires when an uploaded
 * or selected file is about to be removed. If you cancel the event, the removal is prevented.
 *
 * ```ts-no-run
 *  @Component({
 *    selector: 'my-upload',
 *    template: `
 *    <kendo-upload
 *      [saveUrl]="uploadSaveUrl"
 *      [removeUrl]="uploadRemoveUrl"
 *      (remove)="removeEventHandler($event)">
 *    </kendo-upload>
 *    `
 *  })
 *  export class UploadComponent {
 *    uploadSaveUrl = 'saveUrl'; // should represent an actual API endpoint
 *    uploadRemoveUrl = 'removeUrl'; // should represent an actual API endpoint
 *
 *    removeEventHandler(e: RemoveEvent) {
 *      console.log('Removing a file');
 *    }
 *  }
 * ```
 */
class RemoveEvent extends PreventableEvent {
    /**
     * Constructs the event arguments for the `remove` event.
     * @param files - The list of the files that will be removed.
     * @param headers - The headers of the request.
     */
    constructor(files, headers) {
        super();
        this.files = files;
        this.headers = headers;
    }
}

/**
 * Arguments for the `resume` event. The `resume` event fires when the user
 * resumes the upload of a file that has been previously paused.
 *
 * ```ts-no-run
 *  @Component({
 *    selector: 'my-upload',
 *    template: `
 *    <kendo-upload
 *      [chunkable]="true"
 *      [saveUrl]="uploadSaveUrl"
 *      [removeUrl]="uploadRemoveUrl"
 *      (resume)="resumeEventHandler($event)">
 *    </kendo-upload>
 *    `
 *  })
 *  export class UploadComponent {
 *    uploadSaveUrl = 'saveUrl'; // should represent an actual API endpoint
 *    uploadRemoveUrl = 'removeUrl'; // should represent an actual API endpoint
 *
 *    resumeEventHandler(ev: ResumeEvent) {
 *      console.log('File resumed');
 *    }
 *  }
 * ```
 *
 */
class ResumeEvent {
    /**
     * Constructs the event arguments for the `resume` event.
     * @param file - The file that is going to be resumed.
     */
    constructor(file) {
        this.file = file;
    }
}

/**
 * Arguments for the `select` event. The `select` event fires when the user
 * selects a file or multiple files for upload. If you cancel the event, the selection is prevented.
 *
 * ```ts-no-run
 *  @Component({
 *    selector: 'my-upload',
 *    template: `
 *    <kendo-upload
 *      [saveUrl]="uploadSaveUrl"
 *      [removeUrl]="uploadRemoveUrl"
 *      (select)="selectEventHandler($event)">
 *    </kendo-upload>
 *    `
 *  })
 *  export class UploadComponent {
 *    uploadSaveUrl = 'saveUrl'; // should represent an actual API endpoint
 *    uploadRemoveUrl = 'removeUrl'; // should represent an actual API endpoint
 *
 *    selectEventHandler(e: SelectEvent) {
 *      console.log('File selected');
 *    }
 *  }
 * ```
 */
class SelectEvent extends PreventableEvent {
    /**
     * Constructs the event arguments for the `select` event.
     * @param files - The list of the selected files.
     */
    constructor(files) {
        super();
        this.files = files;
    }
}

/**
 * Arguments for the `success` event. The `success` event fires when
 * the selected files are successfully uploaded or removed.
 *
 * ```ts-no-run
 *  @Component({
 *    selector: 'my-upload',
 *    template: `
 *    <kendo-upload
 *      [saveUrl]="uploadSaveUrl"
 *      [removeUrl]="uploadRemoveUrl"
 *      (success)="successEventHandler($event)">
 *    </kendo-upload>
 *    `
 *  })
 *  export class UploadComponent {
 *    uploadSaveUrl = 'saveUrl'; // should represent an actual API endpoint
 *    uploadRemoveUrl = 'removeUrl'; // should represent an actual API endpoint
 *
 *    successEventHandler(e: SuccessEvent) {
 *      console.log('The ' + e.operation + ' was successful!');
 *    }
 *  }
 * ```
 */
class SuccessEvent extends PreventableEvent {
    /**
     * Constructs the event arguments for the `success` event.
     * @param files - The list of the files that were uploaded or removed.
     * @param operation - The operation type (`upload` or `remove`).
     * @param response - The response object returned by the server.
     */
    constructor(files, operation, response) {
        super();
        this.files = files;
        this.operation = operation;
        this.response = response;
    }
}

/**
 * Arguments for the `upload` event. The `upload` event fires when one or more files are about
 * to be uploaded. If you cancel the event, the upload is prevented. You can add headers to the request.
 *
 * ```ts-no-run
 *  @Component({
 *    selector: 'my-upload',
 *    template: `
 *    <kendo-upload
 *      [saveUrl]="uploadSaveUrl"
 *      [removeUrl]="uploadRemoveUrl"
 *      (upload)="uploadEventHandler($event)">
 *    </kendo-upload>
 *    `
 *  })
 *  export class UploadComponent {
 *    uploadSaveUrl = 'saveUrl'; // should represent an actual API endpoint
 *    uploadRemoveUrl = 'removeUrl'; // should represent an actual API endpoint
 *
 *    uploadEventHandler(e: UploadEvent) {
 *      e.headers = e.headers.append('X-Foo', 'Bar');
 *    }
 *  }
 * ```
 */
class UploadEvent extends PreventableEvent {
    /**
     * Constructs the event arguments for the `upload` event.
     * @param files - The list of the files that will be uploaded.
     * @param headers - The headers of the request.
     */
    constructor(files, headers) {
        super();
        this.files = files;
        this.headers = headers;
    }
}

/**
 * Arguments for the `uploadprogress` event. The `uploadprogress` event
 * fires when the files are in the process of uploading.
 *
 * ```ts-no-run
 *  @Component({
 *    selector: 'my-upload',
 *    template: `
 *    <kendo-upload
 *      [saveUrl]="uploadSaveUrl"
 *      [removeUrl]="uploadRemoveUrl"
 *      (uploadProgress)="uploadProgressEventHandler($event)">
 *    </kendo-upload>
 *    `
 *  })
 *  export class UploadComponent {
 *    uploadSaveUrl = 'saveUrl'; // should represent an actual API endpoint
 *    uploadRemoveUrl = 'removeUrl'; // should represent an actual API endpoint
 *
 *    uploadProgressEventHandler(e: UploadProgressEvent) {
 *      console.log(e.files[0].name + ' is ' + e.percentComplete + ' uploaded');
 *    }
 *  }
 * ```
 */
class UploadProgressEvent {
    /**
     * Constructs the event arguments for the `uploadprogress` event.
     * @param files - The list of files that are being uploaded.
     * @param percentComplete - The portion that has been uploaded.
     */
    constructor(files, percentComplete) {
        this.files = files;
        this.percentComplete = percentComplete;
    }
}

/**
 * @hidden
 */
const fileGroupMap = {
    audio: [
        ".aif", ".iff", ".m3u", ".m4a", ".mid", ".mp3", ".mpa", ".wav", ".wma", ".ogg", ".wav", ".wma", ".wpl"
    ],
    video: [
        ".3g2", ".3gp", ".avi", ".asf", ".flv", ".m4u", ".rm", ".h264", ".m4v", ".mkv", ".mov", ".mp4", ".mpg", ".rm", ".swf", ".vob", ".wmv"
    ],
    image: [
        ".ai", ".dds", ".heic", ".jpe", "jfif", ".jif", ".jp2", ".jps", ".eps", ".bmp", ".gif", ".jpeg", ".jpg", ".png", ".ps", ".psd", ".svg", ".svgz", ".tif", ".tiff"
    ],
    txt: [
        ".doc", ".docx", ".log", ".pages", ".tex", ".wpd", ".wps", ".odt", ".rtf", ".text", ".txt", ".wks"
    ],
    presentation: [
        ".key", ".odp", ".pps", ".ppt", ".pptx"
    ],
    data: [
        ".xlr", ".xls", ".xlsx"
    ],
    programming: [
        ".tmp", ".bak", ".msi", ".cab", ".cpl", ".cur", ".dll", ".dmp", ".drv", ".icns", ".ico", ".link", ".sys", ".cfg",
        ".ini", ".asp", ".aspx", ".cer", ".csr", ".css", ".dcr", ".htm", ".html", ".js", ".php", ".rss", ".xhtml"
    ],
    pdf: [
        ".pdf"
    ],
    config: [
        ".apk", ".app", ".bat", ".cgi", ".com", ".exe", ".gadget", ".jar", ".wsf"
    ],
    zip: [
        ".7z", ".cbr", ".gz", ".sitx", ".arj", ".deb", ".pkg", ".rar", ".rpm", ".tar.gz", ".z", ".zip", ".zipx"
    ],
    discImage: [
        ".dmg", ".iso", ".toast", ".vcd", ".bin", ".cue", ".mdf"
    ]
};

/* tslint:disable: no-bitwise */
/**
 * @hidden
 */
const getTotalFilesSizeMessage = (files) => {
    let totalSize = 0;
    let i;
    if (typeof files[0].size === "number") {
        for (i = 0; i < files.length; i++) {
            if (files[i].size) {
                totalSize += files[i].size;
            }
        }
    }
    else {
        return "";
    }
    totalSize /= 1024;
    if (totalSize < 1024) {
        return totalSize.toFixed(2) + " KB";
    }
    else {
        return (totalSize / 1024).toFixed(2) + " MB";
    }
};
const stripPath = (name) => {
    let slashIndex = name.lastIndexOf("\\");
    return (slashIndex !== -1) ? name.substr(slashIndex + 1) : name;
};
const getFileExtension = (fileName) => {
    const rFileExtension = /\.([^\.]+)$/;
    const matches = fileName.match(rFileExtension);
    return matches ? matches[0] : "";
};
/**
 * @hidden
 */
const validateInitialFileInfo = (file) => {
    if (file instanceof Object && file.hasOwnProperty("name")) {
        return true;
    }
    return false;
};
/**
 * @hidden
 */
const validateInitialFileSelectFile = (file) => {
    if (file instanceof File || validateInitialFileInfo(file)) {
        return true;
    }
    return false;
};
/**
 * @hidden
 */
const getInitialFileInfo = (fakeFile) => {
    fakeFile.extension = fakeFile.extension || getFileExtension(fakeFile.name);
    fakeFile.name = fakeFile.name;
    fakeFile.size = fakeFile.size || 0;
    if (!fakeFile.hasOwnProperty("state")) {
        fakeFile.state = FileState.Initial;
    }
    if (!fakeFile.hasOwnProperty("uid")) {
        fakeFile.uid = guid();
    }
    return fakeFile;
};
/**
 * @hidden
 */
const convertFileToFileInfo = (file) => {
    let fileInfo = getFileInfo(file);
    fileInfo.uid = guid();
    // Used to differentiate initial FileInfo objects and actual Files
    fileInfo.state = FileState.Selected;
    return fileInfo;
};
const getFileInfo = (rawFile) => {
    const fileName = rawFile.name;
    const fileSize = rawFile.size;
    return {
        extension: getFileExtension(fileName),
        name: fileName,
        rawFile: rawFile,
        size: fileSize,
        state: FileState.Selected
    };
};
/**
 * @hidden
 */
const getAllFileInfo = (rawFiles) => {
    let allFileInfo = new Array();
    let i;
    for (i = 0; i < rawFiles.length; i++) {
        allFileInfo.push(getFileInfo(rawFiles[i]));
    }
    return allFileInfo;
};
/**
 * @hidden
 */
const fileHasValidationErrors = (file) => {
    if (file.validationErrors && file.validationErrors.length > 0) {
        return true;
    }
    return false;
};
/**
 * @hidden
 */
const filesHaveValidationErrors = (files) => {
    for (let file of files) {
        if (fileHasValidationErrors(file)) {
            return true;
        }
    }
    return false;
};
/**
 * @hidden
 */
const inputFiles = (input) => {
    if (input.files) {
        return getAllFileInfo(input.files);
    }
    else {
        //Required for testing
        let fileNames = input.value.split("|").map((file, index) => {
            let fileName = file.trim();
            return {
                extension: getFileExtension(fileName),
                name: stripPath(fileName),
                rawFile: null,
                size: (index + 1) * 1000,
                state: FileState.Selected
            };
        });
        return fileNames;
    }
};
/**
 * @hidden
 */
const assignGuidToFiles = (files, isUnique) => {
    const uid = guid();
    return files.map((file) => {
        file.uid = isUnique ? guid() : uid;
        return file;
    });
};
const focusableRegex = /^(?:a|input|select|textarea|button|object)$/i;
/**
 * @hidden
 */
const IGNORE_TARGET_CLASSES = 'k-icon k-select k-input k-multiselect-wrap';
/**
 * @hidden
 */
const UPLOAD_CLASSES = 'k-upload-button k-clear-selected k-upload-selected k-upload-action';
const isVisible = (element) => {
    const rect = element.getBoundingClientRect();
    return !!(rect.width && rect.height) && window.getComputedStyle(element).visibility !== 'hidden';
};
const toClassList = (classNames) => String(classNames).trim().split(' ');
/**
 * @hidden
 */
const hasClasses = (element, classNames) => {
    const namesList = toClassList(classNames);
    return Boolean(toClassList(element.className).find((className) => namesList.indexOf(className) >= 0));
};
/**
 * @hidden
 */
const isFocusable = (element, checkVisibility = true) => {
    if (element.tagName) {
        const tagName = element.tagName.toLowerCase();
        const tabIndex = element.getAttribute('tabIndex');
        const validTabIndex = tabIndex !== null && !isNaN(tabIndex) && tabIndex > -1;
        let focusable = false;
        if (focusableRegex.test(tagName)) {
            focusable = !element.disabled;
        }
        else {
            focusable = validTabIndex;
        }
        return focusable && (!checkVisibility || isVisible(element));
    }
    return false;
};
/**
 * @hidden
 */
const getFileGroupCssClass = (fileExtension) => {
    const initial = 'k-i-file';
    for (let group in fileGroupMap) {
        if (fileGroupMap[group].indexOf(fileExtension) >= 0) {
            return `${initial}-${group}`;
        }
    }
    return initial;
};
/**
 * @hidden
 */
const isPresent = (value) => value !== null && value !== undefined;

/**
 * @hidden
 */
class ChunkMap {
    constructor() {
        this._files = {};
    }
    add(uid, totalChunks) {
        const initialChunkInfo = {
            index: 0,
            position: 0,
            retries: 0,
            totalChunks: totalChunks
        };
        this._files[uid] = initialChunkInfo;
        return initialChunkInfo;
    }
    remove(uid) {
        if (this.has(uid)) {
            this._files[uid] = null;
            delete this._files[uid];
        }
    }
    has(uid) {
        return uid in this._files;
    }
    get(uid) {
        return this._files[uid];
    }
}

/**
 * @hidden
 */
class UploadService {
    constructor(http) {
        this.http = http;
        this.cancelEvent = new EventEmitter();
        this.clearEvent = new EventEmitter();
        this.completeEvent = new EventEmitter();
        this.errorEvent = new EventEmitter();
        this.pauseEvent = new EventEmitter();
        this.removeEvent = new EventEmitter();
        this.resumeEvent = new EventEmitter();
        this.selectEvent = new EventEmitter();
        this.successEvent = new EventEmitter();
        this.uploadEvent = new EventEmitter();
        this.uploadProgressEvent = new EventEmitter();
        /**
         * Required for the `ControlValueAccessor` integration
         */
        this.changeEvent = new EventEmitter();
        /**
         * Default async settings
         */
        this.async = {
            autoUpload: true,
            batch: false,
            chunk: false,
            concurrent: true,
            removeField: "fileNames",
            removeHeaders: new HttpHeaders(),
            removeMethod: "POST",
            removeUrl: "",
            responseType: "json",
            saveField: "files",
            saveHeaders: new HttpHeaders(),
            saveMethod: "POST",
            saveUrl: "",
            withCredentials: true
        };
        /**
         * Default chunk settings
         */
        this.chunk = {
            autoRetryAfter: 100,
            size: 1024 * 1024,
            maxAutoRetries: 1,
            resumable: true
        };
        this.component = 'Upload';
        this.chunkMap = new ChunkMap();
        this.fileList = new FileMap();
    }
    get files() {
        return this.fileList;
    }
    setChunkSettings(settings) {
        if (settings !== false) {
            this.async.chunk = true;
            if (typeof settings === "object") {
                this.chunk = Object.assign({}, this.chunk, settings);
            }
        }
    }
    onChange() {
        let files = this.fileList.filesFlat.filter((file) => {
            return file.state === FileState.Initial ||
                file.state === FileState.Uploaded;
        });
        this.changeEvent.emit(files.length > 0 ? files : null);
    }
    addFiles(files) {
        let selectEventArgs = new SelectEvent(files);
        this.selectEvent.emit(selectEventArgs);
        if (!selectEventArgs.isDefaultPrevented()) {
            for (let file of files) {
                this.fileList.add(file);
            }
            if (this.async.autoUpload) {
                this.uploadFiles();
            }
        }
        if (this.component === 'FileSelect') {
            const flatFiles = this.fileList.filesFlat;
            this.changeEvent.emit(flatFiles.length > 0 ? flatFiles : null);
        }
    }
    addInitialFiles(initialFiles) {
        this.fileList.clear();
        initialFiles.forEach((file) => {
            let fakeFile = getInitialFileInfo(file);
            this.fileList.add(fakeFile);
        });
    }
    addInitialFileSelectFiles(initialFiles) {
        this.fileList.clear();
        initialFiles.forEach((file) => {
            if (file instanceof File) {
                this.fileList.add(convertFileToFileInfo(file));
            }
            else {
                this.fileList.add(getInitialFileInfo(file));
            }
        });
    }
    resumeFile(uid) {
        const fileToResume = this.fileList.get(uid);
        this.resumeEvent.emit(new ResumeEvent(fileToResume[0]));
        this.fileList.setFilesStateByUid(uid, FileState.Uploading);
        this._uploadFiles([fileToResume]);
    }
    pauseFile(uid) {
        let pausedFile = this.fileList.get(uid)[0];
        this.pauseEvent.emit(new PauseEvent(pausedFile));
        this.fileList.setFilesStateByUid(uid, FileState.Paused);
    }
    removeFiles(uid) {
        let removedFiles = this.fileList.get(uid);
        // Clone the Headers so that the default ones are not overridden
        let removeEventArgs = new RemoveEvent(removedFiles, this.cloneRequestHeaders(this.async.removeHeaders));
        this.removeEvent.emit(removeEventArgs);
        if (!removeEventArgs.isDefaultPrevented()) {
            if (this.component === 'Upload' &&
                (removedFiles[0].state === FileState.Uploaded ||
                    removedFiles[0].state === FileState.Initial)) {
                this.performRemove(removedFiles, removeEventArgs);
            }
            else {
                this.fileList.remove(uid);
                if (this.component === 'FileSelect') {
                    const flatFiles = this.fileList.filesFlat;
                    this.changeEvent.emit(flatFiles.length > 0 ? flatFiles : null);
                }
            }
        }
    }
    cancelFiles(uid) {
        let canceledFiles = this.fileList.get(uid);
        let cancelEventArgs = new CancelEvent(canceledFiles);
        this.cancelEvent.emit(cancelEventArgs);
        for (let file of canceledFiles) {
            if (file.httpSubscription) {
                file.httpSubscription.unsubscribe();
            }
        }
        this.fileList.remove(uid);
        this.checkAllComplete();
    }
    clearFiles() {
        let clearEventArgs = new ClearEvent();
        this.clearEvent.emit(clearEventArgs);
        if (!clearEventArgs.isDefaultPrevented()) {
            let triggerChange = this.fileList.hasFileWithState([
                FileState.Initial,
                FileState.Uploaded
            ]);
            this.fileList.clear();
            if (triggerChange) {
                this.onChange();
            }
        }
    }
    uploadFiles() {
        let filesToUpload = [];
        if (this.async.concurrent) {
            filesToUpload = this.fileList.filesToUpload;
        }
        if (!this.async.concurrent && !this.fileList.hasFileWithState([FileState.Uploading])) {
            filesToUpload = [this.fileList.firstFileToUpload];
        }
        if (filesToUpload && filesToUpload.length > 0) {
            this._uploadFiles(filesToUpload);
        }
    }
    retryFiles(uid) {
        let filesToRetry = [this.fileList.get(uid)];
        if (filesToRetry) {
            this._uploadFiles(filesToRetry);
        }
    }
    _uploadFiles(allFiles) {
        for (let filesToUpload of allFiles) {
            if (filesToUpload[0].state === FileState.Paused) {
                return;
            }
            // Clone the Headers so that the default ones are not overridden
            let uploadEventArgs = new UploadEvent(filesToUpload, this.cloneRequestHeaders(this.async.saveHeaders));
            this.uploadEvent.emit(uploadEventArgs);
            if (!uploadEventArgs.isDefaultPrevented()) {
                this.fileList.setFilesState(filesToUpload, FileState.Uploading);
                let httpSubcription = this.performUpload(filesToUpload, uploadEventArgs);
                filesToUpload.forEach((file) => {
                    file.httpSubscription = httpSubcription;
                });
            }
            else {
                this.fileList.remove(filesToUpload[0].uid);
            }
        }
    }
    performRemove(files, removeEventArgs) {
        const async = this.async;
        let fileNames = files.map((file) => {
            return file.name;
        });
        let formData = this.populateRemoveFormData(fileNames, removeEventArgs.data);
        let options = this.populateRequestOptions(removeEventArgs.headers);
        let removeRequest = new HttpRequest(async.removeMethod, async.removeUrl, formData, options);
        this.http.request(removeRequest)
            .subscribe(success => {
            this.onSuccess(success, files, "remove");
        }, error => {
            this.onError(error, files, "remove");
        });
    }
    performUpload(files, uploadEventArgs) {
        const async = this.async;
        let formData = this.populateUploadFormData(files, uploadEventArgs.data);
        let options = this.populateRequestOptions(uploadEventArgs.headers);
        let uploadRequest = new HttpRequest(async.saveMethod, async.saveUrl, formData, options);
        let httpSubscription = this.http.request(uploadRequest)
            .subscribe(event => {
            if (event.type === HttpEventType.UploadProgress && !this.async.chunk) {
                this.onProgress(event, files);
            }
            else if (event instanceof HttpResponse) {
                this.onSuccess(event, files, "upload");
                this.checkAllComplete();
            }
        }, error => {
            this.onError(error, files, "upload");
            this.checkAllComplete();
        });
        return httpSubscription;
    }
    onSuccess(successResponse, files, operation) {
        if (operation === "upload" && this.async.chunk) {
            this.onChunkProgress(files);
            if (this.isChunkUploadComplete(files[0].uid)) {
                this.removeChunkInfo(files[0].uid);
            }
            else {
                this.updateChunkInfo(files[0].uid);
                this._uploadFiles([files]);
                return;
            }
        }
        const successArgs = new SuccessEvent(files, operation, successResponse);
        this.successEvent.emit(successArgs);
        if (operation === "upload") {
            this.fileList.setFilesState(files, successArgs.isDefaultPrevented() ? FileState.Failed : FileState.Uploaded);
        }
        else {
            if (!successArgs.isDefaultPrevented()) {
                this.fileList.remove(files[0].uid);
            }
        }
        if (!successArgs.isDefaultPrevented()) {
            this.onChange();
        }
    }
    onError(errorResponse, files, operation) {
        if (operation === "upload" && this.async.chunk) {
            const maxRetries = this.chunk.maxAutoRetries;
            const chunkInfo = this.chunkMap.get(files[0].uid);
            if (chunkInfo.retries < maxRetries) {
                chunkInfo.retries += 1;
                setTimeout(() => {
                    this.retryFiles(files[0].uid);
                }, this.chunk.autoRetryAfter);
                return;
            }
        }
        const errorArgs = new ErrorEvent(files, operation, errorResponse);
        this.errorEvent.emit(errorArgs);
        if (operation === "upload") {
            this.fileList.setFilesState(files, FileState.Failed);
        }
    }
    onProgress(event, files) {
        const percentComplete = Math.round(100 * event.loaded / event.total);
        const progressArgs = new UploadProgressEvent(files, percentComplete < 100 ? percentComplete : 100);
        this.uploadProgressEvent.emit(progressArgs);
    }
    onChunkProgress(files) {
        const chunkInfo = this.chunkMap.get(files[0].uid);
        let percentComplete = 0;
        if (chunkInfo) {
            if (chunkInfo.index === chunkInfo.totalChunks - 1) {
                percentComplete = 100;
            }
            else {
                percentComplete = Math.round(((chunkInfo.index + 1) / chunkInfo.totalChunks) * 100);
            }
        }
        const progressArgs = new UploadProgressEvent(files, percentComplete < 100 ? percentComplete : 100);
        this.uploadProgressEvent.emit(progressArgs);
    }
    checkAllComplete() {
        if (!this.fileList.hasFileWithState([
            FileState.Selected,
            FileState.Uploading,
            FileState.Paused
        ])) {
            this.completeEvent.emit();
        }
        else if (this.shouldUploadNextFile()) {
            this.uploadFiles();
        }
    }
    shouldUploadNextFile() {
        return !this.async.concurrent &&
            this.fileList.hasFileWithState([FileState.Selected]) &&
            !this.fileList.hasFileWithState([FileState.Uploading]);
    }
    cloneRequestHeaders(headers) {
        let cloned = {};
        if (headers) {
            headers.keys().forEach((key) => {
                cloned[key] = headers.get(key);
            });
        }
        return new HttpHeaders(cloned);
    }
    populateRequestOptions(headers) {
        return {
            headers: headers,
            reportProgress: true,
            responseType: this.async.responseType,
            withCredentials: this.async.withCredentials
        };
    }
    populateUploadFormData(files, clientData) {
        const saveField = this.async.saveField;
        let data = new FormData();
        this.populateClientFormData(data, clientData);
        if (this.async.chunk) {
            data.append(saveField, this.getNextChunk(files[0]));
            data.append("metadata", this.getChunkMetadata(files[0]));
        }
        else {
            for (let file of files) {
                data.append(saveField, file.rawFile);
            }
        }
        return data;
    }
    populateRemoveFormData(fileNames, clientData) {
        let data = new FormData();
        this.populateClientFormData(data, clientData);
        for (let fileName of fileNames) {
            data.append(this.async.removeField, fileName);
        }
        return data;
    }
    populateClientFormData(data, clientData) {
        for (var key in clientData) {
            if (clientData.hasOwnProperty(key)) {
                data.append(key, clientData[key]);
            }
        }
    }
    /* Chunking Helper Methods Section */
    getNextChunk(file) {
        const info = this.getChunkInfo(file);
        const newPosition = info.position + this.chunk.size;
        return file.rawFile.slice(info.position, newPosition);
    }
    getChunkInfo(file) {
        let chunkInfo = this.chunkMap.get(file.uid);
        if (!chunkInfo) {
            const totalChunks = Math.ceil(file.size / this.chunk.size);
            chunkInfo = this.chunkMap.add(file.uid, totalChunks);
        }
        return chunkInfo;
    }
    updateChunkInfo(uid) {
        const chunkInfo = this.chunkMap.get(uid);
        if (chunkInfo.index < chunkInfo.totalChunks - 1) {
            chunkInfo.index += 1;
            chunkInfo.position += this.chunk.size;
            chunkInfo.retries = 0;
        }
    }
    removeChunkInfo(uid) {
        this.chunkMap.remove(uid);
    }
    getChunkMetadata(file) {
        const chunkInfo = this.chunkMap.get(file.uid);
        const chunkMetadata = {
            chunkIndex: chunkInfo.index,
            contentType: file.rawFile.type,
            fileName: file.name,
            fileSize: file.size,
            fileUid: file.uid,
            totalChunks: chunkInfo.totalChunks
        };
        return JSON.stringify(chunkMetadata);
    }
    isChunkUploadComplete(uid) {
        const chunkInfo = this.chunkMap.get(uid);
        if (chunkInfo) {
            return chunkInfo.index + 1 === chunkInfo.totalChunks;
        }
        return false;
    }
}
UploadService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
UploadService.ctorParameters = () => [
    { type: HttpClient }
];

/**
 * @hidden
 */
class NavigationService {
    constructor(uploadService) {
        this.uploadService = uploadService;
        this.onActionButtonAction = new EventEmitter();
        this.onActionButtonFocus = new EventEmitter();
        this.onFileAction = new EventEmitter();
        this.onFileFocus = new EventEmitter();
        this.onTab = new EventEmitter();
        this.onWrapperFocus = new EventEmitter();
        this.onSelectButtonFocus = new EventEmitter();
        this.actionButtonsVisible = false;
        this.focused = false;
        this._focusedIndex = -1;
    }
    action(event) {
        const key = event.keyCode;
        return this.keyBindings[key];
    }
    process(event) {
        const handler = this.action(event);
        if (handler) {
            handler(event.shiftKey);
        }
    }
    computeKeys(direction) {
        this.keyBindings = {
            [Keys.Enter]: () => this.handleEnter(),
            [Keys.Escape]: () => this.handleEscape(),
            [Keys.Delete]: () => this.handleDelete(),
            [Keys.Tab]: (shifted) => this.handleTab(shifted),
            [Keys.ArrowUp]: () => this.handleUp(),
            [Keys.ArrowDown]: () => this.handleDown(),
            [this.invertKeys(direction, Keys.ArrowLeft, Keys.ArrowRight)]: () => this.handleLeft(),
            [this.invertKeys(direction, Keys.ArrowRight, Keys.ArrowLeft)]: () => this.handleRight()
        };
    }
    invertKeys(direction, original, inverted) {
        return direction === 'rtl' ? inverted : original;
    }
    focusSelectButton() {
        this.focused = true;
        this._focusedIndex = -1;
        this.onSelectButtonFocus.emit();
    }
    handleEnter() {
        if (this.lastIndex >= 0) {
            if (this.focusedIndex <= this.lastFileIndex) {
                this.onFileAction.emit(Keys.Enter);
                return;
            }
            if (this.actionButtonsVisible && this.focusedIndex <= this.lastIndex) {
                this.onActionButtonAction.emit(this.focusedIndex < this.lastIndex ? "clear" : "upload");
            }
        }
    }
    handleDelete() {
        if (this.focusedIndex >= 0 && this.focusedIndex <= this.lastFileIndex) {
            this.onFileAction.emit(Keys.Delete);
        }
    }
    handleEscape() {
        if (this.focusedIndex >= 0 && this.focusedIndex <= this.lastFileIndex) {
            this.onFileAction.emit(Keys.Escape);
        }
    }
    handleLeft() {
        if (this.actionButtonsVisible && this.focusedIndex === this.lastIndex) {
            this.focusedIndex -= 1;
            this.onActionButtonFocus.emit("clear");
        }
    }
    handleRight() {
        if (this.actionButtonsVisible && this.focusedIndex === this.lastIndex - 1) {
            this.focusedIndex += 1;
            this.onActionButtonFocus.emit("upload");
        }
    }
    handleTab(shifted) {
        if (this.focusedIndex >= 0 && shifted) {
            this.focusedIndex = -1;
            return;
        }
        this.onTab.emit();
    }
    handleDown() {
        if (this.lastIndex >= 0 && this.focusedIndex < this.lastIndex) {
            if (this.focusedIndex < this.lastFileIndex) {
                this.focusedIndex += 1;
                this.onFileFocus.emit(this.focusedIndex);
                return;
            }
            if (this.actionButtonsVisible && this.focusedIndex === this.lastFileIndex) {
                this.focusedIndex += 1;
                this.onActionButtonFocus.emit("clear");
            }
        }
    }
    handleUp() {
        if (this.lastIndex >= 0 && this.focusedIndex > -1) {
            this.focusedIndex -= 1;
            if (this.focusedIndex === -1) {
                this.onSelectButtonFocus.emit();
                return;
            }
            if (this.focusedIndex <= this.lastFileIndex) {
                this.onFileFocus.emit(this.focusedIndex);
                return;
            }
            if (this.actionButtonsVisible && this.focusedIndex <= this.lastIndex) {
                this.focusedIndex = this.lastFileIndex;
                this.onFileFocus.emit(this.focusedIndex);
            }
        }
    }
    get focusedIndex() {
        return this._focusedIndex;
    }
    set focusedIndex(index) {
        if (!this.focused) {
            this.onWrapperFocus.emit();
        }
        this._focusedIndex = index;
        this.focused = true;
        if (this._focusedIndex >= 0 && this._focusedIndex <= this.lastFileIndex) {
            this.onFileFocus.emit(index);
        }
    }
    get lastFileIndex() {
        return this.actionButtonsVisible ? this.lastIndex - 2 : this.lastIndex;
    }
    get lastIndex() {
        const fileCount = this.uploadService.files.count;
        return this.actionButtonsVisible ? fileCount + 1 : fileCount - 1;
    }
}
NavigationService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
NavigationService.ctorParameters = () => [
    { type: UploadService }
];

/**
 * Used to customize the rendering of the files in the list ([see example]({% slug templates_upload %})).
 */
class FileTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
FileTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoUploadFileTemplate], [kendoFileSelectFileTemplate]' // tslint:disable-line:directive-selector-prefix
            },] },
];
/** @nocollapse */
FileTemplateDirective.ctorParameters = () => [
    { type: TemplateRef }
];

let components = {};
/**
 * @hidden
 */
class DropZoneService {
    addComponent(component, zoneId) {
        if (this.has(zoneId)) {
            components[zoneId].push(component);
        }
        else {
            components[zoneId] = [component];
        }
    }
    getComponents(zoneId) {
        return components[zoneId];
    }
    has(id) {
        return id in components;
    }
}
DropZoneService.decorators = [
    { type: Injectable },
];

/**
 * @hidden
 */
const FILESELECT_VALUE_ACCESSOR = {
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FileSelectComponent) // tslint:disable-line:no-forward-ref
};
class FileSelectComponent {
    constructor(uploadService, localization, navigation, dropZoneService, ngZone, renderer, cdr, wrapper) {
        this.uploadService = uploadService;
        this.localization = localization;
        this.navigation = navigation;
        this.dropZoneService = dropZoneService;
        this.ngZone = ngZone;
        this.renderer = renderer;
        this.cdr = cdr;
        /**
         * Disables the FileSelect.
         * The default value is `false`.
         */
        this.disabled = false;
        /**
         * Enables the selection of multiple files
         * ([see example]({% slug fileprocessing_upload %}#toc-upload-of-sinlge-or-multiple-files)).
         * If set to `false`, only one file can be selected at a time.
         */
        this.multiple = true;
        /**
         * Toggles the visibility of the file list.
         */
        this.showFileList = true;
        /**
         * Specifies the [`tabindex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) of the FileSelect.
         */
        this.tabindex = 0;
        /**
         * @hidden
         */
        this.focusableId = `k-${guid()}`;
        /**
         * Fires when the user navigates outside the component.
         */
        this.onBlur = new EventEmitter();
        /**
         * Fires when the component is focused.
         */
        this.onFocus = new EventEmitter();
        /**
         * Fires when files are selected. If prevented, the selected files will not be added to the list.
         */
        this.select = new EventEmitter();
        /**
         * Fires when a file is about to be removed. If prevented, the file will remain in the list.
         */
        this.remove = new EventEmitter();
        /**
         * Fires when the value of the component has changed as a result of a successful `select` or `remove` operation.
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
        this.wrapper = wrapper.nativeElement;
        this.direction = localization.rtl ? 'rtl' : 'ltr';
        this.navigation.computeKeys(this.direction);
        this.fileList = this.uploadService.files;
        this.localizationChangeSubscription = localization.changes.subscribe(({ rtl }) => {
            this.direction = rtl ? 'rtl' : 'ltr';
            this.navigation.computeKeys(this.direction);
        });
        this.subscribeBlur();
        this.subscribeFocus();
        this.attachEventHandlers();
        this.setDefaultSettings();
    }
    /**
     * Sets the `name` attribute of the `input` element of the FileSelect.
     */
    set name(name) {
        this.uploadService.async.saveField = name;
    }
    get name() {
        return this.uploadService.async.saveField;
    }
    /**
     * Sets the restrictions for selected files.
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
        this.renderer.removeAttribute(this.wrapper, "tabindex");
        if (this.zoneId) {
            this.dropZoneService.addComponent(this, this.zoneId);
        }
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
                if (!validateInitialFileSelectFile(file)) {
                    isValid = false;
                }
            });
            if (isValid) {
                this.uploadService.addInitialFileSelectFiles(newValue);
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
     * Removes specific file from the file list.
     */
    removeFileByUid(uid) {
        this.uploadService.removeFiles(uid);
    }
    /**
     * Visually clears all files from the UI.
     */
    clearFiles() {
        this.uploadService.clearFiles();
    }
    /**
     * @hidden
     * Used to determine if the component is empty.
     */
    isEmpty() {
        return false;
    }
    /**
     * @hidden
     * Used by the external dropzone to add files to the FileSelect
     */
    addFiles(files) {
        this.uploadService.addFiles(files);
    }
    /**
     * @hidden
     */
    get selectButtonTabIndex() {
        return this.disabled ? undefined : this.tabindex;
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
    subscribeBlur() {
        if (!isDocumentAvailable()) {
            return;
        }
        this.ngZone.runOutsideAngular(() => {
            this.documentClick = fromEvent(document, 'click').pipe(filter((event) => {
                return !(this.wrapper !== event.target && this.wrapper.contains(event.target));
            }));
            this.blurSubscription = merge(this.documentClick, this.navigation.onTab).subscribe(() => {
                if (this.navigation.focused) {
                    this.ngZone.run(() => {
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
        this.subs = this.uploadService.changeEvent.subscribe((files) => {
            let model = [];
            if (files !== null) {
                files.forEach((file) => {
                    if (file.state === FileState.Initial) {
                        model.push(file);
                    }
                    if (file.state === FileState.Selected && file.rawFile && !file.validationErrors) {
                        model.push(file.rawFile);
                    }
                });
            }
            if (model.length === 0) {
                model = null;
            }
            this.onChangeCallback(model);
            this.valueChange.emit(model);
        });
        this.subs.add(this.uploadService.removeEvent.subscribe((args) => {
            this.remove.emit(args);
        }));
        this.subs.add(this.uploadService.selectEvent.subscribe((args) => {
            this.select.emit(args);
        }));
    }
    setDefaultSettings() {
        this.uploadService.async.autoUpload = false;
        this.uploadService.component = 'FileSelect';
    }
}
FileSelectComponent.decorators = [
    { type: Component, args: [{
                exportAs: 'kendoFileSelect',
                providers: [
                    LocalizationService,
                    NavigationService,
                    UploadService,
                    DropZoneService,
                    FILESELECT_VALUE_ACCESSOR,
                    {
                        provide: L10N_PREFIX,
                        useValue: 'kendo.fileselect'
                    },
                    {
                        provide: KendoInput,
                        useExisting: forwardRef(() => FileSelectComponent)
                    }
                ],
                selector: 'kendo-fileselect',
                template: `
        <ng-container kendoFileSelectLocalizedMessages
            i18n-dropFilesHere="kendo.fileselect.dropFilesHere|The drop zone hint"
            dropFilesHere="Drop files here to select"

            i18n-invalidFileExtension="kendo.fileselect.invalidFileExtension|The text for the invalid allowed extensions restriction message"
            invalidFileExtension="File type not allowed."

            i18n-invalidMaxFileSize="kendo.fileselect.invalidMaxFileSize|The text for the invalid max file size restriction message"
            invalidMaxFileSize="File size too large."

            i18n-invalidMinFileSize="kendo.fileselect.invalidMinFileSize|The text for the invalid min file size restriction message"
            invalidMinFileSize="File size too small."

            i18n-remove="kendo.fileselect.remove|The text for the Remove button"
            remove="Remove"

            i18n-select="kendo.fileselect.select|The text for the Select button"
            select="Select files..."
        >
        </ng-container>
        <div kendoFileSelectInternalDropZone
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
            <div class="k-dropzone-hint">{{textFor('dropFilesHere')}}</div>
        </div>
        <ul kendo-upload-file-list
            class="k-upload-files k-reset"
            *ngIf="showFileList && fileList.count > 0"
            [disabled]="disabled"
            [fileList]="fileList.files"
            [fileTemplate]="fileTemplate">
        </ul>
    `
            },] },
];
/** @nocollapse */
FileSelectComponent.ctorParameters = () => [
    { type: UploadService },
    { type: LocalizationService },
    { type: NavigationService },
    { type: DropZoneService },
    { type: NgZone },
    { type: Renderer2 },
    { type: ChangeDetectorRef },
    { type: ElementRef }
];
FileSelectComponent.propDecorators = {
    accept: [{ type: Input }],
    disabled: [{ type: Input }],
    multiple: [{ type: Input }],
    name: [{ type: Input }],
    showFileList: [{ type: Input }],
    tabindex: [{ type: Input }],
    restrictions: [{ type: Input }],
    zoneId: [{ type: Input }],
    focusableId: [{ type: Input }],
    fileTemplate: [{ type: ContentChild, args: [FileTemplateDirective,] }],
    fileSelect: [{ type: ViewChild, args: ['fileSelect',] }],
    fileSelectButton: [{ type: ViewChild, args: ['fileSelectButton',] }],
    onBlur: [{ type: Output, args: ['blur',] }],
    onFocus: [{ type: Output, args: ['focus',] }],
    select: [{ type: Output }],
    remove: [{ type: Output }],
    valueChange: [{ type: Output }],
    hostDefaultClasses: [{ type: HostBinding, args: ['class.k-widget',] }, { type: HostBinding, args: ['class.k-upload',] }],
    hostDisabledClass: [{ type: HostBinding, args: ['class.k-state-disabled',] }],
    dir: [{ type: HostBinding, args: ['attr.dir',] }],
    handleKeydown: [{ type: HostListener, args: ['keydown', ['$event'],] }]
};

/**
 * @hidden
 */
class Messages extends ComponentMessages {
}
Messages.propDecorators = {
    cancel: [{ type: Input }],
    clearSelectedFiles: [{ type: Input }],
    dropFilesHere: [{ type: Input }],
    externalDropFilesHere: [{ type: Input }],
    filesBatchStatus: [{ type: Input }],
    filesBatchStatusFailed: [{ type: Input }],
    filesBatchStatusUploaded: [{ type: Input }],
    fileStatusFailed: [{ type: Input }],
    fileStatusUploaded: [{ type: Input }],
    headerStatusPaused: [{ type: Input }],
    headerStatusUploaded: [{ type: Input }],
    headerStatusUploading: [{ type: Input }],
    invalidFileExtension: [{ type: Input }],
    invalidMaxFileSize: [{ type: Input }],
    invalidMinFileSize: [{ type: Input }],
    pause: [{ type: Input }],
    remove: [{ type: Input }],
    resume: [{ type: Input }],
    retry: [{ type: Input }],
    select: [{ type: Input }],
    uploadSelectedFiles: [{ type: Input }]
};

/**
 * Custom component messages override default component messages ([more information and example]({% slug globalization_upload %})).
 *
 * @example
 * ```html-no-run
 * <kendo-fileselect>
 *     <kendo-fileselect-messages
 *         [dropFilesHere]="'Drop your file here'"
 *         [select]="'Upload file'">
 *     </kendo-fileselect-messages>
 * </kendo-fileselect>
 * ```
 */
class CustomMessagesComponent extends Messages {
    constructor(service) {
        super();
        this.service = service;
    }
    get override() {
        return true;
    }
}
CustomMessagesComponent.decorators = [
    { type: Component, args: [{
                providers: [
                    {
                        provide: Messages,
                        useExisting: forwardRef(() => CustomMessagesComponent) // tslint:disable-line:no-forward-ref
                    }
                ],
                selector: 'kendo-upload-messages, kendo-fileselect-messages, kendo-uploaddropzone-messages',
                template: ``
            },] },
];
/** @nocollapse */
CustomMessagesComponent.ctorParameters = () => [
    { type: LocalizationService }
];

/**
 * @hidden
 */
const INVALIDMAXFILESIZE = "invalidMaxFileSize";
/**
 * @hidden
 */
const INVALIDMINFILESIZE = "invalidMinFileSize";
/**
 * @hidden
 */
const INVALIDFILEEXTENSION = "invalidFileExtension";
const validateFileExtension = (file, allowedExtensions) => {
    if (allowedExtensions.length > 0) {
        if (allowedExtensions.indexOf(file.extension.toLowerCase()) < 0) {
            file.validationErrors = file.validationErrors || [];
            if (file.validationErrors.indexOf(INVALIDFILEEXTENSION) < 0) {
                file.validationErrors.push(INVALIDFILEEXTENSION);
            }
        }
    }
};
const validateFileSize = (file, minFileSize, maxFileSize) => {
    if (minFileSize !== 0 && file.size < minFileSize) {
        file.validationErrors = file.validationErrors || [];
        if (file.validationErrors.indexOf(INVALIDMINFILESIZE) < 0) {
            file.validationErrors.push(INVALIDMINFILESIZE);
        }
    }
    if (maxFileSize !== 0 && file.size > maxFileSize) {
        file.validationErrors = file.validationErrors || [];
        if (file.validationErrors.indexOf(INVALIDMAXFILESIZE) < 0) {
            file.validationErrors.push(INVALIDMAXFILESIZE);
        }
    }
};
const parseAllowedExtensions = (extensions) => {
    const allowedExtensions = extensions.map((ext) => {
        var parsedExt = (ext.substring(0, 1) === ".") ? ext : ("." + ext);
        return parsedExt.toLowerCase();
    });
    return allowedExtensions;
};
/**
 * @hidden
 */
const validateFiles = (files, restrictionInfo) => {
    const allowedExtensions = parseAllowedExtensions(restrictionInfo.allowedExtensions);
    const maxFileSize = restrictionInfo.maxFileSize;
    const minFileSize = restrictionInfo.minFileSize;
    let i;
    for (i = 0; i < files.length; i++) {
        validateFileExtension(files[i], allowedExtensions);
        validateFileSize(files[i], minFileSize, maxFileSize);
    }
};

/**
 * @hidden
 */
class DropZoneBase {
    constructor(element, renderer, hoverClass) {
        this.element = element;
        this.renderer = renderer;
        this.hideIntervalElement = null;
        this.hoverClass = hoverClass;
    }
    /**
     * @hidden
     */
    onElementDragEnterListener() {
        this.addClass(this.hoverClass);
        this.lastDragElement = new Date();
        if (!this.hideIntervalElement) {
            this.hideIntervalElement = setInterval(() => {
                if (this.calculateTimeDiff(this.lastDragElement) < 100) {
                    return;
                }
                this.removeClass(this.hoverClass);
                clearInterval(this.hideIntervalElement);
                this.hideIntervalElement = null;
            }, 100);
        }
        return false;
    }
    /**
     * @hidden
     */
    onElementDragOverListener() {
        this.lastDragElement = new Date();
        return false;
    }
    calculateTimeDiff(prevEvent) {
        return new Date().getTime() - prevEvent.getTime();
    }
    addClass(className) {
        this.renderer.addClass(this.element.nativeElement, className);
    }
    removeClass(className) {
        this.renderer.removeClass(this.element.nativeElement, className);
    }
}
DropZoneBase.propDecorators = {
    onElementDragEnterListener: [{ type: HostListener, args: ['dragenter',] }],
    onElementDragOverListener: [{ type: HostListener, args: ['dragover',] }]
};

/**
 * @hidden
 */
class DropZoneInternalDirective extends DropZoneBase {
    constructor(element, renderer, ngZone, uploadService) {
        super(element, renderer, 'k-dropzone-hover');
        this.ngZone = ngZone;
        this.uploadService = uploadService;
        this.initialClassName = true;
        this.hideIntervalDocument = null;
        this.activeClass = 'k-dropzone-active';
        this.ngZone.runOutsideAngular(() => {
            this.unsubscribeDocumentDragEnter = this.renderer.listen('document', 'dragenter', () => this.onDocumentDragEnter());
            this.unsubscribeDocumentDragOver = this.renderer.listen('document', 'dragover', () => this.onDocumentDragOver());
        });
    }
    ngOnDestroy() {
        this.ngZone.runOutsideAngular(() => {
            if (this.unsubscribeDocumentDragEnter) {
                this.unsubscribeDocumentDragEnter();
            }
            if (this.unsubscribeDocumentDragOver) {
                this.unsubscribeDocumentDragOver();
            }
        });
    }
    onDocumentDragEnter() {
        this.addClass(this.activeClass);
        this.lastDragDocument = new Date();
        if (!this.hideIntervalDocument) {
            this.hideIntervalDocument = setInterval(() => {
                if (this.calculateTimeDiff(this.lastDragDocument) < 100) {
                    return;
                }
                this.removeClass(this.activeClass);
                clearInterval(this.hideIntervalDocument);
                this.hideIntervalDocument = null;
            }, 100);
        }
        return false;
    }
    /**
     * @hidden
     */
    onDocumentDragOver() {
        this.lastDragDocument = new Date();
        return false;
    }
    onDropListener(event) {
        let droppedFiles = event.dataTransfer.files;
        if (droppedFiles.length > 0 && !this.disabled) {
            let files = getAllFileInfo(droppedFiles);
            files = assignGuidToFiles(files, !this.uploadService.async.batch);
            if (!this.multiple) {
                files.splice(1, files.length - 1);
                this.uploadService.clearFiles();
            }
            validateFiles(files, this.restrictions);
            this.uploadService.addFiles(files);
        }
        return false;
    }
}
DropZoneInternalDirective.decorators = [
    { type: Directive, args: [{
                selector: `
      [kendoUploadInternalDropZone],
      [kendoFileSelectInternalDropZone]
    `
            },] },
];
/** @nocollapse */
DropZoneInternalDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: NgZone },
    { type: UploadService }
];
DropZoneInternalDirective.propDecorators = {
    disabled: [{ type: Input }],
    multiple: [{ type: Input }],
    restrictions: [{ type: Input }],
    initialClassName: [{ type: HostBinding, args: ['class.k-dropzone',] }],
    onDropListener: [{ type: HostListener, args: ['drop', ['$event'],] }]
};

/**
 * @hidden
 */
class FileListItemDirective {
    constructor(el, navigationService, uploadService) {
        this.navigationService = navigationService;
        this.uploadService = uploadService;
        this.fileClass = true;
        this.focused = false;
        this.element = el;
    }
    focus() {
        this.element.nativeElement.focus();
    }
    get uidAttribute() {
        return this.files[0].uid;
    }
    get tabIndex() {
        return "-1";
    }
    get kFileError() {
        return this.files[0].state === FileState.Failed;
    }
    get kFileInvalid() {
        return filesHaveValidationErrors(this.files);
    }
    get kFileProgress() {
        return this.files[0].state === FileState.Uploading ||
            this.files[0].state === FileState.Paused;
    }
    get kFileSuccess() {
        if (this.uploadService.component === 'Upload') {
            return this.files[0].state === FileState.Uploaded ||
                this.files[0].state === FileState.Initial;
        }
        return false;
    }
    get kStateFocused() {
        return this.focused;
    }
    onFocus() {
        this.focused = true;
    }
    onBlur() {
        this.focused = false;
    }
    onClick(event) {
        if (!isFocusable(event.target) && !hasClasses(event.target, IGNORE_TARGET_CLASSES)) {
            this.navigationService.focusedIndex = this.index;
        }
    }
}
FileListItemDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoUploadFileListItem]'
            },] },
];
/** @nocollapse */
FileListItemDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: NavigationService },
    { type: UploadService }
];
FileListItemDirective.propDecorators = {
    files: [{ type: Input }],
    index: [{ type: Input }],
    fileClass: [{ type: HostBinding, args: ['class.k-file',] }],
    uidAttribute: [{ type: HostBinding, args: ['attr.data-uid',] }],
    tabIndex: [{ type: HostBinding, args: ['attr.tabIndex',] }],
    kFileError: [{ type: HostBinding, args: ['class.k-file-error',] }],
    kFileInvalid: [{ type: HostBinding, args: ['class.k-file-invalid',] }],
    kFileProgress: [{ type: HostBinding, args: ['class.k-file-progress',] }],
    kFileSuccess: [{ type: HostBinding, args: ['class.k-file-success',] }],
    kStateFocused: [{ type: HostBinding, args: ['class.k-state-focused',] }],
    onFocus: [{ type: HostListener, args: ["focus",] }],
    onBlur: [{ type: HostListener, args: ["blur",] }],
    onClick: [{ type: HostListener, args: ['click', ['$event'],] }]
};

/* tslint:disable:component-selector */
/**
 * @hidden
 */
class FileListComponent {
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

/**
 * @hidden
 */
class FileListItemActionButtonComponent {
    constructor(uploadService, localization) {
        this.uploadService = uploadService;
        this.localization = localization;
        this.actionFocused = false;
        this.retryFocused = false;
        this.pauseResumeFocused = false;
    }
    onFocus(type) {
        if (type === 'action') {
            this.actionFocused = true;
        }
        if (type === 'retry') {
            this.retryFocused = true;
        }
        if (type === 'pauseResume') {
            this.pauseResumeFocused = true;
        }
    }
    onBlur(type) {
        if (type === 'retry') {
            this.retryFocused = false;
        }
        if (type === 'action') {
            this.actionFocused = false;
        }
        if (type === 'pauseResume') {
            this.pauseResumeFocused = false;
        }
    }
    onRetryClick() {
        if (this.disabled) {
            return;
        }
        this.uploadService.retryFiles(this.file.uid);
    }
    onRemoveCancelClick() {
        if (this.disabled) {
            return;
        }
        const uid = this.file.uid;
        if (this.file.state === FileState.Uploading) {
            this.uploadService.cancelFiles(uid);
        }
        else {
            this.uploadService.removeFiles(uid);
        }
    }
    onPauseResumeClick() {
        if (this.disabled) {
            return;
        }
        const uid = this.file.uid;
        if (this.file.state === FileState.Paused) {
            this.uploadService.resumeFile(uid);
        }
        else {
            this.uploadService.pauseFile(uid);
        }
    }
    get actionButtonTitle() {
        if (this.file.state === FileState.Uploading) {
            return this.localization.get('cancel');
        }
        return this.localization.get('remove');
    }
    get retryButtonTitle() {
        return this.localization.get('retry');
    }
    get pauseResumeButtonTitle() {
        if (this.file.state === FileState.Uploading) {
            return this.localization.get('pause');
        }
        return this.localization.get('resume');
    }
    get isUploading() {
        return this.file.state === FileState.Uploading;
    }
    get isFailed() {
        return this.file.state === FileState.Failed;
    }
    get isPaused() {
        return this.file.state === FileState.Paused;
    }
    get isResumable() {
        const service = this.uploadService;
        const isResumable = service.async.chunk && service.chunk.resumable;
        const isUploading = (this.file.state === FileState.Paused) || (this.file.state === FileState.Uploading);
        return isResumable && isUploading;
    }
    get isActionButtonVisible() {
        if ((this.file.state === FileState.Uploaded || this.file.state === FileState.Initial) &&
            !this.uploadService.async.removeUrl && this.uploadService.component === 'Upload') {
            return false;
        }
        return true;
    }
}
FileListItemActionButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-upload-file-list-item-action-button',
                template: `
      <strong class="k-upload-status">
        <span class="k-upload-pct" *ngIf="isUploading || isPaused">{{progress}}%</span>

        <button type="button" *ngIf="isFailed" class="k-button k-button-icon k-flat k-upload-action"
          [ngClass]="{ 'k-state-focused': this.retryFocused }"
          [attr.tabIndex]="-1"
          (focus)="onFocus('retry')"
          (blur)="onBlur('retry')"
          (click)="onRetryClick()">
          <span class="k-icon k-retry k-i-refresh-sm"
            [attr.aria-label]="retryButtonTitle"
            [attr.title]="retryButtonTitle">
          </span>
        </button>

        <button *ngIf="isResumable" type="button" class="k-button k-button-icon k-flat k-upload-action"
          [ngClass]="{ 'k-state-focused': this.pauseResumeFocused }"
          [attr.tabIndex]="-1"
          (focus)="onFocus('pauseResume')"
          (blur)="onBlur('pauseResume')"
          (click)="onPauseResumeClick()">
          <span class="k-icon"
            [ngClass]="{
              'k-i-play-sm': isPaused,
              'k-i-pause-sm': !isPaused
            }"
            [attr.aria-label]='pauseResumeButtonTitle'
            [attr.title]='pauseResumeButtonTitle'>
          </span>
        </button>

        <button type="button" *ngIf="isActionButtonVisible" class="k-button k-button-icon k-flat k-upload-action"
          [ngClass]="{ 'k-state-focused': this.actionFocused }"
          [attr.tabIndex]="-1"
          (focus)="onFocus('action')"
          (blur)="onBlur('action')"
          (click)="onRemoveCancelClick()">
          <span class="k-icon"
            [ngClass]="{
              'k-i-cancel': isUploading,
              'k-delete k-i-x': !isUploading
            }"
            [attr.aria-label]='actionButtonTitle'
            [attr.title]='actionButtonTitle'>
          </span>
        </button>
      </strong>
    `
            },] },
];
/** @nocollapse */
FileListItemActionButtonComponent.ctorParameters = () => [
    { type: UploadService },
    { type: LocalizationService }
];
FileListItemActionButtonComponent.propDecorators = {
    file: [{ type: Input }],
    disabled: [{ type: Input }],
    progress: [{ type: Input }]
};

/**
 * @hidden
 */
class FileListItemBase {
    constructor(uploadService) {
        this.uploadService = uploadService;
        this.progressComplete = 0;
    }
    subscribeUploadProgress(uploadProgressHandler) {
        this.uploadProgressSubscription = this.uploadService.uploadProgressEvent.subscribe(uploadProgressHandler);
    }
    fileHasValidationErrors(file) {
        return fileHasValidationErrors(file);
    }
    filesHaveValidationErrors(files) {
        return filesHaveValidationErrors(files);
    }
    ngOnDestroy() {
        this.uploadProgressSubscription.unsubscribe();
    }
    getFileValidationMessage(file) {
        let validationMessage;
        if (file.validationErrors && file.validationErrors.length > 0) {
            validationMessage = this.localization.get(file.validationErrors[0]);
        }
        return validationMessage;
    }
    getTotalFilesSizeMessage(files) {
        return getTotalFilesSizeMessage(files);
    }
    textFor(key) {
        return this.localization.get(key);
    }
}

/**
 * @hidden
 */
class FileListMultipleItemsComponent extends FileListItemBase {
    constructor(localization, uploadService) {
        super(uploadService);
        this.localization = localization;
        this.subscribeUploadProgress((args) => {
            if (args.files[0].uid === this.files[0].uid) {
                this.progressComplete = args.percentComplete;
            }
        });
    }
    get showProgress() {
        const showProgress = this.files[0].state === FileState.Uploading || this.files[0].state === FileState.Paused;
        return showProgress ? 'active' : 'inactive';
    }
    ngOnInit() {
        this.filesHaveErrors = super.filesHaveValidationErrors(this.files);
    }
    fileStatusText(file) {
        const errors = file.validationErrors;
        if (!isPresent(errors)) {
            return this.getTotalFilesSizeMessage([file]);
        }
        return this.getFileValidationMessage(file);
    }
    get batchStatusText() {
        const state$$1 = this.files[0].state;
        const fileCount = this.files.length;
        if (state$$1 === FileState.Uploaded) {
            return `${fileCount} ${this.textFor('filesBatchStatusUploaded')}`;
        }
        if (state$$1 === FileState.Failed) {
            return `${fileCount} ${this.textFor('filesBatchStatusFailed')}`;
        }
        return `${fileCount} ${this.textFor('filesBatchStatus')}`;
    }
    get isUploadSuccessful() {
        return this.files[0].state === FileState.Uploaded;
    }
    get isUploadFailed() {
        return this.files[0].state === FileState.Failed;
    }
}
FileListMultipleItemsComponent.decorators = [
    { type: Component, args: [{
                animations: [
                    trigger('progressState', [
                        state('active', style({ opacity: 1 })),
                        state('inactive', style({ opacity: 0 })),
                        transition('void => active', style({ opacity: 0 })),
                        transition('inactive => active', style({ opacity: 1 })),
                        transition('active => inactive', animate('1s 2s ease-out'))
                    ])
                ],
                selector: 'kendo-upload-file-list-multiple-items',
                template: `
      <div class="k-progressbar" [@progressState]="showProgress">
        <span class="k-progress" [style.width]="progressComplete + '%'"></span>
      </div>
      <span class="k-multiple-files-group-wrapper">
        <span class="k-file-group k-icon k-i-copy"></span>
      </span>
      <span class="k-multiple-files-wrapper">
        <span *ngFor="let file of files" class="k-file-name-size-wrapper">
            <span [title]="file.name" class="k-file-name">
                {{file.name}}
            </span>
            <span [ngClass]="{
                    'k-text-error': file.validationErrors,
                    'k-file-validation-message': file.validationErrors,
                    'k-file-size': !file.validationErrors
                  }"
            >{{fileStatusText(file)}}</span>
        </span>
        <span class="k-file-information"
          [ngClass]="{
            'k-text-success': isUploadSuccessful,
            'k-text-error': isUploadFailed
          }"
        >{{batchStatusText}}</span>
      </span>
      <kendo-upload-file-list-item-action-button
        [file]='files[0]'
        [disabled]='disabled'
        [progress]='progressComplete'>
      </kendo-upload-file-list-item-action-button>
    `
            },] },
];
/** @nocollapse */
FileListMultipleItemsComponent.ctorParameters = () => [
    { type: LocalizationService },
    { type: UploadService }
];
FileListMultipleItemsComponent.propDecorators = {
    disabled: [{ type: Input }],
    files: [{ type: Input }]
};

/**
 * @hidden
 */
class FileListSingleItemComponent extends FileListItemBase {
    constructor(localization, uploadService) {
        super(uploadService);
        this.localization = localization;
        this.subscribeUploadProgress((args) => {
            if (args.files[0].uid === this.file.uid) {
                this.progressComplete = args.percentComplete;
            }
        });
    }
    get fileStatusText() {
        const errors = this.file.validationErrors;
        if (this.file.state === FileState.Uploaded) {
            return `${this.textFor('fileStatusUploaded')}`;
        }
        if (this.file.state === FileState.Failed) {
            return `${this.textFor('fileStatusFailed')}`;
        }
        if (!isPresent(errors)) {
            return this.getTotalFilesSizeMessage([this.file]);
        }
        return this.getFileValidationMessage(this.file);
    }
    get showProgress() {
        const showProgress = this.file.state === FileState.Uploading || this.file.state === FileState.Paused;
        return showProgress ? 'active' : 'inactive';
    }
    get fileGroupClass() {
        return getFileGroupCssClass(this.file.extension ? this.file.extension : '');
    }
    get isUploadSuccessful() {
        return this.file.state === FileState.Uploaded;
    }
    get isUploadFailed() {
        return this.file.state === FileState.Failed;
    }
    get isNotYetUploaded() {
        return !this.isUploadFailed && !this.isUploadSuccessful;
    }
}
FileListSingleItemComponent.decorators = [
    { type: Component, args: [{
                animations: [
                    trigger('progressState', [
                        state('active', style({ opacity: 1 })),
                        state('inactive', style({ opacity: 0 })),
                        transition('void => active', style({ opacity: 0 })),
                        transition('inactive => active', style({ opacity: 1 })),
                        transition('active => inactive', animate('1s 2s ease-out'))
                    ])
                ],
                selector: 'kendo-upload-file-list-single-item',
                template: `
      <div class="k-progressbar" [@progressState]="showProgress">
        <span class="k-progress" [style.width]="progressComplete + '%'"></span>
      </div>
      <span class="k-file-group-wrapper">
        <span class="k-file-group k-icon" [ngClass]="fileGroupClass"></span>
      </span>
      <span class="k-file-name-size-wrapper">
        <span class="k-file-name" [title]="file.name">{{ file.name }}</span>
        <span [ngClass]="{
                'k-file-validation-message': file.validationErrors,
                'k-file-size': !file.validationErrors && isNotYetUploaded,
                'k-text-success': isUploadSuccessful,
                'k-text-error': file.validationErrors || isUploadFailed,
                'k-file-information': isUploadSuccessful || isUploadFailed
              }"
        >{{fileStatusText}}</span>
      </span>
      <kendo-upload-file-list-item-action-button
        [file]='file'
        [disabled]='disabled'
        [progress]='progressComplete'>
      </kendo-upload-file-list-item-action-button>
    `
            },] },
];
/** @nocollapse */
FileListSingleItemComponent.ctorParameters = () => [
    { type: LocalizationService },
    { type: UploadService }
];
FileListSingleItemComponent.propDecorators = {
    disabled: [{ type: Input }],
    file: [{ type: Input }]
};

/**
 * @hidden
 */
class FileSelectDirective {
    constructor(uploadService, navigation, el) {
        this.uploadService = uploadService;
        this.navigation = navigation;
        this.type = "file";
        this.autocomplete = "off";
        this.tabIndex = -1;
        this.element = el;
    }
    get nameAttribute() {
        return this.uploadService.async.saveField;
    }
    get multipleAttribute() {
        return this.multiple ? "multiple" : null;
    }
    get dirAttribute() {
        return this.dir;
    }
    get disabledAttribute() {
        return this.disabled ? "true" : null;
    }
    onInputChange(event) {
        const ua = navigator.userAgent;
        const chrome = /(chrome)[ \/]([\w.]+)/i;
        const safari = /(webkit)[ \/]([\w.]+)/i;
        let selectedFiles = inputFiles(event.target);
        selectedFiles = assignGuidToFiles(selectedFiles, !this.uploadService.async.batch);
        validateFiles(selectedFiles, this.restrictions);
        if (!this.multiple) {
            this.uploadService.clearFiles();
        }
        this.uploadService.addFiles(selectedFiles);
        /*
        Chrome and Internet Explorer do not trigger a `change` event
        when a file with the same name is selected a number of consecutive times.
        As a workaround, clear the input value after handling the file.
        */
        const native = this.element.nativeElement;
        if (!(!ua.match(chrome) && ua.match(safari))) {
            native.type = "";
            native.type = "file";
        }
        setTimeout(() => {
            this.navigation.focusedIndex = -1;
        });
    }
}
FileSelectDirective.decorators = [
    { type: Directive, args: [{
                selector: '[kendoFileSelect]'
            },] },
];
/** @nocollapse */
FileSelectDirective.ctorParameters = () => [
    { type: UploadService },
    { type: NavigationService },
    { type: ElementRef }
];
FileSelectDirective.propDecorators = {
    dir: [{ type: Input }],
    disabled: [{ type: Input }],
    multiple: [{ type: Input }],
    restrictions: [{ type: Input }],
    type: [{ type: HostBinding, args: ["attr.type",] }],
    autocomplete: [{ type: HostBinding, args: ["attr.autocomplete",] }],
    tabIndex: [{ type: HostBinding, args: ["attr.tabindex",] }],
    nameAttribute: [{ type: HostBinding, args: ["attr.name",] }],
    multipleAttribute: [{ type: HostBinding, args: ["attr.multiple",] }],
    dirAttribute: [{ type: HostBinding, args: ["attr.dir",] }],
    disabledAttribute: [{ type: HostBinding, args: ["attr.disabled",] }],
    onInputChange: [{ type: HostListener, args: ["change", ["$event"],] }]
};

/**
 * @hidden
 */
class LocalizedMessagesDirective extends Messages {
    constructor(service) {
        super();
        this.service = service;
    }
}
LocalizedMessagesDirective.decorators = [
    { type: Directive, args: [{
                providers: [
                    {
                        provide: Messages,
                        useExisting: forwardRef(() => LocalizedMessagesDirective) // tslint:disable-line:no-forward-ref
                    }
                ],
                selector: `
    [kendoUploadLocalizedMessages],
    [kendoFileSelectLocalizedMessages],
    [kendoUploadDropZoneLocalizedMessages]
  `
            },] },
];
/** @nocollapse */
LocalizedMessagesDirective.ctorParameters = () => [
    { type: LocalizationService }
];

/**
 * @hidden
 */
class TemplateContextDirective {
    constructor(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
    set templateContext(context) {
        if (this.insertedViewRef) {
            this.viewContainerRef.remove(this.viewContainerRef.indexOf(this.insertedViewRef));
            this.insertedViewRef = undefined;
        }
        if (context.templateRef) {
            this.insertedViewRef = this.viewContainerRef.createEmbeddedView(context.templateRef, context);
        }
    }
}
TemplateContextDirective.decorators = [
    { type: Directive, args: [{
                selector: '[templateContext]' // tslint:disable-line:directive-selector
            },] },
];
/** @nocollapse */
TemplateContextDirective.ctorParameters = () => [
    { type: ViewContainerRef }
];
TemplateContextDirective.propDecorators = {
    templateContext: [{ type: Input }]
};

/* tslint:disable: no-use-before-declare */
/**
 * @hidden
 */
const UPLOAD_VALUE_ACCESSOR = {
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => UploadComponent) // tslint:disable-line:no-forward-ref
};
/**
 * Represents the [Kendo UI Upload component for Angular]({% slug overview_upload %}).
 */
class UploadComponent {
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

class UploadDropZoneDirective {
    constructor(dropZoneService) {
        this.dropZoneService = dropZoneService;
    }
    /**
     * @hidden
     */
    onElementDragEnter() {
        return false;
    }
    /**
     * @hidden
     */
    onElementDragOver() {
        return false;
    }
    /**
     * @hidden
     */
    onDropListener(event) {
        const components = this.componentInstance;
        if (!isPresent(components)) {
            return;
        }
        components.forEach((component) => {
            let droppedFiles = event.dataTransfer.files;
            if (droppedFiles.length > 0 && !component.disabled) {
                let files = getAllFileInfo(droppedFiles);
                if (component instanceof UploadComponent) {
                    files = assignGuidToFiles(files, !component.batch);
                }
                else {
                    files = assignGuidToFiles(files, true);
                }
                if (!component.multiple) {
                    files.splice(1, files.length - 1);
                    component.clearFiles();
                }
                validateFiles(files, component.restrictions);
                component.addFiles(files);
            }
        });
        return false;
    }
    /**
     * @hidden
     */
    get componentInstance() {
        return this.dropZoneService.getComponents(this.zoneId);
    }
}
UploadDropZoneDirective.decorators = [
    { type: Directive, args: [{
                providers: [
                    DropZoneService
                ],
                selector: '[kendoUploadDropZone], [kendoFileSelectDropZone]'
            },] },
];
/** @nocollapse */
UploadDropZoneDirective.ctorParameters = () => [
    { type: DropZoneService }
];
UploadDropZoneDirective.propDecorators = {
    zoneId: [{ type: Input, args: ['kendoUploadDropZone',] }],
    onElementDragEnter: [{ type: HostListener, args: ['dragenter',] }],
    onElementDragOver: [{ type: HostListener, args: ['dragover',] }],
    onDropListener: [{ type: HostListener, args: ['drop', ['$event'],] }]
};

/* tslint:disable: no-use-before-declare */
/**
 * Represents the [Kendo UI UploadDropZone component for Angular]({% slug overview_upload %}).
 */
class UploadDropZoneComponent extends DropZoneBase {
    constructor(element, renderer, localization) {
        super(element, renderer, 'k-external-dropzone-hover');
        this.localization = localization;
        this.hostClass = true;
        this.localizationChangeSubscription = this.localization.changes.subscribe(({ rtl }) => {
            this.direction = rtl ? 'rtl' : 'ltr';
        });
    }
    get dirAttribute() {
        return this.direction;
    }
    /**
     * @hidden
     */
    textFor(key) {
        return this.localization.get(key);
    }
    /**
     * @hidden
     */
    get iconClasses() {
        if (this.icon) {
            return `k-icon k-i-${this.icon}`;
        }
        if (this.iconClass) {
            return `${this.iconClass}`;
        }
        return 'k-icon k-i-upload';
    }
    ngOnDestroy() {
        if (this.localizationChangeSubscription) {
            this.localizationChangeSubscription.unsubscribe();
        }
    }
}
UploadDropZoneComponent.decorators = [
    { type: Component, args: [{
                exportAs: 'kendoUploadDropZone',
                providers: [
                    LocalizationService,
                    {
                        provide: L10N_PREFIX,
                        useValue: 'kendo.uploaddropzone'
                    }
                ],
                selector: 'kendo-uploaddropzone',
                template: `
    <ng-container kendoUploadDropZoneLocalizedMessages
      i18n-externalDropFilesHere='kendo.uploaddropzone.externalDropFilesHere|Sets the external drop-zone hint'
      externalDropFilesHere='Drag and drop files here to upload'
    >
    </ng-container>
    <div class='k-dropzone-inner' [kendoUploadDropZone]="zoneId">
      <span [ngClass]="iconClasses"></span>
      <span class="k-dropzone-hint">{{ textFor('externalDropFilesHere') }}</span>
      <span class="k-dropzone-note">
        <ng-content></ng-content>
      </span>
    </div>
  `
            },] },
];
/** @nocollapse */
UploadDropZoneComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: LocalizationService }
];
UploadDropZoneComponent.propDecorators = {
    hostClass: [{ type: HostBinding, args: ['class.k-external-dropzone',] }],
    dirAttribute: [{ type: HostBinding, args: ['attr.dir',] }],
    zoneId: [{ type: Input }],
    icon: [{ type: Input }],
    iconClass: [{ type: Input }]
};

/**
 * @hidden
 */
const SHARED_DECLARATIONS = [
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
const PUBLIC_DIRECTIVES = [
    FileTemplateDirective,
    CustomMessagesComponent,
    UploadDropZoneDirective,
    UploadDropZoneComponent
];
/**
 * @hidden
 */
class SharedModule {
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

const FILESELECT_DECLARATIONS = [
    FileSelectComponent
];
/**
 * Represents the [NgModule](https://angular.io/api/core/NgModule) definition for the FileSelect component.
 */
class FileSelectModule {
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

/**
 * @hidden
 */
class UploadActionButtonsComponent {
    constructor(uploadService, localization, navigation) {
        this.uploadService = uploadService;
        this.localization = localization;
        this.navigation = navigation;
        this.hostDefaultClass = true;
        this.onAction();
        this.onFocus();
    }
    get actionButtonsEndClassName() {
        return this.actionsLayout === 'end';
    }
    get actionButtonsStretchedClassName() {
        return this.actionsLayout === 'stretched';
    }
    get actionButtonsStartClassName() {
        return this.actionsLayout === 'start';
    }
    get actionButtonsCenterClassName() {
        return this.actionsLayout === 'center';
    }
    onAction() {
        this.actionSubscription = this.navigation.onActionButtonAction.subscribe((button) => {
            if (button === "clear") {
                this.clearFiles();
            }
            else {
                this.performUpload();
            }
            this.navigation.focusSelectButton();
        });
    }
    onFocus() {
        this.focusSubscription = this.navigation.onActionButtonFocus.subscribe((button) => {
            this.focusButton(button);
        });
    }
    focusButton(button) {
        const el = (button === "clear") ? this.clearButton : this.uploadButton;
        el.nativeElement.focus();
    }
    ngOnDestroy() {
        this.actionSubscription.unsubscribe();
        this.focusSubscription.unsubscribe();
    }
    performUpload(_event) {
        if (!this.disabled) {
            this.uploadService.uploadFiles();
        }
    }
    clearFiles(_event) {
        if (!this.disabled) {
            this.uploadService.clearFiles();
        }
    }
    textFor(key) {
        return this.localization.get(key);
    }
}
UploadActionButtonsComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-upload-action-buttons',
                template: `
        <button #clearButton type="button" class="k-button k-clear-selected"
            [attr.tabIndex]="-1"
            (click)="clearFiles($event)">
                {{textFor('clearSelectedFiles')}}
        </button>
        <button #uploadButton type="button" class="k-button k-primary k-upload-selected"
            [attr.tabIndex]="-1"
            (click)="performUpload($event)">
                {{textFor('uploadSelectedFiles')}}
        </button>
    `
            },] },
];
/** @nocollapse */
UploadActionButtonsComponent.ctorParameters = () => [
    { type: UploadService },
    { type: LocalizationService },
    { type: NavigationService }
];
UploadActionButtonsComponent.propDecorators = {
    disabled: [{ type: Input }],
    actionsLayout: [{ type: Input }],
    clearButton: [{ type: ViewChild, args: ['clearButton',] }],
    uploadButton: [{ type: ViewChild, args: ['uploadButton',] }],
    hostDefaultClass: [{ type: HostBinding, args: ['class.k-actions',] }],
    actionButtonsEndClassName: [{ type: HostBinding, args: ['class.k-actions-end',] }],
    actionButtonsStretchedClassName: [{ type: HostBinding, args: ['class.k-actions-stretched',] }],
    actionButtonsStartClassName: [{ type: HostBinding, args: ['class.k-actions-start',] }],
    actionButtonsCenterClassName: [{ type: HostBinding, args: ['class.k-actions-center',] }]
};

/**
 * @hidden
 */
class UploadStatusTotalComponent {
    constructor(localization) {
        this.localization = localization;
    }
    ngDoCheck() {
        this.isPaused = this.fileList.hasFileWithState([FileState.Paused]);
        this.isFailed = this.fileList.hasFileWithState([FileState.Failed]);
        this.isUploading = this.fileList.hasFileWithState([FileState.Uploading]);
        if (this.isPaused && !this.isUploading) {
            this.statusText = this.localization.get('headerStatusPaused');
        }
        else {
            this.statusText = this.isUploading ? this.localization.get('headerStatusUploading')
                : this.localization.get('headerStatusUploaded');
        }
    }
}
UploadStatusTotalComponent.decorators = [
    { type: Component, args: [{
                selector: 'kendo-upload-status-total',
                template: `
        <span class="k-icon"
            [ngClass]="{
                'k-i-checkmark': !this.isUploading && !this.isFailed,
                'k-i-exception': !this.isUploading && this.isFailed,
                'k-i-upload': this.isUploading,
                'k-i-pause-sm': this.isPaused
            }">
        </span>
        {{statusText}}
    `
            },] },
];
/** @nocollapse */
UploadStatusTotalComponent.ctorParameters = () => [
    { type: LocalizationService }
];
UploadStatusTotalComponent.propDecorators = {
    fileList: [{ type: Input }]
};

const UPLOAD_DECLARATIONS = [
    UploadComponent,
    UploadActionButtonsComponent,
    UploadStatusTotalComponent
];
/**
 * Represents the [NgModule](https://angular.io/api/core/NgModule) definition for the Upload component.
 */
class UploadModule {
}
UploadModule.decorators = [
    { type: NgModule, args: [{
                declarations: [UPLOAD_DECLARATIONS],
                exports: [
                    PUBLIC_DIRECTIVES,
                    UPLOAD_DECLARATIONS
                ],
                imports: [SharedModule]
            },] },
];

/**
 * Represents the [NgModule]({{ site.data.urls.angular['ngmoduleapi'] }})
 * definition for the Uploads components.
 *
 * @example
 *
 * ```ts-no-run
 * import { UploadsModule } from '@progress/kendo-angular-upload';
 *
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 * import { NgModule } from '@angular/core';
 *
 * import { AppComponent } from './app.component';
 *
 * _@NgModule({
 *     declarations: [AppComponent],
 *     imports:      [BrowserModule, UploadsModule],
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * platformBrowserDynamic().bootstrapModule(AppModule);
 *
 * ```
 */
class UploadsModule {
}
UploadsModule.decorators = [
    { type: NgModule, args: [{
                exports: [
                    FileSelectModule,
                    UploadModule
                ]
            },] },
];

/**
 * Generated bundle index. Do not edit.
 */

export { DropZoneBase, DropZoneInternalDirective, DropZoneService, PreventableEvent, FILESELECT_VALUE_ACCESSOR, LocalizedMessagesDirective, Messages, NavigationService, FileListItemDirective, FileListItemBase, PUBLIC_DIRECTIVES, SHARED_DECLARATIONS, SharedModule, UPLOAD_VALUE_ACCESSOR, UploadService, FileSelectModule, UploadModule, UploadsModule, UploadComponent, FileSelectComponent, UploadDropZoneComponent, FileSelectDirective, FileListComponent, FileListSingleItemComponent, FileListItemActionButtonComponent, FileListMultipleItemsComponent, FileTemplateDirective, TemplateContextDirective, UploadStatusTotalComponent, UploadActionButtonsComponent, UploadDropZoneDirective, CustomMessagesComponent, CancelEvent, ClearEvent, ErrorEvent, PauseEvent, RemoveEvent, ResumeEvent, SelectEvent, SuccessEvent, UploadEvent, UploadProgressEvent, FileState };
