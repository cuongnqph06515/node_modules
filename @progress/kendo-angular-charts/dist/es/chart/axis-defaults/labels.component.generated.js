import * as tslib_1 from "tslib";
import { Input } from '@angular/core';
import { SettingsComponent } from '../../common/settings.component';
/**
 * @hidden
 */
var AxisDefaultsLabelsComponentGenerated = /** @class */ (function (_super) {
    tslib_1.__extends(AxisDefaultsLabelsComponentGenerated, _super);
    function AxisDefaultsLabelsComponentGenerated(configurationService) {
        var _this = _super.call(this, 'axisDefaults.labels', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    AxisDefaultsLabelsComponentGenerated.propDecorators = {
        content: [{ type: Input }],
        font: [{ type: Input }],
        format: [{ type: Input }],
        margin: [{ type: Input }],
        mirror: [{ type: Input }],
        padding: [{ type: Input }],
        rotation: [{ type: Input }],
        skip: [{ type: Input }],
        step: [{ type: Input }],
        visible: [{ type: Input }],
        visual: [{ type: Input }]
    };
    return AxisDefaultsLabelsComponentGenerated;
}(SettingsComponent));
export { AxisDefaultsLabelsComponentGenerated };
