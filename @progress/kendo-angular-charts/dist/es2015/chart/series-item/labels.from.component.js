import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { SeriesLabelsFromComponentGenerated } from '../series-item/labels.from.component.generated';
/**
 * The `from` label configuration of the Chart series.
 */
export class SeriesLabelsFromComponent extends SeriesLabelsFromComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
        this.markAsVisible();
    }
}
SeriesLabelsFromComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-series-item-labels-from',
                template: ''
            },] },
];
/** @nocollapse */
SeriesLabelsFromComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
