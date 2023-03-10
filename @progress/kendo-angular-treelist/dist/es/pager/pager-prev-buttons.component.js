/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import * as tslib_1 from "tslib";
// tslint:disable:no-access-missing-member
import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { PagerContextService } from "./pager-context.service";
import { PagerElementComponent } from './pager-element.component';
import { LocalizationService } from '@progress/kendo-angular-l10n';
/**
 * Displays buttons for navigating to the first and to the previous page ([see example]({% slug paging_treelist %}#toc-pager-templates)).
 */
var PagerPrevButtonsComponent = /** @class */ (function (_super) {
    tslib_1.__extends(PagerPrevButtonsComponent, _super);
    function PagerPrevButtonsComponent(localization, pagerContext, cd) {
        return _super.call(this, localization, pagerContext, cd) || this;
    }
    Object.defineProperty(PagerPrevButtonsComponent.prototype, "disabled", {
        /**
         * @hidden
         *
         * @readonly
         * @type {boolean}
         * @memberOf PagerPrevButtonsComponent
         */
        get: function () {
            return this.currentPage === 1 || !this.total;
        },
        enumerable: true,
        configurable: true
    });
    PagerPrevButtonsComponent.prototype.onChanges = function (_a) {
        var total = _a.total, skip = _a.skip, pageSize = _a.pageSize;
        this.total = total;
        this.skip = skip;
        this.pageSize = pageSize;
        this.cd.markForCheck();
    };
    PagerPrevButtonsComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-pager-prev-buttons',
                    template: "\n        <a  href=\"#\"\n            tabindex=\"-1\"\n            [title]=\"textFor('pagerFirstPage')\"\n            (click)=\"currentPage !== 1 ? changePage(0) : false\"\n            [ngClass]=\"{\n                'k-link': true,\n                'k-pager-nav': true,\n                'k-state-disabled': disabled,\n                'k-pager-first': true\n            }\">\n            <span [attr.aria-label]=\"textFor('pagerFirstPage')\"\n                [ngClass]=\"{\n                    'k-icon':true,\n                    'k-i-seek-w': true\n                }\">\n            </span>\n        </a>\n        <a  href=\"#\"\n            tabindex=\"-1\"\n            [title]=\"textFor('pagerPreviousPage')\"\n            (click)=\"currentPage !== 1 ? changePage(currentPage-2) : false\"\n            [ngClass]=\"{\n                'k-link': true,\n                'k-pager-nav': true,\n                'k-state-disabled': disabled,\n                '': true\n            }\">\n            <span [attr.aria-label]=\"textFor('pagerPreviousPage')\"\n                [ngClass]=\"{\n                    'k-icon':true,\n                    'k-i-arrow-w': true\n                }\">\n            </span>\n        </a>\n    "
                },] },
    ];
    /** @nocollapse */
    PagerPrevButtonsComponent.ctorParameters = function () { return [
        { type: LocalizationService },
        { type: PagerContextService },
        { type: ChangeDetectorRef }
    ]; };
    return PagerPrevButtonsComponent;
}(PagerElementComponent));
export { PagerPrevButtonsComponent };
