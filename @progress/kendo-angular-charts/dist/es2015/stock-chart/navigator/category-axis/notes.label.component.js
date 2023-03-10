import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../../common/configuration.service';
import { CategoryAxisNotesLabelComponent } from '../../../chart/category-axis-item/notes.label.component';
/**
 * The label of the notes.
 */
export class NavigatorCategoryAxisNotesLabelComponent extends CategoryAxisNotesLabelComponent {
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
NavigatorCategoryAxisNotesLabelComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-navigator-category-axis-notes-label',
                template: ''
            },] },
];
/** @nocollapse */
NavigatorCategoryAxisNotesLabelComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
