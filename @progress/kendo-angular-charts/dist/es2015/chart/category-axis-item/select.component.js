import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { CategoryAxisSelectComponentGenerated } from '../category-axis-item/select.component.generated';
/**
 * The selected axis range. If set, the axis selection is enabled. The range is index-based and starts from zero.
 * Categories with indexes in the
 * ([`select.from`]({% slug api_charts_categoryaxisselectcomponent %}#toc-from)
 * &mdash;[`select.to`]({% slug api_charts_categoryaxisselectcomponent %}#toc-to)) range will be selected.
 * This means that the last category in the range will not be included in the selection.
 * If the categories are dates, the range has to be also specified with date values.
 */
export class CategoryAxisSelectComponent extends CategoryAxisSelectComponentGenerated {
    // Place custom properties here
    constructor(configurationService) {
        super(configurationService);
        this.configurationService = configurationService;
    }
}
CategoryAxisSelectComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'kendo-chart-category-axis-item-select',
                template: ''
            },] },
];
/** @nocollapse */
CategoryAxisSelectComponent.ctorParameters = () => [
    { type: ConfigurationService }
];
