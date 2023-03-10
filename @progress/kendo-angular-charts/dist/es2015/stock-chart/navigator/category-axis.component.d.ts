import { IntlService } from '@progress/kendo-angular-intl';
import { ConfigurationService } from '../../common/configuration.service';
import { CategoryAxisItemComponent } from '../../chart/category-axis-item.component';
/**
 * The configuration component of the navigator category axis.
 *
 * @example
 *
 * ```html-no-run
 * <kendo-stockchart>
 *   <kendo-chart-navigator>
 *     <kendo-chart-navigator-category-axis
 *       color="maroon"
 *       [labels]="{color: 'green'}">
 *     </kendo-chart-navigator-category-axis>
 *   </kendo-chart-navigator>
 * </kendo-stockchart>
 * ```
 */
export declare class NavigatorCategoryAxisComponent extends CategoryAxisItemComponent {
    protected configurationService: ConfigurationService;
    constructor(configurationService: ConfigurationService, intl: IntlService, localeId: string);
}
