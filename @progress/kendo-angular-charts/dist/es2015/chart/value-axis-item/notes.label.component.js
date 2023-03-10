import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { ValueAxisNotesLabelComponentGenerated } from '../value-axis-item/notes.label.component.generated';
/**
 * The label of the notes.
 */
export class ValueAxisNotesLabelComponent extends ValueAxisNotesLabelComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
ValueAxisNotesLabelComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-value-axis-item-notes-label',
                template: ''
            },] },
];
/** @nocollapse */
ValueAxisNotesLabelComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
