import * as tslib_1 from "tslib";
import { Input } from '@angular/core';
import { SettingsComponent } from '../../common/settings.component';
/**
 * @hidden
 */
var PanesTitleComponentGenerated = /** @class */ (function (_super) {
    tslib_1.__extends(PanesTitleComponentGenerated, _super);
    function PanesTitleComponentGenerated(configurationService) {
        var _this = _super.call(this, 'title', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    PanesTitleComponentGenerated.propDecorators = {
        background: [{ type: Input }],
        border: [{ type: Input }],
        color: [{ type: Input }],
        font: [{ type: Input }],
        margin: [{ type: Input }],
        position: [{ type: Input }],
        text: [{ type: Input }],
        visible: [{ type: Input }],
        visual: [{ type: Input }]
    };
    return PanesTitleComponentGenerated;
}(SettingsComponent));
export { PanesTitleComponentGenerated };
