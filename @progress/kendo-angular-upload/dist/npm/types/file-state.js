/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
})(FileState = exports.FileState || (exports.FileState = {}));
