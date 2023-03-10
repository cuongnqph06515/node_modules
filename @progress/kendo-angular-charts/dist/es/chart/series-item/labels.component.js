import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { SeriesLabelsComponentGenerated } from '../series-item/labels.component.generated';
/**
 * The configuration of the Chart series label
 * ([see example]({% slug labels_chart_charts %})).
 */
var SeriesLabelsComponent = /** @class */ (function (_super) {
    tslib_1.__extends(SeriesLabelsComponent, _super);
    // Place custom properties here
    function SeriesLabelsComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        _this.markAsVisible();
        return _this;
    }
    SeriesLabelsComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-series-item-labels',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    SeriesLabelsComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return SeriesLabelsComponent;
}(SeriesLabelsComponentGenerated));
export { SeriesLabelsComponent };
