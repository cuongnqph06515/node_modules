import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { SeriesLabelsToComponentGenerated } from '../series-item/labels.to.component.generated';
/**
 * The `to` label configuration of the Chart series.
 */
export class SeriesLabelsToComponent extends SeriesLabelsToComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
        this.markAsVisible();
    }
}
SeriesLabelsToComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-series-item-labels-to',
                template: ''
            },] },
];
/** @nocollapse */
SeriesLabelsToComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
