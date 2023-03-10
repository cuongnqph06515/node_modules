import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { YAxisCrosshairComponentGenerated } from '../y-axis-item/crosshair.component.generated';
/**
 * The crosshair configuration options
 * ([see example]({% slug api_charts_yaxiscomponent %})).
 */
export class YAxisCrosshairComponent extends YAxisCrosshairComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
        this.markAsVisible();
    }
}
YAxisCrosshairComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-y-axis-item-crosshair',
                template: ''
            },] },
];
/** @nocollapse */
YAxisCrosshairComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
