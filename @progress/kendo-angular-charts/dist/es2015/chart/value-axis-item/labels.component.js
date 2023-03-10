import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { ValueAxisLabelsComponentGenerated } from '../value-axis-item/labels.component.generated';
/**
 * The axis labels configuration.
 */
export class ValueAxisLabelsComponent extends ValueAxisLabelsComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
ValueAxisLabelsComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-value-axis-item-labels',
                template: ''
            },] },
];
/** @nocollapse */
ValueAxisLabelsComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
