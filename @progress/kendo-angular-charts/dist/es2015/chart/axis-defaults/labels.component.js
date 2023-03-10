import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { AxisDefaultsLabelsComponentGenerated } from '../axis-defaults/labels.component.generated';
/**
 * The configuration of the axis labels ([see example]({% slug api_charts_axisdefaultscomponent %})).
 */
export class AxisDefaultsLabelsComponent extends AxisDefaultsLabelsComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
AxisDefaultsLabelsComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-axis-defaults-labels',
                template: ''
            },] },
];
/** @nocollapse */
AxisDefaultsLabelsComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
