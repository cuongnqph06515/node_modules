/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var pager_context_service_1 = require("./pager-context.service");
var pager_element_component_1 = require("./pager-element.component");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
/**
 * Displays buttons for navigating to the next and to the last page ([see example]({% slug paging_grid %}#toc-pager-template)).
 */
var PagerNextButtonsComponent = /** @class */ (function (_super) {
    tslib_1.__extends(PagerNextButtonsComponent, _super);
    function PagerNextButtonsComponent(localization, pagerContext, cd) {
        return _super.call(this, localization, pagerContext, cd) || this;
    }
    Object.defineProperty(PagerNextButtonsComponent.prototype, "disabled", {
        /**
         * @hidden
         *
         * @readonly
         * @type {boolean}
         * @memberOf PagerNextButtonsComponent
         */
        get: function () {
            return this.currentPage === this.totalPages || !this.total;
        },
        enumerable: true,
        configurable: true
    });
    PagerNextButtonsComponent.prototype.onChanges = function (_a) {
        var total = _a.total, skip = _a.skip, pageSize = _a.pageSize;
        this.total = total;
        this.skip = skip;
        this.pageSize = pageSize;
        this.cd.markForCheck();
    };
    PagerNextButtonsComponent.decorators = [
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-pager-next-buttons',
                    template: "\n        <a  href=\"#\"\n            tabindex=\"-1\"\n            [title]=\"textFor('pagerNextPage')\"\n            (click)=\"currentPage !== totalPages ? changePage(currentPage) : false\"\n            [ngClass]=\"{\n                'k-link': true,\n                'k-pager-nav': true,\n                'k-state-disabled': disabled,\n                '': true\n            }\">\n            <span [attr.aria-label]=\"textFor('pagerNextPage')\"\n                [ngClass]=\"{\n                    'k-icon':true,\n                    'k-i-arrow-e': true\n                }\">\n            </span>\n        </a>\n        <a  href=\"#\"\n            tabindex=\"-1\"\n            [title]=\"textFor('pagerLastPage')\"\n            (click)=\"currentPage !== totalPages ? changePage(totalPages-1) : false\"\n            [ngClass]=\"{\n                'k-link': true,\n                'k-pager-nav': true,\n                'k-state-disabled': disabled,\n                'k-pager-last': true\n            }\">\n            <span [attr.aria-label]=\"textFor('pagerLastPage')\"\n                [ngClass]=\"{\n                    'k-icon':true,\n                    'k-i-seek-e': true\n                }\">\n            </span>\n        </a>\n    "
                },] },
    ];
    /** @nocollapse */
    PagerNextButtonsComponent.ctorParameters = function () { return [
        { type: kendo_angular_l10n_1.LocalizationService },
        { type: pager_context_service_1.PagerContextService },
        { type: core_1.ChangeDetectorRef }
    ]; };
    return PagerNextButtonsComponent;
}(pager_element_component_1.PagerElementComponent));
exports.PagerNextButtonsComponent = PagerNextButtonsComponent;
