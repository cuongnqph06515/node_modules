import * as tslib_1 from "tslib";
import { Input } from '@angular/core';
import { SettingsComponent } from '../../common/settings.component';
/**
 * @hidden
 */
var SeriesDefaultsTooltipComponentGenerated = /** @class */ (function (_super) {
    tslib_1.__extends(SeriesDefaultsTooltipComponentGenerated, _super);
    function SeriesDefaultsTooltipComponentGenerated(configurationService) {
        var _this = _super.call(this, 'seriesDefaults.tooltip', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    SeriesDefaultsTooltipComponentGenerated.propDecorators = {
        background: [{ type: Input }],
        border: [{ type: Input }],
        color: [{ type: Input }],
        font: [{ type: Input }],
        format: [{ type: Input }],
        padding: [{ type: Input }],
        visible: [{ type: Input }]
    };
    return SeriesDefaultsTooltipComponentGenerated;
}(SettingsComponent));
export { SeriesDefaultsTooltipComponentGenerated };
