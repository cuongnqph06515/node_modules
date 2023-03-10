import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { SeriesLabelsToComponentGenerated } from '../series-item/labels.to.component.generated';
/**
 * The `to` label configuration of the Chart series.
 */
var SeriesLabelsToComponent = /** @class */ (function (_super) {
    tslib_1.__extends(SeriesLabelsToComponent, _super);
    // Place custom properties here
    function SeriesLabelsToComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        _this.markAsVisible();
        return _this;
    }
    SeriesLabelsToComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-series-item-labels-to',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    SeriesLabelsToComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return SeriesLabelsToComponent;
}(SeriesLabelsToComponentGenerated));
export { SeriesLabelsToComponent };
