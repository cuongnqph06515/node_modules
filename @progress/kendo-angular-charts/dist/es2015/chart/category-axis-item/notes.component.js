import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { CategoryAxisNotesComponentGenerated } from '../category-axis-item/notes.component.generated';
/**
 * The configuration of the category axis notes ([see example]({% slug notes_chart_charts %}#toc-axis-notes)).
 */
export class CategoryAxisNotesComponent extends CategoryAxisNotesComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
CategoryAxisNotesComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-category-axis-item-notes',
                template: ''
            },] },
];
/** @nocollapse */
CategoryAxisNotesComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
