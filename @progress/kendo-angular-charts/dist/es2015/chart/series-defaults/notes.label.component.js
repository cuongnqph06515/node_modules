import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { SeriesDefaultsNotesLabelComponentGenerated } from '../series-defaults/notes.label.component.generated';
/**
 * The label of the notes.
 */
export class SeriesDefaultsNotesLabelComponent extends SeriesDefaultsNotesLabelComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
SeriesDefaultsNotesLabelComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-series-defaults-notes-label',
                template: ''
            },] },
];
/** @nocollapse */
SeriesDefaultsNotesLabelComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
