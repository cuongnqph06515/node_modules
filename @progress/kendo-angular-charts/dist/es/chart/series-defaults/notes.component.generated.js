import * as tslib_1 from "tslib";
import { Input } from '@angular/core';
import { SettingsComponent } from '../../common/settings.component';
/**
 * @hidden
 */
var SeriesDefaultsNotesComponentGenerated = /** @class */ (function (_super) {
    tslib_1.__extends(SeriesDefaultsNotesComponentGenerated, _super);
    function SeriesDefaultsNotesComponentGenerated(configurationService) {
        var _this = _super.call(this, 'seriesDefaults.notes', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    SeriesDefaultsNotesComponentGenerated.propDecorators = {
        line: [{ type: Input }],
        visual: [{ type: Input }],
        icon: [{ type: Input }],
        label: [{ type: Input }]
    };
    return SeriesDefaultsNotesComponentGenerated;
}(SettingsComponent));
export { SeriesDefaultsNotesComponentGenerated };
