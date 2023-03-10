import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { AxisDefaultsTitleComponentGenerated } from '../axis-defaults/title.component.generated';
/**
 * The configuration of the axis title ([see example]({% slug api_charts_axisdefaultscomponent %})).
 */
var AxisDefaultsTitleComponent = /** @class */ (function (_super) {
    tslib_1.__extends(AxisDefaultsTitleComponent, _super);
    // Place custom properties here
    function AxisDefaultsTitleComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    AxisDefaultsTitleComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-axis-defaults-title',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    AxisDefaultsTitleComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return AxisDefaultsTitleComponent;
}(AxisDefaultsTitleComponentGenerated));
export { AxisDefaultsTitleComponent };
