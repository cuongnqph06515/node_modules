import * as tslib_1 from "tslib";
import { Input } from '@angular/core';
import { SettingsComponent } from '../../common/settings.component';
/**
 * @hidden
 */
var SeriesNotesIconComponentGenerated = /** @class */ (function (_super) {
    tslib_1.__extends(SeriesNotesIconComponentGenerated, _super);
    function SeriesNotesIconComponentGenerated(configurationService) {
        var _this = _super.call(this, 'notes.icon', configurationService) || this;
        _this.configurationService = configurationService;
        return _this;
    }
    SeriesNotesIconComponentGenerated.propDecorators = {
        background: [{ type: Input }],
        border: [{ type: Input }],
        size: [{ type: Input }],
        type: [{ type: Input }],
        visible: [{ type: Input }]
    };
    return SeriesNotesIconComponentGenerated;
}(SettingsComponent));
export { SeriesNotesIconComponentGenerated };
