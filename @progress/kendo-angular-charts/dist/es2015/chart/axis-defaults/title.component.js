import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { AxisDefaultsTitleComponentGenerated } from '../axis-defaults/title.component.generated';
/**
 * The configuration of the axis title ([see example]({% slug api_charts_axisdefaultscomponent %})).
 */
export class AxisDefaultsTitleComponent extends AxisDefaultsTitleComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
AxisDefaultsTitleComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-axis-defaults-title',
                template: ''
            },] },
];
/** @nocollapse */
AxisDefaultsTitleComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
