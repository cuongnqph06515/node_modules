import * as tslib_1 from "tslib";
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
var CategoryAxisComponent = /** @class */ (function (_super) {
    tslib_1.__extends(CategoryAxisComponent, _super);
    // Place custom properties here
    function CategoryAxisComponent(configurationService, collectionService) {
        var _this = _super.call(this, configurationService, collectionService) || this;
        _this.configurationService = configurationService;
        _this.collectionService = collectionService;
        return _this;
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
    CategoryAxisComponent.ctorParameters = function () { return [
        { type: ConfigurationService },
        { type: CollectionService }
    ]; };
    return CategoryAxisComponent;
}(CategoryAxisComponentGenerated));
export { CategoryAxisComponent };
