import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { ValueAxisCrosshairComponentGenerated } from '../value-axis-item/crosshair.component.generated';
/**
 * The crosshair configuration options ([see example]({% slug crosshairs_chart_charts %})).
 */
export class ValueAxisCrosshairComponent extends ValueAxisCrosshairComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
        this.markAsVisible();
    }
}
ValueAxisCrosshairComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-value-axis-item-crosshair',
                template: ''
            },] },
];
/** @nocollapse */
ValueAxisCrosshairComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
