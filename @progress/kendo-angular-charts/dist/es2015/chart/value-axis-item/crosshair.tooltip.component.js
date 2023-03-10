import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { ValueAxisCrosshairTooltipComponentGenerated } from '../value-axis-item/crosshair.tooltip.component.generated';
/**
 * The configuration options of the crosshair tooltip ([see example]({% slug crosshairs_chart_charts %})).
 * The crosshair tooltip is displayed when the `visible` option is set to `true`.
 */
export class ValueAxisCrosshairTooltipComponent extends ValueAxisCrosshairTooltipComponentGenerated {
    // Place custom properties here.
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
        this.markAsVisible();
    }
}
ValueAxisCrosshairTooltipComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-value-axis-item-crosshair-tooltip',
                template: ''
            },] },
];
/** @nocollapse */
ValueAxisCrosshairTooltipComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
