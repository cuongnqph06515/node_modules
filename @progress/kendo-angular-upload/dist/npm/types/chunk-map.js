/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.ChunkMap = ChunkMap;
