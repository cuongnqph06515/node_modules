import * as tslib_1 from "tslib";
import { Input } from '@angular/core';
import { SettingsComponent } from '../common/settings.component';
/**
 * @hidden
 */
var TooltipComponentGenerated = /** @class */ (function (_super) {
    tslib_1.__extends(TooltipComponentGenerated, _super);
    function TooltipComponentGenerated(configurationService) {
        var _this = _super.call(this, 'tooltip', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    TooltipComponentGenerated.propDecorators = {
        background: [{ type: Input }],
        border: [{ type: Input }],
        color: [{ type: Input }],
        font: [{ type: Input }],
        format: [{ type: Input }],
        opacity: [{ type: Input }],
        padding: [{ type: Input }],
        shared: [{ type: Input }],
        visible: [{ type: Input }]
    };
    return TooltipComponentGenerated;
}(SettingsComponent));
export { TooltipComponentGenerated };
