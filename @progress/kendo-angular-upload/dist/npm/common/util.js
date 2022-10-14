/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("../types");
var kendo_angular_common_1 = require("@progress/kendo-angular-common");
var file_groups_1 = require("../types/file-groups");
/**
 * @hidden
 */
exports.getTotalFilesSizeMessage = function (files) {
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
var ɵ0 = stripPath;
exports.ɵ0 = ɵ0;
var getFileExtension = function (fileName) {
    var rFileExtension = /\.([^\.]+)$/;
    var matches = fileName.match(rFileExtension);
    return matches ? matches[0] : "";
};
var ɵ1 = getFileExtension;
exports.ɵ1 = ɵ1;
/**
 * @hidden
 */
exports.validateInitialFileInfo = function (file) {
    if (file instanceof Object && file.hasOwnProperty("name")) {
        return true;
    }
    return false;
};
/**
 * @hidden
 */
exports.validateInitialFileSelectFile = function (file) {
    if (file instanceof File || exports.validateInitialFileInfo(file)) {
        return true;
    }
    return false;
};
/**
 * @hidden
 */
exports.getInitialFileInfo = function (fakeFile) {
    fakeFile.extension = fakeFile.extension || getFileExtension(fakeFile.name);
    fakeFile.name = fakeFile.name;
    fakeFile.size = fakeFile.size || 0;
    if (!fakeFile.hasOwnProperty("state")) {
        fakeFile.state = types_1.FileState.Initial;
    }
    if (!fakeFile.hasOwnProperty("uid")) {
        fakeFile.uid = kendo_angular_common_1.guid();
    }
    return fakeFile;
};
/**
 * @hidden
 */
exports.convertFileToFileInfo = function (file) {
    var fileInfo = getFileInfo(file);
    fileInfo.uid = kendo_angular_common_1.guid();
    // Used to differentiate initial FileInfo objects and actual Files
    fileInfo.state = types_1.FileState.Selected;
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
        state: types_1.FileState.Selected
    };
};
var ɵ2 = getFileInfo;
exports.ɵ2 = ɵ2;
/**
 * @hidden
 */
exports.getAllFileInfo = function (rawFiles) {
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
exports.fileHasValidationErrors = function (file) {
    if (file.validationErrors && file.validationErrors.length > 0) {
        return true;
    }
    return false;
};
/**
 * @hidden
 */
exports.filesHaveValidationErrors = function (files) {
    for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
        var file = files_1[_i];
        if (exports.fileHasValidationErrors(file)) {
            return true;
        }
    }
    return false;
};
/**
 * @hidden
 */
exports.inputFiles = function (input) {
    if (input.files) {
        return exports.getAllFileInfo(input.files);
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
                state: types_1.FileState.Selected
            };
        });
        return fileNames;
    }
};
/**
 * @hidden
 */
exports.assignGuidToFiles = function (files, isUnique) {
    var uid = kendo_angular_common_1.guid();
    return files.map(function (file) {
        file.uid = isUnique ? kendo_angular_common_1.guid() : uid;
        return file;
    });
};
/**
 * @hidden
 */
exports.supportsFormData = function () {
    return typeof (FormData) !== "undefined";
};
/**
 * @hidden
 */
exports.userAgent = function () {
    return navigator.userAgent;
};
var focusableRegex = /^(?:a|input|select|textarea|button|object)$/i;
/**
 * @hidden
 */
exports.IGNORE_TARGET_CLASSES = 'k-icon k-select k-input k-multiselect-wrap';
/**
 * @hidden
 */
exports.UPLOAD_CLASSES = 'k-upload-button k-clear-selected k-upload-selected k-upload-action';
var isVisible = function (element) {
    var rect = element.getBoundingClientRect();
    return !!(rect.width && rect.height) && window.getComputedStyle(element).visibility !== 'hidden';
};
var ɵ3 = isVisible;
exports.ɵ3 = ɵ3;
var toClassList = function (classNames) { return String(classNames).trim().split(' '); };
var ɵ4 = toClassList;
exports.ɵ4 = ɵ4;
/**
 * @hidden
 */
exports.hasClasses = function (element, classNames) {
    var namesList = toClassList(classNames);
    return Boolean(toClassList(element.className).find(function (className) { return namesList.indexOf(className) >= 0; }));
};
/**
 * @hidden
 */
exports.isFocusable = function (element, checkVisibility) {
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
exports.getFileGroupCssClass = function (fileExtension) {
    var initial = 'k-i-file';
    for (var group in file_groups_1.fileGroupMap) {
        if (file_groups_1.fileGroupMap[group].indexOf(fileExtension) >= 0) {
            return initial + "-" + group;
        }
    }
    return initial;
};
/**
 * @hidden
 */
exports.isPresent = function (value) { return value !== null && value !== undefined; };
