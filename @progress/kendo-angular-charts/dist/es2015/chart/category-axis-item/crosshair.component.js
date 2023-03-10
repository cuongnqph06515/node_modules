import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { CategoryAxisCrosshairComponentGenerated } from '../category-axis-item/crosshair.component.generated';
/**
 * The crosshair configuration options ([see example]({% slug crosshairs_chart_charts %})).
 */
export class CategoryAxisCrosshairComponent extends CategoryAxisCrosshairComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
        this.markAsVisible();
    }
}
CategoryAxisCrosshairComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-category-axis-item-crosshair',
                template: ''
            },] },
];
/** @nocollapse */
CategoryAxisCrosshairComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
