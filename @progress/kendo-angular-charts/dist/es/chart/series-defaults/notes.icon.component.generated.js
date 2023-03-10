import * as tslib_1 from "tslib";
import { Input } from '@angular/core';
import { SettingsComponent } from '../../common/settings.component';
/**
 * @hidden
 */
var SeriesDefaultsNotesIconComponentGenerated = /** @class */ (function (_super) {
    tslib_1.__extends(SeriesDefaultsNotesIconComponentGenerated, _super);
    function SeriesDefaultsNotesIconComponentGenerated(configurationService) {
        var _this = _super.call(this, 'seriesDefaults.notes.icon', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    SeriesDefaultsNotesIconComponentGenerated.propDecorators = {
        background: [{ type: Input }],
        border: [{ type: Input }],
        size: [{ type: Input }],
        type: [{ type: Input }],
        visible: [{ type: Input }]
    };
    return SeriesDefaultsNotesIconComponentGenerated;
}(SettingsComponent));
export { SeriesDefaultsNotesIconComponentGenerated };
