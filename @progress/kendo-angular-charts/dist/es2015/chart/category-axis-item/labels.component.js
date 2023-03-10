import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { CategoryAxisLabelsComponentGenerated } from '../category-axis-item/labels.component.generated';
/**
 * The configuration of the axis labels ([see example]({% slug labels_chart_charts %})).
 */
export class CategoryAxisLabelsComponent extends CategoryAxisLabelsComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
CategoryAxisLabelsComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-category-axis-item-labels',
                template: ''
            },] },
];
/** @nocollapse */
CategoryAxisLabelsComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
