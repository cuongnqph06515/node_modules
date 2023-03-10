import * as tslib_1 from "tslib";
import { Input } from '@angular/core';
import { SettingsComponent } from '../../common/settings.component';
/**
 * @hidden
 */
var SeriesOutliersComponentGenerated = /** @class */ (function (_super) {
    tslib_1.__extends(SeriesOutliersComponentGenerated, _super);
    function SeriesOutliersComponentGenerated(configurationService) {
        var _this = _super.call(this, 'outliers', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    SeriesOutliersComponentGenerated.propDecorators = {
        background: [{ type: Input }],
        border: [{ type: Input }],
        rotation: [{ type: Input }],
        size: [{ type: Input }],
        type: [{ type: Input }]
    };
    return SeriesOutliersComponentGenerated;
}(SettingsComponent));
export { SeriesOutliersComponentGenerated };
