/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var types_1 = require("./types");
var file_map_1 = require("./types/file-map");
var events_1 = require("./events");
var util_1 = require("./common/util");
var chunk_map_1 = require("./types/chunk-map");
/**
 * @hidden
 */
var UploadService = /** @class */ (function () {
    function UploadService(http) {
        this.http = http;
        this.cancelEvent = new core_1.EventEmitter();
        this.clearEvent = new core_1.EventEmitter();
        this.completeEvent = new core_1.EventEmitter();
        this.errorEvent = new core_1.EventEmitter();
        this.pauseEvent = new core_1.EventEmitter();
        this.removeEvent = new core_1.EventEmitter();
        this.resumeEvent = new core_1.EventEmitter();
        this.selectEvent = new core_1.EventEmitter();
        this.successEvent = new core_1.EventEmitter();
        this.uploadEvent = new core_1.EventEmitter();
        this.uploadProgressEvent = new core_1.EventEmitter();
        /**
         * Required for the `ControlValueAccessor` integration
         */
        this.changeEvent = new core_1.EventEmitter();
        /**
         * Default async settings
         */
        this.async = {
            autoUpload: true,
            batch: false,
            chunk: false,
            concurrent: true,
            removeField: "fileNames",
            removeHeaders: new http_1.HttpHeaders(),
            removeMethod: "POST",
            removeUrl: "",
            responseType: "json",
            saveField: "files",
            saveHeaders: new http_1.HttpHeaders(),
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
        this.chunkMap = new chunk_map_1.ChunkMap();
        this.fileList = new file_map_1.FileMap();
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
            return file.state === types_1.FileState.Initial ||
                file.state === types_1.FileState.Uploaded;
        });
        this.changeEvent.emit(files.length > 0 ? files : null);
    };
    UploadService.prototype.addFiles = function (files) {
        var selectEventArgs = new events_1.SelectEvent(files);
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
            var fakeFile = util_1.getInitialFileInfo(file);
            _this.fileList.add(fakeFile);
        });
    };
    UploadService.prototype.addInitialFileSelectFiles = function (initialFiles) {
        var _this = this;
        this.fileList.clear();
        initialFiles.forEach(function (file) {
            if (file instanceof File) {
                _this.fileList.add(util_1.convertFileToFileInfo(file));
            }
            else {
                _this.fileList.add(util_1.getInitialFileInfo(file));
            }
        });
    };
    UploadService.prototype.resumeFile = function (uid) {
        var fileToResume = this.fileList.get(uid);
        this.resumeEvent.emit(new events_1.ResumeEvent(fileToResume[0]));
        this.fileList.setFilesStateByUid(uid, types_1.FileState.Uploading);
        this._uploadFiles([fileToResume]);
    };
    UploadService.prototype.pauseFile = function (uid) {
        var pausedFile = this.fileList.get(uid)[0];
        this.pauseEvent.emit(new events_1.PauseEvent(pausedFile));
        this.fileList.setFilesStateByUid(uid, types_1.FileState.Paused);
    };
    UploadService.prototype.removeFiles = function (uid) {
        var removedFiles = this.fileList.get(uid);
        // Clone the Headers so that the default ones are not overridden
        var removeEventArgs = new events_1.RemoveEvent(removedFiles, this.cloneRequestHeaders(this.async.removeHeaders));
        this.removeEvent.emit(removeEventArgs);
        if (!removeEventArgs.isDefaultPrevented()) {
            if (this.component === 'Upload' &&
                (removedFiles[0].state === types_1.FileState.Uploaded ||
                    removedFiles[0].state === types_1.FileState.Initial)) {
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
        var cancelEventArgs = new events_1.CancelEvent(canceledFiles);
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
        var clearEventArgs = new events_1.ClearEvent();
        this.clearEvent.emit(clearEventArgs);
        if (!clearEventArgs.isDefaultPrevented()) {
            var triggerChange = this.fileList.hasFileWithState([
                types_1.FileState.Initial,
                types_1.FileState.Uploaded
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
        if (!this.async.concurrent && !this.fileList.hasFileWithState([types_1.FileState.Uploading])) {
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
            if (filesToUpload[0].state === types_1.FileState.Paused) {
                return { value: void 0 };
            }
            // Clone the Headers so that the default ones are not overridden
            var uploadEventArgs = new events_1.UploadEvent(filesToUpload, this_1.cloneRequestHeaders(this_1.async.saveHeaders));
            this_1.uploadEvent.emit(uploadEventArgs);
            if (!uploadEventArgs.isDefaultPrevented()) {
                this_1.fileList.setFilesState(filesToUpload, types_1.FileState.Uploading);
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
        var removeRequest = new http_1.HttpRequest(async.removeMethod, async.removeUrl, formData, options);
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
        var uploadRequest = new http_1.HttpRequest(async.saveMethod, async.saveUrl, formData, options);
        var httpSubscription = this.http.request(uploadRequest)
            .subscribe(function (event) {
            if (event.type === http_1.HttpEventType.UploadProgress && !_this.async.chunk) {
                _this.onProgress(event, files);
            }
            else if (event instanceof http_1.HttpResponse) {
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
        var successArgs = new events_1.SuccessEvent(files, operation, successResponse);
        this.successEvent.emit(successArgs);
        if (operation === "upload") {
            this.fileList.setFilesState(files, successArgs.isDefaultPrevented() ? types_1.FileState.Failed : types_1.FileState.Uploaded);
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
        var errorArgs = new events_1.ErrorEvent(files, operation, errorResponse);
        this.errorEvent.emit(errorArgs);
        if (operation === "upload") {
            this.fileList.setFilesState(files, types_1.FileState.Failed);
        }
    };
    UploadService.prototype.onProgress = function (event, files) {
        var percentComplete = Math.round(100 * event.loaded / event.total);
        var progressArgs = new events_1.UploadProgressEvent(files, percentComplete < 100 ? percentComplete : 100);
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
        var progressArgs = new events_1.UploadProgressEvent(files, percentComplete < 100 ? percentComplete : 100);
        this.uploadProgressEvent.emit(progressArgs);
    };
    UploadService.prototype.checkAllComplete = function () {
        if (!this.fileList.hasFileWithState([
            types_1.FileState.Selected,
            types_1.FileState.Uploading,
            types_1.FileState.Paused
        ])) {
            this.completeEvent.emit();
        }
        else if (this.shouldUploadNextFile()) {
            this.uploadFiles();
        }
    };
    UploadService.prototype.shouldUploadNextFile = function () {
        return !this.async.concurrent &&
            this.fileList.hasFileWithState([types_1.FileState.Selected]) &&
            !this.fileList.hasFileWithState([types_1.FileState.Uploading]);
    };
    UploadService.prototype.cloneRequestHeaders = function (headers) {
        var cloned = {};
        if (headers) {
            headers.keys().forEach(function (key) {
                cloned[key] = headers.get(key);
            });
        }
        return new http_1.HttpHeaders(cloned);
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
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    UploadService.ctorParameters = function () { return [
        { type: http_1.HttpClient }
    ]; };
    return UploadService;
}());
exports.UploadService = UploadService;
