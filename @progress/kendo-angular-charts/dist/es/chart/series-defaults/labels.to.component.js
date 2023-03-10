import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { SeriesDefaultsLabelsToComponentGenerated } from '../series-defaults/labels.to.component.generated';
/**
 * The `to` label configuration of the Chart series.
 */
var SeriesDefaultsLabelsToComponent = /** @class */ (function (_super) {
    tslib_1.__extends(SeriesDefaultsLabelsToComponent, _super);
    // Place custom properties here
    function SeriesDefaultsLabelsToComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        _this.markAsVisible();
        return _this;
    }
    SeriesDefaultsLabelsToComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-series-defaults-labels-to',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    SeriesDefaultsLabelsToComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return SeriesDefaultsLabelsToComponent;
}(SeriesDefaultsLabelsToComponentGenerated));
export { SeriesDefaultsLabelsToComponent };
