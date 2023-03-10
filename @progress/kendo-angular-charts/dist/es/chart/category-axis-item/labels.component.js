import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { CategoryAxisLabelsComponentGenerated } from '../category-axis-item/labels.component.generated';
/**
 * The configuration of the axis labels ([see example]({% slug labels_chart_charts %})).
 */
var CategoryAxisLabelsComponent = /** @class */ (function (_super) {
    tslib_1.__extends(CategoryAxisLabelsComponent, _super);
    // Place custom properties here
    function CategoryAxisLabelsComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    CategoryAxisLabelsComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-category-axis-item-labels',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    CategoryAxisLabelsComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return CategoryAxisLabelsComponent;
}(CategoryAxisLabelsComponentGenerated));
export { CategoryAxisLabelsComponent };
