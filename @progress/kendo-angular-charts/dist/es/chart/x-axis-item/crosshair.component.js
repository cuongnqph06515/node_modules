import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationService } from '../../common/configuration.service';
import { XAxisCrosshairComponentGenerated } from '../x-axis-item/crosshair.component.generated';
/**
 * The crosshair configuration options
 * ([see example]({% slug api_charts_xaxiscomponent %})).
 */
var XAxisCrosshairComponent = /** @class */ (function (_super) {
    tslib_1.__extends(XAxisCrosshairComponent, _super);
    // Place custom properties here
    function XAxisCrosshairComponent(configurationService) {
        var _this = _super.call(this, configurationService) || this;
        _this.configurationService = configurationService;
        _this.markAsVisible();
        return _this;
    }
    XAxisCrosshairComponent.decorators = [
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'kendo-chart-x-axis-item-crosshair',
                    template: ''
                },] },
    ];
    /** @nocollapse */
    XAxisCrosshairComponent.ctorParameters = function () { return [
        { type: ConfigurationService }
    ]; };
    return XAxisCrosshairComponent;
}(XAxisCrosshairComponentGenerated));
export { XAxisCrosshairComponent };
