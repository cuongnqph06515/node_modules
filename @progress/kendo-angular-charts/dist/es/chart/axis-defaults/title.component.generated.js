import * as tslib_1 from "tslib";
import { Input } from '@angular/core';
import { SettingsComponent } from '../../common/settings.component';
/**
 * @hidden
 */
var AxisDefaultsTitleComponentGenerated = /** @class */ (function (_super) {
    tslib_1.__extends(AxisDefaultsTitleComponentGenerated, _super);
    function AxisDefaultsTitleComponentGenerated(configurationService) {
        var _this = _super.call(this, 'axisDefaults.title', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    AxisDefaultsTitleComponentGenerated.propDecorators = {
        background: [{ type: Input }],
        border: [{ type: Input }],
        color: [{ type: Input }],
        font: [{ type: Input }],
        margin: [{ type: Input }],
        padding: [{ type: Input }],
        position: [{ type: Input }],
        rotation: [{ type: Input }],
        text: [{ type: Input }],
        visible: [{ type: Input }],
        visual: [{ type: Input }]
    };
    return AxisDefaultsTitleComponentGenerated;
}(SettingsComponent));
export { AxisDefaultsTitleComponentGenerated };
