import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../../common/configuration.service';
import { CategoryAxisCrosshairTooltipComponent } from '../../../chart/category-axis-item/crosshair.tooltip.component';
/**
 * The configuration options of the crosshair tooltip.
 * The crosshair tooltip is displayed when the `visible` option is set to `true`.
 */
export class NavigatorCategoryAxisCrosshairTooltipComponent extends CategoryAxisCrosshairTooltipComponent {
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
NavigatorCategoryAxisCrosshairTooltipComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-navigator-category-axis-crosshair-tooltip',
                template: ''
            },] },
];
/** @nocollapse */
NavigatorCategoryAxisCrosshairTooltipComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
