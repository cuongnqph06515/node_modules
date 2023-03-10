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
 * Displays a drop-down list for the page size selection ([see example]({% slug paging_treelist %}#toc-pager-templates)).
 */
var PagerPageSizesComponent = /** @class */ (function (_super) {
    tslib_1.__extends(PagerPageSizesComponent, _super);
    function PagerPageSizesComponent(localization, cd, pagerContext) {
        var _this = _super.call(this, localization, pagerContext, cd) || this;
        _this.pagerContext = pagerContext;
        _this._pageSizes = [];
        return _this;
    }
    Object.defineProperty(PagerPageSizesComponent.prototype, "pageSizes", {
        get: function () {
            return this._pageSizes;
        },
        /**
         * The page sizes collection. Can be an Array of numbers and/or PageSizeItem objects.
         *
         * {% meta height:500 %}
         * {% embed_file configuration/pager-template-page-sizes/app.component.ts preview %}
         * {% embed_file shared/app.module.ts %}
         * {% embed_file shared/filesystem.ts %}
         * {% embed_file shared/main.ts %}
         * {% endmeta %}
         */
        set: function (pageSizes) {
            var normalizedItems = [];
            pageSizes.forEach(function (item) {
                if (typeof item === 'number') {
                    normalizedItems.push({
                        text: item.toString(),
                        value: item
                    });
                }
                else {
                    normalizedItems.push(item);
                }
            });
            this._pageSizes = normalizedItems;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PagerPageSizesComponent.prototype, "classes", {
        /**
         * @hidden
         *
         * @readonly
         */
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PagerPageSizesComponent.prototype, "showInitialPageSize", {
        /**
         * @hidden
         *
         * @readonly
         */
        get: function () {
            var _this = this;
            return this.pageSizes
                .filter(function (item) {
                if (typeof item.value === 'number') {
                    return item.value === Number(_this.pageSize);
                }
                return _this.total === Number(_this.pageSize);
            })
                .length === 0;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    PagerPageSizesComponent.prototype.pageSizeChange = function (value) {
        this.pageSize = parseInt(value, 10);
        this.pagerContext.changePageSize(this.pageSize);
    };
    /**
     * @hidden
     */
    PagerPageSizesComponent.prototype.getValue = function (page) {
        return typeof page.value === 'number' ? page.value : this.total;
    };
    /**
     * @hidden
     */
    PagerPageSizesComponent.prototype.getSelectedState = function (page) {
        if (typeof page.value === 'number') {
            return page.value === this.pageSize ? true : undefined;
        }
        return this.pageSize === this.total;
    };
    PagerPageSizesComponent.prototype.onChanges = function (_a) {
        var total = _a.total, skip = _a.skip, pageSize = _a.pageSize;
        this.total = total;
        this.skip = skip;
        this.pageSize = typeof pageSize === 'number' ? pageSize : this.total;
        this.cd.markForCheck();
    };
    PagerPageSizesComponent.decorators = [
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-pager-page-sizes',
                    template: "\n        <select #select\n            (change)=\"pageSizeChange(select.value)\"\n            [attr.aria-label]=\"textFor('pagerItemsPerPage')\">\n            <option *ngIf=\"showInitialPageSize\" [value]=\"pageSize\">{{pageSize}}</option>\n            <option *ngFor=\"let page of pageSizes\" [value]=\"getValue(page)\" [selected]=\"getSelectedState(page)\">\n                {{page['text']}}\n            </option>\n        </select>\n        {{ textFor('pagerItemsPerPage') }}\n    "
                },] },
    ];
    /** @nocollapse */
    PagerPageSizesComponent.ctorParameters = function () { return [
        { type: kendo_angular_l10n_1.LocalizationService },
        { type: core_1.ChangeDetectorRef },
        { type: pager_context_service_1.PagerContextService }
    ]; };
    PagerPageSizesComponent.propDecorators = {
        pageSizes: [{ type: core_1.Input }],
        classes: [{ type: core_1.HostBinding, args: ["class.k-pager-sizes",] }, { type: core_1.HostBinding, args: ["class.k-label",] }]
    };
    return PagerPageSizesComponent;
}(pager_element_component_1.PagerElementComponent));
exports.PagerPageSizesComponent = PagerPageSizesComponent;
