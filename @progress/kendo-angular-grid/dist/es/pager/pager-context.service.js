/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Subject } from "rxjs";
/**
 * @hidden
 */
var PagerContextService = /** @class */ (function () {
    function PagerContextService() {
        this.changes = new Subject();
        this.pageChange = new Subject();
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
        if (nextPage * this.pageSize < this.total) {
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
export { PagerContextService };
