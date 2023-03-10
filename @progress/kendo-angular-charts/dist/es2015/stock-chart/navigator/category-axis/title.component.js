import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../../common/configuration.service';
import { CategoryAxisTitleComponent } from '../../../chart/category-axis-item/title.component';
/**
 * The title configuration of the navigator category axis.
 */
export class NavigatorCategoryAxisTitleComponent extends CategoryAxisTitleComponent {
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
NavigatorCategoryAxisTitleComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-navigator-category-axis-title',
                template: ''
            },] },
];
/** @nocollapse */
NavigatorCategoryAxisTitleComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
