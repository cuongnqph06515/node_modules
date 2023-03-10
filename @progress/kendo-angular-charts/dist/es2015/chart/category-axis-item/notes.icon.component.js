import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { CategoryAxisNotesIconComponentGenerated } from '../category-axis-item/notes.icon.component.generated';
/**
 * The icon of the notes.
 */
export class CategoryAxisNotesIconComponent extends CategoryAxisNotesIconComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
CategoryAxisNotesIconComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-category-axis-item-notes-icon',
                template: ''
            },] },
];
/** @nocollapse */
CategoryAxisNotesIconComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
