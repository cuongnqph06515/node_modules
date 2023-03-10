import * as tslib_1 from "tslib";
import { Input } from '@angular/core';
import { SettingsComponent } from '../../common/settings.component';
/**
 * @hidden
 */
var YAxisNotesLabelComponentGenerated = /** @class */ (function (_super) {
    tslib_1.__extends(YAxisNotesLabelComponentGenerated, _super);
    function YAxisNotesLabelComponentGenerated(configurationService) {
        var _this = _super.call(this, 'notes.label', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    YAxisNotesLabelComponentGenerated.propDecorators = {
        background: [{ type: Input }],
        border: [{ type: Input }],
        color: [{ type: Input }],
        content: [{ type: Input }],
        font: [{ type: Input }],
        format: [{ type: Input }],
        position: [{ type: Input }],
        rotation: [{ type: Input }],
        visible: [{ type: Input }]
    };
    return YAxisNotesLabelComponentGenerated;
}(SettingsComponent));
export { YAxisNotesLabelComponentGenerated };
