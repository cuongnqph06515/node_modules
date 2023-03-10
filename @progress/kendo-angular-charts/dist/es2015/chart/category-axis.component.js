import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ConfigurationService } from '../common/configuration.service';
import { CollectionService } from '../common/collection.service';
import { CategoryAxisComponentGenerated } from './category-axis.component.generated';
/**
 * A collection of one or more category axis items.
 *
 * @example
 * ```ts
 * import { Component } from '@angular/core';
 *
 * _@Component({
 *   selector: 'my-app',
 *   template: `
 *     <kendo-chart>
 *       <kendo-chart-category-axis>
 *         <kendo-chart-category-axis-item [categories]="[2015, 2016]" color="#f00">
 *         </kendo-chart-category-axis-item>
 *       </kendo-chart-category-axis>
 *       <kendo-chart-series>
 *         <kendo-chart-series-item type="line" [data]="[1, 2, 3]">
 *         </kendo-chart-series-item>
 *       </kendo-chart-series>
 *     </kendo-chart>
 *   `
 * })
 * class AppComponent {
 * }
 * ```
 */
export class CategoryAxisComponent extends CategoryAxisComponentGenerated {
    // Place custom properties here
    constructor(configurationService, collectionService) {
        super(configurationService, collectionService);
        this.configurationService = configurationService;
        this.collectionService = collectionService;
    }
}
CategoryAxisComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [CollectionService],
                selector: 'kendo-chart-category-axis',
                template: ''
            },] },
];
/** @nocollapse */
CategoryAxisComponent.ctorParameters = () => [
    { type: ConfigurationService },
    { type: CollectionService }
];
