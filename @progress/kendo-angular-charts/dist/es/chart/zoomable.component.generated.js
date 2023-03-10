import * as tslib_1 from "tslib";
import { Input } from '@angular/core';
import { SettingsComponent } from '../common/settings.component';
/**
 * @hidden
 */
var ZoomableComponentGenerated = /** @class */ (function (_super) {
    tslib_1.__extends(ZoomableComponentGenerated, _super);
    function ZoomableComponentGenerated(configurationService) {
        var _this = _super.call(this, 'zoomable', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    ZoomableComponentGenerated.propDecorators = {
        mousewheel: [{ type: Input }],
        selection: [{ type: Input }]
    };
    return ZoomableComponentGenerated;
}(SettingsComponent));
export { ZoomableComponentGenerated };
