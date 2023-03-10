import * as tslib_1 from "tslib";
import { Input } from '@angular/core';
import { SettingsComponent } from '../../common/settings.component';
/**
 * @hidden
 */
var SeriesDefaultsNotesLabelComponentGenerated = /** @class */ (function (_super) {
    tslib_1.__extends(SeriesDefaultsNotesLabelComponentGenerated, _super);
    function SeriesDefaultsNotesLabelComponentGenerated(configurationService) {
        var _this = _super.call(this, 'seriesDefaults.notes.label', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    SeriesDefaultsNotesLabelComponentGenerated.propDecorators = {
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
    return SeriesDefaultsNotesLabelComponentGenerated;
}(SettingsComponent));
export { SeriesDefaultsNotesLabelComponentGenerated };
