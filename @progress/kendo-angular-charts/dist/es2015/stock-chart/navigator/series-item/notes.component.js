import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../../common/configuration.service';
import { SeriesNotesComponent } from '../../../chart/series-item/notes.component';
/**
 * The notes configuration of the StockChart navigator series.
 */
export class NavigatorSeriesNotesComponent extends SeriesNotesComponent {
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
NavigatorSeriesNotesComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-navigator-series-item-notes',
                template: ''
            },] },
];
/** @nocollapse */
NavigatorSeriesNotesComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
