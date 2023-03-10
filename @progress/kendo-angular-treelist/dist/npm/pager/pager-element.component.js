/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @hidden
 */
var PagerElementComponent = /** @class */ (function () {
    function PagerElementComponent(localization, pagerContext, cd) {
        this.localization = localization;
        this.pagerContext = pagerContext;
        this.cd = cd;
        this.total = this.pagerContext.total;
        this.skip = this.pagerContext.skip;
        this.pageSize = this.pagerContext.pageSize;
        this.allCount = this.pagerContext.allCount;
    }
    Object.defineProperty(PagerElementComponent.prototype, "currentPage", {
        /**
         * @hidden
         *
         * @readonly
         * @type {number}
         * @memberOf PagerElementComponent
         */
        get: function () {
            return Math.floor((this.skip || 0) / this.pageSize) + 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PagerElementComponent.prototype, "totalPages", {
        /**
         * @hidden
         *
         * @readonly
         * @type {number}
         * @memberOf PagerElementComponent
         */
        get: function () {
            return Math.ceil((this.total || 0) / this.pageSize);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     *
     * @param {string} key
     * @returns {string}
     *
     * @memberOf PagerElementComponent
     */
    PagerElementComponent.prototype.textFor = function (key) {
        return this.localization.get(key);
    };
    /**
     * @hidden
     *
     * @param {number} page
     *
     * @memberOf PagerElementComponent
     */
    PagerElementComponent.prototype.changePage = function (page) {
        this.pagerContext.changePage(page);
        return false;
    };
    /**
     * @hidden
     *
     * @memberOf PagerElementComponent
     */
    PagerElementComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscriptions = this.pagerContext.changes.subscribe(this.onChanges.bind(this));
        this.subscriptions.add(this.localization.changes.subscribe(function () { return _this.cd.markForCheck(); }));
    };
    PagerElementComponent.prototype.ngOnDestroy = function () {
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
        }
    };
    return PagerElementComponent;
}());
exports.PagerElementComponent = PagerElementComponent;
