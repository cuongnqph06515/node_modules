import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { SeriesNotesComponentGenerated } from '../series-item/notes.component.generated';
/**
 * The series notes configuration
 * ([see example]({% slug notes_chart_charts %})).
 */
export class SeriesNotesComponent extends SeriesNotesComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
SeriesNotesComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-series-item-notes',
                template: ''
            },] },
];
/** @nocollapse */
SeriesNotesComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
