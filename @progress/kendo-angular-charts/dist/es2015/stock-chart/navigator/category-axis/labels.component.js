import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../../common/configuration.service';
import { CategoryAxisLabelsComponent } from '../../../chart/category-axis-item/labels.component';
/**
 * The configuration of the axis labels.
 */
export class NavigatorCategoryAxisLabelsComponent extends CategoryAxisLabelsComponent {
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
NavigatorCategoryAxisLabelsComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-navigator-category-axis-labels',
                template: ''
            },] },
];
/** @nocollapse */
NavigatorCategoryAxisLabelsComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
