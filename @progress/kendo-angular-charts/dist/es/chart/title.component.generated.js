import * as tslib_1 from "tslib";
import { Input } from '@angular/core';
import { SettingsComponent } from '../common/settings.component';
/**
 * @hidden
 */
var TitleComponentGenerated = /** @class */ (function (_super) {
    tslib_1.__extends(TitleComponentGenerated, _super);
    function TitleComponentGenerated(configurationService) {
        var _this = _super.call(this, 'title', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    TitleComponentGenerated.propDecorators = {
        align: [{ type: Input }],
        background: [{ type: Input }],
        border: [{ type: Input }],
        color: [{ type: Input }],
        font: [{ type: Input }],
        margin: [{ type: Input }],
        padding: [{ type: Input }],
        position: [{ type: Input }],
        text: [{ type: Input }],
        visible: [{ type: Input }]
    };
    return TitleComponentGenerated;
}(SettingsComponent));
export { TitleComponentGenerated };
