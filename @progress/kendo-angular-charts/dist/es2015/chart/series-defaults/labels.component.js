import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { SeriesDefaultsLabelsComponentGenerated } from '../series-defaults/labels.component.generated';
/**
 * The configuration of the Chart series label.
 */
export class SeriesDefaultsLabelsComponent extends SeriesDefaultsLabelsComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
        this.markAsVisible();
    }
}
SeriesDefaultsLabelsComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-series-defaults-labels',
                template: ''
            },] },
];
/** @nocollapse */
SeriesDefaultsLabelsComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
