import * as tslib_1 from "tslib";
import { Input } from '@angular/core';
import { SettingsComponent } from '../../common/settings.component';
/**
 * @hidden
 */
var SeriesNotesComponentGenerated = /** @class */ (function (_super) {
    tslib_1.__extends(SeriesNotesComponentGenerated, _super);
    function SeriesNotesComponentGenerated(configurationService) {
        var _this = _super.call(this, 'notes', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    SeriesNotesComponentGenerated.propDecorators = {
        line: [{ type: Input }],
        position: [{ type: Input }],
        visual: [{ type: Input }],
        icon: [{ type: Input }],
        label: [{ type: Input }]
    };
    return SeriesNotesComponentGenerated;
}(SettingsComponent));
export { SeriesNotesComponentGenerated };
