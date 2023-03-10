import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { ValueAxisNotesIconComponentGenerated } from '../value-axis-item/notes.icon.component.generated';
/**
 * The icon of the notes.
 */
export class ValueAxisNotesIconComponent extends ValueAxisNotesIconComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
ValueAxisNotesIconComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-value-axis-item-notes-icon',
                template: ''
            },] },
];
/** @nocollapse */
ValueAxisNotesIconComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
