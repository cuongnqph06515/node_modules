import * as tslib_1 from "tslib";
import { Input } from '@angular/core';
import { SettingsComponent } from '../../common/settings.component';
/**
 * @hidden
 */
var SeriesTooltipComponentGenerated = /** @class */ (function (_super) {
    tslib_1.__extends(SeriesTooltipComponentGenerated, _super);
    function SeriesTooltipComponentGenerated(configurationService) {
        var _this = _super.call(this, 'tooltip', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    SeriesTooltipComponentGenerated.propDecorators = {
        background: [{ type: Input }],
        border: [{ type: Input }],
        color: [{ type: Input }],
        font: [{ type: Input }],
        format: [{ type: Input }],
        padding: [{ type: Input }],
        visible: [{ type: Input }]
    };
    return SeriesTooltipComponentGenerated;
}(SettingsComponent));
export { SeriesTooltipComponentGenerated };
