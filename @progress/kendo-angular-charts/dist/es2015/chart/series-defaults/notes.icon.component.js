import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { SeriesDefaultsNotesIconComponentGenerated } from '../series-defaults/notes.icon.component.generated';
/**
 * The icon of the notes.
 */
export class SeriesDefaultsNotesIconComponent extends SeriesDefaultsNotesIconComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
SeriesDefaultsNotesIconComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-series-defaults-notes-icon',
                template: ''
            },] },
];
/** @nocollapse */
SeriesDefaultsNotesIconComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
