import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../../common/configuration.service';
import { CategoryAxisNotesComponent } from '../../../chart/category-axis-item/notes.component';
/**
 * The configuration of the category axis notes.
 */
export class NavigatorCategoryAxisNotesComponent extends CategoryAxisNotesComponent {
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
NavigatorCategoryAxisNotesComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-navigator-category-axis-notes',
                template: ''
            },] },
];
/** @nocollapse */
NavigatorCategoryAxisNotesComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
