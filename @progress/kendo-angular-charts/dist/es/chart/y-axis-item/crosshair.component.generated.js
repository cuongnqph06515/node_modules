import * as tslib_1 from "tslib";
import { Input } from '@angular/core';
import { SettingsComponent } from '../../common/settings.component';
/**
 * @hidden
 */
var YAxisCrosshairComponentGenerated = /** @class */ (function (_super) {
    tslib_1.__extends(YAxisCrosshairComponentGenerated, _super);
    function YAxisCrosshairComponentGenerated(configurationService) {
        var _this = _super.call(this, 'crosshair', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    YAxisCrosshairComponentGenerated.propDecorators = {
        color: [{ type: Input }],
        opacity: [{ type: Input }],
        visible: [{ type: Input }],
        width: [{ type: Input }],
        tooltip: [{ type: Input }]
    };
    return YAxisCrosshairComponentGenerated;
}(SettingsComponent));
export { YAxisCrosshairComponentGenerated };
