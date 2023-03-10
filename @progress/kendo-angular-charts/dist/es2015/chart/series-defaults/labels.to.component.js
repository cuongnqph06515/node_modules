import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { SeriesDefaultsLabelsToComponentGenerated } from '../series-defaults/labels.to.component.generated';
/**
 * The `to` label configuration of the Chart series.
 */
export class SeriesDefaultsLabelsToComponent extends SeriesDefaultsLabelsToComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
        this.markAsVisible();
    }
}
SeriesDefaultsLabelsToComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-series-defaults-labels-to',
                template: ''
            },] },
];
/** @nocollapse */
SeriesDefaultsLabelsToComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
