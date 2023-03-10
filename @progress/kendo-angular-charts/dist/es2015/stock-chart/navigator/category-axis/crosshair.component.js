import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../../common/configuration.service';
import { CategoryAxisCrosshairComponent } from '../../../chart/category-axis-item/crosshair.component';
/**
 * The configuration options of the crosshair.
 */
export class NavigatorCategoryAxisCrosshairComponent extends CategoryAxisCrosshairComponent {
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
NavigatorCategoryAxisCrosshairComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-navigator-category-axis-crosshair',
                template: ''
            },] },
];
/** @nocollapse */
NavigatorCategoryAxisCrosshairComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
