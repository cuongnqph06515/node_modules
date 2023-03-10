import * as tslib_1 from "tslib";
import { Input } from '@angular/core';
import { SettingsComponent } from '../../common/settings.component';
/**
 * @hidden
 */
var AxisDefaultsCrosshairComponentGenerated = /** @class */ (function (_super) {
    tslib_1.__extends(AxisDefaultsCrosshairComponentGenerated, _super);
    function AxisDefaultsCrosshairComponentGenerated(configurationService) {
        var _this = _super.call(this, 'axisDefaults.crosshair', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    AxisDefaultsCrosshairComponentGenerated.propDecorators = {
        color: [{ type: Input }],
        dashType: [{ type: Input }],
        opacity: [{ type: Input }],
        visible: [{ type: Input }],
        width: [{ type: Input }],
        tooltip: [{ type: Input }]
    };
    return AxisDefaultsCrosshairComponentGenerated;
}(SettingsComponent));
export { AxisDefaultsCrosshairComponentGenerated };
