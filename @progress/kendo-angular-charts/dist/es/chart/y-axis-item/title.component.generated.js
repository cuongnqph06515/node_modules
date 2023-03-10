import * as tslib_1 from "tslib";
import { Input } from '@angular/core';
import { SettingsComponent } from '../../common/settings.component';
/**
 * @hidden
 */
var YAxisTitleComponentGenerated = /** @class */ (function (_super) {
    tslib_1.__extends(YAxisTitleComponentGenerated, _super);
    function YAxisTitleComponentGenerated(configurationService) {
        var _this = _super.call(this, 'title', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    YAxisTitleComponentGenerated.propDecorators = {
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
    return YAxisTitleComponentGenerated;
}(SettingsComponent));
export { YAxisTitleComponentGenerated };
