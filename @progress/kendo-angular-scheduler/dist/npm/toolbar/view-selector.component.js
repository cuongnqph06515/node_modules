"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var toolbar_service_1 = require("./toolbar.service");
/**
 * A toolbar component which contains the controls for switching the views
 * ([see example]({% slug toolbar_scheduler %}#toc-including-the-built-in-components)).
 *
 * To render the view-selection buttons, include the component in the
 * [toolbar template]({% slug api_scheduler_toolbartemplatedirective %}).
 *
 * {% meta height:700 %}
 * {% embed_file toolbar/template/app.component.ts preview %}
 * {% embed_file toolbar/template/my-navigation.component.ts %}
 * {% embed_file toolbar/template/app.module.ts %}
 * {% embed_file shared/events-utc.ts %}
 * {% embed_file shared/main.ts %}
 * {% endmeta %}
 */
var ToolbarViewSelectorComponent = /** @class */ (function () {
    function ToolbarViewSelectorComponent(service) {
        this.service = service;
        /**
         * @hidden
         */
        this.hostClasses = true;
        /**
         * @hidden
         */
        this.expanded = false;
    }
    Object.defineProperty(ToolbarViewSelectorComponent.prototype, "ctx", {
        /**
         * @hidden
         */
        get: function () {
            return this.service.context;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToolbarViewSelectorComponent.prototype, "itemDisplay", {
        /**
         * @hidden
         */
        get: function () {
            if (this.ctx.views && this.ctx.views.length === 1) {
                return 'list-item';
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    ToolbarViewSelectorComponent.prototype.onClick = function (view) {
        if (this.ctx.selectedView !== view) {
            this.service.navigate({
                type: 'view-change',
                view: view
            });
        }
        this.expanded = false;
        return false;
    };
    /**
     * @hidden
     */
    ToolbarViewSelectorComponent.prototype.onCurrentViewClick = function (e) {
        this.expanded = !this.expanded;
        return false;
    };
    /**
     * @hidden
     */
    ToolbarViewSelectorComponent.prototype.isSelected = function (view) {
        return this.ctx.selectedView === view;
    };
    ToolbarViewSelectorComponent.decorators = [
        { type: core_1.Component, args: [{
                    // tslint:disable-next-line:component-selector
                    selector: '[kendoSchedulerToolbarViewSelector]',
                    template: "\n        <li class=\"k-current-view\" *ngIf=\"ctx.views?.length > 1\">\n            <a role=\"button\" href=\"#\" class=\"k-link\" tabindex=\"-1\" (click)=\"onCurrentViewClick($event)\">\n                {{ ctx.selectedView?.title }}\n            </a>\n        </li>\n        <li *ngFor=\"let view of ctx.views\"\n            [class.k-state-selected]=\"isSelected(view)\" [ngStyle]=\"{ display: itemDisplay }\"\n         >\n            <a role=\"button\" href=\"#\" class=\"k-link\" tabindex=\"-1\" (click)=\"onClick(view)\">\n                {{ view.title }}\n            </a>\n        </li>\n    "
                },] },
    ];
    /** @nocollapse */
    ToolbarViewSelectorComponent.ctorParameters = function () { return [
        { type: toolbar_service_1.ToolbarService }
    ]; };
    ToolbarViewSelectorComponent.propDecorators = {
        hostClasses: [{ type: core_1.HostBinding, args: ['class.k-scheduler-views',] }, { type: core_1.HostBinding, args: ['class.k-reset',] }],
        expanded: [{ type: core_1.HostBinding, args: ['class.k-state-expanded',] }]
    };
    return ToolbarViewSelectorComponent;
}());
exports.ToolbarViewSelectorComponent = ToolbarViewSelectorComponent;
