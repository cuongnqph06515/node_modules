import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { SeriesNotesIconComponentGenerated } from '../series-item/notes.icon.component.generated';
/**
 * The icon of the notes.
 */
export class SeriesNotesIconComponent extends SeriesNotesIconComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
SeriesNotesIconComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-series-item-notes-icon',
                template: ''
            },] },
];
/** @nocollapse */
SeriesNotesIconComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
