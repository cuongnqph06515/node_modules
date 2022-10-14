/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Injectable, EventEmitter, Directive, TemplateRef, forwardRef, Component, NgZone, Renderer2, ChangeDetectorRef, ElementRef, Input, ContentChild, ViewChild, Output, HostBinding, HostListener, ViewChildren, ViewContainerRef, isDevMode, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { LocalizationService, L10N_PREFIX, ComponentMessages } from '@progress/kendo-angular-l10n';
import { guid, Keys, isDocumentAvailable, KendoInput, isChanged } from '@progress/kendo-angular-common';
import { fromEvent, merge } from 'rxjs';
import { filter } from 'rxjs/operators';
import { HttpRequest, HttpEventType, HttpResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { __extends } from 'tslib';
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
var FileMap = /** @class */ (function () {
    function FileMap() {
        this._files = {};
    }
    FileMap.prototype.add = function (file) {
        var uid = file.uid;
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
    };
    FileMap.prototype.remove = function (uid) {
        if (this.has(uid)) {
            this._files[uid] = null;
            delete this._files[uid];
        }
    };
    FileMap.prototype.clear = function () {
        var allFiles = this._files;
        for (var uid in allFiles) {
            if (allFiles.hasOwnProperty(uid)) {
                for (var _i = 0, _a = allFiles[uid]; _i < _a.length; _i++) {
                    var file = _a[_i];
                    if (file.httpSubscription) {
                        file.httpSubscription.unsubscribe();
                    }
                }
                allFiles[uid] = null;
                delete allFiles[uid];
            }
        }
    };
    FileMap.prototype.has = function (uid) {
        return uid in this._files;
    };
    FileMap.prototype.get = function (uid) {
        return this._files[uid];
    };
    FileMap.prototype.setFilesState = function (files, state$$1) {
        for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
            var file = files_1[_i];
            this.setFilesStateByUid(file.uid, state$$1);
        }
    };
    FileMap.prototype.setFilesStateByUid = function (uid, state$$1) {
        this.get(uid).forEach(function (f) {
            f.state = state$$1;
        });
    };
    Object.defineProperty(FileMap.prototype, "count", {
        get: function () {
            return Object.getOwnPropertyNames(this._files).length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileMap.prototype, "files", {
        get: function () {
            var initial = this._files;
            var transformed = [];
            for (var uid in initial) {
                if (initial.hasOwnProperty(uid)) {
                    transformed.push(initial[uid]);
                }
            }
            return transformed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileMap.prototype, "filesFlat", {
        get: function () {
            var initial = this._files;
            var transformed = [];
            for (var uid in initial) {
                if (initial.hasOwnProperty(uid)) {
                    var current = initial[uid];
                    current.forEach(function (file) {
                        transformed.push(file);
                    });
                }
            }
            return transformed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileMap.prototype, "filesToUpload", {
        get: function () {
            var files = this._files;
            var notUploaded = [];
            for (var uid in files) {
                if (files.hasOwnProperty(uid)) {
                    var currentFiles = files[uid];
                    var currentFilesValid = true;
                    for (var _i = 0, currentFiles_1 = currentFiles; _i < currentFiles_1.length; _i++) {
                        var file = currentFiles_1[_i];
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileMap.prototype, "firstFileToUpload", {
        get: function () {
            var files = this._files;
            for (var uid in files) {
                if (files.hasOwnProperty(uid)) {
                    var currentFiles = files[uid];
                    var currentFilesValid = true;
                    for (var _i = 0, currentFiles_2 = currentFiles; _i < currentFiles_2.length; _i++) {
                        var file = currentFiles_2[_i];
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
        },
        enumerable: true,
        configurable: true
    });
    FileMap.prototype.hasFileWithState = function (fileStates) {
        var files = this._files;
        for (var uid in files) {
            if (files.hasOwnProperty(uid)) {
                var currentFiles = files[uid];
                for (var _i = 0, currentFiles_3 = currentFiles; _i < currentFiles_3.length; _i++) {
                    var file = currentFiles_3[_i];
                    if (fileStates.indexOf(file.state) >= 0) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    return FileMap;
}());

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
var CancelEvent = /** @class */ (function () {
    /**
     * Constructs the event arguments for the `cancel` event.
     * @param files - The list of the files that were going to be uploaded.
     */
    function CancelEvent(files) {
        this.files = files;
    }
    return CancelEvent;
}());

/**
 * @hidden
 */
var PreventableEvent = /** @class */ (function () {
    function PreventableEvent() {
        this.prevented = false;
    }
    /**
     * Prevents the default action for a specified event.
     * In this way, the source component suppresses the built-in behavior that follows the event.
     */
    PreventableEvent.prototype.preventDefault = function () {
        this.prevented = true;
    };
    /**
     * If the event is prevented by any of its subscribers, returns `true`.
     *
     * @returns `true` if the default action was prevented. Otherwise, returns `false`.
     */
    PreventableEvent.prototype.isDefaultPrevented = function () {
        return this.prevented;
    };
    return PreventableEvent;
}());

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
var ClearEvent = /** @class */ (function (_super) {
    __extends(ClearEvent, _super);
    /**
     * Constructs the event arguments for the `clear` event.
     */
    function ClearEvent() {
        return _super.call(this) || this;
    }
    return ClearEvent;
}(PreventableEvent));

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
var ErrorEvent = /** @class */ (function () {
    /**
     * Constructs the event arguments for the `error` event.
     *
     * @param files - The list of the files that failed to be uploaded or removed.
     * @param operation - The operation type (`upload` or `remove`).
     * @param response - The response object returned by the server.
     */
    function ErrorEvent(files, operation, response) {
        this.files = files;
        this.operation = operation;
        this.response = response;
    }
    return ErrorEvent;
}());

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
var PauseEvent = /** @class */ (function () {
    /**
     * Constructs the event arguments for the `pause` event.
     * @param file - The file that is going to be paused.
     */
    function PauseEvent(file) {
        this.file = file;
    }
    return PauseEvent;
}());

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
var RemoveEvent = /** @class */ (function (_super) {
    __extends(RemoveEvent, _super);
    /**
     * Constructs the event arguments for the `remove` event.
     * @param files - The list of the files that will be removed.
     * @param headers - The headers of the request.
     */
    function RemoveEvent(files, headers) {
        var _this = _super.call(this) || this;
        _this.files = files;
        _this.headers = headers;
        return _this;
    }
    return RemoveEvent;
}(PreventableEvent));

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
var ResumeEvent = /** @class */ (function () {
    /**
     * Constructs the event arguments for the `resume` event.
     * @param file - The file that is going to be resumed.
     */
    function ResumeEvent(file) {
        this.file = file;
    }
    return ResumeEvent;
}());

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
var SelectEvent = /** @class */ (function (_super) {
    __extends(SelectEvent, _super);
    /**
     * Constructs the event arguments for the `select` event.
     * @param files - The list of the selected files.
     */
    function SelectEvent(files) {
        var _this = _super.call(this) || this;
        _this.files = files;
        return _this;
    }
    return SelectEvent;
}(PreventableEvent));

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
var SuccessEvent = /** @class */ (function (_super) {
    __extends(SuccessEvent, _super);
    /**
     * Constructs the event arguments for the `success` event.
     * @param files - The list of the files that were uploaded or removed.
     * @param operation - The operation type (`upload` or `remove`).
     * @param response - The response object returned by the server.
     */
    function SuccessEvent(files, operation, response) {
        var _this = _super.call(this) || this;
        _this.files = files;
        _this.operation = operation;
        _this.response = response;
        return _this;
    }
    return SuccessEvent;
}(PreventableEvent));

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
var UploadEvent = /** @class */ (function (_super) {
    __extends(UploadEvent, _super);
    /**
     * Constructs the event arguments for the `upload` event.
     * @param files - The list of the files that will be uploaded.
     * @param headers - The headers of the request.
     */
    function UploadEvent(files, headers) {
        var _this = _super.call(this) || this;
        _this.files = files;
        _this.headers = headers;
        return _this;
    }
    return UploadEvent;
}(PreventableEvent));

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
var UploadProgressEvent = /** @class */ (function () {
    /**
     * Constructs the event arguments for the `uploadprogress` event.
     * @param files - The list of files that are being uploaded.
     * @param percentComplete - The portion that has been uploaded.
     */
    function UploadProgressEvent(files, percentComplete) {
        this.files = files;
        this.percentComplete = percentComplete;
    }
    return UploadProgressEvent;
}());

/**
 * @hidden
 */
var fileGroupMap = {
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
var getTotalFilesSizeMessage = function (files) {
    var totalSize = 0;
    var i;
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
var stripPath = function (name) {
    var slashIndex = name.lastIndexOf("\\");
    return (slashIndex !== -1) ? name.substr(slashIndex + 1) : name;
};
var getFileExtension = function (fileName) {
    var rFileExtension = /\.([^\.]+)$/;
    var matches = fileName.match(rFileExtension);
    return matches ? matches[0] : "";
};
/**
 * @hidden
 */
var validateInitialFileInfo = function (file) {
    if (file instanceof Object && file.hasOwnProperty("name")) {
        return true;
    }
    return false;
};
/**
 * @hidden
 */
var validateInitialFileSelectFile = function (file) {
    if (file instanceof File || validateInitialFileInfo(file)) {
        return true;
    }
    return false;
};
/**
 * @hidden
 */
var getInitialFileInfo = function (fakeFile) {
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
var convertFileToFileInfo = function (file) {
    var fileInfo = getFileInfo(file);
    fileInfo.uid = guid();
    // Used to differentiate initial FileInfo objects and actual Files
    fileInfo.state = FileState.Selected;
    return fileInfo;
};
var getFileInfo = function (rawFile) {
    var fileName = rawFile.name;
    var fileSize = rawFile.size;
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
var getAllFileInfo = function (rawFiles) {
    var allFileInfo = new Array();
    var i;
    for (i = 0; i < rawFiles.length; i++) {
        allFileInfo.push(getFileInfo(rawFiles[i]));
    }
    return allFileInfo;
};
/**
 * @hidden
 */
var fileHasValidationErrors = function (file) {
    if (file.validationErrors && file.validationErrors.length > 0) {
        return true;
    }
    return false;
};
/**
 * @hidden
 */
var filesHaveValidationErrors = function (files) {
    for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
        var file = files_1[_i];
        if (fileHasValidationErrors(file)) {
            return true;
        }
    }
    return false;
};
/**
 * @hidden
 */
var inputFiles = function (input) {
    if (input.files) {
        return getAllFileInfo(input.files);
    }
    else {
        //Required for testing
        var fileNames = input.value.split("|").map(function (file, index) {
            var fileName = file.trim();
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
var assignGuidToFiles = function (files, isUnique) {
    var uid = guid();
    return files.map(function (file) {
        file.uid = isUnique ? guid() : uid;
        return file;
    });
};
var focusableRegex = /^(?:a|input|select|textarea|button|object)$/i;
/**
 * @hidden
 */
var IGNORE_TARGET_CLASSES = 'k-icon k-select k-input k-multiselect-wrap';
/**
 * @hidden
 */
var UPLOAD_CLASSES = 'k-upload-button k-clear-selected k-upload-selected k-upload-action';
var isVisible = function (element) {
    var rect = element.getBoundingClientRect();
    return !!(rect.width && rect.height) && window.getComputedStyle(element).visibility !== 'hidden';
};
var toClassList = function (classNames) { return String(classNames).trim().split(' '); };
/**
 * @hidden
 */
var hasClasses = function (element, classNames) {
    var namesList = toClassList(classNames);
    return Boolean(toClassList(element.className).find(function (className) { return namesList.indexOf(className) >= 0; }));
};
/**
 * @hidden
 */
var isFocusable = function (element, checkVisibility) {
    if (checkVisibility === void 0) { checkVisibility = true; }
    if (element.tagName) {
        var tagName = element.tagName.toLowerCase();
        var tabIndex = element.getAttribute('tabIndex');
        var validTabIndex = tabIndex !== null && !isNaN(tabIndex) && tabIndex > -1;
        var focusable = false;
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
var getFileGroupCssClass = function (fileExtension) {
    var initial = 'k-i-file';
    for (var group in fileGroupMap) {
        if (fileGroupMap[group].indexOf(fileExtension) >= 0) {
            return initial + "-" + group;
        }
    }
    return initial;
};
/**
 * @hidden
 */
var isPresent = function (value) { return value !== null && value !== undefined; };

/**
 * @hidden
 */
var ChunkMap = /** @class */ (function () {
    function ChunkMap() {
        this._files = {};
    }
    ChunkMap.prototype.add = function (uid, totalChunks) {
        var initialChunkInfo = {
            index: 0,
            position: 0,
            retries: 0,
            totalChunks: totalChunks
        };
        this._files[uid] = initialChunkInfo;
        return initialChunkInfo;
    };
    ChunkMap.prototype.remove = function (uid) {
        if (this.has(uid)) {
            this._files[uid] = null;
            delete this._files[uid];
        }
    };
    ChunkMap.prototype.has = function (uid) {
        return uid in this._files;
    };
    ChunkMap.prototype.get = function (uid) {
        return this._files[uid];
    };
    return ChunkMap;
}());

/**
 * @hidden
 */
var UploadService = /** @class */ (function () {
    function UploadService(http) {
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
    Object.defineProperty(UploadService.prototype, "files", {
        get: function () {
            return this.fileList;
        },
        enumerable: true,
        configurable: true
    });
    UploadService.prototype.setChunkSettings = function (settings) {
        if (settings !== false) {
            this.async.chunk = true;
            if (typeof settings === "object") {
                this.chunk = Object.assign({}, this.chunk, settings);
            }
        }
    };
    UploadService.prototype.onChange = function () {
        var files = this.fileList.filesFlat.filter(function (file) {
            return file.state === FileState.Initial ||
                file.state === FileState.Uploaded;
        });
        this.changeEvent.emit(files.length > 0 ? files : null);
    };
    UploadService.prototype.addFiles = function (files) {
        var selectEventArgs = new SelectEvent(files);
        this.selectEvent.emit(selectEventArgs);
        if (!selectEventArgs.isDefaultPrevented()) {
            for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
                var file = files_1[_i];
                this.fileList.add(file);
            }
            if (this.async.autoUpload) {
                this.uploadFiles();
            }
        }
        if (this.component === 'FileSelect') {
            var flatFiles = this.fileList.filesFlat;
            this.changeEvent.emit(flatFiles.length > 0 ? flatFiles : null);
        }
    };
    UploadService.prototype.addInitialFiles = function (initialFiles) {
        var _this = this;
        this.fileList.clear();
        initialFiles.forEach(function (file) {
            var fakeFile = getInitialFileInfo(file);
            _this.fileList.add(fakeFile);
        });
    };
    UploadService.prototype.addInitialFileSelectFiles = function (initialFiles) {
        var _this = this;
        this.fileList.clear();
        initialFiles.forEach(function (file) {
            if (file instanceof File) {
                _this.fileList.add(convertFileToFileInfo(file));
            }
            else {
                _this.fileList.add(getInitialFileInfo(file));
            }
        });
    };
    UploadService.prototype.resumeFile = function (uid) {
        var fileToResume = this.fileList.get(uid);
        this.resumeEvent.emit(new ResumeEvent(fileToResume[0]));
        this.fileList.setFilesStateByUid(uid, FileState.Uploading);
        this._uploadFiles([fileToResume]);
    };
    UploadService.prototype.pauseFile = function (uid) {
        var pausedFile = this.fileList.get(uid)[0];
        this.pauseEvent.emit(new PauseEvent(pausedFile));
        this.fileList.setFilesStateByUid(uid, FileState.Paused);
    };
    UploadService.prototype.removeFiles = function (uid) {
        var removedFiles = this.fileList.get(uid);
        // Clone the Headers so that the default ones are not overridden
        var removeEventArgs = new RemoveEvent(removedFiles, this.cloneRequestHeaders(this.async.removeHeaders));
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
                    var flatFiles = this.fileList.filesFlat;
                    this.changeEvent.emit(flatFiles.length > 0 ? flatFiles : null);
                }
            }
        }
    };
    UploadService.prototype.cancelFiles = function (uid) {
        var canceledFiles = this.fileList.get(uid);
        var cancelEventArgs = new CancelEvent(canceledFiles);
        this.cancelEvent.emit(cancelEventArgs);
        for (var _i = 0, canceledFiles_1 = canceledFiles; _i < canceledFiles_1.length; _i++) {
            var file = canceledFiles_1[_i];
            if (file.httpSubscription) {
                file.httpSubscription.unsubscribe();
            }
        }
        this.fileList.remove(uid);
        this.checkAllComplete();
    };
    UploadService.prototype.clearFiles = function () {
        var clearEventArgs = new ClearEvent();
        this.clearEvent.emit(clearEventArgs);
        if (!clearEventArgs.isDefaultPrevented()) {
            var triggerChange = this.fileList.hasFileWithState([
                FileState.Initial,
                FileState.Uploaded
            ]);
            this.fileList.clear();
            if (triggerChange) {
                this.onChange();
            }
        }
    };
    UploadService.prototype.uploadFiles = function () {
        var filesToUpload = [];
        if (this.async.concurrent) {
            filesToUpload = this.fileList.filesToUpload;
        }
        if (!this.async.concurrent && !this.fileList.hasFileWithState([FileState.Uploading])) {
            filesToUpload = [this.fileList.firstFileToUpload];
        }
        if (filesToUpload && filesToUpload.length > 0) {
            this._uploadFiles(filesToUpload);
        }
    };
    UploadService.prototype.retryFiles = function (uid) {
        var filesToRetry = [this.fileList.get(uid)];
        if (filesToRetry) {
            this._uploadFiles(filesToRetry);
        }
    };
    UploadService.prototype._uploadFiles = function (allFiles) {
        var _loop_1 = function (filesToUpload) {
            if (filesToUpload[0].state === FileState.Paused) {
                return { value: void 0 };
            }
            // Clone the Headers so that the default ones are not overridden
            var uploadEventArgs = new UploadEvent(filesToUpload, this_1.cloneRequestHeaders(this_1.async.saveHeaders));
            this_1.uploadEvent.emit(uploadEventArgs);
            if (!uploadEventArgs.isDefaultPrevented()) {
                this_1.fileList.setFilesState(filesToUpload, FileState.Uploading);
                var httpSubcription_1 = this_1.performUpload(filesToUpload, uploadEventArgs);
                filesToUpload.forEach(function (file) {
                    file.httpSubscription = httpSubcription_1;
                });
            }
            else {
                this_1.fileList.remove(filesToUpload[0].uid);
            }
        };
        var this_1 = this;
        for (var _i = 0, allFiles_1 = allFiles; _i < allFiles_1.length; _i++) {
            var filesToUpload = allFiles_1[_i];
            var state_1 = _loop_1(filesToUpload);
            if (typeof state_1 === "object")
                return state_1.value;
        }
    };
    UploadService.prototype.performRemove = function (files, removeEventArgs) {
        var _this = this;
        var async = this.async;
        var fileNames = files.map(function (file) {
            return file.name;
        });
        var formData = this.populateRemoveFormData(fileNames, removeEventArgs.data);
        var options = this.populateRequestOptions(removeEventArgs.headers);
        var removeRequest = new HttpRequest(async.removeMethod, async.removeUrl, formData, options);
        this.http.request(removeRequest)
            .subscribe(function (success) {
            _this.onSuccess(success, files, "remove");
        }, function (error) {
            _this.onError(error, files, "remove");
        });
    };
    UploadService.prototype.performUpload = function (files, uploadEventArgs) {
        var _this = this;
        var async = this.async;
        var formData = this.populateUploadFormData(files, uploadEventArgs.data);
        var options = this.populateRequestOptions(uploadEventArgs.headers);
        var uploadRequest = new HttpRequest(async.saveMethod, async.saveUrl, formData, options);
        var httpSubscription = this.http.request(uploadRequest)
            .subscribe(function (event) {
            if (event.type === HttpEventType.UploadProgress && !_this.async.chunk) {
                _this.onProgress(event, files);
            }
            else if (event instanceof HttpResponse) {
                _this.onSuccess(event, files, "upload");
                _this.checkAllComplete();
            }
        }, function (error) {
            _this.onError(error, files, "upload");
            _this.checkAllComplete();
        });
        return httpSubscription;
    };
    UploadService.prototype.onSuccess = function (successResponse, files, operation) {
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
        var successArgs = new SuccessEvent(files, operation, successResponse);
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
    };
    UploadService.prototype.onError = function (errorResponse, files, operation) {
        var _this = this;
        if (operation === "upload" && this.async.chunk) {
            var maxRetries = this.chunk.maxAutoRetries;
            var chunkInfo = this.chunkMap.get(files[0].uid);
            if (chunkInfo.retries < maxRetries) {
                chunkInfo.retries += 1;
                setTimeout(function () {
                    _this.retryFiles(files[0].uid);
                }, this.chunk.autoRetryAfter);
                return;
            }
        }
        var errorArgs = new ErrorEvent(files, operation, errorResponse);
        this.errorEvent.emit(errorArgs);
        if (operation === "upload") {
            this.fileList.setFilesState(files, FileState.Failed);
        }
    };
    UploadService.prototype.onProgress = function (event, files) {
        var percentComplete = Math.round(100 * event.loaded / event.total);
        var progressArgs = new UploadProgressEvent(files, percentComplete < 100 ? percentComplete : 100);
        this.uploadProgressEvent.emit(progressArgs);
    };
    UploadService.prototype.onChunkProgress = function (files) {
        var chunkInfo = this.chunkMap.get(files[0].uid);
        var percentComplete = 0;
        if (chunkInfo) {
            if (chunkInfo.index === chunkInfo.totalChunks - 1) {
                percentComplete = 100;
            }
            else {
                percentComplete = Math.round(((chunkInfo.index + 1) / chunkInfo.totalChunks) * 100);
            }
        }
        var progressArgs = new UploadProgressEvent(files, percentComplete < 100 ? percentComplete : 100);
        this.uploadProgressEvent.emit(progressArgs);
    };
    UploadService.prototype.checkAllComplete = function () {
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
    };
    UploadService.prototype.shouldUploadNextFile = function () {
        return !this.async.concurrent &&
            this.fileList.hasFileWithState([FileState.Selected]) &&
            !this.fileList.hasFileWithState([FileState.Uploading]);
    };
    UploadService.prototype.cloneRequestHeaders = function (headers) {
        var cloned = {};
        if (headers) {
            headers.keys().forEach(function (key) {
                cloned[key] = headers.get(key);
            });
        }
        return new HttpHeaders(cloned);
    };
    UploadService.prototype.populateRequestOptions = function (headers) {
        return {
            headers: headers,
            reportProgress: true,
            responseType: this.async.responseType,
            withCredentials: this.async.withCredentials
        };
    };
    UploadService.prototype.populateUploadFormData = function (files, clientData) {
        var saveField = this.async.saveField;
        var data = new FormData();
        this.populateClientFormData(data, clientData);
        if (this.async.chunk) {
            data.append(saveField, this.getNextChunk(files[0]));
            data.append("metadata", this.getChunkMetadata(files[0]));
        }
        else {
            for (var _i = 0, files_2 = files; _i < files_2.length; _i++) {
                var file = files_2[_i];
                data.append(saveField, file.rawFile);
            }
        }
        return data;
    };
    UploadService.prototype.populateRemoveFormData = function (fileNames, clientData) {
        var data = new FormData();
        this.populateClientFormData(data, clientData);
        for (var _i = 0, fileNames_1 = fileNames; _i < fileNames_1.length; _i++) {
            var fileName = fileNames_1[_i];
            data.append(this.async.removeField, fileName);
        }
        return data;
    };
    UploadService.prototype.populateClientFormData = function (data, clientData) {
        for (var key in clientData) {
            if (clientData.hasOwnProperty(key)) {
                data.append(key, clientData[key]);
            }
        }
    };
    /* Chunking Helper Methods Section */
    UploadService.prototype.getNextChunk = function (file) {
        var info = this.getChunkInfo(file);
        var newPosition = info.position + this.chunk.size;
        return file.rawFile.slice(info.position, newPosition);
    };
    UploadService.prototype.getChunkInfo = function (file) {
        var chunkInfo = this.chunkMap.get(file.uid);
        if (!chunkInfo) {
            var totalChunks = Math.ceil(file.size / this.chunk.size);
            chunkInfo = this.chunkMap.add(file.uid, totalChunks);
        }
        return chunkInfo;
    };
    UploadService.prototype.updateChunkInfo = function (uid) {
        var chunkInfo = this.chunkMap.get(uid);
        if (chunkInfo.index < chunkInfo.totalChunks - 1) {
            chunkInfo.index += 1;
            chunkInfo.position += this.chunk.size;
            chunkInfo.retries = 0;
        }
    };
    UploadService.prototype.removeChunkInfo = function (uid) {
        this.chunkMap.remove(uid);
    };
    UploadService.prototype.getChunkMetadata = function (file) {
        var chunkInfo = this.chunkMap.get(file.uid);
        var chunkMetadata = {
            chunkIndex: chunkInfo.index,
            contentType: file.rawFile.type,
            fileName: file.name,
            fileSize: file.size,
            fileUid: file.uid,
            totalChunks: chunkInfo.totalChunks
        };
        return JSON.stringify(chunkMetadata);
    };
    UploadService.prototype.isChunkUploadComplete = function (uid) {
        var chunkInfo = this.chunkMap.get(uid);
        if (chunkInfo) {
            return chunkInfo.index + 1 === chunkInfo.totalChunks;
        }
        return false;
    };
    UploadService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    UploadService.ctorParameters = function () { return [
        { type: HttpClient }
    ]; };
    return UploadService;
}());

/**
 * @hidden
 */
var NavigationService = /** @class */ (function () {
    function NavigationService(uploadService) {
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
    NavigationService.prototype.action = function (event) {
        var key = event.keyCode;
        return this.keyBindings[key];
    };
    NavigationService.prototype.process = function (event) {
        var handler = this.action(event);
        if (handler) {
            handler(event.shiftKey);
        }
    };
    NavigationService.prototype.computeKeys = function (direction) {
        var _this = this;
        var _a;
        this.keyBindings = (_a = {},
            _a[Keys.Enter] = function () { return _this.handleEnter(); },
            _a[Keys.Escape] = function () { return _this.handleEscape(); },
            _a[Keys.Delete] = function () { return _this.handleDelete(); },
            _a[Keys.Tab] = function (shifted) { return _this.handleTab(shifted); },
            _a[Keys.ArrowUp] = function () { return _this.handleUp(); },
            _a[Keys.ArrowDown] = function () { return _this.handleDown(); },
            _a[this.invertKeys(direction, Keys.ArrowLeft, Keys.ArrowRight)] = function () { return _this.handleLeft(); },
            _a[this.invertKeys(direction, Keys.ArrowRight, Keys.ArrowLeft)] = function () { return _this.handleRight(); },
            _a);
    };
    NavigationService.prototype.invertKeys = function (direction, original, inverted) {
        return direction === 'rtl' ? inverted : original;
    };
    NavigationService.prototype.focusSelectButton = function () {
        this.focused = true;
        this._focusedIndex = -1;
        this.onSelectButtonFocus.emit();
    };
    NavigationService.prototype.handleEnter = function () {
        if (this.lastIndex >= 0) {
            if (this.focusedIndex <= this.lastFileIndex) {
                this.onFileAction.emit(Keys.Enter);
                return;
            }
            if (this.actionButtonsVisible && this.focusedIndex <= this.lastIndex) {
                this.onActionButtonAction.emit(this.focusedIndex < this.lastIndex ? "clear" : "upload");
            }
        }
    };
    NavigationService.prototype.handleDelete = function () {
        if (this.focusedIndex >= 0 && this.focusedIndex <= this.lastFileIndex) {
            this.onFileAction.emit(Keys.Delete);
        }
    };
    NavigationService.prototype.handleEscape = function () {
        if (this.focusedIndex >= 0 && this.focusedIndex <= this.lastFileIndex) {
            this.onFileAction.emit(Keys.Escape);
        }
    };
    NavigationService.prototype.handleLeft = function () {
        if (this.actionButtonsVisible && this.focusedIndex === this.lastIndex) {
            this.focusedIndex -= 1;
            this.onActionButtonFocus.emit("clear");
        }
    };
    NavigationService.prototype.handleRight = function () {
        if (this.actionButtonsVisible && this.focusedIndex === this.lastIndex - 1) {
            this.focusedIndex += 1;
            this.onActionButtonFocus.emit("upload");
        }
    };
    NavigationService.prototype.handleTab = function (shifted) {
        if (this.focusedIndex >= 0 && shifted) {
            this.focusedIndex = -1;
            return;
        }
        this.onTab.emit();
    };
    NavigationService.prototype.handleDown = function () {
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
    };
    NavigationService.prototype.handleUp = function () {
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
    };
    Object.defineProperty(NavigationService.prototype, "focusedIndex", {
        get: function () {
            return this._focusedIndex;
        },
        set: function (index) {
            if (!this.focused) {
                this.onWrapperFocus.emit();
            }
            this._focusedIndex = index;
            this.focused = true;
            if (this._focusedIndex >= 0 && this._focusedIndex <= this.lastFileIndex) {
                this.onFileFocus.emit(index);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavigationService.prototype, "lastFileIndex", {
        get: function () {
            return this.actionButtonsVisible ? this.lastIndex - 2 : this.lastIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavigationService.prototype, "lastIndex", {
        get: function () {
            var fileCount = this.uploadService.files.count;
            return this.actionButtonsVisible ? fileCount + 1 : fileCount - 1;
        },
        enumerable: true,
        configurable: true
    });
    NavigationService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    NavigationService.ctorParameters = function () { return [
        { type: UploadService }
    ]; };
    return NavigationService;
}());

/**
 * Used to customize the rendering of the files in the list ([see example]({% slug templates_upload %})).
 */
var FileTemplateDirective = /** @class */ (function () {
    function FileTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    FileTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoUploadFileTemplate], [kendoFileSelectFileTemplate]' // tslint:disable-line:directive-selector-prefix
                },] },
    ];
    /** @nocollapse */
    FileTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    return FileTemplateDirective;
}());

var components = {};
/**
 * @hidden
 */
var DropZoneService = /** @class */ (function () {
    function DropZoneService() {
    }
    DropZoneService.prototype.addComponent = function (component, zoneId) {
        if (this.has(zoneId)) {
            components[zoneId].push(component);
        }
        else {
            components[zoneId] = [component];
        }
    };
    DropZoneService.prototype.getComponents = function (zoneId) {
        return components[zoneId];
    };
    DropZoneService.prototype.has = function (id) {
        return id in components;
    };
    DropZoneService.decorators = [
        { type: Injectable },
    ];
    return DropZoneService;
}());

/**
 * @hidden
 */
var FILESELECT_VALUE_ACCESSOR = {
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return FileSelectComponent; }) // tslint:disable-line:no-forward-ref
};
var FileSelectComponent = /** @class */ (function () {
    function FileSelectComponent(uploadService, localization, navigation, dropZoneService, ngZone, renderer, cdr, wrapper) {
        var _this = this;
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
        this.focusableId = "k-" + guid();
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
        this.onTouchedCallback = function (_) { };
        this.onChangeCallback = function (_) { };
        this.wrapper = wrapper.nativeElement;
        this.direction = localization.rtl ? 'rtl' : 'ltr';
        this.navigation.computeKeys(this.direction);
        this.fileList = this.uploadService.files;
        this.localizationChangeSubscription = localization.changes.subscribe(function (_a) {
            var rtl = _a.rtl;
            _this.direction = rtl ? 'rtl' : 'ltr';
            _this.navigation.computeKeys(_this.direction);
        });
        this.subscribeBlur();
        this.subscribeFocus();
        this.attachEventHandlers();
        this.setDefaultSettings();
    }
    Object.defineProperty(FileSelectComponent.prototype, "name", {
        get: function () {
            return this.uploadService.async.saveField;
        },
        /**
         * Sets the `name` attribute of the `input` element of the FileSelect.
         */
        set: function (name) {
            this.uploadService.async.saveField = name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileSelectComponent.prototype, "restrictions", {
        get: function () {
            return this._restrictions;
        },
        /**
         * Sets the restrictions for selected files.
         */
        set: function (restrictions) {
            var parsedRestrictions = Object.assign({}, this._restrictions, restrictions);
            this._restrictions = parsedRestrictions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileSelectComponent.prototype, "hostDisabledClass", {
        get: function () {
            return this.disabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileSelectComponent.prototype, "dir", {
        get: function () {
            return this.direction;
        },
        enumerable: true,
        configurable: true
    });
    FileSelectComponent.prototype.ngOnInit = function () {
        this.renderer.removeAttribute(this.wrapper, "tabindex");
        if (this.zoneId) {
            this.dropZoneService.addComponent(this, this.zoneId);
        }
    };
    /**
     * @hidden
     */
    FileSelectComponent.prototype.textFor = function (key) {
        return this.localization.get(key);
    };
    /**
     * Focuses the underlying input element.
     */
    FileSelectComponent.prototype.focus = function () {
        var _this = this;
        setTimeout(function () {
            _this.fileSelectButton.nativeElement.focus();
        });
    };
    FileSelectComponent.prototype.ngOnDestroy = function () {
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
    FileSelectComponent.prototype.handleKeydown = function (event) {
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
    FileSelectComponent.prototype.writeValue = function (newValue) {
        var isValid = true;
        if (newValue instanceof Array) {
            newValue.forEach(function (file) {
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
    };
    /**
     * @hidden
     */
    FileSelectComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    /**
     * @hidden
     */
    FileSelectComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    /**
     * @hidden
     */
    FileSelectComponent.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    /**
     * Removes specific file from the file list.
     */
    FileSelectComponent.prototype.removeFileByUid = function (uid) {
        this.uploadService.removeFiles(uid);
    };
    /**
     * Visually clears all files from the UI.
     */
    FileSelectComponent.prototype.clearFiles = function () {
        this.uploadService.clearFiles();
    };
    /**
     * @hidden
     * Used to determine if the component is empty.
     */
    FileSelectComponent.prototype.isEmpty = function () {
        return false;
    };
    /**
     * @hidden
     * Used by the external dropzone to add files to the FileSelect
     */
    FileSelectComponent.prototype.addFiles = function (files) {
        this.uploadService.addFiles(files);
    };
    Object.defineProperty(FileSelectComponent.prototype, "selectButtonTabIndex", {
        /**
         * @hidden
         */
        get: function () {
            return this.disabled ? undefined : this.tabindex;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    FileSelectComponent.prototype.onFileSelectButtonFocus = function (_event) {
        this.renderer.addClass(this.fileSelectButton.nativeElement, 'k-state-focused');
        if (!this.navigation.focused) {
            this.navigation.focusedIndex = -1;
        }
    };
    /**
     * @hidden
     */
    FileSelectComponent.prototype.onFileSelectButtonBlur = function (_event) {
        this.renderer.removeClass(this.fileSelectButton.nativeElement, 'k-state-focused');
    };
    FileSelectComponent.prototype.subscribeBlur = function () {
        var _this = this;
        if (!isDocumentAvailable()) {
            return;
        }
        this.ngZone.runOutsideAngular(function () {
            _this.documentClick = fromEvent(document, 'click').pipe(filter(function (event) {
                return !(_this.wrapper !== event.target && _this.wrapper.contains(event.target));
            }));
            _this.blurSubscription = merge(_this.documentClick, _this.navigation.onTab).subscribe(function () {
                if (_this.navigation.focused) {
                    _this.ngZone.run(function () {
                        _this.navigation.focused = false;
                        _this.onTouchedCallback();
                        _this.onBlur.emit();
                    });
                }
            });
        });
    };
    FileSelectComponent.prototype.subscribeFocus = function () {
        var _this = this;
        this.wrapperFocusSubscription = this.navigation.onWrapperFocus.subscribe(function () {
            _this.onFocus.emit();
        });
        this.selectButtonFocusSubscription = this.navigation.onSelectButtonFocus.subscribe(function () {
            _this.fileSelectButton.nativeElement.focus();
        });
    };
    FileSelectComponent.prototype.attachEventHandlers = function () {
        var _this = this;
        this.subs = this.uploadService.changeEvent.subscribe(function (files) {
            var model = [];
            if (files !== null) {
                files.forEach(function (file) {
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
            _this.onChangeCallback(model);
            _this.valueChange.emit(model);
        });
        this.subs.add(this.uploadService.removeEvent.subscribe(function (args) {
            _this.remove.emit(args);
        }));
        this.subs.add(this.uploadService.selectEvent.subscribe(function (args) {
            _this.select.emit(args);
        }));
    };
    FileSelectComponent.prototype.setDefaultSettings = function () {
        this.uploadService.async.autoUpload = false;
        this.uploadService.component = 'FileSelect';
    };
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
                            useExisting: forwardRef(function () { return FileSelectComponent; })
                        }
                    ],
                    selector: 'kendo-fileselect',
                    template: "\n        <ng-container kendoFileSelectLocalizedMessages\n            i18n-dropFilesHere=\"kendo.fileselect.dropFilesHere|The drop zone hint\"\n            dropFilesHere=\"Drop files here to select\"\n\n            i18n-invalidFileExtension=\"kendo.fileselect.invalidFileExtension|The text for the invalid allowed extensions restriction message\"\n            invalidFileExtension=\"File type not allowed.\"\n\n            i18n-invalidMaxFileSize=\"kendo.fileselect.invalidMaxFileSize|The text for the invalid max file size restriction message\"\n            invalidMaxFileSize=\"File size too large.\"\n\n            i18n-invalidMinFileSize=\"kendo.fileselect.invalidMinFileSize|The text for the invalid min file size restriction message\"\n            invalidMinFileSize=\"File size too small.\"\n\n            i18n-remove=\"kendo.fileselect.remove|The text for the Remove button\"\n            remove=\"Remove\"\n\n            i18n-select=\"kendo.fileselect.select|The text for the Select button\"\n            select=\"Select files...\"\n        >\n        </ng-container>\n        <div kendoFileSelectInternalDropZone\n            [restrictions]=\"restrictions\"\n            [multiple]=\"multiple\"\n            [disabled]=\"disabled\">\n            <div role=\"button\" #fileSelectButton\n                [id]=\"focusableId\"\n                [attr.aria-label]=\"textFor('select')\"\n                [attr.tabindex]=\"selectButtonTabIndex\"\n                (focus)=\"onFileSelectButtonFocus($event)\"\n                (blur)=\"onFileSelectButtonBlur($event)\"\n                class=\"k-button k-upload-button\">\n                <input #fileSelect kendoFileSelect\n                    [attr.accept]=\"accept ? accept : null\"\n                    [dir]=\"direction\"\n                    [restrictions]=\"restrictions\"\n                    [multiple]=\"multiple\"\n                    [disabled]=\"disabled\" />\n                <span>{{textFor('select')}}</span>\n            </div>\n            <div class=\"k-dropzone-hint\">{{textFor('dropFilesHere')}}</div>\n        </div>\n        <ul kendo-upload-file-list\n            class=\"k-upload-files k-reset\"\n            *ngIf=\"showFileList && fileList.count > 0\"\n            [disabled]=\"disabled\"\n            [fileList]=\"fileList.files\"\n            [fileTemplate]=\"fileTemplate\">\n        </ul>\n    "
                },] },
    ];
    /** @nocollapse */
    FileSelectComponent.ctorParameters = function () { return [
        { type: UploadService },
        { type: LocalizationService },
        { type: NavigationService },
        { type: DropZoneService },
        { type: NgZone },
        { type: Renderer2 },
        { type: ChangeDetectorRef },
        { type: ElementRef }
    ]; };
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
    return FileSelectComponent;
}());

/**
 * @hidden
 */
var Messages = /** @class */ (function (_super) {
    __extends(Messages, _super);
    function Messages() {
        return _super !== null && _super.apply(this, arguments) || this;
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
    return Messages;
}(ComponentMessages));

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
var CustomMessagesComponent = /** @class */ (function (_super) {
    __extends(CustomMessagesComponent, _super);
    function CustomMessagesComponent(service) {
        var _this = _super.call(this) || this;
        _this.service = service;
        return _this;
    }
    Object.defineProperty(CustomMessagesComponent.prototype, "override", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    CustomMessagesComponent.decorators = [
        { type: Component, args: [{
                    providers: [
                        {
                            provide: Messages,
                            useExisting: forwardRef(function () { return CustomMessagesComponent; }) // tslint:disable-line:no-forward-ref
                        }
                    ],
                    selector: 'kendo-upload-messages, kendo-fileselect-messages, kendo-uploaddropzone-messages',
                    template: ""
                },] },
    ];
    /** @nocollapse */
    CustomMessagesComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    return CustomMessagesComponent;
}(Messages));

/**
 * @hidden
 */
var INVALIDMAXFILESIZE = "invalidMaxFileSize";
/**
 * @hidden
 */
var INVALIDMINFILESIZE = "invalidMinFileSize";
/**
 * @hidden
 */
var INVALIDFILEEXTENSION = "invalidFileExtension";
var validateFileExtension = function (file, allowedExtensions) {
    if (allowedExtensions.length > 0) {
        if (allowedExtensions.indexOf(file.extension.toLowerCase()) < 0) {
            file.validationErrors = file.validationErrors || [];
            if (file.validationErrors.indexOf(INVALIDFILEEXTENSION) < 0) {
                file.validationErrors.push(INVALIDFILEEXTENSION);
            }
        }
    }
};
var validateFileSize = function (file, minFileSize, maxFileSize) {
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
var parseAllowedExtensions = function (extensions) {
    var allowedExtensions = extensions.map(function (ext) {
        var parsedExt = (ext.substring(0, 1) === ".") ? ext : ("." + ext);
        return parsedExt.toLowerCase();
    });
    return allowedExtensions;
};
/**
 * @hidden
 */
var validateFiles = function (files, restrictionInfo) {
    var allowedExtensions = parseAllowedExtensions(restrictionInfo.allowedExtensions);
    var maxFileSize = restrictionInfo.maxFileSize;
    var minFileSize = restrictionInfo.minFileSize;
    var i;
    for (i = 0; i < files.length; i++) {
        validateFileExtension(files[i], allowedExtensions);
        validateFileSize(files[i], minFileSize, maxFileSize);
    }
};

/**
 * @hidden
 */
var DropZoneBase = /** @class */ (function () {
    function DropZoneBase(element, renderer, hoverClass) {
        this.element = element;
        this.renderer = renderer;
        this.hideIntervalElement = null;
        this.hoverClass = hoverClass;
    }
    /**
     * @hidden
     */
    DropZoneBase.prototype.onElementDragEnterListener = function () {
        var _this = this;
        this.addClass(this.hoverClass);
        this.lastDragElement = new Date();
        if (!this.hideIntervalElement) {
            this.hideIntervalElement = setInterval(function () {
                if (_this.calculateTimeDiff(_this.lastDragElement) < 100) {
                    return;
                }
                _this.removeClass(_this.hoverClass);
                clearInterval(_this.hideIntervalElement);
                _this.hideIntervalElement = null;
            }, 100);
        }
        return false;
    };
    /**
     * @hidden
     */
    DropZoneBase.prototype.onElementDragOverListener = function () {
        this.lastDragElement = new Date();
        return false;
    };
    DropZoneBase.prototype.calculateTimeDiff = function (prevEvent) {
        return new Date().getTime() - prevEvent.getTime();
    };
    DropZoneBase.prototype.addClass = function (className) {
        this.renderer.addClass(this.element.nativeElement, className);
    };
    DropZoneBase.prototype.removeClass = function (className) {
        this.renderer.removeClass(this.element.nativeElement, className);
    };
    DropZoneBase.propDecorators = {
        onElementDragEnterListener: [{ type: HostListener, args: ['dragenter',] }],
        onElementDragOverListener: [{ type: HostListener, args: ['dragover',] }]
    };
    return DropZoneBase;
}());

/**
 * @hidden
 */
var DropZoneInternalDirective = /** @class */ (function (_super) {
    __extends(DropZoneInternalDirective, _super);
    function DropZoneInternalDirective(element, renderer, ngZone, uploadService) {
        var _this = _super.call(this, element, renderer, 'k-dropzone-hover') || this;
        _this.ngZone = ngZone;
        _this.uploadService = uploadService;
        _this.initialClassName = true;
        _this.hideIntervalDocument = null;
        _this.activeClass = 'k-dropzone-active';
        _this.ngZone.runOutsideAngular(function () {
            _this.unsubscribeDocumentDragEnter = _this.renderer.listen('document', 'dragenter', function () { return _this.onDocumentDragEnter(); });
            _this.unsubscribeDocumentDragOver = _this.renderer.listen('document', 'dragover', function () { return _this.onDocumentDragOver(); });
        });
        return _this;
    }
    DropZoneInternalDirective.prototype.ngOnDestroy = function () {
        var _this = this;
        this.ngZone.runOutsideAngular(function () {
            if (_this.unsubscribeDocumentDragEnter) {
                _this.unsubscribeDocumentDragEnter();
            }
            if (_this.unsubscribeDocumentDragOver) {
                _this.unsubscribeDocumentDragOver();
            }
        });
    };
    DropZoneInternalDirective.prototype.onDocumentDragEnter = function () {
        var _this = this;
        this.addClass(this.activeClass);
        this.lastDragDocument = new Date();
        if (!this.hideIntervalDocument) {
            this.hideIntervalDocument = setInterval(function () {
                if (_this.calculateTimeDiff(_this.lastDragDocument) < 100) {
                    return;
                }
                _this.removeClass(_this.activeClass);
                clearInterval(_this.hideIntervalDocument);
                _this.hideIntervalDocument = null;
            }, 100);
        }
        return false;
    };
    /**
     * @hidden
     */
    DropZoneInternalDirective.prototype.onDocumentDragOver = function () {
        this.lastDragDocument = new Date();
        return false;
    };
    DropZoneInternalDirective.prototype.onDropListener = function (event) {
        var droppedFiles = event.dataTransfer.files;
        if (droppedFiles.length > 0 && !this.disabled) {
            var files = getAllFileInfo(droppedFiles);
            files = assignGuidToFiles(files, !this.uploadService.async.batch);
            if (!this.multiple) {
                files.splice(1, files.length - 1);
                this.uploadService.clearFiles();
            }
            validateFiles(files, this.restrictions);
            this.uploadService.addFiles(files);
        }
        return false;
    };
    DropZoneInternalDirective.decorators = [
        { type: Directive, args: [{
                    selector: "\n      [kendoUploadInternalDropZone],\n      [kendoFileSelectInternalDropZone]\n    "
                },] },
    ];
    /** @nocollapse */
    DropZoneInternalDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: NgZone },
        { type: UploadService }
    ]; };
    DropZoneInternalDirective.propDecorators = {
        disabled: [{ type: Input }],
        multiple: [{ type: Input }],
        restrictions: [{ type: Input }],
        initialClassName: [{ type: HostBinding, args: ['class.k-dropzone',] }],
        onDropListener: [{ type: HostListener, args: ['drop', ['$event'],] }]
    };
    return DropZoneInternalDirective;
}(DropZoneBase));

/**
 * @hidden
 */
var FileListItemDirective = /** @class */ (function () {
    function FileListItemDirective(el, navigationService, uploadService) {
        this.navigationService = navigationService;
        this.uploadService = uploadService;
        this.fileClass = true;
        this.focused = false;
        this.element = el;
    }
    FileListItemDirective.prototype.focus = function () {
        this.element.nativeElement.focus();
    };
    Object.defineProperty(FileListItemDirective.prototype, "uidAttribute", {
        get: function () {
            return this.files[0].uid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileListItemDirective.prototype, "tabIndex", {
        get: function () {
            return "-1";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileListItemDirective.prototype, "kFileError", {
        get: function () {
            return this.files[0].state === FileState.Failed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileListItemDirective.prototype, "kFileInvalid", {
        get: function () {
            return filesHaveValidationErrors(this.files);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileListItemDirective.prototype, "kFileProgress", {
        get: function () {
            return this.files[0].state === FileState.Uploading ||
                this.files[0].state === FileState.Paused;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileListItemDirective.prototype, "kFileSuccess", {
        get: function () {
            if (this.uploadService.component === 'Upload') {
                return this.files[0].state === FileState.Uploaded ||
                    this.files[0].state === FileState.Initial;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileListItemDirective.prototype, "kStateFocused", {
        get: function () {
            return this.focused;
        },
        enumerable: true,
        configurable: true
    });
    FileListItemDirective.prototype.onFocus = function () {
        this.focused = true;
    };
    FileListItemDirective.prototype.onBlur = function () {
        this.focused = false;
    };
    FileListItemDirective.prototype.onClick = function (event) {
        if (!isFocusable(event.target) && !hasClasses(event.target, IGNORE_TARGET_CLASSES)) {
            this.navigationService.focusedIndex = this.index;
        }
    };
    FileListItemDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoUploadFileListItem]'
                },] },
    ];
    /** @nocollapse */
    FileListItemDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NavigationService },
        { type: UploadService }
    ]; };
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
    return FileListItemDirective;
}());

/* tslint:disable:component-selector */
/**
 * @hidden
 */
var FileListComponent = /** @class */ (function () {
    function FileListComponent(uploadService, navigation) {
        this.uploadService = uploadService;
        this.navigation = navigation;
        this.onItemFocus();
        this.onItemAction();
    }
    FileListComponent.prototype.onItemFocus = function () {
        var _this = this;
        this.focusSubscription = this.navigation.onFileFocus.subscribe(function (index) {
            _this.fileListItems.toArray()[index].focus();
        });
    };
    FileListComponent.prototype.onItemAction = function () {
        var _this = this;
        this.actionSubscription = this.navigation.onFileAction.subscribe(function (key) {
            _this.itemActionHandler(key);
        });
    };
    FileListComponent.prototype.itemActionHandler = function (key) {
        var index = this.navigation.focusedIndex;
        var item = this.fileListItems.toArray()[index];
        var uid = item.uidAttribute;
        var files = this.uploadService.files.get(uid);
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
    };
    FileListComponent.prototype.hasDelete = function (item) {
        return item.element.nativeElement.getElementsByClassName('k-delete').length > 0;
    };
    FileListComponent.prototype.ngOnDestroy = function () {
        this.focusSubscription.unsubscribe();
        this.actionSubscription.unsubscribe();
    };
    FileListComponent.decorators = [
        { type: Component, args: [{
                    selector: '[kendo-upload-file-list]',
                    template: "\n    <ng-template ngFor\n      [ngForOf]=\"fileList\"\n      let-files\n      let-index=\"index\">\n      <li kendoUploadFileListItem [files]='files' [index]='index'>\n          <kendo-upload-file-list-single-item\n            class='k-file-single'\n            *ngIf='files.length === 1 && !fileTemplate'\n            [disabled]='disabled'\n            [file]='files[0]'>\n          </kendo-upload-file-list-single-item>\n          <kendo-upload-file-list-multiple-items\n            class='k-file-multiple'\n            *ngIf='files.length > 1 && !fileTemplate'\n            [disabled]='disabled'\n            [files]='files'>\n          </kendo-upload-file-list-multiple-items>\n          <ng-template *ngIf=\"fileTemplate\"\n              [templateContext]=\"{\n                templateRef: fileTemplate.templateRef,\n                state: files[0].state,\n                $implicit: files\n              }\"></ng-template>\n      </li>\n    </ng-template>\n    "
                },] },
    ];
    /** @nocollapse */
    FileListComponent.ctorParameters = function () { return [
        { type: UploadService },
        { type: NavigationService }
    ]; };
    FileListComponent.propDecorators = {
        disabled: [{ type: Input }],
        fileList: [{ type: Input }],
        fileTemplate: [{ type: Input }],
        fileListItems: [{ type: ViewChildren, args: [FileListItemDirective,] }]
    };
    return FileListComponent;
}());

/**
 * @hidden
 */
var FileListItemActionButtonComponent = /** @class */ (function () {
    function FileListItemActionButtonComponent(uploadService, localization) {
        this.uploadService = uploadService;
        this.localization = localization;
        this.actionFocused = false;
        this.retryFocused = false;
        this.pauseResumeFocused = false;
    }
    FileListItemActionButtonComponent.prototype.onFocus = function (type) {
        if (type === 'action') {
            this.actionFocused = true;
        }
        if (type === 'retry') {
            this.retryFocused = true;
        }
        if (type === 'pauseResume') {
            this.pauseResumeFocused = true;
        }
    };
    FileListItemActionButtonComponent.prototype.onBlur = function (type) {
        if (type === 'retry') {
            this.retryFocused = false;
        }
        if (type === 'action') {
            this.actionFocused = false;
        }
        if (type === 'pauseResume') {
            this.pauseResumeFocused = false;
        }
    };
    FileListItemActionButtonComponent.prototype.onRetryClick = function () {
        if (this.disabled) {
            return;
        }
        this.uploadService.retryFiles(this.file.uid);
    };
    FileListItemActionButtonComponent.prototype.onRemoveCancelClick = function () {
        if (this.disabled) {
            return;
        }
        var uid = this.file.uid;
        if (this.file.state === FileState.Uploading) {
            this.uploadService.cancelFiles(uid);
        }
        else {
            this.uploadService.removeFiles(uid);
        }
    };
    FileListItemActionButtonComponent.prototype.onPauseResumeClick = function () {
        if (this.disabled) {
            return;
        }
        var uid = this.file.uid;
        if (this.file.state === FileState.Paused) {
            this.uploadService.resumeFile(uid);
        }
        else {
            this.uploadService.pauseFile(uid);
        }
    };
    Object.defineProperty(FileListItemActionButtonComponent.prototype, "actionButtonTitle", {
        get: function () {
            if (this.file.state === FileState.Uploading) {
                return this.localization.get('cancel');
            }
            return this.localization.get('remove');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileListItemActionButtonComponent.prototype, "retryButtonTitle", {
        get: function () {
            return this.localization.get('retry');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileListItemActionButtonComponent.prototype, "pauseResumeButtonTitle", {
        get: function () {
            if (this.file.state === FileState.Uploading) {
                return this.localization.get('pause');
            }
            return this.localization.get('resume');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileListItemActionButtonComponent.prototype, "isUploading", {
        get: function () {
            return this.file.state === FileState.Uploading;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileListItemActionButtonComponent.prototype, "isFailed", {
        get: function () {
            return this.file.state === FileState.Failed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileListItemActionButtonComponent.prototype, "isPaused", {
        get: function () {
            return this.file.state === FileState.Paused;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileListItemActionButtonComponent.prototype, "isResumable", {
        get: function () {
            var service = this.uploadService;
            var isResumable = service.async.chunk && service.chunk.resumable;
            var isUploading = (this.file.state === FileState.Paused) || (this.file.state === FileState.Uploading);
            return isResumable && isUploading;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileListItemActionButtonComponent.prototype, "isActionButtonVisible", {
        get: function () {
            if ((this.file.state === FileState.Uploaded || this.file.state === FileState.Initial) &&
                !this.uploadService.async.removeUrl && this.uploadService.component === 'Upload') {
                return false;
            }
            return true;
        },
        enumerable: true,
        configurable: true
    });
    FileListItemActionButtonComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-upload-file-list-item-action-button',
                    template: "\n      <strong class=\"k-upload-status\">\n        <span class=\"k-upload-pct\" *ngIf=\"isUploading || isPaused\">{{progress}}%</span>\n\n        <button type=\"button\" *ngIf=\"isFailed\" class=\"k-button k-button-icon k-flat k-upload-action\"\n          [ngClass]=\"{ 'k-state-focused': this.retryFocused }\"\n          [attr.tabIndex]=\"-1\"\n          (focus)=\"onFocus('retry')\"\n          (blur)=\"onBlur('retry')\"\n          (click)=\"onRetryClick()\">\n          <span class=\"k-icon k-retry k-i-refresh-sm\"\n            [attr.aria-label]=\"retryButtonTitle\"\n            [attr.title]=\"retryButtonTitle\">\n          </span>\n        </button>\n\n        <button *ngIf=\"isResumable\" type=\"button\" class=\"k-button k-button-icon k-flat k-upload-action\"\n          [ngClass]=\"{ 'k-state-focused': this.pauseResumeFocused }\"\n          [attr.tabIndex]=\"-1\"\n          (focus)=\"onFocus('pauseResume')\"\n          (blur)=\"onBlur('pauseResume')\"\n          (click)=\"onPauseResumeClick()\">\n          <span class=\"k-icon\"\n            [ngClass]=\"{\n              'k-i-play-sm': isPaused,\n              'k-i-pause-sm': !isPaused\n            }\"\n            [attr.aria-label]='pauseResumeButtonTitle'\n            [attr.title]='pauseResumeButtonTitle'>\n          </span>\n        </button>\n\n        <button type=\"button\" *ngIf=\"isActionButtonVisible\" class=\"k-button k-button-icon k-flat k-upload-action\"\n          [ngClass]=\"{ 'k-state-focused': this.actionFocused }\"\n          [attr.tabIndex]=\"-1\"\n          (focus)=\"onFocus('action')\"\n          (blur)=\"onBlur('action')\"\n          (click)=\"onRemoveCancelClick()\">\n          <span class=\"k-icon\"\n            [ngClass]=\"{\n              'k-i-cancel': isUploading,\n              'k-delete k-i-x': !isUploading\n            }\"\n            [attr.aria-label]='actionButtonTitle'\n            [attr.title]='actionButtonTitle'>\n          </span>\n        </button>\n      </strong>\n    "
                },] },
    ];
    /** @nocollapse */
    FileListItemActionButtonComponent.ctorParameters = function () { return [
        { type: UploadService },
        { type: LocalizationService }
    ]; };
    FileListItemActionButtonComponent.propDecorators = {
        file: [{ type: Input }],
        disabled: [{ type: Input }],
        progress: [{ type: Input }]
    };
    return FileListItemActionButtonComponent;
}());

/**
 * @hidden
 */
var FileListItemBase = /** @class */ (function () {
    function FileListItemBase(uploadService) {
        this.uploadService = uploadService;
        this.progressComplete = 0;
    }
    FileListItemBase.prototype.subscribeUploadProgress = function (uploadProgressHandler) {
        this.uploadProgressSubscription = this.uploadService.uploadProgressEvent.subscribe(uploadProgressHandler);
    };
    FileListItemBase.prototype.fileHasValidationErrors = function (file) {
        return fileHasValidationErrors(file);
    };
    FileListItemBase.prototype.filesHaveValidationErrors = function (files) {
        return filesHaveValidationErrors(files);
    };
    FileListItemBase.prototype.ngOnDestroy = function () {
        this.uploadProgressSubscription.unsubscribe();
    };
    FileListItemBase.prototype.getFileValidationMessage = function (file) {
        var validationMessage;
        if (file.validationErrors && file.validationErrors.length > 0) {
            validationMessage = this.localization.get(file.validationErrors[0]);
        }
        return validationMessage;
    };
    FileListItemBase.prototype.getTotalFilesSizeMessage = function (files) {
        return getTotalFilesSizeMessage(files);
    };
    FileListItemBase.prototype.textFor = function (key) {
        return this.localization.get(key);
    };
    return FileListItemBase;
}());

/**
 * @hidden
 */
var FileListMultipleItemsComponent = /** @class */ (function (_super) {
    __extends(FileListMultipleItemsComponent, _super);
    function FileListMultipleItemsComponent(localization, uploadService) {
        var _this = _super.call(this, uploadService) || this;
        _this.localization = localization;
        _this.subscribeUploadProgress(function (args) {
            if (args.files[0].uid === _this.files[0].uid) {
                _this.progressComplete = args.percentComplete;
            }
        });
        return _this;
    }
    Object.defineProperty(FileListMultipleItemsComponent.prototype, "showProgress", {
        get: function () {
            var showProgress = this.files[0].state === FileState.Uploading || this.files[0].state === FileState.Paused;
            return showProgress ? 'active' : 'inactive';
        },
        enumerable: true,
        configurable: true
    });
    FileListMultipleItemsComponent.prototype.ngOnInit = function () {
        this.filesHaveErrors = _super.prototype.filesHaveValidationErrors.call(this, this.files);
    };
    FileListMultipleItemsComponent.prototype.fileStatusText = function (file) {
        var errors = file.validationErrors;
        if (!isPresent(errors)) {
            return this.getTotalFilesSizeMessage([file]);
        }
        return this.getFileValidationMessage(file);
    };
    Object.defineProperty(FileListMultipleItemsComponent.prototype, "batchStatusText", {
        get: function () {
            var state$$1 = this.files[0].state;
            var fileCount = this.files.length;
            if (state$$1 === FileState.Uploaded) {
                return fileCount + " " + this.textFor('filesBatchStatusUploaded');
            }
            if (state$$1 === FileState.Failed) {
                return fileCount + " " + this.textFor('filesBatchStatusFailed');
            }
            return fileCount + " " + this.textFor('filesBatchStatus');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileListMultipleItemsComponent.prototype, "isUploadSuccessful", {
        get: function () {
            return this.files[0].state === FileState.Uploaded;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileListMultipleItemsComponent.prototype, "isUploadFailed", {
        get: function () {
            return this.files[0].state === FileState.Failed;
        },
        enumerable: true,
        configurable: true
    });
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
                    template: "\n      <div class=\"k-progressbar\" [@progressState]=\"showProgress\">\n        <span class=\"k-progress\" [style.width]=\"progressComplete + '%'\"></span>\n      </div>\n      <span class=\"k-multiple-files-group-wrapper\">\n        <span class=\"k-file-group k-icon k-i-copy\"></span>\n      </span>\n      <span class=\"k-multiple-files-wrapper\">\n        <span *ngFor=\"let file of files\" class=\"k-file-name-size-wrapper\">\n            <span [title]=\"file.name\" class=\"k-file-name\">\n                {{file.name}}\n            </span>\n            <span [ngClass]=\"{\n                    'k-text-error': file.validationErrors,\n                    'k-file-validation-message': file.validationErrors,\n                    'k-file-size': !file.validationErrors\n                  }\"\n            >{{fileStatusText(file)}}</span>\n        </span>\n        <span class=\"k-file-information\"\n          [ngClass]=\"{\n            'k-text-success': isUploadSuccessful,\n            'k-text-error': isUploadFailed\n          }\"\n        >{{batchStatusText}}</span>\n      </span>\n      <kendo-upload-file-list-item-action-button\n        [file]='files[0]'\n        [disabled]='disabled'\n        [progress]='progressComplete'>\n      </kendo-upload-file-list-item-action-button>\n    "
                },] },
    ];
    /** @nocollapse */
    FileListMultipleItemsComponent.ctorParameters = function () { return [
        { type: LocalizationService },
        { type: UploadService }
    ]; };
    FileListMultipleItemsComponent.propDecorators = {
        disabled: [{ type: Input }],
        files: [{ type: Input }]
    };
    return FileListMultipleItemsComponent;
}(FileListItemBase));

/**
 * @hidden
 */
var FileListSingleItemComponent = /** @class */ (function (_super) {
    __extends(FileListSingleItemComponent, _super);
    function FileListSingleItemComponent(localization, uploadService) {
        var _this = _super.call(this, uploadService) || this;
        _this.localization = localization;
        _this.subscribeUploadProgress(function (args) {
            if (args.files[0].uid === _this.file.uid) {
                _this.progressComplete = args.percentComplete;
            }
        });
        return _this;
    }
    Object.defineProperty(FileListSingleItemComponent.prototype, "fileStatusText", {
        get: function () {
            var errors = this.file.validationErrors;
            if (this.file.state === FileState.Uploaded) {
                return "" + this.textFor('fileStatusUploaded');
            }
            if (this.file.state === FileState.Failed) {
                return "" + this.textFor('fileStatusFailed');
            }
            if (!isPresent(errors)) {
                return this.getTotalFilesSizeMessage([this.file]);
            }
            return this.getFileValidationMessage(this.file);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileListSingleItemComponent.prototype, "showProgress", {
        get: function () {
            var showProgress = this.file.state === FileState.Uploading || this.file.state === FileState.Paused;
            return showProgress ? 'active' : 'inactive';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileListSingleItemComponent.prototype, "fileGroupClass", {
        get: function () {
            return getFileGroupCssClass(this.file.extension ? this.file.extension : '');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileListSingleItemComponent.prototype, "isUploadSuccessful", {
        get: function () {
            return this.file.state === FileState.Uploaded;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileListSingleItemComponent.prototype, "isUploadFailed", {
        get: function () {
            return this.file.state === FileState.Failed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileListSingleItemComponent.prototype, "isNotYetUploaded", {
        get: function () {
            return !this.isUploadFailed && !this.isUploadSuccessful;
        },
        enumerable: true,
        configurable: true
    });
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
                    template: "\n      <div class=\"k-progressbar\" [@progressState]=\"showProgress\">\n        <span class=\"k-progress\" [style.width]=\"progressComplete + '%'\"></span>\n      </div>\n      <span class=\"k-file-group-wrapper\">\n        <span class=\"k-file-group k-icon\" [ngClass]=\"fileGroupClass\"></span>\n      </span>\n      <span class=\"k-file-name-size-wrapper\">\n        <span class=\"k-file-name\" [title]=\"file.name\">{{ file.name }}</span>\n        <span [ngClass]=\"{\n                'k-file-validation-message': file.validationErrors,\n                'k-file-size': !file.validationErrors && isNotYetUploaded,\n                'k-text-success': isUploadSuccessful,\n                'k-text-error': file.validationErrors || isUploadFailed,\n                'k-file-information': isUploadSuccessful || isUploadFailed\n              }\"\n        >{{fileStatusText}}</span>\n      </span>\n      <kendo-upload-file-list-item-action-button\n        [file]='file'\n        [disabled]='disabled'\n        [progress]='progressComplete'>\n      </kendo-upload-file-list-item-action-button>\n    "
                },] },
    ];
    /** @nocollapse */
    FileListSingleItemComponent.ctorParameters = function () { return [
        { type: LocalizationService },
        { type: UploadService }
    ]; };
    FileListSingleItemComponent.propDecorators = {
        disabled: [{ type: Input }],
        file: [{ type: Input }]
    };
    return FileListSingleItemComponent;
}(FileListItemBase));

/**
 * @hidden
 */
var FileSelectDirective = /** @class */ (function () {
    function FileSelectDirective(uploadService, navigation, el) {
        this.uploadService = uploadService;
        this.navigation = navigation;
        this.type = "file";
        this.autocomplete = "off";
        this.tabIndex = -1;
        this.element = el;
    }
    Object.defineProperty(FileSelectDirective.prototype, "nameAttribute", {
        get: function () {
            return this.uploadService.async.saveField;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileSelectDirective.prototype, "multipleAttribute", {
        get: function () {
            return this.multiple ? "multiple" : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileSelectDirective.prototype, "dirAttribute", {
        get: function () {
            return this.dir;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileSelectDirective.prototype, "disabledAttribute", {
        get: function () {
            return this.disabled ? "true" : null;
        },
        enumerable: true,
        configurable: true
    });
    FileSelectDirective.prototype.onInputChange = function (event) {
        var _this = this;
        var ua = navigator.userAgent;
        var chrome = /(chrome)[ \/]([\w.]+)/i;
        var safari = /(webkit)[ \/]([\w.]+)/i;
        var selectedFiles = inputFiles(event.target);
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
        var native = this.element.nativeElement;
        if (!(!ua.match(chrome) && ua.match(safari))) {
            native.type = "";
            native.type = "file";
        }
        setTimeout(function () {
            _this.navigation.focusedIndex = -1;
        });
    };
    FileSelectDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoFileSelect]'
                },] },
    ];
    /** @nocollapse */
    FileSelectDirective.ctorParameters = function () { return [
        { type: UploadService },
        { type: NavigationService },
        { type: ElementRef }
    ]; };
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
    return FileSelectDirective;
}());

/**
 * @hidden
 */
var LocalizedMessagesDirective = /** @class */ (function (_super) {
    __extends(LocalizedMessagesDirective, _super);
    function LocalizedMessagesDirective(service) {
        var _this = _super.call(this) || this;
        _this.service = service;
        return _this;
    }
    LocalizedMessagesDirective.decorators = [
        { type: Directive, args: [{
                    providers: [
                        {
                            provide: Messages,
                            useExisting: forwardRef(function () { return LocalizedMessagesDirective; }) // tslint:disable-line:no-forward-ref
                        }
                    ],
                    selector: "\n    [kendoUploadLocalizedMessages],\n    [kendoFileSelectLocalizedMessages],\n    [kendoUploadDropZoneLocalizedMessages]\n  "
                },] },
    ];
    /** @nocollapse */
    LocalizedMessagesDirective.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    return LocalizedMessagesDirective;
}(Messages));

/**
 * @hidden
 */
var TemplateContextDirective = /** @class */ (function () {
    function TemplateContextDirective(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
    Object.defineProperty(TemplateContextDirective.prototype, "templateContext", {
        set: function (context) {
            if (this.insertedViewRef) {
                this.viewContainerRef.remove(this.viewContainerRef.indexOf(this.insertedViewRef));
                this.insertedViewRef = undefined;
            }
            if (context.templateRef) {
                this.insertedViewRef = this.viewContainerRef.createEmbeddedView(context.templateRef, context);
            }
        },
        enumerable: true,
        configurable: true
    });
    TemplateContextDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[templateContext]' // tslint:disable-line:directive-selector
                },] },
    ];
    /** @nocollapse */
    TemplateContextDirective.ctorParameters = function () { return [
        { type: ViewContainerRef }
    ]; };
    TemplateContextDirective.propDecorators = {
        templateContext: [{ type: Input }]
    };
    return TemplateContextDirective;
}());

/* tslint:disable: no-use-before-declare */
/**
 * @hidden
 */
var UPLOAD_VALUE_ACCESSOR = {
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

var UploadDropZoneDirective = /** @class */ (function () {
    function UploadDropZoneDirective(dropZoneService) {
        this.dropZoneService = dropZoneService;
    }
    /**
     * @hidden
     */
    UploadDropZoneDirective.prototype.onElementDragEnter = function () {
        return false;
    };
    /**
     * @hidden
     */
    UploadDropZoneDirective.prototype.onElementDragOver = function () {
        return false;
    };
    /**
     * @hidden
     */
    UploadDropZoneDirective.prototype.onDropListener = function (event) {
        var components = this.componentInstance;
        if (!isPresent(components)) {
            return;
        }
        components.forEach(function (component) {
            var droppedFiles = event.dataTransfer.files;
            if (droppedFiles.length > 0 && !component.disabled) {
                var files = getAllFileInfo(droppedFiles);
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
    };
    Object.defineProperty(UploadDropZoneDirective.prototype, "componentInstance", {
        /**
         * @hidden
         */
        get: function () {
            return this.dropZoneService.getComponents(this.zoneId);
        },
        enumerable: true,
        configurable: true
    });
    UploadDropZoneDirective.decorators = [
        { type: Directive, args: [{
                    providers: [
                        DropZoneService
                    ],
                    selector: '[kendoUploadDropZone], [kendoFileSelectDropZone]'
                },] },
    ];
    /** @nocollapse */
    UploadDropZoneDirective.ctorParameters = function () { return [
        { type: DropZoneService }
    ]; };
    UploadDropZoneDirective.propDecorators = {
        zoneId: [{ type: Input, args: ['kendoUploadDropZone',] }],
        onElementDragEnter: [{ type: HostListener, args: ['dragenter',] }],
        onElementDragOver: [{ type: HostListener, args: ['dragover',] }],
        onDropListener: [{ type: HostListener, args: ['drop', ['$event'],] }]
    };
    return UploadDropZoneDirective;
}());

/* tslint:disable: no-use-before-declare */
/**
 * Represents the [Kendo UI UploadDropZone component for Angular]({% slug overview_upload %}).
 */
var UploadDropZoneComponent = /** @class */ (function (_super) {
    __extends(UploadDropZoneComponent, _super);
    function UploadDropZoneComponent(element, renderer, localization) {
        var _this = _super.call(this, element, renderer, 'k-external-dropzone-hover') || this;
        _this.localization = localization;
        _this.hostClass = true;
        _this.localizationChangeSubscription = _this.localization.changes.subscribe(function (_a) {
            var rtl = _a.rtl;
            _this.direction = rtl ? 'rtl' : 'ltr';
        });
        return _this;
    }
    Object.defineProperty(UploadDropZoneComponent.prototype, "dirAttribute", {
        get: function () {
            return this.direction;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    UploadDropZoneComponent.prototype.textFor = function (key) {
        return this.localization.get(key);
    };
    Object.defineProperty(UploadDropZoneComponent.prototype, "iconClasses", {
        /**
         * @hidden
         */
        get: function () {
            if (this.icon) {
                return "k-icon k-i-" + this.icon;
            }
            if (this.iconClass) {
                return "" + this.iconClass;
            }
            return 'k-icon k-i-upload';
        },
        enumerable: true,
        configurable: true
    });
    UploadDropZoneComponent.prototype.ngOnDestroy = function () {
        if (this.localizationChangeSubscription) {
            this.localizationChangeSubscription.unsubscribe();
        }
    };
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
                    template: "\n    <ng-container kendoUploadDropZoneLocalizedMessages\n      i18n-externalDropFilesHere='kendo.uploaddropzone.externalDropFilesHere|Sets the external drop-zone hint'\n      externalDropFilesHere='Drag and drop files here to upload'\n    >\n    </ng-container>\n    <div class='k-dropzone-inner' [kendoUploadDropZone]=\"zoneId\">\n      <span [ngClass]=\"iconClasses\"></span>\n      <span class=\"k-dropzone-hint\">{{ textFor('externalDropFilesHere') }}</span>\n      <span class=\"k-dropzone-note\">\n        <ng-content></ng-content>\n      </span>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    UploadDropZoneComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: LocalizationService }
    ]; };
    UploadDropZoneComponent.propDecorators = {
        hostClass: [{ type: HostBinding, args: ['class.k-external-dropzone',] }],
        dirAttribute: [{ type: HostBinding, args: ['attr.dir',] }],
        zoneId: [{ type: Input }],
        icon: [{ type: Input }],
        iconClass: [{ type: Input }]
    };
    return UploadDropZoneComponent;
}(DropZoneBase));

/**
 * @hidden
 */
var SHARED_DECLARATIONS = [
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
var PUBLIC_DIRECTIVES = [
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

var FILESELECT_DECLARATIONS = [
    FileSelectComponent
];
/**
 * Represents the [NgModule](https://angular.io/api/core/NgModule) definition for the FileSelect component.
 */
var FileSelectModule = /** @class */ (function () {
    function FileSelectModule() {
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
    return FileSelectModule;
}());

/**
 * @hidden
 */
var UploadActionButtonsComponent = /** @class */ (function () {
    function UploadActionButtonsComponent(uploadService, localization, navigation) {
        this.uploadService = uploadService;
        this.localization = localization;
        this.navigation = navigation;
        this.hostDefaultClass = true;
        this.onAction();
        this.onFocus();
    }
    Object.defineProperty(UploadActionButtonsComponent.prototype, "actionButtonsEndClassName", {
        get: function () {
            return this.actionsLayout === 'end';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UploadActionButtonsComponent.prototype, "actionButtonsStretchedClassName", {
        get: function () {
            return this.actionsLayout === 'stretched';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UploadActionButtonsComponent.prototype, "actionButtonsStartClassName", {
        get: function () {
            return this.actionsLayout === 'start';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UploadActionButtonsComponent.prototype, "actionButtonsCenterClassName", {
        get: function () {
            return this.actionsLayout === 'center';
        },
        enumerable: true,
        configurable: true
    });
    UploadActionButtonsComponent.prototype.onAction = function () {
        var _this = this;
        this.actionSubscription = this.navigation.onActionButtonAction.subscribe(function (button) {
            if (button === "clear") {
                _this.clearFiles();
            }
            else {
                _this.performUpload();
            }
            _this.navigation.focusSelectButton();
        });
    };
    UploadActionButtonsComponent.prototype.onFocus = function () {
        var _this = this;
        this.focusSubscription = this.navigation.onActionButtonFocus.subscribe(function (button) {
            _this.focusButton(button);
        });
    };
    UploadActionButtonsComponent.prototype.focusButton = function (button) {
        var el = (button === "clear") ? this.clearButton : this.uploadButton;
        el.nativeElement.focus();
    };
    UploadActionButtonsComponent.prototype.ngOnDestroy = function () {
        this.actionSubscription.unsubscribe();
        this.focusSubscription.unsubscribe();
    };
    UploadActionButtonsComponent.prototype.performUpload = function (_event) {
        if (!this.disabled) {
            this.uploadService.uploadFiles();
        }
    };
    UploadActionButtonsComponent.prototype.clearFiles = function (_event) {
        if (!this.disabled) {
            this.uploadService.clearFiles();
        }
    };
    UploadActionButtonsComponent.prototype.textFor = function (key) {
        return this.localization.get(key);
    };
    UploadActionButtonsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-upload-action-buttons',
                    template: "\n        <button #clearButton type=\"button\" class=\"k-button k-clear-selected\"\n            [attr.tabIndex]=\"-1\"\n            (click)=\"clearFiles($event)\">\n                {{textFor('clearSelectedFiles')}}\n        </button>\n        <button #uploadButton type=\"button\" class=\"k-button k-primary k-upload-selected\"\n            [attr.tabIndex]=\"-1\"\n            (click)=\"performUpload($event)\">\n                {{textFor('uploadSelectedFiles')}}\n        </button>\n    "
                },] },
    ];
    /** @nocollapse */
    UploadActionButtonsComponent.ctorParameters = function () { return [
        { type: UploadService },
        { type: LocalizationService },
        { type: NavigationService }
    ]; };
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
    return UploadActionButtonsComponent;
}());

/**
 * @hidden
 */
var UploadStatusTotalComponent = /** @class */ (function () {
    function UploadStatusTotalComponent(localization) {
        this.localization = localization;
    }
    UploadStatusTotalComponent.prototype.ngDoCheck = function () {
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
    };
    UploadStatusTotalComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-upload-status-total',
                    template: "\n        <span class=\"k-icon\"\n            [ngClass]=\"{\n                'k-i-checkmark': !this.isUploading && !this.isFailed,\n                'k-i-exception': !this.isUploading && this.isFailed,\n                'k-i-upload': this.isUploading,\n                'k-i-pause-sm': this.isPaused\n            }\">\n        </span>\n        {{statusText}}\n    "
                },] },
    ];
    /** @nocollapse */
    UploadStatusTotalComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    UploadStatusTotalComponent.propDecorators = {
        fileList: [{ type: Input }]
    };
    return UploadStatusTotalComponent;
}());

var UPLOAD_DECLARATIONS = [
    UploadComponent,
    UploadActionButtonsComponent,
    UploadStatusTotalComponent
];
/**
 * Represents the [NgModule](https://angular.io/api/core/NgModule) definition for the Upload component.
 */
var UploadModule = /** @class */ (function () {
    function UploadModule() {
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
    return UploadModule;
}());

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
var UploadsModule = /** @class */ (function () {
    function UploadsModule() {
    }
    UploadsModule.decorators = [
        { type: NgModule, args: [{
                    exports: [
                        FileSelectModule,
                        UploadModule
                    ]
                },] },
    ];
    return UploadsModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { DropZoneBase, DropZoneInternalDirective, DropZoneService, PreventableEvent, FILESELECT_VALUE_ACCESSOR, LocalizedMessagesDirective, Messages, NavigationService, FileListItemDirective, FileListItemBase, PUBLIC_DIRECTIVES, SHARED_DECLARATIONS, SharedModule, UPLOAD_VALUE_ACCESSOR, UploadService, FileSelectModule, UploadModule, UploadsModule, UploadComponent, FileSelectComponent, UploadDropZoneComponent, FileSelectDirective, FileListComponent, FileListSingleItemComponent, FileListItemActionButtonComponent, FileListMultipleItemsComponent, FileTemplateDirective, TemplateContextDirective, UploadStatusTotalComponent, UploadActionButtonsComponent, UploadDropZoneDirective, CustomMessagesComponent, CancelEvent, ClearEvent, ErrorEvent, PauseEvent, RemoveEvent, ResumeEvent, SelectEvent, SuccessEvent, UploadEvent, UploadProgressEvent, FileState };
