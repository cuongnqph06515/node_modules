/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @hidden
 */
exports.INVALIDMAXFILESIZE = "invalidMaxFileSize";
/**
 * @hidden
 */
exports.INVALIDMINFILESIZE = "invalidMinFileSize";
/**
 * @hidden
 */
exports.INVALIDFILEEXTENSION = "invalidFileExtension";
var validateFileExtension = function (file, allowedExtensions) {
    if (allowedExtensions.length > 0) {
        if (allowedExtensions.indexOf(file.extension.toLowerCase()) < 0) {
            file.validationErrors = file.validationErrors || [];
            if (file.validationErrors.indexOf(exports.INVALIDFILEEXTENSION) < 0) {
                file.validationErrors.push(exports.INVALIDFILEEXTENSION);
            }
        }
    }
};
var ɵ0 = validateFileExtension;
exports.ɵ0 = ɵ0;
var validateFileSize = function (file, minFileSize, maxFileSize) {
    if (minFileSize !== 0 && file.size < minFileSize) {
        file.validationErrors = file.validationErrors || [];
        if (file.validationErrors.indexOf(exports.INVALIDMINFILESIZE) < 0) {
            file.validationErrors.push(exports.INVALIDMINFILESIZE);
        }
    }
    if (maxFileSize !== 0 && file.size > maxFileSize) {
        file.validationErrors = file.validationErrors || [];
        if (file.validationErrors.indexOf(exports.INVALIDMAXFILESIZE) < 0) {
            file.validationErrors.push(exports.INVALIDMAXFILESIZE);
        }
    }
};
var ɵ1 = validateFileSize;
exports.ɵ1 = ɵ1;
var parseAllowedExtensions = function (extensions) {
    var allowedExtensions = extensions.map(function (ext) {
        var parsedExt = (ext.substring(0, 1) === ".") ? ext : ("." + ext);
        return parsedExt.toLowerCase();
    });
    return allowedExtensions;
};
var ɵ2 = parseAllowedExtensions;
exports.ɵ2 = ɵ2;
/**
 * @hidden
 */
exports.validateFiles = function (files, restrictionInfo) {
    var allowedExtensions = parseAllowedExtensions(restrictionInfo.allowedExtensions);
    var maxFileSize = restrictionInfo.maxFileSize;
    var minFileSize = restrictionInfo.minFileSize;
    var i;
    for (i = 0; i < files.length; i++) {
        validateFileExtension(files[i], allowedExtensions);
        validateFileSize(files[i], minFileSize, maxFileSize);
    }
};
