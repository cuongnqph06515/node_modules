import * as tslib_1 from "tslib";
import { Input } from '@angular/core';
import { SettingsComponent } from '../../common/settings.component';
/**
 * @hidden
 */
var LegendItemComponentGenerated = /** @class */ (function (_super) {
    tslib_1.__extends(LegendItemComponentGenerated, _super);
    function LegendItemComponentGenerated(configurationService) {
        var _this = _super.call(this, 'legend.item', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    LegendItemComponentGenerated.propDecorators = {
        cursor: [{ type: Input }],
        visual: [{ type: Input }]
    };
    return LegendItemComponentGenerated;
}(SettingsComponent));
export { LegendItemComponentGenerated };
