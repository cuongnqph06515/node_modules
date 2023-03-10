/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { FileState } from '../types';
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
    FileMap.prototype.setFilesState = function (files, state) {
        for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
            var file = files_1[_i];
            this.setFilesStateByUid(file.uid, state);
        }
    };
    FileMap.prototype.setFilesStateByUid = function (uid, state) {
        this.get(uid).forEach(function (f) {
            f.state = state;
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
export { FileMap };
