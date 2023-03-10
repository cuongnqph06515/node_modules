import * as tslib_1 from "tslib";
import { Input } from '@angular/core';
import { SettingsComponent } from '../common/settings.component';
/**
 * @hidden
 */
var SeriesDefaultsComponentGenerated = /** @class */ (function (_super) {
    tslib_1.__extends(SeriesDefaultsComponentGenerated, _super);
    function SeriesDefaultsComponentGenerated(configurationService) {
        var _this = _super.call(this, 'seriesDefaults', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    SeriesDefaultsComponentGenerated.propDecorators = {
        border: [{ type: Input }],
        gap: [{ type: Input }],
        overlay: [{ type: Input }],
        spacing: [{ type: Input }],
        stack: [{ type: Input }],
        type: [{ type: Input }],
        visual: [{ type: Input }],
        labels: [{ type: Input }],
        notes: [{ type: Input }],
        tooltip: [{ type: Input }]
    };
    return SeriesDefaultsComponentGenerated;
}(SettingsComponent));
export { SeriesDefaultsComponentGenerated };
