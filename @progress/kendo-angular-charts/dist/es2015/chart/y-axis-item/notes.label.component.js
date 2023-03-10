import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { YAxisNotesLabelComponentGenerated } from '../y-axis-item/notes.label.component.generated';
/**
 * The label of the notes.
 */
export class YAxisNotesLabelComponent extends YAxisNotesLabelComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
YAxisNotesLabelComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-y-axis-item-notes-label',
                template: ''
            },] },
];
/** @nocollapse */
YAxisNotesLabelComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
