import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { SeriesLabelsComponentGenerated } from '../series-item/labels.component.generated';
/**
 * The configuration of the Chart series label
 * ([see example]({% slug labels_chart_charts %})).
 */
export class SeriesLabelsComponent extends SeriesLabelsComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
        this.markAsVisible();
    }
}
SeriesLabelsComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-series-item-labels',
                template: ''
            },] },
];
/** @nocollapse */
SeriesLabelsComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
