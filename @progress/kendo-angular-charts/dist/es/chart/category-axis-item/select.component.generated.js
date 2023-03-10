import * as tslib_1 from "tslib";
import { Input } from '@angular/core';
import { SettingsComponent } from '../../common/settings.component';
/**
 * @hidden
 */
var CategoryAxisSelectComponentGenerated = /** @class */ (function (_super) {
    tslib_1.__extends(CategoryAxisSelectComponentGenerated, _super);
    function CategoryAxisSelectComponentGenerated(configurationService) {
        var _this = _super.call(this, 'select', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    CategoryAxisSelectComponentGenerated.propDecorators = {
        from: [{ type: Input }],
        max: [{ type: Input }],
        min: [{ type: Input }],
        mousewheel: [{ type: Input }],
        to: [{ type: Input }]
    };
    return CategoryAxisSelectComponentGenerated;
}(SettingsComponent));
export { CategoryAxisSelectComponentGenerated };
