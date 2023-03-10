/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { FileState } from '../types';
/**
 * @hidden
 */
export class FileMap {
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
    setFilesState(files, state) {
        for (let file of files) {
            this.setFilesStateByUid(file.uid, state);
        }
    }
    setFilesStateByUid(uid, state) {
        this.get(uid).forEach((f) => {
            f.state = state;
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
