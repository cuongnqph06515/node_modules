import { Component, ChangeDetectionStrategy, HostBinding, Input } from '@angular/core';
import { LocalizationService } from '@progress/kendo-angular-l10n';
/**
 * @hidden
 */
export class AgendaHeaderComponent {
    constructor(localization) {
        this.localization = localization;
        this.classes = true;
    }
    get dateMessage() {
        return this.localization.get('dateHeader');
    }
    get timeMessage() {
        return this.localization.get('timeHeader');
    }
    get eventMessage() {
        return this.localization.get('eventHeader');
    }
}
AgendaHeaderComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                // tslint:disable-next-line:component-selector
                selector: '[kendoSchedulerAgendaHeader]',
                template: `
        <div class="k-scheduler-header-wrap">
            <table class="k-scheduler-table" role="presentation">
                <tbody>
                    <tr>
                        <th *ngFor="let resource of resources" class="k-scheduler-groupcolumn"></th>
                        <th class="k-scheduler-datecolumn">{{ dateMessage }}</th>
                        <th class="k-scheduler-timecolumn">{{ timeMessage }}</th>
                        <th>{{ eventMessage }}</th>
                    </tr>
                </tbody>
            </table>
        </div>
    `
            },] },
];
/** @nocollapse */
AgendaHeaderComponent.ctorParameters = () => [
    { type: LocalizationService }
];
AgendaHeaderComponent.propDecorators = {
    classes: [{ type: HostBinding, args: ["class.k-scheduler-header",] }, { type: HostBinding, args: ["class.k-state-default",] }],
    resources: [{ type: Input }]
};
