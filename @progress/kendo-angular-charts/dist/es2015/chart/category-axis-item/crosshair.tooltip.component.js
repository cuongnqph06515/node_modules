import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { CategoryAxisCrosshairTooltipComponentGenerated } from '../category-axis-item/crosshair.tooltip.component.generated';
/**
 * The options of the crosshair tooltip ([see example]({% slug crosshairs_chart_charts %})).
 * The crosshair tooltip is displayed when the `visible` option is set to `true`.
 */
export class CategoryAxisCrosshairTooltipComponent extends CategoryAxisCrosshairTooltipComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
        this.markAsVisible();
    }
}
CategoryAxisCrosshairTooltipComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-category-axis-item-crosshair-tooltip',
                template: ''
            },] },
];
/** @nocollapse */
CategoryAxisCrosshairTooltipComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
