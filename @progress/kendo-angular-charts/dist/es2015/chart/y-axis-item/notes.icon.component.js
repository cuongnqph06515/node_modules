import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { YAxisNotesIconComponentGenerated } from '../y-axis-item/notes.icon.component.generated';
/**
 * The icon of the notes.
 */
export class YAxisNotesIconComponent extends YAxisNotesIconComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
YAxisNotesIconComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-y-axis-item-notes-icon',
                template: ''
            },] },
];
/** @nocollapse */
YAxisNotesIconComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
