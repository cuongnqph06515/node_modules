import * as tslib_1 from "tslib";
import { Input } from '@angular/core';
import { SettingsComponent } from '../../common/settings.component';
/**
 * @hidden
 */
var SeriesLabelsComponentGenerated = /** @class */ (function (_super) {
    tslib_1.__extends(SeriesLabelsComponentGenerated, _super);
    function SeriesLabelsComponentGenerated(configurationService) {
        var _this = _super.call(this, 'labels', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    SeriesLabelsComponentGenerated.propDecorators = {
        align: [{ type: Input }],
        background: [{ type: Input }],
        border: [{ type: Input }],
        color: [{ type: Input }],
        content: [{ type: Input }],
        distance: [{ type: Input }],
        font: [{ type: Input }],
        format: [{ type: Input }],
        margin: [{ type: Input }],
        padding: [{ type: Input }],
        position: [{ type: Input }],
        rotation: [{ type: Input }],
        visible: [{ type: Input }],
        visual: [{ type: Input }],
        from: [{ type: Input }],
        to: [{ type: Input }]
    };
    return SeriesLabelsComponentGenerated;
}(SettingsComponent));
export { SeriesLabelsComponentGenerated };
