import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { CategoryAxisNotesLabelComponentGenerated } from '../category-axis-item/notes.label.component.generated';
/**
 * The label of the notes.
 */
export class CategoryAxisNotesLabelComponent extends CategoryAxisNotesLabelComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
CategoryAxisNotesLabelComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-category-axis-item-notes-label',
                template: ''
            },] },
];
/** @nocollapse */
CategoryAxisNotesLabelComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
