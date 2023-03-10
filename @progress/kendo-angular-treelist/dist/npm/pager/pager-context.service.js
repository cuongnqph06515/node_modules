/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
/**
 * @hidden
 */
var PagerContextService = /** @class */ (function () {
    function PagerContextService() {
        this.changes = new rxjs_1.Subject();
        this.pageChange = new rxjs_1.Subject();
    }
    Object.defineProperty(PagerContextService.prototype, "currentPage", {
        get: function () {
            return this.skip / this.pageSize;
        },
        enumerable: true,
        configurable: true
    });
    PagerContextService.prototype.notifyChanges = function (changes) {
        this.total = changes.total;
        this.pageSize = changes.pageSize;
        this.skip = changes.skip;
        this.allCount = changes.allCount;
        this.changes.next(changes);
    };
    PagerContextService.prototype.changePage = function (page) {
        this.pageChange.next({ skip: page * this.pageSize, take: this.pageSize });
    };
    PagerContextService.prototype.changePageSize = function (value) {
        this.pageChange.next({ skip: 0, take: value });
    };
    PagerContextService.prototype.nextPage = function () {
        var nextPage = this.currentPage + 1;
        if (nextPage * this.pageSize <= this.total) {
            this.changePage(nextPage);
        }
    };
    PagerContextService.prototype.prevPage = function () {
        var prevPage = this.currentPage - 1;
        if (prevPage * this.pageSize >= 0) {
            this.changePage(prevPage);
        }
    };
    return PagerContextService;
}());
exports.PagerContextService = PagerContextService;
