/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/**
 * @hidden
 */
export var INVALIDMAXFILESIZE = "invalidMaxFileSize";
/**
 * @hidden
 */
export var INVALIDMINFILESIZE = "invalidMinFileSize";
/**
 * @hidden
 */
export var INVALIDFILEEXTENSION = "invalidFileExtension";
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
var ɵ0 = validateFileExtension;
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
var ɵ1 = validateFileSize;
var parseAllowedExtensions = function (extensions) {
    var allowedExtensions = extensions.map(function (ext) {
        var parsedExt = (ext.substring(0, 1) === ".") ? ext : ("." + ext);
        return parsedExt.toLowerCase();
    });
    return allowedExtensions;
};
var ɵ2 = parseAllowedExtensions;
/**
 * @hidden
 */
export var validateFiles = function (files, restrictionInfo) {
    var allowedExtensions = parseAllowedExtensions(restrictionInfo.allowedExtensions);
    var maxFileSize = restrictionInfo.maxFileSize;
    var minFileSize = restrictionInfo.minFileSize;
    var i;
    for (i = 0; i < files.length; i++) {
        validateFileExtension(files[i], allowedExtensions);
        validateFileSize(files[i], minFileSize, maxFileSize);
    }
};
export { ɵ0, ɵ1, ɵ2 };
