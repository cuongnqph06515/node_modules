import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { YAxisCrosshairComponentGenerated } from '../y-axis-item/crosshair.component.generated';
/**
 * The crosshair configuration options
 * ([see example]({% slug api_charts_yaxiscomponent %})).
 */
var YAxisCrosshairComponent = /** @class */ (function (_super) {
    tslib_1.__extends(YAxisCrosshairComponent, _super);
    // Place custom properties here
    function YAxisCrosshairComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        _this.markAsVisible();
        return _this;
    }
    YAxisCrosshairComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-y-axis-item-crosshair',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    YAxisCrosshairComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return YAxisCrosshairComponent;
}(YAxisCrosshairComponentGenerated));
export { YAxisCrosshairComponent };
