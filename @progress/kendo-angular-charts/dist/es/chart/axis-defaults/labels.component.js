import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { AxisDefaultsLabelsComponentGenerated } from '../axis-defaults/labels.component.generated';
/**
 * The configuration of the axis labels ([see example]({% slug api_charts_axisdefaultscomponent %})).
 */
var AxisDefaultsLabelsComponent = /** @class */ (function (_super) {
    tslib_1.__extends(AxisDefaultsLabelsComponent, _super);
    // Place custom properties here
    function AxisDefaultsLabelsComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    AxisDefaultsLabelsComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-axis-defaults-labels',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    AxisDefaultsLabelsComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return AxisDefaultsLabelsComponent;
}(AxisDefaultsLabelsComponentGenerated));
export { AxisDefaultsLabelsComponent };
