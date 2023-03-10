import * as tslib_1 from "tslib";
import { Input } from '@angular/core';
import { SettingsComponent } from '../../common/settings.component';
/**
 * @hidden
 */
var AxisDefaultsCrosshairTooltipComponentGenerated = /** @class */ (function (_super) {
    tslib_1.__extends(AxisDefaultsCrosshairTooltipComponentGenerated, _super);
    function AxisDefaultsCrosshairTooltipComponentGenerated(configurationService) {
        var _this = _super.call(this, 'axisDefaults.crosshair.tooltip', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    AxisDefaultsCrosshairTooltipComponentGenerated.propDecorators = {
        background: [{ type: Input }],
        border: [{ type: Input }],
        color: [{ type: Input }],
        font: [{ type: Input }],
        format: [{ type: Input }],
        padding: [{ type: Input }],
        visible: [{ type: Input }]
    };
    return AxisDefaultsCrosshairTooltipComponentGenerated;
}(SettingsComponent));
export { AxisDefaultsCrosshairTooltipComponentGenerated };
