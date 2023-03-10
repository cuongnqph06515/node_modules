import * as tslib_1 from "tslib";
import { Input } from '@angular/core';
import { SettingsComponent } from '../../common/settings.component';
/**
 * @hidden
 */
var SeriesDefaultsLabelsComponentGenerated = /** @class */ (function (_super) {
    tslib_1.__extends(SeriesDefaultsLabelsComponentGenerated, _super);
    function SeriesDefaultsLabelsComponentGenerated(configurationService) {
        var _this = _super.call(this, 'seriesDefaults.labels', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    SeriesDefaultsLabelsComponentGenerated.propDecorators = {
        background: [{ type: Input }],
        border: [{ type: Input }],
        color: [{ type: Input }],
        content: [{ type: Input }],
        font: [{ type: Input }],
        format: [{ type: Input }],
        margin: [{ type: Input }],
        padding: [{ type: Input }],
        visible: [{ type: Input }],
        visual: [{ type: Input }],
        from: [{ type: Input }],
        to: [{ type: Input }]
    };
    return SeriesDefaultsLabelsComponentGenerated;
}(SettingsComponent));
export { SeriesDefaultsLabelsComponentGenerated };
