import * as tslib_1 from "tslib";
import { Input } from '@angular/core';
import { SettingsComponent } from '../../common/settings.component';
/**
 * @hidden
 */
var XAxisCrosshairComponentGenerated = /** @class */ (function (_super) {
    tslib_1.__extends(XAxisCrosshairComponentGenerated, _super);
    function XAxisCrosshairComponentGenerated(configurationService) {
        var _this = _super.call(this, 'crosshair', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    XAxisCrosshairComponentGenerated.propDecorators = {
        color: [{ type: Input }],
        opacity: [{ type: Input }],
        visible: [{ type: Input }],
        width: [{ type: Input }],
        tooltip: [{ type: Input }]
    };
    return XAxisCrosshairComponentGenerated;
}(SettingsComponent));
export { XAxisCrosshairComponentGenerated };
