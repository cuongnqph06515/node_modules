import * as tslib_1 from "tslib";
import { Input } from '@angular/core';
import { SettingsComponent } from '../../common/settings.component';
/**
 * @hidden
 */
var SeriesExtremesComponentGenerated = /** @class */ (function (_super) {
    tslib_1.__extends(SeriesExtremesComponentGenerated, _super);
    function SeriesExtremesComponentGenerated(configurationService) {
        var _this = _super.call(this, 'extremes', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    SeriesExtremesComponentGenerated.propDecorators = {
        background: [{ type: Input }],
        border: [{ type: Input }],
        rotation: [{ type: Input }],
        size: [{ type: Input }],
        type: [{ type: Input }]
    };
    return SeriesExtremesComponentGenerated;
}(SettingsComponent));
export { SeriesExtremesComponentGenerated };
