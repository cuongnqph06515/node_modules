/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { HttpClient, HttpEventType, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { FileState } from './types';
import { FileMap } from './types/file-map';
import { CancelEvent, ClearEvent, ErrorEvent, PauseEvent, RemoveEvent, ResumeEvent, SelectEvent, SuccessEvent, UploadEvent, UploadProgressEvent } from './events';
import { getInitialFileInfo, convertFileToFileInfo } from './common/util';
import { ChunkMap } from './types/chunk-map';
/**
 * @hidden
 */
export class UploadService {
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
