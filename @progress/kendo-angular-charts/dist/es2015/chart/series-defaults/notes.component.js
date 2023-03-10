import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { SeriesDefaultsNotesComponentGenerated } from '../series-defaults/notes.component.generated';
/**
 * The configuration of the [`seriesDefaults`]({% slug api_charts_seriesdefaultscomponent %}) notes.
 */
export class SeriesDefaultsNotesComponent extends SeriesDefaultsNotesComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
SeriesDefaultsNotesComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-series-defaults-notes',
                template: ''
            },] },
];
/** @nocollapse */
SeriesDefaultsNotesComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
