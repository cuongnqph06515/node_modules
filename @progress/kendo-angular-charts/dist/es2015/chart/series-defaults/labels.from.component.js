import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { SeriesDefaultsLabelsFromComponentGenerated } from '../series-defaults/labels.from.component.generated';
/**
 * The `from` label configuration of the Chart series.
 */
export class SeriesDefaultsLabelsFromComponent extends SeriesDefaultsLabelsFromComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
        this.markAsVisible();
    }
}
SeriesDefaultsLabelsFromComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-series-defaults-labels-from',
                template: ''
            },] },
];
/** @nocollapse */
SeriesDefaultsLabelsFromComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
