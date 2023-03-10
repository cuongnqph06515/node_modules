import * as tslib_1 from "tslib";
import { Input } from '@angular/core';
import { SettingsComponent } from '../../common/settings.component';
/**
 * @hidden
 */
var SeriesDefaultsLabelsToComponentGenerated = /** @class */ (function (_super) {
    tslib_1.__extends(SeriesDefaultsLabelsToComponentGenerated, _super);
    function SeriesDefaultsLabelsToComponentGenerated(configurationService) {
        var _this = _super.call(this, 'seriesDefaults.labels.to', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    SeriesDefaultsLabelsToComponentGenerated.propDecorators = {
        background: [{ type: Input }],
        border: [{ type: Input }],
        color: [{ type: Input }],
        content: [{ type: Input }],
        font: [{ type: Input }],
        format: [{ type: Input }],
        margin: [{ type: Input }],
        padding: [{ type: Input }],
        visible: [{ type: Input }]
    };
    return SeriesDefaultsLabelsToComponentGenerated;
}(SettingsComponent));
export { SeriesDefaultsLabelsToComponentGenerated };
