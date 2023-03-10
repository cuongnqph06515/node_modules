import * as tslib_1 from "tslib";
import { Input } from '@angular/core';
import { SettingsComponent } from '../common/settings.component';
/**
 * @hidden
 */
var ChartAreaComponentGenerated = /** @class */ (function (_super) {
    tslib_1.__extends(ChartAreaComponentGenerated, _super);
    function ChartAreaComponentGenerated(configurationService) {
        var _this = _super.call(this, 'chartArea', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    ChartAreaComponentGenerated.propDecorators = {
        background: [{ type: Input }],
        border: [{ type: Input }],
        height: [{ type: Input }],
        margin: [{ type: Input }],
        opacity: [{ type: Input }],
        width: [{ type: Input }]
    };
    return ChartAreaComponentGenerated;
}(SettingsComponent));
export { ChartAreaComponentGenerated };
