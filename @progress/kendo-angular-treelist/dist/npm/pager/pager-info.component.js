/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var pager_element_component_1 = require("./pager-element.component");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
var pager_context_service_1 = require("./pager-context.service");
/**
 * Displays information about the current page and the total number of records ([see example]({% slug paging_treelist %}#toc-pager-templates)).
 */
var PagerInfoComponent = /** @class */ (function (_super) {
    tslib_1.__extends(PagerInfoComponent, _super);
    function PagerInfoComponent(localization, cd, pagerContext) {
        var _this = _super.call(this, localization, pagerContext, cd) || this;
        _this.pagerContext = pagerContext;
        return _this;
    }
    Object.defineProperty(PagerInfoComponent.prototype, "maxItems", {
        /**
         * @hidden
         *
         * @readonly
         * @type {number}
         * @memberOf PagerInfoComponent
         */
        get: function () {
            return Math.min(this.currentPage * this.pageSize, this.total);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PagerInfoComponent.prototype, "currentPageText", {
        /**
         * @hidden
         *
         * @readonly
         * @type {number}
         * @memberOf PagerInfoComponent
         */
        get: function () {
            return this.total ?
                (this.currentPage - 1) * this.pageSize + 1 :
                0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PagerInfoComponent.prototype, "classes", {
        /**
         * @hidden
         *
         * @readonly
         * @type {boolean}
         * @memberOf PagerInfoComponent
         */
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    PagerInfoComponent.prototype.onChanges = function (_a) {
        var allCount = _a.allCount, total = _a.total, skip = _a.skip, pageSize = _a.pageSize;
        this.total = total;
        this.skip = skip;
        this.pageSize = pageSize;
        this.allCount = allCount;
        this.cd.markForCheck();
    };
    PagerInfoComponent.decorators = [
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-pager-info',
                    template: "{{currentPageText}} - {{maxItems}} {{textFor('pagerOf')}} {{allCount}} {{textFor('pagerItems')}}"
                },] },
    ];
    /** @nocollapse */
    PagerInfoComponent.ctorParameters = function () { return [
        { type: kendo_angular_l10n_1.LocalizationService },
        { type: core_1.ChangeDetectorRef },
        { type: pager_context_service_1.PagerContextService }
    ]; };
    PagerInfoComponent.propDecorators = {
        classes: [{ type: core_1.HostBinding, args: ["class.k-pager-info",] }, { type: core_1.HostBinding, args: ["class.k-label",] }]
    };
    return PagerInfoComponent;
}(pager_element_component_1.PagerElementComponent));
exports.PagerInfoComponent = PagerInfoComponent;
