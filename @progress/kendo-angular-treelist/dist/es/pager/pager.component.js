/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { Component, Input, EventEmitter, Output, HostBinding } from '@angular/core';
import { normalize } from './pager-settings';
import { PagerTemplateDirective } from "./pager-template.directive";
import { anyChanged } from "../utils";
import { PagerContextService } from "./pager-context.service";
/**
 * @hidden
 */
var PagerComponent = /** @class */ (function () {
    function PagerComponent(pagerContext) {
        this.pagerContext = pagerContext;
        this.allCount = 0;
        this.total = 0;
        this.skip = 1;
        this.pageChange = new EventEmitter();
        this.settings = normalize({});
        this._templateContext = {};
    }
    Object.defineProperty(PagerComponent.prototype, "options", {
        set: function (value) {
            this.settings = normalize(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PagerComponent.prototype, "pagerWrapClass", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PagerComponent.prototype, "treelistPagerClass", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PagerComponent.prototype, "widgetClass", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PagerComponent.prototype, "totalPages", {
        get: function () {
            return Math.ceil((this.total || 0) / this.pageSize);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PagerComponent.prototype, "currentPage", {
        get: function () {
            return Math.floor((this.skip || 0) / this.pageSize) + 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PagerComponent.prototype, "templateContext", {
        get: function () {
            var context = this._templateContext;
            context.totalPages = this.totalPages;
            context.total = this.total;
            context.allCount = this.allCount || this.total;
            context.skip = this.skip;
            context.pageSize = this.pageSize;
            context.currentPage = this.currentPage;
            return context;
        },
        enumerable: true,
        configurable: true
    });
    PagerComponent.prototype.ngOnInit = function () {
        this.pageChangeSubscription = this.pagerContext.pageChange.subscribe(this.changePage.bind(this));
    };
    PagerComponent.prototype.ngOnChanges = function (changes) {
        if (anyChanged(["pageSize", "skip", "total", "allCount"], changes, false)) {
            this.pagerContext.notifyChanges({
                pageSize: this.pageSize,
                skip: this.skip,
                total: this.total,
                allCount: this.allCount || this.total
            });
        }
    };
    PagerComponent.prototype.ngOnDestroy = function () {
        if (this.pageChangeSubscription) {
            this.pageChangeSubscription.unsubscribe();
        }
    };
    PagerComponent.prototype.changePage = function (event) {
        this.pageChange.emit(event);
    };
    PagerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-pager',
                    template: "\n        <ng-container\n            *ngIf=\"template?.templateRef\"\n            [ngTemplateOutlet]=\"template.templateRef\"\n            [ngTemplateOutletContext]=\"templateContext\">\n        </ng-container>\n        <ng-container *ngIf=\"!template?.templateRef\">\n            <kendo-pager-prev-buttons *ngIf=\"settings.previousNext\"></kendo-pager-prev-buttons>\n            <kendo-pager-numeric-buttons\n                *ngIf=\"settings.type === 'numeric'\"\n                [buttonCount]=\"settings.buttonCount\">\n            </kendo-pager-numeric-buttons>\n            <kendo-pager-input *ngIf=\"settings.type === 'input'\"></kendo-pager-input>\n            <kendo-pager-next-buttons *ngIf=\"settings.previousNext\"></kendo-pager-next-buttons>\n            <kendo-pager-info *ngIf='settings.info'></kendo-pager-info>\n            <kendo-pager-page-sizes *ngIf=\"settings.pageSizes\" [pageSizes]=\"settings.pageSizes\"></kendo-pager-page-sizes>\n        </ng-container>\n  "
                },] },
    ];
    /** @nocollapse */
    PagerComponent.ctorParameters = function () { return [
        { type: PagerContextService }
    ]; };
    PagerComponent.propDecorators = {
        allCount: [{ type: Input }],
        total: [{ type: Input }],
        skip: [{ type: Input }],
        pageSize: [{ type: Input }],
        options: [{ type: Input }],
        template: [{ type: Input }],
        pageChange: [{ type: Output }],
        pagerWrapClass: [{ type: HostBinding, args: ['class.k-pager-wrap',] }],
        treelistPagerClass: [{ type: HostBinding, args: ['class.k-grid-pager',] }],
        widgetClass: [{ type: HostBinding, args: ['class.k-widget',] }]
    };
    return PagerComponent;
}());
export { PagerComponent };
