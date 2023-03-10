import { Component, ChangeDetectionStrategy, HostBinding, Input } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
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
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    // tslint:disable-next-line:component-selector
                    selector: '[kendoSchedulerAgendaHeader]',
                    template: "\n        <div class=\"k-scheduler-header-wrap\">\n            <table class=\"k-scheduler-table\" role=\"presentation\">\n                <tbody>\n                    <tr>\n                        <th *ngFor=\"let resource of resources\" class=\"k-scheduler-groupcolumn\"></th>\n                        <th class=\"k-scheduler-datecolumn\">{{ dateMessage }}</th>\n                        <th class=\"k-scheduler-timecolumn\">{{ timeMessage }}</th>\n                        <th>{{ eventMessage }}</th>\n                    </tr>\n                </tbody>\n            </table>\n        </div>\n    "
                },] },
    ];
    /** @nocollapse */
    AgendaHeaderComponent.ctorParameters = function () { return [
        { type: LocalizationService }
    ]; };
    AgendaHeaderComponent.propDecorators = {
        classes: [{ type: HostBinding, args: ["class.k-scheduler-header",] }, { type: HostBinding, args: ["class.k-state-default",] }],
        resources: [{ type: Input }]
    };
    return AgendaHeaderComponent;
}());
export { AgendaHeaderComponent };
