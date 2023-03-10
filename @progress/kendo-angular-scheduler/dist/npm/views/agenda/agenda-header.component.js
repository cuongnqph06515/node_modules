"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var kendo_angular_l10n_1 = require("@progress/kendo-angular-l10n");
/**
 * @hidden
 */
var AgendaHeaderComponent = /** @class */ (function () {
    function AgendaHeaderComponent(localization) {
        this.localization = localization;
        this.classes = true;
    }
    Object.defineProperty(AgendaHeaderComponent.prototype, "dateMessage", {
        get: function () {
            return this.localization.get('dateHeader');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AgendaHeaderComponent.prototype, "timeMessage", {
        get: function () {
            return this.localization.get('timeHeader');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AgendaHeaderComponent.prototype, "eventMessage", {
        get: function () {
            return this.localization.get('eventHeader');
        },
        enumerable: true,
        configurable: true
    });
    AgendaHeaderComponent.decorators = [
        { type: core_1.Component, args: [{
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    // tslint:disable-next-line:component-selector
                    selector: '[kendoSchedulerAgendaHeader]',
                    template: "\n        <div class=\"k-scheduler-header-wrap\">\n            <table class=\"k-scheduler-table\" role=\"presentation\">\n                <tbody>\n                    <tr>\n                        <th *ngFor=\"let resource of resources\" class=\"k-scheduler-groupcolumn\"></th>\n                        <th class=\"k-scheduler-datecolumn\">{{ dateMessage }}</th>\n                        <th class=\"k-scheduler-timecolumn\">{{ timeMessage }}</th>\n                        <th>{{ eventMessage }}</th>\n                    </tr>\n                </tbody>\n            </table>\n        </div>\n    "
                },] },
    ];
    /** @nocollapse */
    AgendaHeaderComponent.ctorParameters = function () { return [
        { type: kendo_angular_l10n_1.LocalizationService }
    ]; };
    AgendaHeaderComponent.propDecorators = {
        classes: [{ type: core_1.HostBinding, args: ["class.k-scheduler-header",] }, { type: core_1.HostBinding, args: ["class.k-state-default",] }],
        resources: [{ type: core_1.Input }]
    };
    return AgendaHeaderComponent;
}());
exports.AgendaHeaderComponent = AgendaHeaderComponent;
