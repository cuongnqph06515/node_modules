import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { SeriesHighlightComponentGenerated } from '../series-item/highlight.component.generated';
/**
 * The Chart series highlighting configuration options.
 */
export class SeriesHighlightComponent extends SeriesHighlightComponentGenerated {
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
SeriesHighlightComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-series-item-highlight',
                template: ''
            },] },
];
/** @nocollapse */
SeriesHighlightComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
