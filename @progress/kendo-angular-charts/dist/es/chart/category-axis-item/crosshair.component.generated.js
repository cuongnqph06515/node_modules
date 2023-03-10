import * as tslib_1 from "tslib";
import { Input } from '@angular/core';
import { SettingsComponent } from '../../common/settings.component';
/**
 * @hidden
 */
var CategoryAxisCrosshairComponentGenerated = /** @class */ (function (_super) {
    tslib_1.__extends(CategoryAxisCrosshairComponentGenerated, _super);
    function CategoryAxisCrosshairComponentGenerated(configurationService) {
        var _this = _super.call(this, 'crosshair', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    CategoryAxisCrosshairComponentGenerated.propDecorators = {
        color: [{ type: Input }],
        dashType: [{ type: Input }],
        opacity: [{ type: Input }],
        visible: [{ type: Input }],
        width: [{ type: Input }],
        tooltip: [{ type: Input }]
    };
    return CategoryAxisCrosshairComponentGenerated;
}(SettingsComponent));
export { CategoryAxisCrosshairComponentGenerated };
