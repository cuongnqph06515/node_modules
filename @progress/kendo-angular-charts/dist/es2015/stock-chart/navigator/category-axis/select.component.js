import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../../common/configuration.service';
import { CategoryAxisSelectComponent } from '../../../chart/category-axis-item/select.component';
/**
 * The selected axis range. If set, the axis selection is enabled. The range is index-based and starts from zero.
 * Categories with indexes in the range (`select.from`, `select.to`) will be selected.
 * This means that the last category in the range will not be included in the selection.
 * If the categories are dates, the range has also to be specified with date values.
 */
export class NavigatorCategoryAxisSelectComponent extends CategoryAxisSelectComponent {
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
NavigatorCategoryAxisSelectComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-navigator-category-axis-select',
                template: ''
            },] },
];
/** @nocollapse */
NavigatorCategoryAxisSelectComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
