/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { FileInfo, FileState } from '../types';
/**
 * @hidden
 */
export declare class FileMap {
    private _files;
    constructor();
    add(file: FileInfo): void;
    remove(uid: string): void;
    clear(): void;
    has(uid: string): boolean;
    get(uid: string): Array<FileInfo>;
    setFilesState(files: Array<FileInfo>, state: FileState): void;
    setFilesStateByUid(uid: string, state: FileState): void;
    readonly count: number;
    readonly files: Array<Array<FileInfo>>;
    readonly filesFlat: Array<FileInfo>;
    readonly filesToUpload: Array<Array<FileInfo>>;
    readonly firstFileToUpload: Array<FileInfo>;
    hasFileWithState(fileStates: Array<FileState>): boolean;
}
