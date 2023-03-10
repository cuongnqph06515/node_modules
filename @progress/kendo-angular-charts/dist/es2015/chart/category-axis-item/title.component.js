import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { CategoryAxisTitleComponentGenerated } from '../category-axis-item/title.component.generated';
/**
 * The configuration of the category axis title.
 */
export class CategoryAxisTitleComponent extends CategoryAxisTitleComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
CategoryAxisTitleComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-category-axis-item-title',
                template: ''
            },] },
];
/** @nocollapse */
CategoryAxisTitleComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
