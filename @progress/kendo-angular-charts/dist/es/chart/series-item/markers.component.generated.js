import * as tslib_1 from "tslib";
import { Input } from '@angular/core';
import { SettingsComponent } from '../../common/settings.component';
/**
 * @hidden
 */
var SeriesMarkersComponentGenerated = /** @class */ (function (_super) {
    tslib_1.__extends(SeriesMarkersComponentGenerated, _super);
    function SeriesMarkersComponentGenerated(configurationService) {
        var _this = _super.call(this, 'markers', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    SeriesMarkersComponentGenerated.propDecorators = {
        background: [{ type: Input }],
        border: [{ type: Input }],
        rotation: [{ type: Input }],
        size: [{ type: Input }],
        type: [{ type: Input }],
        visible: [{ type: Input }],
        visual: [{ type: Input }],
        from: [{ type: Input }],
        to: [{ type: Input }]
    };
    return SeriesMarkersComponentGenerated;
}(SettingsComponent));
export { SeriesMarkersComponentGenerated };
