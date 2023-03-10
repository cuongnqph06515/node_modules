import * as tslib_1 from "tslib";
import { Input } from '@angular/core';
import { SettingsComponent } from '../../common/settings.component';
/**
 * @hidden
 */
var ValueAxisCrosshairComponentGenerated = /** @class */ (function (_super) {
    tslib_1.__extends(ValueAxisCrosshairComponentGenerated, _super);
    function ValueAxisCrosshairComponentGenerated(configurationService) {
        var _this = _super.call(this, 'crosshair', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    ValueAxisCrosshairComponentGenerated.propDecorators = {
        color: [{ type: Input }],
        opacity: [{ type: Input }],
        visible: [{ type: Input }],
        width: [{ type: Input }],
        tooltip: [{ type: Input }]
    };
    return ValueAxisCrosshairComponentGenerated;
}(SettingsComponent));
export { ValueAxisCrosshairComponentGenerated };
