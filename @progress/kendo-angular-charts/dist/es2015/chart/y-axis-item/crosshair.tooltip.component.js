import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { YAxisCrosshairTooltipComponentGenerated } from '../y-axis-item/crosshair.tooltip.component.generated';
/**
 * The configuration options of the crosshair tooltip.
 * The crosshair tooltip is displayed when the `visible` option is set to `true`.
 */
export class YAxisCrosshairTooltipComponent extends YAxisCrosshairTooltipComponentGenerated {
    // Place custom properties here.
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
        this.markAsVisible();
    }
}
YAxisCrosshairTooltipComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-y-axis-item-crosshair-tooltip',
                template: ''
            },] },
];
/** @nocollapse */
YAxisCrosshairTooltipComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
