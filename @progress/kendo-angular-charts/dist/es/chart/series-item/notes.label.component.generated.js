import * as tslib_1 from "tslib";
import { Input } from '@angular/core';
import { SettingsComponent } from '../../common/settings.component';
/**
 * @hidden
 */
var SeriesNotesLabelComponentGenerated = /** @class */ (function (_super) {
    tslib_1.__extends(SeriesNotesLabelComponentGenerated, _super);
    function SeriesNotesLabelComponentGenerated(configurationService) {
        var _this = _super.call(this, 'notes.label', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    SeriesNotesLabelComponentGenerated.propDecorators = {
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
    return SeriesNotesLabelComponentGenerated;
}(SettingsComponent));
export { SeriesNotesLabelComponentGenerated };
