import * as tslib_1 from "tslib";
import { Input } from '@angular/core';
import { SettingsComponent } from '../../common/settings.component';
/**
 * @hidden
 */
var YAxisCrosshairTooltipComponentGenerated = /** @class */ (function (_super) {
    tslib_1.__extends(YAxisCrosshairTooltipComponentGenerated, _super);
    function YAxisCrosshairTooltipComponentGenerated(configurationService) {
        var _this = _super.call(this, 'crosshair.tooltip', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    YAxisCrosshairTooltipComponentGenerated.propDecorators = {
        background: [{ type: Input }],
        border: [{ type: Input }],
        color: [{ type: Input }],
        font: [{ type: Input }],
        format: [{ type: Input }],
        padding: [{ type: Input }],
        visible: [{ type: Input }]
    };
    return YAxisCrosshairTooltipComponentGenerated;
}(SettingsComponent));
export { YAxisCrosshairTooltipComponentGenerated };
