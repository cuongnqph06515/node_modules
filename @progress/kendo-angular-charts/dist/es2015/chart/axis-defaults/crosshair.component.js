import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { AxisDefaultsCrosshairComponentGenerated } from '../axis-defaults/crosshair.component.generated';
/**
 * The crosshair configuration options ([see example]({% slug api_charts_axisdefaultscomponent %})).
 */
export class AxisDefaultsCrosshairComponent extends AxisDefaultsCrosshairComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
        this.markAsVisible();
    }
}
AxisDefaultsCrosshairComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-axis-defaults-crosshair',
                template: ''
            },] },
];
/** @nocollapse */
AxisDefaultsCrosshairComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
